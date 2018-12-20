require({cache:{
'url:Sage/MainView/EntityMgr/templates/EditEntityOptionsDlg.html':"<div>\r\n    <div dojotype=\"dijit.Dialog\" title=\"\" dojoattachpoint=\"_dialog\" dojoattachevent=\"onHide:_onDlgHide\" style=\"width:60%;\">\r\n        <div class=\"recur-activity-dialog\">\r\n            <table class=\"detailTableContainer formtable HundredPercentWidth\">\r\n                <tr>\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblName\">\r\n                                Name\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                            <input disabled data-dojo-type=\"dijit.form.ValidationTextBox\" data-dojo-props=\"required: true\" data-dojo-attach-point=\"Name\" />\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblDisplayName\">\r\n                                Display Name\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                            <input data-dojo-type=\"dijit.form.ValidationTextBox\" data-dojo-props=\"required: true\" data-dojo-attach-point=\"DisplayName\" />\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblPluralName\">\r\n                                Display Plural Name\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld dijitInline\" data-dojo-attach-point=\"displayName\">\r\n                            <input data-dojo-type=\"dijit.form.ValidationTextBox\" data-dojo-props=\"required: true\" data-dojo-attach-point=\"PluralName\" style=\"\" />\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"\" class=\"lbl alignright\">\r\n                            <label data-dojo-attach-point=\"lblTitle\">Title (String Expression)</label>\r\n                        </div>\r\n                        <div class=\"fld dijitInline\" data-dojo-attach-point=\"viewTitle\"></div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"\" class=\"lbl alignright\">\r\n                            <label data-dojo-attach-point=\"lblExtension\" for=\"IsExtension\">Is Extension</label>\r\n                            <input type=\"checkbox\" data-dojo-attach-point=\"IsExtension\"\r\n                                   data-dojo-type=\"dijit/form/CheckBox\" />\r\n                        </div>\r\n                        <div class=\"fld dijitInline\" data-dojo-attach-point=\"entityDP\">\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"padding:0 !important;\" class=\"lbl alignright\">\r\n                            <label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblHistory\">\r\n                                Track History To\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"fld  dijitInline\" data-dojo-attach-point=\"filterName\">\r\n                            <input disabled data-dojo-type=\"dijit.form.TextBox\" data-dojo-attach-point=\"History\" />\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td class=\"FManagerDialogFieldLabel\">\r\n                        <div style=\"width:248px;\" class=\"lbl alignright\">\r\n                            <label data-dojo-attach-point=\"lblAdvancedOptions\" for=\"\">Advanced Options</label>\r\n                        </div>\r\n                        <div class=\"fld dijitInline\" data-dojo-attach-point=\"BulkUpdateVal\" style=\"padding-top:4px; outline:1px solid #999999\">\r\n                            <label data-dojo-attach-point=\"lblImport\" style=\"display:inline-block; width: 100px; text-align:right;\">Import</label>\r\n                            <input type=\"checkbox\" data-dojo-attach-point=\"CanImport\"\r\n                                   data-dojo-type=\"dijit/form/CheckBox\"/>\r\n                            <label data-dojo-attach-point=\"lblCanPut\" style=\"display:inline-block; width: 100px; text-align:right;\">Put</label>\r\n                            <input type=\"checkbox\" data-dojo-attach-point=\"CanPut\"\r\n                                   data-dojo-type=\"dijit/form/CheckBox\" />\r\n                            <br />\r\n                            <label data-dojo-attach-point=\"lblMatch\" style=\"display:inline-block; width: 100px; text-align:right;\" for=\"\">Match</label>\r\n                            <input style=\"margin-top: 4px;\" type=\"checkbox\" data-dojo-attach-point=\"CanMatch\"\r\n                                   data-dojo-type=\"dijit/form/CheckBox\"/>\r\n                            <label data-dojo-attach-point=\"lblCanPost\" style=\"display:inline-block; width: 100px; text-align:right;\">Post</label>\r\n                            <input type=\"checkbox\" data-dojo-attach-point=\"CanPost\"\r\n                                   data-dojo-type=\"dijit/form/CheckBox\" />\r\n                            <br />\r\n                            <label data-dojo-attach-point=\"lblBulkUpdate\" style=\"display:inline-block; width: 100px; text-align:right;\" for=\"\">Bulk Update</label>\r\n                            <input style=\"margin-top: 4px;\" type=\"checkbox\" data-dojo-attach-point=\"BulkUpdate\"\r\n                                   data-dojo-type=\"dijit/form/CheckBox\"/>\r\n                            <label data-dojo-attach-point=\"lblCanDelete\" style=\"display:inline-block; width: 100px; text-align:right;\">Delete</label>\r\n                            <input type=\"checkbox\" data-dojo-attach-point=\"CanDelete\"\r\n                                   data-dojo-type=\"dijit/form/CheckBox\" />\r\n                            <br />\r\n                            <label data-dojo-attach-point=\"lblAudited\" style=\"display:inline-block; width: 100px; text-align:right;\" for=\"Audited\">Audited</label>\r\n                            <input style=\"margin-top:4px;\" type=\"checkbox\" data-dojo-attach-point=\"Audited\"\r\n                                   data-dojo-type=\"dijit/form/CheckBox\" />\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n\r\n            <div class=\"button-bar alignright\">\r\n                <div data-dojo-type=\"dijit.form.Button\" id=\"{%= $.id%}_btn_OK\" name=\"btn_OK\" dojoattachpoint=\"btn_OK\" dojoattachevent=\"onClick:_okClick\">OK</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" id=\"{%= $.id%}_btn_Cancel\" name=\"btn_Cancel\" dojoattachpoint=\"btn_Cancel\" dojoattachevent=\"onClick:_cancelClick\">Cancel</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"}});
/*globals define, dojo, Simplate */
define("Sage/MainView/EntityMgr/EditEntityOptionsDlg", [
    'dijit/_Widget',
    'Sage/_Templated',
    'dojo/string',
    'dijit/Dialog',
    'Sage/UI/_DialogLoadingMixin',
    'dojo/_base/lang',
    'Sage/Data/SingleEntrySDataStore',
    'Sage/Data/SDataServiceRegistry',
    'Sage/MainView/BindingsManager',
    'Sage/Utility',
    'Sage/UI/Dialogs',
    'dijit/form/RadioButton',
    'dojo/_base/declare',
    'dojo/i18n!./nls/_BaseEntityDetailContent',
    'dojo/text!./templates/EditEntityOptionsDlg.html',
    'dojo/store/Memory',
    'dojo/dom-construct',
    'Sage/UI/FilteringSelect',
    'Sage/Data/SDataServiceRegistry',
    'dojo/_base/lang',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'dijit/registry'
],
function (_Widget,
    _Templated,
    dString,
    Dialog,
    _DialogLoadingMixin,
    dojoLang,
    SingleEntrySDataStore,
    sDataServiceRegistry,
    BindingsManager,
    utility,
    sageDialogs,
    RadioButton,
    declare,
    _nlsResource,
    template,
    Memory,
    domConstruct,
    crmDropDowns,
    SDataServiceRegistry,
    lang,
    _DialogHelpIconMixin,
    registry) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var qryDlg = declare('Sage.MainView.EntityMgr.EditEntityOptionsDlg', [_Widget, _Templated], {
        entityName: '',
        mode: 'edit',
        widgetsInTemplate: true,
        typeDropDowns: false,
        propertiesDP: false,
        entityStore: false,
        propertyStore: false,
        widgetTemplate: widgetTemplate,
        nlsResource: _nlsResource,

        constructor: function () {
        },
        postCreate: function () {
            
            this.lblName.innerHTML = this.nlsResource.propertyName;
            this.lblDisplayName.innerHTML = this.nlsResource.lblDisplayName;
            this.lblPluralName.innerHTML = this.nlsResource.lblPluralName;
            this.lblTitle.innerHTML = this.nlsResource.lblTitle;
            this.lblExtension.innerHTML = this.nlsResource.IsExtension;
            this.lblAdvancedOptions.innerHTML = this.nlsResource.AdvOptions;
            this.lblPluralName.innerHTML = this.nlsResource.lblPluralName;
            this.lblImport.innerHTML = this.nlsResource.lblImport;
            this.lblMatch.innerHTML = this.nlsResource.lblMatch;
            this.lblBulkUpdate.innerHTML = this.nlsResource.lblBulkUpdate;
            this.lblAudited.innerHTML = this.nlsResource.lblAudited;
            this.lblCanPut.innerHTML = this.nlsResource.lblPut;
            this.lblCanPost.innerHTML = this.nlsResource.lblPost;
            this.lblCanDelete.innerHTML = this.nlsResource.lblDelete;
            this.lblHistory.innerHTML = this.nlsResource.lblHistory;

            dojo.mixin(this._dialog, new _DialogLoadingMixin());

            // help icon
            lang.mixin(this._dialog, new _DialogHelpIconMixin());
            this._dialog.createHelpIconByTopic('EditEntity');

            this.entityStore = new Memory();
            this.propertyStore = new Memory();

            this.typeDropDowns = new crmDropDowns({
                name: 'value',
                value: 0,
                store: this.entityStore,
                searchAttr: 'name'
            });
            domConstruct.place(this.typeDropDowns.domNode, this.entityDP, 'only');

            this.propetiesDP = new crmDropDowns({
                name: 'value',
                value: 0,
                store: this.propertyStore,
                searchAttr: 'name',
                required: false
            });
            domConstruct.place(this.propetiesDP.domNode, this.viewTitle, 'only');

            var context = this;
            //Events
            this.IsExtension.on("change", function (isChecked) {
                if (isChecked) {
                    context.typeDropDowns.set('disabled', false);
                }
                else {
                    context.typeDropDowns.set('value', '');
                    context.typeDropDowns.set('disabled', true);
                }
            }, true);


        },
        _okClick: function () {
            this._dialog.showLoading();
            var context = this;
            this.entity.displayName = context.DisplayName.textbox.value;
            this.entity.displayNamePlural = context.PluralName.textbox.value;
            if (this.IsExtension.get("value") === false)
                this.entity.isExtension = false;
            else {
                this.entity.isExtension = true;
                this.entity.extendedEntity = {
                    "$key": context.typeDropDowns.value
                };
                this.entity.extendedEntityPropertyName = context.typeDropDowns.value;
            }

            //Flags
            this.entity.audited = (this.Audited.get("value") === false) ? false : true;
            this.entity.bulkAction.canBulkUpdate = (this.BulkUpdate.get("value") === false) ? false : true;
            this.entity['import'].canMatch = (this.CanMatch.get("value") === false) ? false : true;
            this.entity['import'].canImport = (this.CanImport.get("value") === false) ? false : true;
            this.entity.sdata.canPost = (this.CanPost.get("value") === false) ? false : true;
            this.entity.sdata.canPut = (this.CanPut.get("value") === false) ? false : true;
            this.entity.sdata.canDelete = (this.CanDelete.get("value") === false) ? false : true;

            //Title
            this.entity.StringExpression = '${'+context.propetiesDP.value+'}';

            var request = new Sage.SData.Client.SDataSingleResourceRequest(Sage.Data.SDataServiceRegistry.getSDataService('metadata'));
            request.setResourceKind('entities(' + "'" + this.entityName + "'" + ')');
            request['update'](this.entity, {
                isSecurityManager: true,
                scope: context,
                ignoreETag: false,
                success: function () {
                    context._dialog.hideLoading();
                    this.hide();
                },
                failure: function (xhr, sdata) {
                    context._dialog.hideLoading();
                    this.hide();
                }
            });

        },
        _cancelClick: function () {
            this.hide();
        },
        destroy: function () {
            this.inherited(arguments);
        },
        show: function () {
            this._dialog.show();
            if (!this._dialog._standby) {
                dojoLang.mixin(this._dialog, new _DialogLoadingMixin());
            }
        },
        _setModeAttr: function (mode) {
            this.mode = mode;
        },
        _getModeAttr: function () {
            return this.mode;
        },
        hide: function () {
            this._dialog.hide();
        },
        _onDlgHide: function () {
            this.entityName = '';
        },
        _setEntityIdAttr: function (entityName) {
            this.entityName = entityName;
            if (this.entityName && this.entityName !== '') {
                this._loadData();
            }
        },
        _getEntityIdAttr: function () {
            return this.entityName;
        },
        _loadData: function () {
            this._dialog.showLoading();
            this._dialog.set('title', this.entityName);
            var context = this;

            //IsExtenison
            if (context.entityStore.data.length === 0) {
                var request = new Sage.SData.Client.SDataResourceCollectionRequest(SDataServiceRegistry.getSDataService('metadata'))
                            .setResourceKind('entities')
                            .setQueryArg('select', 'id,displayName,name')
                            .setQueryArg('Count', '500')
                            .setQueryArg('orderBy', 'name')
                            .setQueryArg('format', 'json');

                request.read({
                    success: function (data) {
                        var entites = data.$resources;
                        for (var i = 0; i <= entites.length - 1; i++) {
                            var entityDisplayName = entites[i].displayName ? entites[i].displayName : entites[i].name;
                            if (entityDisplayName) {
                                context.entityStore.add({
                                    id: entites[i].name,
                                    name: entityDisplayName
                                });
                            }
                        }
                    },
                    failure: function (error) {
                        if (error) {
                            console.error(error);
                        }
                    }
                });
            }

            // populate values for UI
            var entityReq = new Sage.SData.Client.SDataResourceCollectionRequest(SDataServiceRegistry.getSDataService('metadata'));
            entityReq.setResourceKind('entities(' + "'" + this.entityName + "'" + ')');
            entityReq.setQueryArg('include', 'sdata,bulkAction,import');

            entityReq.read({
                success: function (data) {
                    if (typeof (data) !== 'undefined' && typeof (data.$resources) !== 'undefined' && data.$resources.length == 1) {
                        context.entity = data.$resources[0];
                        var entity = data.$resources[0];

                        context.Name.textbox.value = entity.name;
                        context.DisplayName.textbox.value = entity.displayName;
                        context.PluralName.textbox.value = entity.displayNamePlural;
                        context.Audited.set("value", entity.audited); 
                        context.BulkUpdate.set("value", entity.bulkAction.canBulkUpdate);
                        context.CanMatch.set("value", entity['import'].canMatch);
                        context.CanImport.set("value", entity['import'].canImport);
                        context.CanPost.set("value", entity.sdata.canPost);
                        context.CanPut.set("value", entity.sdata.canPut);
                        context.CanDelete.set("value", entity.sdata.canDelete);
                        context.History.textbox.value = entity.historyEntityName;

                        //Populate IsExtension
                        context.IsExtension.set("value", entity.isExtension);
                        if (entity.isExtension) {
                            context.typeDropDowns.set('disabled', false);
                            var objItem = context.entityStore.get(entity.extendedEntity.$key);
                            context.typeDropDowns.set("item", objItem);
                        }
                        else {
                            context.typeDropDowns.set('value', '');
                            context.typeDropDowns.set('disabled', true);
                        }

                        //View Title dropdown values
                        var entites = entity.properties.$resources;
                        var count = context.propertyStore.data.length;
                        for (var i = 0; i < count; i++) {
                            context.propertyStore.remove(context.propertyStore.data[0].id);
                        }

                        for (i = 0; i <= entites.length - 1; i++) {
                            //View Title - only of type string, calc string
                            if (entites[i].dataTypeId == 'f750817f-73ad-4bf3-b2de-bd0f5cc47dfd' || entites[i].dataTypeId == 'ccc0f01d-7ba5-408e-8526-a3f942354b3a') {
                                var displayName = entites[i].displayName ? entites[i].displayName : entites[i].propertyName;
                                if (displayName) {
                                    context.propertyStore.add({
                                        id: entites[i].propertyName,
                                        name: displayName
                                    });
                                }
                            }
                        }

                        //Populate String Expression (Title)
                        if (entity.stringExpression) {
                            var expr = entity.stringExpression;
                            if (expr.substring(0, 2) === "${") {
                                expr = expr.substring(2, expr.length - 1);
                            }
                            var item = context.propertyStore.get(expr);
                            context.propetiesDP.set("item", item);
                        } else {
                            context.propetiesDP.set("item", null);
                        }

                    }
                    context._dialog.hideLoading();
                },
                failure: function (error) {
                    context._dialog.hideLoading();
                    if (error) {
                            console.error(error);
                        }
                }
            });


        }
    });
    return qryDlg;
});