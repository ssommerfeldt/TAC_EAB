define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            //ReportConditionType
            txtGroup: 'Group',
            txtDateRange: 'Date Range',
            txtUser: 'User',
            txtQuery: 'Query',
            //ReportConditionOperator
            txtIsGreaterThan: 'Is Greater Than',
            txtIsLessThan: 'Is Less Than',
            txtIsInTheRange: 'Is In The Range',
            txtIsAfter: 'Is After',
            txtIsBefore: 'Is Before',
            txtContains: 'Contains',
            txtStartsWith: 'Starts With',
            txtEndsWith: 'Ends With',
            txtIs: 'Is',
            txtIsNot: 'Is Not',
            //ExecutionType
            txtOnDemand: 'On Demand',
            txtScheduled: 'Scheduled',
            //ReportTypes
            txtCrystalReport: 'Crystal Report',
            txtExportToFileReportType: 'Export to File',
            txtUnknownReportType: 'Unknown',
            //Output Formats
            txtNoFormat: 'No Format',
            txtPdf: 'PDF',
            txtExcel: 'Excel',
            txtCsv: 'CSV',
            txtWord: 'Word',
            txtXml: 'XML'
        }
    };
    return lang.mixin(LanguageList, nls);
});
