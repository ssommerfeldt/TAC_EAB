/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="629d230d-5e07-425f-b494-cf424afbd6fa">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>OnLoad1Step</name>
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
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
    public static partial class QuoteDetailsEventHandlers
    {
        public static void OnLoad1Step(IQuoteDetails form, EventArgs args)
        {
            var quote = form.CurrentEntity as IQuote;
            if (quote == null) return;
            form.lueAccount.IsReadOnly = !string.IsNullOrEmpty(quote.ErpExtId);
            var closed =quote.IsClosed();

            form.txtQuoteId.IsReadOnly = closed;
            form.lueAccount.IsReadOnly = closed;
            form.lueSalesOrder.IsReadOnly = closed;
            form.lueOpportunity.IsReadOnly = closed;
            form.txtComments.IsReadOnly = closed;
            form.pklStatus.IsReadOnly = closed;
            form.dtpQuoteDate.IsReadOnly = closed;
            form.dtpQuoteExpiration.IsReadOnly = closed;
			form.txtCustomerRFQ.IsReadOnly = closed;
            form.btnSave.Visible = !closed;
            form.btnReset.Visible = !closed;
            form.btnDelete.Visible = !closed;

        }
    }
}
