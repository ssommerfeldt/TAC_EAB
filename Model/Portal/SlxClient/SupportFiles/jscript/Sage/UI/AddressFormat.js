/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, getCookie, cookie, $ */
define("Sage/UI/AddressFormat", [
	'Sage/UI/AddressFormatConditionManager',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'dojo/dom-construct',
    'Sage/Data/SDataServiceRegistry',
    'dojo/json',
    'dojo/string',
	'Sage/Utility',
	'dojo/_base/xhr',
	'Sage/UI/Dialogs',	
    'dojo/store/Memory',
    'dojo/i18n!./nls/AddressFormat',
    'Sage/UI/AddressFormatDialog'
],
function (AddressFormatConditionManager, lang, declare, _DialogHelpIconMixin, domConstruct, sDataServiceRegistry, json, dString, utility, dojoXhr, dialogs, memory, resource, AddressFormatDialog) {	
    var AddressFormatUtil = declare('Sage.UI.AddressFormat', [], {
        conditionMgr: false,
        _dlgWindow: false,
        id: 'workflowLookup',
		addressFormatTextbox: false,
		addressFormatReadableTextbox: false,		
        constructor: function () {            
        },
		showLookup: function (addressFormatTextboxId, addressFormatReadableTextboxId) {
			this.addressFormatTextbox = addressFormatTextboxId;
			this.addressFormatReadableTextbox = addressFormatReadableTextboxId;
			
			var service = sDataServiceRegistry.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                          .setResourceKind("countryCodeMappings")
                          .setOperationName("GetAddressEntityProperties");
            var entry = {
                "$name": "GetAddressEntityProperties",
                "request": {
					"CountryCodeMappingId": utility.getCurrentEntityId()
                }
            };
            request.execute(entry, {
                async: false,
                success: lang.hitch(this, function (data) {
					var result = json.parse(data.response.Result);
                    if (result) {
                        this._resetConditionManager(result.items);
						this._showInitializedLookup();
                    } 
                }),
                failure: function (result) {
                    dialogs.showError(result);
                }
            });
			
		},
		_showInitializedLookup: function () { 
		
			var txtAddressFormat = dijit.byId(this.addressFormatTextbox);
			var queryValue = txtAddressFormat.value;
			if (!this._dlgWindow) {
				this._dlgWindow = new AddressFormatDialog({ conditionMgr: this.conditionMgr });
			}
			if (!this._dlgWindow.conditionMgr) {
				this._dlgWindow.set('conditionMgr', this.conditionMgr);
			}
			
            this._dlgWindow.set('title', resource.DialogTitle);
			this._dlgWindow.show(queryValue);
			
        },
        _resetConditionManager: function (fields) {
		if (this.conditionMgr) {
                this.conditionMgr.destroy(false);
                this.conditionMgr = null;
            }
			
			this.conditionMgr = new AddressFormatConditionManager({
				fields: fields,
				fieldNameProperty: 'alias',
				fieldDisplayNameProperty: 'displayName', // 'displayName',
				fieldTypeProperty: 'format',
				id: 'test-ConditionManager-1'
			});
			if (this._dlgWindow) {
                this._dlgWindow.set('conditionMgr', this.conditionMgr);
            }
			this._doSearchConnection = dojo.connect(this.conditionMgr, "_doOk", this, "getConditionsString");
			this._doCancelConnection = dojo.connect(this.conditionMgr, "_doCancel", this, "hideDailog");
		},
        //returns json string of the "conditions"
        getConditionsString: function () {
			if(this.conditionMgr._displayLabel.innerHTML === '')
			{
				this._dlgWindow.hide();
			}
			else{
				return false;
			}
			var txtReadableAddressFormatTextbox = dijit.byId(this.addressFormatReadableTextbox);
			txtReadableAddressFormatTextbox.attr('value', this.conditionMgr.getReadableConditionsString());
			var txtAddressFormatTextbox = dijit.byId(this.addressFormatTextbox);
			txtAddressFormatTextbox.attr('value', this.conditionMgr.getConditionsJSON());			
		},
        destroy: function () {
            if (this._doSearchConnection) {
                dojo.disconnect(this._doSearchConnection);
                this._doSearchConnection = false;
            }
			if (this._doCancelConnection) {
                dojo.disconnect(this._doCancelConnection);
                this._doCancelConnection = false;
            }
            this.inherited(arguments);
        },
		hideDailog: function(){
			this._dlgWindow.hide();
		}
    });
	Sage.namespace('UI.AddressFormat');
    lang.mixin(Sage.UI.AddressFormat, new AddressFormatUtil());
    return AddressFormatUtil;
});