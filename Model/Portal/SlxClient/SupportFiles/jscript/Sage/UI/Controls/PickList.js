/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, cookie */

/**
* @class Sage.UI.Controls.PickList
* Base class for PickList widgets.
*/
define("Sage/UI/Controls/PickList", [
    'dojo/topic',
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/Tooltip',
    'Sage/Utility',
    'dijit/Tooltip',
    'dojo/i18n!./nls/PickList',
    'dojo/string',
    'dojo/_base/lang',    
	'Sage/Services/PickListService'
],
function (topic, declare, _Widget, toolTip, util, tooltip, nls, dString, lang, PickListService) {
    var widget = declare('Sage.UI.Controls.PickList', [_Widget], {
        /**
        * @property {object} dataStore The data store which implements fetch()
        */
        dataStore: null,
        /**
        * @property {object} storeOptions The data store options object. See default values in constructor.
        */
        storeOptions: null,
        /**
        * @property {string} pickListName The name of the picklist. This is passed into the storeOptions.query if it was not overridden.
        */
        pickListName: '',
        /**
        * @property {string} The filter of the picklist. This is passed into the storeOptions.query if it was not overridden.
        */
        filter: '',
        /**
        * @property {string} The defaultLanguage of the picklist. This is passed into the storeOptions.query if it was not overridden.
        */
        defaultLanguage: '',
        /**
        * @property {boolean} canEditText Determines if a user can edit text in the textbox.
        */
        canEditText: false,
        /**
        * @property {boolean} itemMustExist Restrict data entered to data available in the picklist.
        */
        itemMustExist: true,
        /**
        * @property {number} maxLength Max length for item entered.
        */
        maxLength: -1,
        /**
        * @property {string} storeMode Determines what dropdown value/text gets posted back to the server (ASP.NET). 
        */
        storeMode: 'text', // text, id, code
        /**
        * @property {string} boundLanguage Determines the language queried instead of the browser. 
        */
        boundLanguage: '',
        /**
        * @property {boolean} filterByLanguage If true, then language fallback is disabled, and queries filter by language values. 
        */
        filterByLanguage: false,
        /**
        * @property {boolean} sort Tell the data store to sort by the picklist items/text property
        */
        sort: true,
        /**
        * @property {string} displayMode Sets the display mode as control or a hyperlink.
        */
        displayMode: 'AsControl', // AsControl, AsHyperlink (do we really need this?)
        /**
        * @property {string} clientID ASP.NET control's ClientID property.
        */
        clientId: '',
        /**
        * @property {boolean} required Set to true if a value is required.
        */
        required: false,
        /**
        * @property {number} tabIndex Sets value for tab order, defaults to 0.
        */
        tabIndex: 0,
        /**
        * @property {string} placeInNodeId Place widget in this dom node.
        */
        placeInNodeId: '',
        /**
        * @property {boolean} autoPostBack Should the control auto postback when value changes (onBlur).
        */
        autoPostBack: false,
        /**
        * @property {string} Tooltip text that displays over control.
        */
        controlTooltip: '',
        /**
        * @property {string} Tooltip text that displays over control button.
        */
        buttonTooltip: '',
        /**
        * @property {boolean} - Indicates whether the implementation should publish that it has dirty data to the ClientBindingManagerService.
        * default = true
        */
        shouldPublishMarkDirty: true,
        /**
        * @property Render the control as a hyperlink
        */
        renderAsHyperlink: false,
        // Private props for ASP.NET
        // TODO: _textId and _codeId are now passed in via config options (textId and codeId)
        _textId: '', // Textbox user sees (or used to see)
        _codeId: '', // Value for textbox, has either text or code
        _picklistId: '',
        _defaultValueId: '', // Default value
        _defaultCodeId: '', // Default code
        _defaultPicklistId: '', // Default Id
        _storageNameSpace: 'PickListData',
        // localized strings
        okText: '',
        missingPickListText: '',
        // end localized strings
        pickListServiceOptions: {},
        _pickListService: null,
        asyncDataLoading: true,
        defaultUseCache: true,
        // TODO: We need a hook for onChange

        /**
        * Takes the following options object: 
        * {
        *  pickListName: 'PickListName', // Required
        *  storeOptions: {}, // Optional
        *  dataStore: {}, // Optional
        *  canEditText: false,
        *  itemMustExist: true,
        *  maxLength: -1,
        *  storeMode: 'text', // text, id, code
        *  sort: true,
        *  displayMode: 'AsControl',
        *  clientId: 'ASP.NET Control ClientID Here',
        *  required: false
        *  placeInNodeId: '',
        *  autoPostBack: false
        * }
        *
        * @constructor
        */
        constructor: function(options) {
            this.storeOptions = options.storeOptions;
            this.dataStore = options.dataStore;
            this.filterByLanguage = options.filterByLanguage || this.filterByLanguage;
            this.boundLanguage = options.boundLanguage || null;
            this.asyncDataLoading = this.async;// used by the formatter to force a sync call.
            this.clientId = options.clientId || '';
            var cid = this.clientId;
            this._textId = cid + '_Text';
            this._codeId = cid + '_Code';
            this._picklistId = cid + '_PicklistId';
            this._defaultValueId = cid + '_DefaultValue';
            this._defaultCodeId = cid + '_DefaultCode';
            this._defaultPicklistId = cid + '_DefaultPicklistId';
            this._pickListService = Sage.Services.getService('PickList');

            if (nls) {
                this.okText = nls.okText;
                this.missingPickListText = nls.missingPickListText;
            }
        },
        postCreate: function() {
            var node = dojo.byId(this.placeInNodeId);
            if (node) {
                this._setDefaultFields();
                dojo.place(this.domNode, node, 'first');
            }
            this.inherited(arguments);
        },
        uninitialize: function() {
            this.inherited(arguments);
        },
        /**
        * Sets store up using given picklist name.
        * @function
        */
        _setStore: function (pickListType, filter) {
            if (pickListType)
                this.pickListServiceOptions.storageMode = pickListType;
            if (filter)
                this.pickListServiceOptions.filter = filter;
        },
        /**
        * Sets hidden fields to correct values if required is true. Logic pulled from old picklist control.
        * @function
        */
        _setDefaultFields: function() {
            if (this.required) {
                var text = dojo.byId(this._textId);
                if (text && text.value === '') {
                    var code = dojo.byId(this._codeId),
                        idField = dojo.byId(this._picklistId);
                    var defaultValue = dojo.byId(this._defaultValueId);
                    var defaultCode = dojo.byId(this._defaultCodeId);
                    var defaultId = dojo.byId(this._defaultPicklistId);
                    text.value = defaultValue.value;
                    code.value = defaultCode.value;
                    idField.value = defaultId.value;
                }
            }
        },
        /**
        * Creates tooltips for button (buttonNode) and control (focusNode)
        * @function
        */
        _setupTooltips: function(buttonNode, focusNode) {
            if (this.controlTooltip && this.controlTooltip !== '' && focusNode) {
                var t = new tooltip({
                    connectId: [focusNode],
                    label: this.controlTooltip,
                    position: ['below']
                });
            }

            if (this.buttonTooltip && this.buttonTooltip !== '' && buttonNode) {
                var t2 = new tooltip({
                    connectId: [buttonNode],
                    label: this.buttonTooltip,
                    position: ['below']
                });
            }
        },
        /**
        * @returns {object} SData picklist object with child items resource included. dojo.Deferred required as an argument.
        * Example: {
        *  name: 'PickList Name',
        *  allowMultiples: false,
        *  valueMustExist: true,
        *  required: true,
        *  alphaSorted: true,
        *  noneEditable: true,
        *  defaultLanguage: 'en'
        *  items: [
        *      { text: 'Arizona', code: 'AZ', number: 0, languageCode: 'en' },
        *      { text: 'Michigan', code: 'MI', number: 1, languageCode: 'en' }
        *  ]
        * }
        */
        getPickListData: function (deferred) { 
            var config = lang.mixin(this, {
                language: this.boundLanguage,
                async: this.asyncDataLoading,
                context: [
                        this.boundLanguage || '_',
                        this.filter || '_',
                        this.filterByLanguageBoundLanguage || '_',
                        this.filterByLanguage || '_',
                        this.storeMode || '_'
                    ].join('-'),
                pickListServiceOptions: {
                    filterByLanguage: this.filterByLanguage,
                    storageMode: this.storeMode
                }
            });
            config.context = config.context.replace(/\s/g, '_');
            config.useCache = config.usecache !== null && typeof config.usecach !== 'undefined' ? config.usecache :
                (config.useCache !== null && typeof config.useCache !== 'undefined' ? config.useCache : config.defaultUseCache);
            config.useCache = typeof config.useCache === 'string' ? config.useCache === "true" : config.useCache;
            config.useCache = config.useCache !== null && typeof(config.useCache) === 'boolean' ? 
                                config.useCache : true;
            if (this.pickListName) {
                var options = this._pickListService.getFirstByName(this.pickListName, 
                    lang.hitch(this, this._getItemSuccess, deferred),  
                    lang.hitch(this, this._getItemsFail, deferred),
                    config
                );
                this._pickListService.read(options);
            } 
        },
        _getItemsFail: function (deferred, e) {
            deferred.errback(e);
        },
        _getItemSuccess: function (deferred, data) {
            var filter = this.filter;
            if (data && data.items && data.items.$resources && data.items.$resources.length > 0) {
                var temp = data.items.$resources;
                if (this.sort && data.alphaSorted) {
                    data.items.$resources = temp.sort(function (a, b) {
                        if (a.text < b.text) 
                            return -1;
                        if (a.text > b.text)
                            return 1;
                        return 0;
                    });
                }
                if (filter) {
                    data.items.$resources = this.filterPickListItemsByFilter(data.items.$resources);
                }
            }
            this.setPicklistAttributes(data);
            deferred.callback(data);
        },
        filterPickListItemsByFilter: function (picklistItems) {
            return this.filterPickListItems(picklistItems, "filter");
        },
        filterPickListItems: function (picklistItems, filterBy) {
            var ValueToMatch = this[filterBy];
            var filteringField = filterBy;
            if (typeof (filterBy) === 'object') {
                if (filterBy.field) {
                    filteringField = filterBy.field;
                }
                if (filterBy.value || typeof(filterBy.value)==='boolean') {
                    ValueToMatch = filterBy.value;
                }
            }

            var filteredResults = [];
            if (ValueToMatch) {
                for (var i = 0; i < picklistItems.length; i++) {
                    var itm = picklistItems[i];
                    if (!this._doesPropertyValueAlreadyExistInList(filteredResults,itm,"code") && itm[filteringField] === ValueToMatch) {
                        filteredResults.push(itm);
                    }
                }
            }
            return filteredResults;
        },
        _doesPropertyValueAlreadyExistInList: function (arr, item, property) {
            var idx, matched = false;
            for (idx = 0; idx < arr.length && !matched; idx++) {
                matched = arr[idx][property] === item[property];
            }
            return matched;
        },
        setPicklistAttributes: function(picklist) {
            if (picklist.valueMustExist) {
                this._setItemMustExistAttr(picklist.valueMustExist);
            }
        },
        /**
        * Sets hidden ASP.NET fields.
        * @function
        */
        setASPNETInputs: function(textValue, codeValue, idValue) {
            if (this._textId && this._codeId && this._picklistId) {
                var text = dojo.byId(this._textId);
                var code = dojo.byId(this._codeId);
                var id = dojo.byId(this._picklistId);
                if (text && code && id) {
                    text.value = textValue;
                    id.value = idValue;
                    code.value = codeValue;
                    this.invokeChangeEvent();
                }
            }
        },
        /**
        * If configured to do so, publishes the markDirty event, showing that there is un-saved data. Will auto postback here if set as well.
        * @function
        */
        invokeChangeEvent: function() {
            if (this.shouldPublishMarkDirty) {
                dojo.publish("Sage/events/markDirty");
            }
            if (this.autoPostBack) {
                __doPostBack(this.clientId, '');
            }
        },
        // Properties
        _getCanEditTextAttr: function() {
            return this.canEditText;
        },
        _setCanEditTextAttr: function(value) {
            this.canEditText = value;
        },
        _getItemMustExistAttr: function() {
            return this.itemMustExist;
        },
        _setItemMustExistAttr: function(value) {
            this.itemMustExist = value;
        },
        _getMaxLengthAttr: function() {
            return this.maxLength;
        },
        _setMaxLengthAttr: function(value) {
            this.maxLength = value;
        },
        _getStoreModeAttr: function() {
            return this.storeMode;
        },
        _setStoreModeAttr: function(value) {
            this.storeMode = value;
            this._setStore(value, this.filter);
        },
        _getPickListNameAttr: function() {
            return this.pickListName;
        },
        _setPickListNameAttr: function(value) {
            this.pickListName = value;
            this._setStore(this.storeMode, this.filter);
        },
        _setPickListFilterAttr: function(value) {
            this.filter = value;
            this._setStore(this.storeMode, value);
         },
        _getPickListFilterAttr: function () {
            return this.filter;
        },
        statics: {
        },
        clearCache: function (name, lang) {
            if (this._pickListService === null) {
                this._pickListService = Sage.Services.getService('PickList');
            }
            this._pickListService.clearCache(name, lang);
        }
    });
    return widget;
});