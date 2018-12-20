/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/ActivityMgr/ConfirmListPanelConfig", [
    'Sage/MainView/ActivityMgr/BaseListPanelConfig',
    'Sage/Utility',
    'Sage/Utility/Activity',
    'Sage/UI/SummaryFormatterScope',
    'Sage/Data/BaseSDataStore',
    'Sage/UI/Controls/GridParts/Columns/DateTime',
    'Sage/UI/Controls/GridParts/Columns/ActivityType',
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/string',
    'dojo/i18n!./nls/ConfirmListPanelConfig',
    'dojo/i18n!./templates/nls/ConfirmationListSummary',        // Bare import for template NLS dependency.
    'dojo/i18n!./templates/nls/ConfirmationDetailSummary',      // Bare import for template NLS dependency.
],
function (
    baseListPanelConfig,
    sageUtility,
    utilityActivity,
    summaryFormatterScope,
    baseSDataStore,
    columnsDateTime,
    ActivityType,
    declare,
    connect,
    dString,
    nlsResources
) {
    var confirmListPanelConfig = declare('Sage.MainView.ActivityMgr.ConfirmListPanelConfig', [baseListPanelConfig], {
        constructor: function () {
            this._nlsResources = nlsResources;
            this._listId = 'confirmations';
            this._resourceKind = 'UserNotifications';
            this.entityName = 'UserNotification';
            this._contextMenu = 'ConfimationListContextMenu';
            this._scheduleContextMenu = 'ScheduleContextMenu';
            this._structure = this._getStructure();
            this._select = this._getSelect();
            this._include = this._getInclude();
            this._sort = this._getSort();
            this._where = this._getWhere();
            this._store = this._getStore();
            this.list = this._getListConfig();
            this.detail = this._getDetailConfig();
            this.summary = this._getSummaryConfig();
            this.toolBar = this._getToolBars();
            connect.subscribe('/entity/userNotification/change', this._onListRefresh);
            connect.subscribe('/entity/userNotification/delete', this._onListRefresh);
        },
        _onListRefresh: function (event) {
            var activityService = Sage.Services.getService('ActivityService');
            activityService.refreshList('confirmations');
        },
        _getSelect: function () {
            return [
                '$key',
                'Type',
                'ActivityId',
                'Activity/Type',
                'Activity/StartDate',
                'Activity/Description',
                'FromUserId',
                'ToUserId',
                'FromUser/UserInfo/UserName',
                'ToUser/UserInfo/UserName'
            ];
        },
        _getInclude: function () {
            return ["UserInfo"];
        },
        _getSort: function () {
            return [{ attribute: 'Activity.StartDate', descending: true }];
        },
        _getWhere: function () {
            return (this._currentUserId) ? dString.substitute('ToUser.Id eq "${0}" ', [this._currentUserId]) : '';
        },
        _getStructure: function() {
            var colNameType = this._nlsResources.colNameType || 'Activity Type';
            var colNameStatus = this._nlsResources.colNameNotification || 'Notification';
            var colNameStartDate = this._nlsResources.colNameStartDate || 'Start Date';
            var colNameRegarding = this._nlsResources.colNameRegarding || 'Regarding';
            var colNameFromUser = this._nlsResources.colNameFromUser || 'From';
            var colNameToUser = this._nlsResources.colNameToUser || 'To User';

            var activityConfirmCell = declare("Sage.MainView.ActivityMgr.ConfirmListPanelConfig.ActivityConfirmCell", null, {
                format: function(inRowIndex, inItem) {
                    var key = sageUtility.getValue(inItem, "$key");
                    var type = sageUtility.getValue(inItem, "Type");
                    var statusName = utilityActivity.getConfirmStatusName(type);
                    var html = "<a href='javascript:Sage.Link.editConfirmation(\"" + key + "\")' >" + statusName + "</a>";
                    return html;
                }
            });

            return [
                {
                    field: 'Type',
                    label: colNameStatus,
                    type: activityConfirmCell,
                    width: 90
                },
                {
                    field: 'Activity.Type',
                    label: colNameType,
                    type: ActivityType,
                    width: 90
                },
                {
                    field: 'Activity.StartDate',
                    label: colNameStartDate,
                    type: columnsDateTime,
                    timelessField: 'Timeless',
                    width: 150
                },
                {
                    field: 'Activity.Description',
                    label: colNameRegarding,
                    width: 300
                },
                {
                    field: 'FromUser.UserInfo.UserName',
                    label: colNameFromUser,
                    width: 100
                },
                {
                    field: 'ToUser.UserInfo.UserName',
                    label: colNameToUser,
                    width: 100
                }
            ];
        },
        _getDetailConfig: function () {
            var formatScope = this._getFormatterScope();
            return {
                resourceKind: this._resourceKind,
                requestConfiguration: {
                    mashupName: 'ActivityManager',
                    queryName: 'ConfirmationDetailSummary_query'
                },
                templateLocation: 'MainView/ActivityMgr/templates/ConfirmationDetailSummary.html',
                postProcessCallBack: false
            };
        },
        _getFormatterScope: function () {
            return new summaryFormatterScope({
                requestConfiguration: {
                    mashupName: 'ActivityManager',
                    queryName: 'ConfirmationListSummary_query'
                },
                templateLocation: 'MainView/ActivityMgr/templates/ConfirmationListSummary.html'
            });
        },
        _getToolBars: function () {
            return { items: [] };
        }
    });
    return confirmListPanelConfig;
});