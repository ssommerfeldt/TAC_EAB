/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Utility/Dashboard", [
        'dojo/i18n',
        'Sage/UI/Controls/Grid',
        'Sage/Groups/GroupManager',
        'Sage/UI/Dialogs',
        'Sage/UI/Controls/_DialogHelpIconMixin',
		'dojo/i18n!./nls/Dashboard',
        'dojo/i18n!../UI/Dashboard/nls/WidgetDefinition',
        'dojo/i18n!dijit/nls/common',
        'dojo/request/xhr',
        'dojo/_base/lang',
        'dojo/store/Memory'
],
function (i18n, Grid, GroupManager, Dialogs, _DialogHelpIconMixin, Dashboard, WidgetDefinition, CommonResource, xhr, lang, Memory) {
    Sage.namespace('Utility.Dashboard');
    dojo.mixin(Sage.Utility.Dashboard, {
        _grid: null,
        // Promotes the current group to a 'Group List' widget on the Dashbaord.
        promoteGroupToDashboard: function () {
            var widgetOptions = '<Widget name="Group List" family="System"><options><name>Group List</name><title>{0}</title><entity>{1}</entity><resource>{7}</resource><groupname>{2}</groupname><limit>{3}</limit><visiblerows>{6}</visiblerows><datasource>slxdata.ashx/slx/crm/-/analytics?entity=Sage.Entity.Interfaces.I{4}&amp;groupname={5}</datasource><tableName>{8}</tableName></options></Widget>';

            var dialogContent = new Simplate(['<div>',
                '<div">{%= $.headerText %}</div>',
                '<div id="{%= $.id %}-grid" style="width:350px;height:150px;"></div>',
                '<div align="right"><button data-dojo-type="dijit.form.Button" type="submit" class="okButton" ',
            //TODO: Add button bar feature to a Sage.UI.Dialogs option.
                'style="margin-top:5px;" data-dojo-props="onClick:function(){dijit.byId(\'promoteDialog\').promote();}"',
                '>{%= $.okText %}</button>',
                '<button data-dojo-type="dijit.form.Button" type="button" class="cancelButton" ',
            //TODO: Add button bar feature to a Sage.UI.Dialogs option.
                'style="margin-top:5px; margin-left:10px;" data-dojo-props="onClick:function(){dijit.byId(\'promoteDialog\').hide();}"',
                '>{%= $.cancelText %}</button></div>',
                '</div> ']);

            var dialog = null;
            if (dijit.byId('promoteDialog')) {
                dialog = dijit.byId('promoteDialog');
            } else {
                dialog = new dijit.Dialog({
                    id: 'promoteDialog',
                    title: window.MasterPageLinks.PromoteTitle,
                    promote: lang.hitch(this, function () {
                        var cgi = GroupManager.GetCurrentGroupInfo();
                        var groupGrid = dijit.byId('promoteDialog-grid');
                        var items = this._grid.getSelectedRowData();
                        if (items.length === 0) {
                            Dialogs.showInfo(window.MasterPageLinks.PromotePageNoneSelected, window.MasterPageLinks.PromoteTitle);
                            return;
                        }
                        else {
                            var pagesList = [],
                                unlocalizedName = items[0].Name,
                                tabEntity = dijit.byId(cgi.Id);

                            if (WidgetDefinition.My_Dashboard == items[0].Name) {
                                unlocalizedName = 'My Dashboard';
                            } else if (WidgetDefinition.Sales == items[0].Name) {
                                unlocalizedName = 'Sales';
                            }

                            var widgetstring = String.format(widgetOptions, tabEntity ? tabEntity.title : cgi.Name, "Sage.Entity.Interfaces.I" + cgi.Entity,
                                cgi.Name, 10, $('<div/>').text(cgi.Entity).html(), $('<div/>').text(cgi.Name).html(), 10, cgi.Entity, cgi.tableName);

                            xhr(String.format("slxdata.ashx/slx/crm/-/dashboard/page?action=addwidget&name={0}&family={1}",
                                    encodeURIComponent(unlocalizedName),
                                    encodeURIComponent(items[0].Family)), {
                                        method: "POST",
                                        headers: { 'Content-Type': 'application/json' },
                                        data: widgetstring
                                    }).then(function (data, status) {
                                        Dialogs.showInfo(String.format(window.MasterPageLinks.PromotionNotification, items[0].Name, tabEntity ? tabEntity.title : cgi.Name));
                                        if (typeof window.callback === "function") window.callback(data, status);
                                    },
                                    function (request, status, error) {
                                        Dialogs.showInfo(window.MasterPageLinks.Warning, request.responseText);
                                    });
                        }
                        //Our link is in a Repeater so there is a postback happening each time the dialog is launched.
                        //Destroy recursive to start over and avoid any dom corruption.        
                        dialog.destroyRecursive();
                    })
                });
                lang.mixin(dialog, new _DialogHelpIconMixin());
                dialog.createHelpIconByTopic("PromoteGroup");
            }

            var onHide = function () {
                dojo.disconnect(hideEvent);
                setTimeout((function (dialog) {
                    return function () {
                        dialog.destroyDescendants();
                        dialog.destroy(false);
                    };
                })(dialog), 1);
            };

            var hideEvent = dojo.connect(dialog, "hide", this, onHide);

            xhr("slxdata.ashx/slx/crm/-/dashboard/page", {
                cache: false,
                preventCache: true,
                handleAs: 'json'
            }).then(lang.hitch(this, function (data) {
                dialog.set('content', dialogContent.apply({
                    id: dialog.id,
                    okText: CommonResource.buttonOk,
                    cancelText: CommonResource.buttonCancel,
                    headerText: window.MasterPageLinks.PromoteDescription
                }));
                dialog.show();
                var grid = this._grid = new Grid({
                    id: 'promoteDialog-grid',
                    columns: [{
                        field: 'Name',
                        label: Dashboard.pageText,
                        width: '200px'
                    }],
                    selectionMode: 'single',
                    height: '100px',
                    placeHolder: 'promoteDialog-grid',
                    store: new Memory({ data: data, idProperty: 'Name' }),
                    rowSelection: true,
                    classNames: 'dgrid-autoheight'
                }, document.createElement('div'));
                grid.resize();
            }), function (e) {
                alert(window.MasterPageLinks.Warning + e.responseText);
                if (console.log) {
                    console.log(e);
                }
            });
        }
    });
    return Sage.Utility.Dashboard;
});
