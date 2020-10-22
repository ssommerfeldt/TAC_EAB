<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class Form1
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(Form1))
        Me.GroupBox1 = New System.Windows.Forms.GroupBox()
        Me.Label12 = New System.Windows.Forms.Label()
        Me.cmdDB1_SLXConstr = New System.Windows.Forms.Button()
        Me.txtSLXConstring = New System.Windows.Forms.TextBox()
        Me.PictureBox13 = New System.Windows.Forms.PictureBox()
        Me.Label5 = New System.Windows.Forms.Label()
        Me.lblDatabase1 = New System.Windows.Forms.Label()
        Me.cmdConnection1 = New System.Windows.Forms.Button()
        Me.txtConstr1 = New System.Windows.Forms.TextBox()
        Me.PictureBox2 = New System.Windows.Forms.PictureBox()
        Me.PictureBox1 = New System.Windows.Forms.PictureBox()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.lblHeader = New System.Windows.Forms.Label()
        Me.PictureBox3 = New System.Windows.Forms.PictureBox()
        Me.cmdSave = New System.Windows.Forms.Button()
        Me.GroupBox1.SuspendLayout()
        CType(Me.PictureBox13, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.PictureBox2, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.Panel1.SuspendLayout()
        CType(Me.PictureBox3, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'GroupBox1
        '
        Me.GroupBox1.Controls.Add(Me.cmdSave)
        Me.GroupBox1.Controls.Add(Me.Label12)
        Me.GroupBox1.Controls.Add(Me.cmdDB1_SLXConstr)
        Me.GroupBox1.Controls.Add(Me.txtSLXConstring)
        Me.GroupBox1.Controls.Add(Me.PictureBox13)
        Me.GroupBox1.Controls.Add(Me.Label5)
        Me.GroupBox1.Controls.Add(Me.lblDatabase1)
        Me.GroupBox1.Controls.Add(Me.cmdConnection1)
        Me.GroupBox1.Controls.Add(Me.txtConstr1)
        Me.GroupBox1.Controls.Add(Me.PictureBox2)
        Me.GroupBox1.Controls.Add(Me.PictureBox1)
        Me.GroupBox1.Font = New System.Drawing.Font("Microsoft Sans Serif", 9.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.GroupBox1.ForeColor = System.Drawing.Color.Red
        Me.GroupBox1.Location = New System.Drawing.Point(172, 102)
        Me.GroupBox1.Name = "GroupBox1"
        Me.GroupBox1.Size = New System.Drawing.Size(582, 160)
        Me.GroupBox1.TabIndex = 1
        Me.GroupBox1.TabStop = False
        Me.GroupBox1.Text = "SQL Server Native Connection"
        '
        'Label12
        '
        Me.Label12.AutoSize = True
        Me.Label12.Font = New System.Drawing.Font("Microsoft Sans Serif", 6.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label12.ForeColor = System.Drawing.Color.Black
        Me.Label12.Location = New System.Drawing.Point(38, 111)
        Me.Label12.Name = "Label12"
        Me.Label12.Size = New System.Drawing.Size(102, 9)
        Me.Label12.TabIndex = 27
        Me.Label12.Text = "SLX connection needed Sync"
        '
        'cmdDB1_SLXConstr
        '
        Me.cmdDB1_SLXConstr.Image = CType(resources.GetObject("cmdDB1_SLXConstr.Image"), System.Drawing.Image)
        Me.cmdDB1_SLXConstr.Location = New System.Drawing.Point(461, 86)
        Me.cmdDB1_SLXConstr.Name = "cmdDB1_SLXConstr"
        Me.cmdDB1_SLXConstr.Size = New System.Drawing.Size(26, 26)
        Me.cmdDB1_SLXConstr.TabIndex = 26
        Me.cmdDB1_SLXConstr.UseVisualStyleBackColor = True
        '
        'txtSLXConstring
        '
        Me.txtSLXConstring.Font = New System.Drawing.Font("Microsoft Sans Serif", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtSLXConstring.Location = New System.Drawing.Point(68, 88)
        Me.txtSLXConstring.Name = "txtSLXConstring"
        Me.txtSLXConstring.PasswordChar = Global.Microsoft.VisualBasic.ChrW(42)
        Me.txtSLXConstring.ReadOnly = True
        Me.txtSLXConstring.Size = New System.Drawing.Size(387, 20)
        Me.txtSLXConstring.TabIndex = 25
        '
        'PictureBox13
        '
        Me.PictureBox13.Image = CType(resources.GetObject("PictureBox13.Image"), System.Drawing.Image)
        Me.PictureBox13.Location = New System.Drawing.Point(29, 76)
        Me.PictureBox13.Name = "PictureBox13"
        Me.PictureBox13.Size = New System.Drawing.Size(32, 32)
        Me.PictureBox13.SizeMode = System.Windows.Forms.PictureBoxSizeMode.AutoSize
        Me.PictureBox13.TabIndex = 24
        Me.PictureBox13.TabStop = False
        '
        'Label5
        '
        Me.Label5.AutoSize = True
        Me.Label5.Location = New System.Drawing.Point(0, 54)
        Me.Label5.Name = "Label5"
        Me.Label5.Size = New System.Drawing.Size(160, 16)
        Me.Label5.TabIndex = 15
        Me.Label5.Text = "Infor CRM Connection:"
        '
        'lblDatabase1
        '
        Me.lblDatabase1.AutoSize = True
        Me.lblDatabase1.Location = New System.Drawing.Point(65, 54)
        Me.lblDatabase1.Name = "lblDatabase1"
        Me.lblDatabase1.Size = New System.Drawing.Size(0, 16)
        Me.lblDatabase1.TabIndex = 14
        '
        'cmdConnection1
        '
        Me.cmdConnection1.Image = CType(resources.GetObject("cmdConnection1.Image"), System.Drawing.Image)
        Me.cmdConnection1.Location = New System.Drawing.Point(461, 28)
        Me.cmdConnection1.Name = "cmdConnection1"
        Me.cmdConnection1.Size = New System.Drawing.Size(26, 23)
        Me.cmdConnection1.TabIndex = 13
        Me.cmdConnection1.UseVisualStyleBackColor = True
        '
        'txtConstr1
        '
        Me.txtConstr1.Font = New System.Drawing.Font("Microsoft Sans Serif", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtConstr1.Location = New System.Drawing.Point(68, 30)
        Me.txtConstr1.Name = "txtConstr1"
        Me.txtConstr1.PasswordChar = Global.Microsoft.VisualBasic.ChrW(42)
        Me.txtConstr1.ReadOnly = True
        Me.txtConstr1.Size = New System.Drawing.Size(387, 20)
        Me.txtConstr1.TabIndex = 12
        '
        'PictureBox2
        '
        Me.PictureBox2.Image = CType(resources.GetObject("PictureBox2.Image"), System.Drawing.Image)
        Me.PictureBox2.Location = New System.Drawing.Point(29, 19)
        Me.PictureBox2.Name = "PictureBox2"
        Me.PictureBox2.Size = New System.Drawing.Size(32, 32)
        Me.PictureBox2.SizeMode = System.Windows.Forms.PictureBoxSizeMode.AutoSize
        Me.PictureBox2.TabIndex = 9
        Me.PictureBox2.TabStop = False
        '
        'PictureBox1
        '
        Me.PictureBox1.Image = CType(resources.GetObject("PictureBox1.Image"), System.Drawing.Image)
        Me.PictureBox1.Location = New System.Drawing.Point(3, 19)
        Me.PictureBox1.Name = "PictureBox1"
        Me.PictureBox1.Size = New System.Drawing.Size(32, 32)
        Me.PictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.AutoSize
        Me.PictureBox1.TabIndex = 2
        Me.PictureBox1.TabStop = False
        '
        'Panel1
        '
        Me.Panel1.BackColor = System.Drawing.SystemColors.Highlight
        Me.Panel1.Controls.Add(Me.lblHeader)
        Me.Panel1.Controls.Add(Me.PictureBox3)
        Me.Panel1.Dock = System.Windows.Forms.DockStyle.Top
        Me.Panel1.Location = New System.Drawing.Point(0, 0)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(844, 100)
        Me.Panel1.TabIndex = 2
        '
        'lblHeader
        '
        Me.lblHeader.AutoSize = True
        Me.lblHeader.Font = New System.Drawing.Font("Trebuchet MS", 27.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblHeader.ForeColor = System.Drawing.Color.White
        Me.lblHeader.Location = New System.Drawing.Point(286, 28)
        Me.lblHeader.Name = "lblHeader"
        Me.lblHeader.Size = New System.Drawing.Size(468, 46)
        Me.lblHeader.TabIndex = 1
        Me.lblHeader.Text = "Fast Loader Configuration"
        '
        'PictureBox3
        '
        Me.PictureBox3.Image = CType(resources.GetObject("PictureBox3.Image"), System.Drawing.Image)
        Me.PictureBox3.Location = New System.Drawing.Point(-65, 0)
        Me.PictureBox3.Name = "PictureBox3"
        Me.PictureBox3.Size = New System.Drawing.Size(345, 100)
        Me.PictureBox3.TabIndex = 0
        Me.PictureBox3.TabStop = False
        '
        'cmdSave
        '
        Me.cmdSave.Image = CType(resources.GetObject("cmdSave.Image"), System.Drawing.Image)
        Me.cmdSave.Location = New System.Drawing.Point(501, 33)
        Me.cmdSave.Name = "cmdSave"
        Me.cmdSave.Size = New System.Drawing.Size(75, 59)
        Me.cmdSave.TabIndex = 3
        Me.cmdSave.UseVisualStyleBackColor = True
        '
        'Form1
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(844, 261)
        Me.Controls.Add(Me.Panel1)
        Me.Controls.Add(Me.GroupBox1)
        Me.Name = "Form1"
        Me.Text = "Fast Loader Configuration"
        Me.GroupBox1.ResumeLayout(False)
        Me.GroupBox1.PerformLayout()
        CType(Me.PictureBox13, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.PictureBox2, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.Panel1.ResumeLayout(False)
        Me.Panel1.PerformLayout()
        CType(Me.PictureBox3, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)

    End Sub

    Friend WithEvents GroupBox1 As GroupBox
    Friend WithEvents Label12 As Label
    Friend WithEvents cmdDB1_SLXConstr As Button
    Friend WithEvents txtSLXConstring As TextBox
    Friend WithEvents PictureBox13 As PictureBox
    Friend WithEvents Label5 As Label
    Friend WithEvents lblDatabase1 As Label
    Friend WithEvents cmdConnection1 As Button
    Friend WithEvents txtConstr1 As TextBox
    Friend WithEvents PictureBox2 As PictureBox
    Friend WithEvents PictureBox1 As PictureBox
    Friend WithEvents Panel1 As Panel
    Friend WithEvents lblHeader As Label
    Friend WithEvents PictureBox3 As PictureBox
    Friend WithEvents cmdSave As Button
End Class
