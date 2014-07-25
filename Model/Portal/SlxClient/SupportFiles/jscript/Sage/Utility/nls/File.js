define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            unableToUploadText: 'Saleslogix Desktop Integration Module must be installed to use this feature.',
            unknownSizeText: 'unknown',
            largeFileWarningText: 'Warning: This request exceeds the size limit set by your administrator and failed to upload.',
            largeFileWarningTitle: 'Warning'
        }
    };
    return lang.mixin(LanguageList, nls);
});