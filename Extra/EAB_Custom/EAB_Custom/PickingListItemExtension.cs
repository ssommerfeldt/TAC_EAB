using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using Sage.Entity.Interfaces;
using NHibernate;

namespace EAB_Custom {
    public class PickingListItemExtension {

        public static void UPCSearch(IPickingListItem pickinglistitem) {
            if (!String.IsNullOrEmpty (pickinglistitem.UPC)) {
                                
                foreach (ISalesOrderItem item in pickinglistitem.PickingList.SalesOrder.SalesOrderItems) {
                    if (item.UPC == pickinglistitem.UPC) {
                        //product found in order, add to result
                        //pickinglistitem.CompanyID
                        pickinglistitem.Product = item.Product;
                        pickinglistitem.QtyOrd = (Decimal)item.Quantity;
                        pickinglistitem.QtyShip = 0;
                        pickinglistitem.SOLineNo = item.LineNumber;

                        //pickinglistitem.Save();

                    }
                }                
            }
        }


        public static void SKUSearch(IPickingListItem pickinglistitem) {
            if (!String.IsNullOrEmpty(pickinglistitem.ActualId)) {

                foreach (ISalesOrderItem item in pickinglistitem.PickingList.SalesOrder.SalesOrderItems) {
                    if (item.ActualID == pickinglistitem.ActualId) {
                        //product found in order, add to result
                        //pickinglistitem.CompanyID
                        pickinglistitem.Product = item.Product;
                        pickinglistitem.QtyOrd = (Decimal)item.Quantity;
                        pickinglistitem.QtyShip = 0;
                        pickinglistitem.SOLineNo = item.LineNumber;
                        
                        //pickinglistitem.Save();

                    }
                }
            }
        }

    }
}

