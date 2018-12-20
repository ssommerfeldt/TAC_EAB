using System;
using System.Globalization;
using System.Linq;
using System.Web.UI;
using Sage.Entity.Interfaces;
using Sage.Platform.WebPortal;
using Sage.Platform.WebPortal.Binding;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.BusinessRules;
using Sage.Platform.Application;
using Sage.Platform;
using Sage.SalesLogix.Services;
using TimeZone = Sage.Platform.TimeZone;
using System.Collections.Generic;
using Sage.Common.Syndication.Json;
using NHibernate;
using NHibernate.Linq;
using Sage.Platform.Orm;

public partial class QuoteSnapshot : EntityBoundSmartPartInfoProvider
{
    /// <summary>
    /// Gets the type of the entity.
    /// </summary>
    /// <value>The type of the entity.</value>
    public override Type EntityType
    {
        get { return typeof(IQuote); }
    }

    /// <summary>
    /// Override this method to add bindings to the currently bound smart partmail
    /// </summary>
    protected override void OnAddEntityBindings()
    {
        BindingSource.Bindings.Add(new WebEntityBinding("Total", curBaseSubTotal, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("DocTotal", curSubTotal, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("Total", curMySubTotal, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("Freight", curShipping, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("Freight", curMyShipping, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("Freight", curBaseShipping, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("GrandTotal", curBaseTotal, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("DocGrandTotal", curTotal, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("GrandTotal", curMyTotal, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("ExchangeRate", numExchangeRateValue, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("ExchangeRateDate", dtpExchangeRateDate, "DateTimeValue", string.Empty, null));

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
    /// Sets the currency display values for the grid.
    /// </summary>
    private void SetDisplayValues()
    {
        var quote = (IQuote)BindingSource.Current;
        if (quote != null)
        {
            SetControlsDisplay(quote);
            bool closed = quote.IsClosed();
            lnkDiscount.Enabled = !closed;
            lnkShipping.Enabled = !closed;
            lnkTaxRate.Enabled = !closed;
            lueCurrencyCode.Enabled = !closed;
            double taxRate = quote.Tax ?? 0;
            double tax = Sage.SalesLogix.Quote.Quote.GetQuoteTaxAmount(quote);
            double discount = quote.Discount ?? 0;
            curDiscount.Text = discount > 0 ? Convert.ToString((quote.DocTotal ?? 0) * discount) : "0";
            curBaseDiscount.Text = discount > 0 ? Convert.ToString((quote.Total ?? 0) * discount) : "0";
            curMyDiscount.Text = discount > 0 ? Convert.ToString((quote.Total ?? 0) * discount) : "0";
            curTax.Text = Convert.ToString(tax);
            curMyTax.Text = Convert.ToString(tax);
            curBaseTax.Text = Convert.ToString(tax);
            lnkDiscount.Text = discount > 0
                                   ? string.Format("{1} ({0}%)", (discount * 10000) / 100,
                                        GetLocalResourceObject("lnkDiscount.Caption"))
                                   : GetLocalResourceObject("lnkDiscount.Caption").ToString();
            lnkTaxRate.Text = taxRate > 0
                                  ? string.Format("{1} ({0}%)", (taxRate * 10000) / 100,
                                        GetLocalResourceObject("lnkTax.Caption"))
                                  : GetLocalResourceObject("lnkTax.Caption").ToString();
        }
    }

    /// <summary>
    /// Sets the controls to be displayed based on whether multi-currency is enabled.
    /// </summary>
    private void SetControlsDisplay(IQuote quote)
    {
        if (BusinessRuleHelper.IsMultiCurrencyEnabled())
        {
            UpdateMultiCurrencyExchangeRate(quote, quote.ExchangeRate.GetValueOrDefault(1));
            tblDetails.Border = 1;
            tblDetails.Width = "100%";
            rowDetailsHeader.Visible = true;
            rowSOSubTotal.Visible = true;
            rowMyCurSubTotal.Visible = true;
            rowSODiscount.Visible = true;
            rowMyCurDiscount.Visible = true;
            rowSOShipping.Visible = true;
            rowMyCurShipping.Visible = true;
            rowSOTax.Visible = true;
            rowMyCurTax.Visible = true;
            rowSOTotal.Visible = true;
            rowMyCurTotal.Visible = true;
            rowSubTotal.Style.Add(HtmlTextWriterStyle.PaddingRight, "0px");
        }
        if (BusinessRuleHelper.IsBOEEnabled(typeof(IQuote)) && !BusinessRuleHelper.IsLocalCRMPricingEnabled("Quote"))
        {
            rowDiscount.Visible = false;
            rowShipping.Visible = false;
            rowTax.Visible = false;
            tblMultiCurrency.Visible = string.IsNullOrEmpty(quote.ErpExtId);
            var pendingChanges = quote.SyncStatus ==
                                 Saleslogix.Integration.BOE.Common.Constants.SyncStatus.ChangesPending ||
                                 quote.SyncStatus == Saleslogix.Integration.BOE.Common.Constants.SyncStatus.OutOfSync;
            lblSyncState.Visible = !string.IsNullOrEmpty(quote.ErpExtId) && !pendingChanges;
            lblSyncState.Text = string.Format(GetLocalResourceObject("lblSyncStateNoPendingChanges").ToString(), quote.LastModifiedDate);
            lblPendingChanges.Visible = !string.IsNullOrEmpty(quote.ErpExtId) && pendingChanges;
            lblPendingChanges.Text = quote.SyncStatus == Saleslogix.Integration.BOE.Common.Constants.SyncStatus.OutOfSync
                ? GetLocalResourceObject("lblSyncStateError").ToString()
                : string.Format(GetLocalResourceObject("lblSyncStatePendingChanges").ToString(), quote.LastModifiedDate);
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        var quote = BindingSource.Current as IQuote;
        if (quote != null)
        {
            if (BusinessRuleHelper.IsMultiCurrencyEnabled())
            {
                UpdateMultiCurrencyExchangeRate(quote, quote.ExchangeRate.GetValueOrDefault(1));
            }
        }
    }

    /// <summary>
    /// Called when [form bound].
    /// </summary>
    protected override void OnFormBound()
    {
        if (ClientBindingMgr != null)
        {
            // register these with the ClientBindingMgr so they can do their thing without causing the dirty data warning message...
            ClientBindingMgr.RegisterBoundControl(lnkEmail);
        }
        var quote = BindingSource.Current as IQuote;
        if (quote != null)
        {
            if (BusinessRuleHelper.IsMultiCurrencyEnabled())
            {
                lueCurrencyCode.LookupResultValue =
                    EntityFactory.GetRepository<IExchangeRate>()
                        .FindFirstByProperty("CurrencyCode", quote.CurrencyCode);
            }
			lueCurrencyCode.SeedValue = GetPeriodIdForCurrentDate();
            SetDisplayValues();
            double shipping = quote.Freight ?? 0;
            if (string.IsNullOrEmpty(curBaseShipping.FormattedText))
                curBaseShipping.Text = Convert.ToString(shipping);
            if (string.IsNullOrEmpty(curShipping.FormattedText))
                curShipping.Text = Convert.ToString(shipping);
            if (string.IsNullOrEmpty(curMyShipping.FormattedText))
                curMyShipping.Text = Convert.ToString(shipping);
            var systemInfo = ApplicationContext.Current.Services.Get<ISystemOptionsService>(true);
            if (systemInfo.ChangeQuoteRate)
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
    }
	
	public string GetPeriodIdForCurrentDate()
    {
        var periodId = string.Empty;
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

    /// <summary>
    /// Handles the OnClick event of the ShowDetailsView control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void ShowDetailsView_OnClick(object sender, EventArgs e)
    {
        if (DialogService != null)
        {
            var quote = BindingSource.Current as IQuote;
            string caption = string.Format(GetLocalResourceObject("lblDetailsView.Caption").ToString(), quote.QuoteNumber);
            DialogService.SetSpecs(300, 450, 300, 410, "EditQuoteDetail", caption, true);
            DialogService.EntityID = quote.Id.ToString();
            DialogService.ShowDialog();
        }
    }

    /// <summary>
    /// Handles the OnChange event of the CurrencyCode control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void CurrencyCode_OnChange(object sender, EventArgs e)
    {
        var quote = BindingSource.Current as IQuote;
        if (quote != null)
        {
            var exchangeRate = EntityFactory.GetById<IExchangeRate>(lueCurrencyCode.LookupResultValue);
            if (exchangeRate != null)
            {
                quote.ExchangeRate = exchangeRate.Rate.GetValueOrDefault(1);
                quote.ExchangeRateDate = DateTime.UtcNow;
                quote.CurrencyCode = exchangeRate.CurrencyCode;
                UpdateMultiCurrencyExchangeRate(quote, exchangeRate.Rate.GetValueOrDefault(1));
                Sage.SalesLogix.Quote.Quote.RefreshPricing(quote);
                RefreshWorkSpace();
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
        var quote = BindingSource.Current as IQuote;
        if (quote != null)
        {
            quote.ExchangeRate =
                Convert.ToDouble(string.IsNullOrEmpty(numExchangeRateValue.Text) ? "1" : numExchangeRateValue.Text);
            quote.ExchangeRateDate = DateTime.UtcNow;
            UpdateMultiCurrencyExchangeRate(quote, quote.ExchangeRate.Value);
            Sage.SalesLogix.Quote.Quote.RefreshPricing(quote);
            RefreshWorkSpace();
        }
    }

    /// <summary>
    /// Updates controls which are set to use multi currency.
    /// </summary>
    /// <param name="quote">The quote.</param>
    /// <param name="exchangeRate">The exchange rate.</param>
    private void UpdateMultiCurrencyExchangeRate(IQuote quote, double exchangeRate)
    {
        var systemInfo = ApplicationContext.Current.Services.Get<ISystemOptionsService>(true);
        string baseCode = "";
        if (!string.IsNullOrEmpty(systemInfo.BaseCurrency))
        {
            baseCode = systemInfo.BaseCurrency;
        }
        var currencyCode = EntityFactory.GetById<IExchangeRate>(lueCurrencyCode.LookupResultValue);
        string exhangeCode = currencyCode != null ? currencyCode.CurrencyCode : quote.CurrencyCode;

        curBaseSubTotal.CurrentCode = baseCode;
        curBaseTotal.CurrentCode = baseCode;
        curBaseTax.CurrentCode = baseCode;
        curBaseDiscount.CurrentCode = baseCode;
        curBaseShipping.CurrentCode = baseCode;

        curSubTotal.CurrentCode = exhangeCode;
        curTotal.CurrentCode = exhangeCode;
        curDiscount.CurrentCode = exhangeCode;
        curTax.CurrentCode = exhangeCode;
        curTax.ExchangeRate = exchangeRate;
        curShipping.CurrentCode = exhangeCode;
        curShipping.ExchangeRate = exchangeRate;
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
            var quote = BindingSource.Current as IQuote;
            if (quote != null)
            {
                const string scriptFmtString = @"dojo.require('Sage.Utility.Email');Sage.Utility.Email.writeEmail('{0}', '{1}', '{2}');";
                var to = new List<EmailTo>();
                var cc = new EmailTo();
                if (quote.RequestedBy != null)
                {
                    if (!Equals(quote.RequestedBy, quote.ShippingContact) &&
                        !Equals(quote.RequestedBy, quote.BillingContact))
                    {
                        cc.FirstName = quote.RequestedBy.FirstName;
                        cc.LastName = quote.RequestedBy.LastName;
                        cc.EmailAddress = quote.RequestedBy.Email;
                    }
                }
                if (quote.ShippingContact != null)
                {
                    to.Add(new EmailTo(quote.ShippingContact.FirstName, quote.ShippingContact.LastName, quote.ShippingContact.Email));
                }
                if (quote.BillingContact != null && !Equals(quote.BillingContact, quote.ShippingContact))
                {
                    to.Add(new EmailTo(quote.BillingContact.FirstName, quote.BillingContact.LastName, quote.BillingContact.Email));
                }

                var emailTo = new {to, cc, bcc = string.Empty };
                string subject = PortalUtil.JavaScriptEncode(
                    string.Format(GetLocalResourceObject("lblEmailSubject.Caption").ToString(),
                    quote.QuoteNumber, quote.Account.AccountName));
                string emailBody = FormatEmailBody(quote);
                ScriptManager.RegisterStartupScript(this, GetType(), "emailscript",
                                    string.Format(scriptFmtString, JsonConvert.SerializeObject(emailTo), subject, emailBody), true);
            }
        }
        catch (Exception ex)
        {
            log.Error(ex.Message);
        }
    }

    private class EmailTo
    {
        public EmailTo()
        {
        }

        public EmailTo(string firstName, string lastName, string emailAddress)
        {
            FirstName = firstName;
            LastName = lastName;
            EmailAddress = emailAddress;
        }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string EmailAddress { get; set; }
    }

    /// <summary>
    /// Checks for null value.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns></returns>
    private string CheckForNullValue(object value)
    {
        string outValue = string.Format(GetLocalResourceObject("lblNone.Caption").ToString());

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
    /// <param name="quote">The sales order.</param>
    /// <returns></returns>
    private string FormatEmailBody(IQuote quote)
    {
        var context = ApplicationContext.Current.Services.Get<IContextService>(true);
        var timeZone = (TimeZone)context.GetContext("TimeZone");
        bool isMultiCurr = BusinessRuleHelper.IsMultiCurrencyEnabled();
        string datePattern = CultureInfo.CurrentCulture.DateTimeFormat.ShortDatePattern;

        string products = string.Empty;
        string emailBody = string.Format("{0} \r\n", GetLocalResourceObject("lblEmailInfo.Caption"));
        emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailAccount.Caption"),
            CheckForNullValue(quote.Account.AccountName));
        emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailOpportunity.Caption"),
            CheckForNullValue(quote.Opportunity != null
                ? quote.Opportunity.Description
                : string.Empty));
        emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailDateCreated.Caption"),
            timeZone.UTCDateTimeToLocalTime((DateTime)quote.CreateDate).ToString(datePattern));
        emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailQuoteId.Caption"),
            quote.QuoteNumber);
        emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailType.Caption"),
            CheckForNullValue(quote.Type));
        emailBody += string.Format("{0} {1} \r\n\r\n", GetLocalResourceObject("lblEmailStatus.Caption"),
            CheckForNullValue(quote.Status));
        emailBody += string.Format("{0} {1} \r\n\r\n", GetLocalResourceObject("lblEmailComments.Caption"),
            CheckForNullValue(quote.Comments));
        emailBody += string.Format("{0} \r\n", GetLocalResourceObject("lblEmailValue.Caption"));
        curBaseTotal.Text = quote.GrandTotal.ToString();
        emailBody += string.Format("{0} \r\n",
            string.Format(GetLocalResourceObject("lblEmailGrandTotal.Caption").ToString(),
                curBaseTotal.FormattedText));
        if (isMultiCurr)
        {
            curTotal.CurrentCode = quote.CurrencyCode;
            curTotal.Text = quote.DocGrandTotal.ToString();
            emailBody += string.Format("{0} \r\n",
                string.Format(GetLocalResourceObject("lblEmailGrandTotal.Caption").ToString(),
                    curTotal.FormattedText));
            emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailCurrencyCode.Caption"),
                CheckForNullValue(quote.CurrencyCode));
            emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailExchangeRate.Caption"),
                CheckForNullValue(quote.ExchangeRate));
            if (quote.ExchangeRateDate.HasValue)
                emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailExchangeRateDate.Caption"),
                    timeZone.UTCDateTimeToLocalTime((DateTime)quote.ExchangeRateDate).
                        ToString(datePattern));
            else
                emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailExchangeRateDate.Caption"),
                    GetLocalResourceObject("lblNone.Caption"));
        }

        emailBody += string.Format("\r\n{0} \r\n", GetLocalResourceObject("lblEmailProducts.Caption"));
        products = quote.QuoteItems.Aggregate(products,
            (current, item) => current + string.Format("{0} ({1}); ", item.Product, item.Quantity));
        emailBody += string.Format("{0} \r\n", CheckForNullValue(products));
        emailBody += string.Format("\r\n{0} \r\n", GetLocalResourceObject("lblEmailBillShipAddress.Caption"));
        emailBody += string.Format("{0} \r\n", GetLocalResourceObject("lblEmailBillingAddress.Caption"));
        emailBody += string.Format("{0} {1} \r\n",
            GetLocalResourceObject("lblEmailAddressName.Caption"),
            quote.BillingContact == null ? string.Empty : quote.BillingContact.NameLF);
        emailBody += quote.BillingAddress.FormatFullQuoteAddress().Replace("\r\n", "\r\n");

        emailBody += string.Format("\r\n \r\n{0} \r\n", GetLocalResourceObject("lblEmailShippingAddress.Caption"));
        emailBody += string.Format("{0} {1} \r\n",
            GetLocalResourceObject("lblEmailAddressName.Caption"),
            quote.ShippingContact == null ? string.Empty : quote.ShippingContact.NameLF);
        emailBody += quote.ShippingAddress.FormatFullQuoteAddress().Replace("\r\n", "\r\n");
        return PortalUtil.JavaScriptEncode(emailBody.Replace("+", "%20"));
    }

    private void RefreshWorkSpace()
    {
        var refresher = PageWorkItem.Services.Get<IPanelRefreshService>();
        if (refresher != null)
        {
            refresher.RefreshAll();
        }
    }
}