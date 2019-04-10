Imports System.IO
Imports System.Data.SqlClient
Imports System.Data.OleDb
Imports System.Configuration

Module Module1
#Region " Declaration of Variables and Support Functions "
    '=================================================================
    ' Need to Set the Project for
    '=================================================================
    Private PROJECTNAME As String = "TAC_Sage500_SLX_SalesOrderSync"
    Private strMASConstr As String
    Private strSLXNativeConstr As String
    Private strSLXConstr As String
    Private slXLogHeaderID As String
    Private _hasErrors As Boolean

#End Region
    Sub Main()
        Try


            '===================================================
            ' March 22, 2018 Advanced Logging added ssommerfeldt
            '===================================================
            _hasErrors = False  'Intialize
            ' Get Database Id for Log
            slXLogHeaderID = GetNewSLXID("TACSYNCJOB", My.Settings.SLXConnection)
            Dim appPath As String
            Dim appName As String
            appName = System.Reflection.Assembly.GetExecutingAssembly.GetModules()(0).FullyQualifiedName
            appPath = System.IO.Path.GetDirectoryName(appName)

            Call LogErrors(PROJECTNAME, " - Main", "Process Start", EventLogEntryType.Information)
            TACSyncJob_Start(PROJECTNAME, appName, slXLogHeaderID)
            '========================================================================================
            ' Ensure Single Instance application
            '==========================================================================================

            Dim appProc() As Process
            Dim strModName, strProcName As String
            strModName = Process.GetCurrentProcess.MainModule.ModuleName
            strProcName = System.IO.Path.GetFileNameWithoutExtension(strModName)

            appProc = Process.GetProcessesByName(strProcName)
            If appProc.Length > 1 Then
                Console.WriteLine("There is an instance of this application running.")
                Call LogErrors(PROJECTNAME, " - Main", "Problem with Connectin String so Exit", EventLogEntryType.Error)
                TACSyncJob_END("Completed - Process already running (Exit without Processing)", slXLogHeaderID)
                Exit Sub
            Else
                Console.WriteLine("There are no other instances running.")
            End If
            '==========================================================================================

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
                TACSyncJob_END("Completed - ConnectionStrings issue (Exit without Processing)", slXLogHeaderID)
                Exit Sub

            End If

            'Console.WriteLine("Move Temp into Compare")

            'Call Move_SalesOrder_Temp_To_Compare()
            'Console.WriteLine("Clean Temp table")
            'Call CleanTempDir()
            'Console.WriteLine("Get Source Data --Header")
            '====================================================================================================
            ' HEADER 
            '====================================================================================================
            ' MAS500 Query
            Dim SQLHeader As String = "SELECT     TranStatus, ShipKey AS Key1, UserFld1,UserFld2, UserFld3,UserFld4, TranStatusAsText, TranID"
            SQLHeader = SQLHeader & " FROM         vdvCustomerReturn"
            SQLHeader = SQLHeader & " WHERE     (UserFld1 IS NOT NULL)"
            SQLHeader = SQLHeader & " UNION"
            SQLHeader = SQLHeader & " SELECT     Status, SOKey, UserFld1, UserFld2 ,UserFld3,UserFld4,"
            SQLHeader = SQLHeader & " CASE status WHEN '0' THEN 'Unacknoledged' WHEN '1' THEN 'Open' WHEN '2' THEN 'Inactive' WHEN '3' THEN 'Canceled' WHEN '4' THEN 'Closed' WHEN '5' THEN 'Incomplete'"
            SQLHeader = SQLHeader & " WHEN '6' THEN 'Pending Approval' END AS StatusTXT, TranID"
            SQLHeader = SQLHeader & " FROM tsoSalesOrder "
            SQLHeader = SQLHeader & " WHERE     (UserFld1 IS NOT NULL) AND (UserFld1 <> '') "

            '=================================================================================
            ' 1. CLEAN COMPARE
            '=================================================================================
            Clean_Table("dbo.MAS_to_SLX_SalesOrderHEADER_TAC_zcompare", strSLXNativeConstr)
            '=================================================================================
            ' 2. MOVE TEMP TO COMPARE
            '=================================================================================
            Move_Temp_To_Compare("dbo.MAS_to_SLX_SalesOrderHEADER_TAC_zcompare", "dbo.MAS_to_SLX_SalesOrderHEADER_TAC_temp", strSLXNativeConstr)
            '=================================================================================
            ' 3. CLEAN TEMP
            '=================================================================================
            Clean_Table("dbo.MAS_to_SLX_SalesOrderHEADER_TAC_temp", strSLXNativeConstr)
            '=================================================================================
            ' 4. MOVE SOURCE TO TEMP
            '=================================================================================
            GetSourceData(SQLHeader, "dbo.MAS_to_SLX_SalesOrderHEADER_TAC_temp")
            '=================================================================================
            ' 5. Process Insert / Updates
            '=================================================================================
            Process_Changed_SalesOrderHEADER_Info()

            '=============================================
            ' Reconcile with changes made to Salesorders
            '=============================================
            'Reconcile_Changed_SalesOrderHEADER_Info()
            ' 6. Process Deletes
            '    DO NOT PROCESS DELETES


            '================================================================
            '= LINE
            '================================================================
            Console.WriteLine("------ Line Changes Start ------")
            ' MAS500 Query
            Dim SQL_LINE As String = My.Settings.LineQuery





            '=================================================================================
            ' 1. CLEAN COMPARE
            '=================================================================================
            Clean_Table("dbo.MAS_to_SLX_SalesOrderLINE_TAC_zcompare", strSLXNativeConstr)
            '=================================================================================
            ' 2. MOVE TEMP TO COMPARE
            '=================================================================================
            Move_Temp_To_Compare("dbo.MAS_to_SLX_SalesOrderLINE_TAC_zcompare", "dbo.MAS_to_SLX_SalesOrderLINE_TAC_temp", strSLXNativeConstr)
            '=================================================================================
            ' 3. CLEAN TEMP
            '=================================================================================
            Clean_Table("dbo.MAS_to_SLX_SalesOrderLINE_TAC_temp", strSLXNativeConstr)
            '=================================================================================
            ' 4. MOVE SOURCE TO TEMP
            '=================================================================================
            GetSourceData(SQL_LINE, "dbo.MAS_to_SLX_SalesOrderLINE_TAC_temp")
            '=================================================================================
            ' 5. Process Insert / Updates
            '=================================================================================
            Process_Changed_SALESORDERLINE()
            ' 6. Process Deletes
            '    DO NOT PROCESS DELETES


            '================================================================
            '= CLEAN UP
            '================================================================
            Process_CleanUpUnUsedTransmittedSalesItems()



            Call LogErrors(PROJECTNAME, " - Main", "Process End", EventLogEntryType.Information)
            If _hasErrors Then
                TACSyncJob_END("Completed - WITH ERROR", slXLogHeaderID)
            Else
                TACSyncJob_END("Completed - clean run", slXLogHeaderID)
            End If
        Catch ex As Exception

        End Try
    End Sub


    Public Sub Clean_Table(ByVal strTable As String, ByVal ConnectionString As String)


        Dim sql As String = "Truncate table " & strTable
        Dim strConnection As String = CleanBulkLoadNativeSQLConnectionString(ConnectionString)
        Using conn As New SqlConnection(strConnection)
            Dim cmd As New SqlCommand(sql, conn)
            '==========================================================================
            ' Clean Out the Compare Table 
            '===========================================================================
            Try
                conn.Open()
                cmd.ExecuteNonQuery()
            Catch ex As Exception
                Call LogErrors(PROJECTNAME, " - Main", ex.Message, EventLogEntryType.Error)
                Add_TACSyncJobERROR(ex, slXLogHeaderID)
                _hasErrors = True 'Log Errors
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try

            '==========================================================================

        End Using


    End Sub

    Private Sub Move_Temp_To_Compare(ByVal strCOMPARE_Table As String, ByVal strTEMP_Table As String, ByVal ConnectionString As String)

        Dim sql As String
        sql = "Insert into " & strCOMPARE_Table
        sql = sql & " Select * from " & strTEMP_Table

        Dim strConnection As String = CleanBulkLoadNativeSQLConnectionString(ConnectionString)
        Using conn As New SqlConnection(strConnection)
            Dim cmd As New SqlCommand(sql, conn)
            '==========================================================================
            'sql Push all Records from Temp into Compare
            '===========================================================================
            Try
                conn.Open()
                cmd.ExecuteNonQuery()
            Catch ex As Exception
                Call LogErrors(PROJECTNAME, " - Main", ex.Message, EventLogEntryType.Error)
                Add_TACSyncJobERROR(ex, slXLogHeaderID)
                _hasErrors = True 'Log Errors
                Console.WriteLine(ex.Message)
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try


        End Using


    End Sub


    Private Sub GetSourceData(ByVal strSourceSQL As String, ByVal strDestinationTableName As String)
        Dim SourceconnectionString As String = CleanBulkLoadNativeSQLConnectionString(strMASConstr)
        Dim SLXConnectionString As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        'Dim strSourceSQL As String

        'strSourceSQL = " SELECT * from vdvMAS_to_SLX_SalesOrderItemShipment_TAC"

        '================================================================
        ' get the source data ReWrite April 5, 2019
        '=================================================================
        Dim conn As New SqlConnection(SourceconnectionString)
        Try


            'open connection
            conn.Open()
            'create the DataAdapter. it will internally create a command object

            Dim da As New SqlDataAdapter(strSourceSQL, conn)
            da.SelectCommand.CommandTimeout = 1260 ' 3min time out.


            'now create the DataSet and use the adapter to fill it
            Dim ds As New DataSet()
            da.Fill(ds)
            'pull out the created DataTable to work with
            'our table is the first and only one in the tables collection
            Dim table As DataTable = ds.Tables(0)
            ' open the destination data

            ' open the destination data
            Using destinationConnection As New SqlConnection(SLXConnectionString)
                ' open the connection
                destinationConnection.Open()

                Using bulkCopy As New SqlBulkCopy(destinationConnection.ConnectionString)
                    bulkCopy.BatchSize = 1000
                    bulkCopy.NotifyAfter = 1
                    ' bulkCopy.SqlRowsCopied += New SqlRowsCopiedEventHandler(bulkCopy_SqlRowsCopied)
                    bulkCopy.DestinationTableName = strDestinationTableName
                    bulkCopy.WriteToServer(table)
                End Using
            End Using

        Catch ex As Exception
            Console.WriteLine("An error occurred: " & ex.Message, "Error")

        Finally
            conn.Dispose()
            conn = Nothing
        End Try



        'Dim myCommand As New SqlCommand(strSourceSQL, sourceConnection)
        'myCommand.CommandTimeout = 200 '200 Seconds
        'sourceConnection.Open()
        'Dim reader As SqlDataReader = myCommand.ExecuteReader()


        '' open the destination data
        'Using destinationConnection As New SqlConnection(SLXConnectionString)
        '    ' open the connection
        '    destinationConnection.Open()

        '    Using bulkCopy As New SqlBulkCopy(destinationConnection.ConnectionString)
        '        bulkCopy.BatchSize = 500
        '        bulkCopy.NotifyAfter = 1
        '        ' bulkCopy.SqlRowsCopied += New SqlRowsCopiedEventHandler(bulkCopy_SqlRowsCopied)
        '        bulkCopy.DestinationTableName = strDestinationTableName
        '        bulkCopy.WriteToServer(reader)
        '    End Using
        'End Using
        'reader.Close()
        ' End Using
    End Sub


    Private Sub Process_Changed_SALESORDERLINE()

        Dim i As Integer = 0
        '===================================================
        Dim ProductId As String = ""
        'Dim ShippingId As String = ""
        'Dim BillingId As String = ""
        Dim SalesOrderItemId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "SELECT DISTINCT "
            SQL = SQL & "             vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.ItemKey, vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.ShipDate,"
            SQL = SQL & "             vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.QtyShipped, vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.SchdShipDate,"
            SQL = SQL & "             vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.TranID, vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.UserFld1, tmpSO.SALESORDERID,"
            SQL = SQL & "             vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.UserFld2, vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.UserFld3,"
            SQL = SQL & "             vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.UserFld4, vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.TotalQTYShipped,"
            SQL = SQL & "             vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.TotalQTYOrdered, vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.StatusText,"
            SQL = SQL & "             vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.OpenQTY"
            SQL = SQL & " FROM         vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED LEFT OUTER JOIN"
            SQL = SQL & "                           (SELECT     SALESORDERID, ALTERNATEKEYPREFIX + '-' + ALTERNATEKEYSUFFIX AS SalesOrderNumber"
            SQL = SQL & "                             FROM          sysdba.SALESORDER) AS tmpSO ON vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.UserFld1 = tmpSO.SalesOrderNumber"
            SQL = SQL & " WHERE     (vdvMAS_to_SLX_SalesOrderLINE_TAC_CHANGED.UserFld3 IS NOT NULL) OR"
            SQL = SQL & "                       (tmpSO.SALESORDERID IS NOT NULL)"

            Dim PickingListItemId As String = ""
            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            objCMD.CommandTimeout = 200 'set the default to 200 seconds
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)

                i = i + 1
                'AddEditSALESORDERITEM(row, SalesOrderItemId)
                '================================================================================================================================
                ' First Check if Userfld4 has a value this means it is assigned to a Picking List and Does Not have a Direct Associated Order
                ' Will need to Process the Pickinglist lines
                '=================================================================================================================================
                If (Not IsDBNull(row("USERFLD4"))) Then
                    ' This Linked to a PickingList so We need to update the Header
                    PickingListItemId = GetPickingListItemID(row("USERFLD4"), row("ItemKey"))
                    AddEditPICKINGLISTITEM(row, PickingListItemId)
                End If
                '====================================================
                ' Normal Order Lines
                '=====================================================
                If (Not IsDBNull(row("USERFLD3"))) Then
                    ' Try  Userfield 1
                    If Not IsDBNull(row("SALESORDERID")) Then
                        Try
                            SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                            AddEditSALESORDERITEM(row, SalesOrderItemId)
                        Catch ex As Exception
                            Add_TACSyncJobERROR(ex, slXLogHeaderID)
                            _hasErrors = True 'Log Errors
                            Console.WriteLine(ex.Message)
                            'MsgBox(ex.Message)
                        End Try
                    End If


                End If
                'Good
                'AddEditSALESORDER(row, row("USERFLD3"), "SalesOrderId")
                'Try
                '    SalesOrderItemId = GetSalesOrderItemID(row("USERFLD3"), row("ItemKey"))
                '    AddEditSALESORDERITEM(row, SalesOrderItemId)
                '    If (Not IsDBNull(row("USERFLD4"))) Then
                '        ' This Linked to a PickingList so We need to update the Header
                '        'AddEditPicklist(row, row("USERFLD4"), "PICKINGLISTID")
                '        AddEditPICKINGLISTITEM(row, SalesOrderItemId)

                '    End If
                'Catch ex As Exception

                'End Try





                Console.WriteLine("Processes SalesorderItem Changed" & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "SalesOrderItems Changes ", ex.Message, EventLogEntryType.Error)
            Add_TACSyncJobERROR(ex, slXLogHeaderID)
            _hasErrors = True 'Log Errors
            Console.WriteLine(ex.Message)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub AddEditSALESORDERITEM(ByVal MyDataRow As DataRow, ByVal SALESORDERITEMID As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM SALESORDERITEMS WHERE SALESORDERITEMSID = '" & SALESORDERITEMID & "'"


        Try
            objConn.Open(strSLXConstr)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    '=================================================================
                    ' March 22, 2018 Remove ability to Add Temp SalesOrderItems
                    '=================================================================
                    'adding()
                    '.AddNew()

                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    '.Fields("MODIFYDATE").Value = Now
                    '.Fields("MODIFYUSER").Value = "ADMIN"
                    '.Fields("SALESORDERID").Value = "TEMP"
                    '.Fields("SALESORDERITEMSID").Value = SALESORDERITEMID

                    '.Fields("MASSHIPPEDDATE").Value = MyDataRow("ShipDate")
                    '.Fields("masQtyShipped").Value = MyDataRow("QtyShipped")
                    '.Fields("masSchdShipDate").Value = MyDataRow("SchdShipDate")
                    '.Fields("TotalQTYShipped").Value = MyDataRow("TotalQTYShipped")
                    '.Fields("STATUSTEXT").Value = MyDataRow("STATUSTEXT")
                    '.Fields("OPENQTY").Value = MyDataRow("OPENQTY")


                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    '.Fields("PRODUCTID").Value = Productid

                    .Fields("MASSHIPPEDDATE").Value = MyDataRow("ShipDate")
                    .Fields("MASQTYSHIPPED").Value = MyDataRow("QtyShipped")
                    .Fields("MASSCHDSHIPDATE").Value = MyDataRow("SchdShipDate")
                    .Fields("TotalQTYShipped").Value = MyDataRow("TotalQTYShipped")

                    .Fields("STATUSTEXT").Value = MyDataRow("STATUSTEXT")
                    .Fields("OPENQTY").Value = MyDataRow("OPENQTY")

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)
            Add_TACSyncJobERROR(ex, slXLogHeaderID)
            _hasErrors = True 'Log Errors
            Console.WriteLine(ex.Message)

        End Try
    End Sub
    Public Sub AddEditPICKINGLISTITEM(ByVal MyDataRow As DataRow, ByVal PICKINGLISTITEMID As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM PICKINGLISTITEM WHERE PICKINGLISTITEMID = '" & PICKINGLISTITEMID & "'"


        Try
            objConn.Open(strSLXConstr)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                For i = 0 To .RecordCount - 1          ' Loop

                    If .EOF Then
                        'adding
                        .AddNew()
                        '.Fields("PICKINGLISTITEMID").Value = GetNewSLXID("PICKINGLISTITEM", strSLXConstr)
                        '.Fields("CREATEDATE").Value = Now
                        '.Fields("CREATEUSER").Value = "ADMIN"
                        '.Fields("MODIFYDATE").Value = Now
                        '.Fields("MODIFYUSER").Value = "ADMIN"

                        '.Fields("SALESORDERITEMSID").Value = SALESORDERITEMID
                        '.Fields("SECCODEID").Value = "SYST00000001"
                        '.Fields("MASSHIPPEDDATE").Value = MyDataRow("ShipDate")
                        '.Fields("masQtyShipped").Value = MyDataRow("QtyShipped")
                        '.Fields("masSchdShipDate").Value = MyDataRow("SchdShipDate")

                    Else
                        '=======================================
                        'updating
                        '=======================================
                        '.Fields("CREATEDATE").Value = Now
                        '.Fields("CREATEUSER").Value = "ADMIN"
                        .Fields("MODIFYDATE").Value = Now
                        .Fields("MODIFYUSER").Value = "ADMIN"

                        '.Fields("PRODUCTID").Value = Productid

                        .Fields("MASSHIPPEDDATE").Value = MyDataRow("ShipDate")
                        .Fields("MASQTYSHIPPED").Value = MyDataRow("QtyShipped")
                        .Fields("MASSCHDSHIPDATE").Value = MyDataRow("SchdShipDate")
                        .Fields("TotalQTYShipped").Value = MyDataRow("TotalQTYShipped")

                        .Fields("STATUSTEXT").Value = MyDataRow("STATUSTEXT")
                        .Fields("OPENQTY").Value = MyDataRow("OPENQTY")

                    End If
                Next

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)
            Add_TACSyncJobERROR(ex, slXLogHeaderID)
            _hasErrors = True 'Log Errors
            Console.WriteLine(ex.Message)

        End Try
    End Sub



    Private Sub Process_Changed_SalesOrderHEADER_Info()

        Dim i As Integer = 0
        '===================================================
        'Dim ProductId As String = ""
        'Dim ShippingId As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_SalesOrderHEADER_TAC_CHANGED"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                i = i + 1
                If (IsDBNull(row("USERFLD3"))) Then
                    ' Try  Userfield 1
                    AddEditSALESORDER(row, row("USERFLD1"), "SalesOrderNumber")
                Else
                    'Good
                    AddEditSALESORDER(row, row("USERFLD3"), "SalesOrderId")
                    If (Not IsDBNull(row("USERFLD4"))) Then
                        ' This Linked to a PickingList so We need to update the Header
                        AddEditPicklist(row, row("USERFLD4"), "PICKINGLISTID")
                    End If

                End If


                Console.WriteLine("Processes HEADER Changed " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "SalesOrder Changes ", ex.Message, EventLogEntryType.Error)
            Add_TACSyncJobERROR(ex, slXLogHeaderID)
            _hasErrors = True 'Log Errors
            Console.WriteLine(ex.Message)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Private Sub Reconcile_Changed_SalesOrderHEADER_Info()

        Dim i As Integer = 0
        '===================================================
        'Dim ProductId As String = ""
        'Dim ShippingId As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_SalesOrderHEADER_TAC_RECONCILE"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                i = i + 1
                AddEditSALESORDER(row, row("USERFLD1"), "SalesOrderNumber")
                'If (IsDBNull(row("USERFLD3"))) Then
                '    ' Try  Userfield 1
                '    AddEditSALESORDER(row, row("USERFLD1"), "SalesOrderNumber")
                'Else
                '    'Good
                '    AddEditSALESORDER(row, row("USERFLD3"), "SalesOrderId")
                '    If (Not IsDBNull(row("USERFLD4"))) Then
                '        ' This Linked to a PickingList so We need to update the Header
                '        AddEditPicklist(row, row("USERFLD4"), "PICKINGLISTID")
                '    End If

                'End If


                Console.WriteLine("Processes HEADER Changed " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "SalesOrder Changes ", ex.Message, EventLogEntryType.Error)
            Add_TACSyncJobERROR(ex, slXLogHeaderID)
            _hasErrors = True 'Log Errors
            Console.WriteLine(ex.Message)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub AddEditSALESORDER(ByVal MyDataRow As DataRow, ByVal strUserField As String, ByVal IDName As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        ' Dim strSQL As String = "SELECT * FROM SALESORDER WHERE SalesOrderNumber = '" & strUserField1 & "'"
        Dim strSQL As String = "SELECT * FROM SALESORDER WHERE " & IDName & " = '" & strUserField & "'"


        Try
            objConn.Open(strSLXConstr)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    'adding
                    .AddNew()

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"
                    If IDName = "SalesOrderNumber" Then
                        '============================
                        '=  SLXID has 4 Parts
                        '=  t OL98 (userSITECODE)  A0 (Keybase) 12345(Base36 Number)
                        '========================
                        'Step 1 Get The  SiteCode
                        Dim SiteCode As String
                        SiteCode = GetSiteCode("ADMIN", strSLXConstr)
                        'Step 2 Get the Keybase
                        Dim Keybase
                        'Keybase = GetSiteKeyBase(m_strConnection, SiteCode) 'GetKeyBase(txtConnString.Text, UserSiteCode)
                        '============================================================================================
                        ' Modified by ssommerfeldt September 21,  This is not Creating the TicketID's Correctly.
                        '  Keybase is allways A0 for a Host database this means you have 56 Billion keys 
                        '   On a Host when you run out of Keys you Generate a New SiteCode and you Start over
                        '   On the Other hand a Remote User will have 60Million and the Key base can Change, This information is 
                        '   Stored in a BLOB
                        '==============================================================================================
                        If IsHostDatabase(strSLXConstr) Then
                            Keybase = "A0"
                        Else
                            '===============================
                            ' Get the Keybase from the BLOB
                            '===============================
                            Dim UserSiteCode As String = ""
                            UserSiteCode = GetUsersSiteCode("ADMIN", strSLXConstr)
                            Keybase = GetKeyBase(strSLXConstr, UserSiteCode)
                        End If
                        'Step 3 Convert the DecValue2Base36 Digit
                        'Parse the Last digets of the PrettyKey
                        '001-00-000047
                        .Fields("SALESORDERID").Value = ConvertToTicketID(SiteCode, Keybase, strUserField)
                        .Fields("ACCOUNTID").Value = "TEMP"
                        .Fields("SECCODEID").Value = "SYST00000001"
                        .Fields("ALTERNATEKEYPREFIX").Value = Left(strUserField, strUserField.Length - InStrRev(strUserField, "-", -1))
                        .Fields("ALTERNATEKEYSUFFIX").Value = Right(strUserField, InStrRev(strUserField, "-", -1) - 1)

                    End If
                    If IDName = "SalesOrderId" Then

                        .Fields("SALESORDERID").Value = strUserField
                        .Fields("ACCOUNTID").Value = "TEMP"
                        .Fields("SECCODEID").Value = "SYST00000001"

                    End If


                    .Fields("MASSTATUS").Value = MyDataRow("TranStatusAsText")
                    .Fields("MASNumber").Value = MyDataRow("TranID")


                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    '.Fields("PRODUCTID").Value = Productid

                    .Fields("MASSTATUS").Value = MyDataRow("TranStatusAsText")
                    .Fields("MASNumber").Value = MyDataRow("TranID")



                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            Add_TACSyncJobERROR(ex, slXLogHeaderID)
            _hasErrors = True 'Log Errors
            Console.WriteLine(ex.Message)

        End Try
    End Sub
    Public Sub AddEditPicklist(ByVal MyDataRow As DataRow, ByVal strUserField As String, ByVal IDName As String)
        '============================================================
        ' get Default Data row from Picklist SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        ' Dim strSQL As String = "SELECT * FROM SALESORDER WHERE SalesOrderNumber = '" & strUserField1 & "'"
        Dim strSQL As String = "SELECT * FROM PICKINGLIST WHERE " & IDName & " = '" & strUserField & "'"


        Try
            objConn.Open(strSLXConstr)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    'adding
                    '.AddNew()

                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    '.Fields("MODIFYDATE").Value = Now
                    '.Fields("MODIFYUSER").Value = "ADMIN"

                    '.Fields("SALESORDERITEMSID").Value = SALESORDERITEMID

                    '.Fields("MASSHIPPEDDATE").Value = MyDataRow("ShipDate")
                    '.Fields("masQtyShipped").Value = MyDataRow("QtyShipped")
                    '.Fields("masSchdShipDate").Value = MyDataRow("SchdShipDate")

                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    '.Fields("PRODUCTID").Value = Productid

                    .Fields("MASSTATUS").Value = MyDataRow("TranStatusAsText")
                    .Fields("MASNumber").Value = MyDataRow("TranID")



                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            Add_TACSyncJobERROR(ex, slXLogHeaderID)
            _hasErrors = True 'Log Errors
            Console.WriteLine(ex.Message)
            'MsgBox(ex.Message)

        End Try
    End Sub

    Public Function GetSalesOrderItemID(ByVal SalesOrderId As String, ByVal ItemKey As String) As String

        ' Old Way Fixed Oct 1, 2015

        'Dim sql As String = "SELECT     sysdba.SALESORDERITEMS.SALESORDERITEMSID "
        'sql = sql & " FROM         sysdba.SALESORDERITEMS INNER JOIN"
        'sql = sql & "                       sysdba.PRODUCT ON sysdba.SALESORDERITEMS.PRODUCTID = sysdba.PRODUCT.PRODUCTID"
        'sql = sql & " WHERE     (sysdba.SALESORDERITEMS.SALESORDERID = '" & SalesOrderId & "') and (MASITEMKEY = '" & ItemKey & "')  AND  (sysdba.SALESORDERITEMS.QUANTITY > 0)"

        Dim sql As String = "SELECT     sysdba.SALESORDERITEMS.SALESORDERITEMSID "
        sql = sql & " FROM         sysdba.SALESORDERITEMS INNER JOIN"
        sql = sql & "               sysdba.PRODUCT ON sysdba.SALESORDERITEMS.PRODUCTID = sysdba.PRODUCT.PRODUCTID INNER JOIN"
        sql = sql & "                       sysdba.SALESORDER ON sysdba.SALESORDERITEMS.SALESORDERID = sysdba.SALESORDER.SALESORDERID INNER JOIN"
        sql = sql & "               sysdba.SITE ON sysdba.SALESORDER.USERWHSEID = sysdba.SITE.SITEID "
        'And sysdba.PRODUCT.WAREHOUSEID = sysdba.SITE.SITECODE" 'sso
        sql = sql & " WHERE     (sysdba.SALESORDERITEMS.SALESORDERID = '" & SalesOrderId & "') and (MASITEMKEY = '" & ItemKey & "')  AND  (sysdba.SALESORDERITEMS.QUANTITY <> 0)"

        Dim strConnection As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        Using conn As New SqlConnection(strConnection)
            Dim cmd As New SqlCommand(sql, conn)
            '==========================================================================
            ' Clean Out the Compare Table 
            '===========================================================================
            Try
                conn.Open()
                If IsDBNull(cmd.ExecuteScalar()) Then
                    Return ""

                Else
                    Dim fieldval As String = cmd.ExecuteScalar()
                    If fieldval = Nothing Then
                        Return ""
                    Else
                        Return fieldval
                    End If

                End If
            Catch ex As Exception
                Call LogErrors(PROJECTNAME, " - Main", ex.Message, EventLogEntryType.Error)
                Add_TACSyncJobERROR(ex, slXLogHeaderID)
                _hasErrors = True 'Log Errors
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try

            '==========================================================================

        End Using


    End Function
    Public Function GetPickingListItemID(ByVal PickingListId As String, ByVal ItemKey As String) As String

        ' Old Way Fixed Oct 1, 2015



        Dim sql As String = " "
        sql = sql & " SELECT     sysdba.PICKINGLISTITEM.PICKINGLISTITEMID"
        sql = sql & " FROM         sysdba.PICKINGLISTITEM INNER JOIN"
        sql = sql & "                       sysdba.PRODUCT ON sysdba.PICKINGLISTITEM.PRODUCTID = sysdba.PRODUCT.PRODUCTID INNER JOIN"
        sql = sql & "                       sysdba.PICKINGLIST ON sysdba.PICKINGLISTITEM.PICKINGLISTID = sysdba.PICKINGLIST.PICKINGLISTID"
        sql = sql & " WHERE     (sysdba.PICKINGLISTITEM.PICKINGLISTID = '" & PickingListId & "') AND (sysdba.PRODUCT.WAREHOUSEID = 'DEL') AND (sysdba.PRODUCT.MASITEMKEY = '" & ItemKey & "') AND"
        sql = sql & "                        (sysdba.PICKINGLISTITEM.QTYORD <> 0)"

        Dim strConnection As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        Using conn As New SqlConnection(strConnection)
            Dim cmd As New SqlCommand(sql, conn)
            '==========================================================================
            ' Clean Out the Compare Table 
            '===========================================================================
            Try
                conn.Open()
                If IsDBNull(cmd.ExecuteScalar()) Then
                    Return ""

                Else
                    Dim fieldval As String = cmd.ExecuteScalar()
                    If fieldval = Nothing Then
                        Return ""
                    Else
                        Return fieldval
                    End If

                End If
            Catch ex As Exception
                Call LogErrors(PROJECTNAME, " - Main", ex.Message, EventLogEntryType.Error)
                Add_TACSyncJobERROR(ex, slXLogHeaderID)
                _hasErrors = True 'Log Errors
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try

            '==========================================================================

        End Using


    End Function

    Public Function GetField(ByVal Field As String, ByVal Table As String, ByVal Where As String, ByVal SlxConnectionString As String) As String
        Dim sql As String = String.Format("select {0} from {1} where {2}", Field, Table, (If(Where.Equals(String.Empty), "1=1", Where)))

        Using conn As New OleDbConnection(SlxConnectionString)
            conn.Open()
            Using cmd As New OleDbCommand(sql, conn)

                If IsDBNull(cmd.ExecuteScalar()) Then
                    Return ""

                Else
                    Dim fieldval As String = cmd.ExecuteScalar()
                    If fieldval = Nothing Then
                        Return ""
                    Else
                        Return fieldval
                    End If

                End If

            End Using
        End Using
    End Function

    Public Sub TACSyncJob_Start(ByVal Desc As String, ByVal ExecutionPath As String, ByVal Id As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM sysdba.TACSYNCJOB WHERE TACSYNCJOBID = '" & Id & "'"


        Try
            objConn.Open(My.Settings.SLXNativeConnection) ' Note Use the Native Client as we don't want to Sync This
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    'adding
                    .AddNew()
                    .Fields("TACSYNCJOBID").Value = Id
                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("DESCRIPTION").Value = Desc
                    .Fields("EXECUTIONPATH").Value = ExecutionPath
                    .Fields("STATUS").Value = "Started"
                    .Fields("STARTTIME").Value = Now
                    '.Fields("ENDTIME").Value = ""

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'Add_TACSyncJobERROR(ex, slXLogHeaderID)
            _hasErrors = True 'Log Errors
            Console.WriteLine(ex.Message)
            'MsgBox(ex.Message)

        End Try
    End Sub
    Public Sub TACSyncJob_END(ByVal Status As String, ByVal Id As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM sysdba.TACSYNCJOB WHERE TACSYNCJOBID = '" & Id & "'"


        Try
            objConn.Open(My.Settings.SLXNativeConnection) ' Note use the Native client as we don't want to sync this.
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    'adding  Not Needed to End
                    '.AddNew()

                Else
                    ' Updating
                    '.Fields("TACSYNCJOBID").Value = Id
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    '.Fields("DESCRIPTION").Value = Desc
                    '.Fields("EXECUTIONPATH").Value = ExecutionPath
                    .Fields("STATUS").Value = Status
                    '.Fields("STARTTIME").Value = Now
                    .Fields("ENDTIME").Value = Now

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'Add_TACSyncJobERROR(ex, slXLogHeaderID)
            _hasErrors = True 'Log Errors
            Console.WriteLine(ex.Message)
            'MsgBox(ex.Message)

        End Try
    End Sub
    Public Sub Add_TACSyncJobERROR(ByVal ex As Exception, ByVal LogHeadId As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM sysdba.TACSYNCJOBERRORS WHERE 1=2"
        Dim ID As String
        Dim trace = New Diagnostics.StackTrace(ex, True)


        Try
            objConn.Open(My.Settings.SLXNativeConnection) 'NOTE Uses Native Client we don't want to Sync This
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    'adding 
                    .AddNew()
                    .Fields("TACSYNCJOBERRORSID").Value = GetNewSLXID("TACSYNCJOBERRORS", My.Settings.SLXConnection)
                    .Fields("TACSYNCJOBID").Value = LogHeadId
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("CREATEDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("ERRORMESSAGE").Value = ex.Message
                    .Fields("STACKTRACE").Value = trace.ToString
                End If

                .UpdateBatch()
                .Close()
            End With


        Catch reex As Exception
            'Add_TACSyncJobERROR(ex, slXLogHeaderID)
            _hasErrors = True 'Log Errors
            Console.WriteLine(reex.Message)
            'MsgBox(ex.Message)

        End Try
    End Sub

    Private Sub Process_CleanUpUnUsedTransmittedSalesItems()

        Dim i As Integer = 0
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim ID As String


        Dim SQL As String = "Select SALESORDERITEMSID  from sysdba.SALESORDERITEMS where QUANTITY = 0 and SALESORDERID in (Select SALESORDERID  from sysdba.SALESORDER where STATUS ='Transmitted to Accounting'    and DATEDIFF (dd,TRANSMITDATE,getdate()) > 30  )"

        Try
            objConn.Open(My.Settings.SLXConnection) 'NOTE Uses Native Client we don't want to Sync This
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(SQL, objConn)

                For i = 0 To .RecordCount - 1          ' Loop
                    If Not (.BOF And .EOF) Then        ' Check not at end/beginning
                        .Delete()

                        .MoveNext()
                        Console.WriteLine("Clean SalesItem " & i)

                        If i = 2000 Then ' Max 2000 Items cleans
                            Console.WriteLine("Reached Limit of 2000 Cleaned Items")
                            Exit For
                        End If
                    End If

                Next


                .UpdateBatch()
                .Close()
            End With




        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "SalesOrderItems Clean-up ", ex.Message, EventLogEntryType.Error)
            Add_TACSyncJobERROR(ex, slXLogHeaderID)
            _hasErrors = True 'Log Errors
            Console.WriteLine(ex.Message)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub






End Module
