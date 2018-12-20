/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, getCookie, cookie, $ */
define("Sage/UI/AddressFormatDialog", [
	'dijit/_Widget',
	'Sage/_Templated',	
	'dijit/Dialog',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'dojo/dom-construct',
    'Sage/Data/SDataServiceRegistry',
    'dojo/string',
	'dojo/_base/xhr',
	'Sage/UI/Dialogs',	
    'dojo/store/Memory',
    'dojo/i18n!./nls/AddressFormat'
],
function (_Widget, _Templated, Dialog, lang, declare, _DialogHelpIconMixin, domConstruct, sDataServiceRegistry, dString, dojoXhr, dialogs, memory, resource) {	
        var workflowDialog = declare('Sage.UI.AddressFormatDialog', [_Widget, _Templated], {
        widgetsInTemplate: true,
        conditionMgr: false,
        title: '',
        widgetTemplate: new Simplate([
            '<div>',
                '<div data-dojo-type="dijit.Dialog" id="AddressFormatLookupDialog" title="&nbsp;" dojoAttachPoint="dlg" >',
                '</div>',
            '</div>'
        ]),
        constructor: function (o) {
        },
        show: function (format) {
            if (this.conditionMgr) {
				if(format.trim()){
					var firstItem = false;
					var conditionArray = [];
					var conditionString = [];
					var isFirstCondition = false;
					var addressFormatArray = format.split('%n');
					for(var i = 0; i < addressFormatArray.length; i++)
					{	
						firstItem = i;
						var field = '';
						var operator = '';
						var value = '';
						var key = addressFormatArray[i];
						switch(key){
							case '%A':
								field = resource.Address;
								operator = '%n';
								this.SetField(firstItem, field, operator, value);
								break;
							case '%C': 
								field = resource.City;
								operator = '%n';
								this.SetField(firstItem, field, operator, value);
								break;
							case '%Z':
								field = resource.PostalCode;
								operator = '%n';
								this.SetField(firstItem, field, operator, value);
								break;
							case '%S':
								field = resource.State;
								operator = '%n';
								this.SetField(firstItem, field, operator, value);
								break;
							case '%D':
								field = resource.County;
								operator = '%n';
								this.SetField(firstItem, field, operator, value);
								break;
							default:
								key = key.replace(/, /g, '^,');	
								key = key.replace(/ /g, '^ ');	
								key = key.replace(/-/g, '^-');
								key = key.replace(/%/g, '^%');
								key = key.replace(/\//g, '^/');
								var SpecialCaselastItem = false;
								var specialCaseArray = key.split('^');
								var iterationCount = 0;
								for(var j = 0; j < specialCaseArray.length; j++){									
									 
									if((i > 0 || i < addressFormatArray.length) && j === (specialCaseArray.length - 1))
										SpecialCaselastItem = true;
									else
										SpecialCaselastItem = false;
									var innerKey = specialCaseArray[j];
									if(innerKey === '')
										continue;
									iterationCount += 1;
									var createElementWithNoOperator = false;
									var nextElement = specialCaseArray[j + 1];
									switch(innerKey){
										case '%A':
											field = resource.Address;										
											if(nextElement === '%A' || nextElement === '%C' || nextElement === '%Z' || nextElement === '%S' || nextElement === '%D')
											{
												operator = "Nothing";
												createElementWithNoOperator = true;
											}
											break;
										case '%C':
											field = resource.City;
											if(nextElement === '%A' || nextElement === '%C' || nextElement === '%Z' || nextElement === '%S' || nextElement === '%D')
											{
												operator = "Nothing";
												createElementWithNoOperator = true;
											}
											break;
										case '%Z':
											field = resource.PostalCode;
											if(nextElement === '%A' || nextElement === '%C' || nextElement === '%Z' || nextElement === '%S' || nextElement === '%D')
											{
												operator = "Nothing";
												createElementWithNoOperator = true;
											}
											break;
										case '%S':
											field = resource.State;	
											if(nextElement === '%A' || nextElement === '%C' || nextElement === '%Z' || nextElement === '%S' || nextElement === '%D')
											{
												operator = "Nothing";
												createElementWithNoOperator = true;
											}
											break;
										case '%D':
											field = resource.County;	
											if(nextElement === '%A' || nextElement === '%C' || nextElement === '%Z' || nextElement === '%S' || nextElement === '%D')
											{
												operator = "Nothing";
												createElementWithNoOperator = true;
											}
											break;
										case '-':
											operator = '-';										
											break;
										case ' ':
											operator = 'space';											
											break;
										case ',':
											operator = ',';
											break;
										case '/':
											operator = '/';										
											break;
										default:
											field = resource.Text;
											if(nextElement === '%A' || nextElement === '%C' || nextElement === '%Z' || nextElement === '%S' || nextElement === '%D')
											{
												operator = "Nothing";
												createElementWithNoOperator = true;
											}
											value = innerKey;
											break;
									}
									if(iterationCount === 2 || specialCaseArray.length === 1 || SpecialCaselastItem === true || (field ==='' && operator === resource.Space) || createElementWithNoOperator === true){
										if(field ==='' && operator === resource.Space)
											field = resource.Empty;										
										this.SetField(firstItem, field, operator, value, SpecialCaselastItem);
										iterationCount = 0;
										firstItem += 1;
										value = '';
										field = '';
									}
								}
								break;
						}												
					}
				}
				// mixin help icon
				lang.mixin(this.dlg, new _DialogHelpIconMixin());
					this.dlg.createHelpIconByTopic('lookup');
					this.dlg.show();
				this.conditionMgr._displayAddresFormat.innerHTML = this.conditionMgr.getReadableConditionsString();
            }
        },
		SetField: function(firstItem, field, operator, value, SpecialCaselastItem){
			if(SpecialCaselastItem === true)
				operator = "%n";
			if(firstItem === 0)
			{
				this.conditionMgr.setFirstDefaultCondition(field, operator, value);	
			}
			else
			{
				this.conditionMgr.setCondition(field, operator, value);	
			}
		},
        hide: function () {
            this.dlg.hide();	
        },
        _setConditionMgrAttr: function (conditionMgr) {
            this.conditionMgr = conditionMgr;
            dojo.place(this.conditionMgr.domNode, this.dlg.containerNode, 'only');
        },
        _setTitleAttr: function (title) {
            this.title = title;
            this.dlg.set('title', title);
        }
    });
    return workflowDialog;
});