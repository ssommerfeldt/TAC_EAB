/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="34fc6dc2-19c4-4016-b79a-c4bf2fe5435c">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>btnCopy_OnClickStep</name>
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
    public static partial class SalesOrderDetailsEventHandlers
    {
        public static void btnCopy_OnClickStep( ISalesOrderDetails form,  EventArgs args)
        {
            var copyFromSalesOrder = form.CurrentEntity as ISalesOrder;	   
            var newSalesOrder = EntityFactory.Create<ISalesOrder>();
            if (copyFromSalesOrder == null) return;
            var salesOrderId = newSalesOrder.CopySalesOrder(copyFromSalesOrder);
            MySlx.MainView.Show<ISalesOrder>(salesOrderId);	
		}
    }
}