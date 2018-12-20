import lm = require('lime');

export function createRequest(verb: string, url: string): lm.IIonApiRequestOptions {
    const request: lm.IIonApiRequestOptions = {
        method: verb,
        url,
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

export function toDateFromString(value: any, useOffset: boolean): Date {
    if (!value) return null;

    const
        trueRE = /^(true|T)$/i,
        isoDate = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|(-|\+)(\d{2}):(\d{2}))/,
        isoDateOnly = /^(\d{4})-(\d{2})-(\d{2})$/,
        jsonDate = /\/Date\((-?\d+)(?:(-|\+)(\d{2})(\d{2}))?\)\//,
        pad = function (n) { return n < 10 ? '0' + n : n; },
        unpad = function (str) { return (str[0] === '0') ? str.substring(1) : str; };

    if (typeof value !== 'string') {
        return value;
    }

    let match,
        utc,
        h,
        m,
        offset;

    if ((match = jsonDate.exec(value))) {
        utc = new Date(parseInt(match[1], 10));
        if (useOffset) {
            if (match[2]) {
                h = parseInt(match[3], 10);
                m = parseInt(match[4], 10);

                offset = (h * 60) + m;

                if (match[2] === '-') {
                    offset = -1 * offset;
                }
                utc.setMinutes(utc.getMinutes() + offset);
            }
        }
        value = utc;
    } else if ((match = isoDate.exec(value))) {
        utc = new Date(Date.UTC(
            parseInt(match[1], 10),
            parseInt(unpad(match[2]), 10) - 1, // zero based
            parseInt(unpad(match[3]), 10),
            parseInt(unpad(match[4]), 10),
            parseInt(unpad(match[5]), 10),
            parseInt(unpad(match[6]), 10)
        ));

        if (match[8] !== 'Z') {
            h = parseInt(match[10], 10);
            m = parseInt(match[11], 10);
            offset = (h * 60) + m;
            if (match[9] === '-') {
                offset = -1 * offset;
            }
            utc.setMinutes(utc.getMinutes() + offset);
        }

        value = utc;
    } else if ((match = isoDateOnly.exec(value))) {
        value = new Date();
        value.setYear(parseInt(match[1], 10));
        value.setMonth(parseInt(match[2], 10) - 1);
        value.setDate(parseInt(match[3], 10));
        value.setHours(0, 0, 0, 0);
    }

    return value;
}