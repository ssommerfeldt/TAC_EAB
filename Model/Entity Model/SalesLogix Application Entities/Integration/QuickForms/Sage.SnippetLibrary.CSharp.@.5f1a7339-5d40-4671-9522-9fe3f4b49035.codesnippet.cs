/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="5f1a7339-5d40-4671-9522-9fe3f4b49035">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>btnSave_OnClickActionStep</name>
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
    public static partial class IntegrationDetailEventHandlers
    {
        public static void btnSave_OnClickActionStep(IIntegrationDetail form, EventArgs args)
        {
            var integration = form.CurrentEntity as IIntegration;
            var passwordType = (integration.AuthorizationType == "Basic" && integration.LinkType == "Admin");
			if (integration !=null && passwordType)
			{
				integration.EncryptPassword(form.txtEmailPassword.Text);                
			}
			integration.Save();
        }
    }
}
