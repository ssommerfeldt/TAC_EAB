/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, getCookie, cookie, $ */
define('Sage/Utility/PricingAndAvailability',[
        'dojo/_base/lang',
        'dojo/_base/declare',
        'dojo/dom-construct',
        'Sage/Data/SDataServiceRegistry',
        'dojo/json',
        'dojo/string',
        'dojo/i18n!./nls/PricingAndAvailability',
        'Sage/UI/Dialogs',
        'Sage/MainView/IntegrationContract/PricingAvailabilityWidget'
    ],
    function (lang, declare, domConstruct, sDataServiceRegistry, json, dString, nlsStrings, dialogs, PricingAvailabilityWidget) {
        var pricingAvailabilityUtil = declare('Sage.Utility.PricingAndAvailability', [], {
            requestPricingAvailability: function (options) {
                if(options.isSpinnerHide===undefined){
					dojo.style("loader", "display", "block");
					dojo.style("loader", "opacity", "0.75");
				}
                var service = sDataServiceRegistry.getSDataService('dynamic');
                var req = new Sage.SData.Client.SDataServiceOperationRequest(service);
                req.setResourceKind(options.resourceKind);
                req.setOperationName(options.operationName);
                var entry = {
                    "$name": options.operationName,
                    "request": {
                        "options": Sys.Serialization.JavaScriptSerializer.serialize(options.requestOptions)
                    }
                };
                req.execute(entry, {
                    success: function (data) {
                        if (options.callback) {
                            var result = dojo.isObject(data.response) && data.response.Result ? json.parse(data.response.Result) : "";
                            options.callback(result);
                        }
                        if(options.requestOptions.isGridRefresh===true){
							var grid = dijit.byId($('*[id*=Productsgrd]')[3].id);
							if(grid){
								grid.refresh();
								}
                        }
                        if(options.isSpinnerHide===undefined){
							dojo.style("loader", "display", "none");
							dojo.style("loader", "opacity", "0");
						}
						if(options.requestOptions.entityName==='Opportunity'){
							__doPostBack('MainContent', '');
						}
                    },
                    failure: function (result) {
                        dojo.style("loader", "display", "none");
						dojo.style("loader", "opacity", "0");
                        dialogs.showError(result);
                    }
                });
            },
            showWarehouseAvailability: function (options) {				
				var dialog = dijit.byId("dlgPricingAvailabilityWidget");
                if (!dialog) {
                    dialog = new PricingAvailabilityWidget();
                }
                dialog.initialize(options);
                dialog.show();
            },
            buildWarehouseUrl: function (options) {
                var clientContextService = Sage.Services.getService('ClientContextService');
                var closed = !!(clientContextService !== null && clientContextService.containsKey('IsClosed')) && clientContextService.getValue('IsClosed') == 'True';
                var location;
                var isCPQ = false;
				var warehouseLocation;
                var entityName = Sage.Utility.getCurrentEntityName();
                if (entityName === 'Opportunity') {
                    warehouseLocation = options.item.Location;
                }
                else {
                    warehouseLocation = options.item.SlxLocation;
                }
                if (warehouseLocation) {
                    location = warehouseLocation.Name ? warehouseLocation.Name : warehouseLocation.$key;
                } else if (options.configuredItem) {
                    location = "";
                } else {
                    location = nlsStrings.warehouse_Default;
                }
                var service = Sage.Services.getService('IntegrationContractService');
                var cpqConfigStatus = nlsStrings.status_NotConfigurable;
                if (service.isCPQIntegrationEnabled && options.item.Product && options.item.Product.ErpConfiguredItem === true && options.item.Status != cpqConfigStatus) {
                    isCPQ = true;
                }
                return closed || isCPQ ? location : dString.substitute("<a id='warehouseLink' href='javascript:Sage.Utility.PricingAndAvailability.showWarehouseAvailability(${0});'>${1}<a>",
                    [JSON.stringify(options), location]);
            },
            updateItemResponsePricing: function (pricingResponse, newEntity) {
                if (pricingResponse) {
                    for (var x = 0; x < pricingResponse.Children.length; x++) {
                        var product = pricingResponse.Children[x];
                        for (var key in product.Properties) {
                            if (key != 'ProductCode') {
                                if (key.indexOf('.') > 0 && key.indexOf('ErpExtId') > 0) {
                                    var propname = key.split(".");
                                    var entityName = Sage.Utility.getCurrentEntityName();
                                    if (entityName === 'Opportunity') {
                                        propname[0] = 'Location';
                                    }
                                    var extid = product.Properties[key].split("#");
                                    if (extid !== null && extid !== '') {
                                        if (newEntity[propname[0]] === null) {
                                            newEntity[propname[0]] = { Name: extid[0], $key: extid[1] };
                                        } else {
                                            newEntity[propname[0]]["Name"] = extid[0];
                                            newEntity[propname[0]]["$key"] = extid[1];
                                        }
                                    }
                                } else
                                    newEntity[key] = product.Properties[key];
                            }
                        }
                    }
                }
                return newEntity;
            },
            requestCPQStatus: function (options) {
                if (options.item.Product) {
                    // To see if user has the permission
                    var svc = Sage.Services.getService('RoleSecurityService');
                    var hasAccess = svc.hasAccess(options.securedAction);
                    var clientContextService = Sage.Services.getService('ClientContextService');
                    var closed = !!(clientContextService !== null && clientContextService.containsKey("IsClosed")) && clientContextService.getValue("IsClosed") == 'True';
                    if (closed || !hasAccess) {
                        if (options.lineResourceKind === "SalesOrderItems") {
                            if (!options.item.ErpStatus) {
                                return nlsStrings.status_NotConfigurable;
                            } else {
                                return options.item.ErpStatus;
                            }
                        }
                        else {
                            if (!options.item.Status) {
                                return nlsStrings.status_NotConfigurable;
                            } else {
                                return options.item.Status;
                            }
                        }
                    } else { // If the entity is not closed
                        var service = Sage.Services.getService('IntegrationContractService');
                        if (service.isCPQIntegrationEnabled && options.item.Product.ErpConfiguredItem === true) {
                            var cpqConfigStatus;
                            if (options.lineResourceKind === "SalesOrderItems") {
                                if (!options.item.ErpLineNumber && (!options.item.ErpStatus || options.item.ErpStatus === 'Open')) {
                                    cpqConfigStatus = nlsStrings.status_Configure;
                                } else {
                                    cpqConfigStatus = options.item.ErpStatus;
                                }
                            }
                            else {
                                if (!options.item.ErpLineNumber && (!options.item.Status || options.item.Status === 'Open')) {
                                    cpqConfigStatus = nlsStrings.status_Configure;
                                } else {
                                    cpqConfigStatus = options.item.Status;
                                }
                            }
                            var requestOptions = {
                                entry: {
                                    "$name": "ConfigProductItem",
                                    "request": {
                                        "entity": options.item,
                                        "currentUrl": window.location.href,
                                        "isPrepare": true,
                                        "status": cpqConfigStatus,
                                        "languageSetting": cookie.getCookie("SLXLanguageSetting")
                                    }
                                },
                                businessRuleMethod: "ConfigProductItem"
                            };

                            if ((options.lineResourceKind === "SalesOrderItems" || options.lineResourceKind === "QuoteItems") && !options.item.ErpLineNumber) {
                                return dString.substitute("<a id='requestCPQ' href='javascript:Sage.Link.redirectUrl(${0},\"${1}\");'>${2}<a>", [JSON.stringify(requestOptions), options.lineResourceKind, cpqConfigStatus]);
                            }
                            else if ((options.lineResourceKind !== "SalesOrderItems" && options.lineResourceKind !== "QuoteItems") && !options.item.Status) {
                                return dString.substitute("<a id='requestCPQ' href='javascript:Sage.Link.redirectUrl(${0},\"${1}\");'>${2}<a>", [JSON.stringify(requestOptions), options.lineResourceKind, cpqConfigStatus]);
                            }
                            else {
                                return cpqConfigStatus;
                            }
                        } else { // If the CPQ is not enalbled or produt is not configured
                            return nlsStrings.status_NotConfigurable;
                        }
                    }
                } else { // Add custom product
                    return nlsStrings.status_NotConfigurable;
                }
            },
            doPricingAvailability: function (requestOptions) {
                var logicalId = null;
                var accountingEntityId = null;
                var request = new Sage.SData.Client.SDataServiceOperationRequest(sDataServiceRegistry.getSDataService('dynamic'));
                request.setResourceKind("backOffices");
                request.setOperationName("GetBackOfficeDetails");
                var entry = {
                    "$name": "GetBackOfficeDetails",
                    "request": {
                        "entityName": requestOptions.entityName,
                        "entityId": requestOptions.entityId
                    }
                };
                request.execute(entry, {
                    async: false,
                    success: function (result) {
                        if (result.response.Result) {
                            var backOfficeDetails = result.response.Result.split(',');
                            logicalId = backOfficeDetails[0];
                            accountingEntityId = backOfficeDetails[1];
                        }
                    },
                    failure: function (result) {
                        //ToDo throw appropriate error message
                    }
                });

                var productIds = '';
                var unitOfMeasureIds = '';
                var itemQuantity = '';
                var qty = 1;
                for (var i = 0; i < requestOptions.selectedItems.length; i += 1) {
                    productIds = productIds !== '' ? dString.substitute('${0},${1}', [productIds, requestOptions.selectedItems[i].$key]) : requestOptions.selectedItems[i].$key;
                    if (requestOptions.selectedItems[i].UnitOfMeasure) {
                        unitOfMeasureIds = unitOfMeasureIds !== '' ? dString.substitute('${0},${1}', [unitOfMeasureIds, requestOptions.selectedItems[i].UnitOfMeasure.$key]) : requestOptions.selectedItems[i].UnitOfMeasure.$key;
                    } else {
                        unitOfMeasureIds = unitOfMeasureIds !== '' ? dString.substitute('${0},null', [unitOfMeasureIds]) : 'null';
                    }

                    if (requestOptions.selectedItems[i].ProdPackageKitType === 'PKG') {
                        for (var j = 0; j < requestOptions.selectedItems[i].PackageKitChildViews.$resources.length; j++) {
                            var prod = requestOptions.selectedItems[i].PackageKitChildViews.$resources[j];
                            if (prod.Quantity !== null) {
                                qty = prod.Quantity;
                            }
                        }
                    }
                    itemQuantity = itemQuantity !== '' ? dString.substitute('${0},${1}', [itemQuantity, qty]) : qty;
                }

                if (logicalId && accountingEntityId) {
                    var doPricingRequest = dojo.hitch(this, function (quantity) {
                        var pricingOptions = {
                            resourceKind: requestOptions.resourceKind,
                            operationName: 'RequestPricingAvailability',
                            requestOptions: {
                                childEntityIds: productIds,
                                childEntityName: 'Product',
                                itemEntityName: requestOptions.itemEntityName,
                                itemQuantity: quantity,
                                entityName: requestOptions.entityName,
                                entityId: Sage.Utility.getCurrentEntityId(),
                                serviceName: requestOptions.serviceName,
                                unitOfMeasureId: unitOfMeasureIds,
                                logicalId: logicalId,
                                accEntityID: accountingEntityId,
								isGridRefresh:requestOptions.isGridRefresh,
								AutoSave:requestOptions.AutoSave
                            }
                        };
                        this.requestPricingAvailability(pricingOptions);
                    });
                    doPricingRequest(itemQuantity);
                }
            },
            _isEntityClosed: function (options) {
                var service = sDataServiceRegistry.getSDataService('dynamic');
                var req = new Sage.SData.Client.SDataServiceOperationRequest(service);
                req.setResourceKind(options.resourceKind)
                    .setOperationName(options.operationName);
                var entry = {
                    "$name": options.operationName,
                    "request": {
                        "entityId": Sage.Utility.getCurrentEntityId()
                    }
                };
                req.execute(entry, {
                    async: false,
                    success: function (result) {
                        return result.response.Result;
                    },
                    failure: function (result) {
                        dialogs.showError(result);
                    }
                });
                return true;
            },
            _updateItemWithSelectedWarehouse: function (options) {
                var grid = dijit.byId(options.gridId);
                var pricingOptions = {
                    resourceKind: options.resourceKind,
                    operationName: 'RequestPricingAvailability',
                    requestOptions: {
                        locationId: options.SlxLocationID,
                        itemQuantity: options.item.Quantity,
                        childEntityIds: options.item.Product.$key,
                        childEntityName: 'Product',
                        itemEntityName: options.childEntityName,
                        entityName: options.entityName,
                        entityId: Sage.Utility.getCurrentEntityId(),
                        serviceName: options.serviceName,
                        unitOfMeasureId: ('UnitOfMeasure' in options) ? options.UnitOfMeasure.$key : ""
                    },
                    callback: function (pricingResponse) {
                        if (pricingResponse) {
                            var request = pricingResponse.Children[0];
                            if (request) {
                                var errorProp = request.Properties['messageText'];
                                var errorCode = request.Properties['ErrorCode'];
                                if (errorProp || errorCode) {
                                    Sage.UI.Dialogs.showError(dojo.string.substitute(nlsStrings.error_PricingRequest, [errorProp]));
                                } else {
                                    Sage.Utility.PricingAndAvailability.updateItemResponsePricing(pricingResponse, options.item);
                                    var rowId = grid.getSelectedRowId();
                                    var entityName = Sage.Utility.getCurrentEntityName();
                                    if (entityName === 'Opportunity') {
                                        grid._grid.updateDirty(rowId, 'Location', options.item['Location']);
                                    }
                                    else {
                                        grid._grid.updateDirty(rowId, 'SlxLocation', options.item['SlxLocation']);
                                    }
                                    grid._grid.updateDirty(rowId, 'DocCalculatedPrice', options.item['DocCalculatedPrice']);
                                    grid._grid.updateDirty(rowId, 'DocExtendedPrice', options.item['DocExtendedPrice']);
                                    grid._grid.updateDirty(rowId, 'DocTotalAmount', options.item['DocTotalAmount']);
                                    grid._grid.save();
                                    grid.refresh();
                                }
                            }
                        }
                    }
                };
                Sage.Utility.PricingAndAvailability.requestPricingAvailability(pricingOptions);
                return true;
            }
        });

        Sage.namespace('Utility.PricingAndAvailability');
        lang.mixin(Sage.Utility.PricingAndAvailability, new pricingAvailabilityUtil());
        return pricingAvailabilityUtil;
    });

require(['Sage/Utility/PricingAndAvailability']);
