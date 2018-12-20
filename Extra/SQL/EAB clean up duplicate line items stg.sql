--select TranNo from StgSOLine
----where ProcessStatus = 0
--Group by TranNo, SOLineNo
--Having COUNT(*) > 1


--Delete from StgSOLine Where TranNo In (
--select TranNo from StgSOLine
--where ProcessStatus = 0
--Group by TranNo, SOLineNo
--Having COUNT(*) > 1)

--Select * from StgSOLine_TAC 
--Select * from StgSalesOrder_TAC
--Select * From mas500_eab_app.dbo.tsoSOLine

Select Distinct s.Userfld1, s.TranNo, s.SUBMIT_DATE, s.ProcessStatus 

, (Select TranNo From mas500_eab_app.dbo.tsoSalesOrder As t Where t.TranNo = s.TranNo) As MasTranno
, (Select Count(TranNo) From mas500_eab_app.dbo.tsoSOLine As st 
	Left Outer Join mas500_eab_app.dbo.tsoSalesOrder As t On t.SOKey = st.SOKey 
	Where t.TranNo = s.TranNo) As MasLineCount
	
From StgSOLine_Tac As sl
Left Outer Join StgSalesOrder_TAC As s On s.SalesOrderID = sl.SalesOrderID 
Where s.Tranno In (
select Distinct sl.TranNo from StgSOLine_Tac As sl
--where  ProcessStatus = 1 --and SUBMIT_DATE > '2017-06-05'
Group by sl.TranNo, SOLineNo
Having COUNT(*) > 1
)
Order By s.submit_date, TranNo


--Delete From StgSOLine_TAC Where TranNo In (
--select TranNo from StgSOLine_Tac 
--where SUBMIT_DATE > '2017-06-05' and ProcessStatus = 0
--Group by TranNo, SOLineNo
--Having COUNT(*) > 1 )