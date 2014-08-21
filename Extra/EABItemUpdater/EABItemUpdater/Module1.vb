Imports System.Data.OleDb

Module Module1

    Sub Main()
        Try

       
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


        Try
                ParseCommandLine(s(1), _RoutinType, _strCon, _Args)
                'WriteStatusLog(_Args & _strCon)
        Catch ex As Exception
            WriteStatusLog(ex.Message.ToString & " " & Now.ToString)
        End Try


        WriteStatusLog("Started RoutineType " & _RoutinType & " " & Now.ToString)
        WriteStatusLog(s(1))

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
                Try
                    Dim separators2 As String = "="
                    Dim args2() As String = _Args.Split(separators2.ToCharArray)
                    If args2(0) = "-Accountid" Then
                        '============================================================
                        ' -a means Account switch next Parameter is the Accountid
                        '=============================================================
                        _Accountid = args2(1)
                    End If
                    ProcessAccount(_Accountid, _strCon)
                Catch ex As Exception
                    WriteStatusLog(ex.Message.ToString & " " & Now.ToString)
                End Try


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
        Catch ex As Exception
            'MsgBox(ex.Message & ex.InnerException.ToString)
        End Try




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
       

        '====================================================================================
        ' New Functionality to only have a single WareHouse on the StockCard but 
        '  The Order Needs to have all the Products for AccountManagers WareHouses
        '====================================================================================

      
        Dim i As Integer = 0
        strConn = strConn.Replace("Extended Properties=" & Chr(34) & "PORT=1706;LOG=ON;TIMEZONE=NONE;SVRCERT=12345;ACTIVITYSECURITY=OFF" & Chr(34), "Extended Properties=" & Chr(34) & "PORT=1706;LOG=ON;CASEINSENSITIVEFIND=ON;AUTOINCBATCHSIZE=1;SVRCERT=;")
        '===================================================
        'CleanUpExisting(Accountid, strConn)  This causes problems as it is very commmon to have multiple instances of this running at the same time
        '==================================================       
        Dim objConn As New OleDbConnection(strConn)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "  SELECT     s.STOCKCARDITEMSID, p.PRODUCTID, p.WAREHOUSEID, 'TEMP' AS SALESORDERID, p.NAME AS PRODUCT, s.CATEGORYNAME AS FAMILY, p.ACTUALID, 
            SQL = SQL & "                      p.DESCRIPTION, p.UNIT, 'StandarLine' AS LINETYPE, p.UNITOFMEASUREID, p.UPC, ISNULL(s.MAX_STOCKLEVEL, 0) AS MAX_STOCKLEVEL, "
            SQL = SQL & "                      s.ACCOUNTID AS TACACCOUNTID, s.STOCKCARDITEMSID AS TACSTOCKCARDITEMID, s.DISTRIBUTORMARGIN, s.DISTRIBUTORPRICE, s.LISTPRICE, "
            SQL = SQL & " s.DEALERPRICE, s.MARGIN, s.ORIGPRODUCTPRICE, s.ORIGPRODUCTDISCOUNT"
            SQL = SQL & " FROM         sysdba.USERWHSE INNER JOIN"
            SQL = SQL & " sysdba.SITE ON sysdba.USERWHSE.SITEID = sysdba.SITE.SITEID INNER JOIN"
            SQL = SQL & " sysdba.STOCKCARDITEMS AS s INNER JOIN"
            SQL = SQL & " sysdba.PRODUCT ON s.PRODUCTID = sysdba.PRODUCT.PRODUCTID INNER JOIN"
            SQL = SQL & " sysdba.ACCOUNT ON s.ACCOUNTID = sysdba.ACCOUNT.ACCOUNTID ON sysdba.USERWHSE.USERID = sysdba.ACCOUNT.ACCOUNTMANAGERID INNER JOIN"
            SQL = SQL & "                      sysdba.PRODUCT AS p ON sysdba.PRODUCT.ACTUALID = p.ACTUALID AND sysdba.SITE.SITECODE = p.WAREHOUSEID"
            SQL = SQL & " WHERE     (s.ACCOUNTID = '" & Accountid & "')AND (p.STATUS <> 'Deleted') AND (p.FAMILY <> 'Exchange Returns') AND (p.FAMILY <> 'Bulk Products') And (USERWHSE.ISDEFAULT = 'T')"
            SQL = SQL & " Order by FAMILY , ACTUALID , WAREHOUSEID "



            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'returnDataRow = row
                i = i + 1


                AddEditSalesOrderItemFromStockCardItem(row, strConn, i.ToString(), Accountid)
                Console.WriteLine("Processes line " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Dim EventMessage As String
            EventMessage = ex.Message & Chr(10) & Chr(13) & "In ProcessSingleAccount"
            WriteStatusLog(EventMessage)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing

        'SQL = " Select  s.STOCKCARDITEMSID"
        '    SQL = SQL & " FROM         sysdba.STOCKCARDITEMS AS s INNER JOIN "
        '    SQL = SQL & "                      sysdba.PRODUCT AS p1_ ON s.PRODUCTID = p1_.PRODUCTID"
        '    SQL = SQL & " WHERE     (s.ACCOUNTID = '" & Accountid & "') AND (NOT (p1_.STATUS = 'Deleted'))"
        'MsgBox(SQL)
        'Dim objConn As New OleDbConnection(strConn)
        'Try
        '    objConn.Open()
        '    Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
        '    Dim objReader As OleDbDataReader = objCMD.ExecuteReader()
        '    If objReader.HasRows Then
        '        Do While objReader.Read()
        '            i = i + 1
        '            AddEditSalesOrderItemFromStockCardItem(objReader.GetString(0), strConn, i)
        '            Console.WriteLine("Processes line " & i)
        '        Loop

        '    End If
        '    objReader.Close()
        'Catch ex As Exception
        '    'Dim EventMessage As String
        '    'EventMessage = ex.Message & Chr(10) & Chr(13) & "In Class CreateTicket " & "FindContactIDFromEmail Line 281"
        '    'WriteToEventLog(EventMessage, , Diagnostics.EventLogEntryType.Error)
        'Finally
        '    If objConn.State = Data.ConnectionState.Open Then objConn.Close()
        'End Try

    End Sub
    Sub CleanUpExisting(ByVal Accountid As String, ByVal ConnectionString As String)
        Dim SQL As String = "Delete from sysdba.SalesOrderItems where Accountid = '" & Accountid & "' and Salesorderid ='TEMP'"
        Using connection As New OleDbConnection(ConnectionString)
            Dim command As New OleDbCommand(SQL, connection)
            command.Connection.Open()
            command.ExecuteNonQuery()
        End Using
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

            '===================================================
            ' Process Account and Create Temp SalesOrderItems
            '===================================================
            ProcessAccount(TargetAccountid, strConn)


        Catch ex As Exception
            'Dim EventMessage As String
            'EventMessage = ex.Message & Chr(10) & Chr(13) & "In Class CreateTicket " & "FindContactIDFromEmail Line 281"
            'WriteToEventLog(EventMessage, , Diagnostics.EventLogEntryType.Error)
        Finally
            If objConn.State = Data.ConnectionState.Open Then objConn.Close()
        End Try





    End Sub

    Public Function GetNewSLXID(ByVal TableName As String, ByVal strConn As String) As String
        Dim objRS As New ADODB.Recordset

        Try
            'Get a new id for a table and return that id
            objRS.Open("SLX_DBIDS(" & TableName & ",1)", strConn)
            GetNewSLXID = objRS.Fields(0).Value
        Catch ex As Exception
            GetNewSLXID = ""
            'LogErrors("PartsHandlerExtractor - GetNewSLXID", ex.Message, EventLogEntryType.Error)
        Finally
            If objRS.State = ADODB.ObjectStateEnum.adStateOpen Then
                objRS.Close()
                objRS = Nothing
            End If
        End Try
    End Function



End Module
