/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/SlxDataPoint", [
    'dojo/_base/declare'
],
function (declare) {
  var slxDataPoint = declare("Sage.ProximitySearch.SlxDataPoint", null, {
      // summary:
      //  Just a collection of the point's properties at the moment, may add some behavior later
      constructor: function (data) {
          dojo.mixin(this, data);
      }
  });
  return slxDataPoint;
});
