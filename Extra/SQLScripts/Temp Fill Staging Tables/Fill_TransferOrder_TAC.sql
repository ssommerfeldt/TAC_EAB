INSERT INTO [LiveEAB_app].[dbo].[StgTrnsfrOrder_TAC]
           ([CloseDate]
           ,[CompanyID]
           ,[RcvgWhseID]
           ,[ReqDelvDate]
           ,[SchdShipDate]
           ,[ShipMethID]
           ,[ShipWhseID]
           ,[TranCmnt]
           ,[TranDate]
           ,[TranNo]
           ,[TransitWhseID]
           ,[ProcessStatus]
           ,[SessionKey]
           ,[ProcessStatusMessage])
     
     SELECT 
       [CLOSEDATE]
      ,[COMPANYID]
      ,[RCVGWHSEID]
      ,[REQDELVDATE]
      ,[SCHDSHIPDATE]
      ,[SHIPMETHID]
      ,[SHIPWHSEID]
      ,[TRANCMNT]
      ,[TRANDATE]
      ,[TRANNO]
      ,[TRANSITWHSEID]
      ,[PROCESSSTATUS]
      ,[SESSIONKEY]
      ,[PROCESSSTATUSMESSAGE]
  FROM [LiveEAB_slx].[sysdba].[STGTRNSFRORDER_TAC]
  where TRNSFRORDERID = 1
    
GO


