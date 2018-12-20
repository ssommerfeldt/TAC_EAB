/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/JobMgr/ExecutionsListPanelConfig", [
    'Sage/MainView/JobMgr/BaseListPanelConfig',
    'Sage/MainView/JobMgr/SDataSummaryFormatterScope',
    'dojo/_base/declare',
    'dojo/i18n!./nls/ExecutionsListPanelConfig',
    'dojo/_base/lang',
    'Sage/Utility/Jobs',
    'dijit/ProgressBar',
    'dojo/i18n!./templates/nls/ExecutionsListSummary',
    'dojo/i18n!./templates/nls/ExecutionDetailSummary'
],
function (
    baseListPanelConfig,
    sDataSummaryFormatterScope,
    declare,
    nlsResources,
    dojoLang,
    jobUtility
) {
    var executionsListPanelConfig = declare('Sage.MainView.JobMgr.ExecutionsListPanelConfig', [baseListPanelConfig], {
        constructor: function () {
            dojoLang.mixin(this, nlsResources);
            this._listId = 'Executions';
            this._resourceKind = 'executions';
            this.entityName = 'Execution';
            this._contextMenu = 'JobManagerListContextMenu';
            this._currentListContextSubMenu = 'ExecutionsListContextMenu';

            //Set up query parameters
            this._structure = this._getStructure();
            this._select = this._getSelect();
            this._sort = this._getSort();
            this._where = this._getWhere();
            this._include = this._getInclude();
            this._store = this._getStore();
            this.list = this._getListConfig();
            this.detail = this._getDetailConfig();
            this.toolBar = this._getToolBars();
            this.keyField = '$key';
        },
        _getStructure: function () {
            var structure = [
                { field: 'job', label: this.colNameJobName, width: '75px', formatter: jobUtility.formatJobDescription },
                { field: 'user', label: this.colNameUser, width: '50px', formatter: jobUtility.formatUser },
                { field: 'phase', label: this.colNamePhase, width: '50px' },
                { field: 'phaseDetail', label: this.colNamePhaseDetail, width: '50px' },
                { field: 'progress', label: this.colNameProgress, width: '50px', renderCell: function (rowInfo, data, cellDom, queryOptions) {
                        cellDom.appendChild(jobUtility.formatProgress(data));
                    }
                },
                { field: 'elapsed', label: this.colNameElapsed, width: '50px', formatter: jobUtility.formatElapsedTime },
                { field: 'status', label: this.colNameStatus, width: '50px' },
                { field: 'result', label: this.colNameResult, width: '50px', formatter: jobUtility.formatJobResultGrid }
            ];
            return structure;
        },
        _getSelect: function () {
            var select = ['$key', 'job', 'trigger', 'user', 'phase', 'phaseDetail', 'progress', 'elapsed', 'status', 'result'];
            return select;
        },
        _getWhere: function () {
            return '';
        },
        _getSort: function () {
            var sort = [{ attribute: 'job' }];
            return sort;
        },
        _getInclude: function () {
            var includes = ['$descriptors'];
            return includes;
        },
        _getSummaryListRequestConfig: function () {
            var requestConfig = {
                resourceKind: this._resourceKind,
                serviceName: 'scheduling',
                keyField: '$key',
                select: this._getSelect(),
                include: this._getInclude(),
                useBatchRequest: false
            };
            return requestConfig;
        },
        _getFormatterScope: function () {
            var requestConfig = this._getSummaryListRequestConfig();
            var formatScope = new sDataSummaryFormatterScope({
                templateLocation: 'MainView/JobMgr/templates/ExecutionsListSummary.html',
                resetDataManager: true,
                requestConfiguration: requestConfig
            });
            return formatScope;
        },
        _getSummaryDetailRequestConfig: function () {
            var requestConfig = {
                resourceKind: this._resourceKind,
                serviceName: 'scheduling',
                keyField: '$key',
                select: ['$key', 'phase', 'phaseDetail', 'progress', 'elapsed', 'status', 'result'],
                include: ['$descriptors'],
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
                templateLocation: 'MainView/JobMgr/templates/ExecutionDetailSummary.html'
            };
            return detailConfig;
        },
        _getSummaryConfig: function () {
            return false;
        },
        _getToolBars: function () {
            var toolBars = { items: [] };
            return toolBars;
        },
        _getResult: function () {
            return this._nlsResources.loadingText;
        }
    });
    return executionsListPanelConfig;
});