/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, cookie  */
define("Sage/UI/Forms/FormFromSData", [
    'dijit/_Widget',
    'Sage/_Templated',
    'dojo/_base/connect',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/string',
    'Sage/UI/Controls/TextBox',
    'Sage/UI/Controls/CheckBox',
    'Sage/UI/Controls/SimpleTextarea',
    'Sage/UI/FilteringSelect',
    'Sage/UI/Controls/DndSortList',
    'Sage/UI/Controls/PropertyDropDown',
    'Sage/UI/Controls/DateTimePicker',
    'Sage/UI/GridView',
    'dojo/aspect',
    'dojo/store/Memory',
    'dojo/data/ObjectStore',
    "dojo/store/Observable",
    'dojo/dom-construct',
    'dojo/_base/connect',
    'dijit/form/Button',
    "dijit/form/ValidationTextBox",
    "dojo/i18n!./../nls/GridView",
    'dojo/i18n!./nls/FormFromSData',
    'dojo/query'
],
function (
    _Widget,
    _Templated,
    dojoConnect,
    declare,
    lang,
    domClass,
    dString,
    TextBox,
    CheckBox,
    SimpleTextarea,
    FilteringSelect,
    DndSortList,
    PropertyDropDown,
    DateTimePicker,
    GridView,
    dojoAspect,
    memory,
    ObjectStore,
    Observable,
    domConstruct,
    connect,
    dijitButton,
    ValidationTextBox,
    gridNLS,
    formNLS,
    query
) {

    var widget = declare('Sage.UI.Forms.FormFromSData', [_Widget, _Templated], {

        widgetsInTemplate: true,
        widgetTemplate: new Simplate(eval(["<div>", "<table style='overflow-y:show;' class='detailTableContainer formtable' dojoattachpoint='attributeContainer' />", "</div>"])),

        rowTemplate: ['<tr data-dojo-attach-point="_{%= $.name %}Section" name="_{%= $.name %}Section">',
                         '<td class="FManagerDialogFieldLabel {%= $.display %}">',
                             '<div style="padding:0 !important;" class="lbl alignright">',
                                 '<label style="line-height:32px !important;">',
                                     '{%= $.label %}',
                                 '</label>',
                             '</div>',
                             '<div class="fld  dijitInline {%= $.fieldClassAppendix %}" data-dojo-attach-point="{%= $.name %}"></div>',
                         '</td>',
                     '</tr>'],
        validationAndButtonRowTemplate: ['<div>',
                                 '<div data-dojo-attach-point="divValidationMessage" class="errorText">',
                                     '<span data-dojo-attach-point="spanValidationMessage">&nbsp;</span>',
                                 '</div>',
                                     '<div class="lookupButtonWrapper" data-dojo-attach-point="btnController">',
                                 '</div>',
                         '</div>'],
        formIssueTemplate: [
                             '<div style="padding:0 !important;" class="lbl alignright">',
                                 '<label style="line-height:32px !important;">',
                                     '{%= $.label %}',
                                 '</label>',
                             '</div>'],
        buttonListTemplate: new Simplate(["<div class='ButtonActionList'></div>"]),


        activeControls: null,
        editMode: false,
        dumbDTControlCounterForId: 0,
        excludeOnNew: [],
        listOfSupressFields: [],
        useDisplayNameControl: true,
        formData: {},
        _oformData: {},
        gridNlsResource: gridNLS,
        formNlsResource: formNLS,
        formButtonControl: [],
        displayFormButtons: ['ok', 'cancel'],
        _dialogue: null,
        _embedded: false,
        schema: [],
        permittedActions: [],
        // security
        allowViaAddRule: "",
        allowViaEditRule: "",
        allowViaViewRule: "",
        allowViaDeleteRule: "",
        // the sdata endpoint backing the form. ie picklist, entity, entity/filter...
        formBase: "main",
        // used during validation to signify what fields need to be checked if a duplicate exists, and the where statement.
        duplicateCheck: [],
        saveIfValid: { update: false, insert: false },

        constructor: function (obj) {

            this.formButtonControl = [{ label: formNLS.okText, dojoattachpoint: "ok", onClick: "save" }, { label: formNLS.cancelText, dojoattachpoint: "cancel", onClick: "cancel" }];

            this.dumbDTControlCounterForId = 0;
            var reader = {};

            this.schema = [];
            this.permittedActions = [];
            this.activeControls = [];

            if (obj.schemaReader) {
                reader = obj.schemaReader;
            }
            if (obj.suppressFields) {
                this.listOfSupressFields = obj.suppressFields;
            }
            if (obj.excludeOnNew) {
                this.excludeOnNew = obj.excludeOnNew;
            }
            if (obj.formData !== null && typeof (obj.formData) === "object") {
                this.formData = obj.formData;
                this._oformData = lang.clone(obj.formData);
                this.editMode = true;
            }
            if (typeof (obj.editMode) === "boolean") { // the case where there is data passed to the form on create.
                this.editMode = obj.editMode;
            }
            if (typeof (obj.embedded) === "boolean") {
                this._embedded = obj.embedded;
            }
            this._FormSpecificFields(obj);
            this.securityRules();

            this._createForm(reader);
        },
        postCreate: function () {
            var contentArr = this.activeControls;

            if (this._embedded) {
                domClass.remove(this.attributeContainer, "mainContentContent");
                domClass.remove(this.attributeContainer, "DialogMainForm");
            }
            else {
                domClass.add(this.attributeContainer, "mainContentContent");
                domClass.add(this.attributeContainer, "DialogMainForm");
            }

            for (var contentArr_i = 0; contentArr_i < contentArr.length; contentArr_i++) {
                this._moveActiveControlFromBackGroundToPage(contentArr[contentArr_i]);
            }

            var simplateRowTemplate = new Simplate(this.validationAndButtonRowTemplate);
            var row = simplateRowTemplate.apply();
            var rowDom = domConstruct.toDom(row);

            if (this.permittedActions.indexOf('add') >= 0) {
                for (contentArr_i = 0; contentArr_i < this.formButtonControl.length; contentArr_i++) {

                    var btnObj = this.formButtonControl[contentArr_i];


                    if (this.displayFormButtons.indexOf(btnObj.dojoattachpoint) > -1) {
                        var btn = new dijitButton();

                        btn.containerNode.innerHTML = btnObj.label;
                        connect.connect(btn.domNode, "onclick", this, this[btnObj.onClick]);
                        rowDom.lastElementChild.appendChild(btn.domNode);
                    }
                }
            }

            this.attributeContainer.appendChild(rowDom);
        },

        /** start: To be implemented elsewhere **/
        _CustomDisplay: function () { return null; },
        customValidation: function (ob) { return null; },
        // used by implementers to create grids, since they are a bit tricky to provide OOB functionality.
        _createGridControl: function (name, type, val, collection) { return null; },
        // used by implementers to deviate from OOB functionality.
        assignControlBasedOffOfName: function (name, type, val, collection) { return null; },
        _FormSpecificFields: function () { },
        _changeObjectPathParameters: function (path, value, propName, skipFirst, stringifyValue) { return null; },
        _save: function (formName) { },
        _getActiveValuesAdjustments: function () { return {}; },
        /** end: To be implemented elsewhere **/


        securityRules: function () {
            var permittedActions = [];
            var svc = Sage.Services.getService('RoleSecurityService');
            if (this.allowViaAddRule !== "" && svc.hasAccess(this.allowViaAddRule)) {
                this.permittedActions.push('add');
            }
            if (this.allowViaDeleteRule !== "" && svc.hasAccess(this.allowViaDeleteRule)) {
                this.permittedActions.push('delete');
            }
            if (this.allowViaEditRule !== "" && svc.hasAccess(this.allowViaEditRule)) {
                this.permittedActions.push('edit');
            }
            if (this.allowViaViewRule !== "" && svc.hasAccess(this.allowViaViewRule)) {
                this.permittedActions.push('view');
            }
        },
        save: function (formName) {
            dojoConnect.publish('/form/addEditProperty/showLoad');
            this._save(formName);
            dojoConnect.publish('/form/addEditProperty/hideLoad');
        },
        _createForm: function (reader) {
            if (reader) {
                this._createFormFromSDataReader(reader);
            }
        },
        _createFormFromSDataReader: function (reader) {
            if (this.permittedActions.indexOf('view') < 0) {
                this.activeControls.push({ name: 'error', label: this.formNlsResource.permissionsToView, control: null, template: 'formIssueTemplate' });
                return;
            }

            var reader_index = 0,
                arr = reader.data ? reader.data : reader,
                reader_item = {},
                selfAware = this,
                control = {};

            //initial read from reader
            for (reader_index = 0; reader_index < arr.length; reader_index++) {
                reader_item = arr[reader_index];
                this.schema.push(reader_item);
            }

            // then traverse the objects from the reader to flush out controls
            for (reader_index = 0; reader_index < this.schema.length; reader_index++) {

                reader_item = this.schema[reader_index];
                var type = reader_item.type,
                    name = reader_item.name,
                    pathMarker = dString.substitute('"${0}":""', [name]);

                var nameLC = name.toLowerCase();
                var val = this._getProvidedData(name);

                var insertExlcusions = (!this.editMode && this.excludeOnNew.indexOf(nameLC) >= 0); // isIncluded is to always be true
                var block = this.listOfSupressFields.indexOf(nameLC) >= 0 || insertExlcusions;

                control = null;

                if (!block) {

                    if (typeof (reader_item["sdataPath"]) === "undefined") {
                        reader_item["sdataPath"] = pathMarker;
                        reader_item["sdataPathInDot"] = name;
                    }
                    var nodeNameIndex = type.lastIndexOf('--');

                    if (nodeNameIndex < 0) {
                        this._addToListofControls(name, type, reader_item.label, val, null, { path: reader_item["sdataPath"], dot: reader_item["sdataPathInDot"] });
                    }
                    else {
                        var nodeNameKey = type.substring(nodeNameIndex + 2).toLowerCase();
                        var subArr = {};
                        switch (nodeNameKey) {
                            case "choice":
                            case "enum":
                                subArr = reader_item.collection;
                                for (var collec_i = 0; collec_i < subArr.length; collec_i++) {
                                    var defaultLabel = this._onBlankValue(subArr[collec_i].name, subArr[collec_i].nameValue);
                                    defaultLabel = this._onBlankValue(defaultLabel, "item " + collec_i);
                                    subArr[collec_i].label = this._onBlankValue(subArr[collec_i].label, defaultLabel);
                                }
                                if (subArr !== null) {
                                    subArr = subArr.filter(function (c) {
                                        var nLC0 = c.name;
                                        if (typeof (nLC0) !== "undefined") {
                                            nLC0 = nLC0.toLowerCase();
                                            var sub_insertExlcusions0 = (!selfAware.editMode && selfAware.excludeOnNew.indexOf(nLC0) >= 0); // isIncluded is to always be true

                                            return !(selfAware.listOfSupressFields.indexOf(nLC0) >= 0 || sub_insertExlcusions0);
                                        }
                                        return true;
                                    });

                                    this._addToListofControls(name, "xs:enum", reader_item.label, val, { text: "label", id: "value", data: subArr }, { path: reader_item["sdataPath"], dot: reader_item["sdataPathInDot"] });
                                }
                                break;
                            case "list":
                            case "type":
                                if (reader_item.sub !== null) {
                                    subArr = reader_item.sub.data ? reader_item.sub.data : reader_item.sub;
                                }
                                if (reader_item.isCollection && reader_item.relationship === "child") {
                                    if (subArr !== null && subArr.length > 0) {
                                        if (subArr[0].sub) {
                                            subArr = subArr[0].sub.filter(function (c) {
                                                var nLC1 = c.name.toLowerCase();
                                                var sub_insertExlcusions1 = (!selfAware.editMode && selfAware.excludeOnNew.indexOf(nLC1) >= 0); // isIncluded is to always be true
                                                return !(selfAware.listOfSupressFields.indexOf(nLC1) >= 0 || sub_insertExlcusions1);
                                            });
                                            subArr = new memory({ idProperty: "value", data: subArr });
                                            if (typeof (reader_subItem["sdataPath"]) === "undefined") {
                                                reader_item["sdataPath"] = pathMarker;
                                            }
                                            this._addToListofControls(name, "xs:grid", "", val, { text: "label", id: "value", data: subArr }, { path: reader_item["sdataPath"], dot: reader_item["sdataPathInDot"] });
                                        }
                                    }
                                }
                                else {

                                    for (var reader_subIndex = 0; reader_subIndex < subArr.length; reader_subIndex++) {
                                        var reader_subItem = subArr[reader_subIndex];

                                        var newHolder = dString.substitute('"${0}":""', [reader_subItem.name]);
                                        if (!reader_item["sdataPath"]) {
                                            reader_subItem["sdataPath"] = pathMarker;
                                        }
                                        else {
                                            newHolder = "{" + newHolder + "}";
                                        }
                                        reader_subItem["sdataPath"] = reader_item["sdataPath"].replace('""', newHolder);
                                        reader_subItem["sdataPathInDot"] = reader_item["sdataPathInDot"] + "." + reader_subItem.name;
                                        this.schema.push(reader_subItem);
                                    }
                                }
                                break;
                        }
                    }
                }
            }
        },
        _getProvidedData: function (name) {
            var value = null;
            // removed the this.editMode from the below logic to allow values to be passed in during creates
            if ((typeof (this.formData[name]) !== "undefined" && this.formData[name] !== null)) {
                value = this.formData[name];
            }
            return value;
        },
        _addToListofControls: function (id, type, label, val, collection, path) {

            var control = this._assignControlBasedOffType(id, type.substring(3), val, collection);
            var displayClass = this._setDisplayString(control, id);
            var controlLabel = typeof (this.formNlsResource[id]) === "undefined" || this.formNlsResource[id] === null ? label : this.formNlsResource[id];
            controlLabel = typeof (controlLabel) !== "undefined" && controlLabel !== null ? controlLabel : id;
            var saveIfValidLocal = this.saveIfValid;
            if (control.saveIfValid) {
                saveIfValidLocal = control.saveIfValid;
            }
            this.activeControls.push({ control: control, label: controlLabel, name: id, display: displayClass, Include: true, sdataPath: path, template: 'rowTemplate', isDom: false, fieldClassAppendix: "", saveIfValid: saveIfValidLocal });
        },
        // used during the inital loading of the form; returns a string value for the display class to be added to the domNode
        _setDisplayString: function (control, id) {
            return this._displayControl(control, id) ? "display" : "display-none";
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

        _blankString: function (v) {
            return v === null || typeof (v) === "undefined" || v.trim() === "";
        },
        _onBlankValue: function (cv, dv) {
            if (this._blankString(cv)) {
                return dv;
            }
            return cv;
        },

        _assignControlBasedOffType: function (name, type, val, collection) {
            var editsAllowed = this.permittedActions.indexOf('add') >= 0;
            if (this.editMode) {
                editsAllowed = this.permittedActions.indexOf('edit') >= 0;
            }
            var disableViaSec = this.permittedActions.indexOf('view') >= 0 && !editsAllowed;


            var control = this.assignControlBasedOffOfName(name, type, val, collection, disableViaSec);
            if (control === null) {
                switch (type.toLowerCase()) {
                    case "string":
                    case "int":
                    case "byte":
                    case "date":
                        control = new TextBox({
                            shouldPublishMarkDirty: false,
                            disabled: disableViaSec
                        });
                        if (typeof (val) !== "undefined" && val !== null) {
                            control.textbox.value = val;
                        }
                        break;
                    case "boolean":
                        control = new CheckBox({
                            shouldPublishMarkDirty: false,
                            disabled: disableViaSec
                        });
                        if (typeof (val) !== "undefined" && val !== null) {
                            control.setChecked(val);
                        }
                        break;
                    case "datetime":
                        control = new DateTimePicker({
                            id: 'SDataForm_DateTimePicker_' + this.dumbDTControlCounterForId,
                            displayDate: true,
                            displayTime: true,
                            shouldPublishMarkDirty: false,
                            disabled: disableViaSec
                        });
                        this.dumbDTControlCounterForId++;
                        break;
                    case "picklist":
                    case "enum":
                        control = new FilteringSelect({
                            value: val,
                            store: new memory({ idProperty: collection.id, data: collection.data }),
                            idProperty: collection.id,
                            searchAttr: collection.text,
                            shouldPublishMarkDirty: false,
                            required: false,
                            disabled: disableViaSec
                        });
                        break;
                    case "grid":
                        control = this._createGridControl(name, type, val, collection, disableViaSec);
                        break;
                }
            }
            if (control) {
                if (control.domNode) {
                    domClass.remove(control.domNode, "dijitInline");
                }
            }
            return control;
        },

        reLoadData: function (data) {
            for (var i = 0; i < this.activeControls.length; i++) {
                var ob = this.activeControls[i];

                if (ob.control !== null) {
                    var propName = ob.name;
                    var dClass = ob.control.declaredClass;

                    var newValue = this._getValueFromData(data, propName);

                    if (dClass.indexOf("DndSortList") >= 0) {

                    }
                    if (dClass.indexOf("TextBox") >= 0) {
                        ob.control.textbox.value = newValue;
                    }
                    if (dClass.indexOf("TextArea") >= 0) {
                    }
                    if (dClass.indexOf("CheckBox") >= 0) {
                        ob.control.checked = newValue;
                    }
                    if (dClass.indexOf("FilteringSelect") >= 0) {
                    }
                    if (dClass.indexOf("PropertyDropDown") >= 0) {
                    }
                    if (dClass.indexOf("_AbstractGrid") >= 0) {
                        ob.control.grid._setStore(dojo.data.ObjectStore(dojo.store.Memory({ idProperty: '$key', data: this.formData[name] })));
                        ob.control.grid.refresh();
                        ob.control.grid.startup();
                        // make sure that the grid shows a horizontal scrollbar if all column cannot be displayed.
                        ob.control.grid.onLoadComplete = function () {
                            ob.control.grid.resize();
                        };
                    }
                }
            }
        },

        _getValueFromData: function (data, field) {
            var obj = data[field];
            switch (typeof (obj)) {
                case "object":
                    return obj;
                case "undefined":
                    return null;
                default:
                    return null;
            }
        },

        _moveActiveControlFromBackGroundToPage: function (item) {
            var simplateRowTemplate, row, rowDom;

            if (item) {

                rowDom = this._CustomDisplay(item);

                if (rowDom === null) {

                    item.label = this._onBlankValue(item.label, "<br>");

                    simplateRowTemplate = new Simplate(this[item.template]);
                    row = simplateRowTemplate.apply(item);
                    rowDom = domConstruct.toDom(row);

                    this.attributeContainer.appendChild(rowDom);

                    if (item.control) {
                        if (item.control.type && item.control.type === "Grid") {
                            // The Grid Requires the placeholder to already be attached to the form
                            if (item.control && item.control.type && item.control.type === "Grid") {
                                var ph = this._findControllerDom("items");
                                if (ph !== null) {
                                    lang.mixin(item.control.options, { placeHolder: ph });
                                    item.control = new GridView(item.control.options);
                                    dojoConnect.publish('sdata/form/setGrid', [item.control]);
                                    item.control.createGridView();
                                    item.control.grid.onLoadComplete=function () {
                                        item.control.grid.resize();
                                    };
                                }
                            }
                        }
                        else {
                            if (item.isDom) {
                                domConstruct.place(item.control, rowDom.lastElementChild.lastElementChild, 'only');
                                if (item.control.className.indexOf("dijitCheckBox") >= 0) {
                                    domClass.add(item.control.parentNode, "checkbox");
                                }
                            }
                            else {
                                domConstruct.place(item.control.domNode, rowDom.lastElementChild.lastElementChild, 'only');
                                if (item.control.domNode.className.indexOf("dijitCheckBox") >= 0) {
                                    domClass.add(item.control.domNode.parentNode, "checkbox");
                                }
                            }
                            if (item.control.startup) {
                                item.control.startup();
                            }
                        }
                    }
                    else {
                        domConstruct.place('<br>', rowDom.lastElementChild.lastElementChild, 'only');
                    }
                }
            }
        },

        isValid: function () {
            var valid = true;

            for (var i = 0; i < this.activeControls.length; i++) {
                var ob = this.activeControls[i];
                var obControl = ob.control;
                var customValidation = null;
                if (obControl !== null) {
                    customValidation = this.customValidation(ob);
                    if (customValidation === null) {
                        var validControl = true;
                        if (typeof (obControl.isValid) === "function") {
                            obControl.isValid(true);
                        }
                        if (typeof (obControl.onChanged) === "function") {
                            obControl.onChanged();
                        }
                        if (typeof (obControl.state) !== "undefined" && typeof (obControl.required) !== "undefined") {
                            validControl = validControl && obControl.state !== 'Error' && !(obControl.state === 'Incomplete' && obControl.required);
                        }
                        if (!validControl) {
                            obControl.set('state', 'Error');
                        }
                        valid = valid && validControl;
                    } else {
                        valid = valid && customValidation;
                    }
                    if (valid && obControl.saveIfValid) {
                        if (obControl.editMode !== null && typeof (obControl.editMode) !== "undefined" &&
                            ((obControl.editMode && obControl.saveIfValid.update) ||
                            (!obControl.editMode && obControl.saveIfValid.insert))) {
                            obControl.save(this.formBase);
                        }
                    }
                }
            }
            return valid;
        },
        cancel: function (context) {
            var gridId = null;
            if (this.domNode && this.domNode.parentNode && this.domNode.parentNode.offsetParent && this.domNode.parentNode.offsetParent.id.indexOf('Dialog') >= 0) {
                gridId = this.domNode.parentNode.offsetParent.id;
            }
            else if (context.domNode && context.domNode.parentNode && context.domNode.parentNode.offsetParent && context.domNode.parentNode.offsetParent.id.indexOf('Dialog') >= 0) // context is passed when the 'x' button is pressed
            {
                gridId = context.domNode.parentNode.offsetParent.id;
            }
            if (gridId !== null) {
                if (dijit.byId(gridId).hideLoading) {
                    dijit.byId(gridId).hideLoading();
                }
                dijit.byId(gridId).hide();
            }
        },

        // return the first node whose bounding client rectangle elements are not zero sum, if none exist return the first node.
        _grabCorrectElementAndPlace: function (control, nodeName) {
            var nodeArr = document.getElementsByName(nodeName);
            var node = nodeArr[0];
            var exit = false;
            for (var i = 0; i < nodeArr.length && !exit; i++) {
                var br = nodeArr[i].getBoundingClientRect();
                var sum = br.bottom + br.height + br.left + br.right + br.top + br.width;
                if (sum > 0) {//assume the node is the correct one
                    node = nodeArr[i];
                    exit = true;
                }
            }
            domConstruct.place(control.domNode, node, 'only');
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
            var strQuery = dString.substitute(strTemplate, [controlAttachPointName]);

            var sectionLimitor = null;
            if (this._DynamicSection) {
                sectionLimitor = this._DynamicSection;
            }
            else if (this.domNode) {
                sectionLimitor = this.domNode;
            }

            var result = null;
            if (sectionLimitor) {
                result = query(strQuery, sectionLimitor);
            }
            else {
                result = query(strQuery);
            }

            if (typeof (result) !== "undefined" && result !== null &&
                typeof (result.length) !== "undefined" && result.length !== null && result.length > 0) {

                return result[0]; //return first
            }

            return null;
        },
        _showHideElementsByNames: function (context, names, isHiding, nodeToHide) {
            if (lang.isArray(names)) {
                for (var idx = 0; idx < names.length; idx++) {
                    var hs_i = names[idx];
                    context._showHideElementsByNamesHelper(context, hs_i, isHiding, nodeToHide);
                }
            }
            else {
                context._showHideElementsByNamesHelper(context, names, isHiding, nodeToHide);
            }
        },
        _showHideElementsByNamesHelper: function (context, name, isHiding, nodeToHide) {
            var i = context._getIndexFromActivityListFromName(name);
            if (i > -1) {
                var control = context.activeControls[i].control;
                if (!context.activeControls[i].isDom) {
                    control = control.domNode;
                }
                if (nodeToHide !== null && typeof (nodeToHide) !== "undefined") {
                    switch (nodeToHide.toLowerCase()) {
                        case "parent":
                            control = control.parentNode;
                            break;
                        case "grandparent":
                            control = control.parentNode.parentNode;
                            break;
                    }
                }
                if (isHiding) {
                    context.domClass.add(control, "display-none");
                    context.domClass.remove(control, "display");
                }
                else {
                    context.domClass.add(control, "display");
                    context.domClass.remove(control, "display-none");
                }
            }
        },

        _adjustForValuesMatchingBooleanDefaultsMissing: function (typeStoreDataElement, strVar) {
            var hasValueStoredAsText = typeof (typeStoreDataElement) !== "undefined" &&
                (typeof (typeStoreDataElement[strVar]) !== "undefined" &&
                (this.dataTypeData !== null && typeof (this.dataTypeData[strVar]) === "undefined"));
            if (hasValueStoredAsText) {
                this.dataTypeData[strVar] = false;
            }
        },
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

        getActiveValues: function () {
            var retObj = {};
            for (var i = 0; i < this.activeControls.length; i++) {
                lang.mixin(retObj, this._getActiveValue(this.activeControls[i]));
            }

            lang.mixin(retObj, this._getActiveValuesAdjustments());

            if (typeof (this.hiddenValues) === "object") {
                for (var y = 0; y < this.hiddenValues.length; y++) {
                    var hval = this.hiddenValues[y];
                    lang.mixin(retObj, hval);
                }
            }
            return retObj;
        },
        _getActiveValue: function (ob) {
            var retObj = {};

            if (ob.Include && ob.control !== null) {
                var propName = ob.name;
                var dClass = ob.control.declaredClass;
                if (dClass.indexOf("DndSortList") >= 0) {
                    var sourceToGrab = ob.control.getSource(0);
                    if (sourceToGrab) {
                        retObj = ob.control.getASourcesContentsInString(sourceToGrab);
                    }
                }
                if (dClass.indexOf("TextBox") >= 0) {
                    retObj = ob.control.getValue();
                    if (retObj === null || typeof (retObj) === "undefined") {
                        retObj = "";
                    }
                }
                if (dClass.indexOf("TextArea") >= 0) {
                    if (propName === "Template") {
                        retObj = this._convertDotToLegacy(ob.control.textbox.value);
                    }
                    else {
                        retObj = ob.control.value;
                    }
                }
                if (dClass.indexOf("DisplayName") >= 0) {
                    retObj = ob.control.getDetails();
                }
                if (dClass.indexOf("CheckBox") >= 0) {
                    retObj = ob.control.checked;
                }
                if (dClass.indexOf("FilteringSelect") >= 0) {
                    retObj = ob.control.value === null ? "" : ob.control.value;
                }
                if (dClass.indexOf("ComboBox") >= 0) {
                    retObj = ob.control.value === null ? "" : ob.control.value;
                    if (propName === "PickList" && ob.control.store.query(function (a) { return a.name === retObj; }).id !== "000new") {
                        propName = "PickListName";
                    }
                }
                if (dClass.indexOf("PropertyDropDown") >= 0) {
                    var entityProperty = ob.control.entitySelected.displayedValue;
                    var valueArr = entityProperty.split('.');
                    var strProperty = valueArr[valueArr.length - 1];
                    var strEntity = valueArr[valueArr.length - 2];

                    if (typeof (strProperty) !== "undefined") {
                        retObj = strProperty;
                    }
                    if (typeof (strEntity) !== "undefined") {
                        retObj = strEntity;
                    }
                }
                if (dClass.indexOf("GridView") >= 0) {
                    var subObjs = [];
                    var gridStore = {};
                    gridStore = ob.control.getStore();
                    if (gridStore.data) {
                        gridStore = gridStore.data;
                        for (var x = 0; x < gridStore.length; x++) {
                            var obj = gridStore[x];
                            if (typeof (obj) !== "undefined") {
                                if (typeof (obj["undefined"]) !== "undefined") {
                                    delete obj["undefined"];
                                }
                                var arrExists = this._oformData[propName].filter(function (r) {
                                    return r.$key === obj.$key;
                                });
                                if (typeof (obj.$key) !== "undefined" && arrExists.length <= 0) {
                                    delete obj.$key;
                                }
                                if (typeof (obj.filter) !== "undefined" && obj.filter === null) {
                                    delete obj.filter;
                                }
                                // remove because these fields are auto generated from metadata
                                if (typeof (obj.$updated) !== "undefined") {
                                    delete obj.$updated;
                                }
                                if (typeof (obj.$httpStatus) !== "undefined") {
                                    delete obj.$httpStatus;
                                }
                                if (typeof (obj.$etag) !== "undefined") {
                                    delete obj.$etag;
                                }
                                if (typeof (obj.$descriptor) !== "undefined") {
                                    delete obj.$descriptor;
                                }
                                subObjs.push(obj);
                            }
                        }
                    }
                    retObj = subObjs;
                }
                var sdataFieldPath = [propName];
                if (ob.sdataPath && ob.sdataPath.dot) {
                    sdataFieldPath = ob.sdataPath.dot.split('.');
                }
                return this._setToObjectPath(sdataFieldPath, retObj, propName, 1, false);
            }
            return null;
        },

        _setToObjectPath: function (path, value, propName, last, stringifyValue) {
            var strTmplt = '"${0}":${1}',
                itm,
                lastValue = last,
                strEscapes = "",
                parameterObject = {
                    propName: propName,
                    path: path,
                    builtUpPath: JSON.stringify(value),
                    skip: 1,
                    stringify: stringifyValue,
                    lineEscape: ""
                };

            var adjustedParams = this._changeObjectPathParameters(path, value, propName, last, stringifyValue);
            if (adjustedParams !== null) {
                parameterObject = lang.mixin(parameterObject, adjustedParams);
                if (parameterObject.stringify) {
                    strTmplt = '${0}:${1}';
                }
            }

            for (var i = parameterObject.path.length - parameterObject.skip; i >= lastValue; i--) {
                itm = parameterObject.path[i];
                strEscapes = parameterObject.stringify ? Array(i).join("\\\\") : "";
                if (typeof (itm) !== "undefined") {
                    if (parameterObject.builtUpPath.indexOf("{") !== 0 && i !== parameterObject.path.length - parameterObject.skip) {
                        parameterObject.builtUpPath = "{" + parameterObject.builtUpPath + "}";
                    }

                    if (parameterObject.stringify) {
                        itm = dString.substitute("${0}${1}${2}${0}${1}", [strEscapes, parameterObject.lineEscape, itm]);
                        if (i == lastValue) {
                            parameterObject.builtUpPath = dString.substitute("${0}${1}${2}${0}${1}", [strEscapes, parameterObject.lineEscape, parameterObject.builtUpPath]);
                        }
                    }
                    parameterObject.builtUpPath = dString.substitute(strTmplt, [itm, parameterObject.builtUpPath]);
                }
            }
            if (parameterObject.builtUpPath.indexOf("{") !== 0 && parameterObject.builtUpPath.indexOf("[") !== 0) {
                parameterObject.builtUpPath = "{" + parameterObject.builtUpPath + "}";
            }
            return JSON.parse(parameterObject.builtUpPath);
        },

        _getIndexFromActivityListFromName: function (name) {
            var retVal = -1;
            for (var ac_i = 0; ac_i < this.activeControls.length; ac_i++) {
                var ac_item = this.activeControls[ac_i];
                if (ac_item.name === name) {
                    return ac_i;
                }
            }
            return retVal;
        },


        _checkIfDuplicate: function (service, control, field) {
            var duplicateFound = false;
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(service);

            if (typeof (field) === "undefined" || field === null) {
                field = control.name;
            }

            if (this.formBase) {
                request.setResourceKind(this.formBase);

                var foundField = this.duplicateCheck.filter(function (d) { return d.field === field; });

                for (var ff_i = 0; foundField.length && ff_i < foundField.length; ff_i++) {
                    var ff_item = foundField[ff_i];

                    var data = this._getActiveValue(control);
                    if (typeof (data) !== "undefined" && data !== null && data !== {}) {
                        request.setQueryArg('where', dString.substitute(ff_item.where,[ff_item.ignoreCase?data[field].toLowerCase():data[field]]));

                        request.setQueryArg('startIndex', 0);
                        request.setQueryArg('count', 1);


                        request.read({
                            async: false,
                            scope: this,
                            success: function (data) {
                                if (typeof (data) !== 'undefined' && typeof (data.$resources) !== 'undefined' && data.$resources.length == 1) {
                                    duplicateFound = true;
                                    control.control.invalidMessage = dString.substitute(this.formNlsResource.picklistAlreadyExists, [data.$resources[0].name]);
                                    control.control.set('state', 'Error');
                                }
                                else {
                                    duplicateFound = false;
                                }
                            },
                            failure: function (data) {
                                duplicateFound = true;
                                control.control.invalidMessage = dString.substitute("Error: ${0}", ["Picklist Name:"]);
                                control.control.set('state', 'Error');
                            }
                        });
                    }


                }
            }
            return duplicateFound;
        },
        setControlValue: function (cntrlName, value) {
            var retArray = this.activeControls.filter(function (x) { return x.name === cntrlName; }),
                controlWrapper = null;
            if (retArray.length > 0) {
                controlWrapper = retArray[0];
            }

            if (controlWrapper !== null) {
                controlWrapper.control.set('value', value);
            }
        }
    });

    return widget;
});