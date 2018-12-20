/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/PickList", [
    'Sage/UI/Controls/PickList',
    'Sage/UI/Controls/DropDownSelectPickList',
    'Sage/Data/BaseSDataStore',
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang'
],
function (pickList, dropDownSelectPickList, baseSDataStore, declare, dArray, lang) {
    var widget = declare('Sage.UI.Controls.GridParts.Columns.PickList', null, {
        widgetClass: dropDownSelectPickList,
        /**
        * @property {object} storeData Data fetched from SData stored here.
        */
        storeData: null,
        pickList: null,
        storageMode: 'id', //Default for column picklist
        displayMode: 'AsText', //Default for column picklist formatting
        constructor: function (args) {
            lang.mixin(this, args);
            this.inherited(arguments);
            if (this.storageMode === 'id' || this.storageMode === 'code') {
                if (this.pickListName && this.storeData === null) {
                    this._loadPickList();
                }
            }
        },
        format: function (val, data) {
            if (this.storageMode === 'id') {
                val = this.getStoreTextById(val);
            }
            if (this.storageMode === 'code') {
                val = this.getStoreTextByCode(val);
            }
            return (typeof val !== 'undefined' ? val : '');
        },
        _loadPickList: function () {
            var deferred = new dojo.Deferred();
            var config = {
                pickListName: this.pickListName, // Required
                canEditText: false,
                itemMustExist: true,
                maxLength: -1,
                storeMode: this.storageMode, // text, id, code
                sort: false,
                displayMode: this.displayMode,
                async: false
            };
            this.pickList = new pickList(config);
            this.pickList.getPickListData(deferred);

            deferred.then(lang.hitch(this, this._loadData), function (e) {
                console.error(e); // errback
            });

        },
        getStoreTextById: function (val) {
            var result = val;
            if (this.storeData) {
                //If the value is not found as an id in the list, return the value back.
                dArray.some(this.storeData.items, function (item) {
                    if (item.id === val) {
                        result = item.text;
                    }
                }, this);
            }
            return result;
        },
        getStoreTextByCode: function (val) {
            var result = val;
            if (this.storeData) {
                //If the value is not found as a code in the list, return the value back.
                dArray.some(this.storeData.items, function (item) {
                    if (item.code === val) {
                        result = item.text;
                    }
                }, this);
            }
            return result;
        },
        _loadData: function (data) {
            var items = [];
            for (var i = 0; i < data.items.$resources.length; i++) {
                var item = data.items.$resources[i];
                items.push({
                    id: item.$key,
                    code: item.code,
                    number: item.number,
                    text: item.text
                });
            }
            this.storeData = {
                identifier: 'id',
                label: 'text',
                items: items
            };
        }
    });

    return widget;
});