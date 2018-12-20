require({cache:{
'url:Sage/MainView/IntegrationContract/templates/PromoteWidget.html':"<div>\r\n    <div data-dojo-type=\"dijit.Dialog\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onCancel:_btnCancel_OnClick\">\r\n        <div data-dojo-type=\"dijit.form.Form\">\r\n            <div data-dojo-attach-point=\"divLoadingMessage\">\r\n                <br />\r\n                <label style=\"padding-left:100px;font-size:16px;font-weight:bold\">{%= Sage.Utility.htmlEncode($.pageLoading_Caption) %}</label>\r\n            </div>\r\n            <div>\r\n                <label class=\"wizardHeaderText\">{%= Sage.Utility.htmlEncode($.createLink_Caption) %}</label>\r\n            </div>\r\n            <table id=\"tblDetails\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"padding-left:20px\">\r\n                <tr>\r\n                    <td>\r\n                        <label>{%= Sage.Utility.htmlEncode($.logicalId_Caption) %}</label>\r\n                    </td>\r\n                    <td>\r\n                        <div data-dojo-attach-point=\"backOffice_Container\" data-dojo-type=\"dijit.layout.ContentPane\"></div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>\r\n                        <label>{%= Sage.Utility.htmlEncode($.accountingEntity_Caption) %}</label>\r\n                    </td>\r\n                    <td>\r\n                        <div data-dojo-attach-point=\"accountingEntity_Container\" data-dojo-type=\"dijit.layout.ContentPane\"></div>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n            <div data-dojo-attach-point=\"divValidationMessage\" style=\"color:red\" class=\"display-none\">\r\n                <label>{%= Sage.Utility.htmlEncode($.errorRequiredData) %}</label>\r\n            </div>\r\n            <div align=\"right\" style=\"margin-top:10px\">\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnNext\" data-dojo-attach-event=\"onClick:_btnOk_OnClick\">{%= Sage.Utility.htmlEncode($.ok_Caption) %}</div>\r\n                <div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"btnCancel\" data-dojo-attach-event=\"onClick:_btnCancel_OnClick\" style=\"margin-left:5px;\">{%= Sage.Utility.htmlEncode($.cancel_Caption) %}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/IntegrationContract/PromoteWidget", [
    'dojo/_base/declare',
    'dijit/_Widget',
    'Sage/_Templated',
    'dojo/_base/connect',
    'dojo/string',
    'dojo/on',
    'dojo/store/Memory',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/text!./templates/PromoteWidget.html',
    'dojo/i18n!./nls/PromoteWidget',
    'Sage/Utility',
    'Sage/UI/Dialogs',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'Sage/Data/SDataServiceRegistry',
    'dijit/form/FilteringSelect'
    ],
function (
    declare,
    _Widget,
    _Templated,
    connect,
    dString,
    on,
    memory,
    domConstruct,
    domClass,
    lang,
    dArray,
    template,
    nlsResources,
    utility,
    dialogs,
    dialogHelpIconMixin,
    sDataServiceRegistry,
    filteringSelect   
) {
    var widgetTemplate = utility.makeTemplateFromString(template);
    var promoteWidget = declare('Sage.MainView.IntegrationContract.PromoteWidget', [_Widget, _Templated], {
        id: "dlgPromoteWidget",
        widgetTemplate: widgetTemplate,
        widgetsInTemplate: true,
        _helpIconTopic: "Search_for_Matches",
        constructor: function (options) {
            this.initialize(options);
            lang.mixin(this, nlsResources);
        },
        initialize: function (options) {
            lang.mixin(this, options);
        },
        show: function (options) {
            this.initialize(options);
            this._dialog.titleNode.innerHTML = dString.substitute(this.title_Caption, [this.entityPrettyName]);
            this._dialog.show();
            domClass.add(this.divValidationMessage, "display-none");

            if (this._helpIconTopic) {
                if (!this._dialog.helpIcon) {
                    lang.mixin(this._dialog, new dialogHelpIconMixin());
                    this._dialog.createHelpIconByTopic(this._helpIconTopic);
                }
            }
            this._requestBackOffices();
            domClass.add(this.divLoadingMessage, "display-none");
        },
        promoteEntity: function(logicalId, accountingEntityId) {
            var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind('backOffices');
            request.setOperationName('PromoteToBackOffice');
            var entry = {
                "$name": this.operationName,
                "request": {
                    "entityName": this.entityName,
                    "entityId": this.entityId,
                    "logicalId": logicalId,
                    "accountingEntityId": accountingEntityId
                }
            };
            request.execute(entry, {
                success: lang.hitch(this, function (data) {
                    dialogs.showInfo(dString.substitute(this.requestSuccessfullSubmitted, [this.entityPrettyName, this.entityDisplayValue]));
                }),
                failure: lang.hitch(this, function (result) {
                    dialogs.showError(dString.substitute(this.errorPromotion, [this.entityPrettyName, result]));
                })
            });
           this._close();
        },
        _requestBackOffices: function () {
            var service = sDataServiceRegistry.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                          .setResourceKind("backOffices")
                          .setOperationName("RequestActiveBackOffices");
            var entry = {
                "$name": "RequestActiveBackOffices",
                "request": {
                    "BackOfficeId": '',
                    "entityName": this.entityName
                }
            };
            request.execute(entry, {
                async: false,
                success: lang.hitch(this, function (result) {
                    if (result.response.Result) {
                        var resources = result.response.Result.$resources;
                        var count = resources.length;
                        var defaultBackOffice = this.logicalId ? this.logicalId : count === 1 && resources[0].BackOffice.BackOfficeName;
                        var offices = [];
                        dArray.forEach(resources, dojo.hitch(this, function(data) {
                            offices.push(data);
                        }));
                        this.backOffices = this._initializeList(offices, 'BackOfficeName', 'LogicalId', defaultBackOffice);
                        this.backOffices.placeAt(this.backOffice_Container);
                        if (!defaultBackOffice) {
                            this.accountingEntities = this._initializeList(null, 'AcctEntityExtId', '$key', false);
                            this.accountingEntities.placeAt(this.accountingEntity_Container);
                        }
                        on(this.backOffices, "change", lang.hitch(this, function () {
                            if (!this.loading) {
                                this._requestAccountingEntities();
                            }
                        }));
                    } else {
                        console.log('There are currently no back offices active.');
                    }
                }),
                failure: function (result) {
                    dialogs.showError(result);
                }
            });
        },
        _requestAccountingEntities: function() {
            if (this.accountingEntities) {
                this.accountingEntities.destroyRecursive();
            }
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind("backOfficeAccountingEntities");
            request.setQueryArg("select", "AcctEntityExtId");
            request.setQueryArg("where", dString.substitute("BackOffice.Id eq '${0}'", [this.backOffices.item.$key]));
			request.setQueryArg("orderby", "AcctEntityExtId asc");
            request.read({
                success: lang.hitch(this, function(result) {
                    if (result) {
                        var defaultAcctSystem = result.$resources.length === 1 && result.$resources[0].$key;
                        this.accountingEntities = this._initializeList(result.$resources, 'AcctEntityExtId', '$key', defaultAcctSystem);
                        this.accountingEntities.placeAt(this.accountingEntity_Container);
                        on(this.accountingEntities, "change", lang.hitch(this, function() {
                            domClass.add(this.divValidationMessage, "display-none");
                        }));
                    }
                }),
                failure: function(result) {
                    dialogs.showError(dString.substitute(this.errorRequestListOptions, [this.errorAccountingEntities, result]));
                }
            });
        },
        _initializeList: function (data, searchAttribute, idProperty, defaultValue) {
            var list = new filteringSelect({
                store: new memory({ data: data, idProperty: idProperty }),
                maxHeight: 150,
                searchAttr: searchAttribute,
                labelAttr: searchAttribute,
                placeHolder: this.selectOption_Caption,
                required: true,
                style: "width:250px",
            });
            list.attr('value', defaultValue);
            return list;
        },
        _btnOk_OnClick: function () {
            if (!this.backOffices.value || !this.accountingEntities.value) {
                domClass.remove(this.divValidationMessage, "display-none");
                return;
            }
            this.promoteEntity(this.backOffices.item.LogicalId, this.accountingEntities.item.AcctEntityExtId);
        },
        _btnCancel_OnClick: function () {
            this._close();
        },
        _close: function () {
            this._dialog.hide();
            if (this.backOffices) {
                this.backOffices.destroyRecursive();
            }
            if (this.accountingEntities) {
                this.accountingEntities.destroyRecursive();
            }
        }
    });
    return promoteWidget;
});