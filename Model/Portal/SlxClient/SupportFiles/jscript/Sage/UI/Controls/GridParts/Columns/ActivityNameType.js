/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/ActivityNameType", [
       'Sage/Utility',
       'Sage/Utility/Activity',
       'dojo/string',
       'dojo/_base/declare'
],
function (util, activityUtil, dString, declare) {
    return declare("Sage.UI.Controls.GridParts.Columns.ActivityNameType", null, {
        keyField: false,
        format: function (inRowIndex, inItem) {
            if (!inItem) {
                return this.defaultValue;
            }
            var activity = (inItem.hasOwnProperty('Activity') && typeof inItem['Activity'] === 'object') ? inItem.Activity : inItem;
            var contactId = util.getValue(activity, 'ContactId');
            if (activityUtil.isValidId(contactId)) {
                //return nlsStrings.Contact;
                return "Contact";
            }
            var leadId = util.getValue(activity, 'LeadId');
            if (activityUtil.isValidId(leadId)) {
                //return nlsStrings.Lead;
                return "Lead";
            }
            return '';
        }
    });
});