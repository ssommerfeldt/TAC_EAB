using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using Sage.Platform.WebPortal.SmartParts;
using Sage.Platform.Application;
using Sage.Entity.Interfaces;
using Sage.SalesLogix.PickLists;
using Sage.SalesLogix.Web;

public partial class PickListDetail : EntityBoundSmartPartInfoProvider 
{
    private IPickListView _pickListView;
    private string _broswerLanguage = string.Empty;
    private bool _isLocalized;
    private bool updatedefaultLanguage;

    [ServiceDependency]
    public IEntityContextService EntityService { get; set; }

	[ServiceDependency]
	public Sage.Platform.Security.IRoleSecurityService RoleSecurityService { get; set; }
	
    public override Type EntityType
    {
        get { return typeof(IPickListView); }
    }

    protected override void InnerPageLoad(object sender, EventArgs e)
    {
    }

    protected override void OnAddEntityBindings()
    {
        Sage.Platform.WebPortal.Binding.WebEntityBinding txtPicklistNameTextBinding = new Sage.Platform.WebPortal.Binding.WebEntityBinding("PicklistName", txtPicklistName, "Text");
        BindingSource.Bindings.Add(txtPicklistNameTextBinding);
    }

    protected override void OnWireEventHandlers()
    {
        base.OnWireEventHandlers();
        btnSave.Click += btnSave_ClickAction;
        btnDelete.Click += btnDelete_ClickAction;
        btnNew.Click += btnAdd_ClickAction;
        txtTestType.SelectedIndexChanged += TestChanged;
        cboDefaultLanguage.SelectedIndexChanged += LanguageSet;
        chkFilterByLanguage.CheckedChanged += FilterByLanguageChanged;
        cboBoundLanguage.SelectedIndexChanged += BoundLanguageChanged;
        btnReset.Click += ReFreshDetails;
    }

    public void BoundLanguageChanged(object sender, EventArgs e)
    {
        pklTest.BoundLanguage = cboBoundLanguage.SelectedValue;
    }

    public void FilterByLanguageChanged(object sender, EventArgs e)
    {
        pklTest.FilterByBoundLanguage = chkFilterByLanguage.Checked;
    }

    public void LanguageSet(object sender, EventArgs e)
    {
        _isLocalized = !string.IsNullOrEmpty(cboDefaultLanguage.SelectedValue);
        ViewState["isPickListLocalized"] = _isLocalized;
        txtLangauageFallBack.Visible = _isLocalized;
        lblLangauageFallBack.Visible = _isLocalized;
        if (_isLocalized)
        {
            DefineHierarchy(_broswerLanguage);
        }
    }

    protected override void OnFormBound()
    {
        base.OnFormBound();
        ClientBindingMgr.RegisterSaveButton(btnSave);
        btnDelete.OnClientClick = string.Format("return confirm('{0}');", Sage.Platform.WebPortal.PortalUtil.JavaScriptEncode(GetLocalResourceObject("btnDelete.ActionConfirmationMessage").ToString()));
        _pickListView = (IPickListView)BindingSource.Current;
        var picklistId = Page.Session["picklistId"] as string;
        Page.Session.Add("picklistId", _pickListView.Id.ToString());
        if (picklistId == _pickListView.Id.ToString() && IsPostBack)
        {
            //there are instances where the test default item does not get updated
            AssignDefaultTestItem();
            return;
        }
        LoadView();
		if (RoleSecurityService != null && !RoleSecurityService.HasAccess("Administration/PickList/Add"))
        {
            btnNew.Visible = false;
        }
        if (RoleSecurityService != null && !RoleSecurityService.HasAccess("Administration/PickList/Delete"))
        {
            btnDelete.Visible = false;            
        }
        if (RoleSecurityService != null && !RoleSecurityService.HasAccess("Administration/PickList/Edit"))
        {
            btnSave.Visible = false;
        }
    }

    public void TestChanged(object sender, EventArgs e)
    {
        pklTest.PickListFilter = txtTestFilter.Text;
        switch (txtTestType.SelectedValue) {
            case "ID":
                pklTest.StorageMode = Sage.Platform.Controls.StorageModeEnum.ID;
                break;
            case "CODE":
                pklTest.StorageMode = Sage.Platform.Controls.StorageModeEnum.Code;
                break;
            default:
                pklTest.StorageMode = Sage.Platform.Controls.StorageModeEnum.Text;
                break;
        }
    }

    public override Sage.Platform.Application.UI.ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        var tinfo = new ToolsSmartPartInfo();
        if (BindingSource != null && BindingSource.Current != null)
        {
            tinfo.Description = BindingSource.Current.ToString();
            tinfo.Title = BindingSource.Current.ToString();
        }

        foreach (Control c in Controls)
        {
            var cont = c as SmartPartToolsContainer;
            if (cont != null)
            {
                switch (cont.ToolbarLocation)
                {
                    case SmartPartToolsLocation.Right:
                        foreach (Control tool in cont.Controls)
                        {
                            tinfo.RightTools.Add(tool);
                        }
                        break;
                    case SmartPartToolsLocation.Center:
                        foreach (Control tool in cont.Controls)
                        {
                            tinfo.CenterTools.Add(tool);
                        }
                        break;
                    case SmartPartToolsLocation.Left:
                        foreach (Control tool in cont.Controls)
                        {
                            tinfo.LeftTools.Add(tool);
                        }
                        break;
                }
            }
        }
        return tinfo;
    }

    protected void btnSave_ClickAction(object sender, EventArgs e)
    {
        _pickListView = (IPickListView)BindingSource.Current;
        PickListAttributes att = GetAttributes();
        PickList pl = PickList.GetPickListById(_pickListView.Id.ToString());
        pl.Text = txtPicklistName.Text;
        pl.Shorttext = att.ToString();
        pl.LanguageCode = cboDefaultLanguage.Text;
        pl.Id = chkIsManaged.Checked ? 1 : 0;

        PickList.SavePickList(pl);
    }

    protected void btnDelete_ClickAction(object sender, EventArgs e)
    {
        _pickListView = (IPickListView)BindingSource.Current;
        PickList pl = PickList.GetPickListById(_pickListView.Id.ToString());
        PickList.DeletePickList(pl);
        Response.Redirect("PickListView.aspx");
    }

    protected void btnAdd_ClickAction(object sender, EventArgs e)
    {
        if (DialogService != null)
        {
            DialogService.SetSpecs(200, 600, "AddPickList", string.Empty);
            DialogService.ShowDialog();
        }
    }

	private void DefineHierarchy(string rLanguage) {
        string[] split = rLanguage.Split('-');
        if (split.Length == 1)
        {
            txtLangauageFallBack.Text = string.Format("{0}{2}{1}", split[0], cboDefaultLanguage.SelectedValue, " > ");
        }
        else if (split.Length == 2)
        {
            var langCodeStr = string.Empty;
            if (!string.IsNullOrWhiteSpace(cboDefaultLanguage.SelectedValue))
            {
                langCodeStr = string.Format("{0}{1}", " > ", cboDefaultLanguage.SelectedValue);
            }
            txtLangauageFallBack.Text = string.Format("{0}-{1}{3}{0}{2}", split[0], split[1], langCodeStr, " > ");
        }
    }

    protected void ReFreshDetails(object sender, EventArgs e) {
        LoadView();
    }

    private void LoadView()
    {
        if (_pickListView == null)
        {
            _pickListView = (IPickListView)BindingSource.Current;
        }
        var id = string.IsNullOrWhiteSpace(NextPickListIdHeader.Value) ? _pickListView.Id.ToString() : NextPickListIdHeader.Value;
        var pl = PickList.GetPickListById(id);
        if (!cboDefaultLanguage.Items.Contains(new ListItem(string.Empty)))
        {
            cboDefaultLanguage.Items.Insert(0, new ListItem(string.Empty, null));
        }
        cboDefaultLanguage.SelectedIndex = 0;
        _broswerLanguage = Request.Cookies["SLXLanguageSetting"].Value;
        var defaultLanguage = (pl.LanguageCode ?? string.Empty).ToLowerInvariant();
        _isLocalized = !string.IsNullOrWhiteSpace(defaultLanguage);
        ViewState["isPickListLocalized"] = _isLocalized;
        AssignDefaultTestItem();
        updatedefaultLanguage = !IsPostBack || cboDefaultLanguage.Items.Count <= 2 || cboBoundLanguage.Items.Count == 0;
        /* 
         * If a picklist is localized or not will be determined by if it has a default language value
         *  - a default language value means the picklist is localized... or should be.
         *  - once the default langauge value is set, the control will be disabled.
         */
        if (updatedefaultLanguage)
        {
            // reloading the list may clear a selected item when the page reloads.
            cboDefaultLanguage.Items.Clear();
            cboBoundLanguage.Items.Clear();
            var cultures = PickListHelper.GetLanguageList<EnabledLanguage>(PickListHelper.LanguageListTypes.Cultures);
            var neutrals = PickListHelper.GetLanguageList<EnabledLanguage>(PickListHelper.LanguageListTypes.Neutrals);
            EnabledLanguage validLanguageCode = string.IsNullOrWhiteSpace(defaultLanguage) ? null : RegionList.Cultures.Find(x => x.CultureCode.Equals(defaultLanguage, StringComparison.OrdinalIgnoreCase));

            // since the list is being disabled when localized, only one item needs to be displayed, as long as it is valid.
            if (validLanguageCode != null)
            {
                cboDefaultLanguage.Items.Insert(0, new ListItem(validLanguageCode.DisplayText, (validLanguageCode.CultureCode ?? defaultLanguage).ToLowerInvariant()));
            }
            else {
                neutrals.ForEach(c => cboDefaultLanguage.Items.Add(new ListItem(c.DisplayText, (c.CultureCode ?? string.Empty).ToLowerInvariant())));
            }
            cultures.ForEach(c => cboBoundLanguage.Items.Add(new ListItem(c.DisplayText, (c.CultureCode ?? string.Empty).ToLowerInvariant())));
            cboBoundLanguage.Items.Insert(0, new ListItem(string.Empty, null));
            cboDefaultLanguage.Items.Insert(0, new ListItem(string.Empty, null));
        }
        if (string.IsNullOrWhiteSpace(cboDefaultLanguage.Text))
        {
            if (string.IsNullOrWhiteSpace(defaultLanguage))
            {
                cboDefaultLanguage.SelectedIndex = 0;
            }
            else
            {
                if (!cboDefaultLanguage.Items.Contains(new ListItem(defaultLanguage)))
                {
                    cboDefaultLanguage.Items.Clear();
                    cboDefaultLanguage.Items.Add(new ListItem(defaultLanguage));
                    cboDefaultLanguage.Items.Insert(0, new ListItem(string.Empty, null));
                }
                cboDefaultLanguage.SelectedValue = defaultLanguage.ToLowerInvariant();
            }
        }
        else
        {
            cboDefaultLanguage.SelectedValue = (cboDefaultLanguage.Text ?? string.Empty).ToLowerInvariant();
        }
        cboDefaultLanguage.Enabled = !_isLocalized;
        cboBoundLanguage.SelectedIndex = 0;
        PickListAttributes att = PickList.GetAttributes(pl.Shorttext);
        SetAttributes(att);
        pklTest.PickListName = pl.Text;
        pklTest.DefaultLanguage = defaultLanguage;
        pklTest.PickListValue = string.Empty;
        pklTest.AllowMultiples = att.AllowMultiples;
        pklTest.AlphaSort = att.AlphaSorted;
        pklTest.CanEditText = !att.NoneEditable;
        pklTest.MustExistInList = att.ValueMustExist || _isLocalized;
        pklTest.BoundLanguage = cboBoundLanguage.SelectedValue;
        pklTest.FilterByBoundLanguage = chkFilterByLanguage.Checked;
        
        txtLangauageFallBack.Visible = _isLocalized;
        lblLangauageFallBack.Visible = _isLocalized;
        if (_isLocalized)
        {
            DefineHierarchy(_broswerLanguage);
        }

        chkIsManaged.Checked = pl.Id.Value == 1;
        pklTest.Required = false; //We can test required during test. or we then could not save the picklist because of validation.
    }

    private void AssignDefaultTestItem()
    {
        var defItem = PickList.GetDefaultItemByCode(_pickListView.Id.ToString(), true);
        txtDefaultValue.Text = defItem != null ? defItem.Text : string.Empty;
    }

    private PickListAttributes GetAttributes()
    {
        return new PickListAttributes
        {
            AllowMultiples = chkAllowMulltiple.Checked,
            ValueMustExist = chkMustMatch.Checked,
            Required = chkRequired.Checked,
            AlphaSorted = chkSorted.Checked,
            NoneEditable = chkUsersCanEdit.Checked
        };
    }

    private void SetAttributes(PickListAttributes att)
    {
        chkAllowMulltiple.Checked = att.AllowMultiples;
        chkMustMatch.Checked = att.ValueMustExist;
        chkRequired.Checked = att.Required;
        chkSorted.Checked = att.AlphaSorted;
        chkUsersCanEdit.Checked = att.NoneEditable;

        if (!string.IsNullOrWhiteSpace(cboDefaultLanguage.Text))
        {
            cboDefaultLanguage.Enabled = false;
            cboDefaultLanguage.Attributes.Add("disabled", ""); // this attribute is not added by simply setting a listbox control to Enabled = false.
            chkMustMatch.Checked = true;
            chkMustMatch.Enabled = false;
        }
        else
        {
            cboDefaultLanguage.Attributes.Remove("disabled");
            cboDefaultLanguage.Enabled = true;
            chkMustMatch.Enabled = true;
        }
    }
}