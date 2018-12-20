/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/Email", [
    'dojo/_base/declare',
    'dojo/_base/lang'
],
function (declare, lang) {
    var widget = declare('Sage.UI.Controls.GridParts.Columns.Email', null, {
        icon: '',
        defaultValue: '',
        constructor: function (args) {
            lang.mixin(this, args);
        },
        format: function (val, index) {
            if (!val) return '';
            var dispstr = val;
            if (this.icon && this.icon !== '') {
                dispstr = (this.icon === true || this.icon === 'true')
                    ? '<img src="images/icons/Send_Write_email_16x16.png" />'
                    : '<img src="' + this.icon + '" />';
            }
            return dojo.string.substitute('<a href="mailto:${0}">${1}</a>', [Sage.Utility.htmlEncode(val), dispstr]);
        }
    });

    return widget;
});
