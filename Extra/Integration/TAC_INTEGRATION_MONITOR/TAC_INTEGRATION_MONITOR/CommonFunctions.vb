
Imports System.IO
Imports System.Data.SqlClient
Imports System.Data.OleDb
Imports System.Text.RegularExpressions

Module CommonFunctions

    Public Sub LogErrors(ByVal Project As String, ByVal Source As String, ByVal Entry As String, ByVal LogEntryType As System.Diagnostics.EventLogEntryType)
        Dim elog As New EventLog
        elog.Source = Source
        'elog.WriteEntry(Project & " " & Entry, LogEntryType)
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
        'sb.Append(System.IO.get
        'add the product name
        'sb.Append("\")
        'sb.Append(Application.Project)
        'sb.Append(ProjectName)
        'create the directory if it isn't there
        'If Not IO.Directory.Exists(sb.ToString) Then
        'IO.Directory.CreateDirectory(sb.ToString)
        'End If
        'finish building the file name
        'sb.Append("\")
        'sb.Append(FileName)
        sb.Append(System.AppDomain.CurrentDomain.BaseDirectory() & "\" & FileName)

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

            Return ConnectString

        Catch Ex As Exception
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

    Public Function GetSiteCode(ByVal Userid As String, ByVal SLXConnectionString As String) As String
        Dim ReturnSiteCode As String = ""
        Dim oConn As New OleDbConnection(SLXConnectionString)
        Dim SQL As String
        SQL = "SELECT SITECODE FROM SYSTEMINFO "
        Try
            oConn.Open()
            Dim oCmd As New OleDbCommand(SQL, oConn)
            ReturnSiteCode = oCmd.ExecuteScalar
        Catch ex As Exception
            'MsgBox(ex.Message)
        Finally
            If oConn.State = Data.ConnectionState.Open Then oConn.Close()
        End Try
        Return Trim(ReturnSiteCode)
    End Function
    Public Function IsHostDatabase(ByVal SLXConnectionString As String) As Boolean
        Dim strDBType As String = ""
        Dim blnReturn As Boolean = False
        Dim oConn As New OleDbConnection(SLXConnectionString)
        Dim SQL As String
        SQL = "SELECT DbType FROM SYSTEMINFO"
        Try
            oConn.Open()
            Dim oCmd As New OleDbCommand(SQL, oConn)
            strDBType = oCmd.ExecuteScalar

            If strDBType = "1" Then
                blnReturn = True ' Means Host database
            Else
                blnReturn = False
            End If

        Catch ex As Exception
            'MsgBox(ex.Message)
        Finally
            If oConn.State = Data.ConnectionState.Open Then oConn.Close()
        End Try
        Return blnReturn
    End Function

    Public Function GetUsersSiteCode(ByVal Userid As String, ByVal SLXConnectionString As String) As String
        Dim ReturnSiteCode As String = ""
        Dim oConn As New OleDbConnection(SLXConnectionString)
        Dim SQL As String
        SQL = "SELECT PRIMARYSITE FROM USERSECURITY WHERE USERID ='" & Userid & "'"
        Try
            oConn.Open()
            Dim oCmd As New OleDbCommand(SQL, oConn)
            ReturnSiteCode = oCmd.ExecuteScalar
        Catch ex As Exception
            'MsgBox(ex.Message)
        Finally
            If oConn.State = Data.ConnectionState.Open Then oConn.Close()
        End Try
        Return Trim(ReturnSiteCode)
    End Function

    Function GetKeyBase(ByVal SLXConnectionString As String, ByVal SITECODE As String) As String
        Dim Conn As New OleDbConnection(SLXConnectionString)
        ' Open connection
        If Conn.State <> Data.ConnectionState.Open Then
            Conn.Open()
        End If
        Dim SQL As String
        Dim TempBlob As Byte() = Nothing
        SQL = "SELECT data, DATALENGTH(data) as Size FROM SITEOPTIONS WHERE SITECODE = '" & SITECODE & "'"
        Dim returnString As String = ""
        Try
            Dim SQLCommand As New OleDbCommand(SQL, Conn)
            ' Construct a SQL string and a connection object
            Dim cmd As OleDbCommand = New OleDbCommand(SQL, Conn)
            Dim myAdapter As New OleDbDataAdapter(cmd)
            Dim ds As New Data.DataSet
            myAdapter.Fill(ds, "BLOB")
            Dim myBLOB(CType(ds.Tables("BLOB").Rows(0).Item(1), Integer) - 1) As Byte
            'Create a Byte array of the Length of the BLOB Field
            'Create a memory stream object with an initial capacity of the size of the byte array 
            Dim ms As New MemoryStream(myBLOB.Length)
            CType(ds.Tables("BLOB").Rows(0).Item(0), Array).CopyTo(myBLOB, 0)
            ' Write the contents of the byte array to memory (the MemoryWriter, ms, object). 
            ms.Write(myBLOB, 0, myBLOB.Length)
            ms.Close()
            ms = Nothing
            Dim strTemp As String = ""
            TempBlob = myBLOB
            Dim i
            Dim BlobIndexvalue As Integer
            For i = 0 To myBLOB.Length - 1
                BlobIndexvalue = CInt(myBLOB(i))
                If BlobIndexvalue < 32 Or BlobIndexvalue > 126 Then 'No Printable Text
                    BlobIndexvalue = 95
                End If
                strTemp = strTemp & Chr(BlobIndexvalue)
            Next

            Dim sData As String = New System.Text.ASCIIEncoding().GetString(TempBlob)   ' ASCIIEncoding().GetString(CType(drow(DATA_COLUMN), Byte()))
            returnString = strTemp

            Dim Countpattern As String = "KeyBase_"
            Dim CountMatchObj As Match
            CountMatchObj = Regex.Match(strTemp, Countpattern, RegexOptions.IgnoreCase)
            If CountMatchObj.Success Then
                'MsgBox("Found at " & CountMatchObj.Index)
                Dim myCharArray As Char()
                myCharArray = strTemp.ToCharArray
                Dim KeyBase As String
                KeyBase = myCharArray(CountMatchObj.Index + 9) & myCharArray(CountMatchObj.Index + 10)
                returnString = KeyBase
            Else
                returnString = "A0"
            End If

        Catch ex As Exception
            'MsgBox(ex.Message & "  " & ex.TargetSite.Name.ToString)
        End Try
        Return Trim(returnString)

    End Function

    Public Function ConvertToTicketID(ByVal SiteCode As String, ByVal KeyBase As String, ByVal PrettyKeySuffix As String) As String
        Dim iPosition As Integer
        iPosition = InStrRev(PrettyKeySuffix, "-", , CompareMethod.Text)
        Dim strPrettySuffix As String
        Dim iLength As Integer
        iLength = PrettyKeySuffix.Length - iPosition
        strPrettySuffix = Mid(PrettyKeySuffix, iPosition + 1, iLength)
        Dim TicketIDSuffix As String
        TicketIDSuffix = dec2baseN(CInt(strPrettySuffix), 36)
        If TicketIDSuffix.Length < 5 Then
            Dim i As Integer
            For i = 0 To (5 - TicketIDSuffix.Length) - 1
                'Add a Zero to the Beginning
                TicketIDSuffix = "0" & TicketIDSuffix
            Next
        End If

        Dim TicketID As String
        TicketID = "t" & SiteCode & KeyBase & TicketIDSuffix
        Return TicketID
    End Function
    Function baseN2dec(ByVal value, ByVal inBase)
        'Converts any base to base 10

        Dim strValue, i, x, y

        strValue = StrReverse(CStr(UCase(value)))

        For i = 0 To Len(strValue) - 1
            x = Mid(strValue, i + 1, 1)
            If Not IsNumeric(x) Then
                y = y + ((Asc(x) - 65) + 10) * (inBase ^ i)
            Else
                y = y + ((inBase ^ i) * CInt(x))
            End If
        Next

        baseN2dec = y

    End Function
    Function dec2baseN(ByVal value, ByVal outBase)
        'Converts base 10 to any base

        Dim q 'quotient
        Dim r 'remainder
        Dim m 'denominator
        Dim y 'converted value

        m = outBase
        q = value

        Do
            r = q Mod m
            q = Int(q / m)

            If r >= 10 Then
                r = Chr(65 + (r - 10))
            End If

            y = y & CStr(r)

        Loop Until q = 0

        dec2baseN = StrReverse(y)

    End Function

    Function GetField(ByVal Field As String, ByVal Table As String, ByVal Where As String) As String
        Dim sql As String = String.Format("select {0} from {1} where {2}", Field, Table, (If(Where.Equals(String.Empty), "1=1", Where)))
        Using conn As OleDbConnection = New OleDbConnection(My.Settings.SLXNativeConstr)
            conn.Open()
            Using cmd As OleDbCommand = New OleDbCommand(sql, conn)
                Dim fieldval As Object = cmd.ExecuteScalar()
                Return fieldval
            End Using
        End Using
    End Function

    Function GetDataRow(ByVal SQL As String, ByVal IDName As String, ByVal ID As String) As DataRow
        Dim i As Integer = 0
        '===================================================
        Dim SiteID As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(My.Settings.SLXNativeConstr)
        Dim retunRow As DataRow
        Try
            objConn.Open()
            Dim strSQL As String
            strSQL = SQL & " WHERE " & IDName & "='" & ID & "'"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(strSQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                retunRow = row
            Next row

        Catch ex As Exception

        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
        Return retunRow
    End Function

   
  

End Module

