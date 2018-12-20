/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Columns/CheckBox", [
    'dojo/_base/declare'
],
function (declare) {
    var widget = declare("Sage.UI.Columns.CheckBox", dojox.grid.cells.Bool, {
        //Formatter used for the editiable = false state.
        formatter: function (value, rowIdx, cel) {
            var checkbox = (value === true || value === 1) ? '<input type="checkbox" checked="checked" disabled="disabled" />'
                : '<input type="checkbox" disabled="disabled" />';
            return checkbox;
        }
    });

    return widget;
});
