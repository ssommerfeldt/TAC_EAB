Imports System.Data.OleDb
Imports System.Drawing

Public Class AddEditOrderProduct
    Property _SalesOrderId As String
    Property _AccountId As String
    Property _WareHouseId As String

    Property _OrderType As String
    Property _OriginalProductPrice As Decimal
    Property _OriginalMargin As Decimal
    Property _SpecialKeyPressed As Boolean
    Property _filter As String
    Property _Lookupfilter As String
    Property _SalesOrderItemId As String
    Property _ProductId As String
    Property _CurrencyId As String
    Property _CustomerId As String
    Property _CompanyCode As String
    Property _CustKey As String
    Property _AccountManagerId As String
    Property _CompanyId As String
    Property _ListPrice As Double
    Property _ProductName As String
    Property _CurrentID As String
    Property SlxApplication As SLXCOMInterop.SlxApplication
    Property _LastControlForSearch As String

    Property mCurrentID() As String
        Get
            Return _CurrentID
        End Get
        Set(ByVal value As String)
            _CurrentID = value
        End Set
    End Property


#Region "Form Controls Area"

    Private Sub AddEditOrderProduct_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        SlxApplication = New SLXCOMInterop.SlxApplication

        _SalesOrderId = _CurrentID
        _OriginalProductPrice = 0
        _OriginalMargin = 0
        _SpecialKeyPressed = False
        lblWarning.Visible = False
        '    'Specify filters by order type
        Debug.WriteLine("Loading Add Edit Salesorderid= " & _SalesOrderId)
        '======================================================================
        _OrderType = GetField("ORDERTYPE", "SALESORDER", " SALESORDERID='" & _SalesOrderId & "'", My.Settings.SLXConnectionString)
        _AccountId = GetField("Accountid", "Salesorder", "Salesorderid ='" & _SalesOrderId & "'", My.Settings.SLXConnectionString)
        _CurrencyId = GetField("Isnull(CURRENCYCODE,'CAD')", "Account", "AccountID = '" & _AccountId & "'", My.Settings.SLXConnectionString)

        _CustomerId = GetField("CustomerId", "AccountFinancial", "AccountId = '" & _AccountId & "'", My.Settings.SLXConnectionString)
        _CompanyCode = GetField("CompanyCode", "AccountFinancial", "AccountId = '" & _AccountId & "'", My.Settings.SLXConnectionString)
        _CustKey = GetField("CustKey", "tarCustomer", "CustID = '" & _CustomerId & "' And CompanyID = '" & _CompanyCode & "'", My.Settings.SLXConnectionString)

        _AccountManagerId = GetField("ACCOUNTMANAGERID", "ACCOUNT", "ACCOUNTID='" & _AccountId & "'", My.Settings.SLXConnectionString)
        _CompanyId = GetField("MASCOMPANYID", "USERSECURITY", "USERID='" & _AccountManagerId & "'", My.Settings.SLXConnectionString)
        _WareHouseId = GetWareHouseId(_SalesOrderId)

        If _OrderType = "Sales Order" Then
            'For Sales Orders restrict by warehouse
            _Lookupfilter = " IN (SELECT PRODUCTID FROM sysdba.PRODUCT WHERE  WAREHOUSEID = '" & _WareHouseId & "'"
            _Lookupfilter = _Lookupfilter & " AND Family <> 'Exchange Returns' AND Family <> 'Bulk Products' AND Status <> 'Deleted' " 'AND  1 = " Don't need the 1=1
            _Lookupfilter = _Lookupfilter & ")"
            'lueProduct.LookupRestrictOp = filter
            'lueSKU.LookupRestrictOp = filter
            'lueUPC.LookupRestrictOp = filter

            '========================================================================
            'pgarratt July 2, 2014 Dealing with Highlighted text after set focus
            '=======================================================================
            ' txtSKU.SetFocus
            '=======================================================================
        End If


        '    ElseIf OrderType = "Return Order" Then
        '        'For Return orders, limit the family and status values, and restrict warehouse
        '        filter = " IN (SELECT PRODUCTID FROM PRODUCT WHERE  WAREHOUSEID = '" & WareHouseId & "'"
        '        filter = filter & " AND Family = 'Exchange Returns' AND Family <> 'Bulk Products' AND Status <> 'Deleted') AND  1 = "
        '        lueProduct.LookupRestrictOp = filter
        '        lueSKU.LookupRestrictOp = filter
        '        lueUPC.LookupRestrictOp = filter
        '        txtUPC.Text = "059511"  ' Prepend since they typcially have to key this number in by hand

        '        '========================================================================
        '        ' ssommerfeldt May 7, 2014 Dealing with Highlighted text after set focus
        '        '=======================================================================
        '        frmAddProduct.txtUPC.SetFocus
        '        Dim objSh
        '    Set objSh = CreateObject("WScript.Shell")
        '    'Example sending TAB key
        '    objSh.SendKeys "{END}", False
        '    Set objSh = Nothing
        '    '=======================================================================

        'ElseIf OrderType = "Transfer Order" Then
        '        'For Transfer orders, limit the family and status values, and restrict warehouse
        '        filter = " IN (SELECT PRODUCTID FROM PRODUCT WHERE  WAREHOUSEID = '" & WareHouseId & "'"
        '        filter = filter & " AND Family <> 'Bulk Products' AND Status <> 'Deleted') AND  1 = "
        '        lueProduct.LookupRestrictOp = filter
        '        lueSKU.LookupRestrictOp = filter
        '        lueUPC.LookupRestrictOp = filter

        '        '========================================================================
        '        'pgarratt July 2, 2014 Dealing with Highlighted text after set focus
        '        '=======================================================================
        '        'txtSKU.SetFocus
        '        '=======================================================================

        '    ElseIf OrderType = "Purchase Order" Then
        '        'For Sales Orders restrict by warehouse
        '        filter = " IN (SELECT PRODUCTID FROM PRODUCT WHERE  WAREHOUSEID = '" & WareHouseId & "'"
        '        filter = filter & " AND Family <> 'Exchange Returns' AND Family <> 'Bulk Products' AND Status <> 'Deleted') AND  1 = "
        '        lueProduct.LookupRestrictOp = filter
        '        lueSKU.LookupRestrictOp = filter
        '        lueUPC.LookupRestrictOp = filter


        '    End If
        '    '================================================
        '    'April 9 2019
        '    '================================================


        Dim useTemplateAccountPricing
        Dim TemplateAccountId
        useTemplateAccountPricing = GetField("Isnull(USEPRICINGTEMPLATEACCOUNT,'F')", "ACCOUNT", "ACCOUNTID='" & _AccountId & "'", My.Settings.SLXConnectionString)
        TemplateAccountId = GetField("PRICINGTEMPLATEACCOUNTID", "ACCOUNT", "ACCOUNTID='" & _AccountId & "'", My.Settings.SLXConnectionString)

        If useTemplateAccountPricing = "T" And TemplateAccountId <> "" Then
            Dim blnCanEdit
            blnCanEdit = False
            If Me.SlxApplication.BasicFunctions.GetMenuSecurity("ToolsManageEABTemplatePricingisOfficeAdmin") = True Or Me.SlxApplication.BasicFunctions.GetMenuSecurity("ToolsManageEABTemplatePricingisManger") Then
                '... Do Something as they have Security
                txtPrice.ReadOnly = False
                txtMargin.ReadOnly = False
            Else
                ' Regular User so no bones
                txtPrice.ReadOnly = True
                txtMargin.ReadOnly = True

            End If
        Else
            '====================================
            ' Not a Tempalte Account So normal
            '====================================
            txtPrice.ReadOnly = False
            txtMargin.ReadOnly = False

        End If



        Me.BringToFront()
        txtSKU.Select()
    End Sub


    Private Sub txtQuantity_TextChanged(sender As Object, e As EventArgs) Handles txtQuantity.TextChanged
        If IsNumeric(txtQuantity.Text) Then
            'Test the textboxes for valid numbers
            If Not IsNumeric(txtPrice.Text) Then
                txtPrice.Text = 0
            End If

            Dim ExtendedPrice
            ExtendedPrice = 0.0 ' Intitialize

            Dim Quantity
            Quantity = CDbl(txtQuantity.Text)
            Dim Price
            Price = RoundUp(CDbl(txtPrice.Text), 2)

            'Use Calculated price instead of list price * margin - will work for all order types
            'ExtendedPrice = RoundUp((ListPrice - (ListPrice * Discount)) * Quantity, 2)
            ExtendedPrice = RoundUp(Price * Quantity, 2)
            txtExtendedPrice.Text = ExtendedPrice

            'Run save and exit if tab or enter pressed
            'If SpecialKeyPressed = True Then

            ''Save the record and clear for new entry
            'cmdSaveClick(sender)
        End If
    End Sub

    Private Sub cmdSearchSKU_Click(sender As Object, e As EventArgs) Handles cmdSearchSKU.Click
        Dim frmSearchByProduct As New frmLookupProduct()
        frmSearchByProduct.cboFilterBy.Text = "SKU"
        frmSearchByProduct.mFilter = _Lookupfilter
        frmSearchByProduct.txtSearchfor.Text = txtSKU.Text
        frmSearchByProduct.GetInfo()
        frmSearchByProduct.StartPosition = FormStartPosition.CenterParent

        If frmSearchByProduct.ShowDialog() = DialogResult.OK Then
            _ProductId = frmSearchByProduct.mProductId
            txtSKU.Text = frmSearchByProduct.mSKU
            If _ProductId <> "" Then
                GetProductInfo(_ProductId)
                txtQuantity.Select()
                'Call CreateRuntimeDataGrid(Productid, dgHistory)
                CreateRunTimeDatagrid()
            End If


        End If
        _LastControlForSearch = "txtSKU"
    End Sub

    Private Sub cmdSearchUPC_Click(sender As Object, e As EventArgs) Handles cmdSearchUPC.Click
        Dim frmSearchByProduct As New frmLookupProduct()
        frmSearchByProduct.cboFilterBy.Text = "UPC"
        frmSearchByProduct.txtSearchfor.Text = txtUPC.Text '"059511" ' Prepend as they typcially would have to type this in anyways
        frmSearchByProduct.mFilter = _Lookupfilter
        frmSearchByProduct.GetInfo()
        frmSearchByProduct.StartPosition = FormStartPosition.CenterParent

        If frmSearchByProduct.ShowDialog() = DialogResult.OK Then
            _ProductId = frmSearchByProduct.mProductId
            txtUPC.Text = frmSearchByProduct.mUPC
            If _ProductId <> "" Then
                GetProductInfo(_ProductId)
                txtQuantity.Select()
                'Call CreateRuntimeDataGrid(Productid, dgHistory)
                CreateRunTimeDatagrid()
            End If


        End If
        _LastControlForSearch = "txtUPC"
    End Sub

    Private Sub txtSKU_Leave(sender As Object, e As EventArgs) Handles txtSKU.Leave
        '==================================================
        ' Set UserOptions Defaults ssommerfeldt 9-18-2014
        '==================================================
        'Call Application.UserOptions.SetAsString("TACAddEditOrderProductDefaultShowFocus", "TAC", "txtSKU", False)


        If txtSKU.Text = "" Then
            Exit Sub ' If it is Blank Then Exit
        End If

        'Clear the product fields before search
        ClearProductInfo()
        'txtUPC.Text = ""
        'lueProduct.Text = ""
        'lueProduct.LookupID = ""
        _ProductId = ""

        ''WareHouseId = GetWareHouseId(txtSalesOrderId.Text) 'load this on form show
        'Dim Productid
        'Dim filter

        ''Specify filters by order type - loaded on form show
        If _OrderType = "Sales Order" Then
            'For Sales Orders restrict by warehouse and do Not Include Returns
            _filter = "ACTUALID = '" & txtSKU.Text & "' AND WAREHOUSEID = '" & _WareHouseId & "'"
            _filter = _filter & " AND Family <> 'Exchange Returns'  AND Status <> 'Deleted'"

            _ProductId = GetField("PRODUCTID", "PRODUCT", _filter, My.Settings.SLXConnectionString)
            'Productid = GetField("PRODUCTID","PRODUCT","ACTUALID = '" & txtSKU.Text & "' AND WAREHOUSEID = '" & WareHouseId & "'")
        End If
        'ElseIf OrderType = "Return Order" Then
        '    'For Return orders, limit the family and status values, and restrict warehouse
        '    filter = "ACTUALID = '" & txtSKU.Text & "' AND WAREHOUSEID = '" & WareHouseId & "'"
        '    filter = filter & " AND Family = 'Exchange Returns' AND Family <> 'Bulk Products' AND Status <> 'Deleted'"

        '    Productid = GetField("PRODUCTID", "PRODUCT", filter)

        'ElseIf OrderType = "Transfer Order" Then
        '    'For Transfer orders, limit the family and status values, and restrict warehouse
        '    filter = "ACTUALID = '" & txtSKU.Text & "' AND WAREHOUSEID = '" & WareHouseId & "'"
        '    filter = filter & " AND Family <> 'Bulk Products' AND Status <> 'Deleted'"

        '    Productid = GetField("PRODUCTID", "PRODUCT", filter)

        'ElseIf OrderType = "Purchase Order" Then
        '    'For Sales Orders restrict by warehouse and do Not Include Returns
        '    filter = "ACTUALID = '" & txtSKU.Text & "' AND WAREHOUSEID = '" & WareHouseId & "'"
        '    filter = filter & " AND Family <> 'Exchange Returns'  AND Status <> 'Deleted'"

        '    Productid = GetField("PRODUCTID", "PRODUCT", filter)

        'End If


        If _ProductId <> "" Then
            _LastControlForSearch = "txtSKU"

            GetProductInfo(_ProductId)
            txtQuantity.Select()
            'Call CreateRuntimeDataGrid(Productid, dgHistory)
            CreateRunTimeDatagrid()
        End If
    End Sub

    Private Sub cmdSave_Click(sender As Object, e As EventArgs) Handles cmdSave.Click
        '===========================================================================================================
        ' Check if Template Pricing Account if so and the Item is not on stockcard. Exit ssommerfeldt April 2019
        '============================================================================================================
        Dim useTemplateAccountPricing
        Dim TemplateAccountId


        useTemplateAccountPricing = GetField("Isnull(USEPRICINGTEMPLATEACCOUNT,'F')", "ACCOUNT", "ACCOUNTID='" & _AccountId & "'", My.Settings.SLXConnectionString)
        TemplateAccountId = GetField("PRICINGTEMPLATEACCOUNTID", "ACCOUNT", "ACCOUNTID='" & _AccountId & "'", My.Settings.SLXConnectionString)
        If useTemplateAccountPricing = "T" And TemplateAccountId <> "" Then
            If lblWarning.Visible = True Then
                ' Item Not on Stockcard
                MsgBox("Template Pricing Accounts Cannot Add Items Not on StockCard")
                Exit Sub
            End If


        End If

        ' UserOptions Set Focus of Controls
        '==================================================================

        'If Me.SlxApplication.UserOptions.Exists("TACAddEditOrderProductDefaultShowFocus", "TAC") Then

        'Else
        '    'Create the Default Option
        '    Call SlxApplication.UserOptions.GetCreateAsString("TACAddEditOrderProductDefaultShowFocus", "TAC", "TAC", "txtSKU") ' Set Default

        'End If
        'Dim defaultShowFocusControl
        'defaultShowFocusControl = SlxApplication.UserOptions.GetAsString("TACAddEditOrderProductDefaultShowFocus", "TAC")
        'If defaultShowFocusControl <> "" Then
        '    'Loop through the Controls and set the Found Control to be the Default
        '    Dim i
        '    On Error Resume Next
        '    For i = 0 To ControlCount - 1
        '        If Controls(i).Name = defaultShowFocusControl Then
        '            Controls(i).SetFocus
        '            Exit For
        '        End If
        '    Next
        'Else
        '    ' Default if none stored
        '    txtSKU.SetFocus
        'End If

        '===================================================================================================
        If ((_ProductId <> "") And (txtQuantity.Text <> "")) Then ' Validate before Saving
            'Check if extended price needs to be calculated - PG 2014-6-12
            'If Not IsNumeric(txtExtendedPrice.Text) Then
            '    MsgBox("Invalid Quantity")
            '    Exit Sub ' get outa here
            'End If
            Dim ExtendedPrice
            ExtendedPrice = 0.0 ' Intitialize

            Dim Quantity
            Quantity = CDbl(txtQuantity.Text)
            Dim Price
            Price = RoundUp(CDbl(txtPrice.Text), 2)

            'Use Calculated price instead of list price * margin - will work for all order types
            'ExtendedPrice = RoundUp((ListPrice - (ListPrice * Discount)) * Quantity, 2)
            ExtendedPrice = RoundUp(Price * Quantity, 2)
            txtExtendedPrice.Text = ExtendedPrice
            'End If
            'AddEditSALESORDERITEM(_SalesOrderItemId)
            AddEditSalesOrderItem(_SalesOrderItemId, txtQuantity.Text, txtListPrice.Text, txtPrice.Text, txtMargin.Text, txtExtendedPrice.Text)
            'don't refresh the main grid to speed things up
            'RefreshMainGrid()
            ClearForm()


        End If

        'SetSalesOrderGrandTotal(txtSalesOrderId.Text)

        'don't refresh the main grids to speed things up, but detail is ok.
        'Call RefreshSODetailView()
        'Me.RaiseSalesLogixCallbackEvent("EAB", "RefreshClient")
        '        
        'SlxApplication.BasicFunctions.ShowDetails("SALESORDER", _SalesOrderId)
        SlxApplication.BasicFunctions.DoInvoke("Function", "View:RefreshCurrent")
        'SlxApplication.BringToFront()
        Me.BringToFront()
        If _LastControlForSearch = "txtSKU" Then
            txtSKU.Select()
        End If
        If _LastControlForSearch = "txtUPC" Then
            txtUPC.Select()
        End If
    End Sub

    Private Sub txtQuantity_KeyPress(sender As Object, e As KeyPressEventArgs) Handles txtQuantity.KeyPress
        Dim tmp As System.Windows.Forms.KeyPressEventArgs = e
        If tmp.KeyChar = ChrW(System.Windows.Forms.Keys.Enter) Then
            '==================
            ' Pressed Enter
            '==================
            cmdSave_Click(sender, e)
        End If
        If tmp.KeyChar = ChrW(System.Windows.Forms.Keys.Tab) Then
            '==================
            ' Pressed Tab Doesn't work
            '==================
            cmdSave_Click(sender, e)
        End If
        If Not IsNumeric(e.KeyChar) AndAlso System.Convert.ToByte(e.KeyChar) <> 8 AndAlso Convert.ToByte(e.KeyChar) <> 45 Then
            e.Handled = True
        End If

    End Sub

    Private Sub txtQuantity_KeyDown(sender As Object, e As KeyEventArgs) Handles txtQuantity.KeyDown
        If e.KeyData = System.Windows.Forms.Keys.Tab Then
            'Debug.WriteLine("Hello tab key")
            '==================
            ' Pressed Tab
            '==================
            cmdSave_Click(sender, e)
        End If
    End Sub

    Private Sub txtQuantity_PreviewKeyDown(sender As Object, e As PreviewKeyDownEventArgs) Handles txtQuantity.PreviewKeyDown
        '==================
        ' Pressed Tab
        '==================
        If e.KeyCode = System.Windows.Forms.Keys.Tab Then
            cmdSave_Click(sender, e)
            '=================================================
            ' This is confusing.  So this is basd on the TAB control
            'so we are setting focus on the Control above as the Tab will contiune and select the contol we want
            ' not ideal but that is how it is behaving.
            '===========================================
            If _LastControlForSearch = "txtSKU" Then
                txtDescription.Select()
            End If
            If _LastControlForSearch = "txtUPC" Then
                txtSKU.Select()
            End If

        End If
    End Sub



#End Region

#Region "Methods"
    Function GetWareHouseId(ByVal SalesOrderId As String) As String
        Dim strSQL As String = ""
        Dim returnValue As String = ""
        strSQL = "SELECT     sysdba.SITE.SITECODE"
        strSQL = strSQL & " FROM         sysdba.SALESORDER INNER JOIN"
        strSQL = strSQL & "                      sysdba.SITE ON sysdba.SALESORDER.USERWHSEID = sysdba.SITE.SITEID"
        strSQL = strSQL & " WHERE     (sysdba.SALESORDER.SALESORDERID = '" & SalesOrderId & "')"

        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim i As Integer = 0

        Try
            objConn.Open(My.Settings.SLXConnectionString)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                For i = 0 To .RecordCount - 1 ' Loop
                    If Not (.BOF And .EOF) Then ' Check not at end/beginning
                        returnValue = .Fields("SITECODE").Value

                        .MoveNext() ' Move to next record
                    End If
                Next
                .Close()
            End With
        Catch ex As Exception
            MsgBox(ex.Message)
            ' Console.WriteLine(ex.Message)

        End Try
        Return returnValue
    End Function

    Sub GetProductInfo(ByVal Productid As String)
        'Stop
        Dim Discount As Double
        Dim ListPrice As Double
        Dim SKU As String
        Dim UPC As String
        Dim MaxStockLevel
        Dim CalculatedPrice As Double
        Dim ExtendedPrice As Double
        Dim stockCardId As String
        Dim ItemKey


        '===========================================
        ' Product Exists on the Existing SalesOrder
        '===========================================
        _SalesOrderItemId = "" 'Clear first the current value if there is any
        _SalesOrderItemId = GetField("SALESORDERITEMSID", "SALESORDERITEMS", " SALESORDERID='" & _SalesOrderId & "' AND PRODUCTID ='" & _ProductId & "'", My.Settings.SLXConnectionString)

        ' ==============================================================
        ' Load the common product information
        ' ==============================================================
        'lueProduct.LookupID = Productid
        txtDescription.Text = GetField("DESCRIPTION", "PRODUCT", "PRODUCTID='" & Productid & "'", My.Settings.SLXConnectionString)
        'lueProduct.Text = GetField("NAME", "PRODUCT", "PRODUCTID='" & Productid & "'")
        txtUPC.Text = GetField("Isnull(UPC,'')", "PRODUCT", "PRODUCTID='" & Productid & "'", My.Settings.SLXConnectionString)
        txtSKU.Text = GetField("Isnull(ACTUALID,'')", "PRODUCT", "PRODUCTID='" & Productid & "'", My.Settings.SLXConnectionString)

        txtStatus.Text = GetField("STATUS", "PRODUCT", "PRODUCTID='" & Productid & "'", My.Settings.SLXConnectionString)

        'Lookup Account info
        'Dim CustKey, CustomerId, CompanyCode

        If txtStatus.Text <> "" Then ' Ensure you check for Nulls
            Select Case UCase(txtStatus.Text)
                Case "ACTIVE"
                    txtStatus.BackColor = Color.Gray  'grey 'rgb(255,255,255) 'white
                    'Font.Bold = False
                    txtStatus.ForeColor = Color.Black  '(RGB(0, 0, 0))'black
                Case "DISCONTINUED"
                    txtStatus.ForeColor = Color.Yellow 'RGB(255, 255, 0) 'yellow
                    'Font.Bold = False
                    txtStatus.ForeColor = Color.Black 'RGB(0, 0, 0) 'black
                Case Else
                    txtStatus.BackColor = Color.Red 'RGB(255, 0, 0) 'red
                    'Font.Bold = True
                    txtStatus.ForeColor = Color.White ' RGB(255, 255, 255) 'white
            End Select
        End If


        If _SalesOrderItemId <> "" Then
            'txtSalesOrderitemId.Text = SalesOrderItemId  ' Needed For Saving Later On.
            Call GetSalesOrderItemInfo(_SalesOrderItemId)

            If _OrderType = "Return Order" Then
                '===============================================================
                'Get the return prices on a return order
                '===============================================================
                _OriginalProductPrice = 0
                _OriginalMargin = 0

                Call GetOriginalProductPricing(txtSKU.Text, _AccountId, _OriginalProductPrice, _OriginalMargin)
            End If

            lblWarning.Visible = False

        Else
            ' ==============================================================
            ' Product not found in order
            ' ==============================================================

            If _OrderType <> "Return Order" Then
                ' ==============================================================
                ' Check for the item in the stock card
                '===============================================================
                _OriginalProductPrice = 0
                _OriginalMargin = 0

                Call GetOriginalProductPricing(txtSKU.Text, _AccountId, _OriginalProductPrice, _OriginalMargin)

                stockCardId = GetField("IsNull(STOCKCARDITEMSID, '')", "STOCKCARDITEMS", "ACCOUNTID = '" & _AccountId & "' AND PRODUCTID = '" & Productid & "'", My.Settings.SLXConnectionString)
                If stockCardId <> "" Then

                    ListPrice = RoundUp(CDbl(GetField("IsNull(LISTPRICE, 0)", "STOCKCARDITEMS", "ACCOUNTID = '" & _AccountId & "' AND PRODUCTID = '" & Productid & "'", My.Settings.SLXConnectionString)), 2)
                    Discount = GetField("IsNull(MARGIN, 0)", "STOCKCARDITEMS", "ACCOUNTID = '" & _AccountId & "' AND PRODUCTID = '" & Productid & "'", My.Settings.SLXConnectionString)

                    lblWarning.Visible = False
                Else
                    'Check for product in a different warehouse on the stock card
                    stockCardId = GetField("IsNull(s.STOCKCARDITEMSID, '')",
                        "STOCKCARDITEMS s Inner Join PRODUCT p On p.PRODUCTID = s.PRODUCTID",
                        "s.ACCOUNTID = '" & _AccountId & "' AND p.ACTUALID = '" & txtSKU.Text & "'", My.Settings.SLXConnectionString)

                    If stockCardId <> "" Then
                        ListPrice = RoundUp(CDbl(GetField("IsNull(LISTPRICE, 0)", "STOCKCARDITEMS", "ACCOUNTID = '" & _AccountId & "' AND STOCKCARDITEMSID = '" & stockCardId & "'", My.Settings.SLXConnectionString)), 2)
                        Discount = GetField("IsNull(MARGIN, 0)", "STOCKCARDITEMS", "ACCOUNTID = '" & _AccountId & "' AND STOCKCARDITEMSID = '" & stockCardId & "'", My.Settings.SLXConnectionString)

                        lblWarning.Visible = False

                    Else
                        ' ==============================================================
                        ' The Item is not In the Stock Card so Need to Add it Manually
                        '===============================================================
                        ' Note for distributors this ListPrice
                        ItemKey = GetField("MASItemKey", "Product", "ProductId = '" & Productid & "'", My.Settings.SLXConnectionString)
                        ListPrice = RoundUp(GetListPrice(ItemKey, _CurrencyId, _CustKey), 2)
                        If ListPrice = 0 Then
                            'Select MASITEMKEY  from sysdba.PRODUCT where ACTUALID = '1071372'and WAREHOUSEID = 'DEL'
                            ItemKey = GetField("MASItemKey", "Product", "actualid = '" & txtSKU.Text & "' and warehouseid ='DEL'", My.Settings.SLXConnectionString)
                            Productid = GetField("Productid", "Product", "actualid = '" & txtSKU.Text & "' and warehouseid ='DEL'", My.Settings.SLXConnectionString) 'Set ProductId as it isn't on the StockCard
                            ListPrice = RoundUp(GetListPrice(ItemKey, _CurrencyId, _CustKey), 2)
                        End If
                        Discount = GetMargin(Productid, _AccountId)

                        MsgBox("This Item " & txtSKU.Text & ": " & txtDescription.Text & " is not in the Stock Card and will therefore use Retail Pricing. It is recommended to update your stock card and then add this item to the order again.",, "Warning")
                        lblWarning.Visible = True

                    End If
                End If

                txtListPrice.Text = ListPrice
                txtPrice.Text = RoundUp(CDbl(ListPrice) - (CDbl(ListPrice) * CDbl(Discount)), 2)
                txtMargin.Text = Discount
                txtExtendedPrice.Text = 0

                '================================================================
                '//Adjusted Price  is calculated differently for return orders
                '//Adjusted Price = (original price - (original price * original discount) - (price - (price * discount)))
                '================================================================
            ElseIf _OrderType = "Return Order" Then

                '===============================================================
                'Get the return prices on a return order
                '===============================================================
                Dim StockCardProductId
                _OriginalProductPrice = 0
                _OriginalMargin = 0
                StockCardProductId = GetOriginalProductPricing(txtSKU.Text, _AccountId, _OriginalProductPrice, _OriginalMargin)


                ' ==============================================================
                ' Check for the item in the stock card
                '===============================================================
                stockCardId = GetField("IsNull(STOCKCARDITEMSID, '')", "STOCKCARDITEMS", "ACCOUNTID = '" & _AccountId & "' AND PRODUCTID = '" & StockCardProductId & "'", My.Settings.SLXConnectionString)
                If stockCardId <> "" Then

                    ListPrice = RoundUp(CDbl(GetField("IsNull(LISTPRICE, 0)", "STOCKCARDITEMS", "ACCOUNTID = '" & _AccountId & "' AND PRODUCTID = '" & StockCardProductId & "'", My.Settings.SLXConnectionString)), 2)
                    Discount = GetField("IsNull(MARGIN, 0)", "STOCKCARDITEMS", "ACCOUNTID = '" & _AccountId & "' AND PRODUCTID = '" & StockCardProductId & "'", My.Settings.SLXConnectionString)

                    lblWarning.Visible = False
                Else
                    'Check for product in a different warehouse on the stock card
                    stockCardId = GetField("IsNull(s.STOCKCARDITEMSID, '')",
                        "STOCKCARDITEMS s Inner Join PRODUCT p On p.PRODUCTID = s.PRODUCTID",
                        "s.ACCOUNTID = '" & _AccountId & "' AND p.ACTUALID = '" & txtSKU.Text & "'", My.Settings.SLXConnectionString)

                    If stockCardId <> "" Then
                        ListPrice = RoundUp(CDbl(GetField("IsNull(LISTPRICE, 0)", "STOCKCARDITEMS", "ACCOUNTID = '" & _AccountId & "' AND STOCKCARDITEMSID = '" & stockCardId & "'", My.Settings.SLXConnectionString)), 2)
                        Discount = GetField("IsNull(MARGIN, 0)", "STOCKCARDITEMS", "ACCOUNTID = '" & _AccountId & "' AND STOCKCARDITEMSID = '" & stockCardId & "'", My.Settings.SLXConnectionString)

                        lblWarning.Visible = False

                    Else
                        ' ==============================================================
                        ' The Item is not In the Stock Card so Need to Add it Manually
                        '===============================================================

                        ItemKey = GetField("MASItemKey", "Product", "ProductId = '" & Productid & "'", My.Settings.SLXConnectionString)
                        ListPrice = RoundUp(GetListPrice(ItemKey, _CurrencyId, _CustKey), 2)
                        Discount = GetMargin(Productid, _AccountId)

                        MsgBox("This Item " & txtSKU.Text & ": " & txtDescription.Text & " is not in the Stock Card and will therefore use Retail Pricing. It is recommended to update your stock card and then add this item to the order again.",, "Warning")
                        lblWarning.Visible = True

                    End If
                End If

                txtListPrice.Text = ListPrice
                'txtPrice.Text = RoundUp(OriginalProductPrice - (OriginalProductPrice * OriginalMargin) - (ListPrice - (ListPrice * Discount)), 2)
                txtPrice.Text = RoundUp(CDbl(_OriginalProductPrice) - (RoundUp(CDbl(_OriginalProductPrice) * CDbl(_OriginalMargin), 2)) - (CDbl(ListPrice) - (RoundUp(CDbl(ListPrice) * CDbl(Discount), 2))), 2)
                txtMargin.Text = Discount
                txtExtendedPrice.Text = 0
            End If
        End If




    End Sub

    Sub ClearProductInfo()
        'Clear the product information before seaching a new product
        txtDescription.Text = ""
        txtMargin.Text = ""
        txtListPrice.Text = ""
        txtPrice.Text = ""
        txtExtendedPrice.Text = ""
        txtMaxstockLevel.Text = ""
        txtSuggestedOrder.Text = ""
        txtStatus.Text = ""
        lblWarning.Visible = False
        'Call CreateRuntimeDataGrid("1", dgHistory)
    End Sub

    Sub GetSalesOrderItemInfo(ByVal SalesOrderItemId)
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim strSQL As String
        strSQL = "SELECT     sysdba.SALESORDERITEMS.DISCOUNT, sysdba.SALESORDERITEMS.CALCULATEDPRICE, sysdba.PRODUCT.ACTUALID,"
        strSQL = strSQL & "                      sysdba.PRODUCT.UPC, sysdba.SALESORDERITEMS.MAX_STOCKLEVEL, sysdba.SALESORDERITEMS.EXTENDEDPRICE, sysdba.SALESORDERITEMS.QUANTITY,"
        strSQL = strSQL & "                  sysdba.SALESORDERITEMS.PRICE"
        strSQL = strSQL & " FROM         sysdba.SALESORDERITEMS INNER JOIN"
        strSQL = strSQL & "                       sysdba.PRODUCT ON sysdba.SALESORDERITEMS.PRODUCTID = sysdba.PRODUCT.PRODUCTID"
        strSQL = strSQL & "    WHERE     (sysdba.SALESORDERITEMS.SALESORDERITEMSID = '" & SalesOrderItemId & "')"
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim i As Integer = 0

        Try
            objConn.Open(My.Settings.SLXConnectionString)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                For i = 0 To .RecordCount - 1          ' Loop
                    If Not (.BOF And .EOF) Then        ' Check not at end/beginning
                        '=======================================
                        'Found
                        '=======================================
                        txtMargin.Text = .Fields("DISCOUNT").Value
                        txtListPrice.Text = RoundUp(.Fields("PRICE").Value, 2)
                        txtSKU.Text = .Fields("ACTUALID").Value
                        txtUPC.Text = .Fields("UPC").Value
                        txtPrice.Text = RoundUp(.Fields("CALCULATEDPRICE").Value, 2)
                        txtExtendedPrice.Text = RoundUp(.Fields("EXTENDEDPRICE").Value, 2)
                        txtMaxstockLevel.Text = .Fields("MAX_STOCKLEVEL").Value

                        .MoveNext()               ' Move to next record
                    End If
                Next
                .Close()




            End With


        Catch ex As Exception
            'MsgBox(ex.Message)
            ' Console.WriteLine(ex.Message)

        End Try


    End Sub

    Function GetOriginalProductPricing(ByVal ActualId As String,
                                       ByVal AccountId As String,
                                       ByRef Price As Decimal, ByRef Margin As Decimal) As String
        '===============================================================
        'Get the return prices on a return order
        '===============================================================
        Price = 0.0
        Margin = 0.0
        Dim StockCardProductId As String = ""
        If _OrderType = "Return Order" Then

            Dim DefaultWareHouse
            DefaultWareHouse = GetUserDefaultWarhouse(_AccountManagerId)


            Dim IsInternalAccount
            IsInternalAccount = GetField("IsNull(InternalAccount,'')", "Account", "ACCOUNTID = '" & _AccountId & "'", My.Settings.SLXConnectionString)
            If IsInternalAccount = "" Then
                IsInternalAccount = False
            End If


            'Lookup the original item from the return item
            Dim OriginalProductId
            'OriginalProductId = GetOriginalProduct(ActualId, CompanyId, IsInternalAccount, WarehouseId)
            OriginalProductId = GetOriginalProduct(ActualId, _CompanyId, IsInternalAccount, DefaultWareHouse)


            StockCardProductId = GetStockCardProduct(ActualId, _CompanyId, IsInternalAccount, DefaultWareHouse)

            ' ==============================================================
            ' Check for the item in the stock card
            '===============================================================
            Dim stockCardId
            stockCardId = GetField("IsNull(STOCKCARDITEMSID, '')", "STOCKCARDITEMS", "ACCOUNTID = '" & AccountId & "' AND PRODUCTID = '" & OriginalProductId & "'", My.Settings.SLXConnectionString)
            If stockCardId <> "" Then

                Margin = CDbl(GetField("IsNull(MARGIN, 0)", "STOCKCARDITEMS", "ACCOUNTID = '" & AccountId & "' AND PRODUCTID = '" & OriginalProductId & "'", My.Settings.SLXConnectionString))
                Price = CDbl(GetField("IsNull(LISTPRICE, 0)", "STOCKCARDITEMS", "ACCOUNTID = '" & AccountId & "' AND PRODUCTID = '" & OriginalProductId & "'", My.Settings.SLXConnectionString))
            Else
                ' ==============================================================
                ' The Item is not In the Stock Card so Need to Add it Manually
                '===============================================================
                Margin = CDbl(GetMargin(OriginalProductId, AccountId))
                'OriginalProductPrice = GetField("Price", "Product", "ActualID = '" & OriginalProductID & '")
                'OriginalProductPrice = GetField("Price", "vProductPriceSheet", "ProductID = '" & OriginalProductID & "' And WhseKey = '1'")
                Dim CURRENCYCODE
                CURRENCYCODE = GetField("Isnull(CURRENCYCODE,'CAD')", "ACCOUNT", "ACCOUNTID='" & AccountId & "'", My.Settings.SLXConnectionString)
                Dim ItemKey
                ItemKey = GetField("MASITEMKEY", "PRODUCT", "ProductID='" & OriginalProductId & "'", My.Settings.SLXConnectionString)
                'Price = Cdbl(GetListPrice(OriginalProductId, AccountId))
                '=============================================================
                ' June 20, 2017 Get By List Sheet Prices
                '=============================================================
                Dim CustKey
                '
                'Select ACCOUNTID , MASCUSTKEY  from sysdba.ACCOUNT where MASCUSTKEY = '4597'
                CustKey = GetField("MASCUSTKEY", "ACCOUNT", " ACCOUNTID='" & AccountId & "'", My.Settings.SLXConnectionString)
                Price = CDbl(GetListPrice(ItemKey, CURRENCYCODE, CustKey))

            End If

        End If

        'Return "" if item not found in stock card
        Return StockCardProductId


    End Function

    Function GetUserDefaultWarhouse(Userid)
        Dim SQL
        SQL = SQL & "SELECT     sysdba.SITE.SITECODE"
        SQL = SQL & " FROM         sysdba.USERWHSE INNER JOIN"
        SQL = SQL & "                      sysdba.SITE ON sysdba.USERWHSE.SITEID = sysdba.SITE.SITEID"
        SQL = SQL & " WHERE     (sysdba.USERWHSE.USERID = '" & Userid & "') AND (sysdba.USERWHSE.ISDEFAULT = 'T')"

        Dim returnValue
        returnValue = "" ' Intialize
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim i As Integer = 0

        Try
            objConn.Open(My.Settings.SLXConnectionString)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(SQL, objConn)
                For i = 0 To .RecordCount - 1 ' Loop
                    If Not (.BOF And .EOF) Then ' Check not at end/beginning
                        returnValue = .Fields("SITECODE").Value

                        .MoveNext() ' Move to next record
                    End If
                Next
                .Close()




            End With


        Catch ex As Exception
            'MsgBox(ex.Message)
            ' Console.WriteLine(ex.Message)

        End Try




        Return returnValue


    End Function

    Function GetListPrice(ByVal ItemKey, ByVal CurrencyId, ByVal CustKey)

        Dim strSQL As String
        Dim PriceSheetToUse As String
        Dim ListPrice As Double
        ListPrice = 0.0
        'Select PriceBase  from sysdba.tarCustAddr where CustKey = '4597'
        PriceSheetToUse = GetField("PRICEBASE", "tarCustAddr", " CustKey = '" & CustKey & "' order by UpdateDate desc", My.Settings.SLXConnectionString)
        '=========================================================================
        ' Change Request Jnune 2017 to Use different Sheet Prices as needed
        '===========================================================================
        Select Case PriceSheetToUse
            Case "0"
                strSQL = "SELECT      LISTPRICE"
            Case "1"
                strSQL = "SELECT      SHEET1PRICE"
            Case "2"
                strSQL = "SELECT      SHEET2PRICE"
            Case "3"
                strSQL = "SELECT      SHEET3PRICE"
            Case "4"
                strSQL = "SELECT      SHEET4PRICE"
            Case Else
                strSQL = "SELECT      LISTPRICE"
        End Select


        strSQL = strSQL & " FROM         sysdba.TIMPRICESHEET"
        strSQL = strSQL & " WHERE     (ITEMKEY = '" & ItemKey & "') AND (CURRID = '" & CurrencyId & "') AND (GETDATE() > EFFECTIVEDATE)"
        strSQL = strSQL & " ORDER BY EFFECTIVEDATE ASC"
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim i As Integer = 0

        Try
            objConn.Open(My.Settings.SLXConnectionString)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)
                For i = 0 To .RecordCount - 1 ' Loop
                    If Not (.BOF And .EOF) Then        ' Check not at end/beginning
                        ListPrice = CDbl(.Fields(0).Value)
                        .MoveNext()               ' Move to next record
                    End If
                Next
                .Close()
            End With
        Catch ex As Exception
            'MsgBox(ex.Message)
            ' Console.WriteLine(ex.Message)

        End Try

        GetListPrice = CDbl(ListPrice)

    End Function

    Function GetMargin(ByVal Productid, ByVal Accountid)

        Dim returnDbl As Double


        returnDbl = 0.0 ' Intialiaze

        Dim ProducPriceGroupKey As String
        ProducPriceGroupKey = GetField("MASPRODPRICEGROUPKEY", "PRODUCT", "PRODUCTID='" & Productid & "'", My.Settings.SLXConnectionString)

        Dim TIMPRODPRICEGROUPID
        TIMPRODPRICEGROUPID = GetField("TIMPRODPRICEGROUPID", "TIMPRODPRICEGROUP", "CompanyID = '" & _CompanyId & "' and ProdPriceGroupKey  = '" & ProducPriceGroupKey & "'", My.Settings.SLXConnectionString)

        Dim tmpDbl
        tmpDbl = GetDefaultMargin(TIMPRODPRICEGROUPID, Accountid)
        If (CDbl(tmpDbl) = 0.0) Then

            '// do Nothing as there is no Default Margin


        Else
            returnDbl = tmpDbl

        End If
        GetMargin = returnDbl

    End Function

    Function GetDefaultMargin(TIMPRODCATEGORYID, Accountid)
        Dim result
        Dim dbltmpMargin
        Dim tmpDefaultMasterWhse
        Dim ProdCategoryID

        result = 0.0 '//Intitlize

        'Accountmanagerid = GetField("ACCOUNTMANAGERID", "ACCOUNT", "ACCOUNTID='" & Accountid & "'")
        'CompanyID = GetField("MASCOMPANYID", "USERSECURITY", "USERID='" & Accountmanagerid & "'")


        Dim NationalAcctCustId As String
        '===================================================
        ' National Account Pricing changes April 9, 2014
        ' ssommerfeldt
        '===================================================

        NationalAcctCustId = CheckNull(GetField("MASNATIONALACCTID", "ACCOUNT", "ACCOUNTID='" & Accountid & "'", My.Settings.SLXConnectionString), "")
        'CustomerId = GetField("Customerid", "ACCOUNTFINANCIAL", "ACCOUNTID='" & Accountid & "'")
        'CompanyCode = GetField("CompanyCode", "ACCOUNTFINANCIAL", "ACCOUNTID='" & Accountid & "'")
        ProdCategoryID = GetField("Isnull(ProdPriceGroupID,'')", "TIMPRODPRICEGROUP", "TIMPRODPRICEGROUPID='" & TIMPRODCATEGORYID & "'", My.Settings.SLXConnectionString)
        '//dbltmpMargin = GetField<decimal>("IsNull(PctAdj,'0')", "vNationalAccountMargin", "CustID='" + Account.AccountFinancial.CustomerId + "' AND CompanyID ='" + Account.AccountFinancial.Companycode + "' AND  ProdPriceGroupID=' " + ProdCategoryID + "'")
        dbltmpMargin = GetDefaultNationalPricingMargin(NationalAcctCustId, _CompanyCode, ProdCategoryID)
        If dbltmpMargin = 0 Then

            '//No National Pricing Exists
            '//========================================================================
            '// Try to get Distributor  Dealer  Default Pricing
            '//========================================================================
            dbltmpMargin = GetDefaultDealerDistributorPricingMargin(_CustomerId, _CompanyCode, ProdCategoryID)
            ' This code has been moved to a separate Function
            'If (Cdbl(dbltmpMargin) = 0.0) Then
            '
            '            '// Try to get Default pricing...
            '            tmpDefaultMasterWhse = GetField("MASTERWAREHOUSE", "MASMASTERWAREHOUSE", "COMPANYID ='" & CompanyID & "'")
            '            '//dbltmpMargin = GetField<decimal>("Isnull(PctAdj,'0')", "vDefaultPriceGroupMargin", "ProdPriceGroupID = '" + ProdCategoryID + "' AND WhseID = '" + tmpDefaultMasterWhse + "'")
            '            dbltmpMargin = GetDefaultProductProgramMargin(ProdCategoryID, tmpDefaultMasterWhse)
            '        End If
            '
            If (CDbl(dbltmpMargin) = 0.0) Then

                result = 0.0

            Else

                '// Found
                result = CDbl(dbltmpMargin)
            End If

        Else


            '//National pricing Found
            result = CDbl(dbltmpMargin)
        End If

        GetDefaultMargin = result

    End Function

    Function GetDefaultNationalPricingMargin(ByVal CustomerId As String,
                                             ByVal CompanyID As String,
                                             ByVal ProdPriceGroupID As String) As String
        '//dbltmpMargin = GetField<decimal>("IsNull(PctAdj,'0')", "vNationalAccountMargin", "CustID='" + Account.AccountFinancial.CustomerId + "' AND CompanyID ='" + Account.AccountFinancial.Companycode + "' AND  ProdPriceGroupID=' " + ProdCategoryID + "'")
        Dim SQL As String
        SQL = "Select IsNull(PctAdj,'0') as Margin From sysdba.vNationalAccountMargin where CustID='" & CustomerId & "' AND CompanyID ='" & CompanyID & "' AND  ProdPriceGroupID= '" & ProdPriceGroupID & "'"

        Dim returnValue
        returnValue = 0.0 '/ / Intialzie
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim i As Integer = 0

        Try
            objConn.Open(My.Settings.SLXConnectionString)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(SQL, objConn)
                For i = 0 To .RecordCount - 1 ' Loop
                    If Not (.BOF And .EOF) Then ' Check not at end/beginning
                        returnValue = .Fields("Margin").Value

                        .MoveNext() ' Move to next record
                    End If
                Next
                .Close()
            End With
        Catch ex As Exception
            'MsgBox(ex.Message)
            ' Console.WriteLine(ex.Message)

        End Try
        GetDefaultNationalPricingMargin = CDbl(returnValue)
    End Function

    Function GetOriginalProduct(ByVal ActualId, ByVal CompanyId, ByVal IsInternalAccount, ByVal WarehouseId)

        '//find the new item, id is the same as return except last char
        Dim newProductSKU
        newProductSKU = Strings.Left(ActualId, Len(ActualId) - 1)
        Dim newProductSearchSKU
        newProductSearchSKU = newProductSKU
        Dim productId, filter

        '//for EBU companies or internal company purchases U is added to the sku
        If (CompanyId = "EBU" Or IsInternalAccount = True) Then
            'newProductSearchSKU = newProductSearchSKU & "_U"  ssommerfeldt Feb 11 2015  New Logic Introduced by Chris
            '===============================================================================================
            '
            'If the code ends with a 2U ' drop the 2U and replace with 4
            'If the code ends with a 2 ' drop the 2 and replace with a 4
            '
            'i.e. New product:
            '1010652u ' 1010654
            '1010652 ' 1010654
            If Strings.Right(ActualId, 1) = "4" Then
                newProductSearchSKU = Strings.Left(ActualId, Len(ActualId) - 1) & "2U"
                filter = "ActualID Like '" & newProductSearchSKU & "' And ActualId <> '" & ActualId & "' And CompanyID = '" & CompanyId & "' And WarehouseID = '" & WarehouseId & "'"
                productId = GetField("IsNull(ProductID, '')", "Product", filter, My.Settings.SLXConnectionString)

                '=====================================================================================================================================
                ' ssommerfeldt Jan 8, 2018 New Logic by Chris if the Product with a 2U has pricing then use it if not then  Skip the U logic below
                '=====================================================================================================================================
                If productId <> "" Then
                    Dim testListPrice
                    'StockCard Test   Skp as we only care if they actually have current pricing on the Item.
                    'testListPrice = RoundUp(CDbl(GetField("IsNull(LISTPRICE, 0)","STOCKCARDITEMS","ACCOUNTID = '" & Accountid & "' AND PRODUCTID = '" & Productid & "'")), 2)
                    'Regular Test
                    Dim ItemKey
                    ItemKey = GetField("MASITEMKEY", "PRODUCT", "PRODUCTID='" & productId & "'", My.Settings.SLXConnectionString)
                    'testListPrice = RoundUp(GetListPrice(ItemKey, CurrencyId, CustKey), 2)
                    testListPrice = RoundUp(GetListPrice(ItemKey, "USD", "1"), 2)
                    If testListPrice = 0.0 Then
                        ' Set the ProductId = "" so it can get the correct product the standard way
                        productId = ""
                    End If
                End If
            End If
            If productId = "" And Strings.Right(ActualId, 1) = "4" Then
                newProductSearchSKU = Strings.Left(ActualId, Len(ActualId) - 1) & "2"
                filter = "ActualID Like '" & newProductSearchSKU & "' And ActualId <> '" & ActualId & "' And CompanyID = '" & CompanyId & "' And WarehouseID = '" & WarehouseId & "'"
                productId = GetField("IsNull(ProductID, '')", "Product", filter, My.Settings.SLXConnectionString)
            End If




        Else
            '//regular account
            newProductSearchSKU = newProductSearchSKU & "2" ' "_"  ssommerfeldt Sept 17 2018 Ok thanks. Can you change it to pick up 2 only? There is no situation where it would need to do otherwise right now, and this way it avoids potential mistakes if there is no 2
        End If


        filter = "ActualID Like '" & newProductSearchSKU & "' And ActualId <> '" & ActualId & "' And CompanyID = '" & CompanyId & "' And WarehouseID = '" & WarehouseId & "' Order by ACTUALID" 'ssommerfeldt Sept 17 2018 added Order as sometimes multiple products and we want the Product ending in 2 to come first
        productId = GetField("IsNull(ProductID, '')", "Product", filter, My.Settings.SLXConnectionString)

        If productId = "" Then
            'Product not found, try without specifying the warehouse
            filter = "ActualID Like '" & newProductSearchSKU & "' And ActualId <> '" & ActualId & "' And CompanyID = '" & CompanyId & "'"
            productId = GetField("IsNull(ProductID, '')", "Product", filter, My.Settings.SLXConnectionString)

        End If

        GetOriginalProduct = productId
    End Function

    Function GetStockCardProduct(ByVal ActualId, ByVal CompanyId, ByVal IsInternalAccount, ByVal WarehouseId)

        '//find the new item, id is the same as return except last char
        Dim newProductSKU
        'newProductSKU = Left(ActualId, Len(ActualId) - 1)
        newProductSKU = ActualId
        Dim newProductSearchSKU
        newProductSearchSKU = newProductSKU

        '//for EBU companies or internal company purchases U is added to the sku
        If (CompanyId = "EBU" Or IsInternalAccount = True) Then
            'newProductSearchSKU = newProductSearchSKU & "U" 'ssommerfeldt Feb 11 2014
            'Keep the same as regular Account
            newProductSearchSKU = newProductSearchSKU & ""

        Else
            '//regular account
            newProductSearchSKU = newProductSearchSKU & ""
        End If

        Dim productId, filter
        filter = "ActualID = '" & newProductSearchSKU & "' And CompanyID = '" & CompanyId & "' And WarehouseID = '" & WarehouseId & "'"
        productId = GetField("IsNull(ProductID, '')", "Product", filter, My.Settings.SLXConnectionString)

        If productId = "" Then
            'Product not found, try without specifying the warehouse
            filter = "ActualID = '" & newProductSearchSKU & "' And CompanyID = '" & CompanyId & "'"
            productId = GetField("IsNull(ProductID, '')", "Product", filter, My.Settings.SLXConnectionString)

        End If

        GetStockCardProduct = productId
    End Function

    Function GetDefaultDealerDistributorPricingMargin(ByVal CustomerId As String,
                                                      ByVal CompanyID As String,
                                                      ByVal ProdPriceGroupID As String) As Double
        '//dbltmpMargin = GetField<decimal>("IsNull(PctAdj,'0')", "vNationalAccountMargin", "CustID='" + Account.AccountFinancial.CustomerId + "' AND CompanyID ='" + Account.AccountFinancial.Companycode + "' AND  ProdPriceGroupID=' " + ProdCategoryID + "'")
        Dim SQL As String
        SQL = "Select IsNull(PctAdj,'0') as Margin From sysdba.vDistributorDealerAccountMargin where CustID='" & CustomerId & "' AND CompanyID ='" & CompanyID & "' AND  ProdPriceGroupID= '" & ProdPriceGroupID & "'"

        Dim returnValue As Double
        returnValue = 0.0 ' //Intialzie
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim i As Integer = 0

        Try
            objConn.Open(My.Settings.SLXConnectionString)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(SQL, objConn)
                For i = 0 To .RecordCount - 1 ' Loop
                    If Not (.BOF And .EOF) Then ' Check not at end/beginning
                        returnValue = .Fields("Margin").Value

                        .MoveNext() ' Move to next record
                    End If
                Next
                .Close()
            End With
        Catch ex As Exception
            'MsgBox(ex.Message)
            ' Console.WriteLine(ex.Message)

        End Try




        GetDefaultDealerDistributorPricingMargin = returnValue
    End Function

    Sub CreateRunTimeDatagrid()
        'create the connection
        Dim conn As New OleDbConnection(My.Settings.SLXConnectionString)
        'Accountid = GetField("ACCOUNTID", "SALESORDER", "SALESORDERID='" & txtSalesOrderid.Text & "'")
        'SKU = GetField("ACTUALID", "PRODUCT", "PRODUCTID = '" & Productid & "'")
        'A1.SALESORDERITEMSID,
        Dim Sql As String = "SELECT  A1.QUANTITY as Quantity, A2.ORDERDATE AS OrderDate, A1.DISCOUNT as Discount , A1.PRICE as Price, A1.EXTENDEDPRICE as ExtendedPrice"
        Sql = Sql & " FROM sysdba.SALESORDERITEMS AS A1 LEFT OUTER JOIN "
        Sql = Sql & " sysdba.SALESORDER AS A2 ON A1.SALESORDERID = A2.SALESORDERID "
        Sql = Sql & " WHERE (A1.QUANTITY > 0) AND (A2.ACCOUNTID = '" & _AccountId & "')"
        Sql = Sql & " AND (A1.ACTUALID = '" & txtSKU.Text & "')"
        Sql = Sql & " And TRANSMITDATE Is Not Null"
        Sql = Sql & " ORDER BY OrderDate DESC"
        Try
            'open connection
            conn.Open()
            'create the DataAdapter. it will internally create a command object
            Dim da As New OleDbDataAdapter(Sql, conn)

            'now create the DataSet and use the adapter to fill it
            Dim ds As New DataSet()
            da.Fill(ds)

            'pull out the created DataTable to work with
            'our table is the first and only one in the tables collection
            Dim table As DataTable = ds.Tables(0)

            'iterate through the rows in the table's Rows collection
            'Dim row As DataRow
            'For Each row In table.Rows
            '    ListBox1.Items.Add(row("account").ToString())
            'Next

            'bind the table to a grid
            DataGridView1.DataSource = table
            ' Ensure Nice formatting
            'dgResults.Columns.Item("Productid").Visible = False  ' Hide the ProductId Column
            'dgResults.Columns(0).AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCells
            DataGridView1.Columns(3).AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.AllCells
            DataGridView1.Columns(1).AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.AllCells
            DataGridView1.Columns(2).AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.AllCells
            DataGridView1.Columns(3).AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.AllCells
            DataGridView1.Columns(4).AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill

        Catch ex As Exception
            'MessageBox.Show("An error occurred: " & ex.Message, "Error")
        Finally
            conn.Dispose()
            conn = Nothing
        End Try
    End Sub

    Sub AddEditSalesOrderItem(ByVal SalesOrderItemId, ByVal Quantity, ByVal ListPrice, ByVal Price, ByVal Discount, ByVal ExtendedPrice)

        '=======================
        'Retrieving a recordset:
        '=======================
        '#Include: SLX Database Support, SLX Error Support
        ' entity.ExtendedPrice = (entity.Price - (entity.Price * entity.Discount)) * entity.Quantity;

        'ExtendedPrice = (Cdbl(Price) - (Cdbl(Price) * Cdbl(Discount))) * Cdbl(Quantity)

        '===============================================================
        'Get the return prices on a return order
        '===============================================================
        _OriginalProductPrice = 0
        _OriginalMargin = 0
        If _OrderType = "Return Order" Then
            GetOriginalProductPricing(txtSKU.Text, _AccountId, _OriginalProductPrice, _OriginalMargin)
        End If
        Dim strSQL
        Dim NextLineNumber



        'If item id is blank force a new record
        If SalesOrderItemId = "" Then
            strSQL = "Select * From sysdba.SALESORDERITEMS Where 1=2"
        Else
            strSQL = "Select * From sysdba.SALESORDERITEMS Where SALESORDERITEMSID = '" & SalesOrderItemId & "'" ' sql you want to execute
        End If

        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim i As Integer = 0
        Dim LastOrder As String = ""
        Dim LastOrder2 As String = ""
        Dim LastOrder3 As String = ""

        Try


            'objConn.Open(My.Settings.SLXConnectionString)
            objConn.Open(My.Settings.SLXConnectionString)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(strSQL, objConn)



                If Not (.BOF And .EOF) Then ' Check not at end/beginning

                    .Fields("MODIFYUSER").Value = SlxApplication.BasicFunctions.CurrentUserID
                    .Fields("MODIFYDATE").Value = Now

                    .Fields("PRICE").Value = RoundUp(CDbl(CheckEmpty(ListPrice, 0)), 2)
                    .Fields("QUANTITY").Value = CDbl(Quantity)
                    .Fields("DISCOUNT").Value = CDbl(CheckEmpty(Discount, 0))
                    .Fields("CALCULATEDPRICE").Value = RoundUp(CDbl(CheckEmpty(Price, 0)), 2)
                    .Fields("EXTENDEDPRICE").Value = RoundUp(CDbl(ExtendedPrice), 2)

                    If .Fields("LINENUMBER").Value IsNot DBNull.Value Then
                        ' If IsNumeric(CheckNull(.Fields("LINENUMBER").Value, "")) Then
                        'Do Nothing as it allready has a line
                    Else
                        NextLineNumber = CInt(GetField(" ISNULL(MAX(LINENUMBER), 0)", "SALESORDERITEMS", "SALESORDERID='" & _SalesOrderId & "'", My.Settings.SLXConnectionString)) + 1
                        .Fields("LINENUMBER").Value = NextLineNumber
                    End If


                    .Fields("TACACCOUNTID").Value = _AccountId
                    .Fields("ACCOUNTID").Value = _AccountId

                    .Fields("ORIGPRODUCTPRICE").Value = _OriginalProductPrice
                    .Fields("ORIGPRODUCTDISCOUNT").Value = _OriginalMargin

                    'Add the current And previous sales quantities
                    .Fields("CURRENTYEARSALESQTY").Value = GetField("IsNull(Sum(SOI.QUANTITY), 0) As Quantity",
                        "sysdba.SALESORDERITEMS As SOI Inner Join sysdba.SALESORDER As SO On SO.SALESORDERID = SOI.SALESORDERID",
                        "(UPPER(SO.STATUS) = 'TRANSMITTED TO ACCOUNTING' OR UPPER(SO.STATUS) = 'CLOSED')" &
                        " And Year(SO.OrderDate) = YEAR(GetDate())" &
                        " And SOI.QUANTITY <> 0" &
                        " And SOI.ACTUALID = '" & txtSKU.Text & "'" &
                        " And SO.ACCOUNTID = '" & _AccountId & "'", My.Settings.SLXConnectionString)

                    .Fields("PREVIOUSYEARSALESQTY").Value = GetField("IsNull(Sum(SOI.QUANTITY), 0) As Quantity",
                        "sysdba.SALESORDERITEMS As SOI Inner Join sysdba.SALESORDER As SO On SO.SALESORDERID = SOI.SALESORDERID",
                        "(UPPER(SO.STATUS) = 'TRANSMITTED TO ACCOUNTING' OR UPPER(SO.STATUS) = 'Closed')" &
                        " And Year(SO.OrderDate) = YEAR(GetDate()) - 1" &
                        " And SOI.QUANTITY <> 0" &
                        " And SOI.ACTUALID = '" & txtSKU.Text & "'" &
                        " And SO.ACCOUNTID = '" & _AccountId & "'", My.Settings.SLXConnectionString)

                    If GetSalesHistoryByIndex(_AccountId, txtSKU.Text, LastOrder, LastOrder2, LastOrder3) = "Success" Then
                        .Fields("LASTORDER").Value = LastOrder
                        .Fields("LASTORDER2").Value = LastOrder2
                        .Fields("LASTORDER3").Value = LastOrder3

                    End If
                    .Update() ' Move to next record

                Else
                    '     '=====================================================
                    '     ' April 2019 Cannot Add Items if Not on Template
                    '     '=====================================================
                    '            Dim useTemplateAccountPricing
                    '            Dim TemplateAccountId
                    '            Dim OnStockCardItem
                    '
                    '            useTemplateAccountPricing = GetField("Isnull(USEPRICINGTEMPLATEACCOUNT,'F')","ACCOUNT","ACCOUNTID='" & Accountid & "'")
                    '            TemplateAccountId = GetField("PRICINGTEMPLATEACCOUNTID","ACCOUNT","ACCOUNTID='" & Accountid & "'")
                    '            If useTemplateAccountPricing = "T" AND TemplateAccountId <> "" Then
                    '                OnStockCardItem = GetField("STOCKCARDITEMSID","sysdba.STOCKCARDITEMS"," PRODUCTID = '" & lueProduct.LookupID & "' and ACCOUNTID = '" & Accountid & "'")
                    '                If OnStockCardItem = "" Then
                    '
                    '                    Msgbox("Sorry Cannot Add New Items Not on Stockcard when using Template Pricing")
                    '                    objRS.Close()
                    '                    objRS = Nothing ' Clean up
                    '                    Exit Sub
                    '                End If
                    '            End If
                    '==================================================

                    .AddNew()
                    .Fields("SALESORDERITEMSID").Value = SlxApplication.BasicFunctions.GetIDFor("SALESORDERITEMS")
                    .Fields("SALESORDERID").Value = _SalesOrderId
                    .Fields("CREATEUSER").Value = SlxApplication.BasicFunctions.CurrentUserID
                    .Fields("CREATEDATE").Value = Now
                    .Fields("MODIFYUSER").Value = SlxApplication.BasicFunctions.CurrentUserID
                    .Fields("MODIFYDATE").Value = Now

                    '.Fields("PROGRAM").Value =""
                    .Fields("PRICE").Value = RoundUp(CDbl(CheckEmpty(ListPrice, 0)), 2)
                    .Fields("QUANTITY").Value = CDbl(Quantity)
                    .Fields("DISCOUNT").Value = CDbl(CheckEmpty(Discount, 0))
                    .Fields("CALCULATEDPRICE").Value = RoundUp(CDbl(CheckEmpty(Price, 0)), 2)
                    .Fields("EXTENDEDPRICE").Value = RoundUp(CDbl(ExtendedPrice), 2)

                    .Fields("FAMILY").Value = GetProductCategory(_ProductId, _AccountId)
                    '.Fields("OPPPRODUCTID").Value =""
                    .Fields("PRODUCTID").Value = _ProductId 'lueProduct.LookupID
                    .Fields("ACTUALID").Value = txtSKU.Text
                    .Fields("DESCRIPTION").Value = txtDescription.Text
                    .Fields("UNIT").Value = GetField("UNIT", "PRODUCT", "PRODUCTID='" & _ProductId & "'", My.Settings.SLXConnectionString)

                    '.Fields("GLOBALSYNCID").Value =""

                    NextLineNumber = CInt(GetField(" ISNULL(MAX(LINENUMBER), 0)", "SALESORDERITEMS", "SALESORDERID='" & _SalesOrderId & "'", My.Settings.SLXConnectionString)) + 1
                    .Fields("LINENUMBER").Value = NextLineNumber
                    .Fields("LINETYPE").Value = "StandardLine"
                    '.Fields("SLXLOCATIONID").Value =""
                    .Fields("UNITOFMEASUREID").Value = GetField("UNITOFMEASUREID", "PRODUCT", "PRODUCTID='" & _ProductId & "'", My.Settings.SLXConnectionString)
                    '.Fields("PRICEDETAILDESCRIPTION").Value =""
                    '.Fields("PRICEDETAILNOTES").Value =""
                    '.Fields("ITEMLOCKED").Value =""
                    '.Fields("TICK").Value =""
                    '.Fields("APPID").Value =""
                    '.Fields("COMMODITYTYPE").Value =""
                    '.Fields("CREATESOURCE").Value =""
                    .Fields("UPC").Value = txtUPC.Text
                    .Fields("MAX_STOCKLEVEL").Value = GetField("MAXSTOCKLEVEL", "PRODUCT", "PRODUCTID='" & _ProductId & "'", My.Settings.SLXConnectionString)
                    .Fields("ORIGPRODUCTPRICE").Value = _OriginalProductPrice
                    .Fields("ORIGPRODUCTDISCOUNT").Value = _OriginalMargin

                    '========================================================
                    ' December 14, 2020 Fixes
                    '=========================================================
                    Dim StockCardId As String = GetField("STOCKCARDITEMSID", "STOCKCARDITEMS", "ACCOUNTID='" & _AccountId & "' AND PRODUCTID ='" & _ProductId & "'", My.Settings.SLXConnectionString)
                    .Fields("TACSTOCKCARDITEMID").Value = StockCardId
                    .Fields("PRODUCT").Value = GetField("NAME", "PRODUCT", "PRODUCTID='" & _ProductId & "'", My.Settings.SLXConnectionString)
                    'Add the current And previous sales quantities
                    .Fields("CURRENTYEARSALESQTY").Value = GetField("IsNull(Sum(SOI.QUANTITY), 0) As Quantity",
                        "sysdba.SALESORDERITEMS As SOI Inner Join sysdba.SALESORDER As SO On SO.SALESORDERID = SOI.SALESORDERID",
                        "(UPPER(SO.STATUS) = 'TRANSMITTED TO ACCOUNTING' OR UPPER(SO.STATUS) = 'CLOSED')" &
                        " And Year(SO.OrderDate) = YEAR(GetDate())" &
                        " And SOI.QUANTITY <> 0" &
                        " And SOI.ACTUALID = '" & txtSKU.Text & "'" &
                        " And SO.ACCOUNTID = '" & _AccountId & "'", My.Settings.SLXConnectionString)

                    .Fields("PREVIOUSYEARSALESQTY").Value = GetField("IsNull(Sum(SOI.QUANTITY), 0) As Quantity",
                        "sysdba.SALESORDERITEMS As SOI Inner Join sysdba.SALESORDER As SO On SO.SALESORDERID = SOI.SALESORDERID",
                        "(UPPER(SO.STATUS) = 'TRANSMITTED TO ACCOUNTING' OR UPPER(SO.STATUS) = 'Closed')" &
                        " And Year(SO.OrderDate) = YEAR(GetDate()) - 1" &
                        " And SOI.QUANTITY <> 0" &
                        " And SOI.ACTUALID = '" & txtSKU.Text & "'" &
                        " And SO.ACCOUNTID = '" & _AccountId & "'", My.Settings.SLXConnectionString)

                    If GetSalesHistoryByIndex(_AccountId, txtSKU.Text, LastOrder, LastOrder2, LastOrder3) = "Success" Then
                        .Fields("LASTORDER").Value = LastOrder
                        .Fields("LASTORDER2").Value = LastOrder2
                        .Fields("LASTORDER3").Value = LastOrder3

                    End If



                    .Fields("TACACCOUNTID").Value = _AccountId
                    .Fields("ACCOUNTID").Value = _AccountId
                    '.Fields("TACSTOCKCARDITEMID").Value =""
                    .Update() ' Move to next record

                End If

            End With

            objRS.Close()
            objRS = Nothing ' Clean up
        Catch ex As Exception
            'MsgBox("There was a problem " & ex.Message)

        End Try


    End Sub
    Private Sub Process_CleanUpCorruptSalesItems(ByVal SalesOrderItemId As String)

        Dim i As Integer = 0
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim ID As String


        Dim SQL As String = "Select SALESORDERITEMSID  from sysdba.SALESORDERITEMS WHERE SALESORDERITEMSID='" & SalesOrderItemId & "'"

        Try
            objConn.Open(My.Settings.SLXConnectionString) 'NOTE Uses Native Client we don't want to Sync This
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(SQL, objConn)

                For i = 0 To .RecordCount - 1          ' Loop
                    If Not (.BOF And .EOF) Then        ' Check not at end/beginning
                        .Delete()

                        .MoveNext()
                        Console.WriteLine("Clean SalesItem " & i)

                        If i = 2000 Then ' Max 2000 Items cleans
                            Console.WriteLine("Reached Limit of 2000 Cleaned Items")
                            Exit For
                        End If
                    End If

                Next


                .UpdateBatch()
                .Close()
            End With




        Catch ex As Exception
            'MsgBox(ex.Message)
            'Call LogErrors(PROJECTNAME, "SalesOrderItems Clean-up ", ex.Message, EventLogEntryType.Error)
            'Add_TACSyncJobERROR(ex, slXLogHeaderID)
            '_hasErrors = True 'Log Errors
            'Console.WriteLine(ex.Message)
        Finally
            If objConn.State = ConnectionState.Open Then objConn.Close()
        End Try
        objConn = Nothing
    End Sub




    Function GetSalesHistoryByIndex(ByVal Accountid As String, ByVal SKU As String, ByRef Index1 As String, ByRef Index2 As String, ByRef Index3 As String)

        Dim SQL As String
        SQL = "SELECT SUM(SOI.QUANTITY) AS Qty"
        SQL = SQL & ", SO.ACCOUNTID"
        SQL = SQL & ", SO.ORDERDATE"
        SQL = SQL & ", SOI.PRODUCTID"
        SQL = SQL & " FROM sysdba.SALESORDERITEMS As SOI"
        SQL = SQL & " INNER JOIN sysdba.SALESORDER As SO ON SO.SALESORDERID = SOI.SALESORDERID"
        SQL = SQL & " WHERE (SOI.QUANTITY > 0)"
        SQL = SQL & " AND (SO.ACCOUNTID = '" + Accountid + "')"
        SQL = SQL & " AND (SOI.ACTUALID = '" + SKU + "')"
        SQL = SQL & " And TRANSMITDATE Is Not Null"
        SQL = SQL & " GROUP BY SO.ACCOUNTID, SO.ORDERDATE, SOI.PRODUCTID"
        SQL = SQL & " ORDER BY SO.ORDERDATE DESC"

        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim i As Integer = 0
        Dim returnValue = "None"
        Dim myQTY As String

        Try
            objConn.Open(My.Settings.SLXConnectionString)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(SQL, objConn)
                For i = 0 To .RecordCount - 1          ' Loop
                    If Not (.BOF And .EOF) Then        ' Check not at end/beginning
                        '=======================================
                        'Found
                        '=======================================
                        '.Fields("OPENQTY").Value = MyDataRow("OPENQTY")
                        Dim OrderDate
                        OrderDate = CDate(.Fields("ORDERDATE").Value)
                        myQTY = CDbl(.Fields("Qty").Value).ToString("####")
                        If (i = 0) Then
                            Index1 = MonthName(Month(OrderDate), 1) & " " & Microsoft.VisualBasic.DateAndTime.Day(OrderDate) & "/" & Year(OrderDate) & " Qty:" & myQTY
                            returnValue = "Success"
                        End If
                        If (i = 1) Then
                            Index2 = MonthName(Month(OrderDate), 1) & " " & Microsoft.VisualBasic.DateAndTime.Day(OrderDate) & "/" & Year(OrderDate) & " Qty:" & myQTY
                            returnValue = "Success"
                        End If
                        If (i = 2) Then
                            Index3 = MonthName(Month(OrderDate), 1) & " " & Microsoft.VisualBasic.DateAndTime.Day(OrderDate) & "/" & Year(OrderDate) & " Qty:" & myQTY
                            returnValue = "Success"
                        End If
                        If (i > 2) Then
                            'Get out of Dodge as we Do not Track more than 3
                            Exit For
                        End If

                        .MoveNext()               ' Move to next record
                    End If
                Next
                .Close()




            End With


        Catch ex As Exception
            'MsgBox(ex.Message)
            Console.WriteLine(ex.Message)

        End Try


        Return returnValue

    End Function

    Function GetProductCategory(ByVal Productid, ByVal Accountid)

        Dim returnString
        returnString = "" ' Intialize
        Dim Margin

        Margin = txtMargin.Text
        If Productid = "" Then
            Exit Function ' Don't go On as No Valid data

        End If

        Dim AccountName
        Dim Seccodeid
        Dim Companyid


        Dim ProducPriceGroupKey
        ProducPriceGroupKey = GetField("MASPRODPRICEGROUPKEY", "PRODUCT", "PRODUCTID='" & _ProductId & "'", My.Settings.SLXConnectionString)

        Dim CategoryID
        CategoryID = GetField("TIMPRODPRICEGROUPID", "TIMPRODPRICEGROUP", "CompanyID = '" & _CompanyId & "' and ProdPriceGroupKey  = '" & ProducPriceGroupKey & "'", My.Settings.SLXConnectionString)


        '=================================================================
        ' Add Product Group Items
        '=================================================================
        '=================================================================================================
        ' ssommerfeldt Feb 18, 2014
        ' Get the Distributor Cost
        Dim DistributorAccountid
        DistributorAccountid = GetField("DISTRIBUTORACCOUNTID", "USERSECURITY", "USERID='" & _AccountManagerId & "'", My.Settings.SLXConnectionString)

        '===================================================================================================
        '  ssommerfeldt February 18, 2014
        ' Removed Requirement to show all the StockCards but only the StockCards for the Default WareHouse
        '===================================================================================================
        Dim WareHouseIN
        WareHouseIN = GetUserWarhouseQueryString(_AccountManagerId)


        Dim SQL
        '    SQL = "SELECT     sysdba.PRODUCT.PRODUCTID, sysdba.PRODUCT.ACTUALID, sysdba.PRODUCT.Name as DESCRIPTION, sysdba.PRODUCT.COMPANYID, "
        '    SQL = SQL & "                       sysdba.TIMPRODPRICEGROUP.TIMPRODPRICEGROUPID, sysdba.TIMPRODPRICEGROUP.Description AS PriceGroupDescription, "
        '    SQL = SQL & "  ISNull(sysdba.TIMPRICESHEET.LISTPRICE,0) as LISTPRICE"
        '    SQL = SQL & " FROM         sysdba.PRODUCT INNER JOIN"
        '    SQL = SQL & "                       sysdba.TIMPRODPRICEGROUP ON sysdba.PRODUCT.MASPRODPRICEGROUPKEY = sysdba.TIMPRODPRICEGROUP.ProdPriceGroupKey LEFT OUTER JOIN "
        '    SQL = SQL & " sysdba.TIMPRICESHEET ON sysdba.PRODUCT.MASITEMKEY = sysdba.TIMPRICESHEET.ITEMKEY"
        '    SQL = SQL & " WHERE   (PRODUCT.PRODUCTID='" & Productid & "') AND (TIMPRODPRICEGROUP.TIMPRODPRICEGROUPID = '" + CategoryID + "') AND (sysdba.PRODUCT.COMPANYID = '" & CompanyID & "')"
        '    SQL = SQL & " AND (sysdba.PRODUCT.WAREHOUSEID in " + WareHouseIN + ")"

        SQL = "SELECT     sysdba.PRODUCT.PRODUCTID, sysdba.PRODUCT.ACTUALID, sysdba.PRODUCT.NAME AS DESCRIPTION, sysdba.PRODUCT.COMPANYID, "
        SQL = SQL & "                      sysdba.TIMPRODPRICEGROUP.TIMPRODPRICEGROUPID, sysdba.TIMPRODPRICEGROUP.Description AS PriceGroupDescription"
        SQL = SQL & "  FROM         sysdba.PRODUCT INNER JOIN "
        SQL = SQL & "                        sysdba.TIMPRODPRICEGROUP ON sysdba.PRODUCT.MASPRODPRICEGROUPKEY = sysdba.TIMPRODPRICEGROUP.ProdPriceGroupKey"
        SQL = SQL & "  WHERE     (sysdba.PRODUCT.PRODUCTID = '" & Productid & "')"

        'AND (sysdba.PRODUCT.PRODUCTID NOT IN"
        '    SQL = SQL & "              (SELECT     PRODUCTID"
        '    SQL = SQL & "                FROM          sysdba.STOCKCARDITEMS"
        '    SQL = SQL & "                WHERE      (ACCOUNTID = '" + Accountid + "')))"

        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim i As Integer = 0

        Try
            objConn.Open(My.Settings.SLXConnectionString)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(SQL, objConn)
                For i = 0 To .RecordCount - 1 ' Loop
                    If Not (.BOF And .EOF) Then ' Check not at end/beginning
                        returnString = .Fields("PriceGroupDescription").Value
                        '
                        .MoveNext() ' Move to next record
                    End If

                Next
                .Close()
            End With
        Catch ex As Exception
            'MsgBox(ex.Message)
            ' Console.WriteLine(ex.Message)

        End Try




        GetProductCategory = returnString


    End Function

    Function GetUserWarhouseQueryString(Userid)
        Dim SQL
        SQL = SQL & "SELECT     sysdba.SITE.SITECODE"
        SQL = SQL & " FROM         sysdba.USERWHSE INNER JOIN"
        SQL = SQL & "                      sysdba.SITE ON sysdba.USERWHSE.SITEID = sysdba.SITE.SITEID"
        SQL = SQL & " WHERE     (sysdba.USERWHSE.USERID = '" & Userid & "') AND (sysdba.USERWHSE.ISDEFAULT = 'T')"
        Dim returnValue
        returnValue = "("
        '=======================
        'Retrieving a recordset:
        '=======================
        Dim objConn As New ADODB.Connection()
        Dim objRS As New ADODB.Recordset
        Dim i As Integer = 0

        Try
            objConn.Open(My.Settings.SLXConnectionString)
            With objRS
                .CursorLocation = ADODB.CursorLocationEnum.adUseClient
                .CursorType = ADODB.CursorTypeEnum.adOpenDynamic
                .LockType = ADODB.LockTypeEnum.adLockOptimistic
                .Open(SQL, objConn)
                For i = 0 To .RecordCount - 1 ' Loop
                    If Not (.BOF And .EOF) Then ' Check not at end/beginning
                        returnValue = returnValue & "'" & .Fields("SITECODE").Value & "',"

                        .MoveNext() ' Move to next record
                    End If
                Next

                Dim iLength
                iLength = Len(returnValue)
                returnValue = Mid(returnValue, 1, iLength - 2) ' Clean out the Last 2
                .Close()
            End With
        Catch ex As Exception
            'MsgBox(ex.Message)
            ' Console.WriteLine(ex.Message)

        End Try









        GetUserWarhouseQueryString = returnValue & "')"


    End Function

    Sub ClearForm()
        Dim OrderType
        OrderType = GetField("ORDERTYPE", "SALESORDER", " SALESORDERID='" & _SalesOrderId & "'", My.Settings.SLXConnectionString)
        If OrderType = "Return Order" Then
            'For Return orders, limit the family and status values, and restrict warehouse

            txtUPC.Text = "059511"  ' Prepend since they typcially have to key this number in by hand
        Else
            txtUPC.Text = ""
        End If
        txtMargin.Text = ""
        _SalesOrderItemId = ""
        txtExtendedPrice.Text = ""
        '  txtUPC.Text = ""
        txtSKU.Text = ""
        txtPrice.Text = ""
        txtQuantity.Text = ""
        _ProductId = ""
        _ProductName = ""
        'lueProduct.Text = ""
        txtDescription.Text = ""
        txtListPrice.Text = ""
        txtMaxstockLevel.Text = ""
        txtSuggestedOrder.Text = ""
        txtStatus.Text = ""
        lblWarning.Visible = False
        CreateRunTimeDatagrid()


    End Sub

    Private Sub txtUPC_Leave(sender As Object, e As EventArgs) Handles txtUPC.Leave
        '==================================================
        ' Set UserOptions Defaults ssommerfeldt 9-18-2014
        '==================================================
        'Call Application.UserOptions.SetAsString("TACAddEditOrderProductDefaultShowFocus", "TAC", "txtSKU", False)


        If txtUPC.Text = "" Then
            Exit Sub ' If it is Blank Then Exit
        End If

        'Clear the product fields before search
        ClearProductInfo()
        'txtUPC.Text = ""
        'lueProduct.Text = ""
        'lueProduct.LookupID = ""
        _ProductId = ""

        ''WareHouseId = GetWareHouseId(txtSalesOrderId.Text) 'load this on form show
        'Dim Productid
        'Dim filter

        ''Specify filters by order type - loaded on form show
        If _OrderType = "Sales Order" Then
            'For Sales Orders restrict by warehouse and do Not Include Returns
            _filter = "UPC = '" & txtUPC.Text & "' AND WAREHOUSEID = '" & _WareHouseId & "'"
            _filter = _filter & " AND Family <> 'Exchange Returns'  AND Status <> 'Deleted'"

            _ProductId = GetField("PRODUCTID", "PRODUCT", _filter, My.Settings.SLXConnectionString)
            'Productid = GetField("PRODUCTID","PRODUCT","ACTUALID = '" & txtSKU.Text & "' AND WAREHOUSEID = '" & WareHouseId & "'")
        End If
        'ElseIf OrderType = "Return Order" Then
        '    'For Return orders, limit the family and status values, and restrict warehouse
        '    filter = "ACTUALID = '" & txtSKU.Text & "' AND WAREHOUSEID = '" & WareHouseId & "'"
        '    filter = filter & " AND Family = 'Exchange Returns' AND Family <> 'Bulk Products' AND Status <> 'Deleted'"

        '    Productid = GetField("PRODUCTID", "PRODUCT", filter)

        'ElseIf OrderType = "Transfer Order" Then
        '    'For Transfer orders, limit the family and status values, and restrict warehouse
        '    filter = "ACTUALID = '" & txtSKU.Text & "' AND WAREHOUSEID = '" & WareHouseId & "'"
        '    filter = filter & " AND Family <> 'Bulk Products' AND Status <> 'Deleted'"

        '    Productid = GetField("PRODUCTID", "PRODUCT", filter)

        'ElseIf OrderType = "Purchase Order" Then
        '    'For Sales Orders restrict by warehouse and do Not Include Returns
        '    filter = "ACTUALID = '" & txtSKU.Text & "' AND WAREHOUSEID = '" & WareHouseId & "'"
        '    filter = filter & " AND Family <> 'Exchange Returns'  AND Status <> 'Deleted'"

        '    Productid = GetField("PRODUCTID", "PRODUCT", filter)

        'End If


        If _ProductId <> "" Then
            _LastControlForSearch = "txtUPC"
            GetProductInfo(_ProductId)
            txtQuantity.Select()
            'Call CreateRuntimeDataGrid(Productid, dgHistory)
            CreateRunTimeDatagrid()
        End If
    End Sub

    Private Sub txtSKU_KeyDown(sender As Object, e As KeyEventArgs) Handles txtSKU.KeyDown
        If e.KeyCode = Keys.Enter Then
            txtSKU_Leave(sender, e)
        End If
    End Sub

    Private Sub txtUPC_KeyDown(sender As Object, e As KeyEventArgs) Handles txtUPC.KeyDown

        If e.KeyCode = Keys.Enter Then
            txtUPC_Leave(sender, e)
        End If
    End Sub








#End Region



End Class