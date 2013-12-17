define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtFinish: 'Finish'
        }
    };
    return lang.mixin(LanguageList, nls);
});