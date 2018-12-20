using System;
using System.Collections.Generic;
using Sage.Entity.Interfaces;
using Sage.Platform;
using System.Web.UI;
using Sage.Platform.Application.UI;
using Sage.Platform.Application;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.SelectionService;
using Sage.SalesLogix.Web.SelectionService;
using Sage.Platform.WebPortal;
using Sage.Platform.Security;

public partial class RoleTaskletControl : UserControl, ISmartPartInfoProvider
{
    /// <summary>
    /// Gets or sets the dialog service.
    /// </summary>
    /// <value>The dialog service.</value>
    [ServiceDependency]
    public IWebDialogService DialogService { get; set; }   

    /// <summary>
    /// Gets the smart part info.
    /// </summary>
    /// <param name="smartPartInfoType">Type of the smart part info.</param>
    /// <returns></returns>
    public ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        ToolsSmartPartInfo tinfo = new ToolsSmartPartInfo();
        return tinfo;
    }
}