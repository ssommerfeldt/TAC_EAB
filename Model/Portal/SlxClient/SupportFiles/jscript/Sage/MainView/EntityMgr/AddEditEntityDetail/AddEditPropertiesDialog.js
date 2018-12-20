require({cache:{
'url:Sage/MainView/EntityMgr/AddEditEntityDetail/templates/AddEditPropertiesDialog.html':"[\r\n'<div>',\r\n\t'<div data-dojo-type=\"dijit.Dialog\" class=\"OverrideDialogOverflowToHidden FullPageDialogue\" data-dojo-attach-point=\"_dialog\">',\r\n        '<div data-dojo-type=\"dijit.form.Form\" data-dojo-attach-point=\"addEditFiltersForm\" class=\"FManagerDialogForm\" >',\r\n            '<div class=\"mainContentContent DialogMainForm\">',                 \r\n                '<div data-dojo-attach-point=\"_DisplayName\"></div>',\r\n                '<table data-dojo-attach-point=\"_DynamicSection\" style=\"overflow-y:auto!important;\" class=\"detailTableContainer formtable HundredPercentWidth\">',\r\n                '</table>',\r\n                '<div data-dojo-attach-point=\"_DetailsSection\"></div>',\r\n            '</div>',\r\n            '<div>',\r\n                '<div data-dojo-attach-point=\"divValidationMessage\" class=\"errorText\">',\r\n                     '<span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>',\r\n                 '</div>',\r\n                '<div class=\"lookupButtonWrapper\">',                    \r\n                    '<span data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"cmdSave\" data-dojo-attach-event=\"onClick:_cmdSave_OnClick\"></span>',\r\n                    '<span data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"cmdCancel\" data-dojo-attach-event=\"onClick:_cmdCancel_OnClick\"></span>',\r\n                '</div>',\r\n            '</div>',\r\n        '</div>',\r\n\t'</div>',\r\n'</div>'\r\n ]"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, cookie */
define("Sage/MainView/EntityMgr/AddEditEntityDetail/AddEditPropertiesDialog", [
    'dijit/_Widget',

    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/json',
    'dojo/on',
    'dojo/query',
    'dojo/string',
    'dojo/_base/connect',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/text!./templates/AddEditPropertiesDialog.html',
    'dojo/i18n!./nls/AddEditDialog',
    'dojo/store/Memory',

    'Sage/_Templated',
    'Sage/UI/Dialogs',
	'Sage/Data/SDataServiceRegistry',
    'Sage/UI/_DialogLoadingMixin',
    'Sage/UI/FilteringSelect',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'Sage/UI/Controls/CheckBox',
    'Sage/UI/Controls/FieldAttributeControlFactory',
    'Sage/UI/Controls/PropertyDropDown',
    'Sage/UI/Controls/TextBox',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/DisplayName'

],
function (
    _Widget,

    domConstruct,
    domClass,
    dojoStyle,
    json,
    dojoOn,
    query,
    dojoString,
    dojoConnect,
    declare,
    lang,
    template,
    nlsResources,
    memory,

    _Templated,
    crmDialogue,
	SDataServiceRegistry,
    _DialogLoadingMixin,
    crmDropDowns,
    _DialogHelpIconMixin,
    crmCheckBox,
    FieldAttributeController,
	PropertyDropDown,
    crmTextBox,
    displayNameCNTRL
) {
    var widget = declare('Sage.MainView.EntityMgr.AddEditEntityDetail.AddEditPropertiesDialog', [_Widget, _Templated], {
        _dialog: null,

        widgetTemplate: new Simplate(eval(template)),
        _nlsResources: nlsResources,
        widgetsInTemplate: true,

        _EditData: false,           //  Filter information
        entityName: false,          //  current name of the entity

        detailUtility: false,

        service: false,             //  Reference to SData
        _title: false,

        details: null,
        _inEditMode: false,
        justWidget: false,
        showTypeAttributes: false,
        dataTypeData: null,
        typeAttributeObj: null,

        activeControllers: null,
        isNewEntity: false,
        dataStore: null,
        newProperty: null,
        rowTemplate: ['<tr data-dojo-attach-point="_{%= $.name %}Section" name="_{%= $.name %}Section">',
                        '<td class="FManagerDialogFieldLabel {%= $.display %}">',
                            '<div style="padding:0 !important;" class="lbl alignright">',
                                '<label style="line-height:32px !important;">',
                                    '{%= $.label %}',
                                '</label>',
                            '</div>',
                            '<div class="fld  dijitInline" data-dojo-attach-point="{%= $.name %}"></div>',
                        '</td>',
                    '</tr>'],

        constructor: function (entity, title, dUtility, onlyCalc, data, isNewEntity, dataStore) {
            if (dUtility === null) {
                var selectedData = { name: entity };
                dUtility = new Sage.MainView.EntityMgr.EntityDetailUtility();
                dUtility.getSchemasInformationFromSData(false);
                dUtility.getPropertiesAssociatedWithFilters(selectedData);
                dUtility.getSpecialValues();
                dUtility.refreshPropertyStore(selectedData.name);
                if (!this.service) {
                    this.service = dUtility.service;
                }
            }
            if (dUtility) {
                this.detailUtility = dUtility;
                this.detailUtility.refreshPropertyStore();
            }

            this._EditData = data;
            this.entityName = entity;
            if (title === null) {
                var strTemp = this._EditData ? nlsResources.editDialogTitle : nlsResources.dialogTitleAddField;
                this._title = dojoString.substitute(strTemp, [this.entityName]);
            }
            else {
                this._title = title;
            }
            this.justWidget = onlyCalc;
            this.isNewEntity = false;

            if (this._EditData) {
                this._inEditMode = true;
                this.dataTypeData = JSON.parse(this._EditData.dataTypeData);
            }

            if (isNewEntity) {
                this.isNewEntity = isNewEntity;
                this.dataStore = dataStore;
            }

            this._createDynamicFieldProperties();

        },

        destroy: function (context) {
            context.destroy();
            dijit.popup.close();
        },

        postCreate: function () {
            var contentArr = this.activeControllers.data;

            for (var i = 0; i < contentArr.length; i++) {
                this._moveActiveControlFromBackGroundToPage(contentArr[i]);
            }

            //create buttons
            this.cmdSave.containerNode.innerHTML = this._nlsResources.lblSaveButton;
            this.cmdCancel.containerNode.innerHTML = this._nlsResources.lblCancelButton;

            // help icon
            lang.mixin(this._dialog, new _DialogHelpIconMixin({ titleBar: this._dialog.titleBar }));
            this._dialog.createHelpIconByTopic('Adding_Editing_Properties');

            //loading
            lang.mixin(this._dialog, new _DialogLoadingMixin());

            this.hideControlsBasedOffSelectedFieldType();

            dojoOn(this._dialog, "onCancel", lang.partial(this._cmdCancel_OnClick, this));

            this.startup();
            query('.dijitDialog').on('click', function (e) {
                var target = e.target || e.srcElement;
                if (target.type !== 'button') {
                    dijit.popup.close();
                }
            });


            dojoConnect.subscribe('/form/addEditProperty/showLoad', this, function () {
                this._dialog.showLoading();
            });
            dojoConnect.subscribe('/form/addEditProperty/hideLoad', this, function () {
                this._dialog.hideLoading();
            });
        },

        _moveActiveControlFromBackGroundToPage: function (item) {
            var simplateRowTemplate, row, rowDom;

            if (item) {

                if (item.name !== "propertyName") {
                    simplateRowTemplate = new Simplate(this.rowTemplate);
                    row = simplateRowTemplate.apply(item);
                    rowDom = domConstruct.toDom(row);

                    domConstruct.place(item.control.domNode, rowDom.lastElementChild.lastElementChild, 'only');

                    if (item.control.domNode.className.indexOf("dijitCheckBox") >= 0) {
                        domClass.add(item.control.domNode.parentNode, "checkbox");
                    }

                    this._DynamicSection.appendChild(rowDom);
                }
                else {
                    rowDom = item.control.domNode;

                    this._DisplayName.appendChild(rowDom);
                }
            }
        },

        _createDisplayNameController: function () {
            var defValueD = '', defValueN = '';

            if (this._EditData && this._EditData.displayName) {
                defValueD = this._EditData.displayName;
            }

            if (this._EditData && this._EditData.propertyName) {
                defValueN = this._EditData.propertyName;
            }

            var nameTextBox = new displayNameCNTRL({
                dUtility: this.detailUtility,
                editMode: this._inEditMode && !this.isNewEntity,
                dataStore: this.dataStore,
                query: {
                    entityName: this.entityName,
                    resourceKind: dojoString.substitute('entities("${0}")/properties', [this.entityName]),
                    name: "propertyName",
                    displayName: "displayName"
                },
                values: {
                    display: {
                        data: defValueD,
                        mapDisplayToName: this._nameToDisplayMap
                    },
                    name: {
                        data: defValueN,
                        validation: this._NameValidator,
                        disabled: this._inEditMode && !this.isNewEntity,
                        invalidMessage: this._nlsResources.validNameMsg
                    }
                }
            });

            return nameTextBox;
        },
        _NameValidator: function (value, constraints) {
            // value needs to start with a letter or underscore, but can also contain numbers
            var regex = '^[A-Z][A-Za-z0-9_]*$';
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
        _nameToDisplayMap: function (val) {
            var regexp = new RegExp(/\w*/gm);
            var matches = val.match(regexp);
            if (matches) {
                if (lang.isArray(matches)) {
                    val = matches.join('');
                    regexp = new RegExp(/[A-Za-z]/gm);
                    matches = regexp.exec(val);
                    if (matches && matches.length > 0) {
                        val = val.substring(matches.index);
                        if (val && val.length > 0) {
                            return val.charAt(0).toUpperCase() + val.slice(1);
                        }
                        else {
                            return '';
                        }
                    }

                }
                else {
                    return matches;
                }
            }
            return '';
        },

        _addToListofControls: function (id, type, label, val, collection) {

            var control = this._assignControlBasedOffType(id, type.substring(3), val, collection);
            var displayClass = this._setDisplayString(control, id);
            var controlLabel = typeof (this._nlsResources[id]) === "undefined" || this._nlsResources[id] === null ? label : this._nlsResources[id];

            this.activeControllers.add({ control: control, label: controlLabel, name: id, display: displayClass });
        },
        // determines if the form property should be displayed.
        _displayControl: function (control, id) {
            var hideIfNoControls = ["dataTypeData"]; // list of controls that will be hidden(class="display-none") if there are no sub controls present.

            var applyRule = true;
            if (typeof (id) !== "undefined" && id !== null) {
                applyRule = hideIfNoControls.indexOf(id) >= 0; // if the control does not exist in the list, then the hide rule will not apply.
            }
            if (applyRule) {
                return ((typeof (control.activeControls) !== "undefined" && control.activeControls !== null) && control.activeControls.length > 0);
            }
            else {
                return true;
            }
        },
        // used during the inital loading of the form; returns a string value for the display class to be added to the domNode
        _setDisplayString: function (control, id) {
            return this._displayControl(control, id) ? "display" : "display-none";
        },
        // used once the dom has been added to the displayed form; manipulates the dom classes via the add and remove methods
        _setParentDisplayClass: function (control, parentDom) {
            if (this._displayControl(control)) { // display dom if there are controls to display
                domClass.remove(parentDom, 'display-none');
                domClass.add(parentDom, 'display');
            }
            else { // if there are no controls to display, then hide the dom.
                domClass.remove(parentDom, 'display');
                domClass.add(parentDom, 'display-none');
            }
        },
        _createDynamicFieldProperties: function () {
            var dynamicArr = this.detailUtility.propertyInformation.data;

            this.activeControllers = new memory({ idProperty: "name" });

            var suppress = ['id', 'displayName', 'columnName', 'isDynamic', 'length', 'isReadOnly', 'scale', 'precision', 'displayCategory', 'isKey']; // remove displayCategory from list to test auto generated drop down controls

            if (!this.isNewEntity) {
                suppress.push('isNullable');
            }
            for (var index = 0; index < dynamicArr.length; index++) {
                var item = dynamicArr[index];
                var control = null;
                var type = item.type;
                var lbl = item.name;


                var insertExlcusions = (!this._inEditMode && (lbl === "isIncluded")); // isIncluded is to always be true
                var block = suppress.indexOf(lbl) >= 0 || insertExlcusions;

                if (!block) {
                    if (type.substring(0, 3) === "xs:") {
                        var val = null;
                        if (this._inEditMode && (typeof (this._EditData[lbl]) !== "undefined" && this._EditData[lbl] !== null)) {
                            val = this._EditData[lbl];
                        }
                        this._addToListofControls(lbl, type, item.label, val, null);
                    }
                    else {
                        var len = type.length;
                        if (type.substring(len - 6, len) === "--type") {
                            var subArr = item.sub.data;
                            if (subArr !== null) {
                                for (var i1 = 0; i1 < subArr.length; i1++) {
                                    var subItem = subArr[i1];
                                    var subName = subItem.name;
                                    var subType = subItem.type;

                                    var insertSubExlcusions = (!this._inEditMode && (lbl === "sdata") && (subName === "generate"));
                                    if (!insertSubExlcusions) {
                                        if (subType.substring(0, 3) === "xs:") {
                                            var val1 = null;
                                            if (this._inEditMode && (typeof (this._EditData[item.name][subName]) !== "undefined" && this._EditData[item.name][subName] !== null)) {
                                                val1 = this._EditData[item.name][subName];
                                            }
                                            this._addToListofControls(subName, subType, subItem, val1, null);
                                        }
                                    }
                                }
                            }
                        }
                        else if (type.substring(len - 6, len) === "--enum") {
                            var subArr1 = item.collection;
                            var val2 = null;
                            if (this._inEditMode && (typeof (this._EditData[lbl]) !== "undefined" && this._EditData[lbl] !== null)) {
                                val2 = this._EditData[lbl];
                            }
                            if (subArr1 !== null) {
                                subArr1 = new memory({ idProperty: "@value", data: subArr1.data });
                                this._addToListofControls(lbl, "xs:enum", item, val2, { text: "@sme:label", id: "@value", data: subArr1 });
                            }
                        }
                    }
                }
            }
        },
        _assignControlBasedOffType: function (name, type, val, collection) {
            var control = null;
            if (name === "dataTypeId") {
                var form = this;
                control = new crmDropDowns(
                {
                    shouldPublishMarkDirty: false,
                    required: true,
                    value: val,
                    store: this.detailUtility.typeStore,
                    searchAttr: 'name',
                    idAttr: 'id',
                    maxHeight: 175,//drop down height
                    query: { supported: true },
                    fetchProperties: { sort: [{ attribute: "name", descending: false }] },
                    invalidMessage: this._nlsResources.InvalidFilterName,
                    disabled: this._inEditMode && !this.isNewEntity,// problems can arrise when a type is changed after a field has been created, so disable if in edit mode.
                    onChange: function (id) {
                        form._setTypeAttribute();
                    }
                });
                this.typeDropDown = control;
                if (typeof (val) !== "undefined") {
                    this._setTypeAttribute();
                    this.showTypeAttributes = true;
                }
                else {
                    this.typeAttribute.containerNode.innerHTML = this._nlsResources.lblMore;
                }
            }
            else if (name === "dataTypeData") {
                control = this.typeAttributeObj;
            }
            else if (name === "propertyName") {
                control = this._createDisplayNameController();
            }
            else {
                switch (type) {
                    case "string":
                    case "int":
                    case "byte":
                    case "date":
                        control = new crmTextBox({
                            shouldPublishMarkDirty: false,
                            disabled: this._inEditMode && !this._EditData.isDynamic && name !== "displayName" && !this.isNewEntity
                        });
                        if (typeof (val) !== "undefined" && val !== null) {
                            control.textbox.value = val;
                        }
                        break;
                    case "boolean":
                        control = new crmCheckBox({
                            shouldPublishMarkDirty: false
                        });
                        if (typeof (val) !== "undefined" && val !== null) {
                            control.setChecked(val);
                        } else if (name === "isNullable") {
                            control.setChecked(true);
                        }
                        break;
                    case "picklist":
                    case "enum":
                        control = new crmDropDowns({
                            value: val,
                            store: collection.data,
                            idProperty: collection.id,
                            searchAttr: collection.text,
                            shouldPublishMarkDirty: false,
                            disabled: this._inEditMode && !this._EditData.isDynamic && name !== "displayName" && !this.isNewEntity,
                            required: false
                        });
                        break;
                }
            }

            domClass.remove(control.domNode, "dijitInline");
            return control;
        },

        _setTypeAttribute: function () {
            var i = this.detailUtility.typeStore.index[this.typeDropDown.value];
            if (this._EditData && typeof (this._EditData) !== "undefined") {
                if (this.typeDropDown.value === "2596d57d-89d6-4b72-9036-b18c64c5324c") {
                    lang.mixin(this.dataTypeData, { Precision: this._EditData.precision, Scale: this._EditData.scale });
                }
                if (typeof (this._EditData.length) !== "undefined" || this._EditData.length !== null) {
                    lang.mixin(this.dataTypeData, { Length: this._EditData.length });
                }
            }


            var readOnly = !(this._inEditMode ? this._EditData.isDynamic : true);
            if (this.isNewEntity)
                readOnly = false;
            // list of values where if they contain the default value are not provided by the endpoint, so a value is provided here(otherwise they get no ui).
            var updateDefaultsOf = ['IsEncrypted', 'IsPercentage', 'ValueStoredAsText', 'AllowMultiples', 'EnableHyperLinking', 'MultiSelect',
                                'NoneEditable', 'ReturnPrimaryKey', 'AlphaSort', 'MustExistInList', 'NoneEditable', 'ReturnPrimaryKey', 'IsNullable'];

            for (var x = 0; x < updateDefaultsOf.length; x++) {
                var valueUDO = updateDefaultsOf[x];
                this._adjustForValuesMatchingBooleanDefaultsMissing(this.detailUtility.typeStore.data[i], valueUDO);
            }

            this.typeAttributeObj = new FieldAttributeController({ viewOnly: readOnly, formData: lang.mixin(this.detailUtility.typeStore.data[i], this.dataTypeData), entity: this.entityName, editMode: this._inEditMode, picklistSchema: this.detailUtility.picklistSchemaData });

            var dataTypeDataDomNode = this._findControllerDom("dataTypeData");
            if (dataTypeDataDomNode !== null) {
                this._setParentDisplayClass(this.typeAttributeObj, dataTypeDataDomNode.parentNode);
                domConstruct.place(this.typeAttributeObj.domNode, dataTypeDataDomNode, 'only');
            }
            if (typeof (this._DynamicSection) !== 'undefined') {
                this.hideControlsBasedOffSelectedFieldType();
            }
        },


        hideControlsBasedOffSelectedFieldType: function () {
            var contentArr = this.activeControllers.data;
            var sectionTemplate = "_${0}Section";

            //First show all, then systematically hide as needed.
            for (var i = 0; i < contentArr.length; i++) {

                var contentItem = contentArr[i];

                if (contentItem && contentItem.name) {
                    this.findDomAndShowDom(dojoString.substitute(sectionTemplate, [contentItem.name]));
                }
            }
			var items2Hide = [];
            var calculatedField = false;
            var typeId = this.typeDropDown.value;
            if (typeof (typeId) === "undefined" && typeId === null) {
                typeId = this._EditData.dataTypeId;
            }
            // hide doms via type
            switch (typeId) {

                case 'f750817f-73ad-4bf3-b2de-bd0f5cc47dfd': //calculatedString
                case '44bc190a-99f3-4fa9-98a3-d5b2336d6e7c':
				{
					items2Hide.push('audited', 'canBulkUpdate', 'canImport', 'canMatch');
                    calculatedField = true;
                    break;
				}
            }
			// hide properties that will not be updated when field is not dynamic and not calculated
            if (this._EditData && !this._EditData.isDynamic && !calculatedField) {
                items2Hide.push('audited', 'isIncluded');
            }

           for (var x = 0; x < items2Hide.length; x++) {
                var item2Hide = items2Hide[x];
                this.findDomAndHideDom(dojoString.substitute(sectionTemplate, [item2Hide]));
            }
        },
        findDomAndHideDom: function (controlAttachPointName) {
            var domToHide = this._findControllerDom(controlAttachPointName, true);
            if (domToHide) {
                domClass.add(domToHide, "display-none");
                domClass.remove(domToHide, "display");
            }
        },
        findDomAndShowDom: function (controlAttachPointName) {
            var domToHide = this._findControllerDom(controlAttachPointName, true);
            if (domToHide) {
                domClass.add(domToHide, "display");
                domClass.remove(domToHide, "display-none");
            }
        },

        _findControllerDom: function (controlAttachPointName, section) {
            var strTemplate = "div.fld[data-dojo-attach-point='${0}']";
            if (section) {
                strTemplate = "tr[data-dojo-attach-point='${0}']";
            }
            var strQuery = dojoString.substitute(strTemplate, [controlAttachPointName]);

            if (this._DynamicSection) {
                var result = query(strQuery, this._DynamicSection);

                if (typeof (result) !== "undefined" && result !== null &&
                    typeof (result.length) !== "undefined" && result.length !== null && result.length > 0) {

                    return result[0]; //return first
                }
            }

            return null;
        },
        _adjustForValuesMatchingBooleanDefaultsMissing: function (typeStoreDataElement, strVar) {
            var hasValueStoredAsText = typeof (typeStoreDataElement) !== "undefined" &&
                (typeof (typeStoreDataElement[strVar]) !== "undefined" &&
                (this.dataTypeData !== null && typeof (this.dataTypeData[strVar]) === "undefined"));
            if (hasValueStoredAsText) {
                this.dataTypeData[strVar] = false;
            }
        },

        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            this.inherited(arguments);
        },

        show: function () {
            if (this._EditData) {
                this._dialog.titleNode.innerHTML = this._title;
            }
            else {
                this._dialog.titleNode.innerHTML = this._title;
            }

            this._dialog.show();
            this.inherited(arguments);
        },
        _cmdSave_OnClick: function () {
            if (this.isNewEntity) {
                this._addItemToStore();
            }
            else {
                this._saveExistingEntity();
            }

        },
        _addItemToStore: function () {
            this._dialog.showLoading();
            var objectsStore = this._generalPropertyValueAdjustments(false, true);
            var property = objectsStore.property;

            this.newProperty = property;
            if (!this.isValid()) {
                this._dialog.hideLoading();
                return;
            }

            if (this._EditData) {
                this.dataStore.remove(this._EditData.propertyName);
            }

            this.dataStore.put(property);
            this._dialog.hideLoading();
            this._dialog.hide();

        },
        _generalPropertyValueAdjustments: function (formValidation, createNew) {
            var activeValues = this.typeAttributeObj.getActiveValues();
            if (formValidation && this.addEditFiltersForm.validate() === false)
                return;

            var propertyObj = this._populdateSDataObject();

            if (!propertyObj.displayName)
                propertyObj.displayName = propertyObj.propertyName;
            if (this.typeDropDown.value === "44bc190a-99f3-4fa9-98a3-d5b2336d6e7c" || this.typeDropDown.value === "f750817f-73ad-4bf3-b2de-bd0f5cc47dfd") {
                activeValues["DisplayName"] = propertyObj.displayName;
                activeValues["isReadOnly"] = true;
            }
            propertyObj["dataTypeData"] = json.stringify(activeValues);
            if (createNew) {
                propertyObj = this._createPropertyValueAdjustments(propertyObj, activeValues);
            }
            return { property: propertyObj, activity: activeValues };
        },
        _createPropertyValueAdjustments: function (propertyObj, activeValues) {
            propertyObj["columnName"] = propertyObj.propertyName.toUpperCase();
            propertyObj["isIncluded"] = true;
            if (typeof (propertyObj["sdata"]) === "undefined" || propertyObj["sdata"] === null) {
                propertyObj["sdata"] = { generate: true };
            }
            else {
                propertyObj["sdata"]["generate"] = true;
            }

            switch (this.typeDropDown.value) {
                case "2596d57d-89d6-4b72-9036-b18c64c5324c":
                    propertyObj["precision"] = activeValues["Precision"];
                    propertyObj["scale"] = activeValues["Scale"];
                    break;
                case "44bc190a-99f3-4fa9-98a3-d5b2336d6e7c":
                case "f750817f-73ad-4bf3-b2de-bd0f5cc47dfd":
                    propertyObj["isReadOnly"] = true;
                    break;
            }

            if (typeof (activeValues["Length"]) !== "undefined" && activeValues["Length"] !== null) {
                propertyObj["length"] = activeValues["Length"];
            }
            return propertyObj;
        },

        _saveExistingEntity: function () {
            var resourceRequest = new Sage.SData.Client.SDataSingleResourceRequest(this.service).setResourceKind(dojoString.substitute('entities("${0}")/properties', [this.entityName]));
            resourceRequest.setQueryArg('language', cookie.getCookie("SLXLanguageSetting"));

            this._dialog.showLoading();
            if (!this.isValid()) {
                this._dialog.hideLoading();
                return;
            }

            var createNew = !this._inEditMode;

            var objectsStore = this._generalPropertyValueAdjustments(true, createNew);
            var property = objectsStore.property;
            var activeValues = objectsStore.activity;

            if (createNew) { //create
                resourceRequest.create(property, {
                    success: function (data) {
                        this._onSaveSuccess(data);
                    },
                    failure: function (data) {
                        this._dialog.hide();
                    },
                    scope: this
                });
            }
            else { //update
                lang.mixin(this._EditData, property);

                if (this.typeDropDown.value === "2596d57d-89d6-4b72-9036-b18c64c5324c") {
                    this._EditData.precision = activeValues["Precision"];
                    this._EditData.scale = activeValues["Scale"];
                }
                if (typeof (activeValues["Length"]) !== "undefined" && activeValues["Length"] !== null) {
                    this._EditData["length"] = activeValues["Length"];
                }

                resourceRequest.setResourceSelector(dojoString.substitute("'${0}'", [this._EditData['$key']]));

                resourceRequest['update'](this._EditData, {
                    isSecurityManager: true,
                    scope: this,
                    ignoreETag: false,
                    success: function (data) {
                        this._onSaveSuccess(data);
                    },
                    failure: function (data) {
                        this._dialog.hide();
                    }
                });
            }
        },
        onSaveSuccess: function (data) {
        },
        _onSaveSuccess: function (data) {
            SDataServiceRegistry._removeFromLocalStorage(this.entityName);
            this._dialog.hideLoading();
            this._dialog.hide();
            this.onSaveSuccess(data);
        },
        _cmdCancel_OnClick: function (context) {
            if (this._dialog) {
                this._dialog.hideLoading();
                this._dialog.hide();
            }
            else if (context._dialog) // context is passed when the 'x' button is pressed
            {
                context._dialog.hideLoading();
                context._dialog.hide();
            }
            dojoConnect.publish('Sage/EntityManager/FieldCanceled');
        },
        isValid: function () {
            this.divValidationMessage.innerHTML = ""; // reset the error message line to blank
            var valid = this.addEditFiltersForm.validate(); // validate the form as a whole

            for (var i = 0; i < this.activeControllers.data.length; i++) {
                var ob = this.activeControllers.data[i];
                if (typeof (ob.control.disabled) !== "undefined" && ob.control.disabled !== true) {
                    var validControl = true;

                    var hitCustom = false;
                    //---- custom validations

                    // ensure that the propertyName being saved is unique.
                    switch (ob.name) {
                        case "propertyName": {
                            validControl = ob.control.isValid(!this._inEditMode);
                            if (typeof (validControl) === "object") {
                                validControl = validControl.value;
                            }
                            hitCustom = true;
                            break;
                        }
                        case "dataTypeId": {
                            var dTIallowed = this.detailUtility.typeStore.query({ supported: true });
                            dTIallowed = new memory({ data: dTIallowed });
                            if (ob.control.item !== null && ob.control.item.id) {
                                validControl = dTIallowed.query({ id: ob.control.item.id }).length > 0;
                            }
                            else {
                                validControl = false;
                            }
                            hitCustom = true;
                            break;
                        }
                    }

                    //----- end custom validations

                    // if the control has its own isValid function run it.
                    if (!hitCustom && typeof (ob.control.isValid) === "function") {
                        ob.control.isValid(true); // should effect control's state
                    }

                    // if the control has its own onChanged function run it.
                    if (typeof (ob.control.onChanged) === "function") {
                        ob.control.onChanged(); // should redraw the control taking into account the state.
                    }

                    // now make sure the state of the control is boiled now into a boolean value
                    if (typeof (ob.control.state) !== "undefined" && typeof (ob.control.required) !== "undefined") {
                        validControl = validControl && ob.control.state !== 'Error' && !(ob.control.state === 'Incomplete' && ob.control.required);
                    }

                    if (!validControl) {
                        ob.control.set('state', 'Error'); // If the control is not valid, mark  it's state as error.
                    }

                    valid = valid && validControl; // want to retain false values to reflect the form's validity as a whole so use &&.
                }
            }
            valid = valid && this.typeAttributeObj.isValid(); // validate the type attributes.
            return valid;
        },

        _populdateSDataObject: function () {
            var retObj = {};

            var dynamic = this.detailUtility.propertyInformation.data;
            for (var i = 0; i < dynamic.length; i++) {
                var item = dynamic[i];

                var sub = {};
                if (item.sub !== null) {

                    for (var x = 0; x < item.sub.data.length; x++) {
                        var data = item.sub.data[x];

                        var svli = this.activeControllers.index[data.name];
                        if (svli > 0) {
                            var svl = this.activeControllers.data[svli];
                            var sv = this._getValue(svl);

                            if (sv !== null) {
                                sub[data.name] = sv;
                            }
                        }
                    }
                    retObj[item.name] = sub;
                }
                else {
                    var vli = this.activeControllers.index[item.name];
                    if (vli >= 0) {
                        var vl = this.activeControllers.data[vli];
                        var v = this._getValue(vl);
                        if (typeof (v) === "object") {
                            lang.mixin(retObj, v);
                        }
                        else if (v !== null) {
                            retObj[item.name] = v;
                        }
                    }
                }
            }
            return retObj;
        },


        _getValue: function (ob) {

            var dClass = ob.control.declaredClass;
            if (dClass.indexOf("TextBox") >= 0) {
                return ob.control.value;
            }
            else if (dClass.indexOf("DisplayName") >= 0) {
                return ob.control.getDetails();
            }
            else if (dClass.indexOf("CheckBox") >= 0) {
                return ob.control.checked;
            }
            else if (dClass.indexOf("FilteringSelect") >= 0) {
                return ob.control.value;
            }
            return null;
        }

    });

    return widget;
});