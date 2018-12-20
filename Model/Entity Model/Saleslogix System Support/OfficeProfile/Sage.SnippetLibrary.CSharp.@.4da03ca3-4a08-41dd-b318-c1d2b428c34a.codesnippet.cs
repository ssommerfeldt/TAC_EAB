/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="4da03ca3-4a08-41dd-b318-c1d2b428c34a">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>GetLocaleConfigStep</name>
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
		public static void GetLocaleConfigStep(IOfficeProfile officeprofile, String portalName, out String result)
		{
			string defaultHelpLanguage = System.Configuration.ConfigurationManager.AppSettings["DefaultHelpLanguage"];
			
			string key = officeprofile.Id.ToString() + "|" + portalName + "LocaleConfig";
			var factory = EntityFactory.GetRepository<ICustomSetting>();
			ICustomSetting setting = factory.FindFirstByProperty("Description", key);
			result = string.Empty;
			if (setting != null) {
				if (setting.DataValue != string.Empty) {
					//CSV list of culture 
					result = setting.DataValue;
				}
				else {
					result = defaultHelpLanguage;
				}
			}
			else {
				result = defaultHelpLanguage;
			}
		}
	}
}
