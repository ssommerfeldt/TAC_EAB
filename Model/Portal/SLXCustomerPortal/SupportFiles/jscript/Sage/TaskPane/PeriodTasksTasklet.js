/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/PeriodTasksTasklet", [
    'dojo/_base/lang',
    'dojo/i18n!./nls/PeriodTasksTasklet',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/TaskPane/TaskPaneContent',
    'dojo/_base/declare',
	'Sage/MainView/ExchangeRate/ExchangeRateDialog',
    'dojo/_base/Deferred', 
    'dojo/string',
    'Sage/MainView/ReportMgr/ReportWizardController',
    'Sage/Reporting/Enumerations',
    'Sage/Utility',
    'Sage/UI/Dialogs',
    'Sage/Data/SDataServiceRegistry',
    'Sage/MainView/IntegrationContract/PromoteWidget',
    'Sage/Utility/PricingAndAvailability',
    'Sage/MainView/IntegrationContract/PricingAvailabilityWidget'
],
function (lang, i18nStrings, _BaseTaskPaneTasklet, TaskPaneContent, declare,ExchangeRateDialog, deferred, dString, reportWizardController, enumerations, utility, dialogs, sDataServiceRegistry,
    PromoteWidget, pricingAndAvailability, PricingAvailabilityWidget) {
    var PeriodTasksTasklet = declare('Sage.TaskPane.PeriodTasksTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {
        taskItems: [],
		baseCurrency: null,
		widgetTemplate: new Simplate([
            '<div dojoAttachPoint="taskletContainerNode" class="task-pane-item-common-tasklist">',
            '{% for (var i = 0; i < $.taskItems.length; i++) { ',
            'var task = $.taskItems[i]; %}',
            '<div data-dojo-type="Sage.TaskPane.TaskPaneItem" linkText="{%= task.displayName %}" securedAction="{%= task.securedAction %}" action="javascript: {%= task.clientAction %}"></div>',
            '<br />',
            '{% } %}',
			'<span class="task-pane-item-common-selectionText"><label id="lblCurrency" dojoAttachPoint="lblCurrency"></label>' + ': ' + ' <label id="currency"></label></span>&nbsp;<br>',
            '</div>'
        ]),
        constructor: function() {
            dojo.mixin(this, i18nStrings);
			if (utility.getModeId() !== 'detail') {
				this.taskItems = [
					{
						taskId: 'UpdateExchangeRates',
						type: "Link",
						displayName: this.lblupdateExchRate,
						securedAction: 'Entities/Period/DatedExchangeRate/View',
						clientAction: 'periodTasksActions.updateExchangeRates();'
					},
					{
						taskId: 'BaseCurrency',
						displayName: this.lblBaseCurrency
					}
				];
			}
        },
		postCreate: function() {
			var callback = this._receivedBaseCurrency;
            var selfContext = this;
            var systemOptions = Sage.Services.getService('SystemOptions');
            if (systemOptions) {
                systemOptions.get('BaseCurrency',
                    function (v) {
                        callback(v, selfContext);
                    });
            }
		},
        setupRatesPeriod: function () {
			window.location.href = 'SetupExchangeRatePeriod.aspx';
        },
        updateExchangeRates: function () {
            var dialog = new ExchangeRateDialog(this.baseCurrency);
            dialog.show();
        },
		_receivedBaseCurrency: function (value, selfContext) {
            var currency = dojo.byId('currency');
            if (currency) {
                selfContext.baseCurrency = value;
                currency.innerHTML = value;
            }
            var lblCurrency = dojo.byId('lblCurrency');
            if (lblCurrency) {
                lblCurrency.innerHTML = selfContext.lblBaseCurrency;
            }
        },
		_updateProgressText: function(){
			var service = sDataServiceRegistry.getSDataService('dynamic');
			var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
						.setResourceKind("Periods")
						.setOperationName("CompletePeriodSetup");
			var entry = {
				"$name": "CompletePeriodSetup",
				"request": {
					"PeriodId": utility.getCurrentEntityId()
				}
			};
			var self = this;
			request.execute(entry, {
				async: false,
				success: lang.hitch(this, function (data) {
					var result = data.response.Result;
					var displayMessage = "";
					if (result) {
						if(result === "InProcess")
						{
							self.taskItems.push(
							{
								taskId: 'ProcessText'
							});
							displayMessage = self.lblDisplaySetupProgress;
						}
						else if(result === "Error"){
							self.taskItems.push(
							{
								taskId: 'ProcessText'
							});
							displayMessage = self.lblErrorInSetup;
						}
						dojo.byId("PeriodAction").style.pointerEvents = "none";
					}else{
						displayMessage = '';
						dojo.byId("PeriodAction").style.pointerEvents = "";
					}
					var lblProgress = dojo.byId("lblProgress");
					if (lblProgress) {
						lblProgress.style.backgroundColor = "Yellow";
						lblProgress.innerHTML = displayMessage;
					}
				}),
				failure: function (result) {
					dialogs.showError(result);
				}
			});
		}
    });
    return PeriodTasksTasklet;
});