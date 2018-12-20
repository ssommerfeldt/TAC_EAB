/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/CheckBox", [
    'dojo/_base/declare',
    'dijit/form/CheckBox'
],
function (declare, CheckBox) {
    var widget = declare("Sage.UI.Controls.GridParts.Columns.CheckBox", CheckBox, {
        _getValueAttr: function () {
            // summary:
            //		Hook so get('value') works.
            // description:
            //		If the CheckBox is checked, returns the value attribute.
            //		Otherwise returns false.
            return this.checked;
        }
    });

    return widget;
});
