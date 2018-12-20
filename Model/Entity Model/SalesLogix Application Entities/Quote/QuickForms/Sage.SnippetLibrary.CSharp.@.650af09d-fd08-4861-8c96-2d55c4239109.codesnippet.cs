/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="a208a60c-1b62-4026-9b4e-8cdb57973919">
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
  <reference>
   <assemblyName>Sage.Platform.Application.dll</assemblyName>
  </reference>
  <reference>
   <assemblyName>Sage.SalesLogix.dll</assemblyName>
  </reference>
 </references>
</snippetHeader>
*/

#region Usings
using System;
using Sage.Entity.Interfaces;
using Sage.Form.Interfaces;
using Sage.Platform;
using Sage.Platform.Application;
using Sage.SalesLogix.SelectionService;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
    public static partial class InsertQuoteEventHandlers
    {
        public static void OnLoad1Step(IInsertQuote form, EventArgs args)
        {
            IQuote quote = form.CurrentEntity as IQuote;
            if (quote == null) return;
            var srv = ApplicationContext.Current.Services.Get<ISelectionService>();
            if (srv != null)
            {
                ISelectionContext sc = srv.GetSelectionContext("QuickInsertAccountContact");
                if (sc != null)
                {
                    var sels = sc.GetSelectedIds();
                    if (sels.Count > 0)
                    {
                        string newContactId = sels[0];
                        IContact newContact = EntityFactory.GetById<IContact>(newContactId);
                        IAccount newAccount = newContact.Account;
                        quote.Account = newAccount;
                        quote.AccountManager = newAccount.AccountManager;
                        quote.BillingContact = newContact;
                        quote.ShippingContact = newContact;
                        quote.BillToName = newContact.NameLF;
                        quote.ShipToName = newContact.NameLF;

                        if (quote.BillingAddress == null)
                        {
                            quote.BillingAddress = EntityFactory.Create<IQuoteAddress>();
                        }
                        quote.SetQuoteBillingAddress(newContact.Address);

                        if (quote.ShippingAddress == null)
                        {
                            quote.ShippingAddress = EntityFactory.Create<IQuoteAddress>();
                        }
                        quote.SetQuoteShippingAddress(newContact.Address);
                        srv.SetSelectionContext("QuickInsertAccountContact", null);
                    }
                }
            }
        }
    }
}
