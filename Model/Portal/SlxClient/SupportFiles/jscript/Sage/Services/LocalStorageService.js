/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, cookie */
define("Sage/Services/LocalStorageService", [
    'Sage/Data/SDataServiceRegistry',
    'dojo/_base/declare',
    'icrm-js-services'
],
/**
 * This is a slxClient wrapper for the icrm-js-sdk caching service.
 *  This instance of the caching service works with the local storage.
 */
function (SDataServiceRegistry, declare, ServiceBundle) {
    // make sure that icrm-js-sdk has a caching service
    var bundledService = {};
    if (ServiceBundle && ServiceBundle.CachingService) {
        bundledService = ServiceBundle.CachingService;
    } else {
        console.error('the caching service is missing from icrm-js-sdk\'s services');
    }

    var svc = declare('Sage.Services.LocalStorageService', [bundledService], {
        constructor: function () {
            if (typeof(this.setCacheStorage) === 'function') {
                this.setCacheStorage(localStorage);
            } else {
                console.error('double check the expected caching service being used.');
            }
        }
    });
    /**
    * Add an instance of this service to the Sage.Services service collection.
    */
    if (!Sage.Services.hasService('LocalStorage'))
        Sage.Services.addService('LocalStorage', new Sage.Services.LocalStorageService());
    return svc;
});