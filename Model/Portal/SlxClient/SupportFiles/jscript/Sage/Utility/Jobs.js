/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Utility/Jobs", [
    'Sage/Utility',
    'dojo/date/locale',
    'dojo/string',
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/_base/connect',
    'Sage/UI/Dialogs',
    'dojo/i18n!./nls/Jobs',
    'dijit/ProgressBar',
    'Sage/UI/Controls/_DialogHelpIconMixin',
    'Sage/Data/SDataServiceRegistry',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dijit/registry',
    'dijit/form/Button',
    'dijit/Dialog'    
],
function (
    utility,
    dateLocale,
    dojoString,
    declare,
    dDom,
    domClass,
    domConstruct,
    connect,
    dialogs,
    nlsStrings,
    dijitProgressBar,
    dialogHelpIconMixin,
    sDataServiceRegistry,
    lang,
    dojoArray,
    dijitReg,
    Button,
    Dialog
) {
    Sage.namespace('Utility.Jobs');
    lang.mixin(Sage.Utility.Jobs, {
        _intervalId: null,
        _triggerId: null,
        _jobService: null,
        _options: null,
        _pollIntervalInSeconds: 5,
        progressDialog: false,
        progressBar: false,
        cancelButton: null,
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
            this._reset();
            if (!this._validateOptions(options)) {
                return;
            }

            this._options = {
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

            var triggerJobOptions = {
                descriptor: options.descriptor,
                key: options.key,
                parameters: options.parameters,
                success: lang.hitch(this, function (result) {
                    this._showProgressDialog(result.response ? result.response.triggerId : result.$key);
                }),
                failure: lang.hitch(this, function (xhr, sdata) {
                    if (this._options.showErrorNotification) {
                        var msg = this._errorMessageHandlingBaseOffRequestStatus(xhr.status, true);
                        if (msg === "") {
                            utility.ErrorHandler.handleHttpError(xhr, sdata);
                        } else {
                            dialogs.showError(msg, this._options.title);
                        }
                    }
                    if (this._options.failure) {
                        var errorMsg = this._getErrorMessage(xhr);
                        this._options.failure(errorMsg);
                    }
                })
            };
            this._jobService = Sage.Services.getService('JobService');
            this._jobService.scheduleJob(triggerJobOptions);
            connect.publish('/job/execution/changed', [this]);
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
            var dateVar = new Date(parseInt(jsonDate.substr(6), 10));
            return dateLocale.format(dateVar, { selector: 'datetime', fullYear: true, locale: Sys.CultureInfo.CurrentCulture.name });
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
        formatJobResultGrid: function (rowValue, rowObj) {
            // attempts to sort the results field in a dgrid
            var result = rowValue;
            console.log("formatJobResultLink:  rowValue: %o | rowObj: %o", rowValue, rowObj);
            return !result ? '' : Sage.Utility.Jobs.formatJobResultLink(result, rowObj.trigger);
        },
        formatJobResult: function (item) {
            //if this was a job which wrote to the result property to format the display as a link, i.e. to open an attachment or redirect to an entity page,
            //the result should be in the format of a URI i.e. SlxAttachment\\ID or SlxReport\\ID or EntityRedirect\\Entity\\ID
            var result = item.result;
            return !result ? '' : Sage.Utility.Jobs.formatJobResultLink(result, item.trigger);
        },
        formatJob: function (value) {
            return !value ? '' : Sage.Utility.Jobs.formatJobResultLink(value.result, value.trigger);
        },
        formatJobResultLink: function (result, trigger) {
            if (result && typeof result === 'string') {
                var parts = result.split('://');
                if (parts.length === 1) {
                    return parts[0];
                } else {
                    if (parts.length > 1) {
                        switch (parts[0]) {
                            case "SlxAttachment":
                                return dojoString.substitute('<a href="javascript: Sage.Utility.File.Attachment.getAttachment(\'${1}\');" title="${0}">${0}</a>',
                                    [trigger ? trigger.$descriptor : '', parts[1]]);
                            case "GoToEntity":
                                return dojoString.substitute('<a href="${0}.aspx?entityid=${1}&modeid=Detail">${2}</a>',
                                    [parts[1], parts[2], trigger ? trigger.$descriptor : '']);
                            case "GoToGroup":
                                return dojoString.substitute('<a href="javascript: Sage.Utility.Jobs.gotoGroup(\'${1}\',\'${2}\');" title="${0}">${0}</a>',
                                    [trigger ? trigger.$descriptor : '', parts[1], parts[2]]);
                        }
                    }
                }
            }
            return '';
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
            return progressBar.domNode;
        },
        getParameterRunAsUser: function (parameters) {
            if (parameters) {
                var userId = this._getParameterValue(parameters, "RunAsUserId");
                return utility.getUserName(userId);
            }
            return '';
        },
        refreshList: function (tabId) {
            try {
                var panel = dijitReg.byId('list');
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
        },
        getLookupConditionsForJob: function () {
            var conditions = [];
            var grpContextSvc = Sage.Services.getService('ClientGroupContext');
            if (grpContextSvc) {
                var contextService = grpContextSvc.getContext();
                if (contextService && contextService.CurrentGroupID === "LOOKUPRESULTS" && contextService.LookupResultsConditions) {
                    var lookupConditions = Sys.Serialization.JavaScriptSerializer.deserialize(contextService.LookupResultsConditions);
                    dojoArray.forEach(lookupConditions, lang.hitch(this, function (condition) {
                        conditions.push({
                            dataPath: this._getDataPathFromLayout(condition.fieldname),
                            op: this._getConditionValue(condition.operator),
                            value: condition.val
                        });
                    }));
                }
            }
            return conditions;
        },
        _getDataPathFromLayout: function (alias) {
            var panel = dijitReg.byId('list');
            var layout = panel._configurationProvider._currentConfiguration ? panel._configurationProvider._currentConfiguration.layout : null;
            for (var i = 0; i < layout.length; i++) {
                var item = layout[i];
                if (item && item.alias === alias) {
                    return item.dataPath;
                }
            }
            return alias;
        },
        getFiltersForJob: function () {
            var filters = [];
            var panel = dijitReg.byId('list');
            var filterManager = panel.get('filterManager');
            var layout = panel._configurationProvider._currentConfiguration ? panel._configurationProvider._currentConfiguration.layout : null;
            var tableAliases = panel._configurationProvider._currentConfiguration ? panel._configurationProvider._currentConfiguration.tableAliases : {};

            var filter = null;
            var definition = null;
            var dataPath = null;
            var filterType;

            for (var key in filterManager._applied) {
                if (filterManager._applied.hasOwnProperty(key)) {
                    filter = filterManager._applied[key];
                    if (filter) {
                        definition = filterManager._definitionSet[key];
                        filterType = (definition.details.rangeFilter && 'rangeFilter') || (definition.details.distinctFilter && 'distinctFilter') || (definition.details.lookupFilter && 'lookupFilter');
                        dataPath = this._resolveProperty(layout, tableAliases, definition.propertyName);
                        switch (filterType) {
                            case 'rangeFilter':
                                filters.push({
                                    filterName: definition.filterName,
                                    tableName: dataPath.tableName,
                                    field: dataPath.alias,
                                    filterType: 'Range',
                                    ranges: this._getFilterValues(filter, filterType)
                                });
                                break;
                            case 'distinctFilter':
                                filters.push({
                                    filterName: definition.filterName,
                                    tableName: dataPath.tableName,
                                    field: dataPath.alias,
                                    filterType: 'Distinct',
                                    value: this._getFilterValues(filter, filterType)
                                });
                                break;
                            case 'lookupFilter':
                                filters.push({
                                    filterName: definition.filterName,
                                    filterType: 'Lookup',
                                    tableName: dataPath.tableName,
                                    field: dataPath.alias,
                                    op: filter.value.operator,
                                    value: [filter.value.value]
                                });
                                break;
                        }
                    }
                }
            }
            return filters;
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
                    var messageDiv = dDom.byId('progressDialogMessageDiv');
                    if (messageDiv) {
                        messageDiv.innerHTML = options.infoMessage;
                    }
                }
            }
        },
        _showProgressDialog: function (triggerId) {
            this._triggerId = triggerId;
            var options = this._options;

            this.progressDialog = new Dialog({
                title: options.title,
                style: dojoString.substitute('width: ${0}px;', [options.width]),
                closable: options.closable
            });

            //Informational Message
            var messageDiv = new domConstruct.create('div', { innerHTML: options.infoMessage, style: 'text-align: left; margin-top: 5px; margin-bottom: 10px', id: 'progressDialogMessageDiv' });
            this.progressDialog.containerNode.appendChild(messageDiv);
            var linkDiv = new domConstruct.create('div', { style: 'text-align: left; margin-top: 5px; margin-bottom: 10px', id: 'progressDialogLinkDiv', "class": 'display-none' });
            this.progressDialog.containerNode.appendChild(linkDiv);

            this.progressBar = new dijitProgressBar({
                style: 'margin-top: 10px; margin-bottom: 20px',
                indeterminate: options.indeterminate,
                maximum: options.maximum,
                progress: 0
            });

            this.progressDialog.containerNode.appendChild(this.progressBar.domNode);

            //Dismiss button
            if (options.showDismissButton) {
                this.cancelButton = new Button({
                    label: nlsStrings.cancelButtonCaption,
                    style: 'margin-right: 3px;',
                    onClick: lang.hitch(this, function () {
                        this._cancelJob();
                    })
                });
                var closeButton = new Button({
                    label: nlsStrings.closeButtonCaption,
                    onClick: lang.hitch(this, function () {
                        this._closeProgressDialog();
                    })
                });
                var buttonDiv = new domConstruct.create('div', { id: 'progressDialogButtonDiv', style: 'text-align: center;' });
                buttonDiv.appendChild(this.cancelButton.domNode);
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
                if (this.cancelButton) {
                    this.cancelButton.destroyRecursive();
                }
            }
        },
        _updateProgress: function () {
            var jobService = Sage.Services.getService('JobService');
            var options = {
                triggerId: this._triggerId,
                success: lang.hitch(this, function (execution, sdata) {
                    options = { progress: execution.progress };
                    this._updateProgressDialog(options);
                    if (execution.status === 'Complete') {
                        domClass.add(this.cancelButton, "display-none");
                        clearInterval(this._intervalId);
                        var resultContainer = dDom.byId('progressDialogMessageDiv');
                        if (resultContainer) {
                            resultContainer.innerHTML = nlsStrings.jobCompletedSuccessfully;
                        }
                        var linkContainer = dDom.byId('progressDialogLinkDiv');
                        if (linkContainer && execution.result) {
                            var parts = execution.result.split('://');
                            if (parts.length > 1) {
                                domClass.remove(linkContainer, 'display-none');
                                switch (parts[0]) {
                                    case "SlxAttachment":
                                        linkContainer.innerHTML = dojoString.substitute('<a onclick="Sage.Utility.Jobs._closeProgressDialog();" href="javascript: Sage.Utility.File.Attachment.getAttachment(\'${1}\');" title="${0}">${0}</a>',
                                            [execution.trigger ? execution.trigger.$descriptor : '', parts[1]]);
                                        break;
                                    case "GoToEntity":
                                        linkContainer.innerHTML = dojoString.substitute('<a onclick="Sage.Utility.Jobs._closeProgressDialog();" href="${0}.aspx?entityid=${1}&modeid=Detail">${2}</a>',
                                            [parts[1], parts[2], execution.trigger ? execution.trigger.$descriptor : '']);
                                        break;
                                    case "GoToGroup":
                                        linkContainer.innerHTML = dojoString.substitute('<a onclick="Sage.Utility.Jobs._closeProgressDialog();" href="javascript: Sage.Utility.Jobs.gotoGroup(\'${1}\',\'${2}\');" title="${0}">${0}</a>',
                                            [execution.trigger ? execution.trigger.$descriptor : '', parts[1], parts[2]]);
                                }
                            }
                        }
                        if (this.cancelButton) {
                            this.cancelButton.destroyRecursive();
                        }
                        if (this._options.showCompleteNotification) {
                            dialogs.showInfo(nlsStrings.jobCompletedSuccessfully, this._options.title);
                        }
                        if (this._options.complete) {
                            this._options.complete(execution);
                        }
                        this._refreshFavorites();
                        connect.publish('/job/execution/changed', [this]);
                    }

                    if (execution.status === 'Error') {
                        clearInterval(this._intervalId);
                        dialogs.closeProgressBar();
                        if (this._options.showErrorNotification) {
                            utility.ErrorHandler.handleHttpError(execution, sdata);
                        }
                        if (this._options.failure) {
                            this._options.failure(execution);
                        }
                        if (this.cancelButton) {
                            this.cancelButton.destroyRecursive();
                        }
                    }
                }),
                failure: lang.hitch(this, function (execution, sdata) {
                    clearInterval(this._intervalId);
                    dialogs.closeProgressBar();
                    if (this._options.showErrorNotification) {
                        var msg = this._errorMessageHandlingBaseOffRequestStatus(execution.status, true);
                        if (msg === "") {
                            utility.ErrorHandler.handleHttpError(execution, sdata);
                        } else {
                            dialogs.showError(msg, this._options.title);
                        }
                    }
                    if (this._options.failure) {
                        this._options.failure(execution);
                    }
                    if (this.cancelButton) {
                        this.cancelButton.destroyRecursive();
                    }
                })
            };
            jobService.getExecution(options);
        },
        _getConditionValue: function (condition) {
            switch (condition) {
                case 'sw':
                    return 'STARTING WITH';
                case 'ne':
                    return '<>';
                case 'gt':
                    return '>';
                case 'ge':
                    return '>=';
                case 'lt':
                    return '<';
                case 'le':
                    return '<=';
                case 'like':
                    return 'LIKE';
                default:
                    return '=';
            }
        },
        _parseProperty: function (propertyName, last) {
            var parts = propertyName.split(".");
            if (last) {
                return parts[parts.length - 1];
            } else {
                return propertyName.substr(0, propertyName.length - parts[parts.length - 1].length - 1);
            }
        },
        _getFilterValues: function (filter, filterType) {
            var values = [];
            for (var name in filter) {
                if (filter.hasOwnProperty(name)) {
                    switch (filterType) {
                        case 'rangeFilter':
                            values.push({ lower: filter[name].lower, upper: filter[name].upper });
                            break;
                        case 'distinctFilter':
                            values.push(name);
                            break;
                        case 'lookupFilter':
                            break;
                    }
                }
            }
            return values;
        },
        _resolveProperty: function (layout, tableAliases, propertyName) {
            if (layout) {
                var dataPath = this._getFilterDataPath(propertyName, layout, tableAliases, false, false);
                if (dataPath) {
                    return dataPath;
                } else {
                    dataPath = this._getFilterDataPath(propertyName, layout, tableAliases, true, false);
                    if (dataPath) {
                        return dataPath;
                    } else {
                        dataPath = this._getFilterDataPath(propertyName, layout, tableAliases, true, true);
                        return dataPath ? dataPath : propertyName;
                    }
                }
            }
            return propertyName;
        },
        _resolveAliasProperty: function (property, tableAliases) {
            var fieldName = property;
            var tableName = '';
            if (property.indexOf("_") > -1) {
                var parts = property.split("_");
                if (parts[0].length === 2) {
                    fieldName = property.slice(parts[0].length + 1); // remove length of table alias and '_' to get the fieldname
                    dojoArray.forEach(tableAliases, function (dataPath) {
                        if (parts[0] === dataPath.alias) {
                            tableName = dataPath.tableName;
                            return;
                        }
                    });
                }
            }
            return { tableName: tableName, alias: fieldName };
        },
        _getFilterDataPath: function (propertyName, layout, tableAliases, splitPath, resolveByItemDataPath) {
            var i, x, item, alias, table, tableAlias, propertyPathSplit, layoutProperty, dataPathSplit;

            for (i = 0; i < layout.length; i++) {
                item = layout[i];
                layoutProperty = item.propertyPath;
                if (splitPath) {
                    propertyPathSplit = item.propertyPath && item.propertyPath.split('.');
                    if (propertyPathSplit.length === 2) {
                        layoutProperty = propertyPathSplit[1];
                    }
                }
                if (layoutProperty === propertyName) {
                    if (item.propertyPath.indexOf(".") > -1) {
                        return this._resolveAliasProperty(item.alias, tableAliases);
                    } else {
                        table = item.dataPath && item.dataPath.split(':')[0];
                        if (/^[a-z]\d+_/i.test(item.alias)) {
                            alias = item.alias;
                        } else {
                            tableAlias = table && tableAliases[table.toUpperCase()];
                            if (tableAlias) {
                                alias = tableAlias + '.' + item.alias;
                            }
                        }
                    }
                    return { tableName: table, alias: alias ? alias : item.alias };
                }
                if (resolveByItemDataPath && item.dataPath !== "") {
                    dataPathSplit = item.dataPath.split(".");
                    if (dataPathSplit.length > 1) {
                        var path = dataPathSplit[dataPathSplit.length - 1];
                        var parts = path.split('!');
                        if (parts.length > 1) {
                            for (x = 0; x < tableAliases.length; x++) {
                                if (tableAliases[x].tableName === parts[0]) {
                                    return { tableName: tableAliases[x].tableName, alias: parts[1] };
                                }
                            }
                        }
                    }
                }
            }
            return null;
        },
        gotoGroup: function (entity, groupId) {
            var service = sDataServiceRegistry.getSDataService('system');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                .setOperationName('setGroupContext');
            var entry = {
                request: {
                    'currentGroupId': groupId,
                    'currentFamily:': entity,
                    'clearCache': true /* Clear the group cache so that the group created in the job will be available in the client. */
                }
            };
            request.execute(entry, {
                success: function () {
                    window.parent.location = dojoString.substitute("${0}.aspx?gid=${1}&modeid=list", [entity, groupId]);
                },
                scope: this
            });
        },
        // used by other namespaces to get a "read-able" error message based on the status.
        getRequestMessageFromStatus: function (status) {
            return this._errorMessageHandlingBaseOffRequestStatus(status, false);
        },
        _errorMessageHandlingBaseOffRequestStatus: function (status, useDefault) {
            var errorMsg = "";
            switch (status) {
                case 410:
                    errorMsg = nlsStrings.dataExpiredRefreshPage;
                    break;
                case 500:
                    errorMsg = nlsStrings.JobServerviceOff;
                    break;
                default:
                    errorMsg = useDefault ? "" : nlsStrings.generalCheckJobService;
                    break;
            }
            return errorMsg;
        },
        _refreshFavorites: function () {
            var service = sDataServiceRegistry.getSDataService('system');
            var request = new Sage.SData.Client.SDataServiceOperationRequest(service);
            var operation = 'refreshFavorites';

            request.setResourceKind('groups');
            request.setOperationName(operation);

            var entry = {
                '$name': operation,
                request: {}
            };

            request.execute(entry, {
                success: function (data) {
                },
                failure: function (xhr, sdata) {
                    console.log("failed updating group favorites");
                },
                scope: this
            });
        }
    });
    return Sage.Utility.Jobs;
});
