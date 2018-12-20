/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
// Taken from argos-sdk (https://github.com/Sage/argos-sdk/blob/topic-tablet-support/src/Store/SData.js)
define('Sage/Store/SData', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/Deferred',
    'dojo/store/util/QueryResults',
    'dojo/string',
    'dojo/json',
    '../Utility'
], function (
    declare,
    lang,
    array,
    Deferred,
    QueryResults,
    string,
    json,
    utility
) {
    return declare('Sage.Store.SData', null, {
        doDateConversion: false,

        /* todo: is this the appropriate name for the expansion scope? */
        scope: null,
        where: null,
        select: null,
        include: null,
        orderBy: null,
        service: null,
        request: null,
        queryName: null,
        queryArgs: null,
        entityName: null,
        contractName: null,
        resourceKind: null,
        resourceProperty: null,
        resourcePredicate: null,
        applicationName: null,
        dataSet: null,
        executeQueryAs: null,
        executeGetAs: null,

        itemsProperty: '$resources',
        idProperty: '$key',
        labelProperty: '$descriptor',
        entityProperty: '$name',
        versionProperty: '$etag',
        dataCache: [],
        /**
         * @constructor
         */
        constructor: function constructor(props) {
            lang.mixin(this, props);
        },
        _createDeleteRequest: function _createDeleteRequest(object, options) {
            var request = utility.expand(this, options.request || this.request);

            var id = options.id || this.getIdentity(object);
            if (request) {
                request = request.clone();
            } else {
                id = id || utility.expand(this.scope || this, options.resourcePredicate || this.resourcePredicate);

                var contractName = utility.expand(this.scope || this, options.contractName || this.contractName);
                var resourceKind = utility.expand(this.scope || this, options.resourceKind || this.resourceKind);
                var resourceProperty = utility.expand(this.scope || this, options.resourceProperty || this.resourceProperty);
                var resourcePredicate;

                if (id) {
                    resourcePredicate = /\s+/.test(id) ? id : string.substitute("'${0}'", [id]);
                }

                if (resourceProperty) {
                    request = new Sage.SData.Client.SDataResourcePropertyRequest(this.service)
                      .setResourceProperty(resourceProperty)
                      .setResourceSelector(resourcePredicate);
                } else {
                    request = new Sage.SData.Client.SDataSingleResourceRequest(this.service)
                      .setResourceSelector(resourcePredicate);
                }

                if (contractName) {
                    request.setContractName(contractName);
                }

                if (resourceKind) {
                    request.setResourceKind(resourceKind);
                }
            }
            return request;
        },
        _createEntryRequest: function _createEntryRequest(identity, getOptions) {
            var request = utility.expand(this, getOptions.request || this.request);
            var id = identity;
            if (request) {
                request = request.clone();
            } else {
                id = id || utility.expand(this.scope || this, getOptions.resourcePredicate || this.resourcePredicate);

                var contractName = utility.expand(this.scope || this, getOptions.contractName || this.contractName);
                var resourceKind = utility.expand(this.scope || this, getOptions.resourceKind || this.resourceKind);
                var dataSet = utility.expand(this.scope || this, getOptions.dataSet || this.dataSet);
                var resourceProperty = utility.expand(this.scope || this, getOptions.resourceProperty || this.resourceProperty);
                var resourcePredicate;

                if (id) {
                    resourcePredicate = /\s+/.test(id) ? id : string.substitute("'${0}'", [id]);
                }

                if (resourceProperty) {
                    request = new Sage.SData.Client.SDataResourcePropertyRequest(this.service)
                      .setResourceProperty(resourceProperty)
                      .setResourceSelector(resourcePredicate);
                } else {
                    request = new Sage.SData.Client.SDataSingleResourceRequest(this.service)
                      .setResourceSelector(resourcePredicate);
                }

                if (contractName) {
                    request.setContractName(contractName);
                }

                if (resourceKind) {
                    request.setResourceKind(resourceKind);
                }

                if (dataSet) {
                    request.setDataSet(dataSet);
                }
            }

            var select = utility.expand(this.scope || this, getOptions.select || this.select);
            var include = utility.expand(this.scope || this, getOptions.include || this.include);

            if (select && select.length > 0) {
                request.setQueryArg('select', select.join(',').replace(/\./g, '/'));
            }

            if (include && include.length > 0) {
                request.setQueryArg('include', include.join(','));
            }

            return request;
        },
        _createFeedRequest: function _createFeedRequest(q, queryOptions) {
            var request = utility.expand(this, queryOptions.request || this.request);
            if (request) {
                request = request.clone();
            } else {
                var queryName = utility.expand(this.scope || this, queryOptions.queryName || this.queryName);
                var contractName = utility.expand(this.scope || this, queryOptions.contractName || this.contractName);
                var resourceKind = utility.expand(this.scope || this, queryOptions.resourceKind || this.resourceKind);
                var resourceProperty = utility.expand(this.scope || this, queryOptions.resourceProperty || this.resourceProperty);
                var resourcePredicate = utility.expand(this.scope || this, queryOptions.resourcePredicate || this.resourcePredicate);
                var applicationName = utility.expand(this.scope || this, queryOptions.applicationName || this.applicationName);
                var dataSet = utility.expand(this.scope || this, queryOptions.dataSet || this.dataSet);
                var queryArgs = utility.expand(this.scope || this, queryOptions.queryArgs || this.queryArgs);
                var operationSDataStore = utility.expand(this.scope || this, queryOptions.operationSDataStore || this.operationSDataStore);
                var operationName = utility.expand(this.scope || this, queryOptions.operationName || this.operationName);

                if (queryName) {
                    request = new Sage.SData.Client.SDataNamedQueryRequest(this.service)
                      .setQueryName(queryName);

                    if (resourcePredicate) {
                        request.getUri().setCollectionPredicate(resourcePredicate);
                    }
                } else if (resourceProperty) {
                    request = new Sage.SData.Client.SDataResourcePropertyRequest(this.service)
                      .setResourceProperty(resourceProperty)
                      .setResourceSelector(resourcePredicate);
                } else if (operationSDataStore === 'Sage.SData.Client.SDataServiceOperationRequest') {
                    request = new Sage.SData.Client.SDataServiceOperationRequest(this.service)
                        .setContractName(contractName)
                        .setOperationName(operationName);
                } else {
                    request = new Sage.SData.Client.SDataResourceCollectionRequest(this.service);
                }

                if (contractName) {
                    request.setContractName(contractName);
                }

                if (resourceKind) {
                    request.setResourceKind(resourceKind);
                }

                if (applicationName) {
                    request.setApplicationName(applicationName);
                }

                if (dataSet) {
                    request.setDataSet(dataSet);
                }

                if (queryArgs) {
                    for (var arg in queryArgs) {
                        if (queryArgs.hasOwnProperty(arg)) {
                            request.setQueryArg(arg, queryArgs[arg]);
                        }
                    }
                }
            }

            var select = utility.expand(this.scope || this, queryOptions.select || this.select);
            var include = utility.expand(this.scope || this, queryOptions.include || this.include);
            var orderBy = utility.expand(this.scope || this, queryOptions.sort || this.orderBy);

            if (select && select.length > 0) {
                request.setQueryArg('select', select.join(',').replace(/\./g, '/'));
            }

            if (include && include.length > 0) {
                request.setQueryArg('include', include.join(','));
            }

            if (orderBy) {
                if (typeof orderBy === 'string') {
                    request.setQueryArg('orderby', orderBy);
                } else if (orderBy.length > 0) {
                    var order = [];
                    array.forEach(orderBy, function forEach(v) {
                        if (v.descending) {
                            this.push(v.attribute + ' desc');
                        } else {
                            this.push(v.attribute);
                        }
                    }, order);

                    request.setQueryArg('orderby', order.join(','));
                }
            }

            var where = utility.expand(this.scope || this, queryOptions.where || this.where);
            var conditions = [];
            if (where) {
                conditions.push(where);
            }

            var query = utility.expand(this.scope || this, q);

            if (query) {
                if (typeof query === "string") {
                    conditions.push(query);
                }
                else {
                    console.warn("SDATA Store: A query object was found, but was not of correct type to include in query conditions.");
                }
            }

            if (conditions.length > 0) {
                request.setQueryArg('where', '(' + conditions.join(') and (') + ')');
            }

            if (typeof queryOptions.start !== 'undefined') {
                request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.StartIndex, queryOptions.start + 1);
            }

            if (typeof queryOptions.count !== 'undefined') {
                request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Count, queryOptions.count);
            }

            return request;
        },
        _onCancel: function _onCancel(/*deferred*/) { },
        _onRequestFeedSuccess: function _onRequestFeedSuccess(queryDeferred, feed) {
            if (feed) {
                var items = lang.getObject(this.itemsProperty, false, feed);
                var total = typeof feed.$totalResults === 'number' ? feed.$totalResults : -1;

                queryDeferred.total = total;

                // Depracated. Use calling control's onLoadComplete events
                if (this.onComplete) {
                    this.onComplete(items, total);
                }

                this.dataCache = items;
                queryDeferred.resolve(items ? items : []);
            } else {
                var error = new Error('The feed result is invalid.');
                queryDeferred.reject(error);
            }
        },
        _onRequestEntrySuccess: function _onRequestEntrySuccess(deferred, entry) {
            if (entry) {
                deferred.resolve(this.doDateConversion ? this._handleDateConversion(entry) : entry);
            } else {
                var error = new Error('The entry result is invalid.');
                deferred.reject(error);
            }
        },
        _onRequestFailure: function _onRequestFailure(deferred, xhr, xhrOptions) {
            var error = new Error('An error occurred requesting: ' + xhrOptions.url);

            error.xhr = xhr;
            error.status = xhr.status;
            error.aborted = false;
            error.url = xhrOptions.url;

            deferred.reject(error);
        },
        _onRequestAbort: function _onRequestAbort(deferred, xhr, xhrOptions) {
            var error = new Error('An error occurred requesting: ' + xhrOptions.url);

            error.xhr = xhr;
            error.status = 0;
            error.responseText = null;
            error.aborted = true;

            deferred.reject(error);
        },
        _handleDateConversion: function _handleDateConversion(entry) {
            for (var prop in entry) {
                if (utility.Convert.isDateString(entry[prop])) {
                    entry[prop] = utility.Convert.toDateFromString(entry[prop]);
                }
            }

            return entry;
        },
        get: function get(id, getOptions /* sdata only */) {
            var handle = {};
            var deferred = new Deferred();
            var request = this._createEntryRequest(id, getOptions || {});
            var method = this.executeGetAs ? request[this.executeGetAs] : request.read;

            handle.value = method.call(request, {
                success: this._onRequestEntrySuccess.bind(this, deferred),
                failure: this._onRequestFailure.bind(this, deferred),
                aborted: this._onRequestAbort.bind(this, deferred)
            });

            return deferred;
        },
        /**
         * Returns an object's identity using this.idProperty
         * @param {Object} object The object to get the identity from
         * @returns {String|Number}
         */
        getIdentity: function getIdentity(object) {
            return lang.getObject(this.idProperty, false, object);
        },
        /**
         * Returns an object's label using this.labelProperty
         * @param {Object} object The object to get the label from
         * @returns {String}
         */
        getLabel: function getLabel(object) {
            return lang.getObject(this.labelProperty, false, object);
        },
        /**
         * Returns an object's entity using this.entityProperty
         * @param {Object} object The object to get the entity from
         * @returns {String|Object}
         */
        getEntity: function getEntity(object) {
            return lang.getObject(this.entityProperty, false, object);
        },
        /**
         * Returns an object's version using this.versionProperty
         * @param {Object} object The object to get the version from
         * @returns {String}
         */
        getVersion: function getVersion(object) {
            return lang.getObject(this.versionProperty, false, object);
        },
        /**
         * Stores an object.
         * @param {Object} object The object to store.
         * @param {Object} putOptions Additional directives for storing objects.
         * @param {String|Number} putOptions.id
         * @param {String|Object} putOptions.entity
         * @param {String} putOptions.version
         * @param {Boolean} putOptions.overwrite
         * @returns {String|Number}
         */
        put: function put(object, putOptions) {
            putOptions = putOptions || {};

            var id = putOptions.id || this.getIdentity(object);
            var entity = putOptions.entity || this.entityName;
            var version = putOptions.version || this.getVersion(object);
            var atom = !this.service.isJsonEnabled();

            if (id) {
                object.$key = id;
            }

            if (entity && atom) {
                object.$name = entity;
            }

            if (version) {
                object.$etag = version;
            }

            var handle = {};
            var deferred = new Deferred();
            var request = this._createEntryRequest(id, putOptions);
            var method = putOptions.create ? request.create : request.update;

            handle.value = method.call(request, object, {
                success: this._onTransmitEntrySuccess.bind(this, deferred),
                failure: this._onRequestFailure.bind(this, deferred),
                aborted: this._onRequestAbort.bind(this, deferred)
            });

            return deferred;
        },
        _onTransmitEntrySuccess: function _onTransmitEntrySuccess(deferred, entry) {
            deferred.resolve(this.doDateConversion ? this._handleDateConversion(entry) : entry);
        },
        /**
         * Creates an object, throws an error if the object already exists.
         * @param {Object} object The object to store
         * @param {Object} addOptions Additional directives for creating objects
         * @param {Boolean} addOptions.overwrite
         */
        add: function add(object, addOptions) {
            addOptions = addOptions || {};
            addOptions.create = true;
            return this.put(object, addOptions);
        },
        newItem: function (args /*, parentInfo */) {
            var request = new Sage.SData.Client.SDataTemplateResourceRequest(this.service);
            request.setResourceKind(this.resourceKind);
            request.read({
                success: function (entry) {
                    this._entity = entry;
                    if ((args.onComplete) && (typeof args.onComplete === 'function')) {
                        args.onComplete.call(args.scope || this, entry);
                    }
                },
                failure: function (err) {
                    if (args.onError) {
                        args.onError.call(args.scope || this, err);
                    }
                },
                scope: this
            });
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
            this.add(item).then(lang.hitch(this, function () {
                this.dataCache.push(item);
                options.success.call(options.scope, item);
            }));
        },
        deleteItem: function (selectedItems, scope) {
            var batchRequest = new Sage.SData.Client.SDataBatchRequest(this.service);
            batchRequest.setResourceKind(this.resourceKind);
            batchRequest.using(lang.hitch(this, function () {
                for (var i = 0; i < selectedItems.length; i++) {
                    var request = new Sage.SData.Client.SDataSingleResourceRequest(this.service);
                    request.setResourceKind(this.resourceKind);
                    request.setResourceSelector("'" + selectedItems[i].$key + "'");
                    request['delete']({}, { scope: this, ignoreETag: true });
                }
            }));
            batchRequest.commit({
                scope: this,
                ignoreETag: true,
                success: function (entry) {
                    var resources = entry.$resources[0];
                    if (resources.$diagnoses!==undefined) {
                        var diagnoses = resources.$diagnoses[0];
                        if (diagnoses.applicationCode && typeof diagnoses.applicationCode === "string" && diagnoses.applicationCode.indexOf("SDataExceptionDiagnoses") != -1) {
                            if (entry.$resources[0].$httpStatus == 500) {
                                scope.onResponseExceptionMsg = entry.$resources[0].$diagnoses[0].message;
                                
                            }
                        }
                    }
                    
                    var options = {};
                    options.scope = scope || this;
                    var fnSuccess = function () {
                        if (typeof this.onResponse === 'function') {
                            this.onResponse.call(this, options.scope.onResponseExceptionMsg);
                        }
                    };
                    options.success = fnSuccess;
                    options.success.call(options.scope);
                },
                failure: function (err) {
                    console.error(err);
                }
            });
        },
        remove: function (item, options) {
            options = options || {};

            var handle = {};
            var deferred = new Deferred();
            var request = this._createDeleteRequest(item, options);
            var method = request["delete"];

            handle.value = method.call(request, item, {
                success: this._onTransmitEntrySuccess.bind(this, deferred),
                failure: this._onRequestFailure.bind(this, deferred),
                aborted: this._onRequestAbort.bind(this, deferred)
            });

            return deferred;
        },
        /**
         * Queries the store for objects. This does not alter the store, but returns a
         * set of data from the store.
         *
         * @param {String|Object|Function} query The query to use for retrieving objects from the store.
         * @param {Object} queryOptions
         * @returns {dojo.store.api.Store.QueryResults}
         *
         */
        query: function query(q, queryOptions) {
            var handle = {};
            var queryDeferred = new Deferred(this._onCancel.bind(this, handle));
            var request = this._createFeedRequest(q, queryOptions || {});

            queryDeferred.total = -1;

            var options = {
                success: this._onRequestFeedSuccess.bind(this, queryDeferred),
                failure: this._onRequestFailure.bind(this, queryDeferred),
                aborted: this._onRequestAbort.bind(this, queryDeferred),
                httpMethodOverride: queryOptions && queryOptions.httpMethodOverride
            };

            var method = request.read;
            if (this.executeQueryAs) {
                method = request[this.executeQueryAs];
            } else if (request instanceof Sage.SData.Client.SDataResourcePropertyRequest) {
                method = request.readFeed;
            } else if (request instanceof Sage.SData.Client.SDataServiceOperationRequest) {
                method = request.execute;
                handle.value = method.call(request, this.entry, options);
                return QueryResults(queryDeferred); // eslint-disable-line
            }
            handle.value = method.call(request, options);
            return QueryResults(queryDeferred); // eslint-disable-line
        },
        /**
         * Not implemented in this store.
         */
        transaction: function transaction() { },
        /**
         * Not implemented in this store.
         */
        getChildren: function getChildren(/*parent, options*/) { },
        /**
         * Returns any metadata about the object. This may include attribution,
         * cache directives, history, or version information.
         *
         * @param {Object} object The object to return metadata for.
         * @return {Object} Object containing the metadata.
         * @return {String|Number} return.id
         * @return {String} return.label
         * @return {String|Object} return.entity
         * @return {String} return.version
         */
        getMetadata: function getMetadata(object) {
            if (object) {
                return {
                    id: this.getIdentity(object),
                    label: this.getLabel(object),
                    entity: this.getEntity(object),
                    version: this.getVersion(object)
                };
            }

            return null;
        },
        getLabelAttributes: function (item) {
            if (this.labelProperty) {
                return [this.labelProperty]; //array
            }
            return null; //null
        },
        getValue: function (item, attribute, defaultValue) {
            return utility.getValue(item, attribute);
        },
        /***********************************/
        // TODO: Remove all methods listed below after 8.3.
        /***********************************/
        onSuccess: function (context, feed) {
            console.error('store onSuccess function is not guaranteed to exist after 8.3');
        },
        isItem: function (something) {
            console.warn('store isItem function is not guaranteed to exist after 8.3');
            var id = this.getIdentity(something);
            if (id && id !== '') {
                return this.dataCache.hasOwnProperty(id);
            }
            return false;
        },
        isItemLoaded: function (/* anything */something) {
            console.error('store isItemLoaded function is not guaranteed to exist after 8.3');
            return this.isItem(something); //boolean
        },
        loadItem: function (/* object */keywordArgs) {
            console.error('store loadItem function is not guaranteed to exist after 8.3');
            if (!this.isItem(keywordArgs.item)) throw new Error('Unable to load ' + keywordArgs.item);
        },
        getValues: function (item, attributename) {
            console.error('store getValues function is not guaranteed to exist after 8.3');
            if (this.isItem(item) && (typeof attributename === "string")) {
                return (item[attributename] || []).slice(0);
            }
            return [];
        },
        isDirty: function (item) {
            console.error('store isDirty function is not guaranteed to exist after 8.3');
        },
        saveNewEntity: function (entity, success, failure, scope) {
            console.error('store saveNewEntity is deprecated');
            this.add(entity).then(lang.hitch(this, function () {
                success.call(scope, entity);
            }));
        },
        revert: function () {
            console.error('store revert function is not guaranteed to exist after 8.3');
        },
        save: function (scope) {
            console.error('store save function is not guaranteed to exist after 8.3');
        },
        setValue: function (item, attribute, value) {
            console.error('store setValue function is not guaranteed to exist after 8.3');
        },
        setValues: function (item, attribute, values) {
            console.error('store setValues function is not guaranteed to exist after 8.3');
        },
        unsetAttribute: function (item, attribute) {
            console.error('store unsetAttribute function is not guaranteed to exist after 8.3');
        },
        onSet: function (/* item */item,
        /*attribute-name-string*/attribute,
        /*object | array*/oldValue,
        /*object | array*/newValue) {
            console.error('store onSet function is not guaranteed to exist after 8.3');
        },
        onNew: function (newItem) {
        },
        onDelete: function (deletedItem) {
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
});
