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
                                
                var productfound = from item in pickinglistitem.PickingList.SalesOrder.SalesOrderItems
                                   where item.UPC.Equals(pickinglistitem.UPC)
                                   select item;
                
                if (productfound.Count<ISalesOrderItem>() > 0) {
                    //product found in order, add to result


                } else {
                    pickinglistitem.UPC = "Product not found in order";
                }
            }
        }

    }
}

