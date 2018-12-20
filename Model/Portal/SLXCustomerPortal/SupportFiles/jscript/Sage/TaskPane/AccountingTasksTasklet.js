/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/AccountingTasksTasklet", [
    'dojo/_base/lang',
    'dojo/i18n!./nls/AccountingTasksTasklet',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/TaskPane/TaskPaneContent',
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Utility',
    'Sage/Data/SDataServiceRegistry',
    'Sage/MainView/IntegrationContract/PromoteWidget',
    'Sage/UI/Dialogs'
],
function (lang, i18nStrings, _BaseTaskPaneTasklet, TaskPaneContent, declare, dString, utility, sDataServiceRegistry, PromoteWidget, dialogs) {
        var accountingTasksTasklet = declare('Sage.TaskPane.AccountingTasksTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {
        taskItems: [],
        constructor: function() {
            lang.mixin(this, i18nStrings);
            /* jshint ignore:start */
            if (isIntegrationContractEnabled) {
                this.taskItems = [
                    {
                        taskId: 'promoteAccount',
                        type: "Link",
                        displayName: this.promoteTitle,
                        clientAction: "accountingTasksActions.validateCanPromote()",
                        securedAction: 'Entities/Account/PromoteAccount'
                    }
                ];
            }
            /* jshint ignore:end */
        },
        validateCanPromote: function () {
            this.getCurrentEntity();
            var currentEntityId;
            if (Sage.Utility.getModeId() === 'detail') {
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

            var service = Sage.Services.getService('IntegrationContractService');

            if (!service.isBackOfficeIntegrationEnabled) {
				dialogs.showError(this.integrationNotEnabled);
                return false;
            }

            var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("accounts");
            request.setOperationName("CanPromoteAccount");
            var entry = {
                "$name": "CanPromoteAccount",
                "request": {
                    "AccountId": currentEntityId
                }
            };
            request.execute(entry, {
                success: lang.hitch(this, function () {
                    this._promoteAccount(currentEntityId);
                })
            });
        },
        _promoteAccount: function (currentEntityId) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("accounts");
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
    return accountingTasksTasklet;
});