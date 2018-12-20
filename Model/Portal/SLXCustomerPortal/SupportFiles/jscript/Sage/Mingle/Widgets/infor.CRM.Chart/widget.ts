/**
 * NOTE:
 * A custom settings UI shall only be implemented if settings are dynamic, for instance based on data retrieved from a server.
 * Or if the settings structure is complicated, and not possible to handle using supported metadata setting types (string, boolean, number, selector).
 * For other cases, use metadata settings handled by the default settings UI.

@license MIT License <http://www.opensource.org/licenses/mit-license.php>
**/

/// <reference path="d3.d.ts" />
/// <reference path="../scripts/typings/lime/lime.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/sohoxi/sohoxi.d.ts" />

import templateCache = require("./templateCache");
import lm = require("lime");
//import d3 = require("d3");

class inforCRMChartMainCtrl {
    private content: JQuery;
    private item: JQuery;
    private language: lm.ILanguage;
    private chartDiv;
    private widgetContext: lm.IWidgetContext;
    private widgetInstanceId: string;
    private chartOptions;
    private dateTime: string;
    private widgetInstance: lm.IWidgetInstance;
    private dataSet = [];
    private width: number;
    static $inject = ["$scope"];
    private isFunnelChart: boolean;
    private chartEl: HTMLElement;
    private tooltipEl: HTMLElement;
    private tooltipElArrow: HTMLElement;

    public showSettingsDialog(): void {
        this.widgetContext.getSettings().showSettings();
    }
    constructor(public scope: ng.IScope) {
        // Get the widget context and the widget instance that are made available on the scope by the framework
        this.widgetContext = scope[lm.WidgetConstants.widgetContextKey];
        this.widgetInstance = scope[lm.WidgetConstants.widgetInstanceKey];
        this.language = this.widgetContext.getLanguage();
        const settings = this.widgetContext.getSettings();
        this.widgetInstanceId = this.widgetContext.getWidgetInstanceId();
        var date = new Date();
        this.dateTime = date.getTime().toString();
        
        // Add 'View Group' action to widget instance
        var viewGroupAction: lm.IWidgetAction = {
            execute: () => { this.gotoCRM(); },
            isEnabled: false,
            text: this.language.get("viewGroup")
        };
        angular.extend(this.widgetInstance.actions[0], viewGroupAction);
        
        // Callback triggered from Framework when settings are saved
        this.widgetInstance.settingsSaved = (saveArg: lm.IWidgetSettingsArg) => {
            this.setContent();
        }
        var context = this;
        this.widgetInstance.widgetSettingsFactory = (settingsContext: lm.IWidgetSettingsContext): lm.IWidgetSettingsInstance => {
            var instance: lm.IWidgetSettingsInstance = {};

            instance.angularConfig = {};
            if (this.widgetContext.isDev()) {
                instance.angularConfig = {
                    relativeTemplateUrl: "settings.html",
                    scopeValue: { name: "settingsData", value: { settingsContext: settingsContext, settingsInstance: instance } }
                }
            } else {
                instance.angularConfig.templates = templateCache.getTemplates(context.widgetContext.getAngularContext());
                instance.angularConfig.cachedTemplateUrl = instance.angularConfig.templates[0].key;
                instance.angularConfig.scopeValue = {
                    name: "settingsData", value: { settingsContext: settingsContext, settingsInstance: instance }
                };
            }
            return instance;
        };

        // Get the language object from the widget context.
        this.language = this.widgetContext.getLanguage();
        this.setContent();
    }

    private gotoCRM(): void {
        var settings = this.widgetContext.getSettings();
        var group: any = settings.get("group");
        var entity: any = settings.get("entity");
        var logicalID = settings.get("CRMLogicalID");//'lid://infor.crm';LogicalID

        var url = this.format(["?LogicalId={0}&ViewId={1}&GroupId={2}", logicalID, entity.name, group.key]);
        this.widgetContext.launch({ url: url, resolve: true });
    }

    private enableLaunch() {
        this.widgetInstance.actions[0].isEnabled = true;
    }

    private disableLaunch() {
        this.widgetInstance.actions[0].isEnabled = false;
    }
    private isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    private createChart(context, el) {
        var chartConfig = { width: 0, height: 0, _slope: 0, _totalArea: 0, totalEngagement: 0};
        var bottomPct = 1 / 4;
        var margin = { top: 20, right: 20, bottom: 20, left: 20 };

        chartConfig.width = parseInt($(el).parent().width()) - margin.left - margin.right;
        chartConfig.height = parseInt($(el).parent().height()) - margin.top - margin.bottom ;
        chartConfig._slope = 2 * chartConfig.height / (chartConfig.width - bottomPct * chartConfig.width);
        chartConfig._totalArea = ((chartConfig.width + bottomPct * chartConfig.width) * chartConfig.height / 2 );

        this.width = chartConfig.width;
        for (var i = 0; i < this.dataSet.length; i++) {
            chartConfig.totalEngagement += this.dataSet[i][1];
        }
        this.draw(this.chartEl, chartConfig);

        return;
    }

    private _getLabel(ind) {
        return this.dataSet[ind][0];
    };

    private _getEngagementCount(ind) {
        return this.dataSet[ind][1].toLocaleString();
    };

    private _createPaths(chart) {
        /* Returns an array of points that can be passed into d3.svg.line to create a path for the funnel */
        var trapezoids = [];
        var prevLeftX = 0, prevRightX = this.width, prevHeight = 20, paddingBetweenGroup = 2;

        for (var dataInd = 0; dataInd < this.dataSet.length; dataInd++) {
            var area = this.dataSet[dataInd][1] * chart._totalArea / chart.totalEngagement;
            var prevBaseLength = prevRightX - prevLeftX;
            var nextBaseLength = Math.sqrt((chart._slope * prevBaseLength * prevBaseLength - 4 * area) / chart._slope);
            var nextLeftX = (prevBaseLength - nextBaseLength) / 2 + prevLeftX;
            var nextRightX = prevRightX - (prevBaseLength - nextBaseLength) / 2;
            prevHeight = prevHeight + paddingBetweenGroup;
            var nextHeight = chart._slope * (prevBaseLength - nextBaseLength) / 2 + prevHeight;
            nextHeight = nextHeight - paddingBetweenGroup;

            var points = [[nextRightX, nextHeight]];
            points.push([prevRightX, prevHeight]);
            points.push([prevLeftX, prevHeight]);
            points.push([nextLeftX, nextHeight]);
            points.push([nextRightX, nextHeight]);
            trapezoids.push(points);

            prevLeftX = nextLeftX, prevRightX = nextRightX, prevHeight = nextHeight;
        }
        return trapezoids;
    };

    private draw(elem, config) {
        var funnelSvg = d3.select(elem).append('svg:svg')
            .attr('width', config.width)
            .attr('height', config.height + 20)
            .append('svg:g');

        // Creates the correct d3 line for the funnel
        var funnelPath = d3.svg.line()
            .x(function (d) { return d[0]; })
            .y(function (d) { return d[1]; });
            
        var colorRange = ['#54A1D3', '#8ED1C6', '#C7B4DB', '#999999', '#F2BC41', '#76B051', '#ECA8A8',
            '#8FC9E5', '#F6DA8B', '#C8EFE7'];

        var colorScale = d3.scale.ordinal().range(colorRange);
        var paths = this._createPaths(config);
        var context = this;
        var svg = this.drawTrapezoids(context, funnelSvg, funnelPath, colorScale, paths, 0);
    };

    private drawTrapezoids(context, funnelSvg, funnelPath, colorScale, paths, i) {
        var trapezoid = funnelSvg
            .append('svg:path')
            .attr('d', function (d) {
                return funnelPath(
                    [paths[i][0], paths[i][1], paths[i][2],
                        paths[i][2], paths[i][1], paths[i][2]]);
            })
            .attr('fill', '#fff');
        var totalLength = trapezoid.node().getTotalLength();
        var transition = trapezoid
            .transition()
            .duration(totalLength / 2.5)
            .ease("linear")
            .attr("d", function (d) { return funnelPath(paths[i]); })
            .attr("fill", function (d) { return colorScale(i); });

        var trapezoidHeight = paths[i][0][1] - paths[i][1][1];
        var labelHeight = 12;
        if (trapezoidHeight > labelHeight) { //don't add lebales if no enough space
            funnelSvg.append('svg:text')
                .text(context._getLabel(i))
                .attr('class', 'labels')
                .attr("x", function (d) { return context.width / 2; })
                .attr("y", function (d) {
                    return (paths[i][0][1] + paths[i][1][1]) / 2;
                })
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle");
        }
        trapezoid.on("mouseover", mouseOverHandler);
        trapezoid.on("mousemove", mouseOverHandler);
        trapezoid.on("mouseout", function () {
            d3.select(context.tooltipEl).classed("hidden", true);
            d3.select(context.tooltipElArrow).classed("hidden", true);
        });

        function mouseOverHandler(){
            var xPosition = d3.mouse(this)[0] + 35;
            var yPosition = d3.mouse(this)[1] + 40;

            d3.select(context.tooltipEl)
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .text(context._getLabel(i) + ' ' + context._getEngagementCount(i));
            d3.select(context.tooltipEl).classed("hidden", false);

            xPosition = xPosition - 5;
            yPosition = yPosition + (context.tooltipEl.clientHeight/2) - 7;
            d3.select(context.tooltipElArrow)
                .style("left", xPosition + "px")
                .style("top", yPosition + "px");
            d3.select(context.tooltipElArrow).classed("hidden", false);

        };

        if (i < paths.length - 1) {
            transition.each('end', function () {
                context.drawTrapezoids(context, funnelSvg, funnelPath, colorScale, paths, i + 1);
            });
        };
    }

    private setContent() {
        var settings = this.widgetContext.getSettings();
        var entity = settings.get("entity");
        var group = settings.get("group");
        var filter = settings.get("filter");
        var metric = settings.get("metric");
        var chartType = settings.get<string>("chartType");
        this.isFunnelChart = chartType === 'Funnel';
        var limitCount = this.isFunnelChart ? 100 : settings.get("limitCount");
        var context = this;

        if (entity && group && filter && metric && chartType && limitCount) {
            this.setBusy(true);
            var sdataUrlContext = 'CRMSData';
            var analyticsUrl = sdataUrlContext + '/SData/slx/system/-/groups("{0}")/$queries/executeMetric?format=json&_filterName={1}&_metricName={2}&limit={3}&count={4}&_t={5}';
            analyticsUrl = this.format([analyticsUrl, group.key, filter, metric, limitCount, limitCount, this.dateTime]);
            const analyticsReq = this.createRequest(encodeURI(analyticsUrl));
            analyticsReq.withCredentials = true;
            this.widgetContext.executeIonApiAsync(analyticsReq).then((response) => {
                var data = response.data['$resources'];
                var items = [], item;
                
                if (context.isFunnelChart){
                    var chartItems = $("#" + context.widgetContext.widget.elementId).find(".funnel-container");
                    if (chartItems.length > 0) {
                        context.chartEl = chartItems[0];
                    }
                    chartItems.empty();
                    var tooltipItems = $("#" + context.widgetContext.widget.elementId).find(".infor-crm-funnelChart-tooltip");
                    if (tooltipItems.length > 0) {
                        context.tooltipEl = tooltipItems[0];
                    }
                    tooltipItems = $("#" + context.widgetContext.widget.elementId).find(".infor-crm-funnelChart-tooltipleft-arrow");
                    if (tooltipItems.length > 0) {
                        context.tooltipElArrow = tooltipItems[0];
                    }
                    context.width = chartItems.width();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data[i].value !== 0 && context.isNumeric(data[i].value)) {
                        if (context.isFunnelChart) {
                            item = [data[i].$descriptor ? data[i].$descriptor : data[i].name, data[i].value];
                        }
                        else {
                            item = { 'name': data[i].$descriptor ? data[i].$descriptor : data[i].name, 'value': data[i].value };
                        }
                        items.push(item);
                    }
                }
                if (data.length === 0 || items.length === 0) {
                    context.disableLaunch();
                    var errorMsg: lm.IWidgetMessage = { message: context.language['noData'], type: lm.WidgetMessageType.Info };
                    this.widgetContext.showWidgetMessage(errorMsg);
                    context.setBusy(false);
                }
                else {
                    if (context.isFunnelChart) {
                        context.dataSet = items;
                        setTimeout(function () {
                            context.createChart(context, context.chartEl);
                        }, context.width === 0 ? 300 : 0);
                    } else {
                        var info = [{
                            data: items,
                            name: ''
                        }];
                        context.chartOptions = {
                            type: chartType.charAt(0).toLowerCase() + chartType.slice(1),
                            dataset: info
                        }
                    }
                    context.enableLaunch();
                    context.setBusy(false);
                }

            }, (error) => { this.onRequestError(error); });
        }
        else {
            this.disableLaunch();
        }
    }

    public static add(m: ng.IModule) {
        m.controller("inforCRMChartMainCtrl", inforCRMChartMainCtrl);
    }

    private format(args: any): string {
        var s = args[0];
        for (var i = 0; i < args.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, args[i + 1]);
        }
        return s;
    }

    private setBusy(isBusy: boolean): void {
        this.widgetContext.setState(isBusy ? lm.WidgetState.busy : lm.WidgetState.running);
    }

    private onRequestError(error: any): void {
        var errorMsg: lm.IWidgetMessage = { message: this.language['errorOccured'], type: lm.WidgetMessageType.Error };
        this.widgetContext.showWidgetMessage(errorMsg);
        this.setBusy(false);

    }

    private createRequest(url): lm.IIonApiRequestOptions {
        const request: lm.IIonApiRequestOptions = {
            method: "GET",
            url: url,
            cache: false,
            headers: {
                "Accept": "application/json"
            }
        }
        return request;
    }
}

class inforCRMChartCustomSettingsCtrl {
    private repeatSelect: string;
    static $inject = ["$scope"];
    private widgetContext: any;
    private entityValue: any;
    private groupValue: any;
    private dimensionValue: string;
    private metricValue: string;
    private chartValue: string;
    private limitCount: string;
    private CRMLogicalID: string;
    private widgetInstanceId: string;
    private widgetSettings: lm.IWidgetSettings;
    private language: lm.ILanguage;
    private isEntityBusy: Boolean;
    private isGroupBusy: Boolean;
    private isFilterBusy: Boolean;
    private isMetricBusy: Boolean;
    private maskCustDefOptions: any;

    private widgetTitle: string;
    private isTitleEditEnabled: boolean;
    private isTitleUnlockable: boolean;
    private isTitleLocked: boolean;

    private isLimitCountVisible: boolean;
    private isLimitCountEnabled: boolean;
    //Dropdowns
    private dropdownOptions: xi.IDropDownOptions;
    private entityDropdownOptions: xi.IDropDownOptions;
    private groupDropdownOptions: xi.IDropDownOptions;
    private filterDropdownOptions: xi.IDropDownOptions;
    private metricDropdownOptions: xi.IDropDownOptions;

    private entityOptions: string[];
    private groupOptions: string[];
    private filterOptions: string[];
    private metricOptions: string[];
    private chartOptions: string[];
    private dateTime: string;
    private textTitle: string;
    private textEntity: string;
    private textGroup: string;
    private textDimension: string;
    private textMetric: string;
    private textType: string;
    private textLimit: string;
    private textCRMLogicalID: string;

    constructor(public scope: ng.IScope) {
        this.isEntityBusy = true;
        this.repeatSelect = null;

        // Initialize the dropdowns
        ($("#chart-widget-chartType") as any).dropdown();
        this.chartValue = null;

        // Get instance and context from the scope property defined in Settings factory
        const settingsInstance: lm.IWidgetSettingsInstance = scope["settingsData"].settingsInstance;
        const settingsContext: lm.IWidgetSettingsContext = scope["settingsData"].settingsContext;
        this.widgetContext = settingsContext.getWidgetContext();
        this.widgetInstanceId = this.widgetContext.getWidgetInstanceId();
        this.widgetSettings = this.widgetContext.getSettings();
        var context = this;
        var date = new Date();
        this.dateTime = date.getTime().toString();
        this.language = this.widgetContext.getLanguage();

        this.isTitleEditEnabled = this.widgetContext.isTitleEditEnabled();
        this.isTitleLocked = this.widgetContext.isTitleLocked();
        this.widgetTitle = this.widgetContext.getResolvedTitle(this.isTitleLocked);
        this.isTitleUnlockable = this.widgetContext.isTitleUnlockable();

        //Labels text
        this.textTitle = this.language['titleText'] || "Title";
        this.textEntity = this.language['textEntity'] || "Entity";
        this.textGroup = this.language['textGroup'] || "Group";
        this.textDimension = this.language['textDimension'] || "Dimension";
        this.textMetric = this.language['textMetric'] || "Metric";
        this.textType = this.language['textType'] || "Type";
        this.textLimit = this.language['textLimit'] || "Limit";
        this.textCRMLogicalID = this.language['textCRMLogicalID'] || "CRM Logical ID";

        this.maskCustDefOptions = {
            mode: "number",
            pattern: "&##",
            definitions: {
                "&": /[1-9]/,
                "#": /[0-9]/
            }
        };

        // Callback triggered from Framework when Configure dialog is about to be closed
        settingsInstance.closing = (closingArg: lm.IWidgetSettingsCloseArg) => {
            if (closingArg.isSave) {
                this.widgetSettings.set("entity", context.entityValue);
                this.widgetSettings.set("title", context.widgetTitle);
                this.widgetContext.setTitle(context.widgetTitle);
                this.widgetSettings.set("group", context.groupValue);
                this.widgetSettings.set("filter", context.dimensionValue);
                this.widgetSettings.set("metric", context.metricValue);
                this.widgetSettings.set("chartType", context.chartValue);
                this.widgetSettings.set("limitCount", context.limitCount);
                this.widgetSettings.set("CRMLogicalID", context.CRMLogicalID);
            }
            this.widgetContext.setTitleLocked(this.isTitleLocked);
            if (this.isTitleEditEnabled) {
                this.widgetContext.setTitle(this.widgetTitle);
            }
            if (this.isLimitCountEnabled) {
                this.widgetSettings.set("limitCount", this.limitCount);
            }
        }
        //Populate the dropdowns
        this.chartOptions = ["Bar", "Column", "Donut", "Funnel", "Line", "Pie"];
        var value = context.widgetContext.getSettings().get("chartType");
        if (value) {
            this.chartValue = value;
        }
        
        this.isLimitCountVisible = this.widgetSettings.isSettingVisible("limitCount")
        this.isLimitCountEnabled = this.widgetSettings.isSettingEnabled("limitCount");
        value = this.widgetSettings.get("limitCount");
        if (value) {
            this.limitCount = value;
        }
        
        this.CRMLogicalID = this.widgetSettings.get<string>("CRMLogicalID") || this.widgetSettings.get<string>("LogicalID");
        if (typeof this.CRMLogicalID === 'undefined' || !this.CRMLogicalID) {
            this.CRMLogicalID = 'lid://infor.crm';
        }
        //begin
        context.entityDropdownOptions = null;
        var sdataUrlContext = 'CRMSData';
        var entityUrl = sdataUrlContext + '/SData/slx/metadata/-/entities?startIndex=0&count=300&where=filters.analyticsAvailable eq true and filters.filterType eq \'analyticsMetric\'&select=name,displayName,tableName&orderBy=$descriptor&format=json&_t={0}';
        entityUrl = context.format([entityUrl, this.dateTime]);
        const entityReq = this.createRequest(encodeURI(entityUrl));
        entityReq.withCredentials = true;
        this.widgetContext.executeIonApiAsync(entityReq).then((response) => {
            var data = response.data.$resources;
            var options = [], item, i;
            for (i = 0; i < data.length; i++) {
                item = { 'name': data[i].name, 'value': data[i].tableName };
                options.push(item);
            }
            context.entityOptions = options;

            var entityVal = context.widgetContext.getSettings().get("entity");
            var defaultValueSelected = false;
            if (entityVal && entityVal.value) {
                for (i = 0; i < options.length; i++) {
                    if (entityVal.value === options[i].value) {
                        context.entityValue = options[i];
                        defaultValueSelected = true;
                        break;
                    }
                }
            }
            if (defaultValueSelected === false) {
                context.entityValue = options[0];
            }

            if (this.entityDropdownOptions) {
                this.entityDropdownOptions = null;
            } else {
                this.entityDropdownOptions = {};
            }
            this.entityChanged();

            context.isEntityBusy = false;
        }, (error) => { this.onRequestError(error); });

        //end

    }

    private onClickIsLocked(): void {
        this.isTitleLocked = !this.isTitleLocked;
        if (this.isTitleLocked) {
            this.widgetTitle = this.widgetContext.getResolvedTitle(this.isTitleLocked);
        }
    }

    private onRequestError(error: any): void {
        var errorMsg: lm.IWidgetMessage = { message: this.language['errorOccured'], type: lm.WidgetMessageType.Error };
        this.widgetContext.showWidgetMessage(errorMsg);
        this.isEntityBusy = false;
        this.isGroupBusy = false;
        this.isFilterBusy = false;
        this.isMetricBusy = false;
    }

    private createRequest(url): lm.IIonApiRequestOptions {
        const request: lm.IIonApiRequestOptions = {
            method: "GET",
            url: url,
            cache: false,
            headers: {
                "Accept": "application/json"
            }
        }
        return request;
    }

    private setBusy(isBusy: boolean): void {
        this.widgetContext.setState(isBusy ? lm.WidgetState.busy : lm.WidgetState.running);
    }

    public static add(m: ng.IModule) {
        m.controller("inforCRMChartCustomSettingsCtrl", inforCRMChartCustomSettingsCtrl);
    }

    private entityChanged = function () {
        var context = this;
        var dateTime = this.dateTime;
        var entitySelected = this.entityValue || this.widgetContext.getSettings().get("entity");
        if (!entitySelected) {
            return;
        }

        context.isGroupBusy = true;
        context.isFilterBusy = true;
        context.isMetricBusy = true;

        context.groupDropdownOptions = null;
        context.filterDropdownOptions = null;
        context.metricDropdownOptions = null;

        var sdataUrlContext = 'CRMSData';
        var groupsUrl = sdataUrlContext + '/SData/slx/system/-/groups?startIndex=0&count=300&where=upper(family) eq upper(\'{0}\')&select=name,displayName&orderBy=name&format=json&_t={1}';
        groupsUrl = context.format([groupsUrl, entitySelected.value, dateTime]);
        const groupsReq = this.createRequest(encodeURI(groupsUrl));
        groupsReq.withCredentials = true;
        this.widgetContext.executeIonApiAsync(groupsReq).then((response) => {
            var data = response.data.$resources;

            var options = [], item, i;
            for (i = 0; i < data.length; i++) {
                item = { 'name': data[i].name, 'key': data[i].$key };
                options.push(item);
            }
            context.groupOptions = options;

            var groupVal = context.widgetContext.getSettings().get("group");
            var defaultValueSelected = false;
            if (groupVal && groupVal.name) {
                for (i = 0; i < options.length; i++) {
                    if (groupVal.name === options[i].name) {
                        context.groupValue = options[i];
                        defaultValueSelected = true;
                        break;
                    }
                }
            }
            if (defaultValueSelected === false) {
                context.groupValue = options[0];
            }


            if (context.groupDropdownOptions) {
                context.groupDropdownOptions = null;
            } else {
                context.groupDropdownOptions = {};
            }
            context.isGroupBusy = false;
        }, (error) => { this.onRequestError(error); });


        var filtersUrl = sdataUrlContext + '/SData/slx/metadata/-/entities("{0}")/filters?startIndex=0&count=300&where=analyticsAvailable and filterType ne \'analyticsMetric\'&select=filterName,displayName,analyticsDescription&orderBy=filterName&format=json&_t={1}';
        filtersUrl = context.format([filtersUrl, entitySelected.name, dateTime]);
        const filtersReq = this.createRequest(encodeURI(filtersUrl));
        filtersReq.withCredentials = true;
        this.widgetContext.executeIonApiAsync(filtersReq).then((response) => {
            var data = response.data.$resources;
            var options = [];
            for (var i = 0; i < data.length; i++) {
                options.push(data[i].filterName);
            }
            context.filterOptions = options;//Options

            var defaultFilterSelected = false;
            var value = context.widgetContext.getSettings().get("filter");
            if (value && options.indexOf(value) > -1) {
                context.dimensionValue = value;
            }
            else {
                context.dimensionValue = options[0];
            }

            if (context.filterDropdownOptions) {
                context.filterDropdownOptions = null;
            } else {
                context.filterDropdownOptions = {};
            }
            context.isFilterBusy = false;
        }, (error) => { this.onRequestError(error); });

        var metricsUrl = sdataUrlContext + '/SData/slx/metadata/-/entities("{0}")/filters?_compact=true&startIndex=0&count=300&where=analyticsAvailable and filterType eq \'analyticsMetric\'&select=filterName,displayName,analyticsDescription&orderBy=filterName&format=json&_t={1}';
        metricsUrl = context.format([metricsUrl, entitySelected.name, dateTime]);
        const metricsReq = this.createRequest(encodeURI(metricsUrl));
        metricsReq.withCredentials = true;
        this.widgetContext.executeIonApiAsync(metricsReq).then((response) => {
            var data = response.data.$resources;
            var options = [];
            for (var i = 0; i < data.length; i++) {
                options.push(data[i].filterName);
            }
            context.metricOptions = options;//Options

            var value = context.widgetContext.getSettings().get("metric");
            if (value && options.indexOf(value) > -1) {
                context.metricValue = value;
            }
            else {
                context.metricValue = options[0];
            }

            if (context.metricDropdownOptions) {
                context.metricDropdownOptions = null;
            } else {
                context.metricDropdownOptions = {};
            }
            context.isMetricBusy = false;
        }, (error) => { this.onRequestError(error); });


    };

    private format(args: any): string {
        var s = args[0];
        for (var i = 0; i < args.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, args[i + 1]);
        }
        return s;
    }
}

var angularConfig: lm.IAngularWidgetConfig = null;
// Widget factory function
export var widgetFactory = (context: lm.IWidgetContext): lm.IWidgetInstance => {

    var m = context.getAngularContext().module;
    // Add controllers to the provided AngularJS module
    inforCRMChartMainCtrl.add(m);
    inforCRMChartCustomSettingsCtrl.add(m);

    if (!angularConfig) {
        angularConfig = {};
        if (context.isDev()) {
            angularConfig.relativeTemplateUrl = "widget.html";
        } else {
            angularConfig.templates = templateCache.getTemplates(context.getAngularContext());
            angularConfig.cachedTemplateUrl = angularConfig.templates[1].key;
        }
    }

    // Create and return the widget instance
    var instance: lm.IWidgetInstance = {
        angularConfig: angularConfig,
        actions: <lm.IWidgetAction[]>[{ isPrimary: true, standardIconName: "#icon-launch" }],
        isConfigured(settings: any): boolean {
            var entity = settings.get("entity");
            var group = settings.get("group");
            var filter = settings.get("filter");
            var metric = settings.get("metric");
            var chartType = settings.get("chartType");
            this.isFunnelChart = chartType === 'Funnel';
            var limitCount = this.isFunnelChart ? 100 : settings.get("limitCount");
            
            if (entity && group && filter && metric && limitCount)
                return true;

            return false;
        }
    };
    return instance;
};