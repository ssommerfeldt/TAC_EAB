using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Sage.Entity.Interfaces;
using System.Data;
using System.Text;
using System.Text.RegularExpressions;
using Sage.Platform.WebPortal;
using Sage.SalesLogix.Web.Controls;
using System.IO;
using Sage.Platform.Orm;
using Sage.Platform.Application;
using Sage.Platform.Data;
using System.Data.OleDb;
using Saleslogix.Geocode.DTO;
using Saleslogix.Geocode.Helpers;
using Saleslogix.Geocode.Providers;
using Saleslogix.Geocode.Repositories;
using Sage.SalesLogix.SelectionService;
using Sage.SalesLogix.Web.SelectionService;
using System.Globalization;
using System.Threading;

/// <summary>
/// Display the map
/// </summary>
public partial class ProximitySearch_PxMap : System.Web.UI.Page
{
    protected override void OnLoad(EventArgs e)
    {
        this.activeConfig = ConfigurationRepository.GetEnabledProviderConfiguration();
        base.OnLoad(e);
    }

    private CultureInfo _CurrentCulture;
    protected CultureInfo CurrentCulture
    {
        get
        {
            if (_CurrentCulture == null)
            {
                var lcid = Convert.ToInt32(Request.QueryString["lcid"] ?? Thread.CurrentThread.CurrentCulture.LCID.ToString());
                _CurrentCulture = new CultureInfo(lcid);
                if (Thread.CurrentThread.CurrentCulture.LCID != lcid)
                    Thread.CurrentThread.CurrentCulture = _CurrentCulture;
            }
            return _CurrentCulture;
        }
    }

    private RegionInfo _CurrentRegion;
    protected RegionInfo CurrentRegion
    {
        get
        {
            if (_CurrentRegion == null)
            {
                _CurrentRegion = new RegionInfo(CurrentCulture.LCID);
            }
            return _CurrentRegion;
        }
    }

    private IGeoCodeProviderConfiguration activeConfig = null;

    protected string MapKey
    {
        get
        {
            if (activeConfig != null && activeConfig.Enabled.HasValue && activeConfig.Enabled.Value)
            {
                return activeConfig.ApiKey.Replace("\r", "").Replace("\n", "");
            }
            else
            {
                return string.Empty;
            }
        }
    }

    protected string Provider
    {
        get
        {
            if (activeConfig != null && activeConfig.Enabled.HasValue && activeConfig.Enabled.Value)
            {
                return activeConfig.Name;
            }
            else
            {
                return string.Empty;
            }
        }
    }

    protected string GenerateProviderScript()
    {
        StringBuilder script = new StringBuilder();
        if (Provider == "Bing")
        {
            script.Append(@"<script async defer ");
            script.AppendFormat(@"src='https://www.bing.com/api/maps/mapcontrol?callback=initMap&mkt={0}'>",
                HttpUtility.UrlEncode(CurrentCulture.Name));
            script.Append(@"</script>");
        }
        else if (Provider == "Google")
        {
			// removed async defer and callback function to load Google maps in IE-11
			script.Append(@"<script ");
			script.AppendFormat(@"src='{0}/maps/api/js?key={1}&language={2}'>",
                (OptionsHelper.GetUseChinaUserOption() ? "http://maps.google.cn" : "https://maps.googleapis.com"),
                MapKey,
                HttpUtility.UrlEncode(CurrentCulture.Name));
            script.Append(@"</ script >");
        }

        return script.ToString();
    }

    protected string GenerateMapScript()
    {
        StringBuilder script = new StringBuilder();
        switch (Provider)
        {
            case "Bing":
                {
                    script.AppendLine(@"app.addModule(new BingMapModule('map', '" + MapKey + "'));");
                    script.AppendLine(@"app.addModule(new BingGeocodeModule('" + MapKey + "'));");
                    script.AppendLine(@"app.addModule(new BingRouteModule('" + MapKey + "', " + ((CurrentRegion.IsMetric) ? "true" : "false") + ", '" + CurrentCulture.Name + "'));");
                    break;
                }
            case "Google":
                {
                    script.AppendLine(@"app.addModule(new GoogleMapModule('map', '" + MapKey + "'));");
                    script.AppendLine(@"app.addModule(new GoogleGeocodeModule('" + MapKey + "'));");
                    script.AppendLine(@"app.addModule(new GoogleRouteModule('" + MapKey + "', " + ((CurrentRegion.IsMetric) ? "true" : "false") + "));");
                    break;
                }
        }
        return script.ToString();
    }

    protected string GenerateIncludeScripts()
    {
        bool debug = File.Exists(Request.MapPath("~/jscript/Sage/ProximitySearch/Ajax.js")) && HttpContext.Current.IsDebuggingEnabled;
        StringBuilder scripts = new StringBuilder();

        scripts.Append(@"<script pin='pin' type='text/javascript'>
        var djConfig = {
            parseOnLoad: true,
            isDebug: " + ((debug) ? "true" : "false") + @",
            debugAtAllCosts: " + ((debug) ? "true" : "false") + @",
            locale: '" + Global.Locale + @"',
            extraLocale: ['" + Global.Region + @"'],
            modulePaths: { 'Sage': '../../../jscript/Sage' }
        };
    </script>
    <script pin='pin' src='" + Page.ResolveClientUrl("~/Libraries/dojo/dojo/dojo.js") + @"'></script>            
    <script pin='pin' type='text/javascript'>
        window.Sage = window.Sage || { };
        window.Sage.__namespace = true; //allows child namespaces to be registered via Type.registerNamespace(...)
    </script>
    <script pin='pin' src='" + Page.ResolveClientUrl("~/jscript/sage-platform/sage-platform-servicecontainer.js") + @"' type='text/javascript'></script>
    <script pin= pin' src='" + Page.ResolveClientUrl("~/jscript/sage-platform/sage-platform-maincontentworkspace.js") + @"' type='text/javascript'></script>
    <script pin='pin' src= '" + Page.ResolveClientUrl("~/jscript/sage-platform/sage-platform-objectconnectionservice.js") + @"' type='text/javascript'></script>

    <script pin='pin' src='" + Page.ResolveClientUrl("~/Libraries/sdata/sdata-client.js") + @"' type='text/javascript'></script>
    <script pin='pin' src='" + Page.ResolveClientUrl("~/Libraries/Simplate.js") + @"' type='text/javascript'></script>");

        if (!debug)
        {
            scripts.AppendFormat(@"<script pin='pin' src='{0}'></script>", Page.ResolveClientUrl("~/jscript/Sage/Sage-Combined.js"));
        }

        return scripts.ToString();
    }

    /// <summary>
    /// This provides the data
    /// </summary>
    /// <returns></returns>
    protected string GenerateDataScript()
    {
        IList<DistanceDTO> results = null;
        StringBuilder script = new StringBuilder();

        string fromLoc = Request.QueryString["from"];
        double fromLat = Convert.ToDouble(Request.QueryString["fromlat"] ?? "0");
        double fromLon = Convert.ToDouble(Request.QueryString["fromlon"] ?? "0");
        string entityType = Request.QueryString["type"];
        double distance = Convert.ToDouble(Request.QueryString["dist"] ?? "0");
        string accountType = Request.QueryString["atype"];
        string accountSubType = Request.QueryString["asub"];
        string sortBy = Request.QueryString["sort"];
        bool sortAsc = Convert.ToBoolean(Request.QueryString["asc"] ?? true.ToString());
        int count = Convert.ToInt32(Request.QueryString["cnt"] ?? "0");

        string selected = Request.QueryString["selected"];
        IList<string> selections = null;
        if (!string.IsNullOrEmpty(selected))
        {
            selections = new List<string>(selected.Split(';'));
        }

        // Contact Prox Search
        string contactType = Request.QueryString["ctype"];
        string contactStatus = Request.QueryString["cstat"];

        // Map Group
        string group = Request.QueryString["grp"];

        if (entityType == null)
            throw new Exception(GetLocalResourceObject("Error_EntityType_Null").ToString());

        if (fromLoc != null && Request.QueryString["fromlat"] != null && Request.QueryString["fromlon"] != null)
        {
            script.AppendFormat("data.addPoint({{latitude: {0}, longitude: {1}, name: '{2}', description: '', address: '', type: 'poi', id: 'poi'}}, true);\n",
                       fromLat.ToString(CultureInfo.GetCultureInfo("en-US")), fromLon.ToString(CultureInfo.GetCultureInfo("en-US")),
                       PortalUtil.JavaScriptEncode(fromLoc, true));
        }

        if (string.IsNullOrEmpty(group))
        {
            // Use the query from the prox search page
            switch (entityType.ToUpper())
            {
                case "IACCOUNT":
                    {
                        results = DistanceSearchHelper.AccountDistanceSearch(
                            fromLat, fromLon, distance, accountType, accountSubType,
                            sortBy, sortAsc, count, 0, CurrentRegion.IsMetric);
                        break;
                    }
                case "ICONTACT":
                    {
                        results = DistanceSearchHelper.ContactDistanceSearch(
                            fromLat, fromLon, distance, contactType, contactStatus,
                            sortBy, sortAsc, count, 0, CurrentRegion.IsMetric);
                        break;
                    }
            }
        }
        else
        {
            results = GetGroupData(entityType, group, sortBy, sortAsc, count, selections);
        }

        // Add the points to the map
        if (results != null && results.Count > 0)
        {
            foreach (var dist in results)
            {
                // '*' is appended to descriptions when no geolocation data is avaialble.
                script.Append(
                    string.Format("data.addPoint(new SlxDataPoint({{latitude: {0}, longitude: {1}, name: '{2}', address: '{3}', description: '{7}', id: '{4}', entityid: '{5}', url: '{6}', type: 'data'}}), true);\n",
                        (dist.GeocodeLatitude.HasValue) ? dist.GeocodeLatitude.Value.ToString(CultureInfo.GetCultureInfo("en-US")) : "0.0",
                        (dist.GeocodeLongitude.HasValue) ? dist.GeocodeLongitude.Value.ToString(CultureInfo.GetCultureInfo("en-US")) : "0.0",
                        PortalUtil.JavaScriptEncode(string.Format("{0}{1}", (entityType.ToUpper().Equals("IACCOUNT")) ? dist.AccountName : dist.NameLF, (dist.GeocodeLatitude.HasValue) ? string.Empty : "*"), true),
                        PortalUtil.JavaScriptEncode(dist.DisplayAddress, true),
                        PortalUtil.JavaScriptEncode(dist.AddressId, true),
                        PortalUtil.JavaScriptEncode((entityType.ToUpper().Equals("IACCOUNT")) ? dist.AccountId : dist.ContactId, true),
                        GetEntityUrl(entityType, dist.AccountId, dist.ContactId),
                        ((dist.GeocodeLatitude.HasValue) ? string.Empty : "<em>" + GetLocalResourceObject("AddressFailedToGeocode").ToString() + "</em><br/><br/>") + GetDescription(dist.MainPhone, dist.AccountManagerLF)));
            }
        }

        return script.ToString();
    }

    private IList<DistanceDTO> GetGroupData(string entityType, string groupId, string orderBy, bool sortAsc, int count, IList<string> selections)
    {
        // Group Query
        switch (entityType.ToUpper())
        {
            case "IACCOUNT":
                {
                    return DistanceSearchHelper.AccountGroupSearch(
                        groupId,
                        orderBy,
                        sortAsc,
                        count,
                        0,
                        selections);
                }
            case "ICONTACT":
                {
                    return DistanceSearchHelper.ContactGroupSearch(
                        groupId,
                        orderBy,
                        sortAsc,
                        count,
                        0,
                        selections);
                }
            default:
                return null;
        }
    }

    private string GetDescription(string phone, string acctManager)
    {
        StringBuilder description = new StringBuilder();
        string sep = "<br/>";
        if (!string.IsNullOrEmpty(phone))
        {
            description.Append(Phone.FormatPhoneNumber(phone) + sep);
        }

        if (!string.IsNullOrEmpty(acctManager))
        {
            description.Append(acctManager + sep);
        }

        return description.ToString();
    }

    private string GetEntityUrl(string type, string accountId, string contactId)
    {
        if (type.ToUpper().Equals("IACCOUNT"))
            return Request.ApplicationPath + "/Account.aspx?entityid=" + accountId;
        if (type.ToUpper().Equals("ICONTACT"))
            return Request.ApplicationPath + "/Contact.aspx?entityid=" + contactId;
        return "";
    }
}