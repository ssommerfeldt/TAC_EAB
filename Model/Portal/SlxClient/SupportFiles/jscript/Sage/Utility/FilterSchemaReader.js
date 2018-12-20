/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Utility/FilterSchemaReader", [
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
    var widget = declare('Sage.Utility.FilterSchemaReader', [_schemaReaderHelper], {

        filterResourceNodes: null,
        filter_object: null,
        constructor: function () {
            this.resetFilterSchemaInformation();
        },
        resetFilterSchemaInformation: function () {
            this.filterResourceNodes = new Memory();
        },
        _getFilterSchemaInformation: function (endPointData) {
            var headName = 'filter';
            this._findAndAdd(endPointData, headName);
            this.filterResourceNodes = this._gatherNodesFromQueue(headName);
            if (this.filterResourceNodes.data.length > 0) {
                this.filter_object = this._buildObjectFromNodeList(this.filterResourceNodes.data[0]);
            }
        }
    });
    return widget;
});