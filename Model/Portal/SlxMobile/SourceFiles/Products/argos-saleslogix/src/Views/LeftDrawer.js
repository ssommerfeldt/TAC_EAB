import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import Memory from 'dojo/store/Memory';
import SpeedSearchWidget from '../SpeedSearchWidget';
import string from 'dojo/string';
import GroupedList from 'argos/GroupedList';
import getResource from 'argos/I18n';

const resource = getResource('leftDrawer');

/**
 * @class crm.Views.LeftDrawer
 *
 *
 * @extends argos.GroupedList
 *
 */
const __class = declare('crm.Views.LeftDrawer', [GroupedList], {
  // Templates
  cls: ' contextualContent',
  enablePullToRefresh: false,
  rowTemplate: new Simplate([
    '<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>',
    '{% if ($$._hasIcon($)) { %}',
    '<div class="list-item-static-selector">',
    '{% if ($.iconTemplate) { %}',
    '{%! $.iconTemplate %}',
    '{% } else if ($.cls) { %}',
    '<div class="{%: $.cls %}"></div>',
    '{% } else if ($.icon) { %}',
    '<img src="{%: $.icon %}" alt="icon" class="icon" />',
    '{% } %}',
    '</div>',
    '{% } %}',
    '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
    '</li>',
  ]),
  _hasIcon: function _hasIcon(entry) {
    return entry.iconTemplate || entry.cls || entry.icon;
  },
  itemTemplate: new Simplate([
    '<h3>{%: $.title %}</h3>',
  ]),

  // Localization
  configureText: resource.configureText,
  addAccountContactText: resource.addAccountContactText,
  titleText: resource.titleText,
  actionsText: resource.actionsText,
  viewsText: resource.viewsText,
  footerText: resource.footerText,
  settingsText: resource.settingsText,
  helpText: resource.helpText,
  logOutText: resource.logOutText,
  logOutConfirmText: resource.logOutConfirmText,
  onlineText: resource.onlineText,
  offlineText: resource.offlineText,
  connectionText: resource.connectionText,

  // View Properties
  id: 'left_drawer',
  expose: false,
  enableSearch: true,
  searchWidgetClass: SpeedSearchWidget,
  customizationSet: 'left_drawer',
  pageSize: 100,

  settingsView: 'settings',
  helpView: 'help',
  configurationView: 'configure',
  addAccountContactView: 'add_account_contact',
  searchView: 'speedsearch_list',

  logOut: function logOut() {
    const sure = window.confirm(this.logOutConfirmText); // eslint-disable-line
    if (sure) {
      App.logOut();
    }
  },
  loadAndNavigateToView: function loadAndNavigateToView(params) {
    const view = App.getView(params && params.view);
    this.navigateToView(view);
  },
  navigateToView: function navigateToView(view) {
    App.snapper.close();
    if (view) {
      view.show();
    }
  },
  addAccountContact: function addAccountContact() {
    App.snapper.close();
    const view = App.getView('add_account_contact');
    if (view) {
      view.show({
        insert: true,
      });
    }
  },
  navigateToConfigurationView: function navigateToConfigurationView() {
    const view = App.getView(this.configurationView);
    this.navigateToView(view);
  },
  navigateToSettingsView: function navigateToSettingsView() {
    const view = App.getView(this.settingsView);
    this.navigateToView(view);
  },
  navigateToHelpView: function navigateToHelpView() {
    const view = App.getView(this.helpView);
    this.navigateToView(view);
  },
  hasMoreData: function hasMoreData() {
    return false;
  },
  getGroupForEntry: function getGroupForEntry(entry) {
    const footerItems = [
      'ConfigureMenu',
      'SettingsAction',
      'HelpAction',
      'Logout',
      'ConnectionIndicator',
    ];

    if (entry.view) {
      return {
        tag: 'view',
        title: this.viewsText,
      };
    }

    if (array.indexOf(footerItems, entry.name) >= 0) {
      return {
        tag: 'footer',
        title: this.footerText,
      };
    }

    return {
      tag: 'action',
      title: this.actionsText,
    };
  },
  init: function init() {
    this.inherited(arguments);
    this.connect(App, 'onRegistered', this._onRegistered);
  },
  createLayout: function createLayout() {
    if (this.layout) {
      return this.layout;
    }

    const layout = [];

    const quickActions = {
      id: 'actions',
      children: [{
        name: 'AddAccountContactAction',
        action: 'addAccountContact',
        title: this.addAccountContactText,
        security: 'Entities/Account/Add',
      }],
    };

    layout.push(quickActions);

    const goTo = {
      id: 'views',
      children: [],
    };

    const configured = lang.getObject('preferences.home.visible', false, window.App);
    for (let i = 0; i < configured.length; i++) {
      const view = App.getView(configured[i]);
      if (view) {
        goTo.children.push({
          action: 'loadAndNavigateToView',
          view: view.id,
          title: view.titleText,
          security: view.getSecurity(),
          enableOfflineSupport: view.enableOfflineSupport,
          disabled: view.isDisabled(),
        });
      }
    }

    layout.push(goTo);

    const footer = {
      id: 'footer',
      children: [{
        name: 'ConfigureMenu',
        action: 'navigateToConfigurationView',
        title: this.configureText,
        enableOfflineSupport: false,
      }, {
        name: 'SettingsAction',
        action: 'navigateToSettingsView',
        title: this.settingsText,
        enableOfflineSupport: true,
      }, {
        name: 'HelpAction',
        action: 'navigateToHelpView',
        title: this.helpText,
        enableOfflineSupport: true,
      }, {
        name: 'Logout',
        action: 'logOut',
        title: this.logOutText,
        enableOfflineSupport: false,
      }, {
        name: 'ConnectionIndicator',
        title: string.substitute(this.connectionText, { connectionStatus: App.onLine ? this.onlineText : this.offlineText }),
        enableOfflineSupport: true,
      }],
    };

    layout.push(footer);

    return layout;
  },
  createStore: function createStore() {
    const layout = this._createCustomizedLayout(this.createLayout());
    const list = [];
    let total = 0;
    let section;

    for (let i = 0; i < layout.length; i++) {
      section = layout[i].children;

      for (let j = 0; j < section.length; j++) {
        total = total + 1;
        const row = section[j];
        row.$key = total;

        if (row.disabled) {
          continue;
        }
        if (row.security && !App.hasAccessTo(row.security)) {
          continue;
        }

        if (!App.isOnline() && !row.enableOfflineSupport) {
          continue;
        }

        if (typeof this.query !== 'function' || this.query(row)) {
          list.push(row);
        }
      }
    }

    const store = new Memory({
      data: list,
    });
    store.idProperty = '$key';
    return store;
  },
  /**
   * Override the List refresh to also clear the view (something the beforeTransitionTo handles, but we are not using)
   */
  refresh: function refresh() {
    this.clear();
    this.requestData();
    if (this.searchWidget) {
      if (App.onLine) {
        this.searchWidget.enable();
      } else {
        this.searchWidget.disable();
      }
    }
  },
  clear: function clear() {
    this.inherited(arguments);
    this.layout = null;
    this.store = null;
  },
  show: function show() {
    if (this.onShow(this) === false) {
      return;
    }

    this.refresh();
  },
  refreshRequiredFor: function refreshRequiredFor() {
    const visible = lang.getObject('preferences.home.visible', false, App) || [];
    const shown = this.feed && this.feed.$resources;

    if (!visible || !shown || (visible.length !== shown.length)) {
      return true;
    }

    for (let i = 0; i < visible.length; i++) {
      if (visible[i] !== shown[i].$key) {
        return true;
      }
    }

    return this.inherited(arguments);
  },
  _onRegistered: function _onRegistered() {
    this.refreshRequired = true;
  },
  _onSearchExpression: function _onSearchExpression(expression) {
    const view = App.getView(this.searchView);
    const current = App.getPrimaryActiveView();

    if (view) {
      // If the speedsearch list is not our current view, show it first
      if (view.id !== current.id) {
        view.show({
          query: expression,
        });
      }

      // Set the search term on the list and call search.
      // This will keep the search terms on each widget in sync.
      setTimeout(() => {
        view.setSearchTerm(expression);
        if (current && current.id === view.id) {
          view.search();
        }
      }, 10);
    }

    App.snapper.close();
  },
});

lang.setObject('Mobile.SalesLogix.Views.LeftDrawer', __class);
export default __class;
