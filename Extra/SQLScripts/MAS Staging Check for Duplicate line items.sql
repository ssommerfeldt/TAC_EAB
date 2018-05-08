SELECT TranNo, ProcessStatus, PROCESS_DATE, UserFld1, OpenAmt, * FROM dbo.StgSalesOrder_TAC
where TranDate > GETDATE() - 1
Where TranNo = 'X000000533' OR TranNo = 'X000000393'
--Where TranNo In (
--Select TranNo From dbo.StgSOLine_TAC
--Group by TranNo, ItemID, SOLineNo
--Having COUNT(SOLineNo) > 1
--)
SELECT TranNo, ProcessStatus, PROCESS_DATE, UserFld1, OpenAmt, * FROM dbo.StgSalesOrder_TAC
Where userfld1 = '252-00-3266882'

SELECT TranNo, ProcessStatus, PROCESS_DATE, UserFld1, OpenAmt, * FROM dbo.StgSalesOrder_TAC
Where userfld1 = '252-00-3288108'

Select * from dbo.tdmMigrationLogWrk_TAC where EntityID In (
SELECT TranNo + '%' FROM dbo.StgSalesOrder_TAC
Where ProcessStatus = 2
)

SELECT Tranno, RowKey, SOLineNo, ItemID,* FROM dbo.StgSOLine_TAC
Where TranNo = 'X000000571' Or TranNo = 'X000000393'
--Where TranNo In (
--Select TranNo From dbo.StgSOLine_TAC
--Group by TranNo, ItemID, SOLineNo
--Having COUNT(SOLineNo) > 1
--)

Select * from dbo.tdmMigrationLogWrk_TAC where EntityID like 'X000000571%' --'X000000549%'

SELECT TranNo, ProcessStatus, * FROM StgSalesOrder_TAC where SALESORDERID = 'Q1GLJA200HKT'


--SELECT * FROM dbo.StgSalesOrder_TAC		WHERE TranNo = 'X000000004'
--SELECT RowKey, SOLineNo, ItemID,* FROM dbo.StgSOLine_TAC			WHERE TranNo = 'X000000004'  

--DELETE FROM dbo.StgSOLine_TAC			
--WHERE TranNo = 'X000000046'  AND SUBMIT_DATE = '2014-06-19 11:33:14.237'
--Where RowKey = 460


Select IsNull(Count(SalesOrderID), 0) As OrderExists
From dbo.STGSALESORDER_TAC
--Where SalesOrderID = ''
--Where UserFld1 = '001-00-1133208'
WHERE TranNo = 'X000000571'
And ProcessStatus = 0