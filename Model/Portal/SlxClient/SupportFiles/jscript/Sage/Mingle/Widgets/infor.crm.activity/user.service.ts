import { createRequest } from './activity.service';
import lm = require('lime');

export interface IUserService {
    userId: string;
    userName: string;
    widgetContext: lm.IWidgetContext;
    getMingleUser(): ng.IPromise<any>;
}
export class UserService implements IUserService {
    userId: string;
    userName: string;
    private settings: lm.IWidgetSettings;

    private wc: lm.IWidgetContext;
    set widgetContext(value: lm.IWidgetContext) {
        this.wc = value;
        this.settings = this.wc.getSettings();
    }
    get widgetContext() {
        return this.wc;
    }

    static $inject = ['$q'];
    constructor(private q: ng.IQService) { }

    getMingleUser(): ng.IPromise<any> {
        if (this.userId) {
            return this.q.when({});
        }

        const endpoint = '/Mingle/SocialService.Svc/User/Detail';
        const request = createRequest('get', endpoint, null);

        return this.widgetContext.executeIonApiAsync(request)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                return response.data;
            })
            .then((data: any) => {
                return this.getCrmUser(data)
                    .then((sdataResponse: ng.IHttpPromiseCallbackArg<any>) => {
                        this.userId = sdataResponse.data.$resources[0].$key;
                        this.userName = sdataResponse.data.$resources[0].UserName;

                        return this.q.when({});
                    });
            })
            .catch((reason: any) => {
                lm.Log.error(reason);
            });
    }

    private getCrmUser(data: any) {
        const sdataUrl = 'CRMSData';
        const sdataQuery = `/sdata/slx/dynamic/-/users?_compact=true&format=json&where=(FederatedIdentity eq "${data.UserDetailList[0].UserName}")`;
        const request = createRequest('get', `${sdataUrl}${sdataQuery}`, null);

        return this.widgetContext.executeIonApiAsync(request);
    }
}