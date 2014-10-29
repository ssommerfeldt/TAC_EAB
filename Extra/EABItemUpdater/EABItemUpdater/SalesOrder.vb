Imports System.Data.OleDb
Module SalesOrder
    Public Function CreateSalesOrder(ByVal Accountid As String, ByVal stype As String, ByVal strCon As String) As String

        Dim SalesOrderid As String
        SalesOrderid = GetNewSLXID("SALESORDER", strCon) 'Application.BasicFunctions.GetIDFor("SALESORDER")
        Dim Addressid As String = ""
        Dim Shippingid As String = ""
        Dim Contactid As String = ""
        Dim ContactName As String = ""
        Dim SalesOrderBillingId As String = ""
        Dim SalesOrderShippingId As String = ""
        Dim Status As String

        Status = "TEMP DO NOT CHANGE" ''''' VERY IMPORTANT TO SET TO THIS VALUE '''''''
        Dim SeccodeId As String
        SeccodeId = GetField("SECCODEID", "ACCOUNT", "ACCOUNTID='" & Accountid & "'", strCon)
        Dim OrderType As String
        Dim AccountManagerid As String
        AccountManagerid = GetField("ACCOUNTMANAGERID", "ACCOUNT", "ACCOUNTID='" & Accountid & "'", strCon)

        Dim UserWHSEId As String
        Dim PrimaryUserWHSEId As String
        Dim SecondaryUserWHSEId As String

        PrimaryUserWHSEId = GetField("SITEID", "USERWHSE", "(USERID = '" & AccountManagerid & "') AND (ISDEFAULT = 'T')", strCon)
        SecondaryUserWHSEId = GetField("SITEID", "USERWHSE", "(USERID = '" & AccountManagerid & "') AND (ISDEFAULT <> 'T' Or ISDEFAULT Is Null)", strCon)

        'Check if secondary warehouse is valid
        If SecondaryUserWHSEId = "" Then
            SecondaryUserWHSEId = PrimaryUserWHSEId
        End If

        ''//Create a new salesorder from an account StockCardProducts will be Later

        GetAddressinfo(Accountid, Addressid, Shippingid, Contactid, ContactName, strCon)
        SalesOrderBillingId = AddEditSalesOrderAddress(Addressid, SalesOrderid, strCon) ' Create the Billing Address Record
        SalesOrderShippingId = AddEditSalesOrderAddress(Shippingid, SalesOrderid, strCon) ' Create the Billing Address Record


        Select Case stype

            Case "SO"
                OrderType = "Sales Order"
                UserWHSEId = PrimaryUserWHSEId
            Case "TO"
                OrderType = "Transfer Order"
                UserWHSEId = PrimaryUserWHSEId
            Case "PO"
                OrderType = "Purchase Order"
                UserWHSEId = PrimaryUserWHSEId
            Case "RO"
                OrderType = "Return Order"
                UserWHSEId = SecondaryUserWHSEId
            Case "IO"
                OrderType = "Inventory Order"
                UserWHSEId = PrimaryUserWHSEId

        End Select

        Call AddEditSALESORDER(Accountid, SalesOrderid, SalesOrderBillingId, SalesOrderShippingId, Contactid, ContactName, OrderType, Status, SeccodeId, UserWHSEId, AccountManagerid, strCon)
        Call AddEditERPSALESORDER(SalesOrderid, SeccodeId, strCon)


        '
        '            salesOrder.Save();
        '            //ssommerfeldt Remove this functionality as it is too slow for Large stock Cards Oct 31, 2013
        '            //if (!String.IsNullOrEmpty(type) && type == "SO") {
        '            //    //Add stock card products
        '            //    salesOrder.AddStockcardProducts();
        '            //}
        '
        '            //return the new id
        '            result = salesOrder.Id.ToString();
        '
        Return SalesOrderid
    End Function
    Sub GetAddressinfo(ByVal Accountid As String, ByRef Addressid As String, ByRef Shippingid As String, ByRef Contactid As String, ByRef ContactName As String, ByVal strCon As String)

        Dim strSQL As String

        strSQL = "SELECT     ADDRESSID, SHIPPINGID, CONTACTID, ISNULL(FIRSTNAME, '') + ', ' + ISNULL(LASTNAME, '') AS Name "
        strSQL = strSQL & " FROM         sysdba.CONTACT "
        strSQL = strSQL & " WHERE     (ISPRIMARY = 'T') AND (ACCOUNTID = '" & Accountid & "')"

        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset

        '=================================================================
        ' TAC Calculations
        '=================================================================

        Try
            objConn.Open(strCon)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                For i = 0 To .RecordCount - 1 ' Loop
                    If Not (.BOF And .EOF) Then ' Check not at end/beginning
                        Addressid = .Fields("ADDRESSID").Value
                        Shippingid = .Fields("SHIPPINGID").Value
                        Contactid = .Fields("CONTACTID").Value
                        ContactName = .Fields("Name").Value

                        .MoveNext() ' Move to next record
                    End If
                Next
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try


        
    End Sub

    Function GetAddressDetail(ByVal Addressid As String, ByVal strcon As String) As DataRow
        Dim objConn As New OleDbConnection(strcon)
        Dim ReturnDataRow As DataRow
        Try
            objConn.Open()
            Dim SQL As String



            '===================================================================
            ' Get Source Rescord Set
            '===================================================================
            SQL = "Select * From ADDRESS Where ADDRESSID='" & Addressid & "'" ' sql you want to execute
            'objRSSource.Open(strSQLSource, objSLXDB.Connection) ' Open a connection, execute SQL and name it objRS
            'If (objRSSource.BOF) Then
            '    '  Blank RecordSet So Exit
            '    objRSSource.Close()
            '    objRSSource = Nothing
            '    objSLXDB = Nothing
            '    On Error GoTo 0
            '    Exit Function
            'End If
            '====================================================================

            'MsgBox(SQL)
            Dim objCMD As OleDbCommand = New OleDbCommand(SQL, objConn)
            Dim dt As New DataTable()
            dt.Load(objCMD.ExecuteReader())

            For Each row As DataRow In dt.Rows
                'returnDataRow = row

                ReturnDataRow = row

            Next row

        Catch ex As Exception
            'MsgBox(ex.Message)

        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
        Return ReturnDataRow
    End Function

    Function AddEditSalesOrderAddress(ByVal Addressid As String, ByVal SalesOrderId As String, ByVal strCon As String)



        Dim SalesOrderAddressId As String
        SalesOrderAddressId = GetNewSLXID("SALESORDERADDRESS", strCon) 'Application.BasicFunctions.GetIDFor("SALESORDERADDRESS")

        Dim myDataRow As DataRow
        myDataRow = GetAddressDetail(Addressid, strCon)

        Dim strSQL As String
        strSQL = "Select * From SALESORDERADDRESS Where 1=2" ' sql you want to execute


        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset

        '=================================================================
        ' TAC Calculations
        '=================================================================

        Try
            objConn.Open(strCon)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    .AddNew()
                    .Fields("SALESORDERADDRESSID").Value = SalesOrderAddressId
                    .Fields("SALESORDERID").Value = SalesOrderId
                    .Fields("CREATEUSER").Value = "ADMIN" 'Application.BasicFunctions.CurrentUserID
                    .Fields("CREATEDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN" 'Application.BasicFunctions.CurrentUserID
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("ADDRESS1").Value = myDataRow("ADDRESS1")
                    .Fields("ADDRESS2").Value = myDataRow("ADDRESS2")
                    .Fields("ADDRESS3").Value = myDataRow("ADDRESS3")
                    .Fields("ADDRESS4").Value = myDataRow("ADDRESS4")
                    .Fields("DESCRIPTION").Value = myDataRow("DESCRIPTION")
                    .Fields("CITY").Value = myDataRow("CITY")
                    .Fields("STATE").Value = myDataRow("STATE")
                    .Fields("POSTALCODE").Value = myDataRow("POSTALCODE")
                    .Fields("COUNTY").Value = myDataRow("COUNTY")
                    .Fields("COUNTRY").Value = myDataRow("COUNTRY")
                    .Fields("ADDRESSID").Value = myDataRow("ADDRESSID")
                    .Fields("APPID").Value = myDataRow("APPID")
                    .Fields("GLOBALSYNCID").Value = myDataRow("GLOBALSYNCID")
                    .Fields("TICK").Value = myDataRow("TICK")
                    .Fields("SALUTATION").Value = myDataRow("SALUTATION")
                    .Fields("CREATESOURCE").Value = myDataRow("CREATESOURCE")

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try




        Return SalesOrderAddressId

    End Function


    Sub AddEditERPSALESORDER(ByVal SalesOrderId As String, ByVal SeccodeId As String, strCon As String)
        '=======================
        'Retrieving a recordset:
        '=======================
        '#Include: SLX Database Support, SLX Error Support

        Dim strSQL As String
        strSQL = "Select * From ERPSALESORDER Where SALESORDERID='" & SalesOrderId & "'" ' sql you want to execute
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset

        '=================================================================
        ' TAC Calculations
        '=================================================================

        Try
            objConn.Open(strCon)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                If .EOF Then
                    'adding
                    .AddNew()
                    .Fields("SALESORDERID").Value = SalesOrderId
                    .Fields("CREATEUSER").Value = "ADMIN" 'Application.BasicFunctions.CurrentUserID
                    .Fields("CREATEDATE").Value = Now
                    .Fields("MODIFYUSER").Value = "ADMIN" 'Application.BasicFunctions.CurrentUserID
                    .Fields("MODIFYDATE").Value = Now
                    .Fields("SECCODEID").Value = SeccodeId
                    '.Fields("ALLOCATIONSTATUS").Value =
                    '.Fields("DELIVERYSTATUS").Value =""
                    '.Fields("INVOICESTATUS").Value =""
                    '.Fields("STATUSFLAG").Value =""
                    '.Fields("STATUSFLAGTEXT").Value =""
                    '.Fields("CARRIERTRACKING").Value =""
                    '.Fields("REFERENCE").Value =""
                    '.Fields("PRICEDETAIL1").Value =""
                    '.Fields("ERPSTATUS").Value =""
                    '.MoveNext()               ' Move to next record
                Else
                    'DO Nothing as there is allready a record here

                End If

                .UpdateBatch()
                .Close()
            End With


        Catch ex As Exception
            'MsgBox(ex.Message)

        End Try



    End Sub

    Public Sub AddEditSALESORDER(ByVal AccountId As String, ByVal SalesOrderId As String, ByVal BillingId As String, ByVal ShippingId As String, ByVal ContactId As String, ByVal ContactName As String, ByVal sType As String, ByVal status As String, ByVal SeccodeId As String, ByVal UserWHSEId As String, ByVal AccountManagerid As String, strCon As String)
        '=======================
        'Retrieving a recordset:
        '=======================
        '#Include: SLX Database Support, SLX Error Support


        Dim i As Integer
        Dim Discount As Decimal
        If GetField("DEFAULTDISCOUNT", "ACCOUNT", "ACCOUNTID='" & AccountId & "'", strCon) = "" Then
            Discount = 0
        Else
            Discount = GetField("DEFAULTDISCOUNT", "ACCOUNT", "ACCOUNTID='" & AccountId & "'", strCon)
        End If


        Dim strSQL As String
        strSQL = "Select * From SALESORDER Where SalesOrderId= '" & SalesOrderId & "'" ' sql you want to execute
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset

        '=================================================================
        ' TAC Calculations
        '=================================================================


        objConn.Open(strCon)
        With objRS
            .CursorLocation = ADODB.CursorLocationEnum.adUseClient
            .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
            .LockType = ADODB.LockTypeEnum.adLockOptimistic
            .Open(strSQL, objConn)
            If .EOF Then
                'adding
                .AddNew()
                .Fields("ACCOUNTID").Value = AccountId
                .Fields("BILLINGID").Value = BillingId
                .Fields("BILLTONAME").Value = ContactName
                '.Fields("COMMENTS").Value =""
                .Fields("CREATEDATE").Value = Now
                .Fields("CREATEUSER").Value = "ADMIN" 'Application.BasicFunctions.CurrentUserID
                .Fields("CURRENCYCODE").Value = "USD"
                '.Fields("CUSTOMERPURCHASEORDERNUMBER").Value
                '.Fields("DOCUMENTID").Value =""
                '.Fields("FOB").Value =""
                '.Fields("FREIGHT").Value =""
                .Fields("MODIFYDATE").Value = Now
                .Fields("MODIFYUSER").Value = "ADMIN" 'Application.BasicFunctions.CurrentUserID
                '.Fields("OPPORTUNITYID").Value =""
                .Fields("ORDERDATE").Value = Now
                .Fields("ORDERTOTAL").Value = 0
                .Fields("ORDERTYPE").Value = sType
                '.Fields("SALESCOMMISSION").Value =""
                .Fields("SALESORDERID").Value = SalesOrderId
                .Fields("SHIPPINGID").Value = ShippingId
                .Fields("SHIPTONAME").Value = ContactName
                .Fields("SHIPVIA").Value = "FX"
                .Fields("STATUS").Value = status
                .Fields("TAX").Value = 0
                '.Fields("TERMSID").Value =""
                '.Fields("TRADEDISCOUNT").Value =""
                '.Fields("TRANSMITDATE").Value =""
                .Fields("USERID").Value = AccountManagerid
                .Fields("BILLINGCONTACTID").Value = ContactId
                .Fields("SHIPPINGCONTACTID").Value = ContactId
                '.Fields("USERFIELD1").Value =""
                '.Fields("USERFIELD2").Value =""
                '.Fields("USERFIELD3").Value =""
                '.Fields("USERFIELD4").Value =""
                '.Fields("USERFIELD5").Value =""
                '.Fields("USERFIELD6").Value =""
                .Fields("ALTERNATEKEYPREFIX").Value = "TEMP-00-" 'Application.BasicFunctions.GetPrettyKeyPrefix(SalesOrderId)
                .Fields("ALTERNATEKEYSUFFIX").Value = "TEMP" 'Application.BasicFunctions.GetPrettyKeySuffix(SalesOrderId)
                .Fields("ACCOUNTMANAGERID").Value = AccountManagerid
                .Fields("DATEPROMISED").Value = DateAdd("d", 10, CDate(Now)) 'Add 10 days
                .Fields("DISCOUNT").Value = Discount '0
                '.Fields("EXCHANGERATE").Value =""
                '.Fields("EXCHANGERATEDATE").Value =""
                .Fields("EXCHANGERATELOCKED").Value = "T"
                .Fields("GRANDTOTAL").Value = 0
                '.Fields("REQUESTEDBY").Value =""
                .Fields("SECCODEID").Value = SeccodeId
                '.Fields("GLOBALSYNCID").Value =""
                '.Fields("APPID").Value =""
                '.Fields("TICK").Value =""
                .Fields("ACTIVEFLAG").Value = "T"
                '.Fields("PRICELISTID").Value =""
                '.Fields("DUEDATE").Value =""
                '.Fields("OPERATINGCOMPID").Value =""
                .Fields("ISQUOTE").Value = "F"
                '.Fields("DISCOUNTTOTAL").Value =""
                '.Fields("TAXTOTAL").Value =""
                '.Fields("CREATESOURCE").Value =""
                '.Fields("WAREHOUSEKEY").Value =""
                .Fields("USERWHSEID").Value = UserWHSEId
                '.Fields("SOURCEWHSEID").Value =""


            End If

            .UpdateBatch()
            .Close()
        End With
    End Sub

End Module
