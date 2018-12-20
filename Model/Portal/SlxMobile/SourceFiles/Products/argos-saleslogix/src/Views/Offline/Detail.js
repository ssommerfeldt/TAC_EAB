/**
 * @class crm.Views.Offline.Detail
 *
 *
 * @extends argos._DetailBase
 * @requires argos._DetailBase
 *
 */
import declare from 'dojo/_base/declare';
import _DetailBase from 'argos/_DetailBase';
import array from 'dojo/_base/array';
import domConstruct from 'dojo/dom-construct';
import format from '../../Format';
import _RelatedWidgetDetailMixin from 'argos/_RelatedViewWidgetDetailMixin';
import MODEL_TYPES from 'argos/Models/Types';
import lang from 'dojo/_base/lang';
import query from 'dojo/query';
import getResource from 'argos/I18n';

const resource = getResource('offlineDetail');
export default declare('crm.Views.Offline.Detail', [_DetailBase, _RelatedWidgetDetailMixin], {
  id: 'offline_detail',
  titleText: resource.titleText,
  offlineText: resource.offlineText,
  idProperty: 'id',
  offlineDoc: null,
  detailHeaderTemplate: new Simplate([
    '<div class="detail-header">',
    '{%: $.value %}',
    '</div>',
    '<div class="detail-sub-header">',
    '{%: $.offlineDate %}',
    '</div>',
  ]),
  relatedTemplate: new Simplate([
    '<li class="{%= $.cls %}">',
    '<a data-action="activateRelatedList" data-view="{%= $.view %}" data-name="{%: $.name %}" data-context="{%: $.context %}" {% if ($.disabled) { %}data-disable-action="true"{% } %} class="{% if ($.disabled) { %}disabled{% } %}">',
    '{% if ($.icon) { %}',
    '<img src="{%= $.icon %}" alt="icon" class="icon" />',
    '{% } else if ($.iconClass) { %}',
    '<div class="{%= $.iconClass %}" alt="icon"></div>',
    '{% } %}',
    '<span class="related-item-label">{%: $.label %}</span>',
    '</a>',
    '</li>',
  ]),
  show: function show(options) {
    this._initOfflineView(options);
    this.inherited(arguments);
  },
  _initOfflineView: function _initOfflineView(options) {
    this.offlineContext = {
      entityName: null,
      entityId: null,
      viewId: null,
      offlineDate: null,
      source: null,
    };
    this.refreshRequired = true;
    lang.mixin(this.offlineContext, options.offlineContext);
    this._model = App.ModelManager.getModel(this.offlineContext.entityName, MODEL_TYPES.OFFLINE);

    if (!this.offlineContext.viewId) {
      this.offlineContext.viewId = (this._model.detailViewId) ? this._model.detailViewId : `${this._model.entityName.toLowerCase()}_detail`;
    }

    this._entityView = this.getEntityView();
  },
  onTransitionTo: function onTransitionTo() {
    this.inherited(arguments);
    App.setToolBarMode(false);
  },
  getEntityView: function getEntityView() {
    const newViewId = `${this.id}_${this.offlineContext.viewId}`;
    const view = App.getView(this.offlineContext.viewId);

    if (this._entityView) {
      this._entityView.destroy();
      this._entityView = null;
    }

    if (view) {
      const ViewCtor = view.constructor;
      this._entityView = new ViewCtor({ id: newViewId });
    }
    return this._entityView;
  },
  _applyStateToGetOptions: function _applyStateToGetOptions() {},
  _buildGetExpression: function _buildGetExpression() {
    const options = this.options;
    return options && (options.id || options.key);
  },
  placeDetailHeader: function placeDetailHeader() {
    let value;
    let offlineDate = '';
    if (this._model && this._model.entityDisplayName) {
      value = `${this._model.entityDisplayName} ${this.informationText}`;
    } else {
      value = `${this.entityText} ${this.informationText}`;
    }
    value = `${value} - ${this.offlineText}`;
    if (this.entry.$offlineDate) {
      offlineDate = format.relativeDate(this.entry.$offlineDate);
    }
    domConstruct.place(this.detailHeaderTemplate.apply({ value, offlineDate }, this), this.tabList, 'before');
  },
  createLayout: function createLayout() {
    const view = this._entityView;
    const original = App.getView(this.offlineContext.viewId);
    let layout = [];
    if (view && original) {
      view.entry = this.entry;
      original.entry = this.entry;
      layout = original._createCustomizedLayout.apply(original, [original.createLayout.apply(original)]);
      original.layout = null;
      original.refreshRequired = true;
    }

    layout = layout.filter(({ enableOffline }) => {
      if (typeof enableOffline === 'undefined' || enableOffline === null) {
        return true;
      }

      return enableOffline;
    });

    this.disableSections(layout);
    this.applyRelatedSections(layout);
    return layout;
  },
  disableSections: function disableSections(sections) {
    array.forEach(sections, (section) => {
      this.disableSection(section);
    }, this);
  },
  disableSection: function disableSection(section) {
    array.forEach(section.children, (property) => {
      this.disableProperty(section, property);
    }, this);
  },
  disableProperty: function disableProperty(section, property) {
    if (property.enableOffline) {
      return;
    }
    property.disabled = true;
  },
  applyRelatedSections: function applyRelatedSections(sections) {
    this._relatedItems = {};
    array.forEach(sections, (section) => {
      if (section.name === 'RelatedItemsSection') {
        section.children = [];
        this.addRelatedLayout(section);
      }
    }, this);
  },
  addRelatedLayout: function addRelatedLayout(section) {
    const rels = this._model.relationships;
    array.forEach(rels, (rel) => {
      if (rel && rel.relatedEntity) {
        const relatedModel = App.ModelManager.getModel(rel.relatedEntity, MODEL_TYPES.OFFLINE);
        let viewId;
        if (rel.viewId) {
          viewId = rel.viewId;
        } else if (relatedModel && relatedModel.listViewId) {
          viewId = relatedModel.listViewId;
        } else {
          viewId = `${rel.relatedEntity.toLowerCase()}_related`;
        }

        const item = {
          name: rel.name,
          entityName: rel.relatedEntity,
          label: rel.displayName,
          view: viewId,
          relationship: rel,
        };

        this._relatedItems[item.name] = item;
        section.children.push(item);
      }
    }, this);
  },
  _processRelatedItem: function _processRelatedItem(data, context, rowNode) {
    const labelNode = query('.related-item-label', rowNode)[0];
    const { relationship } = data;
    if (labelNode && relationship) {
      this._model.getRelatedCount(relationship, this.entry).then((count) => {
        const html = `<span class="related-item-count">${count}</span>`;
        domConstruct.place(html, labelNode, 'before');
      }, (err) => {
        console.warn('Error getting related item count: ' + err); //eslint-disable-line
      });
    } else {
      console.warn('Missing the "related-item-label" dom node.'); //eslint-disable-line
    }
  },
  activateRelatedEntry: function activateRelatedEntry(params) {
    if (params.context) {
      // this.navigateToRelatedView(params.view, parseInt(params.context, 10), params.descriptor);
      this.navigateToRelatedDetailView(params);
    }
  },
  activateRelatedList: function activateRelatedList(params) {
    if (params.context) {
      this.navigateToRelatedListView(params);
    }
  },
  navigateToRelatedListView: function navigateToRelatedListView(params) {
    const rel = this._relatedItems[params.name];
    const view = App.getView('offline_list');
    const queryExpression = this._model.buildRelatedQueryExpression(rel.relationship, this.entry);
    const options = {
      title: rel.label,
      offlineContext: {
        parentEntry: this.entry,
        parentEntityId: this._model.getEntityId(this.entry),
        entityName: rel.entityName,
        viewId: rel.view,
        related: rel,
        source: this,
        queryExpression,
      } };
    options.fromContext = this;
    options.selectedEntry = this.entry;
    if (view && options) {
      view.show(options);
    }
  },
  navigateToRelatedDetailView: function navigateToRelatedDetailView(params) {
    const slot = parseInt(params.context, 10);
    const rel = this._navigationOptions[slot];
    const relViewId = params.view;
    const relView = App.getView(relViewId);

    if (relView) {
      const model = relView.getModel();
      if (model) {
        const options = {
          descriptor: params.descriptor,
          title: params.descriptor,
          key: rel.key,
          fromContext: this,
          offlineContext: {
            entityId: rel.key,
            entityName: model.entityName,
            viewId: relViewId,
          },
        };
        const view = this.getRelatedDetailView(model.entityName);

        if (view) {
          view.show(options);
        }
      }
    }
  },
  getRelatedDetailView: function getRelatedDetailView(entityName) {
    const viewId = `offline_detail_${entityName}`;
    let view = this.app.getView(viewId);

    if (view) {
      return view;
    }

    this.app.registerView(new this.constructor({ id: viewId }));
    view = this.app.getView(viewId);
    return view;
  },

});
