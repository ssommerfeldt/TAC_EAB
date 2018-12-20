import declare from 'dojo/_base/declare';
import query from 'dojo/query';
import domAttr from 'dojo/dom-attr';
import validator from '../../Validator';
import salesProcessUtility from '../../SalesProcessUtility';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';

const resource = getResource('opportunityQuickEdit');

/**
 * @class crm.Views.Opportunity.QuickEdit
 *
 * @extends argos.Edit
 *
 * @requires argos.Utility
 *
 * @requires crm.Validator
 * @requires crm.Template
 */
const __class = declare('crm.Views.Opportunity.QuickEdit', [Edit], {
  // Localization
  estCloseText: resource.estCloseText,
  detailsText: resource.detailsText,
  opportunityStageTitleText: resource.opportunityStageTitleText,
  opportunityText: resource.opportunityText,
  stageText: resource.stageText,
  statusOpenText: resource.statusOpenText,
  statusClosedLostText: resource.statusClosedLostText,
  statusClosedWonText: resource.statusClosedWonText,
  salesProcessText: resource.salesProcessText,
  probabilityText: resource.probabilityText,
  probabilityTitleText: resource.probabilityTitleText,
  potentialText: resource.potentialText,

  // View Properties
  entityName: 'Opportunity',
  id: 'opportunity_quick_edit',
  resourceKind: 'opportunities',
  insertSecurity: 'Entities/Opportunity/Add',
  updateSecurity: 'Entities/Opportunity/Edit',
  querySelect: [
    'Account/AccountName',
    'CloseProbability',
    'EstimatedClose',
    'ExchangeRate',
    'ExchangeRateCode',
    'ExchangeRateDate',
    'ExchangeRateLocked',
    'SalesPotential',
    'Stage',
    'status',
  ],
  queryInclude: [
    '$permissions',
  ],
  init: function init() {
    this.inherited(arguments);
  },
  applyContext: function applyContext(templateEntry) {
    this.fields.EstimatedClose.setValue(templateEntry.EstimatedClose);
  },
  createLayout: function createLayout() {
    const details = {
      title: this.detailsText,
      name: 'OpportunityDetailsEdit',
      children: [{
        relatedView: {
          widgetType: 'relatedContext',
          id: 'opp_related_context_quickEdit',
        },
      }, {
        label: this.stageText,
        name: 'Stage',
        property: 'Stage',
        picklist: 'Opportunity Stage',
        requireSelection: true,
        enabled: false,
        title: this.opportunityStageTitleText,
        type: 'picklist',
      }, {
        label: this.probabilityText,
        name: 'CloseProbability',
        property: 'CloseProbability',
        picklist: 'Opportunity Probability',
        title: this.probabilityTitleText,
        type: 'picklist',
        validator: [
          validator.isInt32,
          validator.isInteger,
        ],
      }, {
        label: this.potentialText,
        name: 'SalesPotential',
        property: 'SalesPotential',
        precision: 2,
        type: 'multiCurrency',
        validationTrigger: 'keyup',
        validator: validator.isCurrency,
      }, {
        label: this.estCloseText,
        name: 'EstimatedClose',
        property: 'EstimatedClose',
        type: 'date',
        timeless: true,
        validator: validator.exists,
      }],
    };

    const layout = this.layout || (this.layout = []);

    if (layout.length > 0) {
      return layout;
    }

    layout.push(details);
    return layout;
  },
  setValues: function setValues(values) {
    this.inherited(arguments);
    this.enableStage(values.$key);
    this.enableProbability(values);
    this.fields.SalesPotential.setCurrencyCode(App.getBaseExchangeRate().code);
  },
  enableStage: function enableStage(opportunityId) {
    const field = this.fields.Stage;
    let label = this.stageText;

    if (!field) {
      return;
    }

    field.disable();
    salesProcessUtility.getSalesProcessByEntityId(opportunityId).then((salesProcess) => {
      if (salesProcess) {
        field.disable();
        label = this.salesProcessText + salesProcess.$descriptor;
        this.setStageLabel(label);
      } else {
        field.enable();
      }
    });
    this.setStageLabel(label);
  },
  setStageLabel: function setStageLabel(label) {
    const field = this.fields.Stage;
    if (field && field.domNode) {
      const node = query('[for="Stage"]', field.domNode);
      if (node && node.length > 0) {
        domAttr.set(node[0], 'innerHTML', label); // TODO: SDK's _Field should provide a label setter
      }
    }
  },
  enableProbability: function enableProbability(entry) {
    const field = this.fields.CloseProbability;
    if (!field) {
      return;
    }
    field.enable();
    if (this.isClosed(entry)) {
      field.disable();
    }
  },
  isClosed: function isClosed(entry) {
    const status = entry.Status;
    if ((status === this.statusClosedWonText) || (status === this.statusClosedLostText)) {
      return true;
    }
    return false;
  },
});

export default __class;
