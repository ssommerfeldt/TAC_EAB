<%@ Control Language="C#" AutoEventWireup="true" CodeFile="UserProfileOptionsPage.ascx.cs" Inherits="UserProfileOptionsPage" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>

<script type="text/javascript">
    function onLanguageSelectChange() {
        var langSelectDropdown = dijit.byId('<%=ddlLanguageId%>');
        var regionSelectDropdown = dijit.byId('<%=ddlRegionId%>');
        if (langSelectDropdown.value !== regionSelectDropdown.value) {
            regionSelectDropdown.set("value", langSelectDropdown.value);
        }
    };
</script>
<script>
    require([
        "dojo/on",
        "dojo/dom",
        "dojo/_base/lang",
        "Sage/Data/GroupLayoutSingleton"        
    ], function (on,dom,lang,groupLayoutSingleton) {
        var saveButton = dom.byId("<%= btnSave.ClientID %>");
        on(saveButton, "click", function (event) {
            //clear record dirty.
            var mgr = Sage.Services.getService("ClientBindingManagerService");
            if (mgr) {
                mgr.clearDirtyStatus();
            }
            //clear groups layout cache
            var singleton = new groupLayoutSingleton();
            singleton.clearCache();            
        });
    });
</script>




<div style="display:none">
<asp:Panel ID="userProfile_RTools" runat="server">
    <asp:ImageButton ID="btnSave" OnClick="btnSave_Click" runat="server" ImageUrl="~/images/icons/Save_16x16.gif" />
    <SalesLogix:PageLink ID="UserOptionsHelpLink" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources:Portal, Help_ToolTip %>" ImageUrl="~/ImageResource.axd?scope=global&amp;type=Global_Images&amp;key=Help_16x16"
     Target="Help" NavigateUrl="UserProfileOptions"></SalesLogix:PageLink>
</asp:Panel>
</div>

<table class="formtable optionsTable">
	<col width="50%" /><col width="50%" />
    <tr>
    	<td  class="highlightedCell">
			<asp:Label ID="lblGenOptions" runat="server" Text="User Profile" meta:resourcekey="lblUserProfile"></asp:Label>
		</td>
    </tr>
	<tr>
	    <td>
            <span class="lbl">
		        <asp:Label ID="lblLanguageSelect" runat="server" Text="Language Selection" meta:resourcekey="lblLanguageSelectResource"></asp:Label>
	        </span>
            <asp:DropDownList id="ddlLanguageSelect" data-dojo-type="Sage.UI.Controls.Select" runat="server" class="dropdown" CssClass="select-control" ClientIDMode="static" DataTextField="DisplayText" DataValueField="CultureCode" onchange="onLanguageSelectChange();"></asp:DropDownList>
        </td>
    </tr>
	<tr>
	    <td>
            <span class="lbl">
		        <asp:Label ID="lblRegionSelect" runat="server" Text="Regional Format" meta:resourcekey="lblRegionSelectResource"></asp:Label>
	        </span>
            <asp:DropDownList id="ddlRegionSelect" data-dojo-type="Sage.UI.Controls.Select" runat="server" class="dropdown" CssClass="select-control" ClientIDMode="static" DataTextField="DisplayText" DataValueField="CultureCode"></asp:DropDownList>            
        </td>
    </tr>

	<tr>
	    <td>
            <span class="lbl">
                <asp:Label ID="lblGoogleChina" runat="server" Text="Use Google China:" Visible="false" meta:resourcekey="lblGoogleChinaResource"></asp:Label>
            </span>
            <span class="lbl" style="width:auto; padding-right:10px;">
                <asp:CheckBox ID="chkGoogleChina" runat="server" CssClass="inforAspCheckBox" Visible="false" Text=" "/>
            </span>
        </td>
    </tr>
</table>


