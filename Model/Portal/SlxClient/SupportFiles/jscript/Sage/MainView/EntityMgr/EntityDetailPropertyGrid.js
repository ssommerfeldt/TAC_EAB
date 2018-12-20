/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityDetailPropertyGrid", [
    'dojo/string',
    'dojo/_base/declare',
    'dojo/data/ObjectStore',
    'dojo/dom-construct',
    'dojo/i18n!./nls/_BaseEntityDetailContent',
    'Sage/MainView/EntityMgr/_EntityDetailGrid',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/AddEditPropertiesDialog',
    'Sage/UI/Controls/GridParts/Columns/CheckBox',
    'Sage/UI/Controls/GridParts/Columns/DateTime',
    'Sage/UI/Dialogs',
    'Sage/UI/ImageButton'
],
function (
    dString,
    declare,
    objectStore,
    domConstruct,
    nlsResource,
    _EntityDetailGrid,
    AddEditDialog,
    CheckBox,
    DateTime
) {
    var widget = declare('Sage.MainView.EntityMgr.EntityDetailPropertyGrid', [_EntityDetailGrid], {

        _createDetailsGrid: function (refresh, context, async) {
            var self = context || this;
            this.entityTag = dString.substitute("entities('${0}')/properties", [this.entityName]);
            var storeOptions = {
                service: self.service,
                resourceKind: this.entityTag,
                format: 'json',
                resourcePredicate: null,
                include: [],
                select: ['*', 'bulkAction/*', 'import/*', 'sdata/*', 'dataTypedata/*'],
                queryArgs: {
                    format: 'json'
                },
                scope: this
            };
            this.helpPath = 'PropertiesInDetailGrid';
            var columns = [
                {
                    field: '$key',
                    label: 'Id',
                    editable: false,
                    hidden: true,
                    unhidable: true
                },
                {
                    field: 'propertyName',
                    label: nlsResource.propertyName,
                    editable: false,
                    hidden: false,
                    width: 250
                },
               {
                   field: 'displayName',
                   label: nlsResource.Description,
                   editable: false,
                   hidden: false,
                   width: 250
               },
               {
                   field: 'dataTypeId',
                   label: nlsResource.propertyType,
                   editable: false,
                   hidden: false,
                   formatter: function (data) {
                       var typeIndex = self.detailUtility.typeStore.index[data];
                       if (typeIndex >= 0) {
                           var obj = self.detailUtility.typeStore.data[typeIndex];
                           return obj.name;
                       }
                       else {
                           return "";
                       }
                   },
                   width: 250
               },
               {
                   field: 'isIncluded',
                   label: nlsResource.included,
                   editable: false,
                   hidden: false,
                   renderCell: function (object, value, node, options) {
                       var button = new CheckBox({
                           shouldPublishMarkDirty: false,
                           readonly: true,
                           disabled: true
                       });
                       var retValue = false;
                       if (value) {
                           retValue = value;
                       }
                       button.setChecked(retValue);
                       button.placeAt(node);
                   },
                   width: 100
               },
               {
                   field: 'isReadOnly',
                   label: nlsResource.calculatedFields,
                   editable: false,
                   hidden: false,
                   renderCell: function (object, value, node, options) {
                       var button = new CheckBox({
                           shouldPublishMarkDirty: false,
                           readonly: true,
                           disabled: true
                       });
                       var retValue = false;
                       if (value) {
                           retValue = value;
                       }
                       button.setChecked(retValue);
                       button.placeAt(node);
                   },
                   width: 100
               },
               {
                   field: 'isDynamic',
                   label: nlsResource.editable,
                   editable: false,
                   hidden: false,
                   renderCell: function (object, value, node, options) {
                       var button = new CheckBox({
                           shouldPublishMarkDirty: false,
                           readonly: true,
                           disabled: true
                       });
                       var retValue = false;
                       if (value) {
                           retValue = value;
                       }
                       button.setChecked(retValue);
                       button.placeAt(node);
                   },
                   width: 100
               },
               {
                   field: 'isKey',
                   label: nlsResource.key,
                   editable: false,
                   hidden: false,
                   renderCell: function (object, value, node, options) {
                       var button = new CheckBox({
                           shouldPublishMarkDirty: false,
                           readonly: true,
                           disabled: true
                       });
                       var retValue = false;
                       if (value) {
                           retValue = value;
                       }
                       button.setChecked(retValue);
                       button.placeAt(node);
                   },
                   width: 100
               },
               {
                   field: 'audited',
                   label: nlsResource.lblAudited,
                   editable: false,
                   hidden: false,
                   renderCell: function (object, value, node, options) {
                       var button = new CheckBox({
                           shouldPublishMarkDirty: false,
                           readonly: true,
                           disabled: true
                       });
                       var retValue = false;
                       if (value) {
                           retValue = value;
                       }
                       button.setChecked(retValue);
                       button.placeAt(node);
                   },
                   width: 100
               },
               {
                   field: 'import.canMatch',
                   label: nlsResource.lblMatch,
                   editable: false,
                   hidden: false,
                   /* 
                        Using renderCell here instead of formatter and editor, because formatter and editor currently don't work well in tandem.
                        The reason both a formatter and an editor would be needed is because a control, a check box, needs to be displayed to be eventually used
                        (hence the need for an editor) and the data, generate, is not easily accessible(hence the need for a formatter).
                   */
                   renderCell: function (object, value, node, options) {
                        var button = new CheckBox({
                           shouldPublishMarkDirty: false,
                           readonly: true,
                           disabled: true
                        });
                        var retValue = false;
                        if (value) {
                            retValue = value;
                        }
                        button.setChecked(retValue);
                        button.placeAt(node);
                   },
                   width: 100
               },
               {
                   field: 'import.canImport',
                   label: nlsResource.lblImport,
                   editable: false,
                   hidden: false,
                   /* 
                        Using renderCell here instead of formatter and editor, because formatter and editor currently don't work well in tandem.
                        The reason both a formatter and an editor would be needed is because a control, a check box, needs to be displayed to be eventually used
                        (hence the need for an editor) and the data, generate, is not easily accessible(hence the need for a formatter).
                   */
                   renderCell: function (object, value, node, options) {
                       var button = new CheckBox({
                           shouldPublishMarkDirty: false,
                           readonly: true,
                           disabled: true
                       });
                       var retValue = false;
                       if (value) {
                           retValue = value;
                       }
                       button.setChecked(retValue);
                       button.placeAt(node);
                   },
                   width: 100
               },
               {
                   field: 'bulkAction.canBulkUpdate',
                   label: nlsResource.lblBulkUpdate,
                   editable: false,
                   hidden: false,
                   /* 
                        Using renderCell here instead of formatter and editor, because formatter and editor currently don't work well in tandem.
                        The reason both a formatter and an editor would be needed is because a control, a check box, needs to be displayed to be eventually used
                        (hence the need for an editor) and the data, generate, is not easily accessible(hence the need for a formatter).
                   */
                   renderCell: function (object, value, node, options) {
                       var button = new CheckBox({
                           shouldPublishMarkDirty: false,
                           readonly: true,
                           disabled: true
                       });
                       var retValue = false;
                       if (value) {
                               retValue = value;
                       }
                       button.setChecked(retValue);
                       button.placeAt(node);
                   },
                   width: 100
               }/*,
                should always be true, if it is displaying here.
               {
                   field: 'sdata',
                   label: nlsResource.generate,
                   editable: false,
                   hidden: false,
                   /* 
                        Using renderCell here instead of formatter and editor, because formatter and editor currently don't work well in tandem.
                        The reason both a formatter and an editor would be needed is because a control, a check box, needs to be displayed to be eventually used
                        (hence the need for an editor) and the data, generate, is not easily accessible(hence the need for a formatter).
                   
                   renderCell: function (object, value, node, options) {
                       var button = new CheckBox({
                           shouldPublishMarkDirty: false,
                           readonly: true,
                           disabled: true
                       });
                       var retValue = false;
                       if (value) {
                           if (value.generate) {
                               retValue = value.generate;
                           }
                       }
                       button.setChecked(retValue);
                       button.placeAt(node);
                   }
               },
               {
                   field: '$updated',
                   label: nlsResource.FilterGridColumnLastUpdated,
                   type: DateTime,
                   editable: false,
                   hidden: false,
                   unhidable: true
               }*/
            ];

            //This is just a temporary way of determining that the IDbSchemaCreationService has been applied in the entity model. It is used to determine 
            //if the Add A Field action is enabled. This code should be removed in 9.0 when both core and model are in sync
            var enableAddField = false;
            var clientContextSvc = Sage.Services.getService('ClientContextService');
            if (clientContextSvc) {
                enableAddField = (clientContextSvc.containsKey("schemaCreationService"));
            }
            this._loadAndPlace(storeOptions, columns, nlsResource.propertyFor, { "add": enableAddField, "edit": true, "delete": false }, "propertyName", 'Fields');
        },

        // controls the add action for the grid
        addItem: function (context) {
            // instantiate the add/edit popup
            // hand over control to the popup
            // refresh the grid

            var box = new AddEditDialog(context.entityName, context._getDialogTitleMarker(), context.detailUtility, false);
            context._displayAddEditDialogue(box, context);
        },

        // controls the edit action for the grid
        editItem: function (context) {
            // should be about the same as the add, just populate add/edit widget with data from the currently selected grid
            var selectedGridRow = context.getSelectedItem();
            if (selectedGridRow) {
                var box = new AddEditDialog(context.entityName, context._getDialogTitleMarker(selectedGridRow), context.detailUtility, false, selectedGridRow);
                context._displayAddEditDialogue(box, context);
            }
        },

        _getDialogTitleMarker: function (selectedGridRow) {
            var entityToBeSeenInTitle = this._truncateInputValuesInDialogTitle(this.entityName),
                fieldToBeSeenInTitle = "";
            if (selectedGridRow) {
                fieldToBeSeenInTitle = this._truncateInputValuesInDialogTitle(selectedGridRow.propertyName);
                return dString.substitute(nlsResource.editDialogTitle, [fieldToBeSeenInTitle, entityToBeSeenInTitle]);
            }
            else {
                return dString.substitute(nlsResource.dialogTitleAddField, [entityToBeSeenInTitle]);
            }
        },

        showHelp: function (strHelpPath, strContainer, fnOpenHelp) {
            fnOpenHelp(strHelpPath, strContainer);
        }
    });
    return widget;
});