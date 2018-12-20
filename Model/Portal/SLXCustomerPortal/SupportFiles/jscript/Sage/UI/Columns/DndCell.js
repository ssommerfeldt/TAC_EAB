require({cache:{
'url:Sage/UI/Columns/templates/DndCell.html':"<div>\r\n    <div data-dojo-type=\"dojo.dnd.Source\" dojoAttachPoint=\"sourceNode\" copyOnly=\"true\" accept=\"\">\r\n        <div class=\"dojoDndItem\" dojoAttachPoint=\"dndItem\"></div>\r\n    </div>\r\n</div>\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Columns/DndCell", [
    'dijit/_Widget',
    'dijit/_Templated',
    'dojo/dnd/Source',
    'dojo/text!./templates/DndCell.html',
    'dojo/_base/declare'
],
function (_Widget, _Templated, Source, template, declare) {
    var widget = declare('Sage.UI.Columns.DndCell', [_Widget, _Templated], {
        templateString: template,
        widgetsInTemplate: true,
        value: null,
        index: -1,
        constructor: function (options) {
            this.inherited(arguments);
        },
        postCreate: function () {
            this.dndItem.innerHTML = this.get('value');
            this.dndItem.type = 'cell';
            this.dndItem.data = {
                value: this.get('value'),
                index: this.index
            };
            this.inherited(arguments);
        }
    });
    return widget;
});