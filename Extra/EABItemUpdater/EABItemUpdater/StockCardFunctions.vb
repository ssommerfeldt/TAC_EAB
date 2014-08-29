﻿Imports System.Data.OleDb

Module StockCardFunctions

    Sub AddEditSalesOrderItemFromStockCardItem(MyDataRow As DataRow, ByVal strConnection As String, ByVal LineNumber As String, ByVal Accountid As String)

        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        'Dim MyDataRow As DataRow = GetDetailsFromStockCard(StockCardItemId, strConnection)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM SALESORDERITEMS WHERE SALESORDERID = 'TEMP' AND PRODUCTID ='" & MyDataRow("PRODUCTID") & "' AND TACACCOUNTID = '" & Accountid & "'"

        '=================================================================
        ' TAC Calculations
        '=================================================================
        Dim Discount As Double = CDbl(MyDataRow("MARGIN")) 'GetDefaultMargin(MyDataRow("TACSTOCKCARDITEMID"), MyDataRow("TIMPRODPRICEGROUPID"), MyDataRow("TACACCOUNTID"), strConnection)
        Dim ListPrice As Double = CDbl(MyDataRow("LISTPRICE")) 'Convert.ToDouble(GetField("LISTPRICE", "vProductPriceSheet", "PRODUCTID ='" & MyDataRow("PRODUCTID") & "'", strConnection))
        Dim CalculatedPrice As Decimal = CDec(MyDataRow("DEALERPRICE")) 'CalculateAdjustedPrice(ListPrice, Discount)
        ' //Extended price = price - (price * discount) * quantity
        Try
            objConn.Open(strConnection)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    'adding
                    .AddNew()
                    .Fields("SALESORDERITEMSID").Value = GetNewSLXID("SALESORDERTIEMS", strConnection) 'Application.BasicFunctions.GetIDFor("SALESORDERITEMS")
                    .Fields("SALESORDERID").Value = "TEMP"
                    .Fields("CREATEUSER").Value = "ADMIN"
                    .Fields("CREATEDATE").Value = Now 'System.DateTime.UtcNow
                    .Fields("MODIFYUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("PRODUCT").Value = MyDataRow("PRODUCT")
                    '.Fields("PROGRAM").Value = ""
                    .Fields("PRICE").Value = ListPrice  '===============TAC Calculated
                    .Fields("QUANTITY").Value = "0"
                    .Fields("DISCOUNT").Value = Discount  '============= TAC Calculated
                    .Fields("FAMILY").Value = MyDataRow("FAMILY")
                    '.Fields("OPPPRODUCTID").Value = ""
                    .Fields("PRODUCTID").Value = MyDataRow("PRODUCTID")
                    .Fields("ACTUALID").Value = MyDataRow("ACTUALID")
                    .Fields("DESCRIPTION").Value = MyDataRow("DESCRIPTION")
                    .Fields("EXTENDEDPRICE").Value = "0"  '========== TAC Calculated Allways Zero Intially because there is no Quantity
                    .Fields("UNIT").Value = MyDataRow("UNIT")
                    .Fields("CALCULATEDPRICE").Value = System.Math.Round(CalculatedPrice, 2, MidpointRounding.AwayFromZero) '===========TAC Caclulated
                    '.Fields("GLOBALSYNCID").Value = ""
                    .Fields("LINENUMBER").Value = LineNumber
                    .Fields("LINETYPE").Value = MyDataRow("LINETYPE")
                    '.Fields("SLXLOCATIONID").Value = ""
                    .Fields("UNITOFMEASUREID").Value = MyDataRow("UNITOFMEASUREID")
                    '.Fields("PRICEDETAILDESCRIPTION").Value = ""
                    '.Fields("PRICEDETAILNOTES").Value = ""
                    '.Fields("ITEMLOCKED").Value = ""
                    '.Fields("TICK").Value = ""
                    '.Fields("APPID").Value = ""
                    '.Fields("COMMODITYTYPE").Value = ""
                    .Fields("UPC").Value = MyDataRow("UPC")
                    .Fields("MAX_STOCKLEVEL").Value = MyDataRow("MAX_STOCKLEVEL")
                    '.Fields("ORIGPRODUCTPRICE").Value = ""
                    '.Fields("ORIGPRODUCTDISCOUNT").Value = ""
                    .Fields("TACACCOUNTID").Value = MyDataRow("TACACCOUNTID") ' rEMOVING THIS FIELD AS IT IS NOT NEEDED
                    .Fields("ACCOUNTID").Value = MyDataRow("TACACCOUNTID")
                    .Fields("TACSTOCKCARDITEMID").Value = MyDataRow("TACSTOCKCARDITEMID")

                    .Fields("ORIGPRODUCTPRICE").Value = MyDataRow("ORIGPRODUCTPRICE") 'ssommerfeldt February 24, 2014
                    .Fields("ORIGPRODUCTDISCOUNT").Value = MyDataRow("ORIGPRODUCTDISCOUNT") ' ssommerfeldt February 24, 2014

                  

                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("SALESORDERITEMSID").Value = Application.BasicFunctions.GetIDFor("SALESORDERITEMS")
                    .Fields("SALESORDERID").Value = "TEMP"
                    '.Fields("CREATEUSER").Value = ""
                    '.Fields("CREATEDATE").Value = ""
                    .Fields("MODIFYUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now 'System.DateTime.UtcNow
                    .Fields("PRODUCT").Value = MyDataRow("PRODUCT")
                    '.Fields("PROGRAM").Value = ""
                    .Fields("PRICE").Value = ListPrice  '===============TAC Calculated
                    .Fields("QUANTITY").Value = "0"
                    .Fields("DISCOUNT").Value = Discount  '============= TAC Calculated
                    .Fields("FAMILY").Value = MyDataRow("FAMILY")
                    '.Fields("OPPPRODUCTID").Value = ""
                    .Fields("PRODUCTID").Value = MyDataRow("PRODUCTID")
                    .Fields("ACTUALID").Value = MyDataRow("ACTUALID")
                    .Fields("DESCRIPTION").Value = MyDataRow("DESCRIPTION")
                    .Fields("EXTENDEDPRICE").Value = "0"  '========== TAC Calculated Allways Zero Intially because there is no Quantity
                    .Fields("UNIT").Value = MyDataRow("UNIT")
                    .Fields("CALCULATEDPRICE").Value = System.Math.Round(CalculatedPrice, 2, MidpointRounding.AwayFromZero) '===========TAC Caclulated
                    '.Fields("GLOBALSYNCID").Value = ""
                    .Fields("LINENUMBER").Value = LineNumber
                    .Fields("LINETYPE").Value = MyDataRow("LINETYPE")
                    '.Fields("SLXLOCATIONID").Value = ""
                    .Fields("UNITOFMEASUREID").Value = MyDataRow("UNITOFMEASUREID")
                    '.Fields("PRICEDETAILDESCRIPTION").Value = ""
                    '.Fields("PRICEDETAILNOTES").Value = ""
                    '.Fields("ITEMLOCKED").Value = ""
                    '.Fields("TICK").Value = ""
                    '.Fields("APPID").Value = ""
                    '.Fields("COMMODITYTYPE").Value = ""
                    .Fields("UPC").Value = MyDataRow("UPC")
                    .Fields("MAX_STOCKLEVEL").Value = MyDataRow("MAX_STOCKLEVEL")
                    '.Fields("ORIGPRODUCTPRICE").Value = ""
                    '.Fields("ORIGPRODUCTDISCOUNT").Value = ""
                    .Fields("TACACCOUNTID").Value = MyDataRow("TACACCOUNTID")
                    .Fields("ACCOUNTID").Value = MyDataRow("TACACCOUNTID")
                    .Fields("TACSTOCKCARDITEMID").Value = MyDataRow("TACSTOCKCARDITEMID")

                    .Fields("ORIGPRODUCTPRICE").Value = MyDataRow("ORIGPRODUCTPRICE") 'ssommerfeldt February 24, 2014
                    .Fields("ORIGPRODUCTDISCOUNT").Value = MyDataRow("ORIGPRODUCTDISCOUNT") ' ssommerfeldt February 24, 2014

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try


    End Sub

    Function CalculateAdjustedPrice(ByVal price As Decimal, ByVal Discount As Decimal) As Decimal
        'Adjusted Price = price - (price * discount)
        'Dim price As Decimal = 0D

        'price = If((ListPrice = 0.0), (If(salesOrderItem.CalculatedPrice.HasValue, salesOrderItem.CalculatedPrice.Value, 0D)), (If(salesOrderItem.Price.HasValue, CDec(salesOrderItem.Price.Value), CDec(0.0))))
        'price = (decimal)salesOrderItem.Price;
        Return If(New System.Nullable(Of Decimal)(Math.Round(CDec(price - (price * Discount)), 2, MidpointRounding.AwayFromZero)), 0D)
    End Function


    Function GetDetailsFromStockCard(ByVal StockCardItemID, ByVal strConn) As DataRow
        Dim objConn As New OleDbConnection(strConn)
        Dim returnDataRow As DataRow
        Try
            objConn.Open()
            Dim SQL As String
            SQL = "  SELECT     sci.STOCKCARDITEMSID, 'TEMP' AS SALESORDERID, p.NAME AS PRODUCT,  sci.CATEGORYNAME as FAMILY, sci.PRODUCTID, p.ACTUALID, p.DESCRIPTION, p.UNIT, "
            SQL = SQL & " 'StandarLine' AS LINETYPE, p.UNITOFMEASUREID, p.UPC, ISNULL(sci.MAX_STOCKLEVEL, 0) AS MAX_STOCKLEVEL, "
            SQL = SQL & "                     sci.ACCOUNTID AS TACACCOUNTID, sci.STOCKCARDITEMSID AS TACSTOCKCARDITEMID, "
            SQL = SQL & "                     sysdba.TIMPRODPRICEGROUP.TIMPRODPRICEGROUPID"
            SQL = SQL & " FROM         sysdba.STOCKCARDITEMS AS sci INNER JOIN"
            SQL = SQL & "                      sysdba.PRODUCT AS p ON sci.PRODUCTID = p.PRODUCTID INNER JOIN"
            SQL = SQL & "                      sysdba.TIMPRODPRICEGROUP ON p.MASPRODPRICEGROUPKEY = sysdba.TIMPRODPRICEGROUP.ProdPriceGroupKey"
            SQL = SQL & " WHERE     (sci.STOCKCARDITEMSID = '" & StockCardItemID & "')"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())
            ' There is only One Row but this seemed like the easiest way to get a Data Row.
            For Each row As DataRow In dt.Rows
                returnDataRow = row
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Dim EventMessage As String
            EventMessage = ex.Message & Chr(10) & Chr(13) & "In ProcessSingleAccount"
            WriteStatusLog(EventMessage)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing

        Return returnDataRow
    End Function

    Sub GetAccountInfo(ByVal Accountid As String, ByRef CustomerId As String, ByRef CompanyCode As String, ByRef AcctMgrDefatultMASCOMPANYID As String, ByVal slxConnectionString As String)
        Dim objConn As New OleDbConnection(slxConnectionString)
        Dim Sql As String
        Sql = "SELECT     sysdba.ACCOUNT.ACCOUNTID, sysdba.ACCOUNT.MASCUSTKEY, sysdba.ACCOUNTFINANCIAL.COMPANYCODE, "
        Sql = Sql & "                      sysdba.ACCOUNTFINANCIAL.CUSTOMERID, sysdba.USERSECURITY.MASCOMPANYID as AcctMgr_MASCOMPANYID"
        Sql = Sql & " FROM         sysdba.ACCOUNT INNER JOIN"
        Sql = Sql & "                      sysdba.ACCOUNTFINANCIAL ON sysdba.ACCOUNT.ACCOUNTID = sysdba.ACCOUNTFINANCIAL.ACCOUNTID LEFT OUTER JOIN"
        Sql = Sql & "                      sysdba.USERSECURITY ON sysdba.ACCOUNT.ACCOUNTMANAGERID = sysdba.USERSECURITY.USERID"
        Sql = Sql & " WHERE     (sysdba.ACCOUNT.ACCOUNTID = '" & Accountid & "')"

        Dim x As Integer = 0
        Try
            objConn.Open()
            Dim objCMD As OleDbCommand = New OleDbCommand(Sql, objConn)
            Dim objReader As OleDbDataReader = objCMD.ExecuteReader()
            If objReader.HasRows Then
                Do While objReader.Read()
                    AcctMgrDefatultMASCOMPANYID = objReader.GetString(4)
                    CustomerId = objReader.GetString(3)
                    CompanyCode = objReader.GetString(2)

                Loop
            Else


            End If
            objReader.Close()
        Catch ex As Exception
            Dim EventMessage As String
            EventMessage = ex.Message & Chr(10) & Chr(13) & "In Function " & "GetAccountInfo"
            WriteToEventLog(EventMessage, , Diagnostics.EventLogEntryType.Error)
            'MsgBox(ex.Message)
        Finally
            If objConn.State = Data.ConnectionState.Open Then objConn.Close()
        End Try
    End Sub

    Function GetDefaultMargin(ByVal stockcarditemsId As String, ByVal TIMPRODCATEGORYID As String, ByVal AccountId As String, ByVal strSLXConnectionString As String) As Double

        Dim dbltmpMargin As Double
        Dim tmpDefaultMasterWhse As String
        Dim ProdCategoryID As String = GetField("Isnull(ProdPriceGroupID,'')", "TIMPRODPRICEGROUP", "TIMPRODPRICEGROUPID='" & TIMPRODCATEGORYID & "'", strSLXConnectionString)

        'dbltmpMargin = GetField<decimal>("IsNull(PctAdj,'0')", "vNationalAccountMargin", "CustID='" + Account.AccountFinancial.CustomerId + "' AND CompanyID ='" + Account.AccountFinancial.Companycode + "' AND  ProdPriceGroupID=' " + ProdCategoryID + "'");
        Dim CustomerId As String
        Dim CompanyCode As String
        Dim AcctMgrDefatultMASCOMPANYID As String
        GetAccountInfo(AccountId, CustomerId, CompanyCode, AcctMgrDefatultMASCOMPANYID, strSLXConnectionString)

        dbltmpMargin = GetDefaultNationalPricingMargin(CustomerId, CompanyCode, TIMPRODCATEGORYID, strSLXConnectionString)
        If dbltmpMargin = 0 Then
            'No National Pricing Exists
            '========================================================================
            ' Try to get Distributor  Dealer  Default Pricing
            '========================================================================
            dbltmpMargin = GetDefaultDealerDistributorPricingMargin(CustomerId, CompanyCode, ProdCategoryID, strSLXConnectionString)
            If dbltmpMargin = 0 Then
                ' Try to get Default pricing...
                tmpDefaultMasterWhse = GetField("MASTERWAREHOUSE", "MASMASTERWAREHOUSE", "COMPANYID ='" & AcctMgrDefatultMASCOMPANYID & "'", strSLXConnectionString)
                'dbltmpMargin = GetField<decimal>("Isnull(PctAdj,'0')", "vDefaultPriceGroupMargin", "ProdPriceGroupID = '" + ProdCategoryID + "' AND WhseID = '" + tmpDefaultMasterWhse + "'");


                dbltmpMargin = GetDefaultProductProgramMargin(ProdCategoryID, tmpDefaultMasterWhse, strSLXConnectionString)
            End If
            If dbltmpMargin = 0 Then
                Return 0
            Else
                ' Found
                Return Convert.ToDouble(dbltmpMargin)



            End If
        Else

            'National pricing Found
            Return Convert.ToDouble(dbltmpMargin)
        End If
    End Function

    Public Function GetField(ByVal Field As String, ByVal Table As String, ByVal Where As String, ByVal SlxConnectionString As String) As String
        Dim sql As String = String.Format("select {0} from {1} where {2}", Field, Table, (If(Where.Equals(String.Empty), "1=1", Where)))

        Using conn As New OleDbConnection(SlxConnectionString)
            conn.Open()
            Using cmd As New OleDbCommand(sql, conn)
                Dim fieldval As String = cmd.ExecuteScalar()
                If IsDBNull(fieldval) Then
                    Return Nothing

                Else
                    Return fieldval
                End If

            End Using
        End Using
    End Function

    Function GetDefaultNationalPricingMargin(ByVal CustomerId As String, ByVal CompanyID As String, ByVal ProdPriceGroupID As String, ByVal strSLXConnectionString As String) As Double
        'dbltmpMargin = GetField<decimal>("IsNull(PctAdj,'0')", "vNationalAccountMargin", "CustID='" + Account.AccountFinancial.CustomerId + "' AND CompanyID ='" + Account.AccountFinancial.Companycode + "' AND  ProdPriceGroupID=' " + ProdCategoryID + "'");
        Dim SQL As String = "Select IsNull(PctAdj,'0') as Margin From sysdba.vNationalAccountMargin where CustID='" & Convert.ToString(CustomerId) & "' AND CompanyID ='" & CompanyID & "' AND  ProdPriceGroupID= '" & ProdPriceGroupID & "'"

        Dim returnValue As Double = 0.0
        'Intialzie
        Dim objConn As New OleDbConnection(strSLXConnectionString)

        Try
            objConn.Open()
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim objReader As OleDbDataReader = objCMD.ExecuteReader()
            If objReader.HasRows Then
                Do While objReader.Read()
                    returnValue = objReader.GetDouble(0)

                Loop
            Else


            End If
            objReader.Close()
        Catch ex As Exception
            Dim EventMessage As String
            EventMessage = ex.Message & Chr(10) & Chr(13) & "In Function " & "GetDefaultNationalPricingMargin"
            WriteToEventLog(EventMessage, , Diagnostics.EventLogEntryType.Error)
            'MsgBox(ex.Message)
        Finally
            If objConn.State = Data.ConnectionState.Open Then objConn.Close()
        End Try

        Return returnValue
    End Function

    Function GetDefaultDealerDistributorPricingMargin(ByVal CustomerId As [String], ByVal CompanyID As String, ByVal ProdPriceGroupID As String, ByVal strSLXConnectionString As String) As Double
        'dbltmpMargin = GetField<decimal>("IsNull(PctAdj,'0')", "vNationalAccountMargin", "CustID='" + Account.AccountFinancial.CustomerId + "' AND CompanyID ='" + Account.AccountFinancial.Companycode + "' AND  ProdPriceGroupID=' " + ProdCategoryID + "'");
        Dim SQL As [String] = "Select IsNull(PctAdj,'0') as Margin From sysdba.vDistributorDealerAccountMargin where CustID='" & Convert.ToString(CustomerId) & "' AND CompanyID ='" & CompanyID & "' AND  ProdPriceGroupID= '" & ProdPriceGroupID & "'"

        Dim returnValue As Double = 0.0
        'Intialzie
        Dim objConn As New OleDbConnection(strSLXConnectionString)

        Try
            objConn.Open()
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim objReader As OleDbDataReader = objCMD.ExecuteReader()
            If objReader.HasRows Then
                Do While objReader.Read()
                    returnValue = objReader.GetDouble(0)

                Loop
            Else


            End If
            objReader.Close()
        Catch ex As Exception
            Dim EventMessage As String
            EventMessage = ex.Message & Chr(10) & Chr(13) & "In Function " & "GetDefaultDealerDistributorPricingMargin"
            WriteToEventLog(EventMessage, , Diagnostics.EventLogEntryType.Error)
            'MsgBox(ex.Message)
        Finally
            If objConn.State = Data.ConnectionState.Open Then objConn.Close()
        End Try

        Return returnValue
    End Function

    Function GetDefaultProductProgramMargin(ByVal ProdCategoryID As String, ByVal MasterWhseID As String, ByVal strSLXConnectionString As String) As Double
        'dbltmpMargin = GetField<decimal>("Isnull(PctAdj,'0')", "vDefaultPriceGroupMargin", "ProdPriceGroupID = '" + ProdCategoryID + "' AND WhseID = '" + tmpDefaultMasterWhse + "'");
        Dim SQL As String = "Select IsNull(PctAdj,'0') as Margin From sysdba.vDefaultPriceGroupMargin where ProdPriceGroupID = '" & ProdCategoryID & "' AND WhseID = '" & MasterWhseID & "'"

        Dim returnValue As Double = 0.0
        'Intialzie
        Dim objConn As New OleDbConnection(strSLXConnectionString)

        Try
            objConn.Open()
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim objReader As OleDbDataReader = objCMD.ExecuteReader()
            If objReader.HasRows Then
                Do While objReader.Read()
                    returnValue = objReader.GetValue(0)

                Loop
            Else


            End If
            objReader.Close()
        Catch ex As Exception
            Dim EventMessage As String
            EventMessage = ex.Message & Chr(10) & Chr(13) & "In Function " & "GetDefaultProductProgramMargin"
            WriteToEventLog(EventMessage, , Diagnostics.EventLogEntryType.Error)
            'MsgBox(ex.Message)
        Finally
            If objConn.State = Data.ConnectionState.Open Then objConn.Close()
        End Try

        Return returnValue
    End Function

    Sub AddEditStockCardItem(ByVal SourceStockCardID As String, ByVal TargetAccountid As String, ByVal strSLXConnectionString As String)
        '============================================================
        ' get Default Data row from StockCard and Product info
        '============================================================
        Dim MyDataRow As DataRow = GetCopyStockCard(SourceStockCardID, strSLXConnectionString)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim strSQL As String = "SELECT * FROM STOCKCARDITEMS WHERE ACCOUNTID = '" & TargetAccountid & "' AND PRODUCTID ='" & MyDataRow("PRODUCTID") & "'"

        ' //Extended price = price - (price * discount) * quantity
        Try
            objConn.Open(strSLXConnectionString)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    'adding
                    .AddNew()
                    '.Fields("STOCKCARDITEMSID").Value = Application.BasicFunctions.GetIDFor("STOCKCARDITEMS")
                    .Fields("ACCOUNTID").Value = TargetAccountid
                    '.Fields("CREATEUSER").Value = ""
                    '.Fields("CREATEDATE").Value = ""
                    '.Fields("MODIFYUSER").Value = ""
                    '.Fields("MODIFYDATE").Value = ""
                    .Fields("PRODUCTID").Value = MyDataRow("PRODUCTID")
                    .Fields("MARGIN").Value = MyDataRow("MARGIN")
                    .Fields("TIMPRODCATEGORYID").Value = MyDataRow("TIMPRODCATEGORYID")
                    .Fields("CATEGORYNAME").Value = MyDataRow("CATEGORYNAME")
                    .Fields("ACCOUNTNAME").Value = MyDataRow("ACCOUNTNAME")
                    .Fields("PRODUCTDESCRIPTION").Value = MyDataRow("PRODUCTDESCRIPTION")
                    .Fields("COMPANYID").Value = MyDataRow("COMPANYID")
                    .Fields("SECCODEID").Value = MyDataRow("SECCODEID")
                    .Fields("MAX_STOCKLEVEL").Value = MyDataRow("MAX_STOCKLEVEL")
                    '.Fields("LASTORDER").Value = ""
                    '.Fields("LASTORDER2").Value = ""
                    '.Fields("LASTORDER3").Value = ""
                    '.Fields("LASTORDER4").Value = ""
                    '.Fields("LASTORDER5").Value = ""
                    '.Fields("LASTORDER6").Value = ""
                    '.Fields("LASTORDER7").Value = ""
                    '.Fields("LASTORDER8").Value = ""
                    '.Fields("LASTORDER9").Value = ""
                    '.Fields("LASTORDER10").Value = ""
                    '.Fields("LASTORDER11").Value = ""
                    '.Fields("LASTORDER12").Value = ""
                    .Fields("DISTRIBUTORMARGIN").Value = MyDataRow("DISTRIBUTORMARGIN")
                    .Fields("DISTRIBUTORPRICE").Value = MyDataRow("DISTRIBUTORPRICE")
                    .Fields("LISTPRICE").Value = MyDataRow("LISTPRICE")
                    .Fields("DEALERPRICE").Value = MyDataRow("DEALERPRICE")


                Else
                    '=======================================
                    'updating
                    '=======================================
                    '.Fields("STOCKCARDITEMSID").Value = Application.BasicFunctions.GetIDFor("STOCKCARDITEMS")
                    '.Fields("ACCOUNTID").Value = ""
                    '.Fields("CREATEUSER").Value = ""
                    '.Fields("CREATEDATE").Value = ""
                    .Fields("MODIFYUSER").Value = "ADMIN"
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("PRODUCTID").Value = MyDataRow("PRODUCTID")
                    .Fields("MARGIN").Value = MyDataRow("MARGIN")
                    .Fields("TIMPRODCATEGORYID").Value = MyDataRow("TIMPRODCATEGORYID")
                    .Fields("CATEGORYNAME").Value = MyDataRow("CATEGORYNAME")
                    .Fields("ACCOUNTNAME").Value = MyDataRow("ACCOUNTNAME")
                    .Fields("PRODUCTDESCRIPTION").Value = MyDataRow("PRODUCTDESCRIPTION")
                    .Fields("COMPANYID").Value = MyDataRow("COMPANYID")
                    .Fields("SECCODEID").Value = MyDataRow("SECCODEID")
                    .Fields("MAX_STOCKLEVEL").Value = MyDataRow("MAX_STOCKLEVEL")
                    '.Fields("LASTORDER").Value = ""
                    '.Fields("LASTORDER2").Value = ""
                    '.Fields("LASTORDER3").Value = ""
                    '.Fields("LASTORDER4").Value = ""
                    '.Fields("LASTORDER5").Value = ""
                    '.Fields("LASTORDER6").Value = ""
                    '.Fields("LASTORDER7").Value = ""
                    '.Fields("LASTORDER8").Value = ""
                    '.Fields("LASTORDER9").Value = ""
                    '.Fields("LASTORDER10").Value = ""
                    '.Fields("LASTORDER11").Value = ""
                    '.Fields("LASTORDER12").Value = ""
                    .Fields("DISTRIBUTORMARGIN").Value = MyDataRow("DISTRIBUTORMARGIN")
                    .Fields("DISTRIBUTORPRICE").Value = MyDataRow("DISTRIBUTORPRICE")
                    .Fields("LISTPRICE").Value = MyDataRow("LISTPRICE")
                    .Fields("DEALERPRICE").Value = MyDataRow("DEALERPRICE")

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            ' MsgBox(ex.Message)

        End Try
        '====================================================



    End Sub

    Function GetCopyStockCard(ByVal StockCardItemID, ByVal strConn) As DataRow
        Dim objConn As New OleDbConnection(strConn)
        Dim returnDataRow As DataRow
        Try
            objConn.Open()
            Dim SQL As String
            SQL = "  SELECT     * "
            SQL = SQL & " FROM         sysdba.STOCKCARDITEMS AS sci "
            SQL = SQL & " WHERE     (sci.STOCKCARDITEMSID = '" & StockCardItemID & "')"

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())
            ' There is only One Row but this seemed like the easiest way to get a Data Row.
            For Each row As DataRow In dt.Rows
                returnDataRow = row
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Dim EventMessage As String
            EventMessage = ex.Message & Chr(10) & Chr(13) & "In GetCopyStockCard"
            WriteStatusLog(EventMessage)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing

        Return returnDataRow
    End Function

    Sub ProcessSingleStockCardItem(ByVal StockCardId As String, ByVal LineNumber As String, ByVal strConn As String)


        '====================================================================================
        ' New Functionality to only have a single WareHouse on the StockCard but 
        '  The Order Needs to have all the Products for AccountManagers WareHouses
        '====================================================================================
        Dim Accountid As String = ""

        Dim i As Integer = 0
        strConn = strConn.Replace("Extended Properties=" & Chr(34) & "PORT=1706;LOG=ON;TIMEZONE=NONE;SVRCERT=12345;ACTIVITYSECURITY=OFF" & Chr(34), "Extended Properties=" & Chr(34) & "PORT=1706;LOG=ON;CASEINSENSITIVEFIND=ON;AUTOINCBATCHSIZE=1;SVRCERT=;")
        '===================================================
        'CleanUpExisting(Accountid, strConn)  This causes problems as it is very commmon to have multiple instances of this running at the same time
        '==================================================       
        Dim objConn As New OleDbConnection(strConn)

        Try
            objConn.Open()
            Dim SQL As String
            SQL = "  SELECT     s.STOCKCARDITEMSID, p.PRODUCTID, p.WAREHOUSEID, 'TEMP' AS SALESORDERID, p.NAME AS PRODUCT, s.CATEGORYNAME AS FAMILY, p.ACTUALID, "
            SQL = SQL & "                      p.DESCRIPTION, p.UNIT, 'StandarLine' AS LINETYPE, p.UNITOFMEASUREID, p.UPC, ISNULL(s.MAX_STOCKLEVEL, 0) AS MAX_STOCKLEVEL, "
            SQL = SQL & "                      s.ACCOUNTID AS TACACCOUNTID, s.STOCKCARDITEMSID AS TACSTOCKCARDITEMID, s.DISTRIBUTORMARGIN, s.DISTRIBUTORPRICE, s.LISTPRICE, "
            SQL = SQL & " s.DEALERPRICE, s.MARGIN, s.ORIGPRODUCTPRICE, s.ORIGPRODUCTDISCOUNT"
            SQL = SQL & " FROM         sysdba.USERWHSE INNER JOIN"
            SQL = SQL & " sysdba.SITE ON sysdba.USERWHSE.SITEID = sysdba.SITE.SITEID INNER JOIN"
            SQL = SQL & " sysdba.STOCKCARDITEMS AS s INNER JOIN"
            SQL = SQL & " sysdba.PRODUCT ON s.PRODUCTID = sysdba.PRODUCT.PRODUCTID INNER JOIN"
            SQL = SQL & " sysdba.ACCOUNT ON s.ACCOUNTID = sysdba.ACCOUNT.ACCOUNTID ON sysdba.USERWHSE.USERID = sysdba.ACCOUNT.ACCOUNTMANAGERID INNER JOIN"
            SQL = SQL & "                      sysdba.PRODUCT AS p ON sysdba.PRODUCT.ACTUALID = p.ACTUALID AND sysdba.SITE.SITECODE = p.WAREHOUSEID"
            SQL = SQL & " WHERE     (s.STOCKCARDITEMSID = '" & StockCardId & "') And (USERWHSE.ISDEFAULT = 'T')"


            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'returnDataRow = row


                Accountid = row("TACACCOUNTID")
                'i = GetMaxLineNumber(Accountid, row("WAREHOUSEID"), strConn) + 1

                AddEditSalesOrderItemFromStockCardItem(row, strConn, LineNumber, Accountid)
                Console.WriteLine("Processes line " & i)
            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)
            Dim EventMessage As String
            EventMessage = ex.Message & Chr(10) & Chr(13) & "In ProcessSingleAccount"
            WriteStatusLog(EventMessage)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing



    End Sub
    'Function GetMaxLineNumber(ByVal AccountId As String, ByVal WareHouseId As String, ByVal strConn As String) As Integer


    '    '====================================================================================
    '    ' New Functionality to only have a single WareHouse on the StockCard but 
    '    '  The Order Needs to have all the Products for AccountManagers WareHouses
    '    '====================================================================================
    '    'Dim Accountid As String = ""

    '    Dim i As Integer = 0
    '    strConn = strConn.Replace("Extended Properties=" & Chr(34) & "PORT=1706;LOG=ON;TIMEZONE=NONE;SVRCERT=12345;ACTIVITYSECURITY=OFF" & Chr(34), "Extended Properties=" & Chr(34) & "PORT=1706;LOG=ON;CASEINSENSITIVEFIND=ON;AUTOINCBATCHSIZE=1;SVRCERT=;")
    '    '===================================================
    '    'CleanUpExisting(Accountid, strConn)  This causes problems as it is very commmon to have multiple instances of this running at the same time
    '    '==================================================       
    '    Dim objConn As New OleDbConnection(strConn)
    '    Dim icount As Integer = 0
    '    Try
    '        objConn.Open()
    '        Dim SQL As String
    '        SQL = "  SELECT     COUNT(*) AS NumItems, sysdba.PRODUCT.WAREHOUSEID"
    '        SQL = SQL & " FROM         sysdba.SALESORDERITEMS INNER JOIN "
    '        SQL = SQL & " sysdba.PRODUCT ON sysdba.SALESORDERITEMS.PRODUCTID = sysdba.PRODUCT.PRODUCTID"
    '        SQL = SQL & " WHERE     (sysdba.SALESORDERITEMS.ACCOUNTID = '" & AccountId & "') AND (sysdba.SALESORDERITEMS.SALESORDERID = 'TEMP') and WAREHOUSEID = '" & WareHouseId & "'"
    '        SQL = SQL & " GROUP BY sysdba.PRODUCT.WAREHOUSEID"


    '        'MsgBox(SQL)
    '        Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
    '        Dim dt As New DataTable()
    '        dt.Load(objCMD.ExecuteReader())

    '        For Each row As DataRow In dt.Rows
    '            'returnDataRow = row
    '            icount = CInt(row("NumItems"))


    '        Next row

    '    Catch ex As Exception
    '        'MsgBox(ex.Message)
    '        Dim EventMessage As String
    '        EventMessage = ex.Message & Chr(10) & Chr(13) & "In ProcessSingleAccount"
    '        WriteStatusLog(EventMessage)
    '    Finally
    '        If objConn.State = ConnectionState.Open Then objConn.Close()
    '    End Try
    '    objConn = Nothing

    '    Return icount

    'End Function


End Module
