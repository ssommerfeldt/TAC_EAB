/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/AddressFormatConditionManager", [
    'Sage/_Templated',
    'dijit/_Widget',
    'dijit/form/Select',
    'dijit/form/Button',
    'Sage/UI/ImageButton',
    'Sage/UI/AddressFormatConditionWidget',
    'Sage/Utility',
    'dojo/i18n!./nls/AddressFormatConditionManager',
    'dojo/_base/declare',
	'dojo/date/locale'
],
function (_Templated, _Widget, select, button, imageButton, AddressFormatConditionWidget, util, nls, declare, locale) {
    var widget = declare('Sage.UI.AddressFormatConditionManager', [_Widget, _Templated], {
        widgetsInTemplate: true,
        srchBtnCaption: 'OK',
        cancelBtnCaption: 'CANCEL',
        addrowlabel: 'Attributes:',
        label: '',
        hiderowlabel: 'And:',
        hideimgurl: 'images/icons/Find_Remove_16x16.gif',
        addimgurl: 'images/icons/Find_Add_16x16.gif',
        hideimgalttext: 'Remove Condition',
        addimgalttext: 'Add Condition',
        errorOperatorRequiresValue: 'The operator requires a value',
        operators: null,
        fields: null,
        fieldsHash: null,
        fieldNameProperty: 'fieldname',
        fieldDisplayNameProperty: 'displayname',
        fieldTypeProperty: 'propertyType',
        fieldPickListNameProperty: 'pickListName',
        conditionWidgets: null,
        widgetConnects: null,
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" class="lookup-condition-manager">',	
				'<div style="display: inline-block;white-space: pre-wrap;font-size: 15px;" id="lblDisplayAddressFormatText" dojoAttachPoint="_displayAddresFormat" >',
				'</div>',
				'<div style="color: coral;padding: 5px 0 5px 5px;border-bottom: 1px solid darkgrey;" id="lblDisplayText" dojoAttachPoint="_displayLabel" >',
				'</div>',
                '<table cellspacing="0" cellpadding="3">',
                    '<tr><td><div dojoAttachPoint="conditions"></div></td></tr>', 
                '</table>',
                '<div class="lookup-condition-actions">',
                '<button id="{%= $.id %}-Save" data-dojo-type="dijit.form.Button" type="button" dojoAttachPoint="searchButton" dojoAttachEvent="onClick:_doOk">{%= $.srchBtnCaption %}</button>',
				'<button id="{%= $.id %}-Cancel" data-dojo-type="dijit.form.Button" type="button" dojoAttachPoint="cancelButton" dojoAttachEvent="onClick:_doCancel">{%= $.cancelBtnCaption %}</button>',
                '</div>',
            '</div>']),
        isSettingValues: false,
        id: '',
        defaultOperator: null,
        defaultField: null,
        defaultValue: null,
        constructor: function() {
            this.conditionWidgets = {};
            this.operators = {};
            this.fieldsHash = {};
            this.fields = [];
            this.widgetConnects = [];
        },
        destroy: function() {
            var wid,
                i;
            
            for (i = 0; i < this.widgetConnects.length; i++) {
                dojo.disconnect(this.widgetConnects[i]);
            }
            
            for (wid in this.conditionWidgets) {
                if(this.conditionWidgets.hasOwnProperty(wid)) {
                    if (this.conditionWidgets[wid].destroy) {
                        this.conditionWidgets[wid].destroy();
                    }
                }
            }
            this.inherited(arguments);
        },
        postMixInProperties: function () {
            dojo.mixin(this, nls);
            this.inherited(arguments);
        },
        getOperatorsByField: function(field) {
            var basicOptions,
                operators;
                
            basicOptions = [
                { value: '%n', label: nls.NewLine, selected: false, diabled: false },
                { value: 'space', label: nls.Space, selected: false, diabled: false },
                { value: ',', label: nls.Comma, selected: false, diabled: false },
                { value: '-', label: nls.Hyphen, selected: false, diabled: false },
                { value: '/', label: nls.Slash, selected: false, diabled: false },
                { value: 'Nothing', label: '', selected: false, diabled: false }
            ];
            
            operators = {
                "System.Boolean": {
                    options: basicOptions 
                },
                "Boolean": {
                    options: basicOptions 
                },
                "System.String": { 
                    options: basicOptions
                },
                "SalesLogix.PickList": {
                    options: basicOptions
                },
                "Sage.Entity.Interfaces.UserType": {
                    options: basicOptions
                },
                "Sage.Entity.Interfaces.OwnerType": {
                    options : basicOptions
                },
                "System.DateTime": {
                    options: basicOptions
                },
                "DateTime": {
                    options: basicOptions
                },
                "Phone": {
                    options: basicOptions
                },
                "User": {
                    options: basicOptions
                },
                "Owner": {
                    options: basicOptions
                },
                "System.Double": {
                    options: basicOptions 
                },
                "System.Int32": {
                    options: basicOptions 
                },
                "System.Int16": {
                    options: basicOptions 
                },
                "System.Decimal": {
                    options: basicOptions 
                },
                "Fixed": {
                    options: basicOptions 
                },
                "Decimal": {
                    options: basicOptions 
                },
                "Integer": {
                    options: basicOptions 
                },
                "Positive Integer": {
                    options: basicOptions 
                },
                "Currency": {
                    options: basicOptions 
                },
                "Percent": {
                    options: basicOptions 
                },
                "defaultOperators": {
                    options: basicOptions 
                },
                "None": {
                    options: basicOptions
                }
            };

            if ((field.hasOwnProperty(this.fieldTypeProperty)) && (operators.hasOwnProperty(field[this.fieldTypeProperty]))) {
                return operators[field[this.fieldTypeProperty]].options;
            }
            return operators.defaultOperators && operators.defaultOperators.options;
        },
        getConditionsAsUrlWhereString : function () {
            //manipulate conditions to match SData requirements for where URL parameter...
            var conds = this.getConditions(),
                condString = [],
                condVal = null,
                i,
                tempCondition,
                lhd, rhd, lhs, rhs,
                dateFormat;
                
            for (i = 0; i < conds.length; i++) {
                condVal = conds[i].val;
                if (typeof condVal === 'string') {
                    condVal = condVal.replace(/%/g, '');
                }
                if (condVal.constructor === Date){
                    // Handle equal to and not equal to as a special case.
                    // - They need to be in a range from start to end of date
                    if (conds[i].operator === 'eq' || conds[i].operator === 'ne') {
                        lhd = condVal;
                        rhd = condVal;
                        
                        lhd.setHours(0);
                        lhd.setMinutes(0);
                        lhd.setSeconds(0);
                        lhs = util.Convert.toIsoStringFromDate(lhd);
                        
                        rhd.setHours(23);
                        rhd.setMinutes(59);
                        rhd.setSeconds(59);
                        rhs = util.Convert.toIsoStringFromDate(rhd);
                        
                        // eq:(somedate > lhs and somedate < rhs)
                        // ne: (somedate < lhs or somedate > rhs)
                        dateFormat = {
                            field: conds[i].fieldname,
                            leftOp: 'gt', 
                            leftVal: lhs,
                            rightOp: 'lt', 
                            rightVal: rhs,
                            join: 'and'
                        };
                        
                        // Switch operators for not equal
                        if (conds[i].operator === 'ne') {
                            dateFormat.leftOp = 'lt';
                            dateFormat.rightOp = 'gt';
                            dateFormat.join = 'or';
                        }
                        
                        condString.push(dojo.string.substitute("(${field} ${leftOp} '${leftVal}' ${join} ${field} ${rightOp} '${rightVal}')", dateFormat));
                        continue;
                    } else if (conds[i].operator === 'le' || conds[i].operator === 'gt') {
                        /* less than/equal, greater than */
                        condVal.setHours(23);
                        condVal.setMinutes(59);
                        condVal.setSeconds(59);
                        
                    } else if (conds[i].operator === 'ge' || conds[i].operator === 'lt') {
                        /* greater than/equal, less than */
                        condVal.setHours(0);
                        condVal.setMinutes(0);
                        condVal.setSeconds(0);
                    }
                    
                    condVal = util.Convert.toIsoStringFromDate(condVal);
                }

                tempCondition = {
                    field: conds[i].fieldname,
                    op: conds[i].operator,
                    val: condVal
                };

                var fld = this.getField(conds[i].fieldname);
                if (fld && fld.propertyType === "SalesLogix.PickList") {
                    if (typeof condVal === "object" && condVal[0]) {
                        tempCondition.val = condVal[0];
                    }
                }
                
                if (tempCondition.op === 'like') {
                    tempCondition.val = ['%', tempCondition.val, '%'].join('');
                } else if (tempCondition.op === 'sw') {
                    tempCondition.op = 'like';
                    tempCondition.val += '%';
                }

                if (typeof tempCondition.val === 'string') {
                    tempCondition.val = ['"', tempCondition.val.toUpperCase(), '"'].join('');// wrap string in quotes
                    tempCondition.field = ['upper(', tempCondition.field, ')'].join('');// make search case insensitive
                }
                condString.push([tempCondition.field, ' ', tempCondition.op, ' ', tempCondition.val].join(''));
            }
            return condString.join(' and ');
        },
        getField: function (fieldName) {
            if (this.fieldsHash && this.fieldsHash.hasOwnProperty(fieldName)) {
                return this.fieldsHash[fieldName];
            }
            return false;
        },
        getConditionsJSON : function () {
            var i,
                conditions = this.getConditions(),
                condVal,
                currentCondition,
                condCount = conditions.length;
			var addressFormatString = '';
			if(condCount > 0)
            {
				for (i = 0; i < condCount; i++) {
					var operatorVal = '';
					currentCondition = conditions[i];
					var textValue = '';
					if(currentCondition.val !== undefined)
						textValue = currentCondition.val.toString();
					operatorVal = currentCondition.operator;
					var field = currentCondition.fieldname;
					switch(currentCondition.fieldname){
						case 'ADDRESS':
							field = '%A';
							break;
						case 'CITY':
							field = '%C';
							break;
						case 'POSTALCODE':
							field = '%Z';
							break;
						case 'STATE':
							field = '%S';
							break;
						case 'COUNTY':
							field = '%D';
							break;
					}
					if(currentCondition.operator === ',')
					{
						operatorVal = ', ';
					}
					if(currentCondition.operator === 'space')
					{
						operatorVal = ' ';
					}
					if(currentCondition.operator === 'Nothing' || i === (condCount -1))
					{
						operatorVal = '';
					}
					if(currentCondition.fieldname === nls.Text || currentCondition.fieldname === nls.Empty){
						addressFormatString += '^' + textValue + operatorVal;						
					}
					else{						
						addressFormatString += field + textValue + operatorVal;
					}
				}
			}
            return addressFormatString;
        },
		getReadableConditionsString : function () {
            var i,
                conditions = this.getConditions(),
                condVal,
                currentCondition,
                condCount = conditions.length;
			var addressFormatString = '';
			if(condCount > 0)
            {
				for (i = 0; i < condCount; i++) {
					var operatorVal = '';
					currentCondition = conditions[i];
					var textValue = '';
					if(currentCondition.val !== undefined)
						textValue = currentCondition.val.toString();
					operatorVal = currentCondition.operator;
					var field = currentCondition.fieldname;

					if(currentCondition.operator === ',')
					{
						operatorVal = ', ';
					}
					if(currentCondition.operator === '%n')
					{
						operatorVal = '\r\n';
					}
					if(currentCondition.operator === 'space')
					{
						operatorVal = ' ';
					}
					if(currentCondition.operator === 'Nothing' || i === (condCount -1))
					{
						operatorVal = '';
					}
					if(currentCondition.fieldname === nls.Text || currentCondition.fieldname === nls.Empty){
						addressFormatString += textValue + operatorVal;						
					}
					else{						
						addressFormatString += this.getReadableAddressFormats(field) + textValue + operatorVal;
					}
				}
			}
            return addressFormatString;
        },
		getReadableAddressFormats: function(field){
			var fieldDisplayName = '';
			switch(field){
				case 'ADDRESS':					
					fieldDisplayName = nls.Address;
					break;
				case 'CITY':
					fieldDisplayName = nls.City;
					break;
				case 'POSTALCODE':
					fieldDisplayName = nls.PostalCode;
					break;
				case 'STATE':
					fieldDisplayName = nls.State;
					break;
				case 'COUNTY':
					fieldDisplayName = nls.County;
					break;
			}
			return fieldDisplayName;
		},
		getFieldDisplayName : function(propertyName){
			var fields = this.fields;
            for (var i = 0; i < fields.length; i++) {
                if(fields[i].alias == propertyName)
				{
					return fields[i].displayName;
				}
            }
		},
        getConditions : function () {
            var conds = [],
                wid,
                c;
            
            for (wid in this.conditionWidgets) {
                if (this.conditionWidgets.hasOwnProperty(wid)) {
                    if (this.conditionWidgets[wid].getCondition) {
                        c = this.conditionWidgets[wid].getCondition();
                        if (c) {
                            if (c.fieldname === "$key") {
                                c.fieldname = "id";
                            }
                            conds.push(c);
                        }
                    }
                }
            }
            return conds;
        },
        resetConditions: function() {
            var wid,
                i;
                
            for (i = 0; i < this.widgetConnects.length; i++) {
                dojo.disconnect(this.widgetConnects[i]);
            }
            for (wid in this.conditionWidgets) {
                if (this.conditionWidgets.hasOwnProperty(wid)) {
                    if (this.conditionWidgets[wid].getCondition) {
                        this._removeCondition(this.conditionWidgets[wid]);
                    }
                }
            }

            this._setInitialCondition();
        },
        _doOk: function() {
            return dojo.toJson(this.getConditions());
        },
        _doCancel: function() {
        },
        _setFieldsAttr: function(fields) {
            var i;
            this.fields = fields;
            this.fieldsHash = {};
            for (i = 0; i < fields.length; i++) {
                this.fieldsHash[fields[i][this.fieldNameProperty]] = fields[i];
            }
            this.resetConditions();
        },
        setFirstConditionValue: function(field, op, value) {
            var prop,
                wid;
            // Set the defaults on the class
            this.defaultOperator = op;
            this.defaultField = field;
            this.defaultValue = value;
            for(prop in this.conditionWidgets) {
                if(this.conditionWidgets.hasOwnProperty(prop)) {
                    wid = this.conditionWidgets[prop];
                    if(wid.isFirstCondition) {
                        wid.defaultOperator = op;
                        wid.defaultField = field;
                        wid.defaultValue = value;
                        wid.refreshDefaults();
                    }
                }
            }
        },
        addCondition: function(field, op, value, visible) {
            var count = this._conditionCount(),
				widgetIdCount = this._widgetIdCount();
                var newWid = new AddressFormatConditionWidget({
                    conditionManager: this,
                    isFirstCondition: false,
                    defaultField: field,
                    defaultOperator: op,
                    defaultValue: value,
                    id: this.id + '-SearchCondition' + widgetIdCount,
                    visible: visible
                });

            this.widgetConnects.push(dojo.connect(newWid, 'onRemoveLookupCondition', this, '_removeCondition'));
            
            dojo.place(newWid.domNode, this.conditions);
            newWid.startup();
            this.conditionWidgets[newWid.id] = newWid;
        },
        _setInitialCondition: function() {
            var self = this,
			wid = new AddressFormatConditionWidget({
				conditionManager: self,
				isFirstCondition: true,
				id: self.id + '-SearchCondition0',
				visible: true
			});
                
            this.widgetConnects.push(dojo.connect(wid, 'onAddLookupCondition', self, '_addCondition'));
            self.conditionWidgets[wid.id] = wid;
            dojo.place(wid.domNode, self.conditions);
            wid.startup();
        },
        _addCondition: function() {
            var count = this._conditionCount(),
				i,j,
                conditions = this.getConditions(),
                condVal, 
				field,
                currentCondition,
				widgetIdCount = this._widgetIdCount(),
                condCount = conditions.length;

            var newWid = new AddressFormatConditionWidget({
                    conditionManager: this,
                    isFirstCondition: false,
                    id: this.id + '-SearchCondition' + widgetIdCount,
                    visible: true
                });

			newWid.defaultOperator = nls.Nothing;
			newWid.defaultField = nls.Empty;			
			newWid.refreshDefaults();
			
            this.widgetConnects.push(dojo.connect(newWid, 'onRemoveLookupCondition', this, '_removeCondition'));
            this.conditionWidgets[newWid.id] = newWid;
            dojo.place(newWid.domNode, this.conditions);
            newWid.startup();			
			this._displayAddresFormat.innerHTML = this.getReadableConditionsString();
        },		
        _removeCondition: function(conditionWidget) {
            var id = conditionWidget.id;
			var c = this.conditionWidgets[id].getCondition();
            conditionWidget.destroyRecursive();
            delete(this.conditionWidgets[id]);
			this._displayAddresFormat.innerHTML = this.getReadableConditionsString();
			
			for(var wid in this.conditionWidgets){				
				this.conditionWidgets[wid].displayErrorMesssage();
				return false;
			}
        },
        _widgetIdCount: function() {
            var count = 0,
                wid;
            for (wid in this.conditionWidgets) {
				var maxCountInId = +wid.slice(-1);
				if(count > 0 && maxCountInId === 0)
					maxCountInId = +wid.slice(-2);
                if(maxCountInId > count) {
                    count = +maxCountInId;
                }
            }
			count = count + 1;
            return count;
        },
        _conditionCount: function() {
            var count = 0,
                wid;
            for (wid in this.conditionWidgets) {
                if(this.conditionWidgets.hasOwnProperty(wid)) {
                    count += 1;
                }
            }

            return count;
        },
        onDoSearch: function(args) {
        },
        setConditionValue: function(field, op, value, isFirstCondition) {
            var prop,
                wid;
            // Set the defaults on the class
            this.defaultOperator = op;
            this.defaultField = field;
            this.defaultValue = value;
            for(prop in this.conditionWidgets) {
                if(this.conditionWidgets.hasOwnProperty(prop)) {
                    wid = this.conditionWidgets[prop];
                    if(isFirstCondition) {
                        wid.defaultOperator = op;
                        wid.defaultField = field;
                        wid.defaultValue = value;
                        //wid.refreshDefaults();
                    }
                }
            }
        },
		setCondition: function(field, operator, value) {
            var count = this._conditionCount(),
				widgetIdCount = this._widgetIdCount();
            var   newWid = new AddressFormatConditionWidget({
                    conditionManager: this,
                    isFirstCondition: false,
                    id: this.id + '-SearchCondition' + widgetIdCount,
                    visible: true
                });
			var fieldObject;
				if (this.fieldsHash.hasOwnProperty(field)) {
					fieldObject = this.fieldsHash[field];
            }

			newWid.defaultField = field;
			newWid.defaultOperator = operator;
			newWid.defaultValue = value;
            // Default Values?
            //newWid.setCondition(field, operator, value);

            // Make sure the defaults are updated
            newWid.refreshDefaults();

            this.widgetConnects.push(dojo.connect(newWid, 'onRemoveLookupCondition', this, '_removeCondition'));
            this.conditionWidgets[newWid.id] = newWid;
            dojo.place(newWid.domNode, this.conditions);
            newWid.startup();
		},
		setFirstDefaultCondition: function(field, operator, value) {
			var wid;
			var count = this._conditionCount();
			for (wid in this.conditionWidgets) {
                if(this.conditionWidgets.hasOwnProperty(wid)) {
                  if(count === 1)
				{
					break;
				}
                }
            }		
			
			var newWid = dijit.byId(wid);

            var fieldObject;
				if (this.fieldsHash.hasOwnProperty(field)) {
					fieldObject = this.fieldsHash[field];
            }

			newWid.defaultField = field;
			newWid.defaultOperator = operator;
			newWid.defaultValue = value;
            // Default Values?
             //newWid.setCondition(field, operator, value);

            // Make sure the defaults are updated
            newWid.refreshDefaults();
		}
    });

    return widget;
});