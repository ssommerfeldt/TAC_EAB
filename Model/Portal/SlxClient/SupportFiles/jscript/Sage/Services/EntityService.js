/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */

define("Sage/Services/EntityService", [
        'Sage/UI/Dialogs',
        'Sage/MainView/EntityMgr/EditEntityOptionsDlg',
        'Sage/Data/SingleEntrySDataStore',
        'Sage/Data/SDataServiceRegistry',
        'dojo/string',
        'Sage/Utility',
        //'dojo/i18n!./nls/ActivityService',
        'dojo/_base/declare',
        'dojo/topic',
        'dojo/_base/lang'
],

function (
    Dialogs,
    EditEntityOptionsDlg,
    SingleEntrySDataStore,
    sDataServiceRegistry,
    dString,
    sageUtility,
    //nlsActivityService,
    declare,
    topic,
    lang
) {

    var entityService = declare('Sage.Services.EntityService', null, {

        _entityDetailsDialog: false,
        constructor: function () {
            //dojo.mixin(this, nlsActivityService);
        },
        editEntityOptions: function (entityId, isRecurring) {
            this.editEntityValues(entityId, isRecurring);
        },
        editEntityValues: function (id, isRecurring) {
            var roleSecurityService = Sage.Services.getService('RoleSecurityService');
            if (roleSecurityService && roleSecurityService.hasAccess('Administration/EntityManager/Entities/Edit')) {
                if (!this._entityDetailsDialog) {
                    this._entityDetailsDialog = new EditEntityOptionsDlg();
                }
                this._entityDetailsDialog.set('entityId', id);
                this._entityDetailsDialog.show();
            }
        },
        getSelectedId: function () {
            var selectionInfo = this.getSelectionInfo();
            var id = "";
            if (selectionInfo) {
                if (selectionInfo.hasCompositeKey) {
                    var entity = selectionInfo.selections[0].entity;
                    return entity["Entity"]["$key"];
                }
                if (selectionInfo.selections.length == 1) {
                    id = selectionInfo.selections[0].id;
                } else {
                    id = selectionInfo.selections[0].id;
                }
            }
            return id;
        },
        getSelectedItem: function () {
            var selectionInfo = this.getSelectionInfo();
            var selectedItem = { id: false, hasCompositeKey: false, entity: false };
            if (selectionInfo) {
                selectedItem.hasCompositeKey = selectionInfo.hasCompositeKey;
                selectedItem.entity = selectionInfo.entity;
                if (selectionInfo.selections.length == 1) {
                    selectedItem.id = selectionInfo.selections[0].id;
                    selectedItem.entity = selectionInfo.selections[0].entity;
                } else {
                    selectedItem.id = selectionInfo.selections[0].id;
                    selectedItem.entity = selectionInfo.selections[0].entity;
                }
            }
            return selectedItem;
        },
        getSelections: function () {
            var selectionInfo = this.getSelectionInfo();
            var selections = null;
            if (selectionInfo) {
                selections = selectionInfo.selections;
            }
            return selections;
        },
        prepareSelections: function () {
            return this.getSelectionInfo();
        },
        getSelectionInfo: function () {
            var selectionInfo = false;
            try {
                var panel = dijit.byId('list');
                if (panel) {
                    selectionInfo = panel.getSelectionInfo(true);
                }
            }
            catch (e) {
                Dialogs.alert(this.txtErrorActionMsg || "error getting selectionInfo");
            }
            return selectionInfo;
        },
        getTotalSelectionCount: function () {
            var count = 0;
            try {
                var panel = dijit.byId('list');
                if (panel) {
                    count = panel.getTotalSelectionCount();
                }
            }
            catch (e) {
            }
            return count;
        },
        verifySelection: function (selectionInfo) {
            if (selectionInfo !== null) {
                return (selectionInfo.selectionCount !== 0);
            }
            return false;
        },
        verifySingleSelection: function (selectionInfo) {
            if (selectionInfo !== null) {
                return (selectionInfo.selectionCount === 1);
            }
            return false;
        },
        setSelectionCount: function () {
            try {
                var panel = dijit.byId('list');
                if (panel) {
                    $("#selectionCount").text(panel.getTotalSelectionCount());
                }
            }
            catch (e) {
            }
        },
        refreshList: function (tabId) {
            try {
                var panel = dijit.byId('list');
                if (panel) {
                    var grpContextSvc = Sage.Services.getService('ClientGroupContext');
                    if (grpContextSvc) {
                        var ctx = grpContextSvc.getContext();
                        if (tabId === ctx.CurrentGroupID) {
                            panel.refreshView(tabId);
                        }
                    }
                }
            }
            catch (e) {
            }
        }

    }); // end dojo declare

    /**
    * Make an instance of this service available to the 
    * Sage.Services.getService method.
    */
    if (!Sage.Services.hasService('EntityService')) {
        Sage.Services.addService('EntityService', new entityService());
    }
    return entityService;
});

