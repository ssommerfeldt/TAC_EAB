/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntitySDataSummaryFormatterScope", [
    'Sage/UI/SummaryFormatterScope',
    'Sage/MainView/EntityMgr/EntitySDataDetailViewDataManager',
    'dojo/_base/declare',
    'dojo/_base/lang'
],
function (SummaryFormatterScope, EntitySDataDetailViewDataManager, declare, lang) {
    var entitySDataSummaryFormatterScope = declare('Sage.MainView.EntityMgr.EntitySDataSummaryFormatterScope', [SummaryFormatterScope], {
        constructor: function (args) {
            lang.mixin(this, args);
            this.widgets = [];
            this.preFetchResources();
            this._setupDataManager();
        },
        _setupDataManager: function () {
            this.dataManager = new EntitySDataDetailViewDataManager(this.requestConfiguration);
            if (Sage.Services.hasService('SummaryViewDataManager')) {
                Sage.Services.removeService('SummaryViewDataManager');
            }
            Sage.Services.addService('SummaryViewDataManager', this.dataManager);
        }
    });
    return entitySDataSummaryFormatterScope;
});