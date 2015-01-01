Imports System.Data.OleDb

Module timPriceSheet

    Public Sub timPriceSheetMain()
        '====================================================================================================
        ' timPriceSheet
        '====================================================================================================
        ' MAS500 Query
        Dim SQL As String = "SELECT * from timPriceSheet"

        '=================================================================================
        ' 1. CLEAN COMPARE
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_timPriceSheet_zcompare", strSLXNativeConstr)
        '=================================================================================
        ' 2. MOVE TEMP TO COMPARE
        '=================================================================================
        Move_Temp_To_Compare("dbo.MAS_to_SLX_timPriceSheet_zcompare", "dbo.MAS_to_SLX_timPriceSheet_temp", strSLXNativeConstr)
        '=================================================================================
        ' 3. CLEAN TEMP
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_timPriceSheet_temp", strSLXNativeConstr)
        '=================================================================================
        ' 4. MOVE SOURCE TO TEMP
        '=================================================================================
        GetSourceData(SQL, "dbo.MAS_to_SLX_timPriceSheet_temp")
        '=================================================================================
        ' 5. Process Insert / Updates
        '=================================================================================
        Process_Changed_timPriceSheet()
        '=================================================================================
        ' 6. Process Deletes
        '=================================================================================
        Process_DELETE_timPriceSheet()
    End Sub

    Private Sub Process_Changed_timPriceSheet()

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
            SQL = "Select * from dbo.vdvMAS_to_SLX_timPriceSheet_TAC_CHANGED "


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("WhseKey")
                AddEdit_timPriceSheet(row, Id, row("ItemKey"), row("EffectiveDate"), row("CurrID"))

                Console.WriteLine("Processes timPriceSheet Changed " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "timPriceSheet Changes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub AddEdit_timPriceSheet(ByVal MyDataRow As DataRow, ByVal Id As String, ItemKey As String, EffectiveDate As String, CurrID As String)
       
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM timPriceSheet WHERE WhseKey = '" & Id & "' AND ItemKey ='" & ItemKey & "'" & " AND EffectiveDate ='" & EffectiveDate & "'" & " AND CurrID ='" & ItemKey & "'"


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


                    .Fields("TIMPRICESHEETID").Value = GetNewSLXID("timPriceSheet", strSLXConstr) 'MyDataRow("timPriceSheetID")

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"


                    .Fields("WHSEKEY").Value = MyDataRow("WHSEKEY")
                    .Fields("EFFECTIVEDATE").Value = MyDataRow("EFFECTIVEDATE")
                    .Fields("CURRID").Value = MyDataRow("CURRID")
                    .Fields("LISTPRICE").Value = MyDataRow("LISTPRICE")
                    .Fields("SHEET1PRICE").Value = MyDataRow("SHEET1PRICE")
                    .Fields("SHEET2PRICE").Value = MyDataRow("SHEET2PRICE")
                    .Fields("SHEET3PRICE").Value = MyDataRow("SHEET3PRICE")
                    .Fields("SHEET4PRICE").Value = MyDataRow("SHEET4PRICE")
                    .Fields("UPDATECOUNTER").Value = MyDataRow("UPDATECOUNTER")
                    .Fields("ITEMKEY").Value = MyDataRow("ITEMKEY")
                    '.Fields("MYID").Value = MyDataRow("MYID")

                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("WHSEKEY").Value = MyDataRow("WHSEKEY")
                    .Fields("EFFECTIVEDATE").Value = MyDataRow("EFFECTIVEDATE")
                    .Fields("CURRID").Value = MyDataRow("CURRID")
                    .Fields("LISTPRICE").Value = MyDataRow("LISTPRICE")
                    .Fields("SHEET1PRICE").Value = MyDataRow("SHEET1PRICE")
                    .Fields("SHEET2PRICE").Value = MyDataRow("SHEET2PRICE")
                    .Fields("SHEET3PRICE").Value = MyDataRow("SHEET3PRICE")
                    .Fields("SHEET4PRICE").Value = MyDataRow("SHEET4PRICE")
                    .Fields("UPDATECOUNTER").Value = MyDataRow("UPDATECOUNTER")
                    .Fields("ITEMKEY").Value = MyDataRow("ITEMKEY")


                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

    Private Sub Process_DELETE_timPriceSheet()

        Dim i As Integer = 0
        '===================================================
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            ' Multiple Keys so Combine them via a String Compare
            SQL = "Select * from sysdba.timPriceSheet where Cast(WHSEKEY  as varchar(32)) + Cast(ITEMKEY  as varchar(32))+ Cast(EFFECTIVEDATE   as varchar(32)) + Cast(CURRID   as varchar(32)) not in (Select Cast(WHSEKEY  as varchar(32)) + Cast(ITEMKEY  as varchar(32))+ Cast(EFFECTIVEDATE   as varchar(32)) + Cast(CURRID   as varchar(32)) from dbo.MAS_to_SLX_timPriceSheet_temp)"


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("timPriceSheetID")
                delete_timPriceSheet(Id)

                Console.WriteLine("Processes timPriceSheet DELETE " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "timPriceSheet Deletes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub delete_timPriceSheet(ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM timPriceSheet WHERE timPriceSheetID = '" & Id & "'"


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
