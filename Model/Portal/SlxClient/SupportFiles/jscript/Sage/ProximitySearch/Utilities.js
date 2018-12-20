/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/Utilities", [
    'dojo/_base/declare'
],
function (declare) {
    var utilities = declare("Sage.ProximitySearch.Utilities", null, {
      // Utilities
    });

    // Static Functions
    utilities.escapeHTML = function (s) {
      var MAP = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&#34;',
          "'": '&#39;'
      };
      var repl = function (c) { return MAP[c]; };
      return s ? s.replace(/[&<>'"]/g, repl) : "";
    };

    return utilities;
});
