<%@ Control Language="C#" Debug="true" AutoEventWireup="true" CodeFile="AccountDistanceSearch.ascx.cs"  Inherits="SmartParts_ProximitySearch_AccountDistanceSearch" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.PickList"    TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls"    TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.DependencyLookup"    TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.Lookup"    TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.HighLevelTypes" Namespace="Sage.SalesLogix.HighLevelTypes"    TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.Platform.WebPortal" Namespace="Sage.Platform.WebPortal.SmartParts"    TagPrefix="SalesLogix" %>

<div style="display:none">
	<SalesLogix:SmartPartToolsContainer ID="AccountDistanceSearch_RTools" runat="server">
	    <SalesLogix:PageLink ID="lnkAccountDistanceSearchHelp" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources: Portal, Help_ToolTip %>" Target="Help"
	        NavigateUrl="accountdistancesearch" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Help_16x16">
	    </SalesLogix:PageLink>
	</SalesLogix:SmartPartToolsContainer> 
</div>

<style type="text/css">
    .schedulebtn 
    {
        cursor: pointer;
    }
</style>
<script type="text/javascript">
    function scheduleActivity(activityType, entityId, entityDescription) {
        var cec = Sage.Services.getService('ClientEntityContext');
        cec.setTemporaryContext({ EntityType: "Sage.Entity.Interfaces.IAccount", EntityId: entityId, Description: entityDescription })
        Link.schedule(activityType);
    }
    function promptForGroupName(e) {
        Sage.UI.Dialogs.raiseInputDialog(
            '<%=GetLocalResourceObject("InputDialog_Title").ToString()%>',
            '<%=GetLocalResourceObject("InputDialog_Query").ToString()%>',
            groupNameCallback,
            '<%=GetLocalResourceObject("InputDialog_YesText").ToString()%>',
            '<%=GetLocalResourceObject("InputDialog_NoText").ToString()%>',
            document.getElementById("<%=createGroupName.ClientID%>").value
            );
        // prevent the postback from firing here
        return false;
    }
    function groupNameCallback (ok, text) {        
        var hf = document.getElementById("<%=createGroupName.ClientID%>");
        if (ok) {
            if (text) {
                hf.value = text;
                // Fire the postback here
                __doPostBack('<%= btnCreateGroup.UniqueID %>', '');
            } else {                
                hf.value = "";
                alert('<%=GetLocalResourceObject("Error_NoGroupName").ToString()%>');
            }     
        } else {
            // Clear the text
            hf.value = "";
        }
    }
</script>

<table border="0" cellpadding="1" cellspacing="0" class="formtable">
    <col width="30%" />
    <col width="30%" />
    <col width="30%" />
    <col width="10%" />
    <tr>
        <td>
            <div class=" lbl alignleft">
                <asp:Label ID="cbxDistance_lbl" AssociatedControlID="cbxDistance" runat="server"
                    Text="<%$ resources: cbxDistance.Caption %>"></asp:Label>
            </div>
            <div class="textcontrol select">
                <asp:ListBox runat="server" ID="cbxDistance" SelectionMode="Single" Rows="1"></asp:ListBox>
            </div>
        </td>
        <td>
            <div class=" lbl alignleft">
                <asp:Label ID="cbxLocation_lbl" AssociatedControlID="cbxLocation" runat="server"
                    Text="<%$ resources:cbxLocation.Caption %>"></asp:Label>
            </div>
            <div class="textcontrol select">
                <asp:ListBox runat="server" ID="cbxLocation" OnTextChanged="cbxLocation_ChangeAction" SelectionMode="Single" Rows="1" EnableViewState="True" AutoPostBack="true"></asp:ListBox>
            </div>
        </td>
        <td>
            <div class=" lbl alignleft">
                <asp:Label ID="pklType_lbl" AssociatedControlID="pklType" runat="server" Text="<%$ resources: pklType.Caption %>"></asp:Label>
            </div>
            <div class="textcontrol picklist">
                <SalesLogix:PickListControl runat="server" OnPickListValueChanged="pklType_ChangeAction" ID="pklType" PickListID="$qfcontrol.PickListId" MustExistInList="false" AutoPostBack="true"  />
           </div>
        </td>
        <td>
            <asp:Button runat="server" ID="btnSearch" OnClick="btnSearch_OnClick" Text="<%$ resources: btnSearch.Caption %>" Width="150" />
        </td>
    </tr>
    <tr>
        <td>
            <div class=" lbl alignleft">
                <asp:Label ID="cbxNumResults_lbl" AssociatedControlID="cbxNumResults" runat="server"
                    Text="<%$ resources: cbxNumResults.Caption %>"></asp:Label>
            </div>
            <div class="textcontrol select">
                <asp:ListBox runat="server" ID="cbxNumResults" SelectionMode="Single" Rows="1"></asp:ListBox>
            </div>
        </td>
        <td>
            <div class=" lbl alignleft">
                <asp:Label ID="txtCustom_lbl" AssociatedControlID="txtCustom" runat="server" Text="&nbsp;"></asp:Label>
            </div>
            <div class="textcontrol select">
                <asp:TextBox runat="server" ID="txtCustom" />
            </div>
        </td>
        <td>
            <div class=" lbl alignleft">
                <asp:Label ID="pklSubType_lbl" AssociatedControlID="pklSubType" runat="server" Text="<%$ resources: pklSubType.Caption %>"></asp:Label>
            </div>
            <div class="textcontrol picklist">
                <SalesLogix:PickListControl runat="server" ID="pklSubType" PickListID="kSYST0000382" MustExistInList="false" />
            </div>
        </td>
        <td>
            <asp:HiddenField runat="server" ID="createGroupName" Value="" />
            <asp:Button runat="server" ID="btnCreateGroup" OnClientClick="return promptForGroupName();" OnClick="btnCreateGroup_OnClick" Text="<%$ resources: btnCreateGroup.Caption %>" Width="150" />
        </td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td  >
 <asp:Button runat="server" ID="btnDisplayMap" OnClick="btnDisplayMap_OnClick" Text="<%$ resources: btnDisplayMap.Caption %>" Width="150" />
 
      </td>
      </tr>
         
</table>      
<hr />
<SalesLogix:SlxGridView runat="Server" ID="dgPostalCodeResults" GridLines="None"
    AutoGenerateColumns="false" CellPadding="4" CssClass="datagrid" PagerStyle-CssClass="gridPager"
    AlternatingRowStyle-CssClass="rowdk" RowStyle-CssClass="rowlt" SelectedRowStyle-CssClass="rowSelected"
    ShowEmptyTable="true" EnableViewState="false" AllowPaging="true" PageSize="25" ExpandableRows="True" ResizableColumns="True"
    EmptyTableRowText="No results to display" AllowSorting="true" CurrentSortExpression="Distance" OnSorting="PostalCodeResults_Sorting"
    OnRowDataBound="PostalCodeResults_RowDataBound" OnPageIndexChanging="PostalCodeResults_PageIndexChanging" OnDataBound="dgPostalCodeResults_DataBound" >
    <Columns>
        <asp:BoundField DataField="Distance" HeaderText="Distance" SortExpression="Distance" />
        
        <asp:TemplateField HeaderText = "Account" SortExpression="AccountName">
            <itemTemplate>
                <SalesLogix:PageLink runat="server" NavigateUrl="Account" ID="AcctName" EntityId='<%# Eval("AccountId") %>'  Text='<%# Eval("AccountName") %>' LinkType="EntityAlias"></SalesLogix:PageLink>
            </itemTemplate>
        </asp:TemplateField> 
        
        <asp:TemplateField HeaderText="Schedule" ItemStyle-Width="65" HeaderStyle-Width="65" ItemStyle-HorizontalAlign="Center">
          <itemTemplate> 
              <img title="Schedule Meeting" onclick='<%# GetScheduleLink("Meeting", (string)Eval("AccountId"), (string)Eval("AccountName")) %>' 
                src="images/icons/Schedule_Meeting_16x16.gif" class="schedulebtn" />
              <img title="Schedule Phone Call" onclick='<%# GetScheduleLink("PhoneCall", (string)Eval("AccountId"), (string)Eval("AccountName")) %>' 
                src="images/icons/Schedule_Call_16x16.gif"  class="schedulebtn"/>
              <img title="Schedule To Do" onclick='<%# GetScheduleLink("ToDo", (string)Eval("AccountId"), (string)Eval("AccountName")) %>'
                src="images/icons/Schdedule_To_Do_16x16.gif"  class="schedulebtn"/>
          </itemTemplate>
        </asp:TemplateField>

        <asp:BoundField DataField="Address1" SortExpression="Address1" HeaderText="Address" />        
        <asp:BoundField DataField="City" HeaderText="City" SortExpression="City" />
        <asp:BoundField DataField="State" HeaderText="State" SortExpression="State" />
        <asp:BoundField DataField="PostalCode" HeaderText="Zip Code" SortExpression="PostalCode" />

        
        <asp:TemplateField HeaderText = "Main Phone" SortExpression="MainPhone">
            <itemtemplate>
                <SalesLogix:Phone runat="server" ID="grdAccountContactscol3" DisplayAsLabel="True" Text='<%#Eval("MainPhone") %>' />
            </itemtemplate>
        </asp:TemplateField>
        
        <asp:BoundField DataField="Type" HeaderText="Type" SortExpression="Type"></asp:BoundField>
        <asp:BoundField DataField="SubType" HeaderText="SubType" SortExpression="SubType"></asp:BoundField>
        <asp:BoundField DataField="Status" HeaderText="Status" SortExpression="Status"></asp:BoundField>
    </Columns>
</SalesLogix:SlxGridView>
 