define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (languageList, lang) {
    var nls = {
        root: {
            txtJobName_Caption: 'Type:',
            txtUser_Caption: 'User:',
            txtTriggerId_Caption: 'Schedule:',
            txtScheduledStartTime_Caption: 'Scheduled Start Time:',
            txtStartTime_Caption: 'Actual Start Time:',
            txtPhase_Caption: 'Phase:',
            txtPhaseDetail_Caption: 'Phase Detail:',
            txtProgress_Caption: 'Progress:',
            txtElapsedTime_Caption: 'Elapsed Time:',
            txtRemainingTime_Caption: 'Remaining Time:',
            txtStatus_Caption: 'Status:',
            txtResult_Caption: 'Result:'
        }
    };
    return lang.mixin(languageList, nls);
});