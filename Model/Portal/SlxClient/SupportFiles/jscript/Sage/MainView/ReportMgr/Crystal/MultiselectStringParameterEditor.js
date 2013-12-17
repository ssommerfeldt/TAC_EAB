/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/i18n!./nls/MultiselectStringParameterEditor',
    'dojo/text!./templates/MultiselectStringParameterEditor.html',
    'Sage/MainView/ReportMgr/Crystal/_ParameterEditorBase',
    'Sage/MainView/ReportMgr/ReportManagerUtility',
    'dojo/data/ItemFileWriteStore',
    'dijit/form/Select',
    'dijit/form/MultiSelect',
    'dijit/form/TextBox',
    'Sage/Utility'
],
function (
    declare,
    dojoArray,
    nlsResources,
    template,
    _ParameterEditorBase,
    ReportManagerUtility,
    ItemFileWriteStore,
    Select,
    MultiSelect,
    TextBox,
    Utility
) {

    var __widgetTemplate = Utility.makeTemplateFromString(template);

    /**
    * Declare the MultiselectStringParameterEditor class.
    * @constructor
    */
    var MultiselectStringParameterEditor = declare('Sage.MainView.ReportMgr.Crystal.MultiselectStringParameterEditor', [_ParameterEditorBase], {
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
            var value = null;
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
        * MultiselectStringParameterEditor class constructor.
        * @constructor
        * @param {Object} promptParameter - Parameter to be edited
        */
        constructor: function (promptParameter) {
            //Note that the base class constructor is automatically called prior to this.
            //console.log("MultiselectStringParameterEditor constructor");
            //Add initialization of internal properties here.
        },
        /*postCreate: function(){
            this.inherited(arguments);
            this._initializeValuesMultiselect();
        },*/

        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            //console.log("MultiselectStringParameterEditor startup");
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
            var customValue = this.txtCustomValue.get('value');
            if (customValue && customValue !== "") {
                if (this._valueWithinMinMaxLength(customValue)) {
                    var option = dojo.doc.createElement("option");
                    option.innerHTML = customValue;
                    option.value = customValue;
                    this.msSelectedValuesWidget.containerNode.appendChild(option);
                    this._showValidationMessage("");
                }
                else {
                    this._showValidationMessage(this._getMinMaxLengthValidationMessage(customValue));
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
            //TODO: Pending
            if (this._minimum && (value.length < this._minimum)) {
                return false;
            }
            if (this._maximum && (value.length > this._maximum)) {
                return false;
            }
            return true;
        },
        _getMinMaxLengthValidationMessage: function (value) {
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
                },
                rangeValue: {
                    beginValue: null,
                    beginValueType: "Empty",
                    endValue: null,
                    endValueType: "Empty",
                    lowerBoundType: "NoBound",
                    upperBoundType: "NoBound"
                }
            };
            return value;
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
                option.value = customValue;
                option.selected = true;
                self.msSelectedValuesWidget.containerNode.appendChild(option);
            });
        }
    });
    return MultiselectStringParameterEditor;
});