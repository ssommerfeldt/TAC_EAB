<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AccountHierarchy.ascx.cs" Inherits="SmartParts_Account_AccountHierarchy" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>
<style>
    /* These styles must be loaded after Telerik to override */
    .dialog-workspace-content .slx-grid-container {
        max-height: 500px !important;
    }
    .dialog-workspace-content .lbl {
        text-align: inherit !important;
    }
</style>
<table style="height: 100%; width: 100%; border-width: 0; padding: 1px; border-spacing: 0; border-collapse: separate;">
    <tr style="height: auto;">
        <td class="tlk-Tree-Container">
            <div id="treeContainer" style="">
                <telerik:RadTreeView ID="RadTreeView1" runat="server" OnNodeClick="RadTreeView1_NodeClick" CssClass="tlk-Tree"
                        Skin="Simple" Height="655px" Width="100%" OnNodeCreated="RadTreeView1_NodeCreated" OnNodeDataBound="RadTreeView1_NodeDataBound" meta:resourcekey="RadTreeView1Resource1">
                </telerik:RadTreeView>
            </div>
        </td>
        <td style="width: 1px; border-right: 1px solid #005bb8; border-left: 1px solid #005bb8;">&nbsp;</td>
        <td style="border-bottom: 1px solid #005bb8; padding: 0; vertical-align: top;">
            <table style="width: 100%; vertical-align: top; height: 100%; border-width: 0">
                <tr>
                    <td style="vertical-align: top; height: 240px;">
                        <table style="width: 100%;">
                            <tr style="height: 20px;">
                                <td colspan="1" style="text-align: right;"><asp:Label runat="server" ID="lblGoTo" style="font-weight: 700" meta:resourcekey="lblGoToResource1">Go To</asp:Label></td>
                                <td colspan="3">
                                    <asp:Label ID="labelSelected" runat="server" meta:resourcekey="labelSelectedResource1"></asp:Label><br>
                                </td>
                            </tr>
                            <tr style="height: 20px;">
                                <td style="width: 30%;"></td>
                                <td style="width: 20%;"></td>
                                <td style="width: 30%;">
                                    <input type="hidden" runat="server" id="btnPostBack" clientidmode="Static" />
                                </td>
                                <td style="width: 20%;"></td>
                            </tr>
                            <tr style="height: 20px;">
                                <td style="text-align: right;white-space: nowrap;">
                                    <asp:Label runat="server" ID="lblOpenOpportunities" style="font-weight: 700" meta:resourcekey="lblOpenOpportunitiesResource1">Open Opportunities</asp:Label>
                                </td>
                                <td class="snapshot-column alignright" style="white-space: nowrap;">
                                    <SalesLogix:Currency ID="lblOppOpen" runat="server" Enabled="false" ExchangeRateType="BaseRate" DisplayMode="AsText" DisplayCurrencyCode="false">
                                    </SalesLogix:Currency>
                                </td>
                                <td height="20" style="text-align: right;white-space: nowrap;">
                                    <asp:Label runat="server" ID="lblTotalAmountInvoiced" style="font-weight: 700" meta:resourcekey="lblTotalAmountInvoicedResource1">Total Invoiced</asp:Label></td>
                                <td class="snapshot-column alignright" style="white-space: nowrap;">
                                    <SalesLogix:Currency ID="txtAmtInvoiced" runat="server" Enabled="false" ExchangeRateType="BaseRate" DisplayMode="AsText" DisplayCurrencyCode="false">
                                    </SalesLogix:Currency>
                                </td>
                            </tr>
                            <tr style="height: 20px;">
                                <td style="text-align: right;white-space: nowrap;">
                                    <asp:Label runat="server" ID="lblOpportunitiesLost" style="font-weight: 700" meta:resourcekey="lblOpportunitiesLostResource1">Opportunities Lost</asp:Label></td>
                                <td class="snapshot-column alignright">
                                    <SalesLogix:Currency ID="lblOppLost" runat="server" Enabled="false" ExchangeRateType="BaseRate" DisplayMode="AsText" DisplayCurrencyCode="false">
                                    </SalesLogix:Currency>
                                </td>
                                <td style="text-align: right;white-space: nowrap;">
                                    <asp:Label runat="server" ID="lblTotalAmountReceived" style="font-weight: 700" meta:resourcekey="lblTotalAmountReceivedResource1">Total Received</asp:Label></td>
                                <td class="snapshot-column alignright" style="white-space: nowrap;">
                                    <SalesLogix:Currency ID="txtTotAmtReceived" runat="server" Enabled="false" ExchangeRateType="BaseRate" DisplayMode="AsText" DisplayCurrencyCode="false">
                                    </SalesLogix:Currency>
                                </td>
                            </tr>
                            <tr style="height: 20px;">
                                <td style="text-align: right;white-space: nowrap;">
                                    <asp:Label runat="server" ID="lblOpportunitiesWon" style="font-weight: 700" meta:resourcekey="lblOpportunitiesWonResource1">Opportunities Won</asp:Label>
                                </td>
                                <td class="snapshot-column alignright" style="white-space: nowrap;">
                                    <SalesLogix:Currency ID="lblOppWon" runat="server" Enabled="false" ExchangeRateType="BaseRate" DisplayMode="AsText" DisplayCurrencyCode="false">
                                    </SalesLogix:Currency>
                                </td>
                                <td style="text-align: right;white-space: nowrap;">
                                    <asp:Label runat="server" ID="lblTotalSalesOrders" style="font-weight: 700" meta:resourcekey="lblTotalSalesOrdersResource1">Total Sales Orders</asp:Label></td>
                                <td class="snapshot-column alignright" style="white-space: nowrap;">
                                    <asp:Label ID="txtTotSalesOrders" runat="server" meta:resourcekey="txtTotSalesOrdersResource1"></asp:Label>
                                </td>
                            </tr>
                            <tr style="height: 20px;">
                                <td style="text-align: right;white-space: nowrap;">
                                    <asp:Label runat="server" ID="lblTotalOpportunitiesWon" style="font-weight: 700" meta:resourcekey="lblTotalOpportunitiesWonResource1">Total Opportunities Won</asp:Label></td>
                                <td class="snapshot-column alignright" style="white-space: nowrap;">
                                    <asp:Label ID="lblNumOppWon" runat="server" meta:resourcekey="lblNumOppWonResource1"></asp:Label>
                                </td>
                                <td style="text-align: right;white-space: nowrap;">
                                    <asp:Label runat="server" ID="lblTotalQuotes" style="font-weight: 700" meta:resourcekey="lblTotalQuotesResource1">Total Quotes</asp:Label></td>
                                <td class="snapshot-column alignright" style="white-space: nowrap;">
                                    <asp:Label ID="txtTotQuotes" runat="server" meta:resourcekey="txtTotQuotesResource1"></asp:Label>
                                </td>
                            </tr>
                            <tr style="height: 20px;">
                                <td style="text-align: right;white-space: nowrap;">
                                    <asp:Label runat="server" ID="lblTotalOpportunitiesLost" style="font-weight: 700" meta:resourcekey="lblTotalOpportunitiesLostResource1">Total Opportunities Lost</asp:Label></td>
                                <td class="snapshot-column alignright" style="white-space: nowrap;">
                                    <asp:Label ID="lblNumOppLost" runat="server" meta:resourcekey="lblNumOppLostResource1"></asp:Label>
                                </td>
                            </tr>
                            <tr style="height: 20px;">
                                <td></td>
                            </tr>
                            <tr style="height: 20px;">
                                <td style="text-align: right;"><strong>
                                    <SalesLogix:SLXCheckBox ID="chkCascade" runat="server" Text="Cascade Totals" AutoPostBack="True" OnCheckedChanged="chkCascade_CheckedChanged" TextAlign="Left" LabelPlacement="" meta:resourcekey="chkCascadeResource1" shouldPublishMarkDirty="False" /></strong></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100%; vertical-align: top;white-space: nowrap;">
                        <div style="vertical-align: top!important;" runat="server">
                            <telerik:RadTabStrip RenderMode="Lightweight" runat="server" ID="RadTabStrip1" MultiPageID="RadMultiPage1" SelectedIndex="0" Skin="Simple" CssClass="tlk-Tabs" meta:resourcekey="RadTabStrip1Resource1">
                                <Tabs>
                                    <telerik:RadTab Text="Contacts" Width="100px" Selected="True" meta:resourcekey="radTabContacts1"></telerik:RadTab>
                                    <telerik:RadTab Text="Opportunities" Width="100px" meta:resourcekey="radTabOpportunities1"></telerik:RadTab>
                                    <telerik:RadTab Text="Tickets" Width="100px" Visible="false" meta:resourcekey="radTabTickets1"></telerik:RadTab>
                                    <telerik:RadTab Text="Quotes" Width="100px" meta:resourcekey="radTabQuotes1"></telerik:RadTab>
                                    <telerik:RadTab Text="Sales Orders" Width="100px" meta:resourcekey="radTabSalesOrders1"></telerik:RadTab>
                                    <telerik:RadTab Text="Activities" Width="100px" meta:resourcekey="radTabActivities1"></telerik:RadTab>
                                </Tabs>
                            </telerik:RadTabStrip>
                            <telerik:RadMultiPage runat="server" ID="RadMultiPage1" SelectedIndex="0" CssClass="outerMultiPage" meta:resourcekey="RadMultiPage1Resource1">
                                <telerik:RadPageView runat="server" ID="RadPageView1" meta:resourcekey="RadPageView1Resource1" Selected="True">
                                    <div class="ingredients qsf-ia" style="vertical-align: top;">
                                        <SalesLogix:SlxGridView runat="server" ID="grdContacts" GridLines="None" Width="598px" Height="100%"
                                            AutoGenerateColumns="False" CellPadding="4" CssClass="datagrid" ShowEmptyTable="True" EnableViewState="False" AllowPaging="True" PageSize="8"
                                            ExpandableRows="False" ResizableColumns="False" DataKeyNames="Id" OnPageIndexChanging="grdContacts_PageIndexChanging" OnRowCreated="grdContacts_RowCreated" AllowSorting="True" OnSorting="grdContacts_Sorting" CurrentSortDirection="Descending" CurrentSortExpression="" EmptyTableRowText="" meta:resourcekey="grdContactsResource1" ShowSortIcon="False" UseSLXPagerTemplate="True">
                                            <AlternatingRowStyle CssClass="rowdk" />
                                            <Columns>
                                                <asp:TemplateField HeaderText="Account" meta:resourcekey="fldAccount1" SortExpression="AccountName">
                                                    <ItemTemplate>
                                                        <asp:HyperLink ID="txtAccount" runat="server" meta:resourcekey="txtAccountResource1"></asp:HyperLink>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Contact" meta:resourcekey="fldContact1" SortExpression="NameLF">
                                                    <ItemTemplate>
                                                        <asp:HyperLink ID="txtContact" runat="server" meta:resourcekey="txtContactResource1"></asp:HyperLink>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Work Phone" meta:resourcekey="fldWorkPhone1" SortExpression="WorkPhone">
                                                    <ItemTemplate>
                                                        <SalesLogix:Phone ID="txtPhone" runat="server" meta:resourcekey="txtPhoneResource1" DisplayAsLabel="True" CssClass="hierarchylbl" />
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Title" meta:resourcekey="fldTitle1" SortExpression="Title">
                                                    <ItemTemplate>
                                                        <asp:Label ID="txtTitle" runat="server" meta:resourcekey="txtTitleResource1"></asp:Label>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Email" meta:resourcekey="fldEmail1" SortExpression="Email">
                                                    <ItemTemplate>
                                                        <asp:HyperLink ID="txtEmail" runat="server" meta:resourcekey="txtEmailResource1"></asp:HyperLink>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                            </Columns>
                                            <PagerStyle CssClass="gridPager" />
                                            <RowStyle CssClass="rowlt" />
                                            <SelectedRowStyle CssClass="rowSelected" />
                                        </SalesLogix:SlxGridView>
                                    </div>
                                </telerik:RadPageView>
                                <telerik:RadPageView runat="server" ID="RadPageView2" meta:resourcekey="RadPageView2Resource1">
                                    <div class="ingredients qsf-ib" style="vertical-align: top;">
                                        <SalesLogix:SlxGridView runat="server" ID="grdOpportunities" GridLines="None" Width="598px" Height="100%"
                                            AutoGenerateColumns="False" CellPadding="4" CssClass="datagrid" ShowEmptyTable="True" EnableViewState="False" PageSize="8"
                                            ExpandableRows="False" ResizableColumns="False" DataKeyNames="Id" AllowPaging="True" OnRowCreated="grdOpportunities_RowCreated" OnPageIndexChanging="grdOpportunities_PageIndexChanging" AllowSorting="True" OnSorting="grdOpportunities_Sorting" CurrentSortDirection="Descending" CurrentSortExpression="" EmptyTableRowText="" meta:resourcekey="grdOpportunitiesResource1" ShowSortIcon="False" UseSLXPagerTemplate="True">
                                            <AlternatingRowStyle CssClass="rowdk" />
                                            <Columns>
                                                <asp:TemplateField HeaderText="Account" meta:resourcekey="fldAccount1" SortExpression="AccountName">
                                                    <ItemTemplate>
                                                        <asp:HyperLink ID="txtAccount" runat="server" meta:resourcekey="txtAccountResource1"></asp:HyperLink>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Opportunity" meta:resourcekey="fldOpportunity1" SortExpression="Description">
                                                    <ItemTemplate>
                                                        <asp:HyperLink ID="txtOpportunity" runat="server" meta:resourcekey="txtOpportunityResource1"></asp:HyperLink>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Account Manager" meta:resourcekey="fldAccountManager1" SortExpression="AccountManager">
                                                    <ItemTemplate>
                                                        <asp:Label ID="txtAccountManager" runat="server" meta:resourcekey="txtAccountManagerResource1"></asp:Label>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:BoundField DataField="Status" HeaderText="Status" meta:resourcekey="bndStatus1" SortExpression="Status" />
                                                <asp:TemplateField HeaderText="Potential" meta:resourcekey="fldPotential1" SortExpression="SalesPotential">
                                                    <ItemTemplate>
                                                        <SalesLogix:Currency ID="txtSalesPotential" runat="server" DisplayCurrencyCode="false" DisplayMode="AsText" Enabled="false" ExchangeRateType="BaseRate">
                                                            <CurrencyStyle Width="150px" />
                                                        </SalesLogix:Currency>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField SortExpression="EstimatedClose" HeaderText="<%$ resources: bndEstClose1.HeaderText %>" >
                                                    <itemtemplate>
                                                        <SalesLogix:DateTimePicker runat="server" ID="EstimatedClose" DisplayTime="False" DisplayDate="True" DisplayMode="AsText"
                                                                                   DateOnly="True" DateTimeValue='<%# Eval("EstimatedClose") %>' CssClass="hierarchydatelbl">
                                                        </SalesLogix:DateTimePicker>
                                                    </itemtemplate>
                                                </asp:TemplateField>
                                            </Columns>
                                            <PagerStyle CssClass="gridPager" />
                                            <RowStyle CssClass="rowlt" />
                                            <SelectedRowStyle CssClass="rowSelected" />
                                        </SalesLogix:SlxGridView>
                                    </div>
                                </telerik:RadPageView>
                                <telerik:RadPageView runat="server" ID="RadPageView3" meta:resourcekey="RadPageView3Resource1">
                                    <div class="ingredients qsf-ib" style="vertical-align: top;">
                                        <SalesLogix:SlxGridView runat="server" ID="grdTickets" GridLines="None" Width="598px" Height="100%" PageSize="8"
                                            AutoGenerateColumns="False" CellPadding="4" CssClass="datagrid" ShowEmptyTable="True" EnableViewState="False"
                                            ExpandableRows="False" ResizableColumns="False" DataKeyNames="Id" AllowPaging="True" OnPageIndexChanging="grdTickets_PageIndexChanging" OnRowCreated="grdTickets_RowCreated" AllowSorting="True" OnSorting="grdTickets_Sorting" CurrentSortDirection="Descending" CurrentSortExpression="" EmptyTableRowText="" meta:resourcekey="grdTicketsResource1" ShowSortIcon="False" UseSLXPagerTemplate="True">
                                            <AlternatingRowStyle CssClass="rowdk" />
                                            <Columns>
                                                <asp:TemplateField HeaderText="Account" meta:resourcekey="fldAccount1" SortExpression="AccountName">
                                                    <ItemTemplate>
                                                        <asp:HyperLink ID="txtAccount" runat="server" meta:resourcekey="txtAccountResource1"></asp:HyperLink>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:HyperLinkField DataNavigateUrlFields="Id" DataNavigateUrlFormatString="../../Ticket.aspx?entityId={0}" DataTextField="TicketNumber" HeaderText="Ticket" meta:resourcekey="lnkTicket1" SortExpression="TicketNumber" />
                                                <asp:TemplateField HeaderText="Assigned" meta:resourcekey="fldAssigned1" SortExpression="AssignedTo">
                                                    <ItemTemplate>
                                                        <asp:Label ID="txtAssignedTo" runat="server" meta:resourcekey="txtAssignedToResource1"></asp:Label>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Category" meta:resourcekey="fldCategory1" SortExpression="Category">
                                                    <ItemTemplate>
                                                        <asp:Label ID="txtCategory" runat="server" meta:resourcekey="txtCategoryResource1"></asp:Label>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Description" meta:resourcekey="fldDescription1" SortExpression="Subject">
                                                    <ItemTemplate>
                                                        <asp:Label ID="txtSubject" runat="server" meta:resourcekey="txtSubjectResource1"></asp:Label>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Ticket Status" meta:resourcekey="fldTicketStatus1" SortExpression="StatusCode">
                                                    <ItemTemplate>
                                                        <asp:Label ID="txtTicketStatus" runat="server" meta:resourcekey="txtTicketStatusResource1"></asp:Label>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                            </Columns>
                                            <PagerStyle CssClass="gridPager" />
                                            <RowStyle CssClass="rowlt" />
                                            <SelectedRowStyle CssClass="rowSelected" />
                                        </SalesLogix:SlxGridView>
                                    </div>
                                </telerik:RadPageView>
                                <telerik:RadPageView runat="server" ID="RadPageView4" meta:resourcekey="RadPageView4Resource1">
                                    <div class="ingredients qsf-ib" style="vertical-align: top;">
                                        <SalesLogix:SlxGridView runat="server" ID="grdQuotes" GridLines="None" Width="598px" Height="100%" PageSize="8"
                                            AutoGenerateColumns="False" CellPadding="4" CssClass="datagrid" ShowEmptyTable="True" EnableViewState="False"
                                            ExpandableRows="False" ResizableColumns="False" DataKeyNames="Id" AllowPaging="True" OnPageIndexChanging="grdQuotes_PageIndexChanging" AllowSorting="True" OnRowCreated="grdQuotes_RowCreated" OnSorting="grdQuotes_Sorting" CurrentSortDirection="Descending" CurrentSortExpression="" EmptyTableRowText="" meta:resourcekey="grdQuotesResource1" ShowSortIcon="False" UseSLXPagerTemplate="True">
                                            <AlternatingRowStyle CssClass="rowdk" />
                                            <Columns>
                                                <asp:TemplateField HeaderText="Account" meta:resourcekey="fldAccount1" SortExpression="AccountName">
                                                    <ItemTemplate>
                                                        <asp:HyperLink ID="txtAccount" runat="server" meta:resourcekey="txtAccountResource1"></asp:HyperLink>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:HyperLinkField DataNavigateUrlFields="Id" DataNavigateUrlFormatString="../../Quote.aspx?entityId={0}" DataTextField="QuoteNumber" HeaderText="Quote Order" meta:resourcekey="lnkQuote1" SortExpression="QuoteNumber" />
                                                <asp:TemplateField SortExpression="EndDate" HeaderText="<%$ resources: bndDueDate1.HeaderText %>" >
                                                    <ItemTemplate>
                                                        <SalesLogix:DateTimePicker runat="server" ID="EndDate" DisplayTime="False" DisplayDate="True" DisplayMode="AsText"
                                                                                   DateOnly="True" DateTimeValue='<%# Eval("EndDate") %>' CssClass="hierarchydatelbl">
                                                        </SalesLogix:DateTimePicker>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:BoundField DataField="Status" HeaderText="Status" meta:resourcekey="bndStatus2" SortExpression="Status" />
                                                <asp:TemplateField HeaderText="GrandTotal" meta:resourcekey="bndGrandTotal1" SortExpression="GrandTotal">
                                                    <ItemTemplate>
                                                        <SalesLogix:Currency ID="txtGrandTotal" runat="server" DisplayCurrencyCode="false" DisplayMode="AsText" Enabled="false" ExchangeRateType="BaseRate">
                                                            <CurrencyStyle Width="150px" />
                                                        </SalesLogix:Currency>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                            </Columns>
                                            <PagerStyle CssClass="gridPager" />
                                            <RowStyle CssClass="rowlt" />
                                            <SelectedRowStyle CssClass="rowSelected" />
                                        </SalesLogix:SlxGridView>
                                    </div>
                                </telerik:RadPageView>
                                <telerik:RadPageView runat="server" ID="RadPageView5" meta:resourcekey="RadPageView5Resource1">
                                    <div class="ingredients qsf-ib" style="vertical-align: top;">
                                        <SalesLogix:SlxGridView runat="server" ID="grdSalesOrders" GridLines="None" Width="598px" Height="100%" PageSize="8"
                                            AutoGenerateColumns="False" CellPadding="4" CssClass="datagrid" ShowEmptyTable="True" EnableViewState="False"
                                            ExpandableRows="False" ResizableColumns="False" DataKeyNames="Id" AllowPaging="True" OnPageIndexChanging="grdSalesOrders_PageIndexChanging" AllowSorting="True" OnRowCreated="grdSalesOrders_RowCreated" OnSorting="grdSalesOrders_Sorting" CurrentSortDirection="Descending" CurrentSortExpression="" EmptyTableRowText="" meta:resourcekey="grdSalesOrdersResource1" ShowSortIcon="False" UseSLXPagerTemplate="True">
                                            <AlternatingRowStyle CssClass="rowdk" />
                                            <Columns>
                                                <asp:TemplateField HeaderText="Account" meta:resourcekey="fldAccount1" SortExpression="AccountName">
                                                    <ItemTemplate>
                                                        <asp:HyperLink ID="txtAccount" runat="server" meta:resourcekey="txtAccountResource1"></asp:HyperLink>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:HyperLinkField DataNavigateUrlFields="Id" DataNavigateUrlFormatString="../../SalesOrder.aspx?entityId={0}" DataTextField="SalesOrderNumber" HeaderText="Sales Order" meta:resourcekey="HyperLinkFieldResource3" SortExpression="SalesOrderNumber" />
                                                <asp:BoundField DataField="Status" HeaderText="Status" meta:resourcekey="bndStatus3" SortExpression="Status" />
                                                <asp:TemplateField HeaderText="Customer PO" meta:resourcekey="fldCustomerPo1" SortExpression="CustomerPurchaseOrderNumber">
                                                    <ItemTemplate>
                                                        <asp:Label ID="txtCustomerPurchaseOrderNumber" runat="server" meta:resourcekey="txtCustomerPurchaseOrderNumberResource1"></asp:Label>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                            </Columns>
                                            <PagerStyle CssClass="gridPager" />
                                            <RowStyle CssClass="rowlt" />
                                            <SelectedRowStyle CssClass="rowSelected" />
                                        </SalesLogix:SlxGridView>
                                    </div>
                                </telerik:RadPageView>
                                <telerik:RadPageView runat="server" ID="RadPageView6" meta:resourcekey="RadPageView6Resource1">
                                    <div class="ingredients qsf-ib" style="vertical-align: top;">
                                        <SalesLogix:SlxGridView runat="server" ID="grdActivities" GridLines="None" Width="598px" Height="100%" PageSize="8"
                                            AutoGenerateColumns="False" CellPadding="4" CssClass="datagrid" ShowEmptyTable="True" EnableViewState="False"
                                            ExpandableRows="False" ResizableColumns="False" DataKeyNames="Id" AllowPaging="True" OnPageIndexChanging="grdTickets_PageIndexChanging" OnRowCreated="grdActivities_RowCreated" AllowSorting="True" OnSorting="grdActivities_Sorting" CurrentSortDirection="Descending" CurrentSortExpression="" EmptyTableRowText="" meta:resourcekey="grdActivitiesResource1" ShowSortIcon="False" UseSLXPagerTemplate="True">
                                            <AlternatingRowStyle CssClass="rowdk" />
                                            <Columns>
                                                <asp:TemplateField HeaderText="Account" meta:resourcekey="fldAccount1" SortExpression="AccountName">
                                                    <ItemTemplate>
                                                        <asp:HyperLink ID="txtAccount" runat="server" meta:resourcekey="txtAccountResource1"></asp:HyperLink>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Type" meta:resourcekey="fldType1" SortExpression="Type">
                                                    <ItemTemplate>
                                                        <span id="txtType" runat="server"></span>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField SortExpression="StartDate" HeaderText="<%$ resources: bndDateTime1.HeaderText %>" >
                                                    <ItemTemplate>
                                                        <SalesLogix:DateTimePicker runat="server" ID="StartDate" DisplayTime="True" DisplayDate="True" DisplayMode="AsText"
                                                                                   DateOnly="False" DateTimeValue='<%# Eval("StartDate") %>' CssClass="hierarchydatelbl">
                                                        </SalesLogix:DateTimePicker>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Leader" meta:resourcekey="fldLeader1" SortExpression="Leader">
                                                    <ItemTemplate>
                                                        <asp:Label ID="txtLeader" runat="server" meta:resourcekey="txtLeaderResource1"></asp:Label>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:TemplateField HeaderText="Regarding" meta:resourcekey="fldRegarding1" SortExpression="Description">
                                                    <ItemTemplate>
                                                        <asp:Label ID="txtDescription" runat="server" meta:resourcekey="txtDescriptionResource1"></asp:Label>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                            </Columns>
                                            <PagerStyle CssClass="gridPager" />
                                            <RowStyle CssClass="rowlt" />
                                            <SelectedRowStyle CssClass="rowSelected" />
                                        </SalesLogix:SlxGridView>
                                    </div>
                                </telerik:RadPageView>
                            </telerik:RadMultiPage>
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td style="text-align: right;" colspan="3">
            <asp:Panel runat="server" ID="QFControlsList" CssClass="controlslist qfActionContainer">
                <asp:Button runat="server" ID="btnClose" Text="<%$ resources: btnClose.Caption %>" TabIndex="10" CssClass="slxbutton"  />
            </asp:Panel>
        </td>
    </tr>
</table>
<SalesLogix:SmartPartToolsContainer runat="server" ID="AccountHierarchy_RTools" ToolbarLocation="right">
<SalesLogix:PageLink ID="lnkAccountHierarchyHelp" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources: Portal, Help_ToolTip %>" Target="MCWebHelp" NavigateUrl="AccountHierarchy" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Help_16x16"></SalesLogix:PageLink>
</SalesLogix:SmartPartToolsContainer>
