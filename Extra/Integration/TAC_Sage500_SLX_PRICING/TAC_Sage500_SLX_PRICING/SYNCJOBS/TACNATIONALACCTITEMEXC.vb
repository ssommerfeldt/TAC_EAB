
Imports System.Data.OleDb

Module TACNATIONALACCTITEMEXC

    Public Sub TACNATIONALACCTITEMEXCMain()
        '====================================================================================================
        ' TACNATIONALACCTITEMEXC
        '====================================================================================================
        ' MAS500 Query
        Dim SQL As String = "SELECT DISTINCT "
        SQL = SQL & "       timWarehouse.WhseID, timItem.ItemID, tarNationalAcct.Description, tarCustomer.CustID, tarCustomer.CustName, timPricing.BreakType, timPricing.PriceBase,"
        SQL = SQL & "        timPricing.PriceMeth, timPriceBreak.PctAdj, timPriceBreak.PriceOrAmtAdj, timPriceSheet.CurrID, timPriceSheet.ListPrice, timPriceSheet.Sheet1Price,"
        SQL = SQL & "         timPriceSheet.Sheet2Price, timPriceSheet.Sheet3Price, timPriceSheet.Sheet4Price"
        SQL = SQL & " FROM         timNatAcctItemPrice LEFT OUTER JOIN"
        SQL = SQL & "                       tarNationalAcct ON timNatAcctItemPrice.NationalAcctKey = tarNationalAcct.NationalAcctKey LEFT OUTER JOIN"
        SQL = SQL & "                       timWarehouse ON timNatAcctItemPrice.WhseKey = timWarehouse.WhseKey LEFT OUTER JOIN"
        SQL = SQL & "                       timItem ON timNatAcctItemPrice.ItemKey = timItem.ItemKey LEFT OUTER JOIN"
        SQL = SQL & "                       tarNationalAcctLevel ON tarNationalAcct.NationalAcctKey = tarNationalAcctLevel.NationalAcctKey LEFT OUTER JOIN"
        SQL = SQL & "                       tarCustomer ON tarNationalAcctLevel.NationalAcctLevelKey = tarCustomer.NationalAcctLevelKey LEFT OUTER JOIN"
        SQL = SQL & "                       timPricing ON timNatAcctItemPrice.PricingKey = timPricing.PricingKey LEFT OUTER JOIN"
        SQL = SQL & "                       timPriceBreak ON timNatAcctItemPrice.PricingKey = timPriceBreak.PricingKey AND timPricing.PricingKey = timPriceBreak.PricingKey LEFT OUTER JOIN"
        SQL = SQL & "                       timItemPrice ON timWarehouse.WhseKey = timItemPrice.WhseKey AND timItem.ItemKey = timItemPrice.ItemKey LEFT OUTER JOIN"
        SQL = SQL & "                       timPriceSheet ON timNatAcctItemPrice.WhseKey = timPriceSheet.WhseKey AND timItemPrice.ItemKey = timPriceSheet.ItemKey"

        '=================================================================================
        ' 1. CLEAN COMPARE
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_TACNATIONALACCTITEMEXC_zcompare", strSLXNativeConstr)
        '=================================================================================
        ' 2. MOVE TEMP TO COMPARE
        '=================================================================================
        Move_Temp_To_Compare("dbo.MAS_to_SLX_TACNATIONALACCTITEMEXC_zcompare", "dbo.MAS_to_SLX_TACNATIONALACCTITEMEXC_temp", strSLXNativeConstr)
        '=================================================================================
        ' 3. CLEAN TEMP
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_TACNATIONALACCTITEMEXC_temp", strSLXNativeConstr)
        '=================================================================================
        ' 4. MOVE SOURCE TO TEMP
        '=================================================================================
        GetSourceData(SQL, "dbo.MAS_to_SLX_TACNATIONALACCTITEMEXC_temp")
        '=================================================================================
        ' 5. Process Insert / Updates
        '=================================================================================
        Process_Changed_TACNATIONALACCTITEMEXC()
        '=================================================================================
        ' 6. Process Deletes
        '=================================================================================
        Process_DELETE_TACNATIONALACCTITEMEXC()
    End Sub

    Private Sub Process_Changed_TACNATIONALACCTITEMEXC()

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
            SQL = "Select * from dbo.vdvMAS_to_SLX_TACNATIONALACCTITEMEXC_TAC_CHANGED "


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("WHSEID")
                AddEdit_TACNATIONALACCTITEMEXC(row, Id, row("ITEMID"), row("CUSTID"))

                Console.WriteLine("Processes TACNATIONALACCTITEMEXC Changed " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "TACNATIONALACCTITEMEXC Changes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub AddEdit_TACNATIONALACCTITEMEXC(ByVal MyDataRow As DataRow, ByVal Id As String, ByVal ITEMID As String, ByVal CUSTID As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM TACNATIONALACCTITEMEXC WHERE WHSEID = '" & Id & "' AND CUSTID='" & CUSTID & "' AND ITEMID='" & ITEMID & "'"


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


                    .Fields("TACNATIONALACCTITEMEXCID").Value = GetNewSLXID("TACNATIONALACCTITEMEXC", strSLXConstr) 'MyDataRow("TACNATIONALACCTITEMEXCID")

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("WHSEID").Value = MyDataRow("WHSEID")
                    .Fields("ITEMID").Value = MyDataRow("ITEMID")
                    .Fields("DESCRIPTION").Value = MyDataRow("DESCRIPTION")
                    .Fields("CUSTID").Value = MyDataRow("CUSTID")
                    .Fields("CUSTNAME").Value = MyDataRow("CUSTNAME")
                    .Fields("PCTADJ").Value = MyDataRow("PCTADJ")
                    .Fields("LISTPRICE").Value = MyDataRow("LISTPRICE")
                    .Fields("PRICEMETH").Value = MyDataRow("PRICEMETH")
                    .Fields("PRICEORAMTADJ").Value = MyDataRow("PRICEORAMTADJ")

                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("WHSEID").Value = MyDataRow("WHSEID")
                    .Fields("ITEMID").Value = MyDataRow("ITEMID")
                    .Fields("DESCRIPTION").Value = MyDataRow("DESCRIPTION")
                    .Fields("CUSTID").Value = MyDataRow("CUSTID")
                    .Fields("CUSTNAME").Value = MyDataRow("CUSTNAME")
                    .Fields("PCTADJ").Value = MyDataRow("PCTADJ")
                    .Fields("LISTPRICE").Value = MyDataRow("LISTPRICE")
                    .Fields("PRICEMETH").Value = MyDataRow("PRICEMETH")
                    .Fields("PRICEORAMTADJ").Value = MyDataRow("PRICEORAMTADJ")

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

    Private Sub Process_DELETE_TACNATIONALACCTITEMEXC()

        Dim i As Integer = 0
        '===================================================
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from sysdba.TACNATIONALACCTITEMEXC where Cast(WHSEID  as varchar(32)) + Cast(ITEMID  as varchar(32))+ Cast(CUSTID   as varchar(32))"
            SQL = SQL & " not in (Select Cast(WHSEID  as varchar(32)) + Cast(ITEMID  as varchar(32))+ Cast(CUSTID   as varchar(32)) from dbo.MAS_to_SLX_TACNATIONALACCTITEMEXC_temp)"


                'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                    'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                    'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("TACNATIONALACCTITEMEXCID")
                delete_TACNATIONALACCTITEMEXC(Id)

                Console.WriteLine("Processes TACNATIONALACCTITEMEXC DELETE " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "TACNATIONALACCTITEMEXC Deletes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub delete_TACNATIONALACCTITEMEXC(ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM TACNATIONALACCTITEMEXC WHERE TACNATIONALACCTITEMEXCID = '" & Id & "'"


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
