USE [LiveEAB_app]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_Changed_TAC]    Script Date: 09/10/2012 18:17:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

Create view [dbo].[vdvMAS_to_SLX_Products_Changed_TAC]
as
SELECT     distinct TMPSOURCE.*
FROM         (SELECT     ISNULL(CONVERT(varchar(255), CAST(PRODUCTID AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(STOCKITEM AS char)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(SITEID AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(COMMISSIONABLE AS char)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(TAXABLE AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(COMMODITYGROUPID AS char)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(UNITOFMEASUREID AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(SELLINGUOMID AS char)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(PRICE AS decimal(17, 4))), '') + ISNULL(CONVERT(varchar(255), CAST(FIXEDCOST AS decimal(17, 4))), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(SELLINGUOMNUMBER AS float)), '') + ISNULL(CONVERT(varchar(255), CAST(QTYONHAND AS float)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(QTYAVAILABLE AS float)), '') + ISNULL(CONVERT(varchar(255), CAST(SURPLUSQTY AS float)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(QTYONHOLD AS float)), '') + ISNULL(CONVERT(varchar(255), CAST(MAXSTOCKLEVEL AS float)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(TICK AS int)), '') + ISNULL(CONVERT(varchar(255), CAST(MASITEMKEY AS int)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(STOCKVOLUME AS real)), '') + ISNULL(CONVERT(varchar(255), CAST(STOCKWEIGHT AS real)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(DESCRIPTION AS text)), '') + ISNULL(CONVERT(varchar(255), CAST(NAME AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(ACTUALID AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(FAMILY AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(PRODUCTGROUP AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(STATUS AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(UNIT AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(PROGRAM AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(SUPPLIER AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(VENDOR AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(WAREHOUSELOCATION AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(ACCOUNTINGPERIOD AS varchar)), '') 
                                              + ISNULL(CONVERT(varchar(255), CAST(GLACCOUNTNUMBER AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(GLSUBACCOUNTNUMBER AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(DATAOWNER AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(TYPE AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(GLOBALSYNCID AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(APPID AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(ACTIVEFLAG AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(SELLINGALLOWEDFLAG AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(CLASSIFICATION AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(COMMODITYTYPE AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(UPC AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(MASITEMID AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(WAREHOUSEID AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                              CAST(COMPANYID AS varchar)), '') AS MYID, PRODUCTID, NAME, DESCRIPTION, ACTUALID, FAMILY, PRICE, PRODUCTGROUP, STATUS, UNIT, 
                                              STOCKVOLUME, STOCKWEIGHT, STOCKITEM, PROGRAM, SUPPLIER, VENDOR, SITEID, WAREHOUSELOCATION, COMMISSIONABLE, TAXABLE, 
                                              ACCOUNTINGPERIOD, GLACCOUNTNUMBER, GLSUBACCOUNTNUMBER, DATAOWNER, TYPE, FIXEDCOST, GLOBALSYNCID, APPID, TICK, 
                                              COMMODITYGROUPID, ACTIVEFLAG, SELLINGALLOWEDFLAG, UNITOFMEASUREID, SELLINGUOMID, SELLINGUOMNUMBER, CLASSIFICATION, 
                                              COMMODITYTYPE, MASITEMKEY, UPC, MASITEMID, WAREHOUSEID, COMPANYID, QTYONHAND, QTYAVAILABLE, SURPLUSQTY, QTYONHOLD, 
                                              MAXSTOCKLEVEL
                       FROM          vdvMAS_to_SLX_Products_TAC) AS TMPSOURCE INNER JOIN
                          (SELECT     ISNULL(CONVERT(varchar(255), CAST(PRODUCTID AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(STOCKITEM AS char)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(SITEID AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(COMMISSIONABLE AS char)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(TAXABLE AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(COMMODITYGROUPID AS char)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(UNITOFMEASUREID AS char)), '') + ISNULL(CONVERT(varchar(255), CAST(SELLINGUOMID AS char)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(PRICE AS decimal(17, 4))), '') + ISNULL(CONVERT(varchar(255), CAST(FIXEDCOST AS decimal(17, 4))), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(SELLINGUOMNUMBER AS float)), '') + ISNULL(CONVERT(varchar(255), CAST(QTYONHAND AS float)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(QTYAVAILABLE AS float)), '') + ISNULL(CONVERT(varchar(255), CAST(SURPLUSQTY AS float)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(QTYONHOLD AS float)), '') + ISNULL(CONVERT(varchar(255), CAST(MAXSTOCKLEVEL AS float)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(TICK AS int)), '') + ISNULL(CONVERT(varchar(255), CAST(MASITEMKEY AS int)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(STOCKVOLUME AS real)), '') + ISNULL(CONVERT(varchar(255), CAST(STOCKWEIGHT AS real)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(DESCRIPTION AS text)), '') + ISNULL(CONVERT(varchar(255), CAST(NAME AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(ACTUALID AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(FAMILY AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(PRODUCTGROUP AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(STATUS AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(UNIT AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(PROGRAM AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(SUPPLIER AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(VENDOR AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(WAREHOUSELOCATION AS varchar)), '') + ISNULL(CONVERT(varchar(255), 
                                                   CAST(ACCOUNTINGPERIOD AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(GLACCOUNTNUMBER AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(GLSUBACCOUNTNUMBER AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(DATAOWNER AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(TYPE AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(GLOBALSYNCID AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(APPID AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(ACTIVEFLAG AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(SELLINGALLOWEDFLAG AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(CLASSIFICATION AS varchar)), 
                                                   '') + ISNULL(CONVERT(varchar(255), CAST(COMMODITYTYPE AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(UPC AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(MASITEMID AS varchar)), '') + ISNULL(CONVERT(varchar(255), CAST(WAREHOUSEID AS varchar)), '') 
                                                   + ISNULL(CONVERT(varchar(255), CAST(COMPANYID AS varchar)), '') AS MYID, PRODUCTID, NAME, DESCRIPTION, ACTUALID, FAMILY, PRICE, 
                                                   CREATEDATE, CREATEUSER, MODIFYDATE, MODIFYUSER, PRODUCTGROUP, STATUS, UNIT, STOCKVOLUME, STOCKWEIGHT, STOCKITEM, PROGRAM, 
                                                   SUPPLIER, VENDOR, SITEID, WAREHOUSELOCATION, COMMISSIONABLE, TAXABLE, ACCOUNTINGPERIOD, GLACCOUNTNUMBER, 
                                                   GLSUBACCOUNTNUMBER, DATAOWNER, TYPE, FIXEDCOST, GLOBALSYNCID, APPID, TICK, COMMODITYGROUPID, ACTIVEFLAG, 
                                                   SELLINGALLOWEDFLAG, UNITOFMEASUREID, SELLINGUOMID, SELLINGUOMNUMBER, CLASSIFICATION, COMMODITYTYPE, MASITEMKEY, UPC, 
                                                   MASITEMID, WAREHOUSEID, COMPANYID, QTYONHAND, QTYAVAILABLE, SURPLUSQTY, QTYONHOLD, MAXSTOCKLEVEL
                            FROM          LiveEAB_slx.sysdba.PRODUCT) AS TMPDESTINATION ON TMPSOURCE.MYID <> TMPDESTINATION.MYID AND 
                      TMPSOURCE.PRODUCTID = TMPDESTINATION.PRODUCTID
GO


