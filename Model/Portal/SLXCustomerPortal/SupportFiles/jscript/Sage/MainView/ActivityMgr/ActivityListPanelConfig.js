/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */

define("Sage/MainView/ActivityMgr/ActivityListPanelConfig", [
    'dojo/i18n',
    'Sage/MainView/ActivityMgr/BaseListPanelConfig',
    'Sage/Utility/Activity',
    'Sage/Utility',
    'Sage/UI/SummaryFormatterScope',
    'Sage/UI/SDataSummaryFormatterScope',
    'Sage/Store/SData',
    'Sage/UI/Controls/GridParts/Columns/DateTime',
    'Sage/UI/Controls/GridParts/Columns/ActivityType',
    'Sage/UI/Controls/GridParts/Columns/ActivityDuration',
    'Sage/UI/Controls/GridParts/Columns/ActivityName',
    'Sage/UI/Controls/GridParts/Columns/ActivityConfirmStatus',
    'Sage/UI/Controls/GridParts/Columns/ActivityAlarm',
    'Sage/UI/Controls/GridParts/Columns/ActivityAttachment',
    'Sage/UI/Controls/GridParts/Columns/ActivityRecurring',
    'Sage/UI/Controls/GridParts/Columns/ActivityNameType',
    'Sage/UI/Controls/GridParts/Columns/ActivityAccount',
    'Sage/UI/Controls/GridParts/Columns/ActivityLeader',
    'Sage/Data/SDataServiceRegistry',
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/string',
    'dojo/dom-construct',
    'dojo/i18n!./nls/ActivityListPanelConfig',
    'dojo/i18n!./templates/nls/UserActivityDetailSummary',          // Bare import for template NLS dependency.
    'dojo/i18n!./templates/nls/UserActivityListSummary'             // Bare import for template NLS dependency.
],
function (
   i18N,
   baseListPanelConfig,
   utilityActivity,
   utility,
   summaryFormatterScope,
   sDataSummaryFormatterScope,
   sDataStore,
   columnsDateTime,
   ActivityType,
   ActivityDuration,
   ActivityName,
   ActivityConfirmStatus,
   ActivityAlarm,
   ActivityAttachment,
   ActivityRecurring,
   ActivityNameType,
   ActivityAccount,
   ActivityLeader,
   sDataServiceRegistry,
   declare,
   connect,
   dString,
   domConstruct,
   nlsResources
) {
    var activityListPanelConfig = declare('Sage.MainView.ActivityMgr.ActivityListPanelConfig', [baseListPanelConfig], {

        constructor: function () {
            this._nlsResources = nlsResources;
            this._listId = 'Activities';
            this._resourceKind = 'userActivities';
            this.entityName = 'UserActivity';
            this._contextMenu = 'ActivityListContextMenu';
            this._scheduleContextMenu = 'ScheduleContextMenu';
            this._service = sDataServiceRegistry.getSDataService('system');
            this._structure = this._getStructure();
            this._select = this._getSelect();
            this._include = this._getInclude();
            this._sort = this._getSort();
            this._where = this._getWhere();
            this._store = this._getStore();
            this.list = this._getListConfig();
            this.summary = this._getSummaryConfig();
            this.detail = this._getDetailConfig();
            this.toolBar = this._getToolBars();
            this.keyField = "$key";
            this.hasCompositeKey = true;
            connect.subscribe('/entity/activity/change', this._onListRefresh);
            connect.subscribe('/entity/activity/delete', this._onListRefresh);
            connect.subscribe('/entity/activity/create', this._onListRefresh);
            connect.subscribe('/entity/userActivity/change', this._onListRefresh);
            connect.subscribe('/entity/userActivity/delete', this._onListRefresh);
            connect.subscribe('/entity/userActivity/create', this._onListRefresh);
            connect.subscribe('/entity/activity/confirm', this._onListRefresh);
            connect.subscribe('/entity/activity/decline', this._onListRefresh);
            connect.subscribe('/entity/userNotification/delete', this._onListRefresh);
            connect.subscribe('/entity/activityAttendees/updated', this._onListRefresh);
        },
        _onListRefresh: function (event) {
            var activityService = Sage.Services.getService('ActivityService');
            activityService.refreshList('activities');
        },
        _getSelect: function() {
            return [
                'Activity/Attachment',
                'Activity/Timeless',
                'Activity/Recurring',
                'Activity/RecurIterations',
                'Activity/Alarm',
                'Activity/Type',
                'Activity/StartDate',
                'Activity/Duration',
                'Activity/ContactName',
                'Activity/ContactId',
                'Activity/LeadName',
                'Activity/LeadId',
                'Activity/AccountName',
                'Activity/AccountId',
                'Activity/Description',
                'Activity/Priority',
                'Activity/Leader',
                'UserId',
                'AlarmTime',
                'Alarm',
                'Status',
                'Activity/AttendeeCount'
            ];
        },
        _getInclude: function () {
            return ["Activity", "$descriptors"];
        },
        _getSort: function () {
            return [{ attribute: 'Activity.StartDate', descending: true }];
        },
        _getWhere: function () {
            return (this._currentUserId) ? dString.substitute('(User.Id eq "${0}") and (Status ne "asDeclned" ) and (Activity.Type ne "atLiterature" ) ', [this._currentUserId]) : '';
        },
        _getStructure: function () {
            var colNameAttachment = domConstruct.toDom("<div class='Global_Images icon16x16 icon_attach_to_16' title='" + this._nlsResources.colNameAttachment + "' />");
            var colNameRecurring = domConstruct.toDom("<div class='Global_Images icon16x16 icon_recurring' title='" + this._nlsResources.colNameRecurring + "' />");
            var colNameAlarm = domConstruct.toDom("<img src='images/icons/Alarm_16x16.gif' title='" + this._nlsResources.colNameAlarm + "' alt='" + this._nlsResources.colNameAlarm + "' />");
            var colNameStatus = domConstruct.toDom("<div class='Global_Images icon16x16 icon_unconfirmedActivity16x16' title='" + this._nlsResources.colNameUnConfirmStatus + "' />");
            var colNameType = this._nlsResources.colNameType || 'Activity Type';
            var colNameStartDate = this._nlsResources.colNameStartDate || 'Start Date';
            var colNameDuration = this._nlsResources.colNameDuration || 'Duration';
            var colNameAccount = this._nlsResources.colNameAccount || 'Account/Company';
            var colNameRegarding = this._nlsResources.colNameRegarding || 'Regarding';
            var colNamePriority = this._nlsResources.colNamePriority || 'Priority';
            var colNameUserId = this._nlsResources.colNameUserId || 'Leader';
            var colNameTypeName = this._nlsResources.colNameTypeName || 'Type';
            var colNameContactName = this._nlsResources.colNameContactName || 'Name';
            var colNameAssociationCount = this._nlsResources.colNameAssociationCount || 'Participant Count';

            return [
                {
                    field: 'Status',
                    renderHeaderCell: function () { return colNameStatus; },
                    type: ActivityConfirmStatus,
                    width: 20,
                    //className: 'cell-contents-icon'
                },
                {
                    field: 'Alarm',
                    renderHeaderCell: function () { return colNameAlarm; },
                    type: ActivityAlarm,
                    width: 20,
                    //className: 'cell-contents-icon'
                },
                {
                    field: 'Activity.Attachment',
                    renderHeaderCell: function () { return colNameAttachment; },
                    label: "Attachment",
                    type: ActivityAttachment,
                    width: 20,
                    //className: 'cell-contents-icon'
                },
                {
                    field: 'Activity.Recurring',
                    renderHeaderCell: function () { return colNameRecurring; },
                    type: ActivityRecurring,
                    width: 20,
                    //className: 'cell-contents-icon'
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
                    timelessField: 'Activity.Timeless',
                    width: 100
                },
                {
                    field: 'Activity.Duration',
                    label: colNameDuration,
                    type: ActivityDuration,
                    width: 40
                },
                {
                    field: 'Activity.ContactId',
                    label: colNameTypeName,
                    type: ActivityNameType,
                    width: 40
                },
                {
                    field: 'Activity.ContactName',
                    label: colNameContactName,
                    type: ActivityName,
                    width: 200
                },
                {
                    field: 'Activity.AccountName',
                    label: colNameAccount,
                    type: ActivityAccount,
                    width: 200
                },
                {
                    field: 'Activity.Description',
                    label: colNameRegarding,
                    get: function (item) {
                        var sp = this.field.split(".");
                        var fieldObject = item;
                        for (var i = 0; i < sp.length; i++) {
                            if(fieldObject === null) {
                                return '';
                            }
                            fieldObject = fieldObject[sp[i]];
                        }
                        return fieldObject;
                    },
                    width: 100
                },
                {
                    field: 'Activity.Priority',
                    label: colNamePriority,
                    get: function (item) {
                        var sp = this.field.split(".");
                        var fieldObject = item;
                        for (var i = 0; i < sp.length; i++) {
                            if (fieldObject === null) {
                                return '';
                            }
                            fieldObject = fieldObject[sp[i]];
                        }
                        return fieldObject;
                    },
                    width: 40
                },
                {
                    field: 'Activity.Leader',
                    label: colNameUserId,
                    type: ActivityLeader,
                    width: 200
                },
                {
                    field: 'Activity.AttendeeCount',
                    label: colNameAssociationCount,
                    get: function (item) {
                        var sp = this.field.split(".");
                        var fieldObject = item;
                        for (var i = 0; i < sp.length; i++) {
                            if(fieldObject === null) {
                                return '';
                            }
                            fieldObject = fieldObject[sp[i]];
                        }
                        return fieldObject;
                    },
                    width: 90
                }
            ];
        },
        _getSummaryConfig: function () {
            var store = new sDataStore({
                id: this._listId,
                service: this._service,
                resourceKind: this._resourceKind,
                include: ['Activity','$descriptors'],
                select: ['$key'],
                expandRecurrences: false,
                where: this._where
            });

            var structure = [
                {
                    field: '$key',
                    formatter: 'formatSummary',
                    width: '100%',
                    name: 'Summary View'
                }
            ];
            var formatScope = this._getFormatterScope();
            return {
                columns: structure,
                layout: 'layout',
                store: store,
                keyField: '$key',
                rowHeight: 170,
                minRowsPerPage: 10,
                formatterScope: formatScope
            };
        },
        _getDetailConfig: function () {
            var formatScope = this._getFormatterScope();
            return {
                resourceKind: this._resourceKind,
                requestConfiguration: this._getSummaryDetailRequestConfig(),
                templateLocation: 'MainView/ActivityMgr/templates/UserActivityDetailSummary.html'
            };
        },
        _getSummaryListRequestConfig: function() {
            return {
                resourceKind: this._resourceKind,
                serviceName: 'system',
                keyField: '$key',
                select: [
                    '$key',
                    'Alarm',
                    'Status',
                    'User',
                    'Activity/Attachment',
                    'Activity/Timeless',
                    'Activity/Recurring',
                    'Activity/RecurIterations',
                    'Activity/Type',
                    'Activity/StartDate',
                    'Activity/Duration',
                    'Activity/ContactName',
                    'Activity/ContactId',
                    'Activity/LeadName',
                    'Activity/LeadId',
                    'Activity/AccountName',
                    'Activity/AccountId',
                    'Activity/Description',
                    'Activity/Priority',
                    'Activity/Leader',
                    'Activity/Location',
                    'Activity/TicketId',
                    'Activity/TicketNumber',
                    'Activity/OpportunityId',
                    'Activity/OpportunityName',
                    'Activity/Notes',
                    'Activity/PhoneNumber',
                    'Activity/AttendeeCount'
                ],
                include: ['Activity', '$descriptors'],
                useBatchRequest: true,
                expandRecurrences: false
            };
        },
        _getSummaryDetailRequestConfig: function() {
            return {
                resourceKind: this._resourceKind,
                serviceName: 'system',
                keyField: '$key',
                select: [
                    '$key',
                    'Alarm',
                    'Status',
                    'User',
                    'Activity/Attachment',
                    'Activity/Timeless',
                    'Activity/Recurring',
                    'Activity/RecurIterations',
                    'Activity/Type',
                    'Activity/StartDate',
                    'Activity/Duration',
                    'Activity/ContactName',
                    'Activity/ContactId',
                    'Activity/LeadName',
                    'Activity/LeadId',
                    'Activity/AccountName',
                    'Activity/AccountId',
                    'Activity/Description',
                    'Activity/Priority',
                    'Activity/Leader',
                    'Activity/Location',
                    'Activity/TicketId',
                    'Activity/TicketNumber',
                    'Activity/OpportunityId',
                    'Activity/OpportunityName',
                    'Activity/LongNotes',
                    'Activity/PhoneNumber',
                    'Activity/AttendeeCount'
                ],
                include: ['Activity', '$descriptors'],
                useBatchRequest: true,
                expandRecurrences: false
            };
        },
        _getFormatterScope: function () {
            return new sDataSummaryFormatterScope({
                templateLocation: 'MainView/ActivityMgr/templates/UserActivityListSummary.html',
                resetDataManager: true,
                requestConfiguration: this._getSummaryListRequestConfig()
            });
        },
        _getToolBars: function () {
            return { items: [] };
        },
        getTimelessProperty: function (propertyName) {
            return "Activity.Timeless";
        }
    });
    return activityListPanelConfig;
});