define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            colNameJobName: 'Job Name',
            colNameDescription: 'Description',
            colNameType: 'Type'
        }
    };
    return lang.mixin(LanguageList, nls);
});