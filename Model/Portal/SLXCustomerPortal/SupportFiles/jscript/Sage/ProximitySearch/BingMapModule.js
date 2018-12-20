/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/BingMapModule", [
    'dojo/_base/declare',
    'Sage/ProximitySearch/Events',
    'dojo/_base/lang',
    'dojo/i18n!./nls/MapModule',
    'dojo/query'
],
function (declare, Events, lang, MapModule, query) {
    var bingMapModule = declare("Sage.ProximitySearch.BingMapModule", null, {
        // Map module using the Bing ajax control
        _bingKey: null,
        constructor: function (mapDiv, bingKey) {
            this._mapDiv = mapDiv;
            this._bingKey = bingKey;
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
            var viewRect = Microsoft.Maps.LocationRect.fromCorners(
              new Microsoft.Maps.Location(bounds[0].latitude, bounds[0].longitude),
              new Microsoft.Maps.Location(bounds[1].latitude, bounds[1].longitude)
              );
            this._map.setView({ bounds: viewRect });
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
            return [topLeft, btmRight];
        },
        // Bing specific stuff
        _buildMap: function () {
            // create the map control (if it is not already there), centering it on the selected data.
            // add pushpins
            if (typeof Microsoft == "undefined")
            // we'll just assume it is getting loaded synchronously
                throw MapModule.microsoftError;

            var m = this._map = this._map || new Microsoft.Maps.Map(dojo.byId(this._mapDiv),
                { credentials: this._bingKey, mapTypeId: "r" });
            var pushpins = this._pushpins = [];

            var ptData = this._mapModel.getSelected();
            if (!ptData || ptData.length === 0)
                return;
            var mapLocs = [];
            var bounds = this.calculateBounds(ptData);
            var viewRect = Microsoft.Maps.LocationRect.fromCorners(
              new Microsoft.Maps.Location(bounds[0].latitude, bounds[0].longitude),
              new Microsoft.Maps.Location(bounds[1].latitude, bounds[1].longitude)
              );
            m.setView({ bounds: viewRect });

            this._addPushpin(ptData[0]);
            for (var i = 1; i < ptData.length; i++) {
                this._addPushpin(ptData[i]);
            }

            // Update the session keys, hitch to keep this in scope
            m.getCredentials(dojo.hitch(this, "_updateSessionKey"));
        },
        _updateSessionKey: function (sessionKey) {
            var sb = this._sandbox;
            if (sessionKey)
                sb.publish(Events.MapSession, sessionKey);

            // Watch out for the invalid credentials message
            var msg = MapModule.credentialsOrOverLimit;
            query(dojo.byId(this._mapDiv)).forEach(function(node){
                var divs = node.getElementsByTagName("div");
                for(var i = 0; i < divs.length; i++){
                   //do something to each div like
                    if (divs[i].innerHTML.indexOf('<div') === -1 && (
                        divs[i].innerHTML.indexOf('Invalid Credentials') > -1 ||
                        divs[i].innerHTML.indexOf('Unable to contact Server') > -1 ||
                        divs[i].innerHTML.indexOf('credentials are invalid') > -1)) {
                        divs[i].innerHTML = msg;
                    }
                }
            });
        },
        _addPushpin: function (pt) {
            // add pushpin on map for selected item.
            // img defaults to 'star.png' if not specified.
            var m = this._map;
            var sb = this._sandbox;
            var img = pt.img || this._selectPushpinImage(this._getItemType(pt));
            // used to add a push pin with corresponding infobox to the map
            var loc = new Microsoft.Maps.Location(pt.latitude, pt.longitude);
            var pinOptions = { text: String(pt.order),
                typeName: 'pushpin',
                textOffset: new Microsoft.Maps.Point(0, 11)
            };
            if (img)
                pinOptions.icon = this._sandbox.getParameter("IMG_URL") + img;
            var pin = new Microsoft.Maps.Pushpin(loc, pinOptions);
            var infoBox = null;
            if (pt.name || pt.description) {
                var description = pt.address;
                if (pt.description)
                    description = pt.description + "<br/>" + pt.address;
                var options =
                {
                    title: pt.name,
                    description: description,
                    visible: false,
                    actions: [{
                        label: 'Deselect', eventHandler: dojo.hitch(this, function () {
                            sb.publish(Events.SelectionRemove, [pt]);
                            this.onSelectionRemove(pt);
                            hideInfoBox();
                        })
                    }],
                    offset: new Microsoft.Maps.Point(0, 32)
                };
                if (pt.url) {
                    options.titleClickHandler = function () {
                        sb.publish(Events.DataNavigate, pt.url);
                    };
                }
                infoBox = new Microsoft.Maps.Infobox(pin.getLocation(), options);
                infoBox.setMap(m);
                var displayInfoBox = function () {
                    infoBox.setOptions({ visible: true });
                };
                Microsoft.Maps.Events.addHandler(pin, 'click', displayInfoBox);
                // Hide the infobox when the map is moved.
                var hideInfoBox = function () {
                    infoBox.setOptions({ visible: false });
                };
                Microsoft.Maps.Events.addHandler(m, 'viewchange', hideInfoBox);
                m.entities.push(infoBox);
            }
            m.entities.push(pin);
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
                    this._map.entities.remove(pin.pushpin);
                    if (pin.infoBox)
                        this._map.entities.remove(pin.infoBox);
                    this._pushpins.splice(i, 1);
                    return;
                }
            }
        },
        _removeRoute: function () {
            // summary:
            //  remove some previously added route data
            if (this._routeShape) {
                this._map.entities.remove(this._routeShape);
                this._routeShape = null;
            }
        },
        _displayRoute: function (route, routeColor) {
            // summary:
            //  display route data
            if (!route || route._legs.length === 0)
                return;
            var routePoints = [];
            for (var i = 0; i < route.path.length; i++) {
                var pt = route.path[i];
                routePoints.push(new Microsoft.Maps.Location(pt[0], pt[1]));
            }
            routeColor = routeColor || new Microsoft.Maps.Color(200, 0, 0, 200);
            var shape = this._routeShape = new Microsoft.Maps.Polyline(routePoints, { strokeColor: routeColor });
            this._map.entities.push(shape);
        },
        _renumberSelected: function () {
            // reset the text in each pushpin to match the item order
            dojo.forEach(this._pushpins, function (item) {
                item.pushpin.setOptions({ text: String(item.point.order) });
            });
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
            this._map.setView({ center: new Microsoft.Maps.Location(item.latitude, item.longitude) });
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
    return bingMapModule;
});
