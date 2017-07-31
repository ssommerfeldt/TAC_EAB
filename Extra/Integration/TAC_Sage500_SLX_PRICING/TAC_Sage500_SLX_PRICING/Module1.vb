Imports System.IO
Imports System.Data.SqlClient
Imports System.Data.OleDb
Imports System.Configuration

Module Module1
#Region " Declaration of Variables and Support Functions "
    '=================================================================
    ' Need to Set the Project for
    '=================================================================
    Public PROJECTNAME As String = "TAC_Sage500_SLX_PRICING"
    Public strMASConstr As String
    Public strSLXNativeConstr As String
    Public strSLXConstr As String

#End Region
    Sub Main()

        Try

       
        Call LogErrors(PROJECTNAME, " - Main", "Process Start", EventLogEntryType.Information)

        ' strSLXNativeConstr = GetConnection(PROJECTNAME, "SLXNativeConnection.udl")
        strSLXNativeConstr = My.Settings.SLXNativeConnection
        'strMASConstr = GetConnection(PROJECTNAME, "Sage500Connection.udl")
        strMASConstr = My.Settings.Sage500Connection
        'strSLXConstr = GetConnection(PROJECTNAME, "SLXConnection.udl")
        strSLXConstr = My.Settings.SLXConnection

        If strSLXConstr = "" Or strSLXNativeConstr = "" Or strMASConstr = "" Then
            '=============================================
            ' Problem with the Connection String So Exit
            '===============================================
            'You must create an empty test.udl file in c:\ first. So, goto to c: - right click and New File - call it test.udl and then run the command above:
            'C:\Windows\syswow64\rundll32.exe "C:\Program Files (x86)\Common Files\System\Ole DB\oledb32.dll",OpenDSLFile C:\test.udl

            Call LogErrors(PROJECTNAME, " - Main", "Problem with Connectin String so Exit", EventLogEntryType.Error)
            Exit Sub

        End If
        '=====================================
        ' Call Each Table Main in Sequence
        '=====================================
        Console.WriteLine("Start Processing MAS to SLX Pricing Changes")
        tarCustomerMain()
        tarNationalAcctMain()
        tarNationalAcctLevelMain()
        timNatAcctProdGrpPrcMain()
        timPriceBreakMain()
        timPriceSheetMain()
        timPricingMain()
        timProdPriceGroupMain()
        timProdPriceGroupPriceMain()
        timWarehouseMain()
        timPriceGroupPriceMain()
        tarCustAddrMain()
        TACNATIONALACCTITEMEXCMain()
        TACInventoryItemEXCMain()

            Call LogErrors(PROJECTNAME, " - Main", "Process Completed", EventLogEntryType.Information)
        Catch ex As Exception
            Dim strReport As String
            strReport = "<style>body{font-family: Verdana, Arial, Helvetica, sans-serif} td{font-weight: 550}</style>"
            strReport = strReport & " <body>"
            strReport = strReport & " <center><font size=+3 color=#000099>PRICING Sync Crashed</font><br><font size=-2 color=#0000CC>" & Now.ToString & "</font></center>"
            strReport = strReport & " Product Sync has Process over the number of threshold number of changes there maybe a problem and this should be looked into and the processed stopped to ensure a large sync is not pushed out.<br><br>"
            strReport = strReport & "    <br><sup>*</sup><Font size=-1> Please look into this at your earliest convenience  </font>"
            strReport = strReport & " </body>"
            SendSimpleEmail(My.Settings.SendtoEmails, strReport, "Product Sync Issue Suspected" & Now.ToString(), "")
        End Try

    End Sub
    Private Sub SendSimpleEmail(ByVal EmailAddress As String, ByVal HtmlBody As String, ByVal Subject As String, ByVal AttachmentPath As String)
        '============================================================
        ' GET Mail  CREDENTIALS
        '============================================================

        'tmpRecpient.Email 
        'Send Email 
        Dim MyMailMessage As New System.Net.Mail.MailMessage()

        'From requires an instance of the MailAddress type"

        MyMailMessage.From = New System.Net.Mail.MailAddress(My.Settings.smtpUser, "EAB Notifications")

        ' Add Read Reciept Headers
        '============================================================================================================
        '
        'MyMailMessage.Headers.Add("Disposition-Notification-To", "<jaymeh@xitechnologies.com>")
        '-------------------------------------------------------------------------------------------------------------

        MyMailMessage.To.Add(EmailAddress)
        MyMailMessage.Subject = Subject


        MyMailMessage.Body = HtmlBody
        MyMailMessage.IsBodyHtml = True

        If AttachmentPath <> "" Then
            MyMailMessage.Attachments.Add(New System.Net.Mail.Attachment(AttachmentPath))
        End If
        '=========================================================================================================
        ' Send the Email
        '=========================================================================================================
        Dim SMTPServer As New System.Net.Mail.SmtpClient()
        SMTPServer.UseDefaultCredentials = False
        SMTPServer.Port = Convert.ToInt32(My.Settings.smtpPort)
        'Hard Coded Server Port
        SMTPServer.Host = My.Settings.smtpHost
        SMTPServer.Credentials = New System.Net.NetworkCredential(My.Settings.smtpUser, My.Settings.smtpPassword)
        SMTPServer.EnableSsl = True

        Try

            SMTPServer.Send(MyMailMessage)
            'MessageBox.Show(ex.Message)
        Catch ex As Exception
            Console.WriteLine(ex.Message)
        End Try

    End Sub




End Module
