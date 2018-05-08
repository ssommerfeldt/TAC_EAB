SELECT     TranStatus, ShipKey AS Key1, UserFld1,UserFld2, TranStatusAsText, TranID 
FROM         vdvCustomerReturn WHERE     (UserFld1 IS NOT NULL) 
UNION 
SELECT     Status, SOKey, UserFld1,UserFld2,  CASE status WHEN '0' THEN 'Unacknoledged' WHEN '1' THEN 'Open' WHEN '2' THEN 'Inactive' WHEN '3' THEN 'Canceled' WHEN '4' THEN 'Closed' WHEN '5' THEN 'Incomplete' WHEN '6' THEN 'Pending Approval' END AS StatusTXT, 
TranID FROM tsoSalesOrder  
WHERE     (UserFld2 IS NOT NULL) AND (UserFld2 <> '')

Select * from SalesLogix_TEST.sysdba.PICKINGLIST 
Where PICKINGLISTID  = 'QEAB3A03D9QN' 

--Salesorder 

Update tsoSalesOrder 
set UserFld2= tmp.SALESORDERID
FROM         tsoSalesOrder INNER JOIN
                          (SELECT     SALESORDERID, ALTERNATEKEYPREFIX + '-' + ALTERNATEKEYSUFFIX AS SalesOrderNumber
                            FROM          SalesLogix_TEST.sysdba.SALESORDER) AS tmp ON tsoSalesOrder.UserFld1 = tmp.SalesOrderNumber
Where UserFld2 is null                           