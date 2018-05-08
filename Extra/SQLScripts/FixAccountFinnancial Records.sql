SELECT     sysdba.ACCOUNT.ACCOUNTID, sysdba.ACCOUNT.CREATEUSER, sysdba.ACCOUNT.CREATEDATE, sysdba.ACCOUNT.MODIFYUSER, sysdba.ACCOUNT.MODIFYDATE, 
                      mas500_eab_app.dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC.CustID AS CUSTOMERID, 
                      mas500_eab_app.dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC.CompanyID AS COMPANYCODE
FROM         sysdba.ACCOUNT INNER JOIN
                      mas500_eab_app.dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC ON 
                      sysdba.ACCOUNT.MASCUSTKEY = mas500_eab_app.dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC.CustKey
WHERE     (sysdba.ACCOUNT.ACCOUNTID NOT IN
                          (SELECT     ACCOUNTID
                            FROM          sysdba.ACCOUNTFINANCIAL))

SELECT     ACCOUNTID, CREATEUSER, CREATEDATE, MODIFYUSER, MODIFYDATE, CustID as CUSTOMERID , CompanyID as COMPANYCODE
FROM         sysdba.ACCOUNTFINANCIAL

SELECT     sysdba.ACCOUNT.MASCUSTKEY, mas500_eab_app.dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC.CustKey, CustID,CompanyID 
FROM         sysdba.ACCOUNT INNER JOIN
                      mas500_eab_app.dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC ON 
                      sysdba.ACCOUNT.MASCUSTKEY = mas500_eab_app.dbo.vdvMAS_TO_SLX_ERPLinkCustomer_TAC.CustKey
                      Where ACCOUNTID = 'AEAB3A000MBO'