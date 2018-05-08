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
