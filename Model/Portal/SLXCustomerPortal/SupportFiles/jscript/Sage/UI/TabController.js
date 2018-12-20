require({cache:{
'url:Sage/UI/templates/ScrollingTabController.html':"<div class=\"dijitTabListContainer-${tabPosition}\" style=\"visibility:hidden\">\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\r\n\t\t class=\"tabStripButton-${tabPosition}\"\r\n\t\t id=\"${id}_menuBtn\"\r\n\t\t data-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\r\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\r\n\t\t data-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t class=\"tabStripButton-${tabPosition}\"\r\n\t\t id=\"${id}_leftBtn\"\r\n\t\t data-dojo-props=\"iconClass:'fa fa-chevron-left', showLabel:false, title:''\"\r\n\t\t data-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\r\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\r\n\t\t class=\"tabStripButton-${tabPosition}\"\r\n\t\t id=\"${id}_rightBtn\"\r\n\t\t data-dojo-props=\"iconClass:'fa fa-chevron-right', showLabel:false, title:''\"\r\n\t\t data-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\r\n\t<div class='dijitTabListWrapper' data-dojo-attach-point='tablistWrapper'>\r\n\t\t<div role='tablist' data-dojo-attach-event='onkeydown:onkeydown'\r\n\t\t\t data-dojo-attach-point='containerNode' class='nowrapTabStrip'></div>\r\n\t</div>\r\n</div>"}});
/*globals define */

/**
 * @class Sage.UI.TabController
 */
define("Sage/UI/TabController", [
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/declare',
    'dojo/query',
    'dijit/layout/ScrollingTabController',
    'dijit/registry',
    'dijit/Menu',
    'dojo/dom-class',
    'dojo/text!./templates/ScrollingTabController.html',
    'dojo/aspect',
    'dijit/popup'
], function (lang, array, declare, query, ScrollingTabController, registry, Menu, domClass, scrollingTabControllerTemplate, aspect, popup) {
    var TabController = declare('Sage.UI.TabController', [ScrollingTabController], {
        templateString: scrollingTabControllerTemplate,
        closeButton: false,
        tabMenu: null,
        postCreate: function() {
            this.inherited(arguments);

            var baseMenuId, baseMenu;

            baseMenuId = this.id + '_Menu';
            baseMenu = registry.byId(baseMenuId);

            // Attempt to find the default base close menu and destroy it.
            if (baseMenu) {
                baseMenu.destroy();
            }

            this.tabMenu = new Menu({
                id: this.id + "_Menu",
                ownerDocument: this.ownerDocument,
                dir: this.dir,
                lang: this.lang,
                textDir: this.textDir,
                targetNodeIds: [this.domNode],
                selector: function(node){
                    return domClass.contains(node, "dijitClosable") && !domClass.contains(node, "dijitTabDisabled");
                }
            });

            this.own(
                this.tabMenu,
                aspect.before(popup, 'open', lang.hitch(this, this.onTabMenuOpen)),
                aspect.before(popup, 'close', lang.hitch(this, this.onTabMenuClose))
            );

            this.own(
                this.on('mouseDown', lang.hitch(this, this.onTabMouseDown))
            );
        },
        onTabMouseDown: function(evt) {
            var node, widget;
            node = query('[role="tab"]', evt.target)[0] || evt.target;
            widget = registry.byId(node.id);
            this.menuOpenedOn = widget;
        },
        /**
         * Fired when the user right clicks a tab and the menu is opened. This method will get any menu items for that
         * tab id and render them in that menu.
         */
        onTabMenuOpen: function() {
            var tabPane, page, menuItems;

            tabPane = this.getParent();

            // Attempt to get the tab page container associated with the tab that was clicked, hint: it might not be the selected tab.
            // tabPane.menuOpenedOn is set onMouseDown in the tab container.
            page = (this.menuOpenedOn && this.menuOpenedOn.page) || (tabPane && tabPane.selectedChildWidget);

            if (tabPane && page) {
                menuItems = tabPane.getTabMenuItems(page.id);
                array.forEach(menuItems, function(menuItem) {
                    this.tabMenu.addChild(menuItem);
                }, this);
            }
        },
        /**
         * Fires when the tab menu is clicked or the user clicks somewhere on the page. This method will destroy any children menu items for
         * the current tab id that was clicked.
         */
        onTabMenuClose: function() {
            var menuItems;

            menuItems = this.tabMenu.getChildren();
            array.forEach(menuItems, function(menuItem) {
                this.tabMenu.removeChild(menuItem);
            }, this);
        }
    });

    return TabController;
});








