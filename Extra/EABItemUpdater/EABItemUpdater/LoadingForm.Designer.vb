<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class LoadingForm
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(LoadingForm))
        Me.BackgroundWorker1 = New System.ComponentModel.BackgroundWorker()
        Me.resultlabel = New System.Windows.Forms.Label()
        Me.startAsyncButton = New System.Windows.Forms.Button()
        Me.cancelAsyncButton = New System.Windows.Forms.Button()
        Me.lblMessage = New System.Windows.Forms.Label()
        Me.SuspendLayout()
        '
        'BackgroundWorker1
        '
        '
        'resultlabel
        '
        Me.resultlabel.Location = New System.Drawing.Point(40, 63)
        Me.resultlabel.Name = "resultlabel"
        Me.resultlabel.Size = New System.Drawing.Size(189, 23)
        Me.resultlabel.TabIndex = 1
        '
        'startAsyncButton
        '
        Me.startAsyncButton.Location = New System.Drawing.Point(31, 100)
        Me.startAsyncButton.Name = "startAsyncButton"
        Me.startAsyncButton.Size = New System.Drawing.Size(75, 23)
        Me.startAsyncButton.TabIndex = 2
        Me.startAsyncButton.Text = "Start"
        Me.startAsyncButton.UseVisualStyleBackColor = True
        Me.startAsyncButton.Visible = False
        '
        'cancelAsyncButton
        '
        Me.cancelAsyncButton.Location = New System.Drawing.Point(152, 100)
        Me.cancelAsyncButton.Name = "cancelAsyncButton"
        Me.cancelAsyncButton.Size = New System.Drawing.Size(75, 23)
        Me.cancelAsyncButton.TabIndex = 3
        Me.cancelAsyncButton.Text = "Cancel"
        Me.cancelAsyncButton.UseVisualStyleBackColor = True
        Me.cancelAsyncButton.Visible = False
        '
        'lblMessage
        '
        Me.lblMessage.AutoEllipsis = True
        Me.lblMessage.BackColor = System.Drawing.Color.Red
        Me.lblMessage.Font = New System.Drawing.Font("Microsoft Sans Serif", 16.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.lblMessage.Location = New System.Drawing.Point(38, 15)
        Me.lblMessage.Name = "lblMessage"
        Me.lblMessage.Size = New System.Drawing.Size(189, 48)
        Me.lblMessage.TabIndex = 4
        Me.lblMessage.Text = "Updating..."
        Me.lblMessage.TextAlign = System.Drawing.ContentAlignment.MiddleCenter
        '
        'LoadingForm
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(264, 94)
        Me.Controls.Add(Me.resultlabel)
        Me.Controls.Add(Me.lblMessage)
        Me.Controls.Add(Me.cancelAsyncButton)
        Me.Controls.Add(Me.startAsyncButton)
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.Name = "LoadingForm"
        Me.Text = "Please Wait..."
        Me.ResumeLayout(False)

    End Sub
    Friend WithEvents BackgroundWorker1 As System.ComponentModel.BackgroundWorker
    Friend WithEvents resultlabel As System.Windows.Forms.Label
    Friend WithEvents startAsyncButton As System.Windows.Forms.Button
    Friend WithEvents cancelAsyncButton As System.Windows.Forms.Button
    Friend WithEvents lblMessage As System.Windows.Forms.Label
End Class
