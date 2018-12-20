/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, sessionStorage */
define("Sage/MainView/GroupMgr/GroupsListPanelConfig", [
        'Sage/MainView/_BaseListPanelConfig',
        'Sage/MainView/GroupMgr/GroupsSDataSummaryFormatterScope',
        'dojo/_base/declare',
        'dojo/i18n!./nls/GroupsListPanelConfig',
        'Sage/Data/SDataServiceRegistry',
        'Sage/UI/Controls/GridParts/Columns/Boolean',
        'Sage/UI/Controls/GridParts/Columns/DateTime',
        'Sage/UI/Controls/GridParts/Columns/Numeric',
        'Sage/UI/Controls/GridParts/Columns/SlxUser',
        'dojo/_base/lang',
        'dijit/registry',
        'Sage/MainView/GroupMgr/GroupManagerActions',
        'Sage/MainView/GroupMgr/GroupManagerFormatter',
        'Sage/Utility/_LocalStorageMixin',
        'dojo/i18n!./templates/nls/GroupsListSummary',
        'dojo/i18n!./templates/nls/GroupDetailSummary'
],
    function (
        _BaseListPanelConfig,
        GroupsSDataSummaryFormatterScope,
        declare,
        nlsResources,
        SDataServiceRegistry,
        booleanColumn,
        dateTimeColumn,
        numericColumn,
        slxUserColumn,
        dojoLang,
        registry,
        GroupManagerActions,
        GroupManagerFormatter
    ) {
        var GroupsListPanelConfig = declare('Sage.MainView.GroupMgr.GroupsListPanelConfig', [_BaseListPanelConfig], {
            keyField: "$key",
            _listId: 'all_groups',
            _resourceKind: 'groups',
            _contextMenu: 'GroupManagerListContextMenu',
            _currentListContextSubMenu: 'GroupsListContextMenu',
            defaultSelectFirst: true,
            constructor: function () {
                this.inherited(arguments);
                dojoLang.mixin(this, nlsResources);
                this.detailStateKey = 'GroupMgrShowDetail';
                this._service = SDataServiceRegistry.getSDataService('system');
                this._structure = this._getStructure();
                this._select = this._getSelect();
                this._where = this._getWhere();
                this._sort = this._getSort();
                this.sort = this._getSort();
                this._include = this._getInclude();
                this._store = this._getStore();
                this.list = this._getListConfig();
                this.detail = this._getDetailConfig();
                this.toolBar = this._getToolBars();
                this.list.selectionMode = 'multiple';

                GroupManagerActions.initShowHideDetail(this);
            },
            _getShowDetail: function () {
                if (this.detailStateKey) {
                    var value = sessionStorage.getItem(this.detailStateKey);
                    if (value === null) {
                        return 'true';
                    }
                    return value;
                }
                return 'true';
            },
            _getStructure: function () {
                return [
                    { field: 'family', label: nlsResources.Family, width: '50px', formatter: GroupManagerFormatter.formatProperCase },
                    { field: 'name', label: nlsResources.Name, width: '90px' },
                    { field: 'displayName', label: nlsResources.DisplayName, width: '90px' },
                    { field: 'isAdHoc', label: nlsResources.AdHoc, width: '30px', type: booleanColumn },
                    { field: 'createDate', label: nlsResources.CreateDate, width: '70px', type: dateTimeColumn },
                    { field: 'modifyDate', label: nlsResources.ModifyDate, width: '70px', type: dateTimeColumn },
                    { field: 'releasedDate', label: nlsResources.SharedDate, width: '70px', type: dateTimeColumn },
                    { field: 'userId', label: nlsResources.Owner, width: '50px', formatter: GroupManagerFormatter.formatOwnerName },
                    { field: 'groupAuthor', label: nlsResources.Author, width: '50px' },
                    { field: 'company', label: nlsResources.Company, width: '50px' },
                    { field: 'companyVersion', label: nlsResources.Version, width: '50px', type: numericColumn },
                    { field: 'isDeveloperVersion', label: nlsResources.Dev, width: '30px', type: booleanColumn },
                    { field: 'released', label: nlsResources.Rel, width: '30px', type: booleanColumn },
                    { field: 'isUserDefault', label: nlsResources.UserDefault, width: '50px', type: booleanColumn,sortable: false }
                ];
            },
            _getSelect: function () {
                return ['isDeveloperVersion', 'released', 'family', 'name', 'displayName', 'createDate', 'modifyDate', 'releasedDate', 'groupAuthor', 'company', 'companyVersion', 'userId', 'maintable', 'dataCode', 'isAdHoc', 'basedOn', 'entityName', 'isUserDefault'];
            },
            _getWhere: function () {
                return '';
            },
            _getSort: function () {
                var sort = [{ attribute: 'isDeveloperVersion', descending: true }, { attribute: 'family', descending: false }, { attribute: 'displayName', descending: false }, { attribute: 'name', descending: false }];
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
                    select: ['legacyType', 'displayName', 'mainTable', 'createUser', 'createDate', 'modifyUser', 'modifyDate', 'releasedDate', 'name', 'isUserDefault'],
                    include: [],
                    sort: this._getSort(),
                    useBatchRequest: false
                };
                return requestConfig;
            },
            _getFormatterScope: function () {
                var requestConfig = this._getSummaryListRequestConfig();
                var formatScope = new GroupsSDataSummaryFormatterScope({
                    templateLocation: 'MainView/GroupMgr/templates/GroupsListSummary.html',
                    resetDataManager: true,
                    requestConfiguration: requestConfig,
                    serviceName: 'system'
                });
                return formatScope;
            },
            _getSummaryDetailRequestConfig: function () {
                var requestConfig = {
                    resourceKind: this._resourceKind,
                    serviceName: 'system',
                    keyField: '$key',
                    select: ['isDeveloperVersion', 'released', 'family', 'displayName', 'createDate', 'createUser', 'modifyDate', 'modifyUser', 'releasedDate', 'groupAuthor',
                        'company', 'companyVersion', 'userId', 'legacyType', 'mainTable', 'dataCode', 'keyField', 'entityName', 'isHidden', 'isAdHoc', 'description', 'installationDate',
                        'isUserDefault'],
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
                    templateLocation: 'MainView/GroupMgr/templates/GroupDetailSummary.html',
                    serviceName: 'system'
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
        return GroupsListPanelConfig;
    });