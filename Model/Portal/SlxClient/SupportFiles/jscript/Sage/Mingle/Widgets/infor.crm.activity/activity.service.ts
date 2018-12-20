import { IUserService } from './user.service';
import lm = require('lime');

export interface IActivityService {
    widgetContext: lm.IWidgetContext;
    getMyActivities(limitCount: number): ng.IPromise<any>;
    getOverdueActivities(limitCount: number): ng.IPromise<any>;
    getAllOpenActivities(): ng.IPromise<any>;
    getAllOpenActivities(): ng.IPromise<any>; 
    getUserActvities(activityId: string): ng.IPromise<any>;//may not reqd
    completeActivityNow(activity: any): ng.IPromise<any>;
    completeActivityAsScheduled(activity: any): ng.IPromise<any>;
    deleteActivity(activityId: string): ng.IPromise<any>; 
    accetptActivity(activityId: string): ng.IPromise<any>;
    declineActivity(activityId: string): ng.IPromise<any>;
}

export class ActivityService implements IActivityService {
    private settings: lm.IWidgetSettings;
    private sdataUrl: string;
    private userNotificationId: string;
    private userNotification: any;

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
    
    private get uniqueNumber() {
        return (new Date()).getTime().toString();
    }

    static $inject = [
        'infor.crm.UserService',
        '$q'
    ];
    constructor(private userService: IUserService, private q: ng.IQService) { }

    getMyActivities(limitCount: number): ng.IPromise<any> {
        // Would need to getMingleUser since we are not able to inject lm.IWidgetContext
        // Ideally, this would be in the constructor if we are able to inject lm.IWidgetContext
        return this.userService.getMingleUser()
            .then(() => {
                const sdataQuery = [
                    '/sdata/slx/system/-/userActivities?_compact=false',
                    '&select=Activity/Attachment,Activity/Timeless,Activity/RecurrenceState,Activity/Recurring,Activity/RecurIterations,Activity/Alarm,Activity/Type,Activity/StartDate,Activity/Duration,Activity/ContactName,Activity/PhoneNumber,Activity/Location,Activity/ContactId,Activity/LeadName,Activity/LeadId,Activity/AccountName,Activity/AccountId,Activity/Description,Activity/Priority,Activity/Leader,UserId,AlarmTime,Alarm,Status,Activity/AttendeeCount&include=Activity,$descriptors&format=json',
                    `&startIndex=1&count=${limitCount}`,
                    `&where=(UserId eq "${this.userService.userId}") and (Status ne "asDeclned") and (Activity.Type ne "atLiterature")`,
                    `&_t=${this.uniqueNumber}`
                ].join('');
                const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`, null);

                return this.widgetContext.executeIonApiAsync(request);
            });
    }

    getOverdueActivities(limitCount: number): ng.IPromise<any> {
        return this.userService.getMingleUser()
            .then(() => {
                var date = new Date();
                var uniqueNumber = date.getTime().toString();
                const today = (new Date()).toISOString();
                const yesterday = (new Date(new Date().setDate(new Date().getDate() - 1))).toISOString();
                const sdataQuery = [
                    '/sdata/slx/system/-/userActivities?_compact=true',
                    '&select=Activity/Attachment,Activity/Timeless,Activity/RecurrenceState,Activity/Recurring,Activity/RecurIterations,Activity/Alarm,Activity/Type,Activity/StartDate,Activity/Duration,Activity/ContactName,Activity/ContactId,Activity/LeadName,Activity/LeadId,Activity/AccountName,Activity/Location,Activity/AccountId,Activity/Description,Activity/Priority,Activity/Leader,UserId,AlarmTime,Alarm,Status&include=Activity,$descriptors',
                    '&orderby=Activity.StartDate desc',
                    `&where=((User.Id eq '${this.userService.userId}')`,
                    'and(Activity.Type ne "atLiterature") and ((Alarm eq "false") or (Alarm eq null)) ',
                    `and((Activity.StartDate lt "${today}") and((Activity.Timeless eq "false") or (Activity.Timeless eq null)) `,
                    `or ((Activity.StartDate lt "${yesterday}") and (Activity.Timeless eq 'true'))))`,
                    `&startIndex=1&count=${limitCount}&format=json`,
                    `&_t=${this.uniqueNumber}`
                ].join('');
                const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`, null);

                return this.widgetContext.executeIonApiAsync(request);
            });
    }

    getAllOpenActivities(): ng.IPromise<any> {
        const sdataQuery = [
            '/sdata/slx/system/-/activities?_compact=true',
            '&orderby=StartDate desc',
            '&where=((Type ne "atLiterature" ))',
            '&startIndex=1&count=100',
            '&format=json',
            `&_t=${this.uniqueNumber}`
        ].join('');
        const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`, null);

        return this.widgetContext.executeIonApiAsync(request);
    }

    getUserActvities(activityId: string): ng.IPromise<any> {
        
        return this.userService.getMingleUser()
            .then(() => {
                var activityInfo = 'ActivityId=' + activityId + ';UserId=' + this.userService.userId;

                const sdataQuery = [
                    '/sdata/slx/system/-/userActivities(\''+activityInfo+'\')?_compact=true',
                    '&select=Alarm,AlarmTime,Activity/StartDate&include=$descriptors&format=json',
                    `&_t=${this.uniqueNumber}`
                ].join('');
                const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`, null);

                return this.widgetContext.executeIonApiAsync(request);
            });
    }

    completeActivityNow(activity: any): ng.IPromise<any> {
        return this.userService.getMingleUser()
            .then(() => {
                var today = new Date();
                var uniqueNumber = today.getTime().toString();
                var pad = function (n) { return n < 10 ? '0' + n : n; };
                var toIsoStringFromDate = today.getUTCFullYear() + '-'
                                + pad(today.getUTCMonth() + 1) + '-'
                                + pad(today.getUTCDate()) + 'T'
                                + pad(today.getUTCHours()) + ':'
                                + pad(today.getUTCMinutes()) + ':'
                                + pad(today.getUTCSeconds()) + 'Z';
                var payload = {
                    "$name": "Complete",
                    "request": {
                        "entity": activity,
                        "userId": this.userService.userId,
                        "result": 'Complete',
                        "resultCode": 'COM',
                        "completeDate": toIsoStringFromDate
                    }
                };
                const sdataQuery = [
                    '/sdata/slx/system/-/activities/%24service/Complete?_compact=true&format=json',
                    `&_t=${this.uniqueNumber}`
                ].join('');
                const request = createRequest('post', `${this.sdataUrl}${sdataQuery}`, payload);

                return this.widgetContext.executeIonApiAsync(request);
            });
    }

    completeActivityAsScheduled(activity: any): ng.IPromise<any> {
        return this.userService.getMingleUser()
            .then(() => {
                var today = new Date();
                var uniqueNumber = today.getTime().toString();

                var payload = {
                    "$name": "Complete",
                    "request": {
                        "entity": activity,
                        "userId": this.userService.userId,
                        "result": 'Complete',
                        "resultCode": 'COM',
                        "completeDate": activity.StartDate
                    }
                };
                const sdataQuery = [
                    '/sdata/slx/system/-/activities/%24service/Complete?_compact=true&format=json',
                    `&_t=${uniqueNumber}`
                ].join('');
                const request = createRequest('post', `${this.sdataUrl}${sdataQuery}`, payload);

               return this.widgetContext.executeIonApiAsync(request);
            });
    }

    getUserNotificationId(activityId: string): ng.IPromise<any> {
        return this.userService.getMingleUser()
            .then(() => {
                const sdataQuery = [
                    '/sdata/slx/dynamic/-/userNotifications?_compact=true&format=json',
                    `&where=ActivityId eq '${activityId}' and ToUser.Id eq '${this.userService.userId}'`,
                    '&precedence=0',
                    `&_t=${this.uniqueNumber}`
                ].join('');
                const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`, null);
                return this.widgetContext.executeIonApiAsync(request)
                    .then((response: any) => {
                        this.userNotificationId = response.data.$resources[0].$key;
                    })
                    .catch((reason: any) => {
                        lm.Log.error(reason);
                    });
            });
            
    }

    getUserNotificationObject(activityId: string): ng.IPromise<any> {
        return this.getUserNotificationId(activityId)
            .then(() => {
                const sdataQuery = [
                    '/sdata/slx/system/-/userNotifications(\'' + this.userNotificationId + '\')?_compact=true',
                    '&include=Activity,$descriptors&format=json',
                    `&_t=${this.uniqueNumber}`
                ].join('');
                const request = createRequest('get', `${this.sdataUrl}${sdataQuery}`, null);
                return this.widgetContext.executeIonApiAsync(request)
                    .then((response: any) => {
                        this.userNotification = response.data;
                    })
                    .catch((reason: any) => {
                        lm.Log.error(reason);
                    });
            });
    }

    accetptActivity(activityId: string): ng.IPromise<any> {
        return this.getUserNotificationObject(activityId)
            .then(() => {
                var uniqueVal = Math.random().toString();
                var payload = {
                    "$name": "Accept",
                    "request": {
                        "entity": this.userNotification,
                        "UserNotificationId": this.userNotificationId
                    }
                };
                const sdataQuery = [
                    '/sdata/slx/dynamic/-/usernotifications/%24service/accept?_compact=true&format=json',
                    `&_t=${this.uniqueNumber}`
                ].join('');
                const request = createRequest('post', `${this.sdataUrl}${sdataQuery}`, payload);

                return this.widgetContext.executeIonApiAsync(request);
            });
    }

    declineActivity(activityId: string): ng.IPromise<any> {
        return this.getUserNotificationObject(activityId)
            .then(() => {
                var uniqueVal = Math.random().toString();
                var payload = {
                    "$name": "Decline",
                    "request": {
                        "entity": this.userNotification,
                        "UserNotificationId": this.userNotificationId
                    }
                };
                const sdataQuery = [
                    '/sdata/slx/dynamic/-/usernotifications/%24service/decline?_compact=true&format=json',
                    `&_t=${this.uniqueNumber}`
                ].join('');
                const request = createRequest('post', `${this.sdataUrl}${sdataQuery}`, payload);

                return this.widgetContext.executeIonApiAsync(request);
            });
    }

    deleteActivity(activityId: string): ng.IPromise<any> {
        const sdataQuery = `/sdata/slx/system/-/activities('${activityId}')?_compact=true&format=json&_t=${this.uniqueNumber}`;
        const request = createRequest('delete', `${this.sdataUrl}${sdataQuery}`, null);
        return this.widgetContext.executeIonApiAsync(request);
    }
    
}

export function createRequest(verb: string, url: string, data: any): lm.IIonApiRequestOptions {
    const request: lm.IIonApiRequestOptions = {
        method: verb,
        url: url,
        cache: false,
        data: data,
        headers: {
            Accept: 'application/json'
        }
    }

    return request;
}

// Not able to register constants or values - this is a workaround.
export const activityConstants = {
    limitCount: 'limitCount'
}