/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/LookupControl", [
        'Sage/UI/ComboBox',
        'dojo/_base/declare',
        'dojo/_base/lang',
        'Sage/Data/BaseSDataStore',
        'Sage/Data/SDataServiceRegistry',
        'dojo/string',
        'Sage/Utility'
],
function (comboBox, declare, lang, BaseSDataStore, sDataServiceRegistry, string, Utility) {
    var widget = declare("Sage.UI.Controls.GridParts.Columns.LookupControl", [comboBox], {
        constructor: function (args) {
            lang.mixin(this, args);
            this.inherited(arguments);
        },
        startup: function (args) {
            lang.mixin(this, args);
            var storeOptions = {
                select: [this.lookupOptions.field.replace(/\./g, '/')],
                service: sDataServiceRegistry.getSDataService('dynamic')
            };
            lang.mixin(storeOptions, this.lookupStoreOptions);

            this.store = new BaseSDataStore(storeOptions);

            if (this.lookupOptions) {
                var condition = '';
                //Set seed values in query conditions
                if (this.lookupOptions.seedOnRowEntity) {
                    condition = string.substitute('Id eq "${0}"', [this.row.data.$key]);
                }
                if (this.lookupOptions.seedOnRelatedEntity !== '') {
                    condition = string.substitute(' ${0}.Id eq "${1}" ', [this.lookupOptions.seedOnRelatedEntity, this.row.data[this.lookupOptions.seedOnRelatedEntity].$key]);
                }
                this.store.directQuery = { conditions: condition };

                var queryFunc;
                // Check if there is a conditional where/contextual condition attached to the grid options.
                // If display mode is 0, then there is no grid in this first integration.
                // Future integration will include a grid in line.
                if (typeof this.lookupGridOptions.contextualCondition === 'function') {
                    queryFunc = { fn: this.lookupGridOptions.contextualCondition, scope: this };
                    this.store.directQuery = Utility.extend(true, this.store.directQuery, queryFunc);
                }
            }
            this.set('store', this.store);
            this.inherited(arguments);
        },
        filter: function (data) {
            if (typeof data === 'string') return data;

            var retVal = (this.value !== null) ? this.value : '',
                field = 'UserInfo.UserName', fieldPath, fieldValue = data, i;

            if (this.lookupOptions.returnObject && this.value !== null) {
                // The field could be several positions in length.
                //Extract the field value from the object by walking the sdata relationship path.
                fieldPath = field.split('.');
                for (i = 0; i < fieldPath.length; i++) {
                    if (fieldValue) {
                        fieldValue = fieldValue[fieldPath[i]];
                    }
                }

                retVal = fieldValue;
            }
            return retVal;
        },
        closeDropDown: function (focus) {
            this.inherited(arguments);

            //force initialization of popup editor when it opens for the second time.
            if (this._started) { this._started = false; }
        }
    });

    return widget;
});
