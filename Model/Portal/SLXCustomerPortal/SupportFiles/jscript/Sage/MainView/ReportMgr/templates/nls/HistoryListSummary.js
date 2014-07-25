define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (languageList, lang) {
    var nls = {
        root: {
            txtTrue: 'True',
            txtFalse: 'False'
        }
    };
    return lang.mixin(languageList, nls);
});