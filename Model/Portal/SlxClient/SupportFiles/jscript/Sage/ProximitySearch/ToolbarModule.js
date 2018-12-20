/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/ToolbarModule", [
    'dijit/_Widget',
    'dijit/_Templated',
    'dojo/_base/declare',
    'Sage/ProximitySearch/Events',
    'dojo/_base/lang',
    'dojo/i18n!./nls/ToolbarModule'
],
function (_Widget, _Templated, declare, Events, lang, ToolbarModule) {
    var toolbarModule = declare("Sage.ProximitySearch.ToolbarModule", [_Widget, _Templated], {
        // Localization
        getDirectionsText: ToolbarModule.getDirectionsText,
        addPlaceText: ToolbarModule.addPlaceText,
        selectAllText: ToolbarModule.selectAllText,
        deselectAllText: ToolbarModule.deselectAllText,

        templateString: "<div style='text-align: center'>" +
            "<div style='padding: 10px 0px;'>" +
            "<div dojoType='dijit.form.Button' dojoAttachEvent='onClick:getDirectionsClick'>${getDirectionsText}</div>" +
            "<div dojoType='dijit.form.Button' dojoAttachEvent='onClick:addPointClick'>${addPlaceText}</div><br>" +
            "</div><div>" +
            "<div dojoType='dijit.form.Button' dojoAttachEvent='onClick:selectAllClick'>${selectAllText}</div>" +
            "<div dojoType='dijit.form.Button' dojoAttachEvent='onClick:deselectAllClick'>${deselectAllText}</div>" +
            "</div>",
        widgetsInTemplate: true,
        initModule: function (sb) {
            this._sandbox = sb;
            this.startup();
            sb.subscribe(Events.MapRefresh, this.onMapRefresh);
        },
        onMapRefresh: function (data) {
            this._mapData = data;
        },
        addPointClick: function (event) {
            this._sandbox.publish(Events.SelectionNew);
            return false;
        },
        getDirectionsClick: function (event) {
            this._sandbox.publish(Events.RouteCalculate);
            return false;
        },
        selectAllClick: function (event) {
            var des = this._mapData.getDeselected();
            des = des.slice(0);
            this._sandbox.publish(Events.SelectionAdd, des);
            return false;
        },
        deselectAllClick: function (event) {
            var des = this._mapData.getSelected();
            des = des.slice(0);
            this._sandbox.publish(Events.SelectionRemove, des);
            return false;
        }
    });
    return toolbarModule;
});
