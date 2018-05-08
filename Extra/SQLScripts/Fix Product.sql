--===========================================================================================================================================================
-- Script to Identify items in Production that are out of Sync. Create a temporty Change that will force a resync of proper values to get things going again
--=============================================================================================================================================================

update dbo.MAS_TO_SLX_PRODUCT_Temp
set SUPPLIER  = '999' where MASITEMKEY  in (
Select MASITEMKEY  from (

SELECT     MAS_TO_SLX_PRODUCT_ZCompare.NAME, Cast (MAS_TO_SLX_PRODUCT_ZCompare.DESCRIPTION as varchar(4000)) Description, MAS_TO_SLX_PRODUCT_ZCompare.ACTUALID, 
                      MAS_TO_SLX_PRODUCT_ZCompare.FAMILY, MAS_TO_SLX_PRODUCT_ZCompare.PRICE, MAS_TO_SLX_PRODUCT_ZCompare.PRODUCTGROUP, 
                      MAS_TO_SLX_PRODUCT_ZCompare.STATUS, MAS_TO_SLX_PRODUCT_ZCompare.UNIT, MAS_TO_SLX_PRODUCT_ZCompare.STOCKVOLUME, 
                      MAS_TO_SLX_PRODUCT_ZCompare.STOCKWEIGHT, MAS_TO_SLX_PRODUCT_ZCompare.STOCKITEM, MAS_TO_SLX_PRODUCT_ZCompare.PROGRAM, 
                      MAS_TO_SLX_PRODUCT_ZCompare.SUPPLIER, MAS_TO_SLX_PRODUCT_ZCompare.VENDOR, MAS_TO_SLX_PRODUCT_ZCompare.SITEID, 
                      MAS_TO_SLX_PRODUCT_ZCompare.WAREHOUSELOCATION, MAS_TO_SLX_PRODUCT_ZCompare.COMMISSIONABLE, 
                      MAS_TO_SLX_PRODUCT_ZCompare.TAXABLE, MAS_TO_SLX_PRODUCT_ZCompare.ACCOUNTINGPERIOD, 
                      MAS_TO_SLX_PRODUCT_ZCompare.GLACCOUNTNUMBER, MAS_TO_SLX_PRODUCT_ZCompare.GLSUBACCOUNTNUMBER, 
                      MAS_TO_SLX_PRODUCT_ZCompare.DATAOWNER, MAS_TO_SLX_PRODUCT_ZCompare.TYPE, MAS_TO_SLX_PRODUCT_ZCompare.FIXEDCOST, 
                      MAS_TO_SLX_PRODUCT_ZCompare.GLOBALSYNCID, MAS_TO_SLX_PRODUCT_ZCompare.APPID, MAS_TO_SLX_PRODUCT_ZCompare.TICK, 
                      MAS_TO_SLX_PRODUCT_ZCompare.COMMODITYGROUPID, MAS_TO_SLX_PRODUCT_ZCompare.ACTIVEFLAG, 
                      MAS_TO_SLX_PRODUCT_ZCompare.SELLINGALLOWEDFLAG, MAS_TO_SLX_PRODUCT_ZCompare.UNITOFMEASUREID, 
                      MAS_TO_SLX_PRODUCT_ZCompare.SELLINGUOMID, MAS_TO_SLX_PRODUCT_ZCompare.SELLINGUOMNUMBER, 
                      MAS_TO_SLX_PRODUCT_ZCompare.CLASSIFICATION, MAS_TO_SLX_PRODUCT_ZCompare.COMMODITYTYPE, MAS_TO_SLX_PRODUCT_ZCompare.MASITEMKEY, 
                      MAS_TO_SLX_PRODUCT_ZCompare.UPC, MAS_TO_SLX_PRODUCT_ZCompare.MASITEMID, MAS_TO_SLX_PRODUCT_ZCompare.WAREHOUSEID, 
                      MAS_TO_SLX_PRODUCT_ZCompare.CompanyID, MAS_TO_SLX_PRODUCT_ZCompare.QtyOnHand, MAS_TO_SLX_PRODUCT_ZCompare.QtyAvailable, 
                      MAS_TO_SLX_PRODUCT_ZCompare.SurplusQty, MAS_TO_SLX_PRODUCT_ZCompare.QtyOnHold, MAS_TO_SLX_PRODUCT_ZCompare.MaxStockLevel, 
                      MAS_TO_SLX_PRODUCT_ZCompare.ProdPriceGroupKey, sysdba.PRODUCT.PRODUCTID
FROM         MAS_TO_SLX_PRODUCT_ZCompare INNER JOIN
                      sysdba.PRODUCT ON MAS_TO_SLX_PRODUCT_ZCompare.MASITEMKEY = sysdba.PRODUCT.MASITEMKEY AND 
                      MAS_TO_SLX_PRODUCT_ZCompare.WAREHOUSEID = sysdba.PRODUCT.WAREHOUSEID AND 
                      MAS_TO_SLX_PRODUCT_ZCompare.CompanyID = sysdba.PRODUCT.COMPANYID
            except          
                      
                      SELECT     NAME, Cast(DESCRIPTION as varchar(4000)) Description, ACTUALID, 
                      FAMILY, PRICE, PRODUCTGROUP, 
                      STATUS, UNIT, STOCKVOLUME, 
                      STOCKWEIGHT, STOCKITEM, PROGRAM, 
                      SUPPLIER, VENDOR, SITEID, 
                      WAREHOUSELOCATION, COMMISSIONABLE, 
                      TAXABLE, ACCOUNTINGPERIOD, 
                      GLACCOUNTNUMBER, GLSUBACCOUNTNUMBER, 
                      DATAOWNER, TYPE, FIXEDCOST, 
                      GLOBALSYNCID, APPID, TICK, 
                      COMMODITYGROUPID, ACTIVEFLAG, 
                      SELLINGALLOWEDFLAG, UNITOFMEASUREID, 
                      SELLINGUOMID, SELLINGUOMNUMBER, 
                      CLASSIFICATION, COMMODITYTYPE, MASITEMKEY, 
                      UPC, MASITEMID, WAREHOUSEID, 
                      CompanyID, QtyOnHand, QtyAvailable, 
                      SurplusQty, QtyOnHold, MaxStockLevel, 
                      MASPRODPRICEGROUPKEY, sysdba.PRODUCT.PRODUCTID
FROM         
                      sysdba.PRODUCT ) tmp)

