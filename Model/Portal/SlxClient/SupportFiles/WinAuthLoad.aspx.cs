using System;
using System.Web;
using System.Web.UI;

public partial class WinAuthLoad : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        HiddenField1.Value = Session["next_url"].ToString();
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        var url = Uri.UnescapeDataString(Session["next_url"].ToString());
        Response.Redirect(url);
    }
}