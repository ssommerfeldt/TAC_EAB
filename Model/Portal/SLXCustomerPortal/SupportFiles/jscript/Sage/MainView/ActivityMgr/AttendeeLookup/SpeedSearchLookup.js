require({cache:{
'url:Sage/MainView/ActivityMgr/AttendeeLookup/templates/SpeedSearchLookup.html':"[\r\n'<div>',\r\n    '<div data-dojo-type=\"dijit.Dialog\" id=\"{%= $.id %}-Dialog\" title=\"\" dojoAttachPoint=\"_dialog\" >', //dialog\r\n         '<div class=\"event-dialog\">',\r\n        '<div style=\"padding:5px;\" id=\"{%= $.id %}-Condition-container\">',\r\n            '<input id=\"Text1\" type=\"text\" style=\"width:85%;\"  data-dojo-attach-point=\"_valueBox\" data-dojo-attach-event=\"onkeypress:_onKeyPress\"/>',     \r\n            '<button id=\"{%= $.id %}-Search\" data-dojo-type=\"dijit.form.Button\" type=\"button\" dojoAttachPoint=\"searchButton\" dojoAttachEvent=\"onClick:_doSearch\">{%= $.srchBtnCaption %}</button>',\r\n          \r\n        '</div>',    \r\n        '<div data-dojo-attach-point=\"contentNode\">',  \r\n        '<div id=\"{%= $.id %}-Grid-container\" dojoAttachPoint=\"_speedSearchGrid\"  style=\"width:auto;height:400px;\"></div>',\r\n        '</div>',\r\n            '<div class=\"lookupButtonWrapper\">',           \r\n                '<button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"{%= $.id %}-GridSelectButton\" ',\r\n                    'onClick=\"dijit.byId(\\'{%= $.id %}\\').getGridSelections(); \">{%= $.okText %}',\r\n                   '</button>',            \r\n                '<button data-dojo-type=\"dijit.form.Button\" type=\"button\" id=\"{%= $.id %}-CloseButton\" ',\r\n                    'onClick=\"dijit.byId(\\'{%= $.id %}-Dialog\\').hide();\">{%= $.cancelText %}</button>',\r\n            '</div>',\r\n             '</div>',\r\n     '</div> ', //dialog   \r\n'</div>'\r\n]"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */

define('Sage/MainView/ActivityMgr/AttendeeLookup/SpeedSearchLookup',
[
    'dojo/_base/html',
    'Sage/Data/SDataServiceRegistry',
    'dijit/Dialog',
    'dijit/_Widget',
    'Sage/_Templated',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/_base/array',
    'dijit/registry',
    'dojo/text!./templates/SpeedSearchLookup.html',
    'dojo/_base/declare',
    'Sage/UI/Controls/Grid',
    'dojo/i18n!./nls/SpeedSearchLookup',
    'Sage/Store/SData'
],
function (html, sDataServiceRegistry, Dialog, _Widget, _Templated, lang, string, array, registry, template, declare, Grid, nlsStrings, SDataObjectStore) {
    var widget = declare('Sage.MainView.ActivityMgr.AttendeeLookup.SpeedSearchLookup', [_Widget, _Templated], {
        //widgetTemplate: new Simplate(eval(template)),
        id: 'speedSearchLookup',
        btnIcon: 'images/icons/plus_16x16.gif',
        btnToolTip: 'Lookup',
        dialogTitle: 'Contact/Lead Look up',

        closeText: 'Close',
        loadingText: 'Loading...',
        // noDataText: 'No records returned',
        _initialized: false,
        _started: false,
        dialogButtonText: 'Search',
        widgetsInTemplate: true,
        widgetTemplate: new Simplate(eval(template)),
        srchBtnCaption: 'Search',
        _store: null,
        _grid: null,
        //end i18n strings.
        currentPage: 0,
        pageSize: 100,
        _storeOptions: null,
        _entry: null,
        indexes: [
           { indexName: 'Contact', indexType: 1, isSecure: true },
           { indexName: 'Lead', indexType: 1, isSecure: true }

        ],
        types: ['Contact', 'Lead'],
        iconPathsByType: {
            'Account': 'content/images/icons/Company_24.png',
            'Activity': 'content/images/icons/To_Do_24x24.png',
            'Contact': 'content/images/icons/Contacts_24x24.png',
            'History': 'content/images/icons/journal_24.png',
            'Lead': 'content/images/icons/Leads_24x24.png',
            'Opportunity': 'content/images/icons/opportunity_24.png',
            'Ticket': 'content/images/icons/Ticket_24x24.png'
        },
        constructor: function () {
            //   this._initializeList();
            lang.mixin(this, nlsStrings);

        },
        postMixInProperties: function () {
            // Set the widgetTemplate here so we can select the appropriate template for the selected display mode.
        },

        startup: function () {
            this._buildGrid();
            var self = this;
        },
        extractTypeFromItem: function (item) {
            for (var i = 0; i < this.types.length; i++) {
                if (item.source.indexOf(this.types[i]) !== -1) {
                    return this.types[i];
                }
            }

            return null;
        },
        extractDescriptorFromItem: function (item, type) {
            var descriptor = '';

            switch (type) {
                case 'Contact':
                    descriptor = string.substitute('${lastname}, ${firstname}', this.getFieldValues(item.fields, ['firstname', 'lastname']));
                    break;
                case 'Lead':
                    descriptor = string.substitute('${lastname}, ${firstname}', this.getFieldValues(item.fields, ['firstname', 'lastname']));
                    break;
                    /*  case 'Opportunity':
                          descriptor = this.getFieldValue(item.fields, 'subject');
                          break;
                      case 'History':
                          descriptor = string.substitute('${subject} (${date_created})', this.getFieldValues(item.fields, ['subject', 'date_created']));
                          break;
                      case 'Ticket':
                          descriptor = item.uiDisplayName;
                          break;*/
            }
            return descriptor;
        },

        extractKeyFromItem: function (item) {
            // Extract the entityId from the display name, which is the last 12 characters
            var displayName, len;
            displayName = item.displayName;
            if (!displayName) {
                return '';
            }

            len = displayName.length;
            return displayName.substring(len - 12);
        },
        getFieldValue: function (fields, name) {
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (field.fieldName == name) {
                    return field.fieldValue;
                }
            }

            return '';
        },
        getFieldValues: function (fields, names) {
            var results = {};

            // Assign each field in the results to an empty string,
            // so that dojo's string substitute won't blow up on undefined.
            array.forEach(names, function (name) {
                results[name] = '';
            });

            array.forEach(fields, function (field) {
                array.forEach(names, function (name, i) {
                    if (field.fieldName === name) {
                        results[name] = field.fieldValue;
                    }
                });
            });

            return results;
        },
        showLookup: function (mixinProperties) {
            this._dialog.set('title', this.dialogTitle);
            this.eventDefaultValues = mixinProperties || {};
            this._dialog.show();

            if (!this._initialized) {
                this._initializeList();
            }
            this._dialog.set('refocus', false);
            this.connect(this._dialog, 'onHide', this.destroy);

        },
        _initializeList: function () {
            this._started = false;
            //define the columns:
            var columns = [
                {
                    field: '$descriptor',
                    label: this.colName,
                    width: '20%',
                    sortable: false
                }, {
                    field: 'type',
                    label: this.colType,
                    width: '10%',
                    sortable: false
                }, {
                    field: 'accountName',
                    label: this.colAccount,
                    width: '30%',
                    sortable: false
                }, {
                    field: 'title',
                    label: this.colTitle,
                    width: '10%',
                    sortable: false
                }, {
                    field: 'email',
                    label: this.colEmail,
                    width: '30%',
                    sortable: false
                }, {
                    field: 'phone',
                    label: this.colWorkPhone,
                    width: '30%',
                    sortable: false
                }
            ];

            this._entry = {
                request: {
                    docTextItem: -1,
                    searchText: '',
                    searchType: 1,
                    noiseFile: 'PMINoise.dat',
                    includeStemming: false,
                    includeThesaurus: false,
                    includePhonic: false,
                    useFrequentFilter: false,
                    indexes: this.indexes,
                    whichPage: this.currentPage,
                    itemsPerPage: this.pageSize,
                    filters: null
                },
                response: null
            };

            var self = this;
            var onComplete = function (feed, totalCount) {
                this._initialized = true;
                array.forEach(feed, function (entry, i) {
                    entry.type = self.extractTypeFromItem(entry);
                    entry.$descriptor = entry.$descriptor || self.extractDescriptorFromItem(entry, entry.type);
                    entry.$key = self.extractKeyFromItem(entry);
                    entry.accountName = self.getFieldValue(entry.fields, 'account');
                    entry.title = self.getFieldValue(entry.fields, 'title');
                    entry.email = self.getFieldValue(entry.fields, 'email');
                    entry.phone = self.getFieldValue(entry.fields, 'phone');
                });

                // TODO: scroll for data on demand does not work with POST data
                //if (typeof totalCount !== 'undefined') {
                //    var remaining = this.feed.totalCount - ((this.currentPage + 1) * this.pageSize);
                //    this.set('remainingContent', string.substitute(this.remainingText, [remaining]));
                //}

                //domClass.toggle(this.domNode, 'list-has-more', this.hasMoreData());
            };

            this._storeOptions = {
                service: sDataServiceRegistry.getSDataService('system'),
                contractName: 'system',
                operationName: 'executeSearch',
                entry: this._entry,
                queryArgs: {
                    count: 100
                },
                onComplete: onComplete,
                operationSDataStore: 'Sage.SData.Client.SDataServiceOperationRequest', // TODO: check another way
                itemsProperty: 'response.items',
                totalCountProperty: 'response.totalCount'
            };

            var store = this._store = new SDataObjectStore(this._storeOptions);

            if (!this._grid) {
                var grid = this._grid = new Grid({
                    id: 'speedSearchGrid',
                    store: store,
                    columns: columns,
                    minRowsPerPage: 100,
                    placeHolder: dojo.byId(this._speedSearchGrid),
                    selectionMode: 'extended',
                    columnHiding: true,
                    columnResizing: true,
                    columnReordering: true,
                    rowSelection: true
                });

                grid.onRowDblClick = lang.hitch(this, function (row) {
                    this.onDoubleClick();
                });
                grid.resize();
            }
        },
        onDoubleClick: function () {
            this.getGridSelections();
        },
        uninitialize: function () {
            if (!this.contentNode) {
                return;
            }
            array.forEach(this.mainHandles, function (handle) {
                handle.remove();
            });

            this._destroyContent();

            this.inherited(arguments);
        },

        _destroyContent: function () {
            if (!this.contentNode) {
                return;
            }

            array.forEach(registry.findWidgets(this.contentNode), function (widget) {
                widget.destroy(false);
            });
            array.forEach(this.handles, function (handle) {
                handle.remove();
            });
            this.handles = [];
            this.contentNode.innerHTML = '';
        },
        initDialog: function () {

        },
        _onKey: function (/*Event*/evt) {
            //summary:
            // An override to the Dialog _onKey that allows the Lookup control to function as a modeless dialog.  
            // Future implementations will see this feature as a mixin class available to any dialog class.
            // modality: modal, modeless
            // (modality === 'modeless') ? dijit.byId('dijit_DialogUnderlay_0').hide(); 
            // OR
            //  dojo.destroy(self.id + '-Dialog_underlay');        
            var self = this,
                args = arguments;
            dojo.query('*', this.domNode).forEach(function (node, index, arr) {
                if (node === evt.target) {
                    //We are inside the dialog. Call the inherited.
                    self.inherited(args);
                }
            });
        },
        getGridSelections: function () {
            var items = this._grid.getSelectedRowData();
            this._grid.clearSelection();
            this.doSelected(items);
        },
        doSelected: function (items) {
            //do nothing, this is here as a placeholder for consumers to add custom handling for this event.
        },
        _cancelClick: function () {
            this.hide();
        },
        hide: function () {
            this._dialog.hide();
            this._started = false;
        },
        _doSearch: function () {
            if (this._valueBox.value) {
                this._entry.request.searchText = this._valueBox.value;
                this._store.entry = this._entry;
                this._grid.refresh();
            }
        },
        _onKeyPress: function (evt) {
            if (evt.keyCode == 13 || evt.keyCode == 10) {
                // event.stop(evt);
                this._valueBox.blur();
                this._doSearch();
            }
        },
        destroy: function () {
            var dialog = dijit.byId([this.id, '-Dialog'].join(''));

            if (this.btnIcon) {
                dojo.destroy(this.btnIcon);
            }

            dojo.disconnect(this._doSearchConnection);
            dojo.unsubscribe(this._addCondHandle);
            dojo.unsubscribe(this._removeCondHandle);

            if (this.conditionMgr) {
                this.conditionMgr.destroy(false);
            }

            if (dialog) {
                dialog.uninitialize();
            }
            dialog.destroyRecursive();
            this.inherited(arguments);
        }
    });
    return widget;

});
