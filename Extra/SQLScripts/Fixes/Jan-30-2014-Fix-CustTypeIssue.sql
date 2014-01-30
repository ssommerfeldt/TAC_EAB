--==========================================================
-- Fix Current Submit Orders not working
--==========================================================

Update sysdba.ACCOUNTFINANCIAL
SET     CUSTOMER_TYPE = CustClassName 
FROM         MAS_to_SLXCustomerInfo INNER JOIN
                      sysdba.ACCOUNT ON MAS_to_SLXCustomerInfo.CustKey = sysdba.ACCOUNT.MASCUSTKEY INNER JOIN
                      sysdba.ACCOUNTFINANCIAL ON sysdba.ACCOUNT.ACCOUNTID = sysdba.ACCOUNTFINANCIAL.ACCOUNTID
WHERE     (MAS_to_SLXCustomerInfo.CustKey = '4857')

- Run on MAS To Prepare
Truncate table EAB_SLX.dbo.MAS_to_SLXCustomerInfo
Insert into EAB_SLX.dbo.MAS_to_SLXCustomerInfo
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

