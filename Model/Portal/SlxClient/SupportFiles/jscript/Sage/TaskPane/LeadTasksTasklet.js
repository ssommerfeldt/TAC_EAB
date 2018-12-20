/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/LeadTasksTasklet", [
    'dojo/_base/lang',
    'dojo/i18n!./nls/LeadTasksTasklet',
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
    var LeadTasksTasklet = declare('Sage.TaskPane.LeadTasksTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {
        taskItems: [],
        constructor: function() {
            dojo.mixin(this, i18nStrings);
            this.taskItems = [
                {
                    taskId: 'RequestWorkflow',
                    type: "Link",
                    displayName: this.requestIONWorkFlowLeads,
                    clientAction: "leadTasksActions.initiateIONWFLeads()",
                    securedAction: 'Entities/Lead/InitiateWorkflow'
                },
                {
                    taskId: 'cancelIONWorkflow',
                    type: "Link",
                    displayName: this.cancelIONWorkFlowItems,
                    clientAction: "leadTasksActions.CancelIONWorkflow()",
                    securedAction: 'Entities/Lead/CancelIONWorkflow'
                }
                
            ];
        },
        initiateIONWFLeads: function () {
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
            request.setResourceKind("leads");
            request.setOperationName("ManualWorkflowForLeads");
            var entry = {
                "$name": "ManualWorkflowForLeads",
                "request": {
                    "LeadId": currentEntityId
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
            request.setResourceKind("leads");
            request.setOperationName("CancelManualWorkflowForLeads");
            var entry = {
                "$name": "CancelManualWorkflowForLeads",
                "request": {
                    "LeadId": currentEntityId
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
        }
    });
    return LeadTasksTasklet;
});