Update sysdba.Product
SET     sysdba.PRODUCT.UPC= LiveEAB_app.dbo.timItemUnitOfMeas.UPC 
FROM         sysdba.PRODUCT INNER JOIN
                      LiveEAB_app.dbo.timItemUnitOfMeas ON sysdba.PRODUCT.MASITEMKEY = LiveEAB_app.dbo.timItemUnitOfMeas.ItemKey

