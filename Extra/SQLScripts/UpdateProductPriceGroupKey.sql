Update sysdba.Product
SET     MASPRODPRICEGROUPKEY= LiveEAB_MAS.dbo.timItem.ProdPriceGroupKey
FROM         sysdba.PRODUCT INNER JOIN
                      LiveEAB_MAS.dbo.timItem ON sysdba.PRODUCT.MASITEMKEY = LiveEAB_MAS.dbo.timItem.ItemKey
                      
                      
          Update sysdba.PRODUCT
Set sysdba.PRODUCT.QTYAVAILABLE = Changed.QtyAvailable, 
    sysdba.PRODUCT.QTYOnHand = Changed.QtyOnHand,
    sysdba.PRODUCT.SURPLUSQTY = Changed.SURPLUSQTY, 
    sysdba.PRODUCT.QTYONHOLD = Changed.QTYONHOLD, 
    sysdba.PRODUCT.MAXSTOCKLEVEL = Changed.MAXSTOCKLEVEL
From sysdba.PRODUCT
Inner Join mas500_tst_app.dbo.vdvMAS_to_SLX_Products_ChangedSource_TAC As Changed
On sysdba.PRODUCT.PRODUCTID = Changed.PRODUCTID
Where sysdba.PRODUCT.PRODUCTID = Changed.PRODUCTID
            