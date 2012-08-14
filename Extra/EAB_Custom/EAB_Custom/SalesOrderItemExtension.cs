using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using Sage.Entity.Interfaces;
using NHibernate;



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

            crit1.Add(rep1.EF.Eq("Accountid", salesorderitem.SalesOrder.Account.Id));
            crit1.Add(rep1.EF.Eq("Productid", salesorderitem.Product.Id));

            double margin = 0;
            foreach (IStockCardItems scard in crit1.List<IStockCardItems>()) {
                margin = scard.Margin ?? 0;
                break;
            }

            salesorderitem.Price = listPrice;
            salesorderitem.Discount = margin;
            salesorderitem.CalculatedPrice = (Decimal)listPrice - ((Decimal)listPrice * (Decimal)margin);
            salesorderitem.ExtendedPrice = (double)salesorderitem.CalculatedPrice * salesorderitem.Quantity;
            salesorderitem.UPC = salesorderitem.Product.UPC;

            //Set a value on salesorder to recalculate totals on save
            salesorderitem.SalesOrder.Tick = salesorderitem.SalesOrder.Tick + 1 ?? 1;
        }
    }
}
