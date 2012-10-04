--===========================================================================
Create view dbo.vdvMAS_to_SLX_timWarehouse_TAC
as
SELECT     timWarehouse.*
FROM         timWarehouse LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.TIMWAREHOUSE AS SLX ON timWarehouse.WhseKey = SLX.WhseKey
WHERE     (SLX.TIMWAREHOUSEID IS NULL)
Go

--========================================================================================
Create view dbo.vdvMAS_to_SLX_timPricing_TAC
as
Select timPricing.* from timPricing  
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timPricing AS SLX ON timPricing.PricingKey  = SLX.PricingKey 
WHERE     (SLX.TIMPRICINGID  IS NULL)
GO


--========================================================================================
Create view dbo.vdvMAS_to_SLX_timPriceBreak_TAC
as
Select timPriceBreak.* from timPriceBreak   
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timPriceBreak AS SLX ON timPriceBreak.PricingKey   = SLX.PricingKey  
WHERE     (SLX.TIMPRICEBREAKID   IS NULL)
GO

--========================================================================================
Create view dbo.vdvMAS_to_SLX_timProdPriceGroup_TAC
as
Select timProdPriceGroup.* from timProdPriceGroup    
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timProdPriceGroup AS SLX ON timProdPriceGroup.ProdPriceGroupKey    = SLX.ProdPriceGroupKey   
WHERE     (SLX.TIMPRODPRICEGROUPID    IS NULL)
GO
--========================================================================================
Create view dbo.vdvMAS_to_SLX_timProdPriceGroupPrice_TAC
as
Select timProdPriceGroupPrice.* from timProdPriceGroupPrice     
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timProdPriceGroupPrice AS SLX ON timProdPriceGroupPrice.ProdPriceGroupPriceKey     = SLX.ProdPriceGroupPriceKey    
WHERE     (SLX.TIMPRODPRICEGROUPPRICEID     IS NULL)
Go
--========================================================================================
Create view dbo.vdvMAS_to_SLX_tarCustomer_TAC
as
Select TMPSOURCE.* FROM
(Select 
ISNULL(CONVERT(VarChar(255),CustKey),'') +
ISNULL(CONVERT(VarChar(255),ABANo),'') +
ISNULL(CONVERT(VarChar(255),AllowCustRefund),'') +
ISNULL(CONVERT(VarChar(255),AllowWriteOff),'') +
ISNULL(CONVERT(VarChar(255),BillingType),'') +
ISNULL(CONVERT(VarChar(255),BillToNationalAcctParent),'') +
ISNULL(CONVERT(VarChar(255),CompanyID),'') +
ISNULL(CONVERT(VarChar(255),ConsolidatedStatement),'') +
ISNULL(CONVERT(VarChar(255),CreateDate),'') +
ISNULL(CONVERT(VarChar(255),CreateType),'') +
ISNULL(CONVERT(VarChar(255),CreateUserID),'') +
ISNULL(CONVERT(VarChar(255),CreditLimit),'') +
ISNULL(CONVERT(VarChar(255),CreditLimitAgeCat),'') +
ISNULL(CONVERT(VarChar(255),CreditLimitUsed),'') +
ISNULL(CONVERT(VarChar(255),CRMCustID),'') +
ISNULL(CONVERT(VarChar(255),CurrExchSchdKey),'') +
ISNULL(CONVERT(VarChar(255),CustClassKey),'') +
ISNULL(CONVERT(VarChar(255),CustID),'') +
ISNULL(CONVERT(VarChar(255),CustName),'') +
ISNULL(CONVERT(VarChar(255),CustRefNo),'') +
ISNULL(CONVERT(VarChar(255),DateEstab),'') +
ISNULL(CONVERT(VarChar(255),DfltBillToAddrKey),'') +
ISNULL(CONVERT(VarChar(255),DfltItemKey),'') +
ISNULL(CONVERT(VarChar(255),DfltMaxUpCharge),'') +
ISNULL(CONVERT(VarChar(255),DfltMaxUpChargeType),'') +
ISNULL(CONVERT(VarChar(255),DfltSalesAcctKey),'') +
ISNULL(CONVERT(VarChar(255),DfltSalesReturnAcctKey),'') +
ISNULL(CONVERT(VarChar(255),DfltShipToAddrKey),'') +
ISNULL(CONVERT(VarChar(255),FinChgFlatAmt),'') +
ISNULL(CONVERT(VarChar(255),FinChgPct),'') +
ISNULL(CONVERT(VarChar(255),Hold),'') +
ISNULL(CONVERT(VarChar(255),ImportLogKey),'') +
ISNULL(CONVERT(VarChar(255),NationalAcctLevelKey),'') +
ISNULL(CONVERT(VarChar(255),PmtByNationalAcctParent),'') +
ISNULL(CONVERT(VarChar(255),PrimaryAddrKey),'') +
ISNULL(CONVERT(VarChar(255),PrimaryCntctKey),'') +
ISNULL(CONVERT(VarChar(255),PrintDunnMsg),'') +
ISNULL(CONVERT(VarChar(255),ReqCreditLimit),'') +
ISNULL(CONVERT(VarChar(255),ReqPO),'') +
ISNULL(CONVERT(VarChar(255),RetntPct),'') +
ISNULL(CONVERT(VarChar(255),SalesSourceKey),'') +
ISNULL(CONVERT(VarChar(255),ShipPriority),'') +
ISNULL(CONVERT(VarChar(255),Status),'') +
ISNULL(CONVERT(VarChar(255),StdIndusCodeID),'') +
ISNULL(CONVERT(VarChar(255),StmtCycleKey),'') +
ISNULL(CONVERT(VarChar(255),StmtFormKey),'') +
ISNULL(CONVERT(VarChar(255),TradeDiscPct),'') +
ISNULL(CONVERT(VarChar(255),UpdateCounter),'') +
ISNULL(CONVERT(VarChar(255),UpdateDate),'') +
ISNULL(CONVERT(VarChar(255),UpdateUserID),'') +
ISNULL(CONVERT(VarChar(255),UserFld1),'') +
ISNULL(CONVERT(VarChar(255),UserFld2),'') +
ISNULL(CONVERT(VarChar(255),UserFld3),'') +
ISNULL(CONVERT(VarChar(255),UserFld4),'') +
ISNULL(CONVERT(VarChar(255),VendKey),'') AS MYID,
tarCustomer.* from  dbo.vdvMAS_to_SLX_tarCustomer_TAC) AS TMPSOURCE 
INNER JOIN
(Select ISNULL(CONVERT(VarChar(255),CustKey),'') +
ISNULL(CONVERT(VarChar(255),ABANo),'') +
ISNULL(CONVERT(VarChar(255),AllowCustRefund),'') +
ISNULL(CONVERT(VarChar(255),AllowWriteOff),'') +
ISNULL(CONVERT(VarChar(255),BillingType),'') +
ISNULL(CONVERT(VarChar(255),BillToNationalAcctParent),'') +
ISNULL(CONVERT(VarChar(255),CompanyID),'') +
ISNULL(CONVERT(VarChar(255),ConsolidatedStatement),'') +
ISNULL(CONVERT(VarChar(255),CreateDate),'') +
ISNULL(CONVERT(VarChar(255),CreateType),'') +
ISNULL(CONVERT(VarChar(255),CreateUserID),'') +
ISNULL(CONVERT(VarChar(255),CreditLimit),'') +
ISNULL(CONVERT(VarChar(255),CreditLimitAgeCat),'') +
ISNULL(CONVERT(VarChar(255),CreditLimitUsed),'') +
ISNULL(CONVERT(VarChar(255),CRMCustID),'') +
ISNULL(CONVERT(VarChar(255),CurrExchSchdKey),'') +
ISNULL(CONVERT(VarChar(255),CustClassKey),'') +
ISNULL(CONVERT(VarChar(255),CustID),'') +
ISNULL(CONVERT(VarChar(255),CustName),'') +
ISNULL(CONVERT(VarChar(255),CustRefNo),'') +
ISNULL(CONVERT(VarChar(255),DateEstab),'') +
ISNULL(CONVERT(VarChar(255),DfltBillToAddrKey),'') +
ISNULL(CONVERT(VarChar(255),DfltItemKey),'') +
ISNULL(CONVERT(VarChar(255),DfltMaxUpCharge),'') +
ISNULL(CONVERT(VarChar(255),DfltMaxUpChargeType),'') +
ISNULL(CONVERT(VarChar(255),DfltSalesAcctKey),'') +
ISNULL(CONVERT(VarChar(255),DfltSalesReturnAcctKey),'') +
ISNULL(CONVERT(VarChar(255),DfltShipToAddrKey),'') +
ISNULL(CONVERT(VarChar(255),FinChgFlatAmt),'') +
ISNULL(CONVERT(VarChar(255),FinChgPct),'') +
ISNULL(CONVERT(VarChar(255),Hold),'') +
ISNULL(CONVERT(VarChar(255),ImportLogKey),'') +
ISNULL(CONVERT(VarChar(255),NationalAcctLevelKey),'') +
ISNULL(CONVERT(VarChar(255),PmtByNationalAcctParent),'') +
ISNULL(CONVERT(VarChar(255),PrimaryAddrKey),'') +
ISNULL(CONVERT(VarChar(255),PrimaryCntctKey),'') +
ISNULL(CONVERT(VarChar(255),PrintDunnMsg),'') +
ISNULL(CONVERT(VarChar(255),ReqCreditLimit),'') +
ISNULL(CONVERT(VarChar(255),ReqPO),'') +
ISNULL(CONVERT(VarChar(255),RetntPct),'') +
ISNULL(CONVERT(VarChar(255),SalesSourceKey),'') +
ISNULL(CONVERT(VarChar(255),ShipPriority),'') +
ISNULL(CONVERT(VarChar(255),Status),'') +
ISNULL(CONVERT(VarChar(255),StdIndusCodeID),'') +
ISNULL(CONVERT(VarChar(255),StmtCycleKey),'') +
ISNULL(CONVERT(VarChar(255),StmtFormKey),'') +
ISNULL(CONVERT(VarChar(255),TradeDiscPct),'') +
ISNULL(CONVERT(VarChar(255),UpdateCounter),'') +
ISNULL(CONVERT(VarChar(255),UpdateDate),'') +
ISNULL(CONVERT(VarChar(255),UpdateUserID),'') +
ISNULL(CONVERT(VarChar(255),UserFld1),'') +
ISNULL(CONVERT(VarChar(255),UserFld2),'') +
ISNULL(CONVERT(VarChar(255),UserFld3),'') +
ISNULL(CONVERT(VarChar(255),UserFld4),'') +
ISNULL(CONVERT(VarChar(255),VendKey),'')  As MYId,
SLX.* From LiveEAB_SLX.sysdba.tarCustomer AS SLX ) as SLXDESTINATION
ON tarCustomer.CustKey     = SLX.CustKey     
WHERE     (SLX.TARCUSTOMERID      IS NULL)
GO
--========================================================================================
Create view dbo.vdvMAS_to_SLX_tarNationalAcctLevel_TAC
as
Select tarNationalAcctLevel.* from tarNationalAcctLevel       
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.tarNationalAcctLevel AS SLX ON tarNationalAcctLevel.NationalAcctLevelKey      = SLX.NationalAcctLevelKey      
WHERE     (SLX.TARNATIONALACCTLEVELID       IS NULL)
Go

--========================================================================================
Create view dbo.vdvMAS_to_SLX_tarNationalAcct_TAC
as
Select tarNationalAcct.* from tarNationalAcct        
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.tarNationalAcct AS SLX ON tarNationalAcct.NationalAcctKey      = SLX.NationalAcctKey       
WHERE     (SLX.TARNATIONALACCTID        IS NULL)
Go
--========================================================================================
Create view dbo.vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC
as
Select timNatAcctProdGrpPrc.* from timNatAcctProdGrpPrc         
LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timNatAcctProdGrpPrc AS SLX ON timNatAcctProdGrpPrc.CustProdGrpPrcKey       = SLX.CustProdGrpPrcKey        
WHERE     (SLX.TIMNATACCTPRODGRPPRCID         IS NULL)
Go

