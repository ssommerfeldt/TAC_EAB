
Imports System.Data.OleDb

Module tarCustAddr

    Public Sub tarCustAddrMain()
        '====================================================================================================
        ' tarCustAddr
        '====================================================================================================
        ' MAS500 Query
        Dim SQL As String = "SELECT * from tarCustAddr"

        '=================================================================================
        ' 1. CLEAN COMPARE
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_tarCustAddr_zcompare", strSLXNativeConstr)
        '=================================================================================
        ' 2. MOVE TEMP TO COMPARE
        '=================================================================================
        Move_Temp_To_Compare("dbo.MAS_to_SLX_tarCustAddr_zcompare", "dbo.MAS_to_SLX_tarCustAddr_temp", strSLXNativeConstr)
        '=================================================================================
        ' 3. CLEAN TEMP
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_tarCustAddr_temp", strSLXNativeConstr)
        '=================================================================================
        ' 4. MOVE SOURCE TO TEMP
        '=================================================================================
        GetSourceData(SQL, "dbo.MAS_to_SLX_tarCustAddr_temp")
        '=================================================================================
        ' 5. Process Insert / Updates
        '=================================================================================
        Process_Changed_tarCustAddr()
        '=================================================================================
        ' 6. Process Deletes
        '=================================================================================
        Process_DELETE_tarCustAddr()
    End Sub

    Private Sub Process_Changed_tarCustAddr()

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
            SQL = "Select * from dbo.vdvMAS_to_SLX_tarCustAddr_TAC_CHANGED "


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("AddrKey")
                AddEdit_tarCustAddr(row, Id)

                Console.WriteLine("Processes tarCustAddr Changed " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "tarCustAddr Changes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub AddEdit_tarCustAddr(ByVal MyDataRow As DataRow, ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM tarCustAddr WHERE AddrKey = '" & Id & "'"


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


                    .Fields("TARCUSTADDRID").Value = GetNewSLXID("tarCustAddr", strSLXConstr) 'MyDataRow("tarCustAddrID")

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("AddrKey").Value = MyDataRow("AddrKey")
                    .Fields("AllowInvtSubst").Value = MyDataRow("AllowInvtSubst")
                    .Fields("BackOrdPrice").Value = MyDataRow("BackOrdPrice")
                    .Fields("BOLReqd").Value = MyDataRow("BOLReqd")
                    .Fields("CarrierAcctNo").Value = MyDataRow("CarrierAcctNo")
                    .Fields("CarrierBillMeth").Value = MyDataRow("CarrierBillMeth")
                    .Fields("CloseSOLineOnFirstShip").Value = MyDataRow("CloseSOLineOnFirstShip")
                    .Fields("CloseSOOnFirstShip").Value = MyDataRow("CloseSOOnFirstShip")
                    .Fields("CommPlanKey").Value = MyDataRow("CommPlanKey")
                    .Fields("CreateType").Value = MyDataRow("CreateType")
                    .Fields("CreateUserID").Value = MyDataRow("CreateUserID")
                    .Fields("CreditCardKey").Value = MyDataRow("CreditCardKey")
                    .Fields("CurrExchSchdKey").Value = MyDataRow("CurrExchSchdKey")
                    .Fields("CurrID").Value = MyDataRow("CurrID")
                    .Fields("CustAddrID").Value = MyDataRow("CustAddrID")
                    .Fields("CustKey").Value = MyDataRow("CustKey")
                    .Fields("CustPriceGroupKey").Value = MyDataRow("CustPriceGroupKey")
                    .Fields("DfltCntctKey").Value = MyDataRow("DfltCntctKey")
                    .Fields("FOBKey").Value = MyDataRow("FOBKey")
                    .Fields("FreightMethod").Value = MyDataRow("FreightMethod")
                    .Fields("ImportLogKey").Value = MyDataRow("ImportLogKey")
                    .Fields("InvcFormKey").Value = MyDataRow("InvcFormKey")
                    .Fields("InvcMsg").Value = MyDataRow("InvcMsg")
                    .Fields("InvoiceReqd").Value = MyDataRow("InvoiceReqd")
                    .Fields("LanguageID").Value = MyDataRow("LanguageID")
                    .Fields("PackListContentsReqd").Value = MyDataRow("PackListContentsReqd")
                    .Fields("PackListFormKey").Value = MyDataRow("PackListFormKey")
                    .Fields("PackListReqd").Value = MyDataRow("PackListReqd")
                    .Fields("PmtTermsKey").Value = MyDataRow("PmtTermsKey")
                    .Fields("PriceAdj").Value = MyDataRow("PriceAdj")
                    .Fields("PriceBase").Value = MyDataRow("PriceBase")
                    .Fields("PrintOrderAck").Value = MyDataRow("PrintOrderAck")
                    .Fields("RequireSOAck").Value = MyDataRow("RequireSOAck")
                    .Fields("SalesTerritoryKey").Value = MyDataRow("SalesTerritoryKey")
                    .Fields("ShipComplete").Value = MyDataRow("ShipComplete")
                    .Fields("ShipDays").Value = MyDataRow("ShipDays")
                    .Fields("ShipLabelFormKey").Value = MyDataRow("ShipLabelFormKey")
                    .Fields("ShipLabelsReqd").Value = MyDataRow("ShipLabelsReqd")
                    .Fields("ShipMethKey").Value = MyDataRow("ShipMethKey")
                    .Fields("ShipZoneKey").Value = MyDataRow("ShipZoneKey")
                    .Fields("SOAckFormKey").Value = MyDataRow("SOAckFormKey")
                    .Fields("SOAckMeth").Value = MyDataRow("SOAckMeth")
                    .Fields("SperKey").Value = MyDataRow("SperKey")
                    .Fields("STaxSchdKey").Value = MyDataRow("STaxSchdKey")
                    .Fields("UpdateDate").Value = MyDataRow("UpdateDate")
                    .Fields("UpdateUserID").Value = MyDataRow("UpdateUserID")
                    .Fields("WhseKey").Value = MyDataRow("WhseKey")
                    .Fields("UsePromoPrice").Value = MyDataRow("UsePromoPrice")

                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("AddrKey").Value = MyDataRow("AddrKey")
                    .Fields("AllowInvtSubst").Value = MyDataRow("AllowInvtSubst")
                    .Fields("BackOrdPrice").Value = MyDataRow("BackOrdPrice")
                    .Fields("BOLReqd").Value = MyDataRow("BOLReqd")
                    .Fields("CarrierAcctNo").Value = MyDataRow("CarrierAcctNo")
                    .Fields("CarrierBillMeth").Value = MyDataRow("CarrierBillMeth")
                    .Fields("CloseSOLineOnFirstShip").Value = MyDataRow("CloseSOLineOnFirstShip")
                    .Fields("CloseSOOnFirstShip").Value = MyDataRow("CloseSOOnFirstShip")
                    .Fields("CommPlanKey").Value = MyDataRow("CommPlanKey")
                    .Fields("CreateType").Value = MyDataRow("CreateType")
                    .Fields("CreateUserID").Value = MyDataRow("CreateUserID")
                    .Fields("CreditCardKey").Value = MyDataRow("CreditCardKey")
                    .Fields("CurrExchSchdKey").Value = MyDataRow("CurrExchSchdKey")
                    .Fields("CurrID").Value = MyDataRow("CurrID")
                    .Fields("CustAddrID").Value = MyDataRow("CustAddrID")
                    .Fields("CustKey").Value = MyDataRow("CustKey")
                    .Fields("CustPriceGroupKey").Value = MyDataRow("CustPriceGroupKey")
                    .Fields("DfltCntctKey").Value = MyDataRow("DfltCntctKey")
                    .Fields("FOBKey").Value = MyDataRow("FOBKey")
                    .Fields("FreightMethod").Value = MyDataRow("FreightMethod")
                    .Fields("ImportLogKey").Value = MyDataRow("ImportLogKey")
                    .Fields("InvcFormKey").Value = MyDataRow("InvcFormKey")
                    .Fields("InvcMsg").Value = MyDataRow("InvcMsg")
                    .Fields("InvoiceReqd").Value = MyDataRow("InvoiceReqd")
                    .Fields("LanguageID").Value = MyDataRow("LanguageID")
                    .Fields("PackListContentsReqd").Value = MyDataRow("PackListContentsReqd")
                    .Fields("PackListFormKey").Value = MyDataRow("PackListFormKey")
                    .Fields("PackListReqd").Value = MyDataRow("PackListReqd")
                    .Fields("PmtTermsKey").Value = MyDataRow("PmtTermsKey")
                    .Fields("PriceAdj").Value = MyDataRow("PriceAdj")
                    .Fields("PriceBase").Value = MyDataRow("PriceBase")
                    .Fields("PrintOrderAck").Value = MyDataRow("PrintOrderAck")
                    .Fields("RequireSOAck").Value = MyDataRow("RequireSOAck")
                    .Fields("SalesTerritoryKey").Value = MyDataRow("SalesTerritoryKey")
                    .Fields("ShipComplete").Value = MyDataRow("ShipComplete")
                    .Fields("ShipDays").Value = MyDataRow("ShipDays")
                    .Fields("ShipLabelFormKey").Value = MyDataRow("ShipLabelFormKey")
                    .Fields("ShipLabelsReqd").Value = MyDataRow("ShipLabelsReqd")
                    .Fields("ShipMethKey").Value = MyDataRow("ShipMethKey")
                    .Fields("ShipZoneKey").Value = MyDataRow("ShipZoneKey")
                    .Fields("SOAckFormKey").Value = MyDataRow("SOAckFormKey")
                    .Fields("SOAckMeth").Value = MyDataRow("SOAckMeth")
                    .Fields("SperKey").Value = MyDataRow("SperKey")
                    .Fields("STaxSchdKey").Value = MyDataRow("STaxSchdKey")
                    .Fields("UpdateDate").Value = MyDataRow("UpdateDate")
                    .Fields("UpdateUserID").Value = MyDataRow("UpdateUserID")
                    .Fields("WhseKey").Value = MyDataRow("WhseKey")
                    .Fields("UsePromoPrice").Value = MyDataRow("UsePromoPrice")



                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

    Private Sub Process_DELETE_tarCustAddr()

        Dim i As Integer = 0
        '===================================================
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from sysdba.tarCustAddr where AddrKey not in (Select AddrKey from dbo.MAS_to_SLX_tarCustAddr_temp)"


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("tarCustAddrID")
                delete_tarCustAddr(Id)

                Console.WriteLine("Processes tarCustAddr DELETE " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "tarCustAddr Deletes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub delete_tarCustAddr(ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM tarCustAddr WHERE tarCustAddrID = '" & Id & "'"


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
