require({cache:{
'url:Sage/UI/Controls/templates/Address.html':"<div class=\"address-container\" id=\"{%= $.clientId %}\">\r\n    <!--\r\n    -- IMPORTANT: Comments in a widget template must be placed inside the root node.\r\n    Simplate template\r\n    https://github.com/mmorton/simplate\r\n    https://github.com/mmorton/simplate/blob/master/demo/index.html\r\n    Basic formatting example: {%= $.id %}\r\n    -->\r\n    <textarea id=\"{%= $.clientId %}_displayText1\" class=\"address-textarea\" style=\"height:{%= $.height %};\"\r\n              data-dojo-type=\"Sage.UI.Controls.SimpleTextarea\" textareaclass=\"{%= $.styleSchemaClass %}\" readonly=\"readonly\" dragrestriction=\"true\" tabindex=\"{%= $.tabIndex %}\"\r\n              {% if ($.enabled && !$.readonly) { %}\r\n              data-dojo-attach-event=\"onDblClick: showDialog, ondijitclick: showDialog\"\r\n              {% } %}\r\n              slxchangehook=\"true\">{%= $.displayValue %}</textarea>\r\n    {% if ($.enabled && !$.readOnly) { %}\r\n    <img alt=\"{%= $.imageData.imageEditAltText %}\" data-dojo-attach-event=\"ondijitclick: showDialog\" class=\"address-edit-button\"\r\n         src=\"{%= $.imageData.imageEditUrl %}\" title=\"{%= $.imageData.imageEditToolTip %}\" id=\"{%= $.clientId %}-Button\"\r\n         tabindex=\"{%= $.tabIndex %}\" />\r\n    {% } %}\r\n    {% if ($.enabled && $.showButton) { %}\r\n    <img alt=\"{%= $.imageData.imageMapQuestAltText %}\" data-dojo-attach-event=\"ondijitclick: showMap\" class=\"address-map-button\"\r\n         src=\"{%= $.imageData.imageMapQuestUrl %}\" title=\"{%= $.imageData.imageMapQuestToolTip %}\" id=\"{%= $.clientId %}-MapQuest\"\r\n         tabindex=\"{%= $.tabIndex %}\" />\r\n    {% } %}\r\n</div>",
'url:Sage/UI/Controls/templates/AddressEdit.html':"<!--\r\nSimplate template\r\nhttps://github.com/mmorton/simplate\r\nhttps://github.com/mmorton/simplate/blob/master/demo/index.html\r\nBasic formatting example: {%= $.id %}\r\n-->\r\n<div>\r\n        <table style=\"width:100%;height:100%;\">\r\n                {% for (var i = 0; i < $.fields.length; i++) { %}\r\n                {% if ($.fields[i].visible) { %}\r\n                    <tr>\r\n                        <td><label>{%= $.fields[i].fieldLabel %}</label></td>\r\n                        <td style=\"width: 150px;\">\r\n                            {% if ($.fields[i].xtype === 'picklistcombo') { %}\r\n                            <select data-dojo-type=\"Sage.UI.Controls.DropDownSelectPickList\"\r\n                                dojoAttachPoint=\"_valueBox\"\r\n                                pickListName=\"{%= $.fields[i].pickList.pickListName %}\"\r\n                                storeMode=\"text\"\r\n                                style=\"width: 100%;\"\r\n                                value=\"{%= $.fields[i].value %}\"\r\n                                itemMustExist=\"{%= $.fields[i].pickList.itemMustExist %}\"\r\n                                canEditText=\"{%= $.fields[i].pickList.canEditText %}\"\r\n                                required=\"{%= $.fields[i].pickList.required %}\"\r\n                                sort=\"{%= $.fields[i].pickList.sort %}\"\r\n                           {% } %}\r\n                           {% if ($.fields[i].xtype === 'checkbox') { %}\r\n                                <input data-dojo-type=\"Sage.UI.Controls.CheckBox\"\r\n                                       checked=\"{%= $.fields[i].value %}\"\r\n                                       disabled=\"{%= $.fields[i].disabled %}\"\r\n                           {% } %}\r\n                           {% if ($.fields[i].xtype === 'textfield') { %}\r\n                                <input data-dojo-type=\"Sage.UI.Controls.TextBox\"\r\n                                style=\"width: 100%;\" type=\"text\"\r\n                                value=\"{%= $.fields[i].value %}\"\r\n                           {% } %}\r\n                                id=\"{%= $.id %}-{%= $.fields[i].name %}\"\r\n                                name=\"{%= $.fields[i].formClientId %}\"\r\n                                shouldPublishMarkDirty=\"false\"\r\n                                onChange=\"dijit.byId('{%= $.id %}').editorChange();\"\r\n                                textAlign=\"{%= $.fields[i].textAlign %}\" data-dojo-attach-point=\"focusNode\"\r\n                                maxLength=\"{%= $.fields[i].maxLength %}\" />\r\n                        </td>\r\n                   </tr>\r\n                {% } %}          \r\n                {% } %}            \r\n        </table>                    \r\n        <div class=\"button-bar alignright\" style=\"clear: both\">\r\n            <button id=\"{%= $.id %}-OKButton\" data-dojo-type=\"dijit.form.Button\" type=\"button\" onClick=\"dijit.byId('{%= $.id %}')._okClicked();\">\r\n                {%= $.okText %}\r\n            </button>\r\n            <button id=\"{%= $.id %}-CancelButton\" data-dojo-type=\"dijit.form.Button\" type=\"button\" onClick=\"dijit.byId('{%= $.id %}')._cancelClicked();\">\r\n                {%= $.cancelText %}\r\n            </button>\r\n        </div>\r\n</div>"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
/**
* @class Class for Address control read only texarea with edit dialog.
*/
define("Sage/UI/Controls/Address", [
    'dijit/_Widget',
    'dojo/string',
    'Sage/_Templated',
    'Sage/Utility',
    'Sage/UI/Controls/TextBox',
    'Sage/UI/Controls/PickList',
    'Sage/UI/Controls/DropDownSelectPickList',
    'dijit/Dialog',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'dojo/i18n!./nls/Address',
    'dojo/text!./templates/Address.html',
    'dojo/text!./templates/AddressEdit.html',
    'dojo/_base/declare',
    'dojo/_base/array'
],
// ReSharper disable InconsistentNaming
    function (
        _Widget,
        dString,
        _sageTemplated,
        utility,
        textBox,
        pickList,
        dropDownSelectedPickList,
        dialog,
        _DialogHelpIconMixin,
        i18nStrings,
        addressTemplate,
        editTemplate,
        declare,
        array
    ) {
        // ReSharper restore InconsistentNaming
        var widget = declare('Sage.UI.Controls.Address', [_Widget, _sageTemplated], {
            //using Simplate to faciliate conditional display
            widgetTemplate: new Simplate(addressTemplate.split('\r')),
            dialogContent: new Simplate(editTemplate.split('\r')),
            // @property {string} Overrides default dialog layout template.
            templateOverridePath: '', //i.e. 'templates/Address-Override.html'
            widgetsInTemplate: true,
            clientId: '',
            tabIndex: 0,
            //.net property
            autoPostBack: false,
            readOnly: false,
            enabled: true,
            showButton: true,
            displayValue: '',
            displayValueClientId: '',
            height: '',
            styleSchemaClass: '',
            // @property {object} The Urls and ToolTips of map and edit buttons.
            imageData: {
                imageEditUrl: '',
                // @property {string} The tooltip of the edit image.
                imageEditToolTip: '',
                imageEditAltText: '',
                // @property {string} The url of the map image.
                imageMapQuestUrl: '',
                // @property {string}  The tooltip of the map image.
                imageMapQuestToolTip: '',
                imageMapQuestAltText: ''
            },
            fields: [],
            mapQuestValues: {},
            // @property {function} - Provides change hook for fields in the edit dialog to mark the control as dirty.
            editorChange: function () {
                this.isDirty = true;
            },
            // @property {boolean} - Indicates whether a field has been changed in the edit dialog. default = true
            isDirty: false,
            //.net bound control
            // @property {string} Client Id of the main address control.
            name: '',
            // @property {string} Name of the Map provider to use. Defaults to MapQuest if none provided.
            mapProvider: '',
            constructor: function (options) {
                dojo.mixin(this, options);
                options.id = options.clientId;
                options.displayValue = utility.htmlDecode(options.displayValue);
                this.styleSchemaClass = options.cssClass;

                this.resources = i18nStrings;
                if (options.templateOverridePath && options.templateOverridePath.length > 0) {
                    try {
                        this.dialogContent = new Simplate(dojo['cache']('Sage.UI.Controls', options.templateOverridePath).split('\r'));
                    } catch (e) {
                        // No overriding template exists.
                        console.log('Could not load template:' + e.description);
                    }
                }
                this.inherited(arguments);
            },
            setAttribute: function (attr, val) {
                /* Hide deprecated warnings, due to the parser and _WidgetBase assuming focusNode is a dom node and not a widget */
                this.set(attr, val);
            },
            postCreate: function () {
                this.inherited(arguments);
                // the tabindex property is pointing to a div, and it shouldn't be selectable via tabbing
                // (however, tabindex is still necessary on construction to set the index of child controls)
                this.setAttribute('tabindex', '-1');
            },
            showDialog: function () {
                if (!this.readOnly) {
                    this.editDialog = dijit.byId([this.id, '-Dialog'].join(''));
                    if (!this.editDialog) {
                        this.editDialog = new dialog({
                            title: this.resources.dialogTitle,
                            id: [this.id, '-Dialog'].join(''),
                            'class': 'address-edit'
                        });
                        dojo.mixin(this.editDialog, new _DialogHelpIconMixin());
                        this.editDialog.createHelpIconByTopic("accountaddresschange");
                    }
                    this.htmlEncodeForEditDialog();
                    this.editDialog.set("content", this.dialogContent.apply({
                        id: this.id,
                        cancelText: this.resources.cancelText,
                        okText: this.resources.okText,
                        fields: this.fields
                    }));
                    this.isDirty = false;
                    this.editDialog.show();
                    if (this.modality === 'modeless') {
                        dojo.destroy([this.id, '-Dialog_underlay'].join(''));
                    }
                }
            },
            // encode doube-quotes before sending them to the edit template,
            // otherwise they escape a double quote and the value won't fully appear
            // (trying to encode before this point causes the encoded string to appear
            //  in the textarea control for the address, which is bad)
            htmlEncodeForEditDialog: function () {
                array.forEach(this.fields, function (entry, i) {
                    if ((entry.xtype === "picklistcombo" || entry.xtype === 'textfield') && entry.value.indexOf('"') > -1) {
                        entry.value = utility.htmlEncode(entry.value);
                    }
                });
            },
            showMap: function () {
                this.createFormItems();
                var values = this.getAddressValues();
                var map = { 'address': 'addr1', 'city': 'city', 'state': 'state', 'zip': 'postalcode', 'country': 'country' };
                var parameters = {};

                for (var key in map) {
                    if (values[map[key]])
                        parameters[key] = (typeof values[map[key]] === "object") ? values[map[key]].text : values[map[key]];
                }

                var url = '';
                switch (this.mapProvider) {
                    case 'Bing':
                        url = this._showBingMap(parameters);
                        break;
                    case 'Google':
                        url = this._showGoogleMap(parameters);
                        break;
                    default:
                        url = this._showMapQuestMap(parameters);
                        break;
                }

                var options = 'directories=no,location=no,menubar=no,pageXOffset=0px,pageYOffset=0px,scrollbars=yes,status=no,titlebar=no,toolbar=yes';
                window.open(url, '', options);
            },
            _showMapQuestMap: function (parameters) {
                parameters.level = 9;
                parameters.iconid = 0;
                parameters.height = 300;
                parameters.width = 500;
                var queryParams = [];
                for (var paramKey in parameters) {
                    queryParams.push(paramKey + "=" + encodeURIComponent(parameters[paramKey]));
                }
                var url = "http://www.mapquest.com/maps?" + queryParams.join("&");
                return url;
            },
            _showBingMap: function (parameters) {
                var addressQuery = "";
                for (var paramKey in parameters) {
                    addressQuery = addressQuery + " " + parameters[paramKey];
                }
                var queryParams = [];
                queryParams.push("where1=" + encodeURIComponent(addressQuery));
                queryParams.push("style=r");
                var url = "http://bing.com/maps/default.aspx?" + queryParams.join("&");
                return url;
            },
            _showGoogleMap: function (parameters) {
                var addressQuery = "";
                for (var paramKey in parameters) {
                    addressQuery = addressQuery + " " + parameters[paramKey];
                }
                var queryParams = [];
                queryParams.push("q=" + encodeURIComponent(addressQuery));
                queryParams.push("t=m");
                var url = "http://google.com/maps/?" + queryParams.join("&");
                return url;
            },
            createFormItems: function () {
                var items = [];
                for (var i = 0; i < this.fields.length; i++) {
                    if (this.fields[i].visible === false)
                        continue;
                    this.mapQuestValues[this.fields[i].name] = this.fields[i];
                    var f = $.extend(this.fields[i], this.fields[i].pickList, {
                        id: this._clientId + "_field_" + this.fields[i].name,
                        stateful: false,
                        anchor: (this.fields[i].xtype != "checkbox") ? "100%" : false
                    });
                    if (f.maxLength > 0) {
                        f.autoCreate = { tag: 'input', type: 'text', maxlength: this.fields[i].maxLength };
                    }
                    f.tabIndex = i + 1;
                    items.push(f);
                }
                return items;
            },
            getAddressValues: function () {
                var values = {};
                for (var name in this.mapQuestValues) {
                    var field = this.mapQuestValues[name];
                    if (field) {
                        values[name] = field.value;
                    }
                }
                return values;
            },
            getEditFields: function () {
                this.setDataFields();
            },
            setDataFields: function () {
                var editField, dataField, xtype;
                for (var i = 0; i < this.fields.length; i++) {
                    // Get the edit field from inside the dialog.
                    editField = dijit.byId([this.id, '-', this.fields[i].name].join(''));
                    // Get the hidden dataField provided by the server control
                    dataField = dojo.byId(this.fields[i].formClientId);
                    // Get the field type
                    xtype = this.fields[i].xtype;

                    // Check to see if the field has been added to the form.
                    if (editField) {
                        //Set the data fields for PickLists
                        if (xtype === 'picklistcombo') {
                            //Check to see if a hidden field has been added to the configuration. Update it if so.
                            if (dataField) {
                                dataField.value = editField.get('value');
                            }
                            //Always update the field obj.
                            this.fields[i].value = editField.get('value');
                        }

                        //Set the data fields for CheckBox
                        if (xtype === 'checkbox') {
                            //Check to see if a hidden field has been added to the configuration and update it if so.
                            if (dataField) {
                                dataField.checked = editField.get('checked');
                            }
                            //Always update the field obj.  Checkbox as 'value' rather than 'checked'
                            this.fields[i].value = editField.get('checked');
                        }

                        //Set the data fields for Text fields
                        if (xtype === 'textfield') {
                            //Check to see if a hidden field has been added to the configuration and update it if so.
                            if (dataField) {
                                dataField.value = editField.get('value');
                            }
                            //Always update the field obj.
                            this.fields[i].value = editField.get('value');
                        }
                    }
                }
            },
            _FieldsValid: function() {
                var editField, dataField, xtype, formValid, alertMessage;
                formValid = true;
                alertMessage = this.resources.isRequiredText;
                for (var i = 0; i < this.fields.length; i++) {
                    editField = dijit.byId([this.id, '-', this.fields[i].name].join(''));
                    dataField = dojo.byId(this.fields[i].formClientId);
                    xtype = this.fields[i].xtype;
                    if (editField) {
                        if (xtype === 'picklistcombo') {
                            if (dataField) {
                                if (this.fields[i].pickList.required) {
                                    if (editField.get('value').length === 0) {
                                        alertMessage = alertMessage.concat(this.fields[i].fieldLabel.slice(0,-1));
                                        alertMessage = alertMessage.concat(",");
                                        formValid = false;
                                    }
                                }
                            }
                        }
                    }
                }
                if (formValid === false) {
                    alertMessage = alertMessage.slice(0,-1);
                    Sage.UI.Dialogs.alert(alertMessage);
                }
                return formValid;
            },
            _okClicked: function () {
                if (this._FieldsValid()) {
                    var that = this;
                    setTimeout((function (d) {
                        return function () {
                        that._updateValues();
                        };
                    })(that), 1);
                    this.editDialog.hide();
                }
            },
            _updateValues: function () {
                if (this.isDirty) {
                    this.getEditFields();                    
					//this.getAddressFormatString();
					var self = this;
					var countryCode = '';
					var countryCodeObject = this.fields.filter(function( obj ) {
						return obj.name === 'countryCode';
					});
					countryCode = countryCodeObject[0].value;
					var country = '';
					var countryObject = this.fields.filter(function( obj ) {
						return obj.name === 'country';
					});
					country = countryObject[0].value;
					if(country !=='')
					{
						var sWhere = "CountryName eq '" + country.toUpperCase() + "' or AlternateCode eq '" + country.toUpperCase() + "'";
						var oSDataService = Sage.Data.SDataServiceRegistry.getSDataService("dynamic");
						var oSDataRequest = new Sage.SData.Client.SDataResourceCollectionRequest(oSDataService);
						oSDataRequest.setResourceKind("countrycodemappings");
						var sFields = "CountryCode";
						oSDataRequest.setQueryArg("select", sFields);
						oSDataRequest.setQueryArg("where", sWhere);
						oSDataRequest.read({
							httpMethodOverride: true,
							success: function (data) {
								var countrycodemappings = data.$resources[0];
								countryCode = countrycodemappings.CountryCode;
								self._setAddressFormat(self, countryCode);
							},
							failure: function (result) {
									Sage.UI.Dialogs.showError(result);
							}
							});
					}
					else
					{
						countryCode = "US";
						this._setAddressFormat(self, countryCode);
					}
				}
            },
            _cancelClicked: function () {
                this.editDialog.hide();
            },
			_setAddressFormat: function(self, countryCode)
			{
				var sWhere = "CountryCode eq '" + countryCode + "'";
				var resultNode = dojo.byId(self.resultValueClientId);
				var oSDataService = Sage.Data.SDataServiceRegistry.getSDataService("dynamic");
				var oSDataRequest = new Sage.SData.Client.SDataResourceCollectionRequest(oSDataService);
				oSDataRequest.setResourceKind("countrycodemappings");
				var sFields = "AddressFormat";
				oSDataRequest.setQueryArg("select", sFields);
				oSDataRequest.setQueryArg("where", sWhere);
				oSDataRequest.read({
					httpMethodOverride: true,
					success: function (data) {
						var countrycodemappings = data.$resources[0];
						var addressFormatString = countrycodemappings.Addressformat;
						var addressValue = Sage.Format.Address.formatAddress(self.fields, addressFormatString);
						dijit.byId(self.clientId + '_displayText1').set('value', addressValue);
						resultNode.value = addressValue;
						dojo.publish("Sage/events/markDirty");
						if (self.autoPostBack) {
							__doPostBack(resultNode.name, '');
						}
					},
					failure: function (result) {
						Sage.UI.Dialogs.showError(result);
					}
				});
			}
		});
        return widget;
    });
