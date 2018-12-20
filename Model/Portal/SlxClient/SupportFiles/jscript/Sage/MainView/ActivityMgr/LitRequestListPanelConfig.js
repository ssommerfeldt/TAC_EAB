/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/ActivityMgr/LitRequestListPanelConfig", [
    'Sage/MainView/ActivityMgr/BaseListPanelConfig',
    'Sage/Utility',
    'Sage/Utility/Activity',
    'Sage/UI/SummaryFormatterScope',
    'Sage/Data/BaseSDataStore',
    'Sage/UI/Controls/GridParts/Columns/DateTime',
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/string',
    'dojo/i18n!./nls/LitRequestListPanelConfig',
    'dojo/i18n!./templates/nls/LitRequestSummary',          // Bare import for template NLS dependency.
],
function (
    baseListPanelConfig,
    sageUtility,
    UtilityActivity,
    summaryFormatterScope,
    baseSDataStore,
    columnsDateTime,
    declare,
    connect,
    string,
    nlsResources
) {
    var litRequestListPanelConfig = declare('Sage.MainView.ActivityMgr.LitRequestListPanelConfig', [baseListPanelConfig], {
        constructor: function() {
            this._nlsResources = nlsResources;
            this._listId = 'literature';
            this._resourceKind = 'litRequests';
            this.entityName = 'LitRequest';
            this._contextMenu = 'LitRequestListContextMenu';
            this._securedAction = 'Activities\View\LitratureRequests';
            this._structure = this._getStructure();
            this._select = this._getSelect();
            this._sort = this._getSort();
            this._where = this._getWhere();
            this._store = this._getStore();
            this.list = this._getListConfig();
            this.summary = this._getSummaryConfig();
            this.toolBar = this._getToolBars();
            connect.subscribe('/entity/litRequest/change', this._onListRefresh);
        },
        _onListRefresh: function(event) {
            var activityService = Sage.Services.getService('ActivityService');
            activityService.refreshList('literature');
        },
        _getSelect: function() {
            return [
                '$key',
                'ContactName',
                'Contact/$key',
                'Description',
                'FillDate',
                'FillStatus',
                'Options',
                'Priority',
                'RequestDate',
                'SendDate',
                'SendVia',
                'TotalCost',
                'FillUser/UserInfo/UserName',
                'RequestUser/UserInfo/UserName',
                'Contact/AccountName',
                'Contact/Address/PostalCode',
                'Contact/Account/AccountId',
                'ReqestUser/$key'
            ];
        },
        _getSort: function() {
            return [{ attribute: 'RequestDate', descending: true }];
        },
        _getWhere: function() {
            var completeStatus = this._nlsResources.litFillStatusComplete || 'Completed';
            return (this._currentUserId) ? string.substitute('(RequestUser.Id eq "${0}") and (FillStatus ne "${1}"  or FillStatus eq null )', [this._currentUserId, completeStatus]) : '';
        },
        _getStructure: function() {
            var colNameView = this._nlsResources.colNameView || 'View';
            var colNameContact = this._nlsResources.colNameContact || 'Contact';
            var colNameDescription = this._nlsResources.colNameDescription || 'Description';
            var colNameFillStatus = this._nlsResources.colNameFillStatus || 'Status';
            var colNamePriority = this._nlsResources.colNamePriority || 'Priority';
            var colNameReqestDate = this._nlsResources.colNameReqestDate || 'Request Date';
            var colNameSendDate = this._nlsResources.colNameSendDate || 'Send Date';
            var colNameSendVia = this._nlsResources.colNameSendVia || 'Send Via';
            var colNameTotalCost = this._nlsResources.colNameTotalCost || 'Total Cost';
            var colNameRequestUser = this._nlsResources.colNameReqestUser || 'Request User';
            var colNameAccount = this._nlsResources.colNameAccount || 'Account';
            var colNamePostalCode = this._nlsResources.colNamePostalCode || 'Postal Code';

            declare("Sage.MainView.ActivityMgr.LitRequestListPanelConfig.LitViewCell", null, {
                format: function(inRowIndex, inItem) {
                    var key = sageUtility.getValue(inItem, "$key");
                    return '<a href="LitRequest.aspx?entityid=' + key + '&modeid=Detail" >' + colNameView + '</a>';
                }
            });

            declare("Sage.MainView.ActivityMgr.LitRequestListPanelConfig.LitContactCell", null, {
                format: function(inRowIndex, inItem) {
                    var contactId = Sage.Utility.getValue(inItem, 'Contact.$key');
                    var contactName = Sage.Utility.getValue(inItem, 'ContactName');
                    return '<a href="Contact.aspx?entityid=' + contactId + '&modeid=Detail" >' + contactName + '</a>';
                }
            });

            declare("Sage.MainView.ActivityMgr.LitRequestListPanelConfig.LitAccountCell", null, {
                format: function(inRowIndex, inItem) {
                    var accountId = Sage.Utility.getValue(inItem, 'Contact.Account.$key');
                    var accountName = Sage.Utility.getValue(inItem, 'Contact.AccountName');
                    return '<a href="Account.aspx?entityid=' + accountId + '&modeid=Detail" >' + accountName + '</a>';
                }
            });
            return [
                {
                    field: '$key',
                    label: '',
                    type: Sage.MainView.ActivityMgr.LitRequestListPanelConfig.LitViewCell,
                    width: 60
                },
                {
                    field: 'RequestDate',
                    label: colNameReqestDate,
                    type: columnsDateTime,
                    dateOnly: true,
                    width: 90
                },
                {
                    field: 'Priority',
                    label: colNamePriority,
                    width: 60
                },
                {
                    field: 'Description',
                    label: colNameDescription,
                    width: 200
                },
                {
                    field: 'ContactName',
                    label: colNameContact,
                    type: Sage.MainView.ActivityMgr.LitRequestListPanelConfig.LitContactCell,
                    width: 200
                },
                {
                    field: 'Contact.AccountName',
                    label: colNameAccount,
                    type: Sage.MainView.ActivityMgr.LitRequestListPanelConfig.LitAccountCell,
                    width: 200
                },
                {
                    field: 'SendDate',
                    label: colNameSendDate,
                    type: columnsDateTime,
                    dateOnly: true,
                    width: 90
                },
                {
                    field: 'SendVia',
                    label: colNameSendVia,
                    width: 60
                },
                {
                    field: 'TotalCost',
                    label: colNameTotalCost,
                    width: 60
                },
                {
                    field: 'FillStatus',
                    label: colNameFillStatus,
                    width: 60
                },
                {
                    field: 'RequestUser.UserInfo.UserName',
                    label: colNameRequestUser,
                    width: 90
                },
                {
                    field: 'Contact.Address.PostalCode',
                    label: colNamePostalCode,
                    width: 60
                }
            ];
        },
        _getDetailConfig: function() {
            return {
                resourceKind: this._resourceKind,
                requestConfiguration: {
                    mashupName: 'ActivityManager',
                    queryName: 'LitRequestSummary_query'
                },
                templateLocation: 'MainView/ActivityMgr/templates/LitRequestSummary.html',
                postProcessCallBack: false
            };
        },
        _getFormatterScope: function() {
            return new summaryFormatterScope({
                requestConfiguration: {
                    mashupName: 'ActivityManager',
                    queryName: 'LitRequestSummary_query'
                },
                templateLocation: 'MainView/ActivityMgr/templates/LitRequestSummary.html'
            });
        },
        _getToolBars: function() {
            return { items: [] };
        }
    });
    return litRequestListPanelConfig;
});