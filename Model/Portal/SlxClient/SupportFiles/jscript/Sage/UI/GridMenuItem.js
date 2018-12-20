require({cache:{
'url:Sage/templates/GridMenuItem.html':"<tr class=\"dijitReset\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\r\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\r\n\t\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\r\n\t</td>\r\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,textDirNode\"\r\n\t\trole=\"presentation\"></td>\r\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\r\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\r\n\t\t<span data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\r\n\t\t\t<span class=\"dijitInline dijitIcon dijitMenuExpand\"></span>\r\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\r\n\t\t</span>\r\n\t</td>\r\n</tr>\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/GridMenuItem", [
       'dijit/MenuItem',
       'Sage/UI/Controls/Grid',
       'dojo/text!../templates/GridMenuItem.html',
       'dojo/_base/declare',
       'dojo/dom-style',
       'dojo/dom-construct',
       'dojo/aspect',
       'dojo/_base/lang',
       'dojo/topic',
       'dojo/store/Memory'
],
function (MenuItem, Grid, template, declare, domStyle, domConstruct, aspect, lang, topic, Memory) {
    var widget = declare('Sage.UI.GridMenuItem', MenuItem, {
        grid: null,
        store: null,
        query: null,
        templateString: template,
        startup: function () {
            this.inherited(arguments);
            aspect.after(this.getParent(), 'onOpen', lang.hitch(this, this.startGrid));
            var h = this.gridOptions.height || this.height || '250px',
                w = this.gridOptions.width || this.width || '150px';
            domStyle.set(this.focusNode, { height: h, width: w });
        },
        startGrid: function () {
            if (this.grid && this.grid.started) {
                this.grid.setStore(this.store, this.query);
                return;
            }
            else {
                if (typeof this.gridOptions !== 'undefined') {
                    var cssClass = (this.gridOptions.hasOwnProperty('cssClass')) ? this.gridOptions.cssClass : '',
                        handle;

                    this.query = (this.gridOptions.hasOwnProperty('query')) ? this.gridOptions.query : this.query;
                    this.gridOptions.keepScrollPosition = false;
                    this.gridOptions.classNames = cssClass + ' menuGrid';
                    this.gridOptions.placeHolder = this.containerNode;
                    this.gridOptions.columnHiding = true;
                    this.gridOptions.showHiderIcon = false;
                    this.store = this.gridOptions.store;

                    if (this.gridOptions.setQueryOnStore === true) {
                        this.gridOptions.store = new Memory({ data: [] });
                    }
                    if (this.grid) {
                        this.grid.destroy();
                    }
                    this.grid = new Grid(this.gridOptions);

                    if (this.gridOptions.hasOwnProperty('onRowClick')) {
                        this.grid.onRowClick = lang.hitch(this.gridOptions, this.gridOptions.onRowClick);
                    }
                    if (this.gridOptions.hasOwnProperty('onHeaderClick')) {
                        this.grid.onHeaderClick = lang.hitch(this.gridOptions, this.gridOptions.onHeaderClick);
                    }

                    this.grid.onLoadComplete = lang.hitch(this, function () {
                        if (!this.grid.started) {
                            topic.publish("sage/ui/groups/gridMenuStarted", this);
                            this.grid.started = true;
                        }
                    });
                }
            }
        },
        _onClick: function (e) {
            // because we live in a menu, we don't want the menu's click handling to hide 
            // us when the user selects a row.
            e.stopPropagation();
        }
    });

    return widget;
});
