--ListPrice = Round(CDbl(dgSalesOrderItems.GetFieldValue(SalesOrderItemsId, "PRICE")), 2)
--            Discount = Value'CDbl(dgSalesOrderItems.GetFieldValue(SalesOrderItemsId, "DISCOUNT"))
--            Quantity = CDbl(dgSalesOrderItems.GetFieldValue(SalesOrderItemsId, "QUANTITY"))

--            OrigPrice = Round(CDbl(dgSalesOrderItems.GetFieldValue(SalesOrderItemsId, "ORIGPRODUCTPRICE")), 2)
--            OrigMargin = Round(CDbl(dgSalesOrderItems.GetFieldValue(SalesOrderItemsId, "ORIGPRODUCTDISCOUNT")), 2)

--            OrigAdjPrice = OrigPrice - (Round(OrigPrice * OrigMargin, 2))
--            Price = OrigAdjPrice - (ListPrice - (Round(ListPrice * Discount, 2)))
            
            
SELECT A1.STOCKCARDITEMSID, A2.ACTUALID A2_ACTUALID, A1.PRODUCTDESCRIPTION
, A1.LISTPRICE, A1.MARGIN, A1.DEALERPRICE, A1.DISTRIBUTORMARGIN, A1.DISTRIBUTORPRICE
, A1.CATEGORYNAME, A1.CalculatedPrice, A1.MAX_STOCKLEVEL, A1.LASTORDER, A1.LASTORDER2
, A1.LASTORDER3, A2.PRODUCTID A2_PRODUCTID

, Round((ORIGPRODUCTPRICE - (ORIGPRODUCTPRICE * ORIGPRODUCTDISCOUNT)) - (LISTPRICE - (LISTPRICE * MARGIN)), 2)

 FROM sysdba.STOCKCARDITEMS A1
 LEFT OUTER JOIN sysdba.PRODUCT A2 ON (A1.PRODUCTID=A2.PRODUCTID)
 WHERE A1.ACCOUNTID = 'AEAB3A0004ZD'
 
 
 --Select * FROM sysdba.STOCKCARDITEMS A1
 --LEFT OUTER JOIN sysdba.PRODUCT A2 ON (A1.PRODUCTID=A2.PRODUCTID)
 --WHERE A1.ACCOUNTID = 'AEAB3A0004ZD'