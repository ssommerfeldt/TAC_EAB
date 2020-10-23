Imports System.Data.OleDb
Imports System.Data.SqlClient

Module SLXIDCreation
    '===================================================================================
    ' The Following Area Can Be Customized to Fit your Imports Needs
    ' The Power of This Utility is Ability to Add Conditional Logic to Any Field
    '====================================================================================
#Region " Customizable Area that Actually Creates the XML and TempTable in SLX "
    Public Sub cmdGenerateTempTable(ByVal SourceQuery As String, ByVal DestinationTableName As String)

        Dim SLXIDArray(,) As String 'Multidementional Array to Handle SLXID's
        Dim SourceIDs(,) As String 'Two Dimentional Array. Each Array Element Holds an Array of SourceIDs
        'Initialize the Array Length

        Dim SourceColumnArray() As String
        Dim SLXColumnArray() As String
        Dim i As Integer
        ReDim Preserve SourceColumnArray(0)
        ReDim Preserve SLXColumnArray(0)
        Dim RecordCount As Integer = 0

        SourceColumnArray(0) = "STOCKCARDITEMSID" 'Hardcode


        SLXColumnArray(0) = "SLX_SALESORDERITEMID" ' Hardcode

        '===============================================
        ' Get the Source dataIds from the Source Database
        ' And Populate into the SoureceIDs Array.
        '==============================================
        Dim myconn As New OleDb.OleDbConnection(My.Settings.SLXNative)
        myconn.Open()
        Dim SQL As String = SourceQuery
        '==========================================================
        ' Create SQL to get the Array of ID's From the Source Table
        '==========================================================

        '=======================================================================
        ' NEW Method Faster and don't need to hit the DB Twice To Get the Count
        '=======================================================================
        'create the connection
        Dim conn As New OleDbConnection(My.Settings.SLXNative)
        Dim ds As System.Data.DataSet = New DataSet()
        Try
            'open connection
            conn.Open()
            'create the DataAdapter. it will internally create a command object
            Dim da As New OleDbDataAdapter(SourceQuery, conn)


            da.Fill(ds)

            'pull out the created DataTable to work with
            'our table is the first and only one in the tables collection
            Dim table As DataTable = ds.Tables(0)
            RecordCount = table.Rows.Count
            ReDim Preserve SourceIDs(0, RecordCount) 'SSOMMERFELDT JULY 31, 2020 only need StockcardId 
            ReDim Preserve SLXIDArray(0, RecordCount)
            'iterate through the rows in the table's Rows collection
            Dim row As DataRow
            i = 0
            For Each row In table.Rows
                '
                'ListBox1.Items.Add(row("account").ToString())
                SourceIDs(0, i) = CStr(row(0).ToString()) 'only 1 Field here
                i = i + 1
            Next



        Catch ex As Exception
            Console.WriteLine("An error occurred: " & ex.Message, "Error")
        Finally
            conn.Dispose()
            conn = Nothing
        End Try


        '=========================================================================

        Dim iNumIdstoCreate As Integer = CInt(RecordCount)
        '================================================================
        'Load the SLXID Arrays
        '================================================================
        For x = 0 To SLXColumnArray.Length - 1
            Dim TempSLXIDs() As String = CreateSLXID("SALESORDERITEM", My.Settings.SLXConnection, iNumIdstoCreate)
            For i = 0 To iNumIdstoCreate - 1
                'Load the MultiDimentionalArray
                SLXIDArray(x, i) = TempSLXIDs(i)
            Next
        Next


        'MsgBox("Done Load of Arrays")
        Dim ds1 As New System.Data.DataSet
        Dim TempTable As Data.DataTable
        TempTable = ds1.Tables.Add("TempTable")
        '=====================================
        'Add the Source Columns to the DataTable
        '====================================='
        For i = 0 To SourceColumnArray.Length - 1
            TempTable.Columns.Add(SourceColumnArray(i), System.Type.GetType("System.String"))
        Next
        '=====================================
        'Add the SLX Columns to the DataTable
        ' Get Num SLX Columns
        '====================================='
        For i = 0 To SLXColumnArray.Length - 1
            TempTable.Columns.Add(SLXColumnArray(i), System.Type.GetType("System.String"))
        Next
        '================================================================================
        'Next we need to Specify in the Row Where the SLXID's Start and End
        '================================================================================
        Dim iSLXColumnStart, iSLXColumnEnd As Integer
        iSLXColumnStart = SourceColumnArray.Length
        iSLXColumnEnd = iSLXColumnStart + (SLXColumnArray.Length - 1)
        Dim myrow As DataRow
        Dim j As Integer = 0
        For i = 0 To iNumIdstoCreate - 1
            '===================================================
            myrow = TempTable.NewRow
            '===============================================================
            'Add the Rows to the Data Set... First the Source, then the SLX
            '===============================================================
            For x = 0 To SourceColumnArray.Length - 1
                '=======================================================================================
                'This is Where you Might put in Conditional Logic to Massage the DataGoing into the Row
                '=======================================================================================
                myrow.Item(x) = SourceIDs(x, i)
            Next
            'Add the SLX Rows.
            j = 0
            For x = iSLXColumnStart To iSLXColumnEnd
                'Test and Try to Add SLXIDs1 Ect....
                myrow.Item(x) = SLXIDArray(j, i)
                j += 1
            Next
            TempTable.Rows.Add(myrow)
        Next

        Dim conn1 As New SqlClient.SqlConnection(CleanBulkLoadNativeSQLConnectionString(My.Settings.SLXNative))
        Dim myTable As Data.DataTable
        myTable = ds1.Tables(0)
        '==================================
        ' Prepare Destination Table
        '==================================
        CreateTable(myTable, DestinationTableName)
        Try
            conn1.Open()
            Dim bulkcopy As New SqlBulkCopy(conn1)


            bulkcopy.DestinationTableName = DestinationTableName
            If Not ds1 Is Nothing Then
                bulkcopy.WriteToServer(myTable)
            Else
                MsgBox("ensure a valid xml path is selected")
            End If

        Catch ex As Exception
            MsgBox(ex.Message)
        End Try


        '        MsgBox("Done createing Table")
        'Dim mystream As System.IO.Stream
        ''ds.WriteXml("C:\TempContact2.xml")
        'ds.WriteXml("TempTable.xml")
        'Dim Temp As String
        'Dim sr As StreamReader = New StreamReader("TempTable.xml")
        'sr.ReadLine() 'Read the First Line to Get the XML Preliminary Stuff Out.
        'Temp = sr.ReadToEnd
        'sr.Close()
        'CreateTempTableSLX(Temp, SourceColumnArray, SLXColumnArray)
        'Cursor.Current = System.Windows.Forms.Cursors.Default ' Assign the Cursor
        'MsgBox("Temp Table Created")
    End Sub

    Public Sub CreateTable(ByRef objTempTable As DataTable, ByVal DestinationTableName As String)
        '====================================================================================================
        ' CREATE SQL TABLE
        'THE TABLE Must Exist and have the Same Schema
        '====================================================================================================
        Dim strSQL As String
        strSQL = "if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[" & DestinationTableName & "]') and OBJECTPROPERTY(id, N'IsUserTable') = 1) "
        strSQL = strSQL & " drop table [dbo].[" & DestinationTableName & "] "
        '            GO()
        Dim cn As New OleDb.OleDbConnection(My.Settings.SLXNative)
        Try
            cn.Open()
            Dim objCmd As New OleDbCommand(strSQL, cn)
            objCmd.ExecuteNonQuery()

        Catch ex As Exception
            MsgBox(ex.Message & ex.StackTrace)
        Finally
            If cn.State = ConnectionState.Open Then
                cn.Close()
            End If
        End Try
        strSQL = "CREATE TABLE [dbo].[" & DestinationTableName & "] ( "
        Dim myColumn As DataColumn
        For Each myColumn In objTempTable.Columns
            strSQL = strSQL & "	[" & myColumn.ColumnName & "] [varchar] (8000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL , "
        Next
        strSQL = strSQL & " ) ON [PRIMARY] "
        Try
            cn.Open()
            Dim objCMD As New OleDbCommand(strSQL, cn)
            objCMD.ExecuteScalar()
        Catch ex As Exception
            MsgBox(ex.Message & ex.StackTrace)
        Finally
            If cn.State = ConnectionState.Open Then
                cn.Close()
            End If

        End Try
    End Sub
    Public Function CleanBulkLoadNativeSQLConnectionString(ByVal strNativeConnection) As String
        'Dim i As Integer
        Dim strSQLConnString As String = ""  'Need to Modify the OleDB Connection String to remove the Provider Portion because
        ''Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;
        'strSQLConnString = strNativeConnection   ' The SQLClient Assumes your using the SQL server Provider and it will error if you have it there.
        ''Dim i As Integer = 0
        'i = InStr(strSQLConnString, ";")
        'strSQLConnString = Mid(strSQLConnString, i + 1)
        'Return strSQLConnString
        '====================================================
        Dim strDataSource As String = ""
        Dim strUserid As String = ""
        Dim strPassword As String = ""
        Dim strIntialCatalog As String = ""
        ' Returns an array containing "Look", "at", and "these!". 
        Dim SQLConnectionPartsArray() As String = Split(strNativeConnection, ";")
        Dim connBuilder As New SqlConnectionStringBuilder()
        For Each strPart As String In SQLConnectionPartsArray
            '=======================================
            ' PASSWORD
            '=======================================
            If strPart.Contains("Password=") Then
                strPassword = strPart
                connBuilder.Password = strPassword.Replace("Password=", "") ' Clean Out the Password
            End If
            '=======================================
            ' Userid
            '=======================================
            If strPart.Contains("User ID=") Then
                strUserid = strPart
                connBuilder.UserID = strUserid.Replace("User ID=", "")
            End If
            '=======================================
            ' Initial Catalog
            '=======================================
            If strPart.Contains("Initial Catalog=") Then
                strIntialCatalog = strPart
                connBuilder.InitialCatalog = strIntialCatalog.Replace("Initial Catalog=", "")
            End If
            '=======================================
            ' Data Source
            '=======================================
            If strPart.Contains("Data Source=") Then
                strDataSource = strPart
                connBuilder.DataSource = strDataSource.Replace("Data Source=", "")
            End If

        Next
        connBuilder.PersistSecurityInfo = "True"




        strSQLConnString = connBuilder.ConnectionString
        Return strSQLConnString
    End Function


    Public Sub GetSourceData(ByVal strSourceSQL As String, ByVal strDestinationTableName As String)
        Dim SourceconnectionString As String = CleanBulkLoadNativeSQLConnectionString(My.Settings.SLXNative)
        Dim SLXConnectionString As String = CleanBulkLoadNativeSQLConnectionString(My.Settings.SLXNative)
        'Dim strSourceSQL As String

        'strSourceSQL = " SELECT * from vdvMAS_to_SLX_SalesOrderItemShipment_TAC"


        ' get the source data
        '=================================================================


        Using sourceConnection As New SqlConnection(SourceconnectionString)
            Dim myCommand As New SqlCommand(strSourceSQL, sourceConnection)
            sourceConnection.Open()
            Dim reader As SqlDataReader = myCommand.ExecuteReader()

            ' open the destination data
            Using destinationConnection As New SqlConnection(SLXConnectionString)
                ' open the connection
                destinationConnection.Open()

                Using bulkCopy As New SqlBulkCopy(destinationConnection.ConnectionString)
                    bulkCopy.BatchSize = 500
                    bulkCopy.NotifyAfter = 1000
                    ' bulkCopy.SqlRowsCopied += New SqlRowsCopiedEventHandler(bulkCopy_SqlRowsCopied)
                    bulkCopy.DestinationTableName = strDestinationTableName
                    bulkCopy.WriteToServer(reader)
                End Using
            End Using
            reader.Close()
        End Using
    End Sub
    Public Function CreateSLXID(ByVal Table As String, ByVal strConnection As String, ByVal NumIDs As String) As String()
        'Dim strConnection
        ' ===================================================
        ' = You will Need to Create a Valid Connction String
        ' = Easiest way is to create a UDL File
        '====================================================
        'strConnection = "Provider=SLXOLEDB.1;Password=password;Persist Security Info=True;User ID=admin;Initial Catalog=SALESLOGIX_SERVER;Data Source=SALESLOGIX;Extended Properties=PORT=1706;LOG=ON"
        Dim executestring
        executestring = "slx_DBIDs(" & Chr(39) & Table & Chr(39) & " , " & NumIDs & "  )"
        Dim myconn As New OleDb.OleDbConnection(strConnection)
        myconn.Open()
        Dim strTempString() As String
        Dim i As Integer = 0
        Dim objCMD As OleDbCommand = New OleDbCommand(executestring, myconn)
        Dim objReader As OleDbDataReader = objCMD.ExecuteReader()
        ReDim Preserve strTempString(objReader.RecordsAffected - 1)
        If objReader.HasRows Then
            Do While objReader.Read()
                strTempString(i) = objReader.GetString(0)
                i += 1
            Loop
        End If
        objReader.Close()
        myconn.Close()
        Return strTempString


    End Function



    Public Function GetSLXIDArray(ByVal numrows, ByVal numSLXColumns) As String(,)
        '=======================================================================
        'Get the SLXID Array.
        '========================================================================

    End Function
    Public Function GetNumSLXColumns() As Integer

    End Function
    Public Function ParseTable(ByVal SLXTableID As String) As String
        Dim i As Integer
        Dim strTemp As String
        i = InStr(SLXTableID, ".")
        strTemp = Mid(SLXTableID, 1, i - 1)
        Return strTemp
    End Function


#End Region

End Module
