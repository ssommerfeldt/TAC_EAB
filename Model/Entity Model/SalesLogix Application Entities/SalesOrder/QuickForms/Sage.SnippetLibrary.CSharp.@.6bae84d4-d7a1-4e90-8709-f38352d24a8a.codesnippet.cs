/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="6bae84d4-d7a1-4e90-8709-f38352d24a8a">
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
  <reference>
   <assemblyName>Sage.Platform.Application.dll</assemblyName>
  </reference>
 </references>
</snippetHeader>
*/


#region Usings
using System;
using Sage.Entity.Interfaces;
using Sage.Form.Interfaces;
using Sage.Platform.Application;
using Sage.Platform.SData;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
	/// <summary>
	/// This method is invoked when the Sales Order Details view is loaded.
	/// </summary>
    public static partial class SalesOrderDetailsEventHandlers
    {
		/// <summary>
		/// Sets the visibility of controls based on the status of the Sales Order. 
		/// </summary>
		/// <param name="form">The Sales Order Details form.</param>
		/// <param name="args">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public static void OnLoad1Step(ISalesOrderDetails form, EventArgs args)
        {
            ISalesOrder salesOrder = form.CurrentEntity as ISalesOrder;
			if (salesOrder != null)
			{
                form.lueAccount.IsReadOnly = !string.IsNullOrEmpty(salesOrder.ErpExtId);
                var closed = salesOrder.IsClosed();

		        form.lueAccount.IsReadOnly = closed;
                form.lueOpportunity.IsReadOnly = closed;
                form.dtpOrderDate.IsReadOnly = closed;
                form.dtpPromisedDate.IsReadOnly = closed;
                form.txtCustPO.IsReadOnly = closed;
                form.pklOrderStatus.IsReadOnly = closed;
                form.dtpDueDate.IsReadOnly = closed;
                form.txtComments.IsReadOnly = closed;
                form.chkBackOrdered.IsReadOnly = closed;
				form.txtCustomerRFQ.IsReadOnly = closed;
		        form.btnSaveSalesOrder.Visible = !closed;
		        form.btnReset.Visible = !closed;
		        form.btnDelete.Visible = !closed;

			}
        }
    }
}
