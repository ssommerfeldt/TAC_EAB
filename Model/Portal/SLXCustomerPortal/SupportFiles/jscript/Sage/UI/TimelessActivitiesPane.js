/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/TimelessActivitiesPane", [
    'dijit/_Widget',
    'dojo/i18n',
    'Sage/UI/Controls/GridParts/Columns/ActivityType',
    'Sage/UI/Controls/GridParts/Columns/HistoryType',
    'Sage/Utility',
    'Sage/Data/SDataServiceRegistry',
    'Sage/Data/WritableSDataStore',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/i18n!./nls/TimelessActivitiesPane',
    'dojo/_base/declare',
    'Sage/UI/Controls/Grid',
    'dojo/_base/connect',
    'Sage/Store/SData',
    'Sage/UI/MenuItem'
], function (_Widget, i18n, activityType, historyType, sUtility, sDataServiceRegistry, writableSDataStore, lang, dstring, nlsResource, declare, Grid, connect, SDataObjectStore, MenuItem) {
    var timelessGrid = declare('Sage.UI.TimelessActivitiesPane', _Widget, {
        gridMode: null,
        Id: null,
        grid: null,
        currentUserIds: [],
        userColor: [],
        queryStartDate: null,
        queryEndDate: null,
        currentUserDeafultCalendarView: null,
        schedulerDate: null,
        weekStart: null,
        workWeekStart: null,
        weekEnd: null,
        workWeekEnd: null,
        users: {},
        userActivities: [],

        // i18n strings from nls\{language}\TimelessActivitiesPane.js

        constructor: function (options) {
            lang.mixin(this, i18n.getLocalization("Sage.UI", "TimelessActivitiesPane", this.lang));
            this.Id = options.Id;
            this.users = options.users;
            this.gridMode = options.mode;
            var cUserId;
            var self = this;

            var setQueryDates = function (data) {
                var ndate = data.date.valueOf();
                switch (data.mode) {
                    case 'day':
                        var stDate = new Date(ndate);
                        stDate.setHours(0, 0, 0, 0);
                        self.queryStartDate = Sage.Utility.Activity.formatRawTimelessStartDate(stDate);
                        self.queryEndDate = Sage.Utility.Activity.formatRawTimelessEndDate(stDate);
                        break;
                    case 'month':
                        var daysInMonth = dojo.date.getDaysInMonth(new Date(ndate));
                        var firstDayOfMonth = new Date(new Date(ndate).setDate(1));
                        firstDayOfMonth.setHours(0, 0, 0, 0);
                        var lastDayOfMonth = new Date(new Date(ndate).setDate(daysInMonth));
                        lastDayOfMonth.setHours(0, 0, 0, 0);
                        self.queryStartDate = Sage.Utility.Activity.formatRawTimelessStartDate(firstDayOfMonth);
                        self.queryEndDate = Sage.Utility.Activity.formatRawTimelessEndDate(lastDayOfMonth);
                        break;
                    case 'week':
                        var weekStartDate = new Date(data.weekStartDate.valueOf());
                        var weekEndDate = new Date(data.weekEndDate.valueOf());
                        weekStartDate.setHours(0, 0, 0, 0);
                        weekEndDate.setHours(0, 0, 0, 0);
                        self.queryStartDate = Sage.Utility.Activity.formatRawTimelessStartDate(weekStartDate);
                        self.queryEndDate = Sage.Utility.Activity.formatRawTimelessEndDate(weekEndDate);
                        break;
                    case 'workweek':
                        var workWeekStartDate = new Date(data.workWeekStartDate.valueOf());
                        var workWeekEndDate = new Date(data.workWeekEndDate.valueOf());
                        workWeekStartDate.setHours(0, 0, 0, 0);
                        workWeekEndDate.setHours(0, 0, 0, 0);
                        self.queryStartDate = Sage.Utility.Activity.formatRawTimelessStartDate(workWeekStartDate);
                        self.queryEndDate = Sage.Utility.Activity.formatRawTimelessEndDate(workWeekEndDate);
                        break;
                    default:
                        var sDate = new Date(ndate);
                        sDate.setHours(0, 0, 0, 0);
                        self.queryStartDate = Sage.Utility.Activity.formatRawTimelessStartDate(sDate);
                        self.queryEndDate = Sage.Utility.Activity.formatRawTimelessEndDate(sDate, "day", 1);
                        break;
                }
            };

            if (this.users) {
                for (var i in this.users) {
                    cUserId = lang.trim(this.users[i]["userId"].toString());
                    var tUserId = dstring.substitute('\'${0}\'', [cUserId]);
                    if (dojo.indexOf(this.currentUserIds, tUserId) == -1) {
                        this.currentUserIds.push(tUserId);
                    }
                    if (this.users[i]["usercolor"]) {
                        this.userColor[cUserId] = lang.trim(this.users[i]["usercolor"].toString());
                    }
                    if (this.currentUserDeafultCalendarView === null) {
                        this.currentUserDeafultCalendarView = this.users[i]["defaultcalendarview"].toString();
                    }
                    if (this.weekStart === null) {
                        this.weekStart = this.users[i]["weekstartdate"];
                    }
                    if (this.weekEnd === null) {
                        this.weekEnd = this.users[i]["weekenddate"];
                    }
                    if (this.workWeekStart === null) {
                        this.workWeekStart = this.users[i]["workweekstartdate"];
                    }
                    if (this.workWeekEnd === null) {
                        this.workWeekEnd = this.users[i]["workweekenddate"];
                    }
                }

                var dataObj = {};
                dataObj.mode = this.currentUserDeafultCalendarView;
                dataObj.date = new Date();
                dataObj.weekStartDate = this.weekStart;
                dataObj.weekEndDate = this.weekEnd;
                dataObj.workWeekStartDate = this.workWeekStart;
                dataObj.workWeekEndDate = this.workWeekEnd;

                setQueryDates(dataObj);
            }
            connect.subscribe("/sage/ui/calendarUserList/updated", function addUser(usersList) {
                if (usersList) {
                    self.currentUserIds = [];
                    for (var i in usersList) {
                        var cUserId = lang.trim(usersList[i]["userId"].toString());
                        var tUserId = dstring.substitute('\'${0}\'', [cUserId]);
                        if (dojo.indexOf(self.currentUserIds, tUserId) == -1) {
                            self.currentUserIds.push(tUserId);
                        }
                        if (usersList[i]["usercolor"]) {
                            self.userColor[cUserId] = lang.trim(usersList[i]["usercolor"].toString());
                        }
                    }
                }
                self.userActivities = [];
                setTimeout(function () { self.grid.refresh(); }, "1");
            });

            connect.subscribe("/sage/ui/calendarUser/selectionChanged/add", function addUser(data) {
                var userId = lang.trim(data.userId.toString());
                var nUserId = dstring.substitute('\'${0}\'', [userId]);
                if (dojo.indexOf(self.currentUserIds, nUserId) == -1) {
                    self.currentUserIds.push(nUserId);
                }
                self.userColor[userId] = data.usercolor.toString();
                self.userActivities = [];
                setTimeout(function () { self.grid.refresh(); }, "1");
            });

            connect.subscribe("/sage/ui/calendarUser/selectionChanged/remove", function removeUser(data) {
                self.currentUserIds = dojo.filter(self.currentUserIds, function (item) {
                    return item != "'" + data.userId.toString() + "'";
                });
                self.userActivities = [];
                setTimeout(function () { self.grid.refresh(); }, "1");
            });


            connect.subscribe("/entity/activity/calendar/schedulerDateChanged", function refreshList(data) {
                setQueryDates(data);
                self.userActivities = [];
                self.grid.refresh();
            });

            connect.subscribe("/entity/activity/create", function (data) {
                self.refreshGrid(data);
            });

            connect.subscribe("/entity/userActivities/timeless/saved", function (data) {
                //Summary : As we are refreshing the whole grid, wait until all the userActivities saved
                self.grid.refresh();
            });

            connect.subscribe("/entity/activity/change", function (data) {
                self.refreshGrid(data);
            });

            connect.subscribe("/entity/activity/timeless/delete", function (data) {
                self.userActivities = [];
                self.grid.refresh();
            });

        },
        refreshGrid: function (data) {
            if (data !== null) {
                if (data.Timeless || data.TimelessChanged) {
                    this.userActivities = [];
                    this.grid.refresh();
                }
            }
        },
        startup: function () {
            var self = this;
            var options;

            //Completed Timeless Activities Grid
            if (this.gridMode === 'completed') {
                options = {
                    context: null,
                    readOnly: true,
                    columns: [
                        {
                            field: '$key',
                            editable: false,
                            hidden: true,
                            id: 'id',
                            formatter: function (value, rowIdx) {
                                return ['<div id=', value, ' >', value, '</ div>'].join('');
                            },
                            unhidable: true
                        }, {
                            label: " ",
                            sortable: false,
                            width: "20px",
                            field: "icon",
                            unhidable: true,
                            formatter: function (value, data) {
                                if (data) {
                                    value = data.UserId;
                                }
                                return "<div class='userStyles " + self.userColor[value] + "'></div>";
                            }
                        }, {
                            field: 'Type',
                            keyField: '$key',
                            label: this.header_type,
                            formatter: function (value, rowIdx) {
                                return (new historyType()).format(value, rowIdx);
                            },
                            width: '90px'
                        }, {
                            field: 'ContactName',
                            label: this.header_contact,
                            width: '100px'
                        }, {
                            field: 'Description',
                            label: this.header_regarding,
                            width: '100px'
                        }
                    ],
                    store: new SDataObjectStore({
                        service: sDataServiceRegistry.getSDataService('dynamic'),
                        resourceKind: 'history',
                        include: ['$descriptors'],
                        select: ['$key', 'Regarding', 'Description', 'AccountId', 'AccountName', 'ActivityId', 'ContactName', 'Recurring', 'StartDate', 'Timeless', 'Type', 'Priority', 'PhoneNumber', 'LeadId', 'LeadName', 'LongNotes', 'Location', 'UserName'],
                        where: function () {
                            if (self.queryStartDate === null)
                                self.queryStartDate = Sage.Utility.Activity.formatTimelessStartDate(new Date());
                            if (self.queryEndDate === null)
                                self.queryEndDate = Sage.Utility.Activity.formatTimelessEndDate(new Date());

                            return dojo.string.substitute('UserId in (${0}) and Timeless and StartDate between @${1}@ and @${2}@ and Type in (\'atPhoneCall\',\'atToDo\',\'atAppointment\',\'atPersonal\')', [self.currentUserIds.toString(), self.queryStartDate, self.queryEndDate]);

                        }
                    }),
                    sort: [{ attribute: 'StartDate', descending: true }],
                    tools: [],
                    minRowsPerPage: 10,
                    id: this.Id,
                    tabId: 'ActivityCalendar',
                    placeHolder: this.gridNodeId,
                    columnHiding: true,
                    columnResizing: true,
                    columnReordering: true,
                    selectionMode: 'single',
                    rowSelection: true
                };
            } else {
                options = {
                    context: null,
                    readOnly: true,
                    columns: [
                        {
                            field: '$key',
                            editable: false,
                            hidden: true,
                            id: 'id',
                            formatter: function (value, rowIdx) {
                                return ['<div id=', value, ' >', value, '</ div>'].join('');
                            },
                            unhidable: true
                        }, {
                            label: " ",
                            sortable: false,
                            width: "20px",
                            field: "icon",
                            unhidable: true,
                            formatter: function (value, data) {
                                var uId;
                                if (data) {
                                    if (!data["remove"]) {
                                        uId = data.UserActivities.$resources[0].User.$key;
                                    }
                                }
                                return "<div class='userStyles " + self.userColor[uId] + "'></div>";
                            }
                        }, {
                            field: 'Type',
                            keyField: '$key',
                            label: this.header_type,
                            formatter: function (value, rowIdx) {
                                return (new activityType()).format(value, rowIdx);
                            },
                            width: '90px'
                        }, {
                            field: 'ContactName',
                            label: this.header_contact,
                            width: '100px'
                        }, {
                            field: 'Description',
                            label: this.header_regarding,
                            width: '100px'
                        }
                    ],
                    store: new SDataObjectStore({
                        service: sDataServiceRegistry.getSDataService('system'),
                        resourceKind: 'activities',
                        include: ['$descriptors,UserInfo'],
                        select: ['$key', 'Regarding', 'Description', 'AccountId', 'AccountName', 'ActivityId', 'ContactName', 'Recurring', 'StartDate', 'Timeless', 'Type', 'Priority', 'Leader/$key', 'PhoneNumber', 'LeadId', 'LeadName', 'LongNotes', 'Location', 'UserActivities/User/$key', 'UserActivities/$resources'],
                        onComplete: this._onComplete,
                        where: function () {
                            if (self.queryStartDate === null)
                                self.queryStartDate = Sage.Utility.Activity.formatTimelessStartDate(new Date());
                            if (self.queryEndDate === null)
                                self.queryEndDate = Sage.Utility.Activity.formatTimelessEndDate(new Date());

                            return dojo.string.substitute('UserActivities.UserId in (${0}) and Timeless and UserActivities.Status ne \'asDeclned\' and StartDate between @${1}@ and @${2}@ and Type in (\'atPhoneCall\',\'atToDo\',\'atAppointment\',\'atPersonal\')', [self.currentUserIds.toString(), self.queryStartDate, self.queryEndDate]);
                        }
                    }),
                    sort: [{ attribute: 'StartDate', descending: true }],
                    tools: [],
                    id: this.Id,
                    minRowsPerPage: 10,
                    placeHolder: this.gridNodeId,
                    columnHiding: true,
                    columnResizing: true,
                    columnReordering: true,
                    selectionMode: 'single',
                    rowSelection: true
                };
            }

            var grid = new Grid(options);
            this.grid = grid;
            grid.resize();
            //Bind RMB context menu from "ContextCalendar.mnuCalendarActivity"
            grid.onContextActivate = lang.hitch(this, function (evt) {
                evt.preventDefault();
                var item = grid._grid.row(evt).data;
                this._bindContextMenu(item.$key, new Date(), grid._grid.row(evt).element);
            });

            grid.onRowDblClick = function (row) {
                Sage.Link.editActivity(row.id);
            };

            grid.onCellMouseOver = this._onCellMouseOver();
            grid.onCellMouseLeave = this._onCellMouseLeave();
            grid.onHeaderClick = lang.hitch(this, function (event) {
                this.userActivities = [];
            });

            (dijit.byId("TaskPane_splitter")).on('.dgrid-header:click', lang.hitch(this, function (event) {
                this.userActivities = [];
            }));
        },
        isValidId: function (id) {
            var valid = false;
            if (id) {
                if (id.trim() !== '') {
                    valid = true;
                }
            }
            return valid;
        },
        _onComplete: function (data) {
            //summary:
            //      Identify duplicates and set "remove" flag
            //      Example: If an activity has 3 members, the feed will have 3 activity records and each activity record
            //      contains 3 userActivity records
            var self = this;
            if (data) {
                self.userActivities = [];
                var cnt = data.length;
                for (var i = 0; i < cnt; i++) {
                    var userAssigned = false;
                    var activityId = data[i]["$key"];
                    if (data[i].UserActivities) {
                        var userActivities = data[i].UserActivities.$resources;
                        var ln = userActivities.length;

                        for (var j = 0; j < ln; j++) {

                            if (userAssigned) {
                                //data[i].UserActivities.$resources.splice(j);
                                data[i].UserActivities.$resources[j]["remove"] = true;
                                continue;
                            }
                            var resource = userActivities[j];
                            var userId = resource.User.$key;

                            var userIds = self.userActivities[activityId];
                            if (userIds) {
                                if (dojo.indexOf(userIds, userId) < 0) {
                                    self.userActivities[activityId].push(userId);
                                    userAssigned = true;
                                } else {
                                    //data[i].UserActivities.$resources.splice(j);
                                    data[i].UserActivities.$resources[j]["remove"] = true;
                                }
                            } else {
                                self.userActivities[activityId] = [];
                                self.userActivities[activityId].push(userId);
                                userAssigned = true;
                            }
                        }
                    } else {
                        //Personal Activities will not have User Activities
                        //Attach 'UserActvities.$resources' as this is the key on grid binding for userColor column
                        var uId = data[i].Leader.$key;
                        var uIds = self.userActivities[activityId];
                        if (uIds) {
                            if (dojo.indexOf(uIds, uId) < 0) {
                                self.userActivities[activityId].push(uId);
                            }
                        } else {
                            self.userActivities[activityId] = [];
                            self.userActivities[activityId].push(uId);
                        }
                        data[i].UserActivities = [];
                        data[i].UserActivities.$resources = [];
                        var userObj = {};
                        userObj.$key = uId;
                        userObj.User = { $key: uId };
                        data[i].UserActivities.$resources.push(userObj);
                    }
                }
            }
            return data;
        },
        _onCellMouseLeave: function () {
            var grid = this.grid._grid;
            return lang.hitch(this, function (evt) {
                dijit.hideTooltip(grid.cell(evt).element);
            });
        },
        _onCellMouseOver: function () {
            var grid = this.grid._grid;
            return lang.hitch(this, function (evt) {
                var obj = grid.cell(evt).row;
                var item = obj.data;
                var html = "";
                var userId, userName = "";

                if (item.cell) html += this.tooltip_type + " : " + Sage.Utility.Activity.getActivityTypeName(item.cell) + "<br>";

                if (this.isValidId(item.LeadId)) {
                    html += this.tooltip_lead + " : " + item.LeadName + "<br>";
                    if (item.AccountName)
                        html += this.tooltip_company + " : " + item.AccountName + "<br>";
                } else {
                    if (item.ContactName)
                        html += this.tooltip_contact + " : " + item.ContactName + "<br>";

                    if (item.AccountName)
                        html += this.tooltip_account + " : " + item.AccountName + "<br>";
                }

                if (item.PhoneNumber) html += this.tooltip_phone + " : " + item.PhoneNumber + "<br>";

                if (item.UserId) {
                    userId = item.UserId;
                    userName = item.UserName;
                } else if (item.Leader) {
                    userId = item.Leader.$key;
                    userName = item.Leader.$descriptor;
                }

                if (lang.trim(sUtility.getClientContextByKey('userID')).toUpperCase() !== userId) {
                    if (userName)
                        html += this.tooltip_leader + " : " + userName + "<br>";
                }

                if (item.Description) html += this.tooltip_regarding + " : " + item.Description + "<br>";
                if (item.Location) html += this.tooltip_location + " : " + item.Location + "<br>";
                if (item.LongNotes) html += this.tooltip_notes + " : " + item.LongNotes + "<br>";
                dijit.showTooltip(html, grid.cell(evt).element);
            });
        },
        _bindContextMenu: function (eventId, startDate, gridDomNode) {
            if (this.pMenu1) {
                this.pMenu1.unBindDomNode(gridDomNode);
            }
            this.pMenu1 = null;
            this.pMenu1 = new dijit.Menu();
            var menuType = "mnuCalendarActivity";
            if (this.gridMode === 'completed') {
                menuType = "mnuCalendarHistory";
            }

            var menuConfig = Sage.UI.DataStore.ContextMenus.calendar_activityContextMenu.items;

            var len = menuConfig.length;
            for (var i = 0; i < len; i++) {
                var mDef = menuConfig[i];
                if (mDef.id === menuType) {
                    this._buildChildMenu(mDef.submenu, null, eventId, startDate);
                    break;
                }
            }
            //Binding context menu to iFrame
            this.pMenu1.bindDomNode(gridDomNode);
        },
        _buildChildMenu: function (parentMenuDef, parentMenu, eventId, startDate) {
            var len = parentMenuDef.length;
            for (var i = 0; i < len; i++) {
                var mDef = parentMenuDef[i];
                if (mDef.submenu.length > 0) {
                    var subMenu = new dijit.Menu();
                    this._buildChildMenu(mDef.submenu, subMenu, eventId, startDate);
                    var popsubMenu = new dijit.PopupMenuItem({
                        label: mDef.text,
                        popup: subMenu
                    });

                    if (parentMenu) {
                        parentMenu.addChild(popsubMenu);
                    }
                    else {
                        this.pMenu1.addChild(popsubMenu);
                    }
                }
                else {
                    var menuItem = null;
                    if ((mDef.text === '-') || (mDef.text === ' ') || (mDef.isspacer)) {
                        menuItem = new dijit.MenuSeparator();
                    } else {
                        var href = mDef.href;
                        var self = this;
                        menuItem = new MenuItem({
                            label: mDef.text || '...',
                            icon: 'Libraries/dojo/dojo/resources/blank.gif',
                            title: mDef.tooltip || '',
                            ref: href,
                            onClick: function () {
                                switch (this.ref.toUpperCase()) {
                                    case "OPENACTIVITY":
                                        Sage.Link.editActivity(eventId);
                                        break;
                                    case "OPENHISTORY":
                                        Sage.Link.editHistory(eventId);
                                        break;
                                    case "COMPLETEACTIVITY":
                                        Sage.Link.completeActivity(eventId);
                                        break;
                                    case "DELETEACTIVITY":
                                        Sage.Link.deleteActivity(eventId, function (data) {
                                            self.grid.refresh();
                                        });
                                        break;
                                    case "GOTOACCOUNT":
                                        Sage.Link.goToActivityAssociation('Account', eventId);
                                        break;
                                    case "GOTOCONTACT":
                                        Sage.Link.goToActivityAssociation('Contact', eventId);
                                        break;
                                    case "GOTOOPPORTUNITY":
                                        Sage.Link.goToActivityAssociation('Opportunity', eventId);
                                        break;
                                    case "GOTOTICKET":
                                        Sage.Link.goToActivityAssociation('Ticket', eventId);
                                        break;
                                    case "GOTOLEAD":
                                        Sage.Link.goToActivityAssociation('Lead', eventId);
                                        break;
                                }
                            }
                        });
                    }
                    if (parentMenu) {
                        parentMenu.addChild(menuItem);
                    }
                    else {
                        this.pMenu1.addChild(menuItem);
                    }
                }
            }
        }
    });
    return timelessGrid;
});

