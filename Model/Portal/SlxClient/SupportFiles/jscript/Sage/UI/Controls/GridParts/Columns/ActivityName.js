/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/ActivityName", [
       'Sage/Utility',
       'Sage/Utility/Activity',
       'dojo/string',
       'dojo/_base/declare'
],
function (util, activityUtil, dString, declare) {
    return declare("Sage.UI.Controls.GridParts.Columns.ActivityName", null, {
        keyField: false,
        format: function (inRowIndex, inItem) {
            if (!inItem) {
                return this.defaultValue;
            }
            var activity = (inItem.hasOwnProperty('Activity') && typeof inItem['Activity'] === 'object') ? inItem.Activity : inItem;
            var contact = util.getValue(activity, 'ContactName');
            var contactId = util.getValue(activity, 'ContactId');
            if (activityUtil.isValidId(contactId)) {
                return '<a href="Contact.aspx?entityid=' + contactId + '" >' + contact + '</a>';
            }
            var lead = util.getValue(activity, 'LeadName');
            var leadId = util.getValue(activity, 'LeadId');
            if (activityUtil.isValidId(leadId)) {
                return '<a href="Lead.aspx?entityid=' + leadId + '" >' + lead + '</a>';
            }
            return "<div></div> ";
        }
    });
});