/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/ERPPayFromTasksTasklet", [
	'dojo/_base/lang',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/TaskPane/TaskPaneContent',
    'dojo/_base/declare',
    'Sage/UI/Dialogs',
    'dojo/string',
	'Sage/MainView/IntegrationContract/PromoteWidget',
    'Sage/Utility',
    'Sage/Data/SDataServiceRegistry'
],
function (lang, _BaseTaskPaneTasklet, TaskPaneContent, declare, dialogs, dString, PromoteWidget, utility, sDataServiceRegistry) {
    var ERPPayFromTasksTasklet = declare('Sage.TaskPane.ERPPayFromTasksTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {
        taskItems: [],
        constructor: function() {
            this.taskItems = [];
            /* jshint ignore:start */
            if (isIntegrationContractEnabled) {
                this.taskItems.push({
                    taskId: 'promoteERPPayFrom',
                    type: "Link",
                    displayName: this.promoteTitle,
                    clientAction: "ERPPayFromTasksActions.validateCanPromote()",
                    securedAction: 'Entities/ErpPayFrom/Promote'
                });
            }
            /* jshint ignore:end */
        },
        validateCanPromote: function () {
            this.getCurrentEntity();
            var currentEntityId;
            if (utility.getModeId() === 'detail') {
                currentEntityId = this.currentEntityId;
            } else {
                var selectionInfo = this.getSelectionInfo();
                if (this.verifySingleSelection(selectionInfo)) {
                    currentEntityId = selectionInfo.selectedIds[0];
                }
                else {
                    dialogs.showInfo(this.selectSingleRecord, this.invalidSelectionTitle);
                    return false;
                }
            }
            var integrationService = Sage.Services.getService('IntegrationContractService');

            if (!integrationService.isBackOfficeIntegrationEnabled) {
                dialogs.showError(this.integrationNotEnabled);
                return false;
            }
            var service = sDataServiceRegistry.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
            .setResourceKind("erpPayFroms")
            .setOperationName("CanPromoteERPPayFrom");
            var entry = {
                "$name": "CanPromoteERPPayFrom",
                "request": {
                    "ErpPayFromId": currentEntityId
                }
            };
            request.execute(entry, {
                success: lang.hitch(this, function () {
                    this._promoteERPPayFrom(currentEntityId);
                })
            });
        },
        _promoteERPPayFrom: function (currentEntityId) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('dynamic'));
            
            request.setResourceKind("erpPayFroms");
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
        }
    });
    return ERPPayFromTasksTasklet;
});