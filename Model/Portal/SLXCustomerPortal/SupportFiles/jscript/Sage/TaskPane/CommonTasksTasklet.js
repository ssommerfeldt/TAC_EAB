/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, __doPostBack, GroupAdHocListMenu, getCookie, commonTaskActions, $, cookie */
define("Sage/TaskPane/CommonTasksTasklet", [
    'dijit/Menu',
    'dijit/Dialog',
    'dijit/form/Button',
    'dijit/form/CheckBox',
    'Sage/TaskPane/_BaseTaskPaneTasklet',
    'Sage/UI/MenuItem',
    'Sage/UI/Dialogs',
    'Sage/Utility',
    'Sage/Utility/Email',
    'Sage/Groups/GroupManager',
    'dojo/_base/xhr',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/string',
    'dojo/i18n!./nls/CommonTasksTasklet',
    'dojo/dom-class',
    'dojo/topic',
    'Sage/Utility/Jobs',
    'Sage/MainView/Import/ImportWizardController',
    'Sage/MainView/Import/ImportManagerUtility',
    'Sage/MainView/CopyUserProfile/CopyUserProfileController',
    'Sage/UI/BulkUpdateWidget',
    'Sage/Data/SDataServiceRegistry'
],
function (
    dijitMenu,
    dijitDialog,
    dijitButton,
    dijitCheckBox,
    _BaseTaskPaneTasklet,
    menuItem,
    dialogs,
    utility,
    email,
    groupManager,
    xhr,
    lang,
    declare,
    dString,
    nlsResource,
    domClass,
    topic,
    jobs,
    ImportWizardController,
    importManagerUtility,
    CopyUserProfileController,
    BulkUpdateWidget,
    sDataServiceRegistry
) {
    var commonTasksTasklet = declare('Sage.TaskPane.CommonTasksTasklet', _BaseTaskPaneTasklet, {
        excelSupported: false,
        _exportToFile: function () {
            var timeout = 0;
            if (utility.isIE) {
                timeout = 3000;
            }
            var self = this;
            window.setTimeout(function () { self.onExportToFileClick(); }, timeout);
        },
        constructor: function (args) {
            lang.mixin(this, nlsResource);
        },
        removeCurrentFromGroup: function () {
            this.getCurrentEntity();
            var svc = Sage.Services.getService("ClientGroupContext"),
                grpctxt,
                firstid;

            if (svc !== null) {
                grpctxt = svc.getContext();
                firstid = grpctxt.FirstEntityID;
                if (firstid === this.currentEntityId) {
                    firstid = grpctxt.NextEntityID;
                }
                if (firstid !== "") {
                    if (this.contextService) {
                        this.contextService.navigateSLXGroupEntity(firstid, this.currentEntityId);
                    }
                }

                Sage.Groups.GroupManager.removeIds(grpctxt.CurrentGroupID, grpctxt.CurrentName, grpctxt.CurrentFamily, [this.currentEntityId], function () {
                    __doPostBack("MainContent", "");
                }, function (err) {
                    console.error(err);
                }, this);
            }
        },
        removeSelectionsFromGroup: function () {
            groupManager.removeSelectionsFromGroup();
        },
        saveSelectionsAsNewGroup: function () {
            groupManager.saveSelectionsAsNewGroup();
        },
        showAdHocList: function (e) {
            var svc = Sage.Services.getService('ClientGroupContext'),
                i,
                item,
                parentNode;
            if (typeof (GroupAdHocListMenu) === 'undefined') {
                GroupAdHocListMenu = new dijitMenu({// jshint ignore:line
                    id: 'GroupAdHocList'
                });
                GroupAdHocListMenu.addChild(new menuItem({
                    label: this.loadingText
                }));
            }

            svc.getAdHocGroupList(function (list) {
                GroupAdHocListMenu.destroyDescendants();
                for (i = 0; i < list.length; i++) {
                    item = list[i];
                    GroupAdHocListMenu.addChild(new menuItem({
                        label: item.$descriptor || item.name,
                        ref: dString.substitute("javascript:Sage.Groups.GroupManager.addSelectionsToGroup('${0}')", [item.$key]),
                        onClick: function () {
                            if (this.ref !== '') {
                                try {
                                    window.location.href = this.ref;
                                    dijit.popup.close(GroupAdHocListMenu);
                                } catch (err) {
                                }
                            }
                        }
                    }));
                }
                GroupAdHocListMenu.on('blur', function () { dijit.popup.close(GroupAdHocListMenu); });
                GroupAdHocListMenu.startup();
            }, this);

            if (!e.pageX && !e.pageY) {
                // IE8 won't have e.pageX and e.pageY values
                e.pageX = e.clientX + document.body.scrollLeft;
                e.pageY = e.clientY + document.body.scrollTop;
            }

            dijit.popup.open({
                popup: GroupAdHocListMenu,
                x: e.pageX || 250,
                y: e.pageY || 250
            });

            parentNode = GroupAdHocListMenu.domNode.parentNode;
            if (parentNode && !domClass.contains(parentNode, 'commonTaskAdHoc')) {
                domClass.add(parentNode, 'commonTaskAdHoc');
            }
        },
        exportToExcel: function () {
            this.prepareSelectedRecords(this.getExcelJob(this.getSelectionInfo(), this));
        },
        getExcelJob: function (selectionInfo, self) {
            var groupId = this.getCurrentGroupId();
            if (groupId === "LOOKUPRESULTS") {
                groupId = this.getDefaultGroupId();
            }

           return function () {
                var format = cookie.getCookie("format");
                var parameters = [
                    { "name": "SelectedIds", "value": (selectionInfo.selectionCount > 0) ? selectionInfo.selectedIds.join(',') || '' : '' },
                    { "name": "GroupId", "value": groupId },
                    { "name": "AppliedFilters", "value": Sys.Serialization.JavaScriptSerializer.serialize(jobs.getFiltersForJob()) },
                    { "name": "LookupConditions", "value": Sys.Serialization.JavaScriptSerializer.serialize(jobs.getLookupConditionsForJob()) },
                    { "name": "ExportType", "value" : format} 
                ];

                var groupName = self.getCurrentGroupName();
                var dateStamp = dojo.date.locale.format(new Date(), { selector: "date", datePattern: "yyyy_MM_dd_hhmm", locale: Sys.CultureInfo.CurrentCulture.name });
                var user = '';
                var clientContextSvc = Sage.Services.getService('ClientContextService');
                if (clientContextSvc) {
                    if (clientContextSvc.containsKey("userPrettyName")) {
                        user = clientContextSvc.getValue("userPrettyName");
                    }
                }

                var description = dString.substitute("${0}_${1}_${2}", [groupName, user, dateStamp]);
                var options = {
                    descriptor: description,
                    closable: true,
                    title: self.exportToExcel_Caption,
                    key: "Sage.SalesLogix.BusinessRules.Jobs.ExportToExcelJob",
                    parameters: parameters,
                    infoMessage: self.exportProcessingJobMsg,
                    success: function (result) {
                    },
                    failure: function (result) {
                        dialogs.showError(dString.substitute(self.errorRequestingJobMgr, [result.result]));
                    },
                    ensureZeroFilters: true
                };
                jobs.triggerJobAndDisplayProgressDialog(options);
           };
        },
        exportToFile: function () {
            this.getCurrentEntity();
            this.prepareSelectedRecords(this.fileFormatCheck(this));
        },
        fileFormatCheck: function (self) {
            return function () {
                var formatIsSaved = cookie.getCookie("formatIsSaved"),
                    format = cookie.getCookie("format");
                //Check for cookie of file format type preference
                if (formatIsSaved === "true" && format.length > 0) {
                   self.onDoExport(format);
                } else {
                    self.promptForFileFormat();
                }
            };
        },
        // Prompt the user to select which delimiter the export should use.
        // Their cultural version of csv or Excel preferred Tab.
        // Also allow the user to save this preference, and not be prompted again.
        promptForFileFormat: function () {
            var self = this,
                promptForFileFormatDialogId = "promptForFileFormat-Dialog",
                promptForFileFormatDialog = dijit.byId(promptForFileFormatDialogId);

            if (!promptForFileFormatDialog) {
                promptForFileFormatDialog = new dijitDialog({
                    id: promptForFileFormatDialogId,
                    title: self.exportToFile_DialogTitle
                });
            }

            promptForFileFormatDialog.attr("content", this.getPromptForFileFormatTemplate().apply({ dialogId: promptForFileFormatDialogId }));
            promptForFileFormatDialog.show();
        },
        getPromptForFileFormatTemplate: function () {
            if (this.excelSupported) {
                return new Simplate([
                    '<div>',
                    '<label style="padding-left:5px">{%= commonTaskActions.selectFileFormat %}</label>',
                    '<br />',
                    '<div style="padding-left:10px; padding-top:7px">',
                    '<input id="radioExcel" name="format_type" type="radio" data-dojo-type="dijit.form.RadioButton" value="excel" checked="true" />{%= commonTaskActions.exportToFile_OptionExcel %}',
                    '</div>',
                    '<div style="padding-left:10px; padding-top:7px">',
                    '<input id="radioCSV" name="format_type" type="radio" data-dojo-type="dijit.form.RadioButton" value="csv" />{%= commonTaskActions.exportToFile_OptionCSV %}',
                    '</div>',
                    '<div style="padding-left:10px; padding-top:7px">',
                    '<input id="radioTab" name="format_type" type="radio" data-dojo-type="dijit.form.RadioButton" value="tab" />{%= commonTaskActions.exportToFile_OptionTab %}',
                    '</div>',
                    '<div style="padding-left:11px; padding-top:7px">',
                    '<input id="exportFormatSaved" dojoAttachPoint="exportFormatSaved" data-dojo-type="dijit.form.CheckBox" value="true" />{%= commonTaskActions.exportToFile_OptionSaveFormat %}',
                    '</div>',
                    //buttons
                    '<div style="padding-right:5px; padding-bottom:5px; text-align:right;">',
                    '<button data-dojo-type="dijit.form.Button" type="submit" class="ok-button" onClick="commonTaskActions._exportToFile();">{%= commonTaskActions.exportToFile_OK %}</button>',
                    '<button data-dojo-type="dijit.form.Button" type="button" class="cancel-button" onClick="dijit.byId(\'promptForFileFormat-Dialog\').hide();">{%= commonTaskActions.exportToFile_Cancel %}</button>',
                    '</div>',
                    '</div>'
                ]);
            } else {
                return new Simplate([
                    '<div>',
                    '<label style="padding-left:5px">{%= commonTaskActions.selectFileFormat %}</label>',
                    '<br />',
                    '<div style="padding-left:10px; padding-top:7px">',
                    '<input id="radioCSV" name="format_type" type="radio" data-dojo-type="dijit.form.RadioButton" value="csv" checked="true" />{%= commonTaskActions.exportToFile_OptionCSV %}',
                    '</div>',
                    '<div style="padding-left:10px; padding-top:7px">',
                    '<input id="radioTab" name="format_type" type="radio" data-dojo-type="dijit.form.RadioButton" value="tab" />{%= commonTaskActions.exportToFile_OptionTab %}',
                    '</div>',
                    '<div style="padding-left:11px; padding-top:7px">',
                    '<input id="exportFormatSaved" dojoAttachPoint="exportFormatSaved" data-dojo-type="dijit.form.CheckBox" value="true" />{%= commonTaskActions.exportToFile_OptionSaveFormat %}',
                    '</div>',
                    //buttons
                    '<div style="padding-right:5px; padding-bottom:5px; text-align:right;">',
                    '<button data-dojo-type="dijit.form.Button" type="submit" class="ok-button" onClick="commonTaskActions._exportToFile();">{%= commonTaskActions.exportToFile_OK %}</button>',
                    '<button data-dojo-type="dijit.form.Button" type="button" class="cancel-button" onClick="dijit.byId(\'promptForFileFormat-Dialog\').hide();">{%= commonTaskActions.exportToFile_Cancel %}</button>',
                    '</div>',
                    '</div>'
                ]);
            }
        },
        onDoExport: function(exportFormat) {
            var selection = this.getSelectionInfo();
            if (selection.selectionCount > 0)
            {
                dojo.byId('tskExportToExcel').click();
            } else {
              var trigger = this.getExcelJob(this.getSelectionInfo(), this);
              if (trigger) 
                trigger();
            }
        },
        onExportToFileClick: function () {
            //Get the user preference
            var typeIsSaved = dojo.byId("exportFormatSaved");
            var formatType;
            //Save the user preference
            if (typeIsSaved !== undefined && typeIsSaved.checked) {
                document.cookie = "formatIsSaved=true; expires=1/01/2020";
            }
            if (dojo.byId("radioCSV").checked) {
                formatType = "csv";
            } else if (dojo.byId("radioTab").checked) {
                formatType = "tab";
            } else if (dojo.byId("radioExcel").checked) {
                formatType = "excel";
            } else {
                formatType = "csv";
            }
            document.cookie = "format=" + formatType + "; expires=1/01/2020";
            
            this.onDoExport(formatType);

            //Call the click event for the hidden sumbit button.
            //dojo.byId('tskExportToExcel').click();
        },
        emailSend: function () {
            this.getCurrentEntity();
            var url = "slxdata.ashx/slx/crm/-/namedqueries?columnaliases=email&format=json&hql=";
            var sHql = this.getURL(this.currentEntityTableName);

            if (sHql === null) {
                dialogs.showError(this.noPrimaryEmail);
                return;
            }
            url = url + sHql;
            var self = this;
            dojo.xhrGet({
                url: url,
                handleAs: 'json',
                load: function (data) {
                    self.sendEmail(data);
                },
                error: function (error) {
                    dialogs.showError(error.StatusText);
                }
            });
        },
        getURL: function (entity) {
            var url = null;
            switch (entity) {
                // Example when using cached Named Query                            
                case 'CONTACT':
                    url = dString.substitute("select con.Email from Contact con where con.id like '${0}'", [this.currentEntityId]);
                    break;
                case 'ACCOUNT':
                    url = dString.substitute("select con.Email from Contact as con where con.Account.id like '${0}' and con.IsPrimary like 'T'", [this.currentEntityId]);
                    break;
                case 'OPPORTUNITY':
                    url = dString.substitute("select con.Email from Opportunity as opp left join opp.Contacts as oppCon left join oppCon.Contact as con where opp.id like '${0}' and oppCon.IsPrimary like 'T'", [this.currentEntityId]);
                    break;
                case 'LEAD':
                    url = dString.substitute("select le.Email from Lead le where le.id like '${0}'", [this.currentEntityId]);
                    break;
                case 'CAMPAIGN':
                    url = dString.substitute("select ufo.Email from Campaign as cam left join cam.AccountManager as usr left join usr.UserInfo as ufo where cam.id like '${0}'", [this.currentEntityId]);
                    break;
                case 'TICKET':
                    url = dString.substitute("select ufo.Email from User as usr left join usr.UserInfo as ufo where usr.DefaultOwner in  (select own.id from Ticket as tic left join tic.AssignedTo as own where tic.id like '${0}')", [this.currentEntityId]);
                    break;
                case 'DEFECT':
                    url = dString.substitute("select ufo.Email from User as usr left join usr.UserInfo as ufo where usr.DefaultOwner in (select own.id from Defect as def left join def.AssignedTo as own where def.id like '${0}')", [this.currentEntityId]);
                    break;
                case 'CONTRACT':
                    url = dString.substitute("select con.Email from Contract as crt left join crt.Contact as con where crt.id like '${0}'", [this.currentEntityId]);
                    break;
                case 'SALESORDER':
                    url = dString.substitute("select so.ShippingContact.Email from SalesOrder as so where so.Id eq '${0}'", [this.currentEntityId]);
                    break;
                case 'RMA':
                    url = dString.substitute("select con.Email from Return as ret left join ret.ReturnedBy as con where ret.id like '${0}'", [this.currentEntityId]);
                    break;
            }
            return url;
        },
        sendEmail: function (email) {
            if (email.count > 0) {
                var sEmail = email.items[0].email;
                if (sEmail) {
                    sEmail = "mailto:" + sEmail;
                    document.location.href = sEmail;
                    return;
                }
            }
            dialogs.showError(this.noPrimaryEmail);
        },
        // this is a callback method that calls a method on the Sage.ClientLinkHandler which has a global
        // module that converts the client call into a code-behind call that is handled in the ClientLinkHandler.ascx.cs
        // file.  The method in the Sage.ClientLinkHandler calls a method in the server-side LinkHandler which lives in App_Code.
        // From there, a dialog can be created and displayed.  The dialog takes the selection key and uses the
        // client selection service to get the selected records from the grid.  This callback method is defined in the
        // FillDictionaries method in CommonTasksTasklet.ascx.cs.

        copyUser: function (clientId) {
            clientId = clientId || 'hfSelections';
            var selectionKey = dojo.byId(clientId).value;
            Sage.ClientLinkHandler.request({ request: 'Administration', type: 'CopyUser', selectionInfoKey: selectionKey });
        },
        copyUserProfile: function (clientId) {
            clientId = clientId || 'hfSelections';
            var selectionKey = dojo.byId(clientId).value;
            Sage.ClientLinkHandler.request({ request: 'Administration', type: 'CopyUserProfile', selectionInfoKey: selectionKey });
        },
        deleteUsers: function (clientId) {
            clientId = clientId || 'hfSelections';
            var selectionKey = dojo.byId(clientId).value;
            Sage.ClientLinkHandler.request({ request: 'Administration', type: 'DeleteUsers', selectionInfoKey: selectionKey });
        },
        addToTeam: function (clientId) {
            clientId = clientId || 'hfSelections';
            var selectionKey = dojo.byId(clientId).value;
            Sage.ClientLinkHandler.request({ request: 'Administration', type: 'AddToTeam', selectionInfoKey: selectionKey });
        },
        removeFromTeam: function (clientId) {
            clientId = clientId || 'hfSelections';
            var selectionKey = dojo.byId(clientId).value;
            Sage.ClientLinkHandler.request({ request: 'Administration', type: 'RemoveFromTeam', selectionInfoKey: selectionKey });
        },
        removeFromAllTeams: function (clientId) {
            clientId = clientId || 'hfSelections';
            var selectionKey = dojo.byId(clientId).value;
            Sage.ClientLinkHandler.request({ request: 'Administration', type: 'RemoveFromAllTeams', selectionInfoKey: selectionKey });
        },
        assignRole: function (clientId) {
            clientId = clientId || 'hfSelections';
            var selectionKey = dojo.byId(clientId).value;
            Sage.ClientLinkHandler.request({ request: 'Administration', type: 'AssignRole', selectionInfoKey: selectionKey });
        },
        replaceTeamMember: function (clientId) {
            clientId = clientId || 'hfSelections';
            var selectionKey = dojo.byId(clientId).value;
            Sage.ClientLinkHandler.request({ request: 'Administration', type: 'ReplaceTeamMember', selectionInfoKey: selectionKey });
        },
        deleteTeam: function (clientId) {
            clientId = clientId || 'hfSelections';
            var selectionKey = dojo.byId(clientId).value;
            Sage.ClientLinkHandler.request({ request: 'Administration', type: 'DeleteTeam', selectionInfoKey: selectionKey });
        },
        deleteDepartment: function (clientId) {
            clientId = clientId || 'hfSelections';
            var selectionKey = dojo.byId(clientId).value;
            Sage.ClientLinkHandler.request({ request: 'Administration', type: 'DeleteDepartment', selectionInfoKey: selectionKey });
        },
        copyTeam: function (clientId) {
            clientId = clientId || 'hfSelections';
            var selectionKey = dojo.byId(clientId).value;
            Sage.ClientLinkHandler.request({ request: 'Administration', type: 'CopyTeam', selectionInfoKey: selectionKey });
        },
        copyDepartment: function (clientId) {
            clientId = clientId || 'hfSelections';
            var selectionKey = dojo.byId(clientId).value;
            Sage.ClientLinkHandler.request({ request: 'Administration', type: 'CopyDepartment', selectionInfoKey: selectionKey });
        },
        showDetailReport: function () {
            var oReporting = Sage.Services.getService("ReportingService");
            if (oReporting) {
                oReporting.showDefaultReport();
            }
        },
        writeEmailToGroupSelection: function () {
            email.writeEmailToGroupSelection();
        },
        importFromFile: function () {
            this.getCurrentEntity();
            if (this.currentEntityPrettyName) {
                var requestOptions = {
                    entry: {
                        "$name": "IsImportEnabledForEntity",
                        "request": {
                            "ImportHistoryId": null,
                            "entityName": this.currentEntityPrettyName
                        }
                    },
                    businessRuleMethod: "IsImportEnabledForEntity",
                    onSuccess: dojo.hitch(this, function (canImport) {
                        if (canImport) {
                            var importWizard = new ImportWizardController(this.currentEntityPrettyName,this.currentEntityDisplayName, dString.substitute("${0}, Sage.Entity.Interfaces", [this.currentEntityType]));
                            importWizard.startWizard();
                        } else {
                            dialogs.showError(dString.substitute(this.entityNotImportable, [this.currentEntityDisplayName]));
                        }
                    }),
                    onFailure: function (result) {
                        dialogs.showError(dString.substitute(this.errorRequestEntityImportable, [result]));
                    }
                };
                importManagerUtility.importRuleRequest(requestOptions, "importHistory", false);


            }
        },
        bulkActionDeleteJob: function () {
            this.getCurrentEntity();
            this.prepareSelectedRecords(this.confirmBulkActionDelete(this.getSelectionInfo()));
        },
        confirmBulkActionDelete: function (selectionInfo) {
            return dojo.hitch(this, function () {
                dialogs.raiseQueryDialog(
                    dString.substitute(this.deleteSelectedRecords, [this.currentEntityDisplayName]),
                    dString.substitute('${0}', [this.confirmBulkDeleteJob]),
                    dojo.hitch(this, function (result) {
                        this.deleteBulkActionItem(result, selectionInfo);
                    }),
                    this.yesButtonText,
                    this.noButtonText
                );
            });
        },
        deleteBulkActionItem: function (processJob, selectionInfo) {
            if (processJob) {
                var groupId = this.getCurrentGroupId();
                if (groupId === "LOOKUPRESULTS") {
                    groupId = this.getDefaultGroupId();
                }

                if (this.currentEntityPrettyName) {
                    var parameters = [
                        { "name": "EntityName", "value": this.currentEntityPrettyName },
                        { "name": "SelectedIds", "value": (selectionInfo.selectionCount > 0) ? selectionInfo.selectedIds.join(',') || '' : '' },
                        { "name": "GroupId", "value": groupId },
                        { "name": "AppliedFilters", "value": Sys.Serialization.JavaScriptSerializer.serialize(jobs.getFiltersForJob()) },
                        { "name": "LookupConditions", "value": Sys.Serialization.JavaScriptSerializer.serialize(jobs.getLookupConditionsForJob()) },
                        { "name": "EntityTableName", "value": this.currentEntityTableName }
                    ];

                    var options = {
                        descriptor: this.deleteJob_Description,
                        showErrorNotification: false,
                        closable: true,
                        title: dString.substitute(this.deleteBulkJobTitle, [this.currentEntityDisplayName]),
                        key: "Sage.SalesLogix.BusinessRules.Jobs.DeleteEntityJob",
                        parameters: parameters,
                        success: function () {
                        },
                        failure: function (result) {
                            console.log(result);
                            dialogs.showError(dString.substitute(this.deleteJobError, [this.currentEntityDisplayName, result.statusText]));
                        },
                        ensureZeroFilters: true
                    };
                    jobs.triggerJobAndDisplayProgressDialog(options);
                }
            }
        },
        bulkActionUpdateJob: function () {
            //ensure the entity supports bulk action updates
            this.getCurrentEntity();
            this._metaDataService = sDataServiceRegistry.getSDataService('metadata');
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(this._metaDataService);
            request.setResourceKind(dString.substitute("entities('${0}')", [this.currentEntityPrettyName]));
            request.setQueryArg("select", "bulkAction/*");
            request.read({
                success: dojo.hitch(this, function (result) {
                    if (result && result.$resources && result.$resources[0].bulkAction.canBulkUpdate) {
                        this.prepareSelectedRecords(this.confirmBulkActionUpdate(this.getSelectionInfo()));
                    } else {
                        dialogs.showError(dString.substitute(this.errorBulkActionNotSupported, [this.currentEntityDisplayName]));
                    }
                }),
                failure: function (result) {
                    dialogs.showError(this.errorBulkActionRequest);
                }
            });
        },
        confirmBulkActionUpdate: function (selectionInfo) {
            return dojo.hitch(this, function () {
                var updateDialog = dijit.byId("dlgBulkUpdateWidget");
                if (!updateDialog) {
                    var options = {
                        currentEntityPrettyName: this.currentEntityPrettyName,
                        currentEntityTableName: this.currentEntityTableName,
                        selectionInfo: selectionInfo
                    };
                    updateDialog = new BulkUpdateWidget(options);
                }
                updateDialog.show();
            });
        },
        mapGroup: function (baseUrl, errMsg, lcid) {
            var svc = Sage.Services.getService("ClientGroupContext"),
                grpContext;
            if (svc !== null) {
                grpContext = svc.getContext();
            }

            this.getCurrentEntity();

            if (baseUrl &&
                (this.currentEntityPrettyName === "Account" ||
                    this.currentEntityPrettyName === "Contact")) {
                // Get the current selections, if any
                try {
                    this.selectionInfo = this.getSelectionInfo();
                } catch (e) {
                    dialogs.showInfo(this.errorNoData);
                }
                if (this.selectionInfo !== null && this.selectionInfo.selectionCount > 0) {
                    // Records are selected in this group
                    if (!window.open(baseUrl + "?type=I" + encodeURIComponent(this.currentEntityPrettyName) +
                        "&grp=" + encodeURIComponent(grpContext.CurrentGroupID) +
                        "&sort=" + encodeURIComponent("Account") +
                        "&asc=" + encodeURIComponent("True") +
                        "&selected=" + encodeURIComponent(this.selectionInfo.selectedIds.join(";")) +
                        "&lcid=" + encodeURIComponent(lcid), "_blank")) {
                        dialogs.showError(errMsg);
                    }
                } else {
                    // Show everything
                    if (!window.open(baseUrl + "?type=I" + encodeURIComponent(this.currentEntityPrettyName) +
                        "&grp=" + encodeURIComponent(grpContext.CurrentGroupID) +
                        "&sort=" + encodeURIComponent("Account") +
                        "&asc=" + encodeURIComponent("True") +
                        "&lcid=" + encodeURIComponent(lcid), "_blank")) {
                        dialogs.showError(errMsg);
                    }
                }
            }
        },
        showNearby: function (baseUrl, errMsg) {
            this.getCurrentEntity();

            if (baseUrl && this.currentEntityId &&
                (this.currentEntityPrettyName === "Account" ||
                    this.currentEntityPrettyName === "Contact")) {
                if (!window.open(baseUrl + "?start=" + encodeURIComponent(this.currentEntityId), "_self")) {
                    dialogs.showError(errMsg);
                }
            }
        }
    });
    return commonTasksTasklet;
});