using System;
using Sage.Entity.Interfaces;

namespace EAB_Custom {
    public class AccountExtension {


        public static void CreateSalesOrder(IAccount account, String type, out String result) {
            
            //Create a new salesorder from an account which includes all stock card products
            Sage.Entity.Interfaces.ISalesOrder salesOrder =
                    Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.ISalesOrder),
                    Sage.Platform.EntityCreationOption.ExecuteBusinessRules) as Sage.Entity.Interfaces.ISalesOrder;

            salesOrder.Account = account;
            salesOrder.AccountManager = account.AccountManager;
            salesOrder.ActiveFlag = true;
            salesOrder.IsQuote = false;
            salesOrder.OrderDate = DateTime.Now;
            //salesOrder.OrderType = "Sales Order";
            salesOrder.Status = "Open Order";

            if (!String.IsNullOrEmpty(type)) {
                switch (type) {
                    case "SO":
                        salesOrder.OrderType = "Sales Order";
                        break;
                    case "TO":
                        salesOrder.OrderType = "Transfer Order";
                        break;
                    case "PO":
                        salesOrder.OrderType = "Purchase Order";
                        break;
                    case "RO":
                        salesOrder.OrderType = "Return Order";
                        break;
                    case "IO":
                        salesOrder.OrderType = "Inventory Order";
                        break;
                }
            }

            //default the warehouse value according to account manager
            Sage.Platform.RepositoryHelper<Sage.Entity.Interfaces.IUSERWHSE> f =
                    Sage.Platform.EntityFactory.GetRepositoryHelper<Sage.Entity.Interfaces.IUSERWHSE>();
                Sage.Platform.Repository.ICriteria crit = f.CreateCriteria();


                crit.Add(f.EF.Eq("USERID", account.AccountManager.Id.ToString()));
                crit.Add(f.EF.Eq("IsDefault", true));

                //result = crit.List<Sage.Entity.Interfaces.IPickingList>();
                foreach (IUSERWHSE warehouse in crit.List<IUSERWHSE>()) {
                    salesOrder.UserWareHouse = warehouse.SLXSite;
                    break;
                }

            salesOrder.Save();

            if (!String.IsNullOrEmpty(type) && type == "SO") {
                //Add stock card products
                salesOrder.AddStockcardProducts();
            }

            //return the new id
            result = salesOrder.Id.ToString();

        }


    }
}
