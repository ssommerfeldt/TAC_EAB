using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using Sage.Entity.Interfaces;
using NHibernate;
using Sage.Platform.ComponentModel;

namespace EAB_Custom {
    public class PickingListItemExtension {

        public static void UPCSearch(IPickingListItem pickinglistitem) {
            if (!String.IsNullOrEmpty (pickinglistitem.UPC)) {
                //Clear the current product
                pickinglistitem.Product = null;

                foreach (ISalesOrderItem item in pickinglistitem.PickingList.SalesOrder.SalesOrderItems) {
                    if (item.UPC == pickinglistitem.UPC & item.Quantity > 0) {
                        //product found in order, add to result
                        pickinglistitem.TranNo = "0";
                        //pickinglistitem.CompanyID                        
                        pickinglistitem.QtyOrd = (Decimal)item.Quantity;
                        pickinglistitem.QtyShip = 0;
                        pickinglistitem.SOLineNo = item.LineNumber;
                        pickinglistitem.Product = item.Product;
                        pickinglistitem.ActualId = item.Product.ActualId;                        
                        pickinglistitem.UnitMeasID = item.Product.Unit;

                        break;
                    }
                }
                if (pickinglistitem.Product == null) {
                    throw new Exception("UPC not found.             ");
                }
            }
        }


        public static void SKUSearch(IPickingListItem pickinglistitem) {
            if (!String.IsNullOrEmpty(pickinglistitem.ActualId)) {
                //Clear the current product
                pickinglistitem.Product = null;

                foreach (ISalesOrderItem item in pickinglistitem.PickingList.SalesOrder.SalesOrderItems) {
                    if (item.ActualID == pickinglistitem.ActualId & item.Quantity > 0) {
                        //product found in order, add to result
                        //pickinglistitem.CompanyID
                        pickinglistitem.TranNo = "0";
                        //pickinglistitem.CompanyID                        
                        pickinglistitem.QtyOrd = (Decimal)item.Quantity;
                        pickinglistitem.QtyShip = 0;
                        pickinglistitem.SOLineNo = item.LineNumber;
                        pickinglistitem.Product = item.Product;
                        pickinglistitem.UPC = item.Product.UPC;
                        pickinglistitem.UnitMeasID = item.Product.Unit;

                        break;

                    }                    
                }
                if (pickinglistitem.Product == null) {
                    throw new Exception("SKU not found.             ");
                }
            }
        }


        public static void OnBeforeQtyShipChanged(IPickingListItem pickinglistitem, ExtendedPropertyChangedEventArgs args) {
            //the shipping quantity cannot be more than the ordered quantity
            if (args.NewValue != args.OldValue) {
                if ((decimal)args.NewValue < 0 || (decimal)args.NewValue > pickinglistitem.QtyOrd) {
                    //ship quantity not valid
                    if (args.OldValue == null) {
                        args.NewValue = 0;
                    } else {
                        args.NewValue = args.OldValue;
                    }
                    throw new Exception("You cannot ship more than the ordered " + Math.Round((decimal)pickinglistitem.QtyOrd) 
                        + " of the item " + pickinglistitem.ActualId);
                }
                               
                
            }

        }

    }
}

