
use SalesLogix_TEST
--use SalesLogix_Production

Declare @key varchar(30);
Declare @Prekey varchar(30);
Declare @Sufkey varchar(30);
Declare @SalesorderID varchar(30); --'Q1GLJA200HKT'
Declare @MasKey varchar(50);

Set @key = '001-00-7954028' --missing order
Set @key = '001-00-5683130' --missing test record
Set @key = '001-00-5683558' --missing 2
Set @key = '001-00-5685607'
Set @key = '001-00-9055919'

--Set the id from order number
Set @SalesorderID = (Select SALESORDERID from sysdba.SALESORDER 
	Where ALTERNATEKEYPREFIX + '-' + ALTERNATEKEYSUFFIX = @key)
--Set @SalesorderID = 'QIRAYA200XLM' 

--get the MAS id if available	
Set @MasKey = (Select MASNUMBER from sysdba.SALESORDER where SALESORDERID = @SalesorderID)

-- SLX Sales Order
Select SALESORDERID, * 
from sysdba.SALESORDER 
where SALESORDERID = @SalesorderID

Select LINENUMBER as line, ACTUALID, QUANTITY, CALCULATEDPRICE, EXTENDEDPRICE, DISCOUNT, * 
from sysdba.SALESORDERITEMS 
where SALESORDERID = @SalesorderID 
and QUANTITY <> '0'
--And (ACTUALID = '98007' Or ACTUALID = '75015' or ACTUALID = '95010')
order by LINE

--Select LINENUMBER as line, ACTUALID, QUANTITY, CALCULATEDPRICE, EXTENDEDPRICE, DISCOUNT, * 
--from sysdba.SALESORDERITEMS_History  
--where SALESORDERID = @SalesorderID 
--and QUANTITY <> '0'

Select Count (*) as 'Number of Items', SUM(extendedPrice) as 'Sales Order Sum of ExtPrice' 
from sysdba.SALESORDERITEMS 
where SALESORDERID = @SalesorderID 
and QUANTITY <> '0'


--Staging tables

SELECT TranNo, ProcessStatus, * FROM sysdba.StgSalesOrder_TAC where SALESORDERID = @SalesorderID 
--where CreateDATE >= GETDATE() - 1
--update sysdba.StgSalesOrder_TAC Set TRANNO = '-1' where SALESORDERID = 'Q1GLJA200GRH'
--update sysdba.StgSOLine_TAC Set TRANNO = '-1' where SALESORDERID = 'Q1GLJA200GRH'

SELECT Tranno, solineno as line, ItemID, QTYORD, UNITPRICE, EXTAMT, * 
FROM sysdba.StgSOLine_TAC where SALESORDERID = @SalesorderID 
order by solineno --STGSOLINE_TACID

Select STGSALESORDER_TACID, Count (*) as 'Number of Items', SUM(ExtAmt) as 'Staging Records Sum of extamt'
FROM sysdba.StgSOLine_TAC where SALESORDERID = @SalesorderID
Group By STGSALESORDER_TACID


--Transfer order
SELECT TranNo, ProcessStatus, * FROM sysdba.STGTRNSFRORDER_TAC where SALESORDERID = @SalesorderID 
--where CreateDATE >= GETDATE() - 1
--update sysdba.StgSalesOrder_TAC Set TRANNO = '-1' where SALESORDERID = 'Q1GLJA200GRH'
--update sysdba.StgSOLine_TAC Set TRANNO = '-1' where SALESORDERID = 'Q1GLJA200GRH'

SELECT ItemID, QTYORD, * 
FROM sysdba.STGTRNSFRORDERLINE_TAC where SALESORDERID = @SalesorderID 

--Purchase Order
SELECT TranNo, STGPURCHASEORDER_TACID, CREATEUSER, CREATEDATE, MODIFYUSER, MODIFYDATE, CLOSEDFORINVC, CLOSEDFORRCVG, CURREXCHRATE, CURRID, 
FREIGHTAMT, HOLD, ISSUEDATE, ORIGINATIONDATE, REQUIREPOISSUE, STATUS, STAXAMT, TRANCMNT, TRANDATE, TRANNO, USERFLD1, USERFLD2, USERFLD3, VENDCLASSID, 
VENDORID, COMPANYID, 0 as TranKey, 
0 as SessionKey, GetDate() as Submit_Date, SALESORDERID 
FROM         sysdba.STGPURCHASEORDER_TAC
--WHERE     (TRANNO = '0')
where SALESORDERID = @SalesorderID 

--Select * from sysdba.STGPOLINE_TAC
SELECT sysdba.STGPOLINE_TAC.STGPOLINE_TACID, sysdba.STGPOLINE_TAC.STGPURCHASEORDER_TACID, sysdba.STGPOLINE_TAC.CREATEUSER, 
                      sysdba.STGPOLINE_TAC.CREATEDATE, sysdba.STGPOLINE_TAC.MODIFYUSER, sysdba.STGPOLINE_TAC.MODIFYDATE, sysdba.STGPOLINE_TAC.AMTINVCD, 
                      sysdba.STGPOLINE_TAC.CLOSEDFORINVC, sysdba.STGPOLINE_TAC.CLOSEDFORRCVG, sysdba.STGPOLINE_TAC.CMNTONLY, 
                      sysdba.STGPOLINE_TAC.DESCRIPTION, sysdba.STGPOLINE_TAC.DROPSHIP, sysdba.STGPOLINE_TAC.EXCLLASTCOST, sysdba.STGPOLINE_TAC.EXPEDITE, 
                      sysdba.STGPOLINE_TAC.EXTAMT, sysdba.STGPOLINE_TAC.EXTCMNT, sysdba.STGPOLINE_TAC.FREIGHTAMT, sysdba.STGPOLINE_TAC.GLACCTNO, 
                      sysdba.STGPOLINE_TAC.ITEMID, sysdba.STGPOLINE_TAC.ORIGORDERED, sysdba.STGPOLINE_TAC.ORIGPROMISEDATE, sysdba.STGPOLINE_TAC.POLINENO, 
                      sysdba.STGPOLINE_TAC.PROMISEDATE, sysdba.STGPOLINE_TAC.QTYINVCD, sysdba.STGPOLINE_TAC.QTYONBO, sysdba.STGPOLINE_TAC.QTYOPENTORCV, 
                      sysdba.STGPOLINE_TAC.QTYORD, sysdba.STGPOLINE_TAC.QTYRCVD, sysdba.STGPOLINE_TAC.QTYRTRNCREDIT, sysdba.STGPOLINE_TAC.REQUESTDATE, 
                      sysdba.STGPOLINE_TAC.STATUS, sysdba.STGPOLINE_TAC.TARGETCOMPANYID, sysdba.STGPOLINE_TAC.TRANNO, sysdba.STGPOLINE_TAC.UNITCOST, 
                      sysdba.STGPOLINE_TAC.UNITMEASID, sysdba.STGPOLINE_TAC.USERFLD1, sysdba.STGPOLINE_TAC.QTYRTRNREPLACEMENT, 
                      sysdba.STGPURCHASEORDER_TAC.TRANNO AS ParentTranNo, 0 AS ProcessStatus, 0 AS SessionKey, GETDATE() AS Submit_Date, 
                      sysdba.STGPOLINE_TAC.SHIPTOWHSEID, sysdba.STGPOLINE_TAC.STAXCLASSID
FROM         sysdba.STGPOLINE_TAC INNER JOIN
                      sysdba.STGPURCHASEORDER_TAC ON 
                      sysdba.STGPOLINE_TAC.STGPURCHASEORDER_TACID = sysdba.STGPURCHASEORDER_TAC.STGPURCHASEORDER_TACID
--WHERE     (sysdba.STGPOLINE_TAC.TRANNO = '0')
where sysdba.STGPOLINE_TAC.SALESORDERID = @SalesorderID 


-- transaction log - use mas queries for this
 Select * from Apollo.MAS500_tst_app.dbo.tdmMigrationLogWrk_TAC
 Where EntityID like '%' + @SalesorderID + '%'
 --Where EntityID Like '%' + @MasKey + '%'
 order by DateCreated  desc

--Update sysdba.StgSalesOrder_TAC Set TRANNO = 0 Where SALESORDERID = 'QWSWXA101BI4'
--Update sysdba.StgSOLine_TAC set TRANNO = 0 Where SALESORDERID = 'QWSWXA101BI4'