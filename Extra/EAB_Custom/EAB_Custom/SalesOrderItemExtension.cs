using System;
using System.Linq;
using Sage.Entity.Interfaces;
using System.Data.OleDb;
using System.Data;
using Sage.Platform.ComponentModel;



namespace EAB_Custom {
    public class SalesOrderItemExtension {


        public static void OnBeforeInsertGetPricing(Sage.Entity.Interfaces.ISalesOrderItem salesorderitem, NHibernate.ISession session) {
            //GetStockCardPricing(salesorderitem);
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

                    //exclude products that are already in the order, this is used for add only
                    var existsInOrder = (from p in salesorderitem.SalesOrder.SalesOrderItems
                                  where p.ActualID.Equals(salesorderitem.Product.ActualId)
                                  select p).Count() > 0;
                    if (existsInOrder == true) {
                        throw new Exception("Order already contains this product, use the edit function instead.");
                    } else {

                        //item.SalesOrder = salesorder;
                        salesorderitem.ActualID = salesorderitem.Product.ActualId;
                        salesorderitem.Description = salesorderitem.Product.Description;
                        salesorderitem.Family = salesorderitem.Product.Family;
                        salesorderitem.UPC = salesorderitem.Product.UPC;
                                                
                        ////get margin from category 
                        //salesorderitem.Discount = 0;
                        //if (salesorderitem.SalesOrder != null) {
                        //    if (salesorderitem.SalesOrder.Account != null) {

                        //        String sql = "SELECT ACCOUNTPRODUCTCATEGORY.MARGIN";
                        //        sql += " FROM PRODUCT";
                        //        sql += " INNER JOIN TIMPRODCATITEM ON PRODUCT.MASITEMKEY = TIMPRODCATITEM.ITEMKEY";
                        //        sql += " INNER JOIN TIMPRODCATEGORY ON TIMPRODCATITEM.PRODCATEGORYKEY = TIMPRODCATEGORY.PRODCATEGORYKEY";
                        //        sql += " INNER JOIN ACCOUNTPRODUCTCATEGORY ON TIMPRODCATEGORY.TIMPRODCATEGORYID = ACCOUNTPRODUCTCATEGORY.PRODUCTCATEGORYID";
                        //        sql += " Where ProductId = '" + salesorderitem.Product.Id.ToString() + "'";
                        //        sql += " And AccountId = '" + salesorderitem.SalesOrder.Account.Id.ToString() + "'";

                        //        Sage.Platform.Data.IDataService datasvc = Sage.Platform.Application.ApplicationContext.Current.Services.Get<Sage.Platform.Data.IDataService>();
                        //        using (System.Data.OleDb.OleDbConnection conn = new System.Data.OleDb.OleDbConnection(datasvc.GetConnectionString())) {
                        //            conn.Open();
                        //            using (System.Data.OleDb.OleDbCommand cmd = new System.Data.OleDb.OleDbCommand(sql, conn)) {
                        //                OleDbDataReader reader = cmd.ExecuteReader();
                        //                //loop through the reader
                        //                while (reader.Read()) {
                        //                    try {
                        //                        salesorderitem.Discount = (Double)reader["MARGIN"];
                        //                    } catch (Exception) {
                        //                        //no catch?
                        //                        salesorderitem.Discount = 0;
                        //                    }
                        //                }
                        //                reader.Close();
                        //            }
                        //        }
                        //    }
                        //}

                        //Get margin from extension method
                        double margin = 0;                
                        if(salesorderitem.Product.Timprodpricegroup != null
                            && salesorderitem.SalesOrder != null
                            && salesorderitem.SalesOrder.Account != null) {

                                Extentions.GetDefaultMargin(null,
                                                        salesorderitem.Product.Timprodpricegroup.Id.ToString(),
                                                        salesorderitem.SalesOrder.Account,
                                                        out margin);
                        }
                        salesorderitem.Discount = margin;


                        //get msrp price                    
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


                        if (salesorderitem.SalesOrder.OrderType == "Return Order") {

                            double newProductPrice = 0;
                            if (salesorderitem.SalesOrder.Account != null) {
                                //find the new item, id is the same as return except last char                            
                                IProduct newProduct = FindProductByReturnProduct(salesorderitem.Product, salesorderitem.SalesOrder.Account);
                                                                
                                if (newProduct.Vproductpricesheet != null) {
                                    newProductPrice = (double)newProduct.Vproductpricesheet.Listprice;
                                } else {
                                    //price not found                                
                                }

                                //Get  return margin from extension method
                                double returnmargin = 0;
                                if (newProduct.Timprodpricegroup != null
                                    && salesorderitem.SalesOrder != null
                                    && salesorderitem.SalesOrder.Account != null) {

                                    Extentions.GetDefaultMargin(null,
                                                            newProduct.Timprodpricegroup.Id.ToString(),
                                                            salesorderitem.SalesOrder.Account,
                                                            out returnmargin);
                                }
                                salesorderitem.Discount = returnmargin;
                            }
                            
                            //return item price is new item price - return item price
                            salesorderitem.Price = Math.Round(newProductPrice - listPrice, 2);
                                                        

                        } else {
                            //all other types are set to price
                            salesorderitem.Price = Math.Round(listPrice, 2);
                        }

                        salesorderitem.Quantity = 0; //set to 0 initially
                        salesorderitem.ProductName = salesorderitem.Product.Name;
                        salesorderitem.Program = salesorderitem.Product.Program;
                        salesorderitem.UnitOfMeasureId = salesorderitem.Product.UnitOfMeasureId.Trim();
                        salesorderitem.Case = salesorderitem.Product.Unit;

                        //Use the built in price calculator instead of local
                        //salesorderitem.CalculatedPrice = Math.Round((Decimal)listPrice - ((Decimal)listPrice * (Decimal)salesorderitem.Discount), 2, MidpointRounding.AwayFromZero);
                        //salesorderitem.CalculatedPrice = (salesorderitem.Discount > 0)?(decimal)(salesorderitem.Price * salesorderitem.Discount):(decimal)salesorderitem.Price;
                        //salesorderitem.ExtendedPrice = Math.Round((Double)salesorderitem.CalculatedPrice * (Double)salesorderitem.Quantity, 2, MidpointRounding.AwayFromZero);
                        //salesorderitem.ExtendedPrice = 0; //salesorderitem.Price * salesorderitem.Quantity * salesorderitem.Discount;                                        
                        salesorderitem.CalculateExtendedPrice();
                    }   
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
            //Quantity check does not apply to return orders
            if (salesorderitem.SalesOrder.OrderType.ToUpper() != "RETURN ORDER") {

                if (salesorderitem.SalesOrder.OrderType.ToUpper() == "SALES ORDER") {
                    //Set the quantity to no more than available, allow negatives                    
                    if (args.NewValue != args.OldValue) {
                        if (salesorderitem.Product != null) {
                            if ((double)args.NewValue > salesorderitem.Product.QtyAvailable) {
                                //quantity not valid
                                if (args.OldValue == null) {
                                    args.NewValue = 0;
                                } else {
                                    args.NewValue = args.OldValue;
                                }
                                string errormsg = "You cannot order more than the available " + Math.Round((double)salesorderitem.Product.QtyAvailable);
                                errormsg += " of the item " + salesorderitem.ActualID.ToString();
                                throw new ArgumentOutOfRangeException("Quantity", errormsg);
                            }
                        }
                    }

                } else {
                    //For all other types, the quantity cannot be more than the quantity available, no negatives
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
                                errormsg += "\nOr less than 0 of any item.";
                                throw new ArgumentOutOfRangeException("Quantity", errormsg);
                            }
                        }
                    }
                }
            }
            //Update the extended Price
            if (args.NewValue != args.OldValue) {
                salesorderitem.CalculateExtendedPrice();
            }
        }



        public static IProduct FindProductByReturnProduct(IProduct returnProduct, IAccount account) {

            //find the new item, id is the same as return except last char
            string newProductSKU = returnProduct.ActualId.Substring(0, returnProduct.ActualId.Length - 1);
            string newProductSearchSKU = newProductSKU;
            
            //for EBU companies or internal company purchases U is added to the sku
            if (returnProduct.CompanyID == "EBU" || account.InternalAccount == true) {
                newProductSearchSKU += "_U";
            } else {
                //regular account
                newProductSearchSKU += "_";
            }
            
            Sage.Platform.RepositoryHelper<IProduct> rep = Sage.Platform.EntityFactory.GetRepositoryHelper<IProduct>();
            Sage.Platform.Repository.ICriteria crit = rep.CreateCriteria();           

            crit.Add(rep.EF.Like("ActualId", newProductSearchSKU));
            crit.Add(rep.EF.Ne("ActualId", returnProduct.ActualId));
            crit.Add(rep.EF.Eq("CompanyID", returnProduct.CompanyID));
            crit.Add(rep.EF.Eq("WarehouseID", returnProduct.WarehouseID));

            if (crit.List<Sage.Entity.Interfaces.IProduct>().Count > 0) {

                foreach (Sage.Entity.Interfaces.IProduct newProduct in crit.List<Sage.Entity.Interfaces.IProduct>()) {
                    return newProduct;
                }
            } else {
                //Product not found in warehouse, try in all db.
                crit.List<Sage.Entity.Interfaces.IProduct>().Clear();
                rep.CreateCriteria();
                crit.Add(rep.EF.Like("ActualId", newProductSearchSKU));
                crit.Add(rep.EF.Ne("ActualId", returnProduct.ActualId));
                crit.Add(rep.EF.Eq("CompanyID", returnProduct.CompanyID));

                foreach (Sage.Entity.Interfaces.IProduct newProduct in crit.List<Sage.Entity.Interfaces.IProduct>()) {
                    return newProduct;
                }
            }

            //product not found, return null
            return null;
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

        public static void TACOnAfterUpdate(ISalesOrderItem salesorderitem)
        {
            //Find the Matching StockCard Item
            // Update The LastOrder Fields
            Sage.Platform.RepositoryHelper<IStockCardItems> rep1 = Sage.Platform.EntityFactory.GetRepositoryHelper<IStockCardItems>();
            Sage.Platform.Repository.ICriteria crit1 = rep1.CreateCriteria();

            if (salesorderitem.SalesOrder != null)
            {
                if (salesorderitem.SalesOrder.Account != null)
                {
                    crit1.Add(rep1.EF.Eq("Accountid", salesorderitem.SalesOrder.Account.Id));

                    if (salesorderitem.Product != null)
                    {
                        crit1.Add(rep1.EF.Eq("Productid", salesorderitem.Product.Id));



                        foreach (IStockCardItems scard in crit1.List<IStockCardItems>())
                        {
                            scard.LastOrder = scard.GetLastOrderX(1);
                            scard.LastOrder2 = scard.GetLastOrderX(2);
                            scard.LastOrder3 = scard.GetLastOrderX(3);
                            scard.LastOrder4 = scard.GetLastOrderX(4);
                            scard.LastOrder5 = scard.GetLastOrderX(5);
                            scard.LastOrder6 = scard.GetLastOrderX(6);
                            scard.LastOrder7 = scard.GetLastOrderX(7);
                            scard.LastOrder8 = scard.GetLastOrderX(8);
                            scard.LastOrder9 = scard.GetLastOrderX(9);
                            scard.LastOrder10 = scard.GetLastOrderX(10);
                            scard.LastOrder11 = scard.GetLastOrderX(11);
                            scard.LastOrder12 = scard.GetLastOrderX(12);
                            scard.Save();
                            break;
                        }


                    }
                }
            }
        }

        //public static void TACOnAfterInsert(ISalesOrderItem salesorderitem)
        //{
           // Not Needed to Update LastOrder Here because the Qty's are allways Zero and it doesn't update zero Qty's
        //}


    }
}
