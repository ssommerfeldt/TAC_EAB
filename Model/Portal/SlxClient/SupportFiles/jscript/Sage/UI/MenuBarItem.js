require({cache:{
'url:Sage/templates/MenuBarItem.html':"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\r\n    <span>\r\n        <img src=\"${_blankGif}\" class=\"dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"/>\r\n        <div class=\"dijitIcon dijitMenuItemIcon Global_Images icon16x16 ${imageClass}\" data-dojo-attach-point=\"iconNodeSprite\"></div>\r\n        <span data-dojo-attach-point=\"containerNode,textDirNode\"></span>\r\n    </span>\r\n</div>\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/MenuBarItem", [
        'Sage/UI/MenuItem',
        'dojo/text!../templates/MenuBarItem.html',
        'dojo/_base/declare'
],
function (menuItem, template, declare) {
    var widget = declare("Sage.UI.MenuBarItem", menuItem, {
        iconClass: '',
        _setIconClassAttr: { node: 'iconNode', type: 'class' },
        
        label: '',
        _setLabelAttr: { node: 'containerNode', type: 'innerHTML' },
        
        icon: '',
        _setIconAttr: { node: 'iconNode', type: 'attribute', attribute: 'src' },
        
        imageClass: 'noIcon',
        
        iconStyle: '',
        _setIconStyleAttr: { node: 'iconNode', type: 'style' },
        
        templateString: template
    });
    
    return widget;
});