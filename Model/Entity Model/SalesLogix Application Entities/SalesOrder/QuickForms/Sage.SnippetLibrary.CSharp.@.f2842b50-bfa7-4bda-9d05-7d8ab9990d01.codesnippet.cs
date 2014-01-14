/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="f2842b50-bfa7-4bda-9d05-7d8ab9990d01">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>OnLoad1Step</name>
 <references>
  <reference>
   <assemblyName>Sage.Form.Interfaces.dll</assemblyName>
   <hintPath>C:\Users\pgarratt\AppData\Roaming\Sage\Platform\Output\formInterfaces\bin\Sage.Form.Interfaces.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.Platform.dll</assemblyName>
   <hintPath>C:\Users\pgarratt\AppData\Roaming\Sage\Platform\Output\assemblies\Sage.Platform.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.Platform.AdminModule.dll</assemblyName>
   <hintPath>C:\Users\pgarratt\AppData\Roaming\Sage\Platform\Output\assemblies\Sage.Platform.AdminModule.dll</hintPath>
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
    public static partial class SalesOrderProductsEventHandlers
    {
        public static void OnLoad1Step( ISalesOrderProducts form,  EventArgs args)
        {
            //Add Dynamic Grid filters
			//Modified 2014-1-8 PG
        	//On load of the page query the products and add a filter checkbox for each distinct family
        
			//Add hidden Field
        	//HiddenField hid = new HiddenField();
        	//hid.ID = "hidCheckedFilters";
        	//hid.ClientIDMode = System.Web.UI.ClientIDMode.Static;
        	//QFControlsList.Controls.Add(hid);
		
        	//Add filter title
        	Label lbl = new Label();
        	lbl.Text = "Filters: ";
        	lbl.ID = "lblFilter";
        	form.QFControlsList.Controls.Add(lbl);
        
        	Sage.Entity.Interfaces.ISalesOrder salesOrder = this.BindingSource.Current as Sage.Entity.Interfaces.ISalesOrder;
        	if (salesOrder != null) {
            	var families = (from i in salesOrder.SalesOrderItems
                            select i.Family).Distinct();

            	int j = 0;
            	foreach (string f in families) {               
                
                	//create a checkbox               
                	SLXCheckBox chk = new SLXCheckBox();                
                	chk.ID = "chkFamily" + j;
                	chk.Checked = false;
                	chk.Text = f;                
                	chk.CssClass = "slxlabel alignleft checkboxRight";
                	chk.AutoPostBack = true;
                	chk.CheckedChanged += new EventHandler(CheckBox_CheckedChanged);               
                	form.QFControlsList.Controls.Add(chk);               
                	j++;                
            	}
            	//fill the hidden field with default values
            	UpdateFilterList(form);            
        	}
        //Modified 2014-1-8 PG
		}
	

    	protected void CheckBox_CheckedChanged(object sender, EventArgs e) {
        	UpdateFilterList();
    	}

    	protected void UpdateFilterList(ISalesOrderProducts form) {
        	//Update the hidden box for each of the checked filters
        	form.hidCheckedFilters.Value = "";        
        	foreach (Control ctrl in QFControlsList.Controls) {
            	if (ctrl.GetType() == typeof(SLXCheckBox)) {
                	if ((ctrl as SLXCheckBox).Checked == true) {
                 	   hidCheckedFilters.Value += "\"" +(ctrl as SLXCheckBox).Text + "\", ";                    
                	}
            	}
        	}
        	if (hidCheckedFilters.Value.Length > 2) {
            	//Remove the last 2 characters
           		hidCheckedFilters.Value = hidCheckedFilters.Value.Remove(hidCheckedFilters.Value.Length - 2);            
        	}
		}
        
    }
}