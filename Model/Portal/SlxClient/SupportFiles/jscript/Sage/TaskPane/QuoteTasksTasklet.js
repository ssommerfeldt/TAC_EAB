/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/QuoteTasksTasklet", [
    'dojo/_base/lang',
    'dojo/i18n!./nls/QuoteTasksTasklet',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/TaskPane/TaskPaneContent',
    'dojo/_base/declare',
    'dojo/_base/Deferred', 
    'dojo/string',
    'Sage/MainView/ReportMgr/ReportWizardController',
    'Sage/Reporting/Enumerations',
    'Sage/Utility',
    'Sage/UI/Dialogs',
    'Sage/Data/SDataServiceRegistry',
    'Sage/MainView/IntegrationContract/PromoteWidget',
    'Sage/Utility/PricingAndAvailability',
    'Sage/MainView/IntegrationContract/PricingAvailabilityWidget'
],
function (lang, i18nStrings, _BaseTaskPaneTasklet, TaskPaneContent, declare, deferred, dString, reportWizardController, enumerations, utility, dialogs, sDataServiceRegistry,
    PromoteWidget, pricingAndAvailability, PricingAvailabilityWidget) {
    var quoteTasksTasklet = declare('Sage.TaskPane.QuoteTasksTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {
        taskItems: [],
        constructor: function () {
            lang.mixin(this, i18nStrings);
            if (utility.getModeId() === 'detail') {
                this.taskItems = [
                    {
                       
                        taskId: 'generateProposal',
                        type: "Link",
                        displayName: this.generateProposal,
                        clientAction: "quoteTasksActions.createProposal()",
                        securedAction: 'Entities/Quote/GenerateProposal'
                        
                    },
                    {
                        taskId: 'convertToSalesOrder',
                        type: "Link",
                        displayName: this.convertToSalesOrder,
                        clientAction: "quoteTasksActions.convertToSO()",
                        securedAction: 'Entities/Quote/ConvertToSalesOrder'
                    }
                 ];
            }
            /* jshint ignore:start */
			this.taskItems.push({
                    taskId: 'promoteQuote',
                    type: "Link",
                    displayName: this.promoteTitle,
                    clientAction: "quoteTasksActions.validateCanPromote()",
                    securedAction: 'Entities/Quote/Promote'
			    });
            if (!Sage.Services.hasService('IntegrationContractService')) {
                Sage.Services.addService('IntegrationContractService', new Sage.IntegrationContractService());
            }
            var service = Sage.Services.getService('IntegrationContractService');
            if (service.isBackOfficeIntegrationEnabled && !service.isQuoteCRMPricingEnabled) {
                this.taskItems.push(
                {
                    taskId: 'getOrderTotal',
                    type: "Link",
                    displayName: this.getOrderTotalTitle,
                    clientAction: "quoteTasksActions.validateOrderTotal()",
                    securedAction: 'Entities/Quote/GetOrderTotal'
                },
                {
                    taskId: 'priceLineItems',
                    type: "Link",
                    displayName: this.rePriceQuote,
                    clientAction: "quoteTasksActions.ValidatePriceItems()",
                    securedAction: 'Entities/Quote/RePriceQuote'
                });
            }


            this.taskItems.push(
                {
                    taskId: 'promoteIONWorkItems',
                    type: "Link",
                    displayName: this.promoteIONWorkFlowItems,
                    clientAction: "quoteTasksActions.InitiateWorkflow()",
                    securedAction: 'Entities/Quote/InitiateWorkflow'
                },
                {
                    taskId: 'cancelIONWorkflow',
                    type: "Link",
                    displayName: this.cancelIONWorkFlowItems,
                    clientAction: "quoteTasksActions.CancelIONWorkflow()",
                    securedAction: 'Entities/Quote/CancelIONWorkflow'
                });

            /* jshint ignore:end */
        },
        InitiateWorkflow: function () {
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
            request.setResourceKind("Quotes");
            request.setOperationName("InitiateManualWorkflow");
            var entry = {
                "$name": "InitiateManualWorkflow",
                "request": {
                    "QuoteId": currentEntityId
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
            request.setResourceKind("Quotes");
            request.setOperationName("CancelManualWorkflowForQuote");
            var entry = {
                "$name": "CancelManualWorkflowForQuote",
                "request": {
                    "QuoteId": currentEntityId
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
            request.setResourceKind("quotes");
            request.setOperationName("CanPromoteQuote");
            var entry = {
                "$name": "CanPromoteQuote",
                "request": {
                    "QuoteId": currentEntityId
                }
            };
            request.execute(entry, {
                success: lang.hitch(this, function () {
                    this._promoteQuote(currentEntityId);
                })
            });
        },
        _promoteQuote: function (currentEntityId) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("quotes");
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
        createProposal: function () {
            var quoteId = utility.getCurrentEntityId();
            if (this._hasErpStatus(quoteId)) {
                dialogs.showError(dString.substitute(i18nStrings.hasErpStatus, [i18nStrings.errorGenerateProposal]));
            } else {
                var reportingService = Sage.Services.getService("ReportingService");
                if (reportingService) {
                    var conditions = [
                        {
                            conditionType: 'Query',
                            table: 'QUOTE',
                            field: 'QUOTEID',
                            operator: 'Is',
                            value: quoteId,
                            fromRange: null,
                            toRange: null,
                            dataType: enumerations.FieldDataTypes.String,
                            tag: null
                        }
                    ];
                    var options = {
                        reportId: 'Quote:Quotation',
                        reportOptions: {
                            wizardOptions: {
                                hiddenSteps: [enumerations.CrystalReportWizardStep.Conditions, enumerations.CrystalReportWizardStep.ExportOptions]
                            },
                            scheduleOptions: {
                                executionType: enumerations.ExecutionType.OnDemand
                            },
                            exportOptions: {
                                outputFormat: enumerations.ReportExportFormat.Pdf
                            },
                            conditionOptions: {
                                conditions: conditions,
                                conditionsConnector: enumerations.ReportConditionConnector.And
                            }
                        }
                    };

                    var def = new deferred();
                    this._getProposalParameters(def);
                    def.then(function (crystalParameters) {
                            options.reportOptions.parameterOptions = { parameters: crystalParameters };
                            options.reportOptions.wizardOptions.hiddenSteps.push(enumerations.CrystalReportWizardStep.Parameters);
                            reportWizardController.startWizard(options);
                        }, function() {
                            reportWizardController.startWizard(options);
                        }
                    );
                }
            }
        },
        _getPrimaryServerId: function(def) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('system'));
            request.setResourceKind('systemOptions');
            request.setResourceSelector("'PrimaryServerId'");
            request.read({
                success: function (result) {
                    var primaryServerId = result['value'];
                    if (primaryServerId) {
                        def.progress(primaryServerId);
                    } else {
                        def.cancel('Invalid result');
                    }
                },
                failure: function (err) {
                    def.reject(err);
                },
                scope: this
            });
            return def.promise;
        },
        _getProposalParameters: function(def) {
            var reportParameters = [];
            var userId = utility.getClientContextByKey('userID');
            if (utility.isStringWithLength(userId)) {
                reportParameters.push(
                {
                    "className": "CrystalReports.ParameterField",
                    "name": "PreparedBy",
                    "parameterFieldName": "PreparedBy",
                    "type": "StringField",
                    "length": 65534,
                    "promptText": "Prepared By:",
                    "isRecurring": false,
                    "formulaForm": "{?PreparedBy}",
                    "kind": "ParameterField",
                    "headingText": null,
                    "useCount": 0,
                    "defaultValues": null,
                    "currentValues": [
                        {
                            "className": "CrystalReports.ParameterFieldDiscreteValue",
                            "computedText": userId,
                            "description": userId,
                            "discreteValue": {
                                "actualValue": userId,
                                "actualValueType": "String",
                                "value": userId,
                                "valueType": "String"
                            }
                        }
                    ],
                    "allowMultiValue": false,
                    "values": null,
                    "reportName": null,
                    "parameterType": "ReportParameter",
                    "reportParameterType": "ReportParameter",
                    "allowNullValue": false,
                    "minimumValue": null,
                    "maximumValue": null,
                    "editMask": null,
                    "allowCustomCurrentValues": false,
                    "defaultValueSortOrder": "AlphabeticalAscending",
                    "defaultValueSortMethod": "BasedOnDescription",
                    "valueRangeKind": "Discrete",
                    "usage": 57,
                    "defaultValueDisplayType": "Description",
                    "isOptionalPrompt": false,
                    "isShownOnPanel": true,
                    "isEditableOnPanel": true,
                    "initialValues": null,
                    "promptToUser": true,
                    "isDataFoundationParameter": false,
                    "allowHierarchyValues": false,
                    "keepLastValueSelected": true,
                    "hasCurrentValue": false,
                    "parameterFieldUsage2": "InUse, ShowOnPanel, EditableOnPanel, DataFetching",
                    "parameterValueKind": "StringParameter",
                    "isDynamic": true,
                    "isInvalidDynamicParameter": false,
                    "invalidDynamicParameterReason": null,
                    "clientMustQueryDynamicData": false,
                    "actualValueType": "String",
                    "valueType": "String",
                    "beginValueType": "String",
                    "endValueType": "String"
                });
            }

            this._getPrimaryServerId(def);
            def.then(function() {
                    // Ignored. We're using progress.
                }, function(err) {
                    def.reject(err);
                },
                function(siteCode) {
                    reportParameters.push(
                        {
                            // {CompanyBranchesCommand.SITECODE} = {?Company}
                            "className": "CrystalReports.ParameterField",
                            "name": "Company",
                            "parameterFieldName": "Company",
                            "type": "StringField",
                            "length": 65534,
                            "promptText": "Prepared By Company:",
                            "isRecurring": false,
                            "formulaForm": "{?Company}",
                            "kind": "ParameterField",
                            "headingText": null,
                            "useCount": 0,
                            "defaultValues": null,
                            "currentValues": [
                                {
                                    "className": "CrystalReports.ParameterFieldDiscreteValue",
                                    "computedText": siteCode,
                                    "description": siteCode,
                                    "discreteValue": {
                                        "actualValue": siteCode,
                                        "actualValueType": "String",
                                        "value": siteCode,
                                        "valueType": "String"
                                    }
                                }
                            ],
                            "allowMultiValue": false,
                            "values": null,
                            "reportName": null,
                            "parameterType": "ReportParameter",
                            "reportParameterType": "ReportParameter",
                            "allowNullValue": false,
                            "minimumValue": null,
                            "maximumValue": null,
                            "editMask": null,
                            "allowCustomCurrentValues": false,
                            "defaultValueSortOrder": "AlphabeticalAscending",
                            "defaultValueSortMethod": "BasedOnDescription",
                            "valueRangeKind": "Discrete",
                            "usage": 57,
                            "defaultValueDisplayType": "Description",
                            "isOptionalPrompt": false,
                            "isShownOnPanel": true,
                            "isEditableOnPanel": true,
                            "initialValues": null,
                            "promptToUser": true,
                            "isDataFoundationParameter": false,
                            "allowHierarchyValues": false,
                            "keepLastValueSelected": true,
                            "hasCurrentValue": false,
                            "parameterFieldUsage2": "InUse, ShowOnPanel, EditableOnPanel, DataFetching",
                            "parameterValueKind": "StringParameter",
                            "isDynamic": true,
                            "isInvalidDynamicParameter": false,
                            "invalidDynamicParameterReason": null,
                            "clientMustQueryDynamicData": false,
                            "actualValueType": "String",
                            "valueType": "String",
                            "beginValueType": "String",
                            "endValueType": "String"
                        }
                    );
                    def.resolve(reportParameters);
                });             
            return def.promise;
        },
        convertToSO: function () {
            var quoteId = utility.getCurrentEntityId();
            if (this._hasErpStatus(quoteId)) {
                dialogs.showError(dString.substitute(i18nStrings.hasErpStatus, [i18nStrings.errorConvertWonQuote]));
            } else {
                this._convertToSO(quoteId);
            }                                        
        },
        _convertToSO: function (quoteId) {
            var service = sDataServiceRegistry.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                          .setResourceKind("Quotes")
                          .setOperationName("ConvertQuoteToOrder");
            var entry = {
                "$name": "ConvertQuoteToOrder",
                "request": {
                    "QuoteId": quoteId
                }
            };
            request.execute(entry, {
                async: false,
                success: function (result) {
                    // Redirect to SalesOrder page if the SalesOrderId is not null
                    if (result.response.Result) {
                        window.location.href = dString.substitute("SalesOrder.aspx?entityId=${0}", [result.response.Result]);
                    } else {
                        console.log('Sales Order Id is null');
                    }
                },
                failure: function (result) {
                    dialogs.showError(result);
                }
            });
        },
        _hasErpStatus: function (quoteId) {
            var hasErpStatus = false;           
            var service = sDataServiceRegistry.getSDataService('dynamic');
            var req = new Sage.SData.Client.SDataSingleResourceRequest(service);
            req.setResourceKind('quotes');
            req.setResourceSelector(dString.substitute('"${0}"', [quoteId]));
			var serviceBOE = Sage.Services.getService('IntegrationContractService');
			var strStatus = 'ErpStatus';
			if (!serviceBOE.isBackOfficeIntegrationEnabled) {
				strStatus = 'Status';
			}
            req.setQueryArg('select', strStatus);
            req.read({
                async: false,
                success: function(data) {
                    var status = data[strStatus];
                    if (status === 'Unapproved') {                        
                        hasErpStatus = true;
                    }
					else if (status === 'Awarded') {                        
                        hasErpStatus = true;
                    } 
					else if (status === 'Lost') {                        
                        hasErpStatus = true;
                    }
					else if (status === 'Replaced') {                        
                        hasErpStatus = true;
                    }
					else if (status === 'Canceled') {                        
                        hasErpStatus = true;
                    }
					else if (status === 'Deleted') {                        
                        hasErpStatus = true;
                    }
                },
                    failure: function (result) {
                        dialogs.showError(result);
                    }
            });
            return hasErpStatus;
        },
        validateOrderTotal: function () {
			dojo.style("loader", "display", "block");
			dojo.style("loader", "opacity", "0.75");
            var currentEntityId = this._getSelectRecordId();
            if (!currentEntityId) return;
            var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("quotes");
            request.setOperationName("ValidateOrderTotal");
            var entry = {
                "$name": "ValidateOrderTotal",
                "request": {
                    "QuoteId": currentEntityId
                }
            };
            request.execute(entry, {
                success: lang.hitch(this, function () {
                    this._orderTotalQuote(currentEntityId);
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
            request.setResourceKind("quotes");
            request.setOperationName("ValidatePriceItems");
            var entry = {
                "$name": "ValidatePriceItems",
                "request": {
                    "QuoteId": currentEntityId
                }
            };
            request.execute(entry, {
                success: lang.hitch(this, function () {
                    this._priceItems();
                }),
				failure:function () {
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
                resourceKind: 'quotes',
                operationName: 'RePriceQuote',
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
                                window.location.href = dString.substitute("Quote.aspx?entityId=${0}", [currentEntityId]);
                            }
                        }
                    }
                },
                requestOptions: {
                    childEntityName: 'Product',
                    itemEntityName: 'QuoteItem',
                    entityName: 'Quote',
                    entityId: currentEntityId,
                    serviceName: 'QuoteOrderLineTotal',
                    secondaryServiceName: 'QuoteOrderTotal',
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
        _orderTotalQuote: function (currentEntityId) {
            var error = this.error_PricingRequest;
            var pricingOptions = {
                resourceKind: 'quotes',
                operationName: 'PriceQuoteHeader',
                callback: lang.hitch(this, function (pricingResponse) {
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
                            window.location.href = dString.substitute("Quote.aspx?entityId=${0}", [currentEntityId]);
                        }
                    }
                }),
                requestOptions: {
                    childEntityName: 'QuoteItem',
                    entityName: 'Quote',
                    entityId: currentEntityId,
                    serviceName: 'QuoteOrderTotal',
					AutoSave:true
                },
				isSpinnerHide:'T'
            };
            pricingAndAvailability.requestPricingAvailability(pricingOptions);
        }
    });
    return quoteTasksTasklet;
});