define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtPleaseSpecifyDateBetween: 'Please specify a date value between {0} and {1}.',
            txtPleaseSpecifyDateLesser: 'Please specify a date value less than or equal to {0}.',
            txtPleaseSpecifyDateGreater: 'Please specify a date value greater than or equal to {0}.',
            txtPleaseSpecifyValue: 'Please specify a date value.'
        }
    };
    return lang.mixin(LanguageList, nls);
});
