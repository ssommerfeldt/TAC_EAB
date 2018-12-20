<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AddPickList.ascx.cs" inherits="AddPickList"  %>
<SalesLogix:SmartPartToolsContainer runat="server" ID="AddPickList_RTools" ToolbarLocation="right">
    <SalesLogix:PageLink ID="lnkAddPickListHelp" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources: Portal, Help_ToolTip %>" Target="MCWebHelp" NavigateUrl="AddPickList" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Help_16x16"></SalesLogix:PageLink>
</SalesLogix:SmartPartToolsContainer>
<table border="0" cellpadding="1" cellspacing="0" class="formtable">
    <tr>
        <td>
            <div class="lbl alignleft">
                <asp:Label ID="txtPicklistName_lbl" AssociatedControlID="txtPicklistName" runat="server" Text="<%$ resources: txtPicklistName.Caption %>"></asp:Label>
            </div>
            <div class="textcontrol">
                <asp:TextBox runat="server" ID="txtPicklistName" Rows="1" dojoType="Sage.UI.Controls.TextBox"></asp:TextBox>
            </div>
        </td>
    </tr>
    <tr>
        <td>
            <div class="lbl alignleft">
                <asp:Label ID="lblDefaultLanguage" AssociatedControlID="cboDefaultLanguage" runat="server" Text="<%$ resources: lblDefaultLanguage.Caption %>"></asp:Label>
            </div>
            <div class="textcontrol picklist">
                <asp:Listbox runat="server" ID="cboDefaultLanguage"  SelectionMode="Single" Rows="1" AutoPostBack="false" class="dijitselect dropdown"/>
            </div>
        </td>
    </tr>
    <tr>
        <td>
            <asp:Panel runat="server" ID="ctrlstButtons" CssClass="controlslist qfActionContainer">
                <asp:Button ID="btnOK" Text="<%$ resources: btnOK.Caption %>" runat="server" CssClass="slxbutton" />
                <asp:Button ID="btnCancel" Text="<%$ resources: btnCancel.Caption %>" runat="server" CssClass="slxbutton" />
            </asp:Panel>
        </td>
    </tr>
</table>