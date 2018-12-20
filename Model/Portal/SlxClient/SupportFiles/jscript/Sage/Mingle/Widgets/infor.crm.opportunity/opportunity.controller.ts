import { onRequestError, constants, toDateFromString } from './opportunity.common'
import { IOpportunityService } from './opportunity.service'
import { Opportunity, Quote, ControllerLocalization } from './opportunity.model';

import templateCache = require('./templateCache');
import lm = require('lime');

export class OpportunityController {
    private opportunities: Opportunity[] = [];
    private opportunitiesForSearch: Opportunity[] = [];
    private selectedOpportunity: Opportunity;
    private widgetContext: lm.IWidgetContext;
    private searchText: string;
    private isShowQuotes = false;
    private myOpporunitiesGroupId: string;
    private localization: ControllerLocalization;
    private searchPlaceholder: string;
    private limitCount: number;

    private set isBusy(value: boolean) {
        this.widgetContext.setState(value ? lm.WidgetState.busy : lm.WidgetState.running);
    }

    static $inject = [
        '$scope',
        'infor.crm.opportunity.OpportunityService'
    ];
    constructor(private scope: ng.IScope, private opportunityService: IOpportunityService) {
        this.widgetContext = scope[lm.WidgetConstants.widgetContextKey];
        this.opportunityService.widgetContext = this.widgetContext;
        this.searchText = '';
        this.limitCount = this.widgetContext.getSettings().get<number>('limitCount');
        if (!this.limitCount) {
            this.limitCount = 10;
        }

        this.getLocalization();
        this.initSettings();
        this.getCrmMyOpportunitiesGroup();
    }

    private getLocalization(): void {
        const language = this.widgetContext.getLanguage();
        this.localization = new ControllerLocalization(
            language.get('errorOccured'),
            language.get('viewGroup'),
            language.get('searchPlaceholder'),
            '< '+language.get('backToOpportunities'),
            language.get('description'),
            language.get('estimatedClose'),
            language.get('quote'),
            language.get('quotesCount')
        );
        this.searchPlaceholder = this.localization.searchPlaceholder;
    }

    private initSettings(): void {
        const widgetInstance = this.scope[lm.WidgetConstants.widgetInstanceKey];
        const viewGroupAction: lm.IWidgetAction = {
            execute: () => this.redirectToCrmMyOpportunities(),
            isEnabled: false,
            text: this.localization.viewGroup
        };
        angular.extend(widgetInstance.actions[0], viewGroupAction);
        widgetInstance.actions[0].isEnabled = true;
        // Callback triggered from Framework when settings are saved
        //widgetInstance.settingsSaved = () => this.getOpportunities();
        widgetInstance.settingsSaved = (saveArg: lm.IWidgetSettingsArg) => {
            this.limitCount = this.widgetContext.getSettings().get<number>('limitCount');
            this.getOpportunities(null);
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

    private getCrmMyOpportunitiesGroup(): void {
        this.opportunityService.getCrmMyOpportunitiesGroup(this.limitCount)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                this.myOpporunitiesGroupId = response.data.$resources[0].$key;
                this.getOpportunities(null);
            })
            .catch((reason: any) => {
                onRequestError.call(this, reason);
            });
    }

    private getOpportunities(searchText: string): void {
        this.isBusy = true;
        this.isShowQuotes = false;
        this.opportunityService.getOpportunities(this.myOpporunitiesGroupId, this.limitCount, searchText)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                const opportunities = response.data.$resources;
                this.opportunities = opportunities.map((opportunity, index) => {
                    return new Opportunity(
                        opportunity.OPPORTUNITYID,
                        opportunity.A2_ACCOUNT,
                        opportunity.DESCRIPTION,
                        toDateFromString(opportunity.ESTIMATEDCLOSE, true),
                        opportunity.A2_ACCOUNT.charAt(0),
                        this.getColor(index)
                    );
                });
                // Need to add this as work around since can't register a custom filter
                this.opportunitiesForSearch = this.opportunities;
                this.localization.searchPlaceholder = this.searchPlaceholder.replace(/#/g, this.opportunities.length.toString());
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

    private searchOpportunities(): void {
        this.getOpportunities(this.searchText.toUpperCase());
    }

    private redirectToCrmMyOpportunities(): void {
        this.widgetContext.launch({
            url: this.composeUrl('Opportunity')(),
            resolve: true
        });
    }

    private onSelectAccount(): void {
        this.widgetContext.launch({
            url: this.composeUrl('Opportunity')(this.selectedOpportunity.key),
            resolve: true
        });
    }

    private onSelectQuote(quote: Quote): void {
        this.widgetContext.launch({
            url: this.composeUrl('Quote')(quote.key),
            resolve: true
        });
    }

    private composeUrl = viewId => (entityId = '') =>
        `?LogicalId=${this.widgetContext.getSettings().get<string>(constants.applicationLogicalId) || 'lid://infor.crm'}&ViewId=${viewId}&GroupId=${this.myOpporunitiesGroupId}${entityId ? `&EntityId=${entityId}` : ''}`;

    private onSelectOpportunity(opportunity: Opportunity): void {
        this.selectedOpportunity = opportunity;
        if (!this.selectedOpportunity.quotes) {
            this.isBusy = true;
            this.opportunityService.getQuotes(this.selectedOpportunity.key)
                .then(response => {
                    const quotes: any[] = response.data.$resources;
                    this.selectedOpportunity.quotes = quotes.map(quote => {
                        return new Quote(
                            quote.$key,
                            quote.QuoteNumber,
                            quote.GrandTotal
                        );
                    });
                    this.isShowQuotes = true;
                    this.isBusy = false;
                })
                .catch(reason => {
                    onRequestError.call(this, reason);
                });
            return;
        }
        this.isShowQuotes = true;
    }

    private onBack(): void {
        this.isShowQuotes = false;
    }
}