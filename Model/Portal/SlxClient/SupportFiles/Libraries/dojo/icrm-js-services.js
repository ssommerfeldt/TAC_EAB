(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ICRMServicesSDK"] = factory();
	else
		root["ICRMServicesSDK"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _caching = __webpack_require__(1);

Object.keys(_caching).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _caching[key];
    }
  });
});

var _culture = __webpack_require__(2);

Object.keys(_culture).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _culture[key];
    }
  });
});

var _mingle = __webpack_require__(3);

Object.keys(_mingle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mingle[key];
    }
  });
});

var _picklist = __webpack_require__(4);

Object.keys(_picklist).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _picklist[key];
    }
  });
});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeneralMessages = {
  MissingRequiredFunctionalityError: 'The store provided was not compatible with the generic storage service. the store needs to have the following methods methods: getItem, setItem, removeItem.',
  NoInputNothingSetWarning: 'Nothing was set, input was null.',
  NamespaceAndNameParameterError: 'namespaceOrKey is required to be a string value.',
  CannotRemoveNoItemForLanguageWarning: 'Item missing for the language'
};
var CachingServiceMessages = exports.CachingServiceMessages = {
  constructorError: GeneralMessages.MissingRequiredFunctionalityError,
  setCacheStorageError: GeneralMessages.MissingRequiredFunctionalityError,
  setCacheStorageWarning: GeneralMessages.NoInputNothingSetWarning,
  getItemError: GeneralMessages.NamespaceAndNameParameterError,
  setItemError: GeneralMessages.NamespaceAndNameParameterError,
  removeItemError: GeneralMessages.NamespaceAndNameParameterError,
  removeMissingItemWarning: GeneralMessages.CannotRemoveNoItemForLanguageWarning
};

var UnitOfTime = exports.UnitOfTime = {
  YEAR: 0,
  MONTH: 1,
  DAY: 2,
  HOUR: 3,
  MINUTE: 4,
  SECOND: 5,
  MILLISECOND: 6
};

/**
 * Caching Service class to act as a wrapper for different web/browser data stores.
 * @class CachingService
 */

var CachingService = exports.CachingService = function () {
  /**
   * Initialize Sage.CachingService, a simple wrapper for different web/browser data stores.
   * @param {Object} storage  Will normally be either localStorage, or sessionStorage, but does not need to be.
   *      Though it must have the following functions:
   *                  getItem()
   *                  setItem()
   *                  removeItem()
   * @param {Number} lifecycle a number indicating how long to keep the cache around. default value is 5.
   * @param {UnitOfTime} units describe the provided lifecycle value, and itself is a value from the list:
   *                [years, months, days, hours, minutes, seconds, milliseconds]
   */
  function CachingService(storage, lifecycle, units) {
    _classCallCheck(this, CachingService);

    this.setCacheStorage(storage);
    this.seed = 1;
    this.lifespan = lifecycle || 5;
    this.lifespanUnits = units || UnitOfTime.DAY;
  }

  /**
   * @function set the data store used by this class.
   *
   * @param {Object} storage  Will normally be either localStorage, or sessionStorage, but does not need to be.
   *      Though it must have the following functions:
   *                  getItem()
   *                  setItem()
   *                  removeItem()
   */


  _createClass(CachingService, [{
    key: 'setCacheStorage',
    value: function setCacheStorage(storage) {
      if (storage) {
        if (typeof storage.getItem === 'function' && typeof storage.setItem === 'function' && typeof storage.removeItem === 'function') {
          this._cacheStorage = storage;
        } else {
          throw new Error(CachingServiceMessages.setCacheStorageError);
        }
      } else {
        console.warn(CachingServiceMessages.setCacheStorageWarning); //eslint-disable-line
      }
    }

    /**
     * @function retrieve the data store used by this class.
     */

  }, {
    key: 'getCacheStorage',
    value: function getCacheStorage() {
      return this._cacheStorage;
    }

    /**
     * @function retrieve an item from the data store.
     *
      * @param {String} namespace reference to the map in storage that pairs the object name with the storage id of that object.
     *                            if an name  and context is not provided, then the namespace will be the reference to the object in storage.
     * @param {String} name the name of the object being retrieved. This name is mapped to an id which is used to retrieve the data.
     * @param {String} context a key based off of the current state. It is a reference to a sub object in storage.
     */

  }, {
    key: 'getItem',
    value: function getItem(namespace, name, context) {
      var map = this.convertArgumentsToBitMap(namespace, name, context);
      switch (map) {
        case 7:
          // have a value for namespace, name, context
          {
            var uID = this.addAndGrabNamespaceKey(namespace, name);
            var dataData = this._cacheStorage.getItem(uID);
            var data = dataData ? JSON.parse(dataData) || dataData : null;
            return data && data.context && data.context[context] ? data.context[context] : null;
          }
        case 6:
          // have a value for namespace, name
          {
            var _uID = this.addAndGrabNamespaceKey(namespace, name);
            var _dataData = this._cacheStorage.getItem(_uID);
            var _data = _dataData ? JSON.parse(_dataData) || _dataData : null;
            return _data && _data.data ? _data.data : null;
          }
        case 4:
          // have a value for namespace
          {
            return this._cacheStorage.getItem(namespace);
          }
        default:
          throw new Error(CachingServiceMessages.removeItemError);
      }
    }

    /**
     * @function save an item from the data store.
     *
     * @param {String} namespace reference to the map in storage that pairs the object name with the storage id of that object.
     *                            if an name  and context is not provided, then the namespace will be the reference to the object in storage.
     * @param {String} name the name of the object being retrieved. This name is mapped to an id which is used to retrieve the data.
     * @param {String} context a key based off of the current state. It is a reference to a sub object in storage.
     * @param {Object} item the item to be saved to the data store.
     */

  }, {
    key: 'setItem',
    value: function setItem(namespace, name, context, item) {
      var map = this.convertArgumentsToBitMap(namespace, name, context);
      var uID = namespace;
      switch (map) {
        case 7:
          // have a value for namespace, name, context
          {
            uID = this.addAndGrabNamespaceKey(namespace, name);
            break;
          }
        case 6:
          // have a value for namespace, name
          {
            uID = this.addAndGrabNamespaceKey(namespace, name);
            context = null;
            break;
          }
        case 4:
          // have a value for namespace
          {
            context = null;
            break;
          }
        default:
          throw new Error(CachingServiceMessages.removeItemError);
      }
      this.writeData(uID, item, context);
    }
    /* helper function for getItem*/

  }, {
    key: 'writeData',
    value: function writeData(key, item, context) {
      var foundItem = this._cacheStorage.getItem(key);
      var itemToAdd = context ? { context: {} } : { create: this.timeStamp(), expires: this.expiresStamp() };
      if (context) {
        itemToAdd.context[context + '@'] = this.timeStamp();
        itemToAdd.context[context + '!'] = this.expiresStamp();
      }
      if (foundItem) {
        itemToAdd = JSON.parse(foundItem);
      }
      if (context) {
        itemToAdd.context[context] = item;
      } else {
        itemToAdd.data = item;
      }
      this._cacheStorage.setItem(key, JSON.stringify(itemToAdd));
    }
    /**
     * @function remove an item from the data store.
     *
      * @param {String} namespace reference to the map in storage that pairs the object name with the storage id of that object.
     *                            if an name  and context is not provided, then the namespace will be the reference to the object in storage.
     * @param {String} name the name of the object being retrieved. This name is mapped to an id which is used to retrieve the data.
     * @param {String} context a key based off of the current state. It is a reference to a sub object in storage.
     */

  }, {
    key: 'removeItem',
    value: function removeItem(namespace, name, context) {
      var map = this.convertArgumentsToBitMap(namespace, name, context);
      switch (map) {
        case 7:
          // have a value for namespace, name, context
          {
            var namespaceObj = this._cacheStorage.getItem(namespace);
            if (namespaceObj) {
              var objData = JSON.parse(namespaceObj);
              if (objData.expires && objData.expires < this.timeStamp()) {
                this._cacheStorage.removeItem(name);
              } else {
                if (objData.context) {
                  delete objData.context[context];
                }
                this._cacheStorage.setItem(name, JSON.stringify(objData));
              }
            }
            break;
          }
        case 6:
          // have a value for namespace, name
          {
            var _namespaceObj = this._cacheStorage.getItem(namespace);
            if (_namespaceObj) {
              var _objData = JSON.parse(_namespaceObj);
              if (_objData && _objData.keys) {
                for (var i = 0; i < _objData.keys.length; i++) {
                  var item = _objData.keys[i];
                  if (item && item.name === name) {
                    if (this._cacheStorage.getItem(item.id) != null) {
                      this._cacheStorage.removeItem(item.id);
                    }
                    _objData.keys.splice(i, 1);
                  }
                }
                this._cacheStorage.setItem(namespace, JSON.stringify(_objData));
              }
            }
            break;
          }
        case 4:
          // have a value for namespace
          {
            var keys = this.getNamespaceKeys(namespace);
            if (keys) {
              for (var _i = 0; _i < keys.length; _i++) {
                var _item = keys[_i];
                if (_item && _item.id && this._cacheStorage.getItem(_item.id)) {
                  this._cacheStorage.removeItem(_item.id);
                }
              }
            }
            this._cacheStorage.removeItem(namespace);
            break;
          }
        default:
          throw new Error(CachingServiceMessages.removeItemError);
      }
    }
    /* utility method used for a specific argument pattern used to direct funcitonlity based on arguments provided */

  }, {
    key: 'convertArgumentsToBitMap',
    value: function convertArgumentsToBitMap(namespace, name, context) {
      //eslint-disable-line
      var map = typeof namespace === 'string' ? 1 : 0;
      map = map << 1;
      map = map | (typeof name === 'string' ? 1 : 0);
      map = map << 1;
      map = map | (typeof context === 'string' ? 1 : 0);
      if (map <= 3) {
        // no namespace = error
        throw new Error(CachingServiceMessages.removeItemError);
      }
      if (map === 5) {
        // a context value, but no name = error
        throw new Error(CachingServiceMessages.removeItemError);
      }
      return map;
    }
    /* utility function for getting a UTC timestamp*/

  }, {
    key: 'timeStamp',
    value: function timeStamp() {
      //eslint-disable-line
      var now = new Date();
      return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    }
    /* utility function for getting a UTC timestamp*/

  }, {
    key: 'expiresStamp',
    value: function expiresStamp() {
      //eslint-disable-line
      var expires = new Date(this.timeStamp());
      switch (this.lifespanUnits) {
        case UnitOfTime.YEAR:
          return expires.setYear(expires.getUTCFullYear() + this.lifespan);
        case UnitOfTime.MONTH:
          return expires.setYear(expires.getUTCMonth() + this.lifespan);
        case UnitOfTime.DAY:
          return expires.setYear(expires.getUTCDate() + this.lifespan);
        case UnitOfTime.HOUR:
          return expires.setYear(expires.getUTCHours() + this.lifespan);
        case UnitOfTime.MINUTE:
          return expires.setYear(expires.getUTCMinutes() + this.lifespan);
        case UnitOfTime.SECOND:
          return expires.setYear(expires.getUTCSeconds() + this.lifespan);
        case UnitOfTime.MILLISECOND:
          return expires.setYear(expires.getUTCMilliseconds() + this.lifespan);
        default:
          return expires;
      }
    }
    /* a helper method that controls the id generation logic*/

  }, {
    key: 'uniqueLocalID',
    value: function uniqueLocalID() {
      var date = Date.now();
      // If created at same millisecond as previous
      if (date <= this.seed) {
        date = ++this.seed;
      } else {
        this.seed = date;
      }
      return date;
    }
    /* this helper defines the common task of getting the map of names to id for a provided namespace*/

  }, {
    key: 'getNamespaceKeys',
    value: function getNamespaceKeys(namespace) {
      var namespaceObj = this._cacheStorage.getItem(namespace);
      return JSON.parse(namespaceObj || '{}').keys || null;
    }
    /* a helper that attempts to get the mapped id of an object in a certain namespace.
        If the id does not exist, one is created for the object name and returned*/

  }, {
    key: 'addAndGrabNamespaceKey',
    value: function addAndGrabNamespaceKey(namespace, objectName) {
      var listOfkeys = this.getNamespaceKeys(namespace);
      var uID = null;
      if (listOfkeys) {
        var keyArr = listOfkeys.filter(function (x) {
          return x.name === objectName;
        });
        if (keyArr && keyArr[0] && keyArr[0].id) {
          uID = keyArr[0].id;
        }
      } else {
        listOfkeys = [];
      }
      if (uID === null) {
        uID = this.uniqueLocalID();
        listOfkeys.push({ name: objectName, id: uID });
        this._cacheStorage.setItem(namespace, JSON.stringify({ keys: listOfkeys }));
      }
      return uID;
    }
  }]);

  return CachingService;
}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CultureService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mockSDataCultureClass = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CultureService = exports.CultureService = function () {
  function CultureService() {
    var cacheService = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, CultureService);

    this.cache = cacheService;
    this.activeTag = 'ActiveCodes';
    this.allTag = 'AllCodes';
    this.nameSpace = 'CultureCodes';
    this.neutralTag = 'NeutralCodes';
    this.regionTag = 'RegionCodes';
  }

  _createClass(CultureService, [{
    key: 'getAllCodes',
    value: function getAllCodes(query, params) {
      this.getFromCache(this.allTag, query, params);
    }
  }, {
    key: 'getNeutralCodes',
    value: function getNeutralCodes(query, params) {
      this.getFromCache(this.neutralTag, query, params);
    }
  }, {
    key: 'getRegionCodes',
    value: function getRegionCodes(query, params) {
      this.getFromCache(this.regionTag, query, params);
    }
  }, {
    key: 'getActiveCodes',
    value: function getActiveCodes(query, params) {
      // expects the path, ~/App_Data/LanguageList.xml, to exist on the Request's path. See Sage.SalesLogic.Web.EnabledLanguageList.cs
      this.getFromCache(this.activeTag, query, params);
    }
  }, {
    key: 'getFromCache',
    value: function getFromCache(tag, query, params) {
      var data = this.cache.getItem(this.nameSpace, tag) || null;
      if (!(params || {}).onSuccess) {
        throw new Error('A callback function of onSuccess is expected by the method. Without it no data can be accessed.');
      }
      if (!data) {
        this.createQueryForCodes(query, tag, params);
      } else {
        this.onSuccess(data, tag, this, params.onSuccess);
      }
    }
  }, {
    key: 'createQueryForCodes',
    value: function createQueryForCodes(query, tag, params) {
      var me = this; // incase scope is redefined by param
      if (query === null || typeof query === 'undefined' || (params || {}).Test) {
        console.warn('no request is being made, pulling from mock data'); //eslint-disable-line
        me.onSuccess(new _mockSDataCultureClass.MockSDataCulture().makeRequest(), tag, me, (params || {}).onSuccess);
      } else {
        if (!query.read) {
          throw new Error('The method needs to retrieve data, but the query object is missing the expected \'read\' function.');
        }
        query.read({
          async: true, // <-setting to false causes warning in SlxClient so force it to be true.
          success: function success(data) {
            me.onSuccess(data, tag, me, (params || {}).onSuccess);
          },
          failure: (params || {}).onFail || function onFail(o) {
            console.warn('%o', o);
          }, //eslint-disable-line
          scope: (params || {}).scope || me
        });
      }
    }
  }, {
    key: 'onSuccess',
    value: function onSuccess(data, tag, scope, callback) {
      /* marked as a method that should be static, but is a helper method only used in createQueryForCodes method. */ //eslint-disable-line
      var resource = data.$resources ? data.$resources[0] : data;
      var cultureList = [];
      if (resource.response) {
        var lists = resource.response;
        if (lists.allLanguages) {
          var getResult = this.setAndGetFromCache(scope.cache, scope.nameSpace, scope.allTag, lists.allLanguages, scope.allTag === tag);
          cultureList = getResult === null ? cultureList : getResult;
        }
        if (lists.neutralLanguages) {
          var _getResult = this.setAndGetFromCache(scope.cache, scope.nameSpace, scope.neutralTag, lists.neutralLanguages, scope.neutralTag === tag);
          cultureList = _getResult === null ? cultureList : _getResult;
        }
        if (lists.regionLanguage) {
          var _getResult2 = this.setAndGetFromCache(scope.cache, scope.nameSpace, scope.regionTag, lists.regionLanguage, scope.regionTag === tag);
          cultureList = _getResult2 === null ? cultureList : _getResult2;
        }
        if (lists.activeLanguages) {
          var _getResult3 = this.setAndGetFromCache(scope.cache, scope.nameSpace, scope.activeTag, lists.activeLanguages, scope.activeTag === tag);
          cultureList = _getResult3 === null ? cultureList : _getResult3;
        }
      } else {
        cultureList = resource;
      }
      if (callback) {
        callback(typeof cultureList === 'string' ? JSON.parse(cultureList) : cultureList);
      }
    }
  }, {
    key: 'setAndGetFromCache',
    value: function setAndGetFromCache(cache, nameSpace, tagUsed, data, skipGet) {
      /* marked as a method that should be static, but is a helper method only used in onsucess method. */ //eslint-disable-line
      cache.setItem(nameSpace, tagUsed, null, data);
      return skipGet ? cache.getItem(nameSpace, tagUsed) || [] : null;
    }
  }]);

  return CultureService;
}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Mingle Service class to handle single sign on and other Ming.le functions
 * @class MingleService
 */
var MingleService = exports.MingleService = function () {
  /**
   * Instantiates the MingleService object
   * @param {Object} options Takes in a configuration object with the following structure:
   * {
   *    accessToken: string;
   *    application: Object; // Based on mobile's version of an application
   *    location: Object; // Based on the window.location
   *    mingleConfig: {
   *      mingleSettings: {
   *        ci: string;
   *        pu: string;
   *        oa: string;
   *      },
   *      mingleRedirectUrl: string;
   *    };
   *    redirectAction: function(url: string) => void;
   *    responseType: string; // Defaulted to 'token'
   * }
   */
  function MingleService() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MingleService);

    this.accessToken = options.accessToken || '';
    this.application = options.application || {};
    this.location = options.location || window.location;
    this.mingleConfig = options.mingleConfig || {};
    this.redirectAction = options.redirectAction || function redirect(url) {
      this.location.href = url;
    }.bind(this);
    this.responseType = options.responseType || 'token';
  }
  /**
   * @function Populates the access token based on the passed parameters
   * @param {Object} state The current state to be bound to the url request
   */


  _createClass(MingleService, [{
    key: 'redirectToMingle',
    value: function redirectToMingle(state) {
      var authorizationUrl = this.mingleConfig.mingleSettings.pu + this.mingleConfig.mingleSettings.oa;
      var redirectURI = this.mingleConfig.mingleRedirectUrl;
      var clientId = this.mingleConfig.mingleSettings.ci;
      var url = authorizationUrl + '?' + ('client_id=' + encodeURI(clientId) + '&') + ('redirect_uri=' + encodeURI(redirectURI) + '&') + ('response_type=' + encodeURI(this.responseType) + '&') + ('state=' + encodeURI(state) + '&') + 'include_granted_scopes=false';
      this.redirectAction(url);
    }
    /**
     * @function Refreshes the access token for Ming.le
     */

  }, {
    key: 'refreshAccessToken',
    value: function refreshAccessToken() {
      if (!this.application.isOnline()) {
        this.application.requiresMingleRefresh = true;
        return;
      }

      var hash = 'mingleRefresh'; // location.hash.substring(2);
      var state = '';
      if (hash) {
        state = '/redirectTo/' + hash;
      }
      this.redirectToMingle(state);
    }
    /**
     * @function Populates the access token based on the passed parameters
     * @param {Object} toast The toast service used by the application, expects a function 'add'
     *  that is passed the following object:
     *    {
     *      message: string;
     *      title: string;
     *      toastTime: number;
     *      showProgressBar: boolean;
     *    }
     * @param {string} refreshText The message to be displayed by the toast service
     * @param {string} refreshTitle The title of the toast to display when refreshing the token
     */

  }, {
    key: 'populateAccessToken',
    value: function populateAccessToken(toast) {
      var _this = this;

      var refreshText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Refreshing Ming.le token...';
      var refreshTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Ming.le';

      var hash = this.location.hash.substring(1);
      var result = void 0;
      if (hash) {
        result = hash.split('&').reduce(function (values, item) {
          var parts = item.split('=');
          values[parts[0]] = parts[1];
          return values;
        }, {});

        if (result.access_token) {
          this.accessToken = result.access_token;
          if (result.expires_in) {
            // result.expires_in = '420'; // Refresh Test
            setTimeout(function () {
              toast.add({ message: refreshText, title: refreshTitle, toastTime: 300 * 1000, showProgressBar: true });
              setTimeout(function () {
                _this.refreshAccessToken(_this.mingleConfig);
              }, 300 * 1000);
              // Show message to user before 5 minutes of refresh (300 seconds)
            }, (result.expires_in - 300) * 1000);
          }
        }
      }

      if (result) {
        if (result.access_token || result.error) {
          return result;
        }
      }

      this.redirectToMingle(hash);
    }
  }]);

  return MingleService;
}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Picklist Service class
 */
var PickListService = exports.PickListService = function () {
  /**
   * Initialize Sage.PickListService
   * @param {Object} storage
   * @param {Object} service
   */
  function PickListService() {
    var storage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var service = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, PickListService);

    this._storage = storage;
    this._service = service;
    this._uri = {};
    this._storageNameSpace = 'PickListData';
    this._storagePropertyDataTypeNameSpace = 'PickListData_PropertyDataType';
    this._storageFormDataTypeNameSpace = 'PickListData_FormDataType';
  }
  /** CRUD **/
  /** Create **/
  /**
   * @function create a picklist header record.
   * @param {PickListObject} header
   * @param {Function} callback defines how to react to a repsonse that is successful.
   * @param {Function} onError defines how to react to a repsonse that is an error.
   * @param {Object} config provides access to variables needed inside the response.
   */


  _createClass(PickListService, [{
    key: 'createHeader',
    value: function createHeader(header, callback, onError, config) {
      this._notImplemented('createHeader', { header: header, callback: callback, onError: onError, config: config });
    }
    /**
     * @function create a picklist item record.
     * @param {String} headerId refers to a picklist header by its id.
     * @param {PickListItemObject} item
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'createItemByHeaderID',
    value: function createItemByHeaderID(headerId, item, callback, onError, config) {
      this.createItemByHeaderKey(headerId, true, item, callback, onError, config);
    }
    /**
     * @function create a picklist item record.
     * @param {String} headerName refers to a picklist header by its name.
     * @param {PickListItemObject} item
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'createItemByHeaderName',
    value: function createItemByHeaderName(headerName, item, callback, onError, config) {
      this.createItemByHeaderKey(headerName, false, item, callback, onError, config);
    }
    /**
     * @function create a picklist item record.
     * @param {String} headerKey refers to a picklist by either the Id or Name value.
     * @param {Boolean} isId true ? the headerKey is an Id : the headerKey is a Name
     * @param {PickListItemObject} item
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'createItemByHeaderKey',
    value: function createItemByHeaderKey(headerKey, isId, item, callback, onError, config) {
      this._notImplemented('createItemByHeaderKey', { headerKey: headerKey, isId: isId, item: item, callback: callback, onError: onError, config: config });
    }
    /**
     * @function create a picklist item record.
     * @param {String} headerId refers to a picklist header by its id.
     * @param {PickListItemObject[]} itemArr
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'createItemsByHeaderID',
    value: function createItemsByHeaderID(headerId, itemArr, callback, onError, config) {
      this.createItemsByHeaderKey(headerId, true, itemArr, callback, onError, config);
    }
    /**
     * @function create a picklist item record.
     * @param {String} headerName refers to a picklist header by its name.
     * @param {PickListItemObject[]} itemArr
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'createItemsByHeaderName',
    value: function createItemsByHeaderName(headerName, itemArr, callback, onError, config) {
      this.createItemsByHeaderKey(headerName, false, itemArr, callback, onError, config);
    }
    /**
     * @function create a picklist item record.
     * @param {String} headerKey refers to a picklist by either the Id or Name value.
     * @param {Boolean} isId true ? the headerKey is an Id : the headerKey is a Name
     * @param {PickListItemObject[]} itemArr
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'createItemsByHeaderKey',
    value: function createItemsByHeaderKey(headerKey, isId, itemArr, callback, onError, config) {
      this._notImplemented('createItemsByHeaderKey', { headerKey: headerKey, isId: isId, itemArr: itemArr, callback: callback, onError: onError, config: config });
    }

    /** Request **/
    /** header and items **/
    /**
     * @function get one picklist(this first found) record with items.
     * @param {String} name refers to the name property of a picklist header.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'getFirstByName',
    value: function getFirstByName(name, callback, onError, config) {
      return this.getFirstByKey(name, false, callback, onError, config);
    }
    /**
     * @function get one picklist(this first found) record with items.
     * @param {String} id refers to the id property of a picklist header.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'getFirstById',
    value: function getFirstById(id, callback, onError, config) {
      return this.getFirstByKey(id, false, callback, onError, config);
    }
    /**
     * @function get one picklist(this first found) record with items.
     * @param {String} key refers to a picklist by either the Id or Name value.
     * @param {Boolean} isId if true, then the key is an Id, else the key is a Name.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'getFirstByKey',
    value: function getFirstByKey(key, isId, callback, onError) {
      var _this = this,
          _arguments = arguments;

      var config = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      config.language = config.language || this._getBrowserLanguage(false);
      var useCache = typeof config.useCache === 'boolean' && config.useCache;
      var cachedResult = useCache ? this._storage.getItem(this._storageNameSpace, key, config.context || null) : null;
      if (cachedResult) {
        callback(cachedResult);
      } else {
        var options = this._buildOutOptions(config, true);
        options.where = this._isNameOrID(isId, key);
        return {
          options: options,
          handlers: {
            async: typeof config.async === 'boolean' ? config.async : true, // adding back for slxClient's column formatters, they need the call to not be async to work.
            success: function success(result) {
              if (result && result.$resources && result.$resources.length > 0) {
                result = result.$resources[0];
              }
              _this._storage.setItem(_this._storageNameSpace, key, config.context || null, result);
              if (typeof callback === 'function') {
                callback(result);
              } else {
                console.log('picklistservice getByName success: %o', _arguments); //eslint-disable-line
              }
            },
            failure: function failure(response) {
              if (typeof onError === 'function') {
                onError(response);
              } else {
                console.log('picklistservice getByName failure: %o', _arguments); //eslint-disable-line
              }
            },
            config: { passedIn: config }
          }
        };
      }
    }
    /**
     * @function get a list of picklists record with items.
     * @param {String[]} nameArr refers to the name property of a picklist header.
     * @param {Boolean} useCache if true, then cache the response of the request, else don't cache the response.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'getAllByName',
    value: function getAllByName(nameArr, callback, onError, config) {
      this.getAllByKey(nameArr, false, callback, onError, config);
    }
    /**
     * @function get a list of picklists record with items.
     * @param {String[]} idArr refers to the id property of a picklist header.
     * @param {Boolean} useCache if true, then cache the response of the request, else don't cache the response.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'getAllById',
    value: function getAllById(idArr, callback, onError, config) {
      this.getAllByKey(idArr, true, callback, onError, config);
    }
    /**
     * @function get a list of picklists record with items.
     * @param {String} keyArr refers to a picklist by either the Id or Name value.
     * @param {Boolean} isId if true, then the key is an Id, else the key is a Name.
     * @param {Boolean} useCache if true, then cache the response of the request, else don't cache the response.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'getAllByKey',
    value: function getAllByKey(keyArr, isId, callback, onError, config) {
      this._notImplemented('getAllByKey', { keyArr: keyArr, isId: isId, callback: callback, onError: onError, config: config });
    }

    /** Update **/
    /**
     * @function update a picklist record.
     * @param {PickListObject} pickList
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'update',
    value: function update(pickList, callback, onError, config) {
      this._notImplemented('update', { pickList: pickList, callback: callback, onError: onError, config: config });
    }

    /** Delete **/
    /** header and items **/
    /**
     * @function remove a picklist header and its items record.
     * @param {String} name refers to the name property of a picklist header.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'deleteByName',
    value: function deleteByName(name, callback, onError, config) {
      this.deleteByKey(name, false, callback, onError, config);
    }
    /**
     * @function remove a picklist header and its items record.
     * @param {String} name refers to the id property of a picklist header.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'deleteById',
    value: function deleteById(id, callback, onError, config) {
      this.deleteByKey(id, true, callback, onError, config);
    }
    /**
     * @function remove a picklist header and its items record.
     * @param {String} key refers to a picklist by either the Id or Name value.
     * @param {Boolean} isId if true, then the key is an Id, else the key is a Name.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'deleteByKey',
    value: function deleteByKey(key, isId, callback, onError, config) {
      this._notImplemented('deleteByKey', { key: key, isId: isId, callback: callback, onError: onError, config: config });
    }

    /** No just header delete, because that would produce "orphaned" picklist items **/

    /** just items **/
    /**
     * @function remove a picklist item record.
     * @param {String} name refers to the name property of a picklist header.
     * @param {String} code refers to the code property of a picklist item.
     * @param {String} language refers to the language property of a picklist item.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'deleteItemByHeaderName',
    value: function deleteItemByHeaderName(name, code, language, callback, onError, config) {
      this.deleteItemByHeaderKey(name, false, code, language, callback, onError, config);
    }
    /**
     * @function remove a picklist item record.
     * @param {String} id refers to the id property of a picklist header.
     * @param {String} code refers to the code property of a picklist item.
     * @param {String} language refers to the language property of a picklist item.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'deleteItemByHeaderId',
    value: function deleteItemByHeaderId(id, code, language, callback, onError, config) {
      this.deleteItemByHeaderKey(id, true, code, language, callback, onError, config);
    }
    /**
     * @function remove a picklist item record.
     * @param {String} key refers to the id or name property of a picklist header.
     * @param {Boolean} isId if true, then the key is an Id, else the key is a Name.
     * @param {String} code refers to the code property of a picklist item.
     * @param {String} language refers to the language property of a picklist item.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'deleteItemByHeaderKey',
    value: function deleteItemByHeaderKey(key, isId, code, language, callback, onError, config) {
      this._notImplemented('deleteItemByHeaderKey', { key: key, isId: isId, code: code, language: language, callback: callback, onError: onError, config: config });
    }
    /**
     * @function remove a picklist item record.
     * @param {String} key refers to the id property of a picklist item.
     * @param {Function} callback defines how to react to a repsonse that is successful.
     * @param {Function} onError defines how to react to a repsonse that is an error.
     * @param {Object} config provides access to variables needed inside the response.
     */

  }, {
    key: 'deleteItemById',
    value: function deleteItemById(id, callback, onError, config) {
      this._notImplemented('deleteItemById', { id: id, callback: callback, onError: onError, config: config });
    }

    /** Getting PickList DataTypeData information */

  }, {
    key: 'getPickListDataTypeDataFromEntityProperty',
    value: function getPickListDataTypeDataFromEntityProperty(entityName, propertyName, callback, onError, config) {
      var _this2 = this,
          _arguments2 = arguments;

      config.language = config.language || this._getBrowserLanguage(false);
      var cachedToken = entityName + '_' + propertyName + '_' + config.language;
      var cachedResult = this._storage.getItem(this._storagePropertyDataTypeNameSpace, cachedToken);
      if (cachedResult) {
        callback(cachedResult);
      } else {
        return {
          options: {
            select: ['DataTypeData'],
            resourceKind: 'entities(\'' + entityName + '\')/properties',
            service: 'metadata',
            language: config.language || this._getBrowserLanguage(false),
            filterByLanguage: config.filterByLanguage || false,
            include: ['DataTypeData'],
            where: 'propertyName eq \'' + propertyName + '\''
          },
          handlers: {
            success: function success(result) {
              if (result && result.$resources && result.$resources.length > 0) {
                result = result.$resources[0];
              }
              _this2.parent._storage.setItem(_this2.parent._storageDataTypeNameSpace, cachedToken, result);
              if (typeof callback === 'function') {
                callback(result);
              } else {
                console.log('picklistservice getPickListDataTypeDataFromEntityProperty success: %o', _arguments2); //eslint-disable-line
              }
            },
            failure: function failure(response) {
              if (typeof onError === 'function') {
                onError(response);
              } else {
                console.log('picklistservice getPickListDataTypeDataFromEntityProperty failure: %o', _arguments2); //eslint-disable-line
              }
            },
            config: { parent: this, passedIn: config }
          }
        };
      }
    }
  }, {
    key: 'getPickListDataTypeDataFromForm',
    value: function getPickListDataTypeDataFromForm(formName) {
      var pickListName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var callback = arguments[2];

      var _this3 = this,
          _arguments3 = arguments;

      var onError = arguments[3];
      var config = arguments[4];

      config.language = config.language || this._getBrowserLanguage(false);
      var cachedToken = pickListName ? formName + '_' + pickListName + '_' + config.language : formName + '_' + config.language;
      var cachedResult = this._storage.getItem(this._storageFormDataTypeNameSpace, cachedToken);
      if (cachedResult) {
        callback(cachedResult);
      } else {
        return {
          options: {
            resourceKind: 'forms(\'' + formName + '\')',
            service: 'metadata',
            language: config.language || this._getBrowserLanguage(false)
          },
          handlers: {
            success: function success(result) {
              if (result && result.$resources && result.$resources.length > 0) {
                result = result.$resources[0];
              }
              _this3.parent._storage.setItem(_this3.parent._storageFormDataTypeNameSpace, cachedToken, result);
              if (typeof callback === 'function') {
                callback(result);
              } else {
                console.log('picklistservice getPickListDataTypeDataFromForm success: %o', _arguments3); //eslint-disable-line
              }
            },
            failure: function failure(response) {
              if (typeof onError === 'function') {
                onError(response);
              } else {
                console.log('picklistservice getPickListDataTypeDataFromForm failure: %o', _arguments3); //eslint-disable-line
              }
            },
            config: { parent: this, passedIn: config }
          }
        };
      }
    }
    /** Caching **/
    /**
     * @function removes a cached item.
     * @param {String} name reference to an item that has been cached.
     *
     * --Uses the storage value provided in the constructor.
     */

  }, {
    key: 'clearCache',
    value: function clearCache(name, lang) {
      var item = this._storage.getItem(this._storageNameSpace, name);
      if (item) {
        this._storage.removeItem(this._storageNameSpace, name);
      }
    }

    /** MISC **/
    /**
     * @function clones the this class.
     */

  }, {
    key: 'deepClone',
    value: function deepClone() {
      return JSON.parse(JSON.stringify(this));
    }
    /**
     * @function build up a request
     * @param {Object} obj needs to contain the functions:
     *                      setResourceKind()
     *                      setQueryArg()
     *
     * @param {Object} options can contain
     *                      {
     *                          where: String?
     *                          select: String?
     *                          include: Boolean?
     *                          language: String?
     *                          filterByLanguage: Boolean?
     *                          storageMode: {CODE, ID, TEXT}
     *                      }
     */

  }, {
    key: 'setUpRequest',
    value: function setUpRequest(obj, options) {
      /* though this could be a static function, that does not seem right since it is not much use outside this config*/ //eslint-disable-line 
      if (obj && options) {
        if (typeof obj.setResourceKind === 'function' && typeof obj.setQueryArg === 'function') {
          obj.setResourceKind(options.resourceKind);

          if (options.where && options.where.length > 0) {
            obj.setQueryArg('where', options.where);
          }
          if (options.select && options.select.length > 0) {
            obj.setQueryArg('select', options.select.join(','));
          }
          if (options.include && options.include.length > 0) {
            obj.setQueryArg('include', options.include.join(','));
          }
          if (options.language) {
            obj.setQueryArg('language', options.language);
          }
          if (options.filter) {
            // for testing
            obj.setQueryArg('filter', options.filter);
          }
          if (options.filterByLanguage !== undefined) {
            obj.setQueryArg('filterByLanguage', options.filterByLanguage);
          }
          if (options.storageMode) {
            obj.setQueryArg('storageMode', options.storageMode);
          }
        } else {
          console.warn('argument is the wrong type: %o', obj); //eslint-disable-line
        }
      } else {
        console.warn('arguments cannot be null'); //eslint-disable-line
      }
      return obj;
    }

    /* ** private functions **/

  }, {
    key: '_buildHash',
    value: function _buildHash(results) {
      this._notImplemented('_buildHash', { results: results });
    }
  }, {
    key: '_returnOption',
    value: function _returnOption(optionName, callback, onError, config) {
      this._notImplemented('_returnOption', { optionName: optionName, callback: callback, onError: onError, config: config });
    }
  }, {
    key: '_isNameOrID',
    value: function _isNameOrID(isId, key) {
      /* though this could be a static function, that does not seem right since it is not much use outside this config*/ //eslint-disable-line
      if (typeof isId === 'boolean' && typeof key === 'string') {
        return isId ? 'id eq \'' + key + '\'' : 'name eq \'' + key + '\'';
      }
      throw new Error('isId needs to be a boolean; key needs to be a string');
    }
  }, {
    key: '_buildOutOptions',
    value: function _buildOutOptions() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var includeItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var optionsObj = {
        select: ['Id', 'name', 'allowMultiples', 'valueMustExist', 'required', 'alphaSorted', 'noneEditable', 'defaultLanguage', 'defaultCode',
        // Include modifyDate to ensure that local storage data stays current.
        'modifyDate'],
        resourceKind: 'picklists',
        service: this._service,
        language: config.language || this._getBrowserLanguage(false)
      };
      if (includeItems) {
        optionsObj.include = ['items'];
        optionsObj.select.push('items/text');
        optionsObj.select.push('items/code');
        optionsObj.select.push('items/number');
        optionsObj.select.push('items/filter');
        optionsObj.select.push('items/languageCode');
      }
      if (config.pickListServiceOptions) {
        if (config.pickListServiceOptions.filter !== null && typeof config.pickListServiceOptions.filter === 'string') {
          optionsObj.filter = config.pickListServiceOptions.filter;
        }
        if (config.pickListServiceOptions.storageMode !== null && typeof config.pickListServiceOptions.storageMode === 'string') {
          optionsObj.storageMode = config.pickListServiceOptions.storageMode;
        }
        if (config.pickListServiceOptions.filterByLanguage !== null) {
          if (typeof config.pickListServiceOptions.filterByLanguage === 'boolean') {
            optionsObj.filterByLanguage = config.pickListServiceOptions.filterByLanguage;
          } else if (typeof config.pickListServiceOptions.filterByLanguage === 'string') {
            optionsObj.filterByLanguage = config.pickListServiceOptions.filterByLanguage.toLowerCase() === 'true'; // default behavior is false, so assume user will only set if true
          }
        }
      }
      return optionsObj;
    }
  }, {
    key: '_breakDownALanguageCodeIntoFallBackParts',
    value: function _breakDownALanguageCodeIntoFallBackParts() {
      var strLangCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      /* though this could be a static function, it is a private helper function that works strictly within the config of _getBrowserLanguage*/ //eslint-disable-line
      var userLangs = strLangCode.split('-');
      var potentialLanguage = [];
      for (var i = 0; i < userLangs.length; i++) {
        var strVal = '';
        for (var j = 0; j <= i; j++) {
          strVal = strVal + (strVal.length > 0 ? '_' : '') + userLangs[j];
        }
        potentialLanguage.push(strVal);
      }
      return potentialLanguage;
    }
  }, {
    key: '_getBrowserLanguage',
    value: function _getBrowserLanguage() {
      var includeFallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var languageFromCookie = this._getLanguageFromCookie();
      var userLang = languageFromCookie || this._getFromLanguageFromNavigator();
      if (!userLang) {
        console.warn('no browser language found, will assume en-us for the rest.'); /* give warning because something went wrong... or in test enviroment */ //eslint-disable-line
        userLang = 'en-us';
      }
      if (includeFallbacks) {
        var languagePlusFallBacks = this._breakDownALanguageCodeIntoFallBackParts(userLang);
        return languagePlusFallBacks;
      }
      return userLang;
    }
  }, {
    key: '_getFromLanguageFromNavigator',
    value: function _getFromLanguageFromNavigator() {
      /* does not need to reference this, it is a helper for _getBrowserLanguage */ //eslint-disable-line
      if (typeof navigator !== 'undefined') {
        return navigator.userLanguage || navigator.browserLanguage || navigator.language;
      }
      console.warn('no navigator object found. hardcoding language to en-us'); /* give warning because something went wrong... or in test enviroment */ //eslint-disable-line
      return null;
    }
  }, {
    key: '_getLanguageFromCookie',
    value: function _getLanguageFromCookie() {
      var languageFromCookie = null;
      var cookieLangaugeKey = 'SLXLanguageSetting';
      if (typeof window !== 'undefined' && window.document && window.document.cookie) {
        if (typeof window.document.cookie.getCookie === 'function') {
          languageFromCookie = window.document.cookie.getCookie(cookieLangaugeKey);
        } else {
          var cookies = window.document.cookie.split(';');
          cookies.forEach(function (cookie) {
            cookie = cookie.trim();
            if (cookie.startsWith(cookieLangaugeKey)) {
              cookie = cookie.replace('' + cookieLangaugeKey, '').trim(); // remove the key part of the cookie and any spaces
              cookie = cookie.replace('=', '').trim(); // because there may or may not be a space between the key and '=', then remove now.
              languageFromCookie = cookie;
            }
          }, this);
        }
      } else {
        console.warn('no window/window.document/window.document.cookie object found'); /* give warning because something went wrong... or in test enviroment */ //eslint-disable-line
      }
      return languageFromCookie;
    }
  }, {
    key: '_notImplemented',
    value: function _notImplemented(functionName, params) {
      /* a function to give the unimplemented functions a call to hush lint errors*/ //eslint-disable-line
      throw new Error('%s with parameters %o is not implemented', functionName, params);
    }
  }]);

  return PickListService;
}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MockSDataCulture = exports.MockSDataCulture = function () {
  function MockSDataCulture() {
    _classCallCheck(this, MockSDataCulture);

    this.queryResult = {
      $httpStatus: 200,
      $descriptor: '',
      request: {},
      response: {
        neutralLanguages: [{ DisplayText: 'æ—¥æœ¬èªž [ja]', CultureCode: 'ja' }, { DisplayText: 'ä¸­æ–‡(ç¹é«”) èˆŠç‰ˆ [zh-cht]', CultureCode: 'zh-cht' }, { DisplayText: 'ä¸­æ–‡(ç¹é«”) [zh-hant]', CultureCode: 'zh-hant' }, { DisplayText: 'ä¸­æ–‡(ç®€ä½“) æ—§ç‰ˆ [zh-chs]', CultureCode: 'zh-chs' }, { DisplayText: 'ä¸­æ–‡(ç®€ä½“) [zh-hans]', CultureCode: 'zh-hans' }, { DisplayText: 'ä¸­æ–‡ [zh]', CultureCode: 'zh' }, { DisplayText: 'í•œêµ­ì–´ [ko]', CultureCode: 'ko' }, { DisplayText: 'ê†ˆêŒ ê±ê‚· [ii]', CultureCode: 'ii' }, { DisplayText: 'áŠ áˆ›áˆ­áŠ› [am]', CultureCode: 'am' }, { DisplayText: 'áƒá“„á’ƒá‘Žá‘á‘¦ [iu-cans]', CultureCode: 'iu-cans' }, { DisplayText: 'ážáŸ’áž˜áŸ‚ážš [km]', CultureCode: 'km' }, { DisplayText: 'àº¥àº²àº§ [lo]', CultureCode: 'lo' }, { DisplayText: 'à½–à½¼à½‘à¼‹à½¡à½²à½‚ [bo]', CultureCode: 'bo' }, { DisplayText: 'á ®á ¤á ¨á ­á ­á ¤á ¯ á ¬á ¡á ¯á ¡ [mn-mong]', CultureCode: 'mn-mong' }, { DisplayText: 'à¹„à¸—à¸¢ [th]', CultureCode: 'th' }, { DisplayText: 'à·ƒà·’à¶‚à·„à¶½ [si]', CultureCode: 'si' }, { DisplayText: 'à´®à´²à´¯à´¾à´³à´‚ [ml]', CultureCode: 'ml' }, { DisplayText: 'à²•à²¨à³à²¨à²¡ [kn]', CultureCode: 'kn' }, { DisplayText: 'à°¤à±†à°²à±à°—à± [te]', CultureCode: 'te' }, { DisplayText: 'à®¤à®®à®¿à®´à¯ [ta]', CultureCode: 'ta' }, { DisplayText: 'à¬“à­œà¬¿à¬† [or]', CultureCode: 'or' }, { DisplayText: 'àª—à«àªœàª°àª¾àª¤à«€ [gu]', CultureCode: 'gu' }, { DisplayText: 'à¨ªà©°à¨œà¨¾à¨¬à©€ [pa]', CultureCode: 'pa' }, { DisplayText: 'à¦¬à¦¾à¦‚à¦²à¦¾ [bn]', CultureCode: 'bn' }, { DisplayText: 'à¦…à¦¸à¦®à§€à§Ÿà¦¾ [as]', CultureCode: 'as' }, { DisplayText: 'à¤¹à¤¿à¤‚à¤¦à¥€ [hi]', CultureCode: 'hi' }, { DisplayText: 'à¤¸à¤‚à¤¸à¥à¤•à¥ƒà¤¤ [sa]', CultureCode: 'sa' }, { DisplayText: 'à¤®à¤°à¤¾à¤ à¥€ [mr]', CultureCode: 'mr' }, { DisplayText: 'à¤¨à¥‡à¤ªà¤¾à¤²à¥€ [ne]', CultureCode: 'ne' }, { DisplayText: 'à¤•à¥‹à¤‚à¤•à¤£à¥€ [kok]', CultureCode: 'kok' }, { DisplayText: 'Þ‹Þ¨ÞˆÞ¬Þ€Þ¨Þ„Þ¦ÞÞ° [dv]', CultureCode: 'dv' }, { DisplayText: 'Ü£Ü˜ÜªÜÜÜ [syr]', CultureCode: 'syr' }, { DisplayText: 'Ø¦Û‡ÙŠØºÛ‡Ø±Ú†Û• [ug]', CultureCode: 'ug' }, { DisplayText: 'ÙØ§Ø±Ø³Ù‰ [fa]', CultureCode: 'fa' }, { DisplayText: 'Ø¯Ø±Ù‰ [prs]', CultureCode: 'prs' }, { DisplayText: 'Ù¾ÚšØªÙˆ [ps]', CultureCode: 'ps' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© [ar]', CultureCode: 'ar' }, { DisplayText: 'Ø§ÙØ±Ø¯Ùˆ [ur]', CultureCode: 'ur' }, { DisplayText: '×¢×‘×¨×™×ª [he]', CultureCode: 'he' }, { DisplayText: 'áƒ¥áƒáƒ áƒ—áƒ£áƒšáƒ˜ [ka]', CultureCode: 'ka' }, { DisplayText: 'Õ€Õ¡ÕµÕ¥Ö€Õ¥Õ¶ [hy]', CultureCode: 'hy' }, { DisplayText: 'ÑƒÐºÑ€Ð°Ñ—Ð½ÑÑŒÐºÐ° [uk]', CultureCode: 'uk' }, { DisplayText: 'ÐŽÐ·Ð±ÐµÐº [uz-cyrl]', CultureCode: 'uz-cyrl' }, { DisplayText: 'Ð¢Ð¾Ò·Ð¸ÐºÓ£ [tg-cyrl]', CultureCode: 'tg-cyrl' }, { DisplayText: 'Ð¢Ð¾Ò·Ð¸ÐºÓ£ [tg]', CultureCode: 'tg' }, { DisplayText: 'Ð¢Ð°Ñ‚Ð°Ñ€ [tt]', CultureCode: 'tt' }, { DisplayText: 'ÑÑ€Ð¿ÑÐºÐ¸ [sr-cyrl]', CultureCode: 'sr-cyrl' }, { DisplayText: 'ÑÐ°Ñ…Ð° [sah]', CultureCode: 'sah' }, { DisplayText: 'Ñ€ÑƒÑÑÐºÐ¸Ð¹ [ru]', CultureCode: 'ru' }, { DisplayText: 'ÐœÐ¾Ð½Ð³Ð¾Ð»Â Ñ…ÑÐ» [mn-cyrl]', CultureCode: 'mn-cyrl' }, { DisplayText: 'ÐœÐ¾Ð½Ð³Ð¾Ð»Â Ñ…ÑÐ» [mn]', CultureCode: 'mn' }, { DisplayText: 'Ð¼Ð°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸ Ñ˜Ð°Ð·Ð¸Ðº [mk]', CultureCode: 'mk' }, { DisplayText: 'ÒšÐ°Ð·Ð°Ò› [kk]', CultureCode: 'kk' }, { DisplayText: 'ÐšÑ‹Ñ€Ð³Ñ‹Ð· [ky]', CultureCode: 'ky' }, { DisplayText: 'Ð±ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸ [bg]', CultureCode: 'bg' }, { DisplayText: 'Ð±Ð¾ÑÐ°Ð½ÑÐºÐ¸ [bs-cyrl]', CultureCode: 'bs-cyrl' }, { DisplayText: 'Ð‘ÐµÐ»Ð°Ñ€ÑƒÑÐºÑ– [be]', CultureCode: 'be' }, { DisplayText: 'Ð‘Ð°ÑˆÒ¡Ð¾Ñ€Ñ‚ [ba]', CultureCode: 'ba' }, { DisplayText: 'ÐÐ·Ó™Ñ€Ð±Ð°Ñ˜Ò¹Ð°Ð½Â Ð´Ð¸Ð»Ð¸ [az-cyrl]', CultureCode: 'az-cyrl' }, { DisplayText: 'Î•Î»Î»Î·Î½Î¹ÎºÎ¬ [el]', CultureCode: 'el' }, { DisplayText: 'Yoruba [yo]', CultureCode: 'yo' }, { DisplayText: 'Wolof [wo]', CultureCode: 'wo' }, { DisplayText: 'U\'zbek [uz-latn]', CultureCode: 'uz-latn' }, { DisplayText: 'U\'zbek [uz]', CultureCode: 'uz' }, { DisplayText: 'tÃ¼rkmenÃ§e [tk]', CultureCode: 'tk' }, { DisplayText: 'TÃ¼rkÃ§e [tr]', CultureCode: 'tr' }, { DisplayText: 'TiÃªÌng Viá»‡t [vi]', CultureCode: 'vi' }, { DisplayText: 'Tamazight [tzm-latn]', CultureCode: 'tzm-latn' }, { DisplayText: 'Tamazight [tzm]', CultureCode: 'tzm' }, { DisplayText: 'svenska [sv]', CultureCode: 'sv' }, { DisplayText: 'suomi [fi]', CultureCode: 'fi' }, { DisplayText: 'srpski [sr-latn]', CultureCode: 'sr-latn' }, { DisplayText: 'srpski [sr]', CultureCode: 'sr' }, { DisplayText: 'slovenski [sl]', CultureCode: 'sl' }, { DisplayText: 'slovenÄina [sk]', CultureCode: 'sk' }, { DisplayText: 'shqipe [sq]', CultureCode: 'sq' }, { DisplayText: 'Setswana [tn]', CultureCode: 'tn' }, { DisplayText: 'Sesotho sa Leboa [nso]', CultureCode: 'nso' }, { DisplayText: 'sÃ¤mikielÃ¢ [smn]', CultureCode: 'smn' }, { DisplayText: 'sÃ¤Ã¤mÂ´Ç©iÃµll [sms]', CultureCode: 'sms' }, { DisplayText: 'runasimi [quz]', CultureCode: 'quz' }, { DisplayText: 'Rumantsch [rm]', CultureCode: 'rm' }, { DisplayText: 'romÃ¢nÄƒ [ro]', CultureCode: 'ro' }, { DisplayText: 'Reo MÄori [mi]', CultureCode: 'mi' }, { DisplayText: 'PortuguÃªs [pt]', CultureCode: 'pt' }, { DisplayText: 'polski [pl]', CultureCode: 'pl' }, { DisplayText: 'Occitan [oc]', CultureCode: 'oc' }, { DisplayText: 'norsk [no]', CultureCode: 'no' }, { DisplayText: 'norsk (nynorsk) [nn]', CultureCode: 'nn' }, { DisplayText: 'norsk (bokmÃ¥l) [nb]', CultureCode: 'nb' }, { DisplayText: 'Nederlands [nl]', CultureCode: 'nl' }, { DisplayText: 'Mapudungun [arn]', CultureCode: 'arn' }, { DisplayText: 'Malti [mt]', CultureCode: 'mt' }, { DisplayText: 'magyar [hu]', CultureCode: 'hu' }, { DisplayText: 'lietuviÅ³ [lt]', CultureCode: 'lt' }, { DisplayText: 'LÃ«tzebuergesch [lb]', CultureCode: 'lb' }, { DisplayText: 'latvieÅ¡u [lv]', CultureCode: 'lv' }, { DisplayText: 'Kiswahili [sw]', CultureCode: 'sw' }, { DisplayText: 'Kinyarwanda [rw]', CultureCode: 'rw' }, { DisplayText: 'K\'iche [qut]', CultureCode: 'qut' }, { DisplayText: 'Kanien\'kÃ©ha [moh]', CultureCode: 'moh' }, { DisplayText: 'kalaallisut [kl]', CultureCode: 'kl' }, { DisplayText: 'julevusÃ¡megiella [smj]', CultureCode: 'smj' }, { DisplayText: 'italiano [it]', CultureCode: 'it' }, { DisplayText: 'Ã­slenska [is]', CultureCode: 'is' }, { DisplayText: 'isiZulu [zu]', CultureCode: 'zu' }, { DisplayText: 'isiXhosa [xh]', CultureCode: 'xh' }, { DisplayText: 'Invariant Language (Invariant Country) []', CultureCode: '' }, { DisplayText: 'Inuktitut [iu-latn]', CultureCode: 'iu-latn' }, { DisplayText: 'Inuktitut [iu]', CultureCode: 'iu' }, { DisplayText: 'Igbo [ig]', CultureCode: 'ig' }, { DisplayText: 'hrvatski [hr]', CultureCode: 'hr' }, { DisplayText: 'hornjoserbÅ¡Ä‡ina [hsb]', CultureCode: 'hsb' }, { DisplayText: 'Hausa [ha-latn]', CultureCode: 'ha-latn' }, { DisplayText: 'Hausa [ha]', CultureCode: 'ha' }, { DisplayText: 'galego [gl]', CultureCode: 'gl' }, { DisplayText: 'GÃ idhlig [gd]', CultureCode: 'gd' }, { DisplayText: 'Gaeilge [ga]', CultureCode: 'ga' }, { DisplayText: 'Frysk [fy]', CultureCode: 'fy' }, { DisplayText: 'franÃ§ais [fr]', CultureCode: 'fr' }, { DisplayText: 'fÃ¸royskt [fo]', CultureCode: 'fo' }, { DisplayText: 'Filipino [fil]', CultureCode: 'fil' }, { DisplayText: 'euskara [eu]', CultureCode: 'eu' }, { DisplayText: 'espaÃ±ol [es]', CultureCode: 'es' }, { DisplayText: 'English [en]', CultureCode: 'en' }, { DisplayText: 'ElsÃ¤ssisch [gsw]', CultureCode: 'gsw' }, { DisplayText: 'eesti [et]', CultureCode: 'et' }, { DisplayText: 'dolnoserbÅ¡Ä‡ina [dsb]', CultureCode: 'dsb' }, { DisplayText: 'Deutsch [de]', CultureCode: 'de' }, { DisplayText: 'davvisÃ¡megiella [se]', CultureCode: 'se' }, { DisplayText: 'dansk [da]', CultureCode: 'da' }, { DisplayText: 'Cymraeg [cy]', CultureCode: 'cy' }, { DisplayText: 'Corsu [co]', CultureCode: 'co' }, { DisplayText: 'ÄeÅ¡tina [cs]', CultureCode: 'cs' }, { DisplayText: 'catalÃ  [ca]', CultureCode: 'ca' }, { DisplayText: 'brezhoneg [br]', CultureCode: 'br' }, { DisplayText: 'bosanski [bs-latn]', CultureCode: 'bs-latn' }, { DisplayText: 'bosanski [bs]', CultureCode: 'bs' }, { DisplayText: 'Bahasa Melayu [ms]', CultureCode: 'ms' }, { DisplayText: 'Bahasa Indonesia [id]', CultureCode: 'id' }, { DisplayText: 'AzÉ™rbaycanÂ­Ä±lÄ± [az-latn]', CultureCode: 'az-latn' }, { DisplayText: 'AzÉ™rbaycanÂ­Ä±lÄ± [az]', CultureCode: 'az' }, { DisplayText: 'Afrikaans [af]', CultureCode: 'af' }, { DisplayText: 'Ã¥arjelsaemiengiele [sma]', CultureCode: 'sma' }],
        allLanguages: [{ DisplayText: 'Ã¥arjelsaemiengiele (NÃ¶Ã¶rje) [sma-no]', CultureCode: 'sma-no' }, { DisplayText: 'Ã¥arjelsaemiengiele (Sveerje) [sma-se]', CultureCode: 'sma-se' }, { DisplayText: 'Ã¥arjelsaemiengiele [sma]', CultureCode: 'sma' }, { DisplayText: 'Afrikaans (Suid Afrika) [af-za]', CultureCode: 'af-za' }, { DisplayText: 'Afrikaans [af]', CultureCode: 'af' }, { DisplayText: 'AzÉ™rbaycanÂ­Ä±lÄ± [az]', CultureCode: 'az' }, { DisplayText: 'AzÉ™rbaycanÂ­Ä±lÄ± [az-latn]', CultureCode: 'az-latn' }, { DisplayText: 'Bahasa Indonesia (Indonesia) [id-id]', CultureCode: 'id-id' }, { DisplayText: 'Bahasa Indonesia [id]', CultureCode: 'id' }, { DisplayText: 'Bahasa Melayu (Brunei Darussalam) [ms-bn]', CultureCode: 'ms-bn' }, { DisplayText: 'Bahasa Melayu (Malaysia) [ms-my]', CultureCode: 'ms-my' }, { DisplayText: 'Bahasa Melayu [ms]', CultureCode: 'ms' }, { DisplayText: 'bosanski (Bosna i Hercegovina) [bs-latn-ba]', CultureCode: 'bs-latn-ba' }, { DisplayText: 'bosanski [bs]', CultureCode: 'bs' }, { DisplayText: 'bosanski [bs-latn]', CultureCode: 'bs-latn' }, { DisplayText: 'brezhoneg (FraÃ±s) [br-fr]', CultureCode: 'br-fr' }, { DisplayText: 'brezhoneg [br]', CultureCode: 'br' }, { DisplayText: 'catalÃ  (catalÃ ) [ca-es]', CultureCode: 'ca-es' }, { DisplayText: 'catalÃ  [ca]', CultureCode: 'ca' }, { DisplayText: 'ÄeÅ¡tina (ÄŒeskÃ¡Â republika) [cs-cz]', CultureCode: 'cs-cz' }, { DisplayText: 'ÄeÅ¡tina [cs]', CultureCode: 'cs' }, { DisplayText: 'Corsu (France) [co-fr]', CultureCode: 'co-fr' }, { DisplayText: 'Corsu [co]', CultureCode: 'co' }, { DisplayText: 'Cymraeg (y Deyrnas Unedig) [cy-gb]', CultureCode: 'cy-gb' }, { DisplayText: 'Cymraeg [cy]', CultureCode: 'cy' }, { DisplayText: 'dansk (Danmark) [da-dk]', CultureCode: 'da-dk' }, { DisplayText: 'dansk [da]', CultureCode: 'da' }, { DisplayText: 'davvisÃ¡megiella (Norga) [se-no]', CultureCode: 'se-no' }, { DisplayText: 'davvisÃ¡megiella (RuoÅ§Å§a) [se-se]', CultureCode: 'se-se' }, { DisplayText: 'davvisÃ¡megiella (Suopma) [se-fi]', CultureCode: 'se-fi' }, { DisplayText: 'davvisÃ¡megiella [se]', CultureCode: 'se' }, { DisplayText: 'Deutsch (Deutschland) [de-de]', CultureCode: 'de-de' }, { DisplayText: 'Deutsch (Liechtenstein) [de-li]', CultureCode: 'de-li' }, { DisplayText: 'Deutsch (Luxemburg) [de-lu]', CultureCode: 'de-lu' }, { DisplayText: 'Deutsch (Ã–sterreich) [de-at]', CultureCode: 'de-at' }, { DisplayText: 'Deutsch (Schweiz) [de-ch]', CultureCode: 'de-ch' }, { DisplayText: 'Deutsch [de]', CultureCode: 'de' }, { DisplayText: 'dolnoserbÅ¡Ä‡ina (Nimska) [dsb-de]', CultureCode: 'dsb-de' }, { DisplayText: 'dolnoserbÅ¡Ä‡ina [dsb]', CultureCode: 'dsb' }, { DisplayText: 'eesti (Eesti) [et-ee]', CultureCode: 'et-ee' }, { DisplayText: 'eesti [et]', CultureCode: 'et' }, { DisplayText: 'ElsÃ¤ssisch (FrÃ nkrisch) [gsw-fr]', CultureCode: 'gsw-fr' }, { DisplayText: 'ElsÃ¤ssisch [gsw]', CultureCode: 'gsw' }, { DisplayText: 'English (Australia) [en-au]', CultureCode: 'en-au' }, { DisplayText: 'English (Belize) [en-bz]', CultureCode: 'en-bz' }, { DisplayText: 'English (Canada) [en-ca]', CultureCode: 'en-ca' }, { DisplayText: 'English (Caribbean) [en-029]', CultureCode: 'en-029' }, { DisplayText: 'English (India) [en-in]', CultureCode: 'en-in' }, { DisplayText: 'English (Ireland) [en-ie]', CultureCode: 'en-ie' }, { DisplayText: 'English (Jamaica) [en-jm]', CultureCode: 'en-jm' }, { DisplayText: 'English (Malaysia) [en-my]', CultureCode: 'en-my' }, { DisplayText: 'English (New Zealand) [en-nz]', CultureCode: 'en-nz' }, { DisplayText: 'English (Philippines) [en-ph]', CultureCode: 'en-ph' }, { DisplayText: 'English (Singapore) [en-sg]', CultureCode: 'en-sg' }, { DisplayText: 'English (South Africa) [en-za]', CultureCode: 'en-za' }, { DisplayText: 'English (Trinidad y Tobago) [en-tt]', CultureCode: 'en-tt' }, { DisplayText: 'English (United Kingdom) [en-gb]', CultureCode: 'en-gb' }, { DisplayText: 'English (United States) [en-us]', CultureCode: 'en-us' }, { DisplayText: 'English (Zimbabwe) [en-zw]', CultureCode: 'en-zw' }, { DisplayText: 'English [en]', CultureCode: 'en' }, { DisplayText: 'EspaÃ±ol (Argentina) [es-ar]', CultureCode: 'es-ar' }, { DisplayText: 'EspaÃ±ol (Bolivia) [es-bo]', CultureCode: 'es-bo' }, { DisplayText: 'EspaÃ±ol (Chile) [es-cl]', CultureCode: 'es-cl' }, { DisplayText: 'EspaÃ±ol (Colombia) [es-co]', CultureCode: 'es-co' }, { DisplayText: 'EspaÃ±ol (Costa Rica) [es-cr]', CultureCode: 'es-cr' }, { DisplayText: 'EspaÃ±ol (Ecuador) [es-ec]', CultureCode: 'es-ec' }, { DisplayText: 'EspaÃ±ol (El Salvador) [es-sv]', CultureCode: 'es-sv' }, { DisplayText: 'EspaÃ±ol (EspaÃ±a, alfabetizaciÃ³n internacional) [es-es]', CultureCode: 'es-es' }, { DisplayText: 'EspaÃ±ol (Estados Unidos) [es-us]', CultureCode: 'es-us' }, { DisplayText: 'EspaÃ±ol (Guatemala) [es-gt]', CultureCode: 'es-gt' }, { DisplayText: 'EspaÃ±ol (Honduras) [es-hn]', CultureCode: 'es-hn' }, { DisplayText: 'EspaÃ±ol (MÃ©xico) [es-mx]', CultureCode: 'es-mx' }, { DisplayText: 'EspaÃ±ol (Nicaragua) [es-ni]', CultureCode: 'es-ni' }, { DisplayText: 'EspaÃ±ol (PanamÃ¡) [es-pa]', CultureCode: 'es-pa' }, { DisplayText: 'EspaÃ±ol (Paraguay) [es-py]', CultureCode: 'es-py' }, { DisplayText: 'EspaÃ±ol (PerÃº) [es-pe]', CultureCode: 'es-pe' }, { DisplayText: 'EspaÃ±ol (Puerto Rico) [es-pr]', CultureCode: 'es-pr' }, { DisplayText: 'EspaÃ±ol (Republica Bolivariana de Venezuela) [es-ve]', CultureCode: 'es-ve' }, { DisplayText: 'EspaÃ±ol (RepÃºblica Dominicana) [es-do]', CultureCode: 'es-do' }, { DisplayText: 'EspaÃ±ol (Uruguay) [es-uy]', CultureCode: 'es-uy' }, { DisplayText: 'espaÃ±ol [es]', CultureCode: 'es' }, { DisplayText: 'euskara (euskara) [eu-es]', CultureCode: 'eu-es' }, { DisplayText: 'euskara [eu]', CultureCode: 'eu' }, { DisplayText: 'Filipino (Pilipinas) [fil-ph]', CultureCode: 'fil-ph' }, { DisplayText: 'Filipino [fil]', CultureCode: 'fil' }, { DisplayText: 'fÃ¸royskt (FÃ¸royar) [fo-fo]', CultureCode: 'fo-fo' }, { DisplayText: 'fÃ¸royskt [fo]', CultureCode: 'fo' }, { DisplayText: 'franÃ§ais (Belgique) [fr-be]', CultureCode: 'fr-be' }, { DisplayText: 'franÃ§ais (Canada) [fr-ca]', CultureCode: 'fr-ca' }, { DisplayText: 'franÃ§ais (France) [fr-fr]', CultureCode: 'fr-fr' }, { DisplayText: 'franÃ§ais (Luxembourg) [fr-lu]', CultureCode: 'fr-lu' }, { DisplayText: 'franÃ§ais (PrincipautÃ© de Monaco) [fr-mc]', CultureCode: 'fr-mc' }, { DisplayText: 'franÃ§ais (Suisse) [fr-ch]', CultureCode: 'fr-ch' }, { DisplayText: 'franÃ§ais [fr]', CultureCode: 'fr' }, { DisplayText: 'Frysk (NederlÃ¢n) [fy-nl]', CultureCode: 'fy-nl' }, { DisplayText: 'Frysk [fy]', CultureCode: 'fy' }, { DisplayText: 'Gaeilge (Ã‰ire) [ga-ie]', CultureCode: 'ga-ie' }, { DisplayText: 'Gaeilge [ga]', CultureCode: 'ga' }, { DisplayText: 'GÃ idhlig (An RÃ¬oghachd Aonaichte) [gd-gb]', CultureCode: 'gd-gb' }, { DisplayText: 'GÃ idhlig [gd]', CultureCode: 'gd' }, { DisplayText: 'galego (galego) [gl-es]', CultureCode: 'gl-es' }, { DisplayText: 'galego [gl]', CultureCode: 'gl' }, { DisplayText: 'Hausa (Nigeria) [ha-latn-ng]', CultureCode: 'ha-latn-ng' }, { DisplayText: 'Hausa [ha]', CultureCode: 'ha' }, { DisplayText: 'Hausa [ha-latn]', CultureCode: 'ha-latn' }, { DisplayText: 'hornjoserbÅ¡Ä‡ina (NÄ›mska) [hsb-de]', CultureCode: 'hsb-de' }, { DisplayText: 'hornjoserbÅ¡Ä‡ina [hsb]', CultureCode: 'hsb' }, { DisplayText: 'hrvatski (Bosna i Hercegovina) [hr-ba]', CultureCode: 'hr-ba' }, { DisplayText: 'hrvatski (Hrvatska) [hr-hr]', CultureCode: 'hr-hr' }, { DisplayText: 'hrvatski [hr]', CultureCode: 'hr' }, { DisplayText: 'Igbo (Nigeria) [ig-ng]', CultureCode: 'ig-ng' }, { DisplayText: 'Igbo [ig]', CultureCode: 'ig' }, { DisplayText: 'Inuktitut (Kanatami) [iu-latn-ca]', CultureCode: 'iu-latn-ca' }, { DisplayText: 'Inuktitut [iu]', CultureCode: 'iu' }, { DisplayText: 'Inuktitut [iu-latn]', CultureCode: 'iu-latn' }, { DisplayText: 'Invariant Language (Invariant Country) []', CultureCode: '' }, { DisplayText: 'isiXhosa (uMzantsi Afrika) [xh-za]', CultureCode: 'xh-za' }, { DisplayText: 'isiXhosa [xh]', CultureCode: 'xh' }, { DisplayText: 'isiZulu (iNingizimu Afrika) [zu-za]', CultureCode: 'zu-za' }, { DisplayText: 'isiZulu [zu]', CultureCode: 'zu' }, { DisplayText: 'Ã­slenska (Ãsland) [is-is]', CultureCode: 'is-is' }, { DisplayText: 'Ã­slenska [is]', CultureCode: 'is' }, { DisplayText: 'italiano (Italia) [it-it]', CultureCode: 'it-it' }, { DisplayText: 'italiano (Svizzera) [it-ch]', CultureCode: 'it-ch' }, { DisplayText: 'italiano [it]', CultureCode: 'it' }, { DisplayText: 'julevusÃ¡megiella (Svierik) [smj-se]', CultureCode: 'smj-se' }, { DisplayText: 'julevusÃ¡megiella (Vuodna) [smj-no]', CultureCode: 'smj-no' }, { DisplayText: 'julevusÃ¡megiella [smj]', CultureCode: 'smj' }, { DisplayText: 'kalaallisut (Kalaallit Nunaat) [kl-gl]', CultureCode: 'kl-gl' }, { DisplayText: 'kalaallisut [kl]', CultureCode: 'kl' }, { DisplayText: 'Kanien\'kÃ©ha [moh]', CultureCode: 'moh' }, { DisplayText: 'Kanien\'kÃ©ha [moh-ca]', CultureCode: 'moh-ca' }, { DisplayText: 'K\'iche (Guatemala) [qut-gt]', CultureCode: 'qut-gt' }, { DisplayText: 'K\'iche [qut]', CultureCode: 'qut' }, { DisplayText: 'Kinyarwanda (Rwanda) [rw-rw]', CultureCode: 'rw-rw' }, { DisplayText: 'Kinyarwanda [rw]', CultureCode: 'rw' }, { DisplayText: 'Kiswahili (Kenya) [sw-ke]', CultureCode: 'sw-ke' }, { DisplayText: 'Kiswahili [sw]', CultureCode: 'sw' }, { DisplayText: 'latvieÅ¡u (Latvija) [lv-lv]', CultureCode: 'lv-lv' }, { DisplayText: 'latvieÅ¡u [lv]', CultureCode: 'lv' }, { DisplayText: 'LÃ«tzebuergesch (Luxembourg) [lb-lu]', CultureCode: 'lb-lu' }, { DisplayText: 'LÃ«tzebuergesch [lb]', CultureCode: 'lb' }, { DisplayText: 'lietuviÅ³ (Lietuva) [lt-lt]', CultureCode: 'lt-lt' }, { DisplayText: 'lietuviÅ³ [lt]', CultureCode: 'lt' }, { DisplayText: 'magyar (MagyarorszÃ¡g) [hu-hu]', CultureCode: 'hu-hu' }, { DisplayText: 'magyar [hu]', CultureCode: 'hu' }, { DisplayText: 'Malti (Malta) [mt-mt]', CultureCode: 'mt-mt' }, { DisplayText: 'Malti [mt]', CultureCode: 'mt' }, { DisplayText: 'Mapudungun (Chile) [arn-cl]', CultureCode: 'arn-cl' }, { DisplayText: 'Mapudungun [arn]', CultureCode: 'arn' }, { DisplayText: 'Nederlands (BelgiÃ«) [nl-be]', CultureCode: 'nl-be' }, { DisplayText: 'Nederlands (Nederland) [nl-nl]', CultureCode: 'nl-nl' }, { DisplayText: 'Nederlands [nl]', CultureCode: 'nl' }, { DisplayText: 'norsk (bokmÃ¥l) [nb]', CultureCode: 'nb' }, { DisplayText: 'norsk (nynorsk) [nn]', CultureCode: 'nn' }, { DisplayText: 'norsk [no]', CultureCode: 'no' }, { DisplayText: 'norsk, bokmÃ¥l (Norge) [nb-no]', CultureCode: 'nb-no' }, { DisplayText: 'norsk, nynorsk (Noreg) [nn-no]', CultureCode: 'nn-no' }, { DisplayText: 'Occitan (FranÃ§a) [oc-fr]', CultureCode: 'oc-fr' }, { DisplayText: 'Occitan [oc]', CultureCode: 'oc' }, { DisplayText: 'polski (Polska) [pl-pl]', CultureCode: 'pl-pl' }, { DisplayText: 'polski [pl]', CultureCode: 'pl' }, { DisplayText: 'PortuguÃªs (Brasil) [pt-br]', CultureCode: 'pt-br' }, { DisplayText: 'portuguÃªs (Portugal) [pt-pt]', CultureCode: 'pt-pt' }, { DisplayText: 'PortuguÃªs [pt]', CultureCode: 'pt' }, { DisplayText: 'Reo MÄori (Aotearoa) [mi-nz]', CultureCode: 'mi-nz' }, { DisplayText: 'Reo MÄori [mi]', CultureCode: 'mi' }, { DisplayText: 'romÃ¢nÄƒ (RomÃ¢nia) [ro-ro]', CultureCode: 'ro-ro' }, { DisplayText: 'romÃ¢nÄƒ [ro]', CultureCode: 'ro' }, { DisplayText: 'Rumantsch (Svizra) [rm-ch]', CultureCode: 'rm-ch' }, { DisplayText: 'Rumantsch [rm]', CultureCode: 'rm' }, { DisplayText: 'runasimi (Ecuador) [quz-ec]', CultureCode: 'quz-ec' }, { DisplayText: 'runasimi (Piruw) [quz-pe]', CultureCode: 'quz-pe' }, { DisplayText: 'runasimi (Qullasuyu) [quz-bo]', CultureCode: 'quz-bo' }, { DisplayText: 'runasimi [quz]', CultureCode: 'quz' }, { DisplayText: 'sÃ¤Ã¤mÂ´Ç©iÃµll (LÃ¤Ã¤Â´ddjÃ¢nnam) [sms-fi]', CultureCode: 'sms-fi' }, { DisplayText: 'sÃ¤Ã¤mÂ´Ç©iÃµll [sms]', CultureCode: 'sms' }, { DisplayText: 'sÃ¤mikielÃ¢ (SuomÃ¢) [smn-fi]', CultureCode: 'smn-fi' }, { DisplayText: 'sÃ¤mikielÃ¢ [smn]', CultureCode: 'smn' }, { DisplayText: 'Sesotho sa Leboa (Afrika Borwa) [nso-za]', CultureCode: 'nso-za' }, { DisplayText: 'Sesotho sa Leboa [nso]', CultureCode: 'nso' }, { DisplayText: 'Setswana (Aforika Borwa) [tn-za]', CultureCode: 'tn-za' }, { DisplayText: 'Setswana [tn]', CultureCode: 'tn' }, { DisplayText: 'shqipe (ShqipÃ«ria) [sq-al]', CultureCode: 'sq-al' }, { DisplayText: 'shqipe [sq]', CultureCode: 'sq' }, { DisplayText: 'slovenÄina (SlovenskÃ¡ republika) [sk-sk]', CultureCode: 'sk-sk' }, { DisplayText: 'slovenÄina [sk]', CultureCode: 'sk' }, { DisplayText: 'slovenski (Slovenija) [sl-si]', CultureCode: 'sl-si' }, { DisplayText: 'slovenski [sl]', CultureCode: 'sl' }, { DisplayText: 'srpski (Bosna i Hercegovina) [sr-latn-ba]', CultureCode: 'sr-latn-ba' }, { DisplayText: 'srpski (Crna Gora) [sr-latn-me]', CultureCode: 'sr-latn-me' }, { DisplayText: 'srpski (Srbija i Crna Gora (Prethodno)) [sr-latn-cs]', CultureCode: 'sr-latn-cs' }, { DisplayText: 'srpski (Srbija) [sr-latn-rs]', CultureCode: 'sr-latn-rs' }, { DisplayText: 'srpski [sr]', CultureCode: 'sr' }, { DisplayText: 'srpski [sr-latn]', CultureCode: 'sr-latn' }, { DisplayText: 'suomi (Suomi) [fi-fi]', CultureCode: 'fi-fi' }, { DisplayText: 'suomi [fi]', CultureCode: 'fi' }, { DisplayText: 'svenska (Finland) [sv-fi]', CultureCode: 'sv-fi' }, { DisplayText: 'svenska (Sverige) [sv-se]', CultureCode: 'sv-se' }, { DisplayText: 'svenska [sv]', CultureCode: 'sv' }, { DisplayText: 'Tamazight (DjazaÃ¯r) [tzm-latn-dz]', CultureCode: 'tzm-latn-dz' }, { DisplayText: 'Tamazight [tzm]', CultureCode: 'tzm' }, { DisplayText: 'Tamazight [tzm-latn]', CultureCode: 'tzm-latn' }, { DisplayText: 'TiÃªÌng Viá»‡t (Viá»‡t Nam) [vi-vn]', CultureCode: 'vi-vn' }, { DisplayText: 'TiÃªÌng Viá»‡t [vi]', CultureCode: 'vi' }, { DisplayText: 'TÃ¼rkÃ§e [tr]', CultureCode: 'tr' }, { DisplayText: 'tÃ¼rkmenÃ§e (TÃ¼rkmenistan) [tk-tm]', CultureCode: 'tk-tm' }, { DisplayText: 'tÃ¼rkmenÃ§e [tk]', CultureCode: 'tk' }, { DisplayText: 'U\'zbek (U\'zbekiston Respublikasi) [uz-latn-uz]', CultureCode: 'uz-latn-uz' }, { DisplayText: 'U\'zbek [uz]', CultureCode: 'uz' }, { DisplayText: 'U\'zbek [uz-latn]', CultureCode: 'uz-latn' }, { DisplayText: 'Wolof (SÃ©nÃ©gal) [wo-sn]', CultureCode: 'wo-sn' }, { DisplayText: 'Wolof [wo]', CultureCode: 'wo' }, { DisplayText: 'Yoruba (Nigeria) [yo-ng]', CultureCode: 'yo-ng' }, { DisplayText: 'Yoruba [yo]', CultureCode: 'yo' }, { DisplayText: 'Î•Î»Î»Î·Î½Î¹ÎºÎ¬ (Î•Î»Î»Î¬Î´Î±) [el-gr]', CultureCode: 'el-gr' }, { DisplayText: 'Î•Î»Î»Î·Î½Î¹ÎºÎ¬ [el]', CultureCode: 'el' }, { DisplayText: 'ÐÐ·Ó™Ñ€Ð±Ð°Ñ˜Ò¹Ð°Ð½Â Ð´Ð¸Ð»Ð¸ [az-cyrl]', CultureCode: 'az-cyrl' }, { DisplayText: 'Ð‘Ð°ÑˆÒ¡Ð¾Ñ€Ñ‚ (Ð Ð¾ÑÑÐ¸Ñ) [ba-ru]', CultureCode: 'ba-ru' }, { DisplayText: 'Ð‘Ð°ÑˆÒ¡Ð¾Ñ€Ñ‚ [ba]', CultureCode: 'ba' }, { DisplayText: 'Ð‘ÐµÐ»Ð°Ñ€ÑƒÑÐºÑ– (Ð‘ÐµÐ»Ð°Ñ€ÑƒÑÑŒ) [be-by]', CultureCode: 'be-by' }, { DisplayText: 'Ð‘ÐµÐ»Ð°Ñ€ÑƒÑÐºÑ– [be]', CultureCode: 'be' }, { DisplayText: 'Ð±Ð¾ÑÐ°Ð½ÑÐºÐ¸ (Ð‘Ð¾ÑÐ½Ð° Ð¸ Ð¥ÐµÑ€Ñ†ÐµÐ³Ð¾Ð²Ð¸Ð½Ð°) [bs-cyrl-ba]', CultureCode: 'bs-cyrl-ba' }, { DisplayText: 'Ð±Ð¾ÑÐ°Ð½ÑÐºÐ¸ [bs-cyrl]', CultureCode: 'bs-cyrl' }, { DisplayText: 'Ð±ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸ (Ð‘ÑŠÐ»Ð³Ð°Ñ€Ð¸Ñ) [bg-bg]', CultureCode: 'bg-bg' }, { DisplayText: 'Ð±ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸ [bg]', CultureCode: 'bg' }, { DisplayText: 'ÐšÑ‹Ñ€Ð³Ñ‹Ð· (ÐšÑ‹Ñ€Ð³Ñ‹Ð·ÑÑ‚Ð°Ð½) [ky-kg]', CultureCode: 'ky-kg' }, { DisplayText: 'ÐšÑ‹Ñ€Ð³Ñ‹Ð· [ky]', CultureCode: 'ky' }, { DisplayText: 'ÒšÐ°Ð·Ð°Ò› (ÒšÐ°Ð·Ð°Ò›ÑÑ‚Ð°Ð½) [kk-kz]', CultureCode: 'kk-kz' }, { DisplayText: 'ÒšÐ°Ð·Ð°Ò› [kk]', CultureCode: 'kk' }, { DisplayText: 'Ð¼Ð°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸ Ñ˜Ð°Ð·Ð¸Ðº (ÐœÐ°ÐºÐµÐ´Ð¾Ð½Ð¸Ñ˜Ð°) [mk-mk]', CultureCode: 'mk-mk' }, { DisplayText: 'Ð¼Ð°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸ Ñ˜Ð°Ð·Ð¸Ðº [mk]', CultureCode: 'mk' }, { DisplayText: 'ÐœÐ¾Ð½Ð³Ð¾Ð»Â Ñ…ÑÐ» (ÐœÐ¾Ð½Ð³Ð¾Ð»Â ÑƒÐ»Ñ) [mn-mn]', CultureCode: 'mn-mn' }, { DisplayText: 'ÐœÐ¾Ð½Ð³Ð¾Ð»Â Ñ…ÑÐ» [mn]', CultureCode: 'mn' }, { DisplayText: 'ÐœÐ¾Ð½Ð³Ð¾Ð»Â Ñ…ÑÐ» [mn-cyrl]', CultureCode: 'mn-cyrl' }, { DisplayText: 'Ñ€ÑƒÑÑÐºÐ¸Ð¹ (Ð Ð¾ÑÑÐ¸Ñ) [ru-ru]', CultureCode: 'ru-ru' }, { DisplayText: 'Ñ€ÑƒÑÑÐºÐ¸Ð¹ [ru]', CultureCode: 'ru' }, { DisplayText: 'ÑÐ°Ñ…Ð° (Ð Ð¾ÑÑÐ¸Ñ) [sah-ru]', CultureCode: 'sah-ru' }, { DisplayText: 'ÑÐ°Ñ…Ð° [sah]', CultureCode: 'sah' }, { DisplayText: 'ÑÑ€Ð¿ÑÐºÐ¸ (Ð‘Ð¾ÑÐ½Ð° Ð¸ Ð¥ÐµÑ€Ñ†ÐµÐ³Ð¾Ð²Ð¸Ð½Ð°) [sr-cyrl-ba]', CultureCode: 'sr-cyrl-ba' }, { DisplayText: 'ÑÑ€Ð¿ÑÐºÐ¸ (Ð¡Ñ€Ð±Ð¸Ñ˜Ð° Ð¸ Ð¦Ñ€Ð½Ð° Ð“Ð¾Ñ€Ð° (ÐŸÑ€ÐµÑ‚Ñ…Ð¾Ð´Ð½Ð¾)) [sr-cyrl-cs]', CultureCode: 'sr-cyrl-cs' }, { DisplayText: 'ÑÑ€Ð¿ÑÐºÐ¸ (Ð¡Ñ€Ð±Ð¸Ñ˜Ð°) [sr-cyrl-rs]', CultureCode: 'sr-cyrl-rs' }, { DisplayText: 'ÑÑ€Ð¿ÑÐºÐ¸ (Ð¦Ñ€Ð½Ð° Ð“Ð¾Ñ€Ð°) [sr-cyrl-me]', CultureCode: 'sr-cyrl-me' }, { DisplayText: 'ÑÑ€Ð¿ÑÐºÐ¸ [sr-cyrl]', CultureCode: 'sr-cyrl' }, { DisplayText: 'Ð¢Ð°Ñ‚Ð°Ñ€ (Ð Ð¾ÑÑÐ¸Ñ) [tt-ru]', CultureCode: 'tt-ru' }, { DisplayText: 'Ð¢Ð°Ñ‚Ð°Ñ€ [tt]', CultureCode: 'tt' }, { DisplayText: 'Ð¢Ð¾Ò·Ð¸ÐºÓ£ (Ð¢Ð¾Ò·Ð¸ÐºÐ¸ÑÑ‚Ð¾Ð½) [tg-cyrl-tj]', CultureCode: 'tg-cyrl-tj' }, { DisplayText: 'Ð¢Ð¾Ò·Ð¸ÐºÓ£ [tg]', CultureCode: 'tg' }, { DisplayText: 'Ð¢Ð¾Ò·Ð¸ÐºÓ£ [tg-cyrl]', CultureCode: 'tg-cyrl' }, { DisplayText: 'ÐŽÐ·Ð±ÐµÐº (ÐŽÐ·Ð±ÐµÐºÐ¸ÑÑ‚Ð¾Ð½) [uz-cyrl-uz]', CultureCode: 'uz-cyrl-uz' }, { DisplayText: 'ÐŽÐ·Ð±ÐµÐº [uz-cyrl]', CultureCode: 'uz-cyrl' }, { DisplayText: 'ÑƒÐºÑ€Ð°Ñ—Ð½ÑÑŒÐºÐ° (Ð£ÐºÑ€Ð°Ñ—Ð½Ð°) [uk-ua]', CultureCode: 'uk-ua' }, { DisplayText: 'ÑƒÐºÑ€Ð°Ñ—Ð½ÑÑŒÐºÐ° [uk]', CultureCode: 'uk' }, { DisplayText: 'Õ€Õ¡ÕµÕ¥Ö€Õ¥Õ¶ (Õ€Õ¡ÕµÕ¡Õ½Õ¿Õ¡Õ¶) [hy-am]', CultureCode: 'hy-am' }, { DisplayText: 'Õ€Õ¡ÕµÕ¥Ö€Õ¥Õ¶ [hy]', CultureCode: 'hy' }, { DisplayText: 'áƒ¥áƒáƒ áƒ—áƒ£áƒšáƒ˜ (áƒ¡áƒáƒ¥áƒáƒ áƒ—áƒ•áƒ”áƒšáƒ) [ka-ge]', CultureCode: 'ka-ge' }, { DisplayText: 'áƒ¥áƒáƒ áƒ—áƒ£áƒšáƒ˜ [ka]', CultureCode: 'ka' }, { DisplayText: '×¢×‘×¨×™×ª (×™×©×¨××œ) [he-il]', CultureCode: 'he-il' }, { DisplayText: '×¢×‘×¨×™×ª [he]', CultureCode: 'he' }, { DisplayText: 'Ø§ÙØ±Ø¯Ùˆ (Ù¾Ø§Ú©Ø³ØªØ§Ù†) [ur-pk]', CultureCode: 'ur-pk' }, { DisplayText: 'Ø§ÙØ±Ø¯Ùˆ [ur]', CultureCode: 'ur' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ø£Ø±Ø¯Ù†) [ar-jo]', CultureCode: 'ar-jo' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ø¥Ù…Ø§Ø±Ø§Øª Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ù…ØªØ­Ø¯Ø©) [ar-ae]', CultureCode: 'ar-ae' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ø¨Ø­Ø±ÙŠÙ†) [ar-bh]', CultureCode: 'ar-bh' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ø¬Ø²Ø§Ø¦Ø±) [ar-dz]', CultureCode: 'ar-dz' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ø¹Ø±Ø§Ù‚) [ar-iq]', CultureCode: 'ar-iq' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„ÙƒÙˆÙŠØª) [ar-kw]', CultureCode: 'ar-kw' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©) [ar-sa]', CultureCode: 'ar-sa' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ù…ØºØ±Ø¨ÙŠØ©) [ar-ma]', CultureCode: 'ar-ma' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„ÙŠÙ…Ù†) [ar-ye]', CultureCode: 'ar-ye' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (ØªÙˆÙ†Ø³) [ar-tn]', CultureCode: 'ar-tn' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø³ÙˆØ±ÙŠØ§) [ar-sy]', CultureCode: 'ar-sy' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø¹Ù…Ø§Ù†) [ar-om]', CultureCode: 'ar-om' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ù‚Ø·Ø±) [ar-qa]', CultureCode: 'ar-qa' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ù„Ø¨Ù†Ø§Ù†) [ar-lb]', CultureCode: 'ar-lb' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ù„ÙŠØ¨ÙŠØ§) [ar-ly]', CultureCode: 'ar-ly' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ù…ØµØ±) [ar-eg]', CultureCode: 'ar-eg' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© [ar]', CultureCode: 'ar' }, { DisplayText: 'Ù¾ÚšØªÙˆ (Ø§ÙØºØ§Ù†Ø³ØªØ§Ù†) [ps-af]', CultureCode: 'ps-af' }, { DisplayText: 'Ù¾ÚšØªÙˆ [ps]', CultureCode: 'ps' }, { DisplayText: 'Ø¯Ø±Ù‰ (Ø§ÙØºØ§Ù†Ø³ØªØ§Ù†) [prs-af]', CultureCode: 'prs-af' }, { DisplayText: 'Ø¯Ø±Ù‰ [prs]', CultureCode: 'prs' }, { DisplayText: 'ÙØ§Ø±Ø³Ù‰ (Ø§ÛŒØ±Ø§Ù†) [fa-ir]', CultureCode: 'fa-ir' }, { DisplayText: 'ÙØ§Ø±Ø³Ù‰ [fa]', CultureCode: 'fa' }, { DisplayText: 'Ø¦Û‡ÙŠØºÛ‡Ø±Ú†Û• (Ø¬Û‡Ú­Ø®Û‡Ø§ Ø®Û•Ù„Ù‚ Ø¬Û‡Ù…Ú¾Û‡Ø±Ù‰ÙŠÙ‰ØªÙ‰) [ug-cn]', CultureCode: 'ug-cn' }, { DisplayText: 'Ø¦Û‡ÙŠØºÛ‡Ø±Ú†Û• [ug]', CultureCode: 'ug' }, { DisplayText: 'Ü£Ü˜ÜªÜÜÜ (Ø³ÙˆØ±ÙŠØ§) [syr-sy]', CultureCode: 'syr-sy' }, { DisplayText: 'Ü£Ü˜ÜªÜÜÜ [syr]', CultureCode: 'syr' }, { DisplayText: 'Þ‹Þ¨ÞˆÞ¬Þ€Þ¨Þ„Þ¦ÞÞ° (Þ‹Þ¨ÞˆÞ¬Þ€Þ¨ ÞƒÞ§Þ‡Þ°Þ–Þ¬) [dv-mv]', CultureCode: 'dv-mv' }, { DisplayText: 'Þ‹Þ¨ÞˆÞ¬Þ€Þ¨Þ„Þ¦ÞÞ° [dv]', CultureCode: 'dv' }, { DisplayText: 'à¤•à¥‹à¤‚à¤•à¤£à¥€ (à¤­à¤¾à¤°à¤¤) [kok-in]', CultureCode: 'kok-in' }, { DisplayText: 'à¤•à¥‹à¤‚à¤•à¤£à¥€ [kok]', CultureCode: 'kok' }, { DisplayText: 'à¤¨à¥‡à¤ªà¤¾à¤²à¥€ (à¤¨à¥‡à¤ªà¤¾à¤²) [ne-np]', CultureCode: 'ne-np' }, { DisplayText: 'à¤¨à¥‡à¤ªà¤¾à¤²à¥€ [ne]', CultureCode: 'ne' }, { DisplayText: 'à¤®à¤°à¤¾à¤ à¥€ (à¤­à¤¾à¤°à¤¤) [mr-in]', CultureCode: 'mr-in' }, { DisplayText: 'à¤®à¤°à¤¾à¤ à¥€ [mr]', CultureCode: 'mr' }, { DisplayText: 'à¤¸à¤‚à¤¸à¥à¤•à¥ƒà¤¤ (à¤­à¤¾à¤°à¤¤à¤®à¥) [sa-in]', CultureCode: 'sa-in' }, { DisplayText: 'à¤¸à¤‚à¤¸à¥à¤•à¥ƒà¤¤ [sa]', CultureCode: 'sa' }, { DisplayText: 'à¤¹à¤¿à¤‚à¤¦à¥€ (à¤­à¤¾à¤°à¤¤) [hi-in]', CultureCode: 'hi-in' }, { DisplayText: 'à¤¹à¤¿à¤‚à¤¦à¥€ [hi]', CultureCode: 'hi' }, { DisplayText: 'à¦…à¦¸à¦®à§€à§Ÿà¦¾ (à¦­à¦¾à§°à¦¤) [as-in]', CultureCode: 'as-in' }, { DisplayText: 'à¦…à¦¸à¦®à§€à§Ÿà¦¾ [as]', CultureCode: 'as' }, { DisplayText: 'à¦¬à¦¾à¦‚à¦²à¦¾ (à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶) [bn-bd]', CultureCode: 'bn-bd' }, { DisplayText: 'à¦¬à¦¾à¦‚à¦²à¦¾ (à¦­à¦¾à¦°à¦¤) [bn-in]', CultureCode: 'bn-in' }, { DisplayText: 'à¦¬à¦¾à¦‚à¦²à¦¾ [bn]', CultureCode: 'bn' }, { DisplayText: 'à¨ªà©°à¨œà¨¾à¨¬à©€ (à¨­à¨¾à¨°à¨¤) [pa-in]', CultureCode: 'pa-in' }, { DisplayText: 'à¨ªà©°à¨œà¨¾à¨¬à©€ [pa]', CultureCode: 'pa' }, { DisplayText: 'àª—à«àªœàª°àª¾àª¤à«€ (àª­àª¾àª°àª¤) [gu-in]', CultureCode: 'gu-in' }, { DisplayText: 'àª—à«àªœàª°àª¾àª¤à«€ [gu]', CultureCode: 'gu' }, { DisplayText: 'à¬“à­œà¬¿à¬† (à¬­à¬¾à¬°à¬¤) [or-in]', CultureCode: 'or-in' }, { DisplayText: 'à¬“à­œà¬¿à¬† [or]', CultureCode: 'or' }, { DisplayText: 'à®¤à®®à®¿à®´à¯ (à®‡à®¨à¯à®¤à®¿à®¯à®¾) [ta-in]', CultureCode: 'ta-in' }, { DisplayText: 'à®¤à®®à®¿à®´à¯ [ta]', CultureCode: 'ta' }, { DisplayText: 'à°¤à±†à°²à±à°—à± (à°­à°¾à°°à°¤Â à°¦à±‡à°¶à°‚) [te-in]', CultureCode: 'te-in' }, { DisplayText: 'à°¤à±†à°²à±à°—à± [te]', CultureCode: 'te' }, { DisplayText: 'à²•à²¨à³à²¨à²¡ (à²­à²¾à²°à²¤) [kn-in]', CultureCode: 'kn-in' }, { DisplayText: 'à²•à²¨à³à²¨à²¡ [kn]', CultureCode: 'kn' }, { DisplayText: 'à´®à´²à´¯à´¾à´³à´‚ (à´­à´¾à´°à´¤à´‚) [ml-in]', CultureCode: 'ml-in' }, { DisplayText: 'à´®à´²à´¯à´¾à´³à´‚ [ml]', CultureCode: 'ml' }, { DisplayText: 'à·ƒà·’à¶‚à·„à¶½ (à·à·Šâ€à¶»à·“ à¶½à¶‚à¶šà·) [si-lk]', CultureCode: 'si-lk' }, { DisplayText: 'à·ƒà·’à¶‚à·„à¶½ [si]', CultureCode: 'si' }, { DisplayText: 'à¹„à¸—à¸¢ (à¹„à¸—à¸¢) [th-th]', CultureCode: 'th-th' }, { DisplayText: 'à¹„à¸—à¸¢ [th]', CultureCode: 'th' }, { DisplayText: 'á ®á ¤á ¨á ­á ­á ¤á ¯ á ¬á ¡á ¯á ¡ (á ªá ¦á ­á ¦á ³á ¡ á ¨á  á ¢á ·á  á ®á ³á  á ¬á ¤ á ³á ¤á ®á ³á  á ³á ¤ á  á ·á  á ³ á £á ¯á £á °) [mn-mong-cn]', CultureCode: 'mn-mong-cn' }, { DisplayText: 'á ®á ¤á ¨á ­á ­á ¤á ¯ á ¬á ¡á ¯á ¡ [mn-mong]', CultureCode: 'mn-mong' }, { DisplayText: 'à½–à½¼à½‘à¼‹à½¡à½²à½‚ (à½€à¾²à½´à½„à¼‹à½§à¾­à¼‹à½˜à½²à¼‹à½‘à½˜à½„à½¦à¼‹à½¦à¾¤à¾±à½²à¼‹à½˜à½à½´à½“à¼‹à½¢à¾’à¾±à½£à¼‹à½à½–à¼) [bo-cn]', CultureCode: 'bo-cn' }, { DisplayText: 'à½–à½¼à½‘à¼‹à½¡à½²à½‚ [bo]', CultureCode: 'bo' }, { DisplayText: 'àº¥àº²àº§ (àºª.àº›.àº›. àº¥àº²àº§) [lo-la]', CultureCode: 'lo-la' }, { DisplayText: 'àº¥àº²àº§ [lo]', CultureCode: 'lo' }, { DisplayText: 'ážáŸ’áž˜áŸ‚ážš (áž€áž˜áŸ’áž–áž»áž‡áž¶) [km-kh]', CultureCode: 'km-kh' }, { DisplayText: 'ážáŸ’áž˜áŸ‚ážš [km]', CultureCode: 'km' }, { DisplayText: 'áƒá“„á’ƒá‘Žá‘á‘¦ (á‘²á“‡á‘•á’¥) [iu-cans-ca]', CultureCode: 'iu-cans-ca' }, { DisplayText: 'áƒá“„á’ƒá‘Žá‘á‘¦ [iu-cans]', CultureCode: 'iu-cans' }, { DisplayText: 'áŠ áˆ›áˆ­áŠ› (áŠ¢á‰µá‹®áŒµá‹«) [am-et]', CultureCode: 'am-et' }, { DisplayText: 'áŠ áˆ›áˆ­áŠ› [am]', CultureCode: 'am' }, { DisplayText: 'ê†ˆêŒ ê±ê‚· (êê‰¸ê“ê‚±ê‡­ê‰¼ê‡©) [ii-cn]', CultureCode: 'ii-cn' }, { DisplayText: 'ê†ˆêŒ ê±ê‚· [ii]', CultureCode: 'ii' }, { DisplayText: 'í•œêµ­ì–´ (ëŒ€í•œë¯¼êµ­) [ko-kr]', CultureCode: 'ko-kr' }, { DisplayText: 'í•œêµ­ì–´ [ko]', CultureCode: 'ko' }, { DisplayText: 'ä¸­æ–‡ [zh]', CultureCode: 'zh' }, { DisplayText: 'ä¸­æ–‡(ä¸­åŽäººæ°‘å…±å’Œå›½) [zh-cn]', CultureCode: 'zh-cn' }, { DisplayText: 'ä¸­æ–‡(å°ç£) [zh-tw]', CultureCode: 'zh-tw' }, { DisplayText: 'ä¸­æ–‡(æ–°åŠ å¡) [zh-sg]', CultureCode: 'zh-sg' }, { DisplayText: 'ä¸­æ–‡(æ¾³é–€ç‰¹åˆ¥è¡Œæ”¿å€) [zh-mo]', CultureCode: 'zh-mo' }, { DisplayText: 'ä¸­æ–‡(ç®€ä½“) [zh-hans]', CultureCode: 'zh-hans' }, { DisplayText: 'ä¸­æ–‡(ç®€ä½“) æ—§ç‰ˆ [zh-chs]', CultureCode: 'zh-chs' }, { DisplayText: 'ä¸­æ–‡(ç¹é«”) [zh-hant]', CultureCode: 'zh-hant' }, { DisplayText: 'ä¸­æ–‡(ç¹é«”) èˆŠç‰ˆ [zh-cht]', CultureCode: 'zh-cht' }, { DisplayText: 'ä¸­æ–‡(é¦™æ¸¯ç‰¹åˆ¥è¡Œæ”¿å€) [zh-hk]', CultureCode: 'zh-hk' }, { DisplayText: 'æ—¥æœ¬èªž (æ—¥æœ¬) [ja-jp]', CultureCode: 'ja-jp' }, { DisplayText: 'æ—¥æœ¬èªž [ja]', CultureCode: 'ja' }],
        regionLanguage: [{ DisplayText: 'Ã¥arjelsaemiengiele (NÃ¶Ã¶rje) [sma-no]', CultureCode: 'sma-no' }, { DisplayText: 'Ã¥arjelsaemiengiele (Sveerje) [sma-se]', CultureCode: 'sma-se' }, { DisplayText: 'Ã¥arjelsaemiengiele [sma]', CultureCode: 'sma' }, { DisplayText: 'Afrikaans (Suid Afrika) [af-za]', CultureCode: 'af-za' }, { DisplayText: 'Afrikaans [af]', CultureCode: 'af' }, { DisplayText: 'AzÉ™rbaycanÂ­Ä±lÄ± [az]', CultureCode: 'az' }, { DisplayText: 'AzÉ™rbaycanÂ­Ä±lÄ± [az-latn]', CultureCode: 'az-latn' }, { DisplayText: 'Bahasa Indonesia (Indonesia) [id-id]', CultureCode: 'id-id' }, { DisplayText: 'Bahasa Indonesia [id]', CultureCode: 'id' }, { DisplayText: 'Bahasa Melayu (Brunei Darussalam) [ms-bn]', CultureCode: 'ms-bn' }, { DisplayText: 'Bahasa Melayu (Malaysia) [ms-my]', CultureCode: 'ms-my' }, { DisplayText: 'Bahasa Melayu [ms]', CultureCode: 'ms' }, { DisplayText: 'bosanski (Bosna i Hercegovina) [bs-latn-ba]', CultureCode: 'bs-latn-ba' }, { DisplayText: 'bosanski [bs]', CultureCode: 'bs' }, { DisplayText: 'bosanski [bs-latn]', CultureCode: 'bs-latn' }, { DisplayText: 'brezhoneg (FraÃ±s) [br-fr]', CultureCode: 'br-fr' }, { DisplayText: 'brezhoneg [br]', CultureCode: 'br' }, { DisplayText: 'catalÃ  (catalÃ ) [ca-es]', CultureCode: 'ca-es' }, { DisplayText: 'catalÃ  [ca]', CultureCode: 'ca' }, { DisplayText: 'ÄeÅ¡tina (ÄŒeskÃ¡Â republika) [cs-cz]', CultureCode: 'cs-cz' }, { DisplayText: 'ÄeÅ¡tina [cs]', CultureCode: 'cs' }, { DisplayText: 'Corsu (France) [co-fr]', CultureCode: 'co-fr' }, { DisplayText: 'Corsu [co]', CultureCode: 'co' }, { DisplayText: 'Cymraeg (y Deyrnas Unedig) [cy-gb]', CultureCode: 'cy-gb' }, { DisplayText: 'Cymraeg [cy]', CultureCode: 'cy' }, { DisplayText: 'dansk (Danmark) [da-dk]', CultureCode: 'da-dk' }, { DisplayText: 'dansk [da]', CultureCode: 'da' }, { DisplayText: 'davvisÃ¡megiella (Norga) [se-no]', CultureCode: 'se-no' }, { DisplayText: 'davvisÃ¡megiella (RuoÅ§Å§a) [se-se]', CultureCode: 'se-se' }, { DisplayText: 'davvisÃ¡megiella (Suopma) [se-fi]', CultureCode: 'se-fi' }, { DisplayText: 'davvisÃ¡megiella [se]', CultureCode: 'se' }, { DisplayText: 'Deutsch (Deutschland) [de-de]', CultureCode: 'de-de' }, { DisplayText: 'Deutsch (Liechtenstein) [de-li]', CultureCode: 'de-li' }, { DisplayText: 'Deutsch (Luxemburg) [de-lu]', CultureCode: 'de-lu' }, { DisplayText: 'Deutsch (Ã–sterreich) [de-at]', CultureCode: 'de-at' }, { DisplayText: 'Deutsch (Schweiz) [de-ch]', CultureCode: 'de-ch' }, { DisplayText: 'Deutsch [de]', CultureCode: 'de' }, { DisplayText: 'dolnoserbÅ¡Ä‡ina (Nimska) [dsb-de]', CultureCode: 'dsb-de' }, { DisplayText: 'dolnoserbÅ¡Ä‡ina [dsb]', CultureCode: 'dsb' }, { DisplayText: 'eesti (Eesti) [et-ee]', CultureCode: 'et-ee' }, { DisplayText: 'eesti [et]', CultureCode: 'et' }, { DisplayText: 'ElsÃ¤ssisch (FrÃ nkrisch) [gsw-fr]', CultureCode: 'gsw-fr' }, { DisplayText: 'ElsÃ¤ssisch [gsw]', CultureCode: 'gsw' }, { DisplayText: 'English (Australia) [en-au]', CultureCode: 'en-au' }, { DisplayText: 'English (Belize) [en-bz]', CultureCode: 'en-bz' }, { DisplayText: 'English (Canada) [en-ca]', CultureCode: 'en-ca' }, { DisplayText: 'English (Caribbean) [en-029]', CultureCode: 'en-029' }, { DisplayText: 'English (India) [en-in]', CultureCode: 'en-in' }, { DisplayText: 'English (Ireland) [en-ie]', CultureCode: 'en-ie' }, { DisplayText: 'English (Jamaica) [en-jm]', CultureCode: 'en-jm' }, { DisplayText: 'English (Malaysia) [en-my]', CultureCode: 'en-my' }, { DisplayText: 'English (New Zealand) [en-nz]', CultureCode: 'en-nz' }, { DisplayText: 'English (Philippines) [en-ph]', CultureCode: 'en-ph' }, { DisplayText: 'English (Singapore) [en-sg]', CultureCode: 'en-sg' }, { DisplayText: 'English (South Africa) [en-za]', CultureCode: 'en-za' }, { DisplayText: 'English (Trinidad y Tobago) [en-tt]', CultureCode: 'en-tt' }, { DisplayText: 'English (United Kingdom) [en-gb]', CultureCode: 'en-gb' }, { DisplayText: 'English (United States) [en-us]', CultureCode: 'en-us' }, { DisplayText: 'English (Zimbabwe) [en-zw]', CultureCode: 'en-zw' }, { DisplayText: 'English [en]', CultureCode: 'en' }, { DisplayText: 'EspaÃ±ol (Argentina) [es-ar]', CultureCode: 'es-ar' }, { DisplayText: 'EspaÃ±ol (Bolivia) [es-bo]', CultureCode: 'es-bo' }, { DisplayText: 'EspaÃ±ol (Chile) [es-cl]', CultureCode: 'es-cl' }, { DisplayText: 'EspaÃ±ol (Colombia) [es-co]', CultureCode: 'es-co' }, { DisplayText: 'EspaÃ±ol (Costa Rica) [es-cr]', CultureCode: 'es-cr' }, { DisplayText: 'EspaÃ±ol (Ecuador) [es-ec]', CultureCode: 'es-ec' }, { DisplayText: 'EspaÃ±ol (El Salvador) [es-sv]', CultureCode: 'es-sv' }, { DisplayText: 'EspaÃ±ol (EspaÃ±a, alfabetizaciÃ³n internacional) [es-es]', CultureCode: 'es-es' }, { DisplayText: 'EspaÃ±ol (Estados Unidos) [es-us]', CultureCode: 'es-us' }, { DisplayText: 'EspaÃ±ol (Guatemala) [es-gt]', CultureCode: 'es-gt' }, { DisplayText: 'EspaÃ±ol (Honduras) [es-hn]', CultureCode: 'es-hn' }, { DisplayText: 'EspaÃ±ol (MÃ©xico) [es-mx]', CultureCode: 'es-mx' }, { DisplayText: 'EspaÃ±ol (Nicaragua) [es-ni]', CultureCode: 'es-ni' }, { DisplayText: 'EspaÃ±ol (PanamÃ¡) [es-pa]', CultureCode: 'es-pa' }, { DisplayText: 'EspaÃ±ol (Paraguay) [es-py]', CultureCode: 'es-py' }, { DisplayText: 'EspaÃ±ol (PerÃº) [es-pe]', CultureCode: 'es-pe' }, { DisplayText: 'EspaÃ±ol (Puerto Rico) [es-pr]', CultureCode: 'es-pr' }, { DisplayText: 'EspaÃ±ol (Republica Bolivariana de Venezuela) [es-ve]', CultureCode: 'es-ve' }, { DisplayText: 'EspaÃ±ol (RepÃºblica Dominicana) [es-do]', CultureCode: 'es-do' }, { DisplayText: 'EspaÃ±ol (Uruguay) [es-uy]', CultureCode: 'es-uy' }, { DisplayText: 'espaÃ±ol [es]', CultureCode: 'es' }, { DisplayText: 'euskara (euskara) [eu-es]', CultureCode: 'eu-es' }, { DisplayText: 'euskara [eu]', CultureCode: 'eu' }, { DisplayText: 'Filipino (Pilipinas) [fil-ph]', CultureCode: 'fil-ph' }, { DisplayText: 'Filipino [fil]', CultureCode: 'fil' }, { DisplayText: 'fÃ¸royskt (FÃ¸royar) [fo-fo]', CultureCode: 'fo-fo' }, { DisplayText: 'fÃ¸royskt [fo]', CultureCode: 'fo' }, { DisplayText: 'franÃ§ais (Belgique) [fr-be]', CultureCode: 'fr-be' }, { DisplayText: 'franÃ§ais (Canada) [fr-ca]', CultureCode: 'fr-ca' }, { DisplayText: 'franÃ§ais (France) [fr-fr]', CultureCode: 'fr-fr' }, { DisplayText: 'franÃ§ais (Luxembourg) [fr-lu]', CultureCode: 'fr-lu' }, { DisplayText: 'franÃ§ais (PrincipautÃ© de Monaco) [fr-mc]', CultureCode: 'fr-mc' }, { DisplayText: 'franÃ§ais (Suisse) [fr-ch]', CultureCode: 'fr-ch' }, { DisplayText: 'franÃ§ais [fr]', CultureCode: 'fr' }, { DisplayText: 'Frysk (NederlÃ¢n) [fy-nl]', CultureCode: 'fy-nl' }, { DisplayText: 'Frysk [fy]', CultureCode: 'fy' }, { DisplayText: 'Gaeilge (Ã‰ire) [ga-ie]', CultureCode: 'ga-ie' }, { DisplayText: 'Gaeilge [ga]', CultureCode: 'ga' }, { DisplayText: 'GÃ idhlig (An RÃ¬oghachd Aonaichte) [gd-gb]', CultureCode: 'gd-gb' }, { DisplayText: 'GÃ idhlig [gd]', CultureCode: 'gd' }, { DisplayText: 'galego (galego) [gl-es]', CultureCode: 'gl-es' }, { DisplayText: 'galego [gl]', CultureCode: 'gl' }, { DisplayText: 'Hausa (Nigeria) [ha-latn-ng]', CultureCode: 'ha-latn-ng' }, { DisplayText: 'Hausa [ha]', CultureCode: 'ha' }, { DisplayText: 'Hausa [ha-latn]', CultureCode: 'ha-latn' }, { DisplayText: 'hornjoserbÅ¡Ä‡ina (NÄ›mska) [hsb-de]', CultureCode: 'hsb-de' }, { DisplayText: 'hornjoserbÅ¡Ä‡ina [hsb]', CultureCode: 'hsb' }, { DisplayText: 'hrvatski (Bosna i Hercegovina) [hr-ba]', CultureCode: 'hr-ba' }, { DisplayText: 'hrvatski (Hrvatska) [hr-hr]', CultureCode: 'hr-hr' }, { DisplayText: 'hrvatski [hr]', CultureCode: 'hr' }, { DisplayText: 'Igbo (Nigeria) [ig-ng]', CultureCode: 'ig-ng' }, { DisplayText: 'Igbo [ig]', CultureCode: 'ig' }, { DisplayText: 'Inuktitut (Kanatami) [iu-latn-ca]', CultureCode: 'iu-latn-ca' }, { DisplayText: 'Inuktitut [iu]', CultureCode: 'iu' }, { DisplayText: 'Inuktitut [iu-latn]', CultureCode: 'iu-latn' }, { DisplayText: 'Invariant Language (Invariant Country) []', CultureCode: '' }, { DisplayText: 'isiXhosa (uMzantsi Afrika) [xh-za]', CultureCode: 'xh-za' }, { DisplayText: 'isiXhosa [xh]', CultureCode: 'xh' }, { DisplayText: 'isiZulu (iNingizimu Afrika) [zu-za]', CultureCode: 'zu-za' }, { DisplayText: 'isiZulu [zu]', CultureCode: 'zu' }, { DisplayText: 'Ã­slenska (Ãsland) [is-is]', CultureCode: 'is-is' }, { DisplayText: 'Ã­slenska [is]', CultureCode: 'is' }, { DisplayText: 'italiano (Italia) [it-it]', CultureCode: 'it-it' }, { DisplayText: 'italiano (Svizzera) [it-ch]', CultureCode: 'it-ch' }, { DisplayText: 'italiano [it]', CultureCode: 'it' }, { DisplayText: 'julevusÃ¡megiella (Svierik) [smj-se]', CultureCode: 'smj-se' }, { DisplayText: 'julevusÃ¡megiella (Vuodna) [smj-no]', CultureCode: 'smj-no' }, { DisplayText: 'julevusÃ¡megiella [smj]', CultureCode: 'smj' }, { DisplayText: 'kalaallisut (Kalaallit Nunaat) [kl-gl]', CultureCode: 'kl-gl' }, { DisplayText: 'kalaallisut [kl]', CultureCode: 'kl' }, { DisplayText: 'Kanien\'kÃ©ha [moh]', CultureCode: 'moh' }, { DisplayText: 'Kanien\'kÃ©ha [moh-ca]', CultureCode: 'moh-ca' }, { DisplayText: 'K\'iche (Guatemala) [qut-gt]', CultureCode: 'qut-gt' }, { DisplayText: 'K\'iche [qut]', CultureCode: 'qut' }, { DisplayText: 'Kinyarwanda (Rwanda) [rw-rw]', CultureCode: 'rw-rw' }, { DisplayText: 'Kinyarwanda [rw]', CultureCode: 'rw' }, { DisplayText: 'Kiswahili (Kenya) [sw-ke]', CultureCode: 'sw-ke' }, { DisplayText: 'Kiswahili [sw]', CultureCode: 'sw' }, { DisplayText: 'latvieÅ¡u (Latvija) [lv-lv]', CultureCode: 'lv-lv' }, { DisplayText: 'latvieÅ¡u [lv]', CultureCode: 'lv' }, { DisplayText: 'LÃ«tzebuergesch (Luxembourg) [lb-lu]', CultureCode: 'lb-lu' }, { DisplayText: 'LÃ«tzebuergesch [lb]', CultureCode: 'lb' }, { DisplayText: 'lietuviÅ³ (Lietuva) [lt-lt]', CultureCode: 'lt-lt' }, { DisplayText: 'lietuviÅ³ [lt]', CultureCode: 'lt' }, { DisplayText: 'magyar (MagyarorszÃ¡g) [hu-hu]', CultureCode: 'hu-hu' }, { DisplayText: 'magyar [hu]', CultureCode: 'hu' }, { DisplayText: 'Malti (Malta) [mt-mt]', CultureCode: 'mt-mt' }, { DisplayText: 'Malti [mt]', CultureCode: 'mt' }, { DisplayText: 'Mapudungun (Chile) [arn-cl]', CultureCode: 'arn-cl' }, { DisplayText: 'Mapudungun [arn]', CultureCode: 'arn' }, { DisplayText: 'Nederlands (BelgiÃ«) [nl-be]', CultureCode: 'nl-be' }, { DisplayText: 'Nederlands (Nederland) [nl-nl]', CultureCode: 'nl-nl' }, { DisplayText: 'Nederlands [nl]', CultureCode: 'nl' }, { DisplayText: 'norsk (bokmÃ¥l) [nb]', CultureCode: 'nb' }, { DisplayText: 'norsk (nynorsk) [nn]', CultureCode: 'nn' }, { DisplayText: 'norsk [no]', CultureCode: 'no' }, { DisplayText: 'norsk, bokmÃ¥l (Norge) [nb-no]', CultureCode: 'nb-no' }, { DisplayText: 'norsk, nynorsk (Noreg) [nn-no]', CultureCode: 'nn-no' }, { DisplayText: 'Occitan (FranÃ§a) [oc-fr]', CultureCode: 'oc-fr' }, { DisplayText: 'Occitan [oc]', CultureCode: 'oc' }, { DisplayText: 'polski (Polska) [pl-pl]', CultureCode: 'pl-pl' }, { DisplayText: 'polski [pl]', CultureCode: 'pl' }, { DisplayText: 'PortuguÃªs (Brasil) [pt-br]', CultureCode: 'pt-br' }, { DisplayText: 'portuguÃªs (Portugal) [pt-pt]', CultureCode: 'pt-pt' }, { DisplayText: 'PortuguÃªs [pt]', CultureCode: 'pt' }, { DisplayText: 'Reo MÄori (Aotearoa) [mi-nz]', CultureCode: 'mi-nz' }, { DisplayText: 'Reo MÄori [mi]', CultureCode: 'mi' }, { DisplayText: 'romÃ¢nÄƒ (RomÃ¢nia) [ro-ro]', CultureCode: 'ro-ro' }, { DisplayText: 'romÃ¢nÄƒ [ro]', CultureCode: 'ro' }, { DisplayText: 'Rumantsch (Svizra) [rm-ch]', CultureCode: 'rm-ch' }, { DisplayText: 'Rumantsch [rm]', CultureCode: 'rm' }, { DisplayText: 'runasimi (Ecuador) [quz-ec]', CultureCode: 'quz-ec' }, { DisplayText: 'runasimi (Piruw) [quz-pe]', CultureCode: 'quz-pe' }, { DisplayText: 'runasimi (Qullasuyu) [quz-bo]', CultureCode: 'quz-bo' }, { DisplayText: 'runasimi [quz]', CultureCode: 'quz' }, { DisplayText: 'sÃ¤Ã¤mÂ´Ç©iÃµll (LÃ¤Ã¤Â´ddjÃ¢nnam) [sms-fi]', CultureCode: 'sms-fi' }, { DisplayText: 'sÃ¤Ã¤mÂ´Ç©iÃµll [sms]', CultureCode: 'sms' }, { DisplayText: 'sÃ¤mikielÃ¢ (SuomÃ¢) [smn-fi]', CultureCode: 'smn-fi' }, { DisplayText: 'sÃ¤mikielÃ¢ [smn]', CultureCode: 'smn' }, { DisplayText: 'Sesotho sa Leboa (Afrika Borwa) [nso-za]', CultureCode: 'nso-za' }, { DisplayText: 'Sesotho sa Leboa [nso]', CultureCode: 'nso' }, { DisplayText: 'Setswana (Aforika Borwa) [tn-za]', CultureCode: 'tn-za' }, { DisplayText: 'Setswana [tn]', CultureCode: 'tn' }, { DisplayText: 'shqipe (ShqipÃ«ria) [sq-al]', CultureCode: 'sq-al' }, { DisplayText: 'shqipe [sq]', CultureCode: 'sq' }, { DisplayText: 'slovenÄina (SlovenskÃ¡ republika) [sk-sk]', CultureCode: 'sk-sk' }, { DisplayText: 'slovenÄina [sk]', CultureCode: 'sk' }, { DisplayText: 'slovenski (Slovenija) [sl-si]', CultureCode: 'sl-si' }, { DisplayText: 'slovenski [sl]', CultureCode: 'sl' }, { DisplayText: 'srpski (Bosna i Hercegovina) [sr-latn-ba]', CultureCode: 'sr-latn-ba' }, { DisplayText: 'srpski (Crna Gora) [sr-latn-me]', CultureCode: 'sr-latn-me' }, { DisplayText: 'srpski (Srbija i Crna Gora (Prethodno)) [sr-latn-cs]', CultureCode: 'sr-latn-cs' }, { DisplayText: 'srpski (Srbija) [sr-latn-rs]', CultureCode: 'sr-latn-rs' }, { DisplayText: 'srpski [sr]', CultureCode: 'sr' }, { DisplayText: 'srpski [sr-latn]', CultureCode: 'sr-latn' }, { DisplayText: 'suomi (Suomi) [fi-fi]', CultureCode: 'fi-fi' }, { DisplayText: 'suomi [fi]', CultureCode: 'fi' }, { DisplayText: 'svenska (Finland) [sv-fi]', CultureCode: 'sv-fi' }, { DisplayText: 'svenska (Sverige) [sv-se]', CultureCode: 'sv-se' }, { DisplayText: 'svenska [sv]', CultureCode: 'sv' }, { DisplayText: 'Tamazight (DjazaÃ¯r) [tzm-latn-dz]', CultureCode: 'tzm-latn-dz' }, { DisplayText: 'Tamazight [tzm]', CultureCode: 'tzm' }, { DisplayText: 'Tamazight [tzm-latn]', CultureCode: 'tzm-latn' }, { DisplayText: 'TiÃªÌng Viá»‡t (Viá»‡t Nam) [vi-vn]', CultureCode: 'vi-vn' }, { DisplayText: 'TiÃªÌng Viá»‡t [vi]', CultureCode: 'vi' }, { DisplayText: 'TÃ¼rkÃ§e [tr]', CultureCode: 'tr' }, { DisplayText: 'tÃ¼rkmenÃ§e (TÃ¼rkmenistan) [tk-tm]', CultureCode: 'tk-tm' }, { DisplayText: 'tÃ¼rkmenÃ§e [tk]', CultureCode: 'tk' }, { DisplayText: 'U\'zbek (U\'zbekiston Respublikasi) [uz-latn-uz]', CultureCode: 'uz-latn-uz' }, { DisplayText: 'U\'zbek [uz]', CultureCode: 'uz' }, { DisplayText: 'U\'zbek [uz-latn]', CultureCode: 'uz-latn' }, { DisplayText: 'Wolof (SÃ©nÃ©gal) [wo-sn]', CultureCode: 'wo-sn' }, { DisplayText: 'Wolof [wo]', CultureCode: 'wo' }, { DisplayText: 'Yoruba (Nigeria) [yo-ng]', CultureCode: 'yo-ng' }, { DisplayText: 'Yoruba [yo]', CultureCode: 'yo' }, { DisplayText: 'Î•Î»Î»Î·Î½Î¹ÎºÎ¬ (Î•Î»Î»Î¬Î´Î±) [el-gr]', CultureCode: 'el-gr' }, { DisplayText: 'Î•Î»Î»Î·Î½Î¹ÎºÎ¬ [el]', CultureCode: 'el' }, { DisplayText: 'ÐÐ·Ó™Ñ€Ð±Ð°Ñ˜Ò¹Ð°Ð½Â Ð´Ð¸Ð»Ð¸ [az-cyrl]', CultureCode: 'az-cyrl' }, { DisplayText: 'Ð‘Ð°ÑˆÒ¡Ð¾Ñ€Ñ‚ (Ð Ð¾ÑÑÐ¸Ñ) [ba-ru]', CultureCode: 'ba-ru' }, { DisplayText: 'Ð‘Ð°ÑˆÒ¡Ð¾Ñ€Ñ‚ [ba]', CultureCode: 'ba' }, { DisplayText: 'Ð‘ÐµÐ»Ð°Ñ€ÑƒÑÐºÑ– (Ð‘ÐµÐ»Ð°Ñ€ÑƒÑÑŒ) [be-by]', CultureCode: 'be-by' }, { DisplayText: 'Ð‘ÐµÐ»Ð°Ñ€ÑƒÑÐºÑ– [be]', CultureCode: 'be' }, { DisplayText: 'Ð±Ð¾ÑÐ°Ð½ÑÐºÐ¸ (Ð‘Ð¾ÑÐ½Ð° Ð¸ Ð¥ÐµÑ€Ñ†ÐµÐ³Ð¾Ð²Ð¸Ð½Ð°) [bs-cyrl-ba]', CultureCode: 'bs-cyrl-ba' }, { DisplayText: 'Ð±Ð¾ÑÐ°Ð½ÑÐºÐ¸ [bs-cyrl]', CultureCode: 'bs-cyrl' }, { DisplayText: 'Ð±ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸ (Ð‘ÑŠÐ»Ð³Ð°Ñ€Ð¸Ñ) [bg-bg]', CultureCode: 'bg-bg' }, { DisplayText: 'Ð±ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸ [bg]', CultureCode: 'bg' }, { DisplayText: 'ÐšÑ‹Ñ€Ð³Ñ‹Ð· (ÐšÑ‹Ñ€Ð³Ñ‹Ð·ÑÑ‚Ð°Ð½) [ky-kg]', CultureCode: 'ky-kg' }, { DisplayText: 'ÐšÑ‹Ñ€Ð³Ñ‹Ð· [ky]', CultureCode: 'ky' }, { DisplayText: 'ÒšÐ°Ð·Ð°Ò› (ÒšÐ°Ð·Ð°Ò›ÑÑ‚Ð°Ð½) [kk-kz]', CultureCode: 'kk-kz' }, { DisplayText: 'ÒšÐ°Ð·Ð°Ò› [kk]', CultureCode: 'kk' }, { DisplayText: 'Ð¼Ð°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸ Ñ˜Ð°Ð·Ð¸Ðº (ÐœÐ°ÐºÐµÐ´Ð¾Ð½Ð¸Ñ˜Ð°) [mk-mk]', CultureCode: 'mk-mk' }, { DisplayText: 'Ð¼Ð°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸ Ñ˜Ð°Ð·Ð¸Ðº [mk]', CultureCode: 'mk' }, { DisplayText: 'ÐœÐ¾Ð½Ð³Ð¾Ð»Â Ñ…ÑÐ» (ÐœÐ¾Ð½Ð³Ð¾Ð»Â ÑƒÐ»Ñ) [mn-mn]', CultureCode: 'mn-mn' }, { DisplayText: 'ÐœÐ¾Ð½Ð³Ð¾Ð»Â Ñ…ÑÐ» [mn]', CultureCode: 'mn' }, { DisplayText: 'ÐœÐ¾Ð½Ð³Ð¾Ð»Â Ñ…ÑÐ» [mn-cyrl]', CultureCode: 'mn-cyrl' }, { DisplayText: 'Ñ€ÑƒÑÑÐºÐ¸Ð¹ (Ð Ð¾ÑÑÐ¸Ñ) [ru-ru]', CultureCode: 'ru-ru' }, { DisplayText: 'Ñ€ÑƒÑÑÐºÐ¸Ð¹ [ru]', CultureCode: 'ru' }, { DisplayText: 'ÑÐ°Ñ…Ð° (Ð Ð¾ÑÑÐ¸Ñ) [sah-ru]', CultureCode: 'sah-ru' }, { DisplayText: 'ÑÐ°Ñ…Ð° [sah]', CultureCode: 'sah' }, { DisplayText: 'ÑÑ€Ð¿ÑÐºÐ¸ (Ð‘Ð¾ÑÐ½Ð° Ð¸ Ð¥ÐµÑ€Ñ†ÐµÐ³Ð¾Ð²Ð¸Ð½Ð°) [sr-cyrl-ba]', CultureCode: 'sr-cyrl-ba' }, { DisplayText: 'ÑÑ€Ð¿ÑÐºÐ¸ (Ð¡Ñ€Ð±Ð¸Ñ˜Ð° Ð¸ Ð¦Ñ€Ð½Ð° Ð“Ð¾Ñ€Ð° (ÐŸÑ€ÐµÑ‚Ñ…Ð¾Ð´Ð½Ð¾)) [sr-cyrl-cs]', CultureCode: 'sr-cyrl-cs' }, { DisplayText: 'ÑÑ€Ð¿ÑÐºÐ¸ (Ð¡Ñ€Ð±Ð¸Ñ˜Ð°) [sr-cyrl-rs]', CultureCode: 'sr-cyrl-rs' }, { DisplayText: 'ÑÑ€Ð¿ÑÐºÐ¸ (Ð¦Ñ€Ð½Ð° Ð“Ð¾Ñ€Ð°) [sr-cyrl-me]', CultureCode: 'sr-cyrl-me' }, { DisplayText: 'ÑÑ€Ð¿ÑÐºÐ¸ [sr-cyrl]', CultureCode: 'sr-cyrl' }, { DisplayText: 'Ð¢Ð°Ñ‚Ð°Ñ€ (Ð Ð¾ÑÑÐ¸Ñ) [tt-ru]', CultureCode: 'tt-ru' }, { DisplayText: 'Ð¢Ð°Ñ‚Ð°Ñ€ [tt]', CultureCode: 'tt' }, { DisplayText: 'Ð¢Ð¾Ò·Ð¸ÐºÓ£ (Ð¢Ð¾Ò·Ð¸ÐºÐ¸ÑÑ‚Ð¾Ð½) [tg-cyrl-tj]', CultureCode: 'tg-cyrl-tj' }, { DisplayText: 'Ð¢Ð¾Ò·Ð¸ÐºÓ£ [tg]', CultureCode: 'tg' }, { DisplayText: 'Ð¢Ð¾Ò·Ð¸ÐºÓ£ [tg-cyrl]', CultureCode: 'tg-cyrl' }, { DisplayText: 'ÐŽÐ·Ð±ÐµÐº (ÐŽÐ·Ð±ÐµÐºÐ¸ÑÑ‚Ð¾Ð½) [uz-cyrl-uz]', CultureCode: 'uz-cyrl-uz' }, { DisplayText: 'ÐŽÐ·Ð±ÐµÐº [uz-cyrl]', CultureCode: 'uz-cyrl' }, { DisplayText: 'ÑƒÐºÑ€Ð°Ñ—Ð½ÑÑŒÐºÐ° (Ð£ÐºÑ€Ð°Ñ—Ð½Ð°) [uk-ua]', CultureCode: 'uk-ua' }, { DisplayText: 'ÑƒÐºÑ€Ð°Ñ—Ð½ÑÑŒÐºÐ° [uk]', CultureCode: 'uk' }, { DisplayText: 'Õ€Õ¡ÕµÕ¥Ö€Õ¥Õ¶ (Õ€Õ¡ÕµÕ¡Õ½Õ¿Õ¡Õ¶) [hy-am]', CultureCode: 'hy-am' }, { DisplayText: 'Õ€Õ¡ÕµÕ¥Ö€Õ¥Õ¶ [hy]', CultureCode: 'hy' }, { DisplayText: 'áƒ¥áƒáƒ áƒ—áƒ£áƒšáƒ˜ (áƒ¡áƒáƒ¥áƒáƒ áƒ—áƒ•áƒ”áƒšáƒ) [ka-ge]', CultureCode: 'ka-ge' }, { DisplayText: 'áƒ¥áƒáƒ áƒ—áƒ£áƒšáƒ˜ [ka]', CultureCode: 'ka' }, { DisplayText: '×¢×‘×¨×™×ª (×™×©×¨××œ) [he-il]', CultureCode: 'he-il' }, { DisplayText: '×¢×‘×¨×™×ª [he]', CultureCode: 'he' }, { DisplayText: 'Ø§ÙØ±Ø¯Ùˆ (Ù¾Ø§Ú©Ø³ØªØ§Ù†) [ur-pk]', CultureCode: 'ur-pk' }, { DisplayText: 'Ø§ÙØ±Ø¯Ùˆ [ur]', CultureCode: 'ur' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ø£Ø±Ø¯Ù†) [ar-jo]', CultureCode: 'ar-jo' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ø¥Ù…Ø§Ø±Ø§Øª Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ù…ØªØ­Ø¯Ø©) [ar-ae]', CultureCode: 'ar-ae' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ø¨Ø­Ø±ÙŠÙ†) [ar-bh]', CultureCode: 'ar-bh' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ø¬Ø²Ø§Ø¦Ø±) [ar-dz]', CultureCode: 'ar-dz' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ø¹Ø±Ø§Ù‚) [ar-iq]', CultureCode: 'ar-iq' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„ÙƒÙˆÙŠØª) [ar-kw]', CultureCode: 'ar-kw' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©) [ar-sa]', CultureCode: 'ar-sa' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ù…ØºØ±Ø¨ÙŠØ©) [ar-ma]', CultureCode: 'ar-ma' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø§Ù„ÙŠÙ…Ù†) [ar-ye]', CultureCode: 'ar-ye' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (ØªÙˆÙ†Ø³) [ar-tn]', CultureCode: 'ar-tn' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø³ÙˆØ±ÙŠØ§) [ar-sy]', CultureCode: 'ar-sy' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ø¹Ù…Ø§Ù†) [ar-om]', CultureCode: 'ar-om' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ù‚Ø·Ø±) [ar-qa]', CultureCode: 'ar-qa' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ù„Ø¨Ù†Ø§Ù†) [ar-lb]', CultureCode: 'ar-lb' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ù„ÙŠØ¨ÙŠØ§) [ar-ly]', CultureCode: 'ar-ly' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Ù…ØµØ±) [ar-eg]', CultureCode: 'ar-eg' }, { DisplayText: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© [ar]', CultureCode: 'ar' }, { DisplayText: 'Ù¾ÚšØªÙˆ (Ø§ÙØºØ§Ù†Ø³ØªØ§Ù†) [ps-af]', CultureCode: 'ps-af' }, { DisplayText: 'Ù¾ÚšØªÙˆ [ps]', CultureCode: 'ps' }, { DisplayText: 'Ø¯Ø±Ù‰ (Ø§ÙØºØ§Ù†Ø³ØªØ§Ù†) [prs-af]', CultureCode: 'prs-af' }, { DisplayText: 'Ø¯Ø±Ù‰ [prs]', CultureCode: 'prs' }, { DisplayText: 'ÙØ§Ø±Ø³Ù‰ (Ø§ÛŒØ±Ø§Ù†) [fa-ir]', CultureCode: 'fa-ir' }, { DisplayText: 'ÙØ§Ø±Ø³Ù‰ [fa]', CultureCode: 'fa' }, { DisplayText: 'Ø¦Û‡ÙŠØºÛ‡Ø±Ú†Û• (Ø¬Û‡Ú­Ø®Û‡Ø§ Ø®Û•Ù„Ù‚ Ø¬Û‡Ù…Ú¾Û‡Ø±Ù‰ÙŠÙ‰ØªÙ‰) [ug-cn]', CultureCode: 'ug-cn' }, { DisplayText: 'Ø¦Û‡ÙŠØºÛ‡Ø±Ú†Û• [ug]', CultureCode: 'ug' }, { DisplayText: 'Ü£Ü˜ÜªÜÜÜ (Ø³ÙˆØ±ÙŠØ§) [syr-sy]', CultureCode: 'syr-sy' }, { DisplayText: 'Ü£Ü˜ÜªÜÜÜ [syr]', CultureCode: 'syr' }, { DisplayText: 'Þ‹Þ¨ÞˆÞ¬Þ€Þ¨Þ„Þ¦ÞÞ° (Þ‹Þ¨ÞˆÞ¬Þ€Þ¨ ÞƒÞ§Þ‡Þ°Þ–Þ¬) [dv-mv]', CultureCode: 'dv-mv' }, { DisplayText: 'Þ‹Þ¨ÞˆÞ¬Þ€Þ¨Þ„Þ¦ÞÞ° [dv]', CultureCode: 'dv' }, { DisplayText: 'à¤•à¥‹à¤‚à¤•à¤£à¥€ (à¤­à¤¾à¤°à¤¤) [kok-in]', CultureCode: 'kok-in' }, { DisplayText: 'à¤•à¥‹à¤‚à¤•à¤£à¥€ [kok]', CultureCode: 'kok' }, { DisplayText: 'à¤¨à¥‡à¤ªà¤¾à¤²à¥€ (à¤¨à¥‡à¤ªà¤¾à¤²) [ne-np]', CultureCode: 'ne-np' }, { DisplayText: 'à¤¨à¥‡à¤ªà¤¾à¤²à¥€ [ne]', CultureCode: 'ne' }, { DisplayText: 'à¤®à¤°à¤¾à¤ à¥€ (à¤­à¤¾à¤°à¤¤) [mr-in]', CultureCode: 'mr-in' }, { DisplayText: 'à¤®à¤°à¤¾à¤ à¥€ [mr]', CultureCode: 'mr' }, { DisplayText: 'à¤¸à¤‚à¤¸à¥à¤•à¥ƒà¤¤ (à¤­à¤¾à¤°à¤¤à¤®à¥) [sa-in]', CultureCode: 'sa-in' }, { DisplayText: 'à¤¸à¤‚à¤¸à¥à¤•à¥ƒà¤¤ [sa]', CultureCode: 'sa' }, { DisplayText: 'à¤¹à¤¿à¤‚à¤¦à¥€ (à¤­à¤¾à¤°à¤¤) [hi-in]', CultureCode: 'hi-in' }, { DisplayText: 'à¤¹à¤¿à¤‚à¤¦à¥€ [hi]', CultureCode: 'hi' }, { DisplayText: 'à¦…à¦¸à¦®à§€à§Ÿà¦¾ (à¦­à¦¾à§°à¦¤) [as-in]', CultureCode: 'as-in' }, { DisplayText: 'à¦…à¦¸à¦®à§€à§Ÿà¦¾ [as]', CultureCode: 'as' }, { DisplayText: 'à¦¬à¦¾à¦‚à¦²à¦¾ (à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶) [bn-bd]', CultureCode: 'bn-bd' }, { DisplayText: 'à¦¬à¦¾à¦‚à¦²à¦¾ (à¦­à¦¾à¦°à¦¤) [bn-in]', CultureCode: 'bn-in' }, { DisplayText: 'à¦¬à¦¾à¦‚à¦²à¦¾ [bn]', CultureCode: 'bn' }, { DisplayText: 'à¨ªà©°à¨œà¨¾à¨¬à©€ (à¨­à¨¾à¨°à¨¤) [pa-in]', CultureCode: 'pa-in' }, { DisplayText: 'à¨ªà©°à¨œà¨¾à¨¬à©€ [pa]', CultureCode: 'pa' }, { DisplayText: 'àª—à«àªœàª°àª¾àª¤à«€ (àª­àª¾àª°àª¤) [gu-in]', CultureCode: 'gu-in' }, { DisplayText: 'àª—à«àªœàª°àª¾àª¤à«€ [gu]', CultureCode: 'gu' }, { DisplayText: 'à¬“à­œà¬¿à¬† (à¬­à¬¾à¬°à¬¤) [or-in]', CultureCode: 'or-in' }, { DisplayText: 'à¬“à­œà¬¿à¬† [or]', CultureCode: 'or' }, { DisplayText: 'à®¤à®®à®¿à®´à¯ (à®‡à®¨à¯à®¤à®¿à®¯à®¾) [ta-in]', CultureCode: 'ta-in' }, { DisplayText: 'à®¤à®®à®¿à®´à¯ [ta]', CultureCode: 'ta' }, { DisplayText: 'à°¤à±†à°²à±à°—à± (à°­à°¾à°°à°¤Â à°¦à±‡à°¶à°‚) [te-in]', CultureCode: 'te-in' }, { DisplayText: 'à°¤à±†à°²à±à°—à± [te]', CultureCode: 'te' }, { DisplayText: 'à²•à²¨à³à²¨à²¡ (à²­à²¾à²°à²¤) [kn-in]', CultureCode: 'kn-in' }, { DisplayText: 'à²•à²¨à³à²¨à²¡ [kn]', CultureCode: 'kn' }, { DisplayText: 'à´®à´²à´¯à´¾à´³à´‚ (à´­à´¾à´°à´¤à´‚) [ml-in]', CultureCode: 'ml-in' }, { DisplayText: 'à´®à´²à´¯à´¾à´³à´‚ [ml]', CultureCode: 'ml' }, { DisplayText: 'à·ƒà·’à¶‚à·„à¶½ (à·à·Šâ€à¶»à·“ à¶½à¶‚à¶šà·) [si-lk]', CultureCode: 'si-lk' }, { DisplayText: 'à·ƒà·’à¶‚à·„à¶½ [si]', CultureCode: 'si' }, { DisplayText: 'à¹„à¸—à¸¢ (à¹„à¸—à¸¢) [th-th]', CultureCode: 'th-th' }, { DisplayText: 'à¹„à¸—à¸¢ [th]', CultureCode: 'th' }, { DisplayText: 'á ®á ¤á ¨á ­á ­á ¤á ¯ á ¬á ¡á ¯á ¡ (á ªá ¦á ­á ¦á ³á ¡ á ¨á  á ¢á ·á  á ®á ³á  á ¬á ¤ á ³á ¤á ®á ³á  á ³á ¤ á  á ·á  á ³ á £á ¯á £á °) [mn-mong-cn]', CultureCode: 'mn-mong-cn' }, { DisplayText: 'á ®á ¤á ¨á ­á ­á ¤á ¯ á ¬á ¡á ¯á ¡ [mn-mong]', CultureCode: 'mn-mong' }, { DisplayText: 'à½–à½¼à½‘à¼‹à½¡à½²à½‚ (à½€à¾²à½´à½„à¼‹à½§à¾­à¼‹à½˜à½²à¼‹à½‘à½˜à½„à½¦à¼‹à½¦à¾¤à¾±à½²à¼‹à½˜à½à½´à½“à¼‹à½¢à¾’à¾±à½£à¼‹à½à½–à¼) [bo-cn]', CultureCode: 'bo-cn' }, { DisplayText: 'à½–à½¼à½‘à¼‹à½¡à½²à½‚ [bo]', CultureCode: 'bo' }, { DisplayText: 'àº¥àº²àº§ (àºª.àº›.àº›. àº¥àº²àº§) [lo-la]', CultureCode: 'lo-la' }, { DisplayText: 'àº¥àº²àº§ [lo]', CultureCode: 'lo' }, { DisplayText: 'ážáŸ’áž˜áŸ‚ážš (áž€áž˜áŸ’áž–áž»áž‡áž¶) [km-kh]', CultureCode: 'km-kh' }, { DisplayText: 'ážáŸ’áž˜áŸ‚ážš [km]', CultureCode: 'km' }, { DisplayText: 'áƒá“„á’ƒá‘Žá‘á‘¦ (á‘²á“‡á‘•á’¥) [iu-cans-ca]', CultureCode: 'iu-cans-ca' }, { DisplayText: 'áƒá“„á’ƒá‘Žá‘á‘¦ [iu-cans]', CultureCode: 'iu-cans' }, { DisplayText: 'áŠ áˆ›áˆ­áŠ› (áŠ¢á‰µá‹®áŒµá‹«) [am-et]', CultureCode: 'am-et' }, { DisplayText: 'áŠ áˆ›áˆ­áŠ› [am]', CultureCode: 'am' }, { DisplayText: 'ê†ˆêŒ ê±ê‚· (êê‰¸ê“ê‚±ê‡­ê‰¼ê‡©) [ii-cn]', CultureCode: 'ii-cn' }, { DisplayText: 'ê†ˆêŒ ê±ê‚· [ii]', CultureCode: 'ii' }, { DisplayText: 'í•œêµ­ì–´ (ëŒ€í•œë¯¼êµ­) [ko-kr]', CultureCode: 'ko-kr' }, { DisplayText: 'í•œêµ­ì–´ [ko]', CultureCode: 'ko' }, { DisplayText: 'ä¸­æ–‡ [zh]', CultureCode: 'zh' }, { DisplayText: 'ä¸­æ–‡(ä¸­åŽäººæ°‘å…±å’Œå›½) [zh-cn]', CultureCode: 'zh-cn' }, { DisplayText: 'ä¸­æ–‡(å°ç£) [zh-tw]', CultureCode: 'zh-tw' }, { DisplayText: 'ä¸­æ–‡(æ–°åŠ å¡) [zh-sg]', CultureCode: 'zh-sg' }, { DisplayText: 'ä¸­æ–‡(æ¾³é–€ç‰¹åˆ¥è¡Œæ”¿å€) [zh-mo]', CultureCode: 'zh-mo' }, { DisplayText: 'ä¸­æ–‡(ç®€ä½“) [zh-hans]', CultureCode: 'zh-hans' }, { DisplayText: 'ä¸­æ–‡(ç®€ä½“) æ—§ç‰ˆ [zh-chs]', CultureCode: 'zh-chs' }, { DisplayText: 'ä¸­æ–‡(ç¹é«”) [zh-hant]', CultureCode: 'zh-hant' }, { DisplayText: 'ä¸­æ–‡(ç¹é«”) èˆŠç‰ˆ [zh-cht]', CultureCode: 'zh-cht' }, { DisplayText: 'ä¸­æ–‡(é¦™æ¸¯ç‰¹åˆ¥è¡Œæ”¿å€) [zh-hk]', CultureCode: 'zh-hk' }, { DisplayText: 'æ—¥æœ¬èªž (æ—¥æœ¬) [ja-jp]', CultureCode: 'ja-jp' }, { DisplayText: 'æ—¥æœ¬èªž [ja]', CultureCode: 'ja' }]
      }
    };
  }

  _createClass(MockSDataCulture, [{
    key: 'read',
    value: function read(params) {
      if (params) {
        if (params.expectSuccess && params.success) {
          params.success(this.queryResult);
          return;
        } else if (!params.expectSuccess && params.failure) {
          params.failure('class query failed');
          return;
        }
      }
      console.error('params needs to exist and have the functions success and failure'); //eslint-disable-line
    }
  }]);

  return MockSDataCulture;
}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _src = __webpack_require__(0);

Object.keys(_src).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _src[key];
    }
  });
});

/***/ }
/******/ ]);
});
//# sourceMappingURL=icrm-js-services.js.map