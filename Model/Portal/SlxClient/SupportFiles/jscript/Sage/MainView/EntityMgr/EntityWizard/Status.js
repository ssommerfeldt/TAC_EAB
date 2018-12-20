require({cache:{
'url:Sage/MainView/EntityMgr/EntityWizard/templates/Status.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"New Entity Wizard\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"position:absolute;width: 625px;height:625px;\">\r\n        <div data-dojo-type=\"dijit.form.Form\" style=\"height:600px !important;\" dojoattachpoint=\"Form\">\r\n\r\n            <div style=\"\">\r\n                <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblCreateEntity\">Create Entity</label>\r\n                <p><label data-dojo-attach-point=\"lblStatus\">Status</label></p>\r\n                <hr />\r\n            </div>\r\n\r\n            <div style=\"padding-bottom: 30px;\">\r\n                <p><label data-dojo-attach-point=\"statusLabel\" style=\"font-weight: bold;\"></label>\r\n                </p>\r\n                <p>\r\n                    <label data-dojo-attach-point=\"selectedRelStatus\" style=\"font-weight: bold;\"></label>\r\n                </p>\r\n                <p>\r\n                    <label data-dojo-attach-point=\"ownerStatus\" style=\"font-weight: bold;\"></label>\r\n                </p>\r\n            </div>\r\n\r\n\r\n            <div align=\"right\" style=\"position:absolute;bottom:30px;width:90%;\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnFinish\" data-dojo-attach-event=\"onClick:_btnFinish_OnClick\" style=\"margin-left:5px;\">Finish</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityWizard/Status", [
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/number',
    'dojo/string',
    'Sage/MainView/EntityMgr/EntityWizard/_EntityWizardDialogBase',
    'dojo/text!./templates/Status.html',
    //'dojo/i18n!./nls/SelectFile',
    'Sage/MainView/EntityMgr/EntityWizard/EntityWizardUtility',
    'Sage/Utility',
    'Sage/Utility/File/Attachment'
],
function (
    declare,
    connect,
    dNumber,
    dString,
    wizardDialogBase,
    template,
    //nlsResources,
    entityWizardUtility,
    utility,
    attachmentUtility
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var status = declare('Sage.MainView.EntityMgr.EntityWizard.Status', [wizardDialogBase], {
        id: "dlgStatus",
        widgetTemplate: widgetTemplate,
        //_nlsResources: nlsResources,
        _currentStep: entityWizardUtility.entityWizardStep.EntityDetails,
        _fileInputOnChange: null,
        constructor: function () {
            this.inherited(arguments);
        },
        startup: function () {
            this.statusLabel.innerHTML = this.entityDetails.status;
            if (this.entityDetails.selectedRelStatus) {
                this.selectedRelStatus.innerHTML = this.entityDetails.selectedRelStatus;
            }
            if (this.entityDetails.ownerStatus) {
                this.ownerStatus.innerHTML = this.entityDetails.ownerStatus;
            }
            
            this.inherited(arguments);
        },
        postCreate: function () {
			this._dialog.set("title", this._nlsResources.lblNewEntityWizard);
            this.lblCreateEntity.innerHTML = this._nlsResources.lblCreateEntity;
            this.lblStatus.innerHTML = this._nlsResources.lblStatus;
			this.btnFinish.set("label", this._nlsResources.lblFinish);
        },
        _btnFinish_OnClick: function () {
            this._dialog.hide();
            this.finishWizard();
        },
        isValid: function () { 
            var myform = this.Form;
            return myform.validate();
            //return true;
        },
        destroy: function () {
            this.inherited(arguments);
        }
    });
    return status;
});