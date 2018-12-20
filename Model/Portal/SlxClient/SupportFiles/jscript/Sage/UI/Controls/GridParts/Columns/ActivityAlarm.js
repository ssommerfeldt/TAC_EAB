/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/ActivityAlarm", [
       'Sage/Utility',
       'Sage/Utility/Activity',
       'dojo/string',
       'dojo/_base/declare'
],
function (util, activityUtil, dString, declare) {
    return declare("Sage.UI.Controls.GridParts.Columns.ActivityAlarm", null, {
        keyField: false,
        format: function (val, index) {
            var resultHtml = "<div><div>";
            if (val) {
                resultHtml = "<img src='images/icons/Alarm_16x16.gif'/>";
            }

            return resultHtml;

        }
    });
});