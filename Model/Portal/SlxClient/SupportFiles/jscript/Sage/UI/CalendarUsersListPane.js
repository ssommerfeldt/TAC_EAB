/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/CalendarUsersListPane", [
    'Sage/Data/SDataServiceRegistry',
    'Sage/Data/WritableSDataStore',
    'Sage/UI/EditCalendarUsers',
    'Sage/Utility',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/i18n',
    'dojo/on',
    'dojo/parser',
    'dojo/dom',
    'dojo/query',
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/i18n!./nls/CalendarUsersListPane',
    'Sage/UI/GridView',
    'dojo/_base/connect',
    'dojo/query',
    'dijit/registry'
], function (sDataServiceRegistry, writableSDataStore, EditCalendarUsers, sUtility, lang, array, i18n, on, parser, dom, dojoQuery, declare, domConstruct, resource, GridView, connect, query, registry) {
    var calendarUsersListPane = declare('Sage.UI.CalendarUsersListPane', null, {
        Id: null,
        _grid: null,
        _colors: {},
        _selectedUsers: {},
        _maxUserCount: 4,
        _checkedUsersCount: 0,
        _initialLoad: false,
        _storeItems: [],
        _maxUserCountReached: false,
        _userOptions: {},
        editCalendarUsers: null,
        _favoriteUsersList: [],
        editCalendarUsersHandle: null,
        _userCalendarFavoriteId: null,
        _usersListUpdatedFromDialog: false,
        _selectedUsersListUpdatedFromDialog: false,
        _LOCALSTORE_NAMESPACE: "SalesLogix-Calendar",
        _currentUserId: null,

        constructor: function (options) {
            this.Id = options.Id;
            this.EditCalUsersNodeId = options.EditUsersNode;
            this._userOptions = options.options;
            this._usersListUpdatedFromDialog = false;
            this._selectedUsersListUpdatedFromDialog = false;
            this._currentUserId = Sage.Utility.getClientContextByKey('userID');
            // Predefine these colors and assign to users, when selecting
            this._colors = [{
                "usercolor": "user2",
                "set": false
            }, {
                "usercolor": "user3",
                "set": false
            },
            {
                "usercolor": "user4",
                "set": false
            },
            {
                "usercolor": "user5",
                "set": false
            }];
            lang.mixin(this, resource);
            this._initializeList();

            var self = this;

            var linkNode = domConstruct.toDom('<div align="right"><a id="editUserLink" href="#" class="filter-edit-items">' + this.editUsersLinkText + '</a></div>');
            domConstruct.place(linkNode, dojo.byId("calUserTasklet"), 'before');

            //var editLink = '<div align="right"><a id="editUserLink" href="#" class="filter-edit-items">' + this.editUsersLinkText + '</a></div>';

            //domConstruct.place(editLink, this.EditCalUsersNodeId, 'last');
            //parser.parse(this.EditCalUsersNodeId);

            this.editCalendarUsers = new EditCalendarUsers({
                id: "EditCalendarUsers1",
                parent: this
            });

            on(dom.byId("editUserLink"), "click", function (e) {
                self.editCalendarUsers.showDialog(self._favoriteUsersList, self._userCalendarFavoriteId);
                e.cancelBubble = true;
            });

        },
        refresh: function () {
            this._grid.grid.setFilter(this._where());
        },
        _where: function () {
            var currentUserId = Sage.Utility.getClientContextByKey('userID');
            return dojo.string.substitute('AccessId eq \'${0}\'', [lang.trim(currentUserId)]);
        },
        _getUserColor: function (userId) {
            var color = "";
            if (this._selectedUsers[userId]) {
                color = this._selectedUsers[userId].usercolor;
            }
            return color;
        },
        _initializeList: function () {
            var headerUserName = this.header_user || 'User';
            var headerIcon = this.header_icon || 'Icon';
            var self = this;

            var onComplete = function (data) {
                self._storeItems = [];
                self._favoriteUsersList = [];
                array.forEach(data, function (item, i) {
                    lang.mixin(item, { usercolor: "", username: item['Name'], userId: item['ResourceId'], ResourceId: lang.trim(item['ResourceId']) });
                    self._favoriteUsersList.push(item['ResourceId']);
                    self._storeItems.push(item);
                    if (!self._userCalendarFavoriteId)
                        self._userCalendarFavoriteId = item['$key'];
                });
                if (self._favoriteUsersList.length === 0) {
                    self._favoriteUsersList.push(Sage.Utility.getClientContextByKey('userID'));
                }
            };

            var storeOptions = {
                service: sDataServiceRegistry.getSDataService('dynamic'),
                resourceKind: 'calendarfavoriteusersviews',
                select: ['$key', 'Name', 'UserId', 'ResourceId', 'Selected'],
                include: [],
                where: this._where(),
                onComplete: onComplete
            };

            var columns = [
                {
                    field: 'icon',
                    width: '20px',
                    label: headerIcon,
                    formatter: function (value, data) {
                        if (data) {
                            value = data.ResourceId;
                        }
                        return "<div class='userStyles " + self._getUserColor(value) + "'></div>";
                    },
                    sortable: false
                },
                {
                    field: 'Name',
                    width: '100%',
                    label: headerUserName,
                    sortable: false
                }
            ];

            var grid = this._grid = new GridView({
                id: 'calUserTaskletGrid',
                storeOptions: storeOptions,
                columns: columns,
                indirectSelection: true,
                placeHolder: 'calUserTasklet',
                hideHeaderView: true,
                columnHiding: true,
                columnResizing: true,
                columnReordering: true,
                selectionMode: 'extended',
                rowSelection: true,
                classNames: 'dgrid-autoheight',
                sort: [{ attribute: 'Selected', descending: true }]
            });

            if (this._userOptions["rememberusers"]) {
                this._loadCalendarUserListOptions();
            } else {
                // If the user option "Remember Selected Users" is set to NO, get the selection from sessionStorage
                var data = {};
                var key = "calendarUsers-" + this._currentUserId;
                data["value"] = this._getFromSessionStorage(key, this._LOCALSTORE_NAMESPACE);

                this._receivedCalendarUserListOptions(data);
            }

            connect.connect(registry.byId('centerContent'), "resize", function () {
                grid.grid.resize();
            });
        },
        _isEmpty: function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        },
        _loadCalendarUserListOptions: function () {
            var optionsSvc = Sage.Services.getService('UserOptions');
            if (optionsSvc) {
                optionsSvc.get('CalendarUsers', 'Calendar', this._receivedCalendarUserListOptions, null, this);
            }
        },
        _receivedCalendarUserListOptions: function (data) {
            var maxUsersErrorMessage = this.maxUsersErrorMessage || 'Sorry, you cannot view more than ${0} calendars (including your own) at one time.  Clear one of the currently-selected calendars and try again.';

            maxUsersErrorMessage = dojo.string.substitute(maxUsersErrorMessage, [this._maxUserCount]);
            if (data !== null) {
                if (data) {
                    var userListOption = data['value'];
                    // By Default, the current user will be added to the list with default color set to "user1"
                    var currentUserId = sUtility.getClientContextByKey('userID');
                    currentUserId = lang.trim(currentUserId);
                    if (userListOption === null || userListOption === "") {
                        userListOption = currentUserId + "|" + "user1";
                    } else if (userListOption.indexOf(currentUserId) < 0) {
                        userListOption += "," + currentUserId + "|" + "user1";
                    }
                    dojo.cookie('selectedCalendarUsers', userListOption);
                    this._setSelectedUsers(userListOption);
                }
            }
            if (this._selectedUsers) {
                this._grid.createGridView();

                var grid = this._grid.grid;

                var self = this;
                grid.onSelection = function (evt) {
                    if (!self._initialLoad) {
                        var item = evt.rows[0].data;
                        if (self._checkedUsersCount < self._maxUserCount) {
                            self._checkedUsersCount++;
                            var selectedItemUserId = item['ResourceId'].substr(0, 12);
                            var selectedItemUserColor = "";

                            if (self._selectedUsers[selectedItemUserId]) {
                                //item['usercolor'] = self._selectedUsers[item["userId"]]["usercolor"];
                            } else {
                                if (selectedItemUserId === lang.trim(sUtility.getClientContextByKey('userID'))) {
                                    selectedItemUserColor = "user1";
                                } else {
                                    if (!selectedItemUserColor || selectedItemUserColor === "") {
                                        for (var j = 0; j < self._colors.length; j++) {
                                            if (!self._colors[j]['set']) {
                                                selectedItemUserColor = self._colors[j]['usercolor'];

                                                self._colors[j]['set'] = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                                var userObj = {};
                                userObj["userId"] = selectedItemUserId;
                                userObj["usercolor"] = selectedItemUserColor;
                                self._selectedUsers[selectedItemUserId] = userObj;
                                var newUserObj = lang.clone(userObj);

                                // Save the selected user to useroptions
                                self._saveUserOption();

                                var iconCell = query('.field-icon', evt.rows[0].element)[0];
                                var iconContent = "<div class='userStyles " + self._getUserColor(item.ResourceId) + "'></div>";
                                domConstruct.empty(iconCell);
                                domConstruct.place(iconContent, iconCell);

                                // Refresh scheduler and timeless activities list
                                connect.publish('/sage/ui/calendarUser/selectionChanged/add', [newUserObj, null]);
                            }
                        } else {
                            self._maxUserCountReached = true;
                            evt.grid.deselect(item);
                            Sage.UI.Dialogs.showError(maxUsersErrorMessage);
                        }
                    } else {
                        if (self._checkedUsersCount < self._maxUserCount) {
                            //self._checkedUsersCount++;
                        }
                    }
                };

                grid.onDeselection = function (evt) {
                    if (!self._initialLoad) {

                        if (self._maxUserCountReached) {
                            self._maxUserCountReached = false;
                            return;
                        }
                        var item = evt.rows[0].data;
                        var inSelected = false;
                        var selectedItemUserId = item['ResourceId'].substr(0, 12);
                        var selectedItemUserColor = self._selectedUsers[selectedItemUserId].usercolor;
                        if (self._selectedUsers[selectedItemUserId]) {
                            inSelected = true;
                        }
                        if (inSelected) {

                            for (var j = 0; j < self._colors.length; j++) {
                                if (self._colors[j]['usercolor'] === selectedItemUserColor) {
                                    self._colors[j]['set'] = false;
                                    break;
                                }
                            }
                            delete self._selectedUsers[selectedItemUserId];
                            self._checkedUsersCount--;
                            //Update the useroptions value
                            self._saveUserOption();
                            var iconCell = query('.field-icon', evt.rows[0].element)[0];
                            var iconContent = "<div class='userStyles " + self._getUserColor(item.ResourceId) + "'></div>";
                            domConstruct.empty(iconCell);
                            domConstruct.place(iconContent, iconCell);

                            var userObj = {};
                            userObj["userId"] = selectedItemUserId;
                            // Refresh scheduler and timeless activities list
                            connect.publish('/sage/ui/calendarUser/selectionChanged/remove', [userObj, this]);
                        }
                    }
                };

                grid.onLoadComplete = lang.hitch(this, function (evt) {
                    self._initialLoad = true;
                    var usersChanged = false;
                    this._checkedUsersCount = 0;
                    var calendarUsersToAccess = [];
                    var tempSelectedUsers = lang.clone(self._selectedUsers);
                    var rowCount = grid.totalRecords;
                    for (var i = 0; i < rowCount; i++) {
                        var item = self._storeItems[i];
                        var userId = item['ResourceId'].substr(0, 12);
                        //self._grid.rowSelectCell.toggleRow(i, false);
                        if (self._selectedUsers[userId]) {
                            //if (item['Selected']) {
                            calendarUsersToAccess.push(userId);
                            if (!evt.grid.isSelected(item)) {
                                evt.grid.select(item);
                                self._checkedUsersCount++;
                            }
                        }
                    }

                    // Validate the selected users list based on the calendar security
                    for (var j in tempSelectedUsers) {
                        var uId = lang.trim(tempSelectedUsers[j]["userId"].toString());
                        var userColor = lang.trim(tempSelectedUsers[j]["usercolor"].toString());
                        if (array.indexOf(calendarUsersToAccess, uId) < 0) {
                            delete self._selectedUsers[uId];
                            // Make the deleted user's color available for to assign
                            for (var k = 0; k < self._colors.length; k++) {
                                if (self._colors[k]['usercolor'] === userColor) {
                                    self._colors[k]['set'] = false;
                                    break;
                                }
                            }
                            usersChanged = true;
                        }
                    }

                    if (usersChanged) {
                        // Update the useroptions value
                        self._saveUserOption();
                    }

                    self._initialLoad = false;
                    if (self._selectedUsers && !self._isEmpty(self._selectedUsers)) {
                        var newObj = lang.clone(self._selectedUsers);
                        // Do not load calendar again when grid refreshes after the list edited from dialog
                        if (!self._usersListUpdatedFromDialog) {
                            dojo.publish('/sage/ui/calendarUserList/loaded', [newObj, null]);
                        } else if (self._usersListUpdatedFromDialog && self._selectedUsersListUpdatedFromDialog) {
                            // This will refresh both timeless and timeless history grids
                            dojo.publish('/sage/ui/calendarUserList/updated', [newObj, null]);
                        }

                    } else if (!self._usersListUpdatedFromDialog) {
                        dojo.publish('/sage/ui/calendarUserList/loadedNavigationCalendar', [self._userOptions['weekstart'], this]);
                    }
                });
            }
        },
        refreshCalendarUsers: function (updatedFavoriteList) {
            var tempUserid = "";
            var updated = false;
            var self = this;
            this._initialLoad = true;
            for (var i in this._selectedUsers) {
                tempUserid = this._selectedUsers[i]["userId"].toString();
                // if (array.indexOf(updatedFavoriteList, tempUserid) < 0) {
                if (!sUtility.isItemInArray(updatedFavoriteList, tempUserid)) {
                    var selectedItemUserColor = this._selectedUsers[tempUserid].usercolor;
                    for (var j = 0; j < this._colors.length; j++) {
                        if (this._colors[j]['usercolor'] === selectedItemUserColor) {
                            this._colors[j]['set'] = false;
                            break;
                        }
                    }
                    this._checkedUsersCount--;

                    var userObj = {};
                    userObj["userId"] = tempUserid;

                    // Update the scheduler 
                    dojo.publish('/sage/ui/calendarUser/selectionChanged/remove', [userObj, this]);

                    delete this._selectedUsers[i];
                    updated = true;
                }
            }
            this._usersListUpdatedFromDialog = true;
            if (updated) {
                // If there is a change in selected users list, save the selected users first and refresh the grid
                this._selectedUsersListUpdatedFromDialog = true;
                this._saveUserOption(this.refresh);
            } else {
                this._selectedUsersListUpdatedFromDialog = false;
                setTimeout(function () {
                    self.refresh();
                }, "10");

            }
        },
        _saveUserOption: function (callback) {
            var userIds = "";
            if (this._selectedUsers) {
                for (var i in this._selectedUsers) {
                    if (userIds !== "") userIds += ",";
                    userIds += lang.trim(this._selectedUsers[i]["userId"].toString());
                    userIds += "|";
                    if (this._selectedUsers[i]["usercolor"])
                        userIds += this._selectedUsers[i]["usercolor"].toString();
                }

                if (this._userOptions["rememberusers"]) {
                    var optionsSvc = Sage.Services.getService('UserOptions');
                    if (optionsSvc) {
                        optionsSvc.set('CalendarUsers', 'Calendar', userIds, callback, null, this);
                    }
                } else {
                    // If the user option "Remember Selected Users" is set to NO, save the selection to sessionStorage
                    var key = "calendarUsers-" + this._currentUserId;
                    this._saveToSessionStorage(key, userIds, this._LOCALSTORE_NAMESPACE);
                }
            }
        },
        _setSelectedUsers: function (userListOption) {
            if (userListOption !== null) {
                var userOptions = userListOption.split(",");
                var userItem;
                var userId, userColor;
                for (var i = 0; i < userOptions.length; i++) {
                    userItem = userOptions[i];
                    if (userItem) {
                        userId = userItem.split("|")[0];
                        userColor = userItem.split("|")[1];

                        if (!userColor) {
                            for (var j = 0; j < this._colors.length; j++) {
                                if (!this._colors[j]['set']) {
                                    userColor = this._colors[j]['usercolor'];
                                    this._colors[j]['set'] = true;
                                    break;
                                }
                            }
                        } else {
                            for (var k = 0; k < this._colors.length; k++) {
                                if (this._colors[k]['usercolor'] === userColor) {
                                    this._colors[k]['set'] = true;
                                    break;
                                }
                            }
                        }
                        var userObj = {};
                        userObj["userId"] = userId;
                        userObj["usercolor"] = userColor;
                        this._selectedUsers[userId] = userObj;
                    }
                }
            }
        },
        _getFromSessionStorage: function (key, namespace) {
            if (!namespace) {
                namespace = this._LOCALSTORE_NAMESPACE;
            }
            var storeKey = namespace + "_" + key;
            return sessionStorage.getItem(storeKey);
        },
        _saveToSessionStorage: function (key, value, namespace) {
            if (!namespace) {
                namespace = this._LOCALSTORE_NAMESPACE;
            }
            var storeKey = namespace + "_" + key;
            sessionStorage.setItem(storeKey, value);
        }
    });
    return calendarUsersListPane;
});

