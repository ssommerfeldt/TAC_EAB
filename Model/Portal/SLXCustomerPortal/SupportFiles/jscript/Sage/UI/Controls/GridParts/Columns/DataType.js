/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/GridParts/Columns/DataType", [
        'dojo/string',
        'dojo/_base/declare',
        'Sage/Utility/Filters'
],
function (dString, declare, Filters) {
    var widget = declare('Sage.UI.Controls.GridParts.Columns.DataType', null, {
        constructor: function(){
            this.inherited(arguments);
        },
        format: function(val, index) {
            var t = Filters.resolveDataTypeQB(val),
                results = 'string';
            switch (t){
                case 'Integer':
                    results = 'int';
                    break;
                case 'Decimal':
                    results = 'float';
                    break;
                case 'Date/Time':
                    results = 'date';
                    break;
                case 'Memo/Blob':
                    results = 'blob';
                    break;
                default:
                    results = 'string';
                    break;
                    
            }
            return  dString.substitute('<img src="images/ft_${0}.gif" class="dataTypeColumnDimensions" />', [results]);
        }
    });

    return widget;
});
