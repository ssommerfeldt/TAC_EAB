INSERT INTO [LiveEAB_app].[dbo].[StgPORcptDist_PSG]
           ([RowLineKey]
           ,[DistQty]
           ,[BinID]
           ,[LotNo]
           ,[LotExpirationDate]
           ,[SerialNo]
           ,[ProcessStatus]
           ,[SessionKey])
     
     SELECT 
       [ROWLINEKEY]
      ,[DISTQTY]
      ,[BINID]
      ,[LOTNO]
      ,[LOTEXPIRATIONDATE]
      ,[SERIALNO]
      ,[PROCESSSTATUS]
      ,[SESSIONKEY]
  FROM [LiveEAB_slx].[sysdba].[STGPORCPTDIST]
  Where RowLinekey = 1
GO
