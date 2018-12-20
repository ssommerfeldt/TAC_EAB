using System;
using System.Web.UI;
using Sage.Platform.Security;
using Sage.Platform.WebPortal.SmartParts;
using Sage.Platform;
using Sage.Entity.Interfaces;
using Sage.Platform.Application;
using Sage.Platform.Application.UI;

public partial class SmartParts_UpdateOpportunityCurrency : EntityBoundSmartPartInfoProvider
{
    bool _blnGetValues;

    public override Type EntityType
    {
        get { return typeof(IOpportunity); }
    }

    protected override void OnAddEntityBindings()
    {
    }

    protected override void OnFormBound()
    {
        if (!_blnGetValues)
        {
            base.OnFormBound();
            var entity = BindingSource.Current as IOpportunity;
            lblOppCurRate.Text = string.Format(GetLocalResourceObject("OppsCurrentRate_rsc").ToString(), entity.ExchangeRateCode, Convert.ToString(entity.ExchangeRate.GetValueOrDefault(1)));
            lblRateDate.Text = string.Format(GetLocalResourceObject("RateAssignedOn_rsc").ToString(), Convert.ToString(entity.ExchangeRateDate.Value.ToShortDateString()));
            lveChangeRate.Text = entity.ExchangeRateCode;
            txtExchangeRate.Text = Convert.ToString(entity.ExchangeRate.GetValueOrDefault(1));

            var optionSvc = ApplicationContext.Current.Services.Get<Sage.SalesLogix.Services.ISystemOptionsService>(true);
            bool lockOppRate = optionSvc.LockOpportunityRate;
            chkLockRate.Enabled = lockOppRate;
            bool changeOppRate = optionSvc.ChangeOpportunityRate;
            txtExchangeRate.Enabled = changeOppRate;
            chkLockRate.Checked = entity.ExchangeRateLocked.Value;
            GetFromValues();
        }
    }

    private void GetFromValues()
    {
        var entity = BindingSource.Current as IOpportunity;
        curFrom.ExchangeRate = entity.ExchangeRate.GetValueOrDefault(1);
        curFrom.CurrentCode = entity.ExchangeRateCode;
        curFrom.Text = entity.SalesPotential.ToString();
    }

    protected void GetExchangeRate(object sender, EventArgs e)
    {
        var entity = BindingSource.Current as IOpportunity;
        var exchRate = EntityFactory.GetRepository<IExchangeRate>()
            .FindFirstByProperty("CurrencyCode", lveChangeRate.LookupResultValue);
        if (exchRate != null)
        {
            txtExchangeRate.Text = exchRate.Rate.ToString();
            lblRateCurrent.Text =
                string.Format(GetLocalResourceObject("ThisRateCurrent_rsc").ToString(),
                    Convert.ToString(exchRate.ModifyDate.Value.ToShortDateString()));
            GetFromValues();
            curTo.ExchangeRate = exchRate.Rate.GetValueOrDefault(1);
            curTo.CurrentCode = exchRate.Id.ToString();
            curTo.Text = Convert.ToString(entity.SalesPotential);
            lveChangeRate.Text = exchRate.Id.ToString();
            txtExchangeRate.Text = Convert.ToString(exchRate.Rate.GetValueOrDefault(1));
        }
        _blnGetValues = true;
    }

    protected void SetLocked(object sender, EventArgs e)
    {
        var entity = BindingSource.Current as IOpportunity;
        entity.ExchangeRateLocked = chkLockRate.Checked;
    }

    protected void cmdOK_Click(object sender, EventArgs e)
    {
        var opportunity = BindingSource.Current as IOpportunity;
        if (opportunity != null)
        {
            var exchRate = EntityFactory.GetRepository<IExchangeRate>()
                .FindFirstByProperty("CurrencyCode", lveChangeRate.Text);
            try
            {
                opportunity.ExchangeRateCode = exchRate.CurrencyCode;
                opportunity.ExchangeRate = Convert.ToDouble(txtExchangeRate.Text);
                opportunity.Save();
            }
            catch (Exception ex)
            {
                log.Error("Unexpected error in cmdOK_Click().", ex);
                throw new UserObservableApplicationException(
                    GetLocalResourceObject("Error_ChangingExchangeRate").ToString(), ex);
            }
        }
        DialogService.CloseEventHappened(sender, e);
        Refresh();
    }

    protected void cmdCancel_Click(object sender, EventArgs e)
    {
        DialogService.CloseEventHappened(sender, e);
    }

    #region ISmartPartInfoProvider Members

    public override ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        var tinfo = new ToolsSmartPartInfo();
        foreach (Control c in UpdateOpps_RTools.Controls)
        {
            tinfo.RightTools.Add(c);
        }
        return tinfo;
    }

    #endregion
}
