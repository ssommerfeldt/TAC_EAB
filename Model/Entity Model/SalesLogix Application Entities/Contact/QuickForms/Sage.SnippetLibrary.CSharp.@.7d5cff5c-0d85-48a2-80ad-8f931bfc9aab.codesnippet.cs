/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="7d5cff5c-0d85-48a2-80ad-8f931bfc9aab">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>QFButton_OnClickStep</name>
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
using Sage.Platform;
using Sage.Platform.Application;
using Sage.Platform.WebPortal.Services;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.API;
using Sage.SalesLogix.SelectionService;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
    public static partial class InsertAccountContactEventHandlers
    {
        public static void QFButton_OnClickStep( IInsertAccountContact form,  EventArgs args)
        {
			IUser currentUser = MySlx.Security.CurrentSalesLogixUser;
			IContact contact = form.CurrentEntity as IContact;
			var account = form.lueAccount.LookupResultValue as IAccount;

			IAddress ad = EntityFactory.Create<IAddress>();
			ad.Description = contact.Address.Description;
			ad.Address1 = contact.Address.Address1;
			ad.Address2 = contact.Address.Address2;
			ad.Address3 = contact.Address.Address3;
			ad.Address4 = contact.Address.Address4;
			ad.City = contact.Address.City;
			ad.State = contact.Address.State;
			ad.PostalCode = contact.Address.PostalCode;
			ad.Country = contact.Address.Country;
			ad.County = contact.Address.County;
			ad.Salutation = contact.Address.Salutation;
			
			contact.Account = account;
			contact.AccountManager = currentUser;
			contact.Owner = currentUser.DefaultOwner;
			contact.SaveContactAccount(account);
			
			var _parent = form.WorkItem.Services.Get<IEntityContextService>().GetEntity();

			if (_parent is IERPBillTo)
			{
				var billToContact = EntityFactory.Create<IERPBillToContact>();
				billToContact.Contact = contact;
				billToContact.ERPBillTo = (IERPBillTo)_parent;
				billToContact.Save();
			}
			else if (_parent is IERPShipTo)
			{
				var shipToContact = EntityFactory.Create<IERPShipToContact>();
				shipToContact.Contact = contact;
				shipToContact.ERPShipTo = (IERPShipTo)_parent;
				shipToContact.Save();
			}
			else if (_parent is IERPPayFrom)
			{
				var payFromContact = EntityFactory.Create<IERPPayFromContact>();
				payFromContact.Contact = contact;
				payFromContact.ERPPayFrom = (IERPPayFrom)_parent;
				payFromContact.Save();
			}
			
			ISelectionService srv = ApplicationContext.Current.Services.Get<ISelectionService>(true);
			ISelectionContext sc = new SimpleSelectionContext();
			SelectionInfo selInfo = new SelectionInfo();
			SelectionItem item = new SelectionItem {Id = contact.Id.ToString()};
			selInfo.Selections.Add(item);
			sc.Key = "InsertAccountContact";
			sc.SelectionInfo = selInfo;
			srv.SetSelectionContext(sc.Key, sc);

			IPanelRefreshService refresher = form.Services.Get<IPanelRefreshService>();
			if (refresher != null)
			{
				refresher.RefreshTabWorkspace();
			}
		}
    }
}
