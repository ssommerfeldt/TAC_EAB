/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/ActivityLeader", [
       'Sage/Utility',
       'Sage/Utility/Activity',
       'dojo/string',
       'dojo/_base/declare'
],
function (util, activityUtil, dString, declare) {
    return declare("Sage.UI.Controls.GridParts.Columns.ActivityLeader", null, {
        keyField: false,
        format: function (inRowIndex, inItem) {
            if (!inItem) {
                return this.defaultValue;
            }
            var activity = (inItem.hasOwnProperty('Activity') && typeof inItem['Activity'] === 'object') ? inItem.Activity : null;
            var leader;

            if (activity) {
                leader = util.getValue(activity, "Leader");
            } else {
                leader = (inItem.hasOwnProperty('Leader') && typeof inItem['Leader'] === 'object') ? inItem.Leader : inItem;
            }
            var leaderName = util.getValue(leader, '$descriptor');
            return leaderName;
        }
    });
});