SELECT     sysdba.ACCOUNT.ACCOUNT, NATIONALACCOUNT.ACCOUNT AS NationalAccount, sysdba.ADDRESS.TYPE, sysdba.ADDRESS.DESCRIPTION, 
                      sysdba.ADDRESS.ADDRESS1, sysdba.ADDRESS.ADDRESS2, sysdba.ADDRESS.CITY, sysdba.ADDRESS.STATE, sysdba.ADDRESS.POSTALCODE, 
                      sysdba.ADDRESS.COUNTRY, sysdba.TARCUSTOMER.CompanyID
FROM         sysdba.ACCOUNT INNER JOIN
                      sysdba.ACCOUNTFINANCIAL ON sysdba.ACCOUNT.MASNATIONALACCTID = sysdba.ACCOUNTFINANCIAL.CUSTOMERID INNER JOIN
                      sysdba.ACCOUNT AS NATIONALACCOUNT ON sysdba.ACCOUNTFINANCIAL.ACCOUNTID = NATIONALACCOUNT.ACCOUNTID INNER JOIN
                      sysdba.ADDRESS ON NATIONALACCOUNT.ADDRESSID = sysdba.ADDRESS.ADDRESSID INNER JOIN
                      sysdba.TARCUSTOMER ON sysdba.ACCOUNT.MASCUSTKEY = sysdba.TARCUSTOMER.CustKey AND 
                      sysdba.ACCOUNTFINANCIAL.COMPANYCODE = sysdba.TARCUSTOMER.CompanyID CROSS JOIN
                      sysdba.TARCUSTOMER AS TARCUSTOMER_1
                      
                      Select * from sysdba.ACCOUNT where MASNATIONALACCTID is not null
                      
                      
                      SELECT     COUNT(*) AS Expr1, CUSTOMERID
FROM         sysdba.ACCOUNTFINANCIAL
GROUP BY CUSTOMERID
having COUNT(*) >1

--delete from sysdba.ACCOUNTFINANCIAL where ACCOUNTID not in (Select ACCOUNTID from sysdba.ACCOUNT )

Select * from sysdba.ACCOUNTFINANCIAL where CUSTOMERID = '1917LU'

SELECT     sysdba.ACCOUNT.ACCOUNTID, sysdba.TARCUSTOMER.CompanyID, sysdba.ACCOUNTFINANCIAL.ACCOUNTID AS Expr1, sysdba.ACCOUNT.ACCOUNT, 
                      NationalAccount.ACCOUNT AS NationalAccount, sysdba.ACCOUNT.MASNATIONALACCTID, sysdba.ACCOUNTFINANCIAL.COMPANYCODE, 
                      sysdba.ACCOUNTFINANCIAL.CUSTOMERID
FROM         sysdba.ACCOUNT INNER JOIN
                      sysdba.TARCUSTOMER ON sysdba.ACCOUNT.MASCUSTKEY = sysdba.TARCUSTOMER.CustKey INNER JOIN
                      sysdba.ACCOUNTFINANCIAL ON sysdba.ACCOUNT.MASNATIONALACCTID = sysdba.ACCOUNTFINANCIAL.CUSTOMERID AND 
                      sysdba.TARCUSTOMER.CompanyID = sysdba.ACCOUNTFINANCIAL.COMPANYCODE INNER JOIN
                      sysdba.ACCOUNT AS NationalAccount ON sysdba.ACCOUNTFINANCIAL.ACCOUNTID = NationalAccount.ACCOUNTID
                      
                      Select * from sysdba.ACCOUNT 
