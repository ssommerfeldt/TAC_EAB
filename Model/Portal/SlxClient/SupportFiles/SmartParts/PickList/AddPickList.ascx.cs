using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Web.UI;
using System.Web.UI.WebControls;
using Sage.Platform.Application;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.PickLists;
using Sage.SalesLogix.Web;

public partial class AddPickList : EntityBoundSmartPartInfoProvider 
{
    public override Type EntityType
    {
        get { return typeof(Sage.Entity.Interfaces.IPickListView); }
    }

    protected void Page_Init(object sender, EventArgs e)
    {
        txtPicklistName.MaxLength = 64;
    }

    protected override void OnAddEntityBindings()
    {
    }

    protected override void OnWireEventHandlers()
    {
        base.OnWireEventHandlers();
        txtPicklistName.TextChanged += btnOK_Click;
        btnOK.Click += btnOK_Click;
        btnOK.Click += DialogService.CloseEventHappened;
        btnCancel.Click += DialogService.CloseEventHappened;
    }

    protected override void OnFormBound()
    {
        base.OnFormBound();
        LoadView();
    }

    public override Sage.Platform.Application.UI.ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        ToolsSmartPartInfo tinfo = new ToolsSmartPartInfo();
        tinfo.Description = GetLocalResourceObject("DialogTitle").ToString();
        tinfo.Title = GetLocalResourceObject("DialogTitle").ToString();

        foreach (Control c in Controls)
        {
            SmartPartToolsContainer cont = c as SmartPartToolsContainer;
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
        var originType = sender.GetType().Name;
        Button control = null;
        if (originType.Equals("button",StringComparison.OrdinalIgnoreCase)) {
            control = (Button)sender;
        }

        if (control!=null && control.ClientID.Equals(btnOK.ClientID, StringComparison.OrdinalIgnoreCase))
        {
            SaveItem();
        }
    }
    
    private void SaveItem()
    {
        IPickListService pls = new PickListService();
        
        if (PickList.NameAlreadyExists(txtPicklistName.Text))
        {
            throw new ValidationException(GetLocalResourceObject("error_InvalidPickListName").ToString());
        }
        else
        {
            PickList npl = pls.AddNewPickList(txtPicklistName.Text, cboDefaultLanguage.SelectedValue);
            if (npl != null)
            {
                Response.Redirect(string.Format("~/{0}.aspx?entityId={1}", "PickListView", npl.ItemId), false);
            }
        }
    }

    private void LoadView()
    {
        txtPicklistName.Text = PickList.GetUniqueName("");
        string defaultLanguage = EnabledLanguageList.GetNeutralLanguageCode(this.Request.Cookies["SLXLanguageSetting"].Value);
        cboDefaultLanguage.Items.Clear();
        List<EnabledLanguage> neutrals = PickListHelper.GetLanguageList<EnabledLanguage>(PickListHelper.LanguageListTypes.Neutrals);
        neutrals.ForEach(ci=>cboDefaultLanguage.Items.Add(new ListItem(text: ci.DisplayText, value: ci.CultureCode.ToLowerInvariant())));
        cboDefaultLanguage.Items.Insert(0, new ListItem(text: string.Empty, value: string.Empty));
        if (!string.IsNullOrWhiteSpace(defaultLanguage))
        {
            cboDefaultLanguage.SelectedValue = defaultLanguage.ToLower();
        }
        else
        {
            cboDefaultLanguage.SelectedIndex = 0;
        }
    }
}