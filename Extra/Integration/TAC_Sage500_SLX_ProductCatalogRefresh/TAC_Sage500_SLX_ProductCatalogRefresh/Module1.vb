Imports System.IO
Imports System.Data.SqlClient

Module Module1

#Region " Declaration of Variables and Support Functions "
    '=================================================================
    ' Need to Set the Project for
    '=================================================================
    Private PROJECTNAME As String = "TAC_Sage500_SLX_ProductCatalogRefresh"
    Private strSage500Constr As String
    Private strSLXNativeConstr As String
    Private strSLXConstr As String

#End Region

    Sub Main()
        Call LogErrors(PROJECTNAME, " - Main", "Process Start", EventLogEntryType.Information)

        strSLXNativeConstr = GetConnection(PROJECTNAME, "SLXNativeConnection.udl")
        strSage500Constr = GetConnection(PROJECTNAME, "Sage500Connection.udl")
        strSLXConstr = GetConnection(PROJECTNAME, "SLXConnection.udl")

        If strSLXConstr = "" Or strSLXNativeConstr = "" Or strSage500Constr = "" Then
            '=============================================
            ' Problem with the Connection String So Exit
            '===============================================
            'You must create an empty test.udl file in c:\ first. So, goto to c: - right click and New File - call it test.udl and then run the command above:
            'C:\Windows\syswow64\rundll32.exe "C:\Program Files (x86)\Common Files\System\Ole DB\oledb32.dll",OpenDSLFile C:\test.udl

            Call LogErrors(PROJECTNAME, " - Main", "Problem with Connectin String so Exit", EventLogEntryType.Error)
            Exit Sub

        End If
        'Call GetRWPass()
        'Call GetUserID()
        'Call GetPartsHandlerData("Account")
        'Call GetPartsHandlerData("History")

        Call LogErrors(PROJECTNAME, " - Main", "Process End", EventLogEntryType.Information)
    End Sub

    Private Sub GetSourceData()
        Dim MASconnectionString As String = CleanBulkLoadNativeSQLConnectionString(strSage500Constr)
        Dim SLXConnectionString As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        ' get the source data
        '=================================================================
        ' Source SQL for Products

        Using sourceConnection As New SqlConnection(MASconnectionString)
            Dim myCommand As New SqlCommand("SELECT * FROM Products_Archive", sourceConnection)
            sourceConnection.Open()
            Dim reader As SqlDataReader = myCommand.ExecuteReader()

            ' open the destination data
            Using destinationConnection As New SqlConnection(connectionString)
                ' open the connection
                destinationConnection.Open()

                Using bulkCopy As New SqlBulkCopy(destinationConnection.ConnectionString)
                    bulkCopy.BatchSize = 500
                    bulkCopy.NotifyAfter = 1000
                    ' bulkCopy.SqlRowsCopied += New SqlRowsCopiedEventHandler(bulkCopy_SqlRowsCopied)
                    bulkCopy.DestinationTableName = "Products_Latest"
                    bulkCopy.WriteToServer(reader)
                End Using
            End Using
            reader.Close()
        End Using
    End Sub



End Module
