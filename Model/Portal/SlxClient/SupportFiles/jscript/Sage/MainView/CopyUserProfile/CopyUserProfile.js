require({cache:{
'url:Sage/MainView/CopyUserProfile/templates/CopyUserProfile.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"{%= $._nlsResources.dlg_Title %}\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\"  style=\"width: 400px\">\r\n        <div data-dojo-type=\"dijit.form.Form\">\r\n            <div style=\"margin: 10px;\">\r\n                <div>{%= $._nlsResources.dlg_Instructions %}</div>\r\n                <br />\r\n                <table width=\"100%\">\r\n                    <tr>\r\n                        <td>\r\n                            <table>\r\n                                <tr>\r\n                                    <td>\r\n                                        {%= $._nlsResources.rad_SelectionLabel %}\r\n                                    </td>\r\n                                    <td>\r\n                                        <input id=\"radioUser\" name=\"userSource\" type=\"radio\" data-dojo-attach-point=\"radUser\" data-dojo-type=\"dijit.form.RadioButton\" value=\"csv\" />{%= Sage.Utility.htmlEncode($._nlsResources.rad_UserBtn) %}\r\n                                    </td>\r\n                                    <td>\r\n                                        <input id=\"radioTemplate\" name=\"userSource\" type=\"radio\" data-dojo-attach-point=\"radTemplate\" data-dojo-attach-event=\"onChange:_radUser_OnChange\" data-dojo-type=\"dijit.form.RadioButton\" value=\"tab\" />{%= Sage.Utility.htmlEncode($._nlsResources.rad_TemplateBtn) %}\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>\r\n                            <table>\r\n                                <tr data-dojo-attach-point=\"userControlPoint\">\r\n                                    <td>\r\n                                        <div>\r\n                                            <table>\r\n                                                <tr>\r\n                                                    <td>\r\n                                                        <label>{%= $._nlsResources.user_LookupLabel %}</label>\r\n                                                    </td>\r\n                                                    <td>\r\n                                                        <div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-attach-point=\"user_Container\" allowclearingresult=\"false\" style=\"width:200px\"></div>\r\n                                                    </td>\r\n                                                </tr>\r\n                                            </table>\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr data-dojo-attach-point=\"templateControlPoint\">\r\n                                    <td>\r\n                                        <div>\r\n                                            <table>\r\n                                                <tr>\r\n                                                    <td>\r\n                                                        <label>{%= $._nlsResources.template_LookupLabel %}</label>\r\n                                                    </td>\r\n                                                    <td>\r\n                                                        <div data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-attach-point=\"template_Container\" allowclearingresult=\"false\" style=\"width:200px\"></div>\r\n                                                    </td>\r\n                                                </tr>\r\n                                            </table>\r\n                                        </div>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>\r\n                            <table class=\"formtable\">\r\n                                <tr>\r\n                                    <td>\r\n                                        <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkGeneral\" checked=\"checked\" />\r\n                                        <label> {%= $._nlsResources.chkGeneralLabel %}</label>\r\n                                    </td>\r\n                                    <td>\r\n                                        <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkCalendar\" checked=\"checked\" />\r\n                                        <label> {%= $._nlsResources.chkCalendarLabel %}</label>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>\r\n                                        <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkEmployee\" checked=\"checked\" />\r\n                                        <label> {%= $._nlsResources.chkEmployeeLabel %}</label>\r\n                                    </td>\r\n                                    <td>\r\n                                        <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkClient\" checked=\"checked\" />\r\n                                        <label> {%= $._nlsResources.chkClientLabel %}</label>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>\r\n                                        <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkSecurity\" checked=\"checked\" />\r\n                                        <label> {%= $._nlsResources.chkSecurityLabel %}</label>\r\n                                    </td>\r\n                                    <td>\r\n                                        <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkService\" checked=\"checked\" />\r\n                                        <label> {%= $._nlsResources.chkServiceLabel %}</label>\r\n                                    </td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>\r\n                                        <input data-dojo-type=\"dijit.form.CheckBox\" data-dojo-attach-point=\"chkTeams\" checked=\"checked\" />\r\n                                        <label> {%= $._nlsResources.chkTeamsLabel %}</label>\r\n                                    </td>\r\n                                </tr>\r\n                            </table>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n                <div align=\"right\" style=\"margin-top:10px\">\r\n                    <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnOk\" data-dojo-attach-event=\"onClick:_btnOk_OnClick\">{%= Sage.Utility.htmlEncode($.btnOK_Caption) %}</div>\r\n                    <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($.btnCancel_Caption) %}</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/CopyUserProfile/CopyUserProfile", [
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/number',
    'dojo/string',
    'dojo/store/Memory',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/_base/lang',
    'Sage/MainView/CopyUserProfile/_CopyUserProfileBase',
    'dojo/text!./templates/CopyUserProfile.html',
    'dojo/i18n!./nls/CopyUserProfile',
    'Sage/Utility',
    'Sage/Utility/File/Attachment',
    'Sage/UI/Dialogs',
    'Sage/Utility/Jobs',
    'Sage/UI/Controls/Lookup'
],
function (
    declare,
    connect,
    dNumber,
    dString,
    dMemory,
    domConstruct,
    domClass,
    lang,
    dialogBase,
    template,
    nlsResources,
    utility,
    attachmentUtility,
    dialogs,
    jobs,
    lookup
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var copyUserProfile = declare('Sage.MainView.CopyUserProfile.CopyUserProfile', [dialogBase], {
        id: "dlgCopyUserProfile",
        useUser:false,
        widgetTemplate: widgetTemplate,
        _nlsResources: nlsResources,
        selectionInfo: null,
        _groupToProcess: null,
        _entityPrettyName: null,
        _entityTableName: null,
        constructor: function (args) {
            lang.mixin(this, args);
        },
        startup: function () {
            this._initUserLookup();
            this._initTemplateLookup();
            this.radUser.checked = true;
            this._radUser_OnChange();
            this.inherited(arguments);
        },
        destroy: function () {
            if (this.lueUser) {
                this.lueUser.destroy();
            }
            if (this.lueTemplate) {
                this.lueTemplate.destroy();
            }
            if (this.radUser) {
                this.radUser.destroy();
            }
            if (this.radTemplate) {
                this.radTemplate.destroy();
            }
            this.inherited(arguments);
        },
        _btnOk_OnClick: function () {
            this._startCopyProfileJob();
        },
        _initUserLookup: function () {
            this.userLookupConfig = {
                id: 'user',
                structure: [
                    {
                        label: nlsResources.lookupUserNameColText,
                        field: 'UserName'
                    },
                   {
                       label: nlsResources.lookupTitleColText,
                       field: 'UserInfo.Title'
                   },
                   {
                       label: nlsResources.lookupDepartmentColText,
                       field: 'UserInfo.Department'
                   },
                   {
                       label: nlsResources.lookupRegionColText,
                       field: 'UserInfo.Region'
                   }
                ],
                gridOptions: {
                    contextualCondition: '',
                    contextualShow: '',
                    selectionMode: 'single'
                },
                storeOptions: { resourceKind: 'users', sort: [{ attribute: 'UserName' }] },
                isModal: true,
                initialLookup: true,
                preFilters: [
                    {
                        propertyName: 'type',
                        propertyType: 'Sage.Entity.Interfaces.UserType',
                        conditionOperator: '!=',
                        filterValue: '5'
                    },
                    {
                        propertyName: 'type',
                        propertyType: 'Sage.Entity.Interfaces.UserType',
                        conditionOperator: '!=',
                        filterValue: '6'
                    },
                    {
                        propertyName: 'type',
                        propertyType: 'Sage.Entity.Interfaces.UserType',
                        conditionOperator: '!=',
                        filterValue: '8'
                    }
                ],
                returnPrimaryKey: true,
                dialogTitle: nlsResources.lookupUser_Caption,
                dialogButtonText: this.btnOK_Caption
            };
            this.lueUser = new lookup({
                id: 'lu_User',
                config: this.userLookupConfig,
                allowClearingResult: true,
                style: 'width:100%'
            });
            domConstruct.place(this.lueUser.domNode, this.user_Container.domNode, 'only');
        },
        _initTemplateLookup: function () {
            this.templateLookupConfig = {
                id: 'template',
                structure: [
                     {
                         label: nlsResources.lookupUserNameTemplateColText,
                         field: 'UserName'
                     }
                ],
                gridOptions: {
                    contextualCondition: '',
                    contextualShow: '',
                    selectionMode: 'single'
                },
                storeOptions: { resourceKind: 'users', sort: [{ attribute: 'UserName' }] },
                isModal: true,
                initialLookup: true,
                preFilters: [
                    {
                        propertyName: 'type',
                        propertyType: 'Sage.Entity.Interfaces.UserType',
                        conditionOperator: '=',
                        filterValue: '6'
                    }
                ],
                returnPrimaryKey: true,
                dialogTitle: nlsResources.lookupUser_Caption,
                dialogButtonText: this.btnOK_Caption
            };
            this.lueTemplate = new lookup({
                id: 'lu_Template',
                config: this.templateLookupConfig,
                allowClearingResult: true,
                style: 'width:100%'
            });
            domConstruct.place(this.lueTemplate.domNode, this.template_Container.domNode, 'only');
        },
        _setDomNodeVisible: function (domNode, visible) {
            if (domNode && visible) {
                domClass.remove(domNode, "display-none");
            }
            else if (domNode) {
                domClass.add(domNode, "display-none");
            }
        },
        _radUser_OnChange: function () {
            this.useUser = this.radUser.checked;
            this._setDomNodeVisible(this.userControlPoint, this.useUser);
            this._setDomNodeVisible(this.templateControlPoint, !this.useUser);

        },
        _getCopyParameters: function () {
            var parameters = {
                General: this.chkGeneral.checked,
                Calendar: this.chkCalendar.checked,
                Employee: this.chkEmployee.checked,
                ClientOptions: this.chkClient.checked,
                Security: this.chkSecurity.checked,
                Service: this.chkService.checked,
                Teams: this.chkTeams.checked
            };
            if (this.useUser) {
                parameters.SourceUserId = this.lueUser.selectedObject.$key;
            } else {
                parameters.SourceUserId = this.lueTemplate.selectedObject.$key;
            }
            return parameters;
        },
        _startCopyProfileJob: function () {


        var options = {
            descriptor: nlsResources.txtJobDescriptor,
            closable: true,
            title: nlsResources.dlg_Title,
            key: "Sage.SalesLogix.BusinessRules.Jobs.EntityIdMasterJob",
            parameters: [
                { "name": "EntityName", "value": this._entityPrettyName },
                { "name": "SelectedIds", "value": (this.selectionInfo.selectionCount > 0) ? this.selectionInfo.selectedIds.join(',') || '' : '' },
                { "name": "GroupId", "value": this._groupToProcess },
                { "name": "AppliedFilters", "value": Sys.Serialization.JavaScriptSerializer.serialize(jobs.getFiltersForJob()) },
                { "name": "LookupConditions", "value": Sys.Serialization.JavaScriptSerializer.serialize(jobs.getLookupConditionsForJob()) },
                { "name": "EntityTableName", "value": this.currentEntityTableName },
                { "name": "Parameters", "value": Sys.Serialization.JavaScriptSerializer.serialize(this._getCopyParameters()) },
                { "name": "FullTypeQualifiedJobName", "value": "Sage.SalesLogix.BusinessRules.Jobs.CopyUserProfileJob" }
            ],
            failure: function (error) {
                dialogs.showError(nlsResources.jobFailer);
            },
            ensureZeroFilters: true
        };
        jobs.triggerJobAndDisplayProgressDialog(options);
    }
    });
    return copyUserProfile;
});