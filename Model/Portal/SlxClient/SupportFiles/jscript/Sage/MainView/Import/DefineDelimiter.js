require({cache:{
'url:Sage/MainView/Import/templates/DefineDelimiter.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"{%= $._nlsResources.dlgDefineDelimiter_Title %}\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"width: 825px\">\r\n        <div data-dojo-type=\"dijit.form.Form\">\r\n            <div style=\"overflow:auto\">\r\n                <label class=\"wizardHeaderText\">{%= $._nlsResources.txtHeader_Caption %}</label>\r\n            </div>\r\n            <br/>\r\n            <div style=\"padding-left: 5px\">\r\n                <label>{%= $._nlsResources.txtChooseDelimiter %}</label>\r\n                <div>\r\n                    <input data-dojo-type=\"dijit.form.RadioButton\" type=\"radio\" name=\"delimiterOption\" value=\"\\t\" data-dojo-attach-point=\"rdoTabOption\" data-dojo-attach-event=\"onClick:_rdoOption_OnClick\" /> {%= $._nlsResources.rdoTabOption %}\r\n                    <input data-dojo-type=\"dijit.form.RadioButton\" type=\"radio\" name=\"delimiterOption\" value=\";\" data-dojo-attach-point=\"rdoSemiColonOption\" data-dojo-attach-event=\"onClick:_rdoOption_OnClick\" /> {%= $._nlsResources.rdoSemicolonOption %}\r\n                    <input data-dojo-type=\"dijit.form.RadioButton\" type=\"radio\" name=\"delimiterOption\" value=\",\" data-dojo-attach-point=\"rdoCommaOption\" data-dojo-attach-event=\"onClick:_rdoOption_OnClick\" /> {%= $._nlsResources.rdoCommaOption %}\r\n                    <input data-dojo-type=\"dijit.form.RadioButton\" type=\"radio\" name=\"delimiterOption\" value=\" \" data-dojo-attach-point=\"rdoSpaceOption\" data-dojo-attach-event=\"onClick:_rdoOption_OnClick\" /> {%= $._nlsResources.rdoSpaceOption %}\r\n                    <input data-dojo-type=\"dijit.form.RadioButton\" type=\"radio\" name=\"delimiterOption\" value=\"otherOption\" data-dojo-attach-point=\"rdoOtherOption\" data-dojo-attach-event=\"onClick:_rdoOption_OnClick\" /> {%= $._nlsResources.rdoOtherOption %}\r\n                    <input data-dojo-type=\"dijit.form.TextBox\" data-dojo-attach-point=\"txtOtherOption\" style=\"width:40px\" maxlength=\"1\" disabled=\"disabled\" data-dojo-attach-event=\"onChange:_txtOtherOption_OnChange\" />\r\n                </div>\r\n                <br/>\r\n                <div>\r\n                    <label> {%= $._nlsResources.txtQualifier %}</label>\r\n                    <select data-dojo-type=\"dijit.form.Select\" data-dojo-attach-point=\"cmbQualifiers\" sortByLabel=\"false\" style=\"width:80px\">\r\n                        <option value=\"\\x000\"></option>\r\n                        <option value=\"&quot;\">\"</option>\r\n                        <option value=\"'\">'</option>\r\n                        <option value=\"None\" selected=\"selected\">{%= Sage.Utility.htmlEncode($.emptyListItem_Caption) %}</option>\r\n                    </select>\r\n                </div>\r\n                <br/>\r\n                <div>\r\n                    <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkFirstRowFieldNames\" data-dojo-attach-event=\"onChange:_chkFirstRowFieldNames_OnChange\" checked=\"true\" />\r\n                    <label> {%= $._nlsResources.chkFirstRowFieldNames %}</label>\r\n                </div>\r\n                <br/>\r\n                <label data-dojo-attach-point=\"lblPreviewData\"></label>\r\n                <div data-dojo-attach-point=\"divLoadingMessage\">\r\n                    <br />\r\n                    <label style=\"padding-left:300px;font-size:16px;font-weight:bold\"> {%= Sage.Utility.htmlEncode($.gridLoading_Caption) %}</label>\r\n                </div>\r\n                <div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-attach-point=\"previewGrid_Container\"></div>\r\n            </div>\r\n            <div align=\"right\" style=\"margin-top:10px\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\" >{%= Sage.Utility.htmlEncode($.btnBack_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">{%= Sage.Utility.htmlEncode($.btnNext_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($.btnCancel_Caption) %}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/Import/DefineDelimiter", [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/on',
    'dojo/_base/array',
    'dojo/store/Memory',
    'Sage/MainView/Import/_WizardDialogBase',
    'dojo/text!./templates/DefineDelimiter.html',
    'dojo/i18n!./nls/DefineDelimiter',
    'Sage/MainView/Import/ImportManagerUtility',
    'Sage/Utility',
    'Sage/UI/Dialogs',
    'Sage/UI/Controls/Grid'
],
function (
    declare,
    dString,
    dOn,
    dArray,
    dMemory,
    wizardDialogBase,
    template,
    nlsResources,
    importManagerUtility,
    utility,
    dialogs,
    Grid
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var defineDelimiter = declare('Sage.MainView.Import.DefineDelimiter', [wizardDialogBase], {
        id: "dlgDefineDelimiter",
        previewGrid: null,
        widgetTemplate: widgetTemplate,
        _nlsResources: nlsResources,
        _currentStep: importManagerUtility.importWizardStep.DefineDelimiter,
        constructor: function () {
            this.inherited(arguments);
        },
        show: function () {
            if (this.importOptions.refreshDelimiterPage) {
                this.btnNext.setDisabled(true);
                importManagerUtility.setDomNodeVisible(this.divLoadingMessage, true);
                this._requestPreviewData();
                dOn(this.cmbQualifiers, "change", dojo.hitch(this, this._requestPreviewData));
                this.importOptions.refreshDelimiterPage = false;
            }
            this.inherited(arguments);
        },
        _requestPreviewData: function () {
            this._updateImportOptions();
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
                    this.importOptions.buildSecondaryAccountName = options.buildSecondaryAccountName;
                    this.importOptions.defaultOwnerId = options.defaultOwnerId;
                    this.importOptions.groupSettings = options.groupSettings ? options.groupSettings : {};
                    this.importOptions.isInitialized = true;
                    this.importOptions.metaDataObject = options.metaDataObject;
                    this.importOptions.mappings = options.mappings;
                    this.importOptions.sourceColumns = JSON.parse(JSON.stringify(options.sourceColumns)); //make a clone the array
                    this.importOptions.sourceModel = options.sourceModel;
                    this.importOptions.targetList = new dMemory({ data: options.targetColumns, idProperty: "name" });
                    this.importOptions.matchOptions = options.matchOptions;
                    this.importOptions.totalRecordCount = options.totalRecordCount;
                    this.importOptions.engineOptions = options.engineOptions;
                    this.lblPreviewData.textContent = dString.substitute(nlsResources.txtPreview, [options.totalRecordCount, options.sourceColumns.length]);
                    this._loadDefaults(options.sourceModel.Options);
                    importManagerUtility.setDomNodeVisible(this.divLoadingMessage, false);
                    this._loadPreviewData(options);
                    this.btnNext.setDisabled(false);
                }),
                onFailure: function (result) {
                    dialogs.showError(dString.substitute(nlsResources.errorRequestFileOptions, [result]));
                }
            };
            importManagerUtility.importRuleRequest(requestOptions, "importHistory");
        },
        _loadDefaults: function (fileOptions) {
            this.cmbQualifiers.attr('value', fileOptions.qualifier.value, false);
            switch (fileOptions.delimiter.value) {
                case ",":
                    this.rdoCommaOption.set("checked", true);
                    break;
                case "\t":
                    this.rdoTabOption.set("checked", true);
                    break;
                case ";":
                    this.rdoSemiColonOption.set("checked", true);
                    break;
                case " ":
                    this.rdoSpaceOption.set("checked", true);
                    break;
                default:
                    this.rdoOtherOption.set("checked", true);
            }
        },
        _loadPreviewData: function (fileOptions) {
            var columns = {};
            dArray.forEach(fileOptions.sourceColumns, function (column, i) {
                columns[i] = column.displayName;
            });
            if (this.previewGrid) {
                this.previewGrid_Container.removeChild(this.previewGrid);
                this.previewGrid.destroy();
            }
            var grd = new Grid({
                classNames: 'dgrid-autoheight',
                columns: columns,
                columnHiding: true,
                columnResizing: true,
                columnReordering: true,
                selectionMode: 'single',
                rowSelection: true,
                store: new dMemory({ data: fileOptions.records }),
                placeHolder: this.previewGrid_Container.id
            });

            // dgrid-autoHeight class needs to accompanied with grid.resize
            grd.resize();
            this.previewGrid = grd;
        },
        _rdoOption_OnClick: function (args) {
            this.txtOtherOption.attr("disabled", !this.rdoOtherOption.checked);
            if (this.rdoOtherOption.checked && this.txtOtherOption.value === "") {
                return;
            }
            this.importOptions.sourceModel.Options.delimiter.value = args.currentTarget.getAttribute('value');
            this._requestPreviewData();
        },
        _txtOtherOption_OnChange: function () {
            if (this.txtOtherOption.value !== "") {
                this.importOptions.sourceModel.Options.delimiter.value = this.txtOtherOption.get('value');
                this._requestPreviewData();
            }
        },
        _txtQualifier_OnChange: function () {
            this._requestPreviewData();
        },
        _chkFirstRowFieldNames_OnChange: function () {
            this.importOptions.firstRowFieldNames = !this.importOptions.firstRowFieldNames;
            this.importOptions.sourceColumns = null;
            this.importOptions.defaultMappings = null;
            this.importOptions.mappings = null;
            this._requestPreviewData();
        },
        _updateImportOptions: function () {
            if (this.cmbQualifiers.value !== "None") {
                this.importOptions.sourceModel.Options.qualifier.value = this.cmbQualifiers.value;
            }
            this.importOptions.firstRowFieldNames = this.chkFirstRowFieldNames.checked.toString();
        }
    });
    return defineDelimiter;
});