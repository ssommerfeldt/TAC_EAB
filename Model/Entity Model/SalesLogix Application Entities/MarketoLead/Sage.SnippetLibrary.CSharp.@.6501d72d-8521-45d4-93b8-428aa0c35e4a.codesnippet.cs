/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="6501d72d-8521-45d4-93b8-428aa0c35e4a">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>GetLastInterestingMomentStep</name>
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
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
    public static partial class MarketoLeadBusinessRules
    {
        public static void GetLastInterestingMomentStep( IMarketoLead marketolead, out Sage.Entity.Interfaces.IMarketoLeadActivity result)
        {
            // TODO: Complete business rule implementation
			if (marketolead == null)
			{
				result = null;
				return;
			}
			
			DateTime minDate = DateTime.MinValue;
			Sage.Entity.Interfaces.IMarketoLeadActivity lastActivity = null;
			
			foreach(var moment in marketolead.Activities)
			{
				if (moment.ActivityTypeId == 46 && moment.ActivityDate > minDate)
				{
					lastActivity = moment;
				}
			}

			result = lastActivity;
        }
    }
}