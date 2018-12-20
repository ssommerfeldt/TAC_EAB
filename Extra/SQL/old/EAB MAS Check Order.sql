
--use mas500_tst_app
use mas500_eab_app

Declare @MasTranNo varchar(30);		--'X000003366'
Declare @SalesorderID varchar(30);	--'QEAB3A02KQ09'
Declare @SalesOrderNumber varchar(30); -- '222-00-4326057'

--Set @SalesorderID = 'QEAB3A02KQ09'
--Set @MasTranNo = 'X000003863'
--Set @SalesOrderNumber = '222-00-4326057'
--Set @SalesOrderNumber = '245-01-299850'
Set @SalesOrderNumber = '222-00-4026062'

--Notes ----------------------------------------------------------------------
-- Process Status column: 0 is not processed yet, 1 is sucess, 2 is failure
-- Look to transaction log on failures
------------------------------------------------------------------------------
Set @MasTranNo = (Select Max(TRANNO) From dbo.STGSALESORDER_TAC Where UserFld1 = @SalesOrderNumber)

--Staging Tables Sales order
Select TRANNO, PROCESSSTATUS, * From dbo.STGSALESORDER_TAC 
--Where trandate > Getdate() - 1
--Where SalesOrderID = @SalesorderID
--Where Tranno = @MasTranNo
Where UserFld1 = @SalesOrderNumber
Order By TRANDATE

Select s.TRANNO , s.PROCESSSTATUS, OrigOrdered, Unitprice, Round(OrigOrdered * unitprice, 2), EXTAMT, *
From dbo.STGSOLINE_TAC s
Inner Join dbo.STGSALESORDER_TAC h ON h.TranNo = s.TranNo 
--Where h.trandate > Getdate() - 1
--Where h.SalesOrderID = @SalesorderID
--Where h.Tranno = @MasTranNo
Where h.UserFld1 = @SalesOrderNumber
Order By h.trandate

Select SUM(Round(OrigOrdered * unitprice, 2)) As 'Sales Order Staging records Order Total' 
From dbo.STGSOLINE_TAC s
Inner Join dbo.STGSALESORDER_TAC h ON h.TranNo = s.TranNo 
--Where h.trandate > Getdate() - 1
--Where h.SalesOrderID = @SalesorderID
--Where h.Tranno = @MasTranNo
Where h.UserFld1 = @SalesOrderNumber


--Staging tables purchase order
Select TRANNO, STATUS, * From dbo.STGPURCHASEORDER_TAC -- sysdba.TACSLXSO s
--Inner Join TACSLXSOHeader h ON h.guid = s.SOKey
--Where trandate > Getdate() - 1
--Where SalesOrderID = @SalesorderID
--Where Tranno = @MasTranNo
Where UserFld1 = @SalesOrderNumber
Order By TRANDATE

Select p.TRANNO, p.STATUS, * From dbo.STGPOLINE_TAC As p -- sysdba.TACSLXSO s
Inner Join dbo.STGPURCHASEORDER_TAC As h ON h.TranNo = p.TranNo  
--Where h.trandate > Getdate() - 1
--Where h.SalesOrderID = @SalesorderID
--Where h.Tranno = @MasTranNo
Where h.UserFld1 = @SalesOrderNumber
Order By h.TRANDATE

Select SUM(Round(OrigOrdered * p.UnitCost, 2)) As 'Purchase Order Staging records Order Total' 
From dbo.STGPOLINE_TAC As p
Inner Join dbo.STGPURCHASEORDER_TAC As h ON h.TranNo = p.TranNo 
--Where h.trandate > Getdate() - 1
--Where h.SalesOrderID = @SalesorderID
--Where h.Tranno = @MasTranNo
Where h.UserFld1 = @SalesOrderNumber

--MAS Salesorder tables
select * from tsoSalesOrder 
--Where SalesOrderID = @SalesorderID
--Where Tranno = @MasTranNo
Where UserFld1 = @SalesOrderNumber
Order By TRANDATE

Select * from tsoSOLine As s
Inner Join dbo.tsoSALESORDER h ON h.SOKey = s.SOKey  
--Where h.trandate > Getdate() - 1
--Where h.SalesOrderID = @SalesorderID
--Where h.Tranno = @MasTranNo
Where h.UserFld1 = @SalesOrderNumber
Order By h.trandate

--Transaction log
Select * from dbo.tdmMigrationLogWrk_TAC
Where EntityID like '%' + @MasTranNo + '%'
order by DateCreated desc

