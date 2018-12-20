<%@ Page Language="C#" AutoEventWireup="true" CodeFile="WinAuthLoad.aspx.cs" Inherits="WinAuthLoad" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.ScriptResourceProvider" TagPrefix="SalesLogix" %>

<SalesLogix:ScriptResourceProvider runat="server" ID="WinAuthLoadStrings" >
    <Keys>
        <SalesLogix:ResourceKeyName Key="Err_TimeZone" />
    </Keys>
</SalesLogix:ScriptResourceProvider>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>Infor CRM</title>

    <style type="text/css">
        #splashimg 
        {
            border: 1px solid #cccccc;
            background-image : url(images/icons/base_splash_screen.jpg);
            background-repeat:no-repeat;
            width:598px;
            height:433px;
            z-index:0;
            margin-left: auto;
            margin-right : auto;
            margin-top : 50px;
        }        
        #lblLoading 
        {
            margin-left: 117px;
            margin-top: 77px;
            left: inherit;
            top: inherit;                     
            position: absolute;
            font-weight:  bolder;
            font-family: Helvetica, Arial, sans-serif;
            color: #2a405b;
            font-size: 133%;
            font-weight : normal;
        }     
    </style>

    <script pin="pin" type="text/javascript" src="Libraries/dojo/dojo/dojo.js"></script>
    <script pin="pin" src="jscript/jstz-min.js" type="text/javascript"></script>
    <script type="text/javascript">
        require(["dojo/ready"], function(ready) {
            ready(function() {
                var tz = jstz.determine();
                var fnGoToSlxClient = function() {
                    var btn = document.getElementById('Button1');
                    btn.click();
                };
                dojo.xhrGet({
                    url: 'SLXWinAuthenication.aspx?loadtz=true&tz_info=' + encodeURIComponent(tz.name()) + '&tz_client_date=' + encodeURIComponent(new Date().toString()),
                    preventCache: true,
                    load: function(data) {
                        fnGoToSlxClient();
                    },
                    error: function(err) {
                        alert(WinAuthLoadStrings.Err_TimeZone + ' ' + err.message);
                        fnGoToSlxClient();
                        return err;
                    }
                });
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="splashimg">
        <asp:Label ID="lblLoading" Text="<%= resources: Msg_Loading %>" runat="server">Loading...</asp:Label>
        <asp:HiddenField ID="HiddenField1" runat="server" />
        <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Button" style="display:none"/>
        </div>
    </form>
</body>
</html>

