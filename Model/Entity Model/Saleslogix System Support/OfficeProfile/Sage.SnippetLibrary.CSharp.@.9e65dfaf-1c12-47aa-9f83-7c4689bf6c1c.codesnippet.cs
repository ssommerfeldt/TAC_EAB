/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="9e65dfaf-1c12-47aa-9f83-7c4689bf6c1c">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>UpdateHelpUrlStep</name>
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
using Sage.Platform;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
    public static partial class OfficeProfileBusinessRules
    {
        public static void UpdatePortalHelpUrlStep(IOfficeProfile officeprofile, String portalName, String helpUrl)
        {

            string key = officeprofile.Id.ToString() + "|" + portalName + "HelpUrl";
            MySlx.Data.RemoveFromCache(key);


            var factory = EntityFactory.GetRepository<ICustomSetting>();
            ICustomSetting setting = factory.FindFirstByProperty("Description", key);
            if (setting != null)
            {
                setting.DataValue = helpUrl;
            }
            else
            {
                setting = EntityFactory.Create<ICustomSetting>();
                setting.Description = key;
                setting.Category = "HelpUrl";
                setting.DataValue = helpUrl;
                setting.DataType = "Other";
                setting.DataValidation = "Any Characters";
            }

            setting.Save();
        }
    }
}
