define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtPleaseSpecifyNumberBetween: 'Please specify a number value between {0} and {1}.',
            txtPleaseSpecifyNumberLesser: 'Please specify a number value less than or equal to {0}.',
            txtPleaseSpecifyNumberGreater: 'Please specify a number value greater than or equal to {0}.',
            txtPleaseSpecifyValue: 'Please specify a number value.',
            lblAvailableValues_Caption: 'Available Values:',
            lblSelectedValues_Caption: 'Selected Values:',
            lblEnterValue_Caption: 'Enter a Value:'
        }
    };
    return lang.mixin(LanguageList, nls);
});
