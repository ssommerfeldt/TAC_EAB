Imports System.IO
Imports System.Data.SqlClient
Imports System.Data.OleDb
Imports System.Configuration

Module Module1
#Region " Declaration of Variables and Support Functions "
    '=================================================================
    ' Need to Set the Project for
    '=================================================================
    Public PROJECTNAME As String = "TAC_Sage500_SLX_PRICING"
    Public strMASConstr As String
    Public strSLXNativeConstr As String
    Public strSLXConstr As String

#End Region
    Sub Main()

        Call LogErrors(PROJECTNAME, " - Main", "Process Start", EventLogEntryType.Information)

        ' strSLXNativeConstr = GetConnection(PROJECTNAME, "SLXNativeConnection.udl")
        strSLXNativeConstr = My.Settings.SLXNativeConnection
        'strMASConstr = GetConnection(PROJECTNAME, "Sage500Connection.udl")
        strMASConstr = My.Settings.Sage500Connection
        'strSLXConstr = GetConnection(PROJECTNAME, "SLXConnection.udl")
        strSLXConstr = My.Settings.SLXConnection

        If strSLXConstr = "" Or strSLXNativeConstr = "" Or strMASConstr = "" Then
            '=============================================
            ' Problem with the Connection String So Exit
            '===============================================
            'You must create an empty test.udl file in c:\ first. So, goto to c: - right click and New File - call it test.udl and then run the command above:
            'C:\Windows\syswow64\rundll32.exe "C:\Program Files (x86)\Common Files\System\Ole DB\oledb32.dll",OpenDSLFile C:\test.udl

            Call LogErrors(PROJECTNAME, " - Main", "Problem with Connectin String so Exit", EventLogEntryType.Error)
            Exit Sub

        End If
        '=====================================
        ' Call Each Table Main in Sequence
        '=====================================
        tarCustomerMain()
        tarNationalAcctMain()
        tarNationalAcctLevelMain()
        timNatAcctProdGrpPrcMain()
        timPriceBreakMain()
        timPriceSheetMain()
        timPricingMain()
        timProdPriceGroupMain()
        timProdPriceGroupPriceMain()
        timWarehouseMain()
        timPriceGroupPriceMain()
        tarCustAddrMain()
        TACNATIONALACCTITEMEXCMain()
        TACInventoryItemEXCMain()

    End Sub


End Module
