define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            reportsTabDisplayName: 'Reports',
            schedulesTabDisplayName: 'Schedules',
            historyTabDisplayName: 'History'
        }
    };
    return lang.mixin(LanguageList, nls);
});