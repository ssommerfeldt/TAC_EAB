import lang from 'dojo/_base/lang';
import dojoNumber from 'dojo/number';
import format from 'argos/Format';

const f = ICRMCommonSDK.format;

/**
 * @class crm.Format
 *
 * @extends argos.Format
 * @requires crm.Template
 *
 */
const __class = lang.setObject('crm.Format', lang.mixin({}, format, {
  /**
   * Address Culture Formats as defined by crm.Format.address
   * http://msdn.microsoft.com/en-us/library/cc195167.aspx
   */
  addressCultureFormats: f.addressCultureFormats,
  /**
   * Country name to culture identification
   * http://msdn.microsoft.com/en-us/goglobal/bb896001.aspx
   */
  countryCultures: f.countryCultures,
  addressItems: f.addressItems,
  /**
  Converts the given value using the provided format, joining with the separator character
  If no format given, will use predefined format for the addresses Country (or en-US as final fallback)
  <pre>
  Format    Description                                    Example
  ------    -----------------------------------------    -----------------------
   s         Salutation (Attention, Name)                ATTN: Mr. Bob
   S         Salutation Uppercase                        ATTN: MR. BOB
   a1        Address Line 1                              555 Oak Ave
   a2        Address Line 2                                #2038
   a3        Address Line 3
   m        Municipality (City, town, hamlet)            Phoenix
   M        Municipality Uppercase                        PHOENIX
   z        County (parish, providence)                    Maricopa
   Z         County Uppercase                            MARICOPA
   r        Region (State, area)                        AZ
   R        Region Uppercase                            AZ
   p         Postal Code (ZIP code)                        85021
   P         Postal Code Uppercase                        85021
   c         Country                                     France
   C         Country Uppercase                            FRANCE

   |        separator                                    as defined by separator variable
   </pre>
   @param {object} addr Address Entity containing all the SData properties
   @param {boolean} asText If set to true returns text only, if false returns anchor link to google maps
   @param {string|boolean} separator If false - separates with html <br>,
                        if true - separates with line return,
                        if defined as string - uses string to separate
   @param {string} fmt Address format to use, may also pass a culture string to use predefined format
   @return {string} Formatted address
  */
  address: f.address,
  collapseSpace: f.collapseSpace,
  resolveAddressCulture: f.resolveAddressCulture,
  replaceAddressPart: f.replaceAddressPart,
  // These were added to the SDK, and should not be here. Keeping the alias to not break anyone with a minor update.
  phoneFormat: f.phoneFormat,
  phone: f.phone,
  currency: function currency(_val) {
    return f.currency(_val, Mobile.CultureInfo.numberFormat.currencyDecimalSeparator,
      Mobile.CultureInfo.numberFormat.currencyGroupSeparator);
  },
  bigNumberAbbrText: {
    billion: 'B',
    million: 'M',
    thousand: 'K',
  },
  bigNumber: function bigNumber(val) {
    let numParse = typeof val !== 'number' ? parseFloat(val) : val;
    const absVal = Math.abs(numParse);
    const text = crm.Format.bigNumberAbbrText;

    if (isNaN(numParse)) {
      return val;
    }

    let results = numParse.toString();
    if (absVal >= 1000000000) {
      numParse = numParse / 1000000000;
      results = dojoNumber.format(numParse, {
        places: 1,
      }) + text.billion;
    } else if (absVal >= 1000000) {
      numParse = numParse / 1000000;
      results = dojoNumber.format(numParse, {
        places: 1,
      }) + text.million;
    } else if (absVal >= 1000) {
      numParse = numParse / 1000;
      results = dojoNumber.format(numParse, {
        places: 1,
      }) + text.thousand;
    } else {
      results = dojoNumber.round(numParse, 2).toString();
    }

    return results;
  },
  relativeDate: f.relativeDate,
  multiCurrency: f.multiCurrency,
  nameLF: f.nameLF,
  mail: f.mail,
  // TODO: L20n
  userActivityFormatText: {
    asUnconfirmed: 'Unconfirmed',
    asAccepted: 'Accepted',
    asDeclned: 'Declined',
  },
  // TODO: Move
  userActivityStatus: function userActivityStatus(val) {
    return crm.Format.userActivityFormatText[val];
  },
  /**
   * Takes a string input and converts name to First amd Last initials
   * `Lee Hogan` -> `LH`
   * @param val
   * @returns {String}
   */
  formatUserInitial: f.formatUserInitial,
  /**
   * Takes a string input and the user name to First amd Last name
   * `Hogan, Lee` -> `Lee Hogan`
   * @param val
   * @returns {String}
   */
  formatByUser: f.formatByUser,
  /**
   * Takes a string input and the user name to First amd Last name
   * `Hogan, Lee` -> `Lee Hogan`
   * @param val
   * @returns {String}
   */
  resolveFirstLast: f.resolveFirstLast,
  fixedLocale: function fixedLocale(val, d) {
    return f.fixedLocale(val, d, Mobile.CultureInfo.numberFormat.numberGroupSeparator,
    Mobile.CultureInfo.numberFormat.numberDecimalSeparator);
  },
}));

lang.setObject('Mobile.SalesLogix.Format', __class);
export default __class;
