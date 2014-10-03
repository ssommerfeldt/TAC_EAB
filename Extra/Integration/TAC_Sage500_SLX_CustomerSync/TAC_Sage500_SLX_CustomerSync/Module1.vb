Imports System.IO
Imports System.Data.SqlClient
Imports System.Data.OleDb

Module Module1

#Region " Declaration of Variables and Support Functions "
    '=================================================================
    ' Need to Set the Project for
    '=================================================================
    Private PROJECTNAME As String = "TAC_Sage500_SLX_CustomerSync"
    Private strSage500Constr As String
    Private strSLXNativeConstr As String
    Private strSLXConstr As String

#End Region

    Sub Main()
        Call LogErrors(PROJECTNAME, " - TAC_Sage500_SLX_CustomerSync", "Process Start", EventLogEntryType.Information)

        strSLXNativeConstr = GetConnection(PROJECTNAME, "SLXNativeConnection.udl")
        strSage500Constr = GetConnection(PROJECTNAME, "Sage500Connection.udl")
        strSLXConstr = GetConnection(PROJECTNAME, "SLXConnection.udl")

        If strSLXConstr = "" Or strSLXNativeConstr = "" Or strSage500Constr = "" Then
            '=============================================
            ' Problem with the Connection String So Exit
            '===============================================
            'You must create an empty test.udl file in c:\ first. So, goto to c: - right click and New File - call it test.udl and then run the command above:
            'C:\Windows\syswow64\rundll32.exe "C:\Program Files (x86)\Common Files\System\Ole DB\oledb32.dll",OpenDSLFile C:\test.udl

            Call LogErrors(PROJECTNAME, " TAC_Sage500_SLX_CustomerSync", "Problem with Connectin String so Exit SN - " & strSage500Constr & "S5 = " & strSage500Constr & " SX =" & strSLXConstr, EventLogEntryType.Error)
            Exit Sub

        End If
        'Call GetRWPass()
        'Call GetUserID()
        'Call GetPartsHandlerData("Account")
        'Call GetPartsHandlerData("History")
        Console.WriteLine("------ New Accounts Start ------")
        Call Process_New_ACCOUNT()
        Console.WriteLine("------ New Account Summary ------")
        Call Process_New_ACCOUNTSUMMARY()

        Console.WriteLine("------ NeW ERPTRADINGACCOUNT Start ------")
        Call Process_New_ERPTRADINGACCOUNT()

        Console.WriteLine("------ New AccountFinnancial Start ------")
        Call Process_New_ACCOUNTFINNANCIAL()

        Console.WriteLine("------ New AccountAddress Start ------")
        Call Process_New_ACCOUNTADDRESS()

        Console.WriteLine("------ New Contact Start ------")
        Call Process_New_CONTACT()

        Console.WriteLine("------ New Contact Address Start ------")
        Call Process_New_CONTACTADDRESS()

        Console.WriteLine("------ New Account Additional Address Start ------")
        Call Process_New_ACCOUNTADDITIONAL_ADDRESS()

        Console.WriteLine("------ Changed Account  Start ------")
        Call Process_New_ACCOUNT_CHANGED()

        Console.WriteLine("------ Changed Account Finnancial Start ------")
        Call Process_Changed_ACCOUNTFINNANCIAL()

        Call LogErrors(PROJECTNAME, " TAC_Sage500_SLX_CustomerSync", "Process End", EventLogEntryType.Information)
    End Sub


#Region "ACCOUNT AREA--------------"
    Private Sub Process_New_ACCOUNT()

        Dim i As Integer = 0
        '===================================================
        Dim Accountid As String = ""
        Dim Addressid As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSage500Constr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_ACCOUNT_TAC"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                Accountid = GetNewSLXID("ACCOUNT", strSLXConstr)
                Addressid = GetNewSLXID("ADDRESS", strSLXConstr)

                i = i + 1
                AddEdit_ACCOUNT(row, Accountid, Addressid)

                Console.WriteLine("Processes Account " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "Account ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Private Sub Process_New_ACCOUNT_CHANGED()

        Dim i As Integer = 0
        '===================================================
        'Dim Contactid As String = ""
        Dim Addressid As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSage500Constr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_ACCOUNT_TAC_Changed"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'Contactid = GetNewSLXID("CONTACT", strSLXConstr)
                'Addressid = GetNewSLXID("ADDRESS", strSLXConstr)

                i = i + 1
                AddEdit_ACCOUNT(row, row("ACCOUNTID"), "")

                Console.WriteLine("Processes Account CHANGED" & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "Account CHANGED ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub AddEdit_ACCOUNT(ByVal MyDataRow As DataRow, ByVal Accountid As String, ByVal Addressid As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM ACCOUNT WHERE ACCOUNTID = '" & Accountid & "'"


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

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("ADDRESSID").Value = Addressid
                    .Fields("ACCOUNTID").Value = Accountid
                    .Fields("SHIPPINGID").Value = Addressid

                    .Fields("TYPE").Value = MyDataRow("TYPE")
                    .Fields("ACCOUNT").Value = MyDataRow("ACCOUNT")
                    .Fields("MAINPHONE").Value = MyDataRow("MAINPHONE")
                    .Fields("FAX").Value = MyDataRow("FAX")
                    .Fields("SECCODEID").Value = MyDataRow("SECCODEID")
                    .Fields("STATUS").Value = MyDataRow("STATUS")
                    .Fields("ACCOUNTMANAGERID").Value = MyDataRow("ACCOUNTMANAGERID")
                    .Fields("ACCOUNT_UC").Value = MyDataRow("ACCOUNT_UC")
                    .Fields("DONOTSOLICIT").Value = MyDataRow("DONOTSOLICIT")
                    .Fields("IMPORTSOURCE").Value = MyDataRow("IMPORTSOURCE")
                    .Fields("MASCUSTKEY").Value = MyDataRow("MASCUSTKEY")


                    .Fields("CURRENCYCODE").Value = MyDataRow("CURRENCYCODE")




                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("ACCOUNT").Value = MyDataRow("ACCOUNT")
                    .Fields("MAINPHONE").Value = MyDataRow("MAINPHONE")
                    .Fields("FAX").Value = MyDataRow("FAX")
                    '.Fields("SECCODEID").Value = MyDataRow("SECCODEID")
                    .Fields("ACCOUNTMANAGERID").Value = MyDataRow("ACCOUNTMANAGERID")
                    .Fields("ACCOUNT_UC").Value = MyDataRow("ACCOUNT_UC")
                    .Fields("MASCUSTKEY").Value = MyDataRow("MASCUSTKEY")
                    .Fields("CURRENCYCODE").Value = MyDataRow("CURRENCYCODE")
                    '.Fields("ACCOUNTID").Value = MyDataRow("ACCOUNTID")
                    .Fields("MASNationalAcctID").Value = MyDataRow("NationalAcctID")



                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub
#End Region

#Region "ACCOUNTSUMMARY AREA-----'"

    Private Sub Process_New_ACCOUNTSUMMARY()

        Dim i As Integer = 0
        '===================================================
        'Dim Accountid As String = ""
        'Dim Addressid As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSage500Constr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_ACCOUNTaccountsummary_TAC"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'Accountid = GetNewSLXID("ACCOUNT", strSLXConstr)
                'Addressid = GetNewSLXID("ADDRESS", strSLXConstr)

                i = i + 1
                AddEdit_ACCOUNTSUMMARY(row, row("ACCOUNTID"))

                Console.WriteLine("Processes AccountSummary " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "AccountSummary ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub AddEdit_ACCOUNTSUMMARY(ByVal MyDataRow As DataRow, ByVal Accountid As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM ACCOUNTSUMMARY WHERE ACCOUNTID = '" & Accountid & "'"


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

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("ACCOUNTID").Value = MyDataRow("ACCOUNTID")
                    .Fields("TYPE").Value = MyDataRow("TYPE")
                    .Fields("ACCOUNT").Value = MyDataRow("ACCOUNT")
                    .Fields("SECCODEID").Value = MyDataRow("SECCODEID")



                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    '.Fields("MODIFYDATE").Value = Now
                    '.Fields("MODIFYUSER").Value = "ADMIN"




                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

#End Region

#Region "ERPTRADINGACCOUNT AREA-----"

    Private Sub Process_New_ERPTRADINGACCOUNT()

        Dim i As Integer = 0
        '===================================================
        'Dim Accountid As String = ""
        'Dim Addressid As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSage500Constr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_ACCOUNTerptradingaccount_TAC"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'Accountid = GetNewSLXID("ACCOUNT", strSLXConstr)
                'Addressid = GetNewSLXID("ADDRESS", strSLXConstr)

                i = i + 1
                AddEdit_ERPTRADINGACCOUNT(row, row("ACCOUNTID"))

                Console.WriteLine("Processes ERPTRADINGACCOUNT " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "ERPTRADINGACCOUNT ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub AddEdit_ERPTRADINGACCOUNT(ByVal MyDataRow As DataRow, ByVal Accountid As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM ERPTRADINGACCOUNT WHERE ACCOUNTID = '" & Accountid & "'"


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

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("ACCOUNTID").Value = MyDataRow("ACCOUNTID")

                    .Fields("SECCODEID").Value = MyDataRow("SECCODEID")



                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    '.Fields("MODIFYDATE").Value = Now
                    '.Fields("MODIFYUSER").Value = "ADMIN"




                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

#End Region

#Region "ACCOUNTFINNANCIAL AREA -----"
    Private Sub Process_New_ACCOUNTFINNANCIAL()

        Dim i As Integer = 0
        '===================================================
        Dim ACCOUNTFINANCIALid As String = ""
        'Dim Addressid As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSage500Constr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                ACCOUNTFINANCIALid = GetNewSLXID("ACCOUNTFINANCIAL", strSLXConstr)
                'Addressid = GetNewSLXID("ADDRESS", strSLXConstr)

                i = i + 1
                AddEdit_ACCOUNTFINNANCIAL(row, ACCOUNTFINANCIALid)

                Console.WriteLine("Processes ACCOUNTFINNANCIAL " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "ACCOUNTFINNANCIAL ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Private Sub Process_Changed_ACCOUNTFINNANCIAL()

        Dim i As Integer = 0
        '===================================================
        Dim ACCOUNTFINANCIALid As String = ""
        'Dim Addressid As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSage500Constr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_ACCOUNTaccountfinancial_TAC_Changed"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                ACCOUNTFINANCIALid = row("ACCOUNTFINANCIALID")
                'Addressid = GetNewSLXID("ADDRESS", strSLXConstr)

                i = i + 1
                AddEdit_ACCOUNTFINNANCIAL(row, ACCOUNTFINANCIALid)

                Console.WriteLine("Changed ACCOUNTFINNANCIAL " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "ACCOUNTFINNANCIAL ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub AddEdit_ACCOUNTFINNANCIAL(ByVal MyDataRow As DataRow, ByVal ACCOUNTFINANCIALid As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM ACCOUNTFINANCIAL WHERE ACCOUNTID = '" & MyDataRow("ACCOUNTID") & "'"


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

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("ACCOUNTFINANCIALID").Value = ACCOUNTFINANCIALid
                    .Fields("ACCOUNTID").Value = MyDataRow("ACCOUNTID")

                    .Fields("SALESPERSON").Value = MyDataRow("SALESPERSON")
                    .Fields("CUSTOMER_TYPE").Value = MyDataRow("CUSTOMER_TYPE")
                    .Fields("CREDIT_LIMIT").Value = MyDataRow("CREDIT_LIMIT")
                    .Fields("AVG_DAYS_TO_PAY").Value = MyDataRow("AVG_DAYS_TO_PAY")
                    .Fields("AVG_DAYS_OVERDUE").Value = MyDataRow("AVG_DAYS_OVERDUE")
                    .Fields("BALANCE_FORWARD").Value = MyDataRow("BALANCE_FORWARD")
                    .Fields("CUSTOMERID").Value = MyDataRow("CUSTOMERID")
                    .Fields("COMPANYCODE").Value = MyDataRow("COMPANYCODE")
                    .Fields("CURRENTBALANCE").Value = MyDataRow("CURRENTBALANCE")



                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    '.Fields("MODIFYDATE").Value = Now
                    '.Fields("MODIFYUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    '.Fields("ACCOUNTFINANCIALID").Value = ACCOUNTFINANCIALid
                    .Fields("ACCOUNTID").Value = MyDataRow("ACCOUNTID")

                    .Fields("SALESPERSON").Value = MyDataRow("SALESPERSON")
                    .Fields("CUSTOMER_TYPE").Value = MyDataRow("CUSTOMER_TYPE")
                    .Fields("CREDIT_LIMIT").Value = MyDataRow("CREDIT_LIMIT")
                    .Fields("AVG_DAYS_TO_PAY").Value = MyDataRow("AVG_DAYS_TO_PAY")
                    .Fields("AVG_DAYS_OVERDUE").Value = MyDataRow("AVG_DAYS_OVERDUE")
                    .Fields("BALANCE_FORWARD").Value = MyDataRow("BALANCE_FORWARD")
                    .Fields("CUSTOMERID").Value = MyDataRow("CUSTOMERID")
                    .Fields("COMPANYCODE").Value = MyDataRow("COMPANYCODE")
                    .Fields("CURRENTBALANCE").Value = MyDataRow("CURRENTBALANCE")




                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

#End Region
 

#Region "ACCOUNT ADDRESS-----"
    Private Sub Process_New_ACCOUNTADDRESS()

        Dim i As Integer = 0
        '===================================================
        'Dim ACCOUNTFINANCIALid As String = ""
        'Dim Addressid As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSage500Constr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_ACCOUNTaddress_TAC"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ACCOUNTFINANCIALid = GetNewSLXID("ACCOUNTFINANCIAL", strSLXConstr)
                'Addressid = GetNewSLXID("ADDRESS", strSLXConstr)

                i = i + 1
                AddEdit_ACCOUNTADDRESS(row, row("ADDRESSID"))

                Console.WriteLine("Processes ADDDRESS " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "ADDRESS ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub AddEdit_ACCOUNTADDRESS(ByVal MyDataRow As DataRow, ByVal Addressid As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM ADDRESS WHERE ADDRESSID = '" & Addressid & "'"


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

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("ADDRESSID").Value = MyDataRow("ADDRESSID")
                    .Fields("ENTITYID").Value = MyDataRow("ENTITYID")
                    .Fields("TYPE").Value = MyDataRow("TYPE")
                    .Fields("DESCRIPTION").Value = MyDataRow("DESCRIPTION")
                    .Fields("ADDRESS1").Value = MyDataRow("ADDRESS1")
                    .Fields("ADDRESS2").Value = MyDataRow("ADDRESS2")
                    .Fields("CITY").Value = MyDataRow("CITY")
                    .Fields("STATE").Value = MyDataRow("STATE")
                    .Fields("POSTALCODE").Value = MyDataRow("POSTALCODE")
                    .Fields("COUNTRY").Value = MyDataRow("COUNTRY")
                    .Fields("ISPRIMARY").Value = MyDataRow("ISPRIMARY")
                    .Fields("ISMAILING").Value = MyDataRow("ISMAILING")

                    .Fields("ADDRESS3").Value = MyDataRow("ADDRESS3")
                    .Fields("ADDRESS4").Value = MyDataRow("ADDRESS4")
                    .Fields("ERPNAME").Value = MyDataRow("ERPNAME")
                    .Fields("MASADDRKEY").Value = MyDataRow("MASADDRKEY")



                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    '.Fields("MODIFYDATE").Value = Now
                    '.Fields("MODIFYUSER").Value = "ADMIN"




                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

#End Region

#Region "CONTACT  AREA-----"
    Private Sub Process_New_CONTACT()

        Dim i As Integer = 0
        '===================================================
        Dim Contactid As String = ""
        Dim Addressid As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSage500Constr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_CONTACT_TAC"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                Contactid = GetNewSLXID("CONTACT", strSLXConstr)
                Addressid = GetNewSLXID("ADDRESS", strSLXConstr)

                i = i + 1
                AddEdit_CONTACT(row, Contactid, Addressid)

                Console.WriteLine("Processes CONTACT " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "CONTACT ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub AddEdit_CONTACT(ByVal MyDataRow As DataRow, ByVal Contactid As String, ByVal Addressid As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM CONTACT WHERE CONTACTID = '" & Contactid & "'"


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

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"
                    .Fields("CONTACTID").Value = Contactid
                    .Fields("ADDRESSID").Value = Addressid

                    .Fields("TYPE").Value = MyDataRow("TYPE")
                    .Fields("ACCOUNTID").Value = MyDataRow("ACCOUNTID")
                    .Fields("ACCOUNT").Value = MyDataRow("ACCOUNT")
                    .Fields("ISPRIMARY").Value = MyDataRow("ISPRIMARY")
                    .Fields("LASTNAME").Value = MyDataRow("LASTNAME")
                    .Fields("FIRSTNAME").Value = MyDataRow("FIRSTNAME")
                    .Fields("WORKPHONE").Value = MyDataRow("WORKPHONE")
                    .Fields("FAX").Value = MyDataRow("FAX")
                    .Fields("EMAIL").Value = MyDataRow("EMAIL")
                    .Fields("TITLE").Value = MyDataRow("TITLE")
                    .Fields("SECCODEID").Value = MyDataRow("SECCODEID")
                    .Fields("ACCOUNTMANAGERID").Value = MyDataRow("ACCOUNTMANAGERID")

                    .Fields("LASTNAME_UC").Value = MyDataRow("LASTNAME_UC")
                    .Fields("DONOTSOLICIT").Value = MyDataRow("DONOTSOLICIT")
                    .Fields("DONOTEMAIL").Value = MyDataRow("DONOTEMAIL")
                    .Fields("DONOTPHONE").Value = MyDataRow("DONOTPHONE")
                    .Fields("DONOTMAIL").Value = MyDataRow("DONOTMAIL")
                    .Fields("DONOTFAX").Value = MyDataRow("DONOTFAX")
                    .Fields("IMPORTSOURCE").Value = MyDataRow("IMPORTSOURCE")
                    .Fields("SALUTATION").Value = MyDataRow("SALUTATION")
                    .Fields("MASCONTACTNAME").Value = MyDataRow("MASCONTACTNAME")
                    .Fields("MASCONTACTID").Value = MyDataRow("MACCONTACTID")



                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    '.Fields("MODIFYDATE").Value = Now
                    '.Fields("MODIFYUSER").Value = "ADMIN"




                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            Console.WriteLine(ex.Message)

        End Try
    End Sub


#End Region

#Region "CONTACT ADDRESS AREA-----"
    Private Sub Process_New_CONTACTADDRESS()

        Dim i As Integer = 0
        '===================================================
        'Dim Contactid As String = ""
        'Dim Addressid As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSage500Constr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_CONTACTaddress_TAC"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'Contactid = GetNewSLXID("CONTACT", strSLXConstr)
                'Addressid = GetNewSLXID("ADDRESS", strSLXConstr)

                i = i + 1
                AddEdit_CONTACTADDRESS(row, row("ADDRESSID"))

                Console.WriteLine("Processes CONTACT ADDRESS " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "CONTACT ADDRESS ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub AddEdit_CONTACTADDRESS(ByVal MyDataRow As DataRow, ByVal Addressid As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM ADDRESS WHERE ADDRESSID = '" & Addressid & "'"


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

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"


                    .Fields("ADDRESSID").Value = MyDataRow("ADDRESSID")
                    .Fields("ENTITYID").Value = MyDataRow("ENTITYID")
                    .Fields("TYPE").Value = MyDataRow("TYPE")
                    .Fields("DESCRIPTION").Value = MyDataRow("DESCRIPTION")
                    .Fields("ADDRESS1").Value = MyDataRow("ADDRESS1")
                    .Fields("ADDRESS2").Value = MyDataRow("ADDRESS2")
                    .Fields("CITY").Value = MyDataRow("CITY")
                    .Fields("STATE").Value = MyDataRow("STATE")
                    .Fields("POSTALCODE").Value = MyDataRow("POSTALCODE")
                    .Fields("COUNTRY").Value = MyDataRow("COUNTRY")
                    .Fields("ISPRIMARY").Value = MyDataRow("ISPRIMARY")
                    .Fields("ISMAILING").Value = MyDataRow("ISMAILING")

                    .Fields("ADDRESS3").Value = MyDataRow("ADDRESS3")
                    .Fields("ADDRESS4").Value = MyDataRow("ADDRESS4")
                    .Fields("ERPNAME").Value = MyDataRow("ERPNAME")
                    .Fields("MASADDRKEY").Value = MyDataRow("MASADDRKEY")



                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    '.Fields("MODIFYDATE").Value = Now
                    '.Fields("MODIFYUSER").Value = "ADMIN"




                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub

#End Region

#Region "Account Additional address "

    Private Sub Process_New_ACCOUNTADDITIONAL_ADDRESS()

        Dim i As Integer = 0
        '===================================================
        'Dim Contactid As String = ""
        Dim Addressid As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSage500Constr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_ACCOUNTAdditionalAddress_TAC"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'Contactid = GetNewSLXID("CONTACT", strSLXConstr)
                Addressid = GetNewSLXID("ADDRESS", strSLXConstr)

                i = i + 1
                AddEdit_ACCOUNTADDITIONAL_ADDRESS(row, Addressid)

                Console.WriteLine("Processes Account ADDRESS Additional" & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "Account ADDRESS Additional ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub AddEdit_ACCOUNTADDITIONAL_ADDRESS(ByVal MyDataRow As DataRow, ByVal Addressid As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM ADDRESS WHERE ADDRESSID = '" & Addressid & "'"


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

                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"
                    .Fields("ADDRESSID").Value = Addressid

                    .Fields("ENTITYID").Value = MyDataRow("ENTITYID")
                    .Fields("DESCRIPTION").Value = MyDataRow("DESCRIPTION")
                    .Fields("ADDRESS1").Value = MyDataRow("ADDRESS1")
                    .Fields("ADDRESS2").Value = MyDataRow("ADDRESS2")
                    .Fields("City").Value = MyDataRow("City")
                    .Fields("STATE").Value = MyDataRow("STATE")
                    .Fields("PostalCode").Value = MyDataRow("PostalCode")
                    .Fields("COUNTRY").Value = MyDataRow("COUNTRY")
                    .Fields("ISPRIMARY").Value = MyDataRow("ISPRIMARY")
                    .Fields("ISMAILING").Value = MyDataRow("ISMAILING")
                    .Fields("SALUTATION").Value = MyDataRow("SALUTATION")
                    .Fields("ADDRESS3").Value = MyDataRow("ADDRESS3")
                    .Fields("ADDRESS4").Value = MyDataRow("ADDRESS4")
                    .Fields("ERPNAME").Value = MyDataRow("ERPNAME")
                    .Fields("MASADDRKEY").Value = MyDataRow("MASADDRKEY")



                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    '.Fields("MODIFYDATE").Value = Now
                    '.Fields("MODIFYUSER").Value = "ADMIN"




                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub
#End Region

    

    






End Module
