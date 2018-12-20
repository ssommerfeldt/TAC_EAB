/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityDetailUtility", [
    'dojo/_base/declare',
    'dojo/store/Memory',
    'dojo/string',
    'dojo/query',
    'dojo/_base/array',
    'dojo/_base/connect',
    'dojo/i18n!./nls/_BaseEntityDetailContent',

    // Details section, dependent on filter type selected
    'Sage/MainView/EntityMgr/AddEditEntityDetail/DistinctDetailsView',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/RangeDetailsView',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/AMDDetailsView',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/ADDMDDetailsView',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/UserLookupDetailsView',
    'dojo/dom-class',
    'Sage/Utility',
    'Sage/Utility/Filters',
    'Sage/UI/Controls/PropertyStore',
    'Sage/UI/Controls/TextBox',
    'Sage/Utility/GeneralSchemaReader',
    'dojo/request/xhr'
],
function (
    declare,
    Memory,
    dString,
    query,
    arrayUtil,
    connect,
    nlsResource,
    // Details section, dependent on filter type selected
    distinctDetailsView,
    rangeDetailsView,
    AMDDetailsView,
    AddMDDetailsView,
    UserLookupDetailsView,
    domClass,
    SageUtility,
    filterUtility,
    PropertyStore,
    TextBox,
    GeneralSchemaReader,
    dojoRequest
) {
    var widget = declare('Sage.MainView.EntityMgr.EntityDetailUtility', null, {
        //filter and metric types list
        filterTypeDataLoad: false,
        //aggregation List
        aggregation: false,
        //user lookup operation
        operation: false,
        // properties of entity associated with the filter
        propertyNameDataLoad: false,
        propertyIdDataLoad: false,
        // range filter's grid column information
        rangeFilterGridCol: false,
        specialCharacters: false,
        // holds the different data types.
        typeStore: null,
        propertyStore: null,
        propertyInformation: null,
        service: false,
        _nlsResource: false,
        specialDates: Object.getOwnPropertyNames(SageUtility.specialDates),
        picklistSchemaData: null,
        propertySchemaData: null,
        filterSchemaData: null,
        constructor: function () {
            this.service = Sage.Data.SDataServiceRegistry.getSDataService('metadata');
            this.propertyIdDataLoad = new Memory();
            this.propertyNameDataLoad = new Memory();
            this.filterTypeDataLoad = new Memory();
            this.aggregation = new Memory();
            this.operation = new Memory();
            this.rangeFilterGridCol = new Memory();
            this.specialCharacters = new Memory();
            this.propertyInformation = new Memory();
            this._nlsResource = nlsResource;
            this._populateFromSDataMetaDataHelper();
        },
        _populateFromSDataMetaDataHelper: function () {
            var data = new GeneralSchemaReader('system');
            data.getSchemaInformationFromSData();
            this.picklistSchemaData = data.picklistResourceNodes;

            data = new GeneralSchemaReader('metadata');
            data.getSchemaInformationFromSData();
            this.propertySchemaData = data.propertyResourceNodes;
            this.filterSchemaData = data.filterResourceNodes;
        },
        refreshPropertyStore: function (entity, queryOs, addins) {
            this.propertyStore = new PropertyStore(entity, queryOs, addins);
            this.typeStore = this.propertyStore.fStore.typeStore;
        },
        /*
        *   Grabs a list of properties for a given entity
        */
        getPropertiesAssociatedWithFilters: function (entity) {
            this._grabEntityProperties(this, entity, 0, 100);
        },
        /*
        -----------------------------------------------------------------------------------------------------------------------
           Start Helper methods for getPropertiesAssociatedWithFilters
        */
        _grabEntityProperties: function (content, entity, start, count) {
            count = count || 100;
            start = start || 0;

            var where = 'isIncluded ne False';
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.service);
            request.setResourceKind('entities(' + "'" + entity.name + "'" + ')/properties');
            request.setQueryArg('startIndex', start);
            request.setQueryArg('count', count);
            request.setQueryArg('where', where);

            request.read({
                success: function (data) {
                    var entityFields = data.$resources;
                    for (var i = 0; i <= entityFields.length - 1; i++) {
                        var pnid = entityFields[i].propertyName;
                        var idid = entityFields[i].id;
                        var noIndex = typeof (content.propertyNameDataLoad.index) === "undefined";

                        //prevent the duplicate error appearing in the console
                        if (noIndex || typeof (content.propertyNameDataLoad.index[pnid]) === "undefined") {
                            content.propertyNameDataLoad.add(
                            {
                                id: pnid,
                                name: entityFields[i].propertyName,
                                type: filterUtility.resolveDataType(entityFields[i].dataTypeId)
                            });
                        }
                        if (noIndex || typeof (content.propertyIdDataLoad.index[idid]) === "undefined") {
                            content.propertyIdDataLoad.add(
                            {
                                id: idid,
                                name: entityFields[i].propertyName,
                                type: filterUtility.resolveDataType(entityFields[i].dataTypeId)
                            });
                        }
                    }
                    var totalResults = data.$totalResults;
                    var newStart = start + count; // to get new start value take start + count
                    var valuesLeft = totalResults - newStart; // how many more records still need to get
                    if (valuesLeft > 0) // we need to get more records if greater than 0, if less than 0, there may be an issue.
                    {
                        if (valuesLeft >= 100) // Limit get to 100 records at a time
                        {
                            content.grabEntityProperties(content, false, newStart, 100);
                        } else // unless there is less, then just grab the rest.
                        {
                            content.grabEntityProperties(content, false, newStart, valuesLeft);
                        }
                    }
                },
                failure: function () {
                }
            });
        },
        /*
           End Helper methods for getPropertiesAssociatedWithFilters
       -----------------------------------------------------------------------------------------------------------------------
       */
        getSpecialValues: function () {
            var arr = Object.getOwnPropertyNames(this.specialDates);
            if (typeof (arr) === 'undefined' || (typeof (arr.length) !== 'undefined' && arr.length === 0)) {
                return this.specialDates;
            }
            for (var i = 0; i < arr.length; i++) {
                if (!this.specialCharacters.get(arr[i])) {
                    this.specialCharacters.add({ name: arr[i], id: arr[i], property: arr[i] });
                }
            }
        },
        /*
        *   Grabs schema information like aggregations, operations, and filter types.
        */
        getSchemasInformationFromSData: function (async) {
            if (async === undefined) {
                async = true;
            }
            var that = this;
            var hand = dojoRequest('slxdata.ashx/slx/metadata/-/$schema',
                {
                    handleAs: 'xml',
                    preventCache: true,
                    sync: !async
                }).then(function (data) {
                    var schemaData = SageUtility.parseXMLNode(data, {});
                    if (schemaData) {
                        that._gSIFSSuccess(schemaData);
                    }
                },
                function (err) {
                    that._onError('Download', err);
                    return err;
                }
            );
        },
        /*
        -----------------------------------------------------------------------------------------------------------------------
           Start Helper methods for getSchemasInformationFromSData
        */
        _gSIFSSuccess: function (data) {
            var context = this;
            var currName = "";
            var schemaNode = data["xs:schema"],
            simpleType = schemaNode["xs:simpleType"],
            complexType = schemaNode["xs:complexType"];

            arrayUtil.forEach(simpleType, function (curr) {
                currName = curr["name"];

                var restriction = curr["xs:restriction"];
                // list of aggregation
                if (currName === "OrmAnalyticsMetricAggregation--enum") {
                    context._populateAggregationList(restriction["xs:enumeration"]);
                }
                // list of operations
                if (currName === "ComparisonValidatorOperator--enum") {
                    context._populateOperationList(restriction["xs:enumeration"]);
                }
            });

            arrayUtil.forEach(complexType, function (curr) {
                currName = curr["name"];

                var all = curr["xs:all"];
                var choice = curr["xs:choice"];
                // list of filter types
                if (currName === "details--choice") {
                    context._populateFilterTypesList(choice["xs:element"]);
                }
                // list of range columns
                if (currName === "range--type") {
                    context._createRangefilterCols(all["xs:element"]);
                }
                // list of property columns
                if (currName === "property--type") {
                    context._populateProperties(all["xs:element"], data);
                }
            });
            connect.publish('Sage/EntityManager/FilterUtilityDone');
        },
        _populateProperties: function (xmlPList, xmlList) {
            var context = this;
            arrayUtil.forEach(xmlPList, function (curr) {
                var isManadtory = curr["sme:isMandatory"] || false;
                context.propertyInformation.add({ name: curr["name"], label: curr["sme:label"], type: curr["type"], manadtory: isManadtory, collection: null, sub: null, value: null });
            });
            var schemaNode = xmlList["xs:schema"],
                simpleType = schemaNode["xs:simpleType"],
                complexType = schemaNode["xs:complexType"];
            var list = this.propertyInformation.data;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var typeName = item.type;

                if (typeName.substring(0, 3) !== "xs:") {
                    if (typeName.substring(typeName.length - 6, typeName.length) === "--enum") {
                        arrayUtil.forEach(simpleType, function (curr2) {
                            var restriction = curr2["xs:restriction"];
                            // list of aggregation
                            if (curr2['name'] === typeName) {
                                context.propertyInformation.data[i].collection = new Memory({ data: restriction["xs:enumeration"] });
                            }
                        });
                    }
                    if (typeName.substring(typeName.length - 6, typeName.length) === "--type") {
                        var subList = new Memory();
                        arrayUtil.forEach(complexType, function (curr3) {
                            var all = curr3["xs:all"];
                            if (curr3['name'] === typeName) {
                                var temp = all["xs:element"];
                                if (typeof (temp) === "object") {
                                    if (temp instanceof Array) {
                                        arrayUtil.forEach(temp, function (curr4) {
                                            var isManadtory1 = curr4["sme:isMandatory"] || false;
                                            subList.add({ name: curr4["name"], label: curr4["sme:label"], type: curr4["type"], manadtory: isManadtory1, collection: null, sub: null });
                                        });
                                    } else {
                                        var isManadtory1 = temp["sme:isMandatory"] || false;
                                        subList.add({ name: temp["name"], label: temp["sme:label"], type: temp["type"], manadtory: isManadtory1, collection: null, sub: null });
                                    }
                                }
                            }
                        });
                        this.propertyInformation.data[i].sub = subList;
                    }
                }
            }
        },
        _populateFilterTypesList: function (xmlList) {
            for (var i = 0; i < xmlList.length; i++) {
                var item = xmlList[i];
                var nm = item["name"];
                this.filterTypeDataLoad.add(this._initialformatDetails(nm));
            }
        },
        _populateAggregationList: function (xmlList) {
            for (var i = 0; i < xmlList.length; i++) {
                var item = xmlList[i];
                this.aggregation.add({ id: item["value"], name: this._nlsResource[item["value"]] });
            }
        },
        _populateOperationList: function (xmlList) {
            for (var i = 0; i < xmlList.length; i++) {
                var item = xmlList[i];
                this.operation.add({ id: item["value"], name: this._nlsResource[item["value"]] });
            }

            this.operation.add({ id: "Contains", name: this._nlsResource["Contains"] });
            this.operation.add({ id: "StartsWith", name: this._nlsResource["StartsWith"] });
            this.operation.add({ id: "EndsWith", name: this._nlsResource["EndsWith"] });
        },
        _createRangefilterCols: function (xmlList) {
            var itemName = "";
            for (var i = 0; i < xmlList.length; i++) {
                var item = xmlList[i];
                var edit = false;
                itemName = item["name"];
                if (itemName === "rangeName") {
                    edit = {
                        label: this._nlsResource[itemName],
                        field: itemName,
                        editOn: "", // forces the control to stay in view.
                        autoSave: itemName !== "rangeId",
                        editable: itemName !== "rangeId",
                        hidden: (itemName === "rangeId" || itemName === "customSql"),
                        unhidable: itemName !== "displayName",
                        id: "AA" + itemName,
                        editor: TextBox,
                        editorArgs: {
                            shouldPublishMarkDirty: false,
                            required: true,
                            placeHolder: this._nlsResource.defaultRangeRowValue
                        },
                        width: 150
                    };
                }
                else {
                    edit = {
                        label: this._nlsResource[itemName],
                        field: itemName,
                        editOn: "", // forces the control to stay in view.
                        autoSave: itemName !== "rangeId",
                        editable: itemName !== "rangeId",
                        hidden: (itemName === "rangeId" || itemName === "customSql"),
                        unhidable: itemName !== "displayName",
                        id: itemName,
                        editor: TextBox,
                        editorArgs: {
                            shouldPublishMarkDirty: false
                        },
                        width: 150
                    };
                }
                this.rangeFilterGridCol.add(edit);
            }
        },
        /*
           End Helper methods for getSchemasInformationFromSData
       -----------------------------------------------------------------------------------------------------------------------
       */
        getStringFormatDetails: function (details) {
            return this.formatDetails(details, false, "").detailsLocalizedName;
        },
        /*
        *   Localized/Reader friendly name of the filter. 
        */
        _initialformatDetails: function (details) {
            var name = "";
            var type = "";
            switch (details) {
                case "distinctFilter":
                    {
                        name = this._nlsResource.FilterGridDetailsDistinctFilter;// "distinct";
                        type = "filter";
                        break;
                    }
                case "dateDiffMetricFilter":
                    {
                        name = this._nlsResource.FilterGridDetailsDateDiffMetricFilter; //"date difference metric";
                        type = "metric";
                        break;
                    }
                case "rangeFilter":
                    {
                        name = this._nlsResource.FilterGridDetailsRangeFilter; //"range";
                        type = "filter";
                        break;
                    }
                case "metricFilter":
                    {
                        name = this._nlsResource.FilterGridDetailsMetricFilter; //"metric";
                        type = "metric";
                        break;
                    }
                case "userLookupFilter":
                    {
                        name = this._nlsResource.FilterGridDetailsLookupFilter; //"user lookup";
                        type = "filter";
                        break;
                    }
                case "lookupFilter":
                    {
                        name = this._nlsResource.FilterGridDetailsLookupFilter; //"lookup";
                        type = "filter";
                        break;
                    }
                default: {
                    name = this._nlsResource.FilterGridDetailsCustom; //"custom";
                    type = "filter";
                    break;
                }
            }
            return { id: details, name: name, type: type };
        },
        /*
        *   Localized/Reader friendly name of the filter.
        *    BUT ALSO chooses a detail's view based on the filter type in other contexts.
        */
        formatDetails: function (details, includeObject, entityName) {
            if (typeof (details) !== 'undefined') {
                if (typeof (details.distinctFilter) !== 'undefined') {
                    return {
                        detailsKey: 'distinctFilter',
                        detailsObject: includeObject ? new distinctDetailsView({ detailUtility: this, details: details, entityName: entityName }) : false,
                        detailsLocalizedName: this._nlsResource.FilterGridDetailsDistinctFilter
                    };
                }
                if (typeof (details.dateDiffMetricFilter) !== 'undefined') {
                    return {
                        detailsKey: 'dateDiffMetricFilter',
                        detailsObject: includeObject ? new AddMDDetailsView({ detailUtility: this, details: details, entityName: entityName }) : false,
                        detailsLocalizedName: this._nlsResource.FilterGridDetailsDateDiffMetricFilter
                    };
                }
                if (typeof (details.rangeFilter) !== 'undefined') {
                    return {
                        detailsKey: 'rangeFilter',
                        detailsObject: includeObject ? new rangeDetailsView({ detailUtility: this, details: details, entityName: entityName }) : false,
                        detailsLocalizedName: this._nlsResource.FilterGridDetailsRangeFilter
                    };
                }
                if (typeof (details.metricFilter) !== 'undefined') {
                    return {
                        detailsKey: 'metricFilter',
                        detailsObject: includeObject ? new AMDDetailsView({ detailUtility: this, details: details, entityName: entityName }) : false,
                        detailsLocalizedName: this._nlsResource.FilterGridDetailsMetricFilter
                    };
                }
                if (typeof (details.userLookupFilter) !== 'undefined') {
                    return {
                        detailsKey: 'userLookupFilter',
                        detailsObject: includeObject ? new UserLookupDetailsView({ detailUtility: this, details: details, entityName: entityName }) : false,
                        detailsLocalizedName: this._nlsResource.FilterGridDetailsLookupFilter
                    };
                }
                if (typeof (details.lookupFilter) !== 'undefined') {
                    return {
                        detailsKey: 'lookupFilter',
                        detailsObject: includeObject ? new UserLookupDetailsView({ detailUtility: this, details: details, entityName: entityName }) : false,
                        detailsLocalizedName: this._nlsResource.FilterGridDetailsLookupFilter
                    };
                }
                return {
                    detailsKey: 'custom',
                    detailsObject: false,
                    detailsLocalizedName: this._nlsResource.FilterGridDetailsCustom
                };
            }
            return false;
        },
        /*
        * determines the details section of the add/edit filter (by default it will be distinct).
        */
        getDetailsSection: function (context, firstload) {
            var selectedId = context._title == this._nlsResource.FilterGridDetailsMetricFilter ? 'metricFilter' : 'distinctFilter';
            var editMode = false;
            if (context._EditData) {
                editMode = true;
            }

            if (firstload && editMode && context._EditData.details) {
                return this.formatDetails(context._EditData.details, true, context.entityName);
            }

            if (context.typeDropDowns && context.typeDropDowns.item && context.typeDropDowns.item.id) {
                selectedId = context.typeDropDowns.item.id;
            }

            var passingValue = false;
            if (editMode) {
                passingValue = context._EditData.details;
            }
            switch (selectedId) {
                case "dateDiffMetricFilter":
                    {
                        return {
                            detailsKey: 'dateDiffMetricFilter',
                            detailsObject: new AddMDDetailsView({ detailUtility: this, details: passingValue, entityName: context.entityName }),
                            detailsLocalizedName: this._nlsResource.FilterGridDetailsDateDiffMetricFilter
                        };
                    }
                case "metricFilter":
                    {
                        return {
                            detailsKey: 'metricFilter',
                            detailsObject: new AMDDetailsView({ detailUtility: this, details: passingValue, entityName: context.entityName }),
                            detailsLocalizedName: this._nlsResource.FilterGridDetailsMetricFilter
                        };
                    }
                case "distinctFilter":
                    {
                        return {
                            detailsKey: 'distinctFilter',
                            detailsObject: new distinctDetailsView({ detailUtility: this, details: passingValue, entityName: context.entityName }),
                            detailsLocalizedName: this._nlsResource.FilterGridDetailsDistinctFilter
                        };
                    }
                case "rangeFilter":
                    {
                        return {
                            detailsKey: 'rangeFilter',
                            detailsObject: new rangeDetailsView({ detailUtility: this, details: passingValue, entityName: context.entityName }),
                            detailsLocalizedName: this._nlsResource.FilterGridDetailsRangeFilter
                        };
                    }
                case "userLookupFilter":
                    {
                        return {
                            detailsKey: 'userLookupFilter',
                            detailsObject: new UserLookupDetailsView({ detailUtility: this, details: passingValue, entityName: context.entityName }),
                            detailsLocalizedName: this._nlsResource.FilterGridDetailsLookupFilter
                        };
                    }
                default:
                    {
                        return false;
                    }
            }
        },
        colonizeLabels: function (labelString) {
            return dString.substitute('${0}:', [labelString]);
        },
        grabReaderFriendlyVersionOfAggregationGivenId: function (id) {
            for (var i = 0; i < this.aggregation.data.length; i++) {
                if (this.aggregation.data[i].id == id) {
                    return this.aggregation.data[i].name;
                }
            }
            return "";
        },
        grabItemOfAggregationGivenId: function (id) {
            for (var i = 0; i < this.aggregation.data.length; i++) {
                if (this.aggregation.data[i].id == id) {
                    return this.aggregation.data[i];
                }
            }
            return "";
        },
        grabIdOfAggregationGivenName: function (name) {
            for (var i = 0; i < this.aggregation.data.length; i++) {
                if (this.aggregation.data[i].name == name) {
                    return this.aggregation.data[i].id;
                }
            }
            return "";
        }
    });
    return widget;
});