import { constants } from './prospect.common';
import lm = require('lime');

export class ProspectSettingController {
    private widgetContext: lm.IWidgetContext;
    private limitCount: number;
    private applicationLogicalId: string;
    private localization: any = {};
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

    private initSettings() {
        const settingsInstance: lm.IWidgetSettingsInstance = this.scope['settingsData'].settingsInstance;

        this.widgetTitle = this.widgetContext.getTitle() || this.widgetContext.getStandardTitle();
        if (this.widgetContext.isTitleUnlockable()) {
            this.widgetContext.setTitleLocked(false);
        }

        var settings = this.widgetContext.getSettings();
        this.isLimitCountVisible = settings.isSettingVisible("limitCount")
        this.isLimitCountEnabled = settings.isSettingEnabled("limitCount");
        
        this.isTitleEditEnabled = this.widgetContext.isTitleEditEnabled() && !this.widgetContext.isTitleLocked();
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
            //settings.set(constants.limitCount, this.limitCount);
            settings.set(constants.applicationLogicalId, this.applicationLogicalId);
        };
    }

    private getLocalization() {
        const language = this.widgetContext.getLanguage();
        this.localization = {
            settingTitle: language.get('settingTitle'),
            settingLimit: language.get('settingLimit'),
            settingCrmLogicalId: language.get('settingCrmLogicalId')
        };
    }

    private onClickIsLocked(): void {
        this.isTitleLocked = !this.isTitleLocked;
        if (this.isTitleLocked) {
            this.widgetTitle = this.widgetContext.getResolvedTitle(this.isTitleLocked);
        }
    }
}