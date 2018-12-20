require({cache:{
'url:Sage/UI/Controls/templates/MultiSelectPickList.html':"<div>\r\n    <input id=\"${id}-TextBox\" data-dojo-type=\"dijit.form.ValidationTextBox\" data-dojo-attach-point=\"textNode\" data-dojo-attach-event=\"onBlur: _onTextBlur\" tabindex=\"${tabIndex}\"/>\r\n    <div id=\"${id}-Button\" data-dojo-type=\"dijit.form.DropDownButton\" data-dojo-attach-point=\"dropDownButtonNode\">\r\n        <span></span>\r\n        <div class=\"multiSelectPickListDialog\" id=\"${id}-ToolTipDialog\" data-dojo-type=\"dijit.TooltipDialog\" data-dojo-attach-point=\"tooltipDialogNode\" data-dojo-attach-event=\"onClose: _onTooltipClose, onShow: _onTooltipShow\">\r\n            <div data-dojo-attach-point=\"tooltipContainer\" style=\"height:200px; width: 200px; overflow-y:auto;\">\r\n            \r\n            </div>\r\n            \r\n            <div style=\"width: 100%; text-align:right\">\r\n                <p>\r\n                    <button id=\"${id}-OKButton\" data-dojo-type=\"dijit.form.Button\" type=\"submit\" tabindex=\"${tabIndex}\">${okText}</button>\r\n                <p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
/**
 * @class Sage.UI.Controls.MultiSelectPickList
 */
define("Sage/UI/Controls/MultiSelectPickList", [
       'dojo/_base/array',
       'dijit/_TemplatedMixin',
       'dijit/_WidgetsInTemplateMixin',
       'dijit/_Widget',
       'dijit/form/ValidationTextBox',
       'dijit/form/DropDownButton',
       'dijit/form/CheckBox',
       'dijit/TooltipDialog',
       'dijit/form/Button',
       'Sage/UI/Controls/PickList',
       'dojo/text!./templates/MultiSelectPickList.html',
       'dojo/_base/declare',
       'dojo/_base/lang'
],
function (array, _TemplatedMixin, _WidgetsInTemplateMixin, _Widget, TextBox, DropDownButton, CheckBox, TooltipDialog, Button, PickList, template, declare, lang) {
    var widget = declare('Sage.UI.Controls.MultiSelectPickList', [PickList, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {

        /**
         * Takes the following options object: 
         * {
         *  pickListName: 'PickListName', // Required
         *  storeOptions: {}, // Optional
         *  dataStore: {}, // Optional
         *  canEditText: false,
         *  itemMustExist: true,
         *  maxLength: -1,
         *  storeMode: 'text', // text, id, code
         *  sort: true,
         *  displayMode: 'AsControl',
         *  clientID: 'ASP.NET Control ClientID Here',
         *  required: false,
         *  tabIndex: 0
         * }
         *
         * @constructor
         */
        cssClass: "",
        constructor: function(options) {
            if(options.clientId) {
                this.id = options.clientId + '-MultipleSelectPickList';
            }
            if (options.cssClass) {
                this.cssClass = options.cssClass;
            }

            this.inherited(arguments);
        },
        postCreate: function() {
            this._setupTooltips(this.dropDownButtonNode.domNode, this.textNode.domNode);
            var len;
            if (this.required) { this.textNode.required = true; }
            this._loadData();

            // Adjust control according to properties set in AA

            // Disable textbox to prevent edit
            if(this.get('canEditText') === false) {
                this.textNode.disabled = true;
            }

            len = this.get('maxLength');
            if(len > 0) {
                this.textNode.set('maxLength', len);
            }

            if(this.get('itemMustExist')) {
                this.textNode.isValid = lang.hitch(this, function(isFocused) {
                    var currentVal = this.textNode.get('value');
                    var split = currentVal.split(',');
                    var valid = false;

                    if (split.length === 1 && split[0] === '' && !this.required) {
                        // We split on an empty string (no selection), and the value was not required, so allow it
                        valid = true;
                    } else {
                        //If every item in the multi-select picklist has a matching item in the store return 'true', else 'false'.
                        valid = array.every(split, function (itemText) {
                            var returnValue = false;
                            var searchFor = itemText.trim();
                            var x = 0;
                            for (x = 0; x < this.storeData.items.length; x++) {
                                var comparValue = this.storeData.items[x].text.trim();
                                if (searchFor === comparValue) {
                                    returnValue = true;
                                    break;
                                }
                            }
                            return returnValue;
                        }, this);
                    }

                    if(valid) {
                        this.lastValidValue = currentVal;
                    }

                    if(isFocused) {
                        valid = true;
                    }

                    if(!valid) {
                        // Attempt to restore last valid value.
                        if (this.lastValidValue) {
                            currentVal = this.lastValidValue;
                            valid = true;
                        }
                    }
                    return valid;
                });
            } else {
                this.textNode.isValid = function (isFocused) {
                    if (this.required === true && this.value === '') { return false; }
                    return true;
                };
            }

            if (this.cssClass && this.cssClass.length > 0) {
                this.textNode.domNode.className = this.cssClass + ' ' + this.textNode.domNode.className;
            }

            this.inherited(arguments);
        },
        uninitialize: function() {
            this.inherited(arguments);
        },
        /**
         * Returns true if item has been entered and is displayed in the textbox.
         * @function
         */
        _isItemSelected: function(itemToCheck) {
            var currentVal = this.textNode.get('value'),
                results = false,
                split = [];

            if(currentVal) {
                split = currentVal.split(',');
                array.forEach(split, function (item, index, array) {
                    if(itemToCheck.text.trim() === item.trim()) {
                        results = true;
                    }

                }, this);
            }

            return results;
        },
        /**
         * Returns true if the store has an item with the itemText.
         * @function
         */
        _storeHasItem: function(itemText) {
            var results = false;
            if (this.storeData) {
                results = array.some(this.storeData.items, function (item) {
                    if (item.text.trim() === itemText.trim()) {
                        return true;
                    }
                    return false;
                }, this);
            }

            return results;
        },

        /**
         * Renders form elements in the tooltip dialog.
         * @function
         */
        _renderFormElements: function (items) {

            this._destroyItems();

            var node = this.tooltipContainer;

            array.forEach(items, function (item, index, array) {
                var checkBox = new CheckBox({
                    id: this.id + '_checkBox' + index,
                    name: 'checkBox_' + item.text,
                    value: item.text,
                    checked: this._isItemSelected(item)
                }),
                    label;

                checkBox.startup();

                dojo.place(checkBox.domNode, node, 'last');

                label = dojo.create('label',{'for': checkBox.id},checkBox.domNode,'after');

                label.innerHTML = item.text;

                dojo.create('br', {}, label, 'after');


            }, this);
        },
        _onTextBlur: function() {
            this._updateASPNETFields();
        },
        _updateASPNETFields: function() {
            // Send the values to the hidden ASP.NET fields if we are valid, and the value actually changed.
            if(this.textNode.isValid()) {
                var val = this.textNode.get('value');
                if(val.trim() !== this.initialValue.trim()) {
                    this.setASPNETInputs(val, '', '');// TODO: Do we need to pass in array of id's here too?
                    this._onChange(val);
                }
            }
        },
        _onTooltipClose: function() {
            // Update text with what was checked + custom entered data.
            var items = [];
            dojo.query('input', this.tooltipContainer).forEach(function(node) {
                var wid = dijit.byId(node.id),
                    val,
                    checked;
                if(wid) {
                    val = wid.get('value');
                    checked = wid.get('checked');
                    if(checked) {
                        items.push(val);
                    }
                }
            });

            // Add in items not in store
            array.forEach(this.itemsNotInStore, function (itemText) {
                items.push(itemText.trim());
            }, this);

            this.textNode.set('value', items.join(', '));
            this._updateASPNETFields();
        },
        _onTooltipShow: function() {
            this._refreshCheckedItems();
            this._refreshItemsNotInStore();
        },
        /**
         * Refreshes the itemsNotInStore array with what is currently in the textbox and NOT in the store.
         * @function
         */
        _refreshItemsNotInStore: function() {
            var currentVal = this.textNode.get('value'),
                itemsInText = currentVal.split(',');
            this.itemsNotInStore = [];// clear 

            array.forEach(itemsInText, function (item, index, array) {
                if(!this._storeHasItem(item.trim())) {
                    if(item.trim() !== '') {
                        this.itemsNotInStore.push(item.trim());
                    }
                }
            }, this);
        },
        /**
         * Iterates the items in the store, and sets the checked value on the checkbox as needed.
         * @function
         */
        _refreshCheckedItems: function() {
            // un-check everything 
            dojo.query('input', this.tooltipContainer).forEach(function(node) {
                var wid = dijit.byId(node.id);
                if(wid) {
                    wid.set('checked', false);
                }
            });
            if (!this.storeData) {
                return;
            }
            array.forEach(this.storeData.items, function (item, index, array) {
                if(this._isItemSelected(item)) {
                    dojo.query('input', this.tooltipContainer).forEach(function(node) {
                        var wid = dijit.byId(node.id);
                        if(wid) {
                            if(node.value.trim() === item.text.trim()) {
                                wid.set('checked', true);
                            }
                        }
                    });
                }
            }, this);

        },
        // Display properties
        templateString: template,
        widgetsInTemplate: true,

        /**
         * @property {object} storeData Data fetched from SData stored here.
         */
        storeData: null,

        /**
         * @property {string} lastValidValue Last valid value entered into the control.
         */
        lastValidValue: '',

        /**
         * @property {string} lastValidValues Last valid values entered into the control. Split from comma delimited lastValidValue string.
         */
        lastValidValues: null,

        /**
         * @property {string} initialValue Initial value set to the control, if any.
         */
        initialValue: '',

        /**
         * @property {array} initialValues Initial value is a comma separated list, this array holds the split values.
         */
        initialvalues: null,

        /**
         * @property {array} itemsNotInStore Array of items that were entered but don't exist in the store.
         */
        itemsNotInStore: null,
        _setPickListNameAttr: function (value) {
            this.inherited(arguments);
            this._loadData();
        },
        _getValueAttr: function () {
            return this.textNode.get('value');
        },
        _setValueAttr: function (value) {
            this.textNode.set('value', value);
            if (value) {
                this.initialValue = value;
                this.initialValues = value.split(',');
                this.lastValidValues = value.split(',');
            }
        },
        _onChange: function (newVal) {
            this.onChange(newVal);
        },
        _loadData: function () {
            var def = new dojo.Deferred();
            def.then(lang.hitch(this, function (data) {
                if (typeof data === 'string') {
                    this.textNode.set('value', data);
                    this.dropDownButtonNode.disabled = true;
                }

                var items = [],
                    len = data && data.items && data.items.$resources && data.items.$resources.length,
                    i,
                    item,
                    existingText;
                for (i = 0; i < len; i++) {
                    item = data.items.$resources[i];
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

                existingText = dojo.byId(this._textId);
                if (items[0]) {
                    if (existingText) {
                        this.lastValidValue = existingText.value;
                        this.initialValue = this.lastValidValue;
                    } else {
                        if (items.length > 0) {
                            this.lastValidValue = items[0].text;
                        }
                    }

                    this.textNode.set('value', this.lastValidValue);
                    this.initialValues = this.lastValidValue.split(',');
                    this.lastValidValues = this.lastValidValue.split(',');

                    this._renderFormElements(items);
                }

            }), function (e) {
                // errback
                console.error(e);
            });
            this.getPickListData(def);
        },
        _destroyItems: function () {
            dojo.query('input', this.tooltipContainer).forEach(function (node) {
                var wid = dijit.byId(node.id);
                if (wid) {
                    wid.destroyRecursive();
                }
            });
            dojo.empty(this.tooltipContainer);
        },
        onChange: function (newVal) {
        }

    });

    return widget;
});

