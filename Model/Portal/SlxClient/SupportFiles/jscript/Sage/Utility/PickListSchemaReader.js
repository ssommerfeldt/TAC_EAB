/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Utility/PickListSchemaReader", [
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
    var widget = declare('Sage.Utility.PickListSchemaReader', [_schemaReaderHelper], {

        picklistResourceNodes: null,
        picklist_object: null,
        constructor: function () {
            this.picklist_object = {};
            this.resetPickListSchemaInformation();
        },
        resetPickListSchemaInformation: function () {
            this.picklistResourceNodes = new Memory();
        },
        _getPickListSchemaInformation: function (endPointData) {
            var headName = 'pickList';
            this._findAndAdd(endPointData, headName);
            this.picklistResourceNodes = this._gatherNodesFromQueue(headName);
             if (this.picklistResourceNodes.data.length > 0) {
                 this.picklist_object = this._buildObjectFromNodeList(this.picklistResourceNodes.data[0]);
            }
        },
        cleanupPicklistObject: function () {
            var retObj = this.picklist_object.pickList;
            retObj.items = retObj.items.pickListItem;
            return retObj;
        }
    });
    return widget;
});