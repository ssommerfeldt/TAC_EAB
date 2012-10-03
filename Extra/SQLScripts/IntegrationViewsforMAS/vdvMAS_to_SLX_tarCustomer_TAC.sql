USE [LiveEAB_MAS]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_tarCustomer_TAC]    Script Date: 10/03/2012 09:02:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vdvMAS_to_SLX_tarCustomer_TAC]
AS
SELECT     dbo.tarCustomer.CustKey, dbo.tarCustomer.ABANo, dbo.tarCustomer.AllowCustRefund, dbo.tarCustomer.AllowWriteOff, dbo.tarCustomer.BillingType, 
                      dbo.tarCustomer.BillToNationalAcctParent, dbo.tarCustomer.CompanyID, dbo.tarCustomer.ConsolidatedStatement, dbo.tarCustomer.CreateDate, 
                      dbo.tarCustomer.CreateType, dbo.tarCustomer.CreateUserID, dbo.tarCustomer.CreditLimit, dbo.tarCustomer.CreditLimitAgeCat, 
                      dbo.tarCustomer.CreditLimitUsed, dbo.tarCustomer.CRMCustID, dbo.tarCustomer.CurrExchSchdKey, dbo.tarCustomer.CustClassKey, 
                      dbo.tarCustomer.CustID, dbo.tarCustomer.CustName, dbo.tarCustomer.CustRefNo, dbo.tarCustomer.DateEstab, dbo.tarCustomer.DfltBillToAddrKey, 
                      dbo.tarCustomer.DfltItemKey, dbo.tarCustomer.DfltMaxUpCharge, dbo.tarCustomer.DfltMaxUpChargeType, dbo.tarCustomer.DfltSalesAcctKey, 
                      dbo.tarCustomer.DfltSalesReturnAcctKey, dbo.tarCustomer.DfltShipToAddrKey, dbo.tarCustomer.FinChgFlatAmt, dbo.tarCustomer.FinChgPct, 
                      dbo.tarCustomer.Hold, dbo.tarCustomer.ImportLogKey, dbo.tarCustomer.NationalAcctLevelKey, dbo.tarCustomer.PmtByNationalAcctParent, 
                      dbo.tarCustomer.PrimaryAddrKey, dbo.tarCustomer.PrimaryCntctKey, dbo.tarCustomer.PrintDunnMsg, dbo.tarCustomer.ReqCreditLimit, 
                      dbo.tarCustomer.ReqPO, dbo.tarCustomer.RetntPct, dbo.tarCustomer.SalesSourceKey, dbo.tarCustomer.ShipPriority, dbo.tarCustomer.Status, 
                      dbo.tarCustomer.StdIndusCodeID, dbo.tarCustomer.StmtCycleKey, dbo.tarCustomer.StmtFormKey, dbo.tarCustomer.TradeDiscPct, 
                      dbo.tarCustomer.UpdateCounter, dbo.tarCustomer.UpdateDate, dbo.tarCustomer.UpdateUserID, dbo.tarCustomer.UserFld1, dbo.tarCustomer.UserFld2, 
                      dbo.tarCustomer.UserFld3, dbo.tarCustomer.UserFld4, dbo.tarCustomer.VendKey, SLX.TARCUSTOMERID
FROM         dbo.tarCustomer LEFT OUTER JOIN
                      LiveEAB_SLX.sysdba.TARCUSTOMER AS SLX ON dbo.tarCustomer.CustKey = SLX.CustKey
WHERE     (SLX.TARCUSTOMERID IS NULL)

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
         Begin Table = "tarCustomer"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 114
               Right = 240
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "SLX"
            Begin Extent = 
               Top = 26
               Left = 305
               Bottom = 134
               Right = 507
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
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_tarCustomer_TAC'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vdvMAS_to_SLX_tarCustomer_TAC'
GO


