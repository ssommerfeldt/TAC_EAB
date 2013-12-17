define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtEdit: 'Edit',
            txtDelete: 'Delete',
            txtRangeValue: '${0} to ${1}'
        }
    };
    return lang.mixin(LanguageList, nls);
});
