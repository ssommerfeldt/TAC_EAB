/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/CountryTasksTasklet", [
    'dojo/i18n!./nls/CountryTasksTasklet',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/TaskPane/TaskPaneContent',
    'Sage/MainView/CountryCodeMapping/CountryAliasConversion',
    'dojo/_base/declare',
    'Sage/Utility',
    'dojo/string',
    'Sage/Data/SDataServiceRegistry',
    'Sage/UI/Dialogs',
    'dijit/registry'
],
function (i18nStrings, _BaseTaskPaneTasklet, TaskPaneContent, CountryAliasConversion, declare, utility, dString, sDataServiceRegistry, dialogs, registry) {
    var countryTasksTasklet = declare('Sage.TaskPane.CountryTasksTasklet', [_BaseTaskPaneTasklet, TaskPaneContent], {
        taskItems: [],
        constructor: function () {
            dojo.mixin(this, i18nStrings);
                this.taskItems = [
                    {
                        taskId: 'CountryAliasConversion',
                        type: "Link",
                        displayName: this.countryAliasConversionTitle,
                        clientAction: 'countryTasksActions.CountryAliasConversion();',
                        securedAction: 'Entities/CountryCodeMapping/Edit'
                    }
                ];            
        },
        CountryAliasConversion: function () {
            var dialog = registry.byId('dlgCountryAliasConversion');
                if (!dialog) {
                    dialog = new CountryAliasConversion();
                    dialog.startup();
                }
                dialog.show();
        }
    });
    return countryTasksTasklet;
});