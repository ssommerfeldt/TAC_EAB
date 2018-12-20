/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/MapData", [
    'dojo/_base/declare'
],
function (declare) {
  var mapData = declare("Sage.ProximitySearch.MapData", null, {
      constructor: function () {
          this._selected = [];
          this._deselected = [];
      },
      clear: function () {
          this._selected = [];
          this._deselected = [];
      },
      addPoint: function (point, selected) {
          if (selected) {
              point.order = this._selected.length + 1;
              this._selected.push(point);
          } else {
              this._deselected.push(point);
          }
      },
      getSelected: function () {
          // summary:
          //  Get array of items that are currently selected
          return this._selected;
      },
      getDeselected: function () {
          // summary:
          //  Get array of items that are not currently selected
          return this._deselected;
      },
      selectPoint: function (pt) {
          // summary:
          //  mark indicated point as selected.
          //  If the point does not already exist in the selected data it is assumed to be a new data point.
          // returns:
          //  true if success (false if point was already selected)
          var i = dojo.indexOf(this._deselected, pt);
          if (i >= 0) {
              pt = this._deselected[i];
              this._deselected.splice(i, 1);
          } else if (dojo.indexOf(this._selected, pt) >= 0) {
              return false;
          }
          if (!pt.id) {
              pt.id = "poi" + this._selected.length + this._deselected.length + 1;
          }
          pt.order = this._selected.length + 1;
          this._selected.push(pt);
          return true;
      },
      deselectPoint: function (pt) {
          // summary:
          //  mark indicated point as deselected.  No effect if point does not already exist in data.
          // returns:
          //  true if success
          var i = dojo.indexOf(this._selected, pt);
          if (i >= 0) {
              pt = this._selected[i];
              this._selected.splice(i, 1);
              this._deselected.push(pt);
              for (var j = i; j < this._selected.length; j++) {
                  this._selected[j].order = j + 1;
              }
              return true;
          }
          return false;
      },
      movePoint: function (pt, newIndex, doRenumber) {
          // summary:
          //  move a selected point up or down in the list.  To move to the very end of the list, lst.length should be used.
          var i = dojo.indexOf(this._selected, pt);
          if (i >= 0 && i != newIndex) {
              this._selected.splice(i, 1);
              if (newIndex > i)
                  newIndex--;
              this._selected.splice(newIndex, 0, pt);
              if (doRenumber)
                  this.renumberSelected();
              return true;
          }
          return false;
      },
      renumberSelected: function () {
          // summary:
          //  Reassign pt.order for every item
          for (var i = 0; i < this._selected.length; i++)
              this._selected[i].order = i + 1;
      }
      //--- Private ------------------------------
  });
  return mapData;
});
