Module CommandLineFunctions

    Sub ParseCommandLine(ByVal CommandLine As String, ByRef returnRoutineType As String, ByRef returnConnectionString As String, ByRef returnAccountId As String)
        '=============================================================
        Dim separators As String = "`" 'used for parsing out the parameters
        Dim args() As String = CommandLine.Split(separators.ToCharArray)
        '===============================================================
        '  ConnectionString
        '===============================================================
        Try
            returnConnectionString = args(1)
        Catch ex As Exception

        End Try
        '===============================================================
        '  Routine Type
        '===============================================================
        Try
            If args(0) = "-All" Then
                returnRoutineType = "All"
            Else
                Dim separators2 As String = "="
                Dim args2() As String = args(0).Split(separators2.ToCharArray)
                If args2(0) = Chr(34) & "-Accountid" Then
                    '============================================================
                    ' -a means Account switch next Parameter is the Accountid
                    '=============================================================
                    returnRoutineType = "Account"
                    returnAccountId = args2(1)

                End If
            End If


        Catch ex As Exception

        End Try
    End Sub

End Module
