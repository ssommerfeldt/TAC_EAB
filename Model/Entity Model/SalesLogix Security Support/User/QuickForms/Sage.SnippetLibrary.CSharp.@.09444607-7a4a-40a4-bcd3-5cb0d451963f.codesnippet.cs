/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="09444607-7a4a-40a4-bcd3-5cb0d451963f">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>btnSave_OnClick</name>
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
   <assemblyName>Sage.SalesLogix.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\assemblies\Sage.SalesLogix.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.SalesLogix.Web.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\assemblies\Sage.SalesLogix.Web.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.Platform.Application.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\assemblies\Sage.Platform.Application.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.SalesLogix.Security.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\assemblies\Sage.SalesLogix.Security.dll</hintPath>
  </reference>
  <reference>
   <assemblyName>Sage.Platform.WebPortal.dll</assemblyName>
   <hintPath>%BASEBUILDPATH%\assemblies\Sage.Platform.WebPortal.dll</hintPath>
  </reference>
 </references>
</snippetHeader>
*/


#region Usings
using System;
using Sage.Entity.Interfaces;
using Sage.Form.Interfaces;
using Sage.Platform.Application;
using Sage.Platform.Data;
using Sage.Platform.Security;
using Sage.Platform.WebPortal.Services;
using Sage.SalesLogix;
using Sage.SalesLogix.Security;
using Sage.SalesLogix.Web;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
	/// <summary>
    /// This is called when the change password OK button is selected.
    /// </summary>
    public static partial class UserChangePasswordEventHandlers
    {
		/// <summary>
    	/// Performs the password validation rules. If validation fails an exception is raised from the
		/// ValidateUserPassword method. If validation succeeds, but the password was changed
		/// to an empty string that result is returned, which will be displayed to the UI.
    	/// </summary>
    	/// <param name="form">The change password form.</param>
    	/// <param name="args">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public static void btnSave_OnClick(IUserChangePassword form, EventArgs args)
        {
			string newPassword = form.txtNewPassword.Text;
            if (newPassword == form.txtConfirmPassword.Text)
			{
				IUser user = (IUser)form.CurrentEntity;

				if (user.ValidateUserPassword(newPassword))
				{
					IWebDialogService dialogService = form.Services.Get<IWebDialogService>();
					user.SavePassword(newPassword);
					var slxUserService = (ISlxUserService)ApplicationContext.Current.Services.Get<IUserService>(true);
            		var currentUser = slxUserService.GetUser();
					if (user.UserName == currentUser.UserName)
					{
                		var data = (SLXDataService)ApplicationContext.Current.Services.Get<IDataService>(true);
                		var auth = (SLXWebAuthenticationProvider)data.AuthenticationProvider;
                		auth.AuthenticateWithContext(currentUser.UserName, newPassword);
 					}

					form.lblInvalidPassword.Text = newPassword.Length == 0 ? form.GetResource("PasswordBlank").ToString() : String.Empty;
					dialogService.ShowMessage(form.GetResource(newPassword.Length == 0 ? "PasswordBlank" : "PasswordChanged").ToString());
					dialogService.CloseEventHappened(form, null);
					IPanelRefreshService refresher = form.Services.Get<IPanelRefreshService>();
                    if (refresher != null)
                    {
                        refresher.RefreshAll();
                    }
				}
			}
			else
			{
				throw new ValidationException(form.GetResource("Error_PasswordsDontMatch").ToString());
			}
        }
    }
}