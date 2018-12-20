/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/ActivityRecurring", [
       'Sage/Utility',
       'Sage/Utility/Activity',
       'dojo/string',
       'dojo/_base/declare'
],
function (util, activityUtil, dString, declare) {
    return declare("Sage.UI.Controls.GridParts.Columns.ActivityRecurring", null, {
        keyField: false,
        format: function (inRowIndex, inItem) {
            if (!inItem) {
                return this.defaultValue;
            }
            var html = "";
            var activity = (inItem.hasOwnProperty('Activity') && typeof inItem['Activity'] === 'object') ? inItem.Activity : inItem;
            var recur = util.getValue(activity, 'Recurring');
            var recurState = util.getValue(activity, 'RecurrenceState');
            if (recur || (recurState && recurState === 'rstOccurrence')) {
                html = '<div class="Global_Images icon16x16 icon_recurring"></div>';
            }
            return html;
        }
    });
});