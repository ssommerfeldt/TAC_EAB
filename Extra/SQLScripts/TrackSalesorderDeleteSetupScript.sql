
/****** Object:  Table [sysdba].[SALESORDER]    Script Date: 10/23/2014 09:46:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [sysdba].[SALESORDER_History](
	[ACCOUNTID] [char](12) NOT NULL,
	[BILLINGID] [char](12) NULL,
	[BILLTONAME] [varchar](64) NULL,
	[COMMENTS] [varchar](MAX) NULL,
	[CREATEDATE] [datetime] NULL,
	[CREATEUSER] [char](12) NULL,
	[CURRENCYCODE] [varchar](64) NULL,
	[CUSTOMERPURCHASEORDERNUMBER] [varchar](15) NULL,
	[DOCUMENTID] [char](12) NULL,
	[FOB] [varchar](15) NULL,
	[FREIGHT] [float] NULL,
	[MODIFYDATE] [datetime] NULL,
	[MODIFYUSER] [char](12) NULL,
	[OPPORTUNITYID] [char](12) NULL,
	[ORDERDATE] [datetime] NULL,
	[ORDERTOTAL] [float] NULL,
	[ORDERTYPE] [varchar](64) NULL,
	[SALESCOMMISSION] [float] NULL,
	[SALESORDERID] [char](12) NOT NULL,
	[SHIPPINGID] [char](12) NULL,
	[SHIPTONAME] [varchar](64) NULL,
	[SHIPVIA] [varchar](64) NULL,
	[STATUS] [varchar](64) NULL,
	[TAX] [float] NULL,
	[TERMSID] [char](12) NULL,
	[TRADEDISCOUNT] [float] NULL,
	[TRANSMITDATE] [datetime] NULL,
	[USERID] [char](12) NULL,
	[BILLINGCONTACTID] [char](12) NULL,
	[SHIPPINGCONTACTID] [char](12) NULL,
	[USERFIELD1] [varchar](64) NULL,
	[USERFIELD2] [varchar](64) NULL,
	[USERFIELD3] [varchar](64) NULL,
	[USERFIELD4] [varchar](128) NULL,
	[USERFIELD5] [varchar](128) NULL,
	[USERFIELD6] [varchar](1000) NULL,
	[ALTERNATEKEYPREFIX] [varchar](8) NULL,
	[ALTERNATEKEYSUFFIX] [varchar](24) NULL,
	[ACCOUNTMANAGERID] [char](12) NULL,
	[DATEPROMISED] [datetime] NULL,
	[DISCOUNT] [float] NULL,
	[EXCHANGERATE] [float] NULL,
	[EXCHANGERATEDATE] [datetime] NULL,
	[EXCHANGERATELOCKED] [varchar](1) NULL,
	[GRANDTOTAL] [float] NULL,
	[REQUESTEDBY] [char](12) NULL,
	[SECCODEID] [char](12) NULL,
	[GLOBALSYNCID] [varchar](36) NULL,
	[APPID] [varchar](12) NULL,
	[TICK] [int] NULL,
	[ACTIVEFLAG] [varchar](1) NULL,
	[PRICELISTID] [char](12) NULL,
	[DUEDATE] [datetime] NULL,
	[OPERATINGCOMPID] [char](12) NULL,
	[ISQUOTE] [varchar](1) NULL,
	[DISCOUNTTOTAL] [float] NULL,
	[TAXTOTAL] [float] NULL,
	[CREATESOURCE] [varchar](64) NULL,
	[WAREHOUSEKEY] [varchar](10) NULL,
	[USERWHSEID] [char](12) NULL,
	[SOURCEWHSEID] [char](12) NULL,
	[MASSTATUS] [varchar](32) NULL,
	[MASNUMBER] [varchar](32) NULL,
	[SUBTOTAL] [numeric](17, 4) NULL,
	[DeletedDate] [datetime] NULL,
	[DeletedUser] [char](12) NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO



/****** Object:  Table [sysdba].[SALESORDERITEMS]    Script Date: 10/23/2014 09:50:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [sysdba].[SALESORDERITEMS_History](
	[SALESORDERITEMSID] [char](12) NOT NULL,
	[SALESORDERID] [char](12) NOT NULL,
	[CREATEUSER] [char](12) NULL,
	[CREATEDATE] [datetime] NULL,
	[MODIFYUSER] [char](12) NULL,
	[MODIFYDATE] [datetime] NULL,
	[PRODUCT] [varchar](64) NULL,
	[PROGRAM] [varchar](64) NULL,
	[PRICE] [float] NULL,
	[QUANTITY] [float] NULL,
	[DISCOUNT] [float] NULL,
	[FAMILY] [varchar](32) NULL,
	[OPPPRODUCTID] [char](12) NULL,
	[PRODUCTID] [char](12) NULL,
	[ACTUALID] [varchar](64) NULL,
	[DESCRIPTION] [varchar](MAX) NULL,
	[EXTENDEDPRICE] [float] NULL,
	[UNIT] [varchar](64) NULL,
	[CALCULATEDPRICE] [numeric](17, 4) NULL,
	[GLOBALSYNCID] [varchar](36) NULL,
	[LINENUMBER] [int] NULL,
	[LINETYPE] [varchar](32) NULL,
	[SLXLOCATIONID] [char](12) NULL,
	[UNITOFMEASUREID] [char](12) NULL,
	[PRICEDETAILDESCRIPTION] [varchar](256) NULL,
	[PRICEDETAILNOTES] [varchar](MAX) NULL,
	[ITEMLOCKED] [varchar](1) NULL,
	[TICK] [int] NULL,
	[APPID] [char](12) NULL,
	[COMMODITYTYPE] [varchar](32) NULL,
	[CREATESOURCE] [varchar](64) NULL,
	[UPC] [varchar](32) NULL,
	[MAX_STOCKLEVEL] [int] NULL,
	[ORIGPRODUCTPRICE] [float] NULL,
	[ORIGPRODUCTDISCOUNT] [float] NULL,
	[TACACCOUNTID] [char](12) NULL,
	[TACSTOCKCARDITEMID] [char](12) NULL,
	[LASTORDER] [varchar](32) NULL,
	[LASTORDER2] [varchar](32) NULL,
	[LASTORDER3] [varchar](32) NULL,
	[PREVIOUSYEARSALESQTY] [varchar](32) NULL,
	[CURRENTYEARSALESQTY] [varchar](32) NULL,
	[ACCOUNTID] [char](12) NULL,
	[MASSHIPPEDDATE] [datetime] NULL,
	[MASQTYSHIPPED] [varchar](32) NULL,
	[MASSCHDSHIPDATE] [datetime] NULL,
	[DeletedDate] [datetime] NULL,
	[DeletedUser] [char](12) NULL
 ) ON [PRIMARY] 

GO

SET ANSI_PADDING OFF
GO


-- ================================================
-- Template generated from Template Explorer using:
-- Create Trigger (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- See additional Create Trigger templates for more
-- examples of different Trigger statements.
--
-- This block of comments will not be included in
-- the definition of the function.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		pgarratt
-- Create date: 
-- Description:	Track Deletions to salesorder tables
-- =============================================
CREATE TRIGGER sysdba.OnDelete_TrackHistory_Salesorder
   ON  sysdba.SALESORDER 
   AFTER DELETE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
    INSERT INTO sysdba.SALESORDER_HISTORY
	SELECT [ACCOUNTID]
      ,[BILLINGID]
      ,[BILLTONAME]
      ,'Comments removed'
      ,[CREATEDATE]
      ,[CREATEUSER]
      ,[CURRENCYCODE]
      ,[CUSTOMERPURCHASEORDERNUMBER]
      ,[DOCUMENTID]
      ,[FOB]
      ,[FREIGHT]
      ,[MODIFYDATE]
      ,[MODIFYUSER]
      ,[OPPORTUNITYID]
      ,[ORDERDATE]
      ,[ORDERTOTAL]
      ,[ORDERTYPE]
      ,[SALESCOMMISSION]
      ,[SALESORDERID]
      ,[SHIPPINGID]
      ,[SHIPTONAME]
      ,[SHIPVIA]
      ,[STATUS]
      ,[TAX]
      ,[TERMSID]
      ,[TRADEDISCOUNT]
      ,[TRANSMITDATE]
      ,[USERID]
      ,[BILLINGCONTACTID]
      ,[SHIPPINGCONTACTID]
      ,[USERFIELD1]
      ,[USERFIELD2]
      ,[USERFIELD3]
      ,[USERFIELD4]
      ,[USERFIELD5]
      ,[USERFIELD6]
      ,[ALTERNATEKEYPREFIX]
      ,[ALTERNATEKEYSUFFIX]
      ,[ACCOUNTMANAGERID]
      ,[DATEPROMISED]
      ,[DISCOUNT]
      ,[EXCHANGERATE]
      ,[EXCHANGERATEDATE]
      ,[EXCHANGERATELOCKED]
      ,[GRANDTOTAL]
      ,[REQUESTEDBY]
      ,[SECCODEID]
      ,[GLOBALSYNCID]
      ,[APPID]
      ,[TICK]
      ,[ACTIVEFLAG]
      ,[PRICELISTID]
      ,[DUEDATE]
      ,[OPERATINGCOMPID]
      ,[ISQUOTE]
      ,[DISCOUNTTOTAL]
      ,[TAXTOTAL]
      ,[CREATESOURCE]
      ,[WAREHOUSEKEY]
      ,[USERWHSEID]
      ,[SOURCEWHSEID]
      ,[MASSTATUS]
      ,[MASNUMBER]
      ,[SUBTOTAL]
      , GetDate() as DeletedDate
      , ModifyUser as DeletedUser 
      FROM DELETED

END
GO


-- ================================================
-- Template generated from Template Explorer using:
-- Create Trigger (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- See additional Create Trigger templates for more
-- examples of different Trigger statements.
--
-- This block of comments will not be included in
-- the definition of the function.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		pgarratt
-- Create date: 
-- Description:	Track Deletions to salesorder tables
-- =============================================
CREATE TRIGGER sysdba.OnDelete_TrackHistory_SalesorderItems
   ON  sysdba.SALESORDERITEMS
   AFTER DELETE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
    INSERT INTO sysdba.SALESORDERITEMS_HISTORY
	SELECT [SALESORDERITEMSID]
      ,[SALESORDERID]
      ,[CREATEUSER]
      ,[CREATEDATE]
      ,[MODIFYUSER]
      ,[MODIFYDATE]
      ,[PRODUCT]
      ,[PROGRAM]
      ,[PRICE]
      ,[QUANTITY]
      ,[DISCOUNT]
      ,[FAMILY]
      ,[OPPPRODUCTID]
      ,[PRODUCTID]
      ,[ACTUALID]
      ,'Description Removed'
      ,[EXTENDEDPRICE]
      ,[UNIT]
      ,[CALCULATEDPRICE]
      ,[GLOBALSYNCID]
      ,[LINENUMBER]
      ,[LINETYPE]
      ,[SLXLOCATIONID]
      ,[UNITOFMEASUREID]
      ,[PRICEDETAILDESCRIPTION]
      ,'PRICEDETAILNOTES Removed'
      ,[ITEMLOCKED]
      ,[TICK]
      ,[APPID]
      ,[COMMODITYTYPE]
      ,[CREATESOURCE]
      ,[UPC]
      ,[MAX_STOCKLEVEL]
      ,[ORIGPRODUCTPRICE]
      ,[ORIGPRODUCTDISCOUNT]
      ,[TACACCOUNTID]
      ,[TACSTOCKCARDITEMID]
      ,[LASTORDER]
      ,[LASTORDER2]
      ,[LASTORDER3]
      ,[PREVIOUSYEARSALESQTY]
      ,[CURRENTYEARSALESQTY]
      ,[ACCOUNTID]
      ,[MASSHIPPEDDATE]
      ,[MASQTYSHIPPED]
      ,[MASSCHDSHIPDATE]
	, GetDate() as DeletedDate
	, ModifyUser as DeletedUser 
	FROM DELETED

END
GO

