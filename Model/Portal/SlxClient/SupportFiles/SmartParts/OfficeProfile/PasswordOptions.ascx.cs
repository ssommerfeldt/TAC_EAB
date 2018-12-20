using System;
using System.Globalization;
using System.Web.UI;
using Sage.Platform.Application;
using Sage.Platform.Application.UI;
using Sage.Platform.WebPortal.SmartParts;
using Sage.SalesLogix.Security;
using Sage.SalesLogix.Services;

public partial class Passwords : UserControl, ISmartPartInfoProvider
{
    /// <summary>
    /// Gets or sets the role security service.
    /// </summary>
    /// <value>The role security service.</value>
    [ServiceDependency]
    public Sage.Platform.Security.IRoleSecurityService RoleSecurityService { get; set; }

    public ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
    {
        var tinfo = new ToolsSmartPartInfo();
        foreach (Control c in PasswordOptions_RTools.Controls)
        {
            tinfo.RightTools.Add(c);
        }
        return tinfo;
    }

    protected override void OnInit(EventArgs e)
    {
        base.OnInit(e);
        chkForceChange.CheckedChanged += chkForceChange_CheckedChanged;
        chkBlankPasswords.CheckedChanged += chkBlankPasswords_CheckedChanged;

        if (RoleSecurityService != null)
        {
            cmdSave.Visible = RoleSecurityService.HasAccess("ENTITIES/OFFICEPROFILE/EDIT");
        }
    }

    protected void chkForceChange_CheckedChanged(object sender, EventArgs e)
    {
        if (chkForceChange.Checked)
        {
            numDaysPswdExpires.Enabled = false;
            numDaysPswdExpires.Text = "0";
        }
        else
        {
            numDaysPswdExpires.Enabled = true;
        }
    }

    protected void chkBlankPasswords_CheckedChanged(object sender, EventArgs e)
    {
        if (chkBlankPasswords.Checked)
        {
            numMinimumPswdLength.Enabled = true;
            chkNumberLetters.Enabled = true;
            numMinimumPswdLength.Text = "4";
        }
        else
        {
            numMinimumPswdLength.Enabled = false;
            numMinimumPswdLength.Text = "0";
            chkNumberLetters.Checked = false;
            chkNumberLetters.Enabled = false;
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        var systemInfo = ApplicationContext.Current.Services.Get<ISystemOptionsService>(true);

        if (!Page.IsPostBack)
        {
            chkBlankPasswords.Checked = systemInfo.NoBlankPassword;
            chkNumberLetters.Checked = systemInfo.AlphaNumPassword;
            chkUserNameAsPassword.Checked = systemInfo.NoNameInPassword;
            chkWindowsAuth.Checked = systemInfo.UseWindowsAuth;
            chkForceChange.Checked = systemInfo.ForceChangeDefault;
        }
        numMinimumPswdLength.Text = systemInfo.MinPasswordLength.ToString(CultureInfo.InvariantCulture);
        txtDefaultPassword.Text = systemInfo.DefaultPassword;
        numTimeoutLock.Text = systemInfo.LockoutTimeout.ToString(CultureInfo.InvariantCulture);
        numDaysPswdExpires.Text = systemInfo.WebPasswordExpires.ToString(CultureInfo.InvariantCulture);
        numAttempts.Text = systemInfo.LoginAttemptThreshold.ToString(CultureInfo.InvariantCulture);

        if (chkBlankPasswords.Checked)
        {
            numMinimumPswdLength.Enabled = true;
            chkNumberLetters.Enabled = true;
        }
        else
        {
            numMinimumPswdLength.Enabled = false;
            chkNumberLetters.Checked = false;
            chkNumberLetters.Enabled = false;
            numMinimumPswdLength.Text = "0";
        }

        if (chkForceChange.Checked)
        {
            numDaysPswdExpires.Enabled = false;
            numDaysPswdExpires.Text = "0";
        }
        else
        {
            numDaysPswdExpires.Enabled = true;
        }
    }

    protected void Save_OnClick(object sender, ImageClickEventArgs e)
    {
        sbyte passwordLength = (sbyte)(!string.IsNullOrEmpty(numMinimumPswdLength.Text) ? Convert.ToInt32(numMinimumPswdLength.Text) : 0);
        if (chkBlankPasswords.Checked && passwordLength < 4)
        {
            throw new Sage.Platform.Application.ValidationException(GetLocalResourceObject("MinPswdLength").ToString());
        }
        var systemInfo = ApplicationContext.Current.Services.Get<ISystemOptionsService>(true);
        if (systemInfo.DefaultPassword != txtDefaultPassword.Text)
        {
            systemInfo.DefaultPassword = txtDefaultPassword.Text;
        }
        
        if (systemInfo.MinPasswordLength != passwordLength)
        {
            systemInfo.MinPasswordLength = passwordLength;
        }
        sbyte passwordExp = (sbyte)(!string.IsNullOrEmpty(numDaysPswdExpires.Text) ? Convert.ToInt32(numDaysPswdExpires.Text) : 0);
        if (systemInfo.WebPasswordExpires != passwordExp)
        {
            systemInfo.WebPasswordExpires = passwordExp;
        }
        if (systemInfo.ForceChangeDefault != chkForceChange.Checked)
        {
            systemInfo.ForceChangeDefault = chkForceChange.Checked;
        }
        if (systemInfo.NoBlankPassword != chkBlankPasswords.Checked)
        {
            systemInfo.NoBlankPassword = chkBlankPasswords.Checked;
        }
        if (systemInfo.NoNameInPassword != chkUserNameAsPassword.Checked)
        {
            systemInfo.NoNameInPassword = chkUserNameAsPassword.Checked;
        }
        if (systemInfo.LoginAttemptThreshold != Convert.ToInt16(numAttempts.Text))
        {
            systemInfo.LoginAttemptThreshold = Convert.ToInt16(numAttempts.Text);
        }
        if (systemInfo.LockoutTimeout != Convert.ToInt16(numTimeoutLock.Text))
        {
            systemInfo.LockoutTimeout = Convert.ToInt16(numTimeoutLock.Text);
        }
        if (systemInfo.UseWindowsAuth != chkWindowsAuth.Checked)
        {
            systemInfo.UseWindowsAuth = chkWindowsAuth.Checked;
        }
        if (systemInfo.AlphaNumPassword != chkNumberLetters.Checked)
        {
            systemInfo.AlphaNumPassword = chkNumberLetters.Checked;
        }
        systemInfo.ClearCache();
    }
}