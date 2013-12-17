/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'dojo/date/locale',
    'dojo/i18n!./nls/CrystalReportsUtility',
    'Sage/Reporting/Enumerations',
    'Sage/MainView/ReportMgr/ReportManagerUtility'
],
function (
    locale,
    nlsResources,
    Enumerations,
    ReportManagerUtility
) {
    Sage.namespace('Sage.MainView.ReportMgr.Crystal.CrystalReportsUtility');
    dojo.mixin(Sage.MainView.ReportMgr.Crystal.CrystalReportsUtility, {
        _nlsResources: nlsResources,
        getConditionTypes: function (report) {
            var conditionTypes = [];
            if (report) {
                if (report.useDateFilter) {
                    conditionTypes.push({
                        conditionType: Enumerations.ReportConditionType.DateRange,
                        caption: Enumerations.getReportConditionTypeCaption(Enumerations.ReportConditionType.DateRange)
                    });
                }
                if (report.useGroupFilter) {
                    conditionTypes.push({
                        conditionType: Enumerations.ReportConditionType.Group,
                        caption: Enumerations.getReportConditionTypeCaption(Enumerations.ReportConditionType.Group)
                    });
                }
                conditionTypes.push({
                    conditionType: Enumerations.ReportConditionType.Query,
                    caption: Enumerations.getReportConditionTypeCaption(Enumerations.ReportConditionType.Query)
                });
                if (report.useUserFilter) {
                    conditionTypes.push({
                        conditionType: Enumerations.ReportConditionType.User,
                        caption: Enumerations.getReportConditionTypeCaption(Enumerations.ReportConditionType.User)
                    });
                }
            }
            return conditionTypes;
        },
        getCurrentEntityCondition: function () {
            var condition = null;
            var entityContext = ReportManagerUtility.getCurrentEntityContext();
            if (entityContext && entityContext.EntityTableName && entityContext.EntityId) {
                //Note that it is assumed that the keyfield has the form tablenameid. 
                //This holds true for most regular entities such as account, contact, opportunity, etc.
                var keyField = entityContext.EntityTableName.toUpperCase() + "ID";
                condition = {
                    conditionType: Enumerations.ReportConditionType.Query,
                    table: entityContext.EntityTableName.toUpperCase(),
                    field: keyField,
                    operator: Enumerations.ReportConditionOperator.Is,
                    value: entityContext.EntityId,
                    fromRange: null,
                    toRange: null,
                    dataType: Enumerations.FieldDataTypes.String,
                    tag: null
                };
            }
            return condition;
        },
        getCurrentUserCondition: function () {
            var condition = {
                conditionType: Enumerations.ReportConditionType.User,
                table: null,
                field: null,
                operator: Enumerations.ReportConditionOperator.Is,
                value: nlsResources.txtCurrentUser,
                fromRange: null,
                toRange: null,
                dataType: Enumerations.FieldDataTypes.String,
                tag: ':UserID'
            };
            return condition;
        },
        getDateOnlyFormattedDate: function (dateValue) {
            return locale.format(dateValue, { selector: 'date', fullYear: true });
        }
    });
    return Sage.MainView.ReportMgr.Crystal.CrystalReportsUtility;
});