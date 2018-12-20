/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/ReportMgr/ReportsListPanelConfig", [
    'Sage/MainView/_BaseListPanelConfig',
    'Sage/MainView/ReportMgr/ReportsSDataSummaryFormatterScope',
    'dojo/_base/declare',
    'dojo/i18n!./nls/ReportsListPanelConfig',
    'Sage/Data/SDataServiceRegistry',
    'Sage/UI/Controls/GridParts/Columns/DateTime',
    'dojo/_base/lang',
    'Sage/MainView/ReportMgr/ReportManagerFormatter',
    'dojo/i18n!./templates/nls/ReportsListSummary',
    'dojo/i18n!./templates/nls/ReportDetailSummary'
],
function (
    _BaseListPanelConfig,
    ReportsSDataSummaryFormatterScope,
    declare,
    nlsResources,
    sDataServiceRegistry,
    dateTimeColumn,
    dojoLang,
    reportManagerFormatter
) {
    var reportsListPanelConfig = declare('Sage.MainView.ReportMgr.ReportsListPanelConfig', [_BaseListPanelConfig], {
        keyField: "$key",
        _listId: 'Reports',
        _resourceKind: 'reports',
        _contextMenu: 'ReportManagerListContextMenu',
        _currentListContextSubMenu: 'ReportsListContextMenu',
        constructor: function () {
            dojoLang.mixin(this, nlsResources);
            this._service = sDataServiceRegistry.getSDataService('system');
            //Set up query parameters
            this._structure = this._getStructure();
            this._select = this._getSelect();
            this._where = this._getWhere();
            this._include = this._getInclude();
            this._store = this._getStore();
            this.sort = this._getSort();
            this._sort = this._getSort();
            this.list = this._getListConfig();
            this.detail = this._getDetailConfig();
            this.toolBar = this._getToolBars();
            this.list.selectionMode = 'single';
        },
        _getStructure: function () {
            return [
                { field: 'displayName', label: this.colNameReportName, width: '100px' },
                { field: 'mainTable', label: this.colNameTable, width: '50px', formatter: reportManagerFormatter.formatProperCase },
                { field: 'createUser', label: this.colNameCreateUser, width: '50px', formatter: reportManagerFormatter.formatGetUserById },
                { field: 'createDate', label: this.colNameCreateDate, width: '50px', type: dateTimeColumn },
                { field: 'modifyUser', label: this.colNameModifyUser, width: '50px', formatter: reportManagerFormatter.formatGetUserById },
                { field: 'modifyDate', label: this.colNameModifyDate, width: '50px', type: dateTimeColumn }
            ];
        },
        _getSelect: function () {
            return ['displayName', 'mainTable', 'createUser', 'createDate', 'modifyUser', 'modifyDate'];
        },
        _getWhere: function () {
            return "";
        },
        _getSort: function () {
            var sort = [{ attribute: 'displayName', descending: false }];
            return sort;
        },
        _getInclude: function () {
            var includes = [];
            return includes;
        },
        _getSummaryListRequestConfig: function () {
            var requestConfig = {
                resourceKind: this._resourceKind,
                serviceName: 'system',
                keyField: '$key',
                select: ['displayName', 'mainTable', 'createUser', 'createDate', 'modifyUser', 'modifyDate'],
                include: [],
                sort: this._getSort(),
                useBatchRequest: false
            };
            return requestConfig;
        },
        _getFormatterScope: function () {
            var requestConfig = this._getSummaryListRequestConfig();
            var formatScope = new ReportsSDataSummaryFormatterScope({
                templateLocation: 'MainView/ReportMgr/templates/ReportsListSummary.html',
                resetDataManager: true,
                requestConfiguration: requestConfig
            });
            return formatScope;
        },
        _getSummaryDetailRequestConfig: function () {
            var requestConfig = {
                resourceKind: this._resourceKind,
                serviceName: 'system',
                keyField: '$key',
                select: ['displayName', 'mainTable', 'createUser', 'createDate', 'modifyUser', 'modifyDate'],
                include: [],
                useBatchRequest: false
            };
            return requestConfig;
        },
        _getDetailConfig: function () {
            var formatScope = this._getFormatterScope();
            var requestConfig = this._getSummaryDetailRequestConfig();
            var detailConfig = {
                resourceKind: this._resourceKind,
                requestConfiguration: requestConfig,
                templateLocation: 'MainView/ReportMgr/templates/ReportDetailSummary.html'
            };
            return detailConfig;
        },
        _getSummaryConfig: function () {
            return false;
        },
        _getToolBars: function () {
            var toolBars = { items: [] };
            return toolBars;
        }
    });
    return reportsListPanelConfig;
});