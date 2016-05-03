-- Delete from sysdba.TACDISTRIBUTORPRICING  IN Administrator ensure to Sync out to Remotes

-- From MAS Import This table using SSIS  Using the SLX Provider
Select  ITEMKEY, ITEMID, CURRENCYID, COMPANYID, 
                      DISTRIBUTORPRICE, itemMOQ as MOQ from EAB_DistPriceList 