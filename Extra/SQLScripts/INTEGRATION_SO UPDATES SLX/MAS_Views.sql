USE [mas_500_app]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_SalesOrderItemShipment_TAC]    Script Date: 08/20/2014 00:20:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_SalesOrderItemShipment_TAC]
AS
SELECT     SLX.SALESORDERID, SLX.SOID, SLX.SALESORDERITEMSID, SLX.LINENUMBER, tmpSOHeader.UserFld1, tmpSOHeader.StatusTXT, dbo.vdvShipmentLine.ShipDate, 
                      dbo.vdvShipmentLine.QtyShipped, dbo.vdvShipmentLine.SchdShipDate, tmpSOHeader.TranID
FROM         dbo.vdvShipmentLine INNER JOIN
                          (SELECT     Status, SOKey, UserFld1, 
                                                   CASE status WHEN '0' THEN 'Unacknoledged' WHEN '1' THEN 'Open' WHEN '2' THEN 'Inactive' WHEN '3' THEN 'Canceled' WHEN '4' THEN 'Closed' WHEN
                                                    '5' THEN 'Incomplete' WHEN '6' THEN 'Pending Approval' END AS StatusTXT, TranID
                            FROM          dbo.tsoSalesOrder
                            WHERE      (UserFld1 IS NOT NULL) AND (UserFld1 <> '')) AS tmpSOHeader ON dbo.vdvShipmentLine.SOKey = tmpSOHeader.SOKey INNER JOIN
                          (SELECT     SOH.SALESORDERID, SOH.ALTERNATEKEYPREFIX + '-' + SOH.ALTERNATEKEYSUFFIX AS SOID, SOLine.SALESORDERITEMSID, SOLine.LINENUMBER, 
                                                   EAB_SLX.sysdba.PRODUCT.MASITEMKEY, EAB_SLX.sysdba.PRODUCT.PRODUCTID, EAB_SLX.sysdba.PRODUCT.NAME, 
                                                   EAB_SLX.sysdba.PRODUCT.MASITEMID
                            FROM          EAB_SLX.sysdba.SALESORDER AS SOH INNER JOIN
                                                   EAB_SLX.sysdba.SALESORDERITEMS AS SOLine ON SOH.SALESORDERID = SOLine.SALESORDERID INNER JOIN
                                                   EAB_SLX.sysdba.PRODUCT ON SOLine.PRODUCTID = EAB_SLX.sysdba.PRODUCT.PRODUCTID
                            WHERE      (SOLine.QUANTITY > 0)) AS SLX ON tmpSOHeader.UserFld1 = SLX.SOID AND dbo.vdvShipmentLine.ItemKey = SLX.MASITEMKEY
WHERE     (tmpSOHeader.UserFld1 IS NOT NULL)

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


