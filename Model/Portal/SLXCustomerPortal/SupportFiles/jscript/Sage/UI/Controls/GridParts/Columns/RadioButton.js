/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/RadioButton", [
    'dojo/_base/declare',
    'dijit/form/RadioButton'
],
function (declare, RadioButton) {
    var widget = declare("Sage.UI.Controls.GridParts.Columns.RadioButton", RadioButton, {
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
