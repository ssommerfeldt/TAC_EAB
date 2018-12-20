/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/ActivityType", [
       'Sage/Utility',
       'Sage/Utility/Activity',
       'dojo/string',
       'dojo/_base/declare'
],
function (util, activityUtil, dString, declare) {
    return declare("Sage.UI.Controls.GridParts.Columns.ActivityType", null, {
        keyField: false,
        defaultValue: '',
        format: function (value, inItem) {
            if (!inItem) {
                return this.defaultValue;
            }
            
            var activity = (inItem.hasOwnProperty('Activity') && typeof inItem['Activity'] === 'object') ? inItem.Activity : inItem;

            if (!activity) {
                return this.defaultValue;
            }

            var key = util.getValue(activity, "$key");
            var type = util.getValue(activity, "Type");
            var confStatus = (inItem.hasOwnProperty('Status')) ? inItem.Status : false;
            var fmtStr = '<span onclick="${0}" class="activity-type-link" ><div class="Global_Images icon16x16 ${1}" title="${2}"></div>&nbsp;${2}</span>';

            // Determine the recurrence context, so we pass the correct recurring flag so that the recurrence dialog will be not be shown if there is no ending to the occurrence. 
            var reocState = util.getValue(activity, 'RecurrenceState');
            var recurring = activityUtil._getReccurenceFlag(activity);
            // typically, we will want to edit the activity
            var href = 'javascript:Sage.Link.editActivity(\'' + key + '\', ' + recurring + ')';
            if (confStatus) {
                var curUser = util.getClientContextByKey('userID');
                // assume the current user is who the user activity is for...
                var actUser = (inItem.hasOwnProperty['User']) ? inItem.User['$key'] : curUser;
                //if the current user has not confirmed the activity, then they need to confirm it before editing.
                if (confStatus === 'asUnconfirmed' && curUser === actUser) {
                    href = 'javascript:Sage.Link.confirmActivityFor(\'' + key + '\', \'' + curUser + '\')';
                }
            } else {
                // if we don't know if the user has confirmed or not, let the activity service check...
                href = 'javascript:Sage.Link.editActivityIfConfirmed(\'' + key + '\', ' + recurring + ')';
            }
            var retVal = dString.substitute(fmtStr, [href, activityUtil.getActivityImageClass(type, 'small'), activityUtil.getActivityTypeName(type)]);
            return retVal;
        }
    });
});
