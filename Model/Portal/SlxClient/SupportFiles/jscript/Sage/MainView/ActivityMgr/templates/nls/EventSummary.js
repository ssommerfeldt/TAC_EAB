define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (languageList, lang) {
    var nls = {
        root: {
            txtStartDate_Caption: "Start Date:",
            txtEndDate_Caption: "End Date:",
            txtLocation_Caption: "Location:",
            txtUser_Caption: "User:",
            txtDescription_Caption: "Description:"
        }
    };
    return lang.mixin(languageList, nls);
});