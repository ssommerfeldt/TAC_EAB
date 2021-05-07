delete from dbo.MAS_to_SLX_SalesOrderHEADER_TAC_temp
where UserFld1 in ('289-01-099114',
'229-07-006870',
'229-07-007078',
'229-07-007310',
'289-01-098888',
'229-07-007279',
'229-07-007337',
'229-07-007350',
'229-07-006859',
'229-07-007289',
'229-07-007052')

Delete from 
dbo.MAS_to_SLX_SalesOrderLINE_TAC_temp
where UserFld1 in ('289-01-099114',
'229-07-006870',
'229-07-007078',
'229-07-007310',
'289-01-098888',
'229-07-007279',
'229-07-007337',
'229-07-007350',
'229-07-006859',
'229-07-007289',
'229-07-007052')

SELECT   '''' +  sonumber + ''','
FROM         (SELECT     ALTERNATEKEYPREFIX + '-' + ALTERNATEKEYSUFFIX AS sonumber, ACCOUNTID, BILLINGID, BILLTONAME, COMMENTS, CREATEDATE, CREATEUSER, 
                                              CURRENCYCODE, CUSTOMERPURCHASEORDERNUMBER, DOCUMENTID, FOB, FREIGHT, MODIFYDATE, MODIFYUSER, OPPORTUNITYID, ORDERDATE, 
                                              ORDERTOTAL, ORDERTYPE, SALESCOMMISSION, SALESORDERID, SHIPPINGID, SHIPTONAME, SHIPVIA, STATUS, TAX, TERMSID, TRADEDISCOUNT, 
                                              TRANSMITDATE, USERID, BILLINGCONTACTID, SHIPPINGCONTACTID, USERFIELD1, USERFIELD2, USERFIELD3, USERFIELD4, USERFIELD5, 
                                              USERFIELD6, ALTERNATEKEYPREFIX, ALTERNATEKEYSUFFIX, ACCOUNTMANAGERID, DATEPROMISED, DISCOUNT, EXCHANGERATE, 
                                              EXCHANGERATEDATE, EXCHANGERATELOCKED, GRANDTOTAL, REQUESTEDBY, SECCODEID, GLOBALSYNCID, APPID, TICK, ACTIVEFLAG, PRICELISTID, 
                                              DUEDATE, OPERATINGCOMPID, ISQUOTE, DISCOUNTTOTAL, TAXTOTAL, CREATESOURCE, WAREHOUSEKEY, USERWHSEID, SOURCEWHSEID, 
                                              MASSTATUS, MASNUMBER, SUBTOTAL, TAX1, TAX2, TERMS, LINEITEMCOUNT
                       FROM          sysdba.SALESORDER) AS tmp INNER JOIN
                      MAS_to_SLX_SalesOrderHEADER_TAC_temp ON tmp.sonumber = MAS_to_SLX_SalesOrderHEADER_TAC_temp.UserFld1
                      where MASNUMBER is null