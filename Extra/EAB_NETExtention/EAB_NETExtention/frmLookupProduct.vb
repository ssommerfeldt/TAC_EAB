Imports System.Data
Imports System.Data.Common
Imports System.Data.OleDb
Imports System.Windows.Forms

Public Class frmLookupProduct
    Private SQL As String = ""
    Private _strConn As String = ""
    Private _Filter As String = ""
    Private _ProductId As String = ""
    Private _SKU As String
    Private _UPC As String = ""

    Property mProductId() As String
        Get
            Return _ProductId
        End Get
        Set(ByVal value As String)
            _ProductId = value
        End Set
    End Property

    Property mFilter() As String
        Get
            Return _Filter
        End Get
        Set(ByVal value As String)
            _Filter = value
        End Set
    End Property
    Property mSKU() As String
        Get
            Return _SKU
        End Get
        Set(ByVal value As String)
            _SKU = value
        End Set
    End Property
    Property mUPC() As String
        Get
            Return _UPC
        End Get
        Set(ByVal value As String)
            _UPC = value
        End Set
    End Property

    Public Sub New(ByVal StrConn As String)

        ' This call is required by the Windows Form Designer.
        InitializeComponent()
        _strConn = StrConn
        ' Add any initialization after the InitializeComponent() call.

    End Sub





    Private Sub cboSearchby_KeyDown(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs)
        e.Handled = True 'Read Only
    End Sub

    Private Sub cboSearchby_KeyPress(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyPressEventArgs)
        e.Handled = True 'Read Only
    End Sub
    Public Sub GetInfo()
        Dim SQL As String
        '==========================================
        ' Dynamically create the SQL String
        '==========================================
        SQL = "Select Top 100 Productid"
        SQL = SQL & " , Family as Category"
        SQL = SQL & " , Name"
        SQL = SQL & " , ActualId as SKU"
        SQL = SQL & " , UPC "
        SQL = SQL & "  From sysdba.Product WHERE PRODUCTID "
        SQL = SQL & _Filter
        If txtSearchfor.Text <> "" Then
            Select Case cboFilterBy.Text
                Case "SKU"
                    SQL = SQL & "  And ACTUALID  Like '" & txtSearchfor.Text & "%'"
                    SQL = SQL & "  Order by ACTUALID ASC"
                Case "UPC"
                    SQL = SQL & "  And UPC  Like '" & txtSearchfor.Text & "%'"
                    SQL = SQL & "  Order by UPC ASC"

            End Select

        End If
        '==================================================


        'create the connection
        Dim conn As New OleDbConnection(_strConn)
        Try
            'open connection
            conn.Open()
            'create the DataAdapter. it will internally create a command object
            Dim da As New OleDbDataAdapter(SQL, conn)

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
            dgResults.DataSource = table
            dgResults.Columns.Item("Productid").Visible = False  ' Hide the ProductId Column
            'dgResults.Columns(0).AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCells
            dgResults.Columns(1).AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCells
            dgResults.Columns(2).AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCells
            dgResults.Columns(3).AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCells
            dgResults.Columns(4).AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill

            'dgResults.AutoResizeColumns()

        Catch ex As Exception
            MessageBox.Show("An error occurred: " & ex.Message, "Error")
        Finally
            conn.Dispose()
            conn = Nothing
        End Try

    End Sub

    Private Sub txtSLast_KeyPress(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyPressEventArgs) Handles txtSearchfor.KeyPress
        If e.KeyChar = Chr(13) Then
            Call GetInfo()
        End If
    End Sub


    Private Sub frmLookupAccount_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        'TODO: This line of code loads data into the 'Ds.PRODUCT' table. You can move, or remove it, as needed.
        Me.ActiveControl = txtSearchfor


    End Sub

    Private Sub cmdSearch_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles cmdSearch.Click
        GetInfo()
    End Sub


    Private Sub cmdOK_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles cmdOK.Click
        'Set the ProductId if Possible
        Try
            _ProductId = dgResults.SelectedRows(0).Cells(0).Value.ToString
            _SKU = dgResults.SelectedRows(0).Cells(3).Value.ToString
            _UPC = dgResults.SelectedRows(0).Cells(4).Value.ToString
            Me.DialogResult = DialogResult.OK

        Catch ex As Exception

        End Try
        Me.DialogResult = DialogResult.OK

    End Sub

    Private Sub dgResults_DoubleClick(ByVal sender As Object, ByVal e As System.EventArgs) Handles dgResults.DoubleClick
        Try
            _ProductId = dgResults.SelectedRows(0).Cells(0).Value.ToString
            _SKU = dgResults.SelectedRows(0).Cells(3).Value.ToString
            _UPC = dgResults.SelectedRows(0).Cells(4).Value.ToString
            Me.DialogResult = DialogResult.OK
        Catch ex As Exception

        End Try

        Me.DialogResult = DialogResult.OK
    End Sub

    Private Sub dgResults_CellContentClick(sender As Object, e As DataGridViewCellEventArgs) Handles dgResults.CellContentClick

    End Sub

    Private Sub dgResults_Click(sender As Object, e As EventArgs) Handles dgResults.Click
        Try
            _ProductId = dgResults.SelectedRows(0).Cells(0).Value.ToString
            _SKU = dgResults.SelectedRows(0).Cells(3).Value.ToString
            _UPC = dgResults.SelectedRows(0).Cells(4).Value.ToString
            Me.DialogResult = DialogResult.OK
        Catch ex As Exception

        End Try
    End Sub
End Class