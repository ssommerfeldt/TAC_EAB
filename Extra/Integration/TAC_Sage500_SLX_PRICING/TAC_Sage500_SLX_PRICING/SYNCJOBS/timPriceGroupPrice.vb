Imports System.Data.OleDb

Module timPriceGroupPrice

    Public Sub timPriceGroupPriceMain()
        '====================================================================================================
        ' timPriceGroupPrice
        '====================================================================================================
        ' MAS500 Query
        Dim SQL As String = "SELECT * from timPriceGroupPrice"

        '=================================================================================
        ' 1. CLEAN COMPARE
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_timPriceGroupPrice_zcompare", strSLXNativeConstr)
        '=================================================================================
        ' 2. MOVE TEMP TO COMPARE
        '=================================================================================
        Move_Temp_To_Compare("dbo.MAS_to_SLX_timPriceGroupPrice_zcompare", "dbo.MAS_to_SLX_timPriceGroupPrice_temp", strSLXNativeConstr)
        '=================================================================================
        ' 3. CLEAN TEMP
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_timPriceGroupPrice_temp", strSLXNativeConstr)
        '=================================================================================
        ' 4. MOVE SOURCE TO TEMP
        '=================================================================================
        GetSourceData(SQL, "dbo.MAS_to_SLX_timPriceGroupPrice_temp")
        '=================================================================================
        ' 5. Process Insert / Updates
        '=================================================================================
        Process_Changed_timPriceGroupPrice()
        '=================================================================================
        ' 6. Process Deletes
        '=================================================================================
        Process_DELETE_timPriceGroupPrice()
    End Sub

    Private Sub Process_Changed_timPriceGroupPrice()

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
            SQL = "Select * from dbo.vdvMAS_to_SLX_timPriceGroupPrice_TAC_CHANGED "


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("WhseKey")
               
                AddEdit_timPriceGroupPrice(row, Id, row("CustPriceGroupKey"), row("ProdPriceGroupKey"), row("EffectiveDate"))

                Console.WriteLine("Processes timPriceGroupPrice Changed " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "timPriceGroupPrice Changes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub AddEdit_timPriceGroupPrice(ByVal MyDataRow As DataRow, ByVal Id As String, CustPriceGroupKey As String, ProdPriceGroupKey As String, EffectiveDate As String)
        '       [WhseKey] ASC,
        '[CustPriceGroupKey] ASC,
        '[ProdPriceGroupKey] ASC,
        '[EffectiveDate] ASC
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM timPriceGroupPrice WHERE WhseKey = '" & Id & "' AND CustPriceGroupKey ='" & CustPriceGroupKey & "'" & " AND ProdPriceGroupKey ='" & ProdPriceGroupKey & "'" & " AND EffectiveDate ='" & EffectiveDate & "'"


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


                    .Fields("TIMPRICEGROUPPRICEID").Value = GetNewSLXID("timPriceGroupPrice", strSLXConstr) 'MyDataRow("timPriceGroupPriceID")

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("WhseKey").Value = MyDataRow("WhseKey")
                    .Fields("CustPriceGroupKey").Value = MyDataRow("CustPriceGroupKey")
                    .Fields("ProdPriceGroupKey").Value = MyDataRow("ProdPriceGroupKey")
                    .Fields("EffectiveDate").Value = MyDataRow("EffectiveDate")
                    .Fields("CombineForBreak").Value = MyDataRow("CombineForBreak")
                    .Fields("ExpirationDate").Value = MyDataRow("ExpirationDate")
                    .Fields("PricingKey").Value = MyDataRow("PricingKey")

                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("WhseKey").Value = MyDataRow("WhseKey")
                    .Fields("CustPriceGroupKey").Value = MyDataRow("CustPriceGroupKey")
                    .Fields("ProdPriceGroupKey").Value = MyDataRow("ProdPriceGroupKey")
                    .Fields("EffectiveDate").Value = MyDataRow("EffectiveDate")
                    .Fields("CombineForBreak").Value = MyDataRow("CombineForBreak")
                    .Fields("ExpirationDate").Value = MyDataRow("ExpirationDate")
                    .Fields("PricingKey").Value = MyDataRow("PricingKey")


                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

    Private Sub Process_DELETE_timPriceGroupPrice()

        Dim i As Integer = 0
        '===================================================
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            ' Multiple Keys so Combine them via a String Compare
            SQL = "Select * from sysdba.timPriceGroupPrice where Cast(WhseKey as varchar(32)) + Cast(CustPriceGroupKey as varchar(32)) + Cast(ProdPriceGroupKey as varchar(32))+ Cast(EffectiveDate as varchar(32)) "
            SQL = SQL & " not in (Select Cast(WhseKey as varchar(32)) + Cast(CustPriceGroupKey as varchar(32)) + Cast(ProdPriceGroupKey as varchar(32))+ Cast(EffectiveDate as varchar(32)) from dbo.MAS_to_SLX_timPriceGroupPrice_temp)"



            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("timPriceGroupPriceID")
                delete_timPriceGroupPrice(Id)

                Console.WriteLine("Processes timPriceGroupPrice DELETE " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "timPriceGroupPrice Deletes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub delete_timPriceGroupPrice(ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM timPriceGroupPrice WHERE timPriceGroupPriceID = '" & Id & "'"


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
