-- Duplicate Products

-- Products to Keep
SELECT     MAX(PRODUCTID) AS Expr1, WAREHOUSEID, MASITEMKEY, COMPANYID
into tmpTokeep
FROM         sysdba.PRODUCT
GROUP BY WAREHOUSEID, MASITEMKEY, COMPANYID
HAVING      (COUNT(*) >= 1)

-- Identify Products to CHange and the new
SELECT    distinct sysdba.PRODUCT.PRODUCTID, tmpTokeep.Expr1 as NewProductid
into tmpProductIdchanges
FROM         sysdba.PRODUCT INNER JOIN
                      tmpTokeep ON sysdba.PRODUCT.MASITEMKEY = tmpTokeep.MASITEMKEY AND sysdba.PRODUCT.WAREHOUSEID = tmpTokeep.WAREHOUSEID AND 
                      sysdba.PRODUCT.COMPANYID = tmpTokeep.COMPANYID
WHERE     (sysdba.PRODUCT.PRODUCTID NOT IN
                          (SELECT     Expr1
                            FROM          tmpTokeep AS tmpTokeep_1))
                            
update sysdba.SALESORDERITEMS 
SET     PRODUCTID= tmpProductIdchanges.NewProductid
FROM         sysdba.SALESORDERITEMS INNER JOIN
                      tmpProductIdchanges ON sysdba.SALESORDERITEMS.PRODUCTID = tmpProductIdchanges.PRODUCTID  

Update sysdba.STOCKCARDITEMS                       
SET     sysdba.STOCKCARDITEMS.PRODUCTID= tmpProductIdchanges.NewProductid
FROM         sysdba.STOCKCARDITEMS INNER JOIN
                      tmpProductIdchanges ON sysdba.STOCKCARDITEMS.PRODUCTID = tmpProductIdchanges.PRODUCTID   
                      
DELETE FROM sysdba.PRODUCT
WHERE     (PRODUCTID IN
                          (SELECT     PRODUCTID
                            FROM          tmpProductIdchanges))                                         

SELECT    distinct sysdba.PRODUCT.PRODUCTID

FROM         sysdba.PRODUCT INNER JOIN
                          (SELECT     MAX(PRODUCTID) AS Expr1, WAREHOUSEID, MASITEMKEY
                            FROM          sysdba.PRODUCT AS PRODUCT_1
                            GROUP BY WAREHOUSEID, MASITEMKEY
                            HAVING      (COUNT(*) > 1)) AS ProductToKeep ON sysdba.PRODUCT.PRODUCTID <> ProductToKeep.Expr1 AND 
                      sysdba.PRODUCT.WAREHOUSEID = ProductToKeep.WAREHOUSEID AND sysdba.PRODUCT.MASITEMKEY = ProductToKeep.MASITEMKEY
                      
                      Select COUNT(*) from sysdba.PRODUCT 
                      
                      CREATE STATISTICS [_dta_stat_1764201335_44_42] ON [sysdba].[PRODUCT]([WAREHOUSEID], [MASITEMKEY])
                      
                      CREATE NONCLUSTERED INDEX [_dta_index_PRODUCT_18_1764201335__K42_K44_1] ON [sysdba].[PRODUCT] 
(
	[MASITEMKEY] ASC,
	[WAREHOUSEID] ASC
)
INCLUDE ( [PRODUCTID]) WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
Create view Sysdba.vMaxProductid
as
SELECT     COUNT(*) AS Expr1, WAREHOUSEID, MASITEMKEY, COMPANYID
FROM         sysdba.PRODUCT AS PRODUCT_1
where WAREHOUSEID = 'ONT'
GROUP BY WAREHOUSEID, MASITEMKEY, COMPANYID
HAVING      (COUNT(*) > 1)
                            
Select COUNT(*) from sysdba.PRODUCT Where PRODUCTID not in  (    Select PRODUCTID from   sysdba.vMaxProductid     )

Select * from sysdba.PRODUCT where MASITEMKEY = '70166' and WAREHOUSEID = 'ONT' and COMPANYID = 'EAB'    

Select distinct MASITEMKEY , WAREHOUSEID , COMPANYID  from sysdba.PRODUCT   

SELECT     * FROM         sysdba.PRODUCT WHERE     (MASITEMKEY = '') AND (WAREHOUSEID = '') AND (COMPANYID = '')

Select * from sysdba.SALESORDERITEMS    

      

