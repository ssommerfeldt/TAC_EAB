require({cache:{
'url:Sage/MainView/ReportMgr/Crystal/templates/MultiSelectParameterEditor.html':"<div>\r\n    <div data-dojo-attach-point=\"promptParameterContainer\" class=\"crystalParameterContainer\">\r\n        <div data-dojo-attach-point=\"paramsHeaderContainer\"></div>\r\n        <div data-dojo-attach-point=\"divMinMaxMessage\">\r\n            <span data-dojo-attach-point=\"spanMinMaxMessage\">&nbsp;</span>\r\n        </div>\r\n        <div data-dojo-attach-point=\"parameterRangeDiv\" class=\"display-none\">\r\n            <div data-dojo-attach-point=\"parameterRangeWidgetContainer\" style=\"height:auto\"></div>\r\n            <div>\r\n                <label class=\"display-none\" data-dojo-attach-point=\"lblRangeValidationError\" style=\"color:red\">{%= Sage.Utility.htmlEncode($.txtPleaseSpecifyValue) %}</label>\r\n            </div>\r\n            <div style=\"padding:5px\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"cmdAddRange\" dojoattachevent=\"onClick:_cmdAddRange_OnClick\"\r\n                     style=\"float:right\">\r\n                    {%= Sage.Utility.htmlEncode($.txtAddRange) %}\r\n                </div>\r\n            </div>\r\n            <br />\r\n        </div>\r\n        <div data-dojo-attach-point=\"divMultipleValues\">\r\n            <table style=\"width:100%\">\r\n                <colgroup>\r\n                    <col style=\"width:1%\" />\r\n                    <col style=\"width:44%\" />\r\n                    <col style=\"width:10%\" />\r\n                    <col style=\"width:44%\" />\r\n                </colgroup>\r\n                <tr>\r\n                    <td colspan=\"4\">\r\n                        <div data-dojo-attach-point=\"transferBoxContainer\" style=\"height:auto\"></div>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"rowCustomValues\">\r\n                    <td></td>\r\n                    <td>\r\n                        <div>\r\n                            <label>{%= Sage.Utility.htmlEncode($.lblEnterValue_Caption) %}</label><br />\r\n                            <div data-dojo-attach-point=\"customValueContainer\"></div>\r\n                            <span data-dojo-attach-point=\"errorCustomDate\" class=\"display-none\" style=\"color:red\">*</span>\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n                        <br />\r\n                        <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"cmdAddCustom\" dojoattachevent=\"onClick:_cmdAddCustom_OnClick\">{%= Sage.Utility.htmlEncode(\">\") %}</div>\r\n                    </td>\r\n                    <td></td>\r\n                </tr>\r\n                <tr>\r\n                    <td></td>\r\n                    <td colspan=\"3\">\r\n                        <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\">\r\n                            <span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div>\r\n        <br />\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/ReportMgr/Crystal/MultiSelectParameterEditor", [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'dojo/number',
    'Sage/UI/Controls/Currency',
    'Sage/UI/Controls/TextBox',
    'Sage/MainView/ReportMgr/Crystal/ParameterHeaderWidget',
    'dojo/text!./templates/MultiSelectParameterEditor.html',
    'Sage/MainView/ReportMgr/Crystal/_ParameterEditorBase',
    'Sage/MainView/ReportMgr/ReportManagerUtility',
    'Sage/MainView/ReportMgr/Crystal/CrystalReportsUtility',
    'dijit/form/MultiSelect',
    'Sage/Utility',
    'Sage/MainView/ReportMgr/Crystal/ParameterRangeWidget',
    'Sage/Reporting/Enumerations'
],
function (
    declare,
    dojoArray,
    dojoString,
    dojoNumber,
    slxCurrency,
    slxTextBox,
    ParameterHeaderWidget,
    template,
    _ParameterEditorBase,
    reportManagerUtility,
    crystalReportsUtility,
    MultiSelect,
    utility,
    ParameterRangeWidget,
    enumerations
) {
    var __widgetTemplate = utility.makeTemplateFromString(template);
    /**
    * Declare the MultiSelectParameterEditor class.
    * @constructor
    */
    var multiSelectParameterEditor = declare('Sage.MainView.ReportMgr.Crystal.MultiSelectParameterEditor', [_ParameterEditorBase], {
        widgetTemplate: __widgetTemplate,
        parameterRangeWidget: null,
        isNumeric: false,
        isCurrency: false,
        txtCustomValue: null,
        customValueField: null,
        _setValueAttr: function (value) {
            this._set("value", value);
        },
        _getValueAttr: function () {
            var self = this;
            this._promptParameter.currentValues = [];
            dojoArray.forEach(this._selectedValues, function (option, i) {
                var parameterValue = self._getParameterValue(option);
                self._promptParameter.currentValues.push(parameterValue);
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
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            if (this._started) return;

            this.inherited(arguments);
            this.isNumeric = (this.parameterValueKind === enumerations.SlxParameterValueKind.NumberParameter);
            this.isCurrency = (this.parameterValueKind === enumerations.SlxParameterValueKind.CurrencyParameter);
            var parameterHeaderWidget = new ParameterHeaderWidget({
                promptText: this._promptParameter.promptText,
                parameterFieldName: this._promptParameter.parameterFieldName
            }).placeAt(this.paramsHeaderContainer);

            if (!this._paramDiscreteType) {
                reportManagerUtility.setDomNodeVisible(this.parameterRangeDiv, true);
                this.parameterRangeWidget = new ParameterRangeWidget({
                    paramInitialIds: this._initialIds,
                    paramInitialValues: this._initialValues,
                    paramValues: this._values,
                    defaultValues: this._promptParameter.defaultValues,
                    parameterValueKind: this._promptParameter.parameterValueKind,
                    allowCustomValues: this._allowCustomValues,
                    parameterPageId: this.paramId,
                    isAttachedToTransbox: this.mode !== "new"
                }, "parameterRangeWidget");
                this.parameterRangeWidget.placeAt(this.parameterRangeWidgetContainer);
            }
            this.initializeTransferBoxWidget(this.transferBoxContainer, !this._paramRangeType);

            //create the custom field and attach all events that need to associate with it.
            var inputId = dojoString.substitute("customControl_${id}", { id: this.paramId });
            this.customValueField = crystalReportsUtility.createCustomParameterInputControl(inputId, this.customValueContainer, this);
            this.txtCustomValue = crystalReportsUtility.getCustomParameterInputField(inputId, this.isCurrency, this.customValueField);
            if (this.isCurrency) {
                dojo.attr(this.customValueField, 'style', "width:97% !important;");
            }
            else {
                dojo.attr(this.customValueField, 'style', "width:95% !important;");
            }

            //subscribe to the parameter control destroy call that will be made in CrystalReportParametersDialog during the destroy phase.
            dojo.subscribe("entity/report/parameters/control/destroy", function (data) {
                if (data) {
                    if (data.id.indexOf("Multi") > -1) {
                        data._destroyObject();
                    }
                }
            });

            reportManagerUtility.setDomNodeVisible(this.divValidationMessage, false);
            reportManagerUtility.setDomNodeVisible(this.rowCustomValues, this._allowCustomValues && !this._paramRangeType);
            this._initializeMessages();
        },
        isValid: function () {
            var valid = true;
            var msg = "";
            if (!this._promptParameter.isOptionalPrompt && !this._promptParameter.allowNullValue) {
                this._selectedValues = this.transferBox.getSelectedValues();
                if (this._selectedValues.length > 0) {
                    dojo.addClass(this.transferBox.errorValidation, 'display-none');
                } else {
                    dojo.removeClass(this.transferBox.errorValidation, 'display-none');
                    msg = this.txtPleaseSpecifyValue;
                    valid = false;
                }
            }
            this._showValidationMessage(msg);
            return valid;
        },
        _onKeyPress: function (e) {
            if (!utility.restrictToNumberOnKeyPress(e, 'number')) {
                dojo.stopEvent(e);
            }
        },
        _initializeMessages: function () {
            var minMaxMessage = this.getMinMaxInitializationMessage();
            this.spanMinMaxMessage.innerHTML = utility.htmlEncode(minMaxMessage);
            reportManagerUtility.setDomNodeVisible(this.divMinMaxMessage, (minMaxMessage !== ""));
        },
        _showValidationMessage: function (msg) {
            this.spanValidationMessage.innerHTML = utility.htmlEncode(msg);
            reportManagerUtility.setDomNodeVisible(this.divValidationMessage, (msg !== ""));
        },
        _getParameterValue: function (option) {
            var parameter;
            if (option.range) {
                parameter = {
                    className: enumerations.ParameterClassName.RangeValue,
                    description: option.displayValue,
                    rangeValue: {
                        beginValue: option.range.startValue, //dojoNumber.parse(option.range.startValue.replace(/\D/g, '')),
                        beginValueType: this.beginValueType,
                        endValue: option.range.endValue, //.parse(option.range.endValue.replace(/\D/g, '')),
                        endValueType: this.endValueType,
                        lowerBoundType: option.range.noLowerValue ? enumerations.SlxRangeBoundType.NoBound : option.range.includeFromRange ? enumerations.SlxRangeBoundType.BoundInclusive : enumerations.SlxRangeBoundType.BoundExclusive,
                        upperBoundType: option.range.noUpperValue ? enumerations.SlxRangeBoundType.NoBound : option.range.includeToRange ? enumerations.SlxRangeBoundType.BoundInclusive : enumerations.SlxRangeBoundType.BoundExclusive
                    }
                };
            } else {
                parameter = {
                    className: enumerations.ParameterClassName.DiscreteValue,
                    description: option.displayValue,
                    discreteValue: {
                        actualValue: option.value, //dojoNumber.parse(option.value),
                        actualValueType: this.actualValueType,
                        value: option.value, //dojoNumber.parse(option.value),
                        valueType: this.valueType
                    }
                };
            }
            return parameter;
        },
        _cmdAddRange_OnClick: function () {
            this.lblRangeValidationError.textContent = this.txtPleaseSpecifyValue;
            if (this.parameterRangeWidget.verifyRequiredAssignments()) {
                if (this.parameterRangeWidget.validateRangeWithinBoundaries()) {
                    var msg = this.parameterRangeWidget.validateBasedOnSubContainers();
                    if (msg.length > 0) {
                        dojo.removeClass(this.lblRangeValidationError, 'display-none');
                        this.lblRangeValidationError.textContent = msg;
                    }
                    else {
                        dojo.addClass(this.lblRangeValidationError, 'display-none');
                        var range = this.parameterRangeWidget.getRangeValue();
                        if (this.isNumeric) {
                            range.startValue = range.startValue ? dojoNumber.parse(range.startValue.replace(/\D/g, '')) : null;
                            range.endValue = range.endValue ? dojoNumber.parse(range.endValue.replace(/\D/g, '')) : null;
                        }
                        var option = {
                            range: range,
                            displayValue: range.displayValue,
                            value: range.startValue ? range.startValue : range.endValue
                        };
                        this._addToSelectedValues(option);
                    }
                } else {
                    dojo.removeClass(this.lblRangeValidationError, 'display-none');
                    this.lblRangeValidationError.textContent = this.txtFromMustBeLessThanOrEqualToTo;
                }
            } else {
                dojo.removeClass(this.lblRangeValidationError, 'display-none');
            }
        },
        _cmdAddCustom_OnClick: function () {
            var value = null;
            var displayValue = null;
            if (this.isCurrency) {
                value = this.customValueField._supportingWidgets[0].value;
                displayValue = this.customValueField._supportingWidgets[0].displayedValue;
            }
            else {
                value = dojo.attr(this.txtCustomValue, 'value');
            }
            if (value === "") {
                dojo.removeClass(this.errorCustomDate, 'display-none');
                this._showValidationMessage(this.txtPleaseSpecifyValue);
                this.txtCustomValue.focus();
            } else {
                this._showValidationMessage("");
                dojo.addClass(this.errorCustomDate, 'display-none');
                var option = { value: value, displayValue: displayValue ? displayValue : value };
                this._addToSelectedValues(option);
            }
        },
        _addToSelectedValues: function (option) {
            if (option) {
                if (this.valueWithinMinMaxRange(option.value)) {
                    var msg = "";
                    if (this.isCurrency) {
                        msg = this.customValueField._supportingWidgets[0].message;
                    }

                    if (msg.length === 0) {
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
                    }
                    else {
                        this._showValidationMessage(msg);
                    }
                } else {
                    this._showValidationMessage(this.getMinMaxValidationMessage(option.value));
                }
            }
            else {
                this._showValidationMessage(this.txtPleaseSpecifyValue);
            }
        },
        _destroyObject: function () {
            if (this.customValueField) {
                this.customValueField.destroyRecursive();
            }
            if (this.parameterRangeWidget) {
                dojo.publish("entity/report/parameters/control/destroy", [this.parameterRangeWidget, this]);
            }
        }
    });
    return multiSelectParameterEditor;
});