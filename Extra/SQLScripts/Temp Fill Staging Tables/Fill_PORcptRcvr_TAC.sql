INSERT INTO [LiveEAB_app].[dbo].[StgPORcptRcvr_PSG]
           ([RowKey]
           ,[ProcessStatus]
           ,[SessionKey]
           ,[BillOfLadingNo]
           ,[PONum]
           ,[PurchCompanyID]
           ,[TranCmnt]
           ,[TranDate]
           ,[TranType])
     
     SELECT 
       [ROWKEY]
      ,[PROCESSSTATUS]
      ,[SESSIONKEY]
      ,[BILLOFLADINGNO]
      ,[PONUM]
      ,[PURCHCOMPANYID]
      ,[TRANCMNT]
      ,[TRANDATE]
      ,[TRANTYPE]
  FROM [LiveEAB_slx].[sysdba].[STGPORCPTRCVR]
  Where Rowkey = 1
GO
   