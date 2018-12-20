/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/ActivityMgr/AlarmListPanelConfig", [
    'Sage/MainView/ActivityMgr/BaseListPanelConfig',
    'Sage/Utility',
    'Sage/Utility/Activity',
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
    'Sage/MainView/ActivityMgr/SnoozeButton',
    'Sage/MainView/ActivityMgr/SnoozeOptions',
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
   baseListPanelConfig,
   sageUtility,
   utilityActivity,
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
   SnoozeButton,
   SnoozeOptions,
   sDataServiceRegistry,
   declare,
   connect,
   string,
   domConstruct,
   nlsResources
) {
   var alarmListPanelConfig = declare('Sage.MainView.ActivityMgr.AlarmListPanelConfig', [baseListPanelConfig], {
        constructor: function () {
            this._nlsResources = nlsResources;
            this._listId = 'alarms';
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
            this.toolBar = this._getToolBars();
            this.keyField = "$key";
            this.hasCompositeKey = true;
            this.rebuildOnRefresh = true,
            connect.subscribe('/entity/activity/change', this._onListRefresh);
            connect.subscribe('/entity/activity/delete', this._onListRefresh);
            connect.subscribe('/entity/activity/create', this._onListRefresh);
            connect.subscribe('/entity/userActivity/change', this._onListRefresh);
            connect.subscribe('/entity/userActivity/delete', this._onListRefresh);
            connect.subscribe('/entity/userActivity/create', this._onListRefresh);
            connect.subscribe('/entity/activity/confirm', this._onListRefresh);
            connect.subscribe('/entity/activity/decline', this._onListRefresh);
        },
        _onListRefresh: function (event) {
            var activityService = Sage.Services.getService('ActivityService');
            activityService.refreshList('alarms');
        },
        _getSelect: function() {
            return [
                'Activity/Attachment',
                'Activity/Timeless',
                'Activity/Recurring',
                'Activity/RecurIterations',
                'Activity/Alarm',
                'Activity/AlarmTime',
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
                'Status'
            ];
        },
        _getInclude: function () {
            return ["Activity", "$descriptors"];
        },
        _getSort: function () {
            return [];
        },
        _getWhere: function () {
            return string.substitute("(User.Id eq '${0}' and Status ne 'asDeclned') and ((Alarm eq true and AlarmTime ne null and AlarmTime lt '${1}') or (Alarm eq null and AlarmTime eq null and Activity.Alarm eq true and Activity.AlarmTime lt '${1}'))", [this._currentUserId, Sage.Utility.Convert.toIsoStringFromDate(new Date())]);
        },
        _getStructure: function () {
            var colNameAttachment = domConstruct.toDom("<div class='Global_Images icon16x16 icon_attach_to_16' title='" + this._nlsResources.colNameAttachment + "' />"); 
            var colNameRecurring = domConstruct.toDom("<div class='Global_Images icon16x16 icon_recurring' title='" + this._nlsResources.colNameRecurring + "' />"); 
            var colNameStatus = domConstruct.toDom("<div class='Global_Images icon16x16 icon_unconfirmedActivity16x16' title='" + this._nlsResources.colNameUnConfirmStatus + "' />");
            var colNameType = this._nlsResources.colNameType || 'Activity Type';
            var colNameStartDate = this._nlsResources.colNameStartDate || 'Start Date';
            var colNameDuration = this._nlsResources.colNameDuration || 'Duration';
            var colNameContact = this._nlsResources.colNameContact || 'Name';
            var colNameAccount = this._nlsResources.colNameAccount || 'Account/Company';
            var colNameRegarding = this._nlsResources.colNameRegarding || 'Regarding';
            var colNamePriority = this._nlsResources.colNamePriority || 'Priority';
            var colNameUserId = this._nlsResources.colNameUserId || 'Leader';
            var colNameTypeName = this._nlsResources.colNameTypeName || 'Type';
            
            return [
                {
                    field: 'Status',
                    renderHeaderCell: function () { return colNameStatus; },
                    type: ActivityConfirmStatus,
                    width: 20,
                    className: 'cell-contents-icon'
                },
                {
                    field: 'Activity.Attachment',
                    renderHeaderCell: function () { return colNameAttachment; },
                    label: "Attachment",
                    type: ActivityAttachment,
                    width: 20,
                    className: 'cell-contents-icon'
                },
                {
                    field: 'Activity.Recurring',
                    renderHeaderCell: function () { return colNameRecurring; },
                    type: ActivityRecurring,
                    width: 20,
                    className: 'cell-contents-icon'
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
                    label: colNameContact,
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
                            if (fieldObject === null) {
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
                }
            ];
        },
        _getSummaryConfig: function () {
            var store = new sDataStore({
                id: this._listId,
                service: this._service,
                resourceKind: this._resourceKind,
                include: ['Activity', '$descriptors'],
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
            return {
                columns: structure,
                layout: 'layout',
                store: store,
                keyField: '$key',
                rowHeight: 170,
                rowsPerPage: 10,
                formatterScope: this._getFormatterScope()
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
        _getSummaryDetailRequestConfig: function () {
            var requestConfig = {
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
            return requestConfig;

        },
        _getFormatterScope: function () {
            var requestConfig = this._getSummaryListRequestConfig();
            var formatScope = new sDataSummaryFormatterScope({
                templateLocation: 'MainView/ActivityMgr/templates/UserActivityListSummary.html',
                resetDataManager: true,
                requestConfiguration: requestConfig

            });
            return formatScope;

        },

        _getToolBars: function () {
            var toolBars = {
                items: [
                // {
                //   custom:true,
                //   toolBarItem: new Sage.MainView.ActivityMgr.SnoozeButton()                  
                //},
                {
                custom: true,
                imageClass: 'icon_SnoozeAlarm_16x16',
                tooltip: this._nlsResources.SnoozeAlarm || 'Snooze Alarm',
                onClick: function () {
                    var snoozeOptions = new SnoozeOptions();
                    snoozeOptions.show();

                }
            },
                 {
                     custom: true,
                     imageClass: 'icon_DismissAlarm_16x16',
                     tooltip: this._nlsResources.DismissAlarm || 'Dismiss Alarm',
                     onClick: function () {
                         var activityService = Sage.Services.getService('ActivityService');
                         activityService.dismissAlarm();
                     }
                 }]
        };
        this.updateToolBar = true;
        return toolBars;
    },
    getTimelessProperty: function (propertyName) {
        return "Activity.Timeless";

    }

});

return alarmListPanelConfig;

});