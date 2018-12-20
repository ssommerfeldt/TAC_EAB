Select * from sysdba.tacgridtemplate where gridname = 'ReturnOrderItems'

SELECT A1.TACUSERGRIDOPTIONSID, A1.ISVISIBLE, A1.CAPTION 
Select *
FROM sysdba.TACUSERGRIDOPTIONS A1 WHERE A1.TACGRIDTEMPLATEID IN (
	Select TACGRIDTEMPLATEID from sysdba.tacgridtemplate where gridname = 'SalesOrderItems'
) 
And FIELDNAME = 'UPC'

Update  sysdba.TACGRIDTEMPLATEFIELDS --TACUSERGRIDOPTIONS
Set CAPTION = 'List Price' 
Where TACGRIDTEMPLATEID IN (
	Select TACGRIDTEMPLATEID from sysdba.tacgridtemplate where gridname = 'ReturnOrderItems'
)
And FIELDNAME = 'PRICE'


Update  sysdba.TACGRIDTEMPLATEFIELDS --TACUSERGRIDOPTIONS
Set CAPTION = 'Orig Price' 
Where TACGRIDTEMPLATEID IN (
	Select TACGRIDTEMPLATEID from sysdba.tacgridtemplate where gridname = 'ReturnOrderItems'
)
And FIELDNAME = 'ORIGPRODUCTPRICE'


Update  sysdba.TACGRIDTEMPLATEFIELDS --TACUSERGRIDOPTIONS
Set CAPTION = 'Adj. Price' 
Where TACGRIDTEMPLATEID IN (
	Select TACGRIDTEMPLATEID from sysdba.tacgridtemplate where gridname = 'ReturnOrderItems'
)
And FIELDNAME = 'CALCULATEDPRICE'


Insert Into sysdba.TACUSERGRIDOPTIONS (TACUserGridOptionsID,TacGridTemplateID, ISVISIBLE, FIELDNAME, CAPTION, USERID) Values ('QEAB3A00STWG', 'QEAB3A0022UX', 'T', 'MAX_STOCKLEVEL', 'Max Stock Level', 'ADMIN')
Insert Into sysdba.TACUSERGRIDOPTIONS (TACUserGridOptionsID,TacGridTemplateID, ISVISIBLE, FIELDNAME, CAPTION, USERID) Values ('QEAB3A00STWH', 'QEAB3A0022UX', 'T', 'MAX_STOCKLEVEL', 'Max Stock Level', 'UEAB3A000006')
Insert Into sysdba.TACUSERGRIDOPTIONS (TACUserGridOptionsID,TacGridTemplateID, ISVISIBLE, FIELDNAME, CAPTION, USERID) Values ('QEAB3A00STWI', 'QEAB3A0022UX', 'T', 'MAX_STOCKLEVEL', 'Max Stock Level', 'UEAB3A00000I')
Insert Into sysdba.TACUSERGRIDOPTIONS (TACUserGridOptionsID,TacGridTemplateID, ISVISIBLE, FIELDNAME, CAPTION, USERID) Values ('QEAB3A00STWK', 'QEAB3A0022UX', 'T', 'MAX_STOCKLEVEL', 'Max Stock Level', 'UEAB3A00000Q')


