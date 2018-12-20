require({cache:{
'url:Sage/MainView/EntityMgr/AddEditEntityDetail/templates/AddEditFiltersDialogMain.html':"[\r\n'<div>',\r\n\t'<div data-dojo-type=\"dijit.Dialog\" class=\"OverrideDialogOverflowToHidden FullPageDialogue\" data-dojo-attach-point=\"_dialog\">',\r\n        '<div data-dojo-type=\"dijit.form.Form\" data-dojo-attach-point=\"addEditFiltersForm\" class=\"FManagerDialogForm\" >',\r\n            '<div class=\"mainContentContent DialogMainForm\">',\r\n                '<div data-dojo-attach-point=\"_filterNameSection\"></div>',\r\n\t\t        '<table class=\"detailTableContainer formtable HundredPercentWidth\">',\r\n\t\t\t        '<tr data-dojo-attach-point=\"_TypeDropDownSection\">',\r\n\t\t\t\t        '<td class=\"FManagerDialogFieldLabel\">',\r\n\t\t\t\t\t\t    '<div style=\"padding:0 !important;\" class=\"lbl alignright\">',\r\n                                '<label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblTypeDp\">',\r\n                                '</label>',\r\n\t\t\t\t\t\t    '</div>',\r\n\t\t\t\t\t        '<div class=\"fld dijitInline\" data-dojo-attach-point=\"typeDp\"></div>',\r\n\t\t\t\t        '</td>',\r\n\t\t\t        '</tr>',\r\n\t\t\t        '<tr data-dojo-attach-point=\"_filterDropDownSection\">',\r\n                        '<td class=\"FManagerDialogFieldLabel\">',\r\n\t\t\t\t\t\t    '<div style=\"padding:0 !important;\" class=\"lbl alignright\"  >',\r\n                                '<label style=\"line-height:32px !important;\" data-dojo-attach-point=\"lblFilterDp\">',\r\n                                '</label>',\r\n                            '</div>',\r\n                             '<div data-dojo-attach-point=\"fieldsContainer\"></div>',\r\n                        '</td>',\r\n\t\t\t        '</tr>',\r\n\t\t        '</table>',\r\n                '<div data-dojo-attach-point=\"_TypeSpecificDetailsSection\">',\r\n                '</div>',\r\n            '</div>',\r\n            '<div>',\r\n\t\t\t\t'<div data-dojo-attach-point=\"divValidationMessage\" class=\"errorText\">',\r\n                     '<span data-dojo-attach-point=\"spanValidationMessage\">&nbsp;</span>',\r\n                 '</div>',\r\n                '<div class=\"lookupButtonWrapper\">',                    \r\n                    '<span data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"cmdSave\" data-dojo-attach-event=\"onClick:_cmdSave_OnClick\"></span>',\r\n                    '<span data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"cmdCancel\" data-dojo-attach-event=\"onClick:_cmdCancel_OnClick\"></span>',\r\n                '</div>',\r\n            '</div>',\r\n        '</div>',\r\n\t'</div>',\r\n'</div>'\r\n ]"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, cookie */
define("Sage/MainView/EntityMgr/AddEditEntityDetail/AddEditFiltersDialog", [
    'dijit/_Widget',
    'dijit/registry',

    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/query',
    'dojo/string',
    'dojo/_base/connect',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/i18n!./nls/AddEditDialog',
    'dojo/text!./templates/AddEditFiltersDialogMain.html',

    'Sage/_Templated',
	'Sage/Data/SDataServiceRegistry',
    'Sage/UI/_DialogLoadingMixin',
    'Sage/UI/Dialogs',
    'Sage/UI/FilteringSelect',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'Sage/UI/Controls/PropertyDropDown',
    'Sage/UI/Controls/TextBox',
    'Sage/MainView/EntityMgr/AddEditEntityDetail/DisplayName'
],
function (
    _Widget,
    registry,

    domConstruct,
    domClass,
    query,
    dojoString,
    dojoConnect,
    declare,
    lang,
    nlsResources,
    template,

    _Templated,
	SDataServiceRegistry,
    _DialogLoadingMixin,
    crmDialogue,
    crmDropDowns,
    _DialogHelpIconMixin,
	PropertyDropDown,
    crmTextBox,
    displayNameCNTRL
) {
    var widget = declare('Sage.MainView.EntityMgr.AddEditEntityDetail.AddEditFiltersDialog', [_Widget, _Templated], {
        _dialog: null,

        widgetTemplate: new Simplate(eval(template)),
        _nlsResources: nlsResources,
        widgetsInTemplate: true,

        filterNameTextBox: false,
        displayNameTextBox: false,

        analyticsCheckBox: false,
        propertiesDropDowns: false, //  Area for the Entity properties drop down
        propertyValueHolder: '',
        propertyDataLoad: false,    //  Entity properties data list   

        typeDropDowns: false,       //  Area for the filter type drop down 
        typeDataLoad: false,        //  filter type data list

        detailContent: false,       //  Area for the detail information

        _EditData: false,           //  Filter information
        entityName: false,          //  current name of the entity

        detailUtility: false,

        service: false,             //  Reference to SData
        _title: false,
        _idForTypeDropDown: 'typeDpItems',
        _idForPropertyDropDown: 'filtersDpItems',
        isMetric: false,
        PropertyTextBox: null,

        constructor: function (entity, title, dUtility, data, ismetric, entityDetailGridId) {
            if (entityDetailGridId === "metricGrid") {
                this.isMetric = true;
            }

            this.entityName = entity;

            if (registry.byId(this._idForTypeDropDown)) {
                this.destroy(registry.byId(this._idForTypeDropDown));
            }
            if (registry.byId(this._idForPropertyDropDown)) {
                this.destroy(registry.byId(this._idForPropertyDropDown));
            }
            if (registry.byId('propertyDp')) {
                this.destroy(registry.byId('propertyDp'));
            }
            this._EditData = data;
            if (title === null) {
                var strTemp = this._EditData ? nlsResources.editDialogTitle : this.isMetric ? nlsResources.dialogTitleAddMetric : nlsResources.dialogTitleAddFilter;
                this._title = dojoString.substitute(strTemp, [this.entityName]);
            }
            else {
                this._title = title;
            }
            if (dUtility === null) {
                var selectedData = { name: entity };
                dUtility = new Sage.MainView.EntityMgr.EntityDetailUtility();
                dUtility.getSchemasInformationFromSData(false);
                dUtility.getPropertiesAssociatedWithFilters(selectedData);
                dUtility.getSpecialValues();
                dUtility.refreshPropertyStore(selectedData.name);
                if (!this.service) {
                    this.service = dUtility.service;
                }
            }
            if (dUtility) {
                this.detailUtility = dUtility;
                this.detailUtility.refreshPropertyStore();
            }
            dojoConnect.connect(registry.byId("filterDetailGridPane"), "onShow", lang.partial(this.loadfilters, this));

        },

        destroy: function (context) {
            context.destroy();
            dijit.popup.close();
        },



        postCreate: function () {

            //create main controllers
            this._createFilterNameController();
            this._createTypeController();
            this._createPropertyController();

            //create detail specific controllers
            this.setUpDetailsSection(this, true);

            //create buttons
            this.cmdSave.containerNode.innerHTML = this._nlsResources.lblSaveButton;
            this.cmdCancel.containerNode.innerHTML = this._nlsResources.lblCancelButton;

            // help icon
            lang.mixin(this._dialog, new _DialogHelpIconMixin({ titleBar: this._dialog.titleBar }));
            this._dialog.createHelpIconByTopic(this.isMetric ? 'Adding_Editing_Metrics' : 'Adding_Editing_Filters');

            //loading
            lang.mixin(this._dialog, new _DialogLoadingMixin());

            dojoConnect.connect(this._dialog, "onCancel", lang.partial(this._cmdCancel_OnClick, this));

            this.startup();
            query('.dijitDialog').on('click', function (e) {
                var target = e.target || e.srcElement;
                if (target.type !== 'button') {
                    dijit.popup.close();
                }
            });

        },
        _createFilterNameController: function () {

            var defValueN = '';
            if (this._EditData && this._EditData.filterName) {
                defValueN = this._EditData.filterName;
            }
            var defValueD = '';
            if (this._EditData && this._EditData.displayName) {
                defValueD = this._EditData.displayName;
            }
            this.filterNameTextBox = new displayNameCNTRL({
                dUtility: this.detailUtility,
                editMode: typeof (this._EditData) !== "undefined",
                query: {
                    entityName: this.entityName,
                    resourceKind: dojoString.substitute('entities("${0}")/filters', [this.entityName]),
                    name: "filterName",
                    displayName: "displayName"
                },
                values: {
                    display: {
                        data: defValueD,
                        mapDisplayToName: this._filterNameToDisplayMap
                    },
                    name: {
                        data: defValueN,
                        validation: this._filterNameValidator,
                        invalidMessage: this._nlsResources.InvalidFilterName,
                        disabled: typeof (this._EditData) !== "undefined"

                    }
                }
            });

            domConstruct.place(this.filterNameTextBox.domNode, this._filterNameSection, 'replace');//rowDom, this.filterName, 'only');

        },
        _filterNameToDisplayMap: function (val) {
            var regexp = new RegExp(/([a-z]|[A-Z]|_\w*)/gm);
            var matches = val.match(regexp);
            if (matches) {
                if (lang.isArray(matches)) {
                    return matches.join('');
                }
                else {
                    return matches;
                }
            }
            return '';
        },
        _filterNameValidator: function (value, constraints) {
            // value needs to start with a letter or underscore, but can also contain numbers
            var regex = '^([a-z]|[A-Z]|_)(\\w)*';
            var matches = value.match(regex, 'g');
            if (matches) {
                if (lang.isArray(matches)) {
                    return matches[0].length == value.length;
                }
                else {
                    return matches[0].length == value.length;
                }
            }
            return false;
        },
        _createDisplayNameController: function () {
            this.lblDisplayName.innerHTML = this._nlsResources.lblDisplayName;

            //insert a display name text box
            // Currently no validation, but need to prevent Xsite scripting
            this.displayNameTextBox = new crmTextBox({ shouldPublishMarkDirty: false });
            domConstruct.place(this.displayNameTextBox.domNode, this.displayName, 'only');

            var defValue = '';
            if (this._EditData && this._EditData.displayName) {
                defValue = this._EditData.displayName;
            }
            this.displayNameTextBox.textbox.value = defValue;
        },
        _createPropertyController: function () {
            this.lblFilterDp.innerHTML = this._nlsResources.lblFilterDp;

            this.PropertyTextBox = new PropertyDropDown({ entityName: this.entityName });
            domConstruct.place(this.PropertyTextBox.domNode, this.fieldsContainer, 'replace');

            var defValue = '';
            if (this._EditData && this._EditData.propertyName) {
                defValue = this._EditData.propertyName;
            }
            this.PropertyTextBox.entitySelected.textbox.value = defValue;
        },

        _createTypeController: function () {
            this.lblTypeDp.innerHTML = this._nlsResources.lblTypeDp;

            var defValue = this.isMetric ? 'metricFilter' : 'distinctFilter';
            if (this._EditData && this._EditData.details) {
                defValue = this.detailUtility.formatDetails(this._EditData.details).detailsKey;
            }

            this.typeDropDowns = new crmDropDowns({
                id: this._idForTypeDropDown,
                name: 'types',
                value: defValue,
                store: this.detailUtility.filterTypeDataLoad,
                searchAttr: 'name',
                query: { type: this.isMetric ? 'metric' : 'filter' },
                fetchProperties: { sort: [{ attribute: "name", descending: false }] }
            }, this._idForTypeDropDown
            );

            if (this._EditData && this._EditData.details) {
                this.typeDropDowns.set('disabled', true);
            }

            domConstruct.place(this.typeDropDowns.domNode, this.typeDp, 'only');
            dojoConnect.connect(this.typeDropDowns, 'onChange', lang.partial(this.setUpDetailsSection, this, false));
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            this.inherited(arguments);
        },

        setUpDetailsSection: function (context, firstLoad) {

            // If there is data provided, then also provide the property control since it exposes a property lookup.
            // the property lookup helps determine functionality in some of the detail sections(AMD).
            if (typeof (context._EditData) !== "undefined" && context._EditData !== null) {
                context._EditData.details["propertyInfo"] = context.PropertyTextBox;
            }
            context.detailContent = context.detailUtility.getDetailsSection(context, firstLoad).detailsObject;
            if (typeof (context.detailContent) !== 'undefined') {
                domConstruct.place(context.detailContent.domNode, context._TypeSpecificDetailsSection, 'only');

                if (context.detailContent !== false && typeof (context.detailContent) !== 'undefined' && context.detailContent.hasProperties === false) {

                    domClass.add(context.PropertyTextBox.entitySelected.domNode, 'dijitTextBoxDisabled');
                    context.PropertyTextBox.entitySelected.set('value', '');
                    context.PropertyTextBox.entitySelected.set('disabled', true);
                    context.PropertyTextBox.transparentDropDown.set('disabled', true);

                }
                else {
                    if (context.PropertyTextBox.entitySelected !== false && typeof (context.PropertyTextBox.entitySelected) !== 'undefined') {
                        domClass.remove(context.PropertyTextBox.entitySelected.domNode, 'dijitTextBoxDisabled');
                        context.PropertyTextBox.entitySelected.set('disabled', false);
                    }
                    if (context.PropertyTextBox.transparentDropDown !== false && typeof (context.PropertyTextBox.transparentDropDown) !== 'undefined') {
                        context.PropertyTextBox.transparentDropDown.set('disabled', false);
                    }
                }
            }
        },
        show: function () {
            if (this._EditData) {
                this._dialog.titleNode.innerHTML = this._title;
            }
            else {
                this._dialog.titleNode.innerHTML = this._title;
            }

            this._dialog.show();
            this.inherited(arguments);
        },
        _cmdSave_OnClick: function () {
            if (!this.isValid()) {
                this._dialog.hideLoading();
            }
        },
        onSaveSuccess: function (data) {
        },
        _onSaveSuccess: function (data) {
            SDataServiceRegistry._removeFromLocalStorage(this.entityName);
            this.onSaveSuccess(data);
            this._dialog.hideLoading();
            this._dialog.hide();
        },
        _cmdCancel_OnClick: function (context) {
            if (this._dialog) {
                this._dialog.hideLoading();
                this._dialog.hide();
            }
            else if (context._dialog) // context is passed when the 'x' button is pressed
            {
                context._dialog.hideLoading();
                context._dialog.hide();
            }
            dojoConnect.publish('Sage/EntityManager/FilterCanceled');
        },
        isValid: function () {
            var failed = false;
            this.divValidationMessage.innerHTML = "";

            this.addEditFiltersForm.validate();

            //filter name
            var err = this.filterNameTextBox.isValid(typeof (this._EditData) === 'undefined');

            if (typeof (err) === "object") {
                err = err.value;
            }
            failed = !err;

            if (failed) {
                if (err.error) {
                    this.divValidationMessage.innerHTML = err.error;
                }
            }

            if (!this.PropertyTextBox.entitySelected.disabled) {
                if (!this.PropertyTextBox.entitySelected.validate(true)) {
                    this.PropertyTextBox.entitySelected.set('state', 'Error');
                    failed = true;
                }
            }

            if (!failed) {
                var value = this.detailContent.isValid();
                if (typeof (value) !== "boolean") {
                    this.divValidationMessage.innerHTML = dojoString.substitute("${0}<div>${1}</div>", [this.divValidationMessage.innerHTML, value]);
                    failed = true;
                }
                else {
                    failed = !value;
                }
            }
            if (!failed) {
                this._continueSaveEdit(this);
            }
            else {
                this._dialog.hideLoading();
                return false;
            }
        },
        _continueSaveEdit: function (context) {
            //update the resource kind
            var resourceRequest = new Sage.SData.Client.SDataSingleResourceRequest(context.service).setResourceKind(dojoString.substitute('entities("${0}")/filters', [context.entityName]));
            resourceRequest.setQueryArg('language', cookie.getCookie("SLXLanguageSetting"));

            var names = context.filterNameTextBox.getDetails();

            //if we were passed data, then we are updating an entry
            if (context._EditData) {

                // build the filter from the information in the current dialogue.
                context._EditData.filterName = names.filterName; //required
                if (names.displayName.length > 0) {// do not send back a display name field, and $descriptor will use filterName.
                    context._EditData.displayName = names.displayName;
                }
                context._EditData.details = context.detailContent.getDetails(); //get the sdata formatted details section

                var noProperty = true;
                if (!(context._EditData.details && context._EditData.details.dateDiffMetricFilter)) {
                    if (context.PropertyTextBox.entitySelected.value.length > 0) {
                        context._EditData.propertyName = context.PropertyTextBox.entitySelected.value; // if we have a new value use it
                    }
                    else if (context._EditData.propertyName.length > 0) { // else if we have a provided one use that.
                        context._EditData.propertyName = context._EditData.propertyName;
                    }
                    else {
                        context._EditData.propertyName = ""; //will propbably error out
                    }
                    noProperty = false;
                }

                var sdataPkg = context._EditData;

                if (noProperty) {
                    // the presence of a propertyName when saving a dateDiffMEtricFilter was causing server side errors.
                    delete sdataPkg.propertyName;
                }

                resourceRequest.setResourceSelector(dojoString.substitute("'${0}'", [sdataPkg['$key']]));
                resourceRequest['update'](sdataPkg, {
                    isSecurityManager: true,
                    scope: context,
                    ignoreETag: false,
                    success: context._onSaveSuccess,
                    failure: function (xhr, sdata) {
                        var msgObj = JSON.parse(xhr.response);
                        var errMsg = dojoString.substitute("${0}(${1})", [xhr.statusText, xhr.status]);
                        if (msgObj.length > 0 && typeof (msgObj[0].message) !== "undefined") {
                            errMsg = dojoString.substitute("${0}: {${1}", [errMsg, msgObj[0].message]);
                        }
                        // Handle failure
                        context.divValidationMessage.innerHTML = dojoString.substitute("${0}<div>${1}</div>", [context.divValidationMessage.innerHTML, errMsg]);
                        context._dialog.hideLoading();
                    }
                });
            }
            else { // else this entry is new, so create a new entry

                // build the filter from the information in the current dialogue.
                var filter =
                {
                    filterName: names.filterName,
                    analyticsAvailable: true,
                    details: context.detailContent.getDetails() //get the sdata formatted details section
                };

                if (names.displayName.length > 0) { // do not send back a display name field, and $descriptor will use filterName.
                    filter.displayName = names.displayName;
                    filter.analyticsDescription = names.displayName; // user currently is not able to set this value so if they create a new filter set it to the display name.
                }

                if (!filter.details.dateDiffMetricFilter) {
                    filter.propertyName = context.PropertyTextBox.entitySelected.value;
                }

                resourceRequest['create'](filter, {
                    scope: context,
                    ignoreETag: true,
                    success: lang.hitch(context, context._onSaveSuccess),
                    failure: function (xhr, sdata) {
                        var msgObj = JSON.parse(xhr.response);
                        var errMsg = dojoString.substitute("${0}(${1})", [xhr.statusText, xhr.status]);
                        if (msgObj.length > 0 && typeof (msgObj[0].message) !== "undefined") {
                            errMsg = dojoString.substitute("${0}: ${1}", [errMsg, msgObj[0].message]);
                        }
                        // Handle failure
                        context.divValidationMessage.innerHTML = dojoString.substitute("${0}<div>${1}</div>", [context.divValidationMessage.innerHTML, errMsg]);
                        context._dialog.hideLoading();
                    }
                });
            }
        }

    });

    return widget;
});