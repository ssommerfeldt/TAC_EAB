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
        ParseCommandLine(s(1), _RoutinType, _strCon, _Accountid)
        WriteStatusLog("Started RoutineType " & _RoutinType & " " & Now.ToString)

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
                ProcessAccount(_Accountid, _strCon)

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



End Module
