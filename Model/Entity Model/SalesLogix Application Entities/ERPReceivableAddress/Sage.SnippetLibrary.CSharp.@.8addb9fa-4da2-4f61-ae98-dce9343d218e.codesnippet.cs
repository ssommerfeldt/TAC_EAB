/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="8addb9fa-4da2-4f61-ae98-dce9343d218e">
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
    public static partial class ERPReceivableAddressBusinessRules
    {
		/// <summary>
        /// Formats the full address of this instance.
        /// </summary>
        /// <param name="erpReceivableAddress">The receivable address.</param>
        /// <param name="result">The result.</param>
        public static void GetFullAddress(IERPReceivableAddress erpReceivableAddress, out String result)
        {
            result = erpReceivableAddress.FormatFullReceivableAddress();
        }
    }
}