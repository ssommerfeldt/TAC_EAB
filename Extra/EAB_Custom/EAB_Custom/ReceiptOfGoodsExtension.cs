using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using Sage.Entity.Interfaces;
using NHibernate;

namespace EAB_Custom {
    public class ReceiptOfGoodsExtension {

        public static void SubmitReceiptOfGoods(IReceiptOfGoods receiptofgoods) {
            //Determine which order to submit and pass through
            SubmitReceiptOfGoodstoMas(receiptofgoods);
        }


        private static void SubmitReceiptOfGoodstoMas(IReceiptOfGoods receiptofgoods) {

            Sage.Entity.Interfaces.IStgPORcptTransBatch rgHeader =
            Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgPORcptTransBatch),
            Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgPORcptTransBatch;

            rgHeader.ReceiptOfGoodsID = receiptofgoods.Id.ToString();
            rgHeader.RowKey = 0; //set this to unique int number (global) during integration
            rgHeader.BatchCmnt = receiptofgoods.SalesOrder.SalesOrderNumber;
            rgHeader.BatchNo = 0;
            rgHeader.BatchType = 1101;
            rgHeader.Hold = 0;
            rgHeader.HoldReason = null;
            rgHeader.PostDate = DateTime.Now;
            rgHeader.PrivateBatch = 0;
            rgHeader.ProcessStatus = 0;
            rgHeader.SessionKey = 0;
            rgHeader.WhseID = receiptofgoods.WhseID;

            rgHeader.Save();

            //Update the extension table
            rgHeader.ReceiptOfGoodsID = receiptofgoods.Id.ToString();
            rgHeader.StgPORcptRcvr.RowRcvrKey = 0; //set to unique value for this record during integration
            rgHeader.StgPORcptRcvr.RowKey = 0; //set to batch record rowkey during integration
            rgHeader.StgPORcptRcvr.ProcessStatus = 0;
            rgHeader.StgPORcptRcvr.SessionKey = 0;
            rgHeader.StgPORcptRcvr.BillOfLadingNo = null;

            rgHeader.StgPORcptRcvr.PONum = receiptofgoods.PONum;
            rgHeader.StgPORcptRcvr.PurchCompanyID = receiptofgoods.CompanyID;

            rgHeader.StgPORcptRcvr.TranCmnt = null;
            rgHeader.StgPORcptRcvr.TranDate = DateTime.Now;
            rgHeader.StgPORcptRcvr.TranType = 1101;

            rgHeader.StgPORcptRcvr.Save();

            foreach (Sage.Entity.Interfaces.IReceiptOfGoodsItem item in receiptofgoods.ReceiptOfGoodsItems) {

                //line items
                Sage.Entity.Interfaces.IStgPORcptLine rgLine =
                        Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgPORcptLine),
                        Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgPORcptLine;

                rgLine.Stgporcpttransbatchid = rgHeader.Id.ToString();
                rgLine.ReceiptOfGoodsID = receiptofgoods.Id.ToString();
                rgLine.ReceiptOfGoodsItemID = item.Id.ToString();

                rgLine.RowLineKey = 0; //set this to unique int number (global) during integration - same as header value
                rgLine.RowRcvrKey = 0; //set this to the reciever rowkey during integration
                rgLine.POLineNo = item.POLineNo; //sequence number  
                
                rgLine.CloseSrcLine = 0;
                rgLine.ItemVol = null;
                rgLine.ItemWght = null;
                rgLine.MatchStatus = null;
                rgLine.SeqNo = null;
                rgLine.TranCmnt = null;
                rgLine.AcctRefCode = null;

                rgLine.UnitMeasID = item.UnitMeasID;
                rgLine.QtyRcvd = (Double)item.QtyRcvd;
                
                rgLine.Save();

                ////create a distribution record for each line item
                //Sage.Entity.Interfaces.IStgPORcptDist rgDist =
                //       Sage.Platform.EntityFactory.Create(typeof(Sage.Entity.Interfaces.IStgPORcptDist),
                //       Sage.Platform.EntityCreationOption.DoNotExecuteBusinessRules) as Sage.Entity.Interfaces.IStgPORcptDist;

                //rgDist.Stgporcptlineid = rgLine.Id.ToString();
                //rgDist.ReceiptOfGoodsID = receiptofgoods.Id.ToString();
                //rgDist.ReceiptOfGoodsItemID = item.Id.ToString();

                //rgDist.RowDistKey = 0; //set this to unique int number (global) during integration - same as header value
                //rgDist.RowLineKey = 0; //set this to the reciever rowkey during integration

                //rgDist.DistQty = (Double)item.QtyRcvd;
                //rgDist.BinID = null;
                //rgDist.LotNo = null;
                //rgDist.LotExpirationDate = null;
                //rgDist.SerialNo = null;
                //rgDist.ProcessStatus = 0;
                //rgDist.SessionKey = 0;

                //rgDist.Save();              

            }
        }


    }
}