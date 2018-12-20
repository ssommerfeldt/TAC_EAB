/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/GoogleRouteModule", [
    'dojo/_base/declare',
    'dojo/io-query',
    'dojo/string',
    'Sage/ProximitySearch/Events',
    'Sage/ProximitySearch/RouteModel',
    'dojo/_base/lang',
    'dojo/i18n!./nls/RouteModule'
],
function (declare, ioQuery, string, Events, RouteModel, lang, RouteModule) {
    var googleRouteModule = declare("Sage.ProximitySearch.GoogleRouteModule", null, {
        _googleKey: null,
        _isMetric: false,
        constructor: function (googleKey, metric) {
            this._routeModel = null;
            this._googleKey = googleKey;
            this._isMetric = metric;
            this._ajaxInProgress = false;
            this._requestedRoute = null;  // this will be set to the selected points while the call is in progress - in case they change the selection while we are calculating the route
        },
        initModule: function (sandbox) {
            this._sandbox = sandbox;
            sandbox.subscribe(Events.MapRefresh, dojo.hitch(this, "onMapRefresh"));
            sandbox.subscribe(Events.RouteCalculate, dojo.hitch(this, "onRouteCalculate"));
            sandbox.subscribe(Events.SelectionAdd, dojo.hitch(this, "onSelectionChange"), 9);
            sandbox.subscribe(Events.SelectionRemove, dojo.hitch(this, "onSelectionChange"), 9);
            sandbox.subscribe(Events.SelectionReorder, dojo.hitch(this, "onSelectionChange"), 9);
            sandbox.subscribe(Events.MapSession, dojo.hitch(this, "onMapSession"), 9);
        },
        //--- Event Handlers ------------------------
        onMapSession: function (sessionKey) {
            if (sessionKey)
                this._googleKey = sessionKey;
        },
        onMapRefresh: function (mapModel) {
            this._mapModel = mapModel;
            if (this._routeModel)
                this.onRouteCalculate();
        },
        onSelectionChange: function () {
            if (this._routeModel)
                this.onRouteCalculate();
        },
        onRouteCalculate: function () {
            if (this._queuedCalculate)
                return;
            if (this._ajaxInProgress) {
                this._sandbox.warn(RouteModule.inProgressError);
                this._queuedCalculate = true;  // this will call the RouteCallback to call us
                return;
            }
            // here this is used to avoid triggering the timeout more than 1ce at a time
            this._queuedCalculate = true;
            var mapUnits = (this._isMetric) ? google.maps.UnitSystem.METRIC : google.maps.UnitSystem.IMPERIAL;
            // we put in a small timeout in case the code is currently looping through a selection.  This will avoid triggering the route
            // calculation too many times
            setTimeout(dojo.hitch(this, function () {
                this._queuedCalculate = false;  // timeout happened so OK to do another one (we'll set ajaxInProgress to ensure 2 do not happen at the same time though)

                var directionsService = new google.maps.DirectionsService();
                var wps = {};
                var selection = this._requestedRoute = dojo.clone(this._mapModel.getSelected());
                if (selection.length === 0) {
                    var rm = this._routeModel;
                    rm.clear();
                    this._sandbox.publish(Events.RouteUpdated, rm);
                    this._routeModel = null;
                    return;
                }
                if (selection.length < 2 || selection.length > 10) {
                    this._sandbox.error(RouteModule.googleRouteOutOfRangeError);
                    return;
                }

                var wayPts = [];
                if (selection.length > 2) {
                    for (var i = 1; i < selection.length - 1; i++) {
                        var wp = selection[i];
                        wayPts.push({
                            location: {lat: wp.latitude, lng: wp.longitude},
                            stopover: true
                        });
                    }
                }
                this._ajaxInProgress = true;  // except we'll set this to true to ensure it does not happen
                directionsService.route({
                    origin: string.substitute("${0},${1}", [selection[0].latitude, selection[0].longitude]),
                    destination: string.substitute("${0},${1}", [selection[selection.length - 1].latitude, selection[selection.length - 1].longitude]),
                    waypoints: wayPts,
                    travelMode: 'DRIVING',
                    unitSystem: mapUnits
                }, dojo.hitch(this, "onRouteCalculateCallback"));

            }), 500);
        },
        onRouteCalculateCallback: function (response, status) {
            this._ajaxInProgress = false;
            if (this._queuedCalculate) {
                this._queuedCalculate = false;
                this.onRouteCalculate();
                return;
            }
            if (status !== 'OK') {
                this._sandbox.error(status);
                return;
            }
            if (!this._routeModel)
                this._routeModel = new RouteModel("Google", this._isMetric);
            this._routeModel.resultData = response;
            var requestedRoute = this._requestedRoute;
            var rm = this._routeModel;
            rm.clear();

            var totDist = 0;
            var totTime = 0;
            var route = response.routes[0];
            rm.path = route.overview_path;
            rm.originPoint = requestedRoute[0];
            rm.originActual = route.legs[0].start_location;
            rm.destinationPoint = requestedRoute[requestedRoute.length - 1];
            rm.destinationActual = route.legs[route.legs.length - 1].end_location;

            for (var i = 0; i < route.legs.length; i++) {
                var target = new RouteModel("Google", this._isMetric);
                var leg = route.legs[i];
                target.totalDistance = leg.distance.text;
                target.totalDuration = leg.duration.text;

                totDist += leg.distance.value;
                totTime += leg.duration.value;

                target.originPoint = requestedRoute[i];
                target.destinationPoint = requestedRoute[i + 1];
                target.originActual = leg.start_location;
                target.destinationActual = leg.end_location;
                target.path = null; // not needed for legs (XXX need to add so we can do highlights)
                for (var j = 0; j < leg.steps.length; j++) {
                    var it = leg.steps[j];
                    var turn = {
                        instruction: it.instructions,
                        direction: "",
                        coordinates: [
                            it.start_location,
                            it.end_location
                            ]
                    };
                    target.addLeg(turn);
                }
                rm.addLeg(target);
            }

            rm.totalDistance = totDist;
            rm.totalDuration = totTime;

            this._sandbox.publish(Events.RouteUpdated, rm);
        }
    });
    return googleRouteModule;
});
