/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/ActivityAccount", [
       'Sage/Utility',
       'Sage/Utility/Activity',
       'dojo/string',
       'dojo/_base/declare'
],
function (util, activityUtil, dString, declare) {
    return declare("Sage.UI.Controls.GridParts.Columns.ActivityAccount", null, {
        keyField: false,
        format: function (inRowIndex, inItem) {
            if (!inItem) {
                return this.defaultValue;
            }
            var activity = (inItem.hasOwnProperty('Activity') && typeof inItem['Activity'] === 'object') ? inItem.Activity : inItem;
            var account = util.getValue(activity, 'AccountName');
            var accountId = util.getValue(activity, 'AccountId');
            var html = '';
            if (activityUtil.isValidId(accountId)) {
                html = '<a href="Account.aspx?entityid=' + accountId + '" >' + account + '</a>';
            }
            var leadId = util.getValue(activity, 'LeadId');
            if (activityUtil.isValidId(leadId)) {
                html = '<a href="Lead.aspx?entityid=' + leadId + '" >' + account + '</a>';
            }
            return html;
        }
    });
});