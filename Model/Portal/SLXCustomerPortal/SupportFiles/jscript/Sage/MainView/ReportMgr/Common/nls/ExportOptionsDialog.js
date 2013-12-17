define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            //Dialog and buttons
            txtDialogTitle: 'Export Options',
            txtDialogTitleScheduling: 'Export And Scheduling Options',
            cmdBack_Caption: '< Back',
            cmdNext_Caption: 'Next >',
            cmdCancel_Caption: 'Cancel',
            //User lookup
            txtName: 'Name',
            txtSelectUser: 'Select User',
            txtOK: 'OK',
            //Export Options
            txtOutputFormat_Caption: 'Format',
            txtRunAs_Caption: 'Run As',
            //Scheduling
            txtScheduleDescription_Caption: 'Description'
        }
    };
    return lang.mixin(LanguageList, nls);
});