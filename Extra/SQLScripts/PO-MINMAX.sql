

--MIN/MAX
SELECT DISTINCT			p.PRODUCTID, SCI.STOCKCARDITEMSID,
                       p.ACTUALID, p.NAME, 
                      p.WAREHOUSEID, 
                      CY.CYSales, 
                      LY.LYSales, 
                      ISNULL(LYFW.LYFWSales,0) as LYFWSales,
                      CONVERT  (VARCHAR(20), ROUND(((ISNULL(CY.CYSales, 0)/ LY.LYSales)-1)  * 100,0)) + '%' AS LYPercentChange,
 		
 					 CASE WHEN  ( ROUND(((ISNULL(CY.CYSales, 0)/ LY.LYSales)-1)  * 100,0)) > 20 THEN '120%'
						   WHEN ( ROUND(((ISNULL(CY.CYSales, 0)/ LY.LYSales)-1)  * 100,0)) < -5  THEN '95%'
						   ELSE CONVERT(VARCHAR(20), 100+( ROUND(((ISNULL(CY.CYSales, 0)/ LY.LYSales)-1)  * 100,0))) + '%'
 					END AS  LYFWAdjustment,
			 		tmpqtyOnhand.TotalQTYONHAND AS OnHand,
			 		dp.MOQ,
			 		SCI.MIN_STOCKLEVEL,
			 		SCI.MAX_STOCKLEVEL,
			 		--CASE WHEN MinStock > OnHand THEN MaxStock ELSE 0 as RecommendedOrder
			 		
 					(CASE WHEN SCI.MIN_STOCKLEVEL > tmpqtyOnhand.TotalQTYONHAND THEN SCI.MAX_STOCKLEVEL ELSE 0 END) as RecommendedOrder,
 					
 					(ROUND((CASE WHEN SCI.MIN_STOCKLEVEL > tmpqtyOnhand.TotalQTYONHAND THEN SCI.MIN_STOCKLEVEL ELSE 0 END)/dp.MOQ,0)*dp.MOQ) as OrderQuantity,
 					
 					dp.DISTRIBUTORPRICE AS DistCost
 					
			 	
FROM         sysdba.PRODUCT AS p 
						LEFT OUTER JOIN sysdba.TACDISTRIBUTORPRICING AS dp ON p.MASITEMKEY = dp.ITEMKEY 
						INNER JOIN sysdba.SALESORDERITEMS AS soi ON p.PRODUCTID = soi.PRODUCTID 
						INNER JOIN sysdba.SALESORDER AS SO ON SO.SALESORDERID = soi.SALESORDERID
						INNER JOIN
						(
							SELECT MAX(SCI.MIN_STOCKLEVEL) AS MIN_STOCKLEVEL, MAX(SCI.MAX_STOCKLEVEL) MAX_STOCKLEVEL, p.ACTUALID, SCI.STOCKCARDITEMSID
							FROM sysdba.PRODUCT AS p  INNER JOIN sysdba.STOCKCARDITEMS SCI ON p.PRODUCTID = SCI.PRODUCTID
							Where ACCOUNTID = 'AEAB3A0004YD'
							GROUP BY p.ACTUALID, SCI.STOCKCARDITEMSID
						) as SCI ON SCI.ACTUALID = p.ACTUALID
						INNER JOIN
                          (SELECT     SUM(s.QUANTITY) AS CYSales, PRODUCT_2.ACTUALID
                            FROM          sysdba.SALESORDERITEMS AS s INNER JOIN
                                                   sysdba.PRODUCT AS PRODUCT_2 ON s.PRODUCTID = PRODUCT_2.PRODUCTID INNER JOIN
                                                   sysdba.SALESORDER AS SO ON SO.SALESORDERID = s.SALESORDERID
                            WHERE      (s.MASSHIPPEDDATE > '20150901 00:00:00') AND (s.MASSHIPPEDDATE < '20151211 23:59:59') AND (PRODUCT_2.WAREHOUSEID IN ('DEL', 'ONT')) AND
                                                    (s.QUANTITY > 0)
                            GROUP BY PRODUCT_2.ACTUALID) AS CY ON p.ACTUALID = CY.ACTUALID LEFT OUTER JOIN
                          (SELECT     SUM(s.QUANTITY) AS CYBWSales, PRODUCT_2.ACTUALID
                            FROM          sysdba.SALESORDERITEMS AS s INNER JOIN
                                                   sysdba.PRODUCT AS PRODUCT_2 ON s.PRODUCTID = PRODUCT_2.PRODUCTID INNER JOIN
                                                   sysdba.SALESORDER AS SO ON SO.SALESORDERID = s.SALESORDERID
                            WHERE      (s.MASSHIPPEDDATE > '20150601 00:00:00') AND (s.MASSHIPPEDDATE < '20150911 23:59:59') AND (PRODUCT_2.WAREHOUSEID IN ('DEL', 'ONT')) AND
                                                    (s.QUANTITY > 0)
                            GROUP BY PRODUCT_2.ACTUALID) AS CYBW ON p.ACTUALID = CYBW.ACTUALID LEFT OUTER JOIN
                          (SELECT     SUM(s.QUANTITY) AS LYBWSales, PRODUCT_2.ACTUALID
                            FROM          sysdba.SALESORDERITEMS AS s INNER JOIN
                                                   sysdba.PRODUCT AS PRODUCT_2 ON s.PRODUCTID = PRODUCT_2.PRODUCTID INNER JOIN
                                                   sysdba.SALESORDER AS SO ON SO.SALESORDERID = s.SALESORDERID
                            WHERE      (s.MASSHIPPEDDATE > '20140602 00:00:00') AND (s.MASSHIPPEDDATE < '20140911 23:59:59') AND (PRODUCT_2.WAREHOUSEID IN ('DEL', 'ONT')) AND
                                                    (s.QUANTITY > 0)
                            GROUP BY PRODUCT_2.ACTUALID) AS LYBW ON p.ACTUALID = LYBW.ACTUALID LEFT OUTER JOIN
                          (SELECT     SUM(s.QUANTITY) AS LYFWSales, PRODUCT_3.ACTUALID
                            FROM          sysdba.SALESORDERITEMS AS s INNER JOIN
                                                   sysdba.PRODUCT AS PRODUCT_3 ON s.PRODUCTID = PRODUCT_3.PRODUCTID INNER JOIN
                                                   sysdba.SALESORDER AS SO ON SO.SALESORDERID = s.SALESORDERID
                            WHERE      (s.MASSHIPPEDDATE > '20141202 00:00:00') AND (s.MASSHIPPEDDATE < '20150311 23:59:59') AND (PRODUCT_3.WAREHOUSEID IN ('DEL', 'ONT')) AND
                                                    (s.QUANTITY > 0)
                            GROUP BY PRODUCT_3.ACTUALID) AS LYFW ON p.ACTUALID = LYFW.ACTUALID LEFT OUTER JOIN
                          (SELECT     s.ACTUALID, SUM(s.QUANTITY) AS LYSales
                            FROM          sysdba.SALESORDERITEMS AS s INNER JOIN
                                                   sysdba.PRODUCT ON s.ACTUALID = sysdba.PRODUCT.ACTUALID INNER JOIN
                                                   sysdba.SALESORDER AS SO ON SO.SALESORDERID = s.SALESORDERID
                            WHERE      (s.MASSHIPPEDDATE > '20140901 00:00:00') AND (s.MASSHIPPEDDATE < '20141211 23:59:59') AND (sysdba.PRODUCT.WAREHOUSEID IN ('DEL', 
                                                   'ONT')) AND (s.QUANTITY > 0)
                            GROUP BY s.ACTUALID) AS LY ON p.ACTUALID = LY.ACTUALID LEFT OUTER JOIN
                          (SELECT     SUM(QTYONHAND) AS TotalQTYONHAND, ACTUALID
                            FROM          sysdba.PRODUCT AS PRODUCT_1
                            WHERE      (WAREHOUSEID IN ('DEL', 'ONT'))
                            GROUP BY ACTUALID) AS tmpqtyOnhand ON p.ACTUALID = tmpqtyOnhand.ACTUALID
WHERE     (p.WAREHOUSEID IN ( 'ONT')) AND (soi.MASSHIPPEDDATE > '20150901 00:00:00') AND (soi.MASSHIPPEDDATE < '20151211 23:59:59')