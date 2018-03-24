Imports System.Data.OleDb

Module Module1

    Sub Main()

        '=====================================================================
        ' Process Sales Order Monitor
        '=====================================================================
        CheckLastRunOfSales_Order_Integration()

    End Sub

    Sub CheckLastRunOfSales_Order_Integration()
        ' Get the ID of the Last Run
        Dim LastRunId As String = GetField("TACSYNCJOBID", "sysdba.VLastTACSyncJobRun", "")
        Dim MyDataRow As DataRow = GetDataRow("Select * from sysdba.TACSYNCJOB", "TACSYNCJOBID", LastRunId)
        Dim lastRunDate As Date
        lastRunDate = CDate(MyDataRow("ENDTIME"))

        If lastRunDate < Now.AddMinutes(-90) Then
            '===================================
            ' Something is wrong  SEND an Email
            '===================================
            Dim strReport As String
            strReport = "<style>body{font-family: Verdana, Arial, Helvetica, sans-serif} td{font-weight: 550}</style>"
            strReport = strReport & " <body>"
            strReport = strReport & " <center><font size=+3 color=#000099>SALES ORDER INTEGRATION MASS TO SLX NOT RUNNING</font><br><font size=-2 color=#0000CC>" & Now.ToString & "</font></center>"
            strReport = strReport & " last Status Recorded was = " & MyDataRow("STATUS") & " <br>  completed at " & lastRunDate.ToString & " .<br><br>"
            strReport = strReport & "    <br><sup>*</sup><Font size=-1> Please look into this at your earliest convenience  </font>"
            strReport = strReport & " </body>"
            SendSimpleEmail(My.Settings.SendtoEmails, strReport, "EAB SALESORDER SYNC ISSUE" & Now.ToString(), "")
        End If
        
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
