require({cache:{
'url:Sage/MainView/EntityMgr/EntityWizard/templates/Relationship.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"New Entity Wizard\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"position:absolute;width: 625px;height:625px;\">\r\n        <div data-dojo-type=\"dijit.form.Form\" style=\"height:600px !important;\" dojoattachpoint=\"Form\">\r\n            <div style=\"padding-bottom:30px;\">\r\n                <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblRelationship\">Primary Relationship</label>\r\n                <p>\r\n                    <label data-dojo-attach-point=\"lblSelectEntity\">Choose wheather this entity has a primary relationship to another entity</label>\r\n                </p>\r\n                <hr />\r\n            </div>\r\n\r\n            <table class=\"detailTableContainer formtable HundredPercentWidth\">\r\n                <tr data-dojo-attach-point=\"_TypeDropDownSection\">\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblExistingEntity\">\r\n                                Relate to an existing Entity\r\n                            </label>\r\n                        </div>\r\n                        <div style=\"padding-top:6px;\">\r\n                            <input type=\"checkbox\" data-dojo-attach-point=\"IsExtension\"\r\n                                   data-dojo-type=\"dijit/form/CheckBox\" />\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"_TypeDropDownSection\">\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblRelatedEntity\">\r\n                                Related Entity\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld dijitInline\" data-dojo-attach-point=\"typePkg\"></div>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"_TypeDropDownSection\">\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblRelationType\">\r\n                                Relation Type\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld dijitInline\" data-dojo-attach-point=\"typeRel\"></div>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n            <br />\r\n            <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\">\r\n                <span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>\r\n            </div>\r\n            <div align=\"right\" style=\"position:absolute;bottom:30px;width:90%;\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\">< Back</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">Next ></div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">Cancel</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
require({cache:{
'url:Sage/MainView/EntityMgr/EntityWizard/templates/Relationship.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"New Entity Wizard\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"position:absolute;width: 625px;height:625px;\">\r\n        <div data-dojo-type=\"dijit.form.Form\" style=\"height:600px !important;\" dojoattachpoint=\"Form\">\r\n            <div style=\"padding-bottom:30px;\">\r\n                <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblRelationship\">Primary Relationship</label>\r\n                <p>\r\n                    <label data-dojo-attach-point=\"lblSelectEntity\">Choose wheather this entity has a primary relationship to another entity</label>\r\n                </p>\r\n                <hr />\r\n            </div>\r\n\r\n            <table class=\"detailTableContainer formtable HundredPercentWidth\">\r\n                <tr data-dojo-attach-point=\"_TypeDropDownSection\">\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblExistingEntity\">\r\n                                Relate to an existing Entity\r\n                            </label>\r\n                        </div>\r\n                        <div style=\"padding-top:6px;\">\r\n                            <input type=\"checkbox\" data-dojo-attach-point=\"IsExtension\"\r\n                                   data-dojo-type=\"dijit/form/CheckBox\" />\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"_TypeDropDownSection\">\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblRelatedEntity\">\r\n                                Related Entity\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld dijitInline\" data-dojo-attach-point=\"typePkg\"></div>\r\n                    </td>\r\n                </tr>\r\n                <tr data-dojo-attach-point=\"_TypeDropDownSection\">\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblRelationType\">\r\n                                Relation Type\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld dijitInline\" data-dojo-attach-point=\"typeRel\"></div>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n            <br />\r\n            <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\">\r\n                <span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>\r\n            </div>\r\n            <div align=\"right\" style=\"position:absolute;bottom:30px;width:90%;\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\">< Back</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">Next ></div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">Cancel</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityWizard/Relationship", [
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/number',
    'dojo/string',
    'Sage/MainView/EntityMgr/EntityWizard/_EntityWizardDialogBase',
    'dojo/text!./templates/Relationship.html',
    //'dojo/i18n!./nls/SelectFile',
    'Sage/MainView/EntityMgr/EntityWizard/EntityWizardUtility',
    'Sage/Utility',
'Sage/UI/Controls/CheckBox',
    'Sage/Utility/File/Attachment',
    'dojo/topic',
    'Sage/UI/Controls/TextBox',
    'dojo/dom-construct',
    'Sage/UI/FilteringSelect',
    'dojo/store/Memory',
    'Sage/Data/SDataServiceRegistry',
    'Sage/UI/_DialogLoadingMixin',
    'dojo/_base/lang',
    'dijit/registry'
],
function (
    declare,
    connect,
    dNumber,
    dString,
    wizardDialogBase,
    template,
    //nlsResources,
    entityWizardUtility,
        utility,
crmCheckBox,
    attachmentUtility,
    topic,
    crmTextBox,
    domConstruct,
    crmDropDowns,
    Memory,
    SDataServiceRegistry,
    _DialogLoadingMixin,
    lang,
    registry
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var selectEntityType = declare('Sage.MainView.EntityMgr.EntityWizard.Relationship', [wizardDialogBase], {
        id: "dlgRelationship",
        widgetTemplate: widgetTemplate,
        //_nlsResources: nlsResources,
        _currentStep: entityWizardUtility.entityWizardStep.Relationship,
        _fileInputOnChange: null,
        typeDropDowns: false,
        typeDropDownsRel: false,
        checkBox: false,
        _pkgType: '',
        //_relType:'typeRelation',
        chkItem: 'chk',
        _dialog: null,
        entityInfo: false,

        constructor: function () {
            this.inherited(arguments);

        },
        startup: function () {
            this.inherited(arguments);
        },
        postCreate: function () {
            this._dialog.set("title", this._nlsResources.lblNewEntityWizard);
            this.lblRelationship.innerHTML = this._nlsResources.lblRelationship;
            this.lblSelectEntity.innerHTML = this._nlsResources.lblSelectEntity;
            this.lblExistingEntity.innerHTML = this._nlsResources.lblExistingEntity;
            this.lblRelatedEntity.innerHTML = this._nlsResources.lblRelatedEntity;
            this.lblRelationType.innerHTML = this._nlsResources.lblRelationType;
            this.btnBack.set("label", '< ' + this._nlsResources.lblBack);
            this.btnNext.set("label", this._nlsResources.lblNext + ' >');
            this.btnCancel.set("label",this._nlsResources.lblCancel);

            if (!this._dialog._standby) {
                lang.mixin(this._dialog, new _DialogLoadingMixin());
            }
            this._createTextboxControls();
            
        },
        _createTextboxControls: function () {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(SDataServiceRegistry.getSDataService('metadata'))
                        .setResourceKind('entities')
                        .setQueryArg('Count', '1000')
                        .setQueryArg('select', 'id,displayName,name')
                        .setQueryArg('orderBy', 'name')
                        .setQueryArg('format', 'json');
            var context = this;
            this.entityStore = new Memory();

            request.read({
                scope: this,
                success: function (data) {
                    var entities = data.$resources;
                    this.entityInfo = entities;
                    for (var i = 0; i <= entities.length - 1; i++) {
                        var entityDisplayName = entities[i].displayName ? entities[i].displayName : entities[i].name;
                        if (entities[i].name) {
                            context.entityStore.add({
                                id: entities[i].name,
                                name: entityDisplayName
                            });
                        }
                    }
                    context._dialog.hideLoading();
                },
                failure: function (error) {
                    if (error) {
                        console.error(error);
                    }
                    context._dialog.hideLoading();
                }
            });

            this.typeDropDowns = new crmDropDowns({
                id: this._pkgType,
                name: 'value',
                store: this.entityStore,
                searchAttr: 'name'
            }, this._pkgType
            );
            domConstruct.place(this.typeDropDowns.domNode, this.typePkg, 'only');
            this.typeDropDowns.set('disabled', true);

            //relation Type
            var data = new Memory({
                data: [
                  { id: "1:1", name:this._nlsResources.ExtensionEntity },
                  { id: "1:M", name:this._nlsResources.ChildEntity }
                ]
            });
            this.typeDropDownsRel = new crmDropDowns({
                //id: this._relType,
                name: 'value',
                store: data,
                searchAttr: 'name'
            }//, this._relType
            );
            domConstruct.place(this.typeDropDownsRel.domNode, this.typeRel, 'only');
            this.typeDropDownsRel.set('disabled', true);
            //Events
            this.IsExtension.on("change", function (isChecked) {
                if (isChecked) {
                    if (context.entityStore.data.length < 1) {
                        //context._dialog.showLoading();
                    }
                    context.typeDropDowns.set('disabled', false);
                    context.typeDropDownsRel.set('disabled', false);
                }
                else {
                    context.typeDropDowns.set('value', '');
                    context.typeDropDowns.set('disabled', true);

                    context.typeDropDownsRel.set('value', '');
                    context.typeDropDownsRel.set('disabled', true);
                }
            }, true);

        },
        isValid: function () {
            var myform = this.Form;
            var isValid = myform.validate();
            //if (isValid) {
            //    isValid = this._validateUniqueName();
            //}
            return isValid;
        },
        destroy: function () {
            this.inherited(arguments);
        },
        _btnNext_OnClick: function () {
            this._dialog.showLoading();
            var context = this;
           
            if (this.isValid()) {
                this.entityDetails.relatedEntity = this.typeDropDowns.value;
                this.entityDetails.relatedEntityDispName = this.typeDropDowns.displayedValue;
                this.entityDetails.relationType = this.typeDropDownsRel.value;
                this.entityDetails.relatedProperty = false;

                if (this.IsExtension.checked && this.typeDropDownsRel.value === '1:M') {
                    var propRequest = new Sage.SData.Client.SDataResourceCollectionRequest(SDataServiceRegistry.getSDataService('metadata'))
                        .setQueryArg('where', "isKey eq true")
                            .setResourceKind('entities(' + "'" + this.entityDetails.relatedEntity + "'" + ')/properties')
                            .setQueryArg('select', 'id,dataTypeId,displayName,propertyName')
                            .setQueryArg('count', 1)
                        .setQueryArg('format', 'json');
                        

                        propRequest.read({
                            async: false,
                            success: function (data) {
                                var props = data.$resources;
                                context.entityDetails.relatedPropertyId = props[0].id;

                                context._dialog.hideLoading();
                                context._checkCurrentStep();
                                context._dialog.hide();
                                topic.publish("/entityController/entityWizard/nextStep", context._currentStep);
                            },
                            failure: function (error) {
                                if (error) {
                                    console.error(error);
                                }
                                this._dialog.hideLoading();
                            }
                        });
                }
                else {
                    this._dialog.hideLoading();
                    this._checkCurrentStep();
                    this._dialog.hide();
                    topic.publish("/entityController/entityWizard/nextStep", this._currentStep);
                }
                    
            }else {
                this._dialog.hideLoading();
            }
        }
    });
    return selectEntityType;
});