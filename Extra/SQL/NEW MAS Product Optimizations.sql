CREATE STATISTICS [_dta_stat_1138871174_11_1] ON [dbo].[tglAccount]([GLAcctNo], [GLAcctKey])

CREATE STATISTICS [_dta_stat_21028002_2_1_17] ON [dbo].[timInventory]([ItemKey], [WhseKey], [InvtAcctKey])

CREATE STATISTICS [_dta_stat_21028002_17_1] ON [dbo].[timInventory]([InvtAcctKey], [WhseKey])

CREATE NONCLUSTERED INDEX [_dta_index_timInventory_5_21028002__K1_K2_28_29_44_45_46_47_48_49_54] ON [dbo].[timInventory] 
(
	[WhseKey] ASC,
	[ItemKey] ASC
)
INCLUDE ( [LinePoint],
[MaxStockQty],
[QtyOnPO],
[QtyOnSO],
[QtyOnTrnsfr],
[QtyOnWO],
[QtyReqForTrnsfr],
[QtyReqForWO],
[ReordMeth]) WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_816110048_51_31] ON [dbo].[timItem]([SalesUnitMeasKey], [ItemType])

CREATE STATISTICS [_dta_stat_816110048_56_31_1_11_60_65] ON [dbo].[timItem]([Status], [ItemType], [ItemKey], [CompanyID], [StockUnitMeasKey], [TrackMeth])
CREATE STATISTICS [_dta_stat_816110048_31_1_51_11_60] ON [dbo].[timItem]([ItemType], [ItemKey], [SalesUnitMeasKey], [CompanyID], [StockUnitMeasKey])
CREATE STATISTICS [_dta_stat_816110048_31_65_1_11] ON [dbo].[timItem]([ItemType], [TrackMeth], [ItemKey], [CompanyID])


CREATE STATISTICS [_dta_stat_816110048_65_1_11_60] ON [dbo].[timItem]([TrackMeth], [ItemKey], [CompanyID], [StockUnitMeasKey])
CREATE STATISTICS [_dta_stat_816110048_60_1] ON [dbo].[timItem]([StockUnitMeasKey], [ItemKey])

CREATE STATISTICS [_dta_stat_816110048_60_31_1] ON [dbo].[timItem]([StockUnitMeasKey], [ItemType], [ItemKey])

CREATE STATISTICS [_dta_stat_816110048_1_31_11_60_65_51_56] ON [dbo].[timItem]([ItemKey], [ItemType], [CompanyID], [StockUnitMeasKey], [TrackMeth], [SalesUnitMeasKey], [Status])

CREATE STATISTICS [_dta_stat_816110048_1_11_60_51_56_31] ON [dbo].[timItem]([ItemKey], [CompanyID], [StockUnitMeasKey], [SalesUnitMeasKey], [Status], [ItemType])

CREATE NONCLUSTERED INDEX [_dta_index_timItem_5_816110048__K1_K51_K56_K31_K28_41_58] ON [dbo].[timItem] 
(
	[ItemKey] ASC,
	[SalesUnitMeasKey] ASC,
	[Status] ASC,
	[ItemType] ASC,
	[ItemClassKey] ASC
)
INCLUDE ( [ProdPriceGroupKey],
[StdPrice]) WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_816110048_1_51_56_31_28_11_60] ON [dbo].[timItem]([ItemKey], [SalesUnitMeasKey], [Status], [ItemType], [ItemClassKey], [CompanyID], [StockUnitMeasKey])

CREATE STATISTICS [_dta_stat_816110048_31_1_28_11_60_65_51_56] ON [dbo].[timItem]([ItemType], [ItemKey], [ItemClassKey], [CompanyID], [StockUnitMeasKey], [TrackMeth], [SalesUnitMeasKey], [Status])

CREATE NONCLUSTERED INDEX [_dta_index_timItem_5_816110048__K1_K11_K60_K31_2_29] ON [dbo].[timItem] 
(
	[ItemKey] ASC,
	[CompanyID] ASC,
	[StockUnitMeasKey] ASC,
	[ItemType] ASC
)
INCLUDE ( [AdjQtyRoundMeth],
[ItemID]) WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE STATISTICS [_dta_stat_816110048_11_31] ON [dbo].[timItem]([CompanyID], [ItemType])

CREATE STATISTICS [_dta_stat_816110048_28_31] ON [dbo].[timItem]([ItemClassKey], [ItemType])

CREATE NONCLUSTERED INDEX [_dta_index_timItemDescription_5_2032114380__K1_4] ON [dbo].[timItemDescription] 
(
	[ItemKey] ASC
)
INCLUDE ( [ShortDesc]) WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]



CREATE NONCLUSTERED INDEX [_dta_index_timItemDescription_5_2032114380__K1_3_4] ON [dbo].[timItemDescription] 
(
	[ItemKey] ASC
)
INCLUDE ( [LongDesc],
[ShortDesc]) WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_timItemUnitOfMeas_5_476632841__K1_K2_5_8] ON [dbo].[timItemUnitOfMeas] 
(
	[ItemKey] ASC,
	[TargetUnitMeasKey] ASC
)
INCLUDE ( [IsSmallestUOM],
[UPC]) WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE STATISTICS [_dta_stat_1159779289_19_12_3_1] ON [dbo].[timWhseBin]([WhseKey], [Type], [ExclFromAvail], [WhseBinKey])

CREATE STATISTICS [_dta_stat_1159779289_3_19_1] ON [dbo].[timWhseBin]([ExclFromAvail], [WhseKey], [WhseBinKey])
CREATE STATISTICS [_dta_stat_1159779289_12_3] ON [dbo].[timWhseBin]([Type], [ExclFromAvail])

CREATE NONCLUSTERED INDEX [_dta_index_timWhseBin_5_1159779289__K1_K12_K3_K19] ON [dbo].[timWhseBin] 
(
	[WhseBinKey] ASC,
	[Type] ASC,
	[ExclFromAvail] ASC,
	[WhseKey] ASC
)WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_timWhseBin_5_1159779289__K19_K1_K3_K12] ON [dbo].[timWhseBin] 
(
	[WhseKey] ASC,
	[WhseBinKey] ASC,
	[ExclFromAvail] ASC,
	[Type] ASC
)WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_timWhseBinInvt_5_1527780600__K2_K1_6_7_8] ON [dbo].[timWhseBinInvt] 
(
	[ItemKey] ASC,
	[WhseBinKey] ASC
)
INCLUDE ( [PendQtyDecrease],
[PendQtyIncrease],
[QtyOnHand]) WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_timWhseBinInvt_5_1527780600__K1_K2_6_7_8] ON [dbo].[timWhseBinInvt] 
(
	[WhseBinKey] ASC,
	[ItemKey] ASC
)
INCLUDE ( [PendQtyDecrease],
[PendQtyIncrease],
[QtyOnHand]) WITH (SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_446116830_3_5_1] ON [dbo].[tsmListValidation]([DBValue], [StringNo], [TableName])







