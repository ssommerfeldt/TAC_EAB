
Imports System.Data.OleDb

Module timProdPriceGroupPrice

    Public Sub timProdPriceGroupPriceMain()
        '====================================================================================================
        ' timProdPriceGroupPrice
        '====================================================================================================
        ' MAS500 Query
        Dim SQL As String = "SELECT * from timProdPriceGroupPrice"

        '=================================================================================
        ' 1. CLEAN COMPARE
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_timProdPriceGroupPrice_zcompare", strSLXNativeConstr)
        '=================================================================================
        ' 2. MOVE TEMP TO COMPARE
        '=================================================================================
        Move_Temp_To_Compare("dbo.MAS_to_SLX_timProdPriceGroupPrice_zcompare", "dbo.MAS_to_SLX_timProdPriceGroupPrice_temp", strSLXNativeConstr)
        '=================================================================================
        ' 3. CLEAN TEMP
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_timProdPriceGroupPrice_temp", strSLXNativeConstr)
        '=================================================================================
        ' 4. MOVE SOURCE TO TEMP
        '=================================================================================
        GetSourceData(SQL, "dbo.MAS_to_SLX_timProdPriceGroupPrice_temp")
        '=================================================================================
        ' 5. Process Insert / Updates
        '=================================================================================
        Process_Changed_timProdPriceGroupPrice()
        '=================================================================================
        ' 6. Process Deletes
        '=================================================================================
        Process_DELETE_timProdPriceGroupPrice()
    End Sub

    Private Sub Process_Changed_timProdPriceGroupPrice()

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
            SQL = "Select * from dbo.vdvMAS_to_SLX_timProdPriceGroupPrice_TAC_CHANGED "


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("ProdPriceGroupPriceKey")
                AddEdit_timProdPriceGroupPrice(row, Id)

                Console.WriteLine("Processes timProdPriceGroupPrice Changed " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "timProdPriceGroupPrice Changes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub AddEdit_timProdPriceGroupPrice(ByVal MyDataRow As DataRow, ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM timProdPriceGroupPrice WHERE ProdPriceGroupPriceKey = '" & Id & "'"


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


                    .Fields("TIMPRODPRICEGROUPPRICEID").Value = GetNewSLXID("timProdPriceGroupPrice", strSLXConstr) 'MyDataRow("timProdPriceGroupPriceID")

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                   
                    .Fields("ProdPriceGroupPriceKey").Value = MyDataRow("ProdPriceGroupPriceKey")
                    .Fields("CombineForBreak").Value = MyDataRow("CombineForBreak")
                    .Fields("EffectiveDate").Value = MyDataRow("EffectiveDate")
                    .Fields("ExpirationDate").Value = MyDataRow("ExpirationDate")
                    .Fields("PricingKey").Value = MyDataRow("PricingKey")
                    .Fields("ProdPriceGroupKey").Value = MyDataRow("ProdPriceGroupKey")
                    .Fields("UpdateCounter").Value = MyDataRow("UpdateCounter")
                    .Fields("WhseKey").Value = MyDataRow("WhseKey")

                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"


                    .Fields("ProdPriceGroupPriceKey").Value = MyDataRow("ProdPriceGroupPriceKey")
                    .Fields("CombineForBreak").Value = MyDataRow("CombineForBreak")
                    .Fields("EffectiveDate").Value = MyDataRow("EffectiveDate")
                    .Fields("ExpirationDate").Value = MyDataRow("ExpirationDate")
                    .Fields("PricingKey").Value = MyDataRow("PricingKey")
                    .Fields("ProdPriceGroupKey").Value = MyDataRow("ProdPriceGroupKey")
                    .Fields("UpdateCounter").Value = MyDataRow("UpdateCounter")
                    .Fields("WhseKey").Value = MyDataRow("WhseKey")


                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

    Private Sub Process_DELETE_timProdPriceGroupPrice()

        Dim i As Integer = 0
        '===================================================
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from sysdba.timProdPriceGroupPrice where ProdPriceGroupPriceKey not in (Select ProdPriceGroupPriceKey from dbo.MAS_to_SLX_timProdPriceGroupPrice_temp)"


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("timProdPriceGroupPriceID")
                delete_timProdPriceGroupPrice(Id)

                Console.WriteLine("Processes timProdPriceGroupPrice DELETE " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "timProdPriceGroupPrice Deletes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub delete_timProdPriceGroupPrice(ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM timProdPriceGroupPrice WHERE timProdPriceGroupPriceID = '" & Id & "'"


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
