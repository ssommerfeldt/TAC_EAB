
use mas500_tst_app
--use mas500_eab_app

Declare @MasTranNo varchar(30);		--'X000003366'
Declare @SalesorderID varchar(30);	--'QEAB3A02KQ09'
Declare @key varchar(30); -- '222-00-4326057'

Set @key = '001-00-5674968' --test 5
Set @key = '001-00-5675179' --test 6
Set @key = '001-00-5683130' --missing test record
Set @key = '001-00-5685607' --test 101

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
Order By h.TRANDATE

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

