/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP 1000 *
  FROM [mas500_eab_app].[dbo].[StgSalesOrder_TAC]
  --where SUBMIT_DATE >= GETDATE() - 1
  Where tranno = 'X000002154'
  --And ProcessStatus = 0
  order by UserFld1
  
  Select TranNo, SOLineNo 
  --Select *
   FROM [mas500_eab_app].[dbo].StgSOLine_TAC
   --where TranNo = '0'
   Where tranno = 'X000002154'
  where SUBMIT_DATE >= GETDATE() - 1
  And ProcessStatus = 0


--SELECT TranNo, ProcessStatus, * FROM StgSalesOrder_TAC where SALESORDERID = 'Q1GLJA200HKT'
Select * from [mas500_eab_app].[dbo].StgSOLine_TAC
Where salesorderid = 'QC0LIA30245N'