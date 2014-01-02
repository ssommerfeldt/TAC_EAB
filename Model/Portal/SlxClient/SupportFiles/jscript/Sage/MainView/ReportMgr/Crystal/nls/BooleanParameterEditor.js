define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtPleaseSpecifyValue: 'Please specify a value.'
        }
    };
    return lang.mixin(LanguageList, nls);
});
