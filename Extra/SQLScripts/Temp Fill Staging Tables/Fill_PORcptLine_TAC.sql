INSERT INTO [LiveEAB_app].[dbo].[StgPORcptLine_PSG]
           ([RowRcvrKey]
           ,[CloseSrcLine]
           ,[ItemVol]
           ,[ItemWght]
           ,[MatchStatus]
           ,[POLineNo]
           ,[SeqNo]
           ,[TranCmnt]
           ,[UnitMeasID]
           ,[AcctRefCode]
           ,[QtyRcvd])
    
    SELECT       
       [ROWRCVRKEY]
      ,[CLOSESRCLINE]
      ,[ITEMVOL]
      ,[ITEMWGHT]
      ,[MATCHSTATUS]
      ,[POLINENO]
      ,[SEQNO]
      ,[TRANCMNT]
      ,[UNITMEASID]
      ,[ACCTREFCODE]
      ,[QTYRCVD]
  FROM [LiveEAB_slx].[sysdba].[STGPORCPTLINE]
  Where rowrcvrkey = 1
GO
