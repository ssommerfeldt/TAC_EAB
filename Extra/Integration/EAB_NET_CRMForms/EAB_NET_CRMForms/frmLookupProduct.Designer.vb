<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class frmLookupProduct
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(frmLookupProduct))
        Me.dgResults = New System.Windows.Forms.DataGridView()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.cboFilterBy = New System.Windows.Forms.ComboBox()
        Me.txtSearchfor = New System.Windows.Forms.TextBox()
        Me.cmdOK = New System.Windows.Forms.Button()
        Me.cmdSearch = New System.Windows.Forms.Button()
        Me.Label2 = New System.Windows.Forms.Label()
        CType(Me.dgResults, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'dgResults
        '
        Me.dgResults.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize
        Me.dgResults.Dock = System.Windows.Forms.DockStyle.Bottom
        Me.dgResults.Location = New System.Drawing.Point(0, 87)
        Me.dgResults.Margin = New System.Windows.Forms.Padding(2)
        Me.dgResults.Name = "dgResults"
        Me.dgResults.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect
        Me.dgResults.Size = New System.Drawing.Size(806, 166)
        Me.dgResults.TabIndex = 74
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Font = New System.Drawing.Font("Arial", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label1.ForeColor = System.Drawing.SystemColors.ControlText
        Me.Label1.Location = New System.Drawing.Point(6, 52)
        Me.Label1.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(92, 19)
        Me.Label1.TabIndex = 73
        Me.Label1.Text = "Search By:"
        '
        'cboFilterBy
        '
        Me.cboFilterBy.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList
        Me.cboFilterBy.Font = New System.Drawing.Font("Trebuchet MS", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.cboFilterBy.FormattingEnabled = True
        Me.cboFilterBy.Items.AddRange(New Object() {"SKU", "UPC"})
        Me.cboFilterBy.Location = New System.Drawing.Point(124, 44)
        Me.cboFilterBy.Margin = New System.Windows.Forms.Padding(2)
        Me.cboFilterBy.Name = "cboFilterBy"
        Me.cboFilterBy.Size = New System.Drawing.Size(214, 34)
        Me.cboFilterBy.TabIndex = 72
        '
        'txtSearchfor
        '
        Me.txtSearchfor.Font = New System.Drawing.Font("Trebuchet MS", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtSearchfor.Location = New System.Drawing.Point(124, 6)
        Me.txtSearchfor.Margin = New System.Windows.Forms.Padding(2, 3, 2, 3)
        Me.txtSearchfor.Multiline = True
        Me.txtSearchfor.Name = "txtSearchfor"
        Me.txtSearchfor.Size = New System.Drawing.Size(214, 33)
        Me.txtSearchfor.TabIndex = 68
        '
        'cmdOK
        '
        Me.cmdOK.DialogResult = System.Windows.Forms.DialogResult.OK
        Me.cmdOK.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.cmdOK.Location = New System.Drawing.Point(466, 6)
        Me.cmdOK.Margin = New System.Windows.Forms.Padding(2)
        Me.cmdOK.Name = "cmdOK"
        Me.cmdOK.Size = New System.Drawing.Size(92, 36)
        Me.cmdOK.TabIndex = 71
        Me.cmdOK.Text = "OK"
        Me.cmdOK.UseVisualStyleBackColor = True
        '
        'cmdSearch
        '
        Me.cmdSearch.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.cmdSearch.Image = CType(resources.GetObject("cmdSearch.Image"), System.Drawing.Image)
        Me.cmdSearch.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft
        Me.cmdSearch.Location = New System.Drawing.Point(359, 5)
        Me.cmdSearch.Margin = New System.Windows.Forms.Padding(2, 3, 2, 3)
        Me.cmdSearch.Name = "cmdSearch"
        Me.cmdSearch.Size = New System.Drawing.Size(92, 36)
        Me.cmdSearch.TabIndex = 70
        Me.cmdSearch.Text = "Search"
        Me.cmdSearch.UseVisualStyleBackColor = True
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Font = New System.Drawing.Font("Arial", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label2.ForeColor = System.Drawing.SystemColors.ControlText
        Me.Label2.Location = New System.Drawing.Point(8, 14)
        Me.Label2.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(92, 19)
        Me.Label2.TabIndex = 69
        Me.Label2.Text = "Search for:"
        '
        'frmLookupProduct
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(8.0!, 16.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(806, 253)
        Me.Controls.Add(Me.dgResults)
        Me.Controls.Add(Me.Label1)
        Me.Controls.Add(Me.cboFilterBy)
        Me.Controls.Add(Me.txtSearchfor)
        Me.Controls.Add(Me.cmdOK)
        Me.Controls.Add(Me.cmdSearch)
        Me.Controls.Add(Me.Label2)
        Me.Name = "frmLookupProduct"
        Me.Text = "Lookup Product"
        CType(Me.dgResults, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents dgResults As DataGridView
    Friend WithEvents Label1 As Label
    Friend WithEvents cboFilterBy As ComboBox
    Friend WithEvents txtSearchfor As TextBox
    Friend WithEvents cmdOK As Button
    Friend WithEvents cmdSearch As Button
    Friend WithEvents Label2 As Label
End Class
