require({cache:{
'url:Sage/MainView/Import/templates/Review.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"{%= $._nlsResources.dlgMapFields_Title %}\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"width: 625px\">\r\n        <div data-dojo-type=\"dijit.form.Form\">\r\n            <div class=\"crystalParameterContainer\">\r\n                <label class=\"wizardHeaderText\">{%= $._nlsResources.txtHeader_Caption %}</label>\r\n                <br/>\r\n                <div style=\"padding-left: 5px\">\r\n                    <label data-dojo-attach-point=\"previewFileName\"></label>\r\n                </div>\r\n                <div style=\"padding-left: 5px\">\r\n                    <label data-dojo-attach-point=\"previewImportDataMode\"></label>\r\n                </div>\r\n                <div style=\"padding-left: 5px\">\r\n                    <label data-dojo-attach-point=\"previewRecordCount\"></label>\r\n                </div>\r\n                <div style=\"padding-left: 5px\">\r\n                    <label data-dojo-attach-point=\"previewAdHocGroup\"></label>\r\n                </div>\r\n            </div>\r\n            <br/>\r\n            <div class=\"crystalParameterContainer\">\r\n                <table cellspacing=\"10\">\r\n                    <tr>\r\n                        <td>\r\n                            <label>{%= $.lstTemplate_Caption %}</label>\r\n                        </td>\r\n                        <td>\r\n                            <div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-attach-point=\"templates_Container\"></div>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n                <div>\r\n                    <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnSaveTemplate\" data-dojo-attach-event=\"onClick:_btnSaveTemplate_OnClick\" >{%= Sage.Utility.htmlEncode($._nlsResources.btnSaveTemplate_Caption) %}</div>\r\n                    <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnSaveAsTemplate\" data-dojo-attach-event=\"onClick:_btnSaveAsTemplate_OnClick\" >{%= Sage.Utility.htmlEncode($._nlsResources.btnSaveAsTemplate_Caption) %}</div>\r\n                </div>\r\n            </div>\r\n            <div align=\"right\" style=\"margin-top:10px\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\" >{%= Sage.Utility.htmlEncode($.btnBack_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnFinish\" data-dojo-attach-event=\"onClick:_btnFinish_OnClick\">{%= Sage.Utility.htmlEncode($.btnFinish_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($.btnCancel_Caption) %}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/Import/Review", [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/topic',
    'Sage/MainView/Import/_WizardDialogBase',
    'dojo/text!./templates/Review.html',
    'dojo/i18n!./nls/Review',
    'Sage/MainView/Import/ImportManagerUtility',
    'Sage/MainView/Import/ManageImportTemplate',
    'Sage/Utility',
    'Sage/Utility/Jobs',
    'Sage/UI/Dialogs'
],
function (
    declare,
    dojoArray,
    dojoLang,
    dString,
    topic,
    wizardDialogBase,
    template,
    nlsResources,
    importManagerUtility,
    manageImportTemplate,
    utility,
    jobs,
    dialogs
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var review = declare('Sage.MainView.Import.Review', [wizardDialogBase], {
        id: "dlgReview",
        templateDialogId: 'dlgManageImportTemplate',
        widgetTemplate: widgetTemplate,
        _nlsResources: nlsResources,
        _currentStep: importManagerUtility.importWizardStep.Review,
        _checkCurrentStep: function(){
            if (this.importOptions.optionsFromTemplate === true)
            {
                this._currentStep = importManagerUtility.importWizardStep.ManageImportOptions;
            }
            else
            {
                this._currentStep = importManagerUtility.importWizardStep.Review;
            }
        },
        constructor: function () {
            this.inherited(arguments);
        },
        show: function () {
            if (this.importOptions.optionsFromTemplate === true) {
                this.btnBack.setAttribute("label", nlsResources.btnBack_Edit_Caption);
            }
            else
            {
                this.btnBack.setAttribute("label", this.baseNlsResources.btnBack_Caption);
            }
            this._initializeTemplateList();
            this.previewFileName.textContent = dString.substitute(nlsResources.previewFileName_Caption, [this.importOptions.fileName]);
            this.previewImportDataMode.textContent = dString.substitute(nlsResources.previewImportDataMode, [this.importOptions.previewDataMode]);
            this.previewRecordCount.textContent = dString.substitute(nlsResources.previewRecordCount_Caption, [this.importOptions.totalRecordCount]);
            this.previewAdHocGroup.textContent = dString.substitute(nlsResources.previewAdHocGroup_Caption, [this.importOptions.previewAdHocGroup]);
            this.btnSaveTemplate.set('disabled', this.importOptions.importTemplateId === null);
            this.subscriptions.push(topic.subscribe("/importController/importWizard/savedImportTemplate", dojo.hitch(this, function () { this._initializeTemplateList(); })));
            this.inherited(arguments);
        },
        _initializeTemplateList: function () {
            var requestOptions = {
                where: dString.substitute('EntityName eq \'${0}\'', [this.importOptions.importEntity]),
                onSuccess: dojo.hitch(this, function (templates) {
                    if (this.importTemplates && this.templates_Container) {
                        this.templates_Container.removeChild(this.importTemplates);
                    }
                    this.importTemplates = this._initializeTemplates(templates);
                    this.importTemplates.placeAt(this.templates_Container);
                    this.btnSaveTemplate.setAttribute("disabled", this.importOptions.importTemplateId === null || this.importOptions.isSystemTemplate);
                })
            };
            importManagerUtility.requestImportTemplates(requestOptions);
        },
        _btnSaveTemplate_OnClick: function () {
            this.saveImportJobTemplate(this.getTemplateConfigurationOptions());
        },
        _btnSaveAsTemplate_OnClick: function () {
            var templateDialogId = dijit.byId("dlgManageImportTemplate");
            if (templateDialogId) {
                templateDialogId.destroyRecursive();
            }
            templateDialogId = new manageImportTemplate();
            templateDialogId.startup();
            templateDialogId.show();
        },
        _btnFinish_OnClick: function () {
            this._startImportJob();
            this._dialog.hide();
            this.finishWizard();
        },
        _startImportJob: function () {
            var options = {
                descriptor: dString.substitute(nlsResources.txtJobDescriptor, [this.importOptions.importEntityDisplayName, this.importOptions.attachmentName]),
                closable: true,
                title: dString.substitute(nlsResources.txtJobTitle_Caption, [this.importOptions.importEntityDisplayName]),
                key: "Sage.SalesLogix.BusinessRules.Jobs.ImportJob",
                parameters: [
                    { "name": "ImportConfiguration", "value": Sys.Serialization.JavaScriptSerializer.serialize(this.getConfigurationOptions()) }
                ],
                failure: function (error) {
                    dialogs.showError(dString.substitute(nlsResources.errorJobFailed, [error.responseText]));
                },
                ensureZeroFilters: true
            };
            jobs.triggerJobAndDisplayProgressDialog(options);
        }
    });
    return review;
});