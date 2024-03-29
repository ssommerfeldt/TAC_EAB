define("Sage/QuickForms/Design/Editors/NonVisibleAdvancedPropertyEditor", [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/layout/ContentPane',
    'dojox/layout/TableContainer',
    'dijit/form/TextBox',
    'dijit/form/NumberTextBox',
    'dijit/form/Select',
    'Sage/_Templated',
    './_PropertyEditor',
    '../PropertyValueError',
    'dojo/i18n!./nls/NonVisibleAdvancedPropertyEditor'
], function(
    declare,
    lang,
    ContentPane,
    TableContainer,
    TextBox,
    NumberTextBox,
    Select,
    _Templated,
    _PropertyEditor,
    PropertyValueError,
    localization)
{
    return declare('Sage.QuickForms.Design.Editors.NonVisibleAdvancedPropertyEditor', [ContentPane, _PropertyEditor, _Templated], {
        widgetsInTemplate: true,
        contentTemplate: new Simplate([
            '<fieldset><legend>{%= $.controlInfoText %}</legend>',
                '<div class="editor-content-half">',
                    '<div class="editor-field" title="{%= $.controlIdTooltipText %}">',
                        '<label>{%= $.controlIdText %}</label>',
                        '<div data-dojo-type="dijit.form.TextBox" data-dojo-attach-point="_controlId" data-dojo-attach-event="onChange:_onControlIdChange" data-dojo-props="disabled:true"></div>',
                    '</div>',
                '</div>',
                '<div class="editor-content-half">',
                    '<div class="editor-field" title="{%= $.controlTypeTooltipText %}">',
                        '<label>{%= $.controlTypeText %}</label>',
                        '<div data-dojo-type="dijit.form.TextBox" data-dojo-attach-point="_controlType" data-dojo-attach-event="onChange:_onControlTypeChange" data-dojo-props="disabled:true"></div>',
                    '</div>',
                '</div>',
            '</fieldset>'
        ]),

        _controlType: null,
        _controlId: null,

        //Localization
        titleText: 'Advanced',

        controlInfoText: 'Control Info',

        controlIdText: 'Control Id:',
        controlIdTooltipText: 'Identifier for this control.',
        controlTypeText: 'Control Type:',
        controlTypeTooltipText: 'Saleslogix control type.',

        constructor: function() {
            lang.mixin(this, localization);
        },
        setup: function(){
            this.inherited(arguments);

            this._controlType.set('value', this._designer.get('controlName'));
            this._controlId.set('value', this._designer.get('controlId'));
        },

        _onControlTypeChange: function(value){
        },
        _onControlIdChange: function(value){
        }
    });
});
