using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Linq;
using Sage.Entity.Interfaces;
using Sage.Platform.Application;
using Sage.Platform.Application.UI;
using Sage.Platform.Application.UI.Web;
using Sage.Platform.Data;
using Sage.Platform.Security;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.Client.GroupBuilder;
using Sage.Platform;
using Sage.Platform.WebPortal;
using Sage.SalesLogix.Address;
using System.Data;
using System.Web;
using Saleslogix.Geocode.Interfaces;
using Saleslogix.Geocode.DTO;
using Saleslogix.Geocode.Helpers;
using System.Collections.Generic;
using System.Text;
using System.Globalization;
using System.Threading;

/// <summary>
/// Add entity to an existing or a new adhoc group.
/// </summary>
public partial class SmartParts_ProximitySearch_AccountDistanceSearch :  UserControl, ISmartPartInfoProvider
{
    private const string LOCATION_CUSTOM = "CUSTOM";

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

    private RegionInfo _CurrentRegion;
    private RegionInfo CurrentRegion
    {
        get
        {
            if (_CurrentRegion == null)
                _CurrentRegion = new RegionInfo(Thread.CurrentThread.CurrentCulture.LCID);
            return _CurrentRegion;
        }
    }

    protected string GetScheduleLink(string activityType, string entityId, string entityDescription)
    {
        return "scheduleActivity(\"" + activityType + "\", \"" + entityId + "\", \"" + PortalUtil.JavaScriptEncode(entityDescription, true).Replace("\"", "\\\"") + "\");";
    }
    
    /// <summary>
    /// Initialization of the page. 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void Page_Load(object sender, EventArgs e)
    {
        // There is an issue with putting this in the dialog mode
        // as the IsPostBack is always true.
        if (!Page.IsPostBack && Visible)
        {
            InitializeDefaultSortMethod();
            InitializeDistanceItemsList();
            InitializeResultCountList();
            InitializePickListItems();
            InitializeLocationItems();
            CheckForDialogParameters();
            dgPostalCodeResults.DataBind();
        }

        DataBind();
    }

    #region Control_Initialization

    private void CheckForDialogParameters()
    {
        if (DialogService != null)
        {
            object o = null;
            DialogService.DialogParameters.TryGetValue("ActiveEntityId", out o);
            if (o != null)
            {
                string entityId = o.ToString();

                // Get the entity
                var entity = EntityFactory.GetById<IAccount>(entityId);
                if (entity != null && entity.Address != null)
                {
                    // Pull the address out
                    var addr = entity.Address;
                    cbxLocation.SelectedValue = LOCATION_CUSTOM;
                    txtCustom.Text = addr.CityStatePostal;
                    txtCustom.Enabled = true;
                }
            }
        }
    }

    /// <summary>
    /// Initialize the default sort method for the grid.
    /// </summary>
    private void InitializeDefaultSortMethod()
    {
        if (Page.Session["m_sortDirection"] == null)
            Page.Session["m_sortDirection"] = SortDirection.Ascending;
        if (Page.Session["m_sortExpression"] == null)
            Page.Session["m_sortExpression"] = "Distance";
    }

    /// <summary>
    /// Initialize the default values for the pklType and pklSubType controls. Initialize default pklType list (but
    /// not the pklSubType list as it changes based on the main type).  
    /// </summary>
    private void InitializePickListItems()
    {
        if (string.IsNullOrEmpty(pklType.PickListValue))
            pklType.PickListValue = "All";
        if (string.IsNullOrEmpty(pklType.PickListName))
            pklType.PickListName = "Account Type";
        if (string.IsNullOrEmpty(pklSubType.PickListValue))
            pklSubType.PickListValue = "All";
    }
    
    /// <summary>
    /// Initialize the points of interest list. 
    /// </summary>
    private void InitializeLocationItems()
    {
        if (cbxLocation.Items.Count == 0)
        {
            int startIndex = 0;
            cbxLocation.Items.Add(new ListItem(GetLocalResourceObject("Location_CustomLocation").ToString(), LOCATION_CUSTOM));

            if (Request.QueryString["start"] != null)
            {
                try
                {
                    string entityId = Request.QueryString["start"];
                    var acct = EntityFactory.GetById<IAccount>(entityId);
                    if (acct != null && acct.Address != null && acct.Address.IsGeocoded())
                    {
                        cbxLocation.Items.Add(new ListItem(acct.AccountName, acct.Address.Id.ToString()));
                        startIndex = 1;
                    }
                }
                catch { }
            }

            IUser currentUser = Sage.SalesLogix.BusinessRules.BusinessRuleHelper.GetCurrentUser();
            if (currentUser.Id.ToString().Trim() != "ADMIN" && currentUser.UserInfo.Address != null && currentUser.UserInfo.Address.IsGeocoded())
            {
                cbxLocation.Items.Add(new ListItem(GetLocalResourceObject("Location_MyOffice").ToString(), currentUser.UserInfo.Address.Id.ToString()));
            }
            if (currentUser.Id.ToString().Trim() != "ADMIN" && currentUser.UserInfo.HomeAddress != null && currentUser.UserInfo.HomeAddress.IsGeocoded())
            {
                cbxLocation.Items.Add(new ListItem(GetLocalResourceObject("Location_MyHouse").ToString(), currentUser.UserInfo.HomeAddress.Id.ToString()));
            }

            // Get the places this user can use
            var userPlaces = PlaceHelper.GetPlaces(currentUser);
            if (userPlaces != null)
            {
                foreach (IPlace plc in userPlaces)
                {
                    cbxLocation.Items.Add(new ListItem(plc.Name, plc.Address.Id.ToString()));
                }
            }

            cbxLocation.SelectedIndex = startIndex;
            if (startIndex > 0)
            {
                cbxLocation_ChangeAction(this, new EventArgs());
                btnSearch_OnClick(this, new EventArgs());
            }
        }
    }

    /// <summary>
    /// Initialize all the default values for the distance drop down and set the base to 10. 
    /// </summary>
    private void InitializeDistanceItemsList()
    {
        if (cbxDistance.Items.Count == 0)
        {
            cbxDistance.Items.Add("1");
            cbxDistance.Items.Add("5");
            cbxDistance.Items.Add("10");
            cbxDistance.Items.Add("25");
            cbxDistance.Items.Add("50");
            cbxDistance.Items.Add("100");
            cbxDistance.Items.Add("250");
            cbxDistance.Items.Add("500");
            cbxDistance.Text = "10";

            if (CurrentRegion.IsMetric)
                cbxDistance_lbl.Text = string.Format(cbxDistance_lbl.Text, GetLocalResourceObject("Distance_Kilometers"));
            else
                cbxDistance_lbl.Text = string.Format(cbxDistance_lbl.Text, GetLocalResourceObject("Distance_Miles"));
        }        
    }

    /// <summary>
    /// Initialize the default values for the numResults drop down list and set the base to All results. 
    /// </summary>
    private void InitializeResultCountList()
    {
        if (cbxNumResults.Items.Count == 0)
        {
            cbxNumResults.Items.Add(GetLocalResourceObject("Results_All").ToString());
            cbxNumResults.Items.Add("10");
            cbxNumResults.Items.Add("25");
            cbxNumResults.Items.Add("50");
            cbxNumResults.Items.Add("100");
            cbxNumResults.Items.Add("250");
            cbxNumResults.Items.Add("500");

            cbxNumResults.Text = GetLocalResourceObject("Results_All").ToString();
        }
    }

    #endregion

    #region event_handlers

    /// <summary>
    /// Whenever a picklist item on account type is changed, the account subtype picklist adjusts to the new account pkl. 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void pklType_ChangeAction(object sender, EventArgs e)
    {
        if (!string.IsNullOrEmpty(pklSubType.PickListValue))
            pklSubType.PickListValue = "";

        pklSubType.PickListName = "Account " + pklType.PickListValue;
    }

    /// <summary>
    /// Retrieve the list of items to display in the data grid. 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnSearch_OnClick(object sender, EventArgs e)
    {
        // Back to page 1
        dgPostalCodeResults.PageIndex = 0;
        ExecDistanceSearch();
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void cbxLocation_ChangeAction(object sender, EventArgs e)
    {
        if (cbxLocation.SelectedValue == LOCATION_CUSTOM)
        {
            txtCustom.Enabled = true;
            txtCustom.Text = "";
            txtCustom.Focus();
        }
        else
        {
            txtCustom.Enabled = false;
            txtCustom.Text = cbxLocation.SelectedItem.Text;
        }
    }

    /// <summary>
    /// Handles the RowDataBound event of the dgPostalCodeResults control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.Web.UI.WebControls.GridViewRowEventArgs"/> instance containing the event data.</param>
    protected void PostalCodeResults_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            //e.Row.Cells[0].Text = ((char) ('A' + e.Row.RowIndex)).ToString();
            e.Row.Cells[0].Text = ((e.Row.RowIndex + 1) + (dgPostalCodeResults.PageSize * dgPostalCodeResults.PageIndex)).ToString();
        }
    }

    /// <summary>
    /// Handles the Sorting event of the dgPostalCodeResults control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.Web.UI.WebControls.GridViewSortEventArgs"/> instance containing the event data.</param>
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
        ExecDistanceSearch();
    }

    /// <summary>
    /// Handles the OnPageIndexChanging event of the dgPostalCodeResults control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.Web.UI.WebControls.GridViewPageEventArgs"/> instance containing the event data.</param>
    protected void PostalCodeResults_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        dgPostalCodeResults.PageIndex = e.NewPageIndex;
        ExecDistanceSearch();
    }

    /// <summary>
    /// Call Create Group from lookup results. 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnCreateGroup_OnClick(object sender, EventArgs e)
    {
        if (ExecDistanceSearch() > 0)
        {
            if (!string.IsNullOrEmpty(createGroupName.Value))
            {
                string groupName = createGroupName.Value;

                double lat, lon;
                GetLatLonForLocation(out lat, out lon);

                var groupId = DistanceSearchHelper.CreateAccountDistanceGroup(groupName,
                    lat, lon, Convert.ToDouble(cbxDistance.Text),
                    pklType.PickListValue, pklSubType.PickListValue,
                    Convert.ToInt32((!(cbxNumResults.Text == GetLocalResourceObject("Results_All").ToString() || cbxNumResults.Text == "")) ? cbxNumResults.Text : "0"),
                    CurrentRegion.IsMetric);

                //Redirect to location of group.
                Response.Redirect(string.Format("Account.aspx?gid={0}", groupId));
            }
            else
            {
                // Invalid Group Name
                DialogService.ShowMessage(GetLocalResourceObject("Error_NoGroupName").ToString());
            }
        }
        else
        {
            // No values to create a group with
            DialogService.ShowMessage(GetLocalResourceObject("Error_NoResults").ToString());
        }
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
        if (ExecDistanceSearch() > 0)
        {
            double lat, lon;
            GetLatLonForLocation(out lat, out lon);

            // Pass the query info to the map page
            ScriptManager.RegisterClientScriptBlock(this, GetType(), Guid.NewGuid().ToString(),
                string.Format(
                "if(!window.open('" + Page.ResolveClientUrl("~/SmartParts/ProximitySearch/PxMap.aspx") + "?from={0}&fromlat={1}&fromlon={2}&type={3}&dist={4}&atype={5}&asub={6}&sort={7}&asc={8}&cnt={9}&lcid={10}', '_blank')){{ alert('" + GetLocalResourceObject("Error_UnableToOpenMapWindow").ToString() + "'); }}",
                HttpUtility.UrlEncode(txtCustom.Text), lat, lon,
                HttpUtility.UrlEncode("IAccount"),
                HttpUtility.UrlEncode(cbxDistance.Text),
                HttpUtility.UrlEncode(pklType.PickListValue),
                HttpUtility.UrlEncode(pklSubType.PickListValue),
                HttpUtility.UrlEncode(Page.Session["m_sortExpression"].ToString()),
                HttpUtility.UrlEncode(((SortDirection)Page.Session["m_sortDirection"] == SortDirection.Ascending).ToString()),
                HttpUtility.UrlEncode((!(cbxNumResults.Text == GetLocalResourceObject("Results_All").ToString() || cbxNumResults.Text == "")) ? cbxNumResults.Text : "0"),
                HttpUtility.UrlEncode(Thread.CurrentThread.CurrentCulture.LCID.ToString())
                ), true);
        }
        else
        {
            DialogService.ShowMessage(GetLocalResourceObject("Error_NoResults").ToString());
        }
    }

    /// <summary>
    /// Form validation code to run prior to searching. 
    /// Throw exception if not valid.
    /// </summary>
    /// <returns></returns>
    private void ValidateInputs()
    {
        return;
    }

    /// <summary>
    /// Execute the distance search and creates the result set.
    /// </summary>
    public int ExecDistanceSearch()
    {
        ValidateInputs();

        //We use the alias AccountName to remain consistent with App Architect syntax. 
        double lat, lon;
        GetLatLonForLocation(out lat, out lon);

        var results = DistanceSearchHelper.AccountDistanceSearch(lat, lon, Convert.ToDouble(cbxDistance.Text),
            pklType.PickListValue, pklSubType.PickListValue,
            Page.Session["m_sortExpression"].ToString(),
            ((SortDirection)Page.Session["m_sortDirection"] == SortDirection.Ascending),
            (!(cbxNumResults.Text == GetLocalResourceObject("Results_All").ToString() || cbxNumResults.Text == "")) ? Convert.ToInt32(cbxNumResults.Text) : 0,
            0, CurrentRegion.IsMetric);

        dgPostalCodeResults.DataSource = null;
        dgPostalCodeResults.DataSource = results;
        dgPostalCodeResults.DataBind();

        return (results != null) ? results.Count : 0;
    }

    /// <summary>
    /// Retrieve lat/lon for either the selected location, or the one entered in the text box.
    /// If a custom location is used then the result is cached for a few minutes to avoid multiple queries to the geocoding 
    /// service.
    /// </summary>
    /// <param name="lat"></param>
    /// <param name="lon"></param>
    /// <returns></returns>
    private bool GetLatLonForLocation(out double lat, out double lon)
    {
        IAddress addr = null;
        if (cbxLocation.SelectedValue == LOCATION_CUSTOM)
        {
            addr = EntityFactory.Create<IAddress>();
            if (string.IsNullOrEmpty(txtCustom.Text))
                throw new ValidationException(GetLocalResourceObject("Custom_MissingLocation").ToString());
            string cacheKey = "ProximitySearch$Geocode$" + HttpUtility.UrlEncode(txtCustom.Text);
            if (Cache[cacheKey] != null)
            {
                addr = (IAddress)Cache[cacheKey];
            }
            else
            {
                // Just put the whole string in the address field
                addr.Address1 = txtCustom.Text;
                double? latitude, longitude;

                IGeocodeProvider provider = Saleslogix.Geocode.Managers.ProviderManager.GetProvider();
                if (provider != null && provider.GeocodeAddress(txtCustom.Text, out latitude, out longitude))
                {
                    addr.GeocodeLatitude = latitude.Value;
                    addr.GeocodeLongitude = longitude.Value;
                    addr.GeocodeProvider = provider.Source;

                    Cache.Add(cacheKey, addr, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(4),
                    System.Web.Caching.CacheItemPriority.Normal, null);
                }
            }
            if (!addr.IsGeocoded())
                throw new ValidationException(GetLocalResourceObject("Custom_UnableToLocate").ToString());
        }
        else
        {
            string addrId = cbxLocation.SelectedValue;
            addr = EntityFactory.GetById<IAddress>(addrId);
            if (addr == null || !addr.IsGeocoded())
                throw new ValidationException(GetLocalResourceObject("Custom_AddressNotLocated").ToString());
        }

        if (addr != null)
        {
            lat = addr.GeocodeLatitude.Value;
            lon = addr.GeocodeLongitude.Value;
            return true;
        }

        lat = 0;
        lon = 0;
        return false;
    }

    /// <summary>
    /// EntityType for the form.
    /// </summary>
    public Type EntityType
    {
        get { return typeof(IAccount); }
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
        foreach (Control c in AccountDistanceSearch_RTools.Controls)
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

    public static IContextService AppContext
    {
        get { return ApplicationContext.Current.Services.Get<IContextService>(true); }
    }
}