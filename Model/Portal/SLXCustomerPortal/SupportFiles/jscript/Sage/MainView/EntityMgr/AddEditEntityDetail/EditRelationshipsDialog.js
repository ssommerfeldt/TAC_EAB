require({cache:{
'url:Sage/MainView/EntityMgr/AddEditEntityDetail/templates/EditRelationshipsDialog.html':"<div>\r\n    <div dojotype=\"dijit.Dialog\" title=\"\" dojoattachpoint=\"_dialog\" dojoattachevent=\"onHide:_onDlgHide\" style=\"width:60%;\">\r\n        <div data-dojo-type=\"dijit.form.Form\" data-dojo-attach-point=\"EditRelationshipsForm\">\r\n            <div class=\"recur-activity-dialog\">\r\n\r\n                <table class=\"detailTableContainer formtable HundredPercentWidth\">\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"\">\r\n                                <input type=\"checkbox\" data-dojo-attach-point=\"IncludeChild\"\r\n                                       data-dojo-type=\"dijit/form/CheckBox\" />\r\n                                <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblIncludeChild\">\r\n                                    Include child relationship property in the parent entity <label data-dojo-attach-point=\"lblParent\"></label>\r\n                                </label>\r\n\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                                <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblName\">\r\n                                    Property Name\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                                <input disabled data-dojo-type=\"dijit.form.ValidationTextBox\" data-dojo-props=\"required: true\" data-dojo-attach-point=\"childName\" />\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                                <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblDisplayName\">\r\n                                    Display Name\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                                <input data-dojo-type=\"dijit.form.ValidationTextBox\" data-dojo-props=\"required: true\" data-dojo-attach-point=\"childDisplayName\" />\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                                <label style=\"\" data-dojo-attach-point=\"lblImport\">\r\n                                    Import\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                                <input type=\"checkbox\" data-dojo-attach-point=\"childCanImport\"\r\n                                       data-dojo-type=\"dijit/form/CheckBox\" />\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                                <label style=\"\" data-dojo-attach-point=\"lblMatch\">\r\n                                    Match\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                                <input type=\"checkbox\" data-dojo-attach-point=\"childCanMatch\"\r\n                                       data-dojo-type=\"dijit/form/CheckBox\" />\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                                <label data-dojo-attach-point=\"lblAudit\">\r\n                                    Audited\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                                <input type=\"checkbox\" data-dojo-attach-point=\"childAudited\"\r\n                                       data-dojo-type=\"dijit/form/CheckBox\" />\r\n                            </div>\r\n                            <hr />\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                                <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblRelationship\">\r\n                                    Relationship\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                                <div data-dojo-attach-point=\"dpCardinality\"></div>\r\n                            </div>\r\n                            <hr />\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n\r\n                <table class=\"detailTableContainer formtable HundredPercentWidth\">\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"\">\r\n                                <input type=\"checkbox\" data-dojo-attach-point=\"IncludeParent\"\r\n                                       data-dojo-type=\"dijit/form/CheckBox\" />\r\n                                <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblIncludeParent\">\r\n                                    Include parent relationship property in the child entity <label data-dojo-attach-point=\"lblChild\"></label>\r\n                                </label>\r\n\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                                <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblParentName\">\r\n                                    Property Name\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                                <input disabled data-dojo-type=\"dijit.form.ValidationTextBox\" data-dojo-props=\"required: true\" data-dojo-attach-point=\"parentName\" />\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                                <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblParentDisplayName\">\r\n                                    Display Name\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                                <input data-dojo-type=\"dijit.form.ValidationTextBox\" data-dojo-props=\"required: true\" data-dojo-attach-point=\"parentDisplayName\" />\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                                <label style=\"\" data-dojo-attach-point=\"lblParentImport\">\r\n                                    Import\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                                <input type=\"checkbox\" data-dojo-attach-point=\"parentCanImport\"\r\n                                       data-dojo-type=\"dijit/form/CheckBox\" />\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                                <label style=\"\" data-dojo-attach-point=\"lblParentMatch\">\r\n                                    Match\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                                <input type=\"checkbox\" data-dojo-attach-point=\"parentCanMatch\"\r\n                                       data-dojo-type=\"dijit/form/CheckBox\" />\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"FManagerDialogFieldLabel\">\r\n                            <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                                <label data-dojo-attach-point=\"lblParentAudit\">\r\n                                    Audited\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                                <input type=\"checkbox\" data-dojo-attach-point=\"parentAudited\"\r\n                                       data-dojo-type=\"dijit/form/CheckBox\" />\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n\r\n                <div class=\"button-bar alignright\">\r\n                    <div data-dojo-type=\"dijit.form.Button\" id=\"{%= $.id%}_btn_OK\" name=\"btn_OK\" dojoattachpoint=\"btn_OK\" dojoattachevent=\"onClick:_okClick\">OK</div>\r\n                    <div data-dojo-type=\"dijit.form.Button\" id=\"{%= $.id%}_btn_Cancel\" name=\"btn_Cancel\" dojoattachpoint=\"btn_Cancel\" dojoattachevent=\"onClick:_cancelClick\">Cancel</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/AddEditEntityDetail/EditRelationshipsDialog", [
    'dijit/_Widget',
    'Sage/_Templated',
    'Sage/Utility',
    'dojo/string',
    'dojo/_base/declare',
    'dojo/text!./templates/EditRelationshipsDialog.html',
    'dojo/i18n!./nls/AddEditDialog',
    'dojo/dom-style',
    'Sage/UI/Dialogs',
    'Sage/UI/FilteringSelect',
    'dojo/store/Memory',
	'Sage/Data/SDataServiceRegistry',
    'dijit/registry',
    'dojo/_base/lang',
    'dojo/request',
    'dojo/query',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'Sage/UI/_DialogLoadingMixin',
    'dojo/dom',
    "dijit/form/RadioButton",
    "dojo/_base/window",
    'dojo/dom-construct'
],
function (
    _Widget,
    _Templated,
    utility,
    dString,
    declare,
    template,
    nlsResources,
    dojoStyle,
    crmDialogue,
    crmDropDowns,
    memory,
	SDataServiceRegistry,
    registry,
    lang,
    request,
    query,
    _DialogHelpIconMixin,
    _DialogLoadingMixin,
    dom,
    RadioButton,
    win,
    domConstruct
) {
    var widgetTemplate = utility.makeTemplateFromString(template);

    var widget = declare('Sage.MainView.EntityMgr.AddEditEntityFilter.EditRelationshipsDialog', [_Widget, _Templated], {
        _dialog: null,

        widgetTemplate: widgetTemplate,
        _nlsResources: nlsResources,
        widgetsInTemplate: true,
        detailUtility: false,

        typeDropDowns: false,
        dpVisibility: false,
        dpCascadeType: false,
        parentTable: false,
        childTable: false,
        dptypeParentTableField: false,
        dptypeChildTableField: false,
        typeDataLoad: false,

        entities: false,
        properties: false,
        _title: false,
        entityName: false,
        _EditData: false,

        constructor: function (entity, title, dUtility, data) {
            this._title = title;
            this._EditData = data;
            this.entityName = entity;
        },
        destroy: function (context) {
            context.destroy();
            dijit.popup.close();
        },
        postCreate: function () {
            this.lblIncludeChild.innerHTML = this._nlsResources.includeChild;
            this.lblName.innerHTML = this._nlsResources.propertyName;
            this.lblDisplayName.innerHTML = this._nlsResources.displayName;
            this.lblImport.innerHTML = this._nlsResources.canImport;
            this.lblMatch.innerHTML = this._nlsResources.canMatch;
            this.lblAudit.innerHTML = this._nlsResources.audited;
            this.lblRelationship.innerHTML = this._nlsResources.cardinality;
            this.lblIncludeParent.innerHTML = this._nlsResources.includeParent;
            this.lblParentName.innerHTML = this._nlsResources.propertyName;
            this.lblParentDisplayName.innerHTML = this._nlsResources.displayName;
            this.lblParentImport.innerHTML = this._nlsResources.canImport;
            this.lblParentMatch.innerHTML = this._nlsResources.canMatch;
            this.lblParentAudit.innerHTML = this._nlsResources.audited;

            // help icon
            lang.mixin(this._dialog, new _DialogHelpIconMixin());
            this._dialog.createHelpIconByTopic('Editing_Relationships');

            dojo.mixin(this._dialog, new _DialogLoadingMixin());

            this.lblParent.innerHTML = '(' + this._EditData.parentEntity.$key + ')';
            this.lblChild.innerHTML = '(' + this._EditData.childEntity.$key + ')';

            this.IncludeChild.set("value", this._EditData.parentProperty.isIncluded);
            this.IncludeParent.set("value", this._EditData.childProperty.isIncluded);

            this._createCardinalityFieldController(); 

            if (this._EditData.parentProperty.isIncluded) {
                this.childName.textbox.value = this._EditData.parentProperty.propertyName;
                this.childDisplayName.textbox.value = this._EditData.parentProperty.displayName;

                this.childCanMatch.set("value", this._EditData.parentProperty['import'].canMatch);
                this.childCanImport.set("value", this._EditData.parentProperty['import'].canImport);
                this.childAudited.set("value", this._EditData.parentProperty.audited);
            } else {
                this.childName.textbox.value = this._EditData.childEntity.$key;
                this.childDisplayName.textbox.value = this._EditData.childEntity.$key;

                this.disableEnableChildControls(this, true);
            }
            if (this._EditData.childProperty.isIncluded) {
                this.parentName.textbox.value = this._EditData.childProperty.propertyName;
                this.parentDisplayName.textbox.value = this._EditData.childProperty.displayName;

                this.parentCanMatch.set("value", this._EditData.childProperty['import'].canMatch);
                this.parentCanImport.set("value", this._EditData.childProperty['import'].canImport);
                this.parentAudited.set("value", this._EditData.childProperty.audited);
            } else {
                this.parentName.textbox.value = this._EditData.parentEntity.$key;
                this.parentDisplayName.textbox.value = this._EditData.parentEntity.$key;

                this.disableEnableParentControls(this, true);
            }

            //Events
            var context = this;
            this.IncludeChild.on("change", function (isChecked) {
                if (isChecked) {
                    context.disableEnableChildControls(context, false);
                }
                else {
                    context.disableEnableChildControls(context, true);
                }
            }, true);
            this.IncludeParent.on("change", function (isChecked) {
                if (isChecked) {
                    context.disableEnableParentControls(context, false);
                }
                else {
                    context.disableEnableParentControls(context, true);
                }
            }, true);
        },
        disableEnableChildControls: function (context, flag) {
            context.childDisplayName.set("disabled", flag);
            context.childCanImport.set("disabled", flag);
            context.childCanMatch.set("disabled", flag);
            context.childAudited.set("disabled", flag);
        },
        disableEnableParentControls: function (context, flag) {
            context.parentDisplayName.set("disabled", flag);
            context.parentCanImport.set("disabled", flag);
            context.parentCanMatch.set("disabled", flag);
            context.parentAudited.set("disabled", flag);
        },
        show: function () {
            if (this._EditData) {
                this._dialog.titleNode.innerHTML = this._title;
            }
            else {
                this._dialog.titleNode.innerHTML = this._title;
            }

            this._dialog.show();
            this.inherited(arguments);
        },

        _createCardinalityFieldController: function () {
            var value = '1:M';
            if (this._EditData)
                value = this._EditData.cardinality;
            var data = new memory({
                data: [
                  { id: "1:M", name: "1:M" },
                  { id: "M:1", name: "M:1" }
                ]
            });

            this.dptypeParentTableField = new crmDropDowns({
                id: this._idParentTableField,
                style: { width: "220px" },
                name: '',
                value: value,
                store: data,
                searchAttr: 'name'
            }, this._idParentTableField
            );

            if (this._EditData && this._EditData.details) {
                this.dptypeParentTableField.set('disabled', true);
            }

            domConstruct.place(this.dptypeParentTableField.domNode, this.dpCardinality, 'only');

        },
        isValid: function () {
            var myform = this.EditRelationshipsForm;
            var isValid = myform.validate();

            return isValid;
        },
        _okClick: function () {
            var context = this;
            if (!this.isValid()) {
                return;
            }
            this._dialog.showLoading();

            var request = new Sage.SData.Client.SDataSingleResourceRequest(SDataServiceRegistry.getSDataService('metadata'));
            this._EditData.cardinality = this.dptypeParentTableField.value;

            if (this.IncludeChild.get("value") === false) {
                this._EditData.parentProperty.isIncluded = false;
            }
            else {
                this._EditData.parentProperty.isIncluded = true;
                this._EditData.parentProperty.propertyName = this.childName.textbox.value;
                this._EditData.parentProperty.displayName = this.childDisplayName.textbox.value;
                this._EditData.parentProperty['import'].canMatch = (this.childCanMatch.get("value") === false) ? false : true;
                this._EditData.parentProperty['import'].canImport = (this.childCanImport.get("value") === false) ? false : true;
                this._EditData.parentProperty.audited = (this.childAudited.get("value") === false) ? false : true;
            }

            if (this.IncludeParent.get("value") === false) {
                this._EditData.childProperty.isIncluded = false;
            }
            else {
                this._EditData.childProperty.isIncluded = true;
                this._EditData.childProperty.propertyName = this.parentName.textbox.value;
                this._EditData.childProperty.displayName = this.parentDisplayName.textbox.value;
                this._EditData.childProperty['import'].canMatch = (this.parentCanMatch.get("value") === false) ? false : true;
                this._EditData.childProperty['import'].canImport = (this.parentCanImport.get("value") === false) ? false : true;
                this._EditData.childProperty.audited = (this.parentAudited.get("value") === false) ? false : true;
            }
            
            request.setResourceKind(dString.substitute('relationships("${0}")', [this._EditData.$key]));

            request['update'](this._EditData, {
                scope: this,
                success: function () {
                    this._dialog.hideLoading();
                    this._dialog.hide();
                },
                failure: function (xhr, sdata) {
                    console.error('error while updating relationship fields');
                    this._dialog.hideLoading();
                    this._dialog.hide();
                }
            });
        },
        startup: function () {
            this.inherited(arguments);
        },
        _onDlgHide: function () {
            this.entityName = '';
        },
        _cmdSave_OnClick: function () {

        },
        _cancelClick: function () {
            this.hide();
        },
        hide: function () {
            this._dialog.hide();
        },
        _onSaveSuccess: function (data) {
        },
        _cmdCancel_OnClick: function (context) {
        }

    });

    return widget;
});