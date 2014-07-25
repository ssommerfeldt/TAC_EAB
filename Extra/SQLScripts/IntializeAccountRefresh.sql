----------------------------------------
-- Initialize 
--=======================================
Delete from sysdba.ADDRESS where ENTITYID in (Select Accountid from sysdba.ACCOUNT )
Truncate Table sysdba.Account
Truncate Table sysdba.AccountSummary
Truncate Table sysdba.ERPTradingAccount
Truncate Table sysdba.AccountFinancial

Delete from sysdba.ADDRESS where ENTITYID in (Select CONTACTID from sysdba.CONTACT )
Truncate Table sysdba.CONTACT



