/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="c1988fb9-94dd-4510-b0b8-7d427d5c9bed">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>GetFullAddress</name>
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
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
    public static partial class ERPInvoiceAddressBusinessRules
    {
		/// <summary>
        /// Formats the full address of this instance.
        /// </summary>
        /// <param name="erpInvoiceAddress">The invoice address.</param>
        /// <param name="result">The result.</param>
        public static void GetFullAddress(IERPInvoiceAddress erpInvoiceAddress, out String result)
        {
            result = erpInvoiceAddress.FormatFullInvoiceAddress();
        }
    }
}