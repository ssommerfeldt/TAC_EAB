<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PeriodTasksTasklet.ascx.cs" Inherits="SmartParts_TaskPane_PeriodTasks_PeriodTasksTasklet" EnableViewState="true" ViewStateMode="Enabled" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.Lookup" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.ScriptResourceProvider" TagPrefix="SalesLogix" %>

<asp:HiddenField ID="hfSelections" runat="server" Value="" ClientIDMode="Predictable" />
<asp:UpdatePanel UpdateMode="Conditional" runat="server" ID="periodUpdatePanel">
    <ContentTemplate>
        
        <ul id="<%= ClientID %>" class="task-pane-item-common-tasklist">
            <asp:Repeater runat="server" ID="items" onitemdatabound="items_ItemDataBound"  
                          onitemcommand="items_ItemCommand" >
                <HeaderTemplate>
                    <asp:Literal ID="headerLine" runat="server" Text="<hr />"></asp:Literal>
                </HeaderTemplate>
                <ItemTemplate>  
                    <li class="task-pane-item-common-tasklist task-pane-item-common-taskitem">
                        <asp:LinkButton runat="server" ID="PeriodAction" meta:resourcekey="ActionResource1" CausesValidation="False"></asp:LinkButton>
                    </li>
                </ItemTemplate>
            </asp:Repeater>
        </ul>
        <div data-dojo-type="Sage.TaskPane.PeriodTasksTasklet" id="periodTasks"></div>
        <script type="text/javascript">
            var periodTasksActions;
            require(['Sage/TaskPane/PeriodTasksTasklet'],
                function (PeriodTasksTasklet) {
                    dojo.ready(function () {
                        if (!periodTasksActions) {
                            periodTasksActions = new PeriodTasksTasklet({
                                id: "periodTasksActions",
                                clientId: "<%= ClientID %>"
                            });
                        }
                    });
                }
            );
        </script>
    </ContentTemplate>
</asp:UpdatePanel>



<script type="text/javascript">
   
</script>