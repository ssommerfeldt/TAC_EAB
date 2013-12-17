define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            executionsTabDisplayName: 'Executions',
            jobDefinitionsTabDisplayName: 'Definitions',
            schedulesTabDisplayName: 'Schedules'
        }
    };
    return lang.mixin(LanguageList, nls);
});