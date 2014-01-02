define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtPleaseSpecifyNumberBetween: 'Please specify a Number value between {0} and {1}.',
            txtPleaseSpecifyNumberLesser: 'Please specify a Number value less than or equal to {0}.',
            txtPleaseSpecifyNumberGreater: 'Please specify a Number value greater than or equal to {0}.',
            txtPleaseSpecifyValue: 'Please specify a Number value.'
        }
    };
    return lang.mixin(LanguageList, nls);
});