USE [LiveEAB_slx]
GO

/****** Object:  View [sysdba].[vPRODUCTPRICESHEET]    Script Date: 06/26/2012 09:57:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [sysdba].[vProductPriceSheet]
AS
SELECT     sysdba.PRODUCT.PRODUCTID, sysdba.TIMPRICESHEET.LISTPRICE, sysdba.TIMPRICESHEET.WHSEKEY
FROM         sysdba.PRODUCT INNER JOIN
                      sysdba.PRODUCTREFERENCE ON sysdba.PRODUCT.PRODUCTID = sysdba.PRODUCTREFERENCE.PRODUCTID INNER JOIN
                      sysdba.TIMPRICESHEET ON sysdba.PRODUCTREFERENCE.ITEMKEY = sysdba.TIMPRICESHEET.ITEMKEY

GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[70] 4[3] 2[8] 3) )"
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
         Begin Table = "PRODUCT"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 373
               Right = 239
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "PRODUCTREFERENCE"
            Begin Extent = 
               Top = 45
               Left = 575
               Bottom = 404
               Right = 791
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "TIMPRICESHEET"
            Begin Extent = 
               Top = 131
               Left = 302
               Bottom = 428
               Right = 472
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
' , @level0type=N'SCHEMA',@level0name=N'sysdba', @level1type=N'VIEW',@level1name=N'vPRODUCTPRICESHEET'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'sysdba', @level1type=N'VIEW',@level1name=N'vPRODUCTPRICESHEET'
GO


