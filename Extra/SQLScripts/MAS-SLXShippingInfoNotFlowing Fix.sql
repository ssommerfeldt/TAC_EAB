Delete 
from MAS_to_SLX_SalesOrderLINE_TAC_temp
where MAS_to_SLX_SalesOrderLINE_TAC_temp.UserFld1 + '-' + CAST(MAS_to_SLX_SalesOrderLINE_TAC_temp.ItemKey AS varchar(32)) in
(
SELECT     MYID
FROM         (SELECT     MAS_to_SLX_SalesOrderLINE_TAC_temp_1.UserFld1 + '-' + CAST(MAS_to_SLX_SalesOrderLINE_TAC_temp_1.ItemKey AS varchar(32)) AS MYID, 
                                              MAS_to_SLX_SalesOrderLINE_TAC_temp_1.ItemKey, MAS_to_SLX_SalesOrderLINE_TAC_temp_1.ShipDate, 
                                              MAS_to_SLX_SalesOrderLINE_TAC_temp_1.QtyShipped, MAS_to_SLX_SalesOrderLINE_TAC_temp_1.SchdShipDate, 
                                              MAS_to_SLX_SalesOrderLINE_TAC_temp_1.TranID, MAS_to_SLX_SalesOrderLINE_TAC_temp_1.UserFld1, sysdba.SALESORDERITEMS.MASQTYSHIPPED, 
                                              sysdba.SALESORDERITEMS.MASSHIPPEDDATE
                       FROM          sysdba.SALESORDERITEMS INNER JOIN
                                                  (SELECT     SALESORDERID, ALTERNATEKEYPREFIX + '-' + ALTERNATEKEYSUFFIX AS SalesOrderNumber
                                                    FROM          sysdba.SALESORDER) AS tmpSO ON sysdba.SALESORDERITEMS.SALESORDERID = tmpSO.SALESORDERID INNER JOIN
                                              MAS_to_SLX_SalesOrderLINE_TAC_temp AS MAS_to_SLX_SalesOrderLINE_TAC_temp_1 ON 
                                              tmpSO.SalesOrderNumber = MAS_to_SLX_SalesOrderLINE_TAC_temp_1.UserFld1 INNER JOIN
                                              sysdba.PRODUCT ON sysdba.SALESORDERITEMS.PRODUCTID = sysdba.PRODUCT.PRODUCTID AND 
                                              CAST(MAS_to_SLX_SalesOrderLINE_TAC_temp_1.ItemKey AS varchar(32)) = sysdba.PRODUCT.MASITEMKEY
                       WHERE      (sysdba.SALESORDERITEMS.MASQTYSHIPPED IS NULL)) AS tmp)
                       
                       
                       
SELECT     sysdba.SALESORDER.ORDERTYPE, sysdba.SALESORDER.ALTERNATEKEYPREFIX, sysdba.SALESORDER.ALTERNATEKEYSUFFIX, sysdba.SALESORDER.STATUS, 
                      sysdba.SALESORDERITEMS.MASQTYSHIPPED, sysdba.SALESORDERITEMS.QUANTITY, tmpSO.SalesOrderNumber, sysdba.PRODUCT.MASITEMKEY, 
                      sysdba.SALESORDERITEMS.SALESORDERITEMSID, sysdba.PRODUCT.ACTUALID, sysdba.PRODUCT.NAME
FROM         sysdba.SALESORDERITEMS INNER JOIN
                      sysdba.SALESORDER ON sysdba.SALESORDERITEMS.SALESORDERID = sysdba.SALESORDER.SALESORDERID INNER JOIN
                      sysdba.PRODUCT ON sysdba.SALESORDERITEMS.PRODUCTID = sysdba.PRODUCT.PRODUCTID INNER JOIN
                      sysdba.SITE ON sysdba.SALESORDER.USERWHSEID = sysdba.SITE.SITEID AND sysdba.PRODUCT.WAREHOUSEID = sysdba.SITE.SITECODE INNER JOIN
                          (SELECT     SALESORDERID, ALTERNATEKEYPREFIX + '-' + ALTERNATEKEYSUFFIX AS SalesOrderNumber
                            FROM          sysdba.SALESORDER AS SALESORDER_1) AS tmpSO ON sysdba.SALESORDERITEMS.SALESORDERID = tmpSO.SALESORDERID
WHERE     (ISNULL(sysdba.SALESORDERITEMS.MASQTYSHIPPED, 0) <> sysdba.SALESORDERITEMS.QUANTITY) AND (sysdba.SALESORDER.ORDERTYPE = 'Sales Order') AND
                       (sysdba.SALESORDER.STATUS = 'Transmitted to Accounting') AND (sysdba.SALESORDERITEMS.SALESORDERID = 'QWSWXA2005LT')