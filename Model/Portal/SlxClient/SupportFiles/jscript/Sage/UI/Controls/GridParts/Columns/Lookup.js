/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/Lookup", [
    'Sage/Utility',
    'dojo/_base/declare',
    'dojo/_base/lang'
],
function (Utility, declare, lang) {
    var widget = declare("Sage.UI.Controls.GridParts.Columns.Lookup", null, {
        constructor: function (args) {
            lang.mixin(this, args);
        },
        format: function (value, data) {
            if (value) {
                if (typeof value === 'object') {
                    value = this._getFieldValue(value);
                }
                return value;
            }
            if (data !== null) {
                // The field could be several positions in length.
                //Extract the field value from the object by walking the sdata relationship path.
                value = this._getFieldValue(data);
            }
            return (value === null || typeof value === 'undefined') ? '' : value;
        },
        _getFieldValue: function (data) {
            var fieldPath = this.editorArgs.lookupOptions.field.split('.');
            var fieldValue = data;
            for (var i = 0; i < fieldPath.length; i++) {
                if (fieldValue) {
                    fieldValue = fieldValue[fieldPath[i]];
                }
            }
            return fieldValue;
        }
    });
    return widget;
});
