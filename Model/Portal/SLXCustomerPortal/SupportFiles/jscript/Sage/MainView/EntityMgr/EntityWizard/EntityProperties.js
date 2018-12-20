require({cache:{
'url:Sage/MainView/EntityMgr/EntityWizard/templates/EntityProperties.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"New Entity Wizard\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"position:absolute;width: 625px;height:625px;\">\r\n        <div style=\"padding-bottom:30px;\">\r\n            <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblEnterProperties\">Enter Fields</label>\r\n            <p><label data-dojo-attach-point=\"lblAddNewProperty\">Click the add(+) button to add new fields to the entity</label></p>\r\n            <hr />\r\n        </div>\r\n        <div data-dojo-type=\"dijit.form.Form\"  style=\"height:400px !important;\" class=\"mainContentContent DialogMainForm\">\r\n            <div style=\"width:100%;\" class=\"fld dijitInline\" data-dojo-attach-point=\"placeGrid\"></div>\r\n        </div>\r\n        <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\">\r\n            <span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>\r\n        </div>\r\n        <div class=\"lookupButtonWrapper\">\r\n            <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\">< Back</div>\r\n            <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">Next ></div>\r\n            <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">Cancel</div>\r\n        </div>\r\n    </div>\r\n</div>"}});
require({cache:{
'url:Sage/MainView/EntityMgr/EntityWizard/templates/EntityProperties.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"New Entity Wizard\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"position:absolute;width: 625px;height:625px;\">\r\n        <div style=\"padding-bottom:30px;\">\r\n            <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblEnterProperties\">Enter Fields</label>\r\n            <p><label data-dojo-attach-point=\"lblAddNewProperty\">Click the add(+) button to add new fields to the entity</label></p>\r\n            <hr />\r\n        </div>\r\n        <div data-dojo-type=\"dijit.form.Form\"  style=\"height:400px !important;\" class=\"mainContentContent DialogMainForm\">\r\n            <div style=\"width:100%;\" class=\"fld dijitInline\" data-dojo-attach-point=\"placeGrid\"></div>\r\n        </div>\r\n        <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\">\r\n            <span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>\r\n        </div>\r\n        <div class=\"lookupButtonWrapper\">\r\n            <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\">< Back</div>\r\n            <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">Next ></div>\r\n            <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">Cancel</div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityWizard/EntityProperties", [
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/number',
    'dojo/string',
    'Sage/MainView/EntityMgr/EntityWizard/_EntityWizardDialogBase',
    'dojo/text!./templates/EntityProperties.html',
    'Sage/MainView/EntityMgr/EntityWizard/EntityWizardUtility',
    'Sage/Utility',
    'Sage/Utility/File/Attachment',
    'Sage/UI/GridView',
    'dojo/dom-construct',
    'dojo/_base/lang',
    'dojo/_base/connect',
        'dojo/store/Memory',
    "dojo/store/Observable",
    'Sage/MainView/EntityMgr/AddEditEntityDetail/AddEditPropertiesDialog',
    'Sage/MainView/EntityMgr/EntityDetailUtility',
    'dojo/topic',
    'Sage/UI/Controls/FieldStore',
    "dojo/_base/array",
    'Sage/UI/Controls/GridParts/Columns/CheckBox',
    'Sage/UI/Dialogs'

],
function (
    declare,
    connect,
    dNumber,
    dString,
    wizardDialogBase,
    template,
    entityWizardUtility,
    utility,
    attachmentUtility,
    GridView,
    domConstruct,
    lang,
    dojoConnect,
    Memory,
    Observable,
    addEditPropertiesDialog,
    entityDetailUtility,
    topic,
    FieldStore,
    array,
    CheckBox,
    dialogs
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var entityProperties = declare('Sage.MainView.EntityMgr.EntityWizard.EntityProperties', [wizardDialogBase], {
        id: "dlgEntityProperties",
        widgetTemplate: widgetTemplate,
        //_nlsResources: nlsResources,
        _currentStep: entityWizardUtility.entityWizardStep.EntityProperties,
        _fileInputOnChange: null,
        fStore: null,
        propGrid: null,
        sysProps: [],
        dataStore: Observable(new Memory({ idProperty: "propertyName", data: [] })),
        constructor: function () {
            this.inherited(arguments);
            this.fStore = new FieldStore();
        },
        startup: function () { 
            this.inherited(arguments);
            this._createPropsGrid();
        },
        postCreate: function () {
            this._dialog.set("title", this._nlsResources.lblNewEntityWizard);
            this.lblEnterProperties.innerHTML = this._nlsResources.lblEnterProperties;
            this.lblAddNewProperty.innerHTML = this._nlsResources.lblAddNewProperty;
            this.btnBack.set("label", '< ' + this._nlsResources.lblBack);
            this.btnNext.set("label", this._nlsResources.lblNext + ' >');
            this.btnCancel.set("label",this._nlsResources.lblCancel);
        },
        isValid: function () { 
            return true;
        },
        destroy: function () {
            this.inherited(arguments);
        },
        populateDefaultProps: function () {
            var count = this.dataStore.data.length;
            for (var i = 0; i < count; i++) {
                this.dataStore.remove(this.dataStore.data[0].propertyName);
            }

            var entityName = this.entityDetails.entityName;
            var relprop = this.entityDetails.relatedProperty;
            var relEntity = this.entityDetails.relatedEntity;
            var property;
            this.sysProps = ["CreateUser", "CreateDate", "ModifyUser", "ModifyDate", "SeccodeId" ];

            // Set primary key property
            if (this.entityDetails.relationType === "1:1") {//For 1:1, id should be parents id
                property = { "propertyName": relEntity + 'Id', "displayName": relEntity + ' Id', "isKey": true, "isNullable": false, "columnName": relEntity.toUpperCase() + 'ID', "DataType": "Standard Id", "length": 12, "dataTypeId": '30053f5a-8d40-4db1-b185-1e4128eb26cc' };
                this.dataStore.put(property);
                this.sysProps.push(relEntity + 'Id');
            } else {
                property = { "propertyName": entityName + 'Id', "displayName": entityName + ' Id',"isKey": true, "isNullable": false, "columnName": entityName.toUpperCase() + 'ID', "DataType": "Standard Id", "length": 12, "dataTypeId": '30053f5a-8d40-4db1-b185-1e4128eb26cc'};
                this.dataStore.put(property);
                this.sysProps.push(entityName + 'Id');
            }

            //Related entity key
            if (this.entityDetails.relationType === "1:M") {
                relEntity = this.entityDetails.relatedEntity;
                property = { "propertyName": relEntity + 'Id', "displayName": relEntity + ' Id', "isKey": false, "isNullable": false, "columnName": relEntity.toUpperCase() + 'ID', "DataType": "Standard Id", "length": 12, "dataTypeId": '30053f5a-8d40-4db1-b185-1e4128eb26cc' };
                this.dataStore.put(property);
                this.sysProps.push(entityName + relEntity + 'Id');
            }

            //Other default properties
            this.dataStore.put({ "propertyName": "CreateUser", "displayName": this._nlsResources.CreateUser, "isKey": false, "isNullable": true, "columnName": "CREATEUSER", "DataType": "Standard Id", "length": 12, "dataTypeId": '30053f5a-8d40-4db1-b185-1e4128eb26cc' });
            this.dataStore.put({ "propertyName": "CreateDate", "displayName": this._nlsResources.CreateDate, "isKey": false, "isNullable": true, "columnName": "CREATEDATE", "DataType": "Date Time", "length": 0, "dataTypeId": '1f08f2eb-87c8-443b-a7c2-a51f590923f5' });
            this.dataStore.put({ "propertyName": "ModifyUser", "displayName": this._nlsResources.ModifyUser, "isKey": false, "isNullable": true, "columnName": "MODIFYUSER", "DataType": "Standard Id", "length": 12, "dataTypeId": '30053f5a-8d40-4db1-b185-1e4128eb26cc' });
            this.dataStore.put({ "propertyName": "ModifyDate", "displayName": this._nlsResources.ModifyDate, "isKey": false, "isNullable": true, "columnName": "MODIFYDATE", "DataType": "Date Time", "length": 0, "dataTypeId": '1f08f2eb-87c8-443b-a7c2-a51f590923f5' });
            this.dataStore.put({ "propertyName": "SeccodeId", "displayName": "Seccode Id", "isKey": false, "isNullable": false, "columnName": "SECCODEID", "DataType": "Standard Id", "length": 12, "dataTypeId": '30053f5a-8d40-4db1-b185-1e4128eb26cc' });

        },
        _createPropsGrid: function () {
            var self = this;
            this.populateDefaultProps();

            var columns = [
                {
                    field: 'displayName',
                    label: this._nlsResources.lblDisplayName
                },
                {
                    field: 'propertyName',
                    label: this._nlsResources.lblPropertyName
                },
               {
                   field: 'dataTypeId',
                   label: this._nlsResources.lblDataType,
                   formatter: function (data) {
                       var typeIndex = self.fStore.typeStore.index[data];
                       if (typeIndex >= 0) {
                           var obj = self.fStore.typeStore.data[typeIndex];
                           return obj.name;
                       }
                       else {
                           return "";
                       }
                   }
               },
               {
                   field: 'length',
                   className: 'alignright',
                   label: this._nlsResources.lblLength
               },
               {
                   field: 'isNullable',
                   label: this._nlsResources.lblNullable,
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
                   }
               }
            ];
            
            var grid = new GridView({
                tools: ['add', 'edit', 'delete'],
                store: this.dataStore,
                columns: columns,
                placeHolder: this.placeGrid,
                addItem: lang.partial(this.addItem, this),        // set the add item function
                removeItem: lang.partial(this.removeItem, this),  // set the remove item function
                editItem: lang.partial(this.editItem, this),//,      // set the edit item function
                columnHiding: true,
                columnResizing: true,
                columnReordering: true,
                selectionMode: 'single',
                rowSelection: true,
                classNames: 'dgrid-autoheight',
                minRowsPerPage: this.dataStore.data.length,
                maxRowsPerPage: this.dataStore.data.length
            });
            this.propGrid = grid;
            grid.createGridView();
        },
        addItem: function (context) {
            
            if (context.entityDetails.detailUtility === undefined) {
                context._dialog.showLoading();

                setTimeout(function () {
                    //populate detail Utility
                    context.entityDetails.detailUtility = new entityDetailUtility();
                    var async = false;
                    context.entityDetails.detailUtility.getSchemasInformationFromSData(async);
                    context.entityDetails.detailUtility.getSpecialValues();

                    context.showAddEditPropsDialog(context);
                }, 1000);

            } else {
                context.showAddEditPropsDialog(context);
            }
            
        },
        showAddEditPropsDialog: function (context) {
            var propsDialog = new addEditPropertiesDialog('', context._nlsResources.addFieldDialogTitle, context.entityDetails.detailUtility, false, null, true, context.dataStore);
            context._dialog.hideLoading();
            propsDialog.show();
            dojoConnect.connect(propsDialog._dialog, "hide", lang.partial(context.onReset, context));
        },
        editItem: function (context) {
            var selectedGridRow = context.propGrid.grid.getSelectedRowData();
            if (selectedGridRow.length === 0) {
                dialogs.showInfo(context._nlsResources.NoRecordsSelected);
                return;
            }
            if (array.indexOf(context.sysProps, selectedGridRow[0].propertyName) !== -1) {
                dialogs.showInfo(context._nlsResources.noEditSysProps);
                return;
            }
            
            if (selectedGridRow[0]) {
                var box = new addEditPropertiesDialog('', context._nlsResources.editFieldDialogTitle, context.entityDetails.detailUtility, false, selectedGridRow[0], true, context.dataStore);
                box.show();
                dojoConnect.connect(box._dialog, "hide", lang.partial(context.onReset, context));
            }
        },
        onReset: function (context) {
            context.propGrid.grid.refresh();
        },
        removeItem: function (context) {
            var selectedGridRow = context.propGrid.grid.getSelectedRowData();
            if (selectedGridRow.length === 0) {
                dialogs.showInfo(context._nlsResources.NoRecordsSelected);
                return;
            }
            if (array.indexOf(context.sysProps, selectedGridRow[0].propertyName) !== -1) {
                dialogs.showInfo(context._nlsResources.noDeleteSysProps);
                return;
            }
            var key = selectedGridRow[0].propertyName;
            if (key) {
                context.dataStore.remove(key);
                context.propGrid.grid.refresh();
            }
        },
        _btnNext_OnClick: function () {
            this.entityDetails.data = this.dataStore.data;

            if (this.isValid()) {
                this._checkCurrentStep();
                this._dialog.hide();
                topic.publish("/entityController/entityWizard/nextStep", this._currentStep);
            }
        }
    });
    return entityProperties;
});