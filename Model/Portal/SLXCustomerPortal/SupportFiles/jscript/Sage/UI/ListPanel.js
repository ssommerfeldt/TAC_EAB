/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, sessionStorage */
define("Sage/UI/ListPanel", [
       'dojo/aspect',
       "dojo/i18n",
       'dojo/dom-class',
       'dijit/layout/BorderContainer',
       'dijit/layout/StackContainer',
       'dijit/layout/ContentPane',
       'dijit/Toolbar',
       'dijit/ToolbarSeparator',
       'Sage/_Templated',
       'Sage/UI/Filters/FilterManager',
       'Sage/UI/ToolBarLabel',
       'dijit/Menu',
       'Sage/Utility',
       'dojox/storage/LocalStorageProvider',
       'Sage/UI/_DetailPane',
       'dijit/_Widget',
       'dojo/_base/array',
       'dojo/_base/lang',
       'dojo/_base/declare',
       'dojo/i18n!./nls/ListPanel',
       'dojo/_base/sniff',
       'dojo/dom-geometry',
       'dijit/registry',
       'dojo/_base/connect',
       'dojo/ready',
       'dojo/dom-construct',
       'Sage/UI/Controls/Grid',
       'dojo/query'
],
function (aspect,
         i18n,
         domClass,
         borderContainer,
         stackContainer,
         contentPane,
         toolbar,
         toolbarSeperator,
         _Templated,
         FilterManager,
         toolbarLabel,
         dijitMenu,
         util,
         LocalStorageProvider,
         _DetailPane,
         _Widget,
         array,
         lang,
         declare,
         nlsListPanel,
         has,
         domGeo,
         registry,
         connect,
         ready,
         domConstruct,
        Grid,
        query
        ) {

    var listPanel = declare('Sage.UI.ListPanel', [borderContainer, _Widget, _Templated], {
        widgetsInTemplate: true,
        contentTemplate: new Simplate([
            '{%! $.menuTemplate %}',
            '{%! $.listTemplate %}',
            '{%! $.detailTemplate %}'
        ]),
        listTemplate: new Simplate([
            '<div data-dojo-type="dijit.layout.StackContainer" region="center" splitter="true" data-dojo-attach-point="_gridContainer">',
                '<div data-dojo-type="dijit.layout.ContentPane" data-dojo-attach-point="_noConfigurationPane"></div>',
                '<div id="listGridPane" data-dojo-type="dijit.layout.ContentPane" data-dojo-attach-point="_listGridPane">',
                '<div dojoattachpoint="_listGrid_Grid" class="HundredPercentHeight"></div>',
                '<div data-dojo-type="dijit.Menu" id="_listContextmenu" dojotAttachPoint="_listContextmenu" style="display:none" ></div>',
                '</div>',
                '<div id="summaryGridPane" data-dojo-type="dijit.layout.ContentPane" data-dojo-attach-point="_summaryGridPane">',
                '<div dojoattachpoint="_summaryGrid_Grid" class="HundredPercentHeight"~></div>',
                '</div>',
            '</div>'
        ]),
        menuTemplate: new Simplate([
            '<div data-dojo-type="dijit.Toolbar" region="top" splitter="false" id="{%= $.id %}_toolbar" style="{%= $.toolbarStyle %}" data-dojo-attach-point="_tbar" class="list-panel-tbar right-tools">',
                '<div data-dojo-type="Sage.UI.ToolBarLabel" label="" data-dojo-attach-point="_tbarLabel" class="list-panel-left-tools"></div>',
                '<div data-dojo-type="Sage.UI.ToolBarLabel" label="" data-dojo-attach-point="_tbarOverflowLabel" class="list-panel-left-tools" style="display:none;"></div>',
                '<div data-dojo-type="Sage.UI.ToolBarLabel" label="{%= $.unsavedDataText %}" data-dojo-attach-point="_unsavedDataLabel" class="display-none"></div>',
                '<div data-dojo-type="Sage.UI.ToolBarLabel" label="" data-dojo-attach-point="_filterSummary" class="filter-summary-view"></div>',
                '<div data-dojo-type="dijit.form.Button" showLabel="true" id="{%= $.id %}_detailBtn" data-dojo-attach-point="_detailButton" dojoAttachEvent="onClick:toggleDetail" class="list-panel-tool-detail">{%= $.detailText %}</div>',
                '<span data-dojo-type="dijit.ToolbarSeparator" data-dojo-attach-point="_buttonSection" class="list-panel-tool-section"></span>',
                '<div data-dojo-type="dijit.form.Button" showLabel="true" id="{%= $.id %}_listBtn" data-dojo-attach-point="_listButton" dojoAttachEvent="onClick:showList" class="list-panel-tool-list">{%= $.listText %}</div>',
                '<div data-dojo-type="dijit.form.Button" showLabel="true" id="{%= $.id %}_summaryBtn" data-dojo-attach-point="_summaryButton" dojoAttachEvent="onClick:showSummary" class="list-panel-tool-summary">{%= $.summaryText %}</div>',
                '<div data-dojo-type="Sage.UI.ImageButton" iconClass="Global_Images icon16x16 icon_refresh"  tooltip="{%: $.refreshText %}" id="refreshBtn" data-dojo-attach-point="_refreshButton" dojoAttachEvent="onClick:refreshView" class="list-panel-tool-help"></div>',
                '<div data-dojo-type="Sage.UI.ImageButton" iconClass="Global_Images icon16x16 icon_Help_16x16" tooltip="{%: $.helpText %}" id="helpBtn" data-dojo-attach-point="_helpButton" dojoAttachEvent="onClick:showHelp" class="list-panel-tool-help"></div>',
            '</div>'
        ]),
        detailTemplate: new Simplate([
            '<div data-dojo-type="{%= $.detailType %}" region="{%= $.detailRegion %}" splitter="true" style="{%= $.detailStyle %}" data-dojo-attach-point="_detailPane">',
            '</div>'
        ]),
        _filterGroup: null,
        _filterSubscriptions: null,
        _filterManager: null,
        _toolbarApplied: false,
        _configurationProvider: null,
        _configurationConnects: null,
        _contextConnects: null,
        _dataChangeWatchers: [],
        _gridContainer: null,
        _noConfigurationPane: null,
        _listGrid: null,
        _indirectSelection: '',
        _summaryGrid: null,
        _detailPane: null,
        _tbar: null,
        _tbarCustom: false,
        _tbarLabel: null,
        _buttonSection: null,
        _detailButton: null,
        _listButton: null,
        _summaryButton: null,
        _helpButton: null,
        _filterSummary: null,
        _unsavedDataLabel: null,
        _forcedFilterPublish: false,
        _selectionInfoObject: null,
        _contextMenu: null,
        _listMode: 'list',
        helpTopicName: 'listview',
        gutters: false,
        toolbarStyle: '',
        // todo: might have to fix this issue: http://bugs.dojotoolkit.org/ticket/10930 if we support editing
        initialGrid: 'list',
        filterGroup: 'default',
        detailVisible: false,
        detailOnSummary: false,
        detailRegion: 'bottom',
        detailStyle: 'height: 256px;',
        detailType: 'dijit.layout.ContentPane',
        autoConfigure: true,
        hasCheckBox: false,

        FILTER_UPDATE_DELAY: 0,
        STORE_KEY_SORT_INFO: '_GRID_SORT_PROPS_',
        STORE_KEY_STORE_QUERY: '_STORE_QUERY_',
        STORE_KEY_VIEWSTATE: 'LISTPANEL_VIEWSTATE', // Key for view state - did we leave off in list or summary view?
        RECORD_WARNING_SIZE: 30000,

        constructor: function () {
            this.inherited(arguments);
        },
        postMixInProperties: function () {
            this.inherited(arguments);
            lang.mixin(this, nlsListPanel);
        },
        postCreate: function () {
            this.inherited(arguments);
            if (this._listGrid) {
                this._listGrid.setSelectionMode('extended');
            }


            this._gridContainer.selectChild(this._noConfigurationPane);

            if (this._detailPane.isInstanceOf(_DetailPane)) {
                this._detailPane.set('owner', this);
            }

            this._setDetailPaneVisibility(false, false);
            if (this._tbarOverflowLabel) {
                this._tbarOverflowLabel.set('label', nlsListPanel.overflowText);
            }

            this._updateToolbarItemVisibility();
            this._getGroupListUserOptions();

            if (this.autoConfigure) {
                this.requestConfiguration();
            }
        },
        startup: function () {
            this.inherited(arguments);
        },
        uninitialize: function () {
            this.inherited(arguments);

            if (this._filterManager) {
                this._filterManager.destroy();
            }

            if (this._configurationProvider) {
                this._configurationProvider.destroy();
            }
        },
        getAppliedFilterCount: function () {
            return this._filterManager && this._filterManager.getAppliedFilterCount();
        },
        _getGroupListUserOptions: function () {
            var service = Sage.Services.getService('UserOptions');
            if (service && service.get) {
                service.get('GroupCheckboxEnabled', 'GroupGridView', lang.hitch(this, function (data) {
                    var groupCheckboxEnabled = data && data.value;
                    if (groupCheckboxEnabled === 'True' || groupCheckboxEnabled === 'T') {
                        this._indirectSelection = true;
                    }
                    else {
                        this._indirectSelection = false;
                    }
                }), null, this, false);
            }
        },
        _getSortingInfo: function () {
            var key = this._getGridSortKey(),
            sortProps = this._getFromLocalStorage(key), // this can be NULL
            tempdsc = false,
            config = this._configuration;
            if (sortProps) {
                if (sortProps.descending === true) {
                    tempdsc = true;
                }
            } else { // ListPanelConfig files have their args contained in _configuration, so check if there is a sort rule here.
                if (config && config._sort && config._sort.length && config._sort.length > 0) {
                    sortProps = config._sort[0];
                    if (sortProps.descending === true) {
                        tempdsc = true;
                    }
                }
            }
            if (sortProps) {
                sortProps.descending = tempdsc;
            }
            return sortProps;
        },
        _getSortInfo: function () {
            var key = this._getGridSortKey(),
            sortProps = this._getFromLocalStorage(key), // this can be NULL
        tempdsc = false,
        config = this._configuration;
            if (sortProps) {
                if (sortProps.descending === true) {
                    tempdsc = true;
                }
            } else { // ListPanelConfig files have their args contained in _configuration, so check if there is a sort rule here.
                if (config && config._sort && config._sort.length && config._sort.length > 0) {
                    sortProps = config._sort[0];
                    if (sortProps.descending === true) {
                        tempdsc = true;
                    }
                }
            }
            if (sortProps) {
                this._selectionInfoObject.sortDirection = (tempdsc) ? "descending" : "ascending";
                this._selectionInfoObject.sortField = sortProps.attribute;
                sortProps.descending = tempdsc;
            }
            return sortProps;
        },
        _setSortInfo: function () {
            var config = this._configuration,
    sortProps = this._getSortInfo();
            if (this._listGrid._grid.store) {
                if (sortProps) {
                    this._listGrid.setSort(sortProps.attribute, sortProps.descending);
                }
            }
        },
        _queryStore: function (query, options) {
            var config = this._configuration,
                        sortProps = this._getSortInfo();
            if (sortProps) {
                if (!lang.isArray(sortProps)) {
                    sortProps = [sortProps];
                }
                options.sort = sortProps;
            }
            this._listGrid.setStore(config.list.store, query, options);
        },

        _CheckForCustomReferenceInSort: function (sort) {
            var columnsArry = this._listGrid.columns, retField = false;
            for (var i = 0; i < columnsArry.length; i++) {
                var customSort = typeof (columnsArry[i].customSort);
                switch (customSort) {
                    case "object":
                        var cSort = null;
                        if (dojo.isArray(columnsArry[i].customSort)) {
                            cSort = columnsArry[i].customSort[0];
                        } else {
                            cSort = columnsArry[i].customSort;
                        }
                        retField = (cSort.attribute && sort === cSort.attribute);

                        break;
                    case "string":
                        retField = (sort === columnsArry[i].customSort);
                        break;
                }
                if (retField) {
                    return columnsArry[i].field;
                }
            }
            return sort;
        },
        _setSummarySortInfo: function (store) {
            var key = this._getGridSortKey(),
                sortProps = this._getFromLocalStorage(key);
            if (sortProps) {
                store.sort = [sortProps];
            }
        },

        // TODO: Update. Method should modify structure with stored widths if they exist.
        _setColumnSizes: function (structure) {

        },
        _updateStructureFromLocalStore: function () {
        },
        _isFieldHidden: function (field) {
        },
        _updateColumnVisibility: function () {

        },
        _handleConfigurationChange: function () {
            this.clearSelection();
            if (this._detailPane) {
                this._detailPane.clear();
            }
            this.requestConfiguration();
        },
        _setConfigurationProviderAttr: function (value) {

            if (this._configurationConnects) {
                array.forEach(this._configurationConnects, function (connection) {
                    this.disconnect(connection);
                }, this);
            }

            if (this._configurationProvider && this._configurationProvider !== value) {
                this._configurationProvider.destroy();
            }

            this._configurationProvider = value;
            this._configurationConnects = [];

            if (this._configurationProvider) {
                this._configurationConnects.push(this.connect(this._configurationProvider, 'onConfigurationChange', this._handleConfigurationChange));

                this._configurationProvider.set('owner', this);

                // only request configuration here if the widget has been fully created, otherwise
                // it will be handled by postCreate.
                if (this._created) {
                    if (this.autoConfigure) {
                        this.requestConfiguration();
                    }
                }
            }
        },
        _getConfigurationProviderAttr: function () {
            return this._configurationProvider;
        },
        _setFilterGroupAttr: function (value) {
            if (this._filterSubscriptions) {
                array.forEach(this._filterSubscriptions, function (subscription) {
                    this.unsubscribe(subscription);
                }, this);
            }

            this._filterGroup = value;
            this.set('filterManager', new FilterManager({
                filterGroup: this._filterGroup
            }));
            this._filterSubscriptions = [];
            this._filterSubscriptions.push(this.subscribe(dojo.string.substitute("/ui/filters/${0}/change", [this._filterGroup]), this._onFilterChange));

            // Delay for at least 1 second without input (matches checkbox filter)
            var lazyRefresh = util.debounce(lang.hitch(this, this._onFilterRefresh), this.FILTER_UPDATE_DELAY);
            this._filterSubscriptions.push(this.subscribe(dojo.string.substitute("/ui/filters/${0}/refresh", [this._filterGroup]), this._onFilterRefresh));
            this._ensureApplyFilterWasPublished();
        },
        getTotalSelectionCount: function () {
            return this._selectionInfoObject.selectionCount;
        },
        _ensureApplyFilterWasPublished: function (direct) {
            // Hack: If we missed the filters/apply event, we will force the group context service to fire it.
            if (this._forcedFilterPublish) {
                return;
            }
            var service, context;
            service = Sage.Services.getService('ClientGroupContext');
            context = service && service.getContext();
            if (context && context.AppliedFilterInfo) {
                service.publishFiltersApplied(context.AppliedFilterInfo);
            }
            if (this._filterManager && direct && service.applyFilters) {
                service.applyFilters(this._filterManager);
            }
            this._forcedFilterPublish = true;
        },
        _getFilterGroupAttr: function () {
            return this._filterGroup;
        },
        _setFilterManagerAttr: function (value) {
            if (this._filterManager && this._filterManager !== value) {
                this._filterManager.destroy();
            }

            this._filterManager = value;

            if (this._filterManager) {
                this._filterManager.set('owner', this);
            }
        },
        _getFilterManagerAttr: function () {
            return this._filterManager;
        },
        _onFilterChange: function () {
        },
        _onFilterRefresh: function (applied, definitionSet, manager) {
            // todo: add support for summary view
            // todo: turn this off when no filters are applied
            console.log("LISTPANEL: filters refreshed");
            this.clearSelection();
            if (this._detailPane) {
                this._detailPane.clear();
            }
            var query = manager.createQuery(),
                key = this._getStoreQueryKey();

            if (this._listMode === 'summary' && this._hasConfigurationForSummary()) {
                this._summaryGrid.queryOptions = this._summaryGrid.queryOptions || {};
                this._summaryGrid.setFilter(query);
            } else {

                this._listGrid.queryOptions = this._listGrid.queryOptions || {};
                this._listGrid.queryOptions.httpMethodOverride = !!query;
                this._listGrid.setFilter(query);
            }
            this._saveToLocalStorage(key, { store: this._dojoxStore, query: query });
        },
        _setConfigurationAttr: function (configuration) {
            this._applyConfiguration(configuration);
        },
        _getListAttr: function () {
            return this._listGrid;
        },
        _getSummaryAttr: function () {
            return this._summaryGrid;
        },
        _getDetailAttr: function () {
            return this._detailPane;
        },
        _applyConfigurationFailed: function (configuration) {
            // TODO: Maybe we should publish the configuration failed?
            // Group tabs depend on this firing so they can load.
            dojo.publish('/listView/applyConfiguration', this);
        },
        _applyConfiguration: function (configuration) {
            this._forcedFilterPublish = false;
            dojo.publish('/listView/applyConfiguration', this);

            var key = this._getViewStateKey(),
                state = this._getFromLocalStorage(key, this._getViewNS());

            if (state) {
                this.initialGrid = state;
            }

            this._configuration = configuration;
            this._gridContainer.selectChild(this._noConfigurationPane);

            if (!this._listGrid) {
                this._listGrid = new Grid({
                    // Grid features
                    columnHiding: true,
                    columnResizing: true,
                    columnReordering: true,
                    rowSelection: true,
                    indirectSelection: this._indirectSelection,
                    keyboardNavigation: true,

                    // Grid behavior properties 
                    id: "listGrid",
                    minRowsPerPage: 100,
                    farOffRemoval: 1000,
                    queryRowsOverlap: 0,
                    forceAutoId: true,
                    placeHolder: this._listGrid_Grid,
                    pagingMethod: "throttleDelayed",
                    queryOptions: this._configuration.list.queryOptions,
                    sort: this._configuration.list.sort,

                    // Event handlers
                    onContextActivate: lang.hitch(this._configurationProvider, this._configuration.list.onSelectedRegionContextMenu),
                    onRowDblClick: lang.hitch(this, this._onRowDblClick),
                    onSelection: lang.hitch(this, this._addToSelectionInfo),
                    onDeselection: lang.hitch(this, this._removeFromSelectionInfo),
                    onGridSort: lang.hitch(this, this._onSort),
                    onColumnResize: lang.hitch(this, this._onColumnResize),
                    onLoadComplete: lang.hitch(this, this._onGridLoadComplete)
                });
            }

            if (!this._summaryGrid) {
                this._summaryGrid = new Grid({
                    // Grid features
                    columnHiding: false,
                    columnResizing: false,
                    columnReordering: false,
                    rowSelection: true,
                    indirectSelection: false,
                    keyboardNavigation: false,

                    // Grid behavior properties 
                    id: "summaryGrid",
                    minRowsPerPage: 50,
                    queryRowsOverlap: 1,
                    placeHolder: this._summaryGrid_Grid,
                    pagingMethod: "throttleDelayed",

                    // Event handlers
                    onRowDblClick: lang.hitch(this, this._onRowDblClick),
                    onSelection: lang.hitch(this, this._addToSelectionInfo),
                    onDeselection: lang.hitch(this, this._removeFromSelectionInfo),
                    onGridSort: lang.hitch(this, this._onSort),
                    onColumnResize: lang.hitch(this, this._onColumnResize),
                    onLoadComplete: lang.hitch(this, this._onGridLoadComplete)
                });
            }

            if (!this.selectionInfoObject) {
                this._selectionInfoObject = {
                    hasCompositeKey: false,
                    key: "list",
                    keyField: "", // pull from layout.
                    mode: "selection", // set to "selection'?
                    ranges: [], // old EXT backwards compatibility? do we need this?
                    recordCount: 0, // total records for group set.
                    selectedIds: [],
                    selectionCount: 0, // total selected records
                    selections: [],
                    sortDirection: "",
                    sortField: ""
                };
            }
            if (this.initialGrid === 'list' && this._hasConfigurationForList()) {
                this.showList();
            }

            if (this._hasConfigurationForSummary()) {
                this._configuration.summary.active = false;
            }

            if (this.initialGrid === 'summary' && this._hasConfigurationForSummary()) {
                if (this._gridContainer.selectedChildWidget === this._noConfigurationPane) {
                    this.showSummary();
                }
            }

            this._applyToolBar();

            if (this._configuration && this._configuration.list && this._configuration.list.selectionMode && this._configuration.list.selectionMode === 'single') {
                this._listGrid.setSelectionMode("single");
            } else if (this._configuration && this._configuration.list && this._configuration.list.selectionMode && this._configuration.list.selectionMode === 'none') {
                this._listGrid.setSelectionMode("none");
            } else {
                this._listGrid.setSelectionMode("extended");
            }
            var cMenuItems = this._configuration.list.selectedRegionContextMenuItems || [];

            this._contextMenu = new dijitMenu({
                targetNodeIds: [this._listGrid.domNode]
            });
            for (var i = 0; i < cMenuItems.length; i++) {
                this._contextMenu.addChild(cMenuItems[i]);
            }
            var groupContextSvc = Sage.Services.getService('ClientGroupContext');
            this._selectionInfoObject.keyField = (groupContextSvc) ? groupContextSvc.getContext().CurrentTableKeyField || '' : '';
            if (this._configuration.hasCompositeKey) {
                this._selectionInfoObject.hasCompositeKey = this._configuration.hasCompositeKey;
            }
            else {
                this._selectionInfoObject.hasCompositeKey = false;
            }

        },
        _applyToolBar: function () {
            var toolBarItems, i, items;

            if (this._tbarCustom) {
                toolBarItems = this._tbar.getChildren();
                for (i = 0; i < toolBarItems.length; i++) {
                    if (toolBarItems[i].custom) {
                        this._tbar.removeChild(toolBarItems[i]);
                    }
                }

                this._tbarCustom = false;
            }

            if (this._toolbarApplied && !this._configuration.updateToolBar) {
                return;
            }

            if (this._configuration && this._configuration.toolBar) {
                items = this._configuration.toolBar.items || [];
                if (items.length > 0) {
                    this._tbarCustom = true;
                }

                for (i = 0; i < items.length; i++) {
                    if (items[i].icon || items[i].imageClass) {
                        this._tbar.addChild(new Sage.UI.ImageButton(items[i]), i);
                    } else {
                        this._tbar.addChild(new dijit.form.Button(items[i]), i);
                    }
                }
            }

            this._toolbarApplied = true;
        },
        _setDetailPaneVisibility: function (value, saveState) {
            var selfAware = this;
            if (value) {
                if (this._hasConfigurationForDetail() && !this._isConfigurationActiveForDetail()) {
                    if (this._detailPane.isInstanceOf(_DetailPane)) {
                        this._detailPane.set('configuration', this._configuration.detail);
                    }

                    this._configuration.detail.active = true;
                }
                this._detailButton.set('label', this.hideDetailText);
                this.addChild(this._detailPane);

                //Set the first selected Record on the list grid.
                var selected = this._listGrid.getSelectedRowData();
                if (selected.length > 0) {
                    this._detailPane._onSelected(0, selected[selected.length - 1], this._listGrid);
                } else {
                    this._detailPane.clear();
                }

                if (saveState && this._hasConfigurationForDetail() && this._configuration.detailStateKey) {
                    sessionStorage.setItem(this._configuration.detailStateKey, 'true');
                }
            } else {
                this._detailButton.set('label', this.detailText);
                this.removeChild(this._detailPane);
                if (saveState && this._hasConfigurationForDetail() && this._configuration.detailStateKey) {
                    sessionStorage.setItem(this._configuration.detailStateKey, 'false');
                }
            }
        },
        _updateToolbarItemVisibility: function () {
            domClass.toggle(this.domNode, 'list-panel-has-summary', this._canShowSummaryLink());
            domClass.toggle(this.domNode, 'list-panel-has-detail', this._canShowDetailPane());
        },
        _canShowSummaryLink: function () {
            return (this._hasConfigurationForSummary() || (this._configurationProvider && this._configurationProvider.summaryOptions));
        },
        _canShowDetailPane: function () {
            return (this._hasConfigurationForDetail() && ((this._gridContainer.selectedChildWidget !== this._summaryGrid) || this.detailOnSummary));
        },
        _shouldShowDetailPane: function () {
            return (this._canShowDetailPane() && this.detailVisible);
        },
        _hasConfigurationForList: function () {
            return (this._configuration && this._configuration.list);
        },
        _hasConfigurationForSummary: function () {
            return (this._configuration && this._configuration.summary);
        },
        _hasConfigurationForDetail: function () {
            return (this._configuration && this._configuration.detail);
        },
        _isConfigurationActiveForList: function () {
            return (this._hasConfigurationForList() && this._configuration.list.active);
        },
        _isConfigurationActiveForSummary: function () {
            return (this._hasConfigurationForSummary() && this._configuration.summary.active);
        },
        _isConfigurationActiveForDetail: function () {
            return (this._hasConfigurationForDetail() && this._configuration.detail.active);
        },



        // **** EVENT HANDLERS FOR WHEN GRID STATE CHANGES AND SHOULD BE SAVED
        _onColumnResize: function (evt) {
        },
        _onSort: function (e) {
            // Handle sort storage
            var grid = this._listGrid,
                key = this._getGridSortKey(),
                cell = grid._grid.cell(e),
                existingSortInfo = this._getSortInfo(),
                sortInfo = null, column = null;

            grid.clearSelection();

            if (cell !== null && typeof cell.column !== "undefined" && typeof cell.column.customSort !== "undefined") {
                e.preventDefault();
                column = cell.column;
                sortInfo = lang.mixin(column.customSort, { descending: false });
                if (existingSortInfo && existingSortInfo.attribute === sortInfo.attribute) {
                    if (existingSortInfo.descending === true) {
                        sortInfo.descending = false;
                    } else {
                        sortInfo.descending = true;
                    }
                }
                grid._grid.set('sort', sortInfo.attribute, sortInfo.descending);
                grid._grid.updateSortArrow([{ attribute: column.field, descending: sortInfo.descending }], false);
            }

            if (sortInfo === null) {
                sortInfo = e.sort[0];
            }
            this._saveToLocalStorage(key, sortInfo);
        },
        // TODO: _onMoveColumn
        // **** END EVENT HANDLERS FOR WHEN GRID STATE CHANGES AND SHOULD BE SAVED
        _onRowDblClick: function (e) {
            if (this._configuration.list.onNavigateToDefaultItem) {
                this._configuration.list.onNavigateToDefaultItem(e.data);
            }
        },

        // **** UTILITY FUNCTIONS TO DO WITH SAVING THINGS TO LOCAL STORAGE
        _saveToLocalStorage: function (key, value, namespace) {
            var localStore;
            key = this._alterKeyForLookupResults(key);
            try {
                localStore = new LocalStorageProvider();
                localStore.initialize();

                if (!namespace) {
                    namespace = this._getGroupNS();
                }

                namespace = this._makeValidNamespace(namespace);
                localStore.put(key, value, function (status, key, message) {
                    if (status === localStore.FAILED) {
                        console.error('Failed writing key: ' + key + ' in local storage. Message: ' + message);
                    }
                }, namespace);
            } catch (err) {
                console.error(err);
            }
        },
        _getFromLocalStorage: function (key, namespace) {
            var localStore, results;
            key = this._alterKeyForLookupResults(key);
            try {
                localStore = new LocalStorageProvider();
                localStore.initialize();
                if (!namespace) {
                    namespace = this._getGroupNS();
                }

                namespace = this._makeValidNamespace(namespace);
                results = localStore.get(key, namespace); // returns null if key does not exist.
            } catch (err) {
                console.error(err);
            }

            return results;
        },
        _alterKeyForLookupResults: function (key) {
            if ((/LOOKUPRESULTS/).test(key)) {
                var currentEntityId = this._getMainViewName();
                key = key.replace('LOOKUPRESULTS', 'LOOKUPRESULTS' + (currentEntityId != -1 ? currentEntityId : ''));
            }
            return key;
        },
        // TODO: Should be utility?
        _makeValidNamespace: function (ns) {
            // This is similar to the regex dojo uses to validate a valid namespace,
            // except we replace anything that would be invalid with a dash.
            // See: https://github.com/dojo/dojox/blob/1.7.3/storage/LocalStorageProvider.js
            return ns.replace(/[^0-9^A-Z^a-z^\-]/g, '-');
        },
        _getGroupNS: function () {
            var ns = Sage.Groups.GroupManager.LOCALSTORE_NAMESPACE + '-' + this._getGroupID();
            return ns;
        },
        _getViewNS: function () {
            var ns = Sage.Groups.GroupManager.LOCALSTORE_NAMESPACE + '-' + this._getMainViewName();
            return ns;
        },
        _getGroupID: function () {
            var service = Sage.Services.getService("ClientGroupContext"),
    results = -1,
                context = null;
            if (service) {
                context = service.getContext();
                if (context) {
                    results = context.CurrentGroupID;
                }
            }

            return results;
        },
        _getMainViewName: function () {
            if (this._configurationProvider._mainViewName) {
                return this._configurationProvider._mainViewName;
            }
            //if not defined then use the group context.
            var service = Sage.Services.getService("ClientGroupContext"),
                results = -1,
    context = null;
            if (service) {
                context = service.getContext();
                if (context) {
                    results = context.CurrentEntity;
                }
            }
            return results;
        },
        _getGridSortKey: function () {
            return this._keyGen(this.STORE_KEY_SORT_INFO);
        },
        _getViewStateKey: function () {
            return this.STORE_KEY_VIEWSTATE;
        },
        _getStoreQueryKey: function () {
            var id = this.STORE_KEY_STORE_QUERY + this._getGroupID();
            return id;
        },
        // TODO: Utility?
        _keyGen: function (keyPart) {
            var id = this._listGrid.id + keyPart + this._configuration.list.id;
            return id;
        },
        // **** END UTILITY FUNCTIONS TO DO WITH SAVING THINGS TO LOCAL STORAGE

        // TODO: This is re-implemented everywhere. Should be a base item.
        _markDirty: function (entity) {
            this._unsavedDataLabel.set('style', 'display:inline');
        },
        // TODO: This is re-implemented everywhere. Should be a base item.
        _markClean: function () {
            this._unsavedDataLabel.set('style', 'display:none');
        },

        getSelectionInfo: function (includeEntity) {
            //selectionInfo = {
            //    key: selectionKey,
            //    mode: mode,
            //    selectionCount: selectionCount,
            //    recordCount: recordCount,
            //    sortDirection: '', // sortDirection,  //ToDo: find these... <---<<<   <---<<<
            //    sortField: '', // sortField,
            //    keyField: keyField,
            //    hasCompositeKey: hasCompositeKey,
            //    ranges: [], // ranges, //ranges are leftover from the Ext grid - the dojo grid does not use ranges, when a large range is selected, it fetches all the data...
            //    selections: selections,
            //    selectedIds: selectedIds
            //};

            return this._selectionInfoObject;
        },
        requestConfiguration: function () {
            ready(lang.hitch(this, function () {
                if (this._configurationProvider) {
                    this._configurationProvider.requestConfiguration({
                        success: lang.hitch(this, this._applyConfiguration),
                        failure: lang.hitch(this, this._applyConfigurationFailed)
                    });
                }
            }));
        },
        clearSelection: function () {
            if (this._listGrid) {
                this._listGrid.clearSelection();
            }
        },
        refreshView: function () {
            if (this._configuration.rebuildOnRefresh) {
                this.requestConfiguration();
            }
            this.refreshList();
            dojo.publish('/listView/refresh', this);
        },
        refreshList: function (listId) {
            if (this._listMode !== 'list') {
                this.refreshSummary();
                return;
            }

            if (!listId) {
                this._listGrid.refresh();
            } else {
                if (this._configuration._listId === listId) {
                    this._listGrid.refresh();
                }
            }

            this.clearSelection();

            if (this._detailPane) {
                this._detailPane.clear();
            }
        },
        refreshSummary: function () {
            if (this._hasConfigurationForSummary() && (this._listMode !== 'list')) {
                this._summaryGrid.refresh();
            }
        },
        // TODO: Why isn't this using the help mixin?
        showHelp: function () {
            util.openHelp(this.helpTopicName);
        },

        refreshGrid: function () {
            // Fired from refreshButton
            this.clearSelection();
            this.refreshList();
            this.refreshSummary();
        },

        showList: function () {
            var query,
                queryOptions,
                menuItem,
                i,
                store,
                key,
                viewStateKey,
                centerContent;

            this._listMode = 'list';
            if (!this._hasConfigurationForList()) {
                return;
            }

            viewStateKey = this._getViewStateKey();
            //this._ensureApplyFilterWasPublished(true);

            query = this._filterManager.createQuery();
            key = this._getStoreQueryKey();

            queryOptions = this._configuration.list.queryOptions || [];
            queryOptions.httpMethodOverride = !!query;


            // TODO: This needs to be reflected in items passed to the grid options, so move it.
            if (this._configuration.list.rowsPerPage > 0) {
                //this._listGrid.set('rowsPerPage', this._configuration.list.rowsPerPage);
            }

            this._listGrid.setStore(null, null);
            this._listGrid.STORE_NS = this._getGroupNS();
            this._listGrid.setColumns(this._configuration.list.structure);

            this._selectionInfoObject.keyField = this._configuration.list.store.idProperty;
            this._dojoxStore = this._configuration.list.dojoxStore;

            this._queryStore(query, queryOptions);
            this._gridContainer.selectChild(this._listGridPane);

            this._listGrid.setRowRenderFunction();
            this._listGrid.setHeaderVisibility(true);

            this._configuration.list.active = true;
            this._setDetailPaneVisibility(this._shouldShowDetailPane(), false);
            this._updateToolbarItemVisibility();
            if (!this._isConfigurationActiveForList()) {
                if (this._dataChangeWatchers.length > 0) {
                    array.forEach(this._dataChangeWatchers, dojo.disconnect);
                    this._dataChangeWatchers = [];
                }

                if (this._configuration.list.formatterScope && (this._listGrid.formatterScope !== this._configuration.list.formatterScope)) {
                    this._listGrid.set('formatterScope', this._configuration.list.formatterScope);
                }
            }

            var sortOrder = this._getSortingInfo();
            if (sortOrder) {
                if (!lang.isArray(sortOrder)) {
                    sortOrder = [sortOrder];
                }
                for (var idx = 0; idx < sortOrder.length; idx++) {
                    sortOrder[idx].attribute = this._CheckForCustomReferenceInSort(sortOrder[idx].attribute);
                }
                this._listGrid._grid.updateSortArrow(sortOrder, true);
            }

            viewStateKey = this._getViewStateKey();
            this._saveToLocalStorage(viewStateKey, 'list', this._getViewNS());
        },
        showSummary: function () {
            var viewStateKey;
            //    query;
            this._listMode = 'summary';

            //    this.clearSelection();
            this._summaryGrid.setStore(null, null);

            this._setDetailPaneVisibility(this._shouldShowDetailPane(), false);
            this._updateToolbarItemVisibility();


            var query = this._filterManager.createQuery();
            if (!this._hasConfigurationForSummary()) {
                // return;
                this._configuration.summary = this._configurationProvider._createConfigurationForSummary();
            }
            this._summaryGrid.setRowRenderFunction(lang.hitch(this, function (obj) {
                return this._configuration.summary.formatterScope.formatSummary(obj[this._configuration.summary.keyField]);
            }));
            this._summaryGrid.setColumns(this._configuration.summary.columns);
            this._summaryGrid.setStore(this._configuration.summary.store, query, this._configuration.summary.queryOptions);


            this._gridContainer.selectChild(this._summaryGridPane);

            this._summaryGrid.setHeaderVisibility(false);
            viewStateKey = this._getViewStateKey();
            this._saveToLocalStorage(viewStateKey, 'summary', this._getViewNS());
        },
        toggleDetail: function () {
            if (!this._hasConfigurationForDetail()) {
                return;
            }

            this.detailVisible = !this.detailVisible;

            this._setDetailPaneVisibility(this._shouldShowDetailPane(), true);
        },
        _updateRecordCountText: function () {
            var currRecordCount = 0;
            this._selectionInfoObject.recordCount = this._listGrid.totalRecords;
            if (this._listMode === 'list' && this._hasConfigurationForList) {
                currRecordCount = this._listGrid.totalRecords;
            }
            if (this._listMode === 'summary' && this._hasConfigurationForSummary()) {
                currRecordCount = this._summaryGrid.totalRecords;
            }
            this._tbarLabel.set('label', nlsListPanel.totalRecordsText + currRecordCount);
        },
        onGridLoadComplete: function (evt) {
        },
        _onGridLoadComplete: function (evt) {
            this._updateRecordCountText();
            if (this._configurationProvider && this._configurationProvider.listPanelConfiguration &&
                    this._configurationProvider.listPanelConfiguration.list && (this._configurationProvider.listPanelConfiguration.list.defaultSelectFirst === true)) {
                this._listGrid._grid.select(query(".dgrid-row", this._listGrid.domNode)[0]);
        }
            this.onGridLoadComplete(evt);
        },
        onRowClick: function (index, row, grid) {
        },
        _onRowClick: function (e) {
            this.onRowClick(e.rowIndex, e.grid.getItem(e.rowIndex), e.grid);
        },
        onRowContextMenu: function (index, row, grid) {
        },
        _onRowContextMenu: function (e) {
            var selection = e.grid.selection,
                selected = selection.getSelected();

            if (selected.length === 0) {
                selection.select(e.rowIndex);
            }

            this.onRowContextMenu(e.rowIndex, e.grid.getItem(e.rowIndex), e.grid);
        },
        // the detail section selection is handled else where by listening for this function to be called.
        onSelected: function (index, row, grid) {
        },
        _onSelected: function (index, row, grid) {
            if (this._shouldShowDetailPane()) {
                this._detailPane.clear();
            }
            this.onSelected(index, row, grid);
        },
        onSelectionChanged: function (evt) {
        },
        _onSelectionChanged: function (evt) {
            var isDeselect = evt.type.indexOf("deselect") >= 0,
                isSelect = evt.type.indexOf("select") && !isDeselect;
            if (isSelect) {
                this._onSelected(this._listGrid.getSelectedRowId(), evt.rows[0].data, this._listGrid);
            }
            this.onSelectionChanged(evt);
        },
        _addToSelectionInfo: function (evt) {
            var sels = evt.rows;

            for (var i = 0; i < sels.length; i++) {
                var sels_item = sels[i];
                if (sels_item) {
                    var entityId = sels_item.data[this._selectionInfoObject.keyField];
                    this._selectionInfoObject.selectedIds.push(entityId);
                    this._selectionInfoObject.selections.push({ "id": entityId, "rn": sels_item.id, "entity": sels_item.data });
                }
            }

            this._selectionInfoObject.selectionCount = this._selectionInfoObject.selectedIds.length;

            dojo.publish('/sage/ui/list/selectionChanged', this);
            this._onSelectionChanged(evt);
        },
        _removeFromSelectionInfo: function (evt) {
            var desels = evt.rows;

            for (var i = 0; i < desels.length; i++) {
                if (desels[i]) {
                    this._selectionInfoObject.selectedIds.splice(this._selectionInfoObject.selectedIds.indexOf(desels[i], 1));
                    var index = this._selectionInfoObject.selections.map(function (e) { return e.id; }).indexOf(desels[i]);
                    this._selectionInfoObject.selections.splice(index, 1);
                }
            }
            this._selectionInfoObject.selectionCount = this._selectionInfoObject.selectedIds.length;

            dojo.publish('/sage/ui/list/selectionChanged', this);
            this._onSelectionChanged(evt);
        },
        resolveProperty: function (propertyName, dataPath /* optional */) {
            var list = this._configuration && this._configuration.list,
                layout = list && list.layout,
                tableAliases = (list && list.tableAliases) || {};

            if (layout) {
                // todo: cache this information
                var alias = this._getAlias(propertyName, layout, tableAliases, false);
                if (alias) {
                    return alias;
                } else {
                    alias = this._getAlias(propertyName, layout, tableAliases, true);
                    if (alias) {
                        return alias;
                    } else {
                        return propertyName;
                    }
                }
            }
            if (this._configuration && typeof (this._configuration.resolveProperty) === 'function') {
                return this._configuration.resolveProperty(propertyName, dataPath);
            }
            return propertyName;
        },
        propertyFormat: function (propertyName) {
            var list = this._configuration && this._configuration.list,
                layout = list && list.layout,
                tableAliases = (list && list.tableAliases) || {};

            if (layout) {
                var i, item;
                for (i = 0; i < layout.length; i++) {
                    item = layout[i];
                    if (item.propertyPath === propertyName) {
                        return item.format;
                    }
                }
            }
            return null;
        },
        _getAlias: function (propertyName, layout, tableAliases, splitPath) {
            var i, item, table, tableAlias, propertyPathSplit, layoutProperty;

            for (i = 0; i < layout.length; i++) {
                item = layout[i];
                layoutProperty = item.propertyPath;
                if (layoutProperty === null) {
                    continue;
                }
                if (splitPath) {
                    propertyPathSplit = item.propertyPath && item.propertyPath.split('.');
                    if (propertyPathSplit.length === 2) {
                        layoutProperty = propertyPathSplit[1];
                    }
                }
                if (layoutProperty === propertyName) {
                    if (/^[a-z]\d+_/i.test(item.alias)) {
                        return item.alias;
                    }
                    table = item.dataPath && item.dataPath.split(':')[0];
                    tableAlias = table && tableAliases[table.toUpperCase()];
                    if (tableAlias) {
                        return tableAlias + '.' + item.alias;
                    }
                    return item.alias;
                }
            }
            return null;
        }
    });

    return listPanel;
});