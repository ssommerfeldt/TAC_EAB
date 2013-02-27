using System;
using Sage.Entity.Interfaces;
using System.Data.OleDb;
using System.Data;


namespace EAB_Custom
{
    public class StockCarditemExtention
    {
        private static string GetSalesHistoryByIndex(int Index, string Accountid, string Productid)
        {
            string SQL = "SELECT     SUM(sysdba.SALESORDERITEMS.QUANTITY) AS Qty, sysdba.SALESORDER.ACCOUNTID, sysdba.SALESORDER.ORDERDATE, ";
                   SQL += "   sysdba.SALESORDERITEMS.PRODUCTID";
                   SQL += " FROM         sysdba.SALESORDERITEMS INNER JOIN";
                   SQL += "                      sysdba.SALESORDER ON sysdba.SALESORDERITEMS.SALESORDERID = sysdba.SALESORDER.SALESORDERID";
                   SQL += " WHERE     (sysdba.SALESORDERITEMS.QUANTITY > 0) AND (sysdba.SALESORDER.ACCOUNTID = '" + Accountid + "') AND ";
                   SQL += "                      (sysdba.SALESORDERITEMS.PRODUCTID = '" + Productid + "')";
                   SQL += " GROUP BY sysdba.SALESORDER.ACCOUNTID, sysdba.SALESORDER.ORDERDATE, sysdba.SALESORDERITEMS.PRODUCTID";
                   SQL += " ORDER BY sysdba.SALESORDER.ORDERDATE DESC";

            string  returnValue = "";
            int i = 1; //Intialize
            bool blnfound = false; //Intialize
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
                        returnValue = Convert.ToDateTime(r["ORDERDATE"]).ToShortDateString() + " -- " + r["Qty"].ToString ();
                        if (i == Index)
                        {
                            blnfound = true;
                            break;
                        }
                        i++;
                    }
                    r.Close();
                }
            }
            if (blnfound)
            {
                //If found return the Order and Qty
                return returnValue;

            }
            else
            {
                //Not found return Blank
                return "--";
            }
            

            
        }
        public static void GetLastOrderStep(IStockCardItems stockcarditems, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(1, stockcarditems.Accountid, stockcarditems.Productid);
        }
        public static void GetLastOrder2Step(IStockCardItems stockcarditems, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(2, stockcarditems.Accountid, stockcarditems.Productid);
        }
        public static void GetLastOrder3Step(IStockCardItems stockcarditems, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(3, stockcarditems.Accountid, stockcarditems.Productid);
        }
        public static void GetLastOrder4Step(IStockCardItems stockcarditems, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(4, stockcarditems.Accountid, stockcarditems.Productid);
        }
        public static void GetLastOrder5Step(IStockCardItems stockcarditems, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(5, stockcarditems.Accountid, stockcarditems.Productid);
        }
        public static void GetLastOrder6Step(IStockCardItems stockcarditems, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(6, stockcarditems.Accountid, stockcarditems.Productid);
        }
        public static void GetLastOrder7Step(IStockCardItems stockcarditems, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(7, stockcarditems.Accountid, stockcarditems.Productid);
        }
        public static void GetLastOrder8Step(IStockCardItems stockcarditems, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(8, stockcarditems.Accountid, stockcarditems.Productid);
        }
        public static void GetLastOrder9Step(IStockCardItems stockcarditems, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(9, stockcarditems.Accountid, stockcarditems.Productid);
        }
        public static void GetLastOrder10Step(IStockCardItems stockcarditems, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(10, stockcarditems.Accountid, stockcarditems.Productid);
        }
        public static void GetLastOrde11Step(IStockCardItems stockcarditems, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(11, stockcarditems.Accountid, stockcarditems.Productid);
        }
        public static void GetLastOrder12Step(IStockCardItems stockcarditems, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(12, stockcarditems.Accountid, stockcarditems.Productid);
        }
    }
}
