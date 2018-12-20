import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import domAttr from 'dojo/dom-attr';
import _RightDrawerBaseMixin from '../_RightDrawerBaseMixin';

const mixinName = 'crm.Views.Offline._RightDrawerListMixin';

/**
 * @class crm.Views._SpeedSearchRightDrawerListMixin
 *
 * Speedsearch specific mixin for right drawer functionality.
 *
 * @mixins crm.Views._RightDrawerBaseMixin
 *
 */
const __class = declare('crm.Views.Offline._RightDrawerListMixin', [_RightDrawerBaseMixin], {
  // Localization
  entitySectionText: 'Entity',
  kpiSectionText: 'KPI',

  // Dirty flags to refresh the mainview and/or widgets
  _hasChangedEntityPrefs: false,
  _hasChangedKPIPrefs: false,
  onShow: function onShow() {
    this.setDefaultEntityPreferences();
  },
  setDefaultEntityPreferences: function setDefaultEntityPreferences() {
    if (!App.preferences.offlineEntityFilters) {
      const defaults = this.getDefaultEntityPreferences();
      App.preferences.offlineEntityFilters = defaults;
      App.persistPreferences();
    }
  },
  getDefaultEntityPreferences: function getDefaultEntityPreferences() {
    return Object.keys(this.entityMappings)
      .map((name) => {
        return {
          name,
          enabled: true,
        };
      });
  },
  setupRightDrawer: function setupRightDrawer() {
    const drawer = App.getView('right_drawer');
    if (drawer) {
      lang.mixin(drawer, this._createActions());
      drawer.setLayout(this.createRightDrawerLayout());
      drawer.getGroupForEntry = lang.hitch(this, function getGroupForRightDrawerEntry(entry) {
        return this.getGroupForRightDrawerEntry(entry);
      });

      App.snapper.on('close', lang.hitch(this, function onSnapperClose() {
        if (this._hasChangedEntityPrefs) {
          this.clear();
          this.refreshRequired = true;
          this.refresh();
          this.rebuildWidgets();
          this._hasChangedEntityPrefs = false;
        }

        if (this._hasChangedKPIPrefs && this.rebuildWidgets) {
          this.rebuildWidgets();
          this._hasChangedKPIPrefs = false;
        }
      }));
    }
  },
  unloadRightDrawer: function unloadRightDrawer() {
    const drawer = App.getView('right_drawer');
    if (drawer) {
      drawer.setLayout([]);
      drawer.getGroupForEntry = function snapperOff() {};
      App.snapper.off('close');
    }
  },
  _onSearchExpression: function _onSearchExpression() {
    // TODO: Don't extend this private function - connect to the search widget onSearchExpression instead
    this.inherited(arguments);
  },
  _createActions: function _createActions() {
    // These actions will get mixed into the right drawer view.
    const actions = {
      entityFilterClicked: function onentityFilterClicked(params) {
        const prefs = App.preferences && App.preferences.offlineEntityFilters;

        const results = array.filter(prefs, (pref) => {
          return pref.name === params.entityname;
        });

        if (results.length > 0) {
          const enabled = !!results[0].enabled;
          results[0].enabled = !enabled;
          App.persistPreferences();
          this._hasChangedEntityPrefs = true;
          domAttr.set(params.$source, 'data-enabled', (!enabled)
            .toString());
        }
      }.bind(this),
      kpiClicked: function kpiClicked(params) {
        const metrics = App.getMetricsByResourceKind(this.resourceKind);
        let results;

        if (metrics.length > 0) {
          results = array.filter(metrics, (metric) => {
            return metric.title === params.title;
          });
        }

        if (results.length > 0) {
          const enabled = !!results[0].enabled;
          results[0].enabled = !enabled;
          App.persistPreferences();
          this._hasChangedKPIPrefs = true;

          domAttr.set(params.$source, 'data-enabled', (!enabled).toString());
        }
      }.bind(this),
    };

    return actions;
  },
  getGroupForRightDrawerEntry: function getGroupForRightDrawerEntry(entry) {
    const mixin = lang.getObject(mixinName);

    if (entry.dataProps && entry.dataProps.entityname) {
      return {
        tag: 'view',
        title: mixin.prototype.entitySectionText,
      };
    }

    return {
      tag: 'kpi',
      title: mixin.prototype.kpiSectionText,
    };
  },
  createRightDrawerLayout: function createRightDrawerLayout() {
    const layout = [];
    const entitySection = {
      id: 'actions',
      children: Object.keys(this.entityMappings)
        .map((entityName) => {
          const prefs = App.preferences && App.preferences.offlineEntityFilters;
          const entityPref = array.filter(prefs, (pref) => {
            return pref.name === entityName;
          });
          const {
            enabled,
          } = entityPref[0];
          return {
            name: entityName,
            action: 'entityFilterClicked',
            title: this.entityText[entityName] || entityName,
            dataProps: {
              entityname: entityName,
              enabled: !!enabled,
            },
          };
        }),
    };

    layout.push(entitySection);

    const metrics = App.getMetricsByResourceKind(this.resourceKind);

    const kpiSection = {
      id: 'kpi',
      children: metrics.filter(m => m.title).map((metric, i) => {
        return {
          name: `KPI${i}`,
          action: 'kpiClicked',
          title: metric.title,
          dataProps: {
            title: metric.title,
            enabled: !!metric.enabled,
          },
        };
      }),
    };

    layout.push(kpiSection);
    return layout;
  },
});

export default __class;
