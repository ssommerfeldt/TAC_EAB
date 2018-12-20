/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
/**
* @class Sage.UI.Controls.Grid
* Base class for Grid control
*
* See the example:
*
*     @example
*     var grid = new Grid({
*           store: new dojo.store.Memory([data: []]),
*           sort: {["attribute": "id"]},
*           id: 'grid',
*           columns:[ {
*               field: 'attachDate',
*               label: 'attachDate',
*               width: '175px'
*           }, {
*               field: 'fileSize',
*               label: 'fileSize',
*               width: '120px'
*           }],
*           placeHolder: 'placeHoldeId',
*           columnHiding: true,
*           columnResizing: true,
*           columnReordering: true,
*           selectionMode: 'single',
*           rowSelection: true
*       });
*
*/
define("Sage/UI/Controls/Grid", [
    'dijit/_Widget',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/_base/array',
    'dgrid/Selection',
    'dgrid/OnDemandGrid',
    'dgrid/Grid',
    'dgrid/Keyboard',
    'dgrid/editor',
    'dgrid/selector',
    'dgrid/extensions/ColumnHider',
    'dgrid/extensions/ColumnReorder',
    'dgrid/extensions/ColumnResizer',
    'dgrid/extensions/Pagination',
    'dgrid/extensions/DnD',
    'dgrid/util/mouse',
    'put-selector/put',
    'dojo/dom-construct',
    'dojo/dom-class',
    'Sage/Utility',
    'Sage/Utility/_LocalStorageMixin',
    'dojo/dom-attr',
    'dojo/query',
    'dojo/keys',
    'dojo/i18n!./nls/Grid'
],
function (
    _Widget,
    declare,
    lang,
    on,
    array,
    Selection,
    OnDemandGrid,
    Grid,
    Keyboard,
    Editor,
    Selector,
    ColumnHider,
    ColumnReorder,
    ColumnResizer,
    Pagination,
    DnD,
    mouse,
    put,
    domConstruct,
    domClass,
    Utility,
    _LocalStorageMixin,
    domAttr,
    query,
    keys,
    nlsResource
) {
    var widget = declare('Sage.UI.Controls.Grid', [_Widget, _LocalStorageMixin], {
        /**
        * @property {Boolean}
        * Whether to allow row selection within the grid.
        * @default false
        */
        rowSelection: false,
        /**
        * @property {Boolean}
        * Whether to allow temporary hiding of columns via menu.
        * @default false
        */
        columnHiding: false,
        /**
        * @property {Boolean}
        * Whether to include a checkbox column for indirect row selection.
        * @default false
        */
        indirectSelection: false,
        /**
        * @property {Boolean}
        * Whether to allow columns to be resized.
        * @default false
        */
        columnResizing: false,
        /**
        * @property {Boolean}
        * Whether to allow columns to be reordered.
        * @default false
        */
        columnReordering: false,
        /**
        * @property {Boolean}
        * Whether to allow rows can be dragged.
        * @default false
        */
        dnd: false,
        /**
        * @property {Boolean}
        * Whether to used fixed page sizes as opposed to virtual/infinite scrolling behavior.
        * This behavior is NOT RECOMMENDED.
        * @default false
        */
        // TODO: We'll need to validate that this works, or we need to remove the option.
        pagination: false,
        /**
        * @property {String}
        * Add a custom class to grid while rendering
        * @default empty string
        */
        // NOTE: this property cannot be renamed to 'className' since grid.js being a widget - overwrites all default grid styles
        classNames: '',
        /**
        * @property {Boolean}
        * Whether to generate a tooltip to display text that would otherwise be truncated by ellipsis.
        * @default true
        */
        // TODO: Mix-in?
        tooltipForTruncatedData: true,
        /**
        * @property {Boolean}
        * Whether to allow keyboard navigation of the grid.
        * @default true
        */
        keyboardNavigation: true,
        /**
        * @property {Boolean}
        * Whether to allow editor to be dismissed on hitting enter.
        * @default true
        */
        dismissOnEnter: true,
        /**
        * @property {DomNode or DomId}
        * DOM node to contain the grid.
        * @default null
        */
        placeHolder: '',
        /**
        * @property {Array}
        * Describes the structure of the grid to be created.
        * If the indirect selection feature is enabled, a checkbox column will be prepended to the given structure before it is used to build the grid.
        */
        selection: null,
        columns: null,
        showHiderIcon: true,
        formatterScope: null,
        domNode: null,
        heightByVisibleRecords: null,
        id: null,
        store: null,
        query: null,
        queryOptions: null,
        selectionMode: 'single',
        _grid: null,
        allowSelectAll: false,
        cellNavigation: false,
        setUserPreferences: true,
        togglePreRowsFlag: true,

        // Dgrid default settings
        farOffRemoval: 2000,
        pagingDelay: 15,
        minRowsPerPage: 25,
        maxRowsPerPage: 250,
        /**
        * @property {number}
        * this property applies only for pagination
        */
        rowsPerPage: 15,
        keepScrollPosition: true,
        queryRowsOverlap: 0,
        previewLength: 255,
        maxEmptySpace: 'Infinity',
        where: '',
        forceAutoId: false,
        region: 'center',
        STORE_NS: 'SAGE_UI_GRIDVIEW_',
        STORE_KEY_SORT: '_GRID_SORT_PROPS_',
        STORE_KEY_COLUMN_SIZE: '_COLUMN_UNIT_WIDTH_',
        STORE_KEY_HIDE: '_GRID_TOTTLE_PROPS_',
        STORE_KEY_REORDER: '_GRID_LAYOUT_PROPS_',
        STORE_KEY_TOGGLEPREVIEW: '_TOGGLEPREVIEW_INFO_',
        /**
        * Creates an instance of the Grid.
        * @constructor
        */
        constructor: function (args) {
            this.columns = [];
            lang.mixin(this, args);
            lang.mixin(this, nlsResource);
            this._validatePropertiesForGrid();

            if (this.columns.length > 0) {
                this.columns = this._applyFormatterForLegacyColumns(this.columns);
            }

            if (this.indirectSelection === true) {
                this.columns = this._addSelectorColumnToColumns(this.columns);
            }

            var options = this._prepareGridOptions();
            var mixins = this._getGridMixins();

            var grid = this._grid = new (declare(mixins))(options);
            this.domNode = grid.domNode;

            if (this.previewField) {
                this._attachPreviewExpando();
            }

            if (this.tooltipForTruncatedData) {
                grid.on(mouse.enterCell, this._onCellMouseOver(grid));
                grid.on(mouse.leaveCell, this._onCellMouseLeave(grid));
            }

            this.eventHandlerSubs = [];
            this.eventHandlerSubs.push(grid.on('.dgrid-row:click', lang.hitch(this, function (evt) { this._onRowClick(evt); })));
            this.eventHandlerSubs.push(grid.on('.dgrid-row:dblclick', lang.hitch(this, function (evt) { this._onRowDblClick(evt); })));
            this.eventHandlerSubs.push(grid.on('dgrid-select', lang.hitch(this, function (evt) { this._onSelection(evt); })));
            this.eventHandlerSubs.push(grid.on('dgrid-deselect', lang.hitch(this, function (evt) { this._onDeselection(evt); })));
            this.eventHandlerSubs.push(grid.on('dgrid-error', lang.hitch(this, function (evt) { this._onError(evt); })));
            this.eventHandlerSubs.push(grid.on('dgrid-sort', lang.hitch(this, function (evt) { this._onGridSort(evt); })));
            this.eventHandlerSubs.push(grid.on('dgrid-datachange', lang.hitch(this, function (evt) { this._onDataChange(evt); })));
            this.eventHandlerSubs.push(grid.on('dgrid-refresh-complete', lang.hitch(this, function (evt) { this._onLoadComplete(evt); })));
            this.eventHandlerSubs.push(grid.on('.dgrid-row:contextmenu', lang.hitch(this, function (evt) { this._onContextActivate(evt); })));
            this.eventHandlerSubs.push(grid.on('.dgrid-header:click', lang.hitch(this, function (evt) { this._onHeaderClick(evt); })));
            this.eventHandlerSubs.push(grid.on('dgrid-columnresize', lang.hitch(this, function (evt) { this._onColumnResize(evt); })));
            this.eventHandlerSubs.push(grid.on('dgrid-columnstatechange', lang.hitch(this, function (evt) { this._onColumnHide(evt); })));
            this.eventHandlerSubs.push(grid.on('dgrid-columnreorder', lang.hitch(this, function (evt) { this._onColumnReorder(evt); })));
            this.eventHandlerSubs.push(grid.on('dgrid-editor-show', lang.hitch(this, function (evt) { this._onEditorShow(evt); })));
            this.eventHandlerSubs.push(grid.on('dgrid-editor-hide', lang.hitch(this, function (evt) { this._onEditorHide(evt); })));
            this.eventHandlerSubs.push(grid.on('keydown', lang.hitch(this, function (evt) { this._onKeyDown(evt); })));

            if (this.placeHolder) {
                domConstruct.place(this._grid.domNode, this.placeHolder);
            }
            if (this.showHiderIcon === false) {
                this.classNames += ' hideColumnHider';
            }
            domClass.add(grid.domNode, this.classNames);
            this._grid.startup();

            // Adjust height of grid as per number of records requested for view
            if (this.heightByVisibleRecords) {
                domAttr.set(query('.dgrid-scroller', this._grid.domNode)[0], 'style', 'max-height:' + (this.heightByVisibleRecords) * 31 + 'px');
            }
        },
        /**
        * Destroys the Grid instance
        */
        destroy: function () {
            array.forEach(this.eventHandlerSubs, function (item) {
                item.remove();
            });
            this._grid.destroy();
            this.inherited(arguments);
        },
        /**
        * @private
        * @TODO: Potentially extract this into preview row feature mixin.
        */
        _attachPreviewExpando: function () {
            var grid = this._grid;
            var expandedNode, expandoListener = on(grid.domNode, ".dgrid-row:click", function (evt) {
                if (domClass.contains(evt.srcElement, "morelink")) {
                    return false;
                }
                var node = grid.row(evt).element,
                    collapsed = node.className.indexOf("collapsed") >= 0;

                // toggle state of node which was clicked
                put(node, (collapsed ? "!" : ".") + "collapsed");

                // if clicked row wasn't expanded, collapse any previously-expanded row
                if (collapsed && expandedNode) {
                    put(expandedNode, ".collapsed");
                }

                // if the row clicked was previously expanded, nothing is expanded now
                expandedNode = collapsed ? node : null;
            });
        },
        /**
        * @private
        */
        _prepareGridOptions: function () {
            if (this.setUserPreferences !== false) {
                this._loadUserPrefrences();
            }

            var options = {
                columns: this.columns,
                store: this.store,
                allowSelectAll: false,
                dismissOnEnter: this.dismissOnEnter,
                cellNavigation: this.cellNavigation,
                query: this.query ? this.query : {},
                farOffRemoval: this.farOffRemoval,
                pagingDelay: this.pagingDelay,
                minRowsPerPage: this.minRowsPerPage,
                maxRowsPerPage: this.maxRowsPerPage,
                rowsPerPage: this.rowsPerPage,
                keepScrollPosition: this.keepScrollPosition,
                loadingMessage: this.loadingMessage,
                noDataMessage: this.noDataMessage,
                queryRowsOverlap: this.queryRowsOverlap,
                maxEmptySpace: this.maxEmptySpace,
                selectionMode: (this.selectionMode === 'Multi') ? 'extended' : this.selectionMode.toLowerCase(), // sage entities save mode as "Multi"
                sort: this.sort,
                forceAutoId: this.forceAutoId,
                keyboardNavigation: this.keyboardNavigation,
                formatterScope: this.formatterScope
            };
            if (this.id) {
                options.id = this.id;
            } else {
                console.warn("ID needs to be explicitly assigned to this Grid since this is a widget.");
            }

            if (this.previewField) {
                var self = this;
                options.renderRow = function (obj, options) {
                    var previewFullText = (self.previewField.indexOf('.') !== -1) ? Utility.splitField(obj, self.previewField) : obj[self.previewField];
                    var displayText = '';

                    if (previewFullText) {
                        // populate only 255 chars to DOM
                        displayText = [
                            Utility.htmlEncode(previewFullText.substr(0, self.previewLength)).replace(/(?:\r\n|\r|\n)/g, '<br />'),
                            '.... <a href="#" class="morelink">' + self.showMore + '</a>'
                        ].join('');
                    }
                    var collapsed = (self.togglePreRowsFlag) ? '.expando' : '.expando.collapsed';
                    var div = put("div" + collapsed, OnDemandGrid.prototype.renderRow.apply(this, arguments)),
                        expando = put(div, "div" + collapsed + " div.preview", { innerHTML: (displayText) });
                    return div;
                };
            }
            return options;
        },
        /**
        * Assign user preferences to grid columns
        * @private
        */
        _loadUserPrefrences: function () {
            this._setUserPrefColumnWidths();
            this._setUserSortInfo();
            this._setUserHideInfo();
            this._setUserColumnReorderInfo();
            this._setToggleForPreviewRows();
        },
        /**
        * Assign column order info to grid columns as available in local storage
        * @private
        */
        _setUserColumnReorderInfo: function () {
            var localColumns = this.getFromLocalStorage(this.STORE_KEY_REORDER + this.id, this.STORE_NS);

            if (localColumns && localColumns.length === this.columns.length) {
                var columns = [];
                var col = null;

                // add columns order property so grid can reorder them
                for (var j = 0; j < localColumns.length; j++) {
                    var colAdded = false;
                    var localCol = localColumns[j];
                    for (var i = 0; i < this.columns.length; i++) {
                        col = this.columns[i];
                        if (localCol.field === col.field && typeof col._columnOrder === 'undefined') {
                            col._columnOrder = i;
                            columns.push(col);
                            colAdded = true;
                            break;
                        }
                    }
                }

                // add any columns which are new to the list and not part of local storage
                for (var k = 0; k < this.columns.length; k++) {
                    col = this.columns[k];
                    if (typeof col._columnOrder === "undefined") {
                        columns.push(col);
                    }
                }
                this.columns = columns;
            }
        },
        /**
        * Assign column sort info to grid columns as available in local storage
        * @private
        */
        _setUserSortInfo: function () {
            var key = this.STORE_KEY_SORT + this.id;
            var sortProps = this.getFromLocalStorage(key, this.STORE_NS);
            if (sortProps) {
                this.sort = sortProps;
            }
        },
        /**
        * Assign column hide info to grid columns as available in local storage
        * @private
        */
        _setUserHideInfo: function () {
            array.forEach(this.columns, lang.hitch(this, function (col) {
                if (col && col.field) {
                    var key = this._getColumnLocalKey(col, this.STORE_KEY_HIDE),
                        value = this.getFromLocalStorage(key, this.STORE_NS);
                    if (value === true || value === false) {
                        col.hidden = value;
                    }
                }
            }));
        },
        /**
        * Assign column width to grid columns as available in local storage
        * @private
        */
        _setUserPrefColumnWidths: function () {
            array.forEach(this.columns, lang.hitch(this, function (col) {
                if (col && col.field) {
                    var key = this._getColumnLocalKey(col, this.STORE_KEY_COLUMN_SIZE),
                        value = this.getFromLocalStorage(key, this.STORE_NS);
                    if (value) {
                        col.width = value;
                    }
                }
            }));
        },
        /**
        * @param {object} col array
        * @param {string} unit string
        * @private
        */
        _getColumnLocalKey: function (col, unit) {
            var fieldStripped, id;
            if (col !== undefined && col.field !== undefined) {
                fieldStripped = col.field.replace(/[\.\$]/g, '_');
                id = [this.id, '_', unit, fieldStripped].join('');
            }
            return id;
        },
        /**
        * @private
        */
        _validatePropertiesForGrid: function () {
            if (!this.placeHolder) {
                console.warn("No destinationNode defined. Grid will need to be placed into DOM manually.");
            }
            if (this.className) {
                console.warn("Setting className property on grid will replace any implicit properties which this widget will try to set. Please use 'classNames' property to add classes to the grid.");
            }
        },
        /**
        * @private
        */
        _getGridMixins: function () {
            var mixins = [];
            // Note: onDemandGrid does not support pagination
            mixins.push(this.pagination ? Grid : OnDemandGrid);

            var _includeMixin = function (classObj, include) {
                if (include === true) {
                    mixins.push(classObj);
                }
            };

            _includeMixin(ColumnReorder, this.columnReordering);
            _includeMixin(ColumnResizer, this.columnResizing);
            _includeMixin(Selection, this.rowSelection);
            _includeMixin(ColumnHider, this.columnHiding);
            _includeMixin(Pagination, this.pagination);
            _includeMixin(Keyboard, this.keyboardNavigation);
            _includeMixin(DnD, this.dnd);

            return mixins;
        },
        /**
        * @param {array} columns array
        * @private
        */
        _applyFormatterForLegacyColumns: function (columns) {
            // convert type to formatter for legacy Sage/UI/Column formatters
            var tmpCols = [];
            var self = this;
            if (columns) {
                for (var i = 0; i < columns.length; i++) {
                    var column = columns[i];
                    if (column.type) {
                        column.formatter = function (value, data) {
                            var columnType = new this.type(this);

                            // Use this if needing to encode all raw data in dGrid columns
                            // will cause large overhead as it will be called recursively for each
                            // data object contained within the data object on the row
                            // Utility.encodeObjectStrings(data);

                            if (columnType.domNode) {
                                return columnType.domNode;
                            }
                            return columnType.format(value, data);
                        };
                    }

                    if (column.editor) {
                        this.cellNavigation = true;

                        if (typeof column.editable === 'undefined' || column.editable === true) {
                            column = Editor(column, column.editor, (column.editOn ? column.editOn : ''));
                        } else {
                            column.editor = null;
                        }
                    }
                    if (column.field && column.field.indexOf('.') !== -1 && !column.get) {
                        column.get = function (dataItem) {
                            return Utility.splitField(dataItem, this.field);
                        };
                        column.set = function (dataItem) {
                            return Utility.setField(dataItem, this.field, dataItem[this.field]);
                        };
                    }
                    if (column.width) {
                        column.width = parseInt(column.width, 10);
                    }
                    tmpCols.push(column);
                }
            }
            return tmpCols;
        },
        /**
        * @param {array} columns array
        *
        * @private
        */
        _addSelectorColumnToColumns: function (columns) {
            var selectorColumn = Selector({
                selectorType: 'checkbox',

                // TODO : Convert below code to dijit control. This implementation skips row selection events as handled as of now
                // It needs to be as defined in selector.js setupSelectionEvents()...

                //selectorType: function (value, cell, object) {
                //    var parent = cell.parentNode,
                //        disabled;

                //    // column.disabled gets initialized or wrapped in setupSelectionEvents
                //    disabled = object.disabled;

                //    // must set the class name on the outer cell in IE for keystrokes to be intercepted
                //    put(parent && parent.contents ? parent : cell, ".dgrid-selector");
                //    debugger;
                //    var input = cell.input || (cell.input = put(cell, (new CheckBox()).domNode, {
                //        tabIndex: isNaN(object.tabIndex) ? -1 : object.tabIndex,
                //        disabled: disabled && (typeof disabled == "function" ?
                //            disabled.call(object, object) : disabled),
                //        checked: value
                //    }));
                //    input.setAttribute("aria-checked", !!value);

                //    return input;
                //},
                label: '',
                editable: true,
                sortable: false,
                reorderable: false,
                unhidable: true,
                className: 'field-checkbox'
            });
            columns.splice(0, 0, selectorColumn); // insert the selector column to be first
            return columns;
        },
        /**
        * Overridable event triggered when editor is activated by cell click
        * @param {Event} evt
        * @event
        */
        onEditorShow: function (evt) { },
        /*
        * Event triggered when editor is activated by cell click
        * @param {Event} evt
        * @private
        */
        _onEditorShow: function (evt) {
            this.onEditorShow(evt);
        },
        /*
        * Overridable event triggered when editor is deactivated by cell blur event
        * @event
        */
        onEditorHide: function (evt) { },
        /**
        * Event triggered when editor is deactivated by cell blur event
        * @param {Event} evt
        * @private
        * @event
        */
        _onEditorHide: function (evt) {
            this.onEditorHide(evt);
        },
        /*
        * Overridable event triggered when keyboard is pressed
        * @event
        */
        onKeyDown: function (evt) { },
        /**
        * Event triggered when keyboard is pressed
        * @param {Event} evt
        * @private
        * @event
        */
        _onKeyDown: function (evt) {
            if (this.keyboardNavigation === true) {
                if (evt.keyCode === keys.TAB) {
                    if (!evt.shiftKey) {
                        Keyboard.moveFocusRight.call(this._grid, evt);
                    } else {
                        Keyboard.moveFocusLeft.call(this._grid, evt);
                    }
                }
                this.onKeyDown(evt);
            }
        },
        /**
        * Overridable event handler that fires when selecting a row or rows within the grid.
        * @param {Event} evt
        * Event parameter contains information regarding selection made.
        * @event
        */
        onColumnReorder: function (evt) {
        },
        /**
        * @param {Event} evt
        * @private
        * @event
        */
        _onColumnReorder: function (evt) {
            var order = [];
            array.forEach(evt.subRow, function (col) {
                order.push({
                    field: col.field
                });
            });
            this.saveToLocalStorage(this.STORE_KEY_REORDER + this.id, order, this.STORE_NS);
            this.onColumnReorder(evt);
        },
        /*
        * Overridable event handler that fires when column is hidden or made visible
        * @param {Event} evt
        * @event
        */
        onColumnHide: function (evt) {
        },
        /**
        * @param {Event} evt
        * @private
        * @event
        */
        _onColumnHide: function (evt) {
            this.saveToLocalStorage(this._getColumnLocalKey(evt.column, this.STORE_KEY_HIDE), evt.hidden, this.STORE_NS);
            this.onColumnHide(evt);
        },
        /**
        * Overridable event handler that fires when selecting a row or rows within the grid.
        * @param {Event} evt
        * Event parameter contains information regarding selection made.
        * @event
        */
        onSelection: function (evt) { },
        /**
        * @param {Event} evt
        * @private
        * @event
        */
        _onSelection: function (evt) {
            this.selectedItem = evt.rows[0].data;
            this.selection = this._grid.selection;
            this.onSelection(evt);
        },
        /**
        * Overridable event handler that fires when deselecting a row or rows within the grid.
        * @param {Event} evt
        * Event parameter contains information regarding deselection made.
        * @event
        */
        onDeselection: function (evt) { },
        /**
        * @param {Event} evt
        * @private
        * @event
        */
        _onDeselection: function (evt) {
            this.selectedItem = false;
            this.onDeselection(evt);
        },
        /**
        * Overridable event handler that fires when grid errors
        * @param {Event} evt
        * Event parameter contains information regarding error
        * @event
        */
        onError: function (evt) { },
        /**
        * Event handler that fires when grid errors
        * @param {Event} evt
        * @private
        * @event
        */
        _onError: function (evt) {
            console.error(evt.error.message);
            this.onError(evt);
        },
        /**
        * Event triggered on grid header row click
        * @event
        */
        onHeaderClick: function (evt) { },
        /**
        * Event triggered on grid header row click
        * @param {Event} evt
        * @private
        * @event
        */
        _onHeaderClick: function (evt) {
            this.onHeaderClick(evt);
        },
        /**
        * Overridable event handler that fires when grid data changes
        * @param {Event} evt
        * Event parameter contains information regarding data changes
        * @event
        */
        onDataChange: function (evt) { },
        /**
        * Event handler that fires when grid data changes
        * @param {Event} evt
        * @private
        * @event
        */
        _onDataChange: function (evt) {
            console.log("data changed: ", evt.oldValue, " -> ", evt.value, evt);
            console.log("cell: ", evt.cell, evt.cell.row.id);
            this.onDataChange(evt);
        },
        /**
        * Overridable event handler that fires when activating a context menu. This can be a mouse "right-click", or SHIFT + F10 on keyboard.
        * @param {Event} evt
        * @event
        */
        // TODO: Consider renaming? Intent isn't clear/descriptive when referenced from other code.
        onContextActivate: function (evt) {
        },
        /**
        * event handler that fires when activating a context menu. This can be a mouse "right-click", or SHIFT + F10 on keyboard.
        * @param {Event} evt
        * @private
        * @event
        */
        _onContextActivate: function (evt) {
            this.onContextActivate(evt);
        },
        /**
        * Overridable event handler that fires when a column is resized
        * @param {Event} evt
        * @event
        */
        onColumnResize: function (evt) { },
        /**
        * Event handler that fires when a column is resized
        * @param {Event} evt
        * @private
        * @event
        */
        _onColumnResize: function (evt) {
            var cell = evt.grid.columns[evt.columnId],
                value = evt.width,
                key = this._getColumnLocalKey(cell, this.STORE_KEY_COLUMN_SIZE);
            if (key !== undefined) {
                this.saveToLocalStorage(key, value, this.STORE_NS);
            }
            this.onColumnResize(evt);
        },
        /**
        * Overridable event handler that fires when grid data refresh is complete
        * @param {Event} evt
        * @event
        */
        onLoadComplete: function (evt) { },
        /**
        * Event handler that fires when grid data refresh is complete
        * @param {Event} evt
        * @private
        * @event
        */
        _onLoadComplete: function (evt) {
            console.log("dgrid-refresh-complete: ", evt);
            this.totalRecords = (typeof evt.results.total !== 'undefined') ? evt.results.total : evt.results.length;
            this.onLoadComplete(evt);
        },
        /**
        * Overridable event handler that fires when the grid is sorted, either programmatically or via UI interaction.
        * @param {Event} evt
        */
        // TODO: Validate it also fires on programmatic sort.
        onGridSort: function (evt) { },
        /**
        * @private
        * @param {Event} evt
        * @event
        */
        _onGridSort: function (evt) {
            // summary:
            // OVERRIDE of event fired when a header cell is clicked.
            // e: Event
            // Decorated event object which contains reference to grid, cell, and rowIndex
            // description:
            // Override for grid sorting to allow for:
            // 1. Disabling of sorting on a column level.
            // 2. Disabling of sorting on Insert mode due to limitations in the WritableStore.
            // 3. Displaying PageExitWarningMessage when unsaved data exists.
            if (this._grid.cell(evt).column.sortable === false || this.mode === 'insert') {
                evt.preventDefault();
            } else {
                this.saveToLocalStorage(this.STORE_KEY_SORT + this.id, evt.sort, this.STORE_NS);
            }
            this.onGridSort(evt);
        },
        /**
        * Overridable event handler that fires on cell mouse over
        * @param {Event} evt
        * @event
        */
        onCellMouseOver: function (evt) { },
        /**
        * Event handler that fires on cell mouse over
        * @private
        * @event
        */
        _onCellMouseOver: function () {
            // show tooltip if cell overflows
            return lang.hitch(this, function (evt) {
                var obj = this._grid.cell(evt);
                if (obj.element.offsetWidth < obj.element.scrollWidth) {
                    // FF operates on element.textContent
                    var text = (typeof obj.element.innerText === 'undefined') ? obj.element.textContent : obj.element.innerText;
                    if (text !== "") {
                        dijit.showTooltip(Utility.htmlEncode(text), obj.element);
                    }
                }
                this.onCellMouseOver(evt);
            });
        },
        /**
        * Overridable event handler that fires on cell mouse leave
        * @event
        */
        onCellMouseLeave: function () { },
        /**
        * @private
        * @event
        */
        _onCellMouseLeave: function () {
            return lang.hitch(this, function (evt) {
                // hide tooltip
                dijit.hideTooltip(this._grid.cell(evt).element);
                this.onCellMouseLeave(evt);
            });
        },
        /**
        * Overridable event trigger on grid row click
        * @event
        */
        onRowClick: function (evt, row) { },
        /**
        * Event trigger on grid row click
        * @param {event} evt
        * @private
        * @event
        */
        _onRowClick: function (evt) {
            var row = this._grid.row(evt);
            if (this.previewField) {
                this._moreClick(evt, row);
            }
            this.onRowClick(evt, row);
        },
        /**
        * Overridable event trigger on grid row double click
        * @param {object} row object data
        * @event
        */
        onRowDblClick: function (row) { },
        /*
        * Event trigger on grid row double click
        * @param {event} evt
        * @private
        * @event
        */
        _onRowDblClick: function (evt) {
            var row = this._grid.row(evt);
            this.onRowDblClick(row);
        },
        /**
        * Resize the grid by providing afresh height and margins to header and scroller-box
        */
        resize: function () {
            this._grid.resize();
        },
        /**
        * Refresh the grid. Rebinds the grid to the data store.
        */
        refresh: function () {
            console.log('Refresh grid');
            this._grid.refresh();
        },
        /**
        * Revert any changes made on editors within the grid. This avoids grid data rebind from store as done by #refresh
        */
        revert: function () {
            this._grid.revert();
        },
        /**
        * Saves data changed on the grid by pushing only modified row data to the store.
        * @returns promise
        */
        save: function () {
            return this._grid.save();
        },
        /**
        * Clears any row selections made by mouse
        */
        clearSelection: function () {
            this._grid.clearSelection();
        },
        /**
        * Sets the sorting properties for the grid. This will make a call to the store and rebind data on grid.
        * @param {object} sortColumn
        * @param {boolean} descending
        */
        setSort: function (sortColumn, descending) {
            console.log("SetSort called %o, %o", sortColumn, descending);
            this._grid.set("sort", sortColumn, descending);
        },
        /**
        * Provide a store to grid. This will make a call to the store and rebind data on grid.
        * @param {object} store
        * @param {object} query
        * @param {object} queryOptions
        */
        setStore: function (store, query, queryOptions) {
            console.log("SetStore called");
            this.store = store;
            this.query = query;
            this.queryOptions = queryOptions;
            this._grid.set("store", this.store, this.query, this.queryOptions);
        },
        /**
        * Provides a new array columns to the grid. This will make a call to the store and rebind data on grid.
        * @param {array} columns array
        */
        setColumns: function (columns) {
            console.log("SetColumns called");
            var tmpCols = columns;
            this._applyFormatterForLegacyColumns(columns);
            if (this.indirectSelection === true) {
                tmpCols = this._addSelectorColumnToColumns(columns);
            }
            this.columns = tmpCols;
            if (this.setUserPreferences !== false) {
                this._loadUserPrefrences();
            }
            this._grid.set("columns", this.columns);
        },
        /**
        * Change selection mode on grid.
        * @param {string} selectionMode single/extended/multiple
        */
        setSelectionMode: function (selectionMode) {
            this._grid.set("selectionMode", selectionMode);
            console.log("SetSelectionMode called");
        },
        /**
        * Allow hiding on grid header
        * @param {boolean} isVisible boolean
        */
        setHeaderVisibility: function (isVisible) {
            this._grid.set("showHeader", isVisible);
        },
        /**
        * Retrieve data of selected row
        * @param {object} fields
        * @returns data array
        */
        getSelectedRowData: function (fields) {
            var selectedItems = [];
            if (fields && fields.length > 0) {
                for (var id in this._grid.selection) {
                    var result = {};
                    array.forEach(fields, lang.hitch(this, function (fieldName) {
                        result[fieldName] = this._grid.row(id).data[fieldName];
                    }));
                    selectedItems.push(result);
                }
            } else {
                for (var item in this._grid.selection) {
                    selectedItems.push(this._grid.row(item).data);
                }
            }
            return selectedItems;
        },
        /**
        * Retrieve row idProperty of selected row
        * @returns idProperty
        */
        getSelectedRowId: function () {
            for (var id in this._grid.selection) {
                if (this._grid.selection[id]) {
                    return id;
                }
            }
            return null;
        },
        /**
        * Sets the width of a given column to the given width.
        * @param {object} Column representation from structure object.
        * @param {int} Width to set column to (in pixels).
        */
        setColumnWidth: function (colObj, width) {
            if (this.columnResizing === true) {
                this._grid.resizeColumnWidth(colObj["id"], width);
            }
            else {
                console.warn("Column resizing is not enabled for this grid.");
            }
        },
        /**
        * Set filter on store to retrieve subset of data
        * @param {object} query may also be a string
        */
        setFilter: function (query) {
            this.query = query;
            this.setStore(this.store, query, this.queryOptions);
        },
        /**
        *
        *  @param {function} fn function
        */
        setRowRenderFunction: function (fn) {
            if (fn) {
                this._grid.renderRow = fn;
            }
            else if (this._oldRenderRow) {
                this._grid.renderRow = this._oldRenderRow;
            }
        },
        /**
         * Remove specified row from grid
         * @param {object} object grid row data)
         */
        removeRow: function (object) {
            if (this.store.data) {
                this.store.data.remove(object);
            } else {
                this.store.remove(object["$key"], this.store);
            }
            this.refresh();
        },
        /**
        * Re-render a specified grid row object
        * @param {object} rowObj grid row data
        */
        reRenderRow: function (rowObj) {
            return this._grid.renderRow(rowObj);
        },
        /**
         * Add a single row item to grid
         * @param {object} object grid row data
         */
        addItem: function (object) {
            this._grid.store.add(object);
        },
        /**
         * Toggles state of preview rows
         */
        togglePreviewRows: function () {
            this.togglePreRowsFlag = !this.togglePreRowsFlag;
            this.saveToLocalStorage(this.STORE_KEY_TOGGLEPREVIEW + this.id, this.togglePreRowsFlag, this.STORE_NS);
            var rows = this._grid.domNode.getElementsByClassName('dgrid-row');
            for (var i = 0; i < rows.length; i++) {
                // toggle state of node which was clicked
                put(rows[i], (this.togglePreRowsFlag ? "!" : ".") + "collapsed");
            }
        },
        _setToggleForPreviewRows: function () {
            var flag = this.getFromLocalStorage(this.STORE_KEY_TOGGLEPREVIEW + this.id, this.STORE_NS);
            if (flag !== null) {
                this.togglePreRowsFlag = flag;
            }
        },
        /**
         * Handles more click event on preview row
         * @param {event} grid row click evt
         * @param {object} row object
         *
         * @event
         */
        _moreClick: function (evt, row) {
            if (evt.target.className.indexOf('morelink') !== -1) {
                if (evt.target.className.indexOf('less') !== -1) {
                    // on show less click - contains full message - hide it
                    domClass.add(evt.target.parentNode.parentNode.children[1], 'display-none');
                    domClass.remove(evt.target.parentNode.parentNode.children[0], 'display-none');

                    var revertHide = evt.target.parentNode.getElementsByClassName('display');
                    for (var i = 0; i < revertHide.length; i++) {
                        domClass.add(revertHide[i], 'display-none');
                    }

                } else if (evt.target.className.indexOf('full') === -1) {
                    // does not contain full message - fetch and show next block of 255 chars
                    if (this.fullNoteField) {
                        this.store.select.push(this.fullNoteField);
                    }
                    var record = this.store.query("id eq '" + row.id + "'", null);
                    record.then(lang.hitch(this, function (record) {
                        var finalarray = [];
                        var incrementalDisplay = '</span><span class="display-none">';

                        // break long note into equal sized string array
                        var noteField = this.fullNoteField ? this.fullNoteField : this.previewField;
                        var fullNoteFieldText = (noteField.indexOf('.') !== -1) ? Utility.splitField(record[0], noteField) : record[0][noteField];
                        var splitText = fullNoteFieldText.match(/[\S\s]{1,255}/g);

                        finalarray.push(Utility.htmlEncode(splitText[0]).replace(/(?:\r\n|\r|\n)/g, '<br />'));
                        finalarray.push('</span><span class="display">');

                        for (var i = 1; i < splitText.length; i++) {
                            // if this is done before for loop, we will end up with unequal lengths of strings
                            finalarray.push(Utility.htmlEncode(splitText[i]).replace(/(?:\r\n|\r|\n)/g, '<br />'));
                            // push to array
                            if (i !== splitText.length - 1) {
                                finalarray.push(incrementalDisplay);
                            }
                        }
                        finalarray.push('</span> <br />');

                        // don't show more link if no extra data is available
                        if (splitText.length > 2) {
                            finalarray.push('<a href="#" class="morelink more full">' + this.showMore + '</a>');
                        }
                        finalarray.push('<a href="#" class="morelink less full">' + this.showLess + '</a>');

                        var displayText = finalarray.join('');
                        put(evt.target.parentNode.parentNode, 'div.moreView', { innerHTML: displayText });

                        // hide preview div and remove show more
                        domClass.add(evt.target.parentNode, 'display-none');

                        // indicate full text is available
                        domClass.add(evt.target, 'full');
                        evt.target.innerHTML = this.showMore;
                    }));
                    evt.target.innerHTML = 'loading...';

                } else {
                    // on click of show more - contains full message - just show it incrementally

                    // ensure preview is hidden
                    domClass.add(evt.target.parentNode.parentNode.children[0], 'display-none');
                    var node = evt.target.parentNode;
                    var targetPreviewNode = (node.className.indexOf('preview') !== -1);

                    // reset full mode view
                    if (targetPreviewNode) {
                        node = evt.target.parentNode.parentNode.children[1];
                        domClass.remove(node, 'display-none');

                        // check if show more was made visible - happens in case of span = 2
                        if (node.getElementsByClassName('more').length > 0) {
                            domClass.remove(node.getElementsByClassName('more')[0], 'display-none');
                        }
                    }

                    var moreSections = node.getElementsByClassName('display-none');
                    // display next section of notes
                    if (moreSections.length > 0) {
                        if (moreSections.length === 1 && !targetPreviewNode) {
                            // hide more link if no more data is available
                            domClass.add(evt.target, 'display-none');
                        }
                        domClass.add(moreSections[0], 'display');
                        domClass.remove(moreSections[0], 'display-none');
                    }
                }
            }
        }
    });
    return widget;
});
