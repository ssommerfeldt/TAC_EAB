/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, getCookie, cookie, $ */
define('Sage/UI/IonWorkflow', [
	'dijit/_Widget',
	'Sage/_Templated',	
	'dijit/Dialog',
	'Sage/UI/QueryBuilder',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'dojo/dom-construct',
    'Sage/Data/SDataServiceRegistry',
    'dojo/json',
	'dojo/i18n!./nls/IonWorkflow', 
    'dojo/string',
	'Sage/Utility',
	'dojo/_base/xhr',
	'Sage/UI/Dialogs',	
    'dojo/store/Memory',
    'Sage/Utility/Filters'
],
function (_Widget, _Templated, Dialog, QueryBuilder, lang, declare, _DialogHelpIconMixin, domConstruct, sDataServiceRegistry, json,nls, dString, dojoXhr, dialogs, memory,    filterUtility) {	
        var workflowDialog = declare('Sage.UI.IonWorkflowDialog', [_Widget, _Templated], {
        widgetsInTemplate: true,
        conditionMgr: false,
        title: '',
        widgetTemplate: new Simplate([
            '<div>',
                '<div data-dojo-type="dijit.Dialog" id="workflowLookupDialog" title="&nbsp;" dojoAttachPoint="dlg" >',
                '</div>',
            '</div>'
        ]),
        constructor: function (o) {
        },
        show: function (queryValue) {
            if (this.conditionMgr) {
				if(queryValue.trim()){
					var conditionArray = [];
					var conditionString = [];
					var isFirstCondition = false;
					conditionArray = queryValue.split(',');
					for(var i = 0; i < conditionArray.length; i++)
					{
						var conditionStringWithBraces = conditionArray[i];
						// removed flower braces
						var conditionWithoutFlowerBraces = conditionStringWithBraces.substring(1, conditionStringWithBraces.length-1);
						
						conditionString = conditionWithoutFlowerBraces.split(':');
						var field = conditionString[0];
						var value = conditionString[1];
						var length=conditionString.length;
						var operator  = this.conditionMgr.getOperatorNameBySymbol(conditionString[length-1]);	
						//Below lines convert Db UTC Date to Browser local time timezone.
						if(conditionString.length>4)
						{
						var storedDate=conditionString[1]+" "+conditionString[2]+":"+conditionString[3]+":"+conditionString[4];
						var offset=(new Date()).getTimezoneOffset();
						var dateValue=new Date(Date.parse(storedDate));
						var displayDate=new Date(dateValue- offset* 60*1000);
						value=displayDate.getMonth()+1+"/"+displayDate.getDate()+"/"+displayDate.getFullYear();
						}
						if(i === 0)
						{
							this.conditionMgr.setFirstDefaultCondition(field, operator, value);	
						}
						else
						{
							this.conditionMgr.setCondition(field, operator, value);	
						}						
					}
				}
				// mixin help icon
				lang.mixin(this.dlg, new _DialogHelpIconMixin());
					this.dlg.createHelpIconByTopic('lookup');
					this.dlg.show();
				//this.conditionMgr.removeFirstDefaultCondition();
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
    var IonWorkflowUtil = declare('Sage.UI.IonWorkflow', [], {
        conditionMgr: false,
        _dlgWindow: false,
        id: 'workflowLookup',
		_queryTextbox: false,
		_queryReadableTextbox: false,		
        constructor: function () {            
        },
		showLookup: function (entityName, queryTextboxName, queryReadableTextboxName) {
			this._queryTextbox = queryTextboxName;
			this._queryReadableTextbox = queryReadableTextboxName;
			
			var service = sDataServiceRegistry.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                          .setResourceKind("IonWorkflowDefinitions")
                          .setOperationName("RequestEntityProperties");
            var entry = {
                "$name": "RequestEntityProperties",
                "request": {
					"BackOfficeId": '',
                    "entityName": entityName
                }
            };
            request.execute(entry, {
                async: false,
                success: lang.hitch(this, function (data) {
					var result = json.parse(data.response.Result);
                    if (result) {
                        this._resetConditionManager(result.items);
						this._showInitializedLookup(entityName);
                    } 
                }),
                failure: function (result) {
                    dialogs.showError(result);
                }
            });
			
		},
		_showInitializedLookup: function (entityName) { 
		
			var txtCondition = dijit.byId(this._queryTextbox);
			var queryValue = txtCondition.value;
			var titletext;
			if (!this._dlgWindow) {
				this._dlgWindow = new workflowDialog({ conditionMgr: this.conditionMgr });
			}
			if (!this._dlgWindow.conditionMgr) {
				this._dlgWindow.set('conditionMgr', this.conditionMgr);
			}
			 
            if(entityName ===  'Quote')
			{
				titletext = nls.Quote;
			}
			else if(entityName ===  'SalesOrder')
			{
				titletext = nls.SalesOrder;
			}
			else if(entityName ===  'Lead')
			{
				titletext = nls.Lead;
			}
			else if(entityName ===  'Opportunity')
			{
				titletext = nls.Opportunity;
			}
			else{
				titletext = entityName;
			}
			
            this._dlgWindow.set('title', titletext);
			this._dlgWindow.show(queryValue);
			
        },
        _resetConditionManager: function (fields) {
		if (this.conditionMgr) {
                this.conditionMgr.destroy(false);
                this.conditionMgr = null;
            }
			
			this.conditionMgr = new QueryBuilder({
				fields: fields,
				fieldNameProperty: 'alias',
				fieldDisplayNameProperty: 'displayName', // 'displayName',
				fieldTypeProperty: 'format',
				id: 'test-ConditionManager-1'
			});
			if (this._dlgWindow) {
                this._dlgWindow.set('conditionMgr', this.conditionMgr);
            }
			this._doSearchConnection = dojo.connect(this.conditionMgr, "_doSearch", this, "getConditionsString");
		},
        //returns json string of the "conditions"
        getConditionsString: function () {
            var txtCondition = dijit.byId(this._queryTextbox);
			var conditionString = this.conditionMgr.getConditionsJSON();
			txtCondition.attr('value', conditionString);
			var txtReadableCondition = dijit.byId(this._queryReadableTextbox);
			txtReadableCondition.attr('value', this.conditionMgr.getReadableConditionsString());
			this._dlgWindow.hide();
        },
        destroy: function () {
            if (this._doSearchConnection) {
                dojo.disconnect(this._doSearchConnection);
                this._doSearchConnection = false;
            }
            this.inherited(arguments);
        }
    });
	
    Sage.namespace('UI.IonWorkflow');
    lang.mixin(Sage.UI.IonWorkflow, new IonWorkflowUtil());
    return IonWorkflowUtil;
});




