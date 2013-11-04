Imports System.IO

Module WriteAppLog
    Public Sub WriteStatusLog(ByVal ErrorMessage As String)
        'http://msdn2.microsoft.com/en-us/library/system.io.file.appendtext.aspx
        Dim path As String = "C:\TEMP\TACSync\SalesItemUpdateStatus.txt"
        Dim sw As StreamWriter
        If ErrorMessage = "" Then
            Exit Sub
        End If
        '==========================================
        'Check if directory Exists
        '==========================================
        Dim strDir As String
        Dim i As Integer
        i = InStrRev(path, "\")
        strDir = Mid(path, 1, i - 1) 'Ensure you don't include the last slash
        If Directory.Exists(strDir) = False Then
            'Create the Directory
            Directory.CreateDirectory(strDir)
        End If

        ' This text is added only once to the file.
        If File.Exists(path) = False Then
            ' Create a file to write to.
            sw = File.CreateText(path)
            sw.WriteLine(ErrorMessage)
            sw.Flush()
            sw.Close()
        Else
            ' This text is always added, making the file longer over time
            ' if it is not deleted.
            sw = File.AppendText(path)
            sw.WriteLine(ErrorMessage)
            sw.Flush()
            sw.Close()
        End If

        ' Open the file to read from.
        'Dim sr As StreamReader = File.OpenText(path)
        'Dim s As String
        'Do While sr.Peek() >= 0
        '    s = sr.ReadLine()
        '    Console.WriteLine(s)
        'Loop
        'sr.Close()

    End Sub

End Module
