-- old view, do not use
Create view dbo.vwSLXProductItemMap_TAC
as
SELECT     tmpMASItemKey.ItemKey, tmpMASItemKey.ItemID, LiveEAB_slx.sysdba.PRODUCT.PRODUCTID as crmproductid
FROM         (SELECT     CompanyID + ';' + ItemID AS MyID, ItemKey, ItemID
                       FROM          timItem) AS tmpMASItemKey INNER JOIN
                      LiveEAB_slx.sysdba.PRODUCTREFERENCE ON tmpMASItemKey.MyID = LiveEAB_slx.sysdba.PRODUCTREFERENCE.PRODUCTREFKEY INNER JOIN
                      LiveEAB_slx.sysdba.PRODUCT ON LiveEAB_slx.sysdba.PRODUCTREFERENCE.PRODUCTID = LiveEAB_slx.sysdba.PRODUCT.PRODUCTID
                            
                            
--old update, do not use                        
Update  sysdba.product                          
SET    MASITEMKEY= LiveEAB_app.dbo.vwSLXProductItemMap_TAC.ItemKey,
GLACCOUNTNUMBER = LiveEAB_app.dbo.vwSLXProductItemMap_TAC.GLAccountNum,
 GLSUBACCOUNTNUMBER= LiveEAB_app.dbo.vwSLXProductItemMap_TAC.MisGLAccountNo,
 UNITOFMEASUREID=  LiveEAB_app.dbo.vwSLXProductItemMap_TAC.UOMKey
FROM         sysdba.PRODUCT INNER JOIN
                      LiveEAB_app.dbo.vwSLXProductItemMap_TAC ON sysdba.PRODUCT.PRODUCTID = LiveEAB_app.dbo.vwSLXProductItemMap_TAC.crmproductid                          
                           
                            
                        
--Updated view
Create view dbo.vwSLXProductItemMap_TAC
as
SELECT     tmpMASItemKey.ItemKey, tmpMASItemKey.ItemID, LiveEAB_slx.sysdba.PRODUCT.PRODUCTID AS crmproductid, dbo.timInventory.InvtAcctKey AS GLAccountNum, 
                      dbo.tglAccount.GLAcctNo, dbo.timInventory.MiscAdjAcctKey AS MisGLAccountNo, dbo.tglAccount.GLAcctNo AS MisGLAcctNo, 
                      timItem_UOM.StockUnitMeasKey AS UOMKey, dbo.tciUnitMeasure.UnitMeasID
FROM         (SELECT     CompanyID + ';' + ItemID AS MyID, ItemKey, ItemID
                       FROM          dbo.timItem) AS tmpMASItemKey INNER JOIN
                      LiveEAB_slx.sysdba.PRODUCTREFERENCE ON tmpMASItemKey.MyID = LiveEAB_slx.sysdba.PRODUCTREFERENCE.PRODUCTREFKEY INNER JOIN
                      LiveEAB_slx.sysdba.PRODUCT ON LiveEAB_slx.sysdba.PRODUCTREFERENCE.PRODUCTID = LiveEAB_slx.sysdba.PRODUCT.PRODUCTID LEFT OUTER JOIN
                      dbo.tciUnitMeasure INNER JOIN
                      dbo.timItem AS timItem_UOM ON dbo.tciUnitMeasure.UnitMeasKey = timItem_UOM.StockUnitMeasKey ON 
                      tmpMASItemKey.ItemKey = timItem_UOM.ItemKey LEFT OUTER JOIN
                      dbo.tglAccount INNER JOIN
                      dbo.timInventory ON dbo.tglAccount.GLAcctKey = dbo.timInventory.InvtAcctKey AND dbo.tglAccount.GLAcctKey = dbo.timInventory.MiscAdjAcctKey ON 
                      tmpMASItemKey.ItemKey = dbo.timInventory.ItemKey
                      
               
--updated update
Update  sysdba.product                          
SET    MASITEMID= LiveEAB_app.dbo.vwSLXProductItemMap_TAC.ItemID,
GLACCOUNTNUMBER = LiveEAB_app.dbo.vwSLXProductItemMap_TAC.GLAcctNo,
 GLSUBACCOUNTNUMBER= LiveEAB_app.dbo.vwSLXProductItemMap_TAC.MisGLAcctNo,
 UNITOFMEASUREID=  LiveEAB_app.dbo.vwSLXProductItemMap_TAC.UOMKey,
 Unit =  LiveEAB_app.dbo.vwSLXProductItemMap_TAC.unitMeasID
FROM         sysdba.PRODUCT INNER JOIN
                      LiveEAB_app.dbo.vwSLXProductItemMap_TAC ON sysdba.PRODUCT.PRODUCTID = LiveEAB_app.dbo.vwSLXProductItemMap_TAC.crmproductid         