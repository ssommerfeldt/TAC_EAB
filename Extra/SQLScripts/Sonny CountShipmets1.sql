Select * from INFORMATION_SCHEMA.TABLES
where TABLE_NAME like '%shipline%'
and TABLE_TYPE = 'BASE TABLE'

Select * from tsoShipLine
Select * from tsoShipLineDist


SELECT     COUNT(*) AS Expr1, tsoShipLine.ItemKey
FROM         tsoShipLineDist INNER JOIN
                      tsoShipLine ON tsoShipLineDist.ShipLineKey = tsoShipLine.ShipLineKey INNER JOIN
                      tsoShipment ON tsoShipLine.ShipKey = tsoShipment.ShipKey
                      INNER JOIN tsoSOLine ON tsoSOLine.SOLineKey = tsoShipLine.SOLineKey
                      WHERE tsoSOLine.SOKey = 45917
GROUP BY tsoShipLine.ItemKey

SELECT     Sum(tsoShipLineDist.QtyShipped),tsoShipLine.ItemKey
FROM         tsoShipLineDist INNER JOIN
                      tsoShipLine ON tsoShipLineDist.ShipLineKey = tsoShipLine.ShipLineKey INNER JOIN
                      tsoShipment ON tsoShipLine.ShipKey = tsoShipment.ShipKey INNER JOIN
                      tsoSOLine ON tsoSOLine.SOLineKey = tsoShipLine.SOLineKey
WHERE     (tsoSOLine.SOKey = 45917) --AND (tsoShipLine.ItemKey = 14938)
GROUP BY tsoShipLine.ItemKey


SELECT * FROM tsoSalesOrder WHERE TranNo LIKE '%23270%'







SELECT     vdvShipmentLine.ItemKey, vdvShipmentLine.ShipDate, vdvShipmentLine.QtyShipped, vdvShipmentLine.SchdShipDate, tsoSalesOrder.TranID, 
                      tsoSalesOrder.UserFld1, tsoSalesOrder.UserFld2, tsoSalesOrder.UserFld3, tsoSalesOrder.UserFld4, CONVERT(decimal(16, 8), tmpTotalQTYShipped.TotalQTYShipped)
                       AS TotalQTYShipped, tmpQTYOrderd.StatusText, 
                       CASE StatusText 
							WHEN 'Open' THEN 
								ABS(tmpQTYOrderd.QtyOrd - CONVERT(decimal(16, 8), tmpTotalQTYShipped.TotalQTYShipped)) 
							WHEN 'Closed' THEN 0 
						END AS OpenQTY
FROM         vdvShipmentLine INNER JOIN
                      tsoSalesOrder ON vdvShipmentLine.SOKey = tsoSalesOrder.SOKey LEFT OUTER JOIN
                          (SELECT     TOP (100) PERCENT timItem.ItemID, timItem.ItemKey, tsoSOLine_1.SOKey, tsoSOLine_1.SOLineNo, tsoSOLineDist.QtyOrd, 
                                                   CASE tsoSOlinedist.Status WHEN 1 THEN 'Open' WHEN 2 THEN 'Closed' END AS StatusText
                            FROM          tsoSOLineDist INNER JOIN
                                                   tsoSOLine AS tsoSOLine_1 ON tsoSOLine_1.SOLineKey = tsoSOLineDist.SOLineKey INNER JOIN
                                                   timItem ON tsoSOLine_1.ItemKey = timItem.ItemKey
                            ORDER BY tsoSOLine_1.SOKey, tsoSOLine_1.SOLineNo) AS tmpQTYOrderd ON vdvShipmentLine.ItemKey = tmpQTYOrderd.ItemKey AND 
                      tsoSalesOrder.SOKey = tmpQTYOrderd.SOKey LEFT OUTER JOIN
                          (SELECT     SUM(tsoShipLineDist.QtyShipped) AS TotalQTYShipped, tsoShipLine.ItemKey, tsoSOLine.SOKey
                            FROM          tsoShipLineDist INNER JOIN
                                                   tsoShipLine ON tsoShipLineDist.ShipLineKey = tsoShipLine.ShipLineKey INNER JOIN
                                                   tsoShipment ON tsoShipLine.ShipKey = tsoShipment.ShipKey INNER JOIN
                                                   tsoSOLine ON tsoSOLine.SOLineKey = tsoShipLine.SOLineKey
                            GROUP BY tsoShipLine.ItemKey, tsoSOLine.SOKey) AS tmpTotalQTYShipped ON vdvShipmentLine.SOKey = tmpTotalQTYShipped.SOKey AND 
                      vdvShipmentLine.ItemKey = tmpTotalQTYShipped.ItemKey
WHERE     (vdvShipmentLine.UserFld1 IS NOT NULL)
UNION
SELECT     tsoShipLine.ItemKey, tsoShipment.PostDate, tsoShipLineDist.QtyShipped, tsoShipment.PostDate AS SchdShipDate, vdvCustomerReturn.TranID, 
                      vdvCustomerReturn.UserFld1, vdvCustomerReturn.UserFld2, vdvCustomerReturn.UserFld3, vdvCustomerReturn.UserFld4, CONVERT(decimal(16, 8), 
                      tsoShipLineDist.QtyShipped) AS TotalQTYShipped
FROM         vdvCustomerReturn INNER JOIN
                      tsoShipLine ON vdvCustomerReturn.ShipKey = tsoShipLine.ShipKey INNER JOIN
                      tsoShipLineDist ON tsoShipLine.ShipLineKey = tsoShipLineDist.ShipLineKey INNER JOIN
                      tsoShipment ON vdvCustomerReturn.ShipKey = tsoShipment.ShipKey
WHERE     (vdvCustomerReturn.TranID LIKE '%20366%')


SELECT      tsoShipLine.ItemKey, tsoSOLine.SOKey
FROM         tsoShipLineDist INNER JOIN
                      tsoShipLine ON tsoShipLineDist.ShipLineKey = tsoShipLine.ShipLineKey INNER JOIN
                      tsoShipment ON tsoShipLine.ShipKey = tsoShipment.ShipKey INNER JOIN
                      tsoSOLine ON tsoSOLine.SOLineKey = tsoShipLine.SOLineKey
                            GROUP BY tsoShipLine.ItemKey, tsoSOLine.SOKey
  
  
  
  
                            
SELECT     timItem.ItemID, timItem.ItemKey, tsoSOLine.SOKey, tsoSOLine.SOLineNo, tsoSOLineDist.QtyOrd, 
                      CASE tsoSOlinedist.Status WHEN 1 THEN 'Open' WHEN 2 THEN 'Closed' END AS StatusText
FROM         tsoSOLineDist INNER JOIN
                      tsoSOLine ON tsoSOLine.SOLineKey = tsoSOLineDist.SOLineKey INNER JOIN
                      timItem ON tsoSOLine.ItemKey = timItem.ItemKey
WHERE     (tsoSOLine.ItemKey = '42966') AND (tsoSOLine.SOKey = 28650)
	
--=======================================================
-- Strange there are cases where they have the same Item as different LineNumbers on the Same Order with different QTYOrdered.
		
							 
							 
							 SELECT     SUM(QtyOrd) AS TotalQTYOrdered,  timItem.ItemKey, tsoSOLine_1.SOKey,  CASE tsoSOlinedist.Status WHEN 1 THEN 'Open' WHEN 2 THEN 'Closed' END AS StatusText
FROM         tsoSOLineDist INNER JOIN
                      tsoSOLine AS tsoSOLine_1 ON tsoSOLine_1.SOLineKey = tsoSOLineDist.SOLineKey INNER JOIN
                      timItem ON tsoSOLine_1.ItemKey = timItem.ItemKey
GROUP BY  timItem.ItemKey, tsoSOLine_1.SOKey,  CASE tsoSOlinedist.Status WHEN 1 THEN 'Open' WHEN 2 THEN 'Closed' END 
HAVING      (COUNT(*) > 1)
							 
--							 SELECT      tsoShipLine.ItemKey, tsoSOLine.SOKey
--FROM         tsoShipLineDist INNER JOIN
--                      tsoShipLine ON tsoShipLineDist.ShipLineKey = tsoShipLine.ShipLineKey INNER JOIN
--                      tsoShipment ON tsoShipLine.ShipKey = tsoShipment.ShipKey INNER JOIN
--                      tsoSOLine ON tsoSOLine.SOLineKey = tsoShipLine.SOLineKey
                            
--                            tsoSOLineDist
                            
--                            GROUP BY tsoShipLine.ItemKey, tsoSOLine.SOKey

