
Imports System.Data.OleDb

Module timWarehouse

    Public Sub timWarehouseMain()
        '====================================================================================================
        ' timWarehouse
        '====================================================================================================
        ' MAS500 Query
        Dim SQL As String = "SELECT * from timWarehouse"

        '=================================================================================
        ' 1. CLEAN COMPARE
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_timWarehouse_zcompare", strSLXNativeConstr)
        '=================================================================================
        ' 2. MOVE TEMP TO COMPARE
        '=================================================================================
        Move_Temp_To_Compare("dbo.MAS_to_SLX_timWarehouse_zcompare", "dbo.MAS_to_SLX_timWarehouse_temp", strSLXNativeConstr)
        '=================================================================================
        ' 3. CLEAN TEMP
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_timWarehouse_temp", strSLXNativeConstr)
        '=================================================================================
        ' 4. MOVE SOURCE TO TEMP
        '=================================================================================
        GetSourceData(SQL, "dbo.MAS_to_SLX_timWarehouse_temp")
        '=================================================================================
        ' 5. Process Insert / Updates
        '=================================================================================
        Process_Changed_timWarehouse()
        '=================================================================================
        ' 6. Process Deletes
        '=================================================================================
        Process_DELETE_timWarehouse()
    End Sub

    Private Sub Process_Changed_timWarehouse()

        Dim i As Integer = 0
        '===================================================
        Dim ProductId As String = ""
        'Dim ShippingId As String = ""
        'Dim BillingId As String = ""
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from dbo.vdvMAS_to_SLX_timWarehouse_TAC_CHANGED "


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("WhseKey")
                AddEdit_timWarehouse(row, Id)

                Console.WriteLine("Processes timWarehouse Changed " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "timWarehouse Changes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub AddEdit_timWarehouse(ByVal MyDataRow As DataRow, ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM timWarehouse WHERE WhseKey = '" & Id & "'"


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


                    .Fields("TIMWAREHOUSEID").Value = GetNewSLXID("timWarehouse", strSLXConstr) 'MyDataRow("timWarehouseID")

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("WhseKey").Value = MyDataRow("WhseKey")
                    .Fields("AllowImmedPickFromSO").Value = MyDataRow("AllowImmedPickFromSO")
                    .Fields("AllowImmedShipFromPick").Value = MyDataRow("AllowImmedShipFromPick")
                    .Fields("AllowTrnsfrBackOrd").Value = MyDataRow("AllowTrnsfrBackOrd")
                    .Fields("CompanyID").Value = MyDataRow("CompanyID")
                    .Fields("CostOfCarry").Value = MyDataRow("CostOfCarry")
                    .Fields("COSAcctKey").Value = MyDataRow("COSAcctKey")
                    .Fields("CostTierAdjAcctKey").Value = MyDataRow("CostTierAdjAcctKey")
                    .Fields("CostToReplenish").Value = MyDataRow("CostToReplenish")
                    .Fields("CostWhseKey").Value = MyDataRow("CostWhseKey")
                    .Fields("Description").Value = MyDataRow("Description")
                    .Fields("DfltLotPickMethod").Value = MyDataRow("DfltLotPickMethod")
                    .Fields("DfltPickMeth").Value = MyDataRow("DfltPickMeth")
                    .Fields("DfltPickOfOutOfStockItems").Value = MyDataRow("DfltPickOfOutOfStockItems")
                    .Fields("ImmedInvcPrinterDest").Value = MyDataRow("ImmedInvcPrinterDest")
                    .Fields("ImmedInvcRptSettingKey").Value = MyDataRow("ImmedInvcRptSettingKey")
                    .Fields("ImmedPickPrinterDest").Value = MyDataRow("ImmedPickPrinterDest")
                    .Fields("ImmedPickRptSettingKey").Value = MyDataRow("ImmedPickRptSettingKey")
                    .Fields("InvtAcctKey").Value = MyDataRow("InvtAcctKey")
                    .Fields("IssueAcctKey").Value = MyDataRow("IssueAcctKey")
                    .Fields("LastRankDate").Value = MyDataRow("LastRankDate")
                    .Fields("LastRankInvtPerKey").Value = MyDataRow("LastRankInvtPerKey")
                    .Fields("LastRplnsmntUpdate").Value = MyDataRow("LastRplnsmntUpdate")
                    .Fields("MailAddrKey").Value = MyDataRow("MailAddrKey")
                    .Fields("MaxDemandMult").Value = MyDataRow("MaxDemandMult")
                    .Fields("MaxOrderCycle").Value = MyDataRow("MaxOrderCycle")
                    .Fields("MaxQualLeadTime").Value = MyDataRow("MaxQualLeadTime")
                    .Fields("MaxQualLeadTimePct").Value = MyDataRow("MaxQualLeadTimePct")
                    .Fields("MaxSeasDemandMult").Value = MyDataRow("MaxSeasDemandMult")
                    .Fields("MinDemandMult").Value = MyDataRow("MinDemandMult")
                    .Fields("MinOrderCycle").Value = MyDataRow("MinOrderCycle")
                    .Fields("MinQualLeadTimePct").Value = MyDataRow("MinQualLeadTimePct")
                    .Fields("MiscAdjAcctKey").Value = MyDataRow("MiscAdjAcctKey")
                    .Fields("PhysCountAcctKey").Value = MyDataRow("PhysCountAcctKey")
                    .Fields("PriceWhseKey").Value = MyDataRow("PriceWhseKey")
                    .Fields("PurchAcctKey").Value = MyDataRow("PurchAcctKey")
                    .Fields("ReordMeth").Value = MyDataRow("ReordMeth")
                    .Fields("RestockMeth").Value = MyDataRow("RestockMeth")
                    .Fields("RestockRate").Value = MyDataRow("RestockRate")
                    .Fields("SalesAcctKey").Value = MyDataRow("SalesAcctKey")
                    .Fields("SalesOffsetAcctKey").Value = MyDataRow("SalesOffsetAcctKey")
                    .Fields("SalesReturnAcctKey").Value = MyDataRow("SalesReturnAcctKey")
                    .Fields("ShipAddrKey").Value = MyDataRow("ShipAddrKey")
                    .Fields("ShipComplete").Value = MyDataRow("ShipComplete")
                    .Fields("SortPickTckt").Value = MyDataRow("SortPickTckt")
                    .Fields("STaxSchdKey").Value = MyDataRow("STaxSchdKey")
                    .Fields("TrackQtyAtBin").Value = MyDataRow("TrackQtyAtBin")
                    .Fields("Transit").Value = MyDataRow("Transit")
                    .Fields("TrendPct").Value = MyDataRow("TrendPct")
                    .Fields("TrnsfrExpAcctKey").Value = MyDataRow("TrnsfrExpAcctKey")
                    .Fields("TrnsfrFrtChrgOpt").Value = MyDataRow("TrnsfrFrtChrgOpt")
                    .Fields("TrnsfrMrkupAcctKey").Value = MyDataRow("TrnsfrMrkupAcctKey")
                    .Fields("TrnsfrSrchrgOpt").Value = MyDataRow("TrnsfrSrchrgOpt")
                    .Fields("UpdateCounter").Value = MyDataRow("UpdateCounter")
                    .Fields("UseBins").Value = MyDataRow("UseBins")
                    .Fields("UseZones").Value = MyDataRow("UseZones")
                    .Fields("WhseID").Value = MyDataRow("WhseID")
                    .Fields("WhseMgrCntctKey").Value = MyDataRow("WhseMgrCntctKey")
                    .Fields("WhseOvrdSegValue").Value = MyDataRow("WhseOvrdSegValue")
                    .Fields("WillCallPickPrinterDest").Value = MyDataRow("WillCallPickPrinterDest")
                    .Fields("WillCallPickRptSettingKey").Value = MyDataRow("WillCallPickRptSettingKey")

                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("WhseKey").Value = MyDataRow("WhseKey")
                    .Fields("AllowImmedPickFromSO").Value = MyDataRow("AllowImmedPickFromSO")
                    .Fields("AllowImmedShipFromPick").Value = MyDataRow("AllowImmedShipFromPick")
                    .Fields("AllowTrnsfrBackOrd").Value = MyDataRow("AllowTrnsfrBackOrd")
                    .Fields("CompanyID").Value = MyDataRow("CompanyID")
                    .Fields("CostOfCarry").Value = MyDataRow("CostOfCarry")
                    .Fields("COSAcctKey").Value = MyDataRow("COSAcctKey")
                    .Fields("CostTierAdjAcctKey").Value = MyDataRow("CostTierAdjAcctKey")
                    .Fields("CostToReplenish").Value = MyDataRow("CostToReplenish")
                    .Fields("CostWhseKey").Value = MyDataRow("CostWhseKey")
                    .Fields("Description").Value = MyDataRow("Description")
                    .Fields("DfltLotPickMethod").Value = MyDataRow("DfltLotPickMethod")
                    .Fields("DfltPickMeth").Value = MyDataRow("DfltPickMeth")
                    .Fields("DfltPickOfOutOfStockItems").Value = MyDataRow("DfltPickOfOutOfStockItems")
                    .Fields("ImmedInvcPrinterDest").Value = MyDataRow("ImmedInvcPrinterDest")
                    .Fields("ImmedInvcRptSettingKey").Value = MyDataRow("ImmedInvcRptSettingKey")
                    .Fields("ImmedPickPrinterDest").Value = MyDataRow("ImmedPickPrinterDest")
                    .Fields("ImmedPickRptSettingKey").Value = MyDataRow("ImmedPickRptSettingKey")
                    .Fields("InvtAcctKey").Value = MyDataRow("InvtAcctKey")
                    .Fields("IssueAcctKey").Value = MyDataRow("IssueAcctKey")
                    .Fields("LastRankDate").Value = MyDataRow("LastRankDate")
                    .Fields("LastRankInvtPerKey").Value = MyDataRow("LastRankInvtPerKey")
                    .Fields("LastRplnsmntUpdate").Value = MyDataRow("LastRplnsmntUpdate")
                    .Fields("MailAddrKey").Value = MyDataRow("MailAddrKey")
                    .Fields("MaxDemandMult").Value = MyDataRow("MaxDemandMult")
                    .Fields("MaxOrderCycle").Value = MyDataRow("MaxOrderCycle")
                    .Fields("MaxQualLeadTime").Value = MyDataRow("MaxQualLeadTime")
                    .Fields("MaxQualLeadTimePct").Value = MyDataRow("MaxQualLeadTimePct")
                    .Fields("MaxSeasDemandMult").Value = MyDataRow("MaxSeasDemandMult")
                    .Fields("MinDemandMult").Value = MyDataRow("MinDemandMult")
                    .Fields("MinOrderCycle").Value = MyDataRow("MinOrderCycle")
                    .Fields("MinQualLeadTimePct").Value = MyDataRow("MinQualLeadTimePct")
                    .Fields("MiscAdjAcctKey").Value = MyDataRow("MiscAdjAcctKey")
                    .Fields("PhysCountAcctKey").Value = MyDataRow("PhysCountAcctKey")
                    .Fields("PriceWhseKey").Value = MyDataRow("PriceWhseKey")
                    .Fields("PurchAcctKey").Value = MyDataRow("PurchAcctKey")
                    .Fields("ReordMeth").Value = MyDataRow("ReordMeth")
                    .Fields("RestockMeth").Value = MyDataRow("RestockMeth")
                    .Fields("RestockRate").Value = MyDataRow("RestockRate")
                    .Fields("SalesAcctKey").Value = MyDataRow("SalesAcctKey")
                    .Fields("SalesOffsetAcctKey").Value = MyDataRow("SalesOffsetAcctKey")
                    .Fields("SalesReturnAcctKey").Value = MyDataRow("SalesReturnAcctKey")
                    .Fields("ShipAddrKey").Value = MyDataRow("ShipAddrKey")
                    .Fields("ShipComplete").Value = MyDataRow("ShipComplete")
                    .Fields("SortPickTckt").Value = MyDataRow("SortPickTckt")
                    .Fields("STaxSchdKey").Value = MyDataRow("STaxSchdKey")
                    .Fields("TrackQtyAtBin").Value = MyDataRow("TrackQtyAtBin")
                    .Fields("Transit").Value = MyDataRow("Transit")
                    .Fields("TrendPct").Value = MyDataRow("TrendPct")
                    .Fields("TrnsfrExpAcctKey").Value = MyDataRow("TrnsfrExpAcctKey")
                    .Fields("TrnsfrFrtChrgOpt").Value = MyDataRow("TrnsfrFrtChrgOpt")
                    .Fields("TrnsfrMrkupAcctKey").Value = MyDataRow("TrnsfrMrkupAcctKey")
                    .Fields("TrnsfrSrchrgOpt").Value = MyDataRow("TrnsfrSrchrgOpt")
                    .Fields("UpdateCounter").Value = MyDataRow("UpdateCounter")
                    .Fields("UseBins").Value = MyDataRow("UseBins")
                    .Fields("UseZones").Value = MyDataRow("UseZones")
                    .Fields("WhseID").Value = MyDataRow("WhseID")
                    .Fields("WhseMgrCntctKey").Value = MyDataRow("WhseMgrCntctKey")
                    .Fields("WhseOvrdSegValue").Value = MyDataRow("WhseOvrdSegValue")
                    .Fields("WillCallPickPrinterDest").Value = MyDataRow("WillCallPickPrinterDest")
                    .Fields("WillCallPickRptSettingKey").Value = MyDataRow("WillCallPickRptSettingKey")



                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

    Private Sub Process_DELETE_timWarehouse()

        Dim i As Integer = 0
        '===================================================
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from sysdba.timWarehouse where WhseKey not in (Select WhseKey from dbo.MAS_to_SLX_timWarehouse_temp)"


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("timWarehouseID")
                delete_timWarehouse(Id)

                Console.WriteLine("Processes timWarehouse DELETE " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "timWarehouse Deletes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub delete_timWarehouse(ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM timWarehouse WHERE timWarehouseID = '" & Id & "'"


        Try
            objConn.Open(strSLXConstr)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    'adding


                Else
                    '=======================================
                    'Delete
                    '=======================================
                    .Delete()



                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub



End Module
