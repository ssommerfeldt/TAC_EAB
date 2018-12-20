require({cache:{
'url:Sage/MainView/Import/templates/SelectFile.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"{%= $._nlsResources.dlgSelectFile_Title %}\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"width: 625px\">\r\n        <div data-dojo-type=\"dijit.form.Form\">\r\n            <input type=\"file\" data-dojo-attach-point=\"fileInputBtn\" style=\"display:none;\" />\r\n            <div class=\"crystalParameterContainer\">\r\n                <table cellspacing=\"10\" width=\"100%\">\r\n                    <colgroup>\r\n                        <col style=\"width:2%\"/>\r\n                        <col style=\"width:8%\" />\r\n                        <col style=\"width:90%\" />\r\n                    </colgroup>\r\n                    <tr>\r\n                        <td colspan=\"3\">\r\n                            <label class=\"wizardHeaderText\">{%= $._nlsResources.txtSelectFile %}</label>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>\r\n                            <span data-dojo-attach-point=\"errorNoUploadFile\" class=\"display-none\" style=\"color:red\">*</span>\r\n                        </td>\r\n                        <td colspan=\"2\">\r\n                            <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnUploadFile\" data-dojo-attach-event=\"onClick:_btnUploadFile_OnClick\" >{%= Sage.Utility.htmlEncode($._nlsResources.btnUploadFile_Caption) %}</div>\r\n                            <input data-dojo-type=\"dijit.form.TextBox\" data-dojo-attach-point=\"txtFakeUploadFile\" readonly=\"readonly\" value=\"{%= Sage.Utility.htmlEncode($._nlsResources.txtUploadFile_Caption) %}\" style=\"width: 65%\" />\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td colspan=\"2\"></td>\r\n                        <td>\r\n                            <label data-dojo-attach-point=\"lblFileUpload\"></label>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n            <br/>\r\n            <div class=\"crystalParameterContainer\">\r\n                <table cellspacing=\"10\">\r\n                    <tr>\r\n                        <td>\r\n                            <label>{%= $.lstTemplate_Caption %}</label>\r\n                        </td>\r\n                        <td>\r\n                            <div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-attach-point=\"templates_Container\"></div>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n            <br/>\r\n            <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\">\r\n                <span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>\r\n            </div>\r\n            <div align=\"right\" style=\"margin-top:10px\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">{%= Sage.Utility.htmlEncode($.btnNext_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($.btnCancel_Caption) %}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/Import/SelectFile", [
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/number',
    'dojo/string',
    'dojo/store/Memory',
    'Sage/MainView/Import/_WizardDialogBase',
    'dojo/text!./templates/SelectFile.html',
    'dojo/i18n!./nls/SelectFile',
    'Sage/MainView/Import/ImportManagerUtility',
    'Sage/Utility',
    'Sage/Utility/File/Attachment',
    'Sage/UI/Dialogs'
],
function (
    declare,
    connect,
    dNumber,
    dString,
    dMemory,
    wizardDialogBase,
    template,
    nlsResources,
    importManagerUtility,
    utility,
    attachmentUtility,
    dialogs
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var selectFile = declare('Sage.MainView.Import.SelectFile', [wizardDialogBase], {
        id: "dlgSelectFile",
        widgetTemplate: widgetTemplate,
        _nlsResources: nlsResources,
        _currentStep: importManagerUtility.importWizardStep.SelectFile,
        _fileInputOnChange: null,
        constructor: function () {
            this.inherited(arguments);
        },
        startup: function () {
            this._initializeFileUploadControl();
            this._initializeTemplateList();
            this.inherited(arguments);
        },
        preformValidation: function (successfulCallback,failedCallback)
        {
            if (this.validate()) {
                successfulCallback();
            }
            else
            {
                failedCallback();
            }
        },
        validate: function () {
            var msg = '';
            dojo.addClass(this.errorNoUploadFile, 'display-none');
            if (!this.importOptions.attachmentId) {
                msg = nlsResources.errorNoUploadFile;
                dojo.removeClass(this.errorNoUploadFile, 'display-none');
                this.spanValidationMessage.innerHTML = utility.htmlEncode(msg);
            }
            importManagerUtility.setDomNodeVisible(this.divValidationMessage, (msg !== ""));
            if (msg === '') {
                msg = nlsResources.errorNoUploadFile;
                dojo.removeClass(this.errorNoUploadFile, 'display-none');
                this._updateImportOptions();
                return true;
            }
            return false;
        },
        destroy: function () {
            this.importTemplates.destroyRecursive();
            this.inherited(arguments);
        },
        _initializeFileUploadControl: function() {
            this._fileInputOnChange = dojo.hitch(this, connect.connect(this.fileInputBtn, 'onchange', this, this._handleFiles));
            this.subscriptions.push(dojo.subscribe('/entity/attachment/create', this, this._onNewFileUpload));
        },
        _initializeTemplateList: function() {
            var requestOptions = {
                where: dString.substitute('EntityName eq \'${0}\'', [this.importOptions.importEntity]),
                onSuccess: dojo.hitch(this, function (templates) {
                    this.importTemplates = this._initializeTemplates(templates);
                    this.importTemplates.placeAt(this.templates_Container);
                })
            };
            importManagerUtility.requestImportTemplates(requestOptions);
        },
        _btnUploadFile_OnClick: function () {
            this.fileInputBtn.click();
        },
        _handleFiles: function (e) {
            this._createAttachments(this.fileInputBtn.files);
        },
        _createAttachments: function (files) {
            if (files.length > 0) {
                this.importOptions.isInitialized = false; //make sure importOptions is reinitialized in case this is a different uploaded file
                this.lblFileUpload.textContent = dString.substitute(nlsResources.txtFileContents_Caption, [files[0].name, dNumber.round(files[0].size / 1024, 0)]);
                this.txtFakeUploadFile.set('value', files[0].name);
                attachmentUtility.createAttachmentSilent(files[0], {});
            }
        },
        _onNewFileUpload: function (attachment) {
            this.importOptions.attachmentId = attachment.$key;
            this.importOptions.attachmentName = attachment.$descriptor;
            this.importOptions.fileName = attachment.fileName;
            this.importOptions.refreshDelimiterPage = true;
            this.importOptions.refreshMapFieldsPage = true;
            this.validate();
        },
        _updateImportOptions: function () {
            if (!this.importOptions.refreshDelimiterPage) {
                this.importOptions.refreshDelimiterPage = this.importTemplates.value !== this.importOptions.importTemplateId;
            }
            var refresh = !!this.importOptions.refreshMapFiledsPage || this.importTemplates.value !== this.importOptions.importTemplateId;
            if (refresh) {
                var dialog = dijit.byId("dlgMapFields");
                if (dialog) {
                    dialog.destroyRecursive();
                }
                this.importOptions.refreshMapFieldsPage = false;
            }
            this.importOptions.refreshMapFieldsPage = this.importTemplates.value !== this.importOptions.importTemplateId;
            this.importOptions.importTemplateId = this.importTemplates.value !== "" ? this.importTemplates.value : null;
            this.importOptions.isSystemTemplate = !!(this.importTemplates.item && this.importTemplates.item.IsSystemTemplate);
            this.importOptions.optionsFromTemplate = false;
            this._currentStep = importManagerUtility.importWizardStep.SelectFile;
            if (this.importOptions.importTemplateId !== null) {
                this._currentStep = importManagerUtility.importWizardStep.MapFields;
                if (!this.importOptions.targetColumns || this.importOptions.targetColumns === null) {
                    var msg = nlsResources.txtLoadTemplate_Caption;
                    dojo.removeClass(this.errorNoUploadFile, 'display-none');
                    this.spanValidationMessage.innerHTML = utility.htmlEncode(msg);

                    var fileOptions = {
                        importEntity: this.importOptions.importEntity,
                        importEntityType: this.importOptions.importEntityType,
                        attachmentId: this.importOptions.attachmentId,
                        importTemplateId: this.importOptions.importTemplateId,
                        delimiter: this.importOptions.sourceModel ? this.importOptions.sourceModel.Options.delimiter.value : null,
                        qualifier: this.importOptions.sourceModel ? this.importOptions.sourceModel.Options.qualifier.value : null,
                        firstRowFieldNames: this.importOptions.firstRowFieldNames,
                        numberRecordBack: "5",
                        isInitialized: this.importOptions.isInitialized,
                        sourceModel: this.importOptions.sourceModel,
                        sourceColumns: this.importOptions.sourceColumns,
                        defaultOwnerId: this.importOptions.defaultOwnerId,
                        groupSettings: this.importOptions.groupSettings,
                        metaDataObject: this.importOptions.metaDataObject,
                        targetColumns: this.importOptions.targetList ? this.importOptions.targetList.data : this.importOptions.targetList,
                        matchOptions: this.importOptions.matchOptions,
                        engineOptions: this.importOptions.engineOptions,
                        defaultAdHocGroupName: this.importOptions.groupSettings.name
                    };

                    var requestOptions = {
                        entry: {
                            "$name": "ReadImportData",
                            "request": {
                                "ImportHistoryId": null,
                                "importOptions": Sys.Serialization.JavaScriptSerializer.serialize(fileOptions)
                            }
                        },
                        businessRuleMethod: "ReadImportData",
                        onSuccess: dojo.hitch(this, function (options) {
                            this.importOptions.optionsFromTemplate = true;
                            this.importOptions.buildSecondaryAccountName = options.buildSecondaryAccountName;
                            this.importOptions.defaultOwnerId = options.defaultOwnerId;
                            this.importOptions.groupSettings = options.groupSettings ? options.groupSettings : {};
                            this.importOptions.previewAdHocGroup = options.groupSettings ? options.groupSettings.name : "";
                            this.importOptions.isInitialized = true;
                            this.importOptions.metaDataObject = options.metaDataObject;
                            this.importOptions.mappings = options.mappings;
                            this.importOptions.sourceColumns = JSON.parse(JSON.stringify(options.sourceColumns)); //make a clone the array
                            this.importOptions.sourceModel = options.sourceModel;
                            this.importOptions.targetList = new dMemory({ data: options.targetColumns, idProperty: "name" });
                            this.importOptions.matchOptions = options.matchOptions;
                            this.importOptions.totalRecordCount = options.totalRecordCount;
                            this.importOptions.engineOptions = options.engineOptions;
                            if (options.engineOptions.mode.value == "0")
                            {
                                this.importOptions.previewDataMode = nlsResources.lstImportOption_Insert;
                            }
                            else if (options.engineOptions.mode.value == "1")
                            {
                                this.importOptions.previewDataMode = nlsResources.lstImportOption_Update;
                            }
                            else if (options.engineOptions.mode.value == "2")
                            {
                                this.importOptions.previewDataMode = nlsResources.lstImportOption_InsertUpdate;
                            }
                            else
                            {
                                this.importOptions.previewDataMode = nlsResources.lstImportOption_Insert;
                            }
                            dojo.addClass(this.errorNoUploadFile, 'display-none');
                        }),
                        onFailure: function (result) {
                            dialogs.showError(dString.substitute(nlsResources.errorRequestFileOptions, [result]));
                        }
                    };
                    importManagerUtility.importRuleRequest(requestOptions, "importHistory",false);
                }
            }

        }
    });
    return selectFile;
});