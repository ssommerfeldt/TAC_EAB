define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {           
            dialogTitle: 'Lookup Participants',
            okText: 'Add Selected',
            cancelText: 'Close',
            noDataText: 'No records match the selection criteria',
            srchBtnCaption: 'Search',
            colName: 'Name',
            colType: 'Type',
            colAccount: 'Company/Account',
            colTitle: 'Title',
            colEmail: 'Email',
            colWorkPhone : 'Work Phone'
        }
    };
    return lang.mixin(LanguageList, nls);
});
