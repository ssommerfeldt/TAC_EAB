Public Class Form1
    Private Sub cmdConnection1_Click(sender As Object, e As EventArgs) Handles cmdConnection1.Click
        txtConstr1.Text = GetSLXConnectionString(txtConstr1.Text, "SQL") ' Get the SLX Connection String
    End Sub

    Private Sub cmdDB1_SLXConstr_Click(sender As Object, e As EventArgs) Handles cmdDB1_SLXConstr.Click
        txtSLXConstring.Text = GetSLXConnectionString(txtSLXConstring.Text, "SLX") ' Get the SLX Connection String
    End Sub

    Public Function GetSLXConnectionString(ByVal constr As String, ByVal Type As String) As String
        'Microsoft OLE DB Service Component Data Links
        Dim ComputerName As String = System.Windows.Forms.SystemInformation.ComputerName
        Dim dlink, cn As Object
        dlink = CreateObject("Datalinks")
        ' Microsoft AxtiveX Data Objects Connection
        cn = CreateObject("ADODB.Connection")
        If constr = "" Then
            If Type = "SLX" Then
                cn.ConnectionString = "Provider=SLXOLEDB.1;"
            Else
                cn.ConnectionString = "Provider=SQLNCLI11.1;Password=masterkey;Persist Security Info=True;User ID=sysdba;Initial Catalog=SLXRemote;Data Source=" & ComputerName & ";Initial File Name="""";Server SPN="""""

            End If

        Else
            cn.ConnectionString = constr
        End If

        ' Pass the connection to the datalinks PromptEdit
        ' - this opens the Data Link Properties window
        Dim ConnectionString As String = ""
        If dlink.PromptEdit((cn)) Then

            ' Read the resulting Connection String
            ConnectionString = cn.ConnectionString

            ' release the connection
            cn = Nothing
        Else
            '' User Canceled
            ConnectionString = constr

        End If
        Return ConnectionString


    End Function

    Private Sub cmdSave_Click(sender As Object, e As EventArgs) Handles cmdSave.Click
        Dim file As System.IO.StreamWriter
        file = My.Computer.FileSystem.OpenTextFileWriter("C:\EAB\EABFastOrderLoaderTEST.exe.config", False)
        Using file
            file.WriteLine("<?xml version=""1.0"" encoding=""utf-8"" ?>")
            file.WriteLine("<configuration>")
            file.WriteLine("    <configSections>")
            file.WriteLine("        <sectionGroup name=""userSettings"" type=""System.Configuration.UserSettingsGroup, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089"" >")
            file.WriteLine("            <section name=""EABFastOrderLoaderTEST.My.MySettings"" type=""System.Configuration.ClientSettingsSection, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089"" allowExeDefinition=""MachineToLocalUser"" requirePermission=""false"" />")
            file.WriteLine("        </sectionGroup>")
            file.WriteLine("    </configSections>")
            file.WriteLine("    <startup> ")
            file.WriteLine("        <supportedRuntime version=""v4.0"" sku="".NETFramework,Version=v4.6.1"" />")
            file.WriteLine("    </startup>")
            file.WriteLine("    <userSettings>")
            file.WriteLine("        <EABFastOrderLoaderTEST.My.MySettings>")
            file.WriteLine("            <setting name=""SLXNative"" serializeAs=""String"">")
            file.WriteLine("                <value>" & txtConstr1.Text) 'Provider=SQLNCLI11.1;Password=masterkey;Persist Security Info=True;User ID=sysdba;Initial Catalog=SalesLogix_Production_unicode;Data Source=EAB841;Initial File Name="";Server SPN=""
            file.WriteLine("</value>")
            file.WriteLine("            </setting>")
            file.WriteLine("            <setting name=""SLXConnection"" serializeAs=""String"">")
            file.WriteLine("                <value>" & txtSLXConstring.Text) ' Provider=SLXOLEDB.1;Password="";Persist Security Info=True;User ID=admin;Initial Catalog=SALESLOGIX;Data Source=EAB841;Extended Properties="PORT=1706;LOG=ON;CASEINSENSITIVEFIND=ON;AUTOINCBATCHSIZE=1;SVRCERT=;"
            file.WriteLine("</value>")
            file.WriteLine("            </setting>")
            file.WriteLine("            <setting name=""strSQLFROM"" serializeAs=""String"">")
            file.WriteLine("                <value />")
            file.WriteLine("            </setting>")
            file.WriteLine("            <setting name=""TempTableName"" serializeAs=""String"">")
            file.WriteLine("                   <value>zzTEMPFastSOItems</value>")
            file.WriteLine("               </setting>")
            file.WriteLine("           </EABFastOrderLoaderTEST.My.MySettings>")
            file.WriteLine("       </userSettings>")
            file.WriteLine("   </configuration>")

            file.Close()
        End Using
        MsgBox("Saved Successfully")

    End Sub
End Class
