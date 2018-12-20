require({cache:{
'url:Sage/templates/GridMenuItem.html':"<tr class=\"dijitReset\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\r\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\r\n\t\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\r\n\t</td>\r\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,textDirNode\"\r\n\t\trole=\"presentation\"></td>\r\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\r\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\r\n\t\t<span data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\r\n\t\t\t<span class=\"dijitInline dijitIcon dijitMenuExpand\"></span>\r\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\r\n\t\t</span>\r\n\t</td>\r\n</tr>\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/SearchMenuItem", [
        'dojo/_base/declare',
        'dijit/MenuItem',
        'dijit/form/TextBox',
        'dijit/form/CheckBox',
        'dijit/form/Button',
        'Sage/UI/ImageButton',
        'dojo/dom-construct',
        'dojo/_base/lang',
        'dojo/has',
        'dojo/_base/sniff',
        'Sage/UI/Controls/_DialogHelpIconMixin',
        'dojo/text!../templates/GridMenuItem.html',
        'dojo/i18n!./nls/SearchMenuItem',
        'dojo/topic'
],
function (
        declare,
        MenuItem,
        TextBox,
        CheckBox,
        Button,
        ImageButton,
        domConstruct,
        lang,
        has,
        sniff,
        DialogHelpIconMixin,
        template,
        nls,
        topic
    ) {
    var widget = declare('Sage.UI.SearchMenuItem', MenuItem, {
        id: 'groupSearchMenuItem',

        templateString: template,
        seedQuery: '',

        // localized strings
        findText: 'Find: ',
        clearText: 'Clear',
        // end localized strings

        textBox: null,
        findButton: null,
        clearButton: null,
        showHiddenCheck: null,
        registeredWidgets: null,
        _gridMenuItem: null,

        startup: function () {
            this.inherited(arguments);
            var keyDownFunc = lang.hitch(this, function (event) {
                if (event.keyCode === 9) {
                    event.cancelBubble = true;
                }
            });
            if (nls) {
                this.findText = nls.findText;
                this.clearText = nls.clearText;
            }

            this.getParent().on('open', lang.hitch(this, this.init));

            if (has('mozilla')) {
                this.getParent().on('keyPress', keyDownFunc);
            } else {
                this.getParent().on('keyDown', keyDownFunc);
            }
        },
        init: function () {
            if (!this.started) {
                topic.subscribe("sage/ui/groups/gridMenuStarted", lang.hitch(this, function (gridMenuItem) {
                    if (!this.started) {
                        this.registeredWidgets = [];
                        this._createSearchTextBox();
                    }
                    this._gridMenuItem = gridMenuItem;
                    this._setQuery();
                    this.started = true;
                }));
            }

            var fn = lang.hitch(this, function () { this.focusText(); });
            setTimeout(fn, 100);
        },
        focusText: function () {
            if (this.textBox && this.textBox.focus) {
                this.textBox.focus();
            }
        },
        _createSearchTextBox: function () {
            this.textBox = new TextBox();
            this.textBox.startup();
            this.registeredWidgets.push(this.textBox);
            var keyDownFunc = lang.hitch(this, function (event) {
                if (event.keyCode === 13) {
                    this._setQuery();
                }

                // Prevent left/right arrow and tab from bubbling.
                if (event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 9) {
                    event.cancelBubble = true;
                }
            });

            if (has('mozilla')) {
                this.textBox.on('keyPress', keyDownFunc);
            } else {
                this.textBox.on('keyDown', keyDownFunc);
            }

            this.textBox.on('click', function (event) {
                event.cancelBubble = true;
            });

            domConstruct.place(this.textBox.domNode, this.containerNode, 'only');
            domConstruct.create('label', {
                'for': this.textBox.id,
                'innerHTML': this.findText + ': ',
                'class': 'groupMenuLabel'
            }, this.containerNode, 'first');

            this.findButton = new ImageButton({
                imageClass: 'icon_Find_16x16',
                'class': 'groupMenuButton',
                'title': this.findText,
                onClick: lang.hitch(this, function (event) {
                    event.cancelBubble = true;
                    this._setQuery();
                })
            });

            this.clearButton = new Button({
                label: this.clearText,
                'class': 'groupMenuButton',
                'title': this.clearText,
                onClick: lang.hitch(this, function (event) {
                    event.cancelBubble = true;
                    this.textBox.set('value', '');
                    this._setQuery();
                })
            });

            domConstruct.place(this.findButton.domNode, this.containerNode, 'last');
            domConstruct.place(this.clearButton.domNode, this.containerNode, 'last');

            domConstruct.create('div', {
                'id': 'exceedMaxGroupMsg',
                'innerHTML': '',
                'class': 'groupMenuLabel groupMenuMsg'              
            }, this.containerNode, 'last');

            this.titleBar = this.containerNode;
            lang.mixin(this, new DialogHelpIconMixin());
            this.createHelpIconByTopic('Group_Manager');
            domConstruct.place(this.helpIcon, this.containerNode, 'last');

            this.registeredWidgets.push(this.findButton);
            this.registeredWidgets.push(this.clearButton);
        },
        _setQuery: function (gridMenuItem) {
            var grid = dijit.byId('groupsGridInMenu'),
                searchText = this.textBox.get('value').replace(/'/g, "''"),
                queryParts = [];

            if (grid) {
                if (!this.seedQuery) {
                    // Preserve the original query.
                    this.seedQuery = (this._gridMenuItem.store.where) ? this._gridMenuItem.store.where : '';
                }

                if (this.seedQuery) {
                    queryParts.push(this.seedQuery);
                }
                if (searchText) {
                    searchText = this._escapeSearchText(searchText);
                    queryParts.push("upper(displayName) like '%" + searchText.toUpperCase() + "%'");
                }
                this._gridMenuItem.query = queryParts.join(' and ');
                grid.setStore(this._gridMenuItem.store, this._gridMenuItem.query);
            }
        },
        _escapeSearchText: function (searchText) {
            searchText = searchText.replace(/\[/g, '[[]').replace(/_/g, '[_]').replace(/%/g, '[%]');
            return searchText;
        },
        _onClick: function (e) {
            // because we live in a menu, we don't want the menu's click handling to hide
            // us when the user selects a row.
            e.cancelBubble = true;
        },
        destroy: function () {
            var i;
            if (this.registeredWidgets !== null) {
                for (i = 0; i < this.registeredWidgets.length; i++) {
                    this.registeredWidgets[i].destroy(false);
                    this.registeredWidgets.splice(i, 1);
                }
            }

            this.inherited(arguments);
        }
    });

    return widget;
});
