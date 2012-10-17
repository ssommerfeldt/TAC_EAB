
  ---------------------------------------------------------------------------
  -- Split Name function
  ---------------------------------------------------------------------------  
 SELECT SUBSTRING(name, 1, NULLIF(CHARINDEX(' ', name) - 1, -1)) AS [FirstName],
 SUBSTRING(name, CHARINDEX(' ', name) + 1, LEN(name)) AS [LastName]
 FROM tciContact
 
 
 
 Select COLUMN_NAME +',' from INFORMATION_SCHEMA.COLUMNS
 where TABLE_NAME = 'vdvMAS_to_SLX_timPricing_TAC'
 and COLUMN_NAME like '%Contact%'  
 
 
 Select Balance  from vdvmas_to_slx_ErpLinkCustomer_TAC   
 
  .Fields("TYPE").Value = Row.ACCOUNT
 Select '.Fields("' + COLUMN_NAME  + '").Value = Row.' + COLUMN_NAME  from INFORMATION_SCHEMA.COLUMNS
 where TABLE_NAME =    'vdvMAS_to_SLX_ACCOUNT_TAC'
 
 
 
 