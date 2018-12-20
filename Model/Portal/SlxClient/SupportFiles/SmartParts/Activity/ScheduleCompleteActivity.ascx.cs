using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;
using System.Web.UI.WebControls;
using Sage.Entity.Interfaces;
using Sage.Platform;
using Sage.Platform.Application;
using Sage.Platform.Application.UI;
using Sage.Platform.ComponentModel;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.Web.Controls.Lookup;
using TimeZone = Sage.Platform.TimeZone;

public partial class SmartParts_Activity_ScheduleCompleteActivity : EntityBoundSmartPartInfoProvider
{
    #region class Members

    private TimeZone _timeZone;

    [ContextDependency("TimeZone")]
    public TimeZone TimeZone
    {
        get { return _timeZone; }
        set { _timeZone = value; }
    }

    #endregion

    #region Page Lifecycle Events

    protected override void OnFormBound()
    {
        base.OnFormBound();

        if (IsActivating)
        {
            ResetForm();
            SetValuesFromEntityHistory();
            ClientBindingMgr.SetFocusTo(rbContact);
        }

        btnContinue.Enabled = NewUnscheduledActivity.Checked;
        divResults.Visible = false;

        if (CompleteScheduledActivity.Checked)
        {
            LookupControl lookup = GetBoundLookup();
            Session["entityName"] = lookup != null ? lookup.LookupEntityName : null;
            Session["entityId"] = lookup != null ? GetId(lookup.LookupResultValue) : null;
            OpenActivities.DataBind();
            divResults.Visible = true; 
        }
        if (Account.LookupResultValue != null)
        {
            SetSeedValues();
        }
        if (LeadId.LookupResultValue == null)
        {
            Company.Text = string.Empty;
        }

        ScriptManager.RegisterClientScriptInclude(this, GetType(), "ScheduleCompleteActivity", Page.ResolveUrl("~/SmartParts/Activity/ScheduleCompleteActivity.js"));
        var script = new StringBuilder();
        if (Page.IsPostBack)
        {
            script.Append(" Sage.UI.Forms.ScheduleCompleteActivity.init(" + GetWorkSpace() + " );");
        }
        else
        {
            script.Append("require(['dojo/ready'], function(ready) { " +
                          "ready(function () { Sage.UI.Forms.ScheduleCompleteActivity.init(" + GetWorkSpace() + "); }); " +
                          "});");
        }
        ScriptManager.RegisterStartupScript(this, GetType(), "initialize_ScheduleCompleteActivity", script.ToString(), true);
    }

    private string GetWorkSpace()
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("{");
        sb.AppendFormat("rdoContactID:'{0}',", rbContact.ClientID);
        sb.AppendFormat("rdoLeadID:'{0}',", rbContact.ClientID);
        sb.AppendFormat("rdoTypeID:'{0}',", ActivityTypeButtonList.ClientID);
        sb.AppendFormat("luAccountID:'{0}',", Account.ClientID);
        sb.AppendFormat("luContactID:'{0}',", Contact.ClientID);
        sb.AppendFormat("luOpportunityID:'{0}',", Opportunity.ClientID);
        sb.AppendFormat("luTicketID:'{0}',", Ticket.ClientID);
        sb.AppendFormat("luLeadID:'{0}',", LeadId.ClientID);
        sb.AppendFormat("btnCancelID:'{0}',", CancelButton.ClientID);
        sb.AppendFormat("divResultID:'{0}',", divResults.ClientID);
        sb.AppendFormat("txtCompanyID:'{0}',", Company.ClientID);
        sb.AppendFormat("resultHeight:'{0}'", "200");
        sb.Append("}");
        return sb.ToString();
    }

    private void ResetForm()
    {
        SetDivVisible(VisibleDiv.Contact);

        Contact.LookupResultValue = null;
        Account.LookupResultValue = null;
        Ticket.LookupResultValue = null;
        Opportunity.LookupResultValue = null;
        LeadId.LookupResultValue = null;

        NewUnscheduledActivity.Checked = true;
        ActivityTypeButtonList.ClearSelection();
        ActivityTypeButtonList.Items[0].Selected = true;

        CompleteScheduledActivity.Checked = false;
    }

    private void SetValuesFromEntityHistory()
    {
        foreach (EntityHistory hist in EntityContext.EntityHistory)
        {
            if (ValuesSet(hist)) return;
        }
    }

    private bool ValuesSet(EntityHistory hist)
    {
        switch (hist.EntityType.Name)
        {
            case "IAccount":
                IAccount account = EntityFactory.GetById<IAccount>(hist.EntityId.ToString());
                Account.LookupResultValue = account;
                Contact.LookupResultValue = GetPrimaryContact(account.Contacts);
                return true;
            case "IContact":
                IContact contact = EntityFactory.GetById<IContact>(hist.EntityId.ToString());
                Contact.LookupResultValue = contact;
                Account.LookupResultValue = contact.Account;
                return true;
            case "IOpportunity":
                IOpportunity opportunity = EntityFactory.GetById<IOpportunity>(hist.EntityId.ToString());
                Opportunity.LookupResultValue = opportunity;
                Account.LookupResultValue = opportunity.Account;
                foreach (IOpportunityContact oppContact in opportunity.Contacts)
                {
                    if (oppContact.IsPrimary.HasValue)
                    {
                        if ((bool)oppContact.IsPrimary)
                        {
                            Contact.LookupResultValue = oppContact.Contact;
                            break;
                        }
                    }
                }
                return true;
            case "ITicket":
                ITicket ticket = EntityFactory.GetById<ITicket>(hist.EntityId.ToString());
                Ticket.LookupResultValue = ticket;
                Account.LookupResultValue = ticket.Account;
                Contact.LookupResultValue = ticket.Contact;
                return true;
            case "ILead":
                SetDivVisible(VisibleDiv.Lead);
                ILead lead = EntityFactory.GetById<ILead>(hist.EntityId.ToString());
                LeadId.LookupResultValue = lead;
                Company.Text = lead.Company;
                return true;
        }
        return false;
    }

    private LookupControl GetBoundLookup()
    {
        if (rbLead.Checked && LeadId.LookupResultValue != null)
        {
            return LeadId;
        }
        if (rbContact.Checked)
        {
            if (Ticket.LookupResultValue != null)
            {
                return Ticket;
            }
            if (Opportunity.LookupResultValue != null)
            {
                return Opportunity;
            }
            if (Contact.LookupResultValue != null)
            {
                return Contact;
            }
            if (Account.LookupResultValue != null)
            {
                return Account;
            }
        }
        return null;
    }

    private static string GetId(object value)
    {
        IComponentReference compRef = value as IComponentReference;
        if (compRef != null)
        {
            return compRef.Id.ToString();
        }
        return string.Empty;
    }

    private void SetSeedValues()
    {
        var seedValue = (string) ((IAccount) Account.LookupResultValue).Id;
        Contact.InitializeLookup = true;
        Contact.SeedValue = seedValue;
        Opportunity.InitializeLookup = true;
        Opportunity.SeedValue = seedValue;
        Ticket.InitializeLookup = true;
        Ticket.SeedValue = seedValue;
        LeadId.InitializeLookup = false;
    }

    protected void OpenActivities_Sorting(object sender, GridViewSortEventArgs e)
    {
    }

    protected override void OnWireEventHandlers()
    {
        base.OnWireEventHandlers();
        CancelButton.Click += DialogService.CloseEventHappened;
        Contact.LookupResultValueChanged += Contact_LookupResultValueChanged;
        Account.LookupResultValueChanged += Account_LookupResultValueChanged;
        Opportunity.LookupResultValueChanged += Opportunity_LookupResultValueChanged;
        Ticket.LookupResultValueChanged += Ticket_LookupResultValueChanged;
        LeadId.LookupResultValueChanged += LeadId_LookupResultValueChanged;
        rbContact.CheckedChanged += rbContact_CheckedChanged;
        rbLead.CheckedChanged += rbLead_CheckedChanged;
    }

    private void rbLead_CheckedChanged(object sender, EventArgs e)
    {
        SetDivVisible(VisibleDiv.Lead);
    }

    private void rbContact_CheckedChanged(object sender, EventArgs e)
    {
        SetDivVisible(VisibleDiv.Contact);
    }

    private void SetDivVisible(VisibleDiv vd)
    {
        bool leadsVisible = (vd == VisibleDiv.Lead);
        leadsdiv.Visible = leadsVisible;
        rbLead.Checked = leadsVisible;
        contactsdiv.Visible = !leadsVisible;
        rbContact.Checked = !leadsVisible;
    }

    protected static string BuildCompleteActivityNavigateURL(object activityId)
    {
        return string.Format("javascript:Sage.UI.Forms.ScheduleCompleteActivity.completeActivity('{0}')", activityId);
    }

    #endregion

    #region Event Handlers

    private void Ticket_LookupResultValueChanged(object sender, EventArgs e)
    {
        var ticket = (ITicket)Ticket.LookupResultValue;
        if (ticket != null)
        {
            if (Account.LookupResultValue == null)
            {
                Account.LookupResultValue = ticket.Account;
            }
            SetContactFromPrimary(ticket.Account.Contacts);
        }
    }

    private void LeadId_LookupResultValueChanged(object sender, EventArgs e)
    {
        var lead = (ILead)LeadId.LookupResultValue;
        if (lead != null)
        {
            Company.Text = lead.Company;
            Contact.LookupResultValue = null;
            Account.LookupResultValue = null;
            Ticket.LookupResultValue = null;
            Opportunity.LookupResultValue = null;
        }
    }

    private void Opportunity_LookupResultValueChanged(object sender, EventArgs e)
    {
        var opportunity = (IOpportunity)Opportunity.LookupResultValue;
        if (opportunity != null)
        {
            if (Account.LookupResultValue == null)
            {
                Account.LookupResultValue = opportunity.Account;
            }
            SetPrimaryContactFromOppContacts(opportunity);
        }
    }

    private void Account_LookupResultValueChanged(object sender, EventArgs e)
    {
        var account = (IAccount)Account.LookupResultValue;
        if (account != null)
        {
            SetContactFromPrimary(account.Contacts);
        }
    }

    private void SetContactFromPrimary(IEnumerable<IContact> contacts)
    {
        if (Contact.LookupResultValue == null)
        {
            Contact.LookupResultValue = GetPrimaryContact(contacts);
        }
        LeadId.LookupResultValue = null;
    }

    private void SetPrimaryContactFromOppContacts(IOpportunity opportunity)
    {
        var contact = GetPrimaryOppContact(opportunity.Contacts) ??
                      GetPrimaryContact(opportunity.Account.Contacts);
        if (Contact.LookupResultValue == null)
        {
            Contact.LookupResultValue = contact;
        }
        LeadId.LookupResultValue = null;
    }

    private static IContact GetPrimaryContact(IEnumerable<IContact> contacts)
    {
        return contacts.FirstOrDefault(c => c.IsPrimary ?? false);
    }

    private static IContact GetPrimaryOppContact(IEnumerable<IOpportunityContact> oppContacts)
    {
        foreach (IOpportunityContact oc in oppContacts)
        {
            if (oc.IsPrimary ?? false)
            {
                return oc.Contact;
            }
        }
        return null;
    }

    private void Contact_LookupResultValueChanged(object sender, EventArgs e)
    {
        var contact = (IContact)Contact.LookupResultValue;
        if (contact != null && Account.LookupResultValue==null)
        {
            Account.LookupResultValue = contact.Account;
            LeadId.LookupResultValue = null;
        }
    }

    #endregion

    #region EntityBoundSmartPart

    protected override void OnAddEntityBindings()
    {
    }

    public override Type EntityType
    {
        get { return typeof(IActivity); }
    }

    public override ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        ToolsSmartPartInfo tinfo = new ToolsSmartPartInfo();
        foreach (Control c in ScheduleCompleteActivity_LTools.Controls)
        {
            tinfo.LeftTools.Add(c);
        }
        foreach (Control c in ScheduleCompleteActivity_CTools.Controls)
        {
            tinfo.CenterTools.Add(c);
        }
        foreach (Control c in ScheduleCompleteActivity_RTools.Controls)
        {
            tinfo.RightTools.Add(c);
        }
        return tinfo;
    }

    #endregion

    #region Private Helper Methods

    protected string GetLocalDateTime(object startDateObj, object timeLess)
    {
        DateTime startDate = Convert.ToDateTime(startDateObj);
        if ((bool)timeLess)
        {
            return startDate.ToShortDateString() + " (timeless)";
        }
        return _timeZone.UTCDateTimeToLocalTime(startDate).ToString("g");
    }

    protected string GetToolTip(object activityType)
    {
        string toolTip;
        switch ((ActivityType)activityType)
        {
            case ActivityType.atAppointment:
                toolTip = GetLocalResourceObject("ActivityType.ListItemMeeting.Text").ToString();
                break;
            case ActivityType.atPhoneCall:
                toolTip = GetLocalResourceObject("ActivityType.ListItemPhoneCall.Text").ToString();
                break;
            case ActivityType.atToDo:
                toolTip = GetLocalResourceObject("ActivityType.ListItemToDo.Text").ToString();
                break;
            case ActivityType.atPersonal:
                toolTip = GetLocalResourceObject("ActivityType.ListItemPersonal.Text").ToString();
                break;
            default:
                toolTip = GetLocalResourceObject("ActivityType.ListItemMeeting.Text").ToString();
                break;
        }
        return toolTip;
    }

    protected static string GetImage(object activityType)
    {
        switch ((ActivityType)activityType)
        {
            case ActivityType.atPhoneCall:
                return "~/images/icons/Call_16x16.gif";
            case ActivityType.atToDo:
                return "~/images/icons/To_Do_16x16.gif";
            case ActivityType.atPersonal:
                return "~/images/icons/Personal_16x16.gif";
            default:
                return "~/images/icons/Meeting_16x16.gif";
        }
    }

    #endregion

    private enum VisibleDiv
    {
        Contact,
        Lead
    }
}