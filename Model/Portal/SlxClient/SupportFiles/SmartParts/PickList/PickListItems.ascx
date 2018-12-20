<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PickListItems.ascx.cs" Inherits="SmartPart_PickListItems" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>

<div style="display:none">
    <asp:Panel ID="Items_LTools" runat="server"></asp:Panel>
    <asp:Panel ID="Items_CTools" runat="server"></asp:Panel>
    <asp:Panel ID="Items_RTools" runat="server">
        <asp:Listbox runat="server" ID="cboViewedLanguage" ToolTip="Change Language Shown" meta:resourcekey="cboViewedLanguage" SelectionMode="Single" Rows="1" EnableViewState="true" AutoPostBack="true"  class="dijitselect dropdown"/>
        <asp:ImageButton runat="server" ID="btnAdd" ToolTip="Add Items" meta:resourcekey="btnAdd" ImageUrl="~\images\icons\plus_16X16.gif"  />
        <SalesLogix:PageLink ID="lnkPicklistItemsHelp" runat="server" LinkType="HelpFileName"  ToolTip="<%$ resources: Portal, Help_ToolTip %>" Target="Help"
            NavigateUrl="Pick_List_Items_Tab" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Help_16x16">
        </SalesLogix:PageLink>
    </asp:Panel>
    <asp:HiddenField ID="ConfirmMessage" runat="server" meta:resourcekey="ConfirmMessage"/>
</div>
<SalesLogix:SlxGridView runat="server" ID="grdPicklistItems" GridLines="None" AutoGenerateColumns="False" CellPadding="4" CssClass="datagrid" AlternatingRowStyle-CssClass="rowdk" 
    RowStyle-CssClass="rowlt" ShowEmptyTable="True" EmptyTableRowText="<%$ resources: grdPicklistItems.EmptyTableRowText %>" AllowSorting="True" PageSize="15"
    OnRowDataBound="grdPicklistItems_RowDataBound" OnRowCommand="grdPicklistItems_RowCommand" OnRowEditing="grdPicklistItems_RowEditing" AllowPaging="true"
    OnRowDeleting="grdPicklistItems_RowDeleting" OnSorting="grdPicklistItems_Sorting" DataKeyNames="PickListItemId, PickListId"
    RowSelect="True" SortAscImageUrl="" SortDescImageUrl="">
    <Columns>
        <asp:TemplateField ShowHeader="false" Visible="false">
            <ItemTemplate>
                <asp:TextBox Visible="false" value=<%#(Eval("PickListItemId"))%>'></asp:TextBox>  
			</ItemTemplate>
          <ItemStyle Width="0px" />
        </asp:TemplateField>
        <asp:BoundField DataField="OrderSeq" HeaderText="Order" SortExpression="OrderSeq" meta:resourcekey="grd_Order" />
        <asp:BoundField DataField="Text" HeaderText="Text" SortExpression="Text" meta:resourcekey="grd_Text" />
        <asp:BoundField DataField="Code" HeaderText="Code" SortExpression="Code" meta:resourcekey="grd_Code"  />
		 <asp:BoundField DataField="Filter" HeaderText="Filter" SortExpression="Filter" meta:resourcekey="grd_Filter"  />
		 <asp:BoundField DataField="LanguageCode" HeaderText="Language" SortExpression="LanguageCode" meta:resourcekey="grd_Language"  />
        <asp:TemplateField HeaderText="Is Default" meta:resourcekey="grd_Default">
            <ItemTemplate>
                <asp:CheckBox id="chkDefault" runat="server" EnableTheming="true" enabled="false" checked='<%# IsDefault(Eval("PickListItemId"))%>'></asp:CheckBox>  
            </ItemTemplate>
        </asp:TemplateField>
        <asp:ButtonField CommandName="EDIT" Text="Edit" meta:resourcekey="grd_Edit" />
        <asp:ButtonField CommandName="DELETE" Text="Delete" meta:resourcekey="grd_Delete" />
        <asp:TemplateField ShowHeader="false" >
            <ItemTemplate>
                <asp:LinkButton runat="server" Text="Localize"  meta:resourcekey="grd_Localize" CommandName="LOCALIZE" CommandArgument='<%# Eval("PickListId") + ";" + Eval("PickListItemId") %>' Visible='<%# ShowLocalize(Eval("LanguageCode")) %>' />
            </ItemTemplate>
        </asp:TemplateField>
    </Columns>
    <RowStyle CssClass="rowlt" />
    <AlternatingRowStyle CssClass="rowdk" />
</SalesLogix:SlxGridView>
<asp:LinkButton ID="btnForceItemRefresh" CommandName="ForceReload" runat="server" OnClick="cboViewedLanguage_SelectedIndexChanged" Visible="true"/>
<asp:HiddenField  runat="server" ID="NextPickListId"></asp:HiddenField>
<script type="text/javascript">
    require(['dojo/topic', 'dojo/aspect', 'dojo/ready'],
        function (topic, aspect, ready) {
            ready(function () {
                var loadAroundPostBack = function (arg) {
                    var button = dojo.byId("<%= btnForceItemRefresh.ClientID %>");
                    var placeHolder = dojo.byId("<%= NextPickListId.ClientID %>");
                    if (typeof (button) === 'object' && typeof (button.click) === 'function') {
                        /* 
                         * since this version of loadAroundPostBack should only be called by PickListDetail's pub call,
                         * the logic outside set placeHolder.value to arg.toEntityId is probably not needed. 
                         * However, leaving it in just in case.
                         */
                        if (arg && arg.toEntityId) {
                            placeHolder.value = arg.toEntityId;
                        } else {
                            var selectGroup = $('#GroupList_node div.dojoxGridRowSelected td');
                            if (selectGroup && selectGroup[1] && selectGroup[1].innerText) {
                                placeHolder.value = selectGroup[1].innerText;
                            } else {
                                console.warn('cannot find new picklist header id.');
                            }
                        } 
                        button.click();
                    }
                };
                topic.subscribe('/group/context/changed/picklistview', loadAroundPostBack);
            });
        });
</script>