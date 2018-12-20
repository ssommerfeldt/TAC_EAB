/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/ExchangeRate/ExchangeRateDialog", [
    'dijit/_Widget',
    'dojo/string',
    'Sage/_Templated',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'dojo/_base/declare',
    'dojo/i18n!./nls/ExchangeRateDialog',
    'Sage/Utility/Jobs',
    'dojo/_base/lang',
    'dojo/request',
    'dojo/json',
    "dojo/promise/all",
    'Sage/UI/_DialogLoadingMixin',
    'Sage/UI/Dialogs'
],

function (
    _Widget,
    dString,
    _Templated,
    _DialogHelpIconMixin,
    declare,
    localeStrings,
    jobs,
    lang,
    request,
    json,
    all,
    _DialogLoadingMixin,
    dialogs
) {
    var exchangeRateDialog = declare('Sage.MainView.ExchangeRateDialog', [_Widget, _Templated], {
        _dialog: false,
        widgetsInTemplate: true,
        _baseCurrency: null,
        _oppCount: null,
        _soCount: null,
        _quotesCount: null,
        widgetTemplate: new Simplate([
            '<div>', //root
                '<div  data-dojo-type="dijit.Dialog" style="width:600px;"  dojoAttachPoint="_dialog"  data-dojo-type="dijit.Dialog" title="{%= $.lblUpdateCurrency %}">',
                '<div style="padding-bottom:10px;">',
                '<label >{%= $.lblSelectEntity %}:</label>',
                '</div>',
                '<div style="padding-bottom:20px;padding-left:20px;">',
                    '<label style="font-weight: bold;" >{%= $.lblNote %}: </label><label >{%= $.lblLockedUpdate %}.</label>',
                '</div>',

                '<table class="detailTableContainer formtable HundredPercentWidth">',
                '<tr>',
                    '<th class="">',
                        '<div class="fld  dijitInline" data-dojo-attach-point="filterName">',
                            '<label class="alignleft" data-dojo-attach-point="lblName">{%= $.lblEntity %} </label>',
                        '</div>',
                    '</th>',
                    '<th style="text-align:left;">',
                            '<label style="text-align:left;" data-dojo-attach-point="lblName">{%= $.lblRecordsToUpdate %}</label>',
                    '</th>',
                '</tr>',
                 '<tr>',
                    '<td class="">',
                        '<div style="padding:0 !important;" class="lbl alignright">',
                            '<input type="checkbox" data-dojo-attach-point="opportunities"  data-dojo-type="dijit.form.CheckBox" checked="checked" />',
                        '</div>',
                        '<div class="fld  dijitInline" data-dojo-attach-point="filterName">',
                            '<label data-dojo-attach-point="lblName">{%= $.lblOpportunities %} </label>',
                        '</div>',
                    '</td>',
                    '<td class="">',
                        '<div class="fld  dijitInline" data-dojo-attach-point="filterName">',
                            '<label data-dojo-attach-point="oppCount" >0</label>',
                        '</div>',
                    '</td>',
                '</tr>',
                '<tr>',
                    '<td class="">',
                        '<div style="padding:0 !important;" class="lbl alignright">',
                            '<input type="checkbox" data-dojo-attach-point="salesOrders"  data-dojo-type="dijit.form.CheckBox" checked="checked" />',
                        '</div>',
                        '<div class="fld  dijitInline" data-dojo-attach-point="filterName">',
                            '<label data-dojo-attach-point="lblName">{%= $.lblSalesOrders %} </label>',
                        '</div>',
                    '</td>',
                    '<td class="">',
                        '<div class="fld  dijitInline" data-dojo-attach-point="filterName">',
                            '<label data-dojo-attach-point="soCount" >0</label>',
                        '</div>',
                    '</td>',
                '</tr>',
                ' <tr>',
                    ' <td class="">',
                        '<div style="padding:0 !important;" class="lbl alignright">',
                            '<input type="checkbox" data-dojo-attach-point="quotes"  data-dojo-type="dijit.form.CheckBox" checked="checked" />',
                        '</div>',
                        '<div class="fld  dijitInline" data-dojo-attach-point="filterName">',
                            '<label data-dojo-attach-point="lblName">{%= $.lblQuotes %} </label>',
                        '</div>',
                    '</td>',
                    '<td class="">',
                        '<div class="fld  dijitInline" data-dojo-attach-point="filterName">',
                            '<label data-dojo-attach-point="quCount" >0</label>',
                        '</div>',
                    '</td>',
        '</tr>',
        '</table>',
        '<div class="button-bar alignright">',
        '<div data-dojo-type="dijit.form.Button" name="btn_OK" dojoattachpoint="btn_OK" dojoAttachEvent="onClick:_okClick"">{%= $.lblOK %}</div>',
        '<div data-dojo-type="dijit.form.Button" name="btn_Cancel" dojoattachpoint="btn_Cancel" dojoAttachEvent="onClick:_cancelClick">{%= $.lblClose %}</div>',
        '</div>',

        '</div>',
            '</div>' //root                       
        ]),
        constructor: function (baseCurrency) {
            this._baseCurrency = baseCurrency;
            dojo.mixin(this, localeStrings);
        },
        postCreate: function () {
            // help icon
            lang.mixin(this._dialog, new _DialogHelpIconMixin());
            this._dialog.createHelpIconByTopic('ExchangeRateUpdate');
            dojo.mixin(this._dialog, new _DialogLoadingMixin());

            this._dialog.showLoading();
            var context = this;
            var listOfDeferred = [];
            var oppCnt = request(new Sage.SData.Client.SDataSingleResourceRequest(Sage.Data.SDataServiceRegistry.getSDataService('dynamic'))
                            .setResourceKind('Opportunities')
                            .setQueryArg('select', '$key')
                            .setQueryArg('format', 'json')
                            .setQueryArg('where', dString.substitute('ExchangeRateCode ne \'${0}\' and ExchangeRateLocked eq \'${1}\' and Status eq \'${2}\'', [this._baseCurrency, false, this.Open]))
                            .setQueryArg('_t', new Date().getTime())
                            )
                        .then(function (response) {
                            var result = json.parse(response);
                            context.oppCount.innerHTML = result.$resources.length;
                        },
                        function (error) {
                            console.log(error);
                        });
            listOfDeferred.push(oppCnt);
            var salesOrderCnt = request(new Sage.SData.Client.SDataSingleResourceRequest(Sage.Data.SDataServiceRegistry.getSDataService('dynamic'))
                            .setResourceKind('salesorders')
                            .setQueryArg('select', '$key')
                            .setQueryArg('format', 'json')
                            .setQueryArg('where', dString.substitute('CurrencyCode ne \'${0}\' and (ExchangeRateLocked eq \'${1}\' or ExchangeRateLocked eq null) and Status  eq \'${2}\' and ErpExtId eq null', [this._baseCurrency, false, this.SalesOrder]))
                            .setQueryArg('_t', new Date().getTime())
                            )
                        .then(function (response) {
                            var result = json.parse(response);
                            context.soCount.innerHTML = result.$resources.length;
                        },
                        function (error) {
                            console.log(error);
                        });
            listOfDeferred.push(salesOrderCnt);
            var quoteCnt = request(new Sage.SData.Client.SDataSingleResourceRequest(Sage.Data.SDataServiceRegistry.getSDataService('dynamic'))
                            .setResourceKind('quotes')
                            .setQueryArg('select', '$key')
                            .setQueryArg('format', 'json')
                            .setQueryArg('where', dString.substitute('CurrencyCode ne \'${0}\' and (ExchangeRateLocked eq \'${1}\' or ExchangeRateLocked eq null) and Status eq \'${2}\'  and ErpExtId eq null', [this._baseCurrency, false, this.New]))
                            .setQueryArg('_t', new Date().getTime())
                            )
                        .then(function (response) {
                            var result = json.parse(response);
                            context.quCount.innerHTML = result.$resources.length;
                        },
                        function (error) {
                            console.log(error);
                        });
            listOfDeferred.push(quoteCnt);

            all(listOfDeferred).then(function (results) {
                context._dialog.hideLoading();
            });
        },
        destroy: function () {
            this._dialog.destroy();
        },
        show: function () {
            this._dialog.show();
        },
        hide: function () {
            this._dialog.destroy();
        },
        _okClick: function () {
            var entityOptions = [], updateEntities = [];

            if (this.opportunities.checked)
                updateEntities.push('Opportunity');
            if (this.salesOrders.checked)
                updateEntities.push('SalesOrder');
            if (this.quotes.checked)
                updateEntities.push('Quote');

            updateEntities.forEach(function (entity) {
                var conditionalProperties = 'CurrencyCode,ExchangeRateLocked,Status';
                var conditionalValues = ':exchangeCode,false,Open';
                if (entity === 'Opportunity') {
                    conditionalProperties = 'ExchangeRateCode,ExchangeRateLocked,Status';
                } else if (entity === 'Quote') {
                    conditionalValues = ':exchangeCode,false,New';
                } else {
                    conditionalValues = ':exchangeCode,false,Sales Order';
                }
                entityOptions.push({
                    entityName: entity,
                    conditionalProperties: conditionalProperties,
                    conditionalValues: conditionalValues,
                    propertyNames: 'ExchangeRate,ExchangeRateDate',
                    propertyValues: ':rateValue,:rateDate'
                });
            });

            var options = {
                descriptor: this.job_Description,
                showErrorNotification: false,
                closable: true,
                title: this.updateRecords_Caption,
                key: "Sage.SalesLogix.BusinessRules.Jobs.UpdateExchangeRateJob",
                parameters: [{ "name": "Entities", "value": Sys.Serialization.JavaScriptSerializer.serialize(entityOptions) }],
                success: function () {
                },
                failure: function (result) {
                    dialogs.showError(dString.substitute(this.errorRequestingJobMgr, [result.statusText]));
                },
                ensureZeroFilters: true
            };
            jobs.triggerJobAndDisplayProgressDialog(options);
        },
        _cancelClick: function () {
            this._dialog.hide();
            this._dialog.destroy();
        }
    });
    return exchangeRateDialog;
});