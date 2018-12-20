/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="ea481e10-b8ec-4571-8994-3b1c6e764970">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>cmdCopyOpportunity_OnClickStep</name>
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
    public static partial class OpportunityDetailsEventHandlers
    {
        public static void cmdCopyOpportunity_OnClickStep( IOpportunityDetails form,  EventArgs args)
        {
            var copyFromOpportunity = form.CurrentEntity as IOpportunity;	   
            var newOpportunity = EntityFactory.Create<IOpportunity>();
            if (copyFromOpportunity == null) return;
            var opportunityId = newOpportunity.CopyOpportunity(copyFromOpportunity);
            MySlx.MainView.Show<IOpportunity>(opportunityId);			
        }
    }
}