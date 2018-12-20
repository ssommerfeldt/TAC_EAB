import { onRequestError, constants, toDateFromString } from './contract.common'
import { contractConstants } from './contract.service';
import { IContractService } from './contract.service';
import lm = require('lime');

export class ContractSettingController {
    private limitCount: number;
    private titleText: string;
    private limitText: string;
    private lblGroup: string;
    private lblLogicalId: string;
    private language: lm.ILanguage;
    private widgetContext: lm.IWidgetContext;
    private groupOptions: string[];
    private groupValue: any;
    private isGroupBusy: Boolean;
    private logicalId: string;
    private maskCustDefOptions: any;

    private widgetTitle: string;
    private isTitleEditEnabled: boolean;
    private isTitleUnlockable: boolean;
    private isTitleLocked: boolean;

    private isLimitCountVisible: boolean;
    private isLimitCountEnabled: boolean;

    static $inject = ['$scope', 'infor.crm.contract.ContractService'];
    constructor(private scope: ng.IScope, private contractService: IContractService) {
        const settingsInstance: lm.IWidgetSettingsInstance = scope['settingsData'].settingsInstance;
        const settingsContext: lm.IWidgetSettingsContext = scope['settingsData'].settingsContext;
        this.widgetContext = settingsContext.getWidgetContext();
        this.language = this.widgetContext.getLanguage();
        this.contractService.widgetContext = this.widgetContext;

        //Labels text
        this.titleText = this.language.get("titleText");
        this.limitText = this.language.get("limitText");
        this.lblGroup = this.language.get("lblGroup");
        this.lblLogicalId = this.language.get("lblLogicalId");

        this.isTitleEditEnabled = this.widgetContext.isTitleEditEnabled();
        this.isTitleLocked = this.widgetContext.isTitleLocked();
        this.widgetTitle = this.widgetContext.getResolvedTitle(this.isTitleLocked);
        this.isTitleUnlockable = this.widgetContext.isTitleUnlockable();

        var settings = this.widgetContext.getSettings();
        this.isLimitCountVisible = settings.isSettingVisible("limitCount")
        this.isLimitCountEnabled = settings.isSettingEnabled("limitCount");

        this.limitCount = settings.get<number>(contractConstants.limitCount);
        if (!this.limitCount) {
            this.limitCount = 10;
        }
        this.logicalId = settings.get<string>(constants.applicationLogicalId);
        if (!this.logicalId) {
            this.logicalId = 'lid://infor.crm';
        }

        this.maskCustDefOptions = {
            mode: "number",
            pattern: "&##",
            definitions: {
                "&": /[1-9]/,
                "#": /[0-9]/
            }
        };

        this.getGroups();
        settingsInstance.closing = (arg: lm.IWidgetSettingsCloseArg) => {
            if (!arg.isSave) {
                return;
            }
            this.widgetContext.setTitleLocked(this.isTitleLocked);
            if (this.isTitleEditEnabled) {
                this.widgetContext.setTitle(this.widgetTitle);
            }
            if (this.isLimitCountEnabled) {
                settings.set(constants.limitCount, this.limitCount);
            }
            settings.set("group", this.groupValue.key);
            settings.set(constants.applicationLogicalId, this.logicalId);
            
        };
    }

    private onClickIsLocked(): void {
        this.isTitleLocked = !this.isTitleLocked;
        if (this.isTitleLocked) {
            this.widgetTitle = this.widgetContext.getResolvedTitle(this.isTitleLocked);
        }
    }

    private getGroups(): void {
        this.isGroupBusy = true;
        this.contractService.getContractGroups()
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                const data = response.data.$resources;
                var options = [], item, i;
                for (i = 0; i < data.length; i++) {
                    item = { 'name': data[i].name, 'key': data[i].$key };
                    options.push(item);
                }
                this.groupOptions = options;

                var groupVal = this.widgetContext.getSettings().get("group");
                if (groupVal) {
                    for (i = 0; i < options.length; i++) {
                        if (groupVal === options[i].key) {
                            this.groupValue = options[i];
                        }
                    }
                }
                if (!this.groupValue) {
                    this.groupValue = options[0];
                }
                this.isGroupBusy = false;
            })
            .catch((reason: any) => {
                this.isGroupBusy = false;
                onRequestError.call(this, reason);
            });
    }
}