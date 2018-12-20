import { constants, createRequest } from './contract.common';
import lm = require('lime');

export interface IContractService {
    widgetContext: lm.IWidgetContext;
    limitCount: number;
    getContracts(groupId: string, searchText: string): ng.IPromise<any>; 
    getContacts(contractId: string): ng.IPromise<any>;
    getContract(contractId: string): ng.IPromise<any>;
    getContractGroups(): ng.IPromise<any>;
}

export class ContractService implements IContractService {
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

    get limitCount() {
        const limitCount = this.settings.get(constants.limitCount);
        if (!limitCount) {
            this.settings.set(constants.limitCount, 10);
        }

        return <number>this.settings.get(constants.limitCount);
    }
    
    getContracts(groupId: string, searchText: string): ng.IPromise<any> {
        var uniqueVal = Math.random().toString();
        var sdataQuery = [
            `/sdata/slx/system/-/groups('${groupId}')/$queries/execute?`,//_compact=true&
            'A2_ACCOUNT,A2_ACCOUNTID,REFERENCENO,CONTRACTID,SERVICECODETEXT,TYPECODE,TYPECODETEXT,ISACTIVE,ENDINGDATE,CONTRACTID',
            `startIndex=1&count=${this.limitCount}&format=json`,
            `&_t=${uniqueVal}`//&orderby=ENDINGDATE
        ].join('');
        if (searchText) {
            sdataQuery = sdataQuery + `&where=(upper(A2_ACCOUNT) like "%${searchText}%") or (upper(SERVICECODETEXT) like "%${searchText}%")`;
        }
        const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`);
        
        return this.widgetContext.executeIonApiAsync(request);
    }

    getContract(contractId: string): ng.IPromise<any> {
        var uniqueVal = Math.random().toString();
        const sdataQuery = [
            `/sdata/slx/dynamic/-/contracts('${contractId}')?format=json`,
            `&_compact=true&startIndex=1&count=${this.limitCount}`,
            '&select=PONumber,Amount,Account/Address/StreetAddress,Account/Address/City,Account/Address/Country,Account/MainPhone,Owner/OwnerDescription&include=Account\Address',
            `&_t=${uniqueVal}`
        ].join('');
        const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`);

        return this.widgetContext.executeIonApiAsync(request);
    }

    getContacts(accountId: string): ng.IPromise<any> {
        //http://icrmcomm8306.icrmtest.com/slxclient/slxdata.ashx/slx/dynamic/-/contracts('cDEMOA000009')?format=json&select=Account/Address/StreetAddress,Account/Address/City,Account/Address/Country&include=Account\Address
        var uniqueVal = Math.random().toString();
        const sdataQuery = [
            '/sdata/slx/dynamic/-/contacts?_compact= true',
            '&count=20&select=Id,$key,NameLF,IsPrimary,WorkPhone,Email,Title',
            `&startIndex=1&count=${this.limitCount}`,
            `&orderby=NameLF&where=(Account.Id eq '${accountId}')&startIndex=1&format=json`,
            `&_t=${uniqueVal}`
        ].join('');
        const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`);

        return this.widgetContext.executeIonApiAsync(request);
    }

    getContractGroups(): ng.IPromise<any> {
        var uniqueVal = Math.random().toString();
        const sdataQuery = [
            '/SData/slx/system/-/groups?startIndex=0&_compact=true&count=300&where=upper(family) eq upper(\'Contract\')&select=name,displayName&orderBy=name&format=json',
            `&_t=${uniqueVal}`
        ].join('');
        const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`);

        return this.widgetContext.executeIonApiAsync(request);
    }
}

export const contractConstants = {
    limitCount: 'limitCount'
}