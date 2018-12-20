/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/lime/lime.d.ts" />
/// <reference path="../scripts/typings/lime/lime.d.ts" />

import t = require("./templateCache");
import lm = require("lime");
declare var $: any;
class OpportunityStatusCtrl {	
	private widgetContext: lm.IWidgetContext;
	private widgetInstance: lm.IWidgetInstance;
	public OpenOpportunities: string;
    public ClosedOpportunities: string;
	public OpportunitiesWon: string;
    public OpportunitiesLost: string;
    public OppGroupKey: string;
    public OppInfotext: string;
    private language: lm.ILanguage;
    private dateTime: string;
    private textValue: string;
    private messageType = null;
    public messageData: string;
	// Use the $inject array to avoid issues with minification
	static $inject = ["$scope"];
	constructor(public scope: ng.IScope) {
		// making Count By Default 0
		this.OpenOpportunities = "0";
		this.ClosedOpportunities = "0";
		this.OpportunitiesWon = "0";
		this.OpportunitiesLost = "0";
        this.OppGroupKey = "0";
        this.OppInfotext = "";
		// Get the widget context and the widget instance that are made available on the scope by the framework
		this.widgetContext = scope[lm.WidgetConstants.widgetContextKey];
		this.widgetInstance = scope[lm.WidgetConstants.widgetInstanceKey];
		this.language = this.widgetContext.getLanguage();
        this.registerHandler();	
	}
    private registerHandler(): void {

        // Register a handler with the message type defined in settings
        this.messageType = this.widgetContext.getSettings().getString("MessageType");
        const self = this;

        infor.companyon.client.registerMessageHandler(this.messageType, (data) => {
            try {
                if (data.entities.length > 0) {
                    var entity = data.entities[0];
                    var url = entity.drillbackURL;
                    var filename = url.substring(url.lastIndexOf('/') + 1);
                    var decoded = decodeURIComponent(filename);

                    var entityid = this.getParameterByName('entityid', decoded);
                    var groupId = this.getParameterByName('gid', decoded);
                    var entityName = entity.entityType;
                    var Contextname = entity.id1;

                    if (entityName != 'Opportunity' && entityName != 'Account') {
                        this.SetDefaultContent(Contextname);
                    }
                    else if (entityName == 'Account' && (entityid === null || entityid === '') && groupId !== null && groupId !== '') {
                        this.SetAccountGroupContent(groupId, entityName, entityid, Contextname);
                    }
                    else {
                        this.buidUrlandSetContent(groupId, entityName, entityid, Contextname);
                    }
                }
                else {
                    this.OppInfotext = "No Data ";
                }
            } catch (e) {
                lm.Log.error("Error occured in registerMessageHandler");
            }               
            });
        
    }
    private getParameterByName(name, url)
    {
        return decodeURIComponent(url.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(name).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    }
    private buidUrlandSetContent(groupId, entityName, entityid, Contextname)
    {
        try{
            var sdataUrlContext = this.widgetContext.getSettings().get("SDataApiContext");
            var entityUrl = sdataUrlContext + '/sdata/slx/dynamic/-/accounts(\'{0}\')/Opportunities?startIndex=0&count=1&select=STATUS,OPPORTUNITYID&format=json&_t={1}';
            if (entityName == 'Opportunity')
                entityUrl = sdataUrlContext + '/sdata/slx/dynamic/-/Opportunities(\'{0}\')?startIndex=0&count=1&select=STATUS,OPPORTUNITYID&format=json&_t={1}';
            entityUrl = this.format([entityUrl, entityid, this.dateTime]);
            if ((entityid === null || entityid === "") && groupId !== null && groupId !== "") {
                entityUrl = sdataUrlContext + '/sdata/slx/system/-/groups(\'{0}\')/$queries/execute?_compact=true&select=STATUS,OPPORTUNITYID&count=1&startIndex=0&format=json&_t={1}';
                entityUrl = this.format([entityUrl, groupId, this.dateTime]);
            }
            if (entityName != 'Opportunity' && entityName != 'Account') {
                entityUrl = sdataUrlContext + '/sdata/slx/system/-/groups?_compact=true&startIndex=1&count=1&where=upper(family) eq \'OPPORTUNITY\'&select=$key,STATUS&orderBy=displayName&format=json&_t={0}';
                entityUrl = this.format([entityUrl, this.dateTime]);
            }
        
            this.SetContent(entityUrl, Contextname);
        } catch (e) {
            lm.Log.error("Error occured in buidUrlandSetContent");
        } 
    }
    private SetContent(entityUrl, Contextname)
    {
        this.OpenOpportunities = "0";
        this.ClosedOpportunities = "0";
        this.OpportunitiesWon = "0";
        this.OpportunitiesLost = "0";
        var context = this;
        this.OppInfotext = Contextname; 

        var openEntityUrl = entityUrl + '&Where=Status eq \'Open\'';
        var entityReq = this.createRequest(encodeURI(openEntityUrl));
        this.widgetContext.executeIonApiAsync(entityReq).then(function (response) {
            if (response.data['$totalResults'])
                context.OpenOpportunities = response.data['$totalResults'];
            if (response.data['Status'] == 'Open')
                    context.OpenOpportunities = "1";
                    

        }, function (error) { context.onRequestError(error); }); 


        var closedWonEntityUrl = entityUrl + '&Where=Status eq \'Closed - Won\''; 
        var entityCWonReq = this.createRequest(encodeURI(closedWonEntityUrl));
        this.widgetContext.executeIonApiAsync(entityCWonReq).then(function (response) {
            if (response.data['$totalResults'])
                context.OpportunitiesWon = response.data['$totalResults'];
            if (response.data['Status'] == 'Closed - Won')
                context.OpportunitiesWon = "1";
        }, function (error) { context.onRequestError(error); }); 

        var closedLostEntityUrl = entityUrl + '&Where=Status eq \'Closed - Lost\'';
        var entityCLostReq = this.createRequest(encodeURI(closedLostEntityUrl));
        this.widgetContext.executeIonApiAsync(entityCLostReq).then(function (response) {
            if (response.data['$totalResults'])
                context.OpportunitiesLost = response.data['$totalResults'];
            if (response.data['Status'] == 'Closed - Lost')
                context.OpportunitiesLost = "1";
        }, function (error) { context.onRequestError(error); }); 


        var closedEntityUrl = entityUrl + '&Where=Status in (\'Closed - Won\',\'Closed - Lost\')';
        var entityCReq = this.createRequest(encodeURI(closedEntityUrl));
        this.widgetContext.executeIonApiAsync(entityCReq).then(function (response) {
            if (response.data['$totalResults'])
                context.ClosedOpportunities = response.data['$totalResults'];
            if ((response.data['Status'] == 'Closed - Lost' || response.data['Status'] == 'Closed - Won' ))
                context.ClosedOpportunities = "1";
        }, function (error) { context.onRequestError(error); }); 
    }
    private SetDefaultContent(Contextname) {
        var context = this;
        this.OppInfotext = this.language['oppgroupDisplayTitle'];
        var sdataUrlContext = context.widgetContext.getSettings().get("SDataApiContext");
        var entityGroupUrl = sdataUrlContext + '/sdata/slx/system/-/groups?_compact=true&startIndex=1&count=100&where=upper(family) eq \'OPPORTUNITY\'&select=$key,$descriptor,name,isHidden,userId,status,family,displayName&orderBy=displayName&format=json&_t={0}';
        entityGroupUrl = context.format([entityGroupUrl, this.dateTime]);
        var entityGroupReq = this.createRequest(encodeURI(entityGroupUrl));
        var key = '';
        this.widgetContext.executeIonApiAsync(entityGroupReq).then(function (response) {
            var data = response.data['$resources'];
            var options = [], item, i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name == 'All Opportunities') {
                    key = data[i].$key;
                    break;
                }
            }
            var sdataUrlContext = context.widgetContext.getSettings().get("SDataApiContext");
            var entityUrl = sdataUrlContext + '/sdata/slx/system/-/groups(\'{0}\')/$queries/execute?_compact=true&select=STATUS,OPPORTUNITYID&startIndex=1&count=10000&format=json&_t={1}';
            entityUrl = context.format([entityUrl, key, context.dateTime]);
            context.SetContent(entityUrl, context.OppInfotext);
        }, function (error) { context.onRequestError(error); });



    }
    private SetAccountGroupContent(groupId, EntityName, entityId, Contextname) {        
        var sdataUrlContext = this.widgetContext.getSettings().get("SDataApiContext");
        var context = this;
        var entityUrl = sdataUrlContext + '/sdata/slx/system/-/groups(\'{0}\')/$queries/execute?_compact=true&select=STATUS,ACCOUNTID&startIndex=1&count=100&format=json&_t={1}';
        entityUrl = this.format([entityUrl, groupId, this.dateTime]);
        var entityReq = this.createRequest(encodeURI(entityUrl));
        entityReq.withCredentials = true; 
        this.OppInfotext = this.language['accountgroupDisplayTitle'] + Contextname;       
        this.widgetContext.executeIonApiAsync(entityReq).then(function (response) {
            try{
                var accIds = '';
                var data = response.data['$resources'];
                var options = [], item, i;
                for (i = 0; i < data.length; i++) {
                    if (accIds !== '') {
                        accIds = accIds + ',' + '\'' + data[i].ACCOUNTID + '\'';
                    }
                    else {
                        accIds = '\'' + data[i].ACCOUNTID + '\'';
                    }
                }
                entityUrl = sdataUrlContext + '/sdata/slx/dynamic/-/opportunities?startIndex=0&where=Account.Id in ({0}) and {2} &count=1&select=STATUS,OPPORTUNITYID&format=json&_t={1}';
                //entityUrl = context.format([entityUrl, accIds, context.dateTime]);
                context.OpenOpportunities = "0";
                context.ClosedOpportunities = "0";
                context.OpportunitiesWon = "0";
                context.OpportunitiesLost = "0";
            
                //this.OppInfotext = Contextname; 

            
                var openEntityUrl = entityUrl
                openEntityUrl = context.format([openEntityUrl, accIds, context.dateTime, 'Status eq \'Open\'']);
                var entityReq = context.createRequest(encodeURI(openEntityUrl));
                context.widgetContext.executeIonApiAsync(entityReq).then(function (response) {
                    context.OpenOpportunities = response.data['$totalResults'];

                }, function (error) { context.onRequestError(error); });


                var closedWonEntityUrl = entityUrl
                closedWonEntityUrl = context.format([closedWonEntityUrl, accIds, context.dateTime, 'Status eq \'Closed - Won\'']);
                var entityCWonReq = context.createRequest(encodeURI(closedWonEntityUrl));
                context.widgetContext.executeIonApiAsync(entityCWonReq).then(function (response) {
                    context.OpportunitiesWon = response.data['$totalResults'];
                }, function (error) { context.onRequestError(error); });
            
                var closedLostEntityUrl = entityUrl
                closedLostEntityUrl = context.format([closedLostEntityUrl, accIds, context.dateTime, 'Status eq \'Closed - Lost\'']);
                var entityCLostReq = context.createRequest(encodeURI(closedLostEntityUrl));
                context.widgetContext.executeIonApiAsync(entityCLostReq).then(function (response) {
                    context.OpportunitiesLost = response.data['$totalResults'];
                }, function (error) { context.onRequestError(error); });
            
                var closedEntityUrl = entityUrl
                closedEntityUrl = context.format([closedEntityUrl, accIds, context.dateTime, 'Status in (\'Closed - Won\',\'Closed - Lost\')']);
                var entityCReq = context.createRequest(encodeURI(closedEntityUrl));
                context.widgetContext.executeIonApiAsync(entityCReq).then(function (response) {
                    context.ClosedOpportunities = response.data['$totalResults'];
                }, function (error) { context.onRequestError(error); });       
            } catch (e) {
                lm.Log.error("Error occured in SetAccountGroupContent");
            }       

        }, function (error) { context.onRequestError(error); });
    }
    
    private setBusy(isBusy: boolean): void {
        this.widgetContext.setState(isBusy ? lm.WidgetState.busy : lm.WidgetState.running);
    }
    private onRequestError(error: any): void {
        this.textValue = this.language['errorOccured'];
        this.setBusy(false);

        lm.Log.error("Failed to call ION API: " + error);
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

	// Add the controller class to the provided AngularJS module
    var m = context.getAngularContext().module;
    m.controller("crm.OpportunityStatusCtrl", OpportunityStatusCtrl);

    if (!angularConfig) {
        angularConfig = {};
        if (context.isDev()) {
            angularConfig.relativeTemplateUrl = "widget.html";
        } else {
            angularConfig.templates = t.getTemplates(context.getAngularContext());
            angularConfig.cachedTemplateUrl = angularConfig.templates[0].key;
        }
    }
	// Create and return the widget instance
	var instance: lm.IWidgetInstance = {
        angularConfig: angularConfig
    };
	return instance;
};