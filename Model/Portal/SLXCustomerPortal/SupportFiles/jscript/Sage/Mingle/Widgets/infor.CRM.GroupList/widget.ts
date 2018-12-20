/**
 * NOTE:
 * A custom settings UI shall only be implemented if settings are dynamic, for instance based on data retrieved from a server.
 * Or if the settings structure is complicated, and not possible to handle using supported metadata setting types (string, boolean, number, selector).
 * For other cases, use metadata settings handled by the default settings UI.
**/
/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/lime/lime.d.ts" />
/// <reference path="../scripts/typings/sohoxi/sohoxi.d.ts" />

import templateCache = require("./templateCache");
import lm = require("lime");
class inforCRMGroupListMainCtrl {
    private language: lm.ILanguage;
    private widgetContext: lm.IWidgetContext;
    private hideGrid = false;
    private dateTime: string;
    public searchText: string;
    private widgetInstance: lm.IWidgetInstance;
    private displayFields: any;
    static $inject = ["$scope", "$filter", "commonService"];
    private layout: any;
    private keyField: any;
    private data: any;
    private originalData: any;
    private isStatusAvailable: boolean;
    private countFields: any;

    constructor(public scope: ng.IScope, public filter: ng.IFilterService,public commonService:any) {
        // Get the widget context and the widget instance that are made available on the scope by the framework
        this.widgetContext = scope[lm.WidgetConstants.widgetContextKey];
        this.widgetInstance = scope[lm.WidgetConstants.widgetInstanceKey];
        this.language = this.widgetContext.getLanguage();
        const settings = this.widgetContext.getSettings();
        var date = new Date();
        this.dateTime = date.getTime().toString();
        this.searchText = '';
        this.countFields = 0;
        
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
        
        this.setContent();
    }

    private setContent() {
        var group: any, entity: any;
        var settings = this.widgetContext.getSettings();
        entity = settings.get("entity");
        group = settings.get("group");
        var limitCount = settings.get("limitCount");
        this.displayFields = settings.get("displayFields");
        this.countFields = 0;

        if (entity && group && limitCount) {
            var context = this;
            this.setBusy(true);
            var sdataUrlContext = settings.get("SDataApiContext");
            var layoutUrl = sdataUrlContext + '/SData/slx/system/-/groups("{0}")?_compact=true&include=layout&format=json&_t={1}';
            layoutUrl = this.formatStringWithValues([layoutUrl, group.key, this.dateTime]);
            const layoutReq = this.createRequest(encodeURI(layoutUrl));
            this.widgetContext.executeIonApiAsync(layoutReq).then((response) => {
                if (context.layout) {
                    context.layout.length = 0;
                }
                context.layout = response.data['layout'];
                context.keyField = response.data['keyField'];
                var fields = context.keyField + ',STATUS,STATUSCODETEXT';
                for (var j = 0; j < context.layout.length; j++) {
                    if (context.endsWith(context.layout[j].alias, 'ID')) {// for ACCOUNTMANAGERIDNAME,SECCODEIDNAME';
                        fields = fields + ',' + context.layout[j].alias+'NAME';
                    }
                    fields = fields + ',' + context.layout[j].alias;
                }
                var dataUrl = sdataUrlContext + '/SData/slx/system/-/groups("{0}")/$queries/execute?_compact=true&startIndex=1&count={1}&select={2}&format=json&_t={3}';
                dataUrl = this.formatStringWithValues([dataUrl, group.key, limitCount, fields, this.dateTime]);
                const dataReq = this.createRequest(encodeURI(dataUrl));
                this.widgetContext.executeIonApiAsync(dataReq).then((response) => {
                    var data = response.data['$resources'];
                    if (data.length === 0) {
                        context.disableLaunch();
                        context.hideGrid = true;
                        var errorMsg: lm.IWidgetMessage = { message: this.language.get("noData"), type: lm.WidgetMessageType.Info };
                        this.widgetContext.showWidgetMessage(errorMsg);
                        context.setBusy(false);
                    }
                    else {
                        try {
                            for (var i = 0; i < data.length; i++) {
                                var keys = Object.keys(data[i]);
                                for (var j = 0; j < keys.length; j++) {
                                    var key = keys[j]; // key
                                    if (key === context.keyField)
                                        continue;
                                    var value = data[i][key]; // data
                                    delete data[i][key]; // deleting data with old key
                                    if (key !== 'STATUSCODE') {
                                        if (key === 'STATUSCODETEXT')
                                            key = 'STATUSCODE';
                                        var newKey = context.getDisplayName(context, key); // renaming key
                                        var visible = true;
                                        for (var k = 0; k < context.layout.length; k++) {
                                            if (context.layout[k].alias === key) {
                                                visible = context.layout[k].visible;
                                                if (visible && context.layout[k].format === 'Phone') {
                                                    value = this.unformatPhoneNumber(value);
                                                } else if (visible && context.layout[k].format === 'DateTime') {
                                                    value = this.formatDateTime(value, context.layout[k]);
                                                } else if (visible && context.layout[k].format === 'Fixed') {//can be a number or percent DojoxGroup.js
                                                    value = this.formatFixed(value, context.layout[k]);
                                                } else if (visible && context.layout[k].format === 'Percent') {
                                                    value = value + '%';
                                                }
                                                break;
                                            }
                                        }
                                        if (visible) {
                                            data[i][newKey] = value; // setting data with new key
                                        }
                                    }
                                }
                            }
                        }
                        catch (e) {
                            lm.Log.error(e.message);
                        }
                        context.isStatusAvailable = context.isStatusField();
                        context.data = data;
                        context.originalData = data;
                        if (entity.value.toLowerCase() === "history") {
                            context.disableLaunch();
                        } else {
                            context.enableLaunch();
                        }
                        context.hideGrid = false;
                        context.setBusy(false);
                    }

                }, (error) => { this.commonService.onRequestError(error, this); });
            }, (error) => { this.commonService.onRequestError(error, this); });
        }
        else {
            this.disableLaunch();
            this.hideGrid = true;
        }
    }
    
    private formatStringWithValues(args: any): string {
        var s = args[0];
        for (var i = 0; i < args.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, args[i + 1]);
        }
        return s;
    }
    private toDateFromString(value: any, useOffset: any): any {
        if (!value)
            return '';
        var trueRE = /^(true|T)$/i,
            isoDate = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|(-|\+)(\d{2}):(\d{2}))/,
            isoDateOnly = /^(\d{4})-(\d{2})-(\d{2})$/,
            jsonDate = /\/Date\((-?\d+)(?:(-|\+)(\d{2})(\d{2}))?\)\//,
            pad = function (n) { return n < 10 ? '0' + n : n; },
            unpad = function (str) { return (str[0] === '0') ? str.substring(1) : str; };

        if (typeof value !== 'string') {
            return value;
        }

        var match,
            utc,
            h, m,
            offset;

        try {
            if ((match = jsonDate.exec(value))) {
                utc = new Date(parseInt(match[1], 10));
                if (useOffset === true) {
                    if (match[2]) {
                        h = parseInt(match[3], 10);
                        m = parseInt(match[4], 10);

                        offset = (h * 60) + m;

                        if (match[2] === '-') {
                            offset = -1 * offset;
                        }
                        utc.setMinutes(utc.getMinutes() + offset);
                    }
                }
                value = utc;
            }
            else if ((match = isoDate.exec(value))) {
                utc = new Date(Date.UTC(
                    parseInt(match[1], 10),
                    parseInt(unpad(match[2]), 10) - 1, // zero based
                    parseInt(unpad(match[3]), 10),
                    parseInt(unpad(match[4]), 10),
                    parseInt(unpad(match[5]), 10),
                    parseInt(unpad(match[6]), 10)
                ));

                if (match[8] !== 'Z') {
                    h = parseInt(match[10], 10);
                    m = parseInt(match[11], 10);
                    offset = (h * 60) + m;
                    if (match[9] === '-') {
                        offset = -1 * offset;
                    }
                    utc.setMinutes(utc.getMinutes() + offset);
                }

                value = utc;
            }
            else if ((match = isoDateOnly.exec(value))) {
                value = new Date();
                value.setYear(parseInt(match[1], 10));
                value.setMonth(parseInt(match[2], 10) - 1);
                value.setDate(parseInt(match[3], 10));
                value.setHours(0, 0, 0, 0);
            }
        } catch (e) {
            lm.Log.error(e.message);
        }

        return value;
    }
    private formatFixed(value: any, item: any): string {
        if (!value)
            return '';
        var formatString = item['formatString'];
        if (formatString && formatString[formatString.length - 1] === '%')//percent
            return value + '%'; 
        var result = value.toLocaleString(navigator.language, { minimumFractionDigits: 2 });//'en-US'
        return result;
    }
    private formatDateTime(inRowIndex: any, inItem: any): string {
        //	if given a date, convert it to local time and provide corresponding HTML
        if (!inItem || !inRowIndex)
            return '';
        try {
            var d = inRowIndex;//inRowIndex ? inRowIndex : this.defaultValue;

            var dateOnly = (typeof inItem.dateTimeType === 'undefined') ? false : (inItem.dateTimeType.toUpperCase() === 'D');

            if (!d)
                return '';
            d = this.toDateFromString(d, true);
            if (!d || d.constructor !== Date) {
                return '';
            }
            var datePattern = inItem.formatString;
            if (!datePattern) {
                return d.toLocaleDateString();
            }
            if (dateOnly) {
                d = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
            }
            return this.filter('date')(d, datePattern);
        }
        catch (e) {
            lm.Log.error(e.message);
        }
    }

    private unformatPhoneNumber(number: any): string {
        if (!number)
            return '';
        try {
            var n = number.toString();
            var clean;
            if (n && n[0] && (n[0] === '+' || n[0] === '0')) {
                clean = n;
            }
            // Matching mobile's format stripper
            var re = /[^0-9x]/ig;
            n = n.replace(/[^0-9x]/ig, '');

            if (/^\+/.test(n)) {
                clean = n;
            }
            var formatters = [
                {
                    test: /^\+.*/,
                    format: '{0}'
                }, {
                    test: /^(\d{3})(\d{3,4})$/,
                    format: '{1}-{2}'
                }, {
                    test: /^(\d{3})(\d{3})(\d{2,4})$/, // 555 555 5555
                    format: '({1}) {2}-{3}'
                }, {
                    test: /^(\d{3})(\d{3})(\d{2,4})([^0-9]{1,}.*)$/, // 555 555 5555x
                    format: '({1}) {2}-{3}{4}'
                }, {
                    test: /^(\d{11,})(.*)$/,
                    format: '{1}'
                }];
            if (!clean) clean = n;
            for (var i = 0; i < formatters.length; i++) {
                var formatter = formatters[i],
                    match;
                if ((match = formatter.test.exec(clean))) {
                    var result;
                    switch (match.length) {
                        case 1:
                            result = this.formatStringWithValues([formatter.format, match[0]]);
                            break;
                        case 2:
                            result = this.formatStringWithValues([formatter.format, match[0], match[1]]);
                            break;
                        case 3:
                            result = this.formatStringWithValues([formatter.format, match[0], match[1], match[2]]);
                            break;
                        case 4:
                            result = this.formatStringWithValues([formatter.format, match[0], match[1], match[2], match[3]]);
                            break;
                        default:
                    }
                    return result;
                }
            }
        } catch (e) {
            lm.Log.error(e.message);
        }

        return n;
    }

    private setBusy(isBusy: boolean): void {
        this.widgetContext.setState(isBusy ? lm.WidgetState.busy : lm.WidgetState.running);
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

    public searchData=function() {
        var results = [];
        var toSearch = this.searchText;
        var include: boolean;
        this.data = this.originalData;

        for (var i = 0; i < this.data.length; i++) {
            include = false;
            for (var key in this.data[i]) {
                if (key.indexOf('$') != 0 && this.data[i][key] && this.data[i][key].toString().toLowerCase().indexOf(toSearch.toString().toLowerCase()) != -1) {
                    include = true;
                    break;
                }
            }
            if (include)
                results.push(this.data[i]);
        }
        this.data = results;
    }

    private gotoCRM(): void {
        var settings = this.widgetContext.getSettings();
        var group: any = settings.get("group");
        var entity: any = settings.get("entity");
        let CRMLogicalID = <any>{};
        CRMLogicalID = settings.get("CRMLogicalID");
        var appId = '{logicalId}';

        if (CRMLogicalID && CRMLogicalID.value)
            appId = CRMLogicalID.value;

        var url = this.formatStringWithValues(["?LogicalId={0}&ViewId={1}&GroupId={2}", appId, entity.name, group.key]);
        this.widgetContext.launch({ url: url, resolve: true });
    }

    private getStatusClass(key) {
        var status = key.Status ? key.Status : key.Active;
        if (!status)
            return '';
        switch (status.toLowerCase()) {
            case 'active':
            case 'closed - won':
            case 'available':
            case 'approved':
            case 'awarded':
            case 'won':
            case 'sales order':
            case 'open order':
            case 'transmitted to accounting':
            case 'in process':
            case 't':
                return "green-text";
                break;
            case 'new':
            case 'open':
            case 'replaced':
            case 'invoice':
            case 'quote':
                return "blue-text";
                break;
            case 'inactive':
            case 'purge':
            case 'closed':
            case 'canceled':
            case 'closed':
            case 'lost':
            case 'discontinued':
            case 'f':
                return "red-text";
                break;
            case 'closed - lost':
            case 'deleted':
            case 'pending':
            case 'unapproved':
            case 'credit hold':
            case 'pending delete':
            case 'sales hold':
            case 'rejected by accounting delete':
            case 'rejected delete by accounting':
            case 'sales hold':
                return "orange-text";
                break;
            default:
                return "blue-text";
        }
    }
    private isFieldVisible(key) {
        if (this.displayFields.length > 0) {
            for (var j = 0; j < this.displayFields.length; j++) {
                if (this.displayFields[j].text === key && this.displayFields[j].selected === true)
                    return true;
            }
        }
        return false;
    }
    private isMaxFieldsReached(maxCount) {
        ++this.countFields;
        if (this.countFields > maxCount)
            return false;
        return true;
    }
    private resetCount() {
        this.countFields = 0;
        return true;
    }
    private isStatusField() {
        if (this.displayFields.length > 0) {
            for (var j = 0; j < this.displayFields.length; j++) {
                if (this.displayFields[j].text.toLowerCase() === 'status' || this.displayFields[j].text.toLowerCase() === 'active')
                    return true;
            }
        }
        return false;
    }
    private gotoCRMDetailView(item) {
        var settings = this.widgetContext.getSettings();
        var group: any = settings.get("group");
        var entity: any = settings.get("entity");
        let CRMLogicalID = <any>{};

        CRMLogicalID = settings.get("CRMLogicalID");
        var appId = '{logicalId}';
        if (CRMLogicalID && CRMLogicalID.value)
            appId = CRMLogicalID.value;

        var entityID = item[this.keyField];
        if (entityID) {
            var url = this.formatStringWithValues(["?LogicalId={0}&ViewId={1}&GroupId={2}&EntityID={3}", appId, entity.name, group.key, entityID]);
            this.widgetContext.launch({ url: url, resolve: true });
        }
        else {
            lm.Log.info('details view launch url: entityid is missing');
        }
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
    private endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    private getDisplayName(context, key) {
        for (var j = 0; j < context.layout.length; j++) {
            if (context.layout[j].alias === key) {
                if (!context.layout[j].displayName)
                    return key;
                return context.layout[j].displayName;
            }
        }
        key = key.replace('NAME', ''); //ToDo: For SecCodeID, AcctManagerID names ??what happens for other locales
        for (var j = 0; j < context.layout.length; j++) {
            if (context.layout[j].alias === key)
                return context.layout[j].displayName;
        }
        return key;
    }
}

class inforCRMGroupListCustomSettingsCtrl {
    static $inject = ["$scope", "$filter", "commonService"];
    private widgetContext: any;
    private entityValue: any;
    private groupValue: any;
    private limitCount: string;
    private logicalIdSelected: any;
    private widgetSettings: lm.IWidgetSettings;
    private widgetInstanceId: string;
    private language: lm.ILanguage;
    private isEntityBusy: Boolean;
    private isGroupBusy: Boolean;
    private isFiltersBusy: Boolean;
    private hideLogicalIdSelect = false;
    
    private entityOptions: string[];
    private groupOptions: string[];
    private logicalIdValues: string[];
    private dateTime: string;
    private textEntity: string;
    private textGroup: string;
    private textLimit: string;
    private textSelectFields: string;
    private textCRMLogicalID: string;
    private displayFields: any;
    private maxDispalyFields: number;

    private widgetTitle: string;
    private titleEditEnabled: boolean;
    private isTitleUnlockable: boolean;
    private isTitleLocked: boolean;
    private textTitle: string;

    constructor(public scope: ng.IScope, public filter: ng.IFilterService, public commonService: any) {
        // loading spin
        this.isEntityBusy = true;
                
        // Initialize the dropdowns
        ($("#grouplist-widget-groupdropdown") as any).dropdown();
        this.groupValue = null;
        ($("#grouplist-widget-entitydropdown") as any).dropdown();
        this.entityValue = null;
        ($("#grouplist-widget-appdropdown") as any).dropdown();
        this.logicalIdSelected = null;

        // Get instance and context from the scope property defined in Settings factory
        const settingsInstance: lm.IWidgetSettingsInstance = scope["settingsData"].settingsInstance;
        const settingsContext: lm.IWidgetSettingsContext = scope["settingsData"].settingsContext;
        this.widgetContext = settingsContext.getWidgetContext();
        this.widgetInstanceId = this.widgetContext.getWidgetInstanceId();
        this.widgetSettings = this.widgetContext.getSettings();
        
        this.titleEditEnabled = this.widgetContext.isTitleEditEnabled();
        this.isTitleLocked = this.widgetContext.isTitleLocked();
        this.widgetTitle = this.widgetContext.getResolvedTitle(this.isTitleLocked);
        this.isTitleUnlockable = this.widgetContext.isTitleUnlockable();

        var date = new Date();
        this.dateTime = date.getTime().toString();
        this.language = this.widgetContext.getLanguage();
        this.maxDispalyFields = 9;

        //Labels text
        this.textTitle = this.language.get("titleText");
        this.textEntity = this.language.get("textEntity");
        this.textGroup = this.language.get("textGroup");
        this.textSelectFields = this.language.get("textSelectFields");
        this.textLimit = this.language.get("textLimit");
        this.textCRMLogicalID = this.language.get("textCRMLogicalID");
        
        //LogicalID dropdown
        let CRMLogicalID = <any>{};
        CRMLogicalID = this.widgetSettings.get("CRMLogicalID");
        var applications = this.widgetContext.getApplications();
        this.logicalIdSelected = null;
        if (!applications) {
            this.hideLogicalIdSelect = true;
            lm.Log.info('No CRM applications available for the given logicalID');
        }
        else if (applications.length == 1) {
            this.hideLogicalIdSelect = true;
            this.logicalIdSelected = applications[0].value;
        }
        else {
            var options = [], item, i;
            for (i = 0; i < applications.length; i++) {
                var application = applications[i];
                var value = application.logicalId;
                var text = application.productName + " (" + value + ")";
                item = { 'name': text, 'value': value };
                if (CRMLogicalID && CRMLogicalID.value === value) {
                    this.logicalIdSelected = item;
                }
                options.push(item);
            }
            this.logicalIdValues = options;
        }

        var context = this;
        // Callback triggered from Framework when Configure dialog is about to be closed
        settingsInstance.closing = (closingArg: lm.IWidgetSettingsCloseArg) => {
            if (closingArg.isSave) {
                context.widgetSettings.set("entity", context.entityValue);
                context.widgetSettings.set("group", context.groupValue);
                context.widgetSettings.set("limitCount", context.limitCount);
                context.widgetSettings.set("CRMLogicalID", context.logicalIdSelected);
                context.widgetSettings.set("displayFields", context.displayFields);

                context.widgetContext.setTitleLocked(this.isTitleLocked);
                if (context.titleEditEnabled) {
                    context.widgetContext.setTitle(this.widgetTitle);
                }
            }
        };

        this.limitCount = '10';
        var limit = this.widgetSettings.get<string>("limitCount");
        if (limit) {
            this.limitCount = limit;
        }

        //begin
        var sdataUrlContext = this.widgetSettings.get<string>("SDataApiContext");
        var entityUrl = sdataUrlContext + '/SData/slx/metadata/-/entities?startIndex=0&count=300&where=filters.analyticsAvailable eq true and filters.filterType eq \'analyticsMetric\'&select=name,displayName,tableName&orderBy=$descriptor&format=json&_t={0}';
        entityUrl = context.formatStringWithValues([entityUrl, this.dateTime]);
        const entityReq = this.createRequest(encodeURI(entityUrl));
        this.widgetContext.executeIonApiAsync(entityReq).then((response) => {
            var data = response.data.$resources;
            var options = [], item, i;
            for (i = 0; i < data.length; i++) {
                item = { 'name': data[i].name, 'value': data[i].displayName };
                options.push(item);
            }
            context.entityOptions = options;

            let entityVal = <any>{};
            entityVal = context.widgetSettings.get("entity");
            context.entityValue = null;
            if (entityVal && entityVal.value) {
                for (i = 0; i < options.length; i++) {
                    if (entityVal.value === options[i].value) {
                        context.entityValue = options[i];
                        break;
                    }
                }
            }
            if(context.entityValue)
                this.entityChanged();

            context.isEntityBusy = false;
        }, (error) => { this.commonService.onRequestError(error, this); });

        //end
    }
    
    private onClickIsLocked(): void {
        this.isTitleLocked = !this.isTitleLocked;
        if (this.isTitleLocked) {
            this.widgetTitle = this.widgetContext.getResolvedTitle(this.isTitleLocked);
        }
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
    
    private entityChanged = function () {
        var dateTime = this.dateTime;
        var entitySelected = this.entityValue || this.widgetSettings.get("entity");
        if (!entitySelected) {
            return;
        }

        this.isGroupBusy = true;
        var context = this;
        var sdataUrlContext = this.widgetContext.getSettings().get("SDataApiContext");
        var groupsUrl = sdataUrlContext + '/SData/slx/system/-/groups?_compact=true&startIndex=0&count=300&where=upper(family) eq upper(\'{0}\')&select=name,displayName&orderBy=name&format=json&_t={1}';
        groupsUrl = this.formatStringWithValues([groupsUrl, entitySelected.name, dateTime]);
        const groupsReq = this.createRequest(encodeURI(groupsUrl));
        this.widgetContext.executeIonApiAsync(groupsReq).then((response) => {
            var data = response.data.$resources;
            var options = [], item, i;
            for (i = 0; i < data.length; i++) {
                item = { 'name': data[i].displayName, 'key': data[i].$key };
                options.push(item);
            }
            context.groupOptions = options;

            var groupVal = context.widgetSettings.get("group");
            context.groupValue = null;
            if (groupVal && groupVal.name) {
                for (i = 0; i < options.length; i++) {
                    if (groupVal.name === options[i].name) {
                        context.groupValue = options[i];
                        break;
                    }
                }
            }
            if (context.groupValue)
                context.groupChanged();

            context.isGroupBusy = false;
            
        }, (error) => { this.commonService.onRequestError(error, this); });

    };

    private isLimitReached = function () {
        return this.displayFields.filter(
            function (unit) { return unit.selected; }).length >= this.maxDispalyFields;
    };

    private settingsChanged = function () {
        $('.btn-modal-primary').prop('disabled', false);
    };

    private groupChanged = function () {
        var context = this;
        //Populate the fields checkboxes
        var group: any = context.widgetSettings.get("group");
        var data = context.widgetSettings.get("displayFields");
        if (group && group.key === context.groupValue.key && data && data.length !== 0) {
            if (context.displayFields)
                context.displayFields.length = 0;
            context.displayFields = angular.copy(data);
        } else {
            this.isFiltersBusy = true;
            var sdataUrlContext = context.widgetContext.getSettings().get("SDataApiContext");
            var layoutUrl = sdataUrlContext + '/SData/slx/system/-/groups("{0}")?_compact=true&include=layout&format=json&_t={1}';
            layoutUrl = this.formatStringWithValues([layoutUrl, context.groupValue.key, this.dateTime]);
            const layoutReq = this.createRequest(encodeURI(layoutUrl));
            this.widgetContext.executeIonApiAsync(layoutReq).then((response) => {
                if (context.layout) {
                    context.layout.length = 0;
                }
                context.layout = response.data['layout'];
                context.keyField = response.data['keyField'];
                var options = [], item ;
                var showField = true;
                for (var j = 0; j < context.layout.length; j++) {
                    if (context.layout[j].displayName && context.layout[j].visible) {
                        if (options.length === this.maxDispalyFields) {
                            showField = false;
                        }
                        item = { 'id': context.layout[j].alias, 'selected': showField, 'text': context.layout[j].displayName };
                        options.push(item);
                    }
                }
                if (context.displayFields) {
                    context.displayFields.length = 0;
                }
                context.displayFields = options;
                context.isFiltersBusy = false;
            }, (error) => { this.commonService.onRequestError(error, this); });
        }

    };
    private formatStringWithValues(args: any): string {
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

    // Add the controller class to the provided AngularJS module
    var m = context.getAngularContext().module;

    m.service('commonService', function () {
        this.onRequestError = function (error, context) {
            var errorText: string;
            if (error.status === 403 && error.statusText === 'Forbidden'){ //sdata error
                errorText = context.language.get("textErrorInSData");
            } else { //mingle error
                errorText = context.language.get("textErrorInMingle");
            }
            var errorMsg: lm.IWidgetMessage = { message: errorText, type: lm.WidgetMessageType.Error };
            context.widgetContext.showWidgetMessage(errorMsg);
            context.setBusy(false);

            if (context.hideGrid === false) {
                context.hideGrid = true;
            }
            if (context.isEntityBusy) {
                context.isEntityBusy = false;
                context.isGroupBusy = false;
                context.isFiltersBusy = false;
            }
            lm.Log.error("on Request Error : " + error);
        };
    });

    m.controller("crm.inforCRMGroupListMainCtrl", inforCRMGroupListMainCtrl);
    m.controller("crm.inforCRMGroupListCustomSettingsCtrl", inforCRMGroupListCustomSettingsCtrl);

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
        actions: <lm.IWidgetAction[]>[
            { isPrimary: true, standardIconName: "#icon-launch" }
        ],
        isConfigured(settings: any): boolean {
            var entity = settings.get("entity");
            var group = settings.get("group");
            var limitCount = settings.get("limitCount");

            if (entity && group && limitCount)
                return true;

            return false;
        }
    };
    return instance;
};