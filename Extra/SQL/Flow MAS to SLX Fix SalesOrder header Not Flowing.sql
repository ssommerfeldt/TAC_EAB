--====================================================
-- Clean up SalesOrder Headr
--========================================================
delete from MAS_to_SLX_SalesOrderHEADER_TAC_temp Where
UserFld1 in (
Select userfld1 from (
SELECT        UserFld1, TranID,TranStatusAsText
FROM            MAS_to_SLX_SalesOrderHEADER_TAC_temp


except
Select ALTERNATEKEYPREFIX +'-'+ ALTERNATEKEYSUFFIX , MASNUMBER,MASSTATUS from sysdba.SALESORDER) as tmp)