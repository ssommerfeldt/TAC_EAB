/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Utility/Entity", [
    'dojo/date/locale',
    'dojox/grid/cells/_base',
    'Sage/Utility',
    'dojo/string',
    'dojo/i18n!./nls/Activity',
    'dojo/_base/declare',
    'Sage/Data/SDataServiceRegistry',
    'Sage/Data/SingleEntrySDataStore'
],
function (dateLocale, cell, utility, dstring, nlsStrings, declare, sDataServiceRegistry, SingleEntrySDataStore) {
    var nameCell = declare("Sage.Utility.Entity.TypeCell", dojox.grid.cells.Cell, {
        format: function (inRowIndex, inItem) {
            //console.log('index: ' + inRowIndex + '   item: %o', inItem);
            if (!inItem) {
                return this.defaultValue;
            }
            var fmtStr = '<span onclick="${0}" class="activity-type-link" ><div class="${1}" title="${2}"></div>&nbsp;${2}</span>';
            var href = 'javascript:Sage.Link.editEntityOptions(\'' + inItem.name + '\', ' + false + ')';
            return dstring.substitute(fmtStr, [href, '', inItem.name]);
        }
    });
    
    Sage.namespace('Utility.Entity');
    Sage.Utility.Entity = {
        entityNameCell: nameCell
    };

    return Sage.Utility.Entity;
});
