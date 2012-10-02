USE [LiveEAB_SLX]
GO

/****** Object:  View [sysdba].[vlueProductGroup]    Script Date: 10/01/2012 21:12:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [sysdba].[vlueProductGroup]
AS
SELECT DISTINCT 
                      sysdba.TIMPRODPRICEGROUP.TIMPRODPRICEGROUPID AS MyID, sysdba.TIMPRODPRICEGROUP.CompanyID AS COMPANYID, 
                      sysdba.TIMPRODPRICEGROUP.TIMPRODPRICEGROUPID AS PRODCATEGORYID, 
                      sysdba.TIMPRODPRICEGROUP.ProdPriceGroupKey AS PRODCATEGORYKEY, sysdba.USERSECURITY.USERID, 
                      sysdba.TIMPRODPRICEGROUP.Description, derivedtbl_1.CNT AS iCount, sysdba.TIMPRODPRICEGROUP.ProdPriceGroupID
FROM         sysdba.TIMPRODPRICEGROUP INNER JOIN
                      sysdba.USERSECURITY ON sysdba.TIMPRODPRICEGROUP.CompanyID = sysdba.USERSECURITY.MASCOMPANYID LEFT OUTER JOIN
                          (SELECT     COUNT(*) AS CNT, COMPANYID, ISNULL(MASPRODPRICEGROUPKEY, '') AS MASPRODPRICEGROUPKEY
                            FROM          sysdba.PRODUCT
                            GROUP BY COMPANYID, MASPRODPRICEGROUPKEY) AS derivedtbl_1 ON 
                      sysdba.TIMPRODPRICEGROUP.CompanyID = derivedtbl_1.COMPANYID AND 
                      sysdba.TIMPRODPRICEGROUP.ProdPriceGroupKey = derivedtbl_1.MASPRODPRICEGROUPKEY

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
         Begin Table = "USERSECURITY (sysdba)"
            Begin Extent = 
               Top = 124
               Left = 683
               Bottom = 374
               Right = 891
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "TIMPRODPRICEGROUP (sysdba)"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 270
               Right = 240
            End
            DisplayFlags = 280
            TopColumn = 4
         End
         Begin Table = "derivedtbl_1"
            Begin Extent = 
               Top = 6
               Left = 278
               Bottom = 99
               Right = 490
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
         Width = 2205
         Width = 1500
         Width = 3270
         Width = 1500
         Width = 2205
         Width = 3090
         Width = 3315
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 3765
         Alias = 2370
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
' , @level0type=N'SCHEMA',@level0name=N'sysdba', @level1type=N'VIEW',@level1name=N'vlueProductGroup'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'sysdba', @level1type=N'VIEW',@level1name=N'vlueProductGroup'
GO


