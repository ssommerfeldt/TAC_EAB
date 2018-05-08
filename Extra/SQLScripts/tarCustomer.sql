USE [mas500_tst_app]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_TarCustomer_TAC]    Script Date: 03/26/2014 15:06:44 ******/
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


