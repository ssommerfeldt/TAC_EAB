Select COUNT(*),ItemKey  from TIMPRICESHEET
group by ItemKey having COUNT(*) > 1

select * from TIMPRICESHEET

SELECT     Source.COLUMN_NAME, Destincation.COLUMN_NAME AS Expr1, Source.DATA_TYPE, Destincation.DATA_TYPE AS Expr2, 
                      Source.NUMERIC_PRECISION, Destincation.NUMERIC_PRECISION AS Expr3, Destincation.NUMERIC_SCALE, Source.NUMERIC_SCALE AS Expr4
FROM         (SELECT     TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION, COLUMN_DEFAULT, IS_NULLABLE, DATA_TYPE, 
                                              CHARACTER_MAXIMUM_LENGTH, CHARACTER_OCTET_LENGTH, NUMERIC_PRECISION, NUMERIC_PRECISION_RADIX, NUMERIC_SCALE, 
                                              DATETIME_PRECISION, CHARACTER_SET_CATALOG, CHARACTER_SET_SCHEMA, CHARACTER_SET_NAME, COLLATION_CATALOG, 
                                              COLLATION_SCHEMA, COLLATION_NAME, DOMAIN_CATALOG, DOMAIN_SCHEMA, DOMAIN_NAME
                       FROM          INFORMATION_SCHEMA.COLUMNS
                       WHERE      (TABLE_NAME = 'TIMPRICESHEET')) AS Source INNER JOIN
                          (SELECT     TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION, COLUMN_DEFAULT, IS_NULLABLE, 
                                                   DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, CHARACTER_OCTET_LENGTH, NUMERIC_PRECISION, NUMERIC_PRECISION_RADIX, 
                                                   NUMERIC_SCALE, DATETIME_PRECISION, CHARACTER_SET_CATALOG, CHARACTER_SET_SCHEMA, CHARACTER_SET_NAME, 
                                                   COLLATION_CATALOG, COLLATION_SCHEMA, COLLATION_NAME, DOMAIN_CATALOG, DOMAIN_SCHEMA, DOMAIN_NAME
                            FROM          EAB_PRD.INFORMATION_SCHEMA.COLUMNS AS COLUMNS_1
                            WHERE      (TABLE_NAME = 'TIMPRICESHEET')) AS Destincation ON Source.COLUMN_NAME = Destincation.COLUMN_NAME
                            
--======================================================================================================================================================
-- TIMPriceSheet Changed Query
--======================================================================================================================================================                            
SELECT     Source.MYID, Source.WhseKey, Source.ItemKey, Source.EffectiveDate, Source.CurrID, Source.ListPrice, Source.Sheet1Price, Source.Sheet2Price, 
                      Source.Sheet3Price, Source.Sheet4Price, Source.UpdateCounter, DEST.TIMPRICESHEETID
FROM         (SELECT     CONVERT(varchar(255), CAST(WhseKey AS smallint)) + CONVERT(varchar(255), CAST(ItemKey AS int)) + CONVERT(char(8), CONVERT(date, 
                                              EffectiveDate), 112) + CurrID + CONVERT(varchar(255), CAST(ListPrice AS numeric(17, 4))) + CONVERT(varchar(255), 
                                              CAST(Sheet1Price AS numeric(17, 4))) + CONVERT(varchar(255), CAST(Sheet2Price AS numeric(17, 4))) + CONVERT(varchar(255), 
                                              CAST(Sheet3Price AS numeric(17, 4))) + CONVERT(varchar(255), CAST(Sheet4Price AS numeric(17, 4))) + CONVERT(varchar(255), 
                                              CAST(UpdateCounter AS smallint)) AS MYID, WhseKey, ItemKey, EffectiveDate, CurrID, ListPrice, Sheet1Price, Sheet2Price, Sheet3Price, 
                                              Sheet4Price, UpdateCounter
                       FROM          LiveEAB_app.dbo.timPriceSheet) AS Source INNER JOIN
                          (SELECT     CONVERT(varchar(255), CAST(WHSEKEY AS smallint)) + CONVERT(varchar(255), CAST(ITEMKEY AS int)) + CONVERT(char(8), 
                                                   CONVERT(date, EFFECTIVEDATE), 112) + CURRID + CONVERT(varchar(255), CAST(LISTPRICE AS numeric(17, 4))) + CONVERT(varchar(255),
                                                    CAST(SHEET1PRICE AS numeric(17, 4))) + CONVERT(varchar(255), CAST(SHEET2PRICE AS numeric(17, 4))) + CONVERT(varchar(255), 
                                                   CAST(SHEET3PRICE AS numeric(17, 4))) + CONVERT(varchar(255), CAST(SHEET4PRICE AS numeric(17, 4))) + CONVERT(varchar(255), 
                                                   CAST(UPDATECOUNTER AS smallint)) AS MYID, TIMPRICESHEETID, CREATEUSER, CREATEDATE, MODIFYUSER, MODIFYDATE, 
                                                   WHSEKEY, EFFECTIVEDATE, CURRID, LISTPRICE, SHEET1PRICE, SHEET2PRICE, SHEET3PRICE, SHEET4PRICE, UPDATECOUNTER, 
                                                   ITEMKEY
                            FROM          sysdba.TIMPRICESHEET AS TIMPRICESHEET_1) AS DEST ON Source.MYID <> DEST.MYID AND Source.ItemKey = DEST.ITEMKEY

truncate table sysdba.timpricesheet

update sysdba.timpricesheet set listprice = '0' where timpricesheetid = 'QDEMOA001DD7'