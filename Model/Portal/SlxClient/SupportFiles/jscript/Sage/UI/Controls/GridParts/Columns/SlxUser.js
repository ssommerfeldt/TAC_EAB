/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/SlxUser", [
        'dijit/_Widget',
        'dijit/form/FilteringSelect',
        'dojo/_base/declare',
        'Sage/Utility',
        'dojo/_base/lang'
], function (_Widget, FilteringSelect, declare, slxUtility, lang) {
    var widget = declare("Sage.UI.Controls.GridParts.Columns.SlxUser", null, {
        // summary: 
        field: '',
        constructor: function (args) {
            lang.mixin(this, args);
        },
        //  User name display based on user id.
        //  Read-only at the moment.
        format: function (value, data) {
            if (data) {
                var userId = data[this.field];
                // XXX this is using a synchronous retrieve
                // we should be able to return a deferred object from this function (see http://dojotoolkit.org/reference-guide/dojox/grid/DataGrid.html)

                //nraddatz 2013-09-26: Defect 13093163
                //Added null validation below.
                var name = userId ? slxUtility.getUserName(userId) : "";
                return slxUtility.htmlEncode(name);
            }
        }
    });
    return widget;
});
