/*
 * This metadata is used by the Sage platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="b7ad4e0f-2d6e-45ae-812d-756b9958f161">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>CalculateExtendedPriceStep</name>
 <references>
  <reference>
   <assemblyName>Sage.Entity.Interfaces.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\interfaces\bin\Sage.Entity.Interfaces.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.Form.Interfaces.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\formInterfaces\bin\Sage.Form.Interfaces.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.Platform.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\assemblies\Sage.Platform.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.SalesLogix.API.dll</assemblyName>
  </reference>
 </references>
</snippetHeader>
*/


#region Usings
using System;
using Sage.Entity.Interfaces;
using Sage.Form.Interfaces;
using Sage.SalesLogix.API;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
    public static partial class SalesOrderItemBusinessRules
    {
        public static void CalculateExtendedPriceStep( ISalesOrderItem salesOrderItem)
        {
			//Extended price = adjusted price * quantity
            decimal price = 0M;
    		decimal discount = salesOrderItem.Discount.HasValue ? Convert.ToDecimal(salesOrderItem.Discount.Value) : 0M;
    		price = (salesOrderItem.Price == 0.0) ? (salesOrderItem.CalculatedPrice.HasValue ? salesOrderItem.CalculatedPrice.Value : 0M) : (salesOrderItem.Price.HasValue ? ((decimal) salesOrderItem.Price.Value) : ((decimal) 0.0));
    		salesOrderItem.CalculatedPrice = new decimal?(Math.Round((decimal)(price - (price * discount)), 2, MidpointRounding.AwayFromZero));
			
			decimal num3 = salesOrderItem.CalculatedPrice.HasValue ? salesOrderItem.CalculatedPrice.Value : 0M;
    		decimal num4 = salesOrderItem.Quantity.HasValue ? Convert.ToDecimal(salesOrderItem.Quantity.Value) : 0M;
    		salesOrderItem.ExtendedPrice = new double?((double) (num3 * num4));

			
        }
    }
}