

--Declare @SalesOrderNumber varchar(30); -- '222-00-4326057'
--Set @SalesOrderNumber = '222-01-061564'

With SLXSalesOrder As (

--SLX Sales Order
Select 'SLX Sales Order' as Source
, h.ALTERNATEKEYPREFIX + '-' + h.ALTERNATEKEYSUFFIX  As SalesOrderNumber
, SubString(h.MASNUMBER, 4, LEN(h.MASNUMBER)) As TranNo
, Round(MAX(h.ORDERTOTAL), 2) As 'OrderTotal' 
--, SUM(Round(s.QUANTITY * s.PRICE, 2)) As 'LineTotal' 
, SUM(Round(s.EXTENDEDPRICE, 2)) As 'LineTotal' 
, Case MAX(h.ORDERTOTAL) When 0 Then null 
  Else Convert(Numeric (18,2), SUM(Round(s.EXTENDEDPRICE, 2))) % Convert(Numeric (18,2), Round(MAX(h.ORDERTOTAL), 2))
  End As Modulus
, (Select COUNT(s1.SALESORDERITEMSID) 
	From Saleslogix_Production.sysdba.SALESORDERITEMS s1 
	Where s1.SALESORDERID = h.SALESORDERID and s1.QUANTITY <> 0
   ) As LineItemCount
--, COUNT(Distinct s.SalesOrderItemsID) as LineItemCount 
, COUNT(Distinct h.SALESORDERID) as OrderCount
From Saleslogix_Production.sysdba.SALESORDER h
Inner Join Saleslogix_Production.sysdba.SALESORDERITEMS s ON s.SALESORDERID = h.SALESORDERID And s.QUANTITY <> 0
Group By h.SalesOrderID, h.ALTERNATEKEYPREFIX + '-' + h.ALTERNATEKEYSUFFIX, h.MASNUMBER 
Having Max(h.STATUS) <> 'Open Order'
--SUM(Round(s.QUANTITY * s.PRICE, 2)) <> 0
--AND MAX(h.ORDERTOTAL) <> 0 
--And Convert(Numeric (18,2), SUM(Round(s.QUANTITY * s.PRICE, 2))) <> Convert(Numeric (18,2), Round(MAX(h.ORDERTOTAL), 2))
----And SUM(Round(OrigOrdered * unitprice, 2)) % MAX(h.OpenAmt) = 0
----Order By h.ALTERNATEKEYPREFIX + '-' + h.ALTERNATEKEYSUFFIX 

),
SLXStaging As (

--SLX Staging records
Select 'SLX Staging Records' as Source
, h.UserFld1 As SalesOrderNumber
, h.TRANNO As TranNo
, Round(MAX(h.OpenAmt), 2) As 'OrderTotal' 
, SUM(Round(s.OrigOrdered * s.unitprice, 2)) As 'LineTotal' 
, Case MAX(h.OpenAmt) When 0 Then null 
  Else Convert(Numeric (18,2), SUM(Round(s.OrigOrdered * s.unitprice, 2))) % Convert(Numeric (18,2), Round(MAX(h.OpenAmt), 2))
  End As Modulus
, COUNT(Distinct s.SalesOrderItemID) as LineItemCount 
, COUNT(Distinct h.TranNo) as OrderCount
From Saleslogix_Production.sysdba.STGSOLINE_TAC s
Inner Join Saleslogix_Production.sysdba.STGSALESORDER_TAC h ON h.TranNo = s.TranNo 
Group By h.SalesOrderID, h.UserFld1, h.TRANNO 
--Where h.UserFld1 = @SalesOrderNumber
--Having --SUM(Round(OrigOrdered * unitprice, 2)) <> 0
----AND MAX(h.OpenAmt) <> 0 
----And Max(h.ProcessStatus) = 1
-- Convert(Numeric (18,2), SUM(Round(s.OrigOrdered * s.unitprice, 2))) <> Convert(Numeric (18,2), Round(MAX(h.OpenAmt), 2))
----And SUM(Round(OrigOrdered * unitprice, 2)) % MAX(h.OpenAmt) = 0
----Order By h.UserFld1

),
MASStaging As (

--MAS Staging Records
Select 'MAS Staging Records' as Source
, h.UserFld1 As SalesOrderNumber
, h.TranNo  
, MAX(h.OpenAmt ) As 'OrderTotal' 
, SUM(Round(OrigOrdered * unitprice, 2)) As 'LineTotal' 
, Case MAX(h.OpenAmt) When 0 Then null 
  Else SUM(Round(OrigOrdered * unitprice, 2)) % MAX(h.OpenAmt)
  End As Modulus
, COUNT(Distinct s.SalesOrderItemID) as LineItemCount
, COUNT(Distinct h.TranNo) as OrderCount

From mas500_eab_app.dbo.STGSOLINE_TAC s
Inner Join mas500_eab_app.dbo.STGSALESORDER_TAC h ON h.TranNo = s.TranNo 
Group By h.SalesOrderID, h.UserFld1, h.TranNo 
--Where h.UserFld1 = @SalesOrderNumber
--Having SUM(Round(OrigOrdered * unitprice, 2)) <> 0
--AND MAX(h.OpenAmt) <> 0 
--And Max(h.ProcessStatus) = 1
--And SUM(Round(OrigOrdered * unitprice, 2)) <> MAX(h.OpenAmt)
----And SUM(Round(OrigOrdered * unitprice, 2)) % MAX(h.OpenAmt) = 0
----Order By h.UserFld1

),
MASSalesOrder As (

--Mas Salesorder
Select 'MAS Sales Order' as Source 
, h.UserFld1 As SalesOrderNumber
, h.TranNo 
, MAX(h.SalesAmt) As 'OrderTotal' 
, SUM(Round(sd.ExtAmt, 2)) As 'LineTotal' 
, Case MAX(h.SalesAmt) When 0 Then null 
  Else SUM(Round(sd.ExtAmt, 2)) % MAX(h.SalesAmt)
  End As Modulus
, COUNT(Distinct sd.SOLineKey) as LineItemCount 
, COUNT(Distinct h.SOKey) as OrderCount
From mas500_eab_app.dbo.tsoSOLine s
Inner Join mas500_eab_app.dbo.tsoSALESORDER h ON h.SOKey = s.SOKey
Inner JOIN mas500_eab_app.dbo.tsoSOLineDist sd ON sd.SOLineKey = s.SOLineKey  
Group By  h.UserFld1, TranNo 
--Having SUM(Round(OrigOrdered * unitprice, 2)) <> 0
--AND MAX(h.OpenAmt) <> 0 
--And IsNull(h.UserFld1, '') <> '' 
--And SUM(Round(OrigOrdered * unitprice, 2)) <> MAX(h.OpenAmt)
----And SUM(Round(OrigOrdered * unitprice, 2)) % MAX(h.OpenAmt) = 0
----Order By h.UserFld1

)


Select A1.Source, A1.SalesOrderNumber, A1.TranNo, A1.[OrderTotal], A1.[LineTotal], A1.LineItemCount, A1.OrderCount, A1.Modulus 
	 , A2.Source, A2.SalesOrderNumber, A2.TranNo, A2.[OrderTotal], A2.[LineTotal], A2.LineItemCount, A2.OrderCount, A2.Modulus  
	 , A3.Source, A3.SalesOrderNumber, A3.TranNo, A3.[OrderTotal], A3.[LineTotal], A3.LineItemCount, A3.OrderCount, A3.Modulus  
	 , A4.Source, A4.SalesOrderNumber, A4.TranNo, A4.[OrderTotal], A4.[LineTotal], A4.LineItemCount, A4.OrderCount, A4.Modulus 
From SLXSalesOrder As A1
Left Outer Join SLXStaging As A2 On A2.SalesOrderNumber = A1.SalesOrderNumber And A2.TranNo = A1.TranNo 
Left Outer Join MASStaging As A3 On A3.SalesOrderNumber = A1.SalesOrderNumber And A3.TranNo = A2.TranNo 
Left Outer Join MASSalesOrder As A4 On A4.SalesOrderNumber = A1.SalesOrderNumber And A4.TranNo = A3.TranNo 

--Saleslogix missing items
--Where Convert(Numeric(18,2), A1.[OrderTotal]) <> Convert(Numeric(18,2), A1.[LineTotal])

--MAS Missing Items
--Where Convert(Numeric(18,2), A4.[OrderTotal]) <> Convert(Numeric(18,2), A4.[LineTotal])

--Staging difference
--Where ABS(Convert(Numeric(18,2), A2.[OrderTotal])) <> ABS(Convert(Numeric(18,2), A3.[OrderTotal]))
--Where Convert(Numeric(18,2), A2.LineItemCount) <> Convert(Numeric(18,2), A3.LineItemCount)

--MAS difference in staging to prod
--Where Convert(Numeric(18,2), A3.[OrderTotal]) <> Convert(Numeric(18,2), A4.[OrderTotal])
--Where Convert(Numeric(18,2), A3.[MAS Staging LineItemCount]) <> Convert(Numeric(18,2), A4.LineItemCount)
--Where Convert(Numeric(18,2), A3.LineItemCount) <> Convert(Numeric(18,2), A4.LineItemCount)

--Duplicate Staging records
--Where A3.OrderCount > 1

Where A1.SalesOrderNumber In (
Select USERFLD1
FROM Saleslogix_Production.sysdba.STGSALESORDER_TAC
WHERE TRANNO = '0'
)