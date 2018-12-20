Select * from sysdba.STGSALESORDER_TAC where MODIFYDATE >= GETDATE() - 1
Select * from sysdba.STGSOLINE_TAC where MODIFYDATE >= GETDATE() - 1
order by TRANNO, SOLINENO

--Update sysdba.STGSALESORDER_TAC Set TRANNO = 'X000000066' where tranno = '0' where MODIFYDATE >= GETDATE() - 1
--Update sysdba.STGSOLINE_TAC Set TRANNO = 0 where MODIFYDATE >= GETDATE() - 1