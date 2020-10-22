<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Partial Class frmLookupProduct
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()>
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        If disposing AndAlso components IsNot Nothing Then
            components.Dispose()
        End If
        MyBase.Dispose(disposing)
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()>
    Private Sub InitializeComponent()
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(frmLookupProduct))
        Me.txtSearchfor = New System.Windows.Forms.TextBox()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.cmdSearch = New System.Windows.Forms.Button()
        Me.cmdOK = New System.Windows.Forms.Button()
        Me.cboFilterBy = New System.Windows.Forms.ComboBox()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.dgResults = New System.Windows.Forms.DataGridView()
        CType(Me.dgResults, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'txtSearchfor
        '
        Me.txtSearchfor.Font = New System.Drawing.Font("Trebuchet MS", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtSearchfor.Location = New System.Drawing.Point(81, 13)
        Me.txtSearchfor.Margin = New System.Windows.Forms.Padding(2, 3, 2, 3)
        Me.txtSearchfor.Multiline = True
        Me.txtSearchfor.Name = "txtSearchfor"
        Me.txtSearchfor.Size = New System.Drawing.Size(214, 33)
        Me.txtSearchfor.TabIndex = 4
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Font = New System.Drawing.Font("Arial", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label2.ForeColor = System.Drawing.SystemColors.ControlText
        Me.Label2.Location = New System.Drawing.Point(8, 20)
        Me.Label2.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(71, 16)
        Me.Label2.TabIndex = 6
        Me.Label2.Text = "Search for:"
        '
        'cmdSearch
        '
        Me.cmdSearch.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.cmdSearch.Image = CType(resources.GetObject("cmdSearch.Image"), System.Drawing.Image)
        Me.cmdSearch.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft
        Me.cmdSearch.Location = New System.Drawing.Point(316, 12)
        Me.cmdSearch.Margin = New System.Windows.Forms.Padding(2, 3, 2, 3)
        Me.cmdSearch.Name = "cmdSearch"
        Me.cmdSearch.Size = New System.Drawing.Size(92, 36)
        Me.cmdSearch.TabIndex = 63
        Me.cmdSearch.Text = "Search"
        Me.cmdSearch.UseVisualStyleBackColor = True
        '
        'cmdOK
        '
        Me.cmdOK.DialogResult = System.Windows.Forms.DialogResult.OK
        Me.cmdOK.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.cmdOK.Location = New System.Drawing.Point(423, 13)
        Me.cmdOK.Margin = New System.Windows.Forms.Padding(2)
        Me.cmdOK.Name = "cmdOK"
        Me.cmdOK.Size = New System.Drawing.Size(92, 36)
        Me.cmdOK.TabIndex = 64
        Me.cmdOK.Text = "OK"
        Me.cmdOK.UseVisualStyleBackColor = True
        '
        'cboFilterBy
        '
        Me.cboFilterBy.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList
        Me.cboFilterBy.Font = New System.Drawing.Font("Trebuchet MS", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.cboFilterBy.FormattingEnabled = True
        Me.cboFilterBy.Items.AddRange(New Object() {"SKU", "UPC"})
        Me.cboFilterBy.Location = New System.Drawing.Point(81, 51)
        Me.cboFilterBy.Margin = New System.Windows.Forms.Padding(2)
        Me.cboFilterBy.Name = "cboFilterBy"
        Me.cboFilterBy.Size = New System.Drawing.Size(214, 30)
        Me.cboFilterBy.TabIndex = 65
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Font = New System.Drawing.Font("Arial", 9.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label1.ForeColor = System.Drawing.SystemColors.ControlText
        Me.Label1.Location = New System.Drawing.Point(6, 58)
        Me.Label1.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(73, 16)
        Me.Label1.TabIndex = 66
        Me.Label1.Text = "Search By:"
        '
        'dgResults
        '
        Me.dgResults.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize
        Me.dgResults.Dock = System.Windows.Forms.DockStyle.Bottom
        Me.dgResults.Location = New System.Drawing.Point(0, 85)
        Me.dgResults.Margin = New System.Windows.Forms.Padding(2)
        Me.dgResults.Name = "dgResults"
        Me.dgResults.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect
        Me.dgResults.Size = New System.Drawing.Size(669, 166)
        Me.dgResults.TabIndex = 67
        '
        'frmLookupProduct
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 16.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(669, 251)
        Me.Controls.Add(Me.dgResults)
        Me.Controls.Add(Me.Label1)
        Me.Controls.Add(Me.cboFilterBy)
        Me.Controls.Add(Me.txtSearchfor)
        Me.Controls.Add(Me.cmdOK)
        Me.Controls.Add(Me.cmdSearch)
        Me.Controls.Add(Me.Label2)
        Me.Font = New System.Drawing.Font("Trebuchet MS", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.Name = "frmLookupProduct"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterParent
        Me.Text = "Lookup Product"
        CType(Me.dgResults, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub
    Friend WithEvents txtSearchfor As System.Windows.Forms.TextBox
    Friend WithEvents Label2 As System.Windows.Forms.Label
    Friend WithEvents cmdSearch As System.Windows.Forms.Button
    Friend WithEvents cmdOK As System.Windows.Forms.Button
    Friend WithEvents cboFilterBy As System.Windows.Forms.ComboBox
    Friend WithEvents Label1 As System.Windows.Forms.Label
    Friend WithEvents dgResults As System.Windows.Forms.DataGridView
End Class
