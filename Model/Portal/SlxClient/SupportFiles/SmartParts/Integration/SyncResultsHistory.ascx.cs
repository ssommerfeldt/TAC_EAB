using System;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Web.UI;
using Sage.Platform.Application;
using Sage.Platform.Application.UI;
using Sage.Platform.WebPortal.SmartParts;
using SmartPartInfoProvider = Sage.Platform.WebPortal.SmartParts.SmartPartInfoProvider;

public partial class SyncResultsHistory : SmartPartInfoProvider
{
    [ServiceDependency]
    public IEntityContextService EntityContext { get; set; }

    protected void Page_Load(object sender, EventArgs e)
    {
        DoActivating();
    }

    private void DoActivating()
    {
        object globalSyncId = Guid.NewGuid();
        PropertyDescriptorCollection pds = TypeDescriptor.GetProperties(EntityContext.EntityType);
        foreach (PropertyDescriptor pd in pds.Cast<PropertyDescriptor>().Where(pd => pd.Name == "GlobalSyncId"))
        {
            globalSyncId = pd.GetValue(EntityContext.GetEntity());
            break;
        }
        if (globalSyncId == null)
        {
            globalSyncId = Guid.NewGuid();
        }

        var script = new StringBuilder();
        script.AppendLine(
            @"require([
                'dojo/ready',
                'Sage/MainView/IntegrationContract/SyncResultsHistory'
            ], function (ready, SyncResultsHistory) {");

        var baseScript = string.Format(
            "window.setTimeout(function() {{ window.syncResultsHistory = new SyncResultsHistory({{ 'workspace': '{0}', 'tabId': '{1}', 'placeHolder': '{2}', 'globalSyncId': '{3}', 'entityId': '{4}' }}); syncResultsHistory.loadSyncResults(); }}, 1);",
            getMyWorkspace(),
            ID,
            sdgrdSyncHistory_Grid.ClientID,
            globalSyncId,
            EntityContext.EntityID);

        if (!Page.IsPostBack)
        {
            script.AppendFormat("ready(function() {{ {0}; }} );", baseScript);
        }
        else
        {
            script.AppendLine(baseScript);
        }
        script.AppendLine("});"); // end require
        ScriptManager.RegisterStartupScript(this, GetType(), "SyncResultsHistory", script.ToString(), true);
    }

    /// <summary>
    /// Gets the smart part info.
    /// </summary>
    /// <param name="smartPartInfoType">Type of the smart part info.</param>
    /// <returns></returns>
    public override ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        var tinfo = new ToolsSmartPartInfo();
        foreach (Control c in SyncResultsHistory_RTools.Controls)
        {
            tinfo.RightTools.Add(c);
        }
        return tinfo;
    }
}