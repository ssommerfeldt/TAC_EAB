using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using Sage.Entity.Interfaces;
using NHibernate;
using System.Data.OleDb;
using System.Data;
using Sage.Platform.ComponentModel;



namespace EAB_Custom {
    public class SalesOrderItemExtension {


        public static void OnBeforeInsertGetPricing(Sage.Entity.Interfaces.ISalesOrderItem salesorderitem, NHibernate.ISession session) {
            GetStockCardPricing(salesorderitem);
            //salesorderitem.CalculateExtendedPrice();
        }


        public static void GetStockCardPricing(ISalesOrderItem salesorderitem) {
            try {
                // Set the pricing from stock card
                double listPrice = 0;
                try {
                    if (salesorderitem.Product != null) {
                        if (salesorderitem.Product.Vproductpricesheet != null) {
                            listPrice = (double)salesorderitem.Product.Vproductpricesheet.Listprice;
                        } else {
                            //price not found
                        }
                    }
                } catch (Exception ex) {
                    //vproductpricesheet record not found
                    Sage.Platform.Application.Exceptions.EventLogExceptionHandler eh = new Sage.Platform.Application.Exceptions.EventLogExceptionHandler();
                    eh.HandleException(new Exception("Order (" + salesorderitem.SalesOrder.SalesOrderNumber + "): " + ex.Message, ex), false);
                }


                Sage.Platform.RepositoryHelper<IStockCardItems> rep1 = Sage.Platform.EntityFactory.GetRepositoryHelper<IStockCardItems>();
                Sage.Platform.Repository.ICriteria crit1 = rep1.CreateCriteria();

                if (salesorderitem.SalesOrder != null) {
                    if (salesorderitem.SalesOrder.Account != null) {
                        crit1.Add(rep1.EF.Eq("Accountid", salesorderitem.SalesOrder.Account.Id));

                        if (salesorderitem.Product != null) {
                            crit1.Add(rep1.EF.Eq("Productid", salesorderitem.Product.Id));


                            double margin = 0;
                            foreach (IStockCardItems scard in crit1.List<IStockCardItems>()) {
                                margin = scard.Margin ?? 0;
                                break;
                            }

                            salesorderitem.Price = Math.Round(listPrice, 2);
                            salesorderitem.Discount = margin;
                            salesorderitem.CalculatedPrice = Math.Round((Decimal)listPrice - ((Decimal)listPrice * (Decimal)margin), 2, MidpointRounding.AwayFromZero);
                            salesorderitem.ExtendedPrice = Math.Round((Double)salesorderitem.CalculatedPrice * (Double)salesorderitem.Quantity, 2, MidpointRounding.AwayFromZero);
                            salesorderitem.UPC = salesorderitem.Product.UPC;

                            //Set a value on salesorder to recalculate totals on save
                            salesorderitem.SalesOrder.Tick = salesorderitem.SalesOrder.Tick + 1 ?? 1;
                        }
                    }
                }
            } catch (Exception e) {
                throw new Exception("Order (" + salesorderitem.SalesOrder.SalesOrderNumber + "): " + e.Message, e);
            }
        }


        public static void SaveProductToSalesOrderItem(ISalesOrderItem salesorderitem) {
            try {
                if (salesorderitem.Product != null) {

                    //item.SalesOrder = salesorder;
                    salesorderitem.ActualID = salesorderitem.Product.ActualId;
                    salesorderitem.Description = salesorderitem.Product.Description;
                    salesorderitem.Family = salesorderitem.Product.Family;
                    salesorderitem.UPC = salesorderitem.Product.UPC;

                    //get margin from category
                    salesorderitem.Discount = 0;

                    if (salesorderitem.SalesOrder != null) {
                        if (salesorderitem.SalesOrder.Account != null) {

                            String sql = "SELECT ACCOUNTPRODUCTCATEGORY.MARGIN";
                            sql += " FROM PRODUCT";
                            sql += " INNER JOIN TIMPRODCATITEM ON PRODUCT.MASITEMKEY = TIMPRODCATITEM.ITEMKEY";
                            sql += " INNER JOIN TIMPRODCATEGORY ON TIMPRODCATITEM.PRODCATEGORYKEY = TIMPRODCATEGORY.PRODCATEGORYKEY";
                            sql += " INNER JOIN ACCOUNTPRODUCTCATEGORY ON TIMPRODCATEGORY.TIMPRODCATEGORYID = ACCOUNTPRODUCTCATEGORY.PRODUCTCATEGORYID";
                            sql += " Where ProductId = '" + salesorderitem.Product.Id.ToString() + "'";
                            sql += " And AccountId = '" + salesorderitem.SalesOrder.Account.Id.ToString() + "'";

                            Sage.Platform.Data.IDataService datasvc = Sage.Platform.Application.ApplicationContext.Current.Services.Get<Sage.Platform.Data.IDataService>();
                            using (System.Data.OleDb.OleDbConnection conn = new System.Data.OleDb.OleDbConnection(datasvc.GetConnectionString())) {
                                conn.Open();
                                using (System.Data.OleDb.OleDbCommand cmd = new System.Data.OleDb.OleDbCommand(sql, conn)) {
                                    OleDbDataReader reader = cmd.ExecuteReader();
                                    //loop through the reader
                                    while (reader.Read()) {
                                        try {
                                            salesorderitem.Discount = (Double)reader["MARGIN"];
                                        } catch (Exception) {
                                            //no catch?
                                            salesorderitem.Discount = 0;
                                        }
                                    }
                                    reader.Close();
                                }
                            }
                        }
                    }

                    //get msrp price
                    salesorderitem.Price = 0;
                    try {
                        if (salesorderitem.Product != null) {
                            if (salesorderitem.Product.Vproductpricesheet != null) {
                                salesorderitem.Price = (double)salesorderitem.Product.Vproductpricesheet.Listprice;
                            } else {
                                //price not found
                            }
                        }
                    } catch (Exception ex) {
                        //vproductpricesheet record not found
                        Sage.Platform.Application.Exceptions.EventLogExceptionHandler eh = new Sage.Platform.Application.Exceptions.EventLogExceptionHandler();
                        eh.HandleException(new Exception("Order (" + salesorderitem.SalesOrder.SalesOrderNumber + "): " + ex.Message, ex), false);
                    }

                    salesorderitem.Quantity = 0; //set to 0 initially
                    salesorderitem.ExtendedPrice = salesorderitem.Price * salesorderitem.Quantity * salesorderitem.Discount;
                    salesorderitem.ProductName = salesorderitem.Product.Name;
                    salesorderitem.Program = salesorderitem.Product.Program;
                    salesorderitem.UnitOfMeasureId = salesorderitem.Product.UnitOfMeasureId.Trim();

                    //item.GetStockCardPricing();			

                }
            } catch (Exception e) {
                throw new Exception("Order (" + salesorderitem.SalesOrder.SalesOrderNumber + "): " + e.Message, e);
            }
        }


         public static void UPCSearch(ISalesOrderItem salesorderitem) {
            if (!String.IsNullOrEmpty (salesorderitem.UPC)) {
                //Clear the current product
                salesorderitem.Product = null;

                //Lookup UPC from products
                Sage.Platform.RepositoryHelper<Sage.Entity.Interfaces.IProduct> f = Sage.Platform.EntityFactory.GetRepositoryHelper<Sage.Entity.Interfaces.IProduct>();
                Sage.Platform.Repository.ICriteria crit = f.CreateCriteria();

                if (salesorderitem.SalesOrder.UserWareHouse != null) {
                    crit.Add(f.EF.Eq("WarehouseID", salesorderitem.SalesOrder.UserWareHouse.SiteCodeId));
                    crit.Add(f.EF.Eq("UPC", salesorderitem.UPC));

                    //For returns on show return items. for all others do not show returns or bulk
                    if (salesorderitem.SalesOrder.OrderType == "Return Order") {
                        crit.Add(f.EF.Eq("Family", "Exchange Returns"));
                    } else {
                        crit.Add(f.EF.And(f.EF.Ne("Family", "Exchange Returns"), f.EF.Ne("Family", "Bulk Products")));                        
                    }

                    foreach (Sage.Entity.Interfaces.IProduct product in crit.List<Sage.Entity.Interfaces.IProduct>()) {
                        salesorderitem.Product = product;
                        salesorderitem.ActualID = product.ActualId;

                        //save the product found to salesorder
                        SaveProductToSalesOrderItem(salesorderitem);

                        break;
                    }
                }
                if (salesorderitem.Product == null) {
                    throw new Exception("UPC not found.             ");
                }        
            }            
        }


        public static void SKUSearch(ISalesOrderItem salesorderitem) {
            if (!String.IsNullOrEmpty (salesorderitem.ActualID)) {
                //Clear the current product
                salesorderitem.Product = null;

                //Lookup SKU from products
                Sage.Platform.RepositoryHelper<Sage.Entity.Interfaces.IProduct> f = Sage.Platform.EntityFactory.GetRepositoryHelper<Sage.Entity.Interfaces.IProduct>();
                Sage.Platform.Repository.ICriteria crit = f.CreateCriteria();

                if (salesorderitem.SalesOrder.UserWareHouse != null) {
                    crit.Add(f.EF.Eq("WarehouseID", salesorderitem.SalesOrder.UserWareHouse.SiteCodeId));
                    crit.Add(f.EF.Eq("ActualId", salesorderitem.ActualID));

                    if (salesorderitem.SalesOrder.OrderType == "Return Order") {
                        crit.Add(f.EF.Eq("Family", "Exchange Returns"));
                    } else {
                        crit.Add(f.EF.And(f.EF.Ne("Family", "Exchange Returns"), f.EF.Ne("Family", "Bulk Products")));
                    }

                    foreach (Sage.Entity.Interfaces.IProduct product in crit.List<Sage.Entity.Interfaces.IProduct>()) {
                        salesorderitem.Product = product;
                        salesorderitem.ActualID = product.ActualId;

                        //save the product found to salesorder
                        SaveProductToSalesOrderItem(salesorderitem);

                        break;
                    }
                }
                if (salesorderitem.Product == null) {
                    throw new Exception("SKU not found.             ");
                }
            }
        }


        public static void OnBeforeQuantityChanged(ISalesOrderItem salesorderitem, ExtendedPropertyChangedEventArgs args) {
            //the quantity cannot be more than the quantity available
            if (args.NewValue != args.OldValue) {
                if (salesorderitem.Product != null) {
                    if ((double)args.NewValue < 0 || (double)args.NewValue > salesorderitem.Product.QtyAvailable) {
                        //quantity not valid
                        if (args.OldValue == null) {
                            args.NewValue = 0;
                        } else {
                            args.NewValue = args.OldValue;
                        }
                        string errormsg = "You cannot order more than the available " + Math.Round((double)salesorderitem.Product.QtyAvailable);
                        errormsg += " of the item " + salesorderitem.ActualID.ToString();
                        throw new Exception(errormsg);
                    }
                }
            }

        }

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

            string returnValue = "";
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
                        returnValue = Convert.ToDateTime(r["ORDERDATE"]).ToShortDateString() + " -- " + r["Qty"].ToString();
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

            //Sage.Entity.Interfaces.ISalesOrderItem si;
            //si.LastOrder;
                

        }
        public static void LastOrderStep(ISalesOrderItem salesorderitem, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(1, salesorderitem.SalesOrder.Account.Id.ToString(), salesorderitem.Product.Id.ToString() );
        }

        public static void LastOrder2Step(ISalesOrderItem salesorderitem, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(2, salesorderitem.SalesOrder.Account.Id.ToString(), salesorderitem.Product.Id.ToString());
        }
        public static void LastOrder3Step(ISalesOrderItem salesorderitem, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(3, salesorderitem.SalesOrder.Account.Id.ToString(), salesorderitem.Product.Id.ToString());
        }
        public static void LastOrder4Step(ISalesOrderItem salesorderitem, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(4, salesorderitem.SalesOrder.Account.Id.ToString(), salesorderitem.Product.Id.ToString());
        }
        public static void LastOrder5Step(ISalesOrderItem salesorderitem, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(5, salesorderitem.SalesOrder.Account.Id.ToString(), salesorderitem.Product.Id.ToString());
        }
        public static void LastOrder6Step(ISalesOrderItem salesorderitem, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(6, salesorderitem.SalesOrder.Account.Id.ToString(), salesorderitem.Product.Id.ToString());
        }
        public static void LastOrder7Step(ISalesOrderItem salesorderitem, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(7, salesorderitem.SalesOrder.Account.Id.ToString(), salesorderitem.Product.Id.ToString());
        }
        public static void LastOrder8Step(ISalesOrderItem salesorderitem, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(8, salesorderitem.SalesOrder.Account.Id.ToString(), salesorderitem.Product.Id.ToString());
        }
        public static void LastOrder9Step(ISalesOrderItem salesorderitem, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(9, salesorderitem.SalesOrder.Account.Id.ToString(), salesorderitem.Product.Id.ToString());
        }
        public static void LastOrder10Step(ISalesOrderItem salesorderitem, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(10, salesorderitem.SalesOrder.Account.Id.ToString(), salesorderitem.Product.Id.ToString());
        }
        public static void LastOrder11Step(ISalesOrderItem salesorderitem, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(11, salesorderitem.SalesOrder.Account.Id.ToString(), salesorderitem.Product.Id.ToString());
        }
        public static void LastOrder12Step(ISalesOrderItem salesorderitem, out System.String result)
        {
            // TODO: Complete business rule implementation
            result = GetSalesHistoryByIndex(12, salesorderitem.SalesOrder.Account.Id.ToString(), salesorderitem.Product.Id.ToString());
        }
    


    }
}
