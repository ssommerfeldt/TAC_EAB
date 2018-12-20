import { onRequestError, constants, toDateFromString } from './contract.common'
import { IContractService } from './contract.service'
import { IContract, IContact } from './contract.model';

import templateCache = require('./templateCache');
import lm = require('lime');

export class ContractController {
    private contracts: IContract[] = [];
    private contractsForSearch: IContract[] = [];
    private selectedContract: IContract;
    private widgetContext: lm.IWidgetContext;
    private searchText: string;
    private isShowContacts = false;
    private myOpporunitiesGroupId: string;
    private localization: any = {};
    private language: lm.ILanguage;
    private accountKey: string;
    //Labels
    private lblBackToList: string;
    private lblExpirationDate: string;
    private lblAmount: string;
    private lblType: string;
    private lblContacts: string;
    private lblReference: string;
    private lblOwner: string;
    private lblExpDate: string;
    private lblDesc: string;
    private searchPlaceholder: string;

    private set isBusy(value: boolean) {
        this.widgetContext.setState(value ? lm.WidgetState.busy : lm.WidgetState.running);
    }

    static $inject = [
        '$scope',
        'infor.crm.contract.ContractService'
    ];
    constructor(private scope: ng.IScope, private contractService: IContractService) {
        this.widgetContext = scope[lm.WidgetConstants.widgetContextKey];
        this.contractService.widgetContext = this.widgetContext;
        this.language = this.widgetContext.getLanguage();
        this.searchText = '';
        //Labels text
        this.lblBackToList = '< ' + this.language.get("lblBackToList");
        this.lblExpirationDate = this.language.get("lblExpirationDate");
        this.lblAmount = this.language.get("lblAmount");
        this.lblType = this.language.get("lblType");
        this.lblContacts = this.language.get("lblContacts");
        this.lblReference = this.language.get("lblReference");
        this.lblOwner = this.language.get("lblOwner");
        this.lblExpDate = this.language.get("lblExpDate");
        this.lblDesc = this.language.get("lblDesc");
        this.searchPlaceholder = this.language.get("searchPlaceholder");

        this.getLocalization();
        this.initSettings();
        this.getContracts(null);
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
            execute: () => this.redirectToCrmMyContracts(),
            isEnabled: false,
            text: this.localization.viewGroup
        };
        angular.extend(widgetInstance.actions[0], viewGroupAction);
        widgetInstance.actions[0].isEnabled = true;
        // Callback triggered from Framework when settings are saved
        widgetInstance.settingsSaved = () => this.getContracts(null);
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

    private getContracts(searchText: string): void {
        this.isBusy = true;
        var settings = this.widgetContext.getSettings();
        var group = settings.get<string>("group");
        if (!group) {
            return;
        }
        this.contractService.getContracts(group, searchText)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                const contracts = response.data.$resources;
                this.contracts = contracts.map((contract, index) => {
                    const estimatedClose = toDateFromString(contract.ENDINGDATE, true);
                    return <IContract>{
                        key: contract.CONTRACTID,
                        accountId: contract.A2_ACCOUNTID,
                        badge: contract.A2_ACCOUNT.charAt(0),
                        color: this.getColor(index),
                        account: contract.A2_ACCOUNT,
                        description: contract.SERVICECODETEXT,
                        estimatedClose: estimatedClose,
                        TypeCodeText: contract.TYPECODETEXT
                    };
                });
                // Need to add this as work around since can't register a custom filter
                this.contractsForSearch = this.contracts;
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

    private redirectToCrmMyContracts() {
        var settings = this.widgetContext.getSettings();
        const logicalId = settings.get<string>(constants.applicationLogicalId) || 'lid://infor.crm';
        const group = settings.get<string>("group");

        const unique = new Date().getTime().toString();
        const url = `?LogicalId=${logicalId}&ViewId=Contract&GroupId=${group}&_t=${unique}`;
        this.widgetContext.launch({
            url: url,
            resolve: true
        });
    }
    
    private drilldownContract(): void {
        var settings = this.widgetContext.getSettings();
        const logicalId = settings.get<string>(constants.applicationLogicalId) || 'lid://infor.crm';
        const group = settings.get<string>("group");
        var entityId = this.selectedContract.key;

        const unique = new Date().getTime().toString();
        const url = `?LogicalId=${logicalId}&ViewId=Contract&GroupId=${group}&EntityID=${entityId}&_t=${unique}`;
        this.widgetContext.launch({
            url: url,
            resolve: true
        });
    }

    private onSelectAccount(): void {
        var settings = this.widgetContext.getSettings();
        const logicalId = settings.get<string>(constants.applicationLogicalId) || 'lid://infor.crm';
        var entityId = this.accountKey;

        const unique = new Date().getTime().toString();
        const url = `?LogicalId=${logicalId}&ViewId=Account&EntityID=${entityId}&_t=${unique}`;
        this.widgetContext.launch({
            url: url,
            resolve: true
        });
    }

    private onSelectContact(contact: IContact): void {
        var settings = this.widgetContext.getSettings();
        const logicalId = settings.get<string>(constants.applicationLogicalId) || 'lid://infor.crm';
        const group = settings.get<string>("group");
        var entityId = contact.key;

        const unique = new Date().getTime().toString();
        const url = `?LogicalId=${logicalId}&ViewId=Contact&EntityID=${entityId}&_t=${unique}`;
        this.widgetContext.launch({
            url: url,
            resolve: true
        });
    }
    
    private searchOpporunities() {
        this.getContracts(this.searchText.toUpperCase());
    }

    private onSelectContract(contract: IContract) {
        this.selectedContract = contract;
        if (!this.selectedContract.contacts) {
            this.isBusy = true
            this.contractService.getContract(this.selectedContract.key)
                .then(response => {
                    var data = response.data;
                    this.accountKey = data.Account.$key;
                    var address = data.Account.Address;
                    this.selectedContract.PONumber = data.PONumber;
                    this.selectedContract.Amount = data.Amount;
                    this.selectedContract.street = address.StreetAddress;
                    this.selectedContract.city = address.City;
                    this.selectedContract.country = address.StreetAddress.Country;
                    this.selectedContract.mainPhone = data.Account.MainPhone;
                    this.selectedContract.owner = data.Owner.OwnerDescription;

                    this.isShowContacts = true;
                    this.isBusy = false;

                })
                .catch(reason => {
                    this.isBusy = false;
                    onRequestError.call(this, reason);
                });

            this.contractService.getContacts(this.selectedContract.accountId)
                .then(response => {
                    const contacts: any[] = response.data.$resources;
                    this.selectedContract.contacts = contacts.map(contact => {
                        return <IContact>{
                            key: contact.$key,
                            name: contact.NameLF,
                            phone: contact.WorkPhone,
                            mail: contact.Email,
                            title: contact.Title
                        };
                    });
                    this.isShowContacts = true;
                    this.isBusy = false;

                })
                .catch(reason => {
                    this.isBusy = false;
                    onRequestError.call(this, reason);
                });

            return;
        }
        this.isShowContacts = true;
    }

    private onBack() {
        this.isShowContacts = false;
    }
}