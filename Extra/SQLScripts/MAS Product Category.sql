--=========================================================================
-- shows Relationship between Product and Price group
--==========================================================================
SELECT     sysdba.PRODUCT.PRODUCTID, sysdba.PRODUCT.ACTUALID, sysdba.PRODUCT.Name as DESCRIPTION, sysdba.PRODUCT.COMPANYID, 
                       sysdba.TIMPRODPRICEGROUP.TIMPRODPRICEGROUPID, sysdba.TIMPRODPRICEGROUP.Description AS PriceGroupDescription, sysdba.PRODUCT.MASITEMKEY 
 FROM         sysdba.PRODUCT INNER JOIN
                       sysdba.TIMPRODPRICEGROUP ON sysdba.PRODUCT.MASPRODPRICEGROUPKEY = sysdba.TIMPRODPRICEGROUP.ProdPriceGroupKey 
                       
                       --==================================
                       -- MAS  ItemClass = Product.Family 
                       --===================================

