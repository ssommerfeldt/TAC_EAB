/*
 * This metadata is used by the Sage platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="4c64143f-693e-4c67-a8e4-f0dafe1d9af6">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>CalculatePriceChangeStep</name>
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
        public static void CalculatePriceChangeStep( ISalesOrderItem salesOrderItem)
        {
            decimal num = 0M;
    		decimal num2 = salesOrderItem.Discount.HasValue ? Convert.ToDecimal(salesOrderItem.Discount.Value) : 0M;
    		num = (salesOrderItem.Price == 0.0) ? (salesOrderItem.CalculatedPrice.HasValue ? salesOrderItem.CalculatedPrice.Value : 0M) : (salesOrderItem.Price.HasValue ? ((decimal) salesOrderItem.Price.Value) : ((decimal) 0.0));
    		salesOrderItem.CalculatedPrice = new decimal?(num - (num * num2));

    		salesOrderItem.CalculateExtendedPrice();

        }
    }
}
