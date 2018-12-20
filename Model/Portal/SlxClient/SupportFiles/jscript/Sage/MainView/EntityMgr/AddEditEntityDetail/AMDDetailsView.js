require({cache:{
'url:Sage/MainView/EntityMgr/AddEditEntityDetail/templates/AMDDetailsView.html':"[\r\n'<div>',\r\n    '<table class=\"detailTableContainer  formtable HundredPercentWidth\">',\r\n        '<tr data-dojo-attach-point=\"_filterDetailsSection\">',\r\n            '<td  class=\"FManagerDialogFieldLabel\">',\r\n\t\t\t\t'<div style=\"padding:0 !important;\" class=\"lbl alignright\">',\r\n                        '<label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblEntityFiltersDetailsAggregation\">',\r\n                    '</label>',\r\n\t\t\t    '</div>',\r\n                '<div class=\"fld  dijitInline\" data-dojo-attach-point=\"dpEntityFiltersDetailsAggregation\"></div>',\r\n            '</td>',\r\n        '</tr>',\r\n    '</table>',\r\n'</div>'\r\n]"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/AddEditEntityDetail/AMDDetailsView", [
    'dijit/registry',
    'dojo/_base/declare',
    'dojo/text!./templates/AMDDetailsView.html',
    'dojo/store/Memory',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/_DetailsAddEditDialogBase',
    'Sage/UI/FilteringSelect'
],
function (
    registry,
    declare,
    template,
    memory,
    _DetailsAddEditDialogBase,
    crmDropdown
) {
    var widget = declare('Sage.MainView.EntityMgr.AddEditEntityDetail.AMDDetailsView', [_DetailsAddEditDialogBase], {

        widgetTemplate: new Simplate(eval(template)),
        widgetsInTemplate: true,
        aggregations: null,
        propertyValues: null,
        aggregationDropDown: false,
        _idForAggregtDropDown: 'aggregationDpItems',

        constructor: function (obj) {
            if (!this.embedded) {
                this.hasProperties = true;
                this.isMetric = true;
            }
            if (this.Registry.byId(this._idForAggregtDropDown)) {
                this.destroy(this.Registry.byId(this._idForAggregtDropDown));
            }
        },

        destroy: function (context) {
            context.destroy();
        },

        postCreate: function () {

            this._createAggregateController();

            this.startup();
        },
        _populateDefaultAggregate: function () {
            //insert a characters text box
            var defValue = '';
            if (this.details) {
                if (this.details.metricFilter && this.details.metricFilter.aggregation) { // load to edit an existing metric
                    defValue = this.details.metricFilter.aggregation;
                }
                if (this.details.dateDiffMetricFilter && this.details.dateDiffMetricFilter.aggregation) { // carry over from an edit of a date difference metric
                    defValue = this.details.dateDiffMetricFilter.aggregation;
                }
                if (this.details.aggregation) { // load from within a date difference metric
                    defValue = this.details.aggregation;
                }
            }
            if (this.aggregation) { // load from within a date difference metric
                defValue = this.aggregation;
            }

            var obj = {
                context: this,
                idValue: defValue
            };
            this.DojoConnect.subscribe('Sage/EntityManager/detailUtilityDone', obj, function () {
                // set the item.
                this.Registry.byId(this.context._idForAggregtDropDown).item = this.context.detailUtility.grabItemOfAggregationGivenId(this.idValue);
                // make that item's name value visible.
                this.Registry.byId(this.context._idForAggregtDropDown).focusNode.value = this.Registry.byId(this.context._idForAggregtDropDown).item.name || "";
            });

            // if we are editing, then we have the property control, which has the current property value and a lookup function.
            if (this.editing) {
                var arrProperty = this.details.propertyInfo.propertyLookup(); // use the property lookup function to get a list of appropriate aggregations.

                var ppt = arrProperty[0]; // lookup returns a list incase of duplicates, so just grab first.

                return { value: defValue, aggs: this._setAggregations(ppt.dataType.aggregate) };
            } else {
                return { value: defValue, aggs: this.detailUtility.aggregation };
            }
        },
        _createAggregateController: function () {
            this.lblEntityFiltersDetailsAggregation.innerHTML = this._nlsResources.lblAggregation;

            var val = this._populateDefaultAggregate();

            this.aggregationDropDown = new crmDropdown(
                {
                    id: this._idForAggregtDropDown,
                    name: 'aggregations',
                    value: val.value,
                    store: val.aggs,
                    searchAttr: 'name',
                    fetchProperties: { sort: [{ attribute: "name", descending: false }] }
                }, this._idForAggregtDropDown
                );

            this.DojoConnect.subscribe('Sage/UI/Controls/PropertDropDown', this, function (items) {
                this._setAggregations(items);
            });

            this.DomConstruct.place(this.aggregationDropDown.domNode, this.dpEntityFiltersDetailsAggregation, 'only');
        },

        _setAggregations: function (items) {
            var arrQry = this.detailUtility.aggregation;

            arrQry = arrQry.query(function (item) {

                // two different was to set the aggregations, if items.dataType exits, then the user is editing the drop down.
                if (typeof (items.dataType) !== "undefined" && items.dataType !== null && items.dataType !== "") {
                    return items.dataType.aggregate.indexOf(item.id.toLowerCase()) >= 0;
                }
                else { // the other way is when a user is editing a metric and is called on the intial load.
                    return items.indexOf(item.id.toLowerCase()) >= 0;
                }
            });

            if (this.aggregationDropDown) {
                // user is selecting from the drop down, so add the new list to the existing store.
                this.aggregationDropDown.store = new memory({ data: arrQry });

                // if by chance the aggregation control had a selected item that does not curerntly exist in the store,
                // set to the first item in the store.
                var selectedValid = (this.aggregationDropDown.store.index[this.aggregationDropDown.value] >= 0);
                if (!selectedValid) {
                    this.aggregationDropDown.set('value', this.aggregationDropDown.store.data[0].id);
                }
            }
            else {
                // initial load return the list. control is currently being built.
                return new memory({ data: arrQry });
            }
        },

        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            this.inherited(arguments);
        },
        getDetails: function (JustValue) {

            var aggregateValueToSave = this.aggregationDropDown.displayedValue;
            if (this.aggregationDropDown.item && this.aggregationDropDown.item.id) {
                aggregateValueToSave = this.aggregationDropDown.item.id;
            }


            if (JustValue) {
                return aggregateValueToSave;
            }
            else {
                var metricFilter = { metricFilter: { aggregation: aggregateValueToSave } };
                return metricFilter;
            }
        },
        isValid: function () {
            var val = this.aggregationDropDown.isValid(true);
            if (!val) {
                this.aggregationDropDown.set("state", "Error");
            }
            else {
                this.aggregationDropDown.set("state", "");
            }
            return val;
        }
    });
    return widget;
});