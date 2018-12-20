/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="5c9de628-c88e-4893-8c52-1a877f68a1e6">
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
  <reference>
   <assemblyName>Sage.Platform.WebPortal.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\assemblies\Sage.Platform.WebPortal.dll</hintPath>
  </reference>
 </references>
</snippetHeader>
*/


#region Usings
using System;
using Sage.Entity.Interfaces;
using Sage.Form.Interfaces;
using Sage.Platform.WebPortal.Services;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
	/// <summary>
    /// This is called on the click action of the Add New Account button control
	/// of the bill to Insert Sales Order form.
    /// </summary>
    public static partial class InsertSalesOrderEventHandlers
    {
		/// <summary>
    	/// Invokes the Quick Insert Account view.
    	/// </summary>
    	/// <param name="form">The Insert Sales Order form.</param>
    	/// <param name="args">The <see cref="System.EventArgs"/> instance containing the event data.</param>
		public static void btnAddNewAccount_OnClickStep(IInsertSalesOrder form, EventArgs args)
        {
            var dialogService = form.Services.Get<IWebDialogService>();
			if (dialogService != null)
            {
                dialogService.SetSpecs(20, 20, 300, 800, "QuickInsertAccountContact", "", true);
                dialogService.EntityType = typeof(IContact);
                dialogService.ShowDialog();
            }
        }
    }
}