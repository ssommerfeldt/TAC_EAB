import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.SalesOrder.SData', [Base, _SDataModelBase], {
  id: 'salesorder_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryWhere: 'IsQuote eq false',
      queryOrderBy: 'ErpDocumentDate desc, OrderDate desc',
      querySelect: [
        'SalesOrderNumber',
        'Account/AccountName',
        'Status',
        'ErpExtId',
        'CustomerPurchaseOrderNumber',
        'DocGrandTotal', // Document Total
        'GrandTotal', // Base Total
        'OrderDate',
        'CreateDate',
        'ModifyDate',
        'CurrencyCode',
        'BaseCurrencyCode',
        'ErpSalesOrder/ERPStatus',
        'ErpStatusDate',
        'ErpDocumentDate',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'SalesOrderNumber',
        'ErpExtId',
        'CustomerPurchaseOrderNumber',
        'Account/AccountName',
        'Opportunity/Description',
        'Quote/QuoteNumber',
        'CreateDate',
        'ModifyDate',
        'OrderDate',
        'DueDate',
        'ErpDocumentDate',
        'Status',
        'StatusDate',
        'ErpShipTo/Name',
        'ErpShipTo/Address/*',
        'ErpBillTo/Name',
        'ErpBillTo/Address/*',
        'ErpPayFrom/Address/*',
        'DocGrandTotal', // Document Total
        'GrandTotal', // Base Total
        'DocOrderTotal',
        'GrandTotal',
        'OrderTotal',
        'ErpPaymentMethod',
        'ErpPaymentTermId',
        'ErpBackOrdered',
        'ErpDropShip',
        'ErpShipEarly',
        'ErpInvoiceImmediately',
        'ErpPartialShipAllowed',
        'ErpTaxExempt',
        'CurrencyCode',
        'BaseCurrencyCode',
        'ErpLogicalId',
        'ErpAccountingEntityId',
        'ExchangeRate',
        'SyncStatus',
        'AccountManager/*',
        'ErpLocation',
        'WarehouseLocation/Address/*',
        'WarehouseLocation/Description',
        'Location/Address/*',
        'Location/Description',
        'RequestedBy/NameLF',
        'Carrier/CarrierName',
        'ErpSalesOrder/ERPStatus',
        'ErpStatusDate',
      ],
      queryInclude: [
        '$permissions',
      ],
    }, {
      name: 'edit',
      querySelect: [
        'SalesOrderNumber',
        'ErpExtId',
        'CustomerPurchaseOrderNumber',
        'Account/AccountName',
        'Opportunity/Description',
        'Quote/QuoteNumber',
        'CreateDate',
        'ModifyDate',
        'OrderDate',
        'DueDate',
        'ErpDocumentDate',
        'Status',
        'StatusDate',
        'ErpShipTo/Address/*',
        'ErpBillTo/Address/*',
        'ErpPayFrom/Address/*',
        'GrandTotal',
        'OrderTotal',
        'ErpPaymentMethod',
        'ErpPaymentTermId',
        'ErpBackOrdered',
        'ErpDropShip',
        'ErpShipEarly',
        'ErpInvoiceImmediately',
        'ErpPartialShipAllowed',
        'ErpTaxExempt',
        'CurrencyCode',
        'BaseCurrencyCode',
        'ErpLogicalId',
        'ErpAccountingEntityId',
        'ExchangeRate',
        'ErpSyncStatus',
        'AccountManager/*',
        'ErpLocation',
        'WarehouseLocation/*',
        'Location/*',
        'RequestedBy/NameLF',
        'Carrier/*',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.SALESORDER, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.SalesOrder.SData', __class);
export default __class;
