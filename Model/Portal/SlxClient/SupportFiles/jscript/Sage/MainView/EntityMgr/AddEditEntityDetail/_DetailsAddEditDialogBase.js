/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/AddEditEntityDetail/_DetailsAddEditDialogBase", [
    'dijit/_Widget',
    'dijit/registry',

    'dojo/dom-construct',
    'dojo/query',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/string',

    'dojo/_base/connect',
    'dojo/_base/declare',
    'dojo/_base/lang',

    'dojo/i18n!./nls/AddEditDialog',

    'Sage/_Templated',
    'Sage/UI/Dialogs'
],
function (
    _Widget,
    registry,

    domConstruct,
    query,
    domClass,
    dojoStyle,
    dojoString,

    dojoConnect,
    declare,
    lang,

    nlsResources,

    _Templated,
    dialogue

) {
    var widget = declare('Sage.MainView.EntityMgr.AddEditEntityDetail._DetailsAddEditDialogBase', [_Widget, _Templated], {

        widgetTemplate: new Simplate('<div>Not implemented</div>'),
        _nlsResources: nlsResources,

        Dialog: dialogue,
        DojoString: dojoString,
        DojoStyle: dojoStyle,
        DojoConnect: dojoConnect,
        DomClass: domClass,
        DomConstruct: domConstruct,
        Lang: lang,
        Query: query,
        Registry: registry,

        detailUtility: false,
        hasProperties: false,
        isMetric: false,
        editing: false,
        details: false,
        embedded: false,
        entityName: '',

        constructor: function () {
            var obj = arguments;
            if (obj[0]) {
                var first = obj[0];

                if (first.detailUtility) {
                    this.detailUtility = first.detailUtility;
                }
                if (first.isMetric) {
                    this.isMetric = first.isMetric;
                }
                if (first.details) {
                    this.details = first.details;
                    this.editing = first.details && true;
                }
                if (first.hasProperties) {
                    this.hasProperties = first.hasProperties;
                }
            }
        },

        postCreate: function () {
        },

        startup: function () {
            this.inherited(arguments);
        },

        // ---------------------------------------------------------------
        // This method is to be overwritten by mixin classes
        //  It is used in the saving process.
        //----------------------------------------------------------------
        getDetails: function () {
        },

        // ---------------------------------------------------------------
        // This method is to be overwritten by mixin classes
        //  It is used in to validate the form controls process.
        //----------------------------------------------------------------
        isValid: function () {
            return true; // do special validation done at the moment.
        }

    });
    return widget;
});