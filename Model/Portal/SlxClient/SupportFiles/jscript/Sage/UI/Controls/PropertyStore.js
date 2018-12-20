/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/PropertyStore", [
    'dojo/string',
    'dojo/_base/declare',
    'dojo/store/Memory',
	'Sage/Data/SDataServiceRegistry',
    'dojo/store/JsonRest',
    'dojo/json',
    'dojo/_base/Deferred',
    'dojo/DeferredList',
    'dojo/request',
    'dojo/i18n!./nls/PropertyStore',
    'Sage/UI/Controls/FieldStore'
],
function (
    dString,
    declare,
    memory,
	SDataServiceRegistry,
    JsonRest,
    json,
    Deferred,
    DeferredList,
    request,
    nlsResource,
    FieldStore
) {

    var PropertyStoreModel = declare('Sage.UI.Controls.PropertyStore', null, {
        _nlsResource: null,
        fStore: null,

        // queryOptions contains the 5 different type filters.
        constructor: function (id, queryOptions, addin) {

            this._nlsResource = nlsResource;

            this.store.selectedEntity = id;
            this.store.addins = addin;
            this.fStore = new FieldStore();
            this.store.allTypes = this.fStore.typeStore;

            // queryOptions:{Keywords:[{Key,value}],allMatch}
            if (typeof (queryOptions) !== "undefined" && typeof (queryOptions.Keywords) !== "undefined") {
                if (queryOptions.allMatch) {
                    this.store.types = this.fStore.queryByKeyWordsAllMatch(queryOptions.Keywords);
                }
                else {
                    this.store.types = this.fStore.queryByKeywordsOneMatchMatch(queryOptions.Keywords);
                }
            }
            else {
                this.store.types = this.fStore.query(queryOptions);
            }

            this.store.filterByType = this.store.types.data.length;
            if (typeof (queryOptions) !== "undefined") {
                if (typeof (queryOptions.onlyProperties) !== "undefined") {
                    this.store.onlyProperties = queryOptions.onlyProperties;
                }
                if (typeof (queryOptions.maxLevels) !== "undefined") {
                    this.store.maxLevel = queryOptions.maxLevels;
                }
            }
        },


        lookup: function (strEntity, strProperty) {
            var where = "${0} eq '${1}'";
            var entity = 'entities("${0}")/properties';
            var foundProperties = [];

            var request = new Sage.SData.Client.SDataSingleResourceRequest(SDataServiceRegistry.getSDataService('metadata'))
                     .setResourceKind(dString.substitute(entity, [strEntity]))
                     .setQueryArg('format', 'json')
                     .setQueryArg('where', dString.substitute(where, ['propertyName', strProperty]));

            request.read({
                async: false,
                scope: this,
                success: function (response) {

                    var typeName = this.store.dataTypeIdToTypeName(response.dataTypeId);

                    // if the type cannot be found return a blank type object.
                    if (typeof (typeName) === "undefined") {
                        typeName = this.fStore.blankTemplate;
                    }

                    foundProperties.push({
                        id: response.id,
                        name: response.propertyName,
                        property: response.propertyName,
                        dataType: typeName
                    });
                },
                failure: function (data) {
                }
            });
            return foundProperties;
        },

        store: new JsonRest({
            target: "",
            selectedEntity: '',

            types: null,
            filterByType: false,
            onlyProperties: false,
            allTypes: null,

            baseTemplate: "${0}:${1}${2}", // BaseEntity:[relationTemplate]{Field}
            relationTemplate: "${0}${1}${2}.${3}!",//{ParentKey}(> or = depending on the relation){ChildKey}.ChildEntity!

            maxLevel: -1,

            addins: false,

            dataTypeIdToTypeName: function (id) {
                var index = this.types.index[id];
                return this.types.data[index];
            },
            getChildren: function (object, onComplete) {
                var items = new memory();
                var entity, property, oldrelationPath, base;

                var baseTemplate = this.baseTemplate;
                var relationTemplate = this.relationTemplate;

                var typesWanted = this.types;
                var filterByType = this.filterByType;
                var allTypes = this.allTypes;

                if (object.name == 'rootNode') {
                    entity = this.selectedEntity;
                    property = '';
                    oldrelationPath = '';
                    base = entity;
                }
                else {
                    entity = object.relatedEntity;
                    property = object.property + '.';
                    oldrelationPath = object.oldrelationPath ? object.oldrelationPath : '';
                    base = object.base;
                }

                var currentLevel = object.Level + 1;

                var wait = [], deferred;
                deferred = new Deferred();
                var listOfDeferred = [];
                ///////////////////////////////////////////////////
                // Request 1
                if (entity.length > 0) {
                    var promise1 = request(new Sage.SData.Client.SDataSingleResourceRequest(Sage.Data.SDataServiceRegistry.getSDataService('metadata'))
                        .setResourceKind('entities')
                        .setResourceSelector('"' + entity + '"')
                        .setQueryArg('select', 'properties/*').setQueryArg('format', 'json').setQueryArg('Count', '500')).then(function (response) {
                            var result = json.parse(response);
                            var entityFields = result.properties.$resources;
                            for (var i = 0; i <= entityFields.length - 1; i++) {
                                var enFi = entityFields[i];
                                if (enFi.isIncluded === true) {
                                    if (filterByType) {
                                        var index = typesWanted.index[enFi.dataTypeId];
                                        if (index >= 0) {
                                            var typeName = typesWanted.data[index];
                                            items.add({
                                                id: enFi.id,
                                                display: enFi.displayName,
                                                columName: property + enFi.columnName,
                                                name: enFi.propertyName,
                                                property: property + enFi.propertyName,
                                                dataType: typeName,
                                                Level: currentLevel,
                                                legacyPath: dString.substitute(baseTemplate, [base, oldrelationPath, enFi.columnName])
                                            });
                                        }
                                    }
                                    else {
                                        var tni = allTypes.index[enFi.dataTypeId];
                                        if (tni >= 0) {
                                            var tn = allTypes.data[tni];
                                            items.add({
                                                id: enFi.id,
                                                display: enFi.displayName,
                                                columName: property + enFi.columnName,
                                                name: enFi.propertyName,
                                                property: property + enFi.propertyName,
                                                dataType: tn,
                                                Level: currentLevel,
                                                legacyPath: dString.substitute(baseTemplate, [base, oldrelationPath, enFi.columnName])
                                            });
                                        }
                                    }
                                }
                            }
                        });

                    listOfDeferred.push(promise1);
                    if (!this.onlyProperties) {
                        // Request 2
                        var whereString = dString.substitute(
                                '(parentEntity.name eq "${0}") or (childEntity.name eq "${0}")', [entity]
                                );
                        if (filterByType < 26) {
                            whereString = dString.substitute(
                                '(parentEntity.name eq "${0}" and cardinality eq "M:1") or (childEntity.name eq "${0}" and cardinality eq "1:M")', [entity]
                            );
                        }
                        var promise2 = request(new Sage.SData.Client.SDataResourceCollectionRequest(Sage.Data.SDataServiceRegistry.getSDataService('metadata'))
                            .setResourceKind('relationships')
                            .setQueryArg('select', 'isDynamic,cardinality,parentEntity/*,childEntity/*,parentProperty/*,childProperty/*,columns/*')
                            .setQueryArg('where', whereString)
                            .setQueryArg('format', 'json')
                                .setQueryArg('Count', '500')).then(function (response) {
                                    var result = json.parse(response);
                                    var entityFields = result.$resources;
                                    for (var i = 0; i <= entityFields.length - 1; i++) {

                                        var relItem = entityFields[i];
                                        var childColName = relItem.childEntity.properties.$resources.filter(function (v) {
                                            return v.id === relItem.columns.$resources[0].childPropertyId;
                                        });
                                        if (childColName[0] && childColName[0].columnName) {
                                            childColName = childColName[0].columnName;
                                        }
                                        var parentColName = relItem.parentEntity.properties.$resources.filter(function (v) {
                                            return v.id === relItem.columns.$resources[0].parentPropertyId;
                                        });
                                        if (parentColName[0] && parentColName[0].columnName) {
                                            parentColName = parentColName[0].columnName;
                                        }
                                        if (entity == relItem['parentEntity']['$key'] && relItem['parentProperty']['isIncluded']) {
                                            items.add({
                                                name: relItem['parentProperty']['propertyName'],
                                                id: relItem['parentProperty']['id'],
                                                relatedEntity: relItem['childEntity']['$key'],
                                                "children": "test",
                                                property: property + relItem['parentProperty']['propertyName'],
                                                base: base,
                                                dataType: '',
                                                Level: currentLevel,
                                                parentTable: relItem.parentEntity.tableName,
                                                childTable: relItem.childEntity.tableName,
                                                parentKey: parentColName,
                                                childKey: childColName,
                                                oldrelationPath: oldrelationPath + dString.substitute(relationTemplate, [parentColName, "=", childColName, relItem.childEntity.tableName])
                                            });
                                        }
                                        else if (entity == relItem['childEntity']['$key'] && relItem['childProperty']['isIncluded']) {
                                            items.add({
                                                name: relItem['childProperty']['propertyName'],
                                                id: relItem['childProperty']['id'],
                                                "children": "test",
                                                property: property + relItem['childProperty']['propertyName'],
                                                base: base,
                                                relatedEntity: relItem['parentEntity']['$key'],
                                                dataType: '',
                                                Level: currentLevel,
                                                parentTable: relItem.parentEntity.tableName,
                                                childTable: relItem.childEntity.tableName,
                                                parentKey: parentColName,
                                                childKey: childColName,
                                                oldrelationPath: oldrelationPath + dString.substitute(relationTemplate, [childColName, "=", parentColName, relItem.parentEntity.tableName])
                                            });
                                        }
                                    }
                                });
                        listOfDeferred.push(promise2);
                        // Request 3
                        var promise3 = request(new Sage.SData.Client.SDataSingleResourceRequest(Sage.Data.SDataServiceRegistry.getSDataService('metadata'))
                            .setResourceKind('entities')
                            .setQueryArg('where',
                                dString.substitute(
                                    'extendedEntity.name eq "${0}"', [entity]
                                ))
                            .setQueryArg('select', 'extendedEntityPropertyName').setQueryArg('format', 'json').setQueryArg('Count', '500')).then(function (response) {
                                var result = json.parse(response);
                                var entityFields = result.$resources;
                                for (var i = 0; i <= entityFields.length - 1; i++) {
                                    var itemEF = entityFields[i];
                                    items.add({
                                        name: itemEF.$key,
                                        id: itemEF.$key,
                                        "children": "test",
                                        property: property + itemEF.$key,
                                        base: base,
                                        relatedEntity: itemEF.$key,
                                        dataType: '',
                                        Level: currentLevel
                                    });
                                }
                                this.currentLevel++;
                            });
                        listOfDeferred.push(promise3);
                    }
                }
                else {
                    var promise4 = request(new Sage.SData.Client.SDataSingleResourceRequest(Sage.Data.SDataServiceRegistry.getSDataService('metadata'))
                      .setResourceKind('entities')
                      .setQueryArg('select', 'extendedEntityPropertyName').setQueryArg('format', 'json').setQueryArg('Count', '500')).then(function (response) {
                          var result = json.parse(response);
                          var entityFields = result.$resources;
                          for (var i = 0; i <= entityFields.length - 1; i++) {
                              var itemEF = entityFields[i];
                              items.add({
                                  name: itemEF.$key,
                                  id: itemEF.$key,
                                  "children": "test",
                                  property: property + itemEF.$key,
                                  base: base,
                                  relatedEntity: itemEF.$key,
                                  dataType: '',
                                  Level: currentLevel
                              });
                          }
                      });
                    listOfDeferred.push(promise4);
                }

                var list = new DeferredList(listOfDeferred);
                list.then(function (result) {

                    var sortOn = 'name';
                    items.data.sort(function (a, b) {
                        var nameA = a[sortOn],
                            nameB = b[sortOn];

                        return (nameA < nameB)
                            ? -1
                            : (nameA > nameB)
                                ? 1
                                : 0;
                    });
                    onComplete(items.data);
                });
            },
            getRoot: function (onItem) {
                var data =
                       {
                           "name": "rootNode",
                           "id": "root",
                           "Level": 0
                       };
                onItem(data);
            },
            mayHaveChildren: function (item) {
                var bool = "children" in item;
                return bool && ((this.maxLevel >= 0 && item.Level < this.maxLevel) || this.maxLevel < 0);
            },
            getLabel: function (object) {
                return object.name;
            }
        })

    });
    return PropertyStoreModel;
});

