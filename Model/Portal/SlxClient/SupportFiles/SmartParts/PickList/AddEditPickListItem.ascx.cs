using System;
using System.Collections.Generic;
using System.Web.UI;
using System.Web.UI.WebControls;
using Sage.Platform.WebPortal.SmartParts;
using Sage.Platform.Application;
using Sage.Platform;
using Sage.Entity.Interfaces;
using Sage.SalesLogix.PickLists;
using Sage.SalesLogix.Web;
using Sage.Platform.WebPortal.Services;

public partial class AddEditPickListItem : EntityBoundSmartPartInfoProvider
{
    private IPickListView _pickListView;
    private IPickListItemView _pickListItemView;
    private string _mode;
    private bool _inDefaultLanguage;
    private bool _isPickListLocalized;

    [ServiceDependency]
    public IEntityContextService EntityService { get; set; }

    public override Type EntityType
    {
        get { return typeof(IPickListItemView); }
    }

    protected void Page_Init(object sender, EventArgs e)
    {
        txtItemText.MaxLength = 64;
        txtCode.MaxLength = 64;
        txtOrder.MaxLength = 10;
        txtFilter.MaxLength = 256;
    }

    protected override void OnAddEntityBindings()
    {
    }

    protected override void OnWireEventHandlers()
    {
        base.OnWireEventHandlers();
        btnOK.Click += btnOK_Click;
        btnOK.Click += DialogService.CloseEventHappened;
        btnCancel.Click += DialogService.CloseEventHappened;
        btnSaveNew.Click += btnSaveNew_Click;
    }

    protected override void OnFormBound()
    {
        base.OnFormBound();
        if (DialogService.DialogParameters.Count > 0)
        {
            object mode;
            hdMode.Value = string.Empty;
            if (DialogService.DialogParameters.TryGetValue("MODE", out mode))
            {
                _mode = mode.ToString();
                hdMode.Value = _mode;
            }

            object pickListId;
            hdPickListId.Value = string.Empty;

            DialogService.DialogParameters.TryGetValue("PickListId", out pickListId);
            _pickListView = getPickListHeader((string)pickListId);
            hdPickListId.Value = _pickListView.Id.ToString();
            _isPickListLocalized = !string.IsNullOrWhiteSpace(_pickListView.DefaultLanguage);
            string defaultLanguage = Request.Cookies["SLXLanguageSetting"].Value ?? _pickListView.DefaultLanguage ?? "en";
            defaultLanguage = defaultLanguage.ToLowerInvariant();
            cboLanguage.Items.Clear();
            List<EnabledLanguage> cultures = PickListHelper.GetLanguageList<EnabledLanguage>(PickListHelper.LanguageListTypes.Cultures);
            cultures.ForEach(ci => cboLanguage.Items.Add(new ListItem(text: ci.DisplayText, value: ci.CultureCode.ToLowerInvariant())));
            EnabledLanguage lostLanguage = string.IsNullOrWhiteSpace(defaultLanguage) ? null : RegionList.Cultures.Find(x => x.CultureCode.Equals(defaultLanguage, StringComparison.OrdinalIgnoreCase));
            if (lostLanguage == null)
            {
                cboLanguage.Items.Add(new ListItem(defaultLanguage, defaultLanguage));
            }
            if (!_isPickListLocalized)
            {
                cboLanguage.Items.Insert(0,
                    new ListItem(string.Empty, null)
                );
            }
            object pickListItemId;
            hdPickListItemId.Value = string.Empty;
            if (DialogService.DialogParameters.TryGetValue("PickListItemId", out pickListItemId))
            {
                var idNames = new[] { "PickListItemId", "PickListId" };
                var ids = new[] { pickListItemId, pickListId };
                _pickListItemView = EntityFactory.GetByCompositeId(typeof(IPickListItemView), idNames, ids) as IPickListItemView;
                hdPickListItemId.Value = pickListItemId.ToString();
            }
        }
        LoadView();
    }
    private IPickListView getPickListHeader(string pickListId) {
        return string.IsNullOrWhiteSpace(pickListId) ? (IPickListView)GetParentEntity() : EntityFactory.GetById<IPickListView>(pickListId);
    }
    public override Sage.Platform.Application.UI.ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        var tinfo = new ToolsSmartPartInfo();
        switch (PickListHelper.StringToDialogTypes(_mode))
        {
            case PickListHelper.DialogTypes.Edit:
                tinfo.Description = GetLocalResourceObject("DialogTitleEdit").ToString();
                tinfo.Title = GetLocalResourceObject("DialogTitleEdit").ToString();
                break;
            case PickListHelper.DialogTypes.Localize:
                tinfo.Description = GetLocalResourceObject("DialogTitleLocalize").ToString();
                tinfo.Title = GetLocalResourceObject("DialogTitleLocalize").ToString();
                break;
            default:
                tinfo.Description = GetLocalResourceObject("DialogTitleAdd").ToString();
                tinfo.Title = GetLocalResourceObject("DialogTitleAdd").ToString();
                break;
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

    protected void btnOK_Click(object sender, EventArgs e)
    {
        SaveItem();
        DialogService.DialogParameters.Remove("PickListItemId");
        DialogService.DialogParameters.Remove("MODE");
    }

    protected void btnSaveNew_Click(object sender, EventArgs e)
    {
        //save dialog form
        SaveItem();
        PickListHelper.DialogTypes dtMode = PickListHelper.StringToDialogTypes(hdMode.Value);
        var isLocalized = dtMode == PickListHelper.DialogTypes.Localize;
        // clean up service values
        DialogService.DialogParameters.Remove("MODE");
        if (!isLocalized)
        {
            DialogService.DialogParameters.Remove("PickListItemId");
        }
        // set service to add mode
        DialogService.DialogParameters.Add("MODE", isLocalized ? PickListHelper.DialogTypes.Localize : PickListHelper.DialogTypes.Add);
        // close the current dialog to refresh the dialog title, tools, and controls
        Page.ClientScript.RegisterOnSubmitStatement(typeof(Page), "closePage", "window.onunload = CloseWindow();");
        // bring up the new dialog
        DialogService.ShowDialog();
    }

    private void SaveItem()
    {
        _pickListView = getPickListHeader(null);
        _isPickListLocalized = !string.IsNullOrWhiteSpace(_pickListView.DefaultLanguage);
        if (string.IsNullOrEmpty(txtItemText.Text))
        {
            throw new ValidationException(GetLocalResourceObject("error_InvalidItemName").ToString());
        }
        if (_isPickListLocalized && string.IsNullOrEmpty(txtCode.Text))
        {
            throw new ValidationException(GetLocalResourceObject("error_InvalidItemCode").ToString());
        }
        var keyChanged = false;
        if (_pickListItemView == null && !string.IsNullOrEmpty(hdPickListItemId.Value) && !string.IsNullOrEmpty(hdPickListId.Value))
        {
            _pickListItemView = EntityFactory.GetByCompositeId(typeof(IPickListItemView), new[] { "PickListItemId", "PickListId" }, new object[] { hdPickListItemId.Value, hdPickListId.Value }) as IPickListItemView;
        }
        if (_pickListItemView != null)
        {
            keyChanged = !string.Equals(_pickListItemView.Code, txtCode.Text) || !string.Equals(_pickListItemView.LanguageCode, cboLanguage.SelectedValue);
        }
        PickListHelper.DialogTypes dtMode = PickListHelper.StringToDialogTypes(hdMode.Value);
        if (keyChanged || (string.IsNullOrEmpty(hdPickListItemId.Value) && dtMode == PickListHelper.DialogTypes.Add) || dtMode == PickListHelper.DialogTypes.Localize)
        {
            var order = Convert.ToInt32(txtOrder.Text);
            PickList pl = PickList.AddNewPickListItem(hdPickListId.Value, txtItemText.Text, txtCode.Text, txtFilter.Text, cboLanguage.SelectedValue, order, string.Empty);
            if (chkIsDefaultItem.Checked)
            {
                PickList.SetAsDefaultItemCode(hdPickListId.Value, pl.ItemId);
            }
        }
        else
        {
            PickList pl = PickList.GetPickListItemById(hdPickListId.Value, hdPickListItemId.Value);
            pl.Shorttext = txtCode.Text;
            pl.Text = txtItemText.Text;
            var orderValue = Convert.ToInt32(txtOrder.Text);
            pl.Id = orderValue;
            pl.Filter = txtFilter.Text;
            pl.LanguageCode = cboLanguage.SelectedValue;
            PickList.SavePickListItem(pl);

            if (chkIsDefaultItem.Checked && string.IsNullOrEmpty(hdIsDefault.Value))
            {
                PickList.SetAsDefaultItemCode(hdPickListId.Value, pl.ItemId);
            }
            if (!chkIsDefaultItem.Checked && !string.IsNullOrEmpty(hdIsDefault.Value))
            {
                PickList.SetAsDefaultItemCode(hdPickListId.Value, string.Empty);
            }
        }
        var picklistService = ApplicationContext.Current.Services.Get<IPickListService>(true);
        picklistService.ClearPickListCache();
        var refresher = PageWorkItem.Services.Get<IPanelRefreshService>();
        refresher.RefreshAll();
    }


    private void LoadView()
    {
        _inDefaultLanguage = false;
        if (_pickListItemView != null)
        {
            _inDefaultLanguage = _inDefaultLanguage || _pickListView.DefaultLanguage == _pickListItemView.LanguageCode;

            txtCode.Text = _pickListItemView.Code;
            txtItemText.Text = _pickListItemView.Text;
            txtOrder.Text = _pickListItemView.OrderSeq.ToString();
            txtFilter.Text = _pickListItemView.Filter;

            SetDefaultFlag();
        }
        else
        {
            txtCode.Text = string.Empty;
            txtItemText.Text = string.Empty;
            txtOrder.Text = _pickListView != null ? Convert.ToString(PickList.GetNextOrderNumber(_pickListView.Id.ToString())) : "-1";
            txtFilter.Text = string.Empty;
            chkIsDefaultItem.Checked = false;
        }

        switch (PickListHelper.StringToDialogTypes(_mode))
        {
            case PickListHelper.DialogTypes.Add:
                cboLanguage.Text = _isPickListLocalized ? _pickListView.DefaultLanguage.ToLowerInvariant() : string.Empty;
                txtCode.Enabled = true;
                txtOrder.Enabled = true;
                txtFilter.Enabled = true;
                cboLanguage.Enabled = !_isPickListLocalized;
                chkIsDefaultItem.Enabled = true;
                break;
            case PickListHelper.DialogTypes.Localize:
                cboLanguage.Text = Request.Cookies["SLXLanguageSetting"].Value ?? _pickListView.DefaultLanguage.ToLowerInvariant();
                txtCode.Enabled = false;
                txtOrder.Enabled = false;
                txtFilter.Enabled = false;
                cboLanguage.Enabled = _isPickListLocalized;
                chkIsDefaultItem.Enabled = false;
                break;
            default:
                var defaultLanguage = _isPickListLocalized ? "en" : string.Empty;
                if (_pickListItemView != null && _pickListItemView.LanguageCode != null)
                {
                    defaultLanguage = _pickListItemView.LanguageCode;
                }
                else if (Request != null && Request.Cookies["SLXLanguageSetting"] != null && !string.IsNullOrWhiteSpace(Request.Cookies["SLXLanguageSetting"].Value))
                {
                    defaultLanguage = Request.Cookies["SLXLanguageSetting"].Value;
                }
                else if (_pickListView != null && _pickListView.DefaultLanguage != null)
                {
                    defaultLanguage = _pickListView.DefaultLanguage;
                }
                if (!string.IsNullOrWhiteSpace(defaultLanguage))
                {
                    if (!cboLanguage.Items.Contains(new ListItem(defaultLanguage)))
                    {
                        cboLanguage.Items.Add(new ListItem(defaultLanguage));
                    }
                    cboLanguage.SelectedValue = defaultLanguage;
                }
                else
                {
                    cboLanguage.SelectedIndex = 0;
                }
                txtCode.Enabled = !_isPickListLocalized || _inDefaultLanguage;
                txtOrder.Enabled = !_isPickListLocalized || _inDefaultLanguage;
                txtFilter.Enabled = !_isPickListLocalized || _inDefaultLanguage;
                cboLanguage.Enabled = true;
                chkIsDefaultItem.Enabled = !_isPickListLocalized || _inDefaultLanguage;
                break;
        }
        if (!cboLanguage.Enabled)
        {
            cboLanguage.Attributes.Add("disabled", "");
        }
        else
        {
            cboLanguage.Attributes.Remove("disabled");
        }
        txtItemText.Focus();
    }

    private void SetDefaultFlag()
    {
        chkIsDefaultItem.Checked = false;
        chkIsDefaultItem.Enabled = _inDefaultLanguage;
        hdIsDefault.Value = string.Empty;
        if (_pickListView != null)
        {
            IPickListItemView defaultItem = GetDefaultItem(_pickListView);
            if (defaultItem != null)
            {
                foreach (string str in _pickListItemView.Ids)
                {
                    if (defaultItem.PickListItemId == str)
                    {
                        chkIsDefaultItem.Checked = true;
                        hdIsDefault.Value = "True";
                    }
                }
            }
        }
    }

    private IPickListItemView GetDefaultItem(IPickListView pickListView)
    {
        if ((pickListView.DefaultIndex.HasValue) && (pickListView.DefaultIndex.Value >= 0))
        {
            PickList plItem = PickList.GetDefaultItemByCode(pickListView.Id.ToString(), true);
            if (plItem != null)
            {
                var idNames = new[] { "PickListId", "PickListItemId" };
                var ids = new object[] { plItem.PickListId, plItem.ItemId };
                return EntityFactory.GetByCompositeId(typeof(IPickListItemView), idNames, ids) as IPickListItemView;
            }
        }
        return null;
    }
}