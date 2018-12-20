import { constants, createRequest } from './opportunity.common';
import lm = require('lime');

export interface IOpportunityService {
    widgetContext: lm.IWidgetContext;
    getCrmMyOpportunitiesGroup(limitCount: number): ng.IPromise<any>;
    getOpportunities(groupId: string, limitCount: number, searchText: string): ng.IPromise<any>;
    getQuotes(opportunityId: string): ng.IPromise<any>
}

export class OpportunityService implements IOpportunityService {
    private settings: lm.IWidgetSettings;
    private sdataUrl: string;

    private wc: lm.IWidgetContext;
    set widgetContext(value: lm.IWidgetContext) {
        this.wc = value;
        this.settings = this.wc.getSettings();
        this.sdataUrl = 'CRMSData';
    }
    get widgetContext() {
        return this.wc;
    }

    private get uniqueVal() {
        return (new Date()).getTime().toString();
    }

    getCrmMyOpportunitiesGroup(limitCount: number): ng.IPromise<any> {
        const sdataQuery = [
            '/sdata/slx/system/-/groups?_compact=true',
            '&startIndex=0&count=1&where=upper(name) eq upper("MY OPPORTUNITIES")',
            '&select=NAME,DISPLAYNAME&orderBy=name&format=json',
            `&_t=${this.uniqueVal}&count=${limitCount}`
        ].join('');
        const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`);

        return this.widgetContext.executeIonApiAsync(request);
    }

    getOpportunities(groupId: string, limitCount: number, searchText: string): ng.IPromise<any> {
        var sdataQuery = [
            `/sdata/slx/system/-/groups('${groupId}')/$queries/execute?_compact=true&`,
            'select=ACCOUNTMANAGERID,ACCOUNTMANAGERIDNAME,DESCRIPTION,OPPORTUNITYID,',
            'A2_ACCOUNT,A2_ACCOUNTID,ESTIMATEDCLOSE,SALESPOTENTIAL,CLOSEPROBABILITY,',
            'WSALE,STAGE,STATUS,SECCODEID,SECCODEIDNAME,OPPORTUNITYID&',
            `startIndex=1&count=${limitCount}&format=json&_t=${this.uniqueVal}`
        ].join('');
        if (searchText) {
            sdataQuery = sdataQuery + `&where=(upper(A2_ACCOUNT) like "%${searchText}%") or (upper(DESCRIPTION) like "%${searchText}%")`;
        }
        const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`);

        return this.widgetContext.executeIonApiAsync(request);
    }

    getQuotes(opportunityId: string): ng.IPromise<any> {
        const sdataQuery = [
            '/sdata/slx/dynamic/-/quotes?_compact=true&select=QUOTENUMBER,GRANDTOTAL&',
            `where=(Opportunity.Id eq '${opportunityId}')&format=json&_t=${this.uniqueVal}`
        ].join('');
        const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`);

        return this.widgetContext.executeIonApiAsync(request);
    }
}