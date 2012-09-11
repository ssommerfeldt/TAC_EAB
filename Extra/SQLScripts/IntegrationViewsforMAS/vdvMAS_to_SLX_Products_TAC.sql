USE [LiveEAB_app]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC]    Script Date: 09/11/2012 09:34:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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
                      LiveEAB_slx.sysdba.PRODUCT AS Prod ON dbo.vdvStockStatus.CompanyID = Prod.COMPANYID AND dbo.vdvStockStatus.ItemID = Prod.ACTUALID AND 
                      dbo.vdvStockStatus.WhseID = Prod.WAREHOUSEID

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
         Begin Table = "vdvStockStatus"
            Begin Extent = 
               Top = 194
               Left = 351
               Bottom = 302
               Right = 538
            End
            DisplayFlags = 280
            TopColumn = 7
         End
         Begin Table = "timInventory"
            Begin Extent = 
               Top = 114
               Left = 38
               Bottom = 222
               Right = 263
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "timItem"
            Begin Extent = 
               Top = 6
               Left = 263
               Bottom = 114
               Right = 452
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tglAccount"
            Begin Extent = 
               Top = 18
               Left = 700
               Bottom = 126
               Right = 861
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "timItemUnitOfMeas"
            Begin Extent = 
               Top = 260
               Left = 678
               Bottom = 368
               Right = 852
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "vdvItem"
            Begin Extent = 
               Top = 142
               Left = 693
               Bottom = 250
               Right = 896
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Prod"
            Begin Extent = 
               Top = 271
               Left = 45
               Bottom = 379
               Right = 246
            End
       ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_Products_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'     DisplayFlags = 280
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_Products_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_Products_TAC'
GO


