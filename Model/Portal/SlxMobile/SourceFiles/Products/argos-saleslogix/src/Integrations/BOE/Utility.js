import lang from 'dojo/_base/lang';
import Adapter from 'argos/Models/Adapter';
import MODEL_NAMES from './Models/Names';
import format from '../../Format';

/**
 * @class icboe.Utility
 *
 * Utility provides functions that are more javascript enhancers than application related code.
 *
 * @singleton
 *
 */
const __class = lang.setObject('crm.Integrations.BOE.Utility', {
  // Lookup table for the aggregate functions used by DashboardWidget
  aggregateLookup: {
    calcProfit: function calcProfit(fn, widget, data) {
      const revenue = data[0];
      const cost = data[1];

      return fn.call(widget, revenue, cost);
    },
    calcMargin: function calcMargin(fn, widget, data) {
      const revenue = data[0];
      const cost = data[1];

      return fn.call(widget, revenue, cost);
    },
    calcYoYRevenue: function calcYoYRevenue(fn, widget, data) {
      const pastYear = data[0];
      const between = data[1];

      return fn.call(widget, pastYear, between);
    },
    calcYoYProfit: function calcYoYProfit(fn, widget, data) {
      return fn.call(widget, data[0], data[2], data[1], data[3]);
    },
    calcYoYMargin: function calcYoYMargin(fn, widget, data) {
      return fn.call(widget, data[0], data[2], data[1], data[3]);
    },
    sum: function sum(fn, widget, data) {
      return fn.call(widget, data);
    },
  },
  /**
   * @params
   * mappedLookups: Array of lookup names that must match the model names
   * mappedProperties: Array of the properties on the entry with the searched id
   * fields: Array of field names from the edit view
   * scope: 'this' of the edit view
   * @return
   * Returns a promise that is resolved once all entries are returned
   */
  setFieldsFromIds: function setFieldsFromIds(mappedLookups = [], mappedProperties = [], fields = [], scope, entry = {}) {
    const promises = [];
    fields.forEach((f, index) => {
      const temp = scope.options.entry ? scope.options.entry[f] : null;
      const value = entry[f] || scope.entry[f] || temp;
      if (!value) {
        return;
      }
      const model = Adapter.getModel(MODEL_NAMES[mappedLookups[index].toUpperCase()]);
      if (!model) {
        console.warn('Unable to locate model for ' + f); // eslint-disable-line
        return;
      }
      model.init();
      const options = {
        async: false,
        queryModelName: 'detail',
        query: `${mappedProperties[index]} eq "${value}"`,
      };
      const promise = model.getEntries(null, options);
      promises.push(promise);
      promise.then((entries) => {
        const returned = entries[0];
        if (returned) {
          scope.fields[mappedLookups[index]].setSelection(returned);
          scope.fields[mappedLookups[index]].onChange(scope.fields[mappedLookups[index]].currentSelection, scope.fields[mappedLookups[index]]);
        }
      });
    });
    return Promise.all(promises);
  },
  formatMultiCurrency: function formatMultiCurrency(val, currencyCode) {
    let result = null;
    const tempVal = val || 0;
    if (App.hasMultiCurrency() && currencyCode) {
      result = format.multiCurrency.call(null, tempVal, currencyCode);
    } else {
      result = format.currency.call(null, tempVal);
    }
    return result || '';
  },
  getBaseCurrencyCode: function getBaseCurrencyCode() {
    if (App.context && App.context.systemOptions && App.context.systemOptions.BaseCurrency) {
      const results = App.context.systemOptions.BaseCurrency;
      return results;
    }

    return '';
  },
});

lang.setObject('icboe.Utility', __class);
export default __class;
