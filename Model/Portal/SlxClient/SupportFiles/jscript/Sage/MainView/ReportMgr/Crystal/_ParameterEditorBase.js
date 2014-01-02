/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/number',
    'dijit/_Widget',
    'Sage/_Templated',
    'Sage/Utility',
    'Sage/Reporting/Enumerations'
],
function (
    declare,
    dojoArray,
    dojoNumber,
    _Widget,
    _Templated,
    Utility,
    Enumerations
) {
    /**
    * Declare the _ParameterEditorBase class.
    * @constructor
    */
    var _parameterEditorBase = declare('Sage.MainView.ReportMgr.Crystal._ParameterEditorBase', [_Widget, _Templated], {
        widgetsInTemplate: true,
        _promptParameter: null,
        _multiSelect: false,
        _mode: 'Discrete',
        _values: null,
        _initialValues: null,
        _initialCustomValues: null,
        _initialIds: null,
        _allowCustomValues: false,
        _minimum: null,
        _maximum: null,
        /**
        * BooleanParameterEditor class constructor.
        * @constructor
        * @param {Object} promptParameter - Parameter to be edited
        */
        constructor: function (promptParameter) {
            //Note that non-scalar properties need to be initialized in the constructor, 
            //otherwise they are shared among class instances.
            //http://dojotoolkit.org/reference-guide/1.9/dojo/_base/declare.html - see Arrays and Objects as Member Variables
            //console.log("_ParameterEditorBase constructor");
            this._values = [];
            this._initialValues = [];
            this._initialCustomValues = [];
            this._initialIds = [];
            this._promptParameter = promptParameter;
            this._initializeParameterProperties();
        },
        /**
        * This is a last method in the initialization process. 
        * It is called after all the child widgets are rendered so it's good for a container widget to finish it's post rendering here. 
        * This is where the container widgets could for example set sizes of their children relative to it's own size.
        */
        /*startup: function () {
            this.inherited(arguments);
            
        },*/
        isValid: function () {
            return true;
        },
        _initializeParameterProperties: function () {

            //Nomenclature:
            //this._promptParameter.defaultValues: 
            //The collection of values that should be displayed by the widget.
            //this._promptParameter.initialValues:
            //The collection of values that should be selected/displayed by default by the widget.
            //this._promptParameter.currentValues:
            //The collection of values actually selected/entered by the user. When editing an existing schedule, 
            //we use this collection as the point of reference for values that should be selected/displayed by default.


            var self = this;
            this._allowCustomValues = this._promptParameter.allowCustomCurrentValues;
            this._multiSelect = this._promptParameter.allowMultiValue;
            this._mode = this._promptParameter.valueRangeKind;
            var showDescriptionAndValue = (this._promptParameter.defaultValueDisplayType == 'DescriptionAndValue');

            //Preprocess defaultValues to get a cleaner collection.
            //Note we create a temporary "_id" property to help us correlate elements 
            //in the original defaultValues collection to elements in the new _values collection.
            var _id = 0;
            if (this._promptParameter.defaultValues) {
                dojoArray.forEach(this._promptParameter.defaultValues, function (entry, i) {
                    var strId = _id + ""; //Note we convert to string, as otherwise dojo datastores misbehave
                    entry._id = strId;
                    var parameterValue = (entry.className === "CrystalReports.ParameterFieldDiscreteValue") ? entry.discreteValue.actualValue : entry.rangeValue;
                    var description = (entry.className === "CrystalReports.ParameterFieldDiscreteValue") ? entry.description : 'Range'; //TODO: description????
                    var parameterClass = (entry.className === "CrystalReports.ParameterFieldDiscreteValue") ? 'Discrete' : 'Range';

                    if (showDescriptionAndValue && dojo.isString(description)) {
                        description = parameterValue + " - " + description;
                    }

                    if (!dojo.isString(description)) {
                        description = parameterValue;
                    }

                    var value = {
                        _id: strId,
                        value: parameterValue,
                        description: description,
                        parameterClass: parameterClass
                    };
                    self._values.push(value);
                    _id++;
                });
            }

            //If the parameter has the currentvalues collection populated, it means we are editing
            //an existing schedule. If that is the case, we use those values as the initial values.
            //Otherwise, we use the values from the initialValues collection, which comes from the report metadata.
            var initialValues = this._promptParameter.currentValues.length > 0 ? this._promptParameter.currentValues : this._promptParameter.initialValues;

            //Preprocess initialValues to get a cleaner collection.
            if (initialValues) {
                dojoArray.forEach(initialValues, function (entry, i) {
                    var parameterValue = (entry.className === "CrystalReports.ParameterFieldDiscreteValue") ? entry.discreteValue.actualValue : entry.rangeValue;
                    var description = (entry.className === "CrystalReports.ParameterFieldDiscreteValue") ? entry.description : 'Range'; //TODO: description????
                    var parameterClass = (entry.className === "CrystalReports.ParameterFieldDiscreteValue") ? 'Discrete' : 'Range';
                    var value = {
                        value: parameterValue,
                        description: description,
                        parameterClass: parameterClass
                    };
                    self._initialValues.push(value);
                });
            }

            //Calculate list of ids for "initial values", which should be pre-selected 
            //when the parameter is displayed to the user.
            if (this._initialValues.length > 0) {
                dojoArray.forEach(this._initialValues, function (initialValue, i) {
                    //Look for a corresponding item with same value in the _values collection.
                    var found = false;
                    dojoArray.some(self._values, function (entry, i) {
                        if (entry.value === initialValue.value) {
                            self._initialIds.push(entry._id);
                            found = true;
                            return true;
                        }
                    });
                    if (!found) {
                        //If the current initial value is not in the list of default values, that means it is a custom value
                        //So we add the value to the _initialCustomValues collection.
                        self._initialCustomValues.push(initialValue);
                    }

                });
            }

            //Minimum and maximum            
            switch (this._promptParameter.parameterValueKind) {

                /*case Enumerations.SlxParameterValueKind.StringParameter:
                    return new StringParameterEditor(parameter);*/

                case Enumerations.SlxParameterValueKind.DateParameter:

                    //Note: We get rid of the time part and offset of dates, even when setting useOffset argument as false.
                    //This is because otherwise, the Convert returns a date with offset applied.
                    //For example, "2013-01-01T00:00:00-05:00" is interpreted as "12/31/2012", which is not what we require here.
                    //This is a hack, there should be a better way to implement this.

                    if (this._promptParameter.minimumValue && this._promptParameter.minimumValue.discreteValue) {
                        this._minimum = Utility.Convert.toDateFromString(this._getDateOnlyIsoString(this._promptParameter.minimumValue.discreteValue.actualValue));
                    }
                    if (this._promptParameter.maximumValue && this._promptParameter.maximumValue.discreteValue) {
                        this._maximum = Utility.Convert.toDateFromString(this._getDateOnlyIsoString(this._promptParameter.maximumValue.discreteValue.actualValue));
                    }
                    break;

                case Enumerations.SlxParameterValueKind.NumberParameter:
                case Enumerations.SlxParameterValueKind.StringParameter:
                    if (this._promptParameter.minimumValue && this._promptParameter.minimumValue.discreteValue) {
                        this._minimum = dojoNumber.parse(this._promptParameter.minimumValue.discreteValue.actualValue);
                    }
                    if (this._promptParameter.maximumValue && this._promptParameter.maximumValue.discreteValue) {
                        this._maximum = dojoNumber.parse(this._promptParameter.maximumValue.discreteValue.actualValue);
                    }
                    break;
            }
        },
        _getOriginalParameterValue: function (_id) {
            var originalValue = null;
            dojoArray.some(this._promptParameter.defaultValues, function (entry, i) {
                if (entry._id == _id) {
                    originalValue = dojo.clone(entry);
                    delete originalValue._id; //get rid of the temporary "_id" attribute
                    return true;
                }
            });
            return originalValue;
        },
        _getValue: function (_id) {
            var value = null;
            dojoArray.some(this._values, function (entry, i) {
                if (entry._id == _id) {
                    value = dojo.clone(entry);
                    return true;
                }
            });
            return value;
        },
        _getSelectionMode: function () {
            var selectionMode = "";
            if (this._multiSelect) {
                selectionMode = "MultiSelect";
            } else {
                selectionMode = "SingleSelect";
            }

            if (this._allowCustomValues) {
                selectionMode = selectionMode + "WithCustom";
            }
            else {
                selectionMode = selectionMode + "NoCustom";
            }
            return selectionMode;
        },
        _getDateOnlyIsoString: function (isoDate) {
            //The iso date comes in form "2013-01-01T00:00:00-05:00".
            //We get rid of the substring after the "T" to take out time part and offset.
            var dateOnlyIsoString = null;
            if (isoDate.indexOf('T') !== -1) {
                dateOnlyIsoString = isoDate.split('T')[0];
            }
            return dateOnlyIsoString;
        }
    });
    return _parameterEditorBase;
});