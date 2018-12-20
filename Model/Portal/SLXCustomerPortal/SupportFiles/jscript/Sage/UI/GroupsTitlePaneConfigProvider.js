/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/GroupsTitlePaneConfigProvider", [
        'Sage/UI/_TitlePaneConfigProvider',
        'Sage/Data/BaseSDataStore',
        'Sage/Store/SData',
        'Sage/UI/GroupMenuFmtScope',
        'Sage/UI/GridMenuItem',
        'Sage/Groups/GroupManager',
        'Sage/Utility',
        'dojo/_base/array',
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/string',
        'Sage/Groups/GroupLookup',
        'Sage/UI/SearchMenuItem',
        'Sage/UI/ImageButton',
        'dojo/i18n!./nls/GroupsTitlePaneConfigProvider',
        'dijit/popup',
        'dijit/form/CheckBox'
],
function (
        _TitlePaneConfigProvider,
        BaseSDataStore,
        SDataObjectStore,
        GroupMenuFmtScope,
        GridMenuItem,
        GroupManager,
        Utility,
        array,
        declare,
        lang,
        string,
        GroupLookup,
        SearchMenuItem,
        ImageButton,
        resource,
        pm,
        CheckBox) {
    var provider = declare('Sage.UI.GroupsTitlePaneConfigProvider', _TitlePaneConfigProvider, {
        // summary:
        //      Implementation of Sage.UI._TitlePaneConfigProvider for use on SLX group based main views.
        //strings...
        searchText: 'Lookup',
        lookupResultsText: resource.lookupResultsText,
        //end strings...
        store: false,
        _requestOptions: false,
        _grpContextHandle: false,
        config: false,
        gridMenuItem: null,
        requestTitlePaneConfiguration: function (options) {
            var service,
                gSvc,
                context,
                menuConfig,
                lookupButton,
                tabConfig;

            // summary:
            //      Builds the config object for the title pane including the group tabs and group menu.
            if (this._isInsertMode()) {
                if (options.success) {
                    this.config = {
                        menu: false,
                        tabs: false
                    };
                    options.success.call(options.scope || this, this.config, this);
                }
                return;
            }

            service = Sage.Data.SDataServiceRegistry.getSDataService('system');
            this.store = new BaseSDataStore({
                service: service,
                resourceKind: 'groups',
                include: [],
                sort: [{ attribute: 'displayName', descending: false }],
                select: ['$key', '$descriptor', 'name', 'isHidden', 'userId', 'family', 'displayName', 'ownerlf']
            });

            gSvc = Sage.Services.getService('ClientGroupContext');
            context = gSvc.getContext();
            if (context.notGroupBased) {
                return;
            }

            if (!context.CurrentFamily) {
                this._requestOptions = options;
                this._grpContextHandle = dojo.connect(gSvc, 'onContextSet', this, '_groupContextSetCallback');
                return;
            }

            menuConfig = this._getMenuConfig();
            lookupButton = dijit.byId('GroupLookupButton');
            if (lookupButton) {
                lookupButton.destroy(true);
            }

            tabConfig = this._getTabConfig();

            this.config = {
                menu: menuConfig,
                tabs: tabConfig
            };

            if (options.success) {
                options.success.call(options.scope || this, this.config, this);
            }
        },
        _isInsertMode: function () {
            var mode = Sage.Utility.getModeId();
            return (mode && (mode.toLowerCase() === 'insert'));
        },
        _groupContextSetCallback: function (context) {
            if (this._grpContextHandle) {
                dojo.disconnect(this._grpContextHandle);
                this._grpContextHandle = false;
            } else {
                return;
            }
            this.config = {
                menu: this._getMenuConfig(),
                tabs: this._getTabConfig()
            };
            if (this._requestOptions.success) {
                this._requestOptions.success.call(this._requestOptions.scope || this, this.config, this);
            }
        },
        _getTabConfig: function () {
            var gSvc = Sage.Services.getService('ClientGroupContext'),
                context = gSvc && gSvc.getContext();

            return {
                store: new BaseSDataStore({
                    service: Sage.Data.SDataServiceRegistry.getSDataService('system'),
                    resourceKind: 'groups',
                    include: [],
                    sort: [{ attribute: 'displayName', descending: false }],
                    select: ['$key', '$descriptor', 'name', 'isHidden', 'userId', 'family', 'displayName']
                }),
                selectedTabId: context.CurrentGroupID,
                selectedTabName: context.CurrentName,
                tabKeyProperty: '$key',
                tabNameProperty: '$descriptor', // group display name
                tabGroupNameProperty: 'name', // group name
                tabHiddenProperty: 'isHidden',
                showTabContextMenus: true,
                fetchParams: {
                    query: string.substitute("upper(family) eq '${0}' and isHidden eq false", [context.CurrentFamily.toUpperCase()]),
                    count: this.getMaxNumOfFavoriteGroups(),
                    start: 0,
                    sort: [{ attribute: 'isHidden', descending: false }, { attribute: 'displayName' }]
                },
                lookupButton: new ImageButton({
                    id: 'GroupLookupButton',
                    label: '',
                    imageClass: 'fa fa-search',
                    title: resource.lookupText,
                    onClick: function () {
                        var ctxService = Sage.Services.getService('ClientGroupContext'),
                            lupSvc;
                        if (ctxService) {
                            //show the lookup window...
                            lupSvc = Sage.Services.getService('GroupLookupManager');
                            if (lupSvc) {
                                lupSvc.showLookup();
                            }
                        }
                    }
                }),
                staticTabs: [
                    { '$key': 'LOOKUPRESULTS', '$descriptor': this.lookupResultsText, closable: false, contextMenuItems: this._getTabContextMenuItems() }
                ],
                onTabSelect: function (child, suppressReload) {
                    var id,
                        ctxService;

                    if (suppressReload) {
                        return;
                    }

                    id = (typeof child === 'string') ? child : child.id;
                    ctxService = Sage.Services.getService('ClientGroupContext');

                    if (ctxService) {
                        if (id !== 'DOLOOKUP') {
                            ctxService.setCurrentGroup(id);
                        }
                    }
                },
                onTabClose: function (tab) {
                    Sage.Groups.GroupManager.HideGroup(tab.id);
                },
                onTabClick: function (e) {
                    // If the user is in detail mode and clicks the current group tab,
                    // send them back to the list mode. If they click a different group tab,
                    // they stay in detail mode. If they are in list mode already, do nothing.
                    var mode = Utility.getModeId(),
                        ctxService = Sage.Services.getService('ClientGroupContext'),
                        tabs = dijit.byId('GroupTabs'),
                        selectedId = '',
                        currentGroupId = '',
                        context = null,
                        target = e.target,
                        title = '';

                    if (mode !== 'detail') {
                        return;
                    }

                    array.forEach(tabs.getChildren(), function (item) {
                        if (item.selected) {
                            selectedId = item.id;
                            title = item.title;
                        }
                    });

                    if (ctxService) {
                        context = ctxService.getContext();
                        if (selectedId !== 'DOLOOKUP' && context) {
                            currentGroupId = context.CurrentGroupID;
                        }
                    }

                    if (selectedId === currentGroupId && target && target.innerHTML === title) {
                        Sage.Link.toListView();
                    }
                }
            };
        },
        _getTabContextMenuItems: function () {
            var items;
            if (Sage.UI.DataStore.ContextMenus && Sage.UI.DataStore.ContextMenus.GroupLookupTabContextMenu) {
                items = Sage.UI.DataStore.ContextMenus.GroupLookupTabContextMenu.items;
            }
            return items;
        },
        _getMenuConfig: function () {
            var groupContextSvc = Sage.Services.getService('ClientGroupContext'),
                context = groupContextSvc.getContext(),
                groupName = context.CurrentName || '';
            return {
                id: 'mnuGroupMenu',
                cls: '',
                img: 'images/icons/Groups_16x16.gif',
                imageClass: 'icon_Groups_16x16',
                text: resource.groupText,
                tooltip: resource.groupButtonTooltip,
                addGroupTooltip: resource.addGroupButtonTooltip,
                width: '410px',
                items: [
                    {
                        cls: '',
                        id: 'sep2',
                        text: '-',
                        img: '',
                        tooltip: '',
                        href: '',
                        isSeparator: true
                    }, {
                        fn: this._getGroupMenuSearch,
                        scope: this
                    }, {
                        //pass as a function so it gets called when it is time to create it...
                        fn: this._getGroupMenuGrid,
                        scope: this
                    }]
            };
        },
        _getGroupMenuGrid: function () {
            var that = this,
                fmtScope = new GroupMenuFmtScope({ store: this.store }),
                query = {},
                context = false,
                svc = Sage.Services.getService('ClientGroupContext');
            if (svc) {
                context = svc.getContext();
                if (context.CurrentEntity) {
                    query = string.substitute('upper(family) eq \'${0}\'', [context.CurrentFamily.toUpperCase()]);
                }
            }

            var dGridStore = new SDataObjectStore({
                service: that.store.service,
                resourceKind: that.store.resourceKind,
                include: that.store.include,
                orderBy: 'isHidden,displayName',              
                select: that.store.select,
                where: query
            });

            this.gridMenuItem = new GridMenuItem({
                gridOptions: {
                    id: 'groupsGridInMenu',
                    cssClass: 'groupsPopMenu',
                    store: dGridStore,
                    minRowsPerPage: 40,
                    columns: [
                        {
                            label: '',
                            field: '$key',
                            formatter: 'fmtSelectedCol',
                            width: '40px',
                            sortable: false
                        },
                        {
                            label: resource.groupColumnText,
                            field: 'displayName',
                            sortable: false
                        },
                        {
                            label: resource.visibleColumnText,
                            field: 'isHidden',
                            formatter: 'fmtHideCol',
                            editor: CheckBox,
                            get: function (item) {
                                return !item[this.field];
                            },
                            editorArgs: {
                                onClick: function (evt) {
                                    var checked = this.get('checked'),
                                        svc = Sage.Services.getService('RoleSecurityService');
                                    var item = that.gridMenuItem.grid._grid.row(this.domNode).data;
                                    if (svc.hasAccess('Entities/Group/Edit')) {
                                        if (checked) {
                                            var maxNumOfFavoriteGroups = that.getMaxNumOfFavoriteGroups();
                                            var numOfFavoriteGroups = that.getNumOfFavoriteGroups(that.gridMenuItem.grid.store.dataCache);
                                            if (numOfFavoriteGroups + 1 > maxNumOfFavoriteGroups) {
                                                dojo.byId('exceedMaxGroupMsg').innerHTML = dojo.string.substitute(resource.exceedMaxGroupMsg, [maxNumOfFavoriteGroups]);
                                                this.checked = false;
                                            }
                                            else {
                                                Sage.Groups.GroupManager.UnHideGroup(item['$key'], true);
                                            }
                                        } else {
                                            dojo.byId('exceedMaxGroupMsg').innerHTML = '';
                                            Sage.Groups.GroupManager.HideGroup(item['$key'], true);
                                        }
                                    }
                                    evt.stopPropagation();
                                }
                            },
                            sortable: false
                        },
                        {
                            label: resource.groupOwner,
                            field: 'ownerlf',
                            sortable: false
                        }
                    ],
                    noDataMessage: 'No records returned',
                    selectionMode: 'single',
                    formatterScope: fmtScope,
                    columnResizing: true,
                    setQueryOnStore: true,
                    onDataChange: function (evt) {
                        var gridParent = dijit.getEnclosingWidget(evt.target).getParent(),
                                menu = gridParent && gridParent.getParent();

                        if (!this.menuClosedHandle) {
                            this.menuClosedHandle = menu.on('close', lang.hitch(this, function () {
                                var titlePane = dijit.byId('titlePane');
                                if (titlePane) {
                                    titlePane.resetConfiguration();
                                }
                                this.menuClosedHandle.remove();
                                this.menuClosedHandle = null;
                            }));
                        }
                    },
                    onHeaderClick: function (evt) {
                        evt.stopPropagation();
                    },
                    onRowClick: function (evt, row, grid) {
                        if (!this.processingRequest) {
                            this.processingRequest = true;
                            // Change groups when the group name cell is clicked.
                            // Refresh the grid and cancel the bubble (so the menu does not close).
                            var record,
                                ctxService,
                                gridParent = dijit.getEnclosingWidget(evt.target).getParent(),
                                menu = gridParent && gridParent.getParent(),
                                fetchHandle,
                                groupChangeHandle,
                                isGroupChanging = false,
                                context;

                            if (!this.menuClosedHandle) {
                                this.menuClosedHandle = menu.on('close', lang.hitch(this, function () {
                                    this.processingRequest = false;
                                    this.menuClosedHandle.remove();
                                    this.menuClosedHandle = null;
                                }));
                            }

                            record = row.data;
                            ctxService = Sage.Services.getService('ClientGroupContext');
                            if (ctxService) {
                                context = ctxService.getContext();
                                var manageGroupsButton = dijit.byId('mnuGroupMenu');

                                if (context && context.CurrentGroupID === record.$key) {
                                    pm.close(menu);
                                } else {
                                    isGroupChanging = true;
                                    groupChangeHandle = dojo.connect(ctxService, 'onCurrentGroupChanged', evt.grid, function () {
                                        this.started = false; // Go ahead and refresh the grid when the popup is opened again
                                        dojo.disconnect(groupChangeHandle);
                                        manageGroupsButton._onClick(evt);
                                        pm.close(menu);
                                    });
                                    ctxService.setCurrentGroup(record.$key);
                                }
                            }
                        }
                    }
                },
                width: '300px',
                height: '400px'
            });
            return this.gridMenuItem;
        },
        _getGroupMenuSearch: function () {
            return new SearchMenuItem({});
        },
        getMaxNumOfFavoriteGroups: function () {
            var maxNumofFavoriteGroups = 0;
            var service = Sage.Utility.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataSingleResourceRequest(service);
            request.setResourceKind('officeProfiles');
            request.setQueryArg('select', 'MaximumFavoriteGroups');
            request.read({
                async: false,
                success: function (result) {
                    maxNumofFavoriteGroups = result.MaximumFavoriteGroups;
                },
                failure: function (err) {
                    Sage.UI.Dialogs.showError(err);
                }
            });
            return maxNumofFavoriteGroups;
        },
        getNumOfFavoriteGroups: function () {
            var numOfFavoriteGroups = 0;
            var service = Sage.Data.SDataServiceRegistry.getSDataService('system');
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(service);
            var groupContext = Sage.Services.getService('ClientGroupContext').getContext();
            var currentFamily = groupContext.CurrentFamily.toUpperCase();
            request.setResourceKind('groups');
            request.setQueryArg('select', '$key');
            request.setQueryArg('where', 'upper(family) eq \'' + currentFamily + '\' and isHidden eq false');
            request.setQueryArg('upper(family)', currentFamily);
            request.read({
                async: false,
                success: function (data) {
                    numOfFavoriteGroups = data.$totalResults;
                },
                failure: function (err) {
                    Sage.UI.Dialogs.showError(err);
                }
            });
            return numOfFavoriteGroups;
        }
    });

    return provider;
});