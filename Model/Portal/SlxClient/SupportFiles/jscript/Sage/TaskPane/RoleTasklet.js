/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/RoleTasklet", [
    'dojo/i18n!./nls/RoleTasklet',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/TaskPane/TaskPaneContent',
    'dojo/string',
    'Sage/Utility',
    'dojo/_base/declare',
    'Sage/Data/SingleEntrySDataStore',
    'Sage/UI/Dialogs'
],
function (
    i18nStrings,
    _BaseTaskPaneTasklet,
    TaskPaneContent,
    string,
    Utility,
    declare,
    SingleEntrySDataStore,
    Dialogs
) {
    var roleTasklet = declare('Sage.TaskPane.RoleTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {        
        taskItems: [],
        constructor: function () {
            dojo.mixin(this, i18nStrings);
            this.taskItems = [               
                {
                    taskId: 'promoteRoles',
                    type: "Link",
                    displayName: this.promoteTitle,
                    clientAction: 'roleTaskletActions.promoteRoles();',
                    securedAction: 'Entities/Role/Promote'
                }
            ];
        },
        
        promoteRoles: function (selectionInfo) {
            this.prepareSelectedRecords(this.promoteSelectedRole(this.getSelectionInfo()));
        },
        promoteSelectedRole: function (selectionInfo) {
            var service = Sage.Data.SDataServiceRegistry.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                .setResourceKind('Roles')
                .setOperationName('PromoteRole');
            var entry = {
                "$name": "PromoteRole",
                "request": {
                    "entityIds": (selectionInfo.selectionCount > 0) ? selectionInfo.selectedIds.join(',') || '' : ''
                }
            };

            request.execute(entry, {
                success: function () {
                    console.log("success");
                    if (selectionInfo.selectionCount == 1) {
                        Dialogs.showInfo("The item got promoted successfully.");
                    }
                    else if(selectionInfo.selectionCount > 1){
                        Dialogs.showInfo("The selected " + selectionInfo.selectionCount + " number of roles were successfully submitted for promotion.");
                    }
                    else {
                        Dialogs.showInfo("Please select at least one record.");
                    }
                },
                failure: function () {
                    console.log("Error promoting role");
                }
            });
        }
    });
    return roleTasklet;
});
