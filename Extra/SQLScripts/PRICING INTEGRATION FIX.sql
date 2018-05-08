--==========================================================
-- Step 1 CleanOut the Price Sheet through the SLX Provider
--==========================================================
Delete from sysdba.TIMPRICESHEET 

--===========================================================
-- Step 2 Clean out Temp table to reque all changes to flow
--===========================================================
truncate table dbo.MAS_to_SLX_timPriceSheet_temp

--=============================================================
-- Run the Pricing Integration
--==============================================================



