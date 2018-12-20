using System;
using Sage.Platform;
using Sage.Platform.Application;
using Sage.Platform.Application.Diagnostics;
using Sage.Platform.Diagnostics;
using Sage.Platform.Utility;
using Sage.Platform.WebPortal;

namespace SlxClient
{
    public partial class SetMingleContext : WebPortalPage
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        protected override void OnPreInit(EventArgs e)
        {
            base.OnPreInit(e);

            // Example Ming.le query string: HybridCertified=1&OnPremCertified=1&LogicalId=lid://infor.crm.CessnaWsFedIis&inforThemeName=InforBlue&inforCurrentLocale=en-US&inforCurrentLanguage=en-US&infor10WorkspaceShell=1&inforWorkspaceVersion=12.0.0.007&inforStyle=3.0&inforTimeZone=(UTC-03:30) Newfoundland&inforStdTimeZone=America/St_Johns
            Log.DebugEx(string.Format("Ming.le settings: {0}", Request.QueryString), EventIds.AdHocEvents.InfoMingle);

            if (Request.QueryString.Count > 0)
            {
                var configuredLogicalId = System.Configuration.ConfigurationManager.AppSettings["MingleLogicalID"];
                var logicalId = Request.QueryString["LogicalId"];
                if (!string.IsNullOrEmpty(logicalId) && logicalId.InvariantEquals(configuredLogicalId))
                {
                    var context = ApplicationContext.Current.Services.Get<IContextService>(true);

                    // Time Zone
                    var inforStdTimeZone = Request.QueryString["inforStdTimeZone"];
                    if (!string.IsNullOrEmpty(inforStdTimeZone))
                    {
                        var windowsZone = TimeZones.WindowsZones.FindFirst(inforStdTimeZone);
                        if (windowsZone != null)
                        {
                            Log.DebugEx(string.Format("Found Olson time zone: {0} ({1})", inforStdTimeZone, windowsZone.WindowsId), EventIds.AdHocEvents.InfoMingle);
                            var timeZones = new TimeZones();
                            var timeZone = timeZones.FindTimeZone(windowsZone.WindowsId, TimeZones.TZFindType.ftKeyName);
                            if (timeZone != null)
                            {
                                Log.DebugEx(string.Format("Setting the ContextService TimeZone value captured by Ming.le: {0} ({1})", timeZone.DisplayName, timeZone.KeyName), EventIds.AdHocEvents.InfoMingle);
                                context.SetContext("usingServerTimeZone", "F");
                                context.SetContext("TimeZone", timeZone);
                            }
                            else
                            {
                                Log.WarnEx(
                                    string.Format("The Infor CRM time zone could not be set based on the Ming.le inforStdTimeZone value '{0}' because the Windows time zone could not be located using the WindowsId value of '{1}'.", inforStdTimeZone,
                                        windowsZone.WindowsId),
                                    EventIds.AdHocEvents.WarnMingle);
                            }
                        }
                        else
                        {
                            Log.WarnEx(
                                string.Format("The Infor CRM time zone could not be set based on the Ming.le inforStdTimeZone value because the IANA MapZone could not be determined based on the IANA time zone value of '{0}'.", inforStdTimeZone),
                                EventIds.AdHocEvents.WarnMingle);
                        }
                    }
                    else
                    {
                        Log.WarnEx("The Infor CRM time zone could not be set based on the Ming.le inforStdTimeZone value because it is missing.", EventIds.AdHocEvents.WarnMingle);
                    }

                    // Language
                    var inforCurrentLanguage = Request.QueryString["inforCurrentLanguage"]; // e.g. en-US
                    if (!string.IsNullOrEmpty(inforCurrentLanguage))
                    {
                        Log.DebugEx(string.Format("Setting the ContextService MingleLanguage value captured by Ming.le: {0}", inforCurrentLanguage), EventIds.AdHocEvents.InfoMingle);
                        context.SetContext("MingleLanguage", inforCurrentLanguage);
                    }
                    else
                    {
                        Log.WarnEx("The Infor CRM language could not be set based on the Ming.le inforCurrentLangauge value because it is missing.", EventIds.AdHocEvents.WarnMingle);
                    }
                }
                else
                {
                    Log.WarnEx(string.Format("The Ming.le language and time zone could not be applied to Infor CRM. The Ming.le LogicalID '{0}' does not match the Infor CRM configured LogicalID '{1}.", logicalId, configuredLogicalId),
                        EventIds.AdHocEvents.WarnMingle);
                }
            }
            else
            {
                Log.WarnEx("The Ming.le language and time zone could not be applied to Infor CRM. The Ming.le query string is missing.", EventIds.AdHocEvents.WarnMingle);
            }

            Response.Redirect("~/Default.aspx");
        }
    }
}
