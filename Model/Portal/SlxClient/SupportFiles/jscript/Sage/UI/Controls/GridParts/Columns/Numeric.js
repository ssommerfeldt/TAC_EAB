/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/Numeric", [
    'Sage/UI/Controls/Numeric',
    'dojo/_base/declare',
    'dojo/_base/lang'
],
function (controlsNumeric, declare, lang) {
    var widget = declare("Sage.UI.Controls.GridParts.Columns.Numeric", null, {
        constructor: function (args) {
            lang.mixin(this, args);
            lang.mixin(this, args.editorArgs);
        },
        widgetClass: controlsNumeric,
        isWholeNumberPercent: false,
        format: function (value) {
            var vals = [];
            //If the user entered 0 just return an empty string.
            if (value === 0 || value === null) {
                return 0;
            }

            if (this.isWholeNumberPercent && this.formatType === 'Percent') {
                //Percentage fields store the decimal value, but we want to display the whole number.
                value = Math.round(value * 100) / 10000;
            }

            //Build up display string if formatstring was specified.  Most common case is a PickList used as a percent selector.
            if ((this.displayFormatString) && (this.displayFormatString !== '')) {
                if (this.displayFields.length < 1) {
                    vals.push(value);
                }
                for (var idx = 0; idx < this.displayFields.length; idx++) {
                    //Gather the items to be used in the format 
                    //vals.push(Sage.Utility.getValue(this.grid._by_idx[index].item, this.displayFields[idx]));
                }
                value = Sage.Format.stringFromArray(this.displayFormatString, vals);
                return value;
            }

            //Format the value based on locale number formatting and constraints.
            if (this.formatType === 'Percent') {
                this.constraints['type'] = 'percent';
				this.constraints['round'] = 0;
            }

            value = dojo.number.format(value, lang.mixin(this.constraints, { locale: Sys.CultureInfo.CurrentCulture.name }));
            //dojo.number.format will include a trailing decimal delimiter if places == 0 and round == -1.
            //Assume the need to slice this trailing delimiter.
            if (this.constraints && this.constraints.places === 0 && this.constraints.round === -1
                && value.lastIndexOf(Sys.CultureInfo.CurrentCulture.numberFormat.NumberDecimalSeparator) > -1) {
                value = value.slice(0, value.length - 1);
            }

            if (this.abbreviationLength) {
                var abbreviationFormatter = Sage.Format.abbreviationFormatter(this.abbreviationLength);
                value = abbreviationFormatter(value);
            }
            return value;
        }
    });
    return widget;
});
