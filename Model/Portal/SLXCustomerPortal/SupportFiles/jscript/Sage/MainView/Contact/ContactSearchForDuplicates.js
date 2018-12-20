require({cache:{
'url:Sage/MainView/Contact/templates/ContactDetailSummary.html':"[\r\n'<table style=\"width:100%\">',\r\n    '<thead>',\r\n        '<tr>',\r\n            '<th>',\r\n                '<div class=\"SummaryTitle\">',\r\n                    '<a href=\"Contact.aspx?entityid={%= $.templateData.id %}\">{%= Sage.Utility.htmlEncode($.templateData.name) %}</a>',\r\n                '</div>',\r\n            '</th>',\r\n        '</tr>',\r\n        '<tr>',\r\n            '<td>',\r\n                '<span>{%= $.templateData.address_address1 %}</span>',\r\n            '</td>',\r\n        '</tr>',\r\n        '<tr>',\r\n            '<td>',\r\n                '<span>{%= $.templateData.address_citystatezip %}</span>',\r\n            '</td>',\r\n        '</tr>',\r\n    '</thead>',\r\n    '<tbody>',\r\n        '<tr>',\r\n            '<td class=\"DataColumn\">',\r\n                '<table>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svAccount_Caption || \"Account:\" %}</td>',\r\n                        '<td class=\"DataItem\"><a href=\"Account.aspx?entityid={{%= $.templateData.account_id %}}\">{%= Sage.Utility.htmlEncode($.templateData.accountname) %}</a></td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svTitle_Caption || \"Title:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.title %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svWorkPhone_Caption || \"Work Phone:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= Sage.Format.phone($.templateData.workphone) %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svHomePhone_Caption || \"Home Phone:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= Sage.Format.phone($.templateData.homephone) %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svMobilePhone_Caption || \"Mobile Phone:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= Sage.Format.phone($.templateData.mobilephone) %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svEmail_Caption || \"Email:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.email %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svWebAddress_Caption || \"Web:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.webaddress %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svType_Caption || \"Type:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.type %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svAccMgr_Caption || \"Acct. Mgr.:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.accountmanager_userinfo_firstname %} {%= $.templateData.accountmanager_userinfo_lastname %}</td>',\r\n                    '</tr>',\r\n                '</table>',\r\n            '</td>',\r\n        '</tr>',\r\n    '</tbody>',\r\n'</table>',\r\n'<br/>',\r\n'<div style=\"padding-right:20px; text-align:right\">',\r\n    '<asp:Panel runat=\"server\" ID=\"pnlCancel\" CssClass=\"controlslist qfActionContainer\">',\r\n        '<div dojoType=\"dijit.form.Button\" id=\"{%= $.id %}_btn_Close\" onClick=\"javascript:contactSearchForDuplicates._close();\">{%= $.closeText %}</div>',\r\n    '</asp:Panel>',\r\n'</div>'\r\n] ",
'url:Sage/MainView/Lead/templates/LeadDetailSummary.html':"[\r\n'<table style=\"width:100%\">',\r\n    '<thead>',\r\n        '<tr>',\r\n            '<th>',\r\n                '<div class=\"SummaryTitle\">',\r\n                    '<a href=\"Lead.aspx?entityid={%= $.templateData.id %}\">{%= Sage.Utility.htmlEncode($.templateData.name) %}</a>',\r\n                '</div>',\r\n            '</th>',\r\n        '</tr>',\r\n        '<tr>',\r\n            '<td>',\r\n                '<span>{%= $.templateData.address_address1 %}</span>',\r\n            '</td>',\r\n        '</tr>',\r\n        '<tr>',\r\n            '<td>',\r\n                '<span>{%= $.templateData.address_citystatezip %}</span>',\r\n            '</td>',\r\n        '</tr>',\r\n    '</thead>',\r\n    '<tbody>',\r\n        '<tr>',\r\n            '<td class=\"DataColumn\">',\r\n                '<table>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svCompany_Caption || \"Company:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.accountname %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svTitle_Caption || \"Title:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.title %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svWorkPhone_Caption || \"Work Phone:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= Sage.Format.phone($.templateData.workphone) %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svHomePhone_Caption || \"Home Phone:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= Sage.Format.phone($.templateData.homephone) %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svMobilePhone_Caption || \"Mobile Phone:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= Sage.Format.phone($.templateData.mobilephone) %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svEmail_Caption || \"Email:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.email %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svWebAddress_Caption || \"Web:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.webaddress %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svType_Caption || \"Type:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.type %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svAccMgr_Caption || \"Acct. Mgr.:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.accountmanager_userinfo_firstname %} {%= $.templateData.accountmanager_userinfo_lastname %}</td>',\r\n                    '</tr>',\r\n                '</table>',\r\n            '</td>',\r\n        '</tr>',\r\n    '</tbody>',\r\n'</table>',\r\n'<br/>',\r\n'<div style=\"padding-right:20px; text-align:right\">',\r\n    '<asp:Panel runat=\"server\" ID=\"pnlCancel\" CssClass=\"controlslist qfActionContainer\">',\r\n        '<div dojoType=\"dijit.form.Button\" id=\"{%= $.id %}_btn_Close\" onClick=\"javascript:contactSearchForDuplicates._close();\">{%= $.closeText %}</div>',\r\n    '</asp:Panel>',\r\n'</div>'\r\n]",
'url:Sage/MainView/Account/templates/AccountDetailSummary.html':"[\r\n'<table style=\"width:100%\">',\r\n    '<thead>',\r\n        '<tr>',\r\n            '<th>',\r\n                '<div class=\"SummaryTitle\">',\r\n                    '<a href=\"Account.aspx?entityid={%= $.templateData.id %}\">{%= Sage.Utility.htmlEncode($.templateData.name) %}</a>',\r\n                '</div>',\r\n            '</th>',\r\n        '</tr>',\r\n        '<tr>',\r\n            '<td>',\r\n                '<span>{%= $.templateData.address_address1 %}</span>',\r\n            '</td>',\r\n        '</tr>',\r\n        '<tr>',\r\n            '<td>',\r\n                '<span>{%= $.templateData.address_citystatezip %}</span>',\r\n            '</td>',\r\n        '</tr>',\r\n    '</thead>',\r\n    '<tbody>',\r\n        '<tr>',\r\n            '<td class=\"DataColumn\">',\r\n                '<table>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svType_Caption || \"Type:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.type %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svSubType_Caption || \"Sub Type:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.subtype %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svSubType_Caption || \"Status:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.status %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svDivision_Caption || \"Division:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.division %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svIndustry_Caption || \"Industry:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= Sage.Format.phone($.templateData.industry) %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svMainPhone_Caption || \"Main phone:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= Sage.Format.phone($.templateData.mainphone) %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svTollFree_Caption || \"Toll free:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= Sage.Format.phone($.templateData.tollfree) %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svEmail_Caption || \"Email:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.email %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svWebAddress_Caption || \"Web:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.webaddress %}</td>',\r\n                    '</tr>',\r\n                    '<tr>',\r\n                        '<td class=\"SummaryCaption\">{%= $.svAccMgr_Caption || \"Acct. Mgr.:\" %}</td>',\r\n                        '<td class=\"DataItem\">{%= $.templateData.accountmanager_userinfo_firstname %} {%= $.templateData.accountmanager_userinfo_lastname %}</td>',\r\n                    '</tr>',\r\n                '</table>',\r\n            '</td>',\r\n        '</tr>',\r\n    '</tbody>',\r\n'</table>',\r\n'<br/>',\r\n'<div style=\"padding-right:20px; text-align:right\">',\r\n    '<asp:Panel runat=\"server\" ID=\"pnlCancel\" CssClass=\"controlslist qfActionContainer\">',\r\n        '<div dojoType=\"dijit.form.Button\" id=\"{%= $.id %}_btn_Close\" onClick=\"javascript:contactSearchForDuplicates._close();\">{%= $.closeText %}</div>',\r\n    '</asp:Panel>',\r\n'</div>'\r\n]"}});
/*globals dojo, define, Sage, dijit, Simplate, $ */
define("Sage/MainView/Contact/ContactSearchForDuplicates", [
    'dojo/_base/declare',
    'dojo/i18n!./nls/ContactSearchForDuplicates',
    'dijit/_Widget',
    'Sage/_Templated',
    'Sage/Utility',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'dojo/_base/lang',
    'Sage/UI/_DialogLoadingMixin',
    'Sage/UI/Dialogs',
    'dijit/Dialog',
    'dojo/i18n!./nls/ContactSearchForDuplicates',
    'dojo/text!./templates/ContactDetailSummary.html',
    'dojo/text!../Lead/templates/LeadDetailSummary.html',
    'dojo/text!../Account/templates/AccountDetailSummary.html'
],
function (
    declare,
    i18nStrings,
    _Widget,
    _Templated,
    Utility,
    _DialogHelpIconMixin,
    dojoLang,
    _DialogLoadingMixin,
    Dialogs,
    Dialog,
    nls,
    contactTemplate,
    leadTemplate,
    accountTemplate
) {
    var contactSearchForDuplicates = declare('Sage.MainView.Contact.ContactSearchForDuplicates', [_Widget, _Templated], {
        workSpace: {},
        templateDialog: false,
        templateData: '',
        rootUrl: 'slxdata.ashx/slx/crm/-/namedqueries?format=json&',
        widgetsInTemplate: true,
        constructor: function () {
            dojo.mixin(this, i18nStrings);
        },
        init: function (workSpace) {
            this.workSpace = workSpace;
        },
        onTabFiltersClick: function () {
            this.setDivDisplay(this.workSpace.divFiltersId, "inline");
            this.setDivDisplay(this.workSpace.divOptionsId, "none");

            this.setTabDisplay(this.workSpace.tabFiltersId, "tws-tab-button tws-active-tab-button");
            this.setTabDisplay(this.workSpace.tabOptionsId, "tws-tab-button");
        },
        onTabOptionsClick: function () {
            this.setDivDisplay(this.workSpace.divOptionsId, "inline");
            this.setDivDisplay(this.workSpace.divFiltersId, "none");

            this.setTabDisplay(this.workSpace.tabOptionsId, "tws-tab-button tws-active-tab-button");
            this.setTabDisplay(this.workSpace.tabFiltersId, "tws-tab-button");
        },
        setDivDisplay: function (divId, display) {
            var control = dojo.byId(divId);
            if (control !== null) {
                control.style.display = display;
            }
        },
        setTabDisplay: function (tabId, displayClass) {
            var control = dojo.byId(tabId);
            if (control !== null) {
                control.className = displayClass;
            }
        },
        showSummaryView: function (entityType, entityId) {
            var url = this.getReqestUrl(entityType, entityId);
            this.showData(url, this.successRequest, this.errorRequest, entityType, entityId);
        },
        getReqestUrl: function (entityType, entityId) {
            var url = null;
            if (entityType === 'Contact') {
                url = this.getReqeustUrlEx(entityId, 'ContactSearch');
            }
            if (entityType === 'Lead') {
                url = this.getReqeustUrlEx(entityId, 'LeadSearch');
            }
            if (entityType === 'Account') {
                url = this.getReqeustUrlEx(entityId, 'AccountSearch');
            }
            return url;
        },
        getReqeustUrlEx: function (entityId, searchName) {
            var fmtstr = "mainentity.id eq '${0}'";
            var params =
            {
                name: searchName,
                where: dojo.string.substitute(fmtstr, [entityId])
            };
            return this.rootUrl + this.buildQParamStr(params);
        },
        buildQParamStr: function (params) {
            var o = params;
            var p = [];
            if (typeof o === "object") {
                for (var k in o) {
                    p.push(k + "=" + encodeURIComponent(o[k]));
                }
            } else if (typeof o === "string") {
                p.push(o);
            }
            return p.join("&");
        },
        showData: function (url, successcallback, errorcallback, entityType, entityId) {
            if (typeof successcallback === "undefined") { successcallback = function (data) { }; }
            if (typeof errorcallback === "undefined") { errorcallback = function () { }; }
            if (typeof entityType === "undefined") { entityType = ''; }
            if (typeof entityId === "undefined") { entityId = ''; }
            var self = this;
            dojo.xhrGet({
                url: url,
                cache: false,
                preventCache: true,
                handleAs: 'json',
                load: function (data) {
                    successcallback(self, entityType, data);
                },
                error: function (request, status, error) {
                    errorcallback(self, error);
                }
            });
        },
        successRequest: function (self, entityType, data) {
            self.show(entityType, data);
        },
        show: function (entityType, data) {
            this.templateData = data.items[0];
            this.templateDialog = new Dialog({
                title: this.getSummaryTitle(entityType),
                id: [this.id, '-Dialog'].join(''),
                content: this.getTemplate(entityType).apply(this)
            });
            this.connect(this.templateDialog, "onCancel", this._close);
            this.templateDialog.show();
        },
        errorRequest: function (self, error) {
            Dialogs.showError(dojo.string.substitute(self.errorLoadingSummaryView, [error]));
        },
        getSummaryTitle: function (entityType) {
            var title = null;
            if (entityType === 'Contact') {
                title = this.ContactSummaryView_Title;
            }
            if (entityType === 'Lead') {
                title = this.LeadSummaryView_Title;
            }
            if (entityType === 'Account') {
                title = this.AccountSummaryView_Title;
            }
            return title;
        },
        getTemplate: function (entityType) {
            var tpl = null;
            if (entityType === 'Contact') {
                tpl = new Simplate(eval(contactTemplate));
            }
            if (entityType === 'Lead') {
                tpl = new Simplate(eval(leadTemplate));
            }
            if (entityType === 'Account') {
                tpl = new Simplate(eval(accountTemplate));
            }
            return tpl;
        },
        _close: function () {
            this.templateDialog.destroyRecursive();
        }
    });
    return contactSearchForDuplicates;
});