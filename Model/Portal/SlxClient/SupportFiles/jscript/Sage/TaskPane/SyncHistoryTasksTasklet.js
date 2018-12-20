/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/SyncHistoryTasksTasklet", [
    'dojo/i18n!./nls/SyncHistoryTasksTasklet',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/TaskPane/TaskPaneContent',
    'dojo/_base/declare',
    'Sage/Utility/Jobs'
],
function(i18nStrings, _BaseTaskPaneTasklet, TaskPaneContent, declare, jobs) {
    var syncHistoryTasksTasklet = declare('Sage.TaskPane.SyncHistoryTasksTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {
        taskItems: [],
        constructor: function() {
            dojo.mixin(this, i18nStrings);
            this.taskItems = [
                {
                    taskId: 'Reprocess',
                    type: "Link",
                    displayName: this.reprocessTitle,
                    clientAction: 'syncHistoryTasksActions.updateSyncHistory()',
                    securedAction: 'Entities/SyncResult/Reprocess'
                },
                {
                    taskId: 'Purge',
                    type: "Link",
                    displayName: this.purgeTitle,
                    clientAction: 'syncHistoryTasksActions.purgeSyncHistory()',
                    securedAction: 'Entities/SyncResult/Purge'
                }
            ];
        },
        updateSyncHistory: function() {
            this.prepareSelectedRecords(this.updateSyncHistoryActionItem(this.getSelectionInfo()));
        },
        updateSyncHistoryActionItem: function(selectionInfo) {
            return function() {
                var parameters = [
                    { "name": "EntityName", "value": "SyncResult" },
                    { "name": "PropertyNames", "value": "Action" },
                    { "name": "PropertyValues", "value": "Reprocess" },
                    { "name": "SelectedIds", "value": (selectionInfo.selectionCount > 0) ? selectionInfo.selectedIds.join(',') || '' : '' },
                    { "name": "BusinessRuleName", "value": "UpdateSyncResult" }
                ];

                var options = {
                    closable: true,
                    title: "Reprocess",
                    key: "Sage.SalesLogix.BusinessRules.Jobs.UpdateEntityJob",
                    parameters: parameters,
                    success: function(result) {
                    },
                    failure: function(result) {

                    },
                    ensureZeroFilters: true
                };
                jobs.triggerJobAndDisplayProgressDialog(options);
            };
        },
        purgeSyncHistory: function() {
            this.prepareSelectedRecords(this.purgeSyncHistoryActionitem(this.getSelectionInfo()));
        },
        purgeSyncHistoryActionitem: function(selectionInfo) {
            return function() {
                var parameters = [
                    { "name": "EntityName", "value": "SyncResult" },
                    { "name": "PropertyNames", "value": "Action" },
                    { "name": "PropertyValues", "value": "Reprocess" },
                    { "name": "SelectedIds", "value": (selectionInfo.selectionCount > 0) ? selectionInfo.selectedIds.join(',') || '' : '' },
                    { "name": "BusinessRuleName", "value": "PurgeSyncResult" }
                ];

                var options = {
                    closable: true,
                    title: "Purge",
                    key: "Sage.SalesLogix.BusinessRules.Jobs.UpdateEntityJob",
                    parameters: parameters,
                    success: function(result) {
                    },
                    failure: function(result) {

                    },
                    ensureZeroFilters: true
                };
                jobs.triggerJobAndDisplayProgressDialog(options);
            };
        }
    });
    return syncHistoryTasksTasklet;
});