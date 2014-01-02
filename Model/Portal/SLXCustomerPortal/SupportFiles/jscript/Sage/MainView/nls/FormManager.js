define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            nameText: 'Name',
            entityText: 'Entity',
            layoutText: 'Layout',
            titleFmtString: 'Form Designer - ${0}',
            pageTitle: 'Saleslogix - Form Designer'
        }
    };
    return lang.mixin(LanguageList, nls);
});