export class Opportunity {
    key: string;
    description: string;
    account: string;
    estimatedClose: Date;
    badge: string;
    color: string;
    quotes: Quote[];

    constructor(
        key: string,
        description: string,
        account: string,
        estimatedClose: Date,
        badge: string,
        color: string,
        quotes?: Quote[]) {

        this.key = key;
        this.description = description;
        this.account = account;
        this.estimatedClose = estimatedClose;
        this.badge = badge;
        this.color = color;
        this.quotes = quotes;
    }
}

export class Quote {
    key: string;
    quoteNumber: string;
    grandTotal: number;

    constructor(key: string, quoteNumber: string, grandTotal: number) {
        this.key = key;
        this.quoteNumber = quoteNumber;
        this.grandTotal = grandTotal;
    }

}

export class ControllerLocalization {
    errorOccured: string;
    viewGroup: string;
    searchPlaceholder: string;
    backToOpportunities: string;
    description: string;
    estimatedClose: string;
    quote: string;
    quotesCount: string;

    constructor(
        errorOccured: string,
        viewGroup: string,
        searchPlaceholder: string,
        backToOpportunities: string,
        description: string,
        estimatedClose: string,
        quote: string,
        quotesCount: string) {

        this.errorOccured = errorOccured;
        this.viewGroup = viewGroup;
        this.searchPlaceholder = searchPlaceholder;
        this.backToOpportunities = backToOpportunities;
        this.description = description;
        this.estimatedClose = estimatedClose;
        this.quote = quote;
        this.quotesCount = quotesCount;
    }
}

export class SettingLocalization {
    title: string;
    limitCount: string;
    crmLogicalId: string;

    constructor(
        title: string,
        limitCount: string,
        crmLogicalId: string) {

        this.title = title;
        this.limitCount = limitCount;
        this.crmLogicalId = crmLogicalId;
    }
}