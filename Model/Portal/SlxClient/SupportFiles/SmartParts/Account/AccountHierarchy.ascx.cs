using Sage.Entity.Interfaces;
using Sage.Platform;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.Web.Controls;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using Telerik.Web.UI;

public partial class SmartParts_Account_AccountHierarchy : EntityBoundSmartPartInfoProvider
{
    #region Properties

    private IAccount SelectedAccount
    {
        get
        {
            if (RadTreeView1.SelectedNode != null && RadTreeView1.SelectedNode.Value != null)
                return EntityFactory.GetById<IAccount>(RadTreeView1.SelectedNode.Value);
            return CurrentEntity;
        }
    }

    public override Type EntityType
    {
        get
        {
            return typeof(IAccount);
        }
    }

    public IAccount CurrentEntity
    {
        get
        {
            return BindingSource.Current as IAccount;
        }
    }
    #endregion

    #region Page Events

    protected void Page_Load(object sender, EventArgs e)
    {
        var script = new StringBuilder();
        script.AppendLine(@"require([
            'dojo/ready',
            'Sage/UI/ActivityEdit'
        ], function (ready, ActivityEdit) {");
       
        var baseScript = string.Format(
                  "window.setTimeout( function() {{ var a = new ActivityEdit({{'workspace': '{0}'}}); a.startup(); }}, 1);",
                  getMyWorkspace()
                  );

        if (!Page.IsPostBack)
        {
            script.AppendFormat("ready(function() {{ {0}; }} );", baseScript);
        }
        else
        {
            script.AppendLine(baseScript);
            DataBind(SelectedAccount);
        }
        script.AppendLine("});");// end require
        ScriptManager.RegisterClientScriptBlock(this, GetType(), "ActivityEdit", script.ToString(), true);
        
    }

    protected override void OnActivating()
    {
        if (CurrentEntity != null)
        {
            LoadTree(CurrentEntity.Id.ToString(), true);
        }
        SelectAccount(CurrentEntity);
    }

    protected override void OnAddEntityBindings()
    {
        var account = BindingSource.Current as IAccount;
        if (account != null)
        {
            SelectAccount(account);
        }
    }

    protected override void OnWireEventHandlers()
    {
        base.OnWireEventHandlers();
        btnClose.Click += DialogService.CloseEventHappened;
    }

    protected override void OnFormBound()
    {
        ClientBindingMgr.RegisterDialogCancelButton(btnClose);
    }

    public override Sage.Platform.Application.UI.ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        var tinfo = new ToolsSmartPartInfo();

        foreach (Control c in Controls)
        {
            var cont = c as SmartPartToolsContainer;
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

    protected void RadTreeView1_NodeClick(object sender, RadTreeNodeEventArgs e)
    {
        var byId = EntityFactory.GetById<IAccount>(e.Node.Value);
        SelectAccount(byId);
    }

    protected void RadTreeView1_NodeCreated(object sender, RadTreeNodeEventArgs e)
    {

    }

    protected void RadTreeView1_NodeDataBound(object sender, RadTreeNodeEventArgs e)
    {
        e.Node.ToolTip = e.Node.Text;
        if (e.Node.Text.Length > 50 - e.Node.Level)
        {
            e.Node.Text = e.Node.Text.Substring(0, 47 - e.Node.Level) + "...";
        }
    }

    protected void chkCascade_CheckedChanged(object sender, EventArgs e)
    {
        DataBind(SelectedAccount);
        SelectAccount(SelectedAccount);
    }

    protected void grdOpportunities_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        grdOpportunities.PageIndex = e.NewPageIndex;
        DataBind(SelectedAccount);
    }

    protected void grdContacts_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        grdContacts.PageIndex = e.NewPageIndex;
        DataBind(SelectedAccount);
    }

    protected void grdSalesOrders_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        grdSalesOrders.PageIndex = e.NewPageIndex;
        DataBind(SelectedAccount);
    }

    protected void grdTickets_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        grdTickets.PageIndex = e.NewPageIndex;
        DataBind(SelectedAccount);
    }

    protected void grdQuotes_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        grdQuotes.PageIndex = e.NewPageIndex;
        DataBind(SelectedAccount);
    }

    private void FormatHyperlink(GridViewRow r, string controlName, string navUrl, string displayName, int maxLength = 20)
    {
        if (r == null ||
            string.IsNullOrWhiteSpace(controlName) ||
            string.IsNullOrWhiteSpace(navUrl) ||
            string.IsNullOrWhiteSpace(displayName))
            return;

        var h = (HyperLink)r.FindControl(controlName);
        h.NavigateUrl = navUrl;
        h.Text = FormatTextAtLength(displayName, maxLength);
        h.ToolTip = displayName;
    }

    private string FormatTextAtLength(string text, int maxLength)
    {
        if (!string.IsNullOrWhiteSpace(text) && maxLength >= 4 && text.Length > maxLength)
        {
            return text.Substring(0, maxLength - 3) + "...";
        }
        return text;
    }

    protected void grdQuotes_RowCreated(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType != DataControlRowType.DataRow) return;
        var quote = e.Row.DataItem as IQuote;
        if (quote == null) return;

        FormatHyperlink(e.Row,
            "txtAccount",
            string.Format("../../Account.aspx?entityId={0}", quote.Account.Id),
            quote.Account.AccountName);

        var total = (Currency)e.Row.FindControl("txtGrandTotal");
        if (quote.GrandTotal.HasValue) total.Text = quote.GrandTotal.ToString();
    }

    protected void grdSalesOrders_RowCreated(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType != DataControlRowType.DataRow) return;
        var salesOrder = e.Row.DataItem as ISalesOrder;
        if (salesOrder == null) return;

        FormatHyperlink(e.Row,
            "txtAccount",
            string.Format("../../Account.aspx?entityId={0}", salesOrder.Account.Id),
            salesOrder.Account.AccountName);

        if (string.IsNullOrEmpty(salesOrder.CustomerPurchaseOrderNumber)) return;
        var po = (Label)e.Row.FindControl("txtCustomerPurchaseOrderNumber");
        po.Text = FormatTextAtLength(salesOrder.CustomerPurchaseOrderNumber, 20);
        po.ToolTip = salesOrder.CustomerPurchaseOrderNumber;
    }

    protected void grdActivities_RowCreated(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType != DataControlRowType.DataRow) return;
        var activity = e.Row.DataItem as IActivity;
        if (activity == null) return;

        FormatHyperlink(e.Row,
            "txtAccount",
            string.Format("../../Account.aspx?entityId={0}", activity.AccountId),
            activity.AccountName);

        var type = (HtmlGenericControl)e.Row.FindControl("txtType");
        type.InnerHtml = string.Format("<span onclick=\"javascript:Sage.Link.editActivity('{0}',{1});\" class=\"activity-type-link\">{2}</span>", activity.Id, activity.Recurring ? "true" : "false", ActivityTypeName(activity.Type));
        
        var startDate = (DateTimePicker)e.Row.FindControl("StartDate");
        startDate.Timeless = activity.Timeless;
        startDate.DateFormat = (activity.Timeless) ? "d" : "g";

        if (!string.IsNullOrEmpty(activity.Leader.ToString()))
        {
            var l = (Label)e.Row.FindControl("txtLeader");
            l.Text = FormatTextAtLength(activity.Leader.ToString(), 20);
            l.ToolTip = activity.Leader.ToString();
        }

        if (!string.IsNullOrEmpty(activity.Description))
        {
            var l = (Label)e.Row.FindControl("txtDescription");
            l.Text = FormatTextAtLength(activity.Description, 30);
            l.ToolTip = activity.Description;
        }
    }

    protected void grdContacts_RowCreated(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType != DataControlRowType.DataRow) return;
        var contact = e.Row.DataItem as IContact;
        if (contact == null) return;

        FormatHyperlink(e.Row,
            "txtAccount",
            string.Format("../../Account.aspx?entityId={0}", contact.Account.Id),
            contact.Account.AccountName);

        var phone = (Phone)e.Row.FindControl("txtPhone");
        phone.Text = contact.WorkPhone;

        var c = (HyperLink)e.Row.FindControl("txtContact");
        c.NavigateUrl = string.Format("../../Contact.aspx?entityId={0}", contact.Id);
        c.Text = FormatTextAtLength(contact.NameLF, 20);
        c.ToolTip = contact.NameLF;

        if (!string.IsNullOrEmpty(contact.Title))
        {
            var title = (Label)e.Row.FindControl("txtTitle");
            title.Text = FormatTextAtLength(contact.Title, 20);
            title.ToolTip = contact.Title;
        }

        if (!string.IsNullOrEmpty(contact.Email))
        {
            FormatHyperlink(e.Row,
                "txtEmail",
                string.Format("mailto:{0}", contact.Email),
                contact.Email,
                30);
        }
    }
    protected void grdOpportunities_RowCreated(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType != DataControlRowType.DataRow) return;
        var opportunity = e.Row.DataItem as IOpportunity;
        if (opportunity == null) return;

        FormatHyperlink(e.Row,
            "txtAccount",
            string.Format("../../Account.aspx?entityId={0}", opportunity.Account.Id),
            opportunity.Account.AccountName);

        var potential = (Currency)e.Row.FindControl("txtSalesPotential");
        if (opportunity.SalesPotential.HasValue) potential.Text = opportunity.SalesPotential.ToString();

        if (!string.IsNullOrEmpty(opportunity.Description))
        {
            var o = (HyperLink)e.Row.FindControl("txtOpportunity");
            o.NavigateUrl = string.Format("../../Opportunity.aspx?entityId={0}", opportunity.Id);
            o.Text = FormatTextAtLength(opportunity.Description, 20);
            o.ToolTip = opportunity.Description;
        }

        if (!string.IsNullOrEmpty(opportunity.AccountManager.ToString()))
        {
            var acm = (Label)e.Row.FindControl("txtAccountManager");
            acm.Text = FormatTextAtLength(opportunity.AccountManager.ToString(), 20);
            acm.ToolTip = opportunity.AccountManager.ToString();
        }
    }

    protected void grdTickets_RowCreated(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType != DataControlRowType.DataRow) return;

        var ticket = e.Row.DataItem as ITicket;
        if (ticket == null) return;

        FormatHyperlink(e.Row,
            "txtAccount",
            string.Format("../../Account.aspx?entityId={0}", ticket.Account.Id),
            ticket.Account.AccountName);

        var status = (Label)e.Row.FindControl("txtTicketStatus");
        status.Text = ticket.IsTicketStatusClosed() ? "Closed" : "Open";
        
        if (ticket.AssignedTo != null && !string.IsNullOrEmpty(ticket.AssignedTo.OwnerDescription))
        {
            var l = (Label)e.Row.FindControl("txtAssignedTo");
            l.Text = FormatTextAtLength(ticket.AssignedTo.OwnerDescription, 15);
            l.ToolTip = ticket.AssignedTo.OwnerDescription;
        }

        if (!string.IsNullOrEmpty(ticket.Category))
        {
            var l = (Label)e.Row.FindControl("txtCategory");
            l.Text = FormatTextAtLength(ticket.Category, 15);
            l.ToolTip = ticket.Category;
        }

        if (!string.IsNullOrEmpty(ticket.Subject))
        {
            var l = (Label)e.Row.FindControl("txtSubject");
            l.Text = FormatTextAtLength(ticket.Subject, 20);
            l.ToolTip = ticket.Subject;
        }
    }

    protected void grdContacts_Sorting(object sender, GridViewSortEventArgs e)
    {
        DataBind(SelectedAccount);
    }

    protected void grdActivities_Sorting(object sender, GridViewSortEventArgs e)
    {
        DataBind(SelectedAccount);
    }

    protected void grdSalesOrders_Sorting(object sender, GridViewSortEventArgs e)
    {
        DataBind(SelectedAccount);
    }

    protected void grdQuotes_Sorting(object sender, GridViewSortEventArgs e)
    {
        DataBind(SelectedAccount);
    }
    protected void grdTickets_Sorting(object sender, GridViewSortEventArgs e)
    {
        DataBind(SelectedAccount);
    }

    protected void grdOpportunities_Sorting(object sender, GridViewSortEventArgs e)
    {
        DataBind(SelectedAccount);
    }

    #endregion

    #region Private methods
    protected void LoadTree(string activeNode, bool expand)
    {
        if (CurrentEntity == null)
        {
            return;
        }

        var groupHierarchy = Sage.SalesLogix.Account.Helpers.GetAccountHierarchy(CurrentEntity);
        RadTreeView1.DataTextField = "Display";
        RadTreeView1.DataValueField = "Id";
        RadTreeView1.DataFieldID = "Id";
        RadTreeView1.DataFieldParentID = "ParentId";
        RadTreeView1.DataSource = groupHierarchy;
        RadTreeView1.DataBind();

        if (expand)
        {
            RadTreeView1.ExpandAllNodes();
        }

        if (!string.IsNullOrEmpty(activeNode))
        {
            var radTreeNode = RadTreeView1.FindNodeByValue(activeNode);
            if (radTreeNode != null)
            {
                radTreeNode.Selected = true;
            }
        }
    }

    private void SelectAccount(IAccount account)
    {
        var lbl = account.AccountName;
        if (lbl.Length > 50) lbl = lbl.Substring(0, 47) + "...";
        labelSelected.Text = string.Format("<a href=\"Account.aspx?entityId={0}\" title=\"{2}\" >{1}</a>", account.Id, lbl, account.AccountName);
        DataBind(account);
        UpdateOppSummary(account);
        // UpdateTicketsSummary(account);
        UpdateSalesOrderCount(account);
        UpdateQuotesCount(account);
        TotalInvoiced(account);
        TotalReceived(account);
    }

    private void UpdateTicketsSummary(IAccount account)
    {
        var total = 0;
        var closed = 0;
        foreach (var t in GetTickets(account))
        {
            total = total + 1;
            if (t.IsTicketStatusClosed()) closed = closed + 1;
        }
        // var open = total - closed;
        // this.lblTicketsLogged.Text = String.Format("{0}", total);
        // this.lblTicketsOpen.Text = String.Format("{0}", open);
        // this.lblTicketsClosed.Text = String.Format("{0}", closed);
    }

    private void UpdateOppSummary(IAccount account)
    {
        double oppopen = 0;
        double oppwon = 0;
        double opplost = 0;
        var numoppwon = 0;
        var numopplost = 0;
        foreach (var o in GetOpportunities(account))
        {
            if (!o.SalesPotential.HasValue) continue;
            switch (o.Status)
            {
                case "Open":
                    oppopen = oppopen + o.SalesPotential.Value;
                    break;
                case "Closed - Won":
                    oppwon = oppwon + o.SalesPotential.Value;
                    numoppwon = numoppwon + 1;
                    break;
                case "Closed - Lost":
                    opplost = opplost + o.SalesPotential.Value;
                    numopplost = numopplost + 1;
                    break;
            }
        }
        lblOppOpen.Text = oppopen.ToString(CultureInfo.CurrentCulture);
        lblOppWon.Text = oppwon.ToString(CultureInfo.CurrentCulture);
        lblOppLost.Text = opplost.ToString(CultureInfo.CurrentCulture);
        lblNumOppWon.Text = numoppwon.ToString(CultureInfo.CurrentCulture);
        lblNumOppLost.Text = numopplost.ToString(CultureInfo.CurrentCulture);
    }

    private void UpdateSalesOrderCount(IAccount account)
    {
        var salesOrderCount = CalculateSalesOrderCount(account);
        txtTotSalesOrders.Text = salesOrderCount.ToString(CultureInfo.CurrentCulture);
    }

    private int CalculateSalesOrderCount(IAccount account)
    {
        var soCount = account.SalesOrders.Count;
        if (chkCascade.Checked)
        {
            var node = RadTreeView1.FindNodeByValue(account.Id.ToString());
            if (node != null && node.Nodes != null)
            {
                foreach (RadTreeNode kid in node.Nodes)
                {
                    var childAccount = EntityFactory.GetById<IAccount>(kid.Value);
                    if (childAccount != null)
                    {
                        soCount += CalculateSalesOrderCount(childAccount);
                    }
                }
            }
        }
        return soCount;
    }

    private void UpdateQuotesCount(IAccount account)
    {
        var quoteCount = CalculateQuotesCount(account);
        txtTotQuotes.Text = quoteCount.ToString(CultureInfo.CurrentCulture);
    }

    private int CalculateQuotesCount(IAccount account)
    {
        var qCount = account.Quotes.Count;
        if (chkCascade.Checked)
        {
            var node = RadTreeView1.FindNodeByValue(account.Id.ToString());
            if (node != null && node.Nodes != null)
            {
                foreach (RadTreeNode kid in node.Nodes)
                {
                    var childAccount = EntityFactory.GetById<IAccount>(kid.Value);
                    if (childAccount != null)
                    {
                        qCount += CalculateQuotesCount(childAccount);
                    }
                }
            }
        }
        return qCount;
    }

    private void TotalInvoiced(IAccount account)
    {
        var invoiced = CalculateTotalInvoiced(account);
        txtAmtInvoiced.Text = invoiced.ToString(CultureInfo.CurrentCulture);
    }

    private double CalculateTotalInvoiced(IAccount account)
    {
        double invoiced = 0;
        foreach (var inv in account.ErpInvoices)
        {
            if (inv.GrandTotal.HasValue)
                invoiced += inv.GrandTotal.Value;
        }
        if (chkCascade.Checked)
        {
            var node = RadTreeView1.FindNodeByValue(account.Id.ToString());
            if (node != null && node.Nodes != null)
            {
                foreach (RadTreeNode kid in node.Nodes)
                {
                    var childAccount = EntityFactory.GetById<IAccount>(kid.Value);
                    if (childAccount != null)
                    {
                        invoiced += CalculateTotalInvoiced(childAccount);
                    }
                }
            }
        }
        return invoiced;
    }

    private void TotalReceived(IAccount account)
    {
        double received = CalculateTotalReceived(account);
        txtTotAmtReceived.Text = received.ToString(CultureInfo.CurrentCulture);
    }

    private double CalculateTotalReceived(IAccount account)
    {
        double received = 0;
        foreach (var inv in account.ErpReceivables)
        {
            if (inv.GrandTotal.HasValue)
                received += inv.GrandTotal.Value;
        }
        if (chkCascade.Checked)
        {
            var node = RadTreeView1.FindNodeByValue(account.Id.ToString());
            if (node != null && node.Nodes != null)
            {
                foreach (RadTreeNode kid in node.Nodes)
                {
                    var childAccount = EntityFactory.GetById<IAccount>(kid.Value);
                    if (childAccount != null)
                    {
                        received += CalculateTotalReceived(childAccount);
                    }
                }
            }
        }
        return received;
    }

    private void DataBind(IAccount account)
    {
        grdContacts.DataSource = GetContacts(account);
        grdContacts.DataBind();
        grdSalesOrders.DataSource = GetSalesOrders(account);
        grdSalesOrders.DataBind();
        grdOpportunities.DataSource = GetOpportunities(account);
        grdOpportunities.DataBind();
        grdTickets.DataSource = GetTickets(account);
        grdTickets.DataBind();
        grdActivities.DataSource = GetActivities(account);
        grdActivities.DataBind();
        grdQuotes.DataSource = GetQuotes(account);
        grdQuotes.DataBind();
    }

    private object[] GetAccountChildIds(IAccount account)
    {
        var accIds = new List<object> { account.Id.ToString() };
        var node = RadTreeView1.FindNodeByValue(account.Id.ToString());
        if (node != null && node.Nodes != null)
        {
            foreach (RadTreeNode kid in node.Nodes)
            {
                if (!accIds.Contains(kid.Value))
                {
                    var childAccount = EntityFactory.GetById<IAccount>(kid.Value);
                    accIds.AddRange(GetAccountChildIds(childAccount));
                }
            }
        }
        return accIds.ToArray();
    }

    private IList<IContact> GetContacts(IAccount account)
    {
        var repository = EntityFactory.GetRepository<IContact>();
        var queryable = (Sage.Platform.Repository.IQueryable)repository;
        var expressionFactory = queryable.GetExpressionFactory();
        var criteria = queryable.CreateCriteria();
        if (!chkCascade.Checked)
        {
            criteria.Add(expressionFactory.Eq("Account.Id", account.Id));
        }
        else
        {
            criteria.Add(expressionFactory.In("Account.Id", GetAccountChildIds(account)));
        }
        var sortex = grdContacts.SortExpression;
        var sortdirection = grdContacts.SortDirection;
        if (string.IsNullOrEmpty(sortex)) sortex = "NameLF";
        var sort = expressionFactory.Asc(sortex);
        if (sortdirection == SortDirection.Descending)
        {
            sort = expressionFactory.Desc(sortex);
        }
        criteria.AddOrder(sort);
        return criteria.List<IContact>();
    }

    private IList<IOpportunity> GetOpportunities(IAccount account)
    {
        var repository = EntityFactory.GetRepository<IOpportunity>();
        var queryable = (Sage.Platform.Repository.IQueryable)repository;
        var expressionFactory = queryable.GetExpressionFactory();
        var criteria = queryable.CreateCriteria();

        if (!chkCascade.Checked)
            criteria.Add(expressionFactory.Eq("Account.Id", account.Id));
        else
        {
            criteria.Add(expressionFactory.In("Account.Id", GetAccountChildIds(account)));
        }
        var sortex = grdOpportunities.SortExpression;
        var sortdirection = grdOpportunities.SortDirection;

        if (string.IsNullOrEmpty(sortex)) sortex = "Description";
        var sort = expressionFactory.Asc(sortex);
        if (sortdirection == SortDirection.Descending)
            sort = expressionFactory.Desc(sortex);
        criteria.AddOrder(sort);
        var lst = criteria.List<IOpportunity>();

        if (sortex == "Account")
        {
            return sortdirection == SortDirection.Descending ? lst.OrderByDescending(a => a.Account.AccountName).ToList() : lst.OrderBy(a => a.Account.AccountName).ToList();
        }
        return lst;

    }

    private IList<IActivity> GetActivities(IAccount account)
    {
        var repository = EntityFactory.GetRepository<IActivity>();
        var queryable = (Sage.Platform.Repository.IQueryable)repository;
        var expressionFactory = queryable.GetExpressionFactory();
        var criteria = queryable.CreateCriteria();

        if (!chkCascade.Checked)
        {
            criteria.Add(expressionFactory.Eq("AccountId", account.Id));
        }
        else
        {
            criteria.Add(expressionFactory.In("AccountId", GetAccountChildIds(account)));
        }

        var acttype = new List<ActivityType>
        {
            ActivityType.atAppointment,
            ActivityType.atPhoneCall,
            ActivityType.atToDo,
            ActivityType.atPersonal
        };
        criteria.Add(expressionFactory.In("Type", acttype.ToArray()));

        var sortex = grdActivities.SortExpression;
        var sortdirection = grdActivities.SortDirection;
        if (string.IsNullOrEmpty(sortex)) sortex = "CreateDate";

        var sort = expressionFactory.Asc(sortex);
        if (sortdirection == SortDirection.Descending)
        {
            sort = expressionFactory.Desc(sortex);
        }
        criteria.AddOrder(sort);
        return criteria.List<IActivity>();
    }

    private IList<ISalesOrder> GetSalesOrders(IAccount account)
    {
        var repository = EntityFactory.GetRepository<ISalesOrder>();
        var queryable = (Sage.Platform.Repository.IQueryable)repository;
        var expressionFactory = queryable.GetExpressionFactory();
        var criteria = queryable.CreateCriteria();

        if (!chkCascade.Checked)
        {
            criteria.Add(expressionFactory.Eq("Account.Id", account.Id));
        }
        else
        {
            criteria.Add(expressionFactory.In("Account.Id", GetAccountChildIds(account)));
        }
        
        var sortex = grdSalesOrders.SortExpression;
        var sortdirection = grdSalesOrders.SortDirection;
        if (string.IsNullOrEmpty(sortex)) sortex = "SalesOrderNumber";
        var sort = expressionFactory.Asc(sortex);
        if (sortdirection == SortDirection.Descending)
            sort = expressionFactory.Desc(sortex);

        criteria.AddOrder(sort);
        var lst = criteria.List<ISalesOrder>();
        if (sortex == "Account")
        {
            return sortdirection == SortDirection.Descending ? lst.OrderByDescending(a => a.Account.AccountName).ToList() : lst.OrderBy(a => a.Account.AccountName).ToList();
        }
        return lst;
    }

    private IList<IQuote> GetQuotes(IAccount account)
    {
        var repository = EntityFactory.GetRepository<IQuote>();
        var queryable = (Sage.Platform.Repository.IQueryable)repository;
        var expressionFactory = queryable.GetExpressionFactory();
        var criteria = queryable.CreateCriteria();

        if (!chkCascade.Checked)
        {
            criteria.Add(expressionFactory.Eq("Account.Id", account.Id));
        }
        else
        {
            criteria.Add(expressionFactory.In("Account.Id", GetAccountChildIds(account)));
        }
        
        var sortex = grdQuotes.SortExpression;
        var sortdirection = grdQuotes.SortDirection;

        if (string.IsNullOrEmpty(sortex)) sortex = "QuoteNumber";

        var sort = expressionFactory.Asc(sortex);
        if (sortdirection == SortDirection.Descending)
            sort = expressionFactory.Desc(sortex);
        criteria.AddOrder(sort);
        var lst = criteria.List<IQuote>();

        if (sortex == "Account")
        {
            return sortdirection == SortDirection.Descending ? lst.OrderByDescending(a => a.Account.AccountName).ToList() : lst.OrderBy(a => a.Account.AccountName).ToList();
        }
        return lst;
    }

    private IList<ITicket> GetTickets(IAccount account)
    {
        var repository = EntityFactory.GetRepository<ITicket>();
        var queryable = (Sage.Platform.Repository.IQueryable)repository;
        var expressionFactory = queryable.GetExpressionFactory();
        var criteria = queryable.CreateCriteria();

        if (!chkCascade.Checked)
        {
            criteria.Add(expressionFactory.Eq("Account.Id", account.Id));
        }
        else
        {
            criteria.Add(expressionFactory.In("Account.Id", GetAccountChildIds(account)));
        }

        var sortex = grdTickets.SortExpression;
        var sortdirection = grdTickets.SortDirection;
        if (string.IsNullOrEmpty(sortex)) sortex = "TicketNumber";
        var sort = expressionFactory.Asc(sortex);
        if (sortdirection == SortDirection.Descending)
        {
            sort = expressionFactory.Desc(sortex);
        }
        criteria.AddOrder(sort);

        var lst = criteria.List<ITicket>();
        if (sortex == "Account")
        {
            return sortdirection == SortDirection.Descending ? lst.OrderByDescending(a => a.Account.AccountName).ToList() : lst.OrderBy(a => a.Account.AccountName).ToList();
        }
        return lst;
    }

    public string ActivityTypeName(ActivityType type)
    {
        switch (type)
        {
            case ActivityType.atPhoneCall:
                return GetLocalResourceObject("ActivityType_PhoneCall").ToString();
            case ActivityType.atAppointment:
                return GetLocalResourceObject("ActivityType_Appointment").ToString();
            case ActivityType.atToDo:
                return GetLocalResourceObject("ActivityType_ToDo").ToString();
            case ActivityType.atPersonal:
                return GetLocalResourceObject("ActivityType_Personal").ToString();
            default:
                return GetLocalResourceObject("ActivityType_None").ToString();
        }
    }

    #endregion
}
