With OrderLifeSpan As (

Select s.ALTERNATEKEYPREFIX + '-' + s.ALTERNATEKEYSUFFIX As SalesOrderNumber
, s.TRANSMITDATE, s.ORDERTYPE, s.ORDERTOTAL, s.MASNUMBER, s.MASSTATUS
 
, (Select COUNT(*) From SalesLogix_Production.sysdba.SALESORDERITEMS 
	Where SALESORDERID = s.SALESORDERID And QUANTITY <> 0) As SLX_LineCount
	
, s1.TRANNO As 'SLX_Stg_TranNo', s1.OPENAMT As 'SLX_Stg_OpenAmt' 
, (Select COUNT(*) From SalesLogix_Production.sysdba.STGSOLINE_TAC 
	Where TRANNO = s1.TRANNO) As 'SLX_Stage_LineCount'

, s2.TranNo As 'MAS_Stg_TranNo', s2.OpenAmt As 'MAS_Stg_OpenAmt', s2.ProcessStatus, s2.PROCESS_DATE
, (Select COUNT(*) From mas500_eab_app.dbo.StgSOLine_TAC
	Where TranNo = s2.TranNo) As 'Mas_Stage_LineCount'
	
, s3.TranNo As 'MAS_TranNo', s3.OpenAmt As 'Mas_OpenAmt', s3.CompanyID, s3.CreateDate
, (Select COUNT(*) From mas500_eab_app.dbo.tsoSOLine As sol
	Where sol.SOKey = s3.SOKey) As 'Mas_SO_LineCount'


From SalesLogix_Production.sysdba.SALESORDER As s
Left Outer Join SalesLogix_Production.sysdba.STGSALESORDER_TAC As s1
	On s1.SALESORDERID = s.SALESORDERID 
Left Outer Join mas500_eab_app.dbo.StgSalesOrder_TAC As s2
	On s2.TranNo = s1.TRANNO
Left Outer Join mas500_eab_app.dbo.tsoSalesOrder As s3
	On s3.TranNo = s2.TranNo 

Where TRANSMITDATE > GETDATE() - 7
And ORDERTYPE = 'Sales Order'
And (MASSTATUS is Null Or MASSTATUS <> 'Closed' And MASSTATUS <> 'Posted')
--And MASNUMBER is Null

)

Select * from OrderLifeSpan

--Where SLX_LineCount <> Mas_SO_LineCount
Where (SLX_LineCount <> Mas_Stage_LineCount 
Or SLX_LineCount <> Mas_SO_LineCount)
And MASNUMBER is null
And ORDERTOTAL > 0
Order By OrderType, TRANSMITDATE