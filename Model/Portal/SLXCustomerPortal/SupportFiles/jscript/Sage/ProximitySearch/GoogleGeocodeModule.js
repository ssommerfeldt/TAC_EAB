/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/GoogleGeocodeModule", [
    'dojo/_base/declare',
    'dojo/io-query',
    'Sage/ProximitySearch/Events',
    'dojo/_base/lang',
    'dojo/i18n!./nls/GeocodeModule'
],
function (declare, ioQuery, Events, lang, GeocodeModule) {
    var googleGeocodeModule = declare("Sage.ProximitySearch.GoogleGeocodeModule", null, {
        _googleKey: null,
        _sandbox: null,
        constructor: function (googleKey) {
            this._googleKey = googleKey;
        },
        initModule: function (sandbox) {
            this._sandbox = sandbox;
            sandbox.subscribe(Events.SelectionCreate, this._onSelectionCreate);
            sandbox.subscribe(Events.MapSession, dojo.hitch(this, "onMapSession"), 9);
        },
        onMapSession: function (sessionKey) {
            if (sessionKey)
                this._googleKey = sessionKey;
        },
        _onSelectionCreate: function (pt) {
            var sandbox = this._sandbox;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': pt.address.replace(/(\r\n|\n|\r)/gm,"") }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var geoLoc = results[0].geometry.location;
                    pt.latitude = geoLoc.lat();
                    pt.longitude = geoLoc.lng();
                    sandbox.publish(Events.SelectionAdd, [pt]);
                }else {
                    sandbox.error(GeocodeModule.geocodeError);
                }
            });
        }
    });
    return googleGeocodeModule;
});
