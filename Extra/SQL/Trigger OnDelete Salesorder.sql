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
