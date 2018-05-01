Imports System.Data.OleDb
Module CleanUpProducts
    Public Sub Process_DELETE_InactiveStockCardProducts()

        Dim i As Integer = 0
        '===================================================
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from sysdba.STOCKCARDITEMS where PRODUCTID in("
            SQL = SQL & " Select PRODUCTID  from sysdba.PRODUCT  where STATUS = 'Inactive')"


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("STOCKCARDITEMSID")
                delete_STOCKCARDITEMS(Id)

                Console.WriteLine("Processes STOCKCARDITEMS DELETE " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "STOCKCARDITEMS Deletes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub
    Public Sub Process_DELETE_InactiveProductsfromOrders()

        Dim i As Integer = 0
        '===================================================
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "SELECT      sysdba.SALESORDERITEMS.SALESORDERITEMSID, sysdba.SALESORDER.STATUS"
            SQL = SQL & " FROM         sysdba.SALESORDERITEMS INNER JOIN"
            SQL = SQL & "                       sysdba.SALESORDER ON sysdba.SALESORDERITEMS.SALESORDERID = sysdba.SALESORDER.SALESORDERID INNER JOIN"
            SQL = SQL & " sysdba.PRODUCT ON sysdba.SALESORDERITEMS.PRODUCTID = sysdba.PRODUCT.PRODUCTID"
            SQL = SQL & " WHERE     (sysdba.SALESORDER.STATUS <> 'Transmitted to Accounting') AND (sysdba.SALESORDERITEMS.QUANTITY = '0')"
            SQL = SQL & " and (product.STATUS  ='Inactive')"


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("SALESORDERITEMSID")
                delete_SALESORDERITEMS(Id)

                Console.WriteLine("Processes SALESORDERITEMS DELETE " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "SALESORDERITEMS Deletes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub Process_CleanUP()

        Dim i As Integer = 0
        '===================================================
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Delete from    MAS_TO_SLX_PRODUCT_Temp"
            SQL = SQL & " where         MASITEMID + MASITEMID+WAREHOUSEID+CompanyID  in (          "
            SQL = SQL & "           Select MASITEMID + MASITEMID+WAREHOUSEID+CompanyID from VProductsToReSync)"
          

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            objCMD.ExecuteNonQuery()

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "Clean UP ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub delete_STOCKCARDITEMS(ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM STOCKCARDITEMS WHERE STOCKCARDITEMSID = '" & Id & "'"


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

    Public Sub delete_SALESORDERITEMS(ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM SALESORDERITEMS WHERE SALESORDERITEMSID = '" & Id & "'"


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
