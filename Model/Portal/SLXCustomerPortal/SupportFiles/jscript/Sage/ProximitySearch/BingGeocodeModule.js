/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/BingGeocodeModule", [
    'dojo/_base/declare',
    'Sage/ProximitySearch/Events',
    'dojo/_base/lang',
    'dojo/i18n!./nls/GeocodeModule'
],
function (declare, Events, lang, GeocodeModule) {
    var bingGeocodeModule = declare("Sage.ProximitySearch.BingGeocodeModule", null, {
        _bingKey: null,
        constructor: function (bingKey) {
            this._bingKey = bingKey;
        },
        initModule: function (sandbox) {
            this._sandbox = sandbox;
            sandbox.subscribe(Events.SelectionCreate, this._onSelectionCreate);
            sandbox.subscribe(Events.MapSession, dojo.hitch(this, "onMapSession"), 9);
        },
        onMapSession: function (sessionKey) {
            if (sessionKey)
                this._bingKey = sessionKey;
        },
        _onSelectionCreate: function (pt) {
            var url = "http://dev.virtualearth.net/REST/v1/Locations";
            var data = { output: "json", key: this._bingKey, query: pt.address };
            this._sandbox.ajax.ajaxp(url, data, 'jsonp', dojo.hitch(this, function (data) {
                if (data.statusCode == 200 && data.resourceSets[0].estimatedTotal > 0) {
                    var geo = data.resourceSets[0].resources[0].point.coordinates;
                    pt.latitude = geo[0];
                    pt.longitude = geo[1];
                    this._sandbox.publish(Events.SelectionAdd, [pt]);
                } else {
                    this._sandbox.error(GeocodeModule.geocodeError);
                }
            }));
        }
    });
    return bingGeocodeModule;
});
