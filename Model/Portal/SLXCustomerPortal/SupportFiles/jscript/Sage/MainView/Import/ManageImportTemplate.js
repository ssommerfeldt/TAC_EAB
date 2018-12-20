require({cache:{
'url:Sage/MainView/Import/templates/ManageImportTemplate.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"{%= $._nlsResources.dlgManageImportTemplate_Title %}\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"width: 800px\">\r\n        <div data-dojo-type=\"dijit.form.Form\">\r\n            <table cellspacing=\"10\">\r\n                <tr>\r\n                    <td>\r\n                        <label>{%= $._nlsResources.txtDescription_Caption %}</label>\r\n                    </td>\r\n                    <td>\r\n                        <input data-dojo-type=\"dijit.form.TextBox\" data-dojo-attach-point=\"txtTemplateDescription\" style=\"width:200px\" />\r\n                        <span data-dojo-attach-point=\"errorInvalidDescription\" class=\"display-none\" style=\"color:red\">*</span>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>\r\n                        <label>{%= $._nlsResources.txtImportTemplates_Caption %}</label>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n            <div data-dojo-attach-point=\"divLoadingMessage\">\r\n                <br />\r\n                <label style=\"padding-left:300px;font-size:16px;font-weight:bold\"> {%= Sage.Utility.htmlEncode($.gridLoading_Caption) %}</label>\r\n            </div>\r\n            <div data-dojo-attach-point=\"templatesGrid\"></div>\r\n            <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\">\r\n                <span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>\r\n            </div>\r\n            <div align=\"right\" style=\"margin-top:10px\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnSave_OnClick\" >{%= Sage.Utility.htmlEncode($._nlsResources.btnSave_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($.btnClose_Caption) %}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/Import/ManageImportTemplate", [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'Sage/MainView/Import/_WizardDialogBase',
    'dojo/text!./templates/ManageImportTemplate.html',
    'dojo/i18n!./nls/ManageImportTemplate',
    'Sage/Utility',
    'Sage/UI/Dialogs',
    'Sage/MainView/Import/ImportManagerUtility',
    'Sage/UI/Controls/Grid',
    'dojo/store/Memory',
    'Sage/Data/SDataServiceRegistry'
],
function (
    declare,
    dLang,
    dString,
    wizardDialogBase,
    template,
    nlsResources,
    utility,
    dialogs,
    importManagerUtility,
    Grid,
    memory,
    sDataServiceRegistry
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var manageImportTemplate = declare('Sage.MainView.Import.ManageImportTemplate', [wizardDialogBase], {
        id: 'dlgManageImportTemplate',
        widgetTemplate: widgetTemplate,
        _nlsResources: nlsResources,
        templatesGrd: '',
        constructor: function () {
            this.inherited(arguments);
        },
        startup: function () {
            this._requestImportTemplates();
        },
        _requestImportTemplates: function () {
            var requestOptions = {
                onSuccess: dojo.hitch(this, function (templates) {
                    importManagerUtility.setDomNodeVisible(this.divLoadingMessage, false);
                    this._loadImportTemplates(templates);
                })
            };
            importManagerUtility.requestImportTemplates(requestOptions);
        },
        _loadImportTemplates: function (templates) {
            this.templatesGrd = new Grid({
                classNames: "dgrid-autoheight dgrid-no-data",
                store: new memory({ data: templates, idProperty: "$key" }),
                columns: {
                    Delete: {
                        label: ' ',
                        field: 'deletelink',
                        renderCell: dLang.hitch(this, function (object, value, node) {
                            var link = document.createElement('a');
                            link.style.cursor = "pointer";
                            var linkText = document.createTextNode(nlsResources.colDelete);
                            link.appendChild(linkText);
                            link.title = nlsResources.colDelete;
                            link.onclick = dLang.hitch(this, function () {
                                this._removeImportTemplate(object.$key);
                                this._deleteImportTemplate(object.$key);
                            });
                            node.appendChild(link);
                        }),
                        sortable: false
                    },
                    TemplateName: nlsResources.colDescription,
                    EntityName: nlsResources.colEntityName,
                    CreateUser: {
                        label: nlsResources.colCreatedBy,
                        get: function (data) {
                            var user = importManagerUtility.getUserName(data.CreateUser);
                            if (user) {
                                return user.$descriptor;
                            }
                            return "";
                        }
                    },
                    CreateDate: {
                        label: nlsResources.colCreatedDate,
                        get: function (data) {
                            return importManagerUtility.formatDate(data.CreateDate);
                        }
                    },
                    ModifyUser: {
                        label: nlsResources.colModifiedBy,
                        get: function (data) {
                            if (data.ModifyUser !== null) {
                                var user = importManagerUtility.getUserName(data.ModifyUser);
                                if (user) {
                                    return user.$descriptor;
                                }
                            }
                            return "";
                        }
                    },
                    ModifyDate: {
                        label: nlsResources.colModifiedDate,
                        get: function (data) {
                            return importManagerUtility.formatDate(data.ModifyDate);
                        }
                    }
                },
                loadingMessage: this.gridLoading_Caption,
                noDataMessage: this.gridNoResults_Caption,
                placeHolder: this.templatesGrid,
                columnHiding: true,
                columnResizing: true,
                columnReordering: true,
                selectionMode: 'single',
                rowSelection: true
            });
        },
        _removeImportTemplate: function (templateId) {
            if (this.templatesGrd) {
                this.templatesGrd.store.remove(templateId);
                this.templatesGrd.refresh();
            }
        },
        _deleteImportTemplate: function (templateId) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("importTemplates");
            request.setResourceSelector(dString.substitute("'${0}'", [templateId]));
            request['delete']({}, {
                scope: this,
                failure: function (error) {
                    dialogs.showError(dString.substitute(nlsResources.errorDeletingTemplate, [error]));
                }
            });
        },
        _btnSave_OnClick: function () {
            if (this._isValid()) {
                this.importOptions.templateName = this.txtTemplateDescription.get("value");
                this.saveImportJobTemplate(this.getTemplateConfigurationOptions(true));
                this._dialog.hide();
            }
        },
        _isValid: function () {
            var returnValue = true;
            if (this.txtTemplateDescription.value === "") {
                returnValue = false;
            }
            return returnValue;
        },

        preformValidation: function (successfulCallback,failedCallback)
        {
            var msg = "";
            dojo.addClass(this.errorInvalidDescription, "display-none");
            if (this.txtTemplateDescription.value === "") {
                msg = nlsResources.errorNoTemplateDescription;
                dojo.removeClass(this.errorInvalidDescription, "display-none");
                this.spanValidationMessage.innerHTML = utility.htmlEncode(msg);
            }
            importManagerUtility.setDomNodeVisible(this.divValidationMessage, (msg !== ""));
            if (msg === "")
            {
                successfulCallback();
            }
            else
            {
                failedCallback();
            }
        },
        _btnCancel_OnClick: function () {
            this._dialog.hide();
        }
    });
    return manageImportTemplate;
});