/*globals Sage, dojo, define */
define("Sage/UI/ActivityList", [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'Sage/Utility',
    'Sage/Utility/Activity',
    'Sage/UI/Controls/GridParts/Columns/DateTime',
    'Sage/UI/Controls/GridParts/Columns/SlxLink',
    'dijit/form/FilteringSelect',
    'Sage/UI/SLXPreviewGrid/Filter/DateRange',
    'Sage/UI/SLXPreviewGrid/Filter/ActivityDateRange',
    'Sage/UI/SLXPreviewGrid/Filter/Text',
    'dojo/data/ItemFileReadStore',
    'dojo/string',
    'Sage/UI/SLXPreviewGrid/Filter/_previewGridFilterMixin',
    'Sage/UI/SLXPreviewGrid/Filter/Lookup',
    'Sage/Data/SDataServiceRegistry',
    'dojo/i18n!./nls/ActivityList',
    'Sage/Utility/Workspace',
    'Sage/UI/GridView',
    'dojo/on'
],
function (declare,
    lang,
    _Widget,
    utility,
    activityUtility,
    ColumnsDateTime,
    ColumnsLink,
    FilteringSelect,
    DateRangeFilter,
    ActivityDateRangeFilter,
    TextFilter,
    ItemFileReadStore,
    dString,
    filterMixin,
    lookupFilter,
    sDataServiceRegistry,
    i18nStrings,
    workspaceUtil,
    GridView,
    on) {

    var activityTypeFilterWidget = declare('Sage.UI.ActivityTypeFilterWidget', [_Widget, filterMixin], {
        // summary:
        //  Filter widget for the history or activity type.   

        postCreate: function () {
            this.inherited(arguments);
            var div = document.createElement("div");
            this.domNode.appendChild(div);
            var options = [];
            dojo.forEach(["atAppointment", "atPhoneCall", "atToDo", "atPersonal"], function (item) {
                options.push({ name: activityUtility.getActivityTypeName(item), id: item });
            });
            var store = new ItemFileReadStore({
                data: { items: options, label: 'name', identifier: 'id' }
            });
            this._select = new FilteringSelect({
                store: store, required: false
            }, div);
        },

        getQuery: function () {
            var v = this._select.get('value');
            if (v) {
                return "Type eq '" + v + "'";
            }
            return "";
        },

        reset: function () {
            this._select.set('value', null);
        },
        getState: function () {
            return { 'value': this._select.get('value') };
        },
        applyState: function (state) {
            if (state) {
                this._select.set('value', state['value'] || '');
            }
        }
    });


    var activityList = declare('Sage.UI.ActivityList', [_Widget], {
        placeHolder: '',
        conditionFmt: '',
        parentRelationshipName: '',
        workspace: '',
        tabId: '',
        connections: [],
        constructor: function (options) {
            this.connections = [];
        },
        startup: function () {
            //console.dir(this);
            var toolConfig = [
                {
                    id: 'SchedulePhoneCall',
                    imageClass: 'icon_Schedule_Meeting_16x16',
                    handler: function () { Sage.Link.scheduleMeeting(); },
                    alternateText: i18nStrings.addMeetingText
                }, {
                    id: 'ScheduleMeeting',
                    imageClass: 'icon_Schedule_Call_16x16',
                    handler: function () { Sage.Link.schedulePhoneCall(); },
                    alternateText: i18nStrings.addPhoneCallText
                }, {
                    id: 'ScheduleToDo',
                    imageClass: 'icon_Schdedule_To_Do_16x16',
                    handler: function () { Sage.Link.scheduleToDo(); },
                    alternateText: i18nStrings.addToDoText
                }, {
                    id: this.id + '_Help',
                    imageClass: 'icon_Help_16x16',
                    handler: function () { utility.openHelp('activitiestab'); },
                    alternateText: i18nStrings.helpText
                }
            ];

            var columnConfig = [
            // this is used to add an id to every row, for test automation
                {
                    field: '$key',
                    editable: false,
                    hidden: true,
                    unhidable: true,
                    id: 'id',
                    formatter: function (value, rowIdx) {
                        return ['<div id=', value, ' >', value, '</ div>'].join('');
                    }
                },
                {
                    field: '$key',
                    label: i18nStrings.completeText,
                    sortable: false,
                    width: '90px',
                    type: activityUtility.activityCompleteCell
                }, {
                    field: 'Type',
                    label: i18nStrings.typeText,
                    type: activityUtility.activityTypeCell,
                    width: '90px',
                    filterConfig: { widgetType: activityTypeFilterWidget }
                }, {
                    field: 'StartDate',
                    label: i18nStrings.startDateText,
                    type: ColumnsDateTime,
                    useFiveSecondRuleToDetermineTimeless: true,
                    getTimeless: true,
                    width: '100px',
                    filterConfig: {
                        widgetType: DateRangeFilter,
                        label: i18nStrings.dateRangeText
                    }
                }, {
                    field: 'Duration',
                    label: i18nStrings.durationText,
                    type: activityUtility.activityDurationCell,
                    width: '40px'
                }, {
                    field: 'Leader',
                    label: i18nStrings.leaderText,
                    type: activityUtility.activityLeaderCell,
                    width: '90px',
                    filterConfig: {
                        widgetType: lookupFilter,
                        lookupStructure: [
                            {
                                label: i18nStrings.firstNameText || 'First Name',
                                field: 'UserInfo.FirstName',
                                sortable: true,
                                width: '200px',
                                editable: false,
                                propertyType: 'System.string',
                                excludeFromFilters: false,
                                defaultValue: ''
                            },
                            {
                                label: i18nStrings.lastNameText || 'Last Name',
                                field: 'UserInfo.LastName',
                                sortable: true,
                                width: '200px',
                                editable: false,
                                propertyType: 'System.string',
                                excludeFromFilters: false,
                                defaultValue: ''
                            },
                            {
                                label: i18nStrings.typeText || 'Type',
                                field: 'Type',
                                sortable: true,
                                width: '100px',
                                editable: false,
                                propertyType: 'System.string',
                                excludeFromFilters: false,
                                defaultValue: ''
                            }
                        ],
                        lookupGridOptions: {
                            contextualCondition: function () {
                                var where = '';
                                where = '((Type ne \'Template\') and (Type ne \'Retired\'))';
                                return where;
                            },
                            contextualShow: '',
                            selectionMode: 'single'
                        },
                        lookupStoreOptions: {
                            resourceKind: 'users',
                            sort: [{ attribute: 'UserInfo.FirstName' }]
                        },
                        getQuery: function () {
                            var obj = this._lup.get('selectedObject');
                            if (obj && obj['$key']) {
                                return 'Leader eq \'' + obj['$key'].substr(0, 12) + '\'';
                            }
                            return '';
                        }
                    }
                }
            ];
            this._addEntitySpecificColumns(columnConfig);

            columnConfig.push({
                field: 'Description',
                label: i18nStrings.descriptionText,
                width: '200px',
                filterConfig: { widgetType: TextFilter }
            });
            columnConfig.push({
                field: 'Category',
                label: i18nStrings.categoryText,
                width: '75px'
            });

            var editActivity = function (id, obj) {
                var activityId = id;
                var recurring = false;
                if (obj && obj["$descriptor"] == "Sage.SalesLogix.Activity.Entities.ActivityAttendee" && obj["Activity"]) {
                    activityId = obj["Activity"]["$key"];
                    recurring = obj["Activity"]["Recurring"];
                } else if (obj) {
                    recurring = obj["Recurring"];
                }
                Sage.Link.editActivity(activityId, recurring);
            };

            var parentRelationshipName = this.parentRelationshipName;
            var options = {
                id: 'ActivityList',
                tools: toolConfig,
                columns: columnConfig,
                previewField: 'Notes',
                fullNoteField: 'LongNotes',
                minRowsPerPage: 20,
                storeOptions: {
                    select: ['ContactId', 'OpportunityId', 'AccountId', 'LeadId', 'Description', 'Duration', 'Recurring', 'Type', 'Category', 'Timeless', 'Notes'],
                    include: ['Leader', '$descriptors'],
                    resourceKind: "activities",
                    service: sDataServiceRegistry.getSDataService('system'),
                    where: function () {
                        var entityRelationId = parentRelationshipName;
                        var fmt = '(Type eq \'atAppointment\' or Type eq \'atPhoneCall\' or Type eq \'atToDo\' or Type eq \'atPersonal\') and ${0} eq \'${1}\'';
                        if (parentRelationshipName === "ContactId" || parentRelationshipName === "LeadId") {
                            entityRelationId = 'ActivityAttendees.EntityId';
                        } else if (parentRelationshipName === "AccountId") {
                            //fmt = '(Type eq \'atAppointment\' or Type eq \'atPhoneCall\' or Type eq \'atToDo\' or Type eq \'atPersonal\') and (${0} eq \'${1}\' or ${2} eq \'${1}\')';
                            //entityRelationId = 'ActivityAttendees.AccountId';
                            entityRelationId = parentRelationshipName;
                        }
                        return dString.substitute(fmt, [entityRelationId, utility.getCurrentEntityId(), parentRelationshipName]);
                    },
                    queryArgs: {
                        _expandRecurrences: 'false'
                    }
                },
                slxContext: { workspace: this.workspace, tabId: this.tabId },
                sort: [{ attribute: 'StartDate' }],
                placeHolder: this.placeHolder,
                columnHiding: true,
                columnResizing: true,
                columnReordering: true,
                selectionMode: 'extended',
                rowSelection: true
            };


            //fire this so that customizations can change these options without overriding the whole thing
            this.onBeforeCreateGrid(options);

            var grid = this._grid = new GridView(options);
            grid.createGridView();

            grid.grid.onRowDblClick = function (row) {
                editActivity(row.id, row.data);
            };

            // This is not a typo.  The dijit.layout.ContentPane is not affectively determining all of it's layout information
            // on the first pass through resize.  Calling resize twice effectively renders the grid to fill it's container.

            this.connections.push(dojo.subscribe('/entity/activity/create', this, this.onActivityChanges));
            this.connections.push(dojo.subscribe('/entity/activity/change', this, this.onActivityChanges));
            this.connections.push(dojo.subscribe('/entity/activity/delete', this, this.onActivityChanges));
            dojo.connect(grid, 'destroy', this, this.destroy);
        },
        onActivityChanges: function (activity) {
            this._grid.refresh();
        },
        destroy: function () {
            for (var i = 0; i < this.connections.length; i++) {
                dojo.unsubscribe(this.connections.pop());
            }
            this.inherited(arguments);
        },
        _addEntitySpecificColumns: function (columnConfig) {
            var entityType = Sage.Services.getService('ClientEntityContext').getContext().EntityType;
            switch (entityType) {
                case "Sage.Entity.Interfaces.IAccount":
                case "Sage.Entity.Interfaces.IOpportunity":
                    columnConfig.push({
                        field: 'ContactName',
                        label: i18nStrings.contactText,
                        width: '100px',
                        type: ColumnsLink,
                        idField: 'ContactId',
                        pageName: 'Contact'
                    });
                    break;
                case "Sage.Entity.Interfaces.IContact":
                    columnConfig.push({
                        field: 'OpportunityName',
                        label: i18nStrings.opportunityText,
                        width: '100px',
                        type: ColumnsLink,
                        idField: 'OpportunityId',
                        pageName: 'Opportunity'
                    });
                    break;
            }
        },
        onBeforeCreateGrid: function (options) {
        }
    });
    return activityList;
});
