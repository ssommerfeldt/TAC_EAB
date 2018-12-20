require({cache:{
'url:Sage/templates/MenuItem.html':"<tr class=\"dijitReset\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\r\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\r\n\t\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\r\n        <div class=\"dijitIcon dijitMenuItemIcon Global_Images icon16x16 ${imageClass}\" data-dojo-attach-point=\"iconNodeSprite\"></div>\r\n\t</td>\r\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,textDirNode\"\r\n\t\trole=\"presentation\"></td>\r\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\r\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\r\n\t\t<span data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\r\n\t\t\t<span class=\"dijitInline dijitIcon dijitMenuExpand\"></span>\r\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\r\n\t\t</span>\r\n\t</td>\r\n</tr>\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/MenuItem", [
        'dijit/MenuItem',
        'dijit/_Widget',
        'dojo/dom-style',
        'dojo/_base/declare',
        'dojo/text!../templates/MenuItem.html'
],
function (menuItem, _Widget, domStyle, declare, template) {
    var widget = declare('Sage.UI.MenuItem', menuItem, {
        templateString: template,
        
        iconClass: '',
        _setIconClassAttr: { node: 'iconNode', type: 'class' },
        
        label: '',
        _setLabelAttr: { node: 'containerNode', type: 'innerHTML' },
        
        icon: '',
        _setIconAttr: { node: 'iconNode', type: 'attribute', attribute: 'src' },
        
        imageClass: 'noIcon',
        
        iconStyle: '',
        _setIconStyleAttr: { node: 'iconNode', type: 'style' },
        
        ref: '',

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
        destroy: function() {
            this._setSelected = function () {};
            this.inherited(arguments);
        }
    });
    
    return widget;
});