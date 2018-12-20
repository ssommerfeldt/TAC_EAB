/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/ActivityDuration", [
       'Sage/Utility',
       'Sage/Utility/Activity',
       'dojo/string',
       'dojo/_base/declare'
],
function (util, activityUtil, dString, declare) {
    return declare("Sage.UI.Controls.GridParts.Columns.ActivityDuration", null, {
        keyField: false,
        format: function (inRowIndex, inItem) {
            if (!inItem) {
                return this.defaultValue;
            }
            var durationStr = "";
            var activity = (inItem.hasOwnProperty('Activity') && typeof inItem['Activity'] === 'object') ? inItem.Activity : inItem;
            var duration = util.getValue(activity, 'Duration');
            if (duration) {
                var timeless = util.getValue(activity, 'Timeless');
                durationStr = activityUtil.formatDuration(duration, timeless);
            }
            return durationStr;
        }
    });
});