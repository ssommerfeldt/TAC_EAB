/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, mingleConfig */
define("Sage/Mingle/Feeds", [
        'dojo/_base/array',
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/_base/lang',
        'dojo/_base/json',
        'dojo/string',
        'Sage/Mingle/Request',
        'Sage/Mingle/UserService'
    ],
    function(array, declare, Deferred, lang, json, dojoString, mingleRequest, userService) {
        var mingleFeeds = declare('Sage.Mingle.Feeds',
            null,
            {
                AlertCategoryList: null,

                AlertList: null,

                ErrorList: null,

                Feeds: null,

                MoreAlerts: false,

                MoreFeeds: false,

                MoreTasks: false,

                RefreshIdentifier: null,

                Status: null,

                TaskCategoryList: null,

                TaskList: null,

                _buildFeedsUrl: function(mingleUser) {
                    var url = dojoString
                        .substitute('${0}/User/${1}/Feeds',
                        [mingleConfig.ionApiEndpoint, mingleUser.UserGUID]);
                    console.debug('Mingle.Feeds: Url: %o', url);
                    return url;
                },

                getUserFeeds: function() {

                    var self = this;

                    var deferred = new Deferred();

                    console.debug('Mingle.Feeds: Initializing');

                    if (!Sage.Services.hasService('MingleUserService')) {
                        Sage.Services.addService('MingleUserService', new userService());
                    }

                    var service = Sage.Services.getService('MingleUserService');
                    service
                        .currentUser()
                        .then(function(mingleUser) {

                                console.log('mingleUser: %o', mingleUser);

                                var request = new mingleRequest();
                                request.get(self._buildFeedsUrl(mingleUser))
                                    .then(function(data) {
                                            console.debug('Mingle.Feeds: Received data: %o', data);
                                            if (lang.isObject(data)) {
                                                deferred.resolve(data);
                                            } else {
                                                console.warn('Mingle.Feeds: The Ming.le user feeds is invalid.');
                                                deferred.reject(data);
                                            }
                                        },
                                        function(response, ioArgs) {
                                            console.error('Mingle.Feeds: Error: %o', response);
                                            deferred.reject(response);
                                            var options = {
                                                message:
                                                    'There was an error attempting to retrieve the Ming.le user feeds.'
                                            };
                                            Sage.Utility.ErrorHandler.handleHttpError(response, ioArgs, options);
                                            return response;
                                        }
                                    );

                                return deferred.promise;

                            },
                            function(error) {
                                console.error(error);
                            }
                        );

                    return deferred.promise;
                },

                postUserFeed: function(options) {

                    if (!lang.isObject(options)) {
                        throw Error('The postUserFeed options is invalid.');
                    } else {
                        console.debug('options: %o', options);
                    }

                    var postData =
                    {
                        'AdditionalMessageText': null,
                        'DrillBackList': [],
                        'ImageData': null,
                        'Location': null,
                        'MessageText': null,
                        'PrivacyLevel': 2, /* 0=Unknown, 1=Private, 2=Colleagues, 3=Public, 4=Group, 5=Target list */
                        'SocialObjectList': [],
                        'TaggedList': {
                            'GroupList': [],
                            'UserList': []
                        },
                        'TargetList': {
                            'GroupList': [],
                            'UserList': []
                        },
                        'TaskItemType': 1, /* 1=Task, 2=Alert, 3=IONNotification (0=None?) */
                        'UploadIdentifier': 'null',
                        'WebPartMessage': false
                    };

                    if (options.feed) {
                        declare.safeMixin(postData, options.feed);
                    }

                    var self = this;

                    var deferred = new Deferred();

                    console.debug('Mingle.Feeds: Initializing');

                    if (!Sage.Services.hasService('MingleUserService')) {
                        Sage.Services.addService('MingleUserService', new userService());
                    }

                    var service = Sage.Services.getService('MingleUserService');
                    service
                        .currentUser()
                        .then(function(mingleUser) {

                                console.log('mingleUser: %o', mingleUser);

                                var request = new mingleRequest();
                                request.post(self._buildFeedsUrl(mingleUser), postData)
                                    .then(function(data) {
                                            console.debug('Mingle.Feeds: Post feed result: %o', data);
                                            if (lang.isObject(data)) {
                                                if (data.Status === 1) {
                                                    if (lang.isFunction(options.success)) {
                                                        options.success(options.scope || null, options.description || 'Posted feed');
                                                    }
                                                    deferred.resolve(data);
                                                } else {
                                                    if (lang.isArray(data.ErrorList) && data.ErrorList.length > 0) {
                                                        var
                                                            error = dojoString
                                                                .substitute('The post of the user feed to Ming.le failed. ${err.Message} (Code=${err.Code}; Severity=${err.Severity}).', { err: data.ErrorList[0] });
                                                        console.error(error);
                                                        if (lang.isFunction(options.failure)) {
                                                            options.failure(options.scope || null, options.description || 'Failed to post feed', error);
                                                        }
                                                        deferred.reject(error);
                                                    } else {
                                                        if (lang.isFunction(options.failure)) {
                                                            options
                                                                .failure(options.scope || null, options.description || 'Failed to post feed',
                                                                    'Unknown error');
                                                        }
                                                        deferred.reject(data);
                                                    }
                                                }
                                            } else {
                                                console.warn('Mingle.Feeds: The Ming.le user feed is invalid.');
                                                if (lang.isFunction(options.failure)) {
                                                    options.failure(options.scope || null, options.description || 'Failed to post feed', 'The Ming.le user feed is invalid.');
                                                }
                                                deferred.reject(data);
                                            }
                                        },
                                        function (response, ioArgs) {
                                            if (lang.isFunction(options.failure)) {
                                                options.failure(options.scope || null, options.description || 'Failed to post feed', response);
                                            }
                                            console.error('Mingle.Feeds: Error: %o', response);
                                            deferred.reject(response);
                                            var errorOptions = {
                                                message:
                                                    'There was an error attempting to retrieve the Ming.le user feeds.'
                                            };
                                            Sage.Utility.ErrorHandler.handleHttpError(response, ioArgs, errorOptions);
                                            return response;
                                        }
                                    );

                                return deferred.promise;

                            },
                            function(error) {
                                console.error(error);
                            }
                        );

                    return deferred.promise;
                }
            }
        );

        return mingleFeeds;
    }
);