/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'Sage/Utility',
    'dojo/i18n!./nls/StringParameterEditor',
    'dojo/text!./templates/StringParameterEditor.html',
    'Sage/MainView/ReportMgr/Crystal/_ParameterEditorBase',
    'Sage/MainView/ReportMgr/ReportManagerUtility',
    'dojo/data/ItemFileWriteStore',
    'dijit/form/Select',
    'dijit/form/MultiSelect',
    'dijit/form/TextBox'
],
function (
    declare,
    array,
    dString,
    Utility,
    nlsResources,
    template,
    _ParameterEditorBase,
    ReportManagerUtility,
    ItemFileWriteStore

) {
    var __widgetTemplate = Utility.makeTemplateFromString(template);

    /**
    * Declare the StringParameterEditor class.
    * @constructor
    */
    var stringParameterEditor = declare('Sage.MainView.ReportMgr.Crystal.StringParameterEditor', [_ParameterEditorBase], {
        _nlsResources: nlsResources,
        widgetTemplate: __widgetTemplate,
        //Value attribute
        value: null,
        _setValueAttr: function (value) {
            this._set("value", value);
            //TODO: do something here
        },
        _getValueAttr: function () {
            var self = this;
            this._promptParameter.currentValues = [];
            var currentValue = this._getCurrentValue();
            if (currentValue === null) {
                currentValue = "";
            }
            var parameterValue = self._getParameterValue(currentValue);
            self._promptParameter.currentValues.push(parameterValue);
            return this._promptParameter;
        },
        /**
        * StringParameterEditor class constructor.
        * @constructor
        * @param {Object} promptParameter - Parameter to be edited
        */
        constructor: function (promptParameter) {
            //Note that the base class constructor is automatically called prior to this.
            //console.log("StringParameterEditor constructor");
            //Add initialization of internal properties here.
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            this.inherited(arguments);
            //this.txtCustomValue.value = "";
            //Set visibility of fields
            ReportManagerUtility.setDomNodeVisible(this.divValidationMessage, false);
            ReportManagerUtility.setDomNodeVisible(this.divSingleValue, false);
            ReportManagerUtility.setDomNodeVisible(this.divCustomValues, this._allowCustomValues);
            if (this._values.length > 0) {
                ReportManagerUtility.setDomNodeVisible(this.divSingleValue, true);
                this._initializeValuesDropdown();
            }
            else {
                if (this._initialValues && this._initialValues.length > 0) {
                    this.txtCustomValue.set('value', this._initialValues[0].value);
                }
            }
            //Messages
            this._initializeMessages();
        },
        isValid: function () {
            var valid = true;
            var msg = "";
            var currentValue = this._getCurrentValue();
            if (!this._allowCustomValues) {
                if (currentValue === null) {
                    msg = nlsResources.txtPleaseSpecifyValue;
                    valid = false;
                }
            }
            else {
                if (!this._valueWithinMinMaxLength(currentValue)) {
                    msg = this._getMinMaxValidationMessage(currentValue);
                    valid = false;
                }
            }
            this._showValidationMessage(msg);
            return valid;
        },
        _initializeMessages: function () {
            //Minimum / maximum values.
            var minMaxMessage = null;
            if (this._minimum && !this._maximum) {
                minMaxMessage = dojo.replace(nlsResources.txtTheMinimumLengthForThisField, [this._minimum]);
            }
            if (!this._minimum && this._maximum) {
                minMaxMessage = dojo.replace(nlsResources.txtTheMaximumLengthForThisField, [this._maximum]);
            }
            if (this._minimum && this._maximum) {
                minMaxMessage = dojo.replace(nlsResources.txtTheValueMustBeBetween, [this._minimum, this._maximum]);
            }
            this.spanMinMaxMessage.innerHTML = Sage.Utility.htmlEncode(minMaxMessage);
            ReportManagerUtility.setDomNodeVisible(this.divMinMaxMessage, (minMaxMessage !== null));
        },
        _valueWithinMinMaxLength: function (value) {
            if (this._minimum && (value.length < this._minimum)) {
                return false;
            }
            if (this._minimum && (value.length > this._maximum)) {
                return false;
            }
            return true;
        },
        _getMinMaxValidationMessage: function (value) {
            var validationMessage = "";
            if (this._minimum && (value.length < this._minimum)) {
                validationMessage = dojo.replace(nlsResources.txtTheMinimumLengthForThisField, [this._minimum]);
                return validationMessage;
            }
            if (this._maximum && (value.length > this._maximum)) {
                validationMessage = dojo.replace(nlsResources.txtTheMaximumLengthForThisField, [this._maximum]);
                return validationMessage;
            }
            return "";
        },
        _showValidationMessage: function (msg) {
            this.spanValidationMessage.innerHTML = Sage.Utility.htmlEncode(msg);
            ReportManagerUtility.setDomNodeVisible(this.divValidationMessage, (msg !== ""));
        },
        _getCurrentValue: function () {
            //If a custom value has been typed, it has precedence.
            //Otherwise, get the value from the values dropdown.
            var customValue = this.txtCustomValue.value;
            if (dojo.isString(customValue) && customValue !== "") {
                return customValue;
            }
            else {
                var _id = this.cmbValues.get('value');
                if (_id !== null && _id !== "" && _id !== "-1") {
                    //If _id is -1, it means that the user has not chosen an actual value, 
                    //but rather "..." is selected. If that is the case, ignore the value.
                    var value = this._getOriginalParameterValue(_id);
                    return value.discreteValue.actualValue;
                }
            }
            return null;
        },
        _getParameterValue: function (optionText) {
            var value = {
                className: "CrystalReports.ParameterFieldDiscreteValue",
                computedText: '\"' + optionText + '\"',
                description: optionText,
                displayText: optionText,
                discreteValue: {
                    actualValue: optionText,
                    actualValueType: "String",
                    value: optionText,
                    valueType: "String"
                }
            };
            return value;
        },
        _initializeValuesDropdown: function () {
            var items = dojo.clone(this._values); //Note we clone the object, as the datastore modifies it

            //If there are no initial values, we display a "..." value
            if (this._initialIds.length === 0) {
                items.unshift({
                    _id: '-1',
                    description: '...'
                });
            }

            var data = {
                identifier: "_id",
                label: "description",
                items: items
            };
            var store = new ItemFileWriteStore({ data: data });
            this.cmbValues.setStore(store);
            this.cmbValues.startup();

            //Apply "initial value", which should be selected when the parameter is displayed to the user
            var self = this;
            array.some(this._initialIds, function (_id, i) {
                self.cmbValues.attr('value', _id);
                return true;
            });

            if (this._initialIds.length === 0 && this._initialValues.length > 0 && this._allowCustomValues) {
                //This means that we have an initial value, but that initial value is not within the list of default values (hence, it is not in the initialIds collection).
                //If that is the case, that means the initial value is a custom value, so we set the custom value textbox accordingly:
                this.txtCustomValue.set('value', this._initialValues[0].value);
            }
        }
    });
    return stringParameterEditor;
});