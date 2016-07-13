Imports System.Data.SqlClient
Imports System.Data.OleDb
Imports System.Configuration


Module CopyDistributionPrice

    Dim strSage500Conn As String
    Dim strSLXConn As String
    Dim isAdding As Boolean
    Dim ctrAddedRows As Integer
    Dim ctrUpdatedRows As Integer



    Sub Main()
        'Assigning connection string to connection variable 
        strSage500Conn = My.Settings.Sage500Connection
        strSLXConn = My.Settings.SLXConnection
        'SQL Query Data Source
        'Dim strSQLSource As String = "SELECT  itemKey, itemID, currencyID, companyID, distributorPrice, itemMOQ FROM EAB_DistPriceList"
        'Table Destination(Will receive the data from the SQL Source/EAB_DistPriceList)
        Dim strDestinationTableName As String = "sysdba.TACDISTRIBUTORPRICING"

        'Copy Distributor Price from EAB_DistPriceList(SAGE 500 Database) to TACDISTRIBUTORPRICING(EABSLX Database)
        ProcessCopyingDistPrice()
    End Sub


    Private Sub ProcessCopyingDistPrice()

        Dim i As Integer = 0
        Dim TACDistributorPricingID As String = ""
      
        Dim objConn As New OleDbConnection(strSage500Conn)

        'Initialize counter to Zero
        ctrAddedRows = 0
        ctrUpdatedRows = 0

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "SELECT itemKey, itemID, currencyID, companyID, distributorPrice, itemMOQ FROM EAB_DistPriceList"

            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                TACDistributorPricingID = GetNewSLXID("TACDISTRIBUTORPRICING", strSLXConn)
                i = i + 1
                AddUpdateTACDISTRIBUTORPRICING(row, TACDistributorPricingID)

                If isAdding = True Then
                    Console.WriteLine("New distributor price ADDED..")
                Else
                    Console.WriteLine("Distributor price UPDATED..")
                End If
            Next row
            Console.WriteLine(ctrAddedRows & " New Distributor price have been added.")
            Console.WriteLine(ctrUpdatedRows & " Distributor price have been updated.")
            Console.ReadLine()
        Catch ex As Exception
            MsgBox(ex.Message)

        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Function GetNewSLXID(ByVal TableName As String, ByVal strSLXConnectionString As String) As String
        Dim objRS As New ADODB.Recordset

        Try
            'Get a new id for a table and return that id
            objRS.Open("SLX_DBIDS(" & TableName & ",1)", strSLXConnectionString)
            GetNewSLXID = objRS.Fields(0).Value
        Catch ex As Exception
            GetNewSLXID = ""
            MsgBox(ex)
        Finally
            If objRS.State = ADODB.ObjectStateEnum.adStateOpen Then
                objRS.Close()
                objRS = Nothing
            End If
        End Try
    End Function



    Public Sub AddUpdateTACDISTRIBUTORPRICING(ByVal MyDataRow As DataRow, ByVal TACDistributorPricingID As String)
      
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM TACDISTRIBUTORPRICING WHERE ItemKey = '" & MyDataRow("ItemKey") & "'"


        Try
            objConn.Open(strSLXConn)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    'adding
                    .AddNew()
                    .Fields("TACDISTRIBUTORPRICINGID").Value = TACDistributorPricingID
                    .Fields("CREATEDATE").Value = Now
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("ITEMKEY").Value = MyDataRow("ItemKey")
                    .Fields("ITEMID").Value = MyDataRow("itemID")
                    .Fields("CURRENCYID").Value = MyDataRow("currencyID")
                    .Fields("COMPANYID").Value = MyDataRow("companyID")
                    .Fields("DISTRIBUTORPRICE").Value = MyDataRow("distributorPrice")
                    .Fields("MOQ").Value = MyDataRow("itemMOQ")

                    'Validate if adding
                    isAdding = True

                    'Count added rows
                    ctrAddedRows = ctrAddedRows + 1
                Else
                    'updating
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    .Fields("ITEMKEY").Value = MyDataRow("ItemKey")
                    .Fields("ITEMID").Value = MyDataRow("itemID")
                    .Fields("CURRENCYID").Value = MyDataRow("currencyID")
                    .Fields("COMPANYID").Value = MyDataRow("companyID")
                    .Fields("DISTRIBUTORPRICE").Value = MyDataRow("distributorPrice")
                    .Fields("MOQ").Value = MyDataRow("itemMOQ")

                    'Validate if adding
                    isAdding = False

                    'Count Updated Rows
                    ctrUpdatedRows = ctrUpdatedRows + 1
                End If

                .UpdateBatch()
                .Close()
            End With

        Catch ex As Exception
            MsgBox(ex.Message)
        End Try
    End Sub




End Module
