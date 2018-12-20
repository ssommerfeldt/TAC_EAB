/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="81526ce1-e9a1-49a6-b66e-eab86a49e14f">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>tbrSave_OnClickActionStep</name>
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
    public static partial class HelpConfigurationEventHandlers
    {
        public static void tbrSave_OnClickActionStep( IHelpConfiguration form,  EventArgs args)
        {
            // save the help configurations
			var profile = form.CurrentEntity as Sage.Entity.Interfaces.IOfficeProfile;
			profile.UpdatePortalHelpUrl("webclient", form.urlWebHelp.Text);
			profile.UpdatePortalHelpUrl("customerportal", form.urlCustomerPortalHelp.Text);
			profile.UpdateLocaleConfig("webclient", form.pklWebClientSupportedLang.PickListValue);
			profile.UpdateLocaleConfig("customerportal", form.pklCustomerPortalSupportedLang.PickListValue);
}
    }
}
