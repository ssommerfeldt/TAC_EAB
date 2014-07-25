define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (languageList, lang) {
    var nls = {
        root: {
            txtCreateDate_Caption: "Create Date:",
            txtReportType_Caption: "Report Type:",
            txtOutputFormat_Caption: "Output Format:",
            txtRunAsUser_Caption: "Run As:",
            txtExecutionType_Caption: "Execution Type:",
            txtScheduleName_Caption: "Description:",
            txtScheduledBy_Caption: "Scheduled By:",
            txtFileSize_Caption: "File Size:",
            txtElapsedTime_Caption: "Elapsed Time:"
        }
    };
    return lang.mixin(languageList, nls);
});