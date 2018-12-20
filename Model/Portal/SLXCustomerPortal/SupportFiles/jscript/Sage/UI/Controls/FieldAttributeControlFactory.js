/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/FieldAttributeControlFactory", [
    'Sage/UI/Forms/FormFromSData',
    'dojo/_base/connect',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/string',
    'dojo/query',
    'Sage/UI/Controls/TextBox',
    'Sage/UI/Controls/CheckBox',
    'Sage/UI/Controls/SimpleTextarea',
    'Sage/UI/Dialogs',
    'Sage/UI/FilteringSelect',
    'Sage/UI/ComboBox',
    'dojo/store/Memory',
    'Sage/UI/Controls/PropertyDropDown',
    'dojo/aspect',
    'dojo/string',
    'dojo/data/ObjectStore',
    'dojo/store/Observable',
    'dojo/i18n!./nls/FieldAttributeControlFactory',
    'dojo/dom-construct',
    'Sage/UI/Controls/DndSortList',
    'dijit/form/Button',
    'dijit/form/ValidationTextBox',
    'Sage/UI/Forms/PickListManagerForm'
],
function (
    GeneralForm,
    dojoConnect,
    declare,
    lang,
    DomClass,
    dString,
    Query,
    TextBox,
    CheckBox,
    SimpleTextarea,
    dialogue,
    FilteringSelect,
    ComboBox,
    memory,
    PropertyDropDown,
    dojoAspect,
    dojoString,
    ObjectStore,
    Observable,
    nlsResource,
    DomConstruct,
    DndSortList,
    dijitButton,
    ValidationTextBox,
    PickListManagerForm
) {

    var widget = declare('Sage.UI.Controls.FieldAttributeControlFactory', [GeneralForm], {

        store: null,
        defaultEntity: null,
        pickList: null,
        viewOnly: false,
        activeControls: null,
        hiddenValues: null,
        calculatedMapDotToLegacyPath: null,
        picklistManagerForm: PickListManagerForm,
        pickListManagerFormDiv: null,
        picklistSchema: null,
        domConstruct: DomConstruct,
        domClass: DomClass,
        query: Query,
        pickListLoading: false,
        // used to limit access to the pick list after onChange event
        formStatus: 0,


        // a texttbox that does not get marked as dirty
        _createCustomTextBox: function () {
            var custText = declare('Sage.UI.Controls.FieldAttributeControlFactory.customTextBox', Sage.UI.Controls.TextBox, {
                shouldPublishMarkDirty: false
            });
            return custText;
        },
        // a checkbox that does not get marked as dirty
        _createCustomCheckBox: function () {
            var custText = declare('Sage.UI.Controls.FieldAttributeControlFactory.customCheckBox', Sage.UI.Controls.CheckBox, {
                shouldPublishMarkDirty: false
            });
            return custText;
        },
        // a filteringselect that does not get marked as dirty
        _createCustomFilteringSelect: function () {
            var CustomTxtBox = declare('Sage.UI.Controls.FieldAttributeControlFactory.customFilteringSelect', Sage.UI.FilteringSelect, {
                shouldPublishMarkDirty: false,
                required: false
            });
            return CustomTxtBox;
        },
        _createCustomCombBox: function () {
            var CustomTxtBox = declare('Sage.UI.Controls.FieldAttributeControlFactory.customComboBox', Sage.UI.ComboBox, {
                shouldPublishMarkDirty: false,
                required: false
            });
            return CustomTxtBox;
        },
        // a TextArea that does not get marked as dirty:: used by calculated fields
        _createCustomTextArea: function () {
            var CustomTxtBox = declare('Sage.UI.Controls.FieldAttributeControlFactory.customCustomTextArea', [Sage.UI.Controls.SimpleTextarea, ValidationTextBox], {
                shouldPublishMarkDirty: false,
                required: true, // if the calculation is blank, then errors will occur in the detail view of certain smartparts.
                baseClass: "dijitReset dijitInline dijitLeft dijitTextArea dijitValidationContainer",
                templateString: "<div><div class='dijitReset dijitValidationContainer'><input class='dijitReset dijitInputField dijitValidationIcon dijitValidationInner' value='Χ' type='text' tabindex='-1' readonly='readonly' role='presentation'/></div><div class='dijitReset dijitInputField dijitInputContainer'><textarea ${!nameAttrSetting} dojoAttachPoint='focusNode,containerNode,textbox' autocomplete='on'></textarea></div></div>",
                width: '100%'
            });
            return CustomTxtBox;
        },
        _FormSpecificFields: function (obj) {
            this.pickList = [];
            this.activeControls = [];
            this.hiddenValues = [];
            this.pickListManagerFormDiv = {};
            this.calculatedMapDotToLegacyPath = new Observable(new memory({ idProperty: 'dot' }));

            if (typeof (obj) !== 'undefined' && obj !== null) {
                if (typeof (obj.formData) !== 'undefined' && obj.formData !== null) {
                    this.store = obj.formData;
                }
                if (typeof (obj.viewOnly) !== 'undefined' && obj.viewOnly !== null) {
                    this.viewOnly = obj.viewOnly;
                }
                if (typeof (obj.entity) !== 'undefined' && obj.entity !== null) {
                    this.defaultEntity = obj.entity;
                }
                if (typeof (obj.picklistSchema) !== 'undefined' && obj.picklistSchema !== null) {
                    this.picklistSchema = obj.picklistSchema;
                }
            }
        },
        // go through and check what data needs to be shown and display it in the proper control.
        _createForm: function () {
            var self = this;
            var hidden = false;
            if ((typeof (this.store.ClrDataType) !== 'undefined' && this.store.show && this.store.show.indexOf('ClrDataType') >= 0)) {
                this.createAttributeEditor('ClrDataType', this._createCustomTextBox(), this.store.ClrDataType, this.viewOnly);
            }
            if ((typeof (this.store.IsEncrypted) !== 'undefined' && this.store.show && this.store.show.indexOf('IsEncrypted') >= 0)) {
                this.createAttributeEditor('IsEncrypted', this._createCustomCheckBox(), this.store.IsEncrypted, this.viewOnly);
            }
            if ((typeof (this.store.Length) !== 'undefined' && this.store.show && this.store.show.indexOf('Length') >= 0)) {
                this.createAttributeEditor('Length', this._createCustomTextBox(), this.store.Length, this.viewOnly);
            }
            if ((typeof (this.store.SqlType) !== 'undefined' && this.store.show && this.store.show.indexOf('SqlType') >= 0)) {
                this.createAttributeEditor('SqlType', this._createCustomTextBox(), this.store.SqlType, this.viewOnly);
            }
            if ((typeof (this.store.This) !== 'undefined' && this.store.show && this.store.show.indexOf('This') >= 0)) {
                this.createAttributeEditor('this', this._createCustomTextBox(), this.store.This, this.viewOnly);
            }
            if ((typeof (this.store.Precision) !== 'undefined' && this.store.show && this.store.show.indexOf('Precision') >= 0)) {
                this.createAttributeEditor('Precision', this._createCustomTextBox(), this.store.Precision, this.viewOnly);
            }
            if ((typeof (this.store.Scale) !== 'undefined' && this.store.show && this.store.show.indexOf('Scale') >= 0)) {

                this.createAttributeEditor('Scale', this._createCustomTextBox(), this.store.Scale, this.viewOnly);
            }
            if ((typeof (this.store.IsPercentage) !== 'undefined' && this.store.show && this.store.show.indexOf('IsPercentage') >= 0)) {
                this.createAttributeEditor('IsPercentage', this._createCustomCheckBox(), this.store.IsPercentage, this.viewOnly);
            }
            if ((typeof (this.store.MultiSelect) !== 'undefined' && this.store.show && this.store.show.indexOf('MultiSelect') >= 0)) {
                this.createAttributeEditor('MultiSelect', this._createCustomCheckBox(), this.store.MultiSelect, this.viewOnly);
            }
            if ((typeof (this.store.OverriddenName) !== 'undefined' && this.store.show && this.store.show.indexOf('OverriddenName') >= 0)) {
                this.createAttributeEditor('OverriddenName', this._createCustomTextBox(), this.store.OverriddenName, this.viewOnly);
            }
            if ((typeof (this.store.StorageOptions) !== 'undefined' && this.store.show && (this.store.show.indexOf('Storage') >= 0))) {
                hidden = typeof (this.store.ClrDataType) !== 'undefined' && this.store.ClrDataType.indexOf('Guid') >= 0;
                if (hidden) {
                    this.hiddenValues.push({ Storage: this.store.Storage });
                }
                else {
                    this.createAttributeStorage('Storage', this._createCustomFilteringSelect(), this.store.Storage, this.store.StorageOptions, this.viewOnly || this.editMode, false);
                }
            }
            if ((typeof (this.store.StorageOptions) !== 'undefined' && this.store.show && (this.store.show.indexOf('Display') >= 0))) {
                var hideAndDisable = (this.store.show.indexOf('Storage') >= 0);
                this.createAttributeStorage('Display', this._createCustomFilteringSelect(), this.store.Display, this.store.DisplayOptions, hideAndDisable, hideAndDisable);
            }
            if ((typeof (this.store.EnableHyperLinking) !== 'undefined' && this.store.show && this.store.show.indexOf('EnableHyperLinking') >= 0)) {
                this.createAttributeEditor('EnableHyperLinking', this._createCustomCheckBox(), this.store.EnableHyperLinking, this.viewOnly);
            }
            if ((typeof (this.store.ReturnPrimaryKey) !== 'undefined' && this.store.show && this.store.show.indexOf('ReturnPrimaryKey') >= 0)) {
                this.createAttributeEditor('ReturnPrimaryKey', this._createCustomCheckBox(), this.store.ReturnPrimaryKey, this.viewOnly);
            }
            if ((typeof (this.store.PickListName) !== 'undefined' && this.store.show && this.store.show.indexOf('PickListName') >= 0)) {
                this._grabPickList();
                this.createAttributeStorage('PickListName', this._createCustomCombBox(), this.store.PickListName, this.pickList, this.viewOnly, false);
                dojoConnect.subscribe('Sage/picklist/form/reload', lang.hitch(this, this.reloadPickListForm));
            }
            if ((typeof (this.store.AllowMultiples) !== 'undefined' && this.store.show && this.store.show.indexOf('AllowMultiples') >= 0)) {
                this.createAttributeEditor('AllowMultiples', this._createCustomCheckBox(), this.store.AllowMultiples, this.viewOnly);
            }
            if ((typeof (this.store.AlphaSort) !== 'undefined' && this.store.show && this.store.show.indexOf('AlphaSort') >= 0)) {
                this.createAttributeEditor('AlphaSort', this._createCustomCheckBox(), this.store.AlphaSort, this.viewOnly);
            }
            if ((typeof (this.store.MustExistInList) !== 'undefined' && this.store.show && this.store.show.indexOf('MustExistInList') >= 0)) {
                this.createAttributeEditor('MustExistInList', this._createCustomCheckBox(), this.store.MustExistInList, this.viewOnly);
            }
            if ((typeof (this.store.NoneEditable) !== 'undefined' && this.store.show && this.store.show.indexOf('NoneEditable') >= 0)) {
                this.createAttributeEditor('NoneEditable', this._createCustomCheckBox(), this.store.NoneEditable, this.viewOnly);
            }
            if ((typeof (this.store.PickListFilter) !== 'undefined' && this.store.show && this.store.show.indexOf('PickListFilter') >= 0)) {
                this.createAttributeEditor('PickListFilter', this._createCustomTextBox(), this.store.PickListFilter, this.viewOnly);
            }
            if ((typeof (this.store.ValueStoredAsText) !== 'undefined' && this.store.show && this.store.show.indexOf('ValueStoredAsText') >= 0)) {
                this.createAttributeEditor('ValueStoredAsText', this._createCustomCheckBox(), this.store.ValueStoredAsText, this.viewOnly || this.editMode);
            }
            if ((typeof (this.store.DisplayName) !== 'undefined' && this.store.show && (this.store.show.indexOf('DisplayName') >= 0))) {
                hidden = typeof (this.store.ThisObj) !== 'undefined' && this.store.ThisObj.indexOf('Calculated String field') >= 0;
                if (hidden) {
                    this.hiddenValues.push({ DisplayName: this.store.DisplayName });
                }
                else {
                    this.createAttributeEditor('Display', this._createCustomTextBox(), this.store.DisplayName, this.viewOnly);
                }
            }
            if ((typeof (this.store.Description) !== 'undefined' && this.store.show && (this.store.show.indexOf('Description') >= 0))) {
                this.createAttributeEditor('Description', this._createCustomTextBox(), this.store.Description, this.viewOnly && (this.store.show.indexOf('Template') < 0));
            }
            if ((typeof (this.store.Template) !== 'undefined' && this.store.show && (this.store.show.indexOf('Template') >= 0))) {
                this._createDropDownSelectorWithDisplayTextField('Template', this.store.Template, this.viewOnly, true);
            }
        },
        // Creates a pair of controls, one relying on the other: A Property Selector that can populate a textbox.
        _createDropDownSelectorWithDisplayTextField: function (attach, store, dis, useProperties) {
            var selfAware = this;
            var Widget = this._createCustomTextArea();

            var useAsDropDown = null;
            var typeFilter = [{ name: 'calculated', value: false }];
            var buttonArry = [];
            if (this.store.type !== 0) {
                typeFilter.push({ name: 'number', value: true });
            }

            if (store && store !== '') {
                this._buildDotPathFromLegacy(store); // converts and adds to the property list
            }

            store = this._convertLegacyToDot(store); // converts for use in text area

            var valArr = [];
            var values = null;
            var cntr = {
                PropertyDropDown: new PropertyDropDown({
                    entityName: this.defaultEntity,
                    Keywords: typeFilter,
                    allMatch: true,
                    required: false
                }),
                TextBox: new Widget({
                    value: store,
                    shouldPublishMarkDirty: false,
                    autoComplete: true,
                    isValid: function () {
                        var validity = this.textbox.value.replace(/\s+$/g) !== '';
                        if (!validity) {
                            this.textbox.validity.badInput = true;
                            this.textbox.validity.tooShort = true;
                            this.textbox.validity.valueMissing = true;
                            this.textbox.validity.valid = false;
                        }
                        if (selfAware.store.type !== 0) {
                            var re = new RegExp('({.*?}|[0-9]|[+]|[*]|[/]|[(]|[)]|[-])', 'gm'),
                                str = this.textbox.value,
                                matchesStr = '',
                                m;
                            while ((m = re.exec(str)) !== null) {
                                if (m.index === re.lastIndex) {
                                    re.lastIndex++;
                                }
                                matchesStr = matchesStr + m[0];

                            }
                            validity = validity && matchesStr.length === this.textbox.value.length;
                            if (!validity) {
                                this.textbox.validity.badInput = true;
                                this.textbox.validity.valid = false;
                            }
                            else {
                                this.textbox.validity.badInput = false;
                                this.textbox.validity.valid = true;
                            }
                        }
                        return validity;
                    }
                })
            };

            if (this.store.type !== 0) {
                cntr.TextBox.invalidMessage = nlsResource.CalculatedNumberInputError;
                var btnLbl = [{ l: '+', t: nlsResource.add }, { l: '-', t: nlsResource.substract }, { l: '*', t: nlsResource.multiply }, { l: '/', t: nlsResource.divide }, { l: '(', t: nlsResource.openParens }, { l: ')', t: nlsResource.closeParens }];
                var buttonListCntrl = this.domConstruct.toDom(this.buttonListTemplate.apply());

                for (var ix = 0; ix < btnLbl.length; ix++) {
                    var myButton = new dijitButton({
                        label: btnLbl[ix].l,
                        title: btnLbl[ix].t,
                        onClick: function () {
                            cntr.TextBox.textbox.value = dString.substitute('${0}${1}', [cntr.TextBox.textbox.value, this.label]);
                        }
                    });
                    this.domClass.add(myButton.domNode, 'calcuNumberButton');
                    buttonListCntrl.appendChild(myButton.domNode);
                }
                cntr.ButtonList = buttonListCntrl;

            }
            this.domClass.remove(cntr.PropertyDropDown.domNode, 'dijitInline');
            this.domClass.remove(cntr.TextBox.domNode, 'dijitInline');

            // This updates the Template Textbox when the property drop down's selected a value
            cntr.PropertyDropDown.entitySelected.onChange = function () {
                var selected = cntr.PropertyDropDown.tree.selectedItem;
                if (selected) {
                    var cValue = selected.columName;
                    if (typeof (cValue) !== 'undefined' && cValue !== '') {
                        selfAware.calculatedMapDotToLegacyPath.put({ dot: cValue, legacy: selected.legacyPath });
                        cntr.TextBox.set('value', dString.substitute('${0}{${1}}', [cntr.TextBox.get('value'), cValue]));
                    }
                }
            };

            // create a blank line with the control group's label
            this.activeControls.push({ label: nlsResource[attach], name: attach, control: null, isDom: false, template: 'rowTemplate', display: 'display', Include: true, fieldClassAppendix: 'typeattributedetails' });
            this.activeControls.push({ label: nlsResource['AddField'], name: attach, control: cntr.PropertyDropDown, isDom: false, template: 'rowTemplate', display: 'display', Include: false, fieldClassAppendix: 'typeattributedetails' });
            if (cntr.ButtonList) {
                this.activeControls.push({ label: '', name: attach, control: cntr.ButtonList, isDom: true, template: 'rowTemplate', display: 'display', Include: false, fieldClassAppendix: 'typeattributedetails' });
            }
            this.activeControls.push({ label: '', name: attach, control: cntr.TextBox, isDom: false, template: 'rowTemplate', display: 'display', Include: true, fieldClassAppendix: 'typeattributedetails' });

            return cntr;
        },
        //Used to parse out potential fields added to the template
        _grabEntityPropertyNamesFromString: function (strValue) {
            // {.+?} - looks for anything within curly braces, and takes the shortest match so in the string '{{a}{b}}'. {a} and {b} should be returned, but not {{a}{b}}.
            // . is a wildcard for anything; 
            // + means 1 or more times, since assuming no blank values in braces; 
            // ? limits the inside of the braces to shortest match.
            var regex = new RegExp(/([{].+?[}])/gm);
            var propertySplits = strValue.match(regex);

            var retVal = new memory();

            // clean up the spaces, and add to a memory data structure.
            for (var i = 0; propertySplits !== null && i < propertySplits.length; i++) {
                var name = propertySplits[i];
                name = name.replace('{', '');
                name = name.replace('}', '');
                name = name.replace(' ', '');
                if ((typeof (retVal.index[name]) === 'undefined' || retVal.index[name] < 0) && name !== '') {
                    retVal.add({ id: name, name: name });
                }
            }

            return retVal;
        },
        // takes the legacy value provided by the server, and converts it to a more readable format ('dot' notation).
        _buildDotPathFromLegacy: function (legacy) {
            var list = this._grabEntityPropertyNamesFromString(legacy);
            for (var i = 0; i < list.data.length; i++) {
                var leg = list.data[i].name;
                var dot = '';
                var regex1 = new RegExp(/([.].*?!)/gm);//find the related entities they should look like .(Related Entity)!
                var legacyParts = leg.match(regex1);
                if (legacyParts !== null && legacyParts) {
                    for (var x = 0; x < legacyParts.length; x++) {
                        var rEntity = legacyParts[x].replace('.', '').replace('!', '');
                        dot = dojoString.substitute('${0}${1}${2}', [dot, x === 0 ? '' : '.', rEntity]);
                    }
                }
                var index = leg.lastIndexOf('!');
                if (index < 0) {
                    index = -1;
                }

                dot = dojoString.substitute('${0}${1}${2}', [dot, dot.length === 0 ? '' : '.', leg.substring(index + 1)]);
                this.calculatedMapDotToLegacyPath.put({ dot: dot, legacy: leg });
            }
        },
        _convertDotToLegacy: function (value) {
            return this._propertyPathConverter(value, 'dot', 'legacy');
        },
        _convertLegacyToDot: function (value) {
            return this._propertyPathConverter(value, 'legacy', 'dot');
        },
        _propertyPathConverter: function (value, fromField, toField) {
            var together = value;
            var regex1 = new RegExp(/(.*?|[+|\\|\/|*|-]?)([{].*?[}])(.*?|[+|\\|\/|*|-]?)/gm);
            var wordList = value.match(regex1);
            var matchArray = [];
            for (var i = 0; wordList !== null && i < wordList.length; i++) {
                var word = wordList[i];
                var matchArrayEntry = { from: word, to: {} };

                var startIndex = word.indexOf('{') + 1;
                var length = word.indexOf('}') - startIndex;

                if (startIndex >= 0 && length > 0 && (length - startIndex) <= word.length) {
                    var where = word.substr(startIndex, length);

                    var qry = this.calculatedMapDotToLegacyPath.query(function (v) {
                        return v[fromField] === where;
                    });

                    var match = new memory({ data: qry });
                    if (match.data.length === 1) {
                        var basePattern = dojoString.substitute('${0}:', [this.defaultEntity]);
                        var newWord = match.data[0][toField].replace(basePattern, '');
                        word = word.replace(match.data[0][fromField], newWord);
                    }
                    matchArrayEntry.to = word;
                    matchArray.push(matchArrayEntry);
                }
            }
            for (i = 0; i < matchArray.length; i++) {
                together = together.replace(matchArray[i].from, matchArray[i].to);
            }
            return together;
        },
        // handles the creation of checkboxes and 
        createAttributeEditor: function (attach, Widget, val, dis) {
            var txt = new Widget({
                value: val,
                shouldPublishMarkDirty: false,
                disabled: dis
            });
            if (Widget.prototype.declaredClass.indexOf('CheckBox') >= 0) {
                txt.setChecked(val);
            }

            this.domClass.remove(txt.domNode, 'dijitInline');


            this.activeControls.push({ label: nlsResource[attach], name: attach, control: txt, isDom: false, template: 'rowTemplate', display: 'display', Include: true, fieldClassAppendix: 'typeattributedetails' });
        },
        createAttributeStorage: function (attach, Widget, val, options, dis, hidden) {
            var dataS = null, selfAware = this;
            if (attach === 'PickListName') {
                dataS = new memory({ data: options, idProperty: 'name' });
                attach = 'PickList';
            }
            else {
                dataS = new memory({ data: options });
            }

            var cntrl = new Widget({
                shouldPublishMarkDirty: false,
                disabled: dis,
                name: attach,
                searchAttr: 'name',
                store: dataS,
                fetchProperties: { sort: [{ attribute: 'name', descending: false }] }
            });

            var result = val;
            if (attach === 'PickList') {
                dojoAspect.before(cntrl, 'loadAndOpenDropDown', lang.partial(this._startPKListLoad, cntrl, this));
                cntrl.onChange = function () {
                    selfAware._pickListOnChange(selfAware, this.value, this.item);
                };
            }  
            if (attach === 'Storage' || attach === 'Display') {
                switch(val) {
                    case 'Text':
                    case 'TextUnicode':
                        result = options.filter(function(x){ return x.id === 'Text' || x.id === 'TextUnicode';});
                        break;
                    case 'Code':
                    case 'CodeUnicode':
                        result = options.filter(function(x){ return x.id === 'Code' || x.id === 'CodeUnicode';});
                    break;
                }
                if(result  && result.length > 0) {
                    result = result[0].id;
                }
            }
            if (attach === 'Storage' && (this.store.show.indexOf('Display') >= 0)) {
                cntrl.onChange = function () {
                    var queryResult = $(this.domNode.offsetParent.offsetParent).find("[name='Display']");
                    if (!(this.viewOnly || this.editMode) && queryResult !== null && queryResult[0] !== null) {
                        var foundControl = queryResult[0];
                        if (foundControl) {
                            foundControl.value = this.value;
                        }
                        foundControl = foundControl.previousSibling;
                        if (foundControl) {
                            foundControl.value = this.value;
                        }
                    }
                };
            }
            cntrl.set('value', result); // allows the picklist onChange override to be applied to provided data.
            this.domClass.remove(cntrl.domNode, 'dijitInline');
            this.activeControls.push({ label: nlsResource[attach], name: attach, control: cntrl, isDom: false, template: 'rowTemplate', display: hidden ? 'display-none' : 'display', Include: true, fieldClassAppendix: 'typeattributedetails' });
        },
        _pickListOnChange: function (selfAware, value, item) {
            var newDisplayText = dString.substitute("--- ${0} ---", [nlsResource.newPickList]);
            var formObject = {
                defaultLanguage: '',
                name: value || newDisplayText,
                allowMultiples: false, valueMustExist: false, required: false, alphaSorted: false, noneEditable: false,
                items: []
            };
            var hideShow = ['AllowMultiples', 'AlphaSort', 'MustExistInList', 'NoneEditable'];
            var service = Sage.Data.SDataServiceRegistry.getSDataService('system', false, true, false);
            if (typeof (item) === 'undefined' || item === null) {
                var request1 = new Sage.SData.Client.SDataResourceCollectionRequest(service);
                request1.setResourceKind('picklists')
                    .setQueryArg('select', '*') // there can be a lot of items associated with a pick list, load these once an items has been selected.
                    .setQueryArg('format', 'json')
                    .setQueryArg('where', dString.substitute("lower(name) eq '${0}'", [value.toLowerCase()]));
                request1.setQueryArg('count', 1);
                this.pickList = [];

                this.pickListLoading = true;
                request1.read({
                    async: false,
                    scope: this,
                    success: function (data) {
                        if (data.$resources && data.$resources.length > 0) {
                            item = data.$resources[0];
                            item.id = item.$key;
                            if (item.defaultLanguage) {
                                formObject.defaultLanguage = item.defaultLanguage;
                            }
                        }
                    },
                    failure: this._pkListLoadFailure
                });
            }
            var preExisting = item !== null && (item.id !== '000new');
            // check if the form is reloading, need to remove old version of form later.
            var plmIndexInActiveControls = selfAware._getIndexFromActivityListFromName('PickListForm');
            var plmIndexInActiveControlsValid = plmIndexInActiveControls > -1;

            // get reference to the drop down to possibly set the displayed value.
            var pk_cntrl_indx = this._getIndexFromActivityListFromName('PickList');
            var pk_cntrl = null;
            if (pk_cntrl_indx > -1) {
                pk_cntrl = this.activeControls[pk_cntrl_indx];
            }
            if (preExisting) { // populate with data here if we know we have data to use
                formObject.$key = item.id;
                var request2 = new Sage.SData.Client.SDataResourceCollectionRequest(service);
                request2.setResourceKind(dString.substitute("picklists('${0}')",[formObject.$key]))
                    .setQueryArg('select', '*,items/*') // there can be a lot of items associated with a pick list, load these once an items has been selected.
                    .setQueryArg('format', 'json');
                request2.setQueryArg('count', 1);
                this.pickList = [];

                this.pickListLoading = true;
                request2.read({
                    async: false,
                    scope: this,
                    success: function (data) {
                        if (data.$resources && data.$resources.length > 0) {
                            data = data.$resources[0];
                        }
                        if (data.defaultLanguage) {
                            formObject.defaultLanguage = data.defaultLanguage;
                        }
                        if (data.items && data.items.$resources) {
                            formObject.items = data.items.$resources;
                        }
                        else {
                            formObject.items = [];
                        }
                        if (this.editMode === false) {
                            this.setControlValue('AllowMultiples', data.allowMultiples);
                            this.setControlValue('AlphaSort', data.alphaSorted);
                            this.setControlValue('MustExistInList', data.valueMustExist);
                            this.setControlValue('NoneEditable', data.noneEditable);
                        }
                    },
                    failure: this._pkListLoadFailure
                });
                if (pk_cntrl !== null) {
                    pk_cntrl = pk_cntrl.control;
                    pk_cntrl.focusNode.value = value; // set in a viewable way the displayed value without triggering the onchange event
                }
            } else {
                if (value && value !== newDisplayText) {
                    formObject.name = lang.clone(value);
                    if (pk_cntrl !== null) {
                        pk_cntrl = pk_cntrl.control;
                        pk_cntrl.focusNode.value = newDisplayText; // set in a viewable way the displayed value without triggering the onchange event
                    }
                } else {
                    formObject.name = '';
                }
            }
            // hide the needed property fields, because we are using the forms
            selfAware._showHideElementsByNames(selfAware, hideShow, !preExisting, 'grandparent');

            if (plmIndexInActiveControlsValid) { // if we have an old reference to the picklist manager remove it from active list and screen
                var controlObj = this.activeControls[plmIndexInActiveControls].control.domNode;
                DomClass.add(controlObj, 'display-hidden');
                selfAware.domConstruct.destroy(controlObj);
                selfAware.activeControls.splice(plmIndexInActiveControls, 1);
            }
            // add new pick list manager
            selfAware._createPickListManagerForm(selfAware, formObject, preExisting, plmIndexInActiveControlsValid);

        },
        _createPickListManagerForm: function (selfAware, formObject, existingPickList, replace) {
            var supressFields = ['createuser', 'createdate', 'modifydate', 'modifyuser'];
            if (existingPickList) { // supress on edits
                supressFields.push('valuestoredastext');
                supressFields.push('allowmultiples');
                supressFields.push('valuemustexist');
                supressFields.push('alphasorted');
                supressFields.push('required');
                supressFields.push('noneeditable');
                supressFields.push('name');
            } else {
                supressFields.push('defaultlanguage');
            }
            var obj = {
                schemaReader: selfAware.picklistSchema,
                suppressFields: supressFields,
                excludeOnNew: [],
                formData: formObject,
                displayFormButtons: ['ok'],
                editMode: existingPickList
            };

            var plmfObj = new selfAware.picklistManagerForm(obj);
            var placement = 'after';
            var referenceNode = selfAware.attributeContainer;

            if (replace) {
                placement = 'replace';
                var plmfHeaderNode = selfAware.attributeContainer.parentNode.children[1];
                if (typeof (plmfHeaderNode) !== 'undefined') {
                    referenceNode = plmfHeaderNode;
                }
                else {
                    placement = 'after';
                }
            }
            selfAware.domConstruct.place(plmfObj.domNode.firstChild, referenceNode, placement);
            selfAware.activeControls.push({ label: '', name: 'PickListForm', control: plmfObj, isDom: true, template: 'rowTemplate', display: 'display', Include: true, fieldClassAppendix: 'typeattributedetails' });
        },
        reloadPickListForm: function (value) {
            this._grabPickList(false);
            var pk_idx = this._getIndexFromActivityListFromName('PickList');
            var pk_cntrl = this.activeControls[pk_idx].control;
            // Force an onChange to occur by resetting the value in the picklist to the standard new pick list label
            if (pk_cntrl.displayedValue === value.name) {
                pk_cntrl.set('value', '--- ' + nlsResource.newPickList + ' ---');
            }
            this.formStatus = 1; // used to limit access to the pick list after onChange event
            dojoAspect.after(pk_cntrl, 'onChange', lang.hitch(this, function () {
                if (this.formStatus === 1) {
                    this.formStatus = 0;
                    value.id = value.$key;
                    if (value) {
                        this._pickListOnChange(this, value.name, value);
                    }
                }
            }));

            pk_cntrl.set('value', value.name);
        },
        _grabPickList: function (async, count) {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(Sage.Data.SDataServiceRegistry.getSDataService('system', false, true, false));
            if (typeof (count) === 'undefined' || count === null) {
                count = 500;
            }
            request.setResourceKind('picklists')
                .setQueryArg('select', '*') // grab the items only once the picklist has been selected.
                .setQueryArg('orderby', 'name')
                .setQueryArg('format', 'json');
            request.setQueryArg('count', count);

            this.pickList = [];
            if (typeof (async) === 'undefined' || async === null) {
                async = true;
            }
            this.pickListLoading = true;
            var key = request.read({
                async: async,
                scope: this,
                success: this._pkListLoadSuccess,
                failure: this._pkListLoadFailure
            });
        },
        _startPKListLoad: function (cntrl, context) {
            var domForStandby=cntrl.domNode;
            var standby = new dojox.widget.Standby({
                target: domForStandby,
                color: 'white',
                image: 'css/themes/inforSoHoXi/images/loadingAnimation.gif'
            });
            domForStandby.appendChild(standby.domNode);

            if (context.pickListLoading) {
                standby.startup();
                standby.show();
            }
            var closeItDown = function () {
                standby.hide();
            };
            dojoAspect.before(cntrl, 'closeDropDown', closeItDown);
        },
        _pkListLoadSuccess: function (data) {
            this.pickListLoading = false;
            var plFields = data.$resources;
            for (var i = 0; i <= plFields.length - 1; i++) {
                this.pickList.push({
                    id: plFields[i].$key,
                    name: plFields[i].$descriptor,
                    use: plFields[i].name,
                    items: plFields[i].items
                });
            }
            if (Sage.Services.getService('RoleSecurityService').hasAccess('Administrator/Picklist/add')) {
                this.pickList.push({
                    id: '000new',
                    name: '--- ' + nlsResource.newPickList + ' ---',
                    use: '--- ' + nlsResource.newPickList + ' ---',
                    items: null
                });
            }
            // update the pick list store so that newly created lists get included.
            var control_index = this._getIndexFromActivityListFromName('PickList');
            var control = null;
            if (control_index > -1) {
                control = this.activeControls[control_index];
            }
            if (control !== null && control.control) {
                control.control.set('store', new memory({ data: this.pickList, idProperty: 'name' }));
            }
        },
        _pkListLoadFailure: function (error) {
            this.pickListLoading = false;
            if (error) {
                console.error(error);
            }
        },
        customValidation: function (ob) {
            if (typeof (ob.control.isValid) === 'function') {
                if (ob.Include && ob.name === 'Template' || ob.name === 'PickListForm') {
                    var validControl = ob.control.isValid(true);
                    if (ob.name === 'PickListForm' && validControl) {
                        this._grabPickList();
                    } else {
                        return null;
                    }
                    return validControl;
                }
                else {
                    return ob.control.isValid(true);
                }
            }
            return null;
        },
        _getActiveValuesAdjustments: function () {
            var holder = {};
            var newPL = this.activeControls.filter(function (c) { return c.name.toLowerCase() === 'picklistform'; });
            if (typeof (newPL) === 'object' && newPL.length && newPL.length > 0) {
                newPL = newPL[0].control;
                var valueArr = newPL.getActiveValues();
                var doNotMatchByName = [{ name: 'alphasort', key: 'alphaSorted' }, { name: 'mustexistinlist', key: 'valueMustExist' }];
                var listOfList = [newPL.activeControls, doNotMatchByName];
                for (var lol_i = 0; lol_i < listOfList.length; lol_i++) {
                    var lol_item = listOfList[lol_i];
                    for (var ilol_i = 0; ilol_i < lol_item.length; ilol_i++) {
                        var ilol_item = lol_item[ilol_i];
                        var grab = this.activeControls.filter(function (c) {
                            return c.name.toLowerCase() === ilol_item.name.toLowerCase();
                        });
                        if (typeof (grab) === 'object' && grab.length && grab.length > 0) {
                            var potential_V = valueArr[ilol_item.name];
                            if (typeof (potential_V) === 'undefined' && ilol_item.key && typeof (valueArr[ilol_item.key]) !== 'undefined') {
                                potential_V = valueArr[ilol_item.key];
                            }
                            if (typeof (potential_V) !== 'undefined') {
                                holder[grab[0].name] = potential_V;
                            }
                        }
                    }
                }
                var newName=valueArr['name'];
                if (typeof (newName) !== 'undefined') {
                    holder['PickListName'] = newName;
                }
            }
            return holder;
        },
        _changeObjectPathParameters: function (path, value, propName, skip, stringifyValue) {
            // build path is used to build json object.
            return {
                propName: propName === 'PickList' ? 'PickListName' : propName,
                path: path === 'PickList' ? 'PickListName' : path,
                builtUpPath: dString.substitute('"${0}":${1}', [propName === 'PickList' ? 'PickListName' : propName, JSON.stringify(value)]),
                skip: skip,
                stringify: stringifyValue,
                lineEscape: ''
            };
        }
    });

    return widget;
});