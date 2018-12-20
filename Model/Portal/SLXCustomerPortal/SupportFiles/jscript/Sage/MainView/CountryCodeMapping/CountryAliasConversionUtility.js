/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/CountryCodeMapping/CountryAliasConversionUtility", [
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
    sDataServiceRegistry,
    utility
) {
    Sage.namespace('Sage.MainView.CountryCodeMapping.CountryAliasConversionUtility');
    lang.mixin(Sage.MainView.CountryCodeMapping.CountryAliasConversionUtility, {
        getCurrentEntityContext: function () {
            if (Sage.Services.hasService("ClientEntityContext")) {
                var clientEntityContextSvc = Sage.Services.getService("ClientEntityContext");
                if (clientEntityContextSvc) {
                    return clientEntityContextSvc.getContext();
                }
            }
            return null;
        },
        setDomNodeVisible: function (domNode, visible) {
            if (domNode && visible) {
                domClass.remove(domNode, "display-none");
            }
            else if (domNode) {
                domClass.add(domNode, "display-none");
            }
        },
        requestCountryData: function (requestOptions) {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(sDataServiceRegistry.getSDataService('dynamic'));
            request.setResourceKind(requestOptions.resourceKind);
            request.setQueryArg('select', requestOptions.select);            
            request.setQueryArg('where', requestOptions.where);
            request.setQueryArg('count', requestOptions.count);
            
            request.read({
                preventCache: true,
                scope: this,
                success: function (response) {
                    if (requestOptions.onSuccess) {
                        requestOptions.onSuccess(response.$resources);
                    }
                },
                failure: function (error) {
                    console.log(error);
                    if (requestOptions.onFailure) {
                        requestOptions.onFailure(error);
                    }
                }
            });
        },
        countryRuleRequest: function (requestOptions, resourceKind, executeAsync) {
            var isAsync = typeof executeAsync !== 'undefined' ? executeAsync : true;
            var service = sDataServiceRegistry.getSDataService('dynamic');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                .setResourceKind(resourceKind)
                .setContractName('dynamic')
                .setOperationName(requestOptions.businessRuleMethod);

            request.execute(requestOptions.entry, {
                async: isAsync,
                success: function (result) {
                    if (requestOptions.onSuccess) {
                        if (result.response && typeof result.response.Result == 'string') {
                            requestOptions.onSuccess(Sys.Serialization.JavaScriptSerializer.deserialize(result.response.Result));
                        } else if (result.response) {
                            requestOptions.onSuccess(result.response.Result);
                        }
                    }
                },
                failure: function (result) {
                    if (requestOptions.onFailure) {
                        requestOptions.onFailure(result);
                    }
                    console.log(result);
                }
            });
        }
    });
    return Sage.MainView.CountryCodeMapping.CountryAliasConversionUtility;
});