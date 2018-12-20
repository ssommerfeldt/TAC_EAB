<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SalesNavigator.ascx.cs"
    Inherits="SmartParts_SalesNavigator_SalesNavigator" %>

<div style="display:none">
    <asp:Panel ID="SalesNavigator_RTools" runat="server">
        <SalesLogix:PageLink ID="lnkSalesNavigatorHelp" runat="server" LinkType="HelpFileName"
            ToolTip="<%$ resources:Portal, Help_ToolTip %>" Target="Help" NavigateUrl="salesnavigator.aspx"
            ImageUrl="~/ImageResource.axd?scope=global&amp;type=Global_Images&amp;key=Help_16x16"></SalesLogix:PageLink>
    </asp:Panel>
</div>

<div id="salesNavigatorContainer" class="salesNavigatorContainer" runat="server">
	<iframe id="salesNavigatorIframe" class="salesNavigatorIframe" runat="server" width="100%" height="100%" frameborder="0" type="text/html" />
</div>

