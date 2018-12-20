--USE [mas500_tst_app]
--GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESS_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ADDRESS_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ADDRESS_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_CONTACT_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_CONTACT_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_Products_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_Products_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_Products_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_Products_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_SalesOrderItemShipment_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_SalesOrderItemShipment_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_SalesOrderItemShipment_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TACInventoryItemEXC_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_TACInventoryItemEXC_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_TACInventoryItemEXC_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TACInventoryItemEXC_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_TACInventoryItemEXC_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_TACInventoryItemEXC_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_TarCustomer_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPricing_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timWarehouse_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]    Script Date: 08/11/2014 15:33:32 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]
GO

--USE [mas500_tst_app]
--GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]
AS
SELECT     'Customer' AS TYPE, Source.CustName AS ACCOUNT, Source.ContactPhone AS MAINPHONE, Source.ContactFax AS FAX, ISNULL(SLXSeccode.SECCODEID, 
                      'SYST00000001') AS SECCODEID, 'Active' AS STATUS, SLXUserinfo.USERID AS ACCOUNTMANAGERID, { fn UCASE(Source.CustName) } AS ACCOUNT_UC, 
                      'F' AS DONOTSOLICIT, 'MAS500' AS IMPORTSOURCE, Source.CustKey AS MASCUSTKEY, 'ADMIN' AS CREATEUSER, GETDATE() AS CREATEDATE, 
                      'ADMIN' AS MODIFYUSER, GETDATE() AS MODIFYDATE, SLXAccount.ADDRESSID, SLXAccount.ACCOUNTID, SLXAccount.SHIPPINGID, 
                      Source.PrimaryAddrCurrID AS CURRENCYCODE, NAC.NationalAcctID
FROM         dbo.tarNationalAcct AS NAC RIGHT OUTER JOIN
                      dbo.tarCustomer ON NAC.NationalAcctKey = dbo.tarCustomer.NationalAcctLevelKey LEFT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON dbo.tarCustomer.CustKey = Source.CustKey LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME ON 
                      Source.SperID = SLXUserinfo.ACCOUNTINGUSERID LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ACCOUNT AS SLXAccount ON Source.CustKey = SLXAccount.MASCUSTKEY
WHERE     (SLXAccount.ACCOUNTID IS NULL)




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
         Begin Table = "SLXSeccode"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 114
               Right = 191
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLXUserinfo"
            Begin Extent = 
               Top = 6
               Left = 229
               Bottom = 114
               Right = 436
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Source"
            Begin Extent = 
               Top = 114
               Left = 38
               Bottom = 222
               Right = 262
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLXAccount"
            Begin Extent = 
               Top = 222
               Left = 38
               Bottom = 330
               Right = 263
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "NAC"
            Begin Extent = 
               Top = 6
               Left = 474
               Bottom = 114
               Right = 632
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tarCustomer"
            Begin Extent = 
               Top = 6
               Left = 670
               Bottom = 114
               Right = 872
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
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width = 1500
 ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_ACCOUNT_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'        Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_ACCOUNT_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_ACCOUNT_TAC'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]
AS
SELECT     Source.CustName AS ACCOUNT, Source.ContactPhone AS MAINPHONE, Source.ContactFax AS FAX, ISNULL(SLXSeccode.SECCODEID, 'SYST00000001') 
                      AS SECCODEID, SLXUserinfo.USERID AS ACCOUNTMANAGERID, { fn UCASE(Source.CustName) } AS ACCOUNT_UC, Source.CustKey AS MASCUSTKEY, 
                      Source.PrimaryAddrCurrID AS CURRENCYCODE, SLXAccount.ACCOUNTID, Source.NationalAcctID
FROM         SALESLOGIX_PRODUCTION.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ACCOUNT AS SLXAccount ON Source.CustKey = SLXAccount.MASCUSTKEY


except

SELECT     ACCOUNT, MAINPHONE, FAX, SECCODEID, ACCOUNTMANAGERID, ACCOUNT_UC, MASCUSTKEY, CURRENCYCODE, ACCOUNTID,MASNationalAcctID
FROM         SALESLOGIX_PRODUCTION.sysdba.ACCOUNT




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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_ACCOUNT_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_ACCOUNT_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]    Script Date: 08/11/2014 15:33:34 ******/
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
FROM         SALESLOGIX_PRODUCTION.sysdba.ACCOUNTFINANCIAL AS SLXAccountFinancial RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ACCOUNT AS SLXAccount ON SLXAccountFinancial.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXAccountFinancial.ACCOUNTID IS NULL)










GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]
AS
SELECT     SLXAccount.ACCOUNTID, Source.PrimaryAddrSperName AS SALESPERSON, Source.CustClassName AS CUSTOMER_TYPE, 
Convert(numeric(17,4),Source.CreditLimit) AS CREDIT_LIMIT, 
Convert(int,Source.AvgDaysToPay) AS AVG_DAYS_TO_PAY, 
Convert(int,Source.AvgDaysPastDue) AS AVG_DAYS_OVERDUE, 
Convert(numeric(17,4),Source.Balance) AS BALANCE_FORWARD, 
                      Source.CustID AS CUSTOMERID, Source.CompanyID AS COMPANYCODE, 
 Convert(numeric(17,4),Source.Balance) AS CURRENTBALANCE, SLXAccountFinancial.ACCOUNTFINANCIALID
FROM         SALESLOGIX_PRODUCTION.sysdba.ACCOUNTFINANCIAL AS SLXAccountFinancial RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ACCOUNT AS SLXAccount ON SLXAccountFinancial.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                      vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXAccount.MASCUSTKEY = Source.CustKey

except

SELECT     ACCOUNTID, SALESPERSON, CUSTOMER_TYPE, CREDIT_LIMIT, AVG_DAYS_TO_PAY, AVG_DAYS_OVERDUE, BALANCE_FORWARD, CUSTOMERID, COMPANYCODE, 
                      CURRENTBALANCE, ACCOUNTFINANCIALID
FROM         SALESLOGIX_PRODUCTION.sysdba.ACCOUNTFINANCIAL  





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
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 10
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO









CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]
AS
SELECT     SLXAccount.ACCOUNTID, SLXAccount.TYPE, SLXAccount.ACCOUNT, SLXAccount.SECCODEID, SLXAccount.MODIFYDATE, SLXAccount.MODIFYUSER, 
                      SLXAccount.CREATEDATE, SLXAccount.CREATEUSER
FROM         SALESLOGIX_PRODUCTION.sysdba.ACCOUNT AS SLXAccount LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ACCOUNTSUMMARY AS SLXAccountSummary ON 
                      SLXAccount.ACCOUNTID = SLXAccountSummary.ACCOUNTID RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXAccountSummary.ACCOUNTID IS NULL)








GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]    Script Date: 08/11/2014 15:33:34 ******/
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
                      SALESLOGIX_PRODUCTION.sysdba.ACCOUNT AS SLXACCOUNT ON dbo.tarCustAddr.CustKey = SLXACCOUNT.MASCUSTKEY LEFT OUTER JOIN
                      dbo.tciContact ON dbo.tarCustAddr.DfltCntctKey = dbo.tciContact.CntctKey
WHERE     (dbo.tarCustAddr.AddrKey NOT IN
                          (SELECT     MASADDRKEY
                            FROM          SALESLOGIX_PRODUCTION.sysdba.ADDRESS AS ADDRESS_1
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]    Script Date: 08/11/2014 15:33:34 ******/
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
FROM         SALESLOGIX_PRODUCTION.sysdba.ADDRESS AS SLXAddress RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ACCOUNT AS SLXAccount ON SLXAddress.ADDRESSID = SLXAccount.ADDRESSID RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXAddress.ADDRESSID IS NULL)










GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO









CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]
AS
SELECT     SLXAccount.ACCOUNTID, SLXAccount.CREATEUSER, SLXAccount.CREATEDATE, SLXAccount.MODIFYUSER, SLXAccount.MODIFYDATE, 
                      SLXAccount.SECCODEID
FROM         SALESLOGIX_PRODUCTION.sysdba.ERPTRADINGACCOUNT AS SLXErpTradingAccount RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ACCOUNT AS SLXAccount ON SLXErpTradingAccount.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXErpTradingAccount.ACCOUNTID IS NULL)










GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESS_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







CREATE VIEW [dbo].[vdvMAS_to_SLX_ADDRESS_TAC]
AS
SELECT     SALESLOGIX_PRODUCTION.sysdba.ADDRESS.ADDRESSID, 1 AS ENTITYID, dbo.tciAddress.AddrLine1 AS ADDRESS1, dbo.tciAddress.AddrLine2 AS ADDRESS2, 
                      dbo.tciAddress.City, dbo.tciAddress.StateID, dbo.tciAddress.PostalCode, dbo.tciAddress.CountryID AS COUNTRY, 
                      dbo.tciAddress.AddrLine3 AS ADDRESS3, dbo.tciAddress.AddrLine4 AS ADDRESS4, dbo.tciAddress.AddrName AS ERPNAME, 
                      dbo.tciAddress.AddrKey AS MASADDRKEY
FROM         dbo.tciAddress LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ADDRESS ON dbo.tciAddress.AddrKey = SALESLOGIX_PRODUCTION.sysdba.ADDRESS.MASADDRKEY
WHERE     (SALESLOGIX_PRODUCTION.sysdba.ADDRESS.ADDRESSID IS NULL)







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
         Begin Table = "ADDRESS (SALESLOGIX_PRODUCTION.sysdba)"
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







CREATE VIEW [dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]
AS
SELECT     Source.MYID, Source.ADDRESSID, Source.ENTITYID, Source.ADDRESS1, Source.ADDRESS2, Source.City, Source.StateID, Source.PostalCode, 
                      Source.COUNTRY, Source.ADDRESS3, Source.ADDRESS4, Source.ERPNAME, Source.MASADDRKEY
FROM         (SELECT     ISNULL(CONVERT(varchar(255), SALESLOGIX_PRODUCTION.sysdba.ADDRESS.ADDRESSID), '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrLine1), 
                                              '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrLine2), '') + ISNULL(CONVERT(varchar(255), tciAddress.City), '') 
                                              + ISNULL(CONVERT(varchar(255), tciAddress.StateID), '') + ISNULL(CONVERT(varchar(255), tciAddress.PostalCode), '') 
                                              + ISNULL(CONVERT(varchar(255), SALESLOGIX_PRODUCTION.sysdba.ADDRESS.COUNTRY), '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrLine3), 
                                              '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrLine4), '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrName), '') 
                                              + ISNULL(CONVERT(varchar(255), tciAddress.AddrKey), '') AS MYID, SALESLOGIX_PRODUCTION.sysdba.ADDRESS.ADDRESSID, 1 AS ENTITYID, 
                                              tciAddress.AddrLine1 AS ADDRESS1, tciAddress.AddrLine2 AS ADDRESS2, tciAddress.City, tciAddress.StateID, tciAddress.PostalCode, 
                                              tciAddress.CountryID AS COUNTRY, tciAddress.AddrLine3 AS ADDRESS3, tciAddress.AddrLine4 AS ADDRESS4, 
                                              tciAddress.AddrName AS ERPNAME, tciAddress.AddrKey AS MASADDRKEY
                       FROM          tciAddress LEFT OUTER JOIN
                                              SALESLOGIX_PRODUCTION.sysdba.ADDRESS ON tciAddress.AddrKey = SALESLOGIX_PRODUCTION.sysdba.ADDRESS.MASADDRKEY) AS Source INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), ADDRESSID), '') + ISNULL(CONVERT(varchar(255), ADDRESS1), '') + ISNULL(CONVERT(varchar(255), 
                                                   ADDRESS2), '') + ISNULL(CONVERT(varchar(255), CITY), '') + ISNULL(CONVERT(varchar(255), STATE), '') + ISNULL(CONVERT(varchar(255), 
                                                   POSTALCODE), '') + ISNULL(CONVERT(varchar(255), COUNTRY), '') + ISNULL(CONVERT(varchar(255), ADDRESS3), '') 
                                                   + ISNULL(CONVERT(varchar(255), ADDRESS4), '') + ISNULL(CONVERT(varchar(255), ERPNAME), '') + ISNULL(CONVERT(varchar(255), 
                                                   MASADDRKEY), '') AS MYID, ADDRESSID
                            FROM          SALESLOGIX_PRODUCTION.sysdba.ADDRESS AS ADDRESS_1) AS SLX ON Source.MYID <> SLX.MYID AND Source.ADDRESSID = SLX.ADDRESSID








GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







Create View [dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]
as
SELECT     tarCustomer.DfltBillToAddrKey, tarCustomer.DfltShipToAddrKey, SALESLOGIX_PRODUCTION.sysdba.ACCOUNT.ACCOUNTID, 
                      DFLTBillingAddress.ADDRESSID AS BILLADDRESSID, DFLTShipping.ADDRESSID AS SHIPADDRESSID
FROM         tarCustomer INNER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ACCOUNT ON tarCustomer.CustKey = SALESLOGIX_PRODUCTION.sysdba.ACCOUNT.MASCUSTKEY LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ADDRESS AS DFLTShipping ON tarCustomer.DfltShipToAddrKey = DFLTShipping.MASADDRKEY LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ADDRESS AS DFLTBillingAddress ON tarCustomer.DfltBillToAddrKey = DFLTBillingAddress.MASADDRKEY






GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC]    Script Date: 08/11/2014 15:33:34 ******/
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
FROM         SALESLOGIX_PRODUCTION.sysdba.CONTACT AS SLXContact RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ACCOUNT AS SLXAccount ON SLXContact.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                      SLXAccount.MASCUSTKEY = Source.CustKey
WHERE     (SLXContact.CONTACTID IS NULL)








GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
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
                       FROM          SALESLOGIX_PRODUCTION.sysdba.CONTACT AS SLXContact RIGHT OUTER JOIN
                                              SALESLOGIX_PRODUCTION.sysdba.ACCOUNT AS SLXAccount ON SLXContact.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                                              SALESLOGIX_PRODUCTION.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                                              SALESLOGIX_PRODUCTION.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                                              vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                                              SLXAccount.MASCUSTKEY = Source.CustKey) AS SOURCE_1 INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), CONTACTID), '') + ISNULL(CONVERT(varchar(255), WORKPHONE), '') + ISNULL(CONVERT(varchar(255), 
                                                   FAX), '') + ISNULL(CONVERT(varchar(255), EMAIL), '') + ISNULL(CONVERT(varchar(255), TITLE), '') + ISNULL(CONVERT(varchar(255), 
                                                   MASCONTACTNAME), '') + ISNULL(CONVERT(varchar(255), MAsCONTACTID), '') AS MYID, CONTACTID
                            FROM          SALESLOGIX_PRODUCTION.sysdba.CONTACT) AS slx ON SOURCE_1.MYID <> slx.MYID AND SOURCE_1.CONTACTID = slx.CONTACTID








GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]
AS
SELECT     SLXContact.ADDRESSID, SLXContact.CONTACTID AS ENTITYID, 'Primary' AS TYPE, Source.PrimaryAddrDescription AS DESCRIPTION, 
                      Source.PrimaryAddrLine1 AS ADDRESS1, Source.PrimaryAddrLine2 AS ADDRESS2, Source.PrimaryAddrCity AS CITY, Source.PrimaryAddrState AS STATE, 
                      Source.PrimaryAddrPostalCode AS POSTALCODE, 'PrimaryAddrCountry,' AS COUNTRY, 'T' AS ISPRIMARY, 'T' AS ISMAILING, GETDATE() AS CREATEDATE, 
                      'ADMIN' AS CREATEUSER, GETDATE() AS MODIFYDATE, 'ADMIN' AS MODIFYUSER, Source.PrimaryAddrLine3 AS ADDRESS3, Source.PrimaryAddrLine4 AS ADDRESS4,
                       Source.PrimaryAddrName AS ERPNAME, Source.PrimaryAddrKey AS MASADDRKEY
FROM         dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.CONTACT AS SLXContact LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ADDRESS AS SLXAddress ON SLXContact.ADDRESSID = SLXAddress.ADDRESSID ON 
                      Source.MASContactId = SLXContact.MASCONTACTID LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME ON 
                      Source.SperID = SLXUserinfo.ACCOUNTINGUSERID LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.ACCOUNT AS SLXAccount ON Source.CustKey = SLXAccount.MASCUSTKEY
WHERE     (SLXAddress.ADDRESSID IS NULL)




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
               Right = 262
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLXContact"
            Begin Extent = 
               Top = 114
               Left = 38
               Bottom = 222
               Right = 242
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLXAddress"
            Begin Extent = 
               Top = 6
               Left = 300
               Bottom = 114
               Right = 475
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLXSeccode"
            Begin Extent = 
               Top = 114
               Left = 280
               Bottom = 222
               Right = 433
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLXUserinfo"
            Begin Extent = 
               Top = 222
               Left = 38
               Bottom = 330
               Right = 245
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLXAccount"
            Begin Extent = 
               Top = 330
               Left = 38
               Bottom = 438
               Right = 263
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
 ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_CONTACTaddress_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'        Alias = 900
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_CONTACTaddress_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_CONTACTaddress_TAC'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE VIEW [dbo].[vdvMAS_to_SLX_Products_TAC]
AS
SELECT     SALESLOGIX_PRODUCTION.sysdba.PRODUCT.PRODUCTID, dbo.vdvStockStatus.ShortDesc AS NAME, dbo.timItemDescription.LongDesc AS DESCRIPTION, 
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
                      SALESLOGIX_PRODUCTION.sysdba.PRODUCT ON dbo.vdvStockStatus.WhseID = SALESLOGIX_PRODUCTION.sysdba.PRODUCT.WAREHOUSEID AND 
                      dbo.vdvStockStatus.ItemKey = SALESLOGIX_PRODUCTION.sysdba.PRODUCT.MASITEMKEY AND 
                      dbo.vdvStockStatus.CompanyID = SALESLOGIX_PRODUCTION.sysdba.PRODUCT.COMPANYID
WHERE     (SALESLOGIX_PRODUCTION.sysdba.PRODUCT.PRODUCTID IS NULL)





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
         Begin Table = "PRODUCT (SALESLOGIX_PRODUCTION.sysdba)"
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_Products_TAC_Changed]
AS
SELECT     SALESLOGIX_PRODUCTION.sysdba.PRODUCT.PRODUCTID, dbo.vdvStockStatus.ShortDesc AS NAME,  
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
                      SALESLOGIX_PRODUCTION.sysdba.PRODUCT ON dbo.vdvStockStatus.WhseID = SALESLOGIX_PRODUCTION.sysdba.PRODUCT.WAREHOUSEID AND 
                      dbo.vdvStockStatus.ItemKey = SALESLOGIX_PRODUCTION.sysdba.PRODUCT.MASITEMKEY AND 
                      dbo.vdvStockStatus.CompanyID = SALESLOGIX_PRODUCTION.sysdba.PRODUCT.COMPANYID

Except
SELECT     PRODUCTID, NAME,  ACTUALID, FAMILY, PRICE, PRODUCTGROUP, STATUS, UNIT, STOCKVOLUME, STOCKWEIGHT, STOCKITEM, PROGRAM, 
                      SUPPLIER, VENDOR, SITEID, WAREHOUSELOCATION, COMMISSIONABLE, TAXABLE, ACCOUNTINGPERIOD, GLACCOUNTNUMBER, GLSUBACCOUNTNUMBER, 
                      DATAOWNER, TYPE, FIXEDCOST, GLOBALSYNCID, APPID, TICK, COMMODITYGROUPID, ACTIVEFLAG, SELLINGALLOWEDFLAG, UNITOFMEASUREID, SELLINGUOMID,
                       SELLINGUOMNUMBER, CLASSIFICATION, COMMODITYTYPE, MASITEMKEY, UPC, MASITEMID, WAREHOUSEID, COMPANYID, QTYONHAND, QTYAVAILABLE, 
                      SURPLUSQTY, QTYONHOLD, MAXSTOCKLEVEL, MASPRODPRICEGROUPKEY
FROM         SALESLOGIX_PRODUCTION.sysdba.PRODUCT




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

/****** Object:  View [dbo].[vdvMAS_to_SLX_SalesOrderItemShipment_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_SalesOrderItemShipment_TAC]
AS
SELECT DISTINCT 
                      SLX.SALESORDERID, SLX.SOID, SLX.SALESORDERITEMSID, SLX.LINENUMBER, tmpSOHeader.UserFld1, tmpSOHeader.StatusTXT, dbo.vdvShipmentLine.ShipDate, 
                      dbo.vdvShipmentLine.QtyShipped, dbo.vdvShipmentLine.SchdShipDate
FROM         dbo.vdvShipmentLine RIGHT OUTER JOIN
                          (SELECT     Status, SOKey, UserFld1, 
                                                   CASE status WHEN '0' THEN 'Unacknoledged' WHEN '1' THEN 'Open' WHEN '2' THEN 'Inactive' WHEN '3' THEN 'Canceled' WHEN '4' THEN 'Closed' WHEN
                                                    '5' THEN 'Incomplete' WHEN '6' THEN 'Pending Approval' END AS StatusTXT
                            FROM          dbo.tsoSalesOrder
                            WHERE      (UserFld1 IS NOT NULL) AND (UserFld1 <> '')) AS tmpSOHeader ON dbo.vdvShipmentLine.SOKey = tmpSOHeader.SOKey RIGHT OUTER JOIN
                          (SELECT     SOH.SALESORDERID, SOH.ALTERNATEKEYPREFIX + '-' + SOH.ALTERNATEKEYSUFFIX AS SOID, SOLine.SALESORDERITEMSID, 
                                                   SOLine.LINENUMBER
                            FROM          SALESLOGIX_PRODUCTION.sysdba.SALESORDER AS SOH INNER JOIN
                                                   SALESLOGIX_PRODUCTION.sysdba.SALESORDERITEMS AS SOLine ON SOH.SALESORDERID = SOLine.SALESORDERID) AS SLX ON 
                      tmpSOHeader.UserFld1 = SLX.SOID
WHERE     (tmpSOHeader.StatusTXT IS NOT NULL)

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
         Begin Table = "vdvShipmentLine"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 114
               Right = 206
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tmpSOHeader"
            Begin Extent = 
               Top = 6
               Left = 244
               Bottom = 114
               Right = 395
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX"
            Begin Extent = 
               Top = 114
               Left = 38
               Bottom = 222
               Right = 224
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_SalesOrderItemShipment_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_SalesOrderItemShipment_TAC'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TACInventoryItemEXC_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_TACInventoryItemEXC_TAC]
as
SELECT     Source.PctAdj, Source.PriceOrAmtAdj, Source.CompanyID, Source.PriceMeth, Source.ItemKey
FROM         (SELECT     timPriceBreak.PctAdj, timPriceBreak.PriceOrAmtAdj, timItem.CompanyID, timPricing.PriceMeth, timItem.ItemKey
                       FROM          timItem RIGHT OUTER JOIN
                                              timItemPrice AS timCustItemPrice ON timItem.ItemKey = timCustItemPrice.ItemKey RIGHT OUTER JOIN
                                              timPriceBreak ON timCustItemPrice.PricingKey = timPriceBreak.PricingKey LEFT OUTER JOIN
                                              timPricing ON timPriceBreak.PricingKey = timPricing.PricingKey
                       WHERE      (timCustItemPrice.CustPriceGroupKey IS NULL) AND (timItem.ItemKey IS NOT NULL)) AS Source LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TACINVENTORYITEMEXC ON Source.ItemKey = SALESLOGIX_PRODUCTION.sysdba.TACINVENTORYITEMEXC.ITEMKEY
WHERE     (SALESLOGIX_PRODUCTION.sysdba.TACINVENTORYITEMEXC.TACINVENTORYITEMEXCID IS NULL)


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TACInventoryItemEXC_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_TACInventoryItemEXC_TAC_Changed]
as
SELECT     Source.PctAdj, Source.PriceOrAmtAdj, Source.CompanyID, Source.PriceMeth, Source.ItemKey, 
                      SALESLOGIX_PRODUCTION.sysdba.TACINVENTORYITEMEXC.TACINVENTORYITEMEXCID
FROM         (SELECT     timPriceBreak.PctAdj, timPriceBreak.PriceOrAmtAdj, timItem.CompanyID, timPricing.PriceMeth, timItem.ItemKey
                       FROM          timItem RIGHT OUTER JOIN
                                              timItemPrice AS timCustItemPrice ON timItem.ItemKey = timCustItemPrice.ItemKey RIGHT OUTER JOIN
                                              timPriceBreak ON timCustItemPrice.PricingKey = timPriceBreak.PricingKey LEFT OUTER JOIN
                                              timPricing ON timPriceBreak.PricingKey = timPricing.PricingKey
                       WHERE      (timCustItemPrice.CustPriceGroupKey IS NULL) AND (timItem.ItemKey IS NOT NULL)) AS Source LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TACINVENTORYITEMEXC ON Source.ItemKey = SALESLOGIX_PRODUCTION.sysdba.TACINVENTORYITEMEXC.ITEMKEY
except
SELECT     PCTADJ, PRICEORAMTADJ, COMPANYID, PRICEMETH, ITEMKEY, TACINVENTORYITEMEXCID
FROM         SALESLOGIX_PRODUCTION.sysdba.TACINVENTORYITEMEXC  


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



Create View  [dbo].[vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC]
as

SELECT     SALESLOGIX_PRODUCTION.sysdba.TACNATIONALACCTITEMEXC.TACNATIONALACCTITEMEXCID, Source.WhseID, Source.ItemID, Source.Description, Source.CustID, 
                      Source.CustName, Source.PctAdj, Source.ListPrice, Source.PriceMeth, Source.PriceOrAmtAdj
FROM         (SELECT DISTINCT 
                                              timWarehouse.WhseID, timItem.ItemID, tarNationalAcct.Description, tarCustomer.CustID, tarCustomer.CustName, timPricing.BreakType, 
                                              timPricing.PriceBase, timPricing.PriceMeth, timPriceBreak.PctAdj, timPriceBreak.PriceOrAmtAdj, timPriceSheet.CurrID, timPriceSheet.ListPrice, 
                                              timPriceSheet.Sheet1Price, timPriceSheet.Sheet2Price, timPriceSheet.Sheet3Price, timPriceSheet.Sheet4Price
                       FROM          timNatAcctItemPrice LEFT OUTER JOIN
                                              tarNationalAcct ON timNatAcctItemPrice.NationalAcctKey = tarNationalAcct.NationalAcctKey LEFT OUTER JOIN
                                              timWarehouse ON timNatAcctItemPrice.WhseKey = timWarehouse.WhseKey LEFT OUTER JOIN
                                              timItem ON timNatAcctItemPrice.ItemKey = timItem.ItemKey LEFT OUTER JOIN
                                              tarNationalAcctLevel ON tarNationalAcct.NationalAcctKey = tarNationalAcctLevel.NationalAcctKey LEFT OUTER JOIN
                                              tarCustomer ON tarNationalAcctLevel.NationalAcctLevelKey = tarCustomer.NationalAcctLevelKey LEFT OUTER JOIN
                                              timPricing ON timNatAcctItemPrice.PricingKey = timPricing.PricingKey LEFT OUTER JOIN
                                              timPriceBreak ON timNatAcctItemPrice.PricingKey = timPriceBreak.PricingKey AND timPricing.PricingKey = timPriceBreak.PricingKey LEFT OUTER JOIN
                                              timItemPrice ON timWarehouse.WhseKey = timItemPrice.WhseKey AND timItem.ItemKey = timItemPrice.ItemKey LEFT OUTER JOIN
                                              timPriceSheet ON timNatAcctItemPrice.WhseKey = timPriceSheet.WhseKey AND timItemPrice.ItemKey = timPriceSheet.ItemKey) 
                      AS Source LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TACNATIONALACCTITEMEXC ON Source.WhseID = SALESLOGIX_PRODUCTION.sysdba.TACNATIONALACCTITEMEXC.WHSEID AND 
                      Source.ItemID = SALESLOGIX_PRODUCTION.sysdba.TACNATIONALACCTITEMEXC.ITEMID AND 
                      Source.CustID = SALESLOGIX_PRODUCTION.sysdba.TACNATIONALACCTITEMEXC.CUSTID
WHERE     (SALESLOGIX_PRODUCTION.sysdba.TACNATIONALACCTITEMEXC.TACNATIONALACCTITEMEXCID IS  NULL)


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



Create View  [dbo].[vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC_Changed]
as

SELECT     SALESLOGIX_PRODUCTION.sysdba.TACNATIONALACCTITEMEXC.TACNATIONALACCTITEMEXCID, Source.WhseID, Source.ItemID, Source.Description, Source.CustID, 
                      Source.CustName, Source.PctAdj, Source.ListPrice, Source.PriceMeth, Source.PriceOrAmtAdj
FROM         (SELECT DISTINCT 
                                              timWarehouse.WhseID, timItem.ItemID, tarNationalAcct.Description, tarCustomer.CustID, tarCustomer.CustName, timPricing.BreakType, 
                                              timPricing.PriceBase, timPricing.PriceMeth, timPriceBreak.PctAdj, timPriceBreak.PriceOrAmtAdj, timPriceSheet.CurrID, timPriceSheet.ListPrice, 
                                              timPriceSheet.Sheet1Price, timPriceSheet.Sheet2Price, timPriceSheet.Sheet3Price, timPriceSheet.Sheet4Price
                       FROM          timNatAcctItemPrice LEFT OUTER JOIN
                                              tarNationalAcct ON timNatAcctItemPrice.NationalAcctKey = tarNationalAcct.NationalAcctKey LEFT OUTER JOIN
                                              timWarehouse ON timNatAcctItemPrice.WhseKey = timWarehouse.WhseKey LEFT OUTER JOIN
                                              timItem ON timNatAcctItemPrice.ItemKey = timItem.ItemKey LEFT OUTER JOIN
                                              tarNationalAcctLevel ON tarNationalAcct.NationalAcctKey = tarNationalAcctLevel.NationalAcctKey LEFT OUTER JOIN
                                              tarCustomer ON tarNationalAcctLevel.NationalAcctLevelKey = tarCustomer.NationalAcctLevelKey LEFT OUTER JOIN
                                              timPricing ON timNatAcctItemPrice.PricingKey = timPricing.PricingKey LEFT OUTER JOIN
                                              timPriceBreak ON timNatAcctItemPrice.PricingKey = timPriceBreak.PricingKey AND timPricing.PricingKey = timPriceBreak.PricingKey LEFT OUTER JOIN
                                              timItemPrice ON timWarehouse.WhseKey = timItemPrice.WhseKey AND timItem.ItemKey = timItemPrice.ItemKey LEFT OUTER JOIN
                                              timPriceSheet ON timNatAcctItemPrice.WhseKey = timPriceSheet.WhseKey AND timItemPrice.ItemKey = timPriceSheet.ItemKey) 
                      AS Source LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TACNATIONALACCTITEMEXC ON Source.WhseID = SALESLOGIX_PRODUCTION.sysdba.TACNATIONALACCTITEMEXC.WHSEID AND 
                      Source.ItemID = SALESLOGIX_PRODUCTION.sysdba.TACNATIONALACCTITEMEXC.ITEMID AND 
                      Source.CustID = SALESLOGIX_PRODUCTION.sysdba.TACNATIONALACCTITEMEXC.CUSTID

Except


SELECT     TACNATIONALACCTITEMEXCID, WHSEID, ITEMID, DESCRIPTION, CUSTID, CUSTNAME, PCTADJ, 
                      LISTPRICE, PRICEMETH, PRICEORAMTADJ
FROM         SALESLOGIX_PRODUCTION.sysdba.TACNATIONALACCTITEMEXC


GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]    Script Date: 08/11/2014 15:33:34 ******/
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
                      SALESLOGIX_PRODUCTION.sysdba.TARCUSTADDR AS SLX ON tarCustAddr.AddrKey = SLX.AddrKey
WHERE     (SLX.TARCUSTADDRID IS NULL)






GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]
AS
SELECT     SLX.TARCUSTADDRID, tarCustAddr.AddrKey, tarCustAddr.AllowInvtSubst, tarCustAddr.BackOrdPrice, tarCustAddr.BOLReqd, tarCustAddr.CarrierAcctNo, 
                      tarCustAddr.CarrierBillMeth, tarCustAddr.CloseSOLineOnFirstShip, tarCustAddr.CloseSOOnFirstShip, tarCustAddr.CommPlanKey, tarCustAddr.CreateType, 
                      tarCustAddr.CreateUserID, tarCustAddr.CreditCardKey, tarCustAddr.CurrExchSchdKey, tarCustAddr.CurrID, tarCustAddr.CustAddrID, tarCustAddr.CustKey, 
                      tarCustAddr.CustPriceGroupKey, tarCustAddr.DfltCntctKey, tarCustAddr.FOBKey, tarCustAddr.FreightMethod, tarCustAddr.ImportLogKey, tarCustAddr.InvcFormKey, 
                      tarCustAddr.InvcMsg, tarCustAddr.InvoiceReqd, tarCustAddr.LanguageID, tarCustAddr.PackListContentsReqd, tarCustAddr.PackListFormKey, tarCustAddr.PackListReqd, 
                      tarCustAddr.PmtTermsKey, tarCustAddr.PriceAdj, tarCustAddr.PriceBase, tarCustAddr.PrintOrderAck, tarCustAddr.RequireSOAck, tarCustAddr.SalesTerritoryKey, 
                      tarCustAddr.ShipComplete, tarCustAddr.ShipDays, tarCustAddr.ShipLabelFormKey, tarCustAddr.ShipLabelsReqd, tarCustAddr.ShipMethKey, tarCustAddr.ShipZoneKey, 
                      tarCustAddr.SOAckFormKey, tarCustAddr.SOAckMeth, tarCustAddr.SperKey, tarCustAddr.STaxSchdKey, tarCustAddr.UpdateUserID, tarCustAddr.WhseKey, 
                      tarCustAddr.UsePromoPrice
FROM         tarCustAddr LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TARCUSTADDR AS SLX ON tarCustAddr.AddrKey = SLX.AddrKey


Except
SELECT     TARCUSTADDRID, AddrKey, AllowInvtSubst, BackOrdPrice, BOLReqd, CarrierAcctNo, CarrierBillMeth, CloseSOLineOnFirstShip, CloseSOOnFirstShip, CommPlanKey, 
                      CreateType, CreateUserID, CreditCardKey, CurrExchSchdKey, CurrID, CustAddrID, CustKey, CustPriceGroupKey, DfltCntctKey, FOBKey, FreightMethod, ImportLogKey, 
                      InvcFormKey, InvcMsg, InvoiceReqd, LanguageID, PackListContentsReqd, PackListFormKey, PackListReqd, PmtTermsKey, PriceAdj, PriceBase, PrintOrderAck, 
                      RequireSOAck, SalesTerritoryKey, ShipComplete, ShipDays, ShipLabelFormKey, ShipLabelsReqd, ShipMethKey, ShipZoneKey, SOAckFormKey, SOAckMeth, SperKey, 
                      STaxSchdKey, UpdateUserID, WhseKey, UsePromoPrice
FROM         SALESLOGIX_PRODUCTION.sysdba.TARCUSTADDR AS SLX




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

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO









CREATE VIEW [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]
AS
SELECT    dbo.tarCustomer.*,SLX.TARCUSTOMERID 
FROM         dbo.tarCustomer LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TARCUSTOMER AS SLX ON dbo.tarCustomer.CustKey  = SLX.CustKey 
WHERE     (SLX.TARCUSTOMERID  IS NULL)








GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]
AS
SELECT     tarCustomer.CustKey, tarCustomer.ABANo, tarCustomer.AllowCustRefund, tarCustomer.AllowWriteOff, tarCustomer.BillingType, tarCustomer.BillToNationalAcctParent, 
                      tarCustomer.CompanyID, tarCustomer.ConsolidatedStatement, tarCustomer.CreateType, tarCustomer.CreateUserID, tarCustomer.CreditLimit, 
                      tarCustomer.CreditLimitAgeCat, tarCustomer.CreditLimitUsed, tarCustomer.CRMCustID, tarCustomer.CurrExchSchdKey, tarCustomer.CustClassKey, 
                      tarCustomer.CustID, tarCustomer.CustName, tarCustomer.CustRefNo,  tarCustomer.DfltBillToAddrKey, tarCustomer.DfltItemKey, 
                      tarCustomer.DfltMaxUpCharge, tarCustomer.DfltMaxUpChargeType, tarCustomer.DfltSalesAcctKey, tarCustomer.DfltSalesReturnAcctKey, 
                      tarCustomer.DfltShipToAddrKey, tarCustomer.FinChgFlatAmt, tarCustomer.FinChgPct, tarCustomer.Hold, tarCustomer.ImportLogKey, 
                      tarCustomer.NationalAcctLevelKey, tarCustomer.PmtByNationalAcctParent, tarCustomer.PrimaryAddrKey, tarCustomer.PrimaryCntctKey, tarCustomer.PrintDunnMsg, 
                      tarCustomer.ReqCreditLimit, tarCustomer.ReqPO, tarCustomer.RetntPct, tarCustomer.SalesSourceKey, tarCustomer.ShipPriority, tarCustomer.Status, 
                      tarCustomer.StdIndusCodeID, tarCustomer.StmtCycleKey, tarCustomer.StmtFormKey, tarCustomer.TradeDiscPct, tarCustomer.UpdateCounter, 
                       tarCustomer.UpdateUserID, tarCustomer.UserFld1, tarCustomer.UserFld2, tarCustomer.UserFld3, tarCustomer.UserFld4, tarCustomer.VendKey, 
                      SLX.TARCUSTOMERID
                      
FROM         tarCustomer LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TARCUSTOMER AS SLX ON tarCustomer.CustKey = SLX.CustKey
except
SELECT     CustKey, ABANo, AllowCustRefund, AllowWriteOff, BillingType, BillToNationalAcctParent, CompanyID, ConsolidatedStatement,CreateType, CreateUserID, 
                      CreditLimit, CreditLimitAgeCat, CreditLimitUsed, CRMCustID, CurrExchSchdKey, CustClassKey, CustID, CustName, CustRefNo,  DfltBillToAddrKey, 
                      DfltItemKey, DfltMaxUpCharge, DfltMaxUpChargeType, DfltSalesAcctKey, DfltSalesReturnAcctKey, DfltShipToAddrKey, FinChgFlatAmt, FinChgPct, Hold, ImportLogKey, 
                      NationalAcctLevelKey, PmtByNationalAcctParent, PrimaryAddrKey, PrimaryCntctKey, PrintDunnMsg, ReqCreditLimit, ReqPO, RetntPct, SalesSourceKey, ShipPriority, 
                      Status, StdIndusCodeID, StmtCycleKey, StmtFormKey, TradeDiscPct, UpdateCounter,  UpdateUserID, UserFld1, UserFld2, UserFld3, UserFld4, VendKey, 
                      TARCUSTOMERID
FROM         SALESLOGIX_PRODUCTION.sysdba.TARCUSTOMER




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
         Top = -288
         Left = 0
      End
      Begin Tables = 
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 58
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
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Fil' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_TarCustomer_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'ter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_TarCustomer_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_TarCustomer_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO










CREATE VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]
AS
SELECT    dbo.tarNationalAcct.*,SLX.TARNATIONALACCTID  
FROM         dbo.tarNationalAcct  LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.tarNationalAcct AS SLX ON dbo.tarNationalAcct.NationalAcctKey  = SLX.NationalAcctKey 
WHERE     (SLX.TARNATIONALACCTID   IS NULL)








GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]
AS
SELECT     tarNationalAcct.NationalAcctKey, tarNationalAcct.CompanyID, tarNationalAcct.CreditLimit, tarNationalAcct.CreditLimitUsed, tarNationalAcct.Description, 
                      tarNationalAcct.Hold, tarNationalAcct.NationalAcctID, SLX.TARNATIONALACCTID
FROM         tarNationalAcct LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TARNATIONALACCT AS SLX ON tarNationalAcct.NationalAcctKey = SLX.NationalAcctKey 

Except

SELECT     NationalAcctKey, CompanyID, CreditLimit, CreditLimitUsed, Description, Hold, NationalAcctID, TARNATIONALACCTID
FROM         SALESLOGIX_PRODUCTION.sysdba.TARNATIONALACCT




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
               Right = 227
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX_1"
            Begin Extent = 
               Top = 6
               Left = 265
               Bottom = 84
               Right = 454
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_tarNationalAcct_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_tarNationalAcct_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO









CREATE VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]
AS
SELECT    dbo.tarNationalAcctLevel.*,SLX.TARNATIONALACCTLEVELID  
FROM         dbo.tarNationalAcctLevel   LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.tarNationalAcctLevel AS SLX ON dbo.tarNationalAcctLevel.NationalAcctLevelKey  = SLX.NationalAcctLevelKey 
WHERE     (SLX.TARNATIONALACCTLEVELID    IS NULL)








GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]
AS
SELECT     tarNationalAcctLevel.NationalAcctLevelKey, tarNationalAcctLevel.Description, tarNationalAcctLevel.NationalAcctKey, tarNationalAcctLevel.NationalAcctLevel, 
                      SLX.TARNATIONALACCTLEVELID
FROM         tarNationalAcctLevel LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TARNATIONALACCTLEVEL AS SLX ON tarNationalAcctLevel.NationalAcctLevelKey = SLX.NationalAcctLevelKey
Except

SELECT     NationalAcctLevelKey, Description, NationalAcctKey, NationalAcctLevel, TARNATIONALACCTLEVELID
FROM         SALESLOGIX_PRODUCTION.sysdba.TARNATIONALACCTLEVEL AS SLX




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
               Right = 255
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX_1"
            Begin Extent = 
               Top = 114
               Left = 38
               Bottom = 192
               Right = 255
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO









CREATE VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]
AS
SELECT    dbo.timNatAcctProdGrpPrc.*,SLX.TIMNATACCTPRODGRPPRCID   
FROM         dbo.timNatAcctProdGrpPrc    LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.timNatAcctProdGrpPrc AS SLX ON dbo.timNatAcctProdGrpPrc.CustProdGrpPrcKey  = SLX.CustProdGrpPrcKey  
WHERE     (SLX.TIMNATACCTPRODGRPPRCID     IS NULL)








GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]
AS
SELECT     timNatAcctProdGrpPrc.CustProdGrpPrcKey, timNatAcctProdGrpPrc.CombineForBreak, timNatAcctProdGrpPrc.IgnoreSalesPromotions, 
                      timNatAcctProdGrpPrc.NationalAcctKey, timNatAcctProdGrpPrc.PricingKey, timNatAcctProdGrpPrc.ProdPriceGroupKey, timNatAcctProdGrpPrc.UpdateCounter, 
                      timNatAcctProdGrpPrc.WhseKey, SLX.TIMNATACCTPRODGRPPRCID, timNatAcctProdGrpPrc.EffectiveDate, timNatAcctProdGrpPrc.ExpirationDate
FROM         timNatAcctProdGrpPrc LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TIMNATACCTPRODGRPPRC AS SLX ON timNatAcctProdGrpPrc.CustProdGrpPrcKey = SLX.CustProdGrpPrcKey

Except

SELECT     CustProdGrpPrcKey, CombineForBreak, IgnoreSalesPromotions, NationalAcctKey, PricingKey, ProdPriceGroupKey, UpdateCounter, WhseKey, 
                      TIMNATACCTPRODGRPPRCID, EffectiveDate, ExpirationDate
FROM         SALESLOGIX_PRODUCTION.sysdba.TIMNATACCTPRODGRPPRC AS SLX





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
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO









CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]
AS
SELECT    dbo.timPriceBreak.*,SLX.TIMPRICEBREAKID    
FROM         dbo.timPriceBreak     LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.timPriceBreak AS SLX ON dbo.timPriceBreak.PricingKey   = SLX.PricingKey   
WHERE     (SLX.TIMPRICEBREAKID      IS NULL)









GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]
AS
SELECT     timPriceBreak.PricingKey, timPriceBreak.StartOfRange, timPriceBreak.EndOfRange, timPriceBreak.PctAdj, timPriceBreak.PriceOrAmtAdj, SLX.TIMPRICEBREAKID
FROM         timPriceBreak LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TIMPRICEBREAK AS SLX ON timPriceBreak.PricingKey = SLX.PricingKey  
Except

SELECT     PricingKey, StartOfRange, EndOfRange, PctAdj, PriceOrAmtAdj, TIMPRICEBREAKID
FROM         SALESLOGIX_PRODUCTION.sysdba.TIMPRICEBREAK AS SLX




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
               Right = 209
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX_1"
            Begin Extent = 
               Top = 6
               Left = 247
               Bottom = 84
               Right = 418
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPriceBreak_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPriceBreak_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







Create view [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]
as
SELECT     SLX.TIMPRICEGROUPPRICEID, timPriceGroupPrice.WhseKey, timPriceGroupPrice.CustPriceGroupKey, timPriceGroupPrice.ProdPriceGroupKey, 
                      timPriceGroupPrice.EffectiveDate, timPriceGroupPrice.CombineForBreak, timPriceGroupPrice.ExpirationDate, timPriceGroupPrice.PricingKey
FROM         timPriceGroupPrice LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TIMPRICEGROUPPRICE AS SLX ON timPriceGroupPrice.ProdPriceGroupKey = SLX.ProdPriceGroupKey AND 
                      timPriceGroupPrice.WhseKey = SLX.WhseKey AND timPriceGroupPrice.CustPriceGroupKey = SLX.CustPriceGroupKey
WHERE     (SLX.TIMPRICEGROUPPRICEID IS NULL)






GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]
AS
SELECT     SLX.TIMPRICEGROUPPRICEID, timPriceGroupPrice.WhseKey, timPriceGroupPrice.CustPriceGroupKey, timPriceGroupPrice.ProdPriceGroupKey, 
                      timPriceGroupPrice.CombineForBreak, timPriceGroupPrice.PricingKey, timPriceGroupPrice.EffectiveDate, timPriceGroupPrice.ExpirationDate
FROM         timPriceGroupPrice LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TIMPRICEGROUPPRICE AS SLX ON timPriceGroupPrice.ProdPriceGroupKey = SLX.ProdPriceGroupKey AND 
                      timPriceGroupPrice.WhseKey = SLX.WhseKey AND timPriceGroupPrice.CustPriceGroupKey = SLX.CustPriceGroupKey
Except
SELECT     TIMPRICEGROUPPRICEID, WhseKey, CustPriceGroupKey, ProdPriceGroupKey, CombineForBreak, PricingKey, EffectiveDate, ExpirationDate
FROM         SALESLOGIX_PRODUCTION.sysdba.TIMPRICEGROUPPRICE AS SLX




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
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]
AS
SELECT     timPriceSheet.MYID, timPriceSheet.WhseKey, timPriceSheet.ItemKey, timPriceSheet.EffectiveDate, timPriceSheet.CurrID, timPriceSheet.ListPrice, 
                      timPriceSheet.Sheet1Price, timPriceSheet.Sheet2Price, timPriceSheet.Sheet3Price, timPriceSheet.Sheet4Price, timPriceSheet.UpdateCounter, 
                      SLX.TIMPRICESHEETID
FROM         (SELECT     CAST(ItemKey AS varchar(32)) + CAST(CurrID AS varchar(32)) + CAST(EffectiveDate AS varchar(32)) AS MYID, WhseKey, ItemKey, EffectiveDate, CurrID, 
                                              ListPrice, Sheet1Price, Sheet2Price, Sheet3Price, Sheet4Price, UpdateCounter
                       FROM          dbo.timPriceSheet AS timPriceSheet_1) AS timPriceSheet LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TIMPRICESHEET AS SLX ON timPriceSheet.MYID = SLX.MYID
WHERE     (SLX.TIMPRICESHEETID IS NULL)



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
         Begin Table = "SLX"
            Begin Extent = 
               Top = 6
               Left = 230
               Bottom = 114
               Right = 400
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "timPriceSheet"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 114
               Right = 192
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
      Begin ColumnWidths = 9
         Width = 284
         Width = 3210
         Width = 2460
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPriceSheet_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPriceSheet_TAC'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]
AS
SELECT     timPriceSheet.MYID, timPriceSheet.WhseKey, timPriceSheet.ItemKey, timPriceSheet.CurrID, timPriceSheet.ListPrice, timPriceSheet.Sheet1Price, 
                      timPriceSheet.Sheet2Price, timPriceSheet.Sheet3Price, timPriceSheet.Sheet4Price, timPriceSheet.UpdateCounter, SLX.TIMPRICESHEETID, 
                      timPriceSheet.EffectiveDate
FROM         (SELECT     CAST(ItemKey AS varchar(32)) + CAST(CurrID AS varchar(32))+ cast(effectivedate as varchar(32)) AS MYID, WhseKey, ItemKey, EffectiveDate, CurrID, ListPrice, Sheet1Price, Sheet2Price, 
                                              Sheet3Price, Sheet4Price, UpdateCounter
                       FROM          timPriceSheet AS timPriceSheet_1) AS timPriceSheet LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TIMPRICESHEET AS SLX ON timPriceSheet.MYID = SLX.MYID
EXCEPT
SELECT     MYID, timPriceSheet.WhseKey, timPriceSheet.ItemKey, timPriceSheet.CurrID, timPriceSheet.ListPrice, timPriceSheet.Sheet1Price, timPriceSheet.Sheet2Price, 
                      timPriceSheet.Sheet3Price, timPriceSheet.Sheet4Price, timPriceSheet.UpdateCounter, TIMPRICESHEETID, EFFECTIVEDATE
FROM         SALESLOGIX_PRODUCTION.sysdba.TIMPRICESHEET



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
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 13
         Width = 284
         Width = 2790
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPriceSheet_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPriceSheet_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO









CREATE VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC]
AS
SELECT    dbo.timPricing.*,SLX.TIMPRICINGID      
FROM         dbo.timPricing       LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.timPricing AS SLX ON dbo.timPricing.PricingKey   = SLX.PricingKey    
WHERE     (SLX.TIMPRICINGID        IS NULL)









GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]
AS
SELECT     timPricing.PricingKey, timPricing.BreakType, timPricing.PriceBase, timPricing.PriceMeth, timPricing.SubjToRebate, SLX.TIMPRICINGID
FROM         timPricing LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TIMPRICING AS SLX ON timPricing.PricingKey = SLX.PricingKey   
Except
SELECT     PricingKey, BreakType, PriceBase, PriceMeth, SubjToRebate, TIMPRICINGID
FROM         SALESLOGIX_PRODUCTION.sysdba.TIMPRICING AS SLX




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
               Right = 189
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX_1"
            Begin Extent = 
               Top = 6
               Left = 227
               Bottom = 84
               Right = 378
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPricing_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPricing_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO










CREATE VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]
AS
SELECT    dbo.timProdPriceGroup.*,SLX.TIMPRODPRICEGROUPID       
FROM         dbo.timProdPriceGroup       LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.timProdPriceGroup AS SLX ON dbo.timProdPriceGroup.ProdPriceGroupKey   = SLX.ProdPriceGroupKey    
WHERE     (SLX.TIMPRODPRICEGROUPID        IS NULL)








GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]
AS
SELECT     timProdPriceGroup.ProdPriceGroupKey, timProdPriceGroup.CompanyID, timProdPriceGroup.Description, timProdPriceGroup.ProdPriceGroupID, 
                      timProdPriceGroup.UpdateCounter, SLX.TIMPRODPRICEGROUPID
FROM         timProdPriceGroup LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TIMPRODPRICEGROUP AS SLX ON timProdPriceGroup.ProdPriceGroupKey = SLX.ProdPriceGroupKey  

Except 

SELECT     ProdPriceGroupKey, CompanyID, Description, ProdPriceGroupID, UpdateCounter, TIMPRODPRICEGROUPID
FROM         SALESLOGIX_PRODUCTION.sysdba.TIMPRODPRICEGROUP AS SLX




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
         Begin Table = "source"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 114
               Right = 240
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX_1"
            Begin Extent = 
               Top = 114
               Left = 38
               Bottom = 192
               Right = 240
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]    Script Date: 08/11/2014 15:33:34 ******/
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
                      SALESLOGIX_PRODUCTION.sysdba.TIMPRODPRICEGROUPPRICE AS SLX ON 
                      dbo.timProdPriceGroupPrice.ProdPriceGroupPriceKey = SLX.ProdPriceGroupPriceKey
WHERE     (SLX.TIMPRODPRICEGROUPPRICEID IS NULL)









GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]
AS
SELECT     timProdPriceGroupPrice.ProdPriceGroupPriceKey, timProdPriceGroupPrice.CombineForBreak, timProdPriceGroupPrice.PricingKey, 
                      timProdPriceGroupPrice.ProdPriceGroupKey, timProdPriceGroupPrice.UpdateCounter, timProdPriceGroupPrice.WhseKey, SLX.TIMPRODPRICEGROUPPRICEID, 
                      timProdPriceGroupPrice.EffectiveDate, timProdPriceGroupPrice.ExpirationDate
FROM         timProdPriceGroupPrice LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TIMPRODPRICEGROUPPRICE AS SLX ON timProdPriceGroupPrice.ProdPriceGroupPriceKey = SLX.ProdPriceGroupPriceKey
except

SELECT     ProdPriceGroupPriceKey, CombineForBreak, PricingKey, ProdPriceGroupKey, UpdateCounter, WhseKey, TIMPRODPRICEGROUPPRICEID, EffectiveDate, 
                      ExpirationDate
FROM         SALESLOGIX_PRODUCTION.sysdba.TIMPRODPRICEGROUPPRICE AS SLX




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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO









CREATE VIEW [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]
AS
SELECT    dbo.timWarehouse.*,SLX.TIMWAREHOUSEID        
FROM         dbo.timWarehouse        LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.timWarehouse AS SLX ON dbo.timWarehouse.WhseKey   = SLX.WhseKey     
WHERE     (SLX.TIMWAREHOUSEID         IS NULL)








GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]    Script Date: 08/11/2014 15:33:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]
AS
SELECT     timWarehouse.WhseKey, timWarehouse.AllowImmedPickFromSO, timWarehouse.AllowImmedShipFromPick, timWarehouse.AllowTrnsfrBackOrd, 
                      timWarehouse.CompanyID, timWarehouse.CostOfCarry, timWarehouse.COSAcctKey, timWarehouse.CostTierAdjAcctKey, timWarehouse.CostToReplenish, 
                      timWarehouse.CostWhseKey, timWarehouse.Description, timWarehouse.DfltLotPickMethod, timWarehouse.DfltPickMeth, timWarehouse.DfltPickOfOutOfStockItems, 
                      timWarehouse.ImmedInvcPrinterDest, timWarehouse.ImmedInvcRptSettingKey, timWarehouse.ImmedPickPrinterDest, timWarehouse.ImmedPickRptSettingKey, 
                      timWarehouse.InvtAcctKey, timWarehouse.IssueAcctKey, timWarehouse.LastRankInvtPerKey, timWarehouse.MailAddrKey, timWarehouse.MaxDemandMult, 
                      timWarehouse.MaxOrderCycle, timWarehouse.MaxQualLeadTime, timWarehouse.MaxQualLeadTimePct, timWarehouse.MaxSeasDemandMult, 
                      timWarehouse.MinDemandMult, timWarehouse.MinOrderCycle, timWarehouse.MinQualLeadTimePct, timWarehouse.MiscAdjAcctKey, 
                      timWarehouse.PhysCountAcctKey, timWarehouse.PriceWhseKey, timWarehouse.PurchAcctKey, timWarehouse.ReordMeth, timWarehouse.RestockMeth, 
                      timWarehouse.RestockRate, timWarehouse.SalesAcctKey, timWarehouse.SalesOffsetAcctKey, timWarehouse.SalesReturnAcctKey, timWarehouse.ShipAddrKey, 
                      timWarehouse.ShipComplete, timWarehouse.SortPickTckt, timWarehouse.STaxSchdKey, timWarehouse.TrackQtyAtBin, timWarehouse.Transit, 
                      timWarehouse.TrendPct, timWarehouse.TrnsfrExpAcctKey, timWarehouse.TrnsfrFrtChrgOpt, timWarehouse.TrnsfrMrkupAcctKey, timWarehouse.TrnsfrSrchrgOpt, 
                      timWarehouse.UpdateCounter, timWarehouse.UseBins, timWarehouse.UseZones, timWarehouse.WhseID, timWarehouse.WhseMgrCntctKey, 
                      timWarehouse.WhseOvrdSegValue, timWarehouse.WillCallPickPrinterDest, timWarehouse.WillCallPickRptSettingKey, SLX.TIMWAREHOUSEID
FROM         timWarehouse LEFT OUTER JOIN
                      SALESLOGIX_PRODUCTION.sysdba.TIMWAREHOUSE AS SLX ON timWarehouse.WhseKey = SLX.WhseKey     

Except
SELECT     WhseKey, AllowImmedPickFromSO, AllowImmedShipFromPick, AllowTrnsfrBackOrd, CompanyID, CostOfCarry, COSAcctKey, CostTierAdjAcctKey, CostToReplenish, 
                      CostWhseKey, Description, DfltLotPickMethod, DfltPickMeth, DfltPickOfOutOfStockItems, ImmedInvcPrinterDest, ImmedInvcRptSettingKey, ImmedPickPrinterDest, 
                      ImmedPickRptSettingKey, InvtAcctKey, IssueAcctKey, LastRankInvtPerKey, MailAddrKey, MaxDemandMult, MaxOrderCycle, MaxQualLeadTime, MaxQualLeadTimePct,
                       MaxSeasDemandMult, MinDemandMult, MinOrderCycle, MinQualLeadTimePct, MiscAdjAcctKey, PhysCountAcctKey, PriceWhseKey, PurchAcctKey, ReordMeth, 
                      RestockMeth, RestockRate, SalesAcctKey, SalesOffsetAcctKey, SalesReturnAcctKey, ShipAddrKey, ShipComplete, SortPickTckt, STaxSchdKey, TrackQtyAtBin, Transit, 
                      TrendPct, TrnsfrExpAcctKey, TrnsfrFrtChrgOpt, TrnsfrMrkupAcctKey, TrnsfrSrchrgOpt, UpdateCounter, UseBins, UseZones, WhseID, WhseMgrCntctKey, 
                      WhseOvrdSegValue, WillCallPickPrinterDest, WillCallPickRptSettingKey, TIMWAREHOUSEID
FROM         SALESLOGIX_PRODUCTION.sysdba.TIMWAREHOUSE AS SLX




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
               Right = 248
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX_1"
            Begin Extent = 
               Top = 6
               Left = 286
               Bottom = 84
               Right = 459
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timWarehouse_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timWarehouse_TAC_Changed'
GO


