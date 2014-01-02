define([
    'Sage/LanguageList',
    'dojo/_base/lang'
],
function(LanguageList, lang) {
    var nls = {
        root: {
            errorMessage: "Sorry, an error occured during the execution of job \'${0}\': ${1} ${2}.",
            jobCompletedSuccessfully: 'The job has completed successfully.',
            unexpectedErrorMessage: "Sorry, an unexpected error occured during the execution of job \'${0}\'.",
            repeatIndefinitely: 'Repeat indefinitely',
            cancelButtonCaption: 'Cancel',
            defaultProgressDialogTitle: 'Running Job',
            closeButtonCaption: 'Close',
            filtersAppliedError: 'This job cannot run when filters are applied. Please clear all filters and try again.'
        }
    };
    return lang.mixin(LanguageList, nls);
});