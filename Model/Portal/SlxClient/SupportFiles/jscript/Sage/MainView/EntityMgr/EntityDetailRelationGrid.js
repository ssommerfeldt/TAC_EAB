/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityDetailRelationGrid", [
    'dojo/_base/declare',
    'dojo/data/ObjectStore',
    'dojo/date/locale',
    'dojo/string',
    'dojo/i18n!./nls/_BaseEntityDetailContent',
    'Sage/MainView/EntityMgr/_EntityDetailGrid',
    'Sage/Utility',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/AddEditRelationshipsDialog',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/EditRelationshipsDialog',
    'Sage/UI/Controls/CheckBox',
    'dojo/dom-construct'
],
function (
    declare,
    objectStore,
    locale,
    dString,
    nlsResource,
    _EntityDetailGrid,
    utility,
    AddEditDialog,
    EditRelationshipsDialog,
    CheckBox,
    domConstruct
) {
    var widget = declare('Sage.MainView.EntityMgr.EntityDetailRelationGrid', [_EntityDetailGrid], {
        _createDetailsGrid: function (refresh, context, async) {
            var self = context || this;
            this.entityTag = "relationships";

            var whereStr = '(parentEntity.name eq "${0}" or childEntity.name eq "${0}")';

            var storeOptions = {
                service: self.service,
                resourceKind: this.entityTag,
                where: dString.substitute(whereStr, [self.entityName]),
                select: ['$key', '$descriptor', 'cardinality', 'isdynamic', 'parentEntity', 'childEntity', 'parentProperty/*', 'parentProperty/Import/*', 'childProperty/*', 'childProperty/Import/*', '$updated'],
                queryArgs: {
                    format: 'json',
                    _expandSpecialRanges: false
                },
                scope: this
            };

            this.helpPath = 'RelationsInDetailGrid';
            var columns = [
                {
                    field: '$key',
                    label: 'Id',
                    editable: false,
                    hidden: true,
                    unhidable: true
                },
                {
                    field: '$descriptor',
                    label: nlsResource.FilterGridColumnDisplay,
                    editable: false,
                    hidden: false,
                    unhidable: true,
                    width: 250
                },
                {
                    field: 'cardinality',
                    label: nlsResource.relationship,
                    editable: false,
                    hidden: false,
                    unhidable: false,
                    width: 110
                },
                {
                    field: 'parentEntity.$key',
                    label: nlsResource.parentEntity,
                    editable: false,
                    hidden: false,
                    unhidable: true,
                    width: 150
                },
                {
                    field: 'childEntity.$key',
                    label: nlsResource.childEntity,
                    editable: false,
                    hidden: false,
                    unhidable: true,
                    width: 150
                },
                //{
                //    field: 'parentProperty.propertyName',
                //    label: nlsResource.parentProperty,
                //    renderCell: function (object, value, node, options) {
                //        if (object.parentProperty.displayName)
                //            node.innerText = object.parentProperty.displayName;
                //        else
                //            node.innerText = object.parentProperty.propertyName;
                //    },
                //    editable: false,
                //    hidden: false,
                //    unhidable: true,
                //    width: 150
                //},
                //{
                //    field: 'childProperty.propertyName',
                //    label: nlsResource.childProperty,
                //    renderCell: function (object, value, node, options) {
                //        if (object.childProperty.displayName)
                //            node.innerText = object.childProperty.displayName;
                //        else
                //            node.innerText = object.childProperty.propertyName;
                //    },
                //    editable: false,
                //    hidden: false,
                //    unhidable: true,
                //    width: 150
                //},
                {
                    field: 'parentProperty.import.canImport',
                    label: nlsResource.parentImport,
                    renderCell: function (object, value, node, options) {
                        var canImport = new CheckBox({
                            shouldPublishMarkDirty: false,
                            readonly: true,
                            disabled: true,
                            name: 'canImport'
                        });
                        var retValue = false;
                        if (value) {
                            retValue = value;
                        }
                        canImport.setChecked(retValue);
                        canImport.placeAt(node);
                    },
                    editable: false,
                    hidden: false,
                    unhidable: false,
                    sortable: true,
                    width: 120
                },
                {
                    field: 'childProperty.import.canImport',
                    label: nlsResource.childImport,
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
                    editable: false,
                    hidden: false,
                    unhidable: false,
                    sortable: true,
                    width: 120
                },
                {
                    field: 'parentProperty.import.canMatch',
                    label: nlsResource.parentMatch,
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
                    editable: false,
                    hidden: false,
                    unhidable: false,
                    sortable: true,
                    width: 120
                },
                {
                    field: 'childProperty.import.canMatch',
                    label: nlsResource.childMatch,
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
                    editable: false,
                    hidden: false,
                    unhidable: false,
                    sortable: true,
                    width: 120
                },
                {
                    field: 'parentProperty.audited',
                    label: nlsResource.parentAudit,
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
                    editable: false,
                    hidden: false,
                    unhidable: false,
                    sortable: true,
                    width: 120
                },
                {
                    field: 'childProperty.audited',
                    label: nlsResource.childAudit,
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
                    editable: false,
                    hidden: false,
                    unhidable: false,
                    sortable: true,
                    width: 120
                }, {
                    field: 'parentProperty.isIncluded',
                    label: nlsResource.parentIncluded,
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
                    editable: false,
                    hidden: false,
                    unhidable: false,
                    sortable: true,
                    width: 120
                },
                {
                    field: 'childProperty.isIncluded',
                    label: nlsResource.childIncluded,
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
                    editable: false,
                    hidden: false,
                    unhidable: false,
                    sortable: true,
                    width: 120
                },
                {
                    field: '$updated',
                    label: nlsResource.FilterGridColumnLastUpdated,
                    formatter: function (date) {
                        if (typeof (date) !== 'undefined') {
                            var d = utility.Convert.toDateFromString(date, true);
                            if (typeof (d) !== 'undefined') {
                                return locale.format(d, { selector: 'date/time', fullYear: true, locale: Sys.CultureInfo.CurrentCulture.name });
                            }
                        }
                        return locale.format(new Date(), { selector: 'date/time', fullYear: true, locale: Sys.CultureInfo.CurrentCulture.name });
                    },
                    editable: false,
                    hidden: false,
                    unhidable: false,
                    sortable: true,
                    width: 250
                }
            ];
            this._loadAndPlace(storeOptions, columns, nlsResource.relationFor, { "add": true, "edit": true, "delete": true }, "$descriptor", 'Relationship');
        },
        // controls the add action for the grid
        addItem: function (context) {
            // instantiate the add/edit popup
            // hand over control to the popup
            // refresh the grid
            var box = new AddEditDialog(context.entityName, context._getDialogTitleMarker(), context.detailUtility);
            context._displayAddEditDialogue(box, context);
        },
        // controls the edit action for the grid
        editItem: function (context) {
            // should be about the same as the add, just populate add/edit widget with data from the currently selected grid
            var selectedGridRow = context.getSelectedItem();
            if (selectedGridRow) {
                var box = new EditRelationshipsDialog(context.entityName, context._getDialogTitleMarker(selectedGridRow), context.detailUtility, selectedGridRow);
                context._displayAddEditDialogue(box, context);
            }
        },
        _getDialogTitleMarker: function (selectedGridRow) {
            var entityToBeSeenInTitle = this._truncateInputValuesInDialogTitle(this.entityName),
                 fieldToBeSeenInTitle = "";
            if (selectedGridRow) {
                fieldToBeSeenInTitle = this._truncateInputValuesInDialogTitle(selectedGridRow.$descriptor);
                return dString.substitute(nlsResource.editDialogTitle, [fieldToBeSeenInTitle, entityToBeSeenInTitle]);
            }
            else {
                return dString.substitute(nlsResource.dialogTitleAddRelationship, [entityToBeSeenInTitle]);
            }
        },
        showHelp: function (strHelpPath, strContainer, fnOpenHelp) {
            fnOpenHelp(strHelpPath, strContainer);
        }
    });
    return widget;
});