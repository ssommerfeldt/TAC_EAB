define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (languageList, lang) {
    var nls = {
        root: {
            txtScheduleName_Caption: "Job Name:",
            txtDescription_Caption: "Description:",
            txtRunAsUser_Caption: "Run As:",
            txtScheduledBy_Caption: "Scheduled By:",
            txtOutputFormat_Caption: "Output Format:",
            txtFrequency_Caption: "Frequency:",
            txtUser_Caption: "Author:",
            txtLastExecutionDate_Caption: "Last Run:",
            txtExecutionCount_Caption: "Execution Count:",
            txtReportName_Caption: "Report:"
        }
    };
    return lang.mixin(languageList, nls);
});