<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SCItemDashboard.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/dojo/1.8.1/dijit/themes/claro/claro.css"media="screen">
</head>
<body>
    <!-- load Dojo -->
    <script src="//ajax.googleapis.com/ajax/libs/dojo/1.8.1/dojo/dojo.js" data-dojo-config="async: true"></script>
    <script>
        require([
        // Require the basic chart class
    "dojox/charting/Chart",

        // Require the theme of our choosing
        // "dojox/charting/themes/MiamiNice",
        //    "dojox/charting/themes/Grasslands",
    "dojox/charting/themes/Claro",

        //  We want to plot Columns
    "dojox/charting/plot2d/Columns",

        // Load the Legend, Tooltip, and Magnify classes
    "dojox/charting/widget/Legend",
    "dojox/charting/action2d/Tooltip",
    "dojox/charting/action2d/Magnify",

        // Require the highlighter
    "dojox/charting/action2d/Highlight",

        //  We want to use Markers
    "dojox/charting/plot2d/Markers",

        //  We'll use default x/y axes
    "dojox/charting/axis2d/Default",

        // Wait until the DOM is ready
    "dojo/domReady!"
        //], function (Chart, theme, ColumnsPlot, Highlight, Tooltip) {
], function (Chart, theme, LinesPlot, Legend, Tooltip, Magnify) {

    // Define the data
    //var chartData = [30, 34, 0, 65, 12, 17, 24, 7, 45, 78, 43, 23];

    var chartData2 = new Array();
    var chartMonthData = new Array();

    //Convert the String array from the Hidden Values to an Integer array which we can use.
    if (document.getElementById("hiddenTotalValues") != undefined) {
        var str = document.getElementById("hiddenTotalValues").value;
        chartData2 = str.split(",");

        for (var i = 0; i < chartData2.length; i++) {
            chartData2[i] = parseInt(chartData2[i], 10);
        }
    }
    else {
        chartData2 = null;
    }
    //=================================================
    //  Get Month data from Hidden values from Server
    //=================================================
    if (document.getElementById("hiddenMonthValues") != undefined) 
    {
        var strMonthData = document.getElementById("hiddenMonthValues").value;
        chartMonthData = strMonthData.split(",");

     
    }

    // Create the chart within it's "holding" node
    var chart = new Chart("chartNode");

    // Set the theme
    chart.setTheme(theme);

    // Add the only/default plot
    chart.addPlot("default", {
        //type: ColumnsPlot,
        type: LinesPlot,
        markers: true,
        gap: 2
    });

    // Add axes
    //chart.addAxis("x");
    chart.addAxis("x", {
        labels: [
            { value: 0, text: "" },
			{ value: 1, text: chartMonthData[0] },
            { value: 2, text: chartMonthData[1] },
			{ value: 3, text: chartMonthData[2] },
            { value: 4, text: chartMonthData[3] },
			{ value: 5, text: chartMonthData[4] },
            { value: 6, text: chartMonthData[5] },
            { value: 7, text: chartMonthData[6] },
            { value: 8, text: chartMonthData[7] },
            { value: 9, text: chartMonthData[8] },
            { value: 10, text: chartMonthData[9] },
            { value: 11, text: chartMonthData[10] },
            { value: 12, text: chartMonthData[11] },
            { value: 13, text: chartMonthData[12] },
		]
    });
    chart.addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major" });

    // Add the series of data
    chart.addSeries("Monthly Sales", chartData2);

    // Create the tooltip
    var tip = new Tooltip(chart, "default");

    // Create the magnifier
    var mag = new Magnify(chart, "default");

    // Highlight!
    //new Highlight(chart, "default");


    // Render the chart!
    chart.render();
});</script>
    
     <form id="form1" runat="server">
  <div id="chartNode" style="width: 400px; height: 400px;">
    </div>
    <asp:HiddenField ID="hiddenTotalValues" runat="server" />
    <asp:HiddenField ID="hiddenMonthValues" runat="server" />
   
    </form>
</body>
</html>
