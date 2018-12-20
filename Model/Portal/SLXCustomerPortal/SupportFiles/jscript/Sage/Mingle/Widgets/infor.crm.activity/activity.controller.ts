import { IActivityService } from './activity.service';
import { IDateFromString, DateFromString } from './activity.filter';
import { IActivity } from './activity.model';

import templateCache = require('./templateCache');
import lm = require('lime');

export class ActivityController {
    private activities: IActivity[] = [];
    private widgetContext: lm.IWidgetContext;
    private widgetSettings: lm.IWidgetSettings;
    private language: lm.ILanguage;
    private dateFromString: IDateFromString;
    private selectedActivity: IActivity;
    private selectedSort: string;
    private selectedFilter: string;
    private firstActionText: string;
    private secondActionText: string;
    private showAcceptDecline: Boolean;
    private showCompleteDelete: Boolean;
    private showNowAsScheduled: Boolean;
    private myActivitiesText: string;
    private allOpenText: string;
    private pastDueText: string;
    private sortbyText: string;
    private dueDateText: string;
    private typeText: string;
    private destcriptionText: string;
    private filterByText: string;
    private selectedFilterText: string;
    private totalResults: number;
    private lblAccept: string;
    private lblDecline: string;
    private lblComplete: string;
    private lblDelete: string;
    private lblNow: string;
    private lblAsScheduled: string;
    private limitCount: number;
    private myDynamicClass: string;
    private widgetInstanceId: string;

    private set isBusy(value: boolean) {
        this.widgetContext.setState(value ? lm.WidgetState.busy : lm.WidgetState.running);
    }

    static $inject = [
        '$scope',
        'infor.crm.ActivityService'
    ];
    constructor(
        private scope: ng.IScope,
        private activityService: IActivityService) {

        this.widgetContext = scope[lm.WidgetConstants.widgetContextKey];
        this.widgetSettings = this.widgetContext.getSettings();
        this.language = this.widgetContext.getLanguage();
        this.activityService.widgetContext = this.widgetContext;
        this.dateFromString = new DateFromString();
        this.showAcceptDecline = false;
        this.showCompleteDelete = false;
        this.showNowAsScheduled = false;
        this.myDynamicClass = "infor-crm-activity-main-list-view";

        //Labels text
        this.myActivitiesText = this.language.get("myActivitiesText");
        this.allOpenText = this.language.get("allOpenText");
        this.pastDueText = this.language.get("pastDueText");
        this.sortbyText = this.language.get("sortbyText");
        this.dueDateText = this.language.get("dueDateText");
        this.typeText = this.language.get("typeText");
        this.destcriptionText = this.language.get("destcriptionText");
        this.filterByText = this.language.get("filterByText");
        this.lblAccept = this.language.get("lblAccept");
        this.lblDecline = this.language.get("lblDecline");
        this.lblComplete = this.language.get("lblComplete");
        this.lblDelete = this.language.get("lblDelete");
        this.lblNow = this.language.get("lblNow");
        this.lblAsScheduled = this.language.get("lblAsScheduled");

        this.limitCount = this.widgetContext.getSettings().get<number>('limitCount');
        if (!this.limitCount) {
            this.limitCount = 10;
        }

        this.widgetInstanceId = this.widgetContext.getWidgetInstanceId();

        this.initSettings();
        this[this.selectedFilter]();
    }

    private initSettings(): void {
        this.selectedSort = localStorage.getItem(this.widgetInstanceId + 'selectedSort');
        if (!this.selectedSort) {
            this.selectedSort = 'startDate';
            localStorage.setItem(this.widgetInstanceId + 'selectedSort', this.selectedSort);
        }
        this.selectedFilter = localStorage.getItem(this.widgetInstanceId + 'selectedFilter');
        if (!this.selectedFilter) {
            this.selectedFilter = 'getMyActivities';
            localStorage.setItem(this.widgetInstanceId + 'selectedFilter', this.selectedFilter);
        }

        const widgetInstance = this.scope[lm.WidgetConstants.widgetInstanceKey];
        // Callback triggered from Framework when settings are saved
        widgetInstance.settingsSaved = (saveArg: lm.IWidgetSettingsArg) => {
            this.limitCount = this.widgetContext.getSettings().get<number>('limitCount');
            this[this.selectedFilter]();
        };
        widgetInstance.widgetSettingsFactory = (context: lm.IWidgetSettingsContext): lm.IWidgetSettingsInstance => {
            const instance: lm.IWidgetSettingsInstance = {};

            instance.angularConfig = {};
            if (this.widgetContext.isDev()) {
                instance.angularConfig.relativeTemplateUrl = 'settings.html';
                instance.angularConfig.scopeValue = {
                    name: 'settingsData',
                    value: {
                        settingsContext: context,
                        settingsInstance: instance
                    }
                };
            } else {
                instance.angularConfig.templates = templateCache.getTemplates(context.getWidgetContext().getAngularContext());
                instance.angularConfig.cachedTemplateUrl = instance.angularConfig.templates[0].key;
                instance.angularConfig.scopeValue = {
                    name: 'settingsData',
                    value: {
                        settingsContext: context,
                        settingsInstance: instance
                    }
                };
            }

            return instance;
        }
    }

    private getMyActivities(): void {
        this.isBusy = true;
        this.selectedFilterText = this.myActivitiesText;
        this.activityService.getMyActivities(this.limitCount)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.totalResults = response.data.$totalResults;
                this.onGetCompleted(response.data.$resources);
            })
            .catch((reason: any) => {
                this.onRequestError(reason);
            });
    }

    private getOverdueActivities(): void {
        this.isBusy = true;
        this.selectedFilterText = this.pastDueText;
        this.activityService.getOverdueActivities(this.limitCount)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.totalResults = response.data.$totalResults;
                this.onGetCompleted(response.data.$resources);
            })
            .catch((reason: any) => {
                this.onRequestError(reason);
            });
    }

    private getAllOpenActivities(): void {
        this.isBusy = true;
        this.selectedFilterText = this.allOpenText;
        this.activityService.getAllOpenActivities()
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.totalResults = response.data.$totalResults;
                this.onGetAllOpenActivitiesCompleted(response.data.$resources);
            })
            .catch((reason: any) => {
                this.onRequestError(reason);
            });
    }

    private onGetCompleted(activities: any): void {
        this.setActivities(activities);
        this.sortActivities();
        this.showAcceptDecline = false;
        this.showCompleteDelete = false;
        this.showNowAsScheduled = false;
        this.isBusy = false;
    }

    private onGetAllOpenActivitiesCompleted(activities: any[]): void {
        activities = activities.splice(0, this.limitCount);
        this.setAllOpenActivities(activities);
        this.sortActivities();
        this.showAcceptDecline = false;
        this.showCompleteDelete = false;
        this.showNowAsScheduled = false;
        this.isBusy = false;
    }

    private setActivities(activities: any[]): void {
        this.activities = activities.map(activity => {
            const { dateValue, condition } = this.dateFromString.convertAndGetStatus(activity.Activity.StartDate);

            return <IActivity>{
                key: activity.Activity.$key,
                type: activity.Activity.Type,
                description: activity.Activity.Description,
                startDate: dateValue,
                phoneNumber: activity.Activity.PhoneNumber ? activity.Activity.PhoneNumber : activity.Activity.Location ? activity.Activity.Location : activity.Activity.AccountName,
                location: activity.Activity.Location ? activity.Activity.Location : activity.Activity.AccountName,
                priority: activity.Activity.Priority,
                condition: condition,
                recurrenceState: activity.Activity.RecurrenceState,
                status: activity.Status,
                data: activity.Activity
            };
        });
    }

    private setAllOpenActivities(activities: any[]): void {
        this.activities = activities.map(activity => {
            const { dateValue, condition } = this.dateFromString.convertAndGetStatus(activity.StartDate);

            return <IActivity>{
                key: activity.$key,
                type: activity.Type,
                description: activity.Description,
                startDate: dateValue,
                phoneNumber: activity.PhoneNumber ? activity.PhoneNumber : activity.Location ? activity.Location : activity.AccountName,
                location: activity.Location ? activity.Location : activity.AccountName,
                priority: activity.Priority,
                condition: condition,
                recurrenceState: activity.RecurrenceState,
                status: activity.Status,
                data: activity
            };
        });
    }

    private sortActivities(): void {
        const isSortByDate = this.selectedSort.toUpperCase().indexOf('DATE') > -1;
        this.activities.sort((a1: any, a2: any) => {
            if (isSortByDate) {
                return (a2[this.selectedSort] - a1[this.selectedSort]); // Sort date in descending order
            }
            const activity1 = a1[this.selectedSort].toUpperCase();
            const activity2 = a2[this.selectedSort].toUpperCase();
            let result = 0;
            if (activity1 > activity2) {
                result = 1;
            } else if (activity1 < activity2) {
                result = -1;
            }

            return result;
        });
    }

    private onSelectActivity(activity: IActivity): void {
        if (activity.status === "asUnconfirmed") {
            this.showAcceptDecline = true;
            this.showCompleteDelete = false;
            this.showNowAsScheduled = false;
        }
        else {
            this.showCompleteDelete = true;
            this.showAcceptDecline = false;
            this.showNowAsScheduled = false;
        }

        if (activity === this.selectedActivity) {
            this.myDynamicClass = "infor-crm-activity-main-list-view";
            this.selectedActivity = null;
            return;
        }
        this.myDynamicClass = "infor-crm-activity-main-list-view-with-toolbar";
        this.selectedActivity = activity;
    }

    private onAccept(): void {
        const index = this.activities.indexOf(this.selectedActivity);
        this.activityService.accetptActivity(this.selectedActivity.key)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.onActionSuccess();
                //this.getMyActivities();
                this[this.selectedFilter]();
                this.myDynamicClass = "infor-crm-activity-main-list-view";
            })
            .catch((reason: any) => {
                this.onRequestError(reason);
            });
    }
    private onDecline(): void {
        const index = this.activities.indexOf(this.selectedActivity);
        this.activityService.declineActivity(this.selectedActivity.key)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.onActionSuccess();
                this[this.selectedFilter]();
                this.myDynamicClass = "infor-crm-activity-main-list-view";
            })
            .catch((reason: any) => {
                this.onRequestError(reason);
            });
    }
    private onComplete(): void {
        this.showCompleteDelete = false;
        this.showNowAsScheduled = true;
    }
    private onCompleteNow(): void {
        const index = this.activities.indexOf(this.selectedActivity);
        this.activityService.completeActivityNow(this.activities[index].data)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.onActionSuccess();
                this[this.selectedFilter]();
                this.myDynamicClass = "infor-crm-activity-main-list-view";
            })
            .catch((reason: any) => {
                this.onRequestError(reason);
            });
    }
    private onCompleteScheduled(): void {
        const index = this.activities.indexOf(this.selectedActivity);
        this.activityService.completeActivityAsScheduled(this.activities[index].data)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.onActionSuccess();
                this[this.selectedFilter]();
                this.myDynamicClass = "infor-crm-activity-main-list-view";
            })
            .catch((reason: any) => {
                this.onRequestError(reason);
            });
    }
    private onDelete(): void {
        const index = this.activities.indexOf(this.selectedActivity);
        this.activityService.deleteActivity(this.selectedActivity.key)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.onActionSuccess();
                this[this.selectedFilter]();
                this.myDynamicClass = "infor-crm-activity-main-list-view";
            })
            .catch((reason: any) => {
                this.onRequestError(reason);
            });
    }
    
    private onSelectSort(selectedSort: string): void {
        if (this.selectedSort === selectedSort) {
            return;
        }
        this.selectedSort = selectedSort;
        localStorage.setItem(this.widgetInstanceId + 'selectedSort', this.selectedSort);
        this.sortActivities();
    }

    private onSelectFilter(selectedFilter: string): void {
        if (this.selectedFilter === selectedFilter) {
            return;
        }
        this.selectedFilter = selectedFilter;
        localStorage.setItem(this.widgetInstanceId + 'selectedFilter', this.selectedFilter);
        this[this.selectedFilter]();
    }

    private onActionSuccess(): void {
        var successMsg: lm.IWidgetMessage = { message: this.language.get('actionSuccess'), type: lm.WidgetMessageType.Info };
        this.widgetContext.showWidgetMessage(successMsg);
        this.isBusy = false;
    }

    private onRequestError(reason: any): void {
        var message = this.language.get('errorOccured');
        if (reason.data && reason.data[0] && reason.data[0].message && reason.data[0].message.indexOf("Sage.SalesLogix") == -1) {
            message = reason.data[0].message;
        }
        var errorMsg: lm.IWidgetMessage = { message: message, type: lm.WidgetMessageType.Error };
        this.widgetContext.showWidgetMessage(errorMsg);
        this.isBusy = false;
        lm.Log.error('Failed to call ION API: ' + reason);
    }
}