/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="ca905be9-013e-4e89-a37a-96c94b04a066">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>UpdateLocalConfigStep</name>
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
		public static void UpdateLocaleConfigStep(IOfficeProfile officeprofile, String portalName, String localeCSV)
		{

			string key = officeprofile.Id.ToString() + "|" + portalName + "LocaleConfig";
			MySlx.Data.RemoveFromCache(key);

			var factory = EntityFactory.GetRepository<ICustomSetting>();
			ICustomSetting setting = factory.FindFirstByProperty("Description", key);
			if (setting != null) {
				setting.DataValue = localeCSV;
			}
			else {
				setting = EntityFactory.Create<ICustomSetting>();
				setting.Description = key;
				setting.Category = "LocaleConfig";
				setting.DataValue = localeCSV;
				setting.DataType = "Other";
				setting.DataValidation = "Any Characters";
			}

			setting.Save();
		}
	}
}
