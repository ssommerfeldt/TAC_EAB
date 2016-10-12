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
        ' Process_Changed_SalesOrderHEADER_Info()
        ' 6. Process Deletes
        '    DO NOT PROCESS DELETES


        '================================================================
        '= LINE
        '================================================================
        Console.WriteLine("------ Line Changes Start ------")
        ' MAS500 Query
        Dim SQL_LINE As String = ""
        SQL_LINE = SQL_LINE & " SELECT     vdvShipmentLine.ItemKey, vdvShipmentLine.ShipDate, vdvShipmentLine.QtyShipped, vdvShipmentLine.SchdShipDate, tsoSalesOrder.TranID, "
        SQL_LINE = SQL_LINE & "                       tsoSalesOrder.UserFld1, tsoSalesOrder.UserFld2, tsoSalesOrder.UserFld3, tsoSalesOrder.UserFld4, CONVERT(decimal(16, 8), tmpTotalQTYShipped.TotalQTYShipped)"
        SQL_LINE = SQL_LINE & "                        AS TotalQTYShipped, Convert(decimal(16,8),tmpQTYOrdered.TotalQTYOrdered) as TotalQTYOrdered , tmpQTYOrdered.StatusText,"
        SQL_LINE = SQL_LINE & "                         CASE StatusText "
        SQL_LINE = SQL_LINE & " 							WHEN 'Open' THEN "
        SQL_LINE = SQL_LINE & " 								Convert(decimal(16,8),ABS(TotalQTYOrdered - CONVERT(decimal(16, 8), tmpTotalQTYShipped.TotalQTYShipped))) "
        SQL_LINE = SQL_LINE & " 							WHEN 'Closed' THEN Convert(decimal(16,8),0) "
        SQL_LINE = SQL_LINE & " 						END AS OpenQTY"
        SQL_LINE = SQL_LINE & " FROM         vdvShipmentLine INNER JOIN"
        SQL_LINE = SQL_LINE & "                       tsoSalesOrder ON vdvShipmentLine.SOKey = tsoSalesOrder.SOKey LEFT OUTER JOIN"
        SQL_LINE = SQL_LINE & "                           (SELECT     SUM(tsoSOLineDist.QtyOrd) AS TotalQTYOrdered, timItem.ItemKey, tsoSOLine_1.SOKey, "
        SQL_LINE = SQL_LINE & "                                                    CASE tsoSOlinedist.Status WHEN 1 THEN 'Open' WHEN 2 THEN 'Closed' END AS StatusText"
        SQL_LINE = SQL_LINE & "                             FROM          tsoSOLineDist INNER JOIN"
        SQL_LINE = SQL_LINE & "                                                    tsoSOLine AS tsoSOLine_1 ON tsoSOLine_1.SOLineKey = tsoSOLineDist.SOLineKey INNER JOIN"
        SQL_LINE = SQL_LINE & "                                                    timItem ON tsoSOLine_1.ItemKey = timItem.ItemKey"
        SQL_LINE = SQL_LINE & "                             GROUP BY timItem.ItemKey, tsoSOLine_1.SOKey, CASE tsoSOlinedist.Status WHEN 1 THEN 'Open' WHEN 2 THEN 'Closed' END) AS tmpQTYOrdered ON "
        SQL_LINE = SQL_LINE & "                       vdvShipmentLine.SOKey = tmpQTYOrdered.SOKey AND vdvShipmentLine.ItemKey = tmpQTYOrdered.ItemKey LEFT OUTER JOIN"
        SQL_LINE = SQL_LINE & "                           (SELECT     SUM(tsoShipLineDist.QtyShipped) AS TotalQTYShipped, tsoShipLine.ItemKey, tsoSOLine.SOKey"
        SQL_LINE = SQL_LINE & "                             FROM          tsoShipLineDist INNER JOIN"
        SQL_LINE = SQL_LINE & "                                                    tsoShipLine ON tsoShipLineDist.ShipLineKey = tsoShipLine.ShipLineKey INNER JOIN"
        SQL_LINE = SQL_LINE & "                                                    tsoShipment ON tsoShipLine.ShipKey = tsoShipment.ShipKey INNER JOIN"
        SQL_LINE = SQL_LINE & "                                                    tsoSOLine ON tsoSOLine.SOLineKey = tsoShipLine.SOLineKey"
        SQL_LINE = SQL_LINE & "                             GROUP BY tsoShipLine.ItemKey, tsoSOLine.SOKey) AS tmpTotalQTYShipped ON vdvShipmentLine.SOKey = tmpTotalQTYShipped.SOKey AND "
        SQL_LINE = SQL_LINE & "         vdvShipmentLine.ItemKey = tmpTotalQTYShipped.ItemKey"
        SQL_LINE = SQL_LINE & "         WHERE(tsoSalesOrder.UserFld1 Is Not NULL )  "
        'SQL_LINE = SQL_LINE & "         WHERE(1=2)"
        SQL_LINE = SQL_LINE & "         UNION"
        SQL_LINE = SQL_LINE & " SELECT     tsoShipLine.ItemKey, tsoShipment.PostDate, tsoShipLineDist.QtyShipped, tsoShipment.PostDate AS SchdShipDate, vdvCustomerReturn.TranID, "
        SQL_LINE = SQL_LINE & "                       vdvCustomerReturn.UserFld1, vdvCustomerReturn.UserFld2, vdvCustomerReturn.UserFld3, vdvCustomerReturn.UserFld4, "
        SQL_LINE = SQL_LINE & "                       CONVERT(decimal(16, 8), tsoShipLineDist.QtyShipped) AS TotalQTYShipped,"
        SQL_LINE = SQL_LINE & "                       CONVERT(decimal(16, 8), tsoShipLineDist.QtyShipped) AS TotalQTYOrdered,"
        SQL_LINE = SQL_LINE & "         'Closed' as StatusText,"
        SQL_LINE = SQL_LINE & "                       Convert(decimal(16,8),0) as OpenQty"
        SQL_LINE = SQL_LINE & " FROM         vdvCustomerReturn INNER JOIN"
        SQL_LINE = SQL_LINE & "                       tsoShipLine ON vdvCustomerReturn.ShipKey = tsoShipLine.ShipKey INNER JOIN"
        SQL_LINE = SQL_LINE & "                       tsoShipLineDist ON tsoShipLine.ShipLineKey = tsoShipLineDist.ShipLineKey INNER JOIN"
        SQL_LINE = SQL_LINE & "                       tsoShipment ON vdvCustomerReturn.ShipKey = tsoShipment.ShipKey"
        'SQL_LINE = SQL_LINE & "         WHERE( 1=2)"
        SQL_LINE = SQL_LINE & "         WHERE(vdvCustomerReturn.UserFld1 Is Not NULL)"
        'SQL_LINE = SQL_LINE & "         WHERE(vdvCustomerReturn.UserFld1  LIKE '%229-06-137629%')"




        'SQL_LINE = SQL_LINE & " SELECT     vdvShipmentLine.ItemKey, vdvShipmentLine.ShipDate, vdvShipmentLine.QtyShipped, vdvShipmentLine.SchdShipDate, tsoSalesOrder.TranID, "
        'SQL_LINE = SQL_LINE & "                       tsoSalesOrder.UserFld1, tsoSalesOrder.UserFld2, tsoSalesOrder.UserFld3, tsoSalesOrder.UserFld4, convert(decimal(16,8),tmpTotalQTYShipped.TotalQTYShipped) TotalQTYShipped"
        'SQL_LINE = SQL_LINE & " FROM         vdvShipmentLine INNER JOIN"
        'SQL_LINE = SQL_LINE & "                       tsoSalesOrder ON vdvShipmentLine.SOKey = tsoSalesOrder.SOKey LEFT OUTER JOIN"
        'SQL_LINE = SQL_LINE & "                           (SELECT     SUM(tsoShipLineDist.QtyShipped) AS TotalQTYShipped, tsoShipLine.ItemKey, tsoSOLine.SOKey"
        'SQL_LINE = SQL_LINE & "                             FROM          tsoShipLineDist INNER JOIN"
        'SQL_LINE = SQL_LINE & "                                                    tsoShipLine ON tsoShipLineDist.ShipLineKey = tsoShipLine.ShipLineKey INNER JOIN"
        'SQL_LINE = SQL_LINE & "                                                    tsoShipment ON tsoShipLine.ShipKey = tsoShipment.ShipKey INNER JOIN"
        'SQL_LINE = SQL_LINE & "                                                    tsoSOLine ON tsoSOLine.SOLineKey = tsoShipLine.SOLineKey"
        'SQL_LINE = SQL_LINE & "                             GROUP BY tsoShipLine.ItemKey, tsoSOLine.SOKey) AS tmpTotalQTYShipped ON vdvShipmentLine.SOKey = tmpTotalQTYShipped.SOKey AND "
        'SQL_LINE = SQL_LINE & "         vdvShipmentLine.ItemKey = tmpTotalQTYShipped.ItemKey"
        'SQL_LINE = SQL_LINE & "         WHERE(tsoSalesOrder.UserFld1 Is Not NULL)"
        ''SQL_LINE = SQL_LINE & "         WHERE(1=2)"
        'SQL_LINE = SQL_LINE & "         UNION       "
        'SQL_LINE = SQL_LINE & " SELECT     tsoShipLine.ItemKey, tsoShipment.PostDate, tsoShipLineDist.QtyShipped, tsoShipment.PostDate AS SchdShipDate, vdvCustomerReturn.TranID, "
        'SQL_LINE = SQL_LINE & "                       vdvCustomerReturn.UserFld1, vdvCustomerReturn.UserFld2, vdvCustomerReturn.UserFld3, vdvCustomerReturn.UserFld4, Convert(decimal(16,8),QtyShipped )as TotalQTYShipped"
        'SQL_LINE = SQL_LINE & " FROM         vdvCustomerReturn INNER JOIN"
        'SQL_LINE = SQL_LINE & "                       tsoShipLine ON vdvCustomerReturn.ShipKey = tsoShipLine.ShipKey INNER join"
        'SQL_LINE = SQL_LINE & "                       tsoShipLineDist ON tsoShipLine.ShipLineKey = tsoShipLineDist.ShipLineKey INNER JOIN"
        'SQL_LINE = SQL_LINE & "                       tsoShipment ON vdvCustomerReturn.ShipKey = tsoShipment.ShipKey"
        '' SQL_LINE = SQL_LINE & "         WHERE(vdvCustomerReturn.TranID  LIKE '%20366%')"
        'SQL_LINE = SQL_LINE & "         WHERE(vdvCustomerReturn.UserFld1 Is Not NULL)"

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



        Call LogErrors(PROJECTNAME, " - Main", "Process End", EventLogEntryType.Information)
    End Sub

    
    Public Sub Clean_Table(strTable As String, ConnectionString As String)


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
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try

            '==========================================================================

        End Using


    End Sub

    Private Sub Move_Temp_To_Compare(strCOMPARE_Table As String, strTEMP_Table As String, ConnectionString As String)

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
                    bulkCopy.NotifyAfter = 1
                    ' bulkCopy.SqlRowsCopied += New SqlRowsCopiedEventHandler(bulkCopy_SqlRowsCopied)
                    bulkCopy.DestinationTableName = strDestinationTableName
                    bulkCopy.WriteToServer(reader)
                End Using
            End Using
            reader.Close()
        End Using
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
                Else
                    '====================================================
                    ' Normal Order Lines
                    '=====================================================
                    If (IsDBNull(row("USERFLD3"))) Then
                        ' Try  Userfield 1
                        If Not IsDBNull(row("SALESORDERID")) Then
                            Try
                                SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                                AddEditSALESORDERITEM(row, SalesOrderItemId)
                            Catch ex As Exception
                                MsgBox(ex.Message)
                            End Try
                        End If


                    Else
                        'Good
                        'AddEditSALESORDER(row, row("USERFLD3"), "SalesOrderId")
                        Try
                            SalesOrderItemId = GetSalesOrderItemID(row("USERFLD3"), row("ItemKey"))
                            AddEditSALESORDERITEM(row, SalesOrderItemId)
                            If (Not IsDBNull(row("USERFLD4"))) Then
                                ' This Linked to a PickingList so We need to update the Header
                                'AddEditPicklist(row, row("USERFLD4"), "PICKINGLISTID")
                                AddEditPICKINGLISTITEM(row, SalesOrderItemId)

                            End If
                        Catch ex As Exception

                        End Try


                    End If
                End If
              

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
                    'adding()
                    .AddNew()

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"
                    .Fields("SALESORDERID").Value = "TEMP"
                    .Fields("SALESORDERITEMSID").Value = SALESORDERITEMID

                    .Fields("MASSHIPPEDDATE").Value = MyDataRow("ShipDate")
                    .Fields("masQtyShipped").Value = MyDataRow("QtyShipped")
                    .Fields("masSchdShipDate").Value = MyDataRow("SchdShipDate")
                    .Fields("TotalQTYShipped").Value = MyDataRow("TotalQTYShipped")
                    .Fields("STATUSTEXT").Value = MyDataRow("TotalQTYSSTATUSTEXThipped")
                    .Fields("OPENQTY").Value = MyDataRow("OPENQTY")


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
            'MsgBox(ex.Message)

        End Try
    End Sub

    Public Function GetSalesOrderItemID(SalesOrderId As String, ItemKey As String) As String

        ' Old Way Fixed Oct 1, 2015

        'Dim sql As String = "SELECT     sysdba.SALESORDERITEMS.SALESORDERITEMSID "
        'sql = sql & " FROM         sysdba.SALESORDERITEMS INNER JOIN"
        'sql = sql & "                       sysdba.PRODUCT ON sysdba.SALESORDERITEMS.PRODUCTID = sysdba.PRODUCT.PRODUCTID"
        'sql = sql & " WHERE     (sysdba.SALESORDERITEMS.SALESORDERID = '" & SalesOrderId & "') and (MASITEMKEY = '" & ItemKey & "')  AND  (sysdba.SALESORDERITEMS.QUANTITY > 0)"

        Dim sql As String = "SELECT     sysdba.SALESORDERITEMS.SALESORDERITEMSID "
        sql = sql & " FROM         sysdba.SALESORDERITEMS INNER JOIN"
        sql = sql & "               sysdba.PRODUCT ON sysdba.SALESORDERITEMS.PRODUCTID = sysdba.PRODUCT.PRODUCTID INNER JOIN"
        sql = sql & "                       sysdba.SALESORDER ON sysdba.SALESORDERITEMS.SALESORDERID = sysdba.SALESORDER.SALESORDERID INNER JOIN"
        sql = sql & "               sysdba.SITE ON sysdba.SALESORDER.USERWHSEID = sysdba.SITE.SITEID AND sysdba.PRODUCT.WAREHOUSEID = sysdba.SITE.SITECODE"
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







End Module
