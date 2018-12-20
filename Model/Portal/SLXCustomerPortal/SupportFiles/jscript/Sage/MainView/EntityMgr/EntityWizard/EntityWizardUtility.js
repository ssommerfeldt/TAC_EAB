/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/EntityMgr/EntityWizard/EntityWizardUtility", [
    'dojo/_base/xhr',
    'dojo/string',
    'dojo/date/locale',
    'dojo/dom-class',
    'dojo/_base/lang',
    'Sage/Data/SDataServiceRegistry',
    'Sage/Utility'
],
function (
    dojoXhr,
    dString,
    locale,
    domClass,
    lang,
    SDataServiceRegistry,
    utility
) {
    Sage.namespace('Sage.MainView.EntityMgr.EntityWizard.EntityWizardUtility');
    lang.mixin(Sage.MainView.EntityMgr.EntityWizard.EntityWizardUtility, {
        entityWizardStep: {
            SelectEntityType: 0,
            EntityDetails: 1,
            Relationship:2,
            EntityProperties: 3,
            AddEditEntity: 4,
            Status:5
        },
        getCurrentEntityContext: function () {
            if (Sage.Services.hasService("ClientEntityContext")) {
                var clientEntityContextSvc = Sage.Services.getService("ClientEntityContext");
                if (clientEntityContextSvc) {
                    return clientEntityContextSvc.getContext();
                }
            }
            return null;
        },
        /**
        * Shows/Hides a dom node.
        * @param {Object} domNode - The DOM node to be shown/hidden.
        * @param {Boolean} visible - Whether the object is visible or not.
        */
        setDomNodeVisible: function (domNode, visible) {
            if (domNode && visible) {
                domClass.remove(domNode, "display-none");
            }
            else if (domNode) {
                domClass.add(domNode, "display-none");
            }
        },
        formatDate: function (value) {
            if (utility.Convert.isDateString(value)) {
                var date = utility.Convert.toDateFromString(value);
                return locale.format(date, { selector: 'date', fullYear: true, locale: Sys.CultureInfo.CurrentCulture.name });
            }
            return "";
        },
        getOwnerEntityInfo: function (thisObj) {
            var context = thisObj;
            var propRequest = new Sage.SData.Client.SDataResourceCollectionRequest(SDataServiceRegistry.getSDataService('metadata'))
                        .setQueryArg('where', "isKey eq true")
                            .setResourceKind('entities(' + "'Owner'" + ')/properties')
                            .setQueryArg('select', 'id,propertyName')
                            .setQueryArg('count', 1)
                        .setQueryArg('format', 'json');


            propRequest.read({
                async: true,
                success: function (data) {
                    var props = data.$resources;
                    context.entityDetails.ownerId = props[0].id;
                },
                failure: function (error) {
                    if (error) {
                        console.error(error);
                    }
                }
            });
        }
    });
    return Sage.MainView.EntityMgr.EntityWizard.EntityWizardUtility;
});