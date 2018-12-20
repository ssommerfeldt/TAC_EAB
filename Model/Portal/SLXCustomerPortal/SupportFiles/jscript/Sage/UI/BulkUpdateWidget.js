require({cache:{
'url:Sage/UI/templates/BulkUpdateWidget.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"{%= $.dlgBulkActionUpdate_Title %}\" data-dojo-attach-point=\"_dialog\" class=\"bulkUpdateWidgetDialog-outer-width\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\">\r\n        <div data-dojo-type=\"dijit.form.Form\">\r\n            <div style=\"overflow:auto\">\r\n                <label class=\"wizardHeaderText\">{%= Sage.Utility.htmlEncode($.header_Caption) %}</label>\r\n            </div>\r\n            <div data-dojo-attach-point=\"divLoadingMessage\">\r\n                <br />\r\n                <label style=\"padding-left:100px;font-size:16px;font-weight:bold\"> {%= Sage.Utility.htmlEncode($.pageLoading_Caption) %}</label>\r\n            </div>\r\n            <div data-dojo-attach-point=\"propertyRowContainer\" data-dojo-type=\"dijit.layout.ContentPane\"></div>\r\n<!--            <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkScheduleJob\" data-dojo-attach-event=\"onChange:_chkScheduleJob_OnChange\" />\r\n            <label>{%= $.chkScheduleJob_Caption %}</label>-->\r\n            <div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-attach-point=\"jobScheduler_Container\" style=\"padding-left:50px\"></div>\r\n            <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\">\r\n                <span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>\r\n            </div>\r\n            <div align=\"right\" style=\"margin-top:10px\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnOk_OnClick\">{%= Sage.Utility.htmlEncode($.btnOK_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($.btnCancel_Caption) %}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/BulkUpdateWidget", [
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/registry',
    'dijit/form/TextBox',
    'dijit/form/SimpleTextarea',
    'dojo/query',
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'dojo/on',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/_base/lang',
    'dojo/store/Memory',
    'dojo/dom-construct',
    'Sage/MainView/Import/_WizardDialogBase',
    'dojo/text!./templates/BulkUpdateWidget.html',
    'dojo/i18n!./nls/BulkUpdateWidget',
    'Sage/Utility',
    'Sage/UI/Dialogs',
    'Sage/Data/SDataServiceRegistry',
    'Sage/UI/FilteringSelect',
    'Sage/UI/Controls/Lookup',
    'Sage/UI/JobSchedulingWidget',
    'Sage/UI/Controls/Currency',
    'Sage/UI/Controls/DateTimePicker',
    'Sage/UI/Controls/Numeric',
    'Sage/UI/Controls/SingleSelectPickList',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'Sage/UI/ImageButton',
    'Sage/Utility/Jobs'
],
function (
    _Widget,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    registry,
    TextBox,
    SimpleTextArea,
    query,
    declare,
    dArray,
    dString,
    dOn,
    dDom,
    domClass,
    lang,
    Memory,
    domConstruct,
    _WizardDialogBase,
    template,
    nlsResources,
    utility,
    dialogs,
    sDataServiceRegistry,
    FilteringSelect,
    Lookup,
    JobSchedulingWidget,
    Currency,
    DateTimePicker,
    Numeric,
    SingleSelectPickList,
    _DialogHelpIconMixin,
    ImageButton,
    jobs
) {
    var __widgetTemplate = utility.makeTemplateFromString(template);
    var bulkUpdateWidget = declare('Sage.UI.BulkUpdateWidget', [_WizardDialogBase, _WidgetsInTemplateMixin], {
        id: "dlgBulkUpdateWidget",
        _dialog: false,
        widgetTemplate: __widgetTemplate,
        _nlsResources: nlsResources,
        updateableProps: [],
        currentSelectedRowIndex: 0,
        _helpIconTopic: "BulkAction",
        propertyTemplate: new Simplate([
            '<div>',
                '<div orientation="horiz" data-dojo-type="dojox.layout.TableContainer" id="propertyRow_{%= $.index %}" class="propertyRows">',
                    '<div style="display:flex">',
                    '<div style=float:left;" class="bulkUpdateWidgetDialog-inner-width">',
                        '<table>',
                            '<tr>',
                                '<td style="width:32%">',
                                    '<div label="{%= $.update_Property_Caption %}" id="propertiesContainer_{%= $.index %}" data-dojo-type="dijit/layout/ContentPane"></div>',
                                '</td>',
                                '<td id="optionlblContainer_{%= $.index %}" class="display-none">',
                                    '<label id="optionCaption_{%= $.index %}">{%= $.update_To_Caption %}</label>',
                                '</td>',
                                '<td>',
                                    '<div data-dojo-type="dojox.layout.TableContainer" id="booleanContainer_{%= $.index %}" orientation="horiz" cols="2" class="display-none">',
                                        '<label>{%= $.yes_Caption %}</label>',
                                        '<input data-dojo-type="dijit/form/RadioButton" type="radio" name="rdgrpBooleanOption_{%= $.index %}" value="yesOption"',
                                            'id="rdoYesOption_{%= $.index %}" checked="checked" style="width: 50px" />',
                                        '<label>{%= $.no_Caption %}</label>',
                                        '<input data-dojo-type="dijit/form/RadioButton" type="radio" name="rdgrpBooleanOption_{%= $.index %}" value="noOption"',
                                            'id="rdoNoOption_{%= $.index %}" style="width: 50px" />',
                                    '</div>',
                                    '<div data-dojo-type="dojox.layout.TableContainer" orientation="horiz" cols="2" id="dateContainer_{%= $.index %}" class="display-none">',
                                        '<label style="padding-right:5px">{%= $.moveTo_Caption %}</label>',
                                        '<input data-dojo-type="dijit/form/RadioButton" type="radio" name="rdgrpDateOption_{%= $.index %}" value="toDateOption" checked="checked"',
                                            'id="rdoToDateOption_{%= $.index %}" onchange="dijit.byId(\'{%= $.id %}\')._onDateTypeChange({%= $.index %}, \'date\');" style="width: 60px" />',
                                        '<label>{%= $.moveOut_Caption %}</label>',
                                        '<input data-dojo-type="dijit/form/RadioButton" type="radio" name="rdgrpDateOption_{%= $.index %}" value="moveDaysOption"',
                                            'id="rdoMoveDaysOption_{%= $.index %}" onchange="dijit.byId(\'{%= $.id %}\')._onDateTypeChange({%= $.index %}, \'date\');" style="width: 60px" />',
                                    '</div>',
                                    '<div id="slxControlContainer_{%= $.index %}" class="display-none"></div>',
                                '</td>',
                                '<td>',
                                    '<div id="calendarContainer_{%= $.index %}" class="display-none"></div>',
                                    '<div id="moveDaysContainer_{%= $.index %}" class="display-none"></div>',
                                '</td>',
                                '<td>',
                                    '<span id="numberOfDaysContainer_{%= $.index %}" class="display-none"></span>&nbsp&nbsp',
                                    '<label id="numberOfDaysLabel_{%= $.index %}" class="display-none">{%= $.days_Caption %}</label>',
                                '</td>',
                            '</tr>',
                        '</table>',
                        '</div>',
                        '<div id="propertyRowButton_{%= $.index %}" style="padding-top:5px"></div>',
                        '<span id="errorNoSelectedProp_{%= $.index %}" style="color:red;padding-top:15px" class="display-none">*</span>',
                    '</div>',
                '</div>',
            '</div>'
        ]),
        hideImageUrl: 'images/icons/Find_Remove_16x16.gif',
        addImageUrl: 'images/icons/Find_Add_16x16.gif',
        dataType: {
            Boolean: 'boolean',
            Binary: 'binary',
            Currency: 'currency',
            Date: 'date',
            Decimal: 'decimal',
            Enum: 'enum',
            Key: 'key',
            Numeric: 'numeric',
            Owner: 'owner',
            Picklist: 'picklist',
            String: 'string',
            Unknown: 'unknown',
            Invalid: 'invalid',
            User: 'user'
        },
        moveActionDateType: {
            Forward: 'Forward',
            Backward: 'Backward'
        },
        controlTypeName: {
            Currency: 'currencyControl',
            Date: 'dateControl',
            Lookup: 'lookupControl',
            Number: 'numericControl',
            Picklist: 'picklistControl',
            Standard: 'standardControl',
            NumberOfDays: 'numberOfDays'
        },
        picklistStorageMode: {
            Text: 'text',
            Id: 'id',
            Code: 'code',
            Number: 'number'
        },
        constructor: function (options) {
            lang.mixin(this, nlsResources);
            lang.mixin(this, options);
            this.updateableProps = [];
            this._requestUpdateableProperties();
            this.inherited(arguments);
        },
        show: function () {
            this.index = 0;
            this._setDisplayMode(this.divLoadingMessage, true);
            if (this._helpIconTopic) {
                if (!this._dialog.helpIcon) {
                    lang.mixin(this._dialog, new _DialogHelpIconMixin());
                    this._dialog.createHelpIconByTopic(this._helpIconTopic);
                }
            }
            this.inherited(arguments);
        },
        destroy: function () {
            if (this.jobSchedulingWidget) {
                this.jobSchedulingWidget.destroyWidget();
            }
            this.propertyRowContainer.destroyRecursive();
            this.inherited(arguments);
        },
        _requestUpdateableProperties: function () {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(sDataServiceRegistry.getSDataService('metadata'));
            request.setResourceKind(dString.substitute("entities('${0}')/properties", [this.currentEntityPrettyName]));
            request.setQueryArg("select", "bulkAction/*,displayName,dataTypeId,dataTypeData,propertyName");
            request.setQueryArg("where", "bulkAction.canBulkUpdate");
            request.read({
                success: lang.hitch(this, function (result) {
                    if (result) {
                        this.properties = result.$resources;
                        this._requestRelationshipProperties();
                        this._requestExtensionEntities();
                        if (this.properties.length === 0) {
                            dialogs.showInfo(dString.substitute(this.header_NoPropertiesEnabled, [this.currentEntityPrettyName]));
                            this._close();
                        }
                    }
                }),
                failure: function (result) {
                    dialogs.showError(dString.substitute(this.errorRequestPropertyOptions, [this.currentEntityPrettyName, result]));
                }
            });
        },
        _requestRelationshipProperties: function () {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(sDataServiceRegistry.getSDataService('metadata'));
            request.setResourceKind("relationships");
            request.setQueryArg("select", "bulkAction/*,childEntity/$key,parentProperty/displayName,parentProperty/propertyName,parentEntity/$key,childProperty/displayName,childProperty/propertyName,childProperty/isIncluded");
            request.setQueryArg("where", dString.substitute("parentEntity.name eq '${0}' and bulkAction.canBulkUpdate or childEntity.name eq '${0}' and bulkAction.canBulkUpdate", [this.currentEntityPrettyName]));
            request.read({
                success: lang.hitch(this, function (result) {
                    if (result) {
                        dArray.forEach(result.$resources, lang.hitch(this, function (relationship) {
                            if (relationship.childEntity.$key === this.currentEntityPrettyName) {
                                if (relationship.childProperty.isIncluded) {
                                    this.properties.push(
                                    {
                                        $key: relationship.$key,
                                        displayName: relationship.childProperty.displayName ? relationship.childProperty.displayName : relationship.childProperty.propertyName,
                                        propertyName: relationship.childProperty.propertyName,
                                        dataTypeId: relationship.parentEntity.$key
                                    });
                                }
                            } else {
                                this.properties.push(
                                {
                                    $key: relationship.$key,
                                    displayName: relationship.parentProperty.displayName ? relationship.parentProperty.displayName : relationship.parentProperty.propertyName,
                                    propertyName: relationship.parentProperty.propertyName,
                                    dataTypeId: relationship.childEntity.$key
                                });
                            }
                        }));
                    }
                }),
                failure: function (result) {
                    dialogs.showError(dString.substitute(this.errorRequestPropertyOptions, [this.currentEntityPrettyName, result]));
                }
            });
        },
        _requestExtensionEntities: function () {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(sDataServiceRegistry.getSDataService('metadata'));
            request.setResourceKind("entities");
            request.setQueryArg("include", "properties,properties/bulkAction");
            request.setQueryArg("where", "isExtension");
            request.read({
                success: lang.hitch(this, function (result) {
                    if (result) {
                        dArray.forEach(result.$resources, lang.hitch(this, function (entity) {
                            if (entity.extendedEntity.$key === this.currentEntityPrettyName) {
                                dArray.forEach(entity.properties.$resources, lang.hitch(this, function (property) {
                                    if (property.bulkAction.canBulkUpdate) {
                                        var entensionEntity = entity.$key;
                                        var propToStore = property;
                                        propToStore.$key = property.id;
                                        propToStore.propertyName = entensionEntity +"."+ property.propertyName;
                                        this.properties.push(propToStore);
                                    }
                                }));
                            }
                        }));
                    }
                    this._addPropertyRow();
                }),
                failure: function (result) {
                    dialogs.showError(dString.substitute(this.errorRequestPropertyOptions, [this.currentEntityPrettyName, result]));
                }
            });

        },
        _addPropertyRow: function () {
            this.index++;
            var newRow = this.propertyTemplate.apply(this);
            domConstruct.place(newRow, this.propertyRowContainer.domNode);
            this._addPropertyList();
            this._setDisplayMode(this.divLoadingMessage, false);
            if (this.index !== 1) {
                this._renderRowButton(this.index);
            }
        },
        _addPropertyList: function () {
            var self = this;
            this._clearControlState("updateProperty", this.index);
            var updateableProps = new FilteringSelect({
                id: dString.substitute("updateProperty_${0}", [this.index]),
                store: new Memory({ data: this.properties, idProperty: "$key" }),
                maxHeight: 150,
                searchAttr: "displayName",
                labelAttr: "displayName",
                placeHolder: this.selectOption_Caption,
                required: this.index === 1,
                title: this.update_Property_Caption,
                propertyRowIndex: this.index,
                onChange: function (dataTypeId) {
                    var selectedProperty = null;
                    self.currentSelectedRowIndex = this.propertyRowIndex;
                    dArray.some(self.properties, function (property) {
                        if (property.$key === dataTypeId) {
                            selectedProperty = property;
                            return true;
                        }
                        return false;
                    });
                    self._renderControls(selectedProperty);
                },
                fetchProperties: { sort: [{ attribute: "displayName", descending: false }] }
            });
            var propertyContainer = dDom.byId(dString.substitute('propertiesContainer_${0}', [this.index]));
            propertyContainer.appendChild(updateableProps.domNode);
        },
        _removePropertyRow: function (index) {
            this.index--;
            var control = registry.byId(dString.substitute("updateProperty_${0}", [index]));
            if (control) {
                control.destroy();
            }
            query(dDom.byId(["propertyRow_", index].join(''))).orphan();
            this._setDisplayMode(this.divValidationMessage, (false));
        },
        _renderControls: function (property) {
            var control;
            var isDuplicate = false;
            var prop = this._resolveDataType(property.dataTypeId);
            this._clearRowControl();
            var container = dDom.byId(dString.substitute("slxControlContainer_${0}", [this.currentSelectedRowIndex]));
            dDom.byId(dString.substitute('optionlblContainer_${0}', [this.currentSelectedRowIndex])).textContent = this.update_To_Caption;
            var propertyRows = query(".propertyRows");
            for (var i = 0; i < propertyRows.length; i++) {
                var rowIndex = i + 1;
                if (rowIndex !== this.currentSelectedRowIndex) {
                    var p = this._getPropertySelectionValue(rowIndex);
                    if (p.propertyName === property.propertyName) {
                        dDom.byId(dString.substitute('optionlblContainer_${0}', [this.currentSelectedRowIndex])).textContent = dString.substitute(this.errorDuplicateValue, [prop.name]);
                        isDuplicate = true;
                    }
                }
            }
            if (!isDuplicate) {
                switch (prop.type) {
                    case this.dataType.Binary:
                        control = new SimpleTextArea({
                            id: dString.substitute("${0}_${1}", [this.controlTypeName.Standard, this.currentSelectedRowIndex]),
                            style: "width:100%"
                        });
                        container.style.paddingLeft = "8px";
                        break;
                    case this.dataType.Currency:
                        control = new Currency({
                            id: dString.substitute("${0}_${1}", [this.controlTypeName.Standard, this.currentSelectedRowIndex]),
                            constraints: { places: 2, currency: "USD", locale: this.locale },
                            "class": "textcontrol currency"
                        });
                        break;
                    case this.dataType.Date:
                        this._createDateControls();
                        break;
                    case this.dataType.Decimal:
                    case this.dataType.Numeric:
                        control = prop.type === this.dataType.Decimal ? new Numeric({
                            id: dString.substitute("${0}_${1}", [this.controlTypeName.Standard, this.currentSelectedRowIndex]),
                            constraints: { places: 2 }
                        }) : new Numeric({
                            id: dString.substitute("${0}_${1}", [this.controlTypeName.Standard, this.currentSelectedRowIndex]),
                            formatType: "Number"
                        });
                        break;
                    case this.dataType.Enum:
                        var enumOptions = JSON.parse(property.dataTypeData);
                        control = new FilteringSelect({
                            id: dString.substitute("${0}_${1}", [this.controlTypeName.Standard, this.currentSelectedRowIndex]),
                            store: new Memory({ data: enumOptions.Items, idProperty: "Value" }),
                            maxHeight: 150,
                            searchAttr: "Name",
                            labelAttr: "Name",
                            placeHolder: this.selectOption_Caption,
                            required: true
                        });
                        break;
                    case this.dataType.Picklist:
                        var picklistOptions = JSON.parse(property.dataTypeData);
                        control = new SingleSelectPickList({
                            id: dString.substitute("${0}_${1}", [this.controlTypeName.Picklist, this.currentSelectedRowIndex]),
                            pickListName: picklistOptions.PickListName,
                            canEditText: false,
                            itemMustExist: !!picklistOptions.MustExistInList && picklistOptions.MustExistInList,
                            storeMode: this._getStorageMode(picklistOptions.Storage)
                        });
                        container.style.paddingLeft = "8px";
                        break;
                    case this.dataType.String:
                        control = new TextBox({
                            id: dString.substitute("${0}_${1}", [this.controlTypeName.Standard, this.currentSelectedRowIndex])
                        });
                        break;
                    case this.dataType.Owner:
                    case this.dataType.User:
                        control = prop.type === this.dataType.User ? this._createUserLookup() : this._createOwnerLookup();
                        break;
                    case this.dataType.Invalid:
                    case this.dataType.Unknown:
                        if (container.childNodes.length > 0) {
                            container.removeChild(container.childNodes[0]);
                        }
                        dDom.byId(dString.substitute('optionlblContainer_${0}', [this.currentSelectedRowIndex])).textContent = dString.substitute(this.errorInvalidPropertyType, [prop.name]);
                        break;
                }
            }
            if (control) {
                control.startup();
                domConstruct.place(control.domNode, container, "only");
            }
            if (this.currentSelectedRowIndex === 1) {
                this._renderRowButton(this.currentSelectedRowIndex);
            }
            this._onPropertyChanged(prop.type, isDuplicate);
        },
        _clearRowControl: function () {
            this._clearControlState(this.controlTypeName.Standard, this.currentSelectedRowIndex);
            this._clearControlState(this.controlTypeName.Picklist, this.currentSelectedRowIndex);
            this._clearControlState(this.controlTypeName.Lookup, this.currentSelectedRowIndex);
        },
        _getStorageMode: function (storageMode) {
            switch (storageMode.toLowerCase()) {
                case this.picklistStorageMode.Code:
                    return this.picklistStorageMode.Code;
                case this.picklistStorageMode.Id:
                    return this.picklistStorageMode.Id;
                case this.picklistStorageMode.Number:
                    return this.picklistStorageMode.Number;
                default:
                    return this.picklistStorageMode.Text;
            }
        },
        _createDateControls: function () {
            this._clearControlState(this.controlTypeName.Date, this.currentSelectedRowIndex);
            var control = new DateTimePicker({
                id: dString.substitute("${0}_${1}", [this.controlTypeName.Date, this.currentSelectedRowIndex]),
                displayDate: true,
                displayTime: false
            });
            control.startup();
            var container = dDom.byId(dString.substitute("calendarContainer_${0}", [this.currentSelectedRowIndex]));
            domConstruct.place(control.domNode, container, "only");
            this._clearControlState(this.controlTypeName.NumberOfDays, this.currentSelectedRowIndex);
            var numberOfDays = new TextBox({
                id: dString.substitute("${0}_${1}", [this.controlTypeName.NumberOfDays, this.currentSelectedRowIndex]),
                style: "width:50px"
            });
            dOn(numberOfDays, "keypress", lang.hitch(this, function (evt) {
                this._onKeyPress(evt);
            }));
            var daysContainer = dDom.byId(dString.substitute("numberOfDaysContainer_${0}", [this.currentSelectedRowIndex]));
            domConstruct.place(numberOfDays.domNode, daysContainer, "only");
        },
        _clearControlState: function (controlName, rowIndex) {
            var control = registry.byId(dString.substitute('${0}_${1}', [controlName, rowIndex]));
            if (control) {
                control.destroy();
            }
        },
        _onPropertyChanged: function (propertyType, isDuplicate) {
            this._setDisplayMode(dDom.byId(dString.substitute('booleanContainer_${0}', [this.currentSelectedRowIndex])), propertyType === this.dataType.Boolean && !isDuplicate);
            this._setDisplayMode(dDom.byId(dString.substitute('optionlblContainer_${0}', [this.currentSelectedRowIndex])), propertyType !== this.dataType.Date || isDuplicate);
            this._setDisplayMode(dDom.byId(dString.substitute('dateContainer_${0}', [this.currentSelectedRowIndex])), propertyType === this.dataType.Date && !isDuplicate);
            this._setDisplayMode(dDom.byId(dString.substitute('slxControlContainer_${0}', [this.currentSelectedRowIndex])), this._isSlxControlType(propertyType));
            this._setDisplayMode(dDom.byId(dString.substitute('addCondition_${0}', [this.currentSelectedRowIndex])), true);
            this._onDateTypeChange(this.currentSelectedRowIndex, propertyType);
        },
        _renderRowButton: function (index) {
            var button;
            if (index === 1) {
                this._clearControlState("addRowButton", [index]);
                button = new ImageButton({
                    id: dString.substitute("addRowButton_${0}", [index]),
                    icon: this.addImageUrl,
                    'class': 'groupMenuButton',
                    tooltip: this.addProperty_Tooltip,
                    style: "cursor:pointer;padding:0px 5px;",
                    onClick: lang.hitch(this, function () {
                        this._addPropertyRow();
                    })
                });
            } else {
                this._clearControlState("removeRowButton", [index]);
                button = new ImageButton({
                    id: dString.substitute("removeRowButton_${0}", [index]),
                    icon: this.hideImageUrl,
                    'class': 'groupMenuButton',
                    tooltip: this.removeProperty_Tooltip,
                    style: "cursor:pointer;padding:0px 5px;",
                    onClick: lang.hitch(this, function () {
                        this._removePropertyRow(index);
                    })
                });
            }
            var buttonContainer = dDom.byId(dString.substitute("propertyRowButton_${0}", [index]));
            domConstruct.place(button.domNode, buttonContainer, "only");
        },
        _isSlxControlType: function (propertyType) {
            return propertyType !== this.dataType.Boolean && propertyType !== this.dataType.Date;
        },
        _setDisplayMode: function (property, display) {
            if (property && display) {
                domClass.remove(property, "display-none");
            }
            else if (property) {
                domClass.add(property, "display-none");
            }
        },
        _onDateTypeChange: function (index, propertyType) {
            if (propertyType === this.dataType.Date) {
                var actionTypes = dDom.byId(dString.substitute("moveDateActionType_${0}", [index]));
                if (!actionTypes) {
                    var items = [
                        { displayName: this.moveDate_Forward, id: "forward" },
                        { displayName: this.moveDate_Backward, id: "backward" }
                    ];
                    var moveActionType = new FilteringSelect({
                        id: dString.substitute("moveDateActionType_${0}", [index]),
                        store: new Memory({ data: items, idProperty: "id" }),
                        value: "forward",
                        maxHeight: 150,
                        searchAttr: "displayName",
                        labelAttr: "displayName",
                        placeHolder: this.selectOption_Caption,
                        required: true,
                        style: "width:125px",
                        fetchProperties: { sort: [{ attribute: "displayName", descending: false }] }
                    });
                    var container = dDom.byId(dString.substitute("moveDaysContainer_${0}", [index]));
                    domConstruct.place(moveActionType.domNode, container, "only");
                }
            }
            var dateOption = dDom.byId(dString.substitute("rdoToDateOption_${0}", [index]));
            var toDateOption = !!dateOption && dateOption.checked;
            this._setDisplayMode(dDom.byId(dString.substitute("calendarContainer_${0}", [index])), toDateOption && propertyType === this.dataType.Date);
            this._setDisplayMode(dDom.byId(dString.substitute("moveDaysContainer_${0}", [index])), !toDateOption && propertyType === this.dataType.Date);
            this._setDisplayMode(dDom.byId(dString.substitute("numberOfDaysContainer_${0}", [index])), !toDateOption && propertyType === this.dataType.Date);
            this._setDisplayMode(dDom.byId(dString.substitute("numberOfDaysLabel_${0}", [index])), !toDateOption && propertyType === this.dataType.Date);
        },
        _resolveDataType: function (dataTypeId) {
            switch (dataTypeId.toLowerCase()) {
                case '92432b4d-8206-4a96-ba7b-e4cbd374f148': // True/False
                case '95ca9d52-6f0b-4a96-bd40-43583f41faf8': // Yes/No
                    return { type: this.dataType.Boolean, name: "Boolean" };
                case 'f4ca6023-9f5f-4e41-8571-50ba94e8f233':
                    return { type: this.dataType.Binary, name: "Binary" };
                case 'f750817f-73ad-4bf3-b2de-bd0f5cc47dfd':
                case '44bc190a-99f3-4fa9-98a3-d5b2336d6e7c':
                    return { type: this.dataType.Invalid, name: this.calculatedField };
                case 'f37c635c-9fbf-40d8-98d5-750a54a3cca1':
                    return { type: this.dataType.Currency, name: "Currency" };
                case '1f08f2eb-87c8-443b-a7c2-a51f590923f5':
                    return { type: this.dataType.Date, name: "Date" };
                case '2596d57d-89d6-4b72-9036-b18c64c5324c':
                    return { type: this.dataType.Decimal, name: "Decimal" };
                case '8edd8fce-2be5-4d3d-bedd-ea667e78a8af':
                    return { type: this.dataType.Enum, name: "Enum" };
                case '30053f5a-8d40-4db1-b185-1e4128eb26cc':
                    return { type: this.dataType.Invalid, name: this.standardId };
                case '47f90249-e4c8-4564-9ae6-e1fa9904f8b8': // Integer
                case '6b0b3d51-0728-4b67-9473-52836a81da53': // Short Integer
                    return { type: this.dataType.Numeric, name: "Numeric" };
                case 'owner':
                    return { type: this.dataType.Owner, name: "Owner" };
                case 'b71918bf-fac1-4b62-9ed5-0b0294bc9900':
                    return { type: this.dataType.Picklist, name: "Picklist" };
                case 'ccc0f01d-7ba5-408e-8526-a3f942354b3a': // Text
                case '76c537a8-8b08-4b35-84cf-fa95c6c133b0': // Unicode Text
                case '517d5e69-9efa-4d0a-8e7a-1c7691f921ba': // Dependency Lookup
                    return { type: this.dataType.String, name: "String" };
                case 'user':
                    return { type: this.dataType.User, name: "User" };
                default:
                    return { type: this.dataType.Unknown, name: this.unknownPropertyType };
            }
        },
        _createUserLookup: function () {
            var property = dDom.byId(dString.substitute('updateProperty_${0}', [this.currentSelectedRowIndex]));
            var displayCaption = property ? property.value : this.lookup_Caption;
            this.userLookupConfig = {
                id: dString.substitute('user_${0}', [this.currentSelectedRowIndex]),
                structure: [
                    {
                        label: this.lookupNameColText,
                        field: "UserInfo.UserName",
                        propertyType: "System.String",
                        sortable: true
                    }, {
                        label: this.lookupTitleColText,
                        field: "UserInfo.Title",
                        propertyType: "System.String",
                        sortable: true
                    }, {
                        label: this.lookupDepartmentColText,
                        field: "UserInfo.Department",
                        propertyType: "System.String",
                        sortable: true
                    }, {
                        label: this.lookupRegionColText,
                        field: "UserInfo.Region",
                        propertyType: "System.String",
                        sortable: true
                    }, {
                        label: this.lookupTypeColText,
                        field: "Type",
                        propertyType: "Sage.Entity.Interfaces.UserType",
                        sortable: true
                    }
                ],
                gridOptions: {
                    contextualCondition: function () {
                        return 'Type ne \'5\' and Type ne \'6\' and Type ne \'7\' and Type ne \'8\'';
                    },
                    contextualShow: '',
                    selectionMode: 'single'
                },
                storeOptions: { resourceKind: 'users', sort: [{ attribute: 'UserInfo.UserName' }] },
                isModal: true,
                initialLookup: true,
                returnPrimaryKey: true,
                dialogTitle: dString.substitute(this.lookupHeaderText, [displayCaption]),
                dialogButtonText: this.btnOK_Caption
            };
            return new Lookup({
                id: dString.substitute('${0}_${1}', [this.controlTypeName.Lookup, this.currentSelectedRowIndex]),
                config: this.userLookupConfig,
                style: 'width:100%'
            });
        },
        _createOwnerLookup: function () {
            var property = dDom.byId(dString.substitute('updateProperty_${0}', [this.currentSelectedRowIndex]));
            var displayCaption = property ? property.value : this.lookup_Caption;
            this.ownerLookupConfig = {
                id: dString.substitute('owner_${0}', [this.currentSelectedRowIndex]),
                structure: [
                    {
                        label: this.lookupDescriptionColText,
                        field: 'Description',
                        propertyType: "System.String",
                        sortable: true
                    }, {
                        label: this.lookupTypeColText,
                        field: 'Type',
                        propertyType: 'Sage.Entity.Interfaces.OwnerType',
                        sortable: true
                    }
                ],
                gridOptions: {
                    contextualCondition: '',
                    contextualShow: '',
                    selectionMode: 'single'
                },
                storeOptions: { resourceKind: 'ownerViews', sort: [{ attribute: "Description" }] },
                isModal: true,
                initialLookup: true,
                preFilters: [],
                returnPrimaryKey: true,
                dialogTitle: dString.substitute(this.lookupHeaderText, [displayCaption]),
                dialogButtonText: this.btnOK_Caption
            };
            return new Lookup({
                id: dString.substitute('${0}_${1}', [this.controlTypeName.Lookup, this.currentSelectedRowIndex]),
                config: this.ownerLookupConfig,
                style: 'width:100%'
            });
        },
        _btnOk_OnClick: function () {
            var updateProperties = [];
            var updateValues = [];
            var aggregateValues = [];
            var propertyRows = query(".propertyRows");
            for (var i = 0; i < propertyRows.length; i++) {
                var rowIndex = i + 1;
                if (!this._isValid(rowIndex)) {
                    return;
                } else {
                    var property = this._getPropertySelectionValue(rowIndex);
                    if (property) {
                        if (!this._isDuplicateProperty(updateProperties, property.propertyName)) {
                            updateProperties.push(property.propertyName);
                            updateValues.push(encodeURIComponent(property.propertyValue));
                            aggregateValues.push(property.isAggregate);
                        } else {
                            this._setDisplayMode(this.divValidationMessage, (true));
                            var error = dDom.byId(dString.substitute("errorNoSelectedProp_${0}", [rowIndex]));
                            if (error) {
                                domClass.remove(dDom.byId(dString.substitute("errorNoSelectedProp_${0}", [rowIndex])), "display-none");
                            }
                            this.spanValidationMessage.innerHTML = utility.htmlEncode(this.errorDuplicateValue);
                            return;
                        }
                    }
                }
            }

            var groupId = this._getCurrentGroupId();
            if (groupId === "LOOKUPRESULTS") {
                groupId = this._getDefaultGroupId();
            }

            var parameters = [
                { "name": "EntityName", "value": this.currentEntityPrettyName },
                { "name": "PropertyNames", "value": updateProperties.join(',') },
                { "name": "PropertyValues", "value": updateValues.join(',') },
                { "name": "SelectedIds", "value": (this.selectionInfo.selectionCount > 0) ? this.selectionInfo.selectedIds.join(',') || '' : '' },
                { "name": "GroupId", "value": groupId },
                { "name": "BusinessRuleName", "value": '' },
                { "name": "AppliedFilters", "value": Sys.Serialization.JavaScriptSerializer.serialize(jobs.getFiltersForJob()) },
                { "name": "LookupConditions", "value": Sys.Serialization.JavaScriptSerializer.serialize(jobs.getLookupConditionsForJob()) },
                { "name": "AggregateValues", "value": aggregateValues.join(',') },
                { "name": "EntityTableName", "value": this.currentEntityTableName }
            ];

            var options = {
                descriptor: this.job_Description,
                showErrorNotification: false,
                closable: true,
                title: this.updateRecords_Caption,
                key: "Sage.SalesLogix.BusinessRules.Jobs.UpdateEntityJob",
                parameters: parameters,
                success: function (result) {
                    if (result) {
                    }
                },
                failure: function (result) {
                    dialogs.showError(dString.substitute(this.errorRequestingJobMgr, [result.statusText]));
                },
                ensureZeroFilters: true
            };
            this._close();
            jobs.triggerJobAndDisplayProgressDialog(options);
        },
        _isDuplicateProperty: function (updateProperties, propertyName) {
            var result = false;
            dArray.some(updateProperties, function (property) {
                if (propertyName === property) {
                    result = true;
                }
            });
            return result;
        },
        _getPropertySelectionValue: function (rowIndex) {
            var property = this._getProperty(rowIndex);
            var prop = this._resolveDataType(property.item.dataTypeId);
            switch (prop.type) {
                case this.dataType.Binary:
                case this.dataType.Currency:
                case this.dataType.Decimal:
                case this.dataType.String:
                case this.dataType.Enum:
                    return {
                        propertyName: this._getPropertyName(property.value),
                        propertyValue: registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Standard, property.propertyRowIndex])) ?
                            registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Standard, property.propertyRowIndex])).get("value") : "",
                        isAggregate: false
                    };
                case this.dataType.Boolean:
                    return {
                        propertyName: this._getPropertyName(property.value),
                        propertyValue: dDom.byId(dString.substitute("rdoYesOption_${0}", [property.propertyRowIndex])) ?
                            dDom.byId(dString.substitute("rdoYesOption_${0}", [property.propertyRowIndex])).checked : "",
                        isAggregate: false
                    };
                case this.dataType.Date:
                    return dDom.byId(dString.substitute("rdoToDateOption_${0}", [property.propertyRowIndex])).checked ? {
                        propertyName: this._getPropertyName(property.value),
                        propertyValue: registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Date, property.propertyRowIndex])).get("displayedValue"),
                        isAggregate: false
                    } : (registry.byId(dString.substitute("moveDateActionType_${0}", [property.propertyRowIndex])).item.id.toUpperCase() === this.moveActionDateType.Forward.toUpperCase() ? {
                        propertyName: this._getPropertyName(property.value),
                        propertyValue: registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.NumberOfDays, property.propertyRowIndex])).get("value"),
                        isAggregate: true
                    } :
                    {
                        propertyName: this._getPropertyName(property.value),
                        propertyValue: dString.substitute("-${0}", [registry.byId(dString.substitute("${0}_${1}",
                            [this.controlTypeName.NumberOfDays, property.propertyRowIndex])).get("value")]),
                        isAggregate: true
                    });
                case this.dataType.Numeric:
                    return {
                        propertyName: this._getPropertyName(property.value),
                        propertyValue: registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Standard, property.propertyRowIndex])) ?
                            registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Standard, property.propertyRowIndex])).get("focusNode").get("value") : "",
                        isAggregate: false
                    };
                case this.dataType.Owner:
                case this.dataType.User:
                    var lookup = registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Lookup, property.propertyRowIndex]));
                    return {
                        propertyName: this._getPropertyName(property.value), propertyValue: lookup && lookup.selectedObject ?
                            lookup.selectedObject.$key : "", isAggregate: false
                    };
                case this.dataType.Picklist:
                    return {
                        propertyName: this._getPropertyName(property.value),
                        propertyValue: this._getPicklistValue(property),
                        isAggregate: false
                    };
                default:
                    //unsupported type selected
            }
            return false;
        },
        _getPropertyName: function (dataTypeId) {
            var propertyName;
            dArray.some(this.properties, function (property) {
                if (property.$key === dataTypeId) {
                    propertyName = property.propertyName;
                    return true;
                }
                return false;
            });
            return propertyName;
        },
        _isValid: function (rowIndex) {
            var errorNode = dDom.byId(dString.substitute("errorNoSelectedProp_${0}", [rowIndex]));
            if (errorNode) {
                domClass.add(errorNode, "display-none");
            }

            var property = this._getProperty(rowIndex);
            var prop = this._resolveDataType(property.item.dataTypeId);
            var valid = false;
            switch (prop.type) {
                case this.dataType.Boolean:
                    return !!dDom.byId(dString.substitute("rdoYesOption_${0}", [rowIndex]));
                case this.dataType.Binary:
                case this.dataType.Currency:
                case this.dataType.Decimal:
                case this.dataType.Numeric:
                case this.dataType.String:
                case this.dataType.Enum:
                    if (registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Standard, property.propertyRowIndex]))) {
                        valid = registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Standard, property.propertyRowIndex])).get("value") !== "";
                    }
                    break;
                case this.dataType.Date:
                    if (dDom.byId(dString.substitute("rdoToDateOption_${0}", [property.propertyRowIndex])).checked) {
                        if (registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Date, property.propertyRowIndex]))) {
                            valid = registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Date, property.propertyRowIndex])).get("displayedValue") !== "";
                        }
                    } else {
                        if (registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.NumberOfDays, property.propertyRowIndex]))) {
                            valid = registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.NumberOfDays, rowIndex])).get("value") !== "";
                        }
                    }
                    break;
                case this.dataType.Owner:
                case this.dataType.User:
                    var lookup = registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Lookup, property.propertyRowIndex]));
                    valid = lookup && !!lookup.selectedObject;
                    break;
                case this.dataType.Picklist:
                    if (registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Picklist, property.propertyRowIndex]))) {
                        valid = registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Picklist, property.propertyRowIndex])).get("value") !== "";
                    }
                    break;
            }
            if (!valid) {
                domClass.remove(dDom.byId(dString.substitute("errorNoSelectedProp_${0}", [property.propertyRowIndex])), "display-none");
                this.spanValidationMessage.innerHTML = utility.htmlEncode(this.errorUnspecifiedValue);
            }
            this._setDisplayMode(this.divValidationMessage, (!valid));
            return valid;
        },
        _getProperty: function (startIndex) {
            var property = registry.byId(dString.substitute("updateProperty_${0}", [startIndex]));
            if (!property) {
                return this._getProperty(startIndex + 1);
            } else {
                return property;
            }
        },
        _getPicklistValue: function (property) {
            var picklist = registry.byId(dString.substitute("${0}_${1}", [this.controlTypeName.Picklist, property.propertyRowIndex]));
            if (picklist) {
                switch (picklist._getStoreModeAttr()) {
                    case this.picklistStorageMode.Code:
                        return picklist._getCodeAttr();
                    case this.picklistStorageMode.Id:
                        return picklist._getIdAttr();
                    default:
                        return picklist.get('value');
                }
            }
            return "";
        },
        _getCurrentGroupId: function () {
            var grpContextSvc = Sage.Services.getService('ClientGroupContext');
            if (grpContextSvc) {
                var contextService = grpContextSvc.getContext();
                return contextService.CurrentGroupID;
            }
            return '';
        },
        _getDefaultGroupId: function () {
            var grpContextSvc = Sage.Services.getService('ClientGroupContext');
            if (grpContextSvc) {
                var contextService = grpContextSvc.getContext();
                return contextService.DefaultGroupID;
            }
            return '';
        },
        _btnCancel_OnClick: function () {
            this._close();
        },
        _onKeyPress: function (e) {
            if (!utility.restrictToNumberOnKeyPress(e)) {
                query.stopEvent(e);
            }
        },
        _chkScheduleJob_OnChange: function (checked) {
            if (!this.jobSchedulingWidget) {
                this.jobSchedulingWidget = new JobSchedulingWidget();
                this.jobSchedulingWidget.initialize();
                this.jobSchedulingWidget.placeAt(this.jobScheduler_Container);
            }
            this._setDisplayMode(this.jobSchedulingWidget.divJobSchedulingWidget, checked);
        },
        _close: function () {
            var dialog = registry.byId(this.id);
            this._dialog.hide();
            if (dialog) {
                dialog.destroyRecursive();
            }
        }
    });
    return bulkUpdateWidget;
});
