<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CustomerServiceOptions.ascx.cs" Inherits="CustomerServiceOptions" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>

<div style="display:none">
    <asp:Panel ID="CustomerServiceOptions_RTools" runat="server">
        <asp:ImageButton runat="server" ID="cmdSave" OnClick="Save_OnClick" ImageUrl="~/images/icons/Save_16x16.gif" 
             OnClientClick="sessionStorage.clear();" ToolTip="<%$ resources: Save.Text %>" />
        <SalesLogix:PageLink ID="helpLink" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources:Portal, Help_ToolTip %>"
            ImageUrl="~/ImageResource.axd?scope=global&amp;type=Global_Images&amp;key=Help_16x16" Target="Help" NavigateUrl="CustomerServiceOptions.aspx">
        </SalesLogix:PageLink>
    </asp:Panel>
</div>

<table border="0" cellpadding="0" cellspacing="0" class="formtable optionsTable">
	<col width="70%" />
    <tr>
        <td colspan="2" class="highlightedCell">
            <asp:Label ID="lblTimeTracking" runat="server" Font-Bold="True" Text="<%$ resources: TmeTracking.Text %>"></asp:Label>
		</td>
	</tr>
    <tr>
        <td>
            <span class="slxlabel">
                <asp:CheckBox ID="chkAutoPunchIn" runat="server" Text="<%$ resources: AutoPunchIn.Text %>" CssClass="inforAspCheckBox" AutoPostBack="true"/>
			</span>
        </td>
    </tr>
    <tr>
        <td>
            <span style="padding-left: 30px">
                <asp:Label ID="lblPromptToPunchIn" runat="server" Text="<%$ resources: PromptToPunchIn.Text %>"></asp:Label>
                <SalesLogix:NumericControl runat="server" ID="numPunchInMinutes" Strict="False" Width="40px" AutoPostBack="true" />
                <asp:Label ID="lblminutes" runat="server" Text="<%$ resources: PunchInMinutes.Text %>" ></asp:Label>
            </span>
        </td>
    </tr>
    <tr>
        <td>
            <span class="slxlabel">
                <asp:CheckBox ID="chkDisplayTicketPunchOut" runat="server" Text="<%$ resources: DisplayTicketPunchOut.Text %>" CssClass="inforAspCheckBox" />
			</span>
        </td>
    </tr>
    <tr>
        <td>
            <span class="slxlabel">
                <asp:CheckBox ID="chkDisplayTicketOnCompletion" runat="server" Text="<%$ resources: DisplayTicketOnCompletion.Text %>" CssClass="inforAspCheckBox" />
			</span>
        </td>
    </tr>
</table>
