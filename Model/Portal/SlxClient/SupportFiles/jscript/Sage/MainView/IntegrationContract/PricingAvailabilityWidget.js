require({cache:{
'url:Sage/MainView/IntegrationContract/templates/PricingAvailabilityWidget.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"width: 500px\">\r\n        <div data-dojo-type=\"dijit.form.Form\">\r\n            <div data-dojo-attach-point=\"divLoadingMessage\">\r\n                <br />\r\n                <label style=\"padding-left:100px;font-size:16px;font-weight:bold\">{%= Sage.Utility.htmlEncode($.pageLoading_Caption) %}</label>\r\n            </div>\r\n            <div data-dojo-attach-point=\"divErrorMessage\" class=\"display-none\">\r\n                <br />\r\n                <label data-dojo-attach-point=\"lblErrorMessage\" style=\"padding-left:10px;font-size:12px;\"></label>\r\n            </div>\r\n            <div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-attach-point=\"warehouses_Container\"></div>\r\n\r\n            <div align=\"right\" style=\"margin-top:10px\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnOK\" data-dojo-attach-event=\"onClick:_btnOk_OnClick\">{%= Sage.Utility.htmlEncode($.ok_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($.cancel_Caption) %}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/IntegrationContract/PricingAvailabilityWidget", [
    'dijit/_Widget',
    'Sage/_Templated',
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/store/Memory',
    'dojo/text!./templates/PricingAvailabilityWidget.html',
    'dojo/i18n!./nls/PricingAvailabilityWidget',
    'Sage/Utility',
    'Sage/UI/Controls/Grid',
    'Sage/Data/SDataServiceRegistry',
    'Sage/UI/Controls/_DialogHelpIconMixin'
],
function (
    _Widget,
    _Templated,
    declare,
    dString,
    lang,
    domClass,
    memory,
    template,
    nlsResources,
    utility,
    Grid,
    sDataServiceRegistry,
    dialogHelpIconMixin
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var pricingAvailabilityWidget = declare('Sage.MainView.IntegrationContract.PricingAvailabilityWidget', [_Widget, _Templated], {
        id: "dlgPricingAvailabilityWidget",
        widgetTemplate: widgetTemplate,
        widgetsInTemplate: true,
        _helpIconTopic: "",
        warehouseGrid: null,
        constructor: function () {
            lang.mixin(this, nlsResources);
            this.inherited(arguments);
        },
        initialize: function (options) {
            lang.mixin(this, options);
        },
        show: function () {
            this._dialog.titleNode.innerHTML = this.title_Caption;
            domClass.add(this.divErrorMessage, "display-none");
            domClass.remove(this.divLoadingMessage, "display-none");

            this._dialog.show();
            if (this._helpIconTopic) {
                if (!this._dialog.helpIcon) {
                    lang.mixin(this._dialog, new dialogHelpIconMixin());
                    this._dialog.createHelpIconByTopic(this._helpIconTopic);
                }
            }
            if (!this.errorMessage) {
                this._requestWarehouses();
            }
            this.inherited(arguments);
        },
        destroy: function () {
            this.inherited(arguments);
        },
        _requestWarehouses: function () {
			var arrItems = [];
            var errorProp = '';
            var errorCode = '';
            var errorDescription = '';
            var serviceName = '';
            var entityName = Sage.Utility.getCurrentEntityName();

            if (entityName === 'Opportunity') {
                serviceName = 'OpportunityAvailableToPromise';
            }
            else if (entityName === 'Sales Order') {
                serviceName = 'AvailableToPromise';
            }
            else if (entityName === 'Quote') {
                serviceName = 'QuoteAvailableToPromise';
            }
            var pricingOptions = {
                resourceKind: this.resourceKind,
                operationName: 'RequestPricingAvailability',
                callback: lang.hitch(this, function (pricingResponse) {
                    if (pricingResponse) {
                        for (var x = 0; x < pricingResponse.Children.length; x++) {
                            var product = pricingResponse.Children[x];
                            var request = pricingResponse.Children[0];
                            errorProp = request.Properties['messageText'];
                            errorCode = request.Properties['ErrorCode'];
							errorDescription = request.Properties['ErrorDescription'];
							var erromessage = errorProp ? errorProp : errorCode ? errorDescription : 'Unknown Error';
							if ((errorProp == undefined || errorProp == null) && (errorDescription == undefined || errorDescription == null) && errorCode) {
							    erromessage = errorCode;
							}
                            if (errorProp || errorCode) {
                                domClass.add(this.divLoadingMessage, "display-none");
                                domClass.remove(this.divErrorMessage, "display-none");
                                domClass.add(this.btnOK.domNode, "display-none");
                                this.btnCancel.setAttribute('label', this.close_Caption);
                                this.lblErrorMessage.textContent = dString.substitute(this.errorPageLoading_Caption, [erromessage]);
                                return;
                            }
                            var newEntity = {};
                            for (var key in product.Properties) {
                                if (key != 'ProductCode') {
                                    if (key.indexOf('.') > 0 && key.indexOf('ErpExtId') > 0) {
                                        var propname = key.split(".");
                                        var extid = product.Properties[key].split("#");
                                        newEntity[propname[0]] = extid[0];
                                        newEntity[propname[0] + 'ID'] = extid[1];
                                    } else
                                        newEntity[key] = product.Properties[key];
                                }
                            }
                            arrItems.push(newEntity);
                        }
                    }
                    this._loadWarehouseGrid(arrItems);
                }),
                requestOptions: {
                    childEntityName: this.childEntityName,
                    entityName: this.entityName,
                    entityId: this.entityId,
                    serviceName: serviceName,
                    childEntityIds: this.childEntityIds,
                    quantity: this.item.Quantity,
                    unitOfMeasureId: this.item.UnitOfMeasure ? this.item.UnitOfMeasure.$key :'null'
                }
            }
            Sage.Utility.PricingAndAvailability.requestPricingAvailability(pricingOptions);
        },
        _loadWarehouseGrid: function (warehouseData) {
            domClass.remove(this.divLoadingMessage, "display-none");
            domClass.add(this.divErrorMessage, "display-none");
            domClass.remove(this.btnOK.domNode, "display-none");

            if (warehouseData.length <= 0) {
                domClass.add(this.btnOK.domNode, "display-none");
            }

            var grid = new Grid({
                classNames: "dgrid-autoheight dgrid-no-data",
                store: new memory({ data: warehouseData, idProperty: "SlxLocationID" }),
                columns: {
                    ATPDate: this.grdColumn_ATPDate,
                    SlxLocation: this.grdColumn_Warehouse,
                    AvailableQuantity: this.grdColumn_AvailableQty
                },
                loadingMessage: this.gridLoading_Caption,
                noDataMessage: this.gridNoResults_Caption,
                placeHolder: this.warehouses_Container.id,
                columnHiding: true,
                columnResizing: true,
                columnReordering: true,
                selectionMode: 'single',
                rowSelection: true
            });
            grid.resize();
            this.warehouseGrid = grid;
            domClass.add(this.divLoadingMessage, "display-none");
        },
        _btnOk_OnClick: function () {
            if (!this.errorMessage) {
                var serviceName = '';
                var entityName = Sage.Utility.getCurrentEntityName();

                if (entityName === 'Opportunity') {
                    serviceName = 'OpportunityOrderLineTotal';
                }
                else if (entityName === 'Sales Order') {
                    serviceName = 'OrderLineTotal';
                }
                else if (entityName === 'Quote') {
                    serviceName = 'QuoteOrderLineTotal';
                }
                var self = this;
                var options = {
                    gridId: this.gridId,
                    item: this.item,
                    SlxLocationExtID: this.warehouseGrid.selectedItem.SlxLocation,
                    SlxLocationID: this.warehouseGrid.selectedItem.SlxLocationID,
                    ATPDate: this.warehouseGrid.selectedItem.ATPDate,
                    AvailableQuantity: this.warehouseGrid.selectedItem.AvailableQuantity,
                    resourceKind: this.resourceKind,
                    childEntityName: this.childEntityName,
                    serviceName: serviceName,
                    entityName: this.entityName
                }
                Sage.Utility.PricingAndAvailability._updateItemWithSelectedWarehouse(options);
            }
            this._close();
        },
        _btnCancel_OnClick: function () {
            this._close();
        },
        _close: function () {
            if (this.warehouseGrid) {
                this.warehouses_Container.removeChild(this.warehouseGrid);
                this.warehouseGrid.destroy();
            }
            this._dialog.hide();
        }
    });
    return pricingAvailabilityWidget;
});