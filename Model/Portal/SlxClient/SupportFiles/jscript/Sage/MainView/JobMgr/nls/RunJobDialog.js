define([
    'Sage/LanguageList',
    'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            dlgRunJob_Title: 'Run/Schedule Job',
            txtJobName_Caption: 'Job Name',
            txtTriggerDescription_Caption: 'Description',
            cmbScheduleType_Caption: 'Schedule',
            cmdOK_Caption: 'OK',
            cmdCancel_Caption: 'Cancel',
            txtInvalidNumber: 'Invalid number.',
            contentPaneParameters_Caption: 'Parameters',
            txtRunNow: 'Run Now',
            txtScheduledExecution: 'Scheduled Execution',
            colName_Caption: 'Name',
            colValue_Caption: 'Value',
            colDescription_Caption: 'Description',
            txtInvalidParameterTitle: 'Invalid Parameter',
            txtInvalidParameterMessage: 'Invalid Parameter: ${0}'
        }
    };
    return lang.mixin(LanguageList, nls);
});