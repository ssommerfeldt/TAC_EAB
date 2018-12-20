import lm = require('lime');

export function createRequest(verb: string, url: string): lm.IIonApiRequestOptions {
    const request: lm.IIonApiRequestOptions = {
        method: verb,
        url: url,
        cache: false,
        headers: {
            Accept: 'application/json'
        }
    }

    return request;
}

export function onRequestError(reason: any): void {
    const errorMsg: lm.IWidgetMessage = { message: this.localization.errorOccured, type: lm.WidgetMessageType.Error };
    this.widgetContext.showWidgetMessage(errorMsg);
    this.isBusy = false;
    lm.Log.error(`Failed to call ION API: ${reason}`);
}

export const constants = {
    limitCount: 'limitCount',
    applicationLogicalId: 'applicationLogicalId'
}