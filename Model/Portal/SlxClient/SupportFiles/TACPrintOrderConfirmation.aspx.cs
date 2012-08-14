using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Sage.Entity.Interfaces;
using Sage.Platform;
using System.Data.SqlClient;

public partial class SmartParts_TACPrintOrderConfirmation : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //this takes request parameters only from the query string
        string SalesOrderID = Request.QueryString["salesorderid"];
        if (SalesOrderID == null)
        {
            SalesOrderID = "QDEMOA0019C7"; //FOR Testing
        }
        if (SalesOrderID == null)
        {
            Response.Write("No Valid SalesOrderID provided");
        }
        else
        {

            try
            {
                Sage.Entity.Interfaces.ISalesOrder salesOrder = Sage.Platform.EntityFactory.GetById<Sage.Entity.Interfaces.ISalesOrder>(SalesOrderID);


                string reportPath = Server.MapPath("CrystalReports\\SalesOrderDetail.rpt");
                CrystalDecisions.CrystalReports.Engine.ReportDocument crReport = new CrystalDecisions.CrystalReports.Engine.ReportDocument();

                crReport.Load(reportPath);
                crReport.RecordSelectionFormula = "{SALESORDER.SALESORDERID} = '" + salesOrder.Id.ToString() + "'";

                //Retrieve connection string information
                // get the DataService to get a connection string to the database
                Sage.Platform.Data.IDataService datasvc = Sage.Platform.Application.ApplicationContext.Current.Services.Get<Sage.Platform.Data.IDataService>();

                string connectionString = datasvc.GetConnectionString();

                System.Data.Common.DbConnectionStringBuilder builder = new System.Data.Common.DbConnectionStringBuilder();
                builder.ConnectionString = connectionString;

                string password = builder["Password"].ToString() ;
                string username = builder["User ID"].ToString();
                string dataSource = datasvc.Server;
                string initialCatalog = datasvc.Alias;

                //Define new connection for Crystal Report
                CrystalDecisions.Shared.ConnectionInfo connectionInfo = new CrystalDecisions.Shared.ConnectionInfo();
                connectionInfo.DatabaseName = initialCatalog;
                connectionInfo.UserID = username;
                connectionInfo.Password = password;
                connectionInfo.ServerName = dataSource;

                // set report connection for main report
                SetDBLogonForReport(connectionInfo, crReport);
                // set report connection for any subreports
                SetDBLogonForSubreports(connectionInfo, crReport);
                //System.IO.MemoryStream ms = (System.IO.MemoryStream)crReport.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                //Response.BinaryWrite(ms.ToArray());
                String filename = "exportedPDF/SalesOrder" + salesOrder.AlternateKeyPrefix + "-" + salesOrder.AlternateKeySuffix + ".pdf";
                crReport.ExportToDisk(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat, Server.MapPath(filename));

                //string popupScript = "<script language='javascript'>" + "window.open('C:/BiWeeklyReport.pdf'); <//script>";
                //ScriptManager.RegisterStartupScript(Page, Page.GetType(), "popupOpener", "var popup=window.open('" + filename + "');popup.focus();", true);



                //string jsScript = "window.close();";
                //ScriptManager.RegisterStartupScript(Page, Page.GetType(), "AlertJS", jsScript, true);
                //Page.ClientScript.RegisterOnSubmitStatement(typeof(Page), "closePage", "window.onunload = CloseWindow();");
                Response.Redirect(filename);


            }
            catch (System.Threading.ThreadAbortException ex)
            {

            }
            finally
            {
                //Response.End();
            }
        }


    }
    private void SetDBLogonForReport(CrystalDecisions.Shared.ConnectionInfo connectionInfo, CrystalDecisions.CrystalReports.Engine.ReportDocument reportDocument)
    {
        CrystalDecisions.CrystalReports.Engine.Tables tables = reportDocument.Database.Tables;
        foreach (CrystalDecisions.CrystalReports.Engine.Table table in tables)
        {
            CrystalDecisions.Shared.TableLogOnInfo tableLogonInfo = table.LogOnInfo;
            tableLogonInfo.ConnectionInfo = connectionInfo;
            table.ApplyLogOnInfo(tableLogonInfo);
        }
    }



    private void SetDBLogonForSubreports(CrystalDecisions.Shared.ConnectionInfo connectionInfo, CrystalDecisions.CrystalReports.Engine.ReportDocument reportDocument)
    {
        CrystalDecisions.CrystalReports.Engine.Sections sections = reportDocument.ReportDefinition.Sections;

        foreach (CrystalDecisions.CrystalReports.Engine.Section section in sections)
        {

            CrystalDecisions.CrystalReports.Engine.ReportObjects reportObjects = section.ReportObjects;

            foreach (CrystalDecisions.CrystalReports.Engine.ReportObject reportObject in reportObjects)
            {
                if (reportObject.Kind == CrystalDecisions.Shared.ReportObjectKind.SubreportObject)
                {
                    CrystalDecisions.CrystalReports.Engine.SubreportObject subreportObject = (CrystalDecisions.CrystalReports.Engine.SubreportObject)reportObject;
                    CrystalDecisions.CrystalReports.Engine.ReportDocument subReportDocument = subreportObject.OpenSubreport(subreportObject.SubreportName);
                    SetDBLogonForReport(connectionInfo, subReportDocument);
                }
            }
        }
    }
}