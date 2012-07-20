using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using Sage.Entity.Interfaces;
using NHibernate;

namespace EAB_Custom {
    public class PickingListExtension {

        public static void SubmitPickingList(IPickingList pickinglist) {
            //Determine which order to submit and pass through
            SubmitPickinglisttoMas(pickinglist);
        }


        private static void SubmitPickinglisttoMas(IPickingList pickinglist) {

            Sage.Entity.Interfaces.IStgSOPicklist_TAC plHeader =
            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgSOPicklist_TAC),
            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSOPicklist_TAC;

            plHeader.RowKey = 0; //set this to unique int number (global) during integration
            plHeader.TranType = 801;
            plHeader.TranNo = pickinglist.TranNo;
            plHeader.TranDate = pickinglist.TranDate;

            plHeader.CompanyID = pickinglist.CompanyID; //get this from mas

            plHeader.ProcessStatus = 0;
            plHeader.SessionKey = 0;
            plHeader.SubmitDate = null;
            plHeader.ProcessDate = null;

            plHeader.Save();

            foreach (Sage.Entity.Interfaces.IPickingListItem item in pickinglist.PickingListItems) {

                //Transfer order line items
                Sage.Entity.Interfaces.IStgSOPicklistLine_TAC plLine =
                        Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgSOPicklistLine_TAC),
                        Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgSOPicklistLine_TAC;

                plLine.Stgsopicklist_tacId = plHeader.Id.ToString();

                plLine.RowKey = 0; //set this to unique int number (global) during integration - same as header value
                plLine.SOLineNo = item.SOLineNo; //sequence number  
                
                plLine.ItemID = item.Product.MASITEMKEY.ToString(); //set to itemid from mas

                plLine.QtyOnBO = (Double)item.QtyOnBO;
                plLine.QtyOrd = (Double)item.QtyOrd;
                plLine.QtyShip = (Double)item.QtyShip;
                plLine.ShipDate = item.ShipDate;
                plLine.CompanyID = pickinglist.CompanyID;
                plLine.UnitMeasID = item.UnitMeasID;

                plLine.ProcessStatus = 0;
                plLine.SessionKey = 0;
                plLine.SubmitDate = null;
                plLine.ProcessDate = null;
                plLine.SOLineKey = null;
                plLine.OrderKey = null;

                plLine.Save();

            }
        }


    }
}
