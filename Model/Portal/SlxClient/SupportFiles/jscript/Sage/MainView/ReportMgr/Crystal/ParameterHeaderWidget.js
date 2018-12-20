require({cache:{
'url:Sage/MainView/ReportMgr/Crystal/templates/ParameterHeaderWidget.html':"<table style=\"padding-bottom:5px; width:100%\">\r\n    <colgroup>\r\n        <col style=\"width:45%\" />\r\n        <col style=\"width:10%\" />\r\n        <col style=\"width:45%\" />\r\n    </colgroup>\r\n    <tr>\r\n        <td>\r\n            <label for=\"values\" style=\"font-weight:bold\" >${promptText}</label>\r\n        </td>\r\n        <td></td>\r\n        <td>\r\n            <label style=\"font-weight:bold\">${parameterFieldName}</label>\r\n        </td>\r\n    </tr>\r\n    <tr>\r\n        <td colspan=\"3\">\r\n            <div style=\"border-bottom: 1px solid #B5BCC7\"></div>\r\n        </td>\r\n    </tr>\r\n</table>\r\n"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/ReportMgr/Crystal/ParameterHeaderWidget", [
    'dojo/_base/declare',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/ParameterHeaderWidget.html',
    'Sage/Utility'
],
function (
    declare,
    _Widget,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    template,
    utility
) {
    /**
    * Declare the ParameterHeaderWidget class.
    * @constructor
    */
    var parameterHeaderWidget = declare('Sage.MainView.ReportMgr.Crystal.ParameterHeaderWidget', [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        promptText: '',
        parameterFieldName: '',
        /**
        * ParameterHeaderWidget class constructor.
        * @constructor
        * @param {Object} promptParameter - Parameter to be edited
        */
        constructor: function () {
        },
        postCreate: function () {
            this.inherited(arguments);
        }
    });
    return parameterHeaderWidget;
});