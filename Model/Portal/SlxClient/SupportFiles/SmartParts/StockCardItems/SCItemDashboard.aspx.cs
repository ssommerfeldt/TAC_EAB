using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.OleDb;
using System.Data;
public partial class _Default : System.Web.UI.Page 
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //this takes request parameters only from the query string

        string EntityID = Request.QueryString["entityid"];
        Sage.Entity.Interfaces.IStockCardItems _Entity = Sage.Platform.EntityFactory.GetById<Sage.Entity.Interfaces.IStockCardItems>(EntityID);

        if (EntityID != null)
        {
            string MonthValues = "";
            string MonthNames = "";
            for (int i = 12; i >= 0; i--)
            {
                DateTime MyDate = DateTime.Now.AddMonths(-i);
                MonthNames += MyDate.ToString("MMM") + ",";
                MonthValues += GetSalesHistoryTotals(MyDate.Month.ToString(), MyDate.ToString("yyyy"),  _Entity.Accountid, _Entity.Productid) + ",";
            }

            hiddenTotalValues.Value = Left(MonthValues, MonthValues.Length - 1); //"30,34,0,65,12,17,24,7,45,78,43,23";
            hiddenMonthValues.Value = Left(MonthNames, MonthNames.Length - 1); //Remove trailing comma
        }

     
       
    }
    private static string GetSalesHistoryTotals(string  strMonth, string strYear, string Accountid, string Productid)
    {
        string SQL = "SELECT     YEAR, MONTH, MMM, TotalQty, OrderCount, ACCOUNTID, PRODUCTID";
               SQL += " FROM         sysdba.vStockCardSalesHistoryDashBoard";
               SQL += " WHERE     (YEAR = '" + strYear  + "') AND (MONTH = '" + strMonth + "') AND (ACCOUNTID = '" +Accountid + "') AND (PRODUCTID = '" + Productid + "')";

        string returnValue = "0"; //Intialize
     
      
        // Generate In SQL statement
        Sage.Platform.Data.IDataService datasvc = Sage.Platform.Application.ApplicationContext.Current.Services.Get<Sage.Platform.Data.IDataService>();
        //using (System.Data.OleDb.OleDbConnection conn = new System.Data.OleDb.OleDbConnection(datasvc.GetConnectionString()))
        using (OleDbConnection conn = new OleDbConnection(datasvc.GetConnectionString()))
        {
            conn.Open();
            using (OleDbCommand cmd = new OleDbCommand(SQL, conn))
            {
                OleDbDataReader r = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (r.Read())
                {
                    returnValue = r["TotalQty"].ToString(); 
                   
                }
                r.Close();
            }
        }
       
           return returnValue;

    }
    public static string Left(string text, int length)
    {
        if (text != null)
        {

            if (length < 0)
                throw new ArgumentOutOfRangeException("length", length, "length must be > 0");
            else if (length == 0 || text.Length == 0)
                return "";
            else if (text.Length <= length)
                return text;
            else
                return text.Substring(0, length);
        }
        else
        {
            //Null String entered
            return string.Empty;
        }
    }
}