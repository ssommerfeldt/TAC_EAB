/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Utility/PropertySchemaReader", [
    'dojo/_base/declare',
    'dojo/store/Memory',
    'dojo/string',
    'dojo/_base/array',
    'Sage/Utility/_SchemaReaderHelper'
],
function (
    declare,
    Memory,
    dString,
    arrayUtil,
    _schemaReaderHelper
) {
    var widget = declare('Sage.Utility.PropertySchemaReader', [_schemaReaderHelper], {

        propertyResourceNodes: null,
        property_object: null,
        constructor: function () {
            this.resetPropertySchemaInformation();
        },
        resetPropertySchemaInformation: function () {
            this.propertyResourceNodes=new Memory();
        },
        _getPropertySchemaInformation: function (endPointData) {
            var headName = 'property';
            this._findAndAdd(endPointData, headName);
            this.propertyResourceNodes = this._gatherNodesFromQueue(headName);
            if (this.propertyResourceNodes.data.length > 0) {
                this.property_object = this._buildObjectFromNodeList(this.propertyResourceNodes.data[0]);
            }
        }
    });
    return widget;
});