using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using Sage.Entity.Interfaces;
using NHibernate;



namespace EAB_Custom {
    public class SalesOrderExtension {


        public static void SubmitSalesOrder(ISalesOrder salesOrder) {
            //submit order to mas
            //Sage.Entity.Interfaces.ISalesOrder salesOrder = this.BindingSource.Current as Sage.Entity.Interfaces.ISalesOrder;

            //Salesorder header
            //Sage.Entity.Interfaces.IStgSalesOrder_TAC soHeader =
            //        Sage.Platform.EntityFactory.Create(typeof(Sage.SalesLogix.Entities.StgSalesOrder_TAC),
            //        Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSalesOrder_TAC;
            Sage.Entity.Interfaces.IStgSalesOrder_TAC soHeader =
            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgSalesOrder_TAC),
            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSalesOrder_TAC;

            soHeader.TranNo = "0";
            soHeader.TranDate = DateTime.Now;
            soHeader.TradeDiscAmt = null;
            soHeader.STaxAmt = null;
            soHeader.Status = "Open";
            soHeader.SessionKey = 0;
            soHeader.RowKey = null;
            soHeader.RequireSOAck = "No";
            soHeader.RecurSOTranNo = null;
            soHeader.ProcessStatus = 0;
            soHeader.OpenAmt = 0;
            soHeader.Hold = "0";
            //soHeader.FreightAmt = salesOrder.Freight;
            soHeader.FreightAmt = 0;
            soHeader.DfltShipToCustAddrID = salesOrder.ShippingAddress.Id.ToString(); //change this to mas id
            soHeader.CustID = ""; //get from mas
            soHeader.CustClassID = ""; //get from mas
            soHeader.CurrID = salesOrder.CurrencyCode;
            soHeader.CurrExchRate = salesOrder.ExchangeRate;
            soHeader.ContactName = salesOrder.BillingContact.FullName;
            soHeader.BillToCustAddrID = salesOrder.BillingAddress.Id.ToString(); //change to mas id

            soHeader.Save();

            foreach (Sage.Entity.Interfaces.ISalesOrderItem item in salesOrder.SalesOrderItems) {

                //Sales order line items
                Sage.Entity.Interfaces.IStgSOLine_TAC soLine =
                        Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgSOLine_TAC),
                        Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSOLine_TAC;

                soLine.Stgsalesorder_tacId = soHeader.Id.ToString();

                ////Get the so line number - slx does this already
                //Sage.Platform.RepositoryHelper<Sage.Entity.Interfaces.IStgSOLine_TAC> rep =
                //    Sage.Platform.EntityFactory.GetRepositoryHelper<Sage.Entity.Interfaces.IStgSOLine_TAC>();
                //Sage.Platform.Repository.ICriteria criteria = rep.CreateCriteria();
                //criteria.Add(rep.EF.Eq("Stgsalesorder_tacId", soHeader.Id.ToString()));
                //criteria.SetProjection(rep.PF.Max("SOLineNo"));
                //criteria.SetMaxResults(1);

                //int lastLineNo = (int)criteria.UniqueResult();
                //soLine.SOLineNo = lastLineNo + 1;
                soLine.SOLineNo = item.LineNumber;

                soLine.AcctRefCode = null;
                soLine.RowAction = 0; //find out values for this
                soLine.AmtInvcd = 0;
                soLine.CloseDate = null;
                soLine.CmntOnly = "No";
                soLine.CommClassID = null;
                soLine.CommPlanID = null;
                soLine.DeliveryMeth = salesOrder.ShipVia;
                soLine.Description = item.Description;
                soLine.ExtAmt = item.ExtendedPrice;
                soLine.ExtCmnt = null;
                soLine.FOBID = salesOrder.Fob;
                //soLine.FreightAmt = salesOrder.Freight;
                soLine.FreightAmt = 0;
                soLine.GLAcctNo = ""; //get this from mas
                soLine.Hold = "0";
                soLine.HoldReason = null;
                soLine.ItemAliasID = null;
                soLine.ItemID = ""; //item key from mas
                soLine.KitComponent = null;
                soLine.MAS90LineIndex = null;
                soLine.OrigOrdered = item.Quantity;
                //soLine.OrigPromiseDate = salesOrder.DatePromised;
                soLine.OrigPromiseDate = salesOrder.OrderDate.Value.AddDays(10);
                soLine.PONumber = salesOrder.CustomerPurchaseOrderNumber;
                soLine.ProcessStatus = 0;
                //soLine.PromiseDate = salesOrder.DatePromised;
                soLine.PromiseDate = salesOrder.OrderDate.Value.AddDays(10);
                soLine.QtyInvcd = item.Quantity;
                soLine.QtyOnBO = 0;
                soLine.QtyOrd = item.Quantity;
                soLine.QtyRtrnCredit = 0;
                soLine.QtyRtrnReplacement = 0;
                soLine.QtyShip = 0;
                soLine.ReqCert = "No";
                soLine.RequestDate = salesOrder.OrderDate;
                soLine.RowKey = null;
                soLine.SessionKey = 0;
                soLine.ShipDate = salesOrder.OrderDate.Value.AddDays(2);
                soLine.ShipMethID = null;
                soLine.ShipPriority = 0;
                soLine.ShipToAddrLine1 = salesOrder.ShippingAddress.Address1;
                soLine.ShipToAddrLine2 = salesOrder.ShippingAddress.Address2;
                soLine.ShipToAddrLine3 = salesOrder.ShippingAddress.Address3;
                soLine.ShipToAddrLine4 = salesOrder.ShippingAddress.Address4;
                soLine.ShipToAddrLine5 = "";
                soLine.ShipToAddrName = salesOrder.ShippingAddress.Id.ToString();//change this
                soLine.ShipToCity = salesOrder.ShippingAddress.City;
                soLine.ShipToCountryID = salesOrder.ShippingAddress.Country;
                soLine.ShipToPostalCode = salesOrder.ShippingAddress.PostalCode;
                soLine.ShipToStateID = salesOrder.ShippingAddress.State;
                soLine.Status = "Open";
                soLine.STaxClassID = null;
                soLine.TradeDiscAmt = 0;
                soLine.TradeDiscPct = null;
                soLine.TranNo = "0";
                soLine.UnitMeasID = ""; //get this from mas
                soLine.UnitPrice = item.Price;
                soLine.UserFld1 = null;
                soLine.UserFld2 = null;
                soLine.VendorID = null;
                soLine.WarehouseID = ""; //get this from mas
                soLine.WillCall = null;

                soLine.Save();

            }

        }

        public static void SubmitTransferOrder(ISalesOrder salesOrder) {
            //submit order to mas
            //Sage.Entity.Interfaces.ISalesOrder salesOrder = this.BindingSource.Current as Sage.Entity.Interfaces.ISalesOrder;

            //Salesorder header
            //Sage.Entity.Interfaces.IStgSalesOrder_TAC soHeader =
            //        Sage.Platform.EntityFactory.Create(typeof(Sage.SalesLogix.Entities.StgSalesOrder_TAC),
            //        Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSalesOrder_TAC;
            Sage.Entity.Interfaces.IStgTrnsfrOrder_TAC toHeader =
            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgTrnsfrOrder_TAC),
            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgTrnsfrOrder_TAC;

            toHeader.TrnsfrOrderID = 0; //set this to unique int number (global) during integration
            toHeader.CloseDate = DateTime.Now;
            toHeader.CompanyID = ""; //get this from mas
            toHeader.RcvgWhseID = ""; //get this from mas
            toHeader.ReqDelvDate = DateTime.Now.AddDays(10);
            toHeader.SchdShipDate = DateTime.Now.AddDays(2);
            toHeader.ShipMethID = null;
            toHeader.ShipWhseID = ""; //get this from mas
            toHeader.TranCmnt = null;
            toHeader.TranDate = DateTime.Now;
            toHeader.TranNo = null;
            toHeader.TransitWhseID = null;
            toHeader.ProcessStatus = 0;
            toHeader.ProcessStatusMessage = null;
            toHeader.SessionKey = 0;
            
            toHeader.Save();

            foreach (Sage.Entity.Interfaces.ISalesOrderItem item in salesOrder.SalesOrderItems) {

                //Transfer order line items
                Sage.Entity.Interfaces.IStgTrnsfrOrderLine_TAC toLine =
                        Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgTrnsfrOrderLine_TAC),
                        Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgTrnsfrOrderLine_TAC;

                toLine.Stgtrnsfrorder_tacId = toHeader.Id.ToString();

                toLine.TrnsfrOrderID = 0; //set this to unique int number (global) during integration - same as header value
                toLine.TrnsfrOrderLineID = 0; //Set this to unique number (for this order) during integration.
                toLine.TrnsfrLineNo = (short)item.LineNumber; //sequence number    

                toLine.ItemID = ""; //set to itemid from mas
                toLine.UoM = ""; //set to unit of measure from mas
                toLine.QtyOrd = item.Quantity;  
                toLine.SurchargeFixedAmt = 0;
                toLine.SurchargePct = 0;
                toLine.TranCmnt = null;                
                toLine.ProcessStatus = 0;
                toLine.ProcessStatusMessage = null;
                toLine.SessionKey = 0;
            
                toLine.Save();

            }

        }

    }
}
