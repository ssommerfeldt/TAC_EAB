/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/DateTime", [
    'dojo/date/locale',
    'Sage/Utility',
    'Sage/Utility/Activity',
    'dojo/_base/declare',
    'dojo/_base/lang'
],
function (locale, Utility, activityUtility, declare, lang) {
    var widget = declare('Sage.UI.Controls.GridParts.Columns.DateTime', null, {
        // summary:
        //  Read-only date/time display column.
        //  The following configuration properties may be included when setting up the column:
        //  * formatType (date, time, or date/time - defaults to date/time)
        timelessField: '',
        timelessText: '',
        dateOnly: false,
        utc: false,
        useFiveSecondRuleToDetermineTimeless: false,
        constructor: function (args) {
            lang.mixin(this, args);
        },
        format: function (inRowIndex, inItem) {
            var retVal = this.formattedDate(inRowIndex, inItem);
            if (this.abbreviationLength) {
                var abbreviationFormatter = Sage.Format.abbreviationFormatter(this.abbreviationLength);
                retVal = abbreviationFormatter(retVal);
            }
            return retVal;
        },
        formattedDate: function (inRowIndex, inItem) {
            // summary:
            //	if given a date, convert it to local time and provide corresponding HTML
            if (!inItem)
                return '';
            var d = inRowIndex ? inRowIndex : this.defaultValue;

            this.dateOnly = (typeof this.dateTimeType === 'undefined') ? this.dateOnly : (this.dateTimeType.toUpperCase() === 'D');

            if (!d)
                return '';
            d = convert.toDateFromString(d, true);
            if (!d || d.constructor !== Date) {
                return '';
            }
            var tless = false;
            if (this.timelessField && this.timelessField !== '') {
                tless = convert.toBoolean(Utility.getValue(inItem, this.timelessField, 'F'));
            }
            if (this.useFiveSecondRuleToDetermineTimeless) {
                tless = activityUtility.isDateFiveSecondRuleTimeless(d);
            }
            // TODO: edit mode?    
            if (!this.dateOnly && !this.datePattern) {
                if (!tless) {
                    return locale.format(d, { selector: this.formatType || 'date/time', fullYear: true, locale: Sys.CultureInfo.CurrentCulture.name });
                } else {
                    var timelessDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 5);
                    return dojo.date.locale.format(timelessDate, { selector: 'date', fullYear: true, locale: Sys.CultureInfo.CurrentCulture.name }) + this.timelessText;
                }
            } else if (this.datePattern) {
                // If this is a date-only value ("D" date time type), undo the local time conversion before formatting.
                if (this.dateOnly) {
                    d = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
                }
                return d.format(this.datePattern, { locale: Sys.CultureInfo.CurrentCulture.name });
            } else {
                if (this.utc) {
                    var dateOnly = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
                    return locale.format(dateOnly, { selector: 'date', fullYear: true, locale: Sys.CultureInfo.CurrentCulture.name });
                }
                else {
                    return dojo.date.locale.format(d, { selector: 'date', fullYear: true, locale: Sys.CultureInfo.CurrentCulture.name });
                }
            }
        }
    });

    // conversion helper is used locally, and also registered under Sage.UI.Columns.DateTime.
    // It's a bit of a kludge, ideally these functions should be shared at a utility level
    var convert = Utility.Convert;

    return widget;
});