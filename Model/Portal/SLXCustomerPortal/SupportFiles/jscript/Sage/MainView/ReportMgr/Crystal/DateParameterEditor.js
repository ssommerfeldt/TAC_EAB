require({cache:{
'url:Sage/MainView/ReportMgr/Crystal/templates/DateParameterEditor.html':"<div>\r\n    <div data-dojo-attach-point=\"promptParameterContainer\" class=\"crystalParameterContainer\">\r\n        <div data-dojo-attach-point=\"paramsHeaderContainer\"></div>\r\n        <div data-dojo-attach-point=\"divMinMaxMessage\">\r\n            <span data-dojo-attach-point=\"spanMinMaxMessage\">&nbsp;</span>\r\n        </div>\r\n        <div>\r\n            <table data-dojo-attach-point=\"tblRange\" style=\"width:100%\">\r\n                <colgroup>\r\n                    <col style=\"width:1%\" />\r\n                    <col style=\"width:44%\" />\r\n                    <col style=\"width:10%\" />\r\n                    <col style=\"width:1%\" />\r\n                    <col style=\"width:44%\" />\r\n                </colgroup>\r\n                <tr>\r\n                    <td colspan=\"3\">\r\n                        <label data-dojo-attach-point=\"lblDiscreteStartRange\" style=\"font-weight:bold\">{%= Sage.Utility.htmlEncode($.txtStartOfRange) %}</label>\r\n                    </td>\r\n                    <td colspan=\"2\" data-dojo-attach-point=\"colEndDefaultValuesLabel\">\r\n                        <label style=\"font-weight:bold\">{%= Sage.Utility.htmlEncode($.txtEndOfRange) %}</label>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"rowRangeListItems\">\r\n                    <td></td>\r\n                    <td data-dojo-attach-point=\"colStartDefaultValues\">\r\n                        <div>\r\n                            <select dojotype=\"dijit.form.FilteringSelect\" data-dojo-attach-point=\"cboDiscreteStartRange\" style=\"width:90%\"></select>\r\n                            <span data-dojo-attach-point=\"lstErrorDiscreteStartRange\" class=\"display-none\" style=\"color:red\">*</span>\r\n                        </div>\r\n                    </td>\r\n                    <td colspan=\"2\"></td>\r\n                    <td data-dojo-attach-point=\"colEndDefaultValues\">\r\n                        <div>\r\n                            <select dojotype=\"dijit.form.FilteringSelect\" data-dojo-attach-point=\"cboEndRangeValues\" style=\"width:90%\"></select>\r\n                            <span data-dojo-attach-point=\"lstErrorEndRange\" class=\"display-none\" style=\"color:red\">*</span>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"rowStartEndOrValue\">\r\n                    <td colspan=\"3\">\r\n                        <label style=\"font-weight:bold\">{%= Sage.Utility.htmlEncode($.lblOrValue_Caption) %}</label><br />\r\n                    </td>\r\n                    <td colspan=\"2\" data-dojo-attach-point=\"rowToValueLabel\">\r\n                        <label style=\"font-weight:bold\">{%= Sage.Utility.htmlEncode($.lblOrValue_Caption) %}</label><br />\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"rowCustomRangeValues\">\r\n                    <td></td>\r\n                    <td data-dojo-attach-point=\"rowDiscreteFromRange\">\r\n                        <div shouldpublishmarkdirty=\"false\" dojotype=\"Sage.UI.Controls.DateTimePicker\" data-dojo-attach-point=\"dtDiscreteFromRange\" displaydate=\"true\"\r\n                             displaytime=\"false\" required=\"true\" style=\"width:90%\">\r\n                        </div>\r\n                        <span data-dojo-attach-point=\"errorDiscreteValue\" class=\"display-none\" style=\"color:red\">*</span>\r\n                    </td>\r\n                    <td colspan=\"2\"></td>\r\n                    <td data-dojo-attach-point=\"rowToRange\">\r\n                        <div shouldpublishmarkdirty=\"false\" dojotype=\"Sage.UI.Controls.DateTimePicker\" data-dojo-attach-point=\"dtToRange\" displaydate=\"true\"\r\n                             displaytime=\"false\" required=\"true\" style=\"width:90%\">\r\n                        </div>\r\n                        <span data-dojo-attach-point=\"errorEndRange\" class=\"display-none\" style=\"color:red\">*</span>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"rowIncludeRangeOptions\">\r\n                    <td></td>\r\n                    <td colspan=\"2\">\r\n                        <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkIncludeFromRange\" />\r\n                        <label>{%= Sage.Utility.htmlEncode($.txtIncludeThisValue) %}</label>\r\n                    </td>\r\n                    <td></td>\r\n                    <td>\r\n                        <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkIncludeToRange\" />\r\n                        <label>{%= Sage.Utility.htmlEncode($.txtIncludeThisValue) %}</label>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"rowUpperLowerRangeOptions\">\r\n                    <td></td>\r\n                    <td colspan=\"2\">\r\n                        <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkNoLowerValue\" dojoattachevent=\"onChange:_chkNoLowerValue_OnCheck\" />\r\n                        <label>{%= Sage.Utility.htmlEncode($.txtNoLowerValue) %}</label>\r\n                    </td>\r\n                    <td></td>\r\n                    <td>\r\n                        <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkNoUpperValue\" dojoattachevent=\"onChange:_chkNoUpperValue_OnCheck\" />\r\n                        <label>{%= Sage.Utility.htmlEncode($.txtNoUpperValue) %}</label>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"rowRangeValidationError\" class=\"display-none\">\r\n                    <td colspan=\"4\">\r\n                        <div>\r\n                            <label data-dojo-attach-point=\"lblRangeValidationError\" style=\"color:red\">{%= Sage.Utility.htmlEncode($.txtPleaseSpecifyValue) %}</label>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"rowAddRangeParameter\">\r\n                    <td colspan=\"4\"></td>\r\n                    <td>\r\n                        <div style=\"padding:5px\">\r\n                            <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"cmdAddRange\" dojoattachevent=\"onClick:_cmdAddRange_OnClick\"\r\n                                 style=\"float:right\">\r\n                                {%= Sage.Utility.htmlEncode($.txtAddRange) %}\r\n                            </div>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n            <table style=\"width:100%\">\r\n                <colgroup>\r\n                    <col style=\"width:1%\" />\r\n                    <col style=\"width:44%\" />\r\n                    <col style=\"width:10%\" />\r\n                    <col style=\"width:44%\" />\r\n                </colgroup>\r\n                <tr>\r\n                    <td colspan=\"4\">\r\n                        <div data-dojo-attach-point=\"transferBoxContainer\" style=\"height:auto\"></div>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"rowCustomValues\">\r\n                    <td></td>\r\n                    <td>\r\n                        <div>\r\n                            <label>{%= Sage.Utility.htmlEncode($.lblEnterValue_Caption) %}</label><br />\r\n                            <div shouldpublishmarkdirty=\"false\" dojotype=\"Sage.UI.Controls.DateTimePicker\" data-dojo-attach-point=\"dtCustomValue\" displaydate=\"true\"\r\n                                 displaytime=\"false\" required=\"true\" style=\"width:93%\">\r\n                            </div>\r\n                            <span data-dojo-attach-point=\"errorCustomDate\" class=\"display-none\" style=\"color:red\">*</span>\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n                        <br />\r\n                        <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"cmdAddCustom\" dojoattachevent=\"onClick:_cmdAddCustom_OnClick\">{%= Sage.Utility.htmlEncode(\">\") %}</div>\r\n                    </td>\r\n                    <td></td>\r\n                </tr>\r\n                <tr>\r\n                    <td></td>\r\n                    <td colspan=\"3\">\r\n                        <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\">\r\n                            <span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div>\r\n        <br />\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/ReportMgr/Crystal/DateParameterEditor", [
    'dojo/_base/declare',
    'dojo/_base/array',
    'Sage/MainView/ReportMgr/Crystal/ParameterHeaderWidget',
    'dojo/text!./templates/DateParameterEditor.html',
    'Sage/MainView/ReportMgr/Crystal/_ParameterEditorBase',
    'Sage/MainView/ReportMgr/ReportManagerUtility',
    'Sage/MainView/ReportMgr/Crystal/CrystalReportsUtility',
    'Sage/Utility',
    'Sage/Reporting/Enumerations',
    'dojo/string'
],
function (
    declare,
    dojoArray,
    ParameterHeaderWidget,
    template,
    _ParameterEditorBase,
    reportManagerUtility,
    crystalReportsUtility,
    utility,
    enumerations,
    dojoString
) {
    var __widgetTemplate = utility.makeTemplateFromString(template);
    /**
    * Declare the DateParameterEditor class.
    * @constructor
    */
    var dateParameterEditor = declare('Sage.MainView.ReportMgr.Crystal.DateParameterEditor', [_ParameterEditorBase], {
        widgetTemplate: __widgetTemplate,
        displayTime: false, //Used to determine whether or not time values are displayed in the date controls
        _selectedValues: [], //contains a list of selected values to be added to the parameters currentValues collection
        _validationMsg: "", //contains any validation error to be displayed to the UI
        _setValueAttr: function (value) {
            this._set("value", value);
        },
        _getValueAttr: function () {
            this._promptParameter.currentValues = [];
            if (this._selectedValues.length > 0) {
                var self = this;
                dojoArray.forEach(this._selectedValues, function (option, i) {
                    self._promptParameter.currentValues.push(self._getParameterValue(option));
                });
            } else {
                var option;
                if (this._paramDiscreteType) {
                    var dateValue = this._getDateValue(this.dtDiscreteFromRange, this.cboDiscreteStartRange.item);
                    if (dateValue) {
                        option = { range: null, value: dateValue.value };
                    }
                    else {
                        option = { range: null, value: "" };
                    }
                } else {
                    var range = this._getRangeValue();
                    if (range !== undefined && range !== null) {
                        option = { range: range, displayValue: range.displayValue, value: range.startValue ? range.startValue : range.endValue };
                    }
                    else {
                        option = { range: null, displayValue: "", value: "" };
                    }
                }
                this._promptParameter.currentValues.push(this._getParameterValue(option));
            }
            return this._promptParameter;
        },
        postCreate: function () {
            this.displayTime = this._promptParameter.parameterValueKind === enumerations.SlxParameterValueKind.DateTimeParameter;
            this.dtDiscreteFromRange.displayTime = this.displayTime;
            this.dtToRange.displayTime = this.displayTime;
            this.dtCustomValue.displayTime = this.displayTime;
            this.chkIncludeFromRange.set('checked', true);
            this.chkIncludeToRange.set('checked', true);
        },
        /**
        * DateParameterEditor class constructor.
        * @constructor
        * @param {Object} promptParameter - Parameter to be edited
        */
        constructor: function (promptParameter) {
            //Note that the base class constructor is automatically called prior to this.
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            if (this._started) return;

            this.inherited(arguments);
            var parameterHeaderWidget = new ParameterHeaderWidget({
                promptText: this._promptParameter.promptText,
                parameterFieldName: this._promptParameter.parameterFieldName
            }).placeAt(this.paramsHeaderContainer);

            switch (this.valueRangeKind) {
                case enumerations.SlxParameterValueRangeKind.Discrete:
                    if (this.allowMultiValue) {
                        reportManagerUtility.setDomNodeVisible(this.tblRange, false);
                    } else {
                        reportManagerUtility.setDomNodeVisible(this.colEndDefaultValues, false);
                        reportManagerUtility.setDomNodeVisible(this.rowIncludeRangeOptions, false);
                        reportManagerUtility.setDomNodeVisible(this.rowUpperLowerRangeOptions, false);
                        reportManagerUtility.setDomNodeVisible(this.colEndDefaultValuesLabel, false);
                        reportManagerUtility.setDomNodeVisible(this.rowToRange, false);
                        reportManagerUtility.setDomNodeVisible(this.rowToValueLabel, false);
                        reportManagerUtility.setDomNodeVisible(this.rowStartEndOrValue, this._allowCustomValues && this._values.length > 0);
                        reportManagerUtility.setDomNodeVisible(this.rowDiscreteFromRange, this._allowCustomValues);
                        this.lblDiscreteStartRange.textContent = this.lblSelectValue_Caption;

                        if (this._values.length > 0) {
                            crystalReportsUtility.initializeComboBoxValues(this._values, crystalReportsUtility.getRangeInitialValue(this._initialValues, false), this.cboDiscreteStartRange);
                            this.cboDiscreteStartRange.setAttribute("style", "width:55% !important;");
                            this.dtDiscreteFromRange.setAttribute("style", "width: 55% !important;");
                            dojo.connect(this.cboDiscreteStartRange, 'onBlur', this, '_cboDiscreteStartRange_OnChange', true);
                            dojo.connect(this.dtDiscreteFromRange, 'onChange', this, '_dtDiscreteStartRange_OnChange', true);
                        } else if (this.initialValues && this.initialValues.length > 0) {
                            //initials values is set on the list first if one is specified
                            this.dtDiscreteFromRange.set('value', this.initialValues[0]);
                        }
                        else {
                            this.dtDiscreteFromRange.setAttribute("style", "width: 55%!important;");
                        }
                    }
                    break;
                case enumerations.SlxParameterValueRangeKind.Range:
                case enumerations.SlxParameterValueRangeKind.DiscreteAndRange:
                    reportManagerUtility.setDomNodeVisible(this.rowStartEndOrValue, this._allowCustomValues && this._values.length > 0);
                    reportManagerUtility.setDomNodeVisible(this.rowCustomRangeValues, this._allowCustomValues);
                    if (this._values.length > 0) {
                        crystalReportsUtility.initializeComboBoxValues(this._values, this.allowMultiValue && this.mode !== "new" ? "" : crystalReportsUtility.getRangeInitialValue(this._initialValues, true), this.cboDiscreteStartRange);
                        dojo.connect(this.dtDiscreteFromRange, 'onChange', this, '_dtDiscreteFromRange_OnChange', true);
                        dojo.connect(this.cboDiscreteStartRange, 'onBlur', this, '_cboStartRange_OnChange', true);
                        crystalReportsUtility.initializeComboBoxValues(this._values, this.allowMultiValue && this.mode !== "new" ? "" : crystalReportsUtility.getRangeInitialValue(this._initialValues, false), this.cboEndRangeValues);
                        dojo.connect(this.dtToRange, 'onChange', this, '_dtEndRange_OnChange', true);
                        dojo.connect(this.cboEndRangeValues, 'onBlur', this, '_cboEndRange_OnChange', true);
                    }
                    break;
                default:
                    console.error(dojoString("Unknown parameter type: ${0}", [this.valueRangeKind]));
            }
            reportManagerUtility.setDomNodeVisible(this.divValidationMessage, false);
            reportManagerUtility.setDomNodeVisible(this.rowRangeListItems, this._values.length > 0);
            reportManagerUtility.setDomNodeVisible(this.rowAddRangeParameter, this.allowMultiValue);
            reportManagerUtility.setDomNodeVisible(this.rowCustomValues, this._allowCustomValues && this.allowMultiValue && !this._paramRangeType);

            if (this.allowMultiValue) {
                if (this._paramRangeType) {
                    //if this is a range type we can't add any initial values to the selected values list, as range only types don't allow discrete values
                    this._initialIds = [];
                }
                this.initializeTransferBoxWidget(this.transferBoxContainer, !this._paramRangeType);
            }
            this._assignDefaultRangeValues();
            this._initializeMessages();
        },
        isValid: function () {
            this._validationMsg = "";
            dojo.addClass(this.rowRangeValidationError, 'display-none');
            if (!this.isOptionalPrompt && !this.allowNullValue) {
                if (this.transferBox) {
                    this._selectedValues = this.transferBox.getSelectedValues();
                    if (this._selectedValues.length > 0) {
                        dojo.addClass(this.transferBox.errorValidation, 'display-none');
                    } else {
                        dojo.removeClass(this.transferBox.errorValidation, 'display-none');
                        this._validationMsg = this.txtPleaseSpecifyValue;
                    }
                } else {
                    if (this._verifyRequiredAssignments()) {
                        this._validateMinMaxRange();
                    }
                }
            }
            this.lblRangeValidationError.textContent = this._validationMsg;
            if (this._validationMsg !== "") {
                dojo.removeClass(this.rowRangeValidationError, 'display-none');
            }
            return this._validationMsg === "";
        },
        _assignDefaultRangeValues: function () {
            if (this.currentValues.length === 1) {
                if (this.currentValues[0].rangeValue) {
                    var currentValue = this.currentValues[0];
                    //From date
                    var dateValue = currentValue.rangeValue.beginValue;
                    dateValue = dateValue ? utility.Convert.toDateFromString(dateValue) : null;
                    this.chkIncludeFromRange.set('checked', (currentValue.rangeValue.lowerBoundType === enumerations.SlxRangeBoundType.BoundInclusive));
                    this.chkNoLowerValue.set('checked', (dateValue === null));

                    //To date
                    dateValue = currentValue.rangeValue.endValue;
                    dateValue = dateValue ? utility.Convert.toDateFromString(dateValue) : null;
                    this.chkIncludeToRange.set('checked', (currentValue.rangeValue.upperBoundType === enumerations.SlxRangeBoundType.BoundInclusive));
                    this.chkNoUpperValue.set('checked', (dateValue === null));

                }
            }
        },
        _cboDiscreteStartRange_OnChange: function () {
            var item = this.cboDiscreteStartRange.item;
            if (item && item.value !== "") {
                this.dtDiscreteFromRange.reset();
            }
        },
        _dtDiscreteStartRange_OnChange: function () {
            if (this.dtDiscreteFromRange.focusNode.value !== "") {
                this.cboDiscreteStartRange.attr('displayedValue', '');
            }
        },
        _cboStartRange_OnChange: function () {
            var item = this.cboDiscreteStartRange.item;
            if (item && item.value !== "") {
                this.dtDiscreteFromRange.reset();
            }
        },
        _cboEndRange_OnChange: function () {
            var item = this.cboEndRangeValues.item;
            if (item && item.value !== "") {
                this.dtToRange.reset();
            }
        },
        _dtDiscreteFromRange_OnChange: function () {
            if (this.dtDiscreteFromRange.focusNode.value !== "") {
                this.cboDiscreteStartRange.set('displayedValue', '');
            }
        },
        _dtEndRange_OnChange: function () {
            if (this.dtToRange.focusNode.value !== "") {
                this.cboEndRangeValues.set('displayedValue', '');
            }
        },
        _initializeMessages: function () {
            var minMaxMessage = this.getMinMaxInitializationMessage();
            this.spanMinMaxMessage.innerHTML = utility.htmlEncode(minMaxMessage);
            reportManagerUtility.setDomNodeVisible(this.divMinMaxMessage, (minMaxMessage !== ""));
        },
        _validateMinMaxRange: function () {
            if (this._paramDiscreteType) {
                var dateValue = this._getDateValue(this.dtDiscreteFromRange, this.cboDiscreteStartRange.item);
                if (dateValue) {
                    var minMaxMessage = this.getMinMaxInitializationMessage(dateValue.date);
                }
                return;
            }

            var fromRangeValue = this._getDateValue(this.dtDiscreteFromRange, this.cboDiscreteStartRange.item);
            var toRangeValue = this._getDateValue(this.dtToRange, this.cboEndRangeValues.item);
            //Check that both dates are greater than the minimum
            if (this._minimum && !this.chkNoLowerValue.checked && (fromRangeValue < this._minimum)) {
                this._validationMsg = dojo.replace(this.txtPleaseSpecifyDateGreater, [crystalReportsUtility.getDateOnlyFormattedDate(this._minimum)]);
            }
            if (this._minimum && !this.chkNoUpperValue.checked && (toRangeValue < this._minimum)) {
                this._validationMsg = dojo.replace(this.txtPleaseSpecifyDateGreater, [crystalReportsUtility.getDateOnlyFormattedDate(this._minimum)]);
            }

            //Check that both dates are greater than the maximum
            if (this._maximum && !this.chkNoUpperValue.checked && (toRangeValue > this._maximum)) {
                this._validationMsg = dojo.replace(this.txtPleaseSpecifyDateLesser, [crystalReportsUtility.getDateOnlyFormattedDate(this._maximum)]);
            }
            if (this._maximum && !this.chkNoLowerValue.checked && (fromRangeValue > this._maximum)) {
                this._validationMsg = dojo.replace(this.txtPleaseSpecifyDateLesser, [crystalReportsUtility.getDateOnlyFormattedDate(this._maximum)]);
            }

            //Check that the from date <= to date
            if (!this.chkNoLowerValue.checked && !this.chkNoUpperValue.checked) {
                if (fromRangeValue > toRangeValue) {
                    this._validationMsg = this.txtFromMustBeLessThanOrEqualToTo;
                }
            }
        },
        _getParameterValue: function (option) {
            var parameter = null;
            if (option.range) {
                parameter = {
                    className: enumerations.ParameterClassName.RangeValue,
                    description: option.displayValue,
                    rangeDateValue: dojoString.substitute("${0};${1}", [option.range.startValue ? option.range.startValue : "", option.range.endValue ? option.range.endValue : ""]),
                    rangeValue: {
                        beginValue: option.range.startValue,
                        beginValueType: this.beginValueType,
                        endValue: option.range.endValue,
                        endValueType: this.endValueType,
                        lowerBoundType: option.range.noLowerValue ? enumerations.SlxRangeBoundType.NoBound : option.range.includeFromRange ? enumerations.SlxRangeBoundType.BoundInclusive : enumerations.SlxRangeBoundType.BoundExclusive,
                        upperBoundType: option.range.noUpperValue ? enumerations.SlxRangeBoundType.NoBound : option.range.includeToRange ? enumerations.SlxRangeBoundType.BoundInclusive : enumerations.SlxRangeBoundType.BoundExclusive
                    }
                };
            } else {
                parameter = {
                    className: enumerations.ParameterClassName.DiscreteValue,
                    description: option.displayValue,
                    discreteDateValue: dojoString.substitute("${0};", [option.value]),
                    discreteValue: {
                        actualValue: option.value,
                        actualValueType: this.actualValueType,
                        value: option.value,
                        valueType: this.valueType
                    }
                };
            }
            return parameter;
        },
        _chkNoLowerValue_OnCheck: function (isChecked) {
            this.chkIncludeFromRange.setAttribute("disabled", isChecked);
            this.cboDiscreteStartRange.setAttribute("disabled", isChecked);
            this.chkNoUpperValue.setAttribute("disabled", isChecked);
            this.dtDiscreteFromRange.setAttribute("disabled", isChecked);
        },
        _chkNoUpperValue_OnCheck: function (isChecked) {
            this.chkIncludeToRange.setAttribute("disabled", isChecked);
            this.cboEndRangeValues.setAttribute("disabled", isChecked);
            this.chkNoLowerValue.setAttribute("disabled", isChecked);
            this.dtToRange.setAttribute("disabled", isChecked);
        },
        _cmdAddRange_OnClick: function () {
            if (this._verifyRequiredAssignments()) {
                dojo.addClass(this.rowRangeValidationError, 'display-none');
                var range = this._getRangeValue();
                var option = { range: range, displayValue: range.displayValue, value: range.startValue ? range.startValue : range.endValue };
                this._addToSelectedValues(option);
            } else {
                dojo.removeClass(this.rowRangeValidationError, 'display-none');
            }
        },
        _getRangeValue: function () {
            var startValue = this._getDateValue(this.dtDiscreteFromRange, this.cboDiscreteStartRange.item);
            var endValue = this._getDateValue(this.dtToRange, this.cboEndRangeValues.item);

            var startExists = startValue !== "";
            var endExists = endValue !== "";

            var range = [];

            if (!this.chkNoLowerValue.get('checked') && !this.chkNoUpperValue.get('checked') && startExists && endExists) {
                range = { startValue: startValue.value, endValue: endValue.value, displayValue: dojoString.substitute("[${0} .. ${1}]", [startValue.displayValue, endValue.displayValue]) };
            } else if (this.chkNoLowerValue.get('checked') && endExists) {
                range = { startValue: null, endValue: endValue.value, displayValue: dojoString.substitute("( .. ${0}]", [endValue.displayValue]) };
            } else if (this.chkNoUpperValue.get('checked') && startExists) {
                range = { startValue: startValue.value, endValue: null, displayValue: dojoString.substitute("[${0} .. )", [startValue.displayValue]) };
            }

            range.noLowerValue = this.chkNoLowerValue.checked;
            range.noUpperValue = this.chkNoUpperValue.checked;
            range.includeFromRange = this.chkIncludeFromRange.checked;
            range.includeToRange = this.chkIncludeFromRange.checked;

            return range;
        },
        _verifyRequiredAssignments: function () {
            if (this._paramDiscreteType) {
                this._validateDiscreteParameterType();
            } else {
                var startValue = this._getDateValue(this.dtDiscreteFromRange, this.cboDiscreteStartRange.item);
                var endValue = this._getDateValue(this.dtToRange, this.cboEndRangeValues.item);

                //only need to perform this validation if the parameter type is of Range or RangeAndDiscrete
                if (this.chkNoUpperValue.checked) {
                    if (startValue.displayValue) {
                        this._removeErrorMessages();
                        return true;
                    } else {
                        if (this._allowCustomValues) {
                            this.cboDiscreteStartRange.focus();
                            dojo.removeClass(this.lstErrorDiscreteStartRange, 'display-none');
                            dojo.addClass(this.lstErrorEndRange, 'display-none');
                        } else {
                            this.dtDiscreteFromRange.focus();
                            dojo.removeClass(this.errorDiscreteValue, 'display-none');
                            dojo.addClass(this.errorEndRange, 'display-none');
                        }
                    }
                    return false;
                }
                if (this.chkNoLowerValue.checked) {
                    if (endValue.displayValue) {
                        this._removeErrorMessages();
                        return true;
                    } else {
                        if (this._allowCustomValues) {
                            this.cboEndRangeValues.focus();
                            dojo.addClass(this.lstErrorDiscreteStartRange, 'display-none');
                            dojo.removeClass(this.lstErrorEndRange, 'display-none');
                        } else {
                            this.dtToRange.focus();
                            dojo.addClass(this.errorDiscreteValue, 'display-none');
                            dojo.removeClass(this.errorEndRange, 'display-none');
                        }
                    }
                    return false;
                }

                if (!startValue.displayValue || !endValue.displayValue || (this._isStartDatePriorToEndDate(startValue, endValue))) {
                    this._setRangeErrorMessageVisibility(startValue, endValue);
                    return false;
                } else {
                    dojo.addClass(this.allowMultiValue ? this.lstErrorDiscreteStartRange : this.errorDiscreteValue, 'display-none');
                    dojo.addClass(this.allowMultiValue ? this.lstErrorEndRange : this.errorEndRange, 'display-none');
                }
            }
            return true;
        },
        _validateDiscreteParameterType: function () {
            dojo.addClass(this.lstErrorDiscreteStartRange, 'display-none');
            dojo.addClass(this.errorDiscreteValue, 'display-none');
            if (this.dtDiscreteFromRange.focusNode.value === "" && (!this.cboDiscreteStartRange.item)) {
                this._validationMsg = this.txtPleaseSpecifyValue;
                if (this._values.length > 0) {
                    dojo.removeClass(this.lstErrorDiscreteStartRange, 'display-none');
                    this.cboDiscreteStartRange.focus();
                } else {
                    dojo.removeClass(this.errorDiscreteValue, 'display-none');
                    this.dtDiscreteFromRange.focus();
                }
            } else {
                this._validateMinMaxRange();
                if (this._validationMsg !== "") {
                    if (this.dtDiscreteFromRange.focusNode.value !== "") {
                        dojo.removeClass(this.errorDiscreteValue, 'display-none');
                        this.dtDiscreteFromRange.focus();
                    } else {
                        dojo.removeClass(this.lstErrorDiscreteStartRange, 'display-none');
                        this.cboDiscreteStartRange.focus();
                    }
                }
            }
        },
        _removeErrorMessages: function () {
            dojo.addClass(this.errorDiscreteValue, 'display-none');
            dojo.addClass(this.errorEndRange, 'display-none');
            dojo.addClass(this.lstErrorDiscreteStartRange, 'display-none');
            dojo.addClass(this.lstErrorEndRange, 'display-none');
        },
        _isStartDatePriorToEndDate: function (startValue, endValue) {
            var startDate = utility.Convert.toDateFromString(startValue.value);
            var endDate = utility.Convert.toDateFromString(endValue.value);
            return startDate > endDate;
        },
        _setRangeErrorMessageVisibility: function (startValue, endValue) {
            this._validationMsg = this.txtPleaseSpecifyValue;
            if (!startValue.displayValue && !endValue.displayValue) {
                dojo.removeClass(this.allowMultiValue ? this.lstErrorDiscreteStartRange : this.errorDiscreteValue, 'display-none');
                dojo.removeClass(this.allowMultiValue ? this.lstErrorEndRange : this.errorEndRange, 'display-none');
                if (this.allowMultiValue) {
                    this.cboDiscreteStartRange.focus();
                } else {
                    this.dtDiscreteFromRange.focus();
                }
            } else if (!startValue.displayValue) {
                dojo.addClass(this.allowMultiValue ? this.lstErrorEndRange : this.errorEndRange, 'display-none');
                dojo.removeClass(this.allowMultiValue ? this.lstErrorDiscreteStartRange : this.errorDiscreteValue, 'display-none');
                this.dtDiscreteFromRange.focus();
            } else if (!endValue.displayValue) {
                dojo.addClass(this.allowMultiValue ? this.lstErrorDiscreteStartRange : this.errorDiscreteValue, 'display-none');
                dojo.removeClass(this.allowMultiValue ? this.lstErrorEndRange : this.errorEndRange, 'display-none');
                if (this.allowMultiValue) {
                    this.cboEndRangeValues.focus();
                } else {
                    this.dtToRange.focus();
                }
            } else {
                dojo.addClass(this.errorDiscreteValue, 'display-none');
                this.dtToRange.focus();
                this._validationMsg = this.txtFromMustBeLessThanOrEqualToTo;
            }
        },
        _getRangeDisplayValue: function () {
            var startValue = this._getDateValue(this.dtDiscreteFromRange, this.cboDiscreteStartRange.item);
            var endValue = this._getDateValue(this.dtToRange, this.cboEndRangeValues.item);
            if (!this.chkNoLowerValue.get('checked') && !this.chkNoUpperValue.get('checked')) {
                return dojoString.substitute("[${0} .. ${1}]", [startValue.displayValue, endValue.displayValue]);
            } else if (this.chkNoLowerValue.get('checked')) {
                return dojoString.substitute("( .. ${0}]", [endValue.displayValue]);
            } else {
                return dojoString.substitute("[${0} .. )", [startValue.displayValue]);
            }
        },
        _addToSelectedValues: function (option) {
            if (option) {
                if (this.valueWithinMinMaxRange(option.value)) {
                    var item = {
                        id: option.displayValue,
                        value: option.value,
                        displayValue: option.displayValue,
                        range: option.range,
                        __selected: true,
                        destroyOnRemove: false
                    };
                    this.transferBox.addNewItem(item, true);
                    this._showValidationMessage("");
                } else {
                    this._validateMinMaxRange();
                    this._showValidationMessage(this._validationMsg);
                }
            }
            else {
                this._showValidationMessage(this.txtPleaseSpecifyValue);
            }
        },
        _showValidationMessage: function (msg) {
            this.spanValidationMessage.innerHTML = utility.htmlEncode(msg);
            reportManagerUtility.setDomNodeVisible(this.divValidationMessage, (msg !== ""));
        },
        _cmdAddCustom_OnClick: function () {
            if (this.dtCustomValue.textbox.value === "") {
                dojo.removeClass(this.errorCustomDate, 'display-none');
                this._showValidationMessage(this.txtPleaseSpecifyValue);
                this.dtCustomValue.focus();
            } else {
                this._showValidationMessage("");
                dojo.addClass(this.errorCustomDate, 'display-none');
                var option = { range: null, displayValue: this.dtCustomValue.textbox.value, value: utility.Convert.toIsoStringFromDate(this.dtCustomValue.get('value')) };
                this._addToSelectedValues(option);
            }
        },
        _getDateValue: function (dtPicker, selectedItem) {
            var customValue = dtPicker.textbox.value;
            var result = "";
            if (customValue === "") {
                if (selectedItem && selectedItem.value !== "") {
                    result = { value: selectedItem.value, displayValue: selectedItem.description, date: utility.Convert.toDateFromString(selectedItem.value) };
                }
            } else {
                result = { displayValue: customValue, value: utility.Convert.toIsoStringFromDate(dtPicker.get('value')), date: dtPicker.get('value') };
            }
            return result;
        }
    });
    return dateParameterEditor;
});