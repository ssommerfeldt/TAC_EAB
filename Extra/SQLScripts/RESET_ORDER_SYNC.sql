DELETE FROM MAS_to_SLX_SalesOrderHEADER_TAC_temp
WHERE     (UserFld1 IN
                          (SELECT DISTINCT A1.ALTERNATEKEYPREFIX + '-' + A1.ALTERNATEKEYSUFFIX AS SONumber
                            FROM          sysdba.SALESORDER AS A1 INNER JOIN
                                                   sysdba.ACCOUNT AS A3 ON A1.ACCOUNTID = A3.ACCOUNTID LEFT OUTER JOIN
                                                   sysdba.SALESORDERADDRESS AS A2 ON A1.SALESORDERID = A2.SALESORDERID
                            WHERE      (NOT (A1.STATUS = 'TEMP DO NOT CHANGE')) AND (A1.MASNUMBER IS NULL OR
                                                   A1.MASNUMBER = '') AND (UPPER(A1.STATUS) LIKE '%TRANSMITTED%') AND (A1.MASSTATUS IS NULL OR
                                                   A1.MASSTATUS = '') AND (UPPER(A3.MASSALESPERSONID) <> 'EPM') AND (UPPER(A3.MASSALESPERSONID) <> 'MBD')))

DELETE FROM MAS_to_SLX_SalesOrderLINE_TAC_temp
WHERE     (UserFld1 IN
                          (SELECT DISTINCT A1.ALTERNATEKEYPREFIX + '-' + A1.ALTERNATEKEYSUFFIX AS SONumber
                            FROM          sysdba.SALESORDER AS A1 INNER JOIN
                                                   sysdba.ACCOUNT AS A3 ON A1.ACCOUNTID = A3.ACCOUNTID LEFT OUTER JOIN
                                                   sysdba.SALESORDERADDRESS AS A2 ON A1.SALESORDERID = A2.SALESORDERID
                            WHERE      (NOT (A1.STATUS = 'TEMP DO NOT CHANGE')) AND (A1.MASNUMBER IS NULL OR
                                                   A1.MASNUMBER = '') AND (UPPER(A1.STATUS) LIKE '%TRANSMITTED%') AND (A1.MASSTATUS IS NULL OR
                                                   A1.MASSTATUS = '') AND (UPPER(A3.MASSALESPERSONID) <> 'EPM') AND (UPPER(A3.MASSALESPERSONID) <> 'MBD')))