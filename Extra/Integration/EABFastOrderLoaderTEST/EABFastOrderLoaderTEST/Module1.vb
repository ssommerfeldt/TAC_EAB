﻿Imports System.Data.OleDb
Imports System.Data.SqlClient
Imports ADODB

Module Module1


    Sub Main(args As String())
        Console.WriteLine("Loading Please Wait.....")
        If args.Length < 1 Then
            Exit Sub ' Get Out of Dodge as there is not enough Args to continue
        End If
        '===================================================================================
        ' Step 1.  Create the ID's in Blulk  and store in a Temp Table.
        '====================================================================================
        Dim myArgs() As String = Split(args(0), ",")
        Dim Accountid As String = myArgs(0) '"AEAB3A000MDI"
        Dim SalesOrderID As String = myArgs(1) '"QEAB3A0A22X0"
        Dim UserId As String = myArgs(2) '"ADMIN"
        Dim GetAllStockCards As String = myArgs(3) 'ALL
        Dim isAllStockCards As Boolean = False
        If GetAllStockCards = "ALL" Then
            isAllStockCards = True
        End If

        'Console.WriteLine("AccountId=" & Accountid & "   SalesOrder=" & SalesOrderID)
        'Console.WriteLine("Press any key to exit the process...")
        'Console.ReadKey()

        Dim strSQL = "SELECT s.STOCKCARDITEMSID " & GetSQLFrom(Accountid, isAllStockCards, SalesOrderID)
        cmdGenerateTempTable(strSQL, My.Settings.TempTableName & "_" & UserId)
        '===================================================================================
        ' Step 2.  Bulk Insert note this will not sync
        '====================================================================================

        Dim strInsertSQL As String = GetInsertQuerySQL(Accountid, SalesOrderID, UserId, isAllStockCards)
        ExecuteBulkLoadInsert(strInsertSQL)



        '===================================================================================
        ' Step 3.  Update SalesHistory
        '====================================================================================
        SetDisconnectedDataFlag(SalesOrderID, UserId, "T")

        Dim Application As New SLXCOMInterop.SlxApplication
        Application.BringToFront()
        Application.BasicFunctions.DoInvoke("Function", "View:RefreshCurrent")
        ProcessSalesHistory(SalesOrderID, Accountid)

        '=====================================
        ' Refresh Client
        '=====================================
        Console.WriteLine("Preparing to Refresh CRM Client")
        SetDisconnectedDataFlag(SalesOrderID, UserId, "T")
        ' Set Disconnected Flag

        ' Application.BasicFunctions.DoInvoke("Function", "View:RefreshCurrent")

    End Sub


    Public Sub GetSourceData(ByVal strSourceSQL As String, ByVal strDestinationTableName As String)
        Dim SourceconnectionString As String = CleanBulkLoadNativeSQLConnectionString(My.Settings.SLXNative)
        Dim SLXConnectionString As String = CleanBulkLoadNativeSQLConnectionString(My.Settings.SLXNative)

        ' get the source data
        '=================================================================


        Using sourceConnection As New SqlConnection(SourceconnectionString)
            Dim myCommand As New SqlCommand(strSourceSQL, sourceConnection)
            sourceConnection.Open()
            Dim reader As SqlDataReader = myCommand.ExecuteReader()

            ' open the destination data
            Using destinationConnection As New SqlConnection(SLXConnectionString)
                ' open the connection
                destinationConnection.Open()

                Using bulkCopy As New SqlBulkCopy(destinationConnection.ConnectionString)
                    bulkCopy.BatchSize = 500
                    bulkCopy.NotifyAfter = 1000
                    ' bulkCopy.SqlRowsCopied += New SqlRowsCopiedEventHandler(bulkCopy_SqlRowsCopied)
                    bulkCopy.DestinationTableName = strDestinationTableName
                    bulkCopy.WriteToServer(reader)
                End Using
            End Using
            reader.Close()
        End Using
    End Sub

    Sub ExecuteBulkLoadInsert(ByVal SQL As String)
        'create the connection
        Dim conn As New OleDbConnection(My.Settings.SLXNative)
        Try
            'open connection
            conn.Open()
            'create the command and call ExecuteScalar to get the single result

            Dim cmd As New OleDbCommand(SQL, conn)
            cmd.ExecuteNonQuery()


        Catch ex As Exception
            Console.WriteLine("An error occurred: " & ex.Message, "Error")
        Finally
            conn.Dispose()
            conn = Nothing
        End Try
    End Sub

    Function GetInsertQuerySQL(ByVal Accountid As String, ByVal SalesOrderId As String, ByVal UserId As String, ByVal isAllStockCards As Boolean)
        Dim SQL As String = ""
        SQL = SQL & " Insert into sysdba.SALESORDERITEMS"
        SQL = SQL & " (	SALESORDERITEMSID"
        SQL = SQL & " 	,SALESORDERID"
        SQL = SQL & " 	,CREATEUSER"
        SQL = SQL & " 	,CREATEDATE"
        SQL = SQL & " 	,MODIFYUSER"
        SQL = SQL & " 	,MODIFYDATE"
        SQL = SQL & " 	,PRODUCT"
        SQL = SQL & " 	,PRICE"
        SQL = SQL & " 	,QUANTITY"
        SQL = SQL & " 	,DISCOUNT"
        SQL = SQL & " 	,FAMILY"
        SQL = SQL & " 	,PRODUCTID"
        SQL = SQL & " 	,ACTUALID"
        SQL = SQL & " 	,DESCRIPTION"
        SQL = SQL & " 	,EXTENDEDPRICE"
        SQL = SQL & " 	,UNIT"
        SQL = SQL & " 	,CALCULATEDPRICE"
        SQL = SQL & " 	,LINETYPE"
        SQL = SQL & " 	,UNITOFMEASUREID"
        SQL = SQL & " 	,UPC"
        SQL = SQL & " 	,MAX_STOCKLEVEL"
        SQL = SQL & " 	,TACACCOUNTID"
        SQL = SQL & " 	,ACCOUNTID"
        SQL = SQL & " 	,TACSTOCKCARDITEMID"
        SQL = SQL & " 	,ORIGPRODUCTPRICE"
        SQL = SQL & " 	,ORIGPRODUCTDISCOUNT"
        SQL = SQL & " 	)"
        '=======================================================================
        SQL = SQL & ""
        SQL = SQL & " Select "
        SQL = SQL & "     z.SLX_SALESORDERITEMID AS SALESORDERITEMSID"
        SQL = SQL & " 	,'" & SalesOrderId & "' AS SALESORDERID"
        SQL = SQL & " 	,'" & UserId & "' AS CREATEUSER"
        SQL = SQL & " 	,'" & Now.ToString("yyyyMMdd HH:mm:ss") & "' AS CREATEDATE"
        SQL = SQL & " 	,'" & UserId & "' AS MODIFYUSER"
        SQL = SQL & " 	,'" & Now.ToString("yyyyMMdd HH:mm:ss") & "' AS MODIFYDATE"
        SQL = SQL & " 	,p.NAME AS PRODUCT"
        SQL = SQL & " 	,s.LISTPRICE AS PRICE"
        SQL = SQL & " 	,0 AS QUANTITY"
        SQL = SQL & " 	,s.MARGIN AS DISCOUNT"
        SQL = SQL & " 	,s.CATEGORYNAME AS FAMILY"
        SQL = SQL & " 	,p.PRODUCTID"
        SQL = SQL & " 	,p.ACTUALID"
        SQL = SQL & " 	,p.DESCRIPTION"
        SQL = SQL & " 	,0 AS EXTENDEDPRICE"
        SQL = SQL & " 	,p.UNIT"
        SQL = SQL & " 	,Round(s.DEALERPRICE,2) as CALCULATEDPRICE"
        SQL = SQL & " 	,'StandarLine' AS LINETYPE"
        SQL = SQL & " 	,p.UNITOFMEASUREID"
        SQL = SQL & " 	,p.UPC"
        SQL = SQL & " 	,ISNULL(s.MAX_STOCKLEVEL, 0) AS MAX_STOCKLEVEL"
        SQL = SQL & " 	,s.ACCOUNTID AS TACACCOUNTID"
        SQL = SQL & " 	,s.ACCOUNTID "
        SQL = SQL & " 	,s.STOCKCARDITEMSID AS TACSTOCKCARDITEMID"
        SQL = SQL & " 	,s.ORIGPRODUCTPRICE"
        SQL = SQL & " 	,s.ORIGPRODUCTDISCOUNT"
        SQL = SQL & " From sysdba.USERWHSE"
        SQL = SQL & " INNER Join sysdba.SITE ON sysdba.USERWHSE.SITEID = sysdba.SITE.SITEID"
        SQL = SQL & " INNER Join sysdba.STOCKCARDITEMS AS s"
        SQL = SQL & " INNER Join sysdba.PRODUCT ON s.PRODUCTID = sysdba.PRODUCT.PRODUCTID"
        SQL = SQL & " INNER Join sysdba.ACCOUNT ON s.ACCOUNTID = sysdba.ACCOUNT.ACCOUNTID ON sysdba.USERWHSE.USERID = sysdba.ACCOUNT.ACCOUNTMANAGERID "
        SQL = SQL & " INNER Join sysdba.PRODUCT AS p ON sysdba.PRODUCT.ACTUALID = p.ACTUALID"
        SQL = SQL & " 	And sysdba.SITE.SITECODE = p.WAREHOUSEID "
        SQL = SQL & " INNER Join dbo.zzTEMPFastSOItems_" & UserId & " As z On s.STOCKCARDITEMSID = z.STOCKCARDITEMSID"
        '======================================================================================
        If isAllStockCards Then
            SQL = SQL & " WHERE 1=1 " 'Ignore MaxStock Level (ISNULL(s.MAX_STOCKLEVEL, 0) = 0)
        Else
            SQL = SQL & " WHERE(ISNULL(s.MAX_STOCKLEVEL, 0) > 0)"
        End If
        SQL = SQL & " 	And (s.ACCOUNTID = '" & Accountid & "')"
        SQL = SQL & "   And (p.STATUS <> 'Deleted')"
        SQL = SQL & "   And (p.FAMILY <> 'Exchange Returns')"
        SQL = SQL & "   And (p.FAMILY <> 'Bulk Products')"
        SQL = SQL & " 	And (sysdba.USERWHSE.ISDEFAULT = 'T')"
        '=========================================================================
        If isAllStockCards Then
            SQL = SQL & "   And (s.STOCKCARDITEMSID Not IN"
            SQL = SQL & "                    (SELECT     TACSTOCKCARDITEMID"
            SQL = SQL & "                      From sysdba.SALESORDERITEMS "
            SQL = SQL & "                      Where (SALESORDERID = '" & SalesOrderId & "' AND TACSTOCKCARDITEMID is not null )))"
        End If
        '=========================================================================
        SQL = SQL & " ORDER BY FAMILY"
        SQL = SQL & " 	,sysdba.PRODUCT.ACTUALID"
        SQL = SQL & " 	,sysdba.PRODUCT.WAREHOUSEID"
        Return SQL
    End Function




    Function GetSQLFrom(ByVal Accountid As String, ByVal isAllStockCards As Boolean, ByVal SalesorderId As String)
        Dim strSourceQuery As String
        strSourceQuery = ""
        strSourceQuery = strSourceQuery & " From sysdba.USERWHSE"
        strSourceQuery = strSourceQuery & " INNER JOIN sysdba.SITE ON sysdba.USERWHSE.SITEID = sysdba.SITE.SITEID"
        strSourceQuery = strSourceQuery & " INNER JOIN sysdba.STOCKCARDITEMS AS s"
        strSourceQuery = strSourceQuery & " INNER JOIN sysdba.PRODUCT ON s.PRODUCTID = sysdba.PRODUCT.PRODUCTID"
        strSourceQuery = strSourceQuery & " INNER JOIN sysdba.ACCOUNT ON s.ACCOUNTID = sysdba.ACCOUNT.ACCOUNTID ON sysdba.USERWHSE.USERID = sysdba.ACCOUNT.ACCOUNTMANAGERID INNER JOIN sysdba.PRODUCT AS p ON sysdba.PRODUCT.ACTUALID = p.ACTUALID "
        strSourceQuery = strSourceQuery & " And sysdba.SITE.SITECODE = p.WAREHOUSEID "
        If isAllStockCards Then
            strSourceQuery = strSourceQuery & "   WHERE 1=1 " ' Bring in All (ISNULL(Max_StockLevel, 0) = 0)
        Else
            ' Just Max Stock Levels have value
            strSourceQuery = strSourceQuery & "   WHERE(ISNULL(Max_StockLevel, 0) > 0)"
        End If

        strSourceQuery = strSourceQuery & " And (s.ACCOUNTID = '" & Accountid & "')"
        strSourceQuery = strSourceQuery & " And (p.STATUS <> 'Deleted')"
        strSourceQuery = strSourceQuery & " And (p.FAMILY <> 'Exchange Returns')"
        strSourceQuery = strSourceQuery & " And (p.FAMILY <> 'Bulk Products')"
        strSourceQuery = strSourceQuery & " And (USERWHSE.ISDEFAULT = 'T')"
        '==========================================================================
        If isAllStockCards Then
            strSourceQuery = strSourceQuery & "   And (s.STOCKCARDITEMSID Not IN"
            strSourceQuery = strSourceQuery & "                    (SELECT     TACSTOCKCARDITEMID"
            strSourceQuery = strSourceQuery & "                      From sysdba.SALESORDERITEMS "
            strSourceQuery = strSourceQuery & "                      Where (SALESORDERID = '" & SalesorderId & "')"
            strSourceQuery = strSourceQuery & "                      And TACSTOCKCARDITEMID Is Not null"
            strSourceQuery = strSourceQuery & "        ))"
            'strSourceQuery = strSourceQuery & " Order by FAMILY , ACTUALID , WAREHOUSEID "
        End If

        Return strSourceQuery

    End Function

    Sub ProcessSalesHistory(ByVal SalesOrderId As String, ByVal AccountId As String)
        'create the connection
        Dim conn As New OleDbConnection(My.Settings.SLXNative)
        Try
            'open connection
            conn.Open()
            'create the DataAdapter. it will internally create a command object
            Dim SQL As String = "Select SALESORDERITEMSID , ACTUALID from sysdba.SALESORDERITEMS Where SALESORDERID ='" & SalesOrderId & "'"
            Dim da As New OleDbDataAdapter(SQL, conn)

            'now create the DataSet and use the adapter to fill it
            Dim ds As New DataSet()
            da.Fill(ds)

            'pull out the created DataTable to work with
            'our table is the first and only one in the tables collection
            Dim table As DataTable = ds.Tables(0)

            'iterate through the rows in the table's Rows collection
            Dim i As Integer
            Dim Index1 As String
            Dim Index2 As String
            Dim Index3 As String
            Dim UpdateSQL As String
            Dim row As DataRow
            Dim count As Integer = table.Rows.Count
            For Each row In table.Rows
                Index1 = ""
                Index2 = ""
                Index3 = ""
                If GetSalesHistoryByIndex(AccountId, row("ACTUALID"), Index1, Index2, Index3) = "Success" Then
                    UpdateSQL = "UPDATE SYSDBA.SALESORDERITEMS "
                    UpdateSQL = UpdateSQL & " Set LASTORDER = '" & Index1 & "'"
                    UpdateSQL = UpdateSQL & " , LASTORDER2 = '" & Index2 & "'"
                    UpdateSQL = UpdateSQL & " , LASTORDER3 = '" & Index3 & "'"
                    '-================================================================
                    UpdateSQL = UpdateSQL & " , CURRENTYEARSALESQTY ='" & GetField("IsNull(Sum(SOI.QUANTITY), 0) As Quantity",
                        "sysdba.SALESORDERITEMS As SOI Inner Join sysdba.SALESORDER As SO On SO.SALESORDERID = SOI.SALESORDERID",
                        "(UPPER(SO.STATUS) = 'TRANSMITTED TO ACCOUNTING' OR UPPER(SO.STATUS) = 'CLOSED')" &
                        " And Year(SO.OrderDate) = YEAR(GetDate())" &
                        " And SOI.QUANTITY <> 0" &
                        " And SOI.ACTUALID = '" & row("ACTUALID") & "'" &
                        " And SO.ACCOUNTID = '" & AccountId & "'") & "'"

                    UpdateSQL = UpdateSQL & " , PREVIOUSYEARSALESQTY  = '" & GetField("IsNull(Sum(SOI.QUANTITY), 0) As Quantity",
                        "sysdba.SALESORDERITEMS As SOI Inner Join sysdba.SALESORDER As SO On SO.SALESORDERID = SOI.SALESORDERID",
                        "(UPPER(SO.STATUS) = 'TRANSMITTED TO ACCOUNTING' OR Upper(SO.STATUS) = 'CLOSED')" &
                        " And Year(SO.OrderDate) = YEAR(GetDate()) - 1" &
                        " And SOI.QUANTITY <> 0" &
                        " And SOI.ACTUALID = '" & row("ACTUALID") & "'" &
                        " And SO.ACCOUNTID = '" & AccountId & "'") & "'"

                    '=================================================================
                    UpdateSQL = UpdateSQL & " WHERE SALESORDERITEMSID = '" & row("SALESORDERITEMSID") & "'"

                    ExecuteNativeQuery(UpdateSQL)
                    'Console.WriteLine("Found and Updated SalesHistory")
                End If
                i = i + 1
                Console.WriteLine("Updating SalesHistory " & i & " of " & count)
            Next



        Catch ex As Exception
            'MessageBox.Show("An error occurred: " & ex.Message, "Error")
        Finally
            conn.Dispose()
            conn = Nothing
        End Try


    End Sub

    Function GetSalesHistoryByIndex(ByVal Accountid As String, ByVal SKU As String, ByRef Index1 As String, ByRef Index2 As String, ByRef Index3 As String)

        Dim SQL As String
        SQL = "SELECT SUM(SOI.QUANTITY) AS Qty"
        SQL = SQL & ", SO.ACCOUNTID"
        SQL = SQL & ", SO.ORDERDATE"
        SQL = SQL & ", SOI.PRODUCTID"
        SQL = SQL & " FROM sysdba.SALESORDERITEMS As SOI"
        SQL = SQL & " INNER JOIN sysdba.SALESORDER As SO ON SO.SALESORDERID = SOI.SALESORDERID"
        SQL = SQL & " WHERE (SOI.QUANTITY > 0)"
        SQL = SQL & " AND (SO.ACCOUNTID = '" + Accountid + "')"
        SQL = SQL & " AND (SOI.ACTUALID = '" + SKU + "')"
        SQL = SQL & " And TRANSMITDATE Is Not Null"
        SQL = SQL & " GROUP BY SO.ACCOUNTID, SO.ORDERDATE, SOI.PRODUCTID"
        SQL = SQL & " ORDER BY SO.ORDERDATE DESC"

        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim i As Integer = 0
        Dim returnValue = "None"
        Dim myQTY As String
        Try
            objConn.Open(My.Settings.SLXNative)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(SQL, objConn)
                For i = 0 To .RecordCount - 1          ' Loop
                    If Not (.BOF And .EOF) Then        ' Check not at end/beginning
                        '=======================================
                        'Found
                        '=======================================
                        '.Fields("OPENQTY").Value = MyDataRow("OPENQTY")
                        Dim OrderDate
                        OrderDate = CDate(.Fields("ORDERDATE").Value)
                        myQTY = CDbl(.Fields("Qty").Value).ToString("####")
                        returnValue = "Success"
                        If (i = 0) Then
                            Index1 = MonthName(Month(OrderDate), 1) & " " & Day(OrderDate) & "/" & Year(OrderDate) & " Qty:" & myQTY
                            returnValue = "Success"
                        End If
                        If (i = 1) Then
                            Index2 = MonthName(Month(OrderDate), 1) & " " & Day(OrderDate) & "/" & Year(OrderDate) & " Qty:" & myQTY
                            returnValue = "Success"
                        End If
                        If (i = 2) Then
                            Index3 = MonthName(Month(OrderDate), 1) & " " & Day(OrderDate) & "/" & Year(OrderDate) & " Qty:" & myQTY
                            returnValue = "Success"
                        End If
                        If (i > 2) Then
                            'Get out of Dodge as we Do not Track more than 3
                            Exit For
                        End If

                        .MoveNext()               ' Move to next record
                    End If
                Next
                .Close()




            End With


        Catch ex As Exception
            'MsgBox(ex.Message)
            Console.WriteLine(ex.Message)

        End Try


        Return returnValue

    End Function

    Public Sub ExecuteNativeQuery(ByVal SQL As String)



        'Dim strConnection As String = strSLXConstr ' CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        Using conn As New System.Data.OleDb.OleDbConnection(My.Settings.SLXNative)
            Dim cmd As New System.Data.OleDb.OleDbCommand(SQL, conn)

            Try
                conn.Open()
                cmd.CommandTimeout = 10000
                cmd.ExecuteNonQuery()
            Catch ex As Exception
                'Call LogErrors("CRMUtility", " - Main", ex.Message, EventLogEntryType.Error)
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try
        End Using


    End Sub

    Public Function GetField(ByVal Field As String, ByVal Table As String,
                             ByVal Where As String) As String
        Dim sql As String = String.Format("select {0} from {1} where {2}", Field, Table, (If(Where.Equals(String.Empty), "1=1", Where)))

        Using conn As New OleDbConnection(My.Settings.SLXNative)
            conn.Open()
            Using cmd As New OleDbCommand(sql, conn)

                'If IsDBNull(cmd.ExecuteScalar()) Then
                '    Return ""

                'Else
                Dim fieldval As String = cmd.ExecuteScalar()
                If fieldval = Nothing Then
                    Return ""
                Else
                    Return fieldval
                End If

                'End If

            End Using
        End Using
    End Function


    Sub SetDisconnectedDataFlag(ByVal SalesOrderId As String, ByVal UserId As String, ByVal Flag As String)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM sysdba.SALESORDER WHERE SALESORDERID = '" & SalesOrderId & "'"


        Try
            objConn.Open(My.Settings.SLXConnection) ' Note Use the Native Client as we don't want to Sync This
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If Not .EOF Then
                    'UPDATING
                    '.AddNew()

                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = UserId

                    .Fields("HASDISCONNECTEDDATA").Value = Flag


                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'Add_TACSyncJobERROR(ex, slXLogHeaderID)
            '_hasErrors = True 'Log Errors
            Console.WriteLine(ex.Message)
            'MsgBox(ex.Message)

        End Try
    End Sub

End Module
