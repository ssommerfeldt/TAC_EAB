/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, cookie */
define("Sage/Services/PickListService", [
    'Sage/Data/SDataServiceRegistry',
    'dojo/_base/declare',
    'icrm-js-services',
    'Sage/Services/LocalStorageService'
],
/**
 * This is a slxClient wrapper for the icrm-js-sdk pick list service.
 */
function (SDataServiceRegistry, declare, ServiceBundle, LocalStorageService) {
    // make sure that icrm-js-sdk has a pick list service
    var bundledService = {};
    if (ServiceBundle && ServiceBundle.PickListService) {
        bundledService = ServiceBundle.PickListService;
    } else {
        console.warn('the pick list service is missing from icrm-js-sdk');
    }
    var svc = declare('Sage.Services.PickListService', [bundledService], {
        constructor: function () {
            if (!Sage.Services.hasService('LocalStorage')) {
                if (Sage.Services.LocalStorageService) {
                    Sage.Services.addService('LocalStorage', new Sage.Services.LocalStorageService());
                } else {
                    Sage.Services.addService('LocalStorage', new LocalStorageService());
                }
            }

            this._storage = Sage.Services.getService('LocalStorage');
            this._service = SDataServiceRegistry.getSDataService('system', false, true, false);
        },
        read: function (arg) {
            if (arg && arg.handlers && arg.options) {
                var handlers = arg.handlers,
                    options = arg.options;
                var request = this.setUpRequest(new Sage.SData.Client.SDataResourceCollectionRequest(options.service), options);
                request.read(arg.handlers);
            }
        }
    });
    /**
      * Add an instance of this service to the Sage.Services service collection.
    */
    if (!Sage.Services.hasService('PickList'))
        Sage.Services.addService('PickList', new Sage.Services.PickListService());

    return svc;
});