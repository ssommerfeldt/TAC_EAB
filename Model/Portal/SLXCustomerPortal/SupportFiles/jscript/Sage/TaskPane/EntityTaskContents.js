/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/EntityTaskContents", [
    'dijit/_Widget',
    'Sage/_Templated',
    'dojo/_base/declare',
    'Sage/MainView/EntityMgr/EntityWizard/EntityWizardController'
],
function(
   _Widget,
   _Templated,
   declare,
   entityWizardController
){     
    var entityTaskContents = declare('Sage.TaskPane.EntityTaskContents', [_Widget, _Templated], {
        widgetsInTemplate: true,
        templateLocation: '', 
        templateString: '', 
        widgetTemplate: '',
        constructor: function(config) {
            this.widgetTemplate = config.taskTemplate;
            dojo.subscribe('/sage/ui/list/selectionChanged', function (listPanel) {
                    var countSpan = dojo.byId('selectionCount');
                    if (countSpan) {
                        countSpan.innerHTML = listPanel.getTotalSelectionCount();
                    }
                });
        },
        _clearSelection: function(e){
            var listPanel = dijit.byId('list');
            if (listPanel) {
                listPanel.clearSelection();
             }            
        },
        createNewEntity: function () {
            var entityWizard = new entityWizardController();
            entityWizard.startWizard();
        }

    });
    return entityTaskContents;
});