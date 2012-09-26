USE [LiveEAB_SLX]
GO

/****** Object:  View [sysdba].[vNationalAccountMargin]    Script Date: 09/24/2012 22:21:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

Create View [sysdba].[vNationalAccountMargin]
as
SELECT     sysdba.TARCUSTOMER.CustID, sysdba.TIMPRODPRICEGROUP.ProdPriceGroupID, 
                      CASE WHEN sysdba.timPricing.PriceBase = 0 THEN 'List Price' 
							WHEN sysdba.timPricing.PriceBase = 1 THEN 'Price List 1' 
							WHEN sysdba.timPricing.PriceBase = 2 THEN 'Price List 2'
							WHEN sysdba.timPricing.PriceBase = 3 THEN 'Price List 3' 
							WHEN sysdba.timPricing.PriceBase = 4 THEN 'Price List 4' 
							WHEN sysdba.timPricing.PriceBase = 5 THEN 'CustomerPriceBase'
							WHEN sysdba.timPricing.PriceBase = 6 THEN 'Average Cost' 
							WHEN sysdba.timPricing.PriceBase = 7 THEN 'Standard Cost' 
						ELSE 'Replacement Cost' 
						END AS PricingBase,
                       CASE WHEN sysdba.timPricing.PriceMeth = 1 THEN 'Discount %' 
                       WHEN sysdba.timPricing.PriceMeth = 2 THEN 'Discount Amt' 
                       WHEN sysdba.timPricing.PriceMeth = 3 THEN 'Markup %'
                       WHEN sysdba.timPricing.PriceMeth = 4 THEN 'Markup Amt' 
                       ELSE 'Fixed Amt' 
                       END AS PriceMethod, 
                       sysdba.TIMPRICEBREAK.PctAdj, sysdba.TARCUSTOMER.CompanyID
FROM         sysdba.TARCUSTOMER INNER JOIN
                      sysdba.TARNATIONALACCTLEVEL ON 
                      sysdba.TARCUSTOMER.NationalAcctLevelKey = sysdba.TARNATIONALACCTLEVEL.NationalAcctLevelKey INNER JOIN
                      sysdba.TARNATIONALACCT ON sysdba.TARNATIONALACCTLEVEL.NationalAcctKey = sysdba.TARNATIONALACCT.NationalAcctKey INNER JOIN
                      sysdba.TIMNATACCTPRODGRPPRC ON sysdba.TARNATIONALACCT.NationalAcctKey = sysdba.TIMNATACCTPRODGRPPRC.NationalAcctKey INNER JOIN
                      sysdba.TIMPRODPRICEGROUP ON 
                      sysdba.TIMNATACCTPRODGRPPRC.ProdPriceGroupKey = sysdba.TIMPRODPRICEGROUP.ProdPriceGroupKey INNER JOIN
                      sysdba.TIMPRICING ON sysdba.TIMNATACCTPRODGRPPRC.PricingKey = sysdba.TIMPRICING.PricingKey INNER JOIN
                      sysdba.TIMPRICEBREAK ON sysdba.TIMNATACCTPRODGRPPRC.PricingKey = sysdba.TIMPRICEBREAK.PricingKey
WHERE     (sysdba.TIMNATACCTPRODGRPPRC.EffectiveDate >= { fn NOW() }) AND (sysdba.TIMNATACCTPRODGRPPRC.ExpirationDate <= { fn NOW() }) 
GO


