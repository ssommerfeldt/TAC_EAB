define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            notificationToolTip: 'You have ${0} job notifications.'
        }
    };
    return lang.mixin(LanguageList, nls);
});