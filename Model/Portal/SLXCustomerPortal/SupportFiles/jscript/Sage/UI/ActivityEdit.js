/*globals Sage, dojo, define, Sys */
define("Sage/UI/ActivityEdit", [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_Widget',
    'Sage/Utility',
    'Sage/Utility/Activity',
    'Sage/UI/Controls/GridParts/Columns/DateTime',
    'Sage/UI/Controls/GridParts/Columns/SlxLink',
    'dijit/form/FilteringSelect',
    'Sage/UI/SLXPreviewGrid/Filter/DateRange',
    'Sage/UI/SLXPreviewGrid/Filter/ActivityDateRange',
    'Sage/UI/SLXPreviewGrid/Filter/Text',
    'dojo/data/ItemFileReadStore',
    'dojo/string',
    'Sage/UI/SLXPreviewGrid/Filter/_previewGridFilterMixin',
    'Sage/UI/SLXPreviewGrid/Filter/Lookup',
    'Sage/Data/SDataServiceRegistry',
    'dojo/i18n!./nls/ActivityList',
    'Sage/Utility/Workspace',
    'Sage/UI/GridView',
    'dojo/on'
],
function (declare,
    lang,
    _Widget,
    utility,
    activityUtility,
    ColumnsDateTime,
    ColumnsLink,
    FilteringSelect,
    DateRangeFilter,
    ActivityDateRangeFilter,
    TextFilter,
    ItemFileReadStore,
    dString,
    filterMixin,
    lookupFilter,
    sDataServiceRegistry,
    i18nStrings,
    workspaceUtil,
    GridView,
    on) {
    var activityEdit = declare('Sage.UI.ActivityEdit', [_Widget], {
        workspace: '',
        tabId: '',
        connections: [],
        constructor: function (options) {
            this.connections = [];
        },
        startup: function () {
            $('.dijitDialogPaneContent.dijitAlignCenter').height(700);
            this.connections.push(dojo.subscribe('/entity/activity/create', this, this.onActivityChanges));
            this.connections.push(dojo.subscribe('/entity/activity/change', this, this.onActivityChanges));
            this.connections.push(dojo.subscribe('/entity/activity/delete', this, this.onActivityChanges));
        },
        onActivityChanges: function (activity) {
            if ($("#DialogWorkspace_window")[0].style.display !== "none") {
                __doPostBack('btnPostBack', '');
            }
        },
        destroy: function () {
            for (var i = 0; i < this.connections.length; i++) {
                dojo.unsubscribe(this.connections.pop());
            }
            this.inherited(arguments);
        }
    });
    return activityEdit;
});
