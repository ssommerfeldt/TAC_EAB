
UPDATE    sysdba.PRODUCT
SET              MASITEMID = sysdba.PRODUCTREFERENCE.PRODUCTREFDISPLAYNAME, MASITEMKEY = MAStimItem.ItemKey
FROM         sysdba.PRODUCT INNER JOIN
                      sysdba.PRODUCTREFERENCE ON sysdba.PRODUCT.PRODUCTID = sysdba.PRODUCTREFERENCE.PRODUCTID INNER JOIN
                      LiveEAB_app.dbo.timItem AS MAStimItem ON sysdba.PRODUCTREFERENCE.PRODUCTREFDISPLAYNAME = MAStimItem.ItemID


UPDATE    sysdba.PRODUCT
SET              UPC = MAStimItemUnitOfMeasure.UPC
FROM         sysdba.PRODUCT INNER JOIN
                      LiveEAB_app.dbo.timItemUnitOfMeas AS MAStimItemUnitOfMeasure ON sysdba.PRODUCT.MASITEMKEY = MAStimItemUnitOfMeasure.ItemKey
