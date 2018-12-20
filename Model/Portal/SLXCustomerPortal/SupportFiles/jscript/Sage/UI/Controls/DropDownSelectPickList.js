require({cache:{
'url:Sage/UI/Controls/templates/DropDownSelectPickList.html':"<div>\r\n    <select id=\"${id}-Select\" data-dojo-type=\"Sage.UI.ComboBox\" shouldPublishMarkDirty=\"false\" dojoAttachPoint=\"comboBox\" value=\"${value}\" dojoAttachEvent=\"onBlur: _onBlur,onChange:_onChange\">\r\n    </select>\r\n</div>\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */

/**
 * @class Sage.UI.Controls.DropDownSelectPickList
 *  Class for dropdown select picklists. Used in search condition widgets.
 */
define("Sage/UI/Controls/DropDownSelectPickList", [
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_Widget',
    'dijit/form/ComboBox',
    'dojo/data/ItemFileReadStore',
    'Sage/UI/Controls/PickList',
    'dojo/_base/array',
    'dojo/text!./templates/DropDownSelectPickList.html',
    'dojo/_base/declare'
],
function (_TemplatedMixin, _WidgetsInTemplateMixin, _Widget, comboBox, itemFileReadStore, pickList, array, template, declare) {
    var widget = declare('Sage.UI.Controls.DropDownSelectPickList', [pickList, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        /**
         * Takes the following options object: 
         * {
         *  pickListName: 'PickListName', // Required
         *  storeOptions: {}, // Optional
         *  dataStore: {}, // Option
         *  canEditText: false,
         *  itemMustExist: true,
         *  maxLength: -1,
         *  storeMode: 'text', // text, id, code
         *  sort: true,
         *  displayMode: 'AsControl',
         *  clientId: 'ASP.NET Control ClientID Here',
         *  required: false
         * }
         */
        constructor: function(options) {
            if (options.clientId) {
                this.id = options.clientId + '-DropDownSelectPickList';
            }
            this.lastValidValue = options.value;
            this.inherited(arguments);
        },
        postCreate: function () {            
            this.inherited(arguments);
        },
        _onChange: function (newVal) {
            if (this.storeData) {
                var val = this.comboBox.get('value');
                if (val != this.initialValue) {
                    if (this.get('itemMustExist')) {
                        var valid = dojo.some(this.storeData.items, function (item) {
                            if (item.text == newVal || newVal == '') { // jshint ignore:line
                                return true;
                            } else {
                                return false;
                            }
                        }, this);
                        if (valid) {
                            this.lastValidValue = newVal;
                        }
                        if (!valid) {
                            if (this.lastValidValue !== 'undefined' && this.lastValidValue !== null) {
                                this.comboBox.set('value', this.lastValidValue);
                                return;
                            }
                        }
                    }
                    if (this.comboBox.isValid()) {
                        var code = '',
                            id = '';
                        dojo.forEach(this.storeData.items, function (item) {
                            if (item.text == val) {
                                code = item.code;
                                id = item.id;
                            }
                        }, this);
                        this.setASPNETInputs(val, code, id);
                    }
                }
            }
            this.onChange(this.lastValidValue);
        },
        _loadData: function() {
            if (this.nodataload) {
                return;
            }
            var def = new dojo.Deferred();
            this.getPickListData(def);

            def.then(dojo.hitch(this, this.setItems), function (e) {
                console.error(e);
            });
        },
        setItems: function(data) {
                if (typeof data === 'string') {
                    this.initialValue = data;
                    this.comboBox.set('value', data);
                }

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

                var tempStore = new itemFileReadStore({ data: this.storeData });
                this.comboBox.set('store', tempStore);
                this.comboBox.set('searchAttr', 'text');
        },
        uninitialize: function() {
            this.inherited(arguments);
        },
        _getValueAttr: function() {
            var results = this.comboBox.get('value');
            if (this.storeMode === 'id') {
                array.forEach(this.storeData.items, function (item) {
                    // donotlint
                    if (results == item.text) {
                        results = item.id;
                    }
                }, this);
            }
            return results;
        },
        _setPickListNameAttr: function() {
            this.inherited(arguments);
            this._loadData();
        },
        value: '',
        // Display properties
        templateString: template,
        widgetsInTemplate: true,
        /**
         * @property {object} storeData Data fetched from SData stored here.
         */
        storeData: null,
        // TODO: Remove
        /**
         * @property {string} lastValidValue Last valid value entered into the control.
         */
        lastValidValue: '',
        onChange: function (newVal) { }
    });
    return widget;
});