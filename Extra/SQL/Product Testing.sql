SELECT     PRODUCTID
FROM         sysdba.PRODUCT AS A1
WHERE     (PRODUCTID IN
                          (SELECT     PRODUCTID
                            FROM          sysdba.PRODUCT
                            WHERE      (COMPANYID = 'EAB') AND (WAREHOUSEID = 'ONT') AND (PRODUCTID NOT IN
                                                       (SELECT     PRODUCTID
                                                         FROM          sysdba.STOCKCARDITEMS
                                                         WHERE      (ACCOUNTID = 'AEAB3A00071J'))))) AND (1 = 1) AND (ACTUALID LIKE '3110264')
ORDER BY ACTUALID

Select distinct WAREHOUSEID  from sysdba.PRODUCT where ACTUALID ='3110264'

