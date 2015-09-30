﻿Imports System.Data.OleDb

Module tarNationalAcctLevel

    Public Sub tarNationalAcctLevelMain()
        '====================================================================================================
        ' tarNationalAcctLevel
        '====================================================================================================
        ' MAS500 Query
        Dim SQL As String = "SELECT * from tarNationalAcctLevel"

        '=================================================================================
        ' 1. CLEAN COMPARE
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_tarNationalAcctLevel_zcompare", strSLXNativeConstr)
        '=================================================================================
        ' 2. MOVE TEMP TO COMPARE
        '=================================================================================
        Move_Temp_To_Compare("dbo.MAS_to_SLX_tarNationalAcctLevel_zcompare", "dbo.MAS_to_SLX_tarNationalAcctLevel_temp", strSLXNativeConstr)
        '=================================================================================
        ' 3. CLEAN TEMP
        '=================================================================================
        Clean_Table("dbo.MAS_to_SLX_tarNationalAcctLevel_temp", strSLXNativeConstr)
        '=================================================================================
        ' 4. MOVE SOURCE TO TEMP
        '=================================================================================
        GetSourceData(SQL, "dbo.MAS_to_SLX_tarNationalAcctLevel_temp")
        '=================================================================================
        ' 5. Process Insert / Updates
        '=================================================================================
        Process_Changed_tarNationalAcctLevel()
        '=================================================================================
        ' 6. Process Deletes
        '=================================================================================
        Process_DELETE_tarNationalAcctLevel()
    End Sub

    Private Sub Process_Changed_tarNationalAcctLevel()

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
            SQL = "Select * from dbo.vdvMAS_to_SLX_tarNationalAcctLevel_TAC_CHANGED "


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("NationalAcctLevelKey")
                AddEdit_tarNationalAcctLevel(row, Id)

                Console.WriteLine("Processes tarNationalAcctLevel Changed " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "tarNationalAcctLevel Changes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub AddEdit_tarNationalAcctLevel(ByVal MyDataRow As DataRow, ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM tarNationalAcctLevel WHERE NationalAcctKey = '" & Id & "'"


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


                    .Fields("TARNATIONALACCTLEVELID").Value = GetNewSLXID("tarNationalAcctLevel", strSLXConstr) 'MyDataRow("tarNationalAcctLevelID")

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"


                    .Fields("NationalAcctLevelKey").Value = MyDataRow("NationalAcctLevelKey")
                    .Fields("Description").Value = MyDataRow("Description")
                    .Fields("NationalAcctKey").Value = MyDataRow("NationalAcctKey")
                    .Fields("NationalAcctLevel").Value = MyDataRow("NationalAcctLevel")

                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("NationalAcctLevelKey").Value = MyDataRow("NationalAcctLevelKey")
                    .Fields("Description").Value = MyDataRow("Description")
                    .Fields("NationalAcctKey").Value = MyDataRow("NationalAcctKey")
                    .Fields("NationalAcctLevel").Value = MyDataRow("NationalAcctLevel")


                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

    Private Sub Process_DELETE_tarNationalAcctLevel()

        Dim i As Integer = 0
        '===================================================
        Dim Id As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from sysdba.tarNationalAcctLevel where NationalAcctLevelKey not in (Select NationalAcctLevelKey from dbo.MAS_to_SLX_tarNationalAcctLevel_temp)"


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                'SalesOrderItemId = GetSalesOrderItemID(row("SALESORDERID"), row("ItemKey"))
                i = i + 1
                Id = row("tarNationalAcctLevelID")
                delete_tarNationalAcctLevel(Id)

                Console.WriteLine("Processes tarNationalAcctLevel DELETE " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "tarNationalAcctLevel Deletes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub


    Public Sub delete_tarNationalAcctLevel(ByVal Id As String)
        '============================================================
        ' get Default Data row from SALESORDERITEM SHIPPING INFO
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM tarNationalAcctLevel WHERE tarNationalAcctLevelID = '" & Id & "'"


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