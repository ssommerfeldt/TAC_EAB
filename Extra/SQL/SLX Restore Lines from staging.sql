	
	
	INSERT INTO [sysdba].[SALESORDERITEMS]
           ([SALESORDERITEMSID]
           ,[SALESORDERID]
           ,[CREATEUSER]
           ,[CREATEDATE]
           ,[MODIFYUSER]
           ,[MODIFYDATE]
           ,[PRODUCT]
           ,[PROGRAM]
           ,[PRICE]
           ,[QUANTITY]
           ,[DISCOUNT]
           ,[FAMILY]
           ,[OPPPRODUCTID]
           ,[PRODUCTID]
           ,[ACTUALID]
           ,[DESCRIPTION]
           ,[EXTENDEDPRICE]
           ,[UNIT]
           ,[CALCULATEDPRICE]
           ,[GLOBALSYNCID]
           ,[LINENUMBER]
           ,[LINETYPE]
           ,[SLXLOCATIONID]
           ,[UNITOFMEASUREID]
           ,[PRICEDETAILDESCRIPTION]
           ,[PRICEDETAILNOTES]
           ,[ITEMLOCKED]
           ,[TICK]
           ,[APPID]
           ,[COMMODITYTYPE]
           ,[CREATESOURCE]
           ,[UPC]
           ,[MAX_STOCKLEVEL]
           ,[ORIGPRODUCTPRICE]
           ,[ORIGPRODUCTDISCOUNT]
           ,[TACACCOUNTID]
           ,[TACSTOCKCARDITEMID]
           ,[LASTORDER]
           ,[LASTORDER2]
           ,[LASTORDER3]
           ,[PREVIOUSYEARSALESQTY]
           ,[CURRENTYEARSALESQTY]
           ,[ACCOUNTID]
           ,[MASSHIPPEDDATE]
           ,[MASQTYSHIPPED]
           ,[MASSCHDSHIPDATE])
    
    
           Select line.SALESORDERITEMID		As SALESORDERITEMSID
           , line.SALESORDERID				As SALESORDERID
           , line.CREATEUSER				As CREATEUSER
           , line.CREATEDATE				As CREATEDATE
           , line.MODIFYUSER				As MODIFYUSER
           , line.MODIFYDATE				As MODIFYDATE
           , p.NAME 						As PRODUCT
           , Null							As PROGRAM
           , p.PRICE 						As PRICE
           , line.QTYORD					As QUANTITY
           , sc.MARGIN 						As DISCOUNT
           , p.FAMILY 						As FAMILY
           , Null							As OPPPRODUCTID
           , p.PRODUCTID 					As PRODUCTID
           , line.ITEMID					As ACTUALID
           , line.[DESCRIPTION]				As [DESCRIPTION]
           , line.EXTAMT					As EXTENDEDPRICE
           , line.UNITMEASID				As UNIT
           , line.UNITPRICE					As CALCULATEDPRICE
           , Null							As GLOBALSYNCID
           , line.SOLINENO					As LINENUMBER
           , 'StandardLine'					As LINETYPE
           , Null							As SLXLOCATIONID
           , p.UNITOFMEASUREID 				As UNITOFMEASUREID
           , Null							As PRICEDETAILDESCRIPTION
           , Null							As PRICEDETAILNOTES
           , Null							As ITEMLOCKED
           , Null							As TICK
           , Null							As APPID
           , Null							As COMMODITYTYPE
           , Null							As CREATESOURCE
           , p.UPC  						As UPC
           , sc.MAX_STOCKLEVEL 				As MAX_STOCKLEVEL
           , sc.ORIGPRODUCTPRICE			As ORIGPRODUCTPRICE
           , sc.ORIGPRODUCTDISCOUNT			As ORIGPRODUCTDISCOUNT
           , so.ACCOUNTID 					As TACACCOUNTID
           , sc.STOCKCARDITEMSID 			As TACSTOCKCARDITEMID
           , sc.LASTORDER 					As LASTORDER
           , sc.LASTORDER2 					As LASTORDER2
           , sc.LASTORDER3 					As LASTORDER3
           , Null							As PREVIOUSYEARSALESQTY
           , Null 							As CURRENTYEARSALESQTY
           , so.ACCOUNTID 					As ACCOUNTID
           , Null							As MASSHIPPEDDATE
           , Null								As MASQTYSHIPPED
           , Null								As MASSCHDSHIPDATE
           
           From sysdba.STGSOLINE_TAC As line
           Inner Join sysdba.STGSALESORDER_TAC As header On header.STGSALESORDER_TACID = line.STGSALESORDER_TACID 
           Inner Join sysdba.SALESORDER As so On so.SALESORDERID = line.SALESORDERID  
           Inner Join sysdba.PRODUCT As p On p.ACTUALID = line.ITEMID And p.WAREHOUSEID = line.WAREHOUSEID
           Left Outer Join sysdba.STOCKCARDITEMS As sc On sc.ACCOUNTID = so.ACCOUNTID 
				And sc.COMPANYID = header.COMPANYID And sc.PRODUCTID = p.PRODUCTID 
            
           Where Line.STGSALESORDER_TACID = 'Q2JX6A300S80'--'QLD95A103VCI' 
           And line.SOLINENO Not In (Select LineNumber From sysdba.SALESORDERITEMS 
				Where SALESORDERID = header.SALESORDERID
				And LINENUMBER is not Null)
				
           --Where line.SALESORDERID = 'QHPM0A601E30'
           order by LINENUMBER 
           
           
          --Select linenumber From sysdba.SALESORDERITEMS Where SALESORDERID = 'Q2JX6A300S5T' And LINENUMBER is not Null
--Select * From sysdba.SALESORDERITEMS Where salesorderitemsid = 'Q2JX6A300S7M'

--remove records that did not get changes from remote.
----Select salesorderitemid, linenumber 
--Delete from sysdba.SALESORDERITEMS 
--from sysdba.SALESORDERITEMS As l
--Inner Join sysdba.STGSOLINE_TAC As Line On line.SALESORDERITEMID = l.SALESORDERITEMSID 
--Where  l.SALESORDERID = 'Q2JX6A300S5T'
--And LINENUMBER is null 
