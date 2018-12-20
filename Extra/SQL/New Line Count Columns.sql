/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.StgSalesOrder_TAC ADD
	LineItemCount int NULL
GO
ALTER TABLE dbo.StgSalesOrder_TAC SET (LOCK_ESCALATION = TABLE)
GO

ALTER TABLE dbo.StgPurchaseOrder_TAC ADD
	LineItemCount int NULL
GO
ALTER TABLE dbo.StgPurchaseOrder_TAC SET (LOCK_ESCALATION = TABLE)
GO

ALTER TABLE dbo.StgsoPicklist_TAC ADD
	LineItemCount int NULL
GO
ALTER TABLE dbo.StgsoPicklist_TAC SET (LOCK_ESCALATION = TABLE)
GO

ALTER TABLE dbo.StgTrnsfrOrder_TAC ADD
	LineItemCount int NULL
GO
ALTER TABLE dbo.StgTrnsfrOrder_TAC SET (LOCK_ESCALATION = TABLE)
GO

COMMIT


