require({cache:{
'url:Sage/MainView/EntityMgr/templates/DetailTabContentGrid.html':"[\r\n'<div data-dojo-type=\"dijit.layout.ContentPane\" class=\"HundredPercentHeight HundredPercentWidth\">',\r\n    '<div data-dojo-attach-point=\"entityFilter_Grid\" class=\"HundredPercentHeight HundredPercentWidth\"></div>',\r\n'</div>'\r\n]"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/_EntityDetailGrid", [
    'dijit/_Widget',
    'Sage/_Templated',
    'Sage/Utility',
    'dojo/on',
    "dojo/_base/connect",
    'dojo/string',
    'dijit/registry',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/text!./templates/DetailTabContentGrid.html',
    'dojo/i18n!./nls/_BaseEntityDetailContent',
    'dojo/dom-style',
    'dijit/popup',
    'Sage/Data/SDataServiceRegistry',
    "dojo/_base/array",
    'Sage/UI/Dialogs',
    'dojo/dom-class',
    'Sage/UI/GridView',
    'Sage/UI/_DialogLoadingMixin',
    'Sage/UI/Controls/CheckBox',
    'Sage/MainView/EntityMgr/EntityDetailUtility'
],
function (
    _Widget,
    _Templated,
    utility,
    dojoOn,
    dojoConnect,
    dString,
    registry,
    lang,
    declare,
    template,
    nlsResource,
    dojoStyle,
    popup,
    sDataServiceRegistry,
    arrayUtil,
    dialogs,
    domClass,
    GridView,
    _DialogLoadingMixin,
    CheckBox,
    EntityDetailUtility
) {
    var widget = declare('Sage.MainView.EntityMgr._EntityDetailGrid', [_Widget, _Templated], {
        _dataRequested: false,
        widgetsInTemplate: true,
        isOpen: false,
        entityName: '',
        grid: null,
        dataStore: null,
        widgetTemplate: new Simplate(eval(template)),
        service: null,
        detailUtility: null,
        content: false,
        _where: false,
        containerid: false,
        entityDisplayName: false,
        entityTag: '',
        helpPath: '',
        helpContainer: 'MCWebHelp',
        constructor: function (obj) {
            this.service = sDataServiceRegistry.getSDataService('metadata', false, true, false);
            //destroy
            if (obj && obj.id) {
                this.containerid = obj.id;
                if (registry.byId(obj.id)) {
                    if (registry.byId(obj.id).destroy) {
                        registry.byId(obj.id).destroy(true);
                    }
                }
            }
        },
        postCreate: function () {
            //loading
            lang.mixin(this, new _DialogLoadingMixin());
        },
        CustomChkBox: function () {
            var customChkBox = declare("Sage.MainView.EntityMgr.AddEditEntityDetail.chkBox", CheckBox, {
                shouldPublishMarkDirty: false,
                readonly: true,
                disabled: true,
                constructor: function () {
                },
                postCreate: function () {
                    if (this.hotKey !== '') {
                        this.focusNode.accessKey = this.hotKey;
                    }
                    this.connect(this, 'onChange', this.onChanged);
                },
                _onClick: function () { }
            });
            return customChkBox;
        },
        setUtility: function (dUtility) {
            this.showLoading();
            this.detailUtility = dUtility;
        },
        onOpen: function (tabId, contentName, entity) {
            this.isOpen = true;
            this.entityName = entity.name;
            this.entityDisplayName = entity.$descriptor;


            this._createDetailsGrid(false, this, true);
        },
        // when working with the grid actions this gets the currently highlighted row in the grid.
        getSelectedItem: function () {
            var selectedItem = this.grid.getSelectedRowData();
            if (selectedItem.length === 1) {
                return selectedItem[0];
            }
            dialogs.showWarning(nlsResource.lblWarning, "Infor CRM");
            return null;
        },
        _loadAndPlace: function (storeOptions, columns, nameFor, include, sort, securedAction) {
            var permittedActions = [];
            var svc = Sage.Services.getService('RoleSecurityService');
            if (securedAction && svc) {
                var addAction = dString.substitute("Administration/EntityManager/${0}/Add", [securedAction]);
                if (svc.hasAccess(addAction) && include["add"]) {
                    permittedActions.push('add');
                }
                var editAction = dString.substitute("Administration/EntityManager/${0}/Edit", [securedAction]);
                if (svc.hasAccess(editAction) && include["edit"]) {
                    permittedActions.push('edit');
                }
                var delAction = dString.substitute("Administration/EntityManager/${0}/Delete", [securedAction]);
                if (svc.hasAccess(delAction) && include["delete"]) {
                    permittedActions.push('delete');
                }
            }
            permittedActions.push('help');

            var options = {
                tools: permittedActions,
                gridLabel: dString.substitute("${0} ${1}", [nameFor, this.entityDisplayName]),
                addNew: lang.partial(this.addItem, this),        // set the add item function
                deleteSelected: lang.partial(this.removeItem, this),  // set the remove item function
                editItem: lang.partial(this.editItem, this),      // set the edit item function
                showHelp: lang.partial(this.showHelp, this.helpPath, this.helpContainer, utility.openHelp),                         // set the help function
                sort: [{ attribute: sort }],   // set the sorting
                storeOptions: storeOptions,
                columns: columns,
                placeHolder: this.entityFilter_Grid,
                height: 'auto',
                columnHiding: true,
                columnResizing: true,
                columnReordering: true,
                selectionMode: 'single',
                rowSelection: true,
                classNames: 'entityFilter_Grid',
                minRowsPerPage: 20
            };

            var grid = this.grid = new GridView(options);
            grid.createGridView(); // combine data and columns to make a grid

            dojoConnect.connect(registry.byId('list'), "resize", function () { grid.grid.resize(); });

            grid.grid.resize(); // if column widths exceed the viewing width, then should force a horizontal scrollbar.
            this.hideLoading(); // prevent the loading sign from persisting
        },
        // controls the add action for the grid
        addItem: function (context) {
            console.log("Not Implemented Here");
        },
        // controls the edit action for the grid
        editItem: function (context) {
            console.log("Not Implemented Here");
        },
        //receives the created dialog object from the add and edit functions, and calls show, and sets up the proper connection to the dialogue's closure.
        _displayAddEditDialogue: function (dialogBoxObj, context) {
            dialogBoxObj.service = this.service;
            dialogBoxObj.show();
            dojoConnect.connect(dialogBoxObj._dialog, "hide", lang.partial(context.onReset, context));
        },
        onReset: function (context) {
            popup.close();
            context.grid.refresh();
            context.hideLoading();
        },
        // untranslated singular version of the tab title. Used to be passed to the add/edit dialog
        _getDialogTitleMarker: function () {
        },
        _truncateInputValuesInDialogTitle: function (value) {
            var retValue = value;
            var maxLength = 40;
            if (retValue.length > maxLength) {
                retValue = dString.substitute("${0}...", [retValue.substring(0, maxLength)]);
            }
            return retValue;
        },
        //controls the delete action for the grid
        removeItem: function (context) {
            var opts = {
                title: 'Infor CRM',
                query: dString.substitute(nlsResource.confirmDeleteFmtTxt, [1]),
                callbackFn: function (result) {
                    if (result === true) {
                        // saw that the grid has this by default so try it out.
                        var item = context.getSelectedItem();
                        if (item) {
                            var resourceRequest = new Sage.SData.Client.SDataSingleResourceRequest(context.service).setResourceKind(context.entityTag);
                            resourceRequest.setResourceSelector("'" + item['$key'] + "'");
                            context.showLoading();
                            resourceRequest['delete']({}, {
                                scope: context,
                                ignoreETag: true,
                                success: function () {
                                    this.onReset(this);
                                },
                                failure: function () {
                                    console.log("Error while removing the record");
                                    popup.close();
                                    context.hideLoading();
                                }
                            });
                        }
                    }
                },
                yesText: nlsResource.lblOkButton, //OK
                noText: nlsResource.lblCancelButton //Cancel
            };
            dialogs.raiseQueryDialogExt(opts);
        },
        onClose: function () {
            this.isOpen = false;
        },
        startup: function () {
            this.inherited(arguments);
        },
        showHelp: function () {
        }
    });
    return widget;
});