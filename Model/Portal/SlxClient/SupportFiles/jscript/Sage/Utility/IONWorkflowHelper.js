/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, getCookie, cookie, $ */
define('Sage/Utility/IONWorkflowHelper', [
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/dom-construct',
    'Sage/Data/SDataServiceRegistry',
    'dojo/json',
    'dojo/string',
    'dojo/i18n!./nls/IONWorkflowHelper',
    'Sage/UI/Dialogs'
],
function (lang, declare, domConstruct, sDataServiceRegistry, json, dString, nlsStrings, dialogs) {
    var cancelWorkflowsUtil = declare('Sage.Utility.IONWorkflowHelper', [], {


           cancelIonWorkflow: function (options) {
            var clientContextService = Sage.Services.getService('ClientContextService');
            var service = Sage.Services.getService('IntegrationContractService');
            if (!service.isWorkflowIntegrationEnabled) {
                dialogs.showError(this.workflowIntegrationNotEnabled);
                return false;
            }
            var objReqData = JSON.stringify(options);
            var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
			var entry;
            if (options.entityName === 'Quote') {
                request.setResourceKind("quotes");
                request.setOperationName("CancelWorkflowForQuotes");

                entry = {
                    "$name": "CancelWorkflowForQuotes",
                    "request": {
                        "QuoteId": options.entityId,
                        "WorkflowId": options.childEntityIds
                    }
                };
            }
            else if (options.entityName === 'Opportunity') {
                request.setResourceKind("opportunities");
                request.setOperationName("CancelWorkflowForOpportunity");

                entry = {
                    "$name": "CancelWorkflowForOpportunity",
                    "request": {
                        "OpportunityId": options.entityId,
                        "WorkflowId": options.childEntityIds
                    }
                };
            }
            else if (options.entityName === 'Lead') {
                request.setResourceKind("leads");
                request.setOperationName("CancelWorkflowForLeads");

                entry = {
                    "$name": "CancelWorkflowForLeads",
                    "request": {
                        "LeadId": options.entityId,
                        "WorkflowId": options.childEntityIds
                    }
                };
            }
            else if (options.entityName === 'Sales Order') {
                request.setResourceKind("salesOrders");
                request.setOperationName("CancelWorkflowForSales");

                entry = {
                    "$name": "CancelWorkflowForSales",
                    "request": {
                        "SalesOrderId": options.entityId,
                        "WorkflowId": options.childEntityIds
                    }
                };
            }
            request.execute(entry, {
                async: false,
                success: function (result) {
                    if (result.response.Result)
                        dialogs.showInfo(nlsStrings.cancelWorkflowSuccess);
                    else
                        dialogs.showError(dString.substitute(nlsStrings.cancelWorkflowLog, [options.entityName, result]));

                },
                failure: function (result) {
                    dialogs.showError(dString.substitute(nlsStrings.errorCancelWorkflow, [options.entityName, result]));
                }
            });
        },


        
        _isEntityClosed: function (options) {
            var service = sDataServiceRegistry.getSDataService('dynamic');
            var req = new Sage.SData.Client.SDataServiceOperationRequest(service);
            req.setResourceKind(options.resourceKind)
                .setOperationName(options.operationName);
            var entry = {
                "$name": options.operationName,
                "request": {
                    "entityId": Sage.Utility.getCurrentEntityId()
                }
            };
            req.execute(entry, {
                async: false,
                success: function (result) {
                    return result.response.Result;
                },
                failure: function (result) {
                    dialogs.showError(result);
                }
            });
            return true;
        }
        
    });

    Sage.namespace('Utility.IONWorkflowHelper');
    lang.mixin(Sage.Utility.IONWorkflowHelper, new cancelWorkflowsUtil());
    return cancelWorkflowsUtil;
});

require(['Sage/Utility/IONWorkflowHelper']);
