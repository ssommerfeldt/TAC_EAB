/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="eb37355a-bbc5-4a0e-8f4e-9621ebe9550e">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>GetPortalHelpUrlStep</name>
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
   <assemblyName>System.Configuration.dll</assemblyName>
  </reference>
 </references>
</snippetHeader>
*/


#region Usings
using System;
using System.Configuration;
using Sage.Entity.Interfaces;
using Sage.Form.Interfaces;
using Sage.SalesLogix.API;
using Sage.Platform;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
    public static partial class OfficeProfileBusinessRules
    {
        public static void GetPortalHelpUrlStep( IOfficeProfile officeprofile,  String portalName, out String result)
        {
            string key = officeprofile.Id.ToString() + "|" + portalName + "HelpUrl";
            var factory = EntityFactory.GetRepository<ICustomSetting>();
            ICustomSetting setting = factory.FindFirstByProperty("Description", key);
            result = string.Empty;
            if (setting != null)
            {
			    if (setting.DataValue != string.Empty)
				{	
	               result = setting.DataValue;
				}
				else
				{
					result = System.Configuration.ConfigurationManager.AppSettings["DefaultHelpDomainUrl"];
				}
            }
			else 
			{
				result = System.Configuration.ConfigurationManager.AppSettings["DefaultHelpDomainUrl"];
			}
        }
    }
}
