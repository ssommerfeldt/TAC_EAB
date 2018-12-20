/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="72744a7b-3d08-4db9-8356-7c0024b3bbbd">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>OnLoadPackage</name>
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
using Sage.Form.Interfaces;
using Sage.SalesLogix.API;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
	/// <summary>
    /// This is called on the load action of the package details form.
    /// </summary>
    public static partial class PackageDetailsEventHandlers
    {
		/// <summary>
    	/// Sets the forms toolbar buttons visibility based on the display mode of the package.
    	/// </summary>
    	/// <param name="form">The package details form.</param>
    	/// <param name="args">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public static void OnLoadPackageForm(IPackageDetails form, EventArgs args)
        {
	        var insertMode = MySlx.MainView.IsNewEntity();
	        form.btnDelete.Visible = !insertMode;
	        form.btnSave.Visible = !insertMode;
	        form.btnInsertSave.Visible = insertMode;
	        form.ctrlstCreateModProps.Visible = !insertMode;
        }
    }
}
