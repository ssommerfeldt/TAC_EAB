/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/UserTasklet", [
    'dojo/i18n!./nls/UserTasklet',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/TaskPane/TaskPaneContent',
    'dojo/string',
    'Sage/Utility',
    'dojo/_base/declare',
    'Sage/TaskPane/User/ContactUserAssociationEditor',
    'Sage/Data/SingleEntrySDataStore',
    'Sage/UI/Dialogs',
    'Sage/MainView/CopyUserProfile/CopyUserProfileController'
],
function (
    i18nStrings,
    _BaseTaskPaneTasklet,
    TaskPaneContent,
    string,
    Utility,
    declare,
    ContactUserAssociationEditor,
    SingleEntrySDataStore,
    Dialogs,
    CopyUserProfileController
) {
    var userTasklet = declare('Sage.TaskPane.UserTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {
        addToRoleTitle: 'Add to Role',
        resetUsersTitle: 'Reset Users',
        taskItems: [],
        constructor: function () {
            dojo.mixin(this, i18nStrings);
			if (Utility.getModeId() === 'detail') {				
				this.taskItems = [
                    {
                        taskId: 'promoteUsers', 
						type: "Link", 
						displayName: this.promoteTitle, 
						clientAction: 'userTaskletActions.promoteUsers();',
						securedAction: 'Entities/User/Promote'
                    }
                ];
			
        }else {
            this.taskItems = [
                { 
					taskId: 'AddToRole', 
					type: "Link", 
					displayName: this.addToRoleTitle, 
					clientAction: 'userTaskletActions.addUsersToRole();',
					securedAction: 'Entities/User/Add'
                },
                { taskId: 'ResetUsers', type: "Link", displayName: this.resetUsersTitle, clientAction: 'userTaskletActions.resetUsers();',
                    securedAction: 'Entities/User/Add'
                },
                { taskId: 'tskActionCopyUserProfile', type: "Link", displayName: this.taskText_CopyUserProfile, clientAction: 'userTaskletActions.actionCopyUserProfile();',
                    securedAction: 'Entities/User/Add'
                },
                { taskId: 'Associate Contact', type: "Link", displayName: this.associateContactTitle, clientAction: 'userTaskletActions.associateContact();',
                    securedAction: 'Entities/User/AssociateUser'
                },            
                { taskId: 'Disassociate Contact', type: "Link", displayName: this.disAssociateContactTitle, clientAction: 'userTaskletActions.disAssociateContact();',
                    securedAction: 'Entities/User/DisAssociateUser'
                },
                { taskId: 'AddToTeamCaption',type: "Link", displayName: this.addToTeamCaption, clientAction:'commonTaskActions.prepareSelectedRecords(commonTaskActions.addToTeam);',
                    securedAction: 'Entities/User/Add'
                },
                {
                    taskId: 'tskRemoveFromAllTeams', type: "Link", displayName: this.removeFromAllTeamsCaption, clientAction: string.substitute('commonTaskActions.confirmBeforePrepareSelectedRecords(\'${0}\',commonTaskActions.removeFromAllTeams);', [this.areYouSure]),
                    securedAction: 'Entities/User/Add'
                },
                {
                    taskId: 'promoteUsers', 
					type: "Link", 
					displayName: this.promoteTitle, 
					clientAction: 'userTaskletActions.promoteUsers();',
					securedAction: 'Entities/User/Promote'
                }
            ];
		}
        },
        actionCopyUserProfile: function () {
            this.getCurrentEntity();
            
            var callback = function () {
                var copyUserProfileDialog = new CopyUserProfileController(this.currentEntityPrettyName, this.currentEntityTableName, this.selectionInfo);
                copyUserProfileDialog.startDialog();
            }.bind(this);

            this.prepareSelectedRecords(callback);
        },
        resetUsers: function () {
            if (Utility.getModeId() === "detail") {
                this.onResetUsersClick();
            }
            else {
                this.prepareSelectedRecords(this.resetUsersAction(this));
            }
        },
        addUsersToRole: function () {
            if (Utility.getModeId() === "detail") {
                this.onAddUserClick();
            }
            else {
                this.prepareSelectedRecords(this.actionItem(this));
            }
        },
        actionItem: function (self) {
            return function () {
                self.onAddUserClick();
            };
        },
        resetUsersAction: function (self) {
            return function () {
                self.onResetUsersClick();
            };
        },
        onAddUserClick: function () {
            var addUser = dojo.byId([this.clientId, '_tskAddUserToRole'].join(''));
            if (addUser) {
                addUser.click();
            }
        },
        onResetUsersClick: function () {
            var resetUser = dojo.byId([this.clientId, '_tskResetUsers'].join(''));
            if (resetUser) {
                resetUser.click();
            }
        },

        //MAA Changes

        associateContact: function (action) {
            var self = this;
            if (!action) { action = 'associate'; }
            this._selectionInfo = this.getSelectionInfo();          
            if (this._selectionInfo.selectionCount === 0) {
                    Sage.UI.Dialogs.showError(this.singleSelectionErrorMessage);
            }else if(this._selectionInfo.selectionCount > 1) {
                Sage.UI.Dialogs.showError(this.multipleSelectionErrorMessage);
            } else {
                var selObj = { "selectionInfo": this._selectionInfo, "action": action };

                this._setupStore();
                this._contactUserStore.fetch({
                    predicate: "UserId eq '" + this._selectionInfo.selectedIds[0] + "'",
                    onComplete: function (contactData) {
                        Sage.UI.Dialogs.showError(self.associationExistsMessage);
                    },
                    onError: function () {
                        self.prepareSelectedRecords(this.associateContactActionItem(selObj));
                    },
                    scope: this
                });
            }
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
        disAssociateContact: function () {
            this._selectionInfo = this.getSelectionInfo();
            if (this._selectionInfo.selectionCount === 0) {
                Sage.UI.Dialogs.showError(this.noSelectionErrorMessage);
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
                Dialogs.raiseQueryDialog(
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
        _removeContactUsers: function (userIds, callback, scope) {
            var service = Sage.Data.SDataServiceRegistry.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                .setResourceKind('ContactUsers')
                .setOperationName('RemoveContactUserAssociations');
            var entry = {
                "$name": "RemoveContactUserAssociations",
                "request": {
                    "ContactUserId": null,
                    "contactIds": null,
                    "userIds": userIds
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
		promoteUsers: function(selectionInfo) {
			this.prepareSelectedRecords(this.promoteSelectedUser(this.getSelectionInfo()));
		},
		promoteSelectedUser: function(selectionInfo) {
			var self = this;
            var service = Sage.Data.SDataServiceRegistry.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                .setResourceKind('Users')
                .setOperationName('PromoteUser');
            var entry = {
                "$name": "PromoteUser",
                "request": {					
                    "entityIds": (selectionInfo.selectionCount > 0) ? selectionInfo.selectedIds.join(',') || '' : ''
                }
            };
			
            request.execute(entry, {
                success: function () {
                    console.log("success");
					if(selectionInfo.selectionCount == 1)
					{
						Dialogs.showInfo(self.promotedsuccessfully);
					}
					else if(selectionInfo.selectionCount > 1){
						Dialogs.showInfo(string.substitute(self.requestsuccessfullcompleted, [selectionInfo.selectionCount]));
					}else{
						Dialogs.showError(self.promoteNoneSelected);
					}
                },
                failure: function () {
                    console.log("Error promoting user");
                }                
            });
        }
    });
    return userTasklet;
});
