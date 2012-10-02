Update sysdba.Product
SET     MASPRODPRICEGROUPKEY= LiveEAB_MAS.dbo.timItem.ProdPriceGroupKey
FROM         sysdba.PRODUCT INNER JOIN
                      LiveEAB_MAS.dbo.timItem ON sysdba.PRODUCT.MASITEMKEY = LiveEAB_MAS.dbo.timItem.ItemKey