define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            colNameDate: 'Date',
            colNameScheduleName: 'Description',
            colNameExecutionType: 'Execution Type',
            colNameRunAs: 'Run As',
            colNameScheduledBy: 'Scheduled By',
            colNameReportName: 'Report',
            colNameSize: 'File Size',
            colNameOutputFormat: 'Output Format',
            colNameReportType: 'Type'
        }
    };
    return lang.mixin(LanguageList, nls);
});

