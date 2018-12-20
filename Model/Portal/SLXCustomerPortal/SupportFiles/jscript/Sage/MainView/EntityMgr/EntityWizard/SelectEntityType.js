require({cache:{
'url:Sage/MainView/EntityMgr/EntityWizard/templates/SelectEntityType.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"New Entity Wizard\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"position:absolute;width: 625px;height:625px;\">\r\n        <div data-dojo-type=\"dijit.form.Form\" style=\"height:600px !important;\">\r\n            <div>\r\n                <label style=\"font-size:16px; font-weight:bold;\">Welcome to the New Entity Wizard</label>\r\n                <p>This Wizard takes you through the steps for creating a new entity.</p>\r\n\r\n                <div style=\"margin-top:40px;margin-left:40px;\">\r\n                    <input data-dojo-type=\"dijit/form/RadioButton\" name=\"EntityType\" value=\"existing\" /> <label style=\"font-weight:bold;\">Create a business entity from an existing table</label> <br />\r\n                    <ul>\r\n                        <li><p>The schema can be modified using the Saleslogix DB Manager within the legacy Architect or Administrator</p></li>\r\n                    </ul>\r\n                </div>\r\n                <div style=\"margin-top:20px;margin-left:40px;\">\r\n                    <input data-dojo-type=\"dijit/form/RadioButton\" checked name=\"EntityType\" value=\"New\" /> <label style=\"font-weight:bold;\">Create a business entity and a new table</label> <br />\r\n                    <ul>\r\n                        <li><p>The table will automatically be created based on the definition of the entity</p></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n            <br />\r\n            <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\">\r\n                <span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>\r\n            </div>\r\n            <div align=\"right\" style=\"position:absolute;bottom:30px;width:90%;\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">Next></div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">Cancel</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityWizard/SelectEntityType", [
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/number',
    'dojo/string',
    'Sage/MainView/EntityMgr/EntityWizard/_EntityWizardDialogBase',
    'dojo/text!./templates/SelectEntityType.html',
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
    var selectEntityType = declare('Sage.MainView.EntityMgr.EntityWizard.SelectEntityType', [wizardDialogBase], {
        id: "dlgSelectEntityType",
        widgetTemplate: widgetTemplate,
        //_nlsResources: nlsResources,
        _currentStep: entityWizardUtility.entityWizardStep.SelectEntityType,
        _fileInputOnChange: null,
        constructor: function () {
            this.inherited(arguments);
        },
        startup: function () {
            this.inherited(arguments);
        },
        isValid: function () {
            return true;
        },
        destroy: function () {
            this.inherited(arguments);
        }
    });
    return selectEntityType;
});