/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityManagerFormatter", [
    'dojo/_base/lang'
],
function (lang) {
    var __class = lang.setObject('EntityManagerFormatter', lang.mixin({}, {
        formatCountProps: function (value) {
            return value.$resources.length;
        },
        formatCountFilter: function (value) {
            var metricCount = 0, fitlerCount = 0;
            for (var i = 0; i < value.$resources.length; i++) {
                if (value.$resources[i].filterType.indexOf("analyticsMetric") > -1) {
                    ++metricCount;
                } else {
                    ++fitlerCount;
                }
            }
            return fitlerCount;
        },
        formatCountMetric: function (value) {
            var metricCount = 0, fitlerCount = 0;
            for (var i = 0; i < value.$resources.length; i++) {
                if (value.$resources[i].filterType.indexOf("analyticsMetric") > -1) {
                    ++metricCount;
                } else {
                    ++fitlerCount;
                }
            }
            return metricCount;
        },
        formatProperCaseValue: function (value) {
            try {
                if (typeof value === "string") {
                    return value.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
                }
                else {
                    return '';
                }
            } catch (error) { }
            return '';
        }
    }));
    lang.setObject('Sage.MainView.EntityMgr.EntityManagerFormatter', __class);
    return Sage.MainView.EntityMgr.EntityManagerFormatter;
});