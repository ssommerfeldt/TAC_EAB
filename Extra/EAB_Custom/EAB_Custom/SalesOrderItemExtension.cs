using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using Sage.Entity.Interfaces;
using NHibernate;
using System.Data.OleDb;



namespace EAB_Custom {
    public class SalesOrderItemExtension {


        public static void OnBeforeInsertGetPricing(Sage.Entity.Interfaces.ISalesOrderItem salesorderitem, NHibernate.ISession session) {
            GetStockCardPricing(salesorderitem);
            //salesorderitem.CalculateExtendedPrice();
        }


        public static void GetStockCardPricing(ISalesOrderItem salesorderitem) {
            // Set the pricing from stock card

            //ISalesOrderItem soi = Sage.Platform.EntityFactory.GetById<ISalesOrderItem>(salesorderitem.Id);

            double listPrice = 0;
            //IVlueproductmsrp prodPrice = Sage.Platform.EntityFactory.GetById<IVlueproductmsrp>(salesorderitem.Product.Id);
            //if (prodPrice != null) {
            //    listPrice = (double)prodPrice.Listprice;
            //}
            //Sage.Platform.RepositoryHelper<IVproductpricesheet> rep = Sage.Platform.EntityFactory.GetRepositoryHelper<IVproductpricesheet>();
            //Sage.Platform.Repository.ICriteria crit = rep.CreateCriteria();

            ////crit.Add(rep.EF.Eq("Productid", salesorderitem.Product.Id));

            //foreach (IVproductpricesheet item in crit.List<IVproductpricesheet>()) {
            //    listPrice = (double)item.Listprice;
            //    break;
            //}
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
                eh.HandleException(ex, false);
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
        }


        public static void SaveProductToSalesOrderItem(ISalesOrderItem salesorderitem) {

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
                    eh.HandleException(ex, false);
                }

                salesorderitem.Quantity = 1; //set to 1 initially
                salesorderitem.ExtendedPrice = salesorderitem.Price * salesorderitem.Quantity * salesorderitem.Discount;
                salesorderitem.ProductName = salesorderitem.Product.Name;
                salesorderitem.Program = salesorderitem.Product.Program;
                salesorderitem.UnitOfMeasureId = salesorderitem.Product.UnitOfMeasureId.Trim();

                //item.GetStockCardPricing();			

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

                    if (salesorderitem.SalesOrder.OrderType == "Return Order") {
                        crit.Add(f.EF.Eq("Family", "Exchange Returns"));
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

    


    }
}
