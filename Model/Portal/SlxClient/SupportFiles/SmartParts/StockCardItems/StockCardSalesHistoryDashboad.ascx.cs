using System;
using System.Collections;
using System.Data;
using System.Web.UI;
using System.Web.UI.WebControls;
using Sage.Platform;
using Sage.Entity.Interfaces;
using Sage.Platform.Application.UI;
using Sage.Platform.Security;
using Sage.Platform.WebPortal.SmartParts;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.Data;
using Sage.Platform.Repository;
using log4net;
using Sage.Platform.Application;
//using NHibernate;
using Sage.Platform.Framework;
using System.Text;
using System.Data.OleDb;
using System.Collections.Generic;
using Sage.SalesLogix.Web.Controls;
using Sage.Platform.WebPortal;
using System.Drawing;
using Sage.Platform.Application.UI.Web;


public partial class SmartParts_StockCardItems_StockCardSalesHistoryDashboad : EntityBoundSmartPartInfoProvider
{
    /// <summary>
    /// Loads the grid.
    /// </summary>
    protected void Page_Load(object sender, EventArgs e)
    {
        // Use a literal to pass in a dynamic URL where we pass in the Entityid.
        Sage.Entity.Interfaces.IStockCardItems _entity = BindingSource.Current as Sage.Entity.Interfaces.IStockCardItems;
        
        this.Literal1.Text = "<iframe id=\"iframe1\" width=\"1000\" height=\"600\" src=\"./SmartParts/StockCardItems/SCItemDashboard.aspx?entityid=" + _entity.Id.ToString() +"\" frameborder=\"0\"></iframe>";
    }

    #region ISmartPartInfoProvider Members

    /// <summary>
    /// Tries to retrieve smart part information compatible with type
    /// smartPartInfoType.
    /// </summary>
    /// <param name="smartPartInfoType">Type of information to retrieve.</param>
    /// <returns>
    /// The <see cref="T:Sage.Platform.Application.UI.ISmartPartInfo"/> instance or null if none exists in the smart part.
    /// </returns>
    public override ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        ToolsSmartPartInfo tinfo = new ToolsSmartPartInfo();
        if (BindingSource != null)
        {
            if (BindingSource.Current != null)
            {
                tinfo.Description = BindingSource.Current.ToString();
                tinfo.Title = BindingSource.Current.ToString();
            }
        }

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
    public override Type EntityType
    {
        get { return typeof(IStockCardItems); }
    }

    protected override void OnAddEntityBindings()
    {
        // BindingSource.Bindings.Add(new Sage.Platform.WebPortal.Binding.WebEntityBinding("DeliveryDate", dtDeliveryDate, "DateTimeValue", "", null));
        //throw new NotImplementedException();
        //throw new NotImplementedException();
    }
    /// <summary>
    /// Derived components should override this method to wire up event handlers.
    /// </summary>

    #endregion


}