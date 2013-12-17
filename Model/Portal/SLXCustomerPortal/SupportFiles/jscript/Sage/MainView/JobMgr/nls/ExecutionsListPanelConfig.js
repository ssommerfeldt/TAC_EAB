define([
        'Sage/LanguageList',
        'dojo/_base/lang'
],
function (LanguageList, lang) {
    var nls = {
        root: {
            loadingText: 'Loading...',
            colNameJobName: 'Type',
            colNameUser: 'User',
            colNamePhase: 'Phase',
            colNamePhaseDetail: 'Phase Detail',
            colNameProgress: 'Progress',
            colNameElapsed: 'Elapsed Time',
            colNameStatus: 'Status',
            colNameResult: 'Result'
        }
    };
    return lang.mixin(LanguageList, nls);
});