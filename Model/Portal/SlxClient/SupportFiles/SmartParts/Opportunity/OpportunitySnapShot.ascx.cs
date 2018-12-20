using System;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.UI;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
using Sage.Entity.Interfaces;
using Sage.Platform;
using Sage.Platform.Application;
using Sage.Platform.Repository;
using Sage.Platform.WebPortal;
using Sage.Platform.WebPortal.Binding;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.BusinessRules;
using Sage.SalesLogix.HighLevelTypes;
using TimeZone = Sage.Platform.TimeZone;
using IQueryable = Sage.Platform.Repository.IQueryable;
using Sage.SalesLogix.Services;
using Sage.Platform.ChangeManagement;
using Sage.Platform.Orm;
using ICriteria = Sage.Platform.Repository.ICriteria;
using IProjection = Sage.Platform.Repository.IProjection;

public partial class SmartParts_OpportunitySnapShot : EntityBoundSmartPartInfoProvider
{
    /// <summary>
    /// Gets the type of the entity.
    /// </summary>
    /// <value>The type of the entity.</value>
    public override Type EntityType
    {
        get { return typeof(IOpportunity); }
    }

    /// <summary>
    /// Override this method to add bindings to the currently bound smart part
    /// </summary>
    protected override void OnAddEntityBindings()
    {
        BindingSource.Bindings.Add(new WebEntityBinding("Weighted", curBaseWeighted, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("Weighted", curWeighted, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("Weighted", curMyCurWeighted, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("ExchangeRate", numExchangeRateValue, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("ExchangeRateDate", dtpExchangeRateDate, "DateTimeValue", String.Empty, null));
        BindingSource.Bindings.Add(new WebEntityBinding("Type", pklType, "PickListValue"));
        BindingSource.Bindings.Add(new WebEntityBinding("LeadSource", lueLeadSourceOpen, "LookupResultValue"));
        BindingSource.Bindings.Add(new WebEntityBinding("ExchangeRateLocked", chkLockRate, "Checked"));

        //Open Opportunity
        BindingSource.Bindings.Add(new WebEntityBinding("SalesPotential", curOpenBaseSalesPotential, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("DocSalesPotential", curOpenSalesPotential, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("SalesPotential", curMyCurSalesPotential, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("DateOpened", dtpDateOpened, "DateTimeValue", String.Empty, null));

        //Closed Won Opportunity
        BindingSource.Bindings.Add(new WebEntityBinding("DocActualAmount", curActualWon, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("ActualAmount", curMyCurActualWon, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("ActualAmount", curBaseActualWon, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("ActualClose", dtpClosedWonSummary, "DateTimeValue", String.Empty, null));
        BindingSource.Bindings.Add(new WebEntityBinding("Reason", pklReasonWon, "PickListValue"));

        //Closed Lost Opportunity
        BindingSource.Bindings.Add(new WebEntityBinding("DocActualAmount", curPotentialLost, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("ActualAmount", curMyCurPotentialLost, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("ActualAmount", curBasePotentialLost, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("ActualClose", dtpClosedLostSummary, "DateTimeValue", String.Empty, null));
        BindingSource.Bindings.Add(new WebEntityBinding("Reason", pklReasonLost, "PickListValue"));

        var clientcontext = PageWorkItem.Services.Get<ClientContextService>();
        if (clientcontext != null)
        {
            if (clientcontext.CurrentContext.ContainsKey(EntityPage.CONST_PREVIOUSENTITYIDKEY))
            {
                foreach (var binding in BindingSource.Bindings)
                {
                    var pBinding = binding as WebEntityBinding;
                    if (pBinding != null)
                        pBinding.IgnoreControlChanges = true;
                }
            }
        }
    }

    /// <summary>
    /// Handles the Load event of the Page control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void Page_Load(object sender, EventArgs e)
    {
        SetMultiCurrencyDisplay();
        var value = BusinessRuleHelper.GetPickListValueByCode("Lead Source Status", "A");
        if (!String.IsNullOrEmpty(value))
        {
            var leadSourcePreFilter = new LookupPreFilter { PropertyName = "Status", OperatorCode = "=", FilterValue = value, PropertyType = "System.String" };
            lueLeadSourceOpen.LookupPreFilters.Add(leadSourcePreFilter);
        }
    }

    protected void dtpDateOpened_DateTimeValueChanged(object sender, EventArgs e)
    {
        var opportunity = BindingSource.Current as IOpportunity;
        if (opportunity != null)
        {
            opportunity.DateOpened = dtpDateOpened.DateTimeValue;
            lblSummary.Text = String.Format(GetLocalResourceObject("lblSummary.Caption").ToString(),
                                            opportunity.DaysOpen);
            lblSummaryActivity.Text =
                String.Format(GetLocalResourceObject("lblSummaryActivity.Caption").ToString(),
                                opportunity.DaysSinceLastActivity);
        }
    }

    private void SetMultiCurrencyDisplay()
    {
        var opportunity = BindingSource.Current as IOpportunity;
        if (opportunity != null)
        {
            if (BusinessRuleHelper.IsMultiCurrencyEnabled())
            {
                tblDetails.Border = 1;
                tblDetails.Width = "100%";
                UpdateMultiCurrencyExchangeRate(opportunity, opportunity.ExchangeRate.GetValueOrDefault(1));
                rowDetailsHeader.Visible = true;
                colOppSalesPotential.Visible = true;
                colMyCurSalesPotential.Visible = true;
                colOppActualWon.Visible = true;
                colMyCurActualWon.Visible = true;
                colOppPotentialLost.Visible = true;
                colMyCurPotentialLost.Visible = true;
                colOppWeighted.Visible = true;
                colMyCurWeighted.Visible = true;
                colActualWon.Style.Add(HtmlTextWriterStyle.PaddingRight, "0px");
                colOpenSalesPotential.Style.Add(HtmlTextWriterStyle.PaddingRight, "0px");
                colPotentialLost.Style.Add(HtmlTextWriterStyle.PaddingRight, "0px");
            }
            else
            {
                tblMultiCurrency.Visible = false;
            }
            if (GetOpportunityStatusMatch(opportunity, "ClosedWon"))
            {
                rowActualWon.Visible = true;
                rowReasonWon.Visible = true;
                rowCompetitors.Visible = true;
                rowOpenSalesPotential.Visible = true;
                rowPotentialLost.Visible = false;
                rowOpenSummary.Visible = false;
                rowClosedLost.Visible = false;
                rowReasonLost.Visible = false;
                rowWeighted.Visible = false;
                lblDaysOpen.Text = String.Format(GetLocalResourceObject("lblDaysOpen.Caption").ToString(),
                                                 opportunity.DaysOpen);
                lblCompetitors.Text = String.Format(GetLocalResourceObject("lblCompetitorsReplaced.Caption").ToString(),
                                                    GetOpportunityCompetitors());
            }
            else if (GetOpportunityStatusMatch(opportunity, "ClosedLost"))
            {
                rowPotentialLost.Visible = true;
                rowClosedLost.Visible = true;
                rowReasonLost.Visible = true;
                rowCompetitors.Visible = true;
                rowOpenSalesPotential.Visible = true;
                rowActualWon.Visible = false;
                rowOpenSummary.Visible = false;
                rowClosedWon.Visible = false;
                rowReasonWon.Visible = false;
                rowWeighted.Visible = false;
                lblLostDaysOpen.Text = String.Format(GetLocalResourceObject("lblDaysOpen.Caption").ToString(),
                                                     opportunity.DaysOpen);
                lblCompetitors.Text = String.Format(GetLocalResourceObject("lblCompetitors.Caption").ToString(),
                                                    GetOpportunityCompetitors());
            }
            else
            {
                rowOpenSalesPotential.Visible = true;
                rowOpenSummary.Visible = true;
                rowWeighted.Visible = true;
                rowPotentialLost.Visible = false;
                rowActualWon.Visible = false;
                rowClosedWon.Visible = false;
                rowClosedLost.Visible = false;
                rowReasonWon.Visible = false;
                rowReasonLost.Visible = false;
                rowCompetitors.Visible = false;
                lblSummary.Text = String.Format(GetLocalResourceObject("lblSummary.Caption").ToString(),
                                                opportunity.DaysOpen);
                lblSummaryActivity.Text =
                    String.Format(GetLocalResourceObject("lblSummaryActivity.Caption").ToString(),
                                  opportunity.DaysSinceLastActivity);
            }
            if (ShowSalesProcessInfo(opportunity))
            {
                rowSalesProcess.Visible = true;
                lblSalesProcess.Text = String.Format(GetLocalResourceObject("lblSalesProcess.Caption").ToString(),
                                                     opportunity.Stage);
            }
            else
            {
                rowSalesProcess.Visible = false;
            }
        }
    }

    /// <summary>
    /// Called when [form bound].
    /// </summary>
    protected override void OnFormBound()
    {
        if (BusinessRuleHelper.IsMultiCurrencyEnabled())
        {
            var opportunity = BindingSource.Current as IOpportunity;
            if (opportunity != null)
            {
                var oppState = opportunity as IChangedState;
                ChangeSet changes = oppState.GetChangedState();
                if (!changes.HasMemberChange("ExchangeRate"))
                {
                    hfExchangeRate.Value = "-1";
                }
                lueCurrencyCode.SeedValue = GetPeriodIdForCurrentDate();
                lueCurrencyCode.LookupResultValue =
                    EntityFactory.GetRepository<IExchangeRate>()
                        .FindFirstByProperty("CurrencyCode", opportunity.ExchangeRateCode);
				 var pendingChanges = opportunity.SyncStatus ==
                                 Saleslogix.Integration.BOE.Common.Constants.SyncStatus.ChangesPending;
				 lblSyncState.Visible = !string.IsNullOrEmpty(opportunity.ErpExtId) && !pendingChanges ;
                 lblSyncState.Text = string.Format(GetLocalResourceObject("lblSyncStateNoPendingChanges").ToString(), opportunity.ModifyDate);
				 lblPendingChanges.Visible = !string.IsNullOrEmpty(opportunity.ErpExtId) && pendingChanges && !string.IsNullOrEmpty(opportunity.ErpVariationId);
                 lblPendingChanges.Text =  string.Format(GetLocalResourceObject("lblSyncStatePendingChanges").ToString(), opportunity.ModifyDate);
            }
        }
        var systemInfo = ApplicationContext.Current.Services.Get<ISystemOptionsService>(true);
        chkLockRate.Enabled = systemInfo.LockOpportunityRate;
        if (systemInfo.ChangeOpportunityRate)
        {
            divExchangeRateLabel.Visible = false;
            divExchangeRateText.Visible = true;
        }
        else
        {
            divExchangeRateLabel.Visible = true;
            divExchangeRateText.Visible = false;
            if (!string.IsNullOrEmpty(numExchangeRateValue.Text))
            {
                lblExchangeRateValue.Text = Math.Round(Convert.ToDecimal(numExchangeRateValue.Text), 4).ToString();
            }
        }
    }

    /// <summary>
    /// Gets the opportunity competitors.
    /// </summary>
    /// <returns></returns>
    private string GetOpportunityCompetitors()
    {
        var opportunity = BindingSource.Current as IOpportunity;
        string competitors = String.Empty;
        if (opportunity.Competitors != null)
        {
            string oppCompetitors = String.Empty;
            foreach (IOpportunityCompetitor oppCompetitor in opportunity.Competitors)
            {
                oppCompetitors += oppCompetitor + "; ";
                if (oppCompetitor.LostReplaced != null && Convert.ToBoolean(oppCompetitor.LostReplaced.Value))
                    competitors += oppCompetitor + "; ";
            }
        }
        return String.IsNullOrEmpty(competitors) ? String.Format(GetLocalResourceObject("lblNone.Caption").ToString()) :
            competitors.Substring(0, competitors.Length - 2);
    }

    /// <summary>
    /// Called when [click sales potential].
    /// </summary>
    /// <param name="sender">The sender.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void OnClickSalesPotentialBaseRate(object sender, EventArgs e)
    {
        EditSalesPotential(Sage.Platform.Controls.ExchangeRateTypeEnum.BaseRate);
    }

    /// <summary>
    /// Called when [click sales potential].
    /// </summary>
    /// <param name="sender">The sender.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void OnClickSalesPotentialEntityRate(object sender, EventArgs e)
    {
        EditSalesPotential(Sage.Platform.Controls.ExchangeRateTypeEnum.EntityRate);
    }

    /// <summary>
    /// Called when [click sales potential].
    /// </summary>
    /// <param name="sender">The sender.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void OnClickSalesPotentialMyRate(object sender, EventArgs e)
    {
        EditSalesPotential(Sage.Platform.Controls.ExchangeRateTypeEnum.MyRate);
    }

    /// <summary>
    /// Called when [click actual amount].
    /// </summary>
    /// <param name="sender">The sender.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void OnClickActualAmountBaseRate(object sender, EventArgs e)
    {
        EditActualAmount(Sage.Platform.Controls.ExchangeRateTypeEnum.BaseRate);
    }

    /// <summary>
    /// Called when [click actual amount].
    /// </summary>
    /// <param name="sender">The sender.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void OnClickActualAmountEntityRate(object sender, EventArgs e)
    {
        EditActualAmount(Sage.Platform.Controls.ExchangeRateTypeEnum.EntityRate);
    }

    /// <summary>
    /// Called when [click actual amount].
    /// </summary>
    /// <param name="sender">The sender.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void OnClickActualAmountMyRate(object sender, EventArgs e)
    {
        EditActualAmount(Sage.Platform.Controls.ExchangeRateTypeEnum.MyRate);
    }

    /// <summary>
    /// Sends the email.
    /// </summary>
    /// <param name="sender">The sender.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void SendEmail(object sender, EventArgs e)
    {
        try
        {
            var opportunity = BindingSource.Current as IOpportunity;
            if (opportunity != null)
            {
                const string scriptFmtString = @"dojo.require('Sage.Utility.Email');Sage.Utility.Email.writeEmail('{0}', '{1}', '{2}');";
                string emailTo = String.Empty;
                string subject = PortalUtil.JavaScriptEncode(String.Format(GetLocalResourceObject("lblEmailSubject.Caption").ToString(),
                                  opportunity.Description, opportunity.Account.AccountName));

                string emailBody = FormatEmailBody(opportunity);

                ScriptManager.RegisterStartupScript(this, GetType(), "emailscript",
                                    string.Format(scriptFmtString, emailTo, subject, emailBody), true);
            }
        }
        catch (Exception ex)
        {
            log.Error(ex);
        }
    }
	
	public string GetPeriodIdForCurrentDate()
    {
        var periodId = String.Empty;
        var currentdate = DateTime.UtcNow.Date;
        using (ISession session = new SessionScopeWrapper())
        {
            var presentDatePeriod = session
                    .Query<IPeriod>().ToList().Find(x => x.EffectiveFrom.Value.Date <= currentdate && x.ExpiresAfter.Value.Date >= currentdate);
            if (presentDatePeriod != null)
            {
                periodId = presentDatePeriod.Id.ToString();
            }
        }
        return periodId;
    }

    private string CheckForNullValue(object value)
    {
        string outValue = String.Format(GetLocalResourceObject("lblNone.Caption").ToString());
        if (value != null)
        {
            if (value.ToString().Length > 0)
                outValue = value.ToString();
        }
        return outValue;
    }

    /// <summary>
    /// Formats the email body.
    /// </summary>
    /// <param name="opportunity">The opportunity.</param>
    /// <returns></returns>
    private string FormatEmailBody(IOpportunity opportunity)
    {
        var context = ApplicationContext.Current.Services.Get<IContextService>(true);
        var timeZone = (TimeZone)context.GetContext("TimeZone");
        string datePattern = CultureInfo.CurrentCulture.DateTimeFormat.ShortDatePattern;

        string oppProducts = String.Empty;
        bool oppWon = GetOpportunityStatusMatch(opportunity, "ClosedWon");
        bool oppLost = GetOpportunityStatusMatch(opportunity, "ClosedLost");
        string emailBody = String.Format("{0} \r\n", GetLocalResourceObject("lblEmailInfo.Caption"));
        emailBody += String.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailOppDesc.Caption"),
                                   CheckForNullValue(opportunity.Description));
        emailBody += String.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailOppAccount.Caption"),
                                   CheckForNullValue(opportunity.Account != null
                                                         ? opportunity.Account.AccountName
                                                         : String.Empty));
        emailBody += String.Format("{0} {1} \r\n", GetLocalResourceObject("EmailOppAcctMgr.Caption"),
                                   CheckForNullValue(opportunity.AccountManager));
        emailBody += String.Format("{0} {1} \r\n", GetLocalResourceObject("EmailOppReseller.Caption"),
                                   CheckForNullValue(opportunity.Reseller));
        emailBody += String.Format("{0} {1} \r\n", GetLocalResourceObject("EmailOppEstClose.Caption"),
                                   opportunity.EstimatedClose.HasValue
                                       ? timeZone.UTCDateTimeToLocalTime((DateTime)opportunity.EstimatedClose).ToString
                                             (datePattern)
                                       : String.Empty);
        emailBody += String.Format("{0} {1} \r\n", GetLocalResourceObject("EmailOppCloseProb.Caption"),
                                   CheckForNullValue(opportunity.CloseProbability));
        emailBody += String.Format("{0} {1} \r\n\r\n", GetLocalResourceObject("EmailOppComments.Caption"),
                                   CheckForNullValue(opportunity.Notes));
        emailBody += String.Format("{0} \r\n", GetLocalResourceObject("EmailOppValue.Caption"));
        emailBody += String.Format("{0} {1} \r\n", GetLocalResourceObject("lblOpenSalesPotential.Caption"),
                                   curOpenBaseSalesPotential.FormattedText);
        emailBody += String.Format("{0} {1} \r\n", GetLocalResourceObject(
                (oppWon || oppLost) 
                ? "lblPotentialAmount.Caption"
                : "EmailOppWeighted.Caption"),
                (oppWon || oppLost) 
                ? curBaseActualWon.FormattedText
                : curBaseWeighted.FormattedText );

        if(BusinessRuleHelper.IsMultiCurrencyEnabled())
        {
            emailBody += String.Format("{0} \r\n\r\n", 
			String.Format(GetLocalResourceObject("EmailOppExchangeRate.Caption").ToString(),
                                   opportunity.ExchangeRateCode,
                                   opportunity.ExchangeRate.ToString(),
                                   curOpenBaseSalesPotential.FormattedText));
        } 

        emailBody += String.Format("\r\n {0} \r\n", GetLocalResourceObject("EmailOppSummary.Caption"));
        if (oppWon || oppLost)
        {
            emailBody += String.Format("{0} \r\n",
                                       String.Format(
                                           GetLocalResourceObject("EmailOppWonLostSummary.Caption").ToString(),
                                           dtpClosedWonSummary.Text,
                                           Convert.ToString(opportunity.DaysOpen)));
            emailBody += oppWon
                             ? String.Format("{0} \r\n",
                                             String.Format(
                                                 GetLocalResourceObject("EmailOppReasonWon.Caption").ToString(),
                                                 CheckForNullValue(opportunity.Reason)))
                             : String.Format("{0} \r\n",
                                             String.Format(
                                                 GetLocalResourceObject("EmailOppReasonLost.Caption").ToString(),
                                                 CheckForNullValue(opportunity.Reason)));
        }
        else
        {
            emailBody += String.Format("{0} \r\n",
                                       String.Format(GetLocalResourceObject("EmailOppStageSummary.Caption").ToString(),
                                                     CheckForNullValue(opportunity.Stage)));
        }
        emailBody += String.Format("{0} \r\n\r\n",
                                   String.Format(GetLocalResourceObject("lblEmailOppType.Caption").ToString(),
                                                 CheckForNullValue(opportunity.Type)));

        emailBody += String.Format("{0} \r\n", GetLocalResourceObject("EmailOppProducts.Caption"));

        oppProducts = Enumerable.Aggregate(opportunity.Products, oppProducts,
                                           (current, oppProduct) =>
                                           current +
                                           String.Format("{0} ({1}); ", oppProduct.Product, oppProduct.Quantity));

        if (!string.IsNullOrEmpty(oppProducts))
            emailBody += String.Format("{0} \r\n\r\n", CheckForNullValue(oppProducts.Substring(0, oppProducts.Length - 2)));

        if (oppWon || oppLost)
            emailBody += String.Format("{0} \r\n{1} \r\n\r\n", GetLocalResourceObject("EmailOppCompetitors.Caption"),
                                       GetOpportunityCompetitors());

        emailBody += String.Format("{0} \r\n", GetLocalResourceObject("EmailOppContacts.Caption"));
        emailBody = Enumerable.Aggregate(opportunity.Contacts, emailBody,
                                         (current, oppContact) =>
                                         current +
                                         String.Format("{0} \r\n",
                                                       String.Format("{0}, {1}; {2}", oppContact.Contact.Name,
                                                                     oppContact.Contact.Title, oppContact.SalesRole)));
        return HttpUtility.JavaScriptStringEncode(emailBody);
    }

    /// <summary>
    /// Shows the sales process info.
    /// </summary>
    /// <param name="opportunity">The opportunity.</param>
    /// <returns></returns>
    private bool ShowSalesProcessInfo(IOpportunity opportunity)
    {
        bool result = false;
        if (GetOpportunityStatusMatch(opportunity, "Open") ||
            GetOpportunityStatusMatch(opportunity, "Inactive"))
        {
            IRepository<ISalesProcesses> rep = EntityFactory.GetRepository<ISalesProcesses>();
            IQueryable qry = (IQueryable)rep;
            IExpressionFactory ep = qry.GetExpressionFactory();
            ICriteria crit = qry.CreateCriteria();
            crit.Add(ep.Eq("EntityId", opportunity.Id.ToString()));
            IProjection proj = qry.GetProjectionsFactory().Count("Id");
            crit.SetProjection(proj);
            int count = (int)crit.UniqueResult();
            result = (count > 0);
        }
        return result;
    }

    /// <summary>
    /// Handles the OnChange event of the CurrencyCode control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void CurrencyCode_OnChange(object sender, EventArgs e)
    {
        var opportunity = BindingSource.Current as IOpportunity;
        if (opportunity != null)
        {
            var exchangeRate = EntityFactory.GetById<IExchangeRate>(lueCurrencyCode.LookupResultValue);
            var oppState = opportunity as IChangedState;
            ChangeSet changes = oppState.GetChangedState();
            if (!changes.HasMemberChange("ExchangeRate"))
            {
                hfExchangeRate.Value = "-1";
            }
            if (exchangeRate != null)
            {
                if (hfExchangeRate.Value == "-1")
                {
                    hfExchangeRate.Value = opportunity.ExchangeRate.ToString();
                } 
                opportunity.ExchangeRate = exchangeRate.Rate.GetValueOrDefault(1);
                opportunity.ExchangeRateDate = DateTime.UtcNow;
                opportunity.ExchangeRateCode = exchangeRate.CurrencyCode;
                UpdateMultiCurrencyExchangeRate(opportunity, exchangeRate.Rate.GetValueOrDefault(1));
            }
        }
    }

    /// <summary>
    /// Handles the OnChange event of the ExchangeRate control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void ExchangeRate_OnChange(object sender, EventArgs e)
    {
        var opportunity = BindingSource.Current as IOpportunity;
        if (opportunity != null)
        {
            opportunity.ExchangeRate = Convert.ToDouble(String.IsNullOrEmpty(numExchangeRateValue.Text) ? "1" : numExchangeRateValue.Text);
            opportunity.ExchangeRateDate = DateTime.UtcNow;
            UpdateMultiCurrencyExchangeRate(opportunity, opportunity.ExchangeRate.GetValueOrDefault(1));
        }
    }

    /// <summary>
    /// Updates controls which are set to use multi currency.
    /// </summary>
    /// <param name="opportunity">The opportunity.</param>
    /// <param name="exchangeRate">The exchange rate.</param>
    private void UpdateMultiCurrencyExchangeRate(IOpportunity opportunity, double exchangeRate)
    {
        var systemInfo = ApplicationContext.Current.Services.Get<ISystemOptionsService>(true);
        string baseCode = "";
        if (!string.IsNullOrEmpty(systemInfo.BaseCurrency))
        {
            baseCode = systemInfo.BaseCurrency;
        }
        var currencyCode = EntityFactory.GetById<IExchangeRate>(lueCurrencyCode.LookupResultValue);
        string exhangeCode = currencyCode != null ? currencyCode.CurrencyCode : opportunity.ExchangeRateCode;

        string myCurrencyCode = BusinessRuleHelper.GetMyCurrencyCode();
        var myExchangeRate = EntityFactory.GetRepository<IExchangeRate>()
            .FindFirstByProperty("CurrencyCode", String.IsNullOrEmpty(myCurrencyCode) ? "USD" : myCurrencyCode);
        double myRate = 0;
        if (myExchangeRate != null)
            myRate = myExchangeRate.Rate.GetValueOrDefault(1);

        curOpenBaseSalesPotential.CurrentCode = baseCode;
        curBaseActualWon.CurrentCode = baseCode;
        curBasePotentialLost.CurrentCode = baseCode;
        curBaseWeighted.CurrentCode = baseCode;

        curOpenSalesPotential.CurrentCode = exhangeCode;
        //curOpenSalesPotential.ExchangeRate = exchangeRate;
        curActualWon.CurrentCode = exhangeCode;
        //curActualWon.ExchangeRate = exchangeRate;
        curPotentialLost.CurrentCode = exhangeCode;
        //curPotentialLost.ExchangeRate = exchangeRate;
        curWeighted.CurrentCode = exhangeCode;
        curWeighted.ExchangeRate = exchangeRate;

        curMyCurSalesPotential.CurrentCode = myCurrencyCode;
        curMyCurSalesPotential.ExchangeRate = myRate;
        curMyCurActualWon.CurrentCode = myCurrencyCode;
        curMyCurActualWon.ExchangeRate = myRate;
        curMyCurPotentialLost.CurrentCode = myCurrencyCode;
        curMyCurPotentialLost.ExchangeRate = myRate;
        curMyCurWeighted.CurrentCode = myCurrencyCode;
        curMyCurWeighted.ExchangeRate = myRate;

        opportunity.DocSalesPotential = (opportunity.SalesPotential ?? 0) * exchangeRate;
    }

    private void EditSalesPotential(Sage.Platform.Controls.ExchangeRateTypeEnum exchangeRateType)
    {
        if (DialogService != null)
        {
            DialogService.SetSpecs(200, 400, "EditSalesPotential");
            if (BusinessRuleHelper.IsMultiCurrencyEnabled())
            {
                string exchangeRateCode;
                double exchangeRate = 0.0;
                GetExchageRateData(exchangeRateType, out exchangeRateCode, out exchangeRate);
                DialogService.DialogParameters.Clear();
                DialogService.DialogParameters.Add("ExchangeRateType", exchangeRateType);
                DialogService.DialogParameters.Add("ExchangeRateCode", exchangeRateCode);
                DialogService.DialogParameters.Add("ExchangeRate", exchangeRate);
            }
            DialogService.ShowDialog();
        }
    }

    private void EditActualAmount(Sage.Platform.Controls.ExchangeRateTypeEnum exchangeRateType)
    {
        if (DialogService != null)
        {
            var entity = BindingSource.Current as IOpportunity;
            if (GetOpportunityStatusMatch(entity, "ClosedWon"))
            {
                DialogService.SetSpecs(200, 200, 400, 600, "OpportunityClosedWon", "", true);
            }
            else if (GetOpportunityStatusMatch(entity, "ClosedLost"))
            {
                DialogService.SetSpecs(200, 200, 400, 600, "OpportunityClosedLost", "", true);
            }
            else
            {
                DialogService.SetSpecs(200, 200, 200, 300, "UpdateSalesPotential", "", true);
            }

            if (BusinessRuleHelper.IsMultiCurrencyEnabled())
            {
                string exchangeRateCode;
                double exchangeRate = 0.0;
                GetExchageRateData(exchangeRateType, out exchangeRateCode, out exchangeRate);
                DialogService.DialogParameters.Clear();
                DialogService.DialogParameters.Add("ExchangeRateType", exchangeRateType);
                DialogService.DialogParameters.Add("ExchangeRateCode", exchangeRateCode);
                DialogService.DialogParameters.Add("ExchangeRate", exchangeRate);
            }
            DialogService.ShowDialog();
        }
    }

    private bool GetOpportunityStatusMatch(IOpportunity opportunity, string statusType)
    {
        if (opportunity == null) return false;
        switch (statusType)
        {
            case "ClosedWon":
                var resourceObject = GetLocalResourceObject("Status_ClosedWon");
                return resourceObject != null && (opportunity.Status == resourceObject.ToString() || opportunity.Status == "Closed - Won");
            case "ClosedLost":
                resourceObject = GetLocalResourceObject("Status_ClosedLost");
                return resourceObject != null && (opportunity.Status == resourceObject.ToString() || opportunity.Status == "Closed - Lost");
            case "Open":
                resourceObject = GetLocalResourceObject("Status_Open");
                return resourceObject != null && (opportunity.Status == resourceObject.ToString() || opportunity.Status == "Open");
            case "Inactive":
                resourceObject = GetLocalResourceObject("Status_Inactive");
                return resourceObject != null && (opportunity.Status == resourceObject.ToString() || opportunity.Status == "Inactive");
        }
        return false;
    }

    private void GetExchageRateData(Sage.Platform.Controls.ExchangeRateTypeEnum exchangeRateType,
        out string exchangeRateCode, out double exchangeRate)
    {
        string _exchangeRateCode = string.Empty;
        double? _exchangeRate = 0.0;
        if (exchangeRateType == Sage.Platform.Controls.ExchangeRateTypeEnum.EntityRate)
        {
            var opp = BindingSource.Current as IOpportunity;
            _exchangeRateCode = opp.ExchangeRateCode;
            _exchangeRate = opp.ExchangeRate;
        }
        if (exchangeRateType == Sage.Platform.Controls.ExchangeRateTypeEnum.MyRate)
        {
            _exchangeRateCode = BusinessRuleHelper.GetMyCurrencyCode();
            var myExchangeRate =
                EntityFactory.GetRepository<IExchangeRate>()
                    .FindFirstByProperty("CurrencyCode",
                        String.IsNullOrEmpty(_exchangeRateCode) ? "USD" : _exchangeRateCode);
            if (myExchangeRate != null)
            {
                _exchangeRate = myExchangeRate.Rate.GetValueOrDefault(1);
            }
        }
        if (exchangeRateType == Sage.Platform.Controls.ExchangeRateTypeEnum.BaseRate)
        {
            var optionSvc = ApplicationContext.Current.Services.Get<ISystemOptionsService>(true);
            _exchangeRateCode = optionSvc.BaseCurrency;
            var er = EntityFactory.GetRepository<IExchangeRate>()
                .FindFirstByProperty("CurrencyCode", String.IsNullOrEmpty(_exchangeRateCode) ? "USD" : _exchangeRateCode);
            _exchangeRate = er.Rate.GetValueOrDefault(1);
            if (_exchangeRate.Equals(0))
            {
                _exchangeRate = 1;
            }
        }
        exchangeRateCode = _exchangeRateCode;
        exchangeRate = Convert.ToDouble(_exchangeRate);
    }
}