using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sage.Entity.Interfaces;
using Sage.Platform;
using System.Data.OleDb;
using System.Text.RegularExpressions;
using NHibernate;
using Sage.Platform.ChangeManagement;
using Sage.Platform.Security;


using Sage.Platform.Application;
using Sage.Platform.Application.UI;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.WebPortal.Workspaces;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.Security;
using Sage.Platform.WebPortal.Workspaces.Tab;
using Sage.Platform.Repository;
using System.Data;



namespace EAB_Custom
{
    public class Extentions
    {
        // Example of target method signature
        private static void AddEditAccountProductGroup(string Accountid, string CategoryID, Double Margin)
        {
            //Find if accou
            string ID = Extentions.GetField<string>("ACCOUNTPRODUCTCATEGORYID", "ACCOUNTPRODUCTCATEGORY", "PRODUCTCATEGORYID = '" + CategoryID + "' AND ACCOUNTID ='" + Accountid + "'");
            if (ID != string.Empty)
            {
                //Create the New Item
                Sage.Entity.Interfaces.IAccountProductCategory item = Sage.Platform.EntityFactory.Create<Sage.Entity.Interfaces.IAccountProductCategory>();
                item.Accountid = Accountid;
                item.ProductCategoryID = CategoryID;
                item.Margin = Margin;
                item.Save();


            }
            else
            {
                // uPDATE Existing
                Sage.Entity.Interfaces.IAccountProductCategory item = Sage.Platform.EntityFactory.GetById<Sage.Entity.Interfaces.IAccountProductCategory>(ID);

                item.Margin = Margin;
                item.Save();


            }

        }

        public static string GetUserWarhouseQueryString(String Userid)
        {
            String SQL = "SELECT     SITE.SITECODE ";
            SQL += "                      FROM         USERWHSE INNER JOIN";
            SQL += "                                            SITE ON USERWHSE.SITEID = SITE.SITEID";
            SQL += "                      WHERE     (USERWHSE.USERID = '" + Userid + "')";

            String returnValue = "(";


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
                        returnValue += "'" + r["SITECODE"].ToString() + "',";
                    }
                    r.Close();
                }
            }

            return returnValue += "'')";
        }

        public static void AddProductGroupItems(IStockCardItems stockcarditems, String CategoryID, IAccount Account, Double Margin)
        {
            //Add Update the Product Category Margin
            AddEditAccountProductGroup(Account.Id.ToString(), CategoryID, Margin);
            string CompanyID = GetField<string>("ISNULL(MASCOMPANYID,'')", "USERSECURITY", "USERID='" + Account.AccountManager.Id.ToString() + "'");
            string WareHouseIN = GetUserWarhouseQueryString(Account.AccountManager.Id.ToString());

            String SQL = "SELECT     PRODUCT.PRODUCTID, PRODUCT.ACTUALID, PRODUCT.DESCRIPTION, TIMPRODCATEGORY.TIMPRODCATEGORYID, ";
            SQL += "                      TIMPRODCATEGORY.PRODCATEGORYID,COMPANYID";
            SQL += " FROM         PRODUCT INNER JOIN";
            SQL += " TIMPRODCATITEM ON PRODUCT.MASITEMKEY = TIMPRODCATITEM.ITEMKEY INNER JOIN";
            SQL += " TIMPRODCATEGORY ON TIMPRODCATITEM.PRODCATEGORYKEY = TIMPRODCATEGORY.PRODCATEGORYKEY";
            SQL += " WHERE     (TIMPRODCATEGORY.TIMPRODCATEGORYID = '" + CategoryID + "') AND (sysdba.PRODUCT.COMPANYID = '" + CompanyID + "')";
            SQL += " AND (sysdba.PRODUCT.WAREHOUSEID in " + WareHouseIN + ") AND (sysdba.PRODUCT.PRODUCTID NOT IN";
            SQL += "              (SELECT     PRODUCTID";
            SQL += "                FROM          sysdba.STOCKCARDITEMS";
            SQL += "                WHERE      (ACCOUNTID = '" + Account.Id.ToString() + "')))";

            //Get Products That are not allready in the Accounts Stockcard, By Group
            Sage.Platform.Data.IDataService datasvc = Sage.Platform.Application.ApplicationContext.Current.Services.Get<Sage.Platform.Data.IDataService>();
            using (System.Data.OleDb.OleDbConnection conn = new System.Data.OleDb.OleDbConnection(datasvc.GetConnectionString()))
            {
                conn.Open();
                using (System.Data.OleDb.OleDbCommand cmd = new System.Data.OleDb.OleDbCommand(SQL, conn))
                {
                    OleDbDataReader reader = cmd.ExecuteReader();
                    //loop through the reader
                    while (reader.Read())
                    {
                        try
                        {
                            Sage.Entity.Interfaces.IProduct tmpProduct = Sage.Platform.EntityFactory.GetById<Sage.Entity.Interfaces.IProduct>(reader["PRODUCTID"].ToString());

                            Sage.Entity.Interfaces.IStockCardItems item = Sage.Platform.EntityFactory.Create<Sage.Entity.Interfaces.IStockCardItems>();
                            item.Accountid = Account.Id.ToString();
                            item.AccountName = Account.AccountName;


                            item.Productid = tmpProduct.Id.ToString();
                            item.ProductDescription = tmpProduct.Description;

                            item.TIMPRODCATEGORYID = CategoryID;
                            item.CategoryName = reader["PRODCATEGORYID"].ToString();

                            item.CompanyID = reader["COMPANYID"].ToString();
                            //item

                            item.Margin = Margin;
                            item.Save();


                        }
                        catch (Exception)
                        {


                        }

                    }
                    reader.Close();
                }

            }

        }

        // Example of target method signature
        public static void OnBeforeInsertStockCardItem(IStockCardItems StockCardItems, ISession session)
        {
            if (StockCardItems.ProductDescription == null)
            {
                StockCardItems.ProductDescription = StockCardItems.Product.Description;
                StockCardItems.CompanyID = StockCardItems.Product.CompanyID;
                StockCardItems.AccountName = StockCardItems.Account.AccountName;



                //String CategoryID = GetField<String>("TIMPRODCATITEMID","TIMPRODCATITEM","ITEMKEY='" + StockCardItems.Product.MASITEMKEY + "'");
                String SQL = "SELECT     sysdba.TIMPRODCATITEM.TIMPRODCATITEMID, Isnull(sysdba.TIMPRODCATEGORY.PRODCATEGORYID,'') as PRODCATEGORYID, sysdba.TIMPRODCATITEM.PRODCATEGORYKEY,  ";
                SQL += "    sysdba.TIMPRODCATITEM.ITEMKEY";
                SQL += " FROM         sysdba.TIMPRODCATITEM LEFT OUTER JOIN";
                SQL += "          sysdba.TIMPRODCATEGORY ON sysdba.TIMPRODCATITEM.PRODCATEGORYKEY = sysdba.TIMPRODCATEGORY.PARENTPRODCATKEY";
                SQL += " WHERE     (sysdba.TIMPRODCATITEM.ITEMKEY = '" + StockCardItems.Product.MASITEMKEY + "')";



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
                            StockCardItems.TIMPRODCATEGORYID = r["TIMPRODCATITEMID"].ToString();
                            StockCardItems.CategoryName = r["PRODCATEGORYID"].ToString();
                            //AddEditAccountProductGroup(StockCardItems.Accountid.ToString(), StockCardItems.TIMPRODCATEGORYID.ToString(), (Double)StockCardItems.Margin);

                        }
                        r.Close();
                    }
                }

                

            }

        }

        // Example of target method signature
        public static void OnBeforeUpdateStockCardItem(IStockCardItems StockCardItems, ISession session)
        {
            if (StockCardItems.ProductDescription == null)
            {
                StockCardItems.ProductDescription = StockCardItems.Product.Description;
                StockCardItems.CompanyID = StockCardItems.Product.CompanyID;
                StockCardItems.AccountName = StockCardItems.Account.AccountName;



                //String CategoryID = GetField<String>("TIMPRODCATITEMID","TIMPRODCATITEM","ITEMKEY='" + StockCardItems.Product.MASITEMKEY + "'");
                String SQL = "SELECT     sysdba.TIMPRODCATITEM.TIMPRODCATITEMID, Isnull(sysdba.TIMPRODCATEGORY.PRODCATEGORYID,'') as PRODCATEGORYID, sysdba.TIMPRODCATITEM.PRODCATEGORYKEY,  ";
                SQL += "    sysdba.TIMPRODCATITEM.ITEMKEY";
                SQL += " FROM         sysdba.TIMPRODCATITEM LEFT OUTER JOIN";
                SQL += "          sysdba.TIMPRODCATEGORY ON sysdba.TIMPRODCATITEM.PRODCATEGORYKEY = sysdba.TIMPRODCATEGORY.PARENTPRODCATKEY";
                SQL += " WHERE     (sysdba.TIMPRODCATITEM.ITEMKEY = '" + StockCardItems.Product.MASITEMKEY + "')";



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
                            StockCardItems.TIMPRODCATEGORYID = r["TIMPRODCATITEMID"].ToString();
                            StockCardItems.CategoryName = r["PRODCATEGORYID"].ToString();
                            //AddEditAccountProductGroup(StockCardItems.Accountid.ToString(), StockCardItems.TIMPRODCATEGORYID.ToString(), (Double)StockCardItems.Margin);

                        }
                        r.Close();
                    }
                }



            }

        }
        // Example of target method signature
        //=============================================================================
        // Need to send in Account as Parameter as the stockcarditem Account is null
        //============================================================================
        public static void GetDefaultMargin(IStockCardItems stockcarditems,String TIMPRODCATEGORYID,IAccount Account, out Double result)
        {
             
            String  tmpMargin;
            string ProdCategoryID = GetField<String>("Isnull(PRODCATEGORYID,'')","TIMPRODCATEGORY","TIMPRODCATEGORYID='" + TIMPRODCATEGORYID + "'");
            tmpMargin = GetField<String>("IsNull(PctAdj,'')", "vNationalAccountMargin", "CustID='" + Account.AccountFinancial.CustomerId + "' AND CompanyID ='" + Account.AccountFinancial.Companycode + "' AND  ProdPriceGroupID=' " + ProdCategoryID + "'");

            if (tmpMargin == string.Empty || tmpMargin == null )
            {
                //No National Pricing Exists
                // Try to get Default pricing...
                //
                tmpMargin = GetField<String>("Isnull(PctAdj,'0')", "vDefaultPriceGroupMargin", "ProdPriceGroupID = '" + ProdCategoryID + "' AND WhseID IN " + GetUserWarhouseQueryString(Account.AccountManager.Id.ToString()));
                if (tmpMargin == string.Empty || tmpMargin == null )
                {
                    result = 0;
                }
                else
                {
                    // Found
                    result = Convert.ToDouble (tmpMargin) ;
                }
            }
            else
            {

                //National pricing Found
                result = Convert.ToDouble(tmpMargin);
            }
        }


        #region Utility

        public static T GetField<T>(string Field, string Table, string Where)
        {
            string sql = string.Format("select {0} from {1} where {2}", Field, Table, (Where.Equals(string.Empty) ? "1=1" : Where));

            //get the DataService to get a connection string to the database
            Sage.Platform.Data.IDataService datasvc = Sage.Platform.Application.ApplicationContext.Current.Services.Get<Sage.Platform.Data.IDataService>();
            using (System.Data.OleDb.OleDbConnection conn = new System.Data.OleDb.OleDbConnection(datasvc.GetConnectionString()))
            {
                conn.Open();
                using (OleDbCommand cmd = new OleDbCommand(sql, conn))
                {
                    object fieldval = cmd.ExecuteScalar();
                    return fieldval == DBNull.Value ? default(T) : (T)fieldval;
                }
            }
        }
        private static DateTime Timelessize(DateTime dt)
        {
            DateTime timelessized = new DateTime(dt.Year, dt.Month, dt.Day, 00, 00, 05);
            return timelessized;
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
        #endregion
    }
}
