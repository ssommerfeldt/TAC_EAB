require({cache:{
'url:Sage/UI/Controls/templates/DropDownSelectUser.html':"<div>\r\n    <select data-dojo-type=\"Sage.UI.ComboBox\" shouldPublishMarkDirty=\"false\" dojoAttachPoint=\"comboBox\" dojoAttachEvent=\"onBlur: _onBlur\">\r\n    </select>\r\n</div>\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/DropDownSelectUser", [
       'dijit/_TemplatedMixin',
       'dijit/_WidgetsInTemplateMixin',
       'dijit/_Widget',
       'dijit/form/ComboBox',
       'dojo/data/ItemFileReadStore',
       'Sage/Data/BaseSDataStore',
       'Sage/Data/SDataServiceRegistry',
       'Sage/UI/ComboBox',
       'dojo/text!./templates/DropDownSelectUser.html',
       'dojo/_base/declare'
],
function (_TemplatedMixin, _WidgetsInTemplateMixin, _Widget, comboBox, itemFileReadStore, baseSDataStore, _SDataServiceRegistry, sageComboBox, template, declare) {
    /**
     * @class Search Condition "user" widget.
     */
    var widget = declare('Sage.UI.Controls.DropDownSelectUser', [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        /**
         * @property {object} dataStore The data store which implements fetch()
         */
        dataStore: null,

        /**
         * @property {object} storeOptions The data store options object. See default values in constructor.
         */
        storeOptions: null,

        storeData: null,

        // Display properties
        templateString: template,
        widgetsInTemplate: true,

        // Store Options
        _position: 0,
        _pageSize: 100,
        _queryResults: null,

        /**
         * Takes the following options object: 
         * {
         *  storeOptions: {}, // Optional
         * }
         *
         * @constructor
         */
        constructor: function (options) {
            this.storeOptions = options.storeOptions || {
                include: ['UserInfo'],
                select: [
                    'Id',
                    'UserName',
                    'UserInfo/FirstName',
                    'UserInfo/LastName',
                    'Type'
                ],
                sort: [
                    { attribute: 'UserInfo.LastName', descending: false }
                ],
                service: _SDataServiceRegistry.getSDataService('dynamic', false, true, true),
                resourceKind: 'users'
            };

            this.dataStore = new baseSDataStore(this.storeOptions);

            this.inherited(arguments);
        },
        postCreate: function () {
            var def = new dojo.Deferred();
            // Reset Store Variable
            this._position = 0;
            this._queryResults = null;
            this.getUserData(def);

            def.then(dojo.hitch(this, function (data) {
                if (!data) {
                    return;
                }

                var items = [];
                var count = data.length;
                var item = null;
                for (var i = 0; i < count; i++) {
                    item = data[i];
                    if (item.Type !== 'Template') {
                        items.push({
                            id: item.$key,
                            text: [item.UserInfo.FirstName, item.UserInfo.LastName].join(' ')
                        });
                    }
                }

                this.storeData = {
                    identifier: 'id',
                    label: 'text',
                    items: items
                };

                var tempStore = new itemFileReadStore({ data: this.storeData });
                this.comboBox.set('store', tempStore);
                this.comboBox.set('searchAttr', 'text');

            }), function (e) {
                // errback
                console.error(e);
            });

            this.inherited(arguments);
        },
        /**
         * @returns {object} SData users objects with child UserInfo resource included. dojo.Deferred required as an argument.
         */
        getUserData: function (deferred) {
            this.dataStore.fetch({
                count: this._pageSize,
                start: this._position,
                onComplete: function (data) {
                    // Do we need to get more data?
                    if (data.length === this._pageSize) {
                        // Adjust the position
                        this._position += this._pageSize;
                        // Add to the array
                        if (this._queryResults === null) {
                            this._queryResults = data;
                        } else {
                            // This avoids creating an extra array
                            this._queryResults.push.apply(this._queryResults, data);
                        }//end if
                        // Go again
                        this.getUserData(deferred);
                    } else {
                        // Add to the array
                        if (this._queryResults === null) {
                            this._queryResults = data;
                        } else {
                            // This avoids creating an extra array
                            this._queryResults.push.apply(this._queryResults, data);
                        }//end if
                        // Return to the caller
                        deferred.callback(this._queryResults);
                    }//end if
                },
                onError: function (e) {
                    deferred.errback(e);
                },
                scope: this
            });
        },
        _getValueAttr: function () {
            return this.comboBox.get('value');
        }
    });

    return widget;
});
