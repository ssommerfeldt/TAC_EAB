/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/number',
    'dojo/i18n!./nls/NumberParameterEditor',
    'dojo/text!./templates/NumberParameterEditor.html',
    'Sage/MainView/ReportMgr/Crystal/_ParameterEditorBase',
    'Sage/MainView/ReportMgr/ReportManagerUtility',
    'dojo/data/ItemFileWriteStore',
    'dijit/form/Select',
    'Sage/UI/Controls/Numeric',
    'Sage/Utility'
],
function (
    declare,
    dojoArray,
    dojoNumber,
    nlsResources,
    template,
    _ParameterEditorBase,
    ReportManagerUtility,
    ItemFileWriteStore,
    Select,
    Numeric,
    Utility
) {

    var __widgetTemplate = Utility.makeTemplateFromString(template);

    /**
    * Declare the NumberParameterEditor class.
    * @constructor
    */
    var numberParameterEditor = declare('Sage.MainView.ReportMgr.Crystal.NumberParameterEditor', [_ParameterEditorBase], {
        //_nlsResources: nlsResources,        
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
            if (currentValue) {
                var parameterValue = self._getParameterValue(currentValue);
                self._promptParameter.currentValues.push(parameterValue);
            }
            return this._promptParameter;
        },
        /**
        * StringParameterEditor class constructor.
        * @constructor
        * @param {Object} promptParameter - Parameter to be edited
        */
        constructor: function (promptParameter) {
            //Note that the base class constructor is automatically called prior to this.
            //console.log("NumberParameterEditor constructor");
            //Add initialization of internal properties here.
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            this.inherited(arguments);
            this.txtCustomValue.focusNode.textbox.value = "";

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
                    this.txtCustomValue.focusNode.textbox.value = this._initialValues[0].value;
                }
            }
            //Messages
            this._initializeMessages();
        },
        isValid: function () {
            var valid = true;
            var msg = "";
            if (!this._promptParameter.isOptionalPrompt && !this._promptParameter.allowNullValue) {

                var currentValue = this._getCurrentValue();
                if (currentValue === null) {
                    msg = nlsResources.txtPleaseSpecifyValue;
                    valid = false;
                }
                else {
                    if (!this._valueWithinMinMaxRange(currentValue)) {
                        msg = this._getMinMaxValidationMessage(currentValue);
                        valid = false;
                    }
                }
            }
            else {
                //The prompt is either optional or accepts null values, no need to validate.
                valid = true;
            }
            this._showValidationMessage(msg);
            return valid;
        },
        _initializeMessages: function () {
            //Minimum / maximum values.
            var minMaxMessage = null;
            if (this._minimum && !this._maximum) {
                minMaxMessage = dojo.replace(nlsResources.txtPleaseSpecifyNumberGreater, [this._minimum]);
            }
            if (!this._minimum && this._maximum) {
                minMaxMessage = dojo.replace(nlsResources.txtPleaseSpecifyNumberLesser, [this._maximum]);
            }
            if (this._minimum && this._maximum) {
                minMaxMessage = dojo.replace(nlsResources.txtPleaseSpecifyNumberBetween, [this._minimum, this._maximum]);
            }
            this.spanMinMaxMessage.innerHTML = Sage.Utility.htmlEncode(minMaxMessage);
            ReportManagerUtility.setDomNodeVisible(this.divMinMaxMessage, (minMaxMessage !== null));
        },
        _valueWithinMinMaxRange: function (numberValue) {
            if (this._minimum && (numberValue < this._minimum)) {
                return false;
            }
            if (this._maximum && (numberValue > this._maximum)) {
                return false;
            }
            return true;
        },
        _getMinMaxValidationMessage: function (numberValue) {
            var validationMessage = "";
            if (this._minimum && (numberValue < this._minimum)) {
                validationMessage = dojo.replace(nlsResources.txtPleaseSpecifyNumberGreater, [this._minimum]);
                return validationMessage;
            }
            if (this._maximum && (numberValue > this._maximum)) {
                validationMessage = dojo.replace(nlsResources.txtPleaseSpecifyNumberLesser, [this._maximum]);
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
            var customValue = this.txtCustomValue.focusNode.textbox.value;
            if (dojo.isString(customValue) && customValue !== "") {
                return dojoNumber.parse(customValue);
            }
            else {
                var _id = this.cmbValues.get('value');
                if (_id !== null && _id !== "" && _id !== "-1") {
                    //If _id is -1, it means that the user has not chosen an actual value, 
                    //but rather "..." is selected. If that is the case, ignore the value.
                    var value = this._getOriginalParameterValue(_id);
                    return dojoNumber.parse(value.discreteValue.actualValue);
                }
            }
            return null;
        },
        _getParameterValue: function (numberValue) {
            //TODO: Hardcoded Int32               
            var parameter = {
                className: "CrystalReports.ParameterFieldDiscreteValue",
                description: null,
                discreteValue: {
                    actualValue: numberValue,
                    actualValueType: "Int32",
                    value: numberValue,
                    valueType: "Int32"
                }
            };
            return parameter;
        },
        _initializeValuesDropdown: function () {
            var items = dojo.clone(this._values); //Note we clone the object, as the datastore modifies it
            //If there are no initial values, we display a "..." value
            if (this._initialValues.length === 0) {
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
            dojoArray.some(this._initialIds, function (_id, i) {
                self.cmbValues.attr('value', _id);
                return true;
            });
        }
    });
    return numberParameterEditor;
});