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
using Saleslogix.Integration.BOE.Common;

public partial class SmartParts_TaskPane_PeriodTasks_PeriodTasksTasklet : UserControl, ISmartPartInfoProvider
{
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
        private bool _enabled;

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

        public bool Enabled
        {
            get { return _enabled; }
            set { _enabled = value; }
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

    private IDictionary<string, string> GetTaskSecurityMap()
    {
        IDictionary<string, string> maps = new Dictionary<string, string>();
        maps.Add("tskModifyRatePeriods", "Entities/Period/ModifyPeriod");
        return maps;
    }

    #endregion

    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);
        EntityPage entityPage = Page as EntityPage;
		string displayMode = entityPage.ModeId;
        if (Page != null)
        {
            string entityType = EntityService.EntityType.Name;
            List<TaskItem> tasks = new List<TaskItem>();
            if (displayMode == "List" || displayMode != "Detail")
            {
	            FillListPageDictionaries();
			}
			tasks = CreateTasks(entityType);
            items.DataSource = tasks;
            items.DataBind();
            periodUpdatePanel.Update();
        }
    }
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
                LinkButton itemsLinkButton = (LinkButton)e.Item.FindControl("PeriodAction");
                itemsLinkButton.CommandName = ((TaskItem)e.Item.DataItem).Id;
                itemsLinkButton.OnClientClick = ((TaskItem)e.Item.DataItem).Action;
                itemsLinkButton.Text = GetLocalResourceObject(resourceName).ToString();
                itemsLinkButton.Enabled = ((TaskItem)e.Item.DataItem).Enabled;
            }

            if (((TaskItem)e.Item.DataItem).PostbackFull == "true")
            {
                ScriptManager.GetCurrent(Page).RegisterPostBackControl(e.Item.FindControl("PeriodAction"));
            }
        }
    }
    private bool EnableLink(string taskKey)
    {
        if (taskKey == "tskModifyRatePeriods")
        {
            return true;
        }
        if (taskKey == "tskBulkUpdate")
        {
            return !Utilities.IsBulkUpdateRunning();
        }
        return true;
    }
    protected void items_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        switch (e.CommandName)
        {

            case "tskModifyRatePeriods":
                ModifyRatePeriods();
                break;
            case "tskBulkUpdate":
                BulkUpdate();
                break;
        }
    }
    private void BulkUpdate()
    {
        if (DialogService != null)
        {
            DialogService.SetSpecs(0, 0, 400, 600, "NormalizeEntities", "", true);
            DialogService.ShowDialog();
        }
    }
    private void ModifyRatePeriods()
    {
        if (DialogService != null)
        {
            DialogService.SetSpecs(0, 0, 200, 600, "EditPeriods", "", true);
            DialogService.ShowDialog();
        }
    }
    private List<TaskItem> CreateTasks(string currentEntity)
    {
        var items = new List<TaskItem>();

        string lastUserId = string.Empty;
        IUser user = null;
        int length = 0;
        if (tasksByEntity.ContainsKey(currentEntity)) length = tasksByEntity[currentEntity].GetLength(0);
        for (int i = 0; i < length; i++)
        {
            var taskKey = tasksByEntity[currentEntity].GetValue(i, 0).ToString();
            //Menu display conditions based on current Group, Context, and UserOptions

            // make sure the current user has access to this item's secured action
            var showItem = true;
            showItem = ShowTask(currentEntity, taskKey);
            if (showItem)
            {
                var item = new TaskItem
                {
                    Id = taskKey,
                    Name = tasksByEntity[currentEntity].GetValue(i, 1).ToString(),
                    Action = tasksByEntity[currentEntity].GetValue(i, 2).ToString(),
                    PostbackFull = tasksByEntity[currentEntity].GetValue(i, 3).ToString(),
                    Enabled = EnableLink(taskKey)
                };
                items.Add(item);
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

        return showTask;
    }

    private void FillListPageDictionaries()
    {
        string[,] periodTasks =
        {
            //AdHoc group Management
            {"tskModifyRatePeriods", "TaskText_ModifyRatePeriods","", "false"},
            {"tskBulkUpdate", "TaskText_BulkUpdate", "", "false"}
        };
        tasksByEntity.Add("IPeriod", periodTasks);
    }


    public ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        return new ToolsSmartPartInfo();
    }
}