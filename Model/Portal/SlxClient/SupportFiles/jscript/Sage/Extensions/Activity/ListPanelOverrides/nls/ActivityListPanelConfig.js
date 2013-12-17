define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
           colNameAssociationCount:'Participant Count'           
        }
    };
    return lang.mixin(LanguageList, nls);
});