INSERT INTO [LiveEAB_app].[dbo].[StgsoPickListLine_TAC]
           ([ItemID]
           ,[QtyOnBO]
           ,[QtyOrd]
           ,[QtyShip]
           ,[ShipDate]
           ,[SOLineNo]
           ,[TranNo]
           ,[CompanyID]
           ,[UnitMeasID]
           ,[ProcessStatus]
           ,[SessionKey]
           ,[SUBMIT_DATE]
           ,[PROCESS_DATE]
           ,[SOLineKey]
           ,[OrderKey])
     
     SELECT 
       [ITEMID]
      ,[QTYONBO]
      ,[QTYORD]
      ,[QTYSHIP]
      ,[SHIPDATE]
      ,[SOLINENO]
      ,[TRANNO]
      ,[COMPANYID]
      ,[UNITMEASID]
      ,[PROCESSSTATUS]
      ,[SESSIONKEY]
      ,[ModifyDate]
      ,[PROCESS_DATE]
      ,[SOLINENo]
      ,[ORDERKEY]
  FROM [LiveEAB_slx].[sysdba].[STGSOPICKLISTLINE_TAC]
  Where tranno = 1
GO  
     

