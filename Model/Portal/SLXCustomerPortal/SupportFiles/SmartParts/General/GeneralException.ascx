<%@ Control Language="C#" ClassName="GeneralException" %>
<%@ Import Namespace="Sage.Platform.Diagnostics" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        var sSlxErrorId = Page.Request.QueryString["exceptionid"];
        if (string.IsNullOrEmpty(sSlxErrorId)) return;
        var workItem = Sage.Platform.Application.ApplicationContext.Current.Parent;
        var exception = workItem.State[sSlxErrorId] as Exception;
        if (exception == null) return;
        var eKind = ErrorHelper.ExceptionKind.BaseException;
        ErrorHelper.ExceptionKind eTmpKind;        
        var sKind = Page.Request.Params["kind"];
        if ((!string.IsNullOrEmpty(sKind) && Enum.TryParse(sKind, out eTmpKind)))
        {
            eKind = eTmpKind;
        }
        string errorURL = Page.Request.QueryString["url"];
        if (string.IsNullOrEmpty(errorURL))
        {
            errorURL = workItem.State["CurrentURL"] as string;
        }
        ExceptionID.Text = ErrorHelper.GetErrorMessageContent(exception, Request, eKind, sSlxErrorId, true, true,
                                                              Resources.SalesLogix.MailDetailsLink, errorURL);
        workItem.State[sSlxErrorId] = null;
    }
</script>

<div style="padding:40px 40px;width:100%" class="lbl">
  <asp:Label ID="GeneralExeptionMessage" runat="server" meta:resourcekey="ExceptionMessage" />
  <asp:Label runat="server" ID="ExceptionID" />
</div>