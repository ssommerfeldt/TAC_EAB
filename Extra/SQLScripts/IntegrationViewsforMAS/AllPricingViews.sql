--===========================================================================
Create view dbo.vdvMAS_to_SLX_timWarehouse_TAC
as
SELECT     timWarehouse.WhseKey, timWarehouse.AllowImmedPickFromSO, timWarehouse.AllowImmedShipFromPick, timWarehouse.AllowTrnsfrBackOrd, 
                      timWarehouse.CompanyID, timWarehouse.CostOfCarry, timWarehouse.COSAcctKey, timWarehouse.CostTierAdjAcctKey, 
                      timWarehouse.CostToReplenish, timWarehouse.CostWhseKey, timWarehouse.Description, timWarehouse.DfltLotPickMethod, 
                      timWarehouse.DfltPickMeth, timWarehouse.DfltPickOfOutOfStockItems, timWarehouse.ImmedInvcPrinterDest, 
                      timWarehouse.ImmedInvcRptSettingKey, timWarehouse.ImmedPickPrinterDest, timWarehouse.ImmedPickRptSettingKey, timWarehouse.InvtAcctKey, 
                      timWarehouse.IssueAcctKey, timWarehouse.LastRankDate, timWarehouse.LastRankInvtPerKey, timWarehouse.LastRplnsmntUpdate, 
                      timWarehouse.MailAddrKey, timWarehouse.MaxDemandMult, timWarehouse.MaxOrderCycle, timWarehouse.MaxQualLeadTime, 
                      timWarehouse.MaxQualLeadTimePct, timWarehouse.MaxSeasDemandMult, timWarehouse.MinDemandMult, timWarehouse.MinOrderCycle, 
                      timWarehouse.MinQualLeadTimePct, timWarehouse.MiscAdjAcctKey, timWarehouse.PhysCountAcctKey, timWarehouse.PriceWhseKey, 
                      timWarehouse.PurchAcctKey, timWarehouse.ReordMeth, timWarehouse.RestockMeth, timWarehouse.RestockRate, timWarehouse.SalesAcctKey, 
                      timWarehouse.SalesOffsetAcctKey, timWarehouse.SalesReturnAcctKey, timWarehouse.ShipAddrKey, timWarehouse.ShipComplete, 
                      timWarehouse.SortPickTckt, timWarehouse.STaxSchdKey, timWarehouse.TrackQtyAtBin, timWarehouse.Transit, timWarehouse.TrendPct, 
                      timWarehouse.TrnsfrExpAcctKey, timWarehouse.TrnsfrFrtChrgOpt, timWarehouse.TrnsfrMrkupAcctKey, timWarehouse.TrnsfrSrchrgOpt, 
                      timWarehouse.UpdateCounter, timWarehouse.UseBins, timWarehouse.UseZones, timWarehouse.WhseID, timWarehouse.WhseMgrCntctKey, 
                      timWarehouse.WhseOvrdSegValue, timWarehouse.WillCallPickPrinterDest, timWarehouse.WillCallPickRptSettingKey
FROM         timWarehouse LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.TIMWAREHOUSE AS SLX ON timWarehouse.WhseKey = SLX.WhseKey
WHERE     (SLX.TIMWAREHOUSEID IS NULL)

--========================================================================================
Create view dbo.vdvMAS_to_SLX_timPricing_TAC
as
Select timPricing.* from timPricing  
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timPricing AS SLX ON timPricing.PricingKey  = SLX.PricingKey 
WHERE     (SLX.TIMPRICINGID  IS NULL)


--========================================================================================
Create view dbo.vdvMAS_to_SLX_timPriceBreak_TAC
as
Select timPriceBreak.* from timPriceBreak   
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timPriceBreak AS SLX ON timPriceBreak.PricingKey   = SLX.PricingKey  
WHERE     (SLX.TIMPRICEBREAKID   IS NULL)


--========================================================================================
Create view dbo.vdvMAS_to_SLX_timProdPriceGroup_TAC
as
Select timProdPriceGroup.* from timProdPriceGroup    
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timProdPriceGroup AS SLX ON timProdPriceGroup.ProdPriceGroupKey    = SLX.ProdPriceGroupKey   
WHERE     (SLX.TIMPRODPRICEGROUPID    IS NULL)

--========================================================================================
Create view dbo.vdvMAS_to_SLX_timProdPriceGroupPrice_TAC
as
Select timProdPriceGroupPrice.* from timProdPriceGroupPrice     
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timProdPriceGroupPrice AS SLX ON timProdPriceGroupPrice.ProdPriceGroupPriceKey     = SLX.ProdPriceGroupPriceKey    
WHERE     (SLX.TIMPRODPRICEGROUPPRICEID     IS NULL)

--========================================================================================
Create view dbo.vdvMAS_to_SLX_tarCustomer_TAC
as
Select tarCustomer.* from tarCustomer      
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.tarCustomer AS SLX ON tarCustomer.CustKey     = SLX.CustKey     
WHERE     (SLX.TARCUSTOMERID      IS NULL)

--========================================================================================
Create view dbo.vdvMAS_to_SLX_tarNationalAcctLevel_TAC
as
Select tarNationalAcctLevel.* from tarNationalAcctLevel       
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.tarNationalAcctLevel AS SLX ON tarNationalAcctLevel.NationalAcctLevelKey      = SLX.NationalAcctLevelKey      
WHERE     (SLX.TARNATIONALACCTLEVELID       IS NULL)


--========================================================================================
Create view dbo.vdvMAS_to_SLX_tarNationalAcct_TAC
as
Select tarNationalAcct.* from tarNationalAcct        
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.tarNationalAcct AS SLX ON tarNationalAcct.NationalAcctKey      = SLX.NationalAcctKey       
WHERE     (SLX.TARNATIONALACCTID        IS NULL)

--========================================================================================
Create view dbo.vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC
as
Select timNatAcctProdGrpPrc.* from timNatAcctProdGrpPrc         
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timNatAcctProdGrpPrc AS SLX ON timNatAcctProdGrpPrc.CustProdGrpPrcKey       = SLX.CustProdGrpPrcKey        
WHERE     (SLX.TIMNATACCTPRODGRPPRCID         IS NULL)

