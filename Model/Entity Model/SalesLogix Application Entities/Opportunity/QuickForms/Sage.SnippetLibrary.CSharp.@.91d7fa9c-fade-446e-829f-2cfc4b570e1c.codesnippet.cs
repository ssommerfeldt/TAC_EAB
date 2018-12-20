/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="91d7fa9c-fade-446e-829f-2cfc4b570e1c">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>OnLoad1Step</name>
 <references>
  <reference>
   <assemblyName>Sage.Form.Interfaces.dll</assemblyName>
   <hintPath>C:\Users\webdll\AppData\Roaming\Sage\Platform\Output\formInterfaces\bin\Sage.Form.Interfaces.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.Platform.dll</assemblyName>
   <hintPath>C:\Users\webdll\AppData\Roaming\Sage\Platform\Output\assemblies\Sage.Platform.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.Platform.AdminModule.dll</assemblyName>
   <hintPath>C:\Users\webdll\AppData\Roaming\Sage\Platform\Output\assemblies\Sage.Platform.AdminModule.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.SalesLogix.API.dll</assemblyName>
   <hintPath>C:\Users\webdll\AppData\Roaming\Sage\Platform\Output\assemblies\Sage.SalesLogix.API.dll</hintPath>
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
    public static partial class OpportunityDetailsEventHandlers
    {
        public static void OnLoad1Step( IOpportunityDetails form,  EventArgs args)
        {
            // TODO: Complete business rule implementation
			IOpportunity opportunity = form.CurrentEntity as IOpportunity;
			if (opportunity != null)
			{
				var closed = opportunity.IsClosed();
				form.lueAccount.IsReadOnly = closed;
                form.usrUser.IsReadOnly = closed;
				form.lueReseller.IsReadOnly = closed;
                form.dtpEstimatedClose.IsReadOnly = closed;
                form.pklCloseProbability.IsReadOnly = closed;
                form.pklStatus.IsReadOnly = closed;
                //form.ActualAmount.IsReadOnly = closed;
                form.txtComments.IsReadOnly = closed;
                form.txtDescription.IsReadOnly = closed;
				form.chkAddToForecast.IsReadOnly = closed;
				form.cmdSave.Visible = !closed;
		        form.cmdReset.Visible = !closed;
		        form.cmdDelete.Visible = !closed;
		    }
        }
    }
}