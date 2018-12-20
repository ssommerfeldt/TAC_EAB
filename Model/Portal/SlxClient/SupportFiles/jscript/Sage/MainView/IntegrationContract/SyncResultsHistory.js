/*globals dojo, define, Sage, dijit, Simplate, $ */
define("Sage/MainView/IntegrationContract/SyncResultsHistory", [
    'dojo/_base/declare',
    'dojo/i18n!./nls/SyncResultsHistory',
    'dijit/_Widget',
    'Sage/UI/GridView',
    'Sage/UI/Controls/GridParts/Columns/SlxLink',
    'Sage/UI/Controls/GridParts/Columns/DateTime',
    'dojo/_base/lang',
    'Sage/Data/SDataServiceRegistry'
],
function (declare, i18nStrings, _Widget, GridView, SlxLink, DateTime, lang, sDataServiceRegistry) {
    var syncResultsHistory = declare('Sage.MainView.IntegrationContract.SyncResultsHistory', [_Widget], {
        grid: '',
        globalSyncId: '',
        entityId: '',
        constructor: function () {
            lang.mixin(this, i18nStrings);
        },
        loadSyncResults: function () {
            var options = {
                readOnly: true,
                columns: [
                    {
                        field: 'RunName',
                        label: this.grdSyncHistory_RunName,
                        sortable: true,
                        type: SlxLink,
                        editable: false,
                        pageName: 'SyncResult',
                        idField: '$key'
                    },
                    {
                        field: 'CreateDate',
                        type: DateTime,
                        formatType: 'date/time',
                        label: this.grdSyncHistory_CreateDate,
                        editable: false,
                        sortable: true
                    },
                    {
                        field: 'HttpStatus',
                        label: this.grdSyncHistory_Status,
                        editable: false,
                        sortable: true
                    },
                    {
                        field: 'DiagnosisCode',
                        label: this.grdSyncHistory_DiagnosisCode,
                        editable: false,
                        sortable: true
                    },
                    {
                        field: 'ErrorMessage',
                        label: this.grdSyncHistory_ErrorMessage,
                        editable: false,
                        sortable: false
                    },
                    {
                        field: 'SyncJob.JobName',
                        label: this.grdSyncHistory_JobName,
                        sortable: true,
                        type: SlxLink,
                        editable: false,
                        pageName: 'SyncJob',
                        idField: 'SyncJob.$key'
                    }
                ],
                storeOptions: {
                    service: sDataServiceRegistry.getSDataService('dynamic'),
                    resourceKind: 'syncResults',
                    include: [],
                    select: ['Id', 'RunName', 'CreateDate', 'HttpStatus', 'DiagnosisCode', 'ErrorMessage', 'SyncJob.JobName'],
                    where: lang.hitch(this, function () { return dojo.string.substitute("$uuid eq '${0}' or EntityId eq '${1}'", [this.globalSyncId, this.entityId]); }),
                    scope: this
                },
                tools: [],
                minRowsPerPage: 25,
                placeHolder: this.placeHolder,
                columnHiding: true,
                columnResizing: true,
                columnReordering: true
            };
            var grid = this.grid = new GridView(options);
            grid.createGridView();
        }
    });
    return syncResultsHistory;
});