define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (languageList, lang) {
    var nls = {
        root: {
            txtJobName_Caption: 'Job Name:',
            txtDescription_Caption: 'Description:'
        }
    };
    return lang.mixin(languageList, nls);
});