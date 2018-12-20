<%@ Control Language="C#" Debug="true" AutoEventWireup="true" CodeFile="MapGroup.ascx.cs" Inherits="SP_MapGroupPage" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.PickList" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.DependencyLookup" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.Lookup" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.HighLevelTypes" Namespace="Sage.SalesLogix.HighLevelTypes" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.Platform.WebPortal" Namespace="Sage.Platform.WebPortal.SmartParts" TagPrefix="SalesLogix" %>

<div style="display:none">
	<SalesLogix:SmartPartToolsContainer ID="MapGroup_RTools" runat="server">
	    <SalesLogix:PageLink ID="lnkMapGroupHelp" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources: Portal, Help_ToolTip %>" Target="Help"
	        NavigateUrl="mapgroup" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Help_16x16">
	    </SalesLogix:PageLink>
	</SalesLogix:SmartPartToolsContainer>
</div>

<table border="0" cellpadding="1" cellspacing="0" class="formtable">
    <col width="15%" />
    <col width="25%" />
    <col width="25%" />
    <%--<col width="20%" />--%>
    <col width="30%" />
    <tr>
        <td>
            <asp:Label ID="rbAccts_lbl" AssociatedControlID="rbAccts" runat="server" Text="<%$ resources: rbAccts.Caption %>"></asp:Label>
            <asp:RadioButton ID="rbAccts" GroupName="Main" AutoPostBack="True" OnCheckedChanged="rbAccts_btnChanged" runat="server" />
            <br />
            <asp:Label ID="rbCntcts_lbl" AssociatedControlID="rbCntcts" runat="server" Text="<%$ resources: rbCntcts.Caption %>"></asp:Label>
            <asp:RadioButton ID="rbCntcts" GroupName="Main" AutoPostBack="True" OnCheckedChanged="rbCntcts_btnChanged" runat="server" />
        </td>
        <td>
            <div class=" lbl alignleft">
                <asp:Label ID="cbxGroupName_lbl" AssociatedControlID="cbxGroupName" runat="server"
                    Text="<%$ resources: cbxGroupName.Caption %>"></asp:Label>
            </div>
            <div class="textcontrol select">
                <asp:ListBox runat="server" ID="cbxGroupName" OnSelectedIndexChanged="cbxGroupName_OnSelectedIndexChanged" AutoPostBack="True" SelectionMode="Single" Rows="1" EnableViewState="True"></asp:ListBox>
            </div>
        </td>
        <td></td>
        <asp:ListBox runat="server" ID="cbxDisplayRadius" SelectionMode="Single" Rows="1" Visible="false"></asp:ListBox>
        <td>
            <asp:Button runat="server" ID="btnSearch" OnClick="btnSearch_OnClick" Text="<%$ resources: btnSearch.Caption %>" Width="150" /><br />
            <asp:Button runat="server" ID="btnDisplayMap" OnClick="btnDisplayMap_OnClick" Text="<%$ resources: btnDisplayMap.Caption %>" Width="150" />
        </td>
    </tr>
</table>
<hr />
<SalesLogix:SlxGridView runat="Server" ID="dgPostalCodeResults" GridLines="Both"
    AutoGenerateColumns="false" CellPadding="4" CssClass="datagrid" PagerStyle-CssClass="gridPager"
    AlternatingRowStyle-CssClass="rowdk" RowStyle-CssClass="rowlt" SelectedRowStyle-CssClass="rowSelected"
    ShowEmptyTable="true" EnableViewState="true" AllowPaging="true" PageSize="25" ExpandableRows="True" ResizableColumns="True"
    EmptyTableRowText="No results to display" AllowSorting="true" OnSorting="PostalCodeResults_Sorting" OnPageIndexChanging="PostalCodeResults_PageIndexChanging"
    OnRowDataBound="PostalCodeResults_RowUpdating" OnDataBound="dgPostalCodeResults_DataBound">
    <Columns>

        <asp:TemplateField HeaderText="Contact" SortExpression="Contact">
            <ItemTemplate>
                <SalesLogix:PageLink runat="server" NavigateUrl="Contact" ID="NameLF" EntityId='<%# Eval("ContactId") %>' Text='<%# Eval("NameLF") %>' LinkType="EntityAlias"></SalesLogix:PageLink>
            </ItemTemplate>
        </asp:TemplateField>

        <asp:TemplateField HeaderText="Account" SortExpression="Account">
            <ItemTemplate>
                <SalesLogix:PageLink runat="server" NavigateUrl="Account" ID="AcctName" EntityId='<%# Eval("AccountId") %>' Text='<%# Eval("AccountName") %>' LinkType="EntityAlias"></SalesLogix:PageLink>
            </ItemTemplate>
        </asp:TemplateField>

        <asp:TemplateField HeaderText="Address" SortExpression="Address.Address1">
            <ItemTemplate>
                <a href="javascript:void(0)" onclick="centerMapOnLocation('<%# Eval("DisplayAddress") %>')">
                    <asp:Label runat="server" ID="AcctAddrDisplay" Text='<%# Eval("Address1") %>' SortExpression="Address1" HeaderText="Address"></asp:Label>
                </a>
            </ItemTemplate>
        </asp:TemplateField>

        <asp:BoundField DataField="City" HeaderText="City" SortExpression="City" />
        <asp:BoundField DataField="State" HeaderText="State" SortExpression="State" />
        <asp:BoundField DataField="PostalCode" HeaderText="Zip Code" SortExpression="PostalCode" />

        <asp:TemplateField HeaderText="Main Phone" SortExpression="Mainphone">
            <ItemTemplate>
                <SalesLogix:Phone runat="server" ID="grdAccountContactscol3" DisplayAsLabel="True" Text='<%#Eval("MainPhone") %>' />
            </ItemTemplate>
        </asp:TemplateField>

        <asp:BoundField DataField="Type" HeaderText="Type" SortExpression="Type"></asp:BoundField>
        <asp:BoundField DataField="SubType" HeaderText="SubType" SortExpression="SubType"></asp:BoundField>
        <asp:BoundField DataField="Status" HeaderText="Status" SortExpression="Status"></asp:BoundField>
    </Columns>
</SalesLogix:SlxGridView>
