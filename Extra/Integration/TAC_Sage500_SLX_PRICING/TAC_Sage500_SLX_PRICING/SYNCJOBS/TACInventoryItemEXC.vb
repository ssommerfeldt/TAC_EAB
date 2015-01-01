
Imports System.Data.OleDb

Module TACInventoryItemEXC

    Public Sub TACInventoryItemEXCMain()
        '====================================================================================================
        ' TACInventoryItemEXC
        '====================================================================================================
        ' MAS500 Query
        Dim SQL As String = "SELECT     timPriceBreak.PctAdj, timPriceBreak.PriceOrAmtAdj, timItem.CompanyID, timPricing.PriceMeth, timItem.ItemKey"
        SQL = SQL & "                       FROM          timItem RIGHT OUTER JOIN"
        SQL = SQL & "                                              timItemPrice AS timCustItemPrice ON timItem.ItemKey = timCustItemPrice.ItemKey RIGHT OUTER JOIN"
        SQL = SQL & "                                               timPriceBreak ON timCustItemPrice.PricingKey = timPriceBreak.PricingKey LEFT OUTER JOIN"
        SQL = SQL & "                                               timPricing ON timPriceBreak.PricingKey = timPricing.PricingKey"
        SQL = SQL & "                        WHERE      (timCustItemPrice.CustPriceGroupKey IS NULL) AND (timItem.ItemKey IS NOT NULL)"

        '=================================================================================
        ' 1. CLEAN COMPARE
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_TACInventoryItemEXC_zcompare", strSLXNativeConstr)
        '=================================================================================
        ' 2. MOVE TEMP TO COMPARE
        '=================================================================================
        Move_Temp_To_Compare("dbo.MAS_to_SLX_TACInventoryItemEXC_zcompare", "dbo.MAS_to_SLX_TACInventoryItemEXC_temp", strSLXNativeConstr)
        '=================================================================================
        ' 3. CLEAN TEMP
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_TACInventoryItemEXC_temp", strSLXNativeConstr)
        '=================================================================================
        ' 4. MOVE SOURCE TO TEMP
        '=================================================================================
        GetSourceData(SQL, "dbo.MAS_to_SLX_TACInventoryItemEXC_temp")
        '=================================================================================
        ' 5. Process Insert / Updates
        '=================================================================================
        Process_Changed_TACInventoryItemEXC()
        '=================================================================================
        ' 6. Process Deletes
        '=================================================================================
        Process_DELETE_TACInventoryItemEXC()
    End Sub

    Private Sub Process_Changed_TACInventoryItemEXC()

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
            SQL = "Select * from dbo.vdvMAS_to_SLX_TACInventoryItemEXC_TAC_CHANGED "


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("CustKey")
                AddEdit_TACInventoryItemEXC(row, Id)

                Console.WriteLine("Processes TACInventoryItemEXC Changed " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "TACInventoryItemEXC Changes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub AddEdit_TACInventoryItemEXC(ByVal MyDataRow As DataRow, ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM TACInventoryItemEXC WHERE ITEMKEY = '" & Id & "'"


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


                    .Fields("TACINVENTORYITEMEXCID").Value = GetNewSLXID("TACInventoryItemEXC", strSLXConstr) 'MyDataRow("TACInventoryItemEXCID")

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("PCTADJ").Value = MyDataRow("PCTADJ")
                    .Fields("PRICEORAMTADJ").Value = MyDataRow("PRICEORAMTADJ")
                    .Fields("COMPANYID").Value = MyDataRow("COMPANYID")
                    .Fields("PRICEMETH").Value = MyDataRow("PRICEMETH")
                    .Fields("ITEMKEY").Value = MyDataRow("ITEMKEY")

                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("PCTADJ").Value = MyDataRow("PCTADJ")
                    .Fields("PRICEORAMTADJ").Value = MyDataRow("PRICEORAMTADJ")
                    .Fields("COMPANYID").Value = MyDataRow("COMPANYID")
                    .Fields("PRICEMETH").Value = MyDataRow("PRICEMETH")
                    .Fields("ITEMKEY").Value = MyDataRow("ITEMKEY")



                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

    Private Sub Process_DELETE_TACInventoryItemEXC()

        Dim i As Integer = 0
        '===================================================
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from sysdba.TACInventoryItemEXC where ITEMKEY not in (Select ITEMKEY from dbo.MAS_to_SLX_TACInventoryItemEXC_temp)"


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("TACInventoryItemEXCID")
                delete_TACInventoryItemEXC(Id)

                Console.WriteLine("Processes TACInventoryItemEXC DELETE " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "TACInventoryItemEXC Deletes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub delete_TACInventoryItemEXC(ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM TACInventoryItemEXC WHERE TACInventoryItemEXCID = '" & Id & "'"


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
