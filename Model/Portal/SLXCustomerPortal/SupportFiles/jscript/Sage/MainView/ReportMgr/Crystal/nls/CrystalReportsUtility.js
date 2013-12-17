define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            txtCurrentUser: 'Current User'
        }
    };
    return lang.mixin(LanguageList, nls);
});
