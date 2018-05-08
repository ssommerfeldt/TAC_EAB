SELECT TranNo, ProcessStatus, * FROM sysdba.StgSalesOrder_TAC where CREATEUSER = 'UEAB3A00000Q'
--Where TRANNO = 'X000000041' or TRANNO = 'X000000042' or TRANNO = 'X000000043'
where userfld1 = '249-04-010155'

SELECT Tranno, RowKey, SOLineNo, ItemID,* FROM sysdba.StgSOLine_TAC
Where TRANNO = 'X000000046'
--Where TranNo In (
--Select TranNo From sysdba.StgSOLine_TAC
--Group by TranNo, ItemID, SOLineNo
--Having COUNT(SOLineNo) > 1
--)



