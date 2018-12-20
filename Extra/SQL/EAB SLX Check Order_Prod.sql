
--use SalesLogix_TEST
use SalesLogix_Production

Declare @key varchar(30);
Declare @Prekey varchar(30);
Declare @Sufkey varchar(30);
Declare @SalesorderID varchar(30); --'Q1GLJA200HKT'
Declare @MasKey varchar(50);

--Set @key = '001-00-6964567' --Bad discount
--Set @key = '270-04-000368' --missing line item
--Set @key = '252-05-020398' --difference from slx to mas
--Set @key = '001-00-6965443' --failed to import
--Set @key = '211-04-371858' --default address problem
--Set @key = '229-06-109704' --missing line items
--Set @key = '267-02-018198' --bad warehouse on return
--Set @key = '223-03-434850' --incomplete order sent
--Set @key = '268-03-010404' --type mismatch
--Set @key = '268-02-001811' --order total error
--Set @key = '268-03-006973' --no mas number in slx
--Set @key = '271-03-049958'--'271-03-050493'--'271-03-052756' --'257-01-350496' --not processing - incomplete
--Set @key = '271-03-054499' --check for chris
--Set @key = '001-00-6977366' --submit error
--Set @key = '270-04-016583' --dist submission
--Set @key = '270-04-025165' --missing order
--set @key = '269-01-009612' --jerry
--set @key = '246-04-108221' --strange error
--set @key = '270-04-025645' --missing lines - found
--Set @key = '249-01-000875'  --error from Marc
--Set @key = '268-03-027519' -- did it get stuck?
--Set @key = '001-00-7002601' --missing PO
--Set @key = '254-01-112073' --craig's order
--Set @key = '277-01-000131' --craigs new order
--Set @key = '257-01-360665' --return to PP
--Set @key = '245-01-013779' --duplicated order
--Set @key = '245-01-013006' --triplicated order
--set @key = '268-03-063620' --error
--set @key = '249-07-201342' --not processing
--Set @key = '249-07-199978' --?
--Set @key = '256-02-174221' --incomplete in mas
--set @key = '223-03-523040' --did it work - yes second time
----set @key = '277-01-004215' --missing line items
--set @key = '268-03-067345'
----set @key = '223-03-523117'
----set @key = '237-01-212349'
----set @key = '252-05-059976'
----set @key = '269-01-007106'
----set @key = '249-07-204584'
--Set @key = '001-00-7172093' --all good
--Set @key = '001-00-7201185' --possible duplicate
--set @key = '001-00-7132824'
--Set @key = '256-02-179568'
--Set @key = '223-03-552955' --'223-03-552340' --bad sp 
--Set @key = '001-00-7954028' --missing order
--Set @key = '271-03-132232' --dropped item
--Set @key = '271-03-132019' --dropped item
--Set @key = '285-05-007649' --missing table error
--set @key = '268-03-169167' --invalid product
--Set @key = '278-02-001619' --not showing up in mas
--Set @key = '278-02-004719' -- not in mas no line items
----Set @key = '278-02-005646' --not in mas
--Set @key = '279-02-001462' --not imported to mas
--Set @key = '279-03-008330' --items on order went missing
--Set @key = '289-01-044397' --error
--Set @key = '221-03-030586' -- admin hold
--Set @key = '289-01-043048' --multiple step error
--Set @key = '268-03-231636' --sync issue
--Set @key = '211-05-027379' --order dup

--Set @key = '211-05-027379' --missing orders -double order X000047726, X000047730
--Set @key = '287-02-086310' --double lines X000047568
--Set @key = '287-02-087749' --double lines X000047569
--Set @key = '287-02-087345' --double lines X000047572
--Set @key = '287-02-089025' -- double lines X000047575
--set @key = '287-02-089034'

--Set @key = '221-03-036497' --missing order lines
----Set @key = '252-05-164995'
--Set @key = '001-00-9537012' --po not in mas?? yes it is
--Set @key = '001-00-9537224' --po not in mas?? good
--Set @key = '001-00-9537092' --po not in mas?? this one good
--Set @key = '001-00-9537292' --po not in mas?? good
--Set @key = '001-00-9585058'  --po recieving
--Set @key = '249-13-082915'  --sync issue

Set @key = '266-03-053618'
Set @key = '230-02-168636'


--Set @key = ''

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
FREIGHTAMT, HOLD, ISSUEDATE, ORIGINATIONDATE, REQUIREPOISSUE, STATUS, STAXAMT, TRANCMNT, TRANDATE, TRANNO, USERFLD1, USERFLD2, USERFLD3, USERFLD4, VENDCLASSID, 
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