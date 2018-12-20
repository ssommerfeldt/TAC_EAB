using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using NHibernate;
using Sage.Entity.Interfaces;
using Sage.Platform;
using Sage.Platform.Application;
using Sage.Platform.Application.UI;
using Sage.Platform.Diagnostics;
using Sage.Platform.Orm;
using Sage.Platform.Security;
using TimeZone = Sage.Platform.TimeZone;
using Sage.Platform.WebPortal;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.BusinessRules;
using Sage.SalesLogix.Client.GroupBuilder;
using Sage.SalesLogix.PickLists;
using Sage.SalesLogix.SelectionService;
using Sage.SalesLogix.Web.Controls;
using Sage.SalesLogix.Web.SelectionService;
using log4net;
using Sage.SalesLogix.Address;

public partial class SmartParts_TaskPane_CommonTasks_CommonTasksTasklet : UserControl, ISmartPartInfoProvider
{
    private static readonly ILog log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
	private static readonly string CurrencyGroupName = "All Currencies";
    #region Initialize Items

    [ServiceDependency]
    public IRoleSecurityService RoleSecurityService { get; set; }

    /// <summary>
    /// Gets or sets the dialog service.
    /// </summary>
    /// <value>The dialog service.</value>
    [ServiceDependency]
    public IWebDialogService DialogService { get; set; }

    /// <summary>
    /// Gets or sets the entity service.
    /// </summary>
    /// <value>The entity service.</value>
    [ServiceDependency]
    public IEntityContextService EntityService { get; set; }

    private LinkHandler _LinkHandler;
    private LinkHandler Link
    {
        get
        {
            if (_LinkHandler == null)
                _LinkHandler = new LinkHandler(Page);
            return _LinkHandler;
        }
    }

    bool _currentIsAdHoc;
    bool _contextHasAdHoc;

    /// <summary>
    ///
    /// </summary>
    public class TaskItem
    {
        private string _id;
        private string _name;
        private string _action;
        private string _postbackFull;

        public TaskItem(string id, string name, string action, string postbackFull)
        {
            Id = id;
            Name = name;
            Action = action;
            PostbackFull = postbackFull;
        }

        /// <summary>
        /// Gets or sets the id.
        /// </summary>
        /// <value>The id.</value>
        public string Id
        {
            get { return _id; }
            set { _id = value; }
        }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>The name.</value>
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        /// <summary>
        /// Gets or sets the action.
        /// </summary>
        /// <value>The action.</value>
        public string Action
        {
            get { return _action; }
            set { _action = value; }
        }

        /// <summary>
        /// Gets or sets the postback full.
        /// </summary>
        /// <value>The postback full.</value>
        public string PostbackFull
        {
            get { return _postbackFull; }
            set { _postbackFull = value; }
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="TaskItem"/> class.
        /// </summary>
        public TaskItem()
        {
        }
    }

    #endregion

    #region Define Dictionaries

    private IDictionary<string, Array> _tasksByEntity;
    private IDictionary<string, Array> tasksByEntity
    {
        get
        {
            if (_tasksByEntity == null)
            {
                _tasksByEntity = new Dictionary<string, Array>();
            }
            return _tasksByEntity;
        }
        set { _tasksByEntity = value; }
    }

    private IDictionary<string, Array> _tasksByEntityList;
    private IDictionary<string, Array> tasksByEntityList
    {
        get
        {
            if (_tasksByEntityList == null)
            {
                _tasksByEntityList = new Dictionary<string, Array>();
            }
            return _tasksByEntityList;
        }
        set { _tasksByEntityList = value; }
    }

    private IDictionary<string, string> _tasksSecurityMap;
    private IDictionary<string, string> tasksSecurityMap
    {
        get
        {
            if (_tasksSecurityMap == null)
            {
                _tasksSecurityMap = GetTaskSecurityMap();
            }
            return _tasksSecurityMap;
        }
        set { _tasksSecurityMap = value; }
    }

    #endregion

    /// <summary>
    /// Handles the Load event of the Page control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void Page_Load(object sender, EventArgs e)
    {
        tskExportToExcel.Command += tskExportToExcel_Command;
        ScriptManager.GetCurrent(Page).RegisterPostBackControl(FindControl("tskExportToExcel"));
    }

    void tskExportToExcel_Command(object sender, CommandEventArgs e)
    {
        ExportToFile();
    }

    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);

        EntityPage entityPage = Page as EntityPage;

        if (Page != null)
        {
            string entityType = EntityService.EntityType.Name;
            string displayMode = entityPage.ModeId;

            // If the current group is an AdHoc group, then we need to display further AdHoc options.  We use GroupContext to determine this.
            DetermineAdHocStatus();

            List<TaskItem> tasks = new List<TaskItem>();
            if (displayMode == "Detail")
            {
                FillDetailPageDictionaries();
                tasks = CreateDetailViewTasks(entityType);
            }
            else
            {
                FillListViewDictionaries();
                tasks = CreateListViewTasks(entityType);
            }

            items.DataSource = tasks;
            items.DataBind();

            selectionText.Text = GetLocalResourceObject("SelectionText_DisplayCaption").ToString();
            clearText.Text = GetLocalResourceObject("ClearText_DisplayCaption").ToString();
            SAG.Update();
        }
    }

    /// <summary>
    /// Gets the smart part info.
    /// </summary>
    /// <param name="smartPartInfoType">Type of the smart part info.</param>
    /// <returns></returns>
    public virtual ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        return new ToolsSmartPartInfo();
    }

    /// <summary>
    /// Shows the response view.
    /// </summary>
    /// <param name="targetResponse">The target response.</param>
    private void ShowResponseView(ITargetResponse targetResponse)
    {
        //TODO: Can these dialog calls be placed in the Link Handler?
        if (DialogService != null)
        {
            string caption = GetLocalResourceObject("AddResponse_DialogCaption").ToString();
            DialogService.SetSpecs(200, 200, 550, 800, "AddEditTargetResponse", caption, true);
            DialogService.EntityType = typeof(ITargetResponse);
            if (targetResponse != null && targetResponse.Id != null)
                DialogService.EntityID = targetResponse.Id.ToString();
            DialogService.DialogParameters.Add("ResponseDataSource", targetResponse);
            DialogService.ShowDialog();
        }
    }

    private void ShowReplaceOwner()
    {
        if (DialogService != null)
        {
            string caption = GetLocalResourceObject("ReplaceOwner_DialogCaption").ToString();
            DialogService.SetSpecs(200, 200, 150, 650, "ReplaceOwner", caption, true);
            DialogService.ShowDialog();
        }
    }

    private List<TaskItem> CreateListViewTasks(string currentEntity)
    {
        List<TaskItem> items = new List<TaskItem>();

        int length = 0;
        if (tasksByEntityList.ContainsKey(currentEntity)) length = tasksByEntityList[currentEntity].GetLength(0);
        for (int i = 0; i < length; i++)
        {
            var taskKey = tasksByEntityList[currentEntity].GetValue(i, 0).ToString();
            //Menu display conditions based on current Group and Context
            if (taskKey == "tskRemoveFromGroup" && !_currentIsAdHoc)
            {
            }
            else if (taskKey == "tskAddToGroup" && !_contextHasAdHoc)
            {
            }
            else if ((taskKey == "tskMapGroup" || taskKey == "tskNearbyAcct" || taskKey == "tskNearbyCont") &&
                !BusinessRuleHelper.IsGeocodeEnabled())
            {
            }
            else
            {
                // make sure the current user has access to this item's secured action
                var showItem = true;
                showItem = ShowTask(currentEntity, taskKey);
                if (showItem)
                {
                    TaskItem item = new TaskItem();
                    item.Id = taskKey;
                    item.Name = tasksByEntityList[currentEntity].GetValue(i, 1).ToString();
                    item.Action = tasksByEntityList[currentEntity].GetValue(i, 2).ToString();
                    item.PostbackFull = tasksByEntityList[currentEntity].GetValue(i, 3).ToString();
                    items.Add(item);
                }
            }
        }

        return items;
    }

    private List<TaskItem> CreateDetailViewTasks(string currentEntity)
    {
        var items = new List<TaskItem>();

        string lastUserId = string.Empty;
        IUser user = null;
        if (currentEntity == "IUser")
        {
            lastUserId = GetLastEntityId();
            user = EntityFactory.GetById<IUser>(lastUserId);
        }
        selectionDisplay.Visible = false;
        int length = 0;
        if (tasksByEntity.ContainsKey(currentEntity)) length = tasksByEntity[currentEntity].GetLength(0);
        for (int i = 0; i < length; i++)
        {
            var taskKey = tasksByEntity[currentEntity].GetValue(i, 0).ToString();
            //Menu display conditions based on current Group, Context, and UserOptions
            if (taskKey == "tskRemoveFromGroup" && !_currentIsAdHoc) { }
            // do not display
            else if (taskKey == "tskAddToGroup" && !_contextHasAdHoc) { }
            // do not display
            else if (taskKey == "tskSOEmail" && !CanShowReportOrEmail()) { }
            // do not display
            else if (lastUserId.Trim() == "ADMIN" && (taskKey == "tskCopyUser" ||
                                               taskKey == "tskCopyUserProfile" ||
                                               taskKey == "tskReplaceTeamMember")) { }
            // do not display
            else if (user != null && user.Type == UserType.Retired &&
                     (taskKey == "tskCopyUser" ||
                      taskKey == "tskCopyUserProfile" ||
                      taskKey == "tskReplaceTeamMember")) { }
            // do not display
            else if (user != null && user.Type == UserType.Template && taskKey == "tskReplaceTeamMember") { }
            // do not display
            else if ((taskKey == "tskMapGroup" || taskKey == "tskNearbyAcct" || taskKey == "tskNearbyCont") &&
                !BusinessRuleHelper.IsGeocodeEnabled())
            {
            }
            else
            {
                // make sure the current user has access to this item's secured action
                var showItem = true;
                showItem = ShowTask(currentEntity, taskKey);

                // Account and Contact Checks
                if (showItem && BusinessRuleHelper.IsGeocodeEnabled())
                {
                    // Make sure the address is geocoded before we allow this.
                    if (EntityService.EntityID != null)
                    {
                        if (taskKey == "tskNearbyAcct" || (taskKey == "tskMapGroup" && currentEntity.Equals("IAccount", StringComparison.InvariantCultureIgnoreCase)))
                        {
                            var item = EntityFactory.GetById<IAccount>(EntityService.EntityID);
                            if (item != null)
                                showItem = item.Address.IsGeocoded();
                        }
                        else if (taskKey == "tskNearbyCont" || (taskKey == "tskMapGroup" && currentEntity.Equals("IContact", StringComparison.InvariantCultureIgnoreCase)))
                        {
                            var item = EntityFactory.GetById<IContact>(EntityService.EntityID);
                            if (item != null)
                                showItem = item.Address.IsGeocoded();
                        }
                    }
                }

                if (showItem)
                {
                    var item = new TaskItem
                    {
                        Id = taskKey,
                        Name = tasksByEntity[currentEntity].GetValue(i, 1).ToString(),
                        Action = tasksByEntity[currentEntity].GetValue(i, 2).ToString(),
                        PostbackFull = tasksByEntity[currentEntity].GetValue(i, 3).ToString()
                    };
                    items.Add(item);
                }
            }
        }
        // remove the last separator if there is nothing after it.
        if (items.Count > 0 && items[items.Count - 1].Name == "Item_Separator")
            items.RemoveAt(items.Count - 1);

        return items;
    }

    private bool ShowTask(string entityName, string taskKey)
    {
        bool showTask = true;
        string securedActionKey;
        var key = entityName + taskKey;
        if (!tasksSecurityMap.ContainsKey(key))
        {
            key = taskKey;
        }
        if (tasksSecurityMap.TryGetValue(key, out securedActionKey))
        {
            var srv = ApplicationContext.Current.Services.Get<IRoleSecurityService>(true);
            if (srv != null)
            {
                showTask = srv.HasAccess(securedActionKey);
            }
        }
		// Below code will not show if it is Import task for Currency group
		if (key == "tskImportDefectActivityRate" && ShowImportForCurrencyGroup())
            showTask = false;
        if (key == "tskDeleteExchangeRate" && BusinessRuleHelper.IsDexEnabled() && entityName == "IExchangeRate")
            showTask = false;
        return showTask;
    }

    private bool ShowImportForCurrencyGroup()
    {
        GroupContext groupContext = GroupContext.GetGroupContext();
        return CurrencyGroupName.ToUpper() == groupContext.CurrentGroupInfo.CurrentGroup.GroupName.ToUpper();
    }

    private void DetermineAdHocStatus()
    {
        GroupContext groupContext = GroupContext.GetGroupContext();
        string currentGroupID = groupContext.CurrentGroupID;

        if (groupContext.CurrentGroupInfo != null)
        {
            foreach (GroupInfo gi in groupContext.CurrentGroupInfo.GroupsList)
            {
                if (gi.GroupID == currentGroupID)
                {
                    if (gi.IsAdHoc)
                    {
                        _currentIsAdHoc = true;
                    }
                }
                else
                {
                    if (gi.IsAdHoc)
                    {
                        _contextHasAdHoc = true;
                    }
                }
            }
        }
    }

    /// <summary>
    /// Creates the Click event of the Repeater control.
    /// </summary>
    protected void items_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Header)
        {
            if (((IList<TaskItem>)items.DataSource).Count == 0)
            {
                e.Item.FindControl("headerLine").Visible = false;
            }
        }
        else if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            string resourceName = ((TaskItem)e.Item.DataItem).Name;
            if (resourceName == "Item_Separator")
            {
                e.Item.Controls.Clear();
                Literal sep = new Literal();
                sep.Text = GetLocalResourceObject(resourceName).ToString();
                e.Item.Controls.Add(sep);
            }
            else
            {
                LinkButton itemsLinkButton = (LinkButton)e.Item.FindControl("Action");
                itemsLinkButton.CommandName = ((TaskItem)e.Item.DataItem).Id;
                itemsLinkButton.OnClientClick = ((TaskItem)e.Item.DataItem).Action;
                itemsLinkButton.Text = GetLocalResourceObject(resourceName).ToString();
            }

            if (((TaskItem)e.Item.DataItem).PostbackFull == "true")
            {
                ScriptManager.GetCurrent(Page).RegisterPostBackControl(e.Item.FindControl("Action"));
            }
        }
    }

    /// <summary>
    /// Handles the ItemCommand event of the items control.
    /// </summary>
    /// <param name="source">The source of the event.</param>
    /// <param name="e">The <see cref="System.Web.UI.WebControls.RepeaterCommandEventArgs"/> instance containing the event data.</param>
    protected void items_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        switch (e.CommandName)
        {
            case "tskAddResponse":
                ITargetResponse targetResponse = EntityFactory.Create<ITargetResponse>();
                ShowResponseView(targetResponse);
                break;
            case "tskReplaceUser":
            case "tskReplaceDepartment":
            case "tskReplaceTeam":
                ShowReplaceOwner();
                break;
            case "tskAddNewPickList":
                AddNewPickList();
                break;
            case "tskCopyUser":
                CopyUser();
                break;
            case "tskCopyUserProfile":
                CopyUserProfile();
                break;
            case "tskAddUserToTeam":
                AddUserToTeam();
                break;
            case "tskRemoveUserFromTeam":
                RemoveUserFromTeam();
                break;
            case "tskRemoveFromAllTeams":
                RemoveFromAllTeams();
                break;
            case "tskExportPickList":
                ExportPickList();
                break;
            case "tskDeleteTeam":
                DeleteTeam();
                break;
            case "tskDeleteDepartment":
                DeleteDepartment();
                break;
            case "tskReplaceTeamMember":
                ReplaceTeamMember();
                break;
            case "tskCopyTeam":
                CopyTeam();
                break;
            case "tskCopyDepartment":
                CopyDepartment();
                break;
            case "tskMapGroup":
                break;
            case "tskAddNewPlace":
                AddNewPlace();
                break;
            case "tskNearbyAcct":
                break;
            case "tskNearbyCont":
                break;
        }
    }
    private void DeleteTeam()
    {
        string lastId = GetLastEntityId();

        if (!string.IsNullOrEmpty(lastId))
            Link.DeleteTeam(new List<string> { lastId });
    }

    private void DeleteDepartment()
    {
        string lastId = GetLastEntityId();

        if (!string.IsNullOrEmpty(lastId))
            Link.DeleteDepartment(new List<string> { lastId });
    }

    /// <summary>
    /// copies a user with no user interaction.  Assumes source user's profile.
    /// </summary>
    private void CopyUser()
    {
        string lastId = GetLastEntityId();

        if (!string.IsNullOrEmpty(lastId))
            Link.CopyUser(new List<string> { lastId });
    }

    private string GetLastEntityId()
    {
        return EntityService.EntityID.ToString();
    }

    private void CopyUserProfile()
    {
        string lastId = GetLastEntityId();

        if (!string.IsNullOrEmpty(lastId))
            Link.CopyUserProfile(new List<string> { lastId });
    }

    private void ReplaceTeamMember()
    {
        // string lastId = GetLastEntityId();
        Link.ReplaceTeamMember(null);
    }

    private void CopyTeam()
    {
        IEntityHistoryService ehs = ApplicationContext.Current.Services.Get<IEntityHistoryService>();
        object lastId = ehs.GetLastIdForType<ITeam>();

        if (lastId != null)
        {
            Link.CopyTeam(new List<string> { lastId.ToString() });
        }
    }

    private void CopyDepartment()
    {
        IEntityHistoryService ehs = ApplicationContext.Current.Services.Get<IEntityHistoryService>();
        object lastId = ehs.GetLastIdForType<IDepartment>();

        if (lastId != null)
        {
            Link.CopyDepartment(new List<string> { lastId.ToString() });
        }
    }

    /// <summary>
    ///
    /// </summary>
    private void RemoveUserFromTeam()
    {
        string lastId = GetLastEntityId();

        if (!string.IsNullOrEmpty(lastId))
        {
            // Link.RemoveUsersFromTeam(new List<string>() { lastId });
        }
    }

    private void RemoveFromAllTeams()
    {
        string lastId = GetLastEntityId();

        if (!string.IsNullOrEmpty(lastId))
            Link.RemoveFromAllTeams(new List<string> { lastId });
    }

    private void AddUserToTeam()
    {
        string lastId = GetLastEntityId();

        if (!string.IsNullOrEmpty(lastId))
            Link.AddToTeam(new List<string> { lastId });
    }

    private void AddNewPickList()
    {
        if (DialogService != null)
        {
            DialogService.SetSpecs(0, 0, 200, 600, "AddPickList", "", true);
            DialogService.ShowDialog();
        }
    }

    private void AddNewPlace()
    {
        Response.Redirect("~/InsertPlace.aspx?modeid=Insert");
    }
   private void ExportPickList()
   {
        var ehs = ApplicationContext.Current.Services.Get<IEntityHistoryService>();
        var lastId = ehs.GetLastIdForType<IPickListView>();
        var selections = new List<string> {lastId.ToString()};
        var job = new Sage.SalesLogix.BusinessRules.Jobs.ExportToExcelJob();
        job.ExportPickListData(selections, "csv");
   }

    private void ExportToFile()
    {

        var groupContextService = ApplicationContext.Current.Services.Get<IGroupContextService>() as GroupContextService;
        if (groupContextService == null)
            return;

        var currentGroup = groupContextService.GetGroupContext().CurrentGroupInfo.CurrentGroup;
        var gInfo = currentGroup.GroupInformation;
        gInfo.ApplyFiltersFromConfiguration();
        var selectionType = hfSelections.Value;

        try
        {
            List<string> selectedIds = null;
            var srv = SelectionServiceRequest.GetSelectionService();
            var selectionContext = srv.GetSelectionContext(selectionType);
            if (selectionContext != null && selectionContext.SelectionInfo != null)
            {
                var mode = selectionContext.SelectionInfo.Mode;
                if (string.Compare(mode, "selectall", StringComparison.InvariantCultureIgnoreCase) != 0)
                {
                    selectedIds = selectionContext.GetSelectedIds();
                }
            }

            if (string.Compare(gInfo.TableName,"PicklistView", StringComparison.OrdinalIgnoreCase) != 0)
            {
                var cFormat = Request.Cookies["format"];
                var format = cFormat == null ? "csv" : cFormat.Value;
                var job = new Sage.SalesLogix.BusinessRules.Jobs.ExportToExcelJob();
                job.ExportToFile(gInfo, format, selectedIds);
            }
            else
            {
                 var job = new Sage.SalesLogix.BusinessRules.Jobs.ExportToExcelJob();
                job.ExportPickListData(selectedIds, "CSV");
            }
        }
        catch (Exception ex)
        {
            string sSlxErrorId = null;
            var sMsg = ErrorHelper.GetClientErrorHtmlMessage(ex, ref sSlxErrorId);
            if (!string.IsNullOrEmpty(sSlxErrorId))
            {
                log.Error(
                    ErrorHelper.AppendSlxErrorId(
                        "The call to SmartParts_TaskPane_CommonTasks_CommonTasksTasklet.ExportToFile() failed",
                        sSlxErrorId), ex);
            }
            DialogService.ShowHtmlMessage(sMsg, ErrorHelper.IsDevelopmentContext() ? 600 : -1,
                                          ErrorHelper.IsDevelopmentContext() ? 800 : -1);
        }
    }
  private bool CanShowReportOrEmail()
    {
        if (IsSalesOrder() && BusinessRuleHelper.IsIntegrationContractEnabled())
        {
            ISalesOrder salesOrder = CurrentSalesOrder();
            // Check if the Sales Order has been submitted.
            if (salesOrder != null &&
                salesOrder.GlobalSyncId.HasValue &&
                (salesOrder.ERPSalesOrder != null) &&
                (!string.IsNullOrEmpty(salesOrder.ERPSalesOrder.ERPStatus)))
            {
                // Yes, the Sales Order has been submitted.
                return true;
            }
            return false;
        }
        return true;
    }

    private ISalesOrder CurrentSalesOrder()
    {
        EntityPage page = Page as EntityPage;
        if (page != null && page.EntityContext != null)
        {
            if (page.EntityContext.EntityType.Equals(typeof(ISalesOrder)))
            {
                return EntityFactory.GetRepository<ISalesOrder>().Get(page.EntityContext.EntityID);
            }
        }
        return null;
    }

    private bool IsSalesOrder()
    {
        EntityPage page = Page as EntityPage;
        if (page != null && page.EntityContext != null)
        {
            return page.EntityContext.EntityType.Equals(typeof(ISalesOrder));
        }
        return false;
    }

    #region Fill Dictionaries

    private string MapGroupScript()
    {
        return string.Format("javascript:commonTaskActions.mapGroup('{0}', '{1}', {2});",
            Page.ResolveClientUrl("~/SmartParts/ProximitySearch/PxMap.aspx"),
            GetLocalResourceObject("Error_MapJavascriptBlocked").ToString(),
            Thread.CurrentThread.CurrentUICulture.LCID);
    }

    private string ShowNearbyScript(Type entityType)
    {
        if (entityType == typeof(IAccount))
            return "javascript:commonTaskActions.showNearby('" + Page.ResolveClientUrl("~/ContourAccountSearch.aspx") + "', '" + GetLocalResourceObject("Error_MapJavascriptBlocked").ToString() + "');";
        else if (entityType == typeof(IContact))
            return "javascript:commonTaskActions.showNearby('" + Page.ResolveClientUrl("~/ContourContactSearch.aspx") + "', '" + GetLocalResourceObject("Error_MapJavascriptBlocked").ToString() + "');";
        else
            return "";
    }

    private void FillListViewDictionaries()
    {
        string[,] accountListTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskPromote", "TaskText_Promote", "javascript:Sage.Utility.Dashboard.promoteGroupToDashboard();", "false"},
             {"tskImportAccount", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
             {"tskBulkUpdateAccount", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteAccount", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" },
             {"tskMapGroup", "TaskText_MapGroup", MapGroupScript(), "false" }
            };
        tasksByEntityList.Add("IAccount", accountListTasks);

        string[,] contactListTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskPromote", "TaskText_Promote", "javascript:Sage.Utility.Dashboard.promoteGroupToDashboard();", "false"},
             {"tskImportContact", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" },
             {"tskBulkUpdateContact", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteContact", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskWriteEmailToGroupSelection", "TaskText_WriteEmailToGroupSelection", "javascript:commonTaskActions.writeEmailToGroupSelection();", "false" },
             {"tskMapGroup", "TaskText_MapGroup", MapGroupScript(), "false" }
            };
        tasksByEntityList.Add("IContact", contactListTasks);

        string[,] activitiesListTasks = { { "Mail Merge", "mailMerge" } };
        tasksByEntityList.Add("Activities", activitiesListTasks);

        string[,] opportunitiesListTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskPromote", "TaskText_Promote", "javascript:Sage.Utility.Dashboard.promoteGroupToDashboard();", "false"},
             {"tskImportOpp", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
             {"tskBulkUpdateOpp", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteOpp", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IOpportunity", opportunitiesListTasks);

        string[,] leadsListTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskPromote", "TaskText_Promote", "javascript:Sage.Utility.Dashboard.promoteGroupToDashboard();", "false"},
             {"tskImportLead", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
             {"tskBulkUpdateLead", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteLead", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false"},
             {"tskWriteEmailToGroupSelection", "TaskText_WriteEmailToGroupSelection", "javascript:commonTaskActions.writeEmailToGroupSelection();", "false" }
            };
        tasksByEntityList.Add("ILead", leadsListTasks);

        string[,] campaignsListTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskPromote", "TaskText_Promote", "javascript:Sage.Utility.Dashboard.promoteGroupToDashboard();", "false"},
             {"tskBulkUpdateCampaign", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteCampaign", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("ICampaign", campaignsListTasks);

        string[,] ticketsListTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskPromote", "TaskText_Promote", "javascript:Sage.Utility.Dashboard.promoteGroupToDashboard();", "false"},
             {"tskImportTicket", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
             {"tskBulkUpdateTicket", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteTicket", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("ITicket", ticketsListTasks);

        string[,] defectsListTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskPromote", "TaskText_Promote", "javascript:Sage.Utility.Dashboard.promoteGroupToDashboard();", "false"},
             {"tskBulkUpdateDefect", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteDefect", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IDefect", defectsListTasks);

        string[,] returnsListTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskPromote", "TaskText_Promote", "javascript:Sage.Utility.Dashboard.promoteGroupToDashboard();", "false"},
             {"tskBulkUpdateReturn", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteReturn", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IReturn", returnsListTasks);

        string[,] contractsTasksList =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskPromote", "TaskText_Promote", "javascript:Sage.Utility.Dashboard.promoteGroupToDashboard();", "false"},
             {"tskBulkUpdateContract", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteContract", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IContract", contractsTasksList);

        string[,] salesOrderListTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskPromote", "TaskText_Promote", "javascript:Sage.Utility.Dashboard.promoteGroupToDashboard();", "false"},
             {"tskBulkUpdateSalesOrder", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteSalesOrder", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("ISalesOrder", salesOrderListTasks);

        string[,] quoteListTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskPromote", "TaskText_Promote", "javascript:Sage.Utility.Dashboard.promoteGroupToDashboard();", "false"},
             {"tskBulkUpdateQuote", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteQuote", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IQuote", quoteListTasks);

        string[,] codePickListTasksLists = { { "tskAddNewPickList", "TaskText_AddNewPickList", "", "false" } };
        tasksByEntityList.Add("IDBCodePickList", codePickListTasksLists);

        string[,] userListTasks =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskImportUser", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
                {"tskBulkUpdateUser", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IUser", userListTasks);

        string[,] teamListTasks =
            {
                {"tskAddToTeam", "AddToTeamCaption", "javascript:commonTaskActions.prepareSelectedRecords(commonTaskActions.addToTeam); return false;", "false" },
                {"tskRemoveFromAllTeams", "RemoveFromAllTeamsCaption",
                    string.Format("javascript:if(confirm('{0}')) commonTaskActions.prepareSelectedRecords(commonTaskActions.removeFromAllTeams); return false;",
                    PortalUtil.JavaScriptEncode(GetLocalResourceObject("ConfirmRemoveFromAllTeamsMsg").ToString())), "false" },
                {"tskUserSep0", "Item_Separator", "","false"}, // separator
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskBulkUpdateTeam", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("ITeam", teamListTasks);

        string[,] departmentListTasks =
            {
                {"tskAddToTeam", "AddToTeamCaption", "javascript:commonTaskActions.prepareSelectedRecords(commonTaskActions.addToTeam); return false;", "false" },
                {"tskRemoveFromAllTeams", "RemoveFromAllTeamsCaption",
                    string.Format("javascript:if(confirm('{0}')) commonTaskActions.prepareSelectedRecords(commonTaskActions.removeFromAllTeams); return false;",
                    PortalUtil.JavaScriptEncode(GetLocalResourceObject("ConfirmRemoveFromAllTeamsMsg").ToString())), "false" },
                {"tskUserSep0", "Item_Separator", "","false"}, // separator
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskBulkUpdateDepartment", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IDepartment", departmentListTasks);

        string[,] productListTasks =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskImportProduct", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
                {"tskBulkUpdateProduct", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
                {"tskDeleteProduct", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IProduct", productListTasks);

        string[,] packageListTasks =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskBulkUpdatePackage", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
                {"tskDeletePackage", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IPackage", packageListTasks);

        string[,] competitorListTasks =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskBulkUpdateCompetitor", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
                {"tskDeleteCompetitor", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("ICompetitor", competitorListTasks);

        string[,] leadsourceListTasks =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskImportLeadSource", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
                {"tskBulkUpdateLeadSource", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
                {"tskDeleteLeadSource", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("ILeadSource", leadsourceListTasks);

        string[,] pickListTasks =
            {
                {"tskAddNewPickList", "TaskPickList_AddPickList", "", "false"},
                {"tskUserSep0", "Item_Separator", "","false"}, // separator
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IPickListView", pickListTasks);
        string[,] roleListTasks =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IRole", roleListTasks);

        string[,] litItemListTasks =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("ILiteratureItem", litItemListTasks);

        string[,] litRequestListTasks =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("ILitRequest", litRequestListTasks);

        string[,] resources =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IResourceList", resources);

        string[,] qualifications =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskBulkUpdateQualification", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
                {"tskDeleteQualification", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IQualificationCategory", qualifications);

        string[,] securedActions =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("ISecuredAction", securedActions);

        string[,] standardProblems =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("ITicketProblemType", standardProblems);

        string[,] standardResolutions =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("ITicketSolutionType", standardResolutions);

        string[,] integrationListTasks =
            {{ "tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false" },
             { "tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();", "false" },
             { "tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();", "false" },
             { "tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IIntegration", integrationListTasks);

        string[,] importHistotyTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskPromote", "TaskText_Promote", "javascript:Sage.Utility.Dashboard.promoteGroupToDashboard();", "false"},
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IImportHistory", importHistotyTasks);

        string[,] aciTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskBulkUpdateACI", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskImportACI", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
             {"tskDeleteACI", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IAreaCategoryIssue", aciTasks);

        string[,] ticketActivityRateTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskImportTicketActivityRate", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
             {"tskBulkUpdateTicketActivityRate", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteTicketActivityRate", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("ITicketActivityRate", ticketActivityRateTasks);

        string[,] defectActivityRateTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskImportDefectActivityRate", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" }, 
             {"tskBulkUpdateDefectActivityRate", "TaskText_BulkActionUpdate", "javascript:commonTaskActions.bulkActionUpdateJob();", "false" },
             {"tskDeleteDefectActivityRate", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IDefectActivityRate", defectActivityRateTasks);

        string[,] exchangeRateTasks =
            {{"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
             {"tskImportExchangeRate", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },  
             {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" },
             {"tskDeleteExchangeRate", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" }             
            };
        tasksByEntityList.Add("IExchangeRate", exchangeRateTasks);
       
        string[,] countryCodeMappingsList =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" },
                {"tskImportCountryCodeMapping", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
                {"tskDeleteCountryCodeMapping", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" }
            };
        tasksByEntityList.Add("ICountryCodeMapping", countryCodeMappingsList);
        
        string[,] placeTasks =
            {
                {"tskAddNewPlace", "TaskPlace_AddPlace", "", "false"},
                //AdHoc group Management
                {"tskUserSep0", "Item_Separator", "", "false"}, // separator
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskDeletePointOfInterest", "TaskText_BulkDelete", "javascript:commonTaskActions.bulkActionDeleteJob();", "false" },
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" }
            };
        tasksByEntityList.Add("IPlace", placeTasks);

        string[,] customSettingsTasks =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" },
            };
        tasksByEntityList.Add("ICustomSetting", customSettingsTasks);
		
		 string[,] periodTasks =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskSaveAsNewGroup","TaskText_SaveAsNew","javascript:commonTaskActions.saveSelectionsAsNewGroup();","false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},
				{"tskImportDefectActivityRate", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
                {"tskExportToExcel", "TaskText_Export", "javascript:commonTaskActions.exportToFile();", "false" },
            };
        tasksByEntityList.Add("IPeriod", periodTasks);

    }

    private void FillDetailPageDictionaries()
    {
        string[,] accountDetailTasks =
            {{"tskDetailReport","TaskText_DetailReport","javascript:commonTaskActions.showDetailReport();","false"},
             {"tskEmail","TaskText_Email","javascript:commonTaskActions.emailSend();","false"},
             {"tskMailMerge","TaskText_MailMerge","javascript:ExecuteWriteAction(WriteAction.waWriteMailMerge, null);","false"},
             {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"},
             {"tskAddResponse","TaskText_ResponseToCampaign","","false"},
             {"tskInsertNote","TaskText_AddNote","javascript:Sage.Link.newNote();","false"},
             {"tskNewMeeting","TaskText_Meeting","javascript:Sage.Link.scheduleActivity('Meeting');","false"},
             {"tskNewPhoneCall","TaskText_PhoneCall","javascript:Sage.Link.scheduleActivity('PhoneCall');","false"},
             {"tskNewToDo","TaskText_ToDo","javascript:Sage.Link.scheduleActivity('ToDo');","false"},
             {"tskMapGroup", "TaskText_MapGroup", MapGroupScript(), "false" },
             {"tskNearbyAcct", "TaskText_AccountNearby", ShowNearbyScript(typeof(IAccount)), "false" }};
        tasksByEntity.Add("IAccount", accountDetailTasks);

        string[,] contactDetailTasks =
            {{"tskDetailReport","TaskText_DetailReport","javascript:commonTaskActions.showDetailReport();","false"},
             {"tskEmail","TaskText_Email","javascript:commonTaskActions.emailSend();","false"},
             {"tskMailMerge","TaskText_MailMerge","javascript:ExecuteWriteAction(WriteAction.waWriteMailMerge, null);","false"},
             {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"},
             {"tskAddResponse","TaskText_ResponseToCampaign","","false"},
             {"tskInsertNote","TaskText_AddNote","javascript:Sage.Link.newNote();","false"},
             {"tskNewMeeting","TaskText_Meeting","javascript:Sage.Link.scheduleActivity('Meeting');","false"},
             {"tskNewPhoneCall","TaskText_PhoneCall","javascript:Sage.Link.scheduleActivity('PhoneCall');","false"},
             {"tskNewToDo","TaskText_ToDo","javascript:Sage.Link.scheduleActivity('ToDo');","false"},
             {"tskImportContact", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
             {"tskMapGroup", "TaskText_MapGroup", MapGroupScript(), "false" },
             {"tskNearbyCont", "TaskText_ContactNearby", ShowNearbyScript(typeof(IContact)), "false" }};
        tasksByEntity.Add("IContact", contactDetailTasks);

        string[,] opportunityDetailTasks =
            {{"tskDetailReport","TaskText_DetailReport","javascript:commonTaskActions.showDetailReport();","false"},
             {"tskEmail","TaskText_Email","javascript:commonTaskActions.emailSend();","false"},
             {"tskMailMerge","TaskText_MailMerge","javascript:ExecuteWriteAction(WriteAction.waWriteMailMerge, null);","false"},
             {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"},
             {"tskInsertNote","TaskText_AddNote","javascript:Sage.Link.newNote();","false"},
             {"tskNewMeeting","TaskText_Meeting","javascript:Sage.Link.scheduleActivity('Meeting');","false"},
             {"tskNewPhoneCall","TaskText_PhoneCall","javascript:Sage.Link.scheduleActivity('PhoneCall');","false"},
             {"tskNewToDo","TaskText_ToDo","javascript:Sage.Link.scheduleActivity('ToDo');","false"}};
        tasksByEntity.Add("IOpportunity", opportunityDetailTasks);

        string[,] activityDetailTasks =
            {{"tskEmail","TaskText_Email","email","false"},
             {"tskMailMerge","TaskText_MailMerge","javascript:ExecuteWriteAction(WriteAction.waWriteMailMerge, null);","false"},
             {"tskNewMeeting","TaskText_Meeting","","false"},
             {"tskNewPhoneCall","TaskText_PhoneCall","","false"},
             {"tskNewToDo","TaskText_ToDo","","false"}};
        tasksByEntity.Add("IActivty", activityDetailTasks);

        string[,] leadDetailTasks =
            {{"tskEmail","TaskText_Email","javascript:commonTaskActions.emailSend();","false"},
             {"tskMailMerge","TaskText_MailMerge","javascript:ExecuteWriteAction(WriteAction.waWriteMailMerge, null);","false"},
             {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskImportLead", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"},
             {"tskInsertNote","TaskText_AddNote","javascript:Sage.Link.newNote();","false"},
             {"tskNewMeeting","TaskText_Meeting","javascript:Sage.Link.scheduleActivity('Meeting');","false"},
             {"tskNewPhoneCall","TaskText_PhoneCall","javascript:Sage.Link.scheduleActivity('PhoneCall');","false"},
             {"tskNewToDo","TaskText_ToDo","javascript:Sage.Link.scheduleActivity('ToDo');","false"}};
        tasksByEntity.Add("ILead", leadDetailTasks);

        string[,] campaignDetailTasks =
            {{"tskEmail","TaskText_Email","javascript:commonTaskActions.emailSend();","false"},
             {"tskMailMerge","TaskText_MailMerge","javascript:ExecuteWriteAction(WriteAction.waWriteMailMerge, null);","false"},
             {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"},
             {"tskInsertNote","TaskText_AddNote","javascript:Sage.Link.newNote();","false"},
             {"tskNewMeeting","TaskText_Meeting","javascript:Sage.Link.scheduleActivity('Meeting');","false"},
             {"tskNewPhoneCall","TaskText_PhoneCall","javascript:Sage.Link.scheduleActivity('PhoneCall');","false"},
             {"tskNewToDo","TaskText_ToDo","javascript:Sage.Link.scheduleActivity('ToDo');","false"}};
        tasksByEntity.Add("ICampaign", campaignDetailTasks);

        string[,] ticketDetailTasks =
            {{"tskDetailReport","TaskText_DetailReport","javascript:commonTaskActions.showDetailReport();","false"},
             {"tskEmail","TaskText_Email","javascript:commonTaskActions.emailSend();","false"},
             {"tskMailMerge","TaskText_MailMerge","javascript:ExecuteWriteAction(WriteAction.waWriteMailMerge, null);","false"},
             {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"},
             {"tskInsertNote","TaskText_AddNote","javascript:Sage.Link.newNote();","false"},
             {"tskNewMeeting","TaskText_Meeting","javascript:Sage.Link.scheduleActivity('Meeting');","false"},
             {"tskNewPhoneCall","TaskText_PhoneCall","javascript:Sage.Link.scheduleActivity('PhoneCall');","false"},
             {"tskNewToDo","TaskText_ToDo","javascript:Sage.Link.scheduleActivity('ToDo');","false"}};
        tasksByEntity.Add("ITicket", ticketDetailTasks);

        string[,] defectDetailTasks =
            {{"tskDetailReport","TaskText_DetailReport","javascript:commonTaskActions.showDetailReport();","false"},
             {"tskEmail","TaskText_Email","javascript:commonTaskActions.emailSend();","false"},
             {"tskMailMerge","TaskText_MailMerge","javascript:ExecuteWriteAction(WriteAction.waWriteMailMerge, null);","false"},
             {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"},
             {"tskInsertNote","TaskText_AddNote","javascript:Sage.Link.newNote();","false"},
             {"tskNewMeeting","TaskText_Meeting","javascript:Sage.Link.scheduleActivity('Meeting');","false"},
             {"tskNewPhoneCall","TaskText_PhoneCall","javascript:Sage.Link.scheduleActivity('PhoneCall');","false"},
             {"tskNewToDo","TaskText_ToDo","javascript:Sage.Link.scheduleActivity('ToDo');","false"}};
        tasksByEntity.Add("IDefect", defectDetailTasks);

        string[,] returnDetailTasks =
            {{"tskEmail","TaskText_Email","javascript:commonTaskActions.emailSend();","false"},
             {"tskMailMerge","TaskText_MailMerge","javascript:ExecuteWriteAction(WriteAction.waWriteMailMerge, null);","false"},
             {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"},
             {"tskInsertNote","TaskText_AddNote","javascript:Sage.Link.newNote();","false"},
             {"tskNewMeeting","TaskText_Meeting","javascript:Sage.Link.scheduleActivity('Meeting');","false"},
             {"tskNewPhoneCall","TaskText_PhoneCall","javascript:Sage.Link.scheduleActivity('PhoneCall');","false"},
             {"tskNewToDo","TaskText_ToDo","javascript:Sage.Link.scheduleActivity('ToDo');","false"}};
        tasksByEntity.Add("IReturn", returnDetailTasks);

        string[,] contractDetailTasks =
            {{"tskEmail","TaskText_Email","javascript:commonTaskActions.emailSend();","false"},
             {"tskMailMerge","TaskText_MailMerge","javascript:ExecuteWriteAction(WriteAction.waWriteMailMerge, null);","false"},
             {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"},
             {"tskInsertNote","TaskText_AddNote","javascript:Sage.Link.newNote();","false"},
             {"tskNewMeeting","TaskText_Meeting","javascript:Sage.Link.scheduleActivity('Meeting');","false"},
             {"tskNewPhoneCall","TaskText_PhoneCall","javascript:Sage.Link.scheduleActivity('PhoneCall');","false"},
             {"tskNewToDo","TaskText_ToDo","javascript:Sage.Link.scheduleActivity('ToDo');","false"}};
        tasksByEntity.Add("IContract", contractDetailTasks);

        string[,] salesOrderDetailTasks =
            {{"tskDetailReport","TaskText_DetailReport","javascript:commonTaskActions.showDetailReport();","false"},
             {"tskSOEmail","TaskText_Email","javascript:commonTaskActions.emailSend();","false"},
             {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"},
             {"tskInsertNote","TaskText_AddNote","javascript:Sage.Link.newNote();","false"},
             {"tskNewMeeting","TaskText_Meeting","javascript:Sage.Link.scheduleActivity('Meeting');","false"},
             {"tskNewPhoneCall","TaskText_PhoneCall","javascript:Sage.Link.scheduleActivity('PhoneCall');","false"},
             {"tskNewToDo","TaskText_ToDo","javascript:Sage.Link.scheduleActivity('ToDo');","false"}
           };
        tasksByEntity.Add("ISalesOrder", salesOrderDetailTasks);

        string[,] quoteDetailTasks =
            {
                {"tskDetailReport", "TaskText_DetailReport", "javascript:commonTaskActions.showDetailReport();", "false"},
                {"tskSOEmail", "TaskText_Email", "javascript:commonTaskActions.emailSend();", "false"},
                {"tskAddToGroup", "TaskText_AddToGroup", "javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup", "TaskText_Remove", "javascript:commonTaskActions.removeCurrentFromGroup();", "false"},
                {"tskInsertNote", "TaskText_AddNote", "javascript:Sage.Link.newNote();", "false"},
                {"tskNewMeeting", "TaskText_Meeting", "javascript:Sage.Link.scheduleActivity('Meeting');", "false"},
                {"tskNewPhoneCall", "TaskText_PhoneCall", "javascript:Sage.Link.scheduleActivity('PhoneCall');", "false"},
                {"tskNewToDo", "TaskText_ToDo", "javascript:Sage.Link.scheduleActivity('ToDo');", "false"}
            };
        tasksByEntity.Add("IQuote", quoteDetailTasks);

        string[,] codePickListTasks = { { "tskAddNewPickList", "TaskText_AddNewPickList", "", "false" } };
        tasksByEntity.Add("IDBCodePickList", codePickListTasks);

        string[,] userDetailTasks =
            {
                {"tskCopyUser", "CopyUserCaption", "", "false" },
                {"tskCopyUserProfile", "CopyProfileCaption", "", "false" },
                {"tskReplaceTeamMember", "ReplaceOnAllTeamsCaption", "", "false" },
                //AdHoc group Management
                {"tskUserSep0", "Item_Separator", "","false"}, // separator
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("IUser", userDetailTasks);

        string[,] teamDetailTasks =
            {
                {"tskCopyTeam", "CopyTeamCaption",
                    string.Format("javascript:if(!confirm('{0}')) return false; else __doPostBack('{1}','');",
                    PortalUtil.JavaScriptEncode( GetLocalResourceObject("ConfirmCopyTeamMessage").ToString()), UniqueID + "$ctl01$Action"), "false" },
                {"tskReplaceTeamMember", "ReplaceOnAllTeamsCaption", "", "false" },
                //AdHoc group Management
                {"tskUserSep0", "Item_Separator", "","false"}, // separator
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("ITeam", teamDetailTasks);

        string[,] departmentDetailTasks =
            {
                {"tskCopyDepartment", "CopyDepartmentCaption",
                    string.Format("javascript:if(!confirm('{0}')) return false; else __doPostBack('{1}','');",
                    PortalUtil.JavaScriptEncode(GetLocalResourceObject("ConfirmCopyDepartmentMessage").ToString()), UniqueID + "$ctl01$Action"), "false" },
                {"tskReplaceTeamMember", "ReplaceOnAllTeamsCaption", "", "false" },
                //AdHoc group Management
                {"tskUserSep0", "Item_Separator", "","false"}, // separator
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("IDepartment", departmentDetailTasks);

        string[,] roleDetailTasks =
            {
                //AdHoc group Management
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("IRole", roleDetailTasks);

        string[,] competitorDetailTasks =
            {
                //AdHoc group Management
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("ICompetitor", competitorDetailTasks);

        string[,] leadSourceDetailTasks =
            {
                //AdHoc group Management
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("ILeadSource", leadSourceDetailTasks);

        string[,] productDetailTasks =
            {
                //AdHoc group Management
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskImportProduct", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" },
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("IProduct", productDetailTasks);

        string[,] packageDetailTasks =
            {
                //AdHoc group Management
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("IPackage", packageDetailTasks);

        string[,] litItemDetailTasks =
            {
                //AdHoc group Management
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("ILiteratureItem", litItemDetailTasks);

        string[,] pickListDetailTasks =
            {
                {"tskAddNewPickList", "TaskPickList_AddPickList", "", "false"},
                //AdHoc group Management
                {"tskUserSep0", "Item_Separator", "","false"}, // separator
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("IPickListView", pickListDetailTasks);

        string[,] litRequestDetailTasks =
            {
                //AdHoc group Management
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("ILitRequest", litRequestDetailTasks);

        string[,] integrtionDetailTasks =
            {
                //AdHoc group Management
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("IIntegration", integrtionDetailTasks);

        string[,] importHistotyTasks =
            {{"tskDetailReport","TaskText_DetailReport","javascript:commonTaskActions.showDetailReport();","false"},
             {"tskEmail","TaskText_Email","javascript:commonTaskActions.emailSend();","false"},
             {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
             {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"}
            };
        tasksByEntity.Add("IImportHistory", importHistotyTasks);

        string[,] aciTasks =
            { {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
              {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("IAreaCategoryIssue", aciTasks);

        string[,] ticketActivityRateTasks =
            { {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
              {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("ITicketActivityRate", ticketActivityRateTasks);

        string[,] defectActivityRateTasks =
            { {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
              {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("IDefectActivityRate", defectActivityRateTasks);

        string[,] exchangeRateTasks =
            { {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
              {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("IExchangeRate", exchangeRateTasks);

        string[,] countryCodeMappings =
            {
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},                
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeSelectionsFromGroup();","false"},                
                {"tskImportCountryCodeMapping", "TaskText_Import", "javascript:commonTaskActions.importFromFile();", "false" }
            };
        tasksByEntity.Add("ICountryCodeMapping", countryCodeMappings);

        string[,] placeDetailTasks =
            {
                {"tskAddNewPlace", "TaskPlace_AddPlace", "", "false"},
                //AdHoc group Management
                {"tskUserSep0", "Item_Separator", "", "false"}, // separator
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("IPlace", placeDetailTasks);
		
		string[,] periodDetailTasks =
            {
                //AdHoc group Management
                {"tskUserSep0", "Item_Separator", "", "false"}, // separator
                {"tskAddToGroup", "TaskText_AddToGroup","javascript:commonTaskActions.showAdHocList(event);", "false"},
                {"tskRemoveFromGroup","TaskText_Remove","javascript:commonTaskActions.removeCurrentFromGroup();","false"}
            };
        tasksByEntity.Add("IPeriod", periodDetailTasks);




    }

    private IDictionary<string, string> GetTaskSecurityMap()
    {
        //To-Do break out according to Entity;
        IDictionary<string, string> maps = new Dictionary<string, string>();
        maps.Add("tskExportToExcel", "Entities/Group/ExportToFile");
        maps.Add("tskAddResponse", "Entities/Campaign/Edit");
        maps.Add("tskImport", "Administration/Import");
        maps.Add("tskImportAccount", "Entities/Account/Import");
        maps.Add("tskImportContact", "Entities/Contact/Import");
        maps.Add("tskImportProduct", "Entities/Product/Import");
        maps.Add("tskImportLead", "Entities/Lead/Import");
        maps.Add("tskImportACI", "Entities/ACI/Import");
        maps.Add("tskImportTicketActivityRate", "Entities/TicketActivityRate/Import");
        maps.Add("tskImportDefectActivityRate", "Entities/DefectActivityRate/Import");
        maps.Add("tskAddNewPickList", "Administration/PickList/Add");
        maps.Add("tskImportExchangeRate", "Entities/ExchangeRate/Import");
        maps.Add("tskImportCountryCodeMapping", "Entities/CountryCodeMapping/Add");
        maps.Add("tskAddNewPlace", "Entities/Place/Add");

        //Bulk update mappings
        maps.Add("tskBulkUpdateAccount", "Entities/Account/BulkUpdate");
        maps.Add("tskBulkUpdateContact", "Entities/Contact/BulkUpdate");
        maps.Add("tskBulkUpdateLead", "Entities/Lead/BulkUpdate");
        maps.Add("tskBulkUpdateOpp", "Entities/Opportunity/BulkUpdate");
        maps.Add("tskBulkUpdateCampaign", "Entities/Campaign/BulkUpdate");
        maps.Add("tskBulkUpdateTicket", "Entities/Ticket/BulkUpdate");
        maps.Add("tskBulkUpdateDefect", "Entities/Defect/BulkUpdate");
        maps.Add("tskBulkUpdateReturn", "Entities/Return/BulkUpdate");
        maps.Add("tskBulkUpdateContract", "Entities/Contract/BulkUpdate");
        maps.Add("tskBulkUpdateQuote", "Entities/Quote/BulkUpdate");
        maps.Add("tskBulkUpdateSalesOrder", "Entities/SalesOrder/BulkUpdate");
        maps.Add("tskBulkUpdateUser", "Entities/User/BulkUpdate");
        maps.Add("tskBulkUpdateTeam", "Entities/Team/BulkUpdate");
        maps.Add("tskBulkUpdateDepartment", "Entities/Department/BulkUpdate");
        maps.Add("tskBulkUpdateProduct", "Entities/Product/BulkUpdate");
        maps.Add("tskBulkUpdatePackage", "Entities/Package/BulkUpdate");
        maps.Add("tskBulkUpdateCompetitor", "Entities/Competitor/BulkUpdate");
        maps.Add("tskBulkUpdateLeadSource", "Entities/LeadSource/BulkUpdate");
        maps.Add("tskBulkUpdateQualification", "Entities/Qualification/BulkUpdate");
        maps.Add("tskBulkUpdateACI", "Entities/ACI/BulkUpdate");
        maps.Add("tskBulkUpdateTicketActivityRate", "Entities/TicketActivityRate/BulkUpdate");
        maps.Add("tskBulkUpdateDefectActivityRate", "Entities/DefectActivityRate/BulkUpdate");

        //Delete secured mappings
        maps.Add("tskDeleteAccount", "Entities/Account/BulkDelete");
        maps.Add("tskDeleteContact", "Entities/Contact/BulkDelete");
        maps.Add("tskDeleteOpp", "Entities/Opportunity/BulkDelete");
        maps.Add("tskDeleteLead", "Entities/Lead/BulkDelete");
        maps.Add("tskDeleteCampaign", "Entities/Campaign/BulkDelete");
        maps.Add("tskDeleteTicket", "Entities/Ticket/BulkDelete");
        maps.Add("tskDeleteDefect", "Entities/Defect/BulkDelete");
        maps.Add("tskDeleteReturn", "Entities/Return/BulkDelete");
        maps.Add("tskDeleteContract", "Entities/Contract/BulkDelete");
        maps.Add("tskDeleteQuote", "Entities/Quote/BulkDelete");
        maps.Add("tskDeleteSalesOrder", "Entities/SalesOrder/BulkDelete");
        maps.Add("tskDeleteProduct", "Entities/Product/BulkDelete");
        maps.Add("tskDeletePackage", "Entities/Package/BulkDelete");
        maps.Add("tskDeleteCompetitor", "Entities/Competitor/BulkDelete");
        maps.Add("tskDeleteLeadSource", "Entities/LeadSource/BulkDelete");
        maps.Add("tskDeleteQualification", "Entities/Qualification/BulkDelete");
        maps.Add("tskDeleteACI", "Entities/ACI/BulkDelete");
        maps.Add("tskDeleteTicketActivityRate", "Entities/TicketActivityRate/BulkDelete");
        maps.Add("tskDeleteDefectActivityRate", "Entities/DefectActivityRate/BulkDelete");
        maps.Add("tskDeleteExchangeRate", "Entities/ExchangeRate/BulkDelete");
        maps.Add("tskDeleteCountryCodeMapping", "Entities/CountryCodeMapping/Delete");

        // Contour (Proximity Search)
        maps.Add("tskMapGroup", "Contour/Map/Group");
        maps.Add("tskNearbyAcct", "Contour/Map/Account");
        maps.Add("tskNearbyCont", "Contour/Map/Contact");

        return maps;
    }

    #endregion

    internal class Layout
    {
        public string ColumnName;
        private string _caption = string.Empty;

        public string ColumnCaption
        {
            get
            {
                return string.IsNullOrEmpty(_caption) ? ColumnName : _caption;
            }
            set { _caption = value; }
        }

        public string FormatType;
        public string FormatString;
        public bool Visible;
        public int Width;
    }
}