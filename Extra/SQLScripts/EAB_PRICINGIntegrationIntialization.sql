
--=======================================================
-- TARCUSTOMER
--=======================================================
CREATE TABLE [dbo].[MAS_to_SLX_tarCustomer_zcompare](
	[CustKey] [int] NOT NULL,
	[ABANo] [varchar](10) NULL,
	[AllowCustRefund] [smallint] NOT NULL,
	[AllowWriteOff] [smallint] NOT NULL,
	[BillingType] [smallint] NOT NULL,
	[BillToNationalAcctParent] [smallint] NOT NULL,
	[CompanyID] [varchar](3) NOT NULL,
	[ConsolidatedStatement] [smallint] NOT NULL,
	[CreateDate] [datetime] NULL,
	[CreateType] [smallint] NOT NULL,
	[CreateUserID] [varchar](30) NULL,
	[CreditLimit] [decimal](15, 3) NOT NULL,
	[CreditLimitAgeCat] [smallint] NOT NULL,
	[CreditLimitUsed] [smallint] NOT NULL,
	[CRMCustID] [varchar](32) NULL,
	[CurrExchSchdKey] [int] NULL,
	[CustClassKey] [int] NOT NULL,
	[CustID] [varchar](12) NOT NULL,
	[CustName] [varchar](40) NOT NULL,
	[CustRefNo] [varchar](15) NULL,
	[DateEstab] [datetime] NULL,
	[DfltBillToAddrKey] [int] NOT NULL,
	[DfltItemKey] [int] NULL,
	[DfltMaxUpCharge] [decimal](15, 3) NOT NULL,
	[DfltMaxUpChargeType] [smallint] NOT NULL,
	[DfltSalesAcctKey] [int] NULL,
	[DfltSalesReturnAcctKey] [int] NULL,
	[DfltShipToAddrKey] [int] NOT NULL,
	[FinChgFlatAmt] [decimal](15, 3) NOT NULL,
	[FinChgPct] [decimal](5, 4) NULL,
	[Hold] [smallint] NOT NULL,
	[ImportLogKey] [int] NULL,
	[NationalAcctLevelKey] [int] NULL,
	[PmtByNationalAcctParent] [smallint] NOT NULL,
	[PrimaryAddrKey] [int] NOT NULL,
	[PrimaryCntctKey] [int] NULL,
	[PrintDunnMsg] [smallint] NOT NULL,
	[ReqCreditLimit] [decimal](15, 3) NULL,
	[ReqPO] [smallint] NOT NULL,
	[RetntPct] [decimal](5, 4) NULL,
	[SalesSourceKey] [int] NULL,
	[ShipPriority] [smallint] NOT NULL,
	[Status] [smallint] NOT NULL,
	[StdIndusCodeID] [varchar](7) NULL,
	[StmtCycleKey] [int] NULL,
	[StmtFormKey] [int] NULL,
	[TradeDiscPct] [decimal](5, 4) NULL,
	[UpdateCounter] [int] NOT NULL,
	[UpdateDate] [datetime] NULL,
	[UpdateUserID] [varchar](30) NULL,
	[UserFld1] [varchar](15) NULL,
	[UserFld2] [varchar](15) NULL,
	[UserFld3] [varchar](15) NULL,
	[UserFld4] [varchar](15) NULL,
	[VendKey] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[CustKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[MAS_to_SLX_tarCustomer_temp](
	[CustKey] [int] NOT NULL,
	[ABANo] [varchar](10) NULL,
	[AllowCustRefund] [smallint] NOT NULL,
	[AllowWriteOff] [smallint] NOT NULL,
	[BillingType] [smallint] NOT NULL,
	[BillToNationalAcctParent] [smallint] NOT NULL,
	[CompanyID] [varchar](3) NOT NULL,
	[ConsolidatedStatement] [smallint] NOT NULL,
	[CreateDate] [datetime] NULL,
	[CreateType] [smallint] NOT NULL,
	[CreateUserID] [varchar](30) NULL,
	[CreditLimit] [decimal](15, 3) NOT NULL,
	[CreditLimitAgeCat] [smallint] NOT NULL,
	[CreditLimitUsed] [smallint] NOT NULL,
	[CRMCustID] [varchar](32) NULL,
	[CurrExchSchdKey] [int] NULL,
	[CustClassKey] [int] NOT NULL,
	[CustID] [varchar](12) NOT NULL,
	[CustName] [varchar](40) NOT NULL,
	[CustRefNo] [varchar](15) NULL,
	[DateEstab] [datetime] NULL,
	[DfltBillToAddrKey] [int] NOT NULL,
	[DfltItemKey] [int] NULL,
	[DfltMaxUpCharge] [decimal](15, 3) NOT NULL,
	[DfltMaxUpChargeType] [smallint] NOT NULL,
	[DfltSalesAcctKey] [int] NULL,
	[DfltSalesReturnAcctKey] [int] NULL,
	[DfltShipToAddrKey] [int] NOT NULL,
	[FinChgFlatAmt] [decimal](15, 3) NOT NULL,
	[FinChgPct] [decimal](5, 4) NULL,
	[Hold] [smallint] NOT NULL,
	[ImportLogKey] [int] NULL,
	[NationalAcctLevelKey] [int] NULL,
	[PmtByNationalAcctParent] [smallint] NOT NULL,
	[PrimaryAddrKey] [int] NOT NULL,
	[PrimaryCntctKey] [int] NULL,
	[PrintDunnMsg] [smallint] NOT NULL,
	[ReqCreditLimit] [decimal](15, 3) NULL,
	[ReqPO] [smallint] NOT NULL,
	[RetntPct] [decimal](5, 4) NULL,
	[SalesSourceKey] [int] NULL,
	[ShipPriority] [smallint] NOT NULL,
	[Status] [smallint] NOT NULL,
	[StdIndusCodeID] [varchar](7) NULL,
	[StmtCycleKey] [int] NULL,
	[StmtFormKey] [int] NULL,
	[TradeDiscPct] [decimal](5, 4) NULL,
	[UpdateCounter] [int] NOT NULL,
	[UpdateDate] [datetime] NULL,
	[UpdateUserID] [varchar](30) NULL,
	[UserFld1] [varchar](15) NULL,
	[UserFld2] [varchar](15) NULL,
	[UserFld3] [varchar](15) NULL,
	[UserFld4] [varchar](15) NULL,
	[VendKey] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[CustKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

Create View dbo.vdvMAS_to_SLX_tarCustomer_TAC_CHANGED
as
Select * from dbo.MAS_to_SLX_tarCustomer_temp
Except
Select * from dbo.MAS_to_SLX_tarCustomer_zcompare

Go

--====================================================================================
-- tarNationalAcct
--====================================================================================
CREATE TABLE [dbo].[MAS_to_SLX_tarNationalAcct_temp](
	[NationalAcctKey] [int] NOT NULL,
	[CompanyID] [varchar](3) NOT NULL,
	[CreditLimit] [decimal](12, 0) NOT NULL,
	[CreditLimitUsed] [smallint] NOT NULL,
	[Description] [varchar](30) NOT NULL,
	[Hold] [smallint] NOT NULL,
	[NationalAcctID] [varchar](15) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[NationalAcctKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
Go
CREATE TABLE [dbo].[MAS_to_SLX_tarNationalAcct_zcompare](
	[NationalAcctKey] [int] NOT NULL,
	[CompanyID] [varchar](3) NOT NULL,
	[CreditLimit] [decimal](12, 0) NOT NULL,
	[CreditLimitUsed] [smallint] NOT NULL,
	[Description] [varchar](30) NOT NULL,
	[Hold] [smallint] NOT NULL,
	[NationalAcctID] [varchar](15) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[NationalAcctKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
Go

--===========================
Create View dbo.vdvMAS_to_SLX_tarNationalAcct_TAC_CHANGED
as
Select * from dbo.MAS_to_SLX_tarNationalAcct_temp
Except
Select * from dbo.MAS_to_SLX_tarNationalAcct_zcompare

Go

--===========================================================
-- tarNationalAcctLevel
--===========================================================

CREATE TABLE [dbo].[MAS_to_SLX_tarNationalAcctLevel_temp](
	[NationalAcctLevelKey] [int] NOT NULL,
	[Description] [varchar](30) NOT NULL,
	[NationalAcctKey] [int] NOT NULL,
	[NationalAcctLevel] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[NationalAcctLevelKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[MAS_to_SLX_tarNationalAcctLevel_zcompare](
	[NationalAcctLevelKey] [int] NOT NULL,
	[Description] [varchar](30) NOT NULL,
	[NationalAcctKey] [int] NOT NULL,
	[NationalAcctLevel] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[NationalAcctLevelKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
--===========================
Create View dbo.vdvMAS_to_SLX_tarNationalAcctLevel_TAC_CHANGED
as
Select * from dbo.MAS_to_SLX_tarNationalAcctLevel_temp
Except
Select * from dbo.MAS_to_SLX_tarNationalAcctLevel_zcompare

Go

--===========================================================
-- timNatAcctProdGrpPrc
--===========================================================
CREATE TABLE [dbo].[MAS_to_SLX_timNatAcctProdGrpPrc_temp](
	[CustProdGrpPrcKey] [int] NOT NULL,
	[CombineForBreak] [smallint] NOT NULL,
	[EffectiveDate] [datetime] NOT NULL,
	[ExpirationDate] [datetime] NOT NULL,
	[IgnoreSalesPromotions] [smallint] NOT NULL,
	[NationalAcctKey] [int] NOT NULL,
	[PricingKey] [int] NOT NULL,
	[ProdPriceGroupKey] [int] NOT NULL,
	[UpdateCounter] [int] NOT NULL,
	[WhseKey] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CustProdGrpPrcKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
CREATE TABLE [dbo].[MAS_to_SLX_timNatAcctProdGrpPrc_zcompare](
	[CustProdGrpPrcKey] [int] NOT NULL,
	[CombineForBreak] [smallint] NOT NULL,
	[EffectiveDate] [datetime] NOT NULL,
	[ExpirationDate] [datetime] NOT NULL,
	[IgnoreSalesPromotions] [smallint] NOT NULL,
	[NationalAcctKey] [int] NOT NULL,
	[PricingKey] [int] NOT NULL,
	[ProdPriceGroupKey] [int] NOT NULL,
	[UpdateCounter] [int] NOT NULL,
	[WhseKey] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CustProdGrpPrcKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

--========
Create View dbo.vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_CHANGED
as
Select * from dbo.MAS_to_SLX_timNatAcctProdGrpPrc_temp
Except
Select * from dbo.MAS_to_SLX_timNatAcctProdGrpPrc_zcompare

Go
--=============================================================================

CREATE TABLE [dbo].[MAS_to_SLX_timPriceBreak_temp](
	[PricingKey] [int] NOT NULL,
	[StartOfRange] [float] NOT NULL,
	[EndOfRange] [float] NOT NULL,
	[PctAdj] [decimal](5, 4) NOT NULL,
	[PriceOrAmtAdj] [decimal](15, 5) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PricingKey] ASC,
	[StartOfRange] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO



CREATE TABLE [dbo].[MAS_to_SLX_timPriceBreak_zcompare](
	[PricingKey] [int] NOT NULL,
	[StartOfRange] [float] NOT NULL,
	[EndOfRange] [float] NOT NULL,
	[PctAdj] [decimal](5, 4) NOT NULL,
	[PriceOrAmtAdj] [decimal](15, 5) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PricingKey] ASC,
	[StartOfRange] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[MAS_to_SLX_timPriceSheet_temp](
	[WhseKey] [int] NOT NULL,
	[ItemKey] [int] NOT NULL,
	[EffectiveDate] [datetime] NOT NULL,
	[CurrID] [varchar](3) NOT NULL,
	[ListPrice] [decimal](15, 5) NOT NULL,
	[Sheet1Price] [decimal](15, 5) NOT NULL,
	[Sheet2Price] [decimal](15, 5) NOT NULL,
	[Sheet3Price] [decimal](15, 5) NOT NULL,
	[Sheet4Price] [decimal](15, 5) NOT NULL,
	[UpdateCounter] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[WhseKey] ASC,
	[ItemKey] ASC,
	[EffectiveDate] ASC,
	[CurrID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO



CREATE TABLE [dbo].[MAS_to_SLX_timPriceSheet_zcompare](
	[WhseKey] [int] NOT NULL,
	[ItemKey] [int] NOT NULL,
	[EffectiveDate] [datetime] NOT NULL,
	[CurrID] [varchar](3) NOT NULL,
	[ListPrice] [decimal](15, 5) NOT NULL,
	[Sheet1Price] [decimal](15, 5) NOT NULL,
	[Sheet2Price] [decimal](15, 5) NOT NULL,
	[Sheet3Price] [decimal](15, 5) NOT NULL,
	[Sheet4Price] [decimal](15, 5) NOT NULL,
	[UpdateCounter] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[WhseKey] ASC,
	[ItemKey] ASC,
	[EffectiveDate] ASC,
	[CurrID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


Create View [dbo].[vdvMAS_to_SLX_timPriceBreak_TAC_CHANGED]
as
Select * from dbo.MAS_to_SLX_timPriceBreak_temp
Except
Select * from dbo.MAS_to_SLX_timPriceBreak_zcompare

GO


Create View [dbo].[vdvMAS_to_SLX_timPriceSheet_TAC_CHANGED]
as
Select * from dbo.MAS_to_SLX_timPriceSheet_temp
Except
Select * from dbo.MAS_to_SLX_timPriceSheet_zcompare

GO

--===========================================================
-- timPricing
--===========================================================
CREATE TABLE [dbo].[MAS_to_SLX_timPricing_temp](
	[PricingKey] [int] NOT NULL,
	[BreakType] [smallint] NOT NULL,
	[PriceBase] [smallint] NOT NULL,
	[PriceMeth] [smallint] NOT NULL,
	[SubjToRebate] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PricingKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[MAS_to_SLX_timPricing_zcompare](
	[PricingKey] [int] NOT NULL,
	[BreakType] [smallint] NOT NULL,
	[PriceBase] [smallint] NOT NULL,
	[PriceMeth] [smallint] NOT NULL,
	[SubjToRebate] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PricingKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
Create View [dbo].[vdvMAS_to_SLX_timPricing_TAC_CHANGED]
as
Select * from dbo.MAS_to_SLX_timPricing_temp
Except
Select * from dbo.MAS_to_SLX_timPricing_zcompare

GO

--===========================================================
-- timProdPriceGroup
--===========================================================
CREATE TABLE [dbo].[MAS_to_SLX_timProdPriceGroup_temp](
	[ProdPriceGroupKey] [int] NOT NULL,
	[CompanyID] [varchar](3) NOT NULL,
	[Description] [varchar](30) NULL,
	[ProdPriceGroupID] [varchar](15) NOT NULL,
	[UpdateCounter] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ProdPriceGroupKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

CREATE TABLE [dbo].[MAS_to_SLX_timProdPriceGroup_zcompare](
	[ProdPriceGroupKey] [int] NOT NULL,
	[CompanyID] [varchar](3) NOT NULL,
	[Description] [varchar](30) NULL,
	[ProdPriceGroupID] [varchar](15) NOT NULL,
	[UpdateCounter] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ProdPriceGroupKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
Create View [dbo].[vdvMAS_to_SLX_timProdPriceGroup_TAC_CHANGED]
as
Select * from dbo.MAS_to_SLX_timProdPriceGroup_temp
Except
Select * from dbo.MAS_to_SLX_timProdPriceGroup_zcompare

GO

--===========================================================
-- timProdPriceGroupPrice
--===========================================================
CREATE TABLE [dbo].[MAS_to_SLX_timProdPriceGroupPrice_temp](
	[ProdPriceGroupPriceKey] [int] NOT NULL,
	[CombineForBreak] [smallint] NOT NULL,
	[EffectiveDate] [datetime] NOT NULL,
	[ExpirationDate] [datetime] NOT NULL,
	[PricingKey] [int] NOT NULL,
	[ProdPriceGroupKey] [int] NOT NULL,
	[UpdateCounter] [int] NOT NULL,
	[WhseKey] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ProdPriceGroupPriceKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
Go
CREATE TABLE [dbo].[MAS_to_SLX_timProdPriceGroupPrice_zcompare](
	[ProdPriceGroupPriceKey] [int] NOT NULL,
	[CombineForBreak] [smallint] NOT NULL,
	[EffectiveDate] [datetime] NOT NULL,
	[ExpirationDate] [datetime] NOT NULL,
	[PricingKey] [int] NOT NULL,
	[ProdPriceGroupKey] [int] NOT NULL,
	[UpdateCounter] [int] NOT NULL,
	[WhseKey] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ProdPriceGroupPriceKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
Go

Create View [dbo].[vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_CHANGED]
as
Select * from dbo.MAS_to_SLX_timProdPriceGroupPrice_temp
Except
Select * from dbo.MAS_to_SLX_timProdPriceGroupPrice_zcompare

GO

--===========================================================
-- timWarehouse
--===========================================================

CREATE TABLE [dbo].[MAS_to_SLX_timWarehouse_temp](
	[WhseKey] [int] NOT NULL,
	[AllowImmedPickFromSO] [smallint] NOT NULL,
	[AllowImmedShipFromPick] [smallint] NOT NULL,
	[AllowTrnsfrBackOrd] [smallint] NOT NULL,
	[CompanyID] [varchar](3) NOT NULL,
	[CostOfCarry] [decimal](5, 4) NOT NULL,
	[COSAcctKey] [int] NULL,
	[CostTierAdjAcctKey] [int] NULL,
	[CostToReplenish] [decimal](15, 3) NOT NULL,
	[CostWhseKey] [int] NULL,
	[Description] [varchar](30) NOT NULL,
	[DfltLotPickMethod] [smallint] NOT NULL,
	[DfltPickMeth] [smallint] NOT NULL,
	[DfltPickOfOutOfStockItems] [smallint] NOT NULL,
	[ImmedInvcPrinterDest] [varchar](255) NULL,
	[ImmedInvcRptSettingKey] [int] NULL,
	[ImmedPickPrinterDest] [varchar](255) NULL,
	[ImmedPickRptSettingKey] [int] NULL,
	[InvtAcctKey] [int] NULL,
	[IssueAcctKey] [int] NULL,
	[LastRankDate] [datetime] NULL,
	[LastRankInvtPerKey] [int] NULL,
	[LastRplnsmntUpdate] [datetime] NULL,
	[MailAddrKey] [int] NULL,
	[MaxDemandMult] [decimal](5, 2) NOT NULL,
	[MaxOrderCycle] [smallint] NULL,
	[MaxQualLeadTime] [smallint] NULL,
	[MaxQualLeadTimePct] [decimal](5, 4) NULL,
	[MaxSeasDemandMult] [decimal](5, 2) NOT NULL,
	[MinDemandMult] [decimal](5, 2) NOT NULL,
	[MinOrderCycle] [smallint] NULL,
	[MinQualLeadTimePct] [decimal](5, 4) NULL,
	[MiscAdjAcctKey] [int] NULL,
	[PhysCountAcctKey] [int] NULL,
	[PriceWhseKey] [int] NULL,
	[PurchAcctKey] [int] NULL,
	[ReordMeth] [smallint] NOT NULL,
	[RestockMeth] [smallint] NOT NULL,
	[RestockRate] [decimal](12, 6) NOT NULL,
	[SalesAcctKey] [int] NULL,
	[SalesOffsetAcctKey] [int] NULL,
	[SalesReturnAcctKey] [int] NULL,
	[ShipAddrKey] [int] NOT NULL,
	[ShipComplete] [smallint] NOT NULL,
	[SortPickTckt] [smallint] NOT NULL,
	[STaxSchdKey] [int] NULL,
	[TrackQtyAtBin] [smallint] NOT NULL,
	[Transit] [smallint] NOT NULL,
	[TrendPct] [decimal](5, 2) NULL,
	[TrnsfrExpAcctKey] [int] NULL,
	[TrnsfrFrtChrgOpt] [smallint] NOT NULL,
	[TrnsfrMrkupAcctKey] [int] NULL,
	[TrnsfrSrchrgOpt] [smallint] NOT NULL,
	[UpdateCounter] [int] NOT NULL,
	[UseBins] [smallint] NOT NULL,
	[UseZones] [smallint] NOT NULL,
	[WhseID] [varchar](6) NOT NULL,
	[WhseMgrCntctKey] [int] NULL,
	[WhseOvrdSegValue] [varchar](15) NULL,
	[WillCallPickPrinterDest] [varchar](255) NULL,
	[WillCallPickRptSettingKey] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[WhseKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
CREATE TABLE [dbo].[MAS_to_SLX_timWarehouse_zcompare](
	[WhseKey] [int] NOT NULL,
	[AllowImmedPickFromSO] [smallint] NOT NULL,
	[AllowImmedShipFromPick] [smallint] NOT NULL,
	[AllowTrnsfrBackOrd] [smallint] NOT NULL,
	[CompanyID] [varchar](3) NOT NULL,
	[CostOfCarry] [decimal](5, 4) NOT NULL,
	[COSAcctKey] [int] NULL,
	[CostTierAdjAcctKey] [int] NULL,
	[CostToReplenish] [decimal](15, 3) NOT NULL,
	[CostWhseKey] [int] NULL,
	[Description] [varchar](30) NOT NULL,
	[DfltLotPickMethod] [smallint] NOT NULL,
	[DfltPickMeth] [smallint] NOT NULL,
	[DfltPickOfOutOfStockItems] [smallint] NOT NULL,
	[ImmedInvcPrinterDest] [varchar](255) NULL,
	[ImmedInvcRptSettingKey] [int] NULL,
	[ImmedPickPrinterDest] [varchar](255) NULL,
	[ImmedPickRptSettingKey] [int] NULL,
	[InvtAcctKey] [int] NULL,
	[IssueAcctKey] [int] NULL,
	[LastRankDate] [datetime] NULL,
	[LastRankInvtPerKey] [int] NULL,
	[LastRplnsmntUpdate] [datetime] NULL,
	[MailAddrKey] [int] NULL,
	[MaxDemandMult] [decimal](5, 2) NOT NULL,
	[MaxOrderCycle] [smallint] NULL,
	[MaxQualLeadTime] [smallint] NULL,
	[MaxQualLeadTimePct] [decimal](5, 4) NULL,
	[MaxSeasDemandMult] [decimal](5, 2) NOT NULL,
	[MinDemandMult] [decimal](5, 2) NOT NULL,
	[MinOrderCycle] [smallint] NULL,
	[MinQualLeadTimePct] [decimal](5, 4) NULL,
	[MiscAdjAcctKey] [int] NULL,
	[PhysCountAcctKey] [int] NULL,
	[PriceWhseKey] [int] NULL,
	[PurchAcctKey] [int] NULL,
	[ReordMeth] [smallint] NOT NULL,
	[RestockMeth] [smallint] NOT NULL,
	[RestockRate] [decimal](12, 6) NOT NULL,
	[SalesAcctKey] [int] NULL,
	[SalesOffsetAcctKey] [int] NULL,
	[SalesReturnAcctKey] [int] NULL,
	[ShipAddrKey] [int] NOT NULL,
	[ShipComplete] [smallint] NOT NULL,
	[SortPickTckt] [smallint] NOT NULL,
	[STaxSchdKey] [int] NULL,
	[TrackQtyAtBin] [smallint] NOT NULL,
	[Transit] [smallint] NOT NULL,
	[TrendPct] [decimal](5, 2) NULL,
	[TrnsfrExpAcctKey] [int] NULL,
	[TrnsfrFrtChrgOpt] [smallint] NOT NULL,
	[TrnsfrMrkupAcctKey] [int] NULL,
	[TrnsfrSrchrgOpt] [smallint] NOT NULL,
	[UpdateCounter] [int] NOT NULL,
	[UseBins] [smallint] NOT NULL,
	[UseZones] [smallint] NOT NULL,
	[WhseID] [varchar](6) NOT NULL,
	[WhseMgrCntctKey] [int] NULL,
	[WhseOvrdSegValue] [varchar](15) NULL,
	[WillCallPickPrinterDest] [varchar](255) NULL,
	[WillCallPickRptSettingKey] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[WhseKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

Create View [dbo].[vdvMAS_to_SLX_timWarehouse_TAC_CHANGED]
as
Select * from dbo.MAS_to_SLX_timWarehouse_temp
Except
Select * from dbo.MAS_to_SLX_timWarehouse_zcompare

GO

--===========================================================
-- timPriceGroupPrice
--===========================================================

CREATE TABLE [dbo].[MAS_to_SLX_timPriceGroupPrice_temp](
	[WhseKey] [int] NOT NULL,
	[CustPriceGroupKey] [int] NOT NULL,
	[ProdPriceGroupKey] [int] NOT NULL,
	[EffectiveDate] [datetime] NOT NULL,
	[CombineForBreak] [smallint] NOT NULL,
	[ExpirationDate] [datetime] NOT NULL,
	[PricingKey] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[WhseKey] ASC,
	[CustPriceGroupKey] ASC,
	[ProdPriceGroupKey] ASC,
	[EffectiveDate] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[MAS_to_SLX_timPriceGroupPrice_zcompare](
	[WhseKey] [int] NOT NULL,
	[CustPriceGroupKey] [int] NOT NULL,
	[ProdPriceGroupKey] [int] NOT NULL,
	[EffectiveDate] [datetime] NOT NULL,
	[CombineForBreak] [smallint] NOT NULL,
	[ExpirationDate] [datetime] NOT NULL,
	[PricingKey] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[WhseKey] ASC,
	[CustPriceGroupKey] ASC,
	[ProdPriceGroupKey] ASC,
	[EffectiveDate] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

Create View [dbo].[vdvMAS_to_SLX_timPriceGroupPrice_TAC_CHANGED]
as
Select * from dbo.MAS_to_SLX_timPriceGroupPrice_temp
Except
Select * from dbo.MAS_to_SLX_timPriceGroupPrice_zcompare

GO

--===========================================================
-- tarCustAddr
--===========================================================

CREATE TABLE [dbo].[MAS_to_SLX_tarCustAddr_temp](
	[AddrKey] [int] NOT NULL,
	[AllowInvtSubst] [smallint] NOT NULL,
	[BackOrdPrice] [smallint] NOT NULL,
	[BOLReqd] [smallint] NOT NULL,
	[CarrierAcctNo] [varchar](20) NULL,
	[CarrierBillMeth] [smallint] NOT NULL,
	[CloseSOLineOnFirstShip] [smallint] NOT NULL,
	[CloseSOOnFirstShip] [smallint] NOT NULL,
	[CommPlanKey] [int] NULL,
	[CreateDate] [datetime] NULL,
	[CreateType] [smallint] NOT NULL,
	[CreateUserID] [varchar](30) NULL,
	[CreditCardKey] [int] NULL,
	[CurrExchSchdKey] [int] NULL,
	[CurrID] [varchar](3) NOT NULL,
	[CustAddrID] [varchar](15) NOT NULL,
	[CustKey] [int] NOT NULL,
	[CustPriceGroupKey] [int] NULL,
	[DfltCntctKey] [int] NULL,
	[FOBKey] [int] NULL,
	[FreightMethod] [smallint] NOT NULL,
	[ImportLogKey] [int] NULL,
	[InvcFormKey] [int] NULL,
	[InvcMsg] [varchar](100) NULL,
	[InvoiceReqd] [smallint] NOT NULL,
	[LanguageID] [int] NOT NULL,
	[PackListContentsReqd] [smallint] NOT NULL,
	[PackListFormKey] [int] NULL,
	[PackListReqd] [smallint] NOT NULL,
	[PmtTermsKey] [int] NULL,
	[PriceAdj] [decimal](5, 4) NOT NULL,
	[PriceBase] [smallint] NOT NULL,
	[PrintOrderAck] [smallint] NOT NULL,
	[RequireSOAck] [smallint] NOT NULL,
	[SalesTerritoryKey] [int] NULL,
	[ShipComplete] [smallint] NOT NULL,
	[ShipDays] [smallint] NOT NULL,
	[ShipLabelFormKey] [int] NULL,
	[ShipLabelsReqd] [smallint] NOT NULL,
	[ShipMethKey] [int] NULL,
	[ShipZoneKey] [int] NULL,
	[SOAckFormKey] [int] NULL,
	[SOAckMeth] [smallint] NOT NULL,
	[SperKey] [int] NULL,
	[STaxSchdKey] [int] NULL,
	[UpdateDate] [datetime] NULL,
	[UpdateUserID] [varchar](30) NULL,
	[WhseKey] [int] NULL,
	[UsePromoPrice] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AddrKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[MAS_to_SLX_tarCustAddr_zcompare](
	[AddrKey] [int] NOT NULL,
	[AllowInvtSubst] [smallint] NOT NULL,
	[BackOrdPrice] [smallint] NOT NULL,
	[BOLReqd] [smallint] NOT NULL,
	[CarrierAcctNo] [varchar](20) NULL,
	[CarrierBillMeth] [smallint] NOT NULL,
	[CloseSOLineOnFirstShip] [smallint] NOT NULL,
	[CloseSOOnFirstShip] [smallint] NOT NULL,
	[CommPlanKey] [int] NULL,
	[CreateDate] [datetime] NULL,
	[CreateType] [smallint] NOT NULL,
	[CreateUserID] [varchar](30) NULL,
	[CreditCardKey] [int] NULL,
	[CurrExchSchdKey] [int] NULL,
	[CurrID] [varchar](3) NOT NULL,
	[CustAddrID] [varchar](15) NOT NULL,
	[CustKey] [int] NOT NULL,
	[CustPriceGroupKey] [int] NULL,
	[DfltCntctKey] [int] NULL,
	[FOBKey] [int] NULL,
	[FreightMethod] [smallint] NOT NULL,
	[ImportLogKey] [int] NULL,
	[InvcFormKey] [int] NULL,
	[InvcMsg] [varchar](100) NULL,
	[InvoiceReqd] [smallint] NOT NULL,
	[LanguageID] [int] NOT NULL,
	[PackListContentsReqd] [smallint] NOT NULL,
	[PackListFormKey] [int] NULL,
	[PackListReqd] [smallint] NOT NULL,
	[PmtTermsKey] [int] NULL,
	[PriceAdj] [decimal](5, 4) NOT NULL,
	[PriceBase] [smallint] NOT NULL,
	[PrintOrderAck] [smallint] NOT NULL,
	[RequireSOAck] [smallint] NOT NULL,
	[SalesTerritoryKey] [int] NULL,
	[ShipComplete] [smallint] NOT NULL,
	[ShipDays] [smallint] NOT NULL,
	[ShipLabelFormKey] [int] NULL,
	[ShipLabelsReqd] [smallint] NOT NULL,
	[ShipMethKey] [int] NULL,
	[ShipZoneKey] [int] NULL,
	[SOAckFormKey] [int] NULL,
	[SOAckMeth] [smallint] NOT NULL,
	[SperKey] [int] NULL,
	[STaxSchdKey] [int] NULL,
	[UpdateDate] [datetime] NULL,
	[UpdateUserID] [varchar](30) NULL,
	[WhseKey] [int] NULL,
	[UsePromoPrice] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AddrKey] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


Create View [dbo].[vdvMAS_to_SLX_tarCustAddr_TAC_CHANGED]
as
Select * from dbo.MAS_to_SLX_tarCustAddr_temp
Except
Select * from dbo.MAS_to_SLX_tarCustAddr_zcompare

GO


--===========================================================
-- TACNATIONALACCTITEMEXC
--===========================================================

CREATE TABLE [dbo].[MAS_to_SLX_TACNATIONALACCTITEMEXC_temp](
	[WhseID] [varchar](6) NULL,
	[ItemID] [varchar](30) NULL,
	[Description] [varchar](30) NULL,
	[CustID] [varchar](12) NULL,
	[CustName] [varchar](40) NULL,
	[BreakType] [smallint] NULL,
	[PriceBase] [smallint] NULL,
	[PriceMeth] [smallint] NULL,
	[PctAdj] [decimal](5, 4) NULL,
	[PriceOrAmtAdj] [decimal](15, 5) NULL,
	[CurrID] [varchar](3) NULL,
	[ListPrice] [decimal](15, 5) NULL,
	[Sheet1Price] [decimal](15, 5) NULL,
	[Sheet2Price] [decimal](15, 5) NULL,
	[Sheet3Price] [decimal](15, 5) NULL,
	[Sheet4Price] [decimal](15, 5) NULL
) ON [PRIMARY]

GO
CREATE TABLE [dbo].[MAS_to_SLX_TACNATIONALACCTITEMEXC_zcompare](
	[WhseID] [varchar](6) NULL,
	[ItemID] [varchar](30) NULL,
	[Description] [varchar](30) NULL,
	[CustID] [varchar](12) NULL,
	[CustName] [varchar](40) NULL,
	[BreakType] [smallint] NULL,
	[PriceBase] [smallint] NULL,
	[PriceMeth] [smallint] NULL,
	[PctAdj] [decimal](5, 4) NULL,
	[PriceOrAmtAdj] [decimal](15, 5) NULL,
	[CurrID] [varchar](3) NULL,
	[ListPrice] [decimal](15, 5) NULL,
	[Sheet1Price] [decimal](15, 5) NULL,
	[Sheet2Price] [decimal](15, 5) NULL,
	[Sheet3Price] [decimal](15, 5) NULL,
	[Sheet4Price] [decimal](15, 5) NULL
) ON [PRIMARY]

SET ANSI_PADDING OFF
GO


Create View [dbo].[vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC_CHANGED]
as
Select * from dbo.MAS_to_SLX_TACNATIONALACCTITEMEXC_temp
Except
Select * from dbo.MAS_to_SLX_TACNATIONALACCTITEMEXC_zcompare
Go
--===========================================================
-- TACInventoryItemEXC
--===========================================================

CREATE TABLE [dbo].[MAS_to_SLX_TACInventoryItemEXC_temp](
	[PctAdj] [decimal](5, 4) NOT NULL,
	[PriceOrAmtAdj] [decimal](15, 5) NOT NULL,
	[CompanyID] [varchar](3) NULL,
	[PriceMeth] [smallint] NULL,
	[ItemKey] [int] NULL
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[MAS_to_SLX_TACInventoryItemEXC_zcompare](
	[PctAdj] [decimal](5, 4) NOT NULL,
	[PriceOrAmtAdj] [decimal](15, 5) NOT NULL,
	[CompanyID] [varchar](3) NULL,
	[PriceMeth] [smallint] NULL,
	[ItemKey] [int] NULL
) ON [PRIMARY]

GO
Create View [dbo].[vdvMAS_to_SLX_TACInventoryItemEXC_TAC_CHANGED]
as
Select * from dbo.MAS_to_SLX_TACInventoryItemEXC_temp
Except
Select * from dbo.MAS_to_SLX_TACInventoryItemEXC_zcompare
Go
--=================================================================================
CREATE CLUSTERED INDEX [_dta_index_MAS_to_SLX_TACNATIONALACCTITEMEX_c_5_923866358__K1] ON [dbo].[MAS_to_SLX_TACNATIONALACCTITEMEXC_temp] 
(
	[WhseID] ASC
)WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
Go

CREATE NONCLUSTERED INDEX [_dta_index_MAS_to_SLX_TACNATIONALACCTITEMEX_5_923866358__K1_2_4] ON [dbo].[MAS_to_SLX_TACNATIONALACCTITEMEXC_temp] 
(
	[WhseID] ASC
)
INCLUDE ( [ItemID],
[CustID]) WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
GO
CREATE CLUSTERED INDEX [_dta_index_TACNATIONALACCTITEMEXC_c_5_502292849__K6] ON [sysdba].[TACNATIONALACCTITEMEXC] 
(
	[WHSEID] ASC
)WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

GO








