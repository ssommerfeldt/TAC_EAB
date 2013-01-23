USE [LiveEAB_MAS]
GO

IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_TO_SLX_ERPLinkCustomer_TAC]'))
DROP VIEW [dbo].[vdvMAS_TO_SLX_ERPLinkCustomer_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_TO_SLX_ERPLinkCustomer_TAC]    Script Date: 10/11/2012 15:13:49 ******/
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
/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_CONTACT_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_CONTACT_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_Changed_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_Products_Changed_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_Products_Changed_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_Products_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_Products_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_TarCustomer_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPricing_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]    Script Date: 10/11/2012 15:13:40 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timWarehouse_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]
GO



/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]    Script Date: 10/11/2012 15:13:40 ******/
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
FROM         SalesLogix_TEST.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.ACCOUNT AS SLXAccount ON Source.CustKey = SLXAccount.MASCUSTKEY
WHERE     (SLXAccount.ACCOUNTID IS NULL)


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]    Script Date: 10/11/2012 15:13:40 ******/
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
FROM         SalesLogix_TEST.sysdba.ACCOUNTFINANCIAL AS SLXAccountFinancial RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.ACCOUNT AS SLXAccount ON SLXAccountFinancial.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXAccountFinancial.ACCOUNTID IS NULL)


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]
AS
SELECT     SLXAccount.ACCOUNTID, SLXAccount.TYPE, SLXAccount.ACCOUNT, SLXAccount.SECCODEID, SLXAccount.MODIFYDATE, SLXAccount.MODIFYUSER, 
                      SLXAccount.CREATEDATE, SLXAccount.CREATEUSER
FROM         SalesLogix_TEST.sysdba.ACCOUNT AS SLXAccount LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.ACCOUNTSUMMARY AS SLXAccountSummary ON 
                      SLXAccount.ACCOUNTID = SLXAccountSummary.ACCOUNTID RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXAccountSummary.ACCOUNTID IS NULL)
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]    Script Date: 10/11/2012 15:13:40 ******/
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
                      SalesLogix_TEST.sysdba.ACCOUNT AS SLXACCOUNT ON dbo.tarCustAddr.CustKey = SLXACCOUNT.MASCUSTKEY LEFT OUTER JOIN
                      dbo.tciContact ON dbo.tarCustAddr.DfltCntctKey = dbo.tciContact.CntctKey
WHERE     (dbo.tarCustAddr.AddrKey NOT IN
                          (SELECT     MASADDRKEY
                            FROM          SalesLogix_TEST.sysdba.ADDRESS AS ADDRESS_1
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]    Script Date: 10/11/2012 15:13:40 ******/
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
FROM         SalesLogix_TEST.sysdba.ADDRESS AS SLXAddress RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.ACCOUNT AS SLXAccount ON SLXAddress.ADDRESSID = SLXAccount.ADDRESSID RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXAddress.ADDRESSID IS NULL)


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]
AS
SELECT     SLXAccount.ACCOUNTID, SLXAccount.CREATEUSER, SLXAccount.CREATEDATE, SLXAccount.MODIFYUSER, SLXAccount.MODIFYDATE, 
                      SLXAccount.SECCODEID
FROM         SalesLogix_TEST.sysdba.ERPTRADINGACCOUNT AS SLXErpTradingAccount RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.ACCOUNT AS SLXAccount ON SLXErpTradingAccount.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXErpTradingAccount.ACCOUNTID IS NULL)


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC]    Script Date: 10/11/2012 15:13:40 ******/
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
FROM         SalesLogix_TEST.sysdba.CONTACT AS SLXContact RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.ACCOUNT AS SLXAccount ON SLXContact.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXContact.CONTACTID IS NULL)
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]    Script Date: 10/11/2012 15:13:40 ******/
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
                      SalesLogix_TEST.sysdba.CONTACT AS SLXContact LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.ADDRESS AS SLXAddress ON SLXContact.ADDRESSID = SLXAddress.ADDRESSID ON 
                      Source.MASContactId = SLXContact.MACCONTACTID LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME ON 
                      Source.SperID = SLXUserinfo.ACCOUNTINGUSERID LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.ACCOUNT AS SLXAccount ON Source.CustKey = SLXAccount.MASCUSTKEY
WHERE     (SLXAddress.ADDRESSID IS NULL)

GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_Changed_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[vdvMAS_to_SLX_Products_Changed_TAC]
as
SELECT     distinct TMPSOURCE.*
FROM         (SELECT     ISNULL(CONVERT(varchar(255), CAST(PRODUCTID AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(STOCKITEM AS char)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(SITEID AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(COMMISSIONABLE AS char)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(TAXABLE AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(COMMODITYGROUPID AS char)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(UNITOFMEASUREID AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(SELLINGUOMID AS char)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(PRICE AS decimal(17, 4))), '') + ISNULL(CONVERT(varchar(255), CAST(FIXEDCOST AS decimal(17, 4))), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(SELLINGUOMNUMBER AS float)), '') + ISNULL(CONVERT(varchar(255), CAST(QTYONHAND AS float)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(QTYAVAILABLE AS float)), '') + ISNULL(CONVERT(varchar(255), CAST(SURPLUSQTY AS float)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(QTYONHOLD AS float)), '') + ISNULL(CONVERT(varchar(255), CAST(MAXSTOCKLEVEL AS float)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(TICK AS int)), '') + ISNULL(CONVERT(varchar(255), CAST(MASITEMKEY AS int)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(STOCKVOLUME AS real)), '') + ISNULL(CONVERT(varchar(255), CAST(STOCKWEIGHT AS real)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(DESCRIPTION AS text)), '') + ISNULL(CONVERT(varchar(255), CAST(NAME AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(ACTUALID AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(FAMILY AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(PRODUCTGROUP AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(STATUS AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(UNIT AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(PROGRAM AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(SUPPLIER AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(VENDOR AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(WAREHOUSELOCATION AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(ACCOUNTINGPERIOD AS varchar)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(GLACCOUNTNUMBER AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(GLSUBACCOUNTNUMBER AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(DATAOWNER AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(TYPE AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(GLOBALSYNCID AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(APPID AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(ACTIVEFLAG AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(SELLINGALLOWEDFLAG AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(CLASSIFICATION AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(COMMODITYTYPE AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(UPC AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(MASITEMID AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(WAREHOUSEID AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(COMPANYID AS varchar)), '') AS MYID, PRODUCTID, NAME, DESCRIPTION, ACTUALID, FAMILY, PRICE, PRODUCTGROUP, STATUS, UNIT, 
                                              STOCKVOLUME, STOCKWEIGHT, STOCKITEM, PROGRAM, SUPPLIER, VENDOR, SITEID, WAREHOUSELOCATION, COMMISSIONABLE, TAXABLE, 
                                              ACCOUNTINGPERIOD, GLACCOUNTNUMBER, GLSUBACCOUNTNUMBER, DATAOWNER, TYPE, FIXEDCOST, GLOBALSYNCID, APPID, TICK, 
                                              COMMODITYGROUPID, ACTIVEFLAG, SELLINGALLOWEDFLAG, UNITOFMEASUREID, SELLINGUOMID, SELLINGUOMNUMBER, CLASSIFICATION, 
                                              COMMODITYTYPE, MASITEMKEY, UPC, MASITEMID, WAREHOUSEID, COMPANYID, QTYONHAND, QTYAVAILABLE, SURPLUSQTY, QTYONHOLD, 
                                              MAXSTOCKLEVEL
                       FROM          vdvMAS_to_SLX_Products_TAC) AS TMPSOURCE INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), CAST(PRODUCTID AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(STOCKITEM AS char)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(SITEID AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(COMMISSIONABLE AS char)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(TAXABLE AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(COMMODITYGROUPID AS char)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(UNITOFMEASUREID AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(SELLINGUOMID AS char)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(PRICE AS decimal(17, 4))), '') + ISNULL(CONVERT(varchar(255), CAST(FIXEDCOST AS decimal(17, 4))), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(SELLINGUOMNUMBER AS float)), '') + ISNULL(CONVERT(varchar(255), CAST(QTYONHAND AS float)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(QTYAVAILABLE AS float)), '') + ISNULL(CONVERT(varchar(255), CAST(SURPLUSQTY AS float)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(QTYONHOLD AS float)), '') + ISNULL(CONVERT(varchar(255), CAST(MAXSTOCKLEVEL AS float)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(TICK AS int)), '') + ISNULL(CONVERT(varchar(255), CAST(MASITEMKEY AS int)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(STOCKVOLUME AS real)), '') + ISNULL(CONVERT(varchar(255), CAST(STOCKWEIGHT AS real)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(DESCRIPTION AS text)), '') + ISNULL(CONVERT(varchar(255), CAST(NAME AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(ACTUALID AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(FAMILY AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(PRODUCTGROUP AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(STATUS AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(UNIT AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(PROGRAM AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(SUPPLIER AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(VENDOR AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(WAREHOUSELOCATION AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                                   CAST(ACCOUNTINGPERIOD AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(GLACCOUNTNUMBER AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(GLSUBACCOUNTNUMBER AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(DATAOWNER AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(TYPE AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(GLOBALSYNCID AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(APPID AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(ACTIVEFLAG AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(SELLINGALLOWEDFLAG AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(CLASSIFICATION AS varchar)), 
                                                   '') + ISNULL(CONVERT(varchar(255), CAST(COMMODITYTYPE AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(UPC AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(MASITEMID AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(WAREHOUSEID AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(COMPANYID AS varchar)), '') AS MYID, PRODUCTID, NAME, DESCRIPTION, ACTUALID, FAMILY, PRICE, 
                                                   CREATEDATE, CREATEUSER, MODIFYDATE, MODIFYUSER, PRODUCTGROUP, STATUS, UNIT, STOCKVOLUME, STOCKWEIGHT, STOCKITEM, PROGRAM, 
                                                   SUPPLIER, VENDOR, SITEID, WAREHOUSELOCATION, COMMISSIONABLE, TAXABLE, ACCOUNTINGPERIOD, GLACCOUNTNUMBER, 
                                                   GLSUBACCOUNTNUMBER, DATAOWNER, TYPE, FIXEDCOST, GLOBALSYNCID, APPID, TICK, COMMODITYGROUPID, ACTIVEFLAG, 
                                                   SELLINGALLOWEDFLAG, UNITOFMEASUREID, SELLINGUOMID, SELLINGUOMNUMBER, CLASSIFICATION, COMMODITYTYPE, MASITEMKEY, UPC, 
                                                   MASITEMID, WAREHOUSEID, COMPANYID, QTYONHAND, QTYAVAILABLE, SURPLUSQTY, QTYONHOLD, MAXSTOCKLEVEL
                            FROM          SalesLogix_TEST.sysdba.PRODUCT) AS TMPDESTINATION ON TMPSOURCE.MYID <> TMPDESTINATION.MYID AND 
                      TMPSOURCE.PRODUCTID = TMPDESTINATION.PRODUCTID


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



--**ScriptID**:b059610c-6966-45d8-88ff-71b66fb390a9**

 CREATE VIEW [dbo].[vdvMAS_to_SLX_Products_TAC]
AS
SELECT     Prod.PRODUCTID, dbo.vdvStockStatus.ShortDesc AS NAME, dbo.vdvItem.LongDesc AS DESCRIPTION, dbo.vdvStockStatus.ItemID AS ACTUALID, 
                      dbo.vdvItem.ItemClassName AS FAMILY, dbo.timItem.StdPrice AS PRICE, dbo.vdvItem.ItemTypeAsText AS PRODUCTGROUP, dbo.vdvItem.StatusAsText AS STATUS, 
                      dbo.vdvStockStatus.UnitMeasID AS UNIT, NULL AS STOCKVOLUME, NULL AS STOCKWEIGHT, NULL AS STOCKITEM, NULL AS PROGRAM, NULL AS SUPPLIER, NULL 
                      AS VENDOR, NULL AS SITEID, NULL AS WAREHOUSELOCATION, NULL AS COMMISSIONABLE, NULL AS TAXABLE, NULL AS ACCOUNTINGPERIOD, 
                      dbo.tglAccount.GLAcctNo AS GLACCOUNTNUMBER, NULL AS GLSUBACCOUNTNUMBER, NULL AS DATAOWNER, NULL AS TYPE, NULL AS FIXEDCOST, NULL 
                      AS GLOBALSYNCID, NULL AS APPID, NULL AS TICK, NULL AS COMMODITYGROUPID, NULL AS ACTIVEFLAG, 'T' AS SELLINGALLOWEDFLAG, 
                      dbo.vdvStockStatus.StockUnitMeasKey AS UNITOFMEASUREID, NULL AS SELLINGUOMID, NULL AS SELLINGUOMNUMBER, NULL AS CLASSIFICATION, NULL 
                      AS COMMODITYTYPE, dbo.vdvStockStatus.ItemKey AS MASITEMKEY, dbo.timItemUnitOfMeas.UPC, dbo.vdvStockStatus.ItemID AS MASITEMID, 
                      dbo.vdvStockStatus.WhseID AS WAREHOUSEID, dbo.vdvStockStatus.CompanyID, dbo.vdvStockStatus.QtyOnHand, dbo.vdvStockStatus.QtyAvailable, 
                      dbo.vdvStockStatus.SurplusQty, dbo.vdvStockStatus.QtyOnHold, dbo.vdvStockStatus.MaxStockLevel
FROM         dbo.vdvStockStatus INNER JOIN
                      dbo.timInventory ON dbo.vdvStockStatus.ItemKey = dbo.timInventory.ItemKey AND dbo.vdvStockStatus.WhseKey = dbo.timInventory.WhseKey INNER JOIN
                      dbo.timItem ON dbo.vdvStockStatus.ItemKey = dbo.timItem.ItemKey AND dbo.vdvStockStatus.WhseKey = dbo.vdvStockStatus.WhseKey INNER JOIN
                      dbo.tglAccount ON dbo.timInventory.InvtAcctKey = dbo.tglAccount.GLAcctKey LEFT OUTER JOIN
                      dbo.timItemUnitOfMeas ON dbo.vdvStockStatus.StockUnitMeasKey = dbo.timItemUnitOfMeas.TargetUnitMeasKey AND 
                      dbo.vdvStockStatus.ItemKey = dbo.timItemUnitOfMeas.ItemKey LEFT OUTER JOIN
                      dbo.vdvItem ON dbo.vdvStockStatus.ItemKey = dbo.vdvItem.ItemKey LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.PRODUCT AS Prod ON dbo.vdvStockStatus.CompanyID = Prod.COMPANYID AND dbo.vdvStockStatus.ItemID = Prod.ACTUALID AND 
                      dbo.vdvStockStatus.WhseID = Prod.WAREHOUSEID
WHERE     (Prod.PRODUCTID IS NULL)


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]
AS
SELECT    dbo.tarCustomer.*,SLX.TARCUSTOMERID 
FROM         dbo.tarCustomer LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.TARCUSTOMER AS SLX ON dbo.tarCustomer.CustKey  = SLX.CustKey 
WHERE     (SLX.TARCUSTOMERID  IS NULL)
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]
AS
SELECT    dbo.tarNationalAcct.*,SLX.TARNATIONALACCTID  
FROM         dbo.tarNationalAcct  LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.tarNationalAcct AS SLX ON dbo.tarNationalAcct.NationalAcctKey  = SLX.NationalAcctKey 
WHERE     (SLX.TARNATIONALACCTID   IS NULL)
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]
AS
SELECT    dbo.tarNationalAcctLevel.*,SLX.TARNATIONALACCTLEVELID  
FROM         dbo.tarNationalAcctLevel   LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.tarNationalAcctLevel AS SLX ON dbo.tarNationalAcctLevel.NationalAcctLevelKey  = SLX.NationalAcctLevelKey 
WHERE     (SLX.TARNATIONALACCTLEVELID    IS NULL)
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]
AS
SELECT    dbo.timNatAcctProdGrpPrc.*,SLX.TIMNATACCTPRODGRPPRCID   
FROM         dbo.timNatAcctProdGrpPrc    LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.timNatAcctProdGrpPrc AS SLX ON dbo.timNatAcctProdGrpPrc.CustProdGrpPrcKey  = SLX.CustProdGrpPrcKey  
WHERE     (SLX.TIMNATACCTPRODGRPPRCID     IS NULL)
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]
AS
SELECT    dbo.timPriceBreak.*,SLX.TIMPRICEBREAKID    
FROM         dbo.timPriceBreak     LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.timPriceBreak AS SLX ON dbo.timPriceBreak.PricingKey   = SLX.PricingKey   
WHERE     (SLX.TIMPRICEBREAKID      IS NULL)

GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]
AS
SELECT    dbo.timPriceSheet.*,SLX.TIMPRICESHEETID     
FROM         dbo.timPriceSheet      LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.timPriceSheet AS SLX ON dbo.timPriceSheet.ItemKey   = SLX.ITEMKEY    
WHERE     (SLX.TIMPRICESHEETID       IS NULL)
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC]
AS
SELECT    dbo.timPricing.*,SLX.TIMPRICINGID      
FROM         dbo.timPricing       LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.timPricing AS SLX ON dbo.timPricing.PricingKey   = SLX.PricingKey    
WHERE     (SLX.TIMPRICINGID        IS NULL)

GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]
AS
SELECT    dbo.timProdPriceGroup.*,SLX.TIMPRODPRICEGROUPID       
FROM         dbo.timProdPriceGroup       LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.timProdPriceGroup AS SLX ON dbo.timProdPriceGroup.ProdPriceGroupKey   = SLX.ProdPriceGroupKey    
WHERE     (SLX.TIMPRODPRICEGROUPID        IS NULL)
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]    Script Date: 10/11/2012 15:13:40 ******/
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
                      SalesLogix_TEST.sysdba.TIMPRODPRICEGROUPPRICE AS SLX ON 
                      dbo.timProdPriceGroupPrice.ProdPriceGroupPriceKey = SLX.ProdPriceGroupPriceKey
WHERE     (SLX.TIMPRODPRICEGROUPPRICEID IS NULL)

GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]    Script Date: 10/11/2012 15:13:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]
AS
SELECT    dbo.timWarehouse.*,SLX.TIMWAREHOUSEID        
FROM         dbo.timWarehouse        LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.timWarehouse AS SLX ON dbo.timWarehouse.WhseKey   = SLX.WhseKey     
WHERE     (SLX.TIMWAREHOUSEID         IS NULL)
GO


