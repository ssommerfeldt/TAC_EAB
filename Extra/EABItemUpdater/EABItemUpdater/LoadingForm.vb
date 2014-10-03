Imports System.ComponentModel


Public Class LoadingForm


    Private Sub LoadingForm_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        If BackgroundWorker1.IsBusy <> True Then
            ' Start the asynchronous operation.
            BackgroundWorker1.RunWorkerAsync()
        End If

    End Sub

    Public Sub New()
        InitializeComponent()
        backgroundWorker1.WorkerReportsProgress = True
        backgroundWorker1.WorkerSupportsCancellation = True
    End Sub


    ' This event handler is where the time-consuming work is done. 
    Private Sub backgroundWorker1_DoWork(ByVal sender As System.Object, _
    ByVal e As DoWorkEventArgs) Handles BackgroundWorker1.DoWork
        'Dim worker As BackgroundWorker = CType(sender, BackgroundWorker)
        'Dim i As Integer
        'For i = 1 To 10
        '    If (worker.CancellationPending = True) Then
        '        e.Cancel = True
        '        Exit For
        '    Else
        '        ' Perform a time consuming operation and report progress.
        '        System.Threading.Thread.Sleep(500)
        '        worker.ReportProgress(i * 10)
        '    End If
        'Next
        Module1.Main()
    End Sub

    ' This event handler updates the progress. 
    Private Sub backgroundWorker1_ProgressChanged(ByVal sender As System.Object, _
    ByVal e As ProgressChangedEventArgs) Handles BackgroundWorker1.ProgressChanged
        resultLabel.Text = (e.ProgressPercentage.ToString() + "%")
    End Sub

    ' This event handler deals with the results of the background operation. 
    Private Sub backgroundWorker1_RunWorkerCompleted(ByVal sender As System.Object, _
    ByVal e As RunWorkerCompletedEventArgs) Handles BackgroundWorker1.RunWorkerCompleted
        If e.Cancelled = True Then
            resultLabel.Text = "Canceled!"
        ElseIf e.Error IsNot Nothing Then
            resultLabel.Text = "Error: " & e.Error.Message
        Else
            resultlabel.Text = "Done!"
        End If
        Me.Close()
    End Sub

    Private Sub startAsyncButton_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles startAsyncButton.Click
        If BackgroundWorker1.IsBusy <> True Then
            ' Start the asynchronous operation.
            BackgroundWorker1.RunWorkerAsync()
        End If
    End Sub

    Private Sub cancelAsyncButton_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles cancelAsyncButton.Click
        If BackgroundWorker1.WorkerSupportsCancellation = True Then
            ' Cancel the asynchronous operation.
            BackgroundWorker1.CancelAsync()
        End If
    End Sub
End Class