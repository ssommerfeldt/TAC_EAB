/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, TabControl, __doPostBack */
define("Sage/Services/ClientEntityContext", [
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-style',
    'Sage/Utility'
],
function (declare, dojoDom, domStyle, Utility) {
    var widget = declare('Sage.Services.ClientEntityContext', null, {
        hasClearListener: false,
        tempContext: false,
        constructor: function (options) {
            //console.log('ClientEntityContext is starting up...');
            this.inherited(arguments);
            dojo.mixin(this, options);
            this.emptyContext = { "EntityId": "", "EntityType": "", "Description": "", "EntityTableName": "" };
        },
        getContext: function () {
            if (this.tempContext) {
                return this.tempContext;
            }
            if ((Sage.Data) && (Sage.Data.EntityContextStore)) {
                var obj = Sage.Data.EntityContextStore;
                for (var item in obj) {
                    if (obj.hasOwnProperty(item)) {
                        // the property is encoded in client context services in CI
                        obj[item] = Utility.htmlDecode(obj[item]);
                    }
                }
                return Sage.Data.EntityContextStore;
            }
            return this.emptyContext;
        },
        setContext: function (obj) {
            Sage.Data.EntityContextStore = dojo.mixin(this.emptyContext, obj);
            this.onEntityContextChanged(Sage.Data.EntityContextStore);
        },
        setTemporaryContext: function (obj) {
            this.tempContext = obj;
        },
        clearTemporaryContext: function () {
            this.tempContext = false;
        },
        navigateSLXGroupEntity: function (toEntityId, previousEntityid, clientPosition) {
            if (Sage.Services) {
                var mgr = Sage.Services.getService("ClientBindingManagerService");
                if ((mgr) && (!mgr.canChangeEntityContext())) {
                    return false;
                }

                //the context is changing i.e. we are changing records so lets stop the user from clicking another link 
                //by putting up a loading screen
                var loaderDiv = dojoDom.byId("loader");
                if (loaderDiv) {
                    domStyle.set(loaderDiv, "display", "block");
                    domStyle.set(loaderDiv, "opacity", 0.75);
                }

                var contextservice = Sage.Services.getService("ClientContextService");
                if (contextservice.containsKey("ClientEntityId")) {
                    contextservice.setValue("ClientEntityId", toEntityId);
                } else {
                    contextservice.add("ClientEntityId", toEntityId);
                }
                previousEntityid = (previousEntityid) ? previousEntityid : Sage.Data.EntityContextStore.EntityId;
                if (contextservice.containsKey("PreviousEntityId")) {
                    contextservice.setValue("PreviousEntityId", previousEntityid);
                } else {
                    contextservice.add("PreviousEntityId", previousEntityid);
                }
                if (clientPosition) {
                    if (contextservice.containsKey("ClientEntityPosition")) {
                        contextservice.setValue("ClientEntityPosition", clientPosition);
                    } else {
                        contextservice.add("ClientEntityPosition", clientPosition);
                    }
                }
                //wire up cleanup service...
                if (!this.hasClearListener) {
                    Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function () {
                        if (Sage.Services) {
                            var contextservice = Sage.Services.getService("ClientContextService");
                            if (contextservice.containsKey("PreviousEntityId")) {
                                contextservice.remove("PreviousEntityId");
                            }
                        }
                        //the page has returned from the post back and loaded so lets clean up the loading screen
                        var loaderDiv = dojoDom.byId("loader");
                        if (loaderDiv) {
                            domStyle.set(loaderDiv, "display", "none");
                            domStyle.set(loaderDiv, "opacity", 0);
                        }
                    });
                    this.hasClearListener = true;
                }
                //set current state for things that load earlier in the response than the new full context.
                Sage.Data.EntityContextStore.EntityId = toEntityId;
                Sage.Data.EntityContextStore.Description = '';

            }
            if (window.TabControl) {
                var tState = TabControl.getState();
                if (tState) {
                    tState.clearUpdatedTabs();
                    TabControl.updateStateProxy();
                }
            }
            __doPostBack("MainContent", "");
            return true;
        },
        onEntityContextChanged: function (newContext) {

        }
    });

    if (!Sage.Services.hasService('ClientEntityContext')) {
        Sage.Services.addService('ClientEntityContext', new Sage.Services.ClientEntityContext());
    }

    return widget;
});