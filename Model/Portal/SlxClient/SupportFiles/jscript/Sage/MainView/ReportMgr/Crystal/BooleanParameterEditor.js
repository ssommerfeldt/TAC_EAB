/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/text!./templates/BooleanParameterEditor.html',
    'dojo/i18n!./nls/BooleanParameterEditor',
    'Sage/MainView/ReportMgr/Crystal/_ParameterEditorBase',
    'Sage/MainView/ReportMgr/ReportManagerUtility',
    'dojo/data/ItemFileWriteStore',
    'dijit/form/Select',
    'Sage/Utility'
],
function (
    declare,
    dojoArray,
    template,
    nlsResources,
    _ParameterEditorBase,
    ReportManagerUtility,
    ItemFileWriteStore,
    Select,
    Utility
) {

    var __widgetTemplate = Utility.makeTemplateFromString(template);

    /**
    * Declare the BooleanParameterEditor class.
    * @constructor
    */
    var booleanParameterEditor = declare('Sage.MainView.ReportMgr.Crystal.BooleanParameterEditor', [_ParameterEditorBase], {
        widgetTemplate: __widgetTemplate,
        //Value attribute
        value: null,
        _setValueAttr: function (value) {
            this._set("value", value);
            //TODO: implement _setValueAttr
        },
        _getValueAttr: function () {
            var currentValue = this._getCurrentValue();
            if (currentValue) {
                this._promptParameter.currentValues = [currentValue];
            }
            return this._promptParameter;
        },
        /**
        * BooleanParameterEditor class constructor.
        * @constructor
        * @param {Object} promptParameter - Parameter to be edited
        */
        constructor: function (promptParameter) {
            //Note that the base class constructor is automatically called prior to this.
            //console.log("BooleanParameterEditor constructor");
            //Add initialization of internal properties here
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        startup: function () {
            //console.log("BooleanParameterEditor startup");
            this.inherited(arguments);
            this._initializeValuesDropdown();
            ReportManagerUtility.setDomNodeVisible(this.divValidationMessage, false);
        },
        /*destroy: function () {
            this.inherited(arguments);
        },*/

        isValid: function () {
            var valid = true;
            var msg = "";
            var currentValue = this._getCurrentValue();
            if (!this._allowCustomValues) {
                if (currentValue === null) {
                    msg = nlsResources.txtPleaseSpecifyValue;
                    valid = false;
                }
            }
            this._showValidationMessage(msg);
            return valid;
        },

        _showValidationMessage: function (msg) {
            this.spanValidationMessage.innerHTML = Sage.Utility.htmlEncode(msg);
            ReportManagerUtility.setDomNodeVisible(this.divValidationMessage, (msg !== ""));
        },

        _getCurrentValue: function () {

            var _id = this.cmbValues.value;
            if (_id !== null && _id !== "" && _id !== "-1") {
                //If _id is -1, it means that the user has not chosen an actual value, 
                //but rather "..." is selected. If that is the case, ignore the value.
                var value = this._getOriginalParameterValue(_id);
                return value;
            }
            return null;
        },

        _initializeValuesDropdown: function () {

            var items = dojo.clone(this._values); //Note we clone the object, as the datastore modifies it

            //If there are no initial values, we display a "..." value
            if (this._initialIds.length === 0) {
                items.unshift({
                    _id: '-1',
                    description: '...'
                });
            }

            //console.log("_initializeValuesDropdown");
            var data = {
                identifier: "_id",
                label: "description",
                items: items
            };
            var store = new ItemFileWriteStore({ data: data });
            this.cmbValues.setStore(store);
            this.cmbValues.startup();

            //Apply "initial value", which should be selected when the parameter is displayed to the user
            if (this._initialValues.length > 0) {
                var initialValue = this._initialValues[0];
                //Look for a corresponding item with same value in the values collection.
                //If found, select based on the temporary "_id" property.
                var self = this;
                dojoArray.some(this._values, function (entry, i) {
                    if (entry.value === initialValue.value) {
                        self.cmbValues.attr('value', entry._id);
                        return true;
                    }
                });
            }
        }
    });
    return booleanParameterEditor;
});