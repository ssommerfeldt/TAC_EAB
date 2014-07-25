define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (languageList, lang) {
    var nls = {
        root: {
        }
    };
    return lang.mixin(languageList, nls);
});