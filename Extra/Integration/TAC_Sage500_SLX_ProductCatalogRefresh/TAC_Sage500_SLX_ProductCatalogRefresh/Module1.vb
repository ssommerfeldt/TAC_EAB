Imports System.IO
Imports System.Data.SqlClient
Imports System.Data.OleDb

Module Module1

#Region " Declaration of Variables and Support Functions "
    '=================================================================
    ' Need to Set the Project for
    '=================================================================
    Public PROJECTNAME As String = "TAC_Sage500_SLX_ProductCatalogRefresh"
    Public strSage500Constr As String
    Public strSLXNativeConstr As String
    Public strSLXConstr As String

#End Region

    Sub Main()
        Try


            Call LogErrors(PROJECTNAME, " - Main", "Process Start", EventLogEntryType.Information)

            strSLXNativeConstr = My.Settings.SLXNativeConstr 'GetConnection(PROJECTNAME, "SLXNativeConnection.udl")
            strSage500Constr = My.Settings.Sage500Constr 'GetConnection(PROJECTNAME, "Sage500Connection.udl")
            strSLXConstr = My.Settings.SLXConstr 'GetConnection(PROJECTNAME, "SLXConnection.udl")

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
            '=================================================================================================================================================================
            ' TEST Connectivity to MAS.  This sometimes Fails but we have already moved and Cleaned out Temp so it Re-Syncs  Everything, Causing Large Syncs for Users
            '=================================================================================================================================================================
            If TESTSourceData() = False Then
                '=================
                ' Log Failure and Email 
                ' Then Exit 
                '==========================
                Console.WriteLine("Failure executing Query to Mass")
                Dim strReport As String
                strReport = "<style>body{font-family: Verdana, Arial, Helvetica, sans-serif} td{font-weight: 550}</style>"
                strReport = strReport & " <body>"
                strReport = strReport & " <center><font size=+3 color=#000099>Product Sync Failed to Connect to MASS</font><br><font size=-2 color=#0000CC>" & Now.ToString & "</font></center>"
                strReport = strReport & " Product Sync has Process over the number of threshold number of changes there maybe a problem and this should be looked into and the processed stopped to ensure a large sync is not pushed out.<br><br>"
                strReport = strReport & "    <br><sup>*</sup><Font size=-1> Please look into this at your earliest convenience  </font>"
                strReport = strReport & " </body>"
                SendSimpleEmail(My.Settings.SendtoEmails, strReport, "Product Sync Issue Suspected" & Now.ToString(), "")
                Exit Sub

            End If

            Console.WriteLine("Move Temp into Compare")
            Call Clean_Compare()
            Call Move_Temp_To_Compare()
            Console.WriteLine("Clean Temp table")
            Call CleanTempDir()
            Console.WriteLine("Get Source Data")
            Call GetSourceData()

            '============================================================
            Console.WriteLine("------ New Products Start ------")
            Call Process_NewProducts()
            Console.WriteLine("------ Ne ProductProgram Start ------")
            Call Process_NewPRODUCTPROGRAM()

            Console.WriteLine("------ NeW SITE Start ------")
            Call Process_NewSITE()

            Console.WriteLine("------ Products Changed Start ------")
            Call Process_ChangedProducts()
            'Console.WriteLine("------ SalesOrderItems Start ------")

            Console.WriteLine("------ Clean-up StockCards with Inactive Products Start ------")
            Process_DELETE_InactiveStockCardProducts()

            Console.WriteLine("------ Clean-up OrderItems with Inactive Products Start ------")
            Process_DELETE_InactiveProductsfromOrders()

            'Console.WriteLine("------ Clean-up Products that are out of Sync for whatever reason ------")
            'Process_CleanUP()

            Call LogErrors(PROJECTNAME, " - Main", "Process End", EventLogEntryType.Information)
        Catch ex As Exception
            Dim strReport As String
            strReport = "<style>body{font-family: Verdana, Arial, Helvetica, sans-serif} td{font-weight: 550}</style>"
            strReport = strReport & " <body>"
            strReport = strReport & " <center><font size=+3 color=#000099>Product Sync Crashed</font><br><font size=-2 color=#0000CC>" & Now.ToString & "</font></center>"
            strReport = strReport & " Product Sync has Process over the number of threshold number of changes there maybe a problem and this should be looked into and the processed stopped to ensure a large sync is not pushed out.<br><br>"
            strReport = strReport & "    <br><sup>*</sup><Font size=-1> Please look into this at your earliest convenience  </font>"
            strReport = strReport & " </body>"
            SendSimpleEmail(My.Settings.SendtoEmails, strReport, "Product Sync Issue Suspected" & Now.ToString(), "")
            Exit Sub
        End Try
    End Sub


    Private Sub Clean_Compare()



        Dim sql As String = "Truncate table MAS_TO_SLX_PRODUCT_ZCompare"
        Dim strConnection As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        Using conn As New SqlConnection(strConnection)
            Dim cmd As New SqlCommand(sql, conn)
            '==========================================================================
            ' Clean Out the Compare Table 
            '===========================================================================
            Try
                conn.Open()
                cmd.ExecuteNonQuery()
            Catch ex As Exception
                Call LogErrors(PROJECTNAME, " - Main", ex.Message, EventLogEntryType.Error)
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try

            '==========================================================================

        End Using


    End Sub

    Private Sub Move_Temp_To_Compare()


        Dim sql As String
        sql = "Insert into dbo.MAS_TO_SLX_PRODUCT_ZCompare"
        sql = sql & " Select * from dbo.MAS_TO_SLX_PRODUCT_Temp"
        Dim strConnection As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        Using conn As New SqlConnection(strConnection)
            Dim cmd As New SqlCommand(sql, conn)
            '==========================================================================
            ' Push all Records from Temp into Compare
            '===========================================================================
            Try
                conn.Open()
                cmd.ExecuteNonQuery()
            Catch ex As Exception
                Call LogErrors(PROJECTNAME, " - Main", ex.Message, EventLogEntryType.Error)
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try


        End Using


    End Sub


    Private Sub CleanTempDir()


        Dim sql As String = "Truncate table dbo.MAS_TO_SLX_PRODUCT_Temp"
        Dim strConnection As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        Using conn As New SqlConnection(strConnection)
            Dim cmd As New SqlCommand(sql, conn)

            Try
                conn.Open()
                cmd.ExecuteNonQuery()
            Catch ex As Exception
                Call LogErrors(PROJECTNAME, " - Main", ex.Message, EventLogEntryType.Error)
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try
        End Using


    End Sub


    Private Sub GetSourceData()
        Dim SourceconnectionString As String = CleanBulkLoadNativeSQLConnectionString(strSage500Constr)
        Dim SLXConnectionString As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        Dim strSourceSQL As String
        strSourceSQL = My.Settings.SourceQuery

        'strSourceSQL = "SELECT     vdvStockStatus.ShortDesc AS NAME, timItemDescription.LongDesc AS DESCRIPTION, vdvStockStatus.ItemID AS ACTUALID, timItemClass.ItemClassName AS FAMILY, "
        'strSourceSQL = strSourceSQL & "                      timItem.StdPrice AS PRICE, tmpItemType.LocalText AS PRODUCTGROUP, CONVERT(varchar(255), tmpItemStatus.LocalText) AS STATUS, "
        'strSourceSQL = strSourceSQL & "                      vdvStockStatus.UnitMeasID AS UNIT, NULL AS STOCKVOLUME, NULL AS STOCKWEIGHT, NULL AS STOCKITEM, NULL AS PROGRAM, NULL AS SUPPLIER, NULL "
        'strSourceSQL = strSourceSQL & "                      AS VENDOR, NULL AS SITEID, NULL AS WAREHOUSELOCATION, NULL AS COMMISSIONABLE, NULL AS TAXABLE, NULL AS ACCOUNTINGPERIOD, "
        'strSourceSQL = strSourceSQL & "                      tglAccount.GLAcctNo AS GLACCOUNTNUMBER, NULL AS GLSUBACCOUNTNUMBER, NULL AS DATAOWNER, NULL AS TYPE, NULL AS FIXEDCOST, NULL "
        'strSourceSQL = strSourceSQL & "                      AS GLOBALSYNCID, NULL AS APPID, NULL AS TICK, NULL AS COMMODITYGROUPID, NULL AS ACTIVEFLAG, 'T' AS SELLINGALLOWEDFLAG, "
        'strSourceSQL = strSourceSQL & "                      vdvStockStatus.StockUnitMeasKey AS UNITOFMEASUREID, NULL AS SELLINGUOMID, NULL AS SELLINGUOMNUMBER, NULL AS CLASSIFICATION, NULL "
        'strSourceSQL = strSourceSQL & "                      AS COMMODITYTYPE, vdvStockStatus.ItemKey AS MASITEMKEY, timItemUnitOfMeas.UPC, vdvStockStatus.ItemID AS MASITEMID, "
        'strSourceSQL = strSourceSQL & "                      vdvStockStatus.WhseID AS WAREHOUSEID, vdvStockStatus.CompanyID, vdvStockStatus.QtyOnHand, vdvStockStatus.QtyAvailable, vdvStockStatus.SurplusQty, "
        'strSourceSQL = strSourceSQL & "                      vdvStockStatus.QtyOnHold, vdvStockStatus.MaxStockLevel, timItem.ProdPriceGroupKey"
        'strSourceSQL = strSourceSQL & " FROM         tglAccount LEFT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                      timInventory ON tglAccount.GLAcctKey = timInventory.InvtAcctKey RIGHT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                      vdvStockStatus INNER JOIN"
        'strSourceSQL = strSourceSQL & "                      timItem ON vdvStockStatus.ItemKey = timItem.ItemKey ON timInventory.WhseKey = vdvStockStatus.WhseKey AND "
        'strSourceSQL = strSourceSQL & "                      timInventory.ItemKey = vdvStockStatus.ItemKey LEFT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                      timItemUnitOfMeas ON timItem.SalesUnitMeasKey = timItemUnitOfMeas.TargetUnitMeasKey AND timItem.ItemKey = timItemUnitOfMeas.ItemKey LEFT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                          (SELECT     TableName, ColumnName, DBValue, IsDefault, IsHidden, StringNo, LocalText"
        'strSourceSQL = strSourceSQL & "                            FROM          vListValidationString AS vListValidationString_1"
        'strSourceSQL = strSourceSQL & "                            WHERE      (TableName = 'timItem') AND (ColumnName = 'Status')) AS tmpItemStatus ON timItem.Status = tmpItemStatus.DBValue LEFT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                          (SELECT     TableName, ColumnName, DBValue, IsDefault, IsHidden, StringNo, LocalText"
        'strSourceSQL = strSourceSQL & "                            FROM          vListValidationString"
        'strSourceSQL = strSourceSQL & "                            WHERE      (TableName = 'timItem') AND (ColumnName = 'ItemType')) AS tmpItemType ON timItem.ItemType = tmpItemType.DBValue LEFT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                      timItemClass ON timItem.ItemClassKey = timItemClass.ItemClassKey LEFT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                      timItemDescription ON vdvStockStatus.ItemKey = timItemDescription.ItemKey"


        ' get the source data
        '=================================================================


        Using sourceConnection As New SqlConnection(SourceconnectionString)
            Dim myCommand As New SqlCommand(strSourceSQL, sourceConnection)
            sourceConnection.Open()
            myCommand.CommandTimeout = 1260
            Dim reader As SqlDataReader = myCommand.ExecuteReader()

            ' open the destination data
            Using destinationConnection As New SqlConnection(SLXConnectionString)
                ' open the connection
                destinationConnection.Open()

                Using bulkCopy As New SqlBulkCopy(destinationConnection.ConnectionString)
                    bulkCopy.BatchSize = 500
                    bulkCopy.NotifyAfter = 1000
                    ' bulkCopy.SqlRowsCopied += New SqlRowsCopiedEventHandler(bulkCopy_SqlRowsCopied)
                    bulkCopy.DestinationTableName = "MAS_TO_SLX_PRODUCT_Temp"
                    bulkCopy.WriteToServer(reader)
                End Using
            End Using
            reader.Close()
        End Using
    End Sub

    Private Function TESTSourceData() As Boolean
        Dim SourceconnectionString As String = CleanBulkLoadNativeSQLConnectionString(strSage500Constr)
        Dim SLXConnectionString As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        Dim strSourceSQL As String

        'strSourceSQL = "SELECT     vdvStockStatus.ShortDesc AS NAME, timItemDescription.LongDesc AS DESCRIPTION, vdvStockStatus.ItemID AS ACTUALID, timItemClass.ItemClassName AS FAMILY, "
        'strSourceSQL = strSourceSQL & "                      timItem.StdPrice AS PRICE, tmpItemType.LocalText AS PRODUCTGROUP, CONVERT(varchar(255), tmpItemStatus.LocalText) AS STATUS, "
        'strSourceSQL = strSourceSQL & "                      vdvStockStatus.UnitMeasID AS UNIT, NULL AS STOCKVOLUME, NULL AS STOCKWEIGHT, NULL AS STOCKITEM, NULL AS PROGRAM, NULL AS SUPPLIER, NULL "
        'strSourceSQL = strSourceSQL & "                      AS VENDOR, NULL AS SITEID, NULL AS WAREHOUSELOCATION, NULL AS COMMISSIONABLE, NULL AS TAXABLE, NULL AS ACCOUNTINGPERIOD, "
        'strSourceSQL = strSourceSQL & "                      tglAccount.GLAcctNo AS GLACCOUNTNUMBER, NULL AS GLSUBACCOUNTNUMBER, NULL AS DATAOWNER, NULL AS TYPE, NULL AS FIXEDCOST, NULL "
        'strSourceSQL = strSourceSQL & "                      AS GLOBALSYNCID, NULL AS APPID, NULL AS TICK, NULL AS COMMODITYGROUPID, NULL AS ACTIVEFLAG, 'T' AS SELLINGALLOWEDFLAG, "
        'strSourceSQL = strSourceSQL & "                      vdvStockStatus.StockUnitMeasKey AS UNITOFMEASUREID, NULL AS SELLINGUOMID, NULL AS SELLINGUOMNUMBER, NULL AS CLASSIFICATION, NULL "
        'strSourceSQL = strSourceSQL & "                      AS COMMODITYTYPE, vdvStockStatus.ItemKey AS MASITEMKEY, timItemUnitOfMeas.UPC, vdvStockStatus.ItemID AS MASITEMID, "
        'strSourceSQL = strSourceSQL & "                      vdvStockStatus.WhseID AS WAREHOUSEID, vdvStockStatus.CompanyID, vdvStockStatus.QtyOnHand, vdvStockStatus.QtyAvailable, vdvStockStatus.SurplusQty, "
        'strSourceSQL = strSourceSQL & "                      vdvStockStatus.QtyOnHold, vdvStockStatus.MaxStockLevel, timItem.ProdPriceGroupKey"
        'strSourceSQL = strSourceSQL & " FROM         tglAccount LEFT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                      timInventory ON tglAccount.GLAcctKey = timInventory.InvtAcctKey RIGHT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                      vdvStockStatus INNER JOIN"
        'strSourceSQL = strSourceSQL & "                      timItem ON vdvStockStatus.ItemKey = timItem.ItemKey ON timInventory.WhseKey = vdvStockStatus.WhseKey AND "
        'strSourceSQL = strSourceSQL & "                      timInventory.ItemKey = vdvStockStatus.ItemKey LEFT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                      timItemUnitOfMeas ON timItem.SalesUnitMeasKey = timItemUnitOfMeas.TargetUnitMeasKey AND timItem.ItemKey = timItemUnitOfMeas.ItemKey LEFT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                          (SELECT     TableName, ColumnName, DBValue, IsDefault, IsHidden, StringNo, LocalText"
        'strSourceSQL = strSourceSQL & "                            FROM          vListValidationString AS vListValidationString_1"
        'strSourceSQL = strSourceSQL & "                            WHERE      (TableName = 'timItem') AND (ColumnName = 'Status')) AS tmpItemStatus ON timItem.Status = tmpItemStatus.DBValue LEFT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                          (SELECT     TableName, ColumnName, DBValue, IsDefault, IsHidden, StringNo, LocalText"
        'strSourceSQL = strSourceSQL & "                            FROM          vListValidationString"
        'strSourceSQL = strSourceSQL & "                            WHERE      (TableName = 'timItem') AND (ColumnName = 'ItemType')) AS tmpItemType ON timItem.ItemType = tmpItemType.DBValue LEFT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                      timItemClass ON timItem.ItemClassKey = timItemClass.ItemClassKey LEFT OUTER JOIN"
        'strSourceSQL = strSourceSQL & "                      timItemDescription ON vdvStockStatus.ItemKey = timItemDescription.ItemKey"

        strSourceSQL = My.Settings.SourceQuery


        ' get the source data
        '=================================================================
        Dim blnReturn As Boolean = False
        Try

       

        Using sourceConnection As New SqlConnection(SourceconnectionString)
                Dim myCommand As New SqlCommand(strSourceSQL, sourceConnection)
                myCommand.CommandTimeout = 1260
            sourceConnection.Open()
            Dim reader As SqlDataReader = myCommand.ExecuteReader()

            '' open the destination data
            'Using destinationConnection As New SqlConnection(SLXConnectionString)
            '    ' open the connection
            '    destinationConnection.Open()

            '    Using bulkCopy As New SqlBulkCopy(destinationConnection.ConnectionString)
            '        bulkCopy.BatchSize = 500
            '        bulkCopy.NotifyAfter = 1000
            '        ' bulkCopy.SqlRowsCopied += New SqlRowsCopiedEventHandler(bulkCopy_SqlRowsCopied)
            '        bulkCopy.DestinationTableName = "MAS_TO_SLX_PRODUCT_Temp"
            '        bulkCopy.WriteToServer(reader)
            '    End Using
                'End Using
                blnReturn = True  ' Return True because we successfully read the data
            reader.Close()

            End Using
        Catch ex As Exception
            blnReturn = False ' Failed for some reason
        End Try

        Return blnReturn

    End Function
    Private Sub Process_NewProducts()

        Dim i As Integer = 0
        '===================================================
        Dim ProductId As String = ""
        'Dim ShippingId As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            'SQL = "Select * from vdvMAS_to_SLX_Products_TAC" ' This View was in MAS but is now moved to SLX
            SQL = "SELECT     MAS_TO_SLX_PRODUCT_Temp.*"
            SQL = SQL & " FROM         MAS_TO_SLX_PRODUCT_Temp LEFT OUTER JOIN"
            SQL = SQL & "                       sysdba.PRODUCT ON MAS_TO_SLX_PRODUCT_Temp.CompanyID = sysdba.PRODUCT.COMPANYID AND "
            SQL = SQL & " MAS_TO_SLX_PRODUCT_Temp.WAREHOUSEID = sysdba.PRODUCT.WAREHOUSEID And"
            SQL = SQL & " MAS_TO_SLX_PRODUCT_Temp.MASITEMKEY = sysdba.PRODUCT.MASITEMKEY"
            SQL = SQL & " WHERE(sysdba.PRODUCT.PRODUCTID Is NULL)"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                i = i + 1
                AddEditPRODUCT(row, ProductId)

                Console.WriteLine("Processes PRODUCT " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "PRODUCT ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub AddEditPRODUCT(ByVal MyDataRow As DataRow, ByVal Productid As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM PRODUCT WHERE PRODUCTID = '" & Productid & "'"


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

                    .Fields("PRODUCTID").Value = Productid

                    .Fields("NAME").Value = MyDataRow("NAME")
                    .Fields("DESCRIPTION").Value = MyDataRow("DESCRIPTION")
                    .Fields("ACTUALID").Value = MyDataRow("ACTUALID")
                    .Fields("FAMILY").Value = MyDataRow("FAMILY")
                    .Fields("PRICE").Value = MyDataRow("PRICE")
                    .Fields("PRODUCTGROUP").Value = MyDataRow("PRODUCTGROUP")
                    .Fields("STATUS").Value = MyDataRow("STATUS")
                    .Fields("UNIT").Value = MyDataRow("UNIT")
                    .Fields("STOCKVOLUME").Value = MyDataRow("STOCKVOLUME")
                    .Fields("STOCKWEIGHT").Value = MyDataRow("STOCKWEIGHT")
                    .Fields("STOCKITEM").Value = MyDataRow("STOCKITEM")
                    .Fields("PROGRAM").Value = MyDataRow("PROGRAM")
                    .Fields("SUPPLIER").Value = MyDataRow("SUPPLIER")
                    .Fields("VENDOR").Value = MyDataRow("VENDOR")
                    .Fields("SITEID").Value = MyDataRow("SITEID")
                    .Fields("WAREHOUSELOCATION").Value = MyDataRow("WAREHOUSELOCATION")
                    .Fields("COMMISSIONABLE").Value = MyDataRow("COMMISSIONABLE")
                    .Fields("TAXABLE").Value = MyDataRow("TAXABLE")
                    .Fields("ACCOUNTINGPERIOD").Value = MyDataRow("ACCOUNTINGPERIOD")
                    .Fields("GLACCOUNTNUMBER").Value = MyDataRow("GLACCOUNTNUMBER")
                    .Fields("GLSUBACCOUNTNUMBER").Value = MyDataRow("GLSUBACCOUNTNUMBER")
                    .Fields("DATAOWNER").Value = MyDataRow("DATAOWNER")
                    .Fields("TYPE").Value = MyDataRow("TYPE")
                    .Fields("FIXEDCOST").Value = MyDataRow("FIXEDCOST")
                    .Fields("GLOBALSYNCID").Value = MyDataRow("GLOBALSYNCID")
                    .Fields("APPID").Value = MyDataRow("APPID")
                    .Fields("TICK").Value = MyDataRow("TICK")
                    .Fields("COMMODITYGROUPID").Value = MyDataRow("COMMODITYGROUPID")
                    .Fields("ACTIVEFLAG").Value = MyDataRow("ACTIVEFLAG")
                    .Fields("SELLINGALLOWEDFLAG").Value = MyDataRow("SELLINGALLOWEDFLAG")
                    .Fields("UNITOFMEASUREID").Value = MyDataRow("UNITOFMEASUREID")
                    .Fields("SELLINGUOMID").Value = MyDataRow("SELLINGUOMID")
                    .Fields("SELLINGUOMNUMBER").Value = MyDataRow("SELLINGUOMNUMBER")
                    .Fields("CLASSIFICATION").Value = MyDataRow("CLASSIFICATION")
                    .Fields("COMMODITYTYPE").Value = MyDataRow("COMMODITYTYPE")
                    .Fields("MASITEMKEY").Value = MyDataRow("MASITEMKEY")
                    .Fields("UPC").Value = MyDataRow("UPC")
                    .Fields("MASITEMID").Value = MyDataRow("MASITEMID")
                    .Fields("WAREHOUSEID").Value = MyDataRow("WAREHOUSEID")
                    .Fields("CompanyID").Value = MyDataRow("CompanyID")
                    .Fields("QtyOnHand").Value = MyDataRow("QtyOnHand")
                    .Fields("QtyAvailable").Value = MyDataRow("QtyAvailable")
                    .Fields("SurplusQty").Value = MyDataRow("SurplusQty")
                    .Fields("QtyOnHold").Value = MyDataRow("QtyOnHold")
                    .Fields("MaxStockLevel").Value = MyDataRow("MaxStockLevel")
                    .Fields("MASProdPriceGroupKey").Value = MyDataRow("ProdPriceGroupKey")




                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("CREATEDATE").Value = Now
                    '.Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN"

                    '.Fields("PRODUCTID").Value = Productid

                    .Fields("NAME").Value = MyDataRow("NAME")
                    '.Fields("DESCRIPTION").Value = MyDataRow("DESCRIPTION") ' Can Compare on TEXT Fields 
                    .Fields("ACTUALID").Value = MyDataRow("ACTUALID")
                    .Fields("FAMILY").Value = MyDataRow("FAMILY")
                    .Fields("PRICE").Value = MyDataRow("PRICE")
                    .Fields("PRODUCTGROUP").Value = MyDataRow("PRODUCTGROUP")
                    .Fields("STATUS").Value = MyDataRow("STATUS")
                    .Fields("UNIT").Value = MyDataRow("UNIT")
                    .Fields("STOCKVOLUME").Value = MyDataRow("STOCKVOLUME")
                    .Fields("STOCKWEIGHT").Value = MyDataRow("STOCKWEIGHT")
                    .Fields("STOCKITEM").Value = MyDataRow("STOCKITEM")
                    .Fields("PROGRAM").Value = MyDataRow("PROGRAM")
                    .Fields("SUPPLIER").Value = MyDataRow("SUPPLIER")
                    .Fields("VENDOR").Value = MyDataRow("VENDOR")
                    .Fields("SITEID").Value = MyDataRow("SITEID")
                    .Fields("WAREHOUSELOCATION").Value = MyDataRow("WAREHOUSELOCATION")
                    .Fields("COMMISSIONABLE").Value = MyDataRow("COMMISSIONABLE")
                    .Fields("TAXABLE").Value = MyDataRow("TAXABLE")
                    .Fields("ACCOUNTINGPERIOD").Value = MyDataRow("ACCOUNTINGPERIOD")
                    .Fields("GLACCOUNTNUMBER").Value = MyDataRow("GLACCOUNTNUMBER")
                    .Fields("GLSUBACCOUNTNUMBER").Value = MyDataRow("GLSUBACCOUNTNUMBER")
                    .Fields("DATAOWNER").Value = MyDataRow("DATAOWNER")
                    .Fields("TYPE").Value = MyDataRow("TYPE")
                    .Fields("FIXEDCOST").Value = MyDataRow("FIXEDCOST")
                    .Fields("GLOBALSYNCID").Value = MyDataRow("GLOBALSYNCID")
                    .Fields("APPID").Value = MyDataRow("APPID")
                    .Fields("TICK").Value = MyDataRow("TICK")
                    .Fields("COMMODITYGROUPID").Value = MyDataRow("COMMODITYGROUPID")
                    .Fields("ACTIVEFLAG").Value = MyDataRow("ACTIVEFLAG")
                    .Fields("SELLINGALLOWEDFLAG").Value = MyDataRow("SELLINGALLOWEDFLAG")
                    .Fields("UNITOFMEASUREID").Value = MyDataRow("UNITOFMEASUREID")
                    .Fields("SELLINGUOMID").Value = MyDataRow("SELLINGUOMID")
                    .Fields("SELLINGUOMNUMBER").Value = MyDataRow("SELLINGUOMNUMBER")
                    .Fields("CLASSIFICATION").Value = MyDataRow("CLASSIFICATION")
                    .Fields("COMMODITYTYPE").Value = MyDataRow("COMMODITYTYPE")
                    .Fields("MASITEMKEY").Value = MyDataRow("MASITEMKEY")
                    .Fields("UPC").Value = MyDataRow("UPC")
                    .Fields("MASITEMID").Value = MyDataRow("MASITEMID")
                    .Fields("WAREHOUSEID").Value = MyDataRow("WAREHOUSEID")
                    .Fields("CompanyID").Value = MyDataRow("CompanyID")
                    .Fields("QtyOnHand").Value = MyDataRow("QtyOnHand")
                    .Fields("QtyAvailable").Value = MyDataRow("QtyAvailable")
                    .Fields("SurplusQty").Value = MyDataRow("SurplusQty")
                    .Fields("QtyOnHold").Value = MyDataRow("QtyOnHold")
                    .Fields("MaxStockLevel").Value = MyDataRow("MaxStockLevel")
                    .Fields("MASProdPriceGroupKey").Value = MyDataRow("ProdPriceGroupKey")

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub


    Private Sub Process_NewPRODUCTPROGRAM()

        Dim i As Integer = 0
        '===================================================
        Dim ProductProgramId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from sysdba.vImport_newProductProgram"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                ProductProgramId = GetNewSLXID("PRODUCTPROGRAM", strSLXConstr)
                i = i + 1
                AddEditPRODUCTPROGRAM(row, ProductProgramId)

                Console.WriteLine("Processes PRODUCTPROGRAM " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "PRODUCTprogram ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub AddEditPRODUCTPROGRAM(ByVal MyDataRow As DataRow, ByVal ProductProgramId As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM PRODUCTPROGRAM WHERE PRODUCTID = '" & ProductProgramId & "'"


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

                    .Fields("PRODUCTPROGRAMID").Value = ProductProgramId

                    .Fields("PRODUCTID").Value = MyDataRow("PRODUCTID")
                    .Fields("PROGRAM").Value = MyDataRow("PROGRAM")
                    .Fields("PRICE").Value = MyDataRow("PRICE")
                    .Fields("DEFAULTPROGRAM").Value = MyDataRow("DEFAULTPROGRAM")



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


    Private Sub Process_NewSITE()

        Dim i As Integer = 0
        '===================================================
        Dim SiteID As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from sysdba.vImport_new_SITE"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                SiteID = GetNewSLXID("SITE", strSLXConstr)
                i = i + 1
                AddEditSITE(row, SiteID)

                Console.WriteLine("Processes SITE " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "SITE ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub AddEditSITE(ByVal MyDataRow As DataRow, ByVal SiteId As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM SITE WHERE SITEID = '" & SiteId & "'"


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

                    .Fields("SITEID").Value = SiteId

                    .Fields("ADDRESSID").Value = MyDataRow("ADDRESSID")
                    .Fields("SITECODE").Value = MyDataRow("SITECODE")
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

    Private Sub Process_ChangedProducts()

        Dim i As Integer = 0
        '===================================================
        Dim ProductId As String = ""
        'Dim ShippingId As String = ""
        'Dim BillingId As String = ""
        '==================================================       
        Dim objConn As New OleDbConnection(strSLXNativeConstr)
        Dim strReport As String = ""
        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select * from vdvMAS_to_SLX_PRODUCT_TAC_CHANGED"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'ProductId = GetNewSLXID("PRODUCT", strSLXConstr)
                i = i + 1
                AddEditPRODUCT(row, row("PRODUCTID"))
                '=================================================================================================
                ' Aug 7, 2015 put in measurese to Notify Team if more than 20K Changes are being processed
                '=================================================================================================
                If i = CInt(My.Settings.MaxProductChanges) Then
                    strReport = "<style>body{font-family: Verdana, Arial, Helvetica, sans-serif} td{font-weight: 550}</style>"
                    strReport = strReport & " <body>"
                    strReport = strReport & " <center><font size=+3 color=#000099>Product Sync Issue Suspected</font><br><font size=-2 color=#0000CC>" & Now.ToString & "</font></center>"
                    strReport = strReport & " Product Sync has Process over the number of threshold number of changes there maybe a problem and this should be looked into and the processed stopped to ensure a large sync is not pushed out.<br><br>"
                    strReport = strReport & "    <br><sup>*</sup><Font size=-1> Please look into this at your earliest convenience  </font>"
                    strReport = strReport & " </body>"
                    SendSimpleEmail(My.Settings.SendtoEmails, strReport, "Product Sync Issue Suspected" & Now.ToString(), "")
                    Exit Sub
                End If

                Console.WriteLine("Processes PRODUCT Changed" & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "PRODUCT Changes ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Private Sub SendSimpleEmail(ByVal EmailAddress As String, ByVal HtmlBody As String, ByVal Subject As String, ByVal AttachmentPath As String)
        '============================================================
        ' GET Mail  CREDENTIALS
        '============================================================

        'tmpRecpient.Email 
        'Send Email 
        Dim MyMailMessage As New System.Net.Mail.MailMessage()

        'From requires an instance of the MailAddress type"

        MyMailMessage.From = New System.Net.Mail.MailAddress(My.Settings.smtpUser, "EAB Notifications")

        ' Add Read Reciept Headers
        '============================================================================================================
        '
        'MyMailMessage.Headers.Add("Disposition-Notification-To", "<jaymeh@xitechnologies.com>")
        '-------------------------------------------------------------------------------------------------------------

        MyMailMessage.To.Add(EmailAddress)
        MyMailMessage.Subject = Subject


        MyMailMessage.Body = HtmlBody
        MyMailMessage.IsBodyHtml = True

        If AttachmentPath <> "" Then
            MyMailMessage.Attachments.Add(New System.Net.Mail.Attachment(AttachmentPath))
        End If
        '=========================================================================================================
        ' Send the Email
        '=========================================================================================================
        Dim SMTPServer As New System.Net.Mail.SmtpClient()
        SMTPServer.UseDefaultCredentials = False
        SMTPServer.Port = Convert.ToInt32(My.Settings.smtpPort)
        'Hard Coded Server Port
        SMTPServer.Host = My.Settings.smtpHost
        SMTPServer.Credentials = New System.Net.NetworkCredential(My.Settings.smtpUser, My.Settings.smtpPassword)
        SMTPServer.EnableSsl = True

        Try

            SMTPServer.Send(MyMailMessage)
            'MessageBox.Show(ex.Message)
        Catch ex As Exception
            Console.WriteLine(ex.Message)
        End Try

    End Sub



    Private Sub Process_CleanUPDuplicates()

        Dim i As Integer = 0
        Dim MasItemKey As String
        Dim WareHouseId As String
        Dim CompanyId As String

        '===================================================

        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "Select distinct MASITEMKEY , WAREHOUSEID , COMPANYID  from sysdba.PRODUCT   "

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows

                i = i + 1
                MasItemKey = row("MASITEMKEY").ToString
                WareHouseId = row("WAREHOUSEID").ToString
                CompanyId = row("COMPANYID").ToString

                Call ProcessMASItem(MasItemKey, WareHouseId, CompanyId)

                Console.WriteLine("Clean Item " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "CleanUp ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Public Sub ProcessMASItem(ByVal MasItemKey As String, ByVal WareHouseId As String, ByVal CompanyId As String)

        Dim i As Integer = 0

        Dim toKeepProductid As String = ""
        Dim Productid As String = ""

        Dim objConn As New OleDbConnection(strSLXNativeConstr)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "SELECT * FROM  sysdba.PRODUCT WHERE     (MASITEMKEY = '" & MasItemKey & "') AND (WAREHOUSEID = '" & WareHouseId & "') AND (COMPANYID = '" & CompanyId & "')" ' sql you want to execute

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows

                If i = 0 Then
                    '=====================
                    ' Keep the First One
                    '=====================
                    toKeepProductid = row("PRODUCTID").ToString
                Else
                    '============================
                    ' Remove the Rest of them
                    '============================
                    Productid = row("PRODUCTID").ToString
                    SQL = " Update sysdba.STOCKCARDITEMS Set PRODUCTID ='" & toKeepProductid & "' WHERE PRODUCTID ='" & Productid & "'"
                    ExecuteSQLQuery(SQL)
                    'UpdateStockCardItems(Productid, toKeepProductid)

                    '===============================
                    ' SalesOrderItems
                    '===============================
                    SQL = " Update sysdba.SALESORDERITEMS Set PRODUCTID ='" & toKeepProductid & "' WHERE PRODUCTID ='" & Productid & "'"
                    ExecuteSQLQuery(SQL)

                    '===============================
                    ' product Program
                    '===============================
                    'Call Delete_ProductProgram(Productid)

                    '======================================
                    ' Delete Product
                    '=======================================
                    Call Delete_Product(Productid)


                End If

                i = i + 1

                Console.WriteLine("Clean Item " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Call LogErrors(PROJECTNAME, "CleanUp ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub

    Sub ExecuteSQLQuery(ByVal SQL As String)
        Dim objConn As New OleDbConnection(strSLXConstr)

        Try
            objConn.Open()

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)

            objCMD.ExecuteNonQuery()
        Catch ex As Exception
            'MsgBox(ex.Message)
            'Call LogErrors(PROJECTNAME, "CleanUp ", ex.Message, EventLogEntryType.Error)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
    End Sub
    'Sub UpdateStockCardItems(ByVal OldProductid As String, ByVal NewProductid As String)
    '    '=======================
    '    'Retrieving a recordset:
    '    '=======================
    '    Dim objConn As New ADODB.Connection()
    '    Dim objRS As New ADODB.Recordset
    '    Dim strSQL As String = "SELECT * FROM sysdba.StockCardItems WHERE PRODUCTID = '" & OldProductid & "'"


    '    Try
    '        objConn.Open(strSLXConstr)
    '        With objRS
    '            .CursorLocation = ADODB.CursorLocationEnum.adUseClient
    '            .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
    '            .LockType = ADODB.LockTypeEnum.adLockOptimistic
    '            .Open(strSQL, objConn)
    '            For i = 0 To .RecordCount - 1          ' Loop
    '                If Not (.EOF) Then
    '                    .Fields("PRODUCTID").Value = NewProductid
    '                    .Fields("MODIFYDATE").Value = Now
    '                    .Fields("MODIFYUSER").Value = "ADMIN"

    '                    .Update()

    '                    .MoveNext()



    '                End If

    '            Next


    '            .Close()
    '        End With


    '    Catch ex As Exception
    '        'MsgBox(ex.Message)

    '    End Try

    'End Sub
    Public Sub Delete_Product(ByVal Productid As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM sysdba.PRODUCT WHERE PRODUCTID = '" & Productid & "'"


        Try
            objConn.Open(strSLXConstr)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If Not (.EOF) Then
                    .Delete()




                End If


                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try
    End Sub


    'Private Sub CleanTempDir()


    '    Dim sql As String = "Truncate table dbo.tmpX3SalesOrderItems"
    '    Dim strConnection As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
    '    Using conn As New SqlConnection(strConnection)
    '        Dim cmd As New SqlCommand(sql, conn)

    '        Try
    '            conn.Open()
    '            cmd.ExecuteNonQuery()
    '        Catch ex As Exception
    '            Call LogErrors(PROJECTNAME, " - Main", ex.Message, EventLogEntryType.Error)
    '            Console.WriteLine(ex.Message)
    '        Finally
    '            If conn.State = ConnectionState.Open Then
    '                conn.Close()
    '            End If
    '        End Try
    '    End Using


    'End Sub

    'Private Sub GetSourceData()
    '    Dim X3connectionString As String = CleanBulkLoadNativeSQLConnectionString(strSageX3Constr)
    '    Dim SLXConnectionString As String = CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
    '    Dim strSourceSQL As String
    '    strSourceSQL = "SELECT     SO.ZMAGID_0 , SIH.AMTNOTL_0, SIH.AMTTAX_0, SIH.TAX_0, SIH.BPR_0 AS BPCUSTNUM, SID.INVDAT_0 AS INVDATE, SID.NUM_0 AS INVOICE, "
    '    strSourceSQL = strSourceSQL & "             SID.SOHNUM_0 AS SALESORDER, PRD.ITMREF_0 AS ITEMNO, PRD.TCLCOD_0 AS PRDCATG, SID.SALFCY_0 AS LOC, SID.QTY_0 AS QTYSOLD, "
    '    strSourceSQL = strSourceSQL & "               SID.GROPRI_0 AS SALESAMT, SID.CPRPRI_0 AS COSTAMT, SID.PFM_0 AS GROSSMARGIN, SID.PFM_0 / (CASE GROPRI_0 WHEN 0 THEN 1 ELSE GROPRI_0 END) "
    '    strSourceSQL = strSourceSQL & "               * 100 AS PERCENTMARGIN, CAST(SIH.ROWID AS VARCHAR(32)) + '-' + CAST(SID.ROWID AS VARCHAR(32)) AS X3ID, CAST(SIH.BPR_0 AS varchar(32)) "
    '    strSourceSQL = strSourceSQL & "               + '-' + CAST(SIV.BPAADD_0 AS Varchar(32)) AS X3BPCustAddrId, SIV.BPAADD_0, BPA.BPAADDLIG_0, BPA.BPAADDLIG_1, BPA.BPAADDLIG_2, BPA.POSCOD_0, "
    '    strSourceSQL = strSourceSQL & " BPA.CTY_0, BPA.SAT_0, BPA.CRY_0"
    '    strSourceSQL = strSourceSQL & " FROM         LIVE.SORDER AS SO RIGHT OUTER JOIN"
    '    strSourceSQL = strSourceSQL & "               LIVE.SINVOICED AS SID ON SO.SOHNUM_0 = SID.SOHNUM_0 RIGHT OUTER JOIN"
    '    strSourceSQL = strSourceSQL & "               LIVE.SINVOICE AS SIH ON SID.NUM_0 = SIH.NUM_0 LEFT OUTER JOIN"
    '    strSourceSQL = strSourceSQL & "               LIVE.SINVOICEV AS SIV ON SIH.NUM_0 = SIV.NUM_0 LEFT OUTER JOIN"
    '    strSourceSQL = strSourceSQL & "               LIVE.BPADDRESS AS BPA ON BPA.BPANUM_0 = SIH.BPR_0 AND BPA.BPAADD_0 = SIV.BPAADD_0 LEFT OUTER JOIN"
    '    strSourceSQL = strSourceSQL & "               LIVE.ITMMASTER AS PRD ON PRD.ITMREF_0 = SID.ITMREF_0"
    '    strSourceSQL = strSourceSQL & "  WHERE(SID.GROPRI_0 Is Not NULL)"

    '    ' get the source data
    '    '=================================================================


    '    Using sourceConnection As New SqlConnection(X3connectionString)
    '        Dim myCommand As New SqlCommand(strSourceSQL, sourceConnection)
    '        sourceConnection.Open()
    '        Dim reader As SqlDataReader = myCommand.ExecuteReader()

    '        ' open the destination data
    '        Using destinationConnection As New SqlConnection(SLXConnectionString)
    '            ' open the connection
    '            destinationConnection.Open()

    '            Using bulkCopy As New SqlBulkCopy(destinationConnection.ConnectionString)
    '                bulkCopy.BatchSize = 500
    '                bulkCopy.NotifyAfter = 1000
    '                ' bulkCopy.SqlRowsCopied += New SqlRowsCopiedEventHandler(bulkCopy_SqlRowsCopied)
    '                bulkCopy.DestinationTableName = "tmpX3SalesOrderItems"
    '                bulkCopy.WriteToServer(reader)
    '            End Using
    '        End Using
    '        reader.Close()
    '    End Using
    'End Sub



End Module
