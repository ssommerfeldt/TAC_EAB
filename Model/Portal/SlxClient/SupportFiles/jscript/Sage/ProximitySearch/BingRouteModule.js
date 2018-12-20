/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/BingRouteModule", [
    'dojo/_base/declare',
    'Sage/ProximitySearch/Events',
    'Sage/ProximitySearch/RouteModel',
    'dojo/_base/lang',
    'dojo/i18n!./nls/RouteModule'
],
function (declare, Events, RouteModel, lang, RouteModule) {
    var bingRouteModule = declare("Sage.ProximitySearch.BingRouteModule", null, {
        _bingKey: null,
        _isMetric: false,
        _culture: 'en-US',
        constructor: function (bingKey, metric, culture) {
            this._routeModel = null;
            this._bingKey = bingKey;
            this._isMetric = metric;
            this._culture = (culture) ? culture : 'en-US';
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
                this._bingKey = sessionKey;
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
            // we put in a small timeout in case the code is currently looping through a selection.  This will avoid triggering the route
            // calculation too many times
            setTimeout(dojo.hitch(this, function () {
                this._queuedCalculate = false;  // timeout happened so OK to do another one (we'll set ajaxInProgress to ensure 2 do not happen at the same time though)

                var url = "http://dev.virtualearth.net/REST/v1/Routes";
                var wps = {};
                var selection = this._requestedRoute = dojo.clone(this._mapModel.getSelected());
                if (selection.length === 0) {
                    var rm = this._routeModel;
                    rm.clear();
                    this._sandbox.publish(Events.RouteUpdated, rm);
                    this._routeModel = null;
                    return;
                }
                if (selection.length < 2 || selection.length > 25) {
                    this._sandbox.error(RouteModule.bingRouteOutOfRangeError);
                    return;
                }
                for (var i = 0; i < selection.length; i++) {
                    var wp = selection[i];
                    wps["waypoint." + (i + 1)] = wp.latitude + "," + wp.longitude;
                }
                wps["key"] = this._bingKey;
                wps["rpo"] = "Points"; // request route path points
                wps["distanceUnit"] = ((this._isMetric) ? "km" : "mi");
                wps["culture"] = this._culture;

                this._ajaxInProgress = true;  // except we'll set this to true to ensure it does not happen
                this._sandbox.ajax.ajaxp(url, wps, 'jsonp', dojo.hitch(this, "onRouteCalculateCallback"));
            }), 500);
        },
        onRouteCalculateCallback: function (result) {
            this._ajaxInProgress = false;
            if (this._queuedCalculate) {
                this._queuedCalculate = false;
                this.onRouteCalculate();
                return;
            }
            if (result.statusCode != 200) {
                this._sandbox.error(result.errorDetails ? result.errorDetails[0] : result.statusDescription);
                return;
            }
            if (!this._routeModel)
                this._routeModel = new RouteModel("Bing", this._isMetric);
            this._routeModel.resultData = result;
            var requestedRoute = this._requestedRoute;
            var rm = this._routeModel;
            rm.clear();
            var route = result.resourceSets[0].resources[0];
            rm.path = route.routePath.line.coordinates;
            rm.totalDistance = route.travelDistance;
            rm.totalDuration = route.travelDuration;
            rm.originPoint = requestedRoute[0];
            rm.originActual = route.routeLegs[0].actualStart.coordinates;
            rm.destinationPoint = requestedRoute[requestedRoute.length - 1];
            rm.destinationActual = route.routeLegs[route.routeLegs.length - 1].actualEnd.coordinates;

            for (var i = 0; i < route.routeLegs.length; i++) {
                var target = new RouteModel("Bing", this._isMetric);
                var leg = route.routeLegs[i];
                target.totalDistance = leg.travelDistance;
                target.totalDuration = leg.travelDuration;
                target.originPoint = requestedRoute[i];
                target.destinationPoint = requestedRoute[i + 1];
                target.originActual = leg.actualStart.coordinates;
                target.destinationActual = leg.actualEnd.coordinates;
                target.path = null; // not needed for legs (XXX need to add so we can do highlights)
                for (var j = 0; j < leg.itineraryItems.length; j++) {
                    var it = leg.itineraryItems[j];
                    var turn = {
                        instruction: it.instruction.text,
                        direction: it.compassDirection,
                        coordinates: it.maneuverPoint.coordinates
                    };
                    target.addLeg(turn);
                }
                rm.addLeg(target);
            }

            this._sandbox.publish(Events.RouteUpdated, rm);
        }
    });
    return bingRouteModule;
});
