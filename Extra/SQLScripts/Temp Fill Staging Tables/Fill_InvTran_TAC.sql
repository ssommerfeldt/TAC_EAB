INSERT INTO [LiveEAB_app].[dbo].[StgInvtTranBatch_TAC]
           ([BatchID]
           ,[BComment]
           ,[BDate]
           ,[WhseID]
           ,[CompanyID]
           ,[ProcessStatus]
           )
     
     SELECT [BATCHID]
      ,[BCOMMENT]
      ,[BDATE]
      ,[WHSEID]
      ,[COMPANYID]
      ,0
      
  FROM [LiveEAB_slx].[sysdba].[STGINVTTRANBATCH_TAC]
  where batchid = 4
GO
