Select TRANNO, PROCESSSTATUS, * From sysdba.STGSALESORDER_TAC --Where SalesOrderID = 'QAPEXAF8DSJH'
Where TRANDATE > Getdate() - 4 -- tranno like '%64021'
--And processstatus <> 'SUCCESS'
Order By TRANDATE

Select s.TRANNO , s.PROCESSSTATUS, OrigOrdered, Unitprice, Round(OrigOrdered * unitprice, 2), EXTAMT
--Select SUM(Round(OrigOrdered * unitprice, 2))
From sysdba.STGSOLINE_TAC s
Inner Join sysdba.STGSALESORDER_TAC h ON h.STGSALESORDER_TACID = s.STGSALESORDER_TACID
--Where h.SalesOrderID = 'QAPEXAF8DSJH'
Where h.trandate > Getdate() - 4
Order By h.trandate

--Delete from sysdba.STGSALESORDER_TAC where TRANNO = 'X000000005'
--Delete from sysdba.STGSOLINE_TAC where TRANNO = 'X000000005'