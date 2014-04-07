USE [mas500_tst_app]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESS_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ADDRESS_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ADDRESS_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_CONTACT_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_CONTACT_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_Changed_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_Products_Changed_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_Products_Changed_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_Products_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_Products_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_Products_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_Products_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_TarCustomer_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPricing_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timWarehouse_TAC]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]    Script Date: 04/07/2014 12:56:31 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]
GO

USE [mas500_tst_app]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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
                      SalesLogix_TEST.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME ON 
                      Source.SperID = SLXUserinfo.ACCOUNTINGUSERID LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.ACCOUNT AS SLXAccount ON Source.CustKey = SLXAccount.MASCUSTKEY
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_ACCOUNT_TAC_Changed]
AS
SELECT      Source.CustName AS ACCOUNT, Source.ContactPhone AS MAINPHONE, Source.ContactFax AS FAX, ISNULL(SLXSeccode.SECCODEID, 
                      'SYST00000001') AS SECCODEID,  SLXUserinfo.USERID AS ACCOUNTMANAGERID, { fn UCASE(Source.CustName) } AS ACCOUNT_UC, 
                      Source.CustKey AS MASCUSTKEY,    
                      Source.PrimaryAddrCurrID AS CURRENCYCODE,SLXAccount.ACCOUNTID
, NAC.NationalAcctID as MASNationalAcctID
FROM         dbo.tarNationalAcct AS NAC RIGHT OUTER JOIN
                      dbo.tarCustomer ON NAC.NationalAcctKey = dbo.tarCustomer.NationalAcctLevelKey LEFT OUTER JOIN
                      dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON dbo.tarCustomer.CustKey = Source.CustKey LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME ON 
                      Source.SperID = SLXUserinfo.ACCOUNTINGUSERID LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.ACCOUNT AS SLXAccount ON Source.CustKey = SLXAccount.MASCUSTKEY


except

SELECT     ACCOUNT, MAINPHONE, FAX, SECCODEID, ACCOUNTMANAGERID, ACCOUNT_UC, MASCUSTKEY, CURRENCYCODE, ACCOUNTID,MASNationalAcctID
FROM         SalesLogix_TEST.sysdba.ACCOUNT

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

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
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
                       FROM          SalesLogix_TEST.sysdba.ACCOUNTFINANCIAL AS SLXAccountFinancial RIGHT OUTER JOIN
                                              SalesLogix_TEST.sysdba.ACCOUNT AS SLXAccount ON SLXAccountFinancial.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                                              SalesLogix_TEST.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                                              SalesLogix_TEST.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                                              vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                                              SLXAccount.MASCUSTKEY = Source.CustKey) AS MySource INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), SALESPERSON), '') + ISNULL(CONVERT(varchar(255), CUSTOMER_TYPE), '') 
                                                   + ISNULL(CONVERT(varchar(255), CREDIT_LIMIT), '') + ISNULL(CONVERT(varchar(255), AVG_DAYS_TO_PAY), '') 
                                                   + ISNULL(CONVERT(varchar(255), AVG_DAYS_OVERDUE), '') + ISNULL(CONVERT(varchar(255), BALANCE_FORWARD), '') 
                                                   + ISNULL(CONVERT(varchar(255), CUSTOMERID), '') + ISNULL(CONVERT(varchar(255), COMPANYCODE), '') 
                                                   + ISNULL(CONVERT(varchar(255), CURRENTBALANCE), '') AS MYID, ACCOUNTID
                            FROM          SalesLogix_TEST.sysdba.ACCOUNTFINANCIAL) AS SLX ON MySource.MYID <> SLX.MYID AND MySource.ACCOUNTID = SLX.ACCOUNTID






GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTaddress_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESS_TAC]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_ADDRESS_TAC]
AS
SELECT     SalesLogix_TEST.sysdba.ADDRESS.ADDRESSID, 1 AS ENTITYID, dbo.tciAddress.AddrLine1 AS ADDRESS1, dbo.tciAddress.AddrLine2 AS ADDRESS2, 
                      dbo.tciAddress.City, dbo.tciAddress.StateID, dbo.tciAddress.PostalCode, dbo.tciAddress.CountryID AS COUNTRY, 
                      dbo.tciAddress.AddrLine3 AS ADDRESS3, dbo.tciAddress.AddrLine4 AS ADDRESS4, dbo.tciAddress.AddrName AS ERPNAME, 
                      dbo.tciAddress.AddrKey AS MASADDRKEY
FROM         dbo.tciAddress LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.ADDRESS ON dbo.tciAddress.AddrKey = SalesLogix_TEST.sysdba.ADDRESS.MASADDRKEY
WHERE     (SalesLogix_TEST.sysdba.ADDRESS.ADDRESSID IS NULL)




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
         Begin Table = "ADDRESS (SalesLogix_TEST.sysdba)"
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE VIEW [dbo].[vdvMAS_to_SLX_ADDRESS_TAC_Changed]
AS
SELECT     Source.MYID, Source.ADDRESSID, Source.ENTITYID, Source.ADDRESS1, Source.ADDRESS2, Source.City, Source.StateID, Source.PostalCode, 
                      Source.COUNTRY, Source.ADDRESS3, Source.ADDRESS4, Source.ERPNAME, Source.MASADDRKEY
FROM         (SELECT     ISNULL(CONVERT(varchar(255), SalesLogix_TEST.sysdba.ADDRESS.ADDRESSID), '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrLine1), 
                                              '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrLine2), '') + ISNULL(CONVERT(varchar(255), tciAddress.City), '') 
                                              + ISNULL(CONVERT(varchar(255), tciAddress.StateID), '') + ISNULL(CONVERT(varchar(255), tciAddress.PostalCode), '') 
                                              + ISNULL(CONVERT(varchar(255), SalesLogix_TEST.sysdba.ADDRESS.COUNTRY), '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrLine3), 
                                              '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrLine4), '') + ISNULL(CONVERT(varchar(255), tciAddress.AddrName), '') 
                                              + ISNULL(CONVERT(varchar(255), tciAddress.AddrKey), '') AS MYID, SalesLogix_TEST.sysdba.ADDRESS.ADDRESSID, 1 AS ENTITYID, 
                                              tciAddress.AddrLine1 AS ADDRESS1, tciAddress.AddrLine2 AS ADDRESS2, tciAddress.City, tciAddress.StateID, tciAddress.PostalCode, 
                                              tciAddress.CountryID AS COUNTRY, tciAddress.AddrLine3 AS ADDRESS3, tciAddress.AddrLine4 AS ADDRESS4, 
                                              tciAddress.AddrName AS ERPNAME, tciAddress.AddrKey AS MASADDRKEY
                       FROM          tciAddress LEFT OUTER JOIN
                                              SalesLogix_TEST.sysdba.ADDRESS ON tciAddress.AddrKey = SalesLogix_TEST.sysdba.ADDRESS.MASADDRKEY) AS Source INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), ADDRESSID), '') + ISNULL(CONVERT(varchar(255), ADDRESS1), '') + ISNULL(CONVERT(varchar(255), 
                                                   ADDRESS2), '') + ISNULL(CONVERT(varchar(255), CITY), '') + ISNULL(CONVERT(varchar(255), STATE), '') + ISNULL(CONVERT(varchar(255), 
                                                   POSTALCODE), '') + ISNULL(CONVERT(varchar(255), COUNTRY), '') + ISNULL(CONVERT(varchar(255), ADDRESS3), '') 
                                                   + ISNULL(CONVERT(varchar(255), ADDRESS4), '') + ISNULL(CONVERT(varchar(255), ERPNAME), '') + ISNULL(CONVERT(varchar(255), 
                                                   MASADDRKEY), '') AS MYID, ADDRESSID
                            FROM          SalesLogix_TEST.sysdba.ADDRESS AS ADDRESS_1) AS SLX ON Source.MYID <> SLX.MYID AND Source.ADDRESSID = SLX.ADDRESSID





GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




Create View [dbo].[vdvMAS_to_SLX_ADDRESSBilltoShipToUpdate_TAC]
as
SELECT     tarCustomer.DfltBillToAddrKey, tarCustomer.DfltShipToAddrKey, SalesLogix_TEST.sysdba.ACCOUNT.ACCOUNTID, 
                      DFLTBillingAddress.ADDRESSID AS BILLADDRESSID, DFLTShipping.ADDRESSID AS SHIPADDRESSID
FROM         tarCustomer INNER JOIN
                      SalesLogix_TEST.sysdba.ACCOUNT ON tarCustomer.CustKey = SalesLogix_TEST.sysdba.ACCOUNT.MASCUSTKEY LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.ADDRESS AS DFLTShipping ON tarCustomer.DfltShipToAddrKey = DFLTShipping.MASADDRKEY LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.ADDRESS AS DFLTBillingAddress ON tarCustomer.DfltBillToAddrKey = DFLTBillingAddress.MASADDRKEY



GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACT_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
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
                       FROM          SalesLogix_TEST.sysdba.CONTACT AS SLXContact RIGHT OUTER JOIN
                                              SalesLogix_TEST.sysdba.ACCOUNT AS SLXAccount ON SLXContact.ACCOUNTID = SLXAccount.ACCOUNTID RIGHT OUTER JOIN
                                              SalesLogix_TEST.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                                              SalesLogix_TEST.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME RIGHT OUTER JOIN
                                              vdvMAS_TO_SLX_ERPLinkCustomer_TAC AS Source ON SLXUserinfo.ACCOUNTINGUSERID = Source.SperID ON 
                                              SLXAccount.MASCUSTKEY = Source.CustKey) AS SOURCE_1 INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), CONTACTID), '') + ISNULL(CONVERT(varchar(255), WORKPHONE), '') + ISNULL(CONVERT(varchar(255), 
                                                   FAX), '') + ISNULL(CONVERT(varchar(255), EMAIL), '') + ISNULL(CONVERT(varchar(255), TITLE), '') + ISNULL(CONVERT(varchar(255), 
                                                   MASCONTACTNAME), '') + ISNULL(CONVERT(varchar(255), MACCONTACTID), '') AS MYID, CONTACTID
                            FROM          SalesLogix_TEST.sysdba.CONTACT) AS slx ON SOURCE_1.MYID <> slx.MYID AND SOURCE_1.CONTACTID = slx.CONTACTID





GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_CONTACTaddress_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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
                      SalesLogix_TEST.sysdba.CONTACT AS SLXContact LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.ADDRESS AS SLXAddress ON SLXContact.ADDRESSID = SLXAddress.ADDRESSID ON 
                      Source.MASContactId = SLXContact.MASCONTACTID LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.SECCODE AS SLXSeccode RIGHT OUTER JOIN
                      SalesLogix_TEST.sysdba.USERINFO AS SLXUserinfo ON SLXSeccode.SECCODEDESC = SLXUserinfo.USERNAME ON 
                      Source.SperID = SLXUserinfo.ACCOUNTINGUSERID LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.ACCOUNT AS SLXAccount ON Source.CustKey = SLXAccount.MASCUSTKEY
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_Changed_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vdvMAS_to_SLX_Products_TAC]
AS
SELECT     SalesLogix_TEST.sysdba.PRODUCT.PRODUCTID, dbo.vdvStockStatus.ShortDesc AS NAME, dbo.timItemDescription.LongDesc AS DESCRIPTION, 
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
                      SalesLogix_TEST.sysdba.PRODUCT ON dbo.vdvStockStatus.WhseID = SalesLogix_TEST.sysdba.PRODUCT.WAREHOUSEID AND 
                      dbo.vdvStockStatus.ItemKey = SalesLogix_TEST.sysdba.PRODUCT.MASITEMKEY AND 
                      dbo.vdvStockStatus.CompanyID = SalesLogix_TEST.sysdba.PRODUCT.COMPANYID
WHERE     (SalesLogix_TEST.sysdba.PRODUCT.PRODUCTID IS NULL)


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
         Begin Table = "PRODUCT (SalesLogix_TEST.sysdba)"
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_Products_TAC_Changed]
AS
SELECT     SalesLogix_TEST.sysdba.PRODUCT.PRODUCTID, dbo.vdvStockStatus.ShortDesc AS NAME,  
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
                      SalesLogix_TEST.sysdba.PRODUCT ON dbo.vdvStockStatus.WhseID = SalesLogix_TEST.sysdba.PRODUCT.WAREHOUSEID AND 
                      dbo.vdvStockStatus.ItemKey = SalesLogix_TEST.sysdba.PRODUCT.MASITEMKEY AND 
                      dbo.vdvStockStatus.CompanyID = SalesLogix_TEST.sysdba.PRODUCT.COMPANYID

Except
SELECT     PRODUCTID, NAME,  ACTUALID, FAMILY, PRICE, PRODUCTGROUP, STATUS, UNIT, STOCKVOLUME, STOCKWEIGHT, STOCKITEM, PROGRAM, 
                      SUPPLIER, VENDOR, SITEID, WAREHOUSELOCATION, COMMISSIONABLE, TAXABLE, ACCOUNTINGPERIOD, GLACCOUNTNUMBER, GLSUBACCOUNTNUMBER, 
                      DATAOWNER, TYPE, FIXEDCOST, GLOBALSYNCID, APPID, TICK, COMMODITYGROUPID, ACTIVEFLAG, SELLINGALLOWEDFLAG, UNITOFMEASUREID, SELLINGUOMID,
                       SELLINGUOMNUMBER, CLASSIFICATION, COMMODITYTYPE, MASITEMKEY, UPC, MASITEMID, WAREHOUSEID, COMPANYID, QTYONHAND, QTYAVAILABLE, 
                      SURPLUSQTY, QTYONHOLD, MAXSTOCKLEVEL, MASPRODPRICEGROUPKEY
FROM         SalesLogix_TEST.sysdba.PRODUCT

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

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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
                      SalesLogix_TEST.sysdba.TARCUSTADDR AS SLX ON tarCustAddr.AddrKey = SLX.AddrKey
WHERE     (SLX.TARCUSTADDRID IS NULL)



GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
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
                      SalesLogix_TEST.sysdba.TARCUSTADDR AS SLX ON tarCustAddr.AddrKey = SLX.AddrKey


Except
SELECT     TARCUSTADDRID, AddrKey, AllowInvtSubst, BackOrdPrice, BOLReqd, CarrierAcctNo, CarrierBillMeth, CloseSOLineOnFirstShip, CloseSOOnFirstShip, CommPlanKey, 
                      CreateType, CreateUserID, CreditCardKey, CurrExchSchdKey, CurrID, CustAddrID, CustKey, CustPriceGroupKey, DfltCntctKey, FOBKey, FreightMethod, ImportLogKey, 
                      InvcFormKey, InvcMsg, InvoiceReqd, LanguageID, PackListContentsReqd, PackListFormKey, PackListReqd, PmtTermsKey, PriceAdj, PriceBase, PrintOrderAck, 
                      RequireSOAck, SalesTerritoryKey, ShipComplete, ShipDays, ShipLabelFormKey, ShipLabelsReqd, ShipMethKey, ShipZoneKey, SOAckFormKey, SOAckMeth, SperKey, 
                      STaxSchdKey, UpdateUserID, WhseKey, UsePromoPrice
FROM         SalesLogix_TEST.sysdba.TARCUSTADDR AS SLX

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

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
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
                      SalesLogix_TEST.sysdba.TARCUSTOMER AS SLX ON tarCustomer.CustKey = SLX.CustKey
except
SELECT     CustKey, ABANo, AllowCustRefund, AllowWriteOff, BillingType, BillToNationalAcctParent, CompanyID, ConsolidatedStatement,CreateType, CreateUserID, 
                      CreditLimit, CreditLimitAgeCat, CreditLimitUsed, CRMCustID, CurrExchSchdKey, CustClassKey, CustID, CustName, CustRefNo,  DfltBillToAddrKey, 
                      DfltItemKey, DfltMaxUpCharge, DfltMaxUpChargeType, DfltSalesAcctKey, DfltSalesReturnAcctKey, DfltShipToAddrKey, FinChgFlatAmt, FinChgPct, Hold, ImportLogKey, 
                      NationalAcctLevelKey, PmtByNationalAcctParent, PrimaryAddrKey, PrimaryCntctKey, PrintDunnMsg, ReqCreditLimit, ReqPO, RetntPct, SalesSourceKey, ShipPriority, 
                      Status, StdIndusCodeID, StmtCycleKey, StmtFormKey, TradeDiscPct, UpdateCounter,  UpdateUserID, UserFld1, UserFld2, UserFld3, UserFld4, VendKey, 
                      TARCUSTOMERID
FROM         SalesLogix_TEST.sysdba.TARCUSTOMER

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

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcct_TAC_Changed]
AS
SELECT     tarNationalAcct.NationalAcctKey, tarNationalAcct.CompanyID, tarNationalAcct.CreditLimit, tarNationalAcct.CreditLimitUsed, tarNationalAcct.Description, 
                      tarNationalAcct.Hold, tarNationalAcct.NationalAcctID, SLX.TARNATIONALACCTID
FROM         tarNationalAcct LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.TARNATIONALACCT AS SLX ON tarNationalAcct.NationalAcctKey = SLX.NationalAcctKey 

Except

SELECT     NationalAcctKey, CompanyID, CreditLimit, CreditLimitUsed, Description, Hold, NationalAcctID, TARNATIONALACCTID
FROM         SalesLogix_TEST.sysdba.TARNATIONALACCT

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

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Changed]
AS
SELECT     tarNationalAcctLevel.NationalAcctLevelKey, tarNationalAcctLevel.Description, tarNationalAcctLevel.NationalAcctKey, tarNationalAcctLevel.NationalAcctLevel, 
                      SLX.TARNATIONALACCTLEVELID
FROM         tarNationalAcctLevel LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.TARNATIONALACCTLEVEL AS SLX ON tarNationalAcctLevel.NationalAcctLevelKey = SLX.NationalAcctLevelKey
Except

SELECT     NationalAcctLevelKey, Description, NationalAcctKey, NationalAcctLevel, TARNATIONALACCTLEVELID
FROM         SalesLogix_TEST.sysdba.TARNATIONALACCTLEVEL AS SLX

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

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Changed]
AS
SELECT     timNatAcctProdGrpPrc.CustProdGrpPrcKey, timNatAcctProdGrpPrc.CombineForBreak, timNatAcctProdGrpPrc.IgnoreSalesPromotions, 
                      timNatAcctProdGrpPrc.NationalAcctKey, timNatAcctProdGrpPrc.PricingKey, timNatAcctProdGrpPrc.ProdPriceGroupKey, timNatAcctProdGrpPrc.UpdateCounter, 
                      timNatAcctProdGrpPrc.WhseKey, SLX.TIMNATACCTPRODGRPPRCID
FROM         timNatAcctProdGrpPrc LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.TIMNATACCTPRODGRPPRC AS SLX ON timNatAcctProdGrpPrc.CustProdGrpPrcKey = SLX.CustProdGrpPrcKey

Except

SELECT     CustProdGrpPrcKey, CombineForBreak, IgnoreSalesPromotions, NationalAcctKey, PricingKey, ProdPriceGroupKey, UpdateCounter, WhseKey, 
                      TIMNATACCTPRODGRPPRCID
FROM         SalesLogix_TEST.sysdba.TIMNATACCTPRODGRPPRC AS SLX

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
               Right = 262
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX_1"
            Begin Extent = 
               Top = 114
               Left = 38
               Bottom = 192
               Right = 262
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_Changed]
AS
SELECT     timPriceBreak.PricingKey, timPriceBreak.StartOfRange, timPriceBreak.EndOfRange, timPriceBreak.PctAdj, timPriceBreak.PriceOrAmtAdj, SLX.TIMPRICEBREAKID
FROM         timPriceBreak LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.TIMPRICEBREAK AS SLX ON timPriceBreak.PricingKey = SLX.PricingKey  
Except

SELECT     PricingKey, StartOfRange, EndOfRange, PctAdj, PriceOrAmtAdj, TIMPRICEBREAKID
FROM         SalesLogix_TEST.sysdba.TIMPRICEBREAK AS SLX

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

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




Create view [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC]
as
SELECT     SLX.TIMPRICEGROUPPRICEID, timPriceGroupPrice.WhseKey, timPriceGroupPrice.CustPriceGroupKey, timPriceGroupPrice.ProdPriceGroupKey, 
                      timPriceGroupPrice.EffectiveDate, timPriceGroupPrice.CombineForBreak, timPriceGroupPrice.ExpirationDate, timPriceGroupPrice.PricingKey
FROM         timPriceGroupPrice LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.TIMPRICEGROUPPRICE AS SLX ON timPriceGroupPrice.ProdPriceGroupKey = SLX.ProdPriceGroupKey AND 
                      timPriceGroupPrice.WhseKey = SLX.WhseKey AND timPriceGroupPrice.CustPriceGroupKey = SLX.CustPriceGroupKey
WHERE     (SLX.TIMPRICEGROUPPRICEID IS NULL)



GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed]
AS
SELECT     SLX.TIMPRICEGROUPPRICEID, timPriceGroupPrice.WhseKey, timPriceGroupPrice.CustPriceGroupKey, timPriceGroupPrice.ProdPriceGroupKey, 
                      timPriceGroupPrice.CombineForBreak, timPriceGroupPrice.PricingKey
FROM         timPriceGroupPrice LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.TIMPRICEGROUPPRICE AS SLX ON timPriceGroupPrice.ProdPriceGroupKey = SLX.ProdPriceGroupKey AND 
                      timPriceGroupPrice.WhseKey = SLX.WhseKey AND timPriceGroupPrice.CustPriceGroupKey = SLX.CustPriceGroupKey

Except
SELECT     TIMPRICEGROUPPRICEID, WhseKey, CustPriceGroupKey, ProdPriceGroupKey, CombineForBreak, PricingKey
FROM         SalesLogix_TEST.sysdba.TIMPRICEGROUPPRICE AS SLX

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
               Right = 242
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX_1"
            Begin Extent = 
               Top = 114
               Left = 38
               Bottom = 192
               Right = 242
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPriceGroupPrice_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC]
AS
SELECT     timPriceSheet.MYID, timPriceSheet.WhseKey, timPriceSheet.ItemKey, timPriceSheet.EffectiveDate, timPriceSheet.CurrID, timPriceSheet.ListPrice, 
                      timPriceSheet.Sheet1Price, timPriceSheet.Sheet2Price, timPriceSheet.Sheet3Price, timPriceSheet.Sheet4Price, timPriceSheet.UpdateCounter, 
                      SLX.TIMPRICESHEETID
FROM         (SELECT     CAST(ItemKey AS varchar(32)) + CAST(CurrID AS varchar(32)) AS MYID, WhseKey, ItemKey, EffectiveDate, CurrID, ListPrice, Sheet1Price, Sheet2Price, 
                                              Sheet3Price, Sheet4Price, UpdateCounter
                       FROM          dbo.timPriceSheet AS timPriceSheet_1) AS timPriceSheet LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.TIMPRICESHEET AS SLX ON timPriceSheet.MYID = SLX.MYID
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_Changed]
AS
SELECT     timPriceSheet.MYID, timPriceSheet.WhseKey, timPriceSheet.ItemKey, timPriceSheet.CurrID, timPriceSheet.ListPrice, 
                      timPriceSheet.Sheet1Price, timPriceSheet.Sheet2Price, timPriceSheet.Sheet3Price, timPriceSheet.Sheet4Price, timPriceSheet.UpdateCounter, 
                      SLX.TIMPRICESHEETID
FROM         (SELECT     CAST(ItemKey AS varchar(32)) + CAST(CurrID AS varchar(32)) AS MYID, WhseKey, ItemKey, EffectiveDate, CurrID, ListPrice, Sheet1Price, Sheet2Price, 
                                              Sheet3Price, Sheet4Price, UpdateCounter
                       FROM          dbo.timPriceSheet AS timPriceSheet_1) AS timPriceSheet LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.TIMPRICESHEET AS SLX ON timPriceSheet.MYID = SLX.MYID
EXCEPT
SELECT     MYID, timPriceSheet.WhseKey, timPriceSheet.ItemKey, timPriceSheet.CurrID, timPriceSheet.ListPrice, timPriceSheet.Sheet1Price, 
                      timPriceSheet.Sheet2Price, timPriceSheet.Sheet3Price, timPriceSheet.Sheet4Price, timPriceSheet.UpdateCounter, TIMPRICESHEETID
FROM         SalesLogix_TEST.sysdba.TIMPRICESHEET

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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPriceSheet_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timPriceSheet_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timPricing_TAC_Changed]
AS
SELECT     timPricing.PricingKey, timPricing.BreakType, timPricing.PriceBase, timPricing.PriceMeth, timPricing.SubjToRebate, SLX.TIMPRICINGID
FROM         timPricing LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.TIMPRICING AS SLX ON timPricing.PricingKey = SLX.PricingKey   
Except
SELECT     PricingKey, BreakType, PriceBase, PriceMeth, SubjToRebate, TIMPRICINGID
FROM         SalesLogix_TEST.sysdba.TIMPRICING AS SLX

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

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_Changed]
AS
SELECT     timProdPriceGroup.ProdPriceGroupKey, timProdPriceGroup.CompanyID, timProdPriceGroup.Description, timProdPriceGroup.ProdPriceGroupID, 
                      timProdPriceGroup.UpdateCounter, SLX.TIMPRODPRICEGROUPID
FROM         timProdPriceGroup LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.TIMPRODPRICEGROUP AS SLX ON timProdPriceGroup.ProdPriceGroupKey = SLX.ProdPriceGroupKey  

Except 

SELECT     ProdPriceGroupKey, CompanyID, Description, ProdPriceGroupID, UpdateCounter, TIMPRODPRICEGROUPID
FROM         SalesLogix_TEST.sysdba.TIMPRODPRICEGROUP AS SLX

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

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed]
AS
SELECT     timProdPriceGroupPrice.ProdPriceGroupPriceKey, timProdPriceGroupPrice.CombineForBreak, timProdPriceGroupPrice.PricingKey, 
                      timProdPriceGroupPrice.ProdPriceGroupKey, timProdPriceGroupPrice.UpdateCounter, timProdPriceGroupPrice.WhseKey, SLX.TIMPRODPRICEGROUPPRICEID
FROM         timProdPriceGroupPrice LEFT OUTER JOIN
                      SalesLogix_TEST.sysdba.TIMPRODPRICEGROUPPRICE AS SLX ON timProdPriceGroupPrice.ProdPriceGroupPriceKey = SLX.ProdPriceGroupPriceKey

except

SELECT     ProdPriceGroupPriceKey, CombineForBreak, PricingKey, ProdPriceGroupKey, UpdateCounter, WhseKey, TIMPRODPRICEGROUPPRICEID
FROM         SalesLogix_TEST.sysdba.TIMPRODPRICEGROUPPRICE AS SLX

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
               Right = 270
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX_1"
            Begin Extent = 
               Top = 114
               Left = 38
               Bottom = 192
               Right = 270
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Changed'
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC]    Script Date: 04/07/2014 12:56:32 ******/
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

/****** Object:  View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC_Changed]    Script Date: 04/07/2014 12:56:32 ******/
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
                      SalesLogix_TEST.sysdba.TIMWAREHOUSE AS SLX ON timWarehouse.WhseKey = SLX.WhseKey     

Except
SELECT     WhseKey, AllowImmedPickFromSO, AllowImmedShipFromPick, AllowTrnsfrBackOrd, CompanyID, CostOfCarry, COSAcctKey, CostTierAdjAcctKey, CostToReplenish, 
                      CostWhseKey, Description, DfltLotPickMethod, DfltPickMeth, DfltPickOfOutOfStockItems, ImmedInvcPrinterDest, ImmedInvcRptSettingKey, ImmedPickPrinterDest, 
                      ImmedPickRptSettingKey, InvtAcctKey, IssueAcctKey, LastRankInvtPerKey, MailAddrKey, MaxDemandMult, MaxOrderCycle, MaxQualLeadTime, MaxQualLeadTimePct,
                       MaxSeasDemandMult, MinDemandMult, MinOrderCycle, MinQualLeadTimePct, MiscAdjAcctKey, PhysCountAcctKey, PriceWhseKey, PurchAcctKey, ReordMeth, 
                      RestockMeth, RestockRate, SalesAcctKey, SalesOffsetAcctKey, SalesReturnAcctKey, ShipAddrKey, ShipComplete, SortPickTckt, STaxSchdKey, TrackQtyAtBin, Transit, 
                      TrendPct, TrnsfrExpAcctKey, TrnsfrFrtChrgOpt, TrnsfrMrkupAcctKey, TrnsfrSrchrgOpt, UpdateCounter, UseBins, UseZones, WhseID, WhseMgrCntctKey, 
                      WhseOvrdSegValue, WillCallPickPrinterDest, WillCallPickRptSettingKey, TIMWAREHOUSEID
FROM         SalesLogix_TEST.sysdba.TIMWAREHOUSE AS SLX

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


