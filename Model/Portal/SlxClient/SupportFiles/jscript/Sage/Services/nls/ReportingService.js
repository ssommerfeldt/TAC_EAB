define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtUnsupportedReportType: "Unsupported report type: ${0}.",
            txtUnexpectedError: "Sorry an error occurred: ${0} ${1}.",

            //BEGIN SUPPORT FOR LEGACY REPORTINGSERVICE FUNCTIONS (SLX 8.0)
            invalidEntityError: "The entity ID has not been defined or could not be determined.",
            invalidReportPluginError: "The report plugin ID has not been defined or could not be determined.",
            invalidTableNameError: "The table name has not been defined or could not be determined.",
            noDefaultReportError: "A default report could not be located for the current entity.",
            reportCannotBeShownError: "The report cannot be shown."
        }
    };
    return lang.mixin(LanguageList, nls);
});
