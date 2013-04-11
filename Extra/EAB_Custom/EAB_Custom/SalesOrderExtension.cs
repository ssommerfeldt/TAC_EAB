using System;
using System.Collections.Generic;
using Sage.Entity.Interfaces;
using System.Data.OleDb;
using NHibernate;
using Sage.Platform.Application;



namespace EAB_Custom {
    public class SalesOrderExtension {

        public static decimal TruncateDecimal(decimal value, int precision) {
            decimal step = (decimal)Math.Pow(10, precision);
            int tmp = (int)Math.Truncate(step * value);
            return tmp / step;
        }



        public static void SubmitOrder(ISalesOrder salesOrder) {
            //don't allow already submitted order to resubmit
            if (salesOrder.Status == "Transmitted to Accounting") {
                throw new Exception("The order (" + salesOrder.SalesOrderNumber + ") has already been submitted. Change the status to resubmit.");
            }

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
                            throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): Error Reading Account Manager Relationship");
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
                            throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): Error Reading Account Manager Relationship");
                    }
                    break;
                default:
                    throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): Error Determining Order Type");
            }
        }


        private static void SubmitSalesOrder(ISalesOrder salesOrder) {
            try {
                //submit order to mas

                //Salesorder header
                Sage.Entity.Interfaces.IStgSalesOrder_TAC soHeader =
                Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgSalesOrder_TAC),
                Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSalesOrder_TAC;

                soHeader.SalesOrderID = salesOrder.Id.ToString();
                soHeader.UserFld1 = salesOrder.SalesOrderNumber;
                soHeader.TranNo = "0";
                soHeader.TranDate = DateTime.Now;
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
                soHeader.CustPONO = salesOrder.CustomerPurchaseOrderNumber;
                soHeader.PrimarySperID = Sage.SalesLogix.API.MySlx.Security.CurrentSalesLogixUser.UserInfo.AccountingUserId;

                //Set the discount amount from discount percentage
                //if (salesOrder.Discount == null || salesOrder.Discount == 0) {
                soHeader.TradeDiscAmt = null;
                //} else {
                //    soHeader.TradeDiscAmt = (Double)TruncateDecimal((Decimal)salesOrder.Discount * (Decimal)soHeader.OpenAmt, 2);
                //}

                //get the accountfinancial data
                if (salesOrder.Account != null) {
                    if (salesOrder.Account.AccountFinancial != null) {
                        soHeader.CustID = salesOrder.Account.AccountFinancial.CustomerId; //get from mas
                        soHeader.CustClassID = salesOrder.Account.AccountFinancial.Customer_Type.Substring(0, 4).ToUpper(); //get from mas

                        //soHeader.DfltShipToCustAddrID = salesOrder.ShippingAddress.Address.MASAddrKey.ToString(); //change this to mas id
                        soHeader.DfltShipToCustAddrID = salesOrder.Account.AccountFinancial.CustomerId;
                        //soHeader.BillToCustAddrID = salesOrder.BillingAddress.Address.MASAddrKey.ToString(); //change to mas id
                        soHeader.BillToCustAddrID = salesOrder.Account.AccountFinancial.CustomerId;
                        soHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode;
                    }
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

                        soLine.TradeDiscAmt = (Double)Math.Round((Decimal)salesOrder.Discount * (Decimal)soLine.ExtAmt, 2, MidpointRounding.ToEven);
                        soLine.TradeDiscPct = null;

                        soLine.ExtCmnt = null;
                        soLine.FOBID = salesOrder.Fob;
                        //soLine.FreightAmt = salesOrder.Freight; //do not use
                        soLine.FreightAmt = 0;
                        soLine.Hold = "0";
                        soLine.HoldReason = null;
                        soLine.ItemAliasID = null;
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
                        if (salesOrder.ShippingAddress != null) {
                            if (salesOrder.ShippingAddress.Address != null) {
                                soLine.ShipToAddrName = salesOrder.ShippingAddress.Address.MASAddrKey.ToString();//get from MAS
                            }
                            soLine.ShipToAddrLine1 = salesOrder.ShippingAddress.Address1;
                            soLine.ShipToAddrLine2 = salesOrder.ShippingAddress.Address2;
                            soLine.ShipToAddrLine3 = salesOrder.ShippingAddress.Address3;
                            soLine.ShipToAddrLine4 = salesOrder.ShippingAddress.Address4;
                            soLine.ShipToAddrLine5 = "";
                            soLine.ShipToCity = salesOrder.ShippingAddress.City;
                            if (salesOrder.ShippingAddress.Country.Length > 3) {
                                if (salesOrder.ShippingAddress.Country.ToUpper().Substring(0, 1) == "U") {
                                    soLine.ShipToCountryID = "USA";
                                } else {
                                    soLine.ShipToCountryID = "CAN";
                                }
                            } else {
                                soLine.ShipToCountryID = salesOrder.ShippingAddress.Country;
                            }
                            soLine.ShipToPostalCode = salesOrder.ShippingAddress.PostalCode;
                            soLine.ShipToStateID = salesOrder.ShippingAddress.State;
                        }
                        soLine.Status = "Open";
                        soLine.STaxClassID = null;
                        soLine.TranNo = "0";

                        if (item.Product != null) {
                            soLine.GLAcctNo = item.Product.GlAccountNumber; //get this from mas
                            soLine.ItemID = item.Product.MasItemID; //item key from mas
                            soLine.UnitMeasID = item.Product.Unit; //get this from mas
                        }
                        //soLine.UnitPrice = Math.Round((Double)item.Price, 2); //wrong price, use price * margin
                        soLine.UnitPrice = Math.Round((Double)item.CalculatedPrice, 2, MidpointRounding.AwayFromZero);
                        soLine.UserFld1 = null;
                        soLine.UserFld2 = null;
                        soLine.VendorID = soHeader.CustID;
                        soLine.WillCall = null;
                        if (salesOrder.UserWareHouse != null) {
                            if (salesOrder.UserWareHouse.Sitereference != null) {
                                soLine.WarehouseID = salesOrder.UserWareHouse.Sitereference.Siterefdisplayname; //get this from mas
                            }
                        }

                        soLine.Save();

                    }
                }

                //Update the salesorder
                salesOrder.Status = "Transmitted to Accounting";
                salesOrder.Save();
            } catch (Exception e) {
                throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): " + e.Message, e);
            }
        }

        private static void SubmitTransferOrder(ISalesOrder salesOrder) {
            try {
                //submit order to mas            
                //header
                Sage.Entity.Interfaces.IStgTrnsfrOrder_TAC toHeader =
                Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgTrnsfrOrder_TAC),
                Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgTrnsfrOrder_TAC;

                toHeader.SalesOrderID = salesOrder.Id.ToString();
                toHeader.TrnsfrOrderID = 0; //set this to unique int number (global) during integration
                toHeader.CloseDate = DateTime.Now;

                //get the accountfinancial data
                if (salesOrder.Account != null) {
                    if (salesOrder.Account.AccountFinancial != null) {
                        if (salesOrder.Account.AccountFinancial.Companycode.Length > 3) {
                            toHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode.Substring(0, 3); //get from mas
                        } else {
                            toHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode;
                        }
                    }
                }
                if (salesOrder.SourceSLXSite == null) {
                    throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): Error: Destination Warehouse not specified.");
                } else {
                    if (salesOrder.SourceSLXSite.Sitereference != null) {
                        toHeader.RcvgWhseID = salesOrder.SourceSLXSite.Sitereference.Siterefdisplayname; //get this from mas
                    }
                }
                if (salesOrder.UserWareHouse == null) {
                    throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): Error: Source Warehouse not specified.");
                } else {
                    if (salesOrder.UserWareHouse.Sitereference != null) {
                        toHeader.ShipWhseID = salesOrder.UserWareHouse.Sitereference.Siterefdisplayname; //get this from mas
                    }
                }

                toHeader.ReqDelvDate = DateTime.Now.AddDays(10);
                toHeader.SchdShipDate = DateTime.Now.AddDays(2);
                toHeader.ShipMethID = null;
                toHeader.TranCmnt = salesOrder.SalesOrderNumber;
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
                        //toLine.TranCmnt = salesOrder.SalesOrderNumber;

                        toLine.TrnsfrOrderID = 0; //set this to unique int number (global) during integration - same as header value
                        toLine.TrnsfrOrderLineID = 0; //Set this to unique number (for this order) during integration.
                        toLine.TrnsfrLineNo = (short)item.LineNumber; //sequence number    

                        if (item.Product != null) {
                            toLine.ItemID = item.Product.MasItemID; //set to itemid from mas
                            toLine.UoM = item.Product.Unit; //set to unit of measure from mas
                        }
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

                //Update the salesorder
                salesOrder.Status = "Transmitted to Accounting";
                salesOrder.Save();

            } catch (Exception e) {
                throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): " + e.Message, e);
            }
        }

        private static void SubmitPurchaseOrder(ISalesOrder salesOrder) {
            try {
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
                soHeader.UserFld1 = salesOrder.SalesOrderNumber;
                soHeader.VendClassID = null;


                //get the accountfinancial data
                if (salesOrder.Account != null) {
                    if (salesOrder.Account.AccountFinancial != null) {
                        soHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode;
                        soHeader.VendorID = salesOrder.Account.AccountFinancial.CustomerId; //get from mas
                    }
                }
                //exit if wareouse not specified
                if (salesOrder.UserWareHouse == null) {
                    throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): Error: Source Warehouse not specified.");
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

                        if (item.Product != null) {
                            if (String.IsNullOrEmpty(item.Product.GlAccountNumber)) { throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): GL Account Number is required"); }
                            soLine.GLAcctNo = item.Product.GlAccountNumber; //get this from mas                    
                            soLine.ItemID = item.Product.MasItemID; //item key from mas
                            soLine.UnitMeasID = item.Product.Unit; //get this from mas
                        }
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
                        soLine.TranNo = "0";

                        //get the accountfinancial data
                        if (salesOrder.Account != null) {
                            if (salesOrder.Account.AccountFinancial != null) {
                                if (salesOrder.Account.AccountFinancial.Companycode.Length > 3) {
                                    soLine.TargetCompanyID = salesOrder.Account.AccountFinancial.Companycode.Substring(0, 3); //get from mas
                                } else {
                                    soLine.TargetCompanyID = salesOrder.Account.AccountFinancial.Companycode;
                                }
                            }
                        }

                        if (item.CalculatedPrice == null) {
                            soLine.UnitCost = 0;
                            soLine.ExtAmt = 0;
                        } else {
                            soLine.UnitCost = Math.Round((Double)item.CalculatedPrice, 2, MidpointRounding.AwayFromZero);
                            soLine.ExtAmt = Math.Round((Double)item.CalculatedPrice * (Double)item.Quantity, 2, MidpointRounding.AwayFromZero);
                        }

                        soLine.UserFld1 = null;
                        soLine.STaxClassID = "Taxable";

                        if (salesOrder.UserWareHouse == null) {
                            throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): Error: Source Warehouse not specified.");
                        } else {
                            if (salesOrder.UserWareHouse.Sitereference != null) {
                                soLine.ShipToWhseID = salesOrder.UserWareHouse.Sitereference.Siterefdisplayname; //get this from mas
                            }
                        }

                        soLine.Save();

                    }
                }
                //Update the salesorder
                salesOrder.Status = "Transmitted to Accounting";
                salesOrder.Save();

            } catch (Exception e) {
                throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): " + e.Message, e);
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
                tranHeader.BComment = salesOrder.SalesOrderNumber;
                tranHeader.BDate = DateTime.Now;

                if (salesOrder.UserWareHouse != null) {
                    if (salesOrder.UserWareHouse.Sitereference != null) {
                        tranHeader.WhseID = salesOrder.UserWareHouse.Sitereference.Siterefdisplayname;
                    }
                }

                //get the accountfinancial data
                if (salesOrder.Account != null) {
                    if (salesOrder.Account.AccountFinancial != null) {
                        tranHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode;
                    }
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
                        transaction.TranCmnt = salesOrder.SalesOrderNumber;

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

                        transaction.CompanyID = tranHeader.CompanyID;
                        transaction.ProcessStatus = 0;

                        transaction.Save();
                    }
                }
                //Update the salesorder
                salesOrder.Status = "Transmitted to Accounting";
                salesOrder.Save();

            } catch (Exception e) {
                //DialogService.ShowMessage("Error Creating Transaction: " + transactionID + " " + ex.Message);
                //Sage.Platform.Application.Exceptions.EventLogExceptionHandler eh = new Sage.Platform.Application.Exceptions.EventLogExceptionHandler();
                //eh.HandleException(ex, false);
                throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): " + e.Message, e);
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
            try {
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
                if (salesOrder.Account != null) {
                    if (salesOrder.Account.AccountFinancial != null) {
                        if (salesOrder.Account.AccountFinancial.CustomerId.Length > 12) {
                            plHeader.CompanyID = salesOrder.Account.AccountFinancial.CustomerId.Substring(0, 12); //get from mas
                        } else {
                            plHeader.CompanyID = salesOrder.Account.AccountFinancial.CustomerId;
                        }
                    }
                }

                //plHeader.ProcessStatus = 0;
                //plHeader.SessionKey = 0;
                //plHeader.SubmitDate = null;
                //plHeader.ProcessDate = null;

                plHeader.Save();

                foreach (Sage.Entity.Interfaces.ISalesOrderItem item in salesOrder.SalesOrderItems) {
                    //don't add items with 0 quantity
                    if (item.Quantity <= 0) {

                        //Picking list line items
                        Sage.Entity.Interfaces.IPickingListItem plLine =
                                Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IPickingListItem),
                                Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IPickingListItem;

                        plLine.PickingListId = plHeader.Id.ToString();

                        plLine.RowKey = 0; //set this to unique int number (global) during integration - same as header value                
                        plLine.SOLineNo = item.LineNumber; //sequence number    

                        if (item.Product != null) {
                            //plLine.ItemID = item.Product.MASITEMKEY.ToString(); //set to itemid from mas
                            plLine.ProductId = item.Product.Id.ToString();
                            plLine.UnitMeasID = item.Product.Unit;
                        }

                        plLine.QtyOnBO = 0;
                        plLine.QtyOrd = Decimal.Parse(item.Quantity.ToString());
                        plLine.QtyShip = Decimal.Parse(item.Quantity.ToString());
                        plLine.ShipDate = salesOrder.OrderDate;
                        plLine.CompanyID = plHeader.CompanyID;

                        //plLine.ProcessStatus = 0;
                        //plLine.SessionKey = 0;
                        //plLine.SubmitDate = null;
                        //plLine.ProcessDate = null;
                        //plLine.SOLineKey = null;
                        //plLine.OrderKey = null;

                        plLine.Save();
                    }
                }
                //redirect to new picking list
                result = plHeader.Id.ToString();

            } catch (Exception e) {
                throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): " + e.Message, e);
            }
        }

        public static void CreatePackinglist(ISalesOrder salesOrder, out String result) {
            try {
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
                if (salesOrder.Account != null) {
                    if (salesOrder.Account.AccountFinancial != null) {
                        if (salesOrder.Account.AccountFinancial.Companycode.Length > 3) {
                            plHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode.Substring(0, 3); //get from mas
                        } else {
                            plHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode;
                        }
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

            } catch (Exception e) {
                throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): " + e.Message, e);
            }
        }

        public static void CreateReceiptOfGoods(ISalesOrder salesOrder, out String result) {
            try {

                Sage.Entity.Interfaces.IReceiptOfGoods plHeader =
                Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IReceiptOfGoods),
                Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IReceiptOfGoods;


                plHeader.PostDate = DateTime.Now;
                plHeader.SalesOrderId = salesOrder.Id.ToString();
                plHeader.Status = "Open";
                //plHeader.PONum = "How to get?";

                //get the accountfinancial data
                if (salesOrder.Account != null) {
                    if (salesOrder.Account.AccountFinancial != null) {
                        if (salesOrder.Account.AccountFinancial.Companycode.Length > 3) {
                            plHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode.Substring(0, 3); //get from mas
                        } else {
                            plHeader.CompanyID = salesOrder.Account.AccountFinancial.Companycode;
                        }
                    }
                }

                if (salesOrder.UserWareHouse != null) {
                    if (salesOrder.UserWareHouse.Sitereference != null) {
                        plHeader.WhseID = salesOrder.UserWareHouse.Sitereference.Siterefdisplayname;
                    }
                }


                plHeader.Save();

                foreach (Sage.Entity.Interfaces.ISalesOrderItem item in salesOrder.SalesOrderItems) {
                    //don't add items with 0 quantity
                    if (item.Quantity > 0) {

                        //Transfer order line items
                        Sage.Entity.Interfaces.IReceiptOfGoodsItem plLine =
                                Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IReceiptOfGoodsItem),
                                Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IReceiptOfGoodsItem;

                        plLine.ReceiptOfGoodsId = plHeader.Id.ToString();

                        //plLine.RowKey = 0; //set this to unique int number (global) during integration - same as header value                
                        plLine.POLineNo = item.LineNumber; //sequence number    

                        if (item.Product != null) {
                            //plLine.ItemID = item.Product.MASITEMKEY.ToString(); //set to itemid from mas
                            plLine.ProductId = item.Product.Id.ToString();
                            plLine.UnitMeasID = item.Product.Unit;
                            plLine.QtyRcvd = Decimal.Parse(item.Quantity.ToString());
                        }

                        plLine.Save();
                    }
                }
                //redirect to new picking list
                result = plHeader.Id.ToString();

            } catch (Exception e) {
                throw new Exception("Order (" + salesOrder.SalesOrderNumber + "): " + e.Message, e);
            }
        }


        public static void GetPickingListsbySalesOrder(ISalesOrder salesorder, out IList<IPickingList> result) {
            try {
                //query the picking list object for all PICKING LIST records that are linked to this sales order
                Sage.Platform.RepositoryHelper<Sage.Entity.Interfaces.IPickingList> f =
                    Sage.Platform.EntityFactory.GetRepositoryHelper<Sage.Entity.Interfaces.IPickingList>();
                Sage.Platform.Repository.ICriteria crit = f.CreateCriteria();


                crit.Add(f.EF.Eq("SalesOrder", salesorder));
                crit.Add(f.EF.Eq("Status", "Picking List"));

                result = crit.List<Sage.Entity.Interfaces.IPickingList>();
            } catch (Exception e) {
                throw new Exception("Order (" + salesorder.SalesOrderNumber + "): " + e.Message, e);
            }
        }

        public static void GetPackingListsbySalesOrder(ISalesOrder salesorder, out IList<IPickingList> result) {
            try {
                //query the picking list object for all PACKING LIST records that are linked to this sales order
                Sage.Platform.RepositoryHelper<Sage.Entity.Interfaces.IPickingList> f =
                    Sage.Platform.EntityFactory.GetRepositoryHelper<Sage.Entity.Interfaces.IPickingList>();
                Sage.Platform.Repository.ICriteria crit = f.CreateCriteria();


                crit.Add(f.EF.Eq("SalesOrder", salesorder));
                crit.Add(f.EF.Eq("Status", "Packing List"));

                result = crit.List<Sage.Entity.Interfaces.IPickingList>();

            } catch (Exception e) {
                throw new Exception("Order (" + salesorder.SalesOrderNumber + "): " + e.Message, e);
            }
        }

        public static void AddStockcardProducts(ISalesOrder salesorder) {
            try {
                //Only add products if the account is specified
                if (salesorder.Account != null) {

                    //save the salesorder
                    salesorder.Save();

                    //get the user's warehouseid, the id may not match the object reference, use the id as correct
                    String userWarehouseID = "";
                    if (String.IsNullOrEmpty(salesorder.UserWHSEID) && salesorder.UserWareHouse != null) {
                        userWarehouseID = salesorder.UserWareHouse.SiteCodeId;
                    } else if (salesorder.UserWHSEID == salesorder.UserWareHouse.Id.ToString()) {
                        userWarehouseID = salesorder.UserWareHouse.SiteCodeId;
                    } else {
                        //lookup id from site
                        Sage.Entity.Interfaces.ISLXSite _UserWareHouse =
                            Sage.Platform.EntityFactory.GetById<Sage.Entity.Interfaces.ISLXSite>(salesorder.UserWHSEID);
                        if (_UserWareHouse != null) {
                            userWarehouseID = _UserWareHouse.SiteCodeId;
                        }
                    }

                    //List the stock card items            
                    Sage.Platform.RepositoryHelper<Sage.Entity.Interfaces.IStockCardItems> f =
                        Sage.Platform.EntityFactory.GetRepositoryHelper<Sage.Entity.Interfaces.IStockCardItems>();
                    Sage.Platform.Repository.ICriteria crit = f.CreateCriteria();


                    crit.Add(f.EF.Eq("Accountid", salesorder.Account.Id.ToString()));
                    crit.CreateAlias("Product", "p");
                    crit.Add(f.EF.Eq("p.WarehouseID", userWarehouseID));
                    //crit.Add(f.EF.Eq("Status", "PickingList"));

                    //result = crit.List<Sage.Entity.Interfaces.IPickingList>();
                    foreach (IStockCardItems scitem in crit.List<IStockCardItems>()) {
                        if (scitem.Product != null) {

                            ////Only add products in the selected warehouse
                            //if (!String.IsNullOrEmpty(userWarehouseID) && userWarehouseID == scitem.Product.WarehouseID) {

                            //add the products to the salesorder
                            Sage.Entity.Interfaces.ISalesOrderItem item =
                            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.ISalesOrderItem),
                            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.ISalesOrderItem;

                            //use common function to add salesorderitem
                            item.SalesOrder = salesorder;
                            item.Product = scitem.Product;
                            item.MaxStockLevel = scitem.MaxStockLevel; //ssommerfeldt Nov 2 2012
                            item.SaveProductToSalesOrderItem();
                            item.Save();

                            salesorder.SalesOrderItems.Add(item);


                            ////get msrp price                                  
                            //double listPrice = 0;
                            //try {
                            //    if (scitem.Product.Vproductpricesheet != null) {
                            //        listPrice = (double)scitem.Product.Vproductpricesheet.Listprice;
                            //    } else {
                            //        //price not found
                            //    }
                            //} catch (Exception ex) {
                            //    //vproductpricesheet record not found
                            //    Sage.Platform.Application.Exceptions.EventLogExceptionHandler eh = new Sage.Platform.Application.Exceptions.EventLogExceptionHandler();
                            //    eh.HandleException(new Exception("Order (" + item.SalesOrder.SalesOrderNumber + "): " + ex.Message, ex), false);
                            //}
                            ////item.Price = Math.Round((Double)scitem.Product.Price, 2, MidpointRounding.AwayFromZero);
                            //item.Price = listPrice;

                            ////get the margin                                
                            //item.Discount = scitem.Margin;

                            //item.ExtendedPrice = 0; //due to quantity 0                    
                            //item.Quantity = 0; //set to 0 initially                   

                            //item.ActualID = scitem.Product.ActualId;
                            //item.UPC = scitem.Product.UPC;
                            //item.Description = scitem.ProductDescription;
                            //item.Family = scitem.Product.Family;

                            //item.ProductName = scitem.Product.Name;
                            //item.Program = scitem.Product.Program;
                            //item.Case = scitem.Product.Unit;
                            //item.Product = scitem.Product;
                            //item.UnitOfMeasureId = scitem.Product.UnitOfMeasureId.Trim();
                            //item.MaxStockLevel = scitem.MaxStockLevel; //ssommerfeldt Nov 2 2012

                            //salesorder.SalesOrderItems.Add(item);
                            //item.Save();                            
                        }
                    }
                }
            } catch (Exception e) {
                throw new Exception("Order (" + salesorder.SalesOrderNumber + "): " + e.Message, e);
            }
        }



        public static bool OnBeforeInsertStep2(ISalesOrder salesOrder, ISession session) {

            SetOrderTotals(salesOrder);
            return true;
        }

        public static bool OnBeforeUpdateStep2(ISalesOrder salesOrder, ISession session) {

            SetOrderTotals(salesOrder);
            return true;
        }

        public static void SetOrderTotals(ISalesOrder salesOrder) {
            double adjPrice = GetAdjustedPrice(salesOrder);
            double total = GetSalesOrderGrandTotal(salesOrder);
            salesOrder.OrderTotal = adjPrice;
            salesOrder.GrandTotal = total;
            //salesOrder.SalesOrderTotal = total;
        }

        public static double GetAdjustedPrice(ISalesOrder salesOrder) {
            double adjprice = 0d;
            foreach (ISalesOrderItem item in salesOrder.SalesOrderItems) {
                //sum the prices from all items
                //adjprice += SalesOrderItemExtension.CalculateAdjustedPrice(item);
                adjprice += item.ExtendedPrice ?? 0d;
            }
            return adjprice;
        }

        public static double GetSalesOrderGrandTotal(ISalesOrder salesOrder) {
            double total = salesOrder.OrderTotal.HasValue ? salesOrder.OrderTotal.Value : 0.0;
            total = salesOrder.Discount.HasValue ? (total - (total * salesOrder.Discount.Value)) : total;
            total += salesOrder.Freight.HasValue ? salesOrder.Freight.Value : 0.0;
            return (total + (salesOrder.Tax.HasValue ? (total * salesOrder.Tax.Value) : 0.0));
        }

        /// <summary>
        /// Use this value to get the calculated order total
        /// </summary>
        /// <param name="salesorder"></param>
        /// <param name="result"></param>
        public static void GetSalesOrderTotal(ISalesOrder salesorder, out System.Double result) {
            salesorder.OrderTotal = new double?(GetAdjustedPrice(salesorder));
            salesorder.GrandTotal = new double?(GetSalesOrderGrandTotal(salesorder));
            result = salesorder.GrandTotal ?? 0d;
        }
    }
}
