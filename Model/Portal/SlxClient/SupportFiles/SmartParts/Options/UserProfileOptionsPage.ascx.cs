using System;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Globalization;
using Sage.Platform.Application.UI;
using Sage.SalesLogix.Web;
using Sage.Platform.WebPortal.SmartParts;
using Sage.Platform.Application.Services;
using Sage.Platform.Application;
using Sage.Entity.Interfaces;

public partial class UserProfileOptionsPage : UserControl, ISmartPartInfoProvider
{
    private const string languageCookieId = "SLXLanguageSetting";
    private const string regionCookieId = "SLXRegionSetting";
    protected const string ddlLanguageId = "ddlLanguageSelect";
    protected const string ddlRegionId = "ddlRegionSelect";
    //Do not expire.
    private const int yearsToKeepCookies = 10;


    protected void Page_Load(object sender, EventArgs e)
    {
        var langSelectCookie = Request.Cookies[languageCookieId];
        var regionSelectCookie = Request.Cookies[regionCookieId];

        if (ddlLanguageSelect.Items.Count == 0)
        {
            ddlLanguageSelect.Items.AddRange(EnabledLanguageList.Languages.Select(x => new ListItem(x.DisplayText, x.CultureCode)).ToArray());
        }
        if(ddlRegionSelect.Items.Count == 0)
        {
            ddlRegionSelect.Items.AddRange(RegionList.Regions.Select(x => new ListItem(x.DisplayText,x.CultureCode)).ToArray());
        }
        
        if (langSelectCookie != null)
        {
            ddlLanguageSelect.SelectedIndex = ddlLanguageSelect.Items.IndexOf(ddlLanguageSelect.Items.FindByValue(langSelectCookie.Value));
        }
        else
        {
            var currentThreadCulture = Thread.CurrentThread.CurrentUICulture.Name;
            if (CultureCodeIsInLanguageList(currentThreadCulture))
            {
                var culture = ddlLanguageSelect.Items.FindByValue(currentThreadCulture);
                if (culture == null)
                {
                    var browserLanguage = ddlLanguageSelect.Items.Cast<ListItem>().FirstOrDefault(x => x.Value.StartsWith(Thread.CurrentThread.CurrentUICulture.Name, StringComparison.InvariantCultureIgnoreCase));
                    if (browserLanguage != null)
                    {
                        ddlLanguageSelect.Items.FindByValue(browserLanguage.Value).Selected = true;
                    }
                    else
                    {
                        ddlLanguageSelect.Items.FindByValue("en-us").Selected = true;
                    }
                }
            }
        }                                   

        if(regionSelectCookie != null)
        {
            ddlRegionSelect.SelectedIndex = ddlRegionSelect.Items.IndexOf(ddlRegionSelect.Items.FindByValue(regionSelectCookie.Value));
        }
        else
        {
            var currentThreadCulture = Thread.CurrentThread.CurrentCulture.Name;
            var cultureItem = ddlRegionSelect.Items.FindByValue(currentThreadCulture);
            if(cultureItem != null)
            {
                ddlRegionSelect.SelectedIndex = ddlRegionSelect.Items.IndexOf(cultureItem);
            }
            else
            {
                ddlRegionSelect.Items.FindByValue("en-us").Selected = true;
            }
        }
        
        // Contour
        var provider = Saleslogix.Geocode.Managers.ProviderManager.GetProvider();
        if (null != provider && provider.Source == "Google")
        {
            lblGoogleChina.Visible = chkGoogleChina.Visible = true;
            chkGoogleChina.Checked = Saleslogix.Geocode.Helpers.OptionsHelper.GetUseChinaUserOption();
        }
        else
        {
            lblGoogleChina.Visible = chkGoogleChina.Visible = false;
        }
    } // end Page_Load

    /// <summary>
    /// Gets the smart part info.
    /// </summary>
    /// <param name="smartPartInfoType">Type of the smart part info.</param>
    /// <returns></returns>
    public ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        ToolsSmartPartInfo tinfo = new ToolsSmartPartInfo();
        tinfo.Description = GetLocalResourceObject("PageDescription.Text").ToString();
        tinfo.Title = GetLocalResourceObject("PageDescription.Title").ToString();

        foreach (Control c in userProfile_RTools.Controls)
        {
            tinfo.RightTools.Add(c);
        }
        return tinfo;
    }

    protected void btnSave_Click(object sender, ImageClickEventArgs e)
    {
        var selectedLanguage = ddlLanguageSelect.SelectedValue;
        var selectedRegion = ddlRegionSelect.SelectedValue;
        var redirect = false;

        // Contour
        if (chkGoogleChina.Visible)
        {
            Saleslogix.Geocode.Helpers.OptionsHelper.SetUseChinaUserOption(chkGoogleChina.Checked);
        }

        if (CultureCodeIsInLanguageList(selectedLanguage) && !String.Equals(selectedLanguage, Thread.CurrentThread.CurrentUICulture.Name, StringComparison.InvariantCultureIgnoreCase))
        {
            var newLanguageCulture = CultureInfo.CreateSpecificCulture(selectedLanguage);
            Thread.CurrentThread.CurrentUICulture = newLanguageCulture;

            var newCookie = new HttpCookie(languageCookieId) { Value = selectedLanguage };
            newCookie.Expires = DateTime.Now.AddYears(yearsToKeepCookies);
            Response.Cookies.Add(newCookie);
            Request.Cookies.Remove(languageCookieId);

            redirect = true;
        }

        if (CultureCodeIsInRegionList(selectedRegion) && !String.Equals(selectedRegion, Thread.CurrentThread.CurrentCulture.Name, StringComparison.InvariantCultureIgnoreCase))
        {
            var newRegionCulture = CultureInfo.CreateSpecificCulture(selectedRegion);
            Thread.CurrentThread.CurrentCulture = newRegionCulture;

            var newCookie = new HttpCookie(regionCookieId) { Value = selectedRegion };
            newCookie.Expires = DateTime.Now.AddYears(yearsToKeepCookies);
            Response.Cookies.Add(newCookie);
            Request.Cookies.Remove(regionCookieId);

            redirect = true;
        }

        if (redirect)
        {
            Response.Redirect(Request.RawUrl);
        }
    }

    private bool CultureCodeIsInLanguageList(string cultureCode)
    {
        return EnabledLanguageList.Languages.Exists(x => x.CultureCode.StartsWith(cultureCode, StringComparison.InvariantCultureIgnoreCase));
    }

    private bool CultureCodeIsInRegionList(string cultureCode)
    {
        return RegionList.Regions.Exists(x => x.CultureCode.StartsWith(cultureCode, StringComparison.InvariantCultureIgnoreCase));
    }

}