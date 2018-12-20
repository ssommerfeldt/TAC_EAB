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
using TimeZone=Sage.Platform.TimeZone;
using System.Collections.Generic;
using Sage.Common.Syndication.Json;
using NHibernate;
using NHibernate.Linq;
using Sage.Platform.Orm;

public partial class SalesOrderSnapShot : EntityBoundSmartPartInfoProvider
{
    /// <summary>
    /// Gets the type of the entity.
    /// </summary>
    /// <value>The type of the entity.</value>
    public override Type EntityType
    {
        get { return typeof(ISalesOrder); }
    }

    /// <summary>
    /// Override this method to add bindings to the currently bound smart partmail
    /// </summary>
    protected override void OnAddEntityBindings()
    {
        BindingSource.Bindings.Add(new WebEntityBinding("OrderTotal", curBaseSubTotal, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("DocOrderTotal", curSubTotal, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("OrderTotal", curMySubTotal, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("Freight", curBaseShipping, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("Freight", curShipping, "Text"));
        BindingSource.Bindings.Add(new WebEntityBinding("Freight", curMyShipping, "Text"));
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
        var salesOrder = (ISalesOrder) BindingSource.Current;
        if (salesOrder != null)
        {
            SetControlsDisplay(salesOrder);
            bool closed = salesOrder.IsClosed();
            lnkDiscount.Enabled = !closed;
            lnkShipping.Enabled = !closed;
            lnkTaxRate.Enabled = !closed;
            lueCurrencyCode.Enabled = !closed;

            double taxRate = salesOrder.Tax ?? 0;
            double tax = Sage.SalesLogix.SalesOrder.SalesOrder.GetSalesOrderTaxAmount(salesOrder);
            double discount = salesOrder.Discount ?? 0;
            curDiscount.Text = discount > 0 ? Convert.ToString((salesOrder.DocOrderTotal ?? 0) * discount) : "0";
            curBaseDiscount.Text = discount > 0 ? Convert.ToString((salesOrder.OrderTotal ?? 0) * discount) : "0";
            curMyDiscount.Text = discount > 0 ? Convert.ToString((salesOrder.OrderTotal ?? 0) * discount) : "0";
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
    private void SetControlsDisplay(ISalesOrder salesOrder)
    {
        if (BusinessRuleHelper.IsMultiCurrencyEnabled())
        {
            UpdateMultiCurrencyExchangeRate(salesOrder, salesOrder.ExchangeRate.GetValueOrDefault(1));
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
        if (BusinessRuleHelper.IsBOEEnabled(typeof(ISalesOrder)) && !BusinessRuleHelper.IsLocalCRMPricingEnabled("SalesOrder"))
        {
            rowDiscount.Visible = false;
            rowShipping.Visible = false;
            rowTax.Visible = false;
            tblMultiCurrency.Visible = string.IsNullOrEmpty(salesOrder.ErpExtId);
            var pendingChanges = salesOrder.SyncStatus ==
                                 Saleslogix.Integration.BOE.Common.Constants.SyncStatus.ChangesPending ||
                                 salesOrder.SyncStatus == Saleslogix.Integration.BOE.Common.Constants.SyncStatus.OutOfSync;
            lblSyncState.Visible = !string.IsNullOrEmpty(salesOrder.ErpExtId) && !pendingChanges;
            lblSyncState.Text = string.Format(GetLocalResourceObject("lblSyncStateNoPendingChanges").ToString(), salesOrder.ErpLastModifiedDate);
            lblPendingChanges.Visible = !string.IsNullOrEmpty(salesOrder.ErpExtId) && pendingChanges;
            lblPendingChanges.Text = salesOrder.SyncStatus == Saleslogix.Integration.BOE.Common.Constants.SyncStatus.OutOfSync
                ? GetLocalResourceObject("lblSyncStateError").ToString()
                : string.Format(GetLocalResourceObject("lblSyncStatePendingChanges").ToString(), salesOrder.ErpLastModifiedDate);
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        var salesOrder = BindingSource.Current as ISalesOrder;
        if (salesOrder != null)
        {
            if (BusinessRuleHelper.IsMultiCurrencyEnabled())
            {
                UpdateMultiCurrencyExchangeRate(salesOrder, salesOrder.ExchangeRate.GetValueOrDefault(1));
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
        var salesOrder = BindingSource.Current as ISalesOrder;
        if (salesOrder != null)
        {
            if (BusinessRuleHelper.IsMultiCurrencyEnabled())
            {
                lueCurrencyCode.LookupResultValue =
                    EntityFactory.GetRepository<IExchangeRate>()
                        .FindFirstByProperty("CurrencyCode", salesOrder.CurrencyCode);
            }
			lueCurrencyCode.SeedValue = GetPeriodIdForCurrentDate();
            SetDisplayValues();
            double shipping = salesOrder.Freight ?? 0;
            if (string.IsNullOrEmpty(curBaseShipping.FormattedText))
                curBaseShipping.Text = Convert.ToString(shipping);
            if (string.IsNullOrEmpty(curShipping.FormattedText))
                curShipping.Text = Convert.ToString(shipping);
            if (string.IsNullOrEmpty(curMyShipping.FormattedText))
                curMyShipping.Text = Convert.ToString(shipping);
            var systemInfo = ApplicationContext.Current.Services.Get<ISystemOptionsService>(true);
            if (systemInfo.ChangeSalesOrderRate)
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
            var salesOrder = BindingSource.Current as ISalesOrder;
            string caption = string.Format(GetLocalResourceObject("lblDetailsView.Caption").ToString(), salesOrder.SalesOrderNumber);
            DialogService.SetSpecs(300, 450, 300, 410, "EditSalesOrderDetail", caption, true);
            DialogService.EntityID = salesOrder.Id.ToString();
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
        var salesOrder = BindingSource.Current as ISalesOrder;
        if (salesOrder != null)
        {
            var exchangeRate = EntityFactory.GetById<IExchangeRate>(lueCurrencyCode.LookupResultValue);
            if (exchangeRate != null)
            {
                salesOrder.ExchangeRate = exchangeRate.Rate.GetValueOrDefault(1);
                salesOrder.ExchangeRateDate = DateTime.UtcNow;
                salesOrder.CurrencyCode = exchangeRate.CurrencyCode;
                UpdateMultiCurrencyExchangeRate(salesOrder, exchangeRate.Rate.GetValueOrDefault(1));
                Sage.SalesLogix.SalesOrder.SalesOrder.RefreshPricing(salesOrder);
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
        var salesOrder = BindingSource.Current as ISalesOrder;
        if (salesOrder != null)
        {
            salesOrder.ExchangeRate = Convert.ToDouble(string.IsNullOrEmpty(numExchangeRateValue.Text) ? "1" : numExchangeRateValue.Text);
            salesOrder.ExchangeRateDate = DateTime.UtcNow;
            UpdateMultiCurrencyExchangeRate(salesOrder, salesOrder.ExchangeRate.Value);
            Sage.SalesLogix.SalesOrder.SalesOrder.RefreshPricing(salesOrder);
            RefreshWorkSpace();
        }
    }

    /// <summary>
    /// Updates controls which are set to use multi currency.
    /// </summary>
    /// <param name="salesOrder">The sales order.</param>
    /// <param name="exchangeRate">The exchange rate.</param>
    private void UpdateMultiCurrencyExchangeRate(ISalesOrder salesOrder, double exchangeRate)
    {
        var systemInfo = ApplicationContext.Current.Services.Get<ISystemOptionsService>(true);
        string baseCode = "";
        if (!string.IsNullOrEmpty(systemInfo.BaseCurrency))
        {
            baseCode = systemInfo.BaseCurrency;
        }
        var currencyCode = EntityFactory.GetById<IExchangeRate>(lueCurrencyCode.LookupResultValue);
        string exhangeCode = currencyCode != null ? currencyCode.CurrencyCode : salesOrder.CurrencyCode;

        curBaseSubTotal.CurrentCode = baseCode;
        curBaseDiscount.CurrentCode = baseCode;
        curBaseTotal.CurrentCode = baseCode;
        curBaseTax.CurrentCode = baseCode;
        curBaseShipping.CurrentCode = baseCode;

        curSubTotal.CurrentCode = exhangeCode;
        curDiscount.CurrentCode = exhangeCode;
        curShipping.CurrentCode = exhangeCode;
        curShipping.ExchangeRate = exchangeRate;
        curTax.CurrentCode = exhangeCode;
        curTax.ExchangeRate = exchangeRate;
        curTotal.CurrentCode = exhangeCode;
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
            var salesOrder = BindingSource.Current as ISalesOrder;
            if (salesOrder != null)
            {
                const string scriptFmtString = @"dojo.require('Sage.Utility.Email');Sage.Utility.Email.writeEmail('{0}', '{1}', '{2}');";
                var to = new List<EmailTo>();
                var cc = new EmailTo();
                if (salesOrder.RequestedBy != null)
                {
                    if (!Equals(salesOrder.RequestedBy, salesOrder.ShippingContact) &&
                        !Equals(salesOrder.RequestedBy, salesOrder.BillingContact))
                    {
                        cc.firstName = salesOrder.RequestedBy.FirstName;
                        cc.lastName = salesOrder.RequestedBy.LastName;
                        cc.emailAddress = salesOrder.RequestedBy.Email;
                    }
                }
                if (salesOrder.ShippingContact != null)
                {
                    to.Add(new EmailTo(salesOrder.ShippingContact.FirstName, salesOrder.ShippingContact.LastName, salesOrder.ShippingContact.Email));
                }
                if (salesOrder.BillingContact != null && !Equals(salesOrder.BillingContact, salesOrder.ShippingContact))
                {
                    to.Add(new EmailTo(salesOrder.BillingContact.FirstName, salesOrder.BillingContact.LastName, salesOrder.BillingContact.Email));
                }

                var emailTo = new { to = to, cc = cc, bcc = string.Empty };
                string subject = PortalUtil.JavaScriptEncode(
                    string.Format(GetLocalResourceObject("lblEmailSubject.Caption").ToString(),
                    salesOrder.SalesOrderNumber, salesOrder.Account.AccountName));
                string emailBody = FormatEmailBody(salesOrder);
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
            this.firstName = firstName;
            this.lastName = lastName;
            this.emailAddress = emailAddress;
        }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public string emailAddress { get; set; }
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
    /// <param name="salesOrder">The sales order.</param>
    /// <returns></returns>
    private string FormatEmailBody(ISalesOrder salesOrder)
    {
        var context = ApplicationContext.Current.Services.Get<IContextService>(true);
        var timeZone = (TimeZone) context.GetContext("TimeZone");
        bool isMultiCurr = BusinessRuleHelper.IsMultiCurrencyEnabled();
        string datePattern = CultureInfo.CurrentCulture.DateTimeFormat.ShortDatePattern;

        string products = string.Empty;
        string emailBody = string.Format("{0} \r\n", GetLocalResourceObject("lblEmailInfo.Caption"));
        emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailAccount.Caption"),
            CheckForNullValue(salesOrder.Account.AccountName));
        emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailOpportunity.Caption"),
            CheckForNullValue(salesOrder.Opportunity != null
                ? salesOrder.Opportunity.Description
                : string.Empty));
        emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailDateCreated.Caption"),
            timeZone.UTCDateTimeToLocalTime((DateTime) salesOrder.CreateDate).ToString(datePattern));
        emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailDateRequested.Caption"),
            salesOrder.OrderDate.HasValue
                ? timeZone.UTCDateTimeToLocalTime((DateTime) salesOrder.OrderDate).ToString(
                    datePattern)
                : string.Empty);
        emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailDatePromised.Caption"),
            salesOrder.DatePromised.HasValue
                ? timeZone.UTCDateTimeToLocalTime((DateTime) salesOrder.DatePromised).ToString(
                    datePattern)
                : string.Empty);
        emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailSalesOrderId.Caption"),
            salesOrder.SalesOrderNumber);
        emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailType.Caption"),
            CheckForNullValue(salesOrder.OrderType));
        emailBody += string.Format("{0} {1} \r\n\r\n", GetLocalResourceObject("lblEmailStatus.Caption"),
            CheckForNullValue(salesOrder.Status));
        emailBody += string.Format("{0} {1} \r\n\r\n", GetLocalResourceObject("lblEmailComments.Caption"),
            CheckForNullValue(salesOrder.Comments));
        emailBody += string.Format("{0} \r\n", GetLocalResourceObject("lblEmailValue.Caption"));
        curBaseTotal.Text = salesOrder.GrandTotal.ToString();
        emailBody += string.Format("{0} \r\n",
            string.Format(GetLocalResourceObject("lblEmailBaseGrandTotal.Caption").ToString(),
                curBaseTotal.FormattedText));
        if (isMultiCurr)
        {
            curTotal.CurrentCode = salesOrder.CurrencyCode;
            curTotal.Text = salesOrder.DocGrandTotal.ToString();
            emailBody += string.Format("{0} \r\n",
                string.Format(GetLocalResourceObject("lblEmailSalesOrderGrandTotal.Caption").ToString(),
                    curTotal.FormattedText));
            emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailCurrencyCode.Caption"),
                CheckForNullValue(salesOrder.CurrencyCode));
            emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailExchangeRate.Caption"),
                CheckForNullValue(salesOrder.ExchangeRate));
            if (salesOrder.ExchangeRateDate.HasValue)
                emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailExchangeRateDate.Caption"),
                    timeZone.UTCDateTimeToLocalTime((DateTime) salesOrder.ExchangeRateDate).
                        ToString(datePattern));
            else
                emailBody += string.Format("{0} {1} \r\n", GetLocalResourceObject("lblEmailExchangeRateDate.Caption"),
                    GetLocalResourceObject("lblNone.Caption"));
        }

        emailBody += string.Format("\r\n{0} \r\n", GetLocalResourceObject("lblEmailProducts.Caption"));
        products = salesOrder.SalesOrderItems.Aggregate(products,
            (current, item) => current + string.Format("{0} ({1}); ", item.Product, item.Quantity));
        emailBody += string.Format("{0} \r\n", CheckForNullValue(products));
        emailBody += string.Format("\r\n{0} \r\n", GetLocalResourceObject("lblEmailBillShipAddress.Caption"));
        emailBody += string.Format("{0} \r\n", GetLocalResourceObject("lblEmailBillingAddress.Caption"));
        emailBody += string.Format("{0} {1} \r\n",
            GetLocalResourceObject("lblEmailBillingAddressName.Caption"),
            salesOrder.BillingContact == null ? string.Empty : salesOrder.BillingContact.NameLF);
        emailBody += salesOrder.BillingAddress.FormatFullSalesOrderAddress().Replace("\r\n", "\r\n");

        emailBody += string.Format("\r\n \r\n{0} \r\n", GetLocalResourceObject("lblEmailShippingAddress.Caption"));
        emailBody += string.Format("{0} {1} \r\n",
            GetLocalResourceObject("lblEmailShippingAddressName.Caption"),
            salesOrder.ShippingContact == null ? string.Empty : salesOrder.ShippingContact.NameLF);
        emailBody += salesOrder.ShippingAddress.FormatFullSalesOrderAddress().Replace("\r\n", "\r\n");
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