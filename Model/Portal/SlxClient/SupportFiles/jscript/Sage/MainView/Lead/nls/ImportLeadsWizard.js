define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            yestText: 'Yes',
            noText: 'No',
            confirmOverwriteFileMsg: 'You currently have an import file selected. Do you wish to overwrite this file?',
            importProgressCaption: 'Import Process Results',
            lblPrimaryProgress: 'Processing import file please wait...',
            lblTotalRecords: 'Total Records:',
            lblTotalRecordsProcessed: 'Processed:',
            lblTotalRecordsImported: 'Imported:',
            lblTotalRecordsMerged: 'Merged:',
            lblTotalDuplicates: 'Duplicates:',
            lblTotalProjectedDuplicates: 'Projected Duplicates:',
            lblDuplicateRate: 'Duplicate Rate:',
            lblTotalErrors: 'Errors:',
            calculatingText: 'Calculating please wait ...',
            importStatusProcessing: 'Processing',
            importStatusCompleted: 'Completed',
            abortImportProcessStatus: 'Abort',
            btnCancelText: 'Abort',
            btnCloseText: 'Close',
            lblImportHistoryLinkText: 'To see the import history results click the import number below:',
            lblImportLinkNumber: 'Import Number: ',
            errorRequestImportHistory: 'An error occured execiting sdata request for endpoint importHistory.'
        }
    };
    return lang.mixin(LanguageList, nls);
});
