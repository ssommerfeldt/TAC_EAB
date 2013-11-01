Imports System.Data.OleDb

Module StockCardFunctions

    Sub AddEditSalesOrderItemFromStockCardItem(ByVal StockCardItemId As String, ByVal strConnection As String, ByVal LineNumber As String)

        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================        'Retrieving a recordset:        '=======================        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM SALESORDERITEMS WHERE SALESORDERID = 'TEMP' AND TACSTOCKCARDITEMID ='" & StockCardItemId & "'"

        Try
            objConn.Open(strConnection)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    'adding
                    .AddNew()
                    '.Fields("SALESORDERITEMSID").Value = Application.BasicFunctions.GetIDFor("SALESORDERITEMS")                    .Fields("SALESORDERID").Value = "TEMP"                    '.Fields("CREATEUSER").Value = ""                    '.Fields("CREATEDATE").Value = ""                    '.Fields("MODIFYUSER").Value = ""                    '.Fields("MODIFYDATE").Value = ""                    .Fields("PRODUCT").Value = MyDataRow("PRODUCT")                    .Fields("PROGRAM").Value = MyDataRow("PROGRAM")                    '.Fields("PRICE").Value = "" '===============TAC Calculated                    .Fields("QUANTITY").Value = "0"                    '.Fields("DISCOUNT").Value = "" '============= TAC Calculated                    .Fields("FAMILY").Value = MyDataRow("FAMILY")                    '.Fields("OPPPRODUCTID").Value = ""                    .Fields("PRODUCTID").Value = MyDataRow("PRODUCTID")                    .Fields("ACTUALID").Value = MyDataRow("ACTUALID")                    .Fields("DESCRIPTION").Value = MyDataRow("DESCRIPTION")                    '.Fields("EXTENDEDPRICE").Value = ""  '========== TAC Calculated                    .Fields("UNIT").Value = MyDataRow("UNIT")                    '.Fields("CALCULATEDPRICE").Value = ""  '===========TAC Caclulated                    '.Fields("GLOBALSYNCID").Value = ""                    .Fields("LINENUMBER").Value = LineNumber                    .Fields("LINETYPE").Value = MyDataRow("LINETYPE")                    '.Fields("SLXLOCATIONID").Value = ""                    .Fields("UNITOFMEASUREID").Value = MyDataRow("UNITOFMEASUREID")                    '.Fields("PRICEDETAILDESCRIPTION").Value = ""                    '.Fields("PRICEDETAILNOTES").Value = ""                    '.Fields("ITEMLOCKED").Value = ""                    '.Fields("TICK").Value = ""                    '.Fields("APPID").Value = ""                    '.Fields("COMMODITYTYPE").Value = ""                    .Fields("UPC").Value = MyDataRow("UPC")                    .Fields("MAX_STOCKLEVEL").Value = MyDataRow("MAX_STOCKLEVEL")                    '.Fields("ORIGPRODUCTPRICE").Value = ""                    '.Fields("ORIGPRODUCTDISCOUNT").Value = ""                    .Fields("TACACCOUNTID").Value = MyDataRow("TACACCOUNTID")                    .Fields("TACSTOCKCARDITEMID").Value = MyDataRow("TACSTOCKCARDITEMID")
                    'Try
                    '    .Fields("HRVStudyGroup_2006").Value = True
                    'Catch ex As Exception

                    'End Try

                Else
                    '=======================================
                    'updating
                    '=======================================
                    'Try
                    '    .Fields("HRVStudyGroup_2006").Value = True
                    'Catch ex As Exception

                    'End Try

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            MsgBox(ex.Message)

        End Try


    End Sub

    Function GetDetailsFromStockCard(ByVal StockCardItemID, ByVal strConn) As DataRow
        Dim objConn As New OleDbConnection(strConn)
        Dim returnDataRow As DataRow
        Try
            objConn.Open()
            Dim SQL As String
            SQL = " SELECT     'TEMP' AS SALESORDERID, sysdba.PRODUCT.NAME AS PRODUCT, sysdba.PRODUCT.PROGRAM, sysdba.PRODUCT.FAMILY, "
            SQL = SQL & "          sysdba.STOCKCARDITEMS.PRODUCTID, sysdba.PRODUCT.ACTUALID, sysdba.PRODUCT.DESCRIPTION, sysdba.PRODUCT.UNIT, "
            SQL = SQL & " 'StandarLine' AS LINETYPE, sysdba.PRODUCT.UNITOFMEASUREID, sysdba.PRODUCT.UPC, sysdba.STOCKCARDITEMS.MAX_STOCKLEVEL, "
            SQL = SQL & "          sysdba.STOCKCARDITEMS.ACCOUNTID AS TACACCOUNTID, sysdba.STOCKCARDITEMS.STOCKCARDITEMSID AS TACSTOCKCARDITEMID"
            SQL = SQL & " FROM         sysdba.STOCKCARDITEMS LEFT OUTER JOIN"
            SQL = SQL & "          sysdba.PRODUCT ON sysdba.STOCKCARDITEMS.PRODUCTID = sysdba.PRODUCT.PRODUCTID"
            SQL = SQL & " WHERE (sysdba.STOCKCARDITEMS.STOCKCARDITEMSID = '" & StockCardItemID & "')"
            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())
            ' There is only One Row but this seemed like the easiest way to get a Data Row.
            For Each row As DataRow In dt.Rows
                returnDataRow = row
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Dim EventMessage As String
            EventMessage = ex.Message & Chr(10) & Chr(13) & "In ProcessSingleAccount"
            WriteStatusLog(EventMessage)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing

        Return returnDataRow
    End Function

End Module
