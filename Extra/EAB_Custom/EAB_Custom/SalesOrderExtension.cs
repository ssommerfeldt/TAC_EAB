using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using Sage.Entity.Interfaces;
using NHibernate;



namespace EAB_Custom {
    public class SalesOrderExtension {

        public static decimal TruncateDecimal(decimal value, int precision) {
            decimal step = (decimal)Math.Pow(10, precision);
            int tmp = (int)Math.Truncate(step * value);
            return tmp / step;
        } 



        public static void SubmitOrder(ISalesOrder salesOrder) {
            //Determine which order to submit and pass through
            switch (salesOrder.OrderType) {
                case "Sales Order":
                    SubmitSalesOrder(salesOrder);
                    break;
                case "Transfer Order":
                    SubmitTransferOrder(salesOrder);
                    break;
                case "Purchase Order":
                    SubmitPurchaseOrder(salesOrder);
                    break;
                case "Return Order":
                    switch (salesOrder.AccountManager.Eabrelationship.Trim()) {
                        case "Distributor":
                            //Distributor
                            SubmitInventoryAdjustment(salesOrder);                            
                            break;
                        case "Sales Rep":
                            //Sales Rep
                            SubmitPurchaseOrder(salesOrder);
                            break;
                        default:
                            throw new Exception("Error Reading Account Manager Relationship"); 
                    }
                    break;
                case "Inventory Order":
                    switch (salesOrder.AccountManager.Eabrelationship.Trim()) {
                        case "Distributor":
                            //Distributor
                            SubmitSalesOrder(salesOrder);
                            break;
                        case "Sales Rep":
                            //Sales Rep
                            SubmitTransferOrder(salesOrder);
                            break;
                        default:
                            throw new Exception("Error Reading Account Manager Relationship");                            
                    }
                    break;
                default:
                    throw new Exception("Error Determining Order Type");
            }
        }


        private static void SubmitSalesOrder(ISalesOrder salesOrder) {
            //submit order to mas
            //Sage.Entity.Interfaces.ISalesOrder salesOrder = this.BindingSource.Current as Sage.Entity.Interfaces.ISalesOrder;

            //Salesorder header
            //Sage.Entity.Interfaces.IStgSalesOrder_TAC soHeader =
            //        Sage.Platform.EntityFactory.Create(typeof(Sage.SalesLogix.Entities.StgSalesOrder_TAC),
            //        Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSalesOrder_TAC;
            Sage.Entity.Interfaces.IStgSalesOrder_TAC soHeader =
            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgSalesOrder_TAC),
            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSalesOrder_TAC;

            soHeader.SalesOrderID = salesOrder.Id.ToString();
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
            //soHeader.OpenAmt = Math.Round((Double)salesOrder.OrderTotal, 2, MidpointRounding.AwayFromZero); //invoice total
            soHeader.OpenAmt = (Double)TruncateDecimal((Decimal)salesOrder.OrderTotal, 2);
            soHeader.Hold = "0";
            //soHeader.FreightAmt = salesOrder.Freight;
            soHeader.FreightAmt = 0;

            //get the accountfinancial data
            if (salesOrder.Account.AccountFinancial != null) {
                soHeader.CustID = salesOrder.Account.AccountFinancial.CustomerId; //get from mas
                soHeader.CustClassID = salesOrder.Account.AccountFinancial.Customer_Type.Substring(0, 4).ToUpper(); //get from mas

                //soHeader.DfltShipToCustAddrID = salesOrder.ShippingAddress.Address.MASAddrKey.ToString(); //change this to mas id
                soHeader.DfltShipToCustAddrID = salesOrder.Account.AccountFinancial.CustomerId;
                //soHeader.BillToCustAddrID = salesOrder.BillingAddress.Address.MASAddrKey.ToString(); //change to mas id
                soHeader.BillToCustAddrID = salesOrder.Account.AccountFinancial.CustomerId;
                soHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode;
            }

            soHeader.CurrID = salesOrder.CurrencyCode;
            soHeader.CurrExchRate = salesOrder.ExchangeRate;
            //soHeader.ContactName = salesOrder.BillingContact.FullName;
            soHeader.ContactName = "";
            soHeader.DfltShipPriority = 3;
            soHeader.PmtTermsID = "120";

            soHeader.Save();

            foreach (Sage.Entity.Interfaces.ISalesOrderItem item in salesOrder.SalesOrderItems) {
                //only create item if quantity > 0
                if (item.Quantity > 0) {
                    //Sales order line items
                    Sage.Entity.Interfaces.IStgSOLine_TAC soLine =
                            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgSOLine_TAC),
                            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSOLine_TAC;

                    soLine.Stgsalesorder_tacId = soHeader.Id.ToString();
                    soLine.SalesOrderID = salesOrder.Id.ToString();
                    soLine.SalesOrderItemID = item.Id.ToString();
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
                    soLine.DeliveryMeth = "1";

                    if (item.Description.Length > 40) {
                        soLine.Description = item.Description.Substring(0, 40);
                    } else {
                        soLine.Description = item.Description;
                    }

                    //don't rely on slx calculation
                    //soLine.ExtAmt = Math.Round((Double)item.ExtendedPrice, 2);
                    double extendedAmount = (Double)item.CalculatedPrice * (Double)item.Quantity;
                    soLine.ExtAmt = Math.Round(extendedAmount, 2, MidpointRounding.AwayFromZero);

                    soLine.ExtCmnt = null;
                    soLine.FOBID = salesOrder.Fob;
                    //soLine.FreightAmt = salesOrder.Freight; //do not use
                    soLine.FreightAmt = 0;
                    soLine.GLAcctNo = item.Product.GlAccountNumber; //get this from mas
                    soLine.Hold = "0";
                    soLine.HoldReason = null;
                    soLine.ItemAliasID = null;
                    soLine.ItemID = item.Product.MasItemID; //item key from mas
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
                    soLine.ShipPriority = 3;
                    soLine.ShipToAddrLine1 = salesOrder.ShippingAddress.Address1;
                    soLine.ShipToAddrLine2 = salesOrder.ShippingAddress.Address2;
                    soLine.ShipToAddrLine3 = salesOrder.ShippingAddress.Address3;
                    soLine.ShipToAddrLine4 = salesOrder.ShippingAddress.Address4;
                    soLine.ShipToAddrLine5 = "";
                    soLine.ShipToAddrName = salesOrder.ShippingAddress.Address.MASAddrKey.ToString();//get from MAS
                    soLine.ShipToCity = salesOrder.ShippingAddress.City;
                    soLine.ShipToCountryID = salesOrder.ShippingAddress.Country;
                    soLine.ShipToPostalCode = salesOrder.ShippingAddress.PostalCode;
                    soLine.ShipToStateID = salesOrder.ShippingAddress.State;
                    soLine.Status = "Open";
                    soLine.STaxClassID = null;
                    soLine.TradeDiscAmt = 0;
                    soLine.TradeDiscPct = null;
                    soLine.TranNo = "0";
                    soLine.UnitMeasID = item.Product.Unit; //get this from mas
                    //soLine.UnitPrice = Math.Round((Double)item.Price, 2); //wrong price, use price * margin
                    soLine.UnitPrice = Math.Round((Double)item.CalculatedPrice, 2, MidpointRounding.AwayFromZero);
                    soLine.UserFld1 = null;
                    soLine.UserFld2 = null;
                    soLine.VendorID = soHeader.CustID;
                    soLine.WarehouseID = salesOrder.UserWareHouse.Sitereference.Siterefdisplayname; //get this from mas
                    soLine.WillCall = null;

                    soLine.Save();

                }
            }
        }

        private static void SubmitTransferOrder(ISalesOrder salesOrder) {
            //submit order to mas
            //Sage.Entity.Interfaces.ISalesOrder salesOrder = this.BindingSource.Current as Sage.Entity.Interfaces.ISalesOrder;

            //Salesorder header
            //Sage.Entity.Interfaces.IStgSalesOrder_TAC soHeader =
            //        Sage.Platform.EntityFactory.Create(typeof(Sage.SalesLogix.Entities.StgSalesOrder_TAC),
            //        Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSalesOrder_TAC;
            Sage.Entity.Interfaces.IStgTrnsfrOrder_TAC toHeader =
            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgTrnsfrOrder_TAC),
            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgTrnsfrOrder_TAC;

            toHeader.SalesOrderID = salesOrder.Id.ToString();
            toHeader.TrnsfrOrderID = 0; //set this to unique int number (global) during integration
            toHeader.CloseDate = DateTime.Now;

            //get the accountfinancial data
            if (salesOrder.Account.AccountFinancial != null) {
                if (salesOrder.Account.AccountFinancial.Companycode.Length > 3) {
                    toHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode.Substring(0, 3); //get from mas
                } else {
                    toHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode;
                }

            }
            if (salesOrder.SourceSLXSite == null) {
                throw new Exception("Error: Destination Warehouse not specified.");
            } else {
                toHeader.RcvgWhseID = salesOrder.SourceSLXSite.Sitereference.Siterefdisplayname; //get this from mas
            }
            if (salesOrder.UserWareHouse == null) {
                throw new Exception("Error: Source Warehouse not specified.");
            } else {
                toHeader.ShipWhseID = salesOrder.UserWareHouse.Sitereference.Siterefdisplayname; //get this from mas
            }

            toHeader.ReqDelvDate = DateTime.Now.AddDays(10);
            toHeader.SchdShipDate = DateTime.Now.AddDays(2);
            toHeader.ShipMethID = null;            
            toHeader.TranCmnt = null;
            toHeader.TranDate = DateTime.Now;
            toHeader.TranNo = "0";
            toHeader.TransitWhseID = null;
            toHeader.ProcessStatus = 0;
            toHeader.ProcessStatusMessage = null;
            toHeader.SessionKey = 0;

            toHeader.Save();

            foreach (Sage.Entity.Interfaces.ISalesOrderItem item in salesOrder.SalesOrderItems) {
                //only create item if quantity > 0
                if (item.Quantity > 0) {
                    //Transfer order line items
                    Sage.Entity.Interfaces.IStgTrnsfrOrderLine_TAC toLine =
                            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgTrnsfrOrderLine_TAC),
                            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgTrnsfrOrderLine_TAC;

                    toLine.Stgtrnsfrorder_tacId = toHeader.Id.ToString();
                    toLine.SalesOrderID = salesOrder.Id.ToString();
                    toLine.SalesOrderItemID = item.Id.ToString();

                    toLine.TrnsfrOrderID = 0; //set this to unique int number (global) during integration - same as header value
                    toLine.TrnsfrOrderLineID = 0; //Set this to unique number (for this order) during integration.
                    toLine.TrnsfrLineNo = (short)item.LineNumber; //sequence number    

                    toLine.ItemID = item.Product.MasItemID; //set to itemid from mas
                    toLine.UoM = item.Product.Unit; //set to unit of measure from mas
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

        private static void SubmitPurchaseOrder(ISalesOrder salesOrder) {
            //submit order to mas

            Sage.Entity.Interfaces.IStgPurchaseOrder_TAC soHeader =
            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgPurchaseOrder_TAC),
            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgPurchaseOrder_TAC;

            soHeader.SalesOrderID = salesOrder.Id.ToString();
            soHeader.ClosedForInvc = "No";
            soHeader.ClosedForRcvg = "No";
            soHeader.CurrExchRate = 1.0;
            soHeader.CurrID = "CAD";
            soHeader.FreightAmt = 0;
            soHeader.Hold = "No";
            soHeader.IssueDate = DateTime.Now;
            soHeader.OriginationDate = DateTime.Now;
            soHeader.RequirePOIssue = "No";
            soHeader.Status = "Open";
            soHeader.STaxAmt = null;
            soHeader.TranCmnt = null;
            soHeader.TranNo = "0";
            soHeader.TranDate = DateTime.Now;
            soHeader.UserFld1 = null;
            soHeader.VendClassID = null;
                        

            //get the accountfinancial data
            if (salesOrder.Account.AccountFinancial != null) {
                soHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode;
                soHeader.VendorID = salesOrder.Account.AccountFinancial.CustomerId; //get from mas
            }
            //exit if wareouse not specified
            if (salesOrder.UserWareHouse == null) {
                        throw new Exception("Error: Source Warehouse not specified.");
                    }

            soHeader.Save();

            foreach (Sage.Entity.Interfaces.ISalesOrderItem item in salesOrder.SalesOrderItems) {
                //only create item if quantity > 0
                if (item.Quantity > 0) {
                    //Sales order line items
                    Sage.Entity.Interfaces.IStgPOLine_TAC soLine =
                            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgPOLine_TAC),
                            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgPOLine_TAC;

                    soLine.Stgpurchaseorder_tacId = soHeader.Id.ToString();
                    soLine.SalesOrderID = salesOrder.Id.ToString();
                    soLine.SalesOrderItemID = item.Id.ToString();

                    soLine.POLineNo = item.LineNumber;

                    soLine.AmtInvcd = 0;
                    soLine.ClosedForInvc = "No";
                    soLine.ClosedForRcvg = "No";
                    soLine.CmntOnly = "No";

                    if (item.Description.Length > 40) {
                        soLine.Description = item.Description.Substring(0, 40);
                    } else {
                        soLine.Description = item.Description;
                    }

                    soLine.DropShip = "No";
                    soLine.ExclLastCost = "No";
                    soLine.Expedite = "No";                   
                    soLine.ExtCmnt = null;
                    //soLine.FreightAmt = salesOrder.Freight; //do not use
                    soLine.FreightAmt = 0;

                    if (String.IsNullOrEmpty(item.Product.GlAccountNumber)) { throw new Exception("GL Account Number is required"); }
                    soLine.GLAcctNo = item.Product.GlAccountNumber; //get this from mas
                    
                    soLine.ItemID = item.Product.MasItemID; //item key from mas

                    soLine.OrigOrdered = item.Quantity;
                    //soLine.OrigPromiseDate = salesOrder.DatePromised;
                    soLine.OrigPromiseDate = salesOrder.OrderDate.Value.AddDays(10);
                    //soLine.PromiseDate = salesOrder.DatePromised;
                    soLine.PromiseDate = salesOrder.OrderDate.Value.AddDays(10);
                    soLine.QtyInvcd = 0;
                    soLine.QtyOnBO = 0;
                    soLine.QtyOpenToRcv = item.Quantity;
                    soLine.QtyOrd = item.Quantity;
                    soLine.QtyRcvd = 0;
                    soLine.QtyRtrnCredit = 0;
                    soLine.QtyRtrnReplacement = 0;
                    soLine.RequestDate = salesOrder.OrderDate;
                    soLine.Status = "Open";

                    //get the accountfinancial data
                    if (salesOrder.Account.AccountFinancial != null) {
                        if (salesOrder.Account.AccountFinancial.Companycode.Length > 3) {
                            soLine.TargetCompanyID = salesOrder.Account.AccountFinancial.Companycode.Substring(0, 3); //get from mas
                        } else {
                            soLine.TargetCompanyID = salesOrder.Account.AccountFinancial.Companycode;
                        }

                    }
                    soLine.TranNo = "0";
                    
                    if (item.CalculatedPrice == null) {
                        soLine.UnitCost = 0;
                        soLine.ExtAmt = 0;
                    } else {
                        soLine.UnitCost = Math.Round((Double)item.CalculatedPrice, 2, MidpointRounding.AwayFromZero);
                        soLine.ExtAmt = Math.Round((Double)item.CalculatedPrice * (Double)item.Quantity, 2, MidpointRounding.AwayFromZero);
                    }
                    soLine.UnitMeasID = item.Product.Unit; //get this from mas
                    soLine.UserFld1 = null;
                    soLine.STaxClassID = "Taxable";
                    
                    if (salesOrder.UserWareHouse == null) {
                        throw new Exception("Error: Source Warehouse not specified.");
                    } else {
                        soLine.ShipToWhseID = salesOrder.UserWareHouse.Sitereference.Siterefdisplayname; //get this from mas
                    }

                    soLine.Save();

                }
            }
        }


        private static void SubmitInventoryAdjustment(ISalesOrder salesOrder) {
            //submit order to mas            
            //Adjusts Inventory on hand            
            try {

                Sage.Entity.Interfaces.IStgInvtTranBatch_TAC tranHeader =
                        Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgInvtTranBatch_TAC),
                        Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgInvtTranBatch_TAC;

                tranHeader.SalesOrderID = salesOrder.Id.ToString();
                tranHeader.BatchID = 0;
                //tranHeader.BComment = salesOrder.Comments;
                tranHeader.BDate = DateTime.Now;
                tranHeader.WhseID = salesOrder.UserWareHouse.Sitereference.Siterefdisplayname;

                //get the accountfinancial data
                if (salesOrder.Account.AccountFinancial != null) {
                    tranHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode;
                }

                tranHeader.Save();

                foreach (Sage.Entity.Interfaces.ISalesOrderItem item in salesOrder.SalesOrderItems) {
                    //only create item if quantity > 0
                    if (item.Quantity > 0) {
                        Sage.Entity.Interfaces.IStgInvtTran_TAC transaction =
                                Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgInvtTran_TAC),
                                Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgInvtTran_TAC;

                        transaction.Stginvttranbatch_tacId = tranHeader.Id.ToString();
                        transaction.SalesOrderID = salesOrder.Id.ToString();
                        transaction.SalesOrderItemID = item.Id.ToString();

                        //Determine Transaction Type
                        int transactionType = 0;
                        double quantity = 0;
                        if (item.Quantity > 0) {
                            transactionType = 703;
                            quantity = (Double)item.Quantity;
                        } else { //if (Double.Parse(txtAdjustment.Text) < 0) 
                            transactionType = 701;
                            quantity = Math.Abs((Double)item.Quantity);
                        }
                        transaction.Qty = quantity;
                        transaction.TranID = tranHeader.BatchID;
                        transaction.BatchID = tranHeader.BatchID;
                        transaction.TranType = transactionType;
                        transaction.TranDate = DateTime.Now;

                        //product info
                        if (item.Product != null) {
                            transaction.ItemID = item.Product.MasItemID;                            
                            transaction.UoM = item.Product.Unit;

                            //msrp price
                            if (item.Product.Vlueproductmsrp != null) {
                                transaction.UnitCost = Math.Round((Double)item.Product.Vlueproductmsrp.Listprice, 2, MidpointRounding.AwayFromZero);
                            } else {
                                transaction.UnitCost = 0;
                            }

                            transaction.TranAmt = transaction.UnitCost * transaction.Qty;
                            transaction.GLAcctNo = item.Product.GlAccountNumber;
                            if (transaction.GLAcctNo == null) {
                                transaction.GLAcctNo = "";
                            }
                        }
                                               
                        transaction.TranCmnt = "";
                        transaction.CompanyID = tranHeader.CompanyID;
                        transaction.ProcessStatus = 0;

                        transaction.Save();
                    }
                }
            } catch (Exception ex) {
                //DialogService.ShowMessage("Error Creating Transaction: " + transactionID + " " + ex.Message);
                Sage.Platform.Application.Exceptions.EventLogExceptionHandler eh = new Sage.Platform.Application.Exceptions.EventLogExceptionHandler();
                eh.HandleException(ex, false);
            }
        }




        //public static void SubmitSOPicklist(IStgSalesOrder_TAC salesOrder) {

        //    Sage.Entity.Interfaces.IStgSOPicklist_TAC plHeader =
        //    Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgSOPicklist_TAC),
        //    Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSOPicklist_TAC;

        //    plHeader.RowKey = 0; //set this to unique int number (global) during integration
        //    plHeader.TranType = 801;
        //    plHeader.TranNo = salesOrder.TranNo;
        //    plHeader.TranDate = salesOrder.TranDate;

        //    plHeader.CompanyID = salesOrder.CustID; //get this from mas

        //    plHeader.ProcessStatus = 0;            
        //    plHeader.SessionKey = 0;
        //    plHeader.SubmitDate = null;
        //    plHeader.ProcessDate = null;

        //    plHeader.Save();

        //    foreach (Sage.Entity.Interfaces.IStgSOLine_TAC item in salesOrder.StgSOLine_TACs) {

        //        //Transfer order line items
        //        Sage.Entity.Interfaces.IStgSOPicklistLine_TAC plLine =
        //                Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgSOPicklistLine_TAC),
        //                Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSOPicklistLine_TAC;

        //        plLine.Stgsopicklist_tacId = plHeader.Id.ToString();

        //        plLine.RowKey  = 0; //set this to unique int number (global) during integration - same as header value
        //        plLine.SOLineNo = 0; //Set this to unique number (for this order) during integration.
        //        //plLine.TrnsfrLineNo = (short)item.LineNumber; //sequence number    
        //        //plLine.TranNo =
        //        plLine.ItemID = item.ItemID; //set to itemid from mas

        //        plLine.QtyOnBO = item.QtyOnBO;
        //        plLine.QtyOrd = item.QtyOrd;
        //        plLine.QtyShip = item.QtyShip;
        //        plLine.ShipDate = item.ShipDate;
        //        plLine.CompanyID = salesOrder.CustID;
        //        plLine.UnitMeasID = item.UnitMeasID;

        //        plLine.ProcessStatus = 0;                
        //        plLine.SessionKey = 0;
        //        plLine.SubmitDate = null;
        //        plLine.ProcessDate = null;
        //        plLine.SOLineKey = null;
        //        plLine.OrderKey = null;

        //        plLine.Save();

        //    }
        //}


        public static void CreatePickinglist(ISalesOrder salesOrder, out String result) {

            Sage.Entity.Interfaces.IPickingList plHeader =
            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IPickingList),
            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IPickingList;

            plHeader.RowKey = 0; //set this to unique int number (global) during integration
            switch (salesOrder.OrderType) {
                case "Sales Order":
                    plHeader.TranType = 801;
                    break;
                case "Transfer Order":
                    plHeader.TranType = 812;
                    break;
            }
                        
            plHeader.TranNo = "0"; 
            plHeader.TranDate = DateTime.Now;
            plHeader.SalesOrderId = salesOrder.Id.ToString();

            //get the accountfinancial data
            if (salesOrder.Account.AccountFinancial != null) {
                if (salesOrder.Account.AccountFinancial.CustomerId.Length > 12) {
                    plHeader.CompanyID = salesOrder.Account.AccountFinancial.CustomerId.Substring(0, 12); //get from mas
                } else {
                    plHeader.CompanyID = salesOrder.Account.AccountFinancial.CustomerId;
                }

            }

            //plHeader.ProcessStatus = 0;
            //plHeader.SessionKey = 0;
            //plHeader.SubmitDate = null;
            //plHeader.ProcessDate = null;

            plHeader.Save();

            foreach (Sage.Entity.Interfaces.ISalesOrderItem item in salesOrder.SalesOrderItems) {

                //Transfer order line items
                Sage.Entity.Interfaces.IPickingListItem plLine =
                        Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IPickingListItem),
                        Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IPickingListItem;

                plLine.PickingListId = plHeader.Id.ToString();

                plLine.RowKey = 0; //set this to unique int number (global) during integration - same as header value                
                plLine.SOLineNo = item.LineNumber; //sequence number    

                //plLine.ItemID = item.Product.MASITEMKEY.ToString(); //set to itemid from mas
                plLine.ProductId = item.Product.Id.ToString();

                plLine.QtyOnBO = 0;
                plLine.QtyOrd = Decimal.Parse(item.Quantity.ToString());
                plLine.QtyShip = Decimal.Parse(item.Quantity.ToString());
                plLine.ShipDate = salesOrder.OrderDate;

                plLine.CompanyID = plHeader.CompanyID;
                plLine.UnitMeasID = item.Product.Unit;

                //plLine.ProcessStatus = 0;
                //plLine.SessionKey = 0;
                //plLine.SubmitDate = null;
                //plLine.ProcessDate = null;
                //plLine.SOLineKey = null;
                //plLine.OrderKey = null;

                plLine.Save();

            }
            //redirect to new picking list
            result = plHeader.Id.ToString();
        }

        public static void CreatePackinglist(ISalesOrder salesOrder, out String result) {

            Sage.Entity.Interfaces.IPickingList plHeader =
            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IPickingList),
            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IPickingList;

            plHeader.RowKey = 0; //set this to unique int number (global) during integration
            switch (salesOrder.OrderType) {
                case "Sales Order":
                    plHeader.TranType = 801;
                    break;
                case "Transfer Order":
                    plHeader.TranType = 812;
                    break;
            }

            plHeader.TranNo = "0"; //how to get this??
            plHeader.TranDate = DateTime.Now;
            plHeader.SalesOrderId = salesOrder.Id.ToString();
            plHeader.Status = "Packing List"; 

            //get the accountfinancial data
            if (salesOrder.Account.AccountFinancial != null) {
                if (salesOrder.Account.AccountFinancial.Companycode.Length > 3) {
                    plHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode.Substring(0, 3); //get from mas
                } else {
                    plHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode;
                }

            }

            //plHeader.ProcessStatus = 0;
            //plHeader.SessionKey = 0;
            //plHeader.SubmitDate = null;
            //plHeader.ProcessDate = null;

            plHeader.Save();

            //foreach (Sage.Entity.Interfaces.ISalesOrderItem item in salesOrder.SalesOrderItems) {

            //    //Transfer order line items
            //    Sage.Entity.Interfaces.IPickingListItem plLine =
            //            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IPickingListItem),
            //            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IPickingListItem;

            //    plLine.PickingListId = plHeader.Id.ToString();

            //    plLine.RowKey = 0; //set this to unique int number (global) during integration - same as header value                
            //    plLine.SOLineNo = item.LineNumber; //sequence number    

            //    //plLine.ItemID = item.Product.MASITEMKEY.ToString(); //set to itemid from mas
            //    plLine.ProductId = item.Product.Id.ToString();

            //    plLine.QtyOnBO = 0;
            //    plLine.QtyOrd = Decimal.Parse (item.Quantity.ToString());
            //    plLine.QtyShip = Decimal.Parse(item.Quantity.ToString());
            //    plLine.ShipDate = salesOrder.OrderDate;

            //    plLine.CompanyID = plHeader.CompanyID;
            //    plLine.UnitMeasID = item.Product.UnitOfMeasureId;

            //    //plLine.ProcessStatus = 0;
            //    //plLine.SessionKey = 0;
            //    //plLine.SubmitDate = null;
            //    //plLine.ProcessDate = null;
            //    //plLine.SOLineKey = null;
            //    //plLine.OrderKey = null;

            //    plLine.Save();

            //}
            //redirect to new picking list
            result = plHeader.Id.ToString();
        }

        public static void CreateReceiptOfGoods(ISalesOrder salesOrder, out String result) {

            Sage.Entity.Interfaces.IReceiptOfGoods plHeader =
            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IReceiptOfGoods),
            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IReceiptOfGoods;


            plHeader.PostDate = DateTime.Now;
            plHeader.SalesOrderId = salesOrder.Id.ToString();

            //get the accountfinancial data
            if (salesOrder.Account.AccountFinancial != null) {
                if (salesOrder.Account.AccountFinancial.Companycode.Length > 3) {
                    plHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode.Substring(0, 3); //get from mas
                } else {
                    plHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode;
                }

            }
            //plHeader.PONum = "How to get?";
            plHeader.WhseID = salesOrder.UserWareHouse.Sitereference.Siterefdisplayname;
            plHeader.Status = "Open";

            plHeader.Save();

            foreach (Sage.Entity.Interfaces.ISalesOrderItem item in salesOrder.SalesOrderItems) {

                //Transfer order line items
                Sage.Entity.Interfaces.IReceiptOfGoodsItem plLine =
                        Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IReceiptOfGoodsItem),
                        Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IReceiptOfGoodsItem;

                plLine.ReceiptOfGoodsId = plHeader.Id.ToString();

                //plLine.RowKey = 0; //set this to unique int number (global) during integration - same as header value                
                plLine.POLineNo = item.LineNumber; //sequence number    

                //plLine.ItemID = item.Product.MASITEMKEY.ToString(); //set to itemid from mas
                plLine.ProductId = item.Product.Id.ToString();
                plLine.UnitMeasID = item.Product.Unit;
                plLine.QtyRcvd = Decimal.Parse(item.Quantity.ToString());

                plLine.Save();

            }
            //redirect to new picking list
            result = plHeader.Id.ToString();
        }


        public static void GetPickingListsbySalesOrder(ISalesOrder salesorder, out IList<IPickingList> result) {

            //query the picking list object for all PICKING LIST records that are linked to this sales order
            Sage.Platform.RepositoryHelper<Sage.Entity.Interfaces.IPickingList> f =
                Sage.Platform.EntityFactory.GetRepositoryHelper<Sage.Entity.Interfaces.IPickingList>();
            Sage.Platform.Repository.ICriteria crit = f.CreateCriteria();


            crit.Add(f.EF.Eq("SalesOrder", salesorder));
            crit.Add(f.EF.Eq("Status", "Picking List"));

            result = crit.List<Sage.Entity.Interfaces.IPickingList>();

        }

        public static void GetPackingListsbySalesOrder(ISalesOrder salesorder, out IList<IPickingList> result) {

            //query the picking list object for all PACKING LIST records that are linked to this sales order
            Sage.Platform.RepositoryHelper<Sage.Entity.Interfaces.IPickingList> f =
                Sage.Platform.EntityFactory.GetRepositoryHelper<Sage.Entity.Interfaces.IPickingList>();
            Sage.Platform.Repository.ICriteria crit = f.CreateCriteria();


            crit.Add(f.EF.Eq("SalesOrder", salesorder));
            crit.Add(f.EF.Eq("Status", "Packing List"));

            result = crit.List<Sage.Entity.Interfaces.IPickingList>();

        }

        public static void AddStockcardProducts(ISalesOrder salesorder) {
            //Only add products if the account is specified
            if (salesorder.Account != null) {

                //save the salesorder
                salesorder.Save();

                //List the stock card items            
                Sage.Platform.RepositoryHelper<Sage.Entity.Interfaces.IStockCardItems> f =
                    Sage.Platform.EntityFactory.GetRepositoryHelper<Sage.Entity.Interfaces.IStockCardItems>();
                Sage.Platform.Repository.ICriteria crit = f.CreateCriteria();


                crit.Add(f.EF.Eq("Accountid", salesorder.Account.Id.ToString()));
                //crit.Add(f.EF.Eq("Status", "PickingList"));

                //result = crit.List<Sage.Entity.Interfaces.IPickingList>();
                foreach (IStockCardItems scitem in crit.List<IStockCardItems>()) {

                    //add the products to the salesorder
                    Sage.Entity.Interfaces.ISalesOrderItem item =
                    Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.ISalesOrderItem),
                    Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.ISalesOrderItem;

                    item.SalesOrder = salesorder;
                    
                    item.Description = scitem.ProductDescription;
                    item.Discount = scitem.Margin;
                    item.ExtendedPrice = 0; //due to quantity 0                    
                    item.Quantity = 0; //set to 0 initially                   

                    if (scitem.Product != null) {
                        item.ActualID = scitem.Product.ActualId;
                        item.Family = scitem.Product.Family;
                        item.Price = Math.Round((Double)scitem.Product.Price, 2, MidpointRounding.AwayFromZero);
                        item.ProductName = scitem.Product.Name;
                        item.Program = scitem.Product.Program;
                        item.Case = scitem.Product.Unit;
                        item.Product = scitem.Product;
                    }

                    salesorder.SalesOrderItems.Add(item);
                    item.Save();
                    //break;
                }
                //salesorder.Save();
            }
        }

    }
}
