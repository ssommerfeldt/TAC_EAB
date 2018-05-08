Update sysdba.SALESORDERITEMS 
SET 
                      TOTALQTYSHIPPED = MAS_to_SLX_SalesOrderLINE_TAC_temp.TotalQTYShipped
FROM         MAS_to_SLX_SalesOrderLINE_TAC_temp INNER JOIN
                          (SELECT     ALTERNATEKEYPREFIX + '-' + ALTERNATEKEYSUFFIX AS Expr1, SALESORDERID
                            FROM          sysdba.SALESORDER) AS tmpSalesOrder ON MAS_to_SLX_SalesOrderLINE_TAC_temp.UserFld1 = tmpSalesOrder.Expr1 INNER JOIN
                      sysdba.SALESORDERITEMS ON tmpSalesOrder.SALESORDERID = sysdba.SALESORDERITEMS.SALESORDERID INNER JOIN
                      sysdba.PRODUCT ON MAS_to_SLX_SalesOrderLINE_TAC_temp.ItemKey = sysdba.PRODUCT.MASITEMKEY AND 
                      sysdba.SALESORDERITEMS.PRODUCTID = sysdba.PRODUCT.PRODUCTID
                      where UserFld3 is not null
                      
                      Select *
                      FROM         MAS_to_SLX_SalesOrderLINE_TAC_temp INNER JOIN
                          (SELECT     ALTERNATEKEYPREFIX + '-' + ALTERNATEKEYSUFFIX AS Expr1, SALESORDERID
                            FROM          sysdba.SALESORDER) AS tmpSalesOrder ON MAS_to_SLX_SalesOrderLINE_TAC_temp.UserFld1 = tmpSalesOrder.Expr1 INNER JOIN
                      sysdba.SALESORDERITEMS ON tmpSalesOrder.SALESORDERID = sysdba.SALESORDERITEMS.SALESORDERID INNER JOIN
                      sysdba.PRODUCT ON MAS_to_SLX_SalesOrderLINE_TAC_temp.ItemKey = sysdba.PRODUCT.MASITEMKEY AND 
                      sysdba.SALESORDERITEMS.PRODUCTID = sysdba.PRODUCT.PRODUCTID
                      where UserFld3 is not null

--=======================================================================
-- Update the Pickling List Item
--=======================================================================
Update sysdba.PICKINGLISTITEM 
set                      TotalQTYShipped=   MAS_to_SLX_SalesOrderLINE_TAC_temp.TotalQTYShipped
FROM         MAS_to_SLX_SalesOrderLINE_TAC_temp INNER JOIN
                      sysdba.PICKINGLISTITEM ON MAS_to_SLX_SalesOrderLINE_TAC_temp.UserFld4 = sysdba.PICKINGLISTITEM.PICKINGLISTID INNER JOIN
                      sysdba.PRODUCT ON sysdba.PICKINGLISTITEM.PRODUCTID = sysdba.PRODUCT.PRODUCTID AND 
                      MAS_to_SLX_SalesOrderLINE_TAC_temp.ItemKey = sysdba.PRODUCT.MASITEMKEY  
                      
                      
                        
SELECT     sysdba.SALESORDERITEMS.SALESORDERID, sysdba.PICKINGLISTITEM.TOTALQTYSHIPPED, sysdba.SALESORDERITEMS.TOTALQTYSHIPPED AS Expr1
FROM         sysdba.SALESORDERITEMS INNER JOIN
                      sysdba.PICKINGLIST ON sysdba.SALESORDERITEMS.SALESORDERID = sysdba.PICKINGLIST.SALESORDERID INNER JOIN
                      sysdba.PICKINGLISTITEM ON sysdba.PICKINGLIST.PICKINGLISTID = sysdba.PICKINGLISTITEM.PICKINGLISTID AND 
                      sysdba.SALESORDERITEMS.LINENUMBER = sysdba.PICKINGLISTITEM.SOLINENO
--===========================================================
-- Update the Top Level SalesOrder
--===============================================================
Update sysdba.SALESORDERITEMS 
SET     sysdba.SALESORDERITEMS.TOTALQTYSHIPPED= tmp.Expr1
FROM         sysdba.SALESORDERITEMS INNER JOIN
                          (SELECT     SUM(TOTALQTYSHIPPED) AS Expr1, SALESORDERITEMID
                            FROM          sysdba.PICKINGLISTITEM
                            WHERE      (TOTALQTYSHIPPED IS NOT NULL)
                            GROUP BY SALESORDERITEMID) AS tmp ON sysdba.SALESORDERITEMS.SALESORDERITEMSID = tmp.SALESORDERITEMID
                                        
                        