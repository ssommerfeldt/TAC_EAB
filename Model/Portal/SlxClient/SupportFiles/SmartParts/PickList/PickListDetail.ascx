<%@ Control  Language="C#" AutoEventWireup="true" CodeFile="PickListDetail.ascx.cs" Inherits="PickListDetail" %>
<%@ Register Assembly="Sage.SalesLogix.Client.GroupBuilder" Namespace="Sage.SalesLogix.Client.GroupBuilder" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.PickList" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.Platform.WebPortal" Namespace="Sage.Platform.WebPortal.SmartParts" TagPrefix="SalesLogix" %>

<style type="text/css">
    .lblMsg
    {
        margin-left: 20px;
        font-style: italic;
        float: left;
	    font-size: 85%;
	    padding-top: .3em;
        width: 100%;
    }
</style>

<SalesLogix:SmartPartToolsContainer runat="server" ID="PicklistDetail_LTools" ToolbarLocation="right">
   <SalesLogix:GroupNavigator runat="server" ID="QFSLXGroupNavigator" ></SalesLogix:GroupNavigator>
    <asp:ImageButton runat="server" ID="btnSave" ToolTip="<%$ resources: btnSave.Caption %>" AlternateText="<%$ resources: btnSave.Caption %>"
        OnClientClick="(removePickListCache())()" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Save_16x16" />
    <asp:ImageButton runat="server" ID="btnNew" ToolTip="<%$ resources: btnNew.Caption %>" AlternateText="<%$ resources: btnNew.Caption %>"
        ImageUrl="~\images\icons\plus_16X16.gif" />
    <asp:ImageButton runat="server" ID="btnReset" ToolTip="<%$ resources: btnReset.ToolTip %>" 
        ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Reset_16x16"  />
    <asp:ImageButton runat="server" ID="btnDelete" ToolTip= "<%$ resources: btnDelete.Caption %>"  AlternateText="<%$ resources: btnDelete.Caption %>"
        ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Delete_16x16" />
    <SalesLogix:PageLink ID="lnkPicklistDetailHelp" runat="server" LinkType="HelpFileName"  ToolTip="<%$ resources: Portal, Help_ToolTip %>" Target="Help"
        NavigateUrl="Pick_List_Detail_View" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Help_16x16">
    </SalesLogix:PageLink>
</SalesLogix:SmartPartToolsContainer>

<table border="0" cellpadding="1" cellspacing="0" class="formtable" >
    <col width="20%" />
    <col width="40%" />
    <col width="40%" />
    <tr>
        <td>
            <div class="lbl alignleft">
                <asp:Label ID="txtPicklistName_lbl" AssociatedControlID="txtPicklistName" runat="server" Text="<%$ resources: txtPicklistName.Caption %>"></asp:Label>
            </div>
        </td>
        <td>
            <div class="textcontrol">
                <asp:TextBox Enabled="False" runat="server" ID="txtPicklistName" dojoType="Sage.UI.Controls.TextBox"></asp:TextBox>
            </div>
        </td>
        <td rowspan="7">
            <table border="0" cellpadding="1" cellspacing="0" class="wizardArea">
                <col width="50%" />
                <tr>
                    <td>
                        <div class="lbl alignleft">
                            <asp:Label ID="lblDefaultValue" AssociatedControlID="txtDefaultValue" runat="server" Text="<%$ resources: txtCurrentDefaultValue.Caption %>"></asp:Label>
                        </div>
                        <div class="textcontrol">
                            <asp:TextBox runat="server" ID="txtDefaultValue" ReadOnly="true" Enabled="False" dojoType="Sage.UI.Controls.TextBox"></asp:TextBox>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="lbl alignleft">
                            <asp:Label ID="lblTestFilter" AssociatedControlID="txtTestFilter" runat="server" Text="<%$ resources: txtTestFilter.Caption %>"></asp:Label>
                        </div>
                        <div class="textcontrol">
                            <asp:TextBox runat="server" ID="txtTestFilter" OnTextChanged="TestChanged" AutoPostBack="true" ReadOnly="false" Enabled="true" dojoType="Sage.UI.Controls.TextBox"></asp:TextBox>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="lbl alignleft">
                            <asp:Label ID="lblBoundLanguage" AssociatedControlID="cboBoundLanguage" runat="server" Text="<%$ resources: cboBoundLanguage.Caption %>"></asp:Label>
                        </div>
                        <div class="textcontrol picklist">
                            <asp:Listbox runat="server" ID="cboBoundLanguage"  SelectionMode="Single" Rows="1" OnSelectedIndexChanged="BoundLanguageChanged" AutoPostBack="false" class="dijitselect dropdown"/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="lbl alignleft">
                            <asp:Label ID="lblFilterByLanguage" AssociatedControlID="chkFilterByLanguage" runat="server" Text="<%$ resources: chkFilterByLanguage.Caption %>"></asp:Label>
                        </div>
                        <div class="textcontrol">
                            <SalesLogix:SLXCheckBox runat="server" ID="chkFilterByLanguage" OnCheckedChanged="FilterByLanguageChanged" TextAlign="right"/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="lbl alignleft">
                            <asp:Label ID="lblTextType" AssociatedControlID="txtTestType" runat="server" Text="<%$ resources: txtTestType.Caption %>"></asp:Label>
                        </div>
                        <div class="textcontrol picklist">
                            <asp:DropDownList runat="server" id="txtTestType" AutoPostBack="false" OnTextChanged="TestChanged" class="dijitselect dropdown">
							    <asp:ListItem runat="server" value="text" Text="<%$ resources: vText.Caption %>"></asp:ListItem>
							    <asp:ListItem runat="server" value="id"  Text="<%$ resources: vId.Caption %>" ></asp:ListItem>
							    <asp:ListItem runat="server" value="code" Text="<%$ resources: vCode.Caption %>" ></asp:ListItem>
						    </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="lbl alignleft">
                            <asp:Label ID="lblLangauageFallBack" AssociatedControlID="txtLangauageFallBack" runat="server" Text="<%$ resources: txtLangauageFallBack.Caption %>"></asp:Label>
                        </div>
                        <div class="textcontrol">
                            <asp:TextBox runat="server" ID="txtLangauageFallBack" ReadOnly="true" Enabled="False" dojoType="Sage.UI.Controls.TextBox"></asp:TextBox>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="lbl">
                            <asp:Label ID="lblTest" AssociatedControlID="pklTest" runat="server" Text="<%$ resources: txtTestList.Caption %>"></asp:Label>
                        </span>
                        <span class="textcontrol picklist">
                            <SalesLogix:PickListControl runat="server" ID="pklTest" AutoPostBack="false" />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
						<!--asp:Button Forced a page reload which was not needed-->
                        <button id="BtnclearCache" type="button" onclick="(reloadPickList())()"><asp:Literal runat="server" Text="<%$ resources: btnClearCache.Caption %>"></asp:Literal></button>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <div class="lbl alignleft">
                <asp:Label ID="lblDefaultLanguage" AssociatedControlID="cboDefaultLanguage" runat="server" Text="<%$ resources: lblDefaultLanguage.Caption %>"></asp:Label>
            </div>
        </td>
        <td>
            <div class="textcontrol picklist">
                <asp:Listbox runat="server" ID="cboDefaultLanguage"  SelectionMode="Single" Rows="1" OnSelectedIndexChanged="LanguageSet" AutoPostBack="true"  class="dijitselect dropdown"/>
            </div>
        </td>
        <td></td>
    </tr>
    <tr>
        <td>
            <div class="lbl alignleft">
                <asp:Label ID="lblOptions" AssociatedControlID="chkRequired" runat="server" Text="<%$ resources: lblOptions %>"></asp:Label>
            </div>
        </td>
        <td>
            <div class="slxlabel alignleft checkbox">
                <SalesLogix:SLXCheckBox runat="server" ID="chkRequired" Text="<%$ resources: chkRequired.Caption %>" TextAlign="right"/>
            </div>
        </td>
        <td></td>
    </tr>
    <tr>
       <td></td>
        <td>
            <div class="slxlabel alignleft checkbox">
                <SalesLogix:SLXCheckBox runat="server" ID="chkAllowMulltiple" Text="<%$ resources: chkAllowMulltiple.Caption %>" TextAlign="right"/>
            </div>
        </td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>
            <div class="slxlabel alignleft checkbox">
                <SalesLogix:SLXCheckBox runat="server" ID="chkMustMatch" Text="<%$ resources: chkMustMatch.Caption %>" TextAlign="right" />
            </div>
        </td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>
            <div class="slxlabel alignleft checkbox">
                <SalesLogix:SLXCheckBox runat="server" ID="chkSorted" Text="<%$ resources: chkSorted.Caption %>" TextAlign="right"/>
            </div>
        </td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>
            <div class="slxlabel alignleft checkbox">
                <SalesLogix:SLXCheckBox runat="server" ID="chkUsersCanEdit" Text="<%$ resources: chkUsersCanEdit.Caption %>" TextAlign="right" />
            </div>
            <div class="lblMsg">
                <asp:Label ID="lblWindowsMsg1" AssociatedControlID="chkUsersCanEdit" runat="server" Text="<%$ resources: lblWindowsMsg1 %>"></asp:Label>
            </div>
        </td>
        <td></td>
    </tr>
    <tr>
        <td>
            <div class="lbl alignleft">
                <asp:Label ID="lblWebOnly" AssociatedControlID="chkIsManaged" runat="server" Text="<%$ resources: lblWebOnly %>"></asp:Label>
            </div>
        </td>
        <td>
            <div class="slxlabel checkbox">
                <SalesLogix:SLXCheckBox runat="server" ID="chkIsManaged" Text="<%$ resources: chkIsManaged.Caption %>" TextAlign="right" />
            </div>
            <div class="lblMsg">
                <asp:Label ID="lblMsg2" AssociatedControlID="chkIsManaged" runat="server" Text="<%$ resources: lblWindowsMsg2 %>"></asp:Label>
            </div>
        </td>
    </tr>
<asp:LinkButton ID="btnForceDetailRefresh" CommandName="ForceReload" runat="server" OnClick="ReFreshDetails" Visible="true"/>
<asp:HiddenField  runat="server" ID="NextPickListIdHeader"></asp:HiddenField>
</table>
<script type="text/javascript">
    require(['dojo/topic', 'dojo/aspect', 'dojo/ready'],
        function (topic, aspect, ready) {
            ready(function () {
                var loadAroundPostBack = function (arg) {
                    var button = dojo.byId("<%= btnForceDetailRefresh.ClientID %>");
                    var placeHolder = dojo.byId("<%= NextPickListIdHeader.ClientID %>");
                    if (typeof (button) === 'object' && typeof (button.click) === 'function') {
                        var pub = true;
                        if (arg && arg.toEntityId) {
                            placeHolder.value = arg.toEntityId

                        } else {
                            var selectGroup = $('#GroupList_node div.dojoxGridRowSelected td');
                            if (selectGroup && selectGroup[1] && selectGroup[1].innerText) {
                                placeHolder.value = selectGroup[1].innerText;
                            } else {
                                console.warn('cannot find new picklist header id.');
                                pub = false;
                            }
                        }
                        if (pub) {
                            // the PickListItems view will listen for this publication to be made, then it will update.
                            topic.publish('/group/context/changed/picklistview', { toEntityId: placeHolder.value });
                        }
                        button.click();
                    }
                };

                var topics = ['/group/nav/previous', '/group/nav/next', '/group/nav/first', '/group/nav/last',
                    '/group/context/changed', '/group/context/changedTask', '/group/context/changed/picklistview/item/removed'];
                for (var i = 0; i < topics.length; i++) {
                    topic.subscribe(topics[i], loadAroundPostBack);
                }
                var groupObject = $('#GroupList_node');
                groupObject = groupObject ? groupObject[0] : null;
                if (groupObject) {
                    aspect.after(groupObject, 'onclick', loadAroundPostBack);
                }
            });
        });
   reloadPickList = function () {
       return (function () {
           var pkListNameControl = dojo.byId("<%= txtPicklistName.ClientID %>");
           var txtFilter = dojo.byId("<%= txtTestFilter.ClientID %>");
           var cboBoundLanguage = dojo.byId("<%= cboBoundLanguage.ClientID %>");
           var chkFilterByLanguage = dojo.byId("<%= chkFilterByLanguage.ClientID %>");
           var cboStoreMode = dojo.byId("<%= txtTestType.ClientID%>");
           var pkListControl = dojo.byId("<%= pklTest.ClientID %>" + '_Container');

           var testPKDomObj = dijit.registry.byId(pkListControl.children[0].id);
            if (typeof (testPKDomObj) === 'object' &&
                typeof (testPKDomObj._loadData) === 'function') {
                testPKDomObj.pickListName = pkListNameControl.value;
                testPKDomObj.filter = txtFilter.value;
                testPKDomObj.boundLanguage = cboBoundLanguage.value;
                testPKDomObj.filterByLanguage = chkFilterByLanguage.checked;
                testPKDomObj.storeMode = cboStoreMode.value;
                testPKDomObj.useCache = false; // just don't use the cache
                testPKDomObj._loadData();
            } else {
                console.warn('cannot find test pick list control.');
            }
           return false;
        });
   };
    require(['Sage/Utility/_LocalStorageMixin'],
        removePickListCache = function (localStorage) {
            return (dojo.hitch(this, function () {
                var pickListService = Sage.Services.getService('PickList');
                this.localStorage.clear(pickListService._storageNameSpace);
            }));
    });
</script>