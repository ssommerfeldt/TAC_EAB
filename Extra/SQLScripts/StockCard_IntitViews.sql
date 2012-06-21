--=====================================================
-- Views to Create ... Note enable them in SLX Administrator
--======================================================
Create view [sysdba].[vlueProductGroup]
as 
Select MAX(Productid) as MyId, Family
from sysdba.PRODUCT
group by family


Create View sysdba.vluePRODUCTMSRP
AS
SELECT     sysdba.PRODUCT.PRODUCTID, sysdba.TIMPRICESHEET.LISTPRICE
FROM         sysdba.PRODUCT INNER JOIN
                      sysdba.PRODUCTREFERENCE ON sysdba.PRODUCT.PRODUCTID = sysdba.PRODUCTREFERENCE.PRODUCTID INNER JOIN
                      sysdba.TIMPRICESHEET ON sysdba.PRODUCTREFERENCE.ITEMKEY = sysdba.TIMPRICESHEET.ITEMKEY

--=====================================================
-- Import MAS data from timPriceSheet into SLX
--======================================================                      
                      
                      
--=====================================================
-- Update Item Key
--======================================================
Update sysdba.PRODUCTREFERENCE 
SET     ItemKey = tmpMASItemKey.ItemKey
FROM         sysdba.PRODUCTREFERENCE INNER JOIN
                          (SELECT     CompanyID + ';' + ItemID AS MyID, ItemKey
                            FROM          LiveEAB_MAS.dbo.timItem) AS tmpMASItemKey ON sysdba.PRODUCTREFERENCE.PRODUCTREFKEY = tmpMASItemKey.MyID