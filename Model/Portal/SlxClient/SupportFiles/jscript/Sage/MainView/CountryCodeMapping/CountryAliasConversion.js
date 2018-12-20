require({cache:{
'url:Sage/MainView/CountryCodeMapping/templates/CountryAliasConversion.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"{%= $._nlsResources.dlgCountryAliasConverstion_Title %}\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"width: 800px\">\r\n        <div data-dojo-type=\"dijit.form.Form\">\r\n            <div data-dojo-attach-point=\"divLoadingMessage\">\r\n                <br />\r\n                <label style=\"padding-left:300px;font-size:16px;font-weight:bold\"> {%= Sage.Utility.htmlEncode($.gridLoading_Caption) %}</label>\r\n            </div>\r\n            <div data-dojo-attach-point=\"countryAliasGrid\" style=\"height:300px\"></div>\r\n            <div align=\"right\" style=\"margin-top:10px\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnSave\" data-dojo-attach-event=\"onClick:_btnSave_OnClick\">{%= Sage.Utility.htmlEncode($._nlsResources.btnSave_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($._nlsResources.btnCancel_Caption) %}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/CountryCodeMapping/CountryAliasConversion", [
'dojo/_base/declare', 
'dojo/_base/lang', 
'dojo/string', 
'Sage/MainView/CountryCodeMapping/_CountryAliasConversionDialogBase', 
'dojo/text!./templates/CountryAliasConversion.html', 
'dojo/i18n!./nls/CountryAliasConversion', 
'Sage/Utility', 
'Sage/UI/Dialogs', 
'Sage/MainView/CountryCodeMapping/CountryAliasConversionUtility', 
'Sage/UI/GridView', 
'Sage/Data/SDataServiceRegistry', 
'dgrid/editor', 
'dijit/form/FilteringSelect', 
'dojo/_base/connect', 
'dijit/registry', 
'Sage/UI/Controls/GridParts/Columns/Lookup', 
'Sage/Store/SData', 
'dojo/_base/array',
'dojo/dom-style'
], 
function(
declare, 
dLang, 
dString, 
_countryDialogBase, 
template, 
nlsResources, 
utility, 
dialogs, 
countryAliasConversionUtility, 
GridView, 
sDataServiceRegistry, 
editor, 
filteringSelect, 
dojoConnect, 
registry, 
Lookup, 
SDataObjectStore, 
array,
domStyle
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var manageImportTemplate = declare('Sage.MainView.CountryCodeMapping.CountryAliasConversion', [_countryDialogBase], {
        id: 'dlgCountryAliasConversion',
        widgetTemplate: widgetTemplate,
        _nlsResources: nlsResources,
        countryAliasGrd: '',
        helpPath: 'countryconfig',
        helpContainer: 'MCWebHelp',
        dirtyAliases: [],
        constructor: function() {
            this.inherited(arguments);
        },
        startup: function() {
            this._loadAndPlace();
        },
        _loadAndPlace: function(nameFor, sort, securedAction) {
            var permittedActions = [];
            var svc = Sage.Services.getService('RoleSecurityService');
            if (securedAction && svc) {
                var addAction = "Entities/CountryCodeMapping/Add";
                if (svc.hasAccess(addAction)) {
                    permittedActions.push('add');
                }
                var editAction = "Entities/CountryCodeMapping//Edit";
                if (svc.hasAccess(editAction)) {
                    permittedActions.push('edit');
                }
                var delAction = "Entities/CountryCodeMapping/Delete";
                if (svc.hasAccess(delAction)) {
                    permittedActions.push('delete');
                }
            }
            permittedActions.push('help');
            
            var onStoreComplete = function(data, context) {
                var emptyItem = {
                    $descriptor: "",
                    $key: "",
                    AlternateCode: "",
                    CountryCode: "",
                    CountryName: ""
                };
                data.splice(0, 0, emptyItem);
            };
            var store = new SDataObjectStore({
                select: [''],
                include: [''],
                resourceKind: 'countryCodeMappings',
                service: sDataServiceRegistry.getSDataService('dynamic'),
                labelProperty: 'CountryName',
                idProperty: '$key',
                queryArgs: {
                    count: 1000
                },
                onComplete: onStoreComplete
            });
            var onDataChange = function(entity, field, newValue) {
                return;
            };
            var options = {
                tools: permittedActions,
                gridLabel: nlsResources.grdLabel,
                deleteSelected: dLang.partial(this.removeItem, this),
                editItem: dLang.partial(this.editItem, this),
                showHelp: dLang.partial(this.showHelp, this.helpPath, this.helpContainer, utility.openHelp),
                sort: [{
                    attribute: 'Alias'
                }],
                minRowsPerPage: 1000,
                storeOptions: {
                    service: sDataServiceRegistry.getSDataService('dynamic'),
                    resourceKind: 'countryAliases',
                    include: ['CountryCodeMapping'],
                    select: ['Alias', 'CountryCodeMappingId'],
                    where: 'CountryCodeMappingId eq null',
                    queryArgs: {
                        format: 'json'
                    }
                },
                query: false,
                columns: [
                {
                    field: "$key",
                    label: "Id",
                    hidden: true,
                    unhidable: true
                }, 
                {
                    field: "Alias",
                    label: nlsResources.colUnmatchedAlias_Caption,
                    hidden: false,
                    editable: false,
                    unhidable: true
                }, 
                {
                    field: 'CountryCodeMapping.CountryName',
                    label: nlsResources.colCountryName,
                    editable: true,
                    type: Lookup,
                    editor: filteringSelect,
                    editOn: '',
                    editorArgs: {
                        store: store,
                        onDataChange: onDataChange,
                        searchAttr: "CountryName",
                        labelAttr: "CountryName",
                        pageSize: 1000,
                        placeHolder: nlsResources.colCountryNamePlaceHolder,
                        fetchProperties: { sort: [{attribute: "CountryName", descending: false}] }
                    }
                }
                ],
                placeHolder: this.countryAliasGrid,
                height: '300px',
                columnHiding: true,
                columnResizing: true,
                columnReordering: true,
                selectionMode: 'single',
                rowSelection: true,
                classNames: 'countryAliasConversion_Grid',
                id: 'grdOrphanedAliases'
            };
            
            var grid = this.grid = new GridView(options);
            grid.createGridView();
            domStyle.set([grid.id, '_helpBtn'].join(''), 'display', 'none'); //hide help icon on grid, as dialog has help icon.
            countryAliasConversionUtility.setDomNodeVisible(this.divLoadingMessage, false);
            
            this.grid.grid.onDataChange = dLang.hitch(this, function(evt) {
                this.grid.markClean(); //loading grid automatically marks dirty.
                var cell = evt.cell;
                if (cell.column.field === "CountryCodeMapping.CountryName") {
                    if (evt.value) {
                        var countryCodeMappingId = evt.value;
                        var selectedRow = evt.cell.row;
                        var key = selectedRow.data.$key;
                        var aliasOptions = {
                            countryCodeMappingId: countryCodeMappingId,
                            countryAliasId: key
                        };
                        this.grid.markDirty();
                        this.dirtyAliases.push(aliasOptions);
                    }
                    if (evt.value === "") { //when user clears selection by choosing blank item must remove from list of items to save
                            for (var i = this.dirtyAliases.length; i >= 0, i--;) {
                                    if(this.dirtyAliases[i].countryAliasId === evt.cell.row.data.$key) {
                                            this.dirtyAliases.splice(i, 1);
                                    }
                            }
                    }
                }
            });
        },
        _saveAliases: function () {
            array.forEach(this.dirtyAliases, dLang.hitch(this, function(dirtyAlias) {
                this.saveCountryAliasConversion(dirtyAlias);
            }));
         },
        _btnSave_OnClick: function () {
            this._saveAliases();
            this.grid.markClean();
            this._dialog.hide();
            this._destroy();
        },
        _btnCancel_OnClick: function() {
            this._dialog.hide();
            this._destroy();
        },
        showHelp: function(strHelpPath, strContainer, fnOpenHelp) {
            fnOpenHelp(strHelpPath, strContainer);
        },
        _destroy: function () {
            array.forEach(this._dialogIds, function (dialogId) {
                var dialog = registry.byId(dialogId);
                if (dialog) {
                    array.forEach(registry.findWidgets(registry.byId(dialogId)), function (w) {
                        w.destroyRecursive();
                    });
                    dialog.grid.destroy();
                    dialog.destroyRecursive();
                    dialog.destroyDescendants();
                }
            });
        }
    });
    return Sage.MainView.CountryCodeMapping.CountryAliasConversion;
});
