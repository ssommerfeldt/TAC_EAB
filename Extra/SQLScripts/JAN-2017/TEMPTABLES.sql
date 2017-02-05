--USE [SalesLogix_TEST]
GO

/****** Object:  Table [dbo].[MAS_to_SLX_SalesOrderHEADER_TAC_temp]    Script Date: 01/20/2017 10:29:30 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[MAS_to_SLX_SalesOrderHEADER_TAC_temp]') AND type in (N'U'))
DROP TABLE [dbo].[MAS_to_SLX_SalesOrderHEADER_TAC_temp]
GO

/****** Object:  Table [dbo].[MAS_to_SLX_SalesOrderHEADER_TAC_zcompare]    Script Date: 01/20/2017 10:29:30 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[MAS_to_SLX_SalesOrderHEADER_TAC_zcompare]') AND type in (N'U'))
DROP TABLE [dbo].[MAS_to_SLX_SalesOrderHEADER_TAC_zcompare]
GO

/****** Object:  Table [dbo].[MAS_to_SLX_SalesOrderLINE_TAC_temp]    Script Date: 01/20/2017 10:29:30 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[MAS_to_SLX_SalesOrderLINE_TAC_temp]') AND type in (N'U'))
DROP TABLE [dbo].[MAS_to_SLX_SalesOrderLINE_TAC_temp]
GO

/****** Object:  Table [dbo].[MAS_to_SLX_SalesOrderLINE_TAC_zcompare]    Script Date: 01/20/2017 10:29:30 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[MAS_to_SLX_SalesOrderLINE_TAC_zcompare]') AND type in (N'U'))
DROP TABLE [dbo].[MAS_to_SLX_SalesOrderLINE_TAC_zcompare]
GO

--USE [SalesLogix_TEST]
GO

/****** Object:  Table [dbo].[MAS_to_SLX_SalesOrderHEADER_TAC_temp]    Script Date: 01/20/2017 10:29:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[MAS_to_SLX_SalesOrderHEADER_TAC_temp](
	[TranStatus] [smallint] NULL,
	[Key1] [int] NOT NULL,
	[UserFld1] [varchar](15) NULL,
	[UserFld2] [varchar](15) NULL,
	[UserFld3] [varchar](15) NULL,
	[UserFld4] [varchar](15) NULL,
	[TranStatusAsText] [varchar](125) NULL,
	[TranID] [varchar](13) NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

--USE [SalesLogix_TEST]
GO

/****** Object:  Table [dbo].[MAS_to_SLX_SalesOrderHEADER_TAC_zcompare]    Script Date: 01/20/2017 10:29:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[MAS_to_SLX_SalesOrderHEADER_TAC_zcompare](
	[TranStatus] [smallint] NULL,
	[Key1] [int] NOT NULL,
	[UserFld1] [varchar](15) NULL,
	[UserFld2] [varchar](15) NULL,
	[UserFld3] [varchar](15) NULL,
	[UserFld4] [varchar](15) NULL,
	[TranStatusAsText] [varchar](125) NULL,
	[TranID] [varchar](13) NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

--USE [SalesLogix_TEST]
GO

/****** Object:  Table [dbo].[MAS_to_SLX_SalesOrderLINE_TAC_temp]    Script Date: 01/20/2017 10:29:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[MAS_to_SLX_SalesOrderLINE_TAC_temp](
	[ItemKey] [int] NULL,
	[ShipDate] [datetime2](3) NULL,
	[QtyShipped] [decimal](16, 8) NOT NULL,
	[SchdShipDate] [datetime2](3) NULL,
	[TranID] [varchar](13) NOT NULL,
	[UserFld1] [varchar](15) NULL,
	[UserFld2] [varchar](15) NULL,
	[UserFld3] [varchar](15) NULL,
	[UserFld4] [varchar](15) NULL,
	[TotalQTYShipped] [decimal](16, 8) NULL,
	[TotalQTYOrdered] [decimal](16, 8) NULL,
	[StatusText] [varchar](15) NULL,
	[OpenQTY] [decimal](16, 8) NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

--USE [SalesLogix_TEST]
GO

/****** Object:  Table [dbo].[MAS_to_SLX_SalesOrderLINE_TAC_zcompare]    Script Date: 01/20/2017 10:29:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[MAS_to_SLX_SalesOrderLINE_TAC_zcompare](
	[ItemKey] [int] NULL,
	[ShipDate] [datetime2](3) NULL,
	[QtyShipped] [decimal](16, 8) NOT NULL,
	[SchdShipDate] [datetime2](3) NULL,
	[TranID] [varchar](13) NOT NULL,
	[UserFld1] [varchar](15) NULL,
	[UserFld2] [varchar](15) NULL,
	[UserFld3] [varchar](15) NULL,
	[UserFld4] [varchar](15) NULL,
	[TotalQTYShipped] [decimal](16, 8) NULL,
	[TotalQTYOrdered] [decimal](16, 8) NULL,
	[StatusText] [varchar](15) NULL,
	[OpenQTY] [decimal](16, 8) NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


