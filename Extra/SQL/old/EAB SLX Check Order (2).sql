
use SalesLogix_TEST
--use SalesLogix_Production

Declare @key varchar(30);
Declare @Prekey varchar(30);
Declare @Sufkey varchar(30);
Declare @SalesorderID varchar(30); --'Q1GLJA200HKT'
Declare @MasKey varchar(50);
--Set @Prekey = '246-02'
--Set @SufKey = '022781'
--Set @key = '246-02-023159' 
--Set @key = '246-02-007738'
--Set @key = '246-02-005012'
--Set @key = '246-02-021725'
--Set @key = '252-00-3315452'
--Set @key = '246-02-067409'
--Set @key = '249-05-186895'
--Set @key = '221-01-016373'
--Set @key = '249-05-282822'
--Set @key = '245-01-229324'
--Set @key = '222-00-4326057'
--Set @key = '245-01-299850'
--Set @key = '222-01-061564'
--Set @key = '001-00-3120418'
--Set @key = '256-02-043546' -- missing header record - restored
Set @key = '249-06-064908' --missing line items
--Set @key = '223-01-155443'
Set @key = '001-00-4201692'
Set @key = '221-01-084396'
Set @key = '211-04-112046'
Set @key = '249-06-066444' --item added
Set @key = '237-01-174929' --no data in slx
Set @key = '245-01-329948' -- didn't make it to mas
Set @key = '222-01-230984' --more lines in staging
Set @key = '222-01-028921' --blank items
Set @key = '001-00-4770692' --missing staging records - transfer
Set @key = '245-01-524356'
Set @key = '243-05-043438' -- sonny can't find
Set @key = '245-01-424210' --sonny can't find 2
Set @key = '245-01-520665' --problem in mas

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

Select SUM(extendedPrice) as 'Sales Order Sum of ExtPrice' 
from sysdba.SALESORDERITEMS 
where SALESORDERID = @SalesorderID 
--and QUANTITY <> '0'


--Staging tables

SELECT TranNo, ProcessStatus, * FROM sysdba.StgSalesOrder_TAC where SALESORDERID = @SalesorderID 
--where CreateDATE >= GETDATE() - 1
--update sysdba.StgSalesOrder_TAC Set TRANNO = '-1' where SALESORDERID = 'Q1GLJA200GRH'
--update sysdba.StgSOLine_TAC Set TRANNO = '-1' where SALESORDERID = 'Q1GLJA200GRH'

SELECT Tranno, solineno as line, ItemID, QTYORD, UNITPRICE, EXTAMT, * 
FROM sysdba.StgSOLine_TAC where SALESORDERID = @SalesorderID 
order by STGSOLINE_TACID

Select SUM(ExtAmt) as 'Staging Records Sum of extamt'
FROM sysdba.StgSOLine_TAC where SALESORDERID = @SalesorderID

--transfer orders
SELECT TranNo, ProcessStatus, * FROM sysdba.STGTRNSFRORDER_TAC where SALESORDERID = @SalesorderID 

SELECT ItemID, QTYORD, * 
FROM sysdba.STGTRNSFRORDERLINE_TAC where SALESORDERID = @SalesorderID 
order by STGTRNSFRORDERLINE_TACID 

-- transaction log - use mas queries for this
 --Select * from Apollo.MAS500_eab_app.dbo.tdmMigrationLogWrk_TAC
 ----Where EntityID like '%X000002154%' 
 --Where EntityID Like '%' + @MasKey + '%'
 --order by DateCreated  desc

--Update sysdba.StgSalesOrder_TAC Set TRANNO = 0 Where SALESORDERID = 'QWSWXA101BI4'
--Update sysdba.StgSOLine_TAC set TRANNO = 0 Where SALESORDERID = 'QWSWXA101BI4'