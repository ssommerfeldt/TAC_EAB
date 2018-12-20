/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, sessionStorage */
define("Sage/UI/Controls/GridParts/Columns/Currency", [
    'dojo/_base/declare',
    'dojo/json',
    'Sage/Data/SDataServiceRegistry',
    'Sage/Utility/_LocalStorageMixin',
    'Sage/Utility',
    'dojo/_base/lang',
    'Sage/UI/Controls/Currency',
    'Sage/UI/Columns/Currency'
],
function (declare, json, SDataServiceRegistry, _localStorageMixin, utility, lang, currency, columnCurrency) {
    /*
    sample config object...
    {
    width: 15,
    field:  'Price',
    name: 'Base Price',
    sortable: true,
    styles: 'text-align:right;',
    editable: false,
    type: Sage.UI.Columns.Currency,
    exchangeRateType: 'BaseRate',
    displayCurrencyCode: true,
    exchangeRate: 1,    
    displayMode: 'AsControl',
    field: 'Price',
    displayField: 'Price',
    //When in a grid, currencyCodeFieldName is required in AA.    
    currentCode: utility.getClientContextByKey('ExchangeRateCode'),  //'USD'
    }
    */
    var widget = declare("Sage.UI.Controls.GridParts.Columns.Currency", null, {
        widgetClass: currency,
        exchangeRateLoaded: false,
        constructor: function (args) {
            lang.mixin(this, args);
			lang.mixin(this, args.editorArgs);

            if (this.multiCurrency && !this.exchangeRateLoaded) {
                var systemOptions = Sage.Services.getService('SystemOptions');
                if (systemOptions) {
                    systemOptions.get('BaseCurrency',
                        function (val) {
                            this.exchangeRateLoaded = true;
                            this.currentCode = val;
                            var loader = Sage.Services.getService('ExchangeRateLoader'); // from columnCurrency
                            if (loader) {
                                loader.requestExchangeRate(this.getExchangeRate, this);
                            }
                        },
                        function () {
                            if (typeof console !== 'undefined') {
                                console.error('Unable to determine SystemOptions.BaseCurrency.');
                            }
                        },
                        this
                    );
                } else {
                    if (typeof console !== 'undefined') {
                        console.error('Unable to load the SystemOptions service.');
                    }
                }
            }
        },
        getExchangeRate: function (data) {
            this.exchangeRate = data.Rate;
        },
        format: function(inItem, data) {
            var currentItem = data;
            var retVal = '';
            var i;
            try {
                this.decimalDigit = (this.constraints && this.constraints.places) ? this.constraints.places : Sys.CultureInfo.CurrentCulture.numberFormat.CurrencyDecimalDigits;
                //Multi-Currency is NOT enabled
                if (!this.multiCurrency) {
                    var currencySymbol;
                    if (this.constraints && this.constraints.showCurrencySymbol) {
                        currencySymbol = this.constraints.currencySymbol;
                    } else {
                        currencySymbol = '';
                    }
                    retVal = dojo.currency.format(inItem, {
                        currency: currencySymbol,
                        locale: Sys.CultureInfo.CurrentCulture.name,
                        places: this.decimalDigit
                    });
                    if (retVal === null) {
                        return '';
                    }
                }
                //Multi-Currency is enabled
                else {
                    //1. If the exchange rate is from the document, get it from the current record, else                
                    //2. If we are in insert mode then there is no parent record to query for the rate and code.
                    //Else: get it from the client context service.
                    if (this.exchangeRateType == 'EntityRate' && utility.getModeId() !== 'insert') {
                        //Extract the Rate value from the object by walking the sdata relationship path.
                        var rateFieldValue = 1;
                        if ((typeof this.exchangeRateField !== 'undefined') && (this.exchangeRateField !== null) && (this.exchangeRateField !== '')) {
                            var rateFieldPath = this.exchangeRateField.split('.');
                            rateFieldValue = currentItem;
                            for (i = 0; i < rateFieldPath.length; i++) {
                                if (rateFieldValue) {
                                    rateFieldValue = rateFieldValue[rateFieldPath[i]];
                                } else {
                                    rateFieldValue = utility.getClientContextByKey(this.exchangeRateType);
                                }
                            }
                            if ((rateFieldValue === null) || (rateFieldValue === 0)) {
                                rateFieldValue = 1;
                            }
                        }
                        //Extract the Rate Code value from the object by walking the sdata relationship path.
                        var rateCodeFieldPath = this.exchangeRateCodeField.split('.');
                        var rateCodeFieldValue = currentItem;
                        for (i = 0; i < rateCodeFieldPath.length; i++) {
                            if (rateCodeFieldValue) {
                                rateCodeFieldValue = rateCodeFieldValue[rateCodeFieldPath[i]];
                            } else {
                                rateCodeFieldValue = utility.getClientContextByKey([this.exchangeRateType, 'Code'].join(''));
                            }
                        }
                        this.exchangeRate = rateFieldValue;
                        this.currentCode = rateCodeFieldValue;
                    } else if (this.exchangeRateType === 'MyRate') {
                        this.exchangeRate = utility.getClientContextByKey(this.exchangeRateType);
                        this.currentCode = utility.getClientContextByKey([this.exchangeRateType, 'Code'].join(''));
                    }
                    inItem = inItem * this.exchangeRate;
                    retVal = dojo.currency.format(inItem, {
                        currency: [],
                        locale: Sys.CultureInfo.CurrentCulture.name,
                        places: this.decimalDigit
                    });
                    retVal = [retVal, '   ', this.currentCode].join("");
                }
                if (this.abbreviationLength) {
                    var abbreviationFormatter = Sage.Format.abbreviationFormatter(this.abbreviationLength);
                    retVal = abbreviationFormatter(retVal);
                }
            } catch (ex) {
                console.error(ex);
            }
            return retVal;
        }
    });
    return widget;
});
