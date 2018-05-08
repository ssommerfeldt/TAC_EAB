--=====================================
-- Delete Query
--======================================
Delete from sysdba.PRODUCT where PRODUCTID in  (Select PRODUCTID from mas500_tst_app.dbo.vdvMAS_to_SLX_Products_TAC_Deleted)
Delete from sysdba.TACINVENTORYITEMEXC where TACINVENTORYITEMEXCID in (Select  TACINVENTORYITEMEXCID from    mas500_tst_app.dbo.vdvMAS_to_SLX_TACInventoryItemEXC_TAC_Deleted)

Delete from sysdba.TACNATIONALACCTITEMEXC where TACNATIONALACCTITEMEXCID in ( Select TACNATIONALACCTITEMEXCID from  mas500_tst_app.dbo.vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC_Deleted)

Delete from sysdba.TARCUSTADDR where TARCUSTADDRID in (Select TARCUSTADDRID from  mas500_tst_app.dbo.vdvMAS_to_SLX_tarCustAddr_TAC_Deleted)

Delete from sysdba.TARCUSTOMER where TARCUSTOMERID in (select TARCUSTOMERID from   mas500_tst_app.dbo.vdvMAS_to_SLX_TarCustomer_TAC_Deleted)

Delete  from sysdba.TARNATIONALACCT where TARNATIONALACCTID in (Select TARNATIONALACCTID from   mas500_tst_app.dbo.vdvMAS_to_SLX_tarNationalAcct_TAC_Deleted)

Delete from sysdba.TARNATIONALACCTLEVEL where TARNATIONALACCTLEVELID in ( Select TARNATIONALACCTLEVELID from  mas500_tst_app.dbo.vdvMAS_to_SLX_tarNationalAcctLevel_TAC_Delete)

Delete from sysdba.TIMNATACCTPRODGRPPRC where TIMNATACCTPRODGRPPRCID in ( Select TIMNATACCTPRODGRPPRCID from  mas500_tst_app.dbo.vdvMAS_to_SLX_timNatAcctProdGrpPrc_TAC_Deleted)

Delete from sysdba.TIMPRICEBREAK where TIMPRICEBREAKID  in (Select TIMPRICEBREAKID from  mas500_tst_app.dbo.vdvMAS_to_SLX_timPriceBreak_TAC_Deleted)

Delete from sysdba.TIMPRICEGROUPPRICE where TIMPRICEGROUPPRICEID in (Select TIMPRICEGROUPPRICEID from  mas500_tst_app.dbo.vdvMAS_to_SLX_timPriceGroupPrice_TAC_Deleted)

Delete from sysdba.TIMPRICESHEET where TIMPRICESHEETID in (Select TIMPRICESHEETID from    mas500_tst_app.dbo.vdvMAS_to_SLX_timPriceSheet_TAC_Deleted)

Delete from sysdba.TIMPRICING where TIMPRICINGID  in (Select TIMPRICINGID from  mas500_tst_app.dbo.vdvMAS_to_SLX_timPricing_TAC_Deleted)

Delete from sysdba.TIMPRODPRICEGROUP where TIMPRODPRICEGROUPID in (Select TIMPRODPRICEGROUPID from   mas500_tst_app.dbo.vdvMAS_to_SLX_timProdPriceGroup_TAC_Deleted)

Delete from sysdba.TIMPRODPRICEGROUPPRICE where TIMPRODPRICEGROUPPRICEID in (select TIMPRODPRICEGROUPPRICEID from  mas500_tst_app.dbo.vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_Deleted)