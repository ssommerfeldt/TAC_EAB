using System;
using System.Web.UI;
using Sage.Platform.Application;
using Sage.Platform.Application.Services;
using Sage.Platform.Application.UI;
using Sage.Platform.WebPortal.SmartParts;

public partial class CustomerServiceOptions : UserControl, ISmartPartInfoProvider
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var userOptions = ApplicationContext.Current.Services.Get<IUserOptionsService>(true);
        var value = userOptions.GetCommonOption("AccountService", "CustomerService");
        value = userOptions.GetCommonOption("AutoPunchIn", "CustomerService");
        chkAutoPunchIn.Checked = value == "T";
        numPunchInMinutes.Enabled = chkAutoPunchIn.Checked;
        numPunchInMinutes.Text = userOptions.GetCommonOption("PunchInDelay", "CustomerService");
        value = userOptions.GetCommonOption("PunchOutDisplay", "CustomerService");
        chkDisplayTicketPunchOut.Checked = value == "T";
        value = userOptions.GetCommonOption("TicketActivity", "CustomerService");
        chkDisplayTicketOnCompletion.Checked = value == "T";
        numPunchInMinutes.TextChanged += numPunchInMinutes_ChangeAction;
        chkAutoPunchIn.CheckedChanged += chkAutoPunchIn_ChangeAction;
    }

    protected void chkAutoPunchIn_ChangeAction(object sender, EventArgs e)
    {
        numPunchInMinutes.Enabled = chkAutoPunchIn.Checked;
    }
    protected void numPunchInMinutes_ChangeAction(object sender, EventArgs e)
    {
        if (Convert.ToInt16(numPunchInMinutes.Text) < 0)
        {
            numPunchInMinutes.Text = "1";
        }
    }

    public ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        var tinfo = new ToolsSmartPartInfo();
        foreach (Control c in CustomerServiceOptions_RTools.Controls)
        {
            tinfo.RightTools.Add(c);
        }
        return tinfo;
    }

    protected void Save_OnClick(object sender, ImageClickEventArgs e)
    {
        var userOptions = ApplicationContext.Current.Services.Get<IUserOptionsService>(true);
        userOptions.SetCommonOption("AutoPunchIn", "CustomerService", chkAutoPunchIn.Checked ? "T" : "F", false);
        userOptions.SetCommonOption("PunchInDelay", "CustomerService", numPunchInMinutes.Text, false);
        userOptions.SetCommonOption("PunchOutDisplay", "CustomerService", chkDisplayTicketPunchOut.Checked ? "T" : "F", false);
        userOptions.SetCommonOption("TicketActivity", "CustomerService", chkDisplayTicketOnCompletion.Checked ? "T" : "F", false);
        userOptions.ClearCache();
    }
}