/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/SummaryAggregate", [
       'dijit/_Widget',
       'Sage/_Templated',
       'dijit/Tooltip',
       'Sage/UI/GridMenuItem',
       'Sage/Store/SData',
       'dojo/i18n!../nls/SDataLookup', // loading text, no data text, TODO: Create common nls
       'dojo/_base/declare'
],
function (_Widget, _Templated, tooltip, gridMenuItem, SDataObjectStore, nlsResource, declare) {
    var widget = declare('Sage.UI.Controls.SummaryAggregate', [_Widget, _Templated], {
        //l18n strings...
        loadingText: nlsResource.loadingText,
        noDataText: nlsResource.noDataText,
        widgetsInTemplate: true,
        value: '',
        content: '',
        valueNode: null,
        linkTabName: '',
        entityId: '',
        linkPage: '',
        toolTip: false,
        _button: null,
        _menu: null,
        store: false,
        grid: false,
        popupStructure: null,
        resourceKind: '',
        select: null,
        where: '',
        //popupCaption: '',
        widgetTemplate: new Simplate([
            '<span>',
                '<button data-dojo-type="dijit.form.ComboButton" data-dojo-attach-point="_button" data-dojo-attach-event="onClick:_click" >',
                    '<div data-dojo-type="dijit.Menu" data-dojo-attach-point="_menu">',
                    '</div>',
                '</button>',
            '</span>'
        ]),
        constructor: function () {
            this.select = [];
            this.popupStructure = [];
            this.inherited(arguments);
        },
        _click: function () {
            if (!this.linkPage) {
                this._findlinkPage();
            }
            var url = this.linkPage + "?entityid=" + this.entityId || '';
            if (this.linkTabName) {
                url = url + "&activetab=" + this.linkTabName;
            }
            document.location = url;
        },
        _setValueAttr: function (value) {
            this.value = value;
            this._button.set('label', value);
        },
        startup: function () {
            this.inherited(arguments);
            if (!this.store) {
                if (this.select.length === 0) {
                    this.select.push('id');
                    for (var i = 0; i < this.popupStructure.length; i++) {
                        this.select.push(this.popupStructure[i]['field']);
                    }
                }
                this.store = new SDataObjectStore({
                    service: Sage.Data.SDataServiceRegistry.getSDataService('dynamic'),
                    contractName: 'dynamic',
                    resourceKind: this.resourceKind,
                    select: this.select // ['id', 'Name', 'WorkPhone', 'Email']
                });
            }

            if (!this.grid) {
                this.grid = new gridMenuItem({
                    gridOptions: {
                        store: this.store,
                        cssClass: 'groupsPopMenu',
                        minRowsPerPage: 40,
                        columns: this.popupStructure,
                        loadingMessage: this.loadingText, // 'Loading...',
                        noDataMessage: this.noDataText, // 'No records returned',
                        selectionMode: 'single',
                        query: this.where.replace(/~magicquote~/g, '\''), // 'Account.id eq \'' + this.entityId + '\'',
                        height: '250px',
                        width: '300px'
                    }
                });
                this._menu.addChild(this.grid);
                this._menu.set('style', { width: '350px' });
            }
        },
        _findlinkPage: function () {
            if (!this.linkPage) {
                var url = document.location.href;
                if (url.indexOf("?") > -1) {
                    this.linkPage = url.substring(0, url.indexOf("?"));
                }
            }
        },
        destroy: function () {
            this.inherited(arguments);
            if (this.grid) {
                this.grid.destroy();
            }
        }
    });

    Sage.UI.Controls.SummaryAggregate.markupFactory = function (props, node, ctor) {
        var widthFromAttr = function (n) {
            var w = d.attr(n, "width") || "auto";
            if ((w != "auto") && (w.slice(-2) != "em") && (w.slice(-1) != "%")) {
                w = parseInt(w, 10) + "px";
            }
            return w;
        };
        if (!props.popupStructure) {
            var d = dojo;
            var structure = [];

            // TODO: Where is isMultiCurrencyEnabled coming from?
            var multiCurrency = window.isMultiCurrencyEnabled();
            d.query('> span', node).forEach(function (span, span_idx) {
                var cell = {
                    label: d.trim(d.attr(span, 'name') || span.innerHTML),
                    type: d.attr(span, 'cellType') || false,
                    field: d.trim(d.attr(span, 'field') || ''),
                    id: d.trim(d.attr(span, 'id') || ''),
                    idField: d.trim(d.attr(span, 'idField') || ''),
                    queryParams: d.trim(d.attr(span, 'queryParams') || ''),
                    pageName: d.trim(d.attr(span, 'pageName') || ''),
                    image: d.trim(d.attr(span, 'icon') || ''),
                    multiCurrency: multiCurrency,
                    exchangeRateType: d.trim(d.attr(span, 'exchangeRateType') || '')
                };
                if (d.hasAttr(span, 'width')) {
                    cell['width'] = widthFromAttr(span);
                }
                cell.type = cell.type ? dojo.getObject(cell.type) : null;
                if (cell.type && cell.type.markupFactory) {
                    cell.type.markupFactory(span, cell);
                }

                if (cell.name === '&nbsp;' || cell.name === '') {
                    cell.name = cell.field;
                }

                structure.push(cell);
            });
            props.popupStructure = structure;
        }

        return new ctor(props, node);
    };
    return widget;
});
