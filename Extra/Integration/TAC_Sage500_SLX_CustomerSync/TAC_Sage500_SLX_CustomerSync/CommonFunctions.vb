
Imports System.IO
Imports System.Data.SqlClient

Module CommonFunctions

    Public Sub LogErrors(ByVal Project As String, ByVal Source As String, ByVal Entry As String, ByVal LogEntryType As System.Diagnostics.EventLogEntryType)
        Dim elog As New EventLog
        elog.Source = Source
        elog.WriteEntry(Project & " " & Entry, LogEntryType)
        elog.Dispose()
    End Sub

    Public Function GetConnection(ByVal ProjectName As String, ByVal FileName As String) As String
        '=========================================================================
        ' Get Location of the Files
        '=========================================================================
        Dim sb As New System.Text.StringBuilder
        'build the path\filename depending on the location of the config file
        'use "\documents and settings\All Users\application data" for the config file directory
        'sb.Append("C:\TAC\INTEGRATION\")
        ''add the product name
        'sb.Append("\")
        ''sb.Append(Application.Project)
        'sb.Append(ProjectName)
        ''create the directory if it isn't there
        'If Not IO.Directory.Exists(sb.ToString) Then
        '    IO.Directory.CreateDirectory(sb.ToString)
        'End If
        ''finish building the file name
        'sb.Append("\")
        sb.Append(System.AppDomain.CurrentDomain.BaseDirectory() & "\" & FileName)
        'Call LogErrors(ProjectName, " TAC_Sage500_SLX_CustomerSync", "Settings File --> " & sb.ToString, EventLogEntryType.Information)
        'Call LogErrors(ProjectName, " TAC_Sage500_SLX_CustomerSync", "Settings File --> " & System.AppDomain.CurrentDomain.BaseDirectory() & sb.ToString, EventLogEntryType.Information)


        '===================================================================
        If System.IO.File.Exists(sb.ToString) Then
        Else
            'MsgBox("Create the File")
            Dim objFile As System.IO.FileStream '(sb.ToString, IO.FileMode.Truncate, FileAccess.ReadWrite) 
            objFile = System.IO.File.Create(sb.ToString)
            objFile.Close()
            objFile = Nothing
        End If
        '===================================================================
        ' Read the File
        '====================================================================

        Try
            Dim ConnectString As String = ""
            ' Create an instance of StreamReader to read from a file.
            Dim sr As StreamReader = New StreamReader(sb.ToString)
            Dim line As String
            ' Read and display the lines from the file until the end of the file is reached.
            ' UDL files contain 3 lines the third is the connection string
            ' You should ensure that the "Allow saving passwords is selected" as a valid password is needed
            Dim i As Integer = 1
            Do
                line = sr.ReadLine()

                If i = 3 Then
                    ConnectString = line
                End If
                i = i + 1 ' Increment the counter
            Loop Until line Is Nothing
            sr.Close()
            'Call LogErrors(ProjectName, " TAC_Sage500_SLX_CustomerSync", ConnectString, EventLogEntryType.Information)

            Return ConnectString

        Catch Ex As Exception

            'Call LogErrors(ProjectName, " TAC_Sage500_SLX_CustomerSync", Ex.Message, EventLogEntryType.Error)

            Return ""
        End Try
    End Function

    Private Sub GetRWPass()

        'Dim objRS As New ADODB.Recordset

        'RWPass = ""

        'Try
        '    'Call slx_RWPass to return the Read/Write password set in the Connection Manager for that database
        '    objRS.Open("slx_RWPass()", strConn)
        '    RWPass = objRS.Fields(0).Value

        '    'declare new class variable to remove encrypted password
        '    Dim objslxrw As New SLXRWEL.SLXRWEOBJClass
        '    RWPass = objslxrw.Remove(RWPass)
        '    objRS.Close()

        'Catch ex As Exception
        '    RWPass = ""
        'Finally
        '    If objRS.State = ADODB.ObjectStateEnum.adStateOpen Then
        '        objRS.Close()
        '        objRS = Nothing
        '    End If
        'End Try
    End Sub

    Private Sub GetUserID()
        ' Dim objRS As New ADODB.Recordset
        'Try
        '    'Get and save the user information
        '    objRS.Open("slx_getUserInfo()", strConn)
        '    strUserID = objRS.Fields(0).Value

        'Catch ex As Exception
        '    LogErrors("PartsHandlerExtractor - GetUserID", ex.Message, EventLogEntryType.Error)

        'Finally
        '    If objRS.State = ADODB.ObjectStateEnum.adStateOpen Then
        '        objRS.Close()
        '        objRS = Nothing
        '    End If
        'End Try
    End Sub

    Public Function GetNewSLXID(ByVal TableName As String, ByVal strSLXConnectionString As String) As String
        Dim objRS As New ADODB.Recordset

        Try
            'Get a new id for a table and return that id
            objRS.Open("SLX_DBIDS(" & TableName & ",1)", strSLXConnectionString)
            GetNewSLXID = objRS.Fields(0).Value
        Catch ex As Exception
            GetNewSLXID = ""
            LogErrors("General", " - GetNewSLXID", ex.Message, EventLogEntryType.Error)
        Finally
            If objRS.State = ADODB.ObjectStateEnum.adStateOpen Then
                objRS.Close()
                objRS = Nothing
            End If
        End Try
    End Function

    Public Function ReplaceNull(ByVal value As Object, ByVal type As System.Type)
        If IsDBNull(value) Then
            Select Case type.FullName
                Case "System.String"
                    value = ""
                Case "System.Single"
                    value = 0
                Case "System.Int32"
                    value = 0
                Case "System.Double"
                    value = 0
                Case "System.DateTime"
                    value = Nothing
            End Select
            Return value
        Else
            Return value
        End If
    End Function

    Public Function SplitFlag(ByVal flag As String, ByVal index As Integer) As String
        Try
            SplitFlag = Trim(flag.Chars(index))
        Catch ex As Exception
            SplitFlag = ""
        End Try
    End Function

    Public Function ReplaceString(ByVal str As String) As String
        If str = "" Then
            ReplaceString = ""
        Else
            ReplaceString = Trim(Replace(str, "'", "''"))
        End If
    End Function

    Public Function CleanBulkLoadNativeSQLConnectionString(ByVal strNativeConnection) As String
        'Dim i As Integer
        Dim strSQLConnString As String = ""  'Need to Modify the OleDB Connection String to remove the Provider Portion because
        ''Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;
        'strSQLConnString = strNativeConnection   ' The SQLClient Assumes your using the SQL server Provider and it will error if you have it there.
        ''Dim i As Integer = 0
        'i = InStr(strSQLConnString, ";")
        'strSQLConnString = Mid(strSQLConnString, i + 1)
        'Return strSQLConnString
        '====================================================
        Dim strDataSource As String = ""
        Dim strUserid As String = ""
        Dim strPassword As String = ""
        Dim strIntialCatalog As String = ""
        ' Returns an array containing "Look", "at", and "these!". 
        Dim SQLConnectionPartsArray() As String = Split(strNativeConnection, ";")
        Dim connBuilder As New SqlConnectionStringBuilder()
        For Each strPart As String In SQLConnectionPartsArray
            '=======================================
            ' PASSWORD
            '=======================================
            If strPart.Contains("Password=") Then
                strPassword = strPart
                connBuilder.Password = strPassword.Replace("Password=", "") ' Clean Out the Password
            End If
            '=======================================
            ' Userid
            '=======================================
            If strPart.Contains("User ID=") Then
                strUserid = strPart
                connBuilder.UserID = strUserid.Replace("User ID=", "")
            End If
            '=======================================
            ' Initial Catalog
            '=======================================
            If strPart.Contains("Initial Catalog=") Then
                strIntialCatalog = strPart
                connBuilder.InitialCatalog = strIntialCatalog.Replace("Initial Catalog=", "")
            End If
            '=======================================
            ' Data Source
            '=======================================
            If strPart.Contains("Data Source=") Then
                strDataSource = strPart
                connBuilder.DataSource = strDataSource.Replace("Data Source=", "")
            End If

        Next
        connBuilder.PersistSecurityInfo = "True"




        strSQLConnString = connBuilder.ConnectionString
        Return strSQLConnString
    End Function





End Module
