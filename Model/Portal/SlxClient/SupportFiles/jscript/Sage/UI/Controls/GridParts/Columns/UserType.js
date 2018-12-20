/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/UserType", [
    'Sage/Utility',
    'dojo/i18n!../../../nls/UserType',
    'dojo/_base/declare',
    'dojo/_base/lang'
],
function (Utility, resource, declare, lang) {
    var widget = declare('Sage.UI.Controls.GridParts.Columns.UserType', null, {
        constructor: function (args) {
            lang.mixin(this, resource);
            lang.mixin(this, args);
            this.inherited(arguments);
        },
        format: function (val) {
            if (typeof (val) === "string") {
                val = val.trim();
            }
            var userTypes = {
                'W': this.administratorText,
                'P': this.templateText,
                'M': this.remoteText,
                'T': this.webOnlyText,
                'R': this.retiredText,
                'C': this.concurrentText,
                'V': this.webViewerText,
                'N': this.networkText,
                'A': this.addOnUserText
            };
            return (userTypes[val] ? Utility.htmlEncode(userTypes[val]) : val);
        }
    });
    return widget;
});
