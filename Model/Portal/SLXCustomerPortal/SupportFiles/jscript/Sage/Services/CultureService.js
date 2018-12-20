/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, cookie */
define("Sage/Services/CultureService", [
    'Sage/Data/SDataServiceRegistry',
    'dojo/_base/declare',
    'icrm-js-services',
    'dojo/Deferred',
    'Sage/Services/LocalStorageService',
    'Sage/LanguageList'
],
/**
 * This is a slxClient wrapper for the icrm-js-sdk pick list service.
 */
function (SDataServiceRegistry, declare, ServiceBundle, Deferred, LocalStorageService, LanguageList) {
    // make sure that icrm-js-sdk has a pick list service
    var bundledService = {};
    if (ServiceBundle && ServiceBundle.CultureService) {
        bundledService = ServiceBundle.CultureService;
    } else {
        console.warn('the culture service is missing from icrm-js-sdk');
    }
    var svc = declare('Sage.Services.CultureService', [bundledService], {
        _request: null,
        constructor: function () {
            this._request = new Sage.SData.Client.SDataResourceCollectionRequest(SDataServiceRegistry.getSDataService('system', false, true, false));
            this._request.setResourceKind('$service/getLanguageLists');
            this.cache = Sage.Services.getService('LocalStorage');
        },
        requestAll: function () {
            var deferred = new Deferred();
            this.getAllCodes(this._request, {
                onSuccess: function (data) {
                    deferred.resolve(data);
                }
            });
            return deferred;
        },
        requestRegion: function () {
            var deferred = new Deferred();
            this.getRegionCodes(this._request, {
                onSuccess: function (data) {
                    deferred.resolve(data);
                } 
            });
            return deferred;
        },
        requestNeutral: function () {
            var deferred = new Deferred();
            this.getNeutralCodes(this._request, {
                onSuccess: function (data) {
                    deferred.resolve(data);
                }
            });
            return deferred;
        },
        requestActive: function () {
            var deferred = new Deferred();
            this.getActiveCodes(this._request, {
                onSuccess: function (data) {
                    deferred.resolve(data);
                }
            });
            return deferred;
        }
    });
    /**
      * Add an instance of this service to the Sage.Services service collection.
    */
    if (!Sage.Services.hasService('Culture'))
        Sage.Services.addService('Culture', new Sage.Services.CultureService());

    return svc;
});