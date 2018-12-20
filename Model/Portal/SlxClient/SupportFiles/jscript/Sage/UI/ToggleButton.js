require({cache:{
'url:Sage/templates/ToggleButton.html':"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\r\t><span class=\"dijitReset dijitInline dijitButtonNode\"\r\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\"\r\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\r\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\r\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\r\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\r\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\r\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\r\t\t\t\tid=\"${id}_label\"\r\t\t\t\tdata-dojo-attach-point=\"containerNode\"\r\t\t\t></span\r\t\t></span\r\t></span\r\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\r\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\r/></span>\r"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/ToggleButton", [
       'dijit/form/Button',
       'dijit/_Widget',
       'dojo/text',
       'dojo/text!../templates/ToggleButton.html',
       'dojo/_base/declare'
],
function (button, _Widget, text, template, declare) {
    var widget = declare('Sage.UI.ToggleButton', button, {
        templateString: template,

        __setValueAttr: { node: 'valueNode', type: 'attribute', attribute: 'value' },
        getValue: function () {
            return this.get('label');
        },
        setValue: function (val) {
            this.set('label', val);
        },
        _onButtonClick: function (e) {
        }
    });

    return widget;
});
