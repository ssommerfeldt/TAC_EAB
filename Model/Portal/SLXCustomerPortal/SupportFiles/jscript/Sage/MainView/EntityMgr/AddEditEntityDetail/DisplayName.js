require({cache:{
'url:Sage/MainView/EntityMgr/AddEditEntityDetail/templates/DisplayName.html':"\r\n[\r\n'<div>',\r\n    '<table class=\"detailTableContainer formtable HundredPercentWidth\">',\r\n        '<tr data-dojo-attach-point=\"_DisplaySection\">',\r\n\t\t    '<td class=\"FManagerDialogFieldLabel\">',\r\n\t\t\t    '<div style=\"padding:0 !important;\" class=\"lbl alignright\">',\r\n                    '<label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblDisplayName\"/>',\r\n\t\t\t\t'</div>',\r\n\t\t\t\t'<div class=\"fld dijitInline\" data-dojo-attach-point=\"displayNameTxtCntrl\"></div>',\r\n            '</td>',\r\n\t    '</tr>',\r\n        '<tr data-dojo-attach-point=\"_TriggerSection\">',\r\n\t\t    '<td class=\"FManagerDialogFieldLabel\">',\r\n\t\t\t    '<div style=\"padding:0 !important;\" class=\"lbl alignright\">',\r\n                    '<label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblTriggerName\"></label>',\r\n\t\t\t\t'</div>',\r\n\t\t\t\t'<div class=\"fld dijitInline\" data-dojo-attach-point=\"triggerCntrl\">',\r\n                    '<a data-dojo-attach-point=\"triggerCntrlLink\"></a>',\r\n                '</div>',\r\n            '</td>',\r\n\t    '</tr>',\r\n        '<tr data-dojo-attach-point=\"_LineSection\">',\r\n\t\t    '<td class=\"FManagerDialogFieldLabel\">',\r\n\t\t\t\t'<div style=\"padding:0 !important;\" class=\"lbl alignright\">',\r\n                    '<label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblName\"/>',\r\n\t\t\t\t '</div>',\r\n\t\t\t     '<div class=\"fld  dijitInline\" data-dojo-attach-point=\"NameCntrl\"/>',\r\n\t\t    '</td>',\r\n\t    '</tr>',\r\n    '</table>',\r\n'</div>'\r\n]"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, cookie */
define("Sage/MainView/EntityMgr/AddEditEntityDetail/DisplayName", [
    'dijit/_Widget',
    'Sage/_Templated',
    'dojo/string',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/text!./templates/DisplayName.html',
    'dojo/i18n!./nls/AddEditDialog',
    'Sage/UI/Controls/TextBox',
    'dojo/dom-class',
    'dojo/dom-construct'
],
function (
    _Widget,
    _Templated,
    dojoString,
    lang,
    declare,
    template,
    nlsResources,
    crmTextBox,
    domClass,
    domConstruct
) {
    var widget = declare('Sage.MainView.EntityMgr.AddEditEntityDetail.DisplayName', [_Widget, _Templated], {
        widgetTemplate: new Simplate(eval(template)),
        widgetsInTemplate: true,
        _nlsResources: nlsResources,
        _detailUtility: null,
        _nameField: null,
        _displayField: null,
        _grdField: null,
        _trigger: null,
        _GetLocalsQuery: null,
        _baseLanguage: "en-us",
        _updateFromGrid: false,
        _editMode: false,
        display: null,
        name: null,
        _dataStore: null,
        /*
            obj:
                -dUtility->The utility class that most of the entity dialogues use.
                -editMode->if editing will be true, if creating will be false.
                -query:
                    -entityName-> entityName
                    -resourceKind-> the resourceString
                    -name-> what the name value is called ie filterName for filters or metric
                    -displayName-> will probably always be displayName, but incase it is not here is where it is set.
                -values-> {display:{data:"",validation:()},name:{data:"",validation:()}}
                    -display.data->the default value given for the displayName field.
                    -name.data->the default value given for the name field.
                        -name is assumed to be the name that the object goes by in code, so a filter or metric's name would be filterName.
                    -validation->a custom validation function to use on the field.
        */
        constructor: function (obj) {
            this._baseLanguage = cookie.getCookie("SLXLanguageSetting");
            if (obj.editMode) {
                this._editMode = obj.editMode;
            }
            if (obj.dataStore) {
                this._dataStore = obj.dataStore;
            }
            if (obj.query) {
                this._GetLocalsQuery = obj.query;
            }
            if (obj.dUtility) {
                this._detailUtility = obj.dUtility;
            }
            if (obj.values) {
                if (obj.values.display) {
                    this.display = obj.values.display;
                }
                if (obj.values.name) {
                    this.name = obj.values.name;
                }
            }
            if (this.display) {
                this._createDisplayController(this.display);
            }
            if (this.name) {
                this._createNameController(this.name);
            }
        },
        postCreate: function () {
            //display name
            this.lblDisplayName.innerHTML = this._nlsResources['lblDisplay'];
            this.displayNameTxtCntrl.appendChild(this._displayField.domNode);
            domClass.add(this._TriggerSection, 'display-none');
            // name for identifying
            this.lblName.innerHTML = this._nlsResources['lblName'];
            this.NameCntrl.appendChild(this._nameField.domNode);

        },
        _createDisplayController: function (obj) {
            var value = obj.data,
               validator = obj.validation,
               isDisabled = obj.disabled,
               invalidMessage = obj.invalidMessage;
            if (typeof (obj.mapDisplayToName) === "function") {
                this.mapDisplayToName = obj.mapDisplayToName;
            }
            if (typeof (validator) !== "function") {
                validator = this._displayNameValidator;
            }
            if (typeof (invalidMessage) !== "string") {
                invalidMessage = "";
            }
            if (typeof (isDisabled) !== "boolean") {
                isDisabled = false;
            }
            var selfAware = this;
            this._displayField = new crmTextBox({
                shouldPublishMarkDirty: false,
                validator: validator,
                invalidMessage: invalidMessage,
                disabled: isDisabled,
                onChange: function () {
                    if (selfAware._nameField.textbox.value === "") {
                        selfAware._nameField.textbox.value = selfAware.mapDisplayToName(this.value, selfAware);
                        selfAware._nameField.isValid(true);
                        selfAware._nameField.onChange();
                    }
                }
            });
            var v = '';
            if (value) {
                v = value;
            }
            this._displayField.textbox.value = v;
        },
        _displayNameValidator: function (value, constraints) {
            return true;
        },
        _createNameController: function (obj) {
            var value = obj.data,
                validator = obj.validation,
                isDisabled = obj.disabled,
                invalidMessage = obj.invalidMessage;
            if (typeof (validator) !== "function") {
                validator = this._nameValidator;
            }
            if (typeof (invalidMessage) !== "string") {
                invalidMessage = "";
            }
            if (typeof (isDisabled) !== "boolean") {
                isDisabled = false;
            }
            var selfAware = this;
            // Validation will be to make sure not special characters or whitespaces are entered
            this._nameField = new crmTextBox(
                {
                    shouldPublishMarkDirty: false,
                    required: true,
                    validator: validator,
                    invalidMessage: invalidMessage,
                    disabled: isDisabled
                });
            var v = '';
            if (value) {
                v = value;
            }
            this._nameField.textbox.value = v;
        },
        _nameValidator: function (value, constraints) {
            // value needs to start with a letter or underscore, but can also contain numbers
            var regex = '^([a-z]|[A-Z]|_)(\\w)*';
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
        _trimWhiteSpace: function (val) {
            return val.replace(/\s+/g, '');
        },
        _cmdTrigger: function (context) {
            this._updateFromGrid = true;
            if (this.checked) { // checked means display the language grid
                this.innerHTML = context._nlsResources.hideTranslations;
                // Hide the textbox
                domClass.add(context.displayNameTxtCntrl, 'display-none');
                domClass.remove(context.displayNameTxtCntrl, 'display');
                domClass.add(context.displayNameGrdCntrl, 'display');
                domClass.remove(context.displayNameGrdCntrl, 'display-none');
                context._shrinkGridAsNeeded();
                context._grdField.grid.resize();
            }
            else { // not checked means display just the textbox
                this.innerHTML = context._nlsResources.showTranslations;
                domClass.add(context.displayNameTxtCntrl, 'display');
                domClass.remove(context.displayNameTxtCntrl, 'display-none');
                domClass.add(context.displayNameGrdCntrl, 'display-none');
                domClass.remove(context.displayNameGrdCntrl, 'display');
            }
            this.checked = !this.checked;
        },
        _createCustomValidationTextBox: function () {
            var selfAware = this,
                custText = declare("Sage.MainView.EntityMgr.AddEditEntityFilter.customValTxtBx", Sage.UI.Controls.TextBox, {
                    shouldPublishMarkDirty: false,
                    placeHolder: "Enter Value",
                    disabled: true,
                    onChange: function (v) {
                        var updateTxtControl = true;
                        var loc = selfAware._grdField.grid.store.index[this.domNode.parentNode.parentNode.children[1].innerHTML];
                        if (loc < 0) {
                            loc = selfAware._grdField.grid.store.index[selfAware._baseLanguage];
                            updateTxtControl = false;
                        }
                        selfAware._grdField.grid.store.data[loc].display = this.value;
                        if (updateTxtControl && selfAware._grdField.grid.store.data[loc].code === selfAware._baseLanguage) {
                            selfAware._displayField.textbox.value = selfAware._grdField.grid.store.data[loc].display;
                        }
                    }
                });
            return custText;
        },
        _createRequest: function (nameValue, select, language) {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(this._detailUtility.service);
            request.setResourceKind(this._GetLocalsQuery.resourceKind);
            request.setQueryArg('where', dojoString.substitute("lower(${0}) eq '${1}'", [this._GetLocalsQuery.name, nameValue]));
            if (select !== null) {
                request.setQueryArg('select', select);
            }
            if (language) {
                request.setQueryArg('language', language);
            }
            request.setQueryArg('startIndex', 0);
            request.setQueryArg('count', 1);
            return request;
        },
        isValid: function (forCreate) {
            var failed = false, error = null;
            if (!this._nameField.disabled) {
                var _nameFieldControlNotValid = !this._nameField.isValid(true);
                failed = failed || _nameFieldControlNotValid;

                // now make sure the state of the control is boiled now into a boolean value
                if (typeof (this._nameField.state) !== "undefined" && typeof (this._nameField.required) !== "undefined") {
                    _nameFieldControlNotValid = _nameFieldControlNotValid || this._nameField.state === 'Error' || (this._nameField.state === 'Incomplete' && this._nameField.required);
                    failed = failed || _nameFieldControlNotValid;
                }
                if (_nameFieldControlNotValid) {
                    this._nameField.set('state', 'Error'); // If the control is not valid, mark  it's state as error.
                }
                this._nameField.onChanged();
            }
            if (!this._displayField.disabled) {
                var _displayFieldControlNotValid = !this._displayField.isValid(true);
                failed = failed || _displayFieldControlNotValid;
                this._displayField.onChanged();
                // now make sure the state of the control is boiled now into a boolean value
                if (typeof (this._displayField.state) !== "undefined" && typeof (this._displayField.required) !== "undefined") {
                    _displayFieldControlNotValid = _displayFieldControlNotValid || this._displayField.state === 'Error' || (this._displayField.state === 'Incomplete' && this._displayField.required);
                    failed = failed || _displayFieldControlNotValid;
                }
                if (_displayFieldControlNotValid) {
                    this._displayField.set('state', 'Error'); // If the control is not valid, mark  it's state as error.
                }
                this._displayField.onChanged();
            }
            if (!failed) {
                var context = this;
                if (!this._editMode && typeof (this.dataStore) !== "undefined" && this.dataStore !== null) { //calling from New Entity wizard
                    var props = this.dataStore.query();
                    for (var i = 0; i < props.length; i++) {
                        if (this._nameField.value === props[i].propertyName) {
                            this._nameField.invalidMessage = dojoString.substitute("${0} ${1}", [context.lblName.innerHTML, context._nlsResources.notUnique]);
                            this._nameField.set('state', 'Error');
                            failed = true;
                            break;
                        }
                    }
                }
                else {
                    var request = this._createRequest(this._nameField.textbox.value.toLowerCase(), null, this._baseLanguage);
                    request.read({
                        async: false,
                        scope: this,
                        success: function (data) {
                            if (forCreate && typeof (data) !== 'undefined' && typeof (data.$resources) !== 'undefined' && data.$resources.length == 1) {
                                failed = true;
                                this._nameField.invalidMessage = dojoString.substitute("${0} ${1} ${2}", [context.lblName.innerHTML, context._nlsResources.notUniqueFor, context._GetLocalsQuery.entityName]);
                                this._nameField.set('state', 'Error');
                            }
                            else {
                                failed = false;
                            }
                        },
                        failure: function (data) {
                            failed = true;
                            this._nameField.invalidMessage = dojoString.substitute("${0} ${1} ${2}", [context.lblName.innerHTML, context._nlsResources.notUniqueFor, context._GetLocalsQuery.entityName]);
                            this._nameField.set('state', 'Error');
                        }
                    });
                }
            }
            return !failed;
        },
        getDetails: function () {
            var obj = {};
            // use the appropreate variable names.
            obj[this._GetLocalsQuery.displayName] = this._displayField.textbox.value;
            obj[this._GetLocalsQuery.name] = this._nameField.textbox.value;
            return obj;
        }
    });
    return widget;
});