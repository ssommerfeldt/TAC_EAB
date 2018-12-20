/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/EmailControl", [
       'dijit/_Widget',
       'Sage/_Templated',
       'Sage/UI/Controls/TextBox',
       'dojox/validate/regexp',
       'dojo/_base/declare',
       'Sage/Utility'
],
function (_Widget, _Templated, TextBox, regexp, declare, Utility) {
    var widget = declare("Sage.UI.Controls.GridParts.Columns.EmailControl", [TextBox], {
        
        shouldPublishMarkDirty: true,
        name: '',
        autoPostBack: false,
        displayMode: '',
        _class: '',
        textboxToolTip: '',
        textboxStyle: '',
        readonly: '',
        disabled: '',
        hotKey: '',
        maxLength: 128,
        buttonVisible: true,
        buttonImageUrl: '',
        buttonToolTip: '',
        buttonStyle: '',
        required: false,
        tabIndex: 0,
        email: '',
        emailId: '',
        constructor: function (options) {
            options.id = options.emailId;
        },
        postCreate: function () {
            this.inherited(arguments);
        },
        widgetsInTemplate: true,
        _onChange: function (newValue) {
            if (this.shouldPublishMarkDirty) {
                dojo.publish("Sage/events/markDirty");
            }
            this.formatEmailChange();
        },
        // Simplistic email validation for *@*, where * is anything except '<' or ' '
        regExpGen: function () {
            var validationString = "[^< ]+@[^< ]+\\.+.[^< ]*?";
            return validationString;
        },
        formatEmailChange: function () {
            //TODO: Value formatting goes here, if applicable
            if (this.email !== this.focusNode.value) {
                this.email = this.focusNode.value;
            }
        },
        sendEmail: function () {
            var email = this.email;
            email = "mailto:" + email;
            document.location.href = email;
        }
    });

    return widget;
});
