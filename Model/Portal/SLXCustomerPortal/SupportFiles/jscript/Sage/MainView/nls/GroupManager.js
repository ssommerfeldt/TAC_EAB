define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            titleFmtString: '${0}',
            tabDisplayNameGroup: 'All Groups',
            groupColNameName: 'Name',
            groupColNameFamily: 'Family'
        }
    };
    return lang.mixin(LanguageList, nls);
});
