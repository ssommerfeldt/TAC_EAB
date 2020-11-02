Module MainModule


    Public Sub Main(ByVal args() As String)
        Dim cla As String() = Environment.GetCommandLineArgs()
        If cla.Length > 1 Then
            'cla(0) is the executable path.
            'cla(1) is the first argument."ADDEDIT" Or "SYNC"
            Dim myArgs() As String = Split(cla(1), ",")
            'cla(2) = SalesOrderId
            Dim MyFunction As String = myArgs(0)
            Dim SalesOrderId As String = myArgs(1)
            Select Case MyFunction
                Case "ADDEDIT"
                    Console.WriteLine("Intializing CRM Objects...")
                    Dim frmAddEdit As New AddEditOrderProduct()
                    frmAddEdit.mCurrentID = SalesOrderId
                    frmAddEdit.StartPosition = FormStartPosition.CenterScreen
                    Application.Run(frmAddEdit)
                Case "SYNC"
                    Dim frmSync As New SyncProducts()
                    frmSync.mCurrentID = SalesOrderId
                    Application.Run(frmSync)

            End Select

        Else
            Exit Sub
        End If

    End Sub

End Module
