import lang from 'dojo/_base/lang';
import array from 'dojo/_base/array';

/**
 * @class crm.Aggregate
 *
 * Aggregate functions. Currently used in metric widgets.
 *
 */
const __class = lang.setObject('crm.Aggregate', {
  /**
   * Average
   * @param {Array} data Array of objects that contain a value property
   * @return {Number}
   */
  avg: function avg(data) {
    const aggr = window.crm.Aggregate;
    const average = aggr.sum(data) / aggr.count(data);
    return isNaN(average) ? 0 : average;
  },
  /**
   * Count
   * @param {Array} data Array of objects that contain a value property
   * @return {Number}
   */
  count: function count(data) {
    return data && data.length;
  },
  /**
   * First
   * @param {Array} data Array of objects that contain a value property
   * @returns
   * The first elements "value" property value
   */
  first: function first(data) {
    return data && data.length && data[0].value;
  },
  /**
   * Last
   * @param {Array} data Array of objects that contain a value property
   * @returns
   * The last elements "value" property value
   */
  last: function last(data) {
    return data && data.length && data[data.length - 1].value;
  },
  /**
   * Maximum
   * @param {Array} data Array of objects that contain a value property
   * @return {Number}
   */
  max: function max(data) {
    const flatten = array.map(data, (item) => {
      return item.value;
    });

    return Math.max.apply(null, flatten);
  },
  /**
   * Minimum
   * @param {Array} data Array of objects that contain a value property
   * @return {Number}
   */
  min: function min(data) {
    const flatten = array.map(data, (item) => {
      return item.value;
    });

    return flatten.length > 0 ? Math.min.apply(null, flatten) : 0;
  },
  /**
   * Sum
   * @param {Array} data Array of objects that contain a value property
   * @return {Number}
   */
  sum: function sum(data) {
    let total = 0;
    if (!Array.isArray(data)) {
      return total;
    }

    total = data.reduce((p, c) => {
      return p + c.value;
    }, 0);

    return total;
  },
});

lang.setObject('Mobile.SalesLogix.Aggregate', __class);
export default __class;
