/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'dojo/i18n!./nls/LeadTasksTasklet',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/TaskPane/TaskPaneContent',
    'Sage/MainView/Lead/UpdateLeads',
    'Sage/UI/Dialogs',
    'dojo/_base/declare',
    'Sage/Utility/Jobs'
],
function (i18nStrings, _BaseTaskPaneTasklet, TaskPaneContent, UpdateLeads, Dialogs, declare, jobs) {
    var leadTasksTasklet = declare('Sage.TaskPane.LeadTasksTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {
        taskItems: [],
        constructor: function () {
            dojo.mixin(this, i18nStrings);
            this.taskItems = [
                { taskId: 'UpdateLeads', type: "Link", displayName: this.updateLeadsTitle, clientAction: 'leadTasksActions.updateLeads();',
                    securedAction: 'Entities/Lead/MultiUpdate'
                },
                { taskId: 'DeleteLeads', type: "Link", displayName: this.deleteLeadsTitle, clientAction: 'leadTasksActions.deleteLeads();',
                    securedAction: 'Entities/Lead/MultiDelete'
                }
            ];
        },
        updateLeads: function () {
            this.prepareSelectedRecords(this.updateLeadsActionItem(this.getSelectionInfo()));
        },
        updateLeadsActionItem: function (selectionInfo) {
            return function () {
                var updateDialog = dijit.byId("dlgUpdateMultipleLeads");
                if (!updateDialog) {
                    updateDialog = new UpdateLeads(selectionInfo);
                } else {
                    updateDialog.setSelectionInfo(selectionInfo);
                }
                updateDialog.show();
            };
        },
        deleteLeads: function () {
            this.prepareSelectedRecords(this.confirmDeleteLeadJob(this, this.getSelectionInfo()));
        },
        confirmDeleteLeadJob: function (self, selectionInfo) {
            return function () {
                Dialogs.raiseQueryDialog(
                    i18nStrings.deleteLeadsTitle,
                    dojo.string.substitute('${0}', [i18nStrings.confirmDeleteLeads]),
                    function (result) {
                        self.deleteLeadsActionItem(result, self, selectionInfo);
                    },
                    self.yesButtonText,
                    self.noButtonText
                );
            };
        },
        deleteLeadsActionItem: function (result, self, selectionInfo) {
            if (result) {
                var parameters = [
                    { "name": "EntityName", "value": "Lead" },
                    { "name": "SelectedIds", "value": (selectionInfo.selectionCount > 0) ? selectionInfo.selectedIds.join(',') || '' : '' },
                    { "name": "GroupId", "value": (selectionInfo.selectionCount === 0) ? this.getCurrentGroupId() || '' : '' }
                ];

                var options = {
                    closable: true,
                    title: this.deleteLeadsTitle,
                    key: "Sage.SalesLogix.BusinessRules.Jobs.DeleteEntityJob",
                    parameters: parameters,
                    success: function (result) {
                    },
                    failure: function (result) {
                        console.log(result);
                        Dialogs.showError(dojo.string.substitute(i18nStrings.deleteJobError, [result.statusText]));
                    },
                    ensureZeroFilters: true
                };

                jobs.triggerJobAndDisplayProgressDialog(options);
            }
        },
        getCurrentGroupId: function () {
            var grpContextSvc = Sage.Services.getService('ClientGroupContext');
            if (grpContextSvc) {
                var contextService = grpContextSvc.getContext();
                return contextService.CurrentGroupID;
            }
            return '';
        }
    });
    return leadTasksTasklet;
});
