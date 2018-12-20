import { activityConstants } from './activity.service';
import lm = require('lime');

export class ActivitySettingController {
    private limitCount: number;
    private titleText: string;
    private limitText: string;
    private language: lm.ILanguage;
    private maskCustDefOptions: any;
    private widgetContext: lm.IWidgetContext;

    private widgetTitle: string;
    private isTitleEditEnabled: boolean;
    private isTitleUnlockable: boolean;
    private isTitleLocked: boolean;

    private isLimitCountVisible: boolean;
    private isLimitCountEnabled: boolean;

    static $inject = ['$scope'];
    constructor(private scope: ng.IScope) {
        const settingsInstance: lm.IWidgetSettingsInstance = scope['settingsData'].settingsInstance;
        const settingsContext: lm.IWidgetSettingsContext = scope['settingsData'].settingsContext;
        this.widgetContext = settingsContext.getWidgetContext();
        this.language = this.widgetContext.getLanguage();

        //Labels text
        this.titleText = this.language.get("titleText");
        this.limitText = this.language.get("limitText");

        this.isTitleEditEnabled = this.widgetContext.isTitleEditEnabled();
        this.isTitleLocked = this.widgetContext.isTitleLocked();
        this.widgetTitle = this.widgetContext.getResolvedTitle(this.isTitleLocked);
        this.isTitleUnlockable = this.widgetContext.isTitleUnlockable();
        
        var settings = this.widgetContext.getSettings();
        this.isLimitCountVisible = settings.isSettingVisible("limitCount")
        this.isLimitCountEnabled = settings.isSettingEnabled("limitCount");

        this.limitCount = settings.get<number>(activityConstants.limitCount);
        if (!this.limitCount) {
            this.limitCount = 10;
            settings.set(activityConstants.limitCount, 10);
        }
        this.maskCustDefOptions = {
            mode: "number",
            pattern: "&##",
            definitions: {
                "&": /[1-9]/,
                "#": /[0-9]/
            }
        };

        settingsInstance.closing = (arg: lm.IWidgetSettingsCloseArg) => {
            if (!arg.isSave) {
                return;
            }
            this.widgetContext.setTitleLocked(this.isTitleLocked);
            if (this.isTitleEditEnabled) {
                this.widgetContext.setTitle(this.widgetTitle);
            }
            if (this.isLimitCountEnabled) {
                this.widgetContext.getSettings().set(activityConstants.limitCount, this.limitCount);
            }
        };
    }

    private onClickIsLocked(): void {
        this.isTitleLocked = !this.isTitleLocked;
        if (this.isTitleLocked) {
            this.widgetTitle = this.widgetContext.getResolvedTitle(this.isTitleLocked);
        }
    }

}