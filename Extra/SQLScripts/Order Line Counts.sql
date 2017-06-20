Select s.ALTERNATEKEYPREFIX + '-' + s.ALTERNATEKEYSUFFIX As SalesOrderNumber
, s.TRANSMITDATE, s.ORDERTYPE, s.MASNUMBER 

, (Select COUNT(*) From SalesLogix_Production.sysdba.SALESORDERITEMS 
	Where SALESORDERID = s.SALESORDERID and QUANTITY <> '0') As SLX_LineCount

, s1.TRANNO 
, (Select COUNT(*) From SalesLogix_Production.sysdba.STGSOLINE_TAC
	Where SALESORDERID = s.SALESORDERID And TRANNO = s1.TRANNO) As SLX_Stage_LineCount
	
, s2.TranNo
, (Select COUNT(*) From mas500_eab_app.dbo.StgSOLine_TAC 
	Where SALESORDERID = s.SALESORDERID And TranNo = s2.TranNo And s2.TranNo = s1.TRANNO) As MAS_Stage_LineCount
, s2.ProcessStatus, s2.PROCESS_DATE 	
	
, s3.TranNo 
, (Select Count(TranNo) From mas500_eab_app.dbo.tsoSOLine As st 
	Left Outer Join mas500_eab_app.dbo.tsoSalesOrder As t On t.SOKey = st.SOKey 
	Where t.UserFld1 = s.ALTERNATEKEYPREFIX + '-' + s.ALTERNATEKEYSUFFIX
	And s3.TranNo = s2.TranNo) As MasLineCount

--, (Select TranNo From mas500_eab_app.dbo.tsoSalesOrder As t	
--	Where t.UserFld1 = s.ALTERNATEKEYPREFIX + '-' + s.ALTERNATEKEYSUFFIX) As MasTranNo

From SalesLogix_Production.sysdba.SALESORDER As s
Left Outer Join SalesLogix_Production.sysdba.STGSALESORDER_TAC As s1 
	On s1.SALESORDERID = s.SALESORDERID
Left Outer Join mas500_eab_app.dbo.StgSalesOrder_TAC as s2
	On s2.SalesOrderID = s.SALESORDERID
Left Outer Join mas500_eab_app.dbo.tsoSalesOrder as s3
	On s3.UserFld1 = s.ALTERNATEKEYPREFIX + '-' + s.ALTERNATEKEYSUFFIX

--Where s.STATUS = 'Transmitted to Accounting'
Where s.TRANSMITDATE > GETDATE() - 14
--And s.MASNUMBER is null
And ORDERTYPE = 'Sales Order'
Order By ORDERTYPE desc, TRANSMITDATE asc