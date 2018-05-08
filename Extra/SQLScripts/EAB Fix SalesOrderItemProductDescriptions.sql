-- execute via SLX Admin
                      
Update sysdba.STOCKCARDITEMS 
SET PRODUCTDESCRIPTION = (Select Name from sysdba.PRODUCT PR where PR.PRODUCTID = STOCKCARDITEMS.PRODUCTID)                 
                      
                      

