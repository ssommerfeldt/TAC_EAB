/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/number',
    'dojo/i18n!./nls/MultiselectNumberParameterEditor',
    'dojo/text!./templates/MultiselectNumberParameterEditor.html',
    'Sage/MainView/ReportMgr/Crystal/_ParameterEditorBase',
    'Sage/MainView/ReportMgr/ReportManagerUtility',
    'dijit/form/MultiSelect',
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
    MultiSelect,
    Numeric,
    Utility
) {

    var __widgetTemplate = Utility.makeTemplateFromString(template);

    /**
    * Declare the MultiselectNumberParameterEditor class.
    * @constructor
    */
    var MultiselectNumberParameterEditor = declare('Sage.MainView.ReportMgr.Crystal.MultiselectNumberParameterEditor', [_ParameterEditorBase], {
        _nlsResources: nlsResources,
        widgetTemplate: __widgetTemplate,
        _minimum: null,
        _maximum: null,
        //Value attribute
        value: null,
        _setValueAttr: function (value) {
            this._set("value", value);
            //TODO: do something here
        },
        _getValueAttr: function () {
            var self = this;
            var value = null;
            this._promptParameter.currentValues = [];
            dojoArray.forEach(this.msSelectedValuesWidget.domNode, function (option, i) {
                var _id = option.value;
                if (!isNaN(_id) && _id !== "") {
                    value = self._getOriginalParameterValue(_id);
                    self._promptParameter.currentValues.push(value);
                }
                else {
                    var optionText = option.innerHTML;
                    value = self._getParameterValue(optionText);
                    self._promptParameter.currentValues.push(value);
                }
            });
            return this._promptParameter;
        },
        /**
        * StringParameterEditor class constructor.
        * @constructor
        * @param {Object} promptParameter - Parameter to be edited
        */
        constructor: function (promptParameter) {
            //Note that the base class constructor is automatically called prior to this.
            //console.log("MultiselectNumberParameterEditor constructor");
            //Add initialization of internal properties here.
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            //console.log("MultiselectNumberParameterEditor startup");
            this.inherited(arguments);
            //Set visibility of fields
            ReportManagerUtility.setDomNodeVisible(this.divValidationMessage, false);
            ReportManagerUtility.setDomNodeVisible(this.divCustomValues, this._allowCustomValues);
            //Multiselect            
            this._initializeValuesMultiselect();
            //Messages
            this._initializeMessages();
        },
        isValid: function () {
            var msg = "";
            var valid = true;
            if (!this._promptParameter.isOptionalPrompt && !this._promptParameter.allowNullValue) {
                if (this.msSelectedValuesWidget.domNode.length === 0) {
                    msg = nlsResources.txtPleaseSpecifyValue;
                    valid = false;
                }
            }
            this._showValidationMessage(msg);
            return valid;
        },
        _cmdAddCustom_OnClick: function () {
            var customValue = this.txtCustomValue.focusNode.textbox.value;
            if (customValue && customValue !== "") {
                var numberValue = dojoNumber.parse(customValue);
                if (this._valueWithinMinMaxRange(numberValue)) {
                    var option = dojo.doc.createElement("option");
                    option.innerHTML = numberValue;
                    option.value = "";
                    this.msSelectedValuesWidget.containerNode.appendChild(option);
                    this._showValidationMessage("");
                }
                else {
                    this._showValidationMessage(this._getMinMaxValidationMessage(numberValue));
                }
            }
            else {
                this._showValidationMessage(nlsResources.txtPleaseSpecifyValue);
            }
        },
        _cmdAdd_OnClick: function () {
            this.msSelectedValuesWidget.addSelected(this.msAvailableValuesWidget);
        },
        _cmdRemove_OnClick: function () {
            //Delete custom values that are selected
            dojoArray.forEach(this.msSelectedValuesWidget.domNode, function (option, i) {
                if (option.selected && (isNaN(option.value) || option.value === "")) {
                    dojo.destroy(option);
                }
            });
            //Move non-custom values that are selected from the selected values to the available values
            this.msAvailableValuesWidget.addSelected(this.msSelectedValuesWidget);
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
        _initializeValuesMultiselect: function () {
            var self = this;
            //dojo multiselect does not support datastores, so the values need to be added 'by hand'
            dojoArray.forEach(this._values, function (entry, i) {
                //Manually create an option element
                var option = dojo.doc.createElement('option');
                option.innerHTML = entry.description;
                option.value = entry._id;

                //If the id of the current value is in the initialIds collection,
                //set option as selected.
                dojoArray.some(self._initialIds, function (_id, i) {
                    if (entry._id === _id) {
                        option.selected = true;
                        return true;
                    }
                });
                self.msAvailableValues.appendChild(option);
            });

            //initialize the dojo multiselect
            this.msAvailableValuesWidget = new dijit.form.MultiSelect({}, this.msAvailableValues);
            dojo.setStyle(this.msAvailableValuesWidget.domNode, "width", "220px");
            this.msSelectedValuesWidget = new dijit.form.MultiSelect({}, this.msSelectedValues);
            dojo.setStyle(this.msSelectedValuesWidget.domNode, "width", "220px");

            //Move the selected items from the available values widget to the selected values widget.
            this.msSelectedValuesWidget.addSelected(this.msAvailableValuesWidget);

            //Add the custom initial values - these are values that should be displayed by default,
            //but are not in the collection of defaultValues.
            dojoArray.forEach(this._initialCustomValues, function (entry, i) {
                var customValue = entry.value;
                var option = dojo.doc.createElement("option");
                option.innerHTML = customValue;
                option.value = ""; //Don't change this. Custom values should have an empty string as the "value".
                option.selected = true;
                self.msSelectedValuesWidget.containerNode.appendChild(option);
            });
        }
    });
    return MultiselectNumberParameterEditor;
});