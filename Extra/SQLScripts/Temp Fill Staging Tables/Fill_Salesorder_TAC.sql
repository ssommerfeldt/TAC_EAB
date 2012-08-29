INSERT INTO [LiveEAB_app].[dbo].[StgSalesOrder_TAC]
           ([BillToCustAddrID]
           ,[ContactName]
           ,[CurrExchRate]
           ,[CurrID]
           ,[CustClassID]
           ,[CustID]
           ,[DfltShipToCustAddrID]
           ,[FreightAmt]
           ,[Hold]
           ,[OpenAmt]
           ,[RequireSOAck]
           ,[Status]
           ,[STaxAmt]
           ,[TradeDiscAmt]
           ,[TranDate]
           ,[TranNo]
           ,[ProcessStatus]
           ,[SessionKey]
           )
     
           
           SELECT
			[BILLTOCUSTADDRID]
			,[CONTACTNAME]
			,[CURREXCHRATE]
			,[CURRID]
			,[CUSTCLASSID]
			,[CUSTID]
			,[DFLTSHIPTOCUSTADDRID]
			,[FREIGHTAMT]
			,[HOLD]
			,[OPENAMT]
			,[REQUIRESOACK]
			,[STATUS]
			,[STAXAMT]
			,[TRADEDISCAMT]
			,[TRANDATE]
			,[TRANNO]
			,[PROCESSSTATUS]      
			,[SESSIONKEY]
      
                  
  FROM [LiveEAB_slx].[sysdba].[STGSALESORDER_TAC]
  where tranno = 4      
          
           
GO


