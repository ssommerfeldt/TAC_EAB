require({cache:{
'url:Sage/MainView/EntityMgr/EntityWizard/templates/AddEditEntity.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"New Entity Wizard\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"position:absolute;width: 625px;height:625px;\">\r\n        <div data-dojo-type=\"dijit.form.Form\" style=\"height:600px !important;\" dojoattachpoint=\"Form\">\r\n            <div style=\"\">\r\n                <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblSure\">Are you sure ?</label>\r\n                <p>\r\n                    <label data-dojo-attach-point=\"lblThisStepCreateEntity\">Completing this step will create the entities and necessary schema</label>\r\n                </p>\r\n                <hr />\r\n            </div>\r\n\r\n            <table style=\"padding-left:20px; padding-top:20px;\">\r\n                <tr>\r\n                    <td style=\"text-align: right;\">\r\n                        <label style=\"font-weight:bold; text-align: right;\" data-dojo-attach-point=\"lblEntity\">Entity : </label>\r\n                    </td>\r\n                    <td style=\"padding-left: 10px;\">\r\n                        <label data-dojo-attach-point=\"createEntity\"></label>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"vertical-align:top; padding-top:15px;text-align: right;\">\r\n                        <span><label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblProperties\">Properties : </label></span>\r\n                    </td>\r\n                    <td style=\"padding-left: 10px;\">\r\n                        <ul class=\"properties\" style=\"padding-left:0;\"></ul>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"text-align: right;\">\r\n                        <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblRelatedEntity\"></label>\r\n                    </td>\r\n                    <td style=\"padding-left: 10px;\">\r\n                        <label data-dojo-attach-point=\"relatedEntity\"></label>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"text-align: right;\">\r\n                        <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblRelationType\"></label>\r\n                    </td>\r\n                    <td style=\"padding-left: 10px;\">\r\n                        <label data-dojo-attach-point=\"relationType\"></label>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n\r\n            <div align=\"right\" style=\"position:absolute;bottom:30px;width:90%;\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\">< Back</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">Next ></div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">Cancel</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
require({cache:{
'url:Sage/MainView/EntityMgr/EntityWizard/templates/AddEditEntity.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" title=\"New Entity Wizard\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\" style=\"position:absolute;width: 625px;height:625px;\">\r\n        <div data-dojo-type=\"dijit.form.Form\" style=\"height:600px !important;\" dojoattachpoint=\"Form\">\r\n            <div style=\"\">\r\n                <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblSure\">Are you sure ?</label>\r\n                <p>\r\n                    <label data-dojo-attach-point=\"lblThisStepCreateEntity\">Completing this step will create the entities and necessary schema</label>\r\n                </p>\r\n                <hr />\r\n            </div>\r\n\r\n            <table style=\"padding-left:20px; padding-top:20px;\">\r\n                <tr>\r\n                    <td style=\"text-align: right;\">\r\n                        <label style=\"font-weight:bold; text-align: right;\" data-dojo-attach-point=\"lblEntity\">Entity : </label>\r\n                    </td>\r\n                    <td style=\"padding-left: 10px;\">\r\n                        <label data-dojo-attach-point=\"createEntity\"></label>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"vertical-align:top; padding-top:15px;text-align: right;\">\r\n                        <span><label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblProperties\">Properties : </label></span>\r\n                    </td>\r\n                    <td style=\"padding-left: 10px;\">\r\n                        <ul class=\"properties\" style=\"padding-left:0;\"></ul>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"text-align: right;\">\r\n                        <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblRelatedEntity\"></label>\r\n                    </td>\r\n                    <td style=\"padding-left: 10px;\">\r\n                        <label data-dojo-attach-point=\"relatedEntity\"></label>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"text-align: right;\">\r\n                        <label style=\"font-weight:bold;\" data-dojo-attach-point=\"lblRelationType\"></label>\r\n                    </td>\r\n                    <td style=\"padding-left: 10px;\">\r\n                        <label data-dojo-attach-point=\"relationType\"></label>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n\r\n            <div align=\"right\" style=\"position:absolute;bottom:30px;width:90%;\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnBack\" data-dojo-attach-event=\"onClick:_btnBack_OnClick\">< Back</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnNext_OnClick\">Next ></div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">Cancel</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityWizard/AddEditEntity", [
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/number',
    'dojo/string',
    'Sage/MainView/EntityMgr/EntityWizard/_EntityWizardDialogBase',
    'dojo/text!./templates/AddEditEntity.html',
    'Sage/MainView/EntityMgr/EntityWizard/EntityWizardUtility',
    'Sage/Utility',
    'Sage/Utility/File/Attachment',
    'Sage/Data/SDataServiceRegistry',
    'Sage/UI/_DialogLoadingMixin',
    'dojo/_base/lang',
    'dijit/registry',
    'dojo/topic'
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
    attachmentUtility,
    SDataServiceRegistry,
    _DialogLoadingMixin,
    lang,
    registry,
    topic
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var addEditEntity = declare('Sage.MainView.EntityMgr.EntityWizard.AddEditEntity', [wizardDialogBase], {
        _dialog: null,
        id: "dlgAddEditEntity",
        widgetTemplate: widgetTemplate,
        //_nlsResources: nlsResources,
        _currentStep: entityWizardUtility.entityWizardStep.AddEditEntity,
        _fileInputOnChange: null,
        constructor: function () {
            this.inherited(arguments);
        },
        startup: function () {
            this.createEntity.innerHTML = ' ' + this.entityDetails.entityName;

            if (this.entityDetails.relatedEntity) {
                this.lblRelatedEntity.innerHTML = this._nlsResources.lblRelatedEntity;
                this.lblRelationType.innerHTML = this._nlsResources.lblRelationType;

                this.relatedEntity.innerHTML = ' ' + this.entityDetails.relatedEntity;
                this.relationType.innerHTML = ' ' + this.entityDetails.relationType;
            }
            this.inherited(arguments);
        },
        postCreate: function () {
            this._dialog.set("title", this._nlsResources.lblNewEntityWizard);
            this.lblSure.innerHTML = this._nlsResources.lblSure;
            this.lblThisStepCreateEntity.innerHTML = this._nlsResources.lblThisStepCreateEntity;
            this.lblEntity.innerHTML = this._nlsResources.lblEntity;
            this.lblProperties.innerHTML = this._nlsResources.lblProperties;
            this.btnBack.set("label", '< ' + this._nlsResources.lblBack);
            this.btnNext.set("label", this._nlsResources.lblNext + ' >'); 
            this.btnCancel.set("label", this._nlsResources.lblCancel);

            lang.mixin(this._dialog, new _DialogLoadingMixin());

            var properties = $('.properties');
            for (var i = 0; i < this.entityDetails.data.length; i++) {
                $('<li>' + this.entityDetails.data[i].displayName + '</li>').appendTo(properties);
            }
        },
        isValid: function () { 
            var myform = this.Form;
            return myform.validate();
            //return true;
        },
        _btnBack_OnClick: function () {
            var dialog = dijit.byId("dlgAddEditEntity");
            this._dialog.hide();
            dialog.destroyRecursive();
            topic.publish("/entityController/entityWizard/previousStep", this._currentStep);
        },
        createOwnerRelation: function (childProps, context) {
            var relation = {};
            relation.cardinality = "M:1";
            relation.cascadeOption = "SaveUpdate"; //default in AA
            relation.parentEntity = { "$key": this.entityDetails.entityName };
            relation.childEntity = { "$key": 'Owner' };

            relation.parentProperty = { "propertyName": 'Owner', "displayName": 'Owner', "isIncluded": true };
            relation.childProperty = { "propertyName": this.entityDetails.entityName, "displayName": this.entityDetails.entityDisplayName, "isIncluded": false };
            
            //Get foreign-key id(secCode id) thats got created now
            var seccodeId;
            for (var i = 0; i < childProps.length; i++) {
                if (childProps[i].propertyName === 'SeccodeId') {
                    seccodeId = childProps[i].id;
                    break;
                }
            }

            relation.columns = {
                "$resources": [{
                    "parentPropertyId": seccodeId,
                    "childPropertyId": this.entityDetails.ownerId
                }]
            };

            var request = new Sage.SData.Client.SDataSingleResourceRequest(SDataServiceRegistry.getSDataService('metadata')).setResourceKind(dString.substitute('relationships'));
            request.create(relation, {
                async: false,
                success: function (data) {
                },
                failure: function (data) {
                    context.entityDetails.ownerStatus = context._nlsResources.lblErrorRelation + ' Owner !';
                }
            });
        },
        _btnNext_OnClick: function () {
            var context = this;
            var entityNamePurlal = utility.pluralize(this.entityDetails.entityName);
            var dispNamePurlal = utility.pluralize(this.entityDetails.entityDisplayName);
            var resourceRequest = new Sage.SData.Client.SDataSingleResourceRequest(SDataServiceRegistry.getSDataService('metadata')).setResourceKind(dString.substitute('entities'));
            var entityInfo = {
                "name": this.entityDetails.entityName,
                "tableName": this.entityDetails.entityName.toUpperCase(),
                "displayName": this.entityDetails.entityDisplayName,
                "displayNamePlural": dispNamePurlal,
                "isDynamic": true,
                "properties": { "$resources": this.entityDetails.data },
                "package": { "$key": "SalesLogix Application Entities" },
                "sdata": { "pathName": utility.pluralize(this.entityDetails.entityName.toLowerCase()) },
                "stringExpression": "${" + this.entityDetails.entityName + "Id}"
            };
            if (this.entityDetails.relationType == "1:1") {
                entityInfo.isExtension = true;
                entityInfo.extendedEntity = {
                    "$key": this.entityDetails.relatedEntity
                };
            }
            else{
                entityInfo.isExtension = false;
            }

            this._dialog.showLoading();
            resourceRequest.create(entityInfo, {
                success: function (data) {
                    this.entityDetails.status = context._nlsResources.lblSuccessMsg;
                    //Create default relationship with Owner
                    var childProps = data.properties.$resources;
                    if (context.entityDetails.relationType !== "1:1") {
                        this.createOwnerRelation(childProps, context);
                    }

                    //Create the selected relationship
                    if (context.entityDetails.relationType === "1:M") {
                        var relation = {};
                        relation.cardinality = "1:M";
                        relation.cascadeOption = "SaveUpdate"; //default in AA
                        relation.parentEntity = { "$key": context.entityDetails.relatedEntity };
                        relation.childEntity = { "$key": context.entityDetails.entityName };

                        relation.parentProperty = { "propertyName": entityNamePurlal, "displayName": dispNamePurlal, "isIncluded": true };
                        relation.childProperty = { "propertyName": context.entityDetails.relatedEntity, "displayName": this.entityDetails.relatedEntityDispName, "isIncluded": true };

                        //Get foreign-key id(child property id) thats got created now
                        var childPropID;
                        for (var i = 0; i < childProps.length; i++) {
                            if (childProps[i].propertyName === context.entityDetails.relatedEntity + 'Id') {
                                childPropID = childProps[i].id;
                                break;
                            }
                        }

                        relation.columns = {
                                "$resources": [{
                                    "parentPropertyId": context.entityDetails.relatedPropertyId,
                                    "childPropertyId": childPropID
                                }]
                            };
                        var request = new Sage.SData.Client.SDataSingleResourceRequest(SDataServiceRegistry.getSDataService('metadata')).setResourceKind(dString.substitute('relationships'));
                        request.create(relation, {
                            success: function (data) {
                                context._dialog.hideLoading();
                                context._dialog.hide();
                                topic.publish("/entityController/entityWizard/nextStep", this._currentStep);
                            },
                            failure: function (data) {
                                context.entityDetails.selectedRelStatus = context._nlsResources.lblErrorRelation + ' ' +context.entityDetails.relatedEntity + ' !';
                                context._dialog.hideLoading();
                                context._dialog.hide();
                                topic.publish("/entityController/entityWizard/nextStep", this._currentStep);
                            },
                            scope: context
                        });
                    } else {
                        context._dialog.hideLoading();
                        context._dialog.hide();
                        topic.publish("/entityController/entityWizard/nextStep", this._currentStep);
                    }

                    //Refresh main list view
                    var listpanel = registry.byId('list');
                    if (listpanel) {
                        listpanel._listGrid._refresh();
                    }
                    
                },
                failure: function (data) {
                    this.entityDetails.status = context._nlsResources.lblErrorMsg;
                    this._dialog.hideLoading();
                    this._dialog.hide();
                    topic.publish("/entityController/entityWizard/nextStep", this._currentStep);
                },
                scope: this
            });

        }
    });
    return addEditEntity;
});