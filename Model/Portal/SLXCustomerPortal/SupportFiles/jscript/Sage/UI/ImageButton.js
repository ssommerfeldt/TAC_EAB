require({cache:{
'url:Sage/templates/ImageButton.html':"<span id=\"${id}\" class=\"dijit dijitReset dijitInline\" role=\"presentation\">\r\n<span class=\"dijitReset dijitInline dijitButtonNode imageButtonNode\" data-dojo-attach-event=\"ondijitclick:_onClick\" role=\"presentation\">\r\n        <span class=\"dijitReset dijitStretch dijitButtonContents\"\r\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\r\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\r\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\">\r\n                <img alt=\"\" src=\"\" data-dojo-attach-point=\"iconNode\"/>\r\n                <div class=\"dijitIcon dijitMenuItemIcon Global_Images icon16x16 ${imageClass}\" data-dojo-attach-point=\"iconNodeSprite\"></div>\r\n            </span\r\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText circleLayout circleTheme\"\r\n\t\t\t\tid=\"${id}_label\"\r\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\r\n\t\t\t></span\r\n\t\t></span\r\n\t></span\r\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\r\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\r/></span>\r\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/ImageButton", ['dijit/form/Button',
    'dijit/_Widget',
    'dojo/text',
    'dojo/dom-style',
    'dojo/_base/declare',
    'dojo/text!../templates/ImageButton.html'
],
function (button, _Widget, text, domStyle, declare, template) {
    var widget = declare('Sage.UI.ImageButton', button, {
        hoverText: '',
        templateString: template,
        // we don't need the iconClass property so override the mapping
        // this will work for our MenuBarItem as well...
        iconClass: '',
        _setIconClassAttr: { node: 'iconNode', type: 'class' },
        
        label: '',
        _setLabelAttr: { node: 'containerNode', type: 'innerHTML' },
        
        icon: '',
        _setIconAttr: { node: 'iconNode', type: 'attribute', attribute: 'src' },
        
        imageClass: '',
        
        iconStyle: '',
        _setIconStyleAttr: { node: 'iconNode', type: 'style' },
        
        tooltip: '',
        _setTooltipAttr: { node: 'titleNode', type: 'attribute', attribute: 'title' },
        
        alt: '',
        _setAltAttr: { node: 'valueNode', type: 'attribute', attribute: 'title'},
        
        postMixInProperties: function() {
            if (this.hasImageClass() && this.hasIcon()) {
                this.icon = this._blankGif;
            } else {
                this.icon = this.icon || this._blankGif;
            }
            this.inherited(arguments);
        },
        postCreate: function () {
            this.inherited(arguments);
            if (this.hasImageClass()) {
                this.set('icon', this._blankGif);
                domStyle.set(this.iconNode, 'display', 'none');
            } else {
                domStyle.set(this.iconNodeSprite, 'display', 'none');
            }
        },
        hasImageClass: function () {
            if (this.imageClass && this.imageClass !== 'noIcon') {
                return true;
            }
            
            return false;
        },
        hasIcon: function () {
            if (this.icon && this.icon !== this._blankGif) {
                return true;
            }
            
            return false;
        },
        _onButtonClick: function (e) {
        }
    });
    
    return widget;
});
