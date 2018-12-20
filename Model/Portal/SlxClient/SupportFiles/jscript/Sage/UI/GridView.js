require({cache:{
'url:Sage/UI/templates/GridView.html':"[\r\n'<div data-dojo-type=\"dijit.layout.ContentPane\" class=\"HundredPercentHeight abstractGrid\" >',\r\n    '<div data-dojo-attach-point=\"headerNode\" class=\"list-panel-tbar\" role=\"toolbar\">',\r\n        '<span dojoattachpoint=\"labelSection\"></span>',\r\n        '<span dojoattachpoint=\"abstractGrid_toolBar\" class=\"right-tools\"></span>',\r\n    '</div>',\r\n    '<div dojoattachpoint=\"abstractGrid_filters\"></div>',\r\n    '<div dojoattachpoint=\"abstractGrid_grid\" class=\"gridcontainer\"></div>',\r\n'</div>'\r\n]"}});
require({
    cache: {
        'url:Sage/UI/templates/GridView.html': "[\r\n'<div data-dojo-type=\"dijit.layout.ContentPane\" class=\"HundredPercentHeight abstractGrid\" >',\r\n    '<div data-dojo-attach-point=\"headerNode\" class=\"list-panel-tbar\" role=\"toolbar\">',\r\n        '<span dojoattachpoint=\"labelSection\"></span>',\r\n        '<span dojoattachpoint=\"abstractGrid_toolBar\" class=\"right-tools\"></span>',\r\n    '</div>',\r\n    '<div dojoattachpoint=\"abstractGrid_filters\"></div>',\r\n    '<div dojoattachpoint=\"abstractGrid_grid\" class=\"gridcontainer\"></div>',\r\n'</div>'\r\n]"
    }
});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/GridView", [
    'dijit/_Widget',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-construct',
    'dojo/dom',
    'dojo/string',
    'dojo/on',
    'dojo/text!./templates/GridView.html',
    'Sage/UI/ImageButton',
    'dojo/i18n!./nls/GridView',
    'Sage/UI/Dialogs',
    'Sage/_Templated',
    'Sage/Utility',
    'Sage/UI/SDataLookup',
    'Sage/UI/ComboBox',
    'Sage/UI/Controls/Grid',
    'put-selector/put',
    'dojo/mouse',
    'dojo/dom-class',
    'dojo/query',
    'dojo/dom-style',
    'dojo/aspect',
    'Sage/UI/Controls/GridParts/Columns/CheckBox',
    'Sage/UI/SLXPreviewGrid/FilterPanel',
    'Sage/Store/SData',
    'dojo/store/Memory',
    'Sage/Store/WritableStore',
    'dojo/_base/connect',
    'dojo/_base/event',
    'dojo/dom-attr',
    'dijit/registry'
],
function (
_Widget, declare, lang, array, domConstruct, dom, dojoString, on, template, ImageButton, nlsResource, dialogs, _Templated, Utility, SDataLookup, ComboBox, Grid, put, mouse, domClass, query, domStyle, aspect, CheckBox, FilterPanel, SDataObjectStore, Memory, WritableStore, connect, event, domAttr, registry) {
    var widget = declare('Sage.UI.GridView', [_Widget, _Templated], {
        widgetsInTemplate: true,
        store: false,
        mode: '',
        grid: false,
        rowCount: 0,
        //toolbar controllers
        show_ToolBar: true,
        help_keyword: false,
        help_location: false,
        tools: [],              // list of the name of controls which appear to the right side of the toolbar
        gridLabel: '',          // grid name or label, appears to the left side of the toolbar
        query: '',          // the queryOptions for the grid
        showRecordCount: false, // controls the displaying of the grid's row count
        mixins: [],
        widgetTemplate: new Simplate(eval(template)),
        _filter: null,
        filterText: 'Filter',
        region: 'center',
        _applyFilters: false,
        _dataChangeConnections: [],
        constructor: function (options) {
            lang.mixin(this, nlsResource);
            this.mode = Utility.getModeId();
            if (options.storeOptions && options.storeOptions.isInsertMode) {
                this.mode = 'insert';
            }
            if (this.mode !== 'insert') {
                this.listenForPageSave();
            }
            this.populateUserOptions();
            connect.connect(this, 'onKeyDown', this.customKeyDown);
        },
        listenForPageSave: function () {
            var bindingMgr = Sage.Services.getService('ClientBindingManagerService');
            if (bindingMgr) {
                bindingMgr.addListener(bindingMgr.ON_SAVE, this.saveChanges, this);
            }
        },
        removePageSaveListener: function () {
            var bindingMgr = Sage.Services.getService('ClientBindingManagerService');
            if (bindingMgr) {
                bindingMgr.removeListener(bindingMgr.ON_SAVE, this.saveChanges);
            }
        },
        applyEditOnEnter: function (e) {
            if (e.charOrCode == 13 || e.keyCode == 13) {
                this.doApplyEdit();
                this.edit.apply();
                event.stop(e);
            }
        },
        customKeyDown: function (e) {
            this.applyEditOnEnter(e);
        },
        /**
        * Submits any change done on grid to its store.
        * @param {}
        */
        saveChanges: function (callback) {
            this.grid.save().then(lang.hitch(this, function (response) {
                console.log("saveChanges() successfully called.");
                this.markClean();
                this.refresh();
            })).then(function (response) {
                if (callback) {
                    callback(response);
                }
            });
        },
        /**
        * Cancels any datachanges done on grid by refreshing the grid.
        * @param {}
        */
        cancelChanges: function () {
            this.markClean();
            this.grid.revert();
        },
        /**
        * creates the grid structure. While the data is required, if the columns' array has been previously populated
        * then the columns argument is not needed. If the columns value is provided anyways, then it will overwrite the 
        * previously populated columns array.
        * @param {}
        */
        createGridView: function () {

            if (this.slxContext) {
                this.context = this.slxContext;
                this.tabId = this.slxContext.tabId;
            }
            // Public property to hide stop header from rendering
            if (this.hideHeaderView !== true) {
                this._createGridHeader();
            } else {
                domClass.add(this.headerNode, 'display-none');
            }
            if (this._filter) {
                var filterConditions = this._filter ? this._filter.getQuery() : null;
                this.query = filterConditions ? this.query + " " + filterConditions : '';
            }
            var options = {
                query: this.query,
                placeHolder: this.abstractGrid_grid
            };

            if (this.columns) {
                options.columns = this.columns;
            }

            this._setEditable();

            options.store = this.store = this.getStore();

            if (this.storeOptions) {
                options.storeOptions = this.storeOptions;
            }
            if (this.mode) {
                options.mode = this.mode;
            }
            if (this.data) {
                options.data = this.data;
            }
            if (this.rowsPerPage) {
                options.rowsPerPage = this.rowsPerPage;
            }
            if (this.selectionMode) {
                options.selectionMode = this.selectionMode;
            }
            if (this.columnHiding) {
                options.columnHiding = this.columnHiding;
            }
            if (this.columnReordering) {
                options.columnReordering = this.columnReordering;
            }
            if (this.columnResizing) {
                options.columnResizing = this.columnResizing;
            }
            if (this.rowSelection) {
                options.rowSelection = this.rowSelection;
            }
            if (this.dijitRegistry) {
                options.dijitRegistry = this.dijitRegistry; //TODO:check if this is required
            }
            if (this.pagination) {
                options.pagination = this.pagination;
            }
            if (this.sort) {
                options.sort = this.sort;
            }
            if (this.indirectSelection) {
                options.indirectSelection = this.indirectSelection;
            }
            if (this.previewField) {
                options.previewField = this.previewField;
            }
            if (this.fullNoteField) {
                options.fullNoteField = this.fullNoteField;
            }
            if (this.keyboardNavigation) {
                options.keyboardNavigation = this.keyboardNavigation;
            }
            if (this.minRowsPerPage) {
                options.minRowsPerPage = this.minRowsPerPage;
            }
            if (this.maxRowsPerPage) {
                options.maxRowsPerPage = this.maxRowsPerPage;
            }
            if (this.rowsPerPage) {
                options.rowsPerPage = this.rowsPerPage;
            }
            if (this.keepScrollPosition) {
                options.keepScrollPosition = this.keepScrollPosition;
            }
            if (this.farOffRemoval) {
                options.farOffRemoval = this.farOffRemoval;
            }
            if (this.pagingDelay) {
                options.pagingDelay = this.pagingDelay;
            }

            var contextservice = Sage.Services.getService('ClientEntityContext');
            var ctx = contextservice.getContext();
            var contextId = (ctx && ctx.DisplayName) ? ctx.DisplayName + '_' : '';
            options.id = contextId + (this.id ? this.id : '') + '_gridView';

            var grid = this.grid = new Grid(options);

            if (this.onDataChange) {
                this.grid.onDataChange = lang.hitch(this, function (evt) {
                    evt.cell.row.data[evt.cell.column.field] = evt.value;

                    var orig = lang.clone(evt.cell.row.data);
                    var entity = evt.cell.row.data,
                        attribute = evt.cell.column.field,
                        oldValue = evt.oldValue,
                        newValue = evt.value;

                    this.onDataChange(entity, attribute, oldValue, newValue, evt, this);

                    for (var property in orig) {
                        if (entity.hasOwnProperty(property)) {
                            if (this.mode === 'insert') {
                                evt.grid.updateDirty(evt.rowId, property, orig[property]);
                                this.store.setValue(entity, property, entity[property]);
                            } else {
                                // Restriction: only first level of properties in data object saved 
                                if (typeof entity[property] !== 'object' && orig[property] != entity[property]) {
                                    evt.grid.updateDirty(evt.rowId, property, entity[property]);
                                }
                            }
                        }
                    }

                    this.update(evt);
                });
            }

            aspect.after(this.grid, '_onDataChange', lang.hitch(this, function (obj, args) {
                var evt = args[0];
                if (this.mode !== 'insert' && this.shouldPublishMarkDirty !== false) {
                    // Varying column types have different levels of depth. We must check down the chain to
                    // get to our returnObject property.
                    if (evt.cell &&
                        evt.cell.widget &&
                        evt.cell.widget.returnObject === true) {
                        if (evt.oldValue.$key !== evt.value.$key) {
                            this.markDirty();
                        }
                    }
                    else {
                        if (evt.oldValue !== evt.value) {
                            this.markDirty();
                        }
                    }
                }
            }));
            aspect.after(this.grid, '_onLoadComplete', lang.hitch(this, function (obj, args) {
                this.labelSection.innerHTML = dojoString.substitute(this.totalRecordCountLabel, [this.grid.totalRecords]);
                this.rowCount = this.grid.totalRecords; // TODO: move every instance to this.totalRecords
            }));

            this.dirtyDataMsgID = this.tabId + '_dirtydatamsg';

            // HACK for replace: grids in entity manager page are instantiated each time on tab switch 
            domConstruct.empty(this.placeHolder);
            domConstruct.place(this.domNode, this.placeHolder);

            if (this.classNames) {
                domClass.add(this.abstractGrid_grid, this.classNames);
            }

            // TODO : Remove after 8.3. this should be handled by individual implementation
            grid.resize();

            connect.publish('/ui/gridView/created', this);
        },
        /*
        * On a datachange event, this method will update the row with new value of the record entity
        * evt = datachange event
        */
        update: function (evt) {
            var row = this.grid.reRenderRow(evt.cell.row.data);
            domConstruct.place(row.childNodes[0], evt.cell.row.element.childNodes[0], 'replace');
            var args = this.grid._grid._editorsPendingStartup;
            for (var i = args.length; i--;) {
                this.startupEditor.apply(null, args[i]);
            }
        },
        /**
         * Method copied as is from editor.js from dgrid to start up editor controls.
         * This would otherwise fire when data is bound to the grid. Recreating and replacing a row needed this to be fired.
         */
        startupEditor: function (cmp, column, cellElement, value) {
            // Handles editor widget startup logic and updates the editor's value.
            var grid = column.grid;
            if (cmp.domNode) {
                // For widgets, ensure startup is called before setting value,
                // to maximize compatibility with flaky widgets like dijit/form/Select.
                if (!cmp._started) {
                    cmp.startup();
                }

                // Set value, but ensure it isn't processed as a user-generated change.
                // (Clear flag on a timeout to wait for delayed onChange to fire first)
                cmp._dgridIgnoreChange = true;
                cmp.set("value", value);
                setTimeout(function () {
                    cmp._dgridIgnoreChange = false;
                }, 0);
            }

            // track previous value for short-circuiting or in case we need to revert
            cmp._dgridLastValue = value;
            // if this is an editor with editOn, also update activeValue
            // (activeOptions will have been updated previously)
            if (grid._activeCell) {
                grid._activeValue = value;
                // emit an event immediately prior to placing a shared editor
                on.emit(cellElement, "dgrid-editor-show", {
                    grid: grid,
                    cell: grid.cell(cellElement),
                    column: column,
                    editor: cmp,
                    bubbles: true,
                    cancelable: false
                });
            }
        },
        _getToolbarPlaceHolder: function () {
            var msgBox = domConstruct.create('span', {
                'class': 'grid-unsaveddata-msg',
                'id': this.dirtyDataMsgID,
                'style': 'display:none;',
                'content': (this.editable) ? this.unsavedDataText : ''
            });
            var toolBarPlaceHolder = this.abstractGrid_toolBar;
            var containerId;
            if (this.context && this.context.workspace) {
                //Place the tools and 'unsaved data' message into the correct workspace.
                switch (this.context.workspace) {
                    case 'Sage.Platform.WebPortal.Workspaces.Tab.TabWorkspace':
                        //Don't add the dirty data message if we are in insert mode.  All data is dirty in insert mode.
                        if (this.mode !== 'insert') {
                            var elem = query('#' + 'element_' + this.tabId + ' td.tws-tab-view-title');
                            if (elem.length > 0) {
                                domConstruct.place(msgBox, elem[0]);
                            }
                        }
                        containerId = ['element_', this.tabId].join('');
                        toolBarPlaceHolder = query(['#', containerId, ' td.tws-tab-view-tools-right'].join(''));
                        break;
                    case 'Sage.Platform.WebPortal.Workspaces.MainContentWorkspace':
                        //Don't add the dirty data message if we are in insert mode.  All data is dirty in insert mode.
                        if (this.mode !== 'insert') {
                            domConstruct.place(msgBox, query('#' + this.tabId + ' span.mainContentHeaderTitle')[0]);
                        }
                        //This containerId assignment appears redundant but we need the specific Id for the later query when placing the tool.
                        containerId = this.tabId;
                        toolBarPlaceHolder = query('#' + containerId + ' td.mainContentHeaderToolsRight');
                        break;
                    case 'Sage.Platform.WebPortal.Workspaces.DialogWorkspace':
                        //This containerId assignment appears redundant but we need the specific Id for the later query when placing the tool.
                        toolBarPlaceHolder = query('td.dialog-tools-right');
                        break;
                    default:
                }
            }
            if (toolBarPlaceHolder.length > 0) {
                return toolBarPlaceHolder[0];
            }
            else {
                return toolBarPlaceHolder;
            }
        },
        _createOwnToolbar: function (toolbarPlaceHolder) {
            var roleService = Sage.Services.getService("RoleSecurityService");
            var container = this.abstractGrid_toolBar;
            for (var i = 0; i < this.tools.length; i++) {
                var tool = this.tools[i];
                if (tool.appliedSecurity && tool.appliedSecurity !== '') {
                    if ((roleService) && (!roleService.hasAccess(tool.appliedSecurity))) {
                        continue;
                    }
                }
                var btn = false;
                if (typeof tool === 'string') {
                    btn = this._createDefaultBtns(tool, 1);
                } else {
                    if (tool.type){
                        var conf = null;         
                        if (tool.type === 'Sage.UI.SDataLookup') {
                            conf = tool.controlConfig || tool;
                            btn = new SDataLookup(conf);
                            this.lookupControl = btn;
                        }
                        if (tool.type === 'Sage.UI.ComboBox') {
                            conf = tool.controlConfig || tool;
                            btn = new ComboBox(conf);
                            this.lookupControl = btn;
                        }
                    } else {
                        btn = new ImageButton({
                            icon: tool.icon || '',
                            imageClass: tool.imageClass || '',
                            id: tool.id,
                            onClick: lang.hitch(tool.scope || this, tool.handler),
                            tooltip: tool.alternateText || tool.tooltip
                        });
                    }
                }
                if (btn) {
                    this._addToolBarItem(btn, i + 1, toolbarPlaceHolder);
                }
            }
        },
        /**
        * show tooltip if cell overflows
        * @param {}
        */
        _createGridHeader: function () {
            if (this.previewField) {
                this.tools.unshift({
                    id: 'TogglePrvRows_' + ((this.tabId) ? this.tabId : ''),
                    imageClass: 'fa fa-bars',
                    tooltip: nlsResource.toggleRows,
                    handler: this.togglePreviewRows,
                    scope: this
                });
            }
            if (this.mode !== 'insert') {
                // Build filters
                this._filter = this._buildFilter();
            }

            // Get toolbar location 
            var toolbarPlaceHolder = this._getToolbarPlaceHolder();
            // Create and startup the toolbar...
            if ((this.tabId) && (this.tabId !== '')) {
                this._addToolsToWorkspaceToolbar(toolbarPlaceHolder);
                this.currentEntityId = Utility.getCurrentEntityId();
            } else {
                this._createOwnToolbar(toolbarPlaceHolder);
            }
        },
        /**
        * Create toolbar from tools variable
        * @param {}
        */
        _addToolsToWorkspaceToolbar: function (toolbarPlaceHolder) {
            if (this.readOnly) {
                return;
            }
            var roleService = Sage.Services.getService("RoleSecurityService");
            //Some buttons may be hidden in different modes and/or security levels.  
            //We'll keep a position variable to make sure the group stays together.            
            var positionString, refNode;
            for (var position = 0; position < this.tools.length; position++) {
                positionString = '';
                var tool = this.tools[position];
                if (typeof tool.mergeControlId !== 'undefined' && tool.mergeControlId.length !== 0) {
                    refNode = dojo.query('[id$=' + tool.mergeControlId + ']', dojo.byId('element_' + this.tabId))[0];
                    positionString = tool.mergePosition.toLowerCase();
                }
                if (!refNode) {
                    // No control to place next to.  Use the container and position 0.
                    refNode = toolbarPlaceHolder;
                    positionString = '';
                }
                if (this.mode === 'insert' && !tool.displayInInsert) {
                    continue;
                }
                if (tool.appliedSecurity && tool.appliedSecurity !== '') {
                    if ((roleService) && (!roleService.hasAccess(tool.appliedSecurity))) {
                        continue;
                    }
                }
                var btn = false;
                if (typeof tool === 'string') {
                    btn = this._createDefaultBtns(tool);
                } else {
                    if ((tool.type) && (tool.type === 'Sage.UI.SDataLookup')) {
                        var conf = tool.controlConfig || tool;
                        btn = new SDataLookup(conf);
                        this.lookupControl = btn;
                    } else {
                        btn = new ImageButton({
                            icon: tool.icon || '',
                            imageClass: tool.imageClass || '',
                            id: tool.id,
                            onClick: lang.hitch(tool.scope || this, tool.handler),
                            tooltip: tool.alternateText || tool.tooltip
                        });
                    }
                }
                if (btn) {
                    this._addToolBarItem(btn, (positionString.length > 0) ? positionString : position + 1, refNode);
                }
            }
        },
        /**
        * Add toolbar items to placeholder
        * @param {item, place, toolBarPlaceHolder} 
        */
        _addToolBarItem: function (item, place, refNode) {
            if (item.domNode) {
                if (place) {
                    domConstruct.place(item.domNode, refNode, place);
                }
                else {
                    domConstruct.place(item.domNode, refNode);
                }
            }
            else {
                if (place) {
                    domConstruct.place(item, refNode, place);
                }
                else {
                    domConstruct.place(item, refNode);
                }
            }
        },
        /**
        * Returns selected row data
        * @param {} 
        */
        getSelectedRowData: function () {
            return this.grid.getSelectedRowData();
        },
        /**
        * Returns selected row id
        * @param {} 
        */
        getSelectedRowId: function () {
            return this.grid.getSelectedRowId();
        },
        /**
        * Displays the help page when the help icon is selected
        * @param {} 
        */
        showHelp: function (hk, hl) {
            Utility.openHelp(hk, hl);
        },
        /**
        * Refreshes the grid contained in view
        * @param {} 
        */
        refresh: function () {
            this.markClean();
            this.grid.refresh();
        },
        /**
        * Handles querying for the User Options
        * @param {} 
        */
        populateUserOptions: function () {
            if (this.indirectSelection) return;

            var optionsSvc = Sage.Services.getService('UserOptions');
            if (optionsSvc && optionsSvc.get) {
                optionsSvc.get('GroupCheckboxEnabled', 'GroupGridView', lang.hitch(this, function (data) {
                    var groupCheckboxEnabled = data && data.value;
                    if (groupCheckboxEnabled === 'True' || groupCheckboxEnabled === 'T') {
                        this.indirectSelection = true;
                    }
                    else {
                        this.indirectSelection = false;
                    }
                }), null, this, false);
            }
        },
        /**
        * Build and return filter widget.
        * If the grid has no filter configuration then it will return null.
        * @param {} 
        */
        _buildFilter: function () {
            var filterConfig = [];
            for (var i = 0; i < this.columns.length; i++) {
                var cc = this.columns[i];
                if (cc.filterConfig) {
                    // filterconfig is supplemented with the column config itself, this way we keep the same label etc.
                    var fc = lang.mixin(lang.clone(cc), cc.filterConfig);
                    if (!fc.label) {
                        fc.label = cc.name;
                    }
                    filterConfig.push(fc);
                }
            }
            if (filterConfig.length === 0) {
                this._filtersApplied = false;
                return null;
            }
            var filter = new FilterPanel({
                id: this.id + '_filterpanel',
                region: 'top',
                filterConfig: filterConfig,
                style: 'display: none'
            });
            this.tools.unshift({
                id: this.id + '_Filter',
                imageClass: 'icon_Filter_16x16',
                tooltip: this.filterText,
                handler: lang.hitch(this, function () {
                    this._filter.toggle();
                })
            });

            domConstruct.place(filter.domNode, this.abstractGrid_filters);

            filter.onFilterApply = lang.hitch(this, function (conditions) {
                this.grid.setFilter(conditions);
            });

            return filter;
        },
        /**
        * Creates default toolbar buttons
        * @param {
        *           From: added as a step to consolidate code with a similar logic and functionality, but whose functionality was dependently named functions.
        *                 1 means from _createOwnToolbar
        *                 0 means from  _addToolsToWorkspaceToolbar
        *       } 
        * 
        */
        _createDefaultBtns: function (tool, from) {
            var btn;
            switch (tool) {
                case 'add':
                    btn = new ImageButton({
                        icon: '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16',
                        tooltip: nlsResource.addText,
                        id: this.id + '_addBtn',
                        onClick: lang.hitch(this, function () {
                            if (this.addItem)
                                this.addItem();
                            else if (this.addNew)
                                this.addNew();
                        })
                    });
                    break;
                case 'delete':
                    btn = new ImageButton({
                        icon: '~/ImageResource.axd?scope=global&type=Global_Images&key=Delete_16x16',
                        tooltip: nlsResource.deleteText,
                        id: this.id + '_delBtn',
                        onClick: lang.hitch(this, function () {
                            if (this.removeItem)
                                this.removeItem();
                            else if (this.deleteSelected)
                                this.deleteSelected();
                        })
                    });
                    break;
                case 'save':
                    btn = new ImageButton({
                        imageClass: 'icon_Save_16x16',
                        tooltip: nlsResource.saveText,
                        id: this.id + '_saveBtn',
                        onClick: lang.hitch(this, function () {
                            this.saveChanges();
                        })
                    });
                    break;
                case 'cancel':
                    btn = new ImageButton({
                        imageClass: 'icon_Reset_16x16',
                        tooltip: nlsResource.cancelText,
                        id: this.id + '_cancelBtn',
                        onClick: lang.hitch(this, function () {
                            this.cancelChanges();
                        })
                    });
                    break;
                case 'edit':
                    btn = new ImageButton({
                        icon: '~/ImageResource.axd?scope=global&type=Global_Images&key=Edit_Item_16x16',
                        tooltip: nlsResource.editText,
                        id: this.id + '_editBtn',
                        onClick: lang.partial(this.editItem, this)
                    });
                    break;
                case 'help':
                    btn = new ImageButton({
                        icon: '~/ImageResource.axd?scope=global&type=Global_Images&key=Help_16x16',
                        tooltip: nlsResource.helpText,
                        id: this.id + '_helpBtn',
                        onClick: this.showHelp
                    });
                    break;
            }
            return btn;
        },
        /**
        * Marks grid changes clean
        * @param {} 
        */
        markClean: function () {
            this.isDirty = false;
            if (this.dirtyDataMsgID) {
                var node = dom.byId(this.dirtyDataMsgID);
                if (node) {
                    domStyle.set(dom.byId(this.dirtyDataMsgID), 'display', 'none');
                }
                var bindingMgr = Sage.Services.getService('ClientBindingManagerService');
                if (bindingMgr) {
                    bindingMgr.clearDirtyAjaxItem(this.id);
                }
            }
        },
        /**
        * In case any data modification done on grid - fire up dirty event to notify browser.
        * @param {} 
        */
        markDirty: function () {
            this.isDirty = true;
            var node = dom.byId(this.dirtyDataMsgID);
            if (node) {
                domStyle.set(node, 'display', 'inline');
            }
            var bindingMgr = Sage.Services.getService('ClientBindingManagerService');
            if (bindingMgr) {
                bindingMgr.addDirtyAjaxItem(this.id);
            }
        },
        /**
        * Returns store based on store options.
        * @param {} 
        */
        getStore: function () {
            if (this.store) {
                return this.store;
            }

            if (!this.storeOptions) {
                throw ("Grid configuration is missing store");
            }

            this.storeOptions['isInsertMode'] = (this.mode === 'insert');
            this._storePrepareQuery();

            var store = (this.mode !== 'insert')
                ? new SDataObjectStore(this.storeOptions)
                : new WritableStore(this.storeOptions);

            if (store.onDataChange) {
                this._dataChangeConnections.push(connect.connect(store, 'setValue', store.onDataChange));
                this._dataChangeConnections.push(connect.connect(store, 'saveNewEntity', store.onDataChange));
                this._dataChangeConnections.push(connect.connect(store, 'deleteItem', store.onDataChange));
                this._dataChangeConnections.push(connect.connect(store, 'createItem', store.onDataChange));
            }
            return store;
        },
        _addToListUnique: function (item, list) {
            for (var i = 0; i < list.length; i++) {
                if (item === list[i]) {
                    return;
                }
            }
            list.push(item);
        },
        /**
        * Dynamic construction of query in case select parameters are not defined. Query is then 
        * constructed based on the columns passed on to the grid.
        * @param {} 
        */
        _storePrepareQuery: function () {
            var cols = this.columns,
                sel, i, p, inc, parts, combined, field;
            if (!this.store) {
                sel = this.storeOptions.select || [];
                inc = this.storeOptions.include || [];
            } else {
                //this means a datastore was given to us - most likely a proxydatastore.
                sel = this.store.select = this.store.select || [];
                inc = this.store.include = this.store.include || [];
            }

            this.storeOptions.select.push('Id');
            if (this.previewField) {
                this.storeOptions.select.push(this.previewField);
            }
            for (i = 0; i < sel.length; i++) {
                sel[i] = sel[i].replace(/\./g, '/');
            }
            for (i = 0; i < cols.length; i++) {
                // add columns to select 
                if (cols[i].field) {
                    field = cols[i].field;
                    this._addToListUnique(field.replace(/\./g, '/'), sel);

                    // include in select query for lookup editors
                    if (cols[i].editorArgs && cols[i].editorArgs.lookupOptions && cols[i].editorArgs.lookupOptions.field) {
                        var prop = field === cols[i].editorArgs.lookupOptions.field ? cols[i].editorArgs.lookupOptions.field : dojoString.substitute("${0}/${1}", [field, cols[i].editorArgs.lookupOptions.field]);
                        this._addToListUnique(prop.replace(/\./g, '/'), sel);
                    }
                }

                // add columns to "include" in sdata call
                if (cols[i].field.indexOf('.') > 0) {
                    parts = cols[i].field.split('.');
                    combined = '';
                    for (p = 0; p < parts.length - 1; p++) {
                        combined += parts[p];
                        this._addToListUnique(combined, inc);
                        combined += '/';
                    }
                }
            }
        },
        addAssociatedItems: function (items, parentName, childName, lookup) {
            // summary:
            //  Helper function for lookup tools.  This can be called by the handler to add items selected in a lookup
            var grid = this;
            if (Utility.getModeId() !== 'insert' && this.isDirty) {
                dialogs.raiseQueryDialog(
                    'Infor CRM',
                    this.dirtyDataMessage,
                    function (result) {
                        if (result) {
                            grid.addSelectedItems(items, parentName, childName, lookup);
                        }
                    },
                    this.okText,
                    this.cancelText
                );
            }
            else {
                grid.addSelectedItems(items, parentName, childName, lookup);
            }
        },
        addSelectedItems: function (items, parentName, childName, lookup) {
            var entities = [];
            var grid = this;
            for (var i = 0; i < items.length; i++) {
                var hasRecord = false;
                // duplicate detection
                for (var k in grid.store.data) {
                    var rec = grid.store.data[k];
                    if (rec[childName] && rec[childName].$key == items[i].$key)
                        hasRecord = true;
                }
                if (hasRecord)
                    continue;

                //Insert mode check
                var newRecord = {
                };
                if (Utility.getModeId() !== 'insert') {
                    newRecord[parentName] = {
                        $key: Utility.getCurrentEntityId()
                    };
                }
                newRecord[childName] = {
                };
                Utility.extend(newRecord[childName], items[i]);
                delete newRecord.$key;
                delete newRecord.$name;
                delete newRecord.$url;
                entities.push(newRecord);
            }
            if (entities.length > 0)
                grid.createItems(entities, function () {
                    if (Utility.getModeId() !== 'insert') {
                        __doPostBack("MainContent", "");
                    }
                });
            if (lookup)
                lookup.lookupDialog.hide();
        },
        createItems: function (items, callback) {
            if (lang.isArray(items)) {
                var store = this.grid.store;
                var iCreateCount = items.length;
                if (typeof console !== 'undefined') {
                    console.log('createItems() items.length = %o', iCreateCount);
                }
                //TODO: Replace callback with webworker.
                var fnResponse = function (arg1) {
                    // "this.", within the scope of fnResponse(), refers to the scope object below.
                    this.currentCount = this.currentCount + 1;
                    if (typeof console !== 'undefined') {
                        if (arg1 && typeof arg1 !== 'undefined' && arg1.getResponseHeader) {
                            console.log('createItems() response: (status = %o; statusText = %o): currentCount = %o; totalCount = %o',
                            arg1.status || 0, arg1.statusText || "", this.currentCount, this.totalCount);
                            console.log('createItems() response ETag: %o', arg1.getResponseHeader('ETag'));
                        } else {
                            if (arg1 && typeof arg1 !== 'undefined' && typeof arg1.$httpStatus === 'number') {
                                console.log('createItems() response ($httpStatus: %o; $key: %o; $descriptor: %o $etag: %o): currentCount = %o; totalCount = %o',
                                arg1.$httpStatus, arg1.$key || "", arg1.$descriptor, arg1.$etag, this.currentCount, this.totalCount);
                            } else {
                                console.log('createItems() response: (unknown status): currentCount = %o; totalCount = %o',
                                this.currentCount, this.totalCount);
                            }
                        }
                    }
                    if (this.currentCount === this.totalCount) {
                        this.grid.refresh();
                        if (typeof this.onComplete === 'function') {
                            this.onComplete.call(this.grid);
                        }
                    }
                };
                var scope = {
                    grid: this, totalCount: iCreateCount, currentCount: 0, onResponse: fnResponse, onComplete: callback || null
                };
                for (var i = 0; i < items.length; i++) {
                    store.createItem(items[i], scope);
                }
            }
            else {
                dialogs.showError(this.createItemsInvalidArrayText);
            }
        },
        destroy: function () {
            array.forEach(this._dataChangeConnections, function (connection) {
                connect.disconnect(connection);
            });
            if (this.lookupControl) {
                this.lookupControl.destroy(false);
            }

            if (this.grid) {
                this.grid.destroy(false);
            }

            if (this.store && this.store.destroy) {
                this.store.destroy(false);
            }

            if (this._registeredWidgets) {
                array.forEach(this._registeredWidgets, function (item) {
                    item.destroy(false);
                });

                this._registeredWidgets = null;
            }
            this.removePageSaveListener();
            this.inherited(arguments);
        },
        deleteSelected: function (callback) {
            var selectedItems = this.grid.getSelectedRowData();
            if (selectedItems.length === 0) {
                dialogs.showInfo(nlsResource.noSelectionsText);
                return;
            }

            if (this.mode !== 'insert') {
                if (!this._checkPageExitWarningMessage()) {
                    return;
                }
            }

            var self = this;
            var opts = {
                title: 'Infor CRM',
                query: dojoString.substitute(this.confirmDeleteFmtTxt, [selectedItems.length]),
                callbackFn: function (result) {
                    self.deleteCallback(result, callback, selectedItems);
                },
                yesText: this.yesText, //OK
                noText: this.noText //Cancel
            };
            dialogs.raiseQueryDialogExt(opts);
        },
        deleteCallback: function (result, callback, selectedItems) {
            if (result) {
                var grid = this.grid;
                var store = grid.store;
                grid.clearSelection();

                var fnResponse = function (arg1, arg2) {
                    if (arg1 && arg1.length) {
                        dialogs.showError(arg1);
                    }
                    grid.refresh();
                    if (typeof this.onComplete === 'function') {
                        this.onComplete.call(grid);
                    }
                };

                var scope = {
                    grid: grid, onResponse: fnResponse, onResponseExceptionMsg: '', onComplete: callback || null
                };

                if (store.deleteItem) {
                    store.deleteItem(selectedItems, scope);
                } else if (store.data) {
                    for (var i = 0; i < selectedItems.length; i++) {
                        store.remove(selectedItems[i].id);
                    }
                    grid.refresh();
                }
            }
        },
        _setEditable: function () {
            var editable = true, i;
            //Check Action security of the grid.
            if (this.appliedSecurity) {
                var svc = Sage.Services.getService("RoleSecurityService");
                if (svc) {
                    editable = svc.hasAccess(this.appliedSecurity);
                }
            }
            if (this.readOnly) {
                editable = false;
            }

            //If user does not have edit access to the grid, we need to override each column and set them to false.
            if (!editable) {
                for (i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].editable) {
                        this.columns[i].editable = false;
                    }
                }
                this.editable = false;
            } else {
                //if any of the columns are editable, assume the grid is editable...
                for (i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].editable) {
                        this.editable = true;
                        break;
                    }
                }
            }
        },
        _checkPageExitWarningMessage: function () {
            var response = true;
            if (this.isDirty) {
                var service = Sage.Services.getService("ClientBindingManagerService");
                response = confirm(service._PageExitWarningMessage);
            }
            return response;
        },

        togglePreviewRows: function () {
            this.grid.togglePreviewRows();
        },
        resize: function () {
            this.grid.resize();
        },
        /***********************************/
        // TODO: Remove all methods listed below after 8.3.
        /***********************************/
        _refresh: function () {
            console.error('grid onRefresh function is not guaranteed to exist after 8.3');
            this.refresh();
        },
        onRefresh: function () {
        },
        addNew: function (item) {
            console.error('grid addNew function is not guaranteed to exist after 8.3');
            this.grid.addItem(item);
        },
        showLoading: function () {
            console.error('grid showLoading function is not guaranteed to exist after 8.3');
        },
        setupHeader: function () {
            console.error('grid setupHeader function is not guaranteed to exist after 8.3');
            this._createGridHeader();
        },
        _getRecordCount: function () {
            console.error('grid _getRecordCount function is not guaranteed to exist after 8.3');
            return this.rowCount;
        }
    });
    return widget;
});