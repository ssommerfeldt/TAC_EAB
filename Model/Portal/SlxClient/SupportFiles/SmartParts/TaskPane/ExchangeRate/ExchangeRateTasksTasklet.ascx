<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ExchangeRateTasksTasklet.ascx.cs" Inherits="SmartParts_TaskPane_ExchangeRateTasks_ExchangeRateTasksTasklet" EnableViewState="true" ViewStateMode="Enabled" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.Lookup" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.ScriptResourceProvider" TagPrefix="SalesLogix" %>

<asp:HiddenField ID="hfSelections" runat="server" Value="" ClientIDMode="Predictable" />
<asp:UpdatePanel UpdateMode="Conditional" runat="server" ID="exRateUpdatePanel">
    <ContentTemplate>
        
        <ul id="<%= ClientID %>" class="task-pane-item-common-tasklist">
            <asp:Repeater runat="server" ID="items" onitemdatabound="items_ItemDataBound"  
                          onitemcommand="items_ItemCommand" >
                <HeaderTemplate>
                    <asp:Literal ID="headerLine" runat="server" Text="<hr />"></asp:Literal>
                </HeaderTemplate>
                <ItemTemplate>  
                    <li class="task-pane-item-common-tasklist task-pane-item-common-taskitem">
                        <asp:LinkButton runat="server" ID="Action" meta:resourcekey="ActionResource1" CausesValidation="False"></asp:LinkButton>
                    </li>
                </ItemTemplate>
            </asp:Repeater>
        </ul>
        <div data-dojo-type="Sage.TaskPane.ExchangeRateTasksTasklet" id="exchangeRateTasks"></div>
        <script type="text/javascript">
    var exchangeRateTasksActions;
    require(['Sage/TaskPane/ExchangeRateTasksTasklet', 'dojo/ready'],
        function (ExchangeRateTasksTasklet, ready) {
            ready(function () {
                if (!exchangeRateTasksActions) {
                    exchangeRateTasksActions = new ExchangeRateTasksTasklet({
                        id: "exchangeRateTasksActions",
                        clientId: "<%= ClientID %>"
                    });
                }
            });
        }
    );
</script>
    </ContentTemplate>
</asp:UpdatePanel>
