require({cache:{
'url:Sage/MainView/Opportunity/templates/OpportunityStatistics.html':" [\r\n    '<div>',\r\n        '<div data-dojo-type=\"dijit.Dialog\" id=\"{%= $.id%}_dlgOpportunityStatistics\" title=\"{%= $.opportunityStatistics_Caption %}\" dojoAttachPoint=\"_dialog\" dojoAttachEvent=\"onCancel:_close\">',\r\n            '<div dojoAttachPoint=\"loadingContainer\">',\r\n                '<br />',\r\n                '<label class=\"wizardsectiontitle boldText padBottom\" style=\"padding-left:20px\">{%= $.loadingMessge %}</label>',\r\n                '<br />',\r\n                '<br />',\r\n            '</div>',\r\n            '<table cellspacing=\"20\" dojoAttachPoint=\"statisticsContentsContainer\" class=\"display-none\">',\r\n                '<tr>',\r\n                    '<td >',\r\n                        '<label>{%= $.opportunityCount %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<label dojoAttachPoint=\"opportunityCount\"></label>',\r\n                    '</td>',\r\n                '</tr>',\r\n                '<tr>',\r\n                    '<td>',\r\n                        '<label>{%= $.salesPotentialTotal %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<div id=\"salesPotential\" dojoAttachPoint=\"salesPotentialTotal_Container\" disabled=\"disabled\"></div>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<div id=\"salesPotentialAverage\" dojoAttachPoint=\"salesPotentialAverage_Container\" disabled=\"disabled\"></div>',\r\n                    '</td>',\r\n                '</tr>',\r\n                '<tr>',\r\n                    '<td>',\r\n                        '<label>{%= $.weightedPotentialTotal %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<div id=\"weightedPotential\" dojoAttachPoint=\"weightedPotentialTotal_Container\" disabled=\"disabled\"></div>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<div id=\"weightedPotentialAverage\" dojoAttachPoint=\"weightedPotentialAverage_Container\" disabled=\"disabled\"></div>',\r\n                    '</td>',\r\n                '</tr>',\r\n                '<tr>',\r\n                    '<td>',\r\n                        '<label>{%= $.averageCloseProbability %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<div dojoType=\"Sage.UI.Controls.Numeric\" constraints=\"{ places: 2, maxPlaces: 2, type: \\'percent\\' }\" dojoAttachPoint=\"closeProbability_Container\" readonly=\"readonly\"></div>',\r\n                    '</td>',\r\n                '</tr>',\r\n                '<tr>',\r\n                    '<td>',\r\n                        '<label>{%= $.actualAmountTotal %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<div id=\"actualAmount\" dojoAttachPoint=\"actualAmountTotal_Container\" disabled=\"disabled\"></div>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<div id=\"actualAmountAverage\" dojoAttachPoint=\"actualAmountAverage_Container\" disabled=\"disabled\"></div>',\r\n                    '</td>',\r\n                '</tr>',\r\n                '<tr>',\r\n                    '<td>',\r\n                        '<label>{%= $.averageDaysOpen %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<label dojoAttachPoint=\"daysOpen_Container\"></label>',\r\n                    '</td>',\r\n                '</tr>',\r\n                '<tr>',\r\n                    '<td>',\r\n                        '<label>{%= $.rangeEstClose %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<label dojoAttachPoint=\"rangeEstClose_Container\"></label>',\r\n                    '</td>',\r\n                '</tr>',\r\n            '</table>',\r\n            '<div class=\"button-bar alignright\">',\r\n                '<button dojoType=\"dijit.form.Button\" id=\"{%= $.id%}_btn_Cancel\" type=\"button\" dojoAttachEvent=\"onClick:_close\">{%= $.btnClose_Caption %}</button>',\r\n            '</div>',\r\n        '</div>',\r\n    '</div>'\r\n]"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/Opportunity/OpportunityStatistics", [
        'dojo/_base/declare',
        'dojo/i18n!./nls/OpportunityStatistics',
        'Sage/UI/Controls/_DialogHelpIconMixin',
        'dojo/_base/lang',
        'dijit/Dialog',
        'dijit/_Widget',
        'Sage/_Templated',
        'Sage/UI/Dialogs',
        'Sage/UI/Controls/Currency',
        'Sage/UI/Controls/Numeric',
        'Sage/Data/SDataServiceRegistry',
        'dojo/date/locale',
        'Sage/Utility',
        'Sage/Utility/Jobs',
        'dojo/text!./templates/OpportunityStatistics.html',
        'dojo/html',
        'dijit/form/Form',
        'dijit/form/Select',
        'dijit/form/Textarea',
        'dijit/layout/ContentPane',
        'dojox/layout/TableContainer'
],
function (declare, i18nStrings, _DialogHelpIconMixin, dojoLang, dijitDialog, _Widget, _Templated, Dialogs, Currency, Numeric, sDataServiceRegistry, locale, utility, jobs, template, html) {
    var opportunityStatistics = declare('Sage.MainView.Opportunity.OpportunityStatistics', [_Widget, _Templated], {
        _dialog: false,
        _selectionInfo: false,
        selectedCount: 0,
        resource: '',
        currencyDecimalDigits: 2,
        currencyCode: 'USD',
        locale: Sys.CultureInfo.CurrentCulture.name,
        isMultiCurrencyEnabled: false,
        widgetsInTemplate: true,
        widgetTemplate: new Simplate(eval(template)),
        constructor: function (selectionInfo) {
            this._selectionInfo = selectionInfo;
            this.currencyDecimalDigits = Sys.CultureInfo.CurrentCulture.numberFormat.CurrencyDecimalDigits;
            this.isMultiCurrencyEnabled = window.isMultiCurrencyEnabled(); // TODO: Remove this from the global namespace.
            dojo.mixin(this, i18nStrings);
        },
        getCurrentGroupId: function () {
          var grpContextSvc = Sage.Services.getService('ClientGroupContext');
          if (grpContextSvc) {
            var contextService = grpContextSvc.getContext();
            return contextService.CurrentGroupID;
          }
          return '';
        },
        getDefaultGroupId: function () {
          var grpContextSvc = Sage.Services.getService('ClientGroupContext');
          if (grpContextSvc) {
            var contextService = grpContextSvc.getContext();
            return contextService.DefaultGroupID;
          }
          return '';
        },
        show: function () {
            this._dialog.show();
            if (!this._dialog.helpIcon) {
                dojoLang.mixin(this._dialog, new _DialogHelpIconMixin());
                this._dialog.createHelpIconByTopic('opportunitystatistics');
            }
            var service = sDataServiceRegistry.getSDataService('mashups');
            var request = new Sage.SData.Client.SDataNamedQueryRequest(service);
            request.setApplicationName('$app');
            request.setResourceKind('mashups');
            request.uri.setCollectionPredicate("'OpportunityStatistics'");
            request.setQueryName('execute');
            request.setQueryArg('_resultName', 'OpportunityStatisticsMashup');
            request.setQueryArg('_selectionKey', this._selectionInfo.key);

            var SelectedIds = (this._selectionInfo.selectionCount > 0) ? this._selectionInfo.selectedIds.join(',') || '' : '';
            var AppliedFilters = Sys.Serialization.JavaScriptSerializer.serialize(jobs.getFiltersForJob());
            var LookupConditions = Sys.Serialization.JavaScriptSerializer.serialize(jobs.getLookupConditionsForJob());

            var groupId = this.getCurrentGroupId();
            if (groupId === "LOOKUPRESULTS") {
              groupId = this.getDefaultGroupId();
            }

            request.setQueryArg('_GroupId', groupId);
            request.setQueryArg('_SelectedIds', SelectedIds.toString());
            request.setQueryArg('_AppliedFilters', AppliedFilters.toString());
            request.setQueryArg('_LookupConditions', LookupConditions.toString());

            var self = this;
            request.read({
                success: function (data) {
                    self.resource = data.$resources[0];
                    self.selectedCount = self.resource.RecordCount;
                    self.currencyCode = self.resource.CurrencyCode;
                    html.set(self.opportunityCount,self.selectedCount.toString());
                    self.createControls();
                    var average = self.resource.DaysOpened;
                    if (self.selectedCount > 1) {
                        average = Math.round(self.resource.DaysOpened / self.selectedCount);
                    }
                    html.set(self.daysOpen_Container, average.toString());
                    dojo.addClass(self.loadingContainer, "display-none");
                    dojo.removeClass(self.statisticsContentsContainer, "display-none");
                },
                failure: function (request, status, error) {
                    Dialogs.showError(self.errorRequestingStatistics);
                }
            });
        },
        formatCurrency: function(val)
        {
            val = val.replace(" ", "", "gi");
            val = val.replace(Sys.CultureInfo.CurrentCulture.numberFormat.CurrencyDecimalSeparator, ".", "gi");
            return val;
        },
        createControls: function () {
            this.createSalesPotential();
            this.createCloseProbability();
            this.createWeightedPotential();
            this.createActualAmount();
            this.createRangeEstClose();
        },
        createSalesPotential: function () {
            this.salesPotentialTotal = new Currency({
                id: 'cur_SalesPotentialTotal',
                constraints: { places: this.currencyDecimalDigits, currency: this.currencyCode, locale: this.locale },
                exchangeRateType: 'BaseRate',
                multiCurrency: this.isMultiCurrencyEnabled,
                disabled: true,
                'class': 'textcontrol currency',
                value: this.formatCurrency(this.resource.SalesPotential)
            });
            //}, this.salesPotentialTotal_Container);
            dojo.place(this.salesPotentialTotal.domNode, this.salesPotentialTotal_Container, 'replace');

            this.salesPotentialAverage = new Currency({
                id: 'cur_SalesPotentialAverage',
                constraints: { places: this.currencyDecimalDigits, currency: this.currencyCode, locale: this.locale },
                exchangeRateType: 'BaseRate',
                multiCurrency: this.isMultiCurrencyEnabled,
                disabled: true,
                'class': 'textcontrol currency',
                value: this.formatCurrency(this.resource.SalesPotential) / this.selectedCount
            });
            dojo.place(this.salesPotentialAverage.domNode, this.salesPotentialAverage_Container, 'replace');
        },
        createCloseProbability: function () {
            this.closeProbability = new Numeric({
                id: 'num_CloseProbability',
                constraints: { places: 2 }, //maxPlaces: 2, type: 'percent', round: -1
                formatType: 'percent',
                disabled: true,
                value: this.resource.CloseProbability / this.selectedCount
            });
            dojo.place(this.closeProbability.domNode, this.closeProbability_Container.domNode, 'only');
            this.closeProbability_Container.value = this.resource.CloseProbability / this.selectedCount;

        },
        createWeightedPotential: function () {
            this.weightedPotentialTotal = new Currency({
                id: 'cur_WeightedPotentialTotal',
                constraints: { places: this.currencyDecimalDigits, currency: this.currencyCode, locale: this.locale },
                exchangeRateType: 'BaseRate',
                multiCurrency: this.isMultiCurrencyEnabled,
                disabled: true,
                'class': 'textcontrol currency',
                value: this.resource.WeightedSalesPotential
            });
            dojo.place(this.weightedPotentialTotal.domNode, this.weightedPotentialTotal_Container, 'only');

            this.weightedPotentialAverage = new Currency({
                id: 'cur_WeightedPotentialAverage',
                constraints: { places: this.currencyDecimalDigits, currency: this.currencyCode, locale: this.locale },
                exchangeRateType: 'BaseRate',
                multiCurrency: this.isMultiCurrencyEnabled,
                disabled: true,
                'class': 'textcontrol currency',
                value: this.resource.WeightedSalesPotential / this.selectedCount
            });
            dojo.place(this.weightedPotentialAverage.domNode, this.weightedPotentialAverage_Container, 'only');
        },
        createActualAmount: function () {
            this.actualAmountTotal = new Currency({
                id: 'cur_ActualAmount',
                constraints: { places: this.currencyDecimalDigits, currency: this.currencyCode, locale: this.locale },
                exchangeRateType: 'BaseRate',
                multiCurrency: this.isMultiCurrencyEnabled,
                disabled: true,
                'class': 'textcontrol currency',
                value: this.formatCurrency(this.resource.ActualAmount)
            });
            dojo.place(this.actualAmountTotal.domNode, this.actualAmountTotal_Container, 'only');

            this.actualAmountAverage = new Currency({
                id: 'cur_ActualAmountAverage',
                constraints: { places: this.currencyDecimalDigits, currency: this.currencyCode, locale: this.locale },
                exchangeRateType: 'BaseRate',
                multiCurrency: this.isMultiCurrencyEnabled,
                disabled: true,
                'class': 'textcontrol currency',
                value: this.formatCurrency(this.resource.ActualAmount) / this.selectedCount
            });
            dojo.place(this.actualAmountAverage.domNode, this.actualAmountAverage_Container, 'only');
        },
        createRangeEstClose: function () {
            var minDate = locale.format(utility.Convert.toDateFromString(this.resource.MinDateEstClosed, true), { fullYear: true, selector: 'date', locale: Sys.CultureInfo.CurrentCulture.name });
            var maxDate = locale.format(utility.Convert.toDateFromString(this.resource.MaxDateEstClosed, true), { fullYear: true, selector: 'date', locale: Sys.CultureInfo.CurrentCulture.name });
            html.set(this.rangeEstClose_Container, dojo.string.substitute('${0} - ${1}', [minDate, maxDate]));
        },
        _close: function () {
            this._dialog.hide();
            this._dialog.destroyRecursive();
            this.destroyRecursive();
            this.salesPotentialTotal.destroy();
            this.salesPotentialAverage.destroy();
            this.closeProbability.destroy();
            this.weightedPotentialTotal.destroy();
            this.weightedPotentialAverage.destroy();
            this.actualAmountTotal.destroy();
            this.actualAmountAverage.destroy();
        }
    });
    return opportunityStatistics;
});
