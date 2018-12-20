using System;
using System.Collections.Generic;
using System.Text;
using System.Web.UI;
using System.Web.UI.WebControls;
using NHibernate;
using NHibernate.Criterion;
using Sage.Entity.Interfaces;
using Sage.Platform;
using Sage.Platform.Application;
using Sage.Platform.Application.UI;
using Sage.Platform.Orm;
using Sage.Platform.WebPortal;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.PickLists;

public partial class SmartPart_PickListItems : EntityBoundSmartPartInfoProvider
{
    private IPickListItemView _defaultItem;
    private IPickListView _pickListView;
    private string _sortExpression;
    private bool _sortDirection;
    private const string AllItems = "ALL";

    [ServiceDependency]
    public IEntityContextService EntityService { get; set; }
	
	[ServiceDependency]
	public Sage.Platform.Security.IRoleSecurityService RoleSecurityService { get; set; }

    public override Type EntityType
    {
        get { return typeof(IPickListView); }
    }

    protected override void OnAddEntityBindings()
    {
    }

    protected override void OnWireEventHandlers()
    {
        btnAdd.Click += btnAdd_ClickAction;
        grdPicklistItems.PageIndexChanging += grdPicklistItems_PageIndexChanging;
        cboViewedLanguage.SelectedIndexChanged += cboViewedLanguage_SelectedIndexChanged;
        DialogService.onDialogClosing += cboViewedLanguage_SelectedIndexChanged;
        base.OnWireEventHandlers();
    }

    protected override void OnFormBound()
    {
        base.OnFormBound();
        Hydrate();
        var str = ViewState["RunFormOnLoadLoadGrid"];
        str = str == null ? "false" : str.ToString();
        if (!IsPostBack || bool.Parse((string) str))
        {
            LoadGrid();
            ViewState.Remove("RunFormOnLoadLoadGrid");
        }
		if (RoleSecurityService != null && !RoleSecurityService.HasAccess("Administration/PickList/Add"))
        {
            btnAdd.Visible = false;
        }
        if (RoleSecurityService != null && !RoleSecurityService.HasAccess("Administration/PickList/Delete"))
        {
           grdPicklistItems.Columns[8].Visible = false;            
        }
        if (RoleSecurityService != null && !RoleSecurityService.HasAccess("Administration/PickList/Edit"))
        {
           grdPicklistItems.Columns[7].Visible = false;
        }
    }

    private void Hydrate()
    {
        _pickListView = GetPickListView();
        if (_pickListView != null)
        {
            _defaultItem = GetDefaultItem(_pickListView);
            cboViewedLanguage.Items.Clear();
            cboViewedLanguage.Items.Insert(0, new ListItem(GetLocalResourceObject("AllItems").ToString(), AllItems));
            IList<string> codes = PickList.GetLanguageCodesInUse(true);
            foreach (var code in codes)
            {
                if (!string.IsNullOrWhiteSpace(code))
                {
                    cboViewedLanguage.Items.Add(new ListItem(code, code));
                }
            }
            cboViewedLanguage.SelectedValue = (string)ViewState["PickListItemLanguageFilter"] ?? AllItems;
        }
    }

    protected void cboViewedLanguage_SelectedIndexChanged(object sender, EventArgs e)
    {
        ViewState["PickListItemLanguageFilter"] = cboViewedLanguage.SelectedValue;
        Hydrate();
        LoadGrid();
    }
    protected void btnAdd_ClickAction(object sender, EventArgs e)
    {
        if (DialogService != null)
        {
            DialogService.SetSpecs(285, 600, "AddEditPickListItem");
            DialogService.DialogParameters.Clear();
            DialogService.DialogParameters.Add("MODE", PickListHelper.DialogTypes.Add);
            DialogService.ShowDialog();
        }
    }

    private int _deleteColumnIndex = -2;
    protected int DeleteColumnIndex
    {
        get
        {
            if (_deleteColumnIndex == -2)
            {
                var bias = grdPicklistItems.ExpandableRows ? 1 : 0;
                _deleteColumnIndex = -1;
                var colcount = 0;
                foreach (DataControlField col in grdPicklistItems.Columns)
                {
                    var btn = col as ButtonField;
                    if (btn != null)
                    {
                        if (PickListHelper.StringToDialogTypes(btn.CommandName) == PickListHelper.DialogTypes.Delete)
                        {
                            _deleteColumnIndex = colcount + bias;
                            break;
                        }
                    }
                    colcount++;
                }
            }
            return _deleteColumnIndex;
        }
    }

    int _localizeColumnIndex = -2;
    protected int LocalizeColumnIndex
    {
        get
        {
            if (_localizeColumnIndex == -2)
            {
                var bias = grdPicklistItems.ExpandableRows ? 1 : 0;
                _localizeColumnIndex = -1;
                var colcount = 0;
                foreach (DataControlField col in grdPicklistItems.Columns)
                {
                    var btn = col as ButtonField;
                    if (btn != null)
                    {
                        if (PickListHelper.StringToDialogTypes(btn.CommandName) == PickListHelper.DialogTypes.Localize)
                        {
                            _localizeColumnIndex = colcount + bias;
                            break;
                        }
                    }
                    colcount++;
                }
            }
            return _localizeColumnIndex;
        }
    }

    protected void grdPicklistItems_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        GridViewRow row = e.Row;
        var rowData = (List<IPickListItemView>)((Sage.SalesLogix.Web.Controls.SlxGridView)sender).DataSource;
        AppendJavaScriptOnClickDeletionCode(row, rowData);
    }
    private void AppendJavaScriptOnClickDeletionCode(GridViewRow row, List<IPickListItemView> rowData)
    {
        if (row.RowType == DataControlRowType.DataRow)
        {
            // Get the LinkButton control for the Delete 
            if (DeleteColumnIndex >= 0 && DeleteColumnIndex < row.Cells.Count)
            {
                string pickListItemId = null;
                if (rowData != null)
                {
                    IPickListItemView pklivRow = rowData[row.RowIndex];
                    if (pklivRow != null)
                    {
                        pickListItemId = pklivRow.PickListItemId;
                    }
                }

                var dialogBody = GenerateRowApporiateDeletionWarning(pickListItemId);
                TableCell cell = row.Cells[DeleteColumnIndex];
                foreach (Control c in cell.Controls)
                {
                    var btn = c as LinkButton;
                    if (btn != null)
                    {
                        var script = new StringBuilder();
                        script.AppendLine(" javascript: return require(['dojo/topic'], function(topic, ) {return function confirmation() {");
                        script.AppendLine(" var answer = confirm('" + dialogBody + "');");
                        script.AppendLine(" if (answer) {");
                        script.AppendLine(" (removePickListCache())()");
                        if (_pickListView != null && !string.IsNullOrWhiteSpace((string)_pickListView.Id))
                        {
                            script.AppendLine("topic.publish('/group/context/changed/picklistview/item/removed', { toEntityId: '" + _pickListView.Id + "', updateTest: 1 });");
                        }
                        script.AppendLine(" }");
                        script.AppendLine(" return answer;");
                        script.AppendLine(" }(); });");
                        btn.Attributes.Add("onclick", script.ToString());
                    }
                }
                grdPicklistItems.Columns[LocalizeColumnIndex + 1].Visible = _pickListView != null && !string.IsNullOrWhiteSpace(_pickListView.DefaultLanguage);
            }
        }
    }
    private string GenerateRowApporiateDeletionWarning(string pickListItemId)
    {
        var deleteAll = !string.IsNullOrEmpty(pickListItemId) && PickList.IsItemADefaultLanguageItem(pickListItemId);
        var msg = new StringBuilder();
        msg.Append(GetLocalResourceObject("ConfirmMessage"));
        if (deleteAll)
        {
            msg.Append(Environment.NewLine);
            msg.Append(GetLocalResourceObject("DeleteAllAddendum"));
        }
        return PortalUtil.JavaScriptEncode(msg.ToString());
    }
    protected void grdPicklistItems_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        if (e == null || string.IsNullOrWhiteSpace(e.CommandName))
        {
            return;
        }
        PickListHelper.DialogTypes commandName = PickListHelper.StringToDialogTypes(e.CommandName);
        switch (commandName)
        {
            case PickListHelper.DialogTypes.Edit:
                var editRowIndex = Convert.ToInt32(e.CommandArgument);
                if (DialogService != null)
                {
                    DialogService.SetSpecs(285, 600, "AddEditPickListItem");
                    DialogService.DialogParameters.Clear();
                    DialogService.DialogParameters.Add("MODE", PickListHelper.DialogTypes.Edit);
                    DialogService.DialogParameters.Add("PickListId", grdPicklistItems.DataKeys[editRowIndex].Values[1].ToString());
                    DialogService.DialogParameters.Add("PickListItemId", grdPicklistItems.DataKeys[editRowIndex].Values[0].ToString());
                    DialogService.ShowDialog();
                }
                break;
            case PickListHelper.DialogTypes.Delete:
                var deleteRowIndex = Convert.ToInt32(e.CommandArgument);
                var selectedItem = PickList.GetPickListItemById(
                    grdPicklistItems.DataKeys[deleteRowIndex].Values[1].ToString(),
                    grdPicklistItems.DataKeys[deleteRowIndex].Values[0].ToString());
                var isDefaultLanguage = PickList.IsItemADefaultLanguageItem(selectedItem);
                if (isDefaultLanguage)
                {
                    PickList.DeletePickListItemsByCode(selectedItem);
                }
                else
                {
                    PickList.DeletePickList(selectedItem);
                }
                var picklistService = ApplicationContext.Current.Services.Get<IPickListService>(true);
                picklistService.ClearPickListCache();
                var refresher = PageWorkItem.Services.Get<IPanelRefreshService>();
                refresher.RefreshAll();
                break;
            case PickListHelper.DialogTypes.Localize:
                string[] ids = e.CommandArgument.ToString().Split(';');
                if (DialogService != null)
                {
                    DialogService.SetSpecs(285, 600, "AddEditPickListItem");
                    DialogService.DialogParameters.Clear();
                    DialogService.DialogParameters.Add("MODE", PickListHelper.DialogTypes.Localize);
                    DialogService.DialogParameters.Add("PickListId", ids[0]);
                    DialogService.DialogParameters.Add("PickListItemId", ids[1]);
                    DialogService.ShowDialog();
                }
                break;
        }
    }

    protected bool IsDefault(object val)
    {
        if (val != null && _defaultItem != null)
        {
            string itemId = val.ToString();
            if (_defaultItem.PickListItemId == itemId)
            {
                return true;
            }
        }
        return false;
    }

    protected void grdPicklistItems_RowEditing(object sender, GridViewEditEventArgs e)
    {
        grdPicklistItems.SelectedIndex = e.NewEditIndex;
        e.Cancel = true;
    }

    protected void grdPicklistItems_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        Hydrate();
        LoadGrid();
    }

    protected void grdPicklistItems_Sorting(object sender, GridViewSortEventArgs e)
    {
        _sortDirection = e.SortDirection == SortDirection.Ascending;
        _sortExpression = e.SortExpression;
        var refresher = PageWorkItem.Services.Get<IPanelRefreshService>();
        refresher.RefreshAll();
    }

    protected void grdPicklistItems_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        ViewState["PickListItemLanguageFilter"] = AllItems;
        grdPicklistItems.PageIndex = e.NewPageIndex;
        Hydrate();
        LoadGrid();
    }
    protected bool ShowLocalize(object lcode)
    {
        if (lcode == null)
        {
            return false;
        }
        var languageCode = lcode.ToString();
        return _pickListView != null && !string.IsNullOrWhiteSpace(_pickListView.DefaultLanguage) &&
               !string.IsNullOrWhiteSpace(languageCode) && languageCode.Equals(_pickListView.DefaultLanguage, StringComparison.OrdinalIgnoreCase);
    }
    private void LoadGrid()
    {
        if (_pickListView != null)
        {
            grdPicklistItems.DataSource = GetItems(_pickListView);
            _sortExpression = grdPicklistItems.CurrentSortExpression;
            SetSortDirection(grdPicklistItems.CurrentSortDirection);
            grdPicklistItems.DataBind();
        }
        if (grdPicklistItems != null)
        {
            foreach (GridViewRow row in grdPicklistItems.Rows)
            {
                var pliv = (List<IPickListItemView>)grdPicklistItems.DataSource;
                if (row != null && pliv != null)
                {
                    AppendJavaScriptOnClickDeletionCode(row, pliv);
                }
            }
        }
    }

    private IList<IPickListItemView> GetItems(IPickListView pickList)
    {
        using (ISession session = new SessionScopeWrapper(true))
        {
            if (string.IsNullOrEmpty(_sortExpression))
            {
                _sortExpression = "OrderSeq";
            }
            var query = session.QueryOver<IPickListItemView>()
                .Where(x => x.UserId == "ADMIN" && x.PickListId == (string) pickList.Id);
            if (!cboViewedLanguage.SelectedValue.Equals(AllItems))
            {
                query.WhereRestrictionOn(x => x.LanguageCode).IsInsensitiveLike(cboViewedLanguage.Text);
            }
            query.UnderlyingCriteria.AddOrder(new Order(_sortExpression, _sortDirection));
            return query.List();
        }
    }

    private IPickListView GetPickListView()
    {
        var nextId = NextPickListId.Value;
        NextPickListId.Value = null;
        if (!string.IsNullOrWhiteSpace(nextId))
        {
            BindingSource.Current = EntityFactory.GetById<IPickListView>(nextId);
            ViewState["RunFormOnLoadLoadGrid"] = true;
        }
        var plv = BindingSource.Current as IPickListView;
        if (plv != null)
        {
            using (ISession session = new SessionScopeWrapper(true))
            {
                return session.QueryOver<IPickListView>()
                    .Where(x => x.Id == plv.Id)
                    .SingleOrDefault();
            }
        }
        return null;
    }

    private IPickListItemView GetDefaultItem(IPickListView picklistView)
    {
        if (picklistView.DefaultIndex.HasValue && picklistView.DefaultIndex.Value >= 0)
        {
            PickList plItem = PickList.GetDefaultItemByCode(picklistView.Id.ToString(), true);
            if (plItem != null)
            {
                var idNames = new[] { "PickListId", "PickListItemId" };
                var ids = new object[] { plItem.PickListId, plItem.ItemId };
                return EntityFactory.GetByCompositeId(typeof(IPickListItemView), idNames, ids) as IPickListItemView;
            }
        }
        return null;
    }

    private void SetSortDirection(string sortDir)
    {
        _sortDirection = sortDir == SortDirection.Ascending.ToString();
    }

    public override ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        var tinfo = new ToolsSmartPartInfo();
        foreach (Control c in Items_LTools.Controls)
        {
            tinfo.LeftTools.Add(c);
        }
        foreach (Control c in Items_CTools.Controls)
        {
            tinfo.CenterTools.Add(c);
        }
        foreach (Control c in Items_RTools.Controls)
        {
            tinfo.RightTools.Add(c);
        }
        return tinfo;
    }
}