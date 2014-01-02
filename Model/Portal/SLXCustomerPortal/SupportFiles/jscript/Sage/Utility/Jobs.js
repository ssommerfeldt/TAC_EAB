/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define([
    'Sage/Utility',
    'dijit/registry',
    'dojo/date/locale',
    'dojo/string',
    'dojo/_base/declare',
    'Sage/UI/Dialogs',
    'dojo/i18n!./nls/Jobs',
    'dijit/ProgressBar',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'dojo/_base/lang',
    'dojo/_base/array'
],
function (utility, registry, dateLocale, dojoString, declare, dialogs, nlsStrings, dijitProgressBar, dialogHelpIconMixin, lang, dojoArray) {
    Sage.namespace('Utility.Jobs');
    lang.mixin(Sage.Utility.Jobs, {
        _intervalId: null,
        _triggerId: null,
        _jobService: null,
        _options: null,
        _pollIntervalInSeconds: 5,
        progressDialog: false,
        progressBar: false,
        /**
        * Triggers a job for immediate execution and displays a progress dialog.
        * @param {Object} options - Options for the function.
        * @param {string} options.key - The id of the job to be executed. Example: 'Sage.SalesLogix.BusinessRules.Jobs.UpdateEntityJob'.
        * @param {Array} [options.parameters] - An array containing parameters to be passed to the Job execution.
        * @param {function} [options.complete] - An optional callback function to be executed on complete.
        * @param {function} [options.failure] - An optional callback function to be executed on failure.
        * @param {boolean} [options.closable=true] - Whether the progress dialog can be closed or not.
        * @param {string} [options.infoMessage] - A message to show to the user in the progress dialog.
        * @param {string} [options.title] - The title of the progress dialog.
        * @param {boolean} [options.showDismissButton=true] - Whether to show the dismiss button when the job completes or not.
        * @param {number} [options.width=400] - The progress dialog width.
        * @param {boolean} [options.indeterminate=false] - Whether to show an indeterminate progress bar or not.
        * @param {number} [options.maximum=100] - Maximum value for the progress bar.
        * @param {boolean} [options.showCompleteNotification=false] - Whether to show a default complete notification on complete. This is displayed as an
        *       information dialog, its usage would typically be used when closing the progress dialog, in which case this message is displayed as a informational
        *       dialog when the job completes. Is redundant when the progress dialog is not closed.
        * @param {boolean} [options.showErrorNotification=true] - Whether to show a default error notification on error.        
        * @param {boolean} [options.ensureZeroFilters] - Forces a check to ensure no filters are applied.
        */
        triggerJobAndDisplayProgressDialog: function (options) {
            var self = this;
            self._reset();
            if (!this._validateOptions(options)) {
                return;
            }
            self._options = {
                key: options.key,
                closable: (typeof options.closable === 'boolean') ? options.closable : true,
                infoMessage: (typeof options.infoMessage === 'string') ? options.infoMessage : '',
                title: (typeof options.title === 'string') ? options.title : nlsStrings.defaultProgressDialogTitle,
                showDismissButton: (typeof options.showDismissButton === 'boolean') ? options.showDismissButton : true,
                width: (typeof options.width === 'number') ? options.width : 400,
                indeterminate: (typeof options.indeterminate === 'boolean') ? options.indeterminate : false,
                maximum: (typeof options.maximum === 'number') ? options.maximum : 100,
                showCompleteNotification: (typeof options.showCompleteNotification === 'boolean') ? options.showCompleteNotification : false,
                showErrorNotification: (typeof options.showErrorNotification === 'boolean') ? options.showErrorNotification : true,
                failure: options.failure,
                complete: options.complete,
                ensureZeroFilters: options.ensureZeroFilters === true ? true : false
            };

            if (self._options.ensureZeroFilters && self._getAppliedFilterCount() > 0) {
                dialogs.showError(nlsStrings.filtersAppliedError, self._options.dialogTitle);
                return;
            }

            var triggerJobOptions = {
                descriptor: options.descriptor,
                key: options.key,
                parameters: options.parameters,
                success: function (result) {
                    self._showProgressDialog(result.response ? result.response.triggerId : result.$key);
                },
                failure: function (xhr) {
                    var errorMsg = self._getErrorMessage(xhr);
                    if (self._options.showErrorNotification) {
                        dialogs.showError(errorMsg, self._options.dialogTitle);
                    }
                    if (self._options.failure) {
                        self._options.failure(errorMsg);
                    }
                }
            };
            this._jobService = Sage.Services.getService('JobService');
            this._jobService.scheduleJob(triggerJobOptions);
            dojo.publish('/job/execution/changed', [self]);
        },
        _getAppliedFilterCount: function () {
            var list = registry.byId('list');
            return list && list.getAppliedFilterCount();
        },
        formatElapsedTime: function (elapsedTime) {
            if (!elapsedTime) {
                elapsedTime = '00:00:00.00000';
            }
            var elapsedTimeArray = elapsedTime.split('.');
            return elapsedTimeArray[0];
        },
        formatJobDescription: function (job) {
            return !job ? '' : job.$descriptor;
        },
        formatDate: function (jsonDate) {
            if (!jsonDate) {
                return '';
            }
            //The substr function takes out the "/Date(" part, and the parseInt function gets the integer and ignores the ")/" at the end. The resulting number is passed into the Date constructor.
            var dateVar = new Date(parseInt(jsonDate.substr(6)));
            return dateLocale.format(dateVar, { selector: 'datetime', fullYear: true });
        },
        formatUser: function (user) {
            return user ? user.$descriptor : '';
        },
        formatRepeatCount: function (repeatCount) {
            if (repeatCount === -1) {
                return nlsStrings.repeatIndefinitely;
            }
            return repeatCount;
        },
        getTriggerDescription: function (trigger) {
            if (trigger) {
                if (trigger.$descriptor) {
                    return trigger.$descriptor;
                } else {
                    return trigger.$key;
                }
            }
            return '';
        },
        formatProgress: function (progress) {
            if (!progress || typeof progress !== 'number') {
                progress = 0;
            }
            var progressBar = new dijitProgressBar({
                indeterminate: false,
                maximum: 100,
                value: progress
            });
            return progressBar;
        },
        _validateOptions: function (options) {
            if (!options) {
                console.log('Invalid parameter: options');
                return false;
            }
            if (typeof options.key !== 'string') {
                console.log('Invalid parameter: options.key');
                return false;
            }
            return true;
        },
        _reset: function () {
            this._intervalId = null;
            this._options = null;
            this._triggerId = null;
        },
        _getErrorMessage: function (xhr) {
            var errorMsg = dojoString.substitute(nlsStrings.errorMessage, [this._options.key, xhr.status, xhr.statusText]);
            return errorMsg;
        },
        _getUnexpectedErrorMessage: function () {
            var errorMsg = dojoString.substitute(nlsStrings.unexpectedErrorMessage, [this._options.key]);
            return errorMsg;
        },
        getParameterRunAsUser: function (parameters) {
            if (parameters) {
                var userId = this._getParameterValue(parameters, "RunAsUserId");
                return utility.getUserName(userId);
            }
            return '';
        },
        _getParameterValue: function (parameters, name) {
            var value = "";
            if (parameters) {
                dojoArray.some(parameters, function (entry, i) {
                    if (entry.name === name) {
                        value = entry.value;
                        return true;
                    }
                });
            }
            return value;
        },
        _updateProgressDialog: function (options) {
            if (this.progressBar) {
                if (options && typeof options.progress === 'number') {
                    this.progressBar.update({ progress: options.progress });
                }
                if (options && typeof options.title === 'string') {
                    this.progressBar.update({ title: options.title });
                }
                if (options && typeof options.infoMessage === 'string') {
                    var messageDiv = dojo.byId('progressDialogMessageDiv');
                    if (messageDiv) {
                        messageDiv.innerHTML = options.infoMessage;
                    }
                }
            }
        },
        _showProgressDialog: function (triggerId) {
            var self = this;
            self._triggerId = triggerId;
            var options = self._options;

            this.progressDialog = new dijit.Dialog({
                title: options.title,
                style: dojo.string.substitute('width: ${0}px;', [options.width]),
                closable: options.closable
            });

            //Informational Message
            var messageDiv = new dojo.create('div', { innerHTML: options.infoMessage, style: 'text-align: left; margin-top: 5px; margin-bottom: 10px', id: 'progressDialogMessageDiv' });
            this.progressDialog.containerNode.appendChild(messageDiv);
            var linkDiv = new dojo.create('div', { style: 'text-align: left; margin-top: 5px; margin-bottom: 10px', id: 'progressDialogLinkDiv', "class": 'display-none' });
            this.progressDialog.containerNode.appendChild(linkDiv);

            this.progressBar = new dijit.ProgressBar({
                style: 'margin-top: 10px; margin-bottom: 20px',
                indeterminate: options.indeterminate,
                maximum: options.maximum,
                progress: 0
            });

            this.progressDialog.containerNode.appendChild(this.progressBar.domNode);

            //Dismiss button
            if (options.showDismissButton) {
                var cancelButton = new dijit.form.Button({
                    label: nlsStrings.cancelButtonCaption,
                    id: 'progressDialogCancelButton',
                    style: 'margin-right: 3px;',
                    dojoType: 'dijit.form.Button',
                    onClick: function (result) {
                        self._cancelJob();
                    }
                });
                var closeButton = new dijit.form.Button({
                    label: nlsStrings.closeButtonCaption,
                    id: 'progressDialogCloseButton',
                    onClick: function (result) {
                        self._closeProgressDialog();
                    }
                });
                var buttonDiv = new dojo.create('div', { id: 'progressDialogButtonDiv', style: 'text-align: center;' });
                buttonDiv.appendChild(cancelButton.domNode);
                buttonDiv.appendChild(closeButton.domNode);
                this.progressDialog.containerNode.appendChild(buttonDiv);
            }
            this.progressDialog.show();
            if (!this.progressDialog.helpIcon) {
                lang.mixin(this.progressDialog, new dialogHelpIconMixin());
                this.progressDialog.createHelpIconByTopic('jobsProgressDialog');
            }
            this._intervalId = setInterval(function () { Sage.Utility.Jobs._updateProgress(); }, this._pollIntervalInSeconds * 1000);
        },
        _cancelJob: function () {
            clearInterval(this._intervalId);
            if (!this.jobService) {
                this._jobService = Sage.Services.getService('JobService');
            }
            this._jobService.interruptExecution(this._options);
            this._closeProgressDialog();
        },
        _closeProgressDialog: function () {
            clearInterval(this._intervalId);
            if (this.progressDialog) {
                this.progressDialog.hide();
                this.progressDialog.destroyDescendants();
            }
        },
        _updateProgress: function () {
            var self = this;
            var jobService = Sage.Services.getService('JobService');
            var options = {
                triggerId: this._triggerId,
                success: function (execution) {
                    options = { progress: execution.progress };
                    self._updateProgressDialog(options);
                    var cancelButton = dijit.byId('progressDialogCancelButton');
                    if (execution.status === 'Complete') {
                        clearInterval(self._intervalId);
                        var resultContainer = dojo.byId('progressDialogMessageDiv');
                        if (resultContainer) {
                            resultContainer.innerHTML = nlsStrings.jobCompletedSuccessfully;
                        }
                        var linkContainer = dojo.byId('progressDialogLinkDiv');
                        if (linkContainer && execution.result) {
                            var parts = execution.result.split('://');
                            if (parts.length > 1) {
                                dojo.removeClass(linkContainer, 'display-none');
                                linkContainer.innerHTML = dojoString.substitute('<a onclick="Sage.Utility.Jobs._closeProgressDialog();" href="javascript: Sage.Utility.File.Attachment.getAttachment(\'${1}\');" title="${0}">${0}</a>',
                                    [execution.trigger ? execution.trigger.$descriptor : '', parts[1]]);
                            }
                        }
                        if (cancelButton) {
                            cancelButton.destroyRecursive();
                        }
                        if (self._options.showCompleteNotification) {
                            dialogs.showInfo(nlsStrings.jobCompletedSuccessfully, self._options.title);
                        }
                        if (self._options.complete) {
                            self._options.complete(execution);
                        }
                        dojo.publish('/job/execution/changed', [self]);
                    }

                    if (execution.status === 'Error') {
                        clearInterval(self._intervalId);
                        dialogs.closeProgressBar();
                        if (self._options.showErrorNotification) {
                            var errorMsg = execution.statusText ? self._getErrorMessage(execution) : self._getUnexpectedErrorMessage();
                            dialogs.showError(errorMsg, self._options.title);
                        }
                        if (self._options.failure) {
                            self._options.failure(execution);
                        }
                        if (cancelButton) {
                            cancelButton.destroyRecursive();
                        }
                    }
                },
                failure: function (execution) {
                    clearInterval(self._intervalId);
                    dialogs.closeProgressBar();
                    if (self._options.showErrorNotification) {
                        var errorMsg = execution.statusText ? self._getErrorMessage(execution) : self._getUnexpectedErrorMessage();
                        dialogs.showError(errorMsg, self._options.title);
                    }
                    if (self._options.failure) {
                        self._options.failure(execution);
                    }
                    var cancelButton = dijit.byId('progressDialogCancelButton');
                    if (cancelButton) {
                        cancelButton.destroyRecursive();
                    }
                }
            };
            jobService.getExecution(options);
        },
        refreshList: function (tabId) {
            try {
                var panel = dijit.byId('list');
                if (panel) {
                    var grpContextSvc = Sage.Services.getService('ClientGroupContext');
                    if (grpContextSvc) {
                        var ctx = grpContextSvc.getContext();
                        if (tabId === ctx.CurrentGroupID) {
                            panel.refreshView(tabId);
                        }
                    }
                }
            }
            catch (e) {
            }
        },
        /**
        * Return the id of the current group in the listview.
        * @returns {string} - The id of the current group in the listview.
        */
        getCurrentGroupId: function () {
            var svc = Sage.Services.getService('ClientGroupContext');
            var context = svc.getContext();
            return context.CurrentGroupID;
        }
    });
    return Sage.Utility.Jobs;
});