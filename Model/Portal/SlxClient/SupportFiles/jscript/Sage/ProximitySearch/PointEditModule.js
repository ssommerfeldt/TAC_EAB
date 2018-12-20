/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/ProximitySearch/PointEditModule", [
    'dijit/_Widget',
    'dijit/_Templated',
    'dijit/form/Button',
    'dijit/form/ValidationTextBox',
    'dijit/Dialog',
    'dojo/_base/declare',
    'Sage/ProximitySearch/Events',
    'dojo/_base/lang',
    'dojo/i18n!./nls/PointEditModule'
],
function (_Widget, _Templated, Button, ValidationTextBox, Dialog, declare, Events, lang, PointEditModule) {
    var pointEditWidget = declare([_Widget, _Templated], {
        // Localization Strings
        newPlaceText: PointEditModule.newPlaceText,
        addPlaceText: PointEditModule.addPlaceText,
        okText: PointEditModule.okText,
        cancelText: PointEditModule.cancelText,
        nameText: PointEditModule.nameText,
        addressText: PointEditModule.addressText,
        cityText: PointEditModule.cityText,
        stateText: PointEditModule.stateText,
        postalCodeText: PointEditModule.postalCodeText,
        countryText: PointEditModule.countryText,
        helpText: PointEditModule.helpText,
        errorText: PointEditModule.errorText,

        // summary:
        //  dialog widget used for adding a custom point to the map
        templateString: "<table style='width: 100%;'>" +
          "<tr><td>${nameText}</td><td><input dojoType='dijit.form.ValidationTextBox' required='true' dojoAttachPoint='txtName' dojoAttachEvent='onKeyPress:textboxKeyPress' style='width: 100%;'/></td></tr>" +
          "<tr><td>${addressText}</td><td><input dojoType='dijit.form.ValidationTextBox' required='true' dojoAttachPoint='txtAddress' dojoAttachEvent='onKeyPress:textboxKeyPress,onKeyUp:textboxKeyUp' style='width: 100%;'/></td></tr>" +
          "<tr><td>${cityText}</td><td><input dojoType='dijit.form.ValidationTextBox' required='true' dojoAttachPoint='txtCity' dojoAttachEvent='onKeyPress:textboxKeyPress,onKeyUp:textboxKeyUp' style='width: 100%;'/></td></tr>" +
          "<tr><td>${stateText}</td><td><input dojoType='dijit.form.ValidationTextBox' required='true' dojoAttachPoint='txtState' dojoAttachEvent='onKeyPress:textboxKeyPress,onKeyUp:textboxKeyUp' style='width: 100%;'/></td></tr>" +
          "<tr><td>${postalCodeText}</td><td><input dojoType='dijit.form.ValidationTextBox' required='true' dojoAttachPoint='txtPostalCode' dojoAttachEvent='onKeyPress:textboxKeyPress,onKeyUp:textboxKeyUp' style='width: 100%;'/></td></tr>" +
          "<tr><td>${countryText}</td><td><input dojoType='dijit.form.ValidationTextBox' required='true' dojoAttachPoint='txtCountry' dojoAttachEvent='onKeyPress:textboxKeyPress,onKeyUp:textboxKeyUp' style='width: 100%;'/></td></tr>" +
          "<tr><td colspan='2' style='text-align: right'>" +
          "${helpText}" +
          "</td></tr>" +
          "<tr><td colspan='2' style='text-align: right'>" +
          "<div dojoType='dijit.form.Button' dojoAttachEvent='onClick:okBtnClick'>${okText}</div>" +
          "<div dojoType='dijit.form.Button' dojoAttachEvent='onClick:cancelBtnClick'>${cancelText}</div>" +
          "</td></tr>" +
          "</table>",
        widgetsInTemplate: true,
        onExecute: function () { },
        onCancel: function (closeAll) { },
        postCreate: function () {
            this.inherited(arguments);
            this._popup = new Dialog({ title: this.addPlaceText, style: 'width: 375px' });
            this._popup.set("content", this.domNode);
        },
        show: function () {
            this._reset();
            this._popup.show();
        },
        hide: function () {
            this._popup.hide();
        },
        //--- Public Events -------------------------------
        onCreateItem: function (name, address, city, state, postalCode, country) {
            // called when user OK the dialog
        },
        //--- Event Handlers -------------------------------
        okBtnClick: function () {
            if (this._validate()) {
                this.onCreateItem(this.txtName.get('value'), this.txtAddress.get('value'), this.txtCity.get('value'), this.txtState.get('value'), this.txtPostalCode.get('value'), this.txtCountry.get('value'));
                this.hide();
            } else {
                alert(this.errorText);
            }
        },
        cancelBtnClick: function () {
            this.hide();
        },
        textboxKeyPress: function (event) {
            if (event.keyCode == 13)
                this.okBtnClick();
        },
        textboxKeyUp: function (event) {
            // Check all
            if (this.txtAddress.get('value').length === 0 &&
                this.txtCity.get('value').length === 0 &&
                this.txtState.get('value').length === 0 &&
                this.txtPostalCode.get('value').length === 0 &&
                this.txtCountry.get('value').length === 0) {
                this.txtAddress.required = true;
                this.txtCity.required = true;
                this.txtState.required = true;
                this.txtPostalCode.required = true;
                this.txtCountry.required = true;
            } else {
                this.txtAddress.required = (this.txtAddress.get('value').length > 0);
                this.txtCity.required = (this.txtCity.get('value').length > 0);
                this.txtState.required = (this.txtState.get('value').length > 0);
                this.txtPostalCode.required = (this.txtPostalCode.get('value').length > 0);
                this.txtCountry.required = (this.txtCountry.get('value').length > 0);

                this.txtAddress.validate(true);
                this.txtCity.validate(true);
                this.txtState.validate(true);
                this.txtPostalCode.validate(true);
                this.txtCountry.validate(true);
            }
        },
        //--- Private -------------------------------
        _reset: function () {
            this.txtName.set('value', this.newPlaceText);
            this.txtAddress.set('value', '');
            this.txtCity.set('value', '');
            this.txtState.set('value', '');
            this.txtPostalCode.set('value', '');
            this.txtCountry.set('value', '');

            // Clear any validation checks
            this.txtAddress.required = false;
            this.txtCity.required = false;
            this.txtState.required = false;
            this.txtPostalCode.required = false;
            this.txtCountry.required = false;

            this.txtAddress.validate(true);
            this.txtCity.validate(true);
            this.txtState.validate(true);
            this.txtPostalCode.validate(true);
            this.txtCountry.validate(true);

            this.textboxKeyUp(null);
        },
        _validate: function () {
            var isValid = true;
            this.txtName._maskValidSubsetError = false;
            isValid = this.txtName.validate(true) && isValid;
            this.txtAddress._maskValidSubsetError = false;
            this.txtCity._maskValidSubsetError = false;
            this.txtState._maskValidSubsetError = false;
            this.txtPostalCode._maskValidSubsetError = false;
            this.txtCountry._maskValidSubsetError = false;

            // Just need one field filled in.
            isValid = (this.txtAddress.validate(true) ||
                this.txtCity.validate(true) ||
                this.txtState.validate(true) ||
                this.txtPostalCode.validate(true) ||
                this.txtCountry.validate(true)) && isValid;

            return isValid;
        }
    });
    var pointEditModule = declare("Sage.ProximitySearch.PointEditModule", null, {
        constructor: function () {
        },
        initModule: function (sb) {
            this._sandbox = sb;
            sb.subscribe(Events.SelectionNew, dojo.hitch(this, "onSelectionNew"));
        },
        onSelectionNew: function () {
            // show edit dialog for a new point
            if (!this._dlg) {
                this._dlg = new pointEditWidget();
                this._dlg.startup();
                dojo.connect(this._dlg, "onCreateItem", this, "_onCreateItem");
            }
            this._dlg.show();
        },
        //--- Private -------------------------------
        _onCreateItem: function (name, address, city, state, postalCode, country) {
            var pt = { name: name, description: '', address: address + "\n" + city + ", " + state + " " + postalCode + "\n" + country };
            this._sandbox.publish(Events.SelectionCreate, pt);
        }
    });
    return pointEditModule;
});
