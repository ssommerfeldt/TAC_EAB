/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/SecurityManager", [
    'dijit/registry',
    'dijit/form/RadioButton',
    'dojo/_base/connect',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-style',
    'dojo/i18n!./nls/SecurityManager',
    'dojo/query',
    'dojo/string',
    'Sage/Data/WritableSDataStore',
    'Sage/MainView/SecurityMgr/SecurityManagerGroupContext',
    'Sage/Store/SData',
    'Sage/UI/SDataMainViewConfigurationProvider',
    'Sage/UI/Columns/RadioGroup'
],
function (registry, RadioButton, connect, declare, lang, dojoStyle, nlsStrings, query, dojoString, WritableSDataStore, SecurityManagerGroupContext, SDataObjectStore, SDataMainViewConfigurationProvider, RadioGroup) {
    var securityManager = declare('Sage.MainView.SecurityManager', SDataMainViewConfigurationProvider, {
        _profilesStore: false,
        _currentProfileId: false,
        _currentProfileDescription: false,
        _profileNameCache: {},
        store: false,
        entityType: 'securityProfileColumns',
        mainGridCache: [],
        constructor: function (options) {
            lang.mixin(this, nlsStrings);
            var grpContextSvc = Sage.Services.getService('ClientGroupContext');
            if (!grpContextSvc || grpContextSvc.declaredClass != 'Sage.MainView.SecurityMgr.SecurityManagerGroupContext') {
                Sage.Services.removeService('ClientGroupContext');
                grpContextSvc = new SecurityManagerGroupContext();
                Sage.Services.addService('ClientGroupContext', grpContextSvc);
            }

            if (grpContextSvc) {
                var ctx = grpContextSvc.getContext();
                this._currentProfileId = ctx.CurrentGroupID;
                this._currentProfileDescription = ctx.CurrentName;
            }
            this.service = Sage.Data.SDataServiceRegistry.getSDataService('system');
            this.titlePaneConfiguration = {
                tabs: this._getTabsConfig(),
                menu: this._getMenuConfig(),
                titleFmtString: this.securityManagerText + ': ${0}'
            };
            
            connect.subscribe('/group/context/changed', this, 'onConfigurationChange');
        },
        _getListPanelConfig: function () {
            var selfAware = this;

            /*
            example urls for this list...
            http://localhost/SlxClient/slxdata.ashx/slx/system/-/securityProfiles
            http://localhost/SlxClient/slxdata.ashx/slx/system/-/securityProfiles("PROF00000001")?format=json

            http://localhost/SlxClient/slxdata.ashx/slx/system/-/securityProfileColumns("PROF00000001;ACCOUNT;ACCOUNT")?format=html
            http://localhost/SlxClient/slxdata.ashx/slx/system/-/securityProfileColumns?format=json
            http://localhost/SlxClient/slxdata.ashx/slx/system/-/securityProfileColumns?where=table eq "ACCOUNT" and profile.id eq "PROF00000001"
            */

            var refreshBtn = registry.byId('refreshBtn');
            if (!this.refreshEvent) {
                this.refreshEvent = connect.connect(refreshBtn, 'onClick', this, function () {
                    var listPanel = registry.byId('list');
                    listPanel._markClean();
                });
            }

            var renderRadio = function (type, object, value, node, options) {
                var defaultChecked = object.access === type;
                var button = new RadioButton({
                    checked: defaultChecked,
                    shouldPublishMarkDirty: false,
                    name: object.$key + '_access',
                    value: type,
                    onChange: function (v) {
                        object = lang.mixin(object, { type: type });
                        var newItem = lang.mixin(lang.clone(object), { access: type }),
                         existId = -1;

                        if (v) {
                            for (var i = 0; i < selfAware.mainGridCache.length && existId === -1; i++) {
                                var item = selfAware.mainGridCache[i];
                                if (object.$key === item.old.$key) {
                                    existId = i;
                                }
                            }
                            if (existId === -1) {
                                selfAware.mainGridCache.push({ node: node, old: object, "new": newItem });
                            } else {
                                var existingItem = selfAware.mainGridCache[existId];
                                if (existingItem.old.access === newItem.access) {
                                    selfAware.mainGridCache.splice(existId, 1);
                                }
                                else {
                                    existingItem["new"] = newItem;
                                }
                            }
                        }
                    }
                });
                button.placeAt(node);
            };

            var structure = [
                {
                    field: 'table',
                    label: this.tableText,
                    width: '155px'
                },
                {
                    field: 'entity',
                    label: this.entityText,
                    width: '130px'
                },
                {
                    field: 'column',
                    label: this.columnText,
                    width: '140px'
                },
                {
                    field: 'property',
                    label: this.propertyText,
                    width: '100px'
                },
                {
                    field: 'access',
                    label: this.readWriteText,
                    renderCell: lang.hitch(this, renderRadio, "ReadWrite"),
                    width: '70px',
                    sortable: false
                },
                {
                    field: 'access',
                    label: this.readOnlyText,
                    renderCell: lang.hitch(this, renderRadio, "ReadOnly"),
                    width: '70px',
                    sortable: false
                },
                {
                    field: 'access',
                    label: this.noAccessText,
                    renderCell: lang.hitch(this, renderRadio, "NoAccess"),
                    width: '70px',
                    sortable: false
                }
            ];

            var where = (this._currentProfileId) ? dojoString.substitute('profile.id eq "${0}"', [this._currentProfileId]) : '';

            if (!this.store) {
                this.store = new SDataObjectStore({
                    id: 'securityProfileColumns',
                    service: this.service,
                    isSecurityManager: true,
                    resourceKind: 'securityProfileColumns',
                    include: [],
                    select: ['table', 'entity', 'column', 'property', 'access'],
                    sort: [{ attribute: 'table', descending: true }],
                    where: where
                });
            } else {
                this.store.where = where;
            }
            this.listPanelConfiguration = {
                list: {
                    structure: structure,
                    store: this.store,
                    selectionMode: 'none',
                    id: 'securityManagerListConfig',
                    queryOptions: { sort: 'table' } // takes care of first queries sort.
                },
                _sort: [{ attribute: 'table' }],
                detail: false,
                summary: false,
                toolBar: {
                    items: [
                        {
                            icon: '~/ImageResource.axd?scope=global&type=Global_Images&key=Save_16x16',
                            title: this.saveText,
                            onClick: lang.hitch(this, function () {
                                for (var i = 0; i < this.mainGridCache.length; i++) {
                                    var item = this.mainGridCache[i]["new"];
                                    this.store.put(item, { create: false });
                                }
                                this.mainGridCache = [];
                            })
                        },
                        {
                            icon: '~/ImageResource.axd?scope=global&type=Global_Images&key=Reset_16x16',
                            title: this.resetText,
                            onClick: lang.hitch(this, function () {
                                for (var i = 0; i < this.mainGridCache.length; i++) {
                                    var rowObj = this.mainGridCache[i].old;
                                    query('[name="' + rowObj.$key + '_access"]').forEach(function (node) {
                                        node = registry.getEnclosingWidget(node).set("value", node.value === rowObj.access, false);
                                    });
                                }
                                this.mainGridCache = [];
                            })
                        }
                    ]
                }
            };

            dojoStyle.set(registry.byId('addGroupButton').domNode, 'display', 'none');
            return this.listPanelConfiguration;
        },
        requestConfiguration: function (options) {
            //returns the list panel configuration through the success callback method...
            if (options.success) {
                options.success.call(options.scope || this, this._getListPanelConfig(), this);
            }
        },
        requestTitlePaneConfiguration: function (options) {
            if (options.success) {
                options.success.call(options.scope || this, this.titlePaneConfiguration, this);
            }
        },
        onConfigurationChange: function (obj) {
            this._currentProfileId = obj.current.CurrentGroupID;
            this._currentProfileDescription = obj.current.CurrentName;
            if (this._currentProfileId && this._currentProfileId.length === 12) {
                if (this._profileNameCache && this._profileNameCache.hasOwnProperty(this._currentProfileId)) {
                    this._setUIForNewGroup(false);
                } else {
                    this._profilesStore.fetch({
                        onComplete: lang.hitch(this, '_setUIForNewGroup')
                    });
                }
            }
        },
        onTitlePaneConfigurationChange: function () {

        },
        _setUIForNewGroup: function (profileList) {
            var i;
            if (profileList) {
                this._profileNameCache = {};
                for (i = 0; i < profileList.length; i++) {
                    this._profileNameCache[profileList[i]['$key']] = profileList[i]['$descriptor'];
                }
            }

            //set title in title pane...
            var titlePane = dijit.byId('titlePane');
            if (titlePane) {
                titlePane.set('title', this._profileNameCache[this._currentProfileId]);
            }

            //select correct tab (without firing tab change event?...)
            var tabs = dijit.byId('GroupTabs');
            if (tabs) {
                var children = tabs.getChildren();
                for (i = 0; i < children.length; i++) {
                    if (children[i].id === this._currentProfileId) {
                        tabs.selectChild(children[i], false);
                        break;
                    }
                }
            }
        },
        _getTabsConfig: function () {
            this._setProfilesStore();
            this._profilesStore.fetch({
                onComplete: lang.hitch(this, '_setUIForNewGroup')
            });
            return {
                store: this._profilesStore,
                selectedTabId: this._currentProfileId,
                tabKeyProperty: '$key',
                tabNameProperty: 'profileDescription',
                fetchParams: {},
                staticTabs: [],
                onTabSelect: function (child) {
                    var grpContextSvc = Sage.Services.getService('ClientGroupContext');
                    if (grpContextSvc) {
                        var ctx = grpContextSvc.getContext();
                        var id = child.id || child;
                        if (ctx.CurrentGroupID === id) {
                            return;
                        }
                        var listPanel = registry.byId('list');
                        listPanel._markClean();
                        grpContextSvc.setCurrentGroup(id, child.title);
                    }
                },
                onTabClose: false
            };

        },
        _setProfilesStore: function () {
            this._profilesStore = this._profilesStore || new WritableSDataStore({
                id: 'securityProfilesstore',
                service: this.service,
                resourceKind: 'securityProfiles',
                include: [],
                select: ['profileDescription', 'defaultPermission', 'profileType'],
                orderby: 'profileDescription'
            });
        },
        _getMenuConfig: function () {
            this._setProfilesStore();
            return {
                id: 'profileMenu',
                img: 'images/icons/Groups_16x16.gif',
                text: this.profilesText,
                tooltip: this.profilesText,
                width: '300px',
                items: [
                    {
                        fn: this._getProfileMenuGrid,
                        scope: this
                    }
                ]
            };
        },
        _getProfileMenuGrid: function () {
            return new Sage.UI.GridMenuItem({
                gridOptions: {
                    id: 'profileGridInMenu',
                    cssClass: 'groupsPopMenu',
                    store: new SDataObjectStore({
                        service: this._profilesStore.service,
                        resourceKind: this._profilesStore.resourceKind,
                        include: this._profilesStore.include,
                        sort: this._profilesStore.orderby,
                        select: this._profilesStore.select
                    }),
                    minRowsPerPage: 40,
                    columns: [
                        { field: 'profileDescription', label: this.descriptionText, width: '290px' }//,
                    //{field: 'defaultPermission', name: 'Default Permission', width: '150px'},
                    //{field: 'profileType', name: 'Profile Type', width: '150px'}
                    ],
                    selectionMode: 'single',
                    query: { },
                    height: '400px',
                    width: '350px',
                    onRowClick: function (evt, row, grid) {
                        var profile = row.data;
                        var ctxService = Sage.Services.getService('ClientGroupContext');
                        if (ctxService) {
                            var ctx = ctxService.getContext();
                            if (ctx.CurrentGroupID === profile['$key']) {
                                return;
                            }
                            
                            var groupTabs = registry.byId('GroupTabs'),
                                groupTabChildren = groupTabs.getChildren();
                            for (var i = 0; i < groupTabChildren.length; i++) {
                                if (groupTabChildren[i].id == profile['$key']) {
                                    groupTabs.selectChild(groupTabChildren[i]);
                                    ctxService.setCurrentGroup(profile['$key'], profile.profileDescription);
                                    return;
                                }
                            }
                        }
                    }
                }
            });
        }

    });
    return securityManager;
});
