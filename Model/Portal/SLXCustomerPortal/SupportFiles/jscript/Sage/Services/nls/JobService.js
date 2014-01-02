define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {            
            txtInvalidParameter: "Invalid parameter: '${0}'.",
            txtTriggerJobError: "Sorry an error occured triggering job '${0}': ${1} ${2}.",
            txtScheduleJobError: "Sorry an error occured scheduling job '${0}': ${1} ${2}.",
            txtUnexpectedError: "Sorry an error occured: ${0} ${1}."
        }
    };
    return lang.mixin(LanguageList, nls);
});
