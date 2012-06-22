--=====================================================
-- Views to Create ... Note enable them in SLX Administrator
--======================================================
--Create view [sysdba].[vlueProductGroup]
--as 
--Select MAX(Productid) as MyId, Family
--from sysdba.PRODUCT
--group by family


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
                            
                            
--================================================================================================================
--=====================================================
-- Import MAS data from timPriceSheet into SLX
--======================================================   

--=====================================================
-- Import MAS data from sysdba.TIMPRODCATITEM into SLX
--====================================================== 

-- Modify the Existing Group
CREATE VIEW [sysdba].[vlueProductGroup]
AS
SELECT     sysdba.TIMPRODCATEGORY.TIMPRODCATEGORYID AS MyID, sysdba.TIMPRODCATEGORY.COMPANYID, 
                      sysdba.TIMPRODCATEGORY.PRODCATEGORYID, ISNULL(tmpTEST.CNT, '0') AS iCount, sysdba.TIMPRODCATEGORY.PRODCATEGORYKEY
FROM         sysdba.TIMPRODCATEGORY INNER JOIN
                          (SELECT     COUNT(*) AS CNT, TIMPRODCATEGORY_1.PRODCATEGORYKEY
                            FROM          sysdba.TIMPRODCATEGORY AS TIMPRODCATEGORY_1 INNER JOIN
                                                   sysdba.TIMPRODCATITEM AS TIMPRODCATITEM_1 ON 
                                                   TIMPRODCATEGORY_1.PRODCATEGORYKEY = TIMPRODCATITEM_1.PRODCATEGORYKEY
                            GROUP BY TIMPRODCATEGORY_1.PRODCATEGORYKEY) AS tmpTEST ON 
                      sysdba.TIMPRODCATEGORY.PRODCATEGORYKEY = tmpTEST.PRODCATEGORYKEY                   