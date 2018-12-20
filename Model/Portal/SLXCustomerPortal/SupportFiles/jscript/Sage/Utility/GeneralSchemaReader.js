/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Utility/GeneralSchemaReader", [
    'dojo/_base/declare',
    'dojo/store/Memory',
    'dojo/string',
    'dojo/_base/array',
    'Sage/Utility',
    'Sage/Utility/PropertySchemaReader',
    'Sage/Utility/FilterSchemaReader',
    'Sage/Utility/PickListSchemaReader',
    'dojo/request/xhr'
],
function (
    declare,
    Memory,
    dString,
    arrayUtil,
    SageUtility,
    _propertySchemaReader,
    _filterSchemaReader,
    _picklistSchemaReader,
    dojoRequest
) {
    var widget = declare('Sage.Utility.GeneralSchemaReader', [_propertySchemaReader, _filterSchemaReader, _picklistSchemaReader], {
        service: null,
        endpointBase: 'metadata',

        constructor: function (base) {
            this.changeService(base);
        },

        // Changes the base the service points to (system, metadata)
        changeService: function (base) {
            this.endpointBase = base;
            this.service = Sage.Data.SDataServiceRegistry.getSDataService(this.endpointBase);
        },
        // get the schema information
        getSchemaInformationFromSData: function () {
            var that = this;
            var hand = dojoRequest(dString.substitute('slxdata.ashx/slx/${0}/-/$schema', [this.endpointBase]),
                {
                    handleAs: 'xml',
                    preventCache: true,
                    sync: true
                }).then(function (data) {
                    var schemaData = SageUtility.parseXMLNode(data, {});
                    if (schemaData) {
                        that.sDataSuccessful(schemaData);
                    }
                },
                function (err) {
                    that._onError('Download', err);
                    return err;
                }
            );
        },
        sDataSuccessful: function (data) {
            var schemaData = data["xs:schema"];

            switch (this.endpointBase.toLocaleLowerCase()) {
                case "system": {
                    this._getPickListSchemaInformation(schemaData);
                    break;
                }
                default: {
                    this._getPropertySchemaInformation(schemaData);
                    this._getFilterSchemaInformation(schemaData);
                    break;
                }

            }
        }
    });
    return widget;
});