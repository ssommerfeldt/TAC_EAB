/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/ExchangeRateTasksTasklet", [
    'dojo/i18n!./nls/ExchangeRateTasksTasklet',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/MainView/ExchangeRate/ExchangeRateDialog',
    'dojo/_base/declare',
    'Sage/TaskPane/TaskPaneItem',
    'dojo/string',
    'dijit/_Widget',
    'Sage/_Templated',
    'Sage/Utility'
],
function (nlsResources, _BaseTaskPaneTasklet, ExchangeRateDialog, declare, TaskPaneItem, dojoString, _Widget, _Templated, utility) {
    var exchangeRateTasksTasklet = declare('Sage.TaskPane.ExchangeRateTasksTasklet', [_BaseTaskPaneTasklet, _Widget, _Templated], {
        nlsResources: nlsResources,
        taskItems: [],
        widgetsInTemplate: true,
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
        constructor: function () {
			if (utility.getModeId() !== 'detail') {
				this.taskItems = [
					{
						taskId: 'UpdateExchangeRates',
						type: "Link",
						displayName: this.nlsResources.lblupdateExchRate,
						securedAction: 'Entities/ExchangeRate/View',
						clientAction: 'exchangeRateTasksActions.updateExchangeRates();'
						
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
                lblCurrency.innerHTML = selfContext.nlsResources.lblBaseCurrency;
            }
        }
    });
    return exchangeRateTasksTasklet;
});