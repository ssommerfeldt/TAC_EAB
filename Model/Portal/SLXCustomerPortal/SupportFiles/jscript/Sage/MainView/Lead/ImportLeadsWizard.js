require({cache:{
'url:Sage/MainView/Lead/templates/ImportLeadsProgressDisplay.html':"[\r\n'<div>',\r\n    '<div data-dojo-type=\"dijit.Dialog\" title=\"{%= $.importProgressCaption %}\" dojoAttachPoint=\"_dialog\" dojoAttachEvent=\"onCancel:_close\" style=\"width: 450px\">',\r\n        '<div data-dojo-type=\"dijit.form.Form\" id=\"{%= $.id %}_frmImportProgress\">',\r\n            '<label dojoAttachPoint=\"lblProcessingLabelContainer\">{%= $.lblPrimaryProgress %}</label>',\r\n            '<div dojoAttachPoint=\"importPrimaryProgressBarContainer\"></div>',\r\n            '<div dojoAttachPoint=\"importSecondaryProgressBarContainer\"></div>',\r\n            '<table border=\"0\" cellpadding=\"1\" cellspacing=\"0\" class=\"formtable\">',\r\n                '<tr>',\r\n                    '<td class=\"alignright\">',\r\n                        '<label>{%= $.lblTotalRecords %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<span class=\"textcontrol\">',\r\n                            '<input dojoType=\"dijit.form.TextBox\" id=\"{%= $.id %}_recordCount\" dojoAttachPoint=\"totalRecordCount\" readonly=\"readonly\" />',\r\n                        '</span>',\r\n                    '</td>',\r\n                '</tr>',\r\n                '<tr>',\r\n                    '<td class=\"alignright\">',\r\n                        '<label>{%= $.lblTotalRecordsProcessed %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<span class=\"textcontrol\">',\r\n                            '<input dojoType=\"dijit.form.TextBox\" id=\"{%= $.id %}_processedCount\" dojoAttachPoint=\"processedCount\" readonly=\"readonly\" />',\r\n                        '</span>',\r\n                    '</td>',\r\n                '</tr>',\r\n                '<tr>',\r\n                    '<td class=\"alignright\">',\r\n                        '<label>{%= $.lblTotalRecordsImported %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<span class=\"textcontrol\">',\r\n                            '<input dojoType=\"dijit.form.TextBox\" id=\"{%= $.id %}_importedCount\" dojoAttachPoint=\"importedCount\" readonly=\"readonly\" />',\r\n                        '</span>',\r\n                    '</td>',\r\n                '</tr>',\r\n                 '<tr>',\r\n                    '<td class=\"alignright\">',\r\n                        '<label>{%= $.lblTotalRecordsMerged %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<span class=\"textcontrol\">',\r\n                            '<input dojoType=\"dijit.form.TextBox\" id=\"{%= $.id %}_mergedCount\" dojoAttachPoint=\"mergedCount\" readonly=\"readonly\" />',\r\n                        '</span>',\r\n                    '</td>',\r\n                '</tr>',\r\n                 \r\n                '<tr>',\r\n                    '<td class=\"alignright\">',\r\n                        '<label>{%= $.lblTotalDuplicates %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<span class=\"textcontrol\">',\r\n                            '<input dojoType=\"dijit.form.TextBox\" id=\"{%= $.id %}_duplicatesCount\" dojoAttachPoint=\"duplicateCount\" readonly=\"readonly\" />',\r\n                        '</span>',\r\n                    '</td>',\r\n                '</tr>',\r\n                '<tr>',\r\n                    '<td class=\"alignright\">',\r\n                        '<label>{%= $.lblDuplicateRate %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<span class=\"textcontrol\">',\r\n                            '<div dojoType=\"Sage.UI.Controls.Numeric\" id=\"{%= $.id %}_duplicateRate\" constraints=\"{ places: 0, type: \\'percent\\' }\" dojoAttachPoint=\"duplicateRate\" readonly=\"readonly\" style=\"width: auto\"></div>',\r\n                        '</span>',\r\n                    '</td>',\r\n                '</tr>',\r\n                 '<tr>',\r\n                    '<td class=\"alignright\">',\r\n                        '<label>{%= $.lblTotalProjectedDuplicates %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<span class=\"textcontrol\">',\r\n                            '<input dojoType=\"dijit.form.TextBox\" id=\"{%= $.id %}_projectedDuplicateCount\" dojoAttachPoint=\"projectedDuplicateCount\" readonly=\"readonly\" />',\r\n                        '</span>',\r\n                    '</td>',\r\n                '</tr>',\r\n                '<tr>',\r\n                    '<td class=\"alignright\">',\r\n                        '<label>{%= $.lblTotalErrors %}</label>',\r\n                    '</td>',\r\n                    '<td>',\r\n                        '<span class=\"textcontrol\">',\r\n                            '<input dojoType=\"dijit.form.TextBox\" id=\"{%= $.id %}_errorCount\" dojoAttachPoint=\"errorCount\" readonly=\"readonly\" />',\r\n                        '</span>',\r\n                    '</td>',\r\n                '</tr>',\r\n            '</table>',\r\n            '<div dojoAttachPoint=\"importHistoryLinkContainer\" class=\"display-none\">',\r\n                '<label>{%= $.lblImportHistoryLinkText %}</label>',\r\n                '<br/>',\r\n                '<label>{%= $.lblImportLinkNumber %}</label>',\r\n                '<a dojoAttachPoint=\"importHistoryLink\"></a>',\r\n            '</div>',\r\n            '<div class=\"button-bar\" align=\"right\">',\r\n                '<div data-dojo-type=\"dijit.form.Button\" id=\"{%= $.id%}_btn_Cancel\" dojoAttachPoint=\"btn_Cancel\" dojoAttachEvent=\"onClick:_cancel\">{%= $.btnCancelText %}</div>',\r\n                '<div data-dojo-type=\"dijit.form.Button\" id=\"{%= $.id%}_btn_Close\" dojoAttachPoint=\"btn_Close\" dojoAttachEvent=\"onClick:_close\">{%= $.btnCloseText %}</div>',\r\n            '</div>',\r\n        '</div>',\r\n    '</div>',\r\n'</div>'\r\n]"}});
/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/MainView/Lead/ImportLeadsWizard", [
    'dojo/_base/declare',
    'dojo/i18n!./nls/ImportLeadsWizard',
    'dijit/_Widget',
    'Sage/_Templated',
    'Sage/UI/Dialogs',
    'dojo/text!./templates/ImportLeadsProgressDisplay.html',
    'dijit/ProgressBar',
    'dojo/string',
    'dijit/form/Form',
    'dijit/layout/ContentPane',
    'dojox/layout/TableContainer'
],
function (declare, i18NStrings, widget, templated, dialogs, importLeadsProgressDisplay, progressBar, dojoString) {
    var importLeadsWizard = declare('Sage.MainView.Lead.ImportLeadsWizard', [widget, templated], {
        statusEnum: {
            Initialize: 0,
            Started: 1,
            Processing: 2,
            Completed: 3,
            Abort: 4
        },
        importHistoryId: '',
        startProcessCtrlId: '',
        isActualImport: true,
        widgetsInTemplate: true,
        progressBar: '',
        secondaryProgressBar: null,
        secondaryProgressCounter:0,
        widgetTemplate: new Simplate(eval(importLeadsProgressDisplay)),
        constructor: function () {
            dojo.mixin(this, i18NStrings);
        },
        onAddHocGroupChecked: function (groupOptionsId, chkAddToGroupId) {
            var addToGroup = dojo.byId(chkAddToGroupId);
            if (addToGroup) {
                var value = addToGroup.checked;
                var groupOptions = dojo.byId(groupOptionsId);
                if (value) {
                    dojo.style(groupOptions, 'display', '');
                }
                else {
                    dojo.style(groupOptions, 'display', 'none');
                }
            }
        },
        onGridViewRowSelected: function (rowIdx, grdCtrlId, rowIdxCtrlId) {
            var gridViewCtl = dojo.byId(grdCtrlId);
            var idxCtrl = dojo.byId(rowIdxCtrlId);
            var selRow = this.getSelectedRow(idxCtrl.value, gridViewCtl);
            if (selRow) {
                selRow.style.backgroundColor = '#ffffff';
            }

            selRow = this.getSelectedRow(rowIdx, gridViewCtl);
            if (null !== selRow) {
                idxCtrl.value = rowIdx;
                selRow.style.backgroundColor = '#E3F2FF';
            }
        },
        getSelectedRow: function (rowIdx, gridViewCtl) {
            if (gridViewCtl) {
                return gridViewCtl.rows[rowIdx];
            }
            return null;
        },
        enableDisableControl: function (control, value) {
            if (control) {
                control.disabled = value;
            }
        },
        showImportProcess: function (startProcessCtrlId) {
            this.isActualImport = true;
            this.startProcessCtrlId = startProcessCtrlId;
            this.showProcess();
        },
        showTestImportProcess: function (startProcessCtrlId) {
            this.isActualImport = false;
            this.startProcessCtrlId = startProcessCtrlId;
            this.showProcess();
        },
        showProcess: function () {
            this.clearResults();
            this._dialog.show();
            var self = this;
            setTimeout(function () { self.getImportHistory(); }, 1000);
        },
        setDisplayProperty: function (property, display) {
            if (property && display) {
                dojo.removeClass(property, "display-none");
            }
            else if (property) {
                dojo.addClass(property, "display-none");
            }
        },
        getImportHistory: function () {
            if (this.importHistoryId === '') {
                this.invokeClickEvent(dojo.byId(this.startProcessCtrlId));
                var contextService = Sage.Services.getService("ClientContextService");
                if ((contextService) && (contextService.containsKey("ImportHistoryId"))) {
                    this.importHistoryId = contextService.getValue("ImportHistoryId");
                }
            }
            if (this.importHistoryId !== '') {
                var select = "select=ImportNumber,Status,StatusCode,RecordCount,ProcessedCount,DuplicateCount,ImportedCount,MergeCount,ErrorCount,WarningCount";
                var self = this;
                var sUrl = dojoString.substitute("slxdata.ashx/slx/dynamic/-/importHistory('${0}')?${1}&format=json", [this.importHistoryId, select]);
                dojo.xhrGet({
                    cache: false,
                    preventCache: true,
                    handleAs: 'json',
                    url: sUrl,
                    load: function (importHistory) {
                        self.updateProgress(importHistory);
                    },
                    data: {},
                    error: function (request, status, error) {
                        dialogs.showError(this.errorRequestImportHistory);
                    }
                });
            }
        },
        updateProgress: function (importHistory) {
            var self, percentDone, duplicateRate, projectedDupeCount, pollPeriod;
            if (importHistory !== null) {
                self = this;
                this.totalRecordCount.set('value', importHistory.RecordCount);
                if (importHistory.ProcessedCount > 0) {
                    this.processedCount.set('value', importHistory.ProcessedCount);
                    this.duplicateCount.set('value', importHistory.DuplicateCount);
                    this.importedCount.set('value', importHistory.ImportedCount);
                    this.mergedCount.set('value', importHistory.MergeCount);

                    if (importHistory.ProcessedCount > 0) {
                        duplicateRate = importHistory.DuplicateCount / importHistory.ProcessedCount;
                    } else {
                        duplicateRate = 0;
                    }
                    projectedDupeCount = (duplicateRate * importHistory.RecordCount);
                    this.projectedDuplicateCount.set('value', projectedDupeCount);
                    this.duplicateRate.focusNode.set('value', duplicateRate);
                    this.errorCount.set('value', importHistory.ErrorCount);
                    if (!this.progressBar) {
                        this.setDisplayProperty(this.lblProcessingLabelContainer, false);
                        this.progressBar = new progressBar({
                            id: 'importPrimaryProgressBar',
                            maximum: importHistory.RecordCount
                        });
                        dojo.place(this.progressBar.domNode, this.importPrimaryProgressBarContainer, 'only');
                        this.importHistoryLink.href = dojoString.substitute('ImportHistory.aspx?entityid=${0}&modeid=Detail', [this.importHistoryId]);
                        this.importHistoryLink.innerHTML = importHistory.ImportNumber;
                        this.setDisplayProperty(this.importHistoryLinkContainer, this.isActualImport);
                    }
                    if (!this.secondaryProgressBar) {
                        this.secondaryProgressBar = new progressBar({
                            id: 'secondaryImportProgressBar',
                            maximum: 10
                        });
                        dojo.place(this.secondaryProgressBar.domNode, this.importSecondaryProgressBarContainer, 'only');
                        this.secondaryProgressBar.set("label", "");
                    }
                    if (importHistory.RecordCount > 0) {
                        percentDone = ((this.processedCount.value / importHistory.RecordCount)*100);
                    } else {
                        percentDone = 100;
                    }
                    if (this.secondaryProgressCounter < 10) {
                        this.secondaryProgressCounter++;
                    } else {
                        this.secondaryProgressCounter = 0;
                    }
                    this.progressBar.set('value', importHistory.ProcessedCount);
                    this.secondaryProgressBar.set('value', this.secondaryProgressCounter);
                    this.secondaryProgressBar.set("label",  this.importStatusProcessing);
                }
                if (importHistory.StatusCode === this.statusEnum.Processing) {
                    pollPeriod = 500;
                    if (importHistory.RecordCount > 100) {
                        pollPeriod = 1000;
                    }
                    setTimeout(function() { self.getImportHistory(); }, pollPeriod);
                }
                else if (importHistory.StatusCode === this.statusEnum.Completed) {
                    this.progressBar.set('value', this.progressBar.maximum);
                    this.secondaryProgressBar.set('value', this.secondaryProgressBar.maximum);
                    this.setDisplayProperty(this.secondaryProgressBar, false);
                    this.secondaryProgressBar.set("label", this.importStatusCompleted);
                    this.setDisplayProperty(this.btn_Cancel.domNode, false);
                    if (!this.isActualImport) {
                        this.deleteImportHistory();
                    }
                }
            }
        },
        deleteImportHistory: function () {
            var sUrl = dojoString.substitute("slxdata.ashx/slx/dynamic/-/importHistory('${0}')", [this.importHistoryId]);
            dojo.xhrDelete({
                handleAs: 'json',
                url: sUrl,
                error: function (request, status, error) {
                }
            });
        },
        invokeClickEvent: function (control) {
            if (dojo.isIE) {
                control.click();
            } else {
                var e = document.createEvent("MouseEvents");
                e.initEvent("click", true, true);
                control.dispatchEvent(e);
            }
        },
        clearResults: function () {
            this.setDisplayProperty(this.btn_Cancel.domNode, this.isActualImport);
            this.setDisplayProperty(this.importHistoryLinkContainer, false);
            this.totalRecordCount.set('value', this.calculatingText);
            this.processedCount.set('value', this.calculatingText);
            this.importedCount.set('value', this.calculatingText);
            this.mergedCount.set('value', this.calculatingText);
            this.duplicateCount.set('value', this.calculatingText);
            this.projectedDuplicateCount.set('value', this.calculatingText);
            this.duplicateRate.focusNode.set('value', 0);
            this.duplicateCount.set('value', this.calculatingText);
            this.errorCount.set('value', this.calculatingText);
        },
        _cancel: function () {
            this.abortImport();
            this._close();
        },
        abortImport: function () {
            var service = Sage.Data.SDataServiceRegistry.getSDataService('dynamic', false, true, true);
            var request = new Sage.SData.Client.SDataSingleResourceRequest(service);
            if (this.importHistoryId !== '') {
                request.setResourceSelector(dojo.string.substitute("'${0}'", [this.importHistoryId]));
                request.setResourceKind('importHistory');
                var status = this.abortImportProcessStatus;
                request.update({ Status: status, ProcessState: status }, {
                    scope: this,
                    success: function(response) {
                    },
                    failure: function(response) {
                        console.log(response);
                    }
                });
            }
        },
        _close: function () {
            this._dialog.hide();
            if (this.progressBar) {
                this.progressBar.destroy();
            }
            if (this.secondaryProgressBar) {
                this.secondaryProgressBar.destroy();
            }
        }
    });
    return importLeadsWizard;
});
