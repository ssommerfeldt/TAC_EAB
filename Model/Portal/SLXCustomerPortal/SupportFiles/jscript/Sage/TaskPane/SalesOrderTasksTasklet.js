/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/SalesOrderTasksTasklet", [
    'dojo/_base/lang',
    'dojo/i18n!./nls/SalesOrderTasksTasklet',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/TaskPane/TaskPaneContent',
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Utility',
    'Sage/Data/SDataServiceRegistry',
    'Sage/MainView/IntegrationContract/PromoteWidget',
    'Sage/UI/Dialogs',
    'Sage/Utility/PricingAndAvailability',
    'Sage/MainView/IntegrationContract/PricingAvailabilityWidget'
],
function (lang, i18nStrings, _BaseTaskPaneTasklet, TaskPaneContent, declare, dString, utility, sDataServiceRegistry, PromoteWidget, dialogs, pricingAndAvailability, PricingAvailabilityWidget) {
    var salesOrderTasksTasklet = declare('Sage.TaskPane.SalesOrderTasksTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {
        taskItems: [],
        constructor: function () {
            lang.mixin(this, i18nStrings);
            /* jshint ignore:start */
			this.taskItems = [
                    {
                        taskId: 'promoteSalesOrder',
                        type: "Link",
                        displayName: this.promoteTitle,
                        clientAction: "salesOrderTasksActions.validateCanPromote()",
                        securedAction: 'Entities/SalesOrder/Promote'
                    }
			];
           if (!Sage.Services.hasService('IntegrationContractService')){ 
				Sage.Services.addService('IntegrationContractService', new Sage.IntegrationContractService());
			}
			var service = Sage.Services.getService('IntegrationContractService');
            if (service.isBackOfficeIntegrationEnabled && !service.isSalesOrderCRMPricingEnabled) {
				this.taskItems.push({
                        taskId: 'getOrderTotal',
                        type: "Link",
                        displayName: this.getOrderTotalTitle,
                        clientAction: "salesOrderTasksActions.validateOrderTotal()",
                        securedAction: 'Entities/SalesOrder/GetOrderTotal'
                    },
                    {
                        taskId: 'priceLineItems',
                        type: "Link",
                        displayName: this.rePriceOrder,
                        clientAction: "salesOrderTasksActions.ValidatePriceItems()",
                        securedAction: 'Entities/SalesOrder/RePriceOrder'
                    });                
            }

            this.taskItems.push(
                {
                    taskId: 'RequestWorkflow',
                    type: "Link",
                    displayName: this.requestIONWFSalesOrder,
                    clientAction: "salesOrderTasksActions.initiateIONWFSalesOrder()",
                    securedAction: 'Entities/SalesOrder/InitiateWorkflow'
                },
                {
                    taskId: 'cancelIONWorkflow',
                    type: "Link",
                    displayName: this.cancelIONWorkFlowItems,
                    clientAction: "salesOrderTasksActions.CancelIONWorkflow()",
                    securedAction: 'Entities/SalesOrder/CancelIONWorkflow'
                }
            );
            /* jshint ignore:end */
        },
		initiateIONWFSalesOrder: function () {
            var currentEntityId = this._getSelectRecordId();
            if (!currentEntityId) return;
            var service = Sage.Services.getService('IntegrationContractService');

            if (!service.isWorkflowIntegrationEnabled) {
                dialogs.showError(this.workflowIntegrationNotEnabled);
                return false;
            }
            var requestWorkflowLog = this.requestWorkflowLog;
            var requestWorkflowSuccess = this.requestWorkflowSuccess;
            var errorRequestWorkflow = this.errorRequestWorkflow;
            var entityName = Sage.Utility.getCurrentEntityName();
            var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("salesOrders");
            request.setOperationName("ManualWorkflowForSales");
            var entry = {
                "$name": "ManualWorkflowForSales",
                "request": {
                    "SalesOrderId": currentEntityId
                }
            };

            request.execute(entry, {
                async: false,
                success: function (result) {
                    if (result.response.Result)
                        dialogs.showInfo(requestWorkflowSuccess);
                    else
                        dialogs.showError(dString.substitute(requestWorkflowLog, [entityName, result]));
                },
                failure: function (result) {
                    dialogs.showError(dString.substitute(errorRequestWorkflow, [entityName, result]));
                }
            });
		},
        CancelIONWorkflow: function () {
            var currentEntityId = this._getSelectRecordId();
            if (!currentEntityId) return;
            var service = Sage.Services.getService('IntegrationContractService');

            if (!service.isWorkflowIntegrationEnabled) {
                dialogs.showError(this.workflowIntegrationNotEnabled);
                return false;
            }
            var cancelWorkflowLog = this.cancelWorkflowLog;
            var cancelWorkflowSuccess = this.cancelWorkflowSuccess;
            var errorCancelWorkflow = this.errorCancelWorkflow;
            var entityName = Sage.Utility.getCurrentEntityName();
            var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("salesOrders");
            request.setOperationName("CancelManualWorkflowForSales");
            var entry = {
                "$name": "CancelManualWorkflowForSales",
                "request": {
                    "SalesOrderId": currentEntityId
                }
            };

            request.execute(entry, {
                async: false,
                success: function (result) {
                    if (result.response.Result)
                        dialogs.showInfo(cancelWorkflowSuccess);
                    else
                        dialogs.showError(dString.substitute(cancelWorkflowLog, [entityName, result]));

                },
                failure: function (result) {
                    dialogs.showError(dString.substitute(errorCancelWorkflow, [entityName, result]));
                }
            });
        },
        validateCanPromote: function () {
            var currentEntityId = this._getSelectRecordId();
            if (!currentEntityId) return;
            var service = Sage.Services.getService('IntegrationContractService');

            if (!service.isBackOfficeIntegrationEnabled) {
                dialogs.showError(this.integrationNotEnabled);
                return false;
            }
            var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("salesOrders");
            request.setOperationName("CanPromoteSalesOrder");
            var entry = {
                "$name": "CanPromoteSalesOrder",
                "request": {
                    "SalesOrderId": currentEntityId
                }
            };
            request.execute(entry, {
                success: lang.hitch(this, function () {
                    this._promoteSalesOrder(currentEntityId);
                })
            });
        },
        _promoteSalesOrder: function (currentEntityId) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("salesOrders");
            request.setQueryArg('select', 'ErpLogicalId,ErpAccountingEntityId');
            request.setQueryArg('where', dString.substitute("Id eq '${0}'", [currentEntityId]));
            request.read({
                success: function (result) {
                    var promoteDialog = dijit.byId("dlgPromoteWidget");
                    var options = {
                        entityPrettyName: this.currentEntityDisplayName,
                        entityName: this.currentEntityPrettyName,
                        entityId: currentEntityId,
                        logicalId: result.ErpLogicalId,
                        accountingEntityId: result.ErpAccountingEntityId,
                        entityDisplayValue: result.$descriptor
                    };
                    if (!promoteDialog) {
                        promoteDialog = new PromoteWidget(options);
                    }
                    if (result.ErpLogicalId && result.ErpAccountingEntityId) {
                        promoteDialog.initialize(options);
                        promoteDialog.promoteEntity(result.ErpLogicalId, result.ErpAccountingEntityId);
                    } else {
                        promoteDialog.show(options);
                    }
                },
                scope: this,
                failure: function () { }
            });
        },
        validateOrderTotal: function () {
			dojo.style("loader", "display", "block");
			dojo.style("loader", "opacity", "0.75");
            var currentEntityId = this._getSelectRecordId();
            if (!currentEntityId) return;
            var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("salesOrders");
            request.setOperationName("validateOrderTotal");
            var entry = {
                "$name": "validateOrderTotal",
                "request": {
                    "SalesOrderId": currentEntityId
                }
            };
            request.execute(entry, {
                success: lang.hitch(this, function () {
                    this._orderTotalSalesOrder(currentEntityId);
                }),
				failure: function () {
                    dojo.style("loader", "display", "none");
					dojo.style("loader", "opacity", "0");
                }
            });
        },
		ValidatePriceItems: function () {
			dojo.style("loader", "display", "block");
			dojo.style("loader", "opacity", "0.75");
            var currentEntityId = this._getSelectRecordId();
            if (!currentEntityId) return;
            var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("salesOrders");
            request.setOperationName("ValidatePriceItems");
            var entry = {
                "$name": "ValidatePriceItems",
                "request": {
                    "SalesOrderId": currentEntityId
                }
            };
            request.execute(entry, {
                success: lang.hitch(this, function () {
                    this._priceItems();
                }),
				failure: function () {
                    dojo.style("loader", "display", "none");
					dojo.style("loader", "opacity", "0");
                }
            });
        },
        _priceItems: function () {
            var currentEntityId = this._getSelectRecordId();
            var error = this.error_PricingRequest;
            if (!currentEntityId) return;
            var pricingOptions = {
                resourceKind: 'salesOrders',
                operationName: 'RePriceOrder',
                callback: function (pricingResponse) {
                    if (pricingResponse) {
                        var request = pricingResponse.Children[0];
                        if (request) {
                            var errorProp = request.Properties['messageText'];
                            var errorCode = request.Properties['ErrorCode'];
                            var errorDescription = request.Properties['ErrorDescription'];
                            var erromessage = errorProp ? errorProp : errorCode ? errorDescription : 'Unknown Error';
							dojo.style("loader", "display", "none");
							dojo.style("loader", "opacity", "0");
                            if (errorProp || errorCode) {
                                dialogs.showError(dString.substitute(error, [erromessage]));
                            } else {
                                window.location.href = dString.substitute("SalesOrder.aspx?entityId=${0}", [currentEntityId]);
                            }
                        }
                    }
                },
                requestOptions: {
                    childEntityName: 'Product',
                    itemEntityName: 'SalesOrderItem',
                    entityName: 'SalesOrder',
                    entityId: currentEntityId,
                    serviceName: 'OrderLineTotal',
                    secondaryServiceName: 'OrderTotal',
					AutoSave:true
                },
				isSpinnerHide:'T'
            };
            pricingAndAvailability.requestPricingAvailability(pricingOptions);
        },
        _getSelectRecordId: function () {
            this.getCurrentEntity();
            var currentEntityId;
            if (utility.getModeId() === 'detail') {
                currentEntityId = this.currentEntityId;
            } else {
                var selectionInfo = this.getSelectionInfo();
                if (this.verifySingleSelection(selectionInfo)) {
                    currentEntityId = selectionInfo.selectedIds[0];
                } else {
                    dialogs.showInfo(this.selectSingleRecord, this.invalidSelectionTitle);
                    return false;
                }
            }
            return currentEntityId;
        },
        _orderTotalSalesOrder: function (currentEntityId) {
            var error = this.error_PricingRequest;
            var pricingOptions = {
                resourceKind: 'salesOrders',
                operationName: 'PriceOrderHeader',
                callback: function (pricingResponse) {
                    if (pricingResponse) {
                        var request = pricingResponse.Children[0];
                        var errorProp = request.Properties['messageText'];
                        var errorCode = request.Properties['ErrorCode'];
                        var errorDescription = request.Properties['ErrorDescription'];
                        var erromessage = errorProp ? errorProp : errorCode ? errorDescription : 'Unknown Error';
						dojo.style("loader", "display", "none");
						dojo.style("loader", "opacity", "0");
                        if (errorProp || errorCode) {
                            dialogs.showError(dString.substitute(error, [erromessage]));
                        } else {
                            window.location.href = dString.substitute("SalesOrder.aspx?entityId=${0}", [currentEntityId]);
                        }
                    }
                    else {
                        window.location.href = dString.substitute("SalesOrder.aspx?entityId=${0}", [currentEntityId]);
                    }
                },
                requestOptions: {
                    childEntityName: 'SalesOrderItem',
                    entityName: 'SalesOrder',
                    entityId: currentEntityId,
                    serviceName: 'OrderTotal',
					AutoSave:true
                },
				isSpinnerHide:'T'
            };
            pricingAndAvailability.requestPricingAvailability(pricingOptions);
        }
    });
    return salesOrderTasksTasklet;
});