require({cache:{
'url:Sage/UI/Controls/templates/Name.html':"<div class=\"person\" slxcompositecontrol=\"true\" id=\"{%= $.id %}\" ><input id=\"{%= $.id %}-TextBox\" value=\"{%= $.nameDesc %}\"\r\n    data-dojo-type=\"Sage.UI.Controls.TextBox\" name=\"{%= $.name %}\" required=\"{%= $.required %}\" readonly=\"{%= $.readonly %}\" dojoAttachPoint=\"focusNode\"  data-dojo-attach-event=\"onChange:textBoxOnChange, onDblClick: showDialog\" data-dojo-props=\"textWithIcons: {%= $.buttonVisible %}\" />\r\n    {% if ($.buttonVisible) { %}\r\n    <img alt=\"{%= $.buttonToolTip %}\"  data-dojo-attach-event=\"ondijitclick: showDialog\"  tabindex=\"{%= $.tabIndex %}\"     \r\n    style=\"padding-left:0;cursor: pointer; vertical-align: left;\" \r\n    src=\"{%= $.buttonImageUrl %}\" title=\"{%= $.buttonToolTip %}\" id=\"{%= $.id %}-Button\" />\r\n    {% } %}\r\n<!--\r\nSimplate template\r\nhttps://github.com/mmorton/simplate\r\nhttps://github.com/mmorton/simplate/blob/master/demo/index.html\r\nBasic formatting example: {%= $.id %}\r\n-->\r\n</div>",
'url:Sage/UI/Controls/templates/PersonName.html':"<!--\r\nSimplate template\r\nhttps://github.com/mmorton/simplate\r\nhttps://github.com/mmorton/simplate/blob/master/demo/index.html\r\nBasic formatting example: {%= $.id %}\r\n-->\r\n<div>\r\n        <table width=\"100%\">\r\n            <tr>\r\n                <td><label>{%= $.prefixText %}</label></td>\r\n                <td>\r\n                    <select id=\"{%= $.id %}-Prefix\" data-dojo-type=\"Sage.UI.Controls.DropDownSelectPickList\" \r\n                    dojoAttachPoint=\"_valueBox\"\r\n                    pickListName=\"Name Prefix\"\r\n                    storeMode=\"text\"\r\n                    noDataLoad=\"false\"\r\n                    useCache=\"false\"\r\n                    boundLanguage=\"{%= $.prefixLanguage %}\"\r\n                    filterByLanguage=\"{%= $.prefixLanguageFilters %}\"\r\n                    name=\"{%= $.NamePrefix %}\" \r\n                    style=\"display: inline-block\"\r\n                    shouldPublishMarkDirty=\"false\" />\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td><label>{%= $.nameFirstText %}</label></td>\r\n                <td>\r\n                    <input id=\"{%= $.id %}-First\" data-dojo-type=\"Sage.UI.Controls.TextBox\"\r\n                    style=\"width:inherit;\"\r\n                    textAlign=\"{%= $.textAlign %}\"\r\n                    name=\"{%= $.NameFirst %}\" type=\"text\" data-dojo-attach-point=\"focusNode\"\r\n                    shouldPublishMarkDirty=\"false\">\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td><label>{%= $.nameMiddleText %}</label></td>\r\n                <td>\r\n                    <input id=\"{%= $.id %}-Middle\" data-dojo-type=\"Sage.UI.Controls.TextBox\"\r\n                    style=\"width:inherit;\"\r\n                    textAlign=\"{%= $.textAlign %}\"\r\n                    name=\"{%= $.NameMiddle %}\" type=\"text\" data-dojo-attach-point=\"focusNode\"\r\n                    shouldPublishMarkDirty=\"false\">\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td><label>{%= $.nameLastText %}</label></td>\r\n                <td>\r\n                    <input id=\"{%= $.id %}-Last\" data-dojo-type=\"Sage.UI.Controls.TextBox\"\r\n                    style=\"width:inherit;\"\r\n                    textAlign=\"{%= $.textAlign %}\"\r\n                    name=\"{%= $.NameLast %}\" type=\"text\" data-dojo-attach-point=\"focusNode\"\r\n                    shouldPublishMarkDirty=\"false\">\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td><label>{%= $.suffixText %}</label></td>\r\n                <td>\r\n                    <select id=\"{%= $.id %}-Suffix\" data-dojo-type=\"Sage.UI.Controls.DropDownSelectPickList\"\r\n                    dojoAttachPoint=\"_valueBox\"\r\n                    pickListName=\"Name Suffix\"\r\n                    storeMode=\"text\"\r\n                    noDataLoad=\"false\"\r\n                    useCache=\"false\"\r\n                    boundLanguage=\"{%= $.suffixLanguage %}\"\r\n                    filterByLanguage=\"{%= $.suffixLanguageFilters %}\"\r\n                    name=\"{%= $.NameSuffix %}\"\r\n                    style=\"display: inline-block\"\r\n                    shouldPublishMarkDirty=\"false\" />\r\n                </td>\r\n            </tr>\r\n        </table>                    \r\n        <div class=\"button-bar alignright\" style=\"clear: both\">\r\n            <button id=\"{%= $.id %}-OKButton\" data-dojo-type=\"dijit.form.Button\" type=\"submit\" onClick=\"dijit.byId('{%= $.id %}')._okClicked();\">\r\n                {%= $.okText %}\r\n            </button>\r\n            <button id=\"{%= $.id %}-CancelButton\" data-dojo-type=\"dijit.form.Button\" type=\"button\" onClick=\"dijit.byId('{%= $.id %}')._cancelClicked();\">\r\n                {%= $.cancelText %}\r\n            </button>\r\n        </div>\r\n</div>\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/Name", [
        'dojo/_base/lang',
        'dojo/_base/declare',
        'dojo/i18n',
        'dijit/_Widget',
        'Sage/_Templated',
        'Sage/UI/Controls/TextBox',
        'Sage/UI/Controls/PickList',
        'Sage/UI/Controls/DropDownSelectPickList',
        'dijit/Dialog',
        'Sage/UI/Controls/_DialogHelpIconMixin',
        'dojo/i18n!./nls/Name',
        'dojo/text!./templates/Name.html',
        'dojo/text!./templates/PersonName.html',
        'dijit/registry'
],
// ReSharper disable InconsistentNaming
function (
    lang,
    declare, 
    i18n,
    _Widget,
    _Templated,
    textBox, 
    pickList,
    dropDownSelectPickList,
    dialog,
    _DialogHelpIconMixin,
    nlsBundle,
    nameTemplate,
    personNameTemplate,
    registry
 ) {
// ReSharper restore InconsistentNaming
    /**
    * @class Class for name control TextBox with edit dialog.
    */
    var widget = declare('Sage.UI.Controls.Name', [_Widget, _Templated], {
        //using Simplate to faciliate conditional display
        widgetTemplate: new Simplate(nameTemplate.split('\r')),
        dialogContent: new Simplate(personNameTemplate.split('\r')),
        templateOverridePath: 'templates/PersonName-Override.html', //i.e. 'templates/PersonName-Override.html'
        widgetsInTemplate: true,
        clientId: '',
        nameDesc: '',
        buttonImageUrl: '',
        buttonToolTip: '',
        buttonVisible: true,
        tabIndex: 0,
        //Name data object
        //name: {},
        //TODO: Move up into Name object once sdata name object structure is determined.
        prefix: '',
        prefixLanguage: '',
        prefixLanguageFilters: false,
        first: '',
        middle: '',
        last: '',
        suffix: '',
        suffixLanguage: '',
        suffixLanguageFilters: false,
        //PickList Data
        'Name Prefix': {},
        'Name Suffix': {},
        'LastName Prefix': {},
        //.net bound controls
        name: '',
        prefixClientId: '',
        prefixlanguageclientid: '',
        prefixlanguagefiltersclientid: '',
        nameFirstClientId: '',
        nameMiddleClientId: '',
        nameLastClientid: '',
        suffixClientId: '',
        suffixlanguageclientid: '',
        suffixlanguagefiltersclientid: '',
        required: false,
        //.net properties
        autoPostBack: false,
        constructor: function (options) {
            options.id = options.clientId;
            this.resources = i18n.getLocalization('Sage.UI.Controls', 'Name');
            if (options.templateOverridePath && options.templateOverridePath.length > 0) {
                try {
                    //Dynamic caching need to be obscured from the builder by using the dojo['cache'] calling method
                    this.dialogContent = new Simplate(dojo['cache']('Sage.UI.Controls', options.templateOverridePath).split('\r'));
                }
                catch (e) {
                    // No overriding templates exists.
                    console.log('Could not load template:' + e.description);
                }
            }
        },
        postCreate: function () {
            this.getDotNetData();
            this.loadPickLists();

            if (this["class"] && this["class"].length > 0 && this.domNode.firstChild) {
                this.domNode.firstChild.className = this["class"] + ' ' + this.domNode.firstChild.className;
            }
            this.inherited(arguments);
        },
        loadPickLists: function () {
            var prefixDef = new dojo.Deferred();
            var suffixDef = new dojo.Deferred();
            var lastPreDef = new dojo.Deferred();
            var browser = document.cookie['SLXLanguageSetting'] || navigator.userLanguage || navigator.browserLanguage || navigator.language;

            this.prefixLanguage = this.prefixLanguage && typeof (this.prefixLanguage) === 'string' ? this.prefixLanguage.trim() : browser;
            this.suffixLanguage = this.suffixLanguage && typeof (this.suffixLanguage) === 'string' ? this.suffixLanguage.trim() : browser;

            var pickListConfig = {
                pickListName: 'Name Prefix', // Required
                canEditText: false,
                itemMustExist: true,
                maxLength: -1,
                storeMode: 'text', // text, id, code
                sort: true,
                displayMode: 'AsControl',
                required: false,
                useCache: false,
                autoPostBack: false,
                filterByLanguage: this.prefixLanguageFilters || false,
                boundLanguage: this.prefixLanguage
            };

            var prefixPickList = new pickList(pickListConfig);
            prefixPickList.getPickListData(prefixDef);
            prefixDef.then(dojo.hitch(this, this.storePickListData), function (e) {
                console.error(e); // errback
            });

            pickListConfig.pickListName = 'Name Suffix';
            pickListConfig.boundLanguage = this.suffixLanguage;
            pickListConfig.filterByLanguage = this.suffixLanguageFilters || false;
            var suffixPickList = new pickList(pickListConfig);
            suffixPickList.getPickListData(suffixDef);
            suffixDef.then(dojo.hitch(this, this.storePickListData), function (e) {
                console.error(e); // errback
            });

            pickListConfig.pickListName = 'LastName Prefix';
            pickListConfig.boundLanguage = browser;
            pickListConfig.filterByLanguage = false;
            var lastNamePrefixPickList = new pickList(pickListConfig);
            lastNamePrefixPickList.getPickListData(lastPreDef);
            lastPreDef.then(dojo.hitch(this, this.storePickListData), function (e) {
                console.error(e); // errback
            });

        },
        storePickListData: function (data) {
            this[data.name].data = data;
        },
        showDialog: function () {
            if (!this.buttonVisible)
                return;

            this.editDialog = registry.byId([this.id, '-Dialog'].join(''));
            if (!this.editDialog) {
                this.editDialog = new dialog({
                    title: this.resources.dialogTitle,
                    id: [this.id, '-Dialog'].join('')
                });
            }
            this.editDialog.set("content", this.dialogContent.apply({ 
                id: this.id,
                prefixText: this.resources.prefixText,
                nameFirstText: this.resources.nameFirstText,
                nameMiddleText: this.resources.nameMiddleText,
                nameLastText: this.resources.nameLastText,
                suffixText: this.resources.suffixText,
                cancelText: this.resources.cancelText,
                okText: this.resources.okText,
                prefixLanguage: this.prefixLanguage,
                prefixLanguageFilters: this.prefixLanguageFilters,
                suffixLanguage: this.suffixLanguage,
                suffixLanguageFilters: this.suffixLanguageFilters

            }));

            this.setEditFields();
            // mixin help icon
            lang.mixin(this.editDialog, new _DialogHelpIconMixin());
            this.editDialog.createHelpIconByTopic('editname');
            this.editDialog.show();
            if (this.modality === 'modeless') {
                dojo.destroy([this.id, '-Dialog_underlay'].join(''));
            }
        },
        textBoxOnChange: function (value) {
            if (value !== this.formatName()) {
            this.parseName(value);
            this.setDotNetData();
            dojo.publish("Sage/events/markDirty");
            }
        },
        parseName: function (value) {
            var parseText = value.split(' ');
            var i, item;
            var lastNamePrefix = '';
            this.prefix = '';
            this.first = '';
            this.middle = '';
            this.last = '';
            this.suffix = '';

            //See if the first value is a prefix and shift it.        
            for (i = 0; i < this['Name Prefix'].data.items.$resources.length; i++) {
                item = this['Name Prefix'].data.items.$resources[i];
                if (item.text.toUpperCase() === parseText[0].toUpperCase()) {
                    this.prefix = parseText[0];
                    // Remove the prefix after it has been evaluated and 
                    parseText.shift();
                    break;
                }
            }

            //See if the last value is a suffix and pop it.
            for (i = 0; i < this['Name Suffix'].data.items.$resources.length; i++) {
                item = this['Name Suffix'].data.items.$resources[i];
                if (item.text.toUpperCase() === parseText[parseText.length - 1].toUpperCase()) {
                    this.suffix = parseText[parseText.length - 1];
                    // Remove the suffix after it has been evaluated.
                    parseText.pop();
                    break;
                }
            }

            //If the last item matches a LastName Prefix, append it to the last name
            if (parseText.length > 0) {
                for (i = 0; i < this['LastName Prefix'].data.items.$resources.length; i++) {
                    item = this['LastName Prefix'].data.items.$resources[i];
                    if (item.text.toUpperCase() === parseText[parseText.length - 1].toUpperCase()) {
                        lastNamePrefix = parseText[parseText.length - 1] + ' ';
                        // Remove the suffix after it has been evaluated.
                        parseText.pop();
                        break;
                    }
                }
            }
            //We may have up to three values left First, Middle, and Last
            switch (parseText.length) {
                case 3:
                    this.first = parseText[0];
                    this.middle = parseText[1];
                    this.last = lastNamePrefix + parseText[2];
                    break;
                case 2:
                    this.first = parseText[0];
                    this.last = lastNamePrefix + parseText[1];
                    break;
                default:
                    this.last = lastNamePrefix + parseText[0];
            }
        },
        getEditFields: function () {
            this.updateNameObj();
                this.setDotNetData();
            dojo.publish("Sage/events/markDirty");
        },
        updateNameObj: function () {
            if (registry.byId([this.id, '-Prefix'].join(''))) {
                this.prefix = registry.byId([this.id, '-Prefix'].join('')).comboBox.get('value');
            }
            if (registry.byId([this.id, '-First'].join(''))) {
                this.first = registry.byId([this.id, '-First'].join('')).get('value');
            }
            if (registry.byId([this.id, '-Middle'].join(''))) {
                this.middle = registry.byId([this.id, '-Middle'].join('')).get('value');
            }
            if (registry.byId([this.id, '-Last'].join(''))) {
                this.last = registry.byId([this.id, '-Last'].join('')).get('value');
            }
            if (registry.byId([this.id, '-Suffix'].join(''))) {
                this.suffix = registry.byId([this.id, '-Suffix'].join('')).comboBox.get('value');
            }
        },
        getDotNetData: function () {
            //summary:
            //We have a connected .net control to post values to.
            if (this.prefixClientId !== '') {
                this.prefix = dojo.byId(this.prefixClientId).value;
            }
            if (this.prefixlanguageclientid !== '') {
                this.prefixLanguage = dojo.byId(this.prefixlanguageclientid).value;
            }
            if (this.prefixlanguagefiltersclientid !== '') {
                this.prefixLanguageFilters = dojo.byId(this.prefixlanguagefiltersclientid).checked;
            }
            if (this.nameFirstClientId !== '') {
                this.first = dojo.byId(this.nameFirstClientId).value;
            }
            if (this.nameMiddleClientId !== '') {
                this.middle = dojo.byId(this.nameMiddleClientId).value;
            }
            if (this.nameLastClientid !== '') {
                this.last = dojo.byId(this.nameLastClientid).value;
            }
            if (this.suffixClientId !== '') {
                this.suffix = dojo.byId(this.suffixClientId).value;
            }
            if (this.suffixlanguageclientid !== '') {
                this.suffixLanguage = dojo.byId(this.suffixlanguageclientid).value;
            }
            if (this.suffixlanguagefiltersclientid !== '') {
                this.suffixLanguageFilters = dojo.byId(this.suffixlanguagefiltersclientid).checked;
            }
        },
        setDotNetData: function () {
            dojo.byId(this.prefixClientId).value = this.prefix;
            dojo.byId(this.prefixlanguageclientid).value = this.prefixLanguage;
            dojo.byId(this.prefixlanguagefiltersclientid).checked = this.prefixLanguageFilters;
            dojo.byId(this.nameFirstClientId).value = this.first;
            dojo.byId(this.nameMiddleClientId).value = this.middle;
            dojo.byId(this.nameLastClientid).value = this.last;
            dojo.byId(this.suffixClientId).value = this.suffix;
            dojo.byId(this.suffixlanguageclientid).value = this.suffixLanguage;
            dojo.byId(this.suffixlanguagefiltersclientid).checked = this.suffixLanguageFilters;
        },
        setEditFields: function () {
            this._setNameSelectField(registry.byId([this.id, '-Prefix'].join('')), this.prefix);
            this._setNameInputField(registry.byId([this.id, '-First'].join('')), this.first);
            this._setNameInputField(registry.byId([this.id, '-Middle'].join('')), this.middle);
            this._setNameInputField(registry.byId([this.id, '-Last'].join('')), this.last);
            this._setNameSelectField(registry.byId([this.id, '-Suffix'].join('')), this.suffix);
        },
        _setNameSelectField: function (registeredNode, data) {
            if (registeredNode) {
                registeredNode.comboBox.set('value', this.prefix);
                var pickListName = registeredNode.pickListName;
                if (this[pickListName] && this[pickListName].data) {
                    registeredNode.setItems(this[pickListName].data);
                }
            }
        },
        _setNameInputField: function (registeredNode, data) {
            if (registeredNode) {
                registeredNode.set('value', data);
                registeredNode.set('style', 'width:100%');
            }
        },
        _okClicked: function () {
            this.getEditFields();
            if (this.focusNode.value !== this.formatName()) {        
                this.focusNode.set('value', this.formatName());
                dojo.publish("Sage/events/markDirty");
            }
        },
        _cancelClicked: function () {
            this.editDialog.hide();
        },
        formatName: function () {
            var name = ((this.prefix === "") ? "" : this.prefix + ' ');
            name += ((this.first === "") ? "" : this.first + ' ');
            name += ((this.middle === "") ? "" : this.middle + ' ');
            name += ((this.last === "") ? "" : this.last + ' ');
            name += ((this.suffix === "") ? "" : this.suffix);
            name = name.trim();
            return name;
        }

    });

    return widget;
});

