Imports System.Data.OleDb

Public Class SyncProducts
    Property _CurrentID As String
    Property SlxApplication As SLXCOMInterop.SlxApplication

    Property mCurrentID() As String
        Get
            Return _CurrentID
        End Get
        Set(ByVal value As String)
            _CurrentID = value
        End Set
    End Property
    Private Sub SyncProducts_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Dim _SalesOrderId As String = _CurrentID
        SlxApplication = New SLXCOMInterop.SlxApplication
        '===========================================================================
        ' Step 1. Get all Products into Disconnected Dataset
        '===========================================================================
        Dim ds As New DataSet()
        ds = GetProductDataSet()

        '============================================================================
        ' Step 2.  Delete all Existing Products Via Provider
        '=============================================================================
        'DeleteAll_Products()
        'Me.Show()
        Process_RemoveSalesItems()
        '============================================================================
        ' Close WorkGroup Logs If you Can 
        '=============================================================================
        'Me.RaiseSalesLogixCallbackEvent("EAB", "RefreshClient")

        '=============================================================================
        ' ReAdd All Products from Disconnected Dataset using Provider
        '==============================================================================
        ProcessSalesOrderItems(ds)
        SetDisconnectedDataFlag(_SalesOrderId, "F")
        '============================================================
        ' Refresh Make Ok Button Visible / Complete Label visible.
        '=============================================================
        'Me.RaiseSalesLogixCallbackEvent("EAB", "RefreshClient")
        Button1.Visible = True
        lblFinalMessage.Visible = True

        'SlxApplication.BasicFunctions.ShowDetails("SALESORDER", _SalesOrderId)
        SlxApplication.BasicFunctions.DoInvoke("Function", "View:RefreshCurrent")

        Me.Close()  ' Close the form

    End Sub

    Function GetProductDataSet() As DataSet

        'create the connection
        Dim conn As New OleDbConnection(My.Settings.SLXConnectionString)
        Dim ds As New DataSet()
        Try
            'open connection
            conn.Open()
            'create the DataAdapter. it will internally create a command object
            Dim SQL As String = "Select * from sysdba.SALESORDERITEMS"
            SQL = SQL & " Where SALESORDERID = '" & _CurrentID & "' and  QUANTITY <> 0"

            Dim da As New OleDbDataAdapter(SQL, conn)

            'now create the DataSet and use the adapter to fill it

            da.Fill(ds)

            'pull out the created DataTable to work with
            'our table is the first and only one in the tables collection
            Dim table As DataTable = ds.Tables(0)

            'iterate through the rows in the table's Rows collection
            'Dim row As DataRow
            'For Each row In table.Rows
            '    ListBox1.Items.Add(row("account").ToString())
            'Next

            'bind the table to a grid
            'DataGrid1.DataSource = table

        Catch ex As Exception
            'MessageBox.Show("An error occurred: " & ex.Message, "Error")
        Finally
            conn.Dispose()
            conn = Nothing
        End Try
        Return ds 'Return the Dataset
    End Function

    'Sub DeleteAll_Products()
    '    'create the connection
    '    Dim conn As New OleDbConnection(My.Settings.SLXConnectionString)
    '    Try
    '        'open connection
    '        conn.Open()
    '        'create the command and call ExecuteScalar to get the single result
    '        ' DO NOT USE THIS AS IT HAS POTENTIAL TO MESS THINGS UP 
    '        Dim sql As String = "DELETE FROM SYSDBA.SALESORDERITEMS WHERE SALESORDERID ='" & _CurrentID & "'"
    '        Dim cmd As New OleDbCommand(sql, conn)
    '        cmd.ExecuteNonQuery()


    '    Catch ex As Exception

    '    Finally
    '        conn.Dispose()
    '        conn = Nothing
    '    End Try
    'End Sub
    Private Sub Process_RemoveSalesItems()

        Dim i As Integer = 0
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim ID As String


        Dim SQL As String = "Select SALESORDERITEMSID FROM SYSDBA.SALESORDERITEMS WHERE SALESORDERID ='" & _CurrentID & "'"

        Try
            objConn.Open(My.Settings.SLXConnectionString) ' This Should Sync
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(SQL, objConn)
                ProgressBar1.Maximum = .RecordCount
                For i = 0 To .RecordCount - 1          ' Loop
                    If Not (.BOF And .EOF) Then        ' Check not at end/beginning
                        .Delete()

                        .MoveNext()
                        ProgressBar1.PerformStep()
                        'Console.WriteLine("Clean SalesItem " & i)


                    End If

                Next


                .UpdateBatch()
                .Close()
            End With




        Catch ex As Exception
            'MsgBox(ex.Message)
            'Call LogErrors(PROJECTNAME, "SalesOrderItems Clean-up ", ex.Message, EventLogEntryType.Error)
            'Add_TACSyncJobERROR(ex, slXLogHeaderID)
            '_hasErrors = True 'Log Errors
            'Console.WriteLine(ex.Message)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub ProcessSalesOrderItems(ByVal ds As DataSet)
        Dim table As DataTable = ds.Tables(0)

        'iterate through the rows in the table's Rows collection
        Dim row As DataRow
        ProgressBar1.Maximum = table.Rows.Count
        ProgressBar1.Step = 1
        ProgressBar1.Visible = True
        For Each row In table.Rows
            Try
                AddEditSALESORDERITEM(row, row("SALESORDERITEMSID").ToString())
                ProgressBar1.PerformStep()
            Catch ex As Exception

            End Try

        Next
        ProgressBar1.Visible = False
    End Sub

    Sub SetDisconnectedDataFlag(ByVal SalesOrderId As String, ByVal Flag As String)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM sysdba.SALESORDER WHERE SALESORDERID = '" & SalesOrderId & "'"


        Try
            objConn.Open(My.Settings.SLXConnectionString) ' Note Use the Native Client as we don't want to Sync This
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If Not .EOF Then
                    'UPDATING
                    '.AddNew()

                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = SlxApplication.BasicFunctions.CurrentUserID

                    .Fields("HASDISCONNECTEDDATA").Value = Flag


                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'Add_TACSyncJobERROR(ex, slXLogHeaderID)
            '_hasErrors = True 'Log Errors
            Console.WriteLine(ex.Message)
            'MsgBox(ex.Message)

        End Try
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
            objConn.Open(My.Settings.SLXConnectionString)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    '=================================================================
                    ' 
                    '=================================================================
                    'adding()
                    .AddNew()

                    .Fields("SALESORDERITEMSID").Value = SALESORDERITEMID

                    .Fields("SALESORDERID").Value = MyDataRow("SALESORDERID")
                    .Fields("CREATEUSER").Value = MyDataRow("CREATEUSER")
                    .Fields("CREATEDATE").Value = MyDataRow("CREATEDATE")
                    .Fields("MODIFYUSER").Value = MyDataRow("MODIFYUSER")
                    .Fields("MODIFYDATE").Value = MyDataRow("MODIFYDATE")
                    .Fields("PRODUCT").Value = MyDataRow("PRODUCT")
                    .Fields("PROGRAM").Value = MyDataRow("PROGRAM")
                    .Fields("PRICE").Value = MyDataRow("PRICE")
                    .Fields("QUANTITY").Value = MyDataRow("QUANTITY")
                    .Fields("DISCOUNT").Value = MyDataRow("DISCOUNT")
                    .Fields("FAMILY").Value = MyDataRow("FAMILY")
                    .Fields("OPPPRODUCTID").Value = MyDataRow("OPPPRODUCTID")
                    .Fields("PRODUCTID").Value = MyDataRow("PRODUCTID")
                    .Fields("ACTUALID").Value = MyDataRow("ACTUALID")
                    .Fields("DESCRIPTION").Value = MyDataRow("DESCRIPTION")
                    .Fields("EXTENDEDPRICE").Value = MyDataRow("EXTENDEDPRICE")
                    .Fields("UNIT").Value = MyDataRow("UNIT")
                    .Fields("CALCULATEDPRICE").Value = MyDataRow("CALCULATEDPRICE")
                    .Fields("GLOBALSYNCID").Value = MyDataRow("GLOBALSYNCID")
                    .Fields("LINENUMBER").Value = MyDataRow("LINENUMBER")
                    .Fields("LINETYPE").Value = MyDataRow("LINETYPE")
                    .Fields("SLXLOCATIONID").Value = MyDataRow("SLXLOCATIONID")
                    .Fields("UNITOFMEASUREID").Value = MyDataRow("UNITOFMEASUREID")
                    .Fields("PRICEDETAILDESCRIPTION").Value = MyDataRow("PRICEDETAILDESCRIPTION")
                    .Fields("PRICEDETAILNOTES").Value = MyDataRow("PRICEDETAILNOTES")
                    .Fields("ITEMLOCKED").Value = MyDataRow("ITEMLOCKED")
                    .Fields("TICK").Value = MyDataRow("TICK")
                    .Fields("APPID").Value = MyDataRow("APPID")
                    .Fields("COMMODITYTYPE").Value = MyDataRow("COMMODITYTYPE")
                    .Fields("CREATESOURCE").Value = MyDataRow("CREATESOURCE")
                    .Fields("UPC").Value = MyDataRow("UPC")
                    .Fields("MAX_STOCKLEVEL").Value = MyDataRow("MAX_STOCKLEVEL")
                    .Fields("ORIGPRODUCTPRICE").Value = MyDataRow("ORIGPRODUCTPRICE")
                    .Fields("ORIGPRODUCTDISCOUNT").Value = MyDataRow("ORIGPRODUCTDISCOUNT")
                    .Fields("TACACCOUNTID").Value = MyDataRow("TACACCOUNTID")
                    .Fields("TACSTOCKCARDITEMID").Value = MyDataRow("TACSTOCKCARDITEMID")
                    .Fields("LASTORDER").Value = MyDataRow("LASTORDER")
                    .Fields("LASTORDER2").Value = MyDataRow("LASTORDER2")
                    .Fields("LASTORDER3").Value = MyDataRow("LASTORDER3")
                    .Fields("PREVIOUSYEARSALESQTY").Value = MyDataRow("PREVIOUSYEARSALESQTY")
                    .Fields("CURRENTYEARSALESQTY").Value = MyDataRow("CURRENTYEARSALESQTY")
                    .Fields("ACCOUNTID").Value = MyDataRow("ACCOUNTID")
                    .Fields("MASSHIPPEDDATE").Value = MyDataRow("MASSHIPPEDDATE")
                    .Fields("MASQTYSHIPPED").Value = MyDataRow("MASQTYSHIPPED")
                    .Fields("MASSCHDSHIPDATE").Value = MyDataRow("MASSCHDSHIPDATE")
                    .Fields("TOTALQTYSHIPPED").Value = MyDataRow("TOTALQTYSHIPPED")
                    .Fields("STATUSTEXT").Value = MyDataRow("STATUSTEXT")
                    .Fields("OPENQTY").Value = MyDataRow("OPENQTY")
                    .Fields("ERPACTUALDELIVERYDATE").Value = MyDataRow("ERPACTUALDELIVERYDATE")
                    .Fields("ERPSHIPDATE").Value = MyDataRow("ERPSHIPDATE")
                    .Fields("ERPBACKORDERED").Value = MyDataRow("ERPBACKORDERED")
                    .Fields("UOMQUANTITY").Value = MyDataRow("UOMQUANTITY")
                    .Fields("UOMCODE").Value = MyDataRow("UOMCODE")
                    .Fields("ERPFIXEDPRICEITEM").Value = MyDataRow("ERPFIXEDPRICEITEM")
                    .Fields("ERPUPCID").Value = MyDataRow("ERPUPCID")
                    .Fields("ERPLINENUMBER").Value = MyDataRow("ERPLINENUMBER")
                    .Fields("ERPOPENQUANTITY").Value = MyDataRow("ERPOPENQUANTITY")
                    .Fields("ERPOPENUOM").Value = MyDataRow("ERPOPENUOM")
                    .Fields("ERPPARTIALSHIPALLOWED").Value = MyDataRow("ERPPARTIALSHIPALLOWED")
                    .Fields("ERPPROMISEDDELIVERYDATE").Value = MyDataRow("ERPPROMISEDDELIVERYDATE")
                    .Fields("ERPPROMISEDSHIPDATE").Value = MyDataRow("ERPPROMISEDSHIPDATE")
                    .Fields("ERPPURCHASEORDERREFERENCE").Value = MyDataRow("ERPPURCHASEORDERREFERENCE")
                    .Fields("ERPREQUIREDDELIVERYDATE").Value = MyDataRow("ERPREQUIREDDELIVERYDATE")
                    .Fields("ERPRUSHREQUEST").Value = MyDataRow("ERPRUSHREQUEST")
                    .Fields("ERPSHIPPEDQUANTITY").Value = MyDataRow("ERPSHIPPEDQUANTITY")
                    .Fields("ERPSHIPPEDUOM").Value = MyDataRow("ERPSHIPPEDUOM")
                    .Fields("ERPSHIPTOID").Value = MyDataRow("ERPSHIPTOID")
                    .Fields("ERPSTATUS").Value = MyDataRow("ERPSTATUS")
                    .Fields("ERPSTATUSDATE").Value = MyDataRow("ERPSTATUSDATE")
                    .Fields("ERPSUBSTITUTEITEM").Value = MyDataRow("ERPSUBSTITUTEITEM")
                    .Fields("ERPUNITPRICEUOM").Value = MyDataRow("ERPUNITPRICEUOM")
                    .Fields("ERPUNITPRICEPERQUANTITYUOM").Value = MyDataRow("ERPUNITPRICEPERQUANTITYUOM")
                    .Fields("ERPUNITPRICEPERQUANTITY").Value = MyDataRow("ERPUNITPRICEPERQUANTITY")
                    .Fields("ERPDROPSHIP").Value = MyDataRow("ERPDROPSHIP")
                    .Fields("NOTE").Value = MyDataRow("NOTE")
                    .Fields("ERPQUOTENUMBER").Value = MyDataRow("ERPQUOTENUMBER")
                    .Fields("ERPINCOTERM").Value = MyDataRow("ERPINCOTERM")
                    .Fields("ERPQUOTEID").Value = MyDataRow("ERPQUOTEID")
                    .Fields("STATUS").Value = MyDataRow("STATUS")
                    .Fields("CARRIERID").Value = MyDataRow("CARRIERID")
                    .Fields("DOCTOTALAMOUNT").Value = MyDataRow("DOCTOTALAMOUNT")
                    .Fields("TOTALAMOUNT").Value = MyDataRow("TOTALAMOUNT")
                    .Fields("DOCCALCULATEDPRICE").Value = MyDataRow("DOCCALCULATEDPRICE")
                    .Fields("DOCEXTENDEDPRICE").Value = MyDataRow("DOCEXTENDEDPRICE")
                    .Fields("AVAILABLEQUANTITY").Value = MyDataRow("AVAILABLEQUANTITY")
                    .Fields("ATPDATE").Value = MyDataRow("ATPDATE")
                    .Fields("CONFIGURATIONID").Value = MyDataRow("CONFIGURATIONID")
                    .Fields("CONFIGURATIONDETAILID").Value = MyDataRow("CONFIGURATIONDETAILID")
                    .Fields("ERPNOTES").Value = MyDataRow("ERPNOTES")

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception


        End Try
    End Sub

End Class