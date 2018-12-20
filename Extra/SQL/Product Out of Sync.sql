update
dbo.MAS_TO_SLX_PRODUCT_Temp
set DESCRIPTION = 'TODELETE' 
FROM         dbo.MAS_TO_SLX_PRODUCT_Temp 
INNER JOIN
                      VProductsToReSync ON MAS_TO_SLX_PRODUCT_Temp.ACTUALID = VProductsToReSync.ACTUALID AND 
                      MAS_TO_SLX_PRODUCT_Temp.WAREHOUSEID = VProductsToReSync.WAREHOUSEID AND 
                      MAS_TO_SLX_PRODUCT_Temp.CompanyID = VProductsToReSync.CompanyID AND 
                      MAS_TO_SLX_PRODUCT_Temp.MASITEMKEY = VProductsToReSync.MASITEMKEY
                      
dELETE FROM DBO.MAS_TO_SLX_PRODUCT_Temp where DESCRIPTION = 'TODELETE'                    