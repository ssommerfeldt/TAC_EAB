require({cache:{
'url:Sage/MainView/EntityMgr/AddEditEntityDetail/templates/AddEditRelationshipsDialog.html':"[\r\n'<div>',\r\n\t'<div data-dojo-type=\"dijit.Dialog\"  class=\"OverrideDialogOverflowToHidden\" data-dojo-attach-point=\"_dialog\" style=\"overflow:auto;\">',\r\n        '<div data-dojo-type=\"dijit.form.Form\" data-dojo-attach-point=\"addEditRelationshipsForm\">',\r\n            '<div class=\"mainContentContent DialogMainForm\">',\r\n            '<div style=\"padding-left:40px;\">',\r\n                '<table class=\"\">',\r\n                    '<tr data-dojo-attach-point=\"\">',\r\n\t\t\t\t        '<td class=\"\">',\r\n\t\t\t\t\t\t    '<div style=\"padding-bottom:10px;\">',\r\n                                '<label for=\"joinType\" data-dojo-attach-point=\"parent\">Parent Entity and Join Field</label><br />',\r\n                                 '<div style=\"padding-bottom:4px;\" data-dojo-attach-point=\"typeParentTable\"></div>',\r\n                                 '<select required style=\"width:100%; height:240px;\" data-dojo-type=\"dijit/form/MultiSelect\" data-dojo-attach-point=\"parentProperties\"></select>',\r\n\t\t\t\t\t\t    '</div>',\r\n                            '<div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red;\">',\r\n              '</div>',\r\n\t\t\t\t        '</td>',\r\n                        '<td class=\"\">',\r\n\t\t\t\t\t\t    '<div style=\"padding:20px;\">',\r\n                                '<label data-dojo-attach-point=\"cardinality\">Cardinality:</label><br />',\r\n                                 '<div data-dojo-attach-point=\"dpCardinality\"></div>',\r\n\t\t\t\t\t\t    '</div>',\r\n\t\t\t\t        '</td>',\r\n                        '<td class=\"\">',\r\n\t\t\t\t\t\t    '<div style=\"padding-bottom:10px;\">',\r\n                                 '<label for=\"joinType\" data-dojo-attach-point=\"child\">Child Entity and Join Field</label><br />',\r\n                                 '<div style=\"padding-bottom:4px\" data-dojo-attach-point=\"typeChildTable\"></div>',\r\n                                 '<select required style=\"width:100%; height:240px;\" data-dojo-type=\"dijit/form/MultiSelect\" data-dojo-attach-point=\"childProperties\"></select>',\r\n\t\t\t\t\t\t    '</div>',\r\n                            '<div data-dojo-attach-point=\"divValidationMessageChild\" style=\"color:red;\">',\r\n              '</div>',\r\n\t\t\t\t        '</td>',\r\n\t\t\t        '</tr>',\r\n                '</table>',\r\n            '</div>',\r\n    '<div>',\r\n                '<div class=\"lookupButtonWrapper\">',                    \r\n                    '<span data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"cmdSave\" data-dojo-attach-event=\"onClick:_cmdSave_OnClick\"></span>',\r\n                    '<span data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"cmdCancel\" data-dojo-attach-event=\"onClick:_cmdCancel_OnClick\"></span>',\r\n                '</div>',\r\n            '</div>',\r\n            '</div>',\r\n            \r\n        '</div>',\r\n\t'</div>',\r\n'</div>'\r\n ]"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/AddEditEntityDetail/AddEditRelationshipsDialog", [
    'dijit/_Widget',
    'Sage/_Templated',
    'Sage/Utility',
    'dojo/string',
    'dojo/_base/declare',
    'dojo/text!./templates/AddEditRelationshipsDialog.html',
    'dojo/i18n!./nls/AddEditDialog',
    'dojo/dom-style',
    'Sage/UI/Dialogs',
    'Sage/UI/FilteringSelect',
    'dojo/store/Memory',
	'Sage/Data/SDataServiceRegistry',
    'dijit/registry',
    'dojo/_base/lang',
    'dojo/request',
    'dojo/query',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'Sage/UI/_DialogLoadingMixin',
    'dojo/dom',
    "dijit/form/RadioButton",
    "dojo/_base/window",
    'dojo/dom-construct'
],
function (
    _Widget,
    _Templated,
    utility,
    dString,
    declare,
    template,
    nlsResources,
    dojoStyle,
    crmDialogue,
    crmDropDowns,
    memory,
	SDataServiceRegistry,
    registry,
    lang,
    request,
    query,
    _DialogHelpIconMixin,
    _DialogLoadingMixin,
    dom,
    RadioButton,
    win,
    domConstruct
) {
    var widget = declare('Sage.MainView.EntityMgr.AddEditEntityFilter.AddEditRelationshipsDialog', [_Widget, _Templated], {
        _dialog: null,

        widgetTemplate: new Simplate(eval(template)),
        _nlsResources: nlsResources,
        widgetsInTemplate: true,
        detailUtility: false,

        typeDropDowns: false,
        dpVisibility: false,
        dpCascadeType: false,
        parentTable: false,
        childTable: false,
        dptypeParentTableField: false,
        dptypeChildTableField: false,
        typeDataLoad: false,

        entities: false,
        properties: false,
        _title: false,
        entityName: false,

        constructor: function (entity, title, dUtility, data) {
            this.detailUtility = dUtility;
            this._title = title;
            this.entityName = entity;

            this.service = Sage.Data.SDataServiceRegistry.getSDataService('metadata');
            this.entities = new memory();
            this.childEntities = new memory();
            this.parentProperties = new memory();
            this.childProperties = new memory();
        },

        destroy: function (context) {
            context.destroy();
            dijit.popup.close();
        },

        postCreate: function () {
            //labels
            this.parent.innerHTML = this._nlsResources.parent;
            this.child.innerHTML = this._nlsResources.child;
            this.cardinality.innerHTML = this._nlsResources.cardinality;
            //this.cascade.innerHTML = this._nlsResources.cascade;

            this._grabEntities();
            //create main controllers
            this._createParentTableontroller();
            this._createChildTableontroller();
            this._createCardinalityFieldController();
            //this._createCascadeFieldontroller();

            //create buttons
            this.cmdSave.containerNode.innerHTML = this._nlsResources.lblSaveButton;
            this.cmdCancel.containerNode.innerHTML = this._nlsResources.lblCancelButton;

            // help icon
            lang.mixin(this._dialog, new _DialogHelpIconMixin({ titleBar: this._dialog.titleBar }));
            this._dialog.createHelpIconByTopic('Adding_Editing_Relationships');

            //loading
            lang.mixin(this._dialog, new _DialogLoadingMixin());
            dojo.connect(this._dialog, "onCancel", lang.partial(this._cmdCancel_OnClick, this));

            this.startup();

            this._dialog.showLoading();
            query('.dijitDialog').on('click', function (e) {
                var target = e.target || e.srcElement;
                if (target.type !== 'button') {
                    dijit.popup.close();
                }
            });
            this.divValidationMessage.innerHTML = ' ';
        },

        show: function () {
            this._dialog.titleNode.innerHTML = this._title;
            this._dialog.show();
            this.inherited(arguments);
        },

        _grabEntities: function () {

            var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.service);
            request.setResourceKind('entities').setQueryArg('select', '$descriptor').setQueryArg('orderby', '$descriptor');
            request.setQueryArg('count', 1000);

            var context = this;
            var key = request.read({
                success: function (data) {
                    var entityFields = data.$resources;
                    var parentKeyIndex, childKeyIndex;

                    for (var i = 0; i <= entityFields.length - 1; i++) {
                        if (context.entityName === entityFields[i].$key)
                            parentKeyIndex = i;
                        context.entities.add({ id: entityFields[i].$key, name: entityFields[i].$descriptor });
                        context.childEntities.add({ id: entityFields[i].$key, name: entityFields[i].$descriptor });
                    }

                    context.parentTable.set("item", context.entities.data[parentKeyIndex]);
                    context.childEntities.remove(entityFields[parentKeyIndex].$key);
                    context.childTable.set("item", context.childEntities.data[childKeyIndex]);
                },
                failure: function (error) {
                    if (error) {
                        console.error(error);
                    }
                }
            });
        },
        _createParentTableontroller: function () {

            this.parentTable = new crmDropDowns({
                id: this._idParentTable,
                style: { width: "220px" },
                name: '',
                value: "",
                store: this.entities,
                searchAttr: 'name',
                disabled: true
            }, this._idParentTable
            );

            domConstruct.place(this.parentTable.domNode, this.typeParentTable, 'only');
            dojo.connect(this.parentTable, 'onChange', lang.partial(this.setParentFieldsDropdown, this, 'parent'));
        },
        _createChildTableontroller: function () {

            this.childTable = new crmDropDowns({
                id: this._idChildTable,
                style: { width: "220px" },
                name: '',
                value: "",
                store: this.childEntities,
                searchAttr: 'name'
            }, this._idChildTable
            );

            domConstruct.place(this.childTable.domNode, this.typeChildTable, 'only');
            dojo.connect(this.childTable, 'onChange', lang.partial(this.setParentFieldsDropdown, this, 'child'));
        },
        setParentFieldsDropdown: function (context, parent) {
            var currentContext = context;
            var sel, entity;
            if (parent === 'parent') {
                sel = currentContext.parentProperties;
                entity = context.parentTable.value;
            }
            else {
                sel = currentContext.childProperties;
                entity = context.childTable.value;
            }
            if (sel.domNode.options.length > 0)
                sel.domNode.options.length = 0;

            var propertiesTag = dString.substitute("entities('${0}')/properties", [entity]);
            var request = new Sage.SData.Client.SDataResourcePropertyRequest(context.service)
               .setResourceKind(propertiesTag)
               .setQueryArg('Select', 'id,$key,propertyName,displayName,dataTypeId')
               .setQueryArg('where', "dataTypeId eq '30053f5a-8d40-4db1-b185-1e4128eb26cc' ")
               .setQueryArg('format', 'json').setQueryArg('Count', '200');

            request.readFeed({
                success: function (data) {
                    var properties = data.$resources;
                    var standardIds = [], otherProps = [], displayName, c, i;
                    standardIds.length = 0; otherProps.length = 0;
                    var parentKey, childKey;

                    for (i = 0; i < properties.length; i++) {
                        if (properties[i].displayName)
                            displayName = properties[i].displayName;
                        else
                            displayName = properties[i].propertyName;
                        c = win.doc.createElement('option');
                        c.innerHTML = displayName;
                        c.value = properties[i].id;
                        sel.domNode.appendChild(c);
                    }
                    context._dialog.hideLoading();
                },
                error: function (error) {
                    if (error) {
                        console.error(error);
                    }
                }
            });
        },

        _createCardinalityFieldController: function () {
            var value = '1:M';
            var data = new memory({
                data: [
                  { id: "1:M", name: "1:M" },
                  { id: "M:1", name: "M:1" }
                ]
            });

            this.dptypeParentTableField = new crmDropDowns({
                id: this._idParentTableField,
                style: { width: "220px" },
                name: '',
                value: value,
                store: data,
                searchAttr: 'name'
            }, this._idParentTableField
            );

            domConstruct.place(this.dptypeParentTableField.domNode, this.dpCardinality, 'only');

        },
        startup: function () {
            this.inherited(arguments);
        },
        isValid: function () {
            var myform = this.addEditRelationshipsForm;
            var isValid = myform.validate();
            if (isValid) {
                if (this.parentProperties.get('value').length === 0) {
                    this.divValidationMessage.innerHTML = this._nlsResources.SelectField;
                    this.divValidationMessageChild.innerHTML = ' ';
                    return false;
                }
                if (this.parentProperties.get('value').length > 1) {
                    this.divValidationMessage.innerHTML = this._nlsResources.SelectOneField;
                    this.divValidationMessageChild.innerHTML = ' ';
                    return false;
                }
                this.divValidationMessage.innerHTML = ' ';

                if (this.childProperties.get('value').length === 0) {
                    this.divValidationMessageChild.innerHTML = this._nlsResources.SelectField;
                    return false;
                }
                if (this.childProperties.get('value').length > 1) {
                    this.divValidationMessageChild.innerHTML = this._nlsResources.SelectOneField;
                    return false;
                }
                this.divValidationMessageChild.innerHTML = ' ';
            }

            return isValid;
        },
        checkDuplicateRelation: function () {
            var valRequest = new Sage.SData.Client.SDataResourceCollectionRequest(SDataServiceRegistry.getSDataService('metadata'));
            valRequest.setResourceKind(dString.substitute('relationships'));
            valRequest.setQueryArg('count', 30);
            valRequest.setQueryArg('format', 'json');
            valRequest.setQueryArg('select', ['parentEntity', 'childEntity', 'columns/*']);
            valRequest.setQueryArg('where', dString.substitute("parentEntity.name eq '${0}'", [this.parentTable.value]));
            var context = this;
            var alreadyExists = false;
            valRequest.read({
                async: false,
                success: function (data) {
                    var relations = data.$resources;
                    var parentKeyIndex, childKeyIndex;

                    for (var i = 0; i <= relations.length - 1; i++) {
                        if (relations[i].childEntity.$key === context.childTable.value) {
                            var cols = relations[i].columns.$resources;
                            if (cols[0].parentPropertyId === context.parentProperties.get('value')[0] && cols[0].childPropertyId === context.childProperties.get('value')[0]) {
                                alreadyExists = true;
                                break;
                            }
                        }
                    }
                },
                failure: function (data) {
                    context._dialog.hideLoading();
                    alreadyExists = false;
                }
            });
            return alreadyExists;
        },
        _cmdSave_OnClick: function () {
            var context = this;
            if (!this.isValid()) {
                return;
            }
            this._dialog.showLoading();

            var request = new Sage.SData.Client.SDataSingleResourceRequest(SDataServiceRegistry.getSDataService('metadata'));

            var relation = {}, includeChildProp = false;
            relation.cardinality = this.dptypeParentTableField.value;
            relation.cascadeOption = "SaveUpdate";
            relation.parentEntity = { "$key": this.parentTable.value };
            relation.childEntity = { "$key": this.childTable.value };

            if (this.dptypeParentTableField.value === "1:M") {
                includeChildProp = true;
                relation.parentProperty = { "propertyName": utility.pluralize(this.childTable.value), "displayName": utility.pluralize(this.childTable.displayedValue), "isIncluded": true };
            } else {
                relation.parentProperty = { "propertyName": this.childTable.value, "displayName": this.childTable.displayedValue, "isIncluded": true };
            }
            relation.childProperty = { "propertyName": this.parentTable.value, "displayName": this.parentTable.displayedValue, "isIncluded": includeChildProp };
            relation.columns = {
                "$resources": [{
                    "parentPropertyId": this.parentProperties.get('value')[0],
                    "childPropertyId": this.childProperties.get('value')[0]
                }]
            };

            var isDuplicate = this.checkDuplicateRelation();
            if (isDuplicate) {
                this.divValidationMessage.innerHTML = this._nlsResources.existingRelaton;
                this._dialog.hideLoading();
                return;
            }

            request.setResourceKind(dString.substitute('relationships'));
            request.create(relation, {
                success: function (data) {
                    this._dialog.hideLoading();
                    this._dialog.hide();
                },
                failure: function (data) {
                    console.error('error while creating relationship');
                    this._dialog.hideLoading();
                    this._dialog.hide();
                },
                scope: this
            });

        },
        _onSaveSuccess: function (data) {
            SDataServiceRegistry._removeFromLocalStorage(this.entityName);
            this._dialog.hideLoading();
            this._dialog.hide();
        },
        _cmdCancel_OnClick: function (context) {
            if (this._dialog) {
                this._dialog.hideLoading();
                this._dialog.hide();
            }
            else if (context._dialog) // context is passed when the 'x' button is pressed
            {
                context._dialog.hideLoading();
                context._dialog.hide();
            }
        }

    });

    return widget;
});