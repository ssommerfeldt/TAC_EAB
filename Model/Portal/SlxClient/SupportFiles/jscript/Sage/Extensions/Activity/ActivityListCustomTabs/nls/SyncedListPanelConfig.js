define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            colCreateSource: 'Create Source',
            colLastSyncDate: 'Last Synced'
        }
    };
    return lang.mixin(LanguageList, nls);
});