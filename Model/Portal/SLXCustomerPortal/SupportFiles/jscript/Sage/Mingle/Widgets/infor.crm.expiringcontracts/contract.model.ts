export interface IContract {
    key: string;
    accountId: string;
    description: string;
    account: string;
    badge: string;
    estimatedClose: Date;
    PONumber: number;
    Amount: any;
    TypeCodeText: string;
    contacts: IContact[];
    street: string;
    city: string;
    country: string;
    mainPhone: string;
    color: string;
    owner: string;
}

export interface IContact {
    key: string;
    name: string;
    phone: string;
    mail: string;
    title: string;
}