
Imports System.Data.OleDb

Public Class UserControl1 : Inherits FX.SalesLogix.NetExtensionsHelper.SalesLogixControl


    Private Sub UserControl1_SalesLogixRecordChanged(ByVal RecordID As String)
        'Using conn As OleDbConnection = New OleDbConnection(Me.SlxApplication.ConnectionString)
        '    conn.Open()

        '    Using da As OleDbDataAdapter = New OleDbDataAdapter(String.Format("select lastname as LastName, firstname as FirstName, type as Type from contact where accountid = '{0}'", RecordID), conn)
        '        Dim table As DataTable = New DataTable()
        '        da.Fill(table)
        '        'dataGridView1.DataSource = table
        '    End Using
        'End Using
    End Sub
End Class
