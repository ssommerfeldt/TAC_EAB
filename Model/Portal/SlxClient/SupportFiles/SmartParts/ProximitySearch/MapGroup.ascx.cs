using System;
using System.Data;
using System.Data.OleDb;
using System.Web.UI;
using System.Web.UI.WebControls;
using Sage.Entity.Interfaces;
using Sage.Platform.Application;
using Sage.Platform.Application.UI;
using Sage.Platform.Application.UI.Web;
using Sage.Platform.Data;
using Sage.Platform.Security;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.Client.GroupBuilder;
using System.Web;
using Saleslogix.Geocode.Helpers;
using Saleslogix.Geocode.DTO;
using System.Collections.Generic;

/// <summary>
/// Add entity to an existing or a new adhoc group.
/// </summary>
public partial class SP_MapGroupPage :  UserControl, ISmartPartInfoProvider
{	
    /// <summary>
    /// Initialization of the page. 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack && Visible)
        {
            object o = null;
            DialogService.DialogParameters.TryGetValue("SelectedGroupID", out o);
            if (o != null)
            {
                string groupId = o.ToString();
                Page.Session["SelectedGroupID"] = groupId;

                if (GroupContext.GetGroupContext().CurrentGroupID == groupId &&
                    cbxGroupName.Items.Count == 0)
                {
                    string entity = GroupContext.GetGroupContext().CurrentEntity.ToUpper();
                    InitializeGroupList(entity);

                    if (!rbAccts.Checked)
                        rbAccts.Checked = (entity.Equals("ACCOUNT"));
                    if (!rbCntcts.Checked)
                        rbCntcts.Checked = (entity.Equals("CONTACT"));
                    cbxGroupName.SelectedValue = (string)Page.Session["SelectedGroupID"];
                    cbxGroupName.Enabled = false;
                }

                //rbAccts_lbl.Visible = rbAccts.Visible = false;
                //rbCntcts_lbl.Visible = rbCntcts.Visible = false;
            }
            else
            {
                Page.Session["SelectedGroupID"] = null;

                InitializeRadioButtons();

                if (cbxGroupName.Items.Count == 0)
                    InitializeGroupList("ACCOUNT");
            }

            Page.Session["MapVisible"] = false;

            InitializeDefaultSortMethod();
            InitializeLocationItems();
            InitializeDisplayRadius();

            //cbxCenterLoc.Items.Add("63114");
            //cbxCenterLoc.Text = "63114";
        }

        DataBind();
    }

    #region Control_Initialization

    /// <summary>
    /// Initialize the points of interest list. 
    /// </summary>
    private static void InitializeLocationItems()
    {
    }

    private void InitializeRadioButtons()
    {
        rbAccts.Checked = true;
        rbCntcts.Checked = false;
    }

    /// <summary>
    /// 
    /// </summary>
    private void InitializeDefaultSortMethod()
    {
        if (Page.Session["m_sortDirection"] == null)
            Page.Session["m_sortDirection"] = SortDirection.Ascending;
        if (Page.Session["m_sortExpression"] == null)
            Page.Session["m_sortExpression"] = "Account";
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="grpType">"ACCOUNT" or "CONTACT"</param>
    private void InitializeGroupList(string grpType)
    {
        cbxGroupName.Items.Clear();
        GroupContext.GetGroupContext().CurrentTable = grpType;
        EntityGroupInfo groupCache = GroupContext.GetGroupContext().GetGroupInfoForTable(grpType);
        foreach (var gi in groupCache.GroupsList)
        {
            cbxGroupName.Items.Add(new ListItem(gi.GroupName, gi.GroupID));
        }
    }

    /// <summary>
    /// Initialize all the default values for the distance drop down and set the base to 10. 
    /// </summary>
    private void InitializeDisplayRadius()
    {
        if (cbxDisplayRadius.Items.Count == 0)
        {
            cbxDisplayRadius.Items.Add("1");
            cbxDisplayRadius.Items.Add("5");
            cbxDisplayRadius.Items.Add("10");
            cbxDisplayRadius.Items.Add("25");
            cbxDisplayRadius.Items.Add("50");
            cbxDisplayRadius.Items.Add("100");
            cbxDisplayRadius.Items.Add("250");
            cbxDisplayRadius.Items.Add("500");
            cbxDisplayRadius.Text = "10";
        }
    }

    #endregion

    #region event_handlers

    /// <summary>
    /// Retrieve the list of items to display in the data grid. 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnSearch_OnClick(object sender, EventArgs e)
    {
        ExecShowMap();
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void rbAccts_btnChanged(object sender, EventArgs e)
    {
        if (rbAccts.Checked)
        {
            InitializeGroupList("ACCOUNT");
            dgPostalCodeResults.DataSource = null;
            dgPostalCodeResults.DataBind();
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void rbCntcts_btnChanged(object sender, EventArgs e)
    {
        if (rbCntcts.Checked)
        {
            InitializeGroupList("CONTACT");
            dgPostalCodeResults.DataSource = null;
            dgPostalCodeResults.DataBind();
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void cbxGroupName_OnSelectedIndexChanged(object sender, EventArgs e)
    {
        dgPostalCodeResults.DataSource = null;
        dgPostalCodeResults.DataBind();
    }

    protected void dgPostalCodeResults_DataBound(object sender, EventArgs e)
    {
        if (dgPostalCodeResults.DataSource != null)
        {
            ScriptManager.RegisterStartupScript(this, GetType(), "ResizeDialog", @"    
                setTimeout(function() {
                    var dlgWin = dijit.byId('DialogWorkspace_window');
                    if(dlgWin){
                        dlgWin._size();
                        dlgWin._position();
                    }
                }, 1);   
            ", true);
        }
    }

    /// <summary>
    /// Retrieve a reference to the page-level work item.
    /// This can be used to get to the main entity.
    /// </summary>
    private PageWorkItem WorkItem
    {
        get
        {
            return ((ApplicationPage)Page).PageWorkItem;
            /*
             * This is from the FAQ but not working as of 7.5
            IPageWorkItemLocator locatorService = Sage.Platform.Application.ApplicationContext.Current.Services.Get<IPageWorkItemLocator>();
            return locatorService.GetPageWorkItem();
             */
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnDisplayMap_OnClick(object sender, EventArgs e)
    {
        var res = ExecShowMap();
        if (res == null || res.Count == 0)
        {
            throw new ValidationException(GetLocalResourceObject("Error_NoResults").ToString());
        }
        if (res != null)
        {
            ScriptManager.RegisterClientScriptBlock(this, GetType(), Guid.NewGuid().ToString(),
                    string.Format("if(!window.open('" + Page.ResolveClientUrl("~/SmartParts/ProximitySearch/PxMap.aspx") + "?type={0}&grp={1}&sort={2}&asc={3}', '_blank')) {{ alert('Map window could not open - please ensure popup blocker is not active'); }}",
                        HttpUtility.UrlEncode(rbAccts.Checked ? "IAccount" : "IContact"),
                        HttpUtility.UrlEncode(cbxGroupName.SelectedValue),
                        HttpUtility.UrlEncode(Page.Session["m_sortExpression"].ToString()),
                        HttpUtility.UrlEncode(((SortDirection)Page.Session["m_sortDirection"] == SortDirection.Ascending).ToString())
                    ), true);
        }
    }
    
    /// <summary>
    /// Returns a string with a 'zoom-in' value for Google maps. Values are 1-13. 
    /// </summary>
    /// <param name="mileStr"></param>
    /// <returns></returns>
    private static string CalcStartRadius(string mileStr)
    {
        try
        {
            int miles = Convert.ToInt16(mileStr);

            if (miles < 5)
                return "12";

            if (miles < 10)
                return "11";

            if (miles < 25)
                return "10";

            if (miles < 50)
                return "9";

            if (miles < 100)
                return "8";

            if (miles < 250)
                return "7";

            return miles < 500 ? "6" : "11";
        }
        catch
        {
            return "11";
        }
    }

    /// <summary>
    /// Form validation code to run prior to searching. 
    /// </summary>
    /// <returns></returns>
    private static bool ValidateInputs()
    {
        //if (cbxCenterLoc.Text.Length < 5)
        //{
        //    return false;
        //}
        return true;
    }

    /// <summary>
    /// Execute the distance search and create the result set. 
    /// </summary>
    public IList<DistanceDTO> ExecShowMap()
    {
        if (!ValidateInputs())
        {
            //Show Error
            return null;
        }

        IList<DistanceDTO> results = null;

        // Perform the search on either account or contact
        if (rbAccts.Checked)
        {
            // Account Group Search
            results = DistanceSearchHelper.AccountGroupSearch(cbxGroupName.SelectedValue,
                Page.Session["m_sortExpression"].ToString(),
                ((SortDirection)Page.Session["m_sortDirection"] == SortDirection.Ascending),
                0, 0, null);
        }
        else
        {
            // Contact Group Search
            results = DistanceSearchHelper.ContactGroupSearch(cbxGroupName.SelectedValue,
                Page.Session["m_sortExpression"].ToString(),
                ((SortDirection)Page.Session["m_sortDirection"] == SortDirection.Ascending),
                0, 0, null);
        }

        dgPostalCodeResults.DataSource = null;
        dgPostalCodeResults.DataSource = results;
        //Display datagrid.
        dgPostalCodeResults.DataBind();

        return results;
    }

    private static string XmlEncode(string input)
    {
        return input.Replace("&", "and").Replace("\"", "&quot;").Replace("'", "&apos;");
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void PostalCodeResults_RowUpdating(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
            e.Row.Cells[0].Text = ((e.Row.RowIndex + 1) + (dgPostalCodeResults.PageSize * dgPostalCodeResults.PageIndex)).ToString();
        //e.Row.Cells[0].Text = ((char) ('A' + e.Row.RowIndex)).ToString();
    }

    /// <summary>
    /// Sort functionality, executed manually due to the datagrid being unbound and using a list as the parameter. 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void PostalCodeResults_Sorting(object sender, GridViewSortEventArgs e)
    {
        //Sort Direction is broken in GridViewSortEventArgs. It always returns ascending. This works around the limitation. 
        if ((string)Page.Session["m_sortExpression"] == e.SortExpression)
        {
            Page.Session["m_sortDirection"] = (SortDirection)Page.Session["m_sortDirection"] == SortDirection.Ascending
                                                  ? SortDirection.Descending
                                                  : SortDirection.Ascending;
        }
        else
        {
            Page.Session["m_sortDirection"] = e.SortDirection;
        }

        Page.Session["m_sortExpression"] = e.SortExpression;

        //Re-query and re-bind the data 
        ExecShowMap();
    }

    /// <summary>
    /// Update to the next page. 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void PostalCodeResults_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        dgPostalCodeResults.PageIndex = e.NewPageIndex;
        ExecShowMap();
    }

    /// <summary>
    /// EntityType for the form.
    /// </summary>
    public Type EntityType
    {
        get { return typeof(IContact); }
    }

    #endregion

    #region ISmartPartInfoProvider Members

    /// <summary>
    /// Gets the smart part info.
    /// </summary>
    /// <param name="smartPartInfoType">Type of the smart part info.</param>
    /// <returns></returns>
    public ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        ToolsSmartPartInfo tinfo = new ToolsSmartPartInfo();
        foreach (Control c in MapGroup_RTools.Controls)
        {
            tinfo.RightTools.Add(c);
        }
        return tinfo;
    }

    /// <summary>
    /// Gets or sets an instance of the Dialog Service.
    /// </summary>
    /// <value>The dialog service.</value>
    [ServiceDependency]
    public IWebDialogService DialogService { get; set; }

    /// <summary>
    /// Gets or sets the entity context.
    /// </summary>
    /// <value>The entity context.</value>
    /// <returns>The specified <see cref="T:System.Web.HttpContext"></see> object associated with the current request.</returns>
    [ServiceDependency]
    public IContextService ContextService { get; set; }
    
    public UIWorkItem ParentWorkItem { get; set; }

    [ServiceDependency]
    public IUserService UserService { get; set; }

    #endregion
}