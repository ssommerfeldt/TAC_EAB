
--Delete from StgSOLine Where TranNo In (
--select TranNo from StgSOLine
--where ProcessStatus = 0
--Group by TranNo, SOLineNo
--Having COUNT(*) > 1)



--Delete From StgSOLine_TAC Where TranNo In (
--select TranNo from StgSOLine_Tac 
--where SUBMIT_DATE > '2017-06-05' and ProcessStatus = 0
--Group by TranNo, SOLineNo
--Having COUNT(*) > 1 )