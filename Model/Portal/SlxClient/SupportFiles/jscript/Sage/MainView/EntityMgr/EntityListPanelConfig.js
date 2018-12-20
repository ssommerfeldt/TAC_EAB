/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityListPanelConfig", [
    'Sage/MainView/_BaseListPanelConfig',
    'Sage/MainView/EntityMgr/EntitySDataSummaryFormatterScope',
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/i18n!./nls/EntityListPanelConfig',
    'dijit/registry',
    'Sage/Data/SDataServiceRegistry',
    'Sage/UI/Controls/GridParts/Columns/DateTime',
    'dojo/_base/lang',
     'Sage/Utility/Entity',
    'dojo/i18n!./templates/nls/EntityListSummary',
    'dojo/i18n!./templates/nls/EntityDetailSummary',
    'Sage/MainView/EntityMgr/EntityManagerFormatter',
    'Sage/Services/RoleSecurityService' // Not directly used, but needed to force existence before use
],
function (
    _BaseListPanelConfig,
	EntitySDataSummaryFormatterScope,
    declare,
    connect,
    nlsResources,
    registry,
    sDataServiceRegistry,
    dateTimeColumn,
    dojoLang,
    utilityEntity,
    EntityListSummary,
    EntityDetailSummary,
    EntityManagerFormatter
) {
    var entityListPanelConfig = declare('Sage.MainView.EntityMgr.EntityListPanelConfig', [_BaseListPanelConfig], {
        keyField: "$key",
        _listId: 'Entity', //groupId
        _resourceKind: 'entities',
        _contextMenu: 'EntityManagerListContextMenu',
        _currentListContextSubMenu: 'EntityListContextMenu',
        defaultSelectFirst: true,
        constructor: function () {
            dojoLang.mixin(this, nlsResources);

            this._service = '';
            var svc = Sage.Services.getService('RoleSecurityService');
            if (svc) {
                if (svc.hasAccess('Administration/EntityManager/Entities/View')) {
                    this._service = sDataServiceRegistry.getSDataService('metadata');
                }
                else {
                    return;
                }
            }
            //Set up query parameters
            this._structure = this._getStructure();
            this._select = this._getSelect();
            this._sort = this._getSort();
            this.sort = this._getSort();
            this._where = this._getWhere();
            this._include = this._getInclude();
            this.list = this._getListConfig();
            this.detail = this._getDetailConfig();
            this.toolBar = this._getToolBars();
            this.list.selectionMode = 'single';
        },
        _getStructure: function () {
            return [
                 {
                     field: '$descriptor',
                     label: this.colNameEntityDisplayName,
                     width: '100px'
                 },
                 {
                     field: 'name',
                     label: this.colNameEntityName,
                     type: utilityEntity.entityNameCell,
                     width: '100px'
                 },
                 {
                     field: 'tableName',
                     label: this.colNameEntityTableName,
                     width: '100px',
                     formatter: EntityManagerFormatter.formatProperCaseValue
                 },
                 {
                     field: '$updated',
                     label: this.colNameModifyDate,
                     width: '100px',
                     type: dateTimeColumn
                 },
                 {
                     field: 'properties',
                     label: this.colNamePropertyCount,
                     width: '50px',
                     formatter: EntityManagerFormatter.formatCountProps,
                     sortable: false
                 },
                 {
                     field: 'filters',
                     label: this.colNameFilterCount,
                     width: '50px',
                     formatter: EntityManagerFormatter.formatCountFilter,
                     sortable: false
                 },
                 {
                     field: 'filters',
                     label: this.colNameMetricCount,
                     width: '50px',
                     formatter: EntityManagerFormatter.formatCountMetric,
                     sortable: false
                 },
                 {
                     field: 'package.$key',
                     label: this.colNamePackage,
                     width: '100px'
                 }
            ];
        },
        _getSelect: function () {
            return ['$descriptor', 'name', 'tableName', 'properties', 'package', 'filters/filterType'];
        },
        _getWhere: function () {
            return "";
        },
        _getSort: function () {
            var sort = [{ attribute: '$descriptor', descending: false }];
            return sort;
        },
        _getInclude: function () {
            var includes = [];
            return includes;
        },
        _getSummaryListRequestConfig: function () {
            var requestConfig = {
                resourceKind: this._resourceKind,
                serviceName: 'metadata',
                keyField: '$key',
                include: [],
                sort: this._getSort(),
                useBatchRequest: false
            };
            return requestConfig;
        },
        _getFormatterScope: function () {
            var requestConfig = this._getSummaryListRequestConfig();
            var formatScope = new EntitySDataSummaryFormatterScope({
                templateLocation: 'MainView/EntityMgr/templates/EntityListSummary.html',
                resetDataManager: true,
                requestConfiguration: requestConfig
            });
            return formatScope;
        },
        _getSummaryDetailRequestConfig: function () {
            var requestConfig = {
                resourceKind: this._resourceKind,
                serviceName: 'metadata',
                keyField: '$key',
                select: ['$key', 'filterName', 'displayName', 'propertyName', 'filterType', 'analyticsAvailable', '$updated', 'details'],
                sort: [{ attribute: 'filterName', descending: true }],
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
                requestConfiguration: requestConfig
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
    return entityListPanelConfig;
});