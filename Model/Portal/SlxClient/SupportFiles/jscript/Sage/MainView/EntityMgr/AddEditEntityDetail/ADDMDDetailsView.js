require({cache:{
'url:Sage/MainView/EntityMgr/AddEditEntityDetail/templates/ADDMDDetailsView.html':"[\r\n'<div>',    \r\n    '<div data-dojo-attach-point=\"aggregate\">',\r\n    '</div>',\t\t\r\n    '<table class=\"detailTableContainer HundredPercentWidth\">',\r\n        '<tr data-dojo-attach-point=\"_MetricsFromSection\">',\r\n            '<td class=\"FManagerDialogFieldLabel\">',\r\n    \t\t    '<div style=\"padding:0 !important;\" class=\"lbl alignright\">',\r\n                    '<label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblMetricRangeFrom\">',\r\n                    '</label>',\r\n\t\t\t    '</div>',\r\n                 '<div data-dojo-attach-point=\"fieldsContainerFrom\"></div>',\r\n            '</td>',\r\n        '</tr>',\r\n        '<tr data-dojo-attach-point=\"_MetricsToSection\">',\r\n            '<td class=\"FManagerDialogFieldLabel\">',\r\n\t\t\t\t'<div style=\"padding:0 !important;\" class=\"lbl alignright\">',\r\n                    '<label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblMetricRangeTo\">',\r\n                    '</label>',\r\n\t\t\t    '</div>',\r\n                 '<div data-dojo-attach-point=\"fieldsContainerTo\"></div>',\r\n            '</td>',\r\n        '</tr>',\r\n    '</table>',\r\n'</div>'\r\n]\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/AddEditEntityDetail/ADDMDDetailsView", [
        'dojo/_base/declare',
        'dojo/text!./templates/ADDMDDetailsView.html',
        'Sage/MainView/EntityMgr/AddEditEntityDetail/AMDDetailsView',
        'Sage/MainView/EntityMgr/AddEditEntityDetail/_DetailsAddEditDialogBase',
        'Sage/UI/Controls/PropertyDropDown'
],
    function (
        declare,
        template,
        aggregate,
        _DetailsAddEditDialogBase,
        PropertyDropDown
    ) {
        var widget = declare('Sage.MainView.EntityMgr.AddEditEntityDetail.ADDMDDetailsView', [_DetailsAddEditDialogBase], {
            widgetTemplate: new Simplate(eval(template)),
            widgetsInTemplate: true,

            aggregation: false,
            PropertyTextBoxFrom: null,
            PropertyTextBoxTo: null,

            constructor: function (obj) {
                this.hasProperties = false;
                this.isMetric = true;
                this.entityName = obj.entityName;

            },
            postCreate: function () {

                this._createAggregation();
                this._createFromFS();
                this._createToFS();

                this.startup();
            },
            _createFromFS: function () {
                this.PropertyTextBoxFrom = new PropertyDropDown({ entityName: this.entityName, superType: "DateTime" });
                this.DomConstruct.place(this.PropertyTextBoxFrom.domNode, this.fieldsContainerFrom, 'replace');

                this.lblMetricRangeFrom.innerHTML = this._nlsResources.lblFrom;
                var defFrom = '';
                if (this.details.dateDiffMetricFilter && this.details.dateDiffMetricFilter.fromPropertyName) {
                    defFrom = this.details.dateDiffMetricFilter.fromPropertyName;
                }
                this.PropertyTextBoxFrom.entitySelected.textbox.value = defFrom;
            },
            _createToFS: function () {
                this.PropertyTextBoxTo = new PropertyDropDown({ entityName: this.entityName, superType: "DateTime" });
                this.DomConstruct.place(this.PropertyTextBoxTo.domNode, this.fieldsContainerTo, 'replace');

                this.lblMetricRangeTo.innerHTML = this._nlsResources.lblTo;
                var defTo = '';
                if (this.details.dateDiffMetricFilter && this.details.dateDiffMetricFilter.toPropertyName) {
                    defTo = this.details.dateDiffMetricFilter.toPropertyName;
                }
                this.PropertyTextBoxTo.entitySelected.textbox.value = defTo;
            },
            _createAggregation: function () {
                this.aggregation = new aggregate(
                {
                    embedded: true,
                    isMetric: true,
                    hasProperty: this.hasProperty,
                    details: this.details,
                    detailUtility: this.detailUtility
                });
                this.DomConstruct.place(this.aggregation.domNode, this.aggregate, 'only');
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
                var dateDiffMetricFilter = { dateDiffMetricFilter: { aggregation: this.aggregation.getDetails(true), fromPropertyName: this.PropertyTextBoxFrom.entitySelected.textbox.value, toPropertyName: this.PropertyTextBoxTo.entitySelected.textbox.value } };
                return dateDiffMetricFilter;
            },
            isValid: function () {
                var subSection = this.aggregation.isValid();
                if (subSection === true) {
                    var val = this.PropertyTextBoxFrom.entitySelected.isValid(true);

                    if (this.PropertyTextBoxFrom.entitySelected.textbox.value === ':now') {
                        val = false;
                        this.PropertyTextBoxFrom.entitySelected.set('state', 'Error'); // If the control is not valid, mark  it's state as error.
                    }
                    this.PropertyTextBoxFrom.entitySelected.onChange();

                    val = val && this.PropertyTextBoxTo.entitySelected.isValid(true);
                    if (this.PropertyTextBoxTo.entitySelected.textbox.value === ':now') {
                        val = val && false;
                        this.PropertyTextBoxTo.entitySelected.set('state', 'Error'); // If the control is not valid, mark  it's state as error.
                    }
                    this.PropertyTextBoxTo.entitySelected.onChange();

                    return val;
                } else {
                    return subSection;
                }
            }
        });
        return widget;
    });