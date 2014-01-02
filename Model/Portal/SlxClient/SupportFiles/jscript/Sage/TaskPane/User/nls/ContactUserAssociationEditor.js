define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            btnCancel_Caption: 'Cancel',
            btnOK_Caption: 'OK',
            dialogTitleText: 'Associate User with Contact',
            associateContactText:'Associate the selected user with the following contact',
            user_Caption: 'Contact',           
            lookupContactText: 'Lookup Contact',
            lookupFirstNameColText: 'First Name',
            lookupLastNameColText: 'Last Name',
            lookupTitleColText: 'Title',
            lookupAccountColText: 'Account',
            lookupWorkPhoneColText: 'Work Phone',
            lookupEmailText: 'Email',
            disAssociateTitle: 'Disassociate from a Contact',
            associationExistsMessage: 'The contact you selected is already associated to a user. Select another contact.',
        }
    };
    return lang.mixin(LanguageList, nls);
});