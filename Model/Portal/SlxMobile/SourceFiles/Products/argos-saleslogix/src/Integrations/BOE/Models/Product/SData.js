import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Integrations.BOE.Models.Product.SData', [Base, _SDataModelBase], {
  id: 'product_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'Name',
      querySelect: [
        'Name',
        'Description',
        'Price',
        'ExtendedPrice',
        'CalculatedPrice',
        'Family',
        'Status',
        'ActualId',
        'CommodityType',
        'ErpLogicalId',
        'UnitOfMeasure/*',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Name',
        'Description',
        'Price',
        'ExtendedPrice',
        'CalculatedPrice',
        'Family',
        'Status',
        'ActualId',
        'CommodityType',
        'ErpLogicalId',
        'UnitOfMeasure/*',
      ],
      queryInclude: [
        '$permissions',
      ],
    },
    ];
  },
});

Manager.register(MODEL_NAMES.PRODUCT, MODEL_TYPES.SDATA, __class);
lang.setObject('icboe.Models.Product.SData', __class);
export default __class;
