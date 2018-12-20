require({cache:{
'url:Sage/MainView/EntityMgr/EntityWizard/templates/EntityDetails.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"New Entity Wizard\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"position:absolute;width: 625px;height:625px;\">\r\n        <div data-dojo-type=\"dijit.form.Form\" style=\"height:600px !important;\" dojoattachpoint=\"Form\">\r\n\r\n            <div style=\"padding-bottom:30px;\">\r\n                <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblCreateEntity\">Create Entity</label>\r\n                <p><label data-dojo-attach-point=\"lblCreateEntityFromTable\">Create a new entity from a table</label></p>\r\n                <hr />\r\n            </div>\r\n            \r\n            <table class=\"detailTableContainer formtable HundredPercentWidth\">\r\n                <tr data-dojo-attach-point=\"_displayNameSection\">\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblDisplayName\">\r\n                                Display Name\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld dijitInline\" data-dojo-attach-point=\"displayName\">\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"_filterNameSection\">\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblEntityName\">\r\n                                Entity Name\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld  dijitInline\" data-dojo-attach-point=\"Name\">\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"_filterNameSection\">\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\">\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld  dijitInline\"  data-dojo-attach-point=\"\" style=\"color:red\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"divValidationMessage\">\r\n                            </label>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n\r\n            <div align=\"right\" style=\"position:absolute;bottom:30px;width:90%;\">\r\n                <!--<div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\">Back</div>-->\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">Next ></div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">Cancel</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
require({cache:{
'url:Sage/MainView/EntityMgr/EntityWizard/templates/EntityDetails.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"New Entity Wizard\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"position:absolute;width: 625px;height:625px;\">\r\n        <div data-dojo-type=\"dijit.form.Form\" style=\"height:600px !important;\" dojoattachpoint=\"Form\">\r\n\r\n            <div style=\"padding-bottom:30px;\">\r\n                <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblCreateEntity\">Create Entity</label>\r\n                <p><label data-dojo-attach-point=\"lblCreateEntityFromTable\">Create a new entity from a table</label></p>\r\n                <hr />\r\n            </div>\r\n            \r\n            <table class=\"detailTableContainer formtable HundredPercentWidth\">\r\n                <tr data-dojo-attach-point=\"_displayNameSection\">\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblDisplayName\">\r\n                                Display Name\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld dijitInline\" data-dojo-attach-point=\"displayName\">\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"_filterNameSection\">\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblEntityName\">\r\n                                Entity Name\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld  dijitInline\" data-dojo-attach-point=\"Name\">\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"_filterNameSection\">\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\">\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld  dijitInline\"  data-dojo-attach-point=\"\" style=\"color:red\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"divValidationMessage\">\r\n                            </label>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n\r\n            <div align=\"right\" style=\"position:absolute;bottom:30px;width:90%;\">\r\n                <!--<div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\">Back</div>-->\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">Next ></div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">Cancel</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityWizard/EntityDetails", [
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/number',
    'dojo/string',
    'Sage/MainView/EntityMgr/EntityWizard/_EntityWizardDialogBase',
    'dojo/text!./templates/EntityDetails.html',
    'Sage/MainView/EntityMgr/EntityWizard/EntityWizardUtility',
    'Sage/Utility',
    'Sage/Utility/File/Attachment',
    'dojo/topic',
    'Sage/UI/Controls/TextBox',
    'dojo/dom-construct',
    'Sage/UI/FilteringSelect',
    'dojo/store/Memory',
    'Sage/Data/SDataServiceRegistry',
    'Sage/UI/_DialogLoadingMixin',
    'dojo/_base/lang',
    'dijit/form/Form',
    'Sage/MainView/EntityMgr/EntityDetailUtility'

],
function (
    declare,
    connect,
    dNumber,
    dString,
    wizardDialogBase,
    template,
    entityWizardUtility,
    utility,
    attachmentUtility,
    topic,
    crmTextBox,
    domConstruct,
    crmDropDowns,
    Memory,
    SDataServiceRegistry,
    _DialogLoadingMixin,
    lang,
    Form,
    entityDetailUtility
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var entityDetails = declare('Sage.MainView.EntityMgr.EntityWizard.EntityDetails', [wizardDialogBase], {
        id: "dlgEntityDetails",
        widgetTemplate: widgetTemplate,
        _currentStep: entityWizardUtility.entityWizardStep.EntityDetails,
        _fileInputOnChange: null,
        nameTextBox: null,
        displayNameTextBox: null,

        constructor: function () {
            this.inherited(arguments);
        },
        startup: function () { 
            this.inherited(arguments);
        },
        postCreate: function () {
            this._dialog.set("title", this._nlsResources.lblNewEntityWizard);
            this.lblCreateEntity.innerHTML = this._nlsResources.lblCreateEntity;
            this.lblCreateEntityFromTable.innerHTML = this._nlsResources.lblCreateEntityFromTable;
            this.lblDisplayName.innerHTML = this._nlsResources.lblDisplayName;
            this.lblEntityName.innerHTML = this._nlsResources.lblEntityName;
            this.btnNext.set("label", this._nlsResources.lblNext + ' >');
            this.btnCancel.set("label", this._nlsResources.lblCancel);
            
            if (!this._dialog._standby) {
                lang.mixin(this._dialog, new _DialogLoadingMixin());
            }
            this._createTextboxControls();

            dojo.connect(this.displayNameTextBox, "onChange", this, function (value) {
                var valueNoSpecialChars = value.replace(/[^A-Za-z0-9]/g, '');
                this.nameTextBox.set("value", this._capitalizeFirstLetter(valueNoSpecialChars.replace(/\s/g, "")));
            });

        },
        _capitalizeFirstLetter: function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        _createTextboxControls: function () {

            this.nameTextBox = new crmTextBox(
            {
                shouldPublishMarkDirty: false,
                required: true,
                validator: this._NameValidator,
                invalidMessage: this._nlsResources.lblInvalidEntry
            });

            domConstruct.place(this.nameTextBox.domNode, this.Name, 'only');
            
            this.displayNameTextBox = new crmTextBox(
                {
                    shouldPublishMarkDirty: false,
                    required: true,
                    //id: "idDisplayName",
                    //validator: null,
                    invalidMessage: 'Required'
                });
            domConstruct.place(this.displayNameTextBox.domNode, this.displayName, 'only');
        },
        _NameValidator: function (value, constraints) {
            // value needs to start with a letter, but can also contain numbers
            var regex = '^[A-Z][A-Za-z0-9]*$';
            var matches = value.match(regex, 'g');
            if (matches) {
                if (lang.isArray(matches)) {
                    return matches[0].length == value.length;
                }
                else {
                    return matches[0].length == value.length;
                }
            }
            return false;
        },
        _validateUniqueName: function () {
            this._dialog.showLoading();
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(SDataServiceRegistry.getSDataService('metadata'));
            request.setResourceKind(dString.substitute('entities'));
            request.setQueryArg('count', 1);
            request.setQueryArg('where', dString.substitute("name like '${0}'", [this.nameTextBox.value.toLowerCase()]));
            var context = this;
            var retValue = true;
            request.read({
                async: false,
                success: function (data) {
                    if (typeof (data) !== 'undefined' && typeof (data.$resources) !== 'undefined' && data.$resources.length == 1) {
                        context.divValidationMessage.innerHTML = context._nlsResources.lblEntityUsed;

                        retValue = false;
                    }
                    else {
                        retValue = true;
                    }
                    context._dialog.hideLoading();
                },
                failure: function (data) {
                    context._dialog.hideLoading();
                    retValue = false;
                }
            });

            return retValue;
        },
        isValid: function () { 
            var myform = this.Form;
            var isValid = myform.validate();
            if (isValid) {
                isValid = this._validateUniqueName();
            }
            return isValid;
        },
        destroy: function () {
            this.inherited(arguments);
        },
        _btnNext_OnClick: function () {
            this._dialog.showLoading();
            var context = this;

            setTimeout(function () {
                context.divValidationMessage.innerHTML = '';
                context.entityDetails.entityName = context.nameTextBox.value;
                context.entityDetails.entityDisplayName = context.displayNameTextBox.value;
                context.entityDetails.status = 'ok';

                if (context.isValid()) {
                    context._dialog.hideLoading();
                    context._checkCurrentStep();
                    context._dialog.hide();
                    topic.publish("/entityController/entityWizard/nextStep", context._currentStep);
                } else {
                    context._dialog.hideLoading();
                }
            }, 1000);

        }
    });
    return entityDetails;
});