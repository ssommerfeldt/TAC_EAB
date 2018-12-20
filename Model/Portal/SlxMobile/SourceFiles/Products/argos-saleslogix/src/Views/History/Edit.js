import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import array from 'dojo/_base/array';
import string from 'dojo/string';
import environment from '../../Environment';
import validator from '../../Validator';
import utility from 'argos/Utility';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';

const resource = getResource('historyEdit');
const dtFormatResource = getResource('historyEditDateTimeFormat');

/**
 * @class crm.Views.History.Edit
 *
 * @extends argos.Edit
 *
 * @requires argos.Utility
 *
 * @requires crm.Environment
 * @requires crm.Validator
 */
const __class = declare('crm.Views.History.Edit', [Edit], {
  // Localization
  accountText: resource.accountText,
  noteDescriptionTitleText: resource.noteDescriptionTitleText,
  contactText: resource.contactText,
  longNotesText: resource.longNotesText,
  longNotesTitleText: resource.longNotesTitleText,
  opportunityText: resource.opportunityText,
  ticketNumberText: resource.ticketNumberText,
  regardingText: resource.regardingText,
  isLeadText: resource.isLeadText,
  startingText: resource.startingText,
  startingFormatText: dtFormatResource.startingFormatText,
  startingFormatText24: dtFormatResource.startingFormatText24,
  titleText: resource.titleText,
  companyText: resource.companyText,
  leadText: resource.leadText,
  relatedItemsText: resource.relatedItemsText,
  yesText: resource.yesText,
  noText: resource.noText,
  validationText: resource.validationText,
  validationCanEditText: resource.validationCanEditText,
  // View Properties
  id: 'history_edit',
  fieldsForLeads: ['AccountName', 'Lead'],
  fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
  entityName: 'History',
  resourceKind: 'history',
  insertSecurity: null, // 'Entities/History/Add',
  updateSecurity: null, // 'Entities/History/Edit',
  querySelect: [
    'AccountId',
    'AccountName',
    'Category',
    'ModifyDate',
    'CompletedDate',
    'ContactId',
    'ContactName',
    'CompletedUser',
    'Description',
    'Duration',
    'Notes',
    'LongNotes',
    'OpportunityId',
    'OpportunityName',
    'Priority',
    'StartDate',
    'TicketId',
    'TicketNumber',
    'LeadId',
    'LeadName',
    'Timeless',
    'Type',
    'UserName',
    'UserId',
  ],
  queryInclude: [
    '$permissions',
  ],
  existsRE: /^[\w]{12}$/,
  init: function init() {
    this.inherited(arguments);

    this.connect(this.fields.Lead, 'onChange', this.onLeadChange);
    this.connect(this.fields.IsLead, 'onChange', this.onIsLeadChange);

    this.connect(this.fields.Account, 'onChange', this.onAccountChange);
    this.connect(this.fields.Contact, 'onChange', this.onAccountDependentChange);
    this.connect(this.fields.Opportunity, 'onChange', this.onAccountDependentChange);
    this.connect(this.fields.Ticket, 'onChange', this.onAccountDependentChange);
  },
  isHistoryForLead: function isHistoryForLead(entry) {
    return entry && this.existsRE.test(entry.LeadId);
  },
  isInLeadContext: function isInLeadContext() {
    const insert = this.options && this.options.insert;
    const entry = this.options && this.options.entry;
    const context = this._getNavContext();
    let isLeadContext = false;

    if (context && context.resourceKind === 'leads') {
      isLeadContext = true;
    }

    const lead = (insert && isLeadContext) || this.isHistoryForLead(entry);
    return !!lead;
  },
  beforeTransitionTo: function beforeTransitionTo() {
    this.inherited(arguments);

    // we hide the lead or standard fields here, as the view is currently hidden, in order to prevent flashing.
    // the value for the 'IsLead' field will be set later, based on the value derived here.

    // todo: there is an issue when refreshing the edit view as options.isLead is persisted in the navigation state.
    if (this.options.isForLead !== undefined) {
      return;
    }

    this.options.isForLead = this.isInLeadContext();

    if (this.options.isForLead) {
      this.showFieldsForLead();
    } else {
      this.showFieldsForStandard();
    }
  },
  onIsLeadChange: function onIsLeadChange(value) {
    this.options.isForLead = value;

    if (this.options.isForLead) {
      this.showFieldsForLead();
    } else {
      this.showFieldsForStandard();
    }
  },
  onLeadChange: function onLeadChange(value, field) {
    const selection = field.getSelection();

    if (selection && this.insert) {
      this.fields.AccountName.setValue(utility.getValue(selection, 'Company'));
    }
  },
  onAccountChange: function onAccountChange(value) {
    const fields = this.fields;
    array.forEach(['Contact', 'Opportunity', 'Ticket'], (f) => {
      if (value) {
        fields[f].dependsOn = 'Account';
        fields[f].where = string.substitute('Account.Id eq "${0}"', [value.AccountId || value.key]);

        if (fields[f].currentSelection && fields[f].currentSelection.Account.$key !== (value.AccountId || value.key)) {
          fields[f].setValue(false);
        }
      } else {
        fields[f].dependsOn = null;
        fields[f].where = 'Account.AccountName ne null';
        fields[f].setValue(false);
      }
    });
  },
  onAccountDependentChange: function onAccountDependentChange(value, field) {
    if (value && !field.dependsOn && field.currentSelection && field.currentSelection.Account) {
      const accountField = this.fields.Account;
      accountField.setValue({
        AccountId: field.currentSelection.Account.$key,
        AccountName: field.currentSelection.Account.AccountName,
      });
      this.onAccountChange(accountField.getValue(), accountField);
    }
  },
  showFieldsForLead: function showFieldsForLead() {
    array.forEach(this.fieldsForStandard.concat(this.fieldsForStandard), function hideFieldsStandard(item) {
      if (this.fields[item]) {
        this.fields[item].hide();
      }
    }, this);

    array.forEach(this.fieldsForLeads, function showFieldsLead(item) {
      if (this.fields[item]) {
        this.fields[item].show();
      }
    }, this);
  },
  showFieldsForStandard: function showFieldsForStandard() {
    array.forEach(this.fieldsForStandard.concat(this.fieldsForLeads), function hideFieldsLead(item) {
      if (this.fields[item]) {
        this.fields[item].hide();
      }
    }, this);

    array.forEach(this.fieldsForStandard, function showFieldsStandard(item) {
      if (this.fields[item]) {
        this.fields[item].show();
      }
    }, this);
  },
  onInsertSuccess: function onInsertSuccess() {
    environment.refreshStaleDetailViews();
    this.inherited(arguments);
  },
  applyContext: function applyContext() {
    const found = this._getNavContext();

    const lookup = {
      accounts: this.applyAccountContext,
      contacts: this.applyContactContext,
      opportunities: this.applyOpportunityContext,
      leads: this.applyLeadContext,
      tickets: this.applyTicketContext,
    };

    if (found && lookup[found.resourceKind]) {
      lookup[found.resourceKind].call(this, found);
    }

    const user = App.context && App.context.user;

    this.fields.Type.setValue('atNote');
    this.fields.UserId.setValue(user && user.$key);
    this.fields.UserName.setValue(user && user.$descriptor);
    this.fields.StartDate.setValue(new Date());
    this.fields.Text.setValue('');
  },
  _getNavContext: function _getNavContext() {
    let found = App.queryNavigationContext((o) => {
      const context = (o.options && o.options.source) || o;
      return (/^(accounts|contacts|opportunities|leads|tickets)$/).test(context.resourceKind) && context.key;
    });
    found = (found && found.options && found.options.source) || found;
    return found;
  },
  applyAccountContext: function applyAccountContext(context) {
    const accountField = this.fields.Account;
    const accountValue = {
      AccountId: context.key,
      AccountName: context.descriptor,
    };
    accountField.setValue(accountValue);
    this.onAccountChange(accountValue, accountField);
  },
  applyLeadContext: function applyLeadContext(context) {
    const view = App.getView(context.id);
    const entry = context.entry || (view && view.entry);

    if (!entry || !entry.$key) {
      return;
    }

    const leadField = this.fields.Lead;
    const leadValue = {
      LeadId: entry.$key,
      LeadName: entry.$descriptor,
    };

    leadField.setValue(leadValue);
    this.onLeadChange(leadValue, leadField);

    this.fields.AccountName.setValue(entry.Company);

    const isLeadField = this.fields.IsLead;
    isLeadField.setValue(context.resourceKind === 'leads');
    this.onIsLeadChange(isLeadField.getValue(), isLeadField);
  },
  applyOpportunityContext: function applyOpportunityContext(context) {
    const opportunityField = this.fields.Opportunity;
    let accountEntry;

    opportunityField.setValue({
      OpportunityId: context.key,
      OpportunityName: context.descriptor,
    });

    this.onAccountDependentChange(opportunityField.getValue, opportunityField);

    if (context.entry && context.entry.Account) {
      accountEntry = context.entry.Account;
    } else {
      const view = App.getView(context.id);
      const entry = view && view.entry;
      accountEntry = entry && entry.Account;
    }

    if (accountEntry) {
      const accountField = this.fields.Account;
      accountField.setValue({
        AccountId: accountEntry.$key,
        AccountName: accountEntry.AccountName,
      });
      this.onAccountChange(accountField.getValue(), accountField);
    }

    // todo: find a good way to get the primary contact and apply
  },
  applyContactContext: function applyContactContext(context) {
    const contactField = this.fields.Contact;
    let accountEntry;
    contactField.setValue({
      ContactId: context.key,
      ContactName: context.descriptor,
    });

    this.onAccountDependentChange(contactField.getValue(), contactField);

    if (context.entry && context.entry.Account) {
      accountEntry = context.entry.Account;
    } else {
      const view = App.getView(context.id);
      const entry = view && view.entry;
      accountEntry = entry && entry.Account;
    }

    if (accountEntry) {
      const accountField = this.fields.Account;
      accountField.setValue({
        AccountId: accountEntry.$key,
        AccountName: accountEntry.AccountName,
      });
      this.onAccountChange(accountField.getValue(), accountField);
    }
  },
  applyTicketContext: function applyTicketContext(context) {
    const ticketField = this.fields.Ticket;
    let accountEntry;
    let contactEntry;
    ticketField.setValue({
      TicketId: context.key,
      TicketNumber: context.descriptor,
    });
    this.onAccountDependentChange(ticketField.getValue(), ticketField);

    if (context.entry && context.entry.Account) {
      accountEntry = context.entry.Account;
      contactEntry = context.entry.Contact;
    } else {
      const view = App.getView(context.id);
      const entry = view && view.entry;
      accountEntry = entry && entry.Account;
      contactEntry = entry && entry.Contact;
    }

    if (accountEntry) {
      const accountField = this.fields.Account;
      accountField.setValue({
        AccountId: accountEntry.$key,
        AccountName: accountEntry.AccountName,
      });
      this.onAccountChange(accountField.getValue(), accountField);
    }

    if (contactEntry) {
      const contactField = this.fields.Contact;
      contactField.setValue({
        ContactId: contactEntry.$key,
        ContactName: contactEntry.NameLF,
      });
      this.onAccountDependentChange(contactField.getValue(), contactField);
    }
  },
  setValues: function setValues(values) {
    this.inherited(arguments);
    const isLeadField = this.fields.IsLead;
    if (this.isInLeadContext()) {
      isLeadField.setValue(true);
      this.onIsLeadChange(true, isLeadField);
      const field = this.fields.Lead;
      const value = utility.getValue(values, field.applyTo, {});
      field.setValue(value, true);
      const leadCompany = utility.getValue(values, 'AccountName');
      if (leadCompany) {
        this.fields.AccountName.setValue(leadCompany);
      }
    } else {
      isLeadField.setValue(false);
    }

    const longNotes = utility.getValue(values, 'LongNotes');
    if (longNotes) {
      this.fields.Text.setValue(longNotes);
    }

    const insert = this.options && this.options.insert;
    this.context = this._getNavContext();
    // entry may have been passed as full entry, reapply context logic to extract properties
    if (insert && this.context && this.context.resourceKind) {
      const lookup = {
        accounts: this.applyAccountContext,
        contacts: this.applyContactContext,
        opportunities: this.applyOpportunityContext,
        leads: this.applyLeadContext,
        tickets: this.applyTicketContext,
      };
      lookup[this.context.resourceKind].call(this, this.context);
    }
    this.enableFields();
    const denyEdit = !this.currentUserCanEdit();
    if (denyEdit) {
      this.disableFields();
    }
  },
  disableFields: function disableFields(predicate) {
    for (const name in this.fields) {
      if (!predicate || predicate(this.fields[name])) {
        this.fields[name].disable();
      }
    }
  },
  enableFields: function enableFields(predicate) {
    for (const name in this.fields) {
      if (!predicate || predicate(this.fields[name])) {
        this.fields[name].enable();
      }
    }
  },
  currentUserCanEdit: function currentUserCanEdit() {
    const entry = this.options.entry || this.entry;
    const insert = this.options && this.options.insert;
    if (!insert) {
      if (App.context.user.$key === 'ADMIN') {
        return true;
      }
      return entry && (entry.UserId === App.context.user.$key);
    }
    return true;
  },
  formatDependentQuery: function formatDependentQuery(dependentValue, format, property) {
    const theProperty = property || '$key';
    const propertyValue = utility.getValue(dependentValue, theProperty);
    if (propertyValue) {
      return string.substitute(format, [propertyValue]);
    }
    return '';
  },
  getValues: function getValues() {
    let values = this.inherited(arguments);

    if (this.fields.Text.isDirty()) {
      const text = this.fields.Text.getValue();

      values = values || {};
      values.LongNotes = text;
      values.Notes = text && text.length > 250 ? text.substr(0, 250) : text;
    }

    return values;
  },
  _lookupApplyTo: function _lookupApplyTo(payload, value) {
    if (value === null) {
      payload[this.valueKeyProperty] = null;
      payload[this.valueTextProperty] = null;
    }
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.longNotesTitleText,
      name: 'NotesSection',
      children: [{
        name: 'Text',
        property: 'Text',
        label: this.longNotesText,
        cls: 'row-edit-text',
        type: 'textarea',
        autoFocus: true,
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Type',
        property: 'Type',
        type: 'hidden',
      }, {
        name: 'UserId',
        property: 'UserId',
        type: 'hidden',
      }, {
        name: 'UserName',
        property: 'UserName',
        type: 'hidden',
      }, {
        label: this.startingText,
        name: 'StartDate',
        property: 'StartDate',
        type: 'date',
        showTimePicker: true,
        dateFormatText: (App.is24HourClock()) ? this.startingFormatText24 : this.startingFormatText,
        minValue: (new Date(1900, 0, 1)),
        validator: [
          validator.exists,
          validator.isDateInRange,
        ],
      }, {
        dependsOn: 'Type',
        label: this.regardingText,
        name: 'Description',
        property: 'Description',
        picklist: 'Note Regarding',
        orderBy: 'text asc',
        title: this.noteDescriptionTitleText,
        type: 'picklist',
      }],
    }, {
      title: this.relatedItemsText,
      name: 'RelatedItemsSection',
      children: [{
        label: this.isLeadText,
        name: 'IsLead',
        include: false,
        type: 'boolean',
        onText: this.yesText,
        offText: this.noText,
      }, {
        label: this.accountText,
        name: 'Account',
        property: 'Account',
        type: 'lookup',
        requireSelection: false,
        emptyText: '',
        applyTo: this._lookupApplyTo,
        valueKeyProperty: 'AccountId',
        valueTextProperty: 'AccountName',
        view: 'account_related',
        validator: {
          fn: (function validateAccount(value, field) {
            const insert = field.owner.options && field.owner.options.insert;
            if ((insert) && (!value)) {
              return true;
            }
            return false;
          }).bindDelegate(this),
          message: this.validationText,
        },
      }, {
        dependsOn: 'Account',
        label: this.contactText,
        name: 'Contact',
        property: 'Contact',
        type: 'lookup',
        requireSelection: false,
        emptyText: '',
        applyTo: this._lookupApplyTo,
        valueKeyProperty: 'ContactId',
        valueTextProperty: 'ContactName',
        view: 'contact_related',
        where: this.formatDependentQuery.bindDelegate(
          this, 'Account.Id eq "${0}"', 'AccountId'
        ),
      }, {
        dependsOn: 'Account',
        label: this.opportunityText,
        name: 'Opportunity',
        property: 'Opportunity',
        type: 'lookup',
        requireSelection: false,
        emptyText: '',
        applyTo: this._lookupApplyTo,
        valueKeyProperty: 'OpportunityId',
        valueTextProperty: 'OpportunityName',
        view: 'opportunity_related',
        where: this.formatDependentQuery.bindDelegate(
          this, 'Account.Id eq "${0}"', 'AccountId'
        ),
      }, {
        dependsOn: 'Account',
        label: this.ticketNumberText,
        name: 'Ticket',
        property: 'Ticket',
        type: 'lookup',
        requireSelection: false,
        emptyText: '',
        applyTo: this._lookupApplyTo,
        valueKeyProperty: 'TicketId',
        valueTextProperty: 'TicketNumber',
        view: 'ticket_related',
        where: this.formatDependentQuery.bindDelegate(
          this, 'Account.Id eq "${0}"', 'AccountId'
        ),
      }, {
        label: this.leadText,
        name: 'Lead',
        property: 'Lead',
        type: 'lookup',
        requireSelection: false,
        emptyText: '',
        applyTo: this._lookupApplyTo,
        valueKeyProperty: 'LeadId',
        valueTextProperty: 'LeadName',
        view: 'lead_related',
        validator: validator.exists,
      }, {
        label: this.companyText,
        name: 'AccountName',
        property: 'AccountName',
        type: 'text',
      }, {
        label: 'UserId',
        name: 'UserId',
        property: 'UserId',
        type: 'hidden',
        validator: {
          fn: (function validateUserId(value, field) {
            const canEdit = field.owner.currentUserCanEdit();
            if (!canEdit) {
              return true;
            }
            return false;
          }).bindDelegate(this),
          message: this.validationCanEditText,
        },
      }],
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.History.Edit', __class);
export default __class;
