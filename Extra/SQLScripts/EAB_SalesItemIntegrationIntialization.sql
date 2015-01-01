

CREATE TABLE [dbo].[MAS_to_SLX_SalesOrderLINE_TAC_temp](
	[ItemKey] [int] NULL,
	[ShipDate] [datetime2](3) NULL,
	[QtyShipped] [decimal](16, 8) NOT NULL,
	[SchdShipDate] [datetime2](3) NULL,
	[TranID] [varchar](13) NOT NULL,
	[UserFld1] [varchar](15) NULL
) ON [PRIMARY]


CREATE TABLE [dbo].[MAS_to_SLX_SalesOrderLINE_TAC_zcompare](
	[ItemKey] [int] NULL,
	[ShipDate] [datetime2](3) NULL,
	[QtyShipped] [decimal](16, 8) NOT NULL,
	[SchdShipDate] [datetime2](3) NULL,
	[TranID] [varchar](13) NOT NULL,
	[UserFld1] [varchar](15) NULL
) ON [PRIMARY]

--=============================================================
-- Clean up Unused Tables
--=============================================================
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[MAS_to_SLX_SalesOrderItemShipment_TAC_temp]') AND type in (N'U'))
DROP TABLE [dbo].[MAS_to_SLX_SalesOrderItemShipment_TAC_temp]
Go

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[MAS_to_SLX_SalesOrderItemShipment_TAC_zcompare]') AND type in (N'U'))
DROP TABLE [dbo].[MAS_to_SLX_SalesOrderItemShipment_TAC_zcompare]
GO

IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vdvMAS_to_SLX_SalesOrder_TAC_CHANGED]'))
DROP VIEW [dbo].[vdvMAS_to_SLX_SalesOrder_TAC_CHANGED]
GO


--==============================================================
-- New View
--==============================================================
Create View [dbo].[vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED]
AS
Select * from dbo.MAS_to_SLX_SalesOrderLINE_TAC_temp
Except
Select * from dbo.MAS_to_SLX_SalesOrderLINE_TAC_zcompare
GO