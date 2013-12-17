define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            title: 'Job Notifications',
            helpText: 'Help',
            colNameJobName: 'Type',
            colNameProgress: 'Progress',
            colNameStatus: 'Status',
            colExecutionResult: 'Result'
        }
    };
    return lang.mixin(LanguageList, nls);
});