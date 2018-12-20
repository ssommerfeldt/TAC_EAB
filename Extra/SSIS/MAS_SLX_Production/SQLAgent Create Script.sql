USE [msdb]
GO

/****** Object:  Job [SSIS MAS-SLX Integration Staging Tables Production]    Script Date: 06/20/2018 16:05:48 ******/
BEGIN TRANSACTION
DECLARE @ReturnCode INT
SELECT @ReturnCode = 0
/****** Object:  JobCategory [[Uncategorized (Local)]]]    Script Date: 06/20/2018 16:05:48 ******/
IF NOT EXISTS (SELECT name FROM msdb.dbo.syscategories WHERE name=N'[Uncategorized (Local)]' AND category_class=1)
BEGIN
EXEC @ReturnCode = msdb.dbo.sp_add_category @class=N'JOB', @type=N'LOCAL', @name=N'[Uncategorized (Local)]'
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback

END

DECLARE @jobId BINARY(16)
EXEC @ReturnCode =  msdb.dbo.sp_add_job @job_name=N'SSIS MAS-SLX Integration Staging Tables Production', 
		@enabled=0, 
		@notify_level_eventlog=3, 
		@notify_level_email=2, 
		@notify_level_netsend=0, 
		@notify_level_page=0, 
		@delete_level=0, 
		@description=N'Load staging tables in MAS from SLX', 
		@category_name=N'[Uncategorized (Local)]', 
		@owner_login_name=N'sa', 
		@notify_email_operator_name=N'Alex Scott', @job_id = @jobId OUTPUT
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
/****** Object:  Step [Run SSIS Package]    Script Date: 06/20/2018 16:05:49 ******/
EXEC @ReturnCode = msdb.dbo.sp_add_jobstep @job_id=@jobId, @step_name=N'Run SSIS Package', 
		@step_id=1, 
		@cmdexec_success_code=0, 
		@on_success_action=4, 
		@on_success_step_id=2, 
		@on_fail_action=2, 
		@on_fail_step_id=2, 
		@retry_attempts=14, 
		@retry_interval=0, 
		@os_run_priority=0, @subsystem=N'SSIS', 
		@command=N'/FILE "D:\TAC\SSIS\MAS_SLX_Production\EAB_MASUpdateStagingTables.dtsx" /CONFIGFILE "D:\TAC\SSIS\MAS_SLX_Production\EAB_MASStagingTables.dtsConfig" /WARNASERROR /X86  /CHECKPOINTING OFF /REPORTING E', 
		@database_name=N'master', 
		@flags=32
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
/****** Object:  Step [MAS Sales Order]    Script Date: 06/20/2018 16:05:49 ******/
EXEC @ReturnCode = msdb.dbo.sp_add_jobstep @job_id=@jobId, @step_name=N'MAS Sales Order', 
		@step_id=2, 
		@cmdexec_success_code=0, 
		@on_success_action=4, 
		@on_success_step_id=3, 
		@on_fail_action=3, 
		@on_fail_step_id=0, 
		@retry_attempts=0, 
		@retry_interval=0, 
		@os_run_priority=0, @subsystem=N'TSQL', 
		@command=N'DECLARE @return_value int,
@oiRetVal int

EXEC @return_value = [dbo].[spsoCreateSalesOrder_TAC] @sCompanyID = N''EAB'', @oiRetVal = @oiRetVal OUTPUT
EXEC @return_value = [dbo].[spsoCreateSalesOrder_TAC] @sCompanyID = N''EBD'', @oiRetVal = @oiRetVal OUTPUT
EXEC @return_value = [dbo].[spsoCreateSalesOrder_TAC] @sCompanyID = N''EBU'', @oiRetVal = @oiRetVal OUTPUT

', 
		@database_name=N'mas500_eab_app', 
		@flags=0
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
/****** Object:  Step [MAS Purchase Order]    Script Date: 06/20/2018 16:05:49 ******/
EXEC @ReturnCode = msdb.dbo.sp_add_jobstep @job_id=@jobId, @step_name=N'MAS Purchase Order', 
		@step_id=3, 
		@cmdexec_success_code=0, 
		@on_success_action=4, 
		@on_success_step_id=4, 
		@on_fail_action=3, 
		@on_fail_step_id=0, 
		@retry_attempts=0, 
		@retry_interval=0, 
		@os_run_priority=0, @subsystem=N'TSQL', 
		@command=N'DECLARE	@return_value int,
		@oiRetVal int

EXEC	@return_value = [dbo].[sppoCreatePurchaseOrder_TAC] @sCompanyID = N''EAB'', @oiRetVal = @oiRetVal OUTPUT
EXEC	@return_value = [dbo].[sppoCreatePurchaseOrder_TAC] @sCompanyID = N''EBU'', @oiRetVal = @oiRetVal OUTPUT
EXEC	@return_value = [dbo].[sppoCreatePurchaseOrder_TAC] @sCompanyID = N''EBD'', @oiRetVal = @oiRetVal OUTPUT



', 
		@database_name=N'mas500_eab_app', 
		@flags=0
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
/****** Object:  Step [MAS IM Adjustment]    Script Date: 06/20/2018 16:05:49 ******/
EXEC @ReturnCode = msdb.dbo.sp_add_jobstep @job_id=@jobId, @step_name=N'MAS IM Adjustment', 
		@step_id=4, 
		@cmdexec_success_code=0, 
		@on_success_action=4, 
		@on_success_step_id=5, 
		@on_fail_action=3, 
		@on_fail_step_id=0, 
		@retry_attempts=0, 
		@retry_interval=0, 
		@os_run_priority=0, @subsystem=N'TSQL', 
		@command=N'DECLARE	@return_value int,
		@_oRetVal int

EXEC	@return_value = [dbo].[spIMapiProcessInvtTrans_TAC] @_iCompanyID = N''EAB'', @_iSessionKey = 1, @_oRetVal = @_oRetVal OUTPUT
EXEC	@return_value = [dbo].[spIMapiProcessInvtTrans_TAC] @_iCompanyID = N''EBD'', @_iSessionKey = 1, @_oRetVal = @_oRetVal OUTPUT
EXEC	@return_value = [dbo].[spIMapiProcessInvtTrans_TAC] @_iCompanyID = N''EBU'', @_iSessionKey = 1, @_oRetVal = @_oRetVal OUTPUT

', 
		@database_name=N'mas500_eab_app', 
		@flags=0
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
/****** Object:  Step [MAS Shipment]    Script Date: 06/20/2018 16:05:49 ******/
EXEC @ReturnCode = msdb.dbo.sp_add_jobstep @job_id=@jobId, @step_name=N'MAS Shipment', 
		@step_id=5, 
		@cmdexec_success_code=0, 
		@on_success_action=4, 
		@on_success_step_id=6, 
		@on_fail_action=3, 
		@on_fail_step_id=0, 
		@retry_attempts=0, 
		@retry_interval=0, 
		@os_run_priority=0, @subsystem=N'TSQL', 
		@command=N'DECLARE	@return_value int,
		@_oRetVal int

EXEC	@return_value = [dbo].[spSOapiProcessShipment_TAC] @_iCompanyID = N''EAB'', @_iSessionKey = 0, @_oRetVal = @_oRetVal OUTPUT
EXEC	@return_value = [dbo].[spSOapiProcessShipment_TAC] @_iCompanyID = N''EBD'', @_iSessionKey = 0, @_oRetVal = @_oRetVal OUTPUT
EXEC	@return_value = [dbo].[spSOapiProcessShipment_TAC] @_iCompanyID = N''EBU'', @_iSessionKey = 0, @_oRetVal = @_oRetVal OUTPUT', 
		@database_name=N'mas500_eab_app', 
		@flags=0
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
/****** Object:  Step [MAS Transfer Order]    Script Date: 06/20/2018 16:05:49 ******/
EXEC @ReturnCode = msdb.dbo.sp_add_jobstep @job_id=@jobId, @step_name=N'MAS Transfer Order', 
		@step_id=6, 
		@cmdexec_success_code=0, 
		@on_success_action=4, 
		@on_success_step_id=7, 
		@on_fail_action=3, 
		@on_fail_step_id=0, 
		@retry_attempts=0, 
		@retry_interval=0, 
		@os_run_priority=0, @subsystem=N'TSQL', 
		@command=N'DECLARE	@return_value int,
		@_oRetVal int

EXEC	@return_value = [dbo].[spIMapiCreateTO_TAC] @_iCompanyID = N''EAB'', @_iSessionKey = 0, @_oRetVal = @_oRetVal OUTPUT
EXEC	@return_value = [dbo].[spIMapiCreateTO_TAC] @_iCompanyID = N''EBU'', @_iSessionKey = 0, @_oRetVal = @_oRetVal OUTPUT
EXEC	@return_value = [dbo].[spIMapiCreateTO_TAC] @_iCompanyID = N''EBD'', @_iSessionKey = 0, @_oRetVal = @_oRetVal OUTPUT', 
		@database_name=N'mas500_eab_app', 
		@flags=0
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
/****** Object:  Step [MAS PO Receipt]    Script Date: 06/20/2018 16:05:49 ******/
EXEC @ReturnCode = msdb.dbo.sp_add_jobstep @job_id=@jobId, @step_name=N'MAS PO Receipt', 
		@step_id=7, 
		@cmdexec_success_code=0, 
		@on_success_action=4, 
		@on_success_step_id=8, 
		@on_fail_action=3, 
		@on_fail_step_id=0, 
		@retry_attempts=0, 
		@retry_interval=0, 
		@os_run_priority=0, @subsystem=N'TSQL', 
		@command=N'DECLARE	@return_value int,
		@oiRetVal int

EXEC	@return_value = [dbo].[sppoCreatePOReceiptDriver_TAC] 	@sCompanyID = N''EAB'', @oiRetVal = @oiRetVal OUTPUT
EXEC	@return_value = [dbo].[sppoCreatePOReceiptDriver_TAC] 	@sCompanyID = N''EBD'', @oiRetVal = @oiRetVal OUTPUT
EXEC	@return_value = [dbo].[sppoCreatePOReceiptDriver_TAC] 	@sCompanyID = N''EBU'', @oiRetVal = @oiRetVal OUTPUT', 
		@database_name=N'mas500_eab_app', 
		@flags=0
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
/****** Object:  Step [MAS TO Receipt]    Script Date: 06/20/2018 16:05:49 ******/
EXEC @ReturnCode = msdb.dbo.sp_add_jobstep @job_id=@jobId, @step_name=N'MAS TO Receipt', 
		@step_id=8, 
		@cmdexec_success_code=0, 
		@on_success_action=1, 
		@on_success_step_id=0, 
		@on_fail_action=2, 
		@on_fail_step_id=0, 
		@retry_attempts=0, 
		@retry_interval=0, 
		@os_run_priority=0, @subsystem=N'TSQL', 
		@command=N'DECLARE	@return_value int,
		@oiRetVal int

EXEC	@return_value = [dbo].[sppoCreateTOTrnBatchDriver_TAC]	@sCompanyID = N''EAB'', @oiRetVal = @oiRetVal OUTPUT
EXEC	@return_value = [dbo].[sppoCreateTOTrnBatchDriver_TAC]	@sCompanyID = N''EBU'', @oiRetVal = @oiRetVal OUTPUT
EXEC	@return_value = [dbo].[sppoCreateTOTrnBatchDriver_TAC]	@sCompanyID = N''EBD'', @oiRetVal = @oiRetVal OUTPUT', 
		@database_name=N'mas500_eab_app', 
		@flags=0
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
EXEC @ReturnCode = msdb.dbo.sp_update_job @job_id = @jobId, @start_step_id = 1
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
EXEC @ReturnCode = msdb.dbo.sp_add_jobschedule @job_id=@jobId, @name=N'Every 2 min', 
		@enabled=1, 
		@freq_type=4, 
		@freq_interval=1, 
		@freq_subday_type=4, 
		@freq_subday_interval=2, 
		@freq_relative_interval=0, 
		@freq_recurrence_factor=0, 
		@active_start_date=20120912, 
		@active_end_date=99991231, 
		@active_start_time=40000, 
		@active_end_time=230000, 
		@schedule_uid=N'5dfff942-86b1-47f5-b65d-98843f223466'
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
EXEC @ReturnCode = msdb.dbo.sp_add_jobserver @job_id = @jobId, @server_name = N'(local)'
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
COMMIT TRANSACTION
GOTO EndSave
QuitWithRollback:
    IF (@@TRANCOUNT > 0) ROLLBACK TRANSACTION
EndSave:

GO


