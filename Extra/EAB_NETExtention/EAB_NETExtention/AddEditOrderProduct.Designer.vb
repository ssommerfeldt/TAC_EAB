<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class AddEditOrderProduct
    Inherits FX.SalesLogix.NetExtensionsHelper.SalesLogixDialog

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
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.cmdSave = New System.Windows.Forms.Button()
        Me.lblHeader = New System.Windows.Forms.Label()
        Me.PictureBox1 = New System.Windows.Forms.PictureBox()
        Me.txtDescription = New System.Windows.Forms.TextBox()
        Me.lblDescription = New System.Windows.Forms.Label()
        Me.lblSKU = New System.Windows.Forms.Label()
        Me.Label3 = New System.Windows.Forms.Label()
        Me.txtSKU = New System.Windows.Forms.TextBox()
        Me.txtUPC = New System.Windows.Forms.TextBox()
        Me.txtListPrice = New System.Windows.Forms.TextBox()
        Me.txtQuantity = New System.Windows.Forms.TextBox()
        Me.Label4 = New System.Windows.Forms.Label()
        Me.lblQuantity = New System.Windows.Forms.Label()
        Me.txtMargin = New System.Windows.Forms.TextBox()
        Me.txtPrice = New System.Windows.Forms.TextBox()
        Me.lblMargin = New System.Windows.Forms.Label()
        Me.lblPrice = New System.Windows.Forms.Label()
        Me.txtSuggestedOrder = New System.Windows.Forms.TextBox()
        Me.lblSuggestedOrder = New System.Windows.Forms.Label()
        Me.txtMaxstockLevel = New System.Windows.Forms.TextBox()
        Me.txtExtendedPrice = New System.Windows.Forms.TextBox()
        Me.Label10 = New System.Windows.Forms.Label()
        Me.Label11 = New System.Windows.Forms.Label()
        Me.txtStatus = New System.Windows.Forms.TextBox()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.lblWarning = New System.Windows.Forms.Label()
        Me.DataGridView1 = New System.Windows.Forms.DataGridView()
        Me.Panel1.SuspendLayout()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'Panel1
        '
        Me.Panel1.BackColor = System.Drawing.SystemColors.Highlight
        Me.Panel1.Controls.Add(Me.cmdSave)
        Me.Panel1.Controls.Add(Me.lblHeader)
        Me.Panel1.Controls.Add(Me.PictureBox1)
        Me.Panel1.Dock = System.Windows.Forms.DockStyle.Top
        Me.Panel1.Location = New System.Drawing.Point(0, 0)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(658, 100)
        Me.Panel1.TabIndex = 0
        '
        'cmdSave
        '
        Me.cmdSave.Image = CType(resources.GetObject("cmdSave.Image"), System.Drawing.Image)
        Me.cmdSave.Location = New System.Drawing.Point(554, 15)
        Me.cmdSave.Name = "cmdSave"
        Me.cmdSave.Size = New System.Drawing.Size(75, 59)
        Me.cmdSave.TabIndex = 1
        Me.cmdSave.Text = "Button1"
        Me.cmdSave.UseVisualStyleBackColor = True
        '
        'lblHeader
        '
        Me.lblHeader.AutoSize = True
        Me.lblHeader.Font = New System.Drawing.Font("Trebuchet MS", 27.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblHeader.ForeColor = System.Drawing.Color.White
        Me.lblHeader.Location = New System.Drawing.Point(286, 28)
        Me.lblHeader.Name = "lblHeader"
        Me.lblHeader.Size = New System.Drawing.Size(232, 46)
        Me.lblHeader.TabIndex = 1
        Me.lblHeader.Text = "Add Product"
        '
        'PictureBox1
        '
        Me.PictureBox1.Image = CType(resources.GetObject("PictureBox1.Image"), System.Drawing.Image)
        Me.PictureBox1.Location = New System.Drawing.Point(-65, 0)
        Me.PictureBox1.Name = "PictureBox1"
        Me.PictureBox1.Size = New System.Drawing.Size(345, 100)
        Me.PictureBox1.TabIndex = 0
        Me.PictureBox1.TabStop = False
        '
        'txtDescription
        '
        Me.txtDescription.Location = New System.Drawing.Point(98, 144)
        Me.txtDescription.Name = "txtDescription"
        Me.txtDescription.Size = New System.Drawing.Size(531, 20)
        Me.txtDescription.TabIndex = 1
        '
        'lblDescription
        '
        Me.lblDescription.AutoSize = True
        Me.lblDescription.Location = New System.Drawing.Point(35, 147)
        Me.lblDescription.Name = "lblDescription"
        Me.lblDescription.Size = New System.Drawing.Size(60, 13)
        Me.lblDescription.TabIndex = 2
        Me.lblDescription.Text = "Description"
        '
        'lblSKU
        '
        Me.lblSKU.AutoSize = True
        Me.lblSKU.Location = New System.Drawing.Point(38, 181)
        Me.lblSKU.Name = "lblSKU"
        Me.lblSKU.Size = New System.Drawing.Size(29, 13)
        Me.lblSKU.TabIndex = 3
        Me.lblSKU.Text = "SKU"
        '
        'Label3
        '
        Me.Label3.AutoSize = True
        Me.Label3.Location = New System.Drawing.Point(41, 215)
        Me.Label3.Name = "Label3"
        Me.Label3.Size = New System.Drawing.Size(29, 13)
        Me.Label3.TabIndex = 4
        Me.Label3.Text = "UPC"
        '
        'txtSKU
        '
        Me.txtSKU.Location = New System.Drawing.Point(98, 177)
        Me.txtSKU.Name = "txtSKU"
        Me.txtSKU.Size = New System.Drawing.Size(182, 20)
        Me.txtSKU.TabIndex = 5
        '
        'txtUPC
        '
        Me.txtUPC.Location = New System.Drawing.Point(98, 215)
        Me.txtUPC.Name = "txtUPC"
        Me.txtUPC.Size = New System.Drawing.Size(182, 20)
        Me.txtUPC.TabIndex = 6
        '
        'txtListPrice
        '
        Me.txtListPrice.Location = New System.Drawing.Point(447, 199)
        Me.txtListPrice.Name = "txtListPrice"
        Me.txtListPrice.ReadOnly = True
        Me.txtListPrice.Size = New System.Drawing.Size(182, 20)
        Me.txtListPrice.TabIndex = 10
        '
        'txtQuantity
        '
        Me.txtQuantity.Location = New System.Drawing.Point(447, 174)
        Me.txtQuantity.Name = "txtQuantity"
        Me.txtQuantity.Size = New System.Drawing.Size(182, 20)
        Me.txtQuantity.TabIndex = 9
        '
        'Label4
        '
        Me.Label4.AutoSize = True
        Me.Label4.Location = New System.Drawing.Point(362, 202)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(50, 13)
        Me.Label4.TabIndex = 8
        Me.Label4.Text = "List Price"
        '
        'lblQuantity
        '
        Me.lblQuantity.AutoSize = True
        Me.lblQuantity.Location = New System.Drawing.Point(362, 177)
        Me.lblQuantity.Name = "lblQuantity"
        Me.lblQuantity.Size = New System.Drawing.Size(46, 13)
        Me.lblQuantity.TabIndex = 7
        Me.lblQuantity.Text = "Quantity"
        '
        'txtMargin
        '
        Me.txtMargin.Location = New System.Drawing.Point(447, 249)
        Me.txtMargin.Name = "txtMargin"
        Me.txtMargin.Size = New System.Drawing.Size(182, 20)
        Me.txtMargin.TabIndex = 14
        '
        'txtPrice
        '
        Me.txtPrice.Location = New System.Drawing.Point(447, 224)
        Me.txtPrice.Name = "txtPrice"
        Me.txtPrice.Size = New System.Drawing.Size(182, 20)
        Me.txtPrice.TabIndex = 13
        '
        'lblMargin
        '
        Me.lblMargin.AutoSize = True
        Me.lblMargin.Location = New System.Drawing.Point(362, 252)
        Me.lblMargin.Name = "lblMargin"
        Me.lblMargin.Size = New System.Drawing.Size(39, 13)
        Me.lblMargin.TabIndex = 12
        Me.lblMargin.Text = "Margin"
        '
        'lblPrice
        '
        Me.lblPrice.AutoSize = True
        Me.lblPrice.Location = New System.Drawing.Point(362, 227)
        Me.lblPrice.Name = "lblPrice"
        Me.lblPrice.Size = New System.Drawing.Size(31, 13)
        Me.lblPrice.TabIndex = 11
        Me.lblPrice.Text = "Price"
        '
        'txtSuggestedOrder
        '
        Me.txtSuggestedOrder.Location = New System.Drawing.Point(447, 324)
        Me.txtSuggestedOrder.Name = "txtSuggestedOrder"
        Me.txtSuggestedOrder.ReadOnly = True
        Me.txtSuggestedOrder.Size = New System.Drawing.Size(182, 20)
        Me.txtSuggestedOrder.TabIndex = 21
        '
        'lblSuggestedOrder
        '
        Me.lblSuggestedOrder.AutoSize = True
        Me.lblSuggestedOrder.Location = New System.Drawing.Point(362, 327)
        Me.lblSuggestedOrder.Name = "lblSuggestedOrder"
        Me.lblSuggestedOrder.Size = New System.Drawing.Size(87, 13)
        Me.lblSuggestedOrder.TabIndex = 19
        Me.lblSuggestedOrder.Text = "Suggested Order"
        '
        'txtMaxstockLevel
        '
        Me.txtMaxstockLevel.Location = New System.Drawing.Point(447, 299)
        Me.txtMaxstockLevel.Name = "txtMaxstockLevel"
        Me.txtMaxstockLevel.ReadOnly = True
        Me.txtMaxstockLevel.Size = New System.Drawing.Size(182, 20)
        Me.txtMaxstockLevel.TabIndex = 18
        '
        'txtExtendedPrice
        '
        Me.txtExtendedPrice.Location = New System.Drawing.Point(447, 274)
        Me.txtExtendedPrice.Name = "txtExtendedPrice"
        Me.txtExtendedPrice.ReadOnly = True
        Me.txtExtendedPrice.Size = New System.Drawing.Size(182, 20)
        Me.txtExtendedPrice.TabIndex = 17
        '
        'Label10
        '
        Me.Label10.AutoSize = True
        Me.Label10.Location = New System.Drawing.Point(362, 302)
        Me.Label10.Name = "Label10"
        Me.Label10.Size = New System.Drawing.Size(87, 13)
        Me.Label10.TabIndex = 16
        Me.Label10.Text = "Max Stock Level"
        '
        'Label11
        '
        Me.Label11.AutoSize = True
        Me.Label11.Location = New System.Drawing.Point(362, 277)
        Me.Label11.Name = "Label11"
        Me.Label11.Size = New System.Drawing.Size(79, 13)
        Me.Label11.TabIndex = 15
        Me.Label11.Text = "Extended Price"
        '
        'txtStatus
        '
        Me.txtStatus.Location = New System.Drawing.Point(98, 249)
        Me.txtStatus.Name = "txtStatus"
        Me.txtStatus.ReadOnly = True
        Me.txtStatus.Size = New System.Drawing.Size(182, 20)
        Me.txtStatus.TabIndex = 24
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Location = New System.Drawing.Point(38, 252)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(37, 13)
        Me.Label1.TabIndex = 23
        Me.Label1.Text = "Status"
        '
        'lblWarning
        '
        Me.lblWarning.AutoSize = True
        Me.lblWarning.BackColor = System.Drawing.Color.OrangeRed
        Me.lblWarning.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblWarning.Location = New System.Drawing.Point(444, 347)
        Me.lblWarning.Name = "lblWarning"
        Me.lblWarning.Size = New System.Drawing.Size(190, 20)
        Me.lblWarning.TabIndex = 25
        Me.lblWarning.Text = "Item not on StackCard"
        '
        'DataGridView1
        '
        Me.DataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize
        Me.DataGridView1.Location = New System.Drawing.Point(44, 372)
        Me.DataGridView1.Name = "DataGridView1"
        Me.DataGridView1.Size = New System.Drawing.Size(585, 150)
        Me.DataGridView1.TabIndex = 26
        '
        'AddEditOrderProduct
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(658, 520)
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
        Me.Controls.Add(Me.lblQuantity)
        Me.Controls.Add(Me.txtUPC)
        Me.Controls.Add(Me.txtSKU)
        Me.Controls.Add(Me.Label3)
        Me.Controls.Add(Me.lblSKU)
        Me.Controls.Add(Me.lblDescription)
        Me.Controls.Add(Me.txtDescription)
        Me.Controls.Add(Me.Panel1)
        Me.Name = "AddEditOrderProduct"
        Me.Text = "AddEditOrderProduct"
        Me.Panel1.ResumeLayout(False)
        Me.Panel1.PerformLayout()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents Panel1 As System.Windows.Forms.Panel
    Friend WithEvents cmdSave As System.Windows.Forms.Button
    Friend WithEvents lblHeader As System.Windows.Forms.Label
    Friend WithEvents PictureBox1 As System.Windows.Forms.PictureBox
    Friend WithEvents txtDescription As System.Windows.Forms.TextBox
    Friend WithEvents lblDescription As System.Windows.Forms.Label
    Friend WithEvents lblSKU As System.Windows.Forms.Label
    Friend WithEvents Label3 As System.Windows.Forms.Label
    Friend WithEvents txtSKU As System.Windows.Forms.TextBox
    Friend WithEvents txtUPC As System.Windows.Forms.TextBox
    Friend WithEvents txtListPrice As System.Windows.Forms.TextBox
    Friend WithEvents txtQuantity As System.Windows.Forms.TextBox
    Friend WithEvents Label4 As System.Windows.Forms.Label
    Friend WithEvents lblQuantity As System.Windows.Forms.Label
    Friend WithEvents txtMargin As System.Windows.Forms.TextBox
    Friend WithEvents txtPrice As System.Windows.Forms.TextBox
    Friend WithEvents lblMargin As System.Windows.Forms.Label
    Friend WithEvents lblPrice As System.Windows.Forms.Label
    Friend WithEvents txtSuggestedOrder As System.Windows.Forms.TextBox
    Friend WithEvents lblSuggestedOrder As System.Windows.Forms.Label
    Friend WithEvents txtMaxstockLevel As System.Windows.Forms.TextBox
    Friend WithEvents txtExtendedPrice As System.Windows.Forms.TextBox
    Friend WithEvents Label10 As System.Windows.Forms.Label
    Friend WithEvents Label11 As System.Windows.Forms.Label
    Friend WithEvents txtStatus As System.Windows.Forms.TextBox
    Friend WithEvents Label1 As System.Windows.Forms.Label
    Friend WithEvents lblWarning As System.Windows.Forms.Label
    Friend WithEvents DataGridView1 As System.Windows.Forms.DataGridView
End Class
