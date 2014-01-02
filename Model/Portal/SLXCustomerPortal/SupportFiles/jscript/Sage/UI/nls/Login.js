define([
        'dojo/_base/lang'
],
function (lang) {
    var nls = {
        root: {
            currentBrowserText: 'Current:',
            outdatedBrowserText: 'Outdated version',
            partiallySupportedBrowserText: 'Supported but better alternatives exist',
            laterThanSupportedText: 'Above officially supported browser version',
            unsupportedBrowserText: 'Not officially supported browser',
            implementationGuideText: 'See Compatibility Guide',
            learnMoreText: 'Learn more',
            unsupportedMessageText: 'Make your experience better by using one of our recommended browsers or browser configurations. If you choose to continue, your experience may be less than optimal.',
            closeText: 'Close'
        }
    };
    var languageList = {
        de: true,
        en: true,
        fr: true,
        it: true,
        ru: true
    };
    return lang.mixin(languageList, nls);
});