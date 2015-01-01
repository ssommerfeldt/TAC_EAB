Imports System.Data.OleDb

Module tarCustomer

    Public Sub tarCustomerMain()
        '====================================================================================================
        ' tarCustomer
        '====================================================================================================
        ' MAS500 Query
        Dim SQL As String = "SELECT * from tarCustomer"

        '=================================================================================
        ' 1. CLEAN COMPARE
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_tarCustomer_zcompare", strSLXNativeConstr)
        '=================================================================================
        ' 2. MOVE TEMP TO COMPARE
        '=================================================================================
        Move_Temp_To_Compare("dbo.MAS_to_SLX_tarCustomer_zcompare", "dbo.MAS_to_SLX_tarCustomer_temp", strSLXNativeConstr)
        '=================================================================================
        ' 3. CLEAN TEMP
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_tarCustomer_temp", strSLXNativeConstr)
        '=================================================================================
        ' 4. MOVE SOURCE TO TEMP
        '=================================================================================
        GetSourceData(SQL, "dbo.MAS_to_SLX_tarCustomer_temp")
        '=================================================================================
        ' 5. Process Insert / Updates
        '=================================================================================
        Process_Changed_tarCustomer()
        '=================================================================================
        ' 6. Process Deletes
        '=================================================================================
        Process_DELETE_tarCustomer()
    End Sub

    Private Sub Process_Changed_tarCustomer()

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
            SQL = "Select * from dbo.vdvMAS_to_SLX_tarCustomer_TAC_CHANGED "
            

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("CustKey")
                AddEdit_TARCUSTOMER(row, Id)

                Console.WriteLine("Processes TarCustomer Changed " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "TarCustomer Changes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub AddEdit_TARCUSTOMER(ByVal MyDataRow As DataRow, ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM TARCUSTOMER WHERE CustKey = '" & Id & "'"


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

                   
                    .Fields("TARCUSTOMERID").Value = GetNewSLXID("TARCUSTOMER", strSLXConstr) 'MyDataRow("TARCUSTOMERID")

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("SLXCREATEDATE").Value = Now 'MyDataRow("SLXCREATEDATE")
                    .Fields("CustKey").Value = MyDataRow("CustKey")
                    .Fields("ABANo").Value = MyDataRow("ABANo")
                    .Fields("AllowCustRefund").Value = MyDataRow("AllowCustRefund")
                    .Fields("AllowWriteOff").Value = MyDataRow("AllowWriteOff")
                    .Fields("BillingType").Value = MyDataRow("BillingType")
                    .Fields("BillToNationalAcctParent").Value = MyDataRow("BillToNationalAcctParent")
                    .Fields("CompanyID").Value = MyDataRow("CompanyID")
                    .Fields("ConsolidatedStatement").Value = MyDataRow("ConsolidatedStatement")
                    .Fields("CreateDate").Value = MyDataRow("CreateDate")
                    .Fields("CreateType").Value = MyDataRow("CreateType")
                    .Fields("CreateUserID").Value = MyDataRow("CreateUserID")
                    .Fields("CreditLimit").Value = MyDataRow("CreditLimit")
                    .Fields("CreditLimitAgeCat").Value = MyDataRow("CreditLimitAgeCat")
                    .Fields("CreditLimitUsed").Value = MyDataRow("CreditLimitUsed")
                    .Fields("CRMCustID").Value = MyDataRow("CRMCustID")
                    .Fields("CurrExchSchdKey").Value = MyDataRow("CurrExchSchdKey")
                    .Fields("CustClassKey").Value = MyDataRow("CustClassKey")
                    .Fields("CustID").Value = MyDataRow("CustID")
                    .Fields("CustName").Value = MyDataRow("CustName")
                    .Fields("CustRefNo").Value = MyDataRow("CustRefNo")
                    .Fields("DateEstab").Value = MyDataRow("DateEstab")
                    .Fields("DfltBillToAddrKey").Value = MyDataRow("DfltBillToAddrKey")
                    .Fields("DfltItemKey").Value = MyDataRow("DfltItemKey")
                    .Fields("DfltMaxUpCharge").Value = MyDataRow("DfltMaxUpCharge")
                    .Fields("DfltMaxUpChargeType").Value = MyDataRow("DfltMaxUpChargeType")
                    .Fields("DfltSalesAcctKey").Value = MyDataRow("DfltSalesAcctKey")
                    .Fields("DfltSalesReturnAcctKey").Value = MyDataRow("DfltSalesReturnAcctKey")
                    .Fields("DfltShipToAddrKey").Value = MyDataRow("DfltShipToAddrKey")
                    .Fields("FinChgFlatAmt").Value = MyDataRow("FinChgFlatAmt")
                    .Fields("FinChgPct").Value = MyDataRow("FinChgPct")
                    .Fields("Hold").Value = MyDataRow("Hold")
                    .Fields("ImportLogKey").Value = MyDataRow("ImportLogKey")
                    .Fields("NationalAcctLevelKey").Value = MyDataRow("NationalAcctLevelKey")
                    .Fields("PmtByNationalAcctParent").Value = MyDataRow("PmtByNationalAcctParent")
                    .Fields("PrimaryAddrKey").Value = MyDataRow("PrimaryAddrKey")
                    .Fields("PrimaryCntctKey").Value = MyDataRow("PrimaryCntctKey")
                    .Fields("PrintDunnMsg").Value = MyDataRow("PrintDunnMsg")
                    .Fields("ReqCreditLimit").Value = MyDataRow("ReqCreditLimit")
                    .Fields("ReqPO").Value = MyDataRow("ReqPO")
                    .Fields("RetntPct").Value = MyDataRow("RetntPct")
                    .Fields("SalesSourceKey").Value = MyDataRow("SalesSourceKey")
                    .Fields("ShipPriority").Value = MyDataRow("ShipPriority")
                    .Fields("Status").Value = MyDataRow("Status")
                    .Fields("StdIndusCodeID").Value = MyDataRow("StdIndusCodeID")
                    .Fields("StmtCycleKey").Value = MyDataRow("StmtCycleKey")
                    .Fields("StmtFormKey").Value = MyDataRow("StmtFormKey")
                    .Fields("TradeDiscPct").Value = MyDataRow("TradeDiscPct")
                    .Fields("UpdateCounter").Value = MyDataRow("UpdateCounter")
                    .Fields("UpdateDate").Value = MyDataRow("UpdateDate")
                    .Fields("UpdateUserID").Value = MyDataRow("UpdateUserID")
                    .Fields("UserFld1").Value = MyDataRow("UserFld1")
                    .Fields("UserFld2").Value = MyDataRow("UserFld2")
                    .Fields("UserFld3").Value = MyDataRow("UserFld3")
                    .Fields("UserFld4").Value = MyDataRow("UserFld4")
                    .Fields("VendKey").Value = MyDataRow("VendKey")

                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("CustKey").Value = MyDataRow("CustKey")
                    .Fields("ABANo").Value = MyDataRow("ABANo")
                    .Fields("AllowCustRefund").Value = MyDataRow("AllowCustRefund")
                    .Fields("AllowWriteOff").Value = MyDataRow("AllowWriteOff")
                    .Fields("BillingType").Value = MyDataRow("BillingType")
                    .Fields("BillToNationalAcctParent").Value = MyDataRow("BillToNationalAcctParent")
                    .Fields("CompanyID").Value = MyDataRow("CompanyID")
                    .Fields("ConsolidatedStatement").Value = MyDataRow("ConsolidatedStatement")
                    .Fields("CreateDate").Value = MyDataRow("CreateDate")
                    .Fields("CreateType").Value = MyDataRow("CreateType")
                    .Fields("CreateUserID").Value = MyDataRow("CreateUserID")
                    .Fields("CreditLimit").Value = MyDataRow("CreditLimit")
                    .Fields("CreditLimitAgeCat").Value = MyDataRow("CreditLimitAgeCat")
                    .Fields("CreditLimitUsed").Value = MyDataRow("CreditLimitUsed")
                    .Fields("CRMCustID").Value = MyDataRow("CRMCustID")
                    .Fields("CurrExchSchdKey").Value = MyDataRow("CurrExchSchdKey")
                    .Fields("CustClassKey").Value = MyDataRow("CustClassKey")
                    .Fields("CustID").Value = MyDataRow("CustID")
                    .Fields("CustName").Value = MyDataRow("CustName")
                    .Fields("CustRefNo").Value = MyDataRow("CustRefNo")
                    .Fields("DateEstab").Value = MyDataRow("DateEstab")
                    .Fields("DfltBillToAddrKey").Value = MyDataRow("DfltBillToAddrKey")
                    .Fields("DfltItemKey").Value = MyDataRow("DfltItemKey")
                    .Fields("DfltMaxUpCharge").Value = MyDataRow("DfltMaxUpCharge")
                    .Fields("DfltMaxUpChargeType").Value = MyDataRow("DfltMaxUpChargeType")
                    .Fields("DfltSalesAcctKey").Value = MyDataRow("DfltSalesAcctKey")
                    .Fields("DfltSalesReturnAcctKey").Value = MyDataRow("DfltSalesReturnAcctKey")
                    .Fields("DfltShipToAddrKey").Value = MyDataRow("DfltShipToAddrKey")
                    .Fields("FinChgFlatAmt").Value = MyDataRow("FinChgFlatAmt")
                    .Fields("FinChgPct").Value = MyDataRow("FinChgPct")
                    .Fields("Hold").Value = MyDataRow("Hold")
                    .Fields("ImportLogKey").Value = MyDataRow("ImportLogKey")
                    .Fields("NationalAcctLevelKey").Value = MyDataRow("NationalAcctLevelKey")
                    .Fields("PmtByNationalAcctParent").Value = MyDataRow("PmtByNationalAcctParent")
                    .Fields("PrimaryAddrKey").Value = MyDataRow("PrimaryAddrKey")
                    .Fields("PrimaryCntctKey").Value = MyDataRow("PrimaryCntctKey")
                    .Fields("PrintDunnMsg").Value = MyDataRow("PrintDunnMsg")
                    .Fields("ReqCreditLimit").Value = MyDataRow("ReqCreditLimit")
                    .Fields("ReqPO").Value = MyDataRow("ReqPO")
                    .Fields("RetntPct").Value = MyDataRow("RetntPct")
                    .Fields("SalesSourceKey").Value = MyDataRow("SalesSourceKey")
                    .Fields("ShipPriority").Value = MyDataRow("ShipPriority")
                    .Fields("Status").Value = MyDataRow("Status")
                    .Fields("StdIndusCodeID").Value = MyDataRow("StdIndusCodeID")
                    .Fields("StmtCycleKey").Value = MyDataRow("StmtCycleKey")
                    .Fields("StmtFormKey").Value = MyDataRow("StmtFormKey")
                    .Fields("TradeDiscPct").Value = MyDataRow("TradeDiscPct")
                    .Fields("UpdateCounter").Value = MyDataRow("UpdateCounter")
                    .Fields("UpdateDate").Value = MyDataRow("UpdateDate")
                    .Fields("UpdateUserID").Value = MyDataRow("UpdateUserID")
                    .Fields("UserFld1").Value = MyDataRow("UserFld1")
                    .Fields("UserFld2").Value = MyDataRow("UserFld2")
                    .Fields("UserFld3").Value = MyDataRow("UserFld3")
                    .Fields("UserFld4").Value = MyDataRow("UserFld4")
                    .Fields("VendKey").Value = MyDataRow("VendKey")

                   

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

    Private Sub Process_DELETE_tarCustomer()

        Dim i As Integer = 0
        '===================================================
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from sysdba.TARCUSTOMER where CustKey not in (Select CustKey from dbo.MAS_to_SLX_tarCustomer_temp)"


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("TARCUSTOMERID")
                delete_TARCUSTOMER(Id)

                Console.WriteLine("Processes TarCustomer DELETE " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "TarCustomer Deletes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub delete_TARCUSTOMER(ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM TARCUSTOMER WHERE TARCUSTOMERID = '" & Id & "'"


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
