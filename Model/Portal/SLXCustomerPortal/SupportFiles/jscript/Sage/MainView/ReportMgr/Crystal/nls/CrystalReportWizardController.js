define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtOnDemandScheduleName: 'On Demand',
            txtReportSuccessfullyScheduled: 'Report successfully scheduled.',
            txtDynamicParametersMessage: 'Reports with dynamic parameters are currently not supported.',
            txtError: 'Error',
            txtScheduleSuccessfullyUpdated: 'Schedule successfully updated.'
        }
    };
    return lang.mixin(LanguageList, nls);
});
