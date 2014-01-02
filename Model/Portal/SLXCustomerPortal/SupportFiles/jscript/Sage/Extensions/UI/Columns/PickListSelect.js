/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'dojo/_base/declare',
    "dojox/grid/cells/_base",
     "Sage/UI/Controls/PickList",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/dom-attr",
    "dojo/data/ItemFileReadStore"
    
],
function (declare, Select, PickList, array, lang, domAttr, ItemFileReadStore) {
    var PickListSelect = declare("Sage.Extensions.UI.Columns.PickListSelect", dojox.grid.cells.Select, {
       
        storeData: null,
        pickList: null,
        storageMode: 'id', //Default for column picklist
        displayMode: 'AsText', //Default for column picklist formatting
        constructor: function (args) {
            this.inherited(arguments);
            if (this.storageMode === 'id' && this.displayMode === 'AsText') {
                if (this.pickListName) {
                   this._loadPickList();
                }
            }
        },
     
        _loadPickList: function () {
            var deferred = new dojo.Deferred();
            var config = {
                pickListName: this.pickListName, // Required
                // storeOptions: {}, // Optional
                // dataStore: {}, // Optional
                canEditText: false,
                itemMustExist: true,
                maxLength: -1,
                storeMode: this.storageMode, // text, id, code
                sort: false,
                displayMode: this.displayMode
            };
            this.pickList = new PickList(config);
            this.pickList.getPickListData(deferred);
            deferred.then(dojo.hitch(this, this._loadData), function (e) {
                console.error(e); // errback
            });

        },
        _loadData: function (data) {
            var items = [];
            var values = [];
            var options = [];
            for (var i = 0; i < data.items.$resources.length; i++) {
                var item = data.items.$resources[i];
                options.push(item.text);
                values.push(item.code);
            }

            this.options = options;
            this.values = values || options;

        }
    });
  
    return PickListSelect;
});