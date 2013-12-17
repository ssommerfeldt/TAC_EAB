<%@ Page Language="C#" MasterPageFile="~/Masters/Login.master" AutoEventWireup="true" Culture="auto" UICulture="auto" EnableEventValidation="false"%>
<%@ Import Namespace="Sage.Platform.Diagnostics" %>
<%@ Import Namespace="Sage.Platform.Orm"%>
<%@ Import Namespace="NHibernate"%>
<%@ Import Namespace="Sage.Entity.Interfaces"%>
<%@ Import Namespace="Sage.SalesLogix.Web" %>

<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="ContentPlaceHolderArea" >

    <script type="text/javascript">
        require(["dojo/ready", "dojo/_base/array", "dojo/has", "dojo/dom", "dojo/dom-style", "dojo/_base/sniff", 'Sage/BrowserSupport', 'dojo/i18n!Sage/UI/nls/Login'], function (ready, array, has, dom, domStyle, _sniff, browserSupport, loginStrings) {
            ready(function () {
                function showUnsupportedMessage(browserLabel, browserVersion, unsupportedText) {
                    domStyle.set(dom.byId('browserUnsupportedDiv'), 'display', 'block');
                    dom.byId('currentBrowserText').innerHTML = loginStrings.currentBrowserText + " " + browserLabel + " " + browserVersion;
                    dom.byId('currentBrowserUnsupportedText').innerHTML = unsupportedText;
                }
                function browserCompatibilityCheck(browserVersion, browserSupportInfo) {
                    if (browserVersion) {
                        if (browserSupportInfo.supportedNotOptimal.length == 0
                           && browserSupportInfo.optimalVersion.length == 0) {
                            // The entire browser isn't officially supported
                            showUnsupportedMessage(browserSupportInfo.browserLabel, browserVersion, loginStrings.unsupportedBrowserText);
                            return;
                        }
                        if (array.indexOf(browserSupportInfo.optimalVersion, browserVersion) > -1) {
                            // This is an optimal browser
                            return;
                        }
                        if (array.indexOf(browserSupportInfo.supportedNotOptimal, browserVersion) > -1) {
                            // Supported, but perhaps not optimal
                            showUnsupportedMessage(browserSupportInfo.browserLabel, browserVersion, loginStrings.partiallySupportedBrowserText);
                            return;
                        }
                        // Do 2 checks here -- one against optimal version or one against supportedNotOptimal,
                        //  as both aren't guaranteed to exist
                        if (browserSupportInfo.optimalVersion.length > 0) {
                            if (browserVersion < browserSupportInfo.optimalVersion[0]) {
                                // Outdated browser
                                showUnsupportedMessage(browserSupportInfo.browserLabel, browserVersion, loginStrings.outdatedBrowserText);
                                return;
                            }
                            // Above the supported version
                            showUnsupportedMessage(browserSupportInfo.browserLabel, browserVersion, loginStrings.laterThanSupportedText);
                        }
                        else if (browserSupportInfo.supportedNotOptimal.length > 0) {
                            if (browserVersion < browserSupportInfo.supportedNotOptimal[0]) {
                                // Outdated browser
                                showUnsupportedMessage(browserSupportInfo.browserLabel, browserVersion, loginStrings.outdatedBrowserText);
                                return;
                            }
                            // Above the supported version
                            showUnsupportedMessage(browserSupportInfo.browserLabel, browserVersion, loginStrings.laterThanSupportedText);
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
        <a id="implementationGuideText" href="http://www.saleslogix.com/compatibility" target="_blank"></a><br />
        <input type="button" style="float:right" onclick="toggleLearnMore();" id="btnToggleLearnMore" />
     </div>
    </div>
    <asp:Login ID="slxLogin" runat="server" CssClass="slxlogin"
        DestinationPageUrl="Ticket.aspx" OnPreRender="PreRender"
        Font-Names="Arial,Verdana,Sans-sarif" Font-Size="16px" ForeColor="#000000" >

        <LayoutTemplate>
            <div id="splashimg">

            <div id="splashCenterBox">         
                       
  
             <div id="LoginForm" style="left:80px; top:20px;">

     
             <table cellspacing="5" cellpadding="5" border="0">
             
             <tr><td><asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="UserName" meta:resourcekey="UserNameLabelResource1">User Name:</asp:Label></td>
             <td> <asp:TextBox ID="UserName" runat="server" CssClass="editCtl" meta:resourcekey="UserNameResource1"></asp:TextBox>
			 <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName"
                            ErrorMessage="User Name is required." ToolTip="User Name is required." ValidationGroup="slxLogin" meta:resourcekey="UserNameRequiredResource1">*</asp:RequiredFieldValidator></td>
			</tr>
                

			<tr>
			<td><asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="Password" meta:resourcekey="PasswordLabelResource1">Password:</asp:Label></td>
			<td><asp:TextBox ID="Password" runat="server" CssClass="editCtl" TextMode="Password" AutoComplete="off"></asp:TextBox></td>
			</tr>
			
			 <tr>
             <td></td>
             <td> <div id="RememberMe">
                            <asp:CheckBox ID="chkRememberMe" runat="server" meta:resourcekey="RememberMeResource1" Checked="false" Text="Remember me next time." />
                        </div>
             </td>             
             </tr>
			 
			  <tr>
             <td></td>
             <td style="text-align:right;"><asp:Button ID="btnLogin" runat="server"  CommandName="Login" Class="LoginBtn" Text="Log On" ValidationGroup="slxLogin"
                                meta:resourcekey="LoginButtonResource1" />
             </td>             
             </tr>
			 
			  <tr>
             <td></td>
             <td style="text-align:right;"><div id="ForgotPassword">            
                            <asp:LinkButton runat="server" OnClick="GetPasswordHint_Click" Text="Forgot your password?" ID="passwordHint" CssClass="forgotPassword"
                                meta:resourcekey="ForgotYourPassword" EnableViewState="False">
                            </asp:LinkButton>
                        </div>
             </td>             
             </tr>
			 
			    
						
			 </table> 
			 
            <div id="loginMsgRow" class="loginmsg" style="padding:0px;">
                            <asp:Literal ID="FailureText" runat="server" EnableViewState="False" meta:resourcekey="FailureTextResource1"></asp:Literal>
                            &nbsp;
                        </div>     

		          
                            
              </div>    
			</div> 			
                     
                        
                                   
                        <div id="VersionSection">
                            <asp:Label ID="VersionLabel" runat="server" Text="Version"></asp:Label>
                            <div class="info">
                                <div><asp:Label ID="Copyright" runat="server" Text="Copyright 1997-2012" meta:resourcekey="CopyrightResource1"></asp:Label></div>
                                <div><asp:Label ID="Sage" runat="server" Text="Sage Software, Inc." meta:resourcekey="SageResource1"></asp:Label></div>
                                <div><asp:Label ID="Rights" runat="server" Text="All Rights Reserved." meta:resourcekey="RightsResource1"></asp:Label></div>
                            </div>					    
                        </div> 
                    </div>
           
        </LayoutTemplate>
    </asp:Login>
</asp:Content>
                          
                            
<script type="text/C#" runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        CheckBox rememberMe = (CheckBox)slxLogin.Controls[0].FindControl("chkRememberMe");
        TextBox userName = (TextBox)slxLogin.Controls[0].FindControl("UserName");

        if (IsPostBack)
        {

            HttpCookie cookieRememberMe = new HttpCookie("SLXCustPortalRememberMe");
            cookieRememberMe.Value = (rememberMe.Checked ? "T" : "F");
            cookieRememberMe.Expires = DateTime.Now.AddDays(14);
            Response.Cookies.Add(cookieRememberMe);

            if (rememberMe.Checked)
            {
                HttpCookie cookieUserName = new HttpCookie("SLXCustPortalUserName");
                cookieUserName.Value = userName.Text;
                cookieUserName.Expires = DateTime.Now.AddDays(14);
                Response.Cookies.Add(cookieUserName);
            }
        }
        else
        {
            if (Request.Cookies["SLXCustPortalRememberMe"] != null)
            {
                rememberMe.Checked = (Request.Cookies["SLXCustPortalRememberMe"].Value == "T");
                if ((rememberMe.Checked) && (Request.Cookies["SLXCustPortalUserName"] != null))
                {
                    userName.Text = Request.Cookies["SLXCustPortalUserName"].Value;
                }
            }
            if (StickySessionUtil.DebugStickySessionContext() && Request.Cookies[StickySessionUtil.SlxStickySessionIdCookieName] != null)
            {
                var cookie = new HttpCookie(StickySessionUtil.SlxStickySessionIdCookieName)
                    {
                        Expires = DateTime.Now.AddDays(-1d),
                        HttpOnly =  true
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

        SetVersion();
        userName.Focus();
    }


    protected new void PreRender(object sender, EventArgs e)
    {
        object msg = Sage.Platform.Application.ApplicationContext.Current.State["AuthError"];
        if (msg != null)
        {
            Sage.Platform.Application.ApplicationContext.Current.State.Remove("AuthError");
            
            Literal FailureText = (Literal)slxLogin.FindControl("FailureText");
            FailureText.Text = Server.HtmlEncode(msg.ToString());
            FailureText.Visible = true;
        }
    }
    private void SetVersion()
    {
        Version version = typeof(Sage.SalesLogix.Web.SLXMembershipProvider).Assembly.GetName().Version;
        Label lblVersion = (Label)slxLogin.FindControl("VersionLabel");
        lblVersion.Text = Server.HtmlEncode(String.Format("{0} {1}", GetLocalResourceObject("VersionLabelResource1.Text").ToString(), version.ToString()));
              
    }
    /// <summary>
    /// Handles the Click event of the GetPasswordHint control.
    /// </summary>
    /// <param name="sender">The source of the event.</param>
    /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
    protected void GetPasswordHint_Click(object sender, EventArgs e)
    {
        TextBox userName = (TextBox)slxLogin.Controls[0].FindControl("UserName");
        Literal HintText = (Literal)slxLogin.FindControl("FailureText");

        if (String.IsNullOrEmpty(userName.Text))
        {
            HintText.Text = Server.HtmlEncode(GetLocalResourceObject("PasswordHintUserNameRequired").ToString());
        }
        else
        {
            IList<IContact> contacts = null;
            using (ISession session = new SessionScopeWrapper())
            {
                contacts = session.QueryOver<IContact>()
                    .Where(x => x.WebUserName == userName.Text)
                    .List();
            }
            if ((contacts != null) && (contacts.Count > 0))
            {
                HintText.Text = string.Format("<span style=\"color:green;\">{0}</span>", Server.HtmlEncode(contacts[0].WebPasswordHint));
            }
        }
        HintText.Visible = true;
    }


</script>