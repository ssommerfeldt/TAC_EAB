/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/text!./templates/CrystalReportParametersDialog.html',
    'dojo/i18n!./nls/CrystalReportParametersDialog',
    'Sage/Reporting/Enumerations',
    'Sage/MainView/ReportMgr/Common/_WizardDialogBase',
    'Sage/MainView/ReportMgr/Crystal/BooleanParameterEditor',
    'Sage/MainView/ReportMgr/Crystal/StringParameterEditor',
    'Sage/MainView/ReportMgr/Crystal/MultiselectStringParameterEditor',
    'Sage/MainView/ReportMgr/Crystal/DateParameterEditor',
    'Sage/MainView/ReportMgr/Crystal/DateRangeParameterEditor',
    'Sage/MainView/ReportMgr/Crystal/NumberParameterEditor',
    'Sage/MainView/ReportMgr/Crystal/MultiselectNumberParameterEditor',
    'dijit/Dialog',
    'dijit/form/Form',
    'Sage/Utility'
],
function (
    declare,
    dojoArray,
    template,
    nlsResources,
    Enumerations,
    _WizardDialogBase,
    BooleanParameterEditor,
    StringParameterEditor,
    MultiselectStringParameterEditor,
    DateParameterEditor,
    DateRangeParameterEditor,
    NumberParameterEditor,
    MultiselectNumberParameterEditor,
    Dialog,
    Form,
    Utility
) {

    var __widgetTemplate = Utility.makeTemplateFromString(template.replace('\n', ''));

    var crystalReportParametersDialog = declare('Sage.MainView.ReportMgr.Crystal.CrystalReportParametersDialog', [_WizardDialogBase], {
        id: 'dlgCrystalReportParameters',
        widgetTemplate: __widgetTemplate,
        _nlsResources: nlsResources,
        _helpIconTopic: 'RptscheduleWiz',
        _parameterWidgets: null,
        _parameters: null,
        _currentStep: Enumerations.CrystalReportWizardStep.Parameters,
        /**
        * CrystalReportParametersDialog class constructor.
        * @constructor
        */
        constructor: function (options) {
            this._initializeWizardOptions(options);
            this._parameterWidgets = [];
            //Load the parameters either from the parameters collection passed as argument or from the report metadata.
            this._parameters = (options.parameters && options.parameters.length > 0) ? options.parameters : options.reportMetadata.parameters;
        },

        destroy: function () {
            dojoArray.forEach(this._parameterWidgets, function (widget, i) {
                widget.destroyRecursive();
            });
            this._dialog.destroyRecursive();
            this.inherited(arguments);
        },

        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            //console.log("startup");
            this.inherited(arguments);
            this._loadPromptParameters();
        },

        isValid: function () {
            var valid = true;
            dojoArray.forEach(this._parameterWidgets, function (widget, i) {
                valid = valid && widget.isValid();
            });
            return valid;
        },

        //------------------------------------------------
        //Events.
        //------------------------------------------------


        //------------------------------------------------
        //Initialization functions.
        //------------------------------------------------

        _loadPromptParameters: function () {
            var self = this;
            dojoArray.forEach(this._parameters, function (parameter, i) {
                //'PM-' parameters are not supposed to be shown to the user. 
                //They are used internally by the report.
                if (!parameter.name.toUpperCase().startsWith('PM-')) {
                    console.log("Creating widget for parameter: " + parameter.name + " (" + parameter.parameterValueKind + "/" + parameter.valueRangeKind + ")");
                    var parameterWidget = self._getParameterEditor(parameter);
                    if (parameterWidget) {
                        parameterWidget.placeAt(self.paramsContainerDiv);
                        parameterWidget.startup();
                        self._parameterWidgets.push(parameterWidget);
                    } else {
                        console.error("This report uses parameters that are not currently supported.");
                    }

                }
            });
        },

        //------------------------------------------------
        //Internal functions.
        //------------------------------------------------

        _getDialogTitle: function () {
            return this._nlsResources.txtDialogTitle + " [" + this._reportMetadata.displayName + "]";
        },

        _getWizardStepResult: function () {
            var parameters = [];
            dojoArray.forEach(this._parameterWidgets, function (widget, i) {
                parameters.push(widget.get('value'));
            });
            var result = {
                parameters: parameters
            };
            return result;
        },

        _getParameterEditor: function (parameter) {

            switch (parameter.parameterValueKind) {
                case Enumerations.SlxParameterValueKind.BooleanParameter:
                    return new BooleanParameterEditor(parameter);
                case Enumerations.SlxParameterValueKind.StringParameter:
                    if (parameter.allowMultiValue) {
                        return new MultiselectStringParameterEditor(parameter);
                    }
                    else {
                        return new StringParameterEditor(parameter);
                    }
                    break;//Needed to avoid JSHint validation error
                case Enumerations.SlxParameterValueKind.DateParameter:
                    switch (parameter.valueRangeKind) {
                        case Enumerations.SlxParameterValueRangeKind.Range:
                            return new DateRangeParameterEditor(parameter);
                        case Enumerations.SlxParameterValueRangeKind.Discrete:
                            return new DateParameterEditor(parameter);
                        default:
                            console.error("Unknown parameter type: " + parameter.parameterValueKind + "/" + parameter.valueRangeKind);
                    }
                    break;//Needed to avoid JSHint validation error
                case Enumerations.SlxParameterValueKind.NumberParameter:

                    if (parameter.allowMultiValue) {
                        return new MultiselectNumberParameterEditor(parameter);
                    }
                    else {
                        return new NumberParameterEditor(parameter);
                    }
                    break;//Needed to avoid JSHint validation error
                default:
                    console.error("Unknown parameter type. valueKind:" + parameter.parameterValueKind + "/rangeKind:" + parameter.valueRangeKind + "/multiValue:" + parameter.allowMultiValue);
                    return null;
            }

        }

    });
    return crystalReportParametersDialog;
});