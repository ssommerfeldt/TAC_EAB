require({cache:{
'url:Sage/UI/Controls/templates/PropertyDropDown.html':"[\r\n'<div class=\"fld propertyDiv dijitInline\">',\r\n    '<input data-dojo-type=\"dijit.form.ValidationTextBox\" dojoattachpoint=\"entitySelected\"/>',\r\n    '<div data-dojo-type=\"dijit.form.Button\" iconclass=\"myIcon\" dojoattachevent=\"onClick:showDDTree\" class=\"transparentDropDown\" dojoattachpoint=\"transparentDropDown\" />',\r\n'</div>'\r\n]"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define 
 * custom widget that displays dropdown box, on click of the dropdown arrow it shows
 * a tree of properties and associated entities for a given entity
 */
define("Sage/UI/Controls/PropertyDropDown", [
    'Sage/MainView/EntityMgr/AddEditEntityDetail/_DetailsAddEditDialogBase',
    'dojo/_base/declare',
    'dojo/text!./templates/PropertyDropDown.html',
    'dijit/Tree',
    'Sage/UI/Controls/PropertyStore',
    'Sage/Utility',
    'dojo/string',
    'dijit/TooltipDialog',
    'dojo/dom-style',
    'dojo/dom-class'
],
function (
    _DetailsAddEditDialogBase,
    declare,
    template,
    Tree,
    PropertyStore,
    utility,
    dojoString,
    TooltipDialog,
    dojoStyle,
    domClass
) {
    var widget = declare('Sage.UI.Controls.PropertyDropDown', [_DetailsAddEditDialogBase], {

        widgetsInTemplate: true,
        widgetTemplate: new Simplate(eval(template)),

        entityName: null,

        // type filters
        byTypeId: null,      // if the user knows exact id then filter by that.
        bySuperType: null,   // if the user knows the general type then filter by it. the general type will treat fields like short, int, and double as number for example.
        byKeywords: null,
        allMatch: false,

        tree: null,
        eleTextBox: null,
        maxLevels: -1,
        _required: true,


        constructor: function (obj) {
            this.entityName = obj.entityName;

            if (typeof (obj.type) !== "undefined") {
                this.byTypeId = obj.typeId;
            }
            if (typeof (obj.superType) !== "undefined") {
                this.bySuperType = obj.superType;
            }
            if (typeof (obj.Keywords) !== "undefined") {
                this.byKeywords = obj.Keywords;
            }
            if (typeof (obj.allMatch) !== "undefined") {
                this.allMatch = obj.allMatch;
            }
            if (typeof (obj.maxLevels) !== "undefined") {
                this.maxLevels = obj.maxLevels;
            }
            if (typeof (obj.onlyProperties) !== "undefined") {
                this.onlyProperties = obj.onlyProperties;
            }
            if (typeof (obj.required) !== "undefined") {
                this._required = obj.required;
            }
        },
        postCreate: function () {
            this._createTree();

            if (typeof (this._required) !== "undefined") {
                this.entitySelected.required = this._required;
            }

            this.startup();
        },
        startup: function () {
            this.inherited(arguments);
        },
        /*
         Given an Entity name(strEntity) and a property name(strProperty). This function will search for an entity with the name provided 
         that has a property name with the property provided.

         if the entity name is not given then the current one is used.

         If the property name is not given then the current one is used.

         useful in that it allows the implementer to get the field information of a property, which includes information like the appropriate aggregate functions
         that can be used on this property.
        */
        propertyLookup: function (strEntity, strProperty) {
            if (typeof (strEntity) === "undefined" || strEntity === null) {
                strEntity = this.entityName;
            }

            if (typeof (strProperty) === "undefined" || strProperty === null) {
                strProperty = this.entitySelected.textbox.value;
            }
            return new PropertyStore().lookup(strEntity, strProperty);
        },
        //creates a tree of properties and associated entities for a given entity
        _createTree: function () {
            var self = this;
            var ps = null;
            if (this.byKeywords) {
                ps = new PropertyStore(this.entityName, { Keywords: this.byKeywords, allMatch: this.allMatch, maxLevels: this.maxLevels, onlyProperties: this.onlyProperties });
            }
            else {
                ps = new PropertyStore(this.entityName, { typeId: this.byTypeId, superType: this.bySuperType, maxLevels: this.maxLevels, onlyProperties: this.onlyProperties });
            }
            this.tree = new Tree({
                model: ps.store,
                showRoot: false,
                onClick: function (item) {
                    self.entitySelected.set('value', item.property);
                    dijit.popup.close();
                    dojo.publish('Sage/UI/Controls/PropertDropDown', item);
                }
            });
            domClass.add(this.tree.domNode, 'height250');
            var defValue = ' ';
            if (this._EditData && this._EditData.propertyName) {
                defValue = this._EditData.propertyName;
                this.entitySelected.set('value', defValue);
            }
            this.eleTextBox = this.entitySelected.domNode;
        },

        //shows the tree in a tooltip dialog, this method is called in template
        showDDTree: function () {
            var width = dojoStyle.getComputedStyle(this.eleTextBox).width;
            var myTooltipDialog = new TooltipDialog({
                style: dojoString.substitute("width:${0};", [width]),
                content: this.tree
            });
            domClass.add(myTooltipDialog.domNode, 'propertyDialog');
            dijit.popup.open({
                popup: myTooltipDialog,
                around: this.eleTextBox
            });
        }
    });
    return widget;
});