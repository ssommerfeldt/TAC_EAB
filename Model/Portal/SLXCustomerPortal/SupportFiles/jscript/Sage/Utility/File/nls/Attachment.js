define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            uploadingAttachments: 'Uploading attachments',
            uploadCompleted: 'Completed',
            uploadingPleaseWait: 'Uploading, please wait...',
            uploadFailed: 'Upload failed.'
    }
    };
    return lang.mixin(LanguageList, nls);
});
