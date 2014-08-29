Module CommandLineFunctions

    Sub ParseCommandLine(ByVal CommandLine As String, ByRef returnRoutineType As String, ByRef returnConnectionString As String, ByRef returnArgs As String)
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
            '    Select Case args(0)
            '        Case "-All"
            '            returnRoutineType = "All"
            '        Case "-Accountid"
            '            returnRoutineType = "Account"
            '            returnArgs = args(0)

            '        Case "-CopyStockCard"
            '            returnRoutineType = "CopyStockCard"
            '            returnArgs = args(0)
            '        Case "-SingleStockCard"
            '            returnRoutineType = "SingleStockCard"
            '            returnArgs = args(0)
            '    End Select

            If args(0) = "-All" Then
                returnRoutineType = "All"
            ElseIf args(0).Contains("-Accountid") Then
                returnRoutineType = "Account"
                returnArgs = args(0)
                'Dim separators2 As String = "="
                'Dim args2() As String = args(0).Split(separators2.ToCharArray)
                'If args2(0) = Chr(34) & "-Accountid" Then
                '    '============================================================
                '    ' -a means Account switch next Parameter is the Accountid
                '    '=============================================================
                '    returnRoutineType = "Account"
                '    'returnAccountId = args2(1)
                '    returnArgs = args(0)

                'End If
            ElseIf args(0).Contains("-CopyStockCard") Then
                returnRoutineType = "CopyStockCard"
                returnArgs = args(0)

            ElseIf args(0).Contains("-SingleStockCard") Then
                returnRoutineType = "SingleStockCard"
                returnArgs = args(0)



            End If


        Catch ex As Exception

        End Try
    End Sub

End Module
