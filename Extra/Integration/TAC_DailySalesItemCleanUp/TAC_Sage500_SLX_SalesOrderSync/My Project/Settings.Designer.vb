﻿'------------------------------------------------------------------------------
' <auto-generated>
'     This code was generated by a tool.
'     Runtime Version:4.0.30319.18444
'
'     Changes to this file may cause incorrect behavior and will be lost if
'     the code is regenerated.
' </auto-generated>
'------------------------------------------------------------------------------

Option Strict On
Option Explicit On


Namespace My
    
    <Global.System.Runtime.CompilerServices.CompilerGeneratedAttribute(),  _
     Global.System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Editors.SettingsDesigner.SettingsSingleFileGenerator", "10.0.0.0"),  _
     Global.System.ComponentModel.EditorBrowsableAttribute(Global.System.ComponentModel.EditorBrowsableState.Advanced)>  _
    Partial Friend NotInheritable Class MySettings
        Inherits Global.System.Configuration.ApplicationSettingsBase
        
        Private Shared defaultInstance As MySettings = CType(Global.System.Configuration.ApplicationSettingsBase.Synchronized(New MySettings()),MySettings)
        
#Region "My.Settings Auto-Save Functionality"
#If _MyType = "WindowsForms" Then
    Private Shared addedHandler As Boolean

    Private Shared addedHandlerLockObject As New Object

    <Global.System.Diagnostics.DebuggerNonUserCodeAttribute(), Global.System.ComponentModel.EditorBrowsableAttribute(Global.System.ComponentModel.EditorBrowsableState.Advanced)> _
    Private Shared Sub AutoSaveSettings(ByVal sender As Global.System.Object, ByVal e As Global.System.EventArgs)
        If My.Application.SaveMySettingsOnExit Then
            My.Settings.Save()
        End If
    End Sub
#End If
#End Region
        
        Public Shared ReadOnly Property [Default]() As MySettings
            Get
                
#If _MyType = "WindowsForms" Then
               If Not addedHandler Then
                    SyncLock addedHandlerLockObject
                        If Not addedHandler Then
                            AddHandler My.Application.Shutdown, AddressOf AutoSaveSettings
                            addedHandler = True
                        End If
                    End SyncLock
                End If
#End If
                Return defaultInstance
            End Get
        End Property
        
        <Global.System.Configuration.UserScopedSettingAttribute(),  _
         Global.System.Diagnostics.DebuggerNonUserCodeAttribute(),  _
         Global.System.Configuration.DefaultSettingValueAttribute("Provider=SQLNCLI10.1;Integrated Security="""";Password=lambarena;Persist Security I"& _ 
            "nfo=True;User ID=sa;Initial Catalog=mas500_eab_app;Data Source=APOLLO;Initial Fi"& _ 
            "le Name="""";Server SPN=""""")>  _
        Public Property Sage500Connection() As String
            Get
                Return CType(Me("Sage500Connection"),String)
            End Get
            Set
                Me("Sage500Connection") = value
            End Set
        End Property
        
        <Global.System.Configuration.UserScopedSettingAttribute(),  _
         Global.System.Diagnostics.DebuggerNonUserCodeAttribute(),  _
         Global.System.Configuration.DefaultSettingValueAttribute("Provider=SLXOLEDB.1;Password="""";Persist Security Info=True;User ID=admin;Initial "& _ 
            "Catalog=SALESLOGIX_PRODUCTION;Data Source=ATHENA;Extended Properties=""PORT=1706;"& _ 
            "LOG=ON;CASEINSENSITIVEFIND=ON;AUTOINCBATCHSIZE=1;SVRCERT=;""")>  _
        Public Property SLXConnection() As String
            Get
                Return CType(Me("SLXConnection"),String)
            End Get
            Set
                Me("SLXConnection") = value
            End Set
        End Property
        
        <Global.System.Configuration.UserScopedSettingAttribute(),  _
         Global.System.Diagnostics.DebuggerNonUserCodeAttribute(),  _
         Global.System.Configuration.DefaultSettingValueAttribute("Provider=SQLNCLI10.1;Password=lambarena;Persist Security Info=True;User ID=SA;Ini"& _ 
            "tial Catalog=SALESLOGIX_PRODUCTION;Data Source=APOLLO;Initial File Name="""";Serve"& _ 
            "r SPN=""""")>  _
        Public Property SLXNativeConnection() As String
            Get
                Return CType(Me("SLXNativeConnection"),String)
            End Get
            Set
                Me("SLXNativeConnection") = value
            End Set
        End Property
    End Class
End Namespace

Namespace My
    
    <Global.Microsoft.VisualBasic.HideModuleNameAttribute(),  _
     Global.System.Diagnostics.DebuggerNonUserCodeAttribute(),  _
     Global.System.Runtime.CompilerServices.CompilerGeneratedAttribute()>  _
    Friend Module MySettingsProperty
        
        <Global.System.ComponentModel.Design.HelpKeywordAttribute("My.Settings")>  _
        Friend ReadOnly Property Settings() As Global.TAC_Sage500_SLX_SalesOrderSync.My.MySettings
            Get
                Return Global.TAC_Sage500_SLX_SalesOrderSync.My.MySettings.Default
            End Get
        End Property
    End Module
End Namespace
