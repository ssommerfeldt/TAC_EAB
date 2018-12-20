using System;
using Sage.Platform.WebPortal.SmartParts;
using Sage.Platform.Application;
using Saleslogix.Integration.LinkedIn.SalesNavigator;
using Sage.Platform.Application.UI;
using System.Web.UI;

public partial class SmartParts_SalesNavigator_SalesNavigator : EntityBoundSmartPartInfoProvider
{
    [ServiceDependency]
    public IEntityContextService EntityContext { get; set; }

    /// <summary>
    /// Gets the type of the entity.
    /// </summary>
    /// <value>The type of the entity.</value>
    public override Type EntityType
    {
        get { return typeof(IPersistentObject); }
    }

    /// <summary>
    /// Override this method to add bindings to the currently bound smart part
    /// </summary>
    protected override void OnAddEntityBindings()
    {
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        var url = SalesNavigatorHelper.SalesNavigatorUrl(EntityContext.GetEntity());
		salesNavigatorIframe.Attributes.Add("src", url);
    }

    #region ISmartPartInfoProvider Members

    /// <summary>
    /// Tries to retrieve smart part information compatible with type smartPartInfoType.
    /// </summary>
    /// <param name="smartPartInfoType">Type of information to retrieve.</param>
    /// <returns>
    /// The <see cref="T:Sage.Platform.Application.UI.ISmartPartInfo"/> instance or null if none exists in the smart part.
    /// </returns>
    public override ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        var tinfo = new ToolsSmartPartInfo();
        foreach (Control c in SalesNavigator_RTools.Controls)
        {
            tinfo.RightTools.Add(c);
        }
        return tinfo;
    }

    #endregion
}