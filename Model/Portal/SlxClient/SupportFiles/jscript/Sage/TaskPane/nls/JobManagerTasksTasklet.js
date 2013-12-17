define([
    'Sage/LanguageList',
    'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            taskRunJob_Caption: 'Create Schedule',
            taskEditTrigger_Caption: 'Edit Schedule',
            taskCancelJob_Caption: 'Cancel Executing Job',
            taskDeleteScheduledJob_Caption: 'Delete Schedule'
        }
    };
    return lang.mixin(LanguageList, nls);
});