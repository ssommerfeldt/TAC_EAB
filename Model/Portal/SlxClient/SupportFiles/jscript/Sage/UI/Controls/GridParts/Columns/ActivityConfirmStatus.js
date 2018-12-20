/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/ActivityConfirmStatus", [
       'Sage/Utility',
       'Sage/Utility/Activity',
       'dojo/string',
       'dojo/_base/declare'
],
function (util, activityUtil, dString, declare) {
    return declare("Sage.UI.Controls.GridParts.Columns.ActivityConfirmStatus", null, {
        keyField: false,
        format: function (inRowIndex, inItem) {
            if (!inItem) {
                return this.defaultValue;
            }
            var html = "<div><div>";
            var status = util.getValue(inItem, 'Status');
            if (status === 'asUnconfirmed') {
                html = '<div class="Global_Images icon16x16 icon_unconfirmedActivity16x16"></div>';
            }
            return html;
        }
    });
});