/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/CountryCodeMapping/_CountryAliasConversionDialogBase", [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/topic',
    'dojo/_base/lang',
    'dojo/store/Memory',
    'dijit/_Widget',
    'Sage/_Templated',
    'Sage/MainView/CountryCodeMapping/CountryAliasConversionUtility',
    'dojo/i18n!./nls/_CountryAliasConversionDialogBase',
    'Sage/UI/Controls/_DialogHelpIconMixin'
],
function (
    declare,
    dojoArray,
    topic,
    dojoLang,
    memory,
    widget,
    templated,
    countryUtility,
    nlsResources,
    dialogHelpIconMixin,
    filteringSelect
) {
    var countryAliasConversionDialogBase = declare('Sage.MainView.Import._CountryAliasConversionDialogBase', [widget, templated], {
        _dialog: null,
        baseNlsResources: nlsResources,
        _helpIconTopic: "countryaliasconversion",
        widgetsInTemplate: true,
        subscriptions: [],
        importOptions: [],
        lookupTypeField: "LookupField",
        _dialogIds: ["dlgCountryAliasConversion"], //This collection is used in _destroyObjects
        constructor: function () {
            this.subscriptions = [];
            dojo.mixin(this, nlsResources);
        },
        show: function () {
            this._dialog.show();
            if (this._helpIconTopic) {
                if (!this._dialog.helpIcon) {
                    dojoLang.mixin(this._dialog, new dialogHelpIconMixin());
                    this._dialog.createHelpIconByTopic(this._helpIconTopic);
                    this._dialog.helpIcon.tabIndex = "-1";
                }
            }
        },
        startup: function () {
            this.inherited(arguments);
        },
        preformValidation: function (successfulCallback, failedCallback) {
            successfulCallback();
        },
        saveCountryAliasConversion: function (aliasOptions) {
            var requestOptions = {
                countryAliasId: aliasOptions.countryAliasId,
                entry: {
                    "$name": "SaveOrphanedCountryAlias",
                    "request": {
                        "countryAliasId": aliasOptions.countryAliasId,
                        "countryCodeMappingId": aliasOptions.countryCodeMappingId
                    }
                },
                businessRuleMethod: "SaveOrphanedCountryAlias",
                onSuccess: dojo.hitch(this, function (countryAliasId) {
                    if (aliasOptions.isNew) {
                        this.aliasOptions.countryAliasId = countryAliasId;
                    }
                }),
                onFailure: function (result) {
                    if (aliasOptions.onFailure) {
                        aliasOptions.onFailure(result);
                    }
                    console.log(result);
                }
            };
            countryUtility.countryRuleRequest(requestOptions, "countryAliases");
        },
        _dialog_OnCancel: function () {
            this._btnCancel_OnClick();
        },
        _btnCancel_OnClick: function () {
            this._dialog.hide();
        },
        finishConversion: function () {
            this._destroyObjects();
        }        
    });
    return countryAliasConversionDialogBase;
});
