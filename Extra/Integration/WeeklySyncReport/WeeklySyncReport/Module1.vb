Imports System.Data.OleDb

Module Module1

    Sub Main()
        '========================================================================================================
        ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        ''' Name:	WeeklySyncReport.vbs
        ''' Author:	Mike Spragg (c) E1 Business Limited 2004
        ''' Date:	05-Feb-2004
        ''' Version:	1.2
        ''' Purpose:	Generate weekly SalesLogix sync report in HTML format and e-mail to manager
        '''
        ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        '========================================================================================================
        TruncateFileTable()

        ' Create the message header
        Dim strReport As String
        strReport = "<style>body{font-family: Verdana, Arial, Helvetica, sans-serif} td{font-weight: 550}</style>"
        strReport = strReport & "<body><center><font size=+3 color=#000099>SalesLogix Sync Report</font><br><font size=-2 color=#0000CC>" & Now() & "</font></center>"
        strReport = strReport & "Those highlighted in red have not synced in over 7 days. <br> Those not highlighted have files waiting but have synced within the last 7 days.<br>  Names not appearing do not have any files waiting.<br><br>"
        strReport = strReport & "<p><table width=100% border=1><tr><th>Name</th><th>Oldest File Waiting</th><th>No. Files</th><th>Approx Sync Time<sup>*</sup></th><th>Total Size MB</th></tr>"

        ' make a reference to a directory

        'Create Files system object
        Dim FSO As Object = CreateObject("Scripting.FileSystemObject")

        ' Go through the SLX outfiles folder and check the dates of each file waiting to be sent to users
        Dim fOutfiles As Object = FSO.GetFolder(My.Settings.FTPFileLocation) '("\\mike1200\c$\SLXData.NET\slxnet\Outfiles")



        ' ------- Primary Outfiles -------
        Dim i As Integer = 0
        ' Go through the Outfiles Dir for sync server 1 and populate the SYNC_REPORT Table
        For Each f In FOutfiles.Files
            ExecuteInsertSQL("INSERT INTO SYNC_REPORT VALUES ('" & Left(f.Type, 4) & "', " & ToMB(f.size) & ",  '" & f.DateLastModified & "')")
            Console.WriteLine("Processing File " & i)
            i = i + 1
        Next


        ''---------------------------------------------------------------------------------------------------------------------------------
        '' ------- 2nd/3rd etc Outfiles e.g. for FTP Sync and multiple outfile directories - Remove ' and duplicate where necessary -------
        ''---------------------------------------------------------------------------------------------------------------------------------

        '' Go through the Outfiles folder on sync server 2
        '' Set fOutfiles = FSO.GetFolder("\\mike1200\c$\SLXData.NET\slxnet\Outfiles2")

        '' Go through the Outfiles Dir for additional syncservers or FTP sync files and populate the SYNC_REPORT Table
        '' for each f In FOutfiles.Files
        ''	dbConn.Execute "INSERT INTO SYNC_REPORT VALUES ('" &  left(f.Type,4) & "', " & toMB(f.size) & ", convert(datetime, '" & f.DateLastModified & "',103))"
        '' Next


        '' Compare the users site codes to the files waiting and get totals.
        'rsCode = CreateObject("ADODB.Recordset")

        Dim strSQL As String
        strSQL = "SELECT     i.USERNAME AS 'Users', MIN(t.filedate) AS 'LAST_SYNC', COUNT(t.filedate) AS 'Files', SUM(t.filesize) AS 'Size'"
        strSQL = strSQL & " FROM         sysdba.USERINFO AS i INNER JOIN"
        strSQL = strSQL & "                       sysdba.USERSECURITY AS u INNER JOIN"
        strSQL = strSQL & "                       SYNC_REPORT AS t ON u.PRIMARYSITE = t.sitecode ON i.USERID = u.USERID"
        strSQL = strSQL & " GROUP BY i.USERNAME"
        strSQL = strSQL & " ORDER BY 'Users'"

        Dim objConn As New OleDbConnection(My.Settings.strSLXNative)
        Dim strRow As String = ""
        Try
            objConn.Open()
            Dim objCMD As OleDbCommand = New OleDbCommand(strSQL, objConn)
            Dim objReader As OleDbDataReader = objCMD.ExecuteReader()
            If objReader.HasRows Then
                Do While objReader.Read()
                    ' Set the background colour to red if the oldest file is older then 7 days
                    If DateDiff("d", objReader.GetDateTime(1), Now) > 7 Then
                        strRow = "<tr bgcolor=#FF6666>"
                    Else
                        strRow = "<tr>"
                    End If

                    ' create a table row from the record info
                    strRow = strRow & "<td><b>" & objReader.GetString(0) & "</b></td><td align=right>" & objReader.GetDateTime(1) & "</td><td align=right>" & objReader.GetInt32(2) & "</td><td align=right>~ " & EDT(objReader.GetValue(3)) & " min</td><td align=right> " & Math.Round(objReader.GetValue(3)) & " MB</td></tr>"

                    ' Add the row to the report
                    strReport = strReport & strRow

                Loop
            Else


            End If
            objReader.Close()
        Catch ex As Exception
            Console.WriteLine(ex.Message)

            'MsgBox(ex.Message)
        Finally
            If objConn.State = Data.ConnectionState.Open Then objConn.Close()
        End Try

      


        ' Add the message footer to the report
        strReport = strReport & "</table><br><sup>*</sup><Font size=-1> The <b>Approx Sync Time</b> assumes a connection speed of at least 1.024 Mbps and does not include the time it will take for the remote user to send their changes.</font></body>"

        SendSimpleEmail(My.Settings.SendtoEmails, strReport, " Remote Sync Report" & Now.ToString(), "")

    End Sub

    Function ToMB(ByVal lngSize)
        ' Convert the size from bytes to MegaBytes and round to round to no decimals
        ToMB = Math.Round(lngSize / 1048576, 3)

    End Function


    Function EDT(ByVal lngSize As Long) As Long
        ' Estimate the download time
        '200 Mb = 200(1024 kb) = 204800 kb
        'You just have to divide
        '204800 Mb / 140 Kb/s = 1462 seconds
        'about 24.3 minutes 
        Try


            Dim size As Long
            size = lngSize * 1024

            Dim PerSecond As Long
            PerSecond = size / 140

            Dim retrunValue As Long
            retrunValue = PerSecond / 60
            'EDT = Math.Round(CDbl(lngSize) * 15, 0)
            If Math.Round(retrunValue) = 0 Then
                Return 1

            Else
                Return Math.Round(retrunValue)
            End If

        Catch ex As Exception
            Return 1
        End Try

    End Function

    Public Sub TruncateFileTable()
        Dim sql As String = "Delete from sync_Report" 'TRUNCATE TABLE SYNC_REPORT"

        Using conn As New OleDbConnection(My.Settings.strSLXNative)
            conn.Open()
            Using cmd As New OleDbCommand(sql, conn)

                cmd.ExecuteNonQuery()

            End Using
        End Using

    End Sub

    Public Sub ExecuteInsertSQL(ByVal SQL As String)
        ' Dim sql As String = "TRUNCATE sysdba.TABLE SYNC_REPORT"

        Using conn As New OleDbConnection(My.Settings.strSLXNative)
            conn.Open()
            Using cmd As New OleDbCommand(sql, conn)

                cmd.ExecuteNonQuery()

            End Using
        End Using

    End Sub
    Private Sub SendSimpleEmail(ByVal EmailAddress As String, ByVal HtmlBody As String, ByVal Subject As String, ByVal AttachmentPath As String)
        '============================================================
        ' GET Mail  CREDENTIALS
        '============================================================
       
        'tmpRecpient.Email 
        'Send Email 
        Dim MyMailMessage As New System.Net.Mail.MailMessage()

        'From requires an instance of the MailAddress type"

        MyMailMessage.From = New System.Net.Mail.MailAddress(My.Settings.smtpUser, "SyncReport Notifications")

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
