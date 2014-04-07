define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtLoadingScheduleDetails: 'Loading Schedule Details',
            txtError: 'Error',
            txtCannotDetermineReportId: 'Cannot determine report id.',
            txtCannotDetermineReportNameOrFamily: 'Cannot determine report name or family.',
            txtLoading: 'Loading ',
            txtLoadingReport: 'Loading Report',
            txtSorryAnErrorOccuredLoadingReport: 'Sorry, an error occurred loading report: ${0} ${1}.'
        }
    };
    return lang.mixin(LanguageList, nls);
});

