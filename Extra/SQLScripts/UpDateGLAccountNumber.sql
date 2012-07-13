Create view dbo.vwSLXProductItemMap_TAC
as
SELECT     tmpMASItemKey.ItemKey, LiveEAB_slx.sysdba.PRODUCT.PRODUCTID as crmproductid
FROM         (SELECT     CompanyID + ';' + ItemID AS MyID, ItemKey
                       FROM          timItem) AS tmpMASItemKey INNER JOIN
                      LiveEAB_slx.sysdba.PRODUCTREFERENCE ON tmpMASItemKey.MyID = LiveEAB_slx.sysdba.PRODUCTREFERENCE.PRODUCTREFKEY INNER JOIN
                      LiveEAB_slx.sysdba.PRODUCT ON LiveEAB_slx.sysdba.PRODUCTREFERENCE.PRODUCTID = LiveEAB_slx.sysdba.PRODUCT.PRODUCTID
                            
                            
                            
Update  sysdba.product                          
SET    MASITEMKEY= LiveEAB_app.dbo.vwSLXProductItemMap_TAC.ItemKey,
GLACCOUNTNUMBER = LiveEAB_app.dbo.vwSLXProductItemMap_TAC.GLAccountNum,
 GLSUBACCOUNTNUMBER= LiveEAB_app.dbo.vwSLXProductItemMap_TAC.MisGLAccountNo,
 UNITOFMEASUREID=  LiveEAB_app.dbo.vwSLXProductItemMap_TAC.UOMKey
FROM         sysdba.PRODUCT INNER JOIN
                      LiveEAB_app.dbo.vwSLXProductItemMap_TAC ON sysdba.PRODUCT.PRODUCTID = LiveEAB_app.dbo.vwSLXProductItemMap_TAC.crmproductid                          
                            
                            
                        
                                                        