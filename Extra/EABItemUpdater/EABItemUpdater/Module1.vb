Imports System.Data.OleDb

Module Module1

    Sub Main()
        '=====================================================================================================================================
        ' Ensure the Commandline args are Enclosed by Double Quotes othersize it parses the Connection string into separate Arguments"
        '=====================================================================================================================================
        Dim s() As String = System.Environment.GetCommandLineArgs()
        If (s.Length = 1) Then
            'Means there is only 1 Argument so Not enough to Run the App.
            Console.WriteLine("Not Enough Args")
            Exit Sub
        End If
        Console.WriteLine("============ Started ==========================")


        '======================================================
        ' Get Connection String and Validation Type from Args
        '======================================================
        Dim _strCon As String = ""
        Dim _Accountid As String = ""
        Dim _RoutinType As String = ""
        Dim _Args As String = ""

        ParseCommandLine(s(1), _RoutinType, _strCon, _Args)

        WriteStatusLog("Started RoutineType " & _RoutinType & " " & Now.ToString)
        'WriteStatusLog(s(1))

        '=========================================================
        ' Get Users AccountManagerId's WareHouse 
        '=========================================================

        '==========================================================
        ' Get Current StockCard Items
        '==========================================================
        Dim SQL = ""
        Select Case _RoutinType
            Case "All"
                ProcessAllAccounts(_strCon)
            Case "Account"
                Dim separators2 As String = "="
                Dim args2() As String = _Args.Split(separators2.ToCharArray)
                If args2(0) = "-Accountid" Then
                    '============================================================
                    ' -a means Account switch next Parameter is the Accountid
                    '=============================================================
                    _Accountid = args2(1)
                End If
                ProcessAccount(_Accountid, _strCon)

            Case "CopyStockCard"
                Dim strArgs As String = _Args.Replace("-CopyStockCard", String.Empty) ' Clean out the Copy Part
                Dim separators2 As String = ","
                Dim args2() As String = strArgs.Split(separators2.ToCharArray)
                If args2.Length = 2 Then ' Check there is 2 items
                    Dim strSourceAccountid As String = Trim(args2(0))
                    strSourceAccountid = Trim(strSourceAccountid.Replace("""", String.Empty))
                    Dim strTargetAccountid As String = Trim(args2(1))
                    ProcessCopyStockCardItems(strSourceAccountid, strTargetAccountid, _strCon)
                End If


        End Select

        WriteStatusLog("Finnished RoutineType " & _RoutinType & " " & Now.ToString)




    End Sub
    Sub ProcessAllAccounts(ByVal strConn As String)
        Dim objConn As New OleDbConnection(strConn)
        Dim Accountid As String
        
            Dim SQL As String
            SQL = "  SELECT DISTINCT sysdba.ACCOUNT.ACCOUNTID"
            SQL = SQL & " FROM         sysdba.ACCOUNT INNER JOIN"
            SQL = SQL & "                      sysdba.STOCKCARDITEMS ON sysdba.ACCOUNT.ACCOUNTID = sysdba.STOCKCARDITEMS.ACCOUNTID"
        Try
            objConn.Open()
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim objReader As OleDbDataReader = objCMD.ExecuteReader()
            If objReader.HasRows Then
                Do While objReader.Read()
                    Accountid = objReader.GetString(0)

                    ProcessAccount(Accountid, strConn) ' Process all the StockCards For all the Accounts

                Loop
            Else


            End If
            objReader.Close()
        Catch ex As Exception
            Dim EventMessage As String
            EventMessage = ex.Message & Chr(10) & Chr(13) & "In Function " & "GetAccountInfo"
            WriteToEventLog(EventMessage, , Diagnostics.EventLogEntryType.Error)
            'MsgBox(ex.Message)
        Finally
            If objConn.State = Data.ConnectionState.Open Then objConn.Close()
        End Try
    End Sub

    Sub ProcessAccount(ByVal Accountid As String, ByVal strConn As String)
       
            Dim SQL As String
        SQL = " Select  s.STOCKCARDITEMSID"
            SQL = SQL & " FROM         sysdba.STOCKCARDITEMS AS s INNER JOIN "
            SQL = SQL & "                      sysdba.PRODUCT AS p1_ ON s.PRODUCTID = p1_.PRODUCTID"
            SQL = SQL & " WHERE     (s.ACCOUNTID = '" & Accountid & "') AND (NOT (p1_.STATUS = 'Deleted'))"
            'MsgBox(SQL)
        Dim i As Integer = 0
        strConn = strConn.Replace("Extended Properties=" & Chr(34) & "PORT=1706;LOG=ON;TIMEZONE=NONE;SVRCERT=12345;ACTIVITYSECURITY=OFF" & Chr(34), "Extended Properties=" & Chr(34) & "PORT=1706;LOG=ON;CASEINSENSITIVEFIND=ON;AUTOINCBATCHSIZE=1;SVRCERT=;")

        '===================================================
        Dim objConn As New OleDbConnection(strConn)

       
        Try
            objConn.Open()
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim objReader As OleDbDataReader = objCMD.ExecuteReader()
            If objReader.HasRows Then
                Do While objReader.Read()
                    i = i + 1
                    AddEditSalesOrderItemFromStockCardItem(objReader.GetString(0), strConn, i)
                    Console.WriteLine("Processes line " & i)
                Loop
               
            End If
            objReader.Close()
        Catch ex As Exception
            'Dim EventMessage As String
            'EventMessage = ex.Message & Chr(10) & Chr(13) & "In Class CreateTicket " & "FindContactIDFromEmail Line 281"
            'WriteToEventLog(EventMessage, , Diagnostics.EventLogEntryType.Error)
        Finally
            If objConn.State = Data.ConnectionState.Open Then objConn.Close()
        End Try

    End Sub

    Sub ProcessCopyStockCardItems(ByVal SourceAccountid As String, ByVal TargetAccountid As String, ByVal strConn As String)
    
        Dim strSQL As String = "SELECT * FROM STOCKCARDITEMS WHERE ACCOUNTID ='" & SourceAccountid & "'"        
        Dim i As Integer = 0
        strConn = strConn.Replace("Extended Properties=" & Chr(34) & "PORT=1706;LOG=ON;TIMEZONE=NONE;SVRCERT=12345;ACTIVITYSECURITY=OFF" & Chr(34), "Extended Properties=" & Chr(34) & "PORT=1706;LOG=ON;CASEINSENSITIVEFIND=ON;AUTOINCBATCHSIZE=1;SVRCERT=;")

        '===================================================
        Dim objConn As New OleDbConnection(strConn)


        Try
            objConn.Open()
            Dim objCMD As OleDbCommand = New OleDbCommand(strSQL, objConn)
            Dim objReader As OleDbDataReader = objCMD.ExecuteReader()
            If objReader.HasRows Then
                Do While objReader.Read()
                    i = i + 1
                    AddEditStockCardItem(objReader.GetString(0), TargetAccountid, strConn)

                    Console.WriteLine("Processes line " & i)
                Loop

            End If
            objReader.Close()
        Catch ex As Exception
            'Dim EventMessage As String
            'EventMessage = ex.Message & Chr(10) & Chr(13) & "In Class CreateTicket " & "FindContactIDFromEmail Line 281"
            'WriteToEventLog(EventMessage, , Diagnostics.EventLogEntryType.Error)
        Finally
            If objConn.State = Data.ConnectionState.Open Then objConn.Close()
        End Try                  

    End Sub



End Module
