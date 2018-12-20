<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PxMap.aspx.cs" Inherits="ProximitySearch_PxMap" meta:resourceKey="PxMap" Culture="auto" UICulture="auto" %>

<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.PickList" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.DependencyLookup" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.Lookup" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.HighLevelTypes" Namespace="Sage.SalesLogix.HighLevelTypes" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.Platform.WebPortal" Namespace="Sage.Platform.WebPortal.SmartParts" TagPrefix="SalesLogix" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <%-- IE Should use the latest version available  --%>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="~/favicon.ico" />
    <title>Infor CRM - Contour Distance Search</title>
    <meta http-equiv="X-UA-Compatible" content="IE=9" />
    <style type="text/css">
        #ajaxIndicator {
            position: absolute;
            width: 250px;
            height: 62px;
            top: 0px;
            left: 0px;
            z-index: 999;
            background-color: White;
        }

        #map {
            height: 100%;
        }

        #selection {
            background-color: White;
            max-height: 72%;
            overflow-y: scroll;
        }

        #navigation {
            text-align: center;
        }

        /* 
         * SelectionViewModule
         */
        #selection td {
            padding: 2px;
        }

        #selection td.selected {
            font-weight: bold;
        }

        #selection td.rowEven {
            background-color: #FAFAFA;
        }

        #selection td.selected:hover {
            background-color: #C0C0FF;
        }

        #selection td.deselected {
            cursor: move;
            color: #999;
        }

        #selection .dojoDndItemAnchor td {
            background-color: #C0C0FF;
            border: 1px dotted black;
        }

        #selection .dojoDndItemSelected td {
            background-color: #C0C0FF;
        }

        td.avatar {
        }

        #selection td.selected div.details {
            font-weight: normal;
            display: none;
        }

        #selection .dojoDndItemAnchor td div.details {
            display: block;
        }

        #selection td.selected div.details div.links {
            text-align: right;
        }

        #directions {
            overflow: auto;
        }

        .directions .routesummary {
            margin-left: 15px;
            font-size: 110%;
            font-weight: bold;
        }

        .directions .waypoint {
            font-weight: bold;
            font-style: italic;
            margin: 9px 0 2px 0;
        }

        .pushpin div {
            color: Black !important;
        }

        #helpbutton {
            position: absolute;
            z-index: 1;
            right: 5px;
            top: 5px;
        }

        /* For printing show only the map and the directions */
        @media print {
            #directions {
                display: none !important;
            }

            #directionsPrint {
                display: block !important;
                position: absolute;
                top: 650px;
            }

            #sidebar {
                display: none !important;
            }

            #map {
                width: 100% !important;
                position: absolute !important;
                top: 0px !important;
                left: 0px !important;
                right: 0px !important;
                height: 600px !important;
            }

            .dijitSplitContainer-child {
                border: 0px !important;
            }

            .dijitSplitter {
                display: none !important;
            }

            #helpbutton {
                display: none !important;
            }
        }
    </style>

    <%-- un-comment this block to use seperate style sheets
    <link rel="stylesheet" type="text/css" href="~/css/SlxBase.css" />
    <link rel="stylesheet" type="text/css" href="~/css/quickform.css" />
    <link rel="stylesheet" type="text/css" href="~/css/sage-controls.css" />
    <link rel="stylesheet" type="text/css" href="~/css/sage-platform.css" />
    <link rel="stylesheet" type="text/css" href="~/css/sageStyles.css" />
    <link rel="stylesheet" type="text/css" href="~/css/layout.css" />
    <link rel="stylesheet" type="text/css" href="~/css/theme.css" />
    <link rel="stylesheet" type="text/css" href="~/css/Global_Images.css" />--%>

    <%-- comment this styles out if using seperate style sheets above--%>
    <link rel="stylesheet" type="text/css" href="~/css/sage-styles.css" />

    <!-- dojo -->
    <%-- debug theme styles: uncomment for debugging and development 
    <link rel="stylesheet" type="text/css" href="~/css/themes/inforSoHoXi/inforSoHoXi.debug.css" />            
    --%>

    <%-- production theme styles: comment for debugging and development --%>
    <link rel="stylesheet" type="text/css" href="~/css/themes/inforSoHoXi/inforSoHoXi.css" />

    <!-- style -->
    <link rel="stylesheet" type="text/css" href="~/css/layout.css" />
    <!--[if IE]>
	<link rel="stylesheet" type="text/css" href="~/css/layout-ie.css" />
    <![endif]-->
    <link rel="stylesheet" type="text/css" href="~/css/theme.css" />
    <!-- temporary -->
    <link rel="stylesheet" type="text/css" href="~/css/sageStyles.css" />
    <link rel="stylesheet" type="text/css" href="~/css/Global_Images.css" />

    <%-- Ripped and merged from querybuilder dll --%>
    <link rel="stylesheet" type="text/css" href="~/css/GroupBuilder/main.css" />
</head>
<body class="inforSoHoXi">
    <script>require(["dojo/parser", "dijit/layout/ContentPane", "dijit/layout/BorderContainer"]);</script>
    <%=GenerateIncludeScripts()%>
    <form id="form1" runat="server">
        <div id="container">
            <div id="ajaxIndicator">
                <asp:Image ID="imgLoad" runat="server" ImageUrl="~/images/ProximitySearch/ajaxloading.gif" meta:resourceKey="imgLoad" /><br />
                <asp:Label ID="lblLoad" runat="server" meta:resourceKey="lblLoad"></asp:Label>
            </div>
            <div dojotype="dijit.layout.BorderContainer" design="sidebar" style="position: absolute; left: 0px; right: 0px; bottom: 0px; top: 0px">
                <div id="sidebar" dojotype="dijit.layout.ContentPane" region="left" splitter="true" style="width: 250px; padding: 0; overflow-x: hidden;">
                    <div id="helpbutton">
                        <SalesLogix:PageLink ID="lnkPxMapHelp" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources: Portal, Help_ToolTip %>" Target="Help"
                            NavigateUrl="contourmap" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Help_16x16">
                        </SalesLogix:PageLink>
                    </div>
                    <div id="navLogo" style="padding-left: 5px;">
                        <img runat="server" class="inforUpperLeftLogo" src="~/images/inforLogo64x64.png" alt="Infor CRM" />
                        Infor CRM
                    </div>
                    <div id="selection"></div>
                    <div id="navigation"></div>
                </div>
                <div id="map" dojotype="dijit.layout.ContentPane" region="center" splitter="true" style="position: relative;"></div>
                <div id="directions" class="directions" dojotype="dijit.layout.ContentPane" splitter="true" region="bottom" style="height: 200px;"></div>
            </div>
            <div id="directionsPrint" class="directions" style="display: none"></div>
        </div>
    </form>
    <script>
        // Variables must be declared here for IE to work.
        var app;
        var data;
        var initMap;

        require([
            'Sage/ProximitySearch/All',
            'Sage/ProximitySearch/Ajax',
            'Sage/ProximitySearch/AjaxIndicatorModule',
            'Sage/ProximitySearch/BingGeocodeModule',
            'Sage/ProximitySearch/BingMapModule',
            'Sage/ProximitySearch/BingRouteModule',
            'Sage/ProximitySearch/DataNavigationModule',
            'Sage/ProximitySearch/DirectionView',
            'Sage/ProximitySearch/Events',
            'Sage/ProximitySearch/GoogleGeocodeModule',
            'Sage/ProximitySearch/GoogleMapModule',
            'Sage/ProximitySearch/GoogleRouteModule',
            'Sage/ProximitySearch/MapData',
            'Sage/ProximitySearch/PointEditModule',
            'Sage/ProximitySearch/Sandbox',
            'Sage/ProximitySearch/SelectionModule',
            'Sage/ProximitySearch/SlxDataPoint',
            'Sage/ProximitySearch/ToolbarModule',
            'dojo/domReady!'
        ],
        function (All, Ajax, AjaxIndicatorModule, BingGeocodeModule, BingMapModule, BingRouteModule, DataNavigationModule, DirectionView, Events, GoogleGeocodeModule, GoogleMapModule, GoogleRouteModule, MapData, PointEditModule, Sandbox, SelectionModule, SlxDataPoint, ToolbarModule) {
            // TODO: Layout / split container
			// removed window.initMap function call for Google maps
			<%= (Provider == "Bing")? "window.initMap = function () {" : "" %>
                app = new Sandbox();
                data = new MapData();

                // Once we have a map we can use the session key from the map for these other things...            
                <%= GenerateMapScript() %>

                app.addModule(new DirectionView('directions'));
                // 2nd directions view is used for print view only
                app.addModule(new DirectionView('directionsPrint'));
                app.addModule(new SelectionModule('selection'));
                app.addModule(new ToolbarModule({}, 'navigation'));
                app.addModule(new AjaxIndicatorModule('ajaxIndicator'));
                app.addModule(new PointEditModule());
                app.addModule(new DataNavigationModule());
                app.addExtension('ajax', new Ajax());
                app.setParameter("IMG_URL", "<%=Page.ResolveClientUrl("~/images/ProximitySearch/")%>");

                var errorModule = {
                    initModule: function (sb) {
                        sb.subscribe('Error', function (msg) {
                            alert('Error: ' + msg.toString());
                        });
                    }
                };
                app.addModule(errorModule);

                <%= GenerateDataScript() %>
                app.publish(null, Events.MapRefresh, data);
				
				// removed window.initMap function call for Google maps
				 <%= (Provider == "Bing")? " };" : "" %>
        });
    </script>
    <%=GenerateProviderScript()%>
</body>
</html>
