/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="db980b6a-4754-4b0f-8a52-7716d51410a4">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>btnCopy_OnClickStep</name>
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
using Sage.Platform;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
    public static partial class QuoteDetailsEventHandlers
    {
        public static void btnCopy_OnClickStep( IQuoteDetails form,  EventArgs args)
        {		
			 var copyFromQuote = form.CurrentEntity as IQuote;	   
            var newQuote = EntityFactory.Create<IQuote>();
            if (copyFromQuote == null) return;
            var quoteId = copyFromQuote.CopyQuote(newQuote);
            MySlx.MainView.Show<IQuote>(quoteId);				
        }
    }
}
