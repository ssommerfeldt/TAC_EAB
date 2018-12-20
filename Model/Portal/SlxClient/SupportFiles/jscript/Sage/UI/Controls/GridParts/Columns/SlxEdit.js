/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/SlxEdit", [
    'dojo/i18n!./nls/SlxEdit',
    'dojo/_base/declare',
    'dojo/_base/lang'
],
function (resource, declare, lang) {
    var widget = declare("Sage.UI.Controls.GridParts.Columns.SlxEdit", null, {
        // Field: string
        //      The name of the field to be used as the entityid in the querystring
        field: '',
        // entityType: string
        //      The name of the entity.
        entityType: '',
        // cellValue: string
        //      The display value of the cell
        smartPart: '',
        // appliedSecurity: string
        //      The 'key' of the secured action the user must have in order to follow the link.
        //      If the user does not have access to the action specified, this field will contain only text.
        appliedSecurity: '',
        // dialogTitle: string
        //      Overrides the default title description if specified.
        dialogTitle: '',
        //
        //
        isCentered: true,
        dialogTop: 0,
        dialogLeft: 0,
        dialogHeight: 0,
        dialogWidth: 0,
        formObjectName: '',
        constructor: function (args) {
            lang.mixin(this, args);
            lang.mixin(this, resource);

            if (!this.hidden) {
                // From templates, this.appliedSecurity is set, but the code
                // originally checked arguments.appliedSecurity. Just a precaution
                if (!this.appliedSecurity && arguments.appliedSecurity) {
                    this.appliedSecurity = arguments.appliedSecurity;
                }
                if (this.appliedSecurity) {
                    var svc = Sage.Services.getService("RoleSecurityService");
                    if (svc) {
                        this.hidden = !svc.hasAccess(this.appliedSecurity);
                    }
                }
            }
            this.inherited(arguments);
        },
        format: function (value, data) {
            // summary:
            //      returns: html for a given grid cell
            if (data === null) { return this.editText; }
            var cellDisplayText = this.editCellValue;

            //need to have some default value
            if (cellDisplayText === "") {
                cellDisplayText = this.editText;
            }
            var entityId = Sage.Utility.getValue(data, '$key');
            //if this is entity has a composite key we need to parse it so that the dialog service recognizes it
            if (entityId.match(/[=]/)) {
                entityId = entityId.match(/[=]\S{12}/g).join(',').replace(/=/g, "");
            }
            return String.format('<a href="{0}">{1}</a>', String.format("javascript:Sage.Utility.loadDetailsDialog( {{ entityType:'{0}', smartPart:'{1}', entityId:'{2}', dialogTitle:'{3}', isCentered:{4}, dialogTop:{5}, dialogLeft:{6}, dialogHeight:{7}, dialogWidth:{8} }} );",
                this.entityType, this.smartPart, entityId, this.dialogTitle, this.isCentered, this.dialogTop, this.dialogLeft, this.dialogHeight, this.dialogWidth),
                cellDisplayText);
        }
    });
    return widget;
});
