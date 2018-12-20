/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/GoogleMapModule", [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/ProximitySearch/Events',
    'dojo/_base/lang',
    'dojo/i18n!./nls/MapModule'
],
function (declare, string, Events, lang, MapModule) {
    var googleMapModule = declare("Sage.ProximitySearch.GoogleMapModule", null, {
        // Map module using the Bing ajax control
        _googleKey: null,
        _dirDisplay: null,
        constructor: function (mapDiv, googleKey) {
            this._mapDiv = mapDiv;
            this._googleKey = googleKey;
            this._map = null;
            this._mapModel = null;
            this._pushpins = null;  // store some pushpin info so we can remove them
            this._sandbox = null;  // will be set in init()
        },
        initModule: function (sb) {
            this._sandbox = sb;
            sb.subscribe(Events.MapRefresh, dojo.hitch(this, "onMapRefresh"));
            sb.subscribe(Events.RouteUpdated, dojo.hitch(this, "onRouteUpdated"));
            sb.subscribe(Events.RouteSegmentHighlight, dojo.hitch(this, "onRouteSegmentHighlight"));
            sb.subscribe(Events.RouteSegmentUnhighlight, dojo.hitch(this, "onRouteSegmentUnhighlight"));
            sb.subscribe(Events.SelectionAdd, dojo.hitch(this, "onSelectionAdd"), 9);
            sb.subscribe(Events.SelectionRemove, dojo.hitch(this, "onSelectionRemove"), 9);
            sb.subscribe(Events.SelectionReorder, dojo.hitch(this, "onSelectionReorder"), 9);
            sb.subscribe(Events.ItemHighlight, dojo.hitch(this, "onItemHighlight"));
            sb.subscribe(Events.ItemUnhighlight, dojo.hitch(this, "onItemUnhighlight"));
            sb.subscribe(Events.ItemCenter, dojo.hitch(this, "onItemCenter"));
        },
        onMapRefresh: function (mapData) {
            // display map data.  The first point in the data is the one that the map will be centered on.
            this._mapModel = mapData;
            this._buildMap();
        },
        onRouteSegmentHighlight: function (routeData) {
            // TODO
        },
        onRouteSegmentUnhighlight: function (routeData) {
            // TODO
        },
        onRouteUpdated: function (routeData) {
            // display route data on map
            if (!(this._map && this._mapModel))
                return;
            this._removeRoute();
            this._displayRoute(routeData);
        },
        onSelectionAdd: function (points) {
            // add the point on the map
            if (!(points && this._map && this._mapModel))
                return;
            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                this._addPushpin(point);
            }
            this._renumberSelected();

            // Reset the view
            var bounds = this.calculateBounds(this._mapModel.getSelected());
            this._map.fitBounds(bounds);
        },
        onSelectionRemove: function (points) {
            // remove the point from map
            if (!(points && this._map && this._mapModel))
                return;
            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                this._removePushpin(point);
            }
            this._renumberSelected();
        },
        onSelectionReorder: function () {
            this._renumberSelected();
        },
        // shared logic
        calculateBounds: function (pts) {
            // return rectangle (an array of topleft, bottomright coordinates)
            var ptCenter = pts[0];
            var topLeft = { latitude: ptCenter.latitude + 0.001, longitude: ptCenter.longitude - 0.001 };
            var btmRight = { latitude: ptCenter.latitude - 0.001, longitude: ptCenter.longitude + 0.001 };
            for (var i = pts.length - 1; i > 0; i--) {
                var pt = pts[i];
                var delta = [0, 0];
                // this code probably has a bug around -180 longitude... oh well
                if (pt.latitude < btmRight.latitude)
                    btmRight.latitude = pt.latitude;
                if (pt.latitude > topLeft.latitude)
                    topLeft.latitude = pt.latitude;
                if (pt.longitude > btmRight.longitude)
                    btmRight.longitude = pt.longitude;
                if (pt.longitude < topLeft.longitude)
                    topLeft.longitude = pt.longitude;
            }
            return {
                north: btmRight.latitude,
                south: topLeft.latitude,
                east: btmRight.longitude,
                west: topLeft.longitude
                };
        },
        // Google specific stuff
        _buildMap: function () {
            // create the map control (if it is not already there), centering it on the selected data.
            // add pushpins
            if (typeof google == "undefined")
            // we'll just assume it is getting loaded synchronously
                throw MapModule.googleError;

            var ptData = this._mapModel.getSelected();
            var m = this._map = this._map || new google.maps.Map(dojo.byId(this._mapDiv), {
                    center: {lat: ptData[0].latitude, lng: ptData[0].longitude},
                    zoom: 8
                });
            var pushpins = this._pushpins = [];

            if (!ptData || ptData.length === 0)
                return;

            this._addPushpin(ptData[0]);
            for (var i = 1; i < ptData.length; i++) {
                this._addPushpin(ptData[i]);
            }

            var bounds = this.calculateBounds(ptData);
            m.fitBounds(bounds);
        },
        _addPushpin: function (pt) {
            // add pushpin on map for selected item.
            // img defaults to 'star.png' if not specified.
            var m = this._map;
            var sb = this._sandbox;
            var img = pt.img || this._selectPushpinImage(this._getItemType(pt));
            // used to add a push pin with corresponding infobox to the map
            var loc = { lat: pt.latitude, lng: pt.longitude };
            var pinOptions = {
                position: loc,
                label: this._getPinLabel(pt),
                map: m,
                title: pt.Name
            };
            if (img)
                pinOptions.icon = this._sandbox.getParameter("IMG_URL") + img;
            var pin = new google.maps.Marker(pinOptions);
            var infoBox = null;
            if (pt.name || pt.description) {
                var description = pt.address;
                if (pt.description)
                    description = pt.description + "<br/>" + pt.address;
                // TODO: add titleClickHandler to go to account
                var contentStr = string.substitute('<h1>${0}</h1><div>${1}</div>', [pt.name, description]);
                var options =
                {
                    content: contentStr,
                    position: pin.getPosition()
                };
                infoBox = new google.maps.InfoWindow(options);
                var displayInfoBox = function () {
                    infoBox.open(m, pin);
                };
                pin.addListener('click', displayInfoBox);
                // Hide the infobox when the map is moved.
                var hideInfoBox = function () {
                    infoBox.close();
                };
                m.addListener('drag', hideInfoBox);
            }
            this._pushpins.push({ point: pt, pushpin: pin, infobox: infoBox });
        },
        _selectPushpinImage: function (ptType) {
            if (!ptType)
                return "bluepin.png";
            switch (ptType) {
                case "poi":
                    return "bluepin.png";
                case "data":
                    return "orangepin.png";
                case "waypoint":
                    return null;
                case "highlight":
                    return "yellowpin.png";
            }
            return "redpin.png";
        },
        _removePushpin: function (point) {
            for (var i = 0; i < this._pushpins.length; i++) {
                var pin = this._pushpins[i];
                if (pin.point === point) {
                    pin.pushpin.setMap(null);
                    if (pin.infoBox)
                        pin.infoBox.setMap(null);
                    this._pushpins.splice(i, 1);
                    return;
                }
            }
        },
        _removeRoute: function () {
            // summary:
            //  remove some previously added route data
            if (this._dirDisplay) {
                this._dirDisplay.set('directions', null);
            }
        },
        _displayRoute: function (route) {
            // summary:
            //  display route data
            if (!route || route._legs.length === 0)
                return;
            var dis = this._dirDisplay;
            if (!dis) {
                this._dirDisplay = new google.maps.DirectionsRenderer({
                    draggable: false,
                    hideRouteList: true,
                    suppressMarkers: true
                });
                this._dirDisplay.setMap(this._map);
                dis = this._dirDisplay;
            }

            //  display route data
            dis.setDirections(route.resultData);
        },
        _renumberSelected: function () {
            // reset the text in each pushpin to match the item order
            for (var i=0; i<this._pushpins.length; i++) {
                var item = this._pushpins[i];
                var lbl = this._getPinLabel(item.point);
                item.pushpin.setOptions({ label: lbl });
            }
        },
        _getPinLabel: function(pt) {
            if (pt.order < 10) {
                return String(pt.order);
            } else {
                if (pt.name) {
                    return pt.name.charAt(0);
                } else {
                    return '';
                }
            }
        },
        onItemHighlight: function (item) {
            // switch pushpin
            for (var i = 0; i < this._pushpins.length; i++) {
                var pin = this._pushpins[i];
                if (pin.point === item) {
                    var img = this._selectPushpinImage("highlight");
                    pin.pushpin.setOptions({
                        icon: this._sandbox.getParameter("IMG_URL") + img
                    });
                    return;
                }
            }
        },
        onItemUnhighlight: function (item) {
            // switch pushpin
            for (var i = 0; i < this._pushpins.length; i++) {
                var pin = this._pushpins[i];
                if (pin.point === item) {
                    var img = item.img || this._selectPushpinImage(this._getItemType(item));
                    pin.pushpin.setOptions({
                        icon: img ? this._sandbox.getParameter("IMG_URL") + img : null
                    });
                    return;
                }
            }
        },
        onItemCenter: function (item) {
            // zoom into the selected item
            var center = new google.maps.LatLng(item.latitude, item.longitude);
            this._map.panTo(center);
        },
        _getItemType: function (item) {
            // Check if the item has invalid lat long values, 0,0
            if (item.latitude === 0 && item.longitude === 0) {
              return "invalid";
            } else {
              return item.type;
            }
        }
    });
    return googleMapModule;
});
