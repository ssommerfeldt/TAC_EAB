/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/Events", [
    'dojo/_base/declare'
],
function (declare) {
  var events = declare("Sage.ProximitySearch.Events", null, {
  });

  // Constants
  events.AjaxStart = 'Ajax/Start';
  events.AjaxEnd = 'Ajax/End';

  events.MapRefresh = 'Map/Refresh'; // search has completed (this is for the initial data refresh)
  events.MapSession = 'Map/Session'; // fires after the map has loaded to pass the session key

  events.SelectionNew = 'Selection/New';  // request to edit a new point
  events.SelectionCreate = 'Selection/Create';  // request to geocode and create the new point
  events.SelectionAdd = 'Selection/Add';     // an array of items to be added to selection
  events.SelectionRemove = 'Selection/Remove';   // an array of items to be removed from selection
  events.SelectionReorder = 'Selection/Reorder';  // order changed for items in the selection - parameter is list in the new order
  events.ItemHighlight = 'Item/Highlight';  // highlight single item, parameter is data point
  events.ItemUnhighlight = 'Item/Unhighlight';  // unhighlight
  events.ItemCenter = 'Item/Center';  // center

  events.RouteCalculate = 'Route/Calculate';  // user requested a route be calculated based on current selection
  events.RouteOptimize = 'Route/Optimize'; // user requested route order be optimized
  events.RouteUpdated = 'Route/Updated';  // route has been calculated
  // Route segment highlighting is not implemented yet because we are not retrieving path for the individual segments of a trip
  events.RouteSegmentHighlight = 'Route/SegmentHighlight'; // hovering over a wp - param = wp (RouteModel)
  events.RouteSegmentUnhighlight = 'Route/SegmentUnhighlight';

  events.DataNavigate = 'Data/Navigate'; // navigate to data point

  return events;
});
