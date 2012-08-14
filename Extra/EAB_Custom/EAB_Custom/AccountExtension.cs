using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using Sage.Entity.Interfaces;
using NHibernate;

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
                    case "EX":
                        salesOrder.OrderType = "Exchange Return";
                        break;
                    case "IR":
                        salesOrder.OrderType = "Inventory Request";
                        break;
                }
            }

            //default the warehouse value according to account manager
            Sage.Platform.RepositoryHelper<Sage.Entity.Interfaces.IUSERWHSE> f =
                    Sage.Platform.EntityFactory.GetRepositoryHelper<Sage.Entity.Interfaces.IUSERWHSE>();
                Sage.Platform.Repository.ICriteria crit = f.CreateCriteria();


                crit.Add(f.EF.Eq("USERID", account.AccountManager.Id.ToString()));
                crit.Add(f.EF.Eq("IsDefault", "T"));

                //result = crit.List<Sage.Entity.Interfaces.IPickingList>();
                foreach (IUSERWHSE warehouse in crit.List<IUSERWHSE>()) {
                    salesOrder.USERWHSE = warehouse;
                    break;
                }

            salesOrder.Save();

            //Add stock card products
            salesOrder.AddStockcardProducts();

            //return the new id
            result = salesOrder.Id.ToString();

        }


    }
}
