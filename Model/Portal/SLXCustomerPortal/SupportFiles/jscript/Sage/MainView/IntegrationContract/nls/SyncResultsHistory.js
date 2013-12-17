define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            grdSyncHistory_StampDate: "Date/Time",
            grdSyncHistory_Status: "Status",
            grdSyncHistory_SyncNote: "Sync Notes"
        }
    };
    return lang.mixin(LanguageList, nls);
});