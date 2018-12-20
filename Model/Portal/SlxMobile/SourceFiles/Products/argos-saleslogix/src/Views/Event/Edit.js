import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import format from '../../Format';
import validator from '../../Validator';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';

const resource = getResource('eventEdit');
const dtFormatResource = getResource('eventEditDateTimeFormat');

/**
 * @class crm.Views.Event.Edit
 *
 * @extends argos.Edit
 *
 * @requires crm.Format
 * @requires crm.Validator
 */
const __class = declare('crm.Views.Event.Edit', [Edit], {
  // Localization
  titleText: resource.titleText,
  typeText: resource.typeText,
  descriptionText: resource.descriptionText,
  startDateText: resource.startDateText,
  endDateText: resource.endDateText,
  startingFormatText: dtFormatResource.startingFormatText,
  startingFormatText24: dtFormatResource.startingFormatText24,

  // View Properties
  entityName: 'Event',
  id: 'event_edit',
  insertSecurity: null, // 'Entities/Event/Add',
  updateSecurity: null, // 'Entities/Event/Edit',
  querySelect: [
    'Description',
    'EndDate',
    'StartDate',
    'UserId',
    'Type',
  ],
  queryInclude: [
    '$permissions',
  ],
  resourceKind: 'events',

  eventTypesText: {
    Vacation: 'Vacation',
    'Business Trip': 'Business Trip',
    Conference: 'Conference',
    Holiday: 'Holiday',
  },
  startup: function startup() {
    this.inherited(arguments);

    this.connect(this.fields.StartDate, 'onChange', this.onStartDateChange);
  },
  onStartDateChange: function onStartDateChange(val) {
    const endDate = this.fields.EndDate.getValue();

    if (endDate < val) {
      this.fields.EndDate.setValue(val);
    }
  },
  formatTypeText: function formatTypeText(val, key, text) {
    return this.eventTypesText[key] || text;
  },
  createTypeData: function createTypeData() {
    const list = [];

    for (const type in this.eventTypesText) {
      if (this.eventTypesText.hasOwnProperty(type)) {
        list.push({
          $key: type,
          $descriptor: this.eventTypesText[type],
        });
      }
    }

    return {
      $resources: list,
    };
  },
  applyUserActivityContext: function applyUserActivityContext(context) {
    const view = App.getView(context.id);
    if (view && view.currentDate) {
      const currentDate = moment(view.currentDate).clone().startOf('day');
      const userOptions = App.context.userOptions;
      const startTimeOption = userOptions && userOptions['Calendar:DayStartTime'];
      const startDate = currentDate.clone();
      let startTime = startTimeOption && moment(startTimeOption, 'h:mma');

      if (startTime && (!moment(currentDate).isSame(moment()))) {
        startDate.hours(startTime.hours());
        startDate.minutes(startTime.minutes());
      } else {
        startTime = moment();
        startDate.hours(startTime.hours());
        startDate.add({
          minutes: (Math.floor(startTime.minutes() / 15) * 15) + 15,
        });
      }

      const endDate = startDate.clone().add({
        minutes: 15,
      });

      this.fields.StartDate.setValue(startDate.toDate());
      this.fields.EndDate.setValue(endDate.toDate());
    }
  },
  applyContext: function applyContext() {
    this.inherited(arguments);

    const found = App.queryNavigationContext((o) => {
      const context = (o.options && o.options.source) || o;

      return (/^(useractivities||activities||events)$/.test(context.resourceKind));
    });

    const context = (found && found.options && found.options.source) || found;
    const lookup = {
      useractivities: this.applyUserActivityContext,
      activities: this.applyUserActivityContext,
    };

    if (context && lookup[context.resourceKind]) {
      lookup[context.resourceKind].call(this, context);
    }
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      label: this.typeText,
      name: 'Type',
      property: 'Type',
      type: 'select',
      view: 'select_list',
      requireSelection: false,
      maxTextLength: 64,
      validator: [
        validator.exceedsMaxTextLength,
        validator.notEmpty,
      ],
      textRenderer: this.formatTypeText.bindDelegate(this),
      data: this.createTypeData(),
      autoFocus: true,
    }, {
      label: this.descriptionText,
      name: 'Description',
      property: 'Description',
      type: 'text',
      maxTextLength: 64,
      validator: [
        validator.exceedsMaxTextLength,
        validator.notEmpty,
      ],
    }, {
      label: this.startDateText,
      name: 'StartDate',
      property: 'StartDate',
      renderer: format.date,
      type: 'date',
      showTimePicker: true,
      formatString: (App.is24HourClock()) ? this.startingFormatText24 : this.startingFormatText,
      minValue: (new Date(1900, 0, 1)),
      validator: [
        validator.exists,
        validator.isDateInRange,
      ],
    }, {
      label: this.endDateText,
      name: 'EndDate',
      property: 'EndDate',
      renderer: format.date,
      type: 'date',
      showTimePicker: true,
      formatString: (App.is24HourClock()) ? this.startingFormatText24 : this.startingFormatText,
      minValue: (new Date(1900, 0, 1)),
      validator: [
        validator.exists,
        validator.isDateInRange,
      ],
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Event.Edit', __class);
export default __class;
