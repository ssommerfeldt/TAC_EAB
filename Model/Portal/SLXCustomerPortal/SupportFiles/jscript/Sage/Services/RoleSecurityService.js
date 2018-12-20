/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Services/RoleSecurityService", [
   'dijit/_Widget',
    'Sage/Data/SDataServiceRegistry',
    'Sage/Services/ApplicationStateService',
    'Sage/Utility', // without this the SDataServiceRegistry.getSDataService seems to load the wrong context for Sage.Utility
    'Sage/Utility/_LocalStorageMixin',
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/_base/lang',
    'dojo/string'
],
function (_Widget, SDataServiceRegistry, ApplicationStateService, utility, _LocalStorageMixin, declare, connect, lang, string) {
    /**
       * Declare the UserOptions class and append its methods and properties
       * @constructor
       */
    var widget = declare('Sage.Services.RoleSecurityService', [_Widget, _LocalStorageMixin], {
        _currentUserId: '',
        _accessListCache: false,
        _enabled: true,
        _nameSpace: 'Sage_SalesLogix_RoleSecurityService',
        _clearCache: false,
        _state: null,
        _clearCacheHandler: false,
        constructor: function (options) {
            this.inherited(arguments);
            dojo.mixin(this, options);
            this._currentUserId = this._getCurrentUserId();
            this._state = new ApplicationStateService().addToListOfServices();
            if (!this._clearCacheHandler) {
                this._clearCacheHandler = connect.subscribe('service/RoleSecurity/cacheClear', lang.hitch(this, this.clearCache));
            }
        },
        postCreate: function (options) {
            this._getFromCache();
        },

        _getCurrentUserId: function () {

            if (!this._currentUserId) {
                var clientContextSvc = Sage.Services.getService('ClientContextService');
                if (clientContextSvc) {
                    if (clientContextSvc.containsKey("userID")) {
                        this._currentUserId = clientContextSvc.getValue("userID");
                    }
                }
            }

            return this._currentUserId;
        },
        _virtuald: function () {
            var match = /^\/([^\/]+)\//.exec(location.pathname);
            return match ? match[1] : '';
        },
        hasAccess: function (actionName, callback) {
            var result = this._internalHasAccess(actionName);
            if (callback) {
                callback(result);
            }
            return result;
        },
        _internalHasAccess: function (actionName) {

            if (!this._enabled) {
                return true;
            }

            if (!actionName) {
                return true;
            }
            if (actionName.trim() === '') {
                return true;
            }

            if (this._getCurrentUserId().trim() === 'ADMIN') {
                return true;
            }
            var accessList = this._getAccessList();
            if (accessList) {
                for (var i = 0; i < accessList.length; i++) {
                    if (accessList[i] === actionName) {
                        return true;
                    }
                }
            }
            return false;
        },
        _getAccessList: function () {
            if (this._accessListCache) {
                return this._accessListCache.securedActions;
            }
            else {
                var accessList = this._getFromCache();
                if (accessList) {
                    return accessList.securedActions;
                }
            }
            return false;
        },
        _getFromCache: function () {
            var me = this;
            var currentUserId = this._getCurrentUserId();
            var rsData = this.getFromLocalStorage(this._nameSpace, this._nameSpace);
            var lastRead = localStorage.getItem(string.substitute("__${0}_modified_at", [this._nameSpace.replace(/_/g, "-")]));
            var lastAltered = new Date();
            var laCached = this._state.getApplicationState("RoleSecurity", null, "GetRoleSecurityStatus");
            if (laCached && laCached.modifiedDate) {
                lastAltered = laCached.modifiedDate;
            }
            lastAltered = utility.Convert.toDateFromString(lastAltered, true);
            lastAltered = '"' + utility.Convert.toIsoStringFromDate(lastAltered) + '"';
            if (rsData && lastAltered < lastRead) {
                for (var i = 0; i < rsData.length; i++) {
                    if (rsData[i].userId === currentUserId) {
                        if (this._clearCache) { // if clear cache is set then just remove it, value will be returned below
                            rsData.splice(i, 1);
                            i--;
                        }
                        else {
                            this._accessListCache = rsData[i];
                            return rsData[i];
                        }
                    }
                }
            }
            this._loadUserAccessList(function (userData) {
                if (!rsData) {
                    rsData = [];
                }
                // ensure there are no duplicate cache entries.
                for (var i = 0; i < rsData.length; i++) {
                    if (rsData[i].userId === currentUserId) {
                        rsData.splice(i, 1);
                        i--;
                    }
                }
                me._accessListCache = userData;
                rsData.push(userData);

                me.saveToLocalStorage(me._nameSpace, rsData, me._nameSpace);
            }, true);
            return me._accessListCache;
        },
        _loadUserAccessList: function (callBack, async) {
            async = async || false;
            var request = new Sage.SData.Client.SDataServiceOperationRequest(SDataServiceRegistry.getSDataService('system')).setContractName('system').setOperationName('getCurrentUser');
            request.execute({}, {
                async: async,
                success: function (data) {
                    if (callBack) {
                        callBack(data.response);
                    }
                },
                failure: function (data) {
                    console.warn('Error reading request');
                    //console.log(data);
                },
                scope: this
            });

        },
        clearCache: function () {
            var ns = this._nameSpace;
            this.clear(ns.replace(/[^A-Za-z0-9]/g, '-'));
        }

    }); // end dojo declare

    /**
    * Make an instance of this service available to the 
    * Sage.Services.getService method.
    */
    if (!Sage.Services.hasService('RoleSecurityService')) {
        Sage.Services.addService('RoleSecurityService', new Sage.Services.RoleSecurityService());
    }

    return widget;
});