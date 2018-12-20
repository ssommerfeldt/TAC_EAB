/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="6ca31f10-e98e-4c8c-9b1e-1a9e02633d36">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>btnAddNewAccount_OnClickStep</name>
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
using Sage.Platform.WebPortal.Services;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
    public static partial class InsertQuoteEventHandlers
    {
        public static void btnAddNewAccount_OnClickStep( IInsertQuote form,  EventArgs args)
        {            
			var dialogService = form.Services.Get<IWebDialogService>();
            if (dialogService == null) return;
            dialogService.SetSpecs(20, 20, 300, 800, "QuickInsertAccountContact", "", true);
            dialogService.EntityType = typeof(IContact);
            dialogService.ShowDialog();
        }
    }
}