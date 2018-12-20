import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import MetricWidget from './MetricWidget';

/**
 * @class crm.Views._MetricDetailMixin
 *
 * Mixin for adding KPI widgets to detail views.
 *
 * @since 3.0
 *
 * @requires crm.Views.MetricWidget
 *
 */
const __class = declare('crm.Views._MetricDetailMixin', null, {
  // Metrics
  metricNode: null,
  metricWidgets: null,
  entityName: '',

  postMixInProperties: function postMixInProperties() {
    this.widgetTemplate = new Simplate([
      '<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow detail panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
      '{%! $.loadingTemplate %}',
      '<ul data-dojo-attach-point="metricNode" class="metric-list"></ul>',
      '<div class="panel-content" data-dojo-attach-point="contentNode"></div>',
      '</div>',
    ]);
  },
  postCreate: function postCreate() {
    this.inherited(arguments);
  },
  destroyWidgets: function destroyWidgets() {
    array.forEach(this.metricWidgets, (widget) => {
      widget.destroy();
    }, this);
  },
  processEntry: function processEntry(entry) {
    this.inherited(arguments);
    this.rebuildWidgets(entry);
  },
  createMetricWidgetsLayout: function createMetricWidgetsLayout() {},
  rebuildWidgets: function rebuildWidgets(entry) {
    this.destroyWidgets();
    this.metricWidgets = [];

    // Create metrics widgets and place them in the metricNode
    const widgetOptions = this.createMetricWidgetsLayout(entry) || [];
    array.forEach(widgetOptions, function createAndPlaceWidget(options) {
      if (this.hasValidOptions(options)) {
        const widget = new MetricWidget(options);
        widget.placeAt(this.metricNode, 'last');
        widget.requestData();
        this.metricWidgets.push(widget);
      }
    }, this);
  },
  hasValidOptions: function hasValidOptions(options) {
    return options && options.queryArgs && options.queryArgs._filterName && options.queryArgs._metricName;
  },
});

lang.setObject('Mobile.SalesLogix.Views._MetricDetailMixin', __class);
export default __class;
