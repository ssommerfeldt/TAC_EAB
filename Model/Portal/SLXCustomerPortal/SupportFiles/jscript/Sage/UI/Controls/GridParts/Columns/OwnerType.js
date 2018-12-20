/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/OwnerType", [
    'dojo/i18n',
    'dojo/i18n!../../../nls/OwnerType',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sage/Utility'
],
function (i18n, nlsResource, declare, lang, sUtility) {
    var widget = declare('Sage.UI.Controls.GridParts.Columns.OwnerType', null, {
        constructor: function (args) {
            var resource = i18n.getLocalization('Sage.UI', 'OwnerType');
            lang.mixin(this, resource);
            lang.mixin(this, args);
            this.inherited(arguments);
        },
        format: function (val) {
            var ownerTypes = {
                'G': this.teamText,
                'D': this.departmentText,
                'S': this.systemText,
                'U': this.userText
            };
            return ownerTypes[val] ? sUtility.htmlEncode(ownerTypes[val]) : val;
        }
    });

    return widget;
});