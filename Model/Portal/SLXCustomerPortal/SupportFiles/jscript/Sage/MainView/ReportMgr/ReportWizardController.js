﻿/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'Sage/UI/Dialogs',
    'dojo/string',
    'dojo/json',
    'dojo/_base/array',
    'Sage/Reporting/Enumerations',
    'Sage/Utility',
    'Sage/MainView/ReportMgr/Crystal/CrystalReportWizardController'
],
function (
    Dialogs,
    dojoString,
    dojoJson,
    dojoArray,
    Enumerations,
    Utility,
    CrystalReportWizardController
) {
    Sage.namespace('Sage.MainView.ReportMgr.ReportWizardController');
    dojo.mixin(Sage.MainView.ReportMgr.ReportWizardController, {
        /**
        * Initiates the report wizard.
        * @param {Object} options - Options for the function.
        * @param {string} options.reportId - The id of the report to be executed. Example: 'p6UJ9A0003V8'.
        * @param {string} options.triggerId - The id of the schedule to be edited. Example: 'fb66f331‐0a42‐4209‐a8b9‐d4acbce0da69'.
        * @param {Object} [options.reportOptions] - Report-specific options. These vary depending on the report type. See the corresponding wizard controller for more info.
        */
        startWizard: function (options) {
            if (!options) {
                return;
            }
            if (options.reportId) {
                //We are launching a new execution
                this._getReportMetadata(options.reportId, options.reportOptions);
            }
            else {
                if (options.triggerId) {
                    //We are editing an existing schedule
                    this._getReportSchedule(options.triggerId);
                }
                else {
                    //Nothing to do.
                    return;
                }
            }

        },
        /*
        * Async load of report schedule.
        */
        _getReportSchedule: function (triggerId) {
            var self = this;
            this._showLoadingIndicator('Loading Schedule Details'); //TODO: NLS
            var options = {
                triggerId: triggerId,
                success: function (entry) {
                    self._closeLoadingIndicator();
                    self._triggerReceived(entry);
                },
                failure: function (xhr) {
                    self._closeLoadingIndicator();
                    var errorMsg = self._getErrorMessage(xhr);
                    Dialogs.showError(errorMsg, 'Error'); //TODO: NLS                                        
                }
            };
            //var jobService = Sage.Services.getService('JobService');
            //jobService.getTrigger(options);
            var reportingService = Sage.Services.getService('ReportingService');
            reportingService.getSchedule(options);
        },
        _triggerReceived: function (trigger) {

            //Report info
            var pluginFamily = this._getParameterValue(trigger.parameters, "PluginFamily");
            var pluginName = this._getParameterValue(trigger.parameters, "PluginName");

            //Condition options
            var conditions = this._getParameterValue(trigger.parameters, "ReportConditions");
            conditions = conditions ? "[" + conditions + "]" : "[]"; //This is required as the serialized string is not a proper array, even if it represents a collection of objects.
            conditions = dojoJson.parse(conditions);
            var conditionsConnector = this._getParameterValue(trigger.parameters, "ConditionsConnector");

            //Convert dates from string to actual javascript date objects
            dojoArray.forEach(conditions, function (condition, j) {
                if (condition.dataType === Enumerations.FieldDataTypes.DateTime) {
                    //Deserialize
                    if (Utility.Convert.isDateString(condition.value)) {
                        condition.value = Utility.Convert.toDateFromString(condition.value);
                    }
                    if (Utility.Convert.isDateString(condition.fromRange)) {
                        condition.fromRange = Utility.Convert.toDateFromString(condition.fromRange);
                    }
                    if (Utility.Convert.isDateString(condition.toRange)) {
                        condition.toRange = Utility.Convert.toDateFromString(condition.toRange);
                    }
                }
            });

            //Parameter options
            var reportParameters = this._getParameterValue(trigger.parameters, "ReportParameters");
            reportParameters = reportParameters ? "[" + reportParameters + "]" : "[]"; //This is required as the serialized string is not a proper array, even if it represents a collection of objects.
            reportParameters = dojoJson.parse(reportParameters);

            //Export options
            var runAsUserId = this._getParameterValue(trigger.parameters, "RunAsUserId");
            var outputFormat = this._getParameterValue(trigger.parameters, "OutputFormat");

            //Schedule options
            var scheduleName = this._getParameterValue(trigger.parameters, "ScheduleName");
            //var scheduleDescription = trigger.$descriptor;

            //Launch wizard
            if (pluginName && pluginFamily) {
                var reportingService = Sage.Services.getService('ReportingService');
                var reportId = reportingService.getReportId(pluginFamily + ":" + pluginName);
                if (reportId) {
                    var reportOptions = {
                        scheduleOptions: {
                            executionType: Enumerations.ExecutionType.Scheduled,
                            trigger: trigger
                        },
                        exportOptions: {
                            outputFormat: outputFormat,
                            runAsUserId: runAsUserId
                        },
                        conditionOptions: {
                            conditions: conditions,
                            conditionsConnector: conditionsConnector
                        },
                        parameterOptions: {
                            parameters: reportParameters
                        }
                    };
                    console.dir(reportOptions);
                    this._getReportMetadata(reportId, reportOptions);
                }
                else {
                    Dialogs.showError('Cannot determine report id.'); //TODO: NLS
                }
            } else {
                Dialogs.showError('Cannot determine report name or family.'); //TODO: NLS   
            }
        },
        /**
        * Async load of Report details.
        */
        _getReportMetadata: function (reportId, reportOptions) {
            var self = this;
            this._showLoadingIndicator('Loading Report'); //TODO: NLS
            var options = {
                reportId: reportId,
                success: function (entry) {
                    self._reportMetadataReceived(entry, reportOptions);
                },
                failure: function (xhr) {
                    self._closeLoadingIndicator();
                    var errorMsg = self._getErrorMessage(xhr);
                    Dialogs.showError(errorMsg, 'Error'); //TODO: NLS                                        
                }
            };
            var reportingService = Sage.Services.getService('ReportingService');
            reportingService.getReportMetadata(options);
        },
        _getErrorMessage: function (xhr) {
            var errorMsg = "";
            if (xhr && xhr.status && xhr.statusText) {
                errorMsg = dojoString.substitute("Sorry, an error occured loading report: ${0} ${1}.", [xhr.status, xhr.statusText]); //TODO: NLS
            }
            return errorMsg;
        },
        _reportMetadataReceived: function (reportMetadata, reportOptions) {
            //Convert ISO dates to actual date objects.
            //The below is required because the reports 
            //sdata feed returns ISO instead of JSON dates.
            dojoArray.forEach(reportMetadata.reportFilters, function (preset, i) {
                dojoArray.forEach(preset.filterConditions, function (condition, j) {
                    if (condition.dataType === Enumerations.FieldDataTypes.DateTime) {
                        //Deserialize
                        if (Utility.Convert.isDateString(condition.value)) {
                            condition.value = Utility.Convert.toDateFromString(condition.value);
                        }
                        if (Utility.Convert.isDateString(condition.fromRange)) {
                            condition.fromRange = Utility.Convert.toDateFromString(condition.fromRange);
                        }
                        if (Utility.Convert.isDateString(condition.toRange)) {
                            condition.toRange = Utility.Convert.toDateFromString(condition.toRange);
                        }
                    }
                });
            });

            //If currentValues is null, initialize it to an empty collection to avoid runtime errors.
            dojoArray.forEach(reportMetadata.parameters, function (parameter, i) {
                if (!parameter.currentValues) {
                    parameter.currentValues = [];
                }
            });

            this._closeLoadingIndicator();
            var controller = this._getControllerInstance(reportMetadata, reportOptions);
            controller.startWizard();
        },
        _getControllerInstance: function (reportMetadata, reportOptions) {
            switch (reportMetadata.reportType) {
                case Enumerations.ReportTypes.CrystalReport:
                    return new CrystalReportWizardController(reportMetadata, reportOptions);
            }
        },
        _showLoadingIndicator: function (title) {
            //Dialog
            var progressDialog = dijit.byId('dlgReportLoading');
            if (progressDialog) {
                progressDialog.destroyRecursive();
            }
            progressDialog = new dijit.Dialog({
                id: 'progressDialog',
                title: title,
                style: 'width: 300px; height: 100px',
                closable: false
            });
            //Progress bar
            var progressBar = new dijit.ProgressBar({
                id: 'reportLoadingProgressBar',
                style: 'margin-top: 10px; margin-bottom: 20px',
                indeterminate: true
            });
            progressDialog.containerNode.appendChild(progressBar.domNode);
            progressDialog.show();
            dojo.style(progressDialog.closeButtonNode, 'display', 'none'); //Hide the "x" button that closes the dialog
            progressDialog.onCancel = function () { }; //Prevent the user from closing the dialog hitting ESC key
        },
        _closeLoadingIndicator: function () {
            var dlg = dijit.byId("progressDialog");
            if (dlg) {
                dlg.hide();
                dlg.destroyRecursive();
            }
        },
        _getParameterValue: function (parameters, parameterName) {
            var parameterValue = null;
            dojoArray.some(parameters, function (parameter, j) {
                if (parameter.name === parameterName) {
                    parameterValue = parameter.value;
                    return true;
                }
            });
            return parameterValue;
        }
    });
    return Sage.MainView.ReportMgr.ReportWizardController;
});