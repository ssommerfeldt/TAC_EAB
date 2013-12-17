define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            colJobName: 'Job Name',
            colNameDescription: 'Description',
            colNameRunAsUser: 'Scheduled By',
            colNameLastExecutionDate: 'Last Run',
            colNameExecutionCount: 'Execution Count',
            colNameStartTimeUtc: 'Start Time',
            colNameEndTimeUtc: 'End Time',
            colNamePriority: 'Priority',
            colNameStatus: 'Status',
            colNameTemplate: 'Template'
        }
    };
    return lang.mixin(LanguageList, nls);
});