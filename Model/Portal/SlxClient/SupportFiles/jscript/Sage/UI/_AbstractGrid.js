/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/_AbstractGrid", ['dojo/_base/declare'],
function (declare) {
    return declare('Sage.UI._AbstractGrid', null, {
        constructor: function () {
            console.error('Abstract Grid is deprecated. Please switch to Sage.UI.GridView or Sage.UI.Controls.Grid');
        }
    });
});
