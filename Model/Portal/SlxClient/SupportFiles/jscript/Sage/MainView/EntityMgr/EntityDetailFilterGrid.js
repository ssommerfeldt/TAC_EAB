/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityDetailFilterGrid", [
    'dojo/string',
    'dojo/_base/declare',
    'dojo/data/ObjectStore',
    'dojo/i18n!./nls/_BaseEntityDetailContent',
    'Sage/Utility',
    'Sage/MainView/EntityMgr/_EntityDetailGrid',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/AddEditFiltersDialog',
    'Sage/UI/Controls/CheckBox',
    'Sage/UI/Controls/GridParts/Columns/DateTime',
    'Sage/UI/Dialogs'
],
function (
    dString,
    declare,
    objectStore,
    nlsResource,
    utility,
    _EntityDetailGrid,
    AddEditDialog,
    CheckBox,
    DateTime,
    dialogs
) {
    var widget = declare('Sage.MainView.EntityMgr.EntityDetailFilterGrid', [_EntityDetailGrid], {
        metric: false,
        _createDetailsGrid: function (refresh, context, async) {
            var self = context || this;
            this.entityTag = dString.substitute("entities('${0}')/filters", [this.entityName]);

            var storeOptions = {
                service: self.service,
                resourceKind: this.entityTag,
                resourcePredicate: null,
                format: 'json',
                include: [],
                select: ['$key', 'filterName', 'displayName', 'propertyName', 'filterType', 'analyticsAvailable', '$updated', 'details'],
                queryArgs: {
                    format: 'json',
                    _expandSpecialRanges: false
                },
                where: dString.substitute('${0}', [self._where]),
                scope: this
            };
            this.metric = this.id.indexOf("metric") >= 0;
            this.helpPath = this.metric ? 'MetricsInDetailGrid' : 'FiltersInDetailGrid';

            var columns = [
                {
                    field: '$key',
                    label: 'Id',
                    editable: false,
                    hidden: true,
                    unhidable: true
                },
                {
                    field: 'displayName',
                    label: nlsResource.FilterGridColumnDisplay,
                    editable: false,
                    hidden: false,
                    unhidable: true,
                    width: 250
                },
               {
                   field: 'filterName',
                   label: this.id.search('metric') >= 0 ? nlsResource.MetricGridColumnMetric : nlsResource.FilterGridColumnFilter,
                   editable: false,
                   hidden: false,
                   unhidable: false,
                   width: 250
               },
               {
                   field: 'propertyName',
                   label: nlsResource.FilterGridColumnProperty,
                   editable: false,
                   hidden: false,
                   unhidable: true,
                   width: 250
               },
               {
                   field: 'analyticsAvailable',
                   label: nlsResource.FilterGridColumnIsMetric,
                   editable: false,
                   hidden: false,
                   unhidable: true,
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
                   width: 250
               },
               {
                   field: '$updated',
                   label: nlsResource.FilterGridColumnLastUpdated,
                   type: DateTime,
                   editable: false,
                   hidden: false,
                   unhidable: true,
                   width: 250
               },
               {
                   field: 'details',
                   label: nlsResource.FilterGridColumnDetails,
                   formatter: function (details) {
                       return context.detailUtility.formatDetails(details).detailsLocalizedName;
                   },
                   editable: false,
                   hidden: false,
                   unhidable: true,
                   sortable: false,
                   width: 300
               }
            ];
            if (this.metric) {
                columns.push({
                    field: 'details',
                    label: nlsResource.editable,
                    renderCell: function (object, value, node, options) {
                        var button = new CheckBox({
                            shouldPublishMarkDirty: false,
                            readonly: true,
                            disabled: true
                        });
                        var retValue = self._IsTheMetricEditable(value);
                        button.setChecked(retValue);
                        button.placeAt(node);
                    },
                    editable: false,
                    hidden: false,
                    unhidable: true,
                    sortable: false,
                    width: 300
                });
            }
            this._loadAndPlace(storeOptions, columns, (this.metric ? nlsResource.metricsFor : nlsResource.filtersFor), { "add": true, "edit": true, "delete": true }, "displayName", 'Filters');
        },
        _IsTheMetricEditable: function (value) {
            if (value) {
                var fieldCheck = value.dateDiffMetricFilter;
                if (fieldCheck) {
                    // if from or to of the date difference metric is :now the metric is not editable
                    return fieldCheck.fromPropertyName !== ':now' && fieldCheck.toPropertyName !== ':now';
                }
            }
            return true;
        },
        // controls the add action for the grid
        addItem: function (context) {
            // instantiate the add/edit popup
            // hand over control to the popup
            // refresh the grid
			var entityDetailGridId = context.id;
            var box = new AddEditDialog(context.entityName, context._getDialogTitleMarker(), context.detailUtility,null,null,entityDetailGridId);
            context._displayAddEditDialogue(box, context);
        },

        // controls the edit action for the grid
        editItem: function (context) {
            // should be about the same as the add, just populate add/edit widget with data from the currently selected grid
            var selectedGridRow = context.getSelectedItem();
            if (selectedGridRow) {
                if (context._IsTheMetricEditable(selectedGridRow.details)) {
                    var box = new AddEditDialog(context.entityName, context._getDialogTitleMarker(selectedGridRow), context.detailUtility, selectedGridRow);
                    context._displayAddEditDialogue(box, context);
                }
                else {
                    dialogs.showWarning(nlsResource.metricNotEditable, "Infor CRM");
                }
            }
        },
        _getDialogTitleMarker: function (selectedGridRow) {
            var entityToBeSeenInTitle = this._truncateInputValuesInDialogTitle(this.entityName),
                fieldToBeSeenInTitle="";
            if (selectedGridRow) {
                fieldToBeSeenInTitle = this._truncateInputValuesInDialogTitle(selectedGridRow.filterName);
                return dString.substitute(nlsResource.editDialogTitle, [fieldToBeSeenInTitle, entityToBeSeenInTitle]);
            }
            else {
                return this.metric ? dString.substitute(nlsResource.dialogTitleAddMetric, [entityToBeSeenInTitle]) : dString.substitute(nlsResource.dialogTitleAddFilter, [entityToBeSeenInTitle]);
            }
        },

        showHelp: function (strHelpPath, strContainer, fnOpenHelp) {
            fnOpenHelp(strHelpPath, strContainer);
        }
    });
    return widget;
});