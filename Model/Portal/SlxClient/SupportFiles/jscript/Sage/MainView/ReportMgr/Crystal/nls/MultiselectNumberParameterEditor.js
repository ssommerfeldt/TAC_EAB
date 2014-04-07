define([
    'Sage/LanguageList',
    'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtPleaseSpecifyNumberBetween: 'Please specify a numeric value between {0} and {1}.',
            txtPleaseSpecifyNumberLesser: 'Please specify a numeric value less than or equal to {0}.',
            txtPleaseSpecifyNumberGreater: 'Please specify a numeric value greater than or equal to {0}.',
            txtPleaseSpecifyValue: 'Please specify a numeric value.',
            lblAvailableValues_Caption: 'Available Values:',
            lblSelectedValues_Caption: 'Selected Values:',
            lblEnterValue_Caption: 'Enter a Value:'
        }
    };
    return lang.mixin(LanguageList, nls);
});
