import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import format from '../../Format';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';

const resource = getResource('opportunityContactEdit');

/**
 * @class crm.Views.OpportunityContact.Edit
 *
 * @extends argos.Edit
 *
 * @requires argos.Utility
 */
const __class = declare('crm.Views.OpportunityContact.Edit', [Edit], {
  // Localization
  titleText: resource.titleText,
  nameText: resource.nameText,
  accountNameText: resource.accountNameText,
  contactTitleText: resource.contactTitleText,
  salesRoleText: resource.salesRoleText,
  salesRoleTitleText: resource.salesRoleTitleText,
  personalBenefitsText: resource.personalBenefitsText,
  strategyText: resource.strategyText,
  issuesText: resource.issuesText,
  standingText: resource.standingText,
  standingTitleText: resource.standingTitleText,
  contactText: resource.contactText,
  competitorPrefText: resource.competitorPrefText,

  // View Properties
  entityName: 'OpportunityContact',
  id: 'opportunitycontact_edit',
  insertSecurity: 'Entities/Contact/Add',
  updateSecurity: 'Entities/Contact/Edit',
  querySelect: [
    'Contact/Account/AccountName',
    'Contact/NameLF',
    'Contact/Title',
  ],
  queryInclude: [
    '$permissions',
  ],
  resourceKind: 'opportunityContacts',

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.contactText,
      name: 'ContactSection',
      children: [{
        formatValue: format.nameLF,
        label: this.nameText,
        name: 'ContactName',
        type: 'text',
        property: 'Contact.NameLF',
        readonly: true,
        exclude: true,
      }, {
        label: this.accountNameText,
        name: 'ContactAccountName',
        property: 'Contact.AccountName',
        type: 'text',
        readonly: true,
        exclude: true,
      }, {
        label: this.contactTitleText,
        name: 'ContactTitle',
        property: 'Contact.Title',
        type: 'text',
        readonly: true,
        exclude: true,
      }],
    }, {
      label: this.salesRoleText,
      name: 'SalesRole',
      property: 'SalesRole',
      type: 'picklist',
      title: this.salesRoleTitleText,
      picklist: 'Role',
    }, {
      label: this.standingText,
      name: 'Standing',
      property: 'Standing',
      type: 'picklist',
      title: this.standingTitleText,
      picklist: 'Standing',
    }, {
      label: this.personalBenefitsText,
      name: 'PersonalBenefits',
      property: 'PersonalBenefits',
      type: 'text',
    }, {
      label: this.competitorPrefText,
      name: 'Competitors',
      property: 'Competitors',
      textProperty: 'CompetitorName',
      view: 'competitor_related',
      type: 'lookup',
    }, {
      label: this.strategyText,
      name: 'Strategy',
      property: 'Strategy',
      type: 'textarea',
    }, {
      label: this.issuesText,
      name: 'Issues',
      property: 'Issues',
      type: 'textarea',
    }, {
      name: 'OpportunityKey',
      property: 'Opportunity.$key',
      type: 'hidden',
      include: true,
    }, {
      name: 'ContactKey',
      property: 'Contact.$key',
      type: 'hidden',
      include: true,
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.OpportunityContact.Edit', __class);
export default __class;
