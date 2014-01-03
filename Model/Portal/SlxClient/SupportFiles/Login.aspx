<%@ Page Language="C#" MasterPageFile="~/Masters/Login.master" AutoEventWireup="true" Culture="auto" UICulture="auto" EnableEventValidation="false"%>
<%@ Import Namespace="Sage.Platform.Diagnostics" %>
<%@ Import Namespace="Sage.SalesLogix.BusinessRules" %>
<%@ Import Namespace="Sage.SalesLogix.Web" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.ScriptResourceProvider" TagPrefix="SalesLogix" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="ContentPlaceHolderArea" >
<script type="text/javascript">
        require(["dojo/ready", "dojo/_base/array", "dojo/has", "dojo/dom", "dojo/dom-style", "dojo/_base/sniff", 'Sage/BrowserSupport', 'dojo/i18n!Sage/UI/nls/Login'], function (ready, array, has, dom, domStyle, _sniff, browserSupport, loginStrings) {
            ready(function () {
                var osInfo = browserSupport().getOSInfo();
                initGears();

        if (Sage.gears) {
            domStyle.set(dom.byId('enhancementsNotInstalled'), 'display', 'none');
            domStyle.set(dom.byId('enhancementsInstalled'), 'display', '');
        }
        if (osInfo.OSName !== "Windows") {
            domStyle.set(dom.byId('enhancementsNotSupported'), 'display', '');
            domStyle.set(dom.byId('enhancementsNotInstalled'), 'display', 'none');
            domStyle.set(dom.byId('enhancementsInstalled'), 'display', 'none');
        }

        sessionStorage.clear();
                function showUnsupportedMessage(browserLabel, browserVersion, unsupportedText) {
                    domStyle.set(dom.byId('browserUnsupportedDiv'), 'display', 'block');
                    dom.byId('currentBrowserText').innerHTML = loginStrings.currentBrowserText + " " + browserLabel + " " + browserVersion;
                    dom.byId('currentBrowserUnsupportedText').innerHTML = unsupportedText;
                }
                function browserCompatibilityCheck(browserVersion, browserSupportInfo) {

                    var isSupported, isNotOptimal, isNotFullyFunctional,latestVersion, isLastestVersion;
                    if (browserVersion) {

                        if (browserSupportInfo.supportedlVersion.length === 0) {
                            isSupported = false;
                        } else {
                            latestVersion = browserSupportInfo.supportedlVersion[browserSupportInfo.supportedlVersion.length-1];
                            if (array.indexOf(browserSupportInfo.supportedlVersion, browserVersion) > -1) {
                                isSupported = true;
                            } else {
                                if(browserVersion > latestVersion){
                                    isSupported = true;
                                } else {
                                    isSupported = false;
                                }
                            }
                            if (browserVersion > latestVersion){
                                isLastestVersion = true;
                            }
                        }

                        if (browserSupportInfo.notOptimalVersion.length > 0) {
                            if ((array.indexOf(browserSupportInfo.notOptimalVersion, browserVersion) > -1) || (browserSupportInfo.notOptimalVersion[0] === -1)) {
                                isNotOptimal = true;
                            }
                        }

                        if (browserSupportInfo.notFullyFunctional.length > 0) {
                            if ((array.indexOf(browserSupportInfo.notFullyFunctional, browserVersion) > -1) || (browserSupportInfo.notFullyFunctional[0] === -1) )  {
                                isNotFullyFunctional = true;
                            }
                            
                        }

                        if (isSupported) {
                            if (isNotOptimal) {
                                // Outdated browser.
                                showUnsupportedMessage(browserSupportInfo.browserLabel, browserVersion, loginStrings.outdatedBrowserText);
                            }
                            if (isNotFullyFunctional) {
                                // not fully supported. 
                                // Commenting this out since curently FF Chrome and Safari are not fully functinal for any version.
                                //showUnsupportedMessage(browserSupportInfo.browserLabel, browserVersion, loginStrings.partiallySupportedBrowserText);
                                
                            }
                        } else {
                            // The entire browser isn't officially supported
                            showUnsupportedMessage(browserSupportInfo.browserLabel, browserVersion, loginStrings.unsupportedBrowserText);
                        }
                    }
                };                
                dom.byId('implementationGuideText').innerHTML = loginStrings.implementationGuideText;
                dom.byId('learnMoreClick').innerHTML = loginStrings.learnMoreText;
                dom.byId('btnToggleLearnMore').value = loginStrings.closeText;
                dom.byId('unsupportedMessageText').innerHTML = loginStrings.unsupportedMessageText;
                browserCompatibilityCheck(has('ie'), browserSupport().getBrowserCompatibilityInfo('ie'));
                browserCompatibilityCheck(has('ff'), browserSupport().getBrowserCompatibilityInfo('ff'));
                browserCompatibilityCheck(has('chrome'), browserSupport().getBrowserCompatibilityInfo('chrome'));
                browserCompatibilityCheck(has('opera'), browserSupport().getBrowserCompatibilityInfo('opera'));
                browserCompatibilityCheck(has('safari'), browserSupport().getBrowserCompatibilityInfo('safari'));


    });
        });
        function toggleLearnMore() {
            var divToToggle = document.getElementById('browserUnsupportedMoreInfoDiv');
            if (divToToggle.style.display != "block") {
                divToToggle.style.display = "block";
                return;
            }
            divToToggle.style.display = 'none';
        }
</script>
<SalesLogix:ScriptResourceProvider runat="server" ID="LoginStrings" >
	<Keys>
		<SalesLogix:ResourceKeyName Key="EnhancementsInstalled" />
        <SalesLogix:ResourceKeyName Key="EnhancementsInstall" />
        <SalesLogix:ResourceKeyName Key="EnhancementsNotSupported" />
	</Keys>
</SalesLogix:ScriptResourceProvider>
    <div id="browserUnsupportedDiv" style='display:none; font-family:Arial,Verdana,Sans-serif; font-size:0.8em;'>
        <div style='position: fixed; width:99%; margin-right:5px; padding:5px; border-bottom:1px solid #FF7B47;'>
            <a id="learnMoreClick" style="float:right; padding-right:5px; cursor:pointer" onclick="toggleLearnMore();"></a>
            <span id="unsupportedMessageText"></span>
        </div>
    </div>
    <div id="browserUnsupportedMoreInfoDiv" style='float:right; width:250px; display:none; font-family:Arial,Verdana,Sans-serif; font-size:0.8em;'>
     <div style='position: fixed; z-index:1; background-color:White; border:1px solid #D3D2D2; padding:10px; margin-right:5px;'>
        <span id="currentBrowserText"></span><br />
        <span id="currentBrowserUnsupportedText"></span><br />
        <a id="implementationGuideText" href="http://www.saleslogix.com/BrowserMatrix" target="_blank"></a><br />
        <input type="button" style="float:right" onclick="toggleLearnMore();" id="btnToggleLearnMore" />
     </div>
    </div>
    <asp:Login ID="slxLogin" runat="server" CssClass="slxlogin" DestinationPageUrl="Default.aspx"
        OnPreRender="PreRender" Font-Names="Arial,Verdana,Sans-sarif" Font-Size="17px"
        ForeColor="#000000">
		<LayoutTemplate>
		    <div id="splashimg">
			    <div id="splashCenterBox">
			        <div id="LoginForm">
			            <table cellspacing="5" cellpadding="5" border="0">
			                <tr>
			                    <td>
			                        <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="UserName" Text="<%$ resources: UserName %>"></asp:Label>
			                    </td>
			                    <td>
			                        <asp:TextBox ID="UserName" runat="server" CssClass="editCtl" ></asp:TextBox>
				                    <asp:CustomValidator ID="UserNameRequired" ValidateEmptyText="True" OnServerValidate="ValidateUserName" ClientValidationFunction="" runat="server"
                                        ControlToValidate="UserName" ErrorMessage="<%$ resources: UserNameRequired %>" ToolTip="<%$ resources: UserNameRequired %>"
                                        ValidationGroup="slxLogin" Text="<%$ resources: asterisk %>"></asp:CustomValidator>
			                    </td>
			                </tr>
			                <tr>
			                    <td>
			                        <asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="Password" Text="<%$ resources: Password %>" style="margin-top:5px;"></asp:Label>
			                    </td>
			                    <td>
			                        <asp:TextBox ID="Password" runat="server" CssClass="editCtl" TextMode="Password" AutoComplete="off"></asp:TextBox>
			                    </td>
			                </tr>
			                <tr>
			                    <td></td>
			                    <td>
			                        <div id="RememberMe">
				                        <asp:CheckBox ID="chkRememberMe" runat="server" Checked="false" Text="<%$ resources: RememberMe %>" />
				                    </div>
			                    </td>
			                </tr>
			                <tr>
			                    <td></td>
			                    <td style="text-align:right;">
			                        <asp:Button ID="btnLogin" runat="server" CommandName="Login" CssClass="LoginBtn" Text="<%$ resources: LogOn %>" ValidationGroup="slxLogin" />
			                    </td>
			                </tr>
			            </table>
			            <div id="loginMsgRow" class="loginmsg">
			                <asp:Literal ID="FailureText" runat="server" EnableViewState="False" ></asp:Literal>
			            </div>
			            <div class="divider"></div>
			            <div id="enhancementsNotInstalled" onclick="Sage.installDesktopFeatures();">
			                <span class="enhancements">
			                    <asp:Label ID="EnhancementsInstall" runat="server" Text="<%$ resources: EnhancementsInstall %>"></asp:Label>
			                </span>
			            </div>
			            <div id="enhancementsInstalled" style="display:none;" onclick="Sage.installDesktopFeatures();">
			                <span class="enhancements">
			                    <asp:Label ID="EnhancementsInstalled" runat="server" Text="<%$ resources: EnhancementsInstalled %>"></asp:Label>
			                </span>
			            </div>
                         <div id="enhancementsNotSupported" style="display:none;">
			                <span class="enhancements">
			                    <asp:Label ID="EnhancementsNotSupported" runat="server" Text="<%$ resources: EnhancementsNotSupported %>"></asp:Label>
			                </span>
			            </div>
			            <span class="findOutMore">
			                <SalesLogix:PageLink runat="server" ID="findoutmorelink" LinkType="HelpFileName" NavigateUrl="desktopintegration"
                                Text="<%$ resources: FindOutMore %>" CssClass="findoutmoretext" Target="MCWebHelp" >
			                </SalesLogix:PageLink>
			            </span>
			        </div>
			        <div ID="debugLabel" class="debugMode" runat="server" Visible="False">ASP.NET Debug Mode is ON.  For optimized performance, we suggest you turn this off.</div>
			    </div>
                <div id="VersionSection">
                    <asp:Label ID="VersionLabel" runat="server" Text="Version"></asp:Label>
                    <div class="info">
                        <div>
                            <asp:Label ID="Copyright" runat="server" Text="<%$ resources: Copyright %>"></asp:Label>
                        </div>
                        <div>
                            <asp:Label ID="Sage" runat="server" Text="<%$ resources: SageSoftwareInc %>"></asp:Label>
                        </div>
                        <div>
                            <asp:Label ID="Rights" runat="server" Text="<%$ resources: AllRightsReserved %>"></asp:Label>
                        </div>
                    </div>
                </div>
		    </div>
        </LayoutTemplate>
    </asp:Login>
</asp:Content>

<script type="text/C#" runat="server">
    private const string AuthError = "AuthError";

    protected override void OnInit(EventArgs e)
    {
        base.OnInit(e);
        EnsureChildControls();
    }

	protected void Page_Load(object sender, EventArgs e)
	{
		System.Web.UI.WebControls.CheckBox rememberMe = (System.Web.UI.WebControls.CheckBox)slxLogin.Controls[0].FindControl("chkRememberMe");
		System.Web.UI.WebControls.TextBox userName = (System.Web.UI.WebControls.TextBox)slxLogin.Controls[0].FindControl("UserName");
		if (HttpContext.Current.IsDebuggingEnabled)
		{
			slxLogin.Controls[0].FindControl("debugLabel").Visible = true;
		}
		if (IsPostBack)
		{
			HttpCookie cookieRememberMe = new HttpCookie("SLXRememberMe");
			cookieRememberMe.Value = (rememberMe.Checked ? "T" : "F");
			cookieRememberMe.Expires = DateTime.Now.AddDays(14);
			Response.Cookies.Add(cookieRememberMe);

			if (rememberMe.Checked)
			{
				HttpCookie cookieUserName = new HttpCookie("SLXUserName");
				cookieUserName.Value = Server.UrlEncode(userName.Text);
				cookieUserName.Expires = DateTime.Now.AddDays(14);
				Response.Cookies.Add(cookieUserName);
			}
		}
		else
		{
			if (Request.Cookies["SLXRememberMe"] != null)
			{
				rememberMe.Checked = (Request.Cookies["SLXRememberMe"].Value == "T");
				if ((rememberMe.Checked) && (Request.Cookies["SLXUserName"] != null))
				{
					userName.Text = Server.UrlDecode(Request.Cookies["SLXUserName"].Value);
				}
			}
			ClearOldSession();
		}
		SetVersion();

		userName.Focus();
	}

    private void ClearOldSession()
    {
        string[] cookiesToDelete = { "SlxCalendar", "SlxCalendarASP" };
        foreach (string val in cookiesToDelete)
        {
            var delCookie = new HttpCookie(val);
            delCookie.Expires = DateTime.Now.AddDays(-1d);
            Response.Cookies.Add(delCookie);
            Request.Cookies.Remove(val);
        }
        if (StickySessionUtil.DebugStickySessionContext() && Request.Cookies[StickySessionUtil.SlxStickySessionIdCookieName] != null)
        {
            var cookie = new HttpCookie(StickySessionUtil.SlxStickySessionIdCookieName)
            {
                Expires = DateTime.Now.AddDays(-1d),
                HttpOnly = true
            };
            Response.Cookies.Add(cookie);
            Request.Cookies.Remove(StickySessionUtil.SlxStickySessionIdCookieName);
        }        
        if (FormsAuthentication.IsEnabled)
        {
            ErrorHelper.FormsAuthSignOut(Request, Response);
        }
        if (!Session.IsNewSession)
        {           
            Session.Abandon();
        }
    }

	protected new void PreRender(object sender, EventArgs e)
	{
        object msg = Sage.Platform.Application.ApplicationContext.Current.State[AuthError];
		if (msg == null)
		{
			var pageId = Sage.Platform.Application.ApplicationContext.Current.State["CurrentPageID"];
			var key = pageId + ":" + AuthError;
			msg = Sage.Platform.Application.ApplicationContext.Current.State[key];
		}
		if (msg != null)
		{
			Sage.Platform.Application.ApplicationContext.Current.State.Remove(AuthError);

			Literal FailureText = (Literal)slxLogin.FindControl("FailureText");
			FailureText.Text = msg.ToString();
		}
	}

    private static void SetAuthError(string errorMsg)
    {
        if (!string.IsNullOrEmpty(errorMsg))
        {
            Sage.Platform.Application.ApplicationContext.Current.State[AuthError] = errorMsg;
        }
        else
        {
            Sage.Platform.Application.ApplicationContext.Current.State.Remove(AuthError);
        }
    }

    protected void ValidateUserName(object source, ServerValidateEventArgs args)
    {
        var oValidator = (CustomValidator) source;

        if (oValidator == null)
        {
            args.IsValid = false;
            SetAuthError(GetLocalResourceObject("InvalidUserNameValidation").ToString());
            return;
        }

        char cBadChar;
        BusinessRuleHelper.InvalidUserNameReason reason;

        if (BusinessRuleHelper.IsValidUserNameValue(args.Value, out reason, out cBadChar))
        {
            args.IsValid = true;
            SetAuthError(null);
        }
        else
        {
            args.IsValid = false;

            switch (reason)
            {
                case BusinessRuleHelper.InvalidUserNameReason.NullOrEmpty:
                case BusinessRuleHelper.InvalidUserNameReason.WhiteSpace:
                    oValidator.ErrorMessage = GetLocalResourceObject("UserNameRequired").ToString();
                    break;
                default:
                    oValidator.ErrorMessage = GetLocalResourceObject("slxLoginResource1.FailureText").ToString();
                    break;
            }

            SetAuthError(oValidator.ErrorMessage);
        }
    }

    protected void Page_Error(Object sender, EventArgs e)
    {
        var userName = (TextBox) slxLogin.Controls[0].FindControl("UserName");
        string usrnm = userName.Text;

        Exception err = Server.GetLastError();
        if (err is Sage.Platform.Application.ValidationException)
        {
            string errMsg = err.Message;
            GoToChangePassword(usrnm, errMsg);
        }
    }

    protected void GoToChangePassword(string strUserName, string errMessage)
	{
		string url = Request.Url.AbsolutePath;
		int n = url.LastIndexOf("/");
		string pwdchangeurl = url.Substring(0, n);
		HttpContext.Current.Cache.Insert("changePasswordError", errMessage, null, Cache.NoAbsoluteExpiration, new TimeSpan(0, 5, 0), CacheItemPriority.Normal, null);
		Response.Redirect(pwdchangeurl + "/ChangePassword.aspx?username=" + strUserName);
	}

	private void SetVersion()
    {
        if (!IsPostBack)
        {
            var resource = GetLocalResourceObject("VersionLabelResource1.Text");
            if (resource != null)
            {
                var control = slxLogin.FindControl("VersionLabel");
                if (control != null)
                {
                    Version version = typeof(Sage.SalesLogix.Web.SLXMembershipProvider).Assembly.GetName().Version;
                    ((Label)control).Text = String.Format("{0} {1}", resource, version);
                }
            }
        }
    }

</script>