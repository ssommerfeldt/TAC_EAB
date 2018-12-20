require({cache:{
'url:Sage/MainView/Options/templates/OptionsDialog.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"{%= $._nlsResources.txtOptions %}\" dojoattachpoint=\"_dialog\" dojoattachevent=\"onCancel:_dialog_OnCancel\" style=\"width: 450px\">\r\n        <div data-dojo-type=\"dijit.form.Form\" dojoAttachPoint=\"frmOptions\" id=\"frmOptions\" >\r\n            <div style=\"overflow:auto\">\r\n                <div>\r\n                    <table cellspacing=\"10\">\r\n\r\n                        <tr>\r\n                            <td>\r\n                                <label>{%= $._nlsResources.txtColumns %}:</label>\r\n                            </td>\r\n                            <td>                                \r\n                                <div style=\"display:inline-block;\"><input type=\"text\" dojoType=\"Sage.UI.Controls.Numeric\" dojoAttachPoint=\"txtFieldCount\" id=\"txtFieldCount\" style=\"width:25px\" /></div>\r\n                                <label>{%= $._nlsResources.txtZero %}</label>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td colspan=\"2\">\r\n                                <div dojoType=\"dijit.form.CheckBox\" label=\"{%= $._nlsResources.txtHideOnSelection %}\" id=\"chkHideOnSelection\" name=\"chkHideOnSelection\" dojoAttachPoint=\"chkHideOnSelection\" ></div>\r\n                                <label class=\"checkbox-label\" for=\"chkHideOnSelection\">{%= $._nlsResources.txtHideOnSelection %}</label>\r\n                            </td>\r\n                        </tr>                        \r\n                        <tr>\r\n                            <td colspan=\"2\">\r\n                                <div dojoType=\"dijit.form.CheckBox\" label=\"{%= $._nlsResources.txtStayInDetailViewOnLookup %}\" id=\"chkStayInDetailView\" name=\"chkStayInDetailView\" dojoAttachPoint=\"chkStayInDetailView\" ></div>\r\n                                <label class=\"checkbox-label\" for=\"chkStayInDetailView\">{%= $._nlsResources.txtStayInDetailViewOnLookup %}</label>\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td colspan=\"2\">\r\n                                <div dojoType=\"dijit.form.CheckBox\" label=\"{%= $._nlsResources.txtDisplayExtendedGroupListOnLookup %}\" id=\"chkShowOnLookup\" name=\"chkShowOnLookup\" dojoAttachPoint=\"chkShowOnLookup\" ></div>\r\n                                <label class=\"checkbox-label\" for=\"chkShowOnLookup\">{%= $._nlsResources.txtDisplayExtendedGroupListOnLookup %}</label>\r\n                            </td>\r\n                        </tr>\r\n                        \r\n                    </table>\r\n                </div>\r\n            </div>\r\n            <div align=\"right\" style=\"margin-top:10px\">                \r\n                <div data-dojo-type=\"dijit.form.Button\"dojoAttachPoint=\"cmdOk\" dojoAttachEvent=\"onClick:_cmdOk_OnClick\">{%= Sage.Utility.htmlEncode($._nlsResources.cmdOk_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" dojoAttachPoint=\"cmdCancel\" dojoAttachEvent=\"onClick:_cmdCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($._nlsResources.cmdCancel_Caption) %}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
/**
 * Module returning the mainview options dialog.
 * @module Sage/MainView/Options/OptionsDialog
 */
define("Sage/MainView/Options/OptionsDialog", [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/topic',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'dojo/text!./templates/OptionsDialog.html',
    'dojo/i18n!./nls/OptionsDialog',
    'Sage/Utility',
    'dijit/_Widget',
    'Sage/_Templated',
    'dijit/Dialog',
    'dijit/form/Form',
    'dijit/form/Select'
],
function (
    declare,
    dojoArray,
    lang,
    topic,
    _DialogHelpIconMixin,
    template,
    nlsResources,
    utility,
    _Widget,
    _Templated
) {
    var __widgetTemplate = utility.makeTemplateFromString(template);
    var optionsDialog = declare('Sage.MainView.Options.OptionsDialog', [_Widget, _Templated],
        /** @lends Sage.MainView.Options.OptionsDialog.prototype */
        {
            id: 'dlgOptions',
            _nlsResources: nlsResources,
            _dialog: null,
            widgetsInTemplate: true,
            _helpIconTopic: 'GroupListOptions',
            widgetTemplate: __widgetTemplate,
            /**
            * OptionsDialog class constructor.
            * @constructs
            * @return {undefined}
            * @public
            */
            constructor: function () {

            },
            /**
            * OptionsDialog class destructor. Destroys custom widgets and recursively destroys the dialog object.
            * @function
            * @return {undefined}
            * @public
            */
            destroy: function () {

                this.inherited(arguments);
            },
            /**
            * Shows the options dialog.
            * @function
            * @return {undefined}
            * @public
            */
            show: function () {
                this._dialog.show();
                if (this._helpIconTopic) {
                    if (!this._dialog.helpIcon) {
                        lang.mixin(this._dialog, new _DialogHelpIconMixin());
                        this._dialog.createHelpIconByTopic(this._helpIconTopic);
                    }
                }
            },
            /**
            * Initializes UI widgets. Sets widgets visibility.
            * @function
            * @return {undefined}
            * @public
            */
            startup: function () {

                var svc = Sage.Services.getService("UserOptions");
                if (svc) {
                    svc.get('FieldCount', 'ExtendedGroupList', lang.hitch(this, function (option) {
                        if (option && option.value) {
                            this.txtFieldCount.set('value', option.value); //This works in SLX 8.0
                            this.txtFieldCount.focusNode.textbox.value = option.value; //This works in SLX 8.1
                        }
                        else {
                            this.txtFieldCount.set('value', 0); //This works in SLX 8.0
                            this.txtFieldCount.focusNode.textbox.value = 0; //This works in SLX 8.1
                        }
                    }));

                    svc.get('HideOnSelection', 'ExtendedGroupList', lang.hitch(this, function (option) {
                        if (option && option.value) {
                            if (option.value === 'T') {
                                this.chkHideOnSelection.set('checked', true);
                            }
                            else {
                                this.chkHideOnSelection.set('checked', false);
                            }
                        }
                        else {
                            this.chkHideOnSelection.set('checked', false);
                        }
                    }));

                    svc.get('ShowOnLookup', 'ExtendedGroupList', lang.hitch(this, function (option) {
                        if (option && option.value) {
                            if (option.value === 'T') {
                                this.chkShowOnLookup.set('checked', true);
                            }
                            else {
                                this.chkShowOnLookup.set('checked', false);
                            }
                        }
                        else {
                            this.chkShowOnLookup.set('checked', false);
                        }
                    }));

                    svc.get('StayInDetailView', 'GroupLookup', lang.hitch(this, function (option) {
                        if (option && option.value) {
                            if (option.value === 'T') {
                                this.chkStayInDetailView.set('checked', true);
                            }
                            else {
                                this.chkStayInDetailView.set('checked', false);
                            }
                        }
                        else {
                            this.chkStayInDetailView.set('checked', false);
                        }
                    }));

                }

            },

            _cmdOk_OnClick: function () {
                this._saveUserOptions();
                this._dialog.hide();
            },

            _cmdCancel_OnClick: function () {
                this._dialog.hide();
            },

            _dialog_OnCancel: function () {
                this._dialog.hide();
            },

            _saveUserOptions: function () {
                var svc = Sage.Services.getService("UserOptions");
                if (svc) {

                    var options = {
                        extendedGroupList: {},
                        groupLookup: {}
                    };

                    //Columns
                    if (this.frmOptions.attr('value').rbLayout === 'all') {
                        options.extendedGroupList.fieldCount = 0;
                    }
                    else {
                        options.extendedGroupList.fieldCount = parseInt(this.txtFieldCount.focusNode.textbox.value, 10);
                    }
                    svc.set('FieldCount', 'ExtendedGroupList', options.extendedGroupList.fieldCount);

                    //Hide extended group list on record selection
                    var value = (this.chkHideOnSelection.checked) ? 'T' : 'F';
                    svc.set('HideOnSelection', 'ExtendedGroupList', value);
                    options.extendedGroupList.hideOnSelection = this.chkHideOnSelection.checked;

                    //Display extended group list on lookup
                    value = (this.chkShowOnLookup.checked) ? 'T' : 'F';
                    svc.set('ShowOnLookup', 'ExtendedGroupList', value);
                    options.extendedGroupList.showOnLookup = this.chkShowOnLookup.checked;

                    //Stay in detail view
                    value = (this.chkStayInDetailView.checked) ? 'T' : 'F';
                    svc.set('StayInDetailView', 'GroupLookup', value);
                    options.groupLookup.stayInDetailView = this.chkStayInDetailView.checked;

                    //Notify subscribers of options change
                    topic.publish('userOptions/changed', options);

                }
            }

        });
    return optionsDialog;
});