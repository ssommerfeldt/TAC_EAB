require({cache:{
'url:Sage/MainView/EntityMgr/AddEditEntityDetail/templates/RangeDetailsView.html':"[\r\n'<div>',\r\n     '<div data-dojo-attach-point=\"characterContainer\" >',\r\n     '</div>',\t\r\n     '<table  class=\"detailTableContainer HundredPercentWidth\">',\r\n        '<tr>',\r\n            '<td class=\"FManagerDialogFieldLabel\">',\r\n                '<div style=\"padding:0 !important;\" class=\"lbl alignright\">',\r\n                    '<label  data-dojo-attach-point=\"rangeGridLabel\">',\r\n                    '</label>',\r\n                '</div>',\r\n                 '<div class=\"fld  dijitInline\">&nbsp</div>',\r\n            '</td>',\r\n        '</tr>',\r\n        '<tr>',\r\n            '<td class=\"FManagerDialogFieldLabel\">',\r\n                '<div style=\"padding:0 !important;\" class=\"lbl alignright dijitInline\">&nbsp</div>',\r\n                '<div class=\"fld dijitInline\" data-dojo-attach-point=\"rangegridwhole\"></div>',\r\n            '</td>',\r\n        '</tr>',\r\n    '</table>',\r\n'</div>'\r\n]\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/AddEditEntityDetail/RangeDetailsView", [
    'dojo/_base/declare',
    'dojo/store/Memory',
    'dojo/text!./templates/RangeDetailsView.html',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/_DetailsAddEditDialogBase',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/DistinctDetailsView',
    'Sage/UI/GridView',
    'Sage/UI/Controls/TextBox',
    'Sage/Utility'
],
function (
    declare,
    Memory,
    template,
    _DetailsAddEditDialogBase,
    distinct,
    GridView,
    crmTextBox,
    utility
) {
    var widget = declare('Sage.MainView.EntityMgr.AddEditEntityDetail.RangeDetailsView', [_DetailsAddEditDialogBase], {

        widgetTemplate: new Simplate(eval(template)),
        widgetsInTemplate: true,

        character: false,
        rangeGridsObj: false,

        lastSelectedRange: false,

        addBtnId: 'rangeGrid_addBtn',
        rmvBtnId: 'rangeGrid_removeBtn',
        gridId: 'RangeDetailsView_grid',

        tmpRwId: 0,

        constructor: function (obj) {
            this.hasProperties = true;
            this.isMetric = false;
            if (this.Registry.byId(this.addBtnId)) {
                this.Registry.byId(this.addBtnId).destroy();
            }
            if (this.Registry.byId(this.rmvBtnId)) {
                this.Registry.byId(this.rmvBtnId).destroy();
            }
            if (this.Registry.byId(this.gridId)) {
                this.Registry.byId(this.gridId).destroy();
            }
        },

        postCreate: function () {
            this._createCharacter();
            this._createRangeGrid();

            this.startup();
        },
        _addItemToGrid: function (context) {

            context.rangeGridsObj.grid.addItem(
                {
                    rangeId: context.tmpRwId,
                    rangeName: '',
                    upper: '',
                    lower: '',
                    displayName: null,
                    customSQL: null
                });
            context.tmpRwId++;
            context.rangeGridsObj.refresh();
        },
        _removeItemFromGrid: function (context) {
            var selectedItemArr = context.rangeGridsObj.getSelectedRowData();
            var noItemsSelected = typeof (selectedItemArr) === "undefined" || selectedItemArr === null || selectedItemArr.length === 0;
            var keyVariable = this.store.idProperty;
            if (noItemsSelected) {
                context.Dialog.showWarning(context._nlsResources.SelectAnItem, "Infor CRM");
                return;
            }
            var somethingRemoved = false;
            for (var i = 0; i < selectedItemArr.length; i++) {
                var container = selectedItemArr[i];
                var deleted = false;
                var id = container[keyVariable];
                var count = this.store.data.length;
                if (typeof (id) !== 'undefined') {
                    this.store.remove(id);
                    if (count > this.store.data.length) {
                        somethingRemoved = true;
                        console.log(context.DojoString.substitute('${0}: was removed', [id]));
                        i--;//reset to the previous index sinve we are removing an item
                        deleted = true;
                    }
                }
                id = container.id;
                count = this.store.data.length;
                if (typeof (id) !== 'undefined') {
                    this.store.remove(id);
                    if (count > this.store.data.length) {
                        somethingRemoved = true;
                        console.log(context.DojoString.substitute('${0}: was removed', [id]));
                        i--;//reset to the previous index sinve we are removing an item
                        deleted = true;
                    }
                }
            }
            if (somethingRemoved) {
                this.grid.refresh();
            }
            else {
                context.Dialog.showWarning(context._nlsResources.SelectAnItem, "Infor CRM");
            }
        },
        _createRangeGrid: function () {
            var dataStore = new Memory({ data: [] });
            if (this.details && this.details.rangeFilter && this.details.rangeFilter.ranges) {
                dataStore = Memory({ idProperty: 'rangeId', data: this.details.rangeFilter.ranges });
            }

            var columns = this.detailUtility.rangeFilterGridCol.data.sort(function (a, b) {
                var nameA = a['id'],
                    nameB = b['id'];

                return (nameA < nameB)
                    ? -1
                    : (nameA > nameB)
                        ? 1
                        : 0;
            });

            var grid = this.rangeGridsObj = new GridView({
                tools: ['add', 'delete'],
                store: dataStore,
                columns: columns,
                addNew: this.Lang.partial(this._addItemToGrid, this), // set the add item function
                deleteSelected: this.Lang.partial(this._removeItemFromGrid, this), // set the remove item function
                placeHolder: this.rangegridwhole,
                columnHiding: true,
                columnResizing: true,
                columnReordering: true,
                selectionMode: 'single',
                rowSelection: true,
                minRowsPerPage: dataStore.data.length,
                maxRowsPerPage: dataStore.data.length,
                id: this.gridI,
                shouldPublishMarkDirty: false
            });
            grid.createGridView();
            grid.innerHTML = this._nlsResources.lblRange;

            // make sure that the grid shows a horizontal scrollbar if all column cannot be displayed.
            grid.grid.onLoadComplete = function () {
                grid.grid.resize();
            };
        },
        _createCharacter: function () {
            this.character = new distinct(
            {
                embedded: true,
                isMetric: false,
                hasProperty: this.hasProperty,
                details: this.details,
                detailUtility: this.detailUtility
            });
            this.DomConstruct.place(this.character.domNode, this.characterContainer, 'only');
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            this.inherited(arguments);
        },
        getDetails: function () {
            var rangeFilter = {
                rangeFilter: {
                    characters: this.character.getDetails(true),
                    ranges: []
                }
            };
            var store = this.rangeGridsObj.store.data;
            for (var i = 0; i < store.length; i++) {
                var range = {
                    range: store[i]
                };
                range.range.rangeId = this._stripoutNonRangeIds(range);
                if (range.range.rangeId === "") {
                    delete range.range.rangeId;
                }
                if (range.range.displayName === null) {
                    delete range.range.displayName;
                }
                if (range.range.upper === null) {
                    delete range.range.upper;
                }
                if (range.range.lower === null) {
                    delete range.range.lower;
                }
                if (range.range.rangeName === null) {
                    delete range.range.rangeName;
                }
                if (range.range.customSQL === null) {
                    delete range.range.customSQL;
                }
                rangeFilter.rangeFilter.ranges.push(range.range);
            }

            return rangeFilter;
        },
        _stripoutNonRangeIds: function (obj) {
            // an id in this instance is 5 "chunks" of alphanumerics separated by a hyphen/dash.
            var idRegex = "[A-Z|0-9|a-z]+[-][A-Z|0-9|a-z]+[-][A-Z|0-9|a-z]+[-][A-Z|0-9|a-z]+[-][A-Z|0-9|a-z]+";
            var matches = idRegex.match(obj.range.rangeId, 'g');
            if (matches) {
                if (this.Lang.isArray(matches)) {
                    if (matches[0].length == obj.range.rangeId.length) {
                        return obj.range.rangeId;
                    }
                }
            }
            return "";
        },
        isValid: function () {
            var list = this.Query("td.dgrid-cell.dgrid-cell-padding.dgrid-column-AArangeName", this.rangeGridsObj.grid.bodyNode);
            var Lowerlist = this.Query("td.dgrid-cell.dgrid-cell-padding.dgrid-column-lower", this.rangeGridsObj.grid.bodyNode);
            var Upperlist = this.Query("td.dgrid-cell.dgrid-cell-padding.dgrid-column-upper", this.rangeGridsObj.grid.bodyNode);

            var subSection = this.character.isValid();

            var bool = true;
            for (var i = 0; i < list.length; i++) {
                list[i].widget.isValid(true);
                list[i].widget.onChanged();

                var validWid = list[i].widget.state !== 'Error' && !(list[i].widget.state === 'Incomplete' && list[i].widget.required);

                if (!validWid) {
                    list[i].widget.set('state', 'Error');
                }

                var lowerVal = Lowerlist[i].widget.value;
                var upperVal = Upperlist[i].widget.value;

                if (!isNaN(lowerVal) &&
                    !isNaN(upperVal)) {
                    if (lowerVal > upperVal) {
                        this._setErrorStateWithMsg(Lowerlist[i].widget,
                            this._nlsResources.LowerMustBeLessThanUpper,
                            'Error');
                        this._setErrorStateWithMsg(Upperlist[i].widget,
                            this._nlsResources.LowerMustBeLessThanUpper,
                            'Error');
                        validWid = false;
                    }
                } else {
                    // Special Date Placeholders
                    if (lowerVal.startsWith(':') && !utility.specialDates.hasOwnProperty(lowerVal)) {
                        this._setErrorStateWithMsg(Upperlist[i].widget,
                            this._nlsResources.InvalidSpecialDateValue,
                            'Error');
                        validWid = false;
                    }
                    if (upperVal.startsWith(':') && !utility.specialDates.hasOwnProperty(upperVal)) {
                        this._setErrorStateWithMsg(Upperlist[i].widget,
                            this._nlsResources.InvalidSpecialDateValue,
                            'Error');
                        validWid = false;
                    }
					
					var d1;
					var d2;
					var loVal;
					var hiVal;

                    // Compare
                    if (validWid) {
                        if (lowerVal.startsWith(':') && upperVal.startsWith(':')) {
                            // Both are placeholders
                            d1 = utility.specialDates[lowerVal](new Date());
                            d2 = utility.specialDates[upperVal](new Date());
                            if (d1 > d2) {
                                this._setErrorStateWithMsg(Lowerlist[i].widget,
                                    this._nlsResources.LowerMustBeLessThanUpper,
                                    'Error');
                                this._setErrorStateWithMsg(Upperlist[i].widget,
                                    this._nlsResources.LowerMustBeLessThanUpper,
                                    'Error');
                                validWid = false;
                            }
                        } else if (lowerVal.startsWith(':') && !isNaN(upperVal)) {
                            // Lower is placeholder upper is date value
                            d1 = utility.specialDates[lowerVal](new Date());
                            loVal = parseInt('' +
                                d1.getFullYear() +
                                ('0' + (d1.getMonth() + 1)).slice(-2) +
                                ('0' + d1.getDate()).slice(-2), 10);
                            hiVal = parseInt(upperVal, 10);
                            if (loVal > hiVal) {
                                this._setErrorStateWithMsg(Lowerlist[i].widget,
                                    this._nlsResources.LowerMustBeLessThanUpper,
                                    'Error');
                                this._setErrorStateWithMsg(Upperlist[i].widget,
                                    this._nlsResources.LowerMustBeLessThanUpper,
                                    'Error');
                                validWid = false;
                            }
                        } else if (upperVal.startsWith(':') && !isNaN(lowerVal)) {
                            // Upper is placeholder lower is date value
                            d1 = utility.specialDates[upperVal](new Date());
                            hiVal = parseInt('' +
                                d1.getFullYear() +
                                ('0' + (d1.getMonth() + 1)).slice(-2) +
                                ('0' + d1.getDate()).slice(-2), 10);
                            loVal = parseInt(lowerVal, 10);
                            if (loVal > hiVal) {
                                this._setErrorStateWithMsg(Lowerlist[i].widget,
                                    this._nlsResources.LowerMustBeLessThanUpper,
                                    'Error');
                                this._setErrorStateWithMsg(Upperlist[i].widget,
                                    this._nlsResources.LowerMustBeLessThanUpper,
                                    'Error');
                                validWid = false;
                            }
                        } else if (lowerVal > upperVal) {
                            this._setErrorStateWithMsg(Lowerlist[i].widget,
                                this._nlsResources.LowerMustBeLessThanUpper,
                                'Error');
                            this._setErrorStateWithMsg(Upperlist[i].widget,
                                this._nlsResources.LowerMustBeLessThanUpper,
                                'Error');
                            validWid = false;
                        }
                    }
                }

                bool = bool && validWid;
            }
            return bool && subSection;
        },
        _setErrorStateWithMsg: function (obj, msg, state) {
            if (!obj || typeof(obj.set) !== 'function') return;
            if (msg) {
                obj.set('message', msg);
            }
            if (state) {
                obj.set('state', state);
            }
        }
    });
    return widget;
});