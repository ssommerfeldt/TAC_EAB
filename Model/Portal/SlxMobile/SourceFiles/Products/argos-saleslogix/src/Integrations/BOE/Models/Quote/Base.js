import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('quoteModel');
const accountResource = getResource('accountModel');
const contactResource = getResource('contactModel');
const quoteItemsResource = getResource('quoteItemModel');
const opportunityResource = getResource('opportunityModel');
const salesorderResource = getResource('salesOrderModel');
const billtoResource = getResource('erpBillToModel');
const shiptoResource = getResource('erpShipToModel');
const syncresultResource = getResource('syncResultModel');

const __class = declare('crm.Integrations.BOE.Models.Quote.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'quotes',
  entityName: 'Quote',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.QUOTE,
  iconClass: 'fa fa-file-text-o fa-2x',
  detailViewId: 'quote_detail',
  listViewId: 'quote_list',
  editViewId: 'quote_edit',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Account',
      displayName: accountResource.entityDisplayNamePlural,
      type: 'ManyToOne',
      relatedEntity: 'Account',
      parentProperty: 'Account',
      parentPropertyType: 'object',
    }, {
      name: 'RequestedBy',
      displayName: contactResource.entityDisplayNamePlural,
      type: 'ManyToOne',
      relatedEntity: 'Contact',
      parentProperty: 'RequestedBy',
      parentPropertyType: 'object',
    }, {
      name: 'Opportunity',
      displayName: opportunityResource.entityDisplayNamePlural,
      type: 'ManyToOne',
      relatedEntity: 'Opportunity',
      parentProperty: 'Opportunity',
      parentPropertyType: 'object',
    }, {
      name: 'SalesOrder',
      displayName: salesorderResource.entityDisplayNamePlural,
      type: 'ManyToOne',
      relatedEntity: 'SalesOrder',
      parentProperty: 'SalesOrder',
      parentPropertyType: 'object',
    }, {
      name: 'BillTo',
      displayName: billtoResource.entityDisplayNamePlural,
      type: 'ManyToOne',
      relatedEntity: 'ERPBillTo',
      parentProperty: 'BillTo',
      parentPropertyType: 'object',
    }, {
      name: 'ShipTo',
      displayName: shiptoResource.entityDisplayNamePlural,
      type: 'ManyToOne',
      relatedEntity: 'ERPShipTo',
      parentProperty: 'ShipTo',
      parentPropertyType: 'object',
    }, {
      name: 'QuoteItem',
      displayName: quoteItemsResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'QuoteItem',
      relatedProperty: 'Quote',
      relatedPropertyType: 'object',
    }, {
      name: 'SyncHistory',
      displayName: syncresultResource.entityDisplayNamePlural,
      type: 'OneToMany',
      relatedEntity: 'SyncResult',
      relatedProperty: 'EntityId',
      where: 'EntityType eq "Quote"',
    },
    ]);
    return rel;
  },
});
lang.setObject('icboe.Models.Quote.Base', __class);
export default __class;
