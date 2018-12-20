select * from sysdba.salesorder where SALESORDERID = 'QEAB3A02DNCW' -- ALTERNATEKEYSUFFIX = ''
select * from sysdba.salesorder where ALTERNATEKEYSUFFIX = '031209'
select * from sysdba.salesorder_History where SALESORDERID =  'QHPM0A503UV5' --ALTERNATEKEYSUFFIX = '179969'
select * from sysdba.salesorderitems_History where SALESORDERID =  'QHPM0A503UV5' and QUANTITY <> 0

select * from sysdba.salesorder where SALESORDERID =  'QHPM0A503UV5' --ALTERNATEKEYSUFFIX = '179969'
select * from sysdba.salesorderitems where SALESORDERID =  'QHPM0A503UV5' and QUANTITY <> 0

Select * from sysdba.STGSALESORDER_TAC where USERFLD1 = '249-05-179969'
Select * from sysdba.STGSOLINE_TAC where SALESORDERID =  'QHPM0A503UV5'

select * from sysdba.salesorder where ORDERTYPE = 'Trade Return' 
--Update sysdba.SALESORDER Set ORDERTYPE = 'Return Order' where ORDERTYPE = 'Trade Return' 

--Update sysdba.SALESORDER set TRANSMITDATE = '2015-02-13 22:03:17.000' where SALESORDERID =  'QHPM0A503UV5'
--Update sysdba.salesorderitems set MASSHIPPEDDATE = '2015-02-15 21:28:42.000' where SALESORDERID =  'QHPM0A503UV5'


Select * from sysdba.STGSALESORDER_TAC where USERFLD1 = '249-05-179969'
Select * from sysdba.ACCOUNT where ACCOUNTID = 'AEAB3A00070G'
Select * from sysdba.ACCOUNTFINANCIAL where CUSTOMERID = 'HH1710-4'
Select * from sysdba.CONTACT where ACCOUNTID = 'AEAB3A00070G'
Select * from sysdba.PRODUCT where PRODUCTID = 'YEAB3A00343S'
Select * from sysdba.STOCKCARDITEMS where PRODUCTID = 'YEAB3A0036LK'
Select * from sysdba.USERINFO where USERID = 'UEAB3A00000B'
----------------------------------------------------------------------
--SLX Staging
Select * from sysdba.STGSALESORDER_TAC where USERFLD1 = '221-01-020952'
Select * from sysdba.STGSOLINE_TAC where SALESORDERID =  'Q2JX6A100G60'
--MAS Staging
Select * from Apollo.Mas500_eab_app.dbo.STGSALESORDER_TAC where USERFLD1 = '221-01-020952'
Select * from Apollo.Mas500_eab_app.dbo.STGSOLINE_TAC where SALESORDERID =  'Q2JX6A100G60'
--SLX Order History
select * from sysdba.salesorder_History where SALESORDERID =  'Q2JX6A100G60'
select * from sysdba.salesorderitems_History where SALESORDERID =  'Q2JX6A100G60' and QUANTITY <> 0
--SLX Order
select * from sysdba.salesorder where SALESORDERID =  'Q2JX6A100G60'
select * from sysdba.salesorderitems where SALESORDERID =  'Q2JX6A100G60' and QUANTITY <> 0