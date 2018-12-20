require({cache:{
'url:Sage/MainView/ReportMgr/Crystal/templates/CrystalReportConditionEditor.html':"[\r\n    '<div>',\r\n        '<div data-dojo-type=\"dijit.Dialog\" title=\"{%= $._nlsResources.dlgCrystalReportConditionDetails_Title %}\" dojoAttachPoint=\"_dialog\" dojoAttachEvent=\"onCancel:_dialog_OnCancel, onShow:_dialog_OnShow\" style=\"width: 300px\">',\r\n            '<div data-dojo-type=\"dijit.form.Form\" style=\"overflow-x:hidden\">',\r\n                \r\n                '<table cellspacing=\"10\">',\r\n                    \r\n                    '<tr>',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.cmbConditionType_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',                            \r\n                            '<select dojoType=\"dijit.form.Select\" dojoAttachPoint=\"cmbConditionType\" sortByLabel=\"false\" dojoAttachEvent=\"onChange:_cmbConditionType_OnChange\" style=\"width:150px\" >',\r\n                            '</select>',\r\n                        '</td>',\r\n                    '</tr>',\r\n\r\n                    '<tr dojoAttachPoint=\"trCurrentUser\">',\r\n                        '<td>',\r\n                            '&nbsp;',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<input data-dojo-type=\"dijit.form.CheckBox\" dojoAttachPoint=\"chkCurrentUser\" dojoAttachEvent=\"onChange:_chkCurrentUser_OnChange\" /> <label>{%= $._nlsResources.chkCurrentUser_Caption %}</label>',\r\n                        '</td>',                        \r\n                    '</tr>',\r\n                    \r\n                    '<tr dojoAttachPoint=\"trUser\">',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.lkpUser_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<div dojoType=\"dijit.layout.ContentPane\" label=\"{%= $._nlsResources.lkpUser_Caption %}\" dojoAttachPoint=\"contentPaneLkpUser\" class=\"remove-padding lookup-container\" style=\"width:150px; padding: 0px !important;\"></div>',                            \r\n                        '</td>',                        \r\n                    '</tr>',\r\n\r\n                    '<tr dojoAttachPoint=\"trGroup\">',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.lkpGroup_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<div dojoType=\"dijit.layout.ContentPane\" label=\"{%= $._nlsResources.lkpGroup_Caption %}\" dojoAttachPoint=\"contentPaneLkpGroup\" class=\"remove-padding lookup-container\" style=\"width:150px; padding: 0px !important;\"></div>',                            \r\n                        '</td>',\r\n                    '</tr>',                                                       \r\n\r\n\r\n                    '<tr dojoAttachPoint=\"trDateRange\">',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.cmbDateRange_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<select dojoType=\"dijit.form.Select\" dojoAttachPoint=\"cmbDateRange\" dojoAttachEvent=\"onChange:_cmbDateRange_OnChange\" style=\"width:150px\" >',\r\n                                '<option value=\"DateRange\">{%= $._nlsResources.cmbDateRange_SpecificDates_Caption %}</option>',\r\n                                '<option value=\"ThisWeek\">{%= $._nlsResources.cmbDateRange_ThisWeek_Caption %}</option>',\r\n                                '<option value=\"ThisMonth\">{%= $._nlsResources.cmbDateRange_ThisMonth_Caption %}</option>',\r\n                                '<option value=\"ThisQuarter\">{%= $._nlsResources.cmbDateRange_ThisQuarter_Caption %}</option>',\r\n                                '<option value=\"ThisYear\">{%= $._nlsResources.cmbDateRange_ThisYear_Caption %}</option>',\r\n                                '<option value=\"LastWeek\">{%= $._nlsResources.cmbDateRange_LastWeek_Caption %}</option>',\r\n                                '<option value=\"LastMonth\">{%= $._nlsResources.cmbDateRange_LastMonth_Caption %}</option>',\r\n                                '<option value=\"LastQuarter\">{%= $._nlsResources.cmbDateRange_LastQuarter_Caption %}</option>',\r\n                                '<option value=\"LastYear\">{%= $._nlsResources.cmbDateRange_LastYear_Caption %}</option>',\r\n                                '<option value=\"MonthToDate\">{%= $._nlsResources.cmbDateRange_MonthToDate_Caption %}</option>',\r\n                                '<option value=\"QuarterToDate\">{%= $._nlsResources.cmbDateRange_QuarterToDate_Caption %}</option>',\r\n                                '<option value=\"YearToDate\">{%= $._nlsResources.cmbDateRange_YearToDate_Caption %}</option>',\r\n                            '</select>',\r\n                        '</td>',\r\n                    '</tr>',\r\n                    '<tr dojoAttachPoint=\"trFromDate\" >',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.dtFromDate_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<div shouldPublishMarkDirty=\"false\" dojoType=\"Sage.UI.Controls.DateTimePicker\" dojoAttachPoint=\"dtFromDate\" displayDate=\"true\" displayTime=\"false\" label=\"{%= $._nlsResources.dtFromDate_Caption %}\" style=\"width:150px\"></div>',\r\n                        '</td>',\r\n                    '</tr>',\r\n                    '<tr dojoAttachPoint=\"trToDate\" >',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.dtToDate_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<div shouldPublishMarkDirty=\"false\" dojoType=\"Sage.UI.Controls.DateTimePicker\" dojoAttachPoint=\"dtToDate\" displayDate=\"true\" displayTime=\"false\" label=\"{%= $._nlsResources.dtToDate_Caption %}\" style=\"width:150px\"></div>',\r\n                        '</td>',\r\n                    '</tr>',\r\n\r\n\r\n\r\n                    '<tr dojoAttachPoint=\"trTable\">',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.cmbTable_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<select dojoType=\"dijit.form.Select\" dojoAttachPoint=\"cmbTables\" style=\"width:150px\" data-dojo-props=\"maxHeight:100\" dojoAttachEvent=\"onChange:_cmbTables_OnChange\" >',\r\n                            '</select>',\r\n                        '</td>',\r\n                    '</tr>',\r\n\r\n\r\n                    '<tr dojoAttachPoint=\"trField\">',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.cmbField_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<select dojoType=\"dijit.form.Select\" dojoAttachPoint=\"cmbFields\" style=\"width:150px\" data-dojo-props=\"maxHeight:100\" dojoAttachEvent=\"onChange:_cmbFields_OnChange\" >',\r\n                            '</select>',\r\n                        '</td>',\r\n                    '</tr>',\r\n\r\n                    '<tr dojoAttachPoint=\"trOperator\">',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.cmbOperator_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<select dojoType=\"dijit.form.Select\" dojoAttachPoint=\"cmbOperators\" sortByLabel=\"false\" style=\"width:150px\" dojoAttachEvent=\"onChange:_cmbOperators_OnChange\" >',\r\n                            '</select>',\r\n                        '</td>',\r\n                    '</tr>',\r\n\r\n                    '<tr dojoAttachPoint=\"trStringValue1\">',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.txtValue_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<input type=\"text\" dojoAttachPoint=\"txtStringValue1\" required=\"false\" dojoType=\"dijit.form.TextBox\" style=\"width:150px\" />',\r\n                        '</td>',\r\n                    '</tr>',  \r\n\r\n                    '<tr dojoAttachPoint=\"trStringValue2\">',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.txtValue2_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<input type=\"text\" dojoAttachPoint=\"txtStringValue2\" required=\"false\" dojoType=\"dijit.form.TextBox\" style=\"width:150px\" />',\r\n                        '</td>',\r\n                    '</tr>',  \r\n\r\n                    '<tr dojoAttachPoint=\"trNumericValue1\">',\r\n                        '<td>',\r\n                            '<label dojoAttachPoint=\"lblNumericValue1\">{%= $._nlsResources.txtValue_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<input type=\"text\" dojoAttachPoint=\"txtNumericValue1\" required=\"false\" dojoType=\"Sage.UI.Controls.Numeric\" style=\"width:150px\" />',\r\n                        '</td>',\r\n                    '</tr>',  \r\n\r\n                    '<tr dojoAttachPoint=\"trNumericValue2\">',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.txtNumericValueTo_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<input type=\"text\" dojoAttachPoint=\"txtNumericValue2\" required=\"false\" dojoType=\"Sage.UI.Controls.Numeric\" style=\"width:150px\" />',\r\n                        '</td>',\r\n                    '</tr>',  \r\n\r\n                    '<tr dojoAttachPoint=\"trDateValue1\" >',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.dtFromDate_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<div shouldPublishMarkDirty=\"false\" dojoType=\"Sage.UI.Controls.DateTimePicker\" dojoAttachPoint=\"dtDateValue1\" displayDate=\"true\" displayTime=\"true\" label=\"{%= $._nlsResources.dtFromDate_Caption %}\" style=\"width:150px\"></div>',\r\n                        '</td>',\r\n                    '</tr>',\r\n                    '<tr dojoAttachPoint=\"trDateValue2\" >',\r\n                        '<td>',\r\n                            '<label>{%= $._nlsResources.dtToDate_Caption %}:</label>',\r\n                        '</td>',\r\n                        '<td>',\r\n                            '<div shouldPublishMarkDirty=\"false\" dojoType=\"Sage.UI.Controls.DateTimePicker\" dojoAttachPoint=\"dtDateValue2\" displayDate=\"true\" displayTime=\"true\" label=\"{%= $._nlsResources.dtToDate_Caption %}\" style=\"width:150px\"></div>',\r\n                        '</td>',\r\n                    '</tr>',\r\n\r\n                    \r\n                '</table>',\r\n                \r\n                '<div align=\"right\" style=\"margin-top:10px\">',\r\n                    '<div data-dojo-type=\"dijit.form.Button\"dojoAttachPoint=\"cmdOK\" dojoAttachEvent=\"onClick:_cmdOK_OnClick\">{%= $._nlsResources.cmdOK_Caption %}</div>',\r\n                    '<div data-dojo-type=\"dijit.form.Button\" dojoAttachPoint=\"cmdCancel\" dojoAttachEvent=\"onClick:_cmdCancel_OnClick\" style=\"margin-left:5px;\">{%= $._nlsResources.cmdCancel_Caption %}</div>',\r\n                '</div>',\r\n            '</div>',\r\n        '</div>',\r\n    '</div>'\r\n]"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/ReportMgr/Crystal/CrystalReportConditionEditor", [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/number',
    'dojo/_base/array',
    'dojo/topic',
    'dojo/i18n!./nls/CrystalReportConditionEditor',
    'dojo/text!./templates/CrystalReportConditionEditor.html',
    'dijit/_Widget',
    'Sage/_Templated',
    'dojo/_base/lang',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'Sage/UI/Controls/Lookup',
    'Sage/UI/Dialogs',
    'Sage/Data/SDataServiceRegistry',
    'dojo/data/ItemFileWriteStore',
    'Sage/Reporting/Enumerations',
    'Sage/MainView/ReportMgr/ReportManagerUtility',
    'Sage/MainView/ReportMgr/Crystal/CrystalReportsUtility',
    'dijit/form/Select',
    'dijit/form/CheckBox'
],
function (
    declare,
    dojoString,
    dojoNumber,
    dojoArray,
    topic,
    nlsResources,
    template,
    _Widget,
    _Templated,
    dojoLang,
    _DialogHelpIconMixin,
    Lookup,
    Dialogs,
    SDataServiceRegistry,
    ItemFileWriteStore,
    Enumerations,
    ReportManagerUtility,
    CrystalReportsUtility
    ) {
    /**
    * Declare the CrystalReportConditionEditor class.
    * @constructor
    */
    var crystalReportConditionEditor = declare('Sage.MainView.ReportMgr.CrystalReportConditionEditor', [_Widget, _Templated], {
        id: 'dlgCrystalReportConditionEditor',
        _dialog: false,
        _reportMetadata: null,
        widgetTemplate: new Simplate(eval(template)),
        _nlsResources: nlsResources,
        widgetsInTemplate: true,
        _entity: null,
        _mode: 'new',
        /**
        * CrystalReportConditionEditor class constructor.
        * @constructor
        * @param {Object} entity - Condition to be edited.
        * @param {Object} report - Report metadata object.
        */
        constructor: function (entity, reportMetadata) {
            this._entity = entity;
            this._reportMetadata = reportMetadata;
            if (entity) {
                this._mode = 'edit';
            }
        },
        /**
        * Displays the Dialog.
        */
        show: function () {
            this._dialog.show();

            if (!this._dialog.helpIcon) {
                dojoLang.mixin(this._dialog, new _DialogHelpIconMixin());
                this._dialog.createHelpIconByTopic('reportconditions');
            }

        },
        destroy: function () {
            this.lkpUser.destroy();
            this.lkpGroup.destroy();
            this.inherited(arguments);
        },
        //*******************************************************************************
        //EVENTS
        //*******************************************************************************
        /**
        * Function called when the dialog is shown.
        **/
        _dialog_OnShow: function () {
            ////console.log("_dialog_OnShow");
            this._initializeControls();
        },
        /**
        * Function called when the dialog is closed. Destroys the object recursively.
        */
        _closeDialog: function () {
            var self = this;
            self._dialog.hide();
            self.destroyRecursive();
            //setTimeout(function () {  }, 1000);
        },
        /**
        * Saves changes.
        */
        _cmdOK_OnClick: function () {
            if (this._isValid()) {
                this._save();
            }
        },
        /**
        * Closes the Dialog.
        */
        _cmdCancel_OnClick: function () {
            this._closeDialog();
        },
        /**
        * Closes Dialog.
        */
        _dialog_OnCancel: function () {
            this._closeDialog();
        },
        _cmbConditionType_OnChange: function () {
            this._setControlsVisibility();
        },
        _cmbDateRange_OnChange: function () {
            this._setDateRangeControlsVisibility();
        },
        _cmbTables_OnChange: function () {
            this._initializeFieldsDropdown();
        },
        _cmbFields_OnChange: function () {
            this._initializeOperatorsDropdown();
        },
        _cmbOperators_OnChange: function () {
            this._setQueryControlsVisibility();
        },
        _chkCurrentUser_OnChange: function () {
            if (this.chkCurrentUser.checked) {
                this.lkpUser.set('selectedObject', null);
            }
            ReportManagerUtility.setDomNodeVisible(this.trUser, !this.chkCurrentUser.checked);
        },
        //*******************************************************************************
        //INTERNAL FUNCTIONS
        //*******************************************************************************
        /**
        * Validates the condition values.
        **/
        _isValid: function () {
            switch (this.cmbConditionType.value) {
                case String(Enumerations.ReportConditionType.Group):
                    if (!this.lkpGroup.get('selectedObject')) {
                        Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.cmbGroup_Caption]), this._nlsResources.txtInvalidParameterTitle);
                        return false;
                    }
                    break;
                case String(Enumerations.ReportConditionType.DateRange):
                    if (this.cmbDateRange.value === "DateRange") {
                        if (this.dtFromDate.focusNode.value === "") {
                            Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.dtFromDate_Caption]), this._nlsResources.txtInvalidParameterTitle);
                            return false;
                        }
                        if (this.dtToDate.focusNode.value === "") {
                            Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.dtToDate_Caption]), this._nlsResources.txtInvalidParameterTitle);
                            return false;
                        }
                    }
                    break;
                case String(Enumerations.ReportConditionType.User):
                    if (!this.chkCurrentUser.checked && !this.lkpUser.get('selectedObject')) {
                        Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.lkpUser_Caption]), this._nlsResources.txtInvalidParameterTitle);
                    }
                    break;
                case String(Enumerations.ReportConditionType.Query):
                    if (!this.cmbTables.value || this.cmbTables.value === "") {
                        Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.cmbTable_Caption]), this._nlsResources.txtInvalidParameterTitle);
                        return false;
                    }
                    if (!this.cmbFields.value || this.cmbFields.value === "") {
                        Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.cmbField_Caption]), this._nlsResources.txtInvalidParameterTitle);
                        return false;
                    }
                    if (!this.cmbOperators.value || this.cmbOperators.value === "") {
                        Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.cmbOperator_Caption]), this._nlsResources.txtInvalidParameterTitle);
                        return false;
                    }
                    var operator = this.cmbOperators.value;
                    var fieldDataType = this._getFieldDataType();
                    switch (fieldDataType) {
                        case Enumerations.FieldDataTypes.Numeric:
                            if (operator == Enumerations.ReportConditionOperator.IsInTheRange) {
                                if (!this.txtNumericValue1.focusNode.textbox.value || this.txtNumericValue1.focusNode.textbox.value === "") {
                                    Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.txtNumericValueFrom_Caption]), this._nlsResources.txtInvalidParameterTitle);
                                    return false;
                                }
                                if (!this.txtNumericValue2.focusNode.textbox.value || this.txtNumericValue2.focusNode.textbox.value === "") {
                                    Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.txtNumericValueTo_Caption]), this._nlsResources.txtInvalidParameterTitle);
                                    return false;
                                }
                            }
                            else {
                                if (!this.txtNumericValue1.focusNode.textbox.value || this.txtNumericValue1.focusNode.textbox.value === "") {
                                    Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.txtValue_Caption]), this._nlsResources.txtInvalidParameterTitle);
                                    return false;
                                }
                            }
                            break;
                        case Enumerations.FieldDataTypes.DateTime:
                            if (operator == Enumerations.ReportConditionOperator.IsInTheRange) {
                                if (this.dtDateValue1.focusNode.value === "") {
                                    Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.dtFromDate_Caption]), this._nlsResources.txtInvalidParameterTitle);
                                    return false;
                                }
                                if (this.dtDateValue2.focusNode.value === "") {
                                    Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.dtToDate_Caption]), this._nlsResources.txtInvalidParameterTitle);
                                    return false;
                                }
                            }
                            else {
                                if (this.dtDateValue1.focusNode.value === "") {
                                    Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.dtFromDate_Caption]), this._nlsResources.txtInvalidParameterTitle);
                                    return false;
                                }
                            }
                            break;
                        case Enumerations.FieldDataTypes.String:
                            if (!this.txtStringValue1.value || this.txtStringValue1.value === "") {
                                Dialogs.showError(dojoString.substitute(this._nlsResources.txtInvalidParameterMessage, [this._nlsResources.txtValue_Caption]), this._nlsResources.txtInvalidParameterTitle);
                                return false;
                            }
                            break;
                        default:
                            console.error("Unsupported field type: " + fieldDataType);
                    }
                    break;
            }
            return true;
        },
        /**
        * Shows/Hides controls based on the condition type.
        **/
        _setControlsVisibility: function () {

            ReportManagerUtility.setDomNodeVisible(this.trUser, false);
            ReportManagerUtility.setDomNodeVisible(this.trCurrentUser, false);
            ReportManagerUtility.setDomNodeVisible(this.trGroup, false);
            ReportManagerUtility.setDomNodeVisible(this.trDateRange, false);
            ReportManagerUtility.setDomNodeVisible(this.trFromDate, false);
            ReportManagerUtility.setDomNodeVisible(this.trToDate, false);
            ReportManagerUtility.setDomNodeVisible(this.trTable, false);
            ReportManagerUtility.setDomNodeVisible(this.trField, false);
            ReportManagerUtility.setDomNodeVisible(this.trOperator, false);
            ReportManagerUtility.setDomNodeVisible(this.trValue, false);

            if (this.cmbConditionType) {

                switch (this.cmbConditionType.value) {
                    case Enumerations.ReportConditionType.Group:
                        ReportManagerUtility.setDomNodeVisible(this.trGroup, true);
                        break;
                    case Enumerations.ReportConditionType.DateRange:
                        ReportManagerUtility.setDomNodeVisible(this.trDateRange, true);
                        ReportManagerUtility.setDomNodeVisible(this.trFromDate, true);
                        ReportManagerUtility.setDomNodeVisible(this.trToDate, true);
                        break;
                    case Enumerations.ReportConditionType.User:
                        ReportManagerUtility.setDomNodeVisible(this.trUser, true);
                        ReportManagerUtility.setDomNodeVisible(this.trCurrentUser, true);
                        break;
                    case Enumerations.ReportConditionType.Query:
                        ReportManagerUtility.setDomNodeVisible(this.trTable, true);
                        ReportManagerUtility.setDomNodeVisible(this.trField, true);
                        ReportManagerUtility.setDomNodeVisible(this.trOperator, true);
                        ReportManagerUtility.setDomNodeVisible(this.trValue, true);
                        break;
                }
            }
            this._setQueryControlsVisibility();
        },
        /**
        * Shows/Hides controls based on the date range condition type.
        **/
        _setDateRangeControlsVisibility: function () {
            if (this.cmbDateRange) {
                switch (this.cmbDateRange.value) {
                    case "DateRange":
                        ReportManagerUtility.setDomNodeVisible(this.trFromDate, true);
                        ReportManagerUtility.setDomNodeVisible(this.trToDate, true);
                        break;
                    default:
                        ReportManagerUtility.setDomNodeVisible(this.trFromDate, false);
                        ReportManagerUtility.setDomNodeVisible(this.trToDate, false);
                        break;
                }
            }
        },
        /**
        * Creates controls, sets default values, etc.
        **/
        _initializeControls: function () {
            this._initializeConditionTypeDropdown();
            this._createUserLookup();
            this._createGroupLookup();
            this._setControlsVisibility();
            this._initializeTablesDropdown();
            this._setValues();
        },
        _setValues: function () {
            if (this._entity) {
                this.cmbConditionType.attr('value', this._entity.conditionType);
                //Set UI values according to the entity
                switch (this.cmbConditionType.value) {
                    case Enumerations.ReportConditionType.Group:
                        var group = this._entity.value ? ReportManagerUtility.getGroup(this._entity.value) : null;
                        this.lkpGroup.set('selectedObject', group);
                        break;
                    case Enumerations.ReportConditionType.DateRange:
                        this.cmbDateRange.attr('value', this._entity.value);
                        if (this.cmbDateRange.value === "DateRange") {
                            this.dtFromDate.set('value', this._entity.fromRange);
                            this.dtToDate.set('value', this._entity.toRange);
                        }
                        break;
                    case Enumerations.ReportConditionType.User:
                        if (this._entity.tag.toUpperCase() === ':USERID') {
                            this.chkCurrentUser.set('checked', true);
                        }
                        else {
                            var user = this._entity.value ? ReportManagerUtility.getUser(this._entity.tag) : null;
                            this.lkpUser.set('selectedObject', user);
                        }

                        break;
                    case Enumerations.ReportConditionType.Query:
                        this.cmbTables.attr('value', this._entity.table); // this triggers the loading of fields, which in turn triggers loading of operators
                        //this.cmbFields.attr('value', this._entity.field);
                        //this.cmbOperators.attr('value', this._entity.operator);
                        //var fieldDataType = this._getFieldDataType();
                        var operator = this._entity.operator;
                        switch (this._entity.dataType) {
                            case Enumerations.FieldDataTypes.Numeric:
                                if (operator == Enumerations.ReportConditionOperator.IsInTheRange) {
                                    this.txtNumericValue1.focusNode.textbox.value = this._entity.fromRange;//todo: check implementation of setvalue in the future
                                    this.txtNumericValue2.focusNode.textbox.value = this._entity.toRange;//todo: check implementation of setvalue in the future
                                }
                                else {
                                    this.txtNumericValue1.focusNode.textbox.value = this._entity.value;//todo: check implementation of setvalue in the future
                                }
                                break;
                            case Enumerations.FieldDataTypes.DateTime:
                                if (operator == Enumerations.ReportConditionOperator.IsInTheRange) {
                                    this.dtDateValue1.set('value', this._entity.fromRange);
                                    this.dtDateValue2.set('value', this._entity.toRange);
                                }
                                else {
                                    this.dtDateValue1.set('value', this._entity.value);
                                }
                                break;
                            case Enumerations.FieldDataTypes.String:
                                this.txtStringValue1.set('value', this._entity.value);
                                break;
                            default:
                                console.error("Unsupported field type: " + this._entity.dataType);
                        }
                        break;
                    default:
                        console.error("Unsupported condition type: " + this.cmbConditionType.value);
                }
            }
        },
        _initializeConditionTypeDropdown: function () {
            var conditionTypes = CrystalReportsUtility.getConditionTypes(this._reportMetadata);
            var data = {
                identifier: "conditionType",
                label: "caption",
                items: conditionTypes
            };
            var store = new ItemFileWriteStore({ data: data });
            this.cmbConditionType.setStore(store);
            this.cmbConditionType.startup();
        },
        /**
        * Creates the user lookup.
        **/
        _createUserLookup: function () {
            var lookupConfig = {
                id: '_lkpConditionUser',
                structure: [
                    {
                        label: nlsResources.txtName,
                        field: 'UserInfo.UserName',
                        sortable: true,
                        width: "400px",
                        editable: false,
                        propertyType: "System.String",
                        excludeFromFilters: false,
                        defaultValue: ""
                    }
                ],
                gridOptions: {
                    contextualCondition: function () {
                        return 'Type ne 5 and Type ne 8 and Type ne 6';
                    },
                    contextualShow: '',
                    selectionMode: 'single'
                },
                storeOptions: {
                    resourceKind: 'users',
                    include: ['UserInfo'],
                    sort: [{ attribute: 'UserInfo.UserName' }]
                },
                isModal: true,
                preFilters: [],
                returnPrimaryKey: true,
                dialogTitle: nlsResources.txtSelectUser,
                dialogButtonText: nlsResources.txtOK
            };
            this.lkpUser = new Lookup({
                id: 'lkpConditionUser',
                readonly: false,
                config: lookupConfig
            });
            //dojo.connect(this.lkpUser, 'onChange', this, '_userChanged');
            dojo.place(this.lkpUser.domNode, this.contentPaneLkpUser.domNode, 'only');
        },
        /**
        * Creates the group lookup.
        **/
        _createGroupLookup: function () {
            var familyCondition = dojoString.substitute("(upper(family) eq '${0}' or upper(family) eq '${1}')", [this._reportMetadata.family.toUpperCase(), this._reportMetadata.mainTable.toUpperCase()]);
            var groupLookupConfig = {
                id: '_lkpConditionGroup',
                structure: [
                    {
                        label: nlsResources.txtName,
                        field: 'displayName',
                        sortable: true,
                        width: "400px",
                        editable: false,
                        propertyType: "System.String",
                        excludeFromFilters: false,
                        defaultValue: ""
                    }
                ],
                gridOptions: {
                    contextualCondition: function () {
                        return familyCondition;
                    },
                    contextualShow: '',
                    selectionMode: 'single'
                },
                storeOptions: {
                    resourceKind: 'groups',
                    include: [],
                    select: ['displayName', 'name', 'family'],
                    sort: [{ attribute: 'displayName', descending: false }],
                    service: SDataServiceRegistry.getSDataService('system', false, true, false),
                    contractName: 'system'
                },
                isModal: true,
                preFilters: [],
                returnPrimaryKey: true,
                dialogTitle: nlsResources.txtSelectGroup,
                dialogButtonText: nlsResources.txtOK
            };
            this.lkpGroup = new Lookup({
                id: 'lkpConditionGroup',
                readonly: false,
                config: groupLookupConfig
            });
            //dojo.connect(this.lkpGroup, 'onChange', this, '_groupChanged');
            dojo.place(this.lkpGroup.domNode, this.contentPaneLkpGroup.domNode, 'only');
        },
        _getTableMetadata: function (tableAlias) {
            var tableMetadata = null;
            if (this._reportMetadata.tables) {
                dojoArray.some(this._reportMetadata.tables, function (entry, i) {
                    if (entry.alias === tableAlias) {
                        tableMetadata = entry;
                        return true;
                    }
                });
            }
            return tableMetadata;
        },
        _getFieldMetadata: function (tableAlias, fieldName) {
            var tableMetadata = this._getTableMetadata(tableAlias);
            var fieldMetadata = null;
            if (tableMetadata) {
                if (tableMetadata.fields) {
                    dojoArray.some(tableMetadata.fields, function (entry, i) {
                        if (entry.name == fieldName) {
                            fieldMetadata = entry;
                            return true;
                        }
                    });
                }
            }
            return fieldMetadata;
        },
        _getFieldDataType: function () {
            var tableAlias = this.cmbTables.value;
            var fieldName = this.cmbFields.value;
            var fieldMetadata = this._getFieldMetadata(tableAlias, fieldName);
            var fieldDataType = fieldMetadata && fieldMetadata.dataType ? fieldMetadata.dataType : null;
            return fieldDataType;
        },
        /**
        * Creates a DataStore for the tables dropdown.
        */
        _initializeTablesDropdown: function () {
            //console.log("_initializeTablesDropdown");
            //Needed to create a new "items" collection instead of using the existing this._reportMetadata.reportTables
            //Not sure why, but the datastore would not work properly when binding the store directly to this._reportMetadata.reportTables
            var items = [];
            if (this._reportMetadata.tables) {
                dojoArray.forEach(this._reportMetadata.tables, function (entry, i) {
                    items.push({ alias: entry.alias, displayName: entry.displayName });
                });
            }
            var data = {
                identifier: "alias",
                label: "displayName",
                items: items
            };
            var store = new ItemFileWriteStore({ data: data });
            this.cmbTables.setStore(store);
            this.cmbTables.startup();
        },
        /**
        * Creates a DataStore for the fields dropdown.
        */
        _initializeFieldsDropdown: function () {
            //console.log("_initializeFieldsDropdown");
            var tableAlias = this.cmbTables.value;
            var tableMetadata = this._getTableMetadata(tableAlias);
            var reportFields = tableMetadata && tableMetadata.fields ? tableMetadata.fields : [];
            //Needed to create a new "items" collection instead of using the existing tableMetadata.fields
            //Not sure why, but the datastore would not work properly when binding the store directly to tableMetadata.fields
            var items = [];
            dojoArray.forEach(reportFields, function (entry, i) {
                items.push({ name: entry.name, displayName: entry.displayName });
            });
            var data = {
                identifier: "name",
                label: "displayName",
                items: items
            };
            var store = new ItemFileWriteStore({ data: data });
            this.cmbFields.setStore(store);
            this.cmbFields.startup();

            if (this._entity) {
                this.cmbFields.attr('value', this._entity.field);
            }
        },
        /**
        * Creates a DataStore for the operators dropdown.
        */
        _initializeOperatorsDropdown: function () {
            //console.log("_initializeOperatorsDropdown");
            var fieldType = this._getFieldDataType();
            var operators = ReportManagerUtility.getOperators(fieldType);
            var data = {
                identifier: "operator",
                label: "caption",
                items: operators
            };
            var store = new ItemFileWriteStore({ data: data });
            this.cmbOperators.setStore(store);
            this.cmbOperators.startup();

            if (this._entity) {
                this.cmbOperators.attr('value', this._entity.operator);
            }
        },
        _save: function () {

            if (!this._entity) {
                this._entity = {
                    conditionType: this.cmbConditionType.value,
                    tableName: null,
                    fieldName: null,
                    operator: null,
                    value: null,
                    fromValue: null,
                    toValue: null,
                    dataType: null,
                    tag: null
                };
            }

            //Clear values from the entity
            this._entity.conditionType = this.cmbConditionType.value;
            this._entity.table = null;
            this._entity.field = null;
            this._entity.operator = null;
            this._entity.value = null;
            this._entity.fromRange = null;
            this._entity.toRange = null;
            this._entity.dataType = null;
            this._entity.tag = null;

            //Set entity values according to the UI
            switch (this.cmbConditionType.value) {
                case Enumerations.ReportConditionType.Group:
                    var group = this.lkpGroup.get('selectedObject');
                    this._entity.value = group.family + ":" + group.name;
                    this._entity.tag = group.$key;
                    this._entity.operator = String(Enumerations.ReportConditionOperator.Is);
                    this._entity.dataType = Enumerations.FieldDataTypes.String;
                    break;
                case Enumerations.ReportConditionType.DateRange:
                    this._entity.dataType = Enumerations.FieldDataTypes.DateTime;
                    if (this.cmbDateRange.value === "DateRange") {
                        this._entity.operator = String(Enumerations.ReportConditionOperator.IsInTheRange);
                        this._entity.value = null;
                        this._entity.fromRange = this.dtFromDate.get('value');
                        this._entity.toRange = this.dtToDate.get('value');
                    }
                    else {
                        this._entity.operator = String(Enumerations.ReportConditionOperator.Is);
                        this._entity.value = this.cmbDateRange.value;
                    }
                    break;
                case Enumerations.ReportConditionType.User:
                    if (this.chkCurrentUser.checked) {
                        this._entity.value = nlsResources.chkCurrentUser_Caption;
                        this._entity.tag = ':UserID';
                    }
                    else {
                        var user = this.lkpUser.get('selectedObject');
                        this._entity.value = user.$descriptor;
                        this._entity.tag = user.$key;
                    }
                    this._entity.operator = String(Enumerations.ReportConditionOperator.Is);
                    this._entity.dataType = Enumerations.FieldDataTypes.String;
                    break;
                case Enumerations.ReportConditionType.Query:

                    var operator = this.cmbOperators.value;
                    this._entity.table = this.cmbTables.value;
                    this._entity.field = this.cmbFields.value;
                    this._entity.operator = operator;
                    var fieldDataType = this._getFieldDataType();
                    this._entity.dataType = fieldDataType;
                    switch (fieldDataType) {
                        case Enumerations.FieldDataTypes.Numeric:
                            // use dojoNumber.parse to get a "standard number" and not a localized one.
                            var commaStrippedValue1 = dojoNumber.parse(this.txtNumericValue1.focusNode.textbox.value);


                            if (operator == Enumerations.ReportConditionOperator.IsInTheRange) {
                                var commaStrippedValue2 = dojoNumber.parse(this.txtNumericValue2.focusNode.textbox.value);
                                this._entity.fromRange = parseInt(commaStrippedValue1, 10);//todo: check future implementation of get('value')
                                this._entity.toRange = parseInt(commaStrippedValue2, 10);//todo: check future implementation of get('value')
                            }
                            else {
                                this._entity.value = parseInt(commaStrippedValue1, 10);//todo: check future implementation of get('value')
                            }
                            break;
                        case Enumerations.FieldDataTypes.DateTime:
                            if (operator == Enumerations.ReportConditionOperator.IsInTheRange) {
                                this._entity.fromRange = this.dtDateValue1.get('value');
                                this._entity.toRange = this.dtDateValue2.get('value');
                            }
                            else {
                                this._entity.value = this.dtDateValue1.get('value');
                            }
                            break;
                        case Enumerations.FieldDataTypes.String:
                            this._entity.value = this.txtStringValue1.get('value');
                            break;
                        default:
                            console.error("Unsupported field type: " + fieldDataType);
                    }
                    break;
                default:
                    console.error("Unsupported condition type: " + this.cmbConditionType.value);
            }
            if (this._mode === 'new') {
                topic.publish("/reportManager/reportWizard/createCondition", this._entity);
            }
            else {
                topic.publish("/reportManager/reportWizard/updateCondition", this._entity);
            }
            this._closeDialog();
        },
        _setQueryControlsVisibility: function () {
            ReportManagerUtility.setDomNodeVisible(this.trStringValue1, false);
            ReportManagerUtility.setDomNodeVisible(this.trStringValue2, false);
            ReportManagerUtility.setDomNodeVisible(this.trNumericValue1, false);
            ReportManagerUtility.setDomNodeVisible(this.trNumericValue2, false);
            ReportManagerUtility.setDomNodeVisible(this.trDateValue1, false);
            ReportManagerUtility.setDomNodeVisible(this.trDateValue2, false);
            if (this.cmbConditionType.value !== Enumerations.ReportConditionType.Query) {
                return;
            }
            var fieldDataType = this._getFieldDataType();
            var operator = this.cmbOperators.value;
            switch (fieldDataType) {
                case Enumerations.FieldDataTypes.Numeric:
                    this.lblNumericValue1.innerHTML = this._nlsResources.txtValue_Caption + ":";
                    ReportManagerUtility.setDomNodeVisible(this.trNumericValue1, true);
                    if (operator == Enumerations.ReportConditionOperator.IsInTheRange) {
                        this.lblNumericValue1.innerHTML = this._nlsResources.txtNumericValueFrom_Caption + ":";
                        ReportManagerUtility.setDomNodeVisible(this.trNumericValue2, true);
                    }
                    break;
                case Enumerations.FieldDataTypes.DateTime:
                    ReportManagerUtility.setDomNodeVisible(this.trDateValue1, true);
                    if (operator == Enumerations.ReportConditionOperator.IsInTheRange) {
                        ReportManagerUtility.setDomNodeVisible(this.trDateValue2, true);
                    }
                    break;
                case Enumerations.FieldDataTypes.String:
                    ReportManagerUtility.setDomNodeVisible(this.trStringValue1, true);
                    break;
                default:
                    this._initializeFieldsDropdown();
                    this._initializeOperatorsDropdown();
                    ReportManagerUtility.setDomNodeVisible(this.trStringValue1, true);
            }
        }
    });
    return crystalReportConditionEditor;
});