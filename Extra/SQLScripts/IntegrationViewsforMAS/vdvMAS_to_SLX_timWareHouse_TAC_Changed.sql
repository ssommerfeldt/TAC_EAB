USE [LiveEAB_MAS]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWareHouse_TAC_Changed]    Script Date: 09/24/2012 22:20:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

Create View [dbo].[vdvMAS_to_SLX_timWareHouse_TAC_Changed]
as
SELECT     tmpMAS.*
FROM         (SELECT     ISNULL(CONVERT(Varchar(255), WhseKey), '') + ISNULL(CONVERT(Varchar(255), AllowImmedPickFromSO), '') 
                                              + ISNULL(CONVERT(Varchar(255), AllowImmedShipFromPick), '') + ISNULL(CONVERT(Varchar(255), AllowTrnsfrBackOrd), '') 
                                              + ISNULL(CONVERT(Varchar(255), CompanyID), '') + ISNULL(CONVERT(Varchar(255), CostOfCarry), '') + ISNULL(CONVERT(Varchar(255), 
                                              COSAcctKey), '') + ISNULL(CONVERT(Varchar(255), CostTierAdjAcctKey), '') + ISNULL(CONVERT(Varchar(255), CostToReplenish), '') 
                                              + ISNULL(CONVERT(Varchar(255), CostWhseKey), '') + ISNULL(CONVERT(Varchar(255), Description), '') + ISNULL(CONVERT(Varchar(255), 
                                              DfltLotPickMethod), '') + ISNULL(CONVERT(Varchar(255), DfltPickMeth), '') + ISNULL(CONVERT(Varchar(255), DfltPickOfOutOfStockItems), '') 
                                              + ISNULL(CONVERT(Varchar(255), ImmedInvcPrinterDest), '') + ISNULL(CONVERT(Varchar(255), ImmedInvcRptSettingKey), '') 
                                              + ISNULL(CONVERT(Varchar(255), ImmedPickPrinterDest), '') + ISNULL(CONVERT(Varchar(255), ImmedPickRptSettingKey), '') 
                                              + ISNULL(CONVERT(Varchar(255), InvtAcctKey), '') + ISNULL(CONVERT(Varchar(255), IssueAcctKey), '') + ISNULL(CONVERT(Varchar(255), 
                                              LastRankDate), '') + ISNULL(CONVERT(Varchar(255), LastRankInvtPerKey), '') + ISNULL(CONVERT(Varchar(255), LastRplnsmntUpdate), '') 
                                              + ISNULL(CONVERT(Varchar(255), MailAddrKey), '') + ISNULL(CONVERT(Varchar(255), MaxDemandMult), '') + ISNULL(CONVERT(Varchar(255),
                                               MaxOrderCycle), '') + ISNULL(CONVERT(Varchar(255), MaxQualLeadTime), '') + ISNULL(CONVERT(Varchar(255), MaxQualLeadTimePct), '') 
                                              + ISNULL(CONVERT(Varchar(255), MaxSeasDemandMult), '') + ISNULL(CONVERT(Varchar(255), MinDemandMult), '') 
                                              + ISNULL(CONVERT(Varchar(255), MinOrderCycle), '') + ISNULL(CONVERT(Varchar(255), MinQualLeadTimePct), '') 
                                              + ISNULL(CONVERT(Varchar(255), MiscAdjAcctKey), '') + ISNULL(CONVERT(Varchar(255), PhysCountAcctKey), '') 
                                              + ISNULL(CONVERT(Varchar(255), PriceWhseKey), '') + ISNULL(CONVERT(Varchar(255), PurchAcctKey), '') + ISNULL(CONVERT(Varchar(255), 
                                              ReordMeth), '') + ISNULL(CONVERT(Varchar(255), RestockMeth), '') + ISNULL(CONVERT(Varchar(255), RestockRate), '') 
                                              + ISNULL(CONVERT(Varchar(255), SalesAcctKey), '') + ISNULL(CONVERT(Varchar(255), SalesOffsetAcctKey), '') 
                                              + ISNULL(CONVERT(Varchar(255), SalesReturnAcctKey), '') + ISNULL(CONVERT(Varchar(255), ShipAddrKey), '') 
                                              + ISNULL(CONVERT(Varchar(255), ShipComplete), '') + ISNULL(CONVERT(Varchar(255), SortPickTckt), '') + ISNULL(CONVERT(Varchar(255), 
                                              STaxSchdKey), '') + ISNULL(CONVERT(Varchar(255), TrackQtyAtBin), '') + ISNULL(CONVERT(Varchar(255), Transit), '') 
                                              + ISNULL(CONVERT(Varchar(255), TrendPct), '') + ISNULL(CONVERT(Varchar(255), TrnsfrExpAcctKey), '') + ISNULL(CONVERT(Varchar(255), 
                                              TrnsfrFrtChrgOpt), '') + ISNULL(CONVERT(Varchar(255), TrnsfrMrkupAcctKey), '') + ISNULL(CONVERT(Varchar(255), TrnsfrSrchrgOpt), '') 
                                              + ISNULL(CONVERT(Varchar(255), UpdateCounter), '') + ISNULL(CONVERT(Varchar(255), UseBins), '') + ISNULL(CONVERT(Varchar(255), 
                                              UseZones), '') + ISNULL(CONVERT(Varchar(255), WhseID), '') + ISNULL(CONVERT(Varchar(255), WhseMgrCntctKey), '') 
                                              + ISNULL(CONVERT(Varchar(255), WhseOvrdSegValue), '') + ISNULL(CONVERT(Varchar(255), WillCallPickPrinterDest), '') 
                                              + ISNULL(CONVERT(Varchar(255), WillCallPickRptSettingKey), '') AS MyID, WhseKey, AllowImmedPickFromSO, AllowImmedShipFromPick, 
                                              AllowTrnsfrBackOrd, CompanyID, CostOfCarry, COSAcctKey, CostTierAdjAcctKey, CostToReplenish, CostWhseKey, Description, 
                                              DfltLotPickMethod, DfltPickMeth, DfltPickOfOutOfStockItems, ImmedInvcPrinterDest, ImmedInvcRptSettingKey, ImmedPickPrinterDest, 
                                              ImmedPickRptSettingKey, InvtAcctKey, IssueAcctKey, LastRankDate, LastRankInvtPerKey, LastRplnsmntUpdate, MailAddrKey, 
                                              MaxDemandMult, MaxOrderCycle, MaxQualLeadTime, MaxQualLeadTimePct, MaxSeasDemandMult, MinDemandMult, MinOrderCycle, 
                                              MinQualLeadTimePct, MiscAdjAcctKey, PhysCountAcctKey, PriceWhseKey, PurchAcctKey, ReordMeth, RestockMeth, RestockRate, 
                                              SalesAcctKey, SalesOffsetAcctKey, SalesReturnAcctKey, ShipAddrKey, ShipComplete, SortPickTckt, STaxSchdKey, TrackQtyAtBin, Transit, 
                                              TrendPct, TrnsfrExpAcctKey, TrnsfrFrtChrgOpt, TrnsfrMrkupAcctKey, TrnsfrSrchrgOpt, UpdateCounter, UseBins, UseZones, WhseID, 
                                              WhseMgrCntctKey, WhseOvrdSegValue, WillCallPickPrinterDest, WillCallPickRptSettingKey, TIMWAREHOUSEID
                       FROM          vdvMAS_to_SLX_timWareHouse_TAC) AS tmpMAS INNER JOIN
                          (SELECT     ISNULL(CONVERT(Varchar(255), WhseKey), '') + ISNULL(CONVERT(Varchar(255), AllowImmedPickFromSO), '') 
                                                   + ISNULL(CONVERT(Varchar(255), AllowImmedShipFromPick), '') + ISNULL(CONVERT(Varchar(255), AllowTrnsfrBackOrd), '') 
                                                   + ISNULL(CONVERT(Varchar(255), CompanyID), '') + ISNULL(CONVERT(Varchar(255), CostOfCarry), '') + ISNULL(CONVERT(Varchar(255), 
                                                   COSAcctKey), '') + ISNULL(CONVERT(Varchar(255), CostTierAdjAcctKey), '') + ISNULL(CONVERT(Varchar(255), CostToReplenish), '') 
                                                   + ISNULL(CONVERT(Varchar(255), CostWhseKey), '') + ISNULL(CONVERT(Varchar(255), Description), '') + ISNULL(CONVERT(Varchar(255), 
                                                   DfltLotPickMethod), '') + ISNULL(CONVERT(Varchar(255), DfltPickMeth), '') + ISNULL(CONVERT(Varchar(255), DfltPickOfOutOfStockItems), '') 
                                                   + ISNULL(CONVERT(Varchar(255), ImmedInvcPrinterDest), '') + ISNULL(CONVERT(Varchar(255), ImmedInvcRptSettingKey), '') 
                                                   + ISNULL(CONVERT(Varchar(255), ImmedPickPrinterDest), '') + ISNULL(CONVERT(Varchar(255), ImmedPickRptSettingKey), '') 
                                                   + ISNULL(CONVERT(Varchar(255), InvtAcctKey), '') + ISNULL(CONVERT(Varchar(255), IssueAcctKey), '') + ISNULL(CONVERT(Varchar(255), 
                                                   LastRankDate), '') + ISNULL(CONVERT(Varchar(255), LastRankInvtPerKey), '') + ISNULL(CONVERT(Varchar(255), LastRplnsmntUpdate), '') 
                                                   + ISNULL(CONVERT(Varchar(255), MailAddrKey), '') + ISNULL(CONVERT(Varchar(255), MaxDemandMult), '') 
                                                   + ISNULL(CONVERT(Varchar(255), MaxOrderCycle), '') + ISNULL(CONVERT(Varchar(255), MaxQualLeadTime), '') 
                                                   + ISNULL(CONVERT(Varchar(255), MaxQualLeadTimePct), '') + ISNULL(CONVERT(Varchar(255), MaxSeasDemandMult), '') 
                                                   + ISNULL(CONVERT(Varchar(255), MinDemandMult), '') + ISNULL(CONVERT(Varchar(255), MinOrderCycle), '') 
                                                   + ISNULL(CONVERT(Varchar(255), MinQualLeadTimePct), '') + ISNULL(CONVERT(Varchar(255), MiscAdjAcctKey), '') 
                                                   + ISNULL(CONVERT(Varchar(255), PhysCountAcctKey), '') + ISNULL(CONVERT(Varchar(255), PriceWhseKey), '') 
                                                   + ISNULL(CONVERT(Varchar(255), PurchAcctKey), '') + ISNULL(CONVERT(Varchar(255), ReordMeth), '') + ISNULL(CONVERT(Varchar(255), 
                                                   RestockMeth), '') + ISNULL(CONVERT(Varchar(255), RestockRate), '') + ISNULL(CONVERT(Varchar(255), SalesAcctKey), '') 
                                                   + ISNULL(CONVERT(Varchar(255), SalesOffsetAcctKey), '') + ISNULL(CONVERT(Varchar(255), SalesReturnAcctKey), '') 
                                                   + ISNULL(CONVERT(Varchar(255), ShipAddrKey), '') + ISNULL(CONVERT(Varchar(255), ShipComplete), '') + ISNULL(CONVERT(Varchar(255), 
                                                   SortPickTckt), '') + ISNULL(CONVERT(Varchar(255), STaxSchdKey), '') + ISNULL(CONVERT(Varchar(255), TrackQtyAtBin), '') 
                                                   + ISNULL(CONVERT(Varchar(255), Transit), '') + ISNULL(CONVERT(Varchar(255), TrendPct), '') + ISNULL(CONVERT(Varchar(255), 
                                                   TrnsfrExpAcctKey), '') + ISNULL(CONVERT(Varchar(255), TrnsfrFrtChrgOpt), '') + ISNULL(CONVERT(Varchar(255), TrnsfrMrkupAcctKey), '') 
                                                   + ISNULL(CONVERT(Varchar(255), TrnsfrSrchrgOpt), '') + ISNULL(CONVERT(Varchar(255), UpdateCounter), '') 
                                                   + ISNULL(CONVERT(Varchar(255), UseBins), '') + ISNULL(CONVERT(Varchar(255), UseZones), '') + ISNULL(CONVERT(Varchar(255), 
                                                   WhseID), '') + ISNULL(CONVERT(Varchar(255), WhseMgrCntctKey), '') + ISNULL(CONVERT(Varchar(255), WhseOvrdSegValue), '') 
                                                   + ISNULL(CONVERT(Varchar(255), WillCallPickPrinterDest), '') + ISNULL(CONVERT(Varchar(255), WillCallPickRptSettingKey), '') AS MyID, 
                                                   TIMWAREHOUSEID, MODIFYUSER, MODIFYDATE, CREATEUSER, CREATEDATE, WhseKey, AllowImmedPickFromSO, 
                                                   AllowImmedShipFromPick, AllowTrnsfrBackOrd, CompanyID, CostOfCarry, COSAcctKey, CostTierAdjAcctKey, CostToReplenish, 
                                                   CostWhseKey, Description, DfltLotPickMethod, DfltPickMeth, DfltPickOfOutOfStockItems, ImmedInvcPrinterDest, ImmedInvcRptSettingKey, 
                                                   ImmedPickPrinterDest, ImmedPickRptSettingKey, InvtAcctKey, IssueAcctKey, LastRankDate, LastRankInvtPerKey, LastRplnsmntUpdate, 
                                                   MailAddrKey, MaxDemandMult, MaxOrderCycle, MaxQualLeadTime, MaxQualLeadTimePct, MaxSeasDemandMult, MinDemandMult, 
                                                   MinOrderCycle, MinQualLeadTimePct, MiscAdjAcctKey, PhysCountAcctKey, PriceWhseKey, PurchAcctKey, ReordMeth, RestockMeth, 
                                                   RestockRate, SalesAcctKey, SalesOffsetAcctKey, SalesReturnAcctKey, ShipAddrKey, ShipComplete, SortPickTckt, STaxSchdKey, 
                                                   TrackQtyAtBin, Transit, TrendPct, TrnsfrExpAcctKey, TrnsfrFrtChrgOpt, TrnsfrMrkupAcctKey, TrnsfrSrchrgOpt, UpdateCounter, UseBins, 
                                                   UseZones, WhseID, WhseMgrCntctKey, WhseOvrdSegValue, WillCallPickPrinterDest, WillCallPickRptSettingKey
                            FROM          LiveEAB_SLX.sysdba.TIMWAREHOUSE AS TIMWAREHOUSE_1) AS tmpSLX ON tmpMAS.MyID <> tmpSLX.MyID AND 
                      tmpMAS.TIMWAREHOUSEID = tmpSLX.TIMWAREHOUSEID

GO


