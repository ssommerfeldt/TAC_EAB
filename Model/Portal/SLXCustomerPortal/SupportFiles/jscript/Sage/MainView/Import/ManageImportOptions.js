require({cache:{
'url:Sage/MainView/Import/templates/ManageImportOptions.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"{%= $._nlsResources.dlgManageImportOptions_Title %}\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"width: 625px\">\r\n        <div data-dojo-type=\"dijit.form.Form\">\r\n            <div data-dojo-attach-point=\"divImportType\" class=\"crystalParameterContainer display-none\">\r\n                <table cellspacing=\"10\">\r\n                    <tr>\r\n                        <td>\r\n                            <label class=\"wizardHeaderText\">{%= $._nlsResources.lstImportType_Caption %}</label>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>\r\n                            <div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-attach-point=\"importType_Container\">\r\n                                <select data-dojo-type=\"dijit.form.Select\" data-dojo-attach-point=\"cmbImportTypes\" sortByLabel=\"false\" style=\"width:200px\" data-dojo-attach-event=\"onChange:_cmbImportTypes_OnChange\">\r\n                                    <option value=\"insert\" selected=\"selected\">{%= $._nlsResources.lstImportOption_Insert %}</option>\r\n                                    <option value=\"update\">{%= $._nlsResources.lstImportOption_Update %}</option>\r\n                                    <option value=\"insertAndUpdate\">{%= $._nlsResources.lstImportOption_InsertUpdate %}</option>\r\n                                </select>\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>\r\n                            <label data-dojo-attach-point=\"lblImportOption\"></label>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n            <br/>   \r\n            <div data-dojo-attach-point=\"divAssociations\" class=\"crystalParameterContainer\">\r\n                <label class=\"wizardHeaderText\">{%= $._nlsResources.txtMatchHeader_Caption %}</label>\r\n                <div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-attach-point=\"associations_Container\" style=\"padding-left:10px\"></div>\r\n            </div>\r\n            <br/>\r\n            <div class=\"crystalParameterContainer\">\r\n                <label class=\"wizardHeaderText\">{%= $._nlsResources.txtOptionsHeader_Caption %}</label>\r\n                <table cellspacing=\"10\">\r\n                    <tr data-dojo-attach-point=\"rowDefaultOwner\">\r\n                        <td>\r\n                            <label>{%= $._nlsResources.defaultOwner_Caption %}</label>\r\n                        </td>\r\n                        <td>\r\n                            <div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-attach-point=\"defaultOwner_Container\"\r\n                                 allowclearingresult=\"false\" style=\"width:200px\"></div>\r\n                            <span data-dojo-attach-point=\"errorNoOwner\" class=\"display-none\" style=\"color:red\">*</span>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td colspan=\"2\">\r\n                            <div data-dojo-attach-point=\"chkAccountNameControlNode\">\r\n                                <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkAccountName\" data-dojo-attach-event=\"onChange:_chkAccountName_OnChange\" checked=\"checked\" />\r\n                                <label> {%= $._nlsResources.chkAccountName %}</label>\r\n                            </div>\r\n                        </td>\r\n                    </tr>\r\n                    <tr data-dojo-attach-point=\"rowCreateAdHoc\">\r\n                        <td colspan=\"2\">\r\n                            <input data-dojo-type=\"dijit.form.RadioButton\" type=\"radio\" name=\"adHocGroupOption\" value=\"createAdHoc\"\r\n                                   data-dojo-attach-point=\"rdoCreateAdHoc\" /> {%= $._nlsResources.createAdHoc_Caption %}\r\n                        </td>\r\n                    </tr>\r\n                    <tr data-dojo-attach-point=\"rowAdHocGroupName\">\r\n                        <td colspan=\"2\" style=\"padding-left: 20px\">\r\n                            <input data-dojo-type=\"dijit.form.TextBox\" data-dojo-attach-point=\"txtAdHocGroupName\" style=\"width:200px\"  />\r\n                            <span data-dojo-attach-point=\"errorNoAddHocGroupName\" class=\"display-none\" style=\"color:red\">*</span>\r\n                        </td>\r\n                    </tr>\r\n                    <tr data-dojo-attach-point=\"rowAdHocGroupOption\">\r\n                        <td colspan=\"2\">\r\n                            <input data-dojo-type=\"dijit.form.RadioButton\" type=\"radio\" name=\"adHocGroupOption\" value=\"existingAdHoc\"\r\n                                   data-dojo-attach-point=\"rdoExistingAdHoc\" /> {%= $._nlsResources.existingAdHoc_Caption %}\r\n                        </td>\r\n                    </tr>\r\n                    <tr data-dojo-attach-point=\"rowAdHocGroups\">\r\n                        <td colspan=\"2\" style=\"padding-left: 12px\">\r\n                            <div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-attach-point=\"adHocGroups_Container\"></div>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n            <br />\r\n            <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\">\r\n                <span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>\r\n            </div>\r\n            <div align=\"right\" style=\"margin-top:10px\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\" >{%= Sage.Utility.htmlEncode($.btnBack_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">{%= Sage.Utility.htmlEncode($.btnNext_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($.btnCancel_Caption) %}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/Import/ManageImportOptions", [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'dijit/registry',
    'dojo/dom-class',
    'dojo/store/Memory',
    'dojo/dom-construct',
    'dojo/_base/lang',
    'Sage/MainView/Import/_WizardDialogBase',
    'dojo/text!./templates/ManageImportOptions.html',
    'dojo/i18n!./nls/ManageImportOptions',
    'Sage/MainView/Import/ImportManagerUtility',
    'Sage/Utility',
    'Sage/UI/Controls/Lookup',
    'dijit/form/FilteringSelect',
    'dojox/layout/TableContainer',
    'Sage/Data/SDataServiceRegistry'
],
function (
    declare,
    dArray,
    dString,
    dRegistry,
    domClass,
    dMemory,
    domConstruct,
    lang,
    wizardDialogBase,
    template,
    nlsResources,
    importManagerUtility,
    utility,
    lookup,
    filteringSelect,
    tableContainer,
    sDataServiceRegistry
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var manageImportOptions = declare('Sage.MainView.Import.ManageDuplicates', [wizardDialogBase], {
        id: 'dlgManageImportOptions',
        widgetTemplate: widgetTemplate,
        _nlsResources: nlsResources,
        _currentStep: importManagerUtility.importWizardStep.ManageImportOptions,
        constructor: function () {
            this.inherited(arguments);
        },
        startup: function () {
            importManagerUtility.setDomNodeVisible(this.divAssociations, this.importOptions.matchOptions && this.importOptions.matchOptions.length > 0);
            this._loadMatchOptions();
            this._initializeDefaultOwner();
            this._assignDefaultValues();
        },
        show: function () {
            importManagerUtility.setDomNodeVisible(this.divValidationMessage, false);
            dArray.forEach(this.importOptions.matchOptions, function (association) {
                var error = dRegistry.byId(dString.substitute("${0}_ErrorTag", [association.name]));
                if (error) {
                    importManagerUtility.setDomNodeVisible(error, false);
                }
            });
            if (this.importOptions.importEntity != "Contact") {
                importManagerUtility.setDomNodeVisible(this.chkAccountNameControlNode, false);
                this.importOptions.buildSecondaryAccountName = false;
            }
            else {
                importManagerUtility.setDomNodeVisible(this.chkAccountNameControlNode, true);
                this.importOptions.buildSecondaryAccountName = true;
                this.chkAccountName.set("checked", this.importOptions.buildSecondaryAccountName);
            }
            this.inherited(arguments);
        },
        preformValidation: function (successfulCallback,failedCallback)
        {
            var msg = '';
            domClass.add(this.errorNoAddHocGroupName, 'display-none');
            domClass.add(this.errorNoOwner, 'display-none');
            if (this.rdoCreateAdHoc.checked)
                {
                if (this.txtAdHocGroupName.value === '') {
                        //the new group name is required
                        msg = nlsResources.errorNoAddHocGroupName;
                        domClass.remove(this.errorNoAddHocGroupName, 'display-none');
                        this.spanValidationMessage.innerHTML = utility.htmlEncode(msg);
                        importManagerUtility.setDomNodeVisible(this.divValidationMessage, (msg !== ""));
                        this._updateImportOptions();
                        failedCallback();
                    }
                    else
                    {
                        //check the name to see that it is not already in use   
                        var store = new Sage.Data.BaseSDataStore({
                            service: sDataServiceRegistry.getSDataService('system'),
                            resourceKind: 'groups',
                            include: [],
                            select: ['name', 'family', 'isHidden', 'isAdHoc', 'mainTable', 'keyField', 'entityName'],
                            where: 'name eq ' + this.txtAdHocGroupName.value
                        });

                        Sage.Groups._groupContext.CurrentFamily = Sage.Groups._groupContext.CurrentFamily.toUpperCase();
                        var queryStr = dojo.string.substitute("upper(family) eq '${CurrentFamily}'", Sage.Groups._groupContext) + " and name eq '" + this.txtAdHocGroupName.value+"'";
                        store.fetch({
                            query: queryStr,
                            count: 1000,
                            sort: [{ attribute: 'name' }],
                            start: 0,
                            onComplete: function (data) {
                                if (data.length > 0) {
                                    msg = nlsResources.errorDuplicateAddHocGroupName;
                                    domClass.remove(this.errorNoAddHocGroupName, 'display-none');
                                    this.spanValidationMessage.innerHTML = utility.htmlEncode(msg);
                                    importManagerUtility.setDomNodeVisible(this.divValidationMessage, (msg !== ""));
                                    this._updateImportOptions();
                                    failedCallback();
                                }
                                else
                                {
                                    importManagerUtility.setDomNodeVisible(this.divValidationMessage, (msg !== ""));
                                    this._updateImportOptions();
                                    successfulCallback();
                                }
                            },
                            scope: this
                        });
                    }
            }
            else if (this.lueDefaultOwner && !this.lueDefaultOwner.selectedObject) {
                msg = nlsResources.errorNoOwner;
                domClass.remove(this.errorNoOwner, 'display-none');
                this.spanValidationMessage.innerHTML = utility.htmlEncode(msg);
                importManagerUtility.setDomNodeVisible(this.divValidationMessage, (msg !== ""));
                this._updateImportOptions();
                failedCallback();
            }
            else
            {
                importManagerUtility.setDomNodeVisible(this.divValidationMessage, (msg !== ""));
                this._updateImportOptions();
                successfulCallback();
            }
        },
        destroy: function () {
            this.associations_Container.destroyRecursive();
            if (this.lueDefaultOwner) {
                this.lueDefaultOwner.destroy();
            }
            this.inherited(arguments);
        },
        _loadMatchOptions: function () {
            dArray.forEach(this.importOptions.matchOptions, lang.hitch(this, function (association) {
                this._addMatchOption(association);
            }));
        },
        _addMatchOption: function (item) {
            var layout = new tableContainer({
                showLabels: true,
                orientation: "horiz",
                labelWidth: "",
                customClass: "ManageImportOptions",
                style: "display:inline-block;padding-right:25px"
            });
            var associationItem = new filteringSelect({
                id: dString.substitute("${0}_Association", [item.name]),
                store: new dMemory({ data: item.properties, idProperty: "name" }),
                maxHeight: 150,
                searchAttr: "displayName",
                labelAttr: "displayName",
                placeHolder: this.selectOption_Caption,
                required: false,
                title: dString.substitute("${0} ${1}", [item.displayName, nlsResources.match_Caption])
            });
            var defaultValue = this._getDefaultValue(item);
            if (defaultValue) {
                associationItem.attr('value', defaultValue);
            }
            var errorTag = new domConstruct.create('span', {
                id: dString.substitute("${0}_ErrorTag", [item.name]),
                style: "color: red;padding:25px 25px;",
                innerHTML: "*",
                "class": "display-none"
            });
            layout.addChild(associationItem);
            this.associations_Container.addChild(layout);
            this.associations_Container.containerNode.appendChild(errorTag);
        },
        _getDefaultValue: function (item) {
            switch (item.name) {
                case "Account":
                    return !this.importOptions.importTemplateId && !item.selectedValue ? "AccountName" : item.selectedValue;
                case "Contact":
                    return !this.importOptions.importTemplateId && !item.selectedValue ? "Email" : item.selectedValue;
            }
            return item.selectedValue;
        },
        _ensureOwnerProperty: function () {
            var target = this.importOptions.targetList.get("Owner");
            var returnValue = false;
            if (target && target.visableToUsers) {
                returnValue = true;
            }
            importManagerUtility.setDomNodeVisible(this.rowDefaultOwner, returnValue);
            return returnValue;
        },
        _initializeDefaultOwner: function () {
            if (this._ensureOwnerProperty()) {
                this.defaultOwnerLookupConfig = {
                    id: '_defaultOwner',
                    structure: [
                        {
                            label: nlsResources.lookupDescriptionColText,
                            field: 'Description'
                        }, {
                            label: nlsResources.lookupTypeColText,
                            field: 'Type'
                        }
                    ],
                    gridOptions: {
                        contextualCondition: '',
                        contextualShow: '',
                        selectionMode: 'single'
                    },
                    storeOptions: { resourceKind: 'ownerViews', sort: [{ attribute: 'Description' }] },
                    isModal: true,
                    initialLookup: true,
                    preFilters: [],
                    returnPrimaryKey: true,
                    dialogTitle: nlsResources.lookupDefaultOwner_Caption,
                    dialogButtonText: this.btnOK_Caption
                };
                this.lueDefaultOwner = new lookup({
                    id: 'lu_DefaultOwner',
                    config: this.defaultOwnerLookupConfig,
                    allowClearingResult: true,
                    style: 'width:100%'
                });
                domConstruct.place(this.lueDefaultOwner.domNode, this.defaultOwner_Container.domNode, 'only');
            }
        },
        _assignDefaultValues: function () {
            importManagerUtility.getOwner(this.importOptions.defaultOwnerId, this.lueDefaultOwner);
            this.lblImportOption.textContent = nlsResources.txtOption_Insert;
            this._initializeAdHocGroups();
        },
        _initializeAdHocGroups: function () {
            if (!this.adHocGroups) {
                var svc = Sage.Services.getService('ClientGroupContext');
                svc.getAdHocGroupList(function (list) {
                    this.adHocGroups = new filteringSelect({
                        store: new dMemory({ data: list, idProperty: "$key" }),
                        maxHeight: 150,
                        searchAttr: "name",
                        labelAttr: "name",
                        required: false,
                        placeHolder: this.selectOption_Caption
                    });
                    this.adHocGroups.startup();
                    this.adHocGroups_Container.addChild(this.adHocGroups);
                    if (this.importOptions.groupSettings) {
                        if (this.importOptions.groupSettings.id) {
                            this.rdoExistingAdHoc.set("checked", true);
                            this.adHocGroups.attr('value', this.importOptions.groupSettings.id);
                        } else if (this.importOptions.groupSettings.name) {
                            this.rdoCreateAdHoc.set("checked", true);
                            this.txtAdHocGroupName.set('value', this.importOptions.groupSettings.name);
                        }
                    }
                }, this);
            }
        },
        _updateImportOptions: function () {
            //this.importOptions.engineOptions.mode.name = this.cmbImportTypes.value; //currently hard coded in the engine to support insert only
            this.importOptions.previewDataMode = this.cmbImportTypes.attr('displayedValue');
            this.importOptions.defaultOwnerId = this.lueDefaultOwner && this.lueDefaultOwner.selectedObject ? this.lueDefaultOwner.selectedObject.$key : null;
            this.importOptions.groupSettings.name = this.rdoCreateAdHoc.checked ? this.txtAdHocGroupName.value : null;
            this.importOptions.groupSettings.id = this.rdoExistingAdHoc.checked && this.adHocGroups.value ? this.adHocGroups.value : null;
            this.importOptions.previewAdHocGroup = this.rdoExistingAdHoc.checked ? this.adHocGroups.attr('displayedValue') : this.txtAdHocGroupName.value;
            this.importOptions.selectedMatchOptions = [];
            dArray.forEach(this.importOptions.matchOptions, lang.hitch(this, function (association) {
                var option = dRegistry.byId(dString.substitute("${0}_Association", [association.name]));
                association.selectedValue = null;
                if (option) {
                    association.selectedValue = option.value;
                }
                if (option) {
                    var target = this.importOptions.importEntity;
                    var displayValue = '';
                    if (target !== association.name) {
                        displayValue = dString.substitute("${0}.${1}", [association.name, option.displayedValue]);
                    }
                    else {
                        displayValue = option.displayedValue;
                    }
                    this.importOptions.selectedMatchOptions.push({ property: option.value, entity: association.name, displayValue: displayValue });
                }
            }));
        },
        _chkAccountName_OnChange: function () {
            this.importOptions.buildSecondaryAccountName = this.chkAccountName.checked;
        },
        _cmbImportTypes_OnChange: function () {
            switch (this.cmbImportTypes.value) {
                case "insert":
                    this.lblImportOption.textContent = nlsResources.txtOption_Insert;
                    break;
                case "update":
                    this.lblImportOption.textContent = nlsResources.txtOption_Update;
                    break;
                case "insertAndUpdate":
                    this.lblImportOption.textContent = nlsResources.txtOption_InsertUpdate;
                    break;
            }
        }
    });
    return manageImportOptions;
});