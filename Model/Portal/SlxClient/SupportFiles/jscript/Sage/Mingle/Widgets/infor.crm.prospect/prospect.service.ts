import { createRequest, constants } from './prospect.common';
import { IUserService } from './user.service'

import lm = require('lime');

export interface IProspectService {
    widgetContext: lm.IWidgetContext;
    getCrmMyProspectsGroup(limitCount: number): ng.IPromise<any>;
    getProspects(limitCount: number, searchText: string): ng.IPromise<any>;
}

export class ProspectService implements IProspectService {
    private settings: lm.IWidgetSettings;
    private sdataUrl: string;

    private wc: lm.IWidgetContext;
    set widgetContext(value: lm.IWidgetContext) {
        this.wc = value;
        this.settings = this.wc.getSettings();
        this.sdataUrl = 'CRMSData';
        this.userService.widgetContext = value;
    }
    get widgetContext() {
        return this.wc;
    }

    static $inject = ['infor.crm.prospect.UserService'];
    constructor(private userService: IUserService) { }

    getCrmMyProspectsGroup(limitCount: number): ng.IPromise<any> {
        var uniqueVal = Math.random().toString();
        const sdataQuery = [
            '/sdata/slx/system/-/groups?_compact=true',
            '&startIndex=0&count=1&where=upper(name) eq upper("MY ACCOUNTS")',
            '&select=name,displayName&orderBy=name&format=json',
            `&_t=${uniqueVal}&count=${limitCount}`,
        ].join(''); 
        const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`);

        return this.widgetContext.executeIonApiAsync(request);
    }

    getProspects(limitCount: number, searchText: string): ng.IPromise<any> {
        return this.userService.getMingleUser()
            .then(() => {
                var uniqueVal = Math.random().toString();
                var sdataQuery = [
                    '/sdata/slx/dynamic/-/accounts?_compact=true',
                    `&include=Addresses&startIndex=1&count=${limitCount}&_t=${uniqueVal}`,
                    '&select=AccountName,BusinessDescription,MainPhone,Addresses/StreetAddress,Addresses/City,Addresses/Country,Addresses/MainPhone,Owner/OwnerDescription',
                    '&format=json'
                ].join('');

                if (searchText) {
                    sdataQuery = sdataQuery + `&where=(AccountManager.Id eq '${this.userService.userId}' and Type eq 'Prospect' and upper(AccountName) like "%${searchText}%")`;
                }
                else {
                    sdataQuery = sdataQuery + `&where=(AccountManager.Id eq '${this.userService.userId}' and Type eq 'Prospect')`;
                }

                const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`);

                return this.widgetContext.executeIonApiAsync(request);
            })
            .catch((reason: any) => {
                console.error(reason);
            });
    }
}