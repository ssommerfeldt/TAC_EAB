USE [SalesLogix_TEST]
GO

/****** Object:  Table [sysdba].[PRODUCT]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[PRODUCT]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[PRODUCT]
GO

/****** Object:  Table [sysdba].[PRODUCTPROGRAM]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[PRODUCTPROGRAM]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[PRODUCTPROGRAM]
GO

/****** Object:  Table [sysdba].[STGINVTTRAN_TAC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGINVTTRAN_TAC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGINVTTRAN_TAC]
GO

/****** Object:  Table [sysdba].[STGINVTTRANBATCH_TAC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGINVTTRANBATCH_TAC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGINVTTRANBATCH_TAC]
GO

/****** Object:  Table [sysdba].[STGPOLINE_TAC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGPOLINE_TAC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGPOLINE_TAC]
GO

/****** Object:  Table [sysdba].[STGPORCPTDIST]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGPORCPTDIST]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGPORCPTDIST]
GO

/****** Object:  Table [sysdba].[STGPORCPTLINE]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGPORCPTLINE]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGPORCPTLINE]
GO

/****** Object:  Table [sysdba].[STGPORCPTRCVR]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGPORCPTRCVR]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGPORCPTRCVR]
GO

/****** Object:  Table [sysdba].[STGPORCPTTRANSBATCH]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGPORCPTTRANSBATCH]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGPORCPTTRANSBATCH]
GO

/****** Object:  Table [sysdba].[STGPURCHASEORDER_TAC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGPURCHASEORDER_TAC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGPURCHASEORDER_TAC]
GO

/****** Object:  Table [sysdba].[STGSALESORDER_TAC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGSALESORDER_TAC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGSALESORDER_TAC]
GO

/****** Object:  Table [sysdba].[STGSOLINE_TAC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGSOLINE_TAC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGSOLINE_TAC]
GO

/****** Object:  Table [sysdba].[STGSOPICKLIST_TAC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGSOPICKLIST_TAC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGSOPICKLIST_TAC]
GO

/****** Object:  Table [sysdba].[STGSOPICKLISTLINE_TAC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGSOPICKLISTLINE_TAC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGSOPICKLISTLINE_TAC]
GO

/****** Object:  Table [sysdba].[STGTRNSFRORDER_TAC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGTRNSFRORDER_TAC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGTRNSFRORDER_TAC]
GO

/****** Object:  Table [sysdba].[STGTRNSFRORDERLINE_TAC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STGTRNSFRORDERLINE_TAC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STGTRNSFRORDERLINE_TAC]
GO

/****** Object:  Table [sysdba].[STOCKCARDITEMS]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[STOCKCARDITEMS]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[STOCKCARDITEMS]
GO

/****** Object:  Table [sysdba].[TACINVENTORYITEMEXC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TACINVENTORYITEMEXC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TACINVENTORYITEMEXC]
GO

/****** Object:  Table [sysdba].[TACNATIONALACCTITEMEXC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TACNATIONALACCTITEMEXC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TACNATIONALACCTITEMEXC]
GO

/****** Object:  Table [sysdba].[TARCUSTADDR]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TARCUSTADDR]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TARCUSTADDR]
GO

/****** Object:  Table [sysdba].[TARCUSTOMER]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TARCUSTOMER]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TARCUSTOMER]
GO

/****** Object:  Table [sysdba].[TARNATIONALACCT]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TARNATIONALACCT]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TARNATIONALACCT]
GO

/****** Object:  Table [sysdba].[TARNATIONALACCTLEVEL]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TARNATIONALACCTLEVEL]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TARNATIONALACCTLEVEL]
GO

/****** Object:  Table [sysdba].[TIMCUSTITEM]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TIMCUSTITEM]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TIMCUSTITEM]
GO

/****** Object:  Table [sysdba].[TIMNATACCTITEMPRICE]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TIMNATACCTITEMPRICE]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TIMNATACCTITEMPRICE]
GO

/****** Object:  Table [sysdba].[TIMNATACCTPRODGRPPRC]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TIMNATACCTPRODGRPPRC]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TIMNATACCTPRODGRPPRC]
GO

/****** Object:  Table [sysdba].[TIMPRICEBREAK]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TIMPRICEBREAK]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TIMPRICEBREAK]
GO

/****** Object:  Table [sysdba].[TIMPRICEGROUPPRICE]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TIMPRICEGROUPPRICE]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TIMPRICEGROUPPRICE]
GO

/****** Object:  Table [sysdba].[TIMPRICESHEET]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TIMPRICESHEET]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TIMPRICESHEET]
GO

/****** Object:  Table [sysdba].[TIMPRICING]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TIMPRICING]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TIMPRICING]
GO

/****** Object:  Table [sysdba].[TIMPRODCATEGORY]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TIMPRODCATEGORY]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TIMPRODCATEGORY]
GO

/****** Object:  Table [sysdba].[TIMPRODCATITEM]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TIMPRODCATITEM]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TIMPRODCATITEM]
GO

/****** Object:  Table [sysdba].[TIMPRODPRICEGROUP]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TIMPRODPRICEGROUP]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TIMPRODPRICEGROUP]
GO

/****** Object:  Table [sysdba].[TIMPRODPRICEGROUPPRICE]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TIMPRODPRICEGROUPPRICE]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TIMPRODPRICEGROUPPRICE]
GO

/****** Object:  Table [sysdba].[TIMWAREHOUSE]    Script Date: 05/12/2014 10:36:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[sysdba].[TIMWAREHOUSE]') AND type in (N'U'))
TRUNCATE TABLE [sysdba].[TIMWAREHOUSE]
GO

tRUNCATE TABLE sysdba.salesorder
truncate table sysdba.salesorderitems


