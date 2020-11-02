Imports System.Data.OleDb

Module Common
    Function CheckEmpty(ByVal Field, ByVal DefaultValue)
        If Field = "" Then
            CheckEmpty = DefaultValue
        Else
            CheckEmpty = Field
        End If
    End Function

    Public Function ExecuteScalarQuery(ByVal SQL As String, ByVal ConnString As String) As String


        Dim strReturn As String = ""
        'Dim strConnection As String = strSLXConstr ' CleanBulkLoadNativeSQLConnectionString(strSLXNativeConstr)
        Using conn As New System.Data.OleDb.OleDbConnection()
            Dim cmd As New System.Data.OleDb.OleDbCommand(SQL, conn)

            Try
                conn.Open()
                cmd.CommandTimeout = 10000
                strReturn = cmd.ExecuteScalar()
            Catch ex As Exception
                'Call LogErrors("CRMUtility", " - Main", ex.Message, EventLogEntryType.Error)
                Console.WriteLine(ex.Message)
            Finally
                If conn.State = ConnectionState.Open Then
                    conn.Close()
                End If
            End Try
        End Using

        Return strReturn
    End Function
    Public Function GetField(ByVal Field As String, ByVal Table As String,
                             ByVal Where As String, ByVal ConnStr As String) As String
        Dim sql As String = String.Format("select {0} from {1} where {2}", Field, Table, (If(Where.Equals(String.Empty), "1=1", Where)))

        Using conn As New OleDbConnection(ConnStr)
            conn.Open()
            Using cmd As New OleDbCommand(sql, conn)

                'If IsDBNull(cmd.ExecuteScalar()) Then
                '    Return ""

                'Else
                Dim fieldval
                fieldval = cmd.ExecuteScalar()
                If IsNothing(fieldval) Then
                    Return ""
                Else
                    Return fieldval.ToString()
                End If


            End Using
        End Using
    End Function

    'This replaces the build in Round function and Rounds up if decimal is > 5
    Function RoundUp(ByVal value, ByVal digits)

        Dim offset
        offset = 10 ^ digits
        'RoundedNum = int( ( 100 * originalNum ) + 0.5 ) / 100
        'int( (10^2 * (2.19 * 0.5)) + 0.5) / 10^2 = 1.10

        'Chris changed his mind and doesn't want to round up anymore
        'RoundUp = Int(offset * cDbl(value) + 0.99) / offset
        RoundUp = Int(offset * CDbl(value) + 0.51) / offset

    End Function
    ' CheckEmpty checks to see if the value for Field is emtpy or null.
    ' If it is the DefaultValue is returned. This function assumes Field
    ' is a valid Field object.
    Function CheckEmpty(ByVal Field As String, ByVal DefaultValue As String) As String
        If IsNothing(Field) Or IsDBNull(Field) Then
            CheckEmpty = DefaultValue
        Else
            CheckEmpty = Field
        End If
    End Function

    ' CheckNull checks to see if the Value is null. If it is the DefaultValue is returned.
    Function CheckNull(ByVal Value As String, ByVal DefaultValue As String) As String
        If IsNothing(Value) Then
            CheckNull = DefaultValue
        Else
            CheckNull = Value
        End If
    End Function



End Module
