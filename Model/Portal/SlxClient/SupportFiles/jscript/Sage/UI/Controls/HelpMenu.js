/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/HelpMenu", [
       "dijit/MenuBar",
       "Sage/UI/MenuItem",
       "Sage/UI/PopupMenuBarItem",
       "Sage/UI/OrientableMenuBar",
       'dojo/i18n!./nls/HelpMenu',
       'dojo/_base/declare',
       'dojo/dom-class',
       'Sage/Utility'
],
function (menuBar, menuItem, popupMenuBarItem, orientableMenuBar, i18nStrings, declare, domClass, utility) {
    var widget = declare('Sage.UI.Controls.HelpMenu', orientableMenuBar, {    
        orientation: { 'BR' : 'TR', 'BL' : 'TL' },
        postMixInProperties: function() {
            this.inherited(arguments);
        },
        postCreate: function() {
            this.inherited(arguments);
            var menu = new dijit.Menu();
            var clientContextService = Sage.Services.getService("ClientContextService");
            menu.addChild(new menuItem({
                label: i18nStrings.webClientHelpText,
                imageClass: 'icon_Help_16x16',
                title: i18nStrings.webClientHelpText,
                id: 'helpRoot',
                onClick: function () { utility.openHelp('slxoverview'); }
            }));
            if (clientContextService.getValue("isCustomerPortal") !== "True") {
                menu.addChild(new menuItem({
                    label: i18nStrings.gettingStartedText,
                    imageClass: 'icon_pdf_16x16',
                    title: i18nStrings.gettingStartedText,
                    id: 'helpGettingStarted',
                    onClick: function () { utility.openPdfDoc('getting_started_with_infor_crm_web_client.pdf'); }
                }));
                menu.addChild(new menuItem({
                    label: i18nStrings.quickReferenceText,
                    imageClass: 'icon_pdf_16x16',
                    title: i18nStrings.quickReferenceText,
                    id: 'helpQuickReference',
                    onClick: function () { Sage.Utility.openPdfDoc('infor_crm_quick_reference_for_the_web_user.pdf'); }
                }));
            }
            menu.addChild(new menuItem({
                label: i18nStrings.aboutText,
                imageClass: 'icon_Help_16x16',
                title: i18nStrings.aboutText,
                id: 'helpAbout',
                onClick: function () { Sage.Utility.openHelp('slxthirdparty'); }
            }));
            this.addChild(new popupMenuBarItem({
                label: '',
                iconStyle: 'width: 16px',
                imageClass: 'fa fa-question',
                title: i18nStrings.helpText,
                id: 'btnHelpMenu',
                popup: menu
            }));
        }
    });

    return widget;
});