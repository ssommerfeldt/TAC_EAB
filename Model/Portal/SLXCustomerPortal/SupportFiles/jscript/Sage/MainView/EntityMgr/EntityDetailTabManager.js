require({cache:{
'url:Sage/MainView/EntityMgr/templates/EntityDetailTabManager.html':"[\r\n'<div class=\"HundredPercentHeight HundredPercentWidth\">',\r\n'    <div data-dojo-type=\"dijit.layout.TabContainer\" id=\"tabContainer\" class=\"HundredPercentHeight HundredPercentWidth\">',\r\n'        <div data-dojo-type=\"dijit.layout.ContentPane\" id=\"propertyDetailGridPane\" class=\"HundredPercentHeight HundredPercentWidth\">',\r\n'        </div>',\r\n'        <div data-dojo-type=\"dijit.layout.ContentPane\" id=\"filterDetailGridPane\" class=\"HundredPercentHeight HundredPercentWidth\">',\r\n'        </div>',\r\n'        <div data-dojo-type=\"dijit.layout.ContentPane\" id=\"metricDetailGridPane\" class=\"HundredPercentHeight HundredPercentWidth\">',\r\n'        </div>',\r\n'        <div data-dojo-type=\"dijit.layout.ContentPane\" id=\"relationDetailGridPane\" class=\"HundredPercentHeight HundredPercentWidth\">',\r\n'        </div>',\r\n'    </div>',\r\n'</div>'\r\n]"}});
/*globals dojo, define, Sage, dijit, Simplate, $ */
define("Sage/MainView/EntityMgr/EntityDetailTabManager", [
    'dijit/_Widget',
    'dijit/registry',
    'Sage/_Templated',
    'dojo/text!./templates/EntityDetailTabManager.html',
    'dojo/_base/declare',
    'Sage/MainView/EntityMgr/EntityDetailFilterGrid',
    'Sage/MainView/EntityMgr/EntityDetailPropertyGrid',
    'Sage/MainView/EntityMgr/EntityDetailRelationGrid',
    'dojo/dom-style',
    'dojo/i18n!./nls/_BaseEntityDetailContent',
    'Sage/MainView/EntityMgr/EntityDetailUtility',
    'dojo/dom',
    'dojo/_base/connect',
    'dojo/_base/lang',
    'dojo/dom-class'
],
function (
    _Widget,
    registry,
    _Templated,
    template,
    declare,
    EntityDetailFilterGrid,
    EntityDetailPropertyGrid,
    EntityDetailRelationGrid,
    domStyle,
    nlsResource,
    EntityDetailUtility,
    dom,
    dojoConnect,
    lang,
    domClass
) {
    var entityDetailTabManager = declare('Sage.MainView.EntityMgr.EntityDetailTabManager', [_Widget, _Templated], {
        workspace: 'TabWorkspace',
        widgetsInTemplate: true,
        widgetTemplate: new Simplate(eval(template)),
        filterGrid: false,
        metricGrid: false,
        propertiesGrid: false,
        relationsGrid: false,
        entityGrid: false,
        mainListItemSelected: '',
        edtmdataStore: false,
        detailUtility: false,
        constructor: function (selectedData) {
            if (registry.byId("tabContainer_tablist_menuBtn") && registry.byId("tabContainer_tablist_menuBtn").destroy) {
                registry.byId("tabContainer_tablist_menuBtn").destroy();
            }
            if (registry.byId("tabContainer_tablist_leftBtn") && registry.byId("tabContainer_tablist_leftBtn").destroy) {
                registry.byId("tabContainer_tablist_leftBtn").destroy();
            }
            if (registry.byId("tabContainer_tablist_filterDetailGridPane") && registry.byId("tabContainer_tablist_filterDetailGridPane").destroy) {
                registry.byId("tabContainer_tablist_filterDetailGridPane").destroy();
            }
            if (registry.byId("tabContainer_tablist_metricDetailGridPane") && registry.byId("tabContainer_tablist_metricDetailGridPane").destroy) {
                registry.byId("tabContainer_tablist_metricDetailGridPane").destroy();
            }
            if (registry.byId("tabContainer_tablist_relationDetailGridPane") && registry.byId("tabContainer_tablist_relationDetailGridPane").destroy) {
                registry.byId("tabContainer_tablist_relationDetailGridPane").destroy();
            }
            if (registry.byId("tabContainer_tablist_rightBtn") && registry.byId("tabContainer_tablist_rightBtn").destroy) {
                registry.byId("tabContainer_tablist_rightBtn").destroy();
            }
            if (registry.byId("filterGrid_Account_addFilter") && registry.byId("filterGrid_Account_addFilter").destroy) {
                registry.byId("filterGrid_Account_addFilter").destroy();
            }
            if (registry.byId("filterGrid_Account_editFilter") && registry.byId("filterGrid_Account_editFilter").destroy) {
                registry.byId("filterGrid_Account_editFilter").destroy();
            }
            if (registry.byId("filterGrid_Account_removeFilter") && registry.byId("filterGrid_Account_removeFilter").destroy) {
                registry.byId("filterGrid_Account_removeFilter").destroy();
            }
            if (registry.byId("filterGrid_Account_helpFilter") && registry.byId("filterGrid_Account_helpFilter").destroy) {
                registry.byId("filterGrid_Account_helpFilter").destroy();
            }
            if (registry.byId("filters_Account") && registry.byId("filters_Account").destroy) {
                registry.byId("filters_Account").destroy();
            }
            if (registry.byId("filters_Account_HeaderBar") && registry.byId("filters_Account_HeaderBar").destroy) {
                registry.byId("filters_Account_HeaderBar").destroy();
            }
            if (registry.byId("filters_Account_HeaderBar_splitter") && registry.byId("filters_Account_HeaderBar_splitter").destroy) {
                registry.byId("filters_Account_HeaderBar_splitter").destroy();
            }
            if (registry.byId("tp1f") && registry.byId("tp1f").destroy) {
                registry.byId("tp1f").destroy();
            }
            if (registry.byId("tp2m") && registry.byId("tp2m").destroy) {
                registry.byId("tp2m").destroy();
            }
            ///////////////////////////////////
            if (registry.byId("tabContainer") && registry.byId("tabContainer").destroy) {
                registry.byId("tabContainer").destroy();
            }
            if (registry.byId("filterDetailGridPane") && registry.byId("filterDetailGridPane").destroy) {
                registry.byId("filterDetailGridPane").destroy();
            }
            if (registry.byId("metricDetailGridPane") && registry.byId("metricDetailGridPane").destroy) {
                registry.byId("metricDetailGridPane").destroy();
            }
            if (registry.byId("relationDetailGridPane") && registry.byId("relationDetailGridPane").destroy) {
                registry.byId("relationDetailGridPane").destroy();
            }
            ///////////////////////////////
            if (registry.byId("filters") && registry.byId("filters").destroy) {
                registry.byId("filters").destroy();
            }
            if (registry.byId("Metrics") && registry.byId("Metrics").destroy) {
                registry.byId("Metrics").destroy();
            }

            this.mainListItemSelected = selectedData;

            this.detailUtility = new EntityDetailUtility();
            this.detailUtility.getSchemasInformationFromSData();
            this.detailUtility.getPropertiesAssociatedWithFilters(selectedData);
            this.detailUtility.getSpecialValues();
            this.detailUtility.refreshPropertyStore(selectedData.name);

            this.filterGrid = new EntityDetailFilterGrid({ id: "filterGrid", entityName: selectedData.name });
            this.metricGrid = new EntityDetailFilterGrid({ id: "metricGrid", entityName: selectedData.name });
            this.propertiesGrid = new EntityDetailPropertyGrid({ id: "propertyGrid", entityName: selectedData.name });
            this.relationsGrid = new EntityDetailRelationGrid({ id: "relationGrid", entityName: selectedData.name });
            domClass.add(this.filterGrid, 'HundredPercentHeight HundredPercentWidth');
            domClass.add(this.metricGrid, 'HundredPercentHeight HundredPercentWidth');
            domClass.add(this.propertiesGrid, 'HundredPercentHeight HundredPercentWidth');
            domClass.add(this.relationsGrid, 'HundredPercentHeight HundredPercentWidth');
        },
        postCreate: function () {
            var entityName = this.$descriptor;
            if (this.filterGrid) // if there are filters to display, then lets set up our filterGrid to resize with the tab's contentPane.
            {
                registry.byId("filterDetailGridPane").set("title", nlsResource.FilterTabTitle); // translatable tab title
                dojoConnect.connect(registry.byId("filterDetailGridPane"), "onShow", lang.partial(this.loadfilters, this));

                window.setTimeout(function () {
                    // setting title of tab with tab name for entity. This makes the tooltip match stylings in other areas.
                    registry.byId("tabContainer_tablist_filterDetailGridPane").set("title", nlsResource.filtersFor + " " + entityName);
                    domClass.add(registry.byId("filterDetailGridPane").domNode.parentNode, 'HundredPercentHeight HundredPercentWidth');
                });
            }
            if (this.metricGrid) // if there are filters to display, then lets set up our filterGrid to resize with the tab's contentPane.
            {
                registry.byId("metricDetailGridPane").set("title", nlsResource.MetricTabTitle); // translatable tab title
                dojoConnect.connect(registry.byId("metricDetailGridPane"), "onShow", lang.partial(this.loadmetrics, this));

                window.setTimeout(function () {
                    // setting title of tab with tab name for entity. This makes the tooltip match stylings in other areas.
                    registry.byId("tabContainer_tablist_metricDetailGridPane").set("title", nlsResource.metricsFor + " " + entityName);
                    domClass.add(registry.byId("metricDetailGridPane").domNode.parentNode, 'HundredPercentHeight HundredPercentWidth');
                });
            }
            if (this.propertiesGrid)// if there are properties to display, then lets set up our propertiesGrid to resize with the tab's contentPane.
            {
                registry.byId("propertyDetailGridPane").set("title", nlsResource.PropertyTabTitle); // translatable tab title
                dojoConnect.connect(registry.byId("propertyDetailGridPane"), "onShow", lang.partial(this.loadproperties, this));

                window.setTimeout(function () {
                    // setting title of tab with tab name for entity. This makes the tooltip match stylings in other areas.
                    registry.byId("tabContainer_tablist_propertyDetailGridPane").set("title", nlsResource.propertyFor + " " + entityName);
                    domClass.add(registry.byId("propertyDetailGridPane").domNode.parentNode, 'HundredPercentHeight HundredPercentWidth');
                });
            }
            if (this.relationsGrid) // if there are filters to display, then lets set up our filterGrid to resize with the tab's contentPane.
            {
                registry.byId("relationDetailGridPane").set("title", nlsResource.RelationTabTitle); // translatable tab title
                dojoConnect.connect(registry.byId("relationDetailGridPane"), "onShow", lang.partial(this.loadrelations, this));

                window.setTimeout(function () {
                    // setting title of tab with tab name for entity. This makes the tooltip match stylings in other areas.
                    registry.byId("tabContainer_tablist_relationDetailGridPane").set("title", 'Relationships for ' + entityName);
                    domClass.add(registry.byId("relationDetailGridPane").domNode.parentNode, 'HundredPercentHeight HundredPercentWidth');
                });
            }
        },
        loadfilters: function (context) {
            context.filterGrid.setUtility(context.detailUtility);
            context.filterGrid.placeAt(this.containerNode);
            context.filterGrid._where = "filterType ne 'analyticsMetric'";
            context.filterGrid.onOpen(this.id, "filters", context.mainListItemSelected);
            context.filterGrid.startup();
        },
        loadmetrics: function (context) {
            context.metricGrid.setUtility(context.detailUtility);
            context.metricGrid.placeAt(this.containerNode);
            context.metricGrid._where = "filterType eq 'analyticsMetric'";
            context.metricGrid.onOpen(this.id, "metrics", context.mainListItemSelected);
            context.metricGrid.startup();
        },
        loadproperties: function (context) {
            context.propertiesGrid.setUtility(context.detailUtility);
            context.propertiesGrid.placeAt(this.containerNode);
            context.propertiesGrid.onOpen(this.id, "fields", context.mainListItemSelected);
            context.propertiesGrid.startup();
        },
        loadrelations: function (context) {
            context.relationsGrid.setUtility(context.detailUtility);
            context.relationsGrid.placeAt(this.containerNode);
            context.relationsGrid.onOpen(this.id, "relations", context.mainListItemSelected);
            context.relationsGrid.startup();
        }
    });
    return entityDetailTabManager;
});