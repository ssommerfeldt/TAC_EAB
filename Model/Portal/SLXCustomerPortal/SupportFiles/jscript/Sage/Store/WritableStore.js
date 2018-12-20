/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Store/WritableStore", [
        'Sage/Store/BaseSDataStore',
        'Sage/Utility',
        'dojo/_base/declare',
        'dojo/_base/lang'
],
function (BaseSDataStore, Utility, declare, lang) {
    var writableStore = declare('Sage.Store.WritableStore', BaseSDataStore, {
        //  summary:
        //      A data store implementation that allows the EditableGrid to have its data participate in .net postback and binding
        //      Configuration information is received from EditableGrid.
        //  description:
        //      dojo.data.api.Identity Implemented on BaseSDataStore...
        //      dojo.data.api.Read Implemented on BaseSDataStore...
        isInsertMode: false,
        _isPostback: false,
        constructor: function (o) {
            lang.mixin(this, o);
            this.features['dojo.data.api.Write'] = true;
            this.features['dojo.data.api.Notification'] = true;
            this.identityAttributes = ['$cacheID'];
            this.dirtyDataCache = { isDirty: false };
            this.singleResourceRequest = null;
            if (!o.hasOwnProperty('isInsertMode')) {
                this.isInsertMode = Utility.getModeId() === 'insert';
            }
        },
        entry: '',
        query: function (context, queryOptions) {
            //summary:
            //  Retrieve data from dataCarrier, dataCache and/or feed, and provide it to the grid.
            var items = {};
            items.$resources = [];
            var item = null;

            //Read from DataCarrier/TextBox only onLoad.
            if (!this._isPostback && this.dataCarrierId) {
                var carrier = dojo.query(['.', this.dataCarrierId].join(''));
                if (carrier[0].value.length > 0) {
                    var carrierItems = dojo.fromJson(carrier[0].value);
                    var sorted = carrierItems.$resources.sort(Utility.dynamicSort(queryOptions.sort[0].attribute, queryOptions.sort[0].descending));
                    this.addItemsToCache(context, sorted);
                }
            }

            // Restructure the dataCache into an array to supply to the grid.
            for (item in this.data) {
                if (this.data.hasOwnProperty(item) && item !== 'query') {
                    items.$resources.push(this.data[item]);
                }
            }

            this.setContext(context);
            this.verifyService();
            this._isPostback = true;
            //Check to see if anything has been added to cache.  Either from a lookup or a .net DataCarrier.
            //if (items.$resources && items.$resources.length > 0) {
            if (this.isInsertMode) {
                var self = this;
                window.setTimeout(function () { self.onSuccess(context, items); }, 5);
                return items.$resources;
            }
        },
        onSuccess: function (context, feed) {
            //summary:
            //  Provides the items to the grid for rendering.
            //description:
            //  Checks if the data carrier has received the feed header.  If not, add it.
            if (this.entry === '') {
                this.entry = feed;
            }
            if (context.onBegin) {
                context.onBegin.call(context.scope || this, feed.$resources.length, context);
            }
            if (context.onComplete) {
                context.onComplete.call(context.scope || this, feed.$resources, context);
            }
        },
        addToCache: function (context, item, count) {
            var key;
            count = (typeof count === 'undefined') ? (Math.random() * 11) : count;
            if (this.isInsertMode) {
                //console.log(new Date().getTime());
                item.$cacheID = new Date().getTime() + count;
            }
            key = this.getIdentity(item);
            this.data[key] = item;
        },
        addItemsToCache: function (context, items) {
            for (var i = 0; i < items.length; i++) {
                this.addToCache(context, items[i], i);
            }
        },
        clearCache: function () {
            //  summary:
            //      Inherits from BaseSDataStore.clearCache which clears data cache.  Calls clearDirtyDataCache as well for edit mode data.
            this.inherited(arguments);
            this.clearDirtyDataCache();
        },
        clearDirtyDataCache: function () {
            //  summary:
            //    Clears dirty data cache created from edit mode changes.  Sets isDirty flag to 'false'
            for (var key in this.dirtyDataCache) {
                if (key !== 'isDirty') {
                    delete this.dirtyDataCache[key];
                }
            }
            this.dirtyDataCache.isDirty = false;
            //this.dirtyDataCache = { isDirty: false };
        },
        isItem: function (something) {
            //  summary:
            //      Performs hasOwnProperty check on dataCache to verify if the provided item already exists.
            //  returns:
            //      'true' if dataCache has property, else 'false'
            var id = this.getIdentity(/* anything */something);
            if (id && id !== '') {
                return this.data.hasOwnProperty(id);
            }
            return false;
        },
        isItemLoaded: function (/* anything */something) {
            //  summary:
            //      Performs isItem check on 'this' to verify if the provided item already exists.
            //  returns:
            //      'true' if Item exists, else 'false'
            return this.isItem(something); //boolean
        },
        loadItem: function (/* object */keywordArgs) {
            //  summary:
            //      REDUNDANT??
            if (!this.isItem(keywordArgs.item)) throw new Error('Unable to load ' + keywordArgs.item);
        },
        getValues: function (item, attributename) {
            if (this.isItem(item) && (typeof attributename === "string")) {
                return (item[attributename] || []).slice(0);
            }
            return [];
        },
        hasAttribute: function (item, attributename) {
            if (this.isItem(item) && (typeof attributename === "string")) {
                return attributename in item;
            }
            return false;
        },
        close: function () {
            this.clearCache();
        },
        //dojo.data.api.Write implementations...
        deleteItem: function (item, scope) {
            //summary:
            //  Find the item in the cache and remove it.  Grid is responsible for refreshing itself.
            var id = this.getIdentity(item);
            if (id && id !== '') {
                delete this.data[id];
            }
            var options = {};
            options.scope = scope || this;
            var fnSuccess = function () {
                if (typeof this.onResponse === 'function') {
                    this.onResponse.call(this);
                }
            };
            options.success = fnSuccess;
            options.success.call(options.scope);
        },
        isDirty: function (item) {
            //item could be null - if so, it means is any item dirty...
            if (item) {
                var id = this.getIdentity(item);
                if (id && id !== '') {
                    return this.dirtyDataCache.hasOwnPropery(id);
                }
            }
            return this.dirtyDataCache.isDirty;
        },
        newItem: function (args /*, parentInfo */) {
            var request = this.createTemplateRequest();
            if (request) {
                request.read({
                    success: function (entry) {
                        if ((args) && (args.onComplete) && (typeof args.onComplete === 'function')) {
                            args.onComplete.call(args.scope || this, entry);
                        }
                    },
                    failure: this.requestTemplateFailure,
                    scope: this
                });
            }
        },
        createTemplateRequest: function () {
            //The entity to create the relationship/New record for, from the selection.
            var request = new Sage.SData.Client.SDataTemplateResourceRequest(this.service);
            if ((this.resourceKind) && (this.resourceKind !== '')) {
                request.setResourceKind(this.resourceKind);
            }
            return request;
        },
        requestTemplateFailure: function () {
        },
        saveNewEntity: function (entity, success, failure, scope) {
            //summary:
            //  Create a new entity and add it to the dataCache.
            this.addToCache(scope, entity);
            success();
        },
        createItem: function (item, scope) {
            var options = {};
            options.scope = scope || this;
            options.scope.store = this;
            var fnSuccess = function (created) {
                if (typeof this.onResponse === 'function') {
                    this.onResponse.call(this, created);
                }
            };
            options.success = fnSuccess;
            this.addToCache(scope, item);
            options.success.call(options.scope, item);
        },
        revert: function () {
            //  summary:
            //      Clear the dirty data cache and call the onDataReset function.
            //      The grid calls fetch again and gets the data.
            this.clearDirtyDataCache();
            this.onDataReset();
        },
        setValue: function (item, attribute, value) {
            //if (typeof console !== 'undefined') { console.log('setValue - %o %o %o', item, attribute, value) };
            var oldValue = this.getValue(item, attribute, '');
            Utility.setValue(item, attribute, value);
            this.onSet(item, attribute, oldValue, value);
            return true;
        },
        setValues: function (item, attribute, values) {
            alert('not implemented - setValues');
            //use where values is an array
        },
        unsetAttribute: function (item, attribute) {
            alert('not implemented - unsetAttribute');
            //delete all values of an attribute on the item...
        },
        dataCacheToArray: function () {
            var resources = [];
            for (var item in this.data) {
                if (this.data.hasOwnProperty(item) && item !== 'query') {
                    resources.push(this.data[item]);
                }
            }
            return resources;
        },
        onDataChange: function () {
            //There is no dirtyDataCache tracking for Insert views.  Clear dirty data here, just in case.
            this.clearDirtyDataCache();
            var carrier = dojo.query(['.', this.dataCarrierId].join(''));
            if (carrier[0]) {
                this.entry.$resources = this.dataCacheToArray();
                carrier[0].value = JSON.stringify(this.entry);
            }
        },
        //dojo.data.api.Notification
        onSet: function (/* item */item,
        /*attribute-name-string*/attribute,
        /*object | array*/oldValue,
        /*object | array*/newValue) {
            // summary:
            // See dojo.data.api.Notification.onSet()
            // No need to do anything. This method is here just so that the
            // client code can connect observers to it.
        },
        onNew: function (newItem, parentInfo) {
            //nothing to do here - client code connects observers to this
        },
        onDelete: function (deletedItem) {
            //nothing to do here - client code connects observers to this
        },
        onDataReset: function () {
        },
        onDataSaved: function () {
        },
        onItemSaved: function (savedItem, parentInfo) {
        },
        onItemNotSaved: function (notSavedItem, error) {
        }
    });
    return writableStore;
});
