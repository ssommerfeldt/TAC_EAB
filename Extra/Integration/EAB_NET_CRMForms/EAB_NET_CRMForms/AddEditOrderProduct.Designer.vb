<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class AddEditOrderProduct
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(AddEditOrderProduct))
        Me.cmdSave = New System.Windows.Forms.Button()
        Me.cmdSearchUPC = New System.Windows.Forms.Button()
        Me.cmdSearchSKU = New System.Windows.Forms.Button()
        Me.DataGridView1 = New System.Windows.Forms.DataGridView()
        Me.lblWarning = New System.Windows.Forms.Label()
        Me.txtStatus = New System.Windows.Forms.TextBox()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.txtSuggestedOrder = New System.Windows.Forms.TextBox()
        Me.lblSuggestedOrder = New System.Windows.Forms.Label()
        Me.txtMaxstockLevel = New System.Windows.Forms.TextBox()
        Me.txtExtendedPrice = New System.Windows.Forms.TextBox()
        Me.Label10 = New System.Windows.Forms.Label()
        Me.Label11 = New System.Windows.Forms.Label()
        Me.txtMargin = New System.Windows.Forms.TextBox()
        Me.txtPrice = New System.Windows.Forms.TextBox()
        Me.lblMargin = New System.Windows.Forms.Label()
        Me.lblPrice = New System.Windows.Forms.Label()
        Me.txtListPrice = New System.Windows.Forms.TextBox()
        Me.txtQuantity = New System.Windows.Forms.TextBox()
        Me.Label4 = New System.Windows.Forms.Label()
        Me.txtUPC = New System.Windows.Forms.TextBox()
        Me.txtSKU = New System.Windows.Forms.TextBox()
        Me.Label3 = New System.Windows.Forms.Label()
        Me.lblSKU = New System.Windows.Forms.Label()
        Me.lblDescription = New System.Windows.Forms.Label()
        Me.txtDescription = New System.Windows.Forms.TextBox()
        Me.lblHeader = New System.Windows.Forms.Label()
        Me.PictureBox1 = New System.Windows.Forms.PictureBox()
        Me.lblQuantity = New System.Windows.Forms.Label()
        Me.Panel1 = New System.Windows.Forms.Panel()
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.Panel1.SuspendLayout()
        Me.SuspendLayout()
        '
        'cmdSave
        '
        Me.cmdSave.Image = CType(resources.GetObject("cmdSave.Image"), System.Drawing.Image)
        Me.cmdSave.Location = New System.Drawing.Point(839, 92)
        Me.cmdSave.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.cmdSave.Name = "cmdSave"
        Me.cmdSave.Size = New System.Drawing.Size(105, 58)
        Me.cmdSave.TabIndex = 6
        Me.cmdSave.UseVisualStyleBackColor = True
        '
        'cmdSearchUPC
        '
        Me.cmdSearchUPC.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.cmdSearchUPC.Image = CType(resources.GetObject("cmdSearchUPC.Image"), System.Drawing.Image)
        Me.cmdSearchUPC.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft
        Me.cmdSearchUPC.Location = New System.Drawing.Point(423, 265)
        Me.cmdSearchUPC.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.cmdSearchUPC.Name = "cmdSearchUPC"
        Me.cmdSearchUPC.Size = New System.Drawing.Size(111, 39)
        Me.cmdSearchUPC.TabIndex = 93
        Me.cmdSearchUPC.Text = "Search"
        Me.cmdSearchUPC.TextAlign = System.Drawing.ContentAlignment.MiddleRight
        Me.cmdSearchUPC.UseVisualStyleBackColor = True
        '
        'cmdSearchSKU
        '
        Me.cmdSearchSKU.Font = New System.Drawing.Font("Tahoma", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.cmdSearchSKU.Image = CType(resources.GetObject("cmdSearchSKU.Image"), System.Drawing.Image)
        Me.cmdSearchSKU.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft
        Me.cmdSearchSKU.Location = New System.Drawing.Point(423, 206)
        Me.cmdSearchSKU.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.cmdSearchSKU.Name = "cmdSearchSKU"
        Me.cmdSearchSKU.Size = New System.Drawing.Size(111, 39)
        Me.cmdSearchSKU.TabIndex = 92
        Me.cmdSearchSKU.Text = "Search"
        Me.cmdSearchSKU.TextAlign = System.Drawing.ContentAlignment.MiddleRight
        Me.cmdSearchSKU.UseVisualStyleBackColor = True
        '
        'DataGridView1
        '
        Me.DataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize
        Me.DataGridView1.Location = New System.Drawing.Point(66, 511)
        Me.DataGridView1.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.DataGridView1.Name = "DataGridView1"
        Me.DataGridView1.RowHeadersWidth = 62
        Me.DataGridView1.Size = New System.Drawing.Size(878, 231)
        Me.DataGridView1.TabIndex = 91
        '
        'lblWarning
        '
        Me.lblWarning.AutoSize = True
        Me.lblWarning.BackColor = System.Drawing.Color.OrangeRed
        Me.lblWarning.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblWarning.Location = New System.Drawing.Point(666, 472)
        Me.lblWarning.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.lblWarning.Name = "lblWarning"
        Me.lblWarning.Size = New System.Drawing.Size(269, 29)
        Me.lblWarning.TabIndex = 90
        Me.lblWarning.Text = "Item not on StackCard"
        '
        'txtStatus
        '
        Me.txtStatus.Location = New System.Drawing.Point(147, 321)
        Me.txtStatus.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.txtStatus.Name = "txtStatus"
        Me.txtStatus.ReadOnly = True
        Me.txtStatus.Size = New System.Drawing.Size(271, 26)
        Me.txtStatus.TabIndex = 89
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Location = New System.Drawing.Point(57, 326)
        Me.Label1.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(56, 20)
        Me.Label1.TabIndex = 88
        Me.Label1.Text = "Status"
        '
        'txtSuggestedOrder
        '
        Me.txtSuggestedOrder.Location = New System.Drawing.Point(670, 438)
        Me.txtSuggestedOrder.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.txtSuggestedOrder.Name = "txtSuggestedOrder"
        Me.txtSuggestedOrder.ReadOnly = True
        Me.txtSuggestedOrder.Size = New System.Drawing.Size(271, 26)
        Me.txtSuggestedOrder.TabIndex = 87
        '
        'lblSuggestedOrder
        '
        Me.lblSuggestedOrder.AutoSize = True
        Me.lblSuggestedOrder.Location = New System.Drawing.Point(543, 441)
        Me.lblSuggestedOrder.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.lblSuggestedOrder.Name = "lblSuggestedOrder"
        Me.lblSuggestedOrder.Size = New System.Drawing.Size(131, 20)
        Me.lblSuggestedOrder.TabIndex = 86
        Me.lblSuggestedOrder.Text = "Suggested Order"
        '
        'txtMaxstockLevel
        '
        Me.txtMaxstockLevel.Location = New System.Drawing.Point(670, 399)
        Me.txtMaxstockLevel.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.txtMaxstockLevel.Name = "txtMaxstockLevel"
        Me.txtMaxstockLevel.ReadOnly = True
        Me.txtMaxstockLevel.Size = New System.Drawing.Size(271, 26)
        Me.txtMaxstockLevel.TabIndex = 85
        '
        'txtExtendedPrice
        '
        Me.txtExtendedPrice.Location = New System.Drawing.Point(670, 360)
        Me.txtExtendedPrice.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.txtExtendedPrice.Name = "txtExtendedPrice"
        Me.txtExtendedPrice.ReadOnly = True
        Me.txtExtendedPrice.Size = New System.Drawing.Size(271, 26)
        Me.txtExtendedPrice.TabIndex = 84
        '
        'Label10
        '
        Me.Label10.AutoSize = True
        Me.Label10.Location = New System.Drawing.Point(543, 404)
        Me.Label10.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label10.Name = "Label10"
        Me.Label10.Size = New System.Drawing.Size(124, 20)
        Me.Label10.TabIndex = 83
        Me.Label10.Text = "Max Stock Level"
        '
        'Label11
        '
        Me.Label11.AutoSize = True
        Me.Label11.Location = New System.Drawing.Point(543, 365)
        Me.Label11.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label11.Name = "Label11"
        Me.Label11.Size = New System.Drawing.Size(116, 20)
        Me.Label11.TabIndex = 82
        Me.Label11.Text = "Extended Price"
        '
        'txtMargin
        '
        Me.txtMargin.Location = New System.Drawing.Point(670, 321)
        Me.txtMargin.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.txtMargin.Name = "txtMargin"
        Me.txtMargin.Size = New System.Drawing.Size(271, 26)
        Me.txtMargin.TabIndex = 5
        '
        'txtPrice
        '
        Me.txtPrice.Location = New System.Drawing.Point(670, 284)
        Me.txtPrice.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.txtPrice.Name = "txtPrice"
        Me.txtPrice.Size = New System.Drawing.Size(271, 26)
        Me.txtPrice.TabIndex = 4
        '
        'lblMargin
        '
        Me.lblMargin.AutoSize = True
        Me.lblMargin.Location = New System.Drawing.Point(543, 326)
        Me.lblMargin.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.lblMargin.Name = "lblMargin"
        Me.lblMargin.Size = New System.Drawing.Size(57, 20)
        Me.lblMargin.TabIndex = 79
        Me.lblMargin.Text = "Margin"
        '
        'lblPrice
        '
        Me.lblPrice.AutoSize = True
        Me.lblPrice.Location = New System.Drawing.Point(543, 288)
        Me.lblPrice.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.lblPrice.Name = "lblPrice"
        Me.lblPrice.Size = New System.Drawing.Size(44, 20)
        Me.lblPrice.TabIndex = 78
        Me.lblPrice.Text = "Price"
        '
        'txtListPrice
        '
        Me.txtListPrice.Location = New System.Drawing.Point(670, 245)
        Me.txtListPrice.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.txtListPrice.Name = "txtListPrice"
        Me.txtListPrice.ReadOnly = True
        Me.txtListPrice.Size = New System.Drawing.Size(271, 26)
        Me.txtListPrice.TabIndex = 77
        '
        'txtQuantity
        '
        Me.txtQuantity.AcceptsTab = True
        Me.txtQuantity.Location = New System.Drawing.Point(670, 206)
        Me.txtQuantity.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.txtQuantity.Name = "txtQuantity"
        Me.txtQuantity.Size = New System.Drawing.Size(271, 26)
        Me.txtQuantity.TabIndex = 3
        '
        'Label4
        '
        Me.Label4.AutoSize = True
        Me.Label4.Location = New System.Drawing.Point(543, 250)
        Me.Label4.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(73, 20)
        Me.Label4.TabIndex = 75
        Me.Label4.Text = "List Price"
        '
        'txtUPC
        '
        Me.txtUPC.Location = New System.Drawing.Point(147, 270)
        Me.txtUPC.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.txtUPC.Name = "txtUPC"
        Me.txtUPC.Size = New System.Drawing.Size(271, 26)
        Me.txtUPC.TabIndex = 2
        '
        'txtSKU
        '
        Me.txtSKU.Location = New System.Drawing.Point(147, 211)
        Me.txtSKU.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.txtSKU.Name = "txtSKU"
        Me.txtSKU.Size = New System.Drawing.Size(271, 26)
        Me.txtSKU.TabIndex = 1
        '
        'Label3
        '
        Me.Label3.AutoSize = True
        Me.Label3.Location = New System.Drawing.Point(62, 270)
        Me.Label3.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label3.Name = "Label3"
        Me.Label3.Size = New System.Drawing.Size(42, 20)
        Me.Label3.TabIndex = 71
        Me.Label3.Text = "UPC"
        '
        'lblSKU
        '
        Me.lblSKU.AutoSize = True
        Me.lblSKU.Location = New System.Drawing.Point(57, 218)
        Me.lblSKU.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.lblSKU.Name = "lblSKU"
        Me.lblSKU.Size = New System.Drawing.Size(42, 20)
        Me.lblSKU.TabIndex = 70
        Me.lblSKU.Text = "SKU"
        '
        'lblDescription
        '
        Me.lblDescription.AutoSize = True
        Me.lblDescription.Location = New System.Drawing.Point(53, 165)
        Me.lblDescription.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.lblDescription.Name = "lblDescription"
        Me.lblDescription.Size = New System.Drawing.Size(89, 20)
        Me.lblDescription.TabIndex = 69
        Me.lblDescription.Text = "Description"
        '
        'txtDescription
        '
        Me.txtDescription.Location = New System.Drawing.Point(147, 160)
        Me.txtDescription.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.txtDescription.Name = "txtDescription"
        Me.txtDescription.Size = New System.Drawing.Size(795, 26)
        Me.txtDescription.TabIndex = 0
        '
        'lblHeader
        '
        Me.lblHeader.AutoSize = True
        Me.lblHeader.Font = New System.Drawing.Font("Trebuchet MS", 27.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblHeader.ForeColor = System.Drawing.Color.White
        Me.lblHeader.Location = New System.Drawing.Point(429, 42)
        Me.lblHeader.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.lblHeader.Name = "lblHeader"
        Me.lblHeader.Size = New System.Drawing.Size(354, 70)
        Me.lblHeader.TabIndex = 1
        Me.lblHeader.Text = "Add Product"
        '
        'PictureBox1
        '
        Me.PictureBox1.Image = CType(resources.GetObject("PictureBox1.Image"), System.Drawing.Image)
        Me.PictureBox1.Location = New System.Drawing.Point(-98, 0)
        Me.PictureBox1.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.PictureBox1.Name = "PictureBox1"
        Me.PictureBox1.Size = New System.Drawing.Size(518, 154)
        Me.PictureBox1.TabIndex = 0
        Me.PictureBox1.TabStop = False
        '
        'lblQuantity
        '
        Me.lblQuantity.AutoSize = True
        Me.lblQuantity.Location = New System.Drawing.Point(543, 211)
        Me.lblQuantity.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.lblQuantity.Name = "lblQuantity"
        Me.lblQuantity.Size = New System.Drawing.Size(68, 20)
        Me.lblQuantity.TabIndex = 74
        Me.lblQuantity.Text = "Quantity"
        '
        'Panel1
        '
        Me.Panel1.BackColor = System.Drawing.SystemColors.Highlight
        Me.Panel1.Controls.Add(Me.lblHeader)
        Me.Panel1.Controls.Add(Me.PictureBox1)
        Me.Panel1.Dock = System.Windows.Forms.DockStyle.Top
        Me.Panel1.Location = New System.Drawing.Point(0, 0)
        Me.Panel1.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(991, 154)
        Me.Panel1.TabIndex = 66
        '
        'AddEditOrderProduct
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(9.0!, 20.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(991, 681)
        Me.Controls.Add(Me.cmdSave)
        Me.Controls.Add(Me.cmdSearchUPC)
        Me.Controls.Add(Me.cmdSearchSKU)
        Me.Controls.Add(Me.DataGridView1)
        Me.Controls.Add(Me.lblWarning)
        Me.Controls.Add(Me.txtStatus)
        Me.Controls.Add(Me.Label1)
        Me.Controls.Add(Me.txtSuggestedOrder)
        Me.Controls.Add(Me.lblSuggestedOrder)
        Me.Controls.Add(Me.txtMaxstockLevel)
        Me.Controls.Add(Me.txtExtendedPrice)
        Me.Controls.Add(Me.Label10)
        Me.Controls.Add(Me.Label11)
        Me.Controls.Add(Me.txtMargin)
        Me.Controls.Add(Me.txtPrice)
        Me.Controls.Add(Me.lblMargin)
        Me.Controls.Add(Me.lblPrice)
        Me.Controls.Add(Me.txtListPrice)
        Me.Controls.Add(Me.txtQuantity)
        Me.Controls.Add(Me.Label4)
        Me.Controls.Add(Me.txtUPC)
        Me.Controls.Add(Me.txtSKU)
        Me.Controls.Add(Me.Label3)
        Me.Controls.Add(Me.lblSKU)
        Me.Controls.Add(Me.lblDescription)
        Me.Controls.Add(Me.txtDescription)
        Me.Controls.Add(Me.lblQuantity)
        Me.Controls.Add(Me.Panel1)
        Me.Margin = New System.Windows.Forms.Padding(3, 4, 3, 4)
        Me.Name = "AddEditOrderProduct"
        Me.Text = "AddEditOrderProduct"
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.Panel1.ResumeLayout(False)
        Me.Panel1.PerformLayout()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents cmdSave As Button
    Friend WithEvents cmdSearchUPC As Button
    Friend WithEvents cmdSearchSKU As Button
    Friend WithEvents DataGridView1 As DataGridView
    Friend WithEvents lblWarning As Label
    Friend WithEvents txtStatus As TextBox
    Friend WithEvents Label1 As Label
    Friend WithEvents txtSuggestedOrder As TextBox
    Friend WithEvents lblSuggestedOrder As Label
    Friend WithEvents txtMaxstockLevel As TextBox
    Friend WithEvents txtExtendedPrice As TextBox
    Friend WithEvents Label10 As Label
    Friend WithEvents Label11 As Label
    Friend WithEvents txtMargin As TextBox
    Friend WithEvents txtPrice As TextBox
    Friend WithEvents lblMargin As Label
    Friend WithEvents lblPrice As Label
    Friend WithEvents txtListPrice As TextBox
    Friend WithEvents txtQuantity As TextBox
    Friend WithEvents Label4 As Label
    Friend WithEvents txtUPC As TextBox
    Friend WithEvents txtSKU As TextBox
    Friend WithEvents Label3 As Label
    Friend WithEvents lblSKU As Label
    Friend WithEvents lblDescription As Label
    Friend WithEvents txtDescription As TextBox
    Friend WithEvents lblHeader As Label
    Friend WithEvents PictureBox1 As PictureBox
    Friend WithEvents lblQuantity As Label
    Friend WithEvents Panel1 As Panel
End Class
