/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
require([
    'dijit/_Widget',
    'dijit/_Templated',
    'dijit/layout/BorderContainer',
    'dijit/layout/ContentPane',
    // Event Definitions
    'Sage/ProximitySearch/Events',
    // Utility
    'Sage/ProximitySearch/Utilities',
    // UI Module
    'Sage/ProximitySearch/BingGeocodeModule',
    'Sage/ProximitySearch/BingMapModule',
    'Sage/ProximitySearch/BingRouteModule',
    'Sage/ProximitySearch/GoogleGeocodeModule',
    'Sage/ProximitySearch/GoogleMapModule',
    'Sage/ProximitySearch/GoogleRouteModule',
    'Sage/ProximitySearch/DataNavigationModule',
    'Sage/ProximitySearch/DirectionView',
    'Sage/ProximitySearch/PointEditModule',
    'Sage/ProximitySearch/SelectionModule',
    'Sage/ProximitySearch/ToolbarModule',
    // Model
    'Sage/ProximitySearch/RouteModel',
    'Sage/ProximitySearch/MapData',
    // Extensions
    'Sage/ProximitySearch/Ajax',
    'Sage/ProximitySearch/AjaxIndicatorModule',
    'Sage/ProximitySearch/SlxDataPoint'
],
function (_Widget, _Templated, BorderContainer, ContentPane, Events, Utilities, BingGeocodeModule, BingMapModule, BingRouteModule, GoogleGeocodeModule, GoogleMapModule, GoogleRouteModule, DataNavigationModule, DirectionView, PointEditModule, SelectionModule, ToolbarModule, RouteModel, MapData, Ajax, AjaxIndicatorModule, SlxDataPoint) {
  /*
   * ProximitySearch.js
   * Copyright (c) 2016 Infor (US), Inc.
   *
   * All the components for the proximity search are arranged in modules.  They are losely coupled and communicate via a central app "sandbox".
   */
    dojo.provide("Sage.ProximitySearch.All");
});
