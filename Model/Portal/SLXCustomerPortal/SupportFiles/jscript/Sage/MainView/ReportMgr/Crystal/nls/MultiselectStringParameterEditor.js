define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtTheValueMustBeBetween: 'The value must be between {0} and {1} characters long.',
            txtTheMinimumLengthForThisField: 'The minimum length for this field is {0}.',
            txtTheMaximumLengthForThisField: 'The maximum length for this field is {0}.',
            txtPleaseSpecifyValue: 'Please specify a value.',
            lblAvailableValues_Caption: 'Available Values:',
            lblSelectedValues_Caption: 'Selected Values:',
            lblEnterValue_Caption: 'Enter a Value:'
        }
    };
    return lang.mixin(LanguageList, nls);
});
