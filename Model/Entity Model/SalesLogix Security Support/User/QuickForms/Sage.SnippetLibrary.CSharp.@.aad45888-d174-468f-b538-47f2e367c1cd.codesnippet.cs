/*
 * This metadata is used by the Saleslogix platform.  Do not remove.
<snippetHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="aad45888-d174-468f-b538-47f2e367c1cd">
 <assembly>Sage.SnippetLibrary.CSharp</assembly>
 <name>lueAddUser_OnChangeStep</name>
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
using Sage.Platform.WebPortal.Services;
#endregion Usings

namespace Sage.BusinessRules.CodeSnippets
{
    public static partial class OthersAccessToUserCalEventHandlers
    {
        public static void lueAddUser_OnChangeStep(IOthersAccessToUserCal form, EventArgs args)
        {
            IUser user = form.CurrentEntity as IUser;
			IUser userwantingaccess = form.lueAddUser.LookupResultValue as IUser;

			if (!user.UserCalendarExists(userwantingaccess))
			{
				user.AddUserCalendar(userwantingaccess);

				IWebDialogService dialogService = form.Services.Get<IWebDialogService>();
				dialogService.SetSpecs(235, 420, "EditCalPermissions");
				dialogService.EntityType = typeof(IUserCalendar);
				dialogService.CompositeKeyNames = "UserId, CalUserId";
				dialogService.EntityID = string.Format("{0},{1}", userwantingaccess.Id, user.Id);
				dialogService.ShowDialog();
			}
        }
    }
}