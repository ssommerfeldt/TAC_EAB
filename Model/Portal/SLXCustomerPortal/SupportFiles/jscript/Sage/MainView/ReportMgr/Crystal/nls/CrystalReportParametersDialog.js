define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtDialogTitle: 'Enter Values',
            cmdBack_Caption: '< Back',
            cmdNext_Caption: 'Next >',
            cmdCancel_Caption: 'Cancel'
        }
    };
    return lang.mixin(LanguageList, nls);
});
