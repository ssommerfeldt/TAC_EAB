Select * from sysdba.PLUGIN where NAME like 'AA-%'

Update sysdba.Account 
Set AccountManagerID = 'UEAB3A00001B'
Where ACCOUNTID IN (
SELECT ADHOCGROUP.ENTITYID
FROM sysdba.PLUGIN 
INNER JOIN sysdba.ADHOCGROUP ON PLUGIN.PLUGINID = ADHOCGROUP.GROUPID
WHERE PLUGIN.NAME = 'AD-MikeMelin Realign')


select * from sysdba.USERINFO