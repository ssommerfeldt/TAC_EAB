/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, jQuery_2, infor, mingleConfig */
define("Sage/Mingle/MingleSupport", [
        'dojo/_base/array',
        'dojo/_base/lang',
        'dojo/_base/json',
        'dojo/string',
        'Sage/UI/GroupsTitlePaneConfigProvider',
        'Sage/Data/SDataServiceRegistry'
    ],
    function (array, lang, json, dojoString, GroupsTitlePaneConfigProvider, sDataServiceRegistry) {
        Sage.namespace('Sage.Mingle.MingleSupport');
        Sage.Mingle.MingleSupport = {
            lastGroup: null,
            publishIBCMessage: function (location) {
                console.log('publish IBC');
                dojo.subscribe('/group/context/changed', this, this._onGroupContextChanged);
                //Group Information
                var groupCtxService = Sage.Services.getService('ClientGroupContext');
                var groupContext = groupCtxService.getContext();
                var currentGrpID = groupContext['CurrentGroupID'];

                //Entity Information
                var entityContextService = Sage.Services.getService('ClientEntityContext');
                var eContext = entityContextService.getContext();
                var href = location.pathname;
                var entityTableName = eContext.DisplayName ? eContext.DisplayName : eContext.EntityTableName;

                var randomNum = Math.floor(Math.random() * 101); //Random num between 1 to 100
                var date = new Date();
                var timeNow = date.getTime();

                var displayName,bookmarkName, bookmardDesc = eContext.Description;
                var viewName = href.substring(href.lastIndexOf("/") + 1, href.lastIndexOf(".aspx"));

                /////////////////////////////////////
                var modeId = Sage.Utility.getModeId();
                if (modeId === 'list') {
                    href = dojoString.substitute('${0}.aspx?gid=${1}&modeid=list', [viewName, currentGrpID]);
                    displayName = groupContext.CurrentDisplayName;// + " List";
                    bookmarkName = eContext.EntityTableName + ': '+displayName;
                } else if (modeId === 'detail') {
                    displayName = eContext.Description;
                    bookmarkName = eContext.EntityTableName + ': ' + displayName;
                    if (eContext.IsGroupsBasedEntity === 'true') {
                        href = dojoString.substitute('${0}.aspx?entityid=${1}&gid=${2}&modeid=Detail',
                        [viewName, eContext.EntityId, currentGrpID]);
                    } else {
                        href = dojoString.substitute('${0}.aspx?entityid=${1}&modeid=Detail',
                        [viewName, eContext.EntityId]);
                    }
                } else {
                    if (currentGrpID) {
                        href = href + '?groupId=' + currentGrpID;
                    }
                    entityTableName = viewName;

                    if (groupContext.CurrentName && !groupContext.CurrentTable) {
                        displayName = groupContext.CurrentName;
                    }
                    else if (currentGrpID && !groupContext.CurrentTable) {
                        displayName = currentGrpID;
                    }
                    else {
                        displayName = 'view';
                    }
                        
                    bookmarkName = "CRM " + viewName + ': ' + displayName;
                    bookmardDesc = "CRM " + viewName + ': ' + displayName;
                }

                //entityTableName = entityTableName.replace(/ /g, "_");
                var entities =
                [
                    {
                        entityType: entityTableName.replace(/ /g, "_"),//No drillback link if this contains space
                        id1: displayName.replace(/ /g,"_"),
						id2: eContext.EntityId,	
                        drillbackURL: "?LogicalId=" + mingleConfig.logicalId + "&href=" + encodeURIComponent(href),
                        bodReference: {
                            noun: entityTableName,
                            documentId: entityTableName
                        }
                    }
                ];

                var businessContext =
                {
                    screenId: "crm_" + entityTableName,
                    logicalId: mingleConfig.logicalId,
                    entities: entities,
                    contextId: timeNow + '' + randomNum,
                    messageText: '',
                    originatingTime: timeNow
                };
                infor.companyon.client.sendMessage("inforBusinessContext", businessContext);
                infor.companyon.client.registerMessageHandler("applicationDrillback", this.showDrillbackHandler);
                
                var data = {
                    name: bookmarkName,
                    description: bookmardDesc,
                    absoluteURL: false,
                    shortcutContext: encodeURIComponent(href)
                };
                infor.companyon.client.sendMessage("setShortcutContext", data);
                infor.companyon.client.bind("showFavoriteContext", this.showFavoriteHandler);

                infor.companyon.client.sendMessage("appInitComplete", window.name);
            },
            drillDownUsingID: function (data) {
              var entityID = this.getQueryStringVariable(data.applicationDrillback, 'EntityID');
              var viewID = this.getQueryStringVariable(data.applicationDrillback, 'ViewId');
              var erpExtID = this.getQueryStringVariable(data.applicationDrillback, 'ErpExtID');
              var groupID = this.getQueryStringVariable(data.applicationDrillback, 'GroupId');
              var Id1 = this.getQueryStringVariable(data.applicationDrillback, 'Id1');
              var accountingEntity = this.getQueryStringVariable(data.applicationDrillback, 'accountingEntity');
              var href = '';
              var req;
              if (entityID && viewID) {
                if (viewID === 'History') {
                  Sage.Link.editHistory(entityID);
                }
                else {
                  if (groupID)
                    href = dojoString.substitute('${0}.aspx?entityid=${1}&gid=${2}&modeid=Detail', [viewID, entityID, groupID]);
                  else
                    href = dojoString.substitute('${0}.aspx?entityid=${1}&modeid=Detail', [viewID, entityID]);
                  document.location.href = href;
                }
              }
              else if (viewID && erpExtID) {
                req = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('dynamic'))
                          .setResourceKind(Sage.Utility.pluralize(viewID))
                          .setQueryArg('select', '$key')
                          .setQueryArg('format', 'json')
                          .setQueryArg('where', dojoString.substitute('ErpExtId eq \'${0}\'', [erpExtID]))
                          .setQueryArg('_t', new Date().getTime());
                req.read({
                  success: function (data) {
                    if (data && data.$key) {
                      entityID = data.$key;
                      href = dojoString.substitute('${0}.aspx?entityid=${1}&modeid=Detail', [viewID, entityID]);
                      document.location.href = href;
                    }
                    else {
                      console.error('could not find ErpExtID');
                      href = dojoString.substitute('${0}.aspx', [viewID]);
                      document.location.href = href;
                    }
                  },
                  failure: function () {
                    console.error('Error while making sdata request');
                  },
                  scope: this
                });
              }
              else if (viewID && groupID && entityID === null) {
                if (viewID !== 'History') {
                  href = dojoString.substitute('${0}.aspx?gid=${1}&modeid=list', [viewID, groupID]);
                  document.location.href = href;
                }
              }
              else if(viewID && Id1 && accountingEntity)
              {
                req = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('dynamic'))
                          .setResourceKind(Sage.Utility.pluralize(viewID))
                          .setQueryArg('select', '$key')
                          .setQueryArg('format', 'json')
                          .setQueryArg('where', dojoString.substitute('Id eq \'${0}\' OR (ErpExtId eq \'${1}\' AND ErpAccountingEntityId eq \'${1}\')',[Id1,accountingEntity]))
                          .setQueryArg('_t', new Date().getTime());
                req.read({
                  success: function (data) {
                    if (data && data.$key) {
                      entityID = data.$key;
                      href = dojoString.substitute('${0}.aspx?entityid=${1}&modeid=Detail', [viewID, entityID]);
                      document.location.href = href;
                    }
                    else {
                      console.error('could not find ErpExtID/ErpAccountingEntityId');
                      href = dojoString.substitute('${0}.aspx', [viewID]);
                      document.location.href = href;
                    }
                  },
                  failure: function () {
                    console.error('Error while making sdata request');
                  },
                  scope: this
                });
               }
              else if(viewID && Id1)
              {
                req = new Sage.SData.Client.SDataSingleResourceRequest(sDataServiceRegistry.getSDataService('dynamic'))
                          .setResourceKind(Sage.Utility.pluralize(viewID))
                          .setQueryArg('select', '$key')
                          .setQueryArg('format', 'json')
                          .setQueryArg('where', dojoString.substitute('Id eq \'${0}\' OR ErpExtId eq \'${0}\'' ,[Id1]))
                          .setQueryArg('_t', new Date().getTime());
                req.read({
                async:false,
                  success: function (data) {
                    if (data && data.$key) {
                      entityID = data.$key;
                      href = dojoString.substitute('${0}.aspx?entityid=${1}&modeid=Detail', [viewID, entityID]);
                      document.location.href = href;
                    }
                    else {
                      console.error('could not find ErpExtId/EntityId');
                      href = dojoString.substitute('${0}.aspx', [viewID]);
                      document.location.href = href;
                    }
                  },
                  failure: function () {
                    console.error('Error while making sdata request');
                  },
                  scope: this
                });
              }
            },
            showDrillbackHandler: function (data) {
              console.log('showDrillbackHandler: %o', json.toJson(data));
              if (data === null) {
                return;
              }
              var href = Sage.Mingle.MingleSupport.getQueryStringVariable(data.applicationDrillback, 'href');
              var script = Sage.Mingle.MingleSupport.getQueryStringVariable(data.applicationDrillback, 'script');

              if (href) {
                var groupId = Sage.Utility.getParameterByName('groupId', href);
                if (script) {
                  href = href + '&script=' + script;
                }
                if (groupId) {
                  href = href + '&groupId=' + groupId;
                }
                var randomNum = Math.random();
                href += (href.split('?')[1] ? '&' : '?') + 'param=' + randomNum; //Changing querystring to refresh the page

                document.location.href = href;
              }
              else {
                Sage.Mingle.MingleSupport.drillDownUsingID(data);
              }
            },
            showFavoriteHandler: function (data) {
                console.log('showFavoriteHandler: %o', json.toJson(data));
                if (data === null) {
                    return;
                }
                var href = decodeURIComponent(data.favoriteContext);
                document.location.href = href;

                try { //If the view is same then need to reload the view to visit the correct group
                    var oldUrl = document.location.pathname;
                    var startIndex = 0;
                    if (oldUrl.lastIndexOf("/") > -1) {
                        startIndex = oldUrl.lastIndexOf("/") + 1;
                    }
                    var oldView = oldUrl.substring(startIndex, oldUrl.indexOf(".aspx"));
                    startIndex = 0;
                    if (href.lastIndexOf("/") > -1) {
                        startIndex = href.lastIndexOf("/") + 1;
                    }
                    var newView = href.substring(startIndex, href.indexOf(".aspx"));

                    if (oldView === newView && href.indexOf('#') > -1) {
                        document.location.reload(true);
                    }
                } catch (e) {
                    console.log('Failed to navigate to specific group in showFavoriteHandler');
                }
            },
            _onGroupContextChanged: function() {
                //does not work for details view Group List - item change, only for list view group change
                if (typeof mingleConfig === 'undefined') return;
                this.publishIBCMessage(location);
            },

            getDrillBacks: function(links) {

                console.debug('Links: %o', links || null);

                var modeId = Sage.Utility.getModeId();
                if (modeId === 'insert' || modeId === '' || modeId === 'None') return null;

                var isGroupList = modeId === 'list';
                var isDetailView = modeId === 'detail';

                var groupContextService = Sage.Services.getService('ClientGroupContext');
                var groupContext = groupContextService.getContext();
                console.log('groupContext: %o', json.toJson(groupContext));

                var entityContextService = Sage.Services.getService('ClientEntityContext');
                var entityContext = entityContextService.getContext();
                console.log('entityContext: %o', json.toJson(entityContext));

                var href = location.href;
                var displayName = 'Infor CRM';

                if (isGroupList) {
                    href = dojoString.substitute('${0}.aspx?gid=${1}&modeid=list',
                    [groupContext.CurrentEntity, groupContext.CurrentGroupID]);
                    displayName = dojoString.substitute('${0}: ${1}',
                    [
                        entityContext.DisplayName,
                        groupContext.CurrentDisplayName
                    ]);
                } else if (isDetailView) {
                    if (entityContext.IsGroupsBasedEntity === 'true') {
                        href = dojoString.substitute('${0}.aspx?entityid=${1}&gid=${2}&modeid=Detail',
                        [groupContext.CurrentEntity, entityContext.EntityId, groupContext.CurrentGroupID]);
                    } else {
                        href = dojoString.substitute('${0}.aspx?entityid=${1}&modeid=Detail',
                        [groupContext.CurrentEntity, entityContext.EntityId]);
                    }
                    displayName = dojoString
                        .substitute('${0}: ${1}',
                        [entityContext.DisplayName, entityContext.Description]);
                } else {
                    //TODO: Handle (e.g. Administration | Groups).
                    // Currently defaults to location.href
                    console.error('DrillBackUrl will be location.href');
                }

                var url = dojoString
                    .substitute('?LogicalId=${0}&href=${1}',
                    [mingleConfig.logicalId, encodeURIComponent(href)]);

                var drillBacks = [];

                var drillBack = {
                    'Label': displayName,
                    'TypeId': 1,
                    'URL': url
                };
                drillBacks.push(drillBack);

                if (lang.isArray(links)) {
                    array.forEach(links,
                        function(item) {
                            displayName = item.DisplayName || 'Infor CRM';
                            if (lang.isString(item.Script)) {
                                url = dojoString.substitute('${0}&script=${1}', [url, encodeURIComponent(item.Script)]);
                            } else {
                                href = item.Url === '' ? location.href : item.Url;
                                url = dojoString.substitute('?LogicalId=${0}&href=${1}',
                                [mingleConfig.logicalId, encodeURIComponent(href)]);
                            }
                            drillBack = {
                                'Label': displayName,
                                'TypeId': 1,
                                'URL': url
                            };
                            drillBacks.push(drillBack);
                        });
                }

                console.debug('getDrillBacks: %o', drillBacks);

                return drillBacks;
            },

            getQueryStringVariable: function(query, variable) {
                query = query.indexOf('?') > -1 ? query.substring(query.indexOf('?') + 1, query.length) : query;
                var vars = query.split('&');
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split('=');
                    if (decodeURIComponent(pair[0]).toLowerCase() === variable.toLowerCase()) {
                        var value = decodeURIComponent(pair[1]);
                        return value;
                    }
                }
                return null;
            },
            showDrillBack: function(url){
                infor.companyon.client.sendPrepareDrillbackMessage(url);
            }
        };

        return Sage.Mingle.MingleSupport;

    }
);