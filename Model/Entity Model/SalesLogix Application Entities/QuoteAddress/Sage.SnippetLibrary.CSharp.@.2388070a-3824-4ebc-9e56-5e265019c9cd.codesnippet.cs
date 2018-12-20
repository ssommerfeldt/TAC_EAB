/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="2388070a-3824-4ebc-9e56-5e265019c9cd">
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
using Sage.Form.Interfaces;
using Sage.SalesLogix.API;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
	/// <summary>
    /// This is called on the load of the quote address entity
    /// </summary>
    public static partial class QuoteAddressBusinessRules
    {
		/// <summary>
        /// Formats the full address of this instance.
        /// </summary>
        /// <param name="quoteAddress">The quote address.</param>
        /// <param name="result">The result.</param>
        public static void GetFullAddress(IQuoteAddress quoteAddress, out System.String result)
        {
			result = quoteAddress.FormatFullQuoteAddress();
        }
    }
}