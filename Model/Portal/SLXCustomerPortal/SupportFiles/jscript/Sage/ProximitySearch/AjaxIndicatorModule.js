/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/AjaxIndicatorModule", [
    'dojo/_base/declare',
    'Sage/ProximitySearch/Events'
],
function (declare, Events) {
    var ajaxIndicatorModule = declare("Sage.ProximitySearch.AjaxIndicatorModule", null, {
        constructor: function(div) {
            this._div = dojo.byId(div);
            this._div.style.display = "none";
        },
        initModule: function(sb) {
            sb.subscribe(Events.AjaxStart, dojo.hitch(this, "_showIndicator"));
            sb.subscribe(Events.AjaxEnd, dojo.hitch(this, "_hideIndicator"));
        },
        _showIndicator: function() {
            this._div.style.display = "block";
        },
        _hideIndicator: function() {
            this._div.style.display = "none";
        }
    });
    return ajaxIndicatorModule;
});
