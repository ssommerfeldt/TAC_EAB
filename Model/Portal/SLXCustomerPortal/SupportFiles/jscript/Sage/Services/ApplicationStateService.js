/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Services/ApplicationStateService", [
   'dijit/_Widget',
    'Sage/Data/SDataServiceRegistry',
    'Sage/Utility', // without this the SDataServiceRegistry.getSDataService seems to load the wrong context for Sage.Utility
    'Sage/Utility/_LocalStorageMixin',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string'
],
function (_Widget, SDataServiceRegistry, utility, _LocalStorageMixin, declare, lang, string) {
    /**
       * Declare the UserOptions class and append its methods and properties
       * @constructor
       */
    var widget = declare('Sage.Services.ApplicationStateService', [_Widget, _LocalStorageMixin], {
        _accessListCache: false,
        _enabled: true,
        _clearCache: false,
        constructor: function (options) {
            this.inherited(arguments);
            lang.mixin(this, options);
        },
        setApplicationState: function (key, value,operation) {
            if (!value) {
                value = this._queryForState(key, null, operation);
            }
            sessionStorage.setItem(key, JSON.stringify(value));
        },
        getApplicationState: function (key, callback, operation) {
            var stateObj = sessionStorage.getItem(key);
            var validCallBack = callback !== null && typeof (callback) === "function";
            // if there is a sessionstorage value for the key
            if (stateObj) {
                // then use this value
                if (validCallBack) {
                    callback(stateObj);
                    return;
                } else {
                    return JSON.parse(stateObj);
                }
            }
            else {
                return this._queryForState(key, callback, operation);
            }
        },
        _queryForState: function (key, callback, operation) {
            operation = operation || key;
            var validCallBack = callback !== null && typeof (callback) === "function";
            var request = new Sage.SData.Client.SDataServiceOperationRequest(SDataServiceRegistry.getSDataService('system')).setContractName('system').setOperationName(operation);
            var returnedValue = null;
            request.execute({}, {
                async: validCallBack,
                success: function (data) {
                    var value = data.response;
                    if (value) {
                        sessionStorage.setItem(key, JSON.stringify(value));
                    }
                    if (validCallBack) {
                        returnedValue = callback(value);
                    } else {
                        returnedValue = value;
                    }
                },
                failure: function (data) {
                    console.warn('Error reading request');
                },
                scope: this
            });
            return returnedValue;
        },
        addToListOfServices: function () {
            var mgr = Sage.Services.getService('ApplicationStateService'); 
            if (!mgr){
                Sage.Services.addService('ApplicationStateService', this);
                 mgr = Sage.Services.getService('ApplicationStateService');
            }
            return mgr;
        }
    }); // end dojo declare

    /**
    * Make an instance of this service available to the 
    * Sage.Services.getService method.
   
    if (!Sage.Services.hasService('RoleSecurityService')) {
        Sage.Services.addService('RoleSecurityService', new Sage.Services.RoleSecurityService());
    }
     */
    return widget;
});