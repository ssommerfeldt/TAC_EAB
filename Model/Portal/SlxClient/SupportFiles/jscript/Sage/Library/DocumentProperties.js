require({cache:{
'url:Sage/Library/templates/DocumentProperties.html':"[\r\n'<div>',\r\n'    <div dojoType=\"dijit.Dialog\" id=\"propertiesDialog\" title=\"{%= Sage.Utility.htmlEncode($.resources.DocumentProperties) %}\" dojoAttachPoint=\"_dialog\">',\r\n'        <div dojoType=\"dijit.form.Form\" id=\"propertiesForm\" method=\"POST\" onSubmit=\"return true;\">',\r\n'            <table style=\"border: 1px solid #9f9f9f;\" cellspacing=\"10\">',\r\n'                <tr>',\r\n'                    <td>',\r\n'                        <label for=\"FileName\">{%= $.resources.FileName %}:</label>',\r\n'                    </td>',\r\n'                    <td>',\r\n'                        <input class=\"libInputText\" type=\"text\" id=\"fileName\" name=\"fileName\" required=\"true\" maxlength=\"255\" dojoType=\"dijit.form.ValidationTextBox\" />',\r\n'                    </td>',\r\n'                    <td>',\r\n'                        <label for=\"CreateDate\">{%= $.resources.Created %}:</label>',\r\n'                    </td>',\r\n'                    <td>',\r\n'                        <input type=\"text\" id=\"createDate\" name=\"createDate\" disabled=\"disabled\" dojoType=\"dijit.form.DateTextBox\" />',\r\n'                    </td>',\r\n'                </tr>',\r\n'                <tr>',\r\n'                    <td>',\r\n'                        <label for=\"Directroy\">{%= $.resources.Directory %}:</label>',\r\n'                    </td>',\r\n'                    <td>',\r\n'                        <input class=\"libInputText\" type=\"text\" id=\"directory.fullPath\" name=\"directory.fullPath\" maxlength=\"255\" dojoType=\"dijit.form.TextBox\" />',\r\n'                    </td>',\r\n'                    <td>',\r\n'                        <label for=\"RevisionDate\">{%= $.resources.Revised %}:</label>',\r\n'                    </td>',\r\n'                    <td>',\r\n'                        <input type=\"text\" id=\"revisionDate\" name=\"revisionDate\" required=\"false\" dojoType=\"dijit.form.DateTextBox\" />',\r\n'                    </td>',\r\n'                </tr>',\r\n'                <tr>',\r\n'                    <td>',\r\n'                        <label for=\"Status\">{%= $.resources.Status %}:</label>',\r\n'                    </td>',\r\n'                    <td>',\r\n'                        <input class=\"libInputText\" type=\"text\" id=\"status\" name=\"status\" required=\"false\" dojoType=\"dijit.form.TextBox\" />',\r\n'                    </td>',\r\n'                    <td>',\r\n'                        <label for=\"ExpireDate\">{%= $.resources.Expires %}:</label>',\r\n'                    </td>',\r\n'                    <td>',\r\n'                        <div id=\"expiresRoot\" name=\"expiresRoot\"></div>',\r\n'                    </td>',\r\n'                </tr>',\r\n'                <tr>',\r\n'                    <td>',\r\n'                        <label for=\"FileSize\">{%= $.resources.Size %}:</label>',\r\n'                    </td>',\r\n'                    <td>',\r\n'                        <input class=\"libInputText\" type=\"text\" id=\"fileSize\" name=\"fileSize\" required=\"false\" dojoType=\"dijit.form.TextBox\" />',\r\n'                    </td>',\r\n'                    <td>',\r\n'                    </td>',\r\n'                    <td>',\r\n'                        <input type=\"checkbox\" dojoType=\"dijit.form.CheckBox\" id=\"doNotExpire\" name=\"doNotExpire\" dojoAttachEvent=\"onChange:_doNotExpireChange\" />',\r\n'                        <label for=\"doNotExpire\">{%= $.resources.DoNotExpire %}</label>',\r\n'                    </td>',\r\n'                </tr>',\r\n'            </table>',\r\n'            <br><label for=\"Description\">{%= $.resources.Description %}:</label>',\r\n'            <br>',\r\n'            <textarea class=\"libTextBox\" id=\"description\" name=\"description\" maxlength=\"255\" dojoType=\"dijit.form.Textarea\"></textarea>',\r\n'            <br><br>',\r\n'            <label for=\"abstract\">{%= $.resources.Abstract %}:</label>',\r\n'            <br>',\r\n'            <textarea class=\"libTextBox\" id=\"abstract\" name=\"abstract\" dojoType=\"dijit.form.Textarea\"></textarea>',\r\n'            <p></p>',\r\n'            <input type=\"checkbox\" dojoType=\"dijit.form.CheckBox\" id=\"forceDistribution\" name=\"forceDistribution\" />',\r\n'            <label for=\"forceDistribution\">{%= $.resources.ForceDistribution %}</label>',\r\n'            <div style=\"text-align: right\">',\r\n'                <button class=\"libOkBtn\" dojoType=\"dijit.form.Button\" id=\"okButton\" type=\"button\" dojoAttachEvent=\"onClick:_submitClick\">{%= $.resources.OK %}</button>',\r\n'                &nbsp;',\r\n'                <button dojoType=\"dijit.form.Button\" id=\"cancelButton\" type=\"button\" dojoAttachEvent=\"onClick:_cancelClick\">{%= $.resources.Cancel %}</button>',\r\n'            </div>',\r\n'            <div style=\"display: none\">',\r\n'                <input type=\"text\" dojoType=\"dijit.form.DateTextBox\" id=\"expireDate\" name=\"expireDate\" value=\"\" />',\r\n'            </div>',\r\n'            <input type=\"hidden\" dojoType=\"dijit.form.TextBox\" id=\"$key\" name=\"$key\" value=\"\" />',\r\n'            <input type=\"hidden\" dojoType=\"dijit.form.TextBox\" id=\"$etag\" name=\"$etag\" value=\"\" />',\r\n'            <input type=\"hidden\" dojoType=\"dijit.form.TextBox\" id=\"expires\" name=\"expires\" value=\"\" />',\r\n'            <input type=\"hidden\" dojoType=\"dijit.form.TextBox\" id=\"flags\" name=\"flags\" value=\"\" />',\r\n'            <input type=\"hidden\" dojoType=\"dijit.form.TextBox\" id=\"abstract$originalValue\" name=\"abstract$originalValue\" value=\"\" />',\r\n'            <input type=\"hidden\" dojoType=\"dijit.form.TextBox\" id=\"description$originalValue\" name=\"description$originalValue\" value=\"\" />',\r\n'            <input type=\"hidden\" dojoType=\"dijit.form.TextBox\" id=\"expireDate$originalValue\" name=\"expireDate$originalValue\" value=\"\" />',\r\n'            <input type=\"hidden\" dojoType=\"dijit.form.TextBox\" id=\"fileName$originalValue\" name=\"fileName$originalValue\" value=\"\" />',\r\n'            <input type=\"hidden\" dojoType=\"dijit.form.TextBox\" id=\"revisionDate$originalValue\" name=\"revisionDate$originalValue\" value=\"\" />',\r\n'        </div>',\r\n'    </div>',\r\n'</div>'\r\n]"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Library/DocumentProperties", [
        'Sage/_Templated',
        'dijit/_Widget',
        'dojo/i18n',
        'Sage/Utility',
        'dijit/Dialog',
        'dijit/form/CheckBox',
        'dijit/form/DateTextBox',
        'dijit/form/Form',
        'dijit/form/Textarea',
        'dijit/form/TextBox',
        'dijit/form/ValidationTextBox',
        'dijit/layout/LayoutContainer',
        'Sage/UI/Controls/_DialogHelpIconMixin',
        'dojo/_base/lang',        
        'dojo/dom-construct',
        'dojo/i18n!./nls/DocumentProperties',
        'dojo/text!./templates/DocumentProperties.html',
        'dojo/_base/declare'
    ],
// ReSharper disable InconsistentNaming
    function (_Templated, _Widget, i18n, Utility, Dialog, CheckBox, DateTextBox, Form, Textarea, TextBox,
        ValidationTextBox, LayoutContainer, DialogHelpIconMixin, dLang, domConstruct, nls, template, declare) {
        
        var oDocumentProperties = declare('Sage.Library.DocumentProperties', [_Widget, _Templated], {
            _cancelClick: function () {
                this.hide();
            },
            _dialog: false,
            _doNotExpireChange: function (newValue) {
                if (this._ready) {
                    if (newValue === true) {
                        this._updateExpires(false, null);
                    }
                    else {
                        var originalValue = dijit.byId('expireDate$originalValue').get('value');
                        var originalDate = new Date();
                        if (originalValue && dojo.isString(originalValue) && Utility.Convert.isDateString(originalValue)) {
                            originalDate = Utility.Convert.toDateFromString(originalValue);
                            originalDate = new Date(originalDate.getUTCFullYear(), originalDate.getUTCMonth(), originalDate.getUTCDate());
                        }
                        this._updateExpires(true, originalDate);
                    }
                }
            },
            _neverExpireDate: new Date(2099, 0, 1),
            _ready: false,
            _submitClick: function () {
                this.hide();
                Sage.Library.FileHandler.validateProperties(this.getData());
            },
            _updateExpires: function (expires, expireDate) {
                if (expires === false) {
                    var textBox = dijit.byId('neverExpireControl');
                    if (!textBox) {
                        textBox = new TextBox({}, 'neverExpireControl');
                        textBox.set('disabled', 'disabled');
                    }
                    textBox.set('value', this.resources.Never);
                    dijit.byId('expireDate').set('value', this._neverExpireDate);
                    dojo.place(textBox.domNode, 'expiresRoot', 'only');
                }
                else {
                    var dateTextBox = dijit.byId('expireDateControl');
                    if (!dateTextBox) {
                        dateTextBox = new DateTextBox({}, 'expireDateControl');
                        dateTextBox.set('onChange', function (newValue) {
                            dijit.byId('expireDate').set('value', newValue);
                        });
                    }
                    dateTextBox.set('value', expireDate);
                    dojo.place(dateTextBox.domNode, 'expiresRoot', 'only');
                }
            },
            resources: {},
            constructor: function () {
                this.inherited(arguments);
                this.resources = {};               
            },
            postMixInProperties: function () {
                dLang.mixin(this.resources, nls);                
                this.inherited(arguments);
            },
            postCreate: function () {
                this.inherited(arguments);
                var fileName = dijit.byId('fileName');
                if (fileName) {
                    fileName.regExp = '[^\\\\/:"*?<>|\r\n]+';
                    fileName.invalidMessage = this.resources.InvalidFileName;
                }
                dLang.mixin(this._dialog, new DialogHelpIconMixin());
                this._dialog.createHelpIconByTopic('libraryfileproperties');                 
            },
            getData: function () {
                var form = dijit.byId('propertiesForm');
                if (form) {
                    return form.get('value');
                }
                return false;
            },
            hide: function () {
                this._dialog.hide();
            },
            show: function (entry, readOnly) {
                this._ready = false;
                var self = this;
                var form = dijit.byId('propertiesForm');
                if (!this._dialog.onFocusEvent) {
                    this._dialog.onFocusEvent = dojo.connect(this._dialog, 'onFocus', function () {
                        if (form) {
                            self._updateExpires(entry.expires, entry['expireDate']);
                            form.set('value', entry);
                        }
                        self._ready = true;
                    });
                }
                if (!this._dialog.onHideEvent) {
                    this._dialog.onHideEvent = dojo.connect(this._dialog, 'onHide', function () {
                        dojo.disconnect(self._dialog.onFocusEvent);
                        dojo.disconnect(self._dialog.onHideEvent);
                        self._dialog.onFocusEvent = null;
                        self._dialog.onHideEvent = null;
                        self._ready = false;
                    });
                }
                dijit.byId('doNotExpire').set('checked', (entry.expires === false));
                dijit.byId('forceDistribution').set('checked', (entry.flags === 1));
                dijit.byId('directory.fullPath').set('readOnly', true);
                dijit.byId('status').set('readOnly', true);
                dijit.byId('fileSize').set('readOnly', true);
                if (readOnly) {
                    dijit.byId('doNotExpire').set('disabled', 'disabled');
                    dijit.byId('forceDistribution').set('disabled', 'disabled');
                    dijit.byId('fileName').set('readOnly', true);
                    dijit.byId('revisionDate').set('disabled', 'disabled');
                    dijit.byId('description').set('readOnly', true);
                    dijit.byId('abstract').set('readOnly', true);
                    dijit.byId('okButton').set('disabled', 'disabled');
                }
                this._dialog.show();
            },
            widgetsInTemplate: true,
            widgetTemplate: new Simplate(eval(template))
        });

        return oDocumentProperties;
    }
);