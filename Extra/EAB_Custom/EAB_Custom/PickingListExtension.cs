//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Collections;
//using Sage.Entity.Interfaces;
//using NHibernate;

//namespace EAB_Custom {
//    class PickingListExtension {

//        public static void SubmitSOPicklist(IStgSalesOrder_TAC salesOrder) {

//            Sage.Entity.Interfaces.IStgSOPicklist_TAC plHeader =
//            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgSOPicklist_TAC),
//            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSOPicklist_TAC;

//            plHeader.RowKey = 0; //set this to unique int number (global) during integration
//            plHeader.TranType = 801;
//            plHeader.TranNo = salesOrder.TranNo;
//            plHeader.TranDate = salesOrder.TranDate;

//            plHeader.CompanyID = salesOrder.CustID; //get this from mas

//            plHeader.ProcessStatus = 0;
//            plHeader.SessionKey = 0;
//            plHeader.SubmitDate = null;
//            plHeader.ProcessDate = null;

//            plHeader.Save();

//            foreach (Sage.Entity.Interfaces.IStgSOLine_TAC item in salesOrder.StgSOLine_TACs) {

//                //Transfer order line items
//                Sage.Entity.Interfaces.IStgSOPicklistLine_TAC plLine =
//                        Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgSOPicklistLine_TAC),
//                        Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSOPicklistLine_TAC;

//                plLine.Stgsopicklist_tacId = plHeader.Id.ToString();

//                plLine.RowKey = 0; //set this to unique int number (global) during integration - same as header value
//                plLine.SOLineNo = 0; //Set this to unique number (for this order) during integration.
//                //plLine.TrnsfrLineNo = (short)item.LineNumber; //sequence number    
//                //plLine.TranNo =
//                plLine.ItemID = item.ItemID; //set to itemid from mas

//                plLine.QtyOnBO = item.QtyOnBO;
//                plLine.QtyOrd = item.QtyOrd;
//                plLine.QtyShip = item.QtyShip;
//                plLine.ShipDate = item.ShipDate;
//                plLine.CompanyID = salesOrder.CustID;
//                plLine.UnitMeasID = item.UnitMeasID;

//                plLine.ProcessStatus = 0;
//                plLine.SessionKey = 0;
//                plLine.SubmitDate = null;
//                plLine.ProcessDate = null;
//                plLine.SOLineKey = null;
//                plLine.OrderKey = null;

//                plLine.Save();

//            }
//        }

//    }
//}
