import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import getResource from 'argos/I18n';

const resource = getResource('recurrence');
const dtFormatResource = getResource('recurrenceDateTimeFormat');

/**
 * @class crm.Recurrence
 *
 * @requires argos._ActionMixin
 * @requires argos._CustomizationMixin
 * @requires argos._Templated
 *
 */
const __class = lang.setObject('crm.Recurrence', {
  // Localization
  neverText: resource.neverText,
  daysText: resource.daysText,
  dailyText: resource.dailyText,
  weeksText: resource.weeksText,
  weeklyText: resource.weeklyText,
  weeklyOnText: resource.weeklyOnText, // eg. {weekly} on {friday}
  monthsText: resource.monthsText,
  monthlyText: resource.monthlyText,
  monthlyOnDayText: resource.monthlyOnDayText, // eg. {monthly} on day {15}
  monthlyOnText: resource.monthlyOnText, // eg. {monthly} on {second} {Monday}
  yearsText: resource.yearsText,
  yearlyText: resource.yearlyText,
  yearlyOnText: resource.yearlyOnText, // eg. {yearly} on {short_date}
  yearlyOnWeekdayText: resource.yearlyOnWeekdayText, // eg. {yearly} on {first} {Thursday} in {April}
  everyText: resource.everyText, // eg. every {2} {weeks}
  afterCompletionText: resource.afterCompletionText,
  untilEndDateText: resource.untilEndDateText, // eg. {daily} until {31/10/2012}
  dayFormatText: dtFormatResource.dayFormatText,
  monthFormatText: dtFormatResource.monthFormatText,
  monthAndDayFormatText: dtFormatResource.monthAndDayFormatText,
  weekdayFormatText: dtFormatResource.weekdayFormatText,
  endDateFormatText: dtFormatResource.endDateFormatText,
  weekDaysText: [
    resource.sunday,
    resource.monday,
    resource.tuesday,
    resource.wednesday,
    resource.thursday,
    resource.friday,
    resource.saturday,
  ],
  ordText: [
    resource.day,
    resource.first,
    resource.second,
    resource.third,
    resource.fourth,
    resource.last,
  ],

  interval: 1, // repeat every interval days/weeks/months/years
  defaultIterations: [ // by RecurPeriod, -1 for After Completed. Configurable.
    7, // days
    -1,
    8, // weeks
    -1,
    12, // months
    12, -1,
    5, // years
    5, -1,
  ],
  _weekDayValues: [
    131072, // sun
    262144, // mon
    524288, // tue
    1048576, // wed
    2097152, // thu
    4194304, // fri
    8388608, // sat
  ],
  simplifiedOptions: [{
    label: 'neverText',
    Recurring: false,
    RecurPeriod: -1, // not recurring
    basePeriodSpec: 0,
    RecurPeriodSpec: 0,
    RecurIterations: 0,
    RecurrenceState: 'rsNotRecurring',
  }, {
    label: 'dailyText',
    Recurring: true,
    RecurPeriod: 0,
    basePeriodSpec: 0,
    RecurPeriodSpec: 0,
    RecurIterations: 7, // override from this.defaultIterations
    RecurrenceState: 'rstMaster',
  }, {
    label: 'weeklyOnText',
    Recurring: true,
    RecurPeriod: 2,
    basePeriodSpec: 0,
    weekdays: [0, 0, 0, 0, 0, 0, 0], // none selected by default
    RecurPeriodSpec: 0,
    RecurIterations: 8,
    RecurrenceState: 'rstMaster',
    calc: true,
  }, {
    label: 'monthlyOnDayText',
    Recurring: true,
    RecurPeriod: 4,
    basePeriodSpec: 1048576,
    RecurPeriodSpec: 0,
    RecurIterations: 12,
    RecurrenceState: 'rstMaster',
  }, {
    label: 'monthlyOnText',
    Recurring: true,
    RecurPeriod: 5,
    basePeriodSpec: 0,
    RecurPeriodSpec: 0,
    RecurIterations: 12,
    RecurrenceState: 'rstMaster',
    calc: true,
  }, {
    label: 'yearlyOnText',
    Recurring: true,
    RecurPeriod: 7,
    basePeriodSpec: 38797312,
    RecurPeriodSpec: 0,
    RecurIterations: 5,
    RecurrenceState: 'rstMaster',
  }, {
    // Need one more for Yearly on #ord #weekday of month
    label: 'yearlyOnWeekdayText',
    Recurring: true,
    RecurPeriod: 8,
    basePeriodSpec: 0,
    RecurPeriodSpec: 0,
    weekdays: [0, 0, 0, 0, 0, 0, 0],
    RecurIterations: 5,
    RecurrenceState: 'rstMaster',
  }],

  createSimplifiedOptions: function createSimplifiedOptions(startDate) {
    this.recalculateSimplifiedPeriodSpec(startDate);

    const list = [];
    const currentDate = startDate || new Date();
    const wrapped = moment(currentDate);
    const day = currentDate.getDate();
    const ord = this.ordText[parseInt(((day - 1) / 7).toString(), 10) + 1];
    const textOptions = [
      null, // scale, replaced in loop
      day,
      wrapped.format(this.dayFormatText),
      wrapped.localeData().weekdays(wrapped),
      wrapped.localeData().monthsShort(wrapped),
      ord,
    ];

    for (const recurOption in this.simplifiedOptions) {
      if (this.simplifiedOptions.hasOwnProperty(recurOption)) {
        textOptions[0] = this.getPanel(this.simplifiedOptions[recurOption].RecurPeriod);
        this.simplifiedOptions[recurOption].RecurIterations = this.defaultIterations[this.simplifiedOptions[recurOption].RecurPeriod] || 0;

        if (this[this.simplifiedOptions[recurOption].label]) {
          list.push({
            $key: recurOption, // this.simplifiedOptions[recurOption].RecurPeriod,
            $descriptor: string.substitute(this[this.simplifiedOptions[recurOption].label], textOptions),
            recurrence: this.simplifiedOptions[recurOption],
          });
        }
      }
    }

    return {
      $resources: list,
    };
  },
  getPanel: function getPanel(recurPeriod, plural) {
    switch (recurPeriod) {
      case 0:
      case 1:
        return plural ? this.daysText : this.dailyText;
      case 2:
      case 3:
        return plural ? this.weeksText : this.weeklyText;
      case 4:
      case 5:
      case 6:
        return plural ? this.monthsText : this.monthlyText;
      case 7:
      case 8:
      case 9:
        return plural ? this.yearsText : this.yearlyText;
      default:
        return this.neverText;
    }
  },
  isAfterCompletion: function isAfterCompletion(panel) {
    return '1369'.indexOf(panel) >= 0;
  },
  recalculateSimplifiedPeriodSpec: function recalculateSimplifiedPeriodSpec(startDate) {
    for (const recurOption in this.simplifiedOptions) {
      if (this.simplifiedOptions.hasOwnProperty(recurOption)) {
        const opt = this.simplifiedOptions[recurOption];
        this.simplifiedOptions[recurOption].RecurPeriodSpec = this.getRecurPeriodSpec(
          opt.RecurPeriod,
          startDate,
          opt.weekdays
        );
      }
    }
  },
  getWeekdays: function getWeekdays(rps, names) { // pass a RecurPeriodSpec (as long as RecurPeriod corresponds to a Spec with weekdays)
    const weekdays = [];
    for (let i = 0; i < this._weekDayValues.length; i++) {
      if (names) {
        if (rps & this._weekDayValues[i]) {
          weekdays.push(this.weekDaysText[i]);
        }
      } else {
        weekdays.push((rps & this._weekDayValues[i]) ? 1 : 0);
      }
    }

    return weekdays;
  },
  getOrd: function getOrd(entry) {
    let nthWeek = 0;
    let weekday = entry.StartDate.getDay();
    let monthNum = entry.StartDate.getMonth() + 1;
    const ordBits = entry.RecurPeriodSpec % 524288;
    const monthBits = entry.RecurPeriodSpec % 4194304 - ordBits;

    if (entry && (entry.RecurPeriod === 5 || entry.RecurPeriod === 8)) {
      nthWeek = parseInt((ordBits / 65536).toString(), 10) + 1;
      weekday = parseInt((monthBits / 524288).toString(), 10) - 1;
      monthNum = parseInt(((entry.RecurPeriodSpec - monthBits - ordBits) / 4194304).toString(), 10);
    }

    return {
      week: nthWeek,
      weekday,
      month: monthNum,
    };
  },
  getRecurPeriodSpec: function getRecurPeriodSpec(recurPeriod, startDate, weekdays, inter) {
    let spec = 0;
    let interval = inter || this.interval;
    let weekDay;
    let nthWeek;
    let monthNum;

    if (!startDate) {
      return null;
    }

    switch (recurPeriod) {
      case 0:
        // daily
        break;
      case 1:
        // daily occurances *after completion*
        //
        break;
      case 2:
        // weekly
        for (let i = 0; i < weekdays.length; i++) {
          spec += (weekdays[i] ? this._weekDayValues[i] : 0);
        }
        if (spec === 0) {
          spec += this._weekDayValues[startDate.getDay()];
        }

        break;
      case 3:
        // weekly occurances *after completion*
        spec = 1048576;
        break;
      case 4:
        // monthly on day ##
        spec = 1048576;
        break;
      case 5:
        // monthly on #ord #weekday
        weekDay = startDate.getDay() + 1;
        nthWeek = parseInt(((startDate.getDate() - 1) / 7).toString(), 10) + 1;
        spec = ((weekDay * 524288) + ((nthWeek - 1) * 65536));
        break;
      case 6:
        // monthly occurances *after completion*
        spec = 1048576;
        break;
      case 7:
        // yearly on #month #day
        spec = 38797312;
        break;
      case 8:
        // yearly on #ord #weekday of #month
        spec = 18546688;
        weekDay = startDate.getDay() + 1;
        monthNum = startDate.getMonth() + 1;
        nthWeek = parseInt(((startDate.getDate() - 1) / 7).toString(), 10) + 1;
        spec = ((monthNum * 4194304) + (weekDay * 524288) + ((nthWeek - 1) * 65536));
        break;
      case 9:
        // yearly occurances *after completion*
        spec = 38797312;
        break;
      default:
        // Not recurring, happens only once
        interval = 0;
    }

    return spec + interval; // + every interval days/weeks/months/years
  },

  toString: function toString(entry, dependsOnPanel) {
    if (entry.RecurrenceState !== 'rstMaster' || !entry.StartDate) {
      return '';
    }

    const rp = parseInt(entry.RecurPeriod, 10);
    const recurPeriodSpec = parseInt(entry.RecurPeriodSpec, 10);
    const interval = recurPeriodSpec % 65536;
    let text = (1 < interval) ? string.substitute(this.everyText, [interval, this.getPanel(rp, true)]) : ((true === dependsOnPanel) ? '' : this.getPanel(rp));// eslint-disable-line
    const currentDate = argos.Convert.toDateFromString(entry.StartDate);
    const day = currentDate.getDate();
    const weekday = moment(currentDate).format(this.weekdayFormatText);
    const textOptions = [
      text,
      day,
      moment(currentDate).format(this.monthAndDayFormatText),
      this.getWeekdays(recurPeriodSpec, true),
      moment(currentDate).format(this.monthFormatText),
      this.ordText[parseInt(((day - 1) / 7).toString(), 10) + 1],
    ];

    switch (rp) {
      case 0:
        // daily
      case 1: // eslint-disable-line
        break;
      case 2:
        // weekly
        textOptions[2] = this.getWeekdays(recurPeriodSpec, true);
        text = string.substitute(this.weeklyOnText, textOptions);
        break;
      case 3:
        break;
      case 4:
        // monthly
        text = string.substitute(this.monthlyOnDayText, textOptions);
        break;
      case 5:
        textOptions[3] = weekday;
        text = string.substitute(this.monthlyOnText, textOptions);
        break;
      case 6:
        break;
      case 7:
        // yearly
        text = string.substitute(this.yearlyOnText, textOptions);
        break;
      case 8:
        textOptions[3] = weekday;
        text = string.substitute(this.yearlyOnWeekdayText, textOptions);
        break;
      case 9:
        break;
      default:
        return '';
    }

    if (this.isAfterCompletion(rp)) {
      text = string.substitute('${0} ${1}', [text, this.afterCompletionText]);
    } else {
      text = string.substitute(this.untilEndDateText, [text, this.calcEndDate(currentDate, entry).format(this.endDateFormatText)]);
    }

    return text;
  },
  calcEndDate: function calcEndDate(date, entry) {
    const interval = entry.RecurPeriodSpec % 65536;
    let weekDay;
    let nthWeek;
    let tempDate = moment.isMoment(date) ? date.clone() :
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

    tempDate = moment(tempDate);
    switch (parseInt(entry.RecurPeriod, 10)) {
      case 0:
        tempDate.add((interval * (entry.RecurIterations - 1)), 'days');
        break;
      case 2:
        tempDate.add((interval * (entry.RecurIterations - 1)), 'weeks');
        break;
      case 4:
        tempDate.add((interval * (entry.RecurIterations - 1)), 'months');
        break;
      case 5:
        weekDay = tempDate.day();
        nthWeek = parseInt((tempDate.date() / 7).toString(), 10) + 1;
        tempDate.add((interval * (entry.RecurIterations - 1)), 'months');
        tempDate = this.calcDateOfNthWeekday(tempDate.toDate(), weekDay, nthWeek);
        break;
      case 7:
        tempDate.add((interval * (entry.RecurIterations - 1)), 'years');
        break;
      case 8:
        weekDay = tempDate.day();
        nthWeek = parseInt((tempDate.date() / 7).toString(), 10) + 1;
        tempDate.add((interval * (entry.RecurIterations - 1)), 'years');
        tempDate = this.calcDateOfNthWeekday(tempDate.toDate(), weekDay, nthWeek);
        break;
      default:
        // RecurPeriod 1, 3, 6 & 9 are iterations after completion. No end date.
    }

    return tempDate;
  },
  calcDateOfNthWeekday: function calcDateOfNthWeekday(date, weekDay, nthWeek) {
    // calculate date of #nthWeek #weekDay  e.g. First Friday
    let tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    tempDate = moment(tempDate);

    if (nthWeek === 5) {
      // "last" - count backwards...
      tempDate.endOf('month');
      for (let i = 0; i < 7; i++) {
        if (tempDate.day() === weekDay) {
          break;
        }
        tempDate.subtract(1, 'days');
      }
    } else {
      // count from the beginning...
      tempDate.startOf('month');
      // get to the first day that matches...
      for (let i = 0; i < 7; i++) {
        if (tempDate.day() === weekDay) {
          break;
        }
        tempDate.add(1, 'days');
      }
      // then add correct number of weeks (first week - add 0 etc.)
      tempDate.add((nthWeek - 1), 'weeks');
    }
    return tempDate;
  },
  calcRecurIterations: function calcRecurIterations(endDate, startDate, interval, recurPeriod) {
    // calculate number of occurances based on start and end dates
    const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const years = endDate.getFullYear() - startDate.getFullYear();
    let result;

    switch (parseInt(recurPeriod, 10)) {
      case 8:
      case 7:
        result = years;
        break;
      case 5:
      case 4:
        result = (endDate.getMonth() - startDate.getMonth()) + (years * 12);
        break;
      case 2:
        result = days / 7;
        break;
      case 0:
        result = days;
        break;
      default:
        // no cases should fall here
    }

    return Math.floor((result / interval) + 1);
  },
});

lang.setObject('Mobile.SalesLogix.Recurrence', __class);
export default __class;
