define([
        "Sage/LanguageList",
        "dojo/_base/lang"
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtSelectRecord: 'Please select a record in the list before continuing.',
            txtInvalidSelectionCount: 'You must have at least one record selected before continuing.',
            confirm_Deletion: 'Are you sure you want to delete the selected ${0}?',
            confirm_Report: 'report',
            confirm_Schedule: 'schedule',
            confirm_ReportHistory: 'report history record',
            txtYes: 'Yes',
            txtNo: 'No',
            deleteJobError: 'Sorry an error occured during the deletion process: ${0}',
            txtDeleteHistory: 'Deleting history records',
            txtDeleteTitle: 'Delete History',
            txtErrorDeleteReport: 'An error occured deleting report: ${0}'
        }
    };
    return lang.mixin(LanguageList, nls);
});