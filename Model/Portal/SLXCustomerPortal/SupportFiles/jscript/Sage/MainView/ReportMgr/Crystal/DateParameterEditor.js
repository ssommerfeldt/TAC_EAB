/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/i18n!./nls/DateParameterEditor',
    'dojo/text!./templates/DateParameterEditor.html',
    'Sage/MainView/ReportMgr/Crystal/_ParameterEditorBase',
    'Sage/MainView/ReportMgr/ReportManagerUtility',
    'Sage/MainView/ReportMgr/Crystal/CrystalReportsUtility',
    'Sage/Utility'
],
function (
    declare,
    dojoArray,
    nlsResources,
    template,
    _ParameterEditorBase,
    ReportManagerUtility,
    CrystalReportsUtility,
    Utility
) {

    var __widgetTemplate = Utility.makeTemplateFromString(template);

    /**
    * Declare the DateParameterEditor class.
    * @constructor
    */
    var dateParameterEditor = declare('Sage.MainView.ReportMgr.Crystal.DateParameterEditor', [_ParameterEditorBase], {
        _nlsResources: nlsResources,
        widgetTemplate: __widgetTemplate,

        //Value attribute
        value: null,
        _setValueAttr: function (value) {
            this._set("value", value);
            //TODO: do something here
        },
        _getValueAttr: function () {
            this._promptParameter.currentValues = [];
            var value = this._getParameterValue();
            this._promptParameter.currentValues.push(value);
            return this._promptParameter;
        },
        /**
        * DateParameterEditor class constructor.
        * @constructor
        * @param {Object} promptParameter - Parameter to be edited
        */
        constructor: function (promptParameter) {
            //Note that the base class constructor is automatically called prior to this.
            //console.log("DateParameterEditor constructor");
            this._initialValues = [];
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            console.log("DateParameterEditor startup");
            this.inherited(arguments);

            //Hide validation message
            ReportManagerUtility.setDomNodeVisible(this.divValidationMessage, false);

            //Initial values
            var self = this;
            dojoArray.forEach(this._promptParameter.initialValues, function (initialValue, i) {
                var dateValue = Utility.Convert.toDateFromString(self._getDateOnlyIsoString(initialValue.discreteValue.actualValue));
                self._initialValues.push(dateValue);
            });

            //Initial values
            if (this._initialValues && this._initialValues.length > 0) {
                this.dtDate.set('value', this._initialValues[0]);
            }

            if (this._promptParameter.currentValues.length === 1) {
                //We are editing a schedule
                if (this._promptParameter.currentValues[0].discreteValue) {
                    var currentValue = this._promptParameter.currentValues[0];
                    var dateValue = currentValue.discreteValue.actualValue;
                    dateValue = dateValue ? Utility.Convert.toDateFromString(dateValue) : null;
                    this.dtDate.set('value', dateValue);
                }
            }

            this._initializeMessages();
        },
        isValid: function () {
            var validationMessage = this._requiredFieldsCompleted();
            if (validationMessage === "") {
                validationMessage = this._valuesWithinMinMaxRange();
            }
            this.spanValidationMessage.innerHTML = Sage.Utility.htmlEncode(validationMessage);
            ReportManagerUtility.setDomNodeVisible(this.divValidationMessage, (validationMessage !== ""));
            return (validationMessage === "");
        },
        _initializeMessages: function () {
            //Minimum / maximum dates.
            var minMaxMessage = null;
            if (this._minimum && !this._maximum) {
                minMaxMessage = dojo.replace(nlsResources.txtPleaseSpecifyDateLesser, [CrystalReportsUtility.getDateOnlyFormattedDate(this._minimum)]);
            }
            if (!this._minimum && this._maximum) {
                minMaxMessage = dojo.replace(nlsResources.txtPleaseSpecifyDateGreater, [CrystalReportsUtility.getDateOnlyFormattedDate(this._maximum)]);
            }
            if (this._minimum && this._maximum) {
                minMaxMessage = dojo.replace(nlsResources.txtPleaseSpecifyDateBetween, [CrystalReportsUtility.getDateOnlyFormattedDate(this._minimum), CrystalReportsUtility.getDateOnlyFormattedDate(this._maximum)]);
            }
            this.spanMinMaxMessage.innerHTML = Sage.Utility.htmlEncode(minMaxMessage);
            ReportManagerUtility.setDomNodeVisible(this.divMinMaxMessage, (minMaxMessage !== ""));
        },
        _requiredFieldsCompleted: function () {
            if (!this._promptParameter.isOptionalPrompt && !this._promptParameter.allowNullValue) {
                if (this.dtDate.focusNode.value === "") {
                    var validationMessage = nlsResources.txtPleaseSpecifyValue;
                    return validationMessage;
                }
            }
            else {
                //The prompt is either optional or accepts null values,
                //so there's no need to validate.
                return "";
            }
            return "";
        },
        _valuesWithinMinMaxRange: function () {
            var dateValue = this.dtDate.get('value');
            var validationMessage = null;

            if (this._minimum && (dateValue < this._minimum)) {
                validationMessage = dojo.replace(nlsResources.txtPleaseSpecifyDateGreater, [CrystalReportsUtility.getDateOnlyFormattedDate(this._minimum)]);
                return validationMessage;
            }
            if (this._maximum && (dateValue > this._maximum)) {
                validationMessage = dojo.replace(nlsResources.txtPleaseSpecifyDateLesser, [CrystalReportsUtility.getDateOnlyFormattedDate(this._maximum)]);
                return validationMessage;
            }
            return "";
        },
        _getParameterValue: function () {
            var dateValue = this.dtDate.get('value');
            var parameter = {
                className: "CrystalReports.ParameterFieldDiscreteValue",
                description: null,
                discreteValue: {
                    actualValue: Utility.Convert.toIsoStringFromDate(dateValue),
                    actualValueType: "DateTime",
                    value: Utility.Convert.toIsoStringFromDate(dateValue),
                    valueType: "DateTime"
                }
            };
            return parameter;
        }
    });
    return dateParameterEditor;
});