/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/DirectionView", [
    'dojo/_base/declare',
    'Sage/ProximitySearch/Events',
    'Sage/ProximitySearch/RouteModel',
    'dojo/_base/lang',
    'dojo/i18n!./nls/DirectionView'
],
function (declare, Events, RouteModel, lang, DirectionView) {
    var directionView = declare("Sage.ProximitySearch.DirectionView", null, {
        // View for the turn-by-turn directions
        constructor: function (div) {
            this._div = dojo.byId(div);
            this._div.innerHTML = "<p>" + DirectionView.placeHolderText + "</p>";
        },
        initModule: function (sb) {
            this._sandbox = sb;
            sb.subscribe(Events.RouteUpdated, dojo.hitch(this, "onRouteUpdated"));
        },
        //--- Event Handlers ------------------------
        onRouteUpdated: function (route) {
            var html = [];
            this._div.innerHTML = this._showRouteSummary(route);
            var legs = route.getLegs();
            var ul = document.createElement("ul");
            for (var i = 0; i < legs.length; i++) {
                this._showRouteLeg(ul, legs[i]);
            }

            this._div.appendChild(ul);
        },
        //--- Private ------------------------
        _showRouteSummary: function (route) {
            if (route.getLegs().length <= 1)
                return DirectionView.placeHolderText;
            return "<div class='routesummary'>" + route.getSummaryHTML() + "</div>";
        },
        _showRouteLeg: function (ul, route) {
            if (route.constructor === RouteModel) {
                this._showWaypoint(ul, route);
            } else {
                this._showTurn(ul, route);
            }
        },
        _showWaypoint: function (ul, wp) {
            if (wp.originPoint.latitude == wp.destinationPoint.latitude &&
              wp.originPoint.longitude == wp.destinationPoint.longitude)
                return;
            var li = document.createElement("li");
            var wpDiv = document.createElement("div");
            var sb = this._sandbox;
            wpDiv.className = "waypoint";
            wpDiv.innerHTML = wp.getSummaryHTML();
            wpDiv.onmouseover = function () {
                sb.publish(Events.RouteSegmentHighlight, wp);
            };
            wpDiv.onmouseout = function () {
                sb.publish(Events.RouteSegmentUnhighlight, wp);
            };
            li.appendChild(wpDiv);
            ul.appendChild(li);

            var ul2 = document.createElement("ul");
            var legs = wp.getLegs();
            for (var i = 0; i < legs.length; i++) {
                this._showRouteLeg(ul2, legs[i]);
            }
            li.appendChild(ul2);
        },
        _showTurn: function (ul, turn) {
            var li = document.createElement("li");
            li.innerHTML = turn.instruction;
            li.className = 'turn';
            ul.appendChild(li);
        }
    });
    return directionView;
});
