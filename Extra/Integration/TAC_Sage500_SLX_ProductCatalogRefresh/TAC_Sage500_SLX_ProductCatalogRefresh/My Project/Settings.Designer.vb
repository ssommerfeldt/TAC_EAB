﻿'------------------------------------------------------------------------------
' <auto-generated>
'     This code was generated by a tool.
'     Runtime Version:4.0.30319.36392
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
         Global.System.Configuration.DefaultSettingValueAttribute("Provider=SQLNCLI10.1;Password=lambarena;Persist Security Info=True;User ID=SA;Ini"& _ 
            "tial Catalog=SalesLogix_Production;Data Source=APOLLO;Initial File Name="""";Serve"& _ 
            "r SPN=""""")>  _
        Public Property SLXNativeConstr() As String
            Get
                Return CType(Me("SLXNativeConstr"),String)
            End Get
            Set
                Me("SLXNativeConstr") = value
            End Set
        End Property
        
        <Global.System.Configuration.UserScopedSettingAttribute(),  _
         Global.System.Diagnostics.DebuggerNonUserCodeAttribute(),  _
         Global.System.Configuration.DefaultSettingValueAttribute("Provider=SQLNCLI10.1;Password=lambarena;Persist Security Info=True;User ID=sa;Ini"& _ 
            "tial Catalog=mas500_eab_app;Data Source=APOLLO;Initial File Name="""";Server SPN="""& _ 
            """")>  _
        Public Property Sage500Constr() As String
            Get
                Return CType(Me("Sage500Constr"),String)
            End Get
            Set
                Me("Sage500Constr") = value
            End Set
        End Property
        
        <Global.System.Configuration.UserScopedSettingAttribute(),  _
         Global.System.Diagnostics.DebuggerNonUserCodeAttribute(),  _
         Global.System.Configuration.DefaultSettingValueAttribute("Provider=SLXOLEDB.1;Password=""lambarena76"";Persist Security Info=True;User ID=adm"& _ 
            "in;Initial Catalog=SalesLogix_Production;Data Source=ATHENA;Extended Properties="& _ 
            """PORT=1706;LOG=ON;CASEINSENSITIVEFIND=ON;AUTOINCBATCHSIZE=1;SVRCERT=;""")>  _
        Public Property SLXConstr() As String
            Get
                Return CType(Me("SLXConstr"),String)
            End Get
            Set
                Me("SLXConstr") = value
            End Set
        End Property
        
        <Global.System.Configuration.UserScopedSettingAttribute(),  _
         Global.System.Diagnostics.DebuggerNonUserCodeAttribute(),  _
         Global.System.Configuration.DefaultSettingValueAttribute("donotreply.eabnotifications@gmail.com")>  _
        Public Property smtpUser() As String
            Get
                Return CType(Me("smtpUser"),String)
            End Get
            Set
                Me("smtpUser") = value
            End Set
        End Property
        
        <Global.System.Configuration.UserScopedSettingAttribute(),  _
         Global.System.Diagnostics.DebuggerNonUserCodeAttribute(),  _
         Global.System.Configuration.DefaultSettingValueAttribute("587")>  _
        Public Property smtpPort() As String
            Get
                Return CType(Me("smtpPort"),String)
            End Get
            Set
                Me("smtpPort") = value
            End Set
        End Property
        
        <Global.System.Configuration.UserScopedSettingAttribute(),  _
         Global.System.Diagnostics.DebuggerNonUserCodeAttribute(),  _
         Global.System.Configuration.DefaultSettingValueAttribute("smtp.gmail.com")>  _
        Public Property smtpHost() As String
            Get
                Return CType(Me("smtpHost"),String)
            End Get
            Set
                Me("smtpHost") = value
            End Set
        End Property
        
        <Global.System.Configuration.UserScopedSettingAttribute(),  _
         Global.System.Diagnostics.DebuggerNonUserCodeAttribute(),  _
         Global.System.Configuration.DefaultSettingValueAttribute("Icecream1!")>  _
        Public Property smtpPassword() As String
            Get
                Return CType(Me("smtpPassword"),String)
            End Get
            Set
                Me("smtpPassword") = value
            End Set
        End Property
        
        <Global.System.Configuration.UserScopedSettingAttribute(),  _
         Global.System.Diagnostics.DebuggerNonUserCodeAttribute(),  _
         Global.System.Configuration.DefaultSettingValueAttribute("ssommerfeldt@theanswerco.com")>  _
        Public Property SendtoEmails() As String
            Get
                Return CType(Me("SendtoEmails"),String)
            End Get
            Set
                Me("SendtoEmails") = value
            End Set
        End Property
        
        <Global.System.Configuration.UserScopedSettingAttribute(),  _
         Global.System.Diagnostics.DebuggerNonUserCodeAttribute(),  _
         Global.System.Configuration.DefaultSettingValueAttribute("SELECT vdvStockStatus.ShortDesc AS NAME"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",timItemDescription.LongDesc AS DESCRIP"& _ 
            "TION"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",vdvStockStatus.ItemID AS ACTUALID"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",timItemClass.ItemClassName AS FAMIL"& _ 
            "Y"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",CONVERT(decimal(15,5),timItem.StdPrice) AS PRICE"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",tmpItemType.LocalText A"& _ 
            "S PRODUCTGROUP"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",CONVERT(VARCHAR(255), tmpItemStatus.LocalText) AS STATUS"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",vd"& _ 
            "vStockStatus.UnitMeasID AS UNIT"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS STOCKVOLUME"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS STOCKWEIGHT"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)& _ 
            ",NULL AS STOCKITEM"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS PROGRAM"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS SUPPLIER"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS VENDOR"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",N"& _ 
            "ULL AS SITEID"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS WAREHOUSELOCATION"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS COMMISSIONABLE"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS "& _ 
            "TAXABLE"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS ACCOUNTINGPERIOD"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",tglAccount.GLAcctNo AS GLACCOUNTNUMBER"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)& _ 
            ",NULL AS GLSUBACCOUNTNUMBER"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS DATAOWNER"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS TYPE"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS FIXE"& _ 
            "DCOST"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS GLOBALSYNCID"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS APPID"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS TICK"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS COMMOD"& _ 
            "ITYGROUPID"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS ACTIVEFLAG"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",'T' AS SELLINGALLOWEDFLAG"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",vdvStockStatus."& _ 
            "StockUnitMeasKey AS UNITOFMEASUREID"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS SELLINGUOMID"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS SELLINGUO"& _ 
            "MNUMBER"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS CLASSIFICATION"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",NULL AS COMMODITYTYPE"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",vdvStockStatus.Ite"& _ 
            "mKey AS MASITEMKEY"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",timItemUnitOfMeas.UPC"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",vdvStockStatus.ItemID AS MASITEMI"& _ 
            "D"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",vdvStockStatus.WhseID AS WAREHOUSEID"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",vdvStockStatus.CompanyID"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",CONVERT"& _ 
            "(decimal(16,8),vdvStockStatus.QtyOnHand) as QtyOnHand"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",CONVERT(decimal(16,8),v"& _ 
            "dvStockStatus.QtyAvailable) as QtyAvailable"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",CONVERT(decimal(16,8),vdvStockSta"& _ 
            "tus.SurplusQty) as SurplusQty"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",CONVERT(decimal(16,8),vdvStockStatus.QtyOnHold)"& _ 
            " as QtyOnHold"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",CONVERT(decimal(16,8),vdvStockStatus.MaxStockLevel) as MaxStock"& _ 
            "Level"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&Global.Microsoft.VisualBasic.ChrW(9)&",timItem.ProdPriceGroupKey"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"FROM         tglAccount LEFT OUTER JOIN"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"   "& _ 
            "                   timInventory ON tglAccount.GLAcctKey = timInventory.InvtAcctK"& _ 
            "ey RIGHT OUTER JOIN"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"                      vdvStockStatus INNER JOIN"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"          "& _ 
            "            timItem ON vdvStockStatus.ItemKey = timItem.ItemKey ON timInventory."& _ 
            "WhseKey = vdvStockStatus.WhseKey AND "&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"                      timInventory.ItemKe"& _ 
            "y = vdvStockStatus.ItemKey LEFT OUTER JOIN"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"                      timItemUnitOfM"& _ 
            "eas ON timItem.SalesUnitMeasKey = timItemUnitOfMeas.TargetUnitMeasKey AND timIte"& _ 
            "m.ItemKey = timItemUnitOfMeas.ItemKey LEFT OUTER JOIN"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"                         "& _ 
            " (SELECT     TableName, ColumnName, DBValue, IsDefault, IsHidden, StringNo, Loca"& _ 
            "lText"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"                            FROM          vListValidationString AS vListV"& _ 
            "alidationString_1"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"                            WHERE      (TableName = 'timItem'"& _ 
            ") AND (ColumnName = 'Status')) AS tmpItemStatus ON timItem.Status = tmpItemStatu"& _ 
            "s.DBValue LEFT OUTER JOIN"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"                          (SELECT     TableName, Colu"& _ 
            "mnName, DBValue, IsDefault, IsHidden, StringNo, LocalText"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"                     "& _ 
            "       FROM          vListValidationString"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"                            WHERE   "& _ 
            "   (TableName = 'timItem') AND (ColumnName = 'ItemType')) AS tmpItemType ON timI"& _ 
            "tem.ItemType = tmpItemType.DBValue LEFT OUTER JOIN"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"                      timIte"& _ 
            "mClass ON timItem.ItemClassKey = timItemClass.ItemClassKey LEFT OUTER JOIN"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"    "& _ 
            "                  timItemDescription ON vdvStockStatus.ItemKey = timItemDescript"& _ 
            "ion.ItemKey"&Global.Microsoft.VisualBasic.ChrW(13)&Global.Microsoft.VisualBasic.ChrW(10)&"                 WHERE vdvStockStatus.ItemID = '3243142'"&Global.Microsoft.VisualBasic.ChrW(9)&"and vdvSto"& _ 
            "ckStatus.WhseID= '660' and"&Global.Microsoft.VisualBasic.ChrW(9)&"vdvStockStatus.CompanyID ='EAB'  ")>  _
        Public Property SourceQuery() As String
            Get
                Return CType(Me("SourceQuery"),String)
            End Get
            Set
                Me("SourceQuery") = value
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
        Friend ReadOnly Property Settings() As Global.TAC_Sage500_SLX_ProductCatalogRefresh.My.MySettings
            Get
                Return Global.TAC_Sage500_SLX_ProductCatalogRefresh.My.MySettings.Default
            End Get
        End Property
    End Module
End Namespace
