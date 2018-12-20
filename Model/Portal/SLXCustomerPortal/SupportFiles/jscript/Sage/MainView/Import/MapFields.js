require({cache:{
'url:Sage/MainView/Import/templates/MapFields.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"{%= $._nlsResources.dlgMapFields_Title %}\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"width: 650px;height:500px\">\r\n        <div style=\"overflow:auto\">\r\n            <label class=\"wizardHeaderText\" data-dojo-attach-point=\"lblMatchedFields\"></label>\r\n        </div>\r\n        <br/>\r\n        <div style=\"overflow:auto\" data-dojo-attach-point=\"divRequiredFields\">\r\n            <label style=\"color: red;font-size: 13px\" data-dojo-attach-point=\"lblRequiredFields\"></label>\r\n        </div>\r\n        <br/>\r\n        <div style=\"padding-left: 5px\">\r\n            <div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnUnMapped\" data-dojo-attach-event=\"onClick:btnUnMapped_OnClick\" ></div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnMapped\" data-dojo-attach-event=\"onClick:btnMapped_OnClick\" ></div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnAll\" data-dojo-attach-event=\"onClick:btnAll_OnClick\" ></div>\r\n            </div>\r\n            <div data-dojo-attach-point=\"mappingsGrid\" class=\"grid-defaultHeight\"></div>\r\n        </div>\r\n        <br />\r\n        <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\">\r\n            <span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>\r\n        </div>\r\n        <div align=\"right\" style=\"margin-top:10px\">\r\n            <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\" >{%= Sage.Utility.htmlEncode($.btnBack_Caption) %}</div>\r\n            <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">{%= Sage.Utility.htmlEncode($.btnNext_Caption) %}</div>\r\n            <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($.btnCancel_Caption) %}</div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/Import/MapFields", [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/store/Memory',
    'dojo/store/Observable',
    'Sage/MainView/Import/_WizardDialogBase',
    'dojo/text!./templates/MapFields.html',
    'dojo/i18n!./nls/MapFields',
    'Sage/MainView/Import/ImportManagerUtility',
    'Sage/Utility',
    'Sage/UI/Dialogs',
    'Sage/UI/Controls/Grid',
    'dijit/form/FilteringSelect',
    'dgrid/editor' // TODO: Should not directly refer to dgrid. This was required since column types defined in Grid.js are not being currently converted through legacy formatters.
],
function (
    declare,
    dArray,
    lang,
    dString,
    dMemory,
    dObservable,
    wizardDialogBase,
    template,
    nlsResources,
    importManagerUtility,
    utility,
    dialogs,
    Grid,
    filteringSelect,
    editor
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var mapFields = declare('Sage.MainView.Import.MapFields', [wizardDialogBase], {
        id: "dlgMapFields",
        widgetTemplate: widgetTemplate,
        _nlsResources: nlsResources,
        _currentStep: importManagerUtility.importWizardStep.MapFields,
        _grid: '',
        _mappingCount: 0,
        _requiredFields: "",
        accountPropertyName: "Account.AccountName",
        lastNamePropertyName: "LastName",
        firstNamePropertyName: "FirstName",
        constructor: function () {
            this.inherited(arguments);
        },
        startup: function () {
        },
        show: function () {
            this._requestMappings();
            this._setRequiredMappingsMsg();
            this.inherited(arguments);
        },
        btnMapped_OnClick: function () {
            this._setEntityColumnState(false, "entityDisplayName");

            this._grid.setFilter(function (item) {
                return item.targetProperty !== "";
            });
        },
        btnAll_OnClick: function () {
            this._setEntityColumnState(false, "entityDisplayName");
            this._grid.setFilter(function (item) {
                return true;
            });
            //TODO: Replace direct _grid references with public methods available in grid.js
            this._grid._grid.columns.entityDisplayName.hidden = false;
        },
        preformValidation: function (successfulCallback,failedCallback)
        {
            var msg = "";
            this._generateMappings();
            if (!this._generateMatchMappings()) {
                msg = nlsResources.errorRequiredMappings;
            }
            //lets check to see that there is only one destination target
            var properties = [];
            var errorProps = [];
            dArray.forEach(this.importOptions.mappings, dojo.hitch(this, function (data) {
                var propName = data.target.name;
                if (properties.indexOf(propName) < 0) {
                    properties.push(propName);
                }
                else {
                    errorProps.push(data.target.displayName);
                }
            }));
            dArray.forEach(errorProps, dojo.hitch(this, function (propInError) {
                msg = msg.concat(propInError).concat(' ');
            }));
            var isMsgBlank = false;
            if(errorProps.length > 0){
            msg = dString.substitute(errorProps.length === 1 ? nlsResources.multipleDestinationPropTag_Is :nlsResources.multipleDestinationPropTag_Are,[msg]);
            isMsgBlank = true;
            }
            if(isMsgBlank)  {
                this.spanValidationMessage.innerHTML = utility.htmlEncode(msg);
            }
            importManagerUtility.setDomNodeVisible(this.divValidationMessage, (msg !== ""));
            if (!isMsgBlank) {
                successfulCallback();
            }
            else {
                failedCallback();
            }
        },
        _requestMappings: function () {
            var requestOptions = {
                entry: {
                    "$name": "GetImportMappings",
                    "request": {
                        "ImportHistoryId": null,
                        "importOptions": Sys.Serialization.JavaScriptSerializer.serialize(this.getConfigurationOptions())
                    }
                },
                businessRuleMethod: "GetImportMappings",
                onSuccess: dojo.hitch(this, function (mappings) {
                    this._mappingCount = this._getMappingCount(mappings.defaultMappings);
                    this._updateCaptions();
                    this._loadMappingsData(mappings);
                    this._resolveDefaultMappings();
                    this._setRequiredMappingsMsg();
                }),
                onFailure: function (result) {
                    dialogs.showError(dString.substitute(nlsResources.errorRequestMappings, [result]));
                }
            };
            importManagerUtility.importRuleRequest(requestOptions, "importHistory");
        },
        _getMappingCount: function (mappings) {
            var result = mappings.filter(
                dojo.hitch(this, function (mapping) {
                    return mapping.target.fieldType.indexOf(this.lookupTypeField) === -1;
                })
            );
            return mappings ? result.length : 0;
        },
        _loadMappingsData: function (mappings) {
            var data = [];
            var targetList = new dMemory({ data: this._filterTargetFields(), idProperty: "name" });
            this.importOptions.defaultMappings = mappings.defaultMappings;

            dArray.forEach(this.importOptions.sourceColumns, function (source, i) {
                data.push({ id: i, sourceProperty: source.displayName, targetProperty: "", entityDisplayName: "" });
            });
            var myGrid = dijit.byId("mapFields_grid");
            if (myGrid) {
                myGrid.destroyRecursive();
            }
            this._grid = new Grid({
                store: new dObservable(new dMemory({ data: data, idProperty: "sourceProperty" })),
                sort: "id",
                id: 'mapFields_grid',
                columns: {
                    id: { field: "id", hidden: true, unhidable: true },
                    sourceProperty: nlsResources.colImportField_Caption,
                    targetProperty: editor(
                    {
                        selectedValue: "FirstName",
                        label: nlsResources.colInforField_Caption,
                        field: "targetProperty",
                        autoSave: true,
                        autoSelect: true,
                        editorArgs: {
                            store: targetList,
                            maxHeight: 150,
                            required: false,
                            searchAttr: "displayName",
                            labelAttr: "displayName"
                        }
                    }, filteringSelect),
                    entityDisplayName: { label: nlsResources.colType_Caption, hidden: true }
                },
                placeHolder: this.mappingsGrid,
                columnHiding: true,
                columnResizing: true,
                columnReordering: true,
                selectionMode: 'single',
                rowSelection: true
            });
            this._grid.resize();

            this._grid.onDataChange = lang.hitch(this, function (evt) {
                var cell = this._grid._grid.cell(evt);
                if (cell.column.field === "targetProperty") {
                    if (evt.value === "") {
                        this._mappingCount--;
                    } else {
                        this._mappingCount++;
                        var target = this.importOptions.targetList.get(evt.value);
                        var selectedRow = this._grid._grid.cell(evt);
                        var key = selectedRow.row.data.sourceProperty;
                        var record = this._grid.store.get(key);
                        record.entityDisplayName = target.entityDisplayName;
                        record.targetProperty = target.name;
                        target = dojo.byId(cell.element.children[0].id);
                        this._grid.store.put(record);
                        target.setAttribute('value', evt.value);
                    }
                    this._updateCaptions();
                    this._setRequiredMappingsMsg();
                }
            });
            //dAspect.after(this._grid, "renderRow", function (row, args) {
            //    if (args) {
            //        row.className = "red";
            //    }
            //    return row;
            //});
            this._grid.setFilter({targetProperty: ""});
        },
        _setRequiredMappingsMsg: function () {
            this._requiredFields = "";
            if (this._grid.store) {
                dArray.forEach(this.importOptions.selectedMatchOptions, dojo.hitch(this, function (matchOption) {
                    if (matchOption.property !== "") {
                        var target = this.importOptions.importEntity;
                        target = target !== matchOption.entity ? dString.substitute("${0}.${1}", [matchOption.entity, matchOption.property]) : matchOption.property;
                        this._addRequiredField(target, matchOption.displayValue);
                    }
                }));
                if (this.importOptions.buildSecondaryAccountName) {
                    var result = this._getTargetField(this.accountPropertyName);
                    this._addRequiredField(this.accountPropertyName, result.displayName);

                    result = this._getTargetField(this.lastNamePropertyName);
                    this._addRequiredField(this.lastNamePropertyName, result.displayName);

                    result = this._getTargetField(this.firstNamePropertyName);
                    this._addRequiredField(this.firstNamePropertyName, result.displayName);
                }
            }
            this.lblRequiredFields.textContent = dString.substitute(nlsResources.txtRequired_Caption, [this._requiredFields]);
            importManagerUtility.setDomNodeVisible(this.divRequiredFields, (this._requiredFields !== ""));
        },
        _addRequiredField: function (target, displayValue) {
            var row = this._grid._grid.store.query({ targetProperty: target });
            if (!row[0]) {
                if (this._requiredFields === "") {
                    this._requiredFields = displayValue;
                } else if (this._requiredFields.indexOf(displayValue) < 0) {
                    this._requiredFields += dString.substitute(", ${0}", [displayValue]);
                }
            }
        },
        _getTargetField: function (targetName) {
            var result = this.importOptions.targetList.data.filter(dojo.hitch(this, function (target) {
                return target.name === targetName;
            }));
            return result[0];
        },
        _getMapping: function (property) {
            var mapping = null;
            dArray.some(this.importOptions.mappings, function (map) {
                if (map.target.name === property) {
                    mapping = map;
                    return true;
                }
                return false;
            });
            return mapping;
        },
        btnUnMapped_OnClick: function () {
            this._setEntityColumnState(true, "entityDisplayName");
            //TODO: Replace direct _grid references with public methods available in grid.js
            this._grid.setFilter({ targetProperty: "" });
        },
        _updateCaptions: function () {
            this.lblMatchedFields.textContent = dString.substitute(nlsResources.txtHeader_Caption, [this._mappingCount, this.importOptions.sourceColumns.length]);
            this.btnMapped.setAttribute("label", dString.substitute(nlsResources.btnMapped_Caption, [this._mappingCount]));
            this.btnUnMapped.setAttribute("label", dString.substitute(nlsResources.btnUnMapped_Caption, [this.importOptions.sourceColumns.length - this._mappingCount]));
            this.btnAll.setAttribute("label", dString.substitute(nlsResources.btnAll_Caption, [this.importOptions.sourceColumns.length]));
        },
        _filterTargetFields: function () {
            var targets = [];
            dArray.forEach(this.importOptions.targetList.data, dojo.hitch(this, function (target) {
                if (target.fieldType.indexOf(this.lookupTypeField) === -1 && target.visableToUsers) {
                    targets.push(target);
                }
            }));
            return targets;
        },
        _setEntityColumnState: function (hidden, column) {
            //TODO: Replace direct _grid references with public methods available in grid.js
            this._grid._grid.columns.entityDisplayName.hidden = hidden;
            this._grid._grid._columnHiderCheckboxes.entityDisplayName.checked = !hidden;
            if (hidden) {
                this._grid._grid.styleColumn(column, "display: none;");
            } else {
                this._grid._grid.styleColumn(column, "display: table-cell;");
            }
        },
        _resolveDefaultMappings: function () {

            dArray.forEach(this.importOptions.defaultMappings.filter(dojo.hitch(this, function (mapping) {
                return mapping.target.fieldType.indexOf(this.lookupTypeField) === -1;
            })), dojo.hitch(this, function (map) {
                //TODO: Replace direct _grid references with public methods available in grid.js
                var row = this._grid._grid.store.get(map.primarySources[0].name);
                if (row) {
                    var target = this.importOptions.targetList.get(map.target.name);
                    if (target && (target.fieldType.indexOf(this.lookupTypeField) === -1)) {
                        row.targetProperty = target.name;
                        row.dataType = target.dataType;
                        row.entityDisplayName = target.entityDisplayName;
                    }
                }
            }));
            this._grid.refresh();
        },
        _generateMappings: function () {
            if (this._grid && this._grid.store) {
                var maps = [];
                var accountNameMap = null;
                var lastNameSource = null;
                var firstNameSource = null;
                //TODO: Replace direct _grid references with public methods available in grid.js
                dArray.forEach(this._grid._grid.store.data, dojo.hitch(this, function (data) {
                    if (data.targetProperty !== "") {

                        var tempMap = {};
                        tempMap.target = this.getTargetProperty(this.importOptions.targetList.get(data.targetProperty), data.targetProperty);
                        if (data.targetProperty == this.accountPropertyName) {
                            accountNameMap = tempMap;
                        }
                        tempMap.primarySources = [];
                        var tempSource = { name: data.sourceProperty, value: data.sourceProperty, displayName: "" };
                        if (data.targetProperty == this.lastNamePropertyName) {
                            lastNameSource = tempSource;
                        }
                        if (data.targetProperty == this.firstNamePropertyName) {
                            firstNameSource = tempSource;
                        }
                        tempMap.primarySources.push(tempSource);
                        maps.push(tempMap);
                    }
                }));
                if (this.importOptions.buildSecondaryAccountName && accountNameMap !== null) {
                    accountNameMap.secondarySources = [];
                    accountNameMap.secondarySources.push(lastNameSource);
                    accountNameMap.secondarySources.push(firstNameSource);
                }
                this.importOptions.mappings = maps;
            }
        },
        _generateMatchMappings: function () {
            var valid = true;
            dArray.forEach(this.importOptions.selectedMatchOptions, dojo.hitch(this, function (matchOption) {
                if (matchOption.property !== "") {
                    var target = this.importOptions.importEntity;
                    target = target !== matchOption.entity ? dString.substitute("${0}.${1}", [matchOption.entity, matchOption.property]) : matchOption.property;
                    var row = this._grid.store.query({ targetProperty: target });
                    if (row[0]) {
                        var map = this._getMapping(matchOption.entity);
                        if (map) {
                            map.target.searchProperty = matchOption.property;
                        } else {
                            this.importOptions.mappings.push({
                                source: { name: row[0].sourceProperty, value: row[0].sourceProperty, displayName: "" },
                                target: this.getTargetProperty(this.importOptions.targetList.get(matchOption.entity), matchOption.entity, matchOption.property)
                            });
                        }
                    } else {
                        valid = false;
                    }
                } else {
                    //remove the mapping
                    dArray.some(this.importOptions.mappings, dojo.hitch(this, function (mapping, i) {
                        if (mapping.target.name === matchOption.entity) {
                            this.importOptions.mappings.splice(i, 1);
                            return true;
                        }
                        return false;
                    }));
                }
            }));
            return valid;
        }
    });
    return mapFields;
});