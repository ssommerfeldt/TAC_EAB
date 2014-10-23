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

#End Region
    Sub Main()
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

        Console.WriteLine("Move Temp into Compare")
        Call Clean_SalesOrder_Compare()
        Call Move_SalesOrder_Temp_To_Compare()
        Console.WriteLine("Clean Temp table")
        Call CleanTempDir()
        Console.WriteLine("Get Source Data")
        Call GetSourceData()
        Console.WriteLine("------ Salesorder Start ------")
        Call Process_Changed_SalesOrder_Info()

        Console.WriteLine("------ Shipping Changes Start ------")
        Call Process_ChangedShippingInfo()

        
        'Console.WriteLine("------ Address Start ------")
        'Call Process_LEADAddress()
       

        Call LogErrors(PROJECTNAME, " - Main", "Process End", EventLogEntryType.Information)
    End Sub

    Private Sub Clean_SalesOrder_Compare()


        Dim sql As String = "Truncate table dbo.MAS_to_SLX_SalesOrderItemShipment_TAC_zcompare"
        Dim strConnection As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
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
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try

            '==========================================================================
           
        End Using


    End Sub

    Private Sub Move_SalesOrder_Temp_To_Compare()


        Dim sql As String
        sql = "Insert into dbo.MAS_to_SLX_SalesOrderItemShipment_TAC_zcompare"
        sql = sql & " Select * from dbo.MAS_to_SLX_SalesOrderItemShipment_TAC_temp"
        Dim strConnection As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        Using conn As New SqlConnection(strConnection)
            Dim cmd As New SqlCommand(sql, conn)
            '==========================================================================
            ' Push all Records from Temp into Compare
            '===========================================================================
            Try
                conn.Open()
                cmd.ExecuteNonQuery()
            Catch ex As Exception
                Call LogErrors(PROJECTNAME, " - Main", ex.Message, EventLogEntryType.Error)
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try

            
        End Using


    End Sub

    Private Sub CleanTempDir()


        Dim sql As String = "Truncate table dbo.MAS_to_SLX_SalesOrderItemShipment_TAC_temp"
        Dim strConnection As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        Using conn As New SqlConnection(strConnection)
            Dim cmd As New SqlCommand(sql, conn)

            Try
                conn.Open()
                cmd.ExecuteNonQuery()
            Catch ex As Exception
                Call LogErrors(PROJECTNAME, " - Main", ex.Message, EventLogEntryType.Error)
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try
        End Using


    End Sub

    Private Sub GetSourceData()
        Dim SourceconnectionString As String = CleanBulkLoadNativeSQLConnectionString(strMASConstr)
        Dim SLXConnectionString As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        Dim strSourceSQL As String
       
        strSourceSQL = " SELECT * from vdvMAS_to_SLX_SalesOrderItemShipment_TAC"


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
                    bulkCopy.DestinationTableName = "MAS_to_SLX_SalesOrderItemShipment_TAC_temp"
                    bulkCopy.WriteToServer(reader)
                End Using
            End Using
            reader.Close()
        End Using
    End Sub


    Private Sub Process_ChangedShippingInfo()

        Dim i As Integer = 0
        '===================================================
        Dim ProductId As String = ""
        'Dim ShippingId As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_SalesOrder_TAC_CHANGED"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                i = i + 1
                AddEditSALESORDERITEM(row, row("SALESORDERITEMSID"))

                Console.WriteLine("Processes SalesorderItem Changed" & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "SalesOrderItems Changes ", ex.Message, EventLogEntryType.Error)
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

                    .Fields("MASSHIPPEDDATE").Value = MyDataRow("ShipDate")
                    .Fields("MASQTYSHIPPED").Value = MyDataRow("QtyShipped")
                    .Fields("MASSCHDSHIPDATE").Value = MyDataRow("SchdShipDate")

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub


    Private Sub Process_Changed_SalesOrder_Info()

        Dim i As Integer = 0
        '===================================================
        Dim ProductId As String = ""
        'Dim ShippingId As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select Distinct  SALESORDERID, StatusTXT, TRANID from vdvMAS_to_SLX_SalesOrder_TAC_CHANGED"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                i = i + 1
                AddEditSALESORDER(row, row("SALESORDERID"))

                Console.WriteLine("Processes Salesorder Changed " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "SalesOrder Changes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub AddEditSALESORDER(ByVal MyDataRow As DataRow, ByVal SALESORDERID As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM SALESORDER WHERE SALESORDERID = '" & SALESORDERID & "'"


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

                    .Fields("MASSTATUS").Value = MyDataRow("StatusTXT")
                    .Fields("MASNumber").Value = MyDataRow("TRANID")

                   

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub







End Module
