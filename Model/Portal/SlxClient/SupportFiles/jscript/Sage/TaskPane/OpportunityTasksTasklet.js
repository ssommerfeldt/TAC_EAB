/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/OpportunityTasksTasklet", [
	'dojo/i18n!./nls/OpportunityTasksTasklet',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/TaskPane/TaskPaneContent',
    'Sage/MainView/Opportunity/OpportunityStatistics',
    'dojo/_base/declare',
    'Sage/Utility',
    'dojo/string',
    'Sage/Data/SDataServiceRegistry',
    'Sage/UI/Dialogs'
],
function (i18nStrings, _BaseTaskPaneTasklet, TaskPaneContent, OpportunityStatistics, declare, utility, dString, sDataServiceRegistry, dialogs) {
    var opportunityTasksTasklet = declare('Sage.TaskPane.OpportunityTasksTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {
        taskItems: [],
        constructor: function() {
            dojo.mixin(this, i18nStrings);
            if (utility.getModeId() === 'detail') {
                this.taskItems = [
                    {
                        taskId: 'InsertSalesOrder',
                        type: "Link",
                        displayName: this.addSalesOrder,
                        clientAction: "opportunityTasksActions.createSalesOrderFromOpportunity()",
                        securedAction: 'Entities/SalesOrder/Add'
                    },
                    {
                        taskId: 'InsertQuote',
                        type: "Link",
                        displayName: this.addQuote,
                        clientAction: "opportunityTasksActions.createQuoteFromOpportunity()",
                        securedAction: 'Entities/Quote/Add'
                    },
                    {
                        taskId: 'promoteOpportunity',
                        type: "Link",
                        displayName: this.promoteTitle,
                        clientAction: "opportunityTasksActions.validateCanPromote()",
                        securedAction: 'Entities/Opportunity/Promote'
                    },
					{
						taskId: 'RequestWorkflow',
						type: "Link",
						displayName: this.requestIONWFOpportunity,
						clientAction: "opportunityTasksActions.initiateIONWFOpportunity()",
						securedAction: 'Entities/Opportunity/InitiateWorkflow'
					},
					{
						taskId: 'cancelIONWorkflow',
						type: "Link",
						displayName: this.cancelIONWorkFlowItems,
						clientAction: "opportunityTasksActions.CancelIONWorkflow()",
						securedAction: 'Entities/Opportunity/CancelIONWorkflow'
					}
                ];
				if (!Sage.Services.hasService('IntegrationContractService')) {
					Sage.Services.addService('IntegrationContractService', new Sage.IntegrationContractService());
				}
				var service = Sage.Services.getService('IntegrationContractService');
				if (service.isBackOfficeIntegrationEnabled && !service.isOpportunityCRMPricingEnabled) {
					this.taskItems.push(
					{
						taskId: 'priceLineItems',
						type: "Link",
						displayName: this.rePriceOpportunity,
						clientAction: "opportunityTasksActions.ValidatePriceItems()",
						securedAction: 'Entities/Opportunity/RePriceOpportunity'
					});
				}
            } else {
                this.taskItems = [
                    {
                        taskId: 'OpportunityStatistics',
                        type: "Link",
                        displayName: this.opportunityStatisticsTitle,
                        clientAction: 'opportunityTasksActions.opportunityStatistics();',
                        securedAction: 'Entities/Opportunity/OpportunityStatistics'
                    }
                ];
            }			
        },
		ValidatePriceItems: function () {
            var currentEntityId = utility.getCurrentEntityId();
            if (!currentEntityId) return;
            var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("opportunities");
            request.setOperationName("ValidatePriceItems");
            var entry = {
                "$name": "ValidatePriceItems",
                "request": {
                    "OpportunityId": currentEntityId
                }
            };
            request.execute(entry, {
                success: dojo.hitch(this, function () {
                    this._priceItems();
                }),
                failure: function () {
                    dojo.style("loader", "display", "none");
					dojo.style("loader", "opacity", "0");
                }
            });
        },
		_priceItems: function () {
            var currentEntityId = utility.getCurrentEntityId();
            var error = this.error_PricingRequest;
            if (!currentEntityId) return;
            var pricingOptions = {
                resourceKind: 'opportunities',
                operationName: 'RePriceOpportunity',
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
                            }
                        }
                    }
                },
                requestOptions: {
                    childEntityName: 'Product',
                    itemEntityName: 'OpportunityProduct',
                    entityName: 'Opportunity',
                    entityId: currentEntityId,
                    serviceName: 'OpportunityOrderLineTotal',
                    isGridRefresh:true,
					AutoSave:true
                }
            };
            Sage.Utility.PricingAndAvailability.requestPricingAvailability(pricingOptions);
        },
		initiateIONWFOpportunity: function () {
            var currentEntityId = utility.getCurrentEntityId();
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
            request.setResourceKind("opportunities");
            request.setOperationName("ManualWorkflowForOpportunity");
            var entry = {
                "$name": "ManualWorkflowForOpportunity",
                "request": {
                    "OpportunityId": currentEntityId
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
            var currentEntityId = utility.getCurrentEntityId();
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
            request.setResourceKind("opportunities");
            request.setOperationName("CancelManualWorkflowForOpportunity");
            var entry = {
                "$name": "CancelManualWorkflowForOpportunity",
                "request": {
                    "OpportunityId": currentEntityId
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
            var currentEntityId = utility.getCurrentEntityId();
			this.getCurrentEntity();
            if (!currentEntityId) return;
            var service = Sage.Services.getService('IntegrationContractService');

            if (!service.isBackOfficeIntegrationEnabled) {
                dialogs.showError(this.integrationNotEnabled);
                return false;
            }
            var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("opportunities");
            request.setOperationName("CanPromoteOpportunity");
            var entry = {
                "$name": "CanPromoteOpportunity",
                "request": {
                    "OpportunityId": currentEntityId
                }
            };
            request.execute(entry, {
                success: dojo.hitch(this, function () {
                    this._promoteOpportunity(currentEntityId);
                })
            });
        },
        _promoteOpportunity: function (currentEntityId) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("opportunities");
            request.setQueryArg('select', 'ErpLogicalId,ErpAccountingEntityId');
            request.setQueryArg('where', dString.substitute("Id eq '${0}'", [currentEntityId]));
            request.read({
                success: function (result) {
                    this.promoteEntity(result.ErpLogicalId, result.ErpAccountingEntityId, this.currentEntityPrettyName, currentEntityId, result.$descriptor);
                },
                scope: this,
                failure: function () { }
            });
        },
        promoteEntity: function (logicalId, accountingEntityId, entityName, entityId, Description) {
            var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind('backOffices');
            request.setOperationName('SORPromote');
            var entry = {
                "$name": this.operationName,
                "request": {
                    "entityName": entityName,
                    "entityId": entityId,
                    "logicalId": logicalId,
                    "accountingEntityId": accountingEntityId,
                    "Description": Description
                }
            };
            request.execute(entry, {
                success: dojo.hitch(this, function (data) {
                    dialogs.showInfo(dString.substitute(this.requestSuccessfullSubmitted, [entityName, Description]));
                }),
                failure: dojo.hitch(this, function (result) {
                    dialogs.showError(dString.substitute(this.errorPromotion, [entityName, result]));
                })
            });

        },
        opportunityStatistics: function () {
            this.prepareSelectedRecords(this.opportunityStatisticsActionitem(this.getSelectionInfo()));
        },
        opportunityStatisticsActionitem: function (selectionInfo) {
            return function () {
                var dialog = new OpportunityStatistics(selectionInfo);
                dialog.show();
            };
        },
        createQuoteFromOpportunity: function () {
            var entry = {
                "$name": "CreateQuoteFromOpportunity",
                "request": {
                    "OpportunityId": utility.getCurrentEntityId()
                }
            };
            this._createEntityFromOpportunity("CreateQuoteFromOpportunity", entry, "Quote");
        },
        createSalesOrderFromOpportunity: function () {
            var entry = {
                "$name": "CreateSalesOrderFromOpportunity",
                "request": {
                    "OpportunityId": utility.getCurrentEntityId()
                }
            };
            this._createEntityFromOpportunity("CreateSalesOrderFromOpportunity", entry, "SalesOrder");
        },
        _createEntityFromOpportunity: function(operationName, entry, entityPage) {
            var service = sDataServiceRegistry.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                          .setResourceKind("opportunities")
                          .setOperationName(operationName);
            request.execute(entry, {
                async: false,
                success: function (result) {
                    if (result.response.Result) {
                        if (utility.isEQEnabled())
                            {
                               Sage.Utility.showEQForm(entityPage,result.response.Result);
                            }
                            else{
                                window.location.href = dString.substitute("${0}.aspx?entityId=${1}", [entityPage, result.response.Result]);
                            }
                    } else {
                        console.log('The entity Id is null');
                    }
                },
                failure: function (result) {
                    dialogs.showError(result);
                }
            });
        }
    });
    return opportunityTasksTasklet;
});
