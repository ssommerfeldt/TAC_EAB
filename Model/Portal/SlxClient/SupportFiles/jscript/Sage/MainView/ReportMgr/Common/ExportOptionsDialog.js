require({cache:{
'url:Sage/MainView/ReportMgr/Common/templates/ExportOptionsDialog.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"{%= $._getDialogTitle() %}\" dojoattachpoint=\"_dialog\" dojoattachevent=\"onCancel:_dialog_OnCancel\" style=\"width: 600px\">\r\n        <div data-dojo-type=\"dijit.form.Form\">\r\n            <div style=\"overflow:auto\">\r\n                <div dojoattachpoint=\"containerDiv\" id=\"containerDiv\" style=\"height:350px; overflow:auto\">\r\n                    <table cellspacing=\"10\">\r\n                        <tr dojoAttachpoint=\"trScheduleDescription\">\r\n                            <td>\r\n                                <label>{%= $._nlsResources.txtScheduleDescription_Caption %}:</label>\r\n                            </td>\r\n                            <td>\r\n                                <input type=\"text\" dojoAttachPoint=\"txtScheduleDescription\" required=\"true\" dojoType=\"dijit.form.TextBox\" style=\"width:300px\" />\r\n                            </td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>\r\n                                <label>{%= $._nlsResources.txtOutputFormat_Caption %}:</label>\r\n                            </td>\r\n                            <td>\r\n                                <select dojoType=\"dijit.form.Select\" dojoAttachPoint=\"cmbOutputFormat\" sortByLabel=\"false\" style=\"width:300px\" >\r\n                                </select>\r\n                            </td>\r\n                        </tr>\r\n                        <tr dojoAttachpoint=\"trRunAsUserId\">\r\n                            <td>\r\n                                <label>{%= $._nlsResources.txtRunAs_Caption %}:</label>\r\n                            </td>\r\n                            <td>\r\n                                <div dojoType=\"dijit.layout.ContentPane\" label=\"{%= $._nlsResources.txtRunAs_Caption %}\" dojoAttachPoint=\"container_lkpRunAsUserId\" style=\"padding: 0 !important;\"></div>                            \r\n                            </td>\r\n                        </tr>\r\n                        <tr dojoAttachpoint=\"trSchedulingWidget\">                            \r\n                            <td colspan=\"2\">\r\n                                <div data-dojo-type=\"Sage.UI.JobSchedulingWidget\" id=\"jobSchedulingWidget\" data-dojo-attach-point=\"jobSchedulingWidget\"></div>\r\n                            </td>\r\n                        </tr>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n            <div align=\"right\" style=\"margin-top:10px\">\r\n                <div data-dojo-type=\"dijit.form.Button\"dojoAttachPoint=\"cmdBack\" dojoAttachEvent=\"onClick:_cmdBack_OnClick\" >{%= Sage.Utility.htmlEncode($._nlsResources.cmdBack_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\"dojoAttachPoint=\"cmdNext\" dojoAttachEvent=\"onClick:_cmdNext_OnClick\">{%= Sage.Utility.htmlEncode($._nlsResources.cmdNext_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" dojoAttachPoint=\"cmdCancel\" dojoAttachEvent=\"onClick:_cmdCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($._nlsResources.cmdCancel_Caption) %}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/ReportMgr/Common/ExportOptionsDialog", [
    'dojo/_base/declare',
    'dojo/_base/array',
    'Sage/Reporting/Enumerations',
    'dojo/text!./templates/ExportOptionsDialog.html',
    'dojo/i18n!./nls/ExportOptionsDialog',
    'Sage/UI/Controls/Lookup',
    'Sage/MainView/ReportMgr/ReportManagerUtility',
    'dojo/data/ItemFileWriteStore',
    'Sage/MainView/ReportMgr/Common/_WizardDialogBase',
    'Sage/Utility',
    'Sage/UI/JobSchedulingWidget',
    'dijit/Dialog',
    'dijit/form/Form'
],
function (
    declare,
    dojoArray,
    enumerations,
    template,
    nlsResources,
    Lookup,
    reportManagerUtility,
    ItemFileWriteStore,
    _WizardDialogBase,
    utility,
    JobSchedulingWidget
) {
    var __widgetTemplate = utility.makeTemplateFromString(template);
    var exportOptionsDialog = declare('Sage.MainView.ReportMgr.Common.ExportOptionsDialog', [_WizardDialogBase], {
        id: 'dlgExportOptions',
        _nlsResources: nlsResources,
        _helpIconTopic: 'RptscheduleWiz',
        _currentStep: enumerations.CrystalReportWizardStep.ExportOptions,
        _scheduleOptions: null,
        _exportOptions: null,
        widgetTemplate: __widgetTemplate,
        /**
        * ExportOptionsDialog class constructor.
        * @constructor
        */
        constructor: function (options) {
            this._initializeWizardOptions(options);
            this._scheduleOptions = options.scheduleOptions;
            this._exportOptions = options.exportOptions;
        },
        destroy: function () {
            this.lkpRunAsUserId.destroyRecursive();
            this.cmbOutputFormat.destroyRecursive();
            if (this.jobSchedulingWidget) {
                this.jobSchedulingWidget.destroyRecursive();
            }
            this._dialog.destroyRecursive();
            this.inherited(arguments);
        },
        show: function () {
            this.jobSchedulingWidget.initialize({ trigger: this._scheduleOptions.trigger });
            this.inherited(arguments);
        },
        /**
        * This is a last method in the initialization process.
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            this.inherited(arguments);
            this._createRunAsLookup();
            this._setControlsVisibility();
            this._initializeOutputFormatDropdown();
            this._initializeTextboxes();
        },
        isValid: function () {
            var valid = true;
            if (this._scheduleOptions.executionType === enumerations.ExecutionType.Scheduled) {
                valid = this.jobSchedulingWidget.validateSchedule();
            }
            return valid;
        },
        //------------------------------------------------
        //Initialization functions.
        //------------------------------------------------
        _initializeTextboxes: function () {
            var scheduleDescription = this._scheduleOptions.trigger ? this._scheduleOptions.trigger.$descriptor : this.reportMetadata.displayName;
            this.txtScheduleDescription.set('value', scheduleDescription);
        },
        _initializeOutputFormatDropdown: function () {
            var outputFormats = reportManagerUtility.getOutputFormats(this.reportMetadata.reportType);
            var data = {
                identifier: "outputFormat",
                label: "caption",
                items: outputFormats
            };
            var store = new ItemFileWriteStore({ data: data });
            this.cmbOutputFormat.setStore(store);
            this.cmbOutputFormat.startup();

            //Set default output format, if specified
            if (this._exportOptions.outputFormat) {
                this.cmbOutputFormat.attr('value', this._exportOptions.outputFormat);
            }
        },
        _createRunAsLookup: function () {
            var runAsLookupConfig = {
                id: '_lkpRunAsUserId',
                structure: [
                    {
                        label: nlsResources.txtName,
                        field: 'UserInfo.UserName',
                        sortable: true,
                        width: "400px",
                        editable: false,
                        propertyType: "System.String",
                        excludeFromFilters: false,
                        defaultValue: ""
                    }
                ],
                gridOptions: {
                    contextualCondition: function () {
                        return 'Type ne 5 and Type ne 8 and Type ne 6';
                    },
                    contextualShow: '',
                    selectionMode: 'single'
                },
                storeOptions: {
                    resourceKind: 'users',
                    include: ['UserInfo'],
                    sort: [{ attribute: 'UserInfo.UserName' }]
                },
                isModal: true,
                preFilters: [],
                returnPrimaryKey: true,
                dialogTitle: nlsResources.txtSelectUser,
                dialogButtonText: nlsResources.txtOK
            };
            this.lkpRunAsUserId = new Lookup({
                id: 'lkpRunAsUserId',
                readonly: false,
                config: runAsLookupConfig
            });
            dojo.place(this.lkpRunAsUserId.domNode, this.container_lkpRunAsUserId.domNode, 'only');

            //Set run as user
            if (this._exportOptions.runAsUserId) {
                var user = reportManagerUtility.getUser(this._exportOptions.runAsUserId);
                this.lkpRunAsUserId.set('selectedObject', user);
            }
        },
        //------------------------------------------------
        //Internal functions.
        //------------------------------------------------
        _getWizardStepResult: function () {
            var result = {
                exportOptions: this._getExportOptions(),
                scheduleOptions: this._getScheduleOptions()
            };
            return result;
        },
        _getExportOptions: function () {
            this._exportOptions.description = this.txtScheduleDescription.get('value');
            this._exportOptions.outputFormat = this.cmbOutputFormat.value;
            this._exportOptions.runAsUserId = this.lkpRunAsUserId.selectedObject ? this.lkpRunAsUserId.selectedObject.$key : null;
            return this._exportOptions;
        },
        _getScheduleOptions: function () {
            if (this._scheduleOptions.executionType == enumerations.ExecutionType.OnDemand) {
                //On demand execution
                this._scheduleOptions.executionType = enumerations.ExecutionType.OnDemand;
            }
            else {
                //Scheduled execution
                var scheduleOptions = this.jobSchedulingWidget.getJobSchedulingOptions();
                var startTime = null;
                var endTime = null;
                var cronExpression = null;

                if (scheduleOptions) {
                    if (scheduleOptions.startTime && (scheduleOptions.startTime instanceof Date)) {
                        startTime = utility.Convert.toJsonStringFromDate(scheduleOptions.startTime);
                    }

                    if (scheduleOptions.endTime && (scheduleOptions.endTime instanceof Date)) {
                        endTime = utility.Convert.toJsonStringFromDate(scheduleOptions.endTime);
                    }
                    cronExpression = scheduleOptions.cronExpression;
                }
                this._scheduleOptions.startTime = startTime;
                this._scheduleOptions.endTime = endTime;
                this._scheduleOptions.cronExpression = cronExpression;
                this._scheduleOptions.scheduleDescription = this.txtScheduleDescription.get('value');
                this._scheduleOptions.executionType = enumerations.ExecutionType.Scheduled;
            }
            return this._scheduleOptions;
        },
        _setControlsVisibility: function () {
            var svc = Sage.Services.getService("RoleSecurityService");
            if (svc) {
                if (!svc.hasAccess('Entities/ReportManager/RunAsUser')) {
                    reportManagerUtility.setDomNodeVisible(this.trRunAsUserId, false);
                }
            }
            var visible = (this._scheduleOptions.executionType === enumerations.ExecutionType.Scheduled);
            reportManagerUtility.setDomNodeVisible(this.trSchedulingWidget, visible);
        },
        _getDialogTitle: function () {
            if (this._scheduleOptions.executionType === enumerations.ExecutionType.OnDemand) {
                return this._nlsResources.txtDialogTitle + " [" + this._reportMetadata.displayName + "]";
            }
            else {
                return this._nlsResources.txtDialogTitleScheduling + " [" + this._reportMetadata.displayName + "]";
            }
        }
    });
    return exportOptionsDialog;
});