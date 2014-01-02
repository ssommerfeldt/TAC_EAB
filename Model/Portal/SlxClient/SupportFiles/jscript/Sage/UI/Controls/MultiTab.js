/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
        'dojo/_base/declare',
        'dojo/ready',
        'dojo/aspect',
        'dijit/layout/TabContainer'
],
function (declare, ready, aspect, TabContainer) {
    //summary
    // Override of dijit layout TabContainer.
    var multiTab = declare('Sage.UI.Controls.MultiTab', [TabContainer], {
        region: 'center',
        tabStrip: false,
        destroyRecursive: function () {
            if (this.tablist) {
                this.tablist.destroy();
            }
            this.inherited(arguments);
        },
        postCreate: function () {
            var parentContainerId = this.domNode.parentNode.id,
               parentContainer = dijit.byId(parentContainerId),
               that = this;
            
            parentContainer.resize();
            setTimeout(function() {
                parentContainer.resize();
                if(that.selectedChildWidget) {
                    that._showChild(that.selectedChildWidget);
                }
            }, 50);
        }
    });


    return multiTab;
});