INSERT INTO [LiveEAB_app].[dbo].[StgsoPicklist_TAC]
           ([TranType]
           ,[TranNo]
           ,[CompanyID]
           ,[TranDate]
           ,[ProcessStatus]
           ,[SessionKey]
           ,[SUBMIT_DATE]
           ,[PROCESS_DATE])
     
     SELECT 
       [TRANTYPE]
      ,[TRANNO]
      ,[COMPANYID]
      ,[TRANDATE]
      ,[PROCESSSTATUS]
      ,[SESSIONKEY]      
      ,[ModifyDate]
      ,[PROCESS_DATE]
      
  FROM [LiveEAB_slx].[sysdba].[STGSOPICKLIST_TAC]
  Where tranno = 1
GO