/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/CopyUserProfile/_CopyUserProfileBase", [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/topic',
    'dojo/_base/lang',
    'dojo/store/Memory',
    'dijit/_Widget',
    'Sage/_Templated',
    'dojo/i18n!./nls/_CopyUserProfileBase',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'dijit/form/FilteringSelect'
],
function (
    declare,
    dojoArray,
    topic,
    dojoLang,
    memory,
    widget,
    templated,
    nlsResources,
    dialogHelpIconMixin,
    filteringSelect
) {
    var copyUserProfileBase = declare('Sage.MainView.CopyUserProfile._CopyUserProfileBase', [widget, templated], {
        _dialog: null,
        baseNlsResources: nlsResources,
        _helpIconTopic: "CopyUserProfile",
        widgetsInTemplate: true,
        constructor: function () {
            dojo.mixin(this, nlsResources);
        },
        show: function () {
            this._dialog.show();
            if (this._helpIconTopic) {
                if (!this._dialog.helpIcon) {
                    dojoLang.mixin(this._dialog, new dialogHelpIconMixin());
                    this._dialog.createHelpIconByTopic(this._helpIconTopic);
                    this._dialog.helpIcon.tabIndex = "-1";
                }
            }
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            this.inherited(arguments);
        },
        _destroyObjects: function () {
                this.destroyRecursive();
        },
        _btnCancel_OnClick: function () {
            this._dialog.hide();
            this._destroyObjects();
        }
    });
    return copyUserProfileBase;
});