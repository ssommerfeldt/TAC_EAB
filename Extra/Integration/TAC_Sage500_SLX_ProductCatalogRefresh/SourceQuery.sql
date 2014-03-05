SELECT      vdvStockStatus.ShortDesc AS NAME, timItemDescription.LongDesc AS DESCRIPTION, 
                      vdvStockStatus.ItemID AS ACTUALID, timItemClass.ItemClassName AS FAMILY, timItem.StdPrice AS PRICE, tmpItemType.LocalText AS PRODUCTGROUP, 
                      CONVERT(varchar(255), tmpItemStatus.LocalText) AS STATUS, vdvStockStatus.UnitMeasID AS UNIT, NULL AS STOCKVOLUME, NULL AS STOCKWEIGHT, NULL 
                      AS STOCKITEM, NULL AS PROGRAM, NULL AS SUPPLIER, NULL AS VENDOR, NULL AS SITEID, NULL AS WAREHOUSELOCATION, NULL AS COMMISSIONABLE, NULL 
                      AS TAXABLE, NULL AS ACCOUNTINGPERIOD, tglAccount.GLAcctNo AS GLACCOUNTNUMBER, NULL AS GLSUBACCOUNTNUMBER, NULL AS DATAOWNER, NULL 
                      AS TYPE, NULL AS FIXEDCOST, NULL AS GLOBALSYNCID, NULL AS APPID, NULL AS TICK, NULL AS COMMODITYGROUPID, NULL AS ACTIVEFLAG, 
                      'T' AS SELLINGALLOWEDFLAG, vdvStockStatus.StockUnitMeasKey AS UNITOFMEASUREID, NULL AS SELLINGUOMID, NULL AS SELLINGUOMNUMBER, NULL 
                      AS CLASSIFICATION, NULL AS COMMODITYTYPE, vdvStockStatus.ItemKey AS MASITEMKEY, timItemUnitOfMeas.UPC, vdvStockStatus.ItemID AS MASITEMID, 
                      vdvStockStatus.WhseID AS WAREHOUSEID, vdvStockStatus.CompanyID, vdvStockStatus.QtyOnHand, vdvStockStatus.QtyAvailable, vdvStockStatus.SurplusQty, 
                      vdvStockStatus.QtyOnHold, vdvStockStatus.MaxStockLevel, timItem.ProdPriceGroupKey
FROM         tglAccount LEFT OUTER JOIN
                      timInventory ON tglAccount.GLAcctKey = timInventory.InvtAcctKey RIGHT OUTER JOIN
                      vdvStockStatus INNER JOIN
                      timItem ON vdvStockStatus.ItemKey = timItem.ItemKey ON timInventory.WhseKey = vdvStockStatus.WhseKey AND 
                      timInventory.ItemKey = vdvStockStatus.ItemKey LEFT OUTER JOIN
                      timItemUnitOfMeas ON timItem.SalesUnitMeasKey = timItemUnitOfMeas.TargetUnitMeasKey AND timItem.ItemKey = timItemUnitOfMeas.ItemKey LEFT OUTER JOIN
                          (SELECT     TableName, ColumnName, DBValue, IsDefault, IsHidden, StringNo, LocalText
                            FROM          vListValidationString AS vListValidationString_1
                            WHERE      (TableName = 'timItem') AND (ColumnName = 'Status')) AS tmpItemStatus ON timItem.Status = tmpItemStatus.DBValue LEFT OUTER JOIN
                          (SELECT     TableName, ColumnName, DBValue, IsDefault, IsHidden, StringNo, LocalText
                            FROM          vListValidationString
                            WHERE      (TableName = 'timItem') AND (ColumnName = 'ItemType')) AS tmpItemType ON timItem.ItemType = tmpItemType.DBValue LEFT OUTER JOIN
                      timItemClass ON timItem.ItemClassKey = timItemClass.ItemClassKey LEFT OUTER JOIN
                      timItemDescription ON vdvStockStatus.ItemKey = timItemDescription.ItemKey