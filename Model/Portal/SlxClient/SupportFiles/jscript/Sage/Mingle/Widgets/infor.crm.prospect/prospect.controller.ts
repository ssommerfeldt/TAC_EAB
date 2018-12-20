import { onRequestError, constants } from './prospect.common';
import { IProspect } from './prospect.model';
import { IProspectService } from './prospect.service';

import templateCache = require('./templateCache');
import lm = require('lime');

export class ProspectController {
    private prospects: IProspect[] = [];
    private prospectsForSearch: IProspect[] = [];
    private widgetContext: lm.IWidgetContext;
    private searchText: string;
    private myProspectGroupId: string;
    private localization: any = {};
    private limitCount: number;

    private set isBusy(value: boolean) {
        this.widgetContext.setState(value ? lm.WidgetState.busy : lm.WidgetState.running);
    }

    static $inject = [
        '$scope',
        'infor.crm.prospect.ProspectService'
    ];
    constructor(private scope: ng.IScope, private prospectService: IProspectService) {
        this.widgetContext = scope[lm.WidgetConstants.widgetContextKey];
        this.prospectService.widgetContext = this.widgetContext;
        this.searchText = '';
        this.limitCount = this.widgetContext.getSettings().get<number>('limitCount');
        if (!this.limitCount) {
            this.limitCount = 10;
        }

        this.getLocalization();
        this.initSettings();
        this.getCrmMyProspectsGroup();
        this.getProspects(null);
    }

    getLocalization(): void {
        const language = this.widgetContext.getLanguage();
        this.localization = {
            errorOccured: language.get('errorOccured'),
            viewGroup: language.get('viewGroup'),
            searchPlaceholder: language.get('searchPlaceholder')
        };
    }

    private initSettings(): void {
        const widgetInstance = this.scope[lm.WidgetConstants.widgetInstanceKey];
        const viewGroupAction: lm.IWidgetAction = {
            execute: () => this.redirectToCrmMyProspects(),
            isEnabled: false,
            text: this.localization.viewGroup
        };
        angular.extend(widgetInstance.actions[0], viewGroupAction);
        widgetInstance.actions[0].isEnabled = true;
        // Callback triggered from Framework when settings are saved
        widgetInstance.settingsSaved = (saveArg: lm.IWidgetSettingsArg) => {
            this.limitCount = this.widgetContext.getSettings().get<number>('limitCount');
            this.getProspects(null);
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

    private getCrmMyProspectsGroup() {
        this.prospectService.getCrmMyProspectsGroup(this.limitCount)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.myProspectGroupId = response.data.$resources[0].$key;
            })
            .catch((reason: any) => {
                onRequestError.call(this, reason);
            });
    }

    private getProspects(searchText: string): void {
        this.isBusy = true;
        this.prospectService.getProspects(this.limitCount, searchText)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                const prospects = response.data.$resources;
                this.prospects = prospects.map((prospect, index) => {
                    return <IProspect>{
                        key: prospect.$key,
                        accountName: prospect.AccountName,
                        badge: prospect.AccountName.charAt(0),
                        color: this.getColor(index),
                        businessDescription: prospect.BusinessDescription,
                        city: prospect.Addresses.$resources[0].City,
                        country: prospect.Addresses.$resources[0].Country,
                        phone: this.unformatPhoneNumber(prospect.MainPhone)
                    };
                });
                // Need to add this as work around since can't register a custom filter
                this.prospectsForSearch = this.prospects;
                this.isBusy = false;
            })
            .catch((reason: any) => {
                this.isBusy = false;
                onRequestError.call(this, reason);
            });
    }

    private getColor(index: number) {
        var colorRange = ['#3084bc', '#398f81', '#8a62b3', '#7b7b7b', '#ad7d0c', '#59873c', '#7e7e7e',
            '#2886b5', '#2886b5', '#307c76', '#d63939', '#7b7b7b', '#45851f', '#8a62b3',
            '#2e83b3', '#2e83b3', '#538d2c', '#437972', '#c4631d', '#7e7e7e'];
        if (index > 20)
            index = index % 20;
        return colorRange[index];
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

    private formatStringWithValues(args: any): string {
        var s = args[0];
        for (var i = 0; i < args.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, args[i + 1]);
        }
        return s;
    }

    private searchProspects(): void {
        this.getProspects(this.searchText.toUpperCase());
    }

    private onSelectProspect(prospect: IProspect): void {
        this.widgetContext.launch({
            url: this.createUrl() + `&EntityId=${prospect.key}`,
            resolve: true
        });
    }

    private redirectToCrmMyProspects(): void {
        this.widgetContext.launch({
            url: this.createUrl(),
            resolve: true
        });
    }

    private createUrl(): string {
        return `?LogicalId=${this.widgetContext.getSettings().get<string>(constants.applicationLogicalId) ||'lid://infor.crm'}&ViewId=Account&GroupId=${this.myProspectGroupId}`;
    }
}