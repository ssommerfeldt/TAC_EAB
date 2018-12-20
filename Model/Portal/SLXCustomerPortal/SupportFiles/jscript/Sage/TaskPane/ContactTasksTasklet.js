/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/ContactTasksTasklet", [
    'dojo/_base/lang',
    'dojo/i18n!./nls/ContactTasksTasklet',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/TaskPane/TaskPaneContent',
    'Sage/Data/SingleEntrySDataStore',
    'Sage/Data/WritableSDataStore',
    'Sage/MainView/Contact/ContactUserAssociationEditor',
    'dojo/_base/declare',
    'Sage/UI/Dialogs',
    'dojo/string',
	'Sage/MainView/IntegrationContract/PromoteWidget',
    'Sage/Utility',
    'Sage/Data/SDataServiceRegistry'
],
function (lang, i18nStrings, _BaseTaskPaneTasklet, TaskPaneContent, SingleEntrySDataStore, WritableSDataStore, ContactUserAssociationEditor, declare,
    dialogs, dString, PromoteWidget) {
    var contactTasksTasklet = declare('Sage.TaskPane.ContactTasksTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {
        taskItems: [],
        oAuthProviders: null,
        endPointId: '',
        constructor: function () {
            dojo.mixin(this, i18nStrings);
            this.taskItems = [
                {
                    taskId: 'Associate Contact', type: 'Link', displayName: this.associateContactTitle, clientAction: 'contactTasksActions.associateContact();',
                    securedAction: 'Entities/Contact/AssociateContact'
                },
                {
                    taskId: 'Disassociate Contact', type: 'Link', displayName: this.disAssociateContactTitle, clientAction: 'contactTasksActions.disAssociateContact();',
                    securedAction: 'Entities/Contact/DisAssociateContact'
                }
            ];
            /* jshint ignore:start */
            if (isIntegrationContractEnabled) {
                this.taskItems.push({
                    taskId: 'promoteContact',
                    type: "Link",
                    displayName: this.promoteTitle,
                    clientAction: "contactTasksActions.validateCanPromote()",
                    securedAction: 'Entities/Contact/Promote'
                });
            }
            /* jshint ignore:end */
        },
        associateContact: function () {
            var self = this;
            this._selectionInfo = this.getSelectionInfo();
            if (this._selectionInfo.selectionCount === 0) {
                dialogs.showError(this.singleSelectionErrorMessage);
            } else if (this._selectionInfo.selectionCount > 1) {
                dialogs.showError(this.multipleSelectionErrorMessage);
            } else {
                var selObj = { "selectionInfo": this._selectionInfo, "action": 'associate' };
                this._setupStore();
                this._contactUserStore.fetch({
                    predicate: "ContactId eq '" + this._selectionInfo.selectedIds[0] + "'",
                    onComplete: function (contactData) {
                        dialogs.showError(self.associationExistsMessage);
                    },
                    onError: function () {
                        self.prepareSelectedRecords(this.associateContactActionItem(selObj));
                    },
                    scope: this
                });
            }
        },
        disAssociateContact: function () {
            this._selectionInfo = this.getSelectionInfo();
            if (this._selectionInfo.selectionCount === 0) {
                dialogs.showError(this.noSelectionErrorMessage);
            } else {
                this.prepareSelectedRecords(this.confirmDisassociate(this));
            }
        },
        confirmDisassociate: function (self) {
            return function () {
                var confirmMessage = self.confirmDisAssociate;
                if (self._selectionInfo.selectionCount > 1) {
                    confirmMessage = self.confirmDisAssociateMultiple;
                }
                dialogs.raiseQueryDialog(
                    self.disAssociateDialogTitle,
                    dojo.string.substitute(confirmMessage, [self._selectionInfo.selectionCount]),
                    function (result) {
                        self.disAssociateActionItem(result, self);
                    },
                    self.okButtonText,
                    self.cancelButtonText
                );
            };
        },
        disAssociateActionItem: function (result, self) {
            if (result) {
                self.getSelectionInfo();
                var contactIds = this.selectionInfo.selectedIds.join();
                this._removeContactUsers(contactIds, self._successfulContactUserDelete, self);
            }
        },
        _removeContactUsers: function (contactIds, callback, scope) {
            var service = Sage.Data.SDataServiceRegistry.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                .setResourceKind('ContactUsers')
                .setOperationName('RemoveContactUserAssociations');
            var entry = {
                "$name": "RemoveContactUserAssociations",
                "request": {
                    "ContactUserId": null,
                    "contactIds": contactIds,
                    "userIds": null
                }
            };
            request.execute(entry, {
                success: function () {
                    console.log("success");
                },
                failure: function () {
                    console.log("Error removing the Contact-User association");
                },
                scope: scope || this
            });
        },
        _successfulContactUserDelete: function () {
        },
        _failedContactUserDelete: function () {
        },
        _setupStore: function () {
            if (!this._contactUserStore) {
                this._contactUserStore = new SingleEntrySDataStore({
                    include: [],
                    resourceKind: 'contactUsers',
                    service: Sage.Data.SDataServiceRegistry.getSDataService('dynamic')
                });
            }
        },
        associateContactActionItem: function (selectionInfo, action) {
            return function () {
                var updateDialog = dijit.byId("dlgContactUserAssociation");
                if (!updateDialog) {
                    updateDialog = new ContactUserAssociationEditor(selectionInfo, action);
                } else {
                    updateDialog.setSelectionInfo(selectionInfo, action);
                }
                updateDialog.show();
            };
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
            var integrationService = Sage.Services.getService('IntegrationContractService');

            if (!integrationService.isBackOfficeIntegrationEnabled) {
                dialogs.showError(this.integrationNotEnabled);
                return false;
            }
            var service = Sage.Data.SDataServiceRegistry.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
            .setResourceKind("contacts")
            .setOperationName("CanPromoteContact");
            var entry = {
                "$name": "CanPromoteContact",
                "request": {
                    "ContactId": currentEntityId
                }
            };
            request.execute(entry, {
                success: lang.hitch(this, function () {
                    this._promoteContact(currentEntityId);
                })
            });
        },
        _promoteContact: function (currentEntityId) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(Sage.Data.SDataServiceRegistry.getSDataService('dynamic'));
            
            request.setResourceKind("contacts");
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
    return contactTasksTasklet;
});