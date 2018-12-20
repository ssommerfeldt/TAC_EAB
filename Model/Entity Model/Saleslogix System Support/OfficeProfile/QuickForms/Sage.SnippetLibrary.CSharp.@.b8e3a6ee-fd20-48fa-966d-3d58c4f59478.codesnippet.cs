/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="b8e3a6ee-fd20-48fa-966d-3d58c4f59478">
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
    public static partial class HelpConfigurationEventHandlers
    {
        public static void OnLoad1Step( IHelpConfiguration form,  EventArgs args)
        {
            // TODO: Complete business rule implementation
			var options = form.CurrentEntity as Sage.Entity.Interfaces.IOfficeProfile;
			if (options != null) {
				string  clientUrl = options.GetPortalHelpUrl("webclient");
				string customerPortalUrl = options.GetPortalHelpUrl("customerportal");
				form.urlWebHelp.Text = clientUrl;
				form.urlWebHelp.IsReadOnly = !form.chkUseWebHelp.Checked;
				form.urlCustomerPortalHelp.Text = customerPortalUrl;
				form.urlCustomerPortalHelp.IsReadOnly = !form.chkUseCustomerPortalHelp.Checked;
				
				string clientLocaleConfig = options.GetLocaleConfig("webclient");
				string customerPortalLocaleConfig = options.GetLocaleConfig("customerportal");
				form.pklWebClientSupportedLang.PickListValue = clientLocaleConfig;				
				form.pklCustomerPortalSupportedLang.PickListValue = customerPortalLocaleConfig;
				
			}
			
        }
    }
}
