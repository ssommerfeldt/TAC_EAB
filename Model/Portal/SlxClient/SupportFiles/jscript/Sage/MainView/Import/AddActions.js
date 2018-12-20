require({cache:{
'url:Sage/MainView/Import/templates/AddActions.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"{%= $._nlsResources.dlgAddActions_Title %}\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"width: 625px\">\r\n        <div data-dojo-type=\"dijit.form.Form\">\r\n            <div style=\"overflow:auto\">\r\n                <div data-dojo-attach-point=\"paramsContainerDiv\" id=\"paramsContainerDiv\" style=\"height:400px; overflow:auto\"></div>\r\n            </div>\r\n            <div align=\"right\" style=\"margin-top:10px\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\" >{%= Sage.Utility.htmlEncode($.btnBack_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">{%= Sage.Utility.htmlEncode($.btnNext_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($.btnCancel_Caption) %}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/Import/AddActions", [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'Sage/MainView/Import/_WizardDialogBase',
    'dojo/text!./templates/AddActions.html',
    'dojo/i18n!./nls/AddActions',
    'Sage/MainView/Import/ImportManagerUtility',
    'Sage/Utility'
],
function (
    declare,
    dojoArray,
    dojoLang,
    _WizardDialogBase,
    template,
    nlsResources,
    importManagerUtility,
    utility
) {
    var __widgetTemplate = utility.makeTemplateFromString(template);
    var addActions = declare('Sage.MainView.Import.AddActions', [_WizardDialogBase], {
        id: "dlgAddActions",
        widgetTemplate: __widgetTemplate,
        _nlsResources: nlsResources,
        _currentStep: importManagerUtility.importWizardStep.AddActions,
        constructor: function () {
            this.inherited(arguments);
        },
        startup: function () {
            this.inherited(arguments);
        }
        //destroy: function () {
        //    this.inherited(arguments);
        //},
    });
    return addActions;
});