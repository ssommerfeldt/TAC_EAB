/*
 * Copyright (c) 2016, Infor (US), Inc. All rights reserved.
 */
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import domConstruct from 'dojo/dom-construct';
import List from 'argos/List';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('locPicker');

const __class = declare('crm.Integrations.Contour.Views.PxSearch.LocationPicker', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.Name %}</h3>',
  ]),
  // overriding the stock rowTemplate with our custom key and descriptor
  rowTemplate: new Simplate([
    '<li data-action="activateEntry" data-key="{%: $.$key %}" data-descriptor="{%: $.$descriptor %}" data-lat="{%: $.Address.GeocodeLatitude %}" data-lon="{%: $.Address.GeocodeLongitude %}">',
    '<button data-action="selectEntry" class="list-item-selector button">',
    '<img src="{%= $$.icon || $$.selectIcon %}" class="icon" />',
    '</button>',
    '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
    '</li>',
  ]),

  // Localization
  accountsNearText: resource.accountsNearText,
  myHouseText: resource.myHouseText,
  myOfficeText: resource.myOfficeText,
  titleText: resource.titleText,

  // View Properties
  id: 'pxSearch_locations',
  security: 'Entities/Place/View',
  entityName: 'Place',
  allowSelection: true,
  enableActions: false,
  pageSize: 100,
  offlineIds: null,
  resourceKind: 'places',
  modelName: MODEL_NAMES.PLACE,
  enableSearch: true,
  groupsEnabled: false,
  enableDynamicGroupLayout: false,

  // User Address Properties
  _myWork: null,
  _myHome: null,

  startup: function startup() {
    this.inherited(arguments);
    this._getUserInfoAddresses();
  },
  _getUserInfoAddresses() {
    if (App.context.user) {
      const querySelect = [
        'UserInfo/Address/GeocodeProvider',
        'UserInfo/Address/GeocodeLatitude',
        'UserInfo/Address/GeocodeLongitude',
        'UserInfo/Address/GeocodeFailed',
        'UserInfo/HomeAddress/GeocodeProvider',
        'UserInfo/HomeAddress/GeocodeLatitude',
        'UserInfo/HomeAddress/GeocodeLongitude',
        'UserInfo/HomeAddress/GeocodeFailed'];
      const request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService())
        .setResourceKind('users')
        .setResourceSelector(string.substitute("'${0}'", [App.context.user.$key]))
        .setQueryArg('select', querySelect.join(','));

      request.read({
        success: (data) => {
          if (data.UserInfo.Address && data.UserInfo.Address.GeocodeFailed === false) {
            this._myWork = this._createPlaceEntry(this.myOfficeText, data.UserInfo.Address);
          }
          if (data.UserInfo.HomeAddress && data.UserInfo.HomeAddress.GeocodeFailed === false) {
            this._myHome = this._createPlaceEntry(this.myHouseText, data.UserInfo.HomeAddress);
          }
        },
      });
    }
  },
  _createPlaceEntry(name, address) {
    const plc = {};
    plc.Address = address;
    plc.$descriptor = plc.Name = name;
    plc.$httpStatus = 200;
    plc.$key = address.$key;
    plc.ThisUserOnly = true;
    return plc;
  },
  processData(entries) {
    // Inject the current user's addresses
    if (this._myHome) {
      entries.unshift(this._myHome);
    }
    if (this._myWork) {
      entries.unshift(this._myWork);
    }

    if (!entries) {
      return;
    }

    const count = entries.length;

    if (count > 0) {
      const docfrag = document.createDocumentFragment();
      for (let i = 0; i < count; i++) {
        const entry = this._processEntry(entries[i]);
        // If key comes back with nothing, check that the store is properly
        // setup with an idProperty
        this.entries[this.getIdentity(entry)] = entry;

        const rowNode = this.createItemRowNode(entry);

        docfrag.appendChild(rowNode);
        this.onApplyRowTemplate(entry, rowNode);
      }

      if (docfrag.childNodes.length > 0) {
        domConstruct.place(docfrag, this.contentNode, 'last');
      }
    }
  },
  // custom activateEntry method since we aren't actually opening a detail view
  activateEntry(params) {
    const view = App.getView('pxSearch_Accounts');
    if (params.key === 'Me') {
      view.show();
    } else {
      view.lat = params.lat;
      view.lon = params.lon;
      view.show({
        title: string.substitute(this.accountsNearText, [params.descriptor]),
      }, {});
    }
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute(`(ThisUserOnly eq "F" or (ThisUserOnly eq "T" and UserId eq "${App.context.user.$key}")) and Name like "%\${0}%"`, [this.escapeSearchQuery(searchQuery)]);
  },
});

lang.setObject('Proximity.Views.Place.List', __class);
export default __class;
