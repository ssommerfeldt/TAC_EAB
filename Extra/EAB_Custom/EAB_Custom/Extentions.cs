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



namespace EAB_Custom
{
    public class Extentions
    {
        // Example of target method signature
        public static void AddProductGroupItems(IStockCardItems stockcarditems, String CategoryID, IAccount Account, Double Margin)
        {
            String SQL = "SELECT     PRODUCT.PRODUCTID, PRODUCT.ACTUALID, PRODUCT.DESCRIPTION, TIMPRODCATEGORY.TIMPRODCATEGORYID, ";
            SQL += "                      TIMPRODCATEGORY.PRODCATEGORYID,COMPANYID";
            SQL += " FROM         PRODUCT INNER JOIN";
            SQL += " PRODUCTREFERENCE ON PRODUCT.PRODUCTID = PRODUCTREFERENCE.PRODUCTID INNER JOIN";
            SQL += " TIMPRODCATITEM ON PRODUCTREFERENCE.ITEMKEY = TIMPRODCATITEM.ITEMKEY INNER JOIN";
            SQL += " TIMPRODCATEGORY ON TIMPRODCATITEM.PRODCATEGORYKEY = TIMPRODCATEGORY.PRODCATEGORYKEY";
            SQL += " WHERE     (TIMPRODCATEGORY.TIMPRODCATEGORYID = '" + CategoryID + "')";
            SQL += " AND (sysdba.PRODUCT.PRODUCTID NOT IN";
            SQL += "              (SELECT     PRODUCTID";
            SQL += "                FROM          sysdba.STOCKCARDITEMS";
            SQL += "                WHERE      (ACCOUNTID = '" +Account.Id.ToString() + "')))";

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
    }
}
