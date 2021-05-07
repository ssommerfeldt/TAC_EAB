SELECT     STGSALESORDER_TACID, CREATEUSER, CREATEDATE, MODIFYUSER, MODIFYDATE, TRANNO, TRANDATE, TRADEDISCAMT, STAXAMT, STATUS, SESSIONKEY, 
                      ROWKEY, REQUIRESOACK, RECURSOTRANNO, PROCESSSTATUS, OPENAMT, HOLD, FREIGHTAMT, DFLTSHIPTOCUSTADDRID, CUSTID, CUSTCLASSID, CURRID, 
                      CURREXCHRATE, CONTACTNAME, BILLTOCUSTADDRID, DFLTSHIPPRIORITY, PMTTERMSID, COMPANYID, UserFld1, CustPONO, DFLTSHIPMETHID, TRANCMNT, PrimarySperID, SalesOrderID
FROM         sysdba.STGSALESORDER_TAC
WHERE     (TRANNO = '0')


select STGSALESORDER_TACID, SUM(ExtAmt) As LineOrderTotal from sysdba.STGSOLINE_TAC
Group By STGSALESORDER_TACID, TRANNO
having tranno = '0'


Select * from sysdba.STGSOLINE_TAC
--where TRANNO = '0'
where STGSALESORDER_TACID = 'QHY17A100FWS'

Select * from sysdba.STGSALESORDER_TAC where SALESORDERID = 'QHY17A100FGA'
Select * from sysdba.SALESORDER --where SALESORDERID = 'QHY17A100FGA'
where CUSTOMERPURCHASEORDERNUMBER = '9987528'

Update sysdba.SALESORDER set ALTERNATEKEYSUFFIX = '020026'
where CUSTOMERPURCHASEORDERNUMBER = '9987528'


Select * from sysdba.SALESORDER where CUSTOMERPURCHASEORDERNUMBER = 'test01'
Select * from sysdba.ACCOUNTFINANCIAL where CUSTOMERID = 'RN5811'
Select * from sysdba.ACCOUNT where ACCOUNTID = 'AEAB3A00060M'
Select * from sysdba.SALESORDER where ACCOUNTID = 'AEAB3A00060M'


Select * from sysdba.PRODUCT where 
actualid in (
'1010282'
, '2500007'
, '1019662'
, '3110082'
, '3110112'
, '3110202'
, '3056002'
, '1054382'
, '1054402'
, '1054622'
, '1054722'
, '1054862'
, '1054922'
, '1054932'
, '1070222'
, '1070232'
, '98007'
, '98019'
, '98265'
) and WAREHOUSEID = 'ONT'
order by Cast (ACTUALID As Int) desc
