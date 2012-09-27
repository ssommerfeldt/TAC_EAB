USE [LiveEAB_MAS]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWareHouse_TAC]    Script Date: 09/24/2012 22:19:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

Create view [dbo].[vdvMAS_to_SLX_timWareHouse_TAC]
as 
SELECT     SLX_TIMWAREHOUSE.TIMWAREHOUSEID, timWarehouse.WhseKey, timWarehouse.AllowImmedPickFromSO, 
                      timWarehouse.AllowImmedShipFromPick, timWarehouse.AllowTrnsfrBackOrd, timWarehouse.CompanyID, timWarehouse.CostOfCarry, 
                      timWarehouse.COSAcctKey, timWarehouse.CostTierAdjAcctKey, timWarehouse.CostToReplenish, timWarehouse.CostWhseKey, 
                      timWarehouse.Description, timWarehouse.DfltLotPickMethod, timWarehouse.DfltPickMeth, timWarehouse.DfltPickOfOutOfStockItems, 
                      timWarehouse.ImmedInvcPrinterDest, timWarehouse.ImmedInvcRptSettingKey, timWarehouse.ImmedPickPrinterDest, 
                      timWarehouse.ImmedPickRptSettingKey, timWarehouse.InvtAcctKey, timWarehouse.IssueAcctKey, timWarehouse.LastRankDate, 
                      timWarehouse.LastRankInvtPerKey, timWarehouse.LastRplnsmntUpdate, timWarehouse.MailAddrKey, timWarehouse.MaxDemandMult, 
                      timWarehouse.MaxOrderCycle, timWarehouse.MaxQualLeadTime, timWarehouse.MaxQualLeadTimePct, timWarehouse.MaxSeasDemandMult, 
                      timWarehouse.MinDemandMult, timWarehouse.MinOrderCycle, timWarehouse.MinQualLeadTimePct, timWarehouse.MiscAdjAcctKey, 
                      timWarehouse.PhysCountAcctKey, timWarehouse.PriceWhseKey, timWarehouse.PurchAcctKey, timWarehouse.ReordMeth, 
                      timWarehouse.RestockMeth, timWarehouse.RestockRate, timWarehouse.SalesAcctKey, timWarehouse.SalesOffsetAcctKey, 
                      timWarehouse.SalesReturnAcctKey, timWarehouse.ShipAddrKey, timWarehouse.ShipComplete, timWarehouse.SortPickTckt, 
                      timWarehouse.STaxSchdKey, timWarehouse.TrackQtyAtBin, timWarehouse.Transit, timWarehouse.TrendPct, timWarehouse.TrnsfrExpAcctKey, 
                      timWarehouse.TrnsfrFrtChrgOpt, timWarehouse.TrnsfrMrkupAcctKey, timWarehouse.TrnsfrSrchrgOpt, timWarehouse.UpdateCounter, 
                      timWarehouse.UseBins, timWarehouse.UseZones, timWarehouse.WhseID, timWarehouse.WhseMgrCntctKey, timWarehouse.WhseOvrdSegValue, 
                      timWarehouse.WillCallPickPrinterDest, timWarehouse.WillCallPickRptSettingKey
FROM         timWarehouse INNER JOIN
                      LiveEAB_SLX.sysdba.TIMWAREHOUSE AS SLX_TIMWAREHOUSE ON timWarehouse.WhseKey = SLX_TIMWAREHOUSE.WhseKey
WHERE     (SLX_TIMWAREHOUSE.TIMWAREHOUSEID IS NULL)
GO


