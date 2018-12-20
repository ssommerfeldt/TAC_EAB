using System;
using System.Drawing;
using System.Linq;
using System.Web.UI;
using System.Collections.Generic;
using Sage.Entity.Interfaces;
using Sage.Platform;
using Sage.Platform.Application;
using Sage.Platform.Application.UI;
using Sage.Platform.ComponentModel;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.BusinessRules;
using Sage.SalesLogix.SelectionService;
using Sage.SalesLogix.Web.SelectionService;
using Sage.Platform.WebPortal;
using TimeZone = Sage.Platform.TimeZone;
using Sage.Platform.Security;
using Sage.Platform.Security;
using Sage.Platform.Orm.Interfaces;
using Sage.Common.Syndication.Json;
using Saleslogix.Integration.BOE.Common;
using Sage.Platform.Orm.Attributes;
using Sage.Platform.Orm.DataTypes;
using Sage.Platform.Orm.Interfaces;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.WebPortal.SmartParts;


public partial class QuoteTasksTasklet : UserControl, ISmartPartInfoProvider
{



    private void LoadQuoteTasks(EntityPage page)
    {
        if (page.IsDetailMode)
        {
            divEntityQuoteList.Style.Add("display", "none");
            divEntityQuoteDetails.Style.Add("display", "block");
            
            IQuote quote = EntityFactory.GetRepository<IQuote>().Get(page.EntityContext.EntityID);
			
            if (quote == null)
            {
                HideIntegration();
                return;
            }
			else
			{
				IBackOffice backOffice = Utilities.GetBackOfficeByLogicalID(quote.ErpLogicalId);
				
				if(backOffice == null)								
				{
					backOffice = Utilities.GetBackOfficeByLogicalID(account.ErpLogicalId); 
				}
				
				IAccount account = quote.Account;
				// First validation is if the associated Account is Synced 
				if(account == null || account.ErpExtId == null)
				{
					// If associated Account is not in Sync throw error
					throw new ValidationException(GetLocalResourceObject("Error_Account_NotPromoted").ToString());
				}
				// Second Validation is if the Quote had line items
				var quoteItems = quote.QuoteItems;
				if(quoteItems == null || quoteItems.Count() <= 0)								
				{
					throw new ValidationException(GetLocalResourceObject("Error_Quote_NoLineItems").ToString());
				}
				
				//Get the BOD Mapping from Quote entity.
				IBODMapping bodMapping = Utilities.GetBODMappingByEntityBackoffice("SalesOrder", backOffice);
				
				if(bodMapping != null && bodMapping.IsActive == true)
				{
		                if(quote.SyncStatus != null && quote.SyncStatus.Equals(GetLocalResourceObject("LinkQuote.Caption").ToString())
							||  quote.ErpExtId != null)
	                    {
	                        lblLinkQuote.Visible = false;
	                        imgLinkQuote.Visible = false;
	                    }
	                    else
	                    { 
		                    lblLinkQuote.Visible = true;
		                    imgLinkQuote.Visible = true;
	                    }
				}
				else HideQuotePromotion();
				
				lblLastUpdate.Text = String.Format(GetLocalResourceObject("lblLastUpdate.Caption").ToString(),
                                                   TimeZone.UTCDateTimeToLocalTime((DateTime)quote.ModifyDate));
			}
			if (page.IsNewEntity)
            {
                updateQuotePanel.Update();
            }
        }
    }

    private void HideIntegration()
    {
        rowlnkLinkQuote.Style.Add("display", "none");
        rowlnkLinkQuote_List.Style.Add("display", "none");
        rowlnkLinkStatus.Style.Add("display", "none");
    }
	private void HideQuotePromotion()
    {
       lblLinkQuote.Visible = false;
       imgLinkQuote.Visible = false;
    }

    protected void lnkLinkQuote_Click(object sender, EventArgs e)
    {
		var page = Page as EntityPage;
		if (page != null && page.EntityContext != null)
        {
          if (page.EntityContext.EntityType == typeof (IQuote))
           {
			IQuote quote = EntityFactory.GetRepository<IQuote>().Get(page.EntityContext.EntityID);
	        if (quote != null)
	        {
	            IAccount account = quote.Account;
				// First validation is if the associated Account is Synced 
				if(account == null || account.ErpExtId == null)
				{
					// If associated Account is not in Sync throw error
					throw new ValidationException(GetLocalResourceObject("Error_Account_NotPromoted").ToString());
				}
				// Second Validation is if the Quote had line items
				var quoteItems = quote.QuoteItems;
				if(quoteItems == null || quoteItems.Count() <= 0)								
				{
					throw new ValidationException(GetLocalResourceObject("Error_Quote_NoLineItems").ToString());
				}
				IBackOffice backOffice = Utilities.GetBackOfficeByLogicalID(quote.ErpLogicalId);
				
				if(backOffice == null)								
				{
					backOffice = Utilities.GetBackOfficeByLogicalID(account.ErpLogicalId); 
				}
				//Get the BOD Mapping from SalesOrder entity.
				IBODMapping bodMapping = Utilities.GetBODMappingByEntityBackoffice(GetLocalResourceObject("Quote_EntityName").ToString(), backOffice);
				if(bodMapping != null && bodMapping.IsActive == true && bodMapping.OutboundOnCreate == false)
				{
					throw new ValidationException(String.Format(GetLocalResourceObject("OutBoundCreate.Caption").ToString()));
				}
				string caption = GetLocalResourceObject("lblLinkQuote.Caption").ToString();
		        DialogService.SetSpecs(200, 200, 250, 600, "QuoteSalesOrderPromotion", caption, true);
		        string id = GetSelectedRecord();
		        if (!String.IsNullOrEmpty(id))
		        {
		            DialogService.DialogParameters.Remove("LinkAccountSelectedId");
		            DialogService.DialogParameters.Add("LinkAccountSelectedId", id);
		            DialogService.ShowDialog();
					if(quote.SyncStatus == GetLocalResourceObject("lblLinkQuote.Caption").ToString())
                    { 
				       lblLinkQuote.Visible = false;
	                   imgLinkQuote.Visible = false;
                    }
		        }
			}
			else
	        {
	            throw new ValidationException(GetLocalResourceObject("Error_QuoteNotFound").ToString());
	        }
		 }
		}
    }

    private string GetSelectedRecord()
    {
        var page = Page as EntityPage;
        if (page != null && page.IsListMode)
        {
            var srv = SelectionServiceRequest.GetSelectionService();
            var selectionContext = srv.GetSelectionContext("list");
            if (selectionContext != null)
            {
                var ids = selectionContext.GetSelectedIds();
                if (ids.Count > 0)
                {
                    return ids[0];
                }
            }
        }
        else if (page != null && page.EntityContext != null)
        {
            return page.EntityContext.EntityID.ToString();
        }
        return String.Empty;
    }

	/// <summary>
    /// Returns Integration record.
    /// </summary>
    public static IIntegration GetIntegrationRecord()
    {
        using (var session = new Sage.Platform.Orm.SessionScopeWrapper())
        {
            return session.QueryOver<IIntegration>()
                .Where(i => i.Enabled == true && (string)i.Id == "ICRMION00001")
                .SingleOrDefault();
        }
    }
	
    /// <summary>
    /// Gets the smart part info.
    /// </summary>
    /// <param name="smartPartInfoType">Type of the smart part info.</param>
    /// <returns></returns>
    public ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        var tinfo = new ToolsSmartPartInfo();
        return tinfo;
    }
}
