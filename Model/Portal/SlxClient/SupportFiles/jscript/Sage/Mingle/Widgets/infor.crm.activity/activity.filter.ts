// Note: This should have been registered and injected as custom filter but because of the known lime limitation
// with custom filters, export class is the workaround
export interface IDateFromString {
    convertAndGetStatus(dateString: string);
}

export class DateFromString implements IDateFromString {

    convertAndGetStatus(dateString: string) {
        const dateValue = this.toDateFromString(dateString, true);
        const condition = this.getActivityCondition(dateValue);

        return { dateValue, condition };
    }

    private toDateFromString(value: any, useOffset: boolean): Date {
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

    private getActivityCondition(dateValue: Date): string {
        const dateNow = new Date();
        let condition: string;

        if (dateNow.toLocaleDateString() === dateValue.toLocaleDateString()) {
            condition = 'current';
        } else if (dateValue < dateNow) {
            condition = 'overdue';
        } else {
            condition = 'next';
        }

        return condition;
    }
}