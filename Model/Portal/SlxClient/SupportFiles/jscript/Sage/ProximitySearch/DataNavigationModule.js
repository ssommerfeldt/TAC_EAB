/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/DataNavigationModule", [
    'dojo/_base/declare',
    'Sage/ProximitySearch/Events'
],
function (declare, Events) {
    var dataNavigationModule = declare("Sage.ProximitySearch.DataNavigationModule", null, {
        // record navigation
        initModule: function (sb) {
            sb.subscribe(Events.DataNavigate, function (url) {
                if (window.opener)
                    window.opener.location.href = url;
                else
                    window.open(url, 'PxSearch-DataNavigation');
            });
        }
    });
    return dataNavigationModule;
});
