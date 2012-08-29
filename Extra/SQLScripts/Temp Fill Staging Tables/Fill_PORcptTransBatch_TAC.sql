INSERT INTO [LiveEAB_app].[dbo].[StgPORcptTransBatch_PSG]
           ([BatchCmnt]
           ,[BatchNo]
           ,[BatchType]
           ,[Hold]
           ,[HoldReason]
           ,[PostDate]
           ,[Private]
           ,[ProcessStatus]
           ,[SessionKey]
           ,[WhseID])
          
     SELECT
       [BATCHCMNT]
      ,[BATCHNO]
      ,[BATCHTYPE]
      ,[HOLD]
      ,[HOLDREASON]
      ,[POSTDATE]
      ,[PRIVATEBATCH]
      ,[PROCESSSTATUS]
      ,[SESSIONKEY]
      ,[WHSEID]
  FROM [LiveEAB_slx].[sysdba].[STGPORCPTTRANSBATCH]
  Where Rowkey = 1
GO
