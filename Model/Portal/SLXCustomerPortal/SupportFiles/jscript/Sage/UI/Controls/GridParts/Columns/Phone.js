/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/Phone", [
    'Sage/Format',
    'Sage/UI/Controls/Phone',
    'dojo/_base/declare',
    'dojo/_base/lang'
],
function (Format, Phone, declare, lang) {
    var widget = declare('Sage.UI.Controls.GridParts.Columns.Phone', null, {
        defaultValue: '',
        widgetClass: Phone,
        constructor: function (args) {
            lang.mixin(this, args);
        },
        format: function (val, data) {
            return '<a href="tel:' + val + '">' + Format.phone(val, data) + '</a>';
        }
    });

    return widget;
});