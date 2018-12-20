/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define('Sage/MainView/ActivityMgr/HistoryEditorAttendeesTab', [
        'dojo',
        'dijit/_Widget',
        'Sage/_Templated',
        'dojo/_base/declare',
        'Sage/Data/SDataServiceRegistry',
        'Sage/Utility',
        'Sage/Utility/Activity',
          'dojo/_base/array',
        'dojo/_base/lang',
        'dojo/i18n!./nls/HistoryEditorAttendeesTab',
        'Sage/UI/GridView',
        'Sage/UI/Controls/GridParts/Columns/CheckBox',
        'dojo/store/Memory',
        'dojo/data/ObjectStore',
        'dijit/form/Select'
],
    function (dojo, _Widget, _Templated, declare, sDataServiceRegistry, utility, activityUtility, array, lang, nlsStrings, GridView, CheckBox, Memory, ObjectStore, Select) {
        //The HistoryEditorAttendeesTab is a customization displaying how to add a tab to the activity dialog
        //  with a datagrid for adding and editing a collection of related entities.
        //The code to add it is below the declaration.
        var attendeesTab = declare('Sage.MainView.ActivityMgr.HistoryEditorAttendeesTab', [_Widget, _Templated], {
            histEditor: null,
            lup_Contact: null,
            lup_ContactConfig: null,
            lup_Lead: null,
            lup_LeadConfig: null,
            widgetsInTemplate: true,
            _timeZones: [],
            //the template for the tab content is simply a placeholder for the grid created in code

            constructor: function () {
                lang.mixin(this, nlsStrings);
                var self = this;
                if (this._timeZones.length == 0) {
                    Sage.Utility.getTimeZones(function (result) {
                        self._timeZones = result;
                    });
                }
            },

            widgetTemplate: new Simplate([
                '<div>',
                    '<div id="{%= $.id %}_hisAttendeesGridPlaceholder" dojoAttachPoint="_histAttendeesGridPlaceholder" style="width:100%;height:100%"></div>',
                '</div>'
            ]),
            //keep an internal list of new _attendee items as they are added
            _newItems: [],
            //this is called once by the code that adds the tab to the activity editor.
            //build the grid and connect event listeners for important events.
            startup: function () {
                //console.log("_attendeesTab startup");
                this._newItems = [];
                //this.actEditor = //dijit.byId('activityEditor');
                //if we cannot find the editor, we really cannot do much, don't create the grid
                if (!this.histEditor) {
                    return;
                }
                this._buildGrid();
                //listen for when activities are saved so we can ensure the correct relationships and save the agenda
                dojo.subscribe('/entity/history/create', this, this._historySaved);
                dojo.subscribe('/entity/history/change', this, this._historySaved);

                // this.createLookups();
            },
            _getTimeZoneDisplayName: function (keyName) {
                var displayName = keyName;
                if (this._timeZones && this._timeZones.length > 0) {
                    var obj = this._timeZones.filter(function (val) {
                        return val.Keyname === keyName;
                    });
                    if (obj && obj[0]) {
                        displayName = obj[0].Displayname;
                    }
                }
                return displayName;
            },
            _buildGrid: function () {
                var self = this;

                var onComplete = function (data, context) {
                    array.forEach(data, function (item, i) {
                        if (item["TimeZone"]) {
                            item["TimeZone"] = self._getTimeZoneDisplayName(item["TimeZone"]);
                        }
                    });
                };

                var attendeeStatusStore = new ObjectStore({
                    objectStore: new Memory({
                        idProperty: "name",
                        data: [
                            { "name": "Attended", "id": "T" },
                            { "name": "Not Attended", "id": "F" },
                            { "name": "Declined", "id": "D" }
                        ]
                    }),
                    labelProperty: "name"
                });

                //define the columns:
                var columns = [
                   {
                       field: 'Name',
                       label: this.header_Name,
                       width: '180px'
                   }, {
                       field: 'AccountName',
                       label: this.header_AccountName,
                       width: '180px'
                   }, {
                       field: 'EntityType',
                       label: this.header_Type,
                       width: '60px'
                   }, {
                       field: 'IsPrimary',
                       label: this.header_Primary,
                       width: '40px',
                       editor: CheckBox,
                       editorArgs: {
                           disabled: true
                       }
                   }, {
                       field: 'IsAttendee',
                       label: this.header_Attendee,
                       width: '40px',
                       editor: CheckBox,
                       editorArgs: {
                           disabled: true
                       }
                   }, {
                       field: 'Status',
                       label: this.header_Status,
                       width: '100px',
                       get: function (item) {
                           for (var i = 0; i < attendeeStatusStore.objectStore.data.length; i++) {
                               if (attendeeStatusStore.objectStore.data[i].id == item[this.field]) {
                                   return attendeeStatusStore.objectStore.data[i].name;
                               }
                           }
                       },
                       set: function (item) {
                           for (var i = 0; i < attendeeStatusStore.objectStore.data.length; i++) {
                               if (attendeeStatusStore.objectStore.data[i].name == item[this.field]) {
                                   return attendeeStatusStore.objectStore.data[i].id;
                               }
                           }
                       },
                       editor: Select,
                       editorArgs: {
                           store: attendeeStatusStore
                       },
                       editOn: 'click'
                   }, {
                       field: 'RoleName',
                       label: this.header_RoleName
                   }, {
                       field: 'PhoneNumber',
                       label: this.header_Phone,
                       width: '80px'
                   }, {
                       field: 'Email',
                       name: this.header_Email,
                       width: '150px'
                   }, {
                       field: 'TimeZone',
                       label: this.header_TimeZone,
                       width: '150px'
                   }
                   /*, {
                       field: 'Note',
                       name: this.header_Notes,
                       width: '240px'
                   }    */
                ];
                //set up the rest of the grid options:
                var options = {
                    columns: columns,
                    storeOptions: {
                        service: sDataServiceRegistry.getSDataService('dynamic'),
                        resourceKind: 'historyAttendees',
                        select: ['EntityType', 'EntityId', 'IsPrimary', 'IsAttendee', 'Name', 'Description', 'Notes', 'Status'],
                        newItemParentReferenceProperty: 'History',
                        onComplete: onComplete,
                        where: function () {
                            return "(HistoryId eq '" + utility.getCurrentEntityId() + "' and (SLXUserAssociationId eq null or SLXUserAssociationId eq ''))";
                        },
                        scope: this
                    },
                    slxContext: { 'workspace': '', tabId: '' },
                    sort: [{ attribute: 'Name' }],
                    minRowsPerPage: 40,
                    placeHolder: this._histAttendeesGridPlaceholder,
                    columnHiding: true,
                    columnResizing: true,
                    columnReordering: true,
                    selectionMode: 'single',
                    rowSelection: true,
                    keyboardNavigation: false
                };

                var grid = this._grid = new GridView(options);
                grid.createGridView();

                dojo.connect(this._grid, 'markDirty', function () {
                    var dirtyDataMsg = dojo.byId(this.dirtyDataMsgID);
                    if (dirtyDataMsg) {
                        dojo.style(dojo.byId(this.dirtyDataMsgID), 'display', 'none');
                    }
                    var bindingMgr = Sage.Services.getService('ClientBindingManagerService');
                    if (bindingMgr) {
                        bindingMgr.clearDirtyAjaxItem(this.id);
                    }
                });
            },
            _tabfShow: function () {
                if (this._grid && !this.gridRefreshed) {
                    this._grid.refresh();
                    this.gridRefreshed = true;
                }
            },
            //Handler for when the tab is opened.
            _tabShowdd: function () {
                if (this._grid && !this.gridRefreshed) {

                    //check to see if the activity is a new one or not so we can set the grid
                    // to be in the correct "mode".
                    var gridmode = this._grid.get('mode');
                    var actid = utility.getCurrentEntityId();
                    if ((!actid && gridmode !== 'insert') || (actid && gridmode === 'insert')) {
                        this._grid.set('mode', (!actid) ? 'insert' : '');
                    }
                    this._grid.refresh();
                    this.gridRefreshed = true;
                }
            },
            _tabShow: function () {
                if (this._grid) {
                    //check to see if the activity is a new one or not so we can set the grid
                    // to be in the correct "mode".
                    var gridmode = this._grid.get('mode');
                    var actid = utility.getCurrentEntityId();
                    if ((!actid && gridmode !== 'insert') || (actid && gridmode === 'insert')) {
                        this._grid.set('mode', (!actid) ? 'insert' : '');
                    }
                    this._grid.refresh();
                    this._grid.grid.resize();
                }
            },
            _historySaved: function (history) {
                // TODO: remove direct grid save reference
                this._grid.grid._grid.save();
            },

            /**         
            * When a history item is created directly (notes) from History Editor, get the primary Contact/Lead and add it to HistoryAttendee
            * @param {object} history    
            */
            _addHistoryAttendee: function (history) {
                if (!history.ContactId && !history.LeadId) {
                    return;
                }

                var attendee = null;

                if (history.ContactId) {
                    activityUtility._getContactData(history.ContactId, function (data) {
                        if (data) {
                            attendee = this._setHistoryAttendeeEntityFromContactLead('Contact', data);
                            attendee.History = { '$key': history.$key };
                            this._saveHistoryAttendee(attendee);
                        }
                    }, this);
                } else if (history.LeadId) {
                    activityUtility._getLeadData(history.LeadId, function (data) {
                        if (data) {
                            attendee = this._setHistoryAttendeeEntityFromContactLead('Lead', data);
                            attendee.History = { '$key': history.$key };
                            this._saveHistoryAttendee(attendee);
                        }
                    }, this);

                }
            },
            _saveHistoryAttendee: function (attendee) {
                var req = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('dynamic'))
                            .setResourceKind('historyAttendees')
                            .create(attendee, {
                                success: function () {
                                    //console.log("success");
                                },
                                failure: function () {
                                    console.log('historyAttendee item did not save');
                                },
                                scope: this
                            });
            },
            _setHistoryAttendeeEntityFromContactLead: function (type, results) {
                var attendeeEntity = false;
                if (results && results.$key) {
                    attendeeEntity = {};
                    attendeeEntity.EntityType = type;
                    attendeeEntity.EntityId = results.$key;
                    attendeeEntity.$key = results.$key;
                    attendeeEntity.IsPrimary = true;
                    attendeeEntity.Name = results.$descriptor;
                    attendeeEntity.$descriptor = results.$descriptor;
                    attendeeEntity.Account = null;
                    attendeeEntity.AccountName = results.AccountName || results.Company;
                    if (type == "Lead") {
                        attendeeEntity.Company = results.Company;
                        attendeeEntity.LeadFullName = results.$descriptor;
                    }
                    attendeeEntity.Company = results.Company;
                    attendeeEntity.Email = results.Email;
                    attendeeEntity.Description = "";
                    attendeeEntity.Notes = "";
                    if (results.Address) {
                        attendeeEntity.TimeZone = results.Address.TimeZone;
                    }
                    attendeeEntity.PhoneNumber = results.WorkPhone;
                    attendeeEntity.RoleName = "";
                    attendeeEntity.general = false;

                }
                return attendeeEntity;
            }
        });
        return attendeesTab;
    });
