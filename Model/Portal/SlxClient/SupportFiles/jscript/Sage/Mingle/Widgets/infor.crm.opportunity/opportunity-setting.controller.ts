import { constants } from './opportunity.common';
import { SettingLocalization } from './opportunity.model';
import lm = require('lime');

export class OpportunitySettingController {
    private widgetContext: lm.IWidgetContext;
    private limitCount: number;
    private applicationLogicalId: string;
    private localization: SettingLocalization;
    private maskCustDefOptions: any;

    private widgetTitle: string;
    private isTitleEditEnabled: boolean;
    private isTitleUnlockable: boolean;
    private isTitleLocked: boolean;

    private isLimitCountVisible: boolean;
    private isLimitCountEnabled: boolean;

    static $inject = ['$scope'];
    constructor(private scope: ng.IScope) {
        const settingsContext: lm.IWidgetSettingsContext = scope['settingsData'].settingsContext;
        this.widgetContext = settingsContext.getWidgetContext();

        this.isTitleEditEnabled = this.widgetContext.isTitleEditEnabled();
        this.isTitleLocked = this.widgetContext.isTitleLocked();
        this.widgetTitle = this.widgetContext.getResolvedTitle(this.isTitleLocked);
        this.isTitleUnlockable = this.widgetContext.isTitleUnlockable();

	this.maskCustDefOptions = {
                mode: "number",
                pattern: "&##",
                definitions: {
                    "&": /[1-9]/,
                    "#": /[0-9]/
                }
            };
        this.initSettings();
        this.getLocalization();
    }

    private initSettings(): void {
        const settingsInstance: lm.IWidgetSettingsInstance = this.scope['settingsData'].settingsInstance;

        var settings = this.widgetContext.getSettings();
        this.isLimitCountVisible = settings.isSettingVisible("limitCount")
        this.isLimitCountEnabled = settings.isSettingEnabled("limitCount");

        this.limitCount = settings.get<number>(constants.limitCount);
        if (!this.limitCount) {
            this.limitCount = 10;
            settings.set(constants.limitCount, 10);
        }
        this.applicationLogicalId = settings.get<string>(constants.applicationLogicalId) || 'lid://infor.crm';

        settingsInstance.closing = (arg: lm.IWidgetSettingsCloseArg) => {
            if (!arg.isSave) {
                return;
            }
            this.widgetContext.setTitleLocked(this.isTitleLocked);
            if (this.isTitleEditEnabled) {
                this.widgetContext.setTitle(this.widgetTitle);
            }

            if (this.isLimitCountEnabled) {
                this.widgetContext.getSettings().set(constants.limitCount, this.limitCount);
            }

            this.widgetContext.getSettings().set(constants.applicationLogicalId, this.applicationLogicalId);
            if (this.isTitleEditEnabled) {
                this.widgetContext.setTitle(this.widgetTitle);
            }
        };
    }

    private onClickIsLocked(): void {
        this.isTitleLocked = !this.isTitleLocked;
        if (this.isTitleLocked) {
            this.widgetTitle = this.widgetContext.getResolvedTitle(this.isTitleLocked);
        }
    }

    private getLocalization(): void {
        const language = this.widgetContext.getLanguage();
        this.localization = new SettingLocalization(
            language.get('settingTitle'),
            language.get('settingLimit'),
            language.get('settingCrmLogicalId')
        );
    }
}