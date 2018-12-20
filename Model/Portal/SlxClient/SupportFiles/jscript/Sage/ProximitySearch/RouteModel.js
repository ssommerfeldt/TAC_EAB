/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/RouteModel", [
    'dijit/_Widget',
    'dijit/_Templated',
    'dojo/_base/declare',
    'Sage/ProximitySearch/Utilities',
    'dojo/_base/lang',
    'dojo/i18n!./nls/RouteModel'
],
function (_Widget, _Templated, declare, Utilities, lang, RouteModel) {
    var routeModel = dojo.declare("Sage.ProximitySearch.RouteModel", null, {
        // Localization
        mileAbbrevText: RouteModel.mileAbbrevText,
        kilometerAbbrevText: RouteModel.kilometerAbbrevText,
        _isMetric: false,

        // summary:
        //  Represents a route between 2 or more points.
        //  A route is comprised of legs.  A leg is comprised of other legs, or turns.
        //  A turn is an object with the following properties:
        //  - instruction: text description of the turn
        //  - coordinates: coordinate for the maneuver on the map
        //  - direction: general heading
        constructor: function (provider, metric) {
            this.clear();
            this._isMetric = metric;
            this.mapProvider = provider;
        },
        mapProvider: null, // The map provider, Bing, Google, etc
        totalDistance: 0,  // total distance (miles or km)
        totalDuration: 0,  // total duration in seconds
        originPoint: null,  // the source point data for the start of the trip (from our MapModel)
        destinationPoint: null,  // the destination point data
        originActual: null,  // coordinates (lat,lon pair) for the actual start of the trip
        destinationActual: null,   // coordinates (lat,lon pair) for the actual destination of the trip
        path: null,  // array of points (pair of lat, lon) that the route is comprised of (this may be null)
        resultData: null, // The original data from the request.
        clear: function () {
            this._legs = [];
        },
        addLeg: function (leg) {
            // add a leg of a trip (i.e. step between 2 waypoints)
            // a leg can be either a RouteModel object (for a typical waypoint situation) or a RouteTurn object
            this._legs.push(leg);
        },
        getLegs: function () {
            // get all legs that compose this trip
            return this._legs;
        },
        metersToMi: function (meters) {
            return (Math.round((meters * 0.000621371192) * 100) / 100);
        },
        metersToKm: function (meters) {
            return (Math.round((meters / 1000) * 100) / 100);
        },
        milesToMi: function (miles) {
            return (Math.round(miles * 100) / 100);
        },
        getSummaryHTML: function () {
            // summary text
            var html = Utilities.escapeHTML(this.originPoint.name) + " &rarr; " + Utilities.escapeHTML(this.destinationPoint.name);
            var dist = [];
            if (this.totalDistance) {
                if (isNaN(this.totalDistance)) {
                    dist.push(this.totalDistance);
                } else {
                    switch (this.mapProvider) {
                        case "Google":
                            // In meters
                            dist.push(String(((this._isMetric) ? this.metersToKm(this.totalDistance) : this.metersToMi(this.totalDistance))) + " " + ((this._isMetric) ? this.kilometerAbbrevText : this.mileAbbrevText));
                            break;
                        default:
                            // Don't convert the values for this provider.
                            dist.push(String(this.milesToMi(this.totalDistance)) + " " + ((this._isMetric) ? this.kilometerAbbrevText : this.mileAbbrevText));
                            break;
                    }
                }
            }
            if (this.totalDuration) {
                if (isNaN(this.totalDuration)) {
                    dist.push(this.totalDuration);
                } else {
                    // Seconds
                    var dur = Math.round(this.totalDuration / 60);
                    var mins = (dur % 60);
                    if (mins < 10)
                        mins = "0" + mins;
                    dist.push(Math.floor(dur / 60) + "h" + mins);
                }
            }
            if (dist.length > 0) {
                html += " <span class='distance'>(" + dist.join("; ") + ")</span>";
            }
            return html;
        }
    });
    return routeModel;
});
