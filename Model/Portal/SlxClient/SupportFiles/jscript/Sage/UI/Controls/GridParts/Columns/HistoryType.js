/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/HistoryType", [
       'Sage/Utility',
       'Sage/Utility/Activity',
       'dojo/string',
       'dojo/_base/declare'
],
function (util, activity, dString, declare) {
    return declare("Sage.UI.Controls.GridParts.Columns.HistoryType", null, {
        keyField: false,
        format: function (value, inItem) {
            var type = value;
            if (!type) {
                return this.defaultValue;
            }
            var key = util.getValue(inItem, this.keyField || "$key");
            var fmt = '<div class="Global_Images icon16x16 ${0}"></div>&nbsp;<span onclick="javascript:Sage.Link.editHistory(\'${1}\')" class="activity-type-link">${2}</span>';
            return dString.substitute(fmt, [activity.getActivityImageClass(type, 'small'), key, activity.getActivityTypeName(type)]);
        }
    });
});
