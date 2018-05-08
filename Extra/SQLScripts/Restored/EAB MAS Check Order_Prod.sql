
--use mas500_tst_app
use mas500_eab_app

Declare @MasTranNo varchar(30);		--'X000003366'
Declare @SalesorderID varchar(30);	--'QEAB3A02KQ09'
Declare @key varchar(30); -- '222-00-4326057'

Set @key = '001-00-6965443' --failed to import
Set @key = '223-03-434850' --incomplete order sent
Set @key = '268-03-010404' --type mismatch
Set @key = '268-02-001811' --order total error
Set @key = '268-03-006973' --no mas number in slx
Set @key = '257-01-350496' --not processing
Set @key = '271-03-054499' --check for chris
Set @key = '270-04-016583' --dist submission
Set @key = '249-01-000875'  --error from Marc
Set @key = '268-03-027519' -- did it get stuck?
Set @key = '001-00-7002601' --missing PO
--Set @key = '277-01-000131' --craigs new order
Set @key = '257-01-360665' --return to PP
Set @key = '245-01-013779' --duplicated order
Set @key = '245-01-013006' --triplicated order
set @key = '268-03-063620' --error
Set @key = '256-02-174221' --incomplete in mas
set @key = '223-03-523040' --did it work
Set @key = '001-00-7172093' --all good
Set @key = '001-00-7200975' --all good
Set @key = '001-00-7201185' --possible duplicate
Set @key = '256-02-179568' --id didn't get back to slx
Set @key = '223-03-552340' --bad sp
Set @key = '285-05-007649' --missing table error
Set @key = '279-02-001462' --not imported to mas
Set @key = '289-01-044397' --error
Set @key = '221-03-030586' -- admin hold
Set @key = '211-05-027379'
--'246-06-003623'
--'249-12-033314'
--'267-04-052027'
--266-03-026193
--269-02-099407
--252-05-168540
--252-05-169212'
Set @key = '258-09-027112' --too many lines in mas

--Notes ----------------------------------------------------------------------
-- Process Status column: 0 is not processed yet, 1 is sucess, 2 is failure
-- Look to transaction log on failures
------------------------------------------------------------------------------
Set @MasTranNo = (Select Max(TRANNO) From dbo.STGSALESORDER_TAC Where UserFld1 = @key)
Set @SalesorderID = (Select SalesorderId From SalesLogix_Production.sysdba.SALESORDER Where ALTERNATEKEYPREFIX + '-' + ALTERNATEKEYSUFFIX = @key)

--Staging Tables Sales order
Select TRANNO, PROCESSSTATUS, * From dbo.STGSALESORDER_TAC 
--Where trandate > Getdate() - 1
--Where SalesOrderID = @SalesorderID
--Where Tranno = @MasTranNo
Where UserFld1 = @key
Order By TRANDATE

Select s.TRANNO, SOLineNo, s.PROCESSSTATUS, OrigOrdered, Unitprice, Round(OrigOrdered * unitprice, 2) as CalculatedEXTAMT, EXTAMT, *
From dbo.STGSOLINE_TAC s
Inner Join dbo.STGSALESORDER_TAC h ON h.TranNo = s.TranNo 
--Where h.trandate > Getdate() - 1
--Where h.SalesOrderID = @SalesorderID
--Where h.Tranno = @MasTranNo
Where h.UserFld1 = @key
--Order By h.trandate
Order By s.SOLineNo

Select SUM(Round(OrigOrdered * unitprice, 2)) As 'Sales Order Staging records Order Total' 
, SUM(Round(EXTAMT, 2)) As 'Sales Order Staging records Calculated Order Total'
From dbo.STGSOLINE_TAC s
Inner Join dbo.STGSALESORDER_TAC h ON h.TranNo = s.TranNo 
--Where h.trandate > Getdate() - 1
--Where h.SalesOrderID = @SalesorderID
--Where h.Tranno = @MasTranNo
Where h.UserFld1 = @key


--Staging tables purchase order
Select TRANNO, STATUS, * From dbo.STGPURCHASEORDER_TAC -- sysdba.TACSLXSO s
--Inner Join TACSLXSOHeader h ON h.guid = s.SOKey
--Where trandate > Getdate() - 1
--Where SalesOrderID = @SalesorderID
--Where Tranno = @MasTranNo
Where UserFld1 = @key
Order By TRANDATE

Select p.TRANNO, p.STATUS, * From dbo.STGPOLINE_TAC As p -- sysdba.TACSLXSO s
Inner Join dbo.STGPURCHASEORDER_TAC As h ON h.TranNo = p.TranNo  
--Where h.trandate > Getdate() - 1
--Where h.SalesOrderID = @SalesorderID
--Where h.Tranno = @MasTranNo
Where h.UserFld1 = @key
Order By h.TRANDATE, POLineNo 

Select SUM(Round(OrigOrdered * p.UnitCost, 2)) As 'Purchase Order Staging records Order Total' 
From dbo.STGPOLINE_TAC As p
Inner Join dbo.STGPURCHASEORDER_TAC As h ON h.TranNo = p.TranNo 
--Where h.trandate > Getdate() - 1
--Where h.SalesOrderID = @SalesorderID
--Where h.Tranno = @MasTranNo
Where h.UserFld1 = @key

--MAS Salesorder tables
select * from tsoSalesOrder 
--Where SalesOrderID = @SalesorderID
--Where Tranno = @MasTranNo
Where UserFld1 = @key
Order By TRANDATE

Select s.SOKey, sd.*, s.* from tsoSOLine As s
Inner Join dbo.tsoSALESORDER h ON h.SOKey = s.SOKey  
Inner JOIN dbo.tsoSOLineDist sd ON sd.SOLineKey = s.SOLineKey
--Where h.trandate > Getdate() - 1
--Where h.SalesOrderID = @SalesorderID
--Where h.Tranno = @MasTranNo
Where h.UserFld1 = @key
Order By h.trandate

Select SUM(Round(sd.ExtAmt, 2)) As 'Sales Order Line Total' 
From dbo.tsoSOLine As s
Inner Join dbo.tsoSALESORDER h ON h.SOKey = s.SOKey  
Inner JOIN dbo.tsoSOLineDist sd ON sd.SOLineKey = s.SOLineKey 
Where h.UserFld1 = @key


--MAS Transfer order tables
Select TRANNO, * From dbo.StgTrnsfrOrder_TAC
Where TranCmnt = @key
Order By TRANDATE

Select TRANNO, * From dbo.StgTrnsfrOrderLine_TAC As p -- sysdba.TACSLXSO s
Inner Join dbo.StgTrnsfrOrder_TAC As h ON h.TrnsfrOrderID = p.TrnsfrOrderID  
Where h.TranCmnt = @key
Order By h.TRANDATE



--Transaction log
Select * from dbo.tdmMigrationLogWrk_TAC
Where EntityID like '%' + @MasTranNo + '%'
order by DateCreated desc

Select * from dbo.tdmMigrationLogWrk_TAC
Where EntityID like '%' + @SalesorderID + '%'
order by DateCreated desc

--Select top 1000 * from dbo.tdmMigrationLogWrk_TAC order by DateCreated desc

