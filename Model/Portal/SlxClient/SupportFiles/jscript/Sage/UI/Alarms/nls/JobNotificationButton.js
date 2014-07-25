define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            notificationToolTip: 'You have ${0} job notifications.',
            notificationErrorToolTip: 'An error occured retrieving job notifications. Please contact your administrator.'
        }
    };
    return lang.mixin(LanguageList, nls);
});