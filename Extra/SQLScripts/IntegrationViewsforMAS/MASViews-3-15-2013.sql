-------------------------------------------------------------
-- TAC Create this View First
--============================================================
/****** Object:  View [dbo].[vdvMAS_TO_SLX_ERPLinkCustomer_TAC]    Script Date: 03/15/2013 10:32:11 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_TO_SLX_ERPLinkCustomer_TAC]'))
DROP VIEW [dbo].[vdvMAS_TO_SLX_ERPLinkCustomer_TAC]
GO

USE [LiveEAB_MAS]
GO

/****** Object:  View [dbo].[vdvMAS_TO_SLX_ERPLinkCustomer_TAC]    Script Date: 03/15/2013 10:32:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_TO_SLX_ERPLinkCustomer_TAC]
AS
SELECT     dbo.tarCustomer.ABANo, CAST(dbo.tarCustomer.AllowCustRefund AS bit) AS AllowCustRefund, CAST(dbo.tarCustAddr.AllowInvtSubst AS bit) 
                      AS AllowInvtSubst, CAST(dbo.tarCustomer.AllowWriteOff AS bit) AS AllowWriteOff, 
                      dbo.tarCustStatus.AgeCat1Amt + dbo.tarCustStatus.AgeCat2Amt + dbo.tarCustStatus.AgeCat3Amt + dbo.tarCustStatus.AgeCat4Amt + dbo.tarCustStatus.AgeCurntAmt
                       + dbo.tarCustStatus.AgeFutureAmt AS Balance, tciAddress_1.City AS BillAddrCity, tciAddress_1.CountryID AS BillAddrCountry, 
                      tciAddress_1.Fax AS BillAddrFax, tciAddress_1.FaxExt AS BillAddrFaxExt, tciAddress_1.AddrLine1 AS BillAddrLine1, 
                      tciAddress_1.AddrLine2 AS BillAddrLine2, tciAddress_1.AddrLine3 AS BillAddrLine3, tciAddress_1.AddrLine4 AS BillAddrLine4, 
                      tciAddress_1.AddrLine5 AS BillAddrLine5, tciAddress_1.AddrName AS BillAddrName, tciAddress_1.Phone AS BillAddrPhone, 
                      tciAddress_1.PhoneExt AS BillAddrPhoneExt, tciAddress_1.PostalCode AS BillAddrPostalCode, tciAddress_1.StateID AS BillAddrState, 
                      dbo.tarCustomer.BillingType, vListValidationString_4.LocalText AS BillingTypeAsText, CAST(dbo.tarCustomer.BillToNationalAcctParent AS bit) 
                      AS BillToNationalAcctParent, dbo.tarCustomer.CompanyID, CAST(dbo.tarCustomer.ConsolidatedStatement AS Bit) AS ConsolidatedStatement, 
                      dbo.tciContact.CntctKey AS MASContactId, dbo.tciContact.Fax AS ContactFax, dbo.tciContact.FaxExt AS ContactFaxExt, 
                      dbo.tciContact.Name AS ContactName, dbo.tciContact.Phone AS ContactPhone, dbo.tciContact.PhoneExt AS ContactPhoneExt, 
                      dbo.tciContact.Title AS ContactTitle, dbo.tciContact.EMailAddr AS ContactEMailAddr, dbo.tarCustomer.CreateDate, dbo.tarCustomer.CreateType, 
                      vListValidationString_6.LocalText AS CreateTypeAsText, dbo.tarCustomer.CreateUserID, dbo.tarCustomer.CreditLimit, 
                      dbo.tarCustomer.CreditLimitAgeCat, vListValidationString_1.LocalText AS CreditLimitAgeCatAsText, CAST(dbo.tarCustomer.CreditLimitUsed AS bit) 
                      AS CreditLimitUsed, dbo.tmcCurrExchSchd.CurrExchSchdID, dbo.tarCustAddr.CurrID AS PrimaryAddrCurrID, dbo.tarCustClass.CustClassID, 
                      dbo.tarCustClass.CustClassName, dbo.tarCustomer.CRMCustID, dbo.tarCustomer.CustID, dbo.tarCustomer.CustName, dbo.tarCustomer.CustRefNo, 
                      dbo.tarCustomer.DateEstab, dbo.timItem.ItemID AS DfltItem, dbo.tarCustomer.FinChgFlatAmt, dbo.tarCustomer.FinChgPct, 
                      CAST(dbo.tarCustomer.Hold AS bit) AS Hold, dbo.tarNationalAcct.Description AS NationalAcctDesc, dbo.tarNationalAcct.NationalAcctID, 
                      CAST(dbo.tarCustomer.PmtByNationalAcctParent AS bit) AS PmtByNationalAcctParent, tciAddress_3.City AS PrimaryAddrCity, 
                      tciAddress_3.CountryID AS PrimaryAddrCountry, tciAddress_3.Fax AS PrimaryAddrFax, tciAddress_3.FaxExt AS PrimaryAddrFaxExt, 
                      tciAddress_3.AddrLine1 AS PrimaryAddrLine1, tciAddress_3.AddrLine2 AS PrimaryAddrLine2, tciAddress_3.AddrLine3 AS PrimaryAddrLine3, 
                      tciAddress_3.AddrLine4 AS PrimaryAddrLine4, tciAddress_3.AddrLine5 AS PrimaryAddrLine5, tciAddress_3.AddrName AS PrimaryAddrName, 
                      tciAddress_3.Phone AS PrimaryAddrPhone, tciAddress_3.PhoneExt AS PrimaryAddrPhoneExt, tciAddress_3.PostalCode AS PrimaryAddrPostalCode, 
                      tciAddress_3.StateID AS PrimaryAddrState, CAST(dbo.tarCustomer.PrintDunnMsg AS bit) AS PrintDunnMsg, CAST(dbo.tarCustAddr.PrintOrderAck AS bit) 
                      AS PrintOrderAck, dbo.tarCustomer.ReqCreditLimit, CAST(dbo.tarCustomer.ReqPO AS bit) AS ReqPO, CAST(dbo.tarCustAddr.RequireSOAck AS bit) 
                      AS RequireSOAck, dbo.tarCustomer.RetntPct, dbo.tsoSalesSource.SalesSourceID, dbo.tsoSalesSource.Description AS SalesSourceDesc, 
                      tciAddress_2.City AS ShipAddrCity, tciAddress_2.CountryID AS ShipAddrCountry, tciAddress_2.Fax AS ShipAddrFax, 
                      tciAddress_2.FaxExt AS ShipAddrFaxExt, tciAddress_2.AddrLine1 AS ShipAddrLine1, tciAddress_2.AddrLine2 AS ShipAddrLine2, 
                      tciAddress_2.AddrLine3 AS ShipAddrLine3, tciAddress_2.AddrLine4 AS ShipAddrLine4, tciAddress_2.AddrLine5 AS ShipAddrLine5, 
                      tciAddress_2.AddrName AS ShipAddrName, tciAddress_2.Phone AS ShipAddrPhone, tciAddress_2.PhoneExt AS ShipAddrPhoneExt, 
                      tciAddress_2.PostalCode AS ShipAddrPostalCode, tciAddress_2.StateID AS ShipAddrState, dbo.tarCustomer.ShipPriority, 
                      dbo.tciProcCycle.ProcCycleID AS StatementCycle, tciBusinessForm_2.BusinessFormID AS StatementForm, 
                      tciBusinessForm_2.Description AS StatementFormDesc, dbo.tarCustomer.Status, dbo.tarCustomer.StdIndusCodeID, dbo.tarCustomer.TradeDiscPct, 
                      dbo.tarCustomer.UpdateDate, dbo.tarCustomer.UpdateUserID, dbo.tarCustomer.UserFld1, dbo.tarCustomer.UserFld2, dbo.tarCustomer.UserFld3, 
                      dbo.tarCustomer.UserFld4, dbo.tapVendor.VendID, dbo.tapVendor.VendName, dbo.tarCustomer.CustKey, 
                      dbo.vListValidationString.LocalText AS StatusAsText, dbo.timCustPriceGroup.CustPriceGroupID AS PrimaryAddrCustPriceGroupID, 
                      dbo.timCustPriceGroup.Description AS PrimaryAddrCustPriceDesc, dbo.tciPaymentTerms.PmtTermsID AS BillingAddrPmtTermsID, 
                      dbo.tciPaymentTerms.Description AS BillingAddrPmtTermsDesc, dbo.tarSalesperson.SperName AS PrimaryAddrSperName, dbo.tarSalesperson.SperID,
                       dbo.tarCustClass.CustClassKey, dbo.timItem.ItemKey AS DfltItemKey, dbo.tarNationalAcctLevel.NationalAcctLevelKey, dbo.tapVendor.VendKey, 
                      dbo.tarCustStatus.AgeCat1Amt, dbo.tarCustStatus.AgeCat2Amt, dbo.tarCustStatus.AgeCat3Amt, dbo.tarCustStatus.AgeCat4Amt, 
                      dbo.tarCustStatus.AgeCurntAmt, dbo.tarCustStatus.AgeFutureAmt, dbo.tarCustStatus.AgingDate, dbo.tarSalesperson.SperKey, 
                      dbo.tarNationalAcctLevel.Description AS NationalAccountLevel, dbo.tarCustStatus.AvgDaysPastDue, dbo.tarCustStatus.AvgDaysToPay, 
                      dbo.tarCustStatus.AvgInvcAmt, dbo.tarCustStatus.FinChgBal, dbo.tarCustStatus.HighestBal, dbo.tarCustStatus.HighestBalDate, 
                      dbo.tarSalesTerritory.SalesTerritoryKey, dbo.tarSalesTerritory.SalesTerritoryID, dbo.timWarehouse.WhseKey, 
                      dbo.timWarehouse.Description AS ClosestWhseDesc, dbo.timWarehouse.WhseID AS ClosestWhseID, tciAddress_3.AddrKey AS PrimaryAddrKey, 
                      tciAddress_2.AddrKey AS ShippingAddrKey, tciAddress_1.AddrKey AS BillAddrKey, tarCustAddr_Primary.CustAddrID AS PrimaryAddrDescription
FROM         dbo.tarCustAddr AS tarCustAddr_Primary RIGHT OUTER JOIN
                      dbo.tciAddress AS tciAddress_3 ON tarCustAddr_Primary.AddrKey = tciAddress_3.AddrKey RIGHT OUTER JOIN
                      dbo.tarCustStatus RIGHT OUTER JOIN
                      dbo.tarCustAddr AS tarCustAddr_2 INNER JOIN
                      dbo.tarSalesTerritory ON tarCustAddr_2.SalesTerritoryKey = dbo.tarSalesTerritory.SalesTerritoryKey INNER JOIN
                      dbo.timWarehouse ON tarCustAddr_2.WhseKey = dbo.timWarehouse.WhseKey RIGHT OUTER JOIN
                      dbo.vListValidationString AS vListValidationString_1 INNER JOIN
                      dbo.tarCustomer INNER JOIN
                      dbo.vListValidationString ON dbo.tarCustomer.Status = dbo.vListValidationString.DBValue INNER JOIN
                      dbo.vListValidationString AS vListValidationString_4 ON dbo.tarCustomer.BillingType = vListValidationString_4.DBValue INNER JOIN
                      dbo.vListValidationString AS vListValidationString_6 ON dbo.tarCustomer.CreateType = vListValidationString_6.DBValue ON 
                      vListValidationString_1.DBValue = dbo.tarCustomer.CreditLimitAgeCat ON 
                      tarCustAddr_2.AddrKey = dbo.tarCustomer.DfltShipToAddrKey LEFT OUTER JOIN
                      dbo.tciPaymentTerms RIGHT OUTER JOIN
                      dbo.tarCustAddr AS tarCustAddr_1 ON dbo.tciPaymentTerms.PmtTermsKey = tarCustAddr_1.PmtTermsKey ON 
                      dbo.tarCustomer.DfltBillToAddrKey = tarCustAddr_1.AddrKey ON dbo.tarCustStatus.CustKey = dbo.tarCustomer.CustKey ON 
                      tciAddress_3.AddrKey = dbo.tarCustomer.PrimaryAddrKey LEFT OUTER JOIN
                      dbo.tciAddress AS tciAddress_2 ON dbo.tarCustomer.DfltShipToAddrKey = tciAddress_2.AddrKey LEFT OUTER JOIN
                      dbo.tciAddress AS tciAddress_1 ON dbo.tarCustomer.DfltBillToAddrKey = tciAddress_1.AddrKey LEFT OUTER JOIN
                      dbo.tarCustClass ON dbo.tarCustomer.CustClassKey = dbo.tarCustClass.CustClassKey LEFT OUTER JOIN
                      dbo.tapVendor ON dbo.tarCustomer.VendKey = dbo.tapVendor.VendKey LEFT OUTER JOIN
                      dbo.tciBusinessForm AS tciBusinessForm_2 ON dbo.tarCustomer.StmtFormKey = tciBusinessForm_2.BusinessFormKey LEFT OUTER JOIN
                      dbo.tciProcCycle ON dbo.tarCustomer.StmtCycleKey = dbo.tciProcCycle.ProcCycleKey LEFT OUTER JOIN
                      dbo.timItem ON dbo.tarCustomer.DfltItemKey = dbo.timItem.ItemKey LEFT OUTER JOIN
                      dbo.tsoSalesSource ON dbo.tarCustomer.SalesSourceKey = dbo.tsoSalesSource.SalesSourceKey LEFT OUTER JOIN
                      dbo.tmcCurrExchSchd ON dbo.tarCustomer.CurrExchSchdKey = dbo.tmcCurrExchSchd.CurrExchSchdKey LEFT OUTER JOIN
                      dbo.tciContact ON dbo.tarCustomer.PrimaryCntctKey = dbo.tciContact.CntctKey LEFT OUTER JOIN
                      dbo.tarNationalAcct RIGHT OUTER JOIN
                      dbo.tarNationalAcctLevel ON dbo.tarNationalAcct.NationalAcctKey = dbo.tarNationalAcctLevel.NationalAcctKey ON 
                      dbo.tarCustomer.NationalAcctLevelKey = dbo.tarNationalAcctLevel.NationalAcctLevelKey LEFT OUTER JOIN
                      dbo.timCustPriceGroup RIGHT OUTER JOIN
                      dbo.tarCustAddr LEFT OUTER JOIN
                      dbo.tarSalesperson ON dbo.tarCustAddr.SperKey = dbo.tarSalesperson.SperKey ON 
                      dbo.timCustPriceGroup.CustPriceGroupKey = dbo.tarCustAddr.CustPriceGroupKey ON 
                      dbo.tarCustomer.PrimaryAddrKey = dbo.tarCustAddr.AddrKey
WHERE     (vListValidationString_1.TableName = 'tarCustomer') AND (vListValidationString_1.ColumnName = 'CreditLimitAgeCat') AND 
                      (vListValidationString_4.ColumnName = 'BillingType') AND (vListValidationString_4.TableName = 'tarCustomer') AND 
                      (vListValidationString_6.TableName = 'tarCustomer') AND (vListValidationString_6.ColumnName = 'CreateType') AND 
                      (dbo.vListValidationString.TableName = 'tarCustomer') AND (dbo.vListValidationString.ColumnName = 'Status')





GO

-----===========================================================================================================================================


/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESS_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ADDRESS_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ADDRESS_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_CONTACT_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_CONTACT_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_Products_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_Products_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_Products_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_Products_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_TarCustomer_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPricing_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timWarehouse_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]
GO

USE [LiveEAB_MAS]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]
AS
SELECT     'Customer' AS TYPE, Source.CustName AS ACCOUNT, Source.ContactPhone AS MAINPHONE, Source.ContactFax AS FAX, 
                      ISNULL(SLXSeccode.SECCODEID, 'SYST00000001') AS SECCODEID, 'Active' AS STATUS, SLXUserinfo.USERID AS ACCOUNTMANAGERID, 
                      { fn UCASE(Source.CustName) } AS ACCOUNT_UC, 'F' AS DONOTSOLICIT, 'MAS500' AS IMPORTSOURCE, Source.CustKey AS MASCUSTKEY, 
                      'ADMIN' AS CREATEUSER, GETDATE() AS CREATEDATE, 'ADMIN' AS MODIFYUSER, GETDATE() AS MODIFYDATE, SLXAccount.ADDRESSID, 
                      SLXAccount.ACCOUNTID, SLXAccount.SHIPPINGID
FROM         LiveEAB_SLX.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.ACCOUNT AS SLXAccount ON Source.CustKey = SLXAccount.MASCUSTKEY
WHERE     (SLXAccount.ACCOUNTID IS NULL)






GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]
AS
SELECT     MASSource.MYID, MASSource.TYPE, MASSource.ACCOUNT, MASSource.MAINPHONE, MASSource.FAX, MASSource.SECCODEID, MASSource.STATUS, 
                      MASSource.ACCOUNTMANAGERID, MASSource.ACCOUNT_UC, MASSource.DONOTSOLICIT, MASSource.IMPORTSOURCE, MASSource.MASCUSTKEY, 
                      MASSource.CREATEUSER, MASSource.CREATEDATE, MASSource.MODIFYUSER, MASSource.MODIFYDATE, MASSource.ADDRESSID, 
                      MASSource.ACCOUNTID, MASSource.SHIPPINGID
FROM         (SELECT     ISNULL(CONVERT(varchar(255), Source.CustName), '') + ISNULL(CONVERT(varchar(255), Source.ContactPhone), '') 
                                              + ISNULL(CONVERT(varchar(255), Source.ContactFax), '') + ISNULL(CONVERT(varchar(255), SLXAccount.MASCUSTKEY), '') 
                                              + ISNULL(CONVERT(varchar(255), SLXAccount.ACCOUNTID), '') AS MYID, 'Customer' AS TYPE, Source.CustName AS ACCOUNT, 
                                              Source.ContactPhone AS MAINPHONE, Source.ContactFax AS FAX, ISNULL(SLXSeccode.SECCODEID, 'SYST00000001') AS SECCODEID, 
                                              'Active' AS STATUS, SLXUserinfo.USERID AS ACCOUNTMANAGERID, { fn UCASE(Source.CustName) } AS ACCOUNT_UC, 
                                              'F' AS DONOTSOLICIT, 'MAS500' AS IMPORTSOURCE, Source.CustKey AS MASCUSTKEY, 'ADMIN' AS CREATEUSER, GETDATE() 
                                              AS CREATEDATE, 'ADMIN' AS MODIFYUSER, GETDATE() AS MODIFYDATE, SLXAccount.ADDRESSID, SLXAccount.ACCOUNTID, 
                                              SLXAccount.SHIPPINGID
                       FROM          LiveEAB_SLX.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                                              LiveEAB_SLX.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                                              vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.ACCOUNT AS SLXAccount ON Source.CustKey = SLXAccount.MASCUSTKEY) AS MASSource INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), ACCOUNT), '') + ISNULL(CONVERT(varchar(255), MAINPHONE), '') + ISNULL(CONVERT(varchar(255), FAX), 
                                                   '') + ISNULL(CONVERT(varchar(255), MASCUSTKEY), '') + ISNULL(CONVERT(varchar(255), ACCOUNTID), '') AS MYID, ACCOUNTID
                            FROM          LiveEAB_SLX.sysdba.ACCOUNT) AS SLX ON MASSource.MYID <> SLX.MYID AND MASSource.ACCOUNTID = SLX.ACCOUNTID




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]
AS
SELECT     SLXAccount.ACCOUNTID, SLXAccount.CREATEUSER, SLXAccount.CREATEDATE, SLXAccount.MODIFYUSER, SLXAccount.MODIFYDATE, 
                      Source.PrimaryAddrSperName AS SALESPERSON, Source.CustClassName AS CUSTOMER_TYPE, Source.CreditLimit AS CREDIT_LIMIT, 
                      Source.AvgDaysToPay AS AVG_DAYS_TO_PAY, Source.AvgDaysPastDue AS AVG_DAYS_OVERDUE, Source.Balance AS BALANCE_FORWARD, 
                      Source.CustID AS CUSTOMERID, Source.CompanyID AS COMPANYCODE, Source.Balance AS CURRENTBALANCE
FROM         LiveEAB_SLX.sysdba.ACCOUNTFINANCIAL AS SLXAccountFinancial RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.ACCOUNT AS SLXAccount ON SLXAccountFinancial.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXAccountFinancial.ACCOUNTID IS NULL)






GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]
AS
SELECT     MySource.MYID, MySource.ACCOUNTID, MySource.CREATEUSER, MySource.CREATEDATE, MySource.MODIFYUSER, MySource.MODIFYDATE, 
                      MySource.SALESPERSON, MySource.CUSTOMER_TYPE, MySource.CREDIT_LIMIT, MySource.AVG_DAYS_TO_PAY, MySource.AVG_DAYS_OVERDUE, 
                      MySource.BALANCE_FORWARD, MySource.CUSTOMERID, MySource.COMPANYCODE, MySource.CURRENTBALANCE
FROM         (SELECT     ISNULL(CONVERT(varchar(255), Source.PrimaryAddrSperName), '') + ISNULL(CONVERT(varchar(255), Source.CustClassName), '') 
                                              + ISNULL(CONVERT(varchar(255), Source.CreditLimit), '') + ISNULL(CONVERT(varchar(255), Source.AvgDaysToPay), '') 
                                              + ISNULL(CONVERT(varchar(255), Source.AvgDaysPastDue), '') + ISNULL(CONVERT(varchar(255), Source.Balance), '') 
                                              + ISNULL(CONVERT(varchar(255), Source.CustID), '') + ISNULL(CONVERT(varchar(255), Source.CompanyID), '') 
                                              + ISNULL(CONVERT(varchar(255), Source.Balance), '') AS MYID, SLXAccount.ACCOUNTID, SLXAccount.CREATEUSER, 
                                              SLXAccount.CREATEDATE, SLXAccount.MODIFYUSER, SLXAccount.MODIFYDATE, Source.PrimaryAddrSperName AS SALESPERSON, 
                                              Source.CustClassName AS CUSTOMER_TYPE, Source.CreditLimit AS CREDIT_LIMIT, Source.AvgDaysToPay AS AVG_DAYS_TO_PAY, 
                                              Source.AvgDaysPastDue AS AVG_DAYS_OVERDUE, Source.Balance AS BALANCE_FORWARD, Source.CustID AS CUSTOMERID, 
                                              Source.CompanyID AS COMPANYCODE, Source.Balance AS CURRENTBALANCE
                       FROM          LiveEAB_SLX.sysdba.ACCOUNTFINANCIAL AS SLXAccountFinancial RIGHT OUTER JOIN
                                              LiveEAB_SLX.sysdba.ACCOUNT AS SLXAccount ON SLXAccountFinancial.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                                              LiveEAB_SLX.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                                              LiveEAB_SLX.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                                              vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                                              SLXAccount.MASCUSTKEY = Source.CustKey) AS MySource INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), SALESPERSON), '') + ISNULL(CONVERT(varchar(255), CUSTOMER_TYPE), '') 
                                                   + ISNULL(CONVERT(varchar(255), CREDIT_LIMIT), '') + ISNULL(CONVERT(varchar(255), AVG_DAYS_TO_PAY), '') 
                                                   + ISNULL(CONVERT(varchar(255), AVG_DAYS_OVERDUE), '') + ISNULL(CONVERT(varchar(255), BALANCE_FORWARD), '') 
                                                   + ISNULL(CONVERT(varchar(255), CUSTOMERID), '') + ISNULL(CONVERT(varchar(255), COMPANYCODE), '') 
                                                   + ISNULL(CONVERT(varchar(255), CURRENTBALANCE), '') AS MYID, ACCOUNTID
                            FROM          LiveEAB_SLX.sysdba.ACCOUNTFINANCIAL) AS SLX ON MySource.MYID <> SLX.MYID AND MySource.ACCOUNTID = SLX.ACCOUNTID





GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]
AS
SELECT     SLXAccount.ACCOUNTID, SLXAccount.TYPE, SLXAccount.ACCOUNT, SLXAccount.SECCODEID, SLXAccount.MODIFYDATE, SLXAccount.MODIFYUSER, 
                      SLXAccount.CREATEDATE, SLXAccount.CREATEUSER
FROM         LiveEAB_SLX.sysdba.ACCOUNT AS SLXAccount LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.ACCOUNTSUMMARY AS SLXAccountSummary ON 
                      SLXAccount.ACCOUNTID = SLXAccountSummary.ACCOUNTID RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXAccountSummary.ACCOUNTID IS NULL)




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]
AS
SELECT     SLXACCOUNT.ACCOUNTID AS ENTITYID, dbo.tarCustAddr.CustAddrID AS DESCRIPTION, dbo.tciAddress.AddrLine1 AS ADDRESS1, 
                      dbo.tciAddress.AddrLine2 AS ADDRESS2, dbo.tciAddress.City, dbo.tciAddress.StateID AS STATE, dbo.tciAddress.PostalCode, 
                      dbo.tciAddress.CountryID AS COUNTRY, 'F' AS ISPRIMARY, 'F' AS ISMAILING, NULL AS SALUTATION, dbo.tciAddress.AddrLine3 AS ADDRESS3, 
                      dbo.tciAddress.AddrLine4 AS ADDRESS4, dbo.tciAddress.AddrName AS ERPNAME, dbo.tarCustAddr.AddrKey AS MASADDRKEY
FROM         dbo.tarCustAddr INNER JOIN
                      dbo.tciAddress ON dbo.tarCustAddr.AddrKey = dbo.tciAddress.AddrKey INNER JOIN
                      LiveEAB_SLX.sysdba.ACCOUNT AS SLXACCOUNT ON dbo.tarCustAddr.CustKey = SLXACCOUNT.MASCUSTKEY LEFT OUTER JOIN
                      dbo.tciContact ON dbo.tarCustAddr.DfltCntctKey = dbo.tciContact.CntctKey
WHERE     (dbo.tarCustAddr.AddrKey NOT IN
                          (SELECT     MASADDRKEY
                            FROM          LiveEAB_SLX.sysdba.ADDRESS AS ADDRESS_1
                            WHERE      (MASADDRKEY IS NOT NULL)))





GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = -192
         Left = 0
      End
      Begin Tables = 
         Begin Table = "tarCustAddr"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 162
               Right = 232
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tciAddress"
            Begin Extent = 
               Top = 101
               Left = 288
               Bottom = 328
               Right = 466
            End
            DisplayFlags = 280
            TopColumn = 7
         End
         Begin Table = "SLXACCOUNT"
            Begin Extent = 
               Top = 47
               Left = 507
               Bottom = 155
               Right = 730
            End
            DisplayFlags = 280
            TopColumn = 81
         End
         Begin Table = "tciContact"
            Begin Extent = 
               Top = 202
               Left = 61
               Bottom = 310
               Right = 227
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 30
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'   Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 2340
         Alias = 1755
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]
AS
SELECT     SLXAccount.ADDRESSID, SLXAccount.ACCOUNTID AS ENTITYID, 'Primary' AS TYPE, Source.PrimaryAddrDescription AS DESCRIPTION, 
                      Source.PrimaryAddrLine1 AS ADDRESS1, Source.PrimaryAddrLine2 AS ADDRESS2, Source.PrimaryAddrCity AS CITY, 
                      Source.PrimaryAddrState AS STATE, Source.PrimaryAddrPostalCode AS POSTALCODE, Source.PrimaryAddrCountry AS COUNTRY, 'T' AS ISPRIMARY, 
                      'T' AS ISMAILING, GETDATE() AS CREATEDATE, 'ADMIN' AS CREATEUSER, GETDATE() AS MODIFYDATE, 'ADMIN' AS MODIFYUSER, 
                      Source.PrimaryAddrLine3 AS ADDRESS3, Source.PrimaryAddrLine4 AS ADDRESS4, Source.PrimaryAddrName AS ERPNAME, 
                      Source.PrimaryAddrKey AS MASADDRKEY
FROM         LiveEAB_SLX.sysdba.ADDRESS AS SLXAddress RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.ACCOUNT AS SLXAccount ON SLXAddress.ADDRESSID = SLXAccount.ADDRESSID RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXAddress.ADDRESSID IS NULL)






GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]
AS
SELECT     SLXAccount.ACCOUNTID, SLXAccount.CREATEUSER, SLXAccount.CREATEDATE, SLXAccount.MODIFYUSER, SLXAccount.MODIFYDATE, 
                      SLXAccount.SECCODEID
FROM         LiveEAB_SLX.sysdba.ERPTRADINGACCOUNT AS SLXErpTradingAccount RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.ACCOUNT AS SLXAccount ON SLXErpTradingAccount.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXErpTradingAccount.ACCOUNTID IS NULL)






GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESS_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_ADDRESS_TAC]
AS
SELECT     LiveEAB_SLX.sysdba.ADDRESS.ADDRESSID, 1 AS ENTITYID, dbo.tciAddress.AddrLine1 AS ADDRESS1, dbo.tciAddress.AddrLine2 AS ADDRESS2, 
                      dbo.tciAddress.City, dbo.tciAddress.StateID, dbo.tciAddress.PostalCode, dbo.tciAddress.CountryID AS COUNTRY, 
                      dbo.tciAddress.AddrLine3 AS ADDRESS3, dbo.tciAddress.AddrLine4 AS ADDRESS4, dbo.tciAddress.AddrName AS ERPNAME, 
                      dbo.tciAddress.AddrKey AS MASADDRKEY
FROM         dbo.tciAddress LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.ADDRESS ON dbo.tciAddress.AddrKey = LiveEAB_SLX.sysdba.ADDRESS.MASADDRKEY
WHERE     (LiveEAB_SLX.sysdba.ADDRESS.ADDRESSID IS NULL)



GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "tciAddress"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 279
               Right = 216
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "ADDRESS (LiveEAB_SLX.sysdba)"
            Begin Extent = 
               Top = 6
               Left = 254
               Bottom = 114
               Right = 425
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 3525
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_ADDRESS_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_ADDRESS_TAC'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]
AS
SELECT     Source.MYID, Source.ADDRESSID, Source.ENTITYID, Source.ADDRESS1, Source.ADDRESS2, Source.City, Source.StateID, Source.PostalCode, 
                      Source.COUNTRY, Source.ADDRESS3, Source.ADDRESS4, Source.ERPNAME, Source.MASADDRKEY
FROM         (SELECT     ISNULL(CONVERT(varchar(255), LiveEAB_SLX.sysdba.ADDRESS.ADDRESSID), '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrLine1), 
                                              '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrLine2), '') + ISNULL(CONVERT(varchar(255), tciAddress.City), '') 
                                              + ISNULL(CONVERT(varchar(255), tciAddress.StateID), '') + ISNULL(CONVERT(varchar(255), tciAddress.PostalCode), '') 
                                              + ISNULL(CONVERT(varchar(255), LiveEAB_SLX.sysdba.ADDRESS.COUNTRY), '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrLine3), 
                                              '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrLine4), '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrName), '') 
                                              + ISNULL(CONVERT(varchar(255), tciAddress.AddrKey), '') AS MYID, LiveEAB_SLX.sysdba.ADDRESS.ADDRESSID, 1 AS ENTITYID, 
                                              tciAddress.AddrLine1 AS ADDRESS1, tciAddress.AddrLine2 AS ADDRESS2, tciAddress.City, tciAddress.StateID, tciAddress.PostalCode, 
                                              tciAddress.CountryID AS COUNTRY, tciAddress.AddrLine3 AS ADDRESS3, tciAddress.AddrLine4 AS ADDRESS4, 
                                              tciAddress.AddrName AS ERPNAME, tciAddress.AddrKey AS MASADDRKEY
                       FROM          tciAddress LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.ADDRESS ON tciAddress.AddrKey = LiveEAB_SLX.sysdba.ADDRESS.MASADDRKEY) AS Source INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), ADDRESSID), '') + ISNULL(CONVERT(varchar(255), ADDRESS1), '') + ISNULL(CONVERT(varchar(255), 
                                                   ADDRESS2), '') + ISNULL(CONVERT(varchar(255), CITY), '') + ISNULL(CONVERT(varchar(255), STATE), '') + ISNULL(CONVERT(varchar(255), 
                                                   POSTALCODE), '') + ISNULL(CONVERT(varchar(255), COUNTRY), '') + ISNULL(CONVERT(varchar(255), ADDRESS3), '') 
                                                   + ISNULL(CONVERT(varchar(255), ADDRESS4), '') + ISNULL(CONVERT(varchar(255), ERPNAME), '') + ISNULL(CONVERT(varchar(255), 
                                                   MASADDRKEY), '') AS MYID, ADDRESSID
                            FROM          LiveEAB_SLX.sysdba.ADDRESS AS ADDRESS_1) AS SLX ON Source.MYID <> SLX.MYID AND Source.ADDRESSID = SLX.ADDRESSID




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



Create View [dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]
as
SELECT     tarCustomer.DfltBillToAddrKey, tarCustomer.DfltShipToAddrKey, LiveEAB_SLX.sysdba.ACCOUNT.ACCOUNTID, 
                      DFLTBillingAddress.ADDRESSID AS BILLADDRESSID, DFLTShipping.ADDRESSID AS SHIPADDRESSID
FROM         tarCustomer INNER JOIN
                      LiveEAB_SLX.sysdba.ACCOUNT ON tarCustomer.CustKey = LiveEAB_SLX.sysdba.ACCOUNT.MASCUSTKEY LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.ADDRESS AS DFLTShipping ON tarCustomer.DfltShipToAddrKey = DFLTShipping.MASADDRKEY LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.ADDRESS AS DFLTBillingAddress ON tarCustomer.DfltBillToAddrKey = DFLTBillingAddress.MASADDRKEY


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_CONTACT_TAC]
AS
SELECT     'Customer' AS TYPE, SLXAccount.ACCOUNTID, SLXAccount.ACCOUNT, 'T' AS ISPRIMARY, SUBSTRING(Source.ContactName, CHARINDEX(' ', 
                      Source.ContactName) + 1, LEN(Source.ContactName)) AS LASTNAME, SUBSTRING(Source.ContactName, 1, NULLIF (CHARINDEX(' ', 
                      Source.ContactName) - 1, - 1)) AS FIRSTNAME, Source.ContactPhone AS WORKPHONE, Source.ContactFax AS FAX, Source.ContactEMailAddr AS EMAIL, 
                      Source.ContactTitle AS TITLE, SLXAccount.SECCODEID, SLXAccount.ACCOUNTMANAGERID, SLXAccount.CREATEDATE, SLXAccount.CREATEUSER, 
                      SLXAccount.MODIFYDATE, SLXAccount.MODIFYUSER, { fn UCASE(SUBSTRING(Source.ContactName, CHARINDEX(' ', Source.ContactName) + 1, 
                      LEN(Source.ContactName))) } AS LASTNAME_UC, 'F' AS DONOTSOLICIT, 'F' AS DONOTEMAIL, 'F' AS DONOTPHONE, 'F' AS DONOTMAIL, 
                      'F' AS DONOTFAX, 'MAS500' AS IMPORTSOURCE, SUBSTRING(Source.ContactName, 1, NULLIF (CHARINDEX(' ', Source.ContactName) - 1, - 1)) 
                      AS SALUTATION, Source.ContactName AS MASCONTACTNAME, Source.MASContactId AS MACCONTACTID
FROM         LiveEAB_SLX.sysdba.CONTACT AS SLXContact RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.ACCOUNT AS SLXAccount ON SLXContact.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXContact.CONTACTID IS NULL)




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]
AS
SELECT     SOURCE_1.MYID, SOURCE_1.TYPE, SOURCE_1.ACCOUNTID, SOURCE_1.ACCOUNT, SOURCE_1.ISPRIMARY, SOURCE_1.LASTNAME, 
                      SOURCE_1.FIRSTNAME, SOURCE_1.WORKPHONE, SOURCE_1.FAX, SOURCE_1.EMAIL, SOURCE_1.TITLE, SOURCE_1.SECCODEID, 
                      SOURCE_1.ACCOUNTMANAGERID, SOURCE_1.CREATEDATE, SOURCE_1.CREATEUSER, SOURCE_1.MODIFYDATE, SOURCE_1.MODIFYUSER, 
                      SOURCE_1.LASTNAME_UC, SOURCE_1.DONOTSOLICIT, SOURCE_1.DONOTEMAIL, SOURCE_1.DONOTPHONE, SOURCE_1.DONOTMAIL, 
                      SOURCE_1.DONOTFAX, SOURCE_1.IMPORTSOURCE, SOURCE_1.SALUTATION, SOURCE_1.MASCONTACTNAME, SOURCE_1.MACCONTACTID, 
                      SOURCE_1.CONTACTID
FROM         (SELECT     ISNULL(CONVERT(varchar(255), SLXContact.CONTACTID), '') + ISNULL(CONVERT(varchar(255), Source.ContactPhone), '') 
                                              + ISNULL(CONVERT(varchar(255), Source.ContactFax), '') + ISNULL(CONVERT(varchar(255), Source.ContactEMailAddr), '') 
                                              + ISNULL(CONVERT(varchar(255), Source.ContactTitle), '') + ISNULL(CONVERT(varchar(255), Source.ContactName), '') 
                                              + ISNULL(CONVERT(varchar(255), Source.MASContactId), '') AS MYID, 'Customer' AS TYPE, SLXAccount.ACCOUNTID, SLXAccount.ACCOUNT, 
                                              'T' AS ISPRIMARY, SUBSTRING(Source.ContactName, CHARINDEX(' ', Source.ContactName) + 1, LEN(Source.ContactName)) AS LASTNAME, 
                                              SUBSTRING(Source.ContactName, 1, NULLIF (CHARINDEX(' ', Source.ContactName) - 1, - 1)) AS FIRSTNAME, 
                                              Source.ContactPhone AS WORKPHONE, Source.ContactFax AS FAX, Source.ContactEMailAddr AS EMAIL, Source.ContactTitle AS TITLE, 
                                              SLXAccount.SECCODEID, SLXAccount.ACCOUNTMANAGERID, SLXAccount.CREATEDATE, SLXAccount.CREATEUSER, 
                                              SLXAccount.MODIFYDATE, SLXAccount.MODIFYUSER, { fn UCASE(SUBSTRING(Source.ContactName, CHARINDEX(' ', Source.ContactName) 
                                              + 1, LEN(Source.ContactName))) } AS LASTNAME_UC, 'F' AS DONOTSOLICIT, 'F' AS DONOTEMAIL, 'F' AS DONOTPHONE, 'F' AS DONOTMAIL, 
                                              'F' AS DONOTFAX, 'MAS500' AS IMPORTSOURCE, SUBSTRING(Source.ContactName, 1, NULLIF (CHARINDEX(' ', Source.ContactName) - 1, 
                                              - 1)) AS SALUTATION, Source.ContactName AS MASCONTACTNAME, Source.MASContactId AS MACCONTACTID, SLXContact.CONTACTID
                       FROM          LiveEAB_SLX.sysdba.CONTACT AS SLXContact RIGHT OUTER JOIN
                                              LiveEAB_SLX.sysdba.ACCOUNT AS SLXAccount ON SLXContact.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                                              LiveEAB_SLX.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                                              LiveEAB_SLX.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                                              vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                                              SLXAccount.MASCUSTKEY = Source.CustKey) AS SOURCE_1 INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), CONTACTID), '') + ISNULL(CONVERT(varchar(255), WORKPHONE), '') + ISNULL(CONVERT(varchar(255), 
                                                   FAX), '') + ISNULL(CONVERT(varchar(255), EMAIL), '') + ISNULL(CONVERT(varchar(255), TITLE), '') + ISNULL(CONVERT(varchar(255), 
                                                   MASCONTACTNAME), '') + ISNULL(CONVERT(varchar(255), MACCONTACTID), '') AS MYID, CONTACTID
                            FROM          LiveEAB_SLX.sysdba.CONTACT) AS slx ON SOURCE_1.MYID <> slx.MYID AND SOURCE_1.CONTACTID = slx.CONTACTID




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]
AS
SELECT     SLXContact.ADDRESSID, SLXContact.CONTACTID AS ENTITYID, 'Primary' AS TYPE, Source.PrimaryAddrDescription AS DESCRIPTION, 
                      Source.PrimaryAddrLine1 AS ADDRESS1, Source.PrimaryAddrLine2 AS ADDRESS2, Source.PrimaryAddrCity AS CITY, 
                      Source.PrimaryAddrState AS STATE, Source.PrimaryAddrPostalCode AS POSTALCODE, 'PrimaryAddrCountry,' AS COUNTRY, 'T' AS ISPRIMARY, 
                      'T' AS ISMAILING, GETDATE() AS CREATEDATE, 'ADMIN' AS CREATEUSER, GETDATE() AS MODIFYDATE, 'ADMIN' AS MODIFYUSER, 
                      Source.PrimaryAddrLine3 AS ADDRESS3, Source.PrimaryAddrLine4 AS ADDRESS4, Source.PrimaryAddrName AS ERPNAME, 
                      Source.PrimaryAddrKey AS MASADDRKEY
FROM         dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.CONTACT AS SLXContact LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.ADDRESS AS SLXAddress ON SLXContact.ADDRESSID = SLXAddress.ADDRESSID ON 
                      Source.MASContactId = SLXContact.MACCONTACTID LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      LiveEAB_SLX.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME ON 
                      Source.SperID = SLXUserinfo.ACCOUNTINGUSERID LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.ACCOUNT AS SLXAccount ON Source.CustKey = SLXAccount.MASCUSTKEY
WHERE     (SLXAddress.ADDRESSID IS NULL)





GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_Products_TAC]
AS
SELECT     LiveEAB_SLX.sysdba.PRODUCT.PRODUCTID, dbo.vdvStockStatus.ShortDesc AS NAME, dbo.timItemDescription.LongDesc AS DESCRIPTION, 
                      dbo.vdvStockStatus.ItemID AS ACTUALID, dbo.timItemClass.ItemClassName AS FAMILY, dbo.timItem.StdPrice AS PRICE, 
                      tmpItemType.LocalText AS PRODUCTGROUP, CONVERT(varchar(255), tmpItemStatus.LocalText) AS STATUS, 
                      dbo.vdvStockStatus.UnitMeasID AS UNIT, NULL AS STOCKVOLUME, NULL AS STOCKWEIGHT, NULL AS STOCKITEM, NULL AS PROGRAM, NULL 
                      AS SUPPLIER, NULL AS VENDOR, NULL AS SITEID, NULL AS WAREHOUSELOCATION, NULL AS COMMISSIONABLE, NULL AS TAXABLE, NULL 
                      AS ACCOUNTINGPERIOD, dbo.tglAccount.GLAcctNo AS GLACCOUNTNUMBER, NULL AS GLSUBACCOUNTNUMBER, NULL AS DATAOWNER, NULL 
                      AS TYPE, NULL AS FIXEDCOST, NULL AS GLOBALSYNCID, NULL AS APPID, NULL AS TICK, NULL AS COMMODITYGROUPID, NULL AS ACTIVEFLAG, 
                      'T' AS SELLINGALLOWEDFLAG, dbo.vdvStockStatus.StockUnitMeasKey AS UNITOFMEASUREID, NULL AS SELLINGUOMID, NULL 
                      AS SELLINGUOMNUMBER, NULL AS CLASSIFICATION, NULL AS COMMODITYTYPE, dbo.vdvStockStatus.ItemKey AS MASITEMKEY, 
                      dbo.timItemUnitOfMeas.UPC, dbo.vdvStockStatus.ItemID AS MASITEMID, dbo.vdvStockStatus.WhseID AS WAREHOUSEID, 
                      dbo.vdvStockStatus.CompanyID, dbo.vdvStockStatus.QtyOnHand, dbo.vdvStockStatus.QtyAvailable, dbo.vdvStockStatus.SurplusQty, 
                      dbo.vdvStockStatus.QtyOnHold, dbo.vdvStockStatus.MaxStockLevel, dbo.timItem.ProdPriceGroupKey
FROM         dbo.tglAccount LEFT OUTER JOIN
                      dbo.timInventory ON dbo.tglAccount.GLAcctKey = dbo.timInventory.InvtAcctKey RIGHT OUTER JOIN
                      dbo.vdvStockStatus INNER JOIN
                      dbo.timItem ON dbo.vdvStockStatus.ItemKey = dbo.timItem.ItemKey ON dbo.timInventory.WhseKey = dbo.vdvStockStatus.WhseKey AND 
                      dbo.timInventory.ItemKey = dbo.vdvStockStatus.ItemKey LEFT OUTER JOIN
                      dbo.timItemUnitOfMeas ON dbo.timItem.SalesUnitMeasKey = dbo.timItemUnitOfMeas.TargetUnitMeasKey AND 
                      dbo.timItem.ItemKey = dbo.timItemUnitOfMeas.ItemKey LEFT OUTER JOIN
                          (SELECT     TableName, ColumnName, DBValue, IsDefault, IsHidden, StringNo, LocalText
                            FROM          dbo.vListValidationString AS vListValidationString_1
                            WHERE      (TableName = 'timItem') AND (ColumnName = 'Status')) AS tmpItemStatus ON 
                      dbo.timItem.Status = tmpItemStatus.DBValue LEFT OUTER JOIN
                          (SELECT     TableName, ColumnName, DBValue, IsDefault, IsHidden, StringNo, LocalText
                            FROM          dbo.vListValidationString
                            WHERE      (TableName = 'timItem') AND (ColumnName = 'ItemType')) AS tmpItemType ON 
                      dbo.timItem.ItemType = tmpItemType.DBValue LEFT OUTER JOIN
                      dbo.timItemClass ON dbo.timItem.ItemClassKey = dbo.timItemClass.ItemClassKey LEFT OUTER JOIN
                      dbo.timItemDescription ON dbo.vdvStockStatus.ItemKey = dbo.timItemDescription.ItemKey LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.PRODUCT ON dbo.vdvStockStatus.WhseID = LiveEAB_SLX.sysdba.PRODUCT.WAREHOUSEID AND 
                      dbo.vdvStockStatus.ItemKey = LiveEAB_SLX.sysdba.PRODUCT.MASITEMKEY AND 
                      dbo.vdvStockStatus.CompanyID = LiveEAB_SLX.sysdba.PRODUCT.COMPANYID
WHERE     (LiveEAB_SLX.sysdba.PRODUCT.PRODUCTID IS NULL)

GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "tglAccount"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 114
               Right = 199
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "timInventory"
            Begin Extent = 
               Top = 6
               Left = 237
               Bottom = 114
               Right = 462
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "vdvStockStatus"
            Begin Extent = 
               Top = 114
               Left = 38
               Bottom = 222
               Right = 225
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "timItem"
            Begin Extent = 
               Top = 114
               Left = 263
               Bottom = 222
               Right = 452
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "timItemUnitOfMeas"
            Begin Extent = 
               Top = 222
               Left = 38
               Bottom = 330
               Right = 212
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tmpItemStatus"
            Begin Extent = 
               Top = 6
               Left = 500
               Bottom = 179
               Right = 651
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tmpItemType"
            Begin Extent = 
               Top = 6
               Left = 689
               Bottom = 114
               Right = 840
            End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_Products_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "timItemClass"
            Begin Extent = 
               Top = 330
               Left = 227
               Bottom = 438
               Right = 404
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "timItemDescription"
            Begin Extent = 
               Top = 438
               Left = 38
               Bottom = 546
               Right = 189
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "PRODUCT (LiveEAB_SLX.sysdba)"
            Begin Extent = 
               Top = 438
               Left = 227
               Bottom = 546
               Right = 439
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 48
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 2940
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 2625
         Alias = 2925
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_Products_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_Products_TAC'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_Products_TAC_Changed]
AS
SELECT     Source.MYID, Source.PRODUCTID, Source.NAME, Source.DESCRIPTION, Source.ACTUALID, Source.FAMILY, Source.PRICE, Source.PRODUCTGROUP, 
                      Source.STATUS, Source.UNIT, Source.STOCKVOLUME, Source.STOCKWEIGHT, Source.STOCKITEM, Source.PROGRAM, Source.SUPPLIER, 
                      Source.VENDOR, Source.SITEID, Source.WAREHOUSELOCATION, Source.COMMISSIONABLE, Source.TAXABLE, Source.ACCOUNTINGPERIOD, 
                      Source.GLACCOUNTNUMBER, Source.GLSUBACCOUNTNUMBER, Source.DATAOWNER, Source.TYPE, Source.FIXEDCOST, Source.GLOBALSYNCID, 
                      Source.APPID, Source.TICK, Source.COMMODITYGROUPID, Source.ACTIVEFLAG, Source.SELLINGALLOWEDFLAG, Source.UNITOFMEASUREID, 
                      Source.SELLINGUOMID, Source.SELLINGUOMNUMBER, Source.CLASSIFICATION, Source.COMMODITYTYPE, Source.MASITEMKEY, Source.UPC, 
                      Source.MASITEMID, Source.WAREHOUSEID, Source.CompanyID, Source.QtyOnHand, Source.QtyAvailable, Source.SurplusQty, Source.QtyOnHold, 
                      Source.MaxStockLevel, Source.ProdPriceGroupKey
FROM         (SELECT     ISNULL(CONVERT(varchar(255), LiveEAB_SLX.sysdba.PRODUCT.PRODUCTID), '') + ISNULL(CONVERT(varchar(255), 
                                              dbo.vdvStockStatus.ShortDesc), '') + ISNULL(CONVERT(varchar(255), dbo.timItemDescription.LongDesc), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.vdvStockStatus.ItemID), '') + ISNULL(CONVERT(varchar(255), dbo.timItemClass.ItemClassName), '') 
                                              + ISNULL(CONVERT(varchar(255), CONVERT(decimal(17, 4), dbo.timItem.StdPrice)), '') + ISNULL(CONVERT(varchar(255), 
                                              tmpItemType.LocalText), '') + ISNULL(CONVERT(varchar(255), tmpItemStatus.LocalText), '') + ISNULL(CONVERT(varchar(255), 
                                              dbo.vdvStockStatus.UnitMeasID), '') + ISNULL(CONVERT(varchar(255), dbo.tglAccount.GLAcctNo), '') + ISNULL(CONVERT(varchar(255), 
                                              dbo.vdvStockStatus.StockUnitMeasKey), '') + ISNULL(CONVERT(varchar(255), CONVERT(int, dbo.vdvStockStatus.ItemKey)), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.timItemUnitOfMeas.UPC), '') + ISNULL(CONVERT(varchar(255), dbo.vdvStockStatus.ItemID), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.vdvStockStatus.WhseID), '') + ISNULL(CONVERT(varchar(255), dbo.vdvStockStatus.CompanyID), '') 
                                              + ISNULL(CONVERT(varchar(255), CONVERT(float, dbo.vdvStockStatus.QtyOnHand)), '') + ISNULL(CONVERT(varchar(255), CONVERT(float, 
                                              dbo.vdvStockStatus.QtyAvailable)), '') + ISNULL(CONVERT(varchar(255), CONVERT(float, dbo.vdvStockStatus.SurplusQty)), '') 
                                              + ISNULL(CONVERT(varchar(255), CONVERT(float, dbo.vdvStockStatus.QtyOnHold)), '') + ISNULL(CONVERT(varchar(255), CONVERT(float, 
                                              dbo.vdvStockStatus.MaxStockLevel)), '') + ISNULL(CONVERT(varchar(255), dbo.timItem.ProdPriceGroupKey), '') AS MYID, 
                                              LiveEAB_SLX.sysdba.PRODUCT.PRODUCTID, dbo.vdvStockStatus.ShortDesc AS NAME, 
                                              dbo.timItemDescription.LongDesc AS DESCRIPTION, dbo.vdvStockStatus.ItemID AS ACTUALID, 
                                              dbo.timItemClass.ItemClassName AS FAMILY, dbo.timItem.StdPrice AS PRICE, tmpItemType.LocalText AS PRODUCTGROUP, 
                                              CONVERT(varchar(255), tmpItemStatus.LocalText) AS STATUS, dbo.vdvStockStatus.UnitMeasID AS UNIT, NULL AS STOCKVOLUME, NULL 
                                              AS STOCKWEIGHT, NULL AS STOCKITEM, NULL AS PROGRAM, NULL AS SUPPLIER, NULL AS VENDOR, NULL AS SITEID, NULL 
                                              AS WAREHOUSELOCATION, NULL AS COMMISSIONABLE, NULL AS TAXABLE, NULL AS ACCOUNTINGPERIOD, 
                                              dbo.tglAccount.GLAcctNo AS GLACCOUNTNUMBER, NULL AS GLSUBACCOUNTNUMBER, NULL AS DATAOWNER, NULL AS TYPE, NULL 
                                              AS FIXEDCOST, NULL AS GLOBALSYNCID, NULL AS APPID, NULL AS TICK, NULL AS COMMODITYGROUPID, NULL AS ACTIVEFLAG, 
                                              'T' AS SELLINGALLOWEDFLAG, dbo.vdvStockStatus.StockUnitMeasKey AS UNITOFMEASUREID, NULL AS SELLINGUOMID, NULL 
                                              AS SELLINGUOMNUMBER, NULL AS CLASSIFICATION, NULL AS COMMODITYTYPE, dbo.vdvStockStatus.ItemKey AS MASITEMKEY, 
                                              dbo.timItemUnitOfMeas.UPC, dbo.vdvStockStatus.ItemID AS MASITEMID, dbo.vdvStockStatus.WhseID AS WAREHOUSEID, 
                                              dbo.vdvStockStatus.CompanyID, dbo.vdvStockStatus.QtyOnHand, dbo.vdvStockStatus.QtyAvailable, dbo.vdvStockStatus.SurplusQty, 
                                              dbo.vdvStockStatus.QtyOnHold, dbo.vdvStockStatus.MaxStockLevel, dbo.timItem.ProdPriceGroupKey
                       FROM          dbo.tglAccount LEFT OUTER JOIN
                                              dbo.timInventory ON dbo.tglAccount.GLAcctKey = dbo.timInventory.InvtAcctKey RIGHT OUTER JOIN
                                              dbo.vdvStockStatus INNER JOIN
                                              dbo.timItem ON dbo.vdvStockStatus.ItemKey = dbo.timItem.ItemKey ON dbo.timInventory.WhseKey = dbo.vdvStockStatus.WhseKey AND 
                                              dbo.timInventory.ItemKey = dbo.vdvStockStatus.ItemKey LEFT OUTER JOIN
                                              dbo.timItemUnitOfMeas ON dbo.timItem.SalesUnitMeasKey = dbo.timItemUnitOfMeas.TargetUnitMeasKey AND 
                                              dbo.timItem.ItemKey = dbo.timItemUnitOfMeas.ItemKey LEFT OUTER JOIN
                                                  (SELECT     TableName, ColumnName, DBValue, IsDefault, IsHidden, StringNo, LocalText
                                                    FROM          dbo.vListValidationString AS vListValidationString_1
                                                    WHERE      (TableName = 'timItem') AND (ColumnName = 'Status')) AS tmpItemStatus ON 
                                              dbo.timItem.Status = tmpItemStatus.DBValue LEFT OUTER JOIN
                                                  (SELECT     TableName, ColumnName, DBValue, IsDefault, IsHidden, StringNo, LocalText
                                                    FROM          dbo.vListValidationString
                                                    WHERE      (TableName = 'timItem') AND (ColumnName = 'ItemType')) AS tmpItemType ON 
                                              dbo.timItem.ItemType = tmpItemType.DBValue LEFT OUTER JOIN
                                              dbo.timItemClass ON dbo.timItem.ItemClassKey = dbo.timItemClass.ItemClassKey LEFT OUTER JOIN
                                              dbo.timItemDescription ON dbo.vdvStockStatus.ItemKey = dbo.timItemDescription.ItemKey LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.PRODUCT ON dbo.vdvStockStatus.WhseID = LiveEAB_SLX.sysdba.PRODUCT.WAREHOUSEID AND 
                                              dbo.vdvStockStatus.ItemKey = LiveEAB_SLX.sysdba.PRODUCT.MASITEMKEY AND 
                                              dbo.vdvStockStatus.CompanyID = LiveEAB_SLX.sysdba.PRODUCT.COMPANYID) AS Source INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), PRODUCTID), '') + ISNULL(CONVERT(varchar(255), NAME), '') + ISNULL(CONVERT(varchar(255), 
                                                   DESCRIPTION), '') + ISNULL(CONVERT(varchar(255), ACTUALID), '') + ISNULL(CONVERT(varchar(255), FAMILY), '') 
                                                   + ISNULL(CONVERT(varchar(255), PRICE), '') + ISNULL(CONVERT(varchar(255), PRODUCTGROUP), '') + ISNULL(CONVERT(varchar(255), 
                                                   STATUS), '') + ISNULL(CONVERT(varchar(255), UNIT), '') + ISNULL(CONVERT(varchar(255), GLACCOUNTNUMBER), '') 
                                                   + RTRIM(ISNULL(CONVERT(varchar(255), UNITOFMEASUREID), '')) + ISNULL(CONVERT(varchar(255), MASITEMKEY), '') 
                                                   + ISNULL(CONVERT(varchar(255), UPC), '') + ISNULL(CONVERT(varchar(255), MASITEMID), '') + ISNULL(CONVERT(varchar(255), 
                                                   WAREHOUSEID), '') + ISNULL(CONVERT(varchar(255), COMPANYID), '') + ISNULL(CONVERT(varchar(255), QTYONHAND), '') 
                                                   + ISNULL(CONVERT(varchar(255), QTYAVAILABLE), '') + ISNULL(CONVERT(varchar(255), SURPLUSQTY), '') 
                                                   + ISNULL(CONVERT(varchar(255), QTYONHOLD), '') + ISNULL(CONVERT(varchar(255), MAXSTOCKLEVEL), '') 
                                                   + ISNULL(CONVERT(varchar(255), MASPRODPRICEGROUPKEY), '') AS MYID, PRODUCTID
                            FROM          LiveEAB_SLX.sysdba.PRODUCT AS PRODUCT_1) AS SLX ON Source.MYID <> SLX.MYID AND Source.PRODUCTID = SLX.PRODUCTID

GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Source"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 114
               Right = 239
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX"
            Begin Extent = 
               Top = 6
               Left = 277
               Bottom = 84
               Right = 428
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 49
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 2640
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 2805
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
   ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_Products_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'   End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_Products_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_Products_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



Create view [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]
as
SELECT     SLX.TARCUSTADDRID, tarCustAddr.AddrKey, tarCustAddr.AllowInvtSubst, tarCustAddr.BackOrdPrice, tarCustAddr.BOLReqd, tarCustAddr.CarrierAcctNo, 
                      tarCustAddr.CarrierBillMeth, tarCustAddr.CloseSOLineOnFirstShip, tarCustAddr.CloseSOOnFirstShip, tarCustAddr.CommPlanKey, 
                      tarCustAddr.CreateType, tarCustAddr.CreateUserID, tarCustAddr.CreditCardKey, tarCustAddr.CurrExchSchdKey, tarCustAddr.CurrID, 
                      tarCustAddr.CustAddrID, tarCustAddr.CustKey, tarCustAddr.CustPriceGroupKey, tarCustAddr.DfltCntctKey, tarCustAddr.FOBKey, 
                      tarCustAddr.FreightMethod, tarCustAddr.ImportLogKey, tarCustAddr.InvcFormKey, tarCustAddr.InvcMsg, tarCustAddr.InvoiceReqd, 
                      tarCustAddr.LanguageID, tarCustAddr.PackListContentsReqd, tarCustAddr.PackListFormKey, tarCustAddr.PackListReqd, tarCustAddr.PmtTermsKey, 
                      tarCustAddr.PriceAdj, tarCustAddr.PriceBase, tarCustAddr.PrintOrderAck, tarCustAddr.RequireSOAck, tarCustAddr.SalesTerritoryKey, 
                      tarCustAddr.ShipComplete, tarCustAddr.ShipDays, tarCustAddr.ShipLabelFormKey, tarCustAddr.ShipLabelsReqd, tarCustAddr.ShipMethKey, 
                      tarCustAddr.ShipZoneKey, tarCustAddr.SOAckFormKey, tarCustAddr.SOAckMeth, tarCustAddr.SperKey, tarCustAddr.STaxSchdKey, 
                      tarCustAddr.UpdateDate, tarCustAddr.UpdateUserID, tarCustAddr.WhseKey, tarCustAddr.UsePromoPrice
FROM         tarCustAddr LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.TARCUSTADDR AS SLX ON tarCustAddr.AddrKey = SLX.AddrKey
WHERE     (SLX.TARCUSTADDRID IS NULL)


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]
AS
SELECT     SOURCE.MYID, SOURCE.TARCUSTADDRID, SOURCE.AddrKey, SOURCE.AllowInvtSubst, SOURCE.BackOrdPrice, SOURCE.BOLReqd, 
                      SOURCE.CarrierAcctNo, SOURCE.CarrierBillMeth, SOURCE.CloseSOLineOnFirstShip, SOURCE.CloseSOOnFirstShip, SOURCE.CommPlanKey, 
                      SOURCE.CreateType, SOURCE.CreateUserID, SOURCE.CreditCardKey, SOURCE.CurrExchSchdKey, SOURCE.CurrID, SOURCE.CustAddrID, 
                      SOURCE.CustKey, SOURCE.CustPriceGroupKey, SOURCE.DfltCntctKey, SOURCE.FOBKey, SOURCE.FreightMethod, SOURCE.ImportLogKey, 
                      SOURCE.InvcFormKey, SOURCE.InvcMsg, SOURCE.InvoiceReqd, SOURCE.LanguageID, SOURCE.PackListContentsReqd, SOURCE.PackListFormKey, 
                      SOURCE.PackListReqd, SOURCE.PmtTermsKey, SOURCE.PriceAdj, SOURCE.PriceBase, SOURCE.PrintOrderAck, SOURCE.RequireSOAck, 
                      SOURCE.SalesTerritoryKey, SOURCE.ShipComplete, SOURCE.ShipDays, SOURCE.ShipLabelFormKey, SOURCE.ShipLabelsReqd, 
                      SOURCE.ShipMethKey, SOURCE.ShipZoneKey, SOURCE.SOAckFormKey, SOURCE.SOAckMeth, SOURCE.SperKey, SOURCE.STaxSchdKey, 
                      SOURCE.UpdateDate, SOURCE.UpdateUserID, SOURCE.WhseKey, SOURCE.UsePromoPrice
FROM         (SELECT     ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.AddrKey), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.AllowInvtSubst), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.BackOrdPrice), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.BOLReqd), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.CarrierAcctNo), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.CarrierBillMeth), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.CloseSOLineOnFirstShip), '') + ISNULL(CONVERT(varchar(255), 
                                              dbo.tarCustAddr.CloseSOOnFirstShip), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.CommPlanKey), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.CreateType), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.CreateUserID), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.CreditCardKey), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.CurrExchSchdKey), 
                                              '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.CurrID), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.CustAddrID), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.CustKey), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.CustPriceGroupKey), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.DfltCntctKey), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.FOBKey), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.FreightMethod), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.ImportLogKey), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.InvcFormKey), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.InvcMsg), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.InvoiceReqd), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.LanguageID), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.PackListContentsReqd), '') + ISNULL(CONVERT(varchar(255), 
                                              dbo.tarCustAddr.PackListFormKey), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.PackListReqd), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.PmtTermsKey), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.PriceAdj), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.PriceBase), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.PrintOrderAck), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.RequireSOAck), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.SalesTerritoryKey), 
                                              '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.ShipComplete), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.ShipDays), '') 
                                              + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.ShipLabelFormKey), '') + ISNULL(CONVERT(varchar(255), 
                                              dbo.tarCustAddr.ShipLabelsReqd), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.ShipMethKey), '') + ISNULL(CONVERT(varchar(255), 
                                              dbo.tarCustAddr.ShipZoneKey), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.SOAckFormKey), '') + ISNULL(CONVERT(varchar(255), 
                                              dbo.tarCustAddr.SOAckMeth), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.SperKey), '') + ISNULL(CONVERT(varchar(255), 
                                              dbo.tarCustAddr.STaxSchdKey), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.UpdateDate), '') + ISNULL(CONVERT(varchar(255), 
                                              dbo.tarCustAddr.UpdateUserID), '') + ISNULL(CONVERT(varchar(255), dbo.tarCustAddr.WhseKey), '') + ISNULL(CONVERT(varchar(255), 
                                              dbo.tarCustAddr.UsePromoPrice), '') AS MYID, SLX.TARCUSTADDRID, dbo.tarCustAddr.AddrKey, dbo.tarCustAddr.AllowInvtSubst, 
                                              dbo.tarCustAddr.BackOrdPrice, dbo.tarCustAddr.BOLReqd, dbo.tarCustAddr.CarrierAcctNo, dbo.tarCustAddr.CarrierBillMeth, 
                                              dbo.tarCustAddr.CloseSOLineOnFirstShip, dbo.tarCustAddr.CloseSOOnFirstShip, dbo.tarCustAddr.CommPlanKey, 
                                              dbo.tarCustAddr.CreateType, dbo.tarCustAddr.CreateUserID, dbo.tarCustAddr.CreditCardKey, dbo.tarCustAddr.CurrExchSchdKey, 
                                              dbo.tarCustAddr.CurrID, dbo.tarCustAddr.CustAddrID, dbo.tarCustAddr.CustKey, dbo.tarCustAddr.CustPriceGroupKey, 
                                              dbo.tarCustAddr.DfltCntctKey, dbo.tarCustAddr.FOBKey, dbo.tarCustAddr.FreightMethod, dbo.tarCustAddr.ImportLogKey, 
                                              dbo.tarCustAddr.InvcFormKey, dbo.tarCustAddr.InvcMsg, dbo.tarCustAddr.InvoiceReqd, dbo.tarCustAddr.LanguageID, 
                                              dbo.tarCustAddr.PackListContentsReqd, dbo.tarCustAddr.PackListFormKey, dbo.tarCustAddr.PackListReqd, dbo.tarCustAddr.PmtTermsKey, 
                                              dbo.tarCustAddr.PriceAdj, dbo.tarCustAddr.PriceBase, dbo.tarCustAddr.PrintOrderAck, dbo.tarCustAddr.RequireSOAck, 
                                              dbo.tarCustAddr.SalesTerritoryKey, dbo.tarCustAddr.ShipComplete, dbo.tarCustAddr.ShipDays, dbo.tarCustAddr.ShipLabelFormKey, 
                                              dbo.tarCustAddr.ShipLabelsReqd, dbo.tarCustAddr.ShipMethKey, dbo.tarCustAddr.ShipZoneKey, dbo.tarCustAddr.SOAckFormKey, 
                                              dbo.tarCustAddr.SOAckMeth, dbo.tarCustAddr.SperKey, dbo.tarCustAddr.STaxSchdKey, dbo.tarCustAddr.UpdateDate, 
                                              dbo.tarCustAddr.UpdateUserID, dbo.tarCustAddr.WhseKey, dbo.tarCustAddr.UsePromoPrice
                       FROM          dbo.tarCustAddr LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.TARCUSTADDR AS SLX ON dbo.tarCustAddr.AddrKey = SLX.AddrKey) AS SOURCE INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), AddrKey), '') + ISNULL(CONVERT(varchar(255), AllowInvtSubst), '') + ISNULL(CONVERT(varchar(255), 
                                                   BackOrdPrice), '') + ISNULL(CONVERT(varchar(255), BOLReqd), '') + ISNULL(CONVERT(varchar(255), CarrierAcctNo), '') 
                                                   + ISNULL(CONVERT(varchar(255), CarrierBillMeth), '') + ISNULL(CONVERT(varchar(255), CloseSOLineOnFirstShip), '') 
                                                   + ISNULL(CONVERT(varchar(255), CloseSOOnFirstShip), '') + ISNULL(CONVERT(varchar(255), CommPlanKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), CreateType), '') + ISNULL(CONVERT(varchar(255), CreateUserID), '') + ISNULL(CONVERT(varchar(255), 
                                                   CreditCardKey), '') + ISNULL(CONVERT(varchar(255), CurrExchSchdKey), '') + ISNULL(CONVERT(varchar(255), CurrID), '') 
                                                   + ISNULL(CONVERT(varchar(255), CustAddrID), '') + ISNULL(CONVERT(varchar(255), CustKey), '') + ISNULL(CONVERT(varchar(255), 
                                                   CustPriceGroupKey), '') + ISNULL(CONVERT(varchar(255), DfltCntctKey), '') + ISNULL(CONVERT(varchar(255), FOBKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), FreightMethod), '') + ISNULL(CONVERT(varchar(255), ImportLogKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), InvcFormKey), '') + ISNULL(CONVERT(varchar(255), InvcMsg), '') + ISNULL(CONVERT(varchar(255), 
                                                   InvoiceReqd), '') + ISNULL(CONVERT(varchar(255), LanguageID), '') + ISNULL(CONVERT(varchar(255), PackListContentsReqd), '') 
                                                   + ISNULL(CONVERT(varchar(255), PackListFormKey), '') + ISNULL(CONVERT(varchar(255), PackListReqd), '') 
                                                   + ISNULL(CONVERT(varchar(255), PmtTermsKey), '') + ISNULL(CONVERT(varchar(255), PriceAdj), '') + ISNULL(CONVERT(varchar(255), 
                                                   PriceBase), '') + ISNULL(CONVERT(varchar(255), PrintOrderAck), '') + ISNULL(CONVERT(varchar(255), RequireSOAck), '') 
                                                   + ISNULL(CONVERT(varchar(255), SalesTerritoryKey), '') + ISNULL(CONVERT(varchar(255), ShipComplete), '') 
                                                   + ISNULL(CONVERT(varchar(255), ShipDays), '') + ISNULL(CONVERT(varchar(255), ShipLabelFormKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), ShipLabelsReqd), '') + ISNULL(CONVERT(varchar(255), ShipMethKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), ShipZoneKey), '') + ISNULL(CONVERT(varchar(255), SOAckFormKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), SOAckMeth), '') + ISNULL(CONVERT(varchar(255), SperKey), '') + ISNULL(CONVERT(varchar(255), 
                                                   STaxSchdKey), '') + ISNULL(CONVERT(varchar(255), UpdateDate), '') + ISNULL(CONVERT(varchar(255), UpdateUserID), '') 
                                                   + ISNULL(CONVERT(varchar(255), WhseKey), '') + ISNULL(CONVERT(varchar(255), UsePromoPrice), '') AS MYID, TARCUSTADDRID
                            FROM          LiveEAB_SLX.sysdba.TARCUSTADDR AS TARCUSTADDR_1) AS SLX_1 ON SOURCE.MYID <> SLX_1.MYID AND 
                      SOURCE.TARCUSTADDRID = SLX_1.TARCUSTADDRID



GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "SOURCE"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 114
               Right = 232
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX_1"
            Begin Extent = 
               Top = 6
               Left = 270
               Bottom = 84
               Right = 435
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_tarCustAddr_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_tarCustAddr_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]
AS
SELECT    dbo.tarCustomer.*,SLX.TARCUSTOMERID 
FROM         dbo.tarCustomer LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.TARCUSTOMER AS SLX ON dbo.tarCustomer.CustKey  = SLX.CustKey 
WHERE     (SLX.TARCUSTOMERID  IS NULL)




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]
AS
SELECT     Source.MYID, Source.CustKey, Source.ABANo, Source.AllowCustRefund, Source.AllowWriteOff, Source.BillingType, Source.BillToNationalAcctParent, 
                      Source.CompanyID, Source.ConsolidatedStatement, Source.CreateDate, Source.CreateType, Source.CreateUserID, Source.CreditLimit, 
                      Source.CreditLimitAgeCat, Source.CreditLimitUsed, Source.CRMCustID, Source.CurrExchSchdKey, Source.CustClassKey, Source.CustID, 
                      Source.CustName, Source.CustRefNo, Source.DateEstab, Source.DfltBillToAddrKey, Source.DfltItemKey, Source.DfltMaxUpCharge, 
                      Source.DfltMaxUpChargeType, Source.DfltSalesAcctKey, Source.DfltSalesReturnAcctKey, Source.DfltShipToAddrKey, Source.FinChgFlatAmt, 
                      Source.FinChgPct, Source.Hold, Source.ImportLogKey, Source.NationalAcctLevelKey, Source.PmtByNationalAcctParent, Source.PrimaryAddrKey, 
                      Source.PrimaryCntctKey, Source.PrintDunnMsg, Source.ReqCreditLimit, Source.ReqPO, Source.RetntPct, Source.SalesSourceKey, Source.ShipPriority, 
                      Source.Status, Source.StdIndusCodeID, Source.StmtCycleKey, Source.StmtFormKey, Source.TradeDiscPct, Source.UpdateCounter, Source.UpdateDate, 
                      Source.UpdateUserID, Source.UserFld1, Source.UserFld2, Source.UserFld3, Source.UserFld4, Source.VendKey, Source.TARCUSTOMERID
FROM         (SELECT     ISNULL(CONVERT(varchar(255), tarCustomer.CustKey), '') + ISNULL(CONVERT(varchar(255), tarCustomer.ABANo), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.AllowCustRefund), '') + ISNULL(CONVERT(varchar(255), tarCustomer.AllowWriteOff), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.BillingType), '') + ISNULL(CONVERT(varchar(255), tarCustomer.BillToNationalAcctParent), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.CompanyID), '') + ISNULL(CONVERT(varchar(255), tarCustomer.ConsolidatedStatement), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.CreateDate), '') + ISNULL(CONVERT(varchar(255), tarCustomer.CreateType), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.CreateUserID), '') + ISNULL(CONVERT(varchar(255), tarCustomer.CreditLimit), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.CreditLimitAgeCat), '') + ISNULL(CONVERT(varchar(255), tarCustomer.CreditLimitUsed), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.CRMCustID), '') + ISNULL(CONVERT(varchar(255), tarCustomer.CurrExchSchdKey), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.CustClassKey), '') + ISNULL(CONVERT(varchar(255), tarCustomer.CustID), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.CustName), '') + ISNULL(CONVERT(varchar(255), tarCustomer.CustRefNo), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.DateEstab), '') + ISNULL(CONVERT(varchar(255), tarCustomer.DfltBillToAddrKey), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.DfltItemKey), '') + ISNULL(CONVERT(varchar(255), tarCustomer.DfltMaxUpCharge), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.DfltMaxUpChargeType), '') + ISNULL(CONVERT(varchar(255), tarCustomer.DfltSalesAcctKey), 
                                              '') + ISNULL(CONVERT(varchar(255), tarCustomer.DfltSalesReturnAcctKey), '') + ISNULL(CONVERT(varchar(255), 
                                              tarCustomer.DfltShipToAddrKey), '') + ISNULL(CONVERT(varchar(255), tarCustomer.FinChgFlatAmt), '') + ISNULL(CONVERT(varchar(255), 
                                              tarCustomer.FinChgPct), '') + ISNULL(CONVERT(varchar(255), tarCustomer.Hold), '') + ISNULL(CONVERT(varchar(255), 
                                              tarCustomer.ImportLogKey), '') + ISNULL(CONVERT(varchar(255), tarCustomer.NationalAcctLevelKey), '') + ISNULL(CONVERT(varchar(255), 
                                              tarCustomer.PmtByNationalAcctParent), '') + ISNULL(CONVERT(varchar(255), tarCustomer.PrimaryAddrKey), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.PrimaryCntctKey), '') + ISNULL(CONVERT(varchar(255), tarCustomer.PrintDunnMsg), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.ReqCreditLimit), '') + ISNULL(CONVERT(varchar(255), tarCustomer.ReqPO), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.RetntPct), '') + ISNULL(CONVERT(varchar(255), tarCustomer.SalesSourceKey), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.ShipPriority), '') + ISNULL(CONVERT(varchar(255), tarCustomer.Status), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.StdIndusCodeID), '') + ISNULL(CONVERT(varchar(255), tarCustomer.StmtCycleKey), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.StmtFormKey), '') + ISNULL(CONVERT(varchar(255), tarCustomer.TradeDiscPct), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.UpdateCounter), '') + ISNULL(CONVERT(varchar(255), tarCustomer.UpdateDate), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.UpdateUserID), '') + ISNULL(CONVERT(varchar(255), tarCustomer.UserFld1), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.UserFld2), '') + ISNULL(CONVERT(varchar(255), tarCustomer.UserFld3), '') 
                                              + ISNULL(CONVERT(varchar(255), tarCustomer.UserFld4), '') + ISNULL(CONVERT(varchar(255), tarCustomer.VendKey), '') AS MYID, 
                                              tarCustomer.CustKey, tarCustomer.ABANo, tarCustomer.AllowCustRefund, tarCustomer.AllowWriteOff, tarCustomer.BillingType, 
                                              tarCustomer.BillToNationalAcctParent, tarCustomer.CompanyID, tarCustomer.ConsolidatedStatement, tarCustomer.CreateDate, 
                                              tarCustomer.CreateType, tarCustomer.CreateUserID, tarCustomer.CreditLimit, tarCustomer.CreditLimitAgeCat, tarCustomer.CreditLimitUsed, 
                                              tarCustomer.CRMCustID, tarCustomer.CurrExchSchdKey, tarCustomer.CustClassKey, tarCustomer.CustID, tarCustomer.CustName, 
                                              tarCustomer.CustRefNo, tarCustomer.DateEstab, tarCustomer.DfltBillToAddrKey, tarCustomer.DfltItemKey, tarCustomer.DfltMaxUpCharge, 
                                              tarCustomer.DfltMaxUpChargeType, tarCustomer.DfltSalesAcctKey, tarCustomer.DfltSalesReturnAcctKey, tarCustomer.DfltShipToAddrKey, 
                                              tarCustomer.FinChgFlatAmt, tarCustomer.FinChgPct, tarCustomer.Hold, tarCustomer.ImportLogKey, tarCustomer.NationalAcctLevelKey, 
                                              tarCustomer.PmtByNationalAcctParent, tarCustomer.PrimaryAddrKey, tarCustomer.PrimaryCntctKey, tarCustomer.PrintDunnMsg, 
                                              tarCustomer.ReqCreditLimit, tarCustomer.ReqPO, tarCustomer.RetntPct, tarCustomer.SalesSourceKey, tarCustomer.ShipPriority, 
                                              tarCustomer.Status, tarCustomer.StdIndusCodeID, tarCustomer.StmtCycleKey, tarCustomer.StmtFormKey, tarCustomer.TradeDiscPct, 
                                              tarCustomer.UpdateCounter, tarCustomer.UpdateDate, tarCustomer.UpdateUserID, tarCustomer.UserFld1, tarCustomer.UserFld2, 
                                              tarCustomer.UserFld3, tarCustomer.UserFld4, tarCustomer.VendKey, SLX.TARCUSTOMERID
                       FROM          tarCustomer LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.TARCUSTOMER AS SLX ON tarCustomer.CustKey = SLX.CustKey) AS Source INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), CustKey), '') + ISNULL(CONVERT(varchar(255), ABANo), '') + ISNULL(CONVERT(varchar(255), 
                                                   AllowCustRefund), '') + ISNULL(CONVERT(varchar(255), AllowWriteOff), '') + ISNULL(CONVERT(varchar(255), BillingType), '') 
                                                   + ISNULL(CONVERT(varchar(255), BillToNationalAcctParent), '') + ISNULL(CONVERT(varchar(255), CompanyID), '') 
                                                   + ISNULL(CONVERT(varchar(255), ConsolidatedStatement), '') + ISNULL(CONVERT(varchar(255), CreateDate), '') 
                                                   + ISNULL(CONVERT(varchar(255), CreateType), '') + ISNULL(CONVERT(varchar(255), CreateUserID), '') + ISNULL(CONVERT(varchar(255), 
                                                   CreditLimit), '') + ISNULL(CONVERT(varchar(255), CreditLimitAgeCat), '') + ISNULL(CONVERT(varchar(255), CreditLimitUsed), '') 
                                                   + ISNULL(CONVERT(varchar(255), CRMCustID), '') + ISNULL(CONVERT(varchar(255), CurrExchSchdKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), CustClassKey), '') + ISNULL(CONVERT(varchar(255), CustID), '') + ISNULL(CONVERT(varchar(255), 
                                                   CustName), '') + ISNULL(CONVERT(varchar(255), CustRefNo), '') + ISNULL(CONVERT(varchar(255), DateEstab), '') 
                                                   + ISNULL(CONVERT(varchar(255), DfltBillToAddrKey), '') + ISNULL(CONVERT(varchar(255), DfltItemKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), DfltMaxUpCharge), '') + ISNULL(CONVERT(varchar(255), DfltMaxUpChargeType), '') 
                                                   + ISNULL(CONVERT(varchar(255), DfltSalesAcctKey), '') + ISNULL(CONVERT(varchar(255), DfltSalesReturnAcctKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), DfltShipToAddrKey), '') + ISNULL(CONVERT(varchar(255), FinChgFlatAmt), '') 
                                                   + ISNULL(CONVERT(varchar(255), FinChgPct), '') + ISNULL(CONVERT(varchar(255), Hold), '') + ISNULL(CONVERT(varchar(255), 
                                                   ImportLogKey), '') + ISNULL(CONVERT(varchar(255), NationalAcctLevelKey), '') + ISNULL(CONVERT(varchar(255), 
                                                   PmtByNationalAcctParent), '') + ISNULL(CONVERT(varchar(255), PrimaryAddrKey), '') + ISNULL(CONVERT(varchar(255), PrimaryCntctKey), 
                                                   '') + ISNULL(CONVERT(varchar(255), PrintDunnMsg), '') + ISNULL(CONVERT(varchar(255), ReqCreditLimit), '') 
                                                   + ISNULL(CONVERT(varchar(255), ReqPO), '') + ISNULL(CONVERT(varchar(255), RetntPct), '') + ISNULL(CONVERT(varchar(255), 
                                                   SalesSourceKey), '') + ISNULL(CONVERT(varchar(255), ShipPriority), '') + ISNULL(CONVERT(varchar(255), Status), '') 
                                                   + ISNULL(CONVERT(varchar(255), StdIndusCodeID), '') + ISNULL(CONVERT(varchar(255), StmtCycleKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), StmtFormKey), '') + ISNULL(CONVERT(varchar(255), TradeDiscPct), '') + ISNULL(CONVERT(varchar(255), 
                                                   UpdateCounter), '') + ISNULL(CONVERT(varchar(255), UpdateDate), '') + ISNULL(CONVERT(varchar(255), UpdateUserID), '') 
                                                   + ISNULL(CONVERT(varchar(255), UserFld1), '') + ISNULL(CONVERT(varchar(255), UserFld2), '') + ISNULL(CONVERT(varchar(255), 
                                                   UserFld3), '') + ISNULL(CONVERT(varchar(255), UserFld4), '') + ISNULL(CONVERT(varchar(255), VendKey), '') AS MYID, 
                                                   TARCUSTOMERID
                            FROM          LiveEAB_SLX.sysdba.TARCUSTOMER AS TARCUSTOMER_1) AS SLX_1 ON Source.MYID <> SLX_1.MYID AND 
                      Source.TARCUSTOMERID = SLX_1.TARCUSTOMERID




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






CREATE VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]
AS
SELECT    dbo.tarNationalAcct.*,SLX.TARNATIONALACCTID  
FROM         dbo.tarNationalAcct  LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.tarNationalAcct AS SLX ON dbo.tarNationalAcct.NationalAcctKey  = SLX.NationalAcctKey 
WHERE     (SLX.TARNATIONALACCTID   IS NULL)




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]
AS
SELECT     SOURCE.MYID, SOURCE.NationalAcctKey, SOURCE.CompanyID, SOURCE.CreditLimit, SOURCE.CreditLimitUsed, SOURCE.Description, SOURCE.Hold, 
                      SOURCE.NationalAcctID, SOURCE.TARNATIONALACCTID
FROM         (SELECT     ISNULL(CONVERT(varchar(255), tarNationalAcct.NationalAcctKey), '') + ISNULL(CONVERT(varchar(255), tarNationalAcct.CompanyID), '') 
                                              + ISNULL(CONVERT(varchar(255), tarNationalAcct.CreditLimit), '') + ISNULL(CONVERT(varchar(255), tarNationalAcct.CreditLimitUsed), '') 
                                              + ISNULL(CONVERT(varchar(255), tarNationalAcct.Description), '') + ISNULL(CONVERT(varchar(255), tarNationalAcct.Hold), '') 
                                              + ISNULL(CONVERT(varchar(255), tarNationalAcct.NationalAcctID), '') AS MYID, tarNationalAcct.NationalAcctKey, tarNationalAcct.CompanyID, 
                                              tarNationalAcct.CreditLimit, tarNationalAcct.CreditLimitUsed, tarNationalAcct.Description, tarNationalAcct.Hold, 
                                              tarNationalAcct.NationalAcctID, SLX.TARNATIONALACCTID
                       FROM          tarNationalAcct LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.TARNATIONALACCT AS SLX ON tarNationalAcct.NationalAcctKey = SLX.NationalAcctKey) AS SOURCE INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), NationalAcctKey), '') + ISNULL(CONVERT(varchar(255), CompanyID), '') + ISNULL(CONVERT(varchar(255), 
                                                   CreditLimit), '') + ISNULL(CONVERT(varchar(255), CreditLimitUsed), '') + ISNULL(CONVERT(varchar(255), Description), '') 
                                                   + ISNULL(CONVERT(varchar(255), Hold), '') + ISNULL(CONVERT(varchar(255), NationalAcctID), '') AS MYID, TARNATIONALACCTID
                            FROM          LiveEAB_SLX.sysdba.TARNATIONALACCT AS TARNATIONALACCT_1) AS SLX_1 ON SOURCE.MYID <> SLX_1.MYID AND 
                      SOURCE.TARNATIONALACCTID = SLX_1.TARNATIONALACCTID



GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]
AS
SELECT    dbo.tarNationalAcctLevel.*,SLX.TARNATIONALACCTLEVELID  
FROM         dbo.tarNationalAcctLevel   LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.tarNationalAcctLevel AS SLX ON dbo.tarNationalAcctLevel.NationalAcctLevelKey  = SLX.NationalAcctLevelKey 
WHERE     (SLX.TARNATIONALACCTLEVELID    IS NULL)




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]
AS
SELECT     SOURCE.MYID, SOURCE.NationalAcctLevelKey, SOURCE.Description, SOURCE.NationalAcctKey, SOURCE.NationalAcctLevel, 
                      SOURCE.TARNATIONALACCTLEVELID
FROM         (SELECT     ISNULL(CONVERT(varchar(255), tarNationalAcctLevel.NationalAcctLevelKey), '') + ISNULL(CONVERT(varchar(255), 
                                              tarNationalAcctLevel.Description), '') + ISNULL(CONVERT(varchar(255), tarNationalAcctLevel.NationalAcctKey), '') 
                                              + ISNULL(CONVERT(varchar(255), tarNationalAcctLevel.NationalAcctLevel), '') AS MYID, tarNationalAcctLevel.NationalAcctLevelKey, 
                                              tarNationalAcctLevel.Description, tarNationalAcctLevel.NationalAcctKey, tarNationalAcctLevel.NationalAcctLevel, 
                                              SLX.TARNATIONALACCTLEVELID
                       FROM          tarNationalAcctLevel LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.TARNATIONALACCTLEVEL AS SLX ON tarNationalAcctLevel.NationalAcctLevelKey = SLX.NationalAcctLevelKey) 
                      AS SOURCE INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), NationalAcctLevelKey), '') + ISNULL(CONVERT(varchar(255), Description), '') 
                                                   + ISNULL(CONVERT(varchar(255), NationalAcctKey), '') + ISNULL(CONVERT(varchar(255), NationalAcctLevel), '') AS MYID, 
                                                   TARNATIONALACCTLEVELID
                            FROM          LiveEAB_SLX.sysdba.TARNATIONALACCTLEVEL AS TARNATIONALACCTLEVEL_1) AS SLX_1 ON SOURCE.MYID <> SLX_1.MYID AND 
                      SOURCE.TARNATIONALACCTLEVELID = SLX_1.TARNATIONALACCTLEVELID





GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]
AS
SELECT    dbo.timNatAcctProdGrpPrc.*,SLX.TIMNATACCTPRODGRPPRCID   
FROM         dbo.timNatAcctProdGrpPrc    LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timNatAcctProdGrpPrc AS SLX ON dbo.timNatAcctProdGrpPrc.CustProdGrpPrcKey  = SLX.CustProdGrpPrcKey  
WHERE     (SLX.TIMNATACCTPRODGRPPRCID     IS NULL)




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]
AS
SELECT     SOURCE.MYID, SOURCE.CustProdGrpPrcKey, SOURCE.CombineForBreak, SOURCE.EffectiveDate, SOURCE.ExpirationDate, 
                      SOURCE.IgnoreSalesPromotions, SOURCE.NationalAcctKey, SOURCE.PricingKey, SOURCE.ProdPriceGroupKey, SOURCE.UpdateCounter, 
                      SOURCE.WhseKey, SOURCE.TIMNATACCTPRODGRPPRCID
FROM         (SELECT     ISNULL(CONVERT(varchar(255), timNatAcctProdGrpPrc.CustProdGrpPrcKey), '') + ISNULL(CONVERT(varchar(255), 
                                              timNatAcctProdGrpPrc.CombineForBreak), '') + ISNULL(CONVERT(varchar(255), timNatAcctProdGrpPrc.EffectiveDate), '') 
                                              + ISNULL(CONVERT(varchar(255), timNatAcctProdGrpPrc.ExpirationDate), '') + ISNULL(CONVERT(varchar(255), 
                                              timNatAcctProdGrpPrc.IgnoreSalesPromotions), '') + ISNULL(CONVERT(varchar(255), timNatAcctProdGrpPrc.NationalAcctKey), '') 
                                              + ISNULL(CONVERT(varchar(255), timNatAcctProdGrpPrc.PricingKey), '') + ISNULL(CONVERT(varchar(255), 
                                              timNatAcctProdGrpPrc.ProdPriceGroupKey), '') + ISNULL(CONVERT(varchar(255), timNatAcctProdGrpPrc.UpdateCounter), '') 
                                              + ISNULL(CONVERT(varchar(255), timNatAcctProdGrpPrc.WhseKey), '') AS MYID, timNatAcctProdGrpPrc.CustProdGrpPrcKey, 
                                              timNatAcctProdGrpPrc.CombineForBreak, timNatAcctProdGrpPrc.EffectiveDate, timNatAcctProdGrpPrc.ExpirationDate, 
                                              timNatAcctProdGrpPrc.IgnoreSalesPromotions, timNatAcctProdGrpPrc.NationalAcctKey, timNatAcctProdGrpPrc.PricingKey, 
                                              timNatAcctProdGrpPrc.ProdPriceGroupKey, timNatAcctProdGrpPrc.UpdateCounter, timNatAcctProdGrpPrc.WhseKey, 
                                              SLX.TIMNATACCTPRODGRPPRCID
                       FROM          timNatAcctProdGrpPrc LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.TIMNATACCTPRODGRPPRC AS SLX ON timNatAcctProdGrpPrc.CustProdGrpPrcKey = SLX.CustProdGrpPrcKey) 
                      AS SOURCE INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), CustProdGrpPrcKey), '') + ISNULL(CONVERT(varchar(255), CombineForBreak), '') 
                                                   + ISNULL(CONVERT(varchar(255), EffectiveDate), '') + ISNULL(CONVERT(varchar(255), ExpirationDate), '') 
                                                   + ISNULL(CONVERT(varchar(255), IgnoreSalesPromotions), '') + ISNULL(CONVERT(varchar(255), NationalAcctKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), PricingKey), '') + ISNULL(CONVERT(varchar(255), ProdPriceGroupKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), UpdateCounter), '') + ISNULL(CONVERT(varchar(255), WhseKey), '') AS MYID, 
                                                   TIMNATACCTPRODGRPPRCID
                            FROM          LiveEAB_SLX.sysdba.TIMNATACCTPRODGRPPRC AS TIMNATACCTPRODGRPPRC_1) AS SLX_1 ON SOURCE.MYID <> SLX_1.MYID AND 
                      SOURCE.TIMNATACCTPRODGRPPRCID = SLX_1.TIMNATACCTPRODGRPPRCID




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]
AS
SELECT    dbo.timPriceBreak.*,SLX.TIMPRICEBREAKID    
FROM         dbo.timPriceBreak     LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timPriceBreak AS SLX ON dbo.timPriceBreak.PricingKey   = SLX.PricingKey   
WHERE     (SLX.TIMPRICEBREAKID      IS NULL)





GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]
AS
SELECT     SOURCE.MYID, SOURCE.PricingKey, SOURCE.StartOfRange, SOURCE.EndOfRange, SOURCE.PctAdj, SOURCE.PriceOrAmtAdj, 
                      SOURCE.TIMPRICEBREAKID
FROM         (SELECT     ISNULL(CONVERT(varchar(255), timPriceBreak.PricingKey), '') + ISNULL(CONVERT(varchar(255), timPriceBreak.StartOfRange), '') 
                                              + ISNULL(CONVERT(varchar(255), timPriceBreak.EndOfRange), '') + ISNULL(CONVERT(varchar(255), timPriceBreak.PctAdj), '') 
                                              + ISNULL(CONVERT(varchar(255), timPriceBreak.PriceOrAmtAdj), '') AS MYID, timPriceBreak.PricingKey, timPriceBreak.StartOfRange, 
                                              timPriceBreak.EndOfRange, timPriceBreak.PctAdj, timPriceBreak.PriceOrAmtAdj, SLX.TIMPRICEBREAKID
                       FROM          timPriceBreak LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.TIMPRICEBREAK AS SLX ON timPriceBreak.PricingKey = SLX.PricingKey) AS SOURCE INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), PricingKey), '') + ISNULL(CONVERT(varchar(255), StartOfRange), '') + ISNULL(CONVERT(varchar(255), 
                                                   EndOfRange), '') + ISNULL(CONVERT(varchar(255), PctAdj), '') + ISNULL(CONVERT(varchar(255), PriceOrAmtAdj), '') AS MYID, 
                                                   TIMPRICEBREAKID
                            FROM          LiveEAB_SLX.sysdba.TIMPRICEBREAK AS TIMPRICEBREAK_1) AS SLX_1 ON SOURCE.MYID <> SLX_1.MYID AND 
                      SOURCE.TIMPRICEBREAKID = SLX_1.TIMPRICEBREAKID



GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



Create view [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]
as
SELECT     SLX.TIMPRICEGROUPPRICEID, timPriceGroupPrice.WhseKey, timPriceGroupPrice.CustPriceGroupKey, timPriceGroupPrice.ProdPriceGroupKey, 
                      timPriceGroupPrice.EffectiveDate, timPriceGroupPrice.CombineForBreak, timPriceGroupPrice.ExpirationDate, timPriceGroupPrice.PricingKey
FROM         timPriceGroupPrice LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.TIMPRICEGROUPPRICE AS SLX ON timPriceGroupPrice.ProdPriceGroupKey = SLX.ProdPriceGroupKey AND 
                      timPriceGroupPrice.WhseKey = SLX.WhseKey AND timPriceGroupPrice.CustPriceGroupKey = SLX.CustPriceGroupKey
WHERE     (SLX.TIMPRICEGROUPPRICEID IS NULL)


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



Create view [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]
as
SELECT     SOURCE.MYID, SOURCE.TIMPRICEGROUPPRICEID, SOURCE.WhseKey, SOURCE.CustPriceGroupKey, SOURCE.ProdPriceGroupKey, 
                      SOURCE.EffectiveDate, SOURCE.CombineForBreak, SOURCE.ExpirationDate, SOURCE.PricingKey
FROM         (SELECT     ISNULL(CONVERT(varchar(255), timPriceGroupPrice.WhseKey), '') + ISNULL(CONVERT(varchar(255), 
                                              timPriceGroupPrice.CustPriceGroupKey), '') + ISNULL(CONVERT(varchar(255), timPriceGroupPrice.ProdPriceGroupKey), '') 
                                              + ISNULL(CONVERT(varchar(255), timPriceGroupPrice.EffectiveDate), '') + ISNULL(CONVERT(varchar(255), 
                                              timPriceGroupPrice.CombineForBreak), '') + ISNULL(CONVERT(varchar(255), timPriceGroupPrice.ExpirationDate), '') 
                                              + ISNULL(CONVERT(varchar(255), timPriceGroupPrice.PricingKey), '') AS MYID, SLX.TIMPRICEGROUPPRICEID, 
                                              timPriceGroupPrice.WhseKey, timPriceGroupPrice.CustPriceGroupKey, timPriceGroupPrice.ProdPriceGroupKey, 
                                              timPriceGroupPrice.EffectiveDate, timPriceGroupPrice.CombineForBreak, timPriceGroupPrice.ExpirationDate, 
                                              timPriceGroupPrice.PricingKey
                       FROM          timPriceGroupPrice LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.TIMPRICEGROUPPRICE AS SLX ON timPriceGroupPrice.ProdPriceGroupKey = SLX.ProdPriceGroupKey AND 
                                              timPriceGroupPrice.WhseKey = SLX.WhseKey AND timPriceGroupPrice.CustPriceGroupKey = SLX.CustPriceGroupKey) 
                      AS SOURCE INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), WhseKey), '') + ISNULL(CONVERT(varchar(255), CustPriceGroupKey), '') + ISNULL(CONVERT(varchar(255),
                                                    ProdPriceGroupKey), '') + ISNULL(CONVERT(varchar(255), EffectiveDate), '') + ISNULL(CONVERT(varchar(255), CombineForBreak), '') 
                                                   + ISNULL(CONVERT(varchar(255), ExpirationDate), '') + ISNULL(CONVERT(varchar(255), PricingKey), '') AS MYID, 
                                                   TIMPRICEGROUPPRICEID
                            FROM          LiveEAB_SLX.sysdba.TIMPRICEGROUPPRICE AS TIMPRICEGROUPPRICE_1) AS SLX_1 ON SOURCE.MYID <> SLX_1.MYID AND 
                      SOURCE.TIMPRICEGROUPPRICEID = SLX_1.TIMPRICEGROUPPRICEID


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]
AS
SELECT    dbo.timPriceSheet.*,SLX.TIMPRICESHEETID     
FROM         dbo.timPriceSheet      LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timPriceSheet AS SLX ON dbo.timPriceSheet.ItemKey   = SLX.ITEMKEY    
WHERE     (SLX.TIMPRICESHEETID       IS NULL)




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]
AS
SELECT     SOURCE.MYID, SOURCE.WhseKey, SOURCE.ItemKey, SOURCE.EffectiveDate, SOURCE.CurrID, SOURCE.ListPrice, SOURCE.Sheet1Price, 
                      SOURCE.Sheet2Price, SOURCE.Sheet3Price, SOURCE.Sheet4Price, SOURCE.UpdateCounter, SOURCE.TIMPRICESHEETID
FROM         (SELECT     ISNULL(CONVERT(varchar(255), timPriceSheet.WhseKey), '') + ISNULL(CONVERT(varchar(255), timPriceSheet.ItemKey), '') 
                                              + ISNULL(CONVERT(varchar(255), timPriceSheet.EffectiveDate), '') + ISNULL(CONVERT(varchar(255), timPriceSheet.CurrID), '') 
                                              + ISNULL(CONVERT(varchar(255), timPriceSheet.ListPrice), '') + ISNULL(CONVERT(varchar(255), timPriceSheet.Sheet1Price), '') 
                                              + ISNULL(CONVERT(varchar(255), timPriceSheet.Sheet2Price), '') + ISNULL(CONVERT(varchar(255), timPriceSheet.Sheet3Price), '') 
                                              + ISNULL(CONVERT(varchar(255), timPriceSheet.Sheet4Price), '') + ISNULL(CONVERT(varchar(255), timPriceSheet.UpdateCounter), '') 
                                              AS MYID, timPriceSheet.WhseKey, timPriceSheet.ItemKey, timPriceSheet.EffectiveDate, timPriceSheet.CurrID, timPriceSheet.ListPrice, 
                                              timPriceSheet.Sheet1Price, timPriceSheet.Sheet2Price, timPriceSheet.Sheet3Price, timPriceSheet.Sheet4Price, 
                                              timPriceSheet.UpdateCounter, SLX.TIMPRICESHEETID
                       FROM          timPriceSheet LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.TIMPRICESHEET AS SLX ON timPriceSheet.ItemKey = SLX.ITEMKEY) AS SOURCE INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), WHSEKEY), '') + ISNULL(CONVERT(varchar(255), ITEMKEY), '') + ISNULL(CONVERT(varchar(255), 
                                                   EFFECTIVEDATE), '') + ISNULL(CONVERT(varchar(255), CURRID), '') + ISNULL(CONVERT(varchar(255), LISTPRICE), '') 
                                                   + ISNULL(CONVERT(varchar(255), SHEET1PRICE), '') + ISNULL(CONVERT(varchar(255), SHEET2PRICE), '') 
                                                   + ISNULL(CONVERT(varchar(255), SHEET3PRICE), '') + ISNULL(CONVERT(varchar(255), SHEET4PRICE), '') 
                                                   + ISNULL(CONVERT(varchar(255), UPDATECOUNTER), '') AS MYID, TIMPRICESHEETID
                            FROM          LiveEAB_SLX.sysdba.TIMPRICESHEET AS TIMPRICESHEET_1) AS SLX_1 ON SOURCE.MYID <> SLX_1.MYID AND 
                      SOURCE.TIMPRICESHEETID = SLX_1.TIMPRICESHEETID



GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC]
AS
SELECT    dbo.timPricing.*,SLX.TIMPRICINGID      
FROM         dbo.timPricing       LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timPricing AS SLX ON dbo.timPricing.PricingKey   = SLX.PricingKey    
WHERE     (SLX.TIMPRICINGID        IS NULL)





GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]
AS
SELECT     SOURCE.MYID, SOURCE.PricingKey, SOURCE.BreakType, SOURCE.PriceBase, SOURCE.PriceMeth, SOURCE.SubjToRebate, 
                      SOURCE.TIMPRICINGID
FROM         (SELECT     ISNULL(CONVERT(varchar(255), timPricing.PricingKey), '') + ISNULL(CONVERT(varchar(255), timPricing.BreakType), '') 
                                              + ISNULL(CONVERT(varchar(255), timPricing.PriceBase), '') + ISNULL(CONVERT(varchar(255), timPricing.PriceMeth), '') 
                                              + ISNULL(CONVERT(varchar(255), timPricing.SubjToRebate), '') AS MYID, timPricing.PricingKey, timPricing.BreakType, timPricing.PriceBase,
                                               timPricing.PriceMeth, timPricing.SubjToRebate, SLX.TIMPRICINGID
                       FROM          timPricing LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.TIMPRICING AS SLX ON timPricing.PricingKey = SLX.PricingKey) AS SOURCE INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), PricingKey), '') + ISNULL(CONVERT(varchar(255), BreakType), '') + ISNULL(CONVERT(varchar(255), 
                                                   PriceBase), '') + ISNULL(CONVERT(varchar(255), PriceMeth), '') + ISNULL(CONVERT(varchar(255), SubjToRebate), '') AS MYID, 
                                                   TIMPRICINGID
                            FROM          LiveEAB_SLX.sysdba.TIMPRICING AS TIMPRICING_1) AS SLX_1 ON SOURCE.MYID <> SLX_1.MYID AND 
                      SOURCE.TIMPRICINGID = SLX_1.TIMPRICINGID



GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






CREATE VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]
AS
SELECT    dbo.timProdPriceGroup.*,SLX.TIMPRODPRICEGROUPID       
FROM         dbo.timProdPriceGroup       LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timProdPriceGroup AS SLX ON dbo.timProdPriceGroup.ProdPriceGroupKey   = SLX.ProdPriceGroupKey    
WHERE     (SLX.TIMPRODPRICEGROUPID        IS NULL)




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]
AS
SELECT     source.MYID, source.ProdPriceGroupKey, source.CompanyID, source.Description, source.ProdPriceGroupID, source.UpdateCounter, 
                      source.TIMPRODPRICEGROUPID
FROM         (SELECT     ISNULL(CONVERT(varchar(255), timProdPriceGroup.ProdPriceGroupKey), '') + ISNULL(CONVERT(varchar(255), 
                                              timProdPriceGroup.CompanyID), '') + ISNULL(CONVERT(varchar(255), timProdPriceGroup.Description), '') + ISNULL(CONVERT(varchar(255), 
                                              timProdPriceGroup.ProdPriceGroupID), '') + ISNULL(CONVERT(varchar(255), timProdPriceGroup.UpdateCounter), '') AS MYID, 
                                              timProdPriceGroup.ProdPriceGroupKey, timProdPriceGroup.CompanyID, timProdPriceGroup.Description, 
                                              timProdPriceGroup.ProdPriceGroupID, timProdPriceGroup.UpdateCounter, SLX.TIMPRODPRICEGROUPID
                       FROM          timProdPriceGroup LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.TIMPRODPRICEGROUP AS SLX ON timProdPriceGroup.ProdPriceGroupKey = SLX.ProdPriceGroupKey) 
                      AS source INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), ProdPriceGroupKey), '') + ISNULL(CONVERT(varchar(255), CompanyID), '') 
                                                   + ISNULL(CONVERT(varchar(255), Description), '') + ISNULL(CONVERT(varchar(255), ProdPriceGroupID), '') 
                                                   + ISNULL(CONVERT(varchar(255), UpdateCounter), '') AS MYID, TIMPRODPRICEGROUPID
                            FROM          LiveEAB_SLX.sysdba.TIMPRODPRICEGROUP AS TIMPRODPRICEGROUP_1) AS SLX_1 ON source.MYID <> SLX_1.MYID AND 
                      source.TIMPRODPRICEGROUPID = SLX_1.TIMPRODPRICEGROUPID


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






CREATE VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]
AS
SELECT     dbo.timProdPriceGroupPrice.ProdPriceGroupPriceKey, dbo.timProdPriceGroupPrice.CombineForBreak, dbo.timProdPriceGroupPrice.EffectiveDate, 
                      dbo.timProdPriceGroupPrice.ExpirationDate, dbo.timProdPriceGroupPrice.PricingKey, dbo.timProdPriceGroupPrice.ProdPriceGroupKey, 
                      dbo.timProdPriceGroupPrice.UpdateCounter, dbo.timProdPriceGroupPrice.WhseKey, SLX.TIMPRODPRICEGROUPPRICEID
FROM         dbo.timProdPriceGroupPrice LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.TIMPRODPRICEGROUPPRICE AS SLX ON 
                      dbo.timProdPriceGroupPrice.ProdPriceGroupPriceKey = SLX.ProdPriceGroupPriceKey
WHERE     (SLX.TIMPRODPRICEGROUPPRICEID IS NULL)





GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]
AS
SELECT     source.MYID, source.ProdPriceGroupPriceKey, source.CombineForBreak, source.EffectiveDate, source.ExpirationDate, source.PricingKey, 
                      source.ProdPriceGroupKey, source.UpdateCounter, source.WhseKey, source.TIMPRODPRICEGROUPPRICEID
FROM         (SELECT     ISNULL(CONVERT(varchar(255), timProdPriceGroupPrice.ProdPriceGroupPriceKey), '') + ISNULL(CONVERT(varchar(255), 
                                              timProdPriceGroupPrice.CombineForBreak), '') + ISNULL(CONVERT(varchar(255), timProdPriceGroupPrice.EffectiveDate), '') 
                                              + ISNULL(CONVERT(varchar(255), timProdPriceGroupPrice.ExpirationDate), '') + ISNULL(CONVERT(varchar(255), 
                                              timProdPriceGroupPrice.PricingKey), '') + ISNULL(CONVERT(varchar(255), timProdPriceGroupPrice.ProdPriceGroupKey), '') 
                                              + ISNULL(CONVERT(varchar(255), timProdPriceGroupPrice.UpdateCounter), '') + ISNULL(CONVERT(varchar(255), 
                                              timProdPriceGroupPrice.WhseKey), '') AS MYID, timProdPriceGroupPrice.ProdPriceGroupPriceKey, 
                                              timProdPriceGroupPrice.CombineForBreak, timProdPriceGroupPrice.EffectiveDate, timProdPriceGroupPrice.ExpirationDate, 
                                              timProdPriceGroupPrice.PricingKey, timProdPriceGroupPrice.ProdPriceGroupKey, timProdPriceGroupPrice.UpdateCounter, 
                                              timProdPriceGroupPrice.WhseKey, SLX.TIMPRODPRICEGROUPPRICEID
                       FROM          timProdPriceGroupPrice LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.TIMPRODPRICEGROUPPRICE AS SLX ON 
                                              timProdPriceGroupPrice.ProdPriceGroupPriceKey = SLX.ProdPriceGroupPriceKey) AS source INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), ProdPriceGroupPriceKey), '') + ISNULL(CONVERT(varchar(255), CombineForBreak), '') 
                                                   + ISNULL(CONVERT(varchar(255), EffectiveDate), '') + ISNULL(CONVERT(varchar(255), ExpirationDate), '') 
                                                   + ISNULL(CONVERT(varchar(255), PricingKey), '') + ISNULL(CONVERT(varchar(255), ProdPriceGroupKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), UpdateCounter), '') + ISNULL(CONVERT(varchar(255), WhseKey), '') AS MYID, 
                                                   TIMPRODPRICEGROUPPRICEID
                            FROM          LiveEAB_SLX.sysdba.TIMPRODPRICEGROUPPRICE AS TIMPRODPRICEGROUPPRICE_1) AS SLX_1 ON source.MYID <> SLX_1.MYID AND
                       source.TIMPRODPRICEGROUPPRICEID = SLX_1.TIMPRODPRICEGROUPPRICEID



GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]
AS
SELECT    dbo.timWarehouse.*,SLX.TIMWAREHOUSEID        
FROM         dbo.timWarehouse        LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.timWarehouse AS SLX ON dbo.timWarehouse.WhseKey   = SLX.WhseKey     
WHERE     (SLX.TIMWAREHOUSEID         IS NULL)




GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]    Script Date: 03/15/2013 10:33:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]
AS
SELECT     Source.MYID, Source.WhseKey, Source.AllowImmedPickFromSO, Source.AllowImmedShipFromPick, Source.AllowTrnsfrBackOrd, Source.CompanyID, 
                      Source.CostOfCarry, Source.COSAcctKey, Source.CostTierAdjAcctKey, Source.CostToReplenish, Source.CostWhseKey, Source.Description, 
                      Source.DfltLotPickMethod, Source.DfltPickMeth, Source.DfltPickOfOutOfStockItems, Source.ImmedInvcPrinterDest, Source.ImmedInvcRptSettingKey, 
                      Source.ImmedPickPrinterDest, Source.ImmedPickRptSettingKey, Source.InvtAcctKey, Source.IssueAcctKey, Source.LastRankDate, 
                      Source.LastRankInvtPerKey, Source.LastRplnsmntUpdate, Source.MailAddrKey, Source.MaxDemandMult, Source.MaxOrderCycle, 
                      Source.MaxQualLeadTime, Source.MaxQualLeadTimePct, Source.MaxSeasDemandMult, Source.MinDemandMult, Source.MinOrderCycle, 
                      Source.MinQualLeadTimePct, Source.MiscAdjAcctKey, Source.PhysCountAcctKey, Source.PriceWhseKey, Source.PurchAcctKey, Source.ReordMeth, 
                      Source.RestockMeth, Source.RestockRate, Source.SalesAcctKey, Source.SalesOffsetAcctKey, Source.SalesReturnAcctKey, Source.ShipAddrKey, 
                      Source.ShipComplete, Source.SortPickTckt, Source.STaxSchdKey, Source.TrackQtyAtBin, Source.Transit, Source.TrendPct, Source.TrnsfrExpAcctKey, 
                      Source.TrnsfrFrtChrgOpt, Source.TrnsfrMrkupAcctKey, Source.TrnsfrSrchrgOpt, Source.UpdateCounter, Source.UseBins, Source.UseZones, 
                      Source.WhseID, Source.WhseMgrCntctKey, Source.WhseOvrdSegValue, Source.WillCallPickPrinterDest, Source.WillCallPickRptSettingKey, 
                      Source.TIMWAREHOUSEID
FROM         (SELECT     ISNULL(CONVERT(varchar(255), timWarehouse.WhseKey), '') + ISNULL(CONVERT(varchar(255), timWarehouse.AllowImmedPickFromSO), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.AllowImmedShipFromPick), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.AllowTrnsfrBackOrd), '') + ISNULL(CONVERT(varchar(255), timWarehouse.CompanyID), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.CostOfCarry), '') + ISNULL(CONVERT(varchar(255), timWarehouse.COSAcctKey), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.CostTierAdjAcctKey), '') + ISNULL(CONVERT(varchar(255), timWarehouse.CostToReplenish), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.CostWhseKey), '') + ISNULL(CONVERT(varchar(255), timWarehouse.Description), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.DfltLotPickMethod), '') + ISNULL(CONVERT(varchar(255), timWarehouse.DfltPickMeth), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.DfltPickOfOutOfStockItems), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.ImmedInvcPrinterDest), '') + ISNULL(CONVERT(varchar(255), timWarehouse.ImmedInvcRptSettingKey), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.ImmedPickPrinterDest), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.ImmedPickRptSettingKey), '') + ISNULL(CONVERT(varchar(255), timWarehouse.InvtAcctKey), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.IssueAcctKey), '') + ISNULL(CONVERT(varchar(255), timWarehouse.LastRankDate), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.LastRankInvtPerKey), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.LastRplnsmntUpdate), '') + ISNULL(CONVERT(varchar(255), timWarehouse.MailAddrKey), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.MaxDemandMult), '') + ISNULL(CONVERT(varchar(255), timWarehouse.MaxOrderCycle), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.MaxQualLeadTime), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.MaxQualLeadTimePct), '') + ISNULL(CONVERT(varchar(255), timWarehouse.MaxSeasDemandMult), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.MinDemandMult), '') + ISNULL(CONVERT(varchar(255), timWarehouse.MinOrderCycle), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.MinQualLeadTimePct), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.MiscAdjAcctKey), '') + ISNULL(CONVERT(varchar(255), timWarehouse.PhysCountAcctKey), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.PriceWhseKey), '') + ISNULL(CONVERT(varchar(255), timWarehouse.PurchAcctKey), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.ReordMeth), '') + ISNULL(CONVERT(varchar(255), timWarehouse.RestockMeth), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.RestockRate), '') + ISNULL(CONVERT(varchar(255), timWarehouse.SalesAcctKey), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.SalesOffsetAcctKey), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.SalesReturnAcctKey), '') + ISNULL(CONVERT(varchar(255), timWarehouse.ShipAddrKey), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.ShipComplete), '') + ISNULL(CONVERT(varchar(255), timWarehouse.SortPickTckt), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.STaxSchdKey), '') + ISNULL(CONVERT(varchar(255), timWarehouse.TrackQtyAtBin), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.Transit), '') + ISNULL(CONVERT(varchar(255), timWarehouse.TrendPct), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.TrnsfrExpAcctKey), '') + ISNULL(CONVERT(varchar(255), timWarehouse.TrnsfrFrtChrgOpt), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.TrnsfrMrkupAcctKey), '') + ISNULL(CONVERT(varchar(255), timWarehouse.TrnsfrSrchrgOpt),
                                               '') + ISNULL(CONVERT(varchar(255), timWarehouse.UpdateCounter), '') + ISNULL(CONVERT(varchar(255), timWarehouse.UseBins), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.UseZones), '') + ISNULL(CONVERT(varchar(255), timWarehouse.WhseID), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.WhseMgrCntctKey), '') + ISNULL(CONVERT(varchar(255), 
                                              timWarehouse.WhseOvrdSegValue), '') + ISNULL(CONVERT(varchar(255), timWarehouse.WillCallPickPrinterDest), '') 
                                              + ISNULL(CONVERT(varchar(255), timWarehouse.WillCallPickRptSettingKey), '') AS MYID, timWarehouse.WhseKey, 
                                              timWarehouse.AllowImmedPickFromSO, timWarehouse.AllowImmedShipFromPick, timWarehouse.AllowTrnsfrBackOrd, 
                                              timWarehouse.CompanyID, timWarehouse.CostOfCarry, timWarehouse.COSAcctKey, timWarehouse.CostTierAdjAcctKey, 
                                              timWarehouse.CostToReplenish, timWarehouse.CostWhseKey, timWarehouse.Description, timWarehouse.DfltLotPickMethod, 
                                              timWarehouse.DfltPickMeth, timWarehouse.DfltPickOfOutOfStockItems, timWarehouse.ImmedInvcPrinterDest, 
                                              timWarehouse.ImmedInvcRptSettingKey, timWarehouse.ImmedPickPrinterDest, timWarehouse.ImmedPickRptSettingKey, 
                                              timWarehouse.InvtAcctKey, timWarehouse.IssueAcctKey, timWarehouse.LastRankDate, timWarehouse.LastRankInvtPerKey, 
                                              timWarehouse.LastRplnsmntUpdate, timWarehouse.MailAddrKey, timWarehouse.MaxDemandMult, timWarehouse.MaxOrderCycle, 
                                              timWarehouse.MaxQualLeadTime, timWarehouse.MaxQualLeadTimePct, timWarehouse.MaxSeasDemandMult, 
                                              timWarehouse.MinDemandMult, timWarehouse.MinOrderCycle, timWarehouse.MinQualLeadTimePct, timWarehouse.MiscAdjAcctKey, 
                                              timWarehouse.PhysCountAcctKey, timWarehouse.PriceWhseKey, timWarehouse.PurchAcctKey, timWarehouse.ReordMeth, 
                                              timWarehouse.RestockMeth, timWarehouse.RestockRate, timWarehouse.SalesAcctKey, timWarehouse.SalesOffsetAcctKey, 
                                              timWarehouse.SalesReturnAcctKey, timWarehouse.ShipAddrKey, timWarehouse.ShipComplete, timWarehouse.SortPickTckt, 
                                              timWarehouse.STaxSchdKey, timWarehouse.TrackQtyAtBin, timWarehouse.Transit, timWarehouse.TrendPct, 
                                              timWarehouse.TrnsfrExpAcctKey, timWarehouse.TrnsfrFrtChrgOpt, timWarehouse.TrnsfrMrkupAcctKey, timWarehouse.TrnsfrSrchrgOpt, 
                                              timWarehouse.UpdateCounter, timWarehouse.UseBins, timWarehouse.UseZones, timWarehouse.WhseID, 
                                              timWarehouse.WhseMgrCntctKey, timWarehouse.WhseOvrdSegValue, timWarehouse.WillCallPickPrinterDest, 
                                              timWarehouse.WillCallPickRptSettingKey, SLX.TIMWAREHOUSEID
                       FROM          timWarehouse LEFT OUTER JOIN
                                              LiveEAB_SLX.sysdba.TIMWAREHOUSE AS SLX ON timWarehouse.WhseKey = SLX.WhseKey) AS Source INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), WhseKey), '') + ISNULL(CONVERT(varchar(255), AllowImmedPickFromSO), '') 
                                                   + ISNULL(CONVERT(varchar(255), AllowImmedShipFromPick), '') + ISNULL(CONVERT(varchar(255), AllowTrnsfrBackOrd), '') 
                                                   + ISNULL(CONVERT(varchar(255), CompanyID), '') + ISNULL(CONVERT(varchar(255), CostOfCarry), '') + ISNULL(CONVERT(varchar(255), 
                                                   COSAcctKey), '') + ISNULL(CONVERT(varchar(255), CostTierAdjAcctKey), '') + ISNULL(CONVERT(varchar(255), CostToReplenish), '') 
                                                   + ISNULL(CONVERT(varchar(255), CostWhseKey), '') + ISNULL(CONVERT(varchar(255), Description), '') + ISNULL(CONVERT(varchar(255), 
                                                   DfltLotPickMethod), '') + ISNULL(CONVERT(varchar(255), DfltPickMeth), '') + ISNULL(CONVERT(varchar(255), DfltPickOfOutOfStockItems), '') 
                                                   + ISNULL(CONVERT(varchar(255), ImmedInvcPrinterDest), '') + ISNULL(CONVERT(varchar(255), ImmedInvcRptSettingKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), ImmedPickPrinterDest), '') + ISNULL(CONVERT(varchar(255), ImmedPickRptSettingKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), InvtAcctKey), '') + ISNULL(CONVERT(varchar(255), IssueAcctKey), '') + ISNULL(CONVERT(varchar(255), 
                                                   LastRankDate), '') + ISNULL(CONVERT(varchar(255), LastRankInvtPerKey), '') + ISNULL(CONVERT(varchar(255), LastRplnsmntUpdate), '') 
                                                   + ISNULL(CONVERT(varchar(255), MailAddrKey), '') + ISNULL(CONVERT(varchar(255), MaxDemandMult), '') 
                                                   + ISNULL(CONVERT(varchar(255), MaxOrderCycle), '') + ISNULL(CONVERT(varchar(255), MaxQualLeadTime), '') 
                                                   + ISNULL(CONVERT(varchar(255), MaxQualLeadTimePct), '') + ISNULL(CONVERT(varchar(255), MaxSeasDemandMult), '') 
                                                   + ISNULL(CONVERT(varchar(255), MinDemandMult), '') + ISNULL(CONVERT(varchar(255), MinOrderCycle), '') 
                                                   + ISNULL(CONVERT(varchar(255), MinQualLeadTimePct), '') + ISNULL(CONVERT(varchar(255), MiscAdjAcctKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), PhysCountAcctKey), '') + ISNULL(CONVERT(varchar(255), PriceWhseKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), PurchAcctKey), '') + ISNULL(CONVERT(varchar(255), ReordMeth), '') + ISNULL(CONVERT(varchar(255), 
                                                   RestockMeth), '') + ISNULL(CONVERT(varchar(255), RestockRate), '') + ISNULL(CONVERT(varchar(255), SalesAcctKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), SalesOffsetAcctKey), '') + ISNULL(CONVERT(varchar(255), SalesReturnAcctKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), ShipAddrKey), '') + ISNULL(CONVERT(varchar(255), ShipComplete), '') + ISNULL(CONVERT(varchar(255), 
                                                   SortPickTckt), '') + ISNULL(CONVERT(varchar(255), STaxSchdKey), '') + ISNULL(CONVERT(varchar(255), TrackQtyAtBin), '') 
                                                   + ISNULL(CONVERT(varchar(255), Transit), '') + ISNULL(CONVERT(varchar(255), TrendPct), '') + ISNULL(CONVERT(varchar(255), 
                                                   TrnsfrExpAcctKey), '') + ISNULL(CONVERT(varchar(255), TrnsfrFrtChrgOpt), '') + ISNULL(CONVERT(varchar(255), TrnsfrMrkupAcctKey), '') 
                                                   + ISNULL(CONVERT(varchar(255), TrnsfrSrchrgOpt), '') + ISNULL(CONVERT(varchar(255), UpdateCounter), '') 
                                                   + ISNULL(CONVERT(varchar(255), UseBins), '') + ISNULL(CONVERT(varchar(255), UseZones), '') + ISNULL(CONVERT(varchar(255), 
                                                   WhseID), '') + ISNULL(CONVERT(varchar(255), WhseMgrCntctKey), '') + ISNULL(CONVERT(varchar(255), WhseOvrdSegValue), '') 
                                                   + ISNULL(CONVERT(varchar(255), WillCallPickPrinterDest), '') + ISNULL(CONVERT(varchar(255), WillCallPickRptSettingKey), '') AS MYID, 
                                                   TIMWAREHOUSEID
                            FROM          LiveEAB_SLX.sysdba.TIMWAREHOUSE AS TIMWAREHOUSE_1) AS SLX_1 ON Source.MYID <> SLX_1.MYID AND 
                      Source.TIMWAREHOUSEID = SLX_1.TIMWAREHOUSEID




GO



