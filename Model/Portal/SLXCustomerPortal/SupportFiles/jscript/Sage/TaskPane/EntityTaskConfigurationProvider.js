/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/TaskPane/EntityTaskConfigurationProvider", [
    'Sage/Services/_ServiceMixin',
    'Sage/_ConfigurationProvider',
    'Sage/TaskPane/EntityTaskContents',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/i18n!./nls/EntityTaskConfigurationProvider',
    'dojo/_base/declare'

],
    function (
      _ServiceMixin,
       _ConfigurationProvider,
       EntityTaskContents,
       on,
       lang,
       locResources,
       declare
    ) {

        var entityTaskConfigurationProvider = declare('Sage.TaskPane.EntityTaskConfigurationProvider', [_ConfigurationProvider, _ServiceMixin], {
            serviceMap: {
                'groupContextService': 'ClientGroupContext'
            },
            _roleSecurityService: null,
            _currentUserId: null,
            
            _taskConfigs: false,
            constructor: function (options) {

                lang.mixin(this, locResources);
                this.inherited(arguments);

                var clientContextSvc = Sage.Services.getService('ClientContextService');
                if (clientContextSvc) {
                    if (clientContextSvc.containsKey("userID")) {
                        this._currentUserId = clientContextSvc.getValue("userID");
                    }
                }
                this._roleSecurityService = Sage.Services.getService('RoleSecurityService');
            },
            _createConfiguration: function () {
                var configuration;
                var groupContext = this.groupContextService && this.groupContextService.getContext();
                var groupId = groupContext && groupContext['CurrentGroupID'];
                var taskConfig = this.getTaskConfiguration(groupId);

                var taskPane = new EntityTaskContents({
                    taskTemplate: taskConfig.configuration.taskTemplate
                });
                taskPane.startup();

                var configuration2 = {
                    tabId: taskConfig.configuration.key,
                    taskPane: taskPane
                };

                return configuration2;
            },
            getTaskConfiguration: function (key) {

                var taskconfigs = this.getTaskConfigurations();
                for (var i = 0; i < taskconfigs.length; i++) {
                    if (taskconfigs[i].key.toUpperCase() === key.toUpperCase()) {
                        return taskconfigs[i];
                    }
                }
                var defaultConfig = {
                    key: 'default',
                    configuration: this._getDefaultConfig()
                };
                return defaultConfig;
            },

            getTaskConfigurations: function () {
                if (this._taskConfigs) {
                    return this._taskConfigs;
                }
                this._taskConfigs = [
                    {
                        key: 'Entities',
                        configuration: this._getEntityConfig()
                    }
                ];

                return this._taskConfigs;
            },
            _getTaskTemplateString: function (taskItems, selectionText) {
                var ts = [];
                ts.push('<div class="task-pane-item-common-tasklist">');
                if (this._roleSecurityService && this._roleSecurityService.hasAccess('Administration/EntityManager/Entities/Add')) {
                    ts.push('<span id="clearSelection" class="task-pane-item-common-clearselection activity-type-link" dojoAttachEvent="click:createNewEntity">' + this.NewEntity + '</span><br>');
                }
                ts.push('</div>');
                return ts;
            },

            _getCommonTasks: function () {
                var taskItems = [];
                return taskItems;

            },
            _getCommonEntityTasks: function () {
                var taskItems = this._getCommonTasks();
                return taskItems;

            },
            _getEntityConfig: function (entry, options) {
                var taskItems = this._getCommonEntityTasks();
                var selectionText = "Entities";
                var templateString = this._getTaskTemplateString(taskItems, selectionText);
                var taskTemplate = new Simplate(templateString);
                var configuration = {
                    key: 'Entities',
                    taskTemplate: taskTemplate
                };

                return configuration;
            },
            
            _getDefaultConfig: function (entry, options) {
                var taskItems = {};
                var selectionText = "Default";
                var templateString = this._getTaskTemplateString(taskItems, selectionText);
                var taskTemplate = new Simplate(templateString);
                var configuration = {
                    key: 'Default',
                    taskTemplate: taskTemplate
                };

                return configuration;
            },

            buildTaskConfiguration: function (key, selectionText, taskItems) {
                var templateString = this._getTaskTemplateString(taskItems, selectionText);
                var taskTemplate = new Simplate(templateString);
                var configuration = {
                    key: key,
                    taskTemplate: taskTemplate
                };

                return configuration;

            },
            addTaskConfiguration: function (taskConfiguration) {
                var config = this.getTaskConfiguration(taskConfiguration.key);
                if (config.key === 'default') {
                    var newConfiguration = {
                        key: taskConfiguration.key,
                        configuration: taskConfiguration
                    };
                    var taskConfigs = this.getTaskConfigurations();
                    taskConfigs.push(newConfiguration);
                } else {

                    config.configuration = taskConfiguration;
                }

            },
            requestConfiguration: function (options) {
                this._onRequestConfigurationSuccess(options, null);
            },
            _onRequestConfigurationSuccess: function (options, entry) {
                if (options.success) {
                    options.success.call(options.scope || this, this._createConfiguration(entry, options), options, this);
                }
                this._createConfiguration(entry, options);
            },
            _onRequestConfigurationFailure: function (options, response) {
                if (options.failure) {
                    options.failure.call(options.scope || this, response, options, this);
                }
            }

        });

        return entityTaskConfigurationProvider;

    });