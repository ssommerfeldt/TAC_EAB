INSERT INTO [LiveEAB_app].[dbo].[StgTrnsfrOrderLine_TAC]
           ([ItemID]
           ,[UoM]
           ,[QtyOrd]
           ,[SurchargeFixedAmt]
           ,[SurchargePct]
           ,[TranCmnt]
           ,[TrnsfrLineNo]
           ,[TrnsfrOrderID]
           ,[ProcessStatus]
           ,[SessionKey]
           ,[ProcessStatusMessage])
     
     SELECT 
       [ITEMID]
      ,[UOM]
      ,[QTYORD]
      ,[SURCHARGEFIXEDAMT]
      ,[SURCHARGEPCT]
      ,[TRANCMNT]
      ,[TRNSFRLINENO]
      ,[TRNSFRORDERID]
      ,[PROCESSSTATUS]
      ,[SESSIONKEY]
      ,[PROCESSSTATUSMESSAGE]
  FROM [LiveEAB_slx].[sysdba].[STGTRNSFRORDERLINE_TAC]
  where TRNSFRORDERID = 1
GO



