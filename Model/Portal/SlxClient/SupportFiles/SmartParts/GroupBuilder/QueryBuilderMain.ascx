<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="QueryBuilderMain.ascx.cs" Inherits="Sage.SalesLogix.Client.GroupBuilder.QueryBuilderMain" %>
<%@ Register TagPrefix="SLX" TagName="QBAddCondition" Src="~/GroupBuilder/QBAddCondition.ascx" %>
<%@ Register TagPrefix="SLX" TagName="QBEditLayout" Src="~/GroupBuilder/QBEditLayout.ascx" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>

<script type="text/javascript">
    require([
            "dojo/ready",
            "dojo/string",
            "dijit/Tree",
            "dijit/Dialog",
            "dijit/layout/TabContainer",
            "dijit/layout/ContentPane",
            "dijit/layout/BorderContainer",
            "dojox/data/QueryReadStore",
            'Sage/UI/Controls/Grid',
            "dojo/data/ItemFileReadStore",
            "Sage/Groups/GroupContextService",
            "Sage/Data/WritableSDataStore",
            "dojo/dnd/Source",

            "Sage/UI/Controls/GridParts/Columns/DataType",
            "Sage/UI/Calendar",
            "Sage/Data/BaseSDataStore",
            "Sage/Store/SData",
            "dojox/mdnd/AreaManager",
            "dojox/mdnd/DropIndicator",
            "dojox/mdnd/dropMode/DefaultDropMode",
            "Sage/Data/SDataServiceRegistry",
            "Sage/Data/QBTreeStoreModel",
            "dojo/parser",
            "dojo/dnd/Target",
            "Sage/Utility/Filters"
    ], function (
            ready,
            dString,
            Tree,
            Dialog,
            TabContainer,
            ContentPane,
            BorderContainer,
            QueryReadStore,
            Grid,
            ItemFileReadStore,
            GroupContextService,
            WritableSDataStore,
            DnDSource,

            DataType,
            Calendar,
            BaseSDataStore,
            SDataObjectStore,
            AreaManager,
            DropIndicator,
            DefaultDropMode,
            SDataServiceRegistry,
            QBTreeStoreModel,
            parser,
            Target,
            FiltersUtil
            ) {

        ready(function () {
            dijit.byId("tabview").selectChild(dijit.byId("tabpage1"));
            dijit.byId("tabview").selectChild(dijit.byId("tabpage0"));
            dojo.subscribe("tabview-selectChild", function (child) {
                QueryBuilderMain.currentTab = parseInt(child.id[7], 10);
                QueryBuilderMain.setButtonState(QueryBuilderMain.currentTab);
            });

            var curTable = dojo.byId('<%= family.ClientID %>'),
                    nodeCounter = 0;
            curTable = curTable && curTable.value;
            var groupId = dojo.byId('<%= groupID.ClientID %>').value;
            // if this is a new group, it won't have an id. However, we want to copy
            //  the joins from the default group
                if (!groupId) {
                    var contextService = Sage.Services.getService("ClientGroupContext");
                    if (contextService) {
                        groupId = contextService.getContext().DefaultGroupID;
                    }
                }
                var treeStore = new Sage.Data.WritableSDataStore({
                    service: SDataServiceRegistry.getSDataService('system'),
                    count: 2000,
                    resourceKind: 'groups',
                    queryName: 'availableJoins',
                    queryArgs: { '_pathFilter': curTable },
                    resourcePredicate: "'" + groupId + "'"
                });

                var tree = new Tree({
                    model: new QBTreeStoreModel({
                        store: treeStore,
                        rootId: curTable,
                        rootLabel: curTable,
                        query: {}
                    }),
                    onClick: function (item, node) {
                        var tableName = (item.id || item.toTable).toUpperCase(),
                            grid;

                        grid = dijit.byId("fieldGrid"),
                                store = new SDataObjectStore({
                                    service: SDataServiceRegistry.getSDataService('metadata', false, true, false),
                                    resourceKind: 'entities',
                                    resourceProperty: 'properties',
                                    resourcePredicate: 'tableName eq "' + tableName + '"'
                                });
                        grid._grid.set('noDataMessage', noDataMessageHolder); // re-instate the default noDataMessage; to be displayed if table has no fields.
                        grid.setStore(store);
                    },
                    style: { width: "450px" },
                    persist: false,
                    _createTreeNode: function (/*Object*/args) {
                        args.id = "node_" + nodeCounter;
                        nodeCounter++;
                        args.label = args.item.label ? args.item.label : args.label;
                        return new dijit._TreeNode(args);
                    },
                    selectedDataPath: function () {
                        if (this.selectedNode.item.root) {
                            return this.selectedNode.item.id + ":";
                        }

                        return this.selectedNode.item.dataPath;
                    },
                    selectedDisplayPath: function () {
                        if (this.selectedNode.item.root) {
                            return this.selectedNode.item.id;
                        }

                        return this.selectedNode.item.displayPath;
                    }
                }, "divTableTree");

                tree.startup();

                function setupTreeToolTips() {
                    var nodes = dojo.query("img.dijitTreeExpando.dijitTreeExpandoOpened");
                    nodes.forEach(function (node) {
                        var text = '<asp:Localize ID="collapse" runat="server" Text="<%$ resources: Collapse %>" />';
                        dojo.attr(node, 'title', text);
                    });

                    nodes = dojo.query("img.dijitTreeExpando.dijitTreeExpandoClosed");
                    nodes.forEach(function (node) {
                        var text = '<asp:Localize ID="expand" runat="server" Text="<%$ resources: Expand %>" />';
                        dojo.attr(node, 'title', text);
                    });
                    }

            dojo.connect(tree, 'onLoad', null, setupTreeToolTips);
            dojo.connect(tree, 'onOpen', null, setupTreeToolTips);
            dojo.connect(tree, 'onClose', null, setupTreeToolTips);

            var grid = new Grid({
                id: "fieldGrid",
                selectionMode: 'single',
                columns: [
                    {
                        field: 'dataTypeId',
                        label: ' ',
                        width: '20px',
                        type: DataType,
                        sortable: false,
                        resizable: false
                    },
                    {
                        field: 'displayName',
                        label: '<asp:Localize ID="localizeColumn" runat="server" Text="<%$ resources: localizeColumn.Text %>" />',
                        width: '140px',
                        resizable: false
                    }],
                    minRowsPerPage: 25,
                    placeHolder: "divFieldList",
                    sort: [{ attribute: 'displayName' }],
                    columnResizing: true,
                    dnd: true
            });
            // save off the default no message data to be placed back after onClick.
            noDataMessageHolder = grid._grid.get('noDataMessage');
            grid._grid.set('noDataMessage', '<asp:Localize ID="PropertyListPopulationInstructions" runat="server" Mode="Encode" Text="<%$ resources: PropertyListPopulationInstructions%>" />');
            grid.refresh();

            grid.onRowDblClick = function (row) {
                var item = row.data;
                var tab = dijit.byId("tabview").selectedChildWidget.id;
                switch (tab) {
                    case 'tabpage0': break; //properties
                    case 'tabpage1': // Conditions
                        QueryBuilderMain.InsertCondition(tree.selectedDisplayPath(), tree.selectedDataPath(), item);
                        break;
                    case 'tabpage2': // Layout
                        QueryBuilderMain.InsertLayoutItem(tree.selectedDisplayPath(), tree.selectedDataPath(), item);
                        break;
                    case 'tabpage3': // Sorting
                        QueryBuilderMain.InsertSort(tree.selectedDisplayPath(), tree.selectedDataPath(), item);
                        break;
                    case 'tabpage4': break; // Defaults
                }
            };

            var layoutTarget = new Target("layoutTable", {
                accept: ["dgrid-row"],
                isSource: false,
                onDrop: function (source, nodes) {
                    nodes.forEach(function (node) {
                        console.log("Dropped " + source.getItem(node.id).data.name);

                        var tab = dijit.byId("tabview").selectedChildWidget.id;
                        if (tab !== 'tabpage2') {
                            return;
                        }

                        var node = nodes[0];
                        var item = source.getItem(node.id).data;
                        QueryBuilderMain.InsertLayoutItem(tree.selectedDisplayPath(), tree.selectedDataPath(), item);
                        DeleteDroppedNode();
                    });
                }
            });
            layoutTarget.startup();

            var conditionTarget = new Target("conditionTable", {
                accept: ["dgrid-row"],
                isSource: false,
                onDrop: function (source, nodes) {
                    nodes.forEach(function (node) {
                        console.log("Dropped " + source.getItem(node.id).data.name);

                        var tab = dijit.byId("tabview").selectedChildWidget.id;
                        if (tab !== 'tabpage1') {
                            return;
                        }

                        var node = nodes[0];
                        var item = source.getItem(node.id).data;
                        QueryBuilderMain.InsertCondition(tree.selectedDisplayPath(), tree.selectedDataPath(), item);
                        DeleteDroppedNode();
                    });
                }
            });
            conditionTarget.startup();

            var sortTarget = new Target("sortTable", {
                accept: ["dgrid-row"],
                isSource: false,
                onDrop: function (source, nodes) {
                    nodes.forEach(function (node) {
                        console.log("Dropped " + source.getItem(node.id).data.name);

                        var tab = dijit.byId("tabview").selectedChildWidget.id;
                        if (tab !== 'tabpage3') {
                            return;
                        }

                        var node = nodes[0];
                        var item = source.getItem(node.id).data;
                        QueryBuilderMain.InsertSort(tree.selectedDisplayPath(), tree.selectedDataPath(), item);
                        DeleteDroppedNode();
                    });
                }
            });
            sortTarget.startup();

            // TODO: Move the helper functions below somewhere else
            function DeleteDroppedNode() {
                var nodes = dojo.query(".dojoDndItem", "tabview");
                dojo.forEach(nodes, function (item) {
                    dojo.destroy(item);
                });
            }
        });
    });
</script>

<input type="hidden" name="groupID" id="groupID" runat="server" />
<input type="hidden" name="family" id="family" runat="server" />
<input type="hidden" name="groupType" id="groupType" runat="server" />
<input type="hidden" name="mainTable" id="mainTable" runat="server" />
<input type="hidden" name="isAdHoc" id="isAdHoc" value="false" />
<input type="hidden" name="loadMode" id="loadMode" value="" runat="server" />
<input type="hidden" name="sqlonly" id="sqlonly" value="" runat="server" />
<input type="hidden" name="groupSQL" id="groupSQL" />
<input type="hidden" name="groupXML" id="groupXML" />
<input type="hidden" name="groupNonce" id="groupNonce" runat="server" />
<div id="divGroupXML" runat="server" class="dispnone"></div>


<div id="upper" dojoType="dijit.layout.ContentPane">
<table class="tbodylt" cellspacing="0" cellpadding="0">
	<tr>
		<td>
			<table cellspacing="0" cellpadding="0">
				<tr>
					<td class="padding" vAlign="top" style="width: 450px">
						<div id="divTableTree" style="width: 450px">
						</div>
					</td>
					<td vAlign="top" style="width:230px">
						<div id="divFieldList" >
						</div>
					</td>
					<td class="padrt" vAlign="top">
						<table cellpadding="0" cellspacing="0" height="220px">
							<tr>
								<td valign="top">
									<asp:Button id="btnOK" class="W1" type="button" Text="<%$ resources: localizeOK.Text %>" style="margin-left:5px;" runat="server" OnClientClick="return QueryBuilderMain.ok_Click();" OnClick="btnOK_Click" /><br >
									<asp:Button id="btnCancel" class="W1" type="button" Text="<%$ resources: localizeCancel.Text %>" style="margin-left:5px;" runat="server" OnClientClick="QueryBuilderMain.cancel_Click()" OnClick="btnCancel_Click" /><br >
									<br >
									<input id="btnViewSQL" class="W1" onclick="QueryBuilderMain.viewSQL_Click()" type="button" value='<asp:Localize runat="server" Text="<%$ resources: localizeViewSQL.Text %>" />' style="margin-left:5px;"><br >
									<input id="btnCalc" class="W1" onclick="QueryBuilderMain.calculations_Click()" type="button" value="<%$ resources: localizeCalc.Text %>" runat="server" style="margin-left:5px;" /><br >
									<input id="btnJoins" class="W1" onclick="QueryBuilderMain.joins_Click()" type="button" value="<%$ resources: localizeGlobalJoins.Text %>" runat="server" style="margin-left:5px;" /><br >
								    <input id="Button1" class="W1" onclick="QueryBuilderMain.createLocalJoin()" type="button" value="<%$ resources: localizeCreateLocalJoin.Text %>" runat="server" style="margin-left:5px;" /><br />
                                </td>
							</tr>
							<tr>
								<td vAlign="bottom">
									<%--<a href="#" id="hiddenFieldSwitch" class="dispnone"><asp:Localize ID="Localize1" runat="server" Text="<%$ resources: localizeHideHiddenFields.Text %>" /></a>--%>
								</td>
							</tr>
						</table>									
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</div>
<div id="tabview" dojoType="dijit.layout.TabContainer" style="width:100%; height:330px; margin-top:8px;" nested="false">
    <div id="tabpage0" dojoType="dijit.layout.ContentPane" title='<asp:Localize runat="server" Text="<%$ resources: localizeProperties.Text %>"></asp:Localize>'> <!-- Properties  -->
        <SalesLogix:PageLink ID="HelpQBProperties" runat="server" CssClass="QBHelpIcon" LinkType="HelpFileName" ToolTip="<%$ resources: localizeHelp.Text %>" Target="Help" NavigateUrl="querybuilderproperties.aspx" ImageUrl="~/images/icons/Help_16x16.png"></SalesLogix:PageLink>
        <table>
		    <tr>
			    <td class="alignright"><asp:Localize ID="localizeName" runat="server" Text="<%$ resources: localizeName.Text %>" /></td>
			    <td><input id="txtGrpName" class="W2" type="text" maxlength="24" /></td>
		    </tr>
		    <tr>
			    <td  class="alignright"><asp:Localize ID="localizeDisplayName" runat="server" Text="<%$ resources: localizeDisplayName.Text %>" /></td>
			    <td><input id="txtDisplayName" class="W2" type="text" maxlength="128"  /></td>
		    </tr>
		    <tr>
			    <td class="alignright" valign="top"><asp:Localize ID="localizeDescription" runat="server" Text="<%$ resources: localizeDescription.Text %>" /></td>
			    <td><textarea id="txtGrpDescription" class="W2" rows="14" onkeypress="limitLength(128);event.cancelBubble=true;" onblur="limitLength(128)"></textarea></td>
		    </tr>
	    </table>
    </div>
    <div id="tabpage1" dojoType="dijit.layout.ContentPane" title='<asp:Localize runat="server" Text="<%$ resources: localizeConditions.Text %>"></asp:Localize>'> <!-- Conditions  -->
	    <SalesLogix:PageLink ID="HelpQBConditions" runat="server" CssClass="QBHelpIcon" LinkType="HelpFileName" ToolTip="<%$ resources: localizeHelp.Text %>" Target="Help" NavigateUrl="querybuilderconditions.aspx" ImageUrl="~/images/icons/Help_16x16.png"></SalesLogix:PageLink>
        <table id="conditionTable">
		    <tr>
			    <td colspan="2">
				    <div class="W2"><asp:Localize ID="localizeConditionInstructions" runat="server" Text="<%$ resources: localizeConditionInstructions.Text %>" /></div>
			    </td>
		    </tr>
		    <tr>
			    <td><img height="200" src="images/clear.gif" width="1"></td>
			    <td valign="top" >
				    <table id="grdConditions">
					    <tr>
						    <th><asp:Localize ID="localizeNot" runat="server" Text="<%$ resources: localizeNot.Text %>" /></th>
						    <th>(</th>
						    <th><asp:Localize ID="localizeField" runat="server" Text="<%$ resources: localizeField.Text %>" /></th>
						    <th><asp:Localize ID="localizeOperator" runat="server" Text="<%$ resources: localizeOperator.Text %>" /></th>
						    <th><asp:Localize ID="localizeValue" runat="server" Text="<%$ resources: localizeValue.Text %>" /></th>
						    <th><asp:Localize ID="localizeCaseSens" runat="server" Text="<%$ resources: localizeCaseSens.Text %>" /></th>
						    <th>)</th>
						    <th><asp:Localize ID="localizeAndOr" runat="server" Text="<%$ resources: localizeAndOr.Text %>" /></th>
					    </tr>
				    </table>
			    </td>
		    </tr>
	    </table>
    </div>
    <div id="tabpage2" dojoType="dijit.layout.ContentPane" title='<asp:Localize runat="server" Text="<%$ resources: localizeLayout.Text %>"></asp:Localize>'> <!-- Layout  -->
        <SalesLogix:PageLink ID="HelpQBLayout" runat="server" CssClass="QBHelpIcon" LinkType="HelpFileName" ToolTip="<%$ resources: localizeHelp.Text %>" Target="Help" NavigateUrl="querybuilderlayout.aspx" ImageUrl="~/images/icons/Help_16x16.png"></SalesLogix:PageLink>
        <table id="layoutTable">
		    <tr>
			    <td colSpan="2" >
				    <div class="W2"><asp:Localize ID="localizeLayoutInstructions" runat="server" Text="<%$ resources: localizeLayoutInstructions.Text %>" /></div>
			    </td>
		    </tr>
		    <tr>
			    <td width="1"><img height="200" src="images/clear.gif" width="1"></td>
			    <td vAlign="top" id="layoutContainer">
				    <table id="grdLayout" cellSpacing="0" cellPadding="0">
					    <tr>
					    </tr>
				    </table>
			    </td>
		    </tr>
	    </table>
    </div>
    <div id="tabpage3" dojoType="dijit.layout.ContentPane" title='<asp:Localize runat="server" Text="<%$ resources: localizeSorting.Text %>"></asp:Localize>'> <!-- Sorting  -->
	    <SalesLogix:PageLink ID="HelpQBSorting" runat="server" CssClass="QBHelpIcon" LinkType="HelpFileName" ToolTip="<%$ resources: localizeHelp.Text %>" Target="Help" NavigateUrl="querybuildersorting.aspx" ImageUrl="~/images/icons/Help_16x16.png"></SalesLogix:PageLink>
        <table cellSpacing="0" cellPadding="2" id="sortTable">
		    <tr>
			    <td colSpan="2">
				    <div class="W2"><asp:Localize ID="localizeSortInstructions" runat="server" Text="<%$ resources: localizeSortInstructions.Text %>" /></div>
			    </td>
		    </tr>
		    <tr>
			    <td width="1"><img height="200" src="images/clear.gif" width="1"></td>
			    <td vAlign="top">
				    <table id="grdSorts">
					    <tr>
						    <th><asp:Localize ID="localizeGrdSortsOrder" runat="server" Text="<%$ resources: localizeGrdSortsOrder.Text %>" /></th>
						    <th><asp:Localize ID="localizeGrdSortsSortBy" runat="server" Text="<%$ resources: localizeGrdSortsSortBy.Text %>" /></th>
						    <th><asp:Localize ID="localizeGrdSortsDirection" runat="server" Text="<%$ resources: localizeGrdSortsDirection.Text %>" /></th>
					    </tr>
				    </table>
			    </td>
		    </tr>
	    </table>
    </div>
    <div id="tabpage4" dojoType="dijit.layout.ContentPane" title='<asp:Localize runat="server" Text="<%$ resources: localizeDefaults.Text %>"></asp:Localize>'> <!-- Defaults  -->
	    <SalesLogix:PageLink ID="HelpQBDefaults" runat="server" CssClass="QBHelpIcon" LinkType="HelpFileName" ToolTip="<%$ resources: localizeHelp.Text %>" Target="Help" NavigateUrl="querybuilderdefaults.aspx" ImageUrl="~/images/icons/Help_16x16.png"></SalesLogix:PageLink>
        <table cellSpacing="0" cellPadding="2" width="500">
		    <tr>
			    <td><img id="tabpage4blank" runat="server" height="200" src="images/clear.gif" width="1"></td>
			    <td vAlign="top" align="left">
				    <input id="chkUseDistinct" type="checkbox" name="chkUseDistinct"> <label accessKey="D" for="chkUseDistinct">
					    <asp:Localize ID="localizeReturnDistinct" runat="server" Text="<%$ resources: localizeReturnDistinct.Text %>" /></label>
			    </td>
		    </tr>
	    </table>
    </div>
</div>
<div id="buttonDiv">
	<input id="btnEdit" onclick="QueryBuilderMain.edit_Click(event)" type="button" value='<asp:Localize  runat="server" Text="<%$ resources: localizeEdit.Text %>" />'  style="min-width:85px"/>
	<input id="btnDel"  onclick="QueryBuilderMain.delete_Click()" type="button" value='<asp:Localize  runat="server" Text="<%$ resources: localizeDelete.Text %>" />' style="min-width:85px"/>
	<input id="btnMoveUp"  onclick="QueryBuilderMain.moveup_Click()" type="button" value='<asp:Localize  runat="server" Text="<%$ resources: localizeMoveUp.Text %>" />' style="min-width:85px"/>
	<input id="btnMoveDn"  onclick="QueryBuilderMain.movedown_Click()" type="button" value='<asp:Localize  runat="server" Text="<%$ resources: localizeMoveDown.Text %>" />' style="min-width:85px"/>
</div>
		
<!-- private user controls -->
<div style="display:none">
<div id="dlgAddCondition" dojoType="dijit.Dialog" title="<asp:Localize ID="localizeAssignCondition" runat="server" Text="<%$ resources: localizeAssignCondition.Text %>" />" >
        <div id="AddConditionHelpIcon" style="position:absolute; top:-23px; right:30px;">
            <SalesLogix:PageLink ID="HelpAssignCondition" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources: localizeHelp.Text %>" Target="Help" NavigateUrl="queryassigncondition.aspx" ImageUrl="~/images/icons/Help_16x16.png">
            </SalesLogix:PageLink>
        </div> 
    <div class="bd" >
        <SLX:QBAddCondition ID="ucQBAddCondition" runat="server"  />
    </div> 
    <div class="ft"></div> 
</div>
<div id="dlgEditLayout" dojoType="dijit.Dialog" title="<asp:Localize ID="localizeAssignQueryLayout" runat="server" Text="<%$ resources: localizeAssignQueryLayout.Text %>" />" >
    <div id="AssignQueryHelpIcon" style="position:absolute; top:-23px; right:30px;">
    <SalesLogix:PageLink ID="HelpAssignQueryLayout" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources: localizeHelp.Text %>" Target="Help" NavigateUrl="queryassignlayout.aspx" ImageUrl="~/images/icons/Help_16x16.png"></SalesLogix:PageLink>
    </div>
      
    
    <div class="bd" >
        <SLX:QBEditLayout ID="ucQBEditLayout" runat="server"  />
    </div> 
    <div class="ft"></div> 
</div>
</div>

<script src="jscript/Sage/GroupBuilder/querybuilder.js" type="text/javascript"></script>
<script src="jscript/Sage/GroupBuilder/mainlib.js" type="text/javascript"></script>
<script src="jscript/Sage/GroupBuilder/QBAddCondition.js" type="text/javascript"></script>
<script src="jscript/Sage/GroupBuilder/QueryBuilderMain.js" type="text/javascript"></script>