require({cache:{
'url:Sage/MainView/ActivityMgr/templates/HistoryEditor.html':"﻿\r\n[\r\n'<div>',\r\n    '<div dojoType=\"dijit.Dialog\" id=\"historyDialog\" title=\"\" dojoAttachPoint=\"_dialog\" dojoAttachEvent=\"onHide:_onDlgHide\">',\r\n        '<div class=\"activity-dialog\">',  //body\r\n            '<div class=\"activity-dialog-content\">',\r\n            '<div dojoType=\"dojox.layout.TableContainer\" orientation=\"horiz\" cols=\"1\" labelWidth=\"{%= $.labelWidth %}\" dojoAttachPoint=\"regardingContainer\">',\r\n                '<select label=\"{%= $.regardingText %}\" shouldPublishMarkDirty=\"false\" id=\"{%= $.id %}_pk_Regarding\" dojoType=\"Sage.UI.Controls.SingleSelectPickList\" dojoAttachPoint=\"pk_Regarding\" canEditText=\"true\" itemMustExist=\"false\" maxLength=\"255\"></select>',\r\n                '<div dojoType=\"Sage.UI.Controls.TextBox\" shouldPublishMarkDirty=\"false\" label=\"{%= $.locationText %}\" id=\"{%= $.id %}_tb_Location\" dojoAttachPoint=\"tb_Location\" maxLength=\"255\" ></div>',\r\n            '</div>', //first tablecontainer 1 col\r\n            '<div dojoType=\"dojox.layout.TableContainer\" orientation=\"horiz\" cols=\"2\" labelWidth=\"{%= $.labelWidth %}\" dojoAttachPoint=\"dateSection_AddEdit\">',\r\n                '<div dojoType=\"Sage.UI.Controls.DateTimePicker\" shouldPublishMarkDirty=\"false\" id=\"{%= $.id %}_dtp_CompletetdDate\" dojoAttachPoint=\"dtp_completedDate\" displayDate=\"true\" displayTime=\"true\" label=\"{%= $.completedDateText %}\"></div>',\r\n                '<div dojoType=\"Sage.UI.Controls.DateTimePicker\" shouldPublishMarkDirty=\"false\" id=\"{%= $.id %}_dtp_StartDate\" dojoAttachPoint=\"dtp_startDate\" displayDate=\"true\" displayTime=\"true\" label=\"{%= $.startTimeText %}\"></div>',\r\n                '<div dojoType=\"dijit.layout.ContentPane\" label=\"\" class=\"remove-padding\">',\r\n                    '<div dojoType=\"dijit.form.CheckBox\" label=\"{%= $.timeLessText %}\" id=\"{%= $.id %}_cb_Timeless\" dojoAttachPoint=\"cb_Timeless\" ></div>',\r\n                    '<label class=\"checkbox-label\" for=\"cb_Timeless\">{%= $.timeLessText %}</label>',\r\n                '</div>',\r\n                 '<div dojoType=\"Sage.UI.Controls.DurationSelect\" shouldPublishMarkDirty=\"false\" label=\"{%= $.durationText %}\" id=\"{%= $.id %}_sel_Duration\" dojoAttachPoint=\"sel_Duration\" includeDisablingCheckbox=\"false\" valuesAreAfterStart=\"true\"></div>',\r\n                '<div dojoType=\"dijit.layout.ContentPane\" label=\"\" class=\"remove-padding\">',\r\n                '</div>',\r\n            '</div>', //second tablecontainer 2 col\r\n\r\n            '<div dojoType=\"dijit.layout.TabContainer\" id=\"{%= $.id %}_tc_EditHistory\"  dojoAttachPoint=\"tc_EditHistory\" class=\"tab-container\" doLayout=\"false\">',\r\n/*  General Tab   */\r\n                '<div dojoType=\"dijit.layout.ContentPane\" id=\"{%= $.id %}_cp_General\" title=\"{%= $.tabNameGeneralText %}\" class=\"tabContent remove-padding\" dojoAttachPoint=\"cp_General\">',\r\n                    '<div dojoType=\"dojox.layout.TableContainer\" orientation=\"horiz\" cols=\"2\" labelWidth=\"{%= $.labelWidth %}\" dojoAttachPoint=\"result_Section\" class=\"bottom-border-section add-padding\">',\r\n                        '<select label=\"{%= $.resultText %}\" id=\"{%= $.id %}_tb_Result\" shouldPublishMarkDirty=\"false\" dojoType=\"Sage.UI.Controls.SingleSelectPickList\" dojoAttachPoint=\"pk_Result\" canEditText=\"true\" itemMustExist=\"false\" maxLength=\"64\"></select>',\r\n                    '</div>',\r\n                    '<div dojoType=\"dojox.layout.TableContainer\" orientation=\"horiz\" cols=\"4\" labelWidth=\"70\" baseClass=\"contact-lead-radios\" >',\r\n                        '<input dojoType=\"dijit.form.RadioButton\" type=\"radio\" name=\"contactOrLead\" label=\"{%= $.contactText %}\" value=\"contact\" id=\"{%= $.id %}_rdo_Contact\" dojoAttachPoint=\"rdo_Contact\" dojoAttachEvent=\"onChange:_setContactLeadVisibility\" checked=\"true\" />',\r\n                        '<input dojoType=\"dijit.form.RadioButton\" type=\"radio\" name=\"contactOrLead\" label=\"{%= $.leadText %}\" value=\"lead\" id=\"{%= $.id %}_rdo_Lead\" dojoAttachPoint=\"rdo_Lead\" />',\r\n                    '</div>',\r\n                    '<div dojoType=\"dojox.layout.TableContainer\" orientation=\"horiz\" cols=\"2\" labelWidth=\"{%= $.labelWidth %}\" dojoAttachPoint=\"contactContainer\" baseClass=\"bottom-border-section\">',\r\n                        '<div dojoType=\"dijit.layout.ContentPane\" label=\"{%= $.nameText %}\" dojoAttachPoint=\"container_ContactLup\" class=\"remove-padding lookup-container\"></div>',\r\n                        '<div dojoType=\"dijit.layout.ContentPane\" label=\"{%= $.opportunityText %}\" dojoAttachPoint=\"container_OppLup\" class=\"remove-padding lookup-container\"></div>',\r\n                        '<div dojoType=\"dijit.layout.ContentPane\" label=\"{%= $.accountText %}\" dojoAttachPoint=\"container_AccountLup\"  class=\"remove-padding lookup-container\"></div>',\r\n                        '<div dojoType=\"dijit.layout.ContentPane\" label=\"{%= $.ticketText %}\" dojoAttachPoint=\"container_TicketLup\"  class=\"remove-padding lookup-container\"></div>',\r\n                    '</div>',\r\n                    '<div dojoType=\"dojox.layout.TableContainer\" orientation=\"horiz\" cols=\"2\" labelWidth=\"{%= $.labelWidth %}\" dojoAttachPoint=\"leadContainer\"  baseClass=\"bottom-border-section\" class=\"display-none\">',\r\n                        '<div dojoType=\"dijit.layout.ContentPane\" label=\"{%= $.nameText %}\" dojoAttachPoint=\"container_LeadLup\"  class=\"remove-padding lookup-container\"></div>',\r\n                        '<input dojoType=\"dijit.form.TextBox\" id=\"{%= $.id %}_tb_LeadCompanyName\" label=\"{%= $.companyText %}\" dojoAttachPoint=\"tb_LeadCompanyName\" readonly=\"true\" />',\r\n                    '</div>',                       \r\n                    '<div dojoType=\"dojox.layout.TableContainer\" orientation=\"horiz\" cols=\"2\" labelWidth=\"{%= $.labelWidth %}\"  class=\"bottom-border-section\" dojoAttachPoint=\"categoryContainer\">',\r\n                        '<select label=\"{%= $.categoryText %}\" id=\"{%= $.id %}_pk_Category\" shouldPublishMarkDirty=\"false\" dojoType=\"Sage.UI.Controls.SingleSelectPickList\" dojoAttachPoint=\"pk_Category\" canEditText=\"true\" itemMustExist=\"false\" maxLength=\"64\"  style=\"width: {%= 472 - $.labelWidth %}px;\" ></select>', \r\n                         '<div dojoType=\"dijit.layout.ContentPane\" label=\"{%= $.leaderText %}\" dojoAttachPoint=\"container_LeaderLup\" class=\"remove-padding lookup-container\" style=\"width: {%= 472 - $.labelWidth %}px;\"></div>',\r\n                         '<select label=\"{%= $.priorityText %}\" id=\"{%= $.id %}_pk_Priority\" shouldPublishMarkDirty=\"false\" dojoType=\"Sage.UI.Controls.SingleSelectPickList\" dojoAttachPoint=\"pk_Priority\" canEditText=\"true\" itemMustExist=\"false\" pickListName=\"Priorities\" sort=\"false\" maxLength=\"64\" style=\"width: {%= 472 - $.labelWidth %}px;\"></select>',                          \r\n                    '</div>',\r\n                    '<div dojoType=\"dojox.layout.TableContainer\" orientation=\"horiz\" cols=\"1\" labelWidth=\"{%= $.labelWidth %}\"  class=\"valigntop\" dojoAttachPoint=\"notesContainer\">',\r\n                        '<textarea dojoType=\"dijit.form.SimpleTextarea\" id=\"{%= $.id %}_ta_Notes\" label=\"{%= $.notesText %}\" dojoAttachPoint=\"ta_Notes\" class=\"notes-text\" ></textarea>',\r\n                    '</div>',\r\n                '</div>',  // end general tab\r\n\r\n              /* Attachments Tab  */\r\n                '<div dojoType=\"dijit.layout.ContentPane\" id=\"{%= $.id %}_cp_Attachments\" title=\"{%= $.tabNameAttachmentsText %}\" class=\"tabContent\" dojoAttachPoint=\"cp_Attachments\" dojoAttachEvent=\"onShow:_showAttachmentsTab\">',\r\n                    '<div id=\"{%= $.id %}_attachmentsGridPlaceholder\" dojoAttachPoint=\"_attachmentGridPlaceholder\" style=\"width:100%;height:100%;\" ></div>',\r\n                '</div>',  //end attachments tab\r\n            '</div>', //end tab container\r\n            '</div>',\r\n            '<table class=\"activity-dialog-followup\">',\r\n                '<col width=\"50%\" /><col width=\"50%\" />',\r\n                 '<tr>',\r\n                    '<td class=\"alignleft\">',\r\n                        //followUp section\r\n                        '<div dojoType=\"dojox.layout.TableContainer\" orientation=\"horiz\" cols=\"1\" labelWidth=\"{%= $.labelWidth %}\" dojoAttachPoint=\"followUp_Section\" >',\r\n                            '<select label=\"{%= $.followupText %}\" id=\"{%= $.id %}_followUpSelect\" dojoType=\"dijit.form.ComboBox\" dojoAttachPoint=\"sel_Followup\">',\r\n                                '<option value=\"none\" selected=\"selected\">{%= $.noneText %}</option>',\r\n                                '<option value=\"atPhoneCall\">{%= Sage.Utility.Activity.getActivityTypeName(\"atPhoneCall\") %}</option>',\r\n                                '<option value=\"atAppointment\">{%= Sage.Utility.Activity.getActivityTypeName(\"atAppointment\") %}</option>',\r\n                                '<option value=\"atToDo\">{%= Sage.Utility.Activity.getActivityTypeName(\"atToDo\") %}</option>',\r\n                            '</select>',\r\n                            '<div dojoType=\"dijit.layout.ContentPane\" label=\"\" class=\"remove-padding\">',\r\n                                '<div dojoType=\"dijit.form.CheckBox\" label=\"\" id=\"{%= $.id %}_ck_coAttachments\" dojoAttachPoint=\"ck_coAttachments\" ></div>',\r\n                                '<label class=\"checkbox-label\" for=\"{%= $.id %}_ck_coAttachments\">{%= $.carryOverAttachmentsText %}</label>',\r\n                            '</div>',\r\n                            '<div dojoType=\"dijit.layout.ContentPane\" label=\"\" class=\"remove-padding\">',\r\n                                '<div dojoType=\"dijit.form.CheckBox\" label=\"\" id=\"{%= $.id %}_ck_coNotes\" dojoAttachPoint=\"ck_coNotes\" ></div>',\r\n                                '<label class=\"checkbox-label\" for=\"{%= $.id %}_ck_coNotes\">{%= $.carryOverNotesText %}</label>',\r\n                            '</div>',\r\n                        '</div>',//end followUp section\r\n                    '</td>',\r\n                    '<td class=\"alignright valignbottom\" rowspan=\"2\" ojoAttachPoint=\"add_edit_buttons\" >',\r\n                        '<div dojoType=\"dijit.form.Button\" id=\"{%= $.id %}_btnDelete\" name=\"btn_Delete\" dojoAttachPoint=\"btn_Delete\" dojoAttachEvent=\"onClick:_deleteClick\">{%= $.deleteText %}</div>',\r\n                        '<div dojoType=\"dijit.form.Button\" id=\"{%= $.id %}_btn_OK\" name=\"btn_OK\" dojoAttachPoint=\"btn_OK\" dojoAttachEvent=\"onClick:_okClick\">{%= $.okText %}</div>',\r\n                        '<div dojoType=\"dijit.form.Button\" id=\"{%= $.id %}_btn_Cancel\" name=\"btn_Cancel\" dojoAttachPoint=\"btn_Cancel\" dojoAttachEvent=\"onClick:_cancelClick\">{%= $. cancelText %}</div>',\r\n                    '</td>',\r\n                '</tr>',\r\n                '<tr>',\r\n                   '<td class=\"alignleft\">',\r\n                      '<div class=\"scheduled-by-label\" dojoAttachPoint=\"lbl_ScheduledBy\"></div>',\r\n                   '</td>',\r\n                '</tr>',\r\n            '</table>',\r\n        '</div>', //body\r\n    '</div>',  //dialog\r\n'</div>' //root node\r\n]\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/ActivityMgr/HistoryEditor", [
    'dijit/_Widget',
    'Sage/_Templated',
    'Sage/Data/SingleEntrySDataStore',
    'Sage/MainView/BindingsManager',
    'Sage/Utility',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'dojo/_base/lang',
    'Sage/UI/_DialogLoadingMixin',
    'Sage/UI/AttachmentList',
    'Sage/Data/SDataServiceRegistry',
    'Sage/UI/Dialogs',
    'dojo/string',
    'dojo/date/locale',
    'Sage/Utility/Activity',
    'Sage/Utility/File',
    'dojo/_base/declare',
    'dojo/i18n!./nls/HistoryEditor',
    'dojo/text!./templates/HistoryEditor.html',
    'dojo/dom-class',
    'Sage/MainView/ActivityMgr/HistoryEditorAttendeesTab',
    'dijit/layout/ContentPane',
    'dojo/dom-style',
    'dojo/on',
    'dojo/dom-geometry',

    'dijit/Toolbar',
    'dijit/layout/TabContainer',
    'dijit/form/Textarea',
    'dojox/layout/TableContainer',
    'Sage/Services/UserOptions',
    'Sage/UI/Controls/SingleSelectPickList',
    'Sage/UI/Controls/DateTimePicker',
    'Sage/UI/Controls/Lookup',
    'dijit/Dialog',
    'Sage/UI/Controls/DurationSelect',
    'Sage/Services/CalendarSecurityService'
],
function (_Widget, _Templated, SingleEntrySDataStore, BindingsManager, utility, _DialogHelpIconMixin,
    dojoLang, _DialogLoadingMixin, AttachmentList, sDataServiceRegistry, SageDialogs, dstring, locale,
    activityUtility, fileUtility, declare, historyEditorStrings, template, domClass, HistoryAttendeesTab, ContentPane, domStyle, on, domGeometry) {
    dojo.requireLocalization("Sage.MainView.ActivityMgr", "HistoryEditor");
    var historyEditor = declare('Sage.MainView.ActivityMgr.HistoryEditor', [_Widget, _Templated], {
        historyId: '',
        mode: '',
        id: '',
        activityType: '',
        _dialog: false,
        _currentUserId: null,
        _activityService: false,
        _historyData: false,
        _historyStore: false,
        _bindingMgr: false,
        //_uaBindingMgr: false,
        lup_Account: false,
        lup_Contact: false,
        lup_Opportunity: false,
        lup_Ticket: false,
        lup_Lead: false,
        lup_Leader: false,
        accountLookupConfig: {},
        contactLookupConfig: {},
        opportunityLookupConfig: {},
        ticketLookupConfig: {},
        leadLookupConfig: {},
        //resourcesLookupConfig: {},
        _isBinding: false,
        _historySaved: false,
        notnullfields: ['ContactId', 'AccountId', 'OpportunityId', 'TicketId', 'LeadId'],
        historyDefaultValues: {},
        _doingFollowup: false,

        //i18n strings...from nls/{language}/HistoryEditor.js

        _attachmentsSaved: false,
        _attachmentList: false,
        _tempIdForAttachments: false,
        _hasAccess: true,
        eventConnections: [],
        widgetsInTemplate: true,
        widgetTemplate: new Simplate(eval(template)),
        constructor: function () {
            dojo.mixin(this, historyEditorStrings);
            this._historyService = Sage.Data.SDataServiceRegistry.getSDataService('dynamic');
            this._setupStore();
            this._currentUserId = Sage.Utility.getClientContextByKey('userID') || '';
            dojo.subscribe('/entity/attachment/create', this, this._updateHistoryETag);
            dojo.subscribe('/entity/attachment/update', this, this._updateHistoryETag);
            dojo.subscribe('/entity/attachment/delete', this, this._updateHistoryETag);
        },
        destroy: function () {
            if (this._historyChangeConnection) {
                dojo.disconnect(this._historyChangeConnection);
                this._historyChangeConnection = false;
            }
            if (this._bindingMgr) {
                this._bindingMgr.destroy();
            }
            //if (this._uaBindingMgr) {
            //    this._uaBindingMgr.destroy();
            //}
            for (var i = 0; i < this.eventConnections.length; i++) {
                dojo.disconnect(this.eventConnections[i]);
            }
            this.lup_Account.destroy();
            this.lup_Contact.destroy();
            this.lup_Opportunity.destroy();
            this.lup_Ticket.destroy();
            this.lup_Lead.destroy();
            this.lup_Leader.destroy();
            this.eventConnections = [];
            this.inherited(arguments);
        },
        isFirstOpen: true,
        show: function (mixinProperties) {
            this._dialog.set('refocus', false);
            if (this.isFirstOpen) {
                // create lookup controls...
                this.isFirstOpen = false;
                this.connect(this._dialog, 'onHide', this._cleanOnClose);
            }

            if (!this.lup_Account) {
                // create lookup controls...
                this.createAccountLookup();
                this.createContactLookup();
                this.createOpportunityLookup();
                this.createTicketLookup();
                this.createLeadLookup();
                this.createLeaderLookup();

            }

            this.historyDefaultValues = {};
            if (this.mode === 'New') {
                this.historyDefaultValues = mixinProperties || {};
                this._loadData();
            }
            if (this.mode === 'Complete') {

            }
            if (this.mode === 'Complete') {
                domClass.add(this.btn_Delete.domNode, 'display-none');
            } else {
                domClass.remove(this.btn_Delete.domNode, 'display-none');
            }
            if ((this.activityType === "atNote") && (this.mode === 'New')) {
                dojo.addClass(this.result_Section.domNode, 'display-none');
            }
            else {
                dojo.removeClass(this.result_Section.domNode, 'display-none');
            }

            this._dialog.show();

            if (!this._dialog._standby) {
                dojoLang.mixin(this._dialog, new _DialogLoadingMixin());
                if (!this._historyData) {
                    this._dialog.showLoading();
                }
            }
            // Create help icon
            if (!this._dialog.helpIcon) {
                dojoLang.mixin(this._dialog, new _DialogHelpIconMixin());
                this._dialog.createHelpIconByTopic('View_Edit_Details_of_a_History_Item');
            }
            if (this.activityType === "atNote") {
                this._dialog.set('helpTopic', 'addnote');
            }
            else {

                this._dialog.set('helpTopic', 'View_Edit_Details_of_a_History_Item');
            }
            //this._availabilityShowing = false;
            this.tc_EditHistory.selectChild(this.cp_General);
            this._doingFollowup = false;
        },
        hide: function (e) {
            this._dialog.hide(e);
            this.set('historyId', '');
        },
        onHide: function () { },
        _onDlgHide: function () {
            this.onHide();
        },
        _cleanOnClose: function () {
            var svc = Sage.Services.getService('ClientEntityContext');
            svc.clearTemporaryContext();
            this.set('historyId', '');

            //Making sure the tooltips are hidden when closing the dialog
            this._hideLookupTooltip(this.lup_Account);
            this._hideLookupTooltip(this.lup_Contact);
            this._hideLookupTooltip(this.lup_Opportunity);
            this._hideLookupTooltip(this.lup_Ticket);
            this._hideLookupTooltip(this.lup_Lead);
            this._hideLookupTooltip(this.lup_Leader);
        },
        _hideLookupTooltip: function (control) {
            if (control) {
                control.hideTooltip();
            }
       },
        _showAttachmentsTab: function () {
            var self = this;
            window.setTimeout(function () {
                self._ensureAttachmentList();
            }, 100);

        },
        _ensureAttachmentList: function () {
            var newAttachmentList = false;
            if (!this._attachmentList) {
                newAttachmentList = true;
                this._attachmentList = new AttachmentList({
                    workspace: '',
                    tabId: '',
                    placeHolder: this.id + '_attachmentsGridPlaceholder',
                    parentRelationshipName: 'historyId'
                });
                var self = this;
                this._attachmentList.startup(function () {
                    if (self.cp_Attachments) {
                        self.cp_Attachments.resize();
                    }
                });
            } 

            if (newAttachmentList || this.mode != 'New') {
                this._attachmentList.resetEntityContext();
            }
        },
        // ... region - History data methods   .....................
        _updateHistoryETag: function (attachment) {
            //listener for attachment record changes.
            if (this._dialog.open && this.historyId) {
                var req = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('dynamic'));
                req.setResourceKind('history');
                req.setResourceSelector('"' + this.historyId + '"');
                req.setQueryArg('precedence', '0');
                req.read({
                    success: function (history) {
                        this._historyData['$etag'] = history['$etag'];
                    },
                    scope: this
                });
            }
        },
        _setModeAttr: function (mode) {
            this.mode = mode;
            var idx = this.tc_EditHistory.getIndexOfChild(dijit.byId("histAttendeesTabPane"));
            if (mode.indexOf('New') === 0) {
                this._historyData = false;
                if (idx > 0) {
                    this.tc_EditHistory.removeChild(dijit.byId("histAttendeesTabPane"));
                    dijit.byId("histAttendeesTabPane").destroy();
                    var self = this;
                    window.setTimeout(function () {
                        self._dialog.resize();
                    }, 100);
                }

            } else {
                if (idx < 0) {
                    this._addAttendeesTab();
                    var self = this;
                    window.setTimeout(function () {
                        self._dialog.resize();
                    }, 100);
                }
            }

        },
        _setActivityTypeAttr: function (type) {

            switch (type) {
                case 'PhoneCall':
                case 'atPhoneCall':
                    this.activityType = 'atPhoneCall';
                    break;
                case 'Meeting':
                case 'atAppointment':
                    this.activityType = 'atAppointment';
                    break;
                case 'ToDo':
                case 'atToDo':
                    this.activityType = 'atToDo';
                    break;
                case 'PersonalActivity':
                case 'atPersonal':
                case 'Personal':
                    this.activityType = 'atPersonal';
                    break;
                case 'atNote':
                case 'Note':
                    this.activityType = 'atNote';
                    break;
                default:
                    this.activityType = 'atNote';
                    break;
            }


        },
        _setHistoryIdAttr: function (historyId) {
            if (this.historyId !== historyId) {
                this.historyId = historyId;
                this._historyData = false;
                //console.log('setting the historyid <' + historyId + '>');
                if (historyId !== '') {
                    this._loadData();
                }
            }
        },
        _getHistoryIdAttr: function () {
            return this.historyId;
        },
        _setupStore: function () {
            if (!this._historyStore) {
                this._historyStore = new SingleEntrySDataStore({
                    include: [],
                    resourceKind: 'history',
                    service: this._historyService
                });
            }
        },
        _loadData: function () {

            if (this._dialog._standby) {
                this._dialog.showLoading();
            }
            this._resetDataProps();
            if (this._historyStore) {
                if (this.mode !== 'New') {
                    this._historyStore.fetch({
                        predicate: '"' + this.historyId + '"',
                        onComplete: this._receivedHistory,
                        onError: this._requestFailure,
                        scope: this
                    });
                } else {
                    this._historyStore.newItem({
                        onComplete: function (data) {
                            Sage.Utility.setValue(data, 'Type', this.activityType);
                            this._receivedHistory(dojo.mixin(data, this.historyDefaultValues));
                            //this._receivedHistory(data);
                        },
                        scope: this
                    });
                }
            }

        },
        _resetDataProps: function () {
            this._historyData = false;
            this._historySaved = false;
            if (this._attachmentList) {
                this._attachmentList.clearNewAttachments();
            }
            if (((this.activityType === "atNote") && (this.mode === 'New'))) {
                Sage.Utility.setValue(this.historyDefaultValues, 'Result', this.resultComplete);
            }
        },
        _receivedHistory: function (data) {
            this._historyData = data;
            this._tempIdForAttachments = false;

            var contextSvc = Sage.Services.getService('ClientEntityContext');
            var context = {
                "EntityId": this._historyData.$key || '',
                "EntityType": "Sage.Entity.Interfaces.IHistory",
                "Description": this._historyData.$descriptor,
                "EntityTableName": "HISTORY"
            };
            contextSvc.setTemporaryContext(context);

            this._ensureIdsNotNull();
            if (this.mode !== 'New') {
                this.activityType = data.Type;
            } else {
                this._applyUserOptionsForNewHistory();
            }
            this._setUIForActivityType(data.Type);
            this._bind();

            //decide if the delete button should show or not...
            if (((this.activityType === "atNote") && (this.mode === 'New'))
                || (data['UserId'] !== this._currentUserId && this._currentUserId.trim() !== 'ADMIN')) {
                dojo.addClass(this.btn_Delete.domNode, 'display-none');
            }
            else {
                dojo.removeClass(this.btn_Delete.domNode, 'display-none');
            }

            if (this._dialog._standby) {
                this._dialog.hideLoading();
            }
        },
        _ensureIdsNotNull: function () {
            for (var i = 0; i < this.notnullfields.length; i++) {
                if (this._historyData[this.notnullfields[i]] === null) {
                    this._historyData[this.notnullfields[i]] = '';
                }
            }
        },
        _applyUserOptionsForNewHistory: function () {
            //set start and alarm time to user options.
            var newDate = new Date();
            newDate.setSeconds(5);
            newDate.setMinutes(0);
            newDate.setHours(0);
            Sage.Utility.setValue(this._historyData, 'Timeless', true);
            Sage.Utility.setValue(this._historyData, 'StartDate', Sage.Utility.Convert.toIsoStringFromDate(newDate));

            //set default duration...
            Sage.Utility.setValue(this._historyData, 'Duration', '60');
        },

        _requestFailure: function (msg, request, opts) {
            console.warn('error requesting data %o', arguments);
        },
        _createBindings: function () {
            if (this._bindingMgr) {
                this._bindingMgr.destroy();
                this._bindingMgr = false;
            }
            this._bindingMgr = new BindingsManager({
                defaultBinding: { boundEntity: this._historyData },
                items: [
                    {
                        boundWidget: this.tb_Location,
                        entityProperty: 'Location'
                    }, {
                        boundWidget: this.pk_Regarding,
                        entityProperty: 'Description',
                        onChange: dojo.hitch(this, '_descriptionChanged')
                    }, {
                        boundWidget: this.pk_Result,
                        entityProperty: 'Result'
                    }, {
                        boundWidget: this.pk_Category,
                        entityProperty: 'Category'
                    }, {
                        boundWidget: this.pk_Priority,
                        entityProperty: 'Priority'
                    }, {
                        boundWidget: this.dtp_startDate,
                        dataType: 'date',
                        entityProperty: 'StartDate',
                        onChange: dojo.hitch(this, '_startDateChanged')
                    }, {
                        boundWidget: this.dtp_completedDate,
                        dataType: 'date',
                        entityProperty: 'CompletedDate'
                        //onChange: dojo.hitch(this, '_completedDateChanged')
                    }, {
                        boundWidget: this.sel_Duration,
                        entityProperty: 'Duration'
                    }, {
                          boundWidget: this.sel_Duration,
                          entityProperty: 'StartDate',
                          widgetProperty: 'startTime',
                          dataType: 'date',
                          twoWay: false
                      }, {
                        boundWidget: this.cb_Timeless,
                        entityProperty: 'Timeless',
                        widgetProperty: 'checked',
                        onChange: dojo.hitch(this, '_timelessChange')
                    }, {
                        boundWidget: this.ta_Notes,
                        entityProperty: 'LongNotes'
                    }
                ]
            });
            //this._historyChangeConnection = dojo.connect(this._bindingMgr, 'onChange', this, 'onChange');
        },
        _bind: function () {
            if (this._historyData) {
                if (!this._bindingMgr) {
                    this._createBindings();
                } else {
                    if (!this._bindingMgr.boundEntity || (this._historyData.HistoryId !== this._bindingMgr.boundEntity.HistoryId)) {
                        this._bindingMgr.setBoundEntity(this._historyData);
                    } else {
                        this._bindingMgr.bind();
                    }
                }
                this._manualBind();
                this._setUI();
            }
        },
        _isNullOrWhitespace: function (str) {
            return (!str || str.trim() === '');
        },
        _manualBind: function () {
            //because there are not relationships to several related entities, we have to manually bind to keep the denormalized data in sync...

            if (this._historyData) {
                this._isBinding = true;  //this prevents the change event handlers from overwriting values that we are going to set here...
                //for example, the account change handler removes the contact, opp, and ticket values.
                // account...
                var his = this._historyData;
                var mockAcctObj = this._isNullOrWhitespace(his.AccountId) ? null : {
                    '$key': his.AccountId,
                    '$descriptor': his.AccountName
                };
                this.lup_Account.set('selectedObject', mockAcctObj);
                // contact...
                var mockContact = this._isNullOrWhitespace(his.ContactId) ? null : {
                    '$key': his.ContactId,
                    '$descriptor': his.ContactName
                };
                this.lup_Contact.set('selectedObject', mockContact);

                // opportunity...
                var mockOpp = this._isNullOrWhitespace(his.OpportunityId) ? null : {
                    '$key': his.OpportutunityId,
                    '$descriptor': his.OpportunityName
                };
                this.lup_Opportunity.set('selectedObject', mockOpp);

                // ticket...
                var mockTick = this._isNullOrWhitespace(his.TicketId) ? null : {
                    '$key': his.TicketId,
                    '$descriptor': his.TicketNumber
                };
                this.lup_Ticket.set('selectedObject', mockTick);

                // lead...
                var mockLead = this._isNullOrWhitespace(his.LeadId) ? null : {
                    '$key': his.LeadId,
                    '$descriptor': his.LeadName
                };

                // Leader...
                var mockLeader = this._isNullOrWhitespace(his.UserId) ? null : {
                    '$key': his.UserId,
                    '$descriptor': his.UserName
                };
                this.lup_Leader.set('selectedObject', mockLeader);

                this.lup_Lead.set('selectedObject', mockLead);
                this.tb_LeadCompanyName.set('value', this._isNullOrWhitespace(his.LeadId) ? '' : his.AccountName);

                this._updateLookupSeedValues(his.AccountId);

                this._isBinding = false;
            }
        },

        _accountChanged: function (newAcct) {

            if (this._isBinding) { return; }

            var newId = (newAcct) ? newAcct['$key'] : '';
            var newActName = (newAcct) ? newAcct['$descriptor'] : '';

            var his = this._historyData;
            var mustSetContact = this._isNullOrWhitespace(his.ContactId);

            his.AccountId = newId;
            his.AccountName = newActName;
            his.PhoneNumber = '';
            his.LeadId = '';
            his.LeadName = '';

            this._isBinding = true;
            this.lup_Lead.set('selectedObject', null);
            this.tb_LeadCompanyName.set('value', '');
            this._updateLookupSeedValues(newId);

            this.lup_Lead.set('selectedObject', null);
            this.tb_LeadCompanyName.set('value', '');
            if (mustSetContact) {
                his.ContactId = '';
                his.ContactName = '';
                this.lup_Contact.set('selectedObject', null);
                this._setContactToCurrentAccountPrimary();
            }
            this._isBinding = false;
        },
        _contactChanged: function (newContact) {
            if (this._isBinding) { return; }
            var his = this._historyData;
            if (!newContact) {
                his.ContactId = '';
                his.ContactName = '';
                his.PhoneNumber = '';
                return;
            }
            his.ContactId = newContact['$key'];
            his.ContactName = newContact['$descriptor'];
            his.PhoneNumber = Sage.Utility.getValue(newContact, 'WorkPhone');

            //remove lead
            his.LeadId = '';
            his.LeadName = '';

            var actAccountEmpty = this._isNullOrWhitespace(his.AccountName);
            //set associated account
            his.AccountId = newContact.Account['$key'];
            his.AccountName = newContact.Account.AccountName;
            //account changed, so update seed values...
            this._updateLookupSeedValues(newContact.Account['$key']);

            this._isBinding = true;
            if (actAccountEmpty) {
                this.lup_Account.set('selectedObject', { '$key': newContact.Account['$key'], '$descriptor': newContact.Account.AccountName });
            }
            this.lup_Lead.set('selectedObject', null);
            this.tb_LeadCompanyName.set('value', '');
            this._isBinding = false;

        },
        _opportunityChanged: function (newOpp) {
            if (this._isBinding) { return; }
            /*
            The logic for when the opportunity changes is like this...
            - If there is already a contact and account selected, and the opportunity is associated to the same account - do nothing
            - If there is no contact or account selected for the activity - or the account is different do the following:
            - Set the account to the associated account and:
            - If ONE associated contact is marked IsPrimary = true set the contact to it.
            - if more than one associated contact is marked primary, or none are marked primary,
            -if one of these is primary for the account and use it
            -if not, just grab the first one.
            -if there are no contacts associate with the opportunity, use the account's primary contact.
            */

            var his = this._historyData;
            if (!newOpp) {
                his.OpportunityId = '';
                his.OpportunityName = '';
                return;
            }
            his.OpportunityId = newOpp['$key'];
            his.OpportunityName = newOpp['$descriptor'];

            if (this._isNullOrWhitespace(his.AccountId) || his.AccountId !== newOpp.Account['$key']) {
                var actAccountEmpty = this._isNullOrWhitespace(his.AccountName);
                var actContactEmpty = this._isNullOrWhitespace(his.ContactName);
                //set the associated account...
                his.AccountId = newOpp.Account['$key'];
                his.AccountName = newOpp.Account.AccountName;
                his.LeadId = '';
                his.LeadName = '';

                this._updateLookupSeedValues(newOpp.Account['$key']);

                this._isBinding = true;
                if (actAccountEmpty) {
                    this.lup_Account.set('selectedObject', { '$key': newOpp.Account['$key'], '$descriptor': newOpp.Account.AccountName });
                }
                this.lup_Lead.set('selectedObject', null);
                this.tb_LeadCompanyName.set('value', '');
                this._isBinding = false;

                if (actContactEmpty) {
                    //remove contact for now, then when we find the primary, we'll set it again.
                    this.lup_Contact.set('selectedObject', null);
                    this._setContactBasedOnOpportunity();
                }
            }
        },
        _ticketChanged: function (newTick) {
            if (this._isBinding) { return; }
            var his = this._historyData;
            if (!newTick) {
                his.TicketId = '';
                his.TicketNumber = '';
                return;
            }

            his.TicketId = newTick['$key'];
            his.TicketNumber = newTick['$descriptor'];
            //update account and contact, if there isn't an account - or if the account is different from the ticket's account
            if (this._isNullOrWhitespace(his.AccountId) || his.AccountId !== newTick.Account['$key']) {
                var actAccountEmpty = this._isNullOrWhitespace(his.AccountName);
                var actContactEmpty = this._isNullOrWhitespace(his.ContactName);
                his.AccountId = newTick.Account['$key'];
                his.AccountName = newTick.Account['AccountName'];
                his.LeadId = '';
                his.LeadName = '';
                this._updateLookupSeedValues();

                //Do we set it to the contact associated with the ticket - or the primary?
                // I'm going with the one on the ticket, but previous versions used the primary...
                his.ContactId = Sage.Utility.getValue(newTick, 'Contact.$key');
                his.ContactName = Sage.Utility.getValue(newTick, 'Contact.NameLF');
                his.PhoneNumber = Sage.Utility.getValue(newTick, 'Contact.WorkPhone');

                this._isBinding = true;
                if (actAccountEmpty) {
                    this.lup_Account.set('selectedObject', { '$key': newTick.Account['$key'], '$descriptor': newTick.Account['AccountName'] });
                }
                if (actContactEmpty) {
                    this.lup_Contact.set('selectedObject', { '$key': newTick.Contact['$key'], '$descriptor': newTick.Contact['NameLF'] });
                }
                this.lup_Lead.set('selectedObject', null);
                this.tb_LeadCompanyName.set('value', '');
                this._isBinding = false;
                // In case I have to change it back to the account's primary...
                //this._setContactToCurrentAccountPrimary();
            }
        },
        _leadChanged: function (newLead) {
            if (this._isBinding) { return; }
            //console.warn('handle new lead: %o', newLead);
            var his = this._historyData;
            if (!newLead) {
                his.LeadId = '';
                his.LeadName = '';
                his.PhoneNumber = '';
                this.tb_LeadCompanyName.set('value', '');
                return;
            }

            his.LeadId = newLead['$key'];
            his.LeadName = newLead['$descriptor'];
            his.AccountName = newLead['Company'];
            his.PhoneNumber = newLead['WorkPhone'];
            this.tb_LeadCompanyName.set('value', newLead['Company']);

            //clear out the TACO and make way for Lead.
            his.ContactId = '';
            his.ContactName = ''; //this.LeadName;
            his.AccountId = '';
            his.AccountName = '';
            his.TicketId = '';
            his.TicketNumber = '';
            his.OpportunityId = '';
            his.OpportunityName = '';
            this._updateLookupSeedValues();
            this._isBinding = true;
            this.lup_Contact.set('selectedObject', null);
            this.lup_Account.set('selectedObject', null);
            this.lup_Opportunity.set('selectedObject', null);
            this.lup_Ticket.set('selectedObject', null);
            this._isBinding = false;
        },
        _leaderChanged: function (newLeader) {
            if (this._isBinding) {
                return;
            }
            this._historyData.UserId = newLeader['$key'].substr(0, 12);
            this._historyData.UserName = newLeader['$descriptor'];
        },
        _setContactBasedOnOpportunity: function () {
            //return;

            var req = new Sage.SData.Client.SDataResourceCollectionRequest(Sage.Data.SDataServiceRegistry.getSDataService('dynamic'));
            req.setResourceKind('opportunities');
            var pathIdx = req.uri.pathSegments.length - 1;
            var resourceSegment = req.uri.getPathSegment(pathIdx);
            resourceSegment['predicate'] = '"' + this._historyData.OpportunityId + '"';
            req.uri.setPathSegment(pathIdx + 1, 'Contacts');
            req.setQueryArg('select', 'IsPrimary,Contact/NameLF,Contact/IsPrimary,Contact/WorkPhone');
            req.setQueryArg('orderby', 'IsPrimary desc');
            req.read({
                success: function (data) {
                    var oppCons = data['$resources'];
                    if (oppCons.length < 1) {
                        this._setContactToCurrentAccountPrimary();
                        return;
                    }
                    var oppPri = false, accPri = false, firstCon = oppCons[0], newActCon;
                    for (var i = 0; i < oppCons.length; i++) {
                        if (oppCons[i].IsPrimary) {
                            if (!oppPri || oppCons[i].Contact.IsPrimary) {
                                oppPri = oppCons[i];
                            }
                        }
                        if (!accPri && oppCons[i].Contact.IsPrimary) {
                            accPri = oppCons[i];
                        }
                    }

                    newActCon = oppPri || accPri || firstCon;

                    if (newActCon) {
                        this._historyData.ContactId = Sage.Utility.getValue(newActCon, 'Contact.$key');
                        this._historyData.ContactName = Sage.Utility.getValue(newActCon, 'Contact.NameLF');
                        this._historyData.PhoneNumber = Sage.Utility.getValue(newActCon, 'Contact.WorkPhone');
                        this._rebindToCurrentContact();
                    }

                },
                failure: function () {
                    this._rebindToCurrentContact();
                },
                scope: this
            });
        },
        _setContactToCurrentAccountPrimary: function () {
            //look up the primary contact...
            var req = new Sage.SData.Client.SDataResourceCollectionRequest(Sage.Data.SDataServiceRegistry.getSDataService('dynamic'));
            req.setResourceKind('accounts');
            var pathIdx = req.uri.pathSegments.length - 1;
            var resourceSegment = req.uri.getPathSegment(pathIdx);
            resourceSegment['predicate'] = '"' + this._historyData.AccountId + '"';
            req.uri.setPathSegment(pathIdx + 1, 'Contacts');
            req.setQueryArg('select', 'NameLF,IsPrimary,WorkPhone');
            req.setQueryArg('orderby', 'IsPrimary desc');  //rather than selecting "where IsPrimary", do it this way so we at least get something - if there is one that is primary, it will come back, otherwise, we'll just get one.
            req.setQueryArg('count', '1');  //only need one...
            req.read({
                success: function (data) {
                    var contacts = data['$resources'];
                    if (contacts.length < 1) {
                        //fall back to the one that was there...
                        this._rebindToCurrentContact();
                        return;
                    }
                    var primaryContact = contacts[0];
                    this._historyData.ContactId = Sage.Utility.getValue(primaryContact, '$key');
                    this._historyData.ContactName = Sage.Utility.getValue(primaryContact, 'NameLF');
                    this._historyData.PhoneNumber = Sage.Utility.getValue(primaryContact, 'WorkPhone');
                    this._isBinding = true;
                    this.lup_Contact.set('selectedObject', primaryContact);
                    this._isBinding = false;
                },
                failure: function () {
                    this._rebindToCurrentContact();
                },
                scope: this
            });
        },
        _rebindToCurrentContact: function () {
            this._isBinding = true;
            this.lup_Contact.set('selectedObject', { '$key': this._historyData.ContactId, '$descriptor': this._historyData.ContactName });
            this._isBinding = false;
        },
        _updateLookupSeedValues: function (newSeed) {
            var accId = newSeed || this._historyData.AccountId;
            this.contactLookupConfig.seedValue = accId;
            this.opportunityLookupConfig.seedValue = accId;
            this.ticketLookupConfig.seedValue = accId;
        },
        // ... endregion - data methods

        // ... region UI interactions   ...
        _setUI: function () {
            this._formatHeader();
            this._setDisabledByTimlessValue();
            if (this._isNullOrWhitespace(this._historyData.LeadId)) {
                this.rdo_Contact.set('checked', true);
            } else {
                this.rdo_Lead.set('checked', true);
            }
            this._setContactLeadVisibility();
            this._setScheduledByLabel();
            this._applySecurity();

        },

        _applySecurity: function () {
            if (this.mode === 'New') {
                this._setAccessToUI(true);
            } else if (this.mode === 'Complete') {
                this._setAccessToUI(true);
            } else {
                var svc = Sage.Services.getService('CalendarSecurityService');
                if (svc) {
                    var curUser = utility.getClientContextByKey('userID').trim();
                    var userId = this._historyData.UserId || curUser;
                    if (curUser !== userId) {
                        svc.hasAccess(userId, 'allowEdit', function (hasAccess) {
                            this._setAccessToUI(hasAccess);
                        },
                        this);
                    }
                    else {
                        this._setAccessToUI(true);
                    }
                }
            }
        },
        _setAccessToUI: function (hasAccess) {
            this._hasAccess = hasAccess;
            if ((this.mode === 'New') || ((this.mode === 'Complete'))) {
                this.rdo_Lead.set('disabled', !hasAccess);
                this.tb_Location.set('disabled', !hasAccess);
                this.pk_Regarding.set('disabled', !hasAccess);
                this.pk_Category.set('disabled', !hasAccess);
                this.pk_Priority.set('disabled', !hasAccess);
                this.dtp_startDate.set('disabled', !hasAccess);
                this.dtp_completedDate.set('disabled', !hasAccess);
                if (!hasAccess) {
                    this.sel_Duration.set('disabled', true);
                }
                this.cb_Timeless.set('disabled', !hasAccess);
                this.ta_Notes.set('disabled', !hasAccess);
                this.lup_Leader.set('disabled', !hasAccess);
                this.lup_Account.set('disabled', !hasAccess);
                this.lup_Contact.set('disabled', !hasAccess);
                this.lup_Lead.set('disabled', !hasAccess);
                this.lup_Ticket.set('disabled', !hasAccess);
                this.lup_Opportunity.set('disabled', !hasAccess);
                this.tb_LeadCompanyName.set('disabled', !hasAccess);
                this.btn_OK.set('disabled', !hasAccess);
            } else {
                this.rdo_Lead.set('disabled', true);
                this.tb_Location.set('disabled', !hasAccess);
                this.pk_Regarding.set('disabled', !hasAccess);
                this.pk_Category.set('disabled', !hasAccess);
                this.pk_Priority.set('disabled', true);
                this.dtp_startDate.set('disabled', true);
                this.dtp_completedDate.set('disabled', true);
                this.sel_Duration.set('disabled', true);
                this.cb_Timeless.set('disabled', true);
                this.ta_Notes.set('disabled', !hasAccess);
                this.lup_Leader.set('disabled', true);
                this.lup_Account.set('disabled', true);
                this.lup_Contact.set('disabled', true);
                this.lup_Lead.set('disabled', true);
                this.lup_Ticket.set('disabled', true);
                this.lup_Opportunity.set('disabled', true);
                this.tb_LeadCompanyName.set('disabled', true);
                this.btn_OK.set('disabled', !hasAccess);
            }
        },
        _setUIForActivityType: function (actType) {
            this.pk_Regarding.set('pickListName', Sage.Utility.Activity.getActivityPicklistName('Regarding', actType));
            this.pk_Category.set('pickListName', Sage.Utility.Activity.getActivityPicklistName('Category', actType));
            this.pk_Result.set('pickListName', Sage.Utility.Activity.getActivityPicklistName('Result', actType));

            //If the user doesn't have access to edit the Leader's calendar, we need to disable the OK button...
            var svc = Sage.Services.getService('CalendarSecurityService');
            this.btn_OK.set('disabled', false);  //enable it in case it was disabled the last time around...
            if (svc && this.mode !== 'New') {
                var curuser = utility.getClientContextByKey('userID').trim();
                var leader = this._historyData.UserId || curuser;
                //console.log('curuser: <' + curuser + '>   leader: <' + leader + '>');
                if (curuser !== leader) {
                    svc.hasAccess(leader, 'allowEdit', function (hasAccess) { this.btn_OK.set('disabled', !hasAccess); }, this);
                }
            }

        },
        _setDisabledByTimlessValue: function () {
            if (!this._historyData) {
                return;
            }
            var tless = this._historyData['Timeless'];
            this.dtp_startDate.set('displayTime', !tless);
            this.sel_Duration.set('disabled', tless || !this._hasAccess);
        },
        _timelessChange: function () {
            this._setDisabledByTimlessValue();
        },
        _descriptionChanged: function () {
            this._formatHeader();
        },

        _startDateChanged: function () {
            var newStartDate = this.dtp_startDate.get('value');
            this.sel_Duration.set('startTime', newStartDate);
        },
        _setContactLeadVisibility: function () {
            var cVisible = this.rdo_Contact.get('checked');
            dojo.removeClass((cVisible) ? this.contactContainer.domNode : this.leadContainer.domNode, 'display-none');
            dojo.addClass((cVisible) ? this.leadContainer.domNode : this.contactContainer.domNode, 'display-none');
        },
        _formatHeader: function () {
            var typeName;
            var typeImage;
            var modeText;
            var description;
            typeImage = Sage.Utility.Activity.getActivityImageClass(this._historyData['Type'] || 'atAppointment', 'small');
            typeName = Sage.Utility.Activity.getActivityTypeName(this._historyData['Type'] || 'atAppointment');
            modeText = (this.mode === 'New') ? this.insertText : '';
			if(typeName===this.noteText && this.mode === 'New'){
				modeText = this.insertNoteText;
				typeName="";
			}
            description = this._historyData['Description'] || '';
            if (description !== '') {
                description = ' - ' + description;
            }
            this._dialog.set('title',
                dojo.string.substitute('<div class="Global_Images icon16x16 ${0}" > </div>&nbsp;<span class="activity-dialog-title" style="max-width: 975px; text-overflow: ellipsis;">${1} ${2} ${3}</span>',
                    [typeImage, modeText, typeName, description]
                )
            );
        },
        _setScheduledByLabel: function () {
            // adds the note:  Scheduled by <user> on <scheduled Date>

            var createDate = Sage.Utility.Convert.toDateFromString(Sage.Utility.getValue(this._historyData, 'CreateDate'));
            if (createDate.getFullYear() < 1000) {
                createDate = new Date();
            }

            var createUser = Sage.Utility.getValue(this._historyData, 'CreateUser').trim();

            if (!createUser || utility.getClientContextByKey('userID') === createUser) {
                createUser = utility.getClientContextByKey('userPrettyName');
            } else if (createUser === 'PROCESS' || createUser === 'ADMIN') {
                createUser = 'Administrator';
            } else {
                this._getUserInfoFor(createUser, function (user) {
                    dojo.html.set(this.lbl_ScheduledBy, dstring.substitute(this.scheduledByFormatText, {
                        user: user['$descriptor'],
                        date: locale.format(createDate, { selector: 'date', fullYear: true, locale: Sys.CultureInfo.CurrentCulture.name })
                    }));
                });
                return;
            }

            var lbl = dstring.substitute(this.scheduledByFormatText, {
                user: createUser,
                date: locale.format(createDate, { selector: 'date', fullYear: true, locale: Sys.CultureInfo.CurrentCulture.name })
            });
            dojo.html.set(this.lbl_ScheduledBy, lbl);

        },
        _getUserInfoFor: function (userId, callback) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(Sage.Data.SDataServiceRegistry.getSDataService('dynamic', false, true, true)); //go ahead and cache this...
            request.setResourceKind('userInfo');
            request.setResourceSelector("'" + userId + "'");
            //using precedence of 0 we only get $descriptor which is <lastname, firstname>,
            //...but do we want the UserName property which is <firstname lastname>???
            request.setQueryArg('precedence', '0');
            request.read({
                success: callback,
                scope: this,
                failure: function () { }
            });
        },



        // ... endregion UI interactions

        // ... region click/action handlers
        _okClick: function () {
            delete this._historyData['Notes']; //We are dong this so that the notes property does not override it self when posting back.
            delete this._historyData['UserName']; //We are dong this so that the bussiness rules will set this when posting back.
            if (this.rdo_Lead.checked) {
                delete this._historyData['ContactId']; //We are dong this so that the bussiness rules will set this when posting back.
                delete this._historyData['ContactName']; //We are dong this so that the bussiness rules will set this when posting back.
                delete this._historyData['AccountId']; //We are dong this so that the bussiness rules will set this when posting back.
                delete this._historyData['AccountName']; //We are dong this so that the bussiness rules will set this when posting back.
                delete this._historyData['LeadName']; //We are dong this so that the bussiness rules will set this when posting back.
            }
            else {
                delete this._historyData['LeadId']; //We are dong this so that the bussiness rules will set this when posting back.
            }
            if (this.mode === 'New') {
                this._currentUserActivitySaved = true;
                this._historyStore.saveNewEntity(this._historyData, this._successfulHistorySave, this._failedHistorySave, this);
            } else {
                this._historyStore.save({
                    scope: this,
					ignoreETag:true,
                    success: this._successfulHistorySave,
                    failure: this._failedAHistorySave
                });
            }
        },
        _successfulHistorySave: function (history) {
            var waitForAttachmentsToSave = false;
            this._historyData = history;
            this.historyId = history['$key'];
            var svc = Sage.Services.getService('ClientEntityContext');
            svc.clearTemporaryContext();
            this._attachmentsSaved = true;
            if (this._attachmentList) {
                var attachments = this._attachmentList.getNewAttachments();
                if (attachments.length > 0 && this.mode === 'New') {
                    if (this._needsFollowUp()) {
                        waitForAttachmentsToSave = true;
                    }
                    this._saveAttachments(attachments);
                    this._attachmentsSaved = false;
                }
            }
            if (this.mode === 'New') {
                this.attendeesTab._addHistoryAttendee(history);
            }
            dojo.publish('/entity/history/change', [history, this]);
            this._historySaved = true;
            if (!waitForAttachmentsToSave) {
                this._hideIfComplete();
            }
        },
        _failedHistorySave: function (request) {
            console.log('an error occured saving history %o', request);
            Sage.UI.Dialogs.showError(this.couldNotSaveErrorText);
        },
        _cancelClick: function () {
            if (this.mode === 'Complete') {
                this._deleteClick();
            } else {
                this.hide();
            }
        },
        _hideIfComplete: function () {

            if (this._historySaved) {
                if (this._mode !== 'New') {
                    this._doFollowup();
                }
                else {
                    this.hide();
                }
            }
        },

        _deleteClick: function () {
            if (this._historyData && this._historyStore) {
                Sage.UI.Dialogs.raiseQueryDialogExt({
                    title: this.deleteTitle,
                    query: this.deleteMessage,
                    callbackFn: function (result) {
                        if (result) {
                            this._historyStore.deleteEntity(this._historyData, this._successfulHistoryDelete, this._failedHistoryDelete, this);
                        }
                    },
                    yesText: this.okText,
                    noText: this.cancelText,
                    icon: 'questionIcon',
                    scope: this
                });
            }

        },
        _successfulHistoryDelete: function () {
            var svc = Sage.Services.getService('ClientEntityContext');
            svc.clearTemporaryContext();
            dojo.publish('/entity/history/delete', [this._historyData['$key'], this]);
            this.hide();
        },
        _failedHistoryDelete: function (request) {
            var msg = activityUtility.findFailedRequestMessage(request, this.couldNotDeleteErrorText);
            SageDialogs.showError(msg);
        },
        _saveAttachments: function (attachments) {
            this._attachmentRequests = attachments.length;
            for (var i = 0; i < attachments.length; i++) {
                var att = attachments[i];
                var req = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('system'));
                req.setResourceKind('attachments');
                req.setResourceSelector('\'' + att.$key + '\'');
                att.historyId = this.historyId;
                for (var p in this._historyData) {
                    if (p.substring(p.length - 2) === 'Id' && p !== 'UserId') {
                        var attProp = p.substring(0, 1).toLowerCase() + p.substring(1);
                        att[attProp] = this._historyData[p];

                    }
                }
                req.update(att, {
                    success: this._successfulAttachmentSave,
                    failure: this._failedAttachmentSave,
                    scope: this
                });

            }
        },
        _removeAttachments: function () {
            if (!this._attachmentList) {
                return;
            }
            var attachments = this._attachmentList.getNewAttachments();
            for (var i = 0; i < attachments.length; i++) {
                var att = attachments[i];
                var req = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('system'));
                req.setResourceKind('attachments');
                req.setResourceSelector('\'' + att.$key + '\'');
                req['delete'](att, {
                    success: function () { },
                    failure: function () { },
                    scope: this
                });
            }
        },
        getRelationshipsForAttachments: function () {
            var obj = {};
            for (var p in this._activityData) {
                if (p.substring(p.length - 2) === 'Id' && p !== 'UserId') {
                    var attProp = p.substring(0, 1).toLowerCase() + p.substring(1);
                    obj[attProp] = this._activityData[p];
                }
            }
            if (this.mode === 'New' && !fileUtility.supportsHTML5File && !slx.desktop) {
                this._tempIdForAttachments = this._makeTempID();
                obj['historyId'] = this._tempIdForAttachments;
            }
            return obj;
        },
        _makeTempID: function () {
            if (!this._tempIdForAttachments) {
                var uid = this._currentUserId;
                var dstr = utility.Convert.toIsoStringFromDate(this.dtp_completedDate.get('value'));
                dstr = dstr.replace(/[T:-]/g, '').substr(6, 6);
                this._tempIdForAttachments = 'NE' + uid.substr(uid.length - 4, 4) + dstr;
            }
            return this._tempIdForAttachments;
        },
        _attachmentRequests: 0,
        _successfulAttachmentSave: function (attachment) {
            this._attachmentRequests--;
            if (this._attachmentRequests < 1) {
                this._attachmentsSaved = true;
                this._hideIfComplete();
            }
        },
        _failedAttachmentSave: function () {
            this._attachmentRequests--;
            if (this._attachmentRequests < 1) {
                this._attachmentsSaved = true;
                this._hideIfComplete();
            }
        },
        _needsFollowUp: function () {
            var followUp = this.sel_Followup.get('value');
            return followUp != this.noneText;
        },

        // ... endregion
        _doFollowup: function () {
            var followUp = this.sel_Followup.get('value');
            switch (followUp) {
                case this.noneText:
                    this.hide();
                    return;
                case activityUtility.getActivityTypeName('atPhoneCall'):
                    //doing the circles because of localization...
                    followUp = 'atPhoneCall';
                    break;
                case activityUtility.getActivityTypeName('atAppointment'):
                    followUp = 'atAppointment';
                    break;
                case activityUtility.getActivityTypeName('atToDo'):
                    followUp = 'atToDo';
                    break;
            }
            var historyMixin = this._getFollowUpActivityData();
            this._doingFollowup = true;
            this.hide('followup');
            window.setTimeout(function () {
                var svc = Sage.Services.getService('ActivityService');
                if (svc) {
                    svc.scheduleActivity({ 'type': followUp, 'preConfigured': historyMixin });
                }
            }, 250);
        },
        _getFollowUpActivityData: function () {
            var his = this._historyData;
            var ret = {
                AccountId: his.AccountId,
                AccountName: his.AccountName,
                ContactId: his.ContactId,
                ContactName: his.ContactName,
                Description: his.Description,
                LeadId: his.LeadId,
                LeadName: his.LeadName,
                OpportunityId: his.OpportunityId,
                OpportunityName: his.OpportunityName,
                TicketId: his.TicketId,
                TicketNumber: his.TicketNumber

            };
            if (this.ck_coNotes.get('checked')) {
                ret['LongNotes'] = his.LongNotes;
                ret['Notes'] = his.Notes;
            }
            if (this.ck_coAttachments.get('checked')) {
                ret['carryOverAttachmentsFrom'] = his.$key;
            }
            return ret;
        },

        //region lookup configs
        createAccountLookupConfig: function () {
            this.accountLookupConfig = {
                id: '_historyAcc',
                structure: [
                    {
                        "label": this.accountText,
                        "field": "AccountName"
                    },
                            {
                                "label": this.cityText,
                                "field": "Address.City"
                            },
                            {
                                "label": this.stateText,
                                "field": "Address.State"
                            },
                            {
                                "label": this.mainPhoneText,
                                "field": "MainPhone"
                            },
                            {
                                "label": this.typeText,
                                "field": "Type"
                            },
                            {
                                "label": this.subTypeText,
                                "field": "SubType"
                            },
                            {
                                "label": this.statusText,
                                "field": "Status"
                            },
                            {
                                "label": this.acctMgrText,
                                "field": "AccountManager.UserInfo.UserName"
                            },
                            {
                                "label": this.ownerText,
                                "field": "Owner.OwnerDescription"
                            }
                ],
            gridOptions: {
              contextualCondition: '',
              contextualShow: '',
              selectionMode: 'single'
            },
            storeOptions: {
              resourceKind: 'accounts',
              sort: [{ attribute: 'AccountName' }]
            },
            isModal: true,
            seedProperty: '',
            seedValue: '',
            overrideSeedValueOnSearch: false,
            initializeLookup: false,
            preFilters: [],
            returnPrimaryKey: true,
            dialogTitle: this.lookupActText,
            dialogButtonText: this.okText
            };
            return this.accountLookupConfig;
        },
        createAccountLookup: function () {
            this.createAccountLookupConfig();
            this.lup_Account = new Sage.UI.Controls.Lookup({
                id: 'history_lu_account',
                allowClearingResult: true,
                config: this.accountLookupConfig,
                readonly: true,
            });
            this.eventConnections.push(dojo.connect(this.lup_Account, 'onChange', this, '_accountChanged'));
            dojo.place(this.lup_Account.domNode, this.container_AccountLup.domNode, 'only');

        },
        createContactLookupConfig: function () {
            this.contactLookupConfig = {
                id: '_histoyContact',
                structure: [
                        {
                            label: this.nameText,
                            field: 'NameLF'
                        }, {
                            label: this.accountText,
                            field: 'Account.AccountName'
                        }, {
                            label: this.cityText,
                            field: 'Address.City'
                        }, {
                            label: this.stateText,
                            field: 'Address.State'
                        }, {
                            label: this.workphoneText,
                            field: 'WorkPhone'
                        }, {
                            label: this.emailText,
                            field: 'Email'
                        }],
                gridOptions: {
                    contextualCondition: '',
                    contextualShow: '',
                    selectionMode: 'single'
                },
                storeOptions: {
                    resourceKind: 'contacts',
                    sort: [{ attribute: 'NameLF' }]
                },
                isModal: true,
                seedProperty: 'Account.Id',
                seedValue: '',
                overrideSeedValueOnSearch: true,
                initialLookup: true,
                preFilters: [],
                returnPrimaryKey: true,
                dialogTitle: this.lookupContactText,
                dialogButtonText: this.okText
            };
            return this.contactLookupConfig;
        },
        createContactLookup: function () {
            this.createContactLookupConfig();
            this.lup_Contact = new Sage.UI.Controls.Lookup({
                id: 'history_lu_contact',
                allowClearingResult: true,
                readonly: true,
                config: this.contactLookupConfig,
                showEntityInfoToolTip: true
            });
            this.eventConnections.push(dojo.connect(this.lup_Contact, 'onChange', this, '_contactChanged'));
            dojo.place(this.lup_Contact.domNode, this.container_ContactLup.domNode, 'only');
        },
        createOpportunityLookupConfig: function () {
            this.opportunityLookupConfig = {
                id: '_historyOpp',
                structure: [
                    {
                        label: this.descriptionText,
                        field: 'Description'
                    }, {
                        label: this.acctMgrText,
                        field: 'AccountManager.UserInfo.UserName'
                    }, {
                        label: this.accountText,
                        field: 'Account.AccountName'
                    }, {
                        label: this.stageText,
                        field: 'Stage'
                    }, {
                        label: this.statusText,
                        field: 'Status'
                    }, {
                        label: this.ownerText,
                        field: 'Owner.OwnerDescription'
                    }
                ],
                gridOptions: {
                    contextualCondition: '',
                    contextualShow: '',
                    selectionMode: 'single'
                },
                storeOptions: {
                    resourceKind: 'opportunities',
                    sort: [{ attribute: 'Description' }]
                },
                isModal: true,
                seedProperty: 'Account.Id',
                seedValue: '',
                overrideSeedValueOnSearch: true,
                initialLookup: true,
                preFilters: [],
                returnPrimaryKey: true,
                dialogTitle: this.lookupOpportunityText,
                dialogButtonText: this.okText
            };
            return this.opportunityLookupConfig;
        },
        createOpportunityLookup: function () {
            this.createOpportunityLookupConfig();
            this.lup_Opportunity = new Sage.UI.Controls.Lookup({
                id: 'history_lu_opportunity',
                allowClearingResult: true,
                readonly: true,
                config: this.opportunityLookupConfig,
                showEntityInfoToolTip: true
            });
            this.eventConnections.push(dojo.connect(this.lup_Opportunity, 'onChange', this, '_opportunityChanged'));
            dojo.place(this.lup_Opportunity.domNode, this.container_OppLup.domNode, 'only');
        },
        createTicketLookupConfig: function () {
            this.ticketLookupConfig = {
                id: '_historyTicket',
                structure: [
                    {
                        label: this.ticketNumberText,
                        field: 'TicketNumber'
                    }, {
                        label: this.accountText,
                        field: 'Account.AccountName'
                    }, {
                        label: this.nameText,
                        field: 'Contact.NameLF'
                    }, {
                        label: this.phoneText,
                        field: 'Contact.WorkPhone'
                    }, {
                        label: this.statusText,
                        field: 'StatusCode',
                        pickListName: '',
                        propertyType: 'SalesLogix.PickList'
                    }, {
                        label: this.urgencyText,
                        field: 'Urgency.Description'
                    }, {
                        label: this.areaText,
                        field: 'Area'
                    }
                ],
                gridOptions: {
                    contextualCondition: '',
                    contextualShow: '',
                    selectionMode: 'single'
                },
                storeOptions: {
                    resourceKind: 'tickets',
                    sort: [{ attribute: 'TicketNumber' }]
                },
                isModal: true,
                seedProperty: 'Account.Id',
                seedValue: '',
                overrideSeedValueOnSearch: true,
                initialLookup: true,
                preFilters: [],
                returnPrimaryKey: true,
                dialogTitle: this.lookupTicketText,
                dialogButtonText: this.okText
            };
            return this.ticketLookupConfig;
        },
        createTicketLookup: function () {
            this.createTicketLookupConfig();
            this.lup_Ticket = new Sage.UI.Controls.Lookup({
                id: 'history_lu_ticket',
                allowClearingResult: true,
                readonly: true,
                config: this.ticketLookupConfig,
                showEntityInfoToolTip: true
            });
            this.eventConnections.push(dojo.connect(this.lup_Ticket, 'onChange', this, '_ticketChanged'));
            dojo.place(this.lup_Ticket.domNode, this.container_TicketLup.domNode, 'only');
        },
        createLeadLookupConfig: function () {
            this.leadLookupConfig = {
                id: '_historyLead',
                structure: [
                    {
                        label: this.nameText,
                        field: 'LeadFullName'
                    }, {
                        label: this.companyText,
                        field: 'Company'
                    }, {
                        label: this.cityText,
                        field: 'Address.City'
                    }, {
                        label: this.stateText,
                        field: 'Address.State'
                    }, {
                        label: this.postalText,
                        field: 'Address.PostalCode'
                    }, {
                        label: this.statusText,
                        field: 'Status'
                    }, {
                        label: this.workphoneText,
                        field: 'WorkPhone'//,
                        //'styles': 'text-align: right;'
                    }, {
                        label: this.ownerText,
                        field: 'Owner.OwnerDescription'
                    }
                ],
            gridOptions: {
              contextualCondition: '',
              contextualShow: '',
              selectionMode: 'single'
            },
            storeOptions: {
              resourceKind: 'leads',
              sort: [{ attribute: 'LeadFullName' }]
            },
            isModal: true,
            initialLookup: false,
            preFilters: [],
            returnPrimaryKey: true,
            dialogTitle: this.lookupLeadText,
            dialogButtonText: this.okText
            };
            return this.leadLookupConfig;
        },
        createLeadLookup: function () {
            this.createLeadLookupConfig();
            this.lup_Lead = new Sage.UI.Controls.Lookup({
                id: 'history_lu_lead',
                allowClearingResult: true,
                readonly: true,
                config: this.leadLookupConfig,
                showEntityInfoToolTip: true
            });
            this.eventConnections.push(dojo.connect(this.lup_Lead, 'onChange', this, '_leadChanged'));
            dojo.place(this.lup_Lead.domNode, this.container_LeadLup.domNode, 'only');
        },
        createLeaderLookupConfig: function () {
            this.leaderLookupConfig = {
                id: '_historyLeader',
                structure: [
                    {
                        label: this.nameText,
                        field: 'Name',
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
                        return 'AllowAdd AND (AccessId eq \'' + utility.getClientContextByKey('userID') + '\' OR AccessId eq \'EVERYONE\') AND Type eq \'User\'';
                    },
                    contextualShow: '',
                    selectionMode: 'single'
                },
                storeOptions: {
                    resourceKind: 'activityresourceviews',
                    sort: [{ attribute: 'Name' }]
                },
                isModal: true,
                preFilters: [],
                returnPrimaryKey: true,
                dialogTitle: this.lookupLeaderText,
                dialogButtonText: this.okText
            };
            return this.leaderLookupConfig;
        },
        createLeaderLookup: function () {
            this.createLeaderLookupConfig();
            this.lup_Leader = new Sage.UI.Controls.Lookup({
                id: 'history_lu_leader',
                readonly: true,
                config: this.leaderLookupConfig
            });
            this.eventConnections.push(dojo.connect(this.lup_Leader, 'onChange', this, '_leaderChanged'));
            dojo.place(this.lup_Leader.domNode, this.container_LeaderLup.domNode, 'only');
        },
        //end region lookup configs

        _updateLocation: function (newLocation, isAdd) {
            var location = this._historyData.Location;
            if (!location || location === '') {
                if (isAdd) {
                    location = newLocation;
                }
            } else {
                var parts = location.split('; ');
                var newParts = [];
                var exists = false;
                for (var i = 0; i < parts.length; i++) {
                    if (parts[i] === newLocation) {
                        if (isAdd) {
                            exists = true;
                        } else {
                            continue;
                        }
                    }
                    newParts.push(parts[i]);
                }
                if (!exists && isAdd) {
                    newParts.push(newLocation);
                }
                location = newParts.join('; ');
            }
            Sage.Utility.setValue(this._historyData, 'Location', location);
            this.tb_Location.set('value', location);
        },

        _formatDateForQuery: function (d) {
            return ["'", d.getUTCFullYear(), '-', d.getUTCMonth() + 1, '-', d.getUTCDate(), "'"].join('');
        },
        postCreate: function () {
            this.inherited(arguments);
            this._addAttendeesTab();

        },
        _addAttendeesTab: function () {
            //Create new attendee tab
            var attendeesTab = this.attendeesTab = new HistoryAttendeesTab();
            // Create a new ContentPane with the agenda tab as the contents
            var cp = new ContentPane({
                id: 'histAttendeesTabPane',
                title: this.tabNameParticipants,
                'class': 'tabContent remove-padding'
            }, attendeesTab.domNode);

            //Add attendees ContentPane to table container that is already defined in the activity editor
            this.tc_EditHistory.addChild(cp);
            attendeesTab.histEditor = this;
            attendeesTab.startup();
            on(cp, 'show', function () { attendeesTab._tabShow(); });
        },

        _successfulComplete: function (history) {

            var self = this;
            var _arguments = arguments;
            var deferred = this.attendeesTab._historySaved(history);
            deferred.then(function (value) {
                //debugger;
                self.inherited(_arguments);
            });

        },

    });
    return historyEditor;

});
