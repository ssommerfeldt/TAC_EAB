USE [LiveEAB_app]
GO

/****** Object:  View [dbo].[vdvMAS_to_SLX_Products_TAC]    Script Date: 09/10/2012 18:19:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create view [dbo].[vdvMAS_to_SLX_Products_TAC]
as
SELECT     PROD.PRODUCTID,vdvStockStatus.ShortDesc AS NAME, vdvItem.LongDesc AS DESCRIPTION, vdvStockStatus.ItemID AS ACTUALID, vdvItem.ItemClassName AS FAMILY, 
                      timItem.StdPrice AS PRICE, vdvItem.ItemTypeAsText AS PRODUCTGROUP, vdvItem.StatusAsText AS STATUS, vdvStockStatus.UnitMeasID AS UNIT, NULL 
                      AS STOCKVOLUME, NULL AS STOCKWEIGHT, NULL AS STOCKITEM, NULL AS PROGRAM, NULL AS SUPPLIER, NULL AS VENDOR, NULL AS SITEID, NULL 
                      AS WAREHOUSELOCATION, NULL AS COMMISSIONABLE, NULL AS TAXABLE, NULL AS ACCOUNTINGPERIOD, tglAccount.GLAcctNo AS GLACCOUNTNUMBER, NULL 
                      AS GLSUBACCOUNTNUMBER, NULL AS DATAOWNER, NULL AS TYPE, NULL AS FIXEDCOST, NULL AS GLOBALSYNCID, NULL AS APPID, NULL AS TICK, NULL 
                      AS COMMODITYGROUPID, NULL AS ACTIVEFLAG, 'T' AS SELLINGALLOWEDFLAG, vdvStockStatus.StockUnitMeasKey AS UNITOFMEASUREID, NULL 
                      AS SELLINGUOMID, NULL AS SELLINGUOMNUMBER, NULL AS CLASSIFICATION, NULL AS COMMODITYTYPE, vdvStockStatus.ItemKey AS MASITEMKEY, 
                      timItemUnitOfMeas.UPC, vdvStockStatus.ItemID AS MASITEMID, vdvStockStatus.WhseID AS WAREHOUSEID, vdvStockStatus.CompanyID AS COMPANYID, 
                      vdvStockStatus.QtyOnHand AS QTYONHAND, vdvStockStatus.QtyAvailable AS QTYAVAILABLE, vdvStockStatus.SurplusQty AS SURPLUSQTY, 
                      vdvStockStatus.QtyOnHold AS QTYONHOLD, vdvStockStatus.MaxStockLevel AS MAXSTOCKLEVEL
FROM         vdvStockStatus INNER JOIN
                      timInventory ON vdvStockStatus.ItemKey = timInventory.ItemKey AND vdvStockStatus.WhseKey = timInventory.WhseKey INNER JOIN
                      timItem ON vdvStockStatus.ItemKey = timItem.ItemKey AND vdvStockStatus.WhseKey = vdvStockStatus.WhseKey INNER JOIN
                      tglAccount ON timInventory.InvtAcctKey = tglAccount.GLAcctKey LEFT OUTER JOIN
                      timItemUnitOfMeas ON vdvStockStatus.ItemKey = timItemUnitOfMeas.ItemKey LEFT OUTER JOIN
                      vdvItem ON vdvStockStatus.ItemKey = vdvItem.ItemKey
LEFT OUTER JOIN liveeab_slx.sysdba.PRODUCT AS Prod ON vdvStockStatus.CompanyID = Prod.CompanyID
AND vdvStockStatus.ItemID = Prod.ActualID
AND vdvStockStatus.WhseID = Prod.WarehouseID
GO


