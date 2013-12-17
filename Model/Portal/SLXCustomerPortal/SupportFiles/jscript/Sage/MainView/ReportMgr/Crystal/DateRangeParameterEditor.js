/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/i18n!./nls/DateRangeParameterEditor',
    'dojo/text!./templates/DateRangeParameterEditor.html',
    'Sage/MainView/ReportMgr/Crystal/_ParameterEditorBase',
    'Sage/MainView/ReportMgr/ReportManagerUtility',
    'Sage/MainView/ReportMgr/Crystal/CrystalReportsUtility',
    'Sage/Reporting/Enumerations',
    'Sage/Utility',
    'Sage/UI/Controls/DateTimePicker',
    'dijit/form/CheckBox'
],
function (
    declare,
    dojoArray,
    nlsResources,
    template,
    _ParameterEditorBase,
    ReportManagerUtility,
    CrystalReportsUtility,
    Enumerations,
    Utility,
    DateTimePicker,
    CheckBox
) {

    var __widgetTemplate = Utility.makeTemplateFromString(template);

    /**
    * Declare the DateRangeParameterEditor class.
    * @constructor
    */
    var dateRangeParameterEditor = declare('Sage.MainView.ReportMgr.Crystal.DateRangeParameterEditor', [_ParameterEditorBase], {
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
        * DateRangeParameterEditor class constructor.
        * @constructor
        * @param {Object} promptParameter - Parameter to be edited
        */
        constructor: function (promptParameter) {
            //Note that the base class constructor is automatically called prior to this.
            //console.log("DateRangeParameterEditor constructor");            
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            //console.log("DateRangeParameterEditor startup");
            this.inherited(arguments);

            //TODO: When editing an existing schedule, the include from and include to should be dynamically set
            this.chkIncludeFromRange.set('checked', true);
            this.chkIncludeToRange.set('checked', true);

            //Hide validation message
            ReportManagerUtility.setDomNodeVisible(this.divValidationMessage, false);

            if (this._promptParameter.currentValues.length === 1) {
                //We are editing a schedule
                if (this._promptParameter.currentValues[0].rangeValue) {
                    var currentValue = this._promptParameter.currentValues[0];
                    //From date
                    var dateValue = currentValue.rangeValue.beginValue;
                    dateValue = dateValue ? Utility.Convert.toDateFromString(dateValue) : null;
                    this.dtFromRange.set('value', dateValue);
                    this.chkIncludeFromRange.set('checked', (currentValue.rangeValue.lowerBoundType === Enumerations.SlxRangeBoundType.BoundInclusive));
                    this.chkNoLowerValue.set('checked', (dateValue === null));
                    //To date
                    dateValue = currentValue.rangeValue.endValue;
                    dateValue = dateValue ? Utility.Convert.toDateFromString(dateValue) : null;
                    this.dtToRange.set('value', dateValue);
                    this.chkIncludeToRange.set('checked', (currentValue.rangeValue.upperBoundType === Enumerations.SlxRangeBoundType.BoundInclusive));
                    this.chkNoUpperValue.set('checked', (dateValue === null));
                }
            }

            this._initializeMessages();
        },
        isValid: function () {
            console.log("isValid");
            var validationMessage = this._requiredFieldsCompleted();
            if (validationMessage === "") {
                validationMessage = this._valuesWithinMinMaxRange();
            }
            this.spanValidationMessage.innerHTML = Sage.Utility.htmlEncode(validationMessage);
            ReportManagerUtility.setDomNodeVisible(this.divValidationMessage, (validationMessage !== ""));
            return (validationMessage === "");
        },
        _initializeMessages: function () {
            var minMaxMessage = "";
            //Minimum / maximum dates.
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
            var validationMessage = "";
            if (!this._promptParameter.isOptionalPrompt && !this._promptParameter.allowNullValue) {
                if (this.dtFromRange.focusNode.value === "" && !this.chkNoLowerValue.checked) {
                    validationMessage = nlsResources.txtPleaseSpecifyFromValue;
                    return validationMessage;
                }
                if (this.dtToRange.focusNode.value === "" && !this.chkNoUpperValue.checked) {
                    validationMessage = nlsResources.txtPleaseSpecifyToValue;
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
            //console.log("_valuesWithinMinMaxRange");
            var fromRangeValue = this.dtFromRange.get('value');
            var toRangeValue = this.dtToRange.get('value');
            var validationMessage = "";
            //Check that both dates are greater than the minimum
            if (this._minimum && !this.chkNoLowerValue.checked && (fromRangeValue < this._minimum)) {
                validationMessage = dojo.replace(nlsResources.txtPleaseSpecifyDateGreater, [CrystalReportsUtility.getDateOnlyFormattedDate(this._minimum)]);
                return validationMessage;
            }
            if (this._minimum && !this.chkNoUpperValue.checked && (toRangeValue < this._minimum)) {
                validationMessage = dojo.replace(nlsResources.txtPleaseSpecifyDateGreater, [CrystalReportsUtility.getDateOnlyFormattedDate(this._minimum)]);
                return validationMessage;
            }

            //Check that both dates are greater than the maximum
            if (this._maximum && !this.chkNoUpperValue.checked && (toRangeValue > this._maximum)) {
                validationMessage = dojo.replace(nlsResources.txtPleaseSpecifyDateLesser, [CrystalReportsUtility.getDateOnlyFormattedDate(this._maximum)]);
                return validationMessage;
            }
            if (this._maximum && !this.chkNoLowerValue.checked && (fromRangeValue > this._maximum)) {
                validationMessage = dojo.replace(nlsResources.txtPleaseSpecifyDateLesser, [CrystalReportsUtility.getDateOnlyFormattedDate(this._maximum)]);
                return validationMessage;
            }

            //Check that the from date <= to date
            if (!this.chkNoLowerValue.checked && !this.chkNoUpperValue.checked) {
                if (fromRangeValue > toRangeValue) {
                    validationMessage = nlsResources.txtFromMustBeLessThanOrEqualToTo;
                    return validationMessage;
                }
            }
            return "";
        },
        _getParameterValue: function () {
            //console.log("_getParameterValue");
            var upperBoundType = this.chkNoUpperValue.checked ? Enumerations.SlxRangeBoundType.NoBound : this.chkIncludeToRange.checked ? Enumerations.SlxRangeBoundType.BoundInclusive : Enumerations.SlxRangeBoundType.BoundExclusive;
            var beginValueType = "DateTime";//this.chkNoLowerValue.checked ? "Empty" : "DateTime";
            var beginValue = this.chkNoLowerValue.checked ? null : this.dtFromRange.get('value');
            if (beginValue) {
                beginValue = Utility.Convert.toIsoStringFromDate(beginValue);
            }

            var lowerBoundType = this.chkNoLowerValue.checked ? Enumerations.SlxRangeBoundType.NoBound : this.chkIncludeFromRange.checked ? Enumerations.SlxRangeBoundType.BoundInclusive : Enumerations.SlxRangeBoundType.BoundExclusive;
            var endValueType = "DateTime";//this.chkNoUpperValue.checked ? "Empty" : "DateTime";
            var endValue = this.chkNoUpperValue.checked ? null : this.dtToRange.get('value');
            if (endValue) {
                endValue = Utility.Convert.toIsoStringFromDate(endValue);
            }

            var parameter = {
                className: "CrystalReports.ParameterFieldRangeValue",
                description: null,
                rangeValue: {
                    beginValue: beginValue,
                    beginValueType: beginValueType,
                    endValue: endValue,
                    endValueType: endValueType,
                    lowerBoundType: lowerBoundType,
                    upperBoundType: upperBoundType
                }
            };

            return parameter;
        },
        _chkNoLowerValue_OnCheck: function (isChecked) {
            this.chkIncludeFromRange.setAttribute("disabled", isChecked);
            this.chkNoUpperValue.setAttribute("disabled", isChecked);
        },
        _chkNoUpperValue_OnCheck: function (isChecked) {
            this.chkIncludeToRange.setAttribute("disabled", isChecked);
            this.chkNoLowerValue.setAttribute("disabled", isChecked);
        }
    });
    return dateRangeParameterEditor;
});