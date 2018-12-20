<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PasswordOptions.ascx.cs" Inherits="Passwords" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>

<div style="display:none">
    <asp:Panel ID="PasswordOptions_RTools" runat="server">
        <asp:ImageButton runat="server" ID="cmdSave" ToolTip="Save" OnClick="Save_OnClick" ImageUrl="~/images/icons/Save_16x16.gif" AlternateText="<%$ resources: cmdSave.Text %>" OnClientClick="sessionStorage.clear();" />
        <SalesLogix:PageLink ID="helpLink" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources:Portal, Help_ToolTip %>"
            ImageUrl="~/ImageResource.axd?scope=global&amp;type=Global_Images&amp;key=Help_16x16" Target="Help" NavigateUrl="PasswordOptions.aspx">
        </SalesLogix:PageLink>
    </asp:Panel>
</div>

<table border="0" cellpadding="0" cellspacing="0" class="formtable optionsTable">
	<col width="50%" />
    <col width="50%" />
    <tr>
        <td colspan="2">
            <div class="slxlabel alignleft checkbox">
                <SalesLogix:SLXCheckBox runat="server" ID="chkWindowsAuth" Text="<%$ resources: UseWindowsAuth.Text %>"/>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <div class="lbl alignright">
                <asp:Label ID="lblDefaultPassword" AssociatedControlID="txtDefaultPassword" runat="server" Text="<%$ resources: DefaultPassword.Text %>" ></asp:Label>
            </div>
            <div class="textcontrol">
                <asp:TextBox runat="server" ID="txtDefaultPassword"  dojoType="Sage.UI.Controls.TextBox" Width="50%" />
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <div class="lbl alignright">
                <asp:Label ID="lblMinimumPswdLength" AssociatedControlID="numMinimumPswdLength" runat="server" Text="<%$ resources: MinimumPswdLength.Text %>" ></asp:Label>
            </div>
            <div class="textcontrol numeric"> 
                <SalesLogix:NumericControl runat="server" ID="numMinimumPswdLength" Strict="False" Width="50%" />
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <div class="lbl alignright">
                <asp:Label ID="lblDaysPswdExpires" AssociatedControlID="numDaysPswdExpires" runat="server" Text="<%$ resources: DaysPswdExpires.Text %>" ></asp:Label>
            </div>
            <div class="textcontrol numeric"> 
                <SalesLogix:NumericControl runat="server" ID="numDaysPswdExpires" Strict="False" Width="50%" />
            </div>
        </td>
    </tr>
	<tr>
        <td class="highlightedCell">
            <asp:Label ID="lblPasswordOptions" runat="server" Font-Bold="True" Text="<%$ resources: PasswordOptions.Text %>"></asp:Label>
		</td>
        <td class="highlightedCell">
            <asp:Label ID="lblLoginAttempts" runat="server" Font-Bold="True" Text="<%$ resources: LoginAttempts.Text %>"></asp:Label>
		</td>
	</tr>
    <tr>
        <td>
            <div class="slxlabel alignleft checkbox">
                <SalesLogix:SLXCheckBox runat="server" ID="chkNumberLetters" Text="<%$ resources: NumberLetters.Text %>" CssClass="" LabelPlacement="right" />
            </div>
        </td>
        <td>
            <div class="lbl alignright leftDivLabel">
                <asp:Label ID="lblAttempts" runat="server" Text="<%$ resources: attempts.Text %>"></asp:Label>
            </div>
            <span class="duration">
                <SalesLogix:NumericControl runat="server" ID="numAttempts" Strict="False" Width="50px" />
            </span>
        </td>
    </tr>
    <tr>
        <td>
            <div class="slxlabel alignleft checkbox">
                <SalesLogix:SLXCheckBox runat="server" ID="chkForceChange" Text="<%$ resources: ForceChange.Text %>" AutoPostBack="True" CssClass="" LabelPlacement="right" />
            </div>
        </td>
        <td>
            <div class="lbl alignright leftDivLabel">
                <asp:Label ID="lblTimeoutLock" AssociatedControlID="numTimeoutLock" runat="server" Text="<%$ resources: TimeoutLock.Text %>" ></asp:Label>
            </div>
            <span  class="duration">
                <SalesLogix:NumericControl runat="server" ID="numTimeoutLock" Strict="False" Width="50px" />
            </span>
        </td>
    </tr>
    <tr>
        <td>
            <div class="slxlabel alignleft checkbox">
                <SalesLogix:SLXCheckBox runat="server" ID="chkBlankPasswords" Text="<%$ resources: BlankPasswords.Text %>" AutoPostBack="True" CssClass="" LabelPlacement="right" />
            </div>
        </td>
    </tr>
    <tr>
        <td>
            <div class="slxlabel alignleft checkbox">
                <SalesLogix:SLXCheckBox runat="server" ID="chkUserNameAsPassword" Text="<%$ resources: UserNameAsPassword.Text %>" CssClass="" LabelPlacement="right" />
            </div>
        </td>
    </tr>
</table>
