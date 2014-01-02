define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            colNameTriggerName: 'Schedule',
            colNameJobName: 'Job Name',
            colNameUser: 'Scheduled By',
            colNameStartTimeUtc: 'Start Time',
            colNameEndTimeUtc: 'End Time',
            colNamePriority: 'Priority',
            colNameStatus: 'Status',
            colNameTimesTriggered: 'Execution Count'
        }
    };
    return lang.mixin(LanguageList, nls);
});