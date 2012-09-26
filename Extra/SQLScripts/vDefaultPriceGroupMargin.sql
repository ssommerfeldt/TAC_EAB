USE [LiveEAB_SLX]
GO

/****** Object:  View [sysdba].[vDefaultPriceGroupMargin]    Script Date: 09/24/2012 22:22:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

Create view [sysdba].[vDefaultPriceGroupMargin]
as
SELECT     sysdba.TIMWAREHOUSE.WhseID, sysdba.TIMPRODPRICEGROUP.ProdPriceGroupID, 
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
                       END AS PriceMethod, sysdba.TIMPRICEBREAK.PctAdj
FROM         sysdba.TIMPRODPRICEGROUP INNER JOIN
                      sysdba.TIMPRODPRICEGROUPPRICE ON 
                      sysdba.TIMPRODPRICEGROUP.ProdPriceGroupKey = sysdba.TIMPRODPRICEGROUPPRICE.ProdPriceGroupKey INNER JOIN
                      sysdba.TIMPRICEBREAK INNER JOIN
                      sysdba.TIMPRICING ON sysdba.TIMPRICEBREAK.PricingKey = sysdba.TIMPRICING.PricingKey ON 
                      sysdba.TIMPRODPRICEGROUPPRICE.PricingKey = sysdba.TIMPRICING.PricingKey INNER JOIN
                      sysdba.TIMWAREHOUSE ON sysdba.TIMPRODPRICEGROUPPRICE.WhseKey = sysdba.TIMWAREHOUSE.WhseKey

GO


